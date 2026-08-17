import "server-only";
import webpush from "web-push";
import { and, eq, inArray, lte, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { profiles, pushSubscriptions, userWords } from "@/lib/db/schema";

/**
 * Hatırlatma bildirimleri.
 *
 * Uygulamanın geri çağırma kanalı yoktu. Ölçülen kullanımda giren kullanıcı
 * ürünü bırakmıyordu — ilk oturumlar 24 ile 1600 cevap arasındaydı — ama
 * ertesi gün onu geri çağıran hiçbir şey olmadığı için yedi kullanıcıdan
 * yalnızca biri yedi ayrı güne ulaşabilmişti. Eksik olan ilgi değil, hatırlatmaydı.
 */

export const pushEnabled = Boolean(
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY,
);

if (pushEnabled) {
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || "mailto:info@goaltesting.com",
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!,
  );
}

export type PushPayload = {
  title: string;
  body: string;
  /** Dokununca açılacak adres — bildirimin bir işi olmalı. */
  url: string;
  /**
   * Aynı etikete sahip bildirim öncekinin yerine geçer.
   *
   * Bildirimlerin üst üste yığılması, kaçırılan her günün kilit ekranında
   * ayrı bir suçlama olarak durması demekti. Tek bir güncel hatırlatma
   * yeterli.
   */
  tag: string;
};

/**
 * Kullanıcıya ne söyleneceğini seçer.
 *
 * Sıra bilinçli: en güçlü sebep en üstte. "Serin kırılıyor" bir kayıp
 * bildirimi ve bugüne bağlı; "şu kadar kelime unutulmak üzere" bir borç
 * bildirimi ve ertelenebilir. İkisi aynı anda doğru olduğunda kaybı
 * söylemek geri getiriyor.
 *
 * Genel metin ("Bugün çalışmayı unutma!") bilerek yok: kapatılan bildirimlerin
 * kaynağı bu tür metinler ve bir kez kapatılan izin geri gelmiyor. Her
 * bildirim kullanıcıya özgü bir sayı taşıyor.
 */
export function composeReminder(input: {
  name: string | null;
  streak: number;
  dueCount: number;
  level: string;
}): PushPayload | null {
  const first = input.name?.trim().split(/\s+/)[0];
  const hey = first ? `${first}, ` : "";

  if (input.streak > 0) {
    return {
      title: `${input.streak} günlük serin tehlikede`,
      body:
        input.dueCount > 0
          ? `${hey}bugün ${input.dueCount} kelimenin tekrarı var. Birkaç dakika seriyi kurtarır.`
          : `${hey}bugün henüz çalışmadın. Kısa bir tur seriyi ayakta tutar.`,
      url: "/learn",
      tag: "reminder",
    };
  }

  if (input.dueCount > 0) {
    return {
      title: `${input.dueCount} kelime unutulmak üzere`,
      body: `${hey}bu kelimeleri tam unutmadan önce yakalamanın vakti. Tur hazır.`,
      url: "/learn",
      tag: "reminder",
    };
  }

  // Tekrar borcu da serisi de yok: bırakmış ya da hiç başlamamış biri.
  // Ona borç hatırlatmak anlamsız, davet etmek gerekiyor.
  return {
    title: "Bugün 5 dakika?",
    body: `${hey}${input.level} seviyesinde yeni kelimeler seni bekliyor.`,
    url: "/learn",
    tag: "reminder",
  };
}

/**
 * Tek bir aboneliğe gönderir ve aboneliğin akıbetine karar verir.
 *
 * 404/410 push servisinin "bu abonelik artık yok" demesidir (uygulama
 * silinmiş, izin geri alınmış): satır hemen gidiyor. Diğer hatalar geçici
 * sayılıyor ve yalnızca sayacı artırıyor — tek bir ağ kesintisinin bütün
 * aboneleri silmemesi için.
 */
async function deliver(sub: typeof pushSubscriptions.$inferSelect, payload: PushPayload) {
  try {
    await webpush.sendNotification(
      { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
      JSON.stringify(payload),
      { TTL: 12 * 3600 }, // ertesi güne sarkan hatırlatma hatırlatma değildir
    );
    if (sub.failures > 0) {
      await db.update(pushSubscriptions).set({ failures: 0 }).where(eq(pushSubscriptions.id, sub.id));
    }
    return true;
  } catch (err) {
    const status = (err as { statusCode?: number }).statusCode;
    if (status === 404 || status === 410) {
      await db.delete(pushSubscriptions).where(eq(pushSubscriptions.id, sub.id));
      return false;
    }
    console.error("[push] gönderilemedi", status, (err as Error).message);
    await db
      .update(pushSubscriptions)
      .set({ failures: sub.failures + 1 })
      .where(eq(pushSubscriptions.id, sub.id));
    // Beş denemede bir kez bile geçmeyen abonelik ölmüş sayılır.
    if (sub.failures + 1 >= 5) {
      await db.delete(pushSubscriptions).where(eq(pushSubscriptions.id, sub.id));
    }
    return false;
  }
}

/** Bir kullanıcının bütün cihazlarına gönderir; kaçının ulaştığını döner. */
export async function sendToUser(userId: string, payload: PushPayload) {
  if (!pushEnabled) return 0;
  const subs = await db
    .select()
    .from(pushSubscriptions)
    .where(eq(pushSubscriptions.userId, userId));
  if (!subs.length) return 0;
  const results = await Promise.all(subs.map((s) => deliver(s, payload)));
  return results.filter(Boolean).length;
}

export type ReminderTarget = {
  userId: string;
  displayName: string | null;
  level: string;
  /**
   * Bugün kaybedilebilecek seri — kayıtlı `current_streak` değil.
   *
   * `profiles.current_streak` yalnızca cevap verildiğinde güncelleniyor, yani
   * bırakmış bir kullanıcıda son oynadığı günün değeri olarak donuyor. Ölçülen
   * veride bir hafta uğramamış kullanıcının serisi hâlâ 1 görünüyordu; o
   * kullanıcıya "serin tehlikede" demek, çoktan kaybedilmiş bir şeyi
   * korumaya çağırmak olurdu. Bildirimin güvenilir olması, söylediği şeyin
   * kullanıcının ekranda göreceğiyle aynı olmasına bağlı.
   *
   * Seri ancak kullanıcı DÜN oynadıysa bugün kırılabilir; daha eskiyse
   * zaten kırılmıştır ve sıfır sayılır.
   */
  liveStreak: number;
};

/**
 * Bugün hatırlatılacak kullanıcılar.
 *
 * Üç koşul birden aranıyor ve üçü de kullanıcının **kendi** gününe göre
 * hesaplanıyor:
 *   1. Kullanıcının yerel saati, seçtiği hatırlatma saatini geçmiş olmalı.
 *   2. O gün henüz çalışmamış olmalı — çalışana hatırlatmak gürültüdür.
 *   3. O gün daha önce hatırlatılmamış olmalı.
 *
 * Zaman hesabı SQL'de yapılıyor çünkü karar veritabanındaki iki alana
 * (`timezone`, `last_active_day`) bağlı ve satırları JS'e taşıyıp orada
 * elemek, büyüyen kullanıcı sayısında tüm tabloyu çekmek anlamına gelirdi.
 *
 * Cron'un sıklığından bağımsız çalışır: saatte bir çalışırsa herkes kendi
 * saatinde, günde bir çalışırsa saati çoktan geçmiş olan herkes o anda
 * hatırlatma alır. İkisinde de kişi başına günde bir bildirim düşer.
 */
export async function findReminderTargets(limit = 500): Promise<ReminderTarget[]> {
  // Kullanıcının kendi günü ve saati. Değerler JS'e taşınmıyor, yalnızca
  // karşılaştırmada kullanılıyor: `date` sütunları sürücüden `Date` nesnesi
  // olarak geliyor ve onu tekrar bir `date` sütununa yazmak biçim çevirisine
  // bağlı, saat dilimine göre bir gün kayabilen bir yol olurdu.
  const localDay = sql`(now() at time zone ${profiles.timezone})::date`;
  const localHour = sql`extract(hour from (now() at time zone ${profiles.timezone}))`;

  const rows = await db
    .select({
      userId: profiles.userId,
      displayName: profiles.displayName,
      level: profiles.level,
      liveStreak: sql<number>`(case when ${profiles.lastActiveDay} = ${localDay} - 1
        then ${profiles.currentStreak} else 0 end)::int`,
    })
    .from(profiles)
    .where(
      and(
        eq(profiles.remindersEnabled, true),
        sql`${localHour} >= ${profiles.reminderHour}`,
        sql`(${profiles.lastActiveDay} is null or ${profiles.lastActiveDay} < ${localDay})`,
        sql`(${profiles.lastReminderDay} is null or ${profiles.lastReminderDay} < ${localDay})`,
        // Aboneliği olmayana bakmanın anlamı yok.
        sql`exists (select 1 from ${pushSubscriptions} s where s.user_id = ${profiles.userId})`,
      ),
    )
    .limit(limit);

  return rows;
}

/** Kullanıcı başına tekrar zamanı gelmiş kelime sayısı — bildirimin sayısı budur. */
export async function dueCounts(userIds: string[]): Promise<Map<string, number>> {
  if (!userIds.length) return new Map();
  const rows = await db
    .select({ userId: userWords.userId, n: sql<number>`count(*)::int` })
    .from(userWords)
    .where(and(inArray(userWords.userId, userIds), lte(userWords.dueAt, sql`now()`)))
    .groupBy(userWords.userId);
  return new Map(rows.map((r) => [r.userId, Number(r.n)]));
}

/**
 * Günün hatırlatmalarını gönderir. Cron bunu çağırır.
 *
 * Gün işareti gönderimden ÖNCE ve tek bir UPDATE ile yazılıyor. Sebebi
 * dayanıklılık: cron iki kez tetiklenirse ya da gönderim ortasında süre
 * dolarsa, ikinci çalıştırma aynı kullanıcıya yeniden bildirim atmamalı.
 * Bir bildirimi kaçırmak, iki bildirim göndermekten iyidir.
 *
 * Sorgular kullanıcı başına değil toplu: hedefler, tekrar sayıları ve
 * abonelikler üçer sorguda geliyor. Kullanıcı başına sorgu, HTTP üzerinden
 * konuşan sürücüde her kullanıcı için ayrı bir gidiş-dönüş demekti ve turu
 * fonksiyonun süre sınırına götüren şey buydu.
 */
export async function runReminders() {
  if (!pushEnabled) return { targets: 0, sent: 0 };

  const targets = await findReminderTargets();
  if (!targets.length) return { targets: 0, sent: 0 };

  const userIds = targets.map((t) => t.userId);

  await db
    .update(profiles)
    .set({ lastReminderDay: sql`(now() at time zone ${profiles.timezone})::date` })
    .where(inArray(profiles.userId, userIds));

  const [due, subs] = await Promise.all([
    dueCounts(userIds),
    db.select().from(pushSubscriptions).where(inArray(pushSubscriptions.userId, userIds)),
  ]);

  const byUser = new Map<string, (typeof subs)[number][]>();
  for (const s of subs) {
    const list = byUser.get(s.userId);
    if (list) list.push(s);
    else byUser.set(s.userId, [s]);
  }

  const jobs: Promise<boolean>[] = [];
  for (const t of targets) {
    const list = byUser.get(t.userId);
    if (!list?.length) continue;
    const payload = composeReminder({
      name: t.displayName,
      streak: t.liveStreak,
      dueCount: due.get(t.userId) ?? 0,
      level: t.level,
    });
    if (!payload) continue;
    for (const sub of list) jobs.push(deliver(sub, payload));
  }

  const results = await Promise.all(jobs);
  return { targets: targets.length, sent: results.filter(Boolean).length };
}
