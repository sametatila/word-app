"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthNotice, AuthShell, authInputClass } from "@/components/auth-shell";
import { authApi } from "@/lib/auth/api";
import { translateAuthError } from "@/lib/auth/errors";
import { useT, useLang } from "@/lib/i18n/client";

export function ResetPasswordForm({ token }: { token: string | null }) {
  const t = useT();
  const lang = useLang();
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
      setError(t("authw.passwords_dont_match"));
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
      subtitle={done ? undefined : t("authw.at_least_8")}
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
            minLength={8}
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
            minLength={8}
            placeholder={t("authw.new_password_again")}
            autoComplete="new-password"
            className={authInputClass}
          />
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
