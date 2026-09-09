"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { TIER_COLOR, type BadgeRow } from "@/components/achievement-badge";
import { CheckIcon, TrophyIcon } from "@/components/icons";
import { GROUP_LABEL_KEYS, GROUP_ORDER } from "@/lib/achievement-groups";
import { useT, useLang } from "@/lib/i18n/client";
import { formatNumber, localeOf, type NativeLang } from "@/lib/i18n/dict";

/**
 * Rozet duvarı — KENDİ SAYFASINDA, mobil `AchievementsScreen` yerleşiminde.
 *
 * Bir ara sekmelidir: yedi grup birer çip olmuş, aynı anda yalnız biri
 * çizilirdi. Gerekçesi duvarın PROFİLİN İÇİNDE olmasıydı — yedi başlık ve on
 * ızgara satırı, ilerlemeyi ve ayarları katlanın çok altına itiyordu. Şerit
 * R'de duvar kendi adresine taşındı (`/profile/achievements`) ve o gerekçe
 * ortadan kalktı; mobil de kendi ekranında bütün grupları alt alta diziyor.
 *
 * Sekmeler bir şeyi daha yapıyordu: bir gruba bakan kişi öbür grupları
 * göremiyordu. Rozet duvarının işi tam olarak "neler var" sorusunu bir
 * bakışta cevaplamak.
 *
 * "SIRADAKİ" KALIYOR ama sekme değil, en üstteki BÖLÜM. Duvara bakan kişinin
 * asıl sorusu "neyim var" değil "ne yapmalıyım"; onu grupların önüne koymak
 * yedi grubu tarayıp aynı çıkarımı yapmasını beklemekten iyi.
 *
 * AYRINTI PANELİ GİTTİ. Mobilde kartın kendisi her şeyi taşıyor: başlık,
 * ipucu, kademe ve ilerleme. Ayrı bir panel, dokunmayı gerektiren ve
 * dokunulduğunda ızgarayı aşağı iten bir katmandı.
 */

type Row = BadgeRow & { group: string; unlockedAt: string | null };
type Board = { rows: Row[]; unlockedCount: number; total: number };



/** "Sıradaki" bölümünde kaç rozet gösterilir. */
const NEXT_COUNT = 4;

export function AchievementWall() {
  const t = useT();
  const lang = useLang();
  const [board, setBoard] = useState<Board | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/achievements", { cache: "no-store" });
        if (!res.ok) return alive && setFailed(true);
        /*
          Gövde körü körüne dönüştürülmüyor. Rozet duvarı artık profilin
          İÇİNDE çiziliyor; biçimi tutmayan bir cevap `undefined.toLocaleString`
          ile patlasa hata sınırı bütün profili "bir şeyler ters gitti"ye
          düşürürdü. Rozet ikincil bir bölüm, tek başına ekranı indirmemeli.
        */
        const data = (await res.json()) as Partial<Board>;
        if (!alive) return;
        if (Array.isArray(data.rows) && typeof data.total === "number") {
          setBoard(data as Board);
        } else {
          setFailed(true);
        }
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

  /** En üstteki bölüm: bitmeye yakın olanlar, hepsi bittiyse son kazanılanlar. */
  const lead = upcoming.length ? upcoming : recent;

  if (failed) return null;

  if (!board) {
    return (
      <section className="card p-5">
        <h2 className="mb-3 flex items-center gap-2 font-bold">
          <TrophyIcon size={18} /> {t("achw.badges")}
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
  const leadLabel = t(upcoming.length ? "skills.next" : "achw.recent");

  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between">
        <h2 className="flex items-center gap-2 font-bold">
          <TrophyIcon size={18} /> {t("achw.badges")}
        </h2>
        <span className="muted text-xs font-semibold tabular-nums">
          {formatNumber(board.unlockedCount, lang)} / {formatNumber(board.total, lang)}
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}>
        <motion.div
          className="brand-gradient h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 24 }}
        />
      </div>

      {/* Önce "sıradaki", sonra mobildeki grup sırası. */}
      <Section label={leadLabel} rows={lead} lang={lang} t={t} />
      {GROUP_ORDER.map((g) => (
        <Section
          key={g}
          label={GROUP_LABEL_KEYS[g] ? t(GROUP_LABEL_KEYS[g]) : g}
          rows={board.rows.filter((r) => r.group === g)}
          lang={lang}
          t={t}
        />
      ))}
    </div>
  );
}

type Tr = (key: string, vars?: Record<string, string | number>) => string;

/** Mobildeki bölüm: küçük büyük-harf etiket + iki sütunlu kart ızgarası. */
function Section({ label, rows, lang, t }: { label: string; rows: Row[]; lang: NativeLang; t: Tr }) {
  if (!rows.length) return null;
  return (
    <section className="mt-5">
      {/* Büyük harfe çevirme YEREL: Türkçede "i" → "İ" (bkz. localeOf). */}
      <p className="muted mb-2 ml-1 text-caption tracking-wide">{label.toLocaleUpperCase(localeOf(lang))}</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {rows.map((r) => (
          <AchievementCard key={r.id} row={r} lang={lang} t={t} />
        ))}
      </div>
    </section>
  );
}

/**
 * Rozet kartı — mobil `AchievementsScreen` › `Badge`in aynısı: kademe renkli
 * madalya, başlık, ipucu ve altında ya "kazanıldı" ya ilerleme şeridi.
 *
 * Her şey KARTIN ÜSTÜNDE. Web'de ipucu ve ilerleme ızgaranın altındaki ayrı
 * bir panelde duruyordu ve görmek için dokunmak gerekiyordu — kırk bir rozet
 * için kırk bir dokunuş.
 */
function AchievementCard({
  row,
  lang,
  t,
}: {
  row: Row;
  lang: NativeLang;
  t: Tr;
}) {
  const tone = TIER_COLOR[row.tier];
  const pct = row.target ? Math.min(100, Math.round((row.done / row.target) * 100)) : 0;
  return (
    <div className="card p-3" style={{ opacity: row.unlocked ? 1 : 0.92 }}>
      <span
        className="flex h-[46px] w-[46px] items-center justify-center rounded-full"
        style={
          row.unlocked
            ? { background: tone, color: "#fff", boxShadow: `0 6px 16px -6px ${tone}` }
            : { background: "var(--surface-2)", color: "var(--text-faint)" }
        }
      >
        <TrophyIcon size={24} />
      </span>
      <p className="mt-2 text-strong">{row.title}</p>
      <p className="muted mt-0.5 text-micro">{row.hint}</p>
      {row.unlocked ? (
        <p className="mt-2 flex items-center gap-1 text-micro" style={{ color: "var(--color-mint)" }}>
          <CheckIcon size={14} /> {t("achievements.earned")}
        </p>
      ) : (
        <div className="mt-2">
          <div className="h-[5px] overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}>
            <div className="h-full rounded-full" style={{ width: `${pct}%`, background: tone }} />
          </div>
          <p className="muted mt-1 text-micro tabular-nums">
            {formatNumber(row.done, lang)}/{formatNumber(row.target, lang)}
          </p>
        </div>
      )}
    </div>
  );
}
