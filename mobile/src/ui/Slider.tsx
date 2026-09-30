import React, { useRef } from "react";
import { View, PanResponder, type LayoutChangeEvent } from "react-native";
import { Text } from "./Text";
import { useTheme, radii, spacing, softShadow } from "../theme";
import { THUMB, snapValue, sliderFraction, valueAt } from "../lib/slider";

/**
 * Kaydırıcı — saf JS, native bağımlılık yok.
 *
 * Günlük hedef ve günde yeni kelime eskiden ÇİP IZGARASIYDI: on çip, altında
 * yedi çip daha. Yirmi kadar dokunma hedefi, sayı seçmek için bir duvar
 * kuruyordu ve webde aynı ayar zaten kaydırıcıydı — aynı şey iki platformda
 * iki ayrı biçimde duruyordu.
 *
 * Paket EKLENMEDİ: depo bare React Native ve native bağımlılık her iki
 * platformda yeniden derleme demek (iOS burada derlenemiyor). `PanResponder`
 * bu iş için yeterli.
 *
 * DEĞER SÜRÜKLERKEN, KAYIT BIRAKINCA: `onChange` her adımda tetikleniyor ki
 * sayı parmakla birlikte yürüsün; `onCommit` yalnız bırakıldığında, çünkü
 * sürükleme boyunca kaydetmek 5'ten 120'ye giden bir harekette yirmi dört
 * istek demek.
 *
 * TİTREME VE ZIPLAMA (2026-09-30), üç kök neden:
 *   1. `locationX` DOKUNULAN GÖRÜNÜME göre: parmak tutamaca (ya da dolu
 *      kısma) basınca konum o çocuğa göre geliyordu. Tutamacın ortasına
 *      basan 11 px okuyordu, değer başa sıçrıyordu; sürükledikçe tutamaç
 *      parmağın altında kaydığı için konum da onunla birlikte kayıp
 *      titriyordu. Artık çizimler `pointerEvents="none"`, dokunma hep
 *      kapsayıcıya düşüyor; hareket de başlangıç + `dx` ile hesaplanıyor
 *      (Android'de hareket sırasında `locationX` sıçrayabiliyor).
 *   2. Tutamaç GENİŞLİK ÖLÇÜLENE KADAR YOKTU ve piksel konumla çiziliyordu:
 *      ilk karede tutamaçsız çubuk, `onLayout`tan sonra yerine atlayan bir
 *      daire. Artık yüzdeyle konumlanıyor, ilk karede yerinde.
 *   3. `PanResponder` bir kez kuruluyor: içindeki `onChange`/`onCommit`/
 *      sınırlar ilk render'da donuyordu (eski `me` ile karşılaştıran bir
 *      `onCommit`). Hepsi her render'da referansa yazılıyor. Kaydırma
 *      görünümü de dikey kıpırtıda hareketi elinden alamıyor
 *      (`onPanResponderTerminationRequest`).
 */
export function Slider({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
  onCommit,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  /** Sayının yanında duran birim ("tekrar", "kelime"). */
  suffix: string;
  onChange: (v: number) => void;
  onCommit: (v: number) => void;
}) {
  const { colors } = useTheme();
  /* Izgara ya da sınır dışı bir değer (API ızgaraya bakmıyor, 12 de geçer)
     tutamacı ve sayıyı AYNI yere koysun: gösterilen değer ızgaradaki. */
  const shown = snapValue(value, min, max, step);
  const oran = sliderFraction(shown, min, max);

  /*
    Genişlik, son değer ve çağrılar REFERANSTA: `PanResponder` bir kez
    kuruluyor ve kapanışındaki her şey ilk render'dakinde donardı.
  */
  const w = useRef(0);
  const son = useRef(shown);
  son.current = shown;
  const cfg = useRef({ min, max, step, onChange, onCommit });
  cfg.current = { min, max, step, onChange, onCommit };
  /** Sürüklemenin başladığı x (kapsayıcıya göre); hareket bunun + `dx`. */
  const x0 = useRef(0);

  /*
    DEĞER REFERANSA HEMEN YAZILIYOR, render'ı beklemeden. Parmak
    bırakıldığında `onCommit` bu referansı okuyor; yalnız render'da
    güncellenseydi son hareketle bırakma arasına render girmediğinde
    ekranda 70 yazarken sunucuya 65 giderdi (cihazda görüldü).
  */
  const yaz = (x: number) => {
    const c = cfg.current;
    const v = valueAt(x, w.current, c.min, c.max, c.step);
    if (v === null || v === son.current) return;
    son.current = v;
    c.onChange(v);
  };

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: (e) => {
        x0.current = e.nativeEvent.locationX;
        yaz(x0.current);
      },
      onPanResponderMove: (_e, g) => yaz(x0.current + g.dx),
      onPanResponderRelease: () => cfg.current.onCommit(son.current),
      onPanResponderTerminate: () => cfg.current.onCommit(son.current),
    }),
  ).current;

  const adimla = (yon: 1 | -1) => {
    const v = snapValue(son.current + yon * step, min, max, step);
    if (v === son.current) return;
    son.current = v;
    onChange(v);
    onCommit(v);
  };

  const onLayout = (e: LayoutChangeEvent) => {
    w.current = e.nativeEvent.layout.width;
  };

  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", marginBottom: spacing.sm }}>
        <Text variant="bodyStrong">{label}</Text>
        <Text variant="bodyStrong" color={colors.primaryText}>{shown} {suffix}</Text>
      </View>
      {/*
        DOKUNMA ALANI çubuktan yüksek: 6 piksellik bir çizgiyi parmakla
        yakalamak zor. Çubuk ortada duruyor, alan onu 22 piksele tamamlıyor.
      */}
      <View
        {...pan.panHandlers}
        onLayout={onLayout}
        accessibilityRole="adjustable"
        accessibilityLabel={label}
        accessibilityValue={{ min, max, now: shown, text: `${shown} ${suffix}` }}
        accessibilityActions={[{ name: "increment" }, { name: "decrement" }]}
        onAccessibilityAction={(e) => adimla(e.nativeEvent.actionName === "decrement" ? -1 : 1)}
        style={{ height: 22, justifyContent: "center" }}
      >
        {/* DOLU KISIM TUTAMACIN MERKEZİNDE bitiyor: yarım tutamaçlık sabit
            baş + izin geri kalanının `oran`ı (web `.range-fill` aynı hesap). */}
        <View pointerEvents="none" style={{ height: 6, borderRadius: radii.sm, backgroundColor: colors.surface2, overflow: "hidden", flexDirection: "row" }}>
          <View style={{ width: THUMB / 2, backgroundColor: colors.primary }} />
          <View style={{ flex: 1, marginRight: THUMB / 2 }}>
            <View style={{ width: `${oran * 100}%`, height: 6, backgroundColor: colors.primary }} />
          </View>
        </View>
        {/* Tutamacın yürüdüğü yol izden bir tutamaç kısa; konum yüzde,
            yani ölçüm beklemeden ilk karede yerinde. */}
        <View pointerEvents="none" style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: THUMB }}>
          <View
            style={{
              position: "absolute",
              left: `${oran * 100}%`,
              top: 0,
              width: 22, height: 22, borderRadius: 11,
              /* BEYAZ BAŞPARMAK + hafif gölge (2026-09-29 Samet: seçim B,
                 dolu turuncu çip): turuncu başparmak turuncu dolu kısımla
                 birleşiyordu; yüzey halkası da kalktı. Web `.range` aynı. */
              backgroundColor: "#ffffff",
              ...softShadow("#000000", 4, 0.35),
            }}
          />
        </View>
      </View>
    </View>
  );
}
