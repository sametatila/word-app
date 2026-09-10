/**
 * Can-do ifadelerinin ALMANCASINI paketler: `node data/lessons/cando-de/make.mjs`
 *
 * ÇÖZÜCÜ GÖSTERDİ — kardeşiyle aynı biçimde. Almanca eksenin dört hattı
 * (ders düzyazısı, beceri düz metni, görev metni, deneme kâğıdı) bittikten
 * sonra `check:native-de` yeşil döndü, ama o kapı yalnız ÇÖZÜCÜLERİ
 * çalıştırıyor. Ders sayfasının altındaki "bunu yapabileceksin" köprüsü
 * çözücüden geçmiyor: `nativeCando` sözlüğün AYRI bir alanına bakıyor ve
 * o alan Almanca tarafta hiç yoktu — anadili Almanca olan kullanıcı
 * dersin altında Türkçe bir liste görecekti.
 *
 * Kaynak yine `src/lib/cando.ts` ve çıkarıcı kardeşinden alınıyor: iki
 * kopya ayrışırsa biri 131 ifadeyi, öteki 130'unu görür ve fark sessiz
 * kalır. Anahtar `id` (`A1.SPK.1`).
 *
 * BİRİNCİ TEKİL, kardeşiyle aynı gerekçeyle. Kaynak "…yapabilirim" diyor;
 * Almancası "Ich kann …" olmak zorunda. Üçüncü tekile ("Der Lernende
 * kann…") kayan bir çeviri Yapabildiklerim ekranını öğrencinin kendi
 * cümlesi olmaktan çıkarıp yeterlik listesine dönüştürür.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { extractCando } from "../cando/make.mjs";

const DIR = new URL(".", import.meta.url).pathname;

if (import.meta.url === `file://${process.argv[1]}`) {
  const rows = extractCando();
  mkdirSync(`${DIR}in`, { recursive: true });
  mkdirSync(`${DIR}out`, { recursive: true });
  const SIZE = 70;
  let n = 0;
  for (let i = 0; i < rows.length; i += SIZE) {
    n++;
    const name = `c-${String(n).padStart(3, "0")}`;
    writeFileSync(
      `${DIR}in/${name}.json`,
      `${JSON.stringify({ packet: name, words: rows.slice(i, i + SIZE) }, null, 1)}\n`,
    );
  }
  const byLevel = rows.reduce((a, r) => ((a[r.level] = (a[r.level] ?? 0) + 1), a), {});
  console.log(
    `${rows.length} ifade · ${n} paket\n` +
      Object.entries(byLevel).map(([k, v]) => `${k} ${v}`).join(" · "),
  );
}
