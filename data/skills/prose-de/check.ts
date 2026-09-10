/**
 * İngilizce kursun beceri egzersizlerindeki düz metnin ALMANCA
 * karşılığını denetler:
 *   `npx tsx --tsconfig scripts/tsconfig.e2e.json data/skills/prose-de/check.ts [paket|all]`
 *
 * Ortak kurallar kardeş hatların aynısı — son noktalama, sayı pariteti,
 * karakter kümesi, kanıtın hayatta kalması, uzunluk sapması, mükerrer
 * satır, kapsam.
 *
 * KANIT ÖLÇÜTÜ TAHMİNE DAYANMIYOR. Kardeşi `data/skills/prose` bir
 * açıklığın çevrilip çevrilmeyeceğine SÖZCÜK LİSTESİYLE karar veriyor
 * (Almanca işlev sözcüğü mü taşıyor, büyük harfli bir ad var mı). Burada
 * paket satırı egzersizin bütün İNGİLİZCE yüzeyini yanında taşıyor
 * (`en` alanı: metin, soru kökleri, şıklar); açıklık orada BİREBİR varsa
 * kanıttır, yoksa Türkçe karşılıktır ve çevrilir. Aynı çözüm ders
 * hattında da bu sırayla bulundu ve gerekçesi orada yazılı.
 *
 * ÖLÇÜLDÜ: 555 aday açıklığın 300'ü yüzeyde bulunuyor. Bulunmayanların
 * neredeyse tamamı Türkçe — «çok», «var», «-meli», «-yor», «-de». Birkaç
 * İngilizce parça da dışarıda kalıyor: «promise», «could», «avoid» gibi
 * egzersizin ÖĞRETTİĞİ ama metninde geçmeyen sözcükler. Onlar ölçüt
 * dışında bırakıldı çünkü bu hatta yanlış ret yanlış kabulden ucuz:
 * yazan taraf öğretilen sözcüğü zaten korumak zorunda, kapı yalnız
 * denetliyor. Yanlış kabul ise satırı Türkçe bırakmayı DAYATIR ve o
 * zaman karakter kuralıyla kavga eder (kalan bir `ş` çevrilmemiş metin
 * sayılıyor).
 *
 * SORU KÖKÜ VE ŞIKLAR PAKETTE YOK: ikisi de İngilizce ve öğrenci onları
 * öğrenilen dilde görüyor. Gerekçesi `make.ts` başında.
 *
 * AMERİKAN YAZIMI DENETİMİ YOK — kardeş hatta var çünkü orada yazılan
 * dil İngilizce. Burada yazılan dil Almanca; `usSpelling` her satırda
 * susardı ve yalnız gürültü olurdu.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { proseWork, type ProseRow } from "./make.js";

const DIR = new URL(".", import.meta.url).pathname;
const ARG = (process.argv[2] || "all").toLowerCase();

const errors: string[] = [];
const warnings: string[] = [];
const written = new Map<string, string>();

/** Son noktalama sınıfı — kardeş kapıların aynısı. */
const end = (t: string): string => {
  const m = String(t).trim().slice(-1);
  return /[.!?:…,;]/.test(m) ? m : "—";
};
/** Harfe bitişik olmayan sayılar; A1, B2 gibi kodlar miktar değildir. */
const numbers = (t: string): string[] =>
  [...String(t).matchAll(/(?<!\p{L})\d+/gu)].map((m) => m[0]).sort();
/* Üç nokta BOŞLUK işareti olabiliyor ("Benim adım …"); yanındaki
   noktalama onunla birlikte gidiyor. Gerekçe `data/skills/task/check.ts`te. */
const slots = (t: string): string => t.replace(/[\s:,;]*…[\s:,;]*/g, "");

const flat = (t: string): string =>
  String(t).replace(/[„“”‚‘’'"]/g, "'").replace(/\.\.\./g, "…").replace(/\s+/g, " ").trim();
const lower = (t: string): string => flat(t).toLowerCase();

/** Aday açıklıklar: „…“, «…», "…" ve (…). */
const spans = (t: string): string[] => {
  const out: string[] = [];
  for (const m of String(t).matchAll(/[„"«]([^„"“”«»]{2,})[“"»]/g)) out.push(m[1]);
  for (const m of String(t).matchAll(/\(([^()]{2,})\)/g)) out.push(m[1]);
  return out;
};
/* Yüzeydeki SÖZCÜKLER. Apostroflu biçim tek parça sayılıyor (`i've`),
   çünkü alt-dize aramasında Türkçe «ve» tam oradan kanıt çıkıyordu. */
const WORD = /\p{L}+(?:'\p{L}+)*/gu;

/** Kanıt = egzersizin İngilizce yüzeyinde birebir geçen açıklık.
 *
 *  TEK SÖZCÜKLÜK açıklık yüzeyde SÖZCÜK olarak geçmeli, alt-dize olarak
 *  değil: «ve» `I've` içinden, «en» `seven` içinden kanıt çıkarırdı ve
 *  kapı o Türkçe parçaların Almancada aynen kalmasını dayatırdı.
 *  Çok sözcüklü açıklıkta alt-dize yeterli — o boyda rastlantı yok. */
const evidence = (row: ProseRow): string[] => {
  const surface = lower((row.en ?? []).join(" | "));
  const words = new Set(surface.match(WORD) ?? []);
  return spans(row.tr).filter((s) => {
    const l = lower(s);
    if (!surface.includes(l)) return false;
    return /\s/.test(l) ? true : words.has(l);
  });
};

/** Almanca satırda beklenen karakter kümesi. Dışındaki her şey ya yazım
 *  kazası ya da çevrilmemiş metin. */
const CHARSET = /[\n -~ÄÖÜäöüßé·×‚„“”‘’«»–—…→↔€]/;

/** Egzersizin İngilizce yüzeyinde SÖZCÜK olarak geçen özel adlar.
 *  «Deniz» ve «Emma» metnin kişileri; Almanca karşılıkta da adlarıyla
 *  duruyorlar. Küme dışı harf taşıyan bir ad (Ayşe, Yalçın) karakter
 *  kuralına takılırdı, oysa yerinde kalması gerekiyor. Yalnızca küme
 *  DIŞI harf taşıyan sözcükler eleniyor: kural gevşiyor, hiçbir geçen
 *  satır etkilenmiyor. */
const surfaceNames = (de: string, row: ProseRow): string[] => {
  const words = new Set(lower((row.en ?? []).join(" | ")).match(WORD) ?? []);
  return (de.match(WORD) ?? []).filter(
    (w) => [...w].some((ch) => !CHARSET.test(ch)) && words.has(lower(w)),
  );
};

const strip = (de: string, row: ProseRow): string => {
  let out = de;
  for (const s of evidence(row)) out = out.split(s).join(" ");
  for (const s of surfaceNames(out, row)) out = out.split(s).join(" ");
  return out;
};

/* Türkçe kaldı mı — ö/ü Almancada da var, yalnız ı/ş/ğ/İ/Ğ/Ş ayırt edici. */
const TURKISH_LETTER = /[ışğİĞŞ]/;

/* Kapsam ALINTILARI SAYMIYOR: onların karşılığı kendileri ve sözlüğe
   `apply` adımında birim eşleme olarak giriyor. */
const src = new Map(proseWork().map((r) => [r.kind + "|" + r.tr, r]));

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
          if (!flat(de).includes(flat(s))) H(`metin kanıtı düşmüş: «${s.slice(0, 34)}»`);

        if (flat(de) === flat(r.tr) && TURKISH_LETTER.test(r.tr)) H("karşılık Türkçenin aynısı");

        /* SÖZLÜKÇE KARŞILIĞI CÜMLE DEĞİL. `gloss.tr` bir kelimenin anlamı
           ("sinema"), açıklaması değil; iki katından uzun bir Almanca
           yanlış alana yazılmış demektir. Aynı kural ders ekseninde
           `vocab.tr` için de var. */
        if (row.kind === "gloss.tr" && de.length > r.tr.length * 2 + 10)
          H(`karşılık cümleye dönmüş (${r.tr.length} → ${de.length})`);

        if (de.length > r.tr.length * 2 + 20 || de.length * 2 + 20 < r.tr.length)
          U(`uzunluk çok sapıyor (${r.tr.length} → ${de.length})`);
      }
      written.set(key, de);
    }
  }

let coverage: { rows: number; missing: number } | null = null;
if (ARG === "all") {
  const rows = proseWork();
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
