import { useCallback, useState } from "react";
import { BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

/**
 * Donanım/gesture geri tuşunu onaya bağlar (tur ve yürüyüş oturumu gibi yarım
 * bırakılınca emek kaybı olan ekranlar). `active` iken geri → onay diyaloğu;
 * değilken sistem davranışı. Android 16 predictive back'te de RN aynı olayı
 * yayınlar (ReactActivity OnBackPressedCallback), ekstra ayar gerekmez.
 */
export function useBackConfirm(active: boolean) {
  const [visible, setVisible] = useState(false);
  useFocusEffect(
    useCallback(() => {
      if (!active) return undefined;
      const sub = BackHandler.addEventListener("hardwareBackPress", () => { setVisible(true); return true; });
      return () => sub.remove();
    }, [active]),
  );
  return { visible, ask: () => setVisible(true), cancel: () => setVisible(false) };
}
