/**
 * Canlı doğrulama: `npm run db:verify`
 *
 * Şema denetimi (db:check) tablo ve sütunların yerinde olduğunu söyler ama
 * içeriğin güncel olduğunu söylemez. Burada kaynak dosyalarla veritabanı
 * satır satır karşılaştırılır: sayı değil, alan alan.
 *
 * Neden: tohumlama betikleri upsert yapar. Kaynakta bir kelimenin anlamı
 * düzeltilip tohumlama unutulursa hiçbir şey hata vermez — kullanıcı eski
 * veriyi görmeye devam eder. Bu betik o sessiz sapmayı yakalar.
 */
import "dotenv/config";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { neon } from "@neondatabase/serverless";
import { cleanHeadword } from "../src/lib/headword";

const sql = neon(process.env.DATABASE_URL!);
const ROOT = process.cwd();
const problems: string[] = [];

const hash = (v: unknown) => createHash("sha1").update(JSON.stringify(v)).digest("hex").slice(0, 12);
const norm = (s: string | null | undefined) => (s ?? "").trim();


async function checkWords() {
  const src = JSON.parse(readFileSync(path.join(ROOT, "data/app/words.json"), "utf8")) as {
    id: number; de: string; tr: string; niveau: string;
  }[];
  const live = (await sql`select id, de, tr, niveau from words where course='de'`) as {
    id: number; de: string; tr: string; niveau: string;
  }[];

  console.log(`\nAlmanca kelimeler — kaynak ${src.length}, canlı ${live.length}`);
  if (src.length !== live.length) problems.push(`de kelime sayısı: ${src.length} ≠ ${live.length}`);

  const liveById = new Map(live.map((r) => [r.id, r]));
  let mismatched = 0;
  const samples: string[] = [];
  for (const s of src) {
    const l = liveById.get(s.id);
    if (!l) {
      mismatched++;
      if (samples.length < 6) samples.push(`${s.id} canlıda yok (${s.de})`);
      continue;
    }
    if (cleanHeadword(s.de) !== norm(l.de) || norm(s.tr) !== norm(l.tr) || s.niveau !== l.niveau) {
      mismatched++;
      if (samples.length < 6) samples.push(`${s.id}: "${cleanHeadword(s.de)}/${s.tr}" ≠ "${l.de}/${l.tr}"`);
    }
  }
  const orphan = live.filter((l) => !src.some((s) => s.id === l.id));
  if (orphan.length) problems.push(`canlıda fazla ${orphan.length} de kaydı (ör. ${orphan.slice(0, 3).map((o) => o.id).join(", ")})`);
  if (mismatched) problems.push(`de içerik sapması: ${mismatched} kayıt — ${samples.join(" | ")}`);
  console.log(`  içerik: ${mismatched ? `${mismatched} sapma` : "kaynakla birebir"}`);
}

async function checkZurich() {
  const dir = path.join(ROOT, "data/zurich");
  const src = readdirSync(dir)
    .filter((f) => /^chunk-\d+\.json$/.test(f))
    .flatMap((f) => JSON.parse(readFileSync(path.join(dir, f), "utf8")) as { id: number; gsw: string }[]);
  const live = (await sql`select id, de from words where course='gsw-zh'`) as { id: number; de: string }[];

  console.log(`\nZüritüütsch — kaynak ${src.length}, canlı ${live.length}`);
  if (src.length !== live.length) problems.push(`gsw kelime sayısı: ${src.length} ≠ ${live.length}`);

  // gsw id'leri kaynağa ID_OFFSET eklenerek yazılıyor; eşleşme son eke göre yapılır.
  const liveByTail = new Map(live.map((r) => [r.id % 100000, norm(r.de)]));
  let mismatched = 0;
  const samples: string[] = [];
  for (const s of src) {
    const l = liveByTail.get(s.id);
    if (l === undefined || l !== cleanHeadword(s.gsw)) {
      mismatched++;
      if (samples.length < 6) samples.push(`${s.id}: "${cleanHeadword(s.gsw)}" ≠ "${l ?? "yok"}"`);
    }
  }
  if (mismatched) problems.push(`gsw içerik sapması: ${mismatched} kayıt — ${samples.join(" | ")}`);
  console.log(`  içerik: ${mismatched ? `${mismatched} sapma` : "kaynakla birebir"}`);
}

async function checkSkills() {
  // index.ts `server-only` taşır ve Node script'inden içe aktarılamaz; içerik
  // listesi bu yüzden bundled.ts'ten okunur.
  const { BUNDLED_EXERCISES } = (await import("../src/lib/skills/bundled")) as {
    BUNDLED_EXERCISES: { id: string; title: string; skill: string; level: string }[];
  };
  const live = (await sql`select id, title, skill, level from skill_exercises`) as {
    id: string; title: string; skill: string; level: string;
  }[];

  console.log(`\nBeceri egzersizleri — kaynak ${BUNDLED_EXERCISES.length}, canlı ${live.length}`);
  if (BUNDLED_EXERCISES.length !== live.length)
    problems.push(`beceri sayısı: ${BUNDLED_EXERCISES.length} ≠ ${live.length}`);

  const liveById = new Map(live.map((r) => [r.id, r]));
  let mismatched = 0;
  const samples: string[] = [];
  for (const s of BUNDLED_EXERCISES) {
    const l = liveById.get(s.id);
    if (!l || norm(s.title) !== norm(l.title) || s.skill !== l.skill || s.level !== l.level) {
      mismatched++;
      if (samples.length < 6) samples.push(`${s.id}: "${s.title}" ≠ "${l?.title ?? "yok"}"`);
    }
  }
  if (mismatched) problems.push(`beceri içerik sapması: ${mismatched} kayıt — ${samples.join(" | ")}`);
  console.log(`  içerik: ${mismatched ? `${mismatched} sapma` : "kaynakla birebir"}`);
}

async function checkUserData() {
  const [p] = (await sql`select count(*)::int as n from profiles`) as { n: number }[];
  const [u] = (await sql`select count(*)::int as n from user_words`) as { n: number }[];
  const [r] = (await sql`select count(*)::int as n from reviews`) as { n: number }[];
  const [o] = (await sql`
    select count(*)::int as n from user_words uw
    left join words w on w.id = uw.word_id where w.id is null`) as { n: number }[];
  console.log(`\nKullanıcı verisi — ${p.n} profil · ${u.n} kelime kaydı · ${r.n} cevap`);
  if (o.n) problems.push(`${o.n} kullanıcı kaydı silinmiş kelimeye bağlı (öksüz)`);
  else console.log("  öksüz kayıt yok");
}

async function main() {
  console.log(`hedef: ${new URL(process.env.DATABASE_URL!).host}`);
  await checkWords();
  await checkZurich();
  await checkSkills();
  await checkUserData();

  console.log(`\nkaynak imzası: ${hash(readFileSync(path.join(ROOT, "data/app/words.json"), "utf8").length)}`);
  if (problems.length) {
    console.log("\nSAPMA:");
    for (const p of problems) console.log("  -", p);
    process.exit(1);
  }
  console.log("\nCanlı veri kaynak dosyalarla birebir güncel.");
}

main();
