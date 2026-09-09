"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthNotice, AuthShell, authInputClass } from "@/components/auth-shell";
import { authApi } from "@/lib/auth/api";
import { useT } from "@/lib/i18n/client";

type Account = { providerId?: string };

/**
 * Hesap silme (web) — Play Console'daki "hesap silme adresi" bu sayfadır ve
 * uygulama içindeki akışla aynı ucu kullanır: POST /api/auth/delete-user.
 *
 * İki kapı var: parola hesabı parolasını yazar; yalnız Google ile girmiş hesap
 * "taze" oturum (24 saat) ister, eskiyse yeniden giriş yapması söylenir.
 * Silme geri alınamaz; ne gideceği düğmeden önce açıkça listelenir.
 */
export function AccountDeleteForm({ email }: { email: string | null }) {
  const t = useT();
  const router = useRouter();
  const [hasPassword, setHasPassword] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsFresh, setNeedsFresh] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    authApi<Account[]>("list-accounts").then((r) => {
      setHasPassword(r.ok && Array.isArray(r.data) ? r.data.some((a) => a.providerId === "credential") : false);
    });
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy || !agree) return;
    setBusy(true);
    setError(null);
    const res = await authApi("delete-user", hasPassword ? { password } : {});
    setBusy(false);
    if (!res.ok) {
      const msg = res.message.toLowerCase();
      if (msg.includes("password")) setError(t("autherror.password_wrong"));
      else if (msg.includes("session") || msg.includes("expired")) setNeedsFresh(true);
      else setError(t("del.failed"));
      return;
    }
    setDone(true);
    setTimeout(() => {
      router.push("/");
      router.refresh();
    }, 2200);
  }

  async function reLogin() {
    await authApi("sign-out", {});
    router.push("/login?next=/account/delete");
    router.refresh();
  }

  if (done) {
    return (
      <AuthShell title={t("deleteaccount.your_account_is_deleted")} subtitle={t("deleteaccount.your_data_is_gone_it_was_good_to")}>
        <AuthNotice tone="success">{t("del.redirecting")}</AuthNotice>
      </AuthShell>
    );
  }

  if (needsFresh) {
    return (
      <AuthShell
        title={t("deleteaccount.sign_in_again_first")}
        subtitle={t("deleteaccount.for_security_deleting_your")}
        footer={
          <Link href="/profile/settings" className="underline-offset-4 hover:underline">
            {t("del.back_to_settings")}
          </Link>
        }
      >
        <button type="button" onClick={reLogin} className="btn btn-primary w-full px-5 py-3.5">
          {t("del.sign_out_and_in")}
        </button>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title={t("deleteaccount.delete_account")}
      subtitle={t("deleteaccount.and_everything_tied_to_it_will", {
        account: email ? t("deleteaccount.account", { email }) : t("deleteaccount.your_account"),
      })}
      footer={
        <Link href="/profile/settings" className="underline-offset-4 hover:underline">
          {t("del.cancel_back")}
        </Link>
      }
    >
      {/* Liste ve altındaki abonelik notu mobil ekranın sırasıyla aynı:
          silinecekler madde madde, mağaza uyarısı ayrı. "Geri alınamaz"
          cümlesi listeden çıktı — başlığın altındaki cümle zaten söylüyor. */}
      <ul className="muted mb-3 list-disc space-y-1 pl-5 text-sm">
        <li>{t("deleteaccount.your_word_progress_streaks_xp")}</li>
        <li>{t("deleteaccount.your_writing_speaking_records")}</li>
        <li>{t("deleteaccount.your_friendships_and_your_inbox")}</li>
        <li>{t("deleteaccount.your_account_and_your_email")}</li>
      </ul>
      <p className="muted mb-4 text-xs">{t("deleteaccount.subscription_cancel_play")}</p>

      <form onSubmit={submit} className="space-y-3">
        {hasPassword ? (
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            placeholder={t("deleteaccount.your_password")}
            autoComplete="current-password"
            className={authInputClass}
          />
        ) : hasPassword === null ? (
          <p className="muted text-sm">{t("del.loading_account")}</p>
        ) : (
          <p className="muted text-sm">{t("deleteaccount.you_signed_in_with_google_so_no")}</p>
        )}

        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1" />
          <span>{t("deleteaccount.i_understand_my_data_will_be")}</span>
        </label>

        {error ? <AuthNotice tone="error">{error}</AuthNotice> : null}

        <button
          type="submit"
          disabled={busy || !agree || hasPassword === null || (hasPassword && password.length === 0)}
          className="btn w-full px-5 py-3.5 font-bold text-white disabled:opacity-50"
          style={{ background: "var(--color-rose-500)" }}
        >
          {t(busy ? "deleteaccount.deleting" : "deleteaccount.permanently_delete_my_account")}
        </button>
      </form>
    </AuthShell>
  );
}
