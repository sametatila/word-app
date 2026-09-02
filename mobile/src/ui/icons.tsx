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
export const MicIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Rect x="9" y="3" width="6" height="11" rx="3" {...stroke(color)} /><Path d="M6 11a6 6 0 0012 0M12 17v4M9 21h6" {...stroke(color)} /></S>
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
  <S size={size}>
    <Circle cx="12" cy="12" r="3" {...stroke(color)} />
    <Path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" {...stroke(color)} />
  </S>
);
export const RepeatIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Path d="M3 12a9 9 0 0115-6.7L21 8M21 12a9 9 0 01-15 6.7L3 16" {...stroke(color)} /><Path d="M21 4v4h-4M3 20v-4h4" {...stroke(color)} /></S>
);
export const PodiumIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Path d="M9 20V9h6v11M15 20V4h5v16M9 20V13H4v7M2 20h20" {...stroke(color)} /></S>
);
export const FaceIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Circle cx="12" cy="12" r="9" {...stroke(color)} /><Path d="M8.5 14a4 4 0 007 0" {...stroke(color)} /><Circle cx="9" cy="10" r="1" fill={color} /><Circle cx="15" cy="10" r="1" fill={color} /></S>
);

/** Google "G" logosu (4 renk) — sosyal giriş düğmesi için. */
export const GoogleIcon = ({ size = 20 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48">
    <Path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
    <Path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
    <Path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
    <Path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
  </Svg>
);

/** Apple logosu (tek renk) — sosyal giriş. */
export const AppleIcon = ({ color = "#000", size = 20 }: { color?: string; size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path fill={color} d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.85-1.01.618 0 2.828.06 4.273 2.19-.132.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.94 4.45z" />
  </Svg>
);

/** Facebook logosu (mavi kare + beyaz f) — sosyal giriş. */
export const FacebookIcon = ({ size = 20 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Rect width="24" height="24" rx="5" fill="#1877F2" />
    <Path fill="#fff" d="M16.5 12.3h-2.3V20H11v-7.7H9.3V9.5H11V7.9c0-2 .82-3.4 3.2-3.4h2v2.7h-1.3c-.9 0-1 .34-1 .97v1.3h2.3l-.4 2.8z" />
  </Svg>
);

/** Zarf ikonu — e-posta ile giriş. */
export const MailIcon = ({ color = "#000", size = 20 }: { color?: string; size?: number }) => (
  <S size={size}><Rect x="3" y="5" width="18" height="14" rx="2" {...stroke(color)} /><Path d="M4 7l8 6 8-6" {...stroke(color)} /></S>
);

// ── Sosyal katman ikonları (tepkiler + arkadaş/arama) — aynı ızgara, aynı çizgi.
export const HeartIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" {...stroke(color)} /></S>
);
export const StarIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7L12 3z" {...stroke(color)} /></S>
);
export const PartyIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Path d="M5 21l4-12 7 7-11 5z" {...stroke(color)} /><Path d="M13 4l1 2M18 6l-1.5 1.5M20 12l-2 .5M15 2.5l-.5 2" {...stroke(color)} /></S>
);
export const SparkIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.5 6.5l2.5 2.5M15 15l2.5 2.5M6.5 17.5L9 15M15 9l2.5-2.5" {...stroke(color)} /></S>
);
export const HandshakeIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Path d="M3 10l4-4 5 3 5-3 4 4-3 6-6 4-6-4-3-6z" {...stroke(color)} /><Path d="M9 13l3 2 3-2" {...stroke(color)} /></S>
);
export const TargetIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Circle cx="12" cy="12" r="8" {...stroke(color)} /><Circle cx="12" cy="12" r="4" {...stroke(color)} /><Circle cx="12" cy="12" r="1" fill={color} /></S>
);
export const SearchIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Circle cx="11" cy="11" r="6" {...stroke(color)} /><Path d="M20 20l-4.5-4.5" {...stroke(color)} /></S>
);
export const UserPlusIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Circle cx="10" cy="8" r="4" {...stroke(color)} /><Path d="M3 20c0-3.5 3-6 7-6s7 2.5 7 6" {...stroke(color)} /><Path d="M19 8v6M16 11h6" {...stroke(color)} /></S>
);
export const InboxIcon = ({ color = "#000", size }: P) => (
  <S size={size}><Path d="M4 13l2-8h12l2 8v6H4v-6z" {...stroke(color)} /><Path d="M4 13h5a3 3 0 006 0h5" {...stroke(color)} /></S>
);
