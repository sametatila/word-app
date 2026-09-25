import React from "react";
import { Image, View } from "react-native";

/**
 * Nomi (maskot) — animasyonlu WebP klipler. Android'de Fresco animated-webp
 * eklentisiyle oynar. Klipler 2:3 oranında; boy = en × 1.5.
 *
 * ANİMASYON YALNIZ GÜNLÜK TURDA (2026-09-18, Samet'in kararı).
 *
 * Nomi otuzdan fazla yüzeyde oynuyordu: her sonuç bandı, her durum ekranı
 * ("bulunamadı", "bağlantı yok"), sınav girişleri, seviye testi, yürüyüş
 * modu, gelişim kartı, hata sınırı. Karar şu: animasyon öğrenmenin
 * KENDİSİNDE kalır, ürünün geri kalanında durur. Kalan tek yer Öğren
 * sekmesinin günlük turu — tur kartları (`game/rounds`), turun sonuç bandı,
 * kutlama pop'u, ortam yürüyüşü ve koç balonu.
 *
 * KURAL KODDA, YORUMDA DEĞİL: bu bileşen günlük turun ağacı dışında hiçbir
 * şey çizmiyor (`game/dailyRound`). Gerekliydi çünkü tur KARTLARI paylaşımlı —
 * `RoundView` patron turundan, meydan okumadan ve seviye sınavından da
 * çağrılıyor; "yalnız GameScreen'den çağır" demek o üç ekranda maskotu
 * bırakıyordu. Akış şablonları (`ui/flow`) da maskotu artık tanımıyor: sonuç
 * bandı `aside`, durum gövdesi `icon` düğümü alıyor.
 *
 * Kapı: `check:parity` "maskot yalnız günlük turda" — hem Nomi'yi çizen dosya
 * listesine hem sağlayıcının tek kökten kurulduğuna bakıyor.
 *
 * Klip listesi ARŞİVLE BİRLİKTE DÜŞÜNÜLÜR: haritadan çıkan klip ikiliye
 * girmiyor (metro yalnız `require` edileni paketliyor) ve dosyası
 * `assets-archive/mascot/` altına taşınıyor — silinmiyor, geri getirmek bir
 * satır (bkz. o dizindeki README).
 */
const CLIP = {
  idle: require("../assets/mascot/idle-sit.webp"),
  happy: require("../assets/mascot/happy.webp"),
  thumbsup: require("../assets/mascot/thumbsup.webp"),
  sad: require("../assets/mascot/sad.webp"),
  celebrate: require("../assets/mascot/celebrate.webp"),
} as const;

export type Mood = keyof typeof CLIP;

/**
 * Nomi'nin boyu — TEK sayı, çünkü Nomi'nin tek yeri var: Öğren ekranının
 * günlük tur kutusu (2026-09-22, Samet'in kararı). Önce `ui/flow` içindeydi
 * (şablonlar maskotu kendisi çiziyordu), sonra iki sayı olarak buraya taşındı
 * (sonuç bandı 80, durum ekranı 96); tur içindeki bütün yüzeyler kalkınca
 * geriye kutu kaldı. Web ikizi `components/mascot`.
 */
export const MASCOT_CARD = 96;

export function Mascot({
  mood = "idle",
  size = 88,
}: {
  mood?: Mood;
  size?: number;
}) {
  return (
    <View style={{ width: size, height: size * 1.5, alignItems: "center", justifyContent: "flex-end" }}>
      <Image
        source={CLIP[mood] ?? CLIP.idle}
        style={{ width: size, height: size * 1.5 }}
        resizeMode="contain"
        fadeDuration={0}
      />
    </View>
  );
}
