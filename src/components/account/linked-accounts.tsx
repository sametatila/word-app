"use client";

import { useEffect, useState } from "react";
import { SettingRow } from "@/components/setting-row";
import { ChangePassword } from "@/components/account/change-password";
import { ActiveSessions } from "@/components/account/active-sessions";
import { TwoFactor } from "@/components/account/two-factor";
import { useT } from "@/lib/i18n/client";
import { Group, Row } from "@/components/settings-section";

/**
 * better-auth `/list-accounts` yanıtı. Alan adı `providerId` — `provider` DEĞİL.
 *
 * Burada `provider` yazıyordu ve `r.json() as Promise<Account[]>` denetimsiz
 * bir tip ATAMASI olduğu için TypeScript hiçbir şey söylemiyordu: alan her
 * satırda undefined dönüyordu. Ekranda görünen sonucu şuydu — e-posta/parola
 * satırı ETİKETSİZ çiziliyor ve yanında "Kaldır" duruyor, Google ile giriş
 * yapmış kullanıcıya ise "Bağlı değil · Bağla" deniyordu. Mobil tarafta aynı
 * hata bugün düzeltildi (lib/accountLinks.ts), web'de kalmıştı.
 */
type Account = { id: string; providerId: string; accountId: string };

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
export function LinkedAccounts({
  googleEnabled,
  nameRow,
}: {
  googleEnabled: boolean;
  /**
   * HESAP grubunun ilk satırı — görünen ad kutusu. Formun durumuna ait
   * olduğu için `profile-form`da çiziliyor ama YERİ burası: grup kartını
   * bu bileşen kuruyor (sağlayıcı listesini okuyan tek yer o).
   */
  nameRow?: React.ReactNode;
}) {
  const t = useT();
  const [accounts, setAccounts] = useState<Account[] | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  /** Bağlı hesapları getirir. Hata sessiz: liste boş görünür, sayfa çalışır. */
  const getir = (): Promise<Account[]> =>
    fetch("/api/auth/list-accounts", { headers: { accept: "application/json" } })
      .then((r) => (r.ok ? (r.json() as Promise<Partial<Account>[]>) : []))
      // Süzgeç şart: yukarıdaki `as` doğrulama değil, ATAMA. Alan adı bir kez
      // değişti ve fark edilmedi; artık biçimi tutmayan satır listeye girmiyor.
      .then((rows) => (Array.isArray(rows) ? rows : []).filter((a): a is Account => typeof a?.providerId === "string"))
      .catch(() => []);

  useEffect(() => {
    let alive = true;
    getir().then((a) => { if (alive) setAccounts(a); });
    return () => { alive = false; };
  }, []);

  /*
   * BAĞLANDI DENİYOR. Kaldırma zaten bir ileti gösteriyordu ama bağlama
   * göstermiyordu: kullanıcı sağlayıcıya gidip geri dönüyor ve karşısında
   * sessiz bir sayfa buluyordu — satırın durumunun değiştiğini fark etmesi
   * gerekiyordu. Android iki işlemi de sözle onaylıyor.
   *
   * İz adresten hemen siliniyor; sayfa tazelenince eski bir onay yeniden
   * çıkmasın.
   */
  useEffect(() => {
    const url = new URL(window.location.href);
    if (!url.searchParams.get("linked")) return;
    setMsg(t("links.linked"));
    url.searchParams.delete("linked");
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
  }, [t]);

  async function bagla(provider: string) {
    setBusy(provider);
    setMsg(null);
    try {
      const res = await fetch("/api/auth/link-social", {
        method: "POST",
        headers: { "content-type": "application/json" },
        // Dönüş adresine BİR İZ bırakılıyor: sağlayıcıdan dönen kullanıcıya
        // bağlantının kurulduğu söylenebilsin diye (aşağıdaki effect).
        body: JSON.stringify({ provider, callbackURL: `/profile/settings?linked=${provider}#social` }),
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
      setMsg(t("links.link_offline"));
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
      setMsg(t("links.unlink_offline"));
    } finally {
      setBusy(null);
    }
  }

  if (!accounts) return null;

  const bagliMi = (p: string) => accounts.some((a) => a.providerId === p);
  const sonYontem = accounts.length <= 1;
  const satirlar = [...new Set([...accounts.map((a) => a.providerId), ...(googleEnabled ? ["google"] : [])])];

  return (
    <>
      {/* GİRİŞ YÖNTEMLERİ artık HESAP grubunun içinde bir satır; parola, iki
          adımlı doğrulama ve etkin oturumlar da kendi gruplarında birer satır.
          Üçü de eskiden bu bölümün İÇİNDEYDİ ve etiket onları anlatmıyordu. */}
      <Group title={t("settings.group_account")}>
        {nameRow}
        <Row label={t("links.title")}>
          <div className="-my-2 divide-y divide-[color:var(--hairline)]">
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
          {msg ? <p role="status" className="mt-2 text-xs font-semibold">{msg}</p> : null}
        </Row>
      </Group>

      <Group title={t("settings.group_security")} id="accounts">
        {/* Parola değiştirme YALNIZ parolası olan hesapta. Bu bileşen zaten
            sağlayıcı listesini okuyor, ikinci bir istek atmaya gerek yok;
            `credential` yoksa (yalnız Google/Apple ile girmiş biri) form hiç
            çizilmiyor — olmayan bir parolayı sormak anlamsız olurdu. */}
        {bagliMi("credential") ? <ChangePassword /> : null}

        {/* İki adımlı doğrulama da parolalı hesaba bağlı: açma ve kapatma
            parola istiyor (better-auth zorunlu tutuyor) ve ikinci adımın
            koruduğu şey zaten parolalı giriş. */}
        {bagliMi("credential") ? <TwoFactor /> : null}

        {/* Etkin oturumlar HER hesapta: yalnız Google ile giren biri de
            telefonunu kaybedebilir. Parola değiştirmenin aksine bu, giriş
            yöntemine bağlı değil. */}
        <ActiveSessions />
      </Group>
    </>
  );
}
