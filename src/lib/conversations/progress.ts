import "server-only";
import { and, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { userConversations } from "@/lib/db/schema";
import { allConversations, conversationsFor, levelIndex } from "./index";
import { scoredSteps, type Conversation } from "./types";
import { awardActivity } from "@/lib/award";
import { xpDelta, xpForConversation } from "@/lib/xp";

/**
 * Ders ilerlemesi ve kuralların tekrar zamanlaması.
 *
 * Kelimelerdeki SM-2 buraya olduğu gibi taşınmadı ve sebebi ölçünün farkı:
 * kelimede soru "hatırladın mı", kuralda "kurabildin mi". Kural bir kez
 * anlaşıldığında hatırlama sorunu değil, uygulama sorunu olarak sürüyor —
 * bu yüzden aralıklar daha kısa ve daha az agresif büyüyor.
 *
 * Aralıklar sabit bir merdiven: 1, 3, 7, 16, 35 gün. Ders bir bütün olarak
 * "başarılı" sayılırsa bir üst basamağa çıkıyor, değilse başa dönüyor.
 * Kelimelerdeki gibi süreklilik arz eden bir kolaylık faktörü yok; ders
 * sayısı az ve her biri elle yazıldığı için ince ayarın karşılığı olmazdı.
 */

const LADDER = [1, 3, 7, 16, 35];

/** Puanlanan adımların (üretim + doğru/yanlış) bu oranı ilk denemede
 *  doğruysa ders "geçildi" sayılıyor. */
const PASS_RATIO = 0.7;

export type ConversationState = {
  conversationId: string;
  correct: number;
  total: number;
  chatDone: boolean;
  attempts: number;
  dueAt: Date;
  intervalDays: number;
};

export type ConversationCard = {
  conversation: Conversation;
  state: ConversationState | null;
  /** Tekrar zamanı gelmiş mi — bitmiş ama unutulmaya yüz tutmuş ders. */
  due: boolean;
  /** Hiç açılmamış mı. */
  fresh: boolean;
};

export async function conversationBoard(userId: string, course: string): Promise<ConversationCard[]> {
  const rows = await db
    .select()
    .from(userConversations)
    .where(eq(userConversations.userId, userId));
  const byId = new Map(rows.map((r) => [r.conversationId, r]));
  const now = Date.now();

  return (await conversationsFor(course)).map((conversation) => {
    const row = byId.get(conversation.id);
    if (!row) return { conversation, state: null, due: false, fresh: true };
    const state: ConversationState = {
      conversationId: row.conversationId,
      correct: row.correct,
      total: row.total,
      chatDone: row.chatDone,
      attempts: row.attempts,
      dueAt: row.dueAt,
      intervalDays: row.intervalDays,
    };
    return { conversation, state, due: row.dueAt.getTime() <= now, fresh: false };
  });
}

/**
 * Sıradaki ders.
 *
 * Öncelik tekrarı gelen derste, yeni derste değil. Sebebi Learna'nın da
 * ölçtüğü şey: yeni konu eklemek kolay, eskisini tutmak zor. Tekrar borcu
 * varken yeni ders açmak öğrenciyi ilerliyormuş gibi hissettirip aslında
 * geride bırakıyor.
 *
 * Yeni ders seçilirken kullanıcının SEÇTİĞİ seviye başlangıç sayılıyor:
 * kayıtta B1 diyen birine A1'in ilk dersini önermek, onu bildiği şeye geri
 * çağırmak olur. Alt seviyeler haritada açık duruyor (isteyen döner) ama
 * öneri kullanıcının seviyesinden başlıyor; o seviyeden yukarısı bittiyse
 * alttaki eksiklere dönülüyor.
 */
export async function nextConversation(
  userId: string,
  course: string,
  level = "A1",
): Promise<ConversationCard | null> {
  const board = await conversationBoard(userId, course);
  const due = board.filter((c) => c.due);
  if (due.length) {
    // En uzun süredir bekleyen önce.
    due.sort((a, b) => (a.state!.dueAt.getTime() - b.state!.dueAt.getTime()));
    return due[0];
  }
  const from = levelIndex(level);
  return (
    board.find((c) => c.fresh && levelIndex(c.conversation.level) >= from) ??
    board.find((c) => c.fresh) ??
    null
  );
}

/**
 * Ders sonucunu kaydeder ve bir sonraki tekrarı planlar.
 *
 * Rol yapma tamamlanmadıysa ders geçilmiş sayılmıyor — alıştırmaları doğru
 * yapıp konuşmadan çıkmak, dersin asıl parçasını atlamak demek.
 */
export async function recordConversation(
  userId: string,
  conversation: Conversation,
  correct: number,
  chatDone: boolean,
  /** Kullanıcının yerel günü — XP ve seri buna işlenir. */
  today: string,
  seconds = 0,
): Promise<{
  passed: boolean;
  nextDays: number;
  xpGained: number;
  currentStreak: number;
  totalXp: number;
}> {
  const total = scoredSteps(conversation);
  const passed = chatDone && total > 0 && correct / total >= PASS_RATIO;

  const [existing] = await db
    .select()
    .from(userConversations)
    .where(and(eq(userConversations.userId, userId), eq(userConversations.conversationId, conversation.id)));

  const step = passed
    ? Math.min((existing?.intervalDays ?? 0) === 0 ? 0 : LADDER.indexOf(existing!.intervalDays) + 1, LADDER.length - 1)
    : 0;
  const nextDays = LADDER[Math.max(0, step)];

  await db
    .insert(userConversations)
    .values({
      userId,
      conversationId: conversation.id,
      ruleId: conversation.focusId,
      correct,
      total,
      chatDone,
      attempts: 1,
      intervalDays: nextDays,
      dueAt: sql`now() + (${nextDays} || ' days')::interval`,
      lastAt: new Date(),
    })
    .onConflictDoUpdate({
      target: [userConversations.userId, userConversations.conversationId],
      set: {
        // En iyi skor korunuyor: bir kez doğru yapılanı sonraki denemede
        // kaybetmek ilerlemeyi geri almamalı.
        correct: sql`greatest(${userConversations.correct}, ${correct})`,
        total,
        chatDone: sql`${userConversations.chatDone} or ${chatDone}`,
        attempts: sql`${userConversations.attempts} + 1`,
        intervalDays: nextDays,
        dueAt: sql`now() + (${nextDays} || ' days')::interval`,
        lastAt: new Date(),
      },
    });

  // XP: dersin tasarlanmış süresine göre, tekrar çözümlerde yalnızca iyileşme
  // farkı. Ders bölümü daha önce hiç puan vermiyordu — sekiz tamamlanmış ders
  // ve sekiz rol yapma turu hesaba hiç yazılmamıştı, o gün çalışan öğrencinin
  // serisi bile kırılıyordu.
  const bestCorrect = Math.max(existing?.correct ?? 0, correct);
  const bestChat = (existing?.chatDone ?? false) || chatDone;
  const previousXp = existing
    ? xpForConversation(conversation.minutes, existing.correct, existing.total, existing.chatDone)
    : null;
  const gained = xpDelta(
    xpForConversation(conversation.minutes, bestCorrect, total, bestChat),
    previousXp,
  );

  const award = await awardActivity(userId, today, gained, seconds);

  // `totalXp` de dönüyor: ders bitince üst bardaki XP rozeti güncellenmiyordu
  // ve öğrenci kazandığı puanı ancak sayfayı yenileyince görüyordu — dersin
  // "sayılmadığı" hissi tam olarak buradan geliyordu.
  return {
    passed,
    nextDays,
    xpGained: award.xpGained,
    currentStreak: award.currentStreak,
    totalXp: award.totalXp,
  };
}

/**
 * Oturmamış kurallar.
 *
 * Ölçü **saklanan skor değil**, merdivenin bulunduğu basamak. Sebebi bir
 * hatayı düzeltirken görüldü: `correct` alanı en iyi denemeyi tutuyor (ki
 * ilerleme göstermek için doğru), ama zayıflık son denemenin işi. En iyi
 * skora bakan bir ölçü, bir kez başarmış sonra üst üste kaybetmiş öğrenciyi
 * "iyi durumda" sayıyordu.
 *
 * Merdiven bunu doğrudan söylüyor: geçilemeyen ders ilk basamağa düşüyor.
 * Dolayısıyla "birden fazla kez denenmiş ama hâlâ ilk basamakta" olan kural,
 * tanımı gereği oturmamış olandır.
 *
 * İlk deneme dışarıda: ilk seferde takılmak zayıflık değil, yeni olmaktır.
 *
 * Kural kimlikleri rol yapma düzeltmelerinin ürettiği etiketlerle aynı uzayda
 * (V2-Regel, Akkusativ) — ileride düzeltmeler doğrudan bu kuyruğu besleyebilir.
 */
export async function weakRules(userId: string, limit = 3): Promise<string[]> {
  const rows = await db
    .select({
      conversationId: userConversations.conversationId,
      ruleId: userConversations.ruleId,
      intervalDays: userConversations.intervalDays,
      attempts: userConversations.attempts,
    })
    .from(userConversations)
    .where(eq(userConversations.userId, userId));
  // Katalogdan çıkmış derslerin kayıtları sayılmıyor: kullanıcı o kurala artık
  // hiçbir dersten ulaşamaz, "oturmamış" diye göstermek çıkışsız bir uyarı olur.
  const known = new Set((await allConversations()).map((l) => l.id));
  const weak = rows
    .filter((r) => known.has(r.conversationId) && r.attempts >= 2 && r.intervalDays <= LADDER[0])
    .map((r) => r.ruleId);
  return [...new Set(weak)].slice(0, limit);
}

/** Katalogdaki toplam ders sayısı — ilerleme çubuğu için. */
export async function conversationCount(course: string): Promise<number> {
  // Kurs TAM eşleşiyor: ilerleme paydası İngilizce öğrenci için Almanca ders
  // sayısını veriyordu (bkz. lib/conversations/index `conversationsFor`).
  return (await conversationsFor(course)).length;
}
