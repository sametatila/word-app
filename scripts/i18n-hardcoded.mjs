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
  "lib/immersion/content",
  "lib/confusables.ts",
  "lib/cando.ts",
  "lib/first-words.ts",
  "lib/placement-demo.ts",
  "lib/why-rules.ts",
  "lib/assess-prompts.ts",
  "lib/numbers.ts",
  "lib/moderation.ts",
  // Yaygın parola listesi: `şifre`, `türkiye`, `galatasaray` gibi dizeler
  // kullanıcıya GÖSTERİLEN metin değil, REDDEDİLEN parolalar. Aynı sınıf
  // `lib/moderation.ts` ile — süzgecin konusu, arayüzün metni değil.
  "lib/auth/password-policy.ts",
  "app/admin",
  "app/(app)/analytics",
  "app/demo-games",
  "app/demo-feedback",
].map((p) => path.join(SRC, ...p.split("/")));

/**
 * ATLANAN DİZİNİN İÇİNDE OLSA DA TARANAN dosyalar.
 *
 * `lib/lessons` bütünüyle atlanıyor çünkü ders içeriği orada duruyor — ama o
 * dizinde MANTIK da var ve mantığın ürettiği metin kullanıcıya görünüyor.
 * Somut örnek: `offline-roleplay` yapay zekâ kapalıyken mikrofon etiketine
 * "Kalıbı kullan: …", "Anlaşılmadı — ör. …", "Sıradaki kalıp: …" yazıyordu.
 * Üçü de İngilizce ve Almanca arayüzde Türkçe görünüyordu ve tarayıcı hiçbirini
 * göremiyordu: dizin atlanıyor.
 *
 * Liste yalnız MANTIK dosyalarını taşıyor, içerik dosyalarını değil
 * (`content/`, `generated/`, karakterler, replik sabitleri dışarıda kalıyor).
 * Uzarsa kapı güçlenir; kısalması bir kör noktayı geri açmak demektir.
 *
 * ÖLÇÜLDÜ, dosya dosya. Listede yalnız BUGÜN TEMİZ olan mantık dosyaları var
 * (altısı sıfır dizgi veriyor), yani kapı bedava güçleniyor. Kirli olanlar
 * BİLEREK dışarıda ve borçları yazılı - hepsi tek seferde eklenirse taban
 * 173'ten 281'e çıkardı ve kapı anlamını yitirirdi:
 *
 *   modules.ts          46   modül adları/açıklamaları (müfredat içeriği)
 *   module-content.ts   35   bölüm etiketleri + içerik türetme
 *   roleplay.ts         19   modele giden yönerge metni (kullanıcı görmüyor)
 *   native-server.ts     4
 *   log.ts               2
 *   native.ts            2
 *
 * Bunları temizlemek ayrı bir iş: her biri "içerik mi arayüz mü" ayrımı
 * istiyor. Temizlenen dosya bu listeye eklenir.
 */
const FORCE = [
  "lib/lessons/offline-roleplay.ts",
  "lib/lessons/progress.ts",
  "lib/lessons/boss.ts",
  "lib/lessons/module-exam/index.ts",
  "lib/lessons/index.ts",
  "lib/lessons/types.ts",
].map((p) => path.join(SRC, ...p.split("/")));

const TURKISH_LETTERS = /[çğışöüÇĞİŞÖÜ]/;

/**
 * İKİNCİ KURAL — Türkçe'ye özgü harf TAŞIMAYAN Türkçe metin.
 *
 * Üstteki sezgi ölçüldü ve yarısını kaçırıyordu: "tamam", "Kontrol et",
 * "Bitir", "Sorular", "Kural", "Durdur", "Dinle", "Ekle" — hiçbirinde
 * çğışöü yok, dolayısıyla hiçbiri sayılmıyordu. Bir tarama turunda bu
 * yoldan 36 ham metin çıktı; hepsi kullanıcının gördüğü düğme ve etiketti.
 * Mobil tarafta da bir ASCII kuralı var ama sabit bir durak sözcük listesine
 * bakıyor ve boşluk şart koşuyor, yani tek sözcüklük düğmeleri göremiyor.
 *
 * Sinyal SÖZLÜĞÜN KENDİSİ: adayın her sözcüğü Türkçe sözlükte geçiyorsa ve
 * hiçbiri İngilizce/Almanca sözlükte geçmiyorsa o metin çevrilmemiş Türkçedir.
 * Sabit sözcük listesi tutmaya gerek yok — sözlük zaten ürünün Türkçesi.
 *
 * Kod parçaları eleniyor: içinde kod noktalaması olan aday metin değildir
 * (`{r.isMe ?`, `/first-words`, `if (--kalan === 0)` gibi ayrıştırma artıkları).
 */
const CODEY = /[(){}\[\]<>=;\/\\|&$*+"'`~^%@#]/;

/**
 * İkinci kuraldan MUAF dosyalar — hepsinde Türkçe olması DOĞRU:
 *
 *   - `lib/voice-intent.ts` — konuşma tanıma anahtar sözcükleri. Kullanıcının
 *     söylediği Türkçe sözcükler burada aranıyor; çevrilirse tanıma bozulur.
 *   - `lib/social/username.ts` — ayrılmış kullanıcı adları kara listesi.
 *   - `lib/why.ts` — `strength: "hep" | "genelde"` tip değerleri, metin değil.
 *   - `lib/courses.ts` — dil adlarının dile göre haritası; Türkçe satırı Türkçe.
 *   - `lib/server-metrics.ts`, `app/manifest.ts`, `app/sitemap.ts` — komut
 *     adları, kısayol adı ve adresler.
 *   - `components/screen-diag.tsx` — `?diag=1` paneli, bilerek tek dil.
 */
const SKIP_ASCII = [
  "lib/voice-intent.ts",
  "lib/social/username.ts",
  "lib/why.ts",
  "lib/courses.ts",
  "lib/server-metrics.ts",
  "app/manifest.ts",
  "app/sitemap.ts",
  "components/screen-diag.tsx",
].map((p) => path.join(SRC, ...p.split("/")));

/**
 * Sözlükten sözcük kümesi — `"anahtar": "metin"` satırlarını okur.
 *
 * TİRE PARÇALARI ALINMIYOR. Sözlükte dilbilgisi kuralları var ve içlerinde
 * ek/ön ek parçaları geçiyor ("be-/ver-/-ieren ohne ge-"). Bunlar sözcük
 * değil ama düz bölme onları sözcük sanıyordu ve yabancı kümeyi
 * zehirliyordu: "ver" Almanca sözcük sayıldığı için "Tepki ver" ham metin
 * olarak HİÇ görünmüyordu - tarayıcı onu bir yıl boyunca kaçırdı. İki yanında
 * da tire olmayan sözcükler alınıyor.
 */
function dictTokens(files) {
  const set = new Set();
  for (const f of files) {
    if (!fs.existsSync(f)) continue;
    for (const m of fs.readFileSync(f, "utf8").matchAll(/^\s*"[^"]+":\s*"((?:[^"\\]|\\.)*)",?\s*$/gm)) {
      for (const w of m[1].toLocaleLowerCase("tr").match(/(?<![-a-zçğıöşü])[a-zçğıöşü]+(?![-a-zçğıöşü])/g) ?? []) {
        if (w.length > 2) set.add(w);
      }
    }
  }
  return set;
}
const DICTS = (lang) => [path.join(SRC, "i18n", "base", `${lang}.ts`), path.join(SRC, "i18n", "web", `${lang}.ts`)];
const TR_WORDS = dictTokens(DICTS("tr"));
const FOREIGN_WORDS = new Set([...dictTokens(DICTS("en")), ...dictTokens(DICTS("de"))]);

/** Türkçe'ye özgü harf olmadan Türkçe mi? */
function asciiTurkish(text) {
  if (CODEY.test(text)) return false;
  const words = (text.toLocaleLowerCase("tr").match(/[a-zçğıöşü]+/g) ?? []).filter((w) => w.length > 2);
  if (!words.length) return false;
  return words.every((w) => TR_WORDS.has(w) && !FOREIGN_WORDS.has(w));
}
const SEP = "";

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir)) {
    const p = path.join(dir, entry);
    /*
     * Atlanan bir DİZİNE de inilebiliyor: içinde `FORCE` dosyası varsa
     * dizinin kendisi atlanamaz, yoksa liste hiç işlemez (ilk yazımda tam
     * bu oldu - `FORCE` yalnız dosya yolunu karşılaştırıyordu ve dizin
     * daha önce atlandığı için o dosyaya hiç ulaşılmıyordu).
     */
    const forced = FORCE.includes(p) || FORCE.some((f) => f.startsWith(p + path.sep));
    if (!forced && SKIP.some((s) => p === s || p.startsWith(s + path.sep))) continue;
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
    /* JSX TASIYAN SUS PARANTEZI SILINMIYOR. Bu desen `{...}` icini komple
       atiyordu ve tek satirlik kosullu bir JSX ({x ? <span>sen</span> : null})
       tamamen kayboluyordu - govde metni hicbir kurala dusmuyordu (friends
       board'un "sen" rozeti boyle kacmisti). Icinde bir etiket acilisi varsa
       parantez oldugu gibi birakiliyor; asagidaki etiket temizligi zaten
       govdeyi ayirip cikariyor. */
    .replace(/\{(?:[^{}<]|<(?![A-Za-z/]))*\}/g, " ")
    .replace(/<[^<>]*>/g, SEP);
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
  for (const piece of rest.split(SEP)) {
    out.push(STRUCT.test(piece) ? piece : piece.replace(/[^\p{L}\p{N}\s]+/gu, " "));
  }
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
      const asciiSkipped = SKIP_ASCII.some((x) => file === x);
      for (const text of candidates(line)) {
        if (TURKISH_LETTERS.test(text)) (hard[rel] ??= []).push({ line: i + 1, text });
        else if (!asciiSkipped && asciiTurkish(text)) (hard[rel] ??= []).push({ line: i + 1, text });
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
} else if (mode === "--hits") {
  /* Tek dosyanın (ya da yol parçasının) satır satır dökümü - mobil tarafın
     `i18n-scan.js --hits`i ile aynı bayrak. Webde yoktu ve tabandaki bir
     satırın NE olduğunu görmek için betiği okumak gerekiyordu. */
  const needle = process.argv[3] ?? "";
  for (const [f, list] of Object.entries(hard)) {
    if (!f.includes(needle)) continue;
    for (const h of list) console.log(`${f}:${h.line}  ${h.text.slice(0, 120)}`);
  }
} else {
  for (const [f, n] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
    console.log(String(n).padStart(4), f);
    if (mode === "--list") for (const h of hard[f]) console.log(`       ${h.line}: ${h.text.slice(0, 90)}`);
  }
  console.log(`\nKESİN: ${total} dizgi / ${Object.keys(counts).length} dosya`);
}
