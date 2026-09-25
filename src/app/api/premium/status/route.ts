import { NextResponse } from "next/server";
import { getUserInfo } from "@/lib/auth/server";
import { premiumConfig, premiumCopy, resolveEntitlement } from "@/lib/premium";
import { canPocketWalk, unlockOverview } from "@/lib/premium/access";
import { DAILY_QUOTAS } from "@/lib/quotas";
import type { PremiumConfig } from "@/lib/premium/gates";
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
 * KİLİT AÇMA GÖRÜNÜMÜ (`unlock`, 2026-09-25): her kotalı yüzey için kalan hak ve
 * bir sonraki hakkın koşulları (bitir: x/y, seri: x/7, tahmini gün) — tüm
 * seviyeler tek çağrıda. Hesap `lib/premium/unlock`ta; mobil ve web aynı
 * sayıdan aynı cümleyi kuruyor. Eski `level` parametresi artık gerekmiyor.
 */
export async function GET() {
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
        limits: limitsOf(cfg),
        plans: cfg.plans,
        copy,
        referral: null,
        guestAiLeft: null,
        gates: null,
        unlock: null,
      },
      { headers: { "cache-control": "no-store" } },
    );
  }

  try {
    const ent = await resolveEntitlement(userId);
    const [walk, referral, unlock, guestAiUsed] = await Promise.all([
      canPocketWalk(userId),
      /* Davet hesap istiyor (bkz. lib/auth/guest): misafire kod ÜRETİLMİYOR —
         üretilseydi o kodla ödeyen birinin ödülü misafire Premium yazardı. */
      who?.guest ? Promise.resolve(null) : referralStats(userId).catch(() => null),
      unlockOverview(userId).catch((err) => {
        console.error("[premium/status] unlock", err);
        return null;
      }),
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
        limits: limitsOf(cfg),
        plans: cfg.plans,
        copy,
        referral,
        /* Misafirin kalan yapay zekâ deneme hakkı (bkz. lib/auth/guest); hesapta null. */
        guestAiLeft: who?.guest ? Math.max(0, GUEST_AI_TRIALS - guestAiUsed) : null,
        /* `speaking`/`writing` eski sürümlerin alanı; hak artık seviye ve yüzey
           başına ve `unlock`ta. Alan duruyor (null) ki eski istemci okurken düşmesin. */
        gates: { pocket_walk: walk, speaking: null, writing: null },
        unlock,
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
        limits: limitsOf(cfg),
        plans: cfg.plans,
        copy,
        referral: null,
        guestAiLeft: null,
        gates: null,
        unlock: null,
      },
      { status: 200, headers: { "cache-control": "no-store" } },
    );
  }
}

/**
 * İstemciye giden sınırlar.
 *
 * `fairUse.chatTurnsPerDay` panelden değil sabit tavandan (`lib/quotas`): paywall
 * ince yazısı üç tavanı birlikte söylüyor. `fairUse.pocketWalksPerDay` ESKİ
 * SÜRÜMLER İÇİN takma ad — eski paywall "Cepte Yürüyüş — günde {n} tura kadar"
 * cümlesini bu alanla kuruyor ve alan yoksa ekrana "undefined" basıyordu. Değeri
 * artık gerçekten sayılan oturum tavanı.
 */
function limitsOf(cfg: PremiumConfig) {
  return {
    free: cfg.free,
    fairUse: { ...cfg.fairUse, chatTurnsPerDay: DAILY_QUOTAS.roleplayTurns, pocketWalksPerDay: cfg.fairUse.walkSessionsPerDay },
    mock: cfg.mock,
  };
}
