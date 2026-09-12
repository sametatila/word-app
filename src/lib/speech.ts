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

import { foldContractions } from "@/lib/contractions";
import { foldEnglishSpelling } from "@/lib/en-spelling";
import { foldNumbers } from "@/lib/numbers";
import type { TargetLang } from "@/lib/courses";

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
  /**
   * Hedef duyulmuş olabilir ama tanıyıcı bundan emin değil.
   *
   * Ayrı bir durum olarak duruyor çünkü "doğru" demek yanlış olurdu ve
   * "yanlış" demek de haksız. Öğrenciye olan biteni olduğu gibi söyleyip
   * tekrar denemesini istemek dürüst olan.
   */
  | { kind: "uncertain"; heard: string }
  /** Hiçbir şey tanınmadı (sessizlik, gürültü, mikrofon sorunu). */
  | { kind: "unheard" };

/** Bu orana kadar eksik kelime "az kaldı" sayılır. */
const PARTIAL_TOLERANCE = 1 / 3;

/**
 * En iyi adayın onaylanması için gereken asgari güven.
 *
 * Tarayıcılar bu değeri tutarlı doldurmuyor, o yüzden eşik yalnızca gerçekten
 * bir sayı geldiğinde uygulanıyor. Amaç düşük güvenli bir tanımayı "doğru"
 * diye geçirmemek; güven bildirmeyen tarayıcıda davranış değişmiyor.
 */
const MIN_CONFIDENCE = 0.6;

/*
  TİRE DE NOKTALAMA. Tanıyıcı tireli başlığı boşlukla yazıyor ("T-Shirt" →
  "t shirt", "U-Bahn" → "U Bahn"); tire burada kalınca hedef tek jeton,
  duyulan iki jeton oluyordu ve doğru cevap reddediliyordu. Ders hedeflerinin
  74'ü tire taşıyor; kelime katlaması (`lib/textFold` PUNCT) bunu zaten
  yapıyordu, konuşma katlaması geride kalmıştı.
*/
const PUNCTUATION = /[.,!?;:„“”"'`´()[\]…\-–—]/g;

/**
 * Karşılaştırma için sadeleştirme.
 *
 * Umlautlar **bilerek** korunur. Kelime oyunlarındaki `foldSpelling` yazım
 * toleransı için ö'yü o'ya indirger; burada aynısını yapmak turun ölçtüğü tek
 * şeyi yok ederdi — schön ile schon arasındaki fark bu turun konusu.
 */
export function normalizeSpoken(text: string, lang: TargetLang = "de"): string {
  // Sayı sözcükleri rakama: tanıyıcı "fünf"ü "5" yazıyor, içerik "fünf".
  // Umlaut BİLEREK korunuyor (schön/schon farkı bu turun konusu), o yüzden
  // foldNumbers'ın umlaut'lu biçimleri (fünf) de tanıması gerekiyor — tanıyor.
  // Kısaltmalar önce açılıyor: noktalama temizliği kesme işaretini boşluğa
  // çevirdiği için "I'm" ile "I am" bu satırdan sonra buluşamazdı (gerekçe
  // `lib/contractions.ts`).
  return foldNumbers(
    foldEnglishSpelling(
      foldContractions(text.toLocaleLowerCase(lang === "de" ? "de-DE" : "en-US"), lang),
      lang,
    ),
    lang,
  )
    .replace(PUNCTUATION, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function wordsOf(text: string, lang: TargetLang = "de"): string[] {
  const normalized = normalizeSpoken(text, lang);
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
 * `alternatives` tanıyıcının n-best listesidir; **sıra anlamlıdır** ve ilk
 * sıradaki tanıyıcının en iyi tahminidir.
 *
 * Buradaki en önemli karar hangi adayın "doğru" saymaya yeteceği. Önceden
 * beş adaydan **herhangi biri** tutunca doğru deniyordu ve bu, bu ürün
 * kategorisinin imza hatasını taşıyordu: rakip uygulamalarda bilerek yanlış
 * telaffuz edilen kelimeye "doğru" denmesinin mekanizması tam olarak bu.
 * Beş tahmin isteyip birinin tutmasını beklemek, kötü telaffuzu ödüllendiren
 * bir piyango kurmak demek — aday sayısı arttıkça yanlış onay olasılığı da
 * artıyor.
 *
 * Yeni kural: doğruluk yalnızca **en iyi adaydan** kabul ediliyor. Hedef
 * ancak alt sıralarda göründüyse bu "tanındın" değil "belki" demek; o durum
 * `uncertain` olarak dönüyor ve öğrenciye dürüstçe tekrar sorulabiliyor.
 *
 * Alt adaylar yine de okunuyor ama başka bir iş için: karışma kümesini
 * yakalamak. Tanıyıcı ilk sırada dil modeliyle "düzeltilmiş" hâli verirken
 * ikinci sırada gerçekte duyduğu biçimi taşıyabiliyor — teşhis oradan çıkıyor.
 */
export function judgeSpeech(
  target: string,
  alternatives: string[],
  confusions: SpeechConfusion[] = [],
  confidences: number[] = [],
  lang: TargetLang = "de",
): SpeechVerdict {
  /*
    HEDEF DİL PARAMETRESİ SONRADAN GELDİ ve eksikliği sessiz bir kusurdu:
    `normalizeSpoken` dili bilmediği için varsayılan "de" ile çalışıyordu,
    yani İNGİLİZCE dersler Almanca kuralıyla yargılanıyordu. Somut sonucu
    sayı katlamasıydı — tanıyıcı "at 5 o'clock" yazdığında hedef "at five
    o'clock" ile eşleşmiyordu, çünkü `foldNumbers` Almanca sözcük listesine
    bakıyordu. Aynı yoldan kısaltma açma da hiç çalışmıyordu.
  */
  const heardList = alternatives.map((a) => normalizeSpoken(a, lang)).filter(Boolean);
  if (!heardList.length) return { kind: "unheard" };

  const goal = normalizeSpoken(target, lang);
  const goalWords = wordsOf(target, lang);

  // 1) Doğruluk yalnızca en iyi adaydan kabul edilir.
  const best = heardList[0];
  const bestConfidence = confidences[0];
  if (matchesGoal(best, goal, goalWords, lang)) {
    // Tanıyıcı güvenini bildirdiyse ve düşükse onaylamıyoruz. Bildirmeyen
    // tarayıcılar var (Safari) ve orada eskisi gibi davranılıyor: güven
    // yokluğu bir suçlama sebebi değil.
    if (typeof bestConfidence === "number" && bestConfidence > 0 && bestConfidence < MIN_CONFIDENCE) {
      return { kind: "uncertain", heard: best };
    }
    return { kind: "correct", heard: best };
  }

  // Hedef yalnızca alt sıralarda geçiyorsa: tanıyıcı bunu ilk tahmini yapmadı.
  // Söylenen muhtemelen hedefe yakın ama net değil — dürüst cevap "emin değilim".
  const lowerHit = heardList.slice(1).find((heard) => matchesGoal(heard, goal, goalWords, lang));
  if (lowerHit) return { kind: "uncertain", heard: heardList[0] };

  // 2) Bilinen sapmalar. "Farklı bir şey söyledin"den ÖNCE bakılır: elimizde
  //    hedefli bir açıklama varsa genel bir uyarı vermek onu israf etmek olur.
  for (const confusion of confusions) {
    const expected = confusion.expected ? normalizeSpoken(confusion.expected, lang) : "";
    for (const heard of heardList) {
      const heardWords = new Set(wordsOf(heard, lang));
      const hit = confusion.heard
        .map((x) => normalizeSpoken(x, lang))
        .some((variant) => variant && (heard === variant || heardWords.has(variant)));
      if (!hit) continue;
      // Doğru biçim de duyulmuşsa bu bir hata değil, tanıyıcının fazladan
      // yazdığı bir kelimedir.
      if (expected && heardWords.has(expected)) continue;
      return { kind: "confusion", heard, fix: confusion.fix, expected: confusion.expected ?? "" };
    }
  }

  // 3) Ne kadarı tuttu? En çok kelimeyi yakalayan aday üzerinden konuşulur.
  let closest = heardList[0];
  let missing = missingFrom(goalWords, wordsOf(closest, lang));
  for (const heard of heardList.slice(1)) {
    const candidate = missingFrom(goalWords, wordsOf(heard, lang));
    if (candidate.length < missing.length) {
      closest = heard;
      missing = candidate;
    }
  }

  const ratio = goalWords.length ? missing.length / goalWords.length : 1;
  return ratio <= PARTIAL_TOLERANCE
    ? { kind: "partial", heard: closest, missing }
    : { kind: "different", heard: closest, missing };
}

/** Bir adayın hedefi karşılayıp karşılamadığı — metin ve kelime kümesi. */
function matchesGoal(heard: string, goal: string, goalWords: string[], lang: TargetLang = "de"): boolean {
  if (heard === goal) return true;
  // Tanıyıcı noktalamayı ve büyük harfi kendi kurallarıyla yazdığı için
  // kelime kümesi karşılaştırması metin eşitliğinden daha güvenilir.
  return missingFrom(goalWords, wordsOf(heard, lang)).length === 0;
}

/** Görev sayılırken yalnızca tam tanınma "doğru" kabul edilir. */
export function isSpeechCorrect(verdict: SpeechVerdict): boolean {
  return verdict.kind === "correct";
}
