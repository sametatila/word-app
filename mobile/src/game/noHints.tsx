import React, { createContext, useContext } from "react";

/**
 * "İpucu yok" bağlamı — web `components/games/no-hints` ile aynı.
 *
 * Oyunlar hem alıştırma turunda hem sınavda aynı bileşenler; farkları
 * öğrenciye tanınan yardım. Alıştırmada ipucu doğru şey: tıkanmayı açıyor ve
 * bedeli SRS kalitesinden düşüyor. Sınavda ise kâğıdın kuralı "ipucu yok" —
 * web sınav kâğıdında düğmeyi kaldırıyordu, Android'de duruyordu. Yani aynı
 * kâğıt iki platformda iki farklı zorluktaydı ve Android puanı web puanıyla
 * karşılaştırılamıyordu.
 *
 * Bayrağı bütün turlara ayrı ayrı geçirmek yerine bağlam: ipucu düğmesi olan
 * dört tur bunu okuyor, kalanları hiç bilmiyor ve varsayılan (false) her
 * çağrı yerinde bugünkü davranışı koruyor.
 */
const NoHintsContext = createContext(false);

export function NoHints({ children }: { children: React.ReactNode }) {
  return <NoHintsContext.Provider value={true}>{children}</NoHintsContext.Provider>;
}

export function useNoHints(): boolean {
  return useContext(NoHintsContext);
}
