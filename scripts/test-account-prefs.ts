import "dotenv/config";
import { and, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { contentReports, events, moderationActions, profiles, socialNotifications, userReports } from "@/lib/db/schema";
import { track } from "@/lib/events";
import { ensureProfile, termsUpdateFor } from "@/lib/session";
import { closeReport, purgeClosedReports } from "@/lib/moderation-admin";
import { LEGAL_VERSION } from "@/lib/legal";

/**
 * Hukuk/içerik denetimi (2026-09-23) veritabanı testi: npm run test:account-prefs
 *
 *   LEG-9   analitik opt-out hesapta; ürün olayı yazılmıyor, işletimsel olay yazılıyor
 *   LEG-10  "günün ilk açılışı" sunucuda tekil (kullanıcı, gün, etiket)
 *   LEG-11  profil doğarken şart sürümü yazılıyor; eski profil şerit görüyor
 *   CNT-3   kayıttan gelen ad süzgeçten geçiyor, takılan ad yazılmıyor
 *   CNT-7   şikâyet kapanınca bildirene TEK gelen kutusu satırı
 *   LEG-17  kapanıştan 1 yıl geçen şikâyet siliniyor, açık ve yeni kapananlar kalıyor
 *
 * ÜRETİMDE KOŞMAZ: adres localhost/127.0.0.1 değilse baştan reddediyor.
 */
const url = process.env.TEST_DATABASE_URL ?? process.env.DATABASE_URL ?? "";
const host = url ? new URL(url).hostname : "";
if (host !== "localhost" && host !== "127.0.0.1") {
  console.error(`Yalnız yerel veritabanı: ${host || "(adres yok)"} reddedildi`);
  process.exit(2);
}

let fails = 0;
const check = (name: string, ok: boolean, detail = "") => {
  console.log(`  ${ok ? "✓" : "✗"} ${name}${ok || !detail ? "" : ` — ${detail}`}`);
  if (!ok) fails++;
};

const U = "test-prefs-user";
const R = "test-prefs-reporter";
const DAY = "2026-09-23";

async function count(userId: string, name: string): Promise<number> {
  const [r] = await db.select({ n: sql<number>`count(*)::int` }).from(events).where(and(eq(events.userId, userId), eq(events.name, name)));
  return Number(r?.n ?? 0);
}

async function cleanup() {
  for (const id of [U, R]) {
    await db.delete(events).where(eq(events.userId, id));
    await db.delete(profiles).where(eq(profiles.userId, id));
    await db.delete(socialNotifications).where(eq(socialNotifications.userId, id));
    await db.delete(contentReports).where(eq(contentReports.userId, id));
    await db.delete(userReports).where(eq(userReports.reporterId, id));
  }
}

async function main() {
  await cleanup();

  console.log("\nCNT-3 / LEG-11 — profil doğarken");
  const p = await ensureProfile(U, "orospu çocuğu");
  check("küfürlü ad yazılmıyor", p.displayName === null, String(p.displayName));
  check("şart sürümü yazıldı", p.termsVersion === LEGAL_VERSION && p.termsAcceptedAt instanceof Date);
  check("güncel profile şerit yok", termsUpdateFor(p) === null);
  const filled = await ensureProfile(U, "  Hürrem   Yılmaz ");
  check("temiz ad sonradan dolduruluyor (sadeleşmiş)", filled.displayName === "Hürrem Yılmaz", String(filled.displayName));
  check("eski (sürümsüz) profil şerit görüyor", termsUpdateFor({ termsVersion: null })?.version === LEGAL_VERSION);

  console.log("\nLEG-9 / LEG-10 — olaylar");
  await track(U, "app_open", DAY, 390, "desktop:browser");
  await track(U, "app_open", DAY, 390, "desktop:browser");
  await track(U, "app_open", DAY, 390, "android:native");
  check("app_open (gün, etiket) başına tek", (await count(U, "app_open")) === 2, String(await count(U, "app_open")));
  await track(U, "nav", DAY, 1);
  check("açıkken ürün olayı yazılıyor", (await count(U, "nav")) === 1);
  await db.update(profiles).set({ analyticsOptOut: true }).where(eq(profiles.userId, U));
  await track(U, "nav", DAY, 2);
  await track(U, "app_open", "2026-09-24", 390, "desktop:browser");
  check("kapalıyken ürün olayı yazılmıyor", (await count(U, "nav")) === 1);
  check("kapalıyken açılış da yazılmıyor", (await count(U, "app_open")) === 2);
  await track(U, "session_done", DAY, 10);
  await track(U, "mail_sent", DAY, 1, "verify:ok");
  check("kapalıyken işletimsel olay yazılıyor (session_done, mail_sent)", (await count(U, "session_done")) === 1 && (await count(U, "mail_sent")) === 1);
  await track("test-prefs-no-profile", "nav", DAY, 1);
  check("profilsiz kullanıcıda ürün olayı yazılıyor", (await count("test-prefs-no-profile", "nav")) === 1);
  await db.delete(events).where(eq(events.userId, "test-prefs-no-profile"));

  console.log("\nCNT-7 — şikâyet kapanınca bildirene haber");
  await ensureProfile(R, null);
  const [cr] = await db.insert(contentReports).values({ userId: R, kind: "chat", ref: "x:1", reason: "offensive", content: "t" }).returning({ id: contentReports.id });
  await closeReport("content_report", cr.id, "resolved", "admin@test", null);
  await closeReport("content_report", cr.id, "dismissed", "admin@test", null);
  const notes = await db.select().from(socialNotifications).where(and(eq(socialNotifications.userId, R), eq(socialNotifications.type, "report_closed")));
  check("tek bildirim (ikinci karar yeni satır açmıyor)", notes.length === 1, String(notes.length));
  check("bildirim şikâyeti gösteriyor", notes[0]?.refType === "content_report" && notes[0]?.refId === cr.id);
  const [ur] = await db.insert(userReports).values({ reporterId: R, reportedId: U, reason: "abuse" }).returning({ id: userReports.id });
  await closeReport("user_report", ur.id, "dismissed", "admin@test", null);
  const notes2 = await db.select().from(socialNotifications).where(and(eq(socialNotifications.userId, R), eq(socialNotifications.type, "report_closed")));
  check("kullanıcı şikâyeti de bildiriliyor", notes2.length === 2, String(notes2.length));

  console.log("\nLEG-17 — kapanıştan 1 yıl sonra silme");
  const [open] = await db.insert(contentReports).values({ userId: R, kind: "chat", ref: "x:2", reason: "other", createdAt: new Date("2024-01-01") }).returning({ id: contentReports.id });
  await db.update(moderationActions).set({ createdAt: new Date("2024-06-01") })
    .where(and(eq(moderationActions.target, "content_report"), eq(moderationActions.refId, cr.id)));
  await db.update(moderationActions).set({ createdAt: new Date(Date.now() - 30 * 86400_000) })
    .where(and(eq(moderationActions.target, "user_report"), eq(moderationActions.refId, ur.id)));
  const gone = await purgeClosedReports();
  const left = await db.select({ id: contentReports.id }).from(contentReports).where(eq(contentReports.userId, R));
  check("1 yıldan eski kapanan içerik şikâyeti silindi", !left.some((r) => r.id === cr.id) && gone.content >= 1);
  check("açık (eski) şikâyet kaldı", left.some((r) => r.id === open.id));
  const urLeft = await db.select({ id: userReports.id }).from(userReports).where(eq(userReports.id, ur.id));
  check("yeni kapanan kullanıcı şikâyeti kaldı", urLeft.length === 1);
  const act = await db.select().from(moderationActions).where(and(eq(moderationActions.target, "content_report"), eq(moderationActions.refId, cr.id)));
  check("silinen şikâyetin kararı da gitti", act.length === 0);
  await db.delete(moderationActions).where(and(eq(moderationActions.target, "user_report"), eq(moderationActions.refId, ur.id)));

  await cleanup();
  console.log(fails ? `\n${fails} BAŞARISIZ` : "\ntamam: hesap tercihleri, olay kapısı, şikâyet sonucu ve saklama tutuyor");
  process.exit(fails ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
