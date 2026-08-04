"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth/client";
import { AuthNotice, AuthShell } from "@/components/auth-shell";
import { translateAuthError } from "@/lib/auth/errors";

export function VerifyEmailNotice({ email }: { email: string | null }) {
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function resend() {
    if (busy || !email) return;
    setBusy(true);
    setError(null);
    setSent(false);
    try {
      const res = await authClient.sendVerificationEmail({
        email,
        callbackURL: `${window.location.origin}/learn`,
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
      title="E-postanı doğrula"
      subtitle={
        email
          ? `${email} adresine bir doğrulama bağlantısı gönderdik.`
          : "Kayıt sırasında verdiğin adrese bir doğrulama bağlantısı gönderdik."
      }
      footer={
        <Link href="/giris" className="underline-offset-4 hover:underline">
          Girişe dön
        </Link>
      }
    >
      <div className="space-y-3">
        <p className="muted text-sm">
          Bağlantıya tıkladığında hesabın aktifleşir ve doğrudan öğrenmeye başlarsın. E-posta
          gelmediyse spam klasörünü kontrol et.
        </p>

        {sent ? <AuthNotice tone="success">Doğrulama e-postası yeniden gönderildi.</AuthNotice> : null}
        {error ? <AuthNotice tone="error">{error}</AuthNotice> : null}

        {email ? (
          <button
            onClick={() => void resend()}
            disabled={busy}
            className="btn btn-ghost w-full px-5 py-3 disabled:opacity-60"
          >
            {busy ? "Gönderiliyor…" : "Tekrar gönder"}
          </button>
        ) : null}

        <Link href="/giris" className="btn btn-primary w-full px-5 py-3.5">
          Doğruladım, giriş yap
        </Link>
      </div>
    </AuthShell>
  );
}
