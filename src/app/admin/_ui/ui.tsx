import type { CSSProperties, ReactNode } from "react";

/**
 * YÖNETİM PANELİNİN TASARIM DİLİ — tek yer.
 *
 * Panel sayfa sayfa büyüdü ve her sayfa kendi `Section`, `Card`, `Table`,
 * `Empty` kopyasını taşıyordu: dört ayrı kart biçimi (gölgeli, kenarlıklı,
 * başlık içte, başlık dışta), üç ayrı sayfa genişliği, sabit onaltılık renkler
 * ve aynı işi gören düğmelerin turuncu, gri ya da çip görünmesi. Sayfalar artık
 * yalnız buradaki parçaları kullanıyor:
 *
 *   PageHeader   sayfa başlığı + açıklama + sağda eylemler
 *   Panel        tek kart biçimi (başlık, ipucu, sağda eylem)
 *   Stat/Stats   sayı kutusu ve ızgarası
 *   Notice       uyarı/bilgi şeridi (ton: bad, warn, ok, info)
 *   DataTable    tablo
 *   BarList      yatay çubuk listesi
 *   KeyValue     alan: değer ızgarası
 *   Empty        boş durum
 *   BTN / FIELD  düğme ve giriş alanı sınıfları
 *
 * Renkler anlamsal jetonlardan (`--color-rose/mint/flame`): koyu temada da
 * okunur kalıyorlar (bkz. `check:colors`). Sunucu ve istemci bileşenleri aynı
 * dosyayı kullanabilsin diye burada kanca yok.
 */

export type Tone = "ok" | "warn" | "bad" | "info";

export const TONE: Record<Tone, string> = {
  ok: "var(--color-mint)",
  warn: "var(--color-flame)",
  bad: "var(--color-rose)",
  info: "var(--color-brand)",
};

/** Sayı biçimi: 1.2k, 3.4M. */
export function fmt(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "k";
  return String(Math.round(n));
}

/**
 * Panelin saat dilimi SABİT. İstemci bileşenleri önce sunucuda (UTC) sonra
 * tarayıcıda çiziliyor; dilim verilmezse iki çizim farklı saat yazıyor ve
 * React hidrasyonu metin uyuşmazlığıyla bozuluyor (#418).
 */
export const ADMIN_TZ = "Europe/Istanbul";

/** ISO → "17.09.2026 14:05" (İstanbul saati). Boşsa tire. */
export function when(iso: string | null | undefined, withTime = true): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return withTime ? d.toLocaleString("tr-TR", { dateStyle: "short", timeStyle: "short", timeZone: ADMIN_TZ }) : d.toLocaleDateString("tr-TR", { timeZone: ADMIN_TZ });
}

/** Sayfa gövdesi: bütün yönetim sayfaları aynı genişlikte. */
export function AdminPage({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl space-y-5 px-4 pb-20 pt-6 sm:px-6">{children}</div>;
}

export function PageHeader({ title, description, actions, meta, crumb }: {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  /** Başlığın altında küçük satır: veri yaşı, sayılar. */
  meta?: ReactNode;
  /** Üst sayfaya dönüş: [href, etiket]. */
  crumb?: [string, string];
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
      <div className="min-w-0">
        {crumb ? (
          <a href={crumb[0]} className="text-caption muted underline-offset-2 hover:underline">
            ← {crumb[1]}
          </a>
        ) : null}
        <h1 className="text-h1 break-words">{title}</h1>
        {description ? <p className="muted mt-1 max-w-[75ch] text-body">{description}</p> : null}
        {meta ? <div className="muted mt-1 text-caption">{meta}</div> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  );
}

const panelStyle: CSSProperties = { borderColor: "var(--border)", background: "var(--surface)" };

/** Tek kart biçimi. `span` geniş ızgarada iki sütun kaplar; `flush` iç boşluğu tabloya bırakır. */
export function Panel({ title, hint, actions, children, span, flush, tone, id }: {
  title?: ReactNode;
  hint?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
  span?: boolean;
  flush?: boolean;
  tone?: Tone;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`min-w-0 rounded-panel border ${span ? "lg:col-span-2" : ""}`}
      style={tone ? { ...panelStyle, borderColor: TONE[tone] } : panelStyle}
    >
      {title || actions ? (
        <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2 px-4 pt-4 sm:px-5">
          <div className="min-w-0">
            {title ? <h2 className="text-h3">{title}</h2> : null}
            {hint ? <p className="muted mt-0.5 max-w-[80ch] text-caption">{hint}</p> : null}
          </div>
          {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
        </div>
      ) : null}
      <div className={flush ? "mt-2 px-1 pb-2 sm:px-2" : `px-4 pb-4 sm:px-5 ${title || actions ? "pt-3" : "pt-4"}`}>{children}</div>
    </section>
  );
}

/** Panel ızgarası: dar ekranda tek, genişte iki sütun. */
export function PanelGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-5 lg:grid-cols-2">{children}</div>;
}

export function Stat({ label, value, sub, tone }: { label: string; value: ReactNode; sub?: ReactNode; tone?: Tone }) {
  return (
    <div className="min-w-0">
      <div className="muted text-micro uppercase tracking-eyebrow">{label}</div>
      <div className="text-h2 tabular-nums" style={tone ? { color: TONE[tone] } : undefined}>{value}</div>
      {sub ? <div className="muted text-caption">{sub}</div> : null}
    </div>
  );
}

/** Sayı ızgarası. `cols` geniş ekrandaki sütun sayısı. */
export function Stats({ children, cols = 4 }: { children: ReactNode; cols?: 2 | 3 | 4 | 5 | 6 | 7 | 8 }) {
  const lg = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-4", 5: "sm:grid-cols-3 lg:grid-cols-5", 6: "sm:grid-cols-3 lg:grid-cols-6", 7: "sm:grid-cols-4 lg:grid-cols-7", 8: "sm:grid-cols-4 lg:grid-cols-8" }[cols];
  return <div className={`grid grid-cols-2 gap-x-4 gap-y-4 ${lg}`}>{children}</div>;
}

export function Notice({ tone = "info", title, children, role }: { tone?: Tone; title?: ReactNode; children?: ReactNode; role?: "alert" | "status" }) {
  return (
    <div
      role={role ?? (tone === "bad" ? "alert" : "status")}
      className="rounded-tile border px-4 py-3 text-body"
      style={{ borderColor: TONE[tone], background: `color-mix(in srgb, ${TONE[tone]} 7%, var(--surface))` }}
    >
      {title ? <div className="text-strong" style={{ color: TONE[tone] }}>{title}</div> : null}
      {children ? <div className={title ? "mt-1" : ""}>{children}</div> : null}
    </div>
  );
}

/** Satır içi etiket: premium, askıda, misafir, platform. */
export function Badge({ children, tone }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className="inline-flex h-5 items-center rounded-chip border px-1.5 text-micro whitespace-nowrap"
      style={tone ? { borderColor: TONE[tone], color: TONE[tone] } : { borderColor: "var(--border)", color: "var(--text-muted)" }}
    >
      {children}
    </span>
  );
}

/** Durum noktası (çalışıyor / durdu). */
export function Dot({ tone }: { tone: Tone | "off" }) {
  return <span aria-hidden className="inline-block h-2 w-2 shrink-0 rounded-full" style={{ background: tone === "off" ? "var(--text-faint)" : TONE[tone] }} />;
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="muted rounded-tile border border-dashed px-4 py-5 text-center text-caption" style={{ borderColor: "var(--border)" }}>{children}</p>;
}

export type Column = string | { label: string; align?: "right" };

/** Tablo. Hücre metin ya da düğüm; sayısal sütunlar `align: "right"`. */
export function DataTable({ head, rows, empty = "Kayıt yok.", mono }: { head: Column[]; rows: ReactNode[][]; empty?: string; mono?: boolean }) {
  if (!rows.length) return <Empty>{empty}</Empty>;
  const cols = head.map((h) => (typeof h === "string" ? { label: h, align: undefined } : h));
  return (
    <div className="overflow-x-auto">
      <table className={`w-full text-caption ${mono ? "font-mono" : ""}`} style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr className="muted text-micro uppercase tracking-eyebrow">
            {cols.map((c, i) => (
              <th key={i} className={`whitespace-nowrap px-3 py-2 font-bold ${c.align === "right" ? "text-right" : "text-left"}`}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t align-top" style={{ borderColor: "var(--hairline)" }}>
              {r.map((v, j) => (
                <td key={j} className={`px-3 py-2 tabular-nums ${cols[j]?.align === "right" ? "text-right whitespace-nowrap" : ""}`}>
                  {v === "" || v == null ? "—" : v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Bar({ frac, tone }: { frac: number; tone?: Tone }) {
  return (
    <span className="relative h-2.5 min-w-10 flex-1 overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}>
      <span className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${Math.max(2, Math.min(100, Math.round(frac * 100)))}%`, background: tone ? TONE[tone] : "var(--color-brand)" }} />
    </span>
  );
}

export type BarItem = { label: string; value: number; right?: string; tone?: Tone };

export function BarList({ items, max, unit, empty = "Henüz veri yok." }: { items: BarItem[]; max: number; unit?: string; empty?: string }) {
  if (!items.length) return <p className="muted text-caption">{empty}</p>;
  const top = Math.max(max, 1);
  return (
    <div className="space-y-2">
      {items.map((it, i) => (
        <div key={i} className="flex items-center gap-3 text-caption">
          <span className="w-2/5 min-w-0 shrink-0 truncate sm:w-44">{it.label}</span>
          <Bar frac={it.value / top} tone={it.tone} />
          <span className="muted w-24 shrink-0 text-right tabular-nums sm:w-32">{it.right ?? fmt(it.value) + (unit ?? "")}</span>
        </div>
      ))}
    </div>
  );
}

/** Alan: değer ızgarası (kullanıcı detayı). */
export function KeyValue({ data }: { data: Record<string, string | number | boolean> | null }) {
  if (!data) return <Empty>Kayıt yok.</Empty>;
  return (
    <dl className="grid grid-cols-1 gap-x-6 text-caption sm:grid-cols-2">
      {Object.entries(data).map(([k, v]) => (
        <div key={k} className="flex justify-between gap-3 border-b py-1.5" style={{ borderColor: "var(--hairline)" }}>
          <dt className="muted">{k}</dt>
          <dd className="min-w-0 truncate text-right tabular-nums">{typeof v === "boolean" ? (v ? "evet" : "hayır") : String(v) || "—"}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Etiketli alan kabı. */
export function Field({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <label className={`flex min-w-0 flex-col gap-1 text-caption ${className}`}>
      <span className="muted">{label}</span>
      {children}
    </label>
  );
}

/**
 * Düğme sınıfları. Tek birincil eylem turuncu; ikincil gri; geri alınamayan ya
 * da herkesi etkileyen eylem kırmızı çerçeveli (`DANGER` stiliyle).
 */
export const BTN = {
  primary: "btn btn-primary h-9 px-4 text-strong disabled:opacity-60",
  secondary: "btn btn-ghost h-9 px-4 text-strong disabled:opacity-60",
  small: "btn btn-ghost h-8 px-3 text-caption disabled:opacity-60",
} as const;
export const DANGER: CSSProperties = { color: "var(--color-rose)", borderColor: "var(--color-rose)" };

/** Giriş alanı: metin, sayı, seçim, çok satır. */
export const FIELD = "h-9 w-full min-w-0 rounded-tile border px-3 text-body";
export const FIELD_AREA = "w-full min-w-0 rounded-tile border px-3 py-2 text-body";
export const FIELD_STYLE: CSSProperties = { borderColor: "var(--border)", background: "var(--surface-2)", color: "var(--text)" };

/** Yetkisiz açılış: bütün sayfalarda aynı metin. */
export function AdminDenied({ title, email }: { title: string; email: string | null }) {
  return (
    <div className="mx-auto max-w-lg px-6 py-16 text-center">
      <h1 className="text-h1">{title}</h1>
      <p className="muted mt-3 text-body">
        {email ? `Bu hesap (${email}) yönetim yetkisine sahip değil. Admin e-postasıyla giriş yap.` : "Önce admin e-postasıyla giriş yap."}
      </p>
    </div>
  );
}
