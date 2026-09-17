import { adminGate, adminSecurityState, ADMIN_FRESH_HOURS } from "@/lib/admin";

export const dynamic = "force-dynamic";

/**
 * Bütün yönetim sayfalarının üst şeridi: yazma güvenliği durumu.
 *
 * 2FA'sız admin paneli OKUYABİLİR ama hiçbir şey değiştiremez; hassas
 * işlemler (silme, askıya alma, toplu bildirim, bakım, premium verme) ayrıca
 * son 12 saatte açılmış oturum ister (lib/admin `adminWriteGate`). İşlem
 * düğmesine basıp reddedilmeden önce bunu görmek gerekiyor.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const gate = await adminGate();
  const state = gate.ok ? await adminSecurityState() : null;
  return (
    <>
      {state && !state.twoFactor ? (
        <div role="status" className="px-4 py-2 text-center text-caption" style={{ background: "#dc2626", color: "#fff" }}>
          Hesabında iki adımlı doğrulama kapalı: panel yalnız okuma kipinde. Değişiklik yapmak için Profil › Ayarlar › Güvenlik&apos;ten aç.
        </div>
      ) : state && !state.freshForSensitive ? (
        <div role="status" className="px-4 py-2 text-center text-caption" style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}>
          Oturumun {ADMIN_FRESH_HOURS} saatten eski: hassas işlemler (silme, askıya alma, toplu bildirim, bakım, premium) için çıkış yapıp yeniden gir.
        </div>
      ) : null}
      {gate.ok ? (
        /* YÖNETİM GEZİNMESİ tek yerde: sayfalar çoğaldıkça bağlantılar
           pano başlığında sıkışıyordu ve alt sayfalardan geri dönüş tek
           "← Yönetim" bağlantısına kalmıştı. */
        <nav aria-label="Yönetim" className="mx-auto flex w-full max-w-6xl flex-wrap gap-1.5 px-4 pt-4 text-caption">
          {[
            ["/admin", "Pano"],
            ["/admin/users", "Kullanıcılar"],
            ["/admin/app", "Uygulama"],
            ["/admin/errors", "Hatalar"],
            ["/admin/moderation", "Moderasyon"],
            ["/admin/premium", "Premium"],
            ["/admin/quiz", "Haftalık quiz"],
            ["/admin/legal", "Hukuki metinler"],
            ["/admin/audit", "İşlem kaydı"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="chip h-8 px-3">{label}</a>
          ))}
        </nav>
      ) : null}
      {children}
    </>
  );
}
