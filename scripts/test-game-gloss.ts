import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import type { NativeLang } from "@/lib/courses";
import { exampleFor, exampleGlossFor, glossFor, optionLabel, translateSourceFor } from "@/lib/option-label";
import { whyFor } from "@/lib/why";

/**
 * OYUN ANLAMLARI, ÇİFT MATRİSİ — veritabanı istemez. Mobil karşılığı `mobile/__tests__/gameGloss.test.ts`.
 *
 * Dört çift (tr→de, tr→en, en→de, de→en) için her oyunun ekrana bastığı anlam/şık/iddia/istem satırı:
 * boş değil, anadilde, ikinci satır ana satırın tekrarı değil. Turlar sunucunun çözücüleriyle kuruluyor
 * (`lib/session` `makeRound`), ekranın okuduğu yol da aynı çözücüler (`components/games/types`
 * `meaningOf`/`meaningSubOf` = `glossFor`).
 *
 * Bulunan hatalar (2026-09-28): yazma ve harf dizme istemi ikinci satırı `word.en`den basıyordu (en→de'de
 * ana satırın aynısı iki kez); cümle kur çipi `t.tr` (en→de ve de→en'de Türkçe); yeni kelime kartının
 * örnek çevirisi Türkçe + İngilizce herkese; "neden yanlış" karşılığı eksik kelimede Türkçeye düşüyordu.
 * Kaynak bekçisi (sonda) ham alanın yeniden basılmasını yakalıyor.
 */
let fails = 0;
const check = (name: string, ok: boolean, detail = "") => {
  console.log(`  ${ok ? "✓" : "✗"} ${name}${ok || !detail ? "" : ` — ${detail}`}`);
  if (!ok) fails++;
};

const TAG: Record<NativeLang, string> = { tr: "⟨tr⟩", en: "⟨en⟩", de: "⟨de⟩" };
const LANGS = Object.keys(TAG) as NativeLang[];
const inLang = (text: string | null | undefined, lang: NativeLang) =>
  Boolean(text) && text!.includes(TAG[lang]) && LANGS.every((l) => l === lang || !text!.includes(TAG[l]));
const subOk = (g: { text: string; sub: string | null }) => g.sub === null || (g.sub !== g.text && g.sub.includes(TAG.en));

/** Gerçek kayıt biçimi: Almanca kursta `en` dolu; İngilizce kursta `en` null, `deGloss` dolu. */
function word(course: "de" | "en", id: number) {
  const base = {
    beispielTr: `cümle${id} ${TAG.tr}`,
    beispielEn: course === "de" ? `sentence${id} ${TAG.en}` : null,
    beispielDe: course === "en" ? `Satz${id} ${TAG.de}` : null,
  };
  return course === "de"
    ? { ...base, de: `Haus${id}`, artikel: "das" as string | null, tr: `ev${id} ${TAG.tr}`, en: `house${id} ${TAG.en}` as string | null, deGloss: null as string | null, beispiel: `Das Haus${id} ist groß.` }
    : { ...base, de: `house${id}`, artikel: null, tr: `ev${id} ${TAG.tr}`, en: null, deGloss: `Haus${id} ${TAG.de}`, beispiel: `The house${id} is big.` };
}

const PAIRS: { native: NativeLang; course: "de" | "en" }[] = [
  { native: "tr", course: "de" },
  { native: "tr", course: "en" },
  { native: "en", course: "de" },
  { native: "de", course: "en" },
];

for (const { native, course } of PAIRS) {
  console.log(`\n${native} → ${course}`);
  const pool = [1, 2, 3, 4].map((i) => word(course, i));
  const w = pool[0];
  const g = glossFor(w, native);

  // choice (de-tr) / listen: şıklar anadilde ve doğru şık ekranın cevabıyla (`meaningOf`) eşleşiyor.
  const opts = pool.map((p) => optionLabel(p, "de-tr", native));
  check("choice/listen şıkları anadilde", opts.every((o) => o && inLang(o.text, native) && subOk(o)));
  check("choice/listen doğru şık seçilebilir", opts.some((o) => o?.text === g?.text));
  // choice (tr-de): istem anadilde, şıklar hedef dilde ve ikinci satırsız.
  const toTarget = pool.map((p) => optionLabel(p, "tr-de", native));
  check("choice tr-de: istem anadilde, şık hedef dilde", inLang(g?.text, native) && toTarget.every((o) => o?.sub === null));
  // truefalse: iddia sunucunun `glossFor`u — doğru da yanlış da dolu ve anadilde.
  const claims = [glossFor(w, native), glossFor(pool[1], native)];
  check("truefalse iddiası dolu ve anadilde", claims.every((c) => c && inLang(c.text, native) && subOk(c)));
  // intro/artikel/plural/typing/scramble/match/free_sentence/FeedbackFooter/özet: `meaningOf` + `meaningSubOf`.
  check("anlam satırı (intro, typing, scramble, match, cümle kur, özet) anadilde", pool.every((p) => inLang(glossFor(p, native)?.text, native)));
  check("ikinci satır ana satırın tekrarı değil", Boolean(g) && subOk(g!));
  check("ikinci satır yalnız Almanca kursta, Türkçe anadilde", (g?.sub != null) === (native === "tr" && course === "de"));
  // cloze/order/intro örneği: cümle çevirisi anadilde.
  const ex = exampleFor({ sentenceTr: w.beispielTr, sentenceEn: w.beispielEn, sentenceDe: w.beispielDe }, native);
  check("cloze/order/intro cümle çevirisi anadilde", Boolean(ex) && inLang(ex!.text, native) && subOk(ex!));
  // translate: çevrilecek cümle anadilde; eski turda (native yok) yanlış dile düşmüyor.
  const nativeSentence = exampleGlossFor(w, native)!;
  const s = translateSourceFor({ tr: w.beispielTr, en: w.beispielEn, native: nativeSentence, nativeSub: native === "en" ? null : w.beispielEn }, native);
  check("translate kaynağı anadilde", inLang(s.text, native) && subOk(s));
  const legacy = translateSourceFor({ tr: w.beispielTr, en: w.beispielEn }, native);
  check("translate eski tur: Türkçeye yalnız Türkçe anadilde", native === "tr" ? inLang(legacy.text, "tr") : !legacy.text.includes(TAG.tr));
  // why: "neden yanlış" satırındaki anlam anadilde; karşılık eksikse Türkçeye düşmüyor.
  const why = whyFor({ type: "meaning", word: w, detail: null }, native);
  check("neden-yanlış anlamı anadilde", why.text.includes(TAG[native]));
  const bare = { ...w, en: null, deGloss: null };
  const whyBare = whyFor({ type: "listening", word: bare, detail: null }, native);
  check("neden-yanlış karşılık eksikken Türkçeye düşmüyor", native === "tr" || !whyBare.text.includes(TAG.tr));
}

/**
 * KAYNAK BEKÇİSİ: oyun ekranı kelimenin ham alanını (`word.tr`, `word.en`, `t.tr`) ANLAM diye basmamalı;
 * anlam `meaningOf`/`meaningSubOf`/`exampleFor`dan gelir. Prop atamaları (`tr={item.tr}`) serbest: orada
 * alan zaten çözülmüş nesnenin alanı.
 */
console.log("\nKaynak bekçisi: oyun ekranları");
const dir = join(process.cwd(), "src", "components", "games");
for (const f of readdirSync(dir).filter((x) => x.endsWith(".tsx"))) {
  const src = readFileSync(join(dir, f), "utf8").replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
  const raw = src.match(/(?<!=)\{\s*[\w?.]+\.(?:tr|en|beispielTr|beispielEn)\s*\}/g) ?? [];
  const rewrap = src.match(/glossFor\(\s*\{\s*tr:/g) ?? [];
  check(`${f}: ham anlam alanı basılmıyor`, raw.length + rewrap.length === 0, [...raw, ...rewrap].join(" "));
}

console.log(fails === 0 ? `\ntamam: hepsi geçti` : `\nKALDI: ${fails}`);
process.exit(fails === 0 ? 0 : 1);
