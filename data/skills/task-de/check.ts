/**
 * İngilizce kursun görev metinlerinin ALMANCA karşılığını denetler:
 *   `npx tsx --tsconfig scripts/tsconfig.e2e.json data/skills/task-de/check.ts [paket|all]`
 *
 * Ortak kurallar kardeş hatların aynısı: son noktalama, sayı pariteti,
 * karakter kümesi, kanıtın hayatta kalması, uzunluk sapması, mükerrer
 * satır, kapsam.
 *
 * BU HATTA ÖZGÜ ÜÇ KURAL — üçü de kardeşinden aynadan yansıyor, yalnız
 * diller yer değiştiriyor:
 *
 * - **İngilizce kanıt birebir durur.** Satırların bir kısmı „…“ ya da
 *   parantez içinde öğretilen dili taşıyor: "Adını yazdın mı? (My name
 *   is …)". Öğrenci o kalıbı metinde arayacak; çevrilirse arama boşa
 *   çıkar. Ölçüt tahmine değil satırın kendi yüzeyine dayanıyor: `de`
 *   alanı satırın ilgili olduğu İNGİLİZCE cümleyi taşıyor (alan adı kardeş
 *   hattan geliyor, içeriği kursun hedef dili belirliyor) ve açıklık orada
 *   birebir varsa kanıttır.
 *
 *   YÜZEYE `q` GİRMİYOR ve bu ilk pakette ölçüldü. `q` üst bağlam —
 *   çoğu zaman TÜRKÇE bir başlık ("Geçmiş için have + üçüncü hâl",
 *   "„var“ demek: there is / there are"). Yüzeye katılınca oradaki Türkçe
 *   parçalar kanıt sayılıyordu ve kapı onların Almancada AYNEN kalmasını
 *   dayatıyordu — yani karakter kuralıyla kavga ediyordu. Yanlış kabul
 *   burada yanlış retten tehlikeli: satırı Türkçe bırakmayı zorluyor.
 *
 * - **Söyleyiş ipucu ÇEVRİLMEZ, YENİDEN YAZILIR.** `drill.hint` ve
 *   `drill.fix` İngilizce sesleri TÜRKÇE okunuşla yazıyor. Almanca okuyan
 *   biri onları okuyamaz; Almanca ses değerleriyle yeniden yazılmaları
 *   gerekir. Ayrı bir kurala gerek yok — karakter kümesi zaten yakalıyor:
 *   kalan bir `ı` ya da `ş` satırın kopyalandığını söylüyor.
 *
 * - **Cevap ele verilmez.** `build.tr` kurulacak İNGİLİZCE cümlenin
 *   ANLAMIDIR; Almancası o cümleyi içeremez, yoksa öğrenci kurmadan okur.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { taskRows } from "./make.js";
import type { TaskRow } from "../task/make.js";

const DIR = new URL(".", import.meta.url).pathname;
const ARG = (process.argv[2] || "all").toLowerCase();

const errors: string[] = [];
const warnings: string[] = [];
const written = new Map<string, string>();

const end = (t: string): string => {
  const m = String(t).trim().slice(-1);
  return /[.!?:…,;]/.test(m) ? m : "—";
};
const numbers = (t: string): string[] =>
  [...String(t).matchAll(/(?<!\p{L})\d+/gu)].map((m) => m[0]).sort();
/* Üç nokta bu hatta NOKTALAMA DEĞİL, BOŞLUK İŞARETİ ve yeri DİLE bağlı:
   Türkçe fiili sona attığı için boşluk ortada kalıyor, Almanca çerçeveyi
   başka kurduğu için başka yere düşüyor. Yanına yapışık noktalama da
   onunla gidiyor — gerekçenin tamamı `data/skills/task/check.ts`te. */
const slots = (t: string): string => t.replace(/[\s:,;]*…[\s:,;]*/g, "");

const flat = (t: string): string =>
  String(t).replace(/[„“”‚‘’'"]/g, "'").replace(/\.\.\./g, "…").replace(/\s+/g, " ").trim();
const lower = (t: string): string => flat(t).toLowerCase();

const spans = (t: string): string[] => {
  const out: string[] = [];
  for (const m of String(t).matchAll(/[„"«]([^„"“”«»]{2,})[“"»]/g)) out.push(m[1]);
  for (const m of String(t).matchAll(/\(([^()]{2,})\)/g)) out.push(m[1]);
  return out;
};
const WORD = /\p{L}+(?:'\p{L}+)*/gu;

/** Kanıt = satırın İngilizce yüzeyinde birebir geçen açıklık. Tek sözcüklük
 *  açıklık yüzeyde SÖZCÜK olarak geçmeli; alt-dize araması «ve»yi `I've`
 *  içinden kanıt sayardı ve kapı Türkçe bir parçanın Almancada aynen
 *  kalmasını dayatırdı. */
const evidence = (row: TaskRow): string[] => {
  const surface = lower(row.de ?? "");
  const words = new Set(surface.match(WORD) ?? []);
  return spans(row.tr).filter((s) => {
    const l = lower(s);
    if (!surface.includes(l)) return false;
    return /\s/.test(l) ? true : words.has(l);
  });
};

const CHARSET = /[\n -~ÄÖÜäöüßé·×‚„“”‘’«»–—…→↔€]/;

/** Yüzeyde SÖZCÜK olarak geçen özel adlar — küme dışı harf taşısalar da
 *  yerinde kalmak zorundalar ("Ayla Yıldız" formda birebir aranıyor). */
const surfaceNames = (de: string, row: TaskRow): string[] => {
  const words = new Set(lower(row.de ?? "").match(WORD) ?? []);
  return (de.match(WORD) ?? []).filter(
    (w) => [...w].some((ch) => !CHARSET.test(ch)) && words.has(lower(w)),
  );
};

const strip = (de: string, row: TaskRow): string => {
  let out = de;
  for (const s of evidence(row)) out = out.split(s).join(" ");
  for (const s of surfaceNames(out, row)) out = out.split(s).join(" ");
  return out;
};

const TURKISH_LETTER = /[ışğİĞŞ]/;

const src = new Map(taskRows().map((r) => [r.kind + "|" + r.tr, r]));

if (existsSync(`${DIR}out`))
  for (const f of readdirSync(`${DIR}out`).filter((x) => x.endsWith(".json")).sort()) {
    const packet = f.replace(/\.json$/, "");
    if (ARG !== "all" && packet !== ARG) continue;
    for (const r of JSON.parse(readFileSync(`${DIR}out/${f}`, "utf8")) as {
      tr: string;
      kind: string;
      de?: string;
    }[]) {
      const key = r.kind + "|" + r.tr;
      const H = (m: string) => errors.push(`  [${packet}] ${JSON.stringify(r.tr.slice(0, 38))} — ${m}`);
      const U = (m: string) => warnings.push(`  [${packet}] ${JSON.stringify(r.tr.slice(0, 38))} — ${m}`);
      if (written.has(key)) H("aynı dize iki pakette");
      const row = src.get(key);
      if (!row) H("pakete ait değil");
      const de = String(r.de ?? "").trim();
      if (!de) H("karşılık boş");
      else if (row) {
        const [eTr, eDe] = r.tr.includes("…") ? [slots(r.tr), slots(de)] : [r.tr, de];
        if (end(eTr) !== end(eDe)) H(`son noktalama uyuşmuyor: «${end(eTr)}» → «${end(eDe)}»`);
        const a = numbers(r.tr).join(","), b = numbers(de).join(",");
        if (a !== b) H(`sayılar uyuşmuyor: «${a}» → «${b}»`);

        for (const ch of strip(de, row))
          if (!CHARSET.test(ch))
            H(
              `beklenmedik karakter: «${ch}» (U+${ch.codePointAt(0)?.toString(16).toUpperCase().padStart(4, "0")})`,
            );

        for (const s of evidence(row))
          if (!flat(de).includes(flat(s))) H(`İngilizce kanıt düşmüş: «${s.slice(0, 34)}»`);

        if (flat(de) === flat(r.tr) && TURKISH_LETTER.test(r.tr)) H("karşılık Türkçenin aynısı");

        /* CEVAP ELE VERİLMEZ. `build.tr` kurulacak cümlenin ANLAMI; kurulacak
           cümlenin kendisi karşılıkta geçerse öğrenci kurmadan okur. Ölçüt
           tam eşleşme değil ALT-DİZE, çünkü cümle karşılığın içine gömülü
           de olabilir. */
        if (row.kind === "build.tr" && row.de && flat(de).toLowerCase().includes(lower(row.de)))
          H(`cevap ele veriliyor: «${row.de.slice(0, 34)}»`);

        if (de.length > r.tr.length * 2 + 20 || de.length * 2 + 20 < r.tr.length)
          U(`uzunluk çok sapıyor (${r.tr.length} → ${de.length})`);
      }
      written.set(key, de);
    }
  }

let coverage: { rows: number; missing: number } | null = null;
if (ARG === "all") {
  const rows = taskRows();
  const missing = rows.filter((r) => !written.has(r.kind + "|" + r.tr)).length;
  coverage = { rows: rows.length, missing };
  if (missing) errors.push(`  [kapsam] ${missing} dizenin Almancası yok`);
}

if (errors.length) {
  console.log(`\nHATA (${errors.length}):`);
  console.log(errors.slice(0, 40).join("\n"));
  if (errors.length > 40) console.log(`  … ${errors.length - 40} tane daha`);
}
if (warnings.length) {
  console.log(`\nuyarı (${warnings.length}):`);
  console.log(warnings.slice(0, 20).join("\n"));
}
console.log(
  `\nözet: ${written.size} dize · ${errors.length} hata · ${warnings.length} uyarı` +
    (coverage ? `\nkapsam: ${coverage.rows - coverage.missing}/${coverage.rows}` : ""),
);
process.exit(errors.length ? 1 : 0);
