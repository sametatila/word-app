/**
 * Anlam düzeltmesinden sonra konuşma sözlükçesini onarır: `node data/meanings/qa/conv-vocab.mjs [<rev>] ["konuşma|de" ...]`
 *
 * NEDEN: konuşma sözlükçesinin İngilizcesi havuzdan TÜRETİLİYOR, ama yalnız konuşmanın Türkçesi havuzun
 * Türkçesiyle birebir aynıysa (`data/conversations/vocab/triage.mjs`). Bir kelimenin havuz `tr`si değişince o
 * kelimeyi eski Türkçeyle tanıtan konuşmalar türetilemez olur ve `check:conversations-native` konuşmayı reddeder
 * (2026-10-04: A1/A2 düzeltmeleri ve havuz uzlaştırması 26 satır). Bu betik o satırlara, konuşmadaki anlama uyan
 * İngilizceyi (<rev>'deki, yani değişiklikten ÖNCEKİ havuz `en`i) `vocab/out/v-019.json`a elle yazar.
 * Ek argüman "konuşma|de": türetilse de elle yaz — anlatım satırı eski İngilizceyi söylüyorsa (kapının
 * "kelime adımı başka kelimenin karşılığını gösteriyor" hatası).
 * Sonra: `npm run check:conversations-native`. Konuşma metnini yeni anlama getirmek ayrı bir içerik işi.
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
const ROOT = "/Users/linkinqark/Workspace/word-app/";
const { extractVocab } = await import(ROOT + "data/conversations/vocab/extract.mjs");
const { poolLookup } = await import(ROOT + "data/conversations/vocab/pool.mjs");
const rev = process.argv[2] && !process.argv[2].includes("|") ? process.argv[2] : "HEAD";
const oldLookup = poolLookup(JSON.parse(execSync(`git -C ${ROOT} show ${rev}:data/app/words.json`, { encoding: "utf8", maxBuffer: 1e8 })));
const curLookup = poolLookup(JSON.parse(readFileSync(ROOT + "data/app/words.json", "utf8")));
const dir = ROOT + "data/conversations/vocab/out/";
const manual = new Set(readdirSync(dir).flatMap((f) => JSON.parse(readFileSync(dir + f, "utf8"))).map((d) => d.conversation + "|" + d.de));
const p = dir + "v-019.json";
const arr = JSON.parse(readFileSync(p, "utf8"));
const force = new Set(process.argv.slice(2).filter((a) => a.includes("|"))); // "konuşma|de": türetilse de elle (anlatım satırı eski en'i söylüyor)
for (const r of extractVocab()) {
  const k = r.conversation + "|" + r.de;
  if (manual.has(k)) continue;
  const cur = curLookup(r.de, r.tr);
  const agree = cur && String(cur.tr ?? "").toLowerCase().trim() === r.tr.toLowerCase().trim();
  if (agree && !force.has(k)) continue;
  const old = oldLookup(r.de, r.tr);
  const oldAgree = old && String(old.tr ?? "").toLowerCase().trim() === r.tr.toLowerCase().trim();
  if (!oldAgree && !force.has(k)) continue; // önceden de türetilmiyordu: bu değişiklikle ilgisiz
  arr.push({ conversation: r.conversation, de: r.de, en: old.en });
  console.log("eklendi", k, "→", old.en);
}
writeFileSync(p, "[\n" + arr.map((x) => ` { "conversation": ${JSON.stringify(x.conversation)}, "de": ${JSON.stringify(x.de)}, "en": ${JSON.stringify(x.en)} }`).join(",\n") + "\n]\n");
