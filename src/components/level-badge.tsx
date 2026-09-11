"use client";

import { motion } from "framer-motion";
import { useT, useLang } from "@/lib/i18n/client";
import { formatNumber, formatPercent } from "@/lib/i18n/dict";

/*
 * Rozet DOLU bir zemin ve üstünde beyaz yazı taşıyor, o yüzden tonlar temaya
 * duyarlı DEĞİL: rozet kendi zeminini getiriyor, önemli olan yalnızca beyazla
 * kontrastı. Beşi de 5.0 ve üstünde.
 *
 * C1 eskiden hardaldı; B2'nin kehribarıyla ΔE 14.9 veriyordu ve rozette rengi
 * açıklayan bir etiket yok — iki seviye birbirine karışıyordu. Kiremitle 26.1.
 */
  /*
   * B2 turuncunun 700'ünde, diğerleri 600'de. Sebep ölçüm: rozet DOLU zemin +
   * beyaz yazı ve renk tek taşıyıcı (yanında rengi açıklayan etiket yok), yani
   * KATI eşik geçerli. Marka turuncusuna geçildiğinde 600 (#db5f08) beyazla
   * 3.72 veriyordu; 700 (#b44909) 5.39. Birincil butonun kabul edilmiş sapması
   * (T-KARAR-1) buraya UZANMIYOR: orada zeminin markanın kendisi olması bir
   * kimlik kararı, burada zemin bir bilgi taşıyıcısı.
   */
const TONE: Record<string, string> = {
  A1: "var(--color-mint-600)",
  A2: "var(--color-sky-600)",
  B1: "var(--color-violet-600)",
  B2: "var(--color-brand-700)",
  C1: "var(--color-rose-600)",
};

/**
 * Seçilen CEFR seviyesi ve o seviyenin pekişme durumu.
 *
 * Burada bilerek bir rütbe yok. Seviye kullanıcının kendi beyanıdır ve yalnızca
 * profilden değişir; gösterilen şey biriktirdiği kelimedir. Ölçü yalnızca artar
 * — kimseye "geriye gittin" denmez, çünkü bir oturumun doğruluk oranı zaten
 * yetkinliği değil kuyruğun bileşimini ölçer.
 */
export function LevelBadge({
  level,
  mastered,
  total,
  compact = false,
}: {
  level: string;
  mastered: number;
  total: number;
  compact?: boolean;
}) {
  const t = useT();
  const lang = useLang();
  const tone = TONE[level] ?? "var(--color-brand)";
  const pct = total > 0 ? Math.min(100, (mastered / total) * 100) : 0;

  return (
    <div className={compact ? "flex items-center gap-2" : "space-y-1.5"}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <motion.span
            key={level}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
            className="rounded-chip px-2 py-0.5 text-sm font-black text-white"
            style={{ background: tone }}
          >
            {level}
          </motion.span>
          {!compact ? (
            /* Tek satır: "1.234 Wörter gefestigt" dar kartta ikinci satıra
               düşüp armanın yüksekliğini değiştiriyordu. Android aynı satırı
               `numberOfLines={1}` ile tutuyor. */
            <span className="muted truncate text-xs font-semibold">
              {mastered > 0
                ? t("level.mastered_count", { n: formatNumber(mastered, lang) })
                : t("level.mastered_none")}
            </span>
          ) : null}
        </div>
        {!compact && total > 0 ? (
          <span className="muted text-xs font-semibold tabular-nums">
            {pct < 1 && mastered > 0 ? t("common.pct_lt1") : formatPercent(Math.round(pct), lang)}
          </span>
        ) : null}
      </div>

      {!compact ? (
        <div className="h-1.5 w-full overflow-hidden rounded-full surface-2">
          <motion.div
            className="h-full rounded-full"
            style={{ background: tone }}
            initial={{ width: 0 }}
            animate={{ width: `${Math.max(pct, mastered > 0 ? 1.5 : 0)}%` }}
            transition={{ type: "spring", stiffness: 140, damping: 24 }}
          />
        </div>
      ) : null}
    </div>
  );
}
