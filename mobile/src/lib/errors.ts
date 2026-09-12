/**
 * Hata taksonomisi — web `src/lib/errors.ts`in SAF parçası.
 *
 * Web modülü sözlüğe de bağlı (hata tipinin kullanıcıya gösterilen adı) ve
 * kelime oyunlarının sınıflandırmasını da taşıyor. Buraya yalnız SAF olan
 * parçalar alındı: tip birleşimi, Levenshtein, `miss`/`cleanDetail`, yazarak
 * hatırlamanın sınıflandırması ve Almanca fiil yeri kuralı. `scripts/parity-check.mjs` 17. bölümü bu üçünü
 * web kopyasıyla karşılaştırıyor.
 *
 * `levenshtein` mobilde ÜÇÜNCÜ bir yerde daha vardı (`game/skillQuiz` içinde
 * yerel bir kopya); o kopya kaldırıldı ve buradan alınıyor.
 */
export const ERROR_TYPES = [
  "article",
  "plural",
  "case",
  "verb_position",
  "conjugation",
  "spelling",
  "meaning",
  "word_order",
  "pronunciation",
  "listening",
] as const;

export type ErrorType = (typeof ERROR_TYPES)[number];

/** Hata türünün sözlük anahtarı - web `lib/errors` ile birebir. */
export const ERROR_LABEL_KEYS: Record<ErrorType, string> = {
  article: "err.article",
  plural: "err.plural",
  case: "err.case",
  verb_position: "err.verb_position",
  conjugation: "err.conjugation",
  spelling: "err.spelling",
  meaning: "err.meaning",
  word_order: "err.word_order",
  pronunciation: "err.pronunciation",
  listening: "err.listening",
};

const VALID = new Set<string>(ERROR_TYPES);

export function isErrorType(v: unknown): v is ErrorType {
  return typeof v === "string" && VALID.has(v);
}

/** İki dize arasındaki düzenleme uzaklığı. */
export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(
        prev[j] + 1,
        cur[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    prev = cur;
  }
  return prev[b.length];
}

/** `detail` alanı: seçilen şık ya da yazılan kelime — kısa, tek satır. */
export const DETAIL_MAX = 60;

export function cleanDetail(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const d = v.replace(/\s+/g, " ").trim();
  return d ? d.slice(0, DETAIL_MAX) : null;
}

/**
 * Oyun sonucuna eklenecek hata alanları. Doğru cevapta boş nesne: doğru
 * cevabın hata tipi olmaz ve alanlar hiç gönderilmez.
 */
export function miss(
  correct: boolean,
  errorType: ErrorType,
  detail?: string | null,
): { errorType?: ErrorType; detail?: string } {
  if (correct) return {};
  const d = cleanDetail(detail);
  return d ? { errorType, detail: d } : { errorType };
}

/** Yazım karşılaştırması için katlama: küçük harf, umlaut/ß düzleştirme, artikel yok. */
function foldForSpelling(s: string): string {
  return s
    .toLocaleLowerCase("de-DE")
    .replace(/^(der|die|das)\s+/, "")
    .replace(/ß/g, "ss")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Yazımda hoş görülen en büyük sapma; ötesi "anlam bilinmiyor" sayılır. */
export const SPELLING_TOLERANCE = 2;

/**
 * Yazarak Hatırla: yazılan kelime hedeflerden birine ≤ 2 harf uzaksa yazım
 * hatası, değilse anlam hatası (kelime hiç hatırlanmamış). Boş cevap da
 * anlam: bilmemenin yazımla ilgisi yok.
 */
export function classifyTyping(typed: string, candidates: string[]): ErrorType {
  const t = foldForSpelling(typed);
  if (!t) return "meaning";
  let best = Infinity;
  for (const c of candidates) {
    const f = foldForSpelling(c);
    if (!f) continue;
    best = Math.min(best, levenshtein(t, f));
  }
  return best <= SPELLING_TOLERANCE ? "spelling" : "meaning";
}

const W_WORDS = new Set(["wer", "was", "wo", "wann", "wie", "warum", "wohin", "woher", "welche", "welcher", "welches", "wieso", "weshalb", "wem", "wen", "wessen"]);

/**
 * Cümleyi Diz: çekimli fiilin yeri mi yanlış, yoksa başka bir şey mi?
 *
 * Fiilin hangi jeton olduğu içerikte işaretli değil; Almanca ana cümle kuralı
 * yeterince düzenli: bildirme cümlesinde ve soru kelimeli soruda fiil ikinci
 * sırada, evet/hayır sorusunda birinci sırada. Fiil doğru yerdeyse hata
 * "kelime sırası" (nesne/zaman zarfı sırası vb.), değilse "fiilin yeri" —
 * öğrencinin en sık yaptığı ve kuralı en net olan hata bu.
 */
const SUBORDINATORS = new Set(["weil", "dass", "wenn", "ob", "obwohl", "damit", "während", "bevor", "nachdem", "als", "sobald", "falls", "seit", "seitdem", "bis"]);

/** İngilizce yardımcı fiiller — soruda özneden önce gelirler. */
const EN_AUX = new Set([
  "do", "does", "did", "is", "am", "are", "was", "were", "can", "could", "will",
  "would", "shall", "should", "may", "might", "must", "have", "has", "had",
]);
const EN_WH = new Set(["what", "where", "when", "who", "whom", "whose", "which", "why", "how"]);

/**
 * İngilizcede "fiilin yeri" hatası YALNIZ soruda ölçülebiliyor.
 *
 * Almanca kuralı (çekimli fiil ikinci sırada) İngilizceye uymuyor: "I usually
 * get up at seven." cümlesinde fiil üçüncü sırada ve cümle doğru. Çekimli
 * fiili içerikten bilmediğimiz için düz cümlede tip "kelime sırası" kalıyor;
 * soruda ise yardımcı fiilin yeri kurallı (evet/hayır sorusunda başta, soru
 * kelimeli soruda hemen onun ardından) ve ölçülebiliyor.
 */
function classifyOrderEn(placed: string[], answer: string[], tail: string): ErrorType {
  if (tail.trim() !== "?") return "word_order";
  const norm = (x: string) => x.toLocaleLowerCase("en-US").replace(/[^a-z']/g, "");
  const auxIdx = answer.findIndex((w) => EN_AUX.has(norm(w)));
  if (auxIdx === -1) return "word_order";
  const expected = EN_WH.has(norm(answer[0])) ? 1 : 0;
  if (auxIdx !== expected) return "word_order";
  // Büyük/küçük harf serbest: jeton aynı jeton ama cümle başında büyük yazılı.
  const placedIdx = placed.findIndex((w) => norm(w) === norm(answer[auxIdx]));
  return placedIdx !== -1 && placedIdx !== auxIdx ? "verb_position" : "word_order";
}

export function classifyOrder(
  placed: string[],
  answer: string[],
  tail: string,
  lang: string = "de",
): ErrorType {
  if (!answer.length) return "word_order";
  if (lang === "en") return classifyOrderEn(placed, answer, tail);
  const first = answer[0]?.toLocaleLowerCase("de-DE").replace(/[^a-zäöüß]/g, "") ?? "";
  // Yan cümle parçası ("weil ich krank bin"): çekimli fiil en sonda.
  const verbIdx = SUBORDINATORS.has(first)
    ? answer.length - 1
    : tail.trim() === "?" && !W_WORDS.has(first)
      ? 0
      : Math.min(1, answer.length - 1);
  const verb = answer[verbIdx];
  const placedIdx = placed.indexOf(verb);
  if (placedIdx !== -1 && placedIdx !== verbIdx) return "verb_position";
  return "word_order";
}
