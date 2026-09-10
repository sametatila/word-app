/**
 * Anlatım metnini paketler: `node data/lessons/lecture/make.mjs`
 *
 * PLAN BU KALEMİ ÜÇ KAT BÜYÜK SAYIYORDU. 17.369 rakamı doğru ama o
 * `tr()` ÇAĞRISI sayısı, çevrilecek DİZE sayısı değil. Sayıldı:
 *
 *   tr() çağrısı            17.369
 *     düz dizeli            17.293  → BENZERSİZ 8.788  (%50,8)
 *     şablon (`${…}`)          76  → kod, ayrı iş
 *
 * Yani her iki parçadan biri tekrar. Dahası tekrarlar birkaç kalıpta
 * toplanmış: 287 dize tek başına 8.792 parçayı (%51) karşılıyor.
 *
 *   2.116x "deyin."          347x "Tekrar edin:"     326x "Örnek:"
 *   1.797x "Tekrar dene."    345x "cümlesi doğru mu?"
 *     369x "Lütfen"          341x "Doğru mu yanlış mı:"
 *
 * Bu yüzden paketler SIKLIĞA GÖRE sıralanıyor: ilk iki paket bütün
 * anlatımın yarısını kapatıyor. Alfabetik ya da ders sırasına göre
 * paketlemek aynı işi elli pakete yayardı.
 *
 * ŞABLONLAR AYRI: 38 dosya bir `word()` yardımcısı tanımlıyor ve onu
 * 3.040 kez çağırıyor; her çağrı 3 `tr()` parçası üretiyor, yani çalışma
 * anında 9.120 parça daha. Bunların çevirisi 9.120 dize DEĞİL: iki şablon
 * (`${n} kelimemiz:`, `Türkçesi '${w.tr}' demek…`) ve `n` argümanı olarak
 * geçen 8 sıra sözcüğü (İlk … Son, her biri 380 kez). Yardımcının
 * İngilizce dalı ve `w.en` alanı gerekiyor — kod fazı, bu hattın işi değil.
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";

const SRC = new URL("../../../src/lib/lessons/content/", import.meta.url).pathname;
const DIR = new URL(".", import.meta.url).pathname;

export function extractLecture() {
  /** dize → { n: kaç kez, lessons: Set<ders>, ctx: Set<"önceki ▸ sonraki"> } */
  const rows = new Map();
  for (const f of readdirSync(SRC).filter((x) => /^de-.*\.ts$/.test(x)).sort()) {
    const src = readFileSync(`${SRC}${f}`, "utf8");
    // Konum sırası: `id` bir dersi açar, sonraki parçalar ona aittir.
    // `de()` parçaları da toplanıyor çünkü BAĞLAM onlarda: "Türkçesi 'yüz'
    // demek" dizesi tek başına çevrilemez — Almanca kelime `Gesicht` mi
    // `hundert` mi bilinmeden hangi anlam olduğu belli olmaz.
    let lesson = null;
    const seq = []; // [{ kind: "tr"|"de", s }]
    for (const m of src.matchAll(
      /id:\s*"(de-[^"]+)"|\b(tr|de)\(\s*"((?:[^"\\]|\\.)*)"\s*[,)]/g,
    )) {
      if (m[1] !== undefined) {
        lesson = m[1];
        continue;
      }
      seq.push({ kind: m[2], s: JSON.parse(`"${m[3]}"`), lesson });
    }
    for (let i = 0; i < seq.length; i++) {
      if (seq[i].kind !== "tr") continue;
      const s = seq[i].s;
      const r = rows.get(s) ?? { tr: s, n: 0, lessons: new Set(), ctx: new Set() };
      r.n++;
      if (seq[i].lesson) r.lessons.add(seq[i].lesson);
      const prev = seq[i - 1]?.kind === "de" ? seq[i - 1].s : "";
      const next = seq[i + 1]?.kind === "de" ? seq[i + 1].s : "";
      if (prev || next) r.ctx.add(`${prev} ▸ ${next}`);
      rows.set(s, r);
    }
  }
  /*
    SÖZLÜK İSTEMLERİ BÖLÜNÜYOR. "Türkçesi 'yüz' demek" dizesi `hundert` için
    de `das Gesicht` için de kullanılıyor — Türkçe kurtuluyor çünkü 'yüz' de
    çok anlamlı. İngilizcede 'a hundred' ile 'face' aynı sözcük DEĞİL, yani
    tek bir İngilizce karşılık ikisini birden veremez.

    Ölçüldü: 8.788 dizenin 63'ü birden çok Almanca kelimeyle eşleşiyor,
    33'ü sözlük istemi. Yalnız onlar Almanca kelimeye göre ayrı satıra
    bölünüyor; "deyin." gibi bağlamsız dizeler bölünmüyor (yüzlerce
    kelimeyle eşleşiyorlar ve çevirileri bağlamdan bağımsız).
  */
  const out = [];
  for (const r of rows.values()) {
    const words = [...new Set([...r.ctx].map((c) => c.split(" ▸ ")[0]).filter(Boolean))];
    const isGloss = /demek(\.| —|$)/.test(r.tr);
    if (isGloss && words.length > 1) {
      for (const de of words.sort()) out.push({ tr: r.tr, de, n: 1, ctx: [], lessons: [...r.lessons].slice(0, 3) });
    } else {
      out.push({ tr: r.tr, n: r.n, ctx: [...r.ctx].slice(0, 4), lessons: [...r.lessons].slice(0, 3) });
    }
  }
  // Sıklık azalan; eşitlikte kısa önce, sonra alfabetik — sıra kararlı olmalı,
  // yoksa paketler her `make` çalıştığında kayar ve yazılanlar tutmaz.
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
  const first2 = rows.slice(0, SIZE * 2).reduce((a, r) => a + r.n, 0);
  console.log(
    `${rows.length} benzersiz dize · ${total} parça · ${n} paket\n` +
      `ilk iki paket ${first2} parçayı kapatıyor (%${((first2 / total) * 100).toFixed(1)})`,
  );
}
