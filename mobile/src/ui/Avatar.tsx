import React, { useEffect, useRef } from "react";
import { Animated, Easing, View, Image, PixelRatio } from "react-native";
import { AvatarOverlay, HAT_COLORS } from "./avatarParts";
import { useAvatar, parseAvatar, avatarBg, type AvatarConfig } from "../lib/avatar";
import { avatarImageUrl, avatarLayers, catalogBlink, catalogSize, circleFrame, type AvatarCatalog } from "../lib/avatarLayers";
import { reduceMotion } from "../lib/reduceMotion";
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
  /* 3B KATALOG AÇIKSA katmanlar (web `MascotAvatar` ile aynı kırpma: `circleFrame`). */
  if (catalog) {
    const L = avatarLayers(config, catalog.cat);
    /* KÜÇÜK BOY TEK GÖRSEL (web ile aynı): listelerde kişi başına bir istek,
       sunucuda birleşiyor (`avatarImageUrl`). Ekran yoğunluğuna göre boy. */
    if (inner <= 96) {
      return (
        <View style={{ width: size, height: size, borderRadius: size / 2, alignItems: "center", justifyContent: "center", borderWidth: ring ? 2 : 0, borderColor: ring ?? "transparent" }}>
          <Image source={{ uri: avatarImageUrl(catalog.base, L, inner * PixelRatio.get()) }} style={{ width: inner, height: inner, borderRadius: inner / 2, backgroundColor: "#FA7C13" }} />
        </View>
      );
    }
    return (
      <View style={{ width: size, height: size, borderRadius: size / 2, alignItems: "center", justifyContent: "center", borderWidth: ring ? 2 : 0, borderColor: ring ?? "transparent" }}>
        <View style={{ width: inner, height: inner, borderRadius: inner / 2, overflow: "hidden", backgroundColor: "#FA7C13" }}>
          <CircleLayers cat={catalog.cat} base={catalog.base} files={[L.bg, L.base, ...L.layers]} size={inner} />
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

/** Tuvali daireye yerleştirir: kataloğun daire karesi kutuyu doldurur (web ile aynı yüzdeler). */
function CircleLayers({ cat, base, files, size }: { cat: AvatarCatalog; base: string; files: (string | null)[]; size: number }) {
  const fr = circleFrame(cat);
  const box = { position: "absolute" as const, left: (fr.left / 100) * size, top: (fr.top / 100) * size, width: (fr.w / 100) * size, height: (fr.h / 100) * size };
  return (
    <>
      {files.filter((f): f is string => !!f).map((f) => (
        <Image key={f} source={{ uri: `${base}/${f}` }} style={box} resizeMode="stretch" />
      ))}
    </>
  );
}

/**
 * BEKLEME HAREKETİ (2026-09-29) — web `globals.css` `.nomi-idle` ile aynı
 * süreler: nefes 4,2 sn (alttan 1 → 1,012), sallanma 7,5 sn (±0,6°), göz
 * kırpma 9 sn'de iki kez (yarım 60 ms, kapalı 90 ms, yarım 70 ms; 1,6 sn
 * gecikmeli). Hepsi yerel sürücüde; "hareketi azalt"ta durur.
 */
function useIdle() {
  const breath = useRef(new Animated.Value(0)).current;
  const sway = useRef(new Animated.Value(0)).current;
  const blink = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (reduceMotion()) return;
    const ease = Easing.inOut(Easing.sin);
    const wave = (v: Animated.Value, ms: number) =>
      Animated.loop(Animated.sequence([
        Animated.timing(v, { toValue: 1, duration: ms / 2, easing: ease, useNativeDriver: true }),
        Animated.timing(v, { toValue: 0, duration: ms / 2, easing: ease, useNativeDriver: true }),
      ]));
    const set = (x: number) => Animated.timing(blink, { toValue: x, duration: 0, useNativeDriver: true });
    const once = [set(1), Animated.delay(60), set(2), Animated.delay(90), set(1), Animated.delay(70), set(0)];
    const blinks = Animated.sequence([
      Animated.delay(1600),
      Animated.loop(Animated.sequence([...once, Animated.delay(9000 * 0.46 - 220), ...once, Animated.delay(9000 * 0.54 - 220)])),
    ]);
    const a = wave(breath, 4200), b = wave(sway, 7500);
    a.start(); b.start(); blinks.start();
    return () => { a.stop(); b.stop(); blinks.stop(); };
  }, [breath, sway, blink]);
  return {
    breathe: [{ scaleY: breath.interpolate({ inputRange: [0, 1], outputRange: [1, 1.012] }) }, { scaleX: breath.interpolate({ inputRange: [0, 1], outputRange: [1, 0.997] }) }],
    sway: [{ rotate: sway.interpolate({ inputRange: [0, 1], outputRange: ["-0.6deg", "0.6deg"] }) }],
    half: blink.interpolate({ inputRange: [0, 1, 2], outputRange: [0, 1, 0] }),
    closed: blink.interpolate({ inputRange: [0, 1, 2], outputRange: [0, 0, 1] }),
  };
}

/** Nomi'nin tuvali: taban, göz kırpma kareleri, yuvalar; bekleme hareketiyle (web `NomiFigure`). */
function NomiFigure({ cat, base, files, w, h }: { cat: AvatarCatalog; base: string; files: { base: string; layers: string[] }; w: number; h: number }) {
  const idle = useIdle();
  const bl = catalogBlink(cat);
  const full = { position: "absolute" as const, left: 0, top: 0, width: w, height: h };
  return (
    <Animated.View style={[full, { transformOrigin: "bottom", transform: idle.sway }]}>
      <Animated.View style={[full, { transformOrigin: "bottom", transform: idle.breathe }]}>
        <Image source={{ uri: `${base}/${files.base}` }} style={full} resizeMode="stretch" />
        {bl
          ? bl.frames.slice(0, 2).map((f, i) => (
              <Animated.Image key={f} source={{ uri: `${base}/${f}` }} resizeMode="stretch"
                style={{ position: "absolute", left: (bl.left / 100) * w, top: (bl.top / 100) * h, width: (bl.w / 100) * w, height: (bl.h / 100) * h, opacity: i === 0 ? idle.half : idle.closed }} />
            ))
          : null}
        {files.layers.map((f) => (
          <Image key={f} source={{ uri: `${base}/${f}` }} style={full} resizeMode="stretch" />
        ))}
      </Animated.View>
    </Animated.View>
  );
}

/**
 * PROFİL SAHNESİ — büyük avatar, arka planıyla (2026-09-28, taslak F2). Web
 * `AvatarStage` ile aynı düzen: 3B katalog açıkken arka plan görseli ve
 * göğüsten yukarı Nomi, kapalıyken arka planın düz geçişi ve büyük 2B daire.
 * `children` üst alanın düğmeleri. `figureScale`: yalnız figürü ölçekleyen
 * canlı değer (düzenleyicide parça seçilince küçük sıçrama,
 * `screens/AvatarScreen`); arka plan ve düğmeler yerinde. Verilmezse duruk.
 */
export function AvatarStage({ config, height = 280, inset = 0, children, figureScale }: { config: AvatarConfig; height?: number; /** Altta binen içeriğin payı (web ile aynı). */ inset?: number; children?: React.ReactNode; figureScale?: Animated.Value }) {
  const catalog = useAvatarCatalog();
  const g = avatarBg(config.bg);
  const [stageW, setStageW] = React.useState(0);
  if (catalog) {
    const L = avatarLayers(config, catalog.cat);
    const { w, h } = catalogSize(catalog.cat);
    /* TUVAL ALANIN GENİŞLİĞİNDE, alta hizalı; geniş ekranda (tablet) yüksekliğe
       sığdırılıyor: hiçbir parça (kanat, balon) kesilmesin. Web `AvatarStage`
       ile aynı; alt kenar binen içeriğin (`inset`) biraz altında. */
    const lift = Math.max(0, inset - 6);
    const fw = stageW ? Math.min(stageW, ((height - lift) * w) / h) : 0;
    const fh = (fw * h) / w;
    return (
      <View style={{ height, overflow: "hidden" }} onLayout={(e) => setStageW(e.nativeEvent.layout.width)}>
        {L.bg ? <Image source={{ uri: `${catalog.base}/${L.bg}` }} style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: Math.max(height, stageW ? (stageW * h) / w : height) }} resizeMode="cover" /> : <Fill from={g.from} to={g.to} />}
        {fw ? (
          <Animated.View style={{ position: "absolute", bottom: lift - height * 0.015, alignSelf: "center", width: fw, height: fh, transformOrigin: "bottom", transform: figureScale ? [{ scale: figureScale }] : [] }}>
            <NomiFigure cat={catalog.cat} base={catalog.base} files={L} w={fw} h={fh} />
          </Animated.View>
        ) : null}
        {children}
      </View>
    );
  }
  const d = Math.round(height * 0.56);
  return (
    <View style={{ height, overflow: "hidden" }}>
      <Fill from={g.from} to={g.to} />
      <View style={{ position: "absolute", bottom: height * 0.14, alignSelf: "center", width: d * 0.9, height: 20, borderRadius: radii.pill, backgroundColor: "rgba(0,0,0,0.16)" }} />
      <Animated.View style={{ position: "absolute", bottom: height * 0.17, alignSelf: "center", borderRadius: d, borderWidth: 5, borderColor: "rgba(255,255,255,0.85)", transform: figureScale ? [{ scale: figureScale }] : [] }}>
        <MascotAvatar config={config} size={d} />
      </Animated.View>
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
