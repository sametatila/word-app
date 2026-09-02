import "server-only";
import { and, count, desc, eq, gt, gte, inArray, isNotNull, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { PLAYABLE_GAMES } from "@/lib/types";
import { GROUP_LABELS, GROUP_ORDER, type Group } from "@/lib/achievement-groups";
import { onAchievementsUnlocked } from "@/lib/social/hooks";
import {
  achievements,
  assessments,
  exams,
  questClaims,
  dailyScores,
  dailyStats,
  profiles,
  reviews,
  userLessons,
  moduleClears,
  userSkills,
  userWords,
  words,
} from "@/lib/db/schema";

/**
 * Rozetler.
 *
 * Uygulamada biriken tek şey XP'ydi ve XP tek bir sayı: 41.320'den 41.480'e
 * çıkmak hiçbir şey anlatmıyor. Geriye dönüp bakılacak, "şunu başardım"
 * denecek hiçbir yüzey yoktu — oysa veritabanında yüz günlük seriler, binlerce
 * doğru cevap ve bitmiş dersler duruyordu. Emek vardı, hatırası yoktu.
 *
 * Üç tasarım kararı:
 *
 * 1. **İlerleme burada BİRİKTİRİLMİYOR.** Her rozet mevcut tablolardan
 *    okunuyor (`quests.ts` ile aynı ilke). Bunun bedeli birkaç ek sorgu,
 *    karşılığı ise şu: rozetler GERİYE DÖNÜK. Sistem yayına alındığı gün
 *    kimse sıfırdan başlamıyor; herkes o güne kadar gerçekten yaptığı işin
 *    rozetlerini bir anda açıyor. Yeni bir özelliğin var olan kullanıcıya
 *    verebileceği en iyi ilk izlenim bu.
 *
 * 2. **Az ve zor.** Araştırma tutarlı: her şeye rozet veren sistemler
 *    "overjustification" etkisiyle içsel motivasyonu DÜŞÜRÜYOR. Buradaki
 *    eşikler bilerek uzak — rozetlerin çoğu aylara yayılıyor, birkaçı
 *    yıllara. Beş dakikada açılan rozet, rozet değil bildirimdir.
 *
 *    "Az" olan rozet BAŞINA emek, toplam sayı değil: uygulama büyüdükçe yeni
 *    bölümler rozetsiz kaldı ve rozetsiz bölüm, ödülü olmayan bölüm değil
 *    GÖRÜNMEYEN bölüm demek — rozet duvarı uygulamanın neler yapabildiğini
 *    anlatan yüzeylerden biri. Dilbilgisi çalışması, sınavlar, yazma ve
 *    konuşma değerlendirmeleri, görevler ve yeni oyunlar bu yüzden eklendi.
 *
 * 3. **Hiçbiri satın alınamaz.** Tek yol oynamak. Uygulamada para yok ve
 *    olmayacak; rozetin değeri de tam olarak buradan geliyor.
 */

export type Tier = "bronze" | "silver" | "gold" | "legend";

export type Metric =
  | "longestStreak"
  | "mastered"
  | "correctAnswers"
  | "gameArtikel"
  | "gameListen"
  | "gameTyping"
  | "gameOrder"
  | "gamePlural"
  | "gameSpeak"
  | "lessons"
  | "skills"
  | "dailyRounds"
  | "perfectDaily"
  | "challengeBest"
  | "nightAnswers"
  | "earlyAnswers"
  | "bestDayReviews"
  | "activeDays"
  | "bossClears"
  | "courses"
  // Uygulama büyüdükçe rozetsiz kalan bölümler: dilbilgisi çalışması,
  // sınavlar, yazma ve konuşma değerlendirmeleri, görevler ve oyun keşfi.
  | "drillMastered"
  | "exams"
  | "bestExam"
  | "writings"
  | "bestWriting"
  | "speakings"
  | "gameTranslate"
  | "gamesPlayed"
  | "fullQuestDays";

export type AchievementDef = {
  id: string;
  title: string;
  /** Nasıl açılır — kilitliyken görünen tek metin. */
  hint: string;
  /** components/icons.tsx içindeki bileşen adı. */
  icon: string;
  tier: Tier;
  group: Group;
  metric: Metric;
  target: number;
};

/**
 * Rozet listesi.
 *
 * Sıra önemli: aynı gruptaki rozetler kolaydan zora dizili, arayüz de onları
 * bu sırayla gösteriyor. Bir gruptaki ilk kilitli rozet "sıradaki hedef"
 * olarak öne çıkarılıyor.
 */
export const ACHIEVEMENTS: AchievementDef[] = [
  // ——— Seri ———————————————————————————————————————————————————————
  { id: "streak3", title: "İlk kıvılcım", hint: "3 gün üst üste çalış", icon: "FlameIcon", tier: "bronze", group: "streak", metric: "longestStreak", target: 3 },
  { id: "streak7", title: "Bir hafta", hint: "7 gün üst üste çalış", icon: "FlameIcon", tier: "bronze", group: "streak", metric: "longestStreak", target: 7 },
  { id: "streak30", title: "Alışkanlık", hint: "30 gün üst üste çalış", icon: "FlameIcon", tier: "silver", group: "streak", metric: "longestStreak", target: 30 },
  { id: "streak100", title: "Yüz gün", hint: "100 gün üst üste çalış", icon: "FlameIcon", tier: "gold", group: "streak", metric: "longestStreak", target: 100 },
  { id: "streak365", title: "Bir yıl", hint: "365 gün üst üste çalış", icon: "FlameIcon", tier: "legend", group: "streak", metric: "longestStreak", target: 365 },

  // ——— Kelime ————————————————————————————————————————————————————
  { id: "words50", title: "Elli kelime", hint: "50 kelimeyi pekiştir", icon: "BookIcon", tier: "bronze", group: "vocab", metric: "mastered", target: 50 },
  { id: "words250", title: "Küçük sözlük", hint: "250 kelimeyi pekiştir", icon: "BookIcon", tier: "silver", group: "vocab", metric: "mastered", target: 250 },
  { id: "words1000", title: "Bin kelime", hint: "1.000 kelimeyi pekiştir", icon: "BookOpenIcon", tier: "gold", group: "vocab", metric: "mastered", target: 1000 },
  { id: "words3000", title: "Kelime hazinesi", hint: "3.000 kelimeyi pekiştir", icon: "BookOpenIcon", tier: "legend", group: "vocab", metric: "mastered", target: 3000 },

  // ——— Oyun ustalıkları ——————————————————————————————————————————
  { id: "answers500", title: "Beş yüz cevap", hint: "500 soruyu doğru bil", icon: "CheckIcon", tier: "bronze", group: "games", metric: "correctAnswers", target: 500 },
  { id: "answers2500", title: "İki bin beş yüz", hint: "2.500 soruyu doğru bil", icon: "CheckIcon", tier: "silver", group: "games", metric: "correctAnswers", target: 2500 },
  { id: "answers10000", title: "On bin cevap", hint: "10.000 soruyu doğru bil", icon: "CheckIcon", tier: "gold", group: "games", metric: "correctAnswers", target: 10000 },
  { id: "artikel300", title: "Artikel avcısı", hint: "300 artikeli doğru bil", icon: "TagIcon", tier: "silver", group: "games", metric: "gameArtikel", target: 300 },
  { id: "listen200", title: "Kulak dolgunluğu", hint: "200 kelimeyi duyarak bul", icon: "HeadphonesIcon", tier: "silver", group: "games", metric: "gameListen", target: 200 },
  { id: "typing200", title: "Parmak hafızası", hint: "200 kelimeyi sıfırdan yaz", icon: "KeyboardIcon", tier: "silver", group: "games", metric: "gameTyping", target: 200 },
  { id: "order150", title: "Cümle mimarı", hint: "150 cümleyi doğru diz", icon: "ListIcon", tier: "silver", group: "games", metric: "gameOrder", target: 150 },
  { id: "plural150", title: "Çoğul ustası", hint: "150 çoğul biçimi doğru bil", icon: "PuzzleIcon", tier: "silver", group: "games", metric: "gamePlural", target: 150 },
  { id: "speak100", title: "Ekransız", hint: "Yürürken modunda 100 kelimeyi sesli söyle", icon: "HeadphonesIcon", tier: "silver", group: "games", metric: "gameSpeak", target: 100 },
  { id: "speak500", title: "Ağızdan çıkan", hint: "Yürürken modunda 500 kelimeyi sesli söyle", icon: "HeadphonesIcon", tier: "gold", group: "games", metric: "gameSpeak", target: 500 },

  { id: "translate200", title: "Çevirmen", hint: "200 cümleyi doğru çevir", icon: "PenIcon", tier: "silver", group: "games", metric: "gameTranslate", target: 200 },
  /*
    Keşif rozeti: sayı değil ÇEŞİT. On bir oyunun bazıları yalnızca karışık
    turda ve seyrek çıkıyor; kullanıcıların çoğu "Çoğul Bilmece"nin ya da
    "Doğru mu Yanlış mı"nın varlığını bilmiyor. Hepsini bir kez oynatmak,
    listeyi göstermekten daha iyi bir tanıtım.
  */
  { id: "allGames", title: "Hepsini denedin", hint: "On bir oyunun hepsinde en az bir doğru yap", icon: "PuzzleIcon", tier: "silver", group: "games", metric: "gamesPlayed", target: PLAYABLE_GAMES.length },

  // ——— Dilbilgisi ————————————————————————————————————————————————
  // Dilbilgisi çalışması uygulamanın en yeni bölümü ve hiç rozeti yoktu.
  // Ölçü kelimedekiyle aynı tanım: 21 günü geçen aralık = pekişmiş.
  { id: "drill50", title: "Biçim bilgisi", hint: "50 dilbilgisi maddesini pekiştir", icon: "TagIcon", tier: "bronze", group: "grammar", metric: "drillMastered", target: 50 },
  { id: "drill250", title: "Tablolar ezberde", hint: "250 dilbilgisi maddesini pekiştir", icon: "ListIcon", tier: "silver", group: "grammar", metric: "drillMastered", target: 250 },
  { id: "drill1000", title: "Çekim ustası", hint: "1.000 dilbilgisi maddesini pekiştir", icon: "MountainIcon", tier: "gold", group: "grammar", metric: "drillMastered", target: 1000 },

  // ——— Ders ——————————————————————————————————————————————————————
  { id: "lesson1", title: "İlk ders", hint: "Bir dersi rol yapmayla birlikte bitir", icon: "ChatIcon", tier: "bronze", group: "lessons", metric: "lessons", target: 1 },
  { id: "lesson10", title: "Bir modül", hint: "10 dersi tamamla", icon: "SchoolIcon", tier: "bronze", group: "lessons", metric: "lessons", target: 10 },
  { id: "lesson50", title: "Yarı yol", hint: "50 dersi tamamla", icon: "SchoolIcon", tier: "gold", group: "lessons", metric: "lessons", target: 50 },
  { id: "lesson100", title: "Bir seviye", hint: "100 dersi tamamla", icon: "MountainIcon", tier: "legend", group: "lessons", metric: "lessons", target: 100 },
  { id: "boss1", title: "Modül fatihi", hint: "Bir modül sınavını süre bitmeden geç", icon: "FlagIcon", tier: "silver", group: "lessons", metric: "bossClears", target: 1 },
  { id: "boss10", title: "Sınav ustası", hint: "10 modül sınavını geç", icon: "FlagIcon", tier: "gold", group: "lessons", metric: "bossClears", target: 10 },

  // ——— Sınav ——————————————————————————————————————————————————————
  // Sınavlar (haftanın kısa sınavı ve seviye sınavları) ölçümün en ağır
  // kanıtı ama hiç rozeti yoktu. Puan rozeti sayıdan ayrı: on sınava girmek
  // alışkanlık, bir sınavdan 90 almak başarı.
  { id: "exam1", title: "İlk sınav", hint: "Bir sınavı tamamla", icon: "FlagIcon", tier: "bronze", group: "exams", metric: "exams", target: 1 },
  { id: "exam10", title: "Sınav rutini", hint: "10 sınav tamamla", icon: "CalendarIcon", tier: "silver", group: "exams", metric: "exams", target: 10 },
  { id: "exam90", title: "Neredeyse kusursuz", hint: "Bir sınavdan 90 puan al", icon: "StarIcon", tier: "gold", group: "exams", metric: "bestExam", target: 90 },

  // ——— Beceri ————————————————————————————————————————————————————
  { id: "skill1", title: "Dört beceri", hint: "Bir beceri alıştırmasını bitir", icon: "CompassIcon", tier: "bronze", group: "skills", metric: "skills", target: 1 },
  { id: "skill10", title: "Okur yazar", hint: "10 beceri alıştırmasını bitir", icon: "CompassIcon", tier: "silver", group: "skills", metric: "skills", target: 10 },
  { id: "skill40", title: "Dört koldan", hint: "40 beceri alıştırmasını bitir", icon: "GlobeIcon", tier: "gold", group: "skills", metric: "skills", target: 40 },

  /*
    Yazma ve konuşma buradaydı ama rozetsizdi.

    "Yazılarım" ekranı boş açılıyordu ve boş kalmasının bir sebebi de hiçbir
    şeyin oraya çağırmamasıydı. Üç rozet o ekrana bir yön veriyor: ilkini
    yaz, alışkanlık kur, bir kez de gerçekten iyi yaz.
  */
  { id: "writing1", title: "İlk yazın", hint: "Bir yazını değerlendirt", icon: "PenIcon", tier: "bronze", group: "skills", metric: "writings", target: 1 },
  { id: "writing15", title: "Kalem alışkanlığı", hint: "15 yazı değerlendirt", icon: "PenIcon", tier: "silver", group: "skills", metric: "writings", target: 15 },
  { id: "writing85", title: "Temiz kalem", hint: "Bir yazından 85 puan al", icon: "StarIcon", tier: "gold", group: "skills", metric: "bestWriting", target: 85 },
  { id: "speaking25", title: "Sesli düşünen", hint: "25 konuşma ya da rol yapma değerlendirt", icon: "MicIcon", tier: "silver", group: "skills", metric: "speakings", target: 25 },

  // ——— Günün turu & hayatta kalma ————————————————————————————————
  { id: "daily1", title: "Günün turu", hint: "Günün turunu bir kez oyna", icon: "TrophyIcon", tier: "bronze", group: "rounds", metric: "dailyRounds", target: 1 },
  { id: "daily10", title: "Her gün aynı saat", hint: "Günün turunu 10 kez oyna", icon: "TrophyIcon", tier: "silver", group: "rounds", metric: "dailyRounds", target: 10 },
  { id: "daily50", title: "Turun müdavimi", hint: "Günün turunu 50 kez oyna", icon: "TrophyIcon", tier: "gold", group: "rounds", metric: "dailyRounds", target: 50 },
  { id: "dailyPerfect", title: "Günü kusursuz", hint: "Günün turunu hatasız bitir", icon: "StarIcon", tier: "gold", group: "rounds", metric: "perfectDaily", target: 1 },
  { id: "challenge500", title: "Hayatta kaldın", hint: "Hayatta kalma turunda 500 puan", icon: "SparkIcon", tier: "bronze", group: "rounds", metric: "challengeBest", target: 500 },
  { id: "challenge1500", title: "Soğukkanlı", hint: "Hayatta kalma turunda 1.500 puan", icon: "SparkIcon", tier: "silver", group: "rounds", metric: "challengeBest", target: 1500 },
  { id: "challenge3000", title: "Zamana karşı", hint: "Hayatta kalma turunda 3.000 puan", icon: "SparkIcon", tier: "gold", group: "rounds", metric: "challengeBest", target: 3000 },

  // ——— Keşif ——————————————————————————————————————————————————————
  { id: "night50", title: "Gece kuşu", hint: "Gece yarısıyla 05:00 arası 50 soru cevapla", icon: "MoonIcon", tier: "silver", group: "discovery", metric: "nightAnswers", target: 50 },
  { id: "early50", title: "Erken kalkan", hint: "05:00 ile 08:00 arası 50 soru cevapla", icon: "SunIcon", tier: "silver", group: "discovery", metric: "earlyAnswers", target: 50 },
  { id: "marathon150", title: "Maraton", hint: "Tek günde 150 tekrar yap", icon: "RunIcon", tier: "gold", group: "discovery", metric: "bestDayReviews", target: 150 },
  { id: "days30", title: "Sadık", hint: "30 farklı gün çalış", icon: "CalendarIcon", tier: "silver", group: "discovery", metric: "activeDays", target: 30 },
  { id: "days100", title: "Demirbaş", hint: "100 farklı gün çalış", icon: "CalendarIcon", tier: "gold", group: "discovery", metric: "activeDays", target: 100 },
  { id: "bilingual", title: "İki kurs", hint: "Hem Almanca hem Zürihçe kursunda çalış", icon: "MapIcon", tier: "gold", group: "discovery", metric: "courses", target: 2 },
  /*
    Görevler her gün üç tane ve gece yarısı yenileniyor. Rozet TOPLAM ödül
    sayısını değil, üçünün de bitirildiği GÜN sayısını sayıyor: yirmi gün tek
    görev almak ile yirmi günü tam kapatmak aynı şey değil ve ikincisi
    görevlerin var oluş sebebi.
  */
  { id: "quests20", title: "Günü kapatan", hint: "20 gün, günün üç görevini de bitir", icon: "TargetIcon", tier: "gold", group: "discovery", metric: "fullQuestDays", target: 20 },
];

const BY_ID = new Map(ACHIEVEMENTS.map((a) => [a.id, a]));

// Grup tanımı arayüzle ortak (bkz. lib/achievement-groups): sunucu tarafı
// `server-only` olduğu için arayüz onu içe aktaramıyordu ve liste elle
// kopyalanmıştı. Yeni bir grup eklenince rozetler açılıyor ama duvarda hiç
// görünmüyordu.
export { GROUP_LABELS, GROUP_ORDER };
export type { Group };


type Metrics = Record<Metric, number>;

/**
 * Rozetlerin dayandığı bütün sayılar, tek yerde.
 *
 * Her rozetin kendi sorgusunu yapması 33 sorgu demekti. Ölçüler bir kez
 * toplanıp bütün tanımlar bu tek pakete karşı değerlendiriliyor; yeni bir
 * rozet eklemek çoğu zaman hiç yeni sorgu gerektirmiyor.
 */
async function collectMetrics(userId: string): Promise<Metrics> {
  const [profile] = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1);
  const tz = profile?.timezone || "Europe/Istanbul";

  const [
    masteredRow,
    gameRows,
    lessonRow,
    skillRow,
    bossRow,
    dailyRow,
    hourRow,
    dayRow,
    courseRow,
    drillRow,
    examRow,
    assessRow,
    questRow,
  ] = await Promise.all([
    db
      .select({ n: sql<number>`count(*)::int` })
      .from(userWords)
      .where(and(eq(userWords.userId, userId), gte(userWords.intervalDays, 21))),

    // Oyun bazlı doğru sayıları tek geçişte; toplam da buradan çıkıyor.
    db
      .select({ game: reviews.game, n: sql<number>`count(*)::int` })
      .from(reviews)
      .where(and(eq(reviews.userId, userId), eq(reviews.correct, true)))
      .groupBy(reviews.game),

    db
      .select({ n: sql<number>`count(*)::int` })
      .from(userLessons)
      .where(and(eq(userLessons.userId, userId), eq(userLessons.roleplayDone, true))),

    db.select({ n: sql<number>`count(*)::int` }).from(userSkills).where(eq(userSkills.userId, userId)),

    db
      .select({ n: sql<number>`count(*)::int` })
      .from(moduleClears)
      .where(eq(moduleClears.userId, userId)),

    db
      .select({
        n: sql<number>`count(*)::int`,
        perfect: sql<number>`count(*) filter (where ${dailyScores.total} > 0 and ${dailyScores.correct} = ${dailyScores.total})::int`,
      })
      .from(dailyScores)
      .where(eq(dailyScores.userId, userId)),

    // Gece/sabah sayımı kullanıcının KENDİ saat diliminde: sunucunun UTC
    // saati "gece kuşu" rozetini İstanbul'daki bir kullanıcı için üç saat
    // kaydırırdı.
    db
      .select({
        night: sql<number>`count(*) filter (where extract(hour from ${reviews.createdAt} at time zone ${tz}) < 5)::int`,
        early: sql<number>`count(*) filter (where extract(hour from ${reviews.createdAt} at time zone ${tz}) between 5 and 7)::int`,
      })
      .from(reviews)
      .where(eq(reviews.userId, userId)),

    db
      .select({
        days: sql<number>`count(*) filter (where ${dailyStats.reviews} > 0 or ${dailyStats.xp} > 0)::int`,
        best: sql<number>`coalesce(max(${dailyStats.reviews}), 0)::int`,
      })
      .from(dailyStats)
      .where(eq(dailyStats.userId, userId)),

    // Kaç farklı kursta gerçekten çalışılmış: kelime kaydı kursu taşımıyor,
    // kelimenin kendisi taşıyor. `reps > 0` şartı önemli — kurs değiştirip
    // hiç oynamamak "iki kurs" saymamalı.
    db
      .select({ n: sql<number>`count(distinct ${words.course})::int` })
      .from(userWords)
      .innerJoin(words, eq(words.id, userWords.wordId))
      .where(and(eq(userWords.userId, userId), gt(userWords.reps, 0))),

    // Dilbilgisi drill'i kaldırıldı (2026-08); pekişmiş dilbilgisi maddesi artık 0.
    Promise.resolve([{ n: 0 }]),

    db
      .select({ n: sql<number>`count(*)::int`, best: sql<number>`coalesce(max(${exams.score}), 0)::int` })
      .from(exams)
      .where(eq(exams.userId, userId)),

    /*
      Yazma ve konuşma tek geçişte. Puan `result` içindeki JSON'dan
      okunuyor; değerlendirilmemiş (result null) denemeler sayılmıyor —
      gönderilmiş ama hakemden dönmemiş bir yazı henüz bir yazı değil.
    */
    db
      .select({
        writings: sql<number>`count(*) filter (where ${assessments.kind} = 'writing')::int`,
        bestWriting: sql<number>`coalesce(max((${assessments.result}->'score'->>'overall')::int) filter (where ${assessments.kind} = 'writing'), 0)::int`,
        speakings: sql<number>`count(*) filter (where ${assessments.kind} in ('speaking', 'roleplay'))::int`,
      })
      .from(assessments)
      .where(and(eq(assessments.userId, userId), isNotNull(assessments.result))),

    // Üç görevin de alındığı gün sayısı — tek tek ödüller değil, tam günler.
    db
      .select({ n: sql<number>`count(*)::int` })
      .from(
        db
          .select({ day: questClaims.day })
          .from(questClaims)
          .where(eq(questClaims.userId, userId))
          .groupBy(questClaims.day)
          .having(sql`count(*) >= 3`)
          .as("full_days"),
      ),
  ]);

  const games = new Map(gameRows.map((r) => [r.game, Number(r.n)]));
  const correctTotal = gameRows.reduce((s, r) => s + Number(r.n), 0);
  const courses = Number(courseRow[0]?.n ?? 0);

  return {
    longestStreak: profile?.longestStreak ?? 0,
    mastered: Number(masteredRow[0]?.n ?? 0),
    correctAnswers: correctTotal,
    gameArtikel: games.get("artikel") ?? 0,
    gameListen: games.get("listen") ?? 0,
    gameTyping: games.get("typing") ?? 0,
    gameOrder: games.get("order") ?? 0,
    gamePlural: games.get("plural") ?? 0,
    gameSpeak: games.get("speak") ?? 0,
    lessons: Number(lessonRow[0]?.n ?? 0),
    skills: Number(skillRow[0]?.n ?? 0),
    dailyRounds: Number(dailyRow[0]?.n ?? 0),
    perfectDaily: Number(dailyRow[0]?.perfect ?? 0),
    challengeBest: profile?.challengeBest ?? 0,
    nightAnswers: Number(hourRow[0]?.night ?? 0),
    earlyAnswers: Number(hourRow[0]?.early ?? 0),
    bestDayReviews: Number(dayRow[0]?.best ?? 0),
    activeDays: Number(dayRow[0]?.days ?? 0),
    bossClears: Number(bossRow[0]?.n ?? 0),
    courses,
    drillMastered: Number(drillRow[0]?.n ?? 0),
    exams: Number(examRow[0]?.n ?? 0),
    bestExam: Number(examRow[0]?.best ?? 0),
    writings: Number(assessRow[0]?.writings ?? 0),
    bestWriting: Number(assessRow[0]?.bestWriting ?? 0),
    speakings: Number(assessRow[0]?.speakings ?? 0),
    gameTranslate: games.get("translate") ?? 0,
    // Kaç FARKLI oyunda en az bir doğru var. Hiç doğru yapılmamış bir oyunu
    // "oynandı" saymak, keşif rozetini rastgele bir dokunuşla açardı.
    gamesPlayed: PLAYABLE_GAMES.filter((g) => (games.get(g) ?? 0) > 0).length,
    fullQuestDays: Number(questRow[0]?.n ?? 0),
  };
}

export type AchievementRow = AchievementDef & {
  done: number;
  unlocked: boolean;
  unlockedAt: string | null;
};

export type AchievementBoard = {
  rows: AchievementRow[];
  unlockedCount: number;
  total: number;
  /** Henüz kutlanmamış rozetler — özet ekranı bunları patlatır ve işaretler. */
  fresh: AchievementRow[];
};

/**
 * Rozet tahtası + yeni açılanların kaydı.
 *
 * Okuma ve yazma bilerek aynı işlevde: rozetlerin "açılma anı" ancak biri
 * baktığında hesaplanabiliyor ve o an kaydedilmezse kaybolurdu. Ekleme
 * çakışmaya dayanıklı (birincil anahtar), yani aynı anda gelen iki istek
 * aynı rozeti iki kez veremez.
 */
export async function achievementBoard(userId: string): Promise<AchievementBoard> {
  const [metrics, owned] = await Promise.all([
    collectMetrics(userId),
    db
      .select({
        id: achievements.achievementId,
        at: achievements.unlockedAt,
        seen: achievements.seen,
      })
      .from(achievements)
      .where(eq(achievements.userId, userId)),
  ]);

  const ownedMap = new Map(owned.map((o) => [o.id, o]));

  const rows: AchievementRow[] = ACHIEVEMENTS.map((def) => {
    const done = Math.min(def.target, metrics[def.metric] ?? 0);
    const earned = (metrics[def.metric] ?? 0) >= def.target;
    const rec = ownedMap.get(def.id);
    return {
      ...def,
      done,
      unlocked: earned || Boolean(rec),
      unlockedAt: rec ? new Date(rec.at).toISOString() : null,
    };
  });

  // Yeni hak edilenleri yaz. Tanımı bilinmeyen eski kayıtlar dokunulmadan
  // kalıyor: rozet listesinden bir madde çıkarılsa bile kimsenin kazandığı
  // silinmemeli.
  const missing = rows.filter((r) => r.unlocked && !ownedMap.has(r.id));
  if (missing.length) {
    const written = await db
      .insert(achievements)
      .values(missing.map((m) => ({ userId, achievementId: m.id })))
      .onConflictDoNothing({ target: [achievements.userId, achievements.achievementId] })
      .returning({ id: achievements.achievementId, at: achievements.unlockedAt });

    // Yazılan anı satırlara geri işle. Olmasaydı bir rozet, açıldığı ANDA
    // tarihsiz görünür ve ancak bir sonraki bakışta tarihi olurdu — yani
    // kutlama ekranı "Açıldı" der, ne zaman açıldığını söyleyemezdi.
    const stamps = new Map(written.map((w) => [w.id, new Date(w.at).toISOString()]));
    for (const r of rows) {
      const at = stamps.get(r.id);
      if (at) r.unlockedAt = at;
    }
    // Gerçekten bu istekte yazılanlar (yarışta kaybeden yazmadı) arkadaş akışına düşer.
    await onAchievementsUnlocked(
      userId,
      missing.filter((m) => stamps.has(m.id)).map((m) => ({ id: m.id, title: m.title, tier: m.tier })),
    );
  }

  // Kutlanmayı bekleyenler: yeni yazılanlar + daha önce yazılıp gösterilmemişler.
  const unseenIds = new Set([
    ...missing.map((m) => m.id),
    ...owned.filter((o) => !o.seen).map((o) => o.id),
  ]);
  const fresh = rows.filter((r) => unseenIds.has(r.id));

  return {
    rows,
    unlockedCount: rows.filter((r) => r.unlocked).length,
    total: rows.length,
    fresh,
  };
}

/** Kutlaması gösterilen rozetleri işaretler — ikinci kez patlamasın. */
export async function markAchievementsSeen(userId: string, ids: string[]) {
  const valid = ids.filter((id) => BY_ID.has(id));
  if (!valid.length) return;
  await db
    .update(achievements)
    .set({ seen: true })
    .where(and(eq(achievements.userId, userId), inArray(achievements.achievementId, valid)));
}

/** Profil başlığındaki özet — tahtanın tamamını çekmeden. */
export async function achievementCount(userId: string): Promise<number> {
  const [row] = await db
    .select({ n: count() })
    .from(achievements)
    .where(eq(achievements.userId, userId));
  return Number(row?.n ?? 0);
}

/** En son açılan üç rozet — profil başlığında gösterilir. */
export async function recentAchievements(userId: string, limit = 3) {
  const rows = await db
    .select({ id: achievements.achievementId, at: achievements.unlockedAt })
    .from(achievements)
    .where(eq(achievements.userId, userId))
    .orderBy(desc(achievements.unlockedAt))
    .limit(limit);
  return rows.flatMap((r) => {
    const def = BY_ID.get(r.id);
    return def ? [{ ...def, unlockedAt: new Date(r.at).toISOString() }] : [];
  });
}
