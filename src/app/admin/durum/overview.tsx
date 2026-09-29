import Link from "next/link";
import type { ReactNode } from "react";
import type { Overview, Period } from "@/lib/admin-overview";
import type { ServerMetrics } from "@/lib/server-metrics";
import type { Revenue } from "@/lib/premium/revenue";
import type { AdminData } from "@/lib/admin";
import { trendDelta } from "@/lib/admin-trends-shared";
import { CohortTable, DataTable, Dot, fmt, Panel, ShareBar, Sparkline, StackedDaily, TONE, TrendChart } from "../_ui/ui";

/**
 * GENEL DURUM — "işler nasıl gidiyor" (`/admin/durum`).
 *
 * Sabit bir okuma sırası, her bölüm bir soru:
 *
 *   0  Sistem      tek satır: uyarı, son deploy, yedek, hata (ayrıntı Gelen işler ve Sunucu'da)
 *   1  Göstergeler altı kutu, seçili aralık ve önceki dönemle değişimi
 *   2  Büyüme      aktif kişi eğrisi, günlük kayıt, kayıt kohortunun tutması
 *   3  Öğrenme     çalışma dakikası eğrisi, yüzey kullanımı (önceki dönemle)
 *   4  Gelir       MRR, brüt gelir eğrisi, deneme dönüşümü
 *   5  Kırılım     aktif kişi: dil çifti, seviye, platform
 *
 * Eski sayfa uyarıların uzun listesi, Gelen işler'deki kuyruğun kopyası,
 * sabit 7 günlük bir satır ve tüm zamanlar sayılarından oluşuyordu; aralık
 * seçici sayıların çoğunu değiştirmiyordu. Bütün sayılar artık aralığa bağlı.
 */
type Alert = { key: string; level: "kritik" | "uyari"; text: string };

const usd = (v: number) => (v >= 1000 ? `$${(v / 1000).toFixed(1)}k` : `$${Math.round(v)}`);
const DELTA_COLOR = { good: TONE.ok, bad: TONE.bad, flat: "var(--text-muted)" } as const;
const PLATFORM_LABEL: Record<string, string> = {
  "desktop:browser": "Masaüstü · web", "desktop:standalone": "Masaüstü · uygulama",
  "android:browser": "Android · web", "android:standalone": "Android · web uygulaması",
  "ios:browser": "iOS · web", "ios:standalone": "iOS · web uygulaması",
  "android:native": "Android · mağaza", "ios:native": "iOS · mağaza",
};
const LANG: Record<string, string> = { tr: "TR", en: "EN", de: "DE", "gsw-zh": "Zürih" };
const pairText = (k: string) => k.split(" → ").map((x) => LANG[x] ?? x.toUpperCase()).join(" → ");

/** Bölüm başlığı: numara yok, bir soru ve kısa açıklama. */
function Section({ id, title, hint, children }: { id?: string; title: string; hint?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-32 space-y-3">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 border-b pb-2" style={{ borderColor: "var(--border)" }}>
        <h2 className="text-h3">{title}</h2>
        {hint ? <p className="muted text-caption">{hint}</p> : null}
      </div>
      {children}
    </section>
  );
}

/** Gösterge kutusu: değer, önceki döneme göre değişim, eğri. */
function Kpi({ label, value, cur, prev, good = "up", unit, sub, spark }: {
  label: string; value: string; cur: number | null; prev: number | null; good?: "up" | "down"; unit?: "pct"; sub?: string; spark?: number[];
}) {
  const d = cur != null && prev != null ? trendDelta({ current: cur, previous: prev, good, unit }) : null;
  return (
    <div className="flex min-w-0 flex-col rounded-panel border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <div className="muted text-micro uppercase tracking-eyebrow">{label}</div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-h2 tabular-nums">{value}</span>
        {d ? <span className="text-caption tabular-nums" style={{ color: DELTA_COLOR[d.tone] }}>{d.text}</span> : null}
      </div>
      <div className="muted text-caption">{sub ?? (prev != null ? "önceki dönem" : "")}</div>
      {spark && spark.some((v) => v > 0) ? <div className="mt-auto pt-1"><Sparkline label={label} values={spark} /></div> : null}
    </div>
  );
}

export function OverviewSection({ o, alerts, server, revenue, data, openInbox }: {
  o: Overview;
  alerts: Alert[];
  server: ServerMetrics;
  revenue: Revenue;
  data: AdminData;
  /** Gelen işler'deki açık iş (menü rozetiyle aynı kaynak değil; yalnız özet satırı için). */
  openInbox: number;
}) {
  const N = o.days;
  const cur: Period = o.current;
  const prev: Period = o.previous;
  const half = (xs: number[]) => [xs.slice(0, N), xs.slice(N)] as const;
  const days = o.daily.slice(N).map((x) => x.day);
  const [activePrev, activeCur] = half(o.daily.map((x) => x.active));
  const [minPrev, minCur] = half(o.daily.map((x) => x.minutes));
  const [grossPrev, grossCur] = half(o.daily.map((x) => x.grossUsd));
  const curDays = o.daily.slice(N);
  const errorsCur = curDays.reduce((a, x) => a + x.errors, 0);
  const errorsPrev = o.daily.slice(0, N).reduce((a, x) => a + x.errors, 0);
  const critical = alerts.filter((a) => a.level === "kritik").length;
  const warning = alerts.length - critical;
  const deploy = server.deploys.find((x) => x.status !== "start") ?? server.deploys[0];
  const backupAge = server.ops.backup.ageH;
  const rc = revenue.revenuecat && !("error" in revenue.revenuecat) ? revenue.revenuecat : null;
  const w = revenue.window;
  const conv = w.trialsStarted ? Math.round((w.trialConversions / w.trialsStarted) * 100) : null;
  const platforms = data.platform;

  return (
    <div className="space-y-8">
      {/* 0 · SİSTEM: tek satır. Uyarıların kendisi Gelen işler'de. */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-panel border px-4 py-3 text-caption" style={{ borderColor: critical ? TONE.bad : "var(--border)", background: "var(--surface)" }}>
        <Link href="/admin" className="flex items-center gap-2 text-strong hover:underline">
          <Dot tone={critical ? "bad" : warning ? "warn" : "ok"} />
          {critical || warning ? `${critical ? `${critical} kritik` : ""}${critical && warning ? ", " : ""}${warning ? `${warning} uyarı` : ""}` : "Sistem temiz"}
          <span className="muted font-normal">· {openInbox} açık iş →</span>
        </Link>
        <span className="flex items-center gap-2"><Dot tone={deploy?.status === "fail" ? "bad" : deploy ? "ok" : "off"} /><span className="muted">Son deploy</span> {deploy ? deploy.time.slice(5, 16) : "—"}</span>
        <span className="flex items-center gap-2"><Dot tone={backupAge == null || backupAge > 26 ? "bad" : "ok"} /><span className="muted">Son yedek</span> {backupAge == null ? "yok" : `${Math.round(backupAge)} sa önce`}</span>
        <span className="flex items-center gap-2">
          <Dot tone={errorsCur > errorsPrev * 1.5 && errorsCur > 5 ? "warn" : "ok"} />
          <span className="muted">İstemci hatası</span> {fmt(errorsCur)}
          {(() => { const d = trendDelta({ current: errorsCur, previous: errorsPrev, good: "down" }); return <span style={{ color: DELTA_COLOR[d.tone] }}>{d.text}</span>; })()}
        </span>
        <Link href="/admin/ops" className="muted ml-auto hover:underline">Sunucu →</Link>
      </div>

      {/* 1 · GÖSTERGELER */}
      <Section id="gostergeler" title="Temel göstergeler" hint={`Son ${N} gün (bugün hariç), aynı uzunluktaki önceki dönemle.`}>
        <div className="grid grid-cols-2 gap-3 @3xl:grid-cols-3 @[90rem]:grid-cols-6">
          <Kpi label="Aktif kişi" value={fmt(cur.active)} cur={cur.active} prev={prev.active} sub={`günde ort. ${cur.avgDau}`} spark={activeCur} />
          <Kpi label="Yeni kayıt" value={fmt(cur.signups)} cur={cur.signups} prev={prev.signups} spark={o.daily.slice(N).map((x) => x.signups)} />
          <Kpi label="Aktivasyon" value={cur.activation == null ? "—" : `%${cur.activation}`} cur={cur.activation} prev={prev.activation} unit="pct" sub="kaydolup çalışmaya başlayan" />
          <Kpi label="Haftalık tutma" value={cur.retention == null ? "—" : `%${cur.retention}`} cur={cur.retention} prev={prev.retention} unit="pct" sub="geçen hafta çalışıp bu hafta da çalışan" />
          <Kpi label="Kişi başı çalışma" value={`${fmt(cur.minutesPerActive)} dk`} cur={cur.minutesPerActive} prev={prev.minutesPerActive} sub={`toplam ${fmt(minCur.reduce((a, b) => a + b, 0) / 60)} saat`} spark={minCur} />
          <Kpi label="Brüt gelir" value={usd(cur.grossUsd)} cur={Math.round(cur.grossUsd)} prev={Math.round(prev.grossUsd)} sub={`MRR ${usd(rc?.mrrUsd ?? revenue.now.mrrUsd)}`} spark={grossCur} />
        </div>
      </Section>

      {/* 2 · BÜYÜME VE TUTMA */}
      <Section title="Büyüme ve tutma" hint="Kaç kişi çalışıyor, kaç kişi geliyor, gelenler kalıyor mu.">
        <div className="grid items-stretch gap-5 @4xl:grid-cols-2">
          <Panel title="Günlük aktif kişi" hint="O gün en az bir tekrar ya da çalışma kaydı olan kişi.">
            <TrendChart label="Günlük aktif kişi" days={days} values={activeCur} prev={activePrev} />
          </Panel>
          <Panel title="Günlük yeni kayıt" hint="Hesap ve misafir (yalnız mobil).">
            <StackedDaily
              days={days}
              series={[
                { label: "Hesap", values: curDays.map((x) => x.signups - x.guestSignups) },
                { label: "Misafir", values: curDays.map((x) => x.guestSignups) },
              ]}
            />
          </Panel>
        </div>
        <Panel title="Kayıt kohortu" hint="Satır: kayıt haftası. Hücre: o kohorttan kaçıncı haftada en az bir gün çalışan pay. Koyu = çok kalan.">
          <CohortTable cohorts={o.cohorts} />
        </Panel>
      </Section>

      {/* 3 · ÖĞRENME */}
      <Section title="Öğrenme" hint="Ne kadar çalışılıyor ve hangi yüzeyde.">
        <div className="grid items-stretch gap-5 @4xl:grid-cols-2">
          <Panel title="Günlük çalışma (dakika)" hint={`${fmt(cur.reviews)} tekrar · ${fmt(cur.sessions)} tamamlanan tur bu dönemde.`}>
            <TrendChart label="Günlük çalışma dakikası" days={days} values={minCur} prev={minPrev} />
          </Panel>
          <Panel title="Yüzey kullanımı" hint="Yüzeyi en az bir kez kullanan kişi, önceki dönemle." flush>
            <DataTable
              empty="Bu aralıkta kullanım yok."
              head={["Yüzey", { label: "Kişi", align: "right" }, { label: "Önceki", align: "right" }, { label: "Değişim", align: "right" }, { label: "Kullanım", align: "right" }]}
              rows={o.surfaces.map((s) => {
                const d = trendDelta({ current: s.users, previous: s.prevUsers, good: "up" });
                return [s.label, s.users, s.prevUsers, <span key="d" style={{ color: DELTA_COLOR[d.tone] }}>{d.text}</span>, s.count];
              })}
            />
          </Panel>
        </div>
      </Section>

      {/* 4 · GELİR ve 5 · KIRILIM */}
      <div className="grid items-start gap-8 @4xl:grid-cols-2">
        <Section title="Gelir" hint="Brüt USD, mağaza payı düşülmemiş. Ayrıntı Gelir sayfasında.">
          <Panel actions={<Link href="/admin/revenue" className="muted text-caption hover:underline">Gelir ve huniler →</Link>}>
            <div className="mb-4 grid grid-cols-2 gap-4 @xl:grid-cols-4">
              <Mini label="MRR" value={usd(rc?.mrrUsd ?? revenue.now.mrrUsd)} sub={rc?.mrrUsd != null ? "RevenueCat" : "defterden"} />
              <Mini label="Aktif abone" value={fmt(revenue.now.activePaid)} sub={`${revenue.now.activeTrials} denemede`} />
              <Mini label="Deneme → ücretli" value={conv == null ? "—" : `%${conv}`} sub={`${w.trialConversions} / ${w.trialsStarted}`} />
              <Mini label="İptal" value={fmt(w.cancellations)} sub={`${w.refunds} iade`} tone={w.cancellations ? "warn" : undefined} />
            </div>
            <TrendChart label="Günlük brüt gelir" days={days} values={grossCur} prev={grossPrev} format="usd" height={120} />
          </Panel>
        </Section>

        <Section title="Kırılım" hint="Bu dönemde çalışan kişiler.">
          <Panel>
            <div className="space-y-5">
              <div>
                <div className="muted mb-2 text-micro uppercase tracking-eyebrow">Dil çifti</div>
                <ShareBar items={o.pairs.map((p) => ({ label: pairText(p.key), value: p.users }))} unit=" kişi" />
              </div>
              <div>
                <div className="muted mb-2 text-micro uppercase tracking-eyebrow">Seviye</div>
                <ShareBar ordinal items={o.levels.map((l) => ({ label: l.key, value: l.users }))} unit=" kişi" />
              </div>
              <div>
                <div className="muted mb-2 text-micro uppercase tracking-eyebrow">Platform (uygulama açan)</div>
                <ShareBar items={platforms.map((p) => ({ label: PLATFORM_LABEL[p.key] ?? p.key, value: p.users }))} unit=" kişi" />
              </div>
            </div>
          </Panel>
        </Section>
      </div>
    </div>
  );
}

function Mini({ label, value, sub, tone }: { label: string; value: string; sub?: string; tone?: "warn" }) {
  return (
    <div className="min-w-0">
      <div className="muted text-micro uppercase tracking-eyebrow">{label}</div>
      <div className="text-h3 tabular-nums" style={tone ? { color: TONE.warn } : undefined}>{value}</div>
      {sub ? <div className="muted text-caption">{sub}</div> : null}
    </div>
  );
}
