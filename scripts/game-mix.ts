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

/**
 * Test kullanıcısının izini siler.
 *
 * Hem başta hem sonda çağrılıyor. Başta: önceki çalıştırmadan kalan veri
 * sonucu bozmasın. Sonda: test hesabı veritabanında birikmesin — bu betiğin
 * bıraktığı "mix-user" gerçek hesapların arasında isimsiz bir kayıt olarak
 * duruyordu.
 */
async function cleanup() {
  for (const t of [reviews, userWords, dailyStats, profiles]) {
    await db.delete(t).where(eq((t as typeof profiles).userId, USER));
  }
}

async function main() {
  await cleanup();
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
    // Kelimelerin olgunluk dağılımı: üretim oyunları yalnızca oturmuş
    // kelimelerde açıldığı için, bir oyun hiç çıkmadığında suçlunun seçim
    // mantığı mı yoksa kuyruğun bileşimi mi olduğu ancak buradan görülüyor.
    const dist = await db
      .select({
        streak: userWords.correctStreak,
        iv: userWords.intervalDays,
        ease: userWords.ease,
      })
      .from(userWords)
      .where(eq(userWords.userId, USER));
    const strong = dist.filter((d) => d.streak >= 4 && d.iv >= 7 && d.ease >= 2.3).length;
    const solid = dist.filter((d) => d.streak >= 2 && d.iv >= 1).length - strong;
    console.log(`  → ${dist.length} kelime: ${strong} sağlam, ${solid} oturmuş`);

    // Ertesi güne geç. `lastReviewedAt` de geri alınmak ZORUNDA: zamanlayıcı
    // "aynı gün ikinci kez doğru bilmek aralığı büyütmez" kuralını duvar
    // saatinden okuyor, oysa bu testte gün yalnızca bir metin olarak ilerliyor.
    // Yalnızca `dueAt` geri alınsaydı hiçbir kelimenin aralığı 1 günün üstüne
    // çıkamaz, hiçbir kelime sağlamlaşamaz ve üretim oyunlarının hiç çıkmaması
    // gerçek bir kusur değil testin kendi kurgusu olurdu.
    await db
      .update(userWords)
      .set({
        dueAt: sql`now() - interval '1 hour'`,
        lastReviewedAt: sql`now() - interval '25 hours'`,
      })
      .where(eq(userWords.userId, USER));
    day = shiftDay(day, 1);
  }
  // Asıl senaryo: ilerlemiş öğrenci. Olgun kelimelerin tekrarı haftalar
  // sonrasına planlanmış durumda, dolayısıyla kuyruk baştan sona yeni kelime.
  // Kullanıcının bildirdiği kusur tam buydu: altı tam tur boyunca yazma ve
  // çoğul oyunu hiç çıkmamıştı. Oturum, olgun kelimeleri biraz öne çekerek
  // üretim oyunlarını ayakta tutmak zorunda.
  await db
    .update(userWords)
    .set({ dueAt: sql`now() + interval '30 days'` })
    .where(eq(userWords.userId, USER));
  const ileri = await buildSession(USER, day);
  const ileriMix = ileri.rounds.map((r) => r.game);
  console.log(`\nİLERLEMİŞ ÖĞRENCİ (tekrarı gelen kelime yok): ${ileriMix.join(", ")}`);
  const uretim = ileriMix.filter((g) => g === "typing" || g === "order" || g === "scramble");
  console.log(uretim.length ? `  ✓ ${uretim.length} üretim turu var` : "  ✗ hiç üretim turu yok");

  console.log("\nGÖRÜLEN OYUNLAR:", [...seen].join(", "));
  console.log("EKSİK:", ["intro","choice","artikel","scramble","cloze","typing","match"].filter((g) => !seen.has(g)).join(", ") || "yok");
  await cleanup();
  await pool.end();
}
main().catch(async (e) => { console.error(e); await pool.end(); process.exit(1); });
