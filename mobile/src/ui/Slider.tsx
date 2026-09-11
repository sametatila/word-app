import React, { useRef, useState } from "react";
import { View, PanResponder, type LayoutChangeEvent } from "react-native";
import { Text } from "./Text";
import { useTheme, radii, spacing } from "../theme";

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
  const [width, setWidth] = useState(0);
  /*
    Genişlik ve son değer REFERANSTA tutuluyor: `PanResponder` bir kez
    kuruluyor ve kapanışındaki state ilk render'ınkinde donuyor — ilk
    sürüklemeden sonra her hareket eski genişlikle hesaplanırdı.
  */
  const w = useRef(0);
  const son = useRef(value);
  son.current = value;

  const oran = max > min ? (value - min) / (max - min) : 0;

  const hesapla = (x: number) => {
    if (w.current <= 0) return son.current;
    const t = Math.min(1, Math.max(0, x / w.current));
    const ham = min + t * (max - min);
    return Math.min(max, Math.max(min, Math.round(ham / step) * step));
  };

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      /*
        DEĞER REFERANSA HEMEN YAZILIYOR, render'ı beklemeden. Parmak
        bırakıldığında `onCommit` bu referansı okuyor; yalnız render'da
        güncellenseydi son hareketle bırakma arasına render girmediğinde
        ekranda 70 yazarken sunucuya 65 giderdi (cihazda görüldü).
      */
      onPanResponderGrant: (e) => {
        const v = hesapla(e.nativeEvent.locationX);
        if (v === son.current) return;
        son.current = v;
        onChange(v);
      },
      onPanResponderMove: (e) => {
        const v = hesapla(e.nativeEvent.locationX);
        if (v === son.current) return;
        son.current = v;
        onChange(v);
      },
      onPanResponderRelease: () => onCommit(son.current),
      onPanResponderTerminate: () => onCommit(son.current),
    }),
  ).current;

  const adimla = (yon: 1 | -1) => {
    const v = Math.min(max, Math.max(min, son.current + yon * step));
    if (v === son.current) return;
    onChange(v);
    onCommit(v);
  };

  const onLayout = (e: LayoutChangeEvent) => {
    const next = e.nativeEvent.layout.width;
    w.current = next;
    setWidth(next);
  };

  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", marginBottom: spacing.sm }}>
        <Text variant="bodyStrong">{label}</Text>
        <Text variant="bodyStrong" color={colors.primaryText}>{value} {suffix}</Text>
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
        accessibilityValue={{ min, max, now: value, text: `${value} ${suffix}` }}
        accessibilityActions={[{ name: "increment" }, { name: "decrement" }]}
        onAccessibilityAction={(e) => adimla(e.nativeEvent.actionName === "decrement" ? -1 : 1)}
        style={{ height: 22, justifyContent: "center" }}
      >
        <View style={{ height: 6, borderRadius: radii.sm, backgroundColor: colors.surface2 }}>
          <View style={{ width: `${oran * 100}%`, height: 6, borderRadius: radii.sm, backgroundColor: colors.primary }} />
        </View>
        {width > 0 ? (
          <View
            style={{
              position: "absolute",
              left: Math.max(0, Math.min(width - 22, oran * width - 11)),
              width: 22,
              height: 22,
              borderRadius: 11,
              backgroundColor: colors.primary,
              borderWidth: 3,
              borderColor: colors.surface,
            }}
          />
        ) : null}
      </View>
    </View>
  );
}
