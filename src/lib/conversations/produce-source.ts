/**
 * Konuşma üretim adımının ANADİLDEKİ cümlesi — yapay zekâ kontrolünün kaynağı
 * (`submitTyped`/`submitProduce`) ve dilbilgisi adımındaki dizme sorusunun
 * sonuç satırı (`immersion/grammar` `deriveGrammar`). Saf; sunucuda da
 * çalışır. Mobil `lib/produceSource` ile birebir.
 */
type Seg = { lang: string; text: string };

/**
 * Üretim adımının anadildeki cümlesi: anlatımın tırnak içinde verdiği cümle
 * ("Şimdi sen: 'Yarın alışveriş yapıyorum.' demek için ne dersin?" →
 * "Yarın alışveriş yapıyorum."). Harfin önündeki kesme işareti tırnağı
 * kapatmaz ("'Ben İstanbul'dan geliyorum.'"). Tırnak yoksa null.
 */
export function quotedSource(say: Seg[], targetLang: string): string | null {
  const native = say.filter((s) => s.lang !== targetLang).map((s) => s.text).join(" ");
  const found = [...native.matchAll(/(?:^|[\s:(«])['‘“"]((?:[^'’”"]|['’](?=\p{L}))+?)['’”"](?=[\s.,;:!?)»]|$)/gu)].map((m) => m[1].trim());
  return found.length ? found.join(" ") : null;
}

/** Yapay zekâ kontrolünün kaynağı: tırnaklı cümle, yoksa anadildeki anlatımın tamamı. */
export function produceSource(say: Seg[], targetLang: string): string {
  return (
    quotedSource(say, targetLang) ??
    say
      .filter((s) => s.lang !== targetLang)
      .map((s) => s.text)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim()
  );
}
