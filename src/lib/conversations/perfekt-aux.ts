/**
 * PERFEKT YARDIMCI FİİLİ (haben/sein) — belirlenimci, yalnız KESİN olduğu yerde (QA F-0090, 2026-10-10).
 *
 * A1 Ü25 "Gestern war ein guter Tag" (konusu tam olarak haben/sein seçimi) sohbetinde modelin
 * öneri düğmesi "Anschließend habe ich im Park spazieren gegangen." idi. Öneri öğrencinin
 * tek dokunuşla göndereceği MODEL cümle: bozuk Almanca orada en çok zarar veriyor. Model
 * istemle düzeltilmiyor (istem kırılgan, `chat.ts`), süzgeç sunucuda düzeltiyor:
 * öneri satırları ([SAY]) ve düzeltme satırının sağ tarafı ("doğrusu").
 *
 * TUTUCU: bir yan cümlede (noktalama ya da und/aber/oder arası) TEK bir haben biçimi ve
 * yalnız sein alan bir ortaç varsa, başka ortaç ya da sein biçimi yoksa. Sein listesi
 * hareket/durum değişimi fiillerinin her zaman sein alanları (gegangen, gekommen, geblieben,
 * gewesen …); iki yardımcıyla da kurulanlar (gefahren, geflogen: "habe das Auto gefahren")
 * yalnız yön bildiren bir söz varken ve nesne yokken. "gefallen", "umgezogen", "gestanden"
 * listede değil (hat gefallen, hat sich umgezogen, hat gestanden).
 */

const SEIN_ONLY = /^(?:\p{L}*(?:gegangen|gekommen|geblieben|gestorben|aufgestanden|eingeschlafen|aufgewacht|gereist|gelaufen|gerannt|gewandert|gestiegen|aufgewachsen|geschwommen|gesprungen)|gewesen|geworden|passiert|geschehen|begegnet|verschwunden|erschienen|entstanden|verreist|erwacht)$/iu;
const SEIN_IF_DIRECTION = /^\p{L}*(?:gefahren|geflogen|geritten|gesegelt)$/iu;
const DIRECTION = /(?<!\p{L})(nach|zum|zur|ins|in die|in den|mit dem|mit der|mit den|mit einem|mit einer|zu|bis|über|durch|weg|los|heim|hin|zurück)(?!\p{L})/iu;
const OBJECT = /(?<!\p{L})(mich|dich|ihn|uns|euch|das Auto|den Wagen|mein Auto|sein Auto|ihr Auto)(?!\p{L})/iu;
const PARTICIPLE = /^\p{L}*ge\p{L}+(?:en|t)$/iu;
const SEIN_FORM = /(?<!\p{L})(bin|bist|ist|sind|seid|war|warst|waren|wart)(?!\p{L})/iu;
const HABEN = /(?<!\p{L})(habe|hast|hat|haben|habt|hatte|hattest|hatten|hattet)(?!\p{L})/giu;
const TO_SEIN: Record<string, string> = {
  habe: "bin", hast: "bist", hat: "ist", haben: "sind", habt: "seid",
  hatte: "war", hattest: "warst", hatten: "waren", hattet: "wart",
};

/** Yan cümle sınırı: noktalama ve sıralama bağlaçları (sınır parçaları korunuyor). */
const CLAUSE_SPLIT = /([,;:.!?—–]+|(?<!\p{L})(?:und|aber|oder|sondern)(?!\p{L}))/iu;

function fixClause(clause: string): string {
  const auxes = clause.match(HABEN) ?? [];
  if (auxes.length !== 1 || SEIN_FORM.test(clause)) return clause;
  const words = clause.match(/\p{L}+/gu) ?? [];
  let sein = false;
  for (const w of words) {
    if (SEIN_ONLY.test(w)) sein = true;
    else if (SEIN_IF_DIRECTION.test(w)) {
      if (DIRECTION.test(clause) && !OBJECT.test(clause)) sein = true;
      else return clause;
    } else if (PARTICIPLE.test(w) && !/^ge(gen|hen|ben|nug)$/i.test(w)) return clause; // haben alan başka bir ortaç olabilir
  }
  if (!sein) return clause;
  return clause.replace(HABEN, (m) => {
    const s = TO_SEIN[m.toLowerCase()];
    return m[0] === m[0].toUpperCase() ? s[0].toUpperCase() + s.slice(1) : s;
  });
}

/** Almanca bir cümlede kesin haben → sein hatalarını düzeltir; emin değilse metni aynen döndürür. */
export function fixPerfektAux(text: string): string {
  return text
    .split(CLAUSE_SPLIT)
    .map((part, i) => (i % 2 === 0 ? fixClause(part) : part))
    .join("");
}
