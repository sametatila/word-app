import { useEffect, useState } from "react";

/**
 * "Sayılar değişti" sinyali — web `lernomi:stats` olayının mobil karşılığı.
 *
 * WEBDE VARDI, MOBİLDE HİÇ YOKTU. Web bu olayı altı yerden yayınlıyor (tur
 * özeti, beceri alıştırması, yürüyüş, ders, patron, görev kartı) ve üç yerde
 * dinliyor: başlıktaki XP/seri, rozet açılış tetikleyicisi ve başlangıç
 * ekranının önbelleği (`lib/use-cached`). Mobilde `useMe` bir kez çekiyor ve
 * geçersizleme yolu YOK - üstelik `AppHeader`ı taşıyan üç ekran SEKME, yani
 * hiç yeniden kurulmuyor.
 *
 * Sonucu: kullanıcı uygulamayı açıyor (seri 5, XP 1200), bir tur bitirip kırk
 * XP kazanıyor, Öğren sekmesine dönüyor - başlık hâlâ 1200 diyor. Sayı ancak
 * uygulama yeniden başlatılınca düzeliyordu.
 *
 * `window` yok, o yüzden modül düzeyinde küçük bir abone listesi. Sinyal
 * DEĞER TAŞIMIYOR: web başlığı olayın içindeki `{xp, streak}` ile yamalıyor,
 * burada `useMe` yeniden çekiyor - bir istek, ama `mastered`, `dueCount`,
 * `reviewsToday` gibi öteki alanlar da tazeleniyor. Tur sonunda tek istek,
 * karşılığında bütünüyle doğru bir özet.
 */
let seq = 0;
const listeners = new Set<(n: number) => void>();

/** Sayıları değiştiren her iş bitince çağrılır. */
export function bumpStats(): void {
  seq += 1;
  for (const fn of listeners) fn(seq);
}

/** Sinyal sayacı — etkilerin bağımlılığına konur. */
export function useStatsBump(): number {
  const [n, setN] = useState(seq);
  useEffect(() => {
    listeners.add(setN);
    return () => { listeners.delete(setN); };
  }, []);
  return n;
}
