"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DECAY_DAYS, bandKey, type Band } from "@/lib/proficiency";
import { SkeletonBar, SkeletonLine, SkeletonTile, TextBox } from "@/components/skeleton";
import { Disclosure } from "@/components/disclosure";
import { ForwardIcon } from "@/components/icons";
import { useCachedJson } from "@/lib/use-cached";
import type { GrowthReport, WeekPoint } from "@/lib/growth";
import { trendOf, verdictOf, type Trend } from "@/lib/growth-verdict";
import { useT, useLang } from "@/lib/i18n/client";
import { formatDay } from "@/lib/i18n/dict";
import { localDay } from "@/lib/day";
import { barPct } from "@/lib/motion";

/**
 * Gelişim ekranının ÖLÇÜM yüzü — "Nasıl gidiyorum" kartı ve "Zaman içinde".
 *
 * Eskiden tek bir panel vardı ("Gelişim · A1": sayfa başlığını tekrarlıyordu)
 * ve "Nasıl gidiyorum" diye açılan bölüm aslında yalnız sekiz haftalık
 * çizgileri gösteriyordu: soru soruluyor, cevap verilmiyordu. Şimdi kart
 * cevabın kendisi: düz dilde bir hüküm cümlesi, her becerinin bandı ve
 * gidişatı (dört hafta öncesine göre ±3; kanıt azsa "az ölçüm") ve hemen
 * altında sıradaki adım. Çizgiler ve kilometre taşları ayrı bir kartta.
 *
 * Rapor tek istekle geliyor (`useGrowth`) ve iki kart aynı veriyi okuyor; sayfa
 * onları farklı yerlere diziyor. Mobil karşılığı `mobile/src/ui/GrowthPanel.tsx`.
 */
export function useGrowth(): GrowthReport | null | undefined {
  /* Gün istemcinin YEREL günü: uç gün gelmezse sunucunun UTC gününe düşüyor
     ve gece yarısına yakın açılan rapor bir gün kaymış seriyle çiziliyordu. */
  const { data } = useCachedJson<GrowthReport>("growth", `/api/growth?day=${localDay()}`, (body) => {
    const g = body as Partial<GrowthReport>;
    // 200 dönen ama biçimi tutmayan bir cevapta kör dönüşüm bütün sayfayı
    // hata sınırına düşürüyordu; kart kendini gizlemeli, ekranı indirmemeli.
    return Array.isArray(g?.proficiency) && g?.series ? (g as GrowthReport) : null;
  });
  return data;
}

/** Bant → renk ailesi. İki platformda aynı eşleme (mobil `bandTint`). */
const BAND_TONE: Record<Band, string> = {
  beginner: "rose",
  developing: "flame",
  solid: "brand",
  mastered: "mint",
};

const TREND_KEY: Record<Trend, string> = {
  up: "progp.trend_up",
  down: "progp.trend_down",
  flat: "progp.trend_flat",
  new: "progp.trend_new",
  low: "progp.trend_low",
};
const TREND_MARK: Record<Trend, string> = { up: "▲", down: "▼", flat: "→", new: "•", low: "•" };

/** Kartın başlığı — kartın DIŞINDA, `h3` (Öğren ve Profil'in bölüm başlığı). */
export function HowAmIDoingHead({ data }: { data: GrowthReport | null | undefined }) {
  const t = useT();
  return (
    <div className="mb-2 flex items-baseline justify-between gap-3 px-1">
      <h2 className="text-h3">{t("progp.how_am_i_doing")}</h2>
      {data === undefined ? (
        <SkeletonLine variant="caption" width={120} />
      ) : data && data.proficiency.some((p) => p.now !== null) ? (
        <span className="muted shrink-0 text-caption">{t("progp.window", { n: data.evidenceCount, days: DECAY_DAYS })}</span>
      ) : null}
    </div>
  );
}

export function HowAmIDoing({ data }: { data: GrowthReport | null | undefined }) {
  const t = useT();

  /* İskelet kartın gerçek yapısında: hüküm cümlesi, iki sütuna dizilen altı
     beceri satırı (ad + bant çipi, gidişat + puan, çubuk), ölçülmeyenler
     satırı ve sıradaki adım. */
  if (data === undefined)
    return (
      <section role="status" aria-busy="true" aria-label={t("progp.loading")} className="card p-4">
        <SkeletonLine variant="strong" width="80%" />
        <div className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i}>
              <div className="flex items-center justify-between gap-2">
                <SkeletonLine variant="strong" width={110} />
                <SkeletonLine variant="caption" width={70} />
              </div>
              <SkeletonBar height={6} className="mt-1.5" />
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3 rounded-panel p-3 surface-2">
          <SkeletonTile size={40} />
          <span className="min-w-0 flex-1">
            <SkeletonLine variant="strong" width="60%" />
            <SkeletonLine variant="caption" width="80%" />
          </span>
          <TextBox variant="caption" className="h-9 shrink-0 rounded-panel" style={{ width: 64 }} />
        </div>
      </section>
    );
  if (!data) return null;

  const v = verdictOf(data.proficiency);
  const next = data.next;

  /* BOŞ HÂL. Yeni kullanıcı kartı GÖRÜYOR: gizlemek "burada bir şey olacak"
     bilgisini de saklıyordu. Kısa açıklama + tek düğme. */
  if (!v.measured) {
    return (
      <section className="card p-4">
        <p className="text-strong">{t("progp.empty_title")}</p>
        <p className="muted mt-0.5 text-body">{t("progp.empty_text")}</p>
        <Link href={next ? growthHref(next.href) : "/learn"} prefetch={false} className="btn btn-primary mt-3 inline-flex px-4 py-2 text-body">
          {t("common.start")}
        </Link>
      </section>
    );
  }

  const headline = [
    v.firm === 0 ? t("progp.verdict_early") : null,
    v.up ? t("progp.verdict_up", { n: v.up }) : null,
    v.down ? t("progp.verdict_down", { n: v.down }) : null,
    v.firm > 0 && !v.up && !v.down ? t("progp.verdict_steady") : null,
    v.focus ? t("progp.verdict_focus", { skill: v.focus }) : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className="card p-4">
      <p className="text-strong">{headline}</p>

      <dl className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
        {data.proficiency
          .filter((p) => p.now !== null)
          .map((p) => {
            const tr = trendOf(p);
            const tone = p.band ? BAND_TONE[p.band] : "brand";
            const trendColor = tr === "up" ? "var(--color-mint)" : tr === "down" ? "var(--color-rose)" : "var(--text-muted)";
            return (
              <div key={p.skill}>
                <dt className="flex items-center justify-between gap-2">
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="truncate text-strong">{p.label}</span>
                    {/* Bant bir KİMLİK ("developing"), gösterilecek metin değil. */}
                    {p.band ? (
                      <span
                        className="shrink-0 rounded-full px-2 py-0.5 text-micro"
                        style={{
                          background: tone === "brand" ? "var(--brand-tint)" : `color-mix(in srgb, var(--color-${tone}-500) 14%, transparent)`,
                          color: `var(--color-${tone})`,
                        }}
                      >
                        {t(bandKey(p.band))}
                      </span>
                    ) : null}
                  </span>
                  <span className="flex shrink-0 items-baseline gap-2 tabular-nums">
                    {tr ? (
                      <span className="text-caption" style={{ color: trendColor }}>
                        <span aria-hidden>{TREND_MARK[tr]} </span>
                        {t(TREND_KEY[tr])}
                      </span>
                    ) : null}
                    <span className="text-strong">{p.now}</span>
                  </span>
                </dt>
                <dd className="mt-1.5 h-1.5 overflow-hidden rounded-full surface-2">
                  <div className="h-full rounded-full" style={{ width: `${barPct(p.now ?? 0)}%`, background: `var(--color-${tone})` }} />
                </dd>
              </div>
            );
          })}
      </dl>

      {/* Ölçülmeyen beceriler TEK satırda: altı "ölçülmedi" çubuğu yeni
          kullanıcıya kendi eksikliğini gösteren bir liste olurdu. */}
      {v.unmeasured.length ? (
        <p className="muted mt-3 text-caption">
          {t("progp.unmeasured", { n: v.unmeasured.length })} · {v.unmeasured.join(", ")}
        </p>
      ) : null}

      {/* Önerilen adım hükmün hemen altında: "buradasın" ile "şunu yap"
          arasında bir ekran mesafesi olmamalı. */}
      {next ? (
        <Link href={growthHref(next.href)} prefetch={false} className="pressable mt-4 flex items-center gap-3 rounded-panel p-3" style={{ background: "var(--brand-tint)" }}>
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-tile glow-tint-sm"
            style={{ background: "var(--brand-fill)", color: "var(--on-brand)", "--tint-fill": "var(--brand-fill)" } as React.CSSProperties}
          >
            <ForwardIcon size={20} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-strong">{t("skills.next")}: {next.title}</span>
            <span className="muted block truncate text-caption">
              {/* "dk" SOZLUKTEN: Ingilizce/Almanca arayuzde de "12 dk" yaziyordu. */}
              {next.reason} · {t("skills.dk", { n: next.minutes })}
            </span>
          </span>
          <span className="btn btn-primary h-9 shrink-0 px-3 text-caption">{t("common.start")}</span>
        </Link>
      ) : null}
    </section>
  );
}

/** Tablet/masaüstü mü — "Zaman içinde" orada açık geliyor. */
function useWide(): boolean {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return wide;
}

/**
 * Zaman içinde — sekiz haftalık çizgiler ve kilometre taşları.
 * Telefonda kapalı (hüküm "neredeyim"i zaten söylüyor, burası "neden" diye
 * soran için); geniş ekranda yer var, açık geliyor.
 */
export function GrowthTrends({ data }: { data: GrowthReport | null | undefined }) {
  const t = useT();
  const lang = useLang();
  const wide = useWide();
  if (!data || !data.weeks.length) return null;
  const hasSeries = Object.values(data.series).some((s) => s.some((p) => p.value !== null));
  if (!hasSeries && !data.milestones.length) return null;

  return (
    <section className="card px-4 py-3">
      <Disclosure key={wide ? "wide" : "phone"} defaultOpen={wide} panel="growth" title={t("progp.over_time")} hint={t("progp.n_weeks", { n: data.weeks.length })}>
        <div className="space-y-3 pb-1">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            <Spark title={t("exam.sec_writing")} points={data.series.writing} max={100} color="var(--color-brand)" />
            <Spark title={t("exam.sec_speaking")} points={data.series.speaking} max={100} color="var(--color-mint)" />
            <Spark title={t("exam.title")} points={data.series.usage} max={100} color="var(--color-flame)" />
            <Spark title={t("prog.answers")} points={data.series.answers} color="var(--text-muted)" />
          </div>

          {data.milestones.length ? (
            <div>
              <p className="muted text-micro uppercase tracking-eyebrow">{t("progw.milestones")}</p>
              <ul className="mt-1.5 space-y-1 text-body">
                {data.milestones.map((m) => (
                  <li key={`${m.at}-${m.text}`} className="flex items-baseline gap-2">
                    {/* TARİH ARAYÜZ DİLİNDE; gün-yalnız dizgi `T00:00:00` ile
                        okunuyor, yoksa UTC kayması tarihi bir gün geri alıyor. */}
                    <span className="muted shrink-0 text-caption tabular-nums">
                      {formatDay(m.at, lang, { year: true })}
                    </span>
                    <span>{m.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </Disclosure>
    </section>
  );
}

/**
 * Satır içi SVG çizgi — kütüphane yok, renk tema değişkeninden.
 *
 * Veri olmayan hafta çizgide BOŞLUK bırakıyor. Sıfır çizmek "o hafta kötüydü"
 * demek olurdu; oysa söylediği şey "o hafta ölçülmedi".
 */
function Spark({
  title,
  points,
  max,
  color,
}: {
  title: string;
  points: WeekPoint[];
  max?: number;
  color: string;
}) {
  const values = points.map((p) => p.value);
  const top = max ?? Math.max(1, ...values.map((v) => v ?? 0));
  const W = 120;
  const H = 32;
  const step = W / Math.max(1, points.length - 1);
  const coords = values.map((v, i) =>
    v === null ? null : ([i * step, H - (Math.min(v, top) / top) * (H - 4) - 2] as const),
  );
  let d = "";
  let open = false;
  coords.forEach((c) => {
    if (!c) {
      open = false;
      return;
    }
    d += `${open ? "L" : "M"}${c[0].toFixed(1)},${c[1].toFixed(1)} `;
    open = true;
  });
  const last = [...values].reverse().find((v) => v !== null) ?? null;
  const label = points.map((p, i) => `${p.week}: ${values[i] ?? "—"}`).join(", ");
  return (
    <figure className="rounded-panel px-2.5 py-2 surface-2">
      <figcaption className="flex items-baseline justify-between text-caption">
        <span className="font-semibold">{title}</span>
        <span className="muted tabular-nums">{last ?? "—"}</span>
      </figcaption>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-1 h-8 w-full"
        role="img"
        aria-label={`${title}: ${label}`}
      >
        <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {coords.map((c, i) => (c ? <circle key={i} cx={c[0]} cy={c[1]} r="2" fill={color} /> : null))}
      </svg>
    </figure>
  );
}

/** Gelişim'den açılan alıştırma Kapat'ta Gelişim'e dönsün (`immersion/skill/[id]` `from=growth`). */
function growthHref(href: string): string {
  return href.startsWith("/immersion/skill/") ? `${href}${href.includes("?") ? "&" : "?"}from=growth` : href;
}
