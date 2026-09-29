import Link from "next/link";
import { trendDelta, type TrendMetric } from "@/lib/admin-trends-shared";
import type { PulseDay } from "@/lib/admin-trends";
import { fmt } from "./ui";

/**
 * GÖSTERGE ŞERİDİ — menünün altında, her panel sayfasında aynı dört sayı:
 * aktif kullanıcı, yeni kayıt, brüt gelir, istemci hatası.
 *
 * Genel durumda sekiz sayılık "Son 7 gün" paneli vardı ve yalnız o sayfada
 * görünüyordu; başka bir sayfadayken "bugün bir şey mi oldu" sorusu için ana
 * sayfaya dönmek gerekiyordu. Şerit her sayfada o soruyu tek bakışta
 * cevaplıyor: haftalık sayı, önceki haftaya göre değişim (renk yöne göre: kayıt
 * artışı yeşil, hata artışı kırmızı) ve 14 günlük eğri. Tıklayınca konunun
 * sayfası açılıyor; sekiz göstergenin tamamı Genel durumda.
 */
type Ticker = { key: string; label: string; href: string; value: string; delta: ReturnType<typeof trendDelta>; values: number[] };

const usd = (v: number) => (v >= 1000 ? `$${(v / 1000).toFixed(1)}k` : `$${Math.round(v)}`);
const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

function tickers(metrics: TrendMetric[], days: PulseDay[]): Ticker[] {
  const m = (key: string) => metrics.find((x) => x.key === key);
  const from = (key: string, label: string, href: string, values: number[]): Ticker | null => {
    const t = m(key);
    return t ? { key, label, href, value: fmt(t.current), delta: trendDelta(t), values } : null;
  };
  const gross = days.map((d) => d.grossUsd);
  const cur = sum(gross.slice(-7));
  const prev = sum(gross.slice(0, -7));
  const revenue: Ticker = {
    key: "gross",
    label: "Brüt gelir",
    href: "/admin/revenue",
    value: usd(cur),
    delta: trendDelta({ current: Math.round(cur), previous: Math.round(prev), good: "up" }),
    values: gross,
  };
  return [
    from("active", "Aktif kullanıcı", "/admin/growth", days.map((d) => d.active)),
    from("signup", "Yeni kayıt", "/admin/growth", days.map((d) => d.signup)),
    revenue,
    from("errors", "İstemci hatası", "/admin/errors", days.map((d) => d.errors)),
  ].filter((t): t is Ticker => t !== null);
}

const DELTA_COLOR = { good: "var(--color-mint)", bad: "var(--color-rose)", flat: "var(--text-muted)" } as const;

/** Alan dolgulu küçük eğri: önceki hafta soluk, bu hafta dolu; son gün noktalı. */
function Spark({ id, values, label }: { id: string; values: number[]; label: string }) {
  if (values.length < 2) return null;
  const W = 96, H = 30, pad = 3;
  const max = Math.max(...values, 1);
  const x = (i: number) => (i / (values.length - 1)) * W;
  const y = (v: number) => pad + (1 - v / max) * (H - pad * 2);
  const line = values.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join("");
  const area = `${line}L${W},${H}L0,${H}Z`;
  const half = x(values.length - 7);
  const last = values[values.length - 1];
  return (
    <svg role="img" aria-label={`${label}: ${values.length} günlük eğri, son gün ${fmt(last)}, en yüksek ${fmt(max)}`} viewBox={`0 0 ${W} ${H}`} className="h-[30px] w-24 shrink-0 overflow-visible">
      <defs>
        <clipPath id={`pulse-${id}`}>
          <rect x={half} y={0} width={W - half} height={H} />
        </clipPath>
      </defs>
      <path d={area} style={{ fill: "color-mix(in srgb, var(--color-brand) 7%, transparent)" }} />
      <path d={area} clipPath={`url(#pulse-${id})`} style={{ fill: "color-mix(in srgb, var(--color-brand) 16%, transparent)" }} />
      <path d={line} fill="none" strokeWidth={1.6} strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ stroke: "var(--color-brand)" }} />
      <circle cx={x(values.length - 1)} cy={y(last)} r={2.4} style={{ fill: "var(--color-brand)" }} />
    </svg>
  );
}

export function PulseStrip({ metrics, days, failed }: { metrics: TrendMetric[]; days: PulseDay[]; failed: boolean }) {
  const list = tickers(metrics, days);
  if (!list.length) return null;
  return (
    <div className="flex overflow-x-auto border-b [scrollbar-width:none]" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      {list.map((t) => (
        <Link
          key={t.key}
          href={t.href}
          className="flex min-w-[13.5rem] flex-1 items-center justify-between gap-3 border-r px-4 py-2 transition-colors hover:bg-[var(--surface-2)] lg:px-5"
          style={{ borderColor: "var(--hairline)" }}
        >
          <span className="min-w-0">
            <span className="muted block text-micro uppercase tracking-eyebrow whitespace-nowrap">{t.label}</span>
            <span className="flex items-baseline gap-2 whitespace-nowrap">
              <span className="text-strong tabular-nums">{t.value}</span>
              <span className="text-micro tabular-nums" style={{ color: DELTA_COLOR[t.delta.tone] }}>{t.delta.text}</span>
            </span>
          </span>
          <Spark id={t.key} values={t.values} label={t.label} />
        </Link>
      ))}
      <Link
        href="/admin/durum#son-7-gun"
        className="muted flex shrink-0 items-center gap-1 px-4 text-caption whitespace-nowrap hover:text-[var(--text)]"
        title={failed ? "Göstergelerin bir kısmı okunamadı; ayrıntı Genel durumda." : "Sekiz göstergenin tamamı, önceki haftayla"}
      >
        {failed ? <span style={{ color: "var(--color-rose)" }}>Eksik veri ·</span> : null} Tüm göstergeler →
      </Link>
    </div>
  );
}
