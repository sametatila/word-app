import Link from "next/link";
import { titleMeta } from "@/lib/page-meta";
import { AuthShell } from "@/components/auth-shell";
import { AccountDeleteForm } from "@/components/account-delete-form";
import { auth, authEnabled } from "@/lib/auth/server";
import { headers } from "next/headers";
import { getT } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";
export const generateMetadata = titleMeta("settings.delete_account");
/**
 * Herkese açık hesap silme adresi (Google Play › Veri güvenliği › hesap silme
 * bağlantısı). Oturum yoksa girişe götürür ve sonra buraya döner; oturum varsa
 * silme formu. Uygulama içindeki "Hesabı sil" ile aynı uç ve aynı kurallar.
 */
export default async function AccountDeletePage() {
  const t = await getT();
  if (!authEnabled) {
    return (
      <AuthShell title={t("del.disabled")} subtitle={t("del.disabled_sub")}>
        <Link href="/" className="btn btn-primary w-full px-5 py-3.5">{t("common.home")}</Link>
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
        title={t("land.delete_account")}
        subtitle={t("del.sign_in_first")}
        footer={<span>{t("del.in_app_path")}</span>}
      >
        <Link href="/login?next=/account/delete" className="btn btn-primary w-full px-5 py-3.5">
          {t("auth.sign_in")}
        </Link>
      </AuthShell>
    );
  }
  return <AccountDeleteForm email={email} />;
}
