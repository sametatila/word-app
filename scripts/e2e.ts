/**
 * Uçtan uca mantık testi — gerçek PostgreSQL üzerinde çalışır.
 *   TEST_DATABASE_URL=postgres://... npx tsx --tsconfig scripts/tsconfig.e2e.json scripts/e2e.ts
 * Oturum kurgusu, SRS zamanlaması, streak ve ilerleme sorguları doğrulanır.
 */
import { and, eq, inArray, sql } from "drizzle-orm";
import { db, pool } from "./test-db";
import { dailyStats, profiles, reviews, sessionState, userLessons, userSkills, userWords, words } from "../src/lib/db/schema";
import {
  buildChallenge,
  buildSession,
  clearSessionState,
  loadSession,
  recordChallengeScore,
  saveSessionProgress,
  submitAnswers,
  getProgress,
  ensureProfile,
  markKnown,
  shiftDay,
} from "../src/lib/session";
import { schedule, grade, type SrsState } from "../src/lib/srs";
import {
  acceptedForms,
  foldSpelling,
  matchesAnswer,
  normalize,
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
import { lessonBoard, nextLesson, recordLesson, weakRules } from "../src/lib/lessons/progress";
import { roleplayPrompt } from "../src/lib/lessons/roleplay";
import { chatConfigured, chatProviders } from "../src/lib/chat-providers";
import { cleanForSpeech } from "../src/lib/tts/edge";
import { defaultVoice, rateFor, resolveVoice, voicesFor } from "../src/lib/tts/voices";
import { itemCount, xpFor } from "../src/lib/skills/meta";
import { GAME_LABELS, type Answer, type Round } from "../src/lib/types";

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
      r.options.includes(
        r.direction === "de-tr"
          ? r.word.tr
          : r.word.artikel
            ? `${r.word.artikel} ${r.word.de}`
            : r.word.de,
      )));

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

  console.log("\n11r) Ders içeriği ve kural kuyruğu");
  {
    check("ders havuzu var", LESSONS.length > 0, `(${LESSONS.length})`);
    const ids = new Set(LESSONS.map((l) => l.id));
    check("ders kimlikleri benzersiz", ids.size === LESSONS.length);

    // Ders bir konu değil TEK bir kural öğretiyor; kural kimliği tekrar
    // kuyruğunun anahtarı olduğu için boş olamaz.
    check("her dersin kural kimliği var", LESSONS.every((l) => l.ruleId.trim().length > 0));
    check("her derste kural metni var", LESSONS.every((l) => l.rule.trim().length > 20));
    check("her derste örnek var", LESSONS.every((l) => l.examples.length >= 2));
    check("her derste alıştırma var", LESSONS.every((l) => l.checks.length >= 2));

    // Doğru cevap şıklar arasında olmalı, yoksa soru çözülemez.
    const badAnswer = LESSONS.flatMap((l) =>
      l.checks.filter((c) => !c.options.includes(c.answer)).map(() => l.id),
    );
    check("doğru cevap şıklar arasında", badAnswer.length === 0,
      `(${[...new Set(badAnswer)].join(", ")})`);
    check("şıklar benzersiz",
      LESSONS.every((l) => l.checks.every((c) => new Set(c.options).size === c.options.length)));
    check("her cevabın gerekçesi var",
      LESSONS.every((l) => l.checks.every((c) => c.why.trim().length > 10)));

    // Soru türü çeşitliliği: tek tip soru sormak öğrenciyi kalıba alıştırıyor,
    // üçüncü soruda artık kuralı değil şık desenini okuyor. Her ders en az iki
    // farklı tür sormalı ve „hatayı bul“ her derste bulunmalı — kuralın
    // ihlalini görmek, kuralı tanımaktan farklı ve daha zor bir iş.
    check("her derste en az iki soru türü var",
      LESSONS.every((l) => new Set(l.checks.map((c) => c.kind)).size >= 2));
    check("her derste hata bulma sorusu var",
      LESSONS.every((l) => l.checks.some((c) => c.kind === "spot")),
      `(${LESSONS.filter((l) => !l.checks.some((c) => c.kind === "spot")).map((l) => l.id).join(", ")})`);
    check("her derste en az dört alıştırma var",
      LESSONS.every((l) => l.checks.length >= 4));

    // Rol yapma dersin asıl parçası: sahne, rol ve açılış repliği olmadan
    // öğrenci boş ekranla karşılaşır — serbest sohbetin en pahalı sorunu buydu.
    check("her derste sahne var", LESSONS.every((l) => l.roleplay.scene.trim().length > 20));
    check("her derste açılış repliği var",
      LESSONS.every((l) => l.roleplay.opening.trim().length > 0 && l.roleplay.openingTr.trim().length > 0));
    check("rol yapmanın alt sınırı makul",
      LESSONS.every((l) => l.roleplay.minTurns >= 3 && l.roleplay.minTurns <= 8));

    check("iki kursta da ders var",
      lessonsFor("de").length > 0 && lessonsFor("gsw-zh").length > 0);
    check("kurs süzgeci karıştırmıyor",
      lessonsFor("gsw-zh").every((l) => l.course === "gsw-zh"));
    check("ders kimlikle bulunuyor", findLesson(LESSONS[0].id)?.id === LESSONS[0].id);
    check("bilinmeyen kimlik bulunamıyor", findLesson("yok-boyle-bir-ders") === undefined);
  }

  console.log("\n11r1) Ders ilerlemesi ve tekrar merdiveni");
  {
    const lesson = LESSONS[0];
    const full = lesson.checks.length;

    // Rol yapma tamamlanmadıysa ders geçilmiş sayılmıyor: alıştırmaları doğru
    // yapıp konuşmadan çıkmak dersin asıl parçasını atlamak demek.
    const skipped = await recordLesson(USER, lesson, full, false);
    check("konuşmasız ders geçilmiş sayılmıyor", skipped.passed === false);
    check("geçilmeyen ders ertesi güne planlanıyor", skipped.nextDays === 1);

    // Geçilince merdiven yukarı çıkıyor.
    const first = await recordLesson(USER, lesson, full, true);
    check("konuşmayla birlikte ders geçiliyor", first.passed === true);
    const second = await recordLesson(USER, lesson, full, true);
    check("aralık büyüyor", second.nextDays > first.nextDays,
      `(${first.nextDays} → ${second.nextDays})`);

    // Başarısızlık merdiveni başa alıyor — kural oturmadıysa uzun aralık
    // öğrenciyi kaybettirir.
    const failed = await recordLesson(USER, lesson, 0, true);
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
    check("oturmamış kural listeleniyor", weak.includes(lesson.ruleId), `(${weak.join(", ")})`);
  }

  console.log("\n11r2) Rol yapma istemi derse bağlı");
  {
    const lesson = LESSONS[0];
    const prompt = roleplayPrompt(lesson);
    // İstem dersin kuralını taşımak zorunda: düzeltmenin „bu dersin kuralına
    // göre“ yapılmasını sağlayan tek şey bu.
    check("istem dersin kuralını taşıyor", prompt.includes(lesson.rule.slice(0, 40)));
    check("istem sahneyi taşıyor", prompt.includes(lesson.roleplay.scene.slice(0, 30)));
    check("istem seviyeyi taşıyor", prompt.includes(lesson.level));
    check("istem düzeltme işaretini taşıyor", prompt.includes(CORRECTION_MARK));
    check("istem öneri işaretini taşıyor", prompt.includes(SUGGESTION_MARK));
    const zh = LESSONS.find((l) => l.course === "gsw-zh")!;
    check("lehçe dersinde istem lehçeyi söylüyor",
      roleplayPrompt(zh).includes("Züritüütsch"));
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
  check("konuşma XP'si görev başına 8", xpFor(speaking[0], 0) === 0 &&
    xpFor(speaking[0], 1) === 8);
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
  check("on oyun tanımlı", Object.keys(GAME_LABELS).length === 11, // + tanıtım kartı
    `(${Object.keys(GAME_LABELS).length})`);

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
    tfRounds.filter((r) => r.isTrue).every((r) => r.claim === r.word.tr));
  // Asıl adalet kuralı: yanlış iddia, kelimenin geçerli bir anlamı olmamalı.
  const meaningsOf = (tr: string) =>
    new Set(tr.split(",").map((m) => m.trim().toLocaleLowerCase("tr-TR")).filter(Boolean));
  check(
    "yanlış iddia kelimenin başka bir anlamı değil",
    tfRounds
      .filter((r) => !r.isTrue)
      .every((r) => ![...meaningsOf(r.claim)].some((m) => meaningsOf(r.word.tr).has(m))),
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
    check("doğru karşılık şıklarda", listenRound.options.includes(listenRound.word.tr));
    check("şıklar Türkçe (Almanca biçim sızmıyor)",
      !listenRound.options.includes(listenRound.word.de),
      `(${listenRound.options.join(", ")})`);
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
    missed: [{ id: 1, de: "das Haus", tr: "ev" }],
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
