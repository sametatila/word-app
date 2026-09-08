"use client";

import { useEffect, useState } from "react";
import { SettingRow } from "@/components/setting-row";

type Account = { id: string; provider: string; accountId: string };

const ETIKET: Record<string, { ad: string; alt: string }> = {
  credential: { ad: "E-posta ve parola", alt: "Kayıt olurken kullandığın yöntem" },
  google: { ad: "Google", alt: "Google hesabınla tek dokunuşta giriş" },
  apple: { ad: "Apple", alt: "Apple ile giriş (iOS uygulaması)" },
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
      setMsg("Bağlanamadı. Biraz sonra tekrar dene.");
    } catch {
      setMsg("Bağlanamadı. İnternet bağlantını kontrol et.");
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
        setMsg("Bağlantı kaldırıldı.");
        return;
      }
      // Sökme TAZE oturum istiyor (freshAge 24 saat): çalınmış çerezle giriş
      // yöntemi kaldırılamasın diye. Kullanıcı bunu bilmiyor, söylenmeli.
      setMsg(
        res.status === 401 || res.status === 403
          ? "Güvenlik için yeniden giriş yapman gerekiyor; sonra tekrar dene."
          : "Kaldırılamadı. Biraz sonra tekrar dene.",
      );
    } catch {
      setMsg("Kaldırılamadı. İnternet bağlantını kontrol et.");
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
      <h2 className="mb-2 mt-6 px-1 text-sm font-bold">Giriş yöntemleri</h2>
      <div className="card divide-y divide-[var(--color-border)]">
        {satirlar.map((p) => {
          const bagli = bagliMi(p);
          const etiket = ETIKET[p] ?? { ad: p, alt: "" };
          return (
            <SettingRow key={p} title={etiket.ad} sub={bagli ? etiket.alt : "Bağlı değil"}>
              {bagli ? (
                sonYontem ? (
                  <span className="muted text-xs">Tek yöntemin</span>
                ) : (
                  <button className="btn-ghost text-xs" disabled={busy === p} onClick={() => void kaldir(p)}>
                    {busy === p ? "…" : "Kaldır"}
                  </button>
                )
              ) : (
                <button className="btn text-xs" disabled={busy === p} onClick={() => void bagla(p)}>
                  {busy === p ? "…" : "Bağla"}
                </button>
              )}
            </SettingRow>
          );
        })}
      </div>
      <p className="muted mt-2 px-1 text-xs leading-snug">
        Aynı e-postayla giriş yaptığında hesapların birleşir. Son giriş yöntemin kaldırılamaz.
      </p>
      {msg ? <p className="mt-2 px-1 text-xs font-semibold">{msg}</p> : null}
    </section>
  );
}
