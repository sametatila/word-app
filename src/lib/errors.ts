/**
 * Hata taksonomisi (plan WP-02).
 *
 * Bir yanlış cevabın "yanlış" olduğunu bilmek öğretmek için yetmiyor: öğrenci
 * artikeli mi karıştırdı, kelimeyi mi tanımadı, harfi mi yanlış yazdı? Geri
 * bildirimin "neden"i (WP-13), hata analitiği (WP-51) ve hataya göre tekrar
 * planı hep aynı soruya dayanıyor. Bu dosya o sorunun cevap kümesi.
 *
 * Sınıflandırma İSTEMCİDE yapılır, çünkü ne sorulduğunu ve ne seçildiğini
 * yalnız oyun bilir: Artikel Yarışı'nda her yanlış artikel hatasıdır, Yazarak
 * Hatırla'da iki harflik sapma yazım, daha fazlası anlam hatasıdır. Sunucu
 * tipi doğrular ve `reviews.error_type`'a yazar; kendisi tahmin etmez.
 *
 * Bu modül istemci ve sunucuda ortak: `server-only` yok, veritabanı yok.
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

const VALID = new Set<string>(ERROR_TYPES);

export function isErrorType(v: unknown): v is ErrorType {
  return typeof v === "string" && VALID.has(v);
}

/** Türkçe ad — şeritte, profilde, raporda. */
export const ERROR_LABELS: Record<ErrorType, string> = {
  article: "artikel",
  plural: "çoğul",
  case: "hâl (Kasus)",
  verb_position: "fiilin yeri",
  conjugation: "fiil çekimi",
  spelling: "yazım",
  meaning: "anlam",
  word_order: "kelime sırası",
  pronunciation: "telaffuz",
  listening: "dinleme",
};

/**
 * Hata tipinden dilbilgisi sayfasına bağlantı: `/cheatsheet#<tablo>`.
 *
 * Tablo kimlikleri `src/lib/cheatsheet/de-*.ts` içindeki `id` alanları;
 * seviye ekli olanlar (a1-…) en temel tabloya gider — öğrenci ileri seviyede
 * de olsa hatanın kuralı orada başlıyor. Anlam/dinleme/telaffuz için tablo
 * yok: bunlar kural değil kelime bilgisi.
 */
export const ERROR_CHEATSHEET: Partial<Record<ErrorType, string>> = {
  article: "a1-artikel",
  plural: "a1-plural",
  case: "a1-praepositionen",
  verb_position: "a1-satzbau",
  conjugation: "a1-praesens",
  word_order: "a1-satzbau",
};

export function cheatsheetHref(type: ErrorType): string | null {
  const id = ERROR_CHEATSHEET[type];
  return id ? `/cheatsheet#${id}` : null;
}

/**
 * Tekrar aralığına hata tipi ağırlığı (SRS kancası).
 *
 * `schedule()` doğru cevapta aralığı bu katsayıyla çarpar; kelimenin son
 * yanlışı hangi tipteyse o uygulanır. Varsayılan 1,0 = etkisiz. Artikel ve
 * çoğul için hafif kısaltma bilinçli: bunlar kelimeyle birlikte ezberlenen
 * biçim bilgisi, bir kez doğru bilinmesi yerleştiğini göstermiyor. Değerleri
 * WP-51 ölçüme göre ayarlar; burada yalnız kanca ve iki küçük örnek var.
 */
export const ERROR_SRS_WEIGHT: Record<ErrorType, number> = {
  article: 0.9,
  plural: 0.9,
  case: 1,
  verb_position: 1,
  conjugation: 1,
  spelling: 1,
  meaning: 1,
  word_order: 1,
  pronunciation: 1,
  listening: 1,
};

export function srsWeightFor(type: ErrorType | null | undefined): number {
  return type ? (ERROR_SRS_WEIGHT[type] ?? 1) : 1;
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

/** Levenshtein uzaklığı — kısa kelimeler için, sınırsız. */
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

export function classifyOrder(placed: string[], answer: string[], tail: string): ErrorType {
  if (!answer.length) return "word_order";
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
