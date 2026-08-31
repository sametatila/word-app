"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AchievementBadge, TIER_COLOR, TIER_LABEL, type BadgeRow } from "@/components/achievement-badge";
import { Confetti } from "@/components/celebrate";
import { play } from "@/lib/sfx";
import { track } from "@/lib/track";

/**
 * Rozet açılış kutlaması.
 *
 * Tek bir yerde duruyor: uygulama kabuğunda. Rozetin kazanılabileceği yerler
 * çok — kelime turu, ders, beceri, görev ödülü, günün turu, hayatta kalma —
 * ve altısına ayrı kutlama koymak altı yerde unutulabilecek bir şey demekti.
 * Tetikleyici zaten var olan `nomi:stats` olayı: XP değiştiyse bir şey
 * KAZANILMIŞ demektir.
 *
 * Üç kural kutlamayı kutlama olarak tutuyor:
 *
 * 1. **Oyunun ortasını kesmiyor.** `stats` olayı her turdan sonra atılıyor;
 *    tam ekran bir kart 7. turda belirse kutlama değil kesinti olurdu. Oyun
 *    ekranı "meşgul" sinyali gönderiyor (`nomi:busy`) ve kuyruk o sinyal
 *    kalkana kadar bekliyor — etap ya da özet ekranında patlıyor.
 *
 * 2. **Toplu açılış tek kart.** Rozetler geriye dönük hesaplandığı için sistem
 *    ilk açıldığında bir kullanıcının on rozeti birden açılabiliyor. Onu tek
 *    tek göstermek yarım dakikalık bir slayt gösterisi olurdu; toplu açılış
 *    tek bir "12 rozet açıldı" kartıyla veriliyor, ayrıntı profilde.
 *
 * 3. **Her zaman kapatılabilir.** Karta dokunmak ilerletiyor ve bunu söyleyen
 *    bir satır var: kapatılamayan bir kutlama, kutlama değil engeldir.
 */

type Fresh = BadgeRow & { group: string; unlockedAt: string | null };

/** Tek tek gösterilecek en fazla rozet; üstü toplu karta düşer. */
const MAX_SOLO = 2;
/** Tek rozetin ekranda kalma süresi. */
const SOLO_MS = 2600;
/** Toplu kartın ekranda kalma süresi — daha çok okunacak şey var. */
const BATCH_MS = 5000;
/** Toplu kartta gösterilen rozet sayısı; gerisi sayı olarak söyleniyor. */
const BATCH_SHOWN = 8;

type View =
  | { kind: "solo"; queue: Fresh[] }
  | { kind: "batch"; items: Fresh[] }
  | null;

export function AchievementUnlock() {
  const [view, setView] = useState<View>(null);
  const [busy, setBusy] = useState(false);
  /** Meşgulken beklemeye alınanlar. */
  const held = useRef<Fresh[] | null>(null);
  const running = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * Kutlamayı ekrana koyar ve ANCAK O ZAMAN "görüldü" işaretler.
   *
   * İşaretleme önce `check` içindeydi ve bir kusur taşıyordu: oyun ortasında
   * açılan rozet beklemeye alınıyor, ama görülmüş sayıldığı için kullanıcı
   * turu yarıda bırakıp çıkarsa kutlama bir daha hiç çıkmıyordu. Rozet
   * duvarda açık duruyordu, yani kaybolan şey rozet değil ANI'ydı — ki
   * kutlamanın tek varlık sebebi o.
   */
  const present = useCallback((fresh: Fresh[]) => {
    // Kademesi yüksek olan önce: aynı anda "İlk kıvılcım" ve "Yüz gün"
    // açıldıysa ilk gösterilmesi gereken büyük olanıdır.
    const rank = { legend: 0, gold: 1, silver: 2, bronze: 3 } as Record<string, number>;
    const sorted = [...fresh].sort((a, b) => (rank[a.tier] ?? 9) - (rank[b.tier] ?? 9));
    setView(sorted.length > MAX_SOLO ? { kind: "batch", items: sorted } : { kind: "solo", queue: sorted });
    play("unlock");
    track("achievement_unlock", sorted.length);

    // Ekrana konanların hepsi görüldü sayılıyor — toplu kartta sığmayan da
    // dahil, çünkü sayısı kartta yazıyor ve kendileri duvarda açık duruyor.
    void fetch("/api/achievements", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ seen: sorted.map((f) => f.id) }),
      keepalive: true,
    }).catch(() => {});
  }, []);

  const check = useCallback(async () => {
    if (running.current) return;
    running.current = true;
    try {
      const res = await fetch("/api/achievements", { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as { fresh?: Fresh[] };
      const fresh = data.fresh ?? [];
      if (!fresh.length) return;

      // Meşgulken bekletiliyor ve İŞARETLENMİYOR: gösterilmemiş bir kutlama
      // görülmüş sayılmamalı. Kullanıcı turu bırakıp çıkarsa rozet bir sonraki
      // açılışta kutlanır.
      if (busy) {
        const seen = new Set((held.current ?? []).map((f) => f.id));
        held.current = [...(held.current ?? []), ...fresh.filter((f) => !seen.has(f.id))];
      } else {
        present(fresh);
      }
    } catch {
      /* rozet kontrolü başarısızsa hiçbir şey olmaz */
    } finally {
      running.current = false;
    }
  }, [busy, present]);

  // Oyun ekranı meşgul sinyali veriyor; sinyal kalkınca bekleyenler patlıyor.
  useEffect(() => {
    const onBusy = (e: Event) => {
      const detail = (e as CustomEvent<{ busy: boolean }>).detail;
      setBusy(Boolean(detail?.busy));
    };
    window.addEventListener("nomi:busy", onBusy);
    return () => window.removeEventListener("nomi:busy", onBusy);
  }, []);

  useEffect(() => {
    if (busy || !held.current?.length) return;
    const pending = held.current;
    held.current = null;
    present(pending);
  }, [busy, present]);

  useEffect(() => {
    // İlk bakış gecikmeli: açılışta ağ zaten oturum ve tur isteğiyle meşgul.
    const first = setTimeout(() => void check(), 1600);
    const onStats = () => {
      if (timer.current) clearTimeout(timer.current);
      // Bir turda birden çok `stats` olayı atılabiliyor; son olayın üstüne
      // bir kez bakmak yeterli.
      timer.current = setTimeout(() => void check(), 1200);
    };
    window.addEventListener("nomi:stats", onStats);
    return () => {
      clearTimeout(first);
      if (timer.current) clearTimeout(timer.current);
      window.removeEventListener("nomi:stats", onStats);
    };
  }, [check]);

  const advance = useCallback(() => {
    setView((v) => {
      if (!v) return null;
      if (v.kind === "batch") return null;
      const rest = v.queue.slice(1);
      if (rest.length) play("unlock");
      return rest.length ? { kind: "solo", queue: rest } : null;
    });
  }, []);

  const shownId = view?.kind === "solo" ? view.queue[0]?.id : view?.kind === "batch" ? "batch" : null;

  useEffect(() => {
    if (!shownId) return;
    const t = setTimeout(advance, shownId === "batch" ? BATCH_MS : SOLO_MS);
    return () => clearTimeout(t);
  }, [shownId, advance]);

  if (busy || !view) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={shownId ?? "none"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={advance}
        className="fixed inset-0 z-50 flex items-center justify-center px-6"
        style={{
          background: "color-mix(in srgb, var(--bg) 72%, transparent)",
          backdropFilter: "blur(4px)",
        }}
      >
        {/* Hareket azaltma kontrolü burada gereksizdi: Confetti zaten kendi
            içinde tercihe bakıp hiç çizmiyor. Çift kontrol olmasının yanında
            render sırasında okunuyordu ve sunucu/istemci ayrışmasına yol
            açıyordu (bkz. lib/use-still). */}
        <Confetti fire={1} count={30} />
        {view.kind === "batch" ? (
          <Card tier="legend">
            <p
              className="text-[11px] font-black uppercase tracking-[0.18em]"
              style={{ color: "var(--color-brand)" }}
            >
              {view.items.length} rozet açıldı
            </p>
            <div className="my-4 flex flex-wrap justify-center gap-2">
              {view.items.slice(0, BATCH_SHOWN).map((it) => (
                <AchievementBadge key={it.id} row={{ ...it, unlocked: true }} size={52} />
              ))}
            </div>
            {/* Başlıktaki sayı ile gösterilen rozet sayısı ayrışmamalı:
                "9 rozet açıldı" deyip sekiz tane göstermek, sayının yanlış
                olduğunu düşündürür. */}
            {view.items.length > BATCH_SHOWN ? (
              <p className="muted -mt-2 mb-3 text-xs font-semibold">
                ve {view.items.length - BATCH_SHOWN} tane daha
              </p>
            ) : null}
            <p className="muted text-sm">
              Bugüne kadar yaptığın işin karşılığı. Hepsi profilinde duruyor.
            </p>
            <Hint />
          </Card>
        ) : (
          <Card tier={view.queue[0].tier}>
            <p
              className="text-[11px] font-black uppercase tracking-[0.18em]"
              style={{ color: TIER_COLOR[view.queue[0].tier] }}
            >
              {TIER_LABEL[view.queue[0].tier]} rozet açıldı
            </p>
            <div className="my-4 flex justify-center">
              <AchievementBadge row={{ ...view.queue[0], unlocked: true }} size={92} />
            </div>
            <p className="muted text-sm">{view.queue[0].hint}</p>
            {view.queue.length > 1 ? (
              <p className="muted mt-3 text-xs font-semibold">+{view.queue.length - 1} rozet daha</p>
            ) : null}
            <Hint />
          </Card>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

function Card({ tier, children }: { tier: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ scale: 0.7, y: 18, rotate: -4 }}
      animate={{ scale: 1, y: 0, rotate: 0 }}
      exit={{ scale: 0.9, y: -10, opacity: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 20 }}
      className="card w-full max-w-xs p-6 text-center"
      style={{ boxShadow: `0 24px 60px -20px ${TIER_COLOR[tier] ?? "var(--color-brand)"}` }}
    >
      {children}
    </motion.div>
  );
}

/** Kapatılabilir olduğunu söyleyen tek satır. */
function Hint() {
  return (
    <p className="muted mt-4 text-[11px] font-semibold uppercase tracking-wide opacity-70">
      Devam etmek için dokun
    </p>
  );
}
