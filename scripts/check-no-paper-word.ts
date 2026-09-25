/**
 * "KÂĞIT" SINAVI TEMSİL ETMEZ — kalıcı kapı (2026-09-25, Samet'in kararı).
 *
 * Deneme sınavları ve sınavlar arayüzde de içerikte de "kâğıt" diye
 * anılmıyor: tr "deneme sınavı" / "sınav", en "mock exam" / "exam",
 * de "Probeprüfung" / "Prüfung". Bu kapı sözcüğün geri sızmasını üç yerde
 * yakalıyor:
 *
 *   1. i18n — web (`src/i18n/base`, `src/i18n/web`) ve mobil (`mobile/src/i18n`)
 *      sözlüklerinin DEĞERLERİ ve ANAHTAR ADLARI, üç dil.
 *   2. Paywall / kilit cümle kuralları — `src/lib/premium` ve mobil karşılığı
 *      (`mobile/src/lib/unlock.ts`, `premium.ts`): dizge sabitleri (yorumlar
 *      sayılmıyor; iç adlar ve eski yapılandırma anahtarının okunması serbest).
 *   3. Deneme sınavı yönerge alanları — `MOCK_PAPERS` içindeki başlık,
 *      yönerge, durum, ipucu, tür ve tema alanları.
 *
 * GERÇEK KÂĞIT SERBEST. İçerik kâğıttan söz edebilir (not kâğıdı, kâğıt para,
 * "kâğıt üstünde" deyimi): onlar aşağıdaki izin listesinde, dosya/sınav ve
 * cümle parçasıyla birlikte. Listeye yazmadan önce cümlenin sınavı değil
 * gerçek bir kâğıdı anlattığından emin olun.
 *
 *   npm run check:no-paper-word
 */
import { readFileSync } from "node:fs";
import { trBase } from "../src/i18n/base/tr";
import { enBase } from "../src/i18n/base/en";
import { deBase } from "../src/i18n/base/de";
import { trWeb } from "../src/i18n/web/tr";
import { enWeb } from "../src/i18n/web/en";
import { deWeb } from "../src/i18n/web/de";
import { tr as trMobile } from "../mobile/src/i18n/tr";
import { en as enMobile } from "../mobile/src/i18n/en";
import { de as deMobile } from "../mobile/src/i18n/de";
import { MOCK_PAPERS } from "../src/lib/mock-exams/source";

/** Sınav anlamında kâğıt — üç dil. `Satz` (cümle) bilerek yok: Almancada asıl anlamı cümle. */
const WORD = /k[âa]ğ[ıi][td]|\bpapers?\b|\bB[oö]gen\b|Prüfungss[aä]tz|Probes[aä]tz/i;
const KEY_WORD = /paper|kagit|kağıt|kâğıt/i;

/**
 * İZİN LİSTESİ — gerçek kâğıt anlamındaki kullanımlar. `where` dosya ya da
 * deneme sınavının kimliği, `text` alandaki cümlenin bir parçası.
 */
const ALLOW: { where: string; text: string; why: string }[] = [
  { where: "mock:*", text: "Not kâğıdı", why: "dinleme görevinin not formu: gerçek bir kâğıt" },
  { where: "mock:de-a1-06 › promptTr", text: "Bir yaprak kâğıda ihtiyacın var", why: "konuşma görevinde istenen nesne" },
  { where: "mock:de-a1-06 › hint", text: "Kâğıt iste, kibarca.", why: "aynı görevin ipucu" },
  { where: "mock:en-a2-04 › prompt", text: "with a box of papers", why: "resim betimleme: kutudaki kâğıtlar" },
  { where: "mock:en-a2-04 › promptTr", text: "kâğıt dolu bir kutuyla", why: "aynı görevin Türkçesi" },
  { where: "mock:en-b1-09 › title", text: "The paper bin", why: "okuma metni: kâğıt çöp kutusu" },
  { where: "mock:en-b1-10 › label", text: "Photograph Boxes and Paper", why: "ilan başlığı: kâğıt ürünleri" },
  { where: "mock:en-b2-07 › situation", text: "puanlama kâğıdından", why: "dinleme: mülakat puanlama formu" },
  { where: "mock:en-c1-07 › prompt", text: "old paper files", why: "yazma görevi: kâğıt arşiv" },
  { where: "mock:en-c1-07 › promptTr", text: "eski kâğıt dosyalarını", why: "aynı görevin Türkçesi" },
];

const hits: string[] = [];
const used = new Set<string>();
function flag(where: string, text: string) {
  const a = ALLOW.find((x) => (x.where === where || (x.where.endsWith("*") && where.startsWith(x.where.slice(0, -1)))) && text.includes(x.text));
  if (a) {
    used.add(`${a.where}|${a.text}`);
    return;
  }
  hits.push(`${where}: ${text.length > 140 ? text.slice(0, 140) + "…" : text}`);
}

/* 1. i18n */
const DICTS: [string, Record<string, string>][] = [
  ["src/i18n/base/tr.ts", trBase],
  ["src/i18n/base/en.ts", enBase],
  ["src/i18n/base/de.ts", deBase],
  ["src/i18n/web/tr.ts", trWeb],
  ["src/i18n/web/en.ts", enWeb],
  ["src/i18n/web/de.ts", deWeb],
  ["mobile/src/i18n/tr.ts", trMobile],
  ["mobile/src/i18n/en.ts", enMobile],
  ["mobile/src/i18n/de.ts", deMobile],
];
let i18nCount = 0;
for (const [file, dict] of DICTS) {
  for (const [key, value] of Object.entries(dict)) {
    i18nCount++;
    if (KEY_WORD.test(key)) flag(`${file} (anahtar)`, key);
    if (WORD.test(value)) flag(`${file} › ${key}`, value);
  }
}

/* 2. Paywall / kilit cümle kuralları: dizge sabitleri */
const RULE_FILES = [
  "src/lib/premium/gates.ts",
  "src/lib/premium/unlock.ts",
  "src/lib/premium/unlock-copy.ts",
  "src/lib/premium/unlock-view.ts",
  "mobile/src/lib/unlock.ts",
  "mobile/src/lib/premium.ts",
];
const stripComments = (s: string) => s.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:"'`\\])\/\/[^\n]*/g, "$1");
const LITERAL = /"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`/g;
let literalCount = 0;
for (const file of RULE_FILES) {
  let src: string;
  try {
    src = readFileSync(file, "utf8");
  } catch {
    hits.push(`${file}: dosya yok (kapının listesi güncellenmeli)`);
    continue;
  }
  for (const lit of stripComments(src).match(LITERAL) ?? []) {
    literalCount++;
    if (WORD.test(lit)) flag(file, lit);
  }
}

/* 3. Deneme sınavı yönerge alanları */
const FIELDS = new Set(["title", "instruction", "instructionTr", "prompt", "promptTr", "situation", "hint", "genreTr", "theme", "themeTr", "label"]);
let fieldCount = 0;
function walk(id: string, node: unknown): void {
  if (Array.isArray(node)) {
    for (const x of node) walk(id, x);
    return;
  }
  if (!node || typeof node !== "object") return;
  for (const [k, v] of Object.entries(node)) {
    if (typeof v === "string") {
      if (!FIELDS.has(k)) continue;
      fieldCount++;
      if (WORD.test(v)) flag(`mock:${id} › ${k}`, v);
    } else walk(id, v);
  }
}
for (const paper of MOCK_PAPERS) walk(paper.id, paper);

const stale = ALLOW.filter((a) => !used.has(`${a.where}|${a.text}`));

console.log(
  `check:no-paper-word — ${i18nCount} i18n değeri, ${literalCount} kural dizgesi, ${MOCK_PAPERS.length} deneme sınavında ${fieldCount} yönerge alanı`,
);
if (stale.length) {
  console.error("\nKULLANILMAYAN İZİN (listeden silin):");
  for (const a of stale) console.error(`  ${a.where} · «${a.text}»`);
}
if (hits.length) {
  console.error('\nSINAV ANLAMINDA "KÂĞIT" (tr kâğıt · en paper · de Bogen/Prüfungssatz):\n');
  for (const h of hits) console.error("  " + h);
  console.error(
    '\nSınav "deneme sınavı"/"sınav" (en "mock exam"/"exam", de "Probeprüfung"/"Prüfung") diye anılır.\n' +
      "Cümle GERÇEK bir kâğıdı anlatıyorsa `ALLOW` listesine yer ve cümle parçasıyla yazın.\n",
  );
}
if (hits.length || stale.length) process.exit(1);
console.log("tamam: sınav hiçbir yerde kâğıt diye anılmıyor");
