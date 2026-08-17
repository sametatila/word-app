/**
 * Günün turunun puanlaması — istemci ve sunucu aynı formülü kullanır.
 *
 * Ayrı dosyada çünkü `lib/daily.ts` sunucuya kilitli (veritabanı erişimi var)
 * ama puanı oyun sırasında ekranda gösteren taraf istemci. İki kopya formül,
 * ekranda görünen puanla tabloya yazılanın ayrışması demekti.
 */

/** Doğru cevabın taban puanı; hız bonusu bunun üstüne biner. */
const BASE_POINTS = 100;
/** Bu sürenin altındaki cevap tam hız bonusu alır. */
const FAST_MS = 2000;
/** Bu sürenin üstünde hız bonusu kalmaz. */
const SLOW_MS = 8000;
const MAX_SPEED_BONUS = 50;
/** Seri çarpanının tavanı — puan kelime bilgisinden gelmeli, seriden değil. */
const MAX_STREAK_MULTIPLIER = 1.5;

/** Soru başına kazanılabilecek en yüksek puan; sunucu tavanı bundan çıkar. */
export const MAX_POINTS_PER_ROUND = Math.round(
  (BASE_POINTS + MAX_SPEED_BONUS) * MAX_STREAK_MULTIPLIER,
);

/**
 * Bir cevabın puanı.
 *
 * Süre baskısı yok — günde tek hakkı olan bir turda geri sayım, öğrenciyi
 * ölçmek yerine telaşını ölçerdi. Hız yine de ödüllendiriliyor: bilerek hızlı
 * cevap veren ile şıklara bakıp tahmin eden arasındaki farkı ancak bu ayırıyor.
 */
export function scoreAnswer(correct: boolean, latencyMs: number, combo: number): number {
  if (!correct) return 0;
  const span = SLOW_MS - FAST_MS;
  const over = Math.max(0, Math.min(span, latencyMs - FAST_MS));
  const speed = Math.round(MAX_SPEED_BONUS * (1 - over / span));
  const streak = combo >= 3 ? Math.min(MAX_STREAK_MULTIPLIER, 1 + (combo - 2) * 0.1) : 1;
  return Math.round((BASE_POINTS + speed) * streak);
}
