"use client";

import { AvatarOverlay } from "@/components/avatar-parts";
import { useAvatar, type AvatarConfig } from "@/lib/avatar";

/**
 * KENDİ avatarın: Erdi tabanı (dairesel) + aksesuar katmanları.
 *
 * Web'de kullanıcının kendisi de baş-harf armasıyla görünüyordu — yani aynı
 * kişi telefonda maskot, tarayıcıda "DÖ" yazan yeşil bir daireydi. Kimlik iki
 * platformda iki şey olamaz.
 *
 * Başkaları için bu bileşen KULLANILMAZ: onlar `components/avatar.tsx`teki
 * armayla görünüyor ve o arma mobildeki `PersonAvatar` ile aynı hash + aynı
 * paleti kullanıyor. Ayrım mobilde de aynı: `Avatar` üç yerde (başlık, profil,
 * düzenleme), `PersonAvatar` diğer her yerde.
 *
 * Taban görsel iki platformda AYNI dosya (`public/logo-mark.png` =
 * `M/src/assets/avatar-base.png`, aynı md5).
 */
export function MyAvatar({
  size = 44,
  config,
  className = "",
}: {
  size?: number;
  /** Düzenleme ekranının önizlemesi — verilmezse kayıtlı avatar. */
  config?: AvatarConfig;
  className?: string;
}) {
  const stored = useAvatar();
  const cfg = config ?? stored;
  return (
    <span
      className={`relative block shrink-0 overflow-hidden rounded-full ${className}`}
      style={{ width: size, height: size, background: "#FA7C13" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-mark.png" alt="" width={size} height={size} className="block h-full w-full object-cover" />
      <AvatarOverlay config={cfg} size={size} />
    </span>
  );
}
