import Link from "next/link";
import { getT } from "@/lib/i18n/server";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { authEnabled, getUserId, googleConfigured, appleWebConfigured } from "@/lib/auth/server";
import { AuthForm } from "@/components/auth-form";
import { titleMeta } from "@/lib/page-meta";
import { turnstileSiteKey } from "@/lib/auth/captcha";

export const dynamic = "force-dynamic";

export const generateMetadata = titleMeta("auth.sign_in");

export default async function LoginPage() {
  const t = await getT();
  if (!authEnabled) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="text-h2">{t("del.disabled")}</h1>
        {/* Sebep TEKNİK ve kullanıcıya söylenmiyordu — "giriş sağlayıcısının
            anahtarları tanımlı değil" cümlesi kurulumu yapan kişiye ait, giriş
            yapmaya çalışan kişiye değil. */}
        <p className="muted text-body">{t("del.disabled_sub")}</p>
        <Link href="/learn" className="btn btn-primary px-5 py-3">
          {t("loginw.continue_demo")}
        </Link>
      </div>
    );
  }

  const userId = await getUserId();
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
