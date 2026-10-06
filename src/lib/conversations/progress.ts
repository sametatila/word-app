import "server-only";
import { and, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { profiles, userConversations } from "@/lib/db/schema";
import { allConversations, conversationsFor, levelIndex } from "./index";
import { scoredSteps, type Conversation } from "./types";
import { awardActivity } from "@/lib/award";
import { xpDelta, xpForConversation } from "@/lib/xp";
import { CONVERSATION_PASS_RATIO } from "./chat-const";

/**
 * Konuşma ilerlemesi ve kuralların tekrar zamanlaması.
 *
 * Kelimelerdeki SM-2 buraya olduğu gibi taşınmadı ve sebebi ölçünün farkı:
 * kelimede soru "hatırladın mı", kuralda "kurabildin mi". Kural bir kez
 * anlaşıldığında hatırlama sorunu değil, uygulama sorunu olarak sürüyor —
 * bu yüzden aralıklar daha kısa ve daha az agresif büyüyor.
 *
 * Aralıklar sabit bir merdiven: 1, 3, 7, 16, 35 gün. Konuşma bir bütün olarak
 * "başarılı" sayılırsa bir üst basamağa çıkıyor, değilse başa dönüyor.
 * Kelimelerdeki gibi süreklilik arz eden bir kolaylık faktörü yok; konuşma
 * sayısı az ve her biri elle yazıldığı için ince ayarın karşılığı olmazdı.
 */

const LADDER = [1, 3, 7, 16, 35];

/** Puanlanan adımların (üretim + doğru/yanlış) bu oranı ilk denemede
 *  doğruysa konuşma "geçildi" sayılıyor. Sabit istemciyle ORTAK
 *  (`chat-const`): özet, olumsuz hükmün sebebini aynı sayıdan söylüyor. */
const PASS_RATIO = CONVERSATION_PASS_RATIO;

/**
 * Bitiriş kimliğinin biçimi: istemci (`newFinishId`, web `conversation-queue`,
 * mobil `pathProgress`) UUID ya da zaman+rastgele parçadan kuruyor. Uzunluk ve
 * karakter kümesi dar tutuluyor: kimlik satıra yazılıyor, keyfi metin taşımasın.
 */
const FINISH_ID_RE = /^[A-Za-z0-9_-]{8,64}$/;

/** İstekteki `finishId` geçerli bir bitiriş kimliği mi. */
export function isFinishId(v: unknown): v is string {
  return typeof v === "string" && FINISH_ID_RE.test(v);
}

export type ConversationState = {
  conversationId: string;
  correct: number;
  total: number;
  chatDone: boolean;
  /** Sohbet muaf (izin yok ya da misafir); adım yine bitmiş sayılır. */
  chatWaived: boolean;
  attempts: number;
  dueAt: Date;
  intervalDays: number;
};

export type ConversationCard = {
  conversation: Conversation;
  state: ConversationState | null;
  /** Tekrar zamanı gelmiş mi — bitmiş ama unutulmaya yüz tutmuş konuşma. */
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
      chatWaived: row.chatWaived,
      attempts: row.attempts,
      dueAt: row.dueAt,
      intervalDays: row.intervalDays,
    };
    return { conversation, state, due: row.dueAt.getTime() <= now, fresh: false };
  });
}

/**
 * Sıradaki konuşma.
 *
 * Öncelik tekrarı gelen konuşmada, yeni konuşmada değil. Sebebi Learna'nın da
 * ölçtüğü şey: yeni konu eklemek kolay, eskisini tutmak zor. Tekrar borcu
 * varken yeni konuşma açmak öğrenciyi ilerliyormuş gibi hissettirip aslında
 * geride bırakıyor.
 *
 * Yeni konuşma seçilirken kullanıcının SEÇTİĞİ seviye başlangıç sayılıyor:
 * kayıtta B1 diyen birine A1'in ilk konuşmasını önermek, onu bildiği şeye geri
 * çağırmak olur. Alt seviyeler haritada açık duruyor (isteyen döner) ama
 * öneri kullanıcının seviyesinden başlıyor; o seviyeden yukarısı bittiyse
 * alttaki eksiklere dönülüyor.
 */
export async function nextConversation(
  userId: string,
  course: string,
  level = "A1",
  /** Atlanacak konuşma (ör. şu an açık olan): onun yerine sıradaki aday döner. */
  exclude?: string,
): Promise<ConversationCard | null> {
  const board = (await conversationBoard(userId, course)).filter((c) => c.conversation.id !== exclude);
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
 * Konuşma sonucunu kaydeder ve bir sonraki tekrarı planlar.
 *
 * Sohbet tamamlanmadıysa konuşma geçilmiş sayılmıyor — alıştırmaları doğru
 * yapıp konuşmadan çıkmak, konuşmanın asıl parçasını atlamak demek.
 */
export async function recordConversation(
  userId: string,
  conversation: Conversation,
  correct: number,
  chatDone: boolean,
  /** Kullanıcının yerel günü — XP ve seri buna işlenir. */
  today: string,
  seconds = 0,
  /**
   * Bitirişin kimliği (istemci her bitirişte bir kez üretiyor; yeniden deneme
   * ve kuyruk aynısını gönderiyor). Yoksa (kimlik göndermeyen eski sürüm)
   * istek eskisi gibi her seferinde yeni deneme sayılıyor.
   */
  finishId: string | null = null,
  /**
   * Sohbet muaf mı — SUNUCU karar veriyor (`api/conversation`: misafir ya da
   * yapay zekâ metin izni reddedilmiş). Muafta konuşma anlatım puanıyla geçilir,
   * sohbet XP'si verilmez (XP `chatDone`a bakıyor).
   */
  chatWaived = false,
): Promise<{
  passed: boolean;
  nextDays: number;
  xpGained: number;
  currentStreak: number;
  totalXp: number;
}> {
  const total = scoredSteps(conversation);
  const passed = (chatDone || chatWaived) && total > 0 && correct / total >= PASS_RATIO;

  /*
   * OKU-HESAPLA-YAZ TEK İŞLEMDE, (kullanıcı, konuşma) kilidiyle (güvenlik
   * denetimi 2026-10-03, D1). XP iyileşme farkı `existing`ten hesaplanıyor;
   * kilitsizken farklı bitiriş kimlikli paralel N istek hepsi aynı `existing`i
   * görüp N kez tam XP alıyordu. Aşağıdaki `setWhere` aynı kimliğin ikinci
   * kopyasını zaten yakalıyordu; kilit kimliği farklı kopyaları da sıraya
   * sokuyor.
   */
  const outcome = await db.transaction(async (tx) => {
    await tx.execute(sql`select pg_advisory_xact_lock(hashtext(${`conv:${userId}:${conversation.id}`}))`);
    const [existing] = await tx
      .select()
      .from(userConversations)
      .where(and(eq(userConversations.userId, userId), eq(userConversations.conversationId, conversation.id)));

    /*
      AYNI BİTİRİŞİN İKİNCİ KEZ GELMESİ — yeni deneme değil, tekrar gönderim.

      İstemciler kaydı ağ hatasında bir kez daha deniyor ve düşeni kuyruğa alıp
      Patika açılırken yeniden gönderiyor (mobil `pathProgress`, web
      `conversation-queue`). Bağlantı yanıttan önce koptuysa sunucu ilk isteği
      işlemiş olabilir; ikinci kopya denemeyi iki kez sayar, süreyi iki kez
      ekler ve geçilmiş konuşmada tekrar merdivenini iki basamak çıkarırdı.
      Bitiriş kimliği son yazılanla aynıysa hiçbir şey yazılmıyor, kayıtlı durum
      dönüyor. Eskiden bu iş bir zaman penceresiyle (2 dk) yapılıyordu; pencere
      hızlı yapılan gerçek bir ikinci denemeyi de yutuyordu, kimlik yutmuyor.
    */
    if (finishId && existing?.lastFinishId === finishId) {
      return { duplicate: true as const, intervalDays: existing.intervalDays };
    }

    const step = passed
      ? Math.min((existing?.intervalDays ?? 0) === 0 ? 0 : LADDER.indexOf(existing!.intervalDays) + 1, LADDER.length - 1)
      : 0;
    const nextDays = LADDER[Math.max(0, step)];

    const written = await tx
      .insert(userConversations)
      .values({
        userId,
        conversationId: conversation.id,
        ruleId: conversation.focusId,
        correct,
        total,
        chatDone,
        chatWaived: chatWaived && !chatDone,
        attempts: 1,
        intervalDays: nextDays,
        dueAt: sql`now() + (${nextDays} || ' days')::interval`,
        lastAt: new Date(),
        lastFinishId: finishId,
      })
      .onConflictDoUpdate({
        target: [userConversations.userId, userConversations.conversationId],
        set: {
          // En iyi skor korunuyor: bir kez doğru yapılanı sonraki denemede
          // kaybetmek ilerlemeyi geri almamalı.
          correct: sql`greatest(${userConversations.correct}, ${correct})`,
          total,
          chatDone: sql`${userConversations.chatDone} or ${chatDone}`,
          chatWaived: sql`${userConversations.chatWaived} or ${chatWaived && !chatDone}`,
          attempts: sql`${userConversations.attempts} + 1`,
          intervalDays: nextDays,
          dueAt: sql`now() + (${nextDays} || ' days')::interval`,
          lastAt: new Date(),
          lastFinishId: finishId,
        },
        /* Yukarıdaki okuma ile bu yazma arasında aynı bitirişin öbür kopyası
           yazmış olabilir (ilk istek hâlâ işlenirken gelen yeniden deneme). Koşul
           satır kilidi altında bir daha bakıyor: kimlik artık aynıysa güncelleme
           yapılmıyor ve `returning` boş dönüyor. Kimliksiz istek her zaman yazar. */
        setWhere: finishId
          ? sql`${userConversations.lastFinishId} is distinct from ${finishId}`
          : undefined,
      })
      .returning({ intervalDays: userConversations.intervalDays });

    if (!written.length) {
      const [row] = await tx
        .select({ intervalDays: userConversations.intervalDays })
        .from(userConversations)
        .where(and(eq(userConversations.userId, userId), eq(userConversations.conversationId, conversation.id)));
      return { duplicate: true as const, intervalDays: row?.intervalDays ?? nextDays };
    }
    return { duplicate: false as const, existing, nextDays };
  });
  if (outcome.duplicate) return duplicateResult(userId, passed, outcome.intervalDays);
  const { existing, nextDays } = outcome;

  // XP: konuşmanın tasarlanmış süresine göre, tekrar çözümlerde yalnızca iyileşme
  // farkı. Konuşma bölümü daha önce hiç puan vermiyordu — sekiz tamamlanmış konuşma
  // ve sekiz sohbet turu hesaba hiç yazılmamıştı, o gün çalışan öğrencinin
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

  // `totalXp` de dönüyor: konuşma bitince üst bardaki XP rozeti güncellenmiyordu
  // ve öğrenci kazandığı puanı ancak sayfayı yenileyince görüyordu — konuşmanın
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
 * Tekrar gönderimin yanıtı: ilk isteğin döndürdüğüyle aynı biçim, hiçbir yazma
 * olmadan. `passed` isteğin kendi sonucundan (aynı bitiriş, aynı gövde),
 * `nextDays` o bitirişin kurduğu aralıktan; XP ve süre ilk istekte işlendi,
 * burada sıfır. Seri ve toplam XP profilden OKUNUYOR — `awardActivity(0, 0)`
 * çağırmak günlük satıra ve profile yine yazardı.
 */
async function duplicateResult(userId: string, passed: boolean, nextDays: number) {
  const [profile] = await db
    .select({ currentStreak: profiles.currentStreak, totalXp: profiles.totalXp })
    .from(profiles)
    .where(eq(profiles.userId, userId))
    .limit(1);
  return {
    passed,
    nextDays,
    xpGained: 0,
    currentStreak: profile?.currentStreak ?? 0,
    totalXp: profile?.totalXp ?? 0,
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
 * Merdiven bunu doğrudan söylüyor: geçilemeyen konuşma ilk basamağa düşüyor.
 * Dolayısıyla "birden fazla kez denenmiş ama hâlâ ilk basamakta" olan kural,
 * tanımı gereği oturmamış olandır.
 *
 * İlk deneme dışarıda: ilk seferde takılmak zayıflık değil, yeni olmaktır.
 *
 * Kural kimlikleri sohbet düzeltmelerinin ürettiği etiketlerle aynı uzayda
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
  // Katalogdan çıkmış konuşmaların kayıtları sayılmıyor: kullanıcı o kurala artık
  // hiçbir konuşmadan ulaşamaz, "oturmamış" diye göstermek çıkışsız bir uyarı olur.
  const known = new Set((await allConversations()).map((l) => l.id));
  const weak = rows
    .filter((r) => known.has(r.conversationId) && r.attempts >= 2 && r.intervalDays <= LADDER[0])
    .map((r) => r.ruleId);
  return [...new Set(weak)].slice(0, limit);
}

/** Katalogdaki toplam konuşma sayısı — ilerleme çubuğu için. */
export async function conversationCount(course: string): Promise<number> {
  // Kurs TAM eşleşiyor: ilerleme paydası İngilizce öğrenci için Almanca konuşma
  // sayısını veriyordu (bkz. lib/conversations/index `conversationsFor`).
  return (await conversationsFor(course)).length;
}
