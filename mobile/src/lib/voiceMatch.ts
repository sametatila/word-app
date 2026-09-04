/**
 * Konuşma eşleştirme + niyet çözümleme — web (games/types spokenMatches,
 * voice-intent parseSkip/parseConfirm) portu. Yürüyüş modu STT hükmü bunu kullanır.
 */
import { currentTargetLang } from "./courses";
import { currentLang, t } from "./i18n";
import { foldCompare, foldLetters } from "./textFold";

/**
 * Hedef dilin tanımlıkları — eşleştirmede atılır ki "die Katze" ile "Katze"
 * aynı sayılsın. Sabit der/die/das yazılıydı; İngilizce kursta "the" kalıyor
 * ve "the door" hiçbir zaman "door" ile eşleşmiyordu.
 */
const ARTICLES: Record<string, RegExp> = {
  de: /\b(der|die|das)\b/g,
  en: /\b(the|an|a)\b/g,
};

/** Söyleniş normalizasyonu: küçült, sayıları rakama indir, tanımlık at, (Almancada) umlaut katla. */
export function foldSpelling(s: string, lang: string = currentTargetLang()): string {
  // Ortak katlama (küçültme + umlaut + noktalama + sayı) textFold'da; burada
  // yalnız SÖZLÜ karşılaştırmaya özgü ek var: tanımlık atılıyor, çünkü konuşurken
  // "der Tisch" yerine sadece "Tisch" demek doğru sayılmalı.
  return foldCompare(s, lang)
    .replace(ARTICLES[lang] ?? ARTICLES.de, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Tanıyıcının sözlü noktalama ADINI simgeye çevirmesini geri alır.
 *
 * Tanıyıcı "Punkt" dendiğinde onu bir yazım komutu sayıp "." yazıyor (aynı
 * biçimde Komma→",", Fragezeichen→"?"). Ama "der Punkt" başlı başına bir sözlük
 * kelimesi: simge sonra katlamada silinince cevap ORTADAN kalkıyor ve hiçbir
 * zaman eşleşmiyordu ("der punkt diyorum, 'da' olarak duydu"). Web'de çözülmüştü,
 * mobile hiç taşınmamıştı.
 *
 * İngilizcede de aynı: havuzda "limitation period", "notice period", "quote"
 * gibi 7 başlık var ve tanıyıcı "period" dendiğinde "." yazıyor —
 * "limitation period" → "limitation." → katlamada "limitation" kalıyor.
 *
 * Yalnızca EK bir okuma olarak deneniyor (asıl okuma önce), yani yanlışlıkla
 * nokta eklenmiş normal bir cevaba zarar vermiyor.
 */
const RECOGNIZER_PUNCT: Record<string, Array<[RegExp, string]>> = {
  de: [
    [/\u2026|\.\.\./g, " punkt "],
    [/\./g, " punkt "],
    [/,/g, " komma "],
    [/\?/g, " fragezeichen "],
    [/!/g, " ausrufezeichen "],
    [/:/g, " doppelpunkt "],
    [/;/g, " semikolon "],
  ],
  en: [
    [/\u2026|\.\.\./g, " period "],
    [/\./g, " period "],
    [/,/g, " comma "],
    [/\?/g, " question mark "],
    [/!/g, " exclamation mark "],
    [/:/g, " colon "],
    [/;/g, " semicolon "],
    [/["\u201C\u201D]/g, " quote "],
  ],
};

export function expandPunctuationWords(s: string, lang: string): string {
  let out = s;
  for (const [re, word] of RECOGNIZER_PUNCT[lang] ?? []) out = out.replace(re, word);
  return out.replace(/\s+/g, " ").trim();
}

/** Sözlük başlığı varyantları: parantez, "/" alternatifleri, "sich" düşürme. */
function acceptedForms(raw: string): string[] {
  const out = new Set<string>();
  const base = (raw || "").trim();
  if (!base) return [];
  out.add(base);
  out.add(base.replace(/\(.*?\)/g, " ").replace(/\s+/g, " ").trim());
  for (const part of base.split("/")) out.add(part.trim());
  out.add(base.replace(/\bsich\b/g, " ").replace(/\s+/g, " ").trim());
  return [...out].filter(Boolean);
}

const CONTAINS_MIN = 3; // fazla kelime bağışlanır ama yalnız ≥3 harfli hedeflerde

/**
 * Duyulanlardan biri beklenen biçimlerden birine uyuyor mu? Tam eşleşme ya da
 * (hedef ≥3 harf) kelime-sınırlı içerme ("ähm die Katze bitte" → Katze).
 */
export function spokenMatches(heard: string[], candidates: string[]): boolean {
  // Hedef/duyulan yalnız artikelse (der/die/das) foldSpelling onu silip boşaltıyor →
  // asla eşleşmez. Boşalırsa artikeli silmeyen düz küçültmeye düş.
  const lang = currentTargetLang();
  const foldKeep = (s: string): string => {
    const f = foldSpelling(s, lang);
    if (f) return f;
    return (s || "").toLocaleLowerCase(lang === "de" ? "de-DE" : "en-US").replace(/[.,!?;:"'’]/g, " ").replace(/\s+/g, " ").trim();
  };
  const forms = candidates.flatMap(acceptedForms).map(foldKeep).filter(Boolean);
  if (!forms.length) return false;
  // Boşluktan bağımsız ikinci biçim: tanıyıcı Almanca bileşikleri ayırıyor
  // ("Anrufbeantworter" → "Anruf Beantworter", havuzda 2313 uzun bileşik) ve
  // tireli başlıkları boşlukla yazıyor ("t-shirt" → "t shirt"). Boşlukları
  // tamamen atınca iki yazım da aynı dizeye iniyor.
  const sikis = (x: string) => x.replace(/\s+/g, "");
  const forms2 = forms.map(sikis);
  // Sıkıştırma sayı KATLANMADAN da yapılıyor: tanıyıcı bileşiği bölünce
  // ("Fasnacht" → "Fasn acht") ikinci parça sayı sözcüğü olabiliyor ve
  // katlanmış biçim ("fasn 8") artık orijinaline benzemiyor. Ham sıkıştırma
  // o yolu da kapatıyor.
  const ham = (x: string) => foldLetters(x, lang);
  const forms3 = candidates.flatMap(acceptedForms).map(ham).filter(Boolean);
  const test = (said: string): boolean => {
    const f = foldKeep(said);
    // Boş katlama erken dönmüyor: kullanıcı yalnız "Punkt" deyince tanıyıcı
    // sadece "." yazıyor ve katlama onu tamamen boşaltıyor — asıl kurtarılması
    // gereken durum tam da bu.
    if (f) {
      if (forms.some((form) => f === form || (form.length >= CONTAINS_MIN && ` ${f} `.includes(` ${form} `)))) return true;
      const g = sikis(f);
      if (forms2.some((form) => g === form || (form.length >= CONTAINS_MIN && g.includes(form)))) return true;
      const h = ham(said);
      if (h && forms3.some((form) => h === form || (form.length >= CONTAINS_MIN && h.includes(form)))) return true;
    }
    // Son okuma: sözlü noktalama adı simgeden geri açılır. YALNIZ tam eşleşme —
    // içerme aranırsa "Hund." → "hund punkt" olur, içinde "punkt" geçer ve
    // hedefi "Punkt" olan tur yanlışlıkla doğru sayılırdı.
    const genis = expandPunctuationWords(said, lang);
    if (genis && genis !== said.trim()) {
      const e = foldKeep(genis);
      if (e && forms.some((form) => e === form)) return true;
    }
    return false;
  };
  return heard.some((h) => test(h));
}

/**
 * "Bilmiyorum / geç" niyeti — tanıyıcı hangi dilde çalışıyorsa o dilin
 * kalıplarıyla. Eskiden yalnız Almanca kalıplar vardı (adı da parseSkipDe'ydi),
 * yani İngilizce kursta "skip" desen tur atlanmazdı.
 */
const SKIP: Record<string, RegExp[]> = {
  de: [
    /\b(weiter|überspringen|ueberspringen|nächste|naechste|nächstes|naechstes)\b/,
    /(weiss nicht|weiß nicht|keine ahnung|keine idee|kein plan)/,
  ],
  en: [
    /\b(next|skip|pass)\b/,
    /(don't know|dont know|do not know|no idea|dunno|not sure)/,
  ],
};

export function parseSkip(said: string, lang: string = currentTargetLang()): boolean {
  const s = (said || "").toLowerCase();
  return (SKIP[lang] ?? SKIP.de).some((re) => re.test(s));
}

/** Türkçe aksan katlama (evet/hayır niyeti için). */
function foldTurkish(s: string): string {
  return (s || "")
    .toLocaleLowerCase("tr-TR")
    .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u")
    .replace(/[.,!?;:]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Tur sonu "devam edelim mi?" — evet/true, hayır/false, belirsiz/null. Önce HAYIR. */
/**
 * "Devam edelim mi?" cevabı — ANLATIM dilinde verilir, hedef dilde değil.
 *
 * Yalnız Türkçe kalıplar yazılıydı; arayüz dili İngilizce olan kullanıcı "yes"
 * dediğinde hiçbiri tutmuyor, soru ikinci kez sorulup tur sessizce bitiyordu.
 */
const CONFIRM: Record<string, { no: RegExp; yes: RegExp }> = {
  tr: {
    no: /\b(hayir|dur|yeter|iptal|bitir|kapat|yok)\b|istemiyor|etmeyelim|kalsin/,
    yes: /\b(evet|devam|tamam|olur|hadi|elbette|tabii|peki)\b|devam edelim|devam et/,
  },
  en: {
    no: /\b(no|nope|stop|quit|exit|enough|later|cancel)\b|not now|i ?'?a?m done/,
    yes: /\b(yes|yeah|yep|yup|sure|ok|okay|continue|go|more|please)\b|let ?'?s (go|continue)|keep going/,
  },
  de: {
    no: /\b(nein|ne|stopp|stop|schluss|genug|aufhoren|abbrechen|später)\b|nicht mehr/,
    yes: /\b(ja|jawohl|klar|gerne|weiter|okay|ok|los|naturlich|bitte)\b|mach weiter|weiter machen/,
  },
};

export function parseConfirm(said: string): boolean | null {
  const s = foldTurkish(said);
  if (!s) return null;
  const r = CONFIRM[currentLang()] ?? CONFIRM.tr;
  if (r.no.test(s)) return false;
  if (r.yes.test(s)) return true;
  return null;
}

/**
 * Yanlış/atlama sonrası kısa cesaret cümlesi (web ENCOURAGE).
 *
 * Cümleler ANLATIM dilinde okunuyor, bu yüzden sözlükten geliyor: tek anahtar
 * "|" ile ayrılmış birkaç alternatif taşır.
 */
export function encourage(): string {
  const lines = t("walk.encourage").split("|").filter(Boolean);
  return lines[Math.floor(Math.random() * lines.length)] ?? "";
}
