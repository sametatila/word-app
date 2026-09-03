#!/usr/bin/env node
/**
 * Çeviri katmanını atlayan ham Türkçe metinleri bulur.
 *
 * Neden gerekli: sözlüklerin (src/i18n/*.ts) anahtar kümesi tam olsa bile,
 * bir dizgi `t()` yerine doğrudan JSX'e yazıldığında çeviri hiç devreye girmiyor.
 * Bu, gözle takip edilemeyecek kadar çok yerde oldu (ilk ölçüm: 61 dosyada 516 dizgi),
 * o yüzden sayı burada tutuluyor ve YALNIZ AŞAĞI inebiliyor.
 *
 * Kullanım:
 *   node scripts/i18n-scan.js            # dosya dosya döküm + toplam
 *   node scripts/i18n-scan.js --baseline # bugünkü sayıları taban olarak yaz
 *   node scripts/i18n-scan.js --check    # tabanın üstüne çıkan dosya varsa hata (CI)
 *
 * Tespit iki katmanlı:
 *   kesin   — Türkçeye özgü harf içeren dizgi/JSX metni (ç ğ ı ş ö ü İ …). Yanlış
 *             pozitifi yok denecek kadar az; taban ve --check bunun üstünde kurulu.
 *   şüpheli — yalnız ASCII ama Türkçe durak sözcüğü taşıyan metin ("Devam et",
 *             "Kayit yok"). İnsan bakması için listelenir, tabana girmez: burada
 *             yanlış pozitif kaçınılmaz ve CI'ı yanlış yere kilitler.
 *
 * Yorum satırları ve blokları taranmaz — kod yorumları Türkçe, kural bu (AGENTS.md).
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "src");
const BASELINE = path.join(__dirname, "i18n-baseline.json");

/** Sözlüklerin kendisi doğal olarak Türkçe. */
const SKIP_DIRS = [path.join(SRC, "i18n")];

const TURKISH_LETTERS = /[çğışöüÇĞİŞÖÜ]/;
/** ASCII yazılmış Türkçe metnin işaretçileri; yalnız uyarı üretir. */
const TURKISH_ASCII = /(?:^|\s)(?:ve|ile|bir|bu|daha|sonra|kadar|gibi|ama|var|yok|devam|tamam|evet|hayir|kayit|giris)(?:\s|$)/i;

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir)) {
    const p = path.join(dir, entry);
    if (SKIP_DIRS.some((d) => p === d || p.startsWith(d + path.sep))) continue;
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.tsx?$/.test(entry)) out.push(p);
  }
  return out;
}

/** Yorumları boşlukla değiştirir (satır numaraları korunsun diye satır sonları kalır). */
function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
    .replace(/^([ \t]*)\/\/.*$/gm, (m) => m.replace(/[^\n]/g, " "));
}

/** Bir satırdaki kullanıcıya görünebilecek metin adayları. */
function candidates(line) {
  const out = [];
  // Dizgi sabitleri: "…", '…', `…`
  const re = /"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'|`([^`]*)`/g;
  for (const m of line.matchAll(re)) out.push(m[1] ?? m[2] ?? m[3] ?? "");
  // JSX metni: >…< (içindeki {ifade} çıkarılarak)
  const bare = line.replace(/\{[^{}]*\}/g, "");
  for (const m of bare.matchAll(/>([^<>"]*)</g)) out.push(m[1]);
  return out.map((s) => s.trim()).filter(Boolean);
}

function scan() {
  const hard = {}; // dosya -> [{line, text}]
  const soft = [];
  for (const file of walk(SRC)) {
    const rel = path.relative(ROOT, file);
    const lines = stripComments(fs.readFileSync(file, "utf8")).split("\n");
    lines.forEach((line, i) => {
      for (const text of candidates(line)) {
        if (TURKISH_LETTERS.test(text)) {
          (hard[rel] ??= []).push({ line: i + 1, text });
        } else if (text.includes(" ") && TURKISH_ASCII.test(text)) {
          soft.push({ file: rel, line: i + 1, text });
        }
      }
    });
  }
  return { hard, soft };
}

function counts(hard) {
  return Object.fromEntries(Object.entries(hard).map(([f, hits]) => [f, hits.length]));
}

const mode = process.argv[2] ?? "";
const { hard, soft } = scan();
const now = counts(hard);
const total = Object.values(now).reduce((a, b) => a + b, 0);

if (mode === "--baseline") {
  fs.writeFileSync(BASELINE, JSON.stringify({ total, files: now }, null, 2) + "\n");
  console.log(`taban yazildi: ${total} dizgi / ${Object.keys(now).length} dosya`);
  process.exit(0);
}

if (mode === "--check") {
  if (!fs.existsSync(BASELINE)) {
    console.error("taban yok; once: node scripts/i18n-scan.js --baseline");
    process.exit(2);
  }
  const base = JSON.parse(fs.readFileSync(BASELINE, "utf8"));
  const worse = Object.entries(now).filter(([f, n]) => n > (base.files[f] ?? 0));
  if (worse.length) {
    console.error("Ceviri katmanini atlayan yeni Turkce dizgiler:");
    for (const [f, n] of worse) {
      console.error(`  ${f}: ${base.files[f] ?? 0} -> ${n}`);
      for (const h of hard[f].slice(0, 5)) console.error(`      ${f}:${h.line}  ${h.text.slice(0, 70)}`);
    }
    console.error(`\nt() kullan ya da taban gercekten dusuyorsa: node scripts/i18n-scan.js --baseline`);
    process.exit(1);
  }
  console.log(`tamam: ${total} dizgi (taban ${base.total})`);
  process.exit(0);
}

const rows = Object.entries(now).sort((a, b) => b[1] - a[1]);
for (const [f, n] of rows) console.log(String(n).padStart(4), f);
console.log(`\nKESIN  : ${total} dizgi / ${rows.length} dosya`);
console.log(`SUPHELI: ${soft.length} ASCII aday (insan baksin)`);
if (process.argv.includes("--soft")) {
  for (const s of soft) console.log(`  ${s.file}:${s.line}  ${s.text.slice(0, 70)}`);
}
