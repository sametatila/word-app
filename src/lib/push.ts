import "server-only";
import webpush from "web-push";
import { and, eq, inArray, lte, or, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { dailyStats, deviceTokens, leagueMembers, profiles, pushSubscriptions, userWords } from "@/lib/db/schema";
import { weekStart } from "@/lib/session";
import { shiftDay } from "@/lib/award";
import { track } from "@/lib/events";
import { deviceTokensFor, fcmEnabled, sendFcm, sendFcmRows } from "@/lib/fcm";
import { DEFAULT_NATIVE, formatNumber, isNativeLang, translate, type NativeLang } from "@/lib/i18n/dict";

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
/**
 * Yakalanabilir sayılan en büyük fark.
 *
 * Haftalık tabloda öndekini geçmek ancak ULAŞILABİLİR olduğunda motive
 * ediyor; 3.000 XP geride olan birine "seni geçti" demek bir hedef değil bir
 * hüküm. Eşik yaklaşık bir oturumluk emek: bugün kapatılabilecek bir fark.
 */
const CATCHABLE_XP = 400;

export function composeReminder(input: {
  name: string | null;
  streak: number;
  dueCount: number;
  level: string;
  /**
   * Bildirimin dili — ALICININ arayüz dili (`profiles.native_lang`).
   *
   * Metinler sabit Türkçe yazılıydı: arayüzü Almanca olan bir kullanıcı her
   * akşam Türkçe bir bildirim alıyordu. Sosyal bildirimlerde aynı düzeltme
   * `social/notify.ts`de yapılmıştı; hatırlatma turu atlanmıştı.
   */
  lang: NativeLang;
  /**
   * Haftalık tabloda hemen üstteki kişi ve aradaki fark. Yoksa null —
   * tek kişilik bir tabloda rakip yoktur.
   */
  rival?: { name: string; gap: number } | null;
  /**
   * Bugün kırılacak ortak seri ve karşı tarafın adı. Yoksa null.
   */
  coStreak?: { name: string } | null;
}): PushPayload | null {
  const { lang } = input;
  const first = input.name?.trim().split(/\s+/)[0];
  /*
    Adlı ve adsız cümleler AYRI anahtarlar. Önce tek cümlenin başına
    "{ad}, " ekleniyordu; ad yoksa cümle küçük harfle başlıyordu
    ("bugün henüz çalışmadın"). Bir dilde çalışan bu numara üç dilde hiç
    çalışmaz — Almancada ad ayrı bir hitap satırı ister.
  */
  const key = (base: string) => (first ? `${base}_named` : base);
  const vars = (extra: Record<string, string | number> = {}) => ({ name: first ?? "", ...extra });

  /*
    ORTAK SERİ EN ÜSTTE — kendi serisinin bile üstünde.

    Sebebi rakamın değil, karşı tarafın olması: kendi serisi kişinin kendine
    verdiği bir söz, ortak seri başka birine verdiği bir söz. İkisi de bugüne
    bağlı ve kaçırılırsa geri gelmiyor, ama ikincisi kaçırıldığında bir kişi
    daha kaybediyor. Zaten bu bildirimi alan kişi bugün çalışmamış olan taraf
    (hatırlatma turunun ön koşulu), yani mesaj kendi serisini de kapsıyor.

    Uzunluk yazılmıyor, İSİM yazılıyor. "Ali ile seriniz bugün kırılıyor"
    cümlesinde çalışan şey sayı değil, karşıda bekleyen kişi.
  */
  if (input.coStreak) {
    return {
      title: translate(lang, "push.rem_costreak_title", { who: input.coStreak.name }),
      body: translate(lang, key("push.rem_costreak_body"), vars({ who: input.coStreak.name })),
      url: "/friends",
      tag: "reminder",
    };
  }

  if (input.streak > 0) {
    const base = input.dueCount > 0 ? "push.rem_streak_due" : "push.rem_streak_idle";
    return {
      title: translate(lang, "push.rem_streak_title", { n: input.streak }),
      body: translate(lang, key(base), vars({ n: input.dueCount })),
      url: "/learn",
      tag: "reminder",
    };
  }

  // Rakip, borcun ÜSTÜNDE ama serinin ALTINDA.
  //
  // Seri bugüne bağlı ve kaçırılırsa geri gelmiyor; tabloda geride kalmak ise
  // hafta boyunca telafi edilebilir, o yüzden seriyi geçemez. Tekrar borcunun
  // üstünde olmasının sebebi ise farklı: borç her gün aynı cümleyi kuruyor ve
  // tekrarlanan bildirim en hızlı kapatılan bildirim. Rakip mesajı hem nadir
  // (yalnızca fark yakalanabilirken çıkıyor) hem de her seferinde başka bir
  // sayı taşıyor.
  if (input.rival && input.rival.gap > 0 && input.rival.gap <= CATCHABLE_XP) {
    return {
      title: translate(lang, "push.rem_rival_title", { who: input.rival.name }),
      body: translate(lang, key("push.rem_rival_body"), vars({ gap: formatNumber(input.rival.gap, lang) })),
      url: "/learn",
      tag: "reminder",
    };
  }

  if (input.dueCount > 0) {
    return {
      title: translate(lang, "push.rem_due_title", { n: input.dueCount }),
      body: translate(lang, key("push.rem_due_body"), vars()),
      url: "/learn",
      tag: "reminder",
    };
  }

  // Tekrar borcu da serisi de yok: bırakmış ya da hiç başlamamış biri.
  // Ona borç hatırlatmak anlamsız, davet etmek gerekiyor.
  return {
    title: translate(lang, "push.rem_idle_title"),
    body: translate(lang, key("push.rem_idle_body"), vars({ level: input.level })),
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
/**
 * Kullanıcının BÜTÜN kanallarına gönderir: tarayıcı abonelikleri (Web Push) ve
 * mobil cihaz jetonları (FCM). İkisi bağımsız — biri kapalıysa diğeri çalışır,
 * ikisi de açıksa aynı kişi hem tarayıcıda hem telefonda görebilir. Aynı
 * `tag` iki kanalda da toplama anahtarı olduğu için yığılma olmuyor.
 */
export async function sendToUser(userId: string, payload: PushPayload) {
  const [web, mobile] = await Promise.all([
    (async () => {
      if (!pushEnabled) return 0;
      const subs = await db.select().from(pushSubscriptions).where(eq(pushSubscriptions.userId, userId));
      if (!subs.length) return 0;
      const results = await Promise.all(subs.map((s) => deliver(s, payload)));
      return results.filter(Boolean).length;
    })(),
    sendFcm(userId, payload).catch((err) => {
      console.error("[push:fcm]", err);
      return 0;
    }),
  ]);
  return web + mobile;
}

export type ReminderTarget = {
  userId: string;
  displayName: string | null;
  level: string;
  /** Alıcının arayüz dili — bildirim bu dilde yazılıyor. */
  lang: string | null;
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
      // Bildirimin dili ALICIDAN geliyor; sunucunun ya da çerezin dili değil.
      lang: profiles.nativeLang,
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
        // İki kanaldan BİRİ yeterli: tarayıcı aboneliği ya da mobil cihaz jetonu.
        // Yalnız aboneliğe bakılıyordu; uygulamayı kullanan ama tarayıcıdan
        // abone olmamış herkes hatırlatma turunun tamamen dışında kalıyordu.
        sql`exists (select 1 from ${pushSubscriptions} s where s.user_id = ${profiles.userId})
            or exists (select 1 from ${deviceTokens} d where d.user_id = ${profiles.userId})`,
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
/**
 * Kullanıcının KENDİ LİGİNDE hemen üstünde kim var.
 *
 * Eskiden bütün kullanıcılar tek bir tabloya diziliyordu. Lig kurgusuyla o
 * mesaj yalan söyler hâle geldi: "Ali 140 XP önde" diyorsun ama Ali başka bir
 * ligde ve kullanıcı onu geçse bile kendi tablosunda hiçbir şey değişmiyor.
 * Rakip artık aynı grupta — geçilebilecek biri.
 *
 * Tek sorgu: ilgili kullanıcıların grupları ve o gruplardaki herkesin bu
 * haftaki XP'si bir kez okunuyor, sıralama bellekte yapılıyor. Kullanıcı
 * başına sorgu, hatırlatma turunu kullanıcı sayısıyla orantılı yavaşlatırdı.
 *
 * Bu hafta hiç puanı olmayanın da rakibi var: grubun en altındaki kişi.
 * Fark büyük çıkarsa çağıran taraf zaten mesajı atmıyor.
 */
/**
 * Bugün kırılacak ortak seriler — kullanıcı başına bir arkadaş adı.
 *
 * TEK SORGU. Hatırlatma turunun bir süre bütçesi var (bkz. yukarıdaki not) ve
 * ortak serinin GERÇEK uzunluğunu hesaplamak, çiftlerin bir yıllık günlerini
 * bellekte yürümek demekti — yüzlerce hedef için bunun bedeli tur boyunca
 * ödenirdi. Bildirim zaten uzunluğu yazmıyor, o yüzden gereken tek şey
 * zincirin CANLI olduğunu bilmek: iki gün üst üste ikisinin de çalışmış
 * olması. Bir günlük bir zincir bildirime değmez, iki günlük değer.
 *
 * "Bugün kırılıyor" koşulunun ikinci yarısı çağıran tarafta zaten sağlanmış:
 * hatırlatma yalnız o gün ÇALIŞMAMIŞ kullanıcılara gidiyor.
 */
export async function coStreaksAtRisk(userIds: string[], today: string): Promise<Map<string, { name: string }>> {
  const out = new Map<string, { name: string }>();
  if (!userIds.length) return out;
  const y1 = shiftDay(today, -1);
  const y2 = shiftDay(today, -2);
  const rows = await db.execute(sql`
    with live as (
      select f.requester_id as a, f.addressee_id as b
        from friendships f
       where f.status = 'accepted'
         and (f.requester_id = any(${userIds}::text[]) or f.addressee_id = any(${userIds}::text[]))
         and exists (select 1 from daily_stats d where d.user_id = f.requester_id and d.day = ${y1} and d.xp > 0)
         and exists (select 1 from daily_stats d where d.user_id = f.addressee_id and d.day = ${y1} and d.xp > 0)
         and exists (select 1 from daily_stats d where d.user_id = f.requester_id and d.day = ${y2} and d.xp > 0)
         and exists (select 1 from daily_stats d where d.user_id = f.addressee_id and d.day = ${y2} and d.xp > 0)
    )
    select a as self, b as friend from live
    union all
    select b as self, a as friend from live
  `);
  const pairs = (rows as unknown as { rows: { self: string; friend: string }[] }).rows ?? [];
  const wanted = new Set(userIds);
  const friendIds = [...new Set(pairs.filter((p) => wanted.has(p.self)).map((p) => p.friend))];
  if (!friendIds.length) return out;
  const names = await db
    .select({ userId: profiles.userId, name: profiles.displayName })
    .from(profiles)
    .where(inArray(profiles.userId, friendIds));
  // Adı olmayan arkadaş atlanıyor: bu bildirimin çalışan yanı isim, isimsizi
  // göndermek "biri seni bekliyor" demekten öteye geçmez.
  const nameOf = new Map<string, string>();
  for (const n of names) {
    const first = n.name?.trim().split(/\s+/)[0];
    if (first) nameOf.set(n.userId, first);
  }
  for (const p of pairs) {
    // Birden çok ortak seri varsa ilki yeter: bildirim tek kişi anıyor.
    if (!wanted.has(p.self) || out.has(p.self)) continue;
    const name = nameOf.get(p.friend);
    if (name) out.set(p.self, { name });
  }
  return out;
}

export async function weeklyRivals(
  userIds: string[],
  today: string,
): Promise<Map<string, { name: string; gap: number }>> {
  const out = new Map<string, { name: string; gap: number }>();
  if (!userIds.length) return out;

  const start = weekStart(today);
  const end = shiftDay(start, 7);

  // Hedef kullanıcıların bu haftaki grupları; sonra o grupların TÜM üyeleri.
  const mineGroups = await db
    .select({ userId: leagueMembers.userId, tier: leagueMembers.tier, cohort: leagueMembers.cohort })
    .from(leagueMembers)
    .where(and(eq(leagueMembers.weekStart, start), inArray(leagueMembers.userId, userIds)));
  if (!mineGroups.length) return out;
  // Tekil (lig, grup) çiftleri — aynı gruptaki iki hedef kullanıcı tabloyu iki kez okutmasın.
  const pairs = [...new Map(mineGroups.map((g) => [`${g.tier}:${g.cohort}`, g])).values()];

  const members = await db
    .select({
      userId: leagueMembers.userId,
      tier: leagueMembers.tier,
      cohort: leagueMembers.cohort,
      name: profiles.displayName,
      xp: sql<number>`coalesce((
        select sum(${dailyStats.xp})::int from ${dailyStats}
         where ${dailyStats.userId} = ${leagueMembers.userId}
           and ${dailyStats.day} >= ${start} and ${dailyStats.day} < ${end}
      ), 0)`,
    })
    .from(leagueMembers)
    .innerJoin(profiles, eq(profiles.userId, leagueMembers.userId))
    .where(
      and(
        eq(leagueMembers.weekStart, start),
        or(...pairs.map((g) => and(eq(leagueMembers.tier, g.tier), eq(leagueMembers.cohort, g.cohort)))),
      ),
    );

  // Grup başına sıralı tablo — bellekte, tek geçişte.
  const boards = new Map<string, { userId: string; name: string; xp: number }[]>();
  for (const m of members) {
    const key = `${m.tier}:${m.cohort}`;
    const list = boards.get(key) ?? [];
    list.push({ userId: m.userId, name: m.name?.trim().split(/\s+/)[0] || "Bir öğrenci", xp: Number(m.xp) });
    boards.set(key, list);
  }
  for (const list of boards.values()) list.sort((a, b) => b.xp - a.xp);

  for (const g of mineGroups) {
    const board = boards.get(`${g.tier}:${g.cohort}`);
    if (!board || board.length < 2) continue; // tek kişilik grupta rakip yok
    const i = board.findIndex((b) => b.userId === g.userId);
    if (i < 0) continue;
    if (i === 0) continue; // zirvedeyse geçilecek kimse yok
    const above = board[i - 1];
    out.set(g.userId, { name: above.name, gap: Math.max(0, above.xp - board[i].xp) });
  }
  return out;
}

export async function runReminders() {
  if (!pushEnabled && !fcmEnabled) return { targets: 0, sent: 0 };

  const targets = await findReminderTargets();
  if (!targets.length) return { targets: 0, sent: 0 };

  const userIds = targets.map((t) => t.userId);

  await db
    .update(profiles)
    .set({ lastReminderDay: sql`(now() at time zone ${profiles.timezone})::date` })
    .where(inArray(profiles.userId, userIds));

  const today = new Date().toISOString().slice(0, 10);
  const [due, subs, rivals, coStreaks, devices] = await Promise.all([
    dueCounts(userIds),
    db.select().from(pushSubscriptions).where(inArray(pushSubscriptions.userId, userIds)),
    weeklyRivals(userIds, today),
    coStreaksAtRisk(userIds, today),
    deviceTokensFor(userIds),
  ]);

  const byUser = new Map<string, (typeof subs)[number][]>();
  for (const s of subs) {
    const list = byUser.get(s.userId);
    if (list) list.push(s);
    else byUser.set(s.userId, [s]);
  }

  const jobs: Promise<number>[] = [];
  const logs: Promise<void>[] = [];
  for (const t of targets) {
    const list = byUser.get(t.userId);
    const tokens = devices.get(t.userId);
    if (!list?.length && !tokens?.length) continue;
    const payload = composeReminder({
      name: t.displayName,
      streak: t.liveStreak,
      dueCount: due.get(t.userId) ?? 0,
      level: t.level,
      lang: isNativeLang(t.lang ?? "") ? (t.lang as NativeLang) : DEFAULT_NATIVE,
      rival: rivals.get(t.userId) ?? null,
      coStreak: coStreaks.get(t.userId) ?? null,
    });
    if (!payload) continue;
    for (const sub of list ?? []) jobs.push(deliver(sub, payload).then((ok) => (ok ? 1 : 0)));
    if (tokens?.length) jobs.push(sendFcmRows(tokens, payload));
    // Gönderim ucu: push_open ile birlikte bildirim hunisi (WP-80). Sayıma
    // girmiyor — `sent` yalnız teslimatı sayar.
    logs.push(track(t.userId, "push_sent", today, 0, "reminder"));
  }

  const results = await Promise.all(jobs);
  await Promise.all(logs);
  return { targets: targets.length, sent: results.reduce((a, b) => a + b, 0) };
}

/**
 * SERİ KORUMA — akşam turu (mobil `NotificationsScreen`in ikinci anahtarı).
 *
 * Günlük hatırlatmadan farkı hedef kitlesi: burada YALNIZCA serisi bugün
 * kaybedilecek olanlar var. "Bugün çalışmadın" demek herkese söylenebilir,
 * "dokuz günlük serin bu gece bitiyor" ise yalnızca dokuz günü olana.
 *
 * GÜNLÜK BÜTÇEYİ PAYLAŞIYOR (`last_reminder_day`). Akşam turu ayrı bir sayaç
 * tutsaydı, öğlen hatırlatma alan biri akşam bir tane daha alırdı — ve bu
 * dosyanın en başındaki kural tek: günde en fazla bir bildirim. Öğleden sonra
 * hatırlatma almamış olan seri sahibi akşam bunu alıyor; almış olan almıyor.
 */
export async function runStreakAlerts(limit = 500) {
  if (!pushEnabled && !fcmEnabled) return { targets: 0, sent: 0 };

  const localDay = sql`(now() at time zone ${profiles.timezone})::date`;
  const localHour = sql`extract(hour from (now() at time zone ${profiles.timezone}))`;

  const targets = await db
    .select({
      userId: profiles.userId,
      displayName: profiles.displayName,
      level: profiles.level,
      lang: profiles.nativeLang,
      liveStreak: profiles.currentStreak,
    })
    .from(profiles)
    .where(
      and(
        eq(profiles.streakAlert, true),
        // Akşam: mobilde 20:30, burada kullanıcının kendi saatiyle 20'den sonra.
        sql`${localHour} >= 20`,
        sql`${profiles.currentStreak} > 0`,
        // Seri ancak DÜN çalışılmışsa bugün kaybedilebilir.
        sql`${profiles.lastActiveDay} = ${localDay} - 1`,
        sql`(${profiles.lastReminderDay} is null or ${profiles.lastReminderDay} < ${localDay})`,
        // İki kanaldan BİRİ yeterli: tarayıcı aboneliği ya da mobil cihaz jetonu.
        // Yalnız aboneliğe bakılıyordu; uygulamayı kullanan ama tarayıcıdan
        // abone olmamış herkes hatırlatma turunun tamamen dışında kalıyordu.
        sql`exists (select 1 from ${pushSubscriptions} s where s.user_id = ${profiles.userId})
            or exists (select 1 from ${deviceTokens} d where d.user_id = ${profiles.userId})`,
      ),
    )
    .limit(limit);

  return deliverRound(targets, "streak");
}

/**
 * HAFTALIK SINAV ÇAĞRISI — mobildeki üçüncü anahtar.
 *
 * Haftada bir, pazar akşamı. Günlük bütçeyi o da paylaşıyor: haftanın bir
 * gününde iki bildirim göndermek, kapatılan izinlerin en ucuz sebebi.
 */
export async function runWeeklyReminders(limit = 500) {
  if (!pushEnabled && !fcmEnabled) return { targets: 0, sent: 0 };

  const localDay = sql`(now() at time zone ${profiles.timezone})::date`;
  const localHour = sql`extract(hour from (now() at time zone ${profiles.timezone}))`;

  const targets = await db
    .select({
      userId: profiles.userId,
      displayName: profiles.displayName,
      level: profiles.level,
      lang: profiles.nativeLang,
      liveStreak: profiles.currentStreak,
    })
    .from(profiles)
    .where(
      and(
        eq(profiles.weeklyReminder, true),
        sql`extract(dow from ${localDay}) = 0`, // pazar
        sql`${localHour} >= 18`,
        sql`(${profiles.lastReminderDay} is null or ${profiles.lastReminderDay} < ${localDay})`,
        // İki kanaldan BİRİ yeterli: tarayıcı aboneliği ya da mobil cihaz jetonu.
        // Yalnız aboneliğe bakılıyordu; uygulamayı kullanan ama tarayıcıdan
        // abone olmamış herkes hatırlatma turunun tamamen dışında kalıyordu.
        sql`exists (select 1 from ${pushSubscriptions} s where s.user_id = ${profiles.userId})
            or exists (select 1 from ${deviceTokens} d where d.user_id = ${profiles.userId})`,
      ),
    )
    .limit(limit);

  return deliverRound(targets, "weekly");
}

/** İki akşam turunun ortak gövdesi: bütçeyi işaretle, abonelere gönder, say. */
async function deliverRound(
  targets: { userId: string; displayName: string | null; level: string; lang: string | null; liveStreak: number }[],
  kind: "streak" | "weekly",
) {
  if (!targets.length) return { targets: 0, sent: 0 };
  const userIds = targets.map((t) => t.userId);

  await db
    .update(profiles)
    .set({ lastReminderDay: sql`(now() at time zone ${profiles.timezone})::date` })
    .where(inArray(profiles.userId, userIds));

  const today = new Date().toISOString().slice(0, 10);
  const [subs, devices] = await Promise.all([
    db.select().from(pushSubscriptions).where(inArray(pushSubscriptions.userId, userIds)),
    deviceTokensFor(userIds),
  ]);
  const byUser = new Map<string, (typeof subs)[number][]>();
  for (const s of subs) {
    const list = byUser.get(s.userId);
    if (list) list.push(s);
    else byUser.set(s.userId, [s]);
  }

  const jobs: Promise<number>[] = [];
  const logs: Promise<void>[] = [];
  for (const t of targets) {
    const list = byUser.get(t.userId);
    const tokens = devices.get(t.userId);
    if (!list?.length && !tokens?.length) continue;
    const lang = isNativeLang(t.lang ?? "") ? (t.lang as NativeLang) : DEFAULT_NATIVE;
    const first = t.displayName?.trim().split(/\s+/)[0];
    const named = (base: string) => (first ? `${base}_named` : base);
    const payload: PushPayload =
      kind === "streak"
        ? {
            title: translate(lang, "push.rem_streak_title", { n: t.liveStreak }),
            body: translate(lang, named("push.rem_streak_idle"), { name: first ?? "" }),
            url: "/learn",
            tag: "reminder",
          }
        : {
            title: translate(lang, "push.rem_weekly_title"),
            body: translate(lang, named("push.rem_weekly_body"), { name: first ?? "", level: t.level }),
            url: "/learn/weekly",
            tag: "reminder",
          };
    for (const sub of list ?? []) jobs.push(deliver(sub, payload).then((ok) => (ok ? 1 : 0)));
    if (tokens?.length) jobs.push(sendFcmRows(tokens, payload));
    logs.push(track(t.userId, "push_sent", today, 0, kind));
  }

  const results = await Promise.all(jobs);
  await Promise.all(logs);
  return { targets: targets.length, sent: results.reduce((a, b) => a + b, 0) };
}
