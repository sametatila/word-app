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
import { CANDO } from "../src/lib/cando";
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
    /*
      DÜZENSİZ GEÇMİŞ ZAMAN. A2'nin teması geçmiş zaman anlatımı, yani bu
      biçimler içerikte yoğun geçiyor ve hiçbiri gövde eşleşmesiyle
      bulunamıyor (`go` → `went`). Sözcük listesi mastarı tutuyor; öğrenci
      için de öğrenilecek şey zaten mastarın kendisi.
    */
    "went", "saw", "bought", "made", "got", "had", "took", "came", "gave",
    "found", "left", "met", "read", "wrote", "spoke", "ate", "drank", "slept",
    "rode", "paid", "sat", "stood", "knew", "thought", "brought", "began",
    // kısaltmalar — apostrof korunuyor, biçimin tamamı burada
    "don't", "doesn't", "didn't", "hasn't", "haven't", "isn't", "aren't",
    "wasn't", "weren't", "can't", "won't", "i'm", "it's", "that's", "there's",
    "don’t", "doesn’t", "didn’t", "hasn’t", "haven’t", "isn’t", "aren’t",
    "woke", "swam", "rang", "said", "told", "ran", "won", "lost", "sent", "put",
    // Almanca çekim artıkları: zamirler ve gövdesi değişen düzensiz biçimler
    "mir", "dir", "ihm", "ihnen", "uns", "euch", "mich", "dich", "sich",
    "vergisst", "nimmt", "gibt", "sieht", "liest", "spricht", "trifft", "fährt",
    "läuft", "schläft", "isst", "hält", "trägt", "wäscht",
    // sayı sözcükleri: listede yoklar ama içerikte kaçınılmazlar
    "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
    "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn",
    // para birimi ve saat kalıbı — öğrenilecek sözcük değil
    "euro", "euros", "pounds", "pound", "o'clock", "o’clock",
    /*
      SORU KÖKÜNÜN KENDİ SÖZCÜKLERİ. "Which sentence is correct?" gibi yönerge
      cümleleri öğrenciye sorulan DİL değil, sorunun çerçevesi. Seviye bütçesine
      girmeleri gerekmiyor; arayüz dilinde okunuyorlar.
    */
    "sentence", "correct", "which", "welcher", "satz", "richtig",
    "person", "wem", "wen", "hatten", "elf", "zwölf",
    // modal ve düzensiz gövdeler + kaynaşmış edatlar (von dem → vom)
    "kann", "kannst", "könnt", "konnte", "tut", "tust", "ging", "gingen",
    "muss", "musst", "müsst", "will", "willst", "wollt", "soll", "sollst",
    "darf", "darfst", "mag", "magst", "weiß", "weißt",
    "vom", "zum", "zur", "beim", "im", "ins", "ans", "aufs",
  ].map(fold),
);

/** `I've`, `we'll` gibi özne+yardımcı kısaltmaları — gövdesi zaten listede. */
const CONTRACTION = /^(i|you|he|she|it|we|they)['’](m|s|re|ve|ll|d)$/i;

/**
 * Gövde eşleşmesi: çekimli biçim listedeki bir sözcüğün başlangıcı mı.
 *
 * Katlanmış (umlautsuz) karşılaştırma yapılıyor, yoksa `fährt` ile `fahren`
 * asla eşleşmez. Eşleşmezse UYARI veriliyor, hata değil: amaç yazarı bakmaya
 * çağırmak, doğru yazılmış bir cümleyi reddetmek değil.
 */
function knownWord(raw: string, pool: Set<string>): boolean {
  const token = fold(raw.toLocaleLowerCase("de-DE"));
  if (pool.has(token) || ALWAYS_OK.has(token)) return true;
  if (CONTRACTION.test(raw)) return true;
  if (/^\d+$/.test(token)) return true;
  if (token.length < 3) return true; // tanımlık, edat, zamir artıkları

  /*
    ÇEKİM SOYMA. Sözcük listesi mastarı/yalın hâli tutuyor, metin çekimli
    kullanıyor. Üç aile ayrı ayrı soyuluyor:
      · Almanca ortaç: `gemacht` → `mach…`, `genommen` → `nomm…`
      · üstünlük/sıfat eki: `billigsten` → `billig`
      · İngilizce `-ing`: `going` → `go`, `getting` → `get` (ünsüz ikizlenmesi)
    Hepsi GÖVDE eşleşmesine düşüyor; tam bir çözümleyici bu betiğin işi değil
    ve gerekmiyor da — amaç yazarı bakmaya çağırmak.
  */
  const cands = new Set<string>([token]);
  const ge = token.replace(/^ge/, "").replace(/(t|en)$/, "");
  if (token.startsWith("ge") && ge.length >= 3) cands.add(ge);
  /* Ayrılabilir fiilin ortacında `ge` ÖNEKTEN SONRA geliyor:
     `aufstehen` → `aufgestanden`, `ankommen` → `angekommen`. */
  const sep = token.match(/^(an|auf|ab|ein|aus|mit|vor|zu|nach|weg|her|hin)ge(.+?)(t|en)$/);
  if (sep) {
    cands.add(sep[1] + sep[2]);
    cands.add(sep[2]);
  }
  const sup = token.replace(/(sten|ste|eren|er|es|em|en|e)$/, "");
  if (sup.length >= 3) cands.add(sup);
  if (token.endsWith("ing")) {
    const ing = token.slice(0, -3);
    if (ing.length >= 2) {
      cands.add(ing);
      // `getting` → `gett` → `get`: sondaki ikiz ünsüz teke iniyor.
      if (ing.length >= 3 && ing.at(-1) === ing.at(-2)) cands.add(ing.slice(0, -1));
      cands.add(`${ing}e`); // `making` → `make`
    }
  }

  for (const c of cands) {
    if (pool.has(c)) return true;
    for (let cut = 0; cut <= 3 && c.length - cut >= 3; cut++) {
      const stem = c.slice(0, c.length - cut);
      for (const w of pool) if (w.startsWith(stem)) return true;
    }
  }
  return false;
}

/**
 * Metni sözcüklere ayırır — KESME İŞARETİNİ KORUYARAK.
 *
 * `don't` apostrofta bölünürse geriye `don` kalıyor ve o hiçbir listede yok:
 * kontrol her kısaltmada yanlış alarm veriyordu. Kesme işareti sözcüğün parçası
 * sayılıyor, kısaltmalar da listede.
 *
 * Büyük harf bilgisi KORUNUYOR çünkü özel adı ayırt eden tek ipucu o
 * (bkz. `knownWord`).
 */
function tokens(s: string): string[] {
  return s
    .replace(/[^\p{L}\p{N}'’\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * Bir metin kümesindeki bütçe dışı sözcükler.
 *
 * ÖZEL AD SORUNU İKİ DİLDE AYRI ÇÖZÜLÜYOR ve bunun sebebi yazım kuralı:
 *
 *  - İNGİLİZCEDE büyük harf güvenilir bir işaret: büyük harfli bir sözcük özel
 *    addır (Omar, Edinburgh, January, Spanish) ve öğrenilecek bir sözcük
 *    değildir — atlanıyor. Tek istisna `I`. Cümle başı ayrıcalığı YOK, çünkü
 *    şıklar cümle değil parça ("Jan's", "By bus") ve orada ilk sözcük de özel
 *    ad olabiliyor. Takas: cümle başındaki seviye üstü bir sözcük kaçabilir;
 *    karşılığında yazar her yeni ad için betiği düzenlemek zorunda kalmıyor.
 *  - ALMANCADA bütün isimler büyük harfle yazılıyor, yani aynı işaret yok.
 *    Orada özel adlar `ALWAYS_OK` listesinde tutuluyor; liste yavaş büyüyor
 *    çünkü içerikteki ad sayısı az. Bu bilinçli bir takas: Almancada seviye
 *    üstü bir ismi kaçırmamak için biraz elle bakım.
 *
 * Aynı sözcük bir maddede iki kez geçse bir kez uyarılıyor.
 */
function unknownWords(texts: string[], pool: Set<string>, course: "de" | "en", allowed: Set<string>): string[] {
  const out = new Set<string>();
  for (const text of texts) {
    // Cümle başı bilgisi gerekiyor: nokta/ünlem/soru sonrası ilk sözcük.
    for (const sentence of text.split(/[.!?]+/)) {
      for (const raw of tokens(sentence)) {
        const capitalized = raw[0] !== raw[0].toLocaleLowerCase("de-DE");
        if (course === "en" && capitalized && raw !== "I") continue; // özel ad
        const lower = raw.toLocaleLowerCase("de-DE");
        if (allowed.has(lower)) continue; // haftanın kendi kişi adları
        if (!knownWord(raw, pool)) out.add(lower);
      }
    }
  }
  return [...out];
}

/* ── Marka taraması ───────────────────────────────────────────────────── */

/** Bkz. `checkItem` — iki doğru şıklı maddenin izi. */
const HEDGES = [
  "yanlış değil", "en doğal", "kurulabilir ama", "mümkün ama", "olabilir ama",
  "teknik olarak", "dilbilgisel olarak yanlış", "da doğru", "de doğru",
  "da olur", "de olur",
];

const BRANDS = [
  "goethe", "telc", "ösd", "testdaf", "dsh", "cambridge", "ielts", "toefl",
  "trinity", "pearson", "duolingo", "babbel", "busuu",
];

/* ── Denetim ──────────────────────────────────────────────────────────── */

const CANDO_IDS = new Set(CANDO.map((c) => c.id));
const seenWeekIds = new Set<string>();
const seenItemIds = new Set<string>();
/** Kurs+seviye → daha önceki haftalarda geçmiş hedefler (aralıklı tekrar için). */
const targetsBefore = new Map<string, Set<string>>();

function checkItem(week: QuizWeek, it: QuizItem, stimIds: Set<string>, pool: Set<string>, allowed: Set<string>): void {
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

  /*
    KAÇAMAKLI AÇIKLAMA — iki doğru şıklı maddenin en güvenilir izi.
    Yazar bir çeldiricinin aslında doğru olduğunu fark edince bunu açıklamada
    savunmaya çalışıyor ("yanlış değil ama", "en doğal"). İki şıkkı da
    savunulabilen bir madde ölçüm yapmaz.

    UYARI, hata değil: aynı ifadeler bir çeldiricinin NEDEN yanlış olduğunu
    anlatırken de kullanılıyor. Ölçüldü (2026-09-16, 20 paket): yedi vurgunun
    ikisi gerçek kusurdu, beşi meşru. Karar insanın.
  */
  for (const [who, text] of [["taban", it.why], ...Object.entries(it.byNative ?? {}).map(([k, v]) => [k, v.why])] as [string, string][]) {
    const hit = HEDGES.find((h) => text.toLocaleLowerCase("tr").includes(h));
    if (hit) warn(`${at}/${who}`, `kaçamaklı açıklama ("${hit}") — şıklardan ikisi birden doğru olabilir mi?`);
  }

  /*
    SÖZCÜK BÜTÇESİ — açıklama Türkçe olduğu için taranmıyor.

    DİLBİLGİSİ MADDELERİNDE ŞIKLAR TARANMIYOR. O bloğun çeldiricileri bilerek
    BOZUK biçimler (`habst`, `aufgestehen`, `is live`) — öğrencinin üreteceği
    yanlışı temsil ediyorlar. Kelime listesine karşı denetlemek, maddenin
    çalışmasını sağlayan şeyi kusur saymak olurdu. Kök cümle yine taranıyor.
  */
  const scan = it.block === "grammar" ? [it.stem] : [it.stem, ...it.options];
  for (const t of unknownWords(scan, pool, week.course, allowed)) {
    warn(at, `sözcük ${week.level} bütçesinde görünmüyor: "${t}"`);
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
  /* Can-do kimlikleri UYDURULAMAZ. `lib/cando` kimlikleri kalıcı sözleşme;
     olmayan bir kimlik sessizce geçerse haftanın neyi ölçtüğü yalan olur. */
  for (const id of week.canDo) {
    if (!CANDO_IDS.has(id)) err(week.id, `bilinmeyen can-do kimliği: ${id}`);
    else if (!id.startsWith(`${week.level}.`)) warn(week.id, `can-do başka seviyeden: ${id}`);
  }

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

  /*
    KİŞİ ADLARI HAFTANIN KENDİSİNDEN. Almancada bütün isimler büyük harfle
    yazıldığı için büyük harf özel adı ayırt etmiyor (bkz. `unknownWords`).
    Ama adlar zaten içerikte BİLDİRİLİYOR: dinleme parçasının `speaker`
    alanları. Oradan toplanınca yazar her yeni ad için betiği düzenlemek
    zorunda kalmıyor ve liste kendi kendini güncel tutuyor.
  */
  const allowed = new Set<string>();
  for (const st of week.stimuli) {
    if (st.kind !== "audio") continue;
    for (const seg of st.segments) {
      if (seg.speaker) allowed.add(seg.speaker.toLocaleLowerCase("de-DE"));
    }
  }

  for (const it of week.items) checkItem(week, it, stimIds, pool, allowed);

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
  /* Doğru şık en uzunla BERABERSE uzunluk hiçbir ipucu vermiyor — yalnız
     tek başına en uzun olduğunda sayılıyor. İlk yazımda beraberlikler de
     sayılıyordu ve ölçüt gerçekte olmayan bir kusuru bildiriyordu. */
  const longest = week.items.filter((it) => {
    const lens = it.options.map((o) => o.length);
    const max = Math.max(...lens);
    return lens[it.answer] === max && lens.filter((l) => l === max).length === 1;
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
