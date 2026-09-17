import React from "react";
import { View, Image } from "react-native";
import { AvatarOverlay, GLASSES, HAT_COLORS, HATS, MUSTACHES } from "./avatarParts";
import { isLockedPart } from "../lib/avatarUnlocks";
import { useAvatar, parseAvatar, type AvatarConfig } from "../lib/avatar";

/**
 * Avatarın TEK çizim yeri — web `src/components/avatar.tsx` ile birebir eş.
 *
 * Üç bileşen, iki platformda aynı adlar ve aynı davranış:
 *
 *   - `Avatar`       — HERHANGİ bir kişi. Seçtiği avatar, yoksa kimliğinden
 *                      türeyen maskot.
 *   - `MyAvatar`     — kendin. Aynı çizim, kaynağı reaktif yerel depo.
 *   - `MascotAvatar` — ham maskot; düzenleme ekranının önizlemesi.
 *
 * HERKES MASKOTLA ÇİZİLİYOR. Avatar seçmemiş kişi eskiden baş harfli renkli
 * bir armayla çiziliyordu; canlıda profillerin çoğu seçmediği için arkadaşlar,
 * Bul sekmesi ve sıralama baştan sona eski görünüyordu. Ayırt edicilik
 * korunuyor: seçmemiş kişinin aksesuarları kimliğinden türetiliyor.
 */

// Erdi (maskot) forward-facing tabanı — web `public/logo-mark.png` ile AYNI dosya (aynı md5).
const BASE = require("../assets/avatar-base.png");

/** Kimlikten sayı: aynı kimlik her zaman aynı avatarı verir (web `hash` ile aynı). */
function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * Türetilen avatarda KİLİTLİ parça çıkmıyor — web `derivedAvatar` ile aynı.
 * Kazanılmamış bir aksesuarı rastgele dağıtmak, kazananın rozetini
 * değersizleştirirdi.
 */
const FREE_HATS = HATS.filter((h) => !isLockedPart(h));
const FREE_GLASSES = GLASSES.filter((g) => !isLockedPart(g));
const FREE_MUSTACHES = MUSTACHES.filter((m) => !isLockedPart(m));

/**
 * Avatar seçmemiş kişinin kimliğinden türeyen maskot — web `derivedAvatar`
 * ile BİREBİR (aynı kişi telefonda ve tarayıcıda aynı şapkayla görünmeli).
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

/** Bir kişinin avatarı — `avatar` doluysa o, boşsa kimlikten türeyen maskot. */
export function Avatar({
  userId,
  name,
  avatar,
  size = 40,
  /** Kazanılmış bir unvanın halkası. */
  ring,
}: {
  userId: string;
  name: string | null;
  /** Kişinin KENDİ avatarı, ham JSON (bkz. lib/avatar `parseAvatar`). */
  avatar?: string | null;
  size?: number;
  ring?: string | null;
}) {
  const cfg = parseAvatar(avatar) ?? derivedAvatar(userId || name || "?");
  return <MascotAvatar config={cfg} size={size} ring={ring} />;
}

/**
 * Maskot avatarı — Erdi tabanı + aksesuar katmanları.
 *
 * TEK çizim yeri: kendi avatarın, başkalarınınki ve düzenleme ekranının
 * önizlemesi hep buradan geçiyor.
 */
export function MascotAvatar({ config, size = 44, ring }: { config: AvatarConfig; size?: number; ring?: string | null }) {
  const inner = ring ? size - 4 : size;
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, alignItems: "center", justifyContent: "center", borderWidth: ring ? 2 : 0, borderColor: ring ?? "transparent" }}>
      <View style={{ width: inner, height: inner, borderRadius: inner / 2, overflow: "hidden", backgroundColor: "#FA7C13" }}>
        <Image source={BASE} style={{ width: inner, height: inner }} resizeMode="cover" />
        <AvatarOverlay config={config} size={inner} />
      </View>
    </View>
  );
}

/**
 * KENDİ avatarın — başlıkta ve profilde.
 *
 * `Avatar`dan tek farkı kaynağı: sunucudan gelen alan yerine REAKTİF yerel
 * depo okunuyor, böylece düzenleme ekranından çıkar çıkmaz başlıktaki kopya
 * da değişiyor. Çizim aynı: seçim varsa o, yoksa kimlikten türeyen maskot.
 */
export function MyAvatar({
  userId,
  name,
  serverAvatar = null,
  size = 44,
  ring,
}: {
  userId: string;
  name: string | null;
  /**
   * Sunucudan gelen avatar (`/api/me`). İLK BOYAMA bununla çiziliyor: cihaz
   * deposu eşzamansız okunuyor ve tek başına bırakılsaydı her açılışta önce
   * arma görünüp sonra maskota atlardı.
   */
  serverAvatar?: unknown;
  size?: number;
  ring?: string | null;
}) {
  const cfg = useAvatar() ?? parseAvatar(serverAvatar);
  if (cfg) return <MascotAvatar config={cfg} size={size} ring={ring} />;
  return <Avatar userId={userId} name={name} size={size} ring={ring} />;
}
