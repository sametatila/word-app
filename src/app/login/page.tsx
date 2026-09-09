import Link from "next/link";
import { getT } from "@/lib/i18n/server";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { authEnabled, getUserId } from "@/lib/auth/server";
import { AuthForm } from "@/components/auth-form";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const t = await getT();
  if (!authEnabled) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="text-xl font-bold">{t("del.disabled")}</h1>
        {/* Sebep TEKNİK ve kullanıcıya söylenmiyordu — "Neon Auth anahtarları
            tanımlı değil" cümlesi kurulumu yapan kişiye ait, giriş yapmaya
            çalışan kişiye değil. Üstelik sağlayıcı artık better-auth. */}
        <p className="muted text-sm">{t("del.disabled_sub")}</p>
        <Link href="/learn" className="btn btn-primary px-5 py-3">
          {t("loginw.continue_demo")}
        </Link>
      </div>
    );
  }

  const userId = await getUserId();
  if (userId) redirect("/learn");

  // AuthForm useSearchParams okuyor (?next=): Suspense sınırı gerekir.
  return <Suspense fallback={null}><AuthForm /></Suspense>;
}
