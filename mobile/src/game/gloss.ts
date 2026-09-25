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
