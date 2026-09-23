import "server-only";
import { and, desc, eq, gt, isNotNull, isNull, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { entitlements, promoCodes, storeTrialClaims, storeTrialClicks, user } from "@/lib/db/schema";
import { STATE_GRANTS, type StoreEvent, type StoreState } from "./ports";
import { normalizeCode, randomCode } from "./promo";

/**
 * GRUP KODU — "2 ay ücretsiz, sonra ücretli" kampanyası.
 *
 * NE DEĞİL: bonus kodu değil. Bonus kodu (lib/premium/promo) bizim defterimize
 * gün yazar ve süre bitince hiçbir şey olmaz. Grup kodu HİÇ GÜN YAZMAZ: kullanıcıyı
 * mağazanın KENDİ deneme teklifine yollar. Mağaza ödeme yöntemi ister, 2 ay
 * ücretsiz verir ve kullanıcı iptal etmezse seçtiği planın fiyatıyla yeniler.
 * Yetki her zamanki yoldan gelir: mağaza → RevenueCat → webhook → defter.
 *
 * NEDEN BÖYLE: kampanyanın amacı ücretli aboneye dönüşüm. Bizim verdiğimiz 60
 * gün bittiğinde kullanıcı sıfırdan satın alma kararı vermek zorunda kalırdı;
 * mağaza denemesinde karar baştan verilmiş oluyor ve iptal etmek bir eylem.
 * Karşılığında ödeme yöntemi şartı var ve karşılama sayfası bunu AÇIKÇA yazıyor.
 *
 * PLATFORMA GÖRE İKİ YOL — VE İKİSİ BİLEREK FARKLI YERDE:
 *   Android  UYGULAMA İÇİNDE. Play'de her temel planın `promo-2m` teklifi
 *            (geliştiricinin belirlediği uygunluk, etiket `promo2m`). Uygulama
 *            kodu `claimStoreTrial` ile talep edip o seçeneği satın alıyor;
 *            teklif herkese açık değil, kapısı bu kod.
 *   iOS      YALNIZ WEBDE. App Store Guideline 3.1.1 uygulamanın KENDİ
 *            mekanizmasıyla (lisans anahtarı, promo kodu) içerik açmasını
 *            yasaklıyor; meşru yol Apple'ın kendi teklif kodu. Bu yüzden iOS
 *            uygulamasında grup kodu kutusu da, `/g/` bağlantısını karşılama da
 *            YOK (AASA `/g/`yi iddia etmiyor, iPhone'da bağlantı Safari'de
 *            açılıyor). Karşılama sayfası `/g/<KOD>/ios?plan=…` üzerinden
 *            tıklamayı sayıp Apple'ın bozdurma sayfasına yönlendiriyor
 *            (`iosRedirect`, `iosRedeemUrl`). Talep ucu iOS'u
 *            `ios_web_only` ile reddediyor.
 *
 * HER GRUBA AYRI KOD: WhatsApp ve Telegram gruplarına dağıtılıyor ve "hangi grup
 * getirdi" sorusu kod başına huniyle cevaplanıyor (`store_trial_claims`).
 * iOS'ta Apple kodu TEK (grup başına Apple kodu üretmek elle iş) ve Apple
 * webhook'ta yalnız teklifin adını bildiriyor; iOS'ta gruba yazılabilen tek
 * şey yönlendirme tıklaması (`store_trial_clicks`), dönüşüm değil.
 */

export type TrialPlan = "monthly" | "yearly";
export type TrialPlatform = "ios" | "android";

/** Denemenin süresi — yalnız bilgi (mağazadaki teklif belirliyor). */
export const STORE_TRIAL_DAYS = 60;
/** Play teklif etiketi — mobil `billing` bu etiketi taşıyan seçeneği satın alıyor. */
export const ANDROID_OFFER_TAG = "promo2m";
/** App Store'daki uygulama kimliği (Apple'ın bozdurma sayfası bunu istiyor). */
export const IOS_APP_ID = "6810593275";

/**
 * Apple'ın teklif kodu bozdurma adresi — plan başına bir env. YALNIZ WEB
 * karşılama sayfasının yönlendirmesi kullanıyor (iOS uygulaması değil, 3.1.1).
 *
 * Boşsa null: iOS yolu kapalı ("iPhone için yakında"). Kod değeri App Store
 * Connect'te üretiliyor ve sır değil (zaten kullanıcıya gidiyor), ama repoda da
 * durmuyor: kampanya değişince kod değişiyor ve bu bir deploy gerektirmemeli.
 */
export function iosRedeemUrl(plan: TrialPlan): string | null {
  const raw = plan === "yearly" ? process.env.IOS_PROMO2M_CODE_YEARLY : process.env.IOS_PROMO2M_CODE_MONTHLY;
  const code = (raw ?? "").trim();
  if (!code) return null;
  return `https://apps.apple.com/redeem?ctx=offercodes&id=${IOS_APP_ID}&code=${encodeURIComponent(code)}`;
}

export type ClaimReason =
  | "not_found"
  | "disabled"
  | "expired"
  | "used_up"
  | "already"
  | "trial_used"
  | "wrong_kind"
  | "account_required"
  | "already_subscribed"
  | "ios_web_only";

export type ClaimResult =
  | { ok: true; platform: "android"; plan: TrialPlan; offerTag: string; code: string }
  | { ok: false; reason: ClaimReason };

const success = (plan: TrialPlan, code: string): ClaimResult => ({ ok: true, platform: "android", plan, offerTag: ANDROID_OFFER_TAG, code });

/**
 * Kodu kullanıcı adına talep eder ve mağaza yolunu döndürür.
 *
 * TALEP ≠ DENEME. Talep yalnız "bu kişi bu grubun kodunu girdi ve mağazaya
 * gitti" demek; deneme mağaza bildirince başlamış sayılıyor (webhook →
 * `recordStoreTrialEvent`). Kullanıcı ödeme sayfasından vazgeçerse talep
 * durur ve AYNI kodla yeniden denemek serbest (hak ikinci kez sayılmaz).
 *
 * YARIŞ KORUMASI `redeemCode` ile aynı: sayaç koşullu UPDATE ile artıyor
 * (`uses < max_uses`), grup kodları da aynı anda yüzlerce kişiye gidiyor.
 *
 * KÖTÜYE KULLANIM SINIRI: Play'deki teklif "geliştiricinin belirlediği
 * uygunluk" ile açık, yani Play kimin kaçıncı kez aldığını SORMUYOR — kapı
 * bizim. Hesap başına bir grup denemesi (`trial_used`); denemesini bitirmiş
 * biri başka grubun koduyla ikinci iki ayı alamıyor.
 */
export async function claimStoreTrial(
  userId: string,
  input: string,
  platform: TrialPlatform,
  plan: TrialPlan,
): Promise<ClaimResult> {
  /* iOS BU UÇTAN GEÇMEZ (Guideline 3.1.1, dosya başı). iOS kullanıcısı webdeki
     karşılama sayfasından Apple'ın bozdurma sayfasına gidiyor; uygulamada kod
     kutusu yok. Burada kabul edilseydi 3.1.1'in yasakladığı yol sunucuda açık
     kalırdı. Hak harcanmadan, koda bakılmadan dönülüyor. */
  if (platform !== "android") return { ok: false, reason: "ios_web_only" };

  const code = normalizeCode(input);
  if (!code) return { ok: false, reason: "not_found" };

  /* MİSAFİR KAPISI burada da: uç `requireAccount` ile zaten kesiyor, ama
     mağaza aboneliği hesaba yazılıyor ve misafirde RevenueCat hesap
     kimliğine eşlenmiyor (bkz. lib/auth/guest). Kapı tek yerde unutulursa
     abonelik sahipsiz kalır; ikinci kontrol bir sorgu. */
  const [who] = await db.select({ anon: user.isAnonymous }).from(user).where(eq(user.id, userId)).limit(1);
  if (who?.anon) return { ok: false, reason: "account_required" };

  const [row] = await db.select().from(promoCodes).where(eq(promoCodes.code, code)).limit(1);
  if (!row) return { ok: false, reason: "not_found" };
  if (row.kind !== "store_trial") return { ok: false, reason: "wrong_kind" };
  if (row.disabledAt) return { ok: false, reason: "disabled" };
  if (row.expiresAt && row.expiresAt.getTime() <= Date.now()) return { ok: false, reason: "expired" };

  const mine = await db
    .select({ id: storeTrialClaims.id, codeId: storeTrialClaims.codeId, startedAt: storeTrialClaims.startedAt })
    .from(storeTrialClaims)
    .where(eq(storeTrialClaims.userId, userId));
  const same = mine.find((c) => c.codeId === row.id);
  if (same?.startedAt) return { ok: false, reason: "already" };
  if (mine.some((c) => c.startedAt)) return { ok: false, reason: "trial_used" };

  /* SÜREN ABONELİK. Mağaza aynı ürüne ikinci aboneliği zaten satmıyor; burada
     kesilmezse kullanıcı ödeme sayfasında anlamsız bir hatayla karşılaşırdı.
     `canceled` da sayılıyor: yenilemesi kapalı ama dönem sonuna dek sürüyor. */
  const [ent] = await db
    .select({ until: entitlements.storeUntil, state: entitlements.storeState })
    .from(entitlements)
    .where(eq(entitlements.userId, userId))
    .limit(1);
  if (ent?.until && ent.until.getTime() > Date.now() && ent.state && STATE_GRANTS.has(ent.state as StoreState)) {
    return { ok: false, reason: "already_subscribed" };
  }

  if (same) {
    // Yarıda kalmış talep: yeniden dene. Hak ikinci kez sayılmıyor, platform ve
    // plan son seçime güncelleniyor (kullanıcı yıllığa geçmiş olabilir).
    await db
      .update(storeTrialClaims)
      .set({ platform, plan, claimedAt: new Date() })
      .where(eq(storeTrialClaims.id, same.id));
    return success(plan, code);
  }

  const taken = await db
    .update(promoCodes)
    .set({ uses: sql`${promoCodes.uses} + 1` })
    .where(and(eq(promoCodes.id, row.id), sql`${promoCodes.uses} < ${promoCodes.maxUses}`))
    .returning({ id: promoCodes.id });
  if (taken.length === 0) return { ok: false, reason: "used_up" };

  const inserted = await db
    .insert(storeTrialClaims)
    .values({ codeId: row.id, userId, platform, plan })
    .onConflictDoNothing()
    .returning({ id: storeTrialClaims.id });
  if (inserted.length === 0) {
    // Aynı anda iki istek: ötekisi talebi yazdı. Hakkı geri ver, sonuç aynı.
    await db.update(promoCodes).set({ uses: sql`${promoCodes.uses} - 1` }).where(eq(promoCodes.id, row.id));
  }
  return success(plan, code);
}

export type PeekResult =
  | { status: "valid"; days: number; campaign: string | null; group: string | null; code: string }
  | { status: "not_found" | "disabled" | "expired" | "used_up"; code: string };

/**
 * Herkese açık doğrulama — karşılama sayfası ve uygulamanın ön gösterimi.
 *
 * HİÇBİR ŞEY HARCAMAZ. Döndürdüğü yalnız kodun durumu ve kullanıcıya zaten
 * gösterilen iki ad (kampanya, grup); sayaç, oluşturan, not gibi iç veri yok.
 * BONUS KODU "bulunamadı" görünüyor: bu uç bonus kodlarının geçerliliğini
 * dışarıya söyleyen bir kahin olmamalı.
 */
export async function peekStoreTrialCode(input: string): Promise<PeekResult> {
  const code = normalizeCode(input);
  if (!code) return { status: "not_found", code };
  const [row] = await db
    .select({
      kind: promoCodes.kind,
      campaign: promoCodes.campaign,
      group: promoCodes.groupLabel,
      maxUses: promoCodes.maxUses,
      uses: promoCodes.uses,
      expiresAt: promoCodes.expiresAt,
      disabledAt: promoCodes.disabledAt,
    })
    .from(promoCodes)
    .where(eq(promoCodes.code, code))
    .limit(1);
  if (!row || row.kind !== "store_trial") return { status: "not_found", code };
  if (row.disabledAt) return { status: "disabled", code };
  if (row.expiresAt && row.expiresAt.getTime() <= Date.now()) return { status: "expired", code };
  if (row.uses >= row.maxUses) return { status: "used_up", code };
  return { status: "valid", days: STORE_TRIAL_DAYS, campaign: row.campaign, group: row.group, code };
}

/**
 * iOS karşılama sayfasından App Store'a yönlendirme — ANONİM tıklama sayımı.
 *
 * Kullanıcı kimliği YAZILMIYOR: iPhone ziyaretçisi çoğu zaman girişsiz ve
 * sayım "hangi grup kaç kişiyi App Store'a gönderdi" sorusu için yeter. iOS'ta
 * dönüşüm gruba yazılamıyor (Apple yalnız teklifin adını bildiriyor), o yüzden
 * bu sayı iOS hunisinin görülebilen tek halkası.
 *
 * Kod geçerli değilse null: yönlendirme yapılmaz, sayfa durumu gösterir.
 * `record: false` hız sınırı aşılınca: kullanıcı yine yönlendirilir ama sayım
 * şişirilemez.
 */
export async function iosRedirect(
  input: string,
  plan: TrialPlan,
  record = true,
): Promise<{ url: string } | { error: "invalid" | "not_ready" }> {
  const peek = await peekStoreTrialCode(input);
  if (peek.status !== "valid") return { error: "invalid" };
  const url = iosRedeemUrl(plan);
  if (!url) return { error: "not_ready" };
  if (record) {
    try {
      const [row] = await db.select({ id: promoCodes.id }).from(promoCodes).where(eq(promoCodes.code, peek.code)).limit(1);
      if (row) await db.insert(storeTrialClicks).values({ codeId: row.id, platform: "ios", plan });
    } catch (err) {
      // Sayım yazılamadı diye kullanıcı App Store'dan alıkonmaz.
      console.error("[premium/store-trial click]", (err as Error).message);
    }
  }
  return { url };
}

/**
 * Deneme 45 günden UZUN mu — grup denemesini herkese açık denemeden ayıran ölçü.
 *
 * Play'de aynı temel planda iki teklif var: herkese açık `free-trial-1m` (30
 * gün) ve bizim `promo-2m` (60 gün). Webhook hangi teklifin alındığını
 * söylemiyor; ama denemenin BİTİŞİ söylüyor. Talebi olan biri kodu girip
 * vazgeçer, sonra sıradan 1 aylık denemeyi başlatırsa o deneme gruba
 * yazılmamalı. Sandbox'ta mağaza süreleri dakikalara sıkıştırıyor, orada
 * süre ölçüsü anlamsız ve atlanıyor.
 */
function isGroupTrial(ev: StoreEvent, at: Date): boolean {
  if (ev.sandbox) return true;
  if (!ev.expiresAt) return false;
  return ev.expiresAt.getTime() - at.getTime() > 45 * 86_400_000;
}

/** Talebin mağaza denemesine dönüşmesi için azami bekleme — iOS'ta kullanıcı kodu sonra da bozdurabilir. */
const CLAIM_WINDOW_DAYS = 7;

/**
 * Webhook'tan gelen mağaza olayını grup hunisine işler.
 *
 * YETKİYİ ETKİLEMEZ — yalnız sayım. Yazılamazsa hata loga düşer, webhook
 * yetkiyi yine uygular. Her damga `coalesce` ile bir kez yazılıyor, yani
 * tekrar teslimat zararsız.
 *
 *   ilk satın alma + deneme  → started_at (son 7 günde yapılmış, başlamamış talep)
 *   yenileme (deneme dışı)   → converted_at
 *   iptal                    → cancelled_at   (iptal geri alınırsa boşalır:
 *                              sayı "şu an yenilemeyecek olanlar")
 *   süre doldu               → expired_at
 *
 * Başlamış denemenin sonraki olayları ABONELİK KİMLİĞİYLE eşleniyor
 * (`store_ref`): kullanıcının sonradan aldığı başka bir abonelik grubun
 * hunisine karışmasın.
 */
export async function recordStoreTrialEvent(ev: StoreEvent): Promise<void> {
  const l = ev.ledger;
  if (!l) return;
  const at = l.eventAt ?? new Date();
  try {
    if (l.type === "purchase" && l.period === "trial") {
      if (!isGroupTrial(ev, at)) return;
      const [claim] = await db
        .select({ id: storeTrialClaims.id })
        .from(storeTrialClaims)
        .where(
          and(
            eq(storeTrialClaims.userId, ev.userId),
            isNull(storeTrialClaims.startedAt),
            gt(storeTrialClaims.claimedAt, new Date(at.getTime() - CLAIM_WINDOW_DAYS * 86_400_000)),
          ),
        )
        .orderBy(desc(storeTrialClaims.claimedAt))
        .limit(1);
      if (!claim) return;
      await db
        .update(storeTrialClaims)
        .set({ startedAt: at, storeRef: ev.ref, environment: ev.sandbox ? "sandbox" : "production" })
        .where(and(eq(storeTrialClaims.id, claim.id), isNull(storeTrialClaims.startedAt)));
      return;
    }

    const stamp =
      l.type === "renewal" && l.period !== "trial"
        ? { convertedAt: sql`coalesce(${storeTrialClaims.convertedAt}, ${at})` }
        : l.type === "cancellation"
          ? { cancelledAt: sql`coalesce(${storeTrialClaims.cancelledAt}, ${at})` }
          : l.type === "uncancellation"
            ? { cancelledAt: null }
            : l.type === "expiration"
              ? { expiredAt: sql`coalesce(${storeTrialClaims.expiredAt}, ${at})` }
              : null;
    if (!stamp) return;

    // Abonelik kimliği varsa ONA, yoksa kullanıcının son başlamış denemesine.
    const [claim] = await db
      .select({ id: storeTrialClaims.id })
      .from(storeTrialClaims)
      .where(
        and(
          eq(storeTrialClaims.userId, ev.userId),
          isNotNull(storeTrialClaims.startedAt),
          ev.ref ? eq(storeTrialClaims.storeRef, ev.ref) : undefined,
        ),
      )
      .orderBy(desc(storeTrialClaims.startedAt))
      .limit(1);
    if (!claim) return;
    await db.update(storeTrialClaims).set(stamp).where(eq(storeTrialClaims.id, claim.id));
  } catch (err) {
    console.error("[premium/store-trial]", (err as Error).message);
  }
}

/* ───────────────────────────── panel ───────────────────────────── */

export type StoreTrialCodeRow = {
  id: number;
  code: string;
  campaign: string | null;
  group: string | null;
  maxUses: number;
  uses: number;
  expiresAt: Date | null;
  disabledAt: Date | null;
  createdAt: Date;
  claims: number;
  started: number;
  converted: number;
  cancelled: number;
  expired: number;
  /** Sandbox'ta başlamış denemeler (TestFlight / Play iç test) — üstteki sayılara girmiyor. */
  sandbox: number;
  /** iOS: karşılama sayfasından App Store'a yönlendirme (dönüşüm değil, bkz. `iosRedirect`). */
  iosMonthly: number;
  iosYearly: number;
};

/**
 * Grup kodları ve hunileri. Android hunisi talepten dönüşüme kadar; iOS'ta
 * yalnız yönlendirme tıklaması (dosya başı). Sayımlar ÜRETİM denemesi: sandbox'ta başlamış
 * talepler ayrı sütunda, yoksa test eden ekip bir grubun dönüşümünü şişirirdi.
 */
export async function listStoreTrialCodes(limit = 300): Promise<StoreTrialCodeRow[]> {
  const prod = sql`coalesce(${storeTrialClaims.environment}, 'production') = 'production'`;
  const rows = await db
    .select({
      id: promoCodes.id,
      code: promoCodes.code,
      campaign: promoCodes.campaign,
      group: promoCodes.groupLabel,
      maxUses: promoCodes.maxUses,
      uses: promoCodes.uses,
      expiresAt: promoCodes.expiresAt,
      disabledAt: promoCodes.disabledAt,
      createdAt: promoCodes.createdAt,
      claims: sql<number>`count(${storeTrialClaims.id})::int`,
      started: sql<number>`count(*) filter (where ${storeTrialClaims.startedAt} is not null and ${prod})::int`,
      converted: sql<number>`count(*) filter (where ${storeTrialClaims.convertedAt} is not null and ${prod})::int`,
      cancelled: sql<number>`count(*) filter (where ${storeTrialClaims.cancelledAt} is not null and ${prod})::int`,
      expired: sql<number>`count(*) filter (where ${storeTrialClaims.expiredAt} is not null and ${prod})::int`,
      sandbox: sql<number>`count(*) filter (where ${storeTrialClaims.environment} = 'sandbox')::int`,
      /* Tıklamalar ALT SORGUYLA: talep tablosuyla aynı birleşime girselerdi iki
         tablo birbirini çarpar ve her sayı şişerdi. */
      iosMonthly: sql<number>`(select count(*) from store_trial_clicks k where k.code_id = ${promoCodes.id} and k.plan = 'monthly')::int`,
      iosYearly: sql<number>`(select count(*) from store_trial_clicks k where k.code_id = ${promoCodes.id} and k.plan = 'yearly')::int`,
    })
    .from(promoCodes)
    .leftJoin(storeTrialClaims, eq(storeTrialClaims.codeId, promoCodes.id))
    .where(eq(promoCodes.kind, "store_trial"))
    .groupBy(promoCodes.id)
    .orderBy(desc(promoCodes.createdAt))
    .limit(limit);
  return rows;
}

export type NewTrialCodes = {
  campaign: string;
  /** Grup etiketleri — her birine bir kod. */
  groups: string[];
  /** Okunur önek ("WA", "TG"); kodun başına eklenir. */
  prefix?: string | null;
  maxUses?: number;
  expiresAt?: Date | null;
  createdBy?: string | null;
};

/**
 * Kampanya için grup başına bir kod üretir.
 *
 * ÖNEK + RASTGELE: "WA" + 6 hane. Önek grubun kim olduğunu kodu okuyana
 * söylüyor (destekte işe yarıyor), rastgele kısım tahmin edilmeyi engelliyor.
 * Önek `normalizeCode` kuralından geçiyor, yani kullanıcı nasıl yazarsa
 * yazsın aynı kod bulunuyor. Çakışmada yeniden deneniyor (bkz. `createCodes`).
 */
export async function createStoreTrialCodes(opts: NewTrialCodes): Promise<{ code: string; group: string }[]> {
  const campaign = opts.campaign.trim().slice(0, 80);
  const groups = [...new Set(opts.groups.map((g) => g.trim().slice(0, 80)).filter(Boolean))].slice(0, 200);
  const prefix = normalizeCode(opts.prefix ?? "").slice(0, 10);
  const maxUses = Math.min(100_000, Math.max(1, Math.round(opts.maxUses ?? 500)));
  const made: { code: string; group: string }[] = [];

  for (const group of groups) {
    for (let attempt = 0; attempt < 5; attempt++) {
      const code = prefix ? prefix + randomCode(6) : randomCode(8);
      try {
        await db.insert(promoCodes).values({
          code,
          kind: "store_trial",
          days: STORE_TRIAL_DAYS,
          maxUses,
          expiresAt: opts.expiresAt ?? null,
          campaign: campaign || null,
          groupLabel: group,
          createdBy: opts.createdBy ?? null,
        });
        made.push({ code, group });
        break;
      } catch {
        /* benzersiz indeks çarptı: yeni rastgele kısımla dene */
      }
    }
  }
  return made;
}
