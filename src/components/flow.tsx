"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Confetti } from "@/components/celebrate";

/**
 * AKIŞ ŞABLONLARI — kapak, sonuç, etap kartı ve durum ekranı tek dilde.
 *
 * Mobil `ui/flow.tsx` ile aynı parçalar, aynı sıra ve aynı alanlar. Otuzdan
 * fazla ekran (tur sonu, günün turu, patron, haftalık sınav, sınav sonuçları,
 * kapaklar, hata ve boş ekranlar) aynı bilgiyi birbirinden farklı çiziyordu:
 * maskot on bir ayrı boyda, kimi sonuçta hiç yok; konfeti dört ayrı eşikle;
 * düğme sırası ekrana göre değişiyor.
 *
 *   Kapak  — ikon karosu · başlık · tek cümle · kural satırları · Başla / Sonra
 *   Sonuç  — band (tür · başlık · ana sayı · maskot) → en çok üç sayı →
 *            notlar → ayrıntı kartları → tek birincil düğme
 *   Etap   — sonucun küçük hâli (bandın dibinde etap şeridi)
 *   Durum  — (isteğe bağlı ikon) · başlık · tek cümle · tek çıkış yolu
 */

/** Şablonların sütunu — kartla aynı genişlik. */
export function FlowColumn({ children, celebrate = false, className = "" }: { children: ReactNode; celebrate?: boolean; className?: string }) {
  return (
    <div className={`relative mx-auto flex w-full max-w-md flex-col gap-3 ${className}`}>
      {celebrate ? <Confetti fire={1} /> : null}
      {children}
    </div>
  );
}

/** `hint`: düğmenin altında ikinci, küçük satır (ör. "Sınav olarak dene" · "yardım yok, 5 tur"). */
export type FlowAction =
  | { label: ReactNode; onClick: () => void; href?: undefined; disabled?: boolean; icon?: ReactNode; hint?: ReactNode }
  | { label: ReactNode; href: string; onClick?: () => void; disabled?: undefined; icon?: ReactNode; hint?: ReactNode };

function ActionEl({ a, className }: { a: FlowAction; className: string }) {
  const label = a.hint ? (
    <span className="flex flex-col items-center">
      {a.label}
      <span className="muted text-micro font-normal">{a.hint}</span>
    </span>
  ) : (
    a.label
  );
  if (a.href) {
    return (
      <Link href={a.href} prefetch={false} onClick={a.onClick} className={className}>
        {a.icon}
        {label}
      </Link>
    );
  }
  return (
    <button type="button" onClick={a.onClick} disabled={a.disabled} className={className}>
      {a.icon}
      {label}
    </button>
  );
}

/** Düğme sırası her ekranda aynı: birincil (tek) → çerçeveli (en çok bir) → metin bağlantısı. */
export function FlowActions({ primary, secondary, tertiary }: { primary?: FlowAction | null; secondary?: FlowAction | null; tertiary?: FlowAction | null }) {
  return (
    <div className="flex flex-col gap-2">
      {primary ? <ActionEl a={primary} className="btn btn-primary w-full px-5 py-4 disabled:opacity-60" /> : null}
      {secondary ? (
        <ActionEl
          a={secondary}
          className="btn w-full border-[1.5px] px-5 py-4 text-strong disabled:opacity-60"
        />
      ) : null}
      {tertiary ? <ActionEl a={tertiary} className="btn muted w-full px-5 py-2.5 text-strong" /> : null}
    </div>
  );
}

export type PillTone = "brand" | "ok" | "bad";

/**
 * Sonuç bandı — ne bitti, ana sayı, maskot.
 *
 * `quiet`: olumsuz sonuç (geçilmedi, süre bitti). Band marka renginden nötr
 * yüzeye iniyor, sonuç etiketi kırmızı; yerleşim aynı.
 */
export function ResultHero({
  eyebrow,
  title,
  figure,
  sub,
  pill,
  quiet = false,
  segments,
  live = true,
  aside,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  figure?: ReactNode;
  sub?: ReactNode;
  pill?: { text: ReactNode; tone?: PillTone } | null;
  quiet?: boolean;
  segments?: { done: number; total: number } | null;
  live?: boolean;
  /**
   * Bandın sağ ucundaki düğüm. ESKİDEN `mood` ALIRDI ve Erdi'yi kendisi
   * çizerdi; animasyon artık yalnız günlük turda olduğu için bu şablon
   * maskotu tanımıyor (bkz. `components/mascot` dosya başı). Turun sonuç
   * bandı kendi Erdi'sini buraya veriyor, öteki sonuç ekranları boş bırakıyor.
   */
  aside?: ReactNode;
}) {
  const pillStyle = !pill
    ? undefined
    : quiet
      ? {
          background: pill.tone === "ok" ? "color-mix(in srgb, var(--color-mint-500) 14%, transparent)" : pill.tone === "bad" ? "color-mix(in srgb, var(--color-rose-500) 14%, transparent)" : "color-mix(in srgb, var(--color-brand-500) 14%, transparent)",
          color: pill.tone === "ok" ? "var(--color-mint)" : pill.tone === "bad" ? "var(--color-rose)" : "var(--color-brand)",
        }
      : { background: "rgb(255 255 255 / 0.22)", color: "#fff" };
  return (
    /* Dolu bandın gölgesi DOLGUNUN RENGİ (`glow-tint`, mobil
       `softShadow(colors.primary, 14)`): nötr `shadow-soft` turuncu bandın
       altına kahverengi gölge düşürüyordu. Geometri nötr aileyle aynı. */
    <section
      role={live ? "status" : undefined}
      className={`overflow-hidden rounded-card p-4 ${quiet ? "card" : "brand-gradient-deep glow-tint"}`}
      style={quiet ? undefined : ({ "--tint-fill": "var(--color-brand-500)" } as React.CSSProperties)}
    >
      <div className="flex items-end gap-3">
        <div className="min-w-0 flex-1">
          <p className={`text-micro uppercase tracking-eyebrow ${quiet ? "muted" : "opacity-80"}`}>{eyebrow}</p>
          <h2 className="text-h2">{title}</h2>
          {figure != null ? <p className="mt-1 text-display tabular-nums">{figure}</p> : null}
          {sub ? <p className={`mt-1 text-body ${quiet ? "muted" : "opacity-90"}`}>{sub}</p> : null}
          {pill ? (
            <span className="mt-2 inline-block rounded-full px-2.5 py-0.5 text-micro font-extrabold" style={pillStyle}>
              {pill.text}
            </span>
          ) : null}
        </div>
        {aside}
      </div>
      {segments && segments.total > 1 ? (
        <div className="mt-3 flex gap-1" aria-hidden>
          {Array.from({ length: segments.total }).map((_, i) => (
            <span
              key={i}
              className="block h-1.5 flex-1 rounded-full"
              style={{ background: i < segments.done ? (quiet ? "var(--text)" : "#fff") : quiet ? "var(--surface-2)" : "rgb(255 255 255 / 0.35)" }}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}

/** En çok üç sayı — aynı bileşen her sonuçta. */
export function StatRow({ items }: { items: { value: ReactNode; label: ReactNode; tone?: "ok" | "bad" | "streak" | null }[] }) {
  const shown = items.slice(0, 3);
  return (
    <div className="card grid divide-x" style={{ gridTemplateColumns: `repeat(${shown.length}, minmax(0, 1fr))`, borderColor: "var(--hairline)" }}>
      {shown.map((it, i) => (
        <div key={i} className="px-1 py-3 text-center" style={{ borderColor: "var(--hairline)" }}>
          <p
            className="truncate text-h2 tabular-nums"
            style={{ color: it.tone === "ok" ? "var(--color-mint)" : it.tone === "bad" ? "var(--color-rose)" : it.tone === "streak" ? "var(--color-flame)" : undefined }}
          >
            {it.value}
          </p>
          <p className="muted text-micro uppercase tracking-eyebrow">{it.label}</p>
        </div>
      ))}
    </div>
  );
}

/** Ayrıntı kartı — başlık + içerik (zorlandıkların, sıralama, bölümler…). */
export function DetailCard({ title, children, right }: { title: ReactNode; children: ReactNode; right?: ReactNode }) {
  return (
    <section className="card flex flex-col gap-2 p-4">
      <div className="flex items-center gap-2">
        <p className="muted min-w-0 flex-1 text-micro uppercase tracking-eyebrow">{title}</p>
        {right}
      </div>
      {children}
    </section>
  );
}

/** Ayrıntı kartında satır: solda hedef dildeki kelime, sağda anlamı. */
export function DetailRow({ left, right, faded = false, lang }: { left: ReactNode; right?: ReactNode; faded?: boolean; lang?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3" style={{ opacity: faded ? 0.55 : 1 }}>
      <span className="min-w-0 text-strong" lang={lang}>{left}</span>
      {right ? <span className="muted min-w-0 text-right text-caption">{right}</span> : null}
    </div>
  );
}

/** Bandın altında tek satırlık bilgi (seri kurtarıldı, kayıt kuyruğa alındı…). */
export function FlowNote({ icon, text, tone = "neutral" }: { icon?: ReactNode; text: ReactNode; tone?: "neutral" | "ok" | "warn" | "bad" }) {
  const fill = tone === "ok" ? "var(--color-mint-500)" : tone === "warn" ? "var(--color-flame-500)" : tone === "bad" ? "var(--color-rose-500)" : null;
  const ink = tone === "ok" ? "var(--color-mint)" : tone === "warn" ? "var(--color-flame)" : tone === "bad" ? "var(--color-rose)" : undefined;
  return (
    <p
      className={`flex items-center gap-2 rounded-panel px-3 py-2 text-caption ${fill ? "" : "surface-2"}`}
      style={fill ? { background: `color-mix(in srgb, ${fill} 14%, transparent)`, color: ink } : undefined}
    >
      {icon}
      <span className="min-w-0 flex-1">{text}</span>
    </p>
  );
}

export type CoverRule = { icon: ReactNode; text: ReactNode; tone?: "ok" | "bad" | null };

/** Kapak — başlamadan önce: ne, ne kadar, hangi kuralla. */
export function CoverBody({
  icon,
  tint,
  eyebrow,
  title,
  pitch,
  rules = [],
  note,
  children,
}: {
  icon: ReactNode;
  tint: string;
  eyebrow: ReactNode;
  title: ReactNode;
  pitch?: ReactNode;
  rules?: CoverRule[];
  note?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <span
        className="glow-tint-sm flex h-14 w-14 items-center justify-center rounded-panel"
        style={{ background: tint, color: "#fff", "--tint-fill": tint } as React.CSSProperties}
      >
        {icon}
      </span>
      <div>
        <p className="muted text-micro uppercase tracking-eyebrow">{eyebrow}</p>
        <h1 className="text-h1">{title}</h1>
        {pitch ? <p className="muted mt-1 text-body">{pitch}</p> : null}
      </div>
      {rules.length ? (
        <ul className="card flex flex-col gap-3 p-4">
          {rules.map((r, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-chip ${r.tone ? "" : "surface-2 muted"}`}
                style={
                  r.tone
                    ? {
                        background: `color-mix(in srgb, var(--color-${r.tone === "ok" ? "mint" : "rose"}-500) 14%, transparent)`,
                        color: `var(--color-${r.tone === "ok" ? "mint" : "rose"})`,
                      }
                    : undefined
                }
              >
                {r.icon}
              </span>
              <span className="pt-0.5 text-body">{r.text}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {note ? <p className="muted text-caption">{note}</p> : null}
      {children}
    </div>
  );
}

/** Durum — boş, bitti, açılamadı, giriş gerekli: maskot · başlık · tek cümle. */
export function StateBody({ title, body, icon, children, alert = false }: { title: ReactNode; body?: ReactNode; icon?: ReactNode; children?: ReactNode; alert?: boolean }) {
  return (
    <div role={alert ? "alert" : "status"} className="card flex flex-col items-center gap-2 px-4 py-7 text-center">
      {icon}
      <h2 className="mt-1 text-h2">{title}</h2>
      {body ? <p className="muted max-w-[34ch] text-body">{body}</p> : null}
      {children ? <div className="mt-3 w-full">{children}</div> : null}
    </div>
  );
}
