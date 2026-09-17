import { adminGate, adminPreview, adminSecurityState, ADMIN_FRESH_HOURS } from "@/lib/admin";
import { openReportCount } from "@/lib/moderation-admin";
import { loadAlerts } from "./_data";
import { AdminNav } from "./_ui/nav";

export const dynamic = "force-dynamic";

/**
 * Bütün yönetim sayfalarının kabuğu: üst şerit (ad + gezinme) ve yazma
 * güvenliği durumu.
 *
 * 2FA'sız admin paneli OKUYABİLİR ama hiçbir şey değiştiremez; hassas
 * işlemler (silme, askıya alma, toplu bildirim, bakım, premium verme) ayrıca
 * son 12 saatte açılmış oturum ister (lib/admin `adminWriteGate`). İşlem
 * düğmesine basıp reddedilmeden önce bunu görmek gerekiyor.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const gate = await adminGate();
  if (!gate.ok) return <>{children}</>;
  const preview = adminPreview();
  const [state, openReports, alerts] = await Promise.all([
    preview ? null : adminSecurityState(),
    openReportCount().catch(() => 0),
    loadAlerts().then((a) => a.value).catch(() => []),
  ]);
  const alertCount = { critical: alerts.filter((a) => a.level === "kritik").length, warning: alerts.filter((a) => a.level === "uyari").length };
  const strip = preview
    ? { tone: "var(--color-brand)", text: "Yerel önizleme (ADMIN_PREVIEW): veri salt okunur, yazma işlemleri reddedilir." }
    : state && !state.twoFactor
      ? { tone: "var(--color-rose)", text: "Hesabında iki adımlı doğrulama kapalı: panel yalnız okuma kipinde. Değişiklik için Profil › Ayarlar › Güvenlik'ten aç." }
      : state && !state.freshForSensitive
        ? { tone: "var(--color-flame)", text: `Oturumun ${ADMIN_FRESH_HOURS} saatten eski: hassas işlemler (silme, askıya alma, toplu bildirim, bakım, premium) için çıkış yapıp yeniden gir.` }
        : null;

  return (
    <div className="min-h-dvh" style={{ background: "var(--bg)" }}>
      <header className="z-30 border-b sm:sticky sm:top-0" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        {strip ? (
          <div role="status" className="border-b px-4 py-1.5 text-center text-caption" style={{ borderColor: strip.tone, color: strip.tone, background: `color-mix(in srgb, ${strip.tone} 8%, var(--surface))` }}>
            {strip.text}
          </div>
        ) : null}
        <div className="mx-auto w-full max-w-6xl px-4 pt-2.5 pb-1 sm:px-6">
          <div className="flex items-baseline gap-2 pb-1">
            <span className="text-strong">Lernomi</span>
            <span className="muted text-caption">Yönetim</span>
            {gate.email ? <span className="faint ml-auto hidden truncate text-caption sm:inline">{gate.email}</span> : null}
          </div>
          <AdminNav openReports={openReports} alerts={alertCount} />
        </div>
      </header>
      {children}
    </div>
  );
}
