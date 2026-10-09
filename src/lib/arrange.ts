/**
 * Dizilen cevap (cümle kurma parçaları, sıralama maddeleri): kabul edilen
 * dizilişlerden biri mi, aynı parçalardan mı kurulu. Saf; sunucuda da çalışır
 * (`immersion/grammar` dizme alternatifleri). Mobil `lib/arrange` ile birebir.
 */
/** Parça karşılaştırma biçimi: küçük harf, noktalama yok, tek boşluk. */
function tileForm(s: string): string {
  return s
    .toLocaleLowerCase("de-DE")
    .replace(/[.,!?;:„“”"]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Dizilen metin kabul edilen dizilişlerden biri mi (hedef + alternatifler)? */
export function arrangedAccepted(arranged: string, accepted: string[]): boolean {
  const a = tileForm(arranged);
  return accepted.some((x) => tileForm(x) === a);
}

/** İki metin AYNI parçalardan mı kurulu (sıra serbest)? Dizme alternatifinin ölçütü. */
export function sameTiles(a: string, b: string): boolean {
  const bag = (s: string) => tileForm(s).split(" ").filter(Boolean).sort().join(" ");
  return bag(a) === bag(b) && bag(a).length > 0;
}

/**
 * Dizme sorusunun alternatifleri: üretim adımının eşdeğer cevaplarından (`accept`)
 * hedefle AYNI parçalardan kurulu olanlar ("Ich kaufe morgen ein" ↔ "Morgen
 * kaufe ich ein"). Başka sözcük içerenler dizilemez, alınmıyor.
 */
export function orderAlternatives(target: string, accept: string[] = []): string[] {
  return accept.filter((a) => sameTiles(a, target) && tileForm(a) !== tileForm(target));
}
