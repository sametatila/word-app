"use client";

import Link from "next/link";
import { CardSkeleton } from "@/components/skeleton";
import { Disclosure } from "@/components/disclosure";
import { WeakSpotsCard } from "@/components/weak-spots-card";
import { useCachedJson } from "@/lib/use-cached";
import type { GrowthReport, WeekPoint } from "@/lib/growth";

/**
 * "Gelişimin" — profilin ölçüm bloğu.
 *
 * Burada iki kart vardı ve ikisi de Beceriler ekranındaydı: "Yetkinlik"
 * (altı becerinin puanı) ve onun ayrıntısındaki "Gelişim" (aynı altı becerinin
 * dört haftalık değişimi). Aynı sayıyı iki kez, iki ayrı sorgudan çiziyorlardı
 * ve ikisi de yanlış ekrandaydı: Beceriler bir ÇALIŞMA ekranı — "ne yapayım"
 * sorusunu cevaplıyor — ölçüm ise "neredeyim" sorusunun cevabı, yani profilin
 * işi.
 *
 * Birleşince ikilenme de bitti: bir satır artık hem puanı hem değişimi hem
 * bandı taşıyor. "84 ▲6 sağlam" üç ayrı kutuda üç kez söylenen şeyin tamamı.
 *
 * Profilden "Oyun performansın" kartı da kalktı. Oyun başına doğruluk yüzdesi
 * burada zaten var, üstelik daha doğru biçimde: oyunlar artık yetkinlik
 * modeline giriyor ve kelimenin SEVİYESİNE göre ayrışıyor — "Eşleştirmede
 * %88" ile "B1 kelimede %88" arasındaki fark, ikincisinin bir şey ifade
 * etmesi.
 *
 * Kart önce önbellekten çiziliyor (bkz. lib/use-cached): rapor altı sorgu
 * çalıştırıyor ve her profil açılışında boş bir kutu görmek, bu bloğun
 * varlığından daha kötü.
 */
export function ProgressPanel() {
  const { data } = useCachedJson<GrowthReport>("growth", "/api/growth", (body) => {
    const g = body as Partial<GrowthReport>;
    // 200 dönen ama biçimi tutmayan bir cevapta kör dönüşüm bütün profili
    // hata sınırına düşürüyordu; kart kendini gizlemeli, ekranı indirmemeli.
    return Array.isArray(g?.proficiency) && g?.series ? (g as GrowthReport) : null;
  });

  if (data === undefined) return <CardSkeleton height={280} label="Gelişimin yükleniyor" />;
  if (!data) return null;

  const measured = data.proficiency.filter((p) => p.now !== null);
  const hasSeries = Object.values(data.series).some((s) => s.some((p) => p.value !== null));
  // Hiç ölçüm yoksa kart görünmüyor: "ölçülmedi" yazan altı çubuk, yeni
  // kullanıcıya kendi eksikliğini gösteren bir liste demek.
  if (!measured.length && !hasSeries) return null;

  return (
    <section className="card p-4">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-bold">Gelişimin · {data.level}</h2>
        <span className="muted shrink-0 text-xs font-semibold">
          son 30 gün · {data.evidenceCount} ölçüm
        </span>
      </div>

      {data.summary.text ? <p className="mt-1.5 text-sm">{data.summary.text}</p> : null}

      <dl className="mt-3 grid gap-x-4 gap-y-2.5 sm:grid-cols-2">
        {data.proficiency.map((p) => {
          const delta = p.now !== null && p.before !== null ? p.now - p.before : null;
          return (
            <div key={p.skill}>
              <dt className="flex items-baseline justify-between gap-2 text-xs">
                <span className="font-semibold">{p.label}</span>
                <span className="muted shrink-0 tabular-nums">
                  {p.now === null ? (
                    "ölçülmedi"
                  ) : (
                    <>
                      {p.now}
                      {/* Değişim yalnızca dört hafta önce de ölçüm VARSA
                          gösteriliyor. Yokluğu sıfır saymak, yeni başlayan
                          herkese "hiç ilerlemedin" demek olurdu. */}
                      {delta !== null && delta !== 0 ? (
                        <span
                          style={{ color: delta > 0 ? "var(--color-mint)" : "var(--color-rose)" }}
                        >
                          {" "}
                          {delta > 0 ? "+" : "−"}
                          {Math.abs(delta)}
                        </span>
                      ) : null}
                      {p.band ? <span className="ml-1.5">{p.band}</span> : null}
                    </>
                  )}
                </span>
              </dt>
              <dd className="mt-1 h-1.5 overflow-hidden rounded-full surface-2">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${p.now ?? 0}%`, background: tone(p.now) }}
                />
              </dd>
            </div>
          );
        })}
      </dl>

      {/* Önerilen adım ölçümün hemen altında: "buradasın" ile "şunu yap"
          arasında bir ekran mesafesi olmamalı. */}
      {data.next ? (
        <Link
          href={data.next.href}
          className="mt-3 flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 surface-2"
        >
          <span className="min-w-0">
            <span className="block text-sm font-semibold">Sıradaki: {data.next.title}</span>
            <span className="muted block truncate text-xs">
              {data.next.reason} · {data.next.minutes} dk
            </span>
          </span>
          <span className="btn btn-primary shrink-0 px-3 py-1.5 text-xs">Başla</span>
        </Link>
      ) : null}

      {/* Ayrıntı kapalı geliyor: yukarıdaki altı çubuk "neredeyim" sorusuna
          zaten cevap veriyor, aşağısı cevabı beğenmeyip "neden" diye soran
          için. */}
      <div className="mt-3 border-t pt-2" style={{ borderColor: "var(--border)" }}>
        <Disclosure title="Nasıl gidiyorum" hint={`${data.weeks.length} hafta`}>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2.5">
              <Spark title="Yazma" points={data.series.writing} max={100} color="var(--color-brand)" />
              <Spark title="Konuşma" points={data.series.speaking} max={100} color="var(--color-mint)" />
              <Spark title="Sınav" points={data.series.usage} max={100} color="var(--color-flame)" />
              <Spark title="Cevap" points={data.series.answers} color="var(--text-muted)" />
            </div>

            <WeakSpotsCard bare />

            {data.milestones.length ? (
              <div>
                <p className="muted text-[11px] font-bold uppercase tracking-wide">
                  Kilometre taşları
                </p>
                <ul className="mt-1.5 space-y-1 text-sm">
                  {data.milestones.map((m) => (
                    <li key={`${m.at}-${m.text}`} className="flex items-baseline gap-2">
                      <span className="muted shrink-0 text-xs tabular-nums">{m.at}</span>
                      <span>{m.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </Disclosure>
      </div>
    </section>
  );
}

function tone(score: number | null) {
  if (score === null) return "var(--surface-2)";
  if (score >= 85) return "var(--color-mint)";
  if (score >= 70) return "var(--color-brand)";
  if (score >= 40) return "var(--color-flame)";
  return "var(--color-rose)";
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
    <figure className="rounded-xl px-2.5 py-2 surface-2">
      <figcaption className="flex items-baseline justify-between text-xs">
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
