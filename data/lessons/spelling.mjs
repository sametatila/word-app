/**
 * İngilizce alanlarda yazım birliği: hat İNGİLİZ İngilizcesi yazıyor.
 *
 * Bu bir tercih değil, ölçüm sonucu. Yazılan İngilizce alanlar tarandığında
 * (2026-09-10, 2.305 satır) tablo tek yönlüydü:
 *
 * (geçiş sayısı, satır değil)
 *
 *   -our (colour, neighbour, favour…)   25      -or                     0
 *   -ise fiilleri (organise, apologise) 6+2     -ize                    2
 *   flat / flatmate                      6      apartment               0
 *   holiday                              2      vacation                0
 *   rubbish, CV, programme               7      trash, garbage, resume  0
 *
 * Yani hat zaten İngiliz İngilizcesi; sapma iki satırdı. Aykırı ikisi
 * (`organization` → `organisation`, `to recognize` → `to recognise`)
 * çoğunluğa uyduruldu, kural tersine çevrilmedi.
 *
 * Not: en→de hattı (7.175 satır) bu taramada temiz çıktı. İlk okumada 7
 * Amerikan yazımı görünmüştü ama hepsi Almanca örnek cümledeki sözcüklerdi
 * (`Labor`, `Humor`, `Apartment`) — tarama satırın tamamına bakıyordu.
 *
 * Liste KAPALI ve dar tutuldu: yalnız İngiliz karşılığı tartışmasız olanlar
 * var. `program` (bilgisayar programı İngiliz İngilizcesinde de böyle),
 * `practice`/`license` (biri ad biri fiil olduğunda değişiyor) ve `check`
 * bilerek DIŞARIDA — yanlış ret yanlış kabulden tehlikeli.
 *
 * Uyarı verir, hata değil: bir gün gerçekten Amerikan yazımı gereken bir
 * satır çıkarsa (özel ad, alıntı) kapı işi durdurmasın.
 */
const US = [
  [/\bcolor(s|ed|ful|less)?\b/gi, "colour…"],
  [/\bbehavior(s|al)?\b/gi, "behaviour…"],
  [/\bfavor(s|ed|ite|ites)?\b/gi, "favour…"],
  [/\bneighbor(s|hood|hoods|ing)?\b/gi, "neighbour…"],
  [/\bhumor(ous|less)?\b/gi, "humour…"],
  [/\bapartments?\b/gi, "flat"],
  [/\bvacations?\b/gi, "holiday"],
  [/\btrash\b|\bgarbage\b/gi, "rubbish"],
  [/\bsidewalks?\b/gi, "pavement"],
  // Günlük hayat sözcükleri: rol yapma sahneleri dükkân, ulaşım ve ev
  // dolu, bu grup 580 sahnede kaçınılmaz. Yalnız İngiliz karşılığı
  // TARTIŞMASIZ olanlar; `pants` (İngilizcede iç çamaşırı), `line`,
  // `cookie` (tarayıcı çerezi) bilerek DIŞARIDA.
  [/\belevators?\b/gi, "lift"],
  [/\brestrooms?\b/gi, "toilet"],
  [/\bgas stations?\b/gi, "petrol station"],
  [/\bparking lots?\b/gi, "car park"],
  [/\bcell ?phones?\b/gi, "mobile"],
  [/\bdrugstores?\b/gi, "chemist"],
  [/\bfaucets?\b/gi, "tap"],
  [/\bdiapers?\b/gi, "nappy"],
  [/\bflashlights?\b/gi, "torch"],
  [/\bcash registers?\b/gi, "till"],
  [/\bcenters?\b/gi, "centre"],
  [/\btheaters?\b/gi, "theatre"],
  [/\bmeters?\b/gi, "metre"],
  [/\bgray\b/gi, "grey"],
  [/\btraveled\b|\btraveling\b/gi, "travelled…"],
  [/\bcanceled\b|\bcanceling\b/gi, "cancelled…"],
  [/\bdefense\b|\boffense\b/gi, "defence / offence"],
  [/\b\w*(organiz|realiz|apologiz|recogniz|specializ|memoriz|summariz|criticiz|emphasiz|minimiz|socializ|authoriz|analyz)\w*\b/gi, "-ise"],
];

/** Metindeki Amerikan yazımlarını `«bulunan» → önerilen` biçiminde döndürür. */
export function usSpelling(text) {
  const out = [];
  for (const [re, hint] of US)
    for (const m of String(text ?? "").matchAll(re)) out.push(`«${m[0]}» → ${hint}`);
  return out;
}
