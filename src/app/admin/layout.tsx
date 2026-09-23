import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { adminGate, adminPreview, adminSecurityState, ADMIN_FRESH_HOURS } from "@/lib/admin";
import { openReportCount } from "@/lib/moderation-admin";
import { loadAlerts } from "./_data";
import { AdminNav } from "./_ui/nav";
import { Linkify } from "./_ui/ui";
import { APP_LINKS } from "@/lib/admin-links";

export const dynamic = "force-dynamic";
/* Panel hiçbir koşulda indekslenmesin (robots.txt'e ek; o yalnız bir rica). */
export const metadata: Metadata = { robots: { index: false, follow: false } };

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
  /*
    GERÇEK 404 (teknik denetim TEC-12). Yetkisiz istek önce sayfaya iniyor ve
    sayfa "yetkin yok" kartını 200 ile çiziyordu: panel var olduğunu söylüyor,
    tarayıcı/bot da 200 görüyordu. `notFound()` düzende, hiçbir `await`li
    Suspense sınırından önce çağrılınca Next.js yanıtı gerçekten 404 ile
    başlatıyor (bkz. next/dist/docs 02-guides/streaming "Status codes").
    Admin girişi `/login`den; bu sayfa artık kimseye ipucu vermiyor.
  */
  if (!gate.ok) notFound();
  const preview = adminPreview();
  const [state, openReports, alerts] = await Promise.all([
    preview ? null : adminSecurityState(),
    openReportCount().catch(() => 0),
    loadAlerts().then((a) => a.value).catch(() => []),
  ]);
  const alertCount = { critical: alerts.filter((a) => a.level === "kritik").length, warning: alerts.filter((a) => a.level === "uyari").length };
  /* Şerit yapılacak şeyi ADRESİYLE söylüyor (`Linkify` bağlantıya çeviriyor):
     "Profil › Ayarlar › Güvenlik" tarifi yerine doğrudan o bölüm. */
  const strip = preview
    ? { tone: "var(--color-brand)", text: "Yerel önizleme (ADMIN_PREVIEW): veri salt okunur, yazma işlemleri reddedilir." }
    : state && !state.twoFactor
      ? { tone: "var(--color-rose)", text: `Hesabında iki adımlı doğrulama kapalı: panel yalnız okuma kipinde. Açmak için: ${APP_LINKS.security.path}` }
      : state && !state.freshForSensitive
        ? { tone: "var(--color-flame)", text: `Oturumun ${ADMIN_FRESH_HOURS} saatten eski: hassas işlemler (silme, askıya alma, toplu bildirim, bakım, premium) için çıkış yapıp (/profile) yeniden gir.` }
        : null;

  return (
    <div className="min-h-dvh" style={{ background: "var(--bg)" }}>
      <header className="z-30 border-b sm:sticky sm:top-0" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        {strip ? (
          <div role="status" className="border-b px-4 py-1.5 text-center text-caption" style={{ borderColor: strip.tone, color: strip.tone, background: `color-mix(in srgb, ${strip.tone} 8%, var(--surface))` }}>
            <Linkify text={strip.text} />
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
