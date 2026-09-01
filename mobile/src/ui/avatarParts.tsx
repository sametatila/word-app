import React from "react";
import Svg, { Path, Circle, Rect, Line } from "react-native-svg";
import type { AvatarConfig } from "../lib/avatar";

/**
 * Avatar aksesuar katmanları — 100x100 viewBox'ta, Erdi tabanının ÜZERİNE bindirilir.
 * Placeholder vektörler; Replicate aşamasında gerçek sanata dönüşecek. Katalog
 * (HATS/GLASSES/MUSTACHES) düzenleme ekranını besler.
 */
export const HATS = ["beanie", "cap", "crown"] as const;
export const GLASSES = ["round", "square"] as const;
export const MUSTACHES = ["curl", "thick"] as const;
export const HAT_COLORS = ["#c0392b", "#2d6cdf", "#27ae60", "#8e44ad", "#e67e22", "#2c3e50"];

function Hat({ id, color }: { id: string; color: string }) {
  if (id === "beanie") return (
    <>
      <Path d="M20 37 Q50 6 80 37 Z" fill={color} />
      <Rect x="16" y="35" width="68" height="9" rx="4.5" fill={color} />
      <Rect x="16" y="35" width="68" height="9" rx="4.5" fill="#00000022" />
    </>
  );
  if (id === "cap") return (
    <>
      <Path d="M22 35 Q50 10 78 35 Z" fill={color} />
      <Path d="M48 35 Q80 35 87 45 L48 45 Z" fill={color} />
      <Path d="M48 35 Q80 35 87 45 L48 45 Z" fill="#00000018" />
    </>
  );
  if (id === "crown") return (
    <Path d="M20 43 L28 22 L40 36 L50 18 L60 36 L72 22 L80 43 Z" fill={color} stroke="#00000022" strokeWidth={1} />
  );
  return null;
}

function GlassesPart({ id }: { id: string }) {
  const c = "#242424";
  if (id === "round") return (
    <>
      <Circle cx="37" cy="46" r="9" stroke={c} strokeWidth={2.6} fill="#ffffff33" />
      <Circle cx="63" cy="46" r="9" stroke={c} strokeWidth={2.6} fill="#ffffff33" />
      <Line x1="46" y1="46" x2="54" y2="46" stroke={c} strokeWidth={2.6} />
    </>
  );
  if (id === "square") return (
    <>
      <Rect x="28" y="39" width="17" height="14" rx="2.5" stroke={c} strokeWidth={2.6} fill="#ffffff33" />
      <Rect x="55" y="39" width="17" height="14" rx="2.5" stroke={c} strokeWidth={2.6} fill="#ffffff33" />
      <Line x1="45" y1="45" x2="55" y2="45" stroke={c} strokeWidth={2.6} />
    </>
  );
  return null;
}

function Mustache({ id }: { id: string }) {
  const c = "#3a2a1a";
  if (id === "curl") return (<Path d="M34 62 Q42 71 50 65 Q58 71 66 62 Q58 69 50 67 Q42 69 34 62 Z" fill={c} />);
  if (id === "thick") return (<Path d="M33 60 Q50 73 67 60 Q61 69 50 69 Q39 69 33 60 Z" fill={c} />);
  return null;
}

/** Aksesuar katmanları — tabanın üzerine mutlak bindirilir (mustache→gözlük→şapka). */
export function AvatarOverlay({ config, size }: { config: AvatarConfig; size: number }) {
  if (!config.hat && !config.glasses && !config.mustache) return null;
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" style={{ position: "absolute", top: 0, left: 0 }}>
      {config.mustache ? <Mustache id={config.mustache} /> : null}
      {config.glasses ? <GlassesPart id={config.glasses} /> : null}
      {config.hat ? <Hat id={config.hat} color={config.hatColor} /> : null}
    </Svg>
  );
}
