"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/client";
import { AuthNotice, AuthShell, authInputClass } from "@/components/auth-shell";
import { translateAuthError } from "@/lib/auth/errors";

type Mode = "signin" | "signup";

export function AuthForm() {
  const router = useRouter();
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
        const res = await authClient.signIn.email({ email, password });
        if (res?.error) {
          setError(translateAuthError(res.error));
          return;
        }
        router.push("/learn");
        router.refresh();
        return;
      }

      const res = await authClient.signUp.email({
        email,
        password,
        name: name.trim() || email.split("@")[0],
      });
      if (res?.error) {
        setError(translateAuthError(res.error));
        return;
      }

      // E-posta doğrulaması zorunluysa oturum açılmaz; kullanıcıyı bilgilendir.
      const { data: session } = await authClient.getSession();
      if (session?.user) {
        router.push("/learn");
        router.refresh();
      } else {
        router.push(`/eposta-dogrula?email=${encodeURIComponent(email)}`);
      }
    } catch {
      setError("Bağlantı kurulamadı. Tekrar dene.");
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
          href="/sifremi-unuttum"
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
