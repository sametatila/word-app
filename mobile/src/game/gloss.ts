/**
 * Kelimenin ve örnek cümlenin ANADİLDEKİ karşılığı — web `lib/option-label`
 * `glossFor` / `exampleFor` ile aynı kural.
 *
 * Oyun ekranları doğrudan `word.tr` basıyor ve doğru şıkkı `word.tr` ile
 * karşılaştırıyordu. Sunucu şıkları kullanıcının anadilinde kuruyor; İngilizce
 * ya da Almanca anadilli öğrencide doğru şık hiç eşleşmiyor, istemler Türkçe
 * çıkıyordu. Ana satır anadilde; Türkçe ve Almanca anadilde altına İngilizce
 * ayırt edici. Karşılık yoksa boş (Türkçeye düşmez).
 */
import { currentLang } from "../lib/i18n";

export type Gloss = { text: string; sub: string | null };

type GlossWord = { tr: string; en?: string | null; deGloss?: string | null };

export function glossOf(w: GlossWord): Gloss {
  const lang = currentLang();
  if (lang === "en") return { text: w.en ?? "", sub: null };
  if (lang === "de") return { text: w.deGloss ?? "", sub: w.en ?? null };
  return { text: w.tr, sub: w.en ?? null };
}

/**
 * Sunucunun kurduğu şık/iddia (`Option`) tek satırda: ana satır + (varsa) ayırt edici.
 *
 * SUNUCU ŞIKKI ZATEN ANADİLDE. Onu sahte bir kelimeye sarıp (`{ tr: o.text, en: o.sub }`) yeniden
 * `glossOf`tan geçirmek, İngilizce anadilde `en` (ayırt edici, çoğunlukla null), Almanca anadilde
 * `deGloss` (hiç yok) okuyordu: Doğru/Yanlış turunun iddiası en→de ve de→en çiftlerinde BOŞ çıkıyordu.
 */
export function optionLine(o: Gloss): string {
  return o.sub && o.sub !== o.text ? `${o.text} · ${o.sub}` : o.text;
}

/** Kelimenin anlam satırı ANADİLDE + (Türkçe/Almanca anadilde) İngilizce ayırt edici. */
export function meaningLine(w: GlossWord): string {
  return optionLine(glossOf(w));
}

/** Doğru/Yanlış turunda öne sürülen anlam: sunucunun iddiası olduğu gibi; eski turda kelimenin kendi anlamı. */
export function claimLine(round: { claim?: Gloss | null }, word: GlossWord): string {
  return round.claim ? optionLine(round.claim) : meaningLine(word);
}

/**
 * Çeviri turunda çevrilecek cümle: sunucunun ANADİLDEKİ cümlesi (`native`). Eski kayıtlı turda `native`
 * yok ve `tr` herkese Türkçe idi; oraya ancak Türkçe anadilde düşülüyor, öteki anadillerde boş kalıyor
 * (boş satır fark edilir, yanlış dilde cümle edilmez). Ayırt edici satır ana satırın aynısıysa çizilmez.
 */
export function translateSource(s: { tr: string; en: string | null; native?: string; nativeSub?: string | null }): Gloss {
  if (s.native) return { text: s.native, sub: s.nativeSub && s.nativeSub !== s.native ? s.nativeSub : null };
  const lang = currentLang();
  if (lang === "tr") return { text: s.tr, sub: s.en };
  return { text: lang === "en" ? (s.en ?? "") : "", sub: null };
}

/**
 * Karşılığın SESLİ hâli: parantez ayırt edicidir ("o (erkek)" / "o (kadın)"), seslendirme onu silerdi.
 * Web `lib/option-label` `speechOfGloss` ile aynı gövde (parity).
 */
export function speechOfGloss(text: string): string {
  return text.replace(/\s*\(([^()]*)\)/g, ", $1");
}

/** Turun taşıdığı cümle çevirilerinden anadildeki; yoksa null. */
export function exampleOf(s: { sentenceTr?: string | null; sentenceEn?: string | null; sentenceDe?: string | null }): Gloss | null {
  const lang = currentLang();
  if (lang === "en") return s.sentenceEn ? { text: s.sentenceEn, sub: null } : null;
  if (lang === "de") return s.sentenceDe ? { text: s.sentenceDe, sub: s.sentenceEn ?? null } : null;
  return s.sentenceTr ? { text: s.sentenceTr, sub: s.sentenceEn ?? null } : null;
}
