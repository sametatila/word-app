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

/**
 * ASCII yazılmış Türkçe için İKİNCİ ve KESİN kural.
 *
 * Üstteki `TURKISH_ASCII` sabit bir durak sözcük listesine bakıyor ve boşluk
 * şart koşuyor; tek sözcüklük düğmeleri göremiyor. Ölçüldü: "Kaydedildi",
 * "SAAT", "tekrar", "yeni", "bitti" bu yüzden yıllardır sayılmıyordu ve
 * hepsi kullanıcının gördüğü yüzeydeydi.
 *
 * Sinyal SÖZLÜĞÜN KENDİSİ: adayın her sözcüğü Türkçe sözlükte geçiyorsa ve
 * hiçbiri İngilizce/Almanca sözlükte geçmiyorsa o metin çevrilmemiştir.
 * Sabit liste tutmaya gerek yok — sözlük zaten ürünün Türkçesi.
 * (Web tarafında aynı kural `scripts/i18n-hardcoded.mjs` içinde.)
 */
const CODEY = /[(){}[\]<>=;/\\|&$*+"'`~^%@#]/;

/**
 * İkinci kuraldan MUAF dosyalar — ikisinde de Türkçe olması DOĞRU:
 *   - `data/firstWords.ts` — öğretilen kelimelerin Türkçe karşılıkları, içeriğin kendisi.
 *   - `lib/courses.ts` — dil adlarının dile göre haritası; Türkçe satırı Türkçe.
 */
const SKIP_ASCII = ["data/firstWords.ts", "lib/courses.ts"].map((p) => path.join(SRC, ...p.split("/")));

/**
 * İÇERİK DOSYALARI — Türkçesi ARAYÜZ METNİ DEĞİL, müfredatın kendisi.
 *
 * `SKIP_ASCII` yalnız ASCII kuralından muaf tutuyor; bu liste kesin sayımdan
 * da muaf. Gerekçe: bu dosyadaki Türkçe çevrilecek bir arayüz dizgesi değil,
 * kursun ne öğrettiğini anlatan veri - "Bürokrasi", "Mutfak ve sofra" gibi
 * modül başlıkları. Sözlüğe taşımak yanlış olurdu: aynı müfredat webde de
 * `lib/lessons/modules.ts` içinde aynı biçimde duruyor ve iki kopya
 * `check:parity` ile karşılaştırılıyor.
 *
 * Liste DAR tutuluyor: yalnız başlığında içerik olduğu yazılı, saf veri
 * dosyaları. Bir dosyaya arayüz metni girme ihtimali varsa buraya yazılmaz.
 *
 * VE HER BİRİNİN BİR KAPISI VAR. Sayımdan çıkarmak, gözden çıkarmak değil:
 * dördünün de web karşılığı `check:parity`de dizge dizge karşılaştırılıyor
 * (bölüm adları aşağıda yazılı). Modül temaları tam bu kapı olmadığı için
 * beş gün ayrışık kalmıştı - dosya başlığında "birebir aynı kalmalı" yazmak
 * drift'i durdurmuyor, ölçüm durduruyor.
 */
const SKIP_CONTENT = [
  "data/moduleThemes.ts", // modül başlıkları (müfredat) — `check:parity` "modul temalari"
  "data/firstWords.ts", //  ısınma kelimeleri + Türkçe karşılıkları — `check:parity` "ilk kelimeler"
  "data/demoPlacement.ts", // demo yerleştirme maddeleri — `check:parity` "demo yerlestirme"
  "lib/numbers.ts", //      sayı sözcükleri — `check:parity` "sayi modulu govdesi"
  "data/example.ts", //     cümle sonu saymayan kısaltmalar — `check:parity` "ornek cumle kurali"
  // REDDEDİLEN parolalar ("şifre", "galatasaray") — kullanıcıya gösterilen metin
  // değil, süzgecin konusu. Ekrandaki uyarılar sözlükte (autherror.password_*).
  // Kapısı: `check:parity` "sabit COMMON" ve "sabit MIN_PASSWORD_LENGTH".
  "lib/passwordPolicy.ts",
  // Umlaut harf tablosu ({ a: "ä", ... }) — arayüz metni değil, biçim kuralı.
  // Kapısı: `check:parity` "umlaut govdesi" (gövde webinkiyle dizge dizge).
  "lib/german.ts",
].map((p) => path.join(SRC, ...p.split("/")));

/**
 * TİRE PARÇALARI SÖZCÜK DEĞİL. Sözlükte dilbilgisi kuralları var ve içlerinde
 * ek/ön ek parçaları geçiyor ("be-/ver-/-ieren ohne ge-"). Düz bölme onları
 * sözcük sanıyor ve yabancı kümeyi zehirliyor: "ver" Almanca sözcük sayıldığı
 * için "Tepki ver" gibi bir metin ham metin olarak HİÇ görünmüyordu (web
 * tarafında ölçüldü, aynı satır aynı parçayı üretiyor). İki yanında da tire
 * olmayan sözcükler alınıyor.
 */
function dictTokens(lang) {
  const f = path.join(SRC, "i18n", `${lang}.ts`);
  const set = new Set();
  if (!fs.existsSync(f)) return set;
  for (const m of fs.readFileSync(f, "utf8").matchAll(/^\s*"[^"]+":\s*"((?:[^"\\]|\\.)*)",?\s*$/gm)) {
    for (const w of m[1].toLocaleLowerCase("tr").match(/(?<![-a-zçğıöşü])[a-zçğıöşü]+(?![-a-zçğıöşü])/g) ?? []) {
      if (w.length > 2) set.add(w);
    }
  }
  return set;
}
const TR_WORDS = dictTokens("tr");
const FOREIGN_WORDS = new Set([...dictTokens("en"), ...dictTokens("de")]);

function asciiTurkish(text) {
  if (CODEY.test(text)) return false;
  const words = (text.toLocaleLowerCase("tr").match(/[a-zçğıöşü]+/g) ?? []).filter((w) => w.length > 2);
  if (!words.length) return false;
  return words.every((w) => TR_WORDS.has(w) && !FOREIGN_WORDS.has(w));
}

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
    // Geriye bakışlı regex sabitleri ÖNCE: gövdelerinde `<` var (`(?<!`, `(?<=`)
    // ve aşağıdaki genel desen `<`'i JSX sanıp bunları atlıyordu. Sonucu:
    // `DE_WORD` (Almanca sözcük listesi: können, müssen, für) çevrilmemiş TÜRKÇE
    // metin olarak sayılıyordu — tarayıcı ö/ü görüp Türkçe sanıyor. `/(?<` ile
    // başlayan bir dilim JSX olamaz, o yüzden burada güvenle elenebiliyor.
    .replace(/\/\(\?<[!=][^\n]*?\/[gimsuyd]*/g, " ")
    // Regex sabitleri (/ç/g, /[A-ZÇĞİÖŞÜ]/) kod, metin değil. Gövdede < ve > YASAK:
    // olmasaydı JSX'teki "/>" ile "</" arası regex sanılıp aradaki metin yutuluyordu
    // (NotifPrime'ın "Hatırlatma = daha uzun seri" satırı böyle kaçmıştı).
    .replace(/\/(?:\\.|\[[^\]]*\]|[^/\n\\<>])+\/[gimsuyd]*/g, " ")
    /* JSX TASIYAN SUS PARANTEZI SILINMIYOR. Bu desen `{...}` icini komple
       atiyordu ve tek satirlik kosullu bir JSX ({x ? <span>sen</span> : null})
       tamamen kayboluyordu - govde metni hicbir kurala dusmuyordu (friends
       board'un "sen" rozeti boyle kacmisti). Icinde bir etiket acilisi varsa
       parantez oldugu gibi birakiliyor; asagidaki etiket temizligi zaten
       govdeyi ayirip cikariyor. */
    .replace(/\{(?:[^{}<]|<(?![A-Za-z/]))*\}/g, " ")  // {ifade}
    .replace(/<[^<>]*>/g, "\u0001"); // etiketler → ayraç
  // JSX GOVDE METNINDE NOKTALAMA METNIN KENDISI, kod degil: {ifade},
  // dizgiler ve etiketler zaten cikarildi; geriye kalan "/", "·", "%" gibi
  // isaretler kullanicinin ekranda gordugu ayraclar. Birakilinca
  // `asciiTurkish` CODEY'e takilip parcayi kod saniyor ve "{a}/{b} ifade"
  // gibi bir satir HICBIR kurala dusmuyordu (CandoScreen seviye ozeti boyle
  // kacmisti; mobil tarayicida ayni kural, bkz. mobile/scripts/i18n-scan.js).
  //
  // Ayrim YAPISAL isaretlere bakiyor: parantez, esittir, noktali virgul gibi
  // bir sey duruyorsa parca koddur ("if (!izin)") ve oldugu gibi birakiliyor.
  // Yalniz metin noktalamasi kalmissa temizleniyor.
  const STRUCT = /[(){}[\]<>=;\\|&$*+"'`~^@#]/;
  for (const piece of rest.split("\u0001")) {
    out.push(STRUCT.test(piece) ? piece : piece.replace(/[^\p{L}\p{N}\s]+/gu, " "));
  }
  // Metot çağrısı taşıyan aday koddur, metin değil. Tırnak İÇEREN bir regex sınıfı
  // (/[.!?…,;:"\'»«]/g) dizgi ayrıştırıcısını kaydırıyor ve geriye ").replace(/ö/g, "
  // gibi kırıntılar "dizgi" olarak kalıyor. Kullanıcı metninde ".replace(" bulunmaz.
  const CODE = /\.\w+\(/;
  return out.map((s) => s.trim()).filter((s) => s && !CODE.test(s));
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
      const asciiSkipped = SKIP_ASCII.some((x) => file === x);
      if (SKIP_CONTENT.some((x) => file === x)) return; // müfredat verisi
      for (const text of candidates(line)) {
        if (TURKISH_LETTERS.test(text)) {
          (hard[rel] ??= []).push({ line: i + 1, text });
        } else if (!asciiSkipped && asciiTurkish(text)) {
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

/**
 * SOZLUKTE OLMAYAN ANAHTAR — `t()` bulamadigini OLDUGU GIBI donduruyor.
 *
 * Web tarafinda bu denetim vardi (`scripts/i18n-check.mjs`), mobilde HIC
 * YOKTU: yanlis yazilan ya da web sozlugunden kopyalanan bir anahtar ekranda
 * ham hâliyle ("plan.weekly_exam") yaziyor ve hicbir sey itiraz etmiyor.
 * Olculdu: dort anahtar boyle duruyordu, ucu bu oturumda web yuzeyi mobile
 * tasinirken girmisti (docs/plan/web-parity.md 11.134).
 *
 * Arama cagri govdesinin TAMAMINA bakiyor: `t(x ? "a.b" : "c.d")` bicimi
 * webde tam olarak bu yuzden kacmisti (11.133).
 */
/*
 * KENDİ `t`si OLAN DOSYA. `lib/native-de.ts` içindeki `t(...)` i18n değil:
 * ders içeriğinin Almanca-Türkçe eşleme tablosunda bir arama ve ikinci
 * argümanı yedek metin. Anahtarları ("vocab.tr", "pattern.tr") sözlükte
 * OLMAMALI. Web tarafındaki eşdeğer denetim aynı dosyayı aynı sebeple muaf
 * tutuyor (`scripts/i18n-check.mjs` YEREL_T).
 */
const YEREL_T = ["lib/native-de.ts"];

function eksikAnahtarlar() {
  const sozluk = new Set();
  const tr = fs.readFileSync(path.join(SRC, "i18n", "tr.ts"), "utf8");
  for (const m of tr.matchAll(/^\s*"([^"]+)":/gm)) sozluk.add(m[1]);
  const out = [];
  for (const file of walk(SRC)) {
    if (file.includes(path.sep + "i18n" + path.sep)) continue;
    if (YEREL_T.some((y) => file.endsWith(y.split("/").join(path.sep)))) continue;
    const src = fs.readFileSync(file, "utf8");
    for (const m of src.matchAll(/\b(?:t|tx|tt)\(([^()\n]*)\)/g)) {
      for (const k of m[1].matchAll(/"([a-z][\w]*(?:\.[\w]+)+)"/g)) {
        if (!sozluk.has(k[1])) out.push({ key: k[1], file: path.relative(ROOT, file) });
      }
    }
  }
  return out;
}

if (mode === "--check") {
  const eksik = eksikAnahtarlar();
  if (eksik.length) {
    console.error("Sozlukte OLMAYAN anahtarlar (ekranda ham hâliyle yazarlar):");
    for (const e of eksik) console.error(`  ${e.key} — ${e.file}`);
    process.exit(1);
  }
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
