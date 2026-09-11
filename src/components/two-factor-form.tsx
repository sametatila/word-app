"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthNotice, AuthShell, authInputClass } from "@/components/auth-shell";
import { authApi } from "@/lib/auth/api";
import { translateAuthError } from "@/lib/auth/errors";
import { TWO_FACTOR_CODE_DIGITS, TWO_FACTOR_CODE_MINUTES, TWO_FACTOR_TRUST_DAYS } from "@/lib/auth/two-factor-config";
import { useT, useLang } from "@/lib/i18n/client";

/** Yeni kod istemeden önce beklenecek süre; sıfırlama ekranıyla aynı. */
const RESEND_COOLDOWN = 60;

/**
 * Girişin İKİNCİ adımı — e-postaya gelen kod.
 *
 * Buraya nasıl gelindi: parola doğru olduğunda sunucu oturumu AÇMIYOR,
 * `twoFactorRedirect` dönüyor ve kısa ömürlü imzalı bir çerez bırakıyor
 * (better-auth two-factor). Yani bu sayfa oturumsuz ama "parolayı bilen"
 * bir ziyaretçiyle konuşuyor; kimliği taşıyan tek şey o çerez.
 *
 * KOD AÇILIŞTA GÖNDERİLİYOR. Kullanıcının ayrıca bir düğmeye basması
 * gerekseydi, ekranda kod bekleyen ama hiç kod istememiş biri kalırdı.
 * Bir kez: React aynı efekti iki kez çalıştırabildiği için nöbetçi var,
 * yoksa her açılışta iki posta giderdi.
 *
 * Çerez düşmüşse (10 dakika) uç hata veriyor; o durumda ekran girişe geri
 * yolluyor — burada tekrar denemenin bir anlamı yok.
 */
export function TwoFactorForm() {
  const t = useT();
  const lang = useLang();
  const router = useRouter();
  const params = useSearchParams();
  const nextParam = params.get("next");
  const next = nextParam && /^\/[a-z0-9\-\/]*$/i.test(nextParam) && !nextParam.startsWith("//") ? nextParam : "/learn";

  const [code, setCode] = useState("");
  const [trust, setTrust] = useState(false);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expired, setExpired] = useState(false);
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN);
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    void authApi("two-factor/send-otp", {}).then((res) => {
      if (!res.ok) setExpired(true);
    });
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setTimeout(() => setCooldown((n) => n - 1), 1000);
    return () => clearTimeout(id);
  }, [cooldown]);

  async function tekrar() {
    if (busy || cooldown > 0) return;
    setBusy(true);
    setError(null);
    setNote(null);
    const res = await authApi("two-factor/send-otp", {});
    setBusy(false);
    if (!res.ok) {
      setExpired(true);
      return;
    }
    setNote(t("twofa.resent"));
    setCooldown(RESEND_COOLDOWN);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    setNote(null);
    const res = await authApi("two-factor/verify-otp", { code: code.trim(), trustDevice: trust });
    setBusy(false);
    if (!res.ok) {
      setError(translateAuthError(res, lang));
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <AuthShell
      title={t("twofa.verify_title")}
      subtitle={expired ? undefined : t("twofa.verify_sub", { n: TWO_FACTOR_CODE_MINUTES })}
      footer={
        <Link href="/login" className="underline-offset-4 hover:underline">
          {t("auth.back_to_sign_in")}
        </Link>
      }
    >
      {expired ? (
        <AuthNotice tone="error">{t("twofa.expired")}</AuthNotice>
      ) : (
        <form onSubmit={submit} className="space-y-3">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            /*
              `inputMode="numeric"` + `autoComplete="one-time-code"`: telefonda
              sayı tuş takımı açılıyor ve işletim sistemi gelen postadaki kodu
              kendisi öneriyor. Tip `text` kalıyor — `number` baştaki sıfırı
              yiyor ve ok tuşlarıyla kodu "artırılabilir" bir şeye çeviriyor.
            */
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            required
            maxLength={TWO_FACTOR_CODE_DIGITS}
            placeholder={t("twofa.code")}
            autoFocus
            className={`${authInputClass} text-center text-2xl tracking-[0.4em]`}
          />

          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={trust}
              onChange={(e) => setTrust(e.target.checked)}
              className="mt-1"
            />
            <span>
              {t("twofa.trust")}
              <span className="muted block text-xs leading-snug">{t("twofa.trust_note", { n: TWO_FACTOR_TRUST_DAYS })}</span>
            </span>
          </label>

          {note ? <AuthNotice tone="success">{note}</AuthNotice> : null}
          {error ? <AuthNotice tone="error">{error}</AuthNotice> : null}

          <button type="submit" disabled={busy} className="btn btn-primary w-full px-5 py-3.5 disabled:opacity-60">
            {busy ? t("authw.wait") : t("twofa.verify")}
          </button>

          <button
            type="button"
            onClick={tekrar}
            disabled={busy || cooldown > 0}
            className="muted w-full text-center text-sm underline-offset-4 hover:underline disabled:no-underline disabled:opacity-60"
          >
            {cooldown > 0 ? `${t("twofa.resend")} (${cooldown})` : t("twofa.resend")}
          </button>
        </form>
      )}
    </AuthShell>
  );
}
