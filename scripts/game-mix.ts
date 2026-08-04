/** Yeni bir öğrencinin ilk günlerinde hangi oyunları gördüğünü ölçer. */
import { sql, eq } from "drizzle-orm";
import { db, pool } from "./test-db";
import { dailyStats, profiles, reviews, userWords } from "../src/lib/db/schema";
import { buildSession, submitAnswers, shiftDay } from "../src/lib/session";
import type { Answer, Round } from "../src/lib/types";

const USER = "mix-user";

function answersFor(rounds: Round[]): Answer[] {
  const out: Answer[] = [];
  for (const r of rounds) {
    const ws = r.game === "match" ? r.words : [r.word];
    for (const w of ws) out.push({ wordId: w.id, game: r.game, correct: true, latencyMs: 2500 });
  }
  return out;
}

async function main() {
  for (const t of [reviews, userWords, dailyStats, profiles]) {
    await db.delete(t).where(eq((t as typeof profiles).userId, USER));
  }
  let day = "2026-04-01";
  const seen = new Set<string>();
  for (let d = 1; d <= 6; d++) {
    for (let s = 1; s <= 3; s++) {
      const session = await buildSession(USER, day);
      if (!session.rounds.length) break;
      const mix = session.rounds.map((r) => r.game);
      mix.forEach((g) => seen.add(g));
      console.log(`gün ${d} oturum ${s}: ${mix.join(", ")}`);
      await submitAnswers(USER, answersFor(session.rounds), day, 120);
    }
    // ertesi güne geç: tekrarların zamanı gelsin
    await db.update(userWords).set({ dueAt: sql`now() - interval '1 hour'` }).where(eq(userWords.userId, USER));
    day = shiftDay(day, 1);
  }
  console.log("\nGÖRÜLEN OYUNLAR:", [...seen].join(", "));
  console.log("EKSİK:", ["intro","choice","artikel","scramble","cloze","typing","match"].filter((g) => !seen.has(g)).join(", ") || "yok");
  await pool.end();
}
main().catch(async (e) => { console.error(e); await pool.end(); process.exit(1); });
