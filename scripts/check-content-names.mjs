#!/usr/bin/env node
/**
 * HEDEF DİL İÇERİĞİNDE TÜRKÇE KİŞİ ADI YOK — `npm run check:content-names`.
 *
 * Almanca ve İngilizce kursun içeriğinde kişiler o dilin adlarını taşıyor (2026-10-05, Samet). Türkçe adlar
 * seslendirmede bozuluyordu ("Can" → "Ken", "Deniz" → "Denise", "Elif" harf harf) ve içerik üreten her yeni tur
 * (elle ya da yapay zekâyla) onları geri getirebilir. Kapı içerik kaynaklarında `data/names/turkish-names.json`
 * listesindeki adları arar; yorumlar dahil hiçbir yerde geçmemeli. Türkçede sözcük de olan adlar (Deniz, Kaya…)
 * listede yok: cümleden ayırt edilemezler, yazar onları da kullanmaz.
 * Kaynağı geçmiş kayıt olan dosyalar (data/meanings/qa, data/audit-*) taranmaz.
 */
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const { adlar } = JSON.parse(readFileSync("data/names/turkish-names.json", "utf8"));
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const re = new RegExp(`(?<![\\p{L}\\p{N}_'’-])(${[...adlar].sort((a, b) => b.length - a.length).map(esc).join("|")})(?![\\p{L}\\p{N}_])`, "gu");
const KAYNAK = [
  "src/lib/skills/content", "src/lib/mock-exams/de", "src/lib/mock-exams/en", "src/lib/conversations/module-exam",
  "src/lib/weekly-quiz/de", "src/lib/weekly-quiz/en", "src/lib/conversations/content", "src/lib/immersion/content",
  "src/lib/conversations/characters.ts", "data/app/words.json", "data/app/words-en.json", "data/placement",
  "data/skills/prose/out", "data/skills/prose-de/out", "data/skills/task/out", "data/skills/task-de/out",
  "data/mock-exams/prose", "data/weekly-quiz/prose", "data/conversations", "data/meanings/out", "data/en-de/out",
];
const files = execFileSync("git", ["ls-files", ...KAYNAK], { encoding: "utf8" }).split("\n")
  .filter((f) => /\.(ts|json)$/.test(f));
const hits = [];
for (const f of files) {
  const lines = readFileSync(f, "utf8").split("\n");
  lines.forEach((l, i) => {
    for (const m of l.matchAll(re)) hits.push(`${f}:${i + 1}: ${m[1]} — ${l.trim().slice(0, 110)}`);
  });
}
if (hits.length) {
  console.error(`✗ Hedef dil içeriğinde ${hits.length} Türkçe ad (data/names/turkish-names.json):`);
  for (const h of hits.slice(0, 40)) console.error("  " + h);
  console.error("Almanca içerikte Almanca, İngilizce içerikte İngilizce ad kullan; eşleme örnekleri data/names/rename-2026-10-05.json.");
  process.exit(1);
}
console.log(`✓ ${files.length} içerik dosyasında Türkçe kişi adı yok (${adlar.length} ad).`);
