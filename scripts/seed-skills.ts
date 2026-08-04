import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { notInArray, sql } from "drizzle-orm";
import { skillExercises } from "../src/lib/db/schema";
import { itemCount } from "../src/lib/skills/meta";
import type { SkillExercise } from "../src/lib/skills/types";
import { a1 } from "../src/lib/skills/content/a1";
import { a2 } from "../src/lib/skills/content/a2";
import { b1 } from "../src/lib/skills/content/b1";
import { b2 } from "../src/lib/skills/content/b2";
import { c1 } from "../src/lib/skills/content/c1";
import { zhA1 } from "../src/lib/skills/content/zh-a1";
import { zhA2 } from "../src/lib/skills/content/zh-a2";
import { zhB1 } from "../src/lib/skills/content/zh-b1";
import { zhB2 } from "../src/lib/skills/content/zh-b2";
import { zhC1 } from "../src/lib/skills/content/zh-c1";

/**
 * Beceri içeriğini (okuma/dinleme/yazma) Neon'a yükler.
 *
 * Repo içindeki content/ dosyaları tek doğruluk kaynağıdır; bu script mevcut
 * satırları günceller, yenilerini ekler, artık var olmayanları siler. Tablo
 * yoksa (migration henüz uygulanmadıysa) kendisi oluşturur — prod'da güvenle
 * tekrar tekrar çalıştırılabilir.
 */

// Almanca kurs + Zürih kursu birlikte yüklenir; ayrım `course` alanındadır.
const ALL: SkillExercise[] = [
  ...a1,
  ...a2,
  ...b1,
  ...b2,
  ...c1,
  ...zhA1,
  ...zhA2,
  ...zhB1,
  ...zhB2,
  ...zhC1,
];

/** UTF-8 bozulması (mojibake) kontrolü: Türkçe/Almanca karakterler bozuksa hiç yükleme. */
function checkEncoding() {
  const bad = /�|Ã.|â€|Ä±|Å./;
  const problems: string[] = [];
  for (const ex of ALL) {
    const blob = JSON.stringify(ex);
    const m = blob.match(bad);
    if (m) problems.push(`${ex.id}: şüpheli dizi "${m[0]}"`);
  }
  if (problems.length) {
    console.error("Karakter kodlaması sorunlu görünüyor:");
    problems.forEach((p) => console.error("  ✗", p));
    throw new Error("Mojibake tespit edildi, yükleme iptal.");
  }
}

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL tanımlı değil");
  checkEncoding();

  const client = neon(url);
  const db = drizzle(client);

  // drizzle/0004_common_kabuki.sql + 0006 (course sütunu) ile birebir aynı DDL.
  await client.query(`CREATE TABLE IF NOT EXISTS "skill_exercises" (
    "id" text PRIMARY KEY NOT NULL,
    "skill" text NOT NULL,
    "level" text NOT NULL,
    "course" text DEFAULT 'de' NOT NULL,
    "title" text NOT NULL,
    "genre" text NOT NULL,
    "minutes" integer NOT NULL,
    "items" integer NOT NULL,
    "position" integer DEFAULT 0 NOT NULL,
    "data" jsonb NOT NULL
  )`);
  // Tablo 0006 öncesinden kalmışsa CREATE ... IF NOT EXISTS sütunu eklemez.
  await client.query(
    `ALTER TABLE "skill_exercises" ADD COLUMN IF NOT EXISTS "course" text DEFAULT 'de' NOT NULL`,
  );
  await client.query(
    `CREATE INDEX IF NOT EXISTS "skill_exercises_level_idx" ON "skill_exercises" USING btree ("level","skill","position")`,
  );

  // Seviye+beceri içindeki yazılış sırası korunur; hub bu sırayla listeler.
  const positions = new Map<string, number>();
  const values = ALL.map((ex) => {
    const key = `${ex.course ?? "de"}-${ex.level}-${ex.skill}`;
    const pos = (positions.get(key) ?? 0) + 1;
    positions.set(key, pos);
    return {
      id: ex.id,
      skill: ex.skill,
      level: ex.level,
      course: ex.course ?? "de",
      title: ex.title,
      genre: ex.genre,
      minutes: ex.minutes,
      items: itemCount(ex),
      position: pos,
      data: ex,
    };
  });

  const CHUNK = 20;
  for (let i = 0; i < values.length; i += CHUNK) {
    const chunk = values.slice(i, i + CHUNK);
    await db
      .insert(skillExercises)
      .values(chunk)
      .onConflictDoUpdate({
        target: skillExercises.id,
        set: {
          skill: sql`excluded.skill`,
          level: sql`excluded.level`,
          course: sql`excluded.course`,
          title: sql`excluded.title`,
          genre: sql`excluded.genre`,
          minutes: sql`excluded.minutes`,
          items: sql`excluded.items`,
          position: sql`excluded.position`,
          data: sql`excluded.data`,
        },
      });
    console.log(`  ${Math.min(i + CHUNK, values.length)}/${values.length}`);
  }

  const removed = await db
    .delete(skillExercises)
    .where(notInArray(skillExercises.id, values.map((v) => v.id)))
    .returning({ id: skillExercises.id });
  if (removed.length) console.log(`Silinen eski egzersiz: ${removed.map((r) => r.id).join(", ")}`);

  console.log(`Beceri içeriği yüklendi: ${values.length} egzersiz.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
