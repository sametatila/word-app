"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MASTERED_DAYS } from "@/lib/srs";
import { BookIcon, CheckIcon, ChevronRightIcon, ClockIcon, FlameIcon, PenIcon, SparkIcon, TrophyIcon } from "@/components/icons";
import { Mascot } from "@/components/mascot";
import type { ComponentType, SVGProps } from "react";
import { useT, useLang } from "@/lib/i18n/client";
import { formatNumber, localeOf, type NativeLang } from "@/lib/i18n/dict";

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
  const totalSeen = levels.reduce((s, l) => s + l.seen, 0);
  const totalWords = levels.reduce((s, l) => s + l.total, 0);

  return (
    <div className="space-y-4">
      {/* CEFR seviyeleri */}
      <section className="card p-5">
        <h2 className="mb-4 font-bold">{t("progress.by_level")}</h2>
        <div className="space-y-4">
          {levels.map((l, i) => {
            const pct = l.total ? (l.seen / l.total) * 100 : 0;
            const masteredPct = l.total ? (l.mastered / l.total) * 100 : 0;
            return (
              <div key={l.niveau}>
                <div className="mb-1.5 flex items-baseline justify-between text-body">
                  <span className="font-semibold">{l.niveau}</span>
                  <span className="muted text-caption">
                    {t("progress.seen_of_total", { seen: l.seen, total: l.total, mastered: l.mastered })}
                  </span>
                </div>
                <div className="relative h-3 w-full overflow-hidden rounded-full surface-2">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full opacity-40"
                    style={{ background: LEVEL_COLOR[l.niveau] ?? "var(--color-brand)" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ delay: i * 0.08, type: "spring", stiffness: 140, damping: 24 }}
                  />
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ background: LEVEL_COLOR[l.niveau] ?? "var(--color-brand)" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${masteredPct}%` }}
                    transition={{ delay: i * 0.08 + 0.1, type: "spring", stiffness: 140, damping: 24 }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <p className="muted mt-4 text-caption">
          {t("progress.bar_note", { seen: totalSeen, total: totalWords, days: MASTERED_DAYS })}
        </p>
      </section>

      <section className="card p-5">
          <h2 className="mb-3 font-bold">{t("progress.review_queue")}</h2>
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
 * Profilin emek bloğu: ne kadar biriktirdi, hangi günler çalıştı.
 *
 * "Oyun performansın" kartı buradaydı ve kalktı: oyun başına doğruluk yüzdesi
 * artık yetkinlik modelinde, üstelik daha doğru biçimde — oyunlar kanıt olarak
 * sayılıyor ve kelimenin SEVİYESİNE göre ayrışıyor. "Eşleştirmede %88" ile
 * "B1 kelimede %88" arasındaki fark, ikincisinin bir şey ifade etmesi.
 *
 * Kalanların hepsi kişi hakkında; kelime hakkında olanlar Kelimeler ekranında.
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
}) {
  const t = useT();
  const lang = useLang();
  const byDay = new Map(days.map((d) => [d.day, d]));
  const pct = totalWords ? Math.min(100, Math.round((mastered / totalWords) * 100)) : 0;

  return (
    <div className="space-y-4">
      {/*
        SERİ KAHRAMANI — mobil `ProgressScreen`in ilk kartı. Web'de seri dört
        eşit karodan biriydi; oysa bu ekrana çoğunlukla başlıktaki seri
        rozetinden geliniyor, yani gelen kişinin sorusu "kaç gün" ve cevabı
        diğer üç sayıyla aynı boyda duruyordu.
      */}
      {/* ZEMİN 600, 500 DEĞİL. Ölçüm: beyaz yazı `flame-500` (#b8940f) üstünde
          2.88 veriyor - AA'nın küçük yazı için istediği 4.5'in çok altında ve
          büyük yazı eşiği 3.0'ı bile tutmuyor. 600'de (#86690e) 5.20. Aynı
          kart mobilde de aynı hatayı taşıyordu; ikisi birlikte koyulaştı. */}
      <div
        className="flex items-center gap-4 rounded-card p-5 text-white shadow-soft"
        style={{ background: "var(--color-flame-600)" }}
      >
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-tile bg-white/20">
          <FlameIcon size={34} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-display">{streak}</span>
          <span className="block text-strong">{t("progress.day_streak")}</span>
          {/*
            EN UZUN SERİ. Sunucu bunu zaten gönderiyor ve BAŞKASININ profilinde
            görünüyordu; kendi ekranında yoktu. Bugünkü sayı ancak kendi
            rekoruyla kıyaslanınca bir şey söylüyor.
          */}
          {/* Saydamlık 75'ten 90'a: 600 zeminde %75 beyaz 3.70, %90 ise 4.56. */}
          {longestStreak > 0 ? (
            <span className="block text-caption text-white/90">
              {t("progress.longest_streak", { n: formatNumber(longestStreak, lang) })}
            </span>
          ) : null}
        </span>
        <Mascot mood={streak > 0 ? "happy" : "idle"} size={58} />
      </div>

      {/* Dört karo mobildekiyle aynı: öğrenilen kelime, toplam XP, bu hafta
          süre, seviye. Web'de bunların ikisi (güncel/en uzun seri) seriyi iki
          kez söylüyordu; en uzun seri zaten herkese açık profilde yazıyor. */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {/* Tek dokunuşla kelime ekranına: kapsamın ayrıntısı orada. */}
        <KpiCard
          label={t("progress.words_learned")}
          value={formatNumber(mastered, lang)}
          tone="var(--color-brand)"
          Icon={BookIcon}
          href="/words"
        />
        <KpiCard label={t("progress.total_xp")} value={formatNumber(xp, lang)} tone="var(--color-mint)" Icon={SparkIcon} />
        <KpiCard label={t("progress.time_total")} value={formatDuration(seconds, t)} tone="var(--color-sky)" Icon={ClockIcon} />
        <KpiCard label={t("progress.level")} value={level} tone="var(--color-violet)" Icon={TrophyIcon} />
      </div>

      {/*
        KENDİ ÖLÇÜN BURADA. Profilden taşınan iki satır: yeterlik
        (Yapabildiklerim) ve değerlendirilmiş üretimin arşivi (Yazılarım).
        Başarımlar taşınmadı — rozet sayısı herkese açık profilde görünüyor,
        yani kimliğin parçası. Mobil Gelişim ekranıyla aynı bölünme.
      */}
      <nav className="card px-4" aria-label={t("progress.progress")}>
        <ProgressRow href="/profile/cando" icon={<CheckIcon size={20} />} tone="var(--color-mint-500)" label={t("profile.what_can_i_do")} />
        <ProgressRow href="/profile/writings" icon={<PenIcon size={20} />} tone="var(--color-sky-500)" label={t("profile.my_posts")} last />
      </nav>

      {/* Kelime hakimiyeti — mobilde karoların hemen altında tek şerit.
          KART BİR HEDEF: Android'de şeridin kendisi Kelimeler'e götürüyor
          (`ProgressScreen`, gerekçesi orada: "Kart hedefsiz duruyordu, satır
          da bağlamsızdı; ikisi birleşti"). Web'de şerit tıklanamıyordu —
          hedef sekme çubuğunda var ama karttan yol yoktu. */}
      <Link href="/words" aria-label={t("profile.my_words")} className="pressable card block p-4">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-strong">{t("progress.word_mastery")}</span>
          <span className="muted flex items-center gap-1.5 text-caption tabular-nums">
            {formatNumber(mastered, lang)}/{totalWords ? formatNumber(totalWords, lang) : "—"}
            {/* Kartin dokunulabilir oldugunu soyleyen isaret - Android'de de
                sayinin yaninda duruyor. */}
            <ChevronRightIcon size={18} className="shrink-0" />
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}>
          <div
            className="h-full rounded-full transition-[width] duration-500"
            style={{ width: `${Math.max(3, pct)}%`, background: "var(--color-mint-500)" }}
          />
        </div>
      </Link>

      {/*
        BAŞARIMLAR SATIRI BURADAN KALDIRILDI. Yorumu "mobilde de ilerlemenin
        altında" diyordu ve bu artık doğru değil: Android onu bilerek
        kaldırmış ve gerekçesini yazmış (`ProgressScreen`) — rozet sayısı
        herkese açık profilde görünüyor, yani statü işareti ve yeri profil;
        aynı ekrana iki giriş olmasın diye. Web'de de profil satırı duruyor
        (`profile/profile-view`), yani ekran erişilebilir kalıyor.
      */}
      <ActivityStrip byDay={byDay} today={today} />
    </div>
  );
}

function formatDuration(
  totalSeconds: number,
  t: (key: string, vars?: Record<string, string | number>) => string,
): string {
  /*
   * BİÇİM ANDROİD'İN SÖZLÜĞÜNDEN.
   *
   * Aynı karo iki platformda iki ayrı biçimde yazılıyordu: web `prog.hours` +
   * `skills.dk` ile "11 sa 20 dk", Android tek anahtarla "11s 20dk". Almanca
   * arayüzde fark daha görünürdü ("11 Std 20 Min." / "11 Std. 20 Min."), yani
   * aynı sayı iki üründe farklı okunuyordu. Etiket de ayrıydı: web "Çalışma
   * süresi", Android "Toplam süre". İkisi de Android'e çekildi
   * (`time.minutes_short` / `time.hours_minutes_short`, `progress.time_total`)
   * ve webe özel üç anahtar düştü.
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
  tone: string;
  Icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
  /**
   * Verilirse kart bir bağlantı olur.
   *
   * "Pekişen kelime" sayısı için: sayının ayrıntısı Kelimeler ekranında ve
   * meraklanan kişi zaten bu karta bakıyor. Ayrı bir menü satırı eklemek
   * yerine sayının kendisini kapı yapmak hem daha az yer tutuyor hem de
   * bağlantıyı merakın doğduğu yere koyuyor.
   */
  href?: string;
}) {
  const body = (
    <>
      <div className="flex items-center justify-between" style={{ color: tone }}>
        <Icon size={20} />
        {href ? (
          <span className="muted">
            <ChevronRightIcon size={14} />
          </span>
        ) : null}
      </div>
      <div className="mt-1 text-h2 tabular-nums">{value}</div>
      <div className="muted text-caption">{label}</div>
    </>
  );

  if (href) {
    return (
      <Link href={href} prefetch={false} className="card block p-4">
        {body}
      </Link>
    );
  }
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-4">
      {body}
    </motion.div>
  );
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

/*
  İki harf, tek harf değil. Tek harfle şerit "P C C P P S Ç" oluyor ve bu
  okunmuyor: Pazartesi, Perşembe ve Pazar aynı harfe, Cuma ile Cumartesi de
  aynı harfe düşüyor. Şeridin altına gün adı koymanın tek sebebi hafta sonu
  ritmini görünür kılmaktı; ayırt edilemeyen bir harf o işi yapmıyor.
*/
/**
 * Gün kısaltmaları elle yazılıydı ("Pt, Sa, Ça…") ve İngilizce arayüzde de
 * Türkçe çıkıyordu. Artık yerelden üretiliyor; hafta pazartesiyle başlıyor
 * (2024-01-01 bir pazartesi).
 */
function weekdayNames(lang: NativeLang): string[] {
  const fmt = new Intl.DateTimeFormat(localeOf(lang), { weekday: "short" });
  return Array.from({ length: 7 }, (_, i) => fmt.format(new Date(Date.UTC(2024, 0, 1 + i))));
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

  return (
    <section className="card px-4 py-3.5">
      <div className="mb-2.5 flex items-baseline justify-between gap-3">
        <h2 className="text-strong">{t("progress.last_two_weeks")}</h2>
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
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${pct}%` }}
                  transition={{ delay: i * 0.02, type: "spring", stiffness: 180, damping: 22 }}
                  title={`${d.day}: ${t("progress.n_reviews", { n: d.reviews })}`}
                  className={`w-full rounded-[3px] ${isToday ? "brand-gradient" : ""}`}
                  style={isToday ? undefined : { background: heatColor(d.reviews) }}
                />
              ) : (
                <div
                  title={`${d.day}: ${t("progress.no_study")}`}
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
            {weekdayNames(lang)[d.weekday]}
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

/** Gelişim sayfasının satırı — profil menüsündeki satırla aynı ölçü ve davranış. */
function ProgressRow({
  href,
  icon,
  tone,
  label,
  last,
}: {
  href: string;
  icon: React.ReactNode;
  tone: string;
  label: string;
  last?: boolean;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      className="pressable flex items-center gap-3 py-3"
      style={last ? undefined : { borderBottom: "1px solid var(--hairline)" }}
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-tile"
        style={{ background: `color-mix(in srgb, ${tone} 16%, transparent)`, color: tone }}
      >
        {icon}
      </span>
      <span className="flex-1 text-strong">{label}</span>
      <ChevronRightIcon size={18} style={{ color: "var(--text-faint)" }} />
    </Link>
  );
}
