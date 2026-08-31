/**
 * Dilbilgisel kalite denetimi: `npm run audit`
 *
 * Havuzu Almancanın kendi kurallarına karşı sınar. Buradaki denetimler
 * **nesnel**: bir öğretmenin "bu yanlış" diyeceği, tartışmaya açık olmayan
 * şeyler. Zevk meselesi olan hiçbir şey rapor edilmez, yoksa gerçek hatalar
 * gürültüde kaybolur.
 */
import fs from "node:fs";
import path from "node:path";
import { sentenceContainsWord } from "../src/lib/headword";
import { firstExample } from "../src/lib/example";

type Word = {
  id: number;
  de: string;
  artikel: string;
  tr: string;
  formen: string;
  typ: string;
  niveau: string;
  beispiel: string | null;
  beispielTr?: string | null;
};

const words: Word[] = JSON.parse(fs.readFileSync("data/app/words.json", "utf8"));

type Finding = { id: number; de: string; rule: string; detail: string };
const findings: Finding[] = [];
const add = (w: Word, rule: string, detail: string) =>
  findings.push({ id: w.id, de: w.de, rule, detail });

/**
 * Almancada isim cinsi büyük ölçüde son ekten okunur. Bunlar istisnasız ya da
 * istisnası sayılı kurallar; ihlal neredeyse her zaman veri hatasıdır.
 */
const SUFFIX_GENDER: [RegExp, string, string][] = [
  // Yalnızca türetme eki olduğu kesin olanlar. "-ur" ya da "-ei" gibi kısa
  // dizgeler native kelimelerin sonuna da denk geliyor (Uhr, Ei), o yüzden
  // kural en az sekiz harfli kelimelerde uygulanır — türetilmiş sözcükler
  // uzundur, yanlış eşleşen kısa native sözcükler değil.
  [/(ung|heit|keit|schaft|tion|sion|tät|ik|enz|anz)$/, "die", "-ung/-heit/-keit/-tion ailesi"],
  [/(ismus|ling)$/, "der", "-ismus/-ling eki"],
];
const MIN_SUFFIX_LEN = 8;
// Kuralın bilinen istisnaları — bunlar gerçekten öyle.
const GENDER_EXCEPTIONS = new Set([
  "Reichtum", "Irrtum", "Motor", "Doktor", "Monitor", "Autor", "Traktor",
  "Erz", "Salz", "Ei", "Brei", "Blei", "Papagei", "Reis", "Preis",
]);

const nouns = words.filter((w) => w.typ === "Nomen");
const nounByName = new Map(nouns.map((w) => [w.de.toLowerCase(), w]));
/** Havuzdaki tüm kelimeler — bileşik önekinin gerçek olduğunu doğrulamak için. */
const wordForms = new Set(words.map((w) => w.de.toLowerCase()));

for (const w of words) {
  const de = w.de.trim();
  const first = de[0] ?? "";

  // 1) İsimler büyük harfle başlar; bu Almancanın en katı yazım kuralıdır.
  if (w.typ === "Nomen" && first !== first.toUpperCase())
    add(w, "isim küçük harfle", `"${de}" isim ama küçük harfle başlıyor`);

  // 2) Fiil mastarı -en ya da -n ile biter.
  if (w.typ === "Verb" && !/(en|ln|rn|n)$/.test(de.replace(/^sich\s+/, "")))
    add(w, "fiil mastar değil", `"${de}" fiil olarak işaretli ama mastar eki yok`);

  // 3) İsimde artikel zorunlu, isim olmayanda artikel olmaz.
  if (w.typ === "Nomen" && !["der", "die", "das"].includes(w.artikel))
    add(w, "artikel eksik", `"${de}" isim ama artikeli "${w.artikel || "yok"}"`);
  if (w.typ !== "Nomen" && w.artikel)
    add(w, "gereksiz artikel", `"${de}" isim değil ama artikeli var: ${w.artikel}`);

  // 4) Sonek kuralı ile artikel çelişiyor mu?
  if (w.typ === "Nomen" && w.artikel && !GENDER_EXCEPTIONS.has(de)) {
    for (const [re, expected, why] of SUFFIX_GENDER) {
      if (de.length >= MIN_SUFFIX_LEN && re.test(de) && w.artikel !== expected) {
        add(w, "artikel sonekle çelişiyor", `"${de}" → ${w.artikel}, oysa ${why} ${expected} diyor`);
        break;
      }
    }
  }

  // 5) Bileşik ismin cinsi son bileşenden gelir. Havuzda hem bileşik hem
  //    son bileşeni varsa artikelleri aynı olmalı.
  if (w.typ === "Nomen" && w.artikel && de.length > 8 && /^[A-ZÄÖÜ]/.test(de)) {
    for (const [name, head] of nounByName) {
      if (name.length < 4 || name.length >= de.length) continue;
      if (!de.toLowerCase().endsWith(name)) continue;
      // Gerçek bileşik olduğunu doğrula: baştaki parça da havuzda bir kelime
      // olmalı. Aksi hâlde "Antwort" → "Wort" ya da "Schwein" → "Wein" gibi
      // rastlantısal dize eşleşmeleri hata sanılır.
      const prefix = de.slice(0, de.length - name.length).replace(/s$/, "");
      if (prefix.length < 3) continue;
      if (!nounByName.has(prefix.toLowerCase()) && !wordForms.has(prefix.toLowerCase())) continue;
      if (head.artikel && head.artikel !== w.artikel)
        add(w, "bileşik artikeli", `"${de}" → ${w.artikel}, ama "${head.de}" → ${head.artikel}`);
      break;
    }
  }

  // 6) Fiil çevirisi Türkçede mastar olmalı; isim çevirisi olmamalı.
  // Parantezli açıklama çeviriye dahil değildir: "yemek (hayvan için)" mastardır.
  const trFirst = w.tr.split(",")[0].replace(/\([^)]*\)/g, "").trim();
  if (w.typ === "Verb" && !/(mek|mak)$/.test(trFirst))
    add(w, "fiil çevirisi mastar değil", `"${de}" → "${trFirst}"`);
  // "isim çevirisi fiil gibi" kuralı kaldırıldı: Türkçede ekmek, kaymak,
  // çakmak gibi isimler de -mek/-mak ile biter, kural ayırt edemiyor.

  // 7) Öğrencinin GÖRDÜĞÜ cümle denetlenir, ham alan değil. Kaynakta 473
  //    maddede alan numaralı bir örnek derlemesidir ("1. … 2. …"), ama
  //    firstExample bunu gösterimde ilk cümleye indiriyor. Ham alanı hata
  //    saymak yanlış alarm olurdu; asıl soru, ayıklama sonrası ortaya çıkanın
  //    düzgün bir cümle olup olmadığıdır.
  if (!w.beispiel?.trim()) add(w, "örnek cümle yok", de);
  else {
    const ex = firstExample(w.beispiel);
    if (!ex) add(w, "cümle ayıklanamıyor", `"${w.beispiel.slice(0, 60)}…"`);
    else {
      if (ex.split(/\s+/).length < 3) add(w, "cümle çok kısa", `"${ex}"`);
      if (/\(vergl?\.|\(siehe|\(vgl\./i.test(ex))
        add(w, "cümlede sözlük notu", `"${ex.slice(0, 70)}"`);
      else if (!/[.!?]$/.test(ex)) add(w, "cümle noktalamasız", `"${ex.slice(0, 70)}"`);
      if ((ex.match(/\//g) ?? []).length >= 2)
        add(w, "cümle değil: kalıp yığını", `"${ex.slice(0, 70)}…"`);
      if (!sentenceContainsWord(de, ex)) add(w, "cümle kelimeyi taşımıyor", `"${de}" → "${ex.slice(0, 60)}"`);
    }
  }

  // 8) Çeviri boş ya da Almancanın kopyası mı?
  if (!w.tr?.trim()) add(w, "Türkçe yok", de);

}

// Rapor
const byRule = new Map<string, Finding[]>();
for (const f of findings) {
  if (!byRule.has(f.rule)) byRule.set(f.rule, []);
  byRule.get(f.rule)!.push(f);
}

console.log(`havuz ${words.length} madde · ${findings.length} bulgu\n`);
for (const [rule, list] of [...byRule.entries()].sort((a, b) => b[1].length - a[1].length)) {
  console.log(`${String(list.length).padStart(5)}  ${rule}`);
  for (const f of list.slice(0, 5)) console.log(`         ${f.id}  ${f.detail}`);
  if (list.length > 5) console.log(`         … ${list.length - 5} tane daha`);
}

fs.writeFileSync(
  path.join("data", "audit-findings.json"),
  JSON.stringify(findings, null, 1),
);
console.log(`\ndata/audit-findings.json yazıldı`);
