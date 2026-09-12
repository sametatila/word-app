"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { useCachedJson } from "@/lib/use-cached";
import { SkeletonBar, SkeletonLine, SkeletonTile } from "@/components/skeleton";
import Link from "next/link";
import { motion } from "framer-motion";
import { BoltIcon, CheckIcon, GiftIcon, TargetIcon } from "@/components/icons";
import { track } from "@/lib/track";
import { play } from "@/lib/sfx";
import { useT } from "@/lib/i18n/client";
import { localDay } from "@/lib/day";
import { CardGrid } from "@/components/layout";
import { ALL_DONE_ID, ALL_DONE_XP } from "@/lib/quest-constants";

/**
 * Günün görevleri kartı.
 *
 * Görevler yalnızca bir ödül mekaniği değil, bir yönlendirme aracı: ölçümde
 * beceriler bölümünü yedi kullanıcıdan biri, dersleri üçü açmıştı. Günün üç
 * görevinden biri hep o bölümlerden birine götürüyor, böylece uygulamanın en
 * zengin içeriği ilk kez görünür oluyor.
 */

type Quest = {
  id: string;
  label: string;
  href: string;
  target: number;
  done: number;
  xp: number;
  claimed: boolean;
};

type Board = { quests: Quest[]; allDone: boolean; allClaimed: boolean };

export function QuestCard() {
  const t = useT();
  const [busy, setBusy] = useState<string | null>(null);
  const [flash, setFlash] = useState(0);

  /*
    Önce önbellek, sonra tazeleme (bkz. lib/use-cached). Görevler günlük ve gün
    içinde yalnızca oynadıkça değişiyor; her açılışta sıfırdan beklemek yerine
    son bilinen durum anında çiziliyor, istek arkada gidiyor.

    Gövde doğrulanıyor: 200 dönen ama `quests` taşımayan bir cevapta kart
    `undefined.filter` ile patlıyor ve hata sınırı bütün başlangıç ekranını
    indiriyordu.
  */
  const { data: board, put } = useCachedJson<Board>(
    `quests:${localDay()}`,
    `/api/quests?day=${localDay()}`,
    (body) => {
      const b = body as Partial<Board>;
      return Array.isArray(b?.quests) ? (b as Board) : null;
    },
  );

  async function claim(questId: string) {
    setBusy(questId);
    try {
      const res = await apiFetch("/api/quests", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ questId, day: localDay() }),
      });
      if (res.ok) {
        const out = (await res.json()) as Board & {
          xp: number;
          totalXp: number | null;
          currentStreak: number | null;
        };
        // Sunucunun döndürdüğü yeni durum doğrudan yerleştiriliyor: ödülü
        // aldıktan sonra bir istek daha atıp beklemek gereksiz.
        if (Array.isArray(out.quests)) {
          put({ quests: out.quests, allDone: out.allDone, allClaimed: out.allClaimed });
        }
        if (out.xp > 0) {
          track("quest_claim", out.xp);
          play("unlock");
          setFlash(out.xp);
          setTimeout(() => setFlash(0), 2400);
          // Üst bardaki XP rozeti anında güncellensin. Seri de gerçek
          // değeriyle gidiyor: olay iki alanı birden yazdığı için eksik
          // gönderilen bir seri rozeti sıfırlardı.
          if (out.totalXp !== null && out.currentStreak !== null) {
            window.dispatchEvent(
              new CustomEvent("lernomi:stats", {
                detail: { xp: out.totalXp, streak: out.currentStreak },
              }),
            );
          }
        }
      }
    } finally {
      setBusy(null);
    }
  }

  /* İskelet kartın GERÇEK yapısında: başlık şeridi ve altında üç görev satırı
     (yuvarlak sayaç, etiket, ilerleme çizgisi). Göz kararı yazılmış 150
     pikselin tutmadığı yerde, iskeletin önlemesi gereken sarsıntıyı iskeletin
     kendisi üretiyordu. */
  if (board === undefined)
    return (
      /*
        `aria-hidden` KALKTI — canlı bölgeyi kendi elimizle iptal ediyordu.
        Aynı etikette hem `aria-hidden` hem `role="status"`, `aria-busy` ve
        `aria-label` vardı: `aria-hidden` ögeyi erişilebilirlik ağacından
        TAMAMEN çıkarır, yani duyuru hiç ateşlenmiyor ve etiket hiç
        okunmuyordu. §152'nin "yükleme duyurulsun" düzeltmesi bu kartta
        yazıldığı gün ölüydü ve §156'nın kapısı bunu göremiyordu: o kapı
        dosyada `aria-busy="true"` GEÇİYOR MU diye soruyor, ULAŞILABİLİR mi
        diye değil.
      */
      <section
        role="status"
        aria-busy="true"
        aria-label={t("dailyquests.daily_quests")}
        className="mt-4"
      >
        <div className="mb-3 flex items-baseline justify-between gap-3">
          <SkeletonLine variant="strong" width={130} />
          <SkeletonLine variant="caption" width={92} />
        </div>
        <CardGrid min={360}>
          {[0, 1, 2].map((i) => (
            <div key={i} className="card flex items-center gap-3 p-4" style={{ opacity: 1 - i * 0.12 }}>
              <SkeletonTile size={42} />
              <div className="min-w-0 flex-1">
                <SkeletonLine variant="body" width={`${70 - i * 8}%`} />
                <SkeletonBar height={6} className="mt-1.5" />
              </div>
            </div>
          ))}
        </CardGrid>
      </section>
    );
  if (!board) return null;

  const claimable = board.quests.filter((q) => q.done >= q.target && !q.claimed).length;

  return (
    <section
      /* Giriş animasyonu YOK: bu bölüm başlangıç ekranında bir zincirin
         halkası ve zinciri `Stagger` yönetiyor (bkz. components/reveal).
         Kendi başına belirdiğinde altı kart aynı anda ama farklı mesafelerle
         (kimi 8, kimi 14 piksel) açılıyordu — hepsi birden oynayan ama aynı
         ritmi tutmayan bir hareket. */
      className="mt-4"
    >
      {/*
        BÖLÜM BAŞLIĞI + KART IZGARASI — Android ile aynı yapı.

        Burası tek bir kartın içinde çizgiyle ayrılmış üç satırdı; Android ise
        başlığı kartın DIŞINDA tutup her görevi kendi kartı olarak ızgaraya
        koyuyor (`ui/DailyQuests`). İki uygulamada aynı pano iki ayrı şey gibi
        görünüyordu: webde dar bir liste kartı, Android'de geniş ekranda iki
        sütuna açılan kartlar. Ölçü de oradan: mobil `minItemWidth={380}`,
        web `min={360}` — aradaki fark bilinçli ve `learn-hub`ta gerekçesi
        yazılı (bu sayfa 48rem'de sabit, 380 iki sütunu asla sığdırmıyor).
      */}
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h2 className="flex items-center gap-2 text-h3 text-[color:var(--text-muted)]">
          <TargetIcon size={17} /> {t("dailyquests.daily_quests")}
        </h2>
        {claimable > 0 ? (
          <span
            className="tint-soft rounded-full px-2 py-0.5 text-micro"
            style={{ "--tint-fill": "var(--color-mint-500)", "--tint-ink": "var(--color-mint)" } as React.CSSProperties}
          >
            {t("dailyquests.rewards_ready", { n: claimable })}
          </span>
        ) : (
          <span className="muted text-caption">{t("dailyquests.resets_midnight")}</span>
        )}
      </div>

      <CardGrid min={360}>
        {board.quests.map((q) => {
          const done = q.done >= q.target;
          const pct = Math.min(100, Math.round((q.done / q.target) * 100));
          return (
            <div
              key={q.id}
              className="card flex items-center gap-3 p-4"
              style={{ borderColor: done ? "var(--color-mint)" : "var(--border)" }}
            >
              {/* Karo: tamamlanmışsa dolu yeşil + onay, değilse yumuşak marka
                  zemin + şimşek — Android `QuestRow` ile aynı (42 piksel). */}
              <span
                className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-tile"
                style={{
                  background: done ? "var(--color-mint)" : "color-mix(in srgb, var(--color-brand) 14%, transparent)",
                  color: done ? "#fff" : "var(--color-brand)",
                }}
              >
                {done ? <CheckIcon size={22} /> : <BoltIcon size={20} />}
              </span>

              <div className="min-w-0 flex-1">
                {/* Tamamlanmamış görev bir bağlantı: dokununca o bölüme
                    götürüyor. Yönlendirme işi asıl burada yapılıyor. */}
                {done ? (
                  <p className="truncate text-strong">{q.label}</p>
                ) : (
                  <Link href={q.href} className="block truncate text-strong hover:underline">
                    {q.label}
                  </Link>
                )}
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full surface-2">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: done ? "var(--color-mint)" : "var(--color-brand)" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max(3, pct)}%` }}
                  />
                </div>
                {/* Sayı çubuğun ALTINDA — Android'de de öyle; sağ sütun artık
                    kazanılacak XP'yi taşıyor. */}
                <p className="muted mt-1 text-micro tabular-nums">
                  {Math.min(q.done, q.target)}/{q.target}
                </p>
              </div>

              {/* Üç durum Android ile aynı: tamam+alınmamış → düğme,
                  ötekilerde kazanılacak XP (ilerleme çubuğun altında yazıyor). */}
              {done && !q.claimed ? (
                <button
                  onClick={() => void claim(q.id)}
                  disabled={busy === q.id}
                  className="btn btn-primary shrink-0 px-3 py-1.5 text-caption disabled:opacity-60"
                >
                  {busy === q.id ? "…" : t("dailyquests.claim_xp", { xp: q.xp })}
                </button>
              ) : (
                <span className="shrink-0 text-right">
                  <span
                    className="block text-strong"
                    style={{ color: done ? "var(--color-mint)" : "var(--color-brand)" }}
                  >
                    +{q.xp}
                  </span>
                  <span className="muted block text-micro">XP</span>
                </span>
              )}
            </div>
          );
        })}
      </CardGrid>

      {board.allDone ? (
        /* Kutu artık KENDİ kartı: pano tek bir kart olmaktan çıkınca bu
           şerit dayanaksız kalıyordu. Android'de de ayrı bir kart ve aynı
           renk ailesinde (`ui/DailyQuests`, `successSoft` zemin + `success`
           kenarlık). */
        <div
          className="card mt-3 flex items-center gap-3 p-4"
          style={{
            background: "color-mix(in srgb, var(--color-mint) 10%, transparent)",
            borderColor: "var(--color-mint)",
          }}
        >
          <GiftIcon size={22} />
          <p className="min-w-0 flex-1 text-strong">
            {board.allClaimed ? t("dailyquests.all_three_done") : t("dailyquests.all_three_done_sub")}
          </p>
          {board.allClaimed ? (
            <span className="muted shrink-0 text-micro">+{ALL_DONE_XP} XP</span>
          ) : (
            <button
              onClick={() => void claim(ALL_DONE_ID)}
              disabled={busy === ALL_DONE_ID}
              className="btn btn-primary shrink-0 px-3 py-1.5 text-caption disabled:opacity-60"
            >
              {busy === ALL_DONE_ID ? "…" : t("dailyquests.claim_xp", { xp: ALL_DONE_XP })}
            </button>
          )}
        </div>
      ) : null}

      {flash > 0 ? (
        <motion.p
          role="status"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 py-2 text-center text-strong"
          style={{ color: "var(--color-mint)" }}
        >
          {t("dailyquests.xp_earned", { xp: flash })}
        </motion.p>
      ) : null}
    </section>
  );
}
