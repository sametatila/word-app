"use client";

import { useState } from "react";
import { AuthNotice, authInputClass } from "@/components/auth-shell";
import { authApi } from "@/lib/auth/api";
import { translateAuthError } from "@/lib/auth/errors";
import { checkPassword, MIN_PASSWORD_LENGTH } from "@/lib/auth/password-policy";
import { useT, useLang } from "@/lib/i18n/client";
import { Row } from "@/components/settings-section";

/**
 * Giriş yapmış kullanıcının parolasını değiştirmesi.
 *
 * Uç sunucuda baştan hazırdı (`/api/auth/change-password`; parola ölçütü de
 * onu süzüyor, bkz. auth/server hooks.before) ama ÇAĞIRAN YOKTU: parolasını
 * değiştirmek isteyen kişinin tek yolu çıkış yapıp "parolamı unuttum"
 * akışından geçmekti.
 *
 * `revokeOtherSessions` AÇIK gönderiliyor. Parola değiştirmenin yaygın sebebi
 * "başkası girmiş olabilir" kaygısı; öteki oturumları ayakta bırakmak o
 * kaygıya cevap vermez. Sıfırlama akışı da aynı şeyi yapıyor
 * (revokeSessionsOnPasswordReset), ikisi tutarlı.
 *
 * YALNIZ PAROLASI OLAN HESAPTA görünüyor: çağıran bunu `credential`
 * sağlayıcısına bakarak karar veriyor (bkz. linked-accounts). Yalnız Google
 * ile giren birine "şu anki parolan" sormak, olmayan bir şeyi istemek olurdu.
 */
export function ChangePassword() {
  const t = useT();
  const lang = useLang();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sunucudaki kuralın aynısı, yalnız anında geri bildirim için (kapı sunucuda).
  const problem = checkPassword(next);

  function kapat() {
    setOpen(false);
    setCurrent("");
    setNext("");
    setConfirm("");
    setError(null);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    if (next !== confirm) {
      setError(t("auth.passwords_dont_match"));
      return;
    }
    setBusy(true);
    setError(null);
    const res = await authApi("change-password", {
      currentPassword: current,
      newPassword: next,
      revokeOtherSessions: true,
    });
    setBusy(false);
    if (!res.ok) {
      setError(translateAuthError(res, lang));
      return;
    }
    setDone(true);
    kapat();
  }

  return (
    <Row label={t("settings.sec_password")}>
        {done ? <AuthNotice tone="success">{t("changepw.done")}</AuthNotice> : null}

        {open ? (
          <form onSubmit={submit} className="space-y-3">
            <input
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              type="password"
              required
              placeholder={t("changepw.current")}
              autoComplete="current-password"
              className={authInputClass}
            />
            <input
              value={next}
              onChange={(e) => setNext(e.target.value)}
              type="password"
              required
              minLength={MIN_PASSWORD_LENGTH}
              placeholder={t("changepw.new")}
              autoComplete="new-password"
              className={authInputClass}
            />
            <input
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              type="password"
              required
              minLength={MIN_PASSWORD_LENGTH}
              placeholder={t("changepw.again")}
              autoComplete="new-password"
              className={authInputClass}
            />
            {next ? (
              <div aria-live="polite">
                <AuthNotice tone={problem ? "error" : "success"}>
                  {problem
                    ? t(
                        problem === "too_short"
                          ? "autherror.password_min_length"
                          : problem === "too_common"
                            ? "autherror.password_too_common"
                            : "autherror.password_contains_identity",
                        { n: MIN_PASSWORD_LENGTH },
                      )
                    : t("auth.password_ok")}
                </AuthNotice>
              </div>
            ) : null}
            {error ? <AuthNotice tone="error">{error}</AuthNotice> : null}
            <div className="flex gap-2">
              <button type="submit" disabled={busy} className="btn btn-primary flex-1 px-4 py-3 disabled:opacity-60">
                {t(busy ? "changepw.saving" : "changepw.save")}
              </button>
              <button type="button" onClick={kapat} className="btn btn-ghost px-4 py-3">
                {t("changepw.cancel")}
              </button>
            </div>
          </form>
        ) : (
          <div className="flex items-center justify-between gap-3">
            <p className="muted text-body leading-snug">{t("changepw.sub")}</p>
            <button
              type="button"
              onClick={() => { setOpen(true); setDone(false); }}
              className="btn shrink-0 text-caption"
            >
              {t("changepw.open")}
            </button>
          </div>
        )}
    </Row>
  );
}
