"use client";

import { AvatarOverlay, GLASSES, HAT_COLORS, HATS, MUSTACHES } from "@/components/avatar-parts";
import { isLockedPart } from "@/lib/avatar-unlocks";
import { useAvatar } from "@/lib/avatar";
import { parseAvatar, type AvatarConfig } from "@/lib/avatar-config";

/**
 * Bir kişinin avatarı — iki platformda tek kural: HERKES maskotla çizilir.
 *
 * Eskiden avatar seçmemiş kişi kimliğinden türeyen baş harfli, renkli bir
 * armayla çiziliyordu. Avatar sunucuya taşındıktan sonra listeler iki ayrı
 * dil konuşmaya başladı: seçmiş iki kişi Erdi, geri kalan herkes (canlıda 23
 * profilin 21'i) eski arma. Arkadaşlar, Bul sekmesi ve sıralama baştan sona
 * eski görünüyordu.
 *
 * Arma kalktı, AYIRT EDİCİLİĞİ kalmadı değil: seçmemiş kişinin aksesuarları
 * kimliğinden türetiliyor (`derivedAvatar`). Aynı kişi her ekranda ve iki
 * platformda aynı şapkayla görünüyor, tabloda da kimse kimseyle aynı değil.
 * Kişi kendi avatarını seçince o geçer.
 */

/** Kimlikten sayı: aynı kimlik her zaman aynı avatarı verir (mobil `hash` ile aynı). */
function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * Türetilen avatarda KİLİTLİ parça çıkmıyor.
 *
 * Seçim yapmamış kullanıcı kimliğinden türeyen bir maskotla görünüyor ve
 * havuz `HATS` idi; kilitli parça katalogda durduğu için türetilmiş avatarda
 * da çıkabilirdi. Kazanılmamış bir aksesuarı rastgele dağıtmak, kazananın
 * rozetini değersizleştirirdi.
 */
const FREE_HATS = HATS.filter((h) => !isLockedPart(h));
const FREE_GLASSES = GLASSES.filter((g) => !isLockedPart(g));
const FREE_MUSTACHES = MUSTACHES.filter((m) => !isLockedPart(m));

/**
 * Avatar seçmemiş kişinin kimliğinden türeyen maskot.
 *
 * Herkese şapka (3 × 6 renk = 18 görünüm); üçte birine gözlük, dörtte birine
 * bıyık — hepsi aynı olsaydı yedi kişilik tabloda yine kimse kimseyi
 * ayırt edemezdi. Bitler birbirine binmesin diye her seçim hash'in ayrı bir
 * diliminden okunuyor. Mobil `derivedAvatar` ile BİREBİR.
 */
export function derivedAvatar(seed: string): AvatarConfig {
  const h = hash(seed || "?");
  return {
    hat: FREE_HATS[h % FREE_HATS.length],
    hatColor: HAT_COLORS[(h >>> 4) % HAT_COLORS.length],
    glasses: (h >>> 8) % 3 === 0 ? FREE_GLASSES[(h >>> 10) % FREE_GLASSES.length] : null,
    mustache: (h >>> 12) % 4 === 0 ? FREE_MUSTACHES[(h >>> 14) % FREE_MUSTACHES.length] : null,
  };
}

export function Avatar({
  userId,
  name,
  avatar,
  size = 32,
  /** Kazanılmış bir unvanın halkası. */
  ring,
  className = "",
}: {
  userId: string;
  name: string | null;
  /** Kişinin KENDİ avatarı (ham JSON, bkz. lib/avatar-config). Boşsa türetilmiş maskot. */
  avatar?: string | null;
  size?: number;
  ring?: string | null;
  className?: string;
}) {
  const cfg = parseAvatar(avatar) ?? derivedAvatar(userId || name || "?");
  return <MascotAvatar config={cfg} size={size} ring={ring} className={className} />;
}

/**
 * Maskot avatarı — Erdi tabanı + aksesuar katmanları.
 *
 * TEK çizim yeri: hem başkalarının avatarı (`Avatar`), hem kendi avatarın
 * (`MyAvatar`), hem düzenleme ekranının önizlemesi buradan geçiyor. Üç ayrı
 * kopya vardı ve biri değişince ötekiler geride kalıyordu.
 *
 * Taban görsel iki platformda AYNI dosya (`public/logo-mark.png` =
 * `M/src/assets/avatar-base.png`, aynı md5).
 */
export function MascotAvatar({
  config,
  size = 44,
  ring,
  className = "",
}: {
  config: AvatarConfig;
  size?: number;
  ring?: string | null;
  className?: string;
}) {
  return (
    <span
      className={`relative block shrink-0 overflow-hidden rounded-full ${className}`}
      style={{ width: size, height: size, background: "#FA7C13", ...(ring ? { boxShadow: `0 0 0 2px ${ring}` } : {}) }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-mark.png" alt="" width={size} height={size} className="block h-full w-full object-cover" />
      <AvatarOverlay config={config} size={size} />
    </span>
  );
}

/**
 * KENDİ avatarın — başlıkta ve profilde.
 *
 * `Avatar`dan tek farkı kaynağı: sunucudan gelen alan yerine REAKTİF yerel
 * depo okunuyor, böylece düzenleme ekranından çıkar çıkmaz başlıktaki kopya
 * da değişiyor (sayfa tazelemeden). Çizim aynı: seçim varsa o, yoksa
 * kimlikten türeyen maskot.
 *
 * Ayrı bir "ben" çizimi VARDI ve maskotu koşulsuz çiziyordu: hiç avatar
 * seçmemiş biri başlıkta çıplak maskot, kendi arkadaş listesinde arma olarak
 * görünüyordu — aynı kişi, aynı ekranda, iki kimlik.
 */
export function MyAvatar({
  userId,
  name,
  serverAvatar = null,
  size = 44,
  ring,
  className = "",
}: {
  userId: string;
  name: string | null;
  /**
   * Sunucudan gelen avatar (düzenin okuduğu profil). İLK BOYAMA bununla
   * çiziliyor: yerel depo yalnız tarayıcıda okunabildiği için sunucu
   * çiziminde boş, ve tek başına bırakılsaydı her sayfa açılışında önce arma
   * görünüp sonra maskota atlardı.
   */
  serverAvatar?: string | null;
  size?: number;
  ring?: string | null;
  className?: string;
}) {
  const cfg = useAvatar() ?? parseAvatar(serverAvatar);
  if (cfg) return <MascotAvatar config={cfg} size={size} ring={ring} className={className} />;
  return <Avatar userId={userId} name={name} size={size} ring={ring} className={className} />;
}
