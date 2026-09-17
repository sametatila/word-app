import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getAccountUserId } from "@/lib/auth/server";
import { inviterCard, normalizeReferral } from "@/lib/premium/referral";
import { applyReferralLink } from "@/lib/referral-link";
import { track } from "@/lib/events";
import { getT } from "@/lib/i18n/server";
import { InviteLanding } from "./invite-landing";

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
 *
 * İKİ AYRI ZİYARETÇİ, İKİ AYRI CEVAP:
 *
 *   GİRİŞLİ — yapılacak iş belli: bağ kurulur, davetçiye arkadaşlık isteği
 *   gider, kullanıcı sonucu paywall'da görür (`?ref=…`). Gösterilecek bir
 *   sayfa yok, o yüzden doğrudan yönlendiriliyor.
 *
 *   GİRİŞSİZ — eskiden doğrudan giriş ekranına atılıyordu ve bu, büyüme
 *   döngüsünün en kritik anında yapılabilecek en kötü şeydi: uygulamayı hiç
 *   duymamış biri, kimin davet ettiğini bile göremeden bir parola formuyla
 *   karşılaşıyordu. Artık davetiyeyi görüyor — kim davet etti, ne olacak, ne
 *   yapması gerekiyor — ve kayıttan sonra `?next=` ile buraya dönüp bağı
 *   kuruyor. Çerez gerekmiyor; `auth-form` `next` parametresini zaten taşıyor
 *   ve yalnız kendi sitemizdeki yolları kabul ediyor.
 *
 * SAYFA ROTA DEĞİL, SAYFA. Önceki hâli `route.ts` idi ve girişsizi
 * yönlendirmekten başka bir şey yapamıyordu — bir uç HTML çizemez. Yan etki
 * (bağ kurma) bir GET'in içinde duruyor ama zararsız: işlem tekrarlanabilir
 * (`referrals_invitee_idx` benzersiz) ve bu adrese hiçbir iç bağlantı
 * gitmediği için Next'in ön yüklemesi de tetiklemiyor.
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function InvitePage({ params }: { params: Promise<{ code: string }> }) {
  const { code: raw } = await params;
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
  const userId = await getAccountUserId();

  if (userId) {
    if (!code) redirect("/premium?ref=unknown");
    /* Davetin VARIŞI ölçülüyor — mobil `App.tsx` aynı olay adını yazıyor. */
    const today = new Date().toISOString().slice(0, 10);
    void track(userId, "invite_open", today, 0, "link");
    let sonuc = "error";
    try {
      const r = await applyReferralLink(userId, code);
      sonuc = r === "unknown_code" ? "unknown" : r;
    } catch (err) {
      console.error("[r/code]", err);
    }
    /* `redirect` try'ın DIŞINDA: Next yönlendirmeyi bir istisna atarak
       yapıyor, catch içinde kalsaydı kendi hata dalımız onu yutardı. */
    redirect(`/premium?ref=${sonuc}`);
  }

  const t = await getT();
  const inviter = code ? await inviterCard(code) : null;
  /* Adı olmayan davetçi için sosyal katmanın kendi cümlesi kullanılıyor
     (`social.unnamed`) — sıralamalarda ve profillerde de aynı metin. */
  const ad = inviter ? inviter.name || t("social.unnamed") : "";
  return (
    <InviteLanding
      code={code}
      inviter={inviter}
      t={{
        title: inviter ? t("invitew.title", { name: ad }) : t("invitew.bad_title"),
        lead: inviter ? t("invitew.lead") : t("invitew.bad_lead"),
        how: t("invitew.how", { name: ad }),
        cta: t("invitew.cta"),
        browse: t("invitew.browse"),
        pitch: t("invitew.pitch"),
      }}
    />
  );
}
