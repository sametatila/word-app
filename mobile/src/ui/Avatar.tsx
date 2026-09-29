import React, { useEffect, useRef } from "react";
import { Animated, Easing, View, Image, PixelRatio } from "react-native";
import { useAvatar, parseAvatar, HAT_COLORS, type AvatarConfig } from "../lib/avatar";
import { avatarImageUrl, avatarLayers, catalogBlink, catalogGlance, catalogSize, circleFrame, idleScript, stageFrame, type AvatarCatalog } from "../lib/avatarLayers";
import { reduceMotion } from "../lib/reduceMotion";
import { useAvatarCatalog } from "../lib/avatarCatalog";
import { useTheme } from "../theme";

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
  const { colors } = useTheme();
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
  /* TEK ÇİZİM 3B: katalog henüz yoksa (ilk açılış, cihazda kopya yok) boş
     daire; eski 2B maskot yok (web ile aynı). */
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, alignItems: "center", justifyContent: "center", borderWidth: ring ? 2 : 0, borderColor: ring ?? "transparent" }}>
      <View style={{ width: inner, height: inner, borderRadius: inner / 2, backgroundColor: colors.surface2 }} />
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
 * BEKLEME HAREKETİ (v3, 2026-09-29) — web `components/avatar` ile aynı:
 * sürekli nefes (4,2 sn, alttan 1 → 1,012) ve rastgele hafif hareketler
 * (ortak senaryo `lib/avatarLayers` `idleScript`): göz kırpma, sağa/sola
 * bakma, başı eğip bakma, eğilme, küçük sekme. Nefes, eğilme ve sekme yerel
 * sürücüde; göz karesi durumdan. "Hareketi azalt"ta hiçbiri yok.
 */
function useIdle(glances: string[]) {
  const breath = useRef(new Animated.Value(0)).current;
  const tilt = useRef(new Animated.Value(0)).current;
  const bob = useRef(new Animated.Value(0)).current;
  const [eyes, setEyes] = React.useState<string | null>(null);
  const key = glances.join(",");
  useEffect(() => {
    if (reduceMotion()) return;
    const ease = Easing.inOut(Easing.sin);
    const a = Animated.loop(Animated.sequence([
      Animated.timing(breath, { toValue: 1, duration: 2100, easing: ease, useNativeDriver: true }),
      Animated.timing(breath, { toValue: 0, duration: 2100, easing: ease, useNativeDriver: true }),
    ]));
    a.start();
    let alive = true;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const loop = () => {
      if (!alive) return;
      const { steps, ms } = idleScript(Math.random, key ? key.split(",") : []);
      for (const st of steps) {
        timers.push(setTimeout(() => {
          if (!alive) return;
          if (st.eyes !== undefined) setEyes(st.eyes);
          if (st.tilt !== undefined) Animated.timing(tilt, { toValue: st.tilt, duration: 650, easing: Easing.bezier(0.45, 0.05, 0.35, 1), useNativeDriver: true }).start();
          if (st.bob !== undefined) Animated.timing(bob, { toValue: st.bob, duration: 180, easing: Easing.out(Easing.quad), useNativeDriver: true }).start();
        }, st.t));
      }
      timers.push(setTimeout(loop, ms));
    };
    timers.push(setTimeout(loop, 1400));
    return () => { alive = false; a.stop(); timers.forEach(clearTimeout); setEyes(null); tilt.setValue(0); bob.setValue(0); };
  }, [breath, tilt, bob, key]);
  return {
    eyes,
    body: [{ translateY: bob }, { rotate: tilt.interpolate({ inputRange: [-10, 10], outputRange: ["-10deg", "10deg"] }) }],
    breathe: [{ scaleY: breath.interpolate({ inputRange: [0, 1], outputRange: [1, 1.012] }) }, { scaleX: breath.interpolate({ inputRange: [0, 1], outputRange: [1, 0.997] }) }],
  };
}

/** Nomi'nin tuvali: taban, göz kareleri, yuvalar; bekleme hareketiyle (web `NomiFigure`). */
function NomiFigure({ cat, base, files, w, h }: { cat: AvatarCatalog; base: string; files: { base: string; layers: string[] }; w: number; h: number }) {
  const bl = catalogBlink(cat);
  const gl = catalogGlance(cat);
  const idle = useIdle(gl ? Object.keys(gl.frames) : []);
  const full = { position: "absolute" as const, left: 0, top: 0, width: w, height: h };
  const eyeImgs = [
    ...(bl ? bl.frames.slice(0, 2).map((f, i) => ({ name: `kirp${i + 1}`, file: f, box: bl })) : []),
    ...(gl ? Object.entries(gl.frames).map(([name, f]) => ({ name, file: f, box: gl })) : []),
  ];
  return (
    <Animated.View style={[full, { transformOrigin: "bottom", transform: idle.body }]}>
      <Animated.View style={[full, { transformOrigin: "bottom", transform: idle.breathe }]}>
        <Image source={{ uri: `${base}/${files.base}` }} style={full} resizeMode="stretch" />
        {eyeImgs.map((e) => (
          <Image key={e.name} source={{ uri: `${base}/${e.file}` }} resizeMode="stretch"
            style={{ position: "absolute", left: (e.box.left / 100) * w, top: (e.box.top / 100) * h, width: (e.box.w / 100) * w, height: (e.box.h / 100) * h, opacity: idle.eyes === e.name ? 1 : 0 }} />
        ))}
        {files.layers.map((f) => (
          <Image key={f} source={{ uri: `${base}/${f}` }} style={full} resizeMode="stretch" />
        ))}
      </Animated.View>
    </Animated.View>
  );
}

export function AvatarStage({ config, height = 280, inset = 0, children, figureScale }: { config: AvatarConfig; height?: number; /** Altta binen içeriğin payı (web ile aynı). */ inset?: number; children?: React.ReactNode; figureScale?: Animated.Value }) {
  const catalog = useAvatarCatalog();
  const { colors } = useTheme();
  const [stageW, setStageW] = React.useState(0);
  /* TEK ÇİZİM 3B (web `AvatarStage` ile aynı): burun görünen alanın dikey
     ortasında, takılı parçaların sığacağı ölçekte (`stageFrame`); arka plan
     sahneyi ortadan kaplıyor. Katalog yoksa boş zemin, eski 2B yok. */
  const L = catalog ? avatarLayers(config, catalog.cat) : null;
  const size = catalog ? catalogSize(catalog.cat) : null;
  const fr = catalog && L ? stageFrame(catalog.cat, stageW, height - inset, [L.base, ...L.layers]) : null;
  const nose = catalog?.cat.burun ?? (size ? [size.w / 2, size.h / 2] : [0, 0]);
  return (
    <View style={{ height, overflow: "hidden", backgroundColor: colors.surface2 }} onLayout={(e) => setStageW(e.nativeEvent.layout.width)}>
      {catalog && L?.bg ? <Image source={{ uri: `${catalog.base}/${L.bg}` }} style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }} resizeMode="cover" /> : null}
      {catalog && L && size && fr && stageW ? (
        <Animated.View style={{ position: "absolute", left: stageW / 2 + fr.dx, top: fr.top, width: fr.w, height: fr.h, transformOrigin: `${(nose[0] / size.w) * 100}% ${(nose[1] / size.h) * 100}%`, transform: figureScale ? [{ scale: figureScale }] : [] }}>
          <NomiFigure cat={catalog.cat} base={catalog.base} files={L} w={fr.w} h={fr.h} />
        </Animated.View>
      ) : null}
      {children}
    </View>
  );
}

