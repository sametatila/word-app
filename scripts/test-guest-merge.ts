import { eq, inArray, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  achievements,
  activityEvents,
  dailyScores,
  dailyStats,
  events,
  exams,
  leagueMembers,
  mockExamAttempts,
  moduleClears,
  placements,
  profiles,
  questClaims,
  rateLimits,
  reviews,
  sessionState,
  usageCounters,
  userConsents,
  userLessons,
  userPathItems,
  userSkills,
  userWords,
  words,
} from "@/lib/db/schema";
import { deleteGuest, mergeGuestInto, mergeStreaks, purgeStaleGuests, verifyGuestToken } from "../src/lib/account/guest-merge";
import { purgeUserData } from "../src/lib/account/purge";

/**
 * MİSAFİR BİRLEŞTİRMESİ — gerçek Postgres'te (mağaza ön inceleme B24).
 *
 * Misafir hesap oluşturduğunda ya da var olan hesabına girdiğinde her satırı
 * hesaba birleşiyor. Kuralların her biri bir SQL cümlesi ve yanlış bir sütun
 * adı, ters bir karşılaştırma ya da unutulmuş bir çakışma silmesi ancak
 * veritabanında görünüyor: tip denetimi dizgenin içini okumuyor. Bu test
 * çakışan ve çakışmayan satırlarla iki kimlik kuruyor, birleştiriyor ve tablo
 * tablo sonucu ölçüyor; jeton doğrulamasını, misafir silmeyi ve haftalık
 * temizliği de.
 *
 *   TEST_DATABASE_URL=postgres://postgres@127.0.0.1:55432/lernomi npm run test:guest-merge
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
    console.log(`  ✗ ${name} ${detail === "" ? "" : `→ ${typeof detail === "string" ? detail : JSON.stringify(detail)}`}`);
  }
}

const tag = Math.random().toString(36).slice(2, 8);
const id = (s: string) => `test-gm-${s}-${tag}`;
const G = id("guest");
const T = id("target");
const G2 = id("guest2");
const T2 = id("target2");
const G3 = id("guest3");
const S_OLD = id("stale");
const S_LIVE = id("live");
const S_NEW = id("fresh");
const R_OLD = id("real");
const ALL = [G, T, G2, T2, G3, S_OLD, S_LIVE, S_NEW, R_OLD];

function rows(res: unknown): Record<string, unknown>[] {
  return ((Array.isArray(res) ? res : (res as { rows?: unknown[] }).rows) ?? []) as Record<string, unknown>[];
}

async function addUser(uid: string, anonymous: boolean, createdAgoDays = 0) {
  await db.execute(sql`
    insert into "user" (id, name, email, "emailVerified", "isAnonymous", "createdAt", "updatedAt")
    values (${uid}, ${anonymous ? "guest" : "Deneme Kişi"}, ${`${uid}@${anonymous ? "guest.lernomi.invalid" : "example.test"}`}, false, ${anonymous},
            now() - make_interval(days => ${createdAgoDays}), now())
  `);
}

async function addSession(uid: string, token: string, expiresInDays: number) {
  await db.execute(sql`
    insert into session (id, "expiresAt", token, "createdAt", "updatedAt", "userId")
    values (${`s-${token}`}, now() + make_interval(days => ${expiresInDays}), ${token}, now(), now(), ${uid})
  `);
}

const d = (offset: number) => {
  const x = new Date();
  x.setUTCDate(x.getUTCDate() + offset);
  return x.toISOString().slice(0, 10);
};
const at = (minutesAgo: number) => new Date(Date.now() - minutesAgo * 60_000);

/* `user_words.word_id` kelime tablosuna bağlı (FK); CI veritabanında kelime yok. */
const WORD_IDS = [900001, 900002, 900003, 900010, 900020, 900030];

async function cleanup() {
  for (const uid of ALL) await purgeUserData(uid).catch(() => {});
  await db.execute(sql`delete from "user" where id = any(${sql.param(ALL)}::text[])`);
  await db.delete(words).where(inArray(words.id, WORD_IDS));
}

async function seedWords() {
  await db.insert(words).values(WORD_IDS.map((wid) => ({ id: wid, de: `gm-${wid}`, tr: `gm-${wid}`, typ: "Sonstiges", niveau: "A1" }))).onConflictDoNothing();
}

function streakCases() {
  console.log("\nSeri birleşimi (saf)");
  const a = mergeStreaks({ lastActiveDay: "2026-09-03", currentStreak: 3, longestStreak: 3 }, { lastActiveDay: "2026-09-06", currentStreak: 3, longestStreak: 4 });
  check("bitişik iki aralık tek seri oluyor (pzt-çar + prş-cmt = 6)", a.currentStreak === 6 && a.longestStreak === 6 && a.lastActiveDay === "2026-09-06", a);
  const b = mergeStreaks({ lastActiveDay: "2026-09-01", currentStreak: 2, longestStreak: 9 }, { lastActiveDay: "2026-09-06", currentStreak: 2, longestStreak: 2 });
  check("arada boşluk varsa son seri kalıyor, en uzun korunuyor", b.currentStreak === 2 && b.longestStreak === 9, b);
  const c = mergeStreaks({ lastActiveDay: "2026-09-06", currentStreak: 5, longestStreak: 5 }, { lastActiveDay: "2026-09-06", currentStreak: 2, longestStreak: 2 });
  check("aynı gün biten örtüşen seriler: uzun olan", c.currentStreak === 5, c);
  const e = mergeStreaks({ lastActiveDay: null, currentStreak: 0, longestStreak: 0 }, { lastActiveDay: "2026-09-06", currentStreak: 4, longestStreak: 4 });
  check("bir taraf hiç çalışmamış: öteki aynen", e.currentStreak === 4 && e.lastActiveDay === "2026-09-06", e);
  const f = mergeStreaks({ lastActiveDay: "2026-09-05", currentStreak: 10, longestStreak: 10 }, { lastActiveDay: "2026-09-06", currentStreak: 1, longestStreak: 1 });
  check("hesabın serisi dün bitiyor, misafir bugün başlamış: 11", f.currentStreak === 11 && f.longestStreak === 11, f);
}

async function seedExisting() {
  await addUser(G, true);
  await addUser(T, false, 40);
  await addSession(G, `tok-${G}`, 30);
  await addSession(T, `tok-${T}`, 30);

  await db.insert(profiles).values([
    { userId: T, displayName: "Hesap Sahibi", course: "de", level: "B1", courseChosenAt: at(60 * 24 * 30), currentStreak: 10, longestStreak: 12, lastActiveDay: d(-1), totalXp: 1000, challengeBest: 5 },
    { userId: G, course: "en", level: "A2", courseChosenAt: at(60), currentStreak: 1, longestStreak: 1, lastActiveDay: d(0), totalXp: 50, challengeBest: 9, avatar: "fox" },
  ]);

  // Kelime 1 iki tarafta (misafir daha taze), 2 yalnız misafirde, 3 yalnız hesapta.
  await db.insert(userWords).values([
    { userId: T, wordId: 900001, state: 1, ease: 2.1, intervalDays: 1, reps: 3, lapses: 1, correctStreak: 0, lastReviewedAt: at(600) },
    { userId: G, wordId: 900001, state: 2, ease: 2.6, intervalDays: 4, reps: 2, lapses: 0, correctStreak: 2, leech: true, lastReviewedAt: at(5) },
    { userId: G, wordId: 900002, state: 1, reps: 1, lastReviewedAt: at(5) },
    { userId: T, wordId: 900003, state: 2, reps: 7, lastReviewedAt: at(900) },
  ]);
  await db.insert(reviews).values([
    { userId: G, wordId: 900001, game: "meaning", correct: true, quality: 4, latencyMs: 900 },
    { userId: G, wordId: 900002, game: "meaning", correct: false, quality: 1, latencyMs: 1200 },
  ]);
  await db.insert(dailyStats).values([
    { userId: T, day: d(0), reviews: 10, correct: 8, newWords: 2, xp: 100, seconds: 300 },
    { userId: G, day: d(0), reviews: 5, correct: 5, newWords: 1, xp: 40, seconds: 120 },
    { userId: G, day: d(-3), reviews: 3, correct: 2, newWords: 0, xp: 10, seconds: 60 },
  ]);
  await db.insert(userSkills).values([
    { userId: T, exerciseId: "gm-ex1", correct: 3, total: 10, attempts: 2, lastAt: at(500), firstAt: at(900), lastScore: 30 },
    { userId: G, exerciseId: "gm-ex1", correct: 7, total: 10, attempts: 1, lastAt: at(10), firstAt: at(10), lastScore: 70, skill: "reading" },
    { userId: G, exerciseId: "gm-ex2", correct: 4, total: 5, attempts: 1, lastAt: at(10), firstAt: at(10) },
  ]);
  await db.insert(userPathItems).values([
    { userId: T, itemId: "gm-item1", lastPct: 90, bestPct: 90, attempts: 1, passedAt: at(800), lastAt: at(800) },
    { userId: G, itemId: "gm-item1", lastPct: 40, bestPct: 60, attempts: 2, lastAt: at(20) },
  ]);
  await db.insert(sessionState).values([
    { userId: T, day: d(-2), course: "de", rounds: [{ t: "hesap" }], index: 3, updatedAt: at(3000) },
    { userId: G, day: d(0), course: "en", rounds: [{ t: "misafir" }], index: 1, updatedAt: at(30) },
  ]);
  await db.insert(dailyScores).values([
    { userId: T, day: d(0), course: "de", level: "B1", score: 50, createdAt: at(300) },
    { userId: G, day: d(0), course: "en", level: "A2", score: 90, createdAt: at(30) },
  ]);
  await db.insert(questClaims).values([
    { userId: T, day: d(0), questId: "gm-q1", xp: 10 },
    { userId: G, day: d(0), questId: "gm-q1", xp: 10 },
    { userId: G, day: d(0), questId: "gm-q2", xp: 15 },
  ]);
  await db.insert(achievements).values([
    { userId: T, achievementId: "gm-a1", unlockedAt: at(100), seen: false },
    { userId: G, achievementId: "gm-a1", unlockedAt: at(1000), seen: true },
    { userId: G, achievementId: "gm-a2", unlockedAt: at(10), seen: false },
  ]);
  await db.insert(events).values({ userId: G, day: d(0), name: "gm_event", value: 1 });
  await db.insert(moduleClears).values([
    { userId: T, course: "de", level: "A1", moduleIndex: 0, bestLeft: 10, attempts: 2, clearedAt: at(500) },
    { userId: G, course: "de", level: "A1", moduleIndex: 0, bestLeft: 25, attempts: 1, clearedAt: at(900) },
  ]);
  await db.insert(userLessons).values([
    { userId: T, lessonId: "gm-l1", ruleId: "r-old", correct: 8, total: 10, roleplayDone: true, attempts: 1, intervalDays: 7, lastAt: at(2000) },
    { userId: G, lessonId: "gm-l1", ruleId: "r-new", correct: 5, total: 10, roleplayDone: false, attempts: 2, intervalDays: 1, lastAt: at(15) },
    { userId: G, lessonId: "gm-l2", ruleId: "r2", correct: 3, total: 6, attempts: 1 },
  ]);
  await db.insert(placements).values({ userId: G, suggested: "A2", perSkill: {}, answers: [], score: 50 });
  await db.insert(exams).values([
    { userId: T, kind: "weekly", week: d(-2), level: "B1", score: 70, correct: 7, total: 10, answers: [], createdAt: at(200) },
    { userId: G, kind: "weekly", week: d(-2), level: "A2", score: 90, correct: 9, total: 10, answers: [], createdAt: at(400) },
    { userId: G, kind: "weekly", week: d(-9), level: "A2", score: 60, correct: 6, total: 10, answers: [] },
  ]);
  await db.insert(mockExamAttempts).values({ userId: G, paperId: "gm-paper", skill: "lesen", level: "A2" });
  await db.insert(usageCounters).values([
    { userId: T, key: "tts_calls", period: d(0), count: 20 },
    { userId: G, key: "tts_calls", period: d(0), count: 5 },
  ]);
  await db.insert(rateLimits).values({ key: `answers:${G}`, count: 3, resetAt: at(-60) });
  await db.insert(leagueMembers).values({ userId: G, weekStart: d(-1) });
  await db.insert(userConsents).values([
    { userId: T, purpose: "ai_text", granted: false, version: 1 },
    { userId: G, purpose: "ai_text", granted: true, version: 1 },
    { userId: G, purpose: "ai_voice", granted: true, version: 1 },
  ]);
  await db.insert(activityEvents).values({ userId: G, type: "achievement", payload: {} });
}

async function mergeIntoExisting() {
  console.log("\nVar olan hesaba birleştirme");
  check("doğru jeton kabul", await verifyGuestToken(G, `tok-${G}`));
  check("yanlış jeton reddedilir", !(await verifyGuestToken(G, "tok-wrong-0000000000")));
  check("başka misafirin kimliğiyle jeton reddedilir", !(await verifyGuestToken(G2, `tok-${G}`)));
  check("gerçek hesabın jetonu misafir jetonu sayılmaz", !(await verifyGuestToken(T, `tok-${T}`)));

  const out = await mergeGuestInto(G, T);
  check("birleşti ve hesapta önceden ilerleme vardı", out.merged === true && out.targetHadProgress === true, out);

  const [prof] = await db.select().from(profiles).where(eq(profiles.userId, T));
  check("toplam XP toplandı (1000 + 50)", prof?.totalXp === 1050, prof?.totalXp);
  check("hesabın kursu ve seviyesi kaldı (misafir en/A2 değil)", prof?.course === "de" && prof?.level === "B1", [prof?.course, prof?.level]);
  check("hesabın görünen adı kaldı", prof?.displayName === "Hesap Sahibi", prof?.displayName);
  check("rekor en iyisi (9)", prof?.challengeBest === 9, prof?.challengeBest);
  check("avatar hesapta yoksa misafirden (fox)", prof?.avatar === "fox", prof?.avatar);
  check("seri birleşti: hesap dün 10 + misafir bugün 1 = 11", prof?.currentStreak === 11 && prof?.longestStreak === 12 && prof?.lastActiveDay === d(0), [prof?.currentStreak, prof?.longestStreak, prof?.lastActiveDay]);
  check("misafirin profili silindi", (await db.select().from(profiles).where(eq(profiles.userId, G))).length === 0);

  const words = await db.select().from(userWords).where(eq(userWords.userId, T));
  const w1 = words.find((w) => w.wordId === 900001);
  check("üç kelime hesapta (çakışan tek satır)", words.length === 3, words.length);
  check("çakışan kelimede taze plan misafirin (durum 2, aralık 4)", w1?.state === 2 && w1?.intervalDays === 4 && w1?.correctStreak === 2, w1);
  check("tekrar ve unutma sayıları toplandı (3+2, 1+0), takılma korunuyor", w1?.reps === 5 && w1?.lapses === 1 && w1?.leech === true, w1);
  check("misafirde kelime kalmadı", (await db.select().from(userWords).where(eq(userWords.userId, G))).length === 0);
  check("tekrar kayıtları taşındı", (await db.select().from(reviews).where(eq(reviews.userId, T))).length === 2);

  const stats = await db.select().from(dailyStats).where(eq(dailyStats.userId, T));
  const today = stats.find((s) => s.day === d(0));
  check("aynı gün istatistikleri toplandı (xp 140, tekrar 15, süre 420)", today?.xp === 140 && today?.reviews === 15 && today?.seconds === 420, today);
  check("misafirin başka günü taşındı", stats.some((s) => s.day === d(-3) && s.xp === 10), stats.map((s) => s.day));

  const skills = await db.select().from(userSkills).where(eq(userSkills.userId, T));
  const ex1 = skills.find((s) => s.exerciseId === "gm-ex1");
  check("alıştırma: en iyi skor 7, deneme 3, son skor en son denemeden (70)", ex1?.correct === 7 && ex1?.attempts === 3 && ex1?.lastScore === 70 && ex1?.skill === "reading", ex1);
  check("alıştırma: ilk tarih en eskisi", Boolean(ex1 && ex1.firstAt.getTime() <= at(899).getTime()), ex1?.firstAt);
  check("misafirin öteki alıştırması taşındı", skills.some((s) => s.exerciseId === "gm-ex2"));

  const [item] = await db.select().from(userPathItems).where(eq(userPathItems.userId, T));
  check("patika adımı: en iyi 90, deneme 3, geçme tarihi korunuyor, son yüzde en son denemeden (40)", item?.bestPct === 90 && item?.attempts === 3 && item?.passedAt !== null && item?.lastPct === 40, item);

  const states = await db.select().from(sessionState).where(inArray(sessionState.userId, [G, T]));
  check("günün tur kuyruğu: en son dokunulan (misafirinki) kaldı", states.length === 1 && states[0].userId === T && states[0].course === "en", states.map((s) => [s.userId, s.course]));

  const scores = await db.select().from(dailyScores).where(inArray(dailyScores.userId, [G, T]));
  check("günün turu: aynı gün İLK oynanan (hesabınki, 50) kaldı", scores.length === 1 && scores[0].score === 50, scores.map((s) => s.score));

  const claims = await db.select().from(questClaims).where(inArray(questClaims.userId, [G, T]));
  check("görev: çakışan tek kayıt + misafirin ötekisi", claims.length === 2 && claims.every((c) => c.userId === T), claims.map((c) => c.questId));

  const ach = await db.select().from(achievements).where(inArray(achievements.userId, [G, T]));
  const a1 = ach.find((a) => a.achievementId === "gm-a1");
  check("rozet: en erken açılış ve görüldü", ach.length === 2 && Boolean(a1 && a1.unlockedAt.getTime() <= at(999).getTime() && a1.seen), a1);

  check("olay taşındı", (await db.select().from(events).where(eq(events.userId, T))).some((e) => e.name === "gm_event"));
  const [mc] = await db.select().from(moduleClears).where(eq(moduleClears.userId, T));
  check("modül patronu: en iyi süre 25, deneme 3", mc?.bestLeft === 25 && mc?.attempts === 3, mc);

  const lessons = await db.select().from(userLessons).where(eq(userLessons.userId, T));
  const l1 = lessons.find((l) => l.lessonId === "gm-l1");
  check("ders: en iyi doğru 8, konuşma bitti, deneme 3", l1?.correct === 8 && l1?.roleplayDone === true && l1?.attempts === 3, l1);
  check("ders: tekrar planı en son çalışılandan (misafir, aralık 1)", l1?.intervalDays === 1 && l1?.ruleId === "r-new", l1);
  check("misafirin öteki dersi taşındı", lessons.some((l) => l.lessonId === "gm-l2"));

  check("seviye testi taşındı", (await db.select().from(placements).where(eq(placements.userId, T))).length === 1);
  const ex = await db.select().from(exams).where(inArray(exams.userId, [G, T]));
  const sameWeek = ex.filter((x) => x.week === d(-2));
  check("haftalık sınav: aynı hafta İLK yazılan (misafirin, 90) kaldı", sameWeek.length === 1 && sameWeek[0].score === 90 && sameWeek[0].userId === T, sameWeek);
  check("öteki hafta taşındı", ex.some((x) => x.week === d(-9) && x.userId === T));
  check("deneme sınavı denemesi taşındı", (await db.select().from(mockExamAttempts).where(eq(mockExamAttempts.userId, T))).length === 1);

  const [uc] = await db.select().from(usageCounters).where(eq(usageCounters.userId, T));
  check("kota sayacı toplandı (25)", uc?.count === 25, uc);
  check("misafirin hız sınırı anahtarı silindi", (await db.select().from(rateLimits).where(eq(rateLimits.key, `answers:${G}`))).length === 0);
  check("misafirin lig üyeliği silindi", (await db.select().from(leagueMembers).where(eq(leagueMembers.userId, G))).length === 0);

  const consents = await db.select().from(userConsents).where(inArray(userConsents.userId, [G, T]));
  check("rıza: hesabın kararı olan amaçta misafirinki taşınmadı, olmayanda taşındı", consents.length === 2 && consents.some((c) => c.purpose === "ai_text" && c.granted === false) && consents.some((c) => c.purpose === "ai_voice" && c.userId === T), consents.map((c) => [c.userId === T, c.purpose, c.granted]));
  check("misafirin akış olayı silindi", (await db.select().from(activityEvents).where(eq(activityEvents.userId, G))).length === 0);

  const guestLeft = rows(await db.execute(sql`select count(*)::int as n from "user" where id = ${G}`))[0];
  const sessLeft = rows(await db.execute(sql`select count(*)::int as n from session where "userId" = ${G}`))[0];
  check("misafirin kullanıcı satırı ve oturumu silindi", Number(guestLeft?.n) === 0 && Number(sessLeft?.n) === 0, [guestLeft, sessLeft]);
  check("aynı misafir ikinci kez birleştirilemez", (await mergeGuestInto(G, T)).merged === false);
}

async function mergeIntoNew() {
  console.log("\nYeni hesaba taşıma");
  await addUser(G2, true);
  await addUser(T2, false);
  await addUser(G3, true);
  await db.insert(profiles).values({ userId: G2, course: "en", level: "A2", courseChosenAt: at(10), totalXp: 30, currentStreak: 2, longestStreak: 2, lastActiveDay: d(0), nativeLang: "de" });
  await db.insert(userWords).values({ userId: G2, wordId: 900010, state: 1, reps: 1, lastReviewedAt: at(3) });

  const out = await mergeGuestInto(G2, T2);
  check("taşındı ve hesapta önceden ilerleme yoktu", out.merged === true && out.targetHadProgress === false, out);
  const [prof] = await db.select().from(profiles).where(eq(profiles.userId, T2));
  check("misafirin seçimleri yeni hesabın profili oldu (en, A2, anadil de)", prof?.course === "en" && prof?.level === "A2" && prof?.nativeLang === "de" && prof?.totalXp === 30, prof);
  check("kelime yeni hesapta", (await db.select().from(userWords).where(eq(userWords.userId, T2))).length === 1);
  const other = await mergeGuestInto(G3, G2);
  check("hedef misafirse (ya da yoksa) birleştirme yapılmaz", other.merged === false, other);
  const self = await mergeGuestInto(G3, G3);
  check("misafir kendine birleştirilemez", self.merged === false, self);
}

async function deletionAndCleanup() {
  console.log("\nMisafir silme ve haftalık temizlik");
  await db.insert(userWords).values({ userId: G3, wordId: 900020, state: 1, reps: 1 });
  check("misafir silindi", await deleteGuest(G3));
  check("misafirin satırları temizlendi", (await db.select().from(userWords).where(eq(userWords.userId, G3))).length === 0);
  check("gerçek hesap misafir silme yolundan silinmez", !(await deleteGuest(T2)));

  await addUser(S_OLD, true, 40);
  await addSession(S_OLD, `tok-${S_OLD}`, -5);
  await addUser(S_LIVE, true, 40);
  await addSession(S_LIVE, `tok-${S_LIVE}`, 10);
  await addUser(S_NEW, true, 0);
  await addUser(R_OLD, false, 40);
  await db.insert(userWords).values({ userId: S_OLD, wordId: 900030, state: 1, reps: 1 });

  const removed = await purgeStaleGuests(1000);
  const left = rows(await db.execute(sql`select id from "user" where id = any(${sql.param([S_OLD, S_LIVE, S_NEW, R_OLD])}::text[])`)).map((r) => r.id);
  check("oturumu düşmüş eski misafir silindi (en az 1)", removed >= 1 && !left.includes(S_OLD), { removed, left });
  check("etkin oturumlu misafir kaldı", left.includes(S_LIVE));
  check("bir günden yeni misafir kaldı (yarış payı)", left.includes(S_NEW));
  check("oturumsuz gerçek hesap kaldı", left.includes(R_OLD));
  check("silinen misafirin satırları da gitti", (await db.select().from(userWords).where(eq(userWords.userId, S_OLD))).length === 0);
}

async function main() {
  streakCases();
  await cleanup();
  try {
    await seedWords();
    await seedExisting();
    await mergeIntoExisting();
    await mergeIntoNew();
    await deletionAndCleanup();
  } finally {
    await cleanup();
  }
  if (failures) {
    console.log(`\n${failures} doğrulama başarısız.`);
    process.exit(1);
  }
  console.log("\ntamam: misafir birleştirmesi, silme ve temizlik tutuyor");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
