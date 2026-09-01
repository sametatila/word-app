import React from "react";
import { View, Image } from "react-native";
import { AvatarOverlay } from "./avatarParts";
import { useAvatar, type AvatarConfig } from "../lib/avatar";

// Erdi (maskot) forward-facing tabanı — logo-mark. Dairesel çerçevede taban zemini.
const BASE = require("../assets/avatar-base.png");

/**
 * Kullanıcı avatarı: Erdi tabanı (dairesel) + aksesuar katmanları. `config`
 * verilmezse KAYITLI avatar kullanılır ve kaydedilince canlı güncellenir
 * (header/profil). Düzenleme ekranı `config` vererek önizleme yapar.
 */
export function Avatar({ size = 44, config }: { size?: number; config?: AvatarConfig }) {
  const stored = useAvatar();
  const cfg = config ?? stored;
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, overflow: "hidden", backgroundColor: "#FA7C13" }}>
      <Image source={BASE} style={{ width: size, height: size }} resizeMode="cover" />
      <AvatarOverlay config={cfg} size={size} />
    </View>
  );
}
