/**
 * ÇALIŞMA ZAMANINDA KURULAN ANAHTAR AİLELERİ.
 *
 * Sözlük anahtarlarının çoğu kodda düz yazılı (`t("quiz.what_means")`) ve
 * `i18n:check` onları görüyor. Ama on yerde anahtar ŞABLONLA kuruluyor:
 * `t(\`genre.${meta.genre}\`)`, `t(\`league.tier_${tier}\`)`,
 * `t(\`band.${p.band}\`)`, `t(\`mockexam.fail_${reason}\`)`,
 * `t(\`social.reaction_${kind}\`)`.
 *
 * Böyle bir çağrıda yeni bir DEĞER ortaya çıkarsa (yeni bir tür, yeni bir
 * bant, yeni bir hata sebebi, yeni bir lig kademesi) anahtar sözlükte
 * bulunmuyor ve ekrana HAM ANAHTAR çıkıyor — `genre.podcast` gibi. Ne derleme
 * ne tip ne de düz anahtar taraması bunu görür: değer veriden ya da bir
 * birleşim tipinden geliyor, çağrı yerinde yazılı değil.
 *
 * Bu kapı ailelerin KAYNAĞINI okuyup her olası değeri üç sözlükte arıyor.
 * Kaynaklar tek tek yazılı: hangi değer kümesinin nereden geldiğini bilmek
 * ailenin yarısı. Yeni bir aile eklendiğinde buraya da bir satır gerekiyor —
 * ve bu bilinçli: "şablonla kurulan her anahtarı bul" diye genel bir tarama,
 * değer kümesini tahmin etmek zorunda kalır ve tahmin eden bir kapı ya
 * gürültü ya kalıcı yeşil üretir (bkz. web-parity §11.305).
 */
import { readdirSync, readFileSync } from "node:fs";

const read = (f) => readFileSync(f, "utf8");
const walk = (d, out = []) => {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = d + "/" + e.name;
    if (e.isDirectory()) walk(p, out);
    else if (/\.(ts|json)$/.test(e.name)) out.push(p);
  }
  return out;
};

/** Bir dosyadaki `"anahtar":` satırları. */
const dictKeys = (f) => new Set([...read(f).matchAll(/^\s*"([^"]+)":/gm)].map((m) => m[1]));
const DICTS = {
  tr: dictKeys("src/i18n/base/tr.ts"),
  en: dictKeys("src/i18n/base/en.ts"),
  de: dictKeys("src/i18n/base/de.ts"),
};

/** `["a", "b"]` biçimindeki dizgeleri çıkarır. */
const listOf = (text, name) => {
  const m = text.match(new RegExp(name + "\\s*=\\s*\\[([^\\]]*)\\]"));
  return m ? [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]) : [];
};
/** `type X = "a" | "b"` biçimindeki birleşim tipini çıkarır. */
const unionOf = (text, name) => {
  const m = text.match(new RegExp("type " + name + "\\s*=\\s*([^;]+);"));
  return m ? [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]) : [];
};

const socialTypes = read("src/lib/social/types.ts");
const proficiency = read("src/lib/proficiency.ts");
const mockExam = read("mobile/src/game/mockExam.ts");

/** Tür değerleri içerikten: her egzersizin `genre` alanı. */
const genres = new Set();
for (const f of walk("src/lib/skills/content")) {
  for (const m of read(f).matchAll(/genre:\s*"([a-z_]+)"/g)) genres.add(m[1]);
}

const FAMILIES = [
  { prefix: "genre.", values: [...genres], source: "src/lib/skills/content/** (egzersiz `genre` alanı)" },
  { prefix: "league.tier_", values: listOf(socialTypes, "LEAGUE_TIERS"), source: "lib/social/types LEAGUE_TIERS" },
  {
    prefix: "social.reaction_",
    values: listOf(socialTypes, "REACTION_KINDS"),
    source: "lib/social/types REACTION_KINDS",
    /* ÖNEK ÇAKIŞMASI. `social.reaction_add` ve `social.reaction_change` bu
       ailenin üyesi DEĞİL: ikisi de düğme etiketi ("Tepki ver" / "Değiştir")
       ve iki platformda da öyle kullanılıyor (`reaction-bar`, `ReactionBar`).
       Öneki paylaşıyorlar, o kadar. Ters denetimi kapatmak yerine ikisi adıyla
       ayrıldı: kapı ailenin bayatlamasını görmeye devam ediyor. */
    notMembers: ["add", "change"],
  },
  { prefix: "band.", values: unionOf(proficiency, "Band"), source: "lib/proficiency Band" },
  { prefix: "mockexam.fail_", values: unionOf(mockExam, "FailReason"), source: "mobile game/mockExam FailReason" },
];

const problems = [];
for (const fam of FAMILIES) {
  if (!fam.values.length) {
    problems.push(`${fam.prefix}: değer kümesi OKUNAMADI — kaynak: ${fam.source}`);
    continue;
  }
  for (const v of fam.values) {
    for (const [lang, keys] of Object.entries(DICTS)) {
      if (!keys.has(fam.prefix + v)) problems.push(`${lang}: ${fam.prefix}${v} yok  (kaynak: ${fam.source})`);
    }
  }
  /* Ters yön: sözlükte olup kaynakta olmayan anahtar. Ölü değil, YANLIŞ
     olabilir — değer adı değişmişse eski anahtar kalır, yenisi eksiktir. */
  const notMembers = new Set(fam.notMembers ?? []);
  const extra = [...DICTS.tr].filter(
    (k) =>
      k.startsWith(fam.prefix) &&
      !fam.values.includes(k.slice(fam.prefix.length)) &&
      !notMembers.has(k.slice(fam.prefix.length)),
  );
  for (const k of extra) problems.push(`sözlükte var, kaynakta yok: ${k}  (kaynak: ${fam.source})`);
}

/*
 * OLAY `kind` KÜMELERİ: belgelenen ile üretilen aynı mı?
 *
 * `lib/events` her olayın yanında `kind`in ne alabileceğini yazıyor ve o
 * cümle bir sözleşme: pano `kind`e göre gruplayıp satır satır gösteriyor
 * (`lib/admin`). Belgelenip ÜRETİLMEYEN bir değer, panoda hiç görünmeyecek
 * bir satır demek — ve okuyan kişi onu "henüz veri yok" sanır.
 *
 * `production_attempt` tam bunu yaşadı: yorum altı değer sayıyordu, dördü
 * üretiliyordu. Kapı belgelenen kümeyi `productionKind`in ürettikleriyle
 * karşılaştırıyor.
 *
 * YALNIZ BU OLAY ÖLÇÜLÜYOR ve sebebi dar tutmak: ötekilerin `kind`i serbest
 * biçimli ("B1:reading", ekran anahtarı, hata tipi) ve kapalı bir küme
 * değil. Kapalı küme yazan bir olay eklenirse buraya da bir satır gerekiyor.
 */
const eventsSrc = read("src/lib/events.ts");
const assessSrc = read("src/lib/assess.ts");
const PRODUCTION_EXPECTED = ["free_sentence", "writing_free", "speaking_drill", "roleplay"];
const kindFn = assessSrc.slice(assessSrc.indexOf("function productionKind"));
const producedKinds = [...kindFn.slice(0, kindFn.indexOf("\n}")).matchAll(/return "([a-z_]+)"/g)].map((m) => m[1]);
if (!producedKinds.length) {
  problems.push("production_attempt: `productionKind` okunamadı (lib/assess)");
} else {
  for (const v of PRODUCTION_EXPECTED.filter((x) => !producedKinds.includes(x))) {
    problems.push(`production_attempt: "${v}" artık üretilmiyor (lib/assess productionKind)`);
  }
  for (const v of producedKinds.filter((x) => !PRODUCTION_EXPECTED.includes(x))) {
    problems.push(`production_attempt: "${v}" üretiliyor ama beklenen kümede yok — lib/events yorumu ve bu kapı güncellenmeli`);
  }
  /* Yorum da gerçeği söylemeli: dört değerden söz etmeyen bir yorum yine
     bayatlamış demektir (§11.289: yanlış yorum yokluktan kötü). */
  if (!/YALNIZ DÖRT DEĞER/.test(eventsSrc)) {
    problems.push("production_attempt: lib/events yorumu `kind` kümesini artık anlatmıyor");
  }
}

if (problems.length) {
  console.error("\nŞABLONLA KURULAN ANAHTAR EKSİK:\n");
  for (const p of problems) console.error("  " + p);
  console.error("\nBu anahtar çalışma zamanında kurulduğu için eksikse ekrana ham anahtar çıkar.\n");
  process.exit(1);
}

const total = FAMILIES.reduce((n, f) => n + f.values.length, 0);
console.log(`check:key-families — ${FAMILIES.length} aile, ${total} değer, üç sözlükte de tam`);
