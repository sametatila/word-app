import { useCallback, useState } from "react";
import { BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

/**
 * Donanım geri tuşunu onaya bağlar (tur ve yürüyüş oturumu gibi yarım
 * bırakılınca emek kaybı olan ekranlar). `active` iken geri → onay diyaloğu;
 * değilken sistem davranışı. Android 16 predictive back'te de RN aynı olayı
 * yayınlar (ReactActivity OnBackPressedCallback), ekstra ayar gerekmez.
 *
 * YALNIZ ANDROID. `BackHandler` iOS'ta hiçbir şey yapmaz — `addEventListener`
 * orada boş bir saplama. Bu docblock eskiden "donanım/GESTURE geri tuşu"
 * diyordu ve iOS'ta o söz tutulmuyordu: kenardan kaydırma ekranı onay
 * sormadan kapatıyordu. iOS'ta karşılığı hareketi kapatmak ve o,
 * `navigation/RootStack`ta `gestureEnabled: false` ile yapılıyor — bu kancayı
 * çağıran her ekran o listede de olmak zorunda (`check:parity` §297).
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
