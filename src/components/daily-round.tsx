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

/**
 * Günlük turun kökü — yalnız `components/session-player` kuruyor.
 *
 * `value` NEDEN VAR (2026-09-22). Kök tek ama oraya giden yol tek değil:
 * `/learn/game` adresi hem günlük turu hem de Pratik ekranından, zayıf nokta
 * kartından ve günlük plandan gelen HEDEFLİ çalışmayı (`?game=…`) açıyor.
 * Sağlayıcı koşulsuz `true` verdiği sürece Erdi o üç yolda da oynuyordu —
 * kullanıcının gördüğü "kelimeleri çalış yaptığımda her yerde maskot var"
 * tam olarak buydu. Tur = KARIŞIK tur; tek oyuna kilitli oturum tur değil.
 */
export function DailyRound({ children, value = true }: { children: ReactNode; value?: boolean }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** Bu ağaç günlük tur mu? Erdi'yi çizen her şey buna bakıyor. */
export function useDailyRound(): boolean {
  return useContext(Ctx);
}
