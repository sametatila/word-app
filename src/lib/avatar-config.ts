/**
 * Avatar yapılandırmasının ORTAK biçimi — sunucu ve iki istemci.
 *
 * Bu dosya bilerek `"use client"` DEĞİL: avatar artık sunucuda saklanıyor ve
 * profil ucu ile sosyal sorgular da aynı tipi okuyor. İstemci tarafındaki
 * depo (`lib/avatar.ts`) bu tipi buradan alıyor, mobil karşılığı da
 * (`mobile/src/lib/avatar.ts`) aynı alan adlarını taşıyor.
 *
 * NEDEN SUNUCUDA: seçim yalnız `localStorage`taydı. İki sonucu vardı —
 * telefonda seçilen şapka tarayıcıda görünmüyordu (aynı kişi iki cihazda iki
 * farklı avatar) ve BAŞKALARI hiçbir zaman göremiyordu, o yüzden listelerde
 * herkes kimliğinden türeyen renkli bir armayla çiziliyordu. Avatar bir kimlik;
 * kimlik cihazda kalamaz.
 */
export type AvatarConfig = {
  hat: string | null;      // bkz. avatarParts HATS
  hatColor: string;        // hex
  glasses: string | null;  // bkz. GLASSES
  mustache: string | null; // bkz. MUSTACHES
  /** v2 (Nomi 3B): arka plan kimliği (`bg_orange` …); null = varsayılan. */
  bg: string | null;
  /** v2: yeni yuvalar (boyun, yüz, küpe, sırt) — parça kimliği ve isteğe bağlı renk. */
  extra: Partial<Record<ExtraSlot, { id: string; color: string | null }>>;
  /** v2: tüy rengi ve yüz ifadesi — 3B hat hazır olunca dolacak; şimdilik null. */
  fur: string | null;
  expression: string | null;
};

/** v2'de eklenen yuvalar. Şapka, gözlük ve bıyık eski alanlarında kalıyor (eski kayıtlar bozulmasın). */
export const EXTRA_SLOTS = ["neck", "face", "ear", "back"] as const;
export type ExtraSlot = (typeof EXTRA_SLOTS)[number];

export const DEFAULT_AVATAR: AvatarConfig = { hat: null, hatColor: "#c0392b", glasses: null, mustache: null, bg: null, extra: {}, fur: null, expression: null };

/** Parça kimlikleri kısa ve alfanümerik; renk düz hex. */
const ID = /^[a-z0-9_-]{1,24}$/i;
const HEX = /^#[0-9a-f]{6}$/i;

const part = (v: unknown): string | null => (typeof v === "string" && ID.test(v) ? v : null);

/**
 * Ham değeri (JSON metni ya da nesne) güvenli bir yapılandırmaya çevirir.
 *
 * `null` dönmesi "bu kullanıcı avatarını hiç seçmemiş" demek — varsayılanla
 * aynı şey DEĞİL. Çağıran ikisini ayırabilsin diye: seçmemiş kullanıcı
 * kimliğinden türeyen maskotla (`components/avatar` › `derivedAvatar`),
 * seçmiş olan kendi seçimiyle görünüyor.
 *
 * BİLİNMEYEN PARÇA KİMLİĞİ ATILIYOR, kayıt reddedilmiyor: parça listesi
 * sürümle değişiyor ve eski bir cihazdan gelen kayıt yüzünden avatarın
 * tamamının kaybolması, o parçanın çizilmemesinden kötü.
 */
export function parseAvatar(raw: unknown): AvatarConfig | null {
  let o: unknown = raw;
  if (typeof raw === "string") {
    if (!raw.trim()) return null;
    try { o = JSON.parse(raw); } catch { return null; }
  }
  if (!o || typeof o !== "object") return null;
  const r = o as Record<string, unknown>;
  const hatColor = typeof r.hatColor === "string" && HEX.test(r.hatColor) ? r.hatColor : DEFAULT_AVATAR.hatColor;
  const extra: AvatarConfig["extra"] = {};
  const ex = r.extra && typeof r.extra === "object" ? (r.extra as Record<string, { id?: unknown; color?: unknown } | undefined>) : {};
  for (const slot of EXTRA_SLOTS) {
    const id = part(ex[slot]?.id);
    const color = ex[slot]?.color;
    if (id) extra[slot] = { id, color: typeof color === "string" && HEX.test(color) ? color : null };
  }
  return { hat: part(r.hat), hatColor, glasses: part(r.glasses), mustache: part(r.mustache), bg: part(r.bg), extra, fur: part(r.fur), expression: part(r.expression) };
}

/**
 * Renklenen parçaların paleti (3B kataloğun `palet`i ile aynı sıra): şapka
 * rengi ve türetilmiş avatarın rengi buradan.
 */
export const HAT_COLORS = ["#c0392b", "#2d6cdf", "#27ae60", "#8e44ad", "#e67e22", "#2c3e50"];

/** Nadirlik renkleri — parça kartının kenarı (sıradan, nadir, epik, efsanevi). Kimlik rengi, tema değil. */
export const AVATAR_RARITY: Record<string, string> = { common: "#a8a29a", rare: "#2d6cdf", epic: "#8e44ad", legendary: "#d9a514" };

export function serializeAvatar(cfg: AvatarConfig): string {
  return JSON.stringify(parseAvatar(cfg) ?? DEFAULT_AVATAR);
}
