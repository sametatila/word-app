/**
 * Karıştırma çifti adayları (WP-73 adım 4): npm run content:confusables
 * → data/content/confusables.json
 *
 * Kelime havuzundan (data/app/words.json, 8 267 madde) biçimce yakın çiftler:
 *   - umlaut/ß düşürülünce aynı olanlar (schon/schön, Mutter/Mütter): "umlaut"
 *   - Levenshtein 1 (4+ harf) ya da 2 (7+ harf): "spelling"
 * Anlamca da yakın olanlar (aynı tür, aynı ilk 3 harf, Türkçesi kesişen) ayrı
 * işaretlenir ("meaning"). Çıktı ADAY listesi: elle seçilen ve Türkçe ayrım
 * cümlesi yazılan çiftler `src/lib/confusables.ts`'te; bu dosya gözden
 * geçirme için kaynak.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { levenshtein } from "../src/lib/errors";

type W = { id: number; de: string; artikel: string; tr: string; typ: string; niveau: string; rank: number };
const words = (JSON.parse(readFileSync("data/app/words.json", "utf8")) as W[]).filter((w) => /^[\p{L}]+$/u.test(w.de) && w.de.length >= 3);

const fold = (s: string) => s.toLowerCase().replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ß/g, "ss");
const LEVEL = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5 } as Record<string, number>;

type Pair = { a: string; b: string; aTr: string; bTr: string; kind: "umlaut" | "spelling" | "meaning"; level: string; score: number };
const pairs: Pair[] = [];
const seen = new Set<string>();
const byFold = new Map<string, W[]>();
for (const w of words) byFold.set(fold(w.de), [...(byFold.get(fold(w.de)) ?? []), w]);

function push(a: W, b: W, kind: Pair["kind"], score: number) {
  const key = [a.de, b.de].sort().join("|");
  if (seen.has(key) || a.de.toLowerCase() === b.de.toLowerCase()) return;
  seen.add(key);
  const level = LEVEL[a.niveau] >= LEVEL[b.niveau] ? a.niveau : b.niveau;
  pairs.push({ a: a.de, b: b.de, aTr: a.tr, bTr: b.tr, kind, level, score });
}

// umlaut çiftleri
for (const group of byFold.values()) if (group.length > 1) for (let i = 0; i < group.length; i++) for (let j = i + 1; j < group.length; j++) push(group[i], group[j], "umlaut", 3);

// yazım çiftleri — sıralı liste üstünde pencereyle (aynı ilk harf) O(n·k)
const sorted = [...words].sort((x, y) => x.de.localeCompare(y.de, "de"));
for (let i = 0; i < sorted.length; i++) {
  const a = sorted[i];
  for (let j = i + 1; j < Math.min(sorted.length, i + 400); j++) {
    const b = sorted[j];
    if (a.de[0].toLowerCase() !== b.de[0].toLowerCase()) break;
    if (Math.abs(a.de.length - b.de.length) > 1) continue;
    // Gözden geçirilebilir liste: yalnız A1–B1 ve tek harf farkı (4+ harf); 7+ harfte iki fark.
    if (LEVEL[a.niveau] > 3 || LEVEL[b.niveau] > 3 || a.de.length < 4) continue;
    const d = levenshtein(a.de.toLowerCase(), b.de.toLowerCase());
    const max = a.de.length >= 7 ? 2 : 1;
    if (d === 0 || d > max) continue;
    // Türkçesi kesişiyorsa aynı kelimenin biçimi olabilir (Lehrer/Lehrerin) — anlam çifti değil
    const trShared = a.tr.split(/,\s*/).some((t) => b.tr.split(/,\s*/).includes(t));
    if (trShared) continue;
    push(a, b, "spelling", d === 1 ? 2 : 1);
  }
}

// anlam çiftleri: aynı tür, benzer Türkçe alan (ilk kelime aynı) ama farklı Almanca
const byTr = new Map<string, W[]>();
for (const w of words) {
  const head = w.tr.split(/[,;(]/)[0].trim().toLowerCase();
  if (head.length >= 4) byTr.set(head, [...(byTr.get(head) ?? []), w]);
}
for (const group of byTr.values())
  if (group.length > 1 && group.length <= 3)
    for (let i = 0; i < group.length; i++)
      for (let j = i + 1; j < group.length; j++)
        if (group[i].typ === group[j].typ && LEVEL[group[i].niveau] <= 2 && LEVEL[group[j].niveau] <= 2) push(group[i], group[j], "meaning", 1);

pairs.sort((x, y) => LEVEL[x.level] - LEVEL[y.level] || y.score - x.score || x.a.localeCompare(y.a, "de"));
writeFileSync("data/content/confusables.json", JSON.stringify({ generatedFrom: "data/app/words.json", count: pairs.length, pairs }, null, 1) + "\n");
const byKind = pairs.reduce((m, p) => ((m[p.kind] = (m[p.kind] ?? 0) + 1), m), {} as Record<string, number>);
console.log(`confusables — ${pairs.length} aday çift (${Object.entries(byKind).map(([k, n]) => `${k} ${n}`).join(", ")})`);
