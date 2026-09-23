/**
 * Grup kodu (2 ay ücretsiz MAĞAZA denemesi) — VERİTABANI testi: `npm run test:store-trial`.
 *
 * NEDEN VERİTABANINDA: bu modülün kusur sınıfı `test:entitlement`inkiyle aynı —
 * koşullu sayaç, benzersiz indeks, tekrar teslimat. Tek süreçte hiçbiri görünmüyor.
 *
 * Sınananlar:
 *   - talep: Android yolu, iOS'un REDDİ (App Store 3.1.1, `ios_web_only`),
 *     misafir, yanlış tür, kapalı/süresi dolmuş/tükenmiş kod, süren abonelik,
 *     yarıda kalan talebin hak harcamadan yenilenmesi, hesap başına tek deneme
 *   - yarış: son hakkı aynı anda isteyen iki kişiden yalnız biri alıyor
 *   - bonus kutusu grup kodunu `store_trial` sebebiyle geri çeviriyor
 *   - ön bakış (peek) hiçbir şey harcamıyor ve bonus kodunu ele vermiyor
 *   - iOS web yönlendirmesi tıklamayı ANONİM sayıyor, env boşken "yakında"
 *   - webhook hunisi: deneme başladı / ücretliye döndü / iptal (geri alma) / bitti,
 *     30 günlük sıradan deneme gruba YAZILMIYOR
 *   - adaptör: deneme durumu `trial` (IAP-10), başka yetkinin olayı elenir
 *     (IAP-13), sandbox işaretli kabul (IAP-1) ve REVENUECAT_ALLOW_SANDBOX=0
 *
 * KURULUM: `scripts/test-entitlement.ts` başındaki not (aynı TEST_DATABASE_URL).
 * ÜRETİM VERİTABANINDA KOŞTURULMAZ: adres yerel değilse baştan reddediyor.
 */
import "dotenv/config";
import { eq, inArray } from "drizzle-orm";
// `@/lib/db` — göreli yol DEĞİL (bkz. test-entitlement): test ikizine yönlenmeli.
import { db } from "@/lib/db";
import { entitlements, premiumGrants, promoCodes, storeTrialClaims, storeTrialClicks, user } from "../src/lib/db/schema";
import { applyStoreEvent } from "../src/lib/premium/entitlement";
import { createCodes, redeemCode } from "../src/lib/premium/promo";
import {
  claimStoreTrial,
  createStoreTrialCodes,
  iosRedirect,
  listStoreTrialCodes,
  peekStoreTrialCode,
  recordStoreTrialEvent,
} from "../src/lib/premium/store-trial";
import { revenuecat } from "../src/lib/premium/providers/revenuecat";
import type { StoreEvent } from "../src/lib/premium/ports";

const url = process.env.TEST_DATABASE_URL ?? "";
if (!/@(localhost|127\.0\.0\.1)[:/]/.test(url)) {
  console.error(url ? "Bu test YALNIZ yerel bir veritabanında koşar." : "TEST_DATABASE_URL tanımlı değil (bkz. scripts/test-entitlement.ts).");
  process.exit(2);
}

let failures = 0;
let total = 0;
function check(name: string, cond: boolean, detail: unknown = "") {
  total++;
  if (cond) console.log(`  ✓ ${name}`);
  else {
    failures++;
    console.log(`  ✗ ${name} ${detail === "" ? "" : `→ ${typeof detail === "string" ? detail : JSON.stringify(detail)}`}`);
  }
}

const tag = Math.random().toString(36).slice(2, 8);
const users: string[] = [];
const codeIds: number[] = [];

async function mkUser(name: string, anon = false): Promise<string> {
  const id = `test-st-${name}-${tag}`;
  await db.insert(user).values({ id, name, email: `${id}@test.invalid`, isAnonymous: anon });
  users.push(id);
  return id;
}

async function mkCode(group: string, maxUses = 50, extra: Partial<typeof promoCodes.$inferInsert> = {}): Promise<string> {
  const [made] = await createStoreTrialCodes({ campaign: `test-${tag}`, groups: [group], prefix: "T", maxUses });
  const [row] = await db.select({ id: promoCodes.id }).from(promoCodes).where(eq(promoCodes.code, made.code));
  codeIds.push(row.id);
  if (Object.keys(extra).length) await db.update(promoCodes).set(extra).where(eq(promoCodes.id, row.id));
  return made.code;
}

const DAY = 86_400_000;
const ev = (userId: string, over: Omit<Partial<StoreEvent>, "ledger"> & { ledger?: Partial<NonNullable<StoreEvent["ledger"]>> }): StoreEvent => {
  const { ledger, ...rest } = over;
  return {
    provider: "revenuecat",
    eventId: `st-${Math.random().toString(36).slice(2)}`,
    userId,
    state: "trial",
    expiresAt: new Date(Date.now() + 60 * DAY),
    platform: "android",
    productId: "lernomi_premium_monthly",
    ref: `sub-${userId}`,
    paid: false,
    ...rest,
    ledger: {
      type: "purchase",
      period: "trial",
      environment: "production",
      priceUsd: 0,
      currency: "TRY",
      priceLocal: 0,
      eventAt: new Date(),
      trialConversion: false,
      ...ledger,
    },
  };
};

async function claimRow(userId: string) {
  const rows = await db.select().from(storeTrialClaims).where(eq(storeTrialClaims.userId, userId));
  return rows[0];
}

async function main() {
  const prevMonthly = process.env.IOS_PROMO2M_CODE_MONTHLY;
  const prevYearly = process.env.IOS_PROMO2M_CODE_YEARLY;

  console.log("\nTalep (Android) ve reddedilen yollar");
  {
    const a = await mkUser("a");
    const code = await mkCode("WA Almanca A1");
    const r = await claimStoreTrial(a, code.toLowerCase(), "android", "yearly");
    check("Android talebi teklif etiketini döndürüyor", r.ok && r.offerTag === "promo2m" && r.plan === "yearly", r);
    const [c] = await db.select({ uses: promoCodes.uses }).from(promoCodes).where(eq(promoCodes.code, code));
    check("hak bir kez sayıldı", c.uses === 1, c.uses);

    const again = await claimStoreTrial(a, code, "android", "monthly");
    const [c2] = await db.select({ uses: promoCodes.uses }).from(promoCodes).where(eq(promoCodes.code, code));
    check("yarıda kalan talep yenilenebiliyor, hak ikinci kez sayılmıyor", again.ok && c2.uses === 1, { again, uses: c2.uses });
    check("yenilenen talep son planı tutuyor", (await claimRow(a))?.plan === "monthly");

    const ios = await claimStoreTrial(a, code, "ios", "monthly");
    check("iOS talebi reddediliyor (3.1.1: iOS yalnız web)", !ios.ok && ios.reason === "ios_web_only", ios);

    const g = await mkUser("guest", true);
    const gr = await claimStoreTrial(g, code, "android", "monthly");
    check("misafir hesap istiyor", !gr.ok && gr.reason === "account_required", gr);

    const [bonus] = await createCodes({ days: 30, campaign: `test-${tag}` });
    const [b] = await db.select({ id: promoCodes.id }).from(promoCodes).where(eq(promoCodes.code, bonus));
    codeIds.push(b.id);
    const wk = await claimStoreTrial(a, bonus, "android", "monthly");
    check("bonus kodu grup kutusunda: wrong_kind", !wk.ok && wk.reason === "wrong_kind", wk);
    const rb = await redeemCode(a, code);
    check("grup kodu bonus kutusunda: store_trial", !rb.ok && rb.reason === "store_trial", rb);

    const nf = await claimStoreTrial(a, "YOKBOYLE1", "android", "monthly");
    check("olmayan kod: not_found", !nf.ok && nf.reason === "not_found", nf);

    const off = await mkCode("kapalı", 50, { disabledAt: new Date() });
    const offR = await claimStoreTrial(a, off, "android", "monthly");
    check("kapalı kod: disabled", !offR.ok && offR.reason === "disabled", offR);
    const old = await mkCode("eski", 50, { expiresAt: new Date(Date.now() - DAY) });
    const oldR = await claimStoreTrial(a, old, "android", "monthly");
    check("süresi dolmuş kod: expired", !oldR.ok && oldR.reason === "expired", oldR);

    const s = await mkUser("sub");
    await applyStoreEvent({ ...ev(s, {}), state: "active", paid: true });
    const sr = await claimStoreTrial(s, code, "android", "monthly");
    check("süren abonelik: already_subscribed", !sr.ok && sr.reason === "already_subscribed", sr);
  }

  console.log("\nYarış: son hak");
  {
    const code = await mkCode("tek hak", 1);
    const [x, y] = [await mkUser("x"), await mkUser("y")];
    const res = await Promise.all([claimStoreTrial(x, code, "android", "monthly"), claimStoreTrial(y, code, "android", "monthly")]);
    const okCount = res.filter((r) => r.ok).length;
    check("aynı anda iki talepten yalnız biri geçti", okCount === 1, res);
    check("kaybeden used_up aldı", res.some((r) => !r.ok && r.reason === "used_up"), res);
    const [c] = await db.select({ uses: promoCodes.uses }).from(promoCodes).where(eq(promoCodes.code, code));
    check("sayaç tavanı aşmadı", c.uses === 1, c.uses);
  }

  console.log("\nÖn bakış (peek)");
  {
    const code = await mkCode("Telegram İstanbul");
    const p = await peekStoreTrialCode(code.toLowerCase());
    check("geçerli kod: grup adı dönüyor", p.status === "valid" && p.group === "Telegram İstanbul", p);
    const [c] = await db.select({ uses: promoCodes.uses }).from(promoCodes).where(eq(promoCodes.code, code));
    check("ön bakış hak harcamıyor", c.uses === 0, c.uses);
    const [bonus] = await createCodes({ days: 7, campaign: `test-${tag}` });
    const [b] = await db.select({ id: promoCodes.id }).from(promoCodes).where(eq(promoCodes.code, bonus));
    codeIds.push(b.id);
    check("bonus kodu dışarıya 'bulunamadı' görünüyor", (await peekStoreTrialCode(bonus)).status === "not_found");
    const full = await mkCode("dolu", 1, { uses: 1 });
    check("tükenmiş kod: used_up", (await peekStoreTrialCode(full)).status === "used_up");
  }

  console.log("\niOS web yönlendirmesi");
  {
    const code = await mkCode("iPhone grubu");
    delete process.env.IOS_PROMO2M_CODE_MONTHLY;
    delete process.env.IOS_PROMO2M_CODE_YEARLY;
    const soon = await iosRedirect(code, "monthly");
    check("env boşken yönlendirme yok (yakında)", "error" in soon && soon.error === "not_ready", soon);
    process.env.IOS_PROMO2M_CODE_MONTHLY = "LERNOMI2M";
    process.env.IOS_PROMO2M_CODE_YEARLY = "LERNOMI2Y";
    const go = await iosRedirect(code, "yearly");
    check(
      "Apple'ın bozdurma adresine yönleniyor",
      "url" in go && go.url === "https://apps.apple.com/redeem?ctx=offercodes&id=6810593275&code=LERNOMI2Y",
      go,
    );
    await iosRedirect(code, "monthly");
    await iosRedirect(code, "monthly", false); // hız sınırı aşıldı: yönlenir ama sayılmaz
    const bad = await iosRedirect("YOKBOYLE1", "monthly");
    check("geçersiz kod yönlendirilmiyor", "error" in bad && bad.error === "invalid", bad);
    const row = (await listStoreTrialCodes()).find((r) => r.code === code);
    check("tıklamalar plan başına sayıldı (sınır aşımı hariç)", row?.iosMonthly === 1 && row?.iosYearly === 1, row);
  }

  console.log("\nWebhook hunisi");
  {
    const code = await mkCode("huni");
    const u = await mkUser("funnel");
    await claimStoreTrial(u, code, "android", "monthly");
    await recordStoreTrialEvent(ev(u, {}));
    const started = await claimRow(u);
    check("2 aylık deneme başlangıcı damgalandı", !!started?.startedAt && started.storeRef === `sub-${u}` && started.environment === "production", started);

    const again = await claimStoreTrial(u, code, "android", "monthly");
    check("başlamış denemenin koduyla tekrar talep: already", !again.ok && again.reason === "already", again);
    const other = await mkCode("başka grup");
    const second = await claimStoreTrial(u, other, "android", "monthly");
    check("hesap başına tek grup denemesi: trial_used", !second.ok && second.reason === "trial_used", second);

    await recordStoreTrialEvent(ev(u, { state: "canceled", ledger: { type: "cancellation", period: "trial" } }));
    check("iptal damgalandı", !!(await claimRow(u))?.cancelledAt);
    await recordStoreTrialEvent(ev(u, { state: "trial", ledger: { type: "uncancellation", period: "trial" } }));
    check("iptal geri alınınca boşaldı", (await claimRow(u))?.cancelledAt === null);
    await recordStoreTrialEvent(ev(u, { state: "active", paid: true, ledger: { type: "renewal", period: "normal", trialConversion: true } }));
    const conv = await claimRow(u);
    check("ücretliye dönüş damgalandı", !!conv?.convertedAt, conv);
    const firstConv = conv?.convertedAt?.getTime();
    await recordStoreTrialEvent(ev(u, { state: "active", paid: true, ledger: { type: "renewal", period: "normal", eventAt: new Date(Date.now() + 30 * DAY) } }));
    check("sonraki yenileme dönüş anını ezmiyor", (await claimRow(u))?.convertedAt?.getTime() === firstConv);
    await recordStoreTrialEvent(ev(u, { ref: "baska-abonelik", state: "expired", ledger: { type: "expiration", period: "normal" } }));
    check("başka aboneliğin bitişi bu denemeye yazılmıyor", (await claimRow(u))?.expiredAt === null);
    await recordStoreTrialEvent(ev(u, { state: "expired", ledger: { type: "expiration", period: "normal" } }));
    check("bitiş damgalandı", !!(await claimRow(u))?.expiredAt);

    const v = await mkUser("public-trial");
    await claimStoreTrial(v, code, "android", "monthly");
    await recordStoreTrialEvent(ev(v, { expiresAt: new Date(Date.now() + 30 * DAY) }));
    check("30 günlük herkese açık deneme gruba YAZILMIYOR", !(await claimRow(v))?.startedAt);

    const w = await mkUser("sandbox");
    await claimStoreTrial(w, code, "android", "yearly");
    await recordStoreTrialEvent(ev(w, { sandbox: true, expiresAt: new Date(Date.now() + 5 * 60_000), ledger: { environment: "sandbox" } }));
    const sb = await claimRow(w);
    check("sandbox denemesi (sıkıştırılmış süre) işaretli başlıyor", !!sb?.startedAt && sb.environment === "sandbox", sb);
    const row = (await listStoreTrialCodes()).find((r) => r.code === code);
    check("panel: sandbox üretim sayısına girmiyor", row?.started === 1 && row?.sandbox === 1 && row?.converted === 1 && row?.claims === 3, row);
  }

  console.log("\nAdaptör (RevenueCat)");
  {
    const prevSecret = process.env.REVENUECAT_WEBHOOK_AUTH;
    const prevSandbox = process.env.REVENUECAT_ALLOW_SANDBOX;
    process.env.REVENUECAT_WEBHOOK_AUTH = "test-sir";
    delete process.env.REVENUECAT_ALLOW_SANDBOX;
    const parse = async (event: Record<string, unknown>) => {
      const body = JSON.stringify({ event });
      return revenuecat.parse(new Request("http://test.invalid/rc", { method: "POST", headers: { authorization: "test-sir" }, body }), body);
    };
    const base = { id: `rc-${tag}`, app_user_id: "u1", product_id: "lernomi_premium_monthly", store: "PLAY_STORE", expiration_at_ms: Date.now() + 60 * DAY, entitlement_ids: ["lernomi_premium"] };

    const trial = await parse({ ...base, type: "INITIAL_PURCHASE", period_type: "TRIAL", environment: "PRODUCTION" });
    check("deneme başlangıcı 'trial' durumunda (IAP-10)", trial.ok && "event" in trial && trial.event.state === "trial" && !trial.event.paid, trial);
    const normal = await parse({ ...base, type: "RENEWAL", period_type: "NORMAL", environment: "PRODUCTION" });
    check("ücretli yenileme 'active'", normal.ok && "event" in normal && normal.event.state === "active" && normal.event.paid, normal);
    const cancel = await parse({ ...base, type: "CANCELLATION", period_type: "TRIAL", environment: "PRODUCTION" });
    check("denemede iptal 'canceled' kalıyor", cancel.ok && "event" in cancel && cancel.event.state === "canceled", cancel);

    const other = await parse({ ...base, type: "INITIAL_PURCHASE", period_type: "NORMAL", environment: "PRODUCTION", entitlement_ids: ["baska_yetki"] });
    check("başka yetkinin olayı elenir (IAP-13)", !other.ok && other.reason === "other_entitlement", other);
    const noIds = await parse({ ...base, type: "RENEWAL", period_type: "NORMAL", environment: "PRODUCTION", entitlement_ids: undefined });
    check("yetki listesi olmayan olay elenmiyor", noIds.ok, noIds);

    const sb = await parse({ ...base, type: "INITIAL_PURCHASE", period_type: "TRIAL", environment: "SANDBOX" });
    check("sandbox varsayılan olarak işaretli kabul (IAP-1)", sb.ok && "event" in sb && sb.event.sandbox === true && sb.event.ledger?.environment === "sandbox", sb);
    process.env.REVENUECAT_ALLOW_SANDBOX = "0";
    const sbOff = await parse({ ...base, type: "INITIAL_PURCHASE", period_type: "TRIAL", environment: "SANDBOX" });
    check("REVENUECAT_ALLOW_SANDBOX=0 sandbox'ı yok sayıyor", !sbOff.ok && sbOff.reason === "sandbox_ignored", sbOff);

    // Sandbox yetkisi entitlements satırına işaretli yazılıyor.
    const z = await mkUser("sandbox-ent");
    await applyStoreEvent({ ...ev(z, {}), sandbox: true });
    const [ent] = await db.select({ env: entitlements.storeEnvironment, state: entitlements.storeState }).from(entitlements).where(eq(entitlements.userId, z));
    check("sandbox yetkisi işaretli yazıldı", ent?.env === "sandbox" && ent.state === "trial", ent);

    if (prevSecret === undefined) delete process.env.REVENUECAT_WEBHOOK_AUTH;
    else process.env.REVENUECAT_WEBHOOK_AUTH = prevSecret;
    if (prevSandbox === undefined) delete process.env.REVENUECAT_ALLOW_SANDBOX;
    else process.env.REVENUECAT_ALLOW_SANDBOX = prevSandbox;
  }

  if (prevMonthly === undefined) delete process.env.IOS_PROMO2M_CODE_MONTHLY;
  else process.env.IOS_PROMO2M_CODE_MONTHLY = prevMonthly;
  if (prevYearly === undefined) delete process.env.IOS_PROMO2M_CODE_YEARLY;
  else process.env.IOS_PROMO2M_CODE_YEARLY = prevYearly;
}

async function cleanup() {
  if (codeIds.length) {
    await db.delete(storeTrialClicks).where(inArray(storeTrialClicks.codeId, codeIds));
    await db.delete(storeTrialClaims).where(inArray(storeTrialClaims.codeId, codeIds));
    await db.delete(promoCodes).where(inArray(promoCodes.id, codeIds));
  }
  if (users.length) {
    await db.delete(storeTrialClaims).where(inArray(storeTrialClaims.userId, users));
    await db.delete(premiumGrants).where(inArray(premiumGrants.userId, users));
    await db.delete(entitlements).where(inArray(entitlements.userId, users));
    await db.delete(user).where(inArray(user.id, users));
  }
}

main()
  .then(async () => {
    await cleanup();
    console.log(failures === 0 ? `\ntamam: ${total}/${total}` : `\nKALDI: ${failures}/${total}`);
    process.exit(failures === 0 ? 0 : 1);
  })
  .catch(async (e) => {
    console.error(e);
    await cleanup().catch(() => {});
    process.exit(1);
  });
