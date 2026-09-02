import Link from "next/link";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { authEnabled, getUserId } from "@/lib/auth/server";
import { AuthForm } from "@/components/auth-form";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (!authEnabled) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="text-xl font-bold">Giriş kapalı</h1>
        <p className="muted text-sm">
          Neon Auth anahtarları tanımlı değil. Uygulama şu an demo modunda çalışıyor.
        </p>
        <Link href="/learn" className="btn btn-primary px-5 py-3">
          Demo ile devam et
        </Link>
      </div>
    );
  }

  const userId = await getUserId();
  if (userId) redirect("/learn");

  // AuthForm useSearchParams okuyor (?next=): Suspense sınırı gerekir.
  return <Suspense fallback={null}><AuthForm /></Suspense>;
}
