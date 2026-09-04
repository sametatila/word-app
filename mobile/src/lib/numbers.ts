/**
 * Sayı sözcüklerini rakama indirger — karşılaştırma katlaması için, iki dilli.
 *
 * Konuşma tanıyıcıları sayıları çoğu zaman RAKAM yazıyor: kullanıcı "fünf Uhr"
 * ya da "half past seven" diyor, tanıyıcı "5 Uhr" / "half past 7" döndürüyor.
 * İçerik ise sözcükle yazılı, dolayısıyla düz karşılaştırma tutmuyor ve doğru
 * cevap yanlış sayılıyordu. Aynı belirsizlik yazarak cevaplarken de var:
 * öğrenci "2" yazıyor, hedef "two".
 *
 * Çözüm biçim seçmek değil ORTAK BİÇİME indirmek: hem beklenen hem duyulan
 * metindeki sayı sözcükleri rakama çevriliyor, zaten rakam olanlar duruyor.
 * "fünf" → "5", "5" → "5"; ikisi de eşleşiyor. Yön bağımsız.
 *
 * Web'de `src/lib/german-numbers.ts` yalnız Almanca yapıyordu ve mobile hiç
 * taşınmamıştı — İngilizce kurs açılınca "forty-two" gibi hedefler tanıyıcının
 * yazdığı "42" ile hiçbir zaman eşleşmiyordu.
 *
 * Kapsam bilerek dar ve güvenli: yalnızca AÇIK sayı sözcükleri.
 *  • Almancada tek başına `ein`/`eine` (belirsiz artikel) DOKUNULMUYOR; yalnız
 *    `eins` ve bileşik `einundzwanzig` içindeki birler basamağı çevriliyor.
 *  • İngilizcede `a`/`an` dokunulmuyor. `one` çevriliyor çünkü sayı olarak
 *    okunur ("one o'clock") — ama tire ya da kesme işareti izliyorsa
 *    dokunulmuyor: "one-way street", "one's mind", "third-party funding"
 *    bileşiktir, sayı değil.
 *  • Umlaut'lu (`fünf`) ve katlanmış (`fuenf`) yazım ikisi de tanınıyor, böylece
 *    fold sırasından bağımsız çalışıyor.
 */

/* ─────────────── Almanca ─────────────── */

const DE_DIRECT: Record<string, number> = {
  null: 0, eins: 1, zwei: 2, drei: 3, vier: 4,
  fünf: 5, fuenf: 5, sechs: 6, sieben: 7, acht: 8, neun: 9, zehn: 10,
  elf: 11, zwölf: 12, zwoelf: 12, dreizehn: 13, vierzehn: 14,
  fünfzehn: 15, fuenfzehn: 15, sechzehn: 16, siebzehn: 17, achtzehn: 18, neunzehn: 19,
  zwanzig: 20, dreißig: 30, dreissig: 30, vierzig: 40, fünfzig: 50, fuenfzig: 50,
  sechzig: 60, siebzig: 70, achtzig: 80, neunzig: 90,
  hundert: 100, einhundert: 100, tausend: 1000, eintausend: 1000,
};
const DE_ONES: Record<string, number> = {
  ein: 1, eins: 1, zwei: 2, drei: 3, vier: 4, fünf: 5, fuenf: 5, sechs: 6, sieben: 7, acht: 8, neun: 9,
};
const DE_TENS: Record<string, number> = {
  zwanzig: 20, dreißig: 30, dreissig: 30, vierzig: 40, fünfzig: 50, fuenfzig: 50,
  sechzig: 60, siebzig: 70, achtzig: 80, neunzig: 90,
};
const DE_COMPOUND = /^([a-zäöüß]+?)und(zwanzig|dreißig|dreissig|vierzig|fünfzig|fuenfzig|sechzig|siebzig|achtzig|neunzig)$/;

/* ─────────────── İngilizce ─────────────── */

const EN_DIRECT: Record<string, number> = {
  zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
  ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15,
  sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19,
  twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90,
  hundred: 100, thousand: 1000,
};
/**
 * Sıra sayıları da katlanıyor: tanıyıcı "the first floor" yerine "the 1st floor"
 * yazabiliyor. Rakam biçimi ("1st") ayrıca ele alınıyor, aşağıda.
 */
const EN_ORDINAL: Record<string, number> = {
  first: 1, second: 2, third: 3, fourth: 4, fifth: 5, sixth: 6, seventh: 7, eighth: 8,
  ninth: 9, tenth: 10, eleventh: 11, twelfth: 12, thirteenth: 13, fourteenth: 14,
  fifteenth: 15, sixteenth: 16, seventeenth: 17, eighteenth: 18, nineteenth: 19, twentieth: 20,
};
const EN_TENS: Record<string, number> = {
  twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90,
};
const EN_ONES: Record<string, number> = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
};

/**
 * Almanca çarpımsal bileşikler: "achthundert" (800), "dreißigtausend" (30000),
 * "zweihundertfünfzig" (250). Tek sözcük oldukları için tabloya sığmıyor,
 * özyinelemeli çözülüyor.
 *
 * Yanlış katlama riski yok: sol parça sayı değilse `null` dönüyor ve sözcük
 * olduğu gibi kalıyor — "Jahrhundert" (sol="jahr") ve "Tausendfüßler"
 * (sağ="füßler") bozulmuyor.
 */
function deScale(w: string): number | null {
  for (const [ad, kat] of [["tausend", 1000], ["hundert", 100]] as const) {
    const i = w.indexOf(ad);
    if (i < 0) continue;
    const sol = w.slice(0, i);
    const sağ = w.slice(i + ad.length);
    const l = sol === "" || sol === "ein" ? 1 : deNumber(sol);
    if (l === null) continue;
    const r = sağ === "" ? 0 : deNumber(sağ);
    if (r === null) continue;
    return l * kat + r;
  }
  return null;
}

function deNumber(w: string): number | null {
  if (w in DE_DIRECT) return DE_DIRECT[w];
  const m = w.match(DE_COMPOUND);
  if (m && m[1] in DE_ONES) return DE_ONES[m[1]] + DE_TENS[m[2]];
  return deScale(w);
}

/**
 * Sıra sayısı eki. Sıra sayıları kardinallerden AYRI bir kanona iniyor:
 * "first" → "1st", "the 4th floor" → "4th". İkisini de düz rakama indirseydik
 * "first" ile "one" aynı olurdu ve hedefi "first" olan adımda "one" diyen
 * kullanıcı yanlışlıkla doğru sayılırdı — içerikte 20 sıra sayılı hedef var.
 */
function ordinalSuffix(n: number): string {
  const s = n % 100;
  if (s >= 11 && s <= 13) return "th";
  return ["th", "st", "nd", "rd"][n % 10] ?? "th";
}

/**
 * Sözcüğün karşılaştırma jetonu: kardinal → "5", sıra sayısı → "5th".
 * Sayı değilse `null`.
 */
function wordToToken(word: string, lang: string): string | null {
  const w = word.toLowerCase();
  if (lang === "en") {
    if (w in EN_DIRECT) return String(EN_DIRECT[w]);
    if (w in EN_ORDINAL) { const n = EN_ORDINAL[w]; return `${n}${ordinalSuffix(n)}`; }
    // "1st", "2nd", "23rd", "4th" — yanlış ek yazılmışsa da ("1th") düzelir
    const ord = w.match(/^(\d+)(st|nd|rd|th)$/);
    if (ord) { const n = Number(ord[1]); return `${n}${ordinalSuffix(n)}`; }
    return null;
  }
  const n = deNumber(w);
  return n === null ? null : String(n);
}

/** Bir sözcüğün sayı değeri; sayı değilse `null`. */
export function wordToNumber(word: string, lang: string): number | null {
  const w = word.toLowerCase();
  if (lang === "en") {
    if (w in EN_DIRECT) return EN_DIRECT[w];
    if (w in EN_ORDINAL) return EN_ORDINAL[w];
    // "1st", "2nd", "23rd", "4th"
    const ord = w.match(/^(\d+)(st|nd|rd|th)$/);
    if (ord) return Number(ord[1]);
    return null;
  }
  return deNumber(w);
}

/**
 * İngilizce tireli/boşluklu birleşik sayılar: "twenty-one" ve "twenty one"
 * ikisi de 21 olmalı. Tanıyıcı hangi biçimi yazarsa yazsın aynı sonuç çıksın
 * diye tek geçişte ele alınıyor (Almancada bileşik zaten tek sözcük).
 */
function foldEnglishCompounds(text: string): string {
  const tens = Object.keys(EN_TENS).join("|");
  const ones = Object.keys(EN_ONES).join("|");
  // Ayırıcı İSTEĞE BAĞLI: kullanıcı "twenty-five", "twenty five" ya da bitişik
  // "twentyfive" yazabiliyor, tanıyıcı da üçünü de üretebiliyor. Sözcük sınırı
  // yanlış katlamayı engelliyor ("oneself"te önde onlar basamağı yok).
  return text.replace(new RegExp(`\\b(${tens})[\\s-]?(${ones})\\b`, "gi"), (_m, t: string, o: string) =>
    String(EN_TENS[t.toLowerCase()] + EN_ONES[o.toLowerCase()]),
  );
}

/**
 * İngilizce çok sözcüklü ölçek ifadeleri: "two hundred", "thirty thousand",
 * "a hundred", "two hundred and fifty". Tanıyıcı bunları "200" / "30000" yazıyor.
 *
 * Kapsam BİLEREK dar: yalnız `<sayı> hundred|thousand [and] [<sayı>]` kalıbı.
 * Serbest sayı dizisi toplamıyoruz — "one two three" gibi tek tek okunan
 * rakamları 6 sanmak kullanıcıyı YANLIŞ YORUMLAMAK olurdu.
 *
 * `a hundred`ta `a` sayı sayılıyor (yalnız burada; tek başına artikel olarak
 * hâlâ dokunulmuyor).
 */
function foldEnglishScales(text: string): string {
  const tekil = [...Object.keys(EN_DIRECT), ...Object.keys(EN_ORDINAL)]
    .filter((w) => EN_DIRECT[w] !== 100 && EN_DIRECT[w] !== 1000)
    .sort((a, b) => b.length - a.length).join("|");
  const sayı = `\\d+|${tekil}`;
  const re = new RegExp(`\\b(a|an|${sayı})\\s+(hundred|thousand)\\b(?:\\s+(?:and\\s+)?(${sayı})\\b)?`, "gi");
  return text.replace(re, (tam, çarpan: string, ölçek: string, kalan?: string) => {
    const c = /^\d+$/.test(çarpan) ? Number(çarpan)
      : /^an?$/i.test(çarpan) ? 1
      : wordToNumber(çarpan, "en");
    if (c === null) return tam;
    const k = kalan == null ? 0
      : /^\d+$/.test(kalan) ? Number(kalan)
      : wordToNumber(kalan, "en");
    if (k === null) return tam;
    return String(c * (ölçek.toLowerCase() === "thousand" ? 1000 : 100) + k);
  });
}

/**
 * Metindeki sayı sözcüklerini rakama çevirir; gerisi olduğu gibi kalır.
 * `lang` hedef dil ("de" | "en"); tanınmayan dilde metin değişmeden döner.
 */
export function foldNumbers(text: string, lang: string): string {
  if (lang !== "de" && lang !== "en") return text;
  const pre = lang === "en" ? foldEnglishScales(foldEnglishCompounds(text)) : text;
  return pre.replace(/[0-9]*[a-zäöüßA-ZÄÖÜ]+/g, (w, offset: number, tam: string) => {
    // Tire ya da kesme işareti izliyorsa sözcük bir BİLEŞİĞİN parçasıdır, sayı
    // değil: "one-way street", "one's mind", "third-party funding". Almanca
    // modülü aynı sebeple `ein`e hiç dokunmuyordu; İngilizcede `one` ve sıra
    // sayıları da bu tuzağa düşüyor. (Gerçek sayı bileşikleri — "twenty-one" —
    // bu noktaya gelmeden foldEnglishCompounds'ta zaten çözülüyor.)
    const sonra = tam[offset + w.length];
    if (sonra === "-" || sonra === "'" || sonra === "\u2019") return w;
    return wordToToken(w, lang) ?? w;
  });
}
