"use client";

import { motion } from "framer-motion";
import { T, barPct, fillStyle, fillX } from "@/lib/motion";
import Link from "next/link";
import { MASTERED_DAYS } from "@/lib/srs";
import { MenuRow } from "@/components/menu-row";
import { WeakSpotsCard } from "@/components/weak-spots-card";
import { GrowthTrends, HowAmIDoing, HowAmIDoingHead, useGrowth } from "@/components/progress-panel";
import { ChevronNextIcon, CorrectIcon, DurationIcon, LevelIcon, MyWordsIcon, MyWritingsIcon, StreakIcon, XpIcon } from "@/components/icons";
import type { ComponentType, SVGProps } from "react";
import { useT, useLang } from "@/lib/i18n/client";
import { formatDay, formatNumber } from "@/lib/i18n/dict";

type LevelRow = {
  niveau: string;
  total: number;
  seen: number;
  mastered: number;
  familiar: number;
  learning: number;
};
type DayRow = { day: string; reviews: number; correct: number; xp: number };

const LEVEL_COLOR: Record<string, string> = {
  A1: "var(--color-mint)",
  A2: "var(--color-sky)",
  B1: "var(--color-violet)",
  B2: "var(--color-brand)",
  C1: "var(--color-rose)",
};

/**
 * İstatistikler KONUSUNA göre ikiye ayrıldı.
 *
 * Tek bir "ilerleme" bloğu vardı ve içinde iki ayrı soru duruyordu: "kelime
 * dağarcığım ne durumda" (seviye kapsamı, tekrar kuyruğu) ve "ben ne kadar
 * çalıştım" (seri, süre, hangi günler, hangi oyunda ne kadar iyiyim). Birincisi
 * Kelimeler ekranının, ikincisi profilin sorusu. Aynı kutuda durunca ikisi de
 * yanlış yerde oluyordu.
 *
 * Bölünme kod tekrarı yaratmıyor: ortak parçalar (KPI kartı, ısı haritası,
 * halka) aşağıda tek kopya.
 */
export function WordProgress({
  levels,
  dueNow,
  upcoming,
  leeches,
}: {
  levels: LevelRow[];
  dueNow: number;
  upcoming: number;
  leeches: number;
}) {
  const t = useT();

  return (
    <div className="space-y-4">
      {/* CEFR seviyeleri — satırlar Gelişim ekranıyla ORTAK (`LevelRows`). */}
      <section className="card p-4">
        <h2 className="mb-4 text-strong">{t("progress.by_level")}</h2>
        {/* Kelimeler sayfasında şerit kalın (12 px): sayfanın ana göstergesi bu. */}
        <LevelRows levels={levels} thick />
      </section>

      <section className="card p-4">
          <h2 className="mb-3 text-strong">{t("progress.review_queue")}</h2>
          <div className="flex items-center gap-4">
            <Donut value={dueNow} total={Math.max(1, dueNow + upcoming)} />
            <div className="text-body">
              <p>{t("progress.due_now", { n: dueNow })}</p>
              <p className="muted mt-1">{t("progress.upcoming", { n: upcoming })}</p>
              {leeches > 0 ? (
                <p className="mt-1 text-[color:var(--color-rose)]">{t("progress.leeches", { n: leeches })}</p>
              ) : null}
            </div>
          </div>
      </section>
    </div>
  );
}

/**
 * Seviye başına iki tonlu şerit (koyu = pekişmiş, açık = görülmüş) ve altında
 * şeridin ne demek olduğunu söyleyen not. Kelimeler ekranı ve Gelişim ekranı
 * aynı satırları çiziyor; mobil karşılığı `ProgressScreen` "Kelime ustalığı".
 */
export function LevelRows({ levels, thick = false }: { levels: LevelRow[]; /** Kelimeler sayfası 12 px, Gelişim kartı 6 px. */ thick?: boolean }) {
  const t = useT();
  const lang = useLang();
  const totalSeen = levels.reduce((s, l) => s + l.seen, 0);
  const totalWords = levels.reduce((s, l) => s + l.total, 0);
  return (
    <>
      <div className="space-y-3">
        {levels.map((l, i) => {
          const pct = l.total ? (l.seen / l.total) * 100 : 0;
          const masteredPct = l.total ? (l.mastered / l.total) * 100 : 0;
          return (
            <div key={l.niveau}>
              <div className="mb-1.5 flex items-baseline justify-between text-body">
                <span className="font-semibold">{l.niveau}</span>
                <span className="muted text-caption">
                  {t("progress.seen_of_total", {
                    seen: formatNumber(l.seen, lang),
                    total: formatNumber(l.total, lang),
                    mastered: formatNumber(l.mastered, lang),
                  })}
                </span>
              </div>
              <div className={`relative ${thick ? "h-3" : "h-1.5"} w-full overflow-hidden rounded-full surface-2`}>
                <motion.div
                  className="absolute inset-0 rounded-full opacity-40"
                  style={{ background: LEVEL_COLOR[l.niveau] ?? "var(--color-brand)" }}
                  initial={{ x: "-100%" }}
                  animate={{ x: fillX(pct) }}
                  transition={{ ...T.medium, delay: i * 0.08 }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ background: LEVEL_COLOR[l.niveau] ?? "var(--color-brand)" }}
                  initial={{ x: "-100%" }}
                  animate={{ x: fillX(masteredPct) }}
                  transition={{ ...T.medium, delay: i * 0.08 + 0.1 }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <p className="muted mt-3 text-caption">
        {t("progress.bar_note", { seen: formatNumber(totalSeen, lang), total: formatNumber(totalWords, lang), days: MASTERED_DAYS })}
      </p>
    </>
  );
}

/**
 * Gelişim ekranı — "neredeyim" sorusunun cevabı.
 *
 * Bölüm sırası mobil `ProgressScreen` ile birebir ve bir cümle kuruyor:
 * kaç gündür (seri kahramanı + bu hafta) → nasıl gidiyorum (hüküm, beceriler,
 * sıradaki adım) → ne biriktirdim (dört karo) → kelimelerim (ustalık + seviye)
 * → tekrar kuyruğu → son iki hafta → zayıf noktalar → zaman içinde →
 * kendi ölçülerim (Neler yapabilirim, Yazılarım).
 *
 * "Oyun performansın" kartı buradan çoktan kalktı: oyun başına doğruluk
 * yetkinlik modelinde, kelimenin SEVİYESİNE göre ayrışmış hâliyle duruyor.
 */
export function ActivityProgress({
  days,
  streak,
  longestStreak,
  seconds,
  mastered,
  totalWords,
  xp,
  level,
  today,
  levels,
  dueNow,
  upcoming,
  leeches,
}: {
  days: DayRow[];
  streak: number;
  /** En uzun seri — 0 ise bilinmiyor, satır çizilmez. */
  longestStreak: number;
  seconds: number;
  /** Pekişmiş kelime sayısı — kart Kelimeler ekranına götürüyor. */
  mastered: number;
  /** Seviyedeki toplam kelime — hakimiyet şeridinin paydası. */
  totalWords: number;
  xp: number;
  level: string;
  today: string;
  levels: LevelRow[];
  dueNow: number;
  upcoming: number;
  leeches: number;
}) {
  const t = useT();
  const lang = useLang();
  const growth = useGrowth();
  const byDay = new Map(days.map((d) => [d.day, d]));
  const pct = totalWords ? Math.min(100, Math.round((mastered / totalWords) * 100)) : 0;

  return (
    <div className="space-y-5">
      <StreakHero streak={streak} longestStreak={longestStreak} byDay={byDay} today={today} />

      <section>
        <HowAmIDoingHead data={growth} />
        <HowAmIDoing data={growth} />
      </section>

      {/* Dört karo mobildekiyle aynı: öğrenilen kelime, toplam XP, süre,
          seviye — ikon adları da aynı (`MyWordsIcon`, `XpIcon`,
          `DurationIcon`, `LevelIcon`; web-parity §11.411). Karo bugünün
          standardında: dolu renkli ikon karosu + `h2` değer. */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <KpiCard
          label={t("progress.words_learned")}
          value={formatNumber(mastered, lang)}
          tone="var(--color-brand-500)"
          Icon={MyWordsIcon}
          href="/words"
        />
        <KpiCard label={t("progress.total_xp")} value={formatNumber(xp, lang)} tone="var(--color-mint-500)" Icon={XpIcon} />
        <KpiCard label={t("progress.time_total")} value={formatDuration(seconds, t)} tone="var(--color-sky-500)" Icon={DurationIcon} />
        <KpiCard label={t("progress.level")} value={level} tone="var(--color-violet-500)" Icon={LevelIcon} />
      </div>

      {/* KELİME USTALIĞI + SEVİYE KIRILIMI tek kart ve KART BİR HEDEF:
          Kelimeler ekranı. Seviye satırları Android'de bu ekranda duruyordu,
          web'de yalnız Kelimeler'deydi; iki taraf artık aynı kartı çiziyor. */}
      <Link href="/words" aria-label={t("profile.my_words")} className="pressable card block p-4">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-h3">{t("progress.word_mastery")}</span>
          <span className="muted flex items-center gap-1.5 text-caption tabular-nums">
            {formatNumber(mastered, lang)}/{totalWords ? formatNumber(totalWords, lang) : "—"}
            <ChevronNextIcon size={18} className="shrink-0" />
          </span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}>
          <div
            className="bar-fill h-full rounded-full"
            style={{ ...fillStyle(barPct(pct, 3)), background: "var(--color-mint-500)" }}
          />
        </div>
        {levels.length ? (
          <div className="mt-4 border-t pt-3" style={{ borderColor: "var(--hairline)" }}>
            <p className="muted mb-2 text-micro uppercase tracking-eyebrow">{t("progress.by_level")}</p>
            <LevelRows levels={levels} />
          </div>
        ) : null}
      </Link>

      {/* TEKRAR KUYRUĞU — Android'deki kartın aynısı (üç satır). */}
      <section className="card p-4">
        <h2 className="mb-2 text-h3">{t("progress.review_queue")}</h2>
        <p className="text-body">{t("progress.due_now", { n: dueNow })}</p>
        <p className="muted text-body">{t("progress.upcoming", { n: upcoming })}</p>
        {leeches > 0 ? <p className="text-body text-[color:var(--color-rose)]">{t("progress.leeches", { n: leeches })}</p> : null}
      </section>

      <ActivityStrip byDay={byDay} today={today} />

      {/* Zayıf noktalar KENDİ kartında (eskiden "Nasıl gidiyorum" açılırının
          içindeydi, Android'de ayrı karttı). */}
      <WeakSpotsCard />

      <GrowthTrends data={growth} />

      {/*
        KENDİ ÖLÇÜN: yeterlik (Neler yapabilirim) ve değerlendirilmiş üretimin
        arşivi (Yazılarım). Standart menü satırı grubu; mobil aynı iki satır.
      */}
      <nav className="card px-4" aria-label={t("progress.progress")}>
        <MenuRow href="/profile/cando" icon={<CorrectIcon size={20} />} tone="mint" label={t("profile.what_can_i_do")} />
        <MenuRow href="/profile/writings" icon={<MyWritingsIcon size={20} />} tone="sky" label={t("profile.my_posts")} last />
      </nav>
    </div>
  );
}

/**
 * SERİ KAHRAMANI — Öğren'in "Günlük tur" kartıyla aynı dolgu (`--brand-fill`
 * + `--on-brand`, temadan bağımsız; mobil `colors.primary` + `onPrimary`).
 * Beyaz yazı / turuncu 2.77: Öğren kahramanıyla aynı kayıtlı karar
 * (T-KARAR-1).
 *
 * Alev ikonu seri ailesinin EN KOYU basamağında (`flame-700`, mobil
 * `streakInk`): yarı saydam beyaz karo turuncuyu #f99141'e açıyor ve seri
 * tonlarından yalnız 700 orada grafik eşiğini (3.0) geçiyor — 3.21 (mobilde
 * karo alfası 0.18, #f98f3d: 3.16). 600 2.27, 500 1.26, açık tonlar 1.5-1.9.
 *
 * Altta "bu hafta": pazartesiden pazara yedi nokta, çalışılan gün dolu.
 */
function StreakHero({
  streak,
  longestStreak,
  byDay,
  today,
}: {
  streak: number;
  longestStreak: number;
  byDay: Map<string, DayRow>;
  today: string;
}) {
  const t = useT();
  const lang = useLang();
  const week = weekDays(today, (d) => (byDay.get(d)?.reviews ?? 0) > 0);
  const studied = week.filter((d) => d.studied).length;
  const names = weekdayNames(t);
  return (
    <div
      className="overflow-hidden rounded-card glow-tint-lg"
      style={{ background: "var(--brand-fill)", color: "var(--on-brand)", "--tint-fill": "var(--brand-fill)" } as React.CSSProperties}
    >
      <div className="flex items-center gap-4 p-5">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-tile bg-white/20" style={{ color: "var(--color-flame-700)" }}>
          <StreakIcon size={34} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-display tabular-nums">{formatNumber(streak, lang)}</span>
          <span className="block text-strong">{t("progress.day_streak")}</span>
          {/* EN UZUN SERİ: bugünkü sayı ancak kendi rekoruyla kıyaslanınca bir şey söylüyor. */}
          {longestStreak > 0 ? (
            <span className="block text-caption opacity-90">
              {t("progress.longest_streak", { n: formatNumber(longestStreak, lang) })}
            </span>
          ) : null}
        </span>
      </div>
      <div className="px-5 pb-4">
        <div className="mb-2 flex justify-between text-micro uppercase tracking-eyebrow opacity-85">
          <span>{t("progress.this_week")}</span>
          <span className="tabular-nums">{t("progress.week_days", { n: studied })}</span>
        </div>
        <ol className="flex justify-between gap-1">
          {week.map((d) => (
            <li key={d.day} className="flex flex-1 flex-col items-center gap-1">
              <span
                role="img"
                aria-label={`${formatDay(d.day, lang)}: ${d.studied ? t("progress.studied") : t("progress.no_study")}`}
                className={`h-6 w-6 rounded-full ${d.studied ? "bg-white" : d.future ? "border border-white/40" : "bg-white/25"}`}
              />
              <span className={`text-micro leading-none ${d.day === today ? "font-bold" : "opacity-80"}`}>{names[d.weekday]}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/** Bu haftanın yedi günü (pazartesi başı); `today` UTC gün dizgisi. */
function weekDays(today: string, studied: (day: string) => boolean) {
  const end = new Date(`${today}T00:00:00Z`);
  const offset = (end.getUTCDay() + 6) % 7;
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(end);
    d.setUTCDate(d.getUTCDate() - offset + i);
    const key = d.toISOString().slice(0, 10);
    return { day: key, weekday: i, studied: i <= offset && studied(key), future: i > offset };
  });
}

function formatDuration(
  totalSeconds: number,
  t: (key: string, vars?: Record<string, string | number>) => string,
): string {
  /*
   * BİÇİM ANDROİD'İN SÖZLÜĞÜNDEN (`time.minutes_short` /
   * `time.hours_minutes_short`, etiket `progress.time_total`): aynı karo iki
   * platformda iki ayrı biçimde yazılıyordu.
   */
  const m = Math.round(totalSeconds / 60);
  if (m < 60) return t("time.minutes_short", { m });
  const h = Math.floor(m / 60);
  return t("time.hours_minutes_short", { h, m: m % 60 });
}

function KpiCard({
  label,
  value,
  tone,
  Icon,
  href,
}: {
  label: string;
  value: string;
  /** Karonun dolgusu — ailenin 500 basamağı (Öğren'in "daha fazlası" karoları gibi). */
  tone: string;
  Icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
  /**
   * Verilirse kart bir bağlantı olur: "pekişen kelime" sayısının ayrıntısı
   * Kelimeler ekranında ve meraklanan kişi zaten bu karta bakıyor.
   */
  href?: string;
}) {
  const body = (
    <>
      <div className="flex items-start justify-between">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-tile text-white glow-tint-sm"
          style={{ background: tone, "--tint-fill": tone } as React.CSSProperties}
        >
          <Icon size={20} />
        </span>
        {href ? (
          <span className="muted">
            <ChevronNextIcon size={16} />
          </span>
        ) : null}
      </div>
      <div className="mt-2 text-h2 tabular-nums">{value}</div>
      <div className="muted text-caption">{label}</div>
    </>
  );

  if (href) {
    return (
      <Link href={href} prefetch={false} className="pressable card block p-4">
        {body}
      </Link>
    );
  }
  return <div className="card p-4">{body}</div>;
}

/** Şeritteki gün sayısı — iki tam hafta, hafta sonu ritmi görünsün diye. */
const STRIP_DAYS = 14;

/**
 * Çalışılan en düşük günün taban yüksekliği (yüzde) — üstüne oran biniyor.
 * Tabansız bırakılırsa bir tekrar yapılan gün sıfır piksel çiziliyor ve
 * "hiç çalışmadım" ile aynı görünüyor.
 */
const STRIP_FLOOR_PCT = 14;

/**
 * Isı basamakları — [eşik, karışım yüzdesi]; son satır eşiksiz tavan.
 *
 * Mobil `ActivityStrip` ile AYNI tablo (`check:parity` ikisini
 * karşılaştırıyor); ayrılırlarsa aynı çalışma iki platformda farklı
 * yoğunlukta görünür.
 */
const HEAT_RAMP: [number, number][] = [[8, 28], [16, 50], [32, 72], [Infinity, 100]];

/**
 * Gün kısaltmaları — Gelişim'in İKİ satırında (bu hafta, son iki hafta) TEK
 * kaynak (QA F-0058). Üstteki satır yerelin kısa adını ("Pzt, Sal, Çar…"),
 * şerit onun ilk iki harfini ("Pz, Sa, Ça… Cm, Pa") yazıyordu: aynı ekranda
 * aynı gün iki ayrı adla. Şeride üç harf sığmıyor (14 sütun, 375 px'te
 * ~20 px; "Cmt" komşusuna biniyordu), tek harf de Pazartesi/Perşembe/Pazar'ı
 * aynı harfe düşürüyor — ortak biçim iki harf. Kesmek Türkçede yerleşik
 * kısaltmayı vermiyor (Pazar "Pa", Cumartesi "Cm"); liste sözlükte, dil
 * başına elle: "Pt Sa Ça Pe Cu Ct Pz", "Mo Tu We…", "Mo Di Mi…". Hafta
 * pazartesiyle başlıyor. Mobil `ProgressScreen` aynı anahtar.
 */
function weekdayNames(t: (key: string) => string): string[] {
  return t("progress.weekdays_short").split(" ");
}

/**
 * Son iki haftanın çalışma ritmi.
 *
 * Burada sekiz haftalık bir ısı haritası vardı: yedi sıra, sekiz sütun,
 * altında bir de "az/çok" göstergesi. Kart tek başına 314 piksel yer
 * kaplıyordu ve profildeki en uzun bloktu — oysa söylediği tek şey "hangi
 * günler çalıştım".
 *
 * Günlük ayrıntıyı sekiz haftaya yaymak ya yedi sıra ya da çok uzun bir şerit
 * istiyor; kompakt olmanın yolu iki boyuttan birini bırakmaktan geçiyor.
 * Bırakılan boyut MENZİL oldu, ayrıntı değil: "dün çalıştım mı, hafta sonları
 * düşüyor muyum" sorusu davranışı değiştiren soru; iki ay önceki salı değil.
 * Uzun vadeli emek zaten üstteki "en uzun seri" ve "çalışma süresi"nde duruyor.
 *
 * Sütun yüksekliği o günün tekrar sayısı, pencerenin en yoğun gününe göre
 * ölçekleniyor — mutlak bir eşik olsaydı az çalışan birinde şerit hep dümdüz,
 * çok çalışanda hep tavanda görünürdü. Çalışılmayan gün ince bir taban çizgisi
 * bırakıyor: boşluk da bir bilgi, ama sütunlar hizasını kaybetmemeli.
 */
function ActivityStrip({ byDay, today }: { byDay: Map<string, DayRow>; today: string }) {
  const t = useT();
  const lang = useLang();
  const end = new Date(`${today}T00:00:00Z`);
  const days: { day: string; reviews: number; weekday: number }[] = [];
  for (let i = STRIP_DAYS - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setUTCDate(d.getUTCDate() - i);
    const key = d.toISOString().slice(0, 10);
    days.push({ day: key, reviews: byDay.get(key)?.reviews ?? 0, weekday: (d.getUTCDay() + 6) % 7 });
  }

  const peak = Math.max(1, ...days.map((d) => d.reviews));
  const active = days.filter((d) => d.reviews > 0).length;
  const total = days.reduce((s, d) => s + d.reviews, 0);
  const names = weekdayNames(t);

  return (
    <section className="card p-4">
      <div className="mb-2.5 flex items-baseline justify-between gap-3">
        <h2 className="text-h3">{t("progress.last_two_weeks")}</h2>
        <p className="muted text-caption tabular-nums">
          {t("social.days", { n: active })} · {t("progress.n_reviews", { n: formatNumber(total, lang) })}
        </p>
      </div>

      <div className="flex h-11 items-end gap-[3px]">
        {days.map((d, i) => {
          const isToday = d.day === today;
          // Çalışılan en düşük gün bile görünür olmalı: %14 taban, üstüne oran.
          const pct = d.reviews > 0 ? STRIP_FLOOR_PCT + Math.round((d.reviews / peak) * (100 - STRIP_FLOOR_PCT)) : 0;
          return (
            <div key={d.day} className="flex min-w-0 flex-1 items-end" style={{ height: "100%" }}>
              {d.reviews > 0 ? (
                /* Yükseklik değil dikey ölçek: çubuk son boyuyla yerleşiyor, yalnız
                   giriş `scaleY` 0→1 (alttan). Yerleşim her karede yeniden
                   hesaplanmıyor; bitince ölçek 1, köşe yuvarlağı bozulmuyor. */
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ ...T.medium, delay: i * 0.02 }}
                  /* ÇUBUĞUN ADI VAR. Buradaki sayı yalnız `title`da duruyordu —
                     fareyle üstüne gelmeyi gerektiren, dokunmatikte ve ekran
                     okuyucuda hiç bulunmayan bir bilgi. Grafiğin altındaki
                     satır yalnız GÜN HARFİNİ yazıyor, değeri değil; başlıktaki
                     özet de toplamı veriyor, günlük dağılımı değil. Android
                     aynı çubuğa `accessibilityLabel` koyuyor (`ProgressScreen`)
                     ve metin birebir aynı. */
                  role="img"
                  aria-label={`${formatDay(d.day, lang)}: ${t("progress.n_reviews", { n: d.reviews })}`}
                  title={`${formatDay(d.day, lang)}: ${t("progress.n_reviews", { n: d.reviews })}`}
                  className={`w-full origin-bottom rounded-[3px] ${isToday ? "brand-gradient" : ""}`}
                  style={isToday ? { height: `${pct}%` } : { height: `${pct}%`, background: heatColor(d.reviews) }}
                />
              ) : (
                <div
                  role="img"
                  aria-label={`${formatDay(d.day, lang)}: ${t("progress.no_study")}`}
                  title={`${formatDay(d.day, lang)}: ${t("progress.no_study")}`}
                  className="w-full rounded-full surface-2"
                  style={{ height: 3 }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Gün harfleri hafta sonu düşüşünü görünür kılıyor — şeridin tek başına
          söyleyemediği şey bu. Bugün koyu, geri kalanı silik. */}
      <div className="mt-1.5 flex gap-[3px]">
        {days.map((d) => (
          <span
            key={d.day}
            className={`min-w-0 flex-1 text-center text-micro leading-none ${
              d.day === today ? "font-bold" : d.weekday >= 5 ? "muted opacity-60" : "muted"
            }`}
          >
            {/* Üstteki "bu hafta" satırıyla aynı ad (`weekdayNames`, QA F-0058). */}
            {names[d.weekday]}
          </span>
        ))}
      </div>
    </section>
  );
}

function heatColor(count: number) {
  if (count <= 0) return "var(--surface-2)";
  const mix = HEAT_RAMP.find(([esik]) => count < esik)?.[1] ?? 100;
  return `color-mix(in srgb, var(--color-brand) ${mix}%, var(--surface-2))`;
}

function Donut({ value, total }: { value: number; total: number }) {
  const pct = Math.min(100, (value / total) * 100);
  return (
    <div
      className="relative h-20 w-20 shrink-0 rounded-full"
      style={{
        background: `conic-gradient(var(--color-flame) ${pct}%, var(--surface-2) ${pct}% 100%)`,
      }}
    >
      <div
        className="absolute inset-2 flex items-center justify-center rounded-full text-strong"
        style={{ background: "var(--surface)" }}
      >
        {value}
      </div>
    </div>
  );
}

