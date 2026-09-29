"use client";

import { useId, useMemo, useState } from "react";

/**
 * PANEL GRAFİKLERİ — okunan değil, sorgulanan grafikler.
 *
 * BİÇİMİ VERİNİN İŞİ SEÇER (her panel için sorulacak soru "okuyan ne yapacak"):
 *
 *   SeriesChart  zamanda değişim: günlük dizi, dizi seçimi, günün değeri metin
 *   Funnel       sıralı adımlar: kaç kişi hangi adımda düştü, en büyük kayıp vurgulu
 *   BarList      büyüklük sıralaması (olay adı, uç, tablo boyu): tek renk, iz yok
 *   ShareBar     bir bütünün parçaları (seviye, platform, evet/hayır): tek yığılmış
 *                çubuk + etiketli açıklama; 4 dilimden sonrası "Diğer"
 *   ScoreList    0-100 puanlar (ortalama puan, doğruluk): eksende nokta, 60 eşiği;
 *                puan bir "ilerleme" değil, ölçek üstünde bir yer
 *   Meter        bir sınıra göre doluluk (CPU, disk): eşik çizgili çubuk
 *   ThresholdTrend  bir oranın zamanda eşiğe göre seyri (Play vitals)
 *   Sparkline    istatistik kutusunun altındaki küçük eğilim
 *
 * Eski panelde hepsi aynı gri izli "ilerleme çubuğu"ydu: ortalama puan, pay,
 * sıralama ve doluluk aynı görünüyordu, "%72 puan" ile "%72 doluluk" ayırt
 * edilemiyordu. Tek sayı grafik değil (Stat); iki-üç sayılık liste tablo.
 *
 * Renk: tek dizi marka rengi; kategoriler sabit sırayla turuncu → gök → mor
 * (açık ve koyu temada renk körlüğü denetiminden geçti, dilimler etiketli ve
 * 2 px aralıklı), "Diğer" gri. Anlam rengi (yeşil/sarı/kırmızı) yalnız durumu
 * söylerken. Değerler her zaman ekranda METİN olarak da var.
 */

export type ChartTone = "ok" | "warn" | "bad" | "info";
const TONE: Record<ChartTone, string> = { ok: "var(--color-mint)", warn: "var(--color-flame)", bad: "var(--color-rose)", info: "var(--color-brand)" };

/** Kategori sırası (sabit, döngü yok). Koyu tema `.dark { color-scheme: dark }` ile `light-dark`. */
const CATEGORY = [
  "var(--color-brand-600)",
  "var(--color-sky-500)",
  "light-dark(var(--color-violet-600), var(--color-violet-500))",
];
const OTHER = "var(--text-faint)";
/** Sıralı kategoriler (A1 → C2): tek ton, açıktan koyuya. */
const ORDINAL = ["var(--color-brand-200)", "var(--color-brand-300)", "var(--color-brand-400)", "var(--color-brand-500)", "var(--color-brand-600)", "var(--color-brand-700)", "var(--color-brand-800)"];

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
 * Huni: her basamağın çubuğu İLK basamağa göre (iz yok: "ne kadarı kaldı"
 * çubuğun kendisi); basamak arasında devam oranı ve kayıp. En büyük kayıp
 * veren geçiş kırmızı — hunide bakılacak yer orası.
 */
export function Funnel({ steps, unit = "kişi" }: { steps: FunnelStep[]; unit?: string }) {
  const first = steps[0]?.value ?? 0;
  if (!steps.length || first === 0) return <p className="muted text-caption">Henüz veri yok.</p>;
  /* Önceki adım 0 iken: sonraki de 0 ise oran yok (null), sonraki > 0 ise ölçüm boşluğu (∞). */
  const rates = steps.map((st, i) => (i === 0 ? null : steps[i - 1].value ? st.value / steps[i - 1].value : st.value > 0 ? Infinity : null));
  /* Olaylar her zaman sırayla yayınlanmıyor (eski sürüm bir adımı hiç yazmıyor,
     kullanıcı bir adımı atlayabiliyor): bir basamak öncekinden BÜYÜK olabilir.
     O geçiş "kayıp" değil ölçüm boşluğu; yüzde gibi yazılmıyor ve en büyük kayıp
     seçimine girmiyor. */
  let worst = -1;
  rates.forEach((r, i) => { if (r != null && r <= 1 && (worst < 0 || r < (rates[worst] ?? 1))) worst = i; });
  return (
    <ol>
      {steps.map((st, i) => {
        const share = st.value / first;
        const r = rates[i];
        const isWorst = i === worst && r != null && r < 1;
        return (
          <li key={st.label}>
            {i > 0 ? (
              <div className="flex items-center gap-2 py-1 pl-2 text-micro tabular-nums" style={{ color: isWorst ? TONE.bad : "var(--text-faint)" }}>
                <span aria-hidden>↓</span>
                {r == null ? "—" : r > 1 ? "önceki adımdan fazla (ölçüm eksik)" : `%${Math.round(r * 100)} devam · ${fmt(steps[i - 1].value - st.value)} kayıp${isWorst ? " · en büyük kayıp" : ""}`}
              </div>
            ) : null}
            <div className="flex items-baseline justify-between gap-3 text-caption">
              <span className="min-w-0">{st.label}</span>
              <span className="shrink-0 tabular-nums"><b>{fmt(st.value)}</b> <span className="muted">{unit} · %{Math.round(share * 100)}</span></span>
            </div>
            <div className="mt-1 h-2 rounded-r-[4px]" style={{ width: `${Math.max(st.value > 0 ? 1 : 0, Math.min(100, share * 100))}%`, background: isWorst ? TONE.bad : "var(--color-brand)" }} />
          </li>
        );
      })}
    </ol>
  );
}

export type BarItem = { label: string; value: number; right?: string; tone?: ChartTone };

/**
 * Büyüklük sıralaması: her satır ad, çubuk, değer. Çubuk en büyük değere
 * (ya da `max`a) göre; gri iz YOK — bu bir "ilerleme" değil, satırlar arası
 * karşılaştırma. Tek dizi tek renk; `tone` yalnız anlamı olan satırda (hata).
 * 8'den uzunsa "tümünü göster", 5'ten uzunsa ad/değer sıralaması. Pay
 * (`share`) yalnız TOPLANABİLİR listelerde yazılıyor.
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
      <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)_auto] items-center gap-x-3 gap-y-1.5 text-caption">
        {shown.map((it, i) => (
          <div key={`${it.label}-${i}`} className="contents">
            <span className="min-w-0 truncate" title={it.label}>{it.label}</span>
            <span className="flex h-4 items-center border-l" style={{ borderColor: "var(--border)" }}>
              <span className="block h-2 rounded-r-[4px]" style={{ width: `${Math.max(it.value > 0 ? 1.5 : 0, Math.min(100, (it.value / top) * 100))}%`, background: it.tone ? TONE[it.tone] : "var(--color-brand)" }} />
            </span>
            <span className="text-right tabular-nums whitespace-nowrap">
              {it.right ?? fmt(it.value) + (unit ?? "")}
              {share && total ? <span className="muted"> · %{Math.round((it.value / total) * 100)}</span> : null}
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

export type ShareItem = { label: string; value: number; tone?: ChartTone; right?: string };

/**
 * Bir bütünün parçaları: tek yığılmış çubuk + etiketli açıklama. Büyükten
 * küçüğe; 4 dilimden fazlası "Diğer"de toplanıyor (açıklamada hepsi var).
 * `ordinal`: sırası anlamlı kategoriler (A1 → C2) verilen sırada, tek tonun
 * açıktan koyuya basamaklarıyla. `tone` verilen dilim anlam rengini alır
 * (ör. evet/hayır). Toplam 0 ise boş durum.
 */
export function ShareBar({ items, ordinal = false, unit = "", empty = "Henüz veri yok.", slices = 4 }: { items: ShareItem[]; ordinal?: boolean; unit?: string; empty?: string; slices?: number }) {
  const total = items.reduce((a, i) => a + i.value, 0);
  if (!items.length || total === 0) return <p className="muted text-caption">{empty}</p>;
  const list = ordinal ? items : [...items].sort((a, b) => b.value - a.value);
  const fold = !ordinal && list.length > slices + 1;
  const bar = fold ? [...list.slice(0, slices), { label: "Diğer", value: list.slice(slices).reduce((a, i) => a + i.value, 0) } as ShareItem] : list;
  const colorOf = (it: ShareItem, i: number) =>
    it.tone ? TONE[it.tone] : it.label === "Diğer" && fold && i === bar.length - 1 ? OTHER : ordinal ? ORDINAL[Math.min(ORDINAL.length - 1, Math.round((i / Math.max(1, list.length - 1)) * (ORDINAL.length - 1)))] : (CATEGORY[i] ?? OTHER);
  const pct = (v: number) => Math.round((v / total) * 100);
  return (
    <div>
      <div className="flex h-3 w-full gap-[2px] overflow-hidden rounded-[4px]" role="img" aria-label={bar.map((it) => `${it.label} %${pct(it.value)}`).join(", ")}>
        {bar.filter((it) => it.value > 0).map((it) => (
          <span key={it.label} style={{ flexGrow: it.value, flexBasis: 0, minWidth: 3, background: colorOf(it, bar.indexOf(it)) }} />
        ))}
      </div>
      <ul className="mt-3 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-2.5 gap-y-1 text-caption">
        {list.map((it, i) => {
          const inBar = !fold || i < slices;
          return (
            <li key={it.label} className="contents">
              <span aria-hidden className="h-2.5 w-2.5 rounded-[3px]" style={{ background: inBar ? colorOf(it, i) : OTHER }} />
              <span className="min-w-0 truncate" title={it.label}>{it.label}</span>
              <span className="text-right tabular-nums whitespace-nowrap">{it.right ?? `${fmt(it.value)}${unit}`} <span className="muted">· %{pct(it.value)}</span></span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export type ScoreItem = { label: string; score: number; right?: string };

/**
 * 0-100 puanlar: her satırda ince bir eksen, 60'ta eşik çizgisi ve puanın
 * yerinde bir nokta. Eşiğin altı sarı. Varsayılan sıra en zayıftan (bakılacak
 * yer üstte); 8'den uzunsa "tümünü göster".
 */
export function ScoreList({ items, threshold = 60, empty = "Henüz veri yok.", sort = true }: { items: ScoreItem[]; threshold?: number; empty?: string; sort?: boolean }) {
  const [all, setAll] = useState(false);
  if (!items.length) return <p className="muted text-caption">{empty}</p>;
  const list = sort ? [...items].sort((a, b) => a.score - b.score) : items;
  const shown = all ? list : list.slice(0, 8);
  const clamp = (v: number) => Math.max(0, Math.min(100, v));
  return (
    <div>
      <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)_auto] items-center gap-x-3 gap-y-1.5 text-caption">
        <span />
        <span aria-hidden className="faint relative h-4 text-micro tabular-nums">
          <span className="absolute left-0">0</span>
          <span className="absolute -translate-x-1/2" style={{ left: `${threshold}%` }}>{threshold}</span>
          <span className="absolute right-0">100</span>
        </span>
        <span />
        {shown.map((it, i) => {
          const low = it.score < threshold;
          return (
            <div key={`${it.label}-${i}`} className="contents">
              <span className="min-w-0 truncate" title={it.label}>{it.label}</span>
              <span className="relative h-4" aria-label={`${it.label}: ${it.score}`}>
                <span aria-hidden className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2" style={{ background: "var(--border)" }} />
                <span aria-hidden className="absolute top-0 h-4 w-px" style={{ left: `${threshold}%`, background: "var(--text-faint)" }} />
                <span aria-hidden className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ left: `${clamp(it.score)}%`, background: low ? TONE.warn : "var(--color-brand)", boxShadow: "0 0 0 2px var(--surface)" }} />
              </span>
              <span className="text-right tabular-nums whitespace-nowrap">
                <b style={low ? { color: TONE.warn } : undefined}>{Math.round(it.score)}</b>
                {it.right ? <span className="muted"> · {it.right}</span> : null}
              </span>
            </div>
          );
        })}
      </div>
      {list.length > 8 ? (
        <button type="button" onClick={() => setAll((x) => !x)} className="btn btn-ghost mt-2 h-8 px-3 text-caption">
          {all ? "İlk 8'i göster" : `Tümünü göster (${list.length})`}
        </button>
      ) : null}
    </div>
  );
}

/**
 * Bir sınıra göre doluluk (CPU, RAM, disk, kota): çubuk + uyarı (%75) ve
 * kritik (%90) eşik çizgileri. İlerleme çubuğu biçimi yalnız burada: gerçekten
 * "ne kadarı dolu" sorusu.
 */
export function Meter({ label, value, detail, warnAt = 75, badAt = 90 }: { label: string; value: number; detail?: string; warnAt?: number; badAt?: number }) {
  const tone = value >= badAt ? TONE.bad : value >= warnAt ? TONE.warn : "var(--color-brand)";
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 text-caption">
        <span className="text-strong">{label}</span>
        <span className="tabular-nums"><b style={{ color: value >= warnAt ? tone : undefined }}>%{Math.round(value)}</b>{detail ? <span className="muted"> · {detail}</span> : null}</span>
      </div>
      <div className="relative mt-1.5 h-2 rounded-[4px]" style={{ background: "var(--surface-2)" }}>
        <div className="h-full rounded-[4px]" style={{ width: `${Math.max(value > 0 ? 1 : 0, Math.min(100, value))}%`, background: tone }} />
        <span aria-hidden className="absolute -top-0.5 h-3 w-px" style={{ left: `${warnAt}%`, background: "var(--text-faint)" }} />
        <span aria-hidden className="absolute -top-0.5 h-3 w-px" style={{ left: `${badAt}%`, background: "var(--text-faint)" }} />
      </div>
    </div>
  );
}

/**
 * Eşiğe göre eğilim (Play vitals gibi oranlar): tek çizgi, eşik yatay kesik
 * çizgi (kesik YALNIZ eşik için), son nokta vurgulu. Boş günler çizgide boşluk.
 * Değerler metin olarak yanındaki Stat'ta; bu biçim "eşiğe yaklaşıyor mu".
 */
export function ThresholdTrend({ values, threshold, label, format = (v: number) => String(v) }: { values: (number | null)[]; threshold: number; label: string; format?: (v: number) => string }) {
  const nums = values.filter((v): v is number => v != null);
  if (nums.length < 2) return null;
  const W = 240, H = 56, top = 4, bottom = 4;
  const max = Math.max(threshold * 1.3, ...nums);
  const x = (i: number) => (i / (values.length - 1)) * W;
  const y = (v: number) => top + (1 - v / max) * (H - top - bottom);
  let d = "";
  values.forEach((v, i) => { if (v == null) return; d += `${d && values[i - 1] != null ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`; });
  const lastIx = values.map((v, i) => (v == null ? -1 : i)).filter((i) => i >= 0).pop() ?? 0;
  const last = values[lastIx] ?? 0;
  const over = last >= threshold;
  return (
    <svg role="img" aria-label={`${label}: ${values.length} gün, son ${format(last)}, eşik ${format(threshold)}`} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="mt-2 h-14 w-full overflow-visible">
      <line x1={0} x2={W} y1={y(threshold)} y2={y(threshold)} strokeWidth={1} strokeDasharray="4 3" vectorEffect="non-scaling-stroke" style={{ stroke: TONE.bad }} />
      <path d={d} fill="none" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ stroke: over ? TONE.bad : "var(--color-brand)" }} />
      <circle cx={x(lastIx)} cy={y(last)} r={3} style={{ fill: over ? TONE.bad : "var(--color-brand)" }} />
    </svg>
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
