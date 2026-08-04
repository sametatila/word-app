/**
 * Uçtan uca mantık testi — gerçek PostgreSQL üzerinde çalışır.
 *   TEST_DATABASE_URL=postgres://... npx tsx --tsconfig scripts/tsconfig.e2e.json scripts/e2e.ts
 * Oturum kurgusu, SRS zamanlaması, streak ve ilerleme sorguları doğrulanır.
 */
import { and, eq, inArray, sql } from "drizzle-orm";
import { db, pool } from "./test-db";
import { dailyStats, profiles, reviews, userWords, words } from "../src/lib/db/schema";
import {
  buildChallenge,
  buildSession,
  submitAnswers,
  getProgress,
  ensureProfile,
  markKnown,
  shiftDay,
} from "../src/lib/session";
import { schedule, grade, type SrsState } from "../src/lib/srs";
import type { Answer, Round } from "../src/lib/types";

const USER = "e2e-user";
let failures = 0;

function check(name: string, cond: boolean, detail = "") {
  if (cond) {
    console.log(`  ✓ ${name}`);
  } else {
    failures++;
    console.log(`  ✗ ${name} ${detail}`);
  }
}

function answersFor(rounds: Round[], correctRatio = 1): Answer[] {
  const out: Answer[] = [];
  let i = 0;
  for (const r of rounds) {
    const ws = r.game === "match" ? r.words : [r.word];
    for (const w of ws) {
      out.push({
        wordId: w.id,
        game: r.game,
        correct: i++ % 100 < correctRatio * 100,
        latencyMs: 2500,
      });
    }
  }
  return out;
}

async function reset() {
  await db.delete(reviews).where(eq(reviews.userId, USER));
  await db.delete(userWords).where(eq(userWords.userId, USER));
  await db.delete(dailyStats).where(eq(dailyStats.userId, USER));
  await db.delete(profiles).where(eq(profiles.userId, USER));
}

async function main() {
  await reset();
  const day1 = "2026-03-01";

  console.log("\n1) Profil oluşturma");
  const profile = await ensureProfile(USER, "E2E");
  check("profil yaratıldı", profile.userId === USER);
  check("varsayılan yeni kelime kotası 15", profile.newPerDay === 15);

  console.log("\n2) İlk oturum (sıfırdan kullanıcı)");
  const s1 = await buildSession(USER, day1);
  check("tur üretildi", s1.rounds.length > 0, `(${s1.rounds.length})`);
  check("ilk tur tanıtım kartı", s1.rounds[0]?.game === "intro");
  const introCount = s1.rounds.filter((r) => r.game === "intro").length;
  check("yeni kelime kotası aşılmadı", introCount <= 8, `(${introCount})`);
  const games = new Set(s1.rounds.map((r) => r.game));
  check("birden fazla oyun türü", games.size >= 2, `(${[...games].join(", ")})`);
  const allWords = s1.rounds.flatMap((r) => (r.game === "match" ? r.words : [r.word]));
  check("tüm kelimeler A1", allWords.every((w) => w.niveau === "A1"));
  check("choice şıkları 4 adet ve doğru cevabı içeriyor",
    s1.rounds.filter((r) => r.game === "choice").every((r) =>
      r.game === "choice" && r.options.length === 4 &&
      r.options.includes(r.direction === "de-tr" ? r.word.tr : r.word.de)));

  console.log("\n3) Cevapların kaydı ve SRS");
  const a1 = answersFor(s1.rounds, 1);
  const res1 = await submitAnswers(USER, a1, day1, 120);
  check("XP kazanıldı", res1.xpGained > 0, `(${res1.xpGained})`);
  check("streak 1 oldu", res1.currentStreak === 1);
  check("bugünkü tekrar sayısı doğru", res1.reviewsToday === a1.length);

  const stored = await db.select().from(userWords).where(eq(userWords.userId, USER));
  check("kelime durumları yazıldı", stored.length > 0, `(${stored.length})`);
  check("hepsi ileri bir zamana planlandı",
    stored.every((r) => r.dueAt.getTime() > Date.now() - 1000));
  check("doğru cevaplarda lapse yok", stored.every((r) => r.lapses === 0));

  console.log("\n4) Aynı gün ikinci oturum — kota hız ayarı, duvar değil");
  const s2 = await buildSession(USER, day1);
  check("oturum boş kalmıyor", s2.rounds.length >= 6, `(${s2.rounds.length})`);
  const introCount2 = s2.rounds.filter((r) => r.game === "intro").length;
  check("tek oturumda yeni kelime tavanı aşılmıyor", introCount2 <= 8, `(${introCount2})`);
  await submitAnswers(USER, answersFor(s2.rounds, 1), day1, 60);

  const [statDay1] = await db
    .select()
    .from(dailyStats)
    .where(and(eq(dailyStats.userId, USER), eq(dailyStats.day, day1)));
  check("günlük istatistik yeni kelimeleri sayıyor", statDay1.newWords >= 8, `(${statDay1.newWords})`);

  const s2b = await buildSession(USER, day1);
  check("kota dolduktan sonra da oyun sürüyor", s2b.rounds.length >= 6, `(${s2b.rounds.length})`);

  console.log("\n5) Zaman ilerlemesi — tekrarlar kuyruğa düşüyor");
  await db
    .update(userWords)
    .set({ dueAt: sql`now() - interval '1 hour'` })
    .where(eq(userWords.userId, USER));
  const day2 = shiftDay(day1, 1);
  const s3 = await buildSession(USER, day2);
  check("zamanı gelen kelimeler geldi", s3.meta.dueCount > 0, `(${s3.meta.dueCount})`);
  const reviewRounds = s3.rounds.filter((r) => r.game !== "intro");
  check("tekrar turları üretildi", reviewRounds.length > 0, `(${reviewRounds.length})`);
  check("2. günde yeni kelime kotası yenilendi",
    s3.rounds.filter((r) => r.game === "intro").length > 0);

  console.log("\n6) Yanlış cevap kelimeyi öne çekiyor");
  const knownIds = new Set(stored.map((r) => r.wordId));
  const target = s3.rounds.find(
    (r) => r.game !== "intro" && r.game !== "match" && knownIds.has(r.word.id),
  );
  if (target && "word" in target) {
    const [before] = await db
      .select()
      .from(userWords)
      .where(and(eq(userWords.userId, USER), eq(userWords.wordId, target.word.id)));
    await submitAnswers(
      USER,
      [{ wordId: target.word.id, game: target.game, correct: false, latencyMs: 9000 }],
      day2,
      10,
    );
    const [after] = await db
      .select()
      .from(userWords)
      .where(and(eq(userWords.userId, USER), eq(userWords.wordId, target.word.id)));
    check("lapse arttı", after.lapses === (before?.lapses ?? 0) + 1);
    check("aralık sıfırlandı", after.intervalDays === 0);
    check("kısa süre sonraya planlandı",
      after.dueAt.getTime() - Date.now() < 5 * 60_000);
    check("kolaylık faktörü düştü", after.ease < before.ease,
      `(${before.ease} → ${after.ease})`);
  } else {
    check("test edilebilir tur bulundu", false);
  }

  console.log("\n7) Streak mantığı");
  const r2 = await submitAnswers(USER, answersFor(s3.rounds.slice(0, 2), 1), day2, 30);
  check("ardışık günde streak 2", r2.currentStreak === 2, `(${r2.currentStreak})`);
  const day5 = shiftDay(day1, 5);
  const r3 = await submitAnswers(USER, answersFor(s3.rounds.slice(0, 1), 1), day5, 10);
  check("gün atlanınca streak 1'e döner", r3.currentStreak === 1, `(${r3.currentStreak})`);
  check("en uzun seri korundu", r3.longestStreak === 2, `(${r3.longestStreak})`);

  console.log("\n8) İlerleme sorguları");
  const prog = await getProgress(USER, day5);
  check("seviye dağılımı geldi (A1-C1)", prog.levels.length === 5, `(${prog.levels.length})`);
  check("A1 toplamı gerçek", (prog.levels.find((l) => l.niveau === "A1")?.total ?? 0) > 800);
  check("görülen kelime sayısı > 0", (prog.levels.find((l) => l.niveau === "A1")?.seen ?? 0) > 0);
  check("günlük kayıtlar geldi", prog.days.length >= 1);
  check("oyun istatistikleri geldi", prog.games.length > 0);
  check("planlanmış kelime var", prog.upcoming > 0);

  console.log("\n9) Sıklık sırası, eşanlamlılar ve 'zaten biliyorum'");
  await reset();
  const freshSession = await buildSession(USER, day1);
  const introWords = freshSession.rounds.filter((r) => r.game === "intro").map((r) => r.word);
  const ranks = await db
    .select({ id: words.id, rank: words.rank, de: words.de })
    .from(words)
    .where(inArray(words.id, introWords.map((w) => w.id)));
  const maxRank = Math.max(...ranks.map((r) => r.rank ?? 999999));
  check("ilk kelimeler en yaygınlardan seçiliyor", maxRank < 500, `(en yüksek sıra: ${maxRank})`);
  check("sıralama alfabetik değil", introWords[0]?.de !== "ab", `(${introWords[0]?.de})`);

  const typingRounds = freshSession.rounds.filter((r) => r.game === "typing");
  check(
    "yazma turlarında eşanlamlı listesi var",
    typingRounds.every((r) => Array.isArray(r.alternatives)),
    `(${typingRounds.length} tur)`,
  );

  const skipWord = introWords[0];
  await markKnown(USER, skipWord.id);
  const [knownRow] = await db
    .select()
    .from(userWords)
    .where(and(eq(userWords.userId, USER), eq(userWords.wordId, skipWord.id)));
  check("zaten biliyorum: pekişmiş sayılıyor", knownRow.state === 2 && knownRow.intervalDays === 21);
  check(
    "zaten biliyorum: uzun süre sonraya planlandı",
    knownRow.dueAt.getTime() - Date.now() > 20 * 86400000,
  );
  const afterSkip = await buildSession(USER, day1);
  check(
    "atlanan kelime yeniden yeni olarak gelmiyor",
    !afterSkip.rounds.some((r) => r.game === "intro" && r.word.id === skipWord.id),
  );

  console.log("\n10) Seviye ilerlemesi ve meydan okuma");
  await reset();
  await ensureProfile(USER); // önce profil oluşsun, sonra tavan yükseltilsin
  await db.update(profiles).set({ level: "B1" }).where(eq(profiles.userId, USER));
  let lastLevel = "A1";
  let sawLevelUp = false;
  for (let i = 0; i < 8 && !sawLevelUp; i++) {
    const s = await buildSession(USER, day1);
    if (!s.rounds.length) break;
    const r = await submitAnswers(USER, answersFor(s.rounds, 1), day1, 60);
    lastLevel = r.activeLevel;
    if (r.levelUp) sawLevelUp = true;
  }
  check("hep doğru cevaplayınca seviye yükseliyor", sawLevelUp, `(son seviye: ${lastLevel})`);

  const beforeDown = lastLevel;
  let sawLevelDown = false;
  for (let i = 0; i < 8 && !sawLevelDown; i++) {
    const s = await buildSession(USER, day1);
    if (!s.rounds.length) break;
    const wrong = answersFor(s.rounds, 1).map((a) => ({ ...a, correct: false }));
    const r = await submitAnswers(USER, wrong, day1, 60);
    if (r.levelDown) sawLevelDown = true;
  }
  check("sürekli yanlışta seviye düşüyor", sawLevelDown, `(başlangıç: ${beforeDown})`);

  const challenge = await buildChallenge(USER);
  check("meydan okuma turu kuruluyor", challenge.rounds.length > 0, `(${challenge.rounds.length})`);
  check(
    "meydan okumada tanıtım kartı yok",
    challenge.rounds.every((r) => r.game !== "intro"),
  );

  console.log("\n11) SRS saf fonksiyon davranışı");
  let st: SrsState = {
    state: 0, ease: 2.5, intervalDays: 0, reps: 0, lapses: 0,
    correctStreak: 0, leech: false, dueAt: new Date(),
  };
  const intervals: number[] = [];
  for (let i = 0; i < 6; i++) {
    st = schedule(st, 5, new Date());
    intervals.push(st.intervalDays);
  }
  check("aralıklar büyüyor", intervals[5] > intervals[3] && intervals[3] > intervals[2],
    `(${intervals.join(", ")})`);
  check("hızlı doğru cevap 5 puan", grade("choice", true, 1000) === 5);
  check("yavaş doğru cevap 3 puan", grade("choice", true, 20000) === 3);
  check("yanlış cevap 3'ten küçük", grade("choice", false, 3000) < 3);
  const relapsed = schedule({ ...st, state: 2 }, 0, new Date());
  check("hata sonrası öğrenme adımına döner", relapsed.state === 1 && relapsed.intervalDays === 0);

  await reset();
  await pool.end();

  console.log(failures === 0 ? "\n✅ TÜM TESTLER GEÇTİ" : `\n❌ ${failures} test başarısız`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch(async (err) => {
  console.error(err);
  await pool.end();
  process.exit(1);
});
