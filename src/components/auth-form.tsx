"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthNotice, AuthShell, authInputClass } from "@/components/auth-shell";
import { authApi, type SignUpResponse } from "@/lib/auth/api";
import { isEmailNotVerified, translateAuthError } from "@/lib/auth/errors";

type Mode = "signin" | "signup";

export function AuthForm() {
  const router = useRouter();
  // Girişten sonra dönülecek yer (ör. /account/delete). Yalnız site içi yol kabul edilir.
  const params = useSearchParams();
  const nextParam = params.get("next");
  const next = nextParam && /^\/[a-z0-9\-\/]*$/i.test(nextParam) && !nextParam.startsWith("//") ? nextParam : "/learn";
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);

    try {
      if (mode === "signin") {
        // `rememberMe` açık: oturum çerezi tarayıcı kapanınca silinen bir
        // "oturum çerezi" değil, son kullanma tarihi olan kalıcı bir çerez
        // olarak yazılıyor. Varsayılan da bu, ama ana ekrana eklenmiş
        // uygulamada oturumun kapanmaması bu tek bayrağa bağlı olduğu için
        // açıkça yazılıyor — sessizce değişmesi "her açılışta giriş" demek.
        const res = await authApi("sign-in/email", { email, password, rememberMe: true });
        if (!res.ok) {
          // Doğrulanmamış hesap bir hata değil, eksik bir adım: kullanıcıyı oraya al.
          if (isEmailNotVerified(res)) {
            router.push(`/verify-email?email=${encodeURIComponent(email)}&status=unverified`);
            return;
          }
          setError(translateAuthError(res));
          return;
        }
        router.push(next);
        router.refresh();
        return;
      }

      const res = await authApi<SignUpResponse>("sign-up/email", {
        email,
        password,
        name: name.trim() || email.split("@")[0],
      });
      if (!res.ok) {
        setError(translateAuthError(res));
        return;
      }

      // Oturum açılmadıysa (token yok / e-posta doğrulanmamış) doğrulama ekranına.
      const verified = res.data?.user?.emailVerified === true;
      const hasSession = Boolean(res.data?.token) || verified;
      if (hasSession) {
        router.push(next);
        router.refresh();
      } else {
        router.push(`/verify-email?email=${encodeURIComponent(email)}&status=new`);
      }
    } finally {
      setBusy(false);
    }
  }

  async function startSocial(provider: string) {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/sign-in/social", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ provider, callbackURL: `${window.location.origin}/learn` }),
      });
      const j = (await res.json().catch(() => null)) as { url?: string } | null;
      if (res.ok && j?.url) {
        window.location.href = j.url;
        return;
      }
      setError("Sosyal giriş şu an kullanılamıyor. E-posta ile devam edebilirsin.");
    } catch {
      setError("Bağlantı kurulamadı. İnternetini kontrol et.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthShell
      title={mode === "signin" ? "Tekrar hoş geldin" : "Hesap oluştur"}
      subtitle={
        mode === "signin"
          ? "Serini kaldığın yerden sürdür."
          : "Birkaç saniye sürer, ilk kelimen hazır."
      }
      footer={
        <Link href="/" className="underline-offset-4 hover:underline">
          Ana sayfaya dön
        </Link>
      }
    >
      <button
        type="button"
        onClick={() => startSocial("google")}
        disabled={busy}
        className="flex w-full items-center justify-center gap-2.5 rounded-xl border px-4 py-3 text-base font-bold disabled:opacity-60"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden>
          <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
          <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
          <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
          <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
        </svg>
        Google ile devam et
      </button>
      <div className="my-4 flex items-center gap-3">
        <div className="h-px flex-1" style={{ background: "var(--border)" }} />
        <span className="muted text-xs font-semibold">ya da e-posta ile</span>
        <div className="h-px flex-1" style={{ background: "var(--border)" }} />
      </div>

      <form onSubmit={submit} className="space-y-3">
        {mode === "signup" ? (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Adın (isteğe bağlı)"
            autoComplete="name"
            className={authInputClass}
          />
        ) : null}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          placeholder="E-posta"
          autoComplete="email"
          className={authInputClass}
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
          minLength={8}
          placeholder="Parola (en az 8 karakter)"
          autoComplete={mode === "signin" ? "current-password" : "new-password"}
          className={authInputClass}
        />

        {error ? <AuthNotice tone="error">{error}</AuthNotice> : null}

        <button
          type="submit"
          disabled={busy}
          className="btn btn-primary w-full px-5 py-3.5 disabled:opacity-60"
        >
          {busy ? "Bekle…" : mode === "signin" ? "Giriş yap" : "Kayıt ol"}
        </button>
      </form>

      {mode === "signin" ? (
        <Link
          href="/forgot-password"
          className="muted mt-3 block text-center text-sm underline-offset-4 hover:underline"
        >
          Şifremi unuttum
        </Link>
      ) : null}

      <button
        onClick={() => {
          setMode(mode === "signin" ? "signup" : "signin");
          setError(null);
        }}
        className="muted mt-4 w-full text-center text-sm underline-offset-4 hover:underline"
      >
        {mode === "signin" ? "Hesabın yok mu? Kayıt ol" : "Zaten hesabın var mı? Giriş yap"}
      </button>
    </AuthShell>
  );
}
