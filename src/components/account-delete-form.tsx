"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthNotice, AuthShell, authInputClass } from "@/components/auth-shell";
import { authApi } from "@/lib/auth/api";

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
      if (msg.includes("password")) setError("Parola yanlış.");
      else if (msg.includes("session") || msg.includes("expired")) setNeedsFresh(true);
      else setError("Silinemedi. Birkaç saniye sonra tekrar dene.");
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
      <AuthShell title="Hesabın silindi" subtitle="Verilerin kaldırıldı. Seni tanımak güzeldi.">
        <AuthNotice tone="success">Ana sayfaya yönlendiriliyorsun…</AuthNotice>
      </AuthShell>
    );
  }

  if (needsFresh) {
    return (
      <AuthShell
        title="Önce yeniden giriş yap"
        subtitle="Güvenlik için hesap silme, son 24 saat içinde açılmış bir oturum ister."
        footer={
          <Link href="/profile/settings" className="underline-offset-4 hover:underline">
            Ayarlara dön
          </Link>
        }
      >
        <button type="button" onClick={reLogin} className="btn btn-primary w-full px-5 py-3.5">
          Çıkış yap ve yeniden gir
        </button>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Hesabını sil"
      subtitle={email ? `${email} hesabı kalıcı olarak silinecek.` : "Hesabın kalıcı olarak silinecek."}
      footer={
        <Link href="/profile/settings" className="underline-offset-4 hover:underline">
          Vazgeç, ayarlara dön
        </Link>
      }
    >
      <ul className="muted mb-4 list-disc space-y-1 pl-5 text-sm">
        <li>Kelime ilerlemen, serilerin, XP ve başarımların silinir.</li>
        <li>Yazıların, konuşma kayıtların ve değerlendirmelerin silinir.</li>
        <li>Arkadaşlıkların ve gelen kutun silinir.</li>
        <li>Google Play aboneliğin varsa onu Play Store üzerinden ayrıca iptal etmen gerekir.</li>
        <li>Bu işlem geri alınamaz.</li>
      </ul>

      <form onSubmit={submit} className="space-y-3">
        {hasPassword ? (
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            placeholder="Parolan"
            autoComplete="current-password"
            className={authInputClass}
          />
        ) : hasPassword === null ? (
          <p className="muted text-sm">Hesap bilgisi alınıyor…</p>
        ) : (
          <p className="muted text-sm">Google ile girdiğin için parola gerekmiyor.</p>
        )}

        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1" />
          <span>Verilerimin kalıcı olarak silineceğini anladım.</span>
        </label>

        {error ? <AuthNotice tone="error">{error}</AuthNotice> : null}

        <button
          type="submit"
          disabled={busy || !agree || hasPassword === null || (hasPassword && password.length === 0)}
          className="btn w-full px-5 py-3.5 font-bold text-white disabled:opacity-50"
          style={{ background: "var(--color-rose-500)" }}
        >
          {busy ? "Siliniyor…" : "Hesabımı kalıcı olarak sil"}
        </button>
      </form>
    </AuthShell>
  );
}
