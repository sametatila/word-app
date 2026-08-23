/**
 * Tohumlu karıştırma.
 *
 * `Math.random()` ile karıştıran bir liste, **render sırasında** üretildiğinde
 * hydration hatası veriyor: sunucu bir sıra üretiyor, tarayıcı başka bir sıra
 * ve React ağacı yeniden kuruyor. Harf bulmacasında ve cümle kurma görevinde
 * tam olarak bu oluyordu.
 *
 * İki bariz çözümün ikisi de kötü:
 *
 *   - Karıştırmayı `useEffect`e almak. O zaman sunucu KARIŞMAMIŞ hâli
 *     çiziyor, yani cevabın kendisi bir kare boyunca ekranda duruyor. Bir
 *     bulmacanın çözümünü göstermek, hydration hatasından beter.
 *   - Bileşeni bağlanana kadar hiç çizmemek. Bu da ekranda zıplama ve boş
 *     kare demek.
 *
 *   Üçüncü yol: sırayı RASTGELE değil TOHUMLU üretmek. Aynı tohum her yerde
 *   aynı sırayı veriyor — sunucuda da tarayıcıda da — yani ortada uyuşmazlık
 *   kalmıyor. Tohum tur kimliğinden geldiği için farklı turlarda farklı
 *   diziliş çıkıyor; aynı turda ise bileşen yeniden çizilse de diziliş
 *   değişmiyor, yani bulmaca kullanıcının parmağının altında karışmıyor.
 *
 * Üreteç `lib/quests.ts` içindeki günlük görev seçicisiyle aynı: FNV-1a
 * karması + mulberry32. Aynı kalıbı ikinci kez yazmak yerine burada tek bir
 * yerde duruyor ve iki taraf da buradan okuyabilir.
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

/**
 * Fisher–Yates, ama rastgelelik tohumdan.
 *
 * @param arr  karıştırılacak dizi (değiştirilmez)
 * @param seed aynı tohum → aynı sıra. Turun kimliği gibi hem kararlı hem de
 *             turdan tura değişen bir şey verilmeli; sabit bir metin verilirse
 *             diziliş sonsuza dek aynı kalır.
 */
export function seededShuffle<T>(arr: T[], seed: string): T[] {
  const a = [...arr];
  const rand = rng(seedOf(seed));
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
