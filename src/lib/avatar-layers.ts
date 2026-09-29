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
  /** v2: tuvalin eni ve boyu (px). Yoksa kare `boyut` (v1). */
  en?: number;
  boy?: number;
  /** v2: küçük daire avatarın tuvaldeki karesi [x, y, kenar] (px). Yoksa v1 kuralı. */
  daire?: [number, number, number];
  /** v2: göz kırpma: tabanın üstüne konan iki kare (yarım, kapalı) ve tuvaldeki kutuları [x, y, en, boy] (px). */
  kirpma?: { kutu: [number, number, number, number]; kareler: string[] } | null;
  /** v3: rastgele bakınma kareleri (ad → dosya) ve ortak kutuları [x, y, en, boy] (px). */
  bakis?: { kutu: [number, number, number, number]; kareler: Record<string, string> } | null;
  /** v3: burnun ucu [x, y] (px): sahne burnu görünen alanın dikey ortasına koyar. */
  burun?: [number, number] | null;
  /** v3: taban + bütün parçaların birleşik görünür sınırı [x0, y0, x1, y1] (px). */
  icerik?: [number, number, number, number] | null;
  /** v3: her dosyanın görünür sınırı (dosya → [x0, y0, x1, y1], px): sahne yalnız takılı parçalara göre ölçekler. */
  sinirlar?: Record<string, [number, number, number, number]> | null;
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

/** Bir kazanımla açılan parça (kutlama kartı): adı kullanıcının dilinde, ikon tam adres. */
export type UnlockedPart = { id: string; name: string; icon: string };

/**
 * Parça kartının ikonu. Renklenen parçada karo seçili rengi gösterir (yeşil
 * şapka seçiliyken kep ikonu da yeşil); renk parçada yoksa katmanla aynı kural,
 * paletin ilk rengi. Yol kataloğa göredir.
 */
export function partIcon(p: CatalogPart, color: string | null | undefined): string {
  if (!p.ikonlar) return p.ikon;
  return (color ? p.ikonlar[color] : undefined) ?? (p.renkler[0] ? p.ikonlar[p.renkler[0]] : undefined) ?? p.ikon;
}

/** Tuvalin boyu (px): v2 3:2, v1 kare. */
export function catalogSize(cat: AvatarCatalog): { w: number; h: number } {
  return { w: cat.en ?? cat.boyut, h: cat.boy ?? cat.boyut };
}

/**
 * Küçük daire avatarın tuvaldeki karesi [x, y, kenar] (px). v2 katalog bunu
 * kendisi söylüyor; v1'de kural 1,12 büyütme ve (50 %, 62 %) kökenliydi, aynı
 * kareye çevriliyor. Daire çizen her yer (web, mobil, `/api/avatar/img`) bunu
 * kullanır: tuval değişince kırpma tek yerden değişir.
 */
export function circleBox(cat: AvatarCatalog): [number, number, number] {
  if (cat.daire) return cat.daire;
  const n = cat.boyut, k = 1 / 1.12;
  return [0.5 * n * (1 - k), 0.62 * n * (1 - k), n * k];
}

/**
 * Tuvali `circleBox` karesi kutuyu dolduracak şekilde yerleştirmek için
 * yüzdeler (kutunun kenarına göre): genişlik, yükseklik, sol, üst.
 */
export function circleFrame(cat: AvatarCatalog): { w: number; h: number; left: number; top: number } {
  const { w, h } = catalogSize(cat);
  const [x, y, s] = circleBox(cat);
  return { w: (w / s) * 100, h: (h / s) * 100, left: (-x / s) * 100, top: (-y / s) * 100 };
}

/**
 * Göz kırpma kareleri ve tuvaldeki yerleri (yüzde). Katalogda yoksa null
 * (v1): bekleme hareketi kırpmasız çalışır.
 */
export function catalogBlink(cat: AvatarCatalog): { frames: string[]; left: number; top: number; w: number; h: number } | null {
  const k = cat.kirpma;
  if (!k || k.kareler.length < 2) return null;
  const { w, h } = catalogSize(cat);
  const [x, y, bw, bh] = k.kutu;
  return { frames: k.kareler, left: (x / w) * 100, top: (y / h) * 100, w: (bw / w) * 100, h: (bh / h) * 100 };
}

/** Göz bakış kareleri ve tuvaldeki yerleri (yüzde); katalogda yoksa null. */
export function catalogGlance(cat: AvatarCatalog): { frames: Record<string, string>; left: number; top: number; w: number; h: number } | null {
  const b = cat.bakis;
  if (!b || !Object.keys(b.kareler).length) return null;
  const { w, h } = catalogSize(cat);
  const [x, y, bw, bh] = b.kutu;
  return { frames: b.kareler, left: (x / w) * 100, top: (y / h) * 100, w: (bw / w) * 100, h: (bh / h) * 100 };
}

/**
 * SAHNE YERLEŞİMİ (v3, 2026-09-29): tuvalin sahnedeki boyu ve yeri (px).
 * Burun görünen alanın (`visibleH`: sahnenin üstüne binen kâğıt hariç)
 * dikey ortasında. Ölçek TAKILI parçalara göre (`files`: taban + katmanlar,
 * `sinirlar`dan): burundan en yüksek parçanın tepesine (balon, ampul) ve
 * yanlara (kanat) kadar her şey sığar; sade avatarda Nomi büyür ama başın
 * üstünde hep pay kalır (`NOMI_HEADROOM`). Tuvalin alt kenarı görünen alanın
 * altında kalır (kesik gövde görünmez). Katalog burnu bilmiyorsa null.
 *
 * `stageW` bilinmiyorsa (0: sunucu çizimi, ilk kare) yan sınır atlanır; yatay
 * yer sahnenin ORTASINA göre verilir (`dx`: burnu ortaya koyan kayma), yani
 * web `calc(50% + dx)` ile genişliği ölçmeden çizer: sahne ilk karede hazır.
 */
const NOMI_HEADROOM = 260;
export function stageFrame(cat: AvatarCatalog, stageW: number, visibleH: number, files?: string[]): { w: number; h: number; dx: number; top: number } | null {
  if (!cat.burun || !visibleH) return null;
  const { w: cw, h: ch } = catalogSize(cat);
  const [nx, ny] = cat.burun;
  const boxes = files && cat.sinirlar ? files.map((f) => cat.sinirlar?.[f]).filter((b): b is [number, number, number, number] => !!b) : [];
  const [x0, y0, x1] = boxes.length
    ? [Math.min(...boxes.map((b) => b[0])), Math.min(...boxes.map((b) => b[1])), Math.max(...boxes.map((b) => b[2]))]
    : cat.icerik ?? [0, 0, cw, ch];
  const half = visibleH / 2, pad = 6;
  let k = (half - pad) / Math.max(NOMI_HEADROOM, ny - y0);
  if (stageW) k = Math.min(k, (stageW / 2 - pad) / Math.max(1, nx - x0, x1 - nx));
  k = Math.max(k, (half + pad) / Math.max(1, ch - ny));
  return { w: cw * k, h: ch * k, dx: -nx * k, top: half - ny * k };
}

/**
 * BEKLEME SENARYOSU (v3): Nomi dümdüz bakıp durmasın; rastgele, hafif
 * hareketler. Her çağrı bir sonraki küçük hareketi adım adım verir (`t`:
 * başlangıçtan ms; `eyes`: gösterilecek göz karesi, null = açık/karşıya;
 * `tilt`: gövdenin alttan eğimi, derece; `bob`: küçük sekme, px, yukarı
 * eksi). Hareketler: göz kırpma, çift kırpma, sağa/sola bakma, başı eğip
 * bakma (merak), yalnız eğilme, küçük sekme. Aralar 1,2-3,4 sn. Nefes ayrı
 * ve sürekli (web CSS, mobil Animated). Web ve mobil aynı işlevi oynatır.
 */
export type IdleStep = { t: number; eyes?: string | null; tilt?: number; bob?: number };
export function idleScript(rand: () => number = Math.random, glances: string[] = []): { steps: IdleStep[]; ms: number } {
  const blink = (t: number): IdleStep[] => [{ t, eyes: "kirp1" }, { t: t + 60, eyes: "kirp2" }, { t: t + 150, eyes: "kirp1" }, { t: t + 220, eyes: null }];
  const gap = 1200 + rand() * 2200;
  const r = rand();
  const g = glances.length ? glances[Math.floor(rand() * glances.length)] : null;
  const side = g === "sag" ? -1 : 1;
  let steps: IdleStep[];
  let len: number;
  if (r < 0.3 || !g) {
    steps = blink(0); len = 220;
  } else if (r < 0.4) {
    steps = [...blink(0), ...blink(380)]; len = 600;
  } else if (r < 0.65) {
    const hold = 900 + rand() * 1100;
    steps = [{ t: 0, eyes: g }, ...(rand() < 0.5 ? blink(hold) : [{ t: hold, eyes: null }])]; len = hold + 220;
  } else if (r < 0.82) {
    const hold = 1300 + rand() * 1300, deg = side * (1.6 + rand() * 1.4);
    steps = [{ t: 0, eyes: g, tilt: deg }, { t: hold, tilt: 0 }, ...blink(hold + 250)]; len = hold + 470;
  } else if (r < 0.94) {
    const hold = 1200 + rand() * 1400;
    steps = [{ t: 0, tilt: (rand() < 0.5 ? -1 : 1) * (1.2 + rand() * 1.3) }, { t: hold, tilt: 0 }]; len = hold + 600;
  } else {
    steps = [{ t: 0, bob: -5 }, { t: 190, bob: 0 }]; len = 400;
  }
  return { steps, ms: len + gap };
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
  /* Katalog sürümü kökün sonundan (`/avatar/v2`): sunucu dosyaları o sürümün dizininde arar. */
  const v = /\/avatar\/v(\d+)$/.exec(base)?.[1] ?? "1";
  return `${origin}/api/avatar/img?v=${v}&s=${s}&l=${q}`;
}
