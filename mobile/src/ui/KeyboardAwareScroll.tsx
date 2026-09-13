import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";
import { findNodeHandle, ScrollView, TextInput, type NativeScrollEvent, type NativeSyntheticEvent, type ScrollViewProps, type LayoutChangeEvent } from "react-native";
import type { ScrollViewInstance } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { reduceMotion } from "../lib/reduceMotion";
import { useKeyboardHeight } from "../lib/useKeyboardHeight";
import { spacing } from "../theme";

/**
 * Klavye açılınca odaktaki girdiyi görünür tutan kaydırma alanı.
 *
 * NEDEN GEREKLİ: edge-to-edge altında (Android 15+/targetSdk 35+) pencere
 * klavyeyle birlikte küçülmüyor, klavye içeriğin ÜSTÜNE biniyor. Yani hiçbir
 * şey yapılmazsa ekranın alt yarısındaki her girdi klavyenin altında kalıyor
 * ve kullanıcı ne yazdığını göremiyor. Uygulamada on yediye yakın ekranda
 * girdi var ve bunların yalnız ikisinde el yordamıyla yazılmış bir çözüm
 * vardı; gerisinde hiç yoktu.
 *
 * NE YAPIYOR: ekranın tamamını itmiyor. Klavye yüksekliği kadar dip payı
 * ekleyip, odaktaki girdiyi (ve `keepVisible` kadar altını — ipucu, sayaç,
 * "Kontrol et" gibi ona ait bilgiler) klavyenin üstüne KAYDIRIYOR. Kaydırma
 * içerik içinde olduğu için başlık yerinde kalıyor.
 *
 * ÖLÇÜ CİHAZDAN: yükseklik `keyboardDidShow`un bildirdiği gerçek değer, yani
 * üçüncü parti klavyeler, öneri şeridi, bölünmüş/yüzen klavye ve dil çubuğu
 * dahil ne varsa ölçüye giriyor. Sabit bir sayı varsayılmıyor.
 */
type Props = ScrollViewProps & {
  /**
   * Girdinin ALTINDA görünür kalması istenen pay (px). Girdiye ait ipucu,
   * hata satırı ve buton bu payın içinde kalıyor — kullanıcı yazarken
   * yalnız kutuyu değil ona ait her şeyi görüyor.
   */
  keepVisible?: number;
};

/* Ref DIŞARI DA VERİLİYOR: bazı ekranlar `scrollToEnd` çağırıyor (sınav
   cevabı, rol yapma konuşması). `ScrollView`un yerine geçen bir bileşen onun
   sözleşmesini daraltmamalı. */
export const KeyboardAwareScroll = forwardRef<ScrollViewInstance, Props>(function KeyboardAware({
  children,
  contentContainerStyle,
  keepVisible = 96,
  onScroll: onScrollDisari,
  onLayout: onLayoutDisari,
  ...rest
}, disRef) {
  const kb = useKeyboardHeight();
  const insets = useSafeAreaInsets();
  const ref = useRef<ScrollViewInstance>(null);
  useImperativeHandle(disRef, () => ref.current as ScrollViewInstance, []);
  /* Kaydırma konumu ve görünür yükseklik: hesabın ikisine de ihtiyacı var ve
     ikisi de yalnız olaylardan öğrenilebiliyor. */
  const offset = useRef(0);
  const viewH = useRef(0);

  /* Çağıranın kendi dinleyicisi varsa KORUNUYOR: bu bileşen `ScrollView`un
     yerine geçiyor, onun sözleşmesini daraltmamalı. */
  const onScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    offset.current = e.nativeEvent.contentOffset.y;
    onScrollDisari?.(e);
  }, [onScrollDisari]);
  const onLayout = useCallback((e: LayoutChangeEvent) => {
    viewH.current = e.nativeEvent.layout.height;
    onLayoutDisari?.(e);
  }, [onLayoutDisari]);

  /* Klavye yüksekliği değişince (açılma, kapanma, klavye değiştirme, emoji
     paneline geçme) odaktaki girdi yeniden hizalanıyor. */
  useEffect(() => {
    if (kb <= 0) return;
    const node = TextInput.State.currentlyFocusedInput();
    const host = ref.current;
    if (!node || !host) return;
    const hostNode = findNodeHandle(host);
    if (hostNode == null) return;
    /* Bir kare bekleniyor: dip payı bu render'da yeni eklendi, ölçüm ondan
       önce yapılırsa kaydırılabilir yükseklik henüz eski değeri taşıyor. */
    const id = setTimeout(() => {
      node.measureLayout(
        hostNode,
        (_x, y, _w, h) => {
          const kapali = Math.max(0, kb - insets.bottom);
          const gorunurDip = offset.current + viewH.current - kapali;
          const istenen = y + h + keepVisible;
          /* "Hareketi azalt" açıksa kaydırma yerinde oluyor (uygulama geneli
             kural; kapısız `animated: true` denetimde kalıyor). */
          if (istenen > gorunurDip) host.scrollTo({ y: offset.current + (istenen - gorunurDip), animated: !reduceMotion() });
        },
        () => { /* ölçüm başarısız: kaydırma yapılmıyor, pay yine de duruyor */ },
      );
    }, 60);
    return () => clearTimeout(id);
  }, [kb, insets.bottom, keepVisible]);

  /* Dip payı: klavyenin kapattığı yükseklik + bir nefes. Güvenli alan
     payı düşülüyor çünkü klavye zaten onun üstünde duruyor. */
  const pad = kb > 0 ? Math.max(0, kb - insets.bottom) + spacing.lg : 0;

  return (
    <ScrollView
      ref={ref}
      onScroll={onScroll}
      scrollEventThrottle={16}
      onLayout={onLayout}
      keyboardShouldPersistTaps="handled"
      /* iOS'un kendi kurtarması BURADA, tek yerde. Her ekranda ayrı ayrı
         yazılıyordu ve yazılmayan ekranlar geride kalıyordu; artık bu bileşeni
         kullanan herkes onu da alıyor. Android'de etkisiz (orada hesabı
         yukarıdaki ölçüm yapıyor). */
      automaticallyAdjustKeyboardInsets
      contentContainerStyle={[contentContainerStyle, { paddingBottom: pad }]}
      {...rest}
    >
      {children}
    </ScrollView>
  );
});
