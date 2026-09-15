import React, { useSyncExternalStore } from "react";
import { Text as RNText, View, type TextLayoutEvent } from "react-native";
import { typography } from "../theme";

/**
 * CİHAZIN YAZI TİPİ ÖLÇÜLÜYOR, VARSAYILMIYOR.
 *
 * `Text` satır kutusunu 1,25 em tabanıyla çiziyor ve bu taban Roboto'nun
 * yüksekliğine (çıkan + inen ≈ 1,17 em) göre seçilmişti. Android bir satırı
 * `lineHeight` kadar çiziyor, yazı tipi o kutudan uzunsa ilk satırın üstünü ve
 * son satırın altını KESİYOR (React Native `CustomLineHeightSpan`).
 *
 * Emülatör Roboto kullanıyor ve orada her şey sığıyordu. Üreticinin kendi
 * sistem yazı tipini koyduğu telefonlarda (Samsung, Xiaomi, Oppo…) aynı
 * yazı daha uzun: soru kartındaki kelime ve cümle üstten ve alttan kesik
 * görünüyordu. Tek bir sabit taban hepsine yetmez; 1,4'e çıkarmak da Roboto'da
 * her başlığı gereksiz yere gevşetirdi.
 *
 * Açılışta görünmez bir örnek yazı çiziliyor ve yazı tipinin gerçek yüksekliği
 * `onTextLayout`tan okunuyor. Taban = ölçülen yükseklik + Roboto'nun 1,25'te
 * sahip olduğu pay (≈ 0,08 em). Roboto'da sonuç yine 1,25, uzun yazı tipinde
 * kendiliğinden büyüyor. Ölçüm gelene kadar eski taban geçerli.
 */
const BASE_MIN = 1.25;
const HEADROOM = 0.08;
const PROBE_SIZE = 100;
/**
 * Ölçüm dizgisi: en yüksek çıkan (noktalı büyük harfler Ä Ö Ü İ) ve en derin
 * inen (g j p y) glifler. Ekranda görünmüyor, kullanıcıya metin değil; o
 * yüzden Unicode kaçışıyla yazılı. Harfle yazıldığında i18n taraması onu
 * çevrilmemiş Türkçe arayüz metni sanıp mobil CI'ı düşürüyordu.
 */
const PROBE_GLYPHS = "\u00C4\u00D6\u00DC\u0130gjpy";

let minRatio = BASE_MIN;
const listeners = new Set<() => void>();

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function report(ratio: number) {
  if (!Number.isFinite(ratio) || ratio <= 0) return;
  const next = Math.max(BASE_MIN, Math.round((ratio + HEADROOM) * 100) / 100);
  if (next <= minRatio) return;
  minRatio = next;
  listeners.forEach((fn) => fn());
}

/** Satır kutusunun en düşük oranı (em). */
export function useMinLineRatio(): number {
  return useSyncExternalStore(subscribe, () => minRatio, () => minRatio);
}

function onProbe(e: TextLayoutEvent) {
  const line = e.nativeEvent.lines[0];
  if (!line) return;
  report((line.ascender + line.descender) / PROBE_SIZE);
}

/**
 * Kökte bir kez. İki ağırlık ölçülüyor çünkü bazı üreticilerde kalın kesim
 * ayrı bir dosya ve yüksekliği farklı.
 */
export function FontMetricsProbe() {
  return (
    <View pointerEvents="none" style={{ position: "absolute", opacity: 0, left: -1000, top: 0 }} importantForAccessibility="no-hide-descendants" accessibilityElementsHidden>
      {[typography.display, typography.body].map((st, i) => (
        <RNText
          key={i}
          allowFontScaling={false}
          onTextLayout={onProbe}
          style={{ fontFamily: st.fontFamily, fontWeight: st.fontWeight, fontSize: PROBE_SIZE, includeFontPadding: false }}
        >
          {PROBE_GLYPHS}
        </RNText>
      ))}
    </View>
  );
}

/**
 * SORU KARTINDAKİ KELİME KÜÇÜLÜR, BÖLÜNMEZ.
 *
 * Kart dar ekranda 250 pikselin altına iniyor; 32 puntoda "Anrufbeantworter"
 * sığmıyor ve kelime ortasından ikinci satıra kırılıyordu. Satır sayısı kelime
 * sayısıyla sınırlanıyor: bir kelime kendi içinde kırılmaya kalkınca satır
 * sayısı aşılıyor ve yazı sığana kadar küçülüyor. Uzun cümle (üçten çok
 * kelime) serbestçe sarılır, orada kırpma yok.
 */
export function promptFit(text: string) {
  const n = text.trim().split(/\s+/).filter(Boolean).length;
  if (n === 0 || n > 3) return {};
  return { numberOfLines: n, adjustsFontSizeToFit: true, minimumFontScale: 0.45 } as const;
}
