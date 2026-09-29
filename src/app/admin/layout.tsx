import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adminGate, adminPreview, adminSecurityState, ADMIN_FRESH_HOURS } from "@/lib/admin";
import type { QueueSummary } from "@/lib/response-queue";
import { loadAlerts, loadPulse, loadResponses } from "./_data";
import { AdminRail, AdminSections, type BadgeTone, type NavCounts } from "./_ui/nav";
import { PulseStrip } from "./_ui/pulse";
import { Linkify } from "./_ui/ui";
import { APP_LINKS } from "@/lib/admin-links";

export const dynamic = "force-dynamic";
/* Panel hiçbir koşulda indekslenmesin (robots.txt'e ek; o yalnız bir rica). */
export const metadata: Metadata = { robots: { index: false, follow: false } };

/**
 * Bütün yönetim sayfalarının kabuğu:
 *
 *   üst çubuk      ad, beş bölüm (rozetli), hesap
 *   güvenlik       yazma kipinin durumu (varsa)
 *   gösterge       her sayfada aynı dört küçük grafik (`_ui/pulse`)
 *   sol çubuk      seçili bölümün sayfaları (`_ui/nav`), dar ekranda yatay
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
  const [state, alerts, queues, pulse] = await Promise.all([
    preview ? null : adminSecurityState(),
    loadAlerts().then((a) => a.value).catch(() => []),
    loadResponses().then((q) => q.value).catch((): QueueSummary[] => []),
    loadPulse().then((p) => p.value).catch(() => null),
  ]);
  const counts = navCounts(alerts, queues);
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
        <div className="flex h-14 items-center gap-3 px-4 lg:gap-5 lg:px-5">
          <Link href="/admin" className="flex shrink-0 items-baseline gap-1.5">
            <span className="text-strong">Lernomi</span>
            <span className="muted hidden text-caption md:inline">Yönetim</span>
          </Link>
          <AdminSections counts={counts} />
          {gate.email ? <span className="faint ml-auto hidden shrink-0 truncate text-caption xl:inline">{gate.email}</span> : null}
        </div>
      </header>
      {strip ? (
        <div role="status" className="border-b px-4 py-1.5 text-center text-caption" style={{ borderColor: strip.tone, color: strip.tone, background: `color-mix(in srgb, ${strip.tone} 8%, var(--surface))` }}>
          <Linkify text={strip.text} />
        </div>
      ) : null}
      {pulse ? <PulseStrip metrics={pulse.metrics} days={pulse.days} failed={pulse.issues.length > 0} /> : null}
      <div className="lg:flex">
        <AdminRail counts={counts} />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}

/**
 * Menü rozetleri. Uyarılar Telegram'la aynı listeden; kuyruklar Genel
 * durumdaki "Geri dönüş bekleyenler" ile aynı özetten (`lib/response-queue`).
 * Ton: süresi geçen iş ya da kritik uyarı kırmızı, yaklaşan sarı, gerisi gri.
 */
function navCounts(alerts: { level: "kritik" | "uyari" }[], queues: QueueSummary[]): NavCounts {
  const q = (...ids: QueueSummary["queue"][]) => {
    const xs = queues.filter((x) => ids.includes(x.queue));
    const tone: BadgeTone = xs.some((x) => x.late) ? "bad" : xs.some((x) => x.soon) ? "warn" : "muted";
    return { n: xs.reduce((a, x) => a + x.open, 0), tone };
  };
  const critical = alerts.filter((a) => a.level === "kritik").length;
  return {
    alerts: { n: alerts.length, tone: critical ? "bad" : "warn" },
    reports: q("user_report", "ai_report"),
    feedback: q("content_feedback"),
    reviews: q("store_review"),
  };
}
