"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/auth/api";
import { useT } from "@/lib/i18n/client";

/**
 * Çıkış bağlantısı — oturumun her yerden kapatılabilmesi için.
 *
 * NEDEN AYRI BİR BİLEŞEN. Çıkış tek yerde vardı: Profil ekranı. Ama profile
 * ulaşmak `(app)` düzeninden geçiyor ve o düzen onboarding'i bitirmemiş
 * kullanıcıyı `/setup`e yolluyor. Sonucu bir DÖNGÜ: kayıt olan kullanıcı
 * kurulumu yarıda bırakırsa ana sayfadaki her düğme onu `/learn`e, `/learn` de
 * `/setup`e atıyor ve çıkacak bir kapı hiç görünmüyor. Yanlış hesapla giriş
 * yapan ya da vazgeçen kullanıcı orada kilitleniyordu.
 *
 * Oturumu kapatmak hiçbir koşulda ulaşılamaz olmamalı — mağaza inceleyicisi de
 * ilk açılışta tam bu ekrana düşüyor.
 */
export function SignOutLink({ email, className }: { email?: string | null; className?: string }) {
  const t = useT();
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function out() {
    if (busy) return;
    setBusy(true);
    try {
      await authApi("sign-out", {});
    } catch {
      /* oturum zaten düşmüş olabilir; gidilecek yer yine aynı */
    }
    // Ana sayfaya: `/login` çıkışın hemen ardından tekrar giriş dayatır gibi
    // duruyor. Kullanıcı vazgeçtiyse vitrine dönmeli.
    router.push("/");
    router.refresh();
  }

  return (
    <p className={className}>
      {/* Hangi hesapla girildiği YAZILIYOR: kullanıcı çoğu zaman yanlış hesapla
          girdiği için çıkmak istiyor ve adresi görmeden emin olamıyor. */}
      {email ? <span className="muted">{email}</span> : null}
      {email ? <span className="muted"> · </span> : null}
      <button
        type="button"
        onClick={() => void out()}
        disabled={busy}
        className="underline underline-offset-4 disabled:opacity-60"
      >
        {t("profile.log_out")}
      </button>
    </p>
  );
}
