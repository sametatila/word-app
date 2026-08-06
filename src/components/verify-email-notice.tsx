"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AuthNotice, AuthShell } from "@/components/auth-shell";
import { authApi } from "@/lib/auth/api";
import { translateAuthError } from "@/lib/auth/errors";
import { InfoIcon } from "@/components/icons";

const RESEND_COOLDOWN = 60;

export function VerifyEmailNotice({
  email,
  reason = "new",
}: {
  email: string | null;
  reason?: "new" | "blocked";
}) {
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  // Arka arkaya gönderim hız sınırına takılmasın diye geri sayım.
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  async function resend() {
    if (busy || cooldown > 0 || !email) return;
    setBusy(true);
    setError(null);
    setSent(false);
    const res = await authApi("send-verification-email", {
      email,
      callbackURL: `${window.location.origin}/learn`,
    });
    setBusy(false);
    if (!res.ok) {
      setError(translateAuthError(res));
      return;
    }
    setSent(true);
    setCooldown(RESEND_COOLDOWN);
  }

  return (
    <AuthShell
      title={reason === "blocked" ? "Önce e-postanı doğrula" : "E-postanı doğrula"}
      subtitle={
        reason === "blocked"
          ? email
            ? `${email} hesabı henüz doğrulanmadı. Giriş yapabilmek için gelen kutundaki bağlantıya tıklaman gerekiyor.`
            : "Hesabın henüz doğrulanmadı. Giriş yapabilmek için gelen kutundaki bağlantıya tıklaman gerekiyor."
          : email
            ? `${email} adresine bir doğrulama bağlantısı gönderdik.`
            : "Kayıt sırasında verdiğin adrese bir doğrulama bağlantısı gönderdik."
      }
      footer={
        <Link href="/login" className="underline-offset-4 hover:underline">
          Girişe dön
        </Link>
      }
    >
      <div className="space-y-3">
        <div
          className="flex gap-2 rounded-xl px-3 py-2.5 text-sm"
          style={{ background: "var(--surface-2)" }}
        >
          <span className="mt-0.5 shrink-0 text-[color:var(--color-brand-500)]">
            <InfoIcon size={16} />
          </span>
          <div className="muted space-y-1">
            <p>E-posta birkaç dakika içinde gelmezse:</p>
            <p>· <strong>Spam / Gereksiz</strong> klasörünü kontrol et</p>
            <p>· Gönderen adresini kişilerine ekle, sonraki e-postalar doğrudan gelsin</p>
            <p>· Adresi yanlış yazdıysan yeni bir hesapla kaydolabilirsin</p>
          </div>
        </div>

        {sent ? <AuthNotice tone="success">Doğrulama e-postası yeniden gönderildi.</AuthNotice> : null}
        {error ? <AuthNotice tone="error">{error}</AuthNotice> : null}

        {email ? (
          <button
            onClick={() => void resend()}
            disabled={busy || cooldown > 0}
            className="btn btn-ghost w-full px-5 py-3 disabled:opacity-60"
          >
            {busy
              ? "Gönderiliyor…"
              : cooldown > 0
                ? `Tekrar gönder (${cooldown} sn)`
                : "Tekrar gönder"}
          </button>
        ) : null}

        <Link href="/login" className="btn btn-primary w-full px-5 py-3.5">
          Doğruladım, giriş yap
        </Link>
      </div>
    </AuthShell>
  );
}
