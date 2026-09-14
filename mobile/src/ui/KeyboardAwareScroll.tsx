import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Platform, ScrollView, TextInput, type NativeScrollEvent, type NativeSyntheticEvent, type ScrollViewProps } from "react-native";
import type { ScrollViewInstance } from "react-native";
import { reduceMotion } from "../lib/reduceMotion";
import { useKeyboardInset, useKeyboardTop } from "../lib/useKeyboardHeight";
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
 * ÖLÇÜ CİHAZDAN: klavyenin üst kenarı platformun bildirdiği gerçek değerden
 * (bkz. `useKeyboardInset`), girdinin ve alanın yeri `measureInWindow` ile.
 * Üçüncü parti klavyeler, öneri şeridi, gezinme türü (3 tuş / jest) ve alanın
 * altındaki dolgu ne olursa olsun hesap aynı. Sabit bir sayı varsayılmıyor.
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
  ...rest
}, disRef) {
  const inset = useKeyboardInset();
  const kbTop = useKeyboardTop();
  const ref = useRef<ScrollViewInstance>(null);
  useImperativeHandle(disRef, () => ref.current as ScrollViewInstance, []);
  /* Kaydırma konumu yalnız olaydan öğrenilebiliyor. */
  const offset = useRef(0);
  const [pad, setPad] = useState(0);

  /* Çağıranın kendi dinleyicisi varsa KORUNUYOR: bu bileşen `ScrollView`un
     yerine geçiyor, onun sözleşmesini daraltmamalı. */
  const onScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    offset.current = e.nativeEvent.contentOffset.y;
    onScrollDisari?.(e);
  }, [onScrollDisari]);

  /*
    Klavye değişince (açılma, kapanma, klavye değiştirme, emoji paneli)
    hem dip payı hem odaktaki girdinin yeri PENCERE KOORDİNATINDA ölçülüyor.

    Eskiden görünür alan `kb - insets.bottom` ile tahmin ediliyordu ve
    kaydırma alanının ekranın dibine kadar uzandığı varsayılıyordu. İkisi de
    yanlıştı: Android klavye yüksekliğinden gezinme çubuğunu zaten düşüyor
    (bkz. `useKeyboardInset`) ve alanın altında çoğu ekranda bir dolgu ya da
    sabit bir çubuk var. Ölçüm ikisini de gereksiz kılıyor.
  */
  useEffect(() => {
    const host = ref.current;
    if (inset <= 0) { setPad(0); return; }
    if (!host) return;
    /* Dip payı: kaydırma alanının klavyenin altında kalan kısmı + nefes.
       iOS'ta `automaticallyAdjustKeyboardInsets` aynı işi içerik payıyla
       yapıyor; ikisi birden verilirse klavye kadar boşluk iki kez eklenir. */
    if (Platform.OS === "android") {
      host.measureInWindow((_x, y, _w, h) => setPad(Math.max(0, y + h - kbTop) + spacing.lg));
    }
    /* Bir kare bekleniyor: dip payı bu render'da yeni eklendi, ölçüm ondan
       önce yapılırsa kaydırılabilir yükseklik henüz eski değeri taşıyor. */
    const id = setTimeout(() => {
      const node = TextInput.State.currentlyFocusedInput();
      if (!node) return;
      node.measureInWindow((_x, y, _w, h) => {
        const tasma = y + h + keepVisible - (kbTop - spacing.sm);
        /* "Hareketi azalt" açıksa kaydırma yerinde oluyor (uygulama geneli
           kural; kapısız `animated: true` denetimde kalıyor). */
        if (tasma > 0) ref.current?.scrollTo({ y: offset.current + tasma, animated: !reduceMotion() });
      });
    }, 80);
    return () => clearTimeout(id);
  }, [inset, kbTop, keepVisible]);

  return (
    <ScrollView
      ref={ref}
      onScroll={onScroll}
      scrollEventThrottle={16}
      keyboardShouldPersistTaps="handled"
      /* iOS'un kendi kurtarması BURADA, tek yerde. Her ekranda ayrı ayrı
         yazılıyordu ve yazılmayan ekranlar geride kalıyordu; artık bu bileşeni
         kullanan herkes onu da alıyor. Android'de etkisiz (orada payı
         yukarıdaki ölçüm veriyor). */
      automaticallyAdjustKeyboardInsets
      {...rest}
      contentContainerStyle={[contentContainerStyle, pad > 0 ? { paddingBottom: pad } : null]}
    >
      {children}
    </ScrollView>
  );
});
