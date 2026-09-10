"use client";

import { useEffect, useState } from "react";
import { AuthNotice, authInputClass } from "@/components/auth-shell";
import { authApi } from "@/lib/auth/api";
import { translateAuthError } from "@/lib/auth/errors";
import { useT, useLang } from "@/lib/i18n/client";

/**
 * İki adımlı doğrulama — aç / kapat.
 *
 * Parola tek başına yeterli olduğu sürece sızmış bir parola hesabın tamamı
 * demek. Açıkken giriş, parolaya EK OLARAK e-posta kutusuna gelen bir kodu
 * şart koşuyor (sunucu tarafı: auth/server two-factor).
 *
 * PAROLA İSTİYOR — hem açarken hem kapatırken, ve bu better-auth'un koşulu:
 * oturumu ele geçiren biri ikinci adımı sessizce kaldıramasın. Kapatmanın
 * parola istemesi, açmanınkinden daha önemli.
 *
 * BEDELİ AÇIKÇA YAZIYOR: kod e-postaya gidiyor, yani posta kutusunu kaybeden
 * kullanıcı hesabını da kaybediyor. Parola sıfırlama da aynı kutuya bağlı
 * olduğundan durum bugünkünden kötü değil — ama kullanıcı bunu açmadan ÖNCE
 * bilmeli.
 *
 * YALNIZ PAROLASI OLAN HESAPTA görünüyor (çağıran karar veriyor, bkz.
 * linked-accounts): yalnız Google ile giren birine parola sormak, olmayan bir
 * şeyi istemek olurdu.
 */
export function TwoFactor() {
  const t = useT();
  const lang = useLang();
  /** null: durum henüz bilinmiyor — kart hiçbir şey iddia etmiyor. */
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/auth/get-session", { headers: { accept: "application/json" }, cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j: { user?: { twoFactorEnabled?: boolean } } | null) => {
        if (alive) setEnabled(Boolean(j?.user?.twoFactorEnabled));
      })
      .catch(() => { if (alive) setEnabled(false); });
    return () => { alive = false; };
  }, []);

  function kapat() {
    setOpen(false);
    setPassword("");
    setError(null);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy || enabled === null) return;
    setBusy(true);
    setError(null);
    /*
      Açarken `method: "otp"` AÇIKÇA veriliyor. Varsayılan "totp" ve o yol
      kimlik doğrulayıcı uygulama kurulumu bekliyor; bizde kapalı, yani
      varsayılana bırakmak isteği sunucuda hataya çevirirdi.
    */
    const res = enabled
      ? await authApi("two-factor/disable", { password })
      : await authApi("two-factor/enable", { password, method: "otp" });
    setBusy(false);
    if (!res.ok) {
      setError(translateAuthError(res, lang));
      return;
    }
    setEnabled(!enabled);
    setNote(t(enabled ? "twofa.disabled_note" : "twofa.enabled_note"));
    kapat();
  }

  return (
    <section className="mx-auto mt-4 w-full max-w-3xl">
      <p className="muted mb-2 ml-1 text-caption tracking-wide">{t("twofa.title")}</p>
      <div className="card p-4">
        {note ? <AuthNotice tone="success">{note}</AuthNotice> : null}

        {open ? (
          <form onSubmit={submit} className="space-y-3">
            {enabled ? null : <AuthNotice tone="error">{t("twofa.mail_warning")}</AuthNotice>}
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              placeholder={t("twofa.password_label")}
              autoComplete="current-password"
              className={authInputClass}
            />
            {error ? <AuthNotice tone="error">{error}</AuthNotice> : null}
            <div className="flex gap-2">
              <button type="submit" disabled={busy} className="btn btn-primary flex-1 px-4 py-3 disabled:opacity-60">
                {t(enabled ? "twofa.disable" : "twofa.enable")}
              </button>
              <button type="button" onClick={kapat} className="btn btn-ghost px-4 py-3">
                {t("changepw.cancel")}
              </button>
            </div>
          </form>
        ) : (
          <div className="flex items-center justify-between gap-3">
            <p className="muted text-sm leading-snug">
              {t(enabled ? "twofa.on_sub" : "twofa.off_sub")}
            </p>
            <button
              type="button"
              disabled={enabled === null}
              onClick={() => { setOpen(true); setNote(null); }}
              className="btn shrink-0 text-xs disabled:opacity-60"
            >
              {t(enabled ? "twofa.disable" : "twofa.enable")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
