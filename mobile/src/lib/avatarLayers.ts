import { EXTRA_SLOTS, type AvatarConfig } from "./avatar";

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
