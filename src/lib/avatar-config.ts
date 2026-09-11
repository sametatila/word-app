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
  hat: string | null;
  hatColor: string;
  glasses: string | null;
  mustache: string | null;
};

export const DEFAULT_AVATAR: AvatarConfig = {
  hat: null,
  hatColor: "#c0392b",
  glasses: null,
  mustache: null,
};

/** Parça kimlikleri kısa ve alfanümerik; renk düz hex. */
const ID = /^[a-z0-9_-]{1,24}$/i;
const HEX = /^#[0-9a-f]{6}$/i;

function part(v: unknown): string | null {
  return typeof v === "string" && ID.test(v) ? v : null;
}

/**
 * Ham değeri (JSON metni ya da nesne) güvenli bir yapılandırmaya çevirir.
 *
 * `null` dönmesi "bu kullanıcı avatarını hiç seçmemiş" demek — varsayılanla
 * aynı şey DEĞİL. Çağıran ikisini ayırabilsin diye: seçmemiş kullanıcı
 * listelerde eski armasıyla kalıyor, seçmiş olan maskotuyla görünüyor.
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
  return { hat: part(r.hat), hatColor, glasses: part(r.glasses), mustache: part(r.mustache) };
}

export function serializeAvatar(cfg: AvatarConfig): string {
  return JSON.stringify(parseAvatar(cfg) ?? DEFAULT_AVATAR);
}
