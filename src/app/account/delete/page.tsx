import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth-shell";
import { AccountDeleteForm } from "@/components/account-delete-form";
import { auth, authEnabled } from "@/lib/auth/server";
import { headers } from "next/headers";
import { getT } from "@/lib/i18n/server";
import { DeleteAccountInfo } from "./delete-info";

export const dynamic = "force-dynamic";

/**
 * Sekme başlığı ve arama açıklaması arayüz dilinde.
 *
 * Başlık eskiden `titleMeta("settings.delete_account")` ile yalnız "Hesabı
 * sil"di: uygulamanın adı yoktu. Açıklama da yoktu, yani sayfa kök düzenin
 * genel tanımını ("A1–C1 kelimelerini on oyunla çalış…") ve o da yalnız
 * Türkçe miras alıyordu. Başlık artık sayfanın kendi `h1`i (uygulama adıyla),
 * açıklama da sayfanın ne anlattığını üç dilde söylüyor. İki hâl için aynı
 * üstveri geçerli: girişli ziyaretçi de aynı adreste.
 *
 * `noindex` YOK ve bilerek eklenmedi: sayfa herkese açık bir bilgi sayfası.
 * `robots.ts` `/account/`u taramaya kapatıyor; o bir tarama tercihi, sayfanın
 * erişilebilirliğiyle ilgisi yok.
 */
export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return { title: t("del.title"), description: t("del.meta_description") };
}

/**
 * Herkese açık hesap silme adresi (Google Play › Veri güvenliği › hesap silme
 * bağlantısı; App Store 5.1.1(v)). Üç hâl:
 *
 *   - giriş sistemi yok (yapılandırılmamış ortam): kapalı olduğunu söyler.
 *   - oturum yok: silmenin bütün yollarını, silinen ve saklanan veriyi ve
 *     giriş yapamayan için e-posta yolunu anlatan bilgi sayfası
 *     (`delete-info`). Oradan girişe gidilir ve giriş buraya döner.
 *   - oturum var: silme formu. Uygulama içindeki "Hesabı sil" ile aynı uç ve
 *     aynı kurallar.
 *
 * Oturumsuz hâl eskiden yalnız "önce giriş yap" diyordu. Play inceleyicisi
 * bağlantıyı tam o hâlde açıyor ve orada ne silindiğini, ne kaldığını,
 * aboneliğin ne olacağını ve giriş yapamayanın ne yapacağını görmesi gerekiyor
 * (mağaza ön inceleme raporu B17).
 */
export default async function AccountDeletePage() {
  const t = await getT();
  if (!authEnabled) {
    return (
      <AuthShell title={t("del.disabled")} subtitle={t("del.disabled_sub")}>
        <Link href="/" className="btn btn-primary w-full px-5 py-4">{t("common.home")}</Link>
      </AuthShell>
    );
  }
  let email: string | null = null;
  let signedIn = false;
  try {
    const data = await auth.api.getSession({ headers: await headers() });
    signedIn = Boolean(data?.user?.id);
    email = data?.user?.email ?? null;
  } catch {
    signedIn = false;
  }
  if (!signedIn) return <DeleteAccountInfo />;
  return <AccountDeleteForm email={email} />;
}
