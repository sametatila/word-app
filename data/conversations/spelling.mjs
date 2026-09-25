/**
 * İngilizce alanlarda yazım birliği: hat AMERİKAN İngilizcesi yazıyor.
 *
 * 2026-09-25 Samet'in kararı: İngilizce her yerde Amerikan yazımı ve Amerikan
 * sözcük seçimiyle yazılır; Amerikan'dan İngiliz'e çevrilmez. Kelime havuzu
 * (words-en.json) ve ses (en-US) zaten Amerikan'dı. O gün bütün içerik ve
 * anadil sözlükleri Amerikan'a çevrildi; bu kapı artık İngiliz biçimini
 * yakalıyor (önceki sürüm tersini yapıyordu).
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
];

/** Metindeki İngiliz yazımlarını `«bulunan» → önerilen` biçiminde döndürür. */
export function britishSpelling(text) {
  const out = [];
  for (const [re, hint] of UK)
    for (const m of String(text ?? "").matchAll(re)) out.push(`«${m[0]}» → ${hint}`);
  return out;
}
