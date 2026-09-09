/**
 * Premium yetkisinin VERİTABANI testi — `npm run test:entitlement`.
 *
 * `test:premium`ten farkı: orası saf mantığı sınıyor (paket ilerlemesi,
 * yapılandırma, metinler), burası SQL'in kendisini. Bu ayrım zorunlu, çünkü bu
 * modüldeki asıl kusur sınıfı tek bir süreçte hiç görünmüyor: kayıp güncelleme,
 * idempotans ve koşullu yazma ancak gerçek bir veritabanında, gerçekten
 * eşzamanlı iki bağlantıyla ortaya çıkıyor.
 *
 * KURULUM (tek seferlik):
 *   docker run -d --name lernomi-pgtest --network host \
 *     -e POSTGRES_PASSWORD=test -e POSTGRES_DB=lernomi \
 *     -e POSTGRES_HOST_AUTH_METHOD=trust -e PGPORT=55432 postgres:17-alpine
 *   export TEST_DATABASE_URL="postgres://postgres@127.0.0.1:55432/lernomi"
 *   DATABASE_URL="$TEST_DATABASE_URL" sh -c 'for f in drizzle/*.sql; do npx tsx scripts/apply-migration.ts "$f"; done'
 *
 * `apply-migration` DATABASE_URL, test ise TEST_DATABASE_URL okuyor (bkz. aşağıdaki
 * not); ikisini de aynı adrese kurmak gerekiyor.
 *
 * ÜRETİM VERİTABANINDA KOŞTURULMAZ: test kendi kullanıcılarını yazıp siliyor.
 * Adres `localhost`/`127.0.0.1` değilse baştan reddediyor.
 */
import "dotenv/config";
import { and, eq } from "drizzle-orm";
// `@/lib/db` — göreli yol DEĞİL: e2e tsconfig'i bu takma adı `scripts/test-db.ts`e
// yönlendiriyor. Göreli yazılsaydı test kendi sorgularını GERÇEK modülle,
// premium modülleri ise test ikiziyle koşardı: iki ayrı havuz, iki ayrı adres.
import { db } from "@/lib/db";
import { entitlements, premiumGrants, profiles, promoCodes, referrals } from "../src/lib/db/schema";
import { applyStoreEvent, grantBonus, resolveEntitlement, daysToMinutes } from "../src/lib/premium/entitlement";
import { createCodes, redeemCode } from "../src/lib/premium/promo";
import { attachReferral, ensureReferralCode, rewardForFirstPayment } from "../src/lib/premium/referral";
import type { StoreEvent } from "../src/lib/premium/ports";

/**
 * ADRES `TEST_DATABASE_URL`DEN OKUNUR, `DATABASE_URL`den değil.
 *
 * `scripts/tsconfig.e2e.json` `@/lib/db`yi `scripts/test-db.ts`e yönlendiriyor
 * ve o dosya `TEST_DATABASE_URL` kullanıyor. Yalnız `DATABASE_URL` verilirse
 * havuz bağlantı dizesi olmadan kurulur, pg de yerel varsayılana (5432) düşer
 * ve test "ECONNREFUSED" ile ölür — sebebi hiçbir yerde yazmaz. Depo genelinde
 * e2e sözleşmesi bu; buradaki kontrol onu görünür kılıyor.
 */
const url = process.env.TEST_DATABASE_URL ?? "";
if (!/@(localhost|127\.0\.0\.1)[:/]/.test(url)) {
  console.error(
    url
      ? `Bu test YALNIZ yerel bir veritabanında koşar; TEST_DATABASE_URL yerel değil: ${url.replace(/:[^:@]*@/, ":***@")}`
      : "TEST_DATABASE_URL tanımlı değil. Kurulum için dosyanın başındaki nota bak.",
  );
  process.exit(2);
}

let failures = 0;
let total = 0;
function check(name: string, cond: boolean, detail: unknown = "") {
  total++;
  if (cond) console.log(`  ✓ ${name}`);
  else {
    failures++;
    console.log(`  ✗ ${name} ${detail === "" ? "" : `→ ${String(detail)}`}`);
  }
}

const uid = (tag: string) => `test-${tag}-${Math.random().toString(36).slice(2, 8)}`;

/** Testin dokunduğu her satırı siler — tekrar tekrar koşabilsin. */
async function cleanup(ids: string[]) {
  for (const id of ids) {
    await db.delete(premiumGrants).where(eq(premiumGrants.userId, id));
    await db.delete(entitlements).where(eq(entitlements.userId, id));
    await db.delete(referrals).where(eq(referrals.inviterUserId, id));
    await db.delete(referrals).where(eq(referrals.inviteeUserId, id));
    await db.delete(profiles).where(eq(profiles.userId, id));
  }
}

const storeEvent = (userId: string, over: Partial<StoreEvent> = {}): StoreEvent => ({
  provider: "revenuecat",
  eventId: `ev-${Math.random().toString(36).slice(2, 10)}`,
  userId,
  state: "active",
  expiresAt: new Date(Date.now() + 30 * 86_400_000),
  platform: "android",
  productId: "premium_monthly",
  ref: "orig-1",
  paid: true,
  ...over,
});

async function main() {
  const created: string[] = [];

  /* ─────────────────────── 1. Bonus bakiyesi ve pencere ─────────────────── */
  console.log("\nBonus: bakiye, pencere, birikme");
  {
    const u = uid("bonus");
    created.push(u);
    await grantBonus(u, daysToMinutes(7), { source: "referral", ref: "x" });
    let v = await resolveEntitlement(u);
    check("bakiye pencereye çevrildi (mağaza kapsamı yok)", v.premium && v.source === "bonus", v.source);

    // İkinci ödül ÜSTÜNE biner: pencere sürerken bakiyeye ekleniyor.
    await grantBonus(u, daysToMinutes(7), { source: "referral", ref: "y" });
    v = await resolveEntitlement(u);
    check("ikinci ödül bakiyede bekliyor (pencere sürüyor)", v.bonusDaysPending === 7, v.bonusDaysPending);

    const [row] = await db.select().from(entitlements).where(eq(entitlements.userId, u));
    check("defterde iki referans satırı var",
      (await db.select().from(premiumGrants).where(and(eq(premiumGrants.userId, u), eq(premiumGrants.source, "referral")))).length === 2);
    check("bonus_until gelecekte", !!row.bonusUntil && row.bonusUntil.getTime() > Date.now());
  }

  /* ───────── 2. KAYIP GÜNCELLEME: eşzamanlı çözüm + ödül ────────────────── */
  console.log("\nKayıp güncelleme: pencere başlarken gelen ödül");
  {
    const u = uid("race");
    created.push(u);
    await grantBonus(u, daysToMinutes(7), { source: "promo", ref: "a" });
    // Pencere HENÜZ başlamadı (grantBonus içindeki resolve başlatır) — sıfırla.
    await db.update(entitlements)
      .set({ bonusUntil: null, bonusMinutes: daysToMinutes(7) })
      .where(eq(entitlements.userId, u));

    // Aynı anda: biri pencereyi başlatıyor, öteki 7 gün daha ekliyor.
    await Promise.all([
      resolveEntitlement(u),
      grantBonus(u, daysToMinutes(7), { source: "referral", ref: "b" }),
    ]);
    const v = await resolveEntitlement(u);
    const toplamGun = Math.round(
      ((v.until?.getTime() ?? Date.now()) - Date.now()) / 86_400_000,
    ) + v.bonusDaysPending;
    check("14 günün ikisi de duruyor (hiçbiri silinmedi)", toplamGun >= 13 && toplamGun <= 15, `${toplamGun} gün`);
  }

  /* ─────────────── 3. Mağaza olayı: idempotans (BENZERSİZ kısıt) ─────────── */
  console.log("\nMağaza olayı: tekrar teslimat");
  {
    const u = uid("store");
    created.push(u);
    const ev = storeEvent(u);

    const a = await applyStoreEvent(ev);
    check("ilk teslimat uygulandı", a.applied && a.firstPayment);

    const b = await applyStoreEvent(ev); // birebir aynı olay
    check("ikinci teslimat ELENDİ", !b.applied && !b.firstPayment);

    const rows = await db.select().from(premiumGrants)
      .where(and(eq(premiumGrants.userId, u), eq(premiumGrants.source, "store")));
    check("defterde TEK mağaza satırı", rows.length === 1, rows.length);

    // EŞZAMANLI çift teslimat — asıl sınav.
    const ev2 = storeEvent(u, { eventId: "concurrent-1" });
    const [c, d] = await Promise.all([applyStoreEvent(ev2), applyStoreEvent(ev2)]);
    check("eşzamanlı çiftten yalnız BİRİ uygulandı", c.applied !== d.applied, `${c.applied}/${d.applied}`);
    const rows2 = await db.select().from(premiumGrants)
      .where(and(eq(premiumGrants.userId, u), eq(premiumGrants.ref, "concurrent-1")));
    check("eşzamanlı çift TEK satır bıraktı", rows2.length === 1, rows2.length);
  }

  /* ──────── 4. Hediye çalışırken abonelik: kalan bakiyeye DÖNÜYOR ───────── */
  console.log("\nHediye çalışırken abone olma");
  {
    const u = uid("giftback");
    created.push(u);
    await grantBonus(u, daysToMinutes(10), { source: "promo", ref: "g" });
    const before = await resolveEntitlement(u);
    check("hediye penceresi çalışıyor", before.source === "bonus");

    await applyStoreEvent(storeEvent(u, { eventId: "sub-after-gift" }));
    const after = await resolveEntitlement(u);
    check("abonelik devraldı", after.source === "store", after.source);
    check("kalan hediye bakiyeye döndü (yanmadı)", after.bonusDaysPending >= 9, after.bonusDaysPending);
  }

  /* ─────────────────────── 5. İade: erişim DERHAL biter ─────────────────── */
  console.log("\nİade");
  {
    const u = uid("refund");
    created.push(u);
    await applyStoreEvent(storeEvent(u, { eventId: "buy-1" }));
    check("satın alma sonrası premium", (await resolveEntitlement(u)).premium);
    await applyStoreEvent(storeEvent(u, { eventId: "refund-1", state: "refunded", expiresAt: null, paid: false }));
    const v = await resolveEntitlement(u);
    check("iade sonrası premium DEĞİL", !v.premium, v.until);
  }

  /* ───────────────── 6. İptal: süre sonuna kadar premium sürer ──────────── */
  console.log("\nİptal (otomatik yenileme kapatıldı)");
  {
    const u = uid("cancel");
    created.push(u);
    await applyStoreEvent(storeEvent(u, { eventId: "buy-2" }));
    await applyStoreEvent(storeEvent(u, { eventId: "cancel-2", state: "canceled", paid: false }));
    const v = await resolveEntitlement(u);
    check("iptalden sonra da premium (süre dolmadı)", v.premium && v.store?.canceled === true, v.store?.state);
  }

  /* ───────────────────────── 7. Promo kodu ──────────────────────────────── */
  console.log("\nPromo kodu");
  {
    const u1 = uid("promo1");
    const u2 = uid("promo2");
    created.push(u1, u2);
    const [code] = await createCodes({ days: 90, count: 1, maxUses: 1, createdBy: "test" });

    const r1 = await redeemCode(u1, code.toLowerCase()); // küçük harf de kabul
    check("kod bozduruldu (küçük harf normalize)", r1.ok && r1.days === 90, JSON.stringify(r1));
    check("premium açıldı", (await resolveEntitlement(u1)).premium);

    const r2 = await redeemCode(u1, code);
    check("aynı kullanıcı ikinci kez bozduramıyor", !r2.ok && r2.reason === "already", JSON.stringify(r2));

    const r3 = await redeemCode(u2, code);
    check("tek kullanımlık kod tükendi", !r3.ok && r3.reason === "used_up", JSON.stringify(r3));

    // Çok kullanımlık kodda EŞZAMANLI son hak yarışı.
    const [multi] = await createCodes({ days: 30, count: 1, maxUses: 1, createdBy: "test" });
    const a = uid("mA");
    const b = uid("mB");
    created.push(a, b);
    const [ra, rb] = await Promise.all([redeemCode(a, multi), redeemCode(b, multi)]);
    check("son hakkı eşzamanlı isteyenden yalnız biri aldı", ra.ok !== rb.ok, `${ra.ok}/${rb.ok}`);

    await db.delete(promoCodes).where(eq(promoCodes.createdBy, "test"));
  }

  /* ───────────────────────── 8. Davet zinciri ───────────────────────────── */
  console.log("\nDavet");
  {
    const inviter = uid("inv");
    const invitee = uid("guest");
    created.push(inviter, invitee);
    // Davet kodu profil satırı ister — yoksa kod üretilmemeli (sessiz kusurdu).
    let hata = false;
    try { await ensureReferralCode(inviter); } catch { hata = true; }
    check("profil satırı yokken kod ÜRETİLMİYOR", hata);

    await db.insert(profiles).values({ userId: inviter });
    await db.insert(profiles).values({ userId: invitee });
    const code = await ensureReferralCode(inviter);
    check("profil varken kod üretildi", /^[A-Z0-9]{6}$/.test(code), code);
    check("kod SABİT kalıyor", (await ensureReferralCode(inviter)) === code);

    check("kendini davet edemez", (await attachReferral(inviter, code)) === "self");
    check("davet bağlandı", (await attachReferral(invitee, code)) === "ok");
    check("ikinci kez bağlanamaz", (await attachReferral(invitee, code)) === "already");

    // Ödül YALNIZ ilk ödemede.
    const before = await resolveEntitlement(inviter);
    check("bağ kurmak ödül VERMEDİ", !before.premium);

    await applyStoreEvent(storeEvent(invitee, { eventId: "guest-trial", paid: false, state: "trial" }));
    await rewardForFirstPayment(invitee);
    check("deneme ödül üretmedi", !(await resolveEntitlement(inviter)).premium);

    const paid = await applyStoreEvent(storeEvent(invitee, { eventId: "guest-paid", paid: true }));
    check("ilk ödeme işaretlendi", paid.firstPayment);
    await rewardForFirstPayment(invitee);
    const after = await resolveEntitlement(inviter);
    check("ödeme sonrası davetçi premium", after.premium, after.source);

    await rewardForFirstPayment(invitee);
    const twice = await resolveEntitlement(inviter);
    const gun = Math.round(((twice.until?.getTime() ?? 0) - Date.now()) / 86_400_000) + twice.bonusDaysPending;
    check("ödül İKİ KEZ verilmiyor", gun <= 8, `${gun} gün`);
  }

  await cleanup(created);
  console.log(failures === 0 ? `\ntamam: ${total}/${total}` : `\nKALDI: ${failures}/${total}`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
