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

/**
 * Satır sonu yorumunu keser — tırnak durumunu izleyerek.
 *
 * Kaba bir `/\/\/.*$/` iki yönden de yanlış: URL taşıyan bir dizgiyi ortadan
 * böler, ve Türkçe yorumdaki kesme işareti ("upload'dan ÖNCE") sahte bir dizgi
 * açtığı için yorum metni dizgi sanılıp sayılır. Karakter yürüyüşü ikisini de çözüyor.
 */
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

/**
 * Bir satırdaki kullanıcıya görünebilecek metin adayları.
 *
 * İki geçiş: önce dizgi sabitleri, sonra ARTAKALAN. Artakalanı ayrıca aramak şart,
 * çünkü JSX gövde metni kendi satırında durabiliyor ve ">…<" gibi tek satırlık bir
 * desene hiç uymuyor — `MicDisclosure`ın açıklama paragrafı bu yüzden gözden
 * kaçmıştı. Dizgiler, {ifadeler} ve etiketler çıkarıldıktan sonra geriye Türkçe
 * bir şey kalıyorsa o, çevrilmemiş JSX metnidir (tanımlayıcılar İngilizce, AGENTS.md).
 */
function candidates(raw) {
  const line = stripLineComment(raw);
  const out = [];
  const strings = /"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'|`([^`]*)`/g;
  for (const m of line.matchAll(strings)) out.push(m[1] ?? m[2] ?? m[3] ?? "");
  const rest = line
    .replace(strings, '""')       // dizgiler zaten sayıldı
    .replace(/\/(?:\\.|\[[^\]]*\]|[^/\n\\])+\/[gimsuyd]*/g, " ") // regex sabitleri: /ç/g, /[A-ZÇĞİÖŞÜ]/ kod, metin değil
    .replace(/\{[^{}]*\}/g, " ")  // {ifade}
    .replace(/<[^<>]*>/g, "\u0001"); // etiketler → ayraç
  for (const piece of rest.split("\u0001")) out.push(piece);
  return out.map((s) => s.trim()).filter(Boolean);
}

function scan() {
  const hard = {}; // dosya -> [{line, text}]
  const soft = [];
  for (const file of walk(SRC)) {
    const rel = path.relative(ROOT, file);
    const lines = stripComments(fs.readFileSync(file, "utf8")).split("\n");
    // Çok satırlı şablon dizgisinin içi taranmıyor: oralarda gömülü JS (ttsBridge'in
    // WebView'e enjekte ettiği SFX kodu) ve onun Türkçe yorumları var — metin değil.
    let inTemplate = false;
    lines.forEach((line, i) => {
      const ticks = (line.match(/(?<!\\)`/g) ?? []).length;
      const wasInside = inTemplate;
      if (ticks % 2 === 1) inTemplate = !inTemplate;
      if (wasInside) return;
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

// --hits <parca>: tek dosyanın (ya da yol parçasının) satır satır dökümü — dalga
// çalışırken "bu dosyada ne kaldı" sorusunun cevabı.
const hitsArg = process.argv.indexOf("--hits");
if (hitsArg !== -1) {
  const needle = process.argv[hitsArg + 1] ?? "";
  for (const [f, list] of Object.entries(hard)) {
    if (!f.includes(needle)) continue;
    for (const h of list) console.log(`${f}:${h.line}  ${h.text}`);
  }
  process.exit(0);
}

const rows = Object.entries(now).sort((a, b) => b[1] - a[1]);
for (const [f, n] of rows) console.log(String(n).padStart(4), f);
console.log(`\nKESIN  : ${total} dizgi / ${rows.length} dosya`);
console.log(`SUPHELI: ${soft.length} ASCII aday (insan baksin)`);
if (process.argv.includes("--soft")) {
  for (const s of soft) console.log(`  ${s.file}:${s.line}  ${s.text.slice(0, 70)}`);
}
