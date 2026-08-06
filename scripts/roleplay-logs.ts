/**
 * Rol yapma kayıtlarını okur — `npm run logs:roleplay`
 *
 *   npm run logs:roleplay                 son konuşmalar
 *   npm run logs:roleplay -- --user Samet tek kullanıcı
 *   npm run logs:roleplay -- --loops      yalnızca kendini tekrar edenler
 *   npm run logs:roleplay -- --purge      kaydı tamamen siler
 *
 * Ayrı bir arayüz yerine betik: kayıt geliştirme için tutuluyor, kullanıcıya
 * gösterilecek bir şey değil ve uygulamada ona yer açmak yanlış işaret olurdu.
 */
import { and, desc, eq, sql } from "drizzle-orm";
import { db, pool } from "./test-db";
import { profiles, roleplayLogs } from "../src/lib/db/schema";
import { parseReply } from "../src/lib/chat-format";

const args = process.argv.slice(2);
const flag = (name: string) => args.includes(`--${name}`);
const value = (name: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};

/**
 * İki cevabın "aynı" sayılıp sayılmayacağı.
 *
 * Model tıpatıp aynı cümleyi nadiren kuruyor; döngü genellikle aynı soruyu
 * başka kelimelerle sormaktan geliyor. Bu yüzden karşılaştırma kelime kümesi
 * üzerinden: ortak kelime oranı yüksekse aynı sayılıyor.
 */
function similar(a: string, b: string): boolean {
  const norm = (t: string) =>
    new Set(
      t.toLocaleLowerCase("de-DE").replace(/[^\p{L}\s]/gu, " ").split(/\s+/).filter((w) => w.length > 3),
    );
  const x = norm(a);
  const y = norm(b);
  if (x.size < 3 || y.size < 3) return false;
  let shared = 0;
  for (const w of x) if (y.has(w)) shared++;
  return shared / Math.min(x.size, y.size) >= 0.6;
}

async function main() {
  if (flag("purge")) {
    const r = await db.delete(roleplayLogs);
    console.log(`Kayıt silindi (${r.rowCount ?? 0} satır).`);
    await pool.end();
    return;
  }

  const who = value("user");
  let userId: string | undefined;
  if (who) {
    const [p] = await db
      .select({ id: profiles.userId })
      .from(profiles)
      .where(eq(profiles.displayName, who));
    if (!p) {
      console.error(`"${who}" adlı kullanıcı yok.`);
      process.exit(1);
    }
    userId = p.id;
  }

  const rows = await db
    .select({
      userId: roleplayLogs.userId,
      name: profiles.displayName,
      lessonId: roleplayLogs.lessonId,
      turn: roleplayLogs.turn,
      said: roleplayLogs.said,
      reply: roleplayLogs.reply,
      at: roleplayLogs.createdAt,
    })
    .from(roleplayLogs)
    .leftJoin(profiles, eq(profiles.userId, roleplayLogs.userId))
    .where(userId ? eq(roleplayLogs.userId, userId) : sql`true`)
    .orderBy(desc(roleplayLogs.createdAt))
    .limit(200);

  if (!rows.length) {
    console.log("Kayıt yok. Bir derste rol yapma bölümüne girilince dolmaya başlar.");
    await pool.end();
    return;
  }

  // Konuşma bazında grupla: kullanıcı + ders + gün.
  const groups = new Map<string, typeof rows>();
  for (const r of rows) {
    const key = `${r.userId}|${r.lessonId}|${r.at.toISOString().slice(0, 13)}`;
    (groups.get(key) ?? groups.set(key, []).get(key)!).push(r);
  }

  let loopCount = 0;
  for (const [, turns] of groups) {
    turns.sort((a, b) => a.turn - b.turn);
    // Modelin kendini tekrar ettiği yerler.
    const repeats: number[] = [];
    for (let i = 1; i < turns.length; i++) {
      const prev = parseReply(turns[i - 1].reply).body;
      const cur = parseReply(turns[i].reply).body;
      if (similar(prev, cur)) repeats.push(turns[i].turn);
    }
    if (flag("loops") && !repeats.length) continue;
    if (repeats.length) loopCount++;

    const head = turns[0];
    console.log(
      `\n${"─".repeat(76)}\n${head.name ?? head.userId} · ${head.lessonId} · ` +
        `${head.at.toISOString().slice(0, 16).replace("T", " ")} · ${turns.length} tur` +
        (repeats.length ? `  ⚠ TEKRAR: ${repeats.join(", ")}. turda` : ""),
    );
    for (const t of turns) {
      const { body, corrections, suggestions } = parseReply(t.reply);
      console.log(`\n  ${t.turn}. öğrenci: ${t.said}`);
      console.log(`     model   : ${body.trim().replace(/\n/g, "\n              ")}`);
      for (const c of corrections) console.log(`     düzeltme: ${c}`);
      if (suggestions.length) console.log(`     öneri   : ${suggestions.join(" | ")}`);
    }
  }

  console.log(
    `\n${"─".repeat(76)}\n${groups.size} konuşma · ${rows.length} tur` +
      (loopCount ? ` · ${loopCount} konuşmada tekrar örüntüsü` : " · tekrar örüntüsü yok"),
  );
  await pool.end();
}

main().catch(async (e) => {
  console.error(e);
  await pool.end();
  process.exit(1);
});
