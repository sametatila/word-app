/**
 * İngilizce kursun modül sınavı kâğıtlarının ALMANCASINI denetler:
 *   `npx tsx --tsconfig scripts/tsconfig.e2e.json data/lessons/exam-de/check.ts [paket|all]`
 *
 * Kardeşi `data/lessons/exam/check.ts` ile aynı kurallar, ters yön. İkisi de
 * bu alana özgü iki şeyi ölçüyor:
 *
 * - **Soru kökünün çevirisi CEVABI VERMEMELİ.** Şıklar öğrenilen dilde
 *   (burada İngilizce) kalıyor; Almanca kök bir şıkkı olduğu gibi taşırsa
 *   soru ölçmeyi bırakır — öğrenci dinlemeden, okumadan doğru şıkkı görür.
 * - **Replik çevirisi ÖĞRENİLEN DİLİN karşılığı olmalı.** `turn` ve
 *   `question` satırlarının İngilizce bir eşi var; Almanca yeni bir cümle
 *   değil, o repliğin karşılığı. Uzunluk çok saparsa uyarı veriliyor.
 *
 * Amerikan yazımı denetimi BURADA YOK: kardeş kapıda okuyucu İngilizce
 * yazıyordu, burada Almanca.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { extractExamDe } from "./make";

const DIR = new URL(".", import.meta.url).pathname;
const ARG = (process.argv[2] || "all").toLowerCase();

const errors: string[] = [];
const warnings: string[] = [];
const written = new Map<string, string>();

/** Son noktalama sınıfı — kardeş kapıların aynısı. */
const end = (t: string) => {
  const m = String(t).trim().slice(-1);
  return /[.!?:…,;]/.test(m) ? m : "—";
};
/** Harfe bitişik olmayan sayılar; A1, B2 gibi kodlar miktar değildir. */
const numbers = (t: string) => [...String(t).matchAll(/(?<!\p{L})\d+/gu)].map((m) => m[0]).sort();
/** Kaba karşılaştırma: küçük harf, noktalama yok. */
const flat = (t: string) => t.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();

const src = new Map(extractExamDe().map((r) => [r.tr, r]));

if (existsSync(`${DIR}out`))
  for (const f of readdirSync(`${DIR}out`).filter((x) => x.endsWith(".json"))) {
    const packet = f.replace(/\.json$/, "");
    if (ARG !== "all" && packet !== ARG) continue;
    for (const r of JSON.parse(readFileSync(`${DIR}out/${f}`, "utf8")) as { tr: string; de: string }[]) {
      const H = (m: string) => errors.push(`  [${packet}] ${JSON.stringify(r.tr.slice(0, 38))} — ${m}`);
      const U = (m: string) => warnings.push(`  [${packet}] ${JSON.stringify(r.tr.slice(0, 38))} — ${m}`);
      if (written.has(r.tr)) H("aynı dize iki pakette");
      const row = src.get(r.tr);
      if (!row) H("pakete ait değil");
      const de = String(r.de ?? "").trim();
      if (!de) H("karşılık boş");
      else if (row) {
        /* YER TUTUCUNUN YERİ SÖZDİZİMİNİN İŞİ, hata değil.
           Kalıp satırları (`phrase`) bir boşluk taşıyor: "… pişiriyorum" /
           "Ich koche …". Türkçe fiil-sonlu, Almanca değil; üç nokta bu yüzden
           iki dilde farklı uçta duruyor ve son noktalamayı karşılaştırmak
           doğru çeviriyi hata sayıyordu (150 satırın 40'ı). Kural yalnız bu
           sınıfta ve yalnız üç nokta için gevşiyor — cümle sonundaki nokta,
           soru ve ünlem her satırda ölçülmeye devam ediyor. */
        const placeholder = row.kind === "phrase" && (end(r.tr) === "…" || end(de) === "…");
        if (!placeholder && end(r.tr) !== end(de)) H(`son noktalama uyuşmuyor: «${end(r.tr)}» → «${end(de)}»`);
        const a = numbers(r.tr).join(","), b = numbers(de).join(",");
        if (a !== b) H(`sayılar uyuşmuyor: «${a}» → «${b}»`);
        for (const opt of row.options ?? []) {
          // Tek sözcüklük şıklar (sayılar, yes/no) doğal olarak geçebilir;
          // ölçüt İKİ sözcükten uzun bir şıkkın olduğu gibi görünmesi.
          const o = flat(opt);
          if (o.split(" ").length > 2 && flat(de).includes(o)) H(`şık kökte görünüyor: «${opt}»`);
        }
        if ((row.kind === "turn" || row.kind === "question") && row.de.length) {
          const target = row.de[0];
          if (de.length > target.length * 2 + 16 || de.length * 2 + 16 < target.length)
            U(`İngilizceden uzunluk sapması (${target.length} → ${de.length})`);
        }
      }
      written.set(r.tr, de);
    }
  }

let coverage: { rows: number; missing: number } | null = null;
if (ARG === "all") {
  const rows = extractExamDe();
  const missing = rows.filter((r) => !written.has(r.tr)).length;
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
