/**
 * Konuşma eşleştirme + niyet çözümleme — web (games/types spokenMatches,
 * voice-intent parseSkipDe/parseConfirm) portu. Yürüyüş modu STT hükmü bunu kullanır.
 */

/** Almanca söyleniş normalizasyonu: küçült, artikel at, umlaut katla, noktalama boşluk. */
export function foldSpelling(s: string): string {
  return (s || "")
    .toLocaleLowerCase("de-DE")
    .replace(/[.,!?;:"'’]/g, " ")
    .replace(/\b(der|die|das)\b/g, " ")
    .replace(/ß/g, "ss")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
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
  const foldKeep = (s: string): string => {
    const f = foldSpelling(s);
    if (f) return f;
    return (s || "").toLocaleLowerCase("de-DE").replace(/[.,!?;:"'’]/g, " ").replace(/\s+/g, " ").trim();
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

/** "Bilmiyorum / geç" niyeti (Almanca — tanıyıcı de-DE çalıştığı için). */
export function parseSkipDe(said: string): boolean {
  const s = (said || "").toLowerCase();
  return /\b(weiter|überspringen|ueberspringen|nächste|naechste|nächstes|naechstes)\b/.test(s)
    || /(weiss nicht|weiß nicht|keine ahnung|keine idee|kein plan)/.test(s);
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
