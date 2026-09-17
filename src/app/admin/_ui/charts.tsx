"use client";

import { useId, useMemo, useState } from "react";

/**
 * PANEL GRAFİKLERİ — okunan değil, sorgulanan grafikler.
 *
 * Eski çubuklar yalnız biçimdi: değer ipucu balonundaydı (dokunmatikte hiç
 * görünmüyordu), dizi seçilemiyordu, huninin hangi basamakta kaybettiği
 * hesaplanmıyordu. Buradaki parçalar:
 *
 *   SeriesChart  günlük dizi grafiği: dizi seçimi, üzerine gelince/odaklanınca
 *                günün değeri (ekranda satır olarak, balonda değil), ortalama
 *                çizgisi, en yüksek gün; klavyeyle ← → ile gün gün gezilir
 *   Funnel       huni: her basamağın ilk basamağa ve bir öncekine oranı,
 *                en çok kayıp veren geçiş vurgulu
 *   BarList      çubuk listesi: toplam içindeki pay, ad/değer sıralaması,
 *                ilk 8'den sonrası "tümünü göster"
 *   Sparkline    istatistik kutusunun altındaki küçük eğilim çizgisi
 *
 * Renkler anlamsal jetonlardan; değerler ekranda METİN olarak da yazıyor
 * (`check:title`: yalnız ipucu balonunda duran bilgi yok).
 */

export type ChartTone = "ok" | "warn" | "bad" | "info";
const TONE: Record<ChartTone, string> = { ok: "var(--color-mint)", warn: "var(--color-flame)", bad: "var(--color-rose)", info: "var(--color-brand)" };

function fmt(n: number): string {
  if (Math.abs(n) >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (Math.abs(n) >= 1_000) return (n / 1_000).toFixed(1) + "k";
  return String(Math.round(n * 100) / 100);
}

const DAY_TR = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];
const dayLabel = (iso: string) => {
  const d = new Date(`${iso}T00:00:00`);
  return Number.isNaN(d.getTime()) ? iso : `${iso.slice(8, 10)}.${iso.slice(5, 7)} ${DAY_TR[d.getDay()]}`;
};

export type Series = { key: string; label: string; values: number[]; format?: (n: number) => string };

/** Günlük dizi grafiği. `days` ISO gün listesi, her dizi aynı uzunlukta. */
export function SeriesChart({ days, series, height = 144, empty = "Bu aralıkta veri yok." }: { days: string[]; series: Series[]; height?: number; empty?: string }) {
  const [key, setKey] = useState(series[0]?.key ?? "");
  const [at, setAt] = useState<number | null>(null);
  const uid = useId();
  const s = series.find((x) => x.key === key) ?? series[0];
  const stats = useMemo(() => {
    const v = s?.values ?? [];
    const total = v.reduce((a, b) => a + b, 0);
    const max = Math.max(0, ...v);
    return { total, max, avg: v.length ? total / v.length : 0, maxIx: v.indexOf(max) };
  }, [s]);
  if (!s || !days.length || stats.max === 0) return <p className="muted rounded-tile border border-dashed px-4 py-5 text-center text-caption" style={{ borderColor: "var(--border)" }}>{empty}</p>;
  const f = s.format ?? fmt;
  const ix = at ?? days.length - 1;
  const avgPct = (stats.avg / stats.max) * 100;

  return (
    <div>
      {series.length > 1 ? (
        <div role="group" aria-label="Dizi" className="mb-3 inline-flex flex-wrap gap-0.5 rounded-tile p-0.5" style={{ background: "var(--surface-2)" }}>
          {series.map((x) => (
            <button key={x.key} type="button" aria-pressed={x.key === s.key} onClick={() => { setKey(x.key); setAt(null); }} className="inline-flex h-8 items-center rounded-chip px-3 text-caption"
              style={x.key === s.key ? { background: "var(--surface)", color: "var(--text)", boxShadow: "var(--shadow-soft)" } : { color: "var(--text-muted)" }}>
              {x.label}
            </button>
          ))}
        </div>
      ) : null}
      {/* OKUMA SATIRI: seçili günün değeri METİN olarak. Fareyle, dokunarak ya da
          klavyeyle (grafik odaktayken ← →) değişiyor; fare çıkınca SEÇİM KALIYOR
          (parite: yalnız fareyle kapanan bir durum yok), dizi değişince sona döner. */}
      <div id={`${uid}-read`} aria-live="polite" className="mb-2 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-caption">
        <span><b className="text-h3 tabular-nums">{f(s.values[ix] ?? 0)}</b> <span className="muted">{s.label.toLocaleLowerCase("tr-TR")} · {dayLabel(days[ix])}</span></span>
        <span className="muted tabular-nums">toplam {f(stats.total)} · günlük ort. {f(stats.avg)} · en yüksek {f(stats.max)} ({dayLabel(days[stats.maxIx])})</span>
      </div>
      <div
        role="slider"
        tabIndex={0}
        aria-label={`${s.label}: gün seç`}
        aria-valuemin={0}
        aria-valuemax={days.length - 1}
        aria-valuenow={ix}
        aria-valuetext={`${dayLabel(days[ix])}: ${f(s.values[ix] ?? 0)}`}
        aria-describedby={`${uid}-read`}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setAt(Math.max(0, ix - 1));
          else if (e.key === "ArrowRight") setAt(Math.min(days.length - 1, ix + 1));
          else if (e.key === "Home") setAt(0);
          else if (e.key === "End") setAt(days.length - 1);
          else return;
          e.preventDefault();
        }}
        className="relative flex items-stretch gap-[2px] rounded-tile outline-offset-4 focus-visible:outline-2 focus-visible:outline-solid"
        style={{ height, outlineColor: "var(--color-brand)" }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-x-0 border-t border-dashed" style={{ bottom: `${avgPct}%`, borderColor: "var(--text-faint)" }} />
        {s.values.map((v, i) => (
          <div
            key={days[i]}
            aria-hidden
            onMouseEnter={() => setAt(i)}
            onPointerDown={() => setAt(i)}
            className="flex h-full flex-1 cursor-crosshair flex-col justify-end"
          >
            <div
              className="w-full transition-opacity"
              style={{ height: `${Math.max(v > 0 ? 2 : 0, (v / stats.max) * 100)}%`, background: "var(--color-brand)", opacity: i === ix ? 1 : at == null ? 0.85 : 0.45 }}
            />
          </div>
        ))}
      </div>
      <div className="muted mt-1.5 flex justify-between text-caption tabular-nums">
        <span>{dayLabel(days[0])}</span>
        <span aria-hidden>- - ortalama</span>
        <span>{dayLabel(days[days.length - 1])}</span>
      </div>
    </div>
  );
}

export type FunnelStep = { label: string; value: number };

/**
 * Huni: her basamak ilk basamağa (%) ve bir öncekine (→ %) göre. En büyük
 * kayıp veren geçiş vurgulanıyor — hunide bakılacak yer orası.
 */
export function Funnel({ steps, unit = "kişi" }: { steps: FunnelStep[]; unit?: string }) {
  const first = steps[0]?.value ?? 0;
  if (!steps.length || first === 0) return <p className="muted text-caption">Henüz veri yok.</p>;
  const rates = steps.map((st, i) => (i === 0 ? null : steps[i - 1].value ? st.value / steps[i - 1].value : 0));
  /* Olaylar her zaman sırayla yayınlanmıyor (eski sürüm bir adımı hiç yazmıyor,
     kullanıcı bir adımı atlayabiliyor): bir basamak öncekinden BÜYÜK olabilir.
     O geçiş "kayıp" değil ölçüm boşluğu; yüzde gibi yazılmıyor ve en büyük kayıp
     seçimine girmiyor. */
  let worst = -1;
  rates.forEach((r, i) => { if (r != null && r <= 1 && (worst < 0 || r < (rates[worst] ?? 1))) worst = i; });
  return (
    <ol className="space-y-2.5">
      {steps.map((st, i) => {
        const share = st.value / first;
        const r = rates[i];
        const isWorst = i === worst && r != null && r < 1;
        return (
          <li key={st.label}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 text-caption">
              <span className="min-w-0">{st.label}</span>
              <span className="tabular-nums">
                <b>{fmt(st.value)}</b> <span className="muted">{unit} · %{Math.round(share * 100)}</span>
                {r != null && r > 1 ? <span className="muted"> · önceki adımdan fazla (ölçüm eksik)</span> : null}
                {r != null && r <= 1 ? <span style={{ color: isWorst ? TONE.bad : "var(--text-muted)" }}> · önceki adımdan %{Math.round(r * 100)}{isWorst ? " (en büyük kayıp)" : ""}</span> : null}
              </span>
            </div>
            <div className="mt-1 h-2.5 overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}>
              <div className="h-full rounded-full" style={{ width: `${Math.max(st.value > 0 ? 1 : 0, share * 100)}%`, background: isWorst ? TONE.bad : "var(--color-brand)" }} />
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export type BarItem = { label: string; value: number; right?: string; tone?: ChartTone };

/**
 * Çubuk listesi: değer, toplam içindeki pay; 8'den uzunsa "tümünü göster",
 * 5'ten uzunsa ad/değer sıralaması. `max` verilirse (ör. yüzde listesi, 100)
 * çubuk ona göre, verilmezse en büyük değere göre; pay yalnız TOPLANABİLİR
 * listelerde (`share`) yazılıyor — yüzdelerin toplamı anlamsız.
 */
export function BarList({ items, max, unit, empty = "Henüz veri yok.", share = false }: { items: BarItem[]; max?: number; unit?: string; empty?: string; share?: boolean }) {
  const [all, setAll] = useState(false);
  const [byName, setByName] = useState(false);
  if (!items.length) return <p className="muted text-caption">{empty}</p>;
  const top = Math.max(max ?? 0, 1, ...items.map((i) => i.value));
  const total = items.reduce((a, i) => a + i.value, 0);
  const sorted = byName ? [...items].sort((a, b) => a.label.localeCompare(b.label, "tr")) : items;
  const shown = all ? sorted : sorted.slice(0, 8);
  return (
    <div>
      {items.length > 5 ? (
        <div className="mb-2 flex justify-end gap-1 text-caption">
          <button type="button" aria-pressed={!byName} onClick={() => setByName(false)} className="rounded-chip px-2 py-0.5" style={!byName ? { background: "var(--surface-2)", color: "var(--text)" } : { color: "var(--text-muted)" }}>değer</button>
          <button type="button" aria-pressed={byName} onClick={() => setByName(true)} className="rounded-chip px-2 py-0.5" style={byName ? { background: "var(--surface-2)", color: "var(--text)" } : { color: "var(--text-muted)" }}>ad</button>
        </div>
      ) : null}
      <div className="space-y-2">
        {shown.map((it, i) => (
          <div key={`${it.label}-${i}`} className="flex items-center gap-3 text-caption">
            <span className="w-2/5 min-w-0 shrink-0 break-words sm:w-44">{it.label}</span>
            <span className="relative h-2.5 min-w-10 flex-1 overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}>
              <span className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${Math.max(it.value > 0 ? 2 : 0, Math.min(100, (it.value / top) * 100))}%`, background: it.tone ? TONE[it.tone] : "var(--color-brand)" }} />
            </span>
            <span className="muted w-28 shrink-0 text-right tabular-nums sm:w-40">
              {it.right ?? fmt(it.value) + (unit ?? "")}
              {share && total ? ` · %${Math.round((it.value / total) * 100)}` : ""}
            </span>
          </div>
        ))}
      </div>
      {items.length > 8 ? (
        <button type="button" onClick={() => setAll((x) => !x)} className="btn btn-ghost mt-2 h-8 px-3 text-caption">
          {all ? "İlk 8'i göster" : `Tümünü göster (${items.length})`}
        </button>
      ) : null}
    </div>
  );
}

/** Küçük eğilim çizgisi (SVG). Değerler ekranda başka yerde metin olarak var; bu yalnız biçim. */
export function Sparkline({ values, tone = "info", label }: { values: number[]; tone?: ChartTone; label: string }) {
  if (values.length < 2) return null;
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * 100},${28 - ((v - min) / (max - min || 1)) * 26}`).join(" ");
  return (
    <svg role="img" aria-label={`${label}: ${values.length} günlük eğilim, son ${fmt(values[values.length - 1])}, en yüksek ${fmt(max)}`} viewBox="0 0 100 30" preserveAspectRatio="none" className="mt-1 h-6 w-full">
      <polyline points={pts} fill="none" stroke={TONE[tone]} strokeWidth={1.8} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
    </svg>
  );
}
