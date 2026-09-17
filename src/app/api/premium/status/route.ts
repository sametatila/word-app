import { NextResponse } from "next/server";
import { getUserInfo } from "@/lib/auth/server";
import { premiumConfig, premiumCopy, resolveEntitlement } from "@/lib/premium";
import { canPocketWalk, canAiPractice } from "@/lib/premium/access";
import { referralStats } from "@/lib/premium/referral";
import { GUEST_AI_TRIAL_KEY, GUEST_AI_TRIALS } from "@/lib/auth/guest";
import { getUsage } from "@/lib/premium/quota";

export const dynamic = "force-dynamic";

/**
 * Premium durumu — İSTEMCİLERİN TEK ÇAĞRISI.
 *
 * Mobil uygulama "premium miyim" sorusunu artık RevenueCat'e SORMUYOR, buraya
 * soruyor. Bu, sağlayıcı bağımsızlığının istemci tarafındaki karşılığı ve aynı
 * zamanda bir işlevsellik şartı: promo kodu, referans ödülü ve elle verilen
 * süre mağazada YOK, yalnız bizim defterimizde. Sağlayıcıya sorulsaydı hediye
 * alan kullanıcı uygulamada premium görünmezdi.
 *
 * Tek çağrıda dört şey dönüyor — durum, sınırlar, metinler ve davet — çünkü
 * uygulama açılışında hepsi birden gerekiyor ve dört ayrı istek dört ayrı
 * gecikme demek.
 *
 * `level` sorgu parametresi ücretsiz ders kotasının hangi seviyede sorulduğunu
 * söylüyor; verilmezse konuşma/yazma kotaları hesaplanmıyor (arayüz onları
 * ekranın kendisinde soruyor).
 */
export async function GET(req: Request) {
  const who = await getUserInfo();
  const userId = who?.id ?? null;
  const cfg = await premiumConfig();
  const copy = await premiumCopy();

  // Oturum yoksa da yapılandırma ve metinler dönüyor: paywall giriş yapmamış
  // kullanıcıya da doğru sınırları göstermeli, "önce giriş yap" dememeli.
  if (!userId) {
    return NextResponse.json(
      {
        premium: false,
        until: null,
        source: null,
        store: null,
        bonusDaysPending: 0,
        limits: { free: cfg.free, fairUse: cfg.fairUse, mock: cfg.mock },
        plans: cfg.plans,
        copy,
        referral: null,
        guestAiLeft: null,
        gates: null,
      },
      { headers: { "cache-control": "no-store" } },
    );
  }

  const level = new URL(req.url).searchParams.get("level") ?? "";

  try {
    const ent = await resolveEntitlement(userId);
    const [walk, referral, speaking, writing, guestAiUsed] = await Promise.all([
      canPocketWalk(userId),
      /* Davet hesap istiyor (bkz. lib/auth/guest): misafire kod ÜRETİLMİYOR —
         üretilseydi o kodla ödeyen birinin ödülü misafire Premium yazardı. */
      who?.guest ? Promise.resolve(null) : referralStats(userId).catch(() => null),
      level ? canAiPractice(userId, "speaking", "lesson", level) : Promise.resolve(null),
      level ? canAiPractice(userId, "writing", "lesson", level) : Promise.resolve(null),
      who?.guest ? getUsage(userId, GUEST_AI_TRIAL_KEY, "all") : Promise.resolve(0),
    ]);

    return NextResponse.json(
      {
        premium: ent.premium,
        until: ent.until,
        source: ent.source,
        store: ent.store,
        /** Bekleyen hediye — "3 haftalık hakkın aboneliğin bitince başlayacak". */
        bonusDaysPending: ent.bonusDaysPending,
        limits: { free: cfg.free, fairUse: cfg.fairUse, mock: cfg.mock },
        plans: cfg.plans,
        copy,
        referral,
        /* Misafirin kalan yapay zekâ deneme hakkı (bkz. lib/auth/guest); hesapta null. */
        guestAiLeft: who?.guest ? Math.max(0, GUEST_AI_TRIALS - guestAiUsed) : null,
        gates: { pocket_walk: walk, speaking, writing },
      },
      { headers: { "cache-control": "no-store" } },
    );
  } catch (err) {
    console.error("[premium/status]", err);
    // Durum okunamadı: ücretsiz say ve sınırları yine döndür. Arayüz çalışmaya
    // devam etsin; en fazla premium kullanıcı bir kere kilit görür ve yeniler.
    return NextResponse.json(
      {
        premium: false,
        until: null,
        source: null,
        store: null,
        bonusDaysPending: 0,
        limits: { free: cfg.free, fairUse: cfg.fairUse, mock: cfg.mock },
        plans: cfg.plans,
        copy,
        referral: null,
        guestAiLeft: null,
        gates: null,
      },
      { status: 200, headers: { "cache-control": "no-store" } },
    );
  }
}
