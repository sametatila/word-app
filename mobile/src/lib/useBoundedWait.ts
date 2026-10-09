import { useEffect, useState } from "react";

/**
 * SINIRLI BEKLEME — iskelet sonsuza dek durmasın.
 *
 * Kayma düzeltmelerinde (QA F-0070 sınıfı) bazı listeler ilk açılışta bir
 * sunucu cevabını da bekliyor: cevap gelince araya girecek not ya da kilit,
 * listeyi okunurken itmesin. Ama ağ yavaşken ya da yokken cevap 25 saniyelik
 * zaman aşımına dek gelmeyebilir; cihazdaki liste o sürede iskelette kalmamalı.
 *
 * `pending` doğruyken en çok `ms` kadar doğru döner, sonra yanlış (o `key`
 * için). Anahtar değişince (ör. seviye) süre yeniden başlar. Süre dolduktan
 * sonra gelen cevap yine çizilir; bu yalnız yavaş ağda olur.
 */
export function useBoundedWait(pending: boolean, key: string | null, ms = 1500): boolean {
  const [expired, setExpired] = useState<string | null>(null);
  useEffect(() => {
    if (!pending || key === null) return;
    const id = setTimeout(() => setExpired(key), ms);
    return () => clearTimeout(id);
  }, [pending, key, ms]);
  return pending && expired !== key;
}
