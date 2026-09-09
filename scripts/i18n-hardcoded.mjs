/**
 * Ham (çevrilmemiş) arayüz metni tarayıcısı — web tarafı.
 *
 * NEDEN VAR: `npm run i18n:check` sözlükleri karşılaştırıyor — üç dilin anahtar
 * kümesi, yer tutucuları ve kodda çağrılan anahtarların varlığı. Ama sözlüğe
 * HİÇ GİRMEMİŞ bir metni göremiyor. Ölçüldüğünde bu boşlukta gerçek şeyler
 * çıktı: doğrulama e-postası Türkçe sabitti, Patika'nın "Dil bilgisi / Tekrar /
 * Kontrol Noktası" satırları sunucuda Türkçe üretiliyordu, AI kapalıyken
 * gösterilen geri bildirim Türkçe geliyordu. Üçü de İngilizce arayüzde Türkçe
 * görünüyordu ve hiçbir denetim bunu söylemiyordu.
 *
 * Mobil tarafta aynı iş `mobile/scripts/i18n-scan.js` ile zaten yapılıyor ve
 * bir TABAN tutuluyor. Bu betik onun web karşılığı: sayı yalnız aşağı inebilir.
 *
 * Kullanım:
 *   node scripts/i18n-hardcoded.mjs             # dosya dosya döküm
 *   node scripts/i18n-hardcoded.mjs --list      # satır satır
 *   node scripts/i18n-hardcoded.mjs --baseline  # bugünkü sayıları taban yaz
 *   node scripts/i18n-hardcoded.mjs --check     # taban aşılırsa hata (CI)
 *
 * Sezgi: bir dizgide ya da JSX gövdesinde Türkçe'ye özgü harf varsa (çğışöü)
 * o metin çevrilmemiştir — tanımlayıcılar ve kod İngilizce (AGENTS.md).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "src");
const BASELINE = path.join(ROOT, "scripts", "i18n-hardcoded-baseline.json");

/**
 * TARANMAYANLAR — üç ayrı sebep, üçü de "burada Türkçe olması DOĞRU":
 *
 *   1. Sözlüklerin kendisi (src/i18n) ve hukuki metinlerin dil dosyaları
 *      (src/content, app/privacy, app/terms): her dil kendi dosyasında.
 *   2. Öğrenme içeriği ve veri: dersler, beceri/deneme sınavı içerikleri,
 *      dilbilgisi tabloları, kelime listeleri. Bunlar ürünün kendisi.
 *   3. İç araçlar: yönetici panosu ve dönüşüm hunisi — tek kullanıcılı,
 *      ADMIN_EMAILS kapısının arkasında, bilerek tek dil.
 */
const SKIP = [
  "i18n",
  "content",
  "app/privacy",
  "app/terms",
  // Dosya ya da DİZİN olabilir: hukuki metinler bir kez tek dosyaydı, sonra
  // `lib/legal/` dizinine bölündü. Yol öneki eşleşmesi ikisini de kapsıyor.
  "lib/legal",
  "components/legal-shell.tsx",
  "lib/lessons",
  "lib/skills/content",
  "lib/mock-exams",
  "lib/cheatsheet",
  "lib/immersion/content",
  "lib/confusables.ts",
  "lib/cando.ts",
  "lib/first-words.ts",
  "lib/why-rules.ts",
  "lib/assess-prompts.ts",
  "lib/german-numbers.ts",
  "lib/moderation.ts",
  "app/admin",
  "app/(app)/analytics",
  "app/demo-games",
  "app/demo-feedback",
].map((p) => path.join(SRC, ...p.split("/")));

const TURKISH_LETTERS = /[çğışöüÇĞİŞÖÜ]/;
const SEP = "";

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir)) {
    const p = path.join(dir, entry);
    if (SKIP.some((s) => p === s || p.startsWith(s + path.sep))) continue;
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.tsx?$/.test(entry)) out.push(p);
  }
  return out;
}

/** Yorumları boşlukla değiştirir; satır numaraları korunsun diye satır sonları kalır. */
function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
    .replace(/^([ \t]*)\/\/.*$/gm, (m) => m.replace(/[^\n]/g, " "));
}

/** Satır sonu yorumunu keser — tırnak durumunu izleyerek (URL'ler bölünmesin). */
function stripLineComment(line) {
  let quote = null;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (quote) {
      if (c === "\\") i++;
      else if (c === quote) quote = null;
    } else if (c === '"' || c === "'" || c === "`") {
      quote = c;
    } else if (c === "/" && line[i + 1] === "/") {
      return line.slice(0, i);
    }
  }
  return line;
}

/** Bir satırdaki kullanıcıya görünebilecek metin adayları (dizgiler + JSX gövdesi). */
function candidates(raw) {
  const line = stripLineComment(raw);
  const out = [];
  const strings = /"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'|`([^`]*)`/g;
  for (const m of line.matchAll(strings)) out.push(m[1] ?? m[2] ?? m[3] ?? "");
  const rest = line
    .replace(strings, '""')
    .replace(/\/(?:\\.|\[[^\]]*\]|[^/\n\\<>])+\/[gimsuyd]*/g, " ")
    .replace(/\{[^{}]*\}/g, " ")
    .replace(/<[^<>]*>/g, SEP);
  for (const piece of rest.split(SEP)) out.push(piece);
  const CODE = /\.\w+\(/;
  return out.map((s) => s.trim()).filter((s) => s && !CODE.test(s));
}

function scan() {
  const hard = {};
  for (const file of walk(SRC)) {
    const rel = path.relative(ROOT, file);
    const lines = stripComments(fs.readFileSync(file, "utf8")).split("\n");
    let inTemplate = false;
    lines.forEach((line, i) => {
      const ticks = (line.match(/(?<!\\)`/g) ?? []).length;
      const wasInside = inTemplate;
      if (ticks % 2 === 1) inTemplate = !inTemplate;
      if (wasInside) return;
      for (const text of candidates(line)) {
        if (TURKISH_LETTERS.test(text)) (hard[rel] ??= []).push({ line: i + 1, text });
      }
    });
  }
  return hard;
}

const hard = scan();
const counts = Object.fromEntries(Object.entries(hard).map(([f, hits]) => [f, hits.length]));
const total = Object.values(counts).reduce((a, b) => a + b, 0);
const mode = process.argv[2] ?? "";

if (mode === "--baseline") {
  fs.writeFileSync(BASELINE, JSON.stringify(counts, null, 2) + "\n");
  console.log(`taban yazıldı: ${total} dizgi / ${Object.keys(counts).length} dosya`);
} else if (mode === "--check") {
  if (!fs.existsSync(BASELINE)) {
    console.error("taban yok; önce: node scripts/i18n-hardcoded.mjs --baseline");
    process.exit(1);
  }
  const base = JSON.parse(fs.readFileSync(BASELINE, "utf8"));
  const over = Object.entries(counts).filter(([f, n]) => n > (base[f] ?? 0));
  if (over.length) {
    console.error("ham (çevrilmemiş) metin ARTMIŞ:\n");
    for (const [f, n] of over) {
      console.error(`  ${f}: ${base[f] ?? 0} → ${n}`);
      for (const h of hard[f]) console.error(`      ${h.line}: ${h.text.slice(0, 80)}`);
    }
    console.error("\n`t()` kullan; taban gerçekten düştüyse: node scripts/i18n-hardcoded.mjs --baseline");
    process.exit(1);
  }
  const baseTotal = Object.values(base).reduce((a, b) => a + b, 0);
  console.log(`ham metin: ${total} dizgi (taban ${baseTotal})`);
} else {
  for (const [f, n] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
    console.log(String(n).padStart(4), f);
    if (mode === "--list") for (const h of hard[f]) console.log(`       ${h.line}: ${h.text.slice(0, 90)}`);
  }
  console.log(`\nKESİN: ${total} dizgi / ${Object.keys(counts).length} dosya`);
}
