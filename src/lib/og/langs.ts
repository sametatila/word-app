import { onboardingCoursesFor, type NativeLang } from "@/lib/courses";
import { translate } from "@/lib/i18n/dict";

/*
 * KÜNYEDEKİ KURS ADLARI KATALOGDAN. "Almanca ve İngilizce" başlıkta,
 * açıklamada ve kartın rozetlerinde elle yazılıydı; yeni bir kurs açılınca
 * üçü de eskide kalırdı. Liste `onboardingCoursesFor`: bakanın dilinde yeni
 * kullanıcıya sunulan kurslar (duraklatılmış kurs ve kendi dili yok).
 *
 * Ayrı dosya çünkü kök düzen ve manifesto da okuyor: kartın çizim modülü
 * (`lib/og/card`) next/og, sharp ve veritabanı getiriyor.
 */

/** Yeni kullanıcıya sunulan kursların adları, bakanın dilinde. */
export function courseNames(lang: NativeLang): string[] {
  return onboardingCoursesFor(lang).map((c) => c.label[lang]);
}

/** "Almanca ve İngilizce" — kurs listesi, dilin kendi bağlacıyla. */
export function courseList(lang: NativeLang): string {
  return new Intl.ListFormat(lang, { type: "conjunction" }).format(courseNames(lang));
}

export type Badge = { label: string; tone: "brand" | "plain" };

/** Kartın rozetleri: kurslar dolu, anlatım dili çerçeveli. */
export function courseBadges(lang: NativeLang): Badge[] {
  return [
    ...courseNames(lang).map((label) => ({ label, tone: "brand" as const })),
    { label: translate(lang, "meta.og_native"), tone: "plain" as const },
  ];
}

/** Paylaşım önizlemesinin `og:locale` değeri — arayüz diliyle aynı. */
export const OG_LOCALE: Record<NativeLang, string> = { tr: "tr_TR", en: "en_US", de: "de_DE" };

/**
 * Sayfaya özel önizleme künyesi (grup, davet, profil).
 *
 * Next alt segmentteki `openGraph`/`twitter` nesnesini kökünkiyle BİRLEŞTİRMİYOR,
 * yerine koyuyor: yalnız başlık verilse site adı, dil ve kart türü düşerdi.
 * Görsel, segmentin `opengraph-image` dosyasından kendiliğinden ekleniyor.
 */
export function shareMeta(lang: NativeLang, title: string, description: string, url: string) {
  return {
    openGraph: { type: "website" as const, locale: OG_LOCALE[lang], siteName: "Lernomi", title, description, url },
    twitter: { card: "summary_large_image" as const, title, description },
  };
}

/**
 * Önizlemede kişinin yalnız İLK adı. Önizleme sayfanın dışına taşınıp
 * gruplarda dolaşıyor; tam ad sayfanın kendisinde kalıyor.
 */
export function firstName(name: string | null | undefined): string {
  return clip((name ?? "").trim().split(/\s+/)[0] ?? "", 24);
}

/** Kartta taşmasın diye uzun ad kısaltılır (serbest metin, sınırı yok). */
export function clip(text: string, max: number): string {
  const chars = [...text];
  return chars.length > max ? `${chars.slice(0, max - 1).join("").trimEnd()}…` : text;
}
