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
 *
 * Sorunun İngilizce ikinci satırı da (anadil Türkçe/Almancayken ayırt edici) sınavda
 * çizilmiyor: Almanca yazdıran maddede İngilizce karşılık ipucu (QA F-0064).
 */
const NoHintsContext = createContext(false);

export function NoHints({ children }: { children: React.ReactNode }) {
  return <NoHintsContext.Provider value={true}>{children}</NoHintsContext.Provider>;
}

export function useNoHints(): boolean {
  return useContext(NoHintsContext);
}

/**
 * "Cevap sınav sonunda" bağlamı — mobil `game/noHints` `BlindAnswers` ile aynı.
 *
 * Sınav kapağı "cevaplar sınav bitince açılır" diyor; kelime bölümü ise
 * alıştırmanın oyunlarını kullandığı için "Kontrol et"ten sonra doğru cevabı,
 * anlamı ve gerekçeyi hemen gösteriyordu (QA F-0017). Bağlam açıkken oyun
 * cevabı alıp HÜKÜM GÖSTERMEDEN sıradakine geçiyor: ses, titreşim, renk ve
 * sonuç katmanı yok; kaçan madde sonuç ekranının dökümünde.
 */
const BlindContext = createContext(false);

export function BlindAnswers({ children }: { children: React.ReactNode }) {
  return <BlindContext.Provider value={true}>{children}</BlindContext.Provider>;
}

export function useBlindAnswers(): boolean {
  return useContext(BlindContext);
}
