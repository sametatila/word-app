import React from "react";
import { View, Image } from "react-native";
import Svg, { Circle, ClipPath, Defs, Ellipse, LinearGradient, Path, Pattern, Rect, Stop, Text as SvgText } from "react-native-svg";
import { AvatarOverlay } from "./avatarParts";
import { useAvatar, parseAvatar, type AvatarConfig } from "../lib/avatar";

/**
 * Avatarın TEK çizim yeri — web `src/components/avatar.tsx` ile birebir eş.
 *
 * Üç bileşen, iki platformda aynı adlar ve aynı davranış:
 *
 *   - `Avatar`       — HERHANGİ bir kişi. Avatarı varsa maskot, yoksa arma.
 *   - `MyAvatar`     — kendin. Aynı çizim, kaynağı reaktif yerel depo.
 *   - `MascotAvatar` — ham maskot; düzenleme ekranının önizlemesi.
 *
 * Eskiden bu ayrım "ben maskot, başkaları arma" idi: aynı kişi başlıkta
 * maskot, kendi arkadaş listesinde arma olarak görünüyordu ve kimsenin
 * avatarı kimseye ulaşmıyordu (seçim yalnız cihazdaydı). Artık avatar
 * sunucuda (`profiles.avatar`) ve ayrım "seçmiş / seçmemiş".
 */

// Erdi (maskot) forward-facing tabanı — web `public/logo-mark.png` ile AYNI dosya (aynı md5).
const BASE = require("../assets/avatar-base.png");

/** Kimlikten sayı: aynı kimlik her zaman aynı armayı verir (web `hash` ile aynı). */
function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Arma paleti — web ile AYNI sıra. Aynı kişi telefonda ve tarayıcıda aynı renkte. */
const PALETTE: [string, string][] = [
  ["#a65c15", "#653916"], // kehribar → kestane
  ["#16748a", "#115a6b"], // turkuaz → derin turkuaz
  ["#237a4c", "#1a5c39"], // yosun → koyu yosun
  ["#b62e43", "#8e2335"], // kiremit → koyu kiremit
  ["#77439d", "#5d347a"], // erik → koyu erik
  ["#86690e", "#6a530b"], // hardal → koyu hardal
  ["#a65c15", "#8e2335"], // kehribar → kiremit
  ["#16748a", "#5d347a"], // turkuaz → erik
  ["#237a4c", "#115a6b"], // yosun → turkuaz
  ["#b62e43", "#5d347a"], // kiremit → erik
  ["#86690e", "#854a15"], // hardal → kestane
  ["#77439d", "#1a5c39"], // erik → yosun
];

/** Arka plan deseni — aynı renk çiftine düşen iki kişi bile aynı görünmesin. */
const PATTERNS = ["none", "rays", "dots", "stripe", "arc"] as const;

export function initials(name: string | null): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean).slice(0, 2);
  const out = parts.map((p) => Array.from(p)[0]?.toLocaleUpperCase("tr-TR") ?? "").join("");
  return out || "?";
}

/**
 * CSS `linear-gradient(Ndeg, …)` açısını SVG gradyan vektörüne çevirir.
 *
 * CSS'te 0 derece YUKARI bakar ve açı saat yönünde artar; SVG'de y aşağı
 * doğrudur. Bu dönüşüm olmadan mobil arma web'dekiyle aynı renkte ama farklı
 * yönde bir gradyanla çiziliyordu.
 */
function gradientVector(deg: number) {
  const r = (deg * Math.PI) / 180;
  const dx = Math.sin(r) / 2;
  const dy = -Math.cos(r) / 2;
  return { x1: 0.5 - dx, y1: 0.5 - dy, x2: 0.5 + dx, y2: 0.5 + dy };
}

/** Işın deseni: `rotate` açısından başlayan 18 derecelik on dilim. */
function rayPaths(rotate: number): string[] {
  const out: string[] = [];
  for (let i = 0; i < 10; i++) {
    const a0 = rotate + i * 36;
    const a1 = a0 + 18;
    const p = (deg: number) => {
      const r = ((deg - 90) * Math.PI) / 180; // SVG'de 0 derece sağa bakar
      return `${(20 + Math.cos(r) * 30).toFixed(2)} ${(20 + Math.sin(r) * 30).toFixed(2)}`;
    };
    out.push(`M20 20 L${p(a0)} A30 30 0 0 1 ${p(a1)} Z`);
  }
  return out;
}

/**
 * Bir kişinin avatarı — `avatar` doluysa maskot, boşsa kimlikten türeyen arma.
 *
 * Arma SİLİNMEDİ çünkü hâlâ gerçek bir yedek: hiç avatar seçmemiş herkes
 * çıplak maskotla çizilseydi sıralamada kimse kimseyi ayırt edemezdi.
 */
export function Avatar({
  userId,
  name,
  avatar,
  size = 40,
  /** Kazanılmış bir unvanın halkası — yoksa arma çıplak görünür. */
  ring,
}: {
  userId: string;
  name: string | null;
  /** Kişinin KENDİ avatarı, ham JSON (bkz. lib/avatar `parseAvatar`). */
  avatar?: string | null;
  size?: number;
  ring?: string | null;
}) {
  const cfg = parseAvatar(avatar);
  const inner = ring ? size - 4 : size;
  if (cfg) return <MascotAvatar config={cfg} size={size} ring={ring} />;

  const h = hash(userId || name || "?");
  const [from, to] = PALETTE[h % PALETTE.length];
  const pattern = PATTERNS[(h >>> 8) % PATTERNS.length];
  const rotate = (h >>> 16) % 360;
  const id = `av-${h.toString(36)}`;
  const g = gradientVector(rotate);
  const text = initials(name);

  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, alignItems: "center", justifyContent: "center", borderWidth: ring ? 2 : 0, borderColor: ring ?? "transparent" }}>
      <Svg width={inner} height={inner} viewBox="0 0 40 40">
        <Defs>
          <LinearGradient id={`${id}-g`} x1={g.x1} y1={g.y1} x2={g.x2} y2={g.y2}>
            <Stop offset="0" stopColor={from} />
            <Stop offset="1" stopColor={to} />
          </LinearGradient>
          <ClipPath id={`${id}-c`}>
            <Circle cx="20" cy="20" r="20" />
          </ClipPath>
          {pattern === "dots" ? (
            <Pattern id={`${id}-p`} x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
              <Circle cx="4" cy="4" r={40 / inner} fill="rgba(255,255,255,0.28)" />
            </Pattern>
          ) : null}
          {pattern === "stripe" ? (
            /* Dikey çubuk deseni, gradyan yönüne DİK duracak biçimde döndürülüyor. */
            <Pattern id={`${id}-p`} x="0" y="0" width={(9 * 40) / inner} height="8" patternUnits="userSpaceOnUse" patternTransform={`rotate(${rotate - 45})`}>
              <Rect x="0" y="0" width={(3 * 40) / inner} height="8" fill="rgba(255,255,255,0.18)" />
            </Pattern>
          ) : null}
        </Defs>
        <Rect x="0" y="0" width="40" height="40" rx="20" fill={`url(#${id}-g)`} />
        {pattern === "rays"
          ? rayPaths(rotate).map((d, i) => <Path key={i} d={d} fill="rgba(255,255,255,0.16)" clipPath={`url(#${id}-c)`} />)
          : pattern === "dots" || pattern === "stripe"
            ? <Rect x="0" y="0" width="40" height="40" fill={`url(#${id}-p)`} clipPath={`url(#${id}-c)`} />
            : pattern === "arc"
              ? <Ellipse cx="20" cy="33.33" rx="28" ry="20" fill="rgba(255,255,255,0.18)" clipPath={`url(#${id}-c)`} />
              : null}
        <SvgText x="20" y="20" fill="#fff" fontSize={text.length > 1 ? 15 : 17} fontWeight="700" textAnchor="middle" alignmentBaseline="central">
          {text}
        </SvgText>
      </Svg>
    </View>
  );
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
 * da değişiyor. Çizim aynı: seçim varsa maskot, yoksa arma.
 */
export function MyAvatar({ userId, name, size = 44, ring }: { userId: string; name: string | null; size?: number; ring?: string | null }) {
  const cfg = useAvatar();
  if (cfg) return <MascotAvatar config={cfg} size={size} ring={ring} />;
  return <Avatar userId={userId} name={name} size={size} ring={ring} />;
}
