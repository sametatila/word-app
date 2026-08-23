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

/* ── Almanca biçim yardımcıları ─────────────────────────────────────────── */

/**
 * Umlaut ve ß düzleştirilir: çekim gövde ünlüsünü değiştirir (Buch → Bücher).
 * Tire de düşer — madde başlığı da cümle de tireli yazıldığı hâlde kök
 * karşılaştırması tireyi atıp "sbahn" arıyor ve "S-Bahn" hiç bulunamıyordu.
 */
const flat = (t) =>
  String(t ?? "")
    .toLowerCase()
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .replace(/ß/g, "ss")
    .replace(/-/g, "");

/**
 * Çekimde kökten kopabilen ön ekler — **uzundan kısaya** sıralı.
 *
 * Sıra bir üslup meselesi değil: düzenli ifade alternatifleri soldan sağa
 * denendiği için "zu" listede "zusammen"den önce gelince "zusammenkommen"
 * maddesi "zu" + "sammenkommen" diye bölünüyor ve cümlede ayrı bir "zu"
 * arandığı için doğru cümle ("Die Familie kommt zusammen.") reddediliyordu.
 */
const SEPARABLE =
  /^(gegenuber|hinunter|herunter|zusammen|entgegen|spazieren|nebenan|entlang|stehen|bleiben|kennen|sitzen|liegen|heruber|hinuber|herein|hinein|herauf|hinauf|voraus|vorbei|vorher|zurecht|heraus|hinaus|zuruck|kaputt|weiter|wieder|nieder|dabei|davon|daran|darauf|durch|statt|unter|drauf|fern|fest|fort|frei|heim|hoch|nach|teil|uber|dran|drin|wahr|warm|rein|raus|fern|frei|los|auf|aus|bei|ein|her|hin|mit|vor|weg|weh|ab|an|um|zu)(.{3,})$/;

/**
 * Ön ekler düzleştirilmiş biçimde yazılıyor (`zuruck`, `uber`, `gegenuber`):
 * karşılaştırma umlautları düşürülmüş metin üzerinde yapılıyor ve umlautlu
 * yazılan alternatifler hiçbir zaman eşleşmiyordu — `zurückfahren` maddesi
 * bu yüzden ayrılabilir fiil olarak hiç tanınmadı.
 */

/**
 * Gövde ünlüsü çekimde tanınmayacak kadar değişen fiiller.
 *
 * Umlaut düzleştirmesi çekimlerin çoğunu kurtarıyor (fahren → fährt, halten →
 * hält), ama Almancanın güçlü fiillerinde değişen şey ünlünün kendisi:
 * sein → ist, nehmen → nimmt, gehen → ging. Bu maddelerde denetleyici doğru
 * cümleyi "kelime yok" diye reddediyordu — ve reddettiği şey en sık kullanılan,
 * yani en çok cümle üretilen kelimelerdi. Liste kısa tutuldu: yalnızca
 * düzleştirmenin yetmediği fiiller var, düzenli olanlar kurala bırakıldı.
 */
const IRREGULAR = {
  sein: ["ist", "sind", "bin", "bist", "seid", "war", "wären", "gewesen"],
  haben: ["hat", "hab", "hast", "habt", "hatte", "gehabt"],
  werden: ["wird", "wirst", "wurde", "geworden", "würde"],
  gehen: ["ging", "gegangen"],
  stehen: ["stand", "gestanden"],
  tun: ["tat", "getan", "tut"],
  wissen: ["weiss", "wusste", "gewusst"],
  nehmen: ["nimm", "nahm", "genommen"],
  sprechen: ["sprich", "sprach", "gesprochen"],
  geben: ["gib", "gab", "gegeben"],
  sehen: ["sieh", "sah", "gesehen"],
  essen: ["isst", "ass", "gegessen"],
  lesen: ["liest", "las", "gelesen"],
  helfen: ["hilf", "half", "geholfen"],
  treffen: ["triff", "traf", "getroffen"],
  denken: ["dachte", "gedacht"],
  kennen: ["kannte", "gekannt"],
  nennen: ["nannte", "genannt"],
  bringen: ["brachte", "gebracht"],
  kommen: ["kam", "gekommen"],
  mögen: ["mag", "mochte", "gemocht"],
  müssen: ["muss", "musste", "gemusst"],
  können: ["kann", "konnte", "gekonnt"],
  dürfen: ["darf", "durfte", "gedurft"],
  sollen: ["soll", "sollte"],
  wollen: ["will", "wollte"],
  bitten: ["bat", "gebeten"],
  sitzen: ["sass", "gesessen"],
  liegen: ["lag", "gelegen"],
  finden: ["fand", "gefunden"],
  trinken: ["trank", "getrunken"],
  gewinnen: ["gewann", "gewonnen"],
  beginnen: ["begann", "begonnen"],
  schwimmen: ["schwamm", "geschwommen"],
  rufen: ["rief", "gerufen"],
  schreiben: ["schrieb", "geschrieben"],
  bleiben: ["blieb", "geblieben"],
  steigen: ["stieg", "gestiegen"],
  schneiden: ["schnitt", "geschnitten"],
  ziehen: ["zog", "gezogen"],
  fliegen: ["flog", "geflogen"],
  verlieren: ["verlor", "verloren"],
  schließen: ["schloss", "geschlossen"],
  bieten: ["bot", "geboten"],
  vergessen: ["vergisst", "vergass"],
  empfehlen: ["empfiehlt", "empfahl", "empfohlen"],
  // Ön ekli bileşiklerde gövde olarak aranan güçlü fiiller: "zurückbringen"
  // → "zurückgebracht", "übertreiben" → "übertrieben". Ön ek ayrıldığında
  // ya da ayrılmadığında gövde yine bu biçimlere giriyor.
  treiben: ["trieb", "getrieben"],
  brechen: ["bricht", "brach", "gebrochen"],
  werfen: ["wirft", "warf", "geworfen"],
  fangen: ["fing", "gefangen"],
  laden: ["lud", "geladen"],
  raten: ["riet", "geraten"],
  schlagen: ["schlug", "geschlagen"],
  halten: ["hielt", "gehalten"],
  fallen: ["fiel", "gefallen"],
  laufen: ["lief", "gelaufen"],
  tragen: ["trug", "getragen"],
  waschen: ["wusch", "gewaschen"],
  springen: ["sprang", "gesprungen"],
  sinken: ["sank", "gesunken"],
  weisen: ["wies", "gewiesen"],
  greifen: ["griff", "gegriffen"],
};

/**
 * Madde başlığından gerçek kelimelere açılım.
 * "der/die Bekannte" → ["der Bekannte","die Bekannte"], "gern(e)" → ["gern","gerne"],
 * "sich freuen" → ["freuen"] (dönüşlü zamir cümlede ayrı durur ve çekimlenir).
 */
function forms(raw) {
  const out = new Set();
  const paren = raw.includes("(")
    ? [raw.replace(/\(([^)]*)\)/g, "$1"), raw.replace(/\([^)]*\)/g, "")]
    : [raw];
  for (const variant of paren) {
    for (const alt of variant.split("/")) {
      const s = alt
        .replace(/^\s*(der|die|das)\s+/i, "")
        .replace(/\bsich\b/gi, " ")
        .replace(/[.,]+$/, "")
        .replace(/\s+/g, " ")
        .trim();
      if (s) out.add(s);
    }
  }
  // Başlığın kendisi dönüşlü zamirse ("sich") geriye hiçbir biçim kalmıyor ve
  // boş liste her cümleyi reddediyordu: `[].some(...)` her zaman false.
  return out.size ? [...out] : [raw.trim()];
}

/** Bir parçanın çekimli hâllerini yakalayan en kısa güvenli kök. */
function root(part) {
  let s = flat(part).replace(/[^a-z]/g, "");
  s = s.replace(/(ern|eln|en|er|es|em|st|te|n|e|s)$/, "");
  if (s.length < 3) s = flat(part).replace(/[^a-z]/g, "");
  return s;
}

/**
 * Ön ekli fiilin cümlede alabileceği bitişik biçimler.
 *
 * Üç ayrı durum var ve üçü de doğru Almanca:
 *   ayrılabilir Perfekt   "zurückfahren"  → "ist zurück**ge**fahren"
 *   ayrılmaz Perfekt      "übertreiben"   → "hat übertrieben"   (ge yok)
 *   gövdesi güçlü fiil    "zurückbringen" → "hat zurückgebracht"
 *
 * Kök araması hiçbirini bulamıyordu ve ajanlar doğru Perfekt cümlelerini
 * ayrılmış Präsens'e çevirmek zorunda kalıyordu — yani denetleyici, dilin
 * doğal biçimini veriden çıkarıyordu.
 */
function prefixedForms(part) {
  const bare = flat(part).replace(/[^a-z]/g, "");
  const sep = bare.match(SEPARABLE);
  if (!sep) return [];
  const out = [];
  const govde = root(sep[2]);
  if (govde.length >= 3) out.push(`${sep[1]}ge${govde}`, `${sep[1]}${govde}`);
  for (const form of IRREGULAR[sep[2]] ?? []) {
    const f = flat(form).replace(/[^a-z]/g, "");
    out.push(`${sep[1]}${f}`);
  }
  return out;
}

/**
 * Cümle kelimeyi taşıyor mu?
 *
 * Gevşek olması bilinçli: amaç iyi işi reddetmek değil, `lang` için
 * "Das Kleid ist zu kurz." ya da `Disco` için "in die Diskothek" gibi
 * kelimenin hiç geçmediği cümleleri yakalamak. Çok parçalı maddelerde
 * ("Rad fahren") parçaların hepsi aranır.
 */
function contains(sentence, headword) {
  const hay = flat(sentence);
  const kok = (r) => hay.includes(r.slice(0, Math.max(4, r.length - 2)));
  const kelime = (t) => new RegExp(`(?<![a-z])${t}(?![a-z])`).test(hay);
  const bas = (t) => new RegExp(`(?<![a-z])${t}`).test(hay);

  /**
   * Bir kökün cümlede aranışı, uzunluğa göre üç kademe.
   *
   * İki harfli kök tam kelime olmalı: "ab" gövde sayılsa "aber" ve "Abend"
   * de sayılırdı. Üç harfli kök kelime **başı** olmalı: "geh" tam kelime
   * aransa "Ich gehe" eşleşmezdi. Dörtten uzun kök serbest gövdedir; bileşik
   * kelimede ortada da durabilir ("Rucksack" içindeki "sack").
   */
  const varMi = (r) => (r.length <= 2 ? kelime(r) : r.length === 3 ? bas(r) : kok(r));

  const parcaVar = (part) => {
    const bare = flat(part).replace(/[^a-z]/g, "");
    const r = root(part);
    if (!r) return true;
    if (varMi(r)) return true;

    // Perfekt: "hat angerufen", "ist zurückgefahren", "hat übertrieben".
    if (prefixedForms(part).some((f) => kok(f))) return true;

    // Ayrılabilir fiil: ön ek cümlenin sonuna kaçar ("Siehst du viel fern?").
    // Ön ekin ayrı bir kelime olarak bulunması şart, kök ise gövde olarak.
    const sep = bare.match(SEPARABLE);
    if (sep && kelime(sep[1])) {
      const govde = root(sep[2]);
      if (govde.length >= 3 && kok(govde)) return true;
      const irrSep = IRREGULAR[sep[2]] ?? IRREGULAR[`${sep[2]}en`];
      if (irrSep?.some((f) => varMi(flat(f)))) return true;
    }

    // Güçlü fiiller: gövde ünlüsü değiştiği için kök araması işe yaramıyor.
    const irr = IRREGULAR[part.toLowerCase().replace(/[.,]+$/, "")] ?? IRREGULAR[bare];
    return irr ? irr.some((f) => varMi(flat(f).replace(/[^a-z]/g, ""))) : false;
  };

  return forms(headword).some((form) => form.split(/\s+/).every(parcaVar));
}

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
