import type { Metadata } from "next";
import { adminGate } from "@/lib/admin";
import { storeReviews, summarizeReviews, type StoreReview } from "@/lib/store-reviews";
import { AdminDenied, AdminPage, Badge, BTN, Empty, Notice, PageHeader, Panel, PanelGrid, Stat, Stats, TONE } from "../_ui/ui";
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
  if (!gate.ok) return <AdminDenied title="Mağaza" email={gate.email} />;
  const fresh = (await searchParams).taze === "1";
  const [{ results, at }, vitals] = await Promise.all([storeReviews(fresh), androidVitals(fresh)]);
  const all: StoreReview[] = results.flatMap((r) => r.reviews);
  const ordered = [...all].sort((a, b) => {
    const pri = (r: StoreReview) => (r.rating <= 2 && !r.answered ? 0 : 1);
    return pri(a) - pri(b) || Date.parse(b.at || "0") - Date.parse(a.at || "0");
  });

  return (
    <AdminPage>
      <PageHeader
        title="Mağaza"
        description="App Store ve Google Play: kalite oranları ve kullanıcı yorumları. Yalnız okuma; cevap mağaza konsolundan verilir."
        meta={`${Math.round((Date.now() - at) / 60000)} dk önce çekildi (30 dk önbellek) · Google Play API yalnız son 7 günün metinli yorumlarını veriyor`}
        actions={<a href="/admin/reviews?taze=1" className={BTN.secondary}>Tazele</a>}
      />

      {/* ANDROID VITALS - mağaza sıralamasını etkileyen iki oran (lib/android-vitals). */}
      <Panel id="vitals" title="Android kalite (Play vitals)" hint="28 günlük, kullanıcı ağırlıklı · eşiği aşan uygulama Play'de geri plana itilir · 6 sa önbellek">
        {!vitals.configured ? (
          <p className="muted text-caption">Yapılandırılmadı.</p>
        ) : vitals.error ? (
          <Notice tone="bad">{vitals.error}</Notice>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <VitalsCell label="Fark edilen çökme" series={vitals.crash} threshold={CRASH_THRESHOLD} />
            <VitalsCell label="Fark edilen donma (ANR)" series={vitals.anr} threshold={ANR_THRESHOLD} />
          </div>
        )}
      </Panel>

      <PanelGrid>
        {results.map((r) => {
          const s = summarizeReviews(r.reviews);
          return (
            <Panel key={r.store} title={STORE[r.store]} actions={<a href={CONSOLE[r.store]} target="_blank" rel="noopener noreferrer" className={BTN.small}>Konsolda cevapla ↗</a>}>
              {!r.configured ? (
                <p className="muted text-caption">Yapılandırılmadı: yalnız okuma yetkili anahtar sunucuda yok (bkz. lib/store-reviews).</p>
              ) : r.error ? (
                <Notice tone="bad">{r.error}</Notice>
              ) : (
                <Stats cols={4}>
                  <Stat label="Ortalama" value={s.avg ?? "—"} sub={`${s.total} yorum`} />
                  <Stat label="Son 30 gün" value={s.recent} />
                  <Stat label="Cevapsız 1-2★" value={s.lowUnanswered} tone={s.lowUnanswered ? "bad" : "ok"} />
                  <Stat label="Dağılım" value={<span className="text-caption">{s.stars.map((n, i) => `${i + 1}★ ${n}`).join(" · ")}</span>} />
                </Stats>
              )}
            </Panel>
          );
        })}
      </PanelGrid>

      <Panel id="yorumlar" title="Yorumlar" hint="Önce cevapsız düşük puanlılar: mağaza sıralamasını en çok onlar etkiliyor.">
        {ordered.length === 0 ? (
          <Empty>Gösterilecek yorum yok.</Empty>
        ) : (
          <div className="divide-y" style={{ borderColor: "var(--hairline)" }}>
            {ordered.map((r) => (
              <article key={`${r.store}:${r.id}`} className="py-3 text-caption first:pt-0 last:pb-0" style={{ borderColor: "var(--hairline)" }}>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <b style={{ color: r.rating <= 2 ? TONE.bad : r.rating >= 4 ? TONE.ok : undefined }} aria-label={`${r.rating} yıldız`}>{starsText(r.rating)}</b>
                  <Badge>{STORE[r.store]}</Badge>
                  {r.answered ? <Badge tone="ok">cevaplandı</Badge> : <Badge tone={r.rating <= 2 ? "bad" : undefined}>cevapsız</Badge>}
                  {r.title ? <span className="text-strong">{r.title}</span> : null}
                  <span className="muted">
                    {r.author || "anonim"} · {r.at ? new Date(r.at).toLocaleDateString("tr-TR") : "—"}{r.version ? ` · ${r.version}` : ""}{r.territory ? ` · ${r.territory}` : ""}
                  </span>
                </div>
                {r.body ? <p className="mt-1 whitespace-pre-wrap text-body">{r.body}</p> : null}
              </article>
            ))}
          </div>
        )}
      </Panel>
    </AdminPage>
  );
}

const pct2 = (v: number) => `%${(v * 100).toFixed(2)}`;

function VitalsCell({ label, series, threshold }: { label: string; series: VitalsSeries; threshold: number }) {
  if (series.latest28d == null) {
    return <Stat label={label} value="—" sub="Henüz veri yok (Google yeterli kullanıcı birikince hesaplıyor)." />;
  }
  const v = series.latest28d;
  const last7 = series.points.slice(-7).map((p) => (p.rate == null ? "—" : pct2(p.rate))).join(" · ");
  return (
    <Stat
      label={label}
      value={pct2(v)}
      tone={v >= threshold ? "bad" : v >= threshold * 0.8 ? "warn" : "ok"}
      sub={<>eşik {pct2(threshold)} · {series.latestDay}<br />son 7 gün: {last7}</>}
    />
  );
}
