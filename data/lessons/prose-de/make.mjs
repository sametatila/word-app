/**
 * İngilizce kursun derslerindeki TÜRKÇE alanları paketler:
 *   `node data/lessons/prose-de/make.mjs`
 *
 * NEDEN AYRI BİR HAT. `data/lessons/*` altındaki kardeş hatlar ALMANCA
 * kursun derslerinden (TS dosyaları) Türkçe çıkarıp İngilizce yazdırıyor.
 * Burada kaynak da yön de başka: İngilizce kursun 200 dersi JSON
 * (`en-a1.json`, `en-a2.json`) ve yazılacak dil ALMANCA. Aynı hatta
 * `--de` bayrağı takmak, çıkarıcının iki ayrı biçimi birden okumasını
 * gerektirirdi; deneme kâğıdı hattında bayrak işe yaradı çünkü orada iki
 * yönün de kaynağı aynı biçimdeydi.
 *
 * ÖLÇÜLDÜ: 11.210 benzersiz dize, 75 paket.
 *   say.tr 7437 · hint.tr 826 · vocab.tr 715 · pattern.tr 578 · why.tr 289
 *   titleTr 200 · summary 200 · scene 200 · goal 200 · statement 199
 *   openingTr 197 · partner 169
 * Ortanca uzunluk 43, en uzun 320.
 *
 * TÜR SIRASI PAKET SINIRLARINI BELİRLİYOR ve kardeş hatlardaki gerekçe
 * aynı: hat bağlamı dar, kısa satırlarla başlasın; anlatım (`say.tr`)
 * en sona kalsın çünkü satırları hem uzun hem birbirine bağlı. Sıra
 * KARARLI olmak zorunda — değişirse yazılmış paketler kayar.
 *
 * SATIRIN HEDEF DİL YÜZEYİ DE TAŞINIYOR (`en` alanı). Kapı kanıt
 * ölçütünü sözcük listesiyle değil BU alanla kuruyor; gerekçesi
 * `check.mjs` başında.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";

const DIR = new URL(".", import.meta.url).pathname;
const SRC = new URL("../../../src/lib/lessons/content/", import.meta.url).pathname;
const FILES = ["en-a1.json", "en-a2.json"];

/** Tür sırası — paket sınırlarını bu belirliyor. Sıra KARARLI. */
export const KINDS = [
  "partner",
  "openingTr",
  "statement",
  "titleTr",
  "summary",
  "scene",
  "goal",
  "why.tr",
  "pattern.tr",
  "vocab.tr",
  "hint.tr",
  "say.tr",
];

/**
 * Dersin bütün İNGİLİZCE yüzeyi — sözlük, kalıp, anlatımın `en`
 * parçaları, beklenen üretim ve kabul listesi, rol yapmanın açılışı.
 *
 * Kapıdaki kanıt ölçütü buradan besleniyor: Türkçe bir satırda tırnak
 * içinde geçen açıklık, ancak bu yüzeyde birebir varsa KANIT sayılıyor.
 * Ölçüldü — 892 aday açıklığın 150'si burada bulunuyor; geri kalanın
 * neredeyse tamamı Türkçe karşılık ("merhaba", "Ben iyiyim") ve onlar
 * çevrilecek, korunacak değil.
 */
const surface = (l) => {
  const en = [];
  for (const v of l.vocab ?? []) en.push(v.de);
  for (const p of l.patterns ?? []) en.push(p.de);
  for (const s of l.lecture ?? []) {
    for (const seg of s.say ?? []) if (seg.lang !== "tr") en.push(seg.text);
    const e = s.expect;
    if (e) {
      if (e.target) en.push(e.target);
      for (const a of e.accept ?? []) en.push(a);
    }
  }
  if (l.roleplay?.opening) en.push(l.roleplay.opening);
  return en.filter((x) => x && String(x).trim());
};

/** Bütün Türkçe alanlar, benzersizleştirilmiş. */
export function extractLessonProse() {
  const rows = new Map();
  const add = (kind, tr, lesson, en) => {
    if (!tr || !String(tr).trim()) return;
    const key = kind + "|" + tr;
    if (!rows.has(key)) rows.set(key, { kind, tr: String(tr), n: 0, ctx: new Set(), en: new Set() });
    const r = rows.get(key);
    r.n++;
    r.ctx.add(lesson);
    for (const x of en) r.en.add(String(x));
  };

  for (const f of FILES)
    for (const l of JSON.parse(readFileSync(SRC + f, "utf8"))) {
      const en = surface(l);
      add("titleTr", l.titleTr, l.id, en);
      add("summary", l.summary, l.id, en);
      for (const v of l.vocab ?? []) add("vocab.tr", v.tr, l.id, en);
      for (const p of l.patterns ?? []) add("pattern.tr", p.tr, l.id, en);
      for (const s of l.lecture ?? []) {
        for (const seg of s.say ?? []) if (seg.lang === "tr") add("say.tr", seg.text, l.id, en);
        const e = s.expect;
        if (!e) continue;
        if (e.kind === "truefalse") {
          add("statement", e.statement, l.id, en);
          for (const w of e.why ?? []) if (w.lang === "tr") add("why.tr", w.text, l.id, en);
        }
        if (e.kind === "produce") for (const h of e.hint ?? []) if (h.lang === "tr") add("hint.tr", h.text, l.id, en);
      }
      const r = l.roleplay ?? {};
      add("scene", r.scene, l.id, en);
      add("partner", r.partner, l.id, en);
      add("openingTr", r.openingTr, l.id, en);
      add("goal", r.goal, l.id, en);
    }

  const rank = (r) => KINDS.indexOf(r.kind);
  return [...rows.values()]
    .map((r) => ({ ...r, ctx: [...r.ctx], en: [...r.en] }))
    .sort(
      (a, b) =>
        rank(a) - rank(b) ||
        b.n - a.n ||
        a.tr.length - b.tr.length ||
        a.tr.localeCompare(b.tr, "tr"),
    );
}

if (process.argv[1]?.endsWith("make.mjs")) {
  const rows = extractLessonProse();
  const SIZE = 150;
  if (existsSync(`${DIR}in`)) rmSync(`${DIR}in`, { recursive: true });
  mkdirSync(`${DIR}in`, { recursive: true });
  let n = 0;
  for (let i = 0; i < rows.length; i += SIZE) {
    const name = `l-${String(++n).padStart(3, "0")}`;
    writeFileSync(
      `${DIR}in/${name}.json`,
      `${JSON.stringify({ packet: name, words: rows.slice(i, i + SIZE) }, null, 1)}\n`,
    );
  }
  const byKind = {};
  for (const r of rows) byKind[r.kind] = (byKind[r.kind] ?? 0) + 1;
  console.log(
    `${rows.length} benzersiz dize · ${n} paket\n` +
      KINDS.filter((k) => byKind[k]).map((k) => `${k} ${byKind[k]}`).join(" · "),
  );
}
