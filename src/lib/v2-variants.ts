import type { TargetLang } from "@/lib/courses";

/**
 * ZARFLA BAŞLAYAN ALMANCA CÜMLENİN ÖZNEYLE BAŞLAYAN EŞİ (ve tersi).
 *
 * "Nachts brauche ich etwas Ruhe" hedefine "Ich brauche nachts etwas Ruhe"
 * yazan öğrenci reddediliyordu (panel #89, QA F-0076): iki diziliş de doğru,
 * Türkçe istem hangisinin isteneceğini söylemiyor. Hakemler (`matchSentence`,
 * `spokenMatches`) adaylara bu eşi de katıyor; sesli cevapta yapay zekâ
 * kontrolü olmadığı için tek yol bu.
 *
 * Yalnız kesin durum: tek kelimelik, listedeki bir zarf + fiil + özne zamiri
 * (ya da zamir + fiil + zarf). Fiil yerinde kalıyor, yalnız birinci ve
 * üçüncü kelime yer değiştiriyor; V2 korunuyor. Soru ve İngilizce dışarıda.
 * Mobil aynası `mobile/src/lib/v2Variants.ts`.
 */
const ADVERBS = new Set([
  "heute", "morgen", "gestern", "übermorgen", "vorgestern", "jetzt", "nun", "dann", "danach", "zuerst", "später", "bald", "damals", "früher",
  "morgens", "vormittags", "mittags", "nachmittags", "abends", "nachts", "montags", "dienstags", "mittwochs", "donnerstags", "freitags", "samstags", "sonntags",
  "oft", "manchmal", "immer", "selten", "meistens", "normalerweise", "leider", "hoffentlich", "vielleicht", "deshalb", "deswegen", "trotzdem", "außerdem", "sonst", "hier", "dort",
]);
const SUBJECTS = new Set(["ich", "du", "er", "sie", "es", "wir", "ihr", "man"]);

const cap = (w: string) => w.charAt(0).toLocaleUpperCase("de-DE") + w.slice(1);
/** "Sie" (siz) büyük kalır; öteki kelimeler cümle ortasında küçülür. */
const mid = (w: string) => (w === "Sie" ? w : w.toLocaleLowerCase("de-DE"));

export function v2Variants(sentence: string, lang: TargetLang): string[] {
  if (lang !== "de") return [];
  const s = sentence.trim();
  if (!s || /\?\s*$/.test(s) || /[,;:]/.test(s)) return [];
  const tail = s.match(/[.!…]+$/)?.[0] ?? "";
  const w = s.slice(0, s.length - tail.length).split(/\s+/);
  if (w.length < 3) return [];
  const [a, verb, c] = w;
  const la = a.toLocaleLowerCase("de-DE");
  const lc = c.toLocaleLowerCase("de-DE");
  const pair = (ADVERBS.has(la) && SUBJECTS.has(lc)) || (SUBJECTS.has(la) && ADVERBS.has(lc));
  return pair ? [[cap(c), verb, mid(a), ...w.slice(3)].join(" ") + tail] : [];
}

/** Adaylar ve eşleri; tekrar yok. */
export function withV2Variants(candidates: string[], lang: TargetLang): string[] {
  const out = [...candidates];
  for (const c of candidates) for (const v of v2Variants(c, lang)) if (!out.includes(v)) out.push(v);
  return out;
}
