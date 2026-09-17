import type { Metadata } from "next";
import { adminGate } from "@/lib/admin";
import { storeReviews, summarizeReviews, type StoreReview } from "@/lib/store-reviews";
import { androidVitals, ANR_THRESHOLD, CRASH_THRESHOLD, type VitalsSeries } from "@/lib/android-vitals";

export const metadata: Metadata = { title: "Mağaza" };
export const dynamic = "force-dynamic";

/**
 * lernomi.app/admin/reviews — App Store ve Google Play yorumları (yalnız okuma).
 *
 * Kompakt: mağaza başına tek satır özet (ortalama, yıldız dağılımı, son 30 gün,
 * cevapsız 1-2 yıldız), altında en yeni yorumlar. Önce cevapsız düşük puanlılar:
 * mağaza sıralamasını en çok onlar etkiliyor ve cevap mağaza konsolundan
 * veriliyor (bu sayfa yazmaz). Kaynak ve anahtar kurgusu `lib/store-reviews`.
 */
const STORE: Record<string, string> = { ios: "App Store", android: "Google Play" };
const CONSOLE: Record<string, string> = {
  ios: "https://appstoreconnect.apple.com/apps/6810593275/distribution/activity/ios/ratingsResponses",
  android: "https://play.google.com/console/developers/app/user-feedback/reviews",
};
const starsText = (n: number) => "★".repeat(n) + "☆".repeat(Math.max(0, 5 - n));

export default async function AdminReviewsPage({ searchParams }: { searchParams: Promise<{ taze?: string }> }) {
  const gate = await adminGate();
  if (!gate.ok) {
    return (
      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        <h1 className="text-h1">Mağaza: kalite ve yorumlar</h1>
        <p className="mt-3 text-body" style={{ color: "var(--text-muted)" }}>Yönetim yetkisi gerekiyor.</p>
      </div>
    );
  }
  const fresh = (await searchParams).taze === "1";
  const [{ results, at }, vitals] = await Promise.all([storeReviews(fresh), androidVitals(fresh)]);
  const all: StoreReview[] = results.flatMap((r) => r.reviews);
  const ordered = [...all].sort((a, b) => {
    const pri = (r: StoreReview) => (r.rating <= 2 && !r.answered ? 0 : 1);
    return pri(a) - pri(b) || Date.parse(b.at || "0") - Date.parse(a.at || "0");
  });

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-16 pt-6">
      <h1 className="text-h1">Mağaza yorumları</h1>
      <p className="muted text-caption">
        {Math.round((Date.now() - at) / 60000)} dk önce çekildi (30 dk önbellek) · <a href="/admin/reviews?taze=1" className="underline">tazele</a> · Google Play API yalnız son 7 günün metinli yorumlarını veriyor.
      </p>

      {/* ANDROID VITALS - mağaza sıralamasını etkileyen iki oran (lib/android-vitals). */}
      <section className="mt-4 rounded-card border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }} aria-label="Android vitals">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-micro uppercase tracking-eyebrow">Android kalite (Play vitals)</h2>
          <span className="text-caption muted">28 günlük, kullanıcı ağırlıklı · eşiği aşan uygulama Play&apos;de geri plana itilir · 6 sa önbellek</span>
        </div>
        {!vitals.configured ? (
          <p className="mt-2 text-caption muted">Yapılandırılmadı.</p>
        ) : vitals.error ? (
          <p className="mt-2 text-caption" style={{ color: "#dc2626" }}>{vitals.error}</p>
        ) : (
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <VitalsCell label="Fark edilen çökme" series={vitals.crash} threshold={CRASH_THRESHOLD} />
            <VitalsCell label="Fark edilen donma (ANR)" series={vitals.anr} threshold={ANR_THRESHOLD} />
          </div>
        )}
      </section>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {results.map((r) => {
          const s = summarizeReviews(r.reviews);
          return (
            <section key={r.store} className="rounded-card border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }} aria-label={STORE[r.store]}>
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="text-micro uppercase tracking-eyebrow">{STORE[r.store]}</h2>
                <a href={CONSOLE[r.store]} target="_blank" rel="noopener noreferrer" className="text-caption underline">konsolda cevapla</a>
              </div>
              {!r.configured ? (
                <p className="mt-2 text-caption muted">Yapılandırılmadı: yalnız okuma yetkili anahtar sunucuda yok (bkz. lib/store-reviews).</p>
              ) : r.error ? (
                <p className="mt-2 text-caption" style={{ color: "#dc2626" }}>{r.error}</p>
              ) : (
                <div className="mt-2 flex flex-wrap items-baseline gap-x-5 gap-y-1">
                  <span className="text-h1 tabular-nums">{s.avg ?? "—"}</span>
                  <span className="text-caption muted">{s.total} yorum · {s.recent} son 30 gün</span>
                  <span className="text-caption tabular-nums muted">{s.stars.map((n, i) => `${i + 1}★ ${n}`).join("  ")}</span>
                  {s.lowUnanswered ? <span className="text-caption" style={{ color: "#dc2626" }}>{s.lowUnanswered} cevapsız 1-2★</span> : null}
                </div>
              )}
            </section>
          );
        })}
      </div>

      <div className="mt-6 space-y-2">
        {ordered.length === 0 ? (
          <p className="muted text-caption">Gösterilecek yorum yok.</p>
        ) : (
          ordered.map((r) => (
            <article key={`${r.store}:${r.id}`} className="card px-3 py-2 text-caption">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <b style={{ color: r.rating <= 2 ? "#dc2626" : r.rating >= 4 ? "#16a34a" : undefined }} aria-label={`${r.rating} yıldız`}>{starsText(r.rating)}</b>
                <span className="chip h-5 px-1.5 text-micro">{STORE[r.store]}</span>
                {r.title ? <span className="font-semibold">{r.title}</span> : null}
                <span className="muted">
                  {r.author || "anonim"} · {r.at ? new Date(r.at).toLocaleDateString("tr-TR") : "—"}{r.version ? ` · ${r.version}` : ""}{r.territory ? ` · ${r.territory}` : ""}
                </span>
                <span style={{ color: r.answered ? "#16a34a" : "var(--text-muted)" }}>{r.answered ? "cevaplandı" : "cevapsız"}</span>
              </div>
              {r.body ? <p className="mt-1 whitespace-pre-wrap text-body">{r.body}</p> : null}
            </article>
          ))
        )}
      </div>
    </div>
  );
}

const pct2 = (v: number) => `%${(v * 100).toFixed(2)}`;

function VitalsCell({ label, series, threshold }: { label: string; series: VitalsSeries; threshold: number }) {
  if (series.latest28d == null) {
    return (
      <div>
        <div className="text-micro uppercase tracking-eyebrow muted">{label}</div>
        <p className="text-caption muted">Henüz veri yok (Google yeterli kullanıcı birikince hesaplıyor).</p>
      </div>
    );
  }
  const v = series.latest28d;
  const color = v >= threshold ? "#dc2626" : v >= threshold * 0.8 ? "#d97706" : "#16a34a";
  const last7 = series.points.slice(-7).map((p) => (p.rate == null ? "—" : pct2(p.rate))).join(" · ");
  return (
    <div>
      <div className="text-micro uppercase tracking-eyebrow muted">{label}</div>
      <div className="flex items-baseline gap-2">
        <span className="text-h1 tabular-nums" style={{ color }}>{pct2(v)}</span>
        <span className="text-caption muted">eşik {pct2(threshold)} · {series.latestDay}</span>
      </div>
      <div className="text-micro tabular-nums muted">son 7 gün: {last7}</div>
    </div>
  );
}
