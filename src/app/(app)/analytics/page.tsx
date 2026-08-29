import type { Metadata } from "next";
import { getUserId } from "@/lib/auth/server";
import { computeFunnel } from "@/lib/funnel";

export const metadata: Metadata = { title: "Huni" };
export const dynamic = "force-dynamic";

/**
 * Dönüşüm hunisi görünümü (dönüşüm planı §4 — "funnel measurement"). Ham
 * olaylar (hem web hem mobil `/api/events`) burada huniye dönüşür: aktivasyon,
 * D1/D7/D30 retention, paywall görüntüleme → satın alma. İç ölçüm sayfası.
 */
function Stat({ label, value, sub, tone }: { label: string; value: string; sub?: string; tone?: "good" | "warn" | "bad" }) {
  const color = tone === "good" ? "var(--color-mint-600)" : tone === "warn" ? "var(--color-flame)" : tone === "bad" ? "var(--color-rose-600)" : "var(--text)";
  return (
    <div className="card px-4 py-3">
      <div className="text-2xl font-extrabold" style={{ color }}>{value}</div>
      <div className="muted text-xs font-semibold uppercase tracking-wide">{label}</div>
      {sub ? <div className="muted mt-0.5 text-[11px]">{sub}</div> : null}
    </div>
  );
}

function pct(n: number, d: number): string {
  return d > 0 ? `%${Math.round((n / d) * 100)}` : "—";
}

export default async function AnalyticsPage() {
  const userId = await getUserId();
  if (!userId) return null;
  const f = await computeFunnel();
  const maxEvent = f.topEvents[0]?.count ?? 1;

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 pb-10">
      <div>
        <h1 className="text-2xl font-extrabold">Dönüşüm hunisi</h1>
        <p className="muted text-sm">Aktivasyon · retention · gelir — canlı olaylardan (web + mobil).</p>
      </div>

      <section>
        <h2 className="mb-2 text-xs font-bold uppercase tracking-wide muted">Genel</h2>
        <div className="grid grid-cols-3 gap-3">
          <Stat label="Toplam kullanıcı" value={String(f.totalUsers)} />
          <Stat label="Aktive olan" value={String(f.activated)} sub="ilk turu bitirdi" tone="good" />
          <Stat label="Aktivasyon oranı" value={pct(f.activated, f.totalUsers)} tone="warn" />
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-xs font-bold uppercase tracking-wide muted">Retention (kohort {f.retentionBase})</h2>
        <div className="grid grid-cols-3 gap-3">
          <Stat label="D1" value={`%${f.d1}`} sub="1. gün döndü" />
          <Stat label="D7" value={`%${f.d7}`} sub="7. gün döndü" />
          <Stat label="D30" value={`%${f.d30}`} sub="30. gün döndü" />
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-xs font-bold uppercase tracking-wide muted">Paywall hunisi</h2>
        <div className="card divide-y" style={{ borderColor: "var(--border)" }}>
          {[
            { k: "Paywall görüntüleme", v: f.paywallView, base: f.totalUsers },
            { k: "Satın alma başlattı", v: f.purchaseStart, base: f.paywallView },
            { k: "Satın alma tamamladı", v: f.purchaseDone, base: f.purchaseStart },
          ].map((row) => (
            <div key={row.k} className="flex items-center justify-between px-4 py-2.5" style={{ borderColor: "var(--border)" }}>
              <span className="text-sm font-semibold">{row.k}</span>
              <span className="text-sm">
                <b>{row.v}</b> <span className="muted text-xs">({pct(row.v, row.base)} önceki adımdan)</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-xs font-bold uppercase tracking-wide muted">En çok olay</h2>
        <div className="space-y-1.5">
          {f.topEvents.length === 0 ? (
            <p className="muted text-sm">Henüz olay yok.</p>
          ) : (
            f.topEvents.map((e) => (
              <div key={e.name} className="flex items-center gap-3">
                <code className="w-40 shrink-0 text-xs">{e.name}</code>
                <div className="h-4 flex-1 overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}>
                  <div className="h-full rounded-full" style={{ width: `${Math.max(3, Math.round((e.count / maxEvent) * 100))}%`, background: "var(--color-brand)" }} />
                </div>
                <span className="w-12 text-right text-xs font-bold">{e.count}</span>
              </div>
            ))
          )}
        </div>
      </section>

      <p className="muted text-center text-xs">
        Kaynak: <code>events</code> tablosu · huni ham olaylardan hesaplanır (§4 ölçüm katmanı).
      </p>
    </div>
  );
}
