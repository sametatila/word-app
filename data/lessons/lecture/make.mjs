/**
 * Anlatım metnini paketler: `node data/lessons/lecture/make.mjs`
 *
 * PLAN BU KALEMİ İKİ KAT BÜYÜK SAYIYORDU. 17.369 rakamı doğru ama o
 * `tr()` ÇAĞRISI sayısı, çevrilecek DİZE sayısı değil:
 *
 *   tr() çağrısı            17.369
 *     düz dizeli            17.293  → BENZERSİZ 8.788 (%50,8)
 *     şablon (`${…}`)          76  → kod, ayrı iş
 *
 * Dahası tekrarlar birkaç kalıpta toplanmış: 287 dize tek başına 8.792
 * parçayı (%51) karşılıyor — 2.116x "deyin.", 1.797x "Tekrar dene.".
 * Bu yüzden paketler SIKLIĞA GÖRE sıralanıyor: ilk paket anlatımın
 * yarısını kapatıyor. Ders sırasına göre paketlemek aynı işi elli pakete
 * yayardı.
 *
 * BAĞLAM ADIMIN TAMAMI. Kısa parçalar tek başına çevrilemez:
 *
 *   "süreç;"  → [Die Tür wird geöffnet.] «süreç;» [Die Tür ist geöffnet.]
 *   "dişilse" → [zum] «dişilse» [zur]
 *
 * Cümle Almanca örneklerin ARASINDAN geçiyor; anlam ancak adımın
 * bütününde görünüyor. Komşu iki `de()` yetmedi.
 *
 * ŞABLONLAR AYRI: 38 dosya bir `word()` yardımcısı tanımlıyor ve 3.040 kez
 * çağırıyor; her çağrı 3 parça üretiyor → 9.120 parça daha. Çevirisi
 * 9.120 dize DEĞİL: 8 sıra sözcüğü (İlk … Son) artı iki şablon. Ama
 * `w.en` alanı yok — kod fazı, bu hattın işi değil.
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";

const SRC = new URL("../../../src/lib/lessons/content/", import.meta.url).pathname;
const DIR = new URL(".", import.meta.url).pathname;

export function extractLecture() {
  /** dize → { n, lessons:Set, ctx:Set<adımın tamamı>, de:Set<Almanca> } */
  const rows = new Map();
  for (const f of readdirSync(SRC).filter((x) => /^de-.*\.ts$/.test(x)).sort()) {
    const src = readFileSync(`${SRC}${f}`, "utf8");
    // Konum sırası: `id` bir dersi açar, sonraki bloklar ona aittir.
    // ÜÇ dizi var, hepsi parça taşıyor: `say` (7.408), `hint` (443),
    // `why` (220). Yalnız `say` taransaydı 268 dize / 315 parça sessizce
    // düşerdi — `why` doğru-yanlış cevabından sonraki açıklama.
    let lesson = null;
    for (const m of src.matchAll(/id:\s*"(de-[^"]+)"|(?:say|hint|why):\s*\[([\s\S]*?)\n\s*\]/g)) {
      if (m[1] !== undefined) {
        lesson = m[1];
        continue;
      }
      const step = [];
      for (const q of m[2].matchAll(/\b(tr|de)\(\s*"((?:[^"\\]|\\.)*)"\s*[,)]/g))
        step.push({ kind: q[1], s: JSON.parse(`"${q[2]}"`) });
      for (let i = 0; i < step.length; i++) {
        if (step[i].kind !== "tr") continue;
        const t = step[i].s;
        const r = rows.get(t) ?? { tr: t, n: 0, lessons: new Set(), ctx: new Set(), de: new Set() };
        r.n++;
        if (lesson) r.lessons.add(lesson);
        r.ctx.add(
          step.map((x, j) => (j === i ? `«${x.s}»` : x.kind === "de" ? `[${x.s}]` : x.s)).join(" "),
        );
        // YALNIZ ÖNCEKİ Almanca parça. Sözlük istemi ("Türkçesi … demek")
        // kendinden ÖNCE gelen kelimeyi tanımlıyor; adımdaki bütün Almancayı
        // toplamak aynı dizeyi üç kez sordurmuştu ("Danach", "Danach trinke
        // ich Tee", "Danach trinke ich Tee." → üç ayrı satır, tek kelime).
        if (step[i - 1]?.kind === "de") r.de.add(step[i - 1].s);
        rows.set(t, r);
      }
    }
  }

  /*
    SÖZLÜK İSTEMLERİ BÖLÜNÜYOR. "Türkçesi 'yüz' demek" dizesi `hundert`
    için de `das Gesicht` için de kullanılıyor — Türkçe kurtuluyor çünkü
    'yüz' de çok anlamlı. İngilizcede 'a hundred' ile 'face' aynı sözcük
    DEĞİL, yani tek karşılık ikisini birden veremez.

    Ölçüldü: 8.788 dizenin 63'ü birden çok Almanca kelimeyle eşleşiyor,
    33'ü sözlük istemi. Yalnız onlar bölünüyor; "deyin." gibi bağlamsız
    dizeler bölünmüyor.
  */
  const out = [];
  for (const r of rows.values()) {
    const isGloss = /demek(\.| —|$)/.test(r.tr);
    const words = [...r.de].sort();
    if (isGloss && words.length > 1) {
      for (const de of words)
        out.push({ tr: r.tr, de, n: 1, ctx: [], lessons: [...r.lessons].slice(0, 3) });
    } else {
      out.push({
        tr: r.tr,
        n: r.n,
        ctx: [...r.ctx].slice(0, 3),
        lessons: [...r.lessons].slice(0, 3),
      });
    }
  }
  // Sıklık azalan; eşitlikte kısa önce, sonra alfabetik — sıra KARARLI
  // olmalı, yoksa paketler her `make`te kayar ve yazılanlar tutmaz.
  return out.sort(
    (a, b) =>
      b.n - a.n ||
      a.tr.length - b.tr.length ||
      a.tr.localeCompare(b.tr, "tr") ||
      (a.de ?? "").localeCompare(b.de ?? "", "de"),
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const rows = extractLecture();
  mkdirSync(`${DIR}in`, { recursive: true });
  mkdirSync(`${DIR}out`, { recursive: true });
  const SIZE = 150;
  let n = 0;
  for (let i = 0; i < rows.length; i += SIZE) {
    n++;
    const name = `l-${String(n).padStart(3, "0")}`;
    writeFileSync(
      `${DIR}in/${name}.json`,
      `${JSON.stringify({ packet: name, words: rows.slice(i, i + SIZE) }, null, 1)}\n`,
    );
  }
  const total = rows.reduce((a, r) => a + r.n, 0);
  const first = rows.slice(0, SIZE).reduce((a, r) => a + r.n, 0);
  console.log(
    `${rows.length} benzersiz dize · ${total} parça · ${n} paket\n` +
      `ilk paket ${first} parçayı kapatıyor (%${((first / total) * 100).toFixed(1)})`,
  );
}
