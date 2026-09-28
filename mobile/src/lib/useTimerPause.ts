import { useCallback, useRef } from "react";

/**
 * Süreli turu (meydan okuma, patron) bir sayfa açıkken DURDURAN saat.
 *
 * Sonuç katmanındaki "Bildir" sayfası açıkken geri sayım akıyordu: içerikteki
 * hatayı bildiren öğrenci süresini kaybediyordu. Sayaç bir zaman damgasından
 * (`deadline`) okunduğu için durdurmak = açık kalınan süreyi kapanışta
 * damgalara eklemek. `shift` o süreyi alıp damgaları ileri kaydırıyor;
 * `paused()` açıkken sayacın tıkını (ve süre bitti kararını) atlatıyor.
 *
 * İç içe açılış tek sayılıyor (ikinci `pause` ilk anı ezmiyor); açılmadan
 * gelen `resume` hiçbir şey yapmıyor.
 */
export function useTimerPause(shift: (ms: number) => void) {
  const pausedAt = useRef<number | null>(null);
  const shiftRef = useRef(shift);
  shiftRef.current = shift;
  const pause = useCallback(() => {
    if (pausedAt.current == null) pausedAt.current = Date.now();
  }, []);
  const resume = useCallback(() => {
    if (pausedAt.current == null) return;
    const ms = Math.max(0, Date.now() - pausedAt.current);
    pausedAt.current = null;
    shiftRef.current(ms);
  }, []);
  const paused = useCallback(() => pausedAt.current != null, []);
  return { pause, resume, paused };
}
