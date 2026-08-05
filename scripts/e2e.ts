/**
 * Uçtan uca mantık testi — gerçek PostgreSQL üzerinde çalışır.
 *   TEST_DATABASE_URL=postgres://... npx tsx --tsconfig scripts/tsconfig.e2e.json scripts/e2e.ts
 * Oturum kurgusu, SRS zamanlaması, streak ve ilerleme sorguları doğrulanır.
 */
import { and, eq, inArray, sql } from "drizzle-orm";
import { db, pool } from "./test-db";
import { dailyStats, profiles, reviews, sessionState, userWords, words } from "../src/lib/db/schema";
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
import { acceptedForms, normalize } from "../src/components/games/types";
import { umlautStem } from "../src/lib/german";
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
  await db.delete(sessionState).where(eq(sessionState.userId, USER));
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
