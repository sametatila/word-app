/**
 * İngilizce kurs derslerinin ALMANCA karşılığını denetler:
 *   `node data/lessons/prose-de/check.mjs [paket|all]`
 *
 * Ortak kurallar kardeş hatların aynısı — son noktalama, sayı pariteti,
 * karakter kümesi, kanıtın hayatta kalması, uzunluk sapması, mükerrer
 * satır, kapsam. Bunlar dilden bağımsız ve kopyalandıklarında ayrışıyorlar;
 * o ders deneme kâğıdı hattında zaten alındı.
 *
 * BU HATTA ÖZGÜ OLAN, KANIT ÖLÇÜTÜ.
 *
 * Kardeş hatlarda bir açıklığın çevrilmeden durup durmayacağına SÖZCÜK
 * LİSTESİYLE karar veriliyor: Almanca işlev sözcüğü mü taşıyor, büyük
 * harfle başlayan bir adı var mı, ä/ß geçiyor mu. Burada o ölçüt iki
 * yönde birden yanılıyor ve ölçüldü:
 *
 *   yanlış KABUL   «benim ismim Deniz», «Türkiyeliyim», «Ben iyiyim»,
 *                  «-den» — hepsi Türkçe ama büyük harfli bir ad taşıdığı
 *                  için "yabancı" sayılıyor. Kapı bunların Almancada
 *                  AYNEN durmasını isterdi; oysa bunlar tam da çevrilecek
 *                  karşılıklar — Türk öğrenciye "merhaba" ne ise Alman
 *                  öğrenciye "hallo" odur.
 *   yanlış RET     «she's», «has got», «be», «he» — İngilizce ve küçük
 *                  harfli; listede olmadıkları için kanıt sayılmıyorlar.
 *
 * Yanlış kabul burada yanlış retten TEHLİKELİ: satırı Türkçe bırakmayı
 * DAYATIYOR ve o zaman karakter kuralıyla çelişiyor (kalan `ş`
 * çevrilmemiş metin sayılır). İki kural birbiriyle kavga eder.
 *
 * Çözüm tahmini bırakmak: paket satırı dersin bütün İNGİLİZCE yüzeyini
 * yanında taşıyor (`en` alanı — sözlük, kalıp, anlatımın `en` parçaları,
 * beklenen üretim, rol yapma açılışı). Açıklık orada BİREBİR varsa
 * kanıttır; yoksa Türkçe karşılıktır ve çevrilir.
 *
 * ÖLÇÜLDÜ: 892 aday açıklığın 150'si yüzeyde bulunuyor. Kalan 742'nin
 * neredeyse tamamı Türkçe. Yüzeyde bulunmayan ama İngilizce olan birkaç
 * parça da var — «what is», «Do you ...?», «And you?» gibi kırpılmış ya
 * da iskelet biçimler. Onlar ölçüt DIŞINDA bırakıldı, çünkü bu hatta
 * yanlış ret yanlış kabulden ucuz: yazan zaten öğretilen sözcüğü
 * korumak zorunda, kapı yalnız denetlemiyor. Paketler yazıldıkça
 * ölçülüp genişletilecek — deneme kâğıdı hattında da yol buydu.
 *
 * İKİNCİ ÖZGÜ KURAL: `vocab.tr` ve `pattern.tr` birer KARŞILIK, cümle
 * değil. "merhaba" ya da "adını söylerken kullanılır" iki katından uzun
 * bir Almancaya dönüşüyorsa yanlış alana yazılmış demektir.
 *
 * SON NOKTALAMA bu hatta özellikle kritik: anlatım parçaları arka arkaya
 * SESLİ okunuyor ve aralarına İngilizce sözcükler giriyor. Son karakter
 * cümlenin nerede bittiğini söylüyor ve Türkçe cümle İngilizce sözcüğü
 * SARIYOR olabilir. Gerekçenin tamamı `data/lessons/lecture/check.mjs`te.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { extractLessonProse } from "./make.mjs";

const DIR = new URL(".", import.meta.url).pathname;
const ARG = (process.argv[2] || "all").toLowerCase();

const errors = [];
const warnings = [];
const written = new Map();

const end = (t) => {
  const m = String(t).trim().slice(-1);
  return /[.!?:…,;]/.test(m) ? m : "—";
};
const numbers = (t) => [...String(t).matchAll(/(?<!\p{L})\d+/gu)].map((m) => m[0]).sort();
/* Üç nokta BOŞLUK işareti olabiliyor ("Benim adım …"); yanındaki
   noktalama onunla birlikte gidiyor. Gerekçe `data/skills/task/check.ts`te. */
const slots = (t) => t.replace(/[\s:,;]*…[\s:,;]*/g, "");

const flat = (t) =>
  String(t).replace(/[„“”‚‘’'"]/g, "'").replace(/\.\.\./g, "…").replace(/\s+/g, " ").trim();
const lower = (t) => flat(t).toLowerCase();

/** Aday açıklıklar: „…“, «…», "…" ve (…). */
const spans = (t) => {
  const out = [];
  for (const m of String(t).matchAll(/[„"«]([^„"“”«»]{2,})[“"»]/g)) out.push(m[1]);
  for (const m of String(t).matchAll(/\(([^()]{2,})\)/g)) out.push(m[1]);
  return out;
};
/* Yüzeydeki SÖZCÜKLER. Apostroflu biçim tek parça sayılıyor (`i've`),
   çünkü alt-dize aramasında Türkçe «ve» tam oradan kanıt çıkıyordu. */
const WORD = /\p{L}+(?:'\p{L}+)*/gu;

/** Kanıt = dersin İngilizce yüzeyinde birebir geçen açıklık.
 *
 *  TEK SÖZCÜKLÜK açıklık yüzeyde SÖZCÜK olarak geçmeli, alt-dize olarak
 *  değil. Ölçüldü: alt-dize aramasıyla kanıt sayılan 129 açıklığın 5'i
 *  başka bir sözcüğün içinden geliyordu — «ve» `i've` içinde, «ny»
 *  `sunny` içinde, «en» `seven` içinde. Bunlar Türkçe; kanıt sayılınca
 *  kapı onların Almancada AYNEN kalmasını dayatıyor, o da karakter
 *  kuralıyla çelişiyor (docstring'in başındaki kavga). Sözcük ölçütü
 *  124'ünü koruyor: «to», «in», «at», «on», «by», «is», «an», «of» gibi
 *  dersin öğrettiği işlev sözcükleri kanıt olarak kalıyor.
 *
 *  Çok sözcüklü açıklıkta alt-dize yeterli — o boyda rastlantı yok. */
const evidence = (row) => {
  const surface = lower((row.en ?? []).join(" | "));
  const words = new Set(surface.match(WORD) ?? []);
  return spans(row.tr).filter((s) => {
    const l = lower(s);
    if (!surface.includes(l)) return false;
    return /\s/.test(l) ? true : words.has(l);
  });
};
const strip = (de, row) => {
  let out = de;
  for (const s of evidence(row)) out = out.split(s).join(" ");
  return out;
};

/* Türkçe kaldı mı — kanıt açıklıkları çıkarıldıktan sonra kalan
   Türkçeye özgü harf çevrilmemiş metin demektir. ö/ü Türkçede de var,
   yalnız ı/ş/ğ/İ/Ğ/Ş ayırt edici. */
const TURKISH_LETTER = /[ışğİĞŞ]/;

const src = new Map(extractLessonProse().map((r) => [r.kind + "|" + r.tr, r]));

if (existsSync(`${DIR}out`))
  for (const f of readdirSync(`${DIR}out`).filter((x) => x.endsWith(".json")).sort()) {
    const packet = f.replace(/\.json$/, "");
    if (ARG !== "all" && packet !== ARG) continue;
    for (const r of JSON.parse(readFileSync(`${DIR}out/${f}`, "utf8"))) {
      const key = r.kind + "|" + r.tr;
      const H = (m) => errors.push(`  [${packet}] ${JSON.stringify(r.tr.slice(0, 38))} — ${m}`);
      const U = (m) => warnings.push(`  [${packet}] ${JSON.stringify(r.tr.slice(0, 38))} — ${m}`);
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
          if (!/[\n -~ÄÖÜäöüßé·×‚„“”‘’«»–—…→↔€]/.test(ch))
            H(`beklenmedik karakter: «${ch}» (U+${ch.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")})`);

        for (const s of evidence(row))
          if (!flat(de).includes(flat(s))) H(`ders kanıtı düşmüş: «${s.slice(0, 34)}»`);

        if (flat(de) === flat(r.tr) && TURKISH_LETTER.test(r.tr)) H("karşılık Türkçenin aynısı");

        /* Karşılık cümle değil: iki katından uzun bir sözlük ya da kalıp
           notu yanlış alana yazılmış demektir. */
        if ((row.kind === "vocab.tr" || row.kind === "pattern.tr") && de.length > r.tr.length * 2 + 10)
          H(`karşılık cümleye dönmüş (${r.tr.length} → ${de.length})`);

        if (de.length > r.tr.length * 2 + 20 || de.length * 2 + 20 < r.tr.length)
          U(`uzunluk çok sapıyor (${r.tr.length} → ${de.length})`);
      }
      written.set(key, de);
    }
  }

let coverage = null;
if (ARG === "all") {
  const rows = extractLessonProse();
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
if (errors.length) process.exit(1);
