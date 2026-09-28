import { setLang } from "../src/lib/i18n";
import { claimLine, exampleOf, glossOf, meaningLine, optionLine, translateSource } from "../src/game/gloss";
import { whyFor } from "../src/game/why";
import type { NativeLang } from "../src/lib/courses";

/*
 * Turları SUNUCUNUN kendi çözücüleriyle kuruyoruz (`lib/session` `makeRound` bunları çağırıyor):
 * istemcinin gösterdiği şey sunucunun gönderdiğiyle aynı kuraldan geçmeli. `require` ile: web tipleri
 * `@/` yollarını çekiyor ve mobil tsconfig onları çözmüyor; çalışma anında Babel dosyayı dönüştürüyor.
 */
type Opt = { text: string; sub: string | null };
type GW = { tr: string; en: string | null; deGloss?: string | null };
type Sentences = { sentenceTr: string | null; sentenceEn: string | null; sentenceDe?: string | null };
const server = require("../../src/lib/option-label") as {
  glossFor: (w: GW, native: NativeLang) => Opt | null;
  exampleFor: (s: Sentences, native: NativeLang) => Opt | null;
  exampleGlossFor: (w: { beispielTr: string | null; beispielEn: string | null; beispielDe?: string | null }, native: NativeLang) => string | null;
  optionLabel: (p: GW & { de: string; artikel: string | null }, direction: "de-tr" | "tr-de", native: NativeLang) => Opt | null;
};
const { exampleFor, exampleGlossFor, glossFor, optionLabel } = server;

/**
 * ÇİFT MATRİSİ — her oyunun anlam/şık/iddia/istem satırı, dört çiftte (tr→de, tr→en, en→de, de→en).
 *
 * NEDEN: hata SESSİZ. Doğru/Yanlış turu sunucunun ANADİLDE kurduğu iddiayı sahte bir kelimeye sarıp
 * `glossOf`tan yeniden geçiriyordu; Türkçe anadilde çalışıyor, en→de ve de→en çiftlerinde iddia BOŞ
 * çıkıyordu (sahibi cihazda gördü). Her satır için üç ölçü: boş değil, doğru dilde, ikinci satır ana
 * satırın tekrarı değil.
 *
 * Kelime biçimleri gerçek kayıtlardan: Almanca kursta `en` dolu, `deGloss` İngilizce kurs içindir;
 * İngilizce kursta `en` null (başlık zaten İngilizce, `scripts/seed-english.ts`), `deGloss` dolu.
 */

type Pair = { native: NativeLang; course: "de" | "en" };
const PAIRS: Pair[] = [
  { native: "tr", course: "de" },
  { native: "tr", course: "en" },
  { native: "en", course: "de" },
  { native: "de", course: "en" },
];

/** Her dilin kendine özgü, öteki dillerde geçmeyen işaretli metinleri. */
const TAG: Record<NativeLang, string> = { tr: "⟨tr⟩", en: "⟨en⟩", de: "⟨de⟩" };

function word(course: "de" | "en", id: number, stem: string) {
  const base = {
    id,
    typ: "Nomen",
    niveau: "A1",
    formen: course === "de" ? "-¨e" : null,
    usage: null,
    isNew: false,
    beispielTr: `${stem} cümlesi ${TAG.tr}`,
    beispielEn: course === "de" ? `${stem} sentence ${TAG.en}` : null,
    beispielDe: course === "en" ? `${stem} Satz ${TAG.de}` : null,
  };
  return course === "de"
    ? { ...base, de: `Haus${id}`, artikel: "das", tr: `ev${id} ${TAG.tr}`, en: `house${id} ${TAG.en}`, deGloss: null, beispiel: `Das Haus${id} ist groß.` }
    : { ...base, de: `house${id}`, artikel: null, tr: `ev${id} ${TAG.tr}`, en: null, deGloss: `Haus${id} ${TAG.de}`, beispiel: `The house${id} is big.` };
}

/** Metin doğru dilde mi: kendi işaretini taşıyor, öteki dillerinkini taşımıyor. */
function inLang(text: string | null | undefined, lang: NativeLang): boolean {
  if (!text) return false;
  return text.includes(TAG[lang]) && (Object.keys(TAG) as NativeLang[]).every((l) => l === lang || !text.includes(TAG[l]));
}

/** İkinci satır varsa: ana satırın tekrarı değil ve İngilizce (ayırt edici). */
function subOk(g: { text: string; sub: string | null }): boolean {
  return g.sub === null || (g.sub !== g.text && g.sub.includes(TAG.en));
}

describe.each(PAIRS)("$native → $course", ({ native, course }) => {
  const w = word(course, 1, "ev");
  const pool = [w, word(course, 2, "araba"), word(course, 3, "kapı"), word(course, 4, "masa")];

  beforeAll(async () => {
    await setLang(native);
  });

  test("anlam çözücüsü sunucuyla aynı (choice/listen doğru şıkkı eşleşiyor)", () => {
    const fromServer = glossFor(w, native);
    expect(fromServer).not.toBeNull();
    expect(glossOf(w)).toEqual(fromServer);
    expect(inLang(glossOf(w).text, native)).toBe(true);
    expect(subOk(glossOf(w))).toBe(true);
  });

  test("choice de-tr: şıklar anadilde, doğru şık seçilebiliyor", () => {
    const options = pool.map((p) => optionLabel(p, "de-tr", native)!);
    for (const o of options) {
      expect(inLang(o.text, native)).toBe(true);
      expect(subOk(o)).toBe(true);
    }
    expect(options.some((o) => o.text === glossOf(w).text)).toBe(true);
  });

  test("choice tr-de: istem anadilde, şıklar hedef dilde", () => {
    expect(inLang(glossOf(w).text, native)).toBe(true);
    const options = pool.map((p) => optionLabel(p, "tr-de", native)!);
    for (const o of options) expect(o.sub).toBeNull();
    expect(options[0].text).toBe(course === "de" ? "das Haus1" : "house1");
  });

  test("truefalse: sunucunun iddiası boş değil ve anadilde (doğru ve yanlış iddia)", () => {
    const trueClaim = glossFor(w, native)!;
    const falseClaim = glossFor(pool[1], native)!;
    for (const claim of [trueClaim, falseClaim]) {
      const line = claimLine({ claim }, w);
      expect(line).not.toBe("");
      expect(line.startsWith(claim.text)).toBe(true);
      expect(inLang(line.split(" · ")[0], native)).toBe(true);
    }
    // Eski turda iddia yok: kelimenin kendi anlamı.
    expect(claimLine({}, w)).toBe(meaningLine(w));
  });

  test("artikel/plural/intro anlam satırı: anadilde, tekrar yok", () => {
    const line = meaningLine(w);
    expect(inLang(line.split(" · ")[0], native)).toBe(true);
    const parts = line.split(" · ");
    expect(new Set(parts).size).toBe(parts.length);
    expect(parts.length).toBe(native === "en" || course === "en" ? 1 : 2);
  });

  test("typing/scramble istemi ve FeedbackFooter anlamı", () => {
    const g = glossOf(w);
    expect(inLang(g.text, native)).toBe(true);
    expect(subOk(g)).toBe(true);
  });

  test("match: sağ sütun anadilde, ikiz yok", () => {
    const rights = pool.map((p) => glossOf(p).text);
    for (const r of rights) expect(inLang(r, native)).toBe(true);
    expect(new Set(rights).size).toBe(rights.length);
  });

  test("free_sentence hedef kelime çipi anadilde", () => {
    for (const p of pool.slice(0, 2)) expect(inLang(glossOf(p).text, native)).toBe(true);
  });

  test("cloze/order: cümle çevirisi anadilde (turun taşıdığı alanlardan)", () => {
    const round = { sentenceTr: w.beispielTr, sentenceEn: w.beispielEn, sentenceDe: w.beispielDe };
    const fromServer = exampleFor(round, native);
    const client = exampleOf(round);
    expect(client).toEqual(fromServer);
    expect(client).not.toBeNull();
    expect(inLang(client!.text, native)).toBe(true);
    expect(subOk(client!)).toBe(true);
  });

  test("translate: çevrilecek cümle anadilde; eski turda yanlış dile düşmüyor", () => {
    const nativeSentence = exampleGlossFor(w, native)!;
    const en = w.beispielEn;
    const sentence = { tr: w.beispielTr, de: w.beispiel, en, native: nativeSentence, nativeSub: native === "en" ? null : en };
    const s = translateSource(sentence);
    expect(inLang(s.text, native)).toBe(true);
    expect(subOk(s)).toBe(true);
    const legacy = translateSource({ tr: w.beispielTr, en });
    if (native === "tr") expect(inLang(legacy.text, "tr")).toBe(true);
    else expect(legacy.text.includes(TAG.tr)).toBe(false);
  });

  test("şık satırı: ana satır + ayırt edici, tekrar yok", () => {
    expect(optionLine({ text: "a", sub: "a" })).toBe("a");
    expect(optionLine({ text: "a", sub: null })).toBe("a");
    expect(optionLine({ text: "a", sub: "b" })).toBe("a · b");
  });

  test("neden-yanlış satırı anlamı anadilde verir", () => {
    const why = whyFor({ type: "meaning", word: w, detail: null });
    expect(why).not.toBeNull();
    expect(why!.text.includes(TAG[native])).toBe(true);
    for (const l of Object.keys(TAG) as NativeLang[]) if (l !== native && l !== "en") expect(why!.text.includes(TAG[l])).toBe(false);
  });
});

/**
 * KAYNAK BEKÇİSİ: yukarıdaki yardımcılar ekranda KULLANILMAZSA matris hiçbir şey ölçmez. Oyun ekranı
 * sunucu şıkkını ya da iddiasını sahte bir kelimeye sarıp çözücüden yeniden geçirmemeli, kelimenin ham
 * alanını (`.tr`/`.en`) anlam diye basmamalı.
 */
test("rounds.tsx: sunucu nesnesi yeniden çözülmüyor, ham alan basılmıyor", () => {
  const fs = require("node:fs") as typeof import("node:fs");
  const path = require("node:path") as typeof import("node:path");
  const src = (fs.readFileSync(path.join(__dirname, "..", "src", "game", "rounds.tsx"), "utf8") as string)
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/\/\/[^\n]*/g, " ");
  expect(src).not.toMatch(/(?:glossOf|meaningLine)\(\s*\{/);
  expect(src).not.toMatch(/\{\s*(?:word|w|x|round\.word)\.(?:tr|en)\s*\}/);
  expect(src).toMatch(/claimLine\(round, word\)/);
  expect(src).toMatch(/translateSource\(s\)/);
});
