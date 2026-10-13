import type { TargetLang } from "./courses";

/**
 * ZARFLA BAŞLAYAN ALMANCA CÜMLENİN ÖZNEYLE BAŞLAYAN EŞİ (ve tersi).
 *
 * "Nachts brauche ich etwas Ruhe" hedefine "Ich brauche nachts etwas Ruhe"
 * yazan öğrenci reddediliyordu (panel #89, QA F-0076): iki diziliş de doğru,
 * Türkçe istem hangisinin isteneceğini söylemiyor. Hakemler (`matchSentence`,
 * `spokenMatches`) adaylara bu eşi de katıyor; sesli cevapta yapay zekâ
 * kontrolü olmadığı için tek yol bu.
 *
 * Yalnız kesin durum: listedeki tek kelimelik zarf ya da iki kelimelik zaman/yer öbeği
 * + fiil + özne zamiri (ya da zamir + fiil + öbek). Fiil yerinde kalıyor, yalnız birinci ve
 * üçüncü kelime yer değiştiriyor; V2 korunuyor. Soru ve İngilizce dışarıda.
 * Web aynası `src/lib/v2-variants.ts`.
 */
const ADVERBS = new Set([
  "heute", "morgen", "gestern", "übermorgen", "vorgestern", "jetzt", "nun", "dann", "danach", "zuerst", "später", "bald", "damals", "früher",
  "morgens", "vormittags", "mittags", "nachmittags", "abends", "nachts", "montags", "dienstags", "mittwochs", "donnerstags", "freitags", "samstags", "sonntags",
  "oft", "manchmal", "immer", "selten", "meistens", "normalerweise", "leider", "hoffentlich", "vielleicht", "deshalb", "deswegen", "trotzdem", "außerdem", "sonst", "hier", "dort",
]);
const SUBJECTS = new Set(["ich", "du", "er", "sie", "es", "wir", "ihr", "man"]);
/**
 * İki kelimelik zaman/yer öbeği (QA 2026-10-13, "Wir fahren morgen früh los"): "Morgen früh",
 * "Heute Abend", "Am Montag", "Im Sommer", "Jeden Tag", "Nächste Woche". Öne alınmış öbeği
 * fiilden sonraya taşımak her zaman dilbilgisel.
 */
const LEAD2 = new Set(["am", "im", "jeden", "jede", "jedes", "nächste", "nächsten", "nächstes", "letzte", "letzten", "letztes", "diese", "diesen", "dieses"]);
const DAY = new Set(["heute", "morgen", "gestern"]);
const DAYPART = new Set(["früh", "abend", "morgen", "vormittag", "mittag", "nachmittag", "nacht"]);
const low = (w: string) => (w ?? "").toLocaleLowerCase("de-DE");

/** `w[i]`den başlayan zarf öbeğinin uzunluğu (1 ya da 2); öbek yoksa 0. */
function phraseAt(w: string[], i: number): number {
  const a = low(w[i]);
  const b = low(w[i + 1]);
  if (DAY.has(a) && DAYPART.has(b)) return 2;
  if (LEAD2.has(a) && b) return 2;
  return ADVERBS.has(a) ? 1 : 0;
}

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
  // Öbek + fiil + özne → özne + fiil + öbek ("Morgen früh fahren wir weg" → "Wir fahren morgen früh weg").
  const k = phraseAt(w, 0);
  if (k && w.length >= k + 2 && SUBJECTS.has(low(w[k + 1]))) {
    return [[cap(w[k + 1]), w[k], mid(w[0]), ...w.slice(1, k), ...w.slice(k + 2)].join(" ") + tail];
  }
  // Özne + fiil + öbek → öbek + fiil + özne.
  const k2 = SUBJECTS.has(low(w[0])) ? phraseAt(w, 2) : 0;
  if (k2) return [[cap(w[2]), ...w.slice(3, 2 + k2), w[1], mid(w[0]), ...w.slice(2 + k2)].join(" ") + tail];
  return [];
}

/** Adaylar ve eşleri; tekrar yok. */
export function withV2Variants(candidates: string[], lang: TargetLang): string[] {
  const out = [...candidates];
  for (const c of candidates) for (const v of v2Variants(c, lang)) if (!out.includes(v)) out.push(v);
  return out;
}
