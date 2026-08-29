import React from "react";
import Svg, { Path, Circle, Rect } from "react-native-svg";

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
export const SpeakerIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Path d="M4 9v6h4l5 4V5L8 9H4z" {...stroke(color)} /><Path d="M16 8.5a4 4 0 010 7M18.5 6a7 7 0 010 12" {...stroke(color)} /></S>
);
export const LockIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Rect x="5" y="11" width="14" height="9" rx="2" {...stroke(color)} /><Path d="M8 11V8a4 4 0 018 0v3" {...stroke(color)} /></S>
);
export const ArrowRightIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Path d="M5 12h14M13 6l6 6-6 6" {...stroke(color)} /></S>
);
export const WalkIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Circle cx="13" cy="4" r="2" fill={color} /><Path d="M13 8l-2 4 3 2 1 6M11 12l-3 2-2 3M14 14l3 1" {...stroke(color)} /></S>
);
export const XIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Path d="M6 6l12 12M18 6L6 18" {...stroke(color, 2.6)} /></S>
);

/* Patika/immersion tür ikonları — tek çizgi, web KindIcon ile aynı dil. */
export const ReadIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Path d="M12 6C9 4 5 4 3 5v13c2-1 6-1 9 1 3-2 7-2 9-1V5c-2-1-6-1-9 1z" {...stroke(color)} /><Path d="M12 7v12" {...stroke(color)} /></S>
);
export const ListenIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Path d="M5 13a7 7 0 0114 0" {...stroke(color)} /><Rect x="3.5" y="13" width="4" height="7" rx="1.5" {...stroke(color)} /><Rect x="16.5" y="13" width="4" height="7" rx="1.5" {...stroke(color)} /></S>
);
export const WriteIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Path d="M4 20l1-4L16 5l3 3L8 19z" {...stroke(color)} /><Path d="M14 7l3 3" {...stroke(color)} /></S>
);
export const GrammarIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Path d="M4 18L9 6l5 12M5.5 14h7M17 10v8M17 11a3 3 0 100 6" {...stroke(color)} /></S>
);
export const QuizIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Circle cx="12" cy="12" r="9" {...stroke(color)} /><Path d="M9 9a3 3 0 114 2.8c-1 .4-1 1-1 2.2M12 17.5v.5" {...stroke(color)} /></S>
);
export const ChevronLeftIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Path d="M15 6l-6 6 6 6" {...stroke(color, 2.2)} /></S>
);
export const ChevronRightIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Path d="M9 6l6 6-6 6" {...stroke(color, 2.2)} /></S>
);
export const BellIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Path d="M6 9a6 6 0 1112 0c0 5 2 6 2 6H4s2-1 2-6z" {...stroke(color)} /><Path d="M10 20a2 2 0 004 0" {...stroke(color)} /></S>
);
export const TrophyIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Path d="M7 4h10v4a5 5 0 01-10 0zM7 6H4v1a3 3 0 003 3M17 6h3v1a3 3 0 01-3 3M9 15h6M8 20h8M10 15v5M14 15v5" {...stroke(color)} /></S>
);
export const LogoutIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Path d="M14 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2v-2M10 12h10M17 9l3 3-3 3" {...stroke(color)} /></S>
);
export const ExamIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Path d="M3 8l9-4 9 4-9 4-9-4zM7 10v5c0 1.5 2.2 3 5 3s5-1.5 5-3v-5M21 8v5" {...stroke(color)} /></S>
);
export const CrownIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Path d="M4 8l3.5 4L12 6l4.5 6L20 8l-1.5 10h-13zM5.5 20h13" {...stroke(color)} /></S>
);
export const ShareIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Circle cx="6" cy="12" r="2.4" {...stroke(color)} /><Circle cx="17" cy="6" r="2.4" {...stroke(color)} /><Circle cx="17" cy="18" r="2.4" {...stroke(color)} /><Path d="M8.1 10.9l6.8-3.8M8.1 13.1l6.8 3.8" {...stroke(color)} /></S>
);
export const SettingsIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Circle cx="12" cy="12" r="3" {...stroke(color)} /><Path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" {...stroke(color)} /></S>
);
export const PodiumIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Path d="M9 20V9h6v11M15 20V4h5v16M9 20V13H4v7M2 20h20" {...stroke(color)} /></S>
);
