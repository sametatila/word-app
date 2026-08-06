"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthNotice, AuthShell, authInputClass } from "@/components/auth-shell";
import { authApi } from "@/lib/auth/api";
import { translateAuthError } from "@/lib/auth/errors";

export function ResetPasswordForm({ token }: { token: string | null }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy || !token) return;
    if (password !== confirm) {
      setError("Parolalar eşleşmiyor.");
      return;
    }
    setBusy(true);
    setError(null);
    const res = await authApi("reset-password", { newPassword: password, token });
    setBusy(false);
    if (!res.ok) {
      setError(translateAuthError(res));
      return;
    }
    setDone(true);
    setTimeout(() => router.push("/login"), 1800);
  }

  if (!token) {
    return (
      <AuthShell
        title="Bağlantı geçersiz"
        subtitle="Sıfırlama bağlantısı eksik ya da süresi dolmuş."
        footer={
          <Link href="/login" className="underline-offset-4 hover:underline">
            Girişe dön
          </Link>
        }
      >
        <Link href="/forgot-password" className="btn btn-primary w-full px-5 py-3.5">
          Yeni bağlantı iste
        </Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Yeni parola belirle"
      subtitle={done ? undefined : "En az 8 karakter olsun."}
      footer={
        <Link href="/login" className="underline-offset-4 hover:underline">
          Girişe dön
        </Link>
      }
    >
      {done ? (
        <AuthNotice tone="success">
          Parolan güncellendi. Giriş ekranına yönlendiriliyorsun…
        </AuthNotice>
      ) : (
        <form onSubmit={submit} className="space-y-3">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            minLength={8}
            placeholder="Yeni parola"
            autoComplete="new-password"
            autoFocus
            className={authInputClass}
          />
          <input
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            type="password"
            required
            minLength={8}
            placeholder="Yeni parola (tekrar)"
            autoComplete="new-password"
            className={authInputClass}
          />
          {error ? <AuthNotice tone="error">{error}</AuthNotice> : null}
          <button
            type="submit"
            disabled={busy}
            className="btn btn-primary w-full px-5 py-3.5 disabled:opacity-60"
          >
            {busy ? "Kaydediliyor…" : "Parolayı güncelle"}
          </button>
        </form>
      )}
    </AuthShell>
  );
}
