import React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import type { typography } from "../theme";
import { textHeight } from "./Skeleton";

type Variant = keyof typeof typography;

/**
 * İKON + YAZI HİZASI — web `components/icon-line.tsx` karşılığı.
 *
 * Satır `alignItems: "flex-start"`, ikon bu kutunun içinde: kutu yazının BİR
 * SATIRI kadar yüksek (`textHeight`, `ui/Text`in çizdiği satırla aynı hesap),
 * ikon onun ortasında. İkon böylece yazının ilk satırının tam ortasına
 * oturuyor; yazı tek satırsa sonuç `center` ile aynı, birkaç satırsa ikon
 * paragrafın ortasında yüzmüyor, ilk satırda kalıyor.
 *
 * Neden: satırlar ya `flex-start` + ikonda `marginTop: 2` yamasıyla ya da
 * düz `center` ile kuruluydu. Yama bir punto için tutturulmuş sabit sayı;
 * yazı ölçeği büyüyünce kayıyordu ve yazı ikonun üst kenarına yapışık,
 * YUKARIDA görünüyordu (2026-09-30 Samet).
 *
 * `box`: ikon bir satırdan yüksek bir karo ise (kapak kuralı) onun boyu. Kutu
 * en az o kadar oluyor; yazının ilk satırını karonun ortasına indirmek için
 * yazıya `paddingTop: lineInset(variant, box)` verilir.
 */
export function IconLine({ variant = "body", box = 0, style, children }: {
  /** Yanındaki yazının `Text` varyantı. */
  variant?: Variant;
  box?: number;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}) {
  return (
    <View style={[{ height: Math.max(textHeight(variant), box), flexShrink: 0, alignItems: "center", justifyContent: "center" }, style]}>
      {children}
    </View>
  );
}

/** Karonun yanındaki yazının üst boşluğu: ilk satır karonun ortasına insin. */
export function lineInset(variant: Variant, box: number): number {
  return Math.max(0, (box - textHeight(variant)) / 2);
}
