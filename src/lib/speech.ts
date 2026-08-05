/**
 * Konuşma değerlendirmesi — saf mantık, tarayıcıdan bağımsız.
 *
 * Ücretsiz yolla elimizde bir **tanıyıcı** var (Web Speech API), puanlayıcı
 * değil: ne dediğini söyler, nasıl söylediğini değil. Bu yüzden burada
 * "telaffuz notu" hesaplanmaz — öyle bir sayı uydurmak olurdu. Ölçülen şey
 * **anlaşılıp anlaşılmadığın**: hedef kelimeler tanındı mı, tanınmadıysa
 * yerine ne duyuldu.
 *
 * Teşhis akustikten değil **içerikten** gelir. Her göreve, Türkçe konuşan
 * birinin o kelimede yapacağı bilinen sapma önceden yazılır (schön → schon,
 * über → uber). Tanıyıcının döndürdüğü metin bu kümeyle eşleşirse hedefli
 * düzeltme verilebilir: "ö'yü o gibi söyledin". Eşleşmezse dürüst davranıp
 * yalnızca neyin tutmadığını söyleriz.
 *
 * Sınırı açık: yalnızca öngörülen hatalar yakalanır. Ama Türkçe konuşan biri
 * için bu liste kısa ve tahmin edilebilir.
 */

/** Öğrencinin bu görevde yapması beklenen, önceden tanımlı sapma. */
export type SpeechConfusion = {
  /** Tanıyıcıdan çıkması beklenen yanlış biçim(ler). */
  heard: string[];
  /** Ne olduğu ve nasıl düzeltileceği — Türkçe. */
  fix: string;
  /** Doğrusu. Tek kelime olduğunda sesli örnek bunun üzerinden çalınır. */
  expected?: string;
};

export type SpeechVerdict =
  /** Hedef tanındı. */
  | { kind: "correct"; heard: string }
  /** Bilinen bir sapma yakalandı — hedefli düzeltme verilebilir. */
  | { kind: "confusion"; heard: string; fix: string; expected: string }
  /** Çoğu tuttu, birkaç kelime kaçtı. */
  | { kind: "partial"; heard: string; missing: string[] }
  /** Büyük ölçüde başka bir şey duyuldu. */
  | { kind: "different"; heard: string; missing: string[] }
  /** Hiçbir şey tanınmadı (sessizlik, gürültü, mikrofon sorunu). */
  | { kind: "unheard" };

/** Bu orana kadar eksik kelime "az kaldı" sayılır. */
const PARTIAL_TOLERANCE = 1 / 3;

const PUNCTUATION = /[.,!?;:„“”"'`´()[\]…]/g;

/**
 * Karşılaştırma için sadeleştirme.
 *
 * Umlautlar **bilerek** korunur. Kelime oyunlarındaki `foldSpelling` yazım
 * toleransı için ö'yü o'ya indirger; burada aynısını yapmak turun ölçtüğü tek
 * şeyi yok ederdi — schön ile schon arasındaki fark bu turun konusu.
 */
export function normalizeSpoken(text: string): string {
  return text
    .toLocaleLowerCase("de-DE")
    .replace(PUNCTUATION, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function wordsOf(text: string): string[] {
  const normalized = normalizeSpoken(text);
  return normalized ? normalized.split(" ") : [];
}

/**
 * Hedefte olup duyulmayan kelimeler. Çoklu küme farkı: cümlede iki kez geçen
 * bir kelimenin bir kez duyulması "yarısı eksik" demektir.
 */
function missingFrom(goal: string[], heard: string[]): string[] {
  const pool = [...heard];
  const missing: string[] = [];
  for (const word of goal) {
    const at = pool.indexOf(word);
    if (at >= 0) pool.splice(at, 1);
    else missing.push(word);
  }
  return missing;
}

/**
 * Söylenenle hedefi karşılaştırır.
 *
 * `alternatives` tanıyıcının n-best listesidir (SpeechRecognition
 * `maxAlternatives`). Birden fazla aday istemek karışma kümesini yakalama
 * şansını artırır: tanıyıcı ilk sırada dil modeliyle "düzeltilmiş" hâli
 * verirken, ikinci sırada gerçekte duyduğu biçimi taşıyabilir.
 */
export function judgeSpeech(
  target: string,
  alternatives: string[],
  confusions: SpeechConfusion[] = [],
): SpeechVerdict {
  const heardList = alternatives.map(normalizeSpoken).filter(Boolean);
  if (!heardList.length) return { kind: "unheard" };

  const goal = normalizeSpoken(target);
  const goalWords = wordsOf(target);

  // 1) Adaylardan biri hedefi birebir ya da kelime kelime karşılıyorsa doğru.
  //    Tanıyıcı noktalamayı ve büyük harfi kendi kurallarıyla yazdığı için
  //    kelime kümesi karşılaştırması metin eşitliğinden daha güvenilir.
  for (const heard of heardList) {
    if (heard === goal) return { kind: "correct", heard };
    if (missingFrom(goalWords, wordsOf(heard)).length === 0) return { kind: "correct", heard };
  }

  // 2) Bilinen sapmalar. "Farklı bir şey söyledin"den ÖNCE bakılır: elimizde
  //    hedefli bir açıklama varsa genel bir uyarı vermek onu israf etmek olur.
  for (const confusion of confusions) {
    const expected = confusion.expected ? normalizeSpoken(confusion.expected) : "";
    for (const heard of heardList) {
      const heardWords = new Set(wordsOf(heard));
      const hit = confusion.heard
        .map(normalizeSpoken)
        .some((variant) => variant && (heard === variant || heardWords.has(variant)));
      if (!hit) continue;
      // Doğru biçim de duyulmuşsa bu bir hata değil, tanıyıcının fazladan
      // yazdığı bir kelimedir.
      if (expected && heardWords.has(expected)) continue;
      return { kind: "confusion", heard, fix: confusion.fix, expected: confusion.expected ?? "" };
    }
  }

  // 3) Ne kadarı tuttu? En çok kelimeyi yakalayan aday üzerinden konuşulur.
  let best = heardList[0];
  let missing = missingFrom(goalWords, wordsOf(best));
  for (const heard of heardList.slice(1)) {
    const candidate = missingFrom(goalWords, wordsOf(heard));
    if (candidate.length < missing.length) {
      best = heard;
      missing = candidate;
    }
  }

  const ratio = goalWords.length ? missing.length / goalWords.length : 1;
  return ratio <= PARTIAL_TOLERANCE
    ? { kind: "partial", heard: best, missing }
    : { kind: "different", heard: best, missing };
}

/** Görev sayılırken yalnızca tam tanınma "doğru" kabul edilir. */
export function isSpeechCorrect(verdict: SpeechVerdict): boolean {
  return verdict.kind === "correct";
}
