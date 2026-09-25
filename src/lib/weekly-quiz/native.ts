import type { QuizNative, QuizWeek } from "./types";

/**
 * Haftalık quizi öğrencinin ANA DİLİNE çevirir.
 *
 * Quiz Türkçe yazılıyor (`types.ts` "TÜRKÇE YAZILIR, ÇEVİRİ HATTI TAŞIR");
 * karşılıklar `data/weekly-quiz/prose/{out,out-de}/` altında elle yazılıp
 * `apply.mjs` / `apply-de.mjs` ile üretilen sözlüğe (`quiz` alanı) toplanıyor.
 * Burası o sözlüğü okuyan taraf; deneme sınavındaki `resolveMockPaper`ın eşi.
 *
 * ÇEVRİLEN ÜÇ ŞEY: `themeTr` (kapak başlığı), uyaranların `genreTr`si ve
 * açıklama (`why`). Öğrenilen dildeki her şey — tema, metin, diyalog, kök,
 * şıklar — OLDUĞU GİBİ kalıyor; çevrilseydi quiz ölçtüğü şeyi ölçmezdi.
 *
 * HEP-YA-HİÇ, HAFTA BAŞINA. Tek bir dize eksikse bütün hafta reddediliyor
 * (`null`) ve çağıran Türkçeye düşüyor. Birim madde değil HAFTA, çünkü kapak
 * (GET) ile sonuç ekranı (POST) aynı hafta paketinden ayrı ayrı çözülüyor:
 * birim madde olsaydı kapak İngilizce, sonuçtaki bir açıklama Türkçe çıkabilirdi.
 *
 * YALNIZ OKURUN GÖRDÜĞÜ AÇIKLAMA. Maddede o anadilin varyantı varsa
 * (`byNative[native]`) öğrenci onun `why`ını görüyor; taban `why` ona hiç
 * gösterilmiyor ve sözlükte de yok (çıkarıcı `make.ts` aynı kuralla
 * paketliyor). Çıktıda taban `why` de varyantın çevirisiyle dolduruluyor ve
 * öteki anadillerin varyantları düşüyor: çözülmüş hafta yalnız bu okur için
 * ve içinde tek bir Türkçe açıklama kalmıyor.
 *
 * KİŞİSEL MADDE burada yok: çalışma anında kuruluyor ve açıklaması üç dilde
 * koda yazılı (`build.ts` `PERSONAL_WHY`).
 */

/** Bileşik anahtarın ayracı — `data/conversations/apply*.mjs` ile aynı. */
const SEP = String.fromCharCode(0);

/** Quiz sözlüğü: `quizKey(tür, tr)` → karşılık. */
export type QuizDict = Record<string, string>;

/** Sözlük anahtarı — tür adları çıkarıcıdakiyle (`themeTr`, `genreTr`, `why`) birebir aynı. */
export const quizKey = (kind: "themeTr" | "genreTr" | "why", tr: string): string => kind + SEP + tr;

export function resolveQuizWeek(dict: QuizDict, week: QuizWeek, native: Exclude<QuizNative, "tr">): QuizWeek | null {
  let failed = false;
  const t = (kind: "themeTr" | "genreTr" | "why", s: string): string => {
    /* Çıkarıcı boş dizeyi eklemiyor; burada da aranmıyor, yoksa sözlükte
       bulunmayan boş anahtar bütün haftayı düşürürdü. */
    if (!s.trim()) return s;
    const hit = dict[quizKey(kind, s)];
    if (hit === undefined) failed = true;
    return hit ?? s;
  };

  const out: QuizWeek = {
    ...week,
    themeTr: t("themeTr", week.themeTr),
    stimuli: week.stimuli.map((s) => ({ ...s, genreTr: t("genreTr", s.genreTr) })),
    items: week.items.map((it) => {
      if (it.block === "personal") return it;
      const v = it.byNative?.[native];
      if (!v) return { ...it, why: t("why", it.why), byNative: undefined };
      const why = t("why", v.why);
      return { ...it, why, byNative: { [native]: { ...v, why } } };
    }),
  };
  return failed ? null : out;
}
