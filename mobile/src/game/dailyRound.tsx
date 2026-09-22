import React, { createContext, useContext } from "react";

/**
 * GÜNLÜK TUR SINIRI — Erdi'nin çizilebildiği tek ağaç.
 *
 * Animasyon 2026-09-18'den beri yalnız Öğren sekmesinin günlük turunda
 * (bkz. `ui/Mascot` dosya başı). Ama tur KARTLARI paylaşımlı: `RoundView`
 * dört ekrandan çağrılıyor — günlük tur, patron turu, meydan okuma ve seviye
 * sınavı. Yani "maskotu yalnız `GameScreen`de çağır" demek yetmiyordu; kartın
 * içindeki Erdi üç ekranda daha oynuyordu ve dosya düzeyinde bakan bir kapı
 * bunu göremez.
 *
 * Bu yüzden sınır DOSYA değil AĞAÇ: yalnız günlük tur bu sağlayıcıyı kuruyor,
 * `Mascot` dışında hiçbir şey çizmiyor. Kural koda gömülü, yoruma değil —
 * yeni bir ekran `RoundView` çağırdığında maskot kendiliğinden gelmiyor.
 */
const Ctx = createContext(false);

/**
 * Günlük turun kökü — yalnız `screens/GameScreen` kuruyor.
 *
 * `value` NEDEN VAR (2026-09-22). Kök tek ama oraya giden yol tek değil:
 * `Game` ekranı hem günlük turdan (`LearnScreen`) hem de Pratik ekranından ve
 * zayıf nokta kartından açılıyor; ikincisi `game` parametresiyle tek oyuna
 * kilitli HEDEFLİ çalışma. Sağlayıcı koşulsuz `true` verdiği sürece Erdi orada
 * da oynuyordu. Tur = KARIŞIK tur; kilitli oturum tur değil (web ikizi
 * `components/daily-round`).
 */
export function DailyRound({ children, value = true }: { children: React.ReactNode; value?: boolean }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** Bu ağaç günlük tur mu? Erdi'yi çizen her şey buna bakıyor. */
export function useDailyRound(): boolean {
  return useContext(Ctx);
}
