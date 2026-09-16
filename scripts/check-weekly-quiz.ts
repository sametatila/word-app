/**
 * Haftalık quiz içerik denetimi — `npm run check:quiz`.
 *
 * NEDEN VAR. Quiz içeriği elle yazılıyor ve birden çok ajan/kişi tarafından
 * seviye seviye üretiliyor. Elle yazılan içerikte kusur kaçınılmaz değil ama
 * SESSİZ: yanlış bir cevap anahtarı, seviyenin üstünde bir sözcük ya da hep
 * aynı konumda duran doğru şık ancak öğrenci şikâyet ettiğinde fark edilir.
 * Bu betik o sınıfı kapıda tutuyor.
 *
 * İKİ AYRI ŞEY ÖLÇÜLÜYOR:
 *   YAPI   — şema, kimlikler, blok sayıları, cevap anahtarı geçerliliği.
 *   ÖLÇÜM  — quiz'in ölçüm aracı olarak bozulmadığı: cevap dağılımı, şık
 *            uzunluğu, seviye sözcük bütçesi, aralıklı tekrar zinciri.
 *
 * İkincisi olmadan birincisi yeterli değil: şemaya uyan ama doğru şıkkı hep
 * başa koyan bir quiz teknik olarak kusursuz, pedagojik olarak değersizdir.
 *
 * SÖZCÜK BÜTÇESİ DİSKTEN. Tohum listeleri (`data/app/words*.json`) zaten
 * repoda; veritabanına bağlanmak CI'da hem yavaş hem kırılgan olurdu.
 */
import { readFileSync } from "node:fs";
import { QUIZ_WEEKS } from "../src/lib/weekly-quiz";
import { QUIZ_PLAN, QUIZ_POOL_MIN, type QuizItem, type QuizWeek } from "../src/lib/weekly-quiz/types";

let errors = 0;
let warnings = 0;
const err = (where: string, msg: string) => {
  errors++;
  console.log(`  ✗ ${where}: ${msg}`);
};
const warn = (where: string, msg: string) => {
  warnings++;
  console.log(`  ! ${where}: ${msg}`);
};

/* ── Sözcük havuzu ────────────────────────────────────────────────────── */

type SeedWord = { de: string; niveau: string; course?: string };
const LEVEL_ORDER = ["A1", "A2", "B1", "B2", "C1"];

/**
 * Tohum dosyasını okur. İki biçim de var: `words.json` bir DİZİ,
 * `words-en.json` satır başına bir nesne (JSONL). Biçimi dosyanın kendisi
 * söylesin diye önce dizi denenip sonra satıra düşülüyor.
 */
function readSeed(file: string): SeedWord[] {
  const raw = readFileSync(file, "utf8").trim();
  try {
    return JSON.parse(raw) as SeedWord[];
  } catch {
    return raw
      .split("\n")
      .filter((l) => l.trim())
      .map((l) => JSON.parse(l) as SeedWord);
  }
}

/** Umlaut ve ß'yi katlar — `fährt` ile `fahren` aynı gövdeye insin. */
const fold = (s: string): string =>
  s.replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ß/g, "ss");

/** Bir kursun o seviyeye KADARKİ (kümülatif) sözcükleri, katlanmış hâlde. */
function vocabUpTo(course: "de" | "en", level: string): Set<string> {
  const file = course === "de" ? "data/app/words.json" : "data/app/words-en.json";
  const rows = readSeed(file);
  const max = LEVEL_ORDER.indexOf(level);
  const out = new Set<string>();
  for (const r of rows) {
    if (LEVEL_ORDER.indexOf(r.niveau) > max) continue;
    const w = fold(r.de.toLocaleLowerCase("de-DE"));
    // Çok sözcüklü girdiler ("ein bisschen", "be called") tek tek de sayılsın.
    for (const part of w.split(/\s+/)) out.add(part);
    out.add(w);
  }
  return out;
}

/**
 * Bütçe dışı sayılmayanlar.
 *
 * İŞLEV SÖZCÜKLERİ ve ÇEKİMLİ BİÇİMLER: sözcük listesi mastar/yalın hâli
 * tutuyor, metin ise çekimli kullanıyor (`heiße`, `kommt`, `lives`). Tam bir
 * çekim çözümleyicisi bu betiğin işi değil — repo başka yerde de aynı sorunu
 * `contains.mjs` ile gevşek çözüyor. Burada gövde eşleşmesi deneniyor
 * (`heiße` → `heiß…` → `heißen`), tutmazsa UYARI veriliyor, hata değil:
 * amaç yazarı bakmaya çağırmak, doğru yazılmış bir cümleyi reddetmek değil.
 */
const ALWAYS_OK = new Set(
  [
    // özel adlar ve yer adları — sözcük listesinde olmazlar, olmaları da gerekmez
    "lena", "tim", "ayşe", "emma", "jack", "deniz", "berlin", "wien", "österreich",
    "türkei", "london", "dublin", "ireland", "england", "turkey", "scotland",
    "deutschland", "englisch", "deutsch", "english",
    /*
      DÜZENSİZ VE İŞLEV BİÇİMLERİ. Sözcük listesi mastar/yalın hâli tutuyor
      (`sein`, `haben`, `der`); metin ise çekimli kullanıyor. Gövde eşleşmesi
      bunları yakalayamıyor çünkü biçim gövdeye benzemiyor (`sein` → `bin`) ya
      da tanımlık çekimi ayrı bir sözcük gibi duruyor (`der` → `den`). Bu liste
      A1'in kapalı sınıfı: uzamaz, çünkü dilin kendisi uzamıyor.
    */
    "bin", "bist", "ist", "sind", "seid", "war", "waren", "warst",
    "habe", "hast", "hat", "habt", "haben", "habst", "hatte",
    "werde", "wirst", "wird", "werden",
    "der", "die", "das", "den", "dem", "des",
    "ein", "eine", "einen", "einem", "einer", "eines",
    "kein", "keine", "keinen", "mein", "meine", "meinen", "meinem", "meiner",
    "dein", "deine", "deinen", "sein", "seine", "ihr", "ihre", "ihren",
    // İngilizce kursunun karşılığı
    "am", "is", "are", "was", "were", "do", "does", "did", "done",
    "a", "an", "the", "my", "your", "his", "her", "their", "our",
    "goes", "has", "says",
  ].map(fold),
);

/**
 * Gövde eşleşmesi: çekimli biçim listedeki bir sözcüğün başlangıcı mı.
 *
 * Katlanmış (umlautsuz) karşılaştırma yapılıyor, yoksa `fährt` ile `fahren`
 * asla eşleşmez. Eşleşmezse UYARI veriliyor, hata değil: amaç yazarı bakmaya
 * çağırmak, doğru yazılmış bir cümleyi reddetmek değil.
 */
function knownWord(raw: string, pool: Set<string>): boolean {
  const token = fold(raw);
  if (pool.has(token) || ALWAYS_OK.has(token)) return true;
  if (/^\d+$/.test(token)) return true;
  if (token.length < 3) return true; // tanımlık, edat, zamir artıkları
  // Çoğul/çekim ekini soyarak birkaç gövde uzunluğu dene.
  for (let cut = 1; cut <= 3 && token.length - cut >= 3; cut++) {
    const stem = token.slice(0, token.length - cut);
    for (const w of pool) if (w.startsWith(stem)) return true;
  }
  return false;
}

function tokens(s: string): string[] {
  return s
    .toLocaleLowerCase("de-DE")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
}

/* ── Marka taraması ───────────────────────────────────────────────────── */

const BRANDS = [
  "goethe", "telc", "ösd", "testdaf", "dsh", "cambridge", "ielts", "toefl",
  "trinity", "pearson", "duolingo", "babbel", "busuu",
];

/* ── Denetim ──────────────────────────────────────────────────────────── */

const seenWeekIds = new Set<string>();
const seenItemIds = new Set<string>();
/** Kurs+seviye → daha önceki haftalarda geçmiş hedefler (aralıklı tekrar için). */
const targetsBefore = new Map<string, Set<string>>();

function checkItem(week: QuizWeek, it: QuizItem, stimIds: Set<string>, pool: Set<string>): void {
  const at = it.id;

  if (!new RegExp(`^${week.id}-[rlgv]\\d+$`).test(it.id)) {
    err(at, `kimlik biçimi hatalı, beklenen "${week.id}-<r|l|g|v><n>"`);
  }
  if (seenItemIds.has(it.id)) err(at, "kimlik tekrar ediyor");
  seenItemIds.add(it.id);

  // Cevap anahtarı
  if (it.options.length < 2) err(at, "en az iki şık gerekli");
  if (it.answer < 0 || it.answer >= it.options.length) err(at, `answer=${it.answer} şık aralığının dışında`);
  const norm = it.options.map((o) => o.trim().toLocaleLowerCase("de-DE"));
  if (new Set(norm).size !== norm.length) err(at, "aynı şık iki kez geçiyor");
  if (it.options.some((o) => !o.trim())) err(at, "boş şık var");

  // Açıklama
  if (!it.why || it.why.trim().length < 20) err(at, "`why` eksik ya da 20 karakterden kısa");
  if (!it.targets.length) err(at, "`targets` boş — aralıklı tekrar zinciri buna bağlı");

  // Uyaran bağı
  if (it.block === "read" || it.block === "listen") {
    if (!it.ref) err(at, `${it.block} maddesi bir uyarana bağlanmalı (\`ref\`)`);
    else if (!stimIds.has(it.ref)) err(at, `\`ref\` bilinmeyen uyaran: ${it.ref}`);
    if (it.byNative) warn(at, "okuma/dinleme maddesinde `byNative` var — metni anlamak anadile göre değişmez");
  }

  // Anadil varyantları
  for (const [native, v] of Object.entries(it.byNative ?? {})) {
    const vat = `${at}/${native}`;
    if (v.answer < 0 || v.answer >= v.options.length) err(vat, `answer=${v.answer} şık aralığının dışında`);
    if (!v.why || v.why.trim().length < 20) err(vat, "`why` eksik ya da 20 karakterden kısa");
    const vn = v.options.map((o) => o.trim().toLocaleLowerCase("de-DE"));
    if (new Set(vn).size !== vn.length) err(vat, "aynı şık iki kez geçiyor");
    if (v.why.trim() === it.why.trim()) {
      warn(vat, "açıklama tabanla birebir aynı — anadile özgü bir şey söylemiyorsa `byNative` gereksiz");
    }
  }

  // Marka
  const blob = [it.stem, ...it.options, it.why].join(" ").toLocaleLowerCase("de-DE");
  for (const b of BRANDS) if (blob.includes(b)) err(at, `marka adı geçiyor: ${b}`);

  // Sözcük bütçesi — hedef dildeki metinde (açıklama Türkçe, taranmıyor)
  for (const t of tokens([it.stem, ...it.options].join(" "))) {
    if (!knownWord(t, pool)) warn(at, `sözcük ${week.level} bütçesinde görünmüyor: "${t}"`);
  }
}

function checkWeek(week: QuizWeek): void {
  console.log(`\n${week.id} · ${week.themeTr}`);

  if (!/^(de|en)-(a1|a2|b1|b2|c1)-w\d{2}$/.test(week.id)) err(week.id, "hafta kimliği biçimi hatalı");
  if (seenWeekIds.has(week.id)) err(week.id, "hafta kimliği tekrar ediyor");
  seenWeekIds.add(week.id);
  if (week.id !== `${week.course}-${week.level.toLowerCase()}-w${String(week.no).padStart(2, "0")}`) {
    err(week.id, "kimlik ile course/level/no alanları uyuşmuyor");
  }
  if (!week.canDo.length) err(week.id, "`canDo` boş");

  const stimIds = new Set(week.stimuli.map((s) => s.id));
  if (stimIds.size !== week.stimuli.length) err(week.id, "uyaran kimliği tekrar ediyor");

  const pool = vocabUpTo(week.course, week.level);

  // Havuz boyu ve blok dağılımı
  if (week.items.length < QUIZ_POOL_MIN) {
    err(week.id, `havuz ${week.items.length} madde — en az ${QUIZ_POOL_MIN} gerekli`);
  }
  for (const [block, need] of Object.entries(QUIZ_PLAN)) {
    const n = week.items.filter((i) => i.block === block).length;
    if (n < need) err(week.id, `${block} bloğunda ${n} madde var, blueprint ${need} istiyor`);
  }
  if (week.items.some((i) => (i.block as string) === "personal")) {
    err(week.id, "`personal` blok yazılmaz — çalışma anında SRS'ten üretiliyor");
  }

  for (const it of week.items) checkItem(week, it, stimIds, pool);

  /* ÖLÇÜM SAĞLIĞI — doğru şık nerede duruyor.
     Hep aynı konumdaysa quiz'i çözmek için dili bilmek gerekmiyor. */
  const pos = new Map<number, number>();
  for (const it of week.items) pos.set(it.answer, (pos.get(it.answer) ?? 0) + 1);
  for (const [p, n] of pos) {
    const pct = Math.round((100 * n) / week.items.length);
    if (pct > 60) err(week.id, `maddelerin %${pct}'inde doğru cevap ${p}. şıkta — tahmin edilebilir`);
    else if (pct > 45) warn(week.id, `doğru cevap ${p}. şıkta yoğunlaşıyor (%${pct})`);
  }

  /* Doğru şık sistematik olarak en uzunsa, uzunluk cevabı ele veriyor. */
  const longest = week.items.filter((it) => {
    const lens = it.options.map((o) => o.length);
    return lens[it.answer] === Math.max(...lens) && new Set(lens).size > 1;
  }).length;
  const longestPct = Math.round((100 * longest) / week.items.length);
  if (longestPct > 70) err(week.id, `maddelerin %${longestPct}'inde doğru şık en uzun şık — uzunluk ipucu veriyor`);
  else if (longestPct > 50) warn(week.id, `doğru şık sık sık en uzun olan (%${longestPct})`);

  /* ARALIKLI TEKRAR — ilk hafta dışında her hafta geriye dokunmalı. */
  const key = `${week.course}-${week.level}`;
  const before = targetsBefore.get(key) ?? new Set<string>();
  if (week.no > 1) {
    const back = week.items.some((it) => it.targets.some((t) => before.has(t)));
    if (!back) err(week.id, "önceki haftaların hiçbir hedefini yeniden yoklamıyor — tekrar zinciri kopuk");
  }
  for (const it of week.items) for (const t of it.targets) before.add(t);
  targetsBefore.set(key, before);
}

/* ── Çalıştır ─────────────────────────────────────────────────────────── */

console.log(`Haftalık quiz içerik denetimi — ${QUIZ_WEEKS.length} paket`);
for (const w of [...QUIZ_WEEKS].sort((a, b) => a.id.localeCompare(b.id))) checkWeek(w);

console.log(`\n${errors === 0 ? "tamam" : "BAŞARISIZ"}: ${errors} hata, ${warnings} uyarı`);
process.exit(errors === 0 ? 0 : 1);
