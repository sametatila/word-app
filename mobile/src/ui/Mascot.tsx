import React from "react";
import { Image, View } from "react-native";
import { useStageOwner } from "../lib/mascotStage";
import { useDailyRound } from "../game/dailyRound";

/**
 * Erdi (maskot) — animasyonlu WebP klipler. Android'de Fresco animated-webp
 * eklentisiyle oynar. Klipler 2:3 oranında; boy = en × 1.5.
 *
 * ANİMASYON YALNIZ GÜNLÜK TURDA (2026-09-18, Samet'in kararı).
 *
 * Erdi otuzdan fazla yüzeyde oynuyordu: her sonuç bandı, her durum ekranı
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
 * Kapı: `check:parity` "maskot yalnız günlük turda" — hem Erdi'yi çizen dosya
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
 * Erdi boyları — eskiden `ui/flow` içindeydi ve akış şablonları maskotu
 * kendisi çizdiği için oraya aitti. Animasyon yalnız günlük turda kaldığı
 * için ölçüler de buraya, animasyonun yanına taşındı: `ui/flow` artık
 * maskot diye bir şey tanımıyor.
 */
export const MASCOT_BAND = 80;
export const MASCOT_STATE = 96;

export function Mascot({
  mood = "idle",
  size = 88,
  stage,
  pinned = false,
}: {
  mood?: Mood;
  size?: number;
  /**
   * TEK ERDİ KURALI (`lib/mascotStage`). Sahneyi alan gezici sarmalayıcılar
   * (kutlama pop'u, ortam dikizlemesi) kendi kimliğini buraya veriyor; sahne
   * başkasınınken bu örnek görünmez olur. Kutu yerinde kalır, içi boşalır —
   * yoksa düzen zıplar.
   */
  stage?: string;
  /**
   * Tek Erdi kuralından MUAF: sahne başkasınınken de görünür. Cevap şeridinin
   * baş parmağı/üzülmesi için — o, süs değil cevabın kendisi.
   */
  pinned?: boolean;
}) {
  const tur = useDailyRound();
  const owner = useStageOwner();
  /* Günlük turun ağacı dışında Erdi yok — dosya başındaki kural. */
  if (!tur) return null;
  /* Sahne başkasınınsa bu Erdi burada değil (web `mascot.tsx` `away`). */
  const away = !pinned && owner !== null && owner !== stage;
  return (
    <View style={{ width: size, height: size * 1.5, alignItems: "center", justifyContent: "flex-end" }}>
      <Image
        source={CLIP[mood] ?? CLIP.idle}
        style={{ width: size, height: size * 1.5, opacity: away ? 0 : 1 }}
        resizeMode="contain"
        fadeDuration={0}
      />
    </View>
  );
}
