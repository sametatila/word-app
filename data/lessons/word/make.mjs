/**
 * `word()` şablonunu paketler: `node data/lessons/word/make.mjs`
 *
 * ŞABLON, ANLATIM HATTININ GÖREMEDİĞİ YER. `lecture/make.mjs` yalnız DÜZ
 * dizeli `tr()` çağrılarını tarıyor; 38 dosyanın tanımladığı `word()`
 * yardımcısı ise metni şablonla kuruyor:
 *
 *   tr(`${n} kelimemiz:`)  ·  tr(`'${w.tr}' demek.${note ? ` ${note}` : ""} Lütfen`)
 *
 * Çalışma anında 3.040 çağrı × 3 parça = 9.120 parça üretiyor ama YAZILACAK
 * dize sayısı o değil. Ölçüldü:
 *
 *   w.en  →  3.040/3.040 hazır   (`data/lessons/vocab/`, anahtar: lesson+de)
 *   sıra sözcüğü  →  8           (İlk … Son, her biri 380x)
 *   şablon çerçevesi  →  2       (iki dosya ailesi iki ayrı metin yazmış)
 *   NOT  →  183 benzersiz        (193 çağrı; hiçbiri anlatım out/'ta yok)
 *
 * Yani kalan yazı işi 9.120 değil 193 dize. Notlar kısa (15–64 karakter)
 * ama gerçek öğretim içeriği: "hep çoğul kullanılır", "işveren yapar;
 * çalışanın kendi ayrılması bu değil". Düşerlerse ders sessizce eksilir.
 *
 * BAĞLAM ADIMIN TAMAMI, anlatım hattındaki gibi. Not tek başına
 * çevrilemez — "kadın biçimi -in ekiyle kurulur" hangi kelime için
 * söylendiği bilinmeden yazılamaz.
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";

const SRC = new URL("../../../src/lib/lessons/content/", import.meta.url).pathname;
const DIR = new URL(".", import.meta.url).pathname;

/** Sıra sözcükleri — `word()` çağrısının ilk argümanı, kaynakta sabit sekiz. */
export const ORDINALS = ["İlk", "İkinci", "Üçüncü", "Dördüncü", "Beşinci", "Altıncı", "Yedinci", "Son"];

export function extractWord() {
  /** çağrılar: { lesson, n, de, tr, note } */
  const calls = [];
  for (const f of readdirSync(SRC).filter((x) => /^de-.*\.ts$/.test(x)).sort()) {
    const src = readFileSync(`${SRC}${f}`, "utf8");
    // Konum sırası: `id` bir dersi açar, sonraki `word()` çağrıları ona ait.
    const re =
      /id:\s*"(de-[^"]+)"|word\(\s*"([^"]*)"\s*,\s*\{\s*de:\s*"((?:[^"\\]|\\.)*)"\s*,\s*tr:\s*"((?:[^"\\]|\\.)*)"\s*\}\s*(?:,\s*"((?:[^"\\]|\\.)*)")?/g;
    let lesson = null;
    for (const m of src.matchAll(re)) {
      if (m[1] !== undefined) {
        lesson = m[1];
        continue;
      }
      calls.push({
        lesson,
        n: m[2],
        de: JSON.parse(`"${m[3]}"`),
        tr: JSON.parse(`"${m[4]}"`),
        note: m[5] === undefined ? null : JSON.parse(`"${m[5]}"`),
      });
    }
  }

  /*
    NOT AYNI OLABİLİR, KELİMESİ FARKLI. "hep çoğul kullanılır" birden çok
    kelimede geçiyor ve İngilizcesi de aynı olmalı — o yüzden anahtar NOT,
    kelime değil. Bağlam olarak en çok üç kullanım gösteriliyor.
  */
  const notes = new Map();
  for (const c of calls) {
    if (!c.note) continue;
    const r = notes.get(c.note) ?? { tr: c.note, kind: "note", n: 0, ctx: [], lessons: [] };
    r.n++;
    if (r.ctx.length < 3) r.ctx.push(`[${c.de}] '${c.tr}' demek. «${c.note}»`);
    if (r.lessons.length < 3) r.lessons.push(c.lesson);
    notes.set(c.note, r);
  }

  const ord = new Map();
  for (const c of calls) {
    const t = `${c.n} kelimemiz:`;
    const r = ord.get(t) ?? { tr: t, kind: "ordinal", n: 0, ctx: [], lessons: [] };
    r.n++;
    if (r.ctx.length < 1) r.ctx.push(`«${t}» [${c.de}]`);
    ord.set(t, r);
  }

  /*
    İKİ ÇERÇEVE. 28 dosya "'X' demek. Lütfen" yazmış, 10 dosya "Türkçesi 'X'
    demek. Lütfen". Fark yalnız üslup; İngilizcesi de iki ayrı dize olmak
    zorunda değil ama kaynağı iki tuttuğu için ikisi de soruluyor.
    Yer tutucu `{}` — karşılık yazılırken olduğu gibi korunuyor.
  */
  const frames = [
    { tr: "'{}' demek.{not} Lütfen", kind: "frame", n: 28, ctx: ["28 dosya (B1 b03–b10, B2, C1)"], lessons: [] },
    { tr: "Türkçesi '{}' demek{ — not}. Lütfen", kind: "frame", n: 10, ctx: ["10 dosya (B1 b01–b02, b11–b18)"], lessons: [] },
  ];

  // Sıra KARARLI: önce çerçeveler, sonra sıra sözcükleri, sonra notlar
  // (sıklık azalan, eşitlikte alfabetik). `make` her çalıştığında aynı.
  return [
    ...frames,
    ...[...ord.values()].sort((a, b) => b.n - a.n || a.tr.localeCompare(b.tr, "tr")),
    ...[...notes.values()].sort((a, b) => b.n - a.n || a.tr.localeCompare(b.tr, "tr")),
  ];
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const rows = extractWord();
  mkdirSync(`${DIR}in`, { recursive: true });
  mkdirSync(`${DIR}out`, { recursive: true });
  const SIZE = 100;
  let n = 0;
  for (let i = 0; i < rows.length; i += SIZE) {
    n++;
    const name = `w-${String(n).padStart(3, "0")}`;
    writeFileSync(
      `${DIR}in/${name}.json`,
      `${JSON.stringify({ packet: name, words: rows.slice(i, i + SIZE) }, null, 1)}\n`,
    );
  }
  const kinds = rows.reduce((a, r) => ((a[r.kind] = (a[r.kind] ?? 0) + 1), a), {});
  console.log(
    `${rows.length} dize · ${n} paket\n` +
      Object.entries(kinds).map(([k, v]) => `${k} ${v}`).join(" · "),
  );
}
