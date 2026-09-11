"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AuthNotice, AuthShell } from "@/components/auth-shell";
import { authApi } from "@/lib/auth/api";
import { translateAuthError } from "@/lib/auth/errors";
import { InfoIcon } from "@/components/icons";
import { useT, useLang } from "@/lib/i18n/client";

const RESEND_COOLDOWN = 60;

export function VerifyEmailNotice({
  email,
  reason = "new",
}: {
  email: string | null;
  reason?: "new" | "blocked";
}) {
  const t = useT();
  const lang = useLang();
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
      setError(translateAuthError(res, lang));
      return;
    }
    setSent(true);
    setCooldown(RESEND_COOLDOWN);
  }

  return (
    <AuthShell
      title={t(reason === "blocked" ? "verify.title_blocked" : "verify.title")}
      subtitle={
        reason === "blocked"
          ? email
            ? t("verify.blocked_with_email", { email })
            : t("verify.blocked")
          : email
            ? t("verify.sent_with_email", { email })
            : t("verify.sent")
      }
      footer={
        <Link href="/login" className="underline-offset-4 hover:underline">
          {t("auth.back_to_sign_in")}
        </Link>
      }
    >
      <div className="space-y-3">
        <div
          className="flex gap-2 rounded-panel px-3 py-2.5 text-body"
          style={{ background: "var(--surface-2)" }}
        >
          <span className="mt-0.5 shrink-0 text-[color:var(--color-brand)]">
            <InfoIcon size={16} />
          </span>
          <div className="muted space-y-1">
            <p>{t("verify.tips_title")}</p>
            <p>· {t("verify.tip_spam")}</p>
            <p>· {t("verify.tip_contacts")}</p>
            <p>· {t("verify.tip_wrong_address")}</p>
          </div>
        </div>

        {sent ? <AuthNotice tone="success">{t("verify.resent")}</AuthNotice> : null}
        {error ? <AuthNotice tone="error">{error}</AuthNotice> : null}

        {email ? (
          <button
            onClick={() => void resend()}
            disabled={busy || cooldown > 0}
            className="btn btn-ghost w-full px-5 py-3 disabled:opacity-60"
          >
            {busy
              ? t("authw.sending")
              : cooldown > 0
                ? t("verify.resend_in", { n: cooldown })
                : t("verify.resend")}
          </button>
        ) : null}

        <Link href="/login" className="btn btn-primary w-full px-5 py-3.5">
          {t("verify.verified_sign_in")}
        </Link>
      </div>
    </AuthShell>
  );
}
