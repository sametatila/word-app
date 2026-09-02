import Link from "next/link";
import { AuthShell } from "@/components/auth-shell";
import { AccountDeleteForm } from "@/components/account-delete-form";
import { auth, authEnabled } from "@/lib/auth/server";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";
export const metadata = { title: "Hesabını sil" };

/**
 * Herkese açık hesap silme adresi (Google Play › Veri güvenliği › hesap silme
 * bağlantısı). Oturum yoksa girişe götürür ve sonra buraya döner; oturum varsa
 * silme formu. Uygulama içindeki "Hesabı sil" ile aynı uç ve aynı kurallar.
 */
export default async function AccountDeletePage() {
  if (!authEnabled) {
    return (
      <AuthShell title="Hesap silme kapalı" subtitle="Giriş sistemi bu ortamda yapılandırılmamış.">
        <Link href="/" className="btn btn-primary w-full px-5 py-3.5">Ana sayfa</Link>
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
  if (!signedIn) {
    return (
      <AuthShell
        title="Hesabını sil"
        subtitle="Hesabını ve tüm verilerini silmek için önce giriş yapman gerekiyor. Giriş yaptıktan sonra bu sayfaya dönersin."
        footer={<span>Uygulamada: Profil › Ayarlar › Hesap › Hesabı sil</span>}
      >
        <Link href="/login?next=/account/delete" className="btn btn-primary w-full px-5 py-3.5">
          Giriş yap
        </Link>
      </AuthShell>
    );
  }
  return <AccountDeleteForm email={email} />;
}
