import { EXTRA_SLOTS, type AvatarConfig } from "@/lib/avatar-config";

/**
 * NOMİ 3B KATALOĞU — 3B avatar hattının `katalog.json` biçimi (Türkçe alan
 * adları hattın kendisinden). Web `lib/avatar-layers` ile mobil
 * `lib/avatarLayers` AYNI: aynı kayıt iki platformda aynı katmanlara çözülmeli.
 */
export type CatalogPart = {
  id: string;
  slot: string;
  ad: string;
  adlar: Record<string, string>;
  nadir: string;
  ikon: string;
  sira: number;
  renkler: string[];
  dosyalar: Record<string, string>;
  /** Renklenen parçada renk başına ikon (renk → yol); yoksa `ikon`. */
  ikonlar?: Record<string, string>;
};
export type AvatarCatalog = {
  boyut: number;
  taban: string;
  palet: string[];
  sira: Record<string, number>;
  nadirlik: string[];
  parcalar: CatalogPart[];
};

/**
 * Bir avatar kaydını çizilecek dosyalara çevirir: arka plan, taban ve yuva
 * katmanları çizim sırasıyla (sırt → boyun → yüz → bıyık → küpe → gözlük →
 * şapka). Katalogda olmayan parça atlanır; renklenen parçada seçili renk yoksa
 * paletin ilk rengi. Adresler kataloğa göredir (`base` önüne eklenir).
 */
export function avatarLayers(cfg: AvatarConfig, cat: AvatarCatalog): { bg: string | null; base: string; layers: string[] } {
  const byId = new Map(cat.parcalar.map((p) => [p.id, p] as const));
  const pick = (id: string | null | undefined, color: string | null | undefined) => {
    const p = id ? byId.get(id) : undefined;
    if (!p) return null;
    const file = (color ? p.dosyalar[color] : undefined) ?? p.dosyalar.varsayilan ?? (p.renkler[0] ? p.dosyalar[p.renkler[0]] : undefined);
    return file ? { sira: p.sira, file } : null;
  };
  const chosen = [
    pick(cfg.hat, cfg.hatColor),
    pick(cfg.glasses, null),
    pick(cfg.mustache, null),
    ...EXTRA_SLOTS.map((s) => pick(cfg.extra[s]?.id, cfg.extra[s]?.color)),
  ].filter((x): x is { sira: number; file: string } => x !== null);
  chosen.sort((a, b) => a.sira - b.sira);
  const bg = byId.get(cfg.bg ?? "bg_orange") ?? byId.get("bg_orange");
  return { bg: bg?.dosyalar.varsayilan ?? null, base: cat.taban, layers: chosen.map((c) => c.file) };
}

/**
 * Parça kartının ikonu. Renklenen parçada karo seçili rengi gösterir (yeşil
 * şapka seçiliyken kep ikonu da yeşil); renk parçada yoksa katmanla aynı kural,
 * paletin ilk rengi. Yol kataloğa göredir.
 */
export function partIcon(p: CatalogPart, color: string | null | undefined): string {
  if (!p.ikonlar) return p.ikon;
  return (color ? p.ikonlar[color] : undefined) ?? (p.renkler[0] ? p.ikonlar[p.renkler[0]] : undefined) ?? p.ikon;
}

/**
 * Küçük avatarın TEK GÖRSELİ (`/api/avatar/img`, 2026-09-28).
 *
 * Listede her kişi için arka plan + taban + yuvaları ayrı ayrı indirmek
 * (8-9 × 512 px) ağır: otuz kişilik bir lig tablosu 250'den fazla istek
 * demekti. Küçük boyda sunucu hepsini tek küçük WebP'ye birleştiriyor.
 * Adres çizilecek dosyaların kendisi: aynı avatar her yerde AYNI adres, yani
 * tarayıcı ve sunucu önbelleğinde tek kopya. `base` katalog kökü, `px` istenen
 * piksel (48, 96 ya da 192'ye yuvarlanır).
 */
export const AVATAR_IMG_SIZES = [48, 96, 192] as const;
export function avatarImageUrl(base: string, L: { bg: string | null; base: string; layers: string[] }, px: number): string {
  /* Katalog kökünün sunucusu (RN'in `URL`i `origin` vermiyor: düzenli ifade). */
  const origin = base.replace(/^(https?:\/\/[^/]+).*$/, "$1");
  const s = AVATAR_IMG_SIZES.find((x) => x >= px) ?? AVATAR_IMG_SIZES[AVATAR_IMG_SIZES.length - 1];
  const q = [L.bg ?? "", L.base, ...L.layers].map(encodeURIComponent).join(",");
  return `${origin}/api/avatar/img?v=1&s=${s}&l=${q}`;
}
