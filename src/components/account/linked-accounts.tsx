"use client";

import { useEffect, useState } from "react";
import { SettingRow } from "@/components/setting-row";
import { useT } from "@/lib/i18n/client";

type Account = { id: string; provider: string; accountId: string };

const ETIKET: Record<string, { ad: string; alt: string }> = {
  credential: { ad: "links.credential", alt: "linked.credential_sub" },
  google: { ad: "linked.google", alt: "linked.google_sub" },
  apple: { ad: "linked.apple", alt: "linked.apple_sub" },
};

/**
 * Bağlı giriş yöntemleri — ekle, kaldır.
 *
 * NEDEN GEREKLİ: aynı e-postayla hem parola hem sosyal giriş kullanan kişi tek
 * hesapta olmalı. Sağlayıcı e-postayı DOĞRULANMIŞ bildirirse bağlama girişte
 * kendiliğinden oluyor (bkz. auth/server accountLinking); doğrulanmamışsa
 * bilerek olmuyor, çünkü doğrulanmamış adrese güvenmek hesap devralma yolu
 * açar. O durumda tek çıkış burası: kullanıcı kendi yöntemiyle girer ve
 * hesabını buradan bağlar.
 *
 * SON YÖNTEM SÖKÜLEMEZ. Sunucu da reddediyor (`allowUnlinkingAll: false`) ama
 * düğme hiç gösterilmiyor: kullanıcıya yapamayacağı bir şeyi teklif edip
 * hatayla geri çevirmek, en baştan teklif etmemekten kötü.
 */
export function LinkedAccounts({ googleEnabled }: { googleEnabled: boolean }) {
  const t = useT();
  const [accounts, setAccounts] = useState<Account[] | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  /** Bağlı hesapları getirir. Hata sessiz: liste boş görünür, sayfa çalışır. */
  const getir = (): Promise<Account[]> =>
    fetch("/api/auth/list-accounts", { headers: { accept: "application/json" } })
      .then((r) => (r.ok ? (r.json() as Promise<Account[]>) : []))
      .catch(() => []);

  useEffect(() => {
    let alive = true;
    getir().then((a) => { if (alive) setAccounts(a); });
    return () => { alive = false; };
  }, []);

  async function bagla(provider: string) {
    setBusy(provider);
    setMsg(null);
    try {
      const res = await fetch("/api/auth/link-social", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ provider, callbackURL: "/profile/settings" }),
      });
      const data = (await res.json().catch(() => null)) as { url?: string } | null;
      // Sağlayıcıya YÖNLENDİRME: better-auth izin ekranının adresini döndürüyor,
      // akışı istemci başlatıyor.
      if (res.ok && data?.url) {
        window.location.assign(data.url);
        return;
      }
      setMsg(t("linked.link_failed"));
    } catch {
      setMsg(t("linked.link_offline"));
    } finally {
      setBusy(null);
    }
  }

  async function kaldir(provider: string) {
    setBusy(provider);
    setMsg(null);
    try {
      const res = await fetch("/api/auth/unlink-account", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ providerId: provider }),
      });
      if (res.ok) {
        setAccounts(await getir());
        setMsg(t("links.unlinked"));
        return;
      }
      // Sökme TAZE oturum istiyor (freshAge 24 saat): çalınmış çerezle giriş
      // yöntemi kaldırılamasın diye. Kullanıcı bunu bilmiyor, söylenmeli.
      setMsg(
        res.status === 401 || res.status === 403
          ? t("links.need_fresh")
          : t("linked.unlink_failed"),
      );
    } catch {
      setMsg(t("linked.unlink_offline"));
    } finally {
      setBusy(null);
    }
  }

  if (!accounts) return null;

  const bagliMi = (p: string) => accounts.some((a) => a.provider === p);
  const sonYontem = accounts.length <= 1;
  const satirlar = [...new Set([...accounts.map((a) => a.provider), ...(googleEnabled ? ["google"] : [])])];

  return (
    <section id="accounts" className="mx-auto w-full max-w-md">
      <h2 className="mb-2 mt-6 px-1 text-sm font-bold">{t("links.title")}</h2>
      <div className="card divide-y divide-[var(--color-border)]">
        {satirlar.map((p) => {
          const bagli = bagliMi(p);
          const etiket = ETIKET[p] ?? { ad: p, alt: "" };
          const ad = ETIKET[p] ? t(etiket.ad) : p;
          return (
            <SettingRow key={p} title={ad} sub={bagli && etiket.alt ? t(etiket.alt) : t("links.not_linked")}>
              {bagli ? (
                sonYontem ? (
                  <span className="muted text-xs">{t("links.only_method")}</span>
                ) : (
                  <button className="btn-ghost text-xs" disabled={busy === p} onClick={() => void kaldir(p)}>
                    {busy === p ? "…" : t("links.unlink")}
                  </button>
                )
              ) : (
                <button className="btn text-xs" disabled={busy === p} onClick={() => void bagla(p)}>
                  {busy === p ? "…" : t("links.link")}
                </button>
              )}
            </SettingRow>
          );
        })}
      </div>
      <p className="muted mt-2 px-1 text-xs leading-snug">
        {t("links.hint")}
      </p>
      {msg ? <p className="mt-2 px-1 text-xs font-semibold">{msg}</p> : null}
    </section>
  );
}
