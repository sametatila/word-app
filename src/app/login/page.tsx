import Link from "next/link";
import { getT } from "@/lib/i18n/server";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { authEnabled, getAccountUserId, googleConfigured, appleWebConfigured } from "@/lib/auth/server";
import { AuthForm } from "@/components/auth-form";
import { AuthShell } from "@/components/auth-shell";
import { titleMeta } from "@/lib/page-meta";
import { turnstileSiteKey } from "@/lib/auth/captcha";

export const dynamic = "force-dynamic";

export const generateMetadata = titleMeta("auth.sign_in");

export default async function LoginPage() {
  const t = await getT();
  if (!authEnabled) {
    return (
      /* Sebep TEKNİK ve kullanıcıya söylenmiyordu — "giriş sağlayıcısının
         anahtarları tanımlı değil" cümlesi kurulumu yapan kişiye ait, giriş
         yapmaya çalışan kişiye değil. */
      <AuthShell title={t("del.disabled")} subtitle={t("del.disabled_sub")}>
        <Link href="/learn" className="btn btn-primary w-full px-5 py-4">
          {t("loginw.continue_demo")}
        </Link>
      </AuthShell>
    );
  }

  // Misafir oturumu girişsiz sayılıyor: uygulama düzeni misafiri buraya yolluyor.
  const userId = await getAccountUserId();
  if (userId) redirect("/learn");

  // AuthForm useSearchParams okuyor (?next=): Suspense sınırı gerekir.
  /*
    Sağlayıcılar SUNUCUDA çözülüyor, istemcide değil: `/api/config`e gidip
    beklemek düğmelerin sonradan belirmesi demek olurdu. Apple için sorulan şey
    TARAYICI akışı — webde native yol yok.
  */
  return (
    <Suspense fallback={null}>
      <AuthForm
        providers={{ google: googleConfigured, apple: appleWebConfigured }}
        turnstileSiteKey={turnstileSiteKey}
      />
    </Suspense>
  );
}
