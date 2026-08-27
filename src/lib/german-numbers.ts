/**
 * Almanca sayı sözcüklerini rakama indirger — karşılaştırma katlaması için.
 *
 * Konuşma tanıyıcıları (hem tarayıcının kendisi hem sunucu sağlayıcıları)
 * sayıları çoğu zaman RAKAM yazıyor: kullanıcı "fünf Uhr" diyor, tanıyıcı
 * "5 Uhr" döndürüyor. İçerik ise sözcükle yazılı ("fünf"), dolayısıyla düz
 * metin karşılaştırması tutmuyor ve doğru cevap yanlış sayılıyordu.
 *
 * Çözüm biçimi seçmek yerine ORTAK BİÇİME indirmek: hem beklenen hem duyulan
 * metindeki sayı sözcükleri rakama çevriliyor, zaten rakam olanlar olduğu gibi
 * kalıyor. "fünf" → "5", "5" → "5"; ikisi de eşleşiyor. Yön bağımsız.
 *
 * Kapsam bilerek dar ve güvenli: yalnızca AÇIK sayı sözcükleri. Tek başına
 * `ein`/`eine` (belirsiz artikel) DOKUNULMUYOR — yalnız `eins` ve bileşik
 * `einundzwanzig` içindeki birler basamağı çevriliyor. Umlaut'lu (`fünf`) ve
 * katlanmış (`fuenf`) yazım ikisi de tanınıyor, böylece fold sırasından
 * bağımsız çalışıyor.
 */

/** 0–20 ve on'lar — tek sözcük. */
const DIRECT: Record<string, number> = {
  null: 0,
  eins: 1,
  zwei: 2,
  drei: 3,
  vier: 4,
  fünf: 5,
  fuenf: 5,
  sechs: 6,
  sieben: 7,
  acht: 8,
  neun: 9,
  zehn: 10,
  elf: 11,
  zwölf: 12,
  zwoelf: 12,
  dreizehn: 13,
  vierzehn: 14,
  fünfzehn: 15,
  fuenfzehn: 15,
  sechzehn: 16,
  siebzehn: 17,
  achtzehn: 18,
  neunzehn: 19,
  zwanzig: 20,
  dreißig: 30,
  dreissig: 30,
  vierzig: 40,
  fünfzig: 50,
  fuenfzig: 50,
  sechzig: 60,
  siebzig: 70,
  achtzig: 80,
  neunzig: 90,
  hundert: 100,
  einhundert: 100,
  tausend: 1000,
  eintausend: 1000,
};

/** Bileşikte birler basamağı — `einundzwanzig`in `ein`i buradan 1. */
const ONES: Record<string, number> = {
  ein: 1,
  eins: 1,
  zwei: 2,
  drei: 3,
  vier: 4,
  fünf: 5,
  fuenf: 5,
  sechs: 6,
  sieben: 7,
  acht: 8,
  neun: 9,
};

/** On'lar (bileşiğin sağ yarısı). */
const TENS: Record<string, number> = {
  zwanzig: 20,
  dreißig: 30,
  dreissig: 30,
  vierzig: 40,
  fünfzig: 50,
  fuenfzig: 50,
  sechzig: 60,
  siebzig: 70,
  achtzig: 80,
  neunzig: 90,
};

const COMPOUND = /^([a-zäöüß]+?)und(zwanzig|dreißig|dreissig|vierzig|fünfzig|fuenfzig|sechzig|siebzig|achtzig|neunzig)$/;

/** Bir sözcüğün sayı değeri; sayı değilse `null`. */
export function wordToNumber(word: string): number | null {
  const w = word.toLowerCase();
  if (w in DIRECT) return DIRECT[w];
  const m = w.match(COMPOUND);
  if (m && m[1] in ONES) return ONES[m[1]] + TENS[m[2]];
  return null;
}

/** Metindeki Almanca sayı sözcüklerini rakama çevirir; gerisi olduğu gibi. */
export function foldNumbers(text: string): string {
  return text.replace(/[a-zäöüßA-ZÄÖÜ]+/g, (w) => {
    const n = wordToNumber(w);
    return n === null ? w : String(n);
  });
}
