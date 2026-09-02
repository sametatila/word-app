/**
 * Konuşma eşleştirme + niyet çözümleme — web (games/types spokenMatches,
 * voice-intent parseSkip/parseConfirm) portu. Yürüyüş modu STT hükmü bunu kullanır.
 */
import { currentTargetLang } from "./courses";

/**
 * Hedef dilin tanımlıkları — eşleştirmede atılır ki "die Katze" ile "Katze"
 * aynı sayılsın. Sabit der/die/das yazılıydı; İngilizce kursta "the" kalıyor
 * ve "the door" hiçbir zaman "door" ile eşleşmiyordu.
 */
const ARTICLES: Record<string, RegExp> = {
  de: /\b(der|die|das)\b/g,
  en: /\b(the|an|a)\b/g,
};

/** Söyleniş normalizasyonu: küçült, tanımlık at, (Almancada) umlaut katla. */
export function foldSpelling(s: string, lang: string = currentTargetLang()): string {
  const lower = (s || "").toLocaleLowerCase(lang === "de" ? "de-DE" : "en-US");
  // Umlaut/ß katlaması yalnız Almancada anlamlı; İngilizcede yapacak iş yok.
  const folded = lang === "de"
    ? lower.replace(/ß/g, "ss").replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue")
    : lower;
  return folded
    .replace(/[.,!?;:"'’]/g, " ")
    .replace(ARTICLES[lang] ?? ARTICLES.de, " ")
    .replace(/\s+/g, " ")
    .trim();
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
  const test = (said: string): boolean => {
    const f = foldKeep(said);
    if (!f) return false;
    return forms.some((form) => f === form || (form.length >= CONTAINS_MIN && ` ${f} `.includes(` ${form} `)));
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
export function parseConfirm(said: string): boolean | null {
  const s = foldTurkish(said);
  if (!s) return null;
  if (/\b(hayir|dur|yeter|iptal|bitir|kapat|yok)\b/.test(s) || /(istemiyor|etmeyelim|kalsin)/.test(s)) return false;
  if (/\b(evet|devam|tamam|olur|hadi|elbette|tabii|peki)\b/.test(s) || /(devam edelim|devam et)/.test(s)) return true;
  return null;
}

/** Yanlış/atlama sonrası kısa cesaret cümlesi (web ENCOURAGE). */
export function encourage(): string {
  const lines = ["Sorun değil.", "Olsun, devam.", "İyi gidiyorsun.", "Bir dahakine."];
  return lines[Math.floor(Math.random() * lines.length)];
}
