/**
 * Konuşma sözlükçesindeki Almanca başlığın havuzdaki karşılığı — `triage` ve `check` ORTAK.
 *
 * Arama önce ARTİKELİYLE: "der Bekannte" ile "die Bekannte", "der Teil" ile "das Teil" havuzda ayrı
 * maddeler ve anlamları (Türkçesi, İngilizcesi) farklı. Artikel atılarak aranınca ikisi aynı anahtara
 * düşüyor, sonra gelen öncekini eziyordu ve eril sözlükçe girdisi dişilin karşılığını alabiliyordu.
 * Artikelli eşleşme yoksa artikelsiz aranıyor, ama yalnız havuzda o başlık TEKSE: iki cinsiyetli bir
 * başlıkta tahmin yapılmıyor, girdi elle okunmaya kalıyor.
 *
 * AYNI YAZILIŞLI İKİ MADDE ("als" -den daha / -dığında, "sein" olmak / onun) artikelle de
 * ayrılmıyor: orada girdinin Türkçesine uyan madde seçiliyor. Uyan yoksa ilki döner ve türetme
 * düşer (girdi elle okunur) — yanlış anlamın İngilizcesi sessizce alınmıyor.
 */
const bare = (s) => String(s).toLowerCase().replace(/^(der|die|das)\s+/, "").trim();
const full = (s) => String(s).toLowerCase().replace(/\s+/g, " ").trim();

export function poolLookup(words) {
  const exact = new Map();
  const byBare = new Map();
  for (const r of words) {
    if (!r.de || !r.en) continue;
    const entry = { tr: r.tr, en: r.en };
    const k = full(r.artikel ? `${r.artikel} ${r.de}` : r.de);
    exact.set(k, [...(exact.get(k) ?? []), entry]);
    const b = bare(r.de);
    byBare.set(b, byBare.has(b) ? null : entry);
  }
  const trEq = (a, b) => String(a ?? "").toLowerCase().trim() === String(b ?? "").toLowerCase().trim();
  return (de, tr) => {
    const hits = exact.get(full(de));
    if (hits) return hits.find((h) => trEq(h.tr, tr)) ?? hits[0];
    return byBare.get(bare(de)) ?? undefined;
  };
}
