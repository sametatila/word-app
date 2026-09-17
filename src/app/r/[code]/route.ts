import { NextResponse } from "next/server";
import { AUTH_BASE_URL, getAccountUserId } from "@/lib/auth/server";
import { normalizeReferral } from "@/lib/premium/referral";
import { applyReferralLink } from "@/lib/referral-link";
import { track } from "@/lib/events";

export const dynamic = "force-dynamic";

/**
 * Davet bağlantısı — `lernomi.app/r/<KOD>`.
 *
 * NEDEN AYRI BİR YOL VE NEDEN KOD KUTUSU DEĞİL.
 *
 * Davet bağı eskiden yalnız bir kod KUTUSUNA yazılarak kuruluyordu ve o kutu
 * iOS'ta hiç çizilmiyor (Guideline 3.1.1, `PaywallScreen` `OWN_PROMO_CODES`).
 * Kutu promo kodu için haklı olarak gizli — promo kodu gerçekten premium gün
 * açıyor, yani "kendi mekanizmanla kilidi açma" tarifine giriyor. Ama AYNI
 * kutudan girilen davet kodu girene HİÇBİR ŞEY vermiyor: yalnız "kim kimi
 * davet etti" satırını yazıyor ve davetçiye arkadaşlık isteği gönderiyor.
 * Doğru olan bir karar, ilgisiz ve zararsız olan yolu da beraberinde
 * götürmüştü: iOS'ta davet edilen bağı hiç kuramıyordu.
 *
 * Çözüm haklılığı savunmak değil, KUTUYU HİÇ GÖSTERMEMEK. Bağ artık yazılan
 * bir koddan değil DOKUNULAN BİR BAĞLANTIDAN kuruluyor. Uygulaması kurulu
 * kullanıcıda bu adres App Link/Universal Link olarak uygulamada açılıyor
 * (bkz. `.well-known` dosyaları ve `lib/deepLink`), kurulu olmayanda burada.
 * İki yolda da kullanıcı hiçbir şey yazmıyor.
 *
 * GİRİŞSİZ ZİYARETÇİ KAYBEDİLMİYOR: `?next=` ile giriş ekranına, oradan geri
 * buraya dönüyor ve bağ o zaman kuruluyor. Çerez gerekmiyor — `auth-form`
 * `next` parametresini zaten taşıyor.
 *
 * SONUÇ SESSİZ KALMIYOR: kullanıcı ne olduğunu paywall'da görüyor
 * (`?ref=…`). "Zaten davet edilmişsin" ile "böyle bir kod yok" bambaşka iki
 * durum ve ikisini "hiçbir şey olmadı" diye göstermek destek çağrısı üretir.
 */
export async function GET(req: Request, ctx: { params: Promise<{ code: string }> }) {
  const { code: raw } = await ctx.params;
  /* `decodeURIComponent` BOZUK yüzde dizisinde fırlatıyor (`/r/%`) ve bu adres
     dışarıdan geliyor: sarmalanmazsa yanlış yazılmış bir bağlantı 500 döndürür.
     Çözülemezse ham hâli sadeleştirmeye giriyor, orası da geçersizi eliyor. */
  let ham = raw ?? "";
  try {
    ham = decodeURIComponent(ham);
  } catch {
    /* ham hâliyle devam */
  }
  const code = normalizeReferral(ham);
  /* GENEL ADRESE: `req.url` nginx arkasında iç adres (`https://localhost:3011`)
     taşıyor ve bağlantı canlıda kullanıcıyı oraya yolluyordu (2026-09-17,
     bkz. auth/handoff aynı ders). */
  const to = (q: string) => NextResponse.redirect(new URL(`/premium?ref=${q}`, AUTH_BASE_URL));

  if (!code) return to("unknown");

  const userId = await getAccountUserId();
  if (!userId) {
    /* Kod ADRESTE taşınıyor, çerezde değil: giriş ekranı `next`i zaten
       doğruluyor (`auth-form`: yalnız kendi sitemizde, `//` ile başlamayan
       yol) ve kullanıcı girişi bitirince buraya dönüp bağı kuruyor. */
    return NextResponse.redirect(new URL(`/login?next=${encodeURIComponent(`/r/${code}`)}`, AUTH_BASE_URL));
  }

  /* Davetin VARIŞI ölçülüyor — mobil `App.tsx` aynı olay adını yazıyor. */
  void track(userId, "invite_open", new Date().toISOString().slice(0, 10), 0, "link");

  try {
    const r = await applyReferralLink(userId, code);
    return to(r === "unknown_code" ? "unknown" : r);
  } catch (err) {
    console.error("[r/code]", err);
    return to("error");
  }
}
