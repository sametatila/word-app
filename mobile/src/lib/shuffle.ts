/**
 * Tohumlu karıştırma — web `src/lib/shuffle.ts` ile AYNI algoritma.
 *
 * Cümle kurma görevinde parçaların dizilişi bundan geliyor: aynı tohum → aynı
 * sıra, yani ekran yeniden çizilince parçalar yerinden oynamıyor. Gövde
 * webinkiyle birebir (`check:parity` "tohumlu karistirma").
 */

/** Metinden 32 bitlik tohum — FNV-1a. */
function seedOf(key: string): number {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** mulberry32 — küçük, hızlı ve tohumu verilince her yerde aynı diziyi üretir. */
function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Fisher–Yates, ama rastgelelik tohumdan. */
export function seededShuffle<T>(arr: T[], seed: string): T[] {
  const a = [...arr];
  const rand = rng(seedOf(seed));
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
