/**
 * Konuşma sözlükçesindeki Almanca başlığın havuzdaki karşılığı — `triage` ve `check` ORTAK.
 *
 * Arama önce ARTİKELİYLE: "der Bekannte" ile "die Bekannte", "der Teil" ile "das Teil" havuzda ayrı
 * maddeler ve anlamları (Türkçesi, İngilizcesi) farklı. Artikel atılarak aranınca ikisi aynı anahtara
 * düşüyor, sonra gelen öncekini eziyordu ve eril sözlükçe girdisi dişilin karşılığını alabiliyordu.
 * Artikelli eşleşme yoksa artikelsiz aranıyor, ama yalnız havuzda o başlık TEKSE: iki cinsiyetli bir
 * başlıkta tahmin yapılmıyor, girdi elle okunmaya kalıyor.
 */
const bare = (s) => String(s).toLowerCase().replace(/^(der|die|das)\s+/, "").trim();
const full = (s) => String(s).toLowerCase().replace(/\s+/g, " ").trim();

export function poolLookup(words) {
  const exact = new Map();
  const byBare = new Map();
  for (const r of words) {
    if (!r.de || !r.en) continue;
    const entry = { tr: r.tr, en: r.en };
    exact.set(full(r.artikel ? `${r.artikel} ${r.de}` : r.de), entry);
    const k = bare(r.de);
    byBare.set(k, byBare.has(k) ? null : entry);
  }
  return (de) => exact.get(full(de)) ?? byBare.get(bare(de)) ?? undefined;
}
