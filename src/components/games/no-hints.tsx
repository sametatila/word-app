"use client";

import { createContext, useContext } from "react";

/**
 * "İpucu yok" bağlamı.
 *
 * Oyunlar hem alıştırma turunda hem sınavda aynı bileşenler; farkları
 * öğrenciye tanınan yardım. Alıştırmada ipucu doğru şey: tıkanmayı açıyor ve
 * bedeli SRS kalitesinden düşüyor. Sınavda ise kâğıdın kuralı "ipucu yok" —
 * kapak bunu yazıyor ve düğmenin orada durması sözü bozardı.
 *
 * Bayrağı `GameSwitch`in bütün oyunlarına ayrı ayrı geçirmek yerine bağlam:
 * ipucu düğmesi olan dört oyun bunu okuyor, kalanları hiç bilmiyor ve
 * varsayılan (false) her çağrı yerinde bugünkü davranışı koruyor.
 */
const NoHintsContext = createContext(false);

export function NoHints({ children }: { children: React.ReactNode }) {
  return <NoHintsContext.Provider value={true}>{children}</NoHintsContext.Provider>;
}

export function useNoHints(): boolean {
  return useContext(NoHintsContext);
}
