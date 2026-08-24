"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AchievementBadge, TIER_COLOR, TIER_LABEL, type BadgeRow } from "@/components/achievement-badge";
import { TrophyIcon } from "@/components/icons";

/**
 * Profildeki rozet duvarı.
 *
 * İlk hâli 41 rozeti yedi bölüm hâlinde alt alta diziyordu ve iki şeyi birden
 * bozuyordu:
 *
 *   1. **Profili kaplıyordu.** Yedi başlık + on ızgara satırı, sayfanın geri
 *      kalanını (ilerleme, ısı haritası, ayarlar) katlanın çok altına itiyordu.
 *   2. **Seçilenin ayrıntısı görünmüyordu.** Ayrıntı paneli bütün grupların
 *      ALTINDAYDI: üstteki bir rozete dokunan kullanıcı, açıklamanın belirdiğini
 *      bile görmüyordu.
 *
 * Yeni kurgu tek bir fikre dayanıyor: **aynı anda tek grup**. Sekmeler
 * gruplar arası geçişi bir dokunuşa indiriyor, bölüm yüksekliği yediye
 * bölünüyor ve ayrıntı paneli ızgaranın hemen altına — yani her zaman
 * ekranda kalan bir yere — oturuyor.
 *
 * İlk sekme "Sıradaki": bitmeye en yakın kilitli rozetler. Duvara bakan
 * kişinin asıl sorusu "neyim var" değil "ne yapmalıyım"; açılışta onun
 * cevabını vermek, yedi grubu tarayıp aynı çıkarımı yapmasını beklemekten
 * iyi.
 *
 * Ayrıntı paneli hiç boş kalmıyor: sekme değişince ilk rozet kendiliğinden
 * seçiliyor. Boş bırakmak hem alanı açıklamasız bir boşluk yapardı hem de
 * dokununca yükseklik zıplardı.
 */

type Row = BadgeRow & { group: string; unlockedAt: string | null };
type Board = { rows: Row[]; unlockedCount: number; total: number };

const GROUP_LABELS: Record<string, string> = {
  seri: "Seri",
  kelime: "Kelime",
  oyun: "Oyunlar",
  ders: "Dersler",
  beceri: "Beceriler",
  tur: "Turlar",
  keşif: "Keşif",
};

const GROUP_ORDER = ["seri", "kelime", "oyun", "ders", "beceri", "tur", "keşif"];

/** "Sıradaki" sekmesinde kaç rozet gösterilir. */
const NEXT_COUNT = 4;
const NEXT_TAB = "__next";

export function AchievementWall() {
  const [board, setBoard] = useState<Board | null>(null);
  const [failed, setFailed] = useState(false);
  const [tab, setTab] = useState<string>(NEXT_TAB);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/achievements", { cache: "no-store" });
        if (!res.ok) return alive && setFailed(true);
        const data = (await res.json()) as Board;
        if (alive) setBoard(data);
      } catch {
        if (alive) setFailed(true);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  /**
   * Bitmeye en yakın kilitli rozetler.
   *
   * Sıra tamamlanma ORANINA göre: "48/50" ile "480/500" aynı oranda ama
   * ilkinin kalanı iki, ikincisinin yirmi. Eşitlikte küçük hedef öne alınıyor,
   * yani mutlak olarak daha yakın olan.
   */
  const upcoming = useMemo(() => {
    if (!board) return [];
    return board.rows
      .filter((r) => !r.unlocked)
      .sort((a, b) => b.done / b.target - a.done / a.target || a.target - b.target)
      .slice(0, NEXT_COUNT);
  }, [board]);

  /** Hepsi açıldıysa "sıradaki" diye bir şey kalmaz; en son kazanılanlar gelir. */
  const recent = useMemo(() => {
    if (!board) return [];
    return board.rows
      .filter((r) => r.unlocked && r.unlockedAt)
      .sort((a, b) => (a.unlockedAt! < b.unlockedAt! ? 1 : -1))
      .slice(0, NEXT_COUNT);
  }, [board]);

  const shown = useMemo(() => {
    if (!board) return [];
    if (tab === NEXT_TAB) return upcoming.length ? upcoming : recent;
    return board.rows.filter((r) => r.group === tab);
  }, [board, tab, upcoming, recent]);

  // Sekme değişince ilk rozet seçili gelsin: panel boş kalmasın, yükseklik
  // dokunuşla zıplamasın.
  useEffect(() => {
    setOpenId(shown[0]?.id ?? null);
  }, [tab, shown.length]); // eslint-disable-line react-hooks/exhaustive-deps

  if (failed) return null;

  if (!board) {
    return (
      <section className="card p-5">
        <h2 className="mb-3 flex items-center gap-2 font-bold">
          <TrophyIcon size={18} /> Rozetler
        </h2>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="h-[78px] animate-pulse rounded-2xl" style={{ background: "var(--surface-2)" }} />
          ))}
        </div>
      </section>
    );
  }

  const pct = Math.round((board.unlockedCount / Math.max(1, board.total)) * 100);
  const open = shown.find((r) => r.id === openId) ?? shown[0] ?? null;
  const nextLabel = upcoming.length ? "Sıradaki" : "Son kazanılan";

  return (
    <section className="card p-5">
      <div className="mb-1 flex items-baseline justify-between">
        <h2 className="flex items-center gap-2 font-bold">
          <TrophyIcon size={18} /> Rozetler
        </h2>
        <span className="muted text-xs font-semibold tabular-nums">
          {board.unlockedCount} / {board.total}
        </span>
      </div>

      <div className="mb-3 h-1.5 overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}>
        <motion.div
          className="brand-gradient h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 24 }}
        />
      </div>

      {/*
        Sekmeler kartın kenarlarına taşıyor: kaydırılabilir olduğu, şeridin
        kesilmesinden anlaşılıyor. Her sekme kendi ilerlemesini taşıyor, yani
        bütün resim tek bakışta görünüyor — duvarı açmaya gerek kalmadan.

        Sağdaki pay `padding` ile DEĞİL, sondaki boşluk öğesiyle veriliyor.
        Sebep tarayıcı davranışı: yatay kaydırılan bir esnek kutuda sağ dolgu
        kaydırma alanına katılmıyor, yani sonuna kadar kaydırıldığında son sekme
        kartın sağ duvarına değiyordu. Soldaki pay dolguyla kalabiliyor çünkü
        orada aynı sorun yok.

        Genişliği 20 değil 14 piksel: aradaki `gap-1.5` de payın parçası. 20
        verildiğinde sağ boşluk 26 piksele çıkıyor ve altındaki rozet ızgarasıyla
        hizayı kaçırıyordu — ölçüldü, ikisi de artık kartın 21 piksel içinde.
      */}
      <div className="no-scrollbar -mx-5 mb-3 flex gap-1.5 overflow-x-auto pl-5 pb-1">
        <Tab active={tab === NEXT_TAB} onClick={() => setTab(NEXT_TAB)} label={nextLabel} />
        {GROUP_ORDER.map((g) => {
          const rows = board.rows.filter((r) => r.group === g);
          if (!rows.length) return null;
          const got = rows.filter((r) => r.unlocked).length;
          return (
            <Tab
              key={g}
              active={tab === g}
              onClick={() => setTab(g)}
              label={GROUP_LABELS[g] ?? g}
              count={`${got}/${rows.length}`}
              complete={got === rows.length}
            />
          );
        })}
        <span aria-hidden className="w-3.5 shrink-0" />
      </div>

      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-7">
        {shown.map((r) => (
          <AchievementBadge
            key={r.id}
            row={r}
            selected={open?.id === r.id}
            onClick={() => setOpenId(r.id)}
          />
        ))}
      </div>

      {/* Ayrıntı ızgaranın HEMEN altında. Önce bütün grupların en altındaydı ve
          üstteki bir rozete dokunan kullanıcı açıklamanın belirdiğini bile
          görmüyordu. */}
      <AnimatePresence mode="wait">
        {open ? (
          <motion.div
            key={open.id}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="mt-3 rounded-xl p-3.5"
            style={{ background: "var(--surface-2)" }}
          >
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-bold">{open.title}</p>
              <span
                className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wide"
                style={{
                  background: `color-mix(in srgb, ${TIER_COLOR[open.tier]} 18%, transparent)`,
                  color: TIER_COLOR[open.tier],
                }}
              >
                {TIER_LABEL[open.tier]}
              </span>
            </div>
            <p className="muted mt-1 text-sm">{open.hint}</p>

            {open.unlocked ? (
              <p className="mt-2 text-xs font-semibold" style={{ color: "var(--color-mint-500)" }}>
                Açıldı
                {open.unlockedAt
                  ? ` · ${new Date(open.unlockedAt).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}`
                  : ""}
              </p>
            ) : (
              <div className="mt-2">
                <div className="mb-1 flex items-baseline justify-between text-xs font-semibold tabular-nums">
                  <span style={{ color: "var(--color-brand-500)" }}>
                    {open.done.toLocaleString("tr-TR")} / {open.target.toLocaleString("tr-TR")}
                  </span>
                  <span className="muted">
                    {(open.target - open.done).toLocaleString("tr-TR")} kaldı
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full" style={{ background: "var(--border)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min(100, Math.round((open.done / Math.max(1, open.target)) * 100))}%`,
                      background: TIER_COLOR[open.tier],
                    }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function Tab({
  active,
  onClick,
  label,
  count,
  complete,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count?: string;
  complete?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold transition-colors"
      style={{
        background: active ? "var(--color-brand-500)" : "var(--surface-2)",
        color: active ? "#fff" : complete ? "var(--color-mint-500)" : "var(--text-muted)",
      }}
    >
      {label}
      {count ? (
        <span className="ml-1.5 font-semibold tabular-nums opacity-80">{count}</span>
      ) : null}
    </button>
  );
}
