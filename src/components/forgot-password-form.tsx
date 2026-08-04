"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth/client";
import { AuthNotice, AuthShell, authInputClass } from "@/components/auth-shell";
import { translateAuthError } from "@/lib/auth/errors";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await authClient.requestPasswordReset({
        email,
        redirectTo: `${window.location.origin}/sifre-sifirla`,
      });
      if (res?.error) {
        setError(translateAuthError(res.error));
        return;
      }
      setSent(true);
    } catch {
      setError("Bağlantı kurulamadı. Tekrar dene.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthShell
      title="Parolanı sıfırla"
      subtitle={
        sent
          ? undefined
          : "E-posta adresini gir, sana sıfırlama bağlantısı gönderelim."
      }
      footer={
        <Link href="/giris" className="underline-offset-4 hover:underline">
          Girişe dön
        </Link>
      }
    >
      {sent ? (
        <div className="space-y-3">
          <AuthNotice tone="success">
            <strong>{email}</strong> adresine sıfırlama bağlantısı gönderdik.
          </AuthNotice>
          <p className="muted text-sm">
            Bağlantı kısa süre geçerlidir. E-posta gelmediyse spam klasörüne bak; birkaç dakika
            sonra tekrar deneyebilirsin.
          </p>
          <button onClick={() => setSent(false)} className="btn btn-ghost w-full px-5 py-3">
            Başka bir adres dene
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-3">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="E-posta"
            autoComplete="email"
            autoFocus
            className={authInputClass}
          />
          {error ? <AuthNotice tone="error">{error}</AuthNotice> : null}
          <button
            type="submit"
            disabled={busy}
            className="btn btn-primary w-full px-5 py-3.5 disabled:opacity-60"
          >
            {busy ? "Gönderiliyor…" : "Sıfırlama bağlantısı gönder"}
          </button>
        </form>
      )}
    </AuthShell>
  );
}
