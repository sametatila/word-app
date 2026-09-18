"use client";

import { createContext, useContext, type ReactNode } from "react";

/**
 * GÜNLÜK TUR SINIRI — Erdi'nin çizilebildiği tek ağaç.
 *
 * Animasyon 2026-09-18'den beri yalnız Öğren sekmesinin günlük turunda
 * (bkz. `components/mascot` dosya başı). Ama tur bileşenleri paylaşımlı:
 * `games/*` dokuz yerden çağrılıyor — günlük tur, patron turu, meydan okuma,
 * seviye sınavı, yürüyüş modu, seviye tespiti denemesi, beceri quizi, kelime
 * listesi ve demo sayfası. Yani "maskotu yalnız `session-player`da çağır"
 * demek yetmiyordu; `GameShell` ve `RoundSheet` içindeki Erdi sekiz yüzeyde
 * daha oynuyordu ve dosya düzeyinde bakan bir kapı bunu göremez.
 *
 * Bu yüzden sınır DOSYA değil AĞAÇ: yalnız günlük tur bu sağlayıcıyı kuruyor,
 * `Mascot` dışında hiçbir şey çizmiyor. Android karşılığı
 * `mobile/src/game/dailyRound.tsx`.
 */
const Ctx = createContext(false);

/** Günlük turun kökü — yalnız `components/session-player` kuruyor. */
export function DailyRound({ children }: { children: ReactNode }) {
  return <Ctx.Provider value={true}>{children}</Ctx.Provider>;
}

/** Bu ağaç günlük tur mu? Erdi'yi çizen her şey buna bakıyor. */
export function useDailyRound(): boolean {
  return useContext(Ctx);
}
