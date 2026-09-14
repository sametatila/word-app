import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { coStreaksAtRisk } from "../src/lib/push";

/**
 * HATIRLATMA TURUNUN HAM SQL'İ — gerçek Postgres'te.
 *
 * `coStreaksAtRisk` kullanıcı listesini `any(…::text[])` ile veriyordu ve
 * Drizzle düz bir diziyi `($1, $2, …)` LİSTESİNE açtığı için sorgu Postgres'te
 * "malformed array literal" ile düşüyordu. Tip denetimi de birim testleri de
 * bunu göremezdi: sorgu metni geçerli bir dizge, hata yalnız veritabanı
 * parametreyi çözerken çıkıyor. Hatırlatma cron'u 2026-09-10'dan 14'üne
 * kadar her akşam 500 döndü ve kimse fark etmedi. Bu test sorguyu GERÇEKTEN
 * çalıştırıyor; hem tek kişilik liste (hatanın göründüğü biçim) hem çok
 * kişilik liste.
 *
 *   TEST_DATABASE_URL=postgres://postgres@127.0.0.1:55432/lernomi npm run test:push-sql
 */

const url = process.env.TEST_DATABASE_URL ?? "";
if (!/@(localhost|127\.0\.0\.1)[:/]/.test(url)) {
  console.error(
    url
      ? `Bu test YALNIZ yerel bir veritabanında koşar; TEST_DATABASE_URL yerel değil: ${url.replace(/:[^:@]*@/, ":***@")}`
      : "TEST_DATABASE_URL tanımlı değil. Kurulum için scripts/test-entitlement.ts başındaki nota bak.",
  );
  process.exit(2);
}

let failures = 0;
function check(name: string, cond: boolean, detail: unknown = "") {
  if (cond) console.log(`  ✓ ${name}`);
  else {
    failures++;
    console.log(`  ✗ ${name} ${detail === "" ? "" : `→ ${String(detail)}`}`);
  }
}

const tag = Math.random().toString(36).slice(2, 8);
const A = `test-push-a-${tag}`;
const B = `test-push-b-${tag}`;
const C = `test-push-c-${tag}`;
const ALL = [A, B, C];

/** Yalnız sorgunun okuduğu sütunlar yazılıyor; öteki sütunların varsayılanı var. */
async function seed(today: string, days: string[]) {
  await db.execute(sql`insert into profiles (user_id, display_name) values (${A}, 'Ada Yılmaz'), (${B}, 'Bora Kaya'), (${C}, 'Cem')`);
  await db.execute(sql`insert into friendships (requester_id, addressee_id, status) values (${A}, ${B}, 'accepted'), (${A}, ${C}, 'pending')`);
  for (const user of ALL) {
    for (const day of days) {
      await db.execute(sql`insert into daily_stats (user_id, day, xp) values (${user}, ${day}, 10)`);
    }
  }
  void today;
}

async function cleanup() {
  const ids = sql.param(ALL);
  await db.execute(sql`delete from friendships where requester_id = any(${ids}::text[]) or addressee_id = any(${ids}::text[])`);
  await db.execute(sql`delete from daily_stats where user_id = any(${ids}::text[])`);
  await db.execute(sql`delete from profiles where user_id = any(${ids}::text[])`);
}

async function main() {
  const today = "2026-09-14";
  const y1 = "2026-09-13";
  const y2 = "2026-09-12";

  await cleanup();
  await seed(today, [y1, y2]);
  try {
    console.log("\nTek kişilik liste (hatanın göründüğü biçim)");
    let one: Map<string, { name: string }> | null = null;
    try {
      one = await coStreaksAtRisk([A], today);
    } catch (err) {
      check("sorgu hatasız çalışıyor", false, err instanceof Error ? err.message : err);
    }
    if (one) {
      check("sorgu hatasız çalışıyor", true);
      check("A için ortak seri bulundu, arkadaşın ilk adı", one.get(A)?.name === "Bora", JSON.stringify([...one]));
      check("yalnız istenen kullanıcı dönüyor", one.size === 1, one.size);
    }

    console.log("\nÇok kişilik liste");
    const many = await coStreaksAtRisk([A, B, C], today);
    check("iki yönde de bulunuyor (A→Bora, B→Ada)", many.get(A)?.name === "Bora" && many.get(B)?.name === "Ada", JSON.stringify([...many]));
    check("bekleyen arkadaşlık ortak seri sayılmıyor (C yok)", !many.has(C), JSON.stringify([...many]));

    console.log("\nKopuk zincir ve boş liste");
    await db.execute(sql`delete from daily_stats where user_id = ${B} and day = ${y2}`);
    const broken = await coStreaksAtRisk([A], today);
    check("iki gün üst üste çalışılmadıysa seri canlı sayılmıyor", broken.size === 0, JSON.stringify([...broken]));
    const empty = await coStreaksAtRisk([], today);
    check("boş liste sorgusuz boş döner", empty.size === 0);
  } finally {
    await cleanup();
  }

  console.log(failures === 0 ? "\ntamam: hepsi geçti" : `\nKALDI: ${failures}`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch(async (err) => {
  console.error(err);
  try {
    await cleanup();
  } catch {
    /* temizlik de düşerse asıl hata görünsün */
  }
  process.exit(1);
});
