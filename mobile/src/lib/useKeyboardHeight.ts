import { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";

/**
 * Açık klavyenin yüksekliği (px); kapalıysa 0.
 *
 * Neden gerekli: edge-to-edge (Android 15+/targetSdk 35+) altında pencere artık
 * `adjustResize` ile küçülmüyor, klavye içeriğin ÜSTÜNE biniyor. Bu yüzden alt
 * aksiyon alanını (input + ipucu + buton) klavye yüksekliği kadar elle yukarı
 * kaldırmamız gerekir. iOS'ta will* olayları daha akıcı, Android'de did*.
 */
export function useKeyboardHeight(): number {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const showEvt = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvt = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
    const onShow = Keyboard.addListener(showEvt, (e) => setHeight(e.endCoordinates?.height ?? 0));
    const onHide = Keyboard.addListener(hideEvt, () => setHeight(0));
    return () => { onShow.remove(); onHide.remove(); };
  }, []);
  return height;
}
