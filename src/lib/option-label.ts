import type { Option } from "./types";

/**
 * Şık etiketi — TEK KAYNAK.
 *
 * Oyun ekranı (choice-game, mobil ChoiceRound) doğru cevabı `withArtikel` ile
 * kuruyor ve seçilen şıkkın METNİYLE karşılaştırıyor. Şık üreticisi aynı biçimi
 * üretmezse doğru şık hiçbir zaman seçilemez.
 *
 * Tam da bu oldu: `lib/session.ts` içindeki `optionsFor` artikeli koyuyordu,
 * `lib/daily.ts` içindeki `seededOptions` koymuyordu. Günlük oyunda tr→de
 * yönündeki her şık turunda kullanıcı "Auto"yu işaretleyip "yanlış, doğrusu
 * das Auto" cevabını alıyordu — hiçbir şık doğru olamıyordu.
 *
 * Kural aynı kaldığı sürece nerede kullanıldığı önemli değil; iki tarafın da
 * BURADAN geçmesi önemli.
 */

/** Almanca kelimeyi artikeliyle gösterir: "das Auto". Artikelsizde sade hâli. */
export function withArtikel(w: { de: string; artikel: string | null }): string {
  return w.artikel ? `${w.artikel} ${w.de}` : w.de;
}

/**
 * Anlam sorulan yönde (de→tr) şık iki dilli: Türkçe + İngilizce ayırt edici.
 * Almanca sorulan yönde (tr→de) ikinci satır yok — orada sorulan şey anlam
 * değil, kelimenin kendisi; ve artikel kelimenin bir parçası.
 */
export function optionLabel(
  p: { de: string; tr: string; en: string | null; artikel: string | null },
  direction: "de-tr" | "tr-de",
): Option {
  return direction === "de-tr"
    ? { text: p.tr, sub: p.en }
    : { text: withArtikel(p), sub: null };
}
