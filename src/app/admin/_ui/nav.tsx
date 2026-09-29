"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Yönetim gezinmesi — üstte BÖLÜM menüsü, solda o bölümün SAYFALARI.
 *
 * Eskiden altı grup ve iki satır sekme vardı: grup satırı ile sayfa satırı üst
 * üste duruyor, dar ekranda yarısı görünmüyordu ve bir sayfanın hangi grupta
 * olduğu tarihsel birikimle belirlenmişti. Artık beş bölüm, her biri tek soru:
 *
 *   Bugün        dönülmesi gerekenler (uyarılar, şikâyetler, içerik bildirimleri)
 *   Kullanıcılar kim, nasıl büyüyor, deneyimi nasıl
 *   Gelir        ne kazanılıyor, premium nasıl ayarlı
 *   İçerik       öğrenme verisi, quiz, içerik sürümü, avatar
 *   Sistem       sunucu, hatalar, mağaza, uygulama
 *
 * Hukuki metinler ve işlem kaydı ayda bir açılıyor: menüde değil, sol çubuğun
 * altında (telefonda sayfa satırının sonunda). Her sayfa tam olarak
 * bir bölümde; hangi bölümde olunduğunu en uzun eşleşen adres belirliyor
 * (`/admin/moderation/content` Moderasyon'a değil İçerik bildirimlerine düşer).
 */
export type BadgeKey = "alerts" | "reports" | "feedback" | "reviews";
export type BadgeTone = "bad" | "warn" | "muted";
export type NavCounts = Partial<Record<BadgeKey, { n: number; tone: BadgeTone }>>;

type NavItem = { href: string; label: string; badge?: BadgeKey };
export type NavSection = { key: string; label: string; items: NavItem[] };

export const NAV: NavSection[] = [
  {
    key: "today",
    label: "Bugün",
    items: [
      { href: "/admin", label: "Genel durum", badge: "alerts" },
      { href: "/admin/moderation", label: "Şikâyetler", badge: "reports" },
      { href: "/admin/moderation/content", label: "İçerik bildirimleri", badge: "feedback" },
    ],
  },
  {
    key: "users",
    label: "Kullanıcılar",
    items: [
      { href: "/admin/users", label: "Liste" },
      { href: "/admin/growth", label: "Büyüme ve sosyal" },
      { href: "/admin/experience", label: "Deneyim" },
    ],
  },
  { key: "revenue", label: "Gelir", items: [{ href: "/admin/revenue", label: "Gelir ve huniler" }, { href: "/admin/premium", label: "Premium ayarları" }] },
  {
    key: "content",
    label: "İçerik",
    items: [
      { href: "/admin/learning", label: "Öğrenme ve madde analizi" },
      { href: "/admin/quiz", label: "Haftalık quiz" },
      { href: "/admin/content", label: "İçerik sürümü" },
      { href: "/admin/avatar", label: "Avatar parçaları" },
    ],
  },
  {
    key: "system",
    label: "Sistem",
    items: [
      { href: "/admin/ops", label: "Sunucu" },
      { href: "/admin/errors", label: "Hatalar" },
      { href: "/admin/reviews", label: "Mağaza", badge: "reviews" },
      { href: "/admin/app", label: "Uygulama" },
    ],
  },
];

/** Menüde olmayan, sol çubuğun dibindeki bölüm. */
export const SETTINGS: NavSection = {
  key: "settings",
  label: "Ayarlar",
  items: [{ href: "/admin/legal", label: "Hukuki metinler" }, { href: "/admin/audit", label: "İşlem kaydı" }],
};

const ALL = [...NAV, SETTINGS];
const matches = (path: string, href: string) => (href === "/admin" ? path === "/admin" : path === href || path.startsWith(href + "/"));

/** Adrese en uzun eşleşen sayfa ve bölümü. */
function locate(path: string): { section: NavSection; href: string } {
  let best: { section: NavSection; href: string } | null = null;
  for (const section of ALL) {
    for (const i of section.items) {
      if (matches(path, i.href) && (!best || i.href.length > best.href.length)) best = { section, href: i.href };
    }
  }
  return best ?? { section: NAV[0], href: "/admin" };
}

const TONE_STYLE: Record<BadgeTone, React.CSSProperties> = {
  bad: { background: "color-mix(in srgb, var(--color-rose) 14%, transparent)", color: "var(--color-rose)" },
  warn: { background: "color-mix(in srgb, var(--color-flame) 16%, transparent)", color: "var(--color-flame)" },
  muted: { background: "var(--surface-2)", color: "var(--text-muted)" },
};

function Count({ c }: { c?: { n: number; tone: BadgeTone } }) {
  if (!c || c.n <= 0) return null;
  return (
    <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1.5 text-micro tabular-nums" style={TONE_STYLE[c.tone]}>
      {c.n}
    </span>
  );
}

/** Bölümün rozeti: sayfalarının toplamı, tonu en kötüsü. */
function sectionCount(section: NavSection, counts: NavCounts) {
  const cs = section.items.map((i) => (i.badge ? counts[i.badge] : undefined)).filter((c): c is { n: number; tone: BadgeTone } => !!c && c.n > 0);
  if (!cs.length) return undefined;
  const tone: BadgeTone = cs.some((c) => c.tone === "bad") ? "bad" : cs.some((c) => c.tone === "warn") ? "warn" : "muted";
  return { n: cs.reduce((a, c) => a + c.n, 0), tone };
}

/** Üst çubuktaki beş bölüm. Seçili bölüm `aria-current`la da söyleniyor. */
export function AdminSections({ counts }: { counts: NavCounts }) {
  const path = usePathname() ?? "/admin";
  const { section: current } = locate(path);
  return (
    <nav aria-label="Yönetim bölümleri" className="-mx-1 flex min-w-0 gap-0.5 overflow-x-auto px-1 [scrollbar-width:none]">
      {NAV.map((s) => {
        const on = s === current;
        return (
          <Link
            key={s.key}
            href={s.items[0].href}
            aria-current={on ? "true" : undefined}
            className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-tile px-2.5 text-caption whitespace-nowrap transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--text)]"
            style={on ? { background: "var(--brand-soft)", color: "var(--on-brand-soft)" } : { color: "var(--text-muted)" }}
          >
            {s.label}
            <Count c={sectionCount(s, counts)} />
          </Link>
        );
      })}
    </nav>
  );
}

/**
 * Sol çubuk: seçili bölümün sayfaları, dipte Ayarlar. Geniş ekranda dikey ve
 * yapışkan; dar ekranda göstergelerin altında yatay kaydırılan tek satır.
 */
export function AdminRail({ counts }: { counts: NavCounts }) {
  const path = usePathname() ?? "/admin";
  const { section, href: active } = locate(path);
  const item = (i: NavItem, compact: boolean) => {
    const on = i.href === active;
    return (
      <Link
        key={i.href}
        href={i.href}
        aria-current={on ? "page" : undefined}
        className={
          compact
            ? "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border px-3 text-caption whitespace-nowrap"
            : "flex h-8 items-center justify-between gap-2 rounded-tile px-2.5 text-caption transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--text)]"
        }
        style={
          on
            ? compact
              ? { borderColor: "var(--color-brand)", background: "var(--brand-soft)", color: "var(--on-brand-soft)" }
              : { background: "var(--surface)", color: "var(--text)", boxShadow: "inset 0 0 0 1px var(--border)" }
            : compact
              ? { borderColor: "var(--border)", color: "var(--text-muted)" }
              : { color: "var(--text-muted)" }
        }
      >
        <span className="truncate">{i.label}</span>
        <Count c={i.badge ? counts[i.badge] : undefined} />
      </Link>
    );
  };
  return (
    <>
      {/* Dar ekran: yatay satır; Ayarlar sonda (üst çubukta yer yok). */}
      <nav aria-label={`${section.label} sayfaları`} className="border-b px-4 py-2 lg:hidden" style={{ borderColor: "var(--border)" }}>
        <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 [scrollbar-width:none]">
          {section.items.map((i) => item(i, true))}
          {section !== SETTINGS ? (
            <Link href={SETTINGS.items[0].href} className="faint inline-flex h-8 shrink-0 items-center px-2 text-caption whitespace-nowrap">
              {SETTINGS.label}
            </Link>
          ) : null}
        </div>
      </nav>
      {/* Geniş ekran: dikey çubuk. Kenarlık dış kutuda (sayfa boyu), liste
          içte yapışkan; Ayarlar listenin hemen altında, ekranın dışına düşmüyor. */}
      <div className="hidden w-52 shrink-0 border-r lg:block" style={{ borderColor: "var(--border)" }}>
        <nav aria-label={`${section.label} sayfaları`} className="sticky top-14 flex max-h-[calc(100dvh-3.5rem)] flex-col gap-px overflow-y-auto px-2 py-4">
          <div className="faint px-2.5 pb-2 text-micro uppercase tracking-eyebrow">{section.label}</div>
          {section.items.map((i) => item(i, false))}
          {section !== SETTINGS ? (
            <div className="mt-5 border-t pt-3" style={{ borderColor: "var(--hairline)" }}>
              <div className="faint px-2.5 pb-1 text-micro uppercase tracking-eyebrow">{SETTINGS.label}</div>
              {SETTINGS.items.map((i) => item(i, false))}
            </div>
          ) : null}
        </nav>
      </div>
    </>
  );
}
