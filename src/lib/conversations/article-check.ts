import GENDER from "./noun-gender.generated.json";

/**
 * ARTİKEL DENETİMİ — belirlenimci, yalnız yalın hâlin KESİN olduğu yerde (QA F-0084, 2026-10-09).
 *
 * Görev "her odanın adını doğru artikeliyle söyle" iken öğrenci "Und das ist die Schlafzimmer."
 * yazdı; model düzeltme satırı yazmadı, özet "hiç düzeltme gerekmedi, %100" dedi. Artikel en sık
 * öğrenci hatası ve modelin hatırlamasına bırakılamıyor. Bu denetim düzeltme satırını sunucuda
 * kendisi kuruyor; model aynısını yazarsa süzgeç (`fix-guard` `injected`) onu siliyor.
 *
 * TUTUCU: yalnız şu kalıplarda, tekil yalın hâlde:
 *   - "das/dies/es/hier/da/wo/wer/was + ist + (der|die|das|ein|eine) + İsim" — yüklem adı ya da özne,
 *   - cümle başında "(Der|Die|Das) + İsim + tekil fiil" (ist, war, hat, kostet, steht, liegt …).
 * Çoğul olabilecek yerde (sind, waren) ve sözlükte birden çok cinsiyeti olan isimde susar.
 * Sözlük words.json'dan (`scripts/gen-noun-gender.mjs`, 4.771 isim).
 */
const G = GENDER as Record<string, "der" | "die" | "das">;
const DEF: Record<string, string> = { der: "der", die: "die", das: "das" };
const INDEF: Record<"der" | "die" | "das", string> = { der: "ein", die: "eine", das: "ein" };
const SG_VERB = new Set(["ist", "war", "hat", "hatte", "kostet", "steht", "liegt", "hängt", "kommt", "geht", "fährt", "gefällt", "schmeckt", "passt", "gehört", "heißt", "sieht", "braucht", "wohnt", "arbeitet", "spielt", "macht", "bleibt", "wird"]);
const LEAD = new Set(["das", "dies", "es", "hier", "da", "dort", "wo", "wer", "was", "jetzt", "und", "das hier"]);

type Tok = { w: string; low: string };

function tokens(sentence: string): Tok[] {
  return sentence
    .split(/[\s,;:!?.„“"()]+/)
    .filter(Boolean)
    .map((w) => ({ w, low: w.toLocaleLowerCase("de-DE") }));
}

/**
 * İki cinsiyeti de kullanılan isimler (sözlükte tek cinsiyetle duruyorlar): der/das Virus, der/das
 * Joghurt, der/das Teil, der/das Liter/Meter, der/das Bonbon, die/das Cola, der/das Ketchup …
 */
const DUAL = new Set(["virus", "joghurt", "jogurt", "teil", "liter", "meter", "zentimeter", "kilometer", "bonbon", "cola", "ketchup", "gummi", "radar", "keks", "spray", "dotter", "filter", "pyjama", "mail", "e-mail", "sakko"]);

function fixFor(art: Tok, noun: Tok): string | null {
  const g = G[noun.low];
  if (!g || DUAL.has(noun.low)) return null;
  const a = art.low;
  // "der" + dişil isim Dativ/Genitiv olabilir ("Der Behörde bleibt …"): emin değiliz, susuyoruz.
  if (a === "der" && g === "die") return null;
  let want: string | null = null;
  if (a in DEF) want = g;
  else if (a === "ein" || a === "eine") want = INDEF[g];
  if (!want || want === a) return null;
  const cap = (s: string, like: string) => (like[0] === like[0].toUpperCase() ? s[0].toUpperCase() + s.slice(1) : s);
  return `${art.w} ${noun.w} → ${cap(want, art.w)} ${noun.w} (Artikel)`;
}

/** Öğrencinin son sözündeki kesin artikel hataları için düzeltme gövdeleri (işaretsiz). */
export function articleFixes(said: string): string[] {
  const out: string[] = [];
  for (const sentence of said.split(/(?<=[.!?])\s+/)) {
    const t = tokens(sentence);
    for (let i = 0; i + 2 < t.length; i++) {
      // ... ist (der|die|das|ein|eine) İsim  (öncesinde Das/Hier/Wo … ya da cümle başı)
      if (t[i].low === "ist" && (i === 0 || LEAD.has(t[i - 1].low)) && /^\p{Lu}/u.test(t[i + 2].w)) {
        const f = fixFor(t[i + 1], t[i + 2]);
        if (f) out.push(f);
      }
    }
    // Cümle başı: (Der|Die|Das) İsim tekil-fiil — "Und"la başlıyorsa da
    const s = t[0]?.low === "und" ? 1 : 0;
    if (t.length >= s + 3 && t[s].low in DEF && /^\p{Lu}/u.test(t[s + 1].w) && SG_VERB.has(t[s + 2].low)) {
      const f = fixFor(t[s], t[s + 1]);
      if (f && !out.includes(f)) out.push(f);
    }
  }
  return [...new Set(out)];
}

