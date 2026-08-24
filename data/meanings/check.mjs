/**
 * Anlam paketlerini denetler: `node data/meanings/check.mjs a1-001`
 *
 * Argüman bir paket adı, bir seviye öneki (`a1`) ya da `all` olabilir.
 *
 * Denetleyici yalnızca **mekanik** kusurları yakalar: çok anlamlılık, parantez,
 * kelimeyi içermeyen cümle, bozuk uzunluk, dil karışması, eksik madde. Anlamın
 * doğru olup olmadığını ölçemez — o insanın ve üreten ajanın işidir. Buna
 * rağmen buradaki kontroller elle yapılamayacak kadar çok: 8267 maddede
 * gözle bakılabilecek şey yalnızca örnektir.
 *
 * Ayrım bilerek: `hata` uygulamayı durdurur, `uyarı` durdurmaz. Uyarı, doğru
 * olabilecek ama şüphe uyandıran şeydir (ikizler, sıra dışı uzunluk); hepsini
 * hataya çevirmek ajanı doğru işi bozmaya iterdi.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";

const ROOT = new URL("../..", import.meta.url).pathname;
const ARG = (process.argv[2] || "all").toLowerCase();
const IN = `${ROOT}data/meanings/in`;
const OUT = `${ROOT}data/meanings/out`;

import { contains } from "./contains.mjs";

/** Sonundaki nokta cümleyi bitirmeyen kısaltmalar. */
const ABBR =
  /\b(z\.\s?B|bzw|usw|ca|Dr|Prof|Nr|etc|inkl|evtl|ggf|vgl|Mio|Mrd|St|Mr|Mrs|Ms|Jr|Sr|vs|approx|vb|bkz|sn)\.$/i;

function sentenceCount(text) {
  // Cümle sınırı: noktalama + boşluk + büyük harf. Kısaltmalar sayılmaz.
  let n = 1;
  const re = /[.!?]+\s+(?=[A-ZÄÖÜ0-9"„«])/g;
  let m;
  while ((m = re.exec(text))) {
    if (!ABBR.test(text.slice(0, m.index + 1))) n++;
  }
  return n;
}

const words_ = (s) => s.trim().split(/\s+/).filter(Boolean).length;

/* ── denetim ────────────────────────────────────────────────────────────── */

const TR_HARF = /[ıİğĞşŞ]/;

function denetle(paket) {
  const src = JSON.parse(readFileSync(`${IN}/${paket}.json`, "utf8"));
  const hatalar = [];
  const uyarilar = [];
  const push = (kova, id, de, etiket, mesaj) =>
    kova.push(`  [${etiket}] ${id} ${de} — ${mesaj}`);

  if (!existsSync(`${OUT}/${paket}.json`)) return { paket, yok: true, hatalar, uyarilar };

  let out;
  try {
    out = JSON.parse(readFileSync(`${OUT}/${paket}.json`, "utf8"));
  } catch (e) {
    hatalar.push(`  [bozuk json] ${e.message}`);
    return { paket, hatalar, uyarilar, madde: 0 };
  }
  if (!Array.isArray(out)) {
    hatalar.push("  [bozuk json] çıktı bir dizi değil");
    return { paket, hatalar, uyarilar, madde: 0 };
  }

  const byId = new Map(out.map((r) => [r.id, r]));
  const beklenen = src.kelimeler.map((k) => k.id);
  const eksik = beklenen.filter((id) => !byId.has(id));
  const fazla = out.map((r) => r.id).filter((id) => !beklenen.includes(id));
  if (eksik.length) hatalar.push(`  [eksik madde] ${eksik.join(", ")}`);
  if (fazla.length) hatalar.push(`  [pakete ait olmayan] ${fazla.join(", ")}`);
  if (out.length !== new Set(out.map((r) => r.id)).size)
    hatalar.push("  [yinelenen id] aynı madde birden çok kez yazılmış");

  const trSayaci = new Map();

  for (const k of src.kelimeler) {
    const r = byId.get(k.id);
    if (!r) continue;
    const de = k.de;
    const H = (etiket, mesaj) => push(hatalar, k.id, de, etiket, mesaj);
    const U = (etiket, mesaj) => push(uyarilar, k.id, de, etiket, mesaj);

    for (const alan of ["tr", "en", "beispiel", "beispielTr", "beispielEn"]) {
      if (typeof r[alan] !== "string" || !r[alan].trim()) H("boş alan", alan);
    }
    if (hatalar.length && (!r.tr || !r.en || !r.beispiel)) continue;

    const tr = (r.tr ?? "").trim();
    const en = (r.en ?? "").trim();
    const bsp = (r.beispiel ?? "").trim();
    const bspTr = (r.beispielTr ?? "").trim();
    const bspEn = (r.beispielEn ?? "").trim();

    /* tr — tek karşılık */
    if (/[,;/]/.test(tr)) H("çok anlamlı tr", `"${tr}" — virgül/çizgi ile ikinci anlam`);
    if (/[()[\]]/.test(tr)) H("parantezli tr", `"${tr}"`);
    if (/\s(ya da|veya)\s/i.test(tr)) H("çok anlamlı tr", `"${tr}" — "ya da" ile ikinci anlam`);
    if (tr.length > 40) H("uzun tr", `${tr.length} karakter: "${tr}"`);
    if (words_(tr) > 5) U("uzun tr", `${words_(tr)} kelime: "${tr}"`);
    // Belirsiz artikelin isim karşılığına sızması ("der Tisch → bir masa")
    // gerçek bir kusur; ama "bir daha", "bir yerde", "bir araya gelmek" gibi
    // deyimlerde "bir" kelimenin parçası. Kural yalnızca isimlerde geçerli.
    if (k.typ === "Nomen" && /^bir\s/i.test(tr)) U("şüpheli tr", `"${tr}"`);
    if (/^(the|a|an)\s/i.test(tr)) U("şüpheli tr", `"${tr}" — İngilizce sızmış olabilir`);

    /* en — tek karşılık, fiiller "to" ile */
    if (/[,;/]/.test(en)) H("çok anlamlı en", `"${en}"`);
    if (/[()[\]]/.test(en)) H("parantezli en", `"${en}"`);
    if (en.length > 40) H("uzun en", `${en.length} karakter: "${en}"`);
    if (TR_HARF.test(en)) H("dil karışması", `en alanında Türkçe harf: "${en}"`);
    if (en.toLocaleLowerCase("tr-TR") === tr.toLocaleLowerCase("tr-TR"))
      U("tr = en", `"${tr}" — ikisi aynı, alıntı kelime değilse hata`);
    /**
     * Fiil mi?
     *
     * Türkçe mastar eki `-mek`/`-mak` ile bittiği için karşılık genelde bunu
     * ele veriyor, ama Türkçede aynı ekle biten **isimler** de var: "ekmek"
     * (das Brot) ve "yemek" (das Essen). Bunlar fiil sayılınca denetleyici
     * `en` alanında "to …" istiyor ve ajanı `"to bread"` yazmaya ya da
     * karşılığı bozmaya zorluyordu — nitekim iki pakette tam olarak bu oldu.
     * Kaynak zaten isim diyorsa ek yanıltıcıdır ve kaynak kazanır.
     */
    const fiilMi = k.typ === "Verb" || (k.typ !== "Nomen" && /(mek|mak)$/.test(tr));
    // Kip fiillerinin İngilizce karşılığı mastar almaz: "möchten" → "would
    // like", "dürfen" → "may". Kural yalnızca "to …" kabul edince ajan
    // möchten'e wollen ile birebir aynı karşılığı ("to want") vermek zorunda
    // kaldı ve iki kelime hiçbir turda ayırt edilemez hâle geldi.
    const fiilBicimi = /^(to|would|can|may|must|should|shall|might)\s/;
    if (fiilMi && !fiilBicimi.test(en))
      H("fiilde mastar yok", `"${en}" — fiiller "to …" (ya da kip fiili) biçiminde yazılır`);
    if (!fiilMi && /^to\s/.test(en)) U("fiil olmayanda to", `"${en}"`);

    /* beispiel — tek, tam, kelimeyi içeren cümle */
    if (!/[.!?]$/.test(bsp)) H("bozuk cümle", `sonu noktalama değil: "${bsp}"`);
    if (/^\d+[.)]/.test(bsp) || /\s\d+\.\s/.test(bsp)) H("numaralı derleme", `"${bsp}"`);
    if (/\bvergl\b|\bsiehe\b|\bvgl\./i.test(bsp)) H("sözlük artığı", `"${bsp}"`);
    if (/\s\/\s|\S\/\s|\s\/\S/.test(bsp)) H("varyant listesi", `eğik çizgi: "${bsp}"`);
    if (sentenceCount(bsp) > 1) H("çok cümleli", `"${bsp}"`);
    const n = words_(bsp);
    if (n < 3 || n > 13) H("cümle uzunluğu", `${n} kelime: "${bsp}"`);
    else if (n < 4 || n > 12) U("cümle uzunluğu", `${n} kelime: "${bsp}"`);
    if (!contains(bsp, de)) H("kelime cümlede yok", `"${de}" ∉ "${bsp}"`);
    if (!/^[A-ZÄÖÜ„"»]/.test(bsp)) U("küçük harfle başlıyor", `"${bsp}"`);

    /* çeviriler */
    for (const [ad, metin] of [["beispielTr", bspTr], ["beispielEn", bspEn]]) {
      if (!metin) continue;
      if (/^\d+[.)]/.test(metin) || /\s\d+\.\s/.test(metin)) H("numaralı çeviri", `${ad}: "${metin}"`);
      if (sentenceCount(metin) > 1) H("çok cümleli çeviri", `${ad}: "${metin}"`);
      if (!/[.!?…]$/.test(metin)) U("bozuk çeviri", `${ad} noktalama ile bitmiyor: "${metin}"`);
    }
    if (TR_HARF.test(bspEn)) H("dil karışması", `beispielEn Türkçe harf taşıyor: "${bspEn}"`);
    if (bspTr && bspTr === bspEn) H("aynı çeviri", "beispielTr ile beispielEn birebir aynı");
    if (/\?$/.test(bsp) !== /\?$/.test(bspTr)) U("soru uyuşmazlığı", `"${bsp}" ↔ "${bspTr}"`);
    if (/\?$/.test(bsp) !== /\?$/.test(bspEn)) U("soru uyuşmazlığı", `"${bsp}" ↔ "${bspEn}"`);
    const oran = (t) => (bsp.length ? t.length / bsp.length : 1);
    if (bspTr && (oran(bspTr) < 0.35 || oran(bspTr) > 2.5))
      U("çeviri uzunluğu", `beispielTr oransız: "${bsp}" ↔ "${bspTr}"`);
    if (bspEn && (oran(bspEn) < 0.35 || oran(bspEn) > 2.5))
      U("çeviri uzunluğu", `beispielEn oransız: "${bsp}" ↔ "${bspEn}"`);

    const trKey = tr.toLocaleLowerCase("tr-TR");
    trSayaci.set(trKey, [...(trSayaci.get(trKey) ?? []), de]);
  }

  /* Paket içi ikizler: aynı Türkçe karşılığı alan iki kelime, İngilizcede de
     aynıysa öğrenci ikisini hiçbir turda ayırt edemez. */
  for (const [k, list] of trSayaci) {
    if (list.length < 2) continue;
    const enler = new Set(
      list.map((de) => {
        const id = src.kelimeler.find((x) => x.de === de)?.id;
        return (byId.get(id)?.en ?? "").toLowerCase();
      }),
    );
    if (enler.size === 1) hatalar.push(`  [ayırt edilemez ikiz] "${k}" = ${list.join(", ")} (İngilizcesi de aynı)`);
    else uyarilar.push(`  [aynı tr] "${k}" = ${list.join(", ")} (İngilizceleri farklı)`);
  }

  return { paket, hatalar, uyarilar, madde: out.length };
}

/* ── çalıştır ───────────────────────────────────────────────────────────── */

const hepsi = readdirSync(IN)
  .filter((f) => f.endsWith(".json") && !f.startsWith("_"))
  .map((f) => f.replace(/\.json$/, ""))
  .sort();
const secili =
  ARG === "all" ? hepsi : hepsi.filter((p) => p === ARG || p.startsWith(`${ARG}-`));
if (!secili.length) {
  console.error(`"${ARG}" ile eşleşen paket yok.`);
  process.exit(1);
}

let hata = 0;
let uyari = 0;
let bekleyen = 0;
let madde = 0;
for (const p of secili) {
  const r = denetle(p);
  if (r.yok) {
    bekleyen++;
    if (secili.length === 1) console.log(`${p}: çıktı yok`);
    continue;
  }
  hata += r.hatalar.length;
  uyari += r.uyarilar.length;
  madde += r.madde;
  if (r.hatalar.length || r.uyarilar.length) {
    console.log(`\n${p}  (${r.madde} madde)`);
    r.hatalar.forEach((h) => console.log(h));
    r.uyarilar.forEach((u) => console.log(u));
  } else if (secili.length === 1) {
    console.log(`${p}: ${r.madde} madde, temiz.`);
  }
}

/**
 * Paketler arası ayırt edilemez ikizler.
 *
 * Paket içi denetim bunu göremiyor: `man` A1'in ilk paketinde, `Mensch` çok
 * sonrasında ve ikisi de "insan" almaya aday. Aynı Türkçe **ve** aynı
 * İngilizce karşılığı alan iki farklı kelime hiçbir turda ayırt edilemez —
 * çoktan seçmelide iki özdeş şık çıkar ve hangisi seçilirse seçilsin biri
 * yanlış sayılır.
 *
 * Uyarı, hata değil: ikisi gerçekten eşanlamlıysa (anfangen/beginnen) aynı
 * karşılığı almaları doğrudur ve zorlama bir ayrım Türkçeyi bozar.
 */
if (secili.length > 1) {
  const kaynak = new Map();
  for (const p of hepsi)
    for (const k of JSON.parse(readFileSync(`${IN}/${p}.json`, "utf8")).kelimeler)
      kaynak.set(k.id, k.de);

  const gruplar = new Map();
  for (const p of secili) {
    if (!existsSync(`${OUT}/${p}.json`)) continue;
    let rows;
    try {
      rows = JSON.parse(readFileSync(`${OUT}/${p}.json`, "utf8"));
    } catch {
      continue;
    }
    for (const r of rows) {
      if (!r?.tr || !r?.en) continue;
      const key = `${r.tr.toLocaleLowerCase("tr-TR")}|${r.en.toLowerCase()}`;
      if (!gruplar.has(key)) gruplar.set(key, []);
      gruplar.get(key).push(`${kaynak.get(r.id) ?? r.id} [${p}]`);
    }
  }

  const ikizler = [...gruplar].filter(([, list]) => list.length > 1);
  if (ikizler.length) {
    console.log("\n── paketler arası ayırt edilemez ikizler ──");
    for (const [key, list] of ikizler.slice(0, 40))
      console.log(`  "${key.split("|")[0]}" / "${key.split("|")[1]}" = ${list.join(", ")}`);
    if (ikizler.length > 40) console.log(`  … ve ${ikizler.length - 40} tane daha`);
    uyari += ikizler.length;
  }
}

console.log(
  `\nözet: ${secili.length - bekleyen}/${secili.length} paket üretilmiş, ${madde} madde · ${hata} hata · ${uyari} uyarı`,
);
process.exit(hata ? 1 : 0);
