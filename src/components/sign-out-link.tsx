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
    /*
      GÖRÜNÜM `btn btn-ghost`: ilk hâli altı çizili düz metindi ve başlıkta tema
      düğmesiyle birincil düğmenin arasında yamalı duruyordu. Aynı satırdaki üç
      öge aynı dili konuşmalı.
    */
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      {/* E-posta dar ekranda gizli: başlıkta yeri yok, taşarsa düğmeyi ekran
          dışına itiyor. Geniş ekranda duruyor çünkü "hangi hesap" sorusu çoğu
          zaman çıkışın sebebi. */}
      {email ? <span className="muted hidden text-caption sm:inline">{email}</span> : null}
      <button
        type="button"
        onClick={() => void out()}
        disabled={busy}
        className="btn btn-ghost px-3 py-2.5 text-body disabled:opacity-60"
      >
        {t("profile.log_out")}
      </button>
    </span>
  );
}
