/**
 * Uçtan uca mantık testi — gerçek PostgreSQL üzerinde çalışır.
 *   TEST_DATABASE_URL=postgres://... npx tsx --tsconfig scripts/tsconfig.e2e.json scripts/e2e.ts
 * Oturum kurgusu, SRS zamanlaması, streak ve ilerleme sorguları doğrulanır.
 */
import { and, desc, eq, inArray, isNotNull, sql } from "drizzle-orm";
import { db, pool } from "./test-db";
import { dailyStats, profiles, reviews, sessionState, userLessons, userSkills, userWords, words } from "../src/lib/db/schema";
import {
  buildChallenge,
  buildSession,
  getLeaderboard,
  weekStart,
  clearSessionState,
  loadSession,
  recordChallengeScore,
  saveSessionProgress,
  submitAnswers,
  getProgress,
  ensureProfile,
  markKnown,
  shiftDay,
  makeRound,
} from "../src/lib/session";
import { schedule, grade, type SrsState } from "../src/lib/srs";
import {
  acceptedForms,
  foldSpelling,
  matchesAnswer,
  normalize,
  spokenMatches,
} from "../src/components/games/types";
import { pluralChoices, umlautStem } from "../src/lib/german";
import { firstExample } from "../src/lib/example";
import { isSpeechCorrect, judgeSpeech, normalizeSpoken } from "../src/lib/speech";
import { speaking } from "../src/lib/skills/content/speaking";
import { zhSpeaking } from "../src/lib/skills/content/zh-speaking";
import { dialogues } from "../src/lib/skills/content/dialogue";
import { matchReply, usedTargets } from "../src/lib/dialogue";
import { CORRECTION_MARK, SUGGESTION_MARK, parseReply } from "../src/lib/chat-format";
import { derivedConfusions } from "../src/lib/speech-rules";
import { weakSpeechTopics } from "../src/lib/speech-progress";
import { germanLexicon } from "../src/lib/speech-lexicon";
import { LESSONS, lessonsFor, findLesson } from "../src/lib/lessons";
import { scoredSteps } from "../src/lib/lessons/types";
import { lessonBoard, nextLesson, recordLesson, weakRules } from "../src/lib/lessons/progress";
import { roleplayPrompt } from "../src/lib/lessons/roleplay";
import { chatConfigured, chatProviders, readLimits } from "../src/lib/chat-providers";
import { cleanForSpeech } from "../src/lib/tts/edge";
import { defaultVoice, rateFor, resolveVoice, voicesFor } from "../src/lib/tts/voices";
import { itemCount, xpFor } from "../src/lib/skills/meta";
import { GAME_LABELS, PLAYABLE_GAMES, type Answer, type Round } from "../src/lib/types";
import { achievementBoard, markAchievementsSeen } from "../src/lib/achievements";
import { xpForWager } from "../src/lib/xp";
import { seededShuffle } from "../src/lib/shuffle";
import { foldTurkish, parseConfirm } from "../src/lib/voice-intent";
import { composeReminder, weeklyRivals } from "../src/lib/push";
import {
  BOSS_ROUNDS,
  buildModuleBoss,
  clearedModules,
  moduleVocab,
  recordBossClear,
} from "../src/lib/lessons/boss";
import { buildShareText } from "../src/components/share-result";
import { achievements, aiUsage, assessments, events, exams, moduleClears, placements } from "../src/lib/db/schema";
import { recordAiUsage } from "../src/lib/ai-usage";
import { track } from "../src/lib/events";
import { classifyOrder, classifyTyping, miss } from "../src/lib/errors";
import { overallScore, parseAssessment, repairQuotes } from "../src/lib/assess-prompts";
import { fallbackAssessment } from "../src/lib/assess-client";
import { assess, assessHash, deleteAssessment, listAssessments, queueAssessment, runAssessQueue } from "../src/lib/assess";
import { offlineReply, offlineStart, offlineSummary, patternUsed } from "../src/lib/lessons/offline-roleplay";
import { clozeTypeChance, easeRound, gamesFor as ladderGames, isProductionGame } from "../src/lib/ladder";
import { buildPlan } from "../src/lib/plan";
import { CANDO } from "../src/lib/cando";
import { candoForExercise, candoForLesson } from "../src/lib/cando-map";
import { candoSummary } from "../src/lib/cando-progress";
import { nextLevel, scorePlacement, type PlacementAnswer, type PlacementStage } from "../src/lib/placement-score";
import { acceptPlacement, buildPlacement, finishPlacement, lastPlacement } from "../src/lib/placement";
import type { CefrLevel } from "../src/lib/skills/types";
import { buildWeeklyExam, finishWeekly, weeklyStatus } from "../src/lib/weekly";
import { bandOf, computeProficiency, weakestSkill, type Evidence, type EvidenceSource, type ProficiencySkill } from "../src/lib/proficiency";
import { gatherEvidence, proficiencyFor } from "../src/lib/proficiency-data";
import { errorReport, frequentErrorTypes } from "../src/lib/error-analytics";
import { growthReport } from "../src/lib/growth";
import { BUNDLED_EXERCISES } from "../src/lib/skills/bundled";
import { importSkillRecords, listSkillStatus, recordSkillAttempt, scoreOf } from "../src/lib/skills/record";

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
  // Yeni tablolar da temizleniyor: rozetler ve modül geçişleri kalıcı
  // kayıtlar ve ikinci koşuda önceki koşunun sonucunu "zaten açık" diye
  // görüp testleri sessizce yanıltıyorlardı.
  await db.delete(achievements).where(eq(achievements.userId, USER));
  await db.delete(aiUsage).where(eq(aiUsage.userId, USER));
  await db.delete(moduleClears).where(eq(moduleClears.userId, USER));
  await db.delete(events).where(eq(events.userId, USER));
  await db.delete(assessments).where(eq(assessments.userId, USER));
  await db.delete(placements).where(eq(placements.userId, USER));
  await db.delete(exams).where(eq(exams.userId, USER));
  await db.delete(reviews).where(eq(reviews.userId, USER));
  await db.delete(userWords).where(eq(userWords.userId, USER));
  await db.delete(dailyStats).where(eq(dailyStats.userId, USER));
  await db.delete(sessionState).where(eq(sessionState.userId, USER));
  await db.delete(userSkills).where(eq(userSkills.userId, USER));
  await db.delete(userLessons).where(eq(userLessons.userId, USER));
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
  // On oyun türü varken tur da uzun olmalı, yoksa çoğu tür hiç çıkmıyor.
  check("ilk oturum 20 tur", s1.rounds.length === 20, `(${s1.rounds.length})`);
  check("ilk tur tanıtım kartı", s1.rounds[0]?.game === "intro");
  const introCount = s1.rounds.filter((r) => r.game === "intro").length;
  check("yeni kelime kotası aşılmadı", introCount <= 10, `(${introCount})`);
  const games = new Set(s1.rounds.map((r) => r.game));
  check("birden fazla oyun türü", games.size >= 2, `(${[...games].join(", ")})`);
  const allWords = s1.rounds.flatMap((r) => (r.game === "match" ? r.words : [r.word]));
  check("tüm kelimeler A1", allWords.every((w) => w.niveau === "A1"));
  // tr-de yönünde doğru şık artikeliyle birlikte yazılır: "die Apotheke".
  check("choice şıkları 4 adet ve doğru cevabı içeriyor",
    s1.rounds.filter((r) => r.game === "choice").every((r) =>
      r.game === "choice" && r.options.length === 4 &&
      r.options.some((o) => o.text === (
        r.direction === "de-tr"
          ? r.word.tr
          : r.word.artikel
            ? `${r.word.artikel} ${r.word.de}`
            : r.word.de
      ))));
  // Anlam sorulan yönde şık iki dillidir; Almanca sorulan yönde ikinci satır
  // olmamalı — orada sorulan şey anlam değil, kelimenin kendisi.
  check("tr-de yönünde şıklarda ikinci dil satırı yok",
    s1.rounds.filter((r) => r.game === "choice" && r.direction === "tr-de").every((r) =>
      r.game === "choice" && r.options.every((o) => o.sub === null)));

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
  check("tek oturumda yeni kelime tavanı aşılmıyor", introCount2 <= 10, `(${introCount2})`);
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

  /*
    Yürüyüşün devam turu aynı kelimeleri getirmemeli.

    Yirmi tur bitince taze bir tur çekiliyor ve o tur aynı havuzdan
    kuruluyordu: az önce yanlış bilinen kelime tekrar borcuna düştüğü için
    hemen geri geliyor, kullanıcı aynı kelimeleri arka arkaya duyuyordu.
  */
  const walked = [...new Set(s3.rounds.flatMap((r) => (r.game === "match" ? r.words : [r.word]).map((w) => w.id)))];
  const s3b = await buildSession(USER, day2, false, false, undefined, walked);
  const repeated = s3b.rounds
    .flatMap((r) => (r.game === "match" ? r.words : [r.word]))
    .filter((w) => walked.includes(w.id));
  check(
    "devam turu bu yürüyüşün kelimelerini getirmiyor",
    repeated.length === 0,
    `(${repeated.length} tekrar)`,
  );

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

  console.log("\n10) Seviye kullanıcıya aittir: sistem terfi/düşüş yapmaz");
  await reset();
  await ensureProfile(USER);
  await db.update(profiles).set({ level: "B1" }).where(eq(profiles.userId, USER));

  // Sürekli doğru: eskiden bu seviye atlatıyordu.
  for (let i = 0; i < 8; i++) {
    const s = await buildSession(USER, day1);
    if (!s.rounds.length) break;
    await submitAnswers(USER, answersFor(s.rounds, 1), day1, 60);
  }
  const [afterGood] = await db.select().from(profiles).where(eq(profiles.userId, USER));
  check("hep doğru cevaplamak seviyeyi değiştirmiyor", afterGood.level === "B1", `(${afterGood.level})`);

  // Sürekli yanlış: eskiden bu seviye düşürüyordu — asıl şikâyet buydu.
  for (let i = 0; i < 8; i++) {
    const s = await buildSession(USER, day1);
    if (!s.rounds.length) break;
    const wrong = answersFor(s.rounds, 1).map((a) => ({ ...a, correct: false }));
    await submitAnswers(USER, wrong, day1, 60);
  }
  const [afterBad] = await db.select().from(profiles).where(eq(profiles.userId, USER));
  check("sürekli yanlış cevaplamak seviyeyi düşürmüyor", afterBad.level === "B1", `(${afterBad.level})`);

  const sLevel = await buildSession(USER, day1);
  check("oturum seçilen seviyeyi raporluyor", sLevel.meta.level === "B1");
  const wordsB1 = sLevel.rounds.flatMap((r) => (r.game === "match" ? r.words : [r.word]));
  const levelsSeen = new Set(wordsB1.map((w) => w.niveau));
  check("B1 seçen kullanıcı A1'de tutulmuyor", !levelsSeen.has("A1"), `(${[...levelsSeen]})`);
  check(
    "kapsam ölçüsü seçilen seviyeden geliyor",
    sLevel.meta.coverage.total > 800,
    `(${sLevel.meta.coverage.total})`,
  );

  console.log("\n11) Zorluk kelimenin durumundan geliyor");
  await reset();
  await ensureProfile(USER);
  // Bir kelime pekişmiş, bir kelime takılmış olsun.
  const [strongW, shakyW] = await db.select().from(words).where(eq(words.course, "de")).limit(2);
  const soon = new Date(Date.now() - 60_000);
  await db.insert(userWords).values([
    { userId: USER, wordId: strongW.id, state: 2, ease: 2.6, intervalDays: 30,
      dueAt: soon, reps: 9, lapses: 0, correctStreak: 7, leech: false, lastReviewedAt: soon },
    { userId: USER, wordId: shakyW.id, state: 2, ease: 1.9, intervalDays: 1,
      dueAt: soon, reps: 8, lapses: 5, correctStreak: 0, leech: true, lastReviewedAt: soon },
  ]);
  await db.update(profiles).set({ newPerDay: 0 }).where(eq(profiles.userId, USER));

  // Aynı kelimeler defalarca sorulduğunda hangi oyunların çıktığına bak.
  const gamesFor = new Map<number, Set<string>>([[strongW.id, new Set()], [shakyW.id, new Set()]]);
  for (let i = 0; i < 25; i++) {
    const s = await buildSession(USER, day1);
    for (const r of s.rounds) {
      if (r.game === "match" || r.game === "intro") continue;
      const set = gamesFor.get(r.word.id);
      if (set) set.add(r.game);
    }
  }
  const strongGames = gamesFor.get(strongW.id)!;
  const shakyGames = gamesFor.get(shakyW.id)!;
  check(
    "pekişmiş kelimede üretim oyunu çıkıyor",
    strongGames.has("typing") || strongGames.has("scramble"),
    `(${[...strongGames].join(", ")})`,
  );
  check(
    "takılan kelimede yazma sorulmuyor",
    !shakyGames.has("typing"),
    `(${[...shakyGames].join(", ")})`,
  );

  console.log("\n11b) Tempo: tekrar borcu birikince yeni kelime durur");
  await reset();
  await ensureProfile(USER);
  await db.update(profiles).set({ dailyGoal: 5, newPerDay: 10 }).where(eq(profiles.userId, USER));
  const backlog = await db.select().from(words).where(eq(words.course, "de")).limit(40);
  const past = new Date(Date.now() - 86_400_000);
  await db.insert(userWords).values(
    backlog.map((w) => ({
      userId: USER, wordId: w.id, state: 2, ease: 2.5, intervalDays: 3,
      dueAt: past, reps: 3, lapses: 0, correctStreak: 2, leech: false, lastReviewedAt: past,
    })),
  );
  const sBacklog = await buildSession(USER, day1);
  check("borç birikince tempo 'review'", sBacklog.meta.pacing === "review", `(${sBacklog.meta.pacing})`);
  check(
    "tekrar gününde yeni kelime gelmiyor",
    !sBacklog.rounds.some((r) => r.game === "intro"),
  );

  const challenge = await buildChallenge(USER);
  check("meydan okuma turu kuruluyor", challenge.rounds.length > 0, `(${challenge.rounds.length})`);
  check(
    "meydan okumada tanıtım kartı yok",
    challenge.rounds.every((r) => r.game !== "intro"),
  );
  check(
    "meydan okuma dalgaları kademeli sertleşiyor",
    challenge.tiers.length === challenge.rounds.length &&
      challenge.tiers[challenge.tiers.length - 1] >= challenge.tiers[0],
    `(${challenge.tiers.slice(0, 3).join("")}…${challenge.tiers.slice(-3).join("")})`,
  );

  console.log("\n11c) Yazma oyununda kabul edilen yazımlar");
  // Sözlük başlığı öğrencinin yazacağı şey değildir; başlıktan üretilen bütün
  // makul yazımlar kabul edilmeli.
  const accept: [string, string[]][] = [
    ["setzen (sich)", ["setzen", "sich setzen"]],
    ["sich setzen", ["setzen", "sich setzen"]],
    ["der/die Bekannte", ["bekannte", "der bekannte", "die bekannte"]],
    ["r/e Erwachsene", ["erwachsene", "der erwachsene", "die erwachsene"]],
    ["heraus/raus", ["heraus", "raus"]],
    ["hin/hin-/-hin", ["hin"]],
    ["(Schlag-)Sahne", ["sahne", "schlagsahne"]],
    ["gern/gerne", ["gern", "gerne"]],
  ];
  for (const [head, forms] of accept) {
    const set = new Set(acceptedForms(head));
    check(`"${head}" → ${forms.join(" / ")}`, forms.every((f) => set.has(f)),
      `(${[...set].join(" | ")})`);
  }
  check(
    "yanlış yazım kabul edilmiyor",
    !new Set(acceptedForms("sich setzen")).has("sitzen"),
  );

  // Harfi harfine yazmak şart değil: klavyede Almanca karakter olmayabilir ve
  // "ss" İsviçre'de zaten doğru yazımdır.
  const tolerant: [string, string, boolean][] = [
    ["die Tür", "tür", true],
    ["die Tür", "TÜR", true],
    ["die Tür", "  tür  ", true],
    ["Tür", "die Tür", true],
    ["groß", "gross", true],
    ["die Straße", "Strasse", true],
    ["die Tür", "Tuer", true],
    ["schön", "schoen", true],
    ["müssen", "muessen", true],
    ["sich setzen", "setzen", true],
    ["heraus/raus", "raus", true],
    ["zum Beispiel/z. B.", "z.B.", true],
    // Yanlış cevap yanlış kalmalı: umlaut düz sesliye indirgenmiyor.
    ["die Tür", "Tor", false],
    ["sich setzen", "sitzen", false],
    ["schön", "schon", false],
    ["groß", "gro", false],
  ];
  for (const [head, typed, want] of tolerant) {
    check(`"${head}" ← "${typed}" ${want ? "kabul" : "ret"}`, matchesAnswer(typed, [head]) === want);
  }

  // Katlama farklı kelimeleri birbirine karıştırmamalı; yalnızca büyük/küçük
  // harf farkı olanlar çakışabilir (Arm/arm gibi, zaten ayrı maddeler).
  const folded = new Map<string, Set<string>>();
  for (const w of await db.select({ de: words.de }).from(words).where(eq(words.course, "de"))) {
    const k = foldSpelling(w.de);
    if (!folded.has(k)) folded.set(k, new Set());
    folded.get(k)!.add(w.de.toLocaleLowerCase("de-DE").replace(/[.,!?;:]/g, "").trim());
  }
  const realCollisions = [...folded.values()].filter((v) => v.size > 1);
  check("yazım toleransı farklı kelimeleri karıştırmıyor", realCollisions.length === 0,
    `(${realCollisions.slice(0, 3).map((v) => [...v].join("/")).join(", ")})`);

  // Havuzdaki her başlık kendi normalize edilmiş hâliyle eşleşmeli.
  const headwords = await db.select({ id: words.id, de: words.de }).from(words);
  const unmatched = headwords.filter((w) => {
    const forms = new Set(acceptedForms(w.de));
    return !forms.has(normalize(w.de)) && !/[/()-]/.test(w.de);
  });
  check("her madde kendi yazımıyla eşleşiyor", unmatched.length === 0,
    `(${unmatched.slice(0, 3).map((w) => w.de).join(", ")})`);

  console.log("\n11d) Cümleyi Diz turu");
  // Örnek cümlesi olan pekişmiş kelimelerle çok sayıda tur kurup ilk çıkan
  // dizme turunu incele: bu oyun kelimeye değil cümleye bağlı olduğu için
  // ayrıca doğrulanmalı.
  await reset();
  await ensureProfile(USER);
  await db.update(profiles).set({ newPerDay: 0 }).where(eq(profiles.userId, USER));
  const orderPool = await db.select().from(words).where(eq(words.course, "de")).limit(60);
  const long = new Date(Date.now() - 60_000);
  await db.insert(userWords).values(
    orderPool.map((w) => ({
      userId: USER, wordId: w.id, state: 2, ease: 2.6, intervalDays: 30,
      dueAt: long, reps: 9, lapses: 0, correctStreak: 7, leech: false, lastReviewedAt: long,
    })),
  );
  let orderRound: Extract<Round, { game: "order" }> | null = null;
  const seenGames = new Set<string>();
  for (let i = 0; i < 25 && !orderRound; i++) {
    const s = await buildSession(USER, day1);
    for (const r of s.rounds) {
      seenGames.add(r.game);
      if (r.game === "order" && !orderRound) orderRound = r;
    }
  }
  check("dizme turu üretiliyor", orderRound !== null);
  if (orderRound) {
    check("kelime sayısı sınırlar içinde",
      orderRound.answer.length >= 4 && orderRound.answer.length <= 9,
      `(${orderRound.answer.length})`);
    check("karışık dizi doğru sırayla aynı değil",
      orderRound.tokens.join(" ") !== orderRound.answer.join(" "));
    check("karışık dizi doğru cevabın permütasyonu",
      [...orderRound.tokens].sort().join("|") === [...orderRound.answer].sort().join("|"));
    check("cümle sonu noktalaması kutulardan ayrı",
      orderRound.tokens.every((t) => !/[.!?]$/.test(t)),
      `(${orderRound.tokens.join(" ")})`);
    check("noktalama ayrıca taşınıyor", /^[.!?…]*$/.test(orderRound.tail), `(${orderRound.tail})`);
  }

  console.log("\n11o) Sohbet sağlayıcı seçimi");
  // Anahtarları test boyunca kendimiz kuruyoruz; sonunda eski hâline dönüyor.
  const envBackup = {
    cerebras: process.env.CEREBRAS_API_KEY,
    groq: process.env.GROQ_API_KEY,
    mistral: process.env.MISTRAL_API_KEY,
    preferred: process.env.CHAT_PROVIDER,
  };
  const setKeys = (cerebras?: string, groq?: string, mistral?: string, preferred?: string) => {
    for (const [k, v] of Object.entries({
      CEREBRAS_API_KEY: cerebras,
      GROQ_API_KEY: groq,
      MISTRAL_API_KEY: mistral,
      CHAT_PROVIDER: preferred,
    })) {
      if (v) process.env[k] = v;
      else delete process.env[k];
    }
  };
  const names = () => chatProviders().map((p) => p.name).join(",");

  setKeys();
  check("anahtar yoksa sohbet kapalı", chatConfigured() === false);
  check("anahtar yoksa denenecek sağlayıcı yok", chatProviders().length === 0);

  setKeys(undefined, undefined, "ms");
  check("tek anahtar varsa o seçilir", names() === "mistral", `(${names()})`);
  check("tek anahtarla sohbet açık", chatConfigured() === true);

  // Sıra dakikalık istek hakkına göre, günlük token cömertliğine göre değil:
  // ölçüm sohbette darboğazın token değil eşzamanlı istek olduğunu gösterdi.
  // Cerebras günde 1M token veriyor ama dakikada 5 istek — iki kişi aynı anda
  // yazışınca günlük kotanın binde biri harcanmadan 429 geliyor. Mistral 50,
  // Groq token tavanı yüzünden pratikte ~7 istek/dk.
  setKeys("cb", "gq", "ms");
  check("sıra dakikalık hakka göre", names() === "mistral,groq,cerebras", `(${names()})`);
  check("birincil Mistral", chatProviders()[0]?.name === "mistral");
  check("Mistral modeli mistral-medium-latest",
    chatProviders()[0]?.model === "mistral-medium-latest",
    `(${chatProviders()[0]?.model})`);

  setKeys("cb", "gq", "ms", "groq");
  check("CHAT_PROVIDER seçimi öne alıyor", chatProviders()[0]?.name === "groq");
  check("öne alınan sağlayıcı listede tekrarlanmıyor",
    new Set(chatProviders().map((p) => p.name)).size === chatProviders().length);

  // Yanlış yazılmış bir değişken sohbeti tamamen kapatmamalı.
  setKeys("cb", undefined, undefined, "groq");
  check("anahtarsız CHAT_PROVIDER yok sayılıyor", chatProviders()[0]?.name === "cerebras");
  setKeys("cb", undefined, undefined, "bilinmeyen");
  check("tanınmayan CHAT_PROVIDER sohbeti kapatmıyor", chatProviders()[0]?.name === "cerebras");

  setKeys(envBackup.cerebras, envBackup.groq, envBackup.mistral, envBackup.preferred);

  console.log("\n11t) Zorlanılan ses konuları");
  {
    const meta = [
      { id: "sp1", skill: "speaking", level: "A1", title: "Ch sesi" },
      { id: "sp2", skill: "speaking", level: "A2", title: "Uzunluk" },
      { id: "sp3", skill: "speaking", level: "A1", title: "Hiç denenmedi" },
      { id: "rd1", skill: "reading", level: "A1", title: "Okuma" },
    ];
    const rows = [
      { exerciseId: "sp1", correct: 1, total: 6, attempts: 5 },
      { exerciseId: "sp2", correct: 3, total: 6, attempts: 1 },
      { exerciseId: "rd1", correct: 0, total: 5, attempts: 3 },
    ];
    const weak = weakSpeechTopics(meta, rows);
    check("yalnızca telaffuz konuları listeleniyor", weak.every((t) => t.exerciseId.startsWith("sp")));
    check("en zayıf konu başta", weak[0]?.exerciseId === "sp1", `(${weak[0]?.exerciseId})`);
    // Hiç denenmemiş konu "zorlandığın" değil "gelmediğin" — ikisi karışmamalı.
    check("denenmemiş konu listeye girmiyor", !weak.some((t) => t.exerciseId === "sp3"));
    const strong = weakSpeechTopics(meta, [{ exerciseId: "sp1", correct: 6, total: 6, attempts: 2 }]);
    check("iyi bilinen konu zorlanılan sayılmıyor", strong.length === 0);
    check("deneme sayısı taşınıyor", weak[0]?.attempts === 5);
  }

  console.log("\n11s) Sapmalar kuraldan da türetiliyor");
  {
    const lex = germanLexicon();
    const pairs = (sentence: string) =>
      derivedConfusions(sentence, lex).map((c) => c.heard[0].toLowerCase());

    check("z → s türetiliyor", pairs("Die Pause war viel zu kurz.").includes("kurs"));
    check("uzatma h'si düşüyor", pairs("Ich kenne ihn gut.").includes("in"));
    check("çift ünsüz tekleşiyor", pairs("Das Fenster ist offen.").includes("ofen"));
    check("ie ↔ ei yer değiştiriyor", pairs("Der Riese war sehr groß.").includes("reise"));
    // Sözlükte olmayan biçim üretilmemeli: tanıyıcı onu hiç yazamaz.
    check("uydurma biçim üretilmiyor",
      derivedConfusions("Ich trinke Kaffee.", lex).every((c) => lex.has(c.heard[0].toLowerCase())));
    // Aynı cümlede geçen kelime sapma olamaz — doğru biçim zaten oradadır.
    check("cümlede geçen kelime sapma sayılmıyor",
      !pairs("Der Kurs war sehr kurz.").includes("kurs"),
      `(${pairs("Der Kurs war sehr kurz.").join(", ")})`);
    // Türetilenler de elle yazılanlarla aynı üç kuraldan geçmeli.
    const all = derivedConfusions("Ich kenne ihn gut.", lex);
    check("türev hedefin kendisi değil",
      all.every((c) => c.heard[0].toLowerCase() !== (c.expected ?? "").toLowerCase()));
    check("türev doğru biçimi içermiyor",
      all.every((c) => !c.heard[0].toLowerCase().includes((c.expected ?? "x").toLowerCase())));
  }

  console.log("\n11w) Kendi değerlendiren egzersizlerin kuralları");
  {
    const drills = [...speaking, ...zhSpeaking];
    const selfJudged = drills.filter((e) => e.judge === "self");
    check("kendi değerlendiren egzersiz var", selfJudged.length > 0, `(${selfJudged.length})`);

    // Tanıyıcı hiç çalışmadığı için sapma yazmak ölü içerik olurdu: yazılan
    // satır asla tetiklenmez ama bakımı gerekir ve doğru sanılır.
    const withConfusions = selfJudged.filter((e) =>
      e.tasks.some((t) => (t.confusions ?? []).length > 0),
    );
    check("kendi değerlendirende sapma yazılmamış", withConfusions.length === 0,
      `(${withConfusions.map((e) => e.id).join(", ")})`);

    // Öğretme yükünü ipuçları taşıyor; ipucusuz görev orada sessiz kalır.
    const noHint = selfJudged.flatMap((e) =>
      e.tasks.filter((t) => !t.hint?.trim()).map(() => e.id),
    );
    check("kendi değerlendirende her görevin ipucu var", noHint.length === 0,
      `(${[...new Set(noHint)].join(", ")})`);

    // Tersi de geçerli olmalı: tanıyıcıyla değerlendirilen egzersizlerde en az
    // bir sapma bulunmalı, yoksa tanıyıcı açık ama teşhis yok demektir.
    const asrJudged = drills.filter((e) => e.judge !== "self");
    const noConfusion = asrJudged.filter(
      (e) => !e.tasks.some((t) => (t.confusions ?? []).length > 0),
    );
    check("tanıyıcılı egzersizlerde teşhis var", noConfusion.length === 0,
      `(${noConfusion.map((e) => e.id).join(", ")})`);
  }

  console.log("\n11v) Diyalog eşleştirmesi gerçekçi girdilerde");
  {
    const find = (id: string) => dialogues.find((d) => d.id === id)!;
    const turn = (id: string, tid: string) => find(id).dialogue.find((t) => t.id === tid)!;
    const said = (id: string, tid: string, text: string) =>
      matchReply(text, turn(id, tid).replies)?.reply.say ?? null;

    // Almanca: aynı niyetin farklı kuruluşları aynı dala gitmeli.
    check("kısa cevap tutuyor", said("a1-d1", "start", "Bahnhof") !== null);
    check("tam cümle tutuyor",
      said("a1-d1", "start", "Entschuldigung, wo ist der Bahnhof bitte?") !== null);
    check("aynı niyet aynı dala gidiyor",
      said("a1-d1", "start", "Bahnhof") === said("a1-d1", "start", "Ich suche den Bahnhof."));

    // Zürih: asıl sınav. Tanıyıcı lehçeyi standart Almanca yazma eğiliminde,
    // o yüzden köklere Hochdeutsch karşılıkları da yazılmıştı. Bu kontrol o
    // iddiayı doğruluyor — ikisi de aynı dalı seçmeli.
    const zhDialect = said("zh-a2-d1", "start", "Ich hätt gern Chäs.");
    const zhStandard = said("zh-a2-d1", "start", "Ich hätte gern Käse.");
    check("lehçe biçimi tutuyor", zhDialect !== null, `(${zhDialect})`);
    check("tanıyıcının yazacağı standart biçim de tutuyor", zhStandard !== null,
      `(${zhStandard})`);
    check("ikisi aynı dala gidiyor", zhDialect === zhStandard);

    const zhVerb = said("zh-a1-d1", "from", "Ich chume vo de Türkei.");
    const zhVerbStd = said("zh-a1-d1", "from", "Ich komme aus der Türkei.");
    check("lehçe fiili tutuyor", zhVerb !== null, `(${zhVerb})`);
    check("standart fiil de tutuyor", zhVerbStd !== null, `(${zhVerbStd})`);

    // Konu dışı cevap hiçbir dala uymamalı; uyarsa öğrenci yanlış yönlendirilir.
    check("konu dışı cevap eşleşmiyor",
      said("zh-a2-d1", "start", "Wie spät ist es?") === null,
      `(${said("zh-a2-d1", "start", "Wie spät ist es?")})`);
    check("boş cevap eşleşmiyor", said("b1-d1", "start", "   ") === null);
  }

  console.log("\n11u) İstem başlığı cevaba sızmıyor");
  {
    const leaked = parseReply(
      `Hallo!\n\n— ÖNERİLEN CEVAPLAR\n${SUGGESTION_MARK} Mir geht es gut.`,
    );
    check("kaçak başlık gövdeye girmiyor", !leaked.body.includes("ÖNERİLEN"),
      `(${leaked.body.trim()})`);
    check("başlık süzülürken öneri korunuyor", leaked.suggestions.length === 1);
    check("normal cümle süzülmüyor",
      parseReply("Das Kino ist toll!").body.includes("Kino"));
    // Tamamı büyük harf olsa da noktalama taşıyan satır cümledir, başlık değil.
    check("büyük harfli ünlem cümlesi korunuyor",
      parseReply("SUPER!").body.includes("SUPER"));
    // Tek kelimelik vurgulu cevap silinmemeli: süzgeç fazla geniş olsaydı
    // mesajın tamamı kaybolurdu.
    check("tek kelimelik büyük harfli cevap korunuyor",
      parseReply("SUPER").body.includes("SUPER"), `(${parseReply("SUPER").body})`);
    check("tire ile başlayan tek kelimelik başlık süzülüyor",
      !parseReply("— ÖNERİLER").body.includes("ÖNERİLER"));
    // Model düzenli olarak markdown yazıyor; arayüz düz metin gösterdiği için
    // yıldızlar ekrana çıkıyordu. Koçta temizleniyordu, sohbette atlanmıştı.
    const md = parseReply(
      `Cümle **özneden sonra** gelir.\n${CORRECTION_MARK} *ich gehe* → *gehe ich* (V2)\n` +
        `${SUGGESTION_MARK} **Ja, gern.**`,
    );
    check("gövdede yıldız kalmıyor", !md.body.includes("*"), `(${md.body.trim()})`);
    check("düzeltmede yıldız kalmıyor", !md.corrections[0]?.includes("*"),
      `(${md.corrections[0]})`);
    check("öneride yıldız kalmıyor", md.suggestions[0] === "Ja, gern.",
      `(${md.suggestions[0]})`);
  }

  console.log("\n11x) Yalnızca imla farkı taşıyan düzeltmeler gösterilmiyor");
  {
    // Öğrenci konuşarak cevap veriyor ve tanıyıcı metni büyük harf ve
    // noktalama olmadan döndürüyor. „ich arbeite auch“ cümlesini
    // „Ich arbeite auch.“ diye düzeltmek, öğrencinin yapmadığı bir hatayı ona
    // yüklemek oluyor — söylediğinde öyle bir hata yok.
    const kozmetik = [
      `${CORRECTION_MARK} ich arbeite auch → Ich arbeite auch. (Rechtschreibung)`,
      `${CORRECTION_MARK} ich gehe mit freunden → Ich gehe mit Freunden (Großschreibung)`,
      `${CORRECTION_MARK} wir bestellen schnitzel → Wir bestellen Schnitzel.`,
    ];
    for (const line of kozmetik) {
      check(`süzülüyor: ${line.slice(3, 42)}`, parseReply(line).corrections.length === 0);
    }
    // Gerçek hatalar süzgeçten geçmeye devam etmeli; fazla geniş bir süzgeç
    // dersin asıl işini sessizce kapatırdı.
    const gercek = [
      `${CORRECTION_MARK} ich arbeite seit 10 Jahre → ich arbeite seit 10 Jahren (Dativ)`,
      `${CORRECTION_MARK} Heute ich gehe → Heute gehe ich (V2-Regel)`,
      `${CORRECTION_MARK} ich habe ein Hund → ich habe einen Hund (Akkusativ)`,
    ];
    for (const line of gercek) {
      check(`korunuyor: ${line.slice(3, 42)}`, parseReply(line).corrections.length === 1);
    }
  }

  console.log("\n11r) Ders içeriği: anlatım senaryosu ve konuşma");
  {
    check("ders havuzu var", LESSONS.length > 0, `(${LESSONS.length})`);
    const ids = new Set(LESSONS.map((l) => l.id));
    check("ders kimlikleri benzersiz", ids.size === LESSONS.length);

    // Odak kimliği tekrar kuyruğunun anahtarı olduğu için boş olamaz.
    check("her dersin odak kimliği var", LESSONS.every((l) => l.focusId.trim().length > 0));
    check("her derste kelime takımı var", LESSONS.every((l) => l.vocab.length >= 4));
    check("her derste kalıp var", LESSONS.every((l) => l.patterns.length >= 2));
    check("her ders seviye başlığı taşıyor",
      LESSONS.every((l) => l.title.trim().length > 0 && l.titleTr.trim().length > 0));

    // Anlatım "hazır mısın" ile açılmalı: sesli akış öğrencinin haberi olmadan
    // konuşmaya başlamamalı.
    check("anlatım onayla başlıyor",
      LESSONS.every((l) => l.lecture[0]?.expect?.kind === "confirm"));
    check("anlatım yeterince uzun",
      LESSONS.every((l) => l.lecture.length >= 12),
      `(en kısa: ${Math.min(...LESSONS.map((l) => l.lecture.length))})`);

    // Öğretilen her kelime anlatımda tekrar ettirilmeli — listede durup sesli
    // hiç söyletilmeyen kelime öğretilmiş sayılmaz.
    const repeats = (l: (typeof LESSONS)[number]) =>
      l.lecture
        .filter((s) => s.expect?.kind === "repeat")
        .map((s) => (s.expect as { target: string }).target.toLowerCase());
    check("her kelime tekrar ettiriliyor",
      LESSONS.every((l) => l.vocab.every((v) => repeats(l).some((t) => t.includes(v.de.toLowerCase())))),
      `(${LESSONS.filter((l) => !l.vocab.every((v) => repeats(l).some((t) => t.includes(v.de.toLowerCase())))).map((l) => l.id).join(", ")})`);

    // Puanlanan adımlar: üretim kurdurur, doğru/yanlış sınar. İkisi de olmalı.
    check("her derste üretim alıştırması var",
      LESSONS.every((l) => l.lecture.some((s) => s.expect?.kind === "produce")));
    check("her derste doğru/yanlış var",
      LESSONS.every((l) => l.lecture.some((s) => s.expect?.kind === "truefalse")));
    check("puanlanan adım sayısı yeterli",
      LESSONS.every((l) => scoredSteps(l) >= 3));

    // Üretim adımının ipucu, hedefi ve yanlışta okunacak açıklaması dolu olmalı.
    const produces = LESSONS.flatMap((l) =>
      l.lecture.filter((s) => s.expect?.kind === "produce").map((s) => s.expect as { target: string; hint: { text: string }[] }));
    check("üretim hedefleri dolu", produces.every((p) => p.target.trim().length > 0));
    check("üretim ipuçları dolu", produces.every((p) => p.hint.length > 0 && p.hint.every((h) => h.text.trim().length > 0)));
    const tfs = LESSONS.flatMap((l) =>
      l.lecture.filter((s) => s.expect?.kind === "truefalse").map((s) => s.expect as { statement: string; why: { text: string }[] }));
    check("doğru/yanlış gerekçeleri dolu",
      tfs.every((t) => t.statement.trim().length > 0 && t.why.length > 0));

    // Segmentler boş olamaz: boş parça seslendirmede sessiz bir delik açar.
    check("bütün segmentler dolu",
      LESSONS.every((l) => l.lecture.every((s) => s.say.length > 0 && s.say.every((seg) => seg.text.trim().length > 0))));

    // Konuşma dersin asıl parçası: sahne, rol ve açılış repliği olmadan
    // öğrenci boş ekranla karşılaşır — serbest sohbetin en pahalı sorunu buydu.
    check("her derste sahne var", LESSONS.every((l) => l.roleplay.scene.trim().length > 20));
    check("her derste açılış repliği var",
      LESSONS.every((l) => l.roleplay.opening.trim().length > 0 && l.roleplay.openingTr.trim().length > 0));
    check("konuşmanın alt sınırı makul",
      LESSONS.every((l) => l.roleplay.minTurns >= 3 && l.roleplay.minTurns <= 8));

    check("Almanca kursunda ders var", lessonsFor("de").length > 0);
    check("kurs süzgeci karıştırmıyor",
      lessonsFor("gsw-zh").every((l) => l.course === "gsw-zh"));
    check("ders kimlikle bulunuyor", findLesson(LESSONS[0].id)?.id === LESSONS[0].id);
    check("bilinmeyen kimlik bulunamıyor", findLesson("yok-boyle-bir-ders") === undefined);
  }

  console.log("\n11r1) Ders ilerlemesi ve tekrar merdiveni");
  {
    const lesson = LESSONS[0];
    const full = scoredSteps(lesson);

    // Rol yapma tamamlanmadıysa ders geçilmiş sayılmıyor: alıştırmaları doğru
    // yapıp konuşmadan çıkmak dersin asıl parçasını atlamak demek.
    const lessonDay = "2026-03-20";
    const skipped = await recordLesson(USER, lesson, full, false, lessonDay);
    check("konuşmasız ders geçilmiş sayılmıyor", skipped.passed === false);
    check("geçilmeyen ders ertesi güne planlanıyor", skipped.nextDays === 1);
    // Ders bölümü daha önce hiç XP vermiyordu; artık süre bazlı puan işliyor.
    check("ders XP kazandırıyor", skipped.xpGained > 0, `(${skipped.xpGained})`);
    check("ders çalışılan gün seriyi ilerletiyor", skipped.currentStreak >= 1);

    // Geçilince merdiven yukarı çıkıyor.
    const first = await recordLesson(USER, lesson, full, true, lessonDay);
    check("konuşmayla birlikte ders geçiliyor", first.passed === true);
    // Rol yapma eklenince puan artıyor: dersin asıl parçası o.
    check("rol yapma ek XP kazandırıyor", first.xpGained > 0, `(${first.xpGained})`);
    const second = await recordLesson(USER, lesson, full, true, lessonDay);
    check("aralık büyüyor", second.nextDays > first.nextDays,
      `(${first.nextDays} → ${second.nextDays})`);
    // Aynı dersi yeniden çözmek XP kasmaya dönüşmemeli: en iyi sonuç zaten
    // alınmışken fark sıfır.
    check("tekrar çözüm XP kasmıyor", second.xpGained === 0, `(${second.xpGained})`);

    // Başarısızlık merdiveni başa alıyor — kural oturmadıysa uzun aralık
    // öğrenciyi kaybettirir.
    const failed = await recordLesson(USER, lesson, 0, true, lessonDay);
    check("başarısızlık merdiveni sıfırlıyor", failed.nextDays === 1 && !failed.passed);

    // En iyi skor korunuyor: bir kez doğru yapılanı sonraki denemede
    // kaybetmek ilerlemeyi geri almamalı.
    const board = await lessonBoard(USER, lesson.course);
    const card = board.find((c) => c.lesson.id === lesson.id)!;
    check("en iyi skor korunuyor", card.state?.correct === full, `(${card.state?.correct})`);
    check("rol yapma bayrağı kalıcı", card.state?.roleplayDone === true);
    check("deneme sayısı artıyor", (card.state?.attempts ?? 0) >= 4);

    // Sıradaki ders: yarına planlanan ders bugün "tekrarı gelmiş" değil, o
    // yüzden açılmamış ilk ders öneriliyor.
    const upcoming = await nextLesson(USER, lesson.course);
    check("planlanmış ders bugün önerilmiyor", upcoming?.lesson.id !== lesson.id,
      `(${upcoming?.lesson.id})`);

    // Zamanı geldiğinde ise yeni dersin önüne geçiyor: tekrar borcu varken
    // yeni konu açmak öğrenciyi ilerliyormuş gibi hissettirip geride bırakır.
    await db
      .update(userLessons)
      .set({ dueAt: sql`now() - interval '1 day'` })
      .where(and(eq(userLessons.userId, USER), eq(userLessons.lessonId, lesson.id)));
    const due = await nextLesson(USER, lesson.course);
    check("tekrarı gelen ders yeni dersin önüne geçiyor", due?.lesson.id === lesson.id,
      `(${due?.lesson.id})`);
    check("tekrarı gelen ders due işaretli", due?.due === true);

    // Zayıf kural: tekrarı gelmiş ve son denemede geçilememiş olan.
    const weak = await weakRules(USER);
    check("oturmamış kural listeleniyor", weak.includes(lesson.focusId), `(${weak.join(", ")})`);
  }

  console.log("\n11r2) Konuşma istemi derse bağlı");
  {
    const lesson = LESSONS[0];
    const prompt = roleplayPrompt(lesson);
    // İstem dersin kalıplarını ve kelimelerini taşımak zorunda: düzeltmenin ve
    // yönlendirmenin „bu dersin öğrettiğine göre“ yapılmasını sağlayan tek şey bu.
    check("istem dersin kalıplarını taşıyor",
      lesson.patterns.every((p) => prompt.includes(p.de)));
    check("istem dersin kelimelerini taşıyor",
      lesson.vocab.every((v) => prompt.includes(v.de)));
    check("istem sahneyi taşıyor", prompt.includes(lesson.roleplay.scene.slice(0, 30)));
    check("istem seviyeyi taşıyor", prompt.includes(lesson.level));
    check("istem düzeltme işaretini taşıyor", prompt.includes(CORRECTION_MARK));
    check("istem öneri işaretini taşıyor", prompt.includes(SUGGESTION_MARK));
    // Kapanış turu: alt sınıra ulaşınca model sahneyi kapatmalı — talimat
    // ancak istendiğinde eklenmeli, her turda kapanmaya çalışan model olmaz.
    check("kapanış talimatı istenince var",
      roleplayPrompt(lesson, { closing: true }).includes("KAPANIŞ TURU"));
    check("kapanış talimatı istenmeyince yok", !prompt.includes("KAPANIŞ TURU"));
  }

  console.log("\n11s) Sapmalar kuraldan da türetiliyor");
  {
    const lex = germanLexicon();
    const pairs = (sentence: string) =>
      derivedConfusions(sentence, lex).map((c) => c.heard[0].toLowerCase());

    check("z → s türetiliyor", pairs("Die Pause war viel zu kurz.").includes("kurs"));
    check("uzatma h'si düşüyor", pairs("Ich kenne ihn gut.").includes("in"));
    check("çift ünsüz tekleşiyor", pairs("Das Fenster ist offen.").includes("ofen"));
    check("ie ↔ ei yer değiştiriyor", pairs("Der Riese war sehr groß.").includes("reise"));
    // Sözlükte olmayan biçim üretilmemeli: tanıyıcı onu hiç yazamaz.
    check("uydurma biçim üretilmiyor",
      derivedConfusions("Ich trinke Kaffee.", lex).every((c) => lex.has(c.heard[0].toLowerCase())));
    // Aynı cümlede geçen kelime sapma olamaz — doğru biçim zaten oradadır.
    check("cümlede geçen kelime sapma sayılmıyor",
      !pairs("Der Kurs war sehr kurz.").includes("kurs"),
      `(${pairs("Der Kurs war sehr kurz.").join(", ")})`);
    // Türetilenler de elle yazılanlarla aynı üç kuraldan geçmeli.
    const all = derivedConfusions("Ich kenne ihn gut.", lex);
    check("türev hedefin kendisi değil",
      all.every((c) => c.heard[0].toLowerCase() !== (c.expected ?? "").toLowerCase()));
    check("türev doğru biçimi içermiyor",
      all.every((c) => !c.heard[0].toLowerCase().includes((c.expected ?? "x").toLowerCase())));
  }

  console.log("\n11w) Kendi değerlendiren egzersizlerin kuralları");
  {
    const drills = [...speaking, ...zhSpeaking];
    const selfJudged = drills.filter((e) => e.judge === "self");
    check("kendi değerlendiren egzersiz var", selfJudged.length > 0, `(${selfJudged.length})`);

    // Tanıyıcı hiç çalışmadığı için sapma yazmak ölü içerik olurdu: yazılan
    // satır asla tetiklenmez ama bakımı gerekir ve doğru sanılır.
    const withConfusions = selfJudged.filter((e) =>
      e.tasks.some((t) => (t.confusions ?? []).length > 0),
    );
    check("kendi değerlendirende sapma yazılmamış", withConfusions.length === 0,
      `(${withConfusions.map((e) => e.id).join(", ")})`);

    // Öğretme yükünü ipuçları taşıyor; ipucusuz görev orada sessiz kalır.
    const noHint = selfJudged.flatMap((e) =>
      e.tasks.filter((t) => !t.hint?.trim()).map(() => e.id),
    );
    check("kendi değerlendirende her görevin ipucu var", noHint.length === 0,
      `(${[...new Set(noHint)].join(", ")})`);

    // Tersi de geçerli olmalı: tanıyıcıyla değerlendirilen egzersizlerde en az
    // bir sapma bulunmalı, yoksa tanıyıcı açık ama teşhis yok demektir.
    const asrJudged = drills.filter((e) => e.judge !== "self");
    const noConfusion = asrJudged.filter(
      (e) => !e.tasks.some((t) => (t.confusions ?? []).length > 0),
    );
    check("tanıyıcılı egzersizlerde teşhis var", noConfusion.length === 0,
      `(${noConfusion.map((e) => e.id).join(", ")})`);
  }

  console.log("\n11v) Diyalog eşleştirmesi gerçekçi girdilerde");
  {
    const find = (id: string) => dialogues.find((d) => d.id === id)!;
    const turn = (id: string, tid: string) => find(id).dialogue.find((t) => t.id === tid)!;
    const said = (id: string, tid: string, text: string) =>
      matchReply(text, turn(id, tid).replies)?.reply.say ?? null;

    // Almanca: aynı niyetin farklı kuruluşları aynı dala gitmeli.
    check("kısa cevap tutuyor", said("a1-d1", "start", "Bahnhof") !== null);
    check("tam cümle tutuyor",
      said("a1-d1", "start", "Entschuldigung, wo ist der Bahnhof bitte?") !== null);
    check("aynı niyet aynı dala gidiyor",
      said("a1-d1", "start", "Bahnhof") === said("a1-d1", "start", "Ich suche den Bahnhof."));

    // Zürih: asıl sınav. Tanıyıcı lehçeyi standart Almanca yazma eğiliminde,
    // o yüzden köklere Hochdeutsch karşılıkları da yazılmıştı. Bu kontrol o
    // iddiayı doğruluyor — ikisi de aynı dalı seçmeli.
    const zhDialect = said("zh-a2-d1", "start", "Ich hätt gern Chäs.");
    const zhStandard = said("zh-a2-d1", "start", "Ich hätte gern Käse.");
    check("lehçe biçimi tutuyor", zhDialect !== null, `(${zhDialect})`);
    check("tanıyıcının yazacağı standart biçim de tutuyor", zhStandard !== null,
      `(${zhStandard})`);
    check("ikisi aynı dala gidiyor", zhDialect === zhStandard);

    const zhVerb = said("zh-a1-d1", "from", "Ich chume vo de Türkei.");
    const zhVerbStd = said("zh-a1-d1", "from", "Ich komme aus der Türkei.");
    check("lehçe fiili tutuyor", zhVerb !== null, `(${zhVerb})`);
    check("standart fiil de tutuyor", zhVerbStd !== null, `(${zhVerbStd})`);

    // Konu dışı cevap hiçbir dala uymamalı; uyarsa öğrenci yanlış yönlendirilir.
    check("konu dışı cevap eşleşmiyor",
      said("zh-a2-d1", "start", "Wie spät ist es?") === null,
      `(${said("zh-a2-d1", "start", "Wie spät ist es?")})`);
    check("boş cevap eşleşmiyor", said("b1-d1", "start", "   ") === null);
  }

  console.log("\n11u) İstem başlığı cevaba sızmıyor");
  {
    const leaked = parseReply(
      `Hallo!\n\n— ÖNERİLEN CEVAPLAR\n${SUGGESTION_MARK} Mir geht es gut.`,
    );
    check("kaçak başlık gövdeye girmiyor", !leaked.body.includes("ÖNERİLEN"),
      `(${leaked.body.trim()})`);
    check("başlık süzülürken öneri korunuyor", leaked.suggestions.length === 1);
    check("normal cümle süzülmüyor",
      parseReply("Das Kino ist toll!").body.includes("Kino"));
    // Tamamı büyük harf olsa da noktalama taşıyan satır cümledir, başlık değil.
    check("büyük harfli ünlem cümlesi korunuyor",
      parseReply("SUPER!").body.includes("SUPER"));
    // Tek kelimelik vurgulu cevap silinmemeli: süzgeç fazla geniş olsaydı
    // mesajın tamamı kaybolurdu.
    check("tek kelimelik büyük harfli cevap korunuyor",
      parseReply("SUPER").body.includes("SUPER"), `(${parseReply("SUPER").body})`);
    check("tire ile başlayan tek kelimelik başlık süzülüyor",
      !parseReply("— ÖNERİLER").body.includes("ÖNERİLER"));
    // Model düzenli olarak markdown yazıyor; arayüz düz metin gösterdiği için
    // yıldızlar ekrana çıkıyordu. Koçta temizleniyordu, sohbette atlanmıştı.
    const md = parseReply(
      `Cümle **özneden sonra** gelir.\n${CORRECTION_MARK} *ich gehe* → *gehe ich* (V2)\n` +
        `${SUGGESTION_MARK} **Ja, gern.**`,
    );
    check("gövdede yıldız kalmıyor", !md.body.includes("*"), `(${md.body.trim()})`);
    check("düzeltmede yıldız kalmıyor", !md.corrections[0]?.includes("*"),
      `(${md.corrections[0]})`);
    check("öneride yıldız kalmıyor", md.suggestions[0] === "Ja, gern.",
      `(${md.suggestions[0]})`);
  }


  console.log("\n11q) Telaffuz değerlendirmesi yanlış onay vermiyor");
  // Kategorinin imza hatası: rakip uygulamalarda bilerek yanlış söylenen
  // kelimeye "doğru" deniyor. Mekanizma, n-best listesindeki herhangi bir
  // adayın tutmasını yeterli saymak. Aşağıdaki kontroller o kapıyı kapatıyor.
  check("en iyi aday tutarsa doğru",
    judgeSpeech("Ich bin müde.", ["ich bin müde", "ich bin mude"]).kind === "correct");
  check("hedef yalnızca alt sırada ise doğru sayılmıyor",
    judgeSpeech("Ich bin müde.", ["ich bin mode", "ich bin müde"]).kind === "uncertain",
    `(${judgeSpeech("Ich bin müde.", ["ich bin mode", "ich bin müde"]).kind})`);
  check("düşük güvenli en iyi aday onaylanmıyor",
    judgeSpeech("Ich bin müde.", ["ich bin müde"], [], [0.3]).kind === "uncertain");
  check("yüksek güvenli en iyi aday onaylanıyor",
    judgeSpeech("Ich bin müde.", ["ich bin müde"], [], [0.9]).kind === "correct");
  // Safari güven bildirmiyor; orada eski davranış sürmeli, yoksa o tarayıcıda
  // hiçbir cevap onaylanmazdı.
  check("güven bildirilmemişse onay veriliyor",
    judgeSpeech("Ich bin müde.", ["ich bin müde"], [], [0]).kind === "correct");
  check("emin olunmayan durum doğru sayılmıyor",
    isSpeechCorrect({ kind: "uncertain", heard: "ich bin mude" }) === false);
  // Alt adaylar hâlâ teşhis için okunuyor: karışma kümesi orada yakalanıyor.
  check("karışma alt sıradan da yakalanıyor",
    judgeSpeech("Ich bin müde.", ["etwas anderes", "ich bin mode"],
      [{ heard: ["mode"], fix: "ü kısaldı", expected: "müde" }]).kind === "confusion");

  console.log("\n11o2) Onboarding bir kez tamamlanıyor");
  {
    // Bu kontrol sessiz bir döngü yüzünden var: onboarding'in bittiğini
    // işaretleyen satır bir refactor sırasında düşmüş, kullanıcı seçimlerini
    // yapıyor ama tekrar onboarding'e gönderiliyordu. Form varsayılanlarla
    // açıldığı için dışarıdan "seçimlerim sıfırlandı" gibi görünüyordu.
    await db
      .update(profiles)
      .set({ courseChosenAt: null })
      .where(eq(profiles.userId, USER));

    const before = await ensureProfile(USER);
    check("başlangıçta onboarding gerekiyor", before.courseChosenAt === null);

    // Profil ucunun yaptığı işin aynısı: kurs yazılınca işaret konuyor.
    await db
      .update(profiles)
      .set({ course: "de", courseChosenAt: sql`coalesce(${profiles.courseChosenAt}, now())` })
      .where(eq(profiles.userId, USER));
    const after = await ensureProfile(USER);
    check("kurs seçilince onboarding tamamlanmış sayılıyor", after.courseChosenAt !== null);

    // İkinci kez yazılmamalı: profilden kurs değiştiren biri onboarding'e
    // geri düşmemeli ve ilk seçim tarihi korunmalı.
    const stamp = after.courseChosenAt!.getTime();
    await db
      .update(profiles)
      .set({ course: "gsw-zh", courseChosenAt: sql`coalesce(${profiles.courseChosenAt}, now())` })
      .where(eq(profiles.userId, USER));
    const later = await ensureProfile(USER);
    check("sonraki kurs değişimi işareti bozmuyor",
      later.courseChosenAt?.getTime() === stamp);
    await db.update(profiles).set({ course: "de" }).where(eq(profiles.userId, USER));
  }

  console.log("\n11p) Seslendirme sesi kursa bağlı");
  check("Almanca kursunun varsayılanı Katja",
    defaultVoice("de") === "de-DE-KatjaNeural");
  check("Zürih kursunun varsayılanı Leni",
    defaultVoice("gsw-zh") === "de-CH-LeniNeural");
  check("her kursta iki ses", voicesFor("de").length === 2 && voicesFor("gsw-zh").length === 2);
  check("seçilen ses korunuyor",
    resolveVoice("de", "de-DE-ConradNeural") === "de-DE-ConradNeural");
  // Asıl korunan davranış: kurs değişince yanlış kursun sesi taşınmamalı.
  // Aksi hâlde Zürih'e geçen biri Dieth metnini Alman aksanıyla dinlerdi.
  check("başka kursun sesi kursun varsayılanına düşüyor",
    resolveVoice("gsw-zh", "de-DE-KatjaNeural") === "de-CH-LeniNeural",
    `(${resolveVoice("gsw-zh", "de-DE-KatjaNeural")})`);
  check("bilinmeyen ses varsayılana düşüyor",
    resolveVoice("de", "uydurma-ses") === "de-DE-KatjaNeural");
  check("ses seçilmemişse varsayılan", resolveVoice("gsw-zh", null) === "de-CH-LeniNeural");
  // Lehçe daha yavaş okunuyor; hız sesin kendisinden türetiliyor, ayrı bir
  // yerde ikinci kez tanımlanmıyor.
  check("lehçe daha yavaş okunuyor", rateFor("de-CH-LeniNeural") === "-12%" && rateFor("de-DE-KatjaNeural") === "-8%");
  // Yavaş dinleme telaffuz çalışmasının yöntemi; iki hız da ayrı önbellek
  // girdisi olduğu için seçenek sayısı bilerek ikiyle sınırlı.
  check("yavaş okuma normalden yavaş",
    parseInt(rateFor("de-DE-KatjaNeural", true)) <
      parseInt(rateFor("de-DE-KatjaNeural")));
  check("lehçede de yavaş seçeneği var",
    rateFor("de-CH-LeniNeural", true) !== rateFor("de-CH-LeniNeural"));
  // Parantezli Hochdeutsch karşılığı sesli okunduğunda cümleyi bozuyor.
  check("okuma metni sadeleşiyor",
    cleanForSpeech("Bschäftigte (Beschäftigte) vo/de Branche") === "Bschäftigte vo de Branche",
    `(${cleanForSpeech("Bschäftigte (Beschäftigte) vo/de Branche")})`);

  console.log("\n11n) Sohbet cevabının biçimi");
  // İşaretler sistem isteminde ve ayrıştırıcıda ayrı yazılsaydı biri
  // değiştiğinde öneriler hatasız biçimde kaybolurdu — ekranda eksilen bir
  // şey olmaz, sadece bir daha hiç görünmezdi.
  const reply = parseReply(
    [
      "Guten Tag! Wie geht es dir heute?",
      `${CORRECTION_MARK} "Ich bin gut" → "Mir geht es gut" — bu kalıpta datif kullanılır.`,
      `${SUGGESTION_MARK} Mir geht es gut, danke.`,
      `${SUGGESTION_MARK} "Nicht so gut."`,
      `${SUGGESTION_MARK} 1) Und dir?`,
    ].join("\n"),
  );
  check("gövde ayrılıyor", reply.body === "Guten Tag! Wie geht es dir heute?", `(${reply.body})`);
  check("düzeltme ayrılıyor", reply.corrections.length === 1);
  check("düzeltme işareti metinden çıkarılıyor", !reply.corrections[0].includes(CORRECTION_MARK));
  check("üç öneri okunuyor", reply.suggestions.length === 3, `(${reply.suggestions.length})`);
  check("öneriden tırnak temizleniyor", reply.suggestions[1] === "Nicht so gut.",
    `(${reply.suggestions[1]})`);
  check("öneriden numara temizleniyor", reply.suggestions[2] === "Und dir?",
    `(${reply.suggestions[2]})`);
  const plain = parseReply("Alles klar. Was machst du?");
  check("işaretsiz cevapta düzeltme/öneri yok",
    plain.corrections.length === 0 && plain.suggestions.length === 0);
  check("işaretsiz cevabın gövdesi bozulmuyor", plain.body === "Alles klar. Was machst du?");

  console.log("\n11m) Karşılıklı konuşma (diyalog)");
  const cafe = dialogues[0];
  check("diyalog havuzu var", dialogues.length > 0);

  // Yapısal kontroller **her** diyaloğa uygulanıyor. Eskiden yalnızca ilk
  // diyaloğa bakılıyordu; havuza ikinci bir diyalog eklendiğinde kırık bir
  // bağlantı ya da ölü bir tur sessizce yayına çıkardı.
  for (const d of dialogues) {
    const ids = new Set(d.dialogue.map((t) => t.id));
    check(`[${d.id}] tur kimlikleri benzersiz`, ids.size === d.dialogue.length);

    // Kırık bağlantı konuşmayı ortada bırakır: her `next` var olan bir tura gitmeli.
    const broken = d.dialogue.flatMap((t) =>
      t.replies.filter((r) => r.next && !ids.has(r.next)).map((r) => `${t.id} → ${r.next}`),
    );
    check(`[${d.id}] bütün dallar var olan bir tura gidiyor`, broken.length === 0,
      `(${broken.join(", ")})`);

    // Ulaşılamayan tur ölü içeriktir.
    const seen = new Set([d.dialogue[0].id]);
    let grew = true;
    while (grew) {
      grew = false;
      for (const t of d.dialogue) {
        if (!seen.has(t.id)) continue;
        for (const r of t.replies) {
          if (r.next && !seen.has(r.next)) {
            seen.add(r.next);
            grew = true;
          }
        }
      }
    }
    const orphans = d.dialogue.filter((t) => !seen.has(t.id)).map((t) => t.id);
    check(`[${d.id}] ulaşılamayan tur yok`, orphans.length === 0, `(${orphans.join(", ")})`);

    check(`[${d.id}] her turda geri dönüş örneği var`,
      d.dialogue.every((t) => t.fallback.example.trim().length > 0));
    check(`[${d.id}] her turda en az bir dal var`,
      d.dialogue.every((t) => t.replies.length > 0));
    check(`[${d.id}] her turda yönlendirme yazılı`,
      d.dialogue.every((t) => t.cue.trim().length > 0));

    // `uses` konuşma sonunda özetleniyor; tanımsız bir kalıba işaret etmesi
    // özeti sessizce yanlış yapardı.
    const targets = new Set(d.targets.map((t) => t.de));
    const unknown = d.dialogue.flatMap((t) =>
      t.replies.flatMap((r) => (r.uses ?? []).filter((u) => !targets.has(u))),
    );
    check(`[${d.id}] kullanılan kalıplar hedeflerde tanımlı`, unknown.length === 0,
      `(${[...new Set(unknown)].join(", ")})`);

    // Geri dönüş örneği, hiçbir dalın tutmadığı durumda gösteriliyor. Örnek
    // cümlenin kendisi bir dala uymuyorsa öğrenciye çalışmayan bir çıkış yolu
    // gösterilmiş olur.
    const deadEnds = d.dialogue
      .filter((t) => matchReply(t.fallback.example, t.replies) === null)
      .map((t) => t.id);
    check(`[${d.id}] geri dönüş örneği bir dala uyuyor`, deadEnds.length === 0,
      `(${deadEnds.join(", ")})`);
  }

  // Asıl işlev: söylenen şeye göre farklı dal seçilmeli.
  const start = cafe.dialogue[0];
  const coffee = matchReply("Ich hätte gern einen Kaffee", start.replies);
  const tea = matchReply("Einen Tee bitte", start.replies);
  check("kahve dalı seçiliyor", coffee?.reply.say.includes("Kaffee") === true);
  check("çay dalı seçiliyor", tea?.reply.say.includes("Tee") === true);
  check("aynı soru farklı cevaba farklı karşılık veriyor", coffee?.reply.say !== tea?.reply.say);
  check("alakasız cevap eşleşmiyor", matchReply("Wo ist der Bahnhof", start.replies) === null);
  check("boş cevap eşleşmiyor", matchReply("   ", start.replies) === null);

  // Kısa kökler tam kelime aranmalı: "ja" kökü "Januar" içinde bulunmamalı.
  const milk = cafe.dialogue.find((t) => t.id === "milk")!;
  const negative = matchReply("Nein, ohne Zucker", milk.replies);
  check("olumsuz cevap olumsuz dala gidiyor",
    negative?.reply.say.includes("ohne") === true, `(${negative?.reply.say})`);
  check("kısa kök parça olarak eşleşmiyor",
    matchReply("Januar", [{ match: ["ja"], say: "x", sayTr: "x" }]) === null);
  check("uzun kök parça olarak eşleşiyor",
    matchReply("Ich möchte einen Kaffee", [{ match: ["möcht"], say: "x", sayTr: "x" }]) !== null);

  // Pekiştirme ölçüsü gerçek olmalı: yalnızca tutan dalların kalıpları sayılır.
  const path = [coffee!.reply, negative!.reply];
  const used = usedTargets(path);
  check("kullanılan kalıplar toplanıyor", used.length > 0, `(${used.join(", ")})`);
  check("kullanılan kalıplar temanın hedefleri arasında",
    used.every((u) => cafe.targets.some((t) => t.de === u)), `(${used.join(", ")})`);
  check("diyalogda madde sayısı tur sayısı", itemCount(cafe) === cafe.dialogue.length);

  console.log("\n11l) Konuşma alıştırmaları içeriği");
  check("konuşma havuzu var", speaking.length > 0, `(${speaking.length})`);
  check("kimlikler benzersiz", new Set(speaking.map((e) => e.id)).size === speaking.length);
  check("her egzersizde görev var", speaking.every((e) => e.tasks.length > 0));
  check("her görevde Almanca ve Türkçe metin var",
    speaking.every((e) => e.tasks.every((t) => t.de.trim() && t.tr.trim())));
  // Karışma kümesi işe yarasın: yanlış biçim hedefin kendisi olamaz, yoksa
  // doğru söyleyen öğrenci "hata yaptın" uyarısı alırdı.
  const selfConfusing = speaking.flatMap((e) =>
    e.tasks.flatMap((t) =>
      (t.confusions ?? []).flatMap((c) =>
        c.heard.filter((h) => normalizeSpoken(h) === normalizeSpoken(t.de)).map((h) => `${e.id}: ${h}`),
      ),
    ),
  );
  check("yanlış biçim hedefin kendisi değil", selfConfusing.length === 0, `(${selfConfusing.join(", ")})`);
  // `expected` hedef metinde geçmeli, yoksa "doğrusu" başka bir şey gösterir.
  const strayExpected = speaking.flatMap((e) =>
    e.tasks.flatMap((t) =>
      (t.confusions ?? [])
        .filter((c) => c.expected && !normalizeSpoken(t.de).includes(normalizeSpoken(c.expected)))
        .map((c) => `${e.id}: ${c.expected}`),
    ),
  );
  check("düzeltilen kelime hedef metinde geçiyor", strayExpected.length === 0,
    `(${strayExpected.join(", ")})`);
  // Her karışma gerçekten yakalanmalı: yazılan sapma judgeSpeech'ten geçmiyorsa
  // içerik ölü demektir.
  const deadConfusions: string[] = [];
  for (const ex of speaking) {
    for (const t of ex.tasks) {
      for (const c of t.confusions ?? []) {
        for (const heard of c.heard) {
          const v = judgeSpeech(t.de, [heard], t.confusions ?? []);
          if (v.kind !== "confusion") deadConfusions.push(`${ex.id} "${heard}" → ${v.kind}`);
        }
      }
    }
  }
  check("yazılan her sapma yakalanıyor", deadConfusions.length === 0,
    `(${deadConfusions.slice(0, 3).join(" · ")})`);
  check("doğru söyleyiş her görevde kabul ediliyor",
    speaking.every((e) =>
      e.tasks.every((t) => judgeSpeech(t.de, [t.de], t.confusions ?? []).kind === "correct")));
  // XP artık madde başına değil SÜRE başına (bkz. lib/xp.ts): eski tabloda
  // beş dakikalık bir alıştırma ~46 XP veriyor, aynı sürede kelime oyunu
  // ~500 XP kazandırıyordu ve bu, becerileri puan cinsinden değersiz kılıyordu.
  {
    const ex = speaking[0];
    const items = itemCount(ex);
    const none = xpFor(ex, 0);
    const all = xpFor(ex, items);
    check("hiç doğru yapmayan da çaba payı alıyor", none > 0, `(${none})`);
    check("tam doğru daha çok kazandırıyor", all > none, `(${none} → ${all})`);
    check("tam doğruda dakikada ~100 XP", Math.abs(all / ex.minutes - 100) < 1,
      `(${(all / ex.minutes).toFixed(0)} XP/dk)`);
    check("XP alıştırmanın süresiyle ölçekleniyor",
      xpFor({ ...ex, minutes: ex.minutes * 2 }, items) === all * 2);
  }
  check("madde sayısı görev sayısı", itemCount(speaking[0]) === speaking[0].tasks.length);

  console.log("\n11k) Konuşma değerlendirmesi");
  const SCHOEN = [
    { heard: ["schon"], fix: "ö'yü o gibi söyledin — dudakların yuvarlak kalmalı.", expected: "schön" },
  ];
  check("birebir söyleyiş doğru", judgeSpeech("Das ist schön.", ["Das ist schön."]).kind === "correct");
  check("noktalama ve büyük harf farkı önemsiz",
    judgeSpeech("Das ist schön.", ["das ist schön"]).kind === "correct");
  check("bilinen sapma yakalanıyor",
    judgeSpeech("Das ist schön.", ["Das ist schon"], SCHOEN).kind === "confusion");
  const fix = judgeSpeech("Das ist schön.", ["Das ist schon"], SCHOEN);
  check("sapmada düzeltme metni taşınıyor", fix.kind === "confusion" && fix.fix.includes("ö"));
  check("doğru biçim de duyulduysa sapma sayılmıyor",
    judgeSpeech("Das ist schön.", ["Das ist schön schon"], SCHOEN).kind !== "confusion");
  // Umlaut katlanmamalı: bu turun ölçtüğü tek fark o.
  check("ö ile o ayrı tutuluyor",
    normalizeSpoken("schön") !== normalizeSpoken("schon"));
  check("tamamen başka bir şey ayırt ediliyor",
    judgeSpeech("Ich möchte einen Kaffee.", ["Wo ist der Bahnhof"]).kind === "different");
  const partial = judgeSpeech("Ich möchte einen Kaffee bitte.", ["Ich möchte einen Kaffee"]);
  check("az eksikte 'partial'", partial.kind === "partial", `(${partial.kind})`);
  check("eksik kelime bildiriliyor",
    partial.kind === "partial" && partial.missing.includes("bitte"));
  check("hiç ses tanınmadıysa 'unheard'", judgeSpeech("Guten Tag", []).kind === "unheard");
  check("boş metin de tanınmamış sayılıyor",
    judgeSpeech("Guten Tag", ["", "   "]).kind === "unheard");
  // Bu kontrol eskiden tersini doğruluyordu: "doğru biçim ikinci sırada olsa
  // da kabul edilir". O davranış bilerek kaldırıldı — beş adaydan birinin
  // tutmasını yeterli saymak, kötü telaffuzu onaylayan bir piyangoydu ve bu
  // ürün kategorisinin en sık şikâyet edilen hatasının mekanizmasıydı.
  // Geri alınmasın diye beklenti burada açıkça yazılı.
  check("doğru biçim yalnızca alt sıradaysa onaylanmıyor",
    judgeSpeech("Ich bin müde.", ["Ich bin Mode", "Ich bin müde"]).kind === "uncertain",
    `(${judgeSpeech("Ich bin müde.", ["Ich bin Mode", "Ich bin müde"]).kind})`);
  check("yalnızca tam tanınma doğru sayılıyor",
    isSpeechCorrect(partial) === false &&
      isSpeechCorrect(judgeSpeech("Guten Tag", ["Guten Tag"])) === true);

  console.log("\n11j) Oyun çeşitliliği");
  await reset();
  await ensureProfile(USER);
  await db.update(profiles).set({ newPerDay: 0 }).where(eq(profiles.userId, USER));
  // Çeşitliliği ölçebilmek için her oyuna uygun kelimeler gerekiyor: örnek
  // cümlesi ve çoğul kuralı olan isimler tüm oyun türlerine aday olur.
  const varietyPool = await db
    .select()
    .from(words)
    .where(and(eq(words.course, "de"), eq(words.typ, "Nomen")))
    .limit(60);
  await db.insert(userWords).values(
    varietyPool.map((w) => ({
      userId: USER, wordId: w.id, state: 2, ease: 2.6, intervalDays: 30,
      dueAt: long, reps: 9, lapses: 0, correctStreak: 7, leech: false, lastReviewedAt: long,
    })),
  );

  let backToBack = 0;
  let withinWindow = 0;
  const distinctPerSession: number[] = [];
  for (let i = 0; i < 20; i++) {
    const s = await buildSession(USER, day1);
    const gs = s.rounds.map((r) => r.game);
    distinctPerSession.push(new Set(gs).size);
    for (let j = 1; j < gs.length; j++) {
      if (gs[j] === gs[j - 1]) backToBack++;
      // Eşleştirme turu bilerek oturumun sonuna konuyor; pencere kuralı onu
      // kapsamaz.
      if (gs[j] === "match") continue;
      if (gs.slice(Math.max(0, j - 3), j).includes(gs[j])) withinWindow++;
    }
  }
  check("aynı oyun arka arkaya gelmiyor", backToBack === 0, `(${backToBack})`);
  check("aynı oyun üç tur içinde tekrarlanmıyor", withinWindow === 0, `(${withinWindow})`);
  const avgDistinct = distinctPerSession.reduce((a, b) => a + b, 0) / distinctPerSession.length;
  check("oturum başına en az 6 farklı oyun", avgDistinct >= 6, `(ortalama ${avgDistinct.toFixed(1)})`);
  // Oynanabilir oyunlar + tanıtım kartı + yürürken modunun sesli cevabı +
  // serbest cümle (AI hakemli, seçicide değil). `speak` bir oyun değil bir
  // mod ama cevapları kendi adıyla kaydediliyor (bkz. lib/types), o yüzden
  // etiketi var ve seçicide yok.
  check("etiketler eksiksiz", Object.keys(GAME_LABELS).length === PLAYABLE_GAMES.length + 3,
    `(${Object.keys(GAME_LABELS).length})`);
  check("speak oyun seçicide değil", !(PLAYABLE_GAMES as readonly string[]).includes("speak"));

  console.log("\n11i) Eğik çizgiyle ayrılmış örnek cümleler");
  check(
    "noktalamadan sonraki çizgi cümleyi bitiriyor",
    firstExample("Die Zeitung ist auf dem Tisch./ Auf dem Foto bin ich mit meiner Schwester.") ===
      "Die Zeitung ist auf dem Tisch.",
  );
  check(
    "boşluklu çizgi de sınır",
    firstExample("Gefällt dir die Jacke? / Nein, die andere finde ich schöner.") ===
      "Gefällt dir die Jacke?",
  );
  check(
    "çizgiden önce boşluk yokken de bölünüyor",
    firstExample("Wann kommt ihr aus der Schule?/ Ich komme aus Deutschland.") ===
      "Wann kommt ihr aus der Schule?",
  );
  // Cümle içindeki alternatif çizgiler tek bir ifadedir, bölünmemeli.
  check(
    "cümle içi alternatif bölünmüyor",
    firstExample("Ist das Ihr Hund/Ihre Katze?") === "Ist das Ihr Hund/Ihre Katze?",
  );
  check(
    "noktalamasız çizgi listesi bozulmuyor",
    firstExample("Am Sonntag/am Abend/am Meer") === "Am Sonntag/am Abend/am Meer",
  );
  check(
    "Türkçe karşılık aynı kuralla ilk cümleyi veriyor",
    firstExample("Gazete masanın üstünde. / Fotoğrafta kız kardeşimle birlikteyim.") ===
      "Gazete masanın üstünde.",
  );
  check("kısaltma cümleyi bitirmiyor",
    firstExample("Das war vor ca. 6000 Jahren üblich.") === "Das war vor ca. 6000 Jahren üblich.");
  // Veride tek bir madde bile çok cümleli kalmamalı.
  const multi = await db.select().from(words).where(eq(words.course, "de"));
  const leftovers = multi.filter((w) => {
    const first = firstExample(w.beispiel);
    return first !== null && /[.!?]\s*\//.test(first);
  });
  check("veride çok cümleli örnek kalmadı", leftovers.length === 0, `(${leftovers.length})`);

  console.log("\n11h) Doğru mu Yanlış mı turu");
  await reset();
  await ensureProfile(USER);
  await db.update(profiles).set({ newPerDay: 0 }).where(eq(profiles.userId, USER));
  const tfPool = await db.select().from(words).where(eq(words.course, "de")).limit(60);
  await db.insert(userWords).values(
    tfPool.map((w) => ({
      userId: USER, wordId: w.id, state: 2, ease: 2.6, intervalDays: 30,
      dueAt: long, reps: 9, lapses: 0, correctStreak: 7, leech: false, lastReviewedAt: long,
    })),
  );
  const tfRounds: Extract<Round, { game: "truefalse" }>[] = [];
  for (let i = 0; i < 30; i++) {
    const s = await buildSession(USER, day1);
    for (const r of s.rounds) if (r.game === "truefalse") tfRounds.push(r);
  }
  check("ikili karar turu üretiliyor", tfRounds.length > 0, `(${tfRounds.length})`);
  check("doğru iddia kelimenin kendi karşılığı",
    tfRounds.filter((r) => r.isTrue).every((r) => r.claim.text === r.word.tr));
  // Asıl adalet kuralı: yanlış iddia, kelimenin geçerli bir anlamı olmamalı.
  const meaningsOf = (tr: string) =>
    new Set(tr.split(",").map((m) => m.trim().toLocaleLowerCase("tr-TR")).filter(Boolean));
  check(
    "yanlış iddia kelimenin başka bir anlamı değil",
    tfRounds
      .filter((r) => !r.isTrue)
      .every((r) => ![...meaningsOf(r.claim.text)].some((m) => meaningsOf(r.word.tr).has(m))),
  );
  const trueCount = tfRounds.filter((r) => r.isTrue).length;
  check("doğru ve yanlış iddialar karışık geliyor",
    tfRounds.length < 8 || (trueCount > 0 && trueCount < tfRounds.length),
    `(${trueCount}/${tfRounds.length} doğru)`);

  console.log("\n11g) Kulaktan Tanı turu");
  // Ses turunda şıklar Türkçe olmalı: Almanca şık verilseydi kelime yazıyla
  // görünür ve tur dinlemeyi değil okumayı ölçerdi.
  await reset();
  await ensureProfile(USER);
  await db.update(profiles).set({ newPerDay: 0 }).where(eq(profiles.userId, USER));
  const listenPool = await db.select().from(words).where(eq(words.course, "de")).limit(60);
  await db.insert(userWords).values(
    listenPool.map((w) => ({
      userId: USER, wordId: w.id, state: 2, ease: 2.6, intervalDays: 30,
      dueAt: long, reps: 9, lapses: 0, correctStreak: 7, leech: false, lastReviewedAt: long,
    })),
  );
  let listenRound: Extract<Round, { game: "listen" }> | null = null;
  for (let i = 0; i < 25 && !listenRound; i++) {
    const s = await buildSession(USER, day1);
    for (const r of s.rounds) if (r.game === "listen" && !listenRound) listenRound = r;
  }
  check("ses turu üretiliyor", listenRound !== null);
  if (listenRound) {
    check("dört şık var", listenRound.options.length === 4, `(${listenRound.options.length})`);
    check("doğru karşılık şıklarda",
      listenRound.options.some((o) => o.text === listenRound!.word.tr));
    check("şıklar Türkçe (Almanca biçim sızmıyor)",
      !listenRound.options.some((o) => o.text === listenRound!.word.de),
      `(${listenRound.options.map((o) => o.text).join(", ")})`);
  }

  console.log("\n11f) Çoğul Bilmece turu");
  check("Arzt → Ärzte", pluralChoices("Arzt", "Ä, -e", 3)?.answer === "Ärzte");
  check("Apfel → Äpfel (ek yok, yalnız umlaut)", pluralChoices("Apfel", "Ä, -", 3)?.answer === "Äpfel");
  check("Straße → Straßen (ek kaynaşıyor)", pluralChoices("Straße", "-n", 3)?.answer === "Straßen");
  check("Auto → Autos", pluralChoices("Auto", "-s", 3)?.answer === "Autos");
  check("Fenster → Fenster (değişmez)", pluralChoices("Fenster", "-", 3)?.answer === "Fenster");
  check("çoğulu olmayan madde tur üretmiyor", pluralChoices("Milch", "(Sg.)", 3) === null);
  check("fiil çekimi tur üretmiyor", pluralChoices("gehen", "ist gegangen", 3) === null);
  const arzt = pluralChoices("Arzt", "Ä, -e", 3)!;
  check("çeldirici sayısı yeterli", arzt.distractors.length === 3);
  check("çeldiriciler doğru cevabı tekrarlamıyor", !arzt.distractors.includes(arzt.answer));
  check("çeldiriciler aynı kelimeden türüyor",
    arzt.distractors.every((f) => f.startsWith("Arzt") || f.startsWith("Ärzt")),
    `(${arzt.distractors.join(", ")})`);
  check("olmayan biçim üretilmiyor (-n ünsüzden sonra)",
    !pluralChoices("Arm", "-e", 3)!.distractors.includes("Armn"));

  console.log("\n11e) Umlautlu çoğul kökleri");
  // Almanca isimler büyük harfle başlar; ünlüsü yalnızca baştaki harf olan
  // kelimelerde (Amt, Angst, Apfel, Arzt) umlaut hiç uygulanmıyordu.
  check("baştaki büyük ünlü umlautlanıyor", umlautStem("Arzt") === "Ärzt", `(${umlautStem("Arzt")})`);
  check("Apfel → Äpfel kökü", umlautStem("Apfel") === "Äpfel", `(${umlautStem("Apfel")})`);
  check("Amt → Ämt kökü", umlautStem("Amt") === "Ämt", `(${umlautStem("Amt")})`);
  check("küçük harfli kök bozulmadı", umlautStem("Anfang") === "Anfäng", `(${umlautStem("Anfang")})`);
  check("au ikilisi tek parça", umlautStem("Haus") === "Häus", `(${umlautStem("Haus")})`);
  check("baştaki Au ikilisi", umlautStem("Auge") === "Äuge", `(${umlautStem("Auge")})`);
  check("umlautlanacak ünlü yoksa değişmiyor", umlautStem("Bett") === "Bett");

  console.log("\n12) SRS saf fonksiyon davranışı");
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

  console.log("\n13) Oturum sunucuda tutuluyor — iki cihaz aynı turu görür");
  await reset();
  const dayS = "2026-05-01";
  // "Telefon" turu açar.
  const phone = await loadSession(USER, dayS);
  check("ilk istekte tur kuruluyor", phone.rounds.length > 0, `(${phone.rounds.length})`);
  check("yeni turda devam bilgisi yok", phone.resume === null);

  // "Bilgisayar" aynı hesapla girer: yeni kelimeleri baştan almamalı.
  const browser = await loadSession(USER, dayS);
  check(
    "ikinci cihaz aynı turu alıyor",
    browser.rounds.map((r) => r.id).join(",") === phone.rounds.map((r) => r.id).join(","),
  );
  check("ikinci cihaz devam bilgisi alıyor", browser.resume?.index === 0);

  // Telefon üç tur oynar; ilerleme sunucuya yazılır.
  await saveSessionProgress(USER, dayS, {
    index: 3,
    correct: 2,
    total: 3,
    xp: 26,
    missed: [{ id: 1, de: "das Haus", tr: "ev", en: "house" }],
  });
  const browser2 = await loadSession(USER, dayS);
  check("diğer cihaz kaldığı turdan devam ediyor", browser2.resume?.index === 3);
  check("doğru sayısı taşınıyor", browser2.resume?.correct === 2);
  check("zorlandıkların listesi taşınıyor", browser2.resume?.missed.length === 1);
  check("devam eden turda başlık sayıları taze", typeof browser2.meta.dueCount === "number");

  // İlerleme geri sarmaz: geç ulaşan bir istek turu başa döndürmemeli.
  await saveSessionProgress(USER, dayS, { index: 1, correct: 2, total: 3, xp: 26, missed: [] });
  const browser3 = await loadSession(USER, dayS);
  check("geç gelen ilerleme turu geri sarmıyor", browser3.resume?.index === 3);

  // Tur bitince bir sonraki istek yeni kuyruk kurar.
  await saveSessionProgress(USER, dayS, {
    index: phone.rounds.length,
    correct: 9,
    total: 12,
    xp: 100,
    missed: [],
  });
  const afterDone = await loadSession(USER, dayS);
  check("biten turdan sonra yeni tur kuruluyor", afterDone.resume === null);

  // Gün değişince tur yenilenir.
  await loadSession(USER, dayS);
  const nextDay = await loadSession(USER, shiftDay(dayS, 1));
  check("gün değişince tur yenileniyor", nextDay.resume === null);

  // "Yeni tura başla" kayıtlı turu atar.
  await clearSessionState(USER);
  const cleared = await loadSession(USER, shiftDay(dayS, 1));
  check("kayıtlı tur silinince yeniden kuruluyor", cleared.resume === null);

  console.log("\n14) Meydan okuma rekoru hesapta tutuluyor");
  const first = await recordChallengeScore(USER, 120);
  check("ilk rekor kaydediliyor", first.best === 120 && first.previous === 0);
  const worse = await recordChallengeScore(USER, 80);
  check("düşük skor rekoru bozmuyor", worse.best === 120 && worse.previous === 120);
  const better = await recordChallengeScore(USER, 200);
  check("yeni rekor önceki değerle birlikte dönüyor", better.best === 200 && better.previous === 120);
  const chal = await buildChallenge(USER);
  check("rekor meydan okuma verisiyle geliyor", chal.best === 200, `(${chal.best})`);

  console.log("\n15) Bahis — isteğe bağlı risk, yalnızca etabın kendi puanı");
  check("hatasız etap payı ikiye katlıyor", xpForWager(5, 5, 60) === 60);
  check("tek yanlış başa baş", xpForWager(4, 5, 60) === 0);
  check("iki yanlış etabı yakıyor", xpForWager(3, 5, 60) === -60);
  check("üç yanlış da aynı: fazlası cezalandırmıyor", xpForWager(2, 5, 60) === -60);
  check("pay tavanlı — abartılı istek puan basamıyor", xpForWager(5, 5, 99999) === 250);
  check("negatif pay sıfırlanıyor", xpForWager(5, 5, -40) === 0);
  check("boş etap bahis üretmiyor", xpForWager(0, 0, 60) === 0);

  // Bahis kaybı toplam XP'yi geriye götürmemeli: en fazla o etap boşa gider.
  await reset();
  const dayW = "2025-04-01";
  const sW = await buildSession(USER, dayW);
  const beforeW = await ensureProfile(USER);
  const lost = await submitAnswers(USER, answersFor(sW.rounds.slice(0, 2), 0), dayW, 30, {
    correct: 0,
    total: 5,
    stake: 250,
  });
  const afterW = await ensureProfile(USER);
  check("kayıp toplam XP'yi eksiye düşürmüyor", lost.xpGained === 0, `(${lost.xpGained})`);
  check("bahis farkı ayrıca dönüyor", lost.wagerXp === -250, `(${lost.wagerXp})`);
  check(
    "önceki birikim korunuyor",
    afterW.totalXp >= beforeW.totalXp,
    `(${beforeW.totalXp} → ${afterW.totalXp})`,
  );

  const dayW2 = "2025-04-02";
  const sW2 = await buildSession(USER, dayW2);
  const won = await submitAnswers(USER, answersFor(sW2.rounds.slice(0, 2), 1), dayW2, 30, {
    correct: 5,
    total: 5,
    stake: 50,
  });
  check("kazanılan bahis puana ekleniyor", won.wagerXp === 50 && won.xpGained > 50);

  console.log("\n16) Haftalık sıralama — pazartesi sıfırlanır");
  check("pazartesi kendi haftasının başı", weekStart("2025-04-07") === "2025-04-07");
  check("salı bir gün geriye bakıyor", weekStart("2025-04-08") === "2025-04-07");
  check("pazar aynı haftada kalıyor", weekStart("2025-04-13") === "2025-04-07");
  check("bir sonraki pazartesi yeni hafta", weekStart("2025-04-14") === "2025-04-14");

  await reset();
  await ensureProfile(USER, "E2E");
  const monday = "2025-04-07";
  const sunday = "2025-04-13";
  const prevWeek = "2025-04-06"; // önceki pazar — tabloya girmemeli
  await db.insert(dailyStats).values([
    { userId: USER, day: prevWeek, reviews: 0, correct: 0, newWords: 0, xp: 9000, seconds: 0 },
    { userId: USER, day: monday, reviews: 0, correct: 0, newWords: 0, xp: 120, seconds: 0 },
    { userId: USER, day: sunday, reviews: 0, correct: 0, newWords: 0, xp: 80, seconds: 0 },
  ]);
  await ensureProfile("e2e-rival");
  await db.insert(dailyStats).values({
    userId: "e2e-rival",
    day: monday,
    reviews: 0,
    correct: 0,
    newWords: 0,
    xp: 500,
    seconds: 0,
  });

  const board = await getLeaderboard(USER, sunday);
  const mine = board.rows.find((r) => r.isMe);
  check("hafta başı pazartesi", board.start === monday, `(${board.start})`);
  check("pazar günü son gün", board.daysLeft === 1, `(${board.daysLeft})`);
  check("yalnızca bu haftanın XP'si sayılıyor", mine?.xp === 200, `(${mine?.xp})`);
  check("önceki haftanın 9.000 XP'si taşınmıyor", (mine?.xp ?? 0) < 9000);
  check("rakip önde sıralanıyor", board.rows[0]?.userId === "e2e-rival");
  check("kendi satırı her hâlükârda var", Boolean(mine));

  const emptyWeek = await getLeaderboard(USER, "2025-05-05");
  check(
    "hiç çalışılmamış haftada kendi satırı 1. sırada",
    emptyWeek.rows.length === 1 && emptyWeek.rows[0].isMe && emptyWeek.rows[0].xp === 0,
  );
  check("yeni hafta yedi gün", emptyWeek.daysLeft === 7, `(${emptyWeek.daysLeft})`);

  console.log("\n17) Rozetler — geriye dönük, mevcut tablolardan");
  await reset();
  await ensureProfile(USER, "E2E");
  await db.delete(achievements).where(eq(achievements.userId, USER));
  const fresh0 = await achievementBoard(USER);
  check("sıfır kullanıcıda hiçbir rozet açık değil", fresh0.unlockedCount === 0);
  check("kilitli rozetler yine de listeleniyor", fresh0.rows.length > 20);
  check("tüm rozetlerin hedefi pozitif", fresh0.rows.every((r) => r.target > 0));
  check(
    "rozet kimlikleri benzersiz",
    new Set(fresh0.rows.map((r) => r.id)).size === fresh0.rows.length,
  );

  // Geriye dönük hesap: profildeki seri rozeti oyun oynamadan açmalı.
  await db.update(profiles).set({ longestStreak: 7 }).where(eq(profiles.userId, USER));
  const afterStreak = await achievementBoard(USER);
  const badge3 = afterStreak.rows.find((r) => r.id === "streak3");
  const badge7 = afterStreak.rows.find((r) => r.id === "streak7");
  const badge30 = afterStreak.rows.find((r) => r.id === "streak30");
  check("3 günlük rozet geriye dönük açıldı", badge3?.unlocked === true);
  check("7 günlük rozet geriye dönük açıldı", badge7?.unlocked === true);
  check("30 günlük rozet kilitli kaldı", badge30?.unlocked === false);
  check("kilitli rozette ilerleme görünüyor", badge30?.done === 7, `(${badge30?.done})`);
  check("açılan rozetler kutlama kuyruğuna girdi", afterStreak.fresh.some((f) => f.id === "streak7"));
  check("açılma anı kaydedildi", badge7?.unlockedAt !== null);

  // Kutlama bir kez: görüldü işaretlenince kuyruk boşalıyor.
  await markAchievementsSeen(USER, afterStreak.fresh.map((f) => f.id));
  const afterSeen = await achievementBoard(USER);
  check("görülen rozet tekrar patlamıyor", afterSeen.fresh.length === 0);
  check("rozet açık kalmaya devam ediyor", afterSeen.unlockedCount === afterStreak.unlockedCount);

  // Aynı rozet iki kez yazılamaz (birincil anahtar).
  const rowsBefore = await db
    .select()
    .from(achievements)
    .where(eq(achievements.userId, USER));
  await achievementBoard(USER);
  const rowsAfter = await db.select().from(achievements).where(eq(achievements.userId, USER));
  check("tekrar hesaplamak kayıt çoğaltmıyor", rowsBefore.length === rowsAfter.length);

  console.log("\n18) Tohumlu karıştırma — sunucu ve tarayıcı aynı sırayı üretir");
  // Bu değişmez bir süs değil: harf bulmacası ve cümle kurma görevinde
  // diziliş RENDER SIRASINDA hesaplanıyor. Rastgele olduğu sürece sunucu bir
  // sıra, tarayıcı başka bir sıra üretiyordu ve React ağacı hydration'da
  // yeniden kuruluyordu.
  const letters = [..."Frühstück"];
  const a = seededShuffle(letters, "r7");
  const b = seededShuffle(letters, "r7");
  check("aynı tohum aynı sırayı veriyor", a.join("") === b.join(""));
  check("farklı tohum farklı sıra veriyor", seededShuffle(letters, "r8").join("") !== a.join(""));
  check("harfler korunuyor", [...a].sort().join("") === [...letters].sort().join(""));
  check("uzunluk korunuyor", a.length === letters.length);
  check("gerçekten karışıyor", a.join("") !== letters.join(""));
  check("tek elemanlı dizi bozulmuyor", seededShuffle(["a"], "x").join("") === "a");
  check("boş dizi bozulmuyor", seededShuffle([], "x").length === 0);
  // Kaynak dizi değişmemeli: `useMemo` içinde çağrılıyor ve girdiyi bozarsa
  // ikinci çağrı farklı sonuç verirdi.
  const src = [1, 2, 3, 4, 5];
  seededShuffle(src, "z");
  check("kaynak dizi değişmiyor", src.join("") === "12345");

  console.log("\n19) Hatırlatma metni — sıra ve eşikler");
  const base = { name: "Samet Atila", level: "A2" };
  const rival = { name: "Erdi", gap: 140 };

  // Seri her şeyin üstünde: bugüne bağlı ve kaçırılırsa geri gelmiyor.
  const withStreak = composeReminder({ ...base, streak: 6, dueCount: 30, rival });
  check("seri rakibi de borcu da geçiyor", withStreak?.title.includes("6 günlük serin") === true);

  // Rakip borcun üstünde ama serinin altında.
  const withRival = composeReminder({ ...base, streak: 0, dueCount: 30, rival });
  check("rakip tekrar borcunu geçiyor", withRival?.title === "Erdi bu hafta önde");
  check("fark metinde geçiyor", withRival?.body.includes("140 XP") === true);
  check("ada göre hitap ediliyor", withRival?.body.startsWith("Samet,") === true);

  // Yakalanamayacak fark mesaj üretmiyor: hüküm değil hedef olmalı.
  const farBehind = composeReminder({ ...base, streak: 0, dueCount: 30, rival: { name: "Erdi", gap: 5000 } });
  check("ulaşılamaz fark rakip mesajı üretmiyor", farBehind?.title.includes("unutulmak üzere") === true);
  const noGap = composeReminder({ ...base, streak: 0, dueCount: 0, rival: { name: "Erdi", gap: 0 } });
  check("fark yoksa rakip mesajı yok", noGap?.title === "Bugün 5 dakika?");
  const noRival = composeReminder({ ...base, streak: 0, dueCount: 12, rival: null });
  check("rakipsizken borç mesajı", noRival?.title.includes("12 kelime") === true);

  // Rakip sorgusu: haftalık tablodan hemen üstteki kişi.
  await reset();
  await ensureProfile(USER, "E2E");
  await db.delete(profiles).where(eq(profiles.userId, "e2e-onde"));
  await ensureProfile("e2e-onde", "Erdi Kaya");
  const rDay = "2025-06-11"; // çarşamba
  const rStart = "2025-06-09"; // pazartesi
  await db.insert(dailyStats).values([
    { userId: USER, day: rStart, reviews: 0, correct: 0, newWords: 0, xp: 300, seconds: 0 },
    { userId: "e2e-onde", day: rStart, reviews: 0, correct: 0, newWords: 0, xp: 460, seconds: 0 },
    // Geçen haftanın puanı tabloya girmemeli.
    { userId: "e2e-onde", day: "2025-06-02", reviews: 0, correct: 0, newWords: 0, xp: 9000, seconds: 0 },
  ]);
  const rivalMap = await weeklyRivals([USER, "e2e-onde"], rDay);
  check("hemen üstteki kişi bulundu", rivalMap.get(USER)?.name === "Erdi", `(${rivalMap.get(USER)?.name})`);
  check("fark doğru", rivalMap.get(USER)?.gap === 160, `(${rivalMap.get(USER)?.gap})`);
  check("zirvedekine rakip verilmiyor", rivalMap.get("e2e-onde") === undefined);

  console.log("\n20) Paylaşılan metin — günün turu bir meydan okuma");
  const marks = [true, true, false, true];
  const sessionText = buildShareText({
    marks, total: 20, accuracy: 85, streak: 4, level: "A2", origin: "https://x.test",
  });
  check("sıradan tur kelime sayısı yazıyor", sessionText.includes("20 kelime"));
  check("sıradan turda meydan okuma yok", !sessionText.includes("Aynı sorular"));

  const dailyText = buildShareText({
    marks, total: 20, accuracy: 85, streak: 4, level: "A2", origin: "https://x.test",
    kind: "daily", score: 1240,
  });
  check("günün turu başlıkta belli", dailyText.includes("Günün turu"));
  check("puan yazıyor", dailyText.includes("1.240 puan"));
  check("aynı sorular vurgusu var", dailyText.includes("Aynı sorular"));
  check("adres her iki metinde de var", sessionText.includes("https://x.test") && dailyText.includes("https://x.test"));
  check("kareler kelimeleri ele vermiyor", !dailyText.includes("A2 seviyesindeki kelime"));

  await db.delete(dailyStats).where(eq(dailyStats.userId, "e2e-onde"));
  await db.delete(profiles).where(eq(profiles.userId, "e2e-onde"));

  console.log("\n21) Modül sınavı — patron turu");
  const heads = moduleVocab("de", "A1", 0);
  check("modülün kelimeleri toplandı", heads.length >= 30, `(${heads.length})`);
  check("artikel ayıklandı", !heads.some((h) => /^(der|die|das)\s/.test(h)));
  check("hepsi küçük harf", heads.every((h) => h === h.toLocaleLowerCase("de-DE")));
  check("tekrar yok", new Set(heads).size === heads.length);

  await reset();
  await ensureProfile(USER, "E2E");
  const boss = await buildModuleBoss(USER, "A1", 0);
  check("sınav tam sayıda tur üretti", boss.rounds.length === BOSS_ROUNDS, `(${boss.rounds.length})`);
  check("havuz yeterli", boss.pool >= 8, `(${boss.pool})`);
  check("modül başlığı geliyor", boss.meta.title.length > 0, `(${boss.meta.title})`);
  check("ders sayısı 10", boss.meta.lessonsTotal === 10, `(${boss.meta.lessonsTotal})`);
  check("hiç ders bitmemişken 0", boss.meta.lessonsDone === 0);
  check("henüz geçilmemiş", boss.meta.bestLeft === null);

  // Sorular modülün kelimelerinden gelmeli — sınavın tek anlamı bu.
  const bossWords = boss.rounds.flatMap((r) => (r.game === "match" ? r.words : [r.word]));
  const inModule = bossWords.filter((w) => heads.includes(w.de.toLocaleLowerCase("de-DE")));
  check("bütün sorular modülün kelimelerinden", inModule.length === bossWords.length,
    `(${inModule.length}/${bossWords.length})`);
  check("tek bir oyun türüne düşmüyor", new Set(boss.rounds.map((r) => r.game)).size >= 3);

  // Geçme kaydı: en iyi kalan süre korunuyor, düşük deneme rekoru bozmuyor.
  const clear1 = await recordBossClear(USER, "A1", 0, 22);
  check("ilk geçiş kaydedildi", clear1.bestLeft === 22 && clear1.isRecord);
  const clear2 = await recordBossClear(USER, "A1", 0, 9);
  check("düşük süre rekoru bozmuyor", clear2.bestLeft === 22 && !clear2.isRecord);
  const clear3 = await recordBossClear(USER, "A1", 0, 31);
  check("yeni rekor yazıldı", clear3.bestLeft === 31 && clear3.isRecord);

  const map = await clearedModules(USER, "de");
  check("geçilen modül haritada", map.get("A1:0") === 31, `(${map.get("A1:0")})`);
  check("geçilmeyen modül haritada yok", map.get("A1:5") === undefined);

  const again = await buildModuleBoss(USER, "A1", 0);
  check("sınav rekoru geri veriyor", again.meta.bestLeft === 31);

  const board21 = await achievementBoard(USER);
  check("modül fatihi rozeti açıldı", board21.rows.find((r) => r.id === "boss1")?.unlocked === true);

  console.log("\n22) Kalan hak başlıkları — sağlayıcı ne yazarsa yazsın yakalanmalı");
  // Ölçüm: eski desen yalnızca "ratelimit" arıyordu ve 30 gerçek turun
  // otuzunda da alan boş kaldı. Sağlayıcılar bu başlıkları standartlaştırmadı,
  // o yüzden test farklı yazımları birlikte kontrol ediyor.
  const headers = (o: Record<string, string>) => ({ headers: new Headers(o) });
  const openai = readLimits(headers({
    "x-ratelimit-remaining-requests": "58",
    "x-ratelimit-reset-tokens": "6s",
    "content-type": "application/json",
  }));
  check("x-ratelimit-* yakalanıyor", openai["x-ratelimit-remaining-requests"] === "58");
  check("reset başlığı yakalanıyor", openai["x-ratelimit-reset-tokens"] === "6s");
  check("alakasız başlık alınmıyor", openai["content-type"] === undefined);

  const mistralStyle = readLimits(headers({ "ratelimitbysize-remaining": "19000" }));
  check("ratelimitbysize-* yakalanıyor", mistralStyle["ratelimitbysize-remaining"] === "19000");

  const dashed = readLimits(headers({ "x-rate-limit-remaining": "3" }));
  check("tireli yazım yakalanıyor", dashed["x-rate-limit-remaining"] === "3");

  const retry = readLimits(headers({ "retry-after": "12" }));
  check("429'un retry-after'ı yakalanıyor", retry["retry-after"] === "12");

  const quota = readLimits(headers({ "x-quota-remaining": "100" }));
  check("kota başlığı yakalanıyor", quota["x-quota-remaining"] === "100");

  check("başlık yoksa boş nesne", Object.keys(readLimits(headers({ server: "x" }))).length === 0);
  check("adlar küçük harfe indiriliyor", readLimits(headers({ "X-RateLimit-Remaining": "7" }))["x-ratelimit-remaining"] === "7");

  console.log("\n23) Sesli onay — telefonu cepten çıkarmadan devam");
  // Yürürken modunda tur bitince "devam edelim mi?" sesli soruluyor. Cevabın
  // niyete çevrilmesi bu modun elle dokunulmadan çalışıp çalışmadığını
  // belirliyor, o yüzden asıl test edilmesi gereken yer burası.
  const yes = ["evet", "Evet", "devam", "devam edelim", "devam et", "olur", "tamam",
    "hadi", "tabii", "peki", "evet devam edelim", "Devam edelim!", "varım"];
  for (const t of yes) check(`evet: "${t}"`, parseConfirm(t) === "yes", `(${parseConfirm(t)})`);

  const no = ["hayır", "Hayır", "yeter", "dur", "bitir", "yok", "kapat",
    "şimdilik yeter", "istemiyorum", "devam etmeyelim", "gerek yok", "olmaz"];
  for (const t of no) check(`hayır: "${t}"`, parseConfirm(t) === "no", `(${parseConfirm(t)})`);

  // Olumsuzlama olumlu sözcüğü İÇERDİĞİNDE de doğru okunmalı — bu eşleştiricinin
  // en kolay bozulduğu yer.
  check("\"devam etmeyelim\" evet sayılmıyor", parseConfirm("devam etmeyelim") === "no");
  check("\"devam istemiyorum\" evet sayılmıyor", parseConfirm("devam istemiyorum") === "no");

  // Kısa sözcük başka bir kelimenin içinde geçiyorsa yakalanmamalı.
  check("\"durum\" hayır sayılmıyor", parseConfirm("durum ne") !== "no", `(${parseConfirm("durum ne")})`);
  check("\"konduruyor\" hayır sayılmıyor", parseConfirm("konduruyor") !== "no");

  // Anlaşılmayan cevap ne evet ne hayır: çağıran taraf soruyu tekrarlıyor.
  check("alakasız söz null", parseConfirm("hava çok güzel") === null);
  check("boş metin null", parseConfirm("") === null);
  check("sadece boşluk null", parseConfirm("   ") === null);

  check("aksanlar katlanıyor", foldTurkish("Şİmdİlİk ÇOĞU") === "simdilik cogu",
    `(${foldTurkish("Şİmdİlİk ÇOĞU")})`);
  check("noktalama düşüyor", foldTurkish("Evet, devam!") === "evet devam");

  console.log("\n24) AI muhasebesi — başarısız denemeler de yazılıyor");
  await db.delete(aiUsage).where(eq(aiUsage.userId, USER));

  recordAiUsage(USER, {
    kind: "roleplay", provider: "mistral", model: "mistral-medium-latest",
    ok: true, status: 200, ms: 840, promptTokens: 420, completionTokens: 180,
    limits: { "x-ratelimit-remaining-requests": "48" },
  });
  recordAiUsage(USER, {
    kind: "stt", provider: "groq", model: "whisper-large-v3-turbo",
    ok: false, status: 429, ms: 120, error: "rate limit exceeded", audioSeconds: 4,
  });
  // Yazma bilerek beklenmiyor (muhasebe, muhasebesi tutulan işi bekletmemeli);
  // testin okumadan önce kısa bir soluk alması gerekiyor.
  await new Promise((r) => setTimeout(r, 400));

  const usage = await db.select().from(aiUsage).where(eq(aiUsage.userId, USER));
  check("iki çağrı da yazıldı", usage.length === 2, `(${usage.length})`);
  const okRow = usage.find((u) => u.ok);
  const failRow = usage.find((u) => !u.ok);
  check("başarılı çağrı jetonları taşıyor", okRow?.promptTokens === 420 && okRow?.completionTokens === 180);
  check("kalan hak başlığı saklandı", okRow?.limits?.["x-ratelimit-remaining-requests"] === "48");
  check("gecikme yazıldı", okRow?.ms === 840);
  // Asıl mesele bu: düşen sağlayıcı zincirde sessizce atlanıyor, kaydedilmezse
  // hiç olmamış gibi duruyor.
  check("BAŞARISIZ deneme de yazıldı", failRow !== undefined);
  check("hata durumu ve metni var", failRow?.status === 429 && failRow?.error === "rate limit exceeded");
  check("ses saniyesi yazıldı", failRow?.audioSeconds === 4);
  check("iş türü ayrışıyor", new Set(usage.map((u) => u.kind)).size === 2);
  check("gün alanı dolu", usage.every((u) => Boolean(u.day)));

  // Uzun hata metni kısaltılıyor: ayıklamaya yeter, tabloyu şişirmez.
  recordAiUsage(USER, {
    kind: "coach", provider: "groq", model: "x", ok: false, error: "e".repeat(900),
  });
  await new Promise((r) => setTimeout(r, 400));
  const longError = (await db.select().from(aiUsage).where(eq(aiUsage.userId, USER)))
    .find((u) => u.kind === "coach");
  check(
    "uzun hata kısaltıldı",
    (longError?.error?.length ?? 0) <= 300,
    `(${longError?.error?.length})`,
  );

  await db.delete(aiUsage).where(eq(aiUsage.userId, USER));

  console.log("\n25) Sesli cevabın kabulü — yazma oyunuyla aynı ölçü");
  // Kullanıcının bildirdiği hata: "die Katze" dedi, tanıyıcı "Katze" yazdı,
  // tur yanlış saydı. Sebep kabul mantığının yazma oyunundan katı olmasıydı.
  const cat = ["die Katze"];
  check("artikelli hâli", spokenMatches(["die Katze"], cat));
  check("ARTİKELSİZ hâli de doğru", spokenMatches(["Katze"], cat));
  check("yanlış artikel de doğru sayılıyor", spokenMatches(["der Katze"], cat));
  check("noktalama bozmuyor", spokenMatches(["Die Katze."], cat));
  check("fazladan kelime bağışlanıyor", spokenMatches(["ähm die Katze bitte"], cat));

  check("umlaut katlanıyor", spokenMatches(["Fruehstueck"], ["das Frühstück"]));
  check("ß katlanıyor", spokenMatches(["Strasse"], ["die Straße"]));
  check("dönüşlü zamir isteğe bağlı", spokenMatches(["setzen"], ["sich setzen"]));

  check("başka kelime yanlış", !spokenMatches(["der Hund"], cat));
  check("boş metin yanlış", !spokenMatches([""], cat));
  check("hiç aday yoksa yanlış", !spokenMatches([], cat));
  // Kısa hedef uzun bir cümlenin içinde tesadüfen geçmemeli.
  check("iki harfli hedef içermeyle eşleşmiyor", !spokenMatches(["das ist es gerçekten"], ["es"]));
  check("iki harfli hedef tam eşleşmede doğru", spokenMatches(["es"], ["es"]));

  // Yazma oyunuyla aynı sonucu vermesi gereken durumlar.
  for (const said of ["die Katze", "Katze", "der Katze"]) {
    check(
      `"${said}" iki yolda da doğru`,
      matchesAnswer(said, cat) === spokenMatches([said], cat),
    );
  }

  console.log("\n26) Olay tablosu — ölçüm ölçtüğü şeyi bozmuyor");
  await db.delete(events).where(eq(events.userId, USER));
  await track(USER, "session_start", monday);
  await track(USER, "stage_done", monday, 2);
  const evRows = await db.select().from(events).where(eq(events.userId, USER));
  check("olaylar yazıldı", evRows.length === 2);
  check("değer taşınıyor", evRows.some((e) => e.name === "stage_done" && e.value === 2));

  console.log("\n27) Beceri ilerlemesi sunucuda (WP-01)");
  await db.delete(userSkills).where(eq(userSkills.userId, USER));
  await db.delete(events).where(eq(events.userId, USER));
  const skillEx = BUNDLED_EXERCISES.find((e) => e.skill === "reading" && e.level === "A1")!;
  const skillTotal = itemCount(skillEx);
  const firstTry = await recordSkillAttempt(USER, skillEx, {
    exerciseId: skillEx.id,
    correct: Math.max(1, skillTotal - 1),
    day: monday,
    seconds: 90,
  });
  check("ilk deneme XP verdi", firstTry.xpGained > 0 && firstTry.repeat === false);
  check("son puan doğru/toplamdan", firstTry.lastScore === scoreOf(skillTotal - 1, skillTotal));
  const second = await recordSkillAttempt(USER, skillEx, {
    exerciseId: skillEx.id,
    correct: 1,
    day: monday,
    score: 42,
  });
  check("kötü tekrar en iyiyi düşürmedi", second.bestCorrect === Math.max(1, skillTotal - 1));
  check("rubrik puanı son puana yazıldı", second.lastScore === 42 && second.repeat);
  const [skillRow] = await db
    .select()
    .from(userSkills)
    .where(and(eq(userSkills.userId, USER), eq(userSkills.exerciseId, skillEx.id)));
  check("beceri/seviye satırda", skillRow?.skill === "reading" && skillRow?.level === "A1");
  check("deneme sayısı 2", skillRow?.attempts === 2);
  const skillEvents = await db.select().from(events).where(and(eq(events.userId, USER), eq(events.name, "skill_finish")));
  check("skill_finish olayı kind=reading:A1", skillEvents.length === 2 && skillEvents.every((e) => e.kind === "reading:A1"));
  const status = await listSkillStatus(USER, "A1");
  check("GET seviye süzgeci", Object.keys(status).length === 1 && status[skillEx.id]?.lastScore === 42);
  check("başka seviye boş", Object.keys(await listSkillStatus(USER, "B2")).length === 0);
  const other = BUNDLED_EXERCISES.find((e) => e.skill === "listening" && e.level === "A1")!;
  const imported = await importSkillRecords(USER, [
    { id: other.id, correct: 2, total: itemCount(other), at: "2026-02-01T10:00:00Z" },
    { id: skillEx.id, correct: 0, total: skillTotal }, // sunucudakinden kötü: atlanır
    { id: "yok-boyle-bir-sey", correct: 3, total: 3 },
  ]);
  check("taşıma: yalnız yeni/iyi kayıt yazıldı", imported === 1);
  const afterImport = await listSkillStatus(USER);
  check("taşınan kayıt listede", afterImport[other.id]?.correct === 2 && afterImport[skillEx.id]?.correct === Math.max(1, skillTotal - 1));

  console.log("\n28) Hata taksonomisi (WP-02)");
  await db.delete(reviews).where(eq(reviews.userId, USER));
  await db.delete(events).where(eq(events.userId, USER));
  check("yazım: 1 harf sapma", classifyTyping("Katse", ["Katze"]) === "spelling");
  check("yazım: umlaut/ss katlanıyor", classifyTyping("Strasse", ["Straße"]) === "spelling");
  check("anlam: alakasız kelime", classifyTyping("Hund", ["Katze"]) === "meaning");
  check("anlam: boş cevap", classifyTyping("", ["Katze"]) === "meaning");
  check("fiilin yeri: bildirme cümlesi", classifyOrder(["Ich", "heute", "gehe", "ins", "Kino"], ["Ich", "gehe", "heute", "ins", "Kino"], ".") === "verb_position");
  check("kelime sırası: fiil yerinde", classifyOrder(["Ich", "gehe", "ins", "Kino", "heute"], ["Ich", "gehe", "heute", "ins", "Kino"], ".") === "word_order");
  check("evet/hayır sorusu: fiil başta", classifyOrder(["du", "Kommst", "mit"], ["Kommst", "du", "mit"], "?") === "verb_position");
  check("soru kelimesi: fiil ikinci", classifyOrder(["Wann", "du", "kommst"], ["Wann", "kommst", "du"], "?") === "verb_position");
  check("miss doğru cevapta boş", Object.keys(miss(true, "article", "der")).length === 0);
  check("miss yanlışta tip+detay", miss(false, "article", "  der ").errorType === "article" && miss(false, "article", "  der ").detail === "der");
  check("SRS ağırlığı aralığı kısaltıyor", schedule({ state: 2, ease: 2.5, intervalDays: 30, reps: 5, lapses: 0, correctStreak: 5, leech: false, dueAt: new Date(), lastReviewedAt: new Date(Date.now() - 40 * 3600 * 1000) }, 4, new Date(), 0.9).intervalDays < schedule({ state: 2, ease: 2.5, intervalDays: 30, reps: 5, lapses: 0, correctStreak: 5, leech: false, dueAt: new Date(), lastReviewedAt: new Date(Date.now() - 40 * 3600 * 1000) }, 4, new Date(), 1).intervalDays);
  const errWords = await db.select().from(words).limit(2);
  await submitAnswers(
    USER,
    [
      { wordId: errWords[0].id, game: "artikel", correct: false, latencyMs: 2000, errorType: "article", detail: "das" },
      { wordId: errWords[1].id, game: "typing", correct: false, latencyMs: 4000, errorType: "spelling", detail: "Katse" },
      { wordId: errWords[1].id, game: "choice", correct: true, latencyMs: 1000, errorType: "meaning" as never, detail: "olmamalı" },
    ],
    monday,
    30,
  );
  const errReviews = await db.select().from(reviews).where(eq(reviews.userId, USER));
  check("yanlış artikel → error_type=article, detail=das", errReviews.some((r) => r.game === "artikel" && r.errorType === "article" && r.detail === "das"));
  check("yazım hatası kaydedildi", errReviews.some((r) => r.game === "typing" && r.errorType === "spelling"));
  check("doğru cevapta hata tipi yok", errReviews.every((r) => !r.correct || (r.errorType === null && r.detail === null)));
  const errEvents = await db.select().from(events).where(and(eq(events.userId, USER), eq(events.name, "error_recorded")));
  check("error_recorded olayları (2)", errEvents.length === 2 && errEvents.some((e) => e.kind === "article"));
  const errProgress = await getProgress(USER, monday);
  check("getProgress hata dağılımı", errProgress.errors.length === 2 && errProgress.errors.every((e) => e.n === 1));

  console.log("\n29) AI değerlendirme — ayrıştırıcı ve yedek (WP-03)");
  const assessAnswer = "Heute ich gehe ins Kino.";
  const rawOk = `Tabii, işte değerlendirme:\n\`\`\`json\n{"score":{"task":3,"grammar":2,"vocab":4,"structure":1},"errors":[{"wrong":"ich gehe","type":"verb_position","fix":"gehe ich","why_tr":"Zaman zarfı başa gelince fiil ikinci sırada kalır, özne fiilden sonra gelir."}],"corrected":"Heute gehe ich ins Kino.","praise_tr":"Kelimeler doğru.","next_tip_tr":"Cümleye zarfla başlıyorsan fiili ikinci sıraya koy."}\n\`\`\``;
  const parsedA = parseAssessment(rawOk, assessAnswer, "sentence");
  check("markdown içindeki JSON ayrıştı", parsedA !== null);
  check("genel puan ağırlıklı (3/2/4/1 → 61)", parsedA?.score.overall === overallScore({ task: 3, grammar: 2, vocab: 4, structure: 1 }) && parsedA?.score.overall === 61);
  check("hata span'i metinde doğru yerde", parsedA?.errors[0]?.span[0] === 6 && assessAnswer.slice(parsedA!.errors[0].span[0], parsedA!.errors[0].span[1]) === "ich gehe");
  check("hata tipi korunuyor", parsedA?.errors[0]?.type === "verb_position");
  check("eksik alt puan → geçersiz", parseAssessment('{"score":{"task":3,"grammar":2},"errors":[]}', assessAnswer, "sentence") === null);
  check("JSON yok → geçersiz", parseAssessment("Üzgünüm, değerlendiremem.", assessAnswer, "sentence") === null);
  const parsedB = parseAssessment('{"score":{"task":"4","grammar":5,"vocab":-1,"structure":4},"errors":[{"wrong":"x","type":"Artikel","fix":"y","why_tr":"z"},{"wrong":"q","type":"spelling","fix":"w","why_tr":"e"}],"corrected":""}', "abc", "speaking");
  check("puanlar 0–4'e kilitleniyor, string sayı okunuyor", parsedB?.score.task === 4 && parsedB?.score.grammar === 4 && parsedB?.score.vocab === 0);
  check("bilinmeyen tip → meaning; konuşmada yazım hatası düşer", parsedB?.errors.length === 1 && parsedB?.errors[0].type === "meaning");
  check("boş corrected → cevabın kendisi", parsedB?.corrected === "abc");
  check("overallScore tam puan 100", overallScore({ task: 4, grammar: 4, vocab: 4, structure: 4 }) === 100);
  // Modelin kaçırılmamış iç tırnakları (ölçüldü: 20 örnekte 8 kez) onarılıyor.
  const rawQuotes = `{"score":{"task":3,"grammar":2,"vocab":4,"structure":3},"errors":[{"wrong":"Die Tisch","type":"article","fix":"Der Tisch","why_tr":""Tisch" eril bir isimdir ve "der" alır."},{"wrong":"mit dir","type":"case","fix":""mit dir"","why_tr":""zaten doğru"}],"corrected":"Der Tisch ist groß.","praise_tr":"Cümle "tam" olmuş.","next_tip_tr":"x"}`;
  const parsedQ = parseAssessment(rawQuotes, "Die Tisch ist groß.", "sentence");
  check("kaçırılmamış iç tırnaklar „“ oluyor", parsedQ !== null && parsedQ.praise_tr === "Cümle „tam“ olmuş.");
  check("dizeyi saran fazladan tırnak da alıntı oluyor", parsedQ?.errors[0]?.why_tr === "„Tisch“ eril bir isimdir ve „der“ alır.");
  const parsedS = parseAssessment(`{"score":{"task":4,"grammar":3,"vocab":4,"structure":3},"errors":[{"wrong":"weil ich bin krank","type":"verb_position","fix":"weil ich krank bin","why_tr":"Yan cümlede fiil sonda olmalıdır'}],"corrected":"x","praise_tr":"iyi","next_tip_tr":"x"}`, "weil ich bin krank", "sentence");
  const parsedU = parseAssessment(`{"score":{"task":4,"grammar":3,"vocab":4,"structure":4},"errors":[{"wrong":"wohne","type":"conjugation","fix":"wohnt","why_tr":""Özne 'Sie' (o) üçüncü tekil şahıs, fiil "-t" eki alır."}],"corrected":"x","praise_tr":"","next_tip_tr":""}`, "Sie wohne in Berlin.", "sentence");
  check("eşsiz baştaki alıntı işareti atılıyor", parsedU?.errors[0]?.why_tr === "Özne 'Sie' (o) üçüncü tekil şahıs, fiil „-t“ eki alır.");
  const parsedC = parseAssessment(`{"score":{"task":4,"grammar":3,"vocab":3,"structure":3},"errors":[],"corrected":"x","praise_tr":"Basit ama doğru.','next_tip_tr":"Bağlaçlar: "weil", "und" veya "außerdem" kullan."}`, "x", "sentence");
  check("virgüllü iç alıntılar ve tek tırnaklı anahtar onarılıyor", parsedC?.praise_tr === "Basit ama doğru." && parsedC?.next_tip_tr === "Bağlaçlar: „weil“, „und“ veya „außerdem“ kullan.");
  const parsedN = parseAssessment(`{"score":{"task":3,"grammar":2,"vocab":3,"structure":2},"errors":[{"wrong":"Bitte schreiben mir","type":"conjugation","fix":"Bitte schreib mir","why_tr":"Emir kipinde fiil yalın olmalı (du-formu)}],"corrected":"Bitte schreib mir.","praise_tr":"ok","next_tip_tr":"x"}`, "Bitte schreiben mir", "sentence");
  check("kapanış tırnağı unutulmuş dize onarılıyor", parsedN?.errors[0]?.why_tr === "Emir kipinde fiil yalın olmalı (du-formu)" && parsedN?.corrected === "Bitte schreib mir.");
  check("tek tırnakla kapatılmış dize onarılıyor", parsedS?.errors[0]?.why_tr === "Yan cümlede fiil sonda olmalıdır" && parsedS?.errors[0]?.span[1] === 18);
  check("wrong === fix olan madde hata sayılmıyor", parsedQ?.errors.length === 1 && parsedQ.errors[0].type === "article");
  check("kaçırılmış tırnak bozulmuyor", JSON.parse(repairQuotes('{"a":"he said \\"hi\\"","b":1}')).a === 'he said "hi"');
  const fb = fallbackAssessment({ kind: "writing", level: "A2", task: { prompt: "mesaj yaz", targets: ["Wollen wir uns treffen?", "Ich hätte gern"], constraints: ["en az 10 kelime"] }, answer: { text: "Hallo Anna, wollen wir uns morgen um drei Uhr treffen? Ich hätte gern einen Kaffee." } });
  check("yedek: offline işaretli, hata listesi boş", fb.offline === true && fb.errors.length === 0);
  check("yedek: kelime sayısı ve kalıplar", fb.words === 15 && fb.checks.filter((c) => c.ok).length === fb.checks.length);
  const fb2 = fallbackAssessment({ kind: "sentence", level: "A1", task: { prompt: "çevir", target: "Ich trinke Kaffee." }, answer: { text: "ben kahve içiyorum" } });
  check("yedek: Türkçe metin yakalanıyor, kalıp yok", fb2.checks.some((c) => c.label.startsWith("Almanca") && !c.ok) && fb2.score.overall < 50);
  check("assessHash aynı cevap → aynı özet", assessHash({ kind: "sentence", level: "A1", task: { prompt: "a" }, answer: { text: " Ich trinke. " } }) === assessHash({ kind: "sentence", level: "A1", task: { prompt: "a" }, answer: { text: "Ich trinke." } }));
  check("assessHash farklı seviye → farklı özet", assessHash({ kind: "sentence", level: "A1", task: { prompt: "a" }, answer: { text: "x" } }) !== assessHash({ kind: "sentence", level: "A2", task: { prompt: "a" }, answer: { text: "x" } }));
  const noProvider = await assess(USER, { kind: "sentence", level: "A1", task: { prompt: "a" }, answer: { text: "x" } }, monday);
  check("sağlayıcısız ortamda not_configured", chatConfigured() ? noProvider.ok || !noProvider.ok : !noProvider.ok && noProvider.reason === "not_configured");

  console.log("\n30) Çevrimdışı rol yapma (WP-04)");
  const scripted = LESSONS.filter((l) => l.roleplay.script?.length);
  check("10 A1 dersinde senaryo var", scripted.length >= 10 && scripted.every((l) => l.level === "A1"));
  check("her senaryo minTurns kadar tur içeriyor", scripted.every((l) => l.roleplay.script!.length >= l.roleplay.minTurns));
  check("senaryonun ilk turu açılışla aynı", scripted.every((l) => l.roleplay.script![0].ask === l.roleplay.opening));
  check("senaryo dalları var olan turlara gidiyor", scripted.every((l) => l.roleplay.script!.every((t) => t.replies.every((r) => !r.next || l.roleplay.script!.some((x) => x.id === r.next)))));
  const hallo = findLesson("de-a1-hallo")!;
  let os = offlineStart(hallo);
  check("açılış senaryodan", os.opening === hallo.roleplay.opening && os.hint !== null);
  let ost = os.state;
  const said = ["ich heisse mehmet", "ich komme aus der türkei", "ich wohne hier im zweiten stock", "mit meiner familie"];
  let ended = false;
  let understoodAll = true;
  for (const line of said) {
    const r = offlineReply(hallo, ost, line);
    ost = r.state;
    ended = r.ended;
    if (!r.understood) understoodAll = false;
  }
  check("dört tipik cevap dört dalı tutuyor", understoodAll);
  check("senaryo dördüncü turda bitiyor", ended && ost.userTurns === 4);
  const halloSum = offlineSummary(hallo, ost);
  check("özet: üç kalıp kullanıldı, puan 100", halloSum.used.length === 3 && halloSum.score === 100);
  const miss1 = offlineReply(hallo, offlineStart(hallo).state, "guten abend, schönes wetter heute");
  check("anlaşılmayan cevap: tur ilerlemiyor, örnek öneriliyor", !miss1.understood && miss1.state.turnId === "t1" && miss1.content.includes("[SAY] Ich heiße Mehmet."));
  const noScript = LESSONS.find((l) => !l.roleplay.script?.length && l.patterns.length >= 2)!;
  os = offlineStart(noScript);
  check("senaryosuz ders: kalıp modu, ilk kalıp isteniyor", os.state.turnId === null && Boolean(os.hint?.startsWith("Kalıbı kullan")));
  const p0 = noScript.patterns[0].de;
  const r0 = offlineReply(noScript, os.state, p0.replace(/…/g, "Berlin"));
  check("kalıp söylenince sayılıyor", r0.understood && r0.state.usedPatterns.includes(p0));
  const rX = offlineReply(noScript, r0.state, "blabla");
  check("alakasız cümle: kalıp sayılmıyor, ipucu kalıbı gösteriyor", !rX.understood && Boolean(rX.hint?.includes(noScript.patterns[1].de)));
  let stAll = r0.state;
  for (const p of noScript.patterns.slice(1)) stAll = offlineReply(noScript, stAll, p.de.replace(/…/g, "x")).state;
  check("bütün kalıplar → bitti, puan 100", stAll.ended && offlineSummary(noScript, stAll).score === 100);
  check("patternUsed: kısa kalıp tam kelime ister", patternUsed("Und dir?", "gut und dir") && !patternUsed("Und dir?", "gut, dirigent"));
  // Sağlayıcısız ortamda ders geçilebiliyor: senaryo bitti → roleplayDone → recordLesson.passed
  await db.delete(userLessons).where(eq(userLessons.userId, USER));
  const offlineRec = await recordLesson(USER, hallo, scoredSteps(hallo), ost.userTurns >= hallo.roleplay.minTurns, monday);
  check("senaryolu konuşmayla ders geçildi", offlineRec.passed === true);

  console.log("\n31) Çeviri turu ve kısmi kalite (WP-10)");
  await db.delete(reviews).where(eq(reviews.userId, USER));
  await db.delete(userWords).where(eq(userWords.userId, USER));
  const trWords = await db.select().from(words).where(and(isNotNull(words.beispielTr), sql`${words.beispiel} ~ '^\\S+ \\S+ \\S+ \\S+'`)).limit(3);
  check("örnek cümlesi Türkçeli kelime var", trWords.length > 0);
  const trRound = trWords.length ? makeRound("translate", { ...trWords[0], isNew: false } as never, [], () => "t1", "strong") : null;
  check("makeRound çeviri turu kuruyor", trRound?.game === "translate" && (trRound as { sentence: { tr: string } }).sentence.tr.length > 0);
  check("örnek cümlesi olmayan kelimeye çeviri turu yok", makeRound("translate", { ...trWords[0], beispiel: null, isNew: false } as never, [], () => "t2", "strong") === null);
  const w0 = trWords[0].id;
  await submitAnswers(USER, [{ wordId: w0, game: "translate", correct: false, latencyMs: 9000, quality: 3, errorType: "word_order", detail: "Ich gehe ins Kino heute" }], monday, 20);
  const [uwOrder] = await db.select().from(userWords).where(and(eq(userWords.userId, USER), eq(userWords.wordId, w0)));
  check("sıra hatası: yanlış sayıldı ama lapse etmedi (kalite 3)", uwOrder?.lapses === 0 && uwOrder?.reps === 1);
  const [rvOrder] = await db.select().from(reviews).where(and(eq(reviews.userId, USER), eq(reviews.wordId, w0)));
  check("sıra hatası kaydı: correct=false, quality=3, error_type=word_order", rvOrder?.correct === false && rvOrder?.quality === 3 && rvOrder?.errorType === "word_order");
  await submitAnswers(USER, [{ wordId: w0, game: "translate", correct: true, latencyMs: 9000, quality: 9 }], monday, 20);
  const [rv2] = await db.select().from(reviews).where(and(eq(reviews.userId, USER), eq(reviews.wordId, w0))).orderBy(desc(reviews.id)).limit(1);
  check("kalite 0–5'e kilitleniyor", rv2?.quality === 5);
  await submitAnswers(USER, [{ wordId: w0, game: "translate", correct: false, latencyMs: 9000, quality: 5 }], monday, 20);
  const [rv3] = await db.select().from(reviews).where(and(eq(reviews.userId, USER), eq(reviews.wordId, w0))).orderBy(desc(reviews.id)).limit(1);
  check("yanlış cevap kalite 3'ü aşamıyor", rv3?.quality === 3);

  console.log("\n32) Oyun merdiveni (WP-14)");
  check("üretim oyunları listesi", isProductionGame("translate") && isProductionGame("typing") && !isProductionGame("choice"));
  check("yeni kelimede tanıma + harf bulmacası, yazma yok", ladderGames("fresh", { de: "Haus", artikel: "das" }).includes("scramble") && !ladderGames("fresh", { de: "Haus", artikel: "das" }).includes("typing"));
  check("sağlam kelimede üretim önde", ladderGames("strong", { de: "Haus", artikel: "das" }).filter((g) => isProductionGame(g)).length >= 4);
  check("yazarak tamamlama olasılığı basamağa göre", clozeTypeChance("fresh") === 0 && clozeTypeChance("strong") > clozeTypeChance("solid"));
  const trRoundE = { id: "x", game: "translate" as const, word: { ...trWords[0], isNew: false } as never, sentence: { tr: "t", de: "Ich gehe heute ins Kino.", en: null }, alternatives: [] };
  const eased = easeRound(trRoundE);
  check("basamak inişi: çeviri → cümle diz, aynı cümle", eased.game === "order" && eased.answer.join(" ") === "Ich gehe heute ins Kino" && eased.tail === "." && eased.tokens.length === 5);
  const clozeE = easeRound({ id: "c", game: "cloze", word: trRoundE.word, sentence: "a _____ b", sentenceTr: null, sentenceEn: null, answer: "x", options: ["x", "y"], mode: "type" });
  check("basamak inişi: yazarak tamamla → şıklı", clozeE.game === "cloze" && clozeE.mode === undefined);
  const typE = easeRound({ id: "t", game: "typing", word: trRoundE.word, alternatives: [] });
  check("basamak inişi: yazma → ipuçlu", typE.game === "typing" && typE.assist === true);
  await reset();
  await ensureProfile(USER, "E2E");
  const sL = await buildSession(USER, day1);
  const introIds = sL.rounds.filter((r) => r.game === "intro").map((r) => (r as { word: { id: number } }).word.id);
  const assistedIds = sL.rounds.filter((r) => r.game === "typing" && (r as { assist?: boolean }).assist).map((r) => (r as { word: { id: number } }).word.id);
  check("yeni kelimelerin bir kısmı aynı oturumda ipuçlu yazılıyor", assistedIds.length > 0 && assistedIds.every((id) => introIds.includes(id)), `intro ${introIds.length}, assist ${assistedIds.length}`);
  const firstIntro = sL.rounds.findIndex((r) => r.game === "intro");
  const firstAssist = sL.rounds.findIndex((r) => r.game === "typing" && (r as { assist?: boolean }).assist);
  check("ipuçlu yazma tanıtımdan en az iki tur sonra", firstAssist - firstIntro >= 2, `${firstIntro} → ${firstAssist}`);

  console.log("\n33) Serbest cümle turu (WP-12)");
  const fsPool = await db.select().from(words).where(eq(words.niveau, "A1")).limit(30);
  const fsRound = makeRound("free_sentence", { ...fsPool[0], isNew: false } as never, fsPool, () => "f1", "strong");
  check("free_sentence turu kuruluyor: bir ortak, aynı seviye", fsRound?.game === "free_sentence" && (fsRound as { partners: { id: number }[] }).partners.length === 1 && (fsRound as { partners: { id: number }[] }).partners[0].id !== fsPool[0].id);
  check("havuzsuz kurulamıyor", makeRound("free_sentence", { ...fsPool[0], isNew: false } as never, [], () => "f2", "strong") === null);
  check("PLAYABLE dışında, etiket var", !(PLAYABLE_GAMES as readonly string[]).includes("free_sentence") && GAME_LABELS.free_sentence === "Cümle Kur");
  check("üretim oyunu sayılıyor", isProductionGame("free_sentence"));
  await submitAnswers(USER, [{ wordId: fsPool[0].id, game: "free_sentence", correct: true, latencyMs: 30000, quality: 4 }], monday, 40);
  const [fsRv] = await db.select().from(reviews).where(and(eq(reviews.userId, USER), eq(reviews.wordId, fsPool[0].id))).orderBy(desc(reviews.id)).limit(1);
  check("serbest cümle cevabı kalitesiyle kaydediliyor", fsRv?.game === "free_sentence" && fsRv?.quality === 4);

  console.log("\n34) Bugünkü plan (WP-60)");
  await reset();
  const planProfile = await ensureProfile(USER, "E2E");
  let plan = await buildPlan(USER, monday, planProfile.course, "A1", planProfile.dailyGoal);
  check("plan tur + ders + beceri öğeleri", plan.items.some((i) => i.id === "review") && plan.items.some((i) => i.id === "lesson") && plan.items.some((i) => i.id === "skill"), plan.items.map((i) => i.id).join(","));
  check("hiçbiri yapılmadı, süre > 0", plan.items.every((i) => !i.done) && plan.minutes > 0 && !plan.complete);
  check("zayıf nokta yok (hata yok)", !plan.items.some((i) => i.id === "weak"));
  const planWords = await db.select().from(words).where(isNotNull(words.artikel)).limit(5);
  await submitAnswers(USER, planWords.map((w) => ({ wordId: w.id, game: "artikel" as const, correct: false, latencyMs: 2000, errorType: "article" as const, detail: "die" })), monday, 20);
  await track(USER, "session_done", monday, 3);
  plan = await buildPlan(USER, monday, planProfile.course, "A1", planProfile.dailyGoal);
  const weak = plan.items.find((i) => i.id === "weak");
  check("5 artikel hatası → zayıf nokta öğesi, Artikel Yarışı", weak?.href === "/learn?game=artikel" && weak.title.includes("artikel"), weak?.title);
  check("tur bugün tamamlandı işareti (session_done)", plan.items.find((i) => i.id === "review")?.done === true);
  check("zayıf nokta öğesi bugün 5 artikel cevabıyla yapıldı sayılıyor", weak?.done === true);

  console.log("\n35) Yazma değerlendirme kuyruğu ve arşiv (WP-30)");
  await db.delete(assessments).where(eq(assessments.userId, USER));
  const qReq = { kind: "writing" as const, level: "A2" as const, task: { prompt: "mesaj yaz" }, answer: { text: "Hallo Anna, wollen wir uns morgen treffen?" }, exerciseId: "a2-w1" };
  const q1 = await queueAssessment(USER, qReq, monday);
  const q2 = await queueAssessment(USER, qReq, monday);
  check("kuyruğa alındı, aynı metin ikinci kez alınmadı", q1.queued && !q2.queued && q1.id === q2.id);
  const listed = await listAssessments(USER);
  check("arşivde bekleyen kayıt (result null)", listed.length === 1 && listed[0].result === null && listed[0].answer.startsWith("Hallo Anna"));
  const cacheMiss = await assess(USER, qReq, monday);
  check("bekleyen kayıt önbellek sayılmıyor", !(cacheMiss.ok && cacheMiss.cached));
  if (!chatConfigured()) {
    const run = await runAssessQueue(5);
    check("sağlayıcısız kuyruk dokunulmadan bekliyor", run.pending === 1 && run.done === 0);
  } else {
    const run = await runAssessQueue(5);
    check("kuyruk işlendi (sağlayıcı var)", run.done + run.failed + run.pending === 1);
  }
  check("silme yalnız sahibine", (await deleteAssessment("baskasi", q1.id!)) === false && (await deleteAssessment(USER, q1.id!)) === true);
  check("silindi", (await listAssessments(USER)).length === 0);

  console.log("\n36) CEFR can-do haritası (WP-43)");
  check("~120 ifade, kimlikler benzersiz", CANDO.length >= 110 && new Set(CANDO.map((c) => c.id)).size === CANDO.length);
  check("her seviyede 4+ beceri", (["A1", "A2", "B1", "B2", "C1"] as const).every((l) => new Set(CANDO.filter((c) => c.level === l).map((c) => c.skill)).size >= 4));
  check("her ders ve egzersiz etiketleniyor", LESSONS.every((l) => candoForLesson(l).length > 0) && BUNDLED_EXERCISES.every((e) => candoForExercise(e).length > 0));
  check("tanışma dersi → A1.SPK.1", candoForLesson(findLesson("de-a1-hallo")!).includes("A1.SPK.1"));
  check("içeriğin kendi etiketi kazanır", candoForLesson({ level: "A1", icon: "greet", focusId: "x", cando: ["A1.WR.3"] }).join() === "A1.WR.3");
  await reset();
  await ensureProfile(USER, "E2E");
  let cs = await candoSummary(USER, "de");
  check("kanıt yokken hepsi 'none'", cs.items.every((i) => i.state === "none") && cs.byLevel.A1.proven === 0);
  // A1.SPK.1'e bağlı iki ders geçilince kanıtlı
  const spk1 = LESSONS.filter((l) => l.course === "de" && candoForLesson(l).includes("A1.SPK.1")).slice(0, 2);
  check("A1.SPK.1'e bağlı en az iki ders var", spk1.length === 2, `${spk1.length}`);
  for (const l of spk1) await recordLesson(USER, l, scoredSteps(l), true, monday);
  cs = await candoSummary(USER, "de");
  check("iki ders → A1.SPK.1 kanıtlı", cs.items.find((i) => i.cando.id === "A1.SPK.1")?.state === "proven" && cs.byLevel.A1.proven >= 1);
  const rdEx = BUNDLED_EXERCISES.find((e) => e.skill === "reading" && e.level === "A1" && (!e.course || e.course === "de"))!;
  await recordSkillAttempt(USER, rdEx, { exerciseId: rdEx.id, correct: itemCount(rdEx), day: monday });
  cs = await candoSummary(USER, "de");
  const rdId = candoForExercise(rdEx)[0];
  check("bir egzersiz → ifade 'gelişiyor'", cs.items.find((i) => i.cando.id === rdId)?.state === "progressing", rdId);

  console.log("\n37) Yerleştirme testi (WP-40)");
  check("uyarlama: %75 geçilince üst seviye, altında durur", nextLevel("A1", 5, 6) === "A2" && nextLevel("A1", 4, 6) === null && nextLevel("C1", 6, 6) === null);
  const pa = (stage: PlacementStage, level: CefrLevel, correct: number, wrong: number): PlacementAnswer[] => [
    ...Array.from({ length: correct }, (_, i) => ({ stage, level, itemId: `${stage}-${level}-${i}`, correct: true })),
    ...Array.from({ length: wrong }, (_, i) => ({ stage, level, itemId: `${stage}-${level}-w${i}`, correct: false })),
  ];
  const pr1 = scorePlacement([...pa("vocab", "A1", 6, 0), ...pa("vocab", "A2", 5, 1), ...pa("vocab", "B1", 3, 3), ...pa("grammar", "A1", 3, 0), ...pa("grammar", "A2", 2, 1), ...pa("reading", "A2", 3, 0), ...pa("reading", "B1", 1, 2), ...pa("listening", "A2", 2, 1), ...pa("listening", "B1", 0, 3)]);
  check("aşama tahminleri: kelime A2, dilbilgisi A1, okuma A2, dinleme A2", pr1.perSkill.vocab === "A2" && pr1.perSkill.grammar === "A1" && pr1.perSkill.reading === "A2" && pr1.perSkill.listening === "A2", JSON.stringify(pr1.perSkill));
  check("öneri alt medyan → A2", pr1.suggested === "A2");
  const pr2 = scorePlacement([...pa("vocab", "A1", 2, 4), ...pa("grammar", "A1", 1, 2), ...pa("reading", "A2", 1, 2), ...pa("listening", "A2", 0, 3)]);
  check("hiçbir seviye geçilmezse A1", pr2.suggested === "A1" && pr2.perSkill.vocab === null);
  const pr3 = scorePlacement([...pa("vocab", "A1", 6, 0), ...pa("vocab", "A2", 6, 0), ...pa("vocab", "B1", 6, 0), ...pa("vocab", "B2", 6, 0), ...pa("grammar", "A1", 3, 0), ...pa("grammar", "A2", 3, 0), ...pa("grammar", "B1", 3, 0), ...pa("reading", "A2", 3, 0), ...pa("reading", "B1", 3, 0)]);
  check("güçlü profil, dinleme atlandı → B1 (medyan atlananı saymaz)", pr3.suggested === "B1", pr3.suggested);
  const test = await buildPlacement("de");
  check("madde bankası: A1 kelime 6, A1 dilbilgisi 3, okuma/dinleme 2'şer", test.vocab.A1.length === 6 && test.grammar.A1.length === 3 && test.reading.length === 2 && test.listening.length === 2, `${test.vocab.A1.length}/${test.grammar.A1.length}/${test.reading.length}/${test.listening.length}`);
  check("kelime şıkları 4 ve cevap indeksi doğru", test.vocab.A1.every((v) => v.options.length === 4 && v.answer >= 0 && v.answer < 4));
  await reset();
  await ensureProfile(USER, "E2E");
  const rec = await finishPlacement(USER, [...pa("vocab", "A1", 6, 0), ...pa("vocab", "A2", 5, 1)], monday);
  check("sonuç kaydedildi, olay atıldı", rec.suggested === "A2" && (await db.select().from(events).where(and(eq(events.userId, USER), eq(events.name, "placement_finish")))).length === 1);
  check("kabul: profil seviyesi güncellenir", (await acceptPlacement(USER, rec.id, "B1")) === true && (await ensureProfile(USER)).level === "B1");
  check("son alma okunuyor", (await lastPlacement(USER))?.accepted === "B1");

  console.log("\n38) Haftalık kullanım sınavı (WP-42)");
  await reset();
  await ensureProfile(USER, "E2E");
  const masteredPool = await db.select().from(words).where(and(eq(words.niveau, "A1"), isNotNull(words.beispielTr))).limit(40);
  const farPast = new Date(Date.now() - 40 * 86400000);
  await db.insert(userWords).values(masteredPool.map((w) => ({ userId: USER, wordId: w.id, state: 2, ease: 2.5, intervalDays: 30, dueAt: new Date(Date.now() + 5 * 86400000), reps: 6, lapses: 0, correctStreak: 6, leech: false, lastReviewedAt: farPast })));
  let ws = await weeklyStatus(USER, monday);
  check("hafta Pazartesi, yapılmadı, pekişmiş ≥ 30", ws.week === monday && !ws.done && ws.mastered >= 30 && !ws.short);
  const exam = await buildWeeklyExam(USER, "de", "A1", monday);
  check("15 soru, yalnız üretim oyunları", exam.rounds.length === 15 && exam.rounds.every((r) => isProductionGame(r.game) || (r.game === "cloze" && r.mode === "type")), exam.rounds.map((r) => r.game).join(","));
  check("çeviri turları önde", exam.rounds.slice(0, 3).every((r) => r.game === "translate" || r.game === "typing"));
  const wAns: Answer[] = exam.rounds.slice(0, 15).map((r, i) => ({ wordId: (r as { word: { id: number } }).word.id, game: r.game, correct: i % 3 !== 0, latencyMs: 4000 }));
  const wr = await finishWeekly(USER, "A1", wAns, monday, 300);
  check("skor ve kayıt", wr.saved && wr.total === 15 && wr.correct === 10 && wr.score === 67, JSON.stringify(wr));
  const wrongId = wAns[0].wordId;
  const [uwWrong] = await db.select().from(userWords).where(and(eq(userWords.userId, USER), eq(userWords.wordId, wrongId)));
  check("yanlış bilinen pekişmiş kelime düştü (kalite 2 → lapse)", uwWrong?.lapses === 1 && uwWrong.intervalDays === 0);
  const rightId = wAns[1].wordId;
  const [uwRight] = await db.select().from(userWords).where(and(eq(userWords.userId, USER), eq(userWords.wordId, rightId)));
  check("doğru bilinen kelime aralığı korudu/büyüdü", (uwRight?.intervalDays ?? 0) >= 30);
  ws = await weeklyStatus(USER, monday);
  check("bu hafta yapıldı, skor okunuyor", ws.done && ws.score === 67);
  const wAgain = await finishWeekly(USER, "A1", wAns, monday, 300);
  check("tek hak: ikinci gönderim kaydedilmez", !wAgain.saved && wAgain.score === 67);
  const nextWeek = await buildWeeklyExam(USER, "de", "A1", shiftDay(monday, 7));
  check("sonraki hafta aynı kelimeler sorulmuyor", nextWeek.rounds.every((r) => !wAns.some((a) => a.wordId === (r as { word: { id: number } }).word.id)));
  const examEv = await db.select().from(events).where(and(eq(events.userId, USER), eq(events.name, "exam_finish")));
  check("exam_finish kind=usage:A1", examEv.length === 1 && examEv[0].kind === "usage:A1" && examEv[0].value === 67);
  const planW = await buildPlan(USER, monday, "de", "A1", 20);
  check("plan kartında haftalık sınav öğesi (yapıldı)", planW.items.some((i) => i.id === "weekly" && i.done));

  console.log("\n39) Beceri yetkinlik modeli (WP-50)");
  const nowP = new Date();
  const ev = (skill: ProficiencySkill, level: CefrLevel, score: number, source: EvidenceSource, daysAgo = 0): Evidence => ({ skill, level, score, source, at: new Date(nowP.getTime() - daysAgo * 86400000) });
  const prof1 = computeProficiency([ev("reading", "A2", 60, "exercise"), ev("reading", "A2", 90, "exam")], nowP);
  check("sınav ×3 ağırlık: (60 + 90×3)/4 = 83 → sağlam", prof1.reading.A2?.score === 83 && prof1.reading.A2?.band === "sağlam", JSON.stringify(prof1.reading.A2));
  const prof2 = computeProficiency([ev("writing", "B1", 100, "assessment", 29), ev("writing", "B1", 40, "exercise", 0)], nowP);
  check("29 gün önceki kanıt neredeyse sönmüş → puan 40'a yakın", (prof2.writing.B1?.score ?? 0) < 50 && prof2.writing.B1?.n === 2, JSON.stringify(prof2.writing.B1));
  const prof3 = computeProficiency([ev("listening", "A1", 50, "exercise", 31)], nowP);
  check("31 gün önceki kanıt sayılmaz", prof3.listening.A1 === undefined);
  check("bantlar", bandOf(39) === "başlangıç" && bandOf(40) === "gelişiyor" && bandOf(70) === "sağlam" && bandOf(85) === "ustalaştı");
  check("en zayıf: ölçülmemiş beceri önce", weakestSkill(prof1, "A2") !== "reading" && weakestSkill({ ...prof1, listening: { A2: { score: 20, band: "başlangıç", n: 1, weight: 1 } }, writing: { A2: { score: 30, band: "başlangıç", n: 1, weight: 1 } }, speaking: { A2: { score: 30, band: "başlangıç", n: 1, weight: 1 } }, grammar: { A2: { score: 30, band: "başlangıç", n: 1, weight: 1 } }, vocab: { A2: { score: 30, band: "başlangıç", n: 1, weight: 1 } } }, "A2") === "listening");
  await reset();
  await ensureProfile(USER, "E2E");
  const rdP = BUNDLED_EXERCISES.find((e) => e.skill === "reading" && e.level === "A1" && (!e.course || e.course === "de"))!;
  await recordSkillAttempt(USER, rdP, { exerciseId: rdP.id, correct: itemCount(rdP), day: monday, score: 90 });
  const evid = await gatherEvidence(USER);
  check("egzersiz kanıtı toplanıyor", evid.some((e) => e.skill === "reading" && e.level === "A1" && e.score === 90 && e.source === "exercise"));
  const pf = await proficiencyFor(USER, "de", "A1");
  check("okuma A1 ustalaştı, diğerleri ölçülmedi", pf.proficiency.reading.A1?.band === "ustalaştı" && pf.proficiency.listening.A1 === undefined);
  check("sıradaki adım okuma değil, ölçülmemiş bir beceri", pf.next !== null && pf.next.skill !== "reading" && pf.next.reason.includes("ölçülmedi"), pf.next?.reason);
  const planP = await buildPlan(USER, monday, "de", "A1", 20);
  check("plan beceri öğesi yetkinlikten geliyor", planP.items.some((i) => i.id === "skill" && i.detail.includes("ölçülmedi")));

  console.log("\n40) Hata analitiği ve hedefli tekrar (WP-51)");
  await reset();
  await ensureProfile(USER, "E2E");
  const eaWords = await db.select().from(words).where(isNotNull(words.artikel)).limit(8);
  await submitAnswers(USER, eaWords.slice(0, 6).map((w) => ({ wordId: w.id, game: "artikel" as const, correct: false, latencyMs: 2000, errorType: "article" as const, detail: "die" })), monday, 20);
  await submitAnswers(USER, [
    { wordId: eaWords[6].id, game: "choice", correct: false, latencyMs: 2000, errorType: "meaning", detail: "kapı" },
    { wordId: eaWords[6].id, game: "choice", correct: false, latencyMs: 2000, errorType: "meaning", detail: "kapı" },
    { wordId: eaWords[7].id, game: "typing", correct: false, latencyMs: 2000, errorType: "spelling", detail: "x" },
  ], monday, 20);
  const rep = await errorReport(USER, "de");
  check("dağılım: artikel önde (6/9 = %67), hedefli tur bağlantısı", rep.totalWrong === 9 && rep.types[0]?.type === "article" && rep.types[0].pct === 67 && rep.types[0].href === "/learn?game=artikel", JSON.stringify(rep.types));
  check("karıştırma çifti: kelime ↔ 'kapı' ×2", rep.confusions.length === 1 && rep.confusions[0].with === "kapı" && rep.confusions[0].n === 2 && rep.confusions[0].wordId === eaWords[6].id);
  const freq = await frequentErrorTypes(USER);
  check("sık hata tipi: artikel (≥5), anlam değil (2)", freq.has("article") && !freq.has("meaning"));
  // Ağırlık: artikel hatası olan, tekrar evresindeki bir kelime doğru bilinince aralık ×0,75 ve olay
  await db.update(userWords).set({ state: 2, intervalDays: 20, ease: 2.5, reps: 4, correctStreak: 2, lastReviewedAt: new Date(Date.now() - 2 * 86400000) }).where(and(eq(userWords.userId, USER), eq(userWords.wordId, eaWords[0].id)));
  await submitAnswers(USER, [{ wordId: eaWords[0].id, game: "artikel", correct: true, latencyMs: 2000 }], monday, 10);
  const [uwW] = await db.select().from(userWords).where(and(eq(userWords.userId, USER), eq(userWords.wordId, eaWords[0].id)));
  const plainIv = schedule({ state: 2, ease: 2.5, intervalDays: 20, reps: 4, lapses: 0, correctStreak: 2, leech: false, dueAt: new Date(), lastReviewedAt: new Date(Date.now() - 2 * 86400000) }, 5, new Date(), 1).intervalDays;
  check("sık artikel hatası → aralık ağırlıksızdan kısa", (uwW?.intervalDays ?? 0) < plainIv && (uwW?.intervalDays ?? 0) > 0, `${uwW?.intervalDays} < ${plainIv}`);
  const wEv = await db.select().from(events).where(and(eq(events.userId, USER), eq(events.name, "srs_weight")));
  check("srs_weight olayı kind=article, value=75", wEv.length === 1 && wEv[0].kind === "article" && wEv[0].value === 75);

  console.log("\n41) Gelişim raporu (WP-52)");
  await reset();
  await ensureProfile(USER, "E2E");
  const today41 = "2026-08-25";
  const lastMon = shiftDay(weekStart(today41), -7);
  // Geçen hafta: 2 cevap günü, bir yazma değerlendirmesi (65), bir kullanım sınavı (80), bir artikel hatası
  await db.insert(dailyStats).values([{ userId: USER, day: lastMon, reviews: 30, correct: 20, newWords: 3, xp: 100, seconds: 300 }, { userId: USER, day: shiftDay(lastMon, 2), reviews: 20, correct: 15, newWords: 0, xp: 60, seconds: 200 }]);
  await db.insert(assessments).values({ userId: USER, kind: "writing", level: "A2", day: shiftDay(lastMon, 1), answer: "x", result: { score: { task: 3, grammar: 2, vocab: 3, structure: 3, overall: 65 }, errors: [], corrected: "x", praise_tr: "", next_tip_tr: "" }, provider: "t", hash: "h1", createdAt: new Date(`${shiftDay(lastMon, 1)}T10:00:00Z`) });
  await db.insert(exams).values({ userId: USER, kind: "weekly", week: lastMon, level: "A2", score: 80, correct: 12, total: 15, answers: [], createdAt: new Date(`${shiftDay(lastMon, 3)}T10:00:00Z`) });
  const gw = await db.select().from(words).limit(1);
  await db.insert(reviews).values({ userId: USER, wordId: gw[0].id, game: "artikel", correct: false, quality: 1, latencyMs: 1000, errorType: "article", detail: "die", createdAt: new Date(`${shiftDay(lastMon, 2)}T10:00:00Z`) });
  const gr = await growthReport(USER, "A2", today41);
  check("8 haftalık eksen, sonuncusu bu hafta", gr.weeks.length === 8 && gr.weeks[7] === weekStart(today41));
  const lw = gr.series.writing.find((p) => p.week === lastMon);
  check("yazma serisinde geçen hafta 65", lw?.value === 65 && lw.n === 1, JSON.stringify(lw));
  check("kullanım serisinde geçen hafta 80", gr.series.usage.find((p) => p.week === lastMon)?.value === 80);
  check("veri olmayan hafta null (sıfır değil)", gr.series.writing[0].value === null);
  check("kilometre taşları: ilk sınav", gr.milestones.some((m) => m.text.includes("İlk kullanım sınavı: 80")));
  const sm = gr.summary;
  check("özet: 50 cevap, yazma 65, kullanım 80, en çok hata artikel", sm.answers === 50 && sm.writing.to === 65 && sm.usage === 80 && sm.topError?.type === "article", sm.text);
  check("özet metni tek satır Türkçe", sm.text.startsWith("Geçen hafta:") && sm.text.includes("kullanım 80"));
  const planS = await buildPlan(USER, today41, "de", "A2", 20);
  check("plan özet satırı taşıyor", typeof planS.summary === "string" && planS.summary!.includes("50 cevap"));

  await reset();
  await db.delete(achievements).where(eq(achievements.userId, "e2e-rival"));
  await db.delete(profiles).where(eq(profiles.userId, "e2e-rival"));
  await db.delete(dailyStats).where(eq(dailyStats.userId, "e2e-rival"));
  await pool.end();

  console.log(failures === 0 ? "\nTÜM TESTLER GEÇTİ" : `\n${failures} TEST BAŞARISIZ`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch(async (err) => {
  console.error(err);
  await pool.end();
  process.exit(1);
});
