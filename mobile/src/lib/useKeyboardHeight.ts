import { useEffect, useState, type ComponentRef, type RefObject } from "react";
import { Keyboard, Platform, type View } from "react-native";
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context";
import { spacing } from "../theme";

/**
 * Açık klavyenin yüksekliği (px); kapalıysa 0 — platformun BİLDİRDİĞİ değer.
 *
 * Doğrudan yerleşim hesabında KULLANMA: iki platform bu sayıyı farklı
 * ölçüyor (bkz. `useKeyboardInset`). Yerleşim için `useKeyboardInset` ya da
 * `useKeyboardLift`.
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

/**
 * Klavyenin PENCERENİN ALT KENARINDAN itibaren kapladığı yükseklik; kapalıysa 0.
 *
 * NEDEN AYRI: iki platformun bildirdiği yükseklik aynı şey değil.
 *
 *   iOS     — `endCoordinates.height` klavyenin tamamı, ekranın dibinden.
 *   Android — RN 0.87 `ReactRootView.checkForKeyboardEvents`:
 *             `imeInsets.bottom - systemBars.bottom`. Yani gezinme çubuğu
 *             (3 tuş ya da jest çizgisi) sayıdan ÇIKARILMIŞ geliyor.
 *
 * Eski hesap her yerde `kb - insets.bottom` idi: Android'de gezinme çubuğunu
 * İKİNCİ KEZ düşüyordu. Jest gezinmeli telefonda (~24dp) fark küçüktü ve
 * üstüne eklenen "öneri şeridi payı" onu örtüyordu; 3 tuşlu gezinmede (~48dp)
 * örtmüyordu ve "Kontrol et" düğmesinin alt kısmı klavyenin altında kalıyordu.
 * Öneri şeridi aslında ölçüye DAHİL (IME inset'i klavye penceresinin tamamı).
 *
 * `insets.bottom` (safe-area-context) Android'de `navigationBars` inset'i ve
 * klavyeyi içermiyor, yani `kb + insets.bottom` IME inset'inin kendisi.
 */
export function useKeyboardInset(): number {
  const kb = useKeyboardHeight();
  const insets = useSafeAreaInsets();
  if (kb <= 0) return 0;
  return Platform.OS === "android" ? kb + insets.bottom : kb;
}

/**
 * Klavyenin üst kenarının pencere koordinatındaki yeri (`measureInWindow` ile
 * aynı koordinat). Klavye kapalıysa pencerenin dibi.
 */
export function useKeyboardTop(): number {
  const inset = useKeyboardInset();
  const frame = useSafeAreaFrame();
  return frame.y + frame.height - inset;
}

/**
 * Bir kabın ALT KENARINI klavyenin üstüne çıkarmak için gereken pay (px).
 *
 * `anchor` alt kenarı klavyeyle OYNAMAYAN bir görünüm olmalı: payı alan
 * öğenin kendisi değil onu taşıyan kap (ya da payı `paddingBottom` olarak
 * alan ve kendisi dipte sabit duran öğe). Kabın alt kenarı gerçekten ÖLÇÜLÜYOR
 * — kabın altında ne kadar pay (güvenli alan, ekran dolgusu, sekme çubuğu)
 * olduğunu bilmeye gerek yok, cihaz, gezinme türü ve ekran ne olursa olsun
 * sonuç doğru. Pencere klavyeyle küçülen bir cihazda (eski Android) kap
 * zaten klavyenin üstünde ölçülür ve pay 0 çıkar.
 *
 * `gap`: kabın içeriği ile klavye arasında bırakılan nefes.
 */
export function useKeyboardLift(anchor: RefObject<ComponentRef<typeof View> | null>, gap: number = spacing.sm): number {
  const inset = useKeyboardInset();
  const top = useKeyboardTop();
  const [lift, setLift] = useState(0);
  useEffect(() => {
    if (inset <= 0) { setLift(0); return; }
    const node = anchor.current;
    if (!node) return;
    node.measureInWindow((_x, y, _w, h) => {
      setLift(Math.max(0, Math.round(y + h - top + gap)));
    });
  }, [inset, top, gap, anchor]);
  return inset > 0 ? lift : 0;
}

/**
 * MODAL İÇİNDE KLAVYE (QA F-0082, 2026-10-09).
 *
 * Android'de `Modal` ayrı bir pencere (Dialog). Klavye olayları ise ana
 * pencerenin kök görünümünden geliyor (RN `ReactRootView.checkForKeyboardEvents`
 * kendi penceresinin IME inset'ine bakıyor): klavye Modal'ın penceresine
 * açılınca ana pencere bir şey görmüyor, `useKeyboardInset` 0 kalıyor. Kenardan
 * kenara (edgeToEdgeEnabled) açıkken Dialog'un `adjustResize`ı da pencereyi
 * küçültmüyor. Sonuç: Bildir kartının "Gönder / Vazgeç" düğmeleri klavyenin
 * altında kalıyor, kart sığdığı için kaydırılamıyordu.
 *
 * Bu kanca alanın odağını izliyor: Android'de odak var ama ölçü yoksa `blind`
 * doğru döner ve çağıran kartı/sayfayı EKRANIN ÜST YARISINA yerleştirir (klavye
 * hiçbir telefonda ekranın yarısından fazlasını kaplamıyor). Ölçü gelirse
 * (iOS, ya da olayların geldiği bir Android) `inset` kullanılır, `blind` yanlış.
 */
export function useModalKeyboard(): { inset: number; blind: boolean; focus: { onFocus: () => void; onBlur: () => void } } {
  const inset = useKeyboardInset();
  const [focused, setFocused] = useState(false);
  return {
    inset,
    blind: Platform.OS === "android" && focused && inset <= 0,
    focus: { onFocus: () => setFocused(true), onBlur: () => setFocused(false) },
  };
}
