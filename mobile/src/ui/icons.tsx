import React from "react";
import Svg, { Path, Circle } from "react-native-svg";

type P = { color?: string; size?: number };
const S = ({ size = 24, children }: { size?: number; children: React.ReactNode }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">{children}</Svg>
);
const stroke = (color: string, w = 2) => ({ stroke: color, strokeWidth: w, strokeLinecap: "round" as const, strokeLinejoin: "round" as const });

export const LearnIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Path d="M4 7l8-3 8 3-8 3-8-3z" {...stroke(color)} /><Path d="M4 12l8 3 8-3M4 17l8 3 8-3" {...stroke(color)} /></S>
);
export const PathIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Path d="M6 20c0-4 12-4 12-8s-8-4-8-8" {...stroke(color)} /><Circle cx="6" cy="20" r="2" fill={color} /><Circle cx="18" cy="12" r="2" fill={color} /><Circle cx="10" cy="4" r="2" fill={color} /></S>
);
export const SkillsIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Path d="M12 3l1.9 4.6L18.5 9l-3.6 3.2 1 4.9L12 14.8 8.1 17l1-4.9L5.5 9l4.6-1.4L12 3z" {...stroke(color)} /></S>
);
export const FlameIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Path d="M12 3c1 3 4 4 4 8a4 4 0 11-8 0c0-1.5.5-2.5 1-3 .3 1 .8 1.5 1.5 1.5C11 8.5 10.5 6 12 3z" {...stroke(color)} /></S>
);
export const BoltIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Path d="M13 2L5 13h5l-1 9 8-11h-5z" {...stroke(color)} /></S>
);
export const CheckIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Path d="M5 12.5l4.2 4.3L19 7" {...stroke(color, 2.6)} /></S>
);
export const ArrowRightIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Path d="M5 12h14M13 6l6 6-6 6" {...stroke(color)} /></S>
);
export const WalkIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Circle cx="13" cy="4" r="2" fill={color} /><Path d="M13 8l-2 4 3 2 1 6M11 12l-3 2-2 3M14 14l3 1" {...stroke(color)} /></S>
);
