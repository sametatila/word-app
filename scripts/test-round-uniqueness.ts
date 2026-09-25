/**
 * TUR SÖZLEŞMESİ — gerçek kelime havuzuyla, veritabanısız.
 *
 *   npm run test:rounds
 *
 * Kelime turlarının öğrenciye verdiği sözler:
 *   1. Çoktan seçmelide TEK doğru şık: hiçbir çeldirici doğru cevapla anlam ya
 *      da başlık paylaşmıyor (tr→de'de anfangen/beginnen yan yana çıkıyordu).
 *   2. Şıklar birbirini tekrar etmiyor.
 *   3. Boşluk doldurmada biçim ipucu yok: cevap çekimliyse çeldiriciler de
 *      çekimli, değilse hiçbiri (tek çekimli şık cevabı ele veriyordu).
 *   4. Eşleştirme kümesinde her kelime tek bir karşılığa eşlenebiliyor.
 *   5. Anadil ekseni: İngilizce ve Almanca anadilli öğrencide anlam şıkları
 *      KURULUYOR (tura Almanca karşılık konmuyordu, Almanca anadilde boş şık).
 *   6. Aynı yazılışlı iki madde ("als"): modül sınavı öğretilen anlamı soruyor.
 *
 * Havuz tohumlama betiklerinin yazacağı satırlardan kuruluyor (seed.ts ve
 * seed-english.ts ile aynı dönüşüm), turlar `makeRound` ile — oturumun
 * kendisiyle aynı işlev.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { makeRound, toRoundWord, buildCloze } from "../src/lib/session";
import { glossFor, sharesMeaning, withArtikel } from "../src/lib/option-label";
import { cleanHeadword } from "../src/lib/headword";
import { taughtSense } from "../src/lib/conversations/module-content";
import type { NativeLang } from "../src/lib/courses";
import type { Round } from "../src/lib/types";

type Row = Parameters<typeof toRoundWord>[0];

const ROOT = process.cwd();
const jsonl = (p: string) => readFileSync(p, "utf8").split("\n").filter((l) => l.trim()).map((l) => JSON.parse(l));

function germanRows(): Row[] {
  const src = JSON.parse(readFileSync(path.join(ROOT, "data/app/words.json"), "utf8")) as Record<string, never>[];
  return src.map((r) => ({
    id: r.id, course: "de", de: cleanHeadword(r.de), artikel: r.artikel || null, tr: r.tr, en: r.en ?? null,
    formen: r.formen || null, typ: r.typ, niveau: String(r.niveau).startsWith("A1") ? "A1" : r.niveau,
    beispiel: r.beispiel ?? null, beispielTr: r.beispielTr ?? null, beispielEn: r.beispielEn ?? null,
    deGloss: null, beispielDe: null, rank: r.rank ?? null,
  })) as unknown as Row[];
}

function englishRows(german: Row[]): Row[] {
  const head = new Map(german.map((g) => [g.id, g.de]));
  const ende = new Map<number, string>();
  const dir = path.join(ROOT, "data/en-de/out");
  if (existsSync(dir)) for (const f of readdirSync(dir).filter((f) => f.endsWith(".json")))
    for (const r of JSON.parse(readFileSync(path.join(dir, f), "utf8")) as { id: number; beispielDe: string }[]) ende.set(r.id, r.beispielDe);
  return jsonl(path.join(ROOT, "data/app/words-en.json")).map((r) => ({
    id: r.id, course: "en", de: r.de, artikel: null, tr: r.tr, en: null, formen: null, typ: r.typ, niveau: r.niveau,
    beispiel: r.beispiel || null, beispielTr: r.beispielTr || null, beispielEn: null,
    deGloss: r.deGloss?.trim() || (r.srcId ? head.get(r.srcId) ?? null : null), beispielDe: ende.get(r.id) ?? null, rank: null,
  })) as unknown as Row[];
}

let fails = 0;
const failures: string[] = [];
const fail = (m: string) => { fails++; if (failures.length < 25) failures.push(m); };
let seq = 0;
const nextId = () => `t${++seq}`;
const sample = <T,>(arr: T[], n: number) => [...arr].sort(() => Math.random() - 0.5).slice(0, n);

function run(label: string, rows: Row[], native: NativeLang, iterations: number) {
  const usable = rows.filter((r) => glossFor(r, native));
  const byLevel = new Map<string, Row[]>();
  for (const r of usable) (byLevel.get(r.niveau) ?? byLevel.set(r.niveau, []).get(r.niveau)!).push(r);
  let choice = 0, cloze = 0, inflected = 0, typeOnly = 0, empty = 0;

  for (const w of sample(usable, iterations)) {
    const pool = sample(byLevel.get(w.niveau) ?? usable, 140);
    const word = toRoundWord(w, false);

    for (const direction of ["de-tr", "tr-de"] as const) {
      // Yönü sabitlemek için güç ve rastgelelik yerine tur tekrar kuruluyor.
      let r: Round | null = null;
      for (let i = 0; i < 8 && (!r || (r.game === "choice" && r.direction !== direction)); i++) r = makeRound("choice", word, pool, nextId, "strong", native);
      if (!r || r.game !== "choice" || r.direction !== direction) continue;
      choice++;
      if (r.options.length < 2) { empty++; fail(`${label} ${w.de}: ${direction} şık kurulamadı (${r.options.length})`); continue; }
      const texts = r.options.map((o) => o.text);
      if (new Set(texts).size !== texts.length) fail(`${label} ${w.de}: ${direction} yinelenen şık ${JSON.stringify(texts)}`);
      const correctText = direction === "de-tr" ? glossFor(word, native)!.text : withArtikel(word);
      if (!texts.includes(correctText)) fail(`${label} ${w.de}: ${direction} doğru şık yok`);
      for (const o of r.options) {
        if (o.text === correctText) continue;
        const other = pool.find((p) => (direction === "de-tr" ? glossFor(p, native)?.text : withArtikel(p)) === o.text);
        if (other && sharesMeaning(word, other, native)) fail(`${label} ${w.de}: ${direction} ikinci doğru şık «${o.text}»`);
      }
    }

    const cz = makeRound("cloze", word, pool, nextId, "fresh", native);
    if (cz && cz.game === "cloze") {
      cloze++;
      const lower = (x: string) => x.toLocaleLowerCase("de-DE");
      const isInflected = lower(cz.answer) !== lower(w.de.replace(/^sich\s+/, ""));
      if (isInflected) inflected++;
      if (cz.mode === "type") typeOnly++;
      if (cz.mode !== "type") {
        if (cz.options.length !== 4) fail(`${label} ${w.de}: şıklı boşluk doldurmada ${cz.options.length} şık`);
        for (const o of cz.options) {
          if (o === cz.answer) continue;
          // Çeldiricinin kaynağı cevabın biçim türüne göre aranıyor: çekimsiz
          // cevapta başlık ("regeln"), çekimlide o kelimenin kendi cümlesindeki
          // biçim ("Regeln" < Regel). Bulunamazsa biçim ipucu var demektir.
          const bare = (p: Row) => p.de.replace(/^sich\s+/, "");
          const src = isInflected
            ? pool.find((p) => lower(buildCloze(toRoundWord(p, false), pool)?.answer ?? "") === lower(o) && lower(bare(p)) !== lower(o))
            : pool.find((p) => lower(bare(p)) === lower(o));
          if (!src) { fail(`${label} ${w.de}: boşluk doldurmada biçim ipucu (cevap «${cz.answer}», çeldirici «${o}»)`); continue; }
          if (o.trim().split(/\s+/).length !== cz.answer.trim().split(/\s+/).length) fail(`${label} ${w.de}: sözcük sayısı ipucu «${o}»`);
          if (sharesMeaning(word, src, native)) fail(`${label} ${w.de}: boşluk doldurmada eşanlamlı çeldirici «${o}»`);
        }
        if (new Set(cz.options.map(lower)).size !== cz.options.length) fail(`${label} ${w.de}: boşluk doldurmada yinelenen şık`);
      }
    }
  }
  console.log(`${label}: ${choice} şık turu, ${empty} boş · boşluk doldurma ${cloze} (${inflected} çekimli cevap, ${typeOnly} yazarak)`);
}

/* 6. Aynı yazılışlı maddeler: modül sınavı konuşmanın öğrettiği anlamı soruyor. */
{
  const rows = [{ de: "als", tr: "-den daha" }, { de: "als", tr: "-dığında" }, { de: "Haus", tr: "ev" }];
  const got = (items: { head: string; tr: string }[]) => taughtSense(rows, items.map((i) => ({ ...i, de: i.head, conversationId: "x" }))).map((r) => r.tr).join("|");
  if (got([{ head: "als", tr: "-den daha" }, { head: "haus", tr: "ev" }]) !== "-den daha|ev") fail("taughtSense: öğretilen anlam seçilmedi");
  if (got([{ head: "als", tr: "karşılaştırma" }]) !== "-den daha|-dığında|ev") fail("taughtSense: uymayan çeviride ikisi de kalmalı");
}

const de = germanRows();
const en = englishRows(de);
run("de/tr", de, "tr", 1500);
run("de/en", de, "en", 600);
run("en/tr", en, "tr", 1200);
run("en/de", en, "de", 600);

if (failures.length) console.log("\n" + failures.map((f) => "  HATA " + f).join("\n"));
console.log(fails ? `\n${fails} hata` : "\ntamam: tek doğru şık, tekrarsız şık, biçim ipucu yok, anadil şıkları kuruluyor");
process.exit(fails ? 1 : 0);
