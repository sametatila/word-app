/**
 * İngilizce alanlarda yazım birliği: hat AMERİKAN İngilizcesi yazıyor.
 *
 * 2026-09-25 Samet'in kararı: İngilizce her yerde Amerikan yazımı ve Amerikan
 * sözcük seçimiyle yazılır; Amerikan'dan İngiliz'e çevrilmez. Kelime havuzu
 * (words-en.json) ve ses (en-US) zaten Amerikan'dı. O gün bütün içerik ve
 * anadil sözlükleri Amerikan'a çevrildi; bu kapı artık İngiliz biçimini
 * yakalıyor (önceki sürüm tersini yapıyordu).
 *
 * 2026-09-26: içerik üç turda sözcük seçimi bakımından da Amerikan'a çevrildi
 * (flat, holiday, shop, queue… bağlama göre); liste o turlardan tartışmasız
 * olanlarla genişletildi.
 *
 * Liste KAPALI ve dar: yalnız Amerikan karşılığı tartışmasız olanlar.
 * `flat`, `holiday`, `queue`, `lift`, `football` bağlama göre değiştiği için
 * DIŞARIDA (düz yüzey, resmî tatil, kaldırmak…). İngiliz/Amerikan farkını
 * ANLATAN satırlar (ör. "İngiltere'de licence, Amerika'da license") bilerek
 * İngiliz biçimi taşır; uyarı onlarda yanlıştır, satır haklıdır.
 *
 * Uyarı verir, hata değil.
 */
const UK = [
  [/\bcolour(s|ed|ful|less)?\b/gi, "color…"],
  [/\bbehaviour(s|al)?\b/gi, "behavior…"],
  [/\bfavour(s|ed|ite|ites)?\b/gi, "favor…"],
  [/\bneighbour(s|hood|hoods|ing)?\b/gi, "neighbor…"],
  [/\b(humour|honour|labour|harbour|rumour|flavour)(s|ed|less)?\b/gi, "-or"],
  [/\b(centre|theatre|metre|litre|kilometre|centimetre)s?\b/gi, "-er"],
  [/\b(organis|realis|recognis|apologis|summaris|memoris|criticis|emphasis|minimis|specialis|prioritis|standardis|authoris|characteris)(e|ed|es|ing|ation|ations)\b/gi, "-ize"],
  [/\banalys(e|ed|ing)\b/gi, "analyze"],
  [/\b(cancell|travell|labell|modell)(ed|ing|er|ers)\b/gi, "canceled…"],
  [/\bprogrammes?\b/gi, "program"],
  [/\b(licence|defence|offence)s?\b/gi, "-se"],
  [/\bgrey\b/gi, "gray"],
  [/\btyres?\b/gi, "tire"],
  [/\bcatalogues?\b/gi, "catalog"],
  [/\bjudgements?\b/gi, "judgment"],
  [/\bper cent\b/gi, "percent"],
  [/\bpractis(e|ed|es|ing)\b/gi, "practice…"],
  [/\blearnt\b|\bspelt\b/gi, "learned/spelled"],
  [/\bwhilst\b|\bamongst\b/gi, "while/among"],
  [/\bpavements?\b/gi, "sidewalk"],
  [/\blorr(y|ies)\b/gi, "truck"],
  [/\bpetrol\b/gi, "gas/gasoline"],
  [/\bcar parks?\b/gi, "parking lot"],
  [/\bmobile phones?\b/gi, "cell phone"],
  [/\bmotorways?\b/gi, "highway"],
  [/\bpostcodes?\b/gi, "zip code"],
  [/\bmaths\b/gi, "math"],
  [/\bfortnight\b/gi, "two weeks"],
  [/\bat (the )?weekends?\b/gi, "on (the) weekend(s)"],
  // 2026-09-26 sözcük seçimi turlarından: bağlamdan bağımsız İngiliz biçimleri
  [/\b(pyjamas|aluminium|jewellery|marvellous|woollen|cosy|yoghurts?|aeroplanes?)\b/gi, "pajamas/aluminum/jewelry…"],
  [/\bsceptic(s|al|ism)?\b/gi, "skeptic…"],
  [/\bcounsell(ing|or|ors)\b/gi, "counseling…"],
  [/\bstraight away\b/gi, "right away"],
  [/\bYours (sincerely|faithfully)\b/gi, "Sincerely"],
  [/\bchemist's\b/gi, "pharmacy"],
  [/\bshop assistants?\b/gi, "salesclerk"],
  [/\bcash desks?\b/gi, "checkout / register"],
  [/\bopening hours\b/gi, "(business) hours"],
  [/\b(pay|price) rises?\b/gi, "raise / price increase"],
  [/\brucksacks?\b/gi, "backpack"],
  [/\bcanteens?\b/gi, "cafeteria"],
  [/\bnapp(y|ies)\b/gi, "diaper"],
  [/\bpushchairs?\b/gi, "stroller"],
  [/\bsat ?nav\b/gi, "GPS"],
  [/\bzebra crossings?\b/gi, "crosswalk"],
  [/\bflatmates?\b/gi, "roommate"],
  [/\bholidaymakers?\b/gi, "vacationer"],
  [/\b(in|to) hospital\b/gi, "in/to the hospital"],
  [/\bfill(ed|ing|s)? in (a|the|this|your) form\b/gi, "fill out"],
];

/** Metindeki İngiliz yazımlarını `«bulunan» → önerilen` biçiminde döndürür. */
export function britishSpelling(text) {
  const out = [];
  for (const [re, hint] of UK)
    for (const m of String(text ?? "").matchAll(re)) out.push(`«${m[0]}» → ${hint}`);
  return out;
}
