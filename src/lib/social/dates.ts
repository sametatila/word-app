/**
 * Gün aritmetiği — `lib/session.ts`teki `shiftDay`/`weekStart` ile aynı kural
 * (hafta pazartesi başlar). Burada yeniden yazılmasının sebebi döngüsel içe
 * aktarma: session.ts sosyal kancaları çağırıyor, sosyal katman session.ts'i
 * çağırsaydı modül yüklemesi döngüye girerdi. İki kopya da saf fonksiyon ve
 * üç satır; ayrışırsa test yakalar.
 */
export function shiftDay(day: string, delta: number): string {
  const d = new Date(`${day}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + delta);
  return d.toISOString().slice(0, 10);
}

export function weekStart(day: string): string {
  const d = new Date(`${day}T00:00:00Z`);
  const dow = d.getUTCDay();
  return shiftDay(day, -((dow + 6) % 7));
}

/** Sunucu günü (UTC). Sosyal sayaçlar için yeterli; öğrenme günü istemciden gelir. */
export function serverToday(): string {
  return new Date().toISOString().slice(0, 10);
}

export function daysBetween(a: string, b: string): number {
  return Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86_400_000);
}

/** Haftanın kalan günü, bugün dahil (1..7). */
export function daysLeftInWeek(today: string): number {
  return Math.min(7, Math.max(1, 7 - daysBetween(weekStart(today), today)));
}
