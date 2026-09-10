"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthNotice, AuthShell, authInputClass } from "@/components/auth-shell";
import { authApi } from "@/lib/auth/api";
import { translateAuthError } from "@/lib/auth/errors";
import { checkPassword, MIN_PASSWORD_LENGTH } from "@/lib/auth/password-policy";
import { useT, useLang } from "@/lib/i18n/client";

export function ResetPasswordForm({ token }: { token: string | null }) {
  const t = useT();
  const lang = useLang();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  /*
    Kayıt formundaki kuralın AYNISI (lib/auth/password-policy) — burada da
    yalnız anında geri bildirim için, kapı sunucuda. Kimlik (e-posta/ad)
    VERİLMİYOR: sıfırlama gövdesi yalnız yeni parolayı ve jetonu taşıyor,
    sunucu da o yolda kimlik kuralını çalıştıramıyor. Burada sormak, sunucunun
    reddetmeyeceği bir şeyi reddetmek olurdu.
  */
  const passwordProblem = checkPassword(password);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy || !token) return;
    if (password !== confirm) {
      setError(t("auth.passwords_dont_match"));
      return;
    }
    setBusy(true);
    setError(null);
    const res = await authApi("reset-password", { newPassword: password, token });
    setBusy(false);
    if (!res.ok) {
      setError(translateAuthError(res, lang));
      return;
    }
    setDone(true);
    setTimeout(() => router.push("/login"), 1800);
  }

  if (!token) {
    return (
      <AuthShell
        title={t("authw.link_invalid")}
        subtitle={t("authw.link_invalid_sub")}
        footer={
          <Link href="/login" className="underline-offset-4 hover:underline">
            {t("auth.back_to_sign_in")}
          </Link>
        }
      >
        <Link href="/forgot-password" className="btn btn-primary w-full px-5 py-3.5">
          {t("authw.request_new_link")}
        </Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title={t("authw.set_new_password")}
      subtitle={done ? undefined : t("authw.password_rule", { n: MIN_PASSWORD_LENGTH })}
      footer={
        <Link href="/login" className="underline-offset-4 hover:underline">
          {t("auth.back_to_sign_in")}
        </Link>
      }
    >
      {done ? (
        <AuthNotice tone="success">
          {t("authw.password_updated")}
        </AuthNotice>
      ) : (
        <form onSubmit={submit} className="space-y-3">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            minLength={MIN_PASSWORD_LENGTH}
            placeholder={t("authw.new_password")}
            autoComplete="new-password"
            autoFocus
            className={authInputClass}
          />
          <input
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            type="password"
            required
            minLength={MIN_PASSWORD_LENGTH}
            placeholder={t("authw.new_password_again")}
            autoComplete="new-password"
            className={authInputClass}
          />
          {/* Canlı geri bildirim — kayıt formundaki kutunun aynısı
              (components/auth-form). Eskiden yoktu: kullanıcı yaygın bir parola
              yazıp gönderiyor, kuralı ancak sunucunun reddinden öğreniyordu. */}
          {password ? (
            <div id="reset-password-hint" aria-live="polite">
              <AuthNotice tone={passwordProblem ? "error" : "success"}>
                {passwordProblem
                  ? t(
                      passwordProblem === "too_short"
                        ? "autherror.password_min_length"
                        : passwordProblem === "too_common"
                          ? "autherror.password_too_common"
                          : "autherror.password_contains_identity",
                    )
                  : t("auth.password_ok")}
              </AuthNotice>
            </div>
          ) : null}
          {error ? <AuthNotice tone="error">{error}</AuthNotice> : null}
          <button
            type="submit"
            disabled={busy}
            className="btn btn-primary w-full px-5 py-3.5 disabled:opacity-60"
          >
            {t(busy ? "rounds.saving" : "authw.update_password")}
          </button>
        </form>
      )}
    </AuthShell>
  );
}
