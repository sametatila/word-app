/**
 * Haftalık quiz metinlerinin ANA DİL karşılığını denetler:
 *   `… data/weekly-quiz/prose/check.ts [paket|all] [--de]`
 *
 *   (bayraksız)  Almanca kursun quizleri → `out/`     yazılan dil İNGİLİZCE  (en→de)
 *   --de         İngilizce kursun quizleri → `out-de/` yazılan dil ALMANCA   (de→en)
 *
 * Kardeşi `data/mock-exams/prose/check.ts`; ortak kurallar aynı: kapsam
 * (eksik, fazla, mükerrer), boş karşılık, son noktalama, sayı paritesi,
 * karakter kümesi, çevrilmemiş Türkçe, uzunluk sapması, İngiliz yazımı.
 *
 * KANIT BURADA ÇOĞUNLUKLA TERS TIRNAKTA. 839 açıklamanın 638'i hedef dili
 * `sein`, `der/die/das`, `whom` gibi ters tırnakla alıntılıyor; açıklık
 * Türkçe değilse karşılıkta BİREBİR durmak zorunda — öğrenci onu soruda
 * arayacak. Çift tırnak ve parantez içindeki açıklıklar ise yalnız quizin
 * HEDEF DİL YÜZEYİNDE (uyaran, kök, şıklar) birebir geçiyorsa kanıt
 * sayılıyor: tahmin eden bir ölçüt ("büyük harfli sözcük var") Türkçe
 * parantezleri de yakalıyordu (kardeş hatlarda dört kez ölçüldü).
 *
 * Bu hatta ÖZGÜ üç kural:
 *
 * - **Yasak sözcükler** (ürün dili): lesson/Lektion, role-play/Rollenspiel,
 *   paper/Bogen (maskotun eski adını genel `check:no-erdi` yakalıyor). Yalnız YAZANIN seçtiği metinde aranıyor; kanıt
 *   açıklıkları (öğrenilen dilin kendisi) yargılanmıyor.
 * - **Almanca taraf "du" ile konuşur.** Cümle ortasında `Sie`/`Ihnen`/`Ihr…`
 *   resmî hitap demektir.
 * - **`genreTr` bir ETİKET.** Karşılığı cümleye dönmemeli.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { extractQuiz, type QuizRow } from "./make.js";
import { QUIZ_WEEKS } from "@/lib/weekly-quiz";
import { britishSpelling } from "../../conversations/spelling.mjs";

const DIR = new URL(".", import.meta.url).pathname;
const args = process.argv.slice(2).filter((a) => a !== "--de");
const SIDE: "en" | "de" = process.argv.includes("--de") ? "de" : "en";
/** Okunan kurs — yazılan dilin KARŞITI. */
const COURSE: "de" | "en" = SIDE === "de" ? "en" : "de";
const OUT = SIDE === "de" ? "out-de" : "out";
const LANG = SIDE === "de" ? "Almancası" : "İngilizcesi";
const ARG = (args[0] || "all").toLowerCase();

const errors: string[] = [];
const warnings: string[] = [];
const written = new Map<string, string>();

const end = (t: string): string => {
  const m = String(t).trim().slice(-1);
  return /[.!?:…,;]/.test(m) ? m : "—";
};
const numbers = (t: string): string[] => [...String(t).matchAll(/(?<!\p{L})\d+/gu)].map((m) => m[0]).sort();

const TR_WORDS =
  /(?<![\p{L}'’])(?:bir|ve|ile|için|değil|demek|var|yok|olur|gibi|daha|çok|ama|yani|kadar|sonra|önce|yerine|burada|cevap|soru|metin|cümle|sözcük|kelime|fiil|isim|özne|nesne|çoğul|tekil|edat|zamir|mi|mı|mu|mü|neden|göre|olarak)(?!\p{L})/iu;
const TR_SUFFIX = /(?<=[\p{L}\d`"“])['’](?:de|da|te|ta|den|dan|ten|tan|ye|ya|yi|yı|yu|yü|nin|nın|nun|nün|in|ın|un|ün|le|la|yle|yla|dir|dır|e|a|i|ı|u|ü)(?!\p{L})/iu;
const turkish = (t: string): boolean => /[ışğİĞŞ]/.test(t) || TR_WORDS.test(t) || TR_SUFFIX.test(t);

const flat = (t: string): string => String(t).replace(/[„“”‚‘’'"]/g, "'").replace(/\s+/g, " ").trim();

/* HEDEF DİL YÜZEYİ, haftaya göre: uyaranlar, kökler, bütün şıklar. */
const surface = new Map<string, string>();
for (const w of QUIZ_WEEKS.filter((x) => x.course === COURSE)) {
  const parts: string[] = [w.theme];
  for (const s of w.stimuli) {
    parts.push(s.genre);
    if (s.kind === "text") parts.push(s.title ?? "", s.body);
    else for (const g of s.segments) parts.push(g.speaker ?? "", g.text);
  }
  for (const it of w.items) {
    parts.push(it.stem, ...it.options);
    for (const v of Object.values(it.byNative ?? {})) if (v) parts.push(...v.options);
  }
  surface.set(w.id, flat(parts.join(" \n ")));
}
const weekOf = (ctx: string): string => ctx.split(/[\s]/)[0].split("-").slice(0, 3).join("-");
const surfaceOf = (r: QuizRow): string => r.ctx.map((c) => surface.get(weekOf(c)) ?? "").join(" \n ");

/** Karşılıkta birebir durması gereken açıklıklar. */
const evidence = (r: QuizRow): string[] => {
  const out: string[] = [];
  for (const m of r.tr.matchAll(/`([^`]+)`/g)) if (!turkish(m[1])) out.push(m[1]);
  const surf = surfaceOf(r);
  for (const m of r.tr.matchAll(/["«„]([^"«»„“]{2,})["»“]|\(([^()]{2,})\)/g)) {
    const s = (m[1] ?? m[2]).trim();
    if (!turkish(s) && surf.includes(flat(s))) out.push(s);
  }
  return out;
};
/** Kanıt açıklıkları ve yüzeyde geçen sözcükler (özel adlar) çıkarılmış hâl: YAZANIN SEÇTİĞİ metin. */
const chosen = (en: string, r: QuizRow): string => {
  let out = en;
  for (const span of evidence(r)) out = out.split(span).join(" ");
  const surf = new Set(surfaceOf(r).split(/[^\p{L}]+/u));
  return out
    .split(/([^\p{L}]+)/u)
    .map((w) => (/[ışğİĞŞçÇ]/.test(w) && surf.has(w) ? " " : w))
    .join("");
};

const BANNED: Record<"en" | "de", RegExp> = {
  en: /(?<!\p{L})(?:lessons?|role-?plays?|papers?)(?!\p{L})/iu,
  de: /(?<!\p{L})(?:Lektion(?:en)?|Rollenspiel(?:e|en)?|Bogen|Bögen)(?!\p{L})/u,
};
/* Cümle ortasında büyük harfli `Sie`/`Ihnen`/`Ihr…` resmî hitaptır. */
const FORMAL = /(?<![.!?:]\s|^|["„“»«(]\s?)(?:Sie|Ihnen|Ihre?[mnrs]?)(?!\p{L})/u;

const src = new Map(extractQuiz(COURSE).map((r) => [r.kind + "|" + r.tr, r]));

if (existsSync(`${DIR}${OUT}`))
  for (const f of readdirSync(`${DIR}${OUT}`).filter((x) => x.endsWith(".json")).sort()) {
    const packet = f.replace(/\.json$/, "");
    if (ARG !== "all" && packet !== ARG) continue;
    for (const r of JSON.parse(readFileSync(`${DIR}${OUT}/${f}`, "utf8")) as {
      tr: string;
      kind: string;
      en?: string;
      de?: string;
    }[]) {
      const key = r.kind + "|" + r.tr;
      const H = (m: string) => errors.push(`  [${packet}] ${JSON.stringify(r.tr.slice(0, 40))} — ${m}`);
      const U = (m: string) => warnings.push(`  [${packet}] ${JSON.stringify(r.tr.slice(0, 40))} — ${m}`);
      if (written.has(key)) H("aynı dize iki pakette");
      const row = src.get(key);
      if (!row) H("pakete ait değil (kaynak değişmiş olabilir: make.ts yeniden koşturulmalı)");
      const en = String((SIDE === "de" ? (r.de ?? r.en) : r.en) ?? "").trim();
      if (!en) H("karşılık boş");
      else if (row) {
        if (end(r.tr) !== end(en)) H(`son noktalama uyuşmuyor: «${end(r.tr)}» → «${end(en)}»`);
        const a = numbers(r.tr).join(","),
          b = numbers(en).join(",");
        if (a !== b) H(`sayılar uyuşmuyor: «${a}» → «${b}»`);
        for (const span of evidence(row))
          if (!flat(en).includes(flat(span))) H(`kanıt düşmüş: «${span.slice(0, 40)}»`);
        if ((en.match(/`/g)?.length ?? 0) % 2) H("ters tırnak tek sayıda");

        const own = chosen(en, row);
        for (const ch of own)
          if (!/[\n -~ÄÖÜäöüßéèáàâêôçñ²·×‚„“”‘’«»–—…→↔€§]/.test(ch))
            H(`beklenmedik karakter: «${ch}» (U+${ch.codePointAt(0)?.toString(16).toUpperCase().padStart(4, "0")})`);
        if (TR_WORDS.test(own) || TR_SUFFIX.test(own)) H(`çevrilmemiş Türkçe: «${(own.match(TR_WORDS) ?? own.match(TR_SUFFIX))?.[0]}»`);
        if (flat(en) === flat(r.tr) && turkish(r.tr)) H("karşılık Türkçenin aynısı");
        const banned = own.match(BANNED[SIDE]);
        if (banned) H(`yasak sözcük: «${banned[0]}»`);
        if (SIDE === "de") {
          const formal = own.match(FORMAL);
          if (formal) H(`resmî hitap: «${formal[0]}» (Almanca taraf "du" ile konuşur)`);
        }
        if (row.kind === "genreTr" && (en.length > r.tr.length * 2 + 10 || /[.!?]$/.test(en)))
          H(`tür etiketi cümleye dönmüş (${r.tr.length} → ${en.length})`);
        if (en.length > r.tr.length * 2 + 20 || en.length * 2 + 20 < r.tr.length)
          U(`uzunluk çok sapıyor (${r.tr.length} → ${en.length})`);
        if (SIDE === "en") for (const h of britishSpelling(own)) U(`İngiliz yazımı ${h}`);
      }
      written.set(key, en);
    }
  }

let coverage: { rows: number; missing: number } | null = null;
if (ARG === "all") {
  const rows = extractQuiz(COURSE);
  const missing = rows.filter((r) => !written.has(r.kind + "|" + r.tr));
  coverage = { rows: rows.length, missing: missing.length };
  if (missing.length)
    errors.push(`  [kapsam] ${missing.length} dizenin ${LANG} yok (ilki: ${JSON.stringify(missing[0].tr.slice(0, 50))})`);
}

if (errors.length) {
  console.log(`\nHATA (${errors.length}):`);
  console.log(errors.slice(0, 60).join("\n"));
  if (errors.length > 60) console.log(`  … ${errors.length - 60} tane daha`);
}
if (warnings.length) {
  console.log(`\nuyarı (${warnings.length}):`);
  console.log(warnings.slice(0, 30).join("\n"));
}
console.log(
  `\nözet: ${written.size} dize · ${errors.length} hata · ${warnings.length} uyarı` +
    (coverage ? `\nkapsam: ${coverage.rows - coverage.missing}/${coverage.rows}` : ""),
);
if (errors.length) process.exit(1);
