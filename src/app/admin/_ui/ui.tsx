import Link from "next/link";
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
 *   AdminTabs    sekme şeridi (alt çizgili)
 *   Segmented    bölmeli seçim (aralık, süzgeç, sıralama, belge/dil)
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

/**
 * Sayfa gövdesi — YERLEŞİM PLANI.
 *
 * Gövde ana sütunun tamamına yayılıyor (sabit 72rem sınırı kalktı). Uzun
 * satırı kartlar sınırlıyor: geniş ekranda sayfa daha çok SÜTUN açıyor. Gövde bir
 * KAP (`@container`): içindeki ızgaralar ekranın değil kendi alanının
 * genişliğine göre sütun seçiyor. Sol çubuk, Gelen işler'in ayrıntı bölmesi ya
 * da dar pencere yer kapladığında "geniş ekran" varsayımı bozulmuyor.
 *
 *   Kap genişliği   PanelGrid (sütun)  Stats (kart içinde, kartın genişliği)
 *   < 56rem         1 sütun          2 sütun
 *   56rem+          2 sütun          kartın genişliğine göre 3-8
 *   100rem+         3 sütun
 *   140rem+         4 sütun (2560 px ekran)
 */
export function AdminPage({ children }: { children: ReactNode }) {
  return <div className="@container w-full space-y-5 px-4 pb-20 pt-5 sm:px-6 lg:px-8">{children}</div>;
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
        <h1 className="text-h2 break-words">{title}</h1>
        {description ? <p className="muted mt-1 max-w-[75ch] text-body">{typeof description === "string" ? <Linkify text={description} /> : description}</p> : null}
        {meta ? <div className="muted mt-1 text-caption">{meta}</div> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  );
}

const panelStyle: CSSProperties = { borderColor: "var(--border)", background: "var(--surface)" };

/**
 * Tek kart biçimi. `span` ızgarada bütün satırı kaplar (tablo, uzun liste);
 * `flush` iç boşluğu tabloya bırakır. Kart da bir kap: içindeki sayı ızgarası
 * ve alan: değer listesi kartın kendi genişliğine göre diziliyor.
 */
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
      className={`@container min-w-0 scroll-mt-32 rounded-panel border ${span ? "col-span-full [column-span:all]" : ""}`}
      style={tone ? { ...panelStyle, borderColor: TONE[tone] } : panelStyle}
    >
      {title || actions ? (
        <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2 px-4 pt-4 sm:px-5">
          <div className="min-w-0">
            {title ? <h2 className="text-h3">{title}</h2> : null}
            {hint ? <p className="muted mt-0.5 max-w-[80ch] text-caption">{typeof hint === "string" ? <Linkify text={hint} /> : hint}</p> : null}
          </div>
          {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
        </div>
      ) : null}
      <div className={flush ? "mt-2 px-1 pb-2 sm:px-2" : `px-4 pb-4 sm:px-5 ${title || actions ? "pt-3" : "pt-4"}`}>{children}</div>
    </section>
  );
}

/**
 * Panel akışı: sayfanın genişliğine göre 1-4 SÜTUN (bkz. `AdminPage`), kartlar
 * sütunlara yukarıdan aşağı akıyor (duvar düzeni). Satır ızgarasında kısa
 * kartın yanında uzun komşusu kadar boşluk kalıyordu; burada her kart bir
 * öncekinin hemen altına oturuyor. `span` kart (tablo, uzun liste) akışı
 * bölüp bütün genişliği alıyor. Okuma sırası sütun sütun: sayfalar önemli
 * kartı başa koyuyor.
 */
export function PanelGrid({ children }: { children: ReactNode }) {
  return <div className="gap-5 @4xl:columns-2 @[100rem]:columns-3 @[140rem]:columns-4 *:mb-5 *:break-inside-avoid">{children}</div>;
}

export function Stat({ label, value, sub, tone, spark }: { label: string; value: ReactNode; sub?: ReactNode; tone?: Tone; spark?: ReactNode }) {
  return (
    <div className="min-w-0">
      <div className="muted text-micro uppercase tracking-eyebrow">{label}</div>
      <div className="text-h2 tabular-nums" style={tone ? { color: TONE[tone] } : undefined}>{value}</div>
      {sub ? <div className="muted text-caption">{sub}</div> : null}
      {spark}
    </div>
  );
}

/**
 * Sayı ızgarası. `cols` yer olunca tek satıra sığan sayı; ara adımlar son
 * satırda tek kutu kalmayacak biçimde seçili (7 → 4+3, 6 → 3+3). Eşikler
 * KARTIN genişliği (`@container`), ekranınki değil.
 */
export function Stats({ children, cols = 4 }: { children: ReactNode; cols?: 2 | 3 | 4 | 5 | 6 | 7 | 8 }) {
  const steps = {
    2: "",
    3: "@md:grid-cols-3",
    4: "@xl:grid-cols-4",
    5: "@lg:grid-cols-3 @3xl:grid-cols-5",
    6: "@lg:grid-cols-3 @3xl:grid-cols-6",
    7: "@xl:grid-cols-4 @5xl:grid-cols-7",
    8: "@xl:grid-cols-4 @5xl:grid-cols-8",
  }[cols];
  return <div className={`grid grid-cols-2 gap-x-6 gap-y-4 ${steps}`}>{children}</div>;
}

/**
 * Metindeki adresleri tıklanabilir yapar: `https://…` ve uygulama içi yollar
 * (`/admin…`, `/profile…`, `/privacy`). Uyarı ve hata cümleleri düz metin olarak
 * üretiliyor (sunucu hata kodları, Telegram'la ortak metinler); yönlendirme
 * cümlede adresiyle yazılıyor ve burada bağlantıya dönüşüyor.
 */
const URL_RE = /(https?:\/\/[^\s<>"')]+|\/(?:admin|profile|privacy|terms|support)(?:[\/?#][^\s<>"'),]*)?)/g;
export function Linkify({ text }: { text: string }) {
  const parts = text.split(URL_RE);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <a key={i} href={part} className="underline underline-offset-2 break-all" {...(part.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{part}</a>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function Notice({ tone = "info", title, children, role }: { tone?: Tone; title?: ReactNode; children?: ReactNode; role?: "alert" | "status" }) {
  return (
    <div
      role={role ?? (tone === "bad" ? "alert" : "status")}
      className="rounded-tile border px-4 py-3 text-body"
      style={{ borderColor: TONE[tone], background: `color-mix(in srgb, ${TONE[tone]} 7%, var(--surface))` }}
    >
      {title ? <div className="text-strong" style={{ color: TONE[tone] }}>{title}</div> : null}
      {children ? <div className={title ? "mt-1" : ""}>{typeof children === "string" ? <Linkify text={children} /> : children}</div> : null}
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

/* Tablo ve grafikler etkileşimli istemci bileşenleri (sıralama, arama,
   dizi seçimi): `_ui/table`, `_ui/charts`. Buradan yeniden dışa veriliyor ki
   sayfalar tek yerden içe aktarsın. */
export { DataTable, type Column } from "./table";
export { BarList, Funnel, Meter, ScoreList, SeriesChart, ShareBar, Sparkline, ThresholdTrend, type BarItem, type FunnelStep, type ScoreItem, type Series, type ShareItem } from "./charts";

/** Alan: değer ızgarası (kullanıcı detayı). */
export function KeyValue({ data }: { data: Record<string, string | number | boolean> | null }) {
  if (!data) return <Empty>Kayıt yok.</Empty>;
  return (
    <dl className="grid grid-cols-1 gap-x-6 text-caption @xl:grid-cols-2 @5xl:grid-cols-3">
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
 * Sekme şeridi. Seçili sekme `aria-selected` ile de söyleniyor, yalnız
 * renkle değil (bkz. parity 258).
 */
export function AdminTabs<K extends string>({ items, value, onChange, label, className = "" }: {
  items: readonly (readonly [K, ReactNode])[];
  value: K;
  onChange: (k: K) => void;
  label: string;
  className?: string;
}) {
  return (
    <div role="tablist" aria-label={label} className={`-mx-1 flex gap-1 overflow-x-auto border-b px-1 ${className}`} style={{ borderColor: "var(--border)" }}>
      {items.map(([k, text]) => (
        <button
          key={k}
          type="button"
          role="tab"
          aria-selected={value === k}
          onClick={() => onChange(k)}
          className="-mb-px h-9 shrink-0 border-b-2 px-3 text-caption whitespace-nowrap"
          style={value === k ? { borderColor: "var(--color-brand)", color: "var(--text)" } : { borderColor: "transparent", color: "var(--text-muted)" }}
        >
          {text}
        </button>
      ))}
    </div>
  );
}

const SEG_ON: CSSProperties = { background: "var(--surface)", color: "var(--text)", boxShadow: "var(--shadow-soft)" };
const SEG_OFF: CSSProperties = { color: "var(--text-muted)" };
const SEG_ITEM = "inline-flex h-8 items-center rounded-chip px-3 text-caption";

/**
 * Bölmeli seçim. `href` verilirse bağlantılar (adres değişiyor, seçili olan
 * `aria-current="page"`), `onChange` verilirse düğmeler (`aria-pressed`).
 */
export function Segmented<K extends string>({ items, value, onChange, href, label }: {
  items: readonly (readonly [K, ReactNode])[];
  value: K;
  onChange?: (k: K) => void;
  href?: (k: K) => string;
  label?: string;
}) {
  return (
    <div role="group" aria-label={label} className="inline-flex flex-wrap gap-0.5 rounded-tile p-0.5" style={{ background: "var(--surface-2)" }}>
      {items.map(([k, text]) =>
        href ? (
          <Link key={k} href={href(k)} aria-current={value === k ? "page" : undefined} className={SEG_ITEM} style={value === k ? SEG_ON : SEG_OFF}>
            {text}
          </Link>
        ) : (
          <button key={k} type="button" aria-pressed={value === k} onClick={() => onChange?.(k)} className={SEG_ITEM} style={value === k ? SEG_ON : SEG_OFF}>
            {text}
          </button>
        ),
      )}
    </div>
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
