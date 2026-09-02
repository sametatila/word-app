import React from "react";
import { View } from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop, Text as SvgText } from "react-native-svg";

/**
 * Başkalarının arması — web'deki `components/avatar.tsx` ile AYNI hash ve
 * AYNI palet. Aynı kişi telefonda ve tarayıcıda aynı renkte görünür; yoksa
 * listede tanıdığını renginden bulamazsın. Kendi avatarın (maskot + aksesuar)
 * cihazda kalır; bu, diğer insanlar içindir. Dosya yükleme yok — kimlik hash'ten.
 */
function fnv(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const PALETTE: [string, string][] = [
  ["#a65c15", "#653916"],
  ["#16748a", "#115a6b"],
  ["#237a4c", "#1a5c39"],
  ["#b62e43", "#8e2335"],
  ["#77439d", "#5d347a"],
  ["#86690e", "#6a530b"],
  ["#a65c15", "#8e2335"],
  ["#16748a", "#5d347a"],
  ["#237a4c", "#115a6b"],
  ["#b62e43", "#5d347a"],
  ["#86690e", "#854a15"],
  ["#77439d", "#1a5c39"],
];

export function initials(name: string | null): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean).slice(0, 2);
  const out = parts.map((p) => Array.from(p)[0]?.toLocaleUpperCase("tr-TR") ?? "").join("");
  return out || "?";
}

export function PersonAvatar({ userId, name, size = 40, ring }: { userId: string; name: string | null; size?: number; ring?: string | null }) {
  const h = fnv(userId);
  const [a, b] = PALETTE[h % PALETTE.length];
  const id = `pa-${h.toString(36)}`;
  const inner = ring ? size - 4 : size;
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, alignItems: "center", justifyContent: "center", borderWidth: ring ? 2 : 0, borderColor: ring ?? "transparent" }}>
      <Svg width={inner} height={inner} viewBox="0 0 40 40">
        <Defs>
          <LinearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={a} />
            <Stop offset="1" stopColor={b} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="40" height="40" rx="20" fill={`url(#${id})`} />
        <SvgText x="20" y="20" fill="#fff" fontSize={name && initials(name).length > 1 ? 15 : 17} fontWeight="700" textAnchor="middle" alignmentBaseline="central">
          {initials(name)}
        </SvgText>
      </Svg>
    </View>
  );
}
