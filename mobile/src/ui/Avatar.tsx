import React from "react";
import { View, Image } from "react-native";
import { AvatarOverlay, HAT_COLORS } from "./avatarParts";
import { useAvatar, parseAvatar, avatarBg, type AvatarConfig } from "../lib/avatar";
import { avatarLayers } from "../lib/avatarLayers";
import { useAvatarCatalog } from "../lib/avatarCatalog";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import { radii } from "../theme";

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

// Nomi (maskot) forward-facing tabanı — web `public/logo-mark.png` ile AYNI dosya (aynı md5).
const BASE = require("../assets/avatar-base.png");
/** Aynı çizimin 512 px'liği (web `public/icon-512.png`): büyük boyda 128'lik taban bulanıklaşıyordu. */
const BASE_LARGE = require("../assets/avatar-base-512.png");

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
 * Türetilen avatarda YALNIZ HERKESE AÇIK parçalar çıkıyor (iki platformda aynı
 * liste). Kazanılmamış bir aksesuarı rastgele dağıtmak, kazananın emeğini
 * değersizleştirirdi; kilit tablosu yalnız sunucuda (`lib/avatar-unlocks`),
 * istemci onu bilmiyor. Taç eskiden bu havuzdaydı, artık lig birinciliğiyle
 * açılıyor.
 */
const FREE_HATS = ["beanie", "cap"];
const FREE_GLASSES = ["round", "square"];
const FREE_MUSTACHES = ["curl", "thick"];

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
    bg: null,
    extra: {},
    fur: null,
    expression: null,
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
 * Maskot avatarı — Nomi tabanı + aksesuar katmanları.
 *
 * TEK çizim yeri: kendi avatarın, başkalarınınki ve düzenleme ekranının
 * önizlemesi hep buradan geçiyor.
 */
export function MascotAvatar({ config, size = 44, ring }: { config: AvatarConfig; size?: number; ring?: string | null }) {
  const inner = ring ? size - 4 : size;
  const catalog = useAvatarCatalog();
  /* 3B KATALOG AÇIKSA katmanlar (web `MascotAvatar` ile aynı ölçek ve hiza). */
  if (catalog) {
    const L = avatarLayers(config, catalog.cat);
    return (
      <View style={{ width: size, height: size, borderRadius: size / 2, alignItems: "center", justifyContent: "center", borderWidth: ring ? 2 : 0, borderColor: ring ?? "transparent" }}>
        <View style={{ width: inner, height: inner, borderRadius: inner / 2, overflow: "hidden", backgroundColor: "#FA7C13" }}>
          {L.bg ? <Image source={{ uri: `${catalog.base}/${L.bg}` }} style={{ position: "absolute", width: inner, height: inner }} resizeMode="cover" /> : null}
          {[L.base, ...L.layers].map((f) => (
            <Image key={f} source={{ uri: `${catalog.base}/${f}` }} style={{ position: "absolute", width: inner, height: inner, transform: [{ translateY: inner * 0.07 }, { scale: 1.12 }] }} resizeMode="cover" />
          ))}
        </View>
      </View>
    );
  }
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, alignItems: "center", justifyContent: "center", borderWidth: ring ? 2 : 0, borderColor: ring ?? "transparent" }}>
      <View style={{ width: inner, height: inner, borderRadius: inner / 2, overflow: "hidden", backgroundColor: "#FA7C13" }}>
        <Image source={inner > 72 ? BASE_LARGE : BASE} style={{ width: inner, height: inner }} resizeMode="cover" />
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

/**
 * PROFİL SAHNESİ — büyük avatar, arka planıyla (2026-09-28, taslak F2). Web
 * `AvatarStage` ile aynı düzen: 3B katalog açıkken arka plan görseli ve
 * göğüsten yukarı Nomi, kapalıyken arka planın düz geçişi ve büyük 2B daire.
 * `children` üst alanın düğmeleri.
 */
export function AvatarStage({ config, height = 280, children }: { config: AvatarConfig; height?: number; children?: React.ReactNode }) {
  const catalog = useAvatarCatalog();
  const g = avatarBg(config.bg);
  if (catalog) {
    const L = avatarLayers(config, catalog.cat);
    const fig = Math.round(height * 1.02);
    return (
      <View style={{ height, overflow: "hidden" }}>
        {L.bg ? <Image source={{ uri: `${catalog.base}/${L.bg}` }} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }} resizeMode="cover" /> : <Fill from={g.from} to={g.to} />}
        <View style={{ position: "absolute", bottom: height * 0.07, alignSelf: "center", width: fig * 0.6, height: 24, borderRadius: radii.pill, backgroundColor: "rgba(0,0,0,0.18)" }} />
        <View style={{ position: "absolute", bottom: 0, alignSelf: "center", width: fig, height: fig }}>
          {[L.base, ...L.layers].map((f) => (
            <Image key={f} source={{ uri: `${catalog.base}/${f}` }} style={{ position: "absolute", width: fig, height: fig }} resizeMode="contain" />
          ))}
        </View>
        {children}
      </View>
    );
  }
  const d = Math.round(height * 0.56);
  return (
    <View style={{ height, overflow: "hidden" }}>
      <Fill from={g.from} to={g.to} />
      <View style={{ position: "absolute", bottom: height * 0.14, alignSelf: "center", width: d * 0.9, height: 20, borderRadius: radii.pill, backgroundColor: "rgba(0,0,0,0.16)" }} />
      <View style={{ position: "absolute", bottom: height * 0.17, alignSelf: "center", borderRadius: d, borderWidth: 5, borderColor: "rgba(255,255,255,0.85)" }}>
        <MascotAvatar config={config} size={d} />
      </View>
      {children}
    </View>
  );
}

/** Dikey geçiş zemini (üstten alta) — sahnenin 2B arka planı. */
function Fill({ from, to }: { from: string; to: string }) {
  return (
    <Svg style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }} width="100%" height="100%">
      <Defs>
        <LinearGradient id="stageBg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={from} />
          <Stop offset="1" stopColor={to} />
        </LinearGradient>
      </Defs>
      <Rect x="0" y="0" width="100%" height="100%" fill="url(#stageBg)" />
    </Svg>
  );
}
