"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthNotice, AuthShell, authInputClass } from "@/components/auth-shell";
import { authApi } from "@/lib/auth/api";
import { translateAuthError } from "@/lib/auth/errors";
import { useT, useLang } from "@/lib/i18n/client";
import { Turnstile } from "@/components/turnstile";
import { CAPTCHA_ACTION } from "@/lib/auth/captcha-action";

export function ForgotPasswordForm({ turnstileSiteKey = "" }: { turnstileSiteKey?: string }) {
  const t = useT();
  const lang = useLang();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  /* Bot koruması — gerekçe ve tek kullanımlık jeton notu: auth-form.tsx. */
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaNonce, setCaptchaNonce] = useState(0);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    const res = await authApi(
      "request-password-reset",
      { email, redirectTo: `${window.location.origin}/reset-password` },
      captchaToken,
    );
    setBusy(false);
    setCaptchaNonce((n) => n + 1);
    if (!res.ok) {
      setError(translateAuthError(res, lang));
      return;
    }
    setSent(true);
  }

  return (
    <AuthShell
      title={t("authw.reset_title")}
      subtitle={
        sent
          ? undefined
          : t("auth.enter_your_email_and_we_ll_send")
      }
      footer={
        <Link href="/login" className="underline-offset-4 hover:underline">
          {t("auth.back_to_sign_in")}
        </Link>
      }
    >
      {sent ? (
        <div className="space-y-3">
          <AuthNotice tone="success">
            {t("auth.we_sent_reset_link_to_if_that", { email })}
          </AuthNotice>
          <p className="muted text-body">
            {t("authw.reset_sent_note")}
          </p>
          <button onClick={() => setSent(false)} className="btn btn-ghost w-full px-5 py-3">
            {t("authw.try_another_address")}
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-3">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            enterKeyHint="go"
            required
            placeholder={t("auth.email")}
            aria-label={t("auth.email")}
            autoComplete="email"
            autoFocus
            autoCapitalize="none"
            spellCheck={false}
            className={authInputClass}
          />
          {error ? <AuthNotice tone="error">{error}</AuthNotice> : null}
          {turnstileSiteKey ? (
            <div className="space-y-2">
              <Turnstile
                siteKey={turnstileSiteKey}
                action={CAPTCHA_ACTION}
                resetSignal={captchaNonce}
                onToken={setCaptchaToken}
              />
              {captchaToken ? null : (
                <p className="muted text-center text-caption" aria-live="polite">
                  {t("auth.captcha_wait")}
                </p>
              )}
            </div>
          ) : null}
          <button
            type="submit"
            disabled={busy || (Boolean(turnstileSiteKey) && !captchaToken)}
            className="btn btn-primary w-full px-5 py-4 disabled:opacity-60"
          >
            {t(busy ? "authw.sending" : "auth.send_reset_link")}
          </button>
        </form>
      )}
    </AuthShell>
  );
}
