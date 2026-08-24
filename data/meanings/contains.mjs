/**
 * Almanca madde başlığı ile cümle eşleştirmesi.
 *
 * Ayrı bir modül çünkü iki denetleyici birden kullanıyor: kelime hattı
 * (data/meanings/check.mjs) ve beceri sözlükçesi (data/skills/check.mjs).
 * Kural iki kopya hâlinde yaşasaydı biri diğerinden sapardı ve hangisinin
 * doğru olduğu belli olmazdı — bu tam olarak daha önce üç ayrı kopyayla
 * başımıza geldi (bkz. src/lib/headword.ts).
 *
 * Buradaki gevşeklik bilinçli: amaç iyi işi reddetmek değil, kelimenin hiç
 * geçmediği durumları yakalamak. Kaynak Goethe verisindeki 8264 cümlede
 * yanlış ret oranı %0.5 ve kalanı ağırlıkla gerçek kusur.
 */

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
    .replace(/-/g, "")
    // Rakamlar da düşer: kök kurulurken harf dışı her şey atılıyordu ama cümle
    // rakamı koruyordu, yani iki taraf farklı normalleştiriliyordu ve
    // "CO2-Ausstoß" kendi cümlesinde bulunamıyordu.
    .replace(/\d/g, "");

/**
 * Çekimde kökten kopabilen ön ekler.
 *
 * Ön ekler düzleştirilmiş biçimde yazılıyor (`zuruck`, `uber`, `gross`):
 * karşılaştırma umlautları düşürülmüş metin üzerinde yapılıyor ve umlautlu
 * yazılan alternatifler hiçbir zaman eşleşmiyordu — `zurückfahren` maddesi
 * bu yüzden ayrılabilir fiil olarak hiç tanınmadı.
 *
 * Sıfat ve isim kökenli ön ekler (`still`, `klar`, `bekannt`, `gut`, `offen`,
 * `gross`, `richtig`, `gleich`, `dar`, `bereit`…) listede hiç yoktu. Bunlar
 * Almancada çok üretken ve o maddelerin **hiçbir** tipik biçimi tanınmıyordu:
 * "hat stillgelegt", "gab … bekannt", "hat klargestellt", "hat gutgeschrieben",
 * "hat dargestellt". Ajanlar ya doğru cümleyi bozuyor ya da eski imlaya
 * kaçıyordu; ikisi de sessiz kalite kaybı.
 *
 * Aynı boşluğun isim kökenli yarısı sonra çıktı: `preis`, `stand`, `acht`,
 * `wett`, `fehl`, `haus`, `mass`, `kund`, `irre`, `voll`. Bunlarda **yalnızca**
 * ayrılmış hâl düşüyordu — "gibt … preis" reddedilirken bitişik mastar ve
 * ortaç ("preisgeben", "preisgegeben") geçiyordu. Yani madde denetleyiciden
 * geçiyor ama en tipik cümlesini kuramıyordu; kusur ancak ajan doğru cümleyi
 * bırakıp bildirdiği için görüldü.
 *
 * Sıra artık önemsiz — `splits()` bütün bölünmeleri deniyor, yalnızca en
 * uzununu değil. Tek bölünme iki yönden birden yanlıştı: kısa ön ek öne
 * geçince "zusammenkommen" maddesi "zu" + "sammenkommen" diye bölünüyordu,
 * uzun ön ek öne geçince de "vorherrschen" maddesi "vorher" + "rschen" diye —
 * oysa doğrusu "vor" + "herrschen" ("hat vorgeherrscht"). Hepsini denemek
 * ikisini birden çözüyor.
 */
const PREFIXES = [
  "auseinander",
  "gegenuber",
  "hinunter",
  "herunter",
  "zusammen",
  "entgegen",
  "spazieren",
  "nebenan",
  "entlang",
  "richtig",
  "bekannt",
  "bereit",
  "zugute",
  "stehen",
  "bleiben",
  "kennen",
  "sitzen",
  "liegen",
  "heruber",
  "hinuber",
  "herein",
  "hinein",
  "herauf",
  "hinauf",
  "voraus",
  "vorbei",
  "vorher",
  "zurecht",
  "heraus",
  "hinaus",
  "zuruck",
  "kaputt",
  "weiter",
  "wieder",
  "nieder",
  "gleich",
  "gegen",
  "wider",
  "offen",
  "bloss",
  "gross",
  "still",
  "brach",
  "dabei",
  "davon",
  "daran",
  "darauf",
  "durch",
  "statt",
  "unter",
  "drauf",
  "fern",
  "fest",
  "fort",
  "frei",
  "heim",
  "hoch",
  "nach",
  "teil",
  "uber",
  "dran",
  "drin",
  "wahr",
  "warm",
  "rein",
  "raus",
  "klar",
  "nahe",
  "inne",
  "preis",
  "stand",
  "wett",
  "fehl",
  "haus",
  "mass",
  "kund",
  "irre",
  "voll",
  "acht",
  "gut",
  "dar",
  "los",
  "auf",
  "aus",
  "bei",
  "ein",
  "her",
  "hin",
  "mit",
  "vor",
  "weg",
  "weh",
  "ab",
  "an",
  "um",
  "zu",
  "ob",
];

/**
 * Bir gövdenin bütün ön ek bölünmeleri — zincirlenmiş olanlar dâhil.
 *
 * Ön ekler üst üste binebiliyor: "heranziehen" = her + an + ziehen,
 * "wiederherstellen" = wieder + her + stellen, "vorwegnehmen" = vor + weg +
 * nehmen, "zuwiderhandeln" = zu + wider + handeln. Ortaç "ge" en içteki
 * gövdenin önüne giriyor ("herangezogen", "vorangetrieben"), yani zincirin
 * tamamı tek bir ön ek gibi davranıyor. Tek kademeli bölünme bu ailenin
 * tamamını kaçırıyor ve o maddeler doğal Perfekt cümlesi üretemiyordu.
 */
function splits(bare) {
  const out = [];
  const yürü = (onek, kalan) => {
    if (onek) out.push([onek, kalan]);
    for (const p of PREFIXES)
      if (kalan.startsWith(p) && kalan.length - p.length >= 3)
        yürü(onek + p, kalan.slice(p.length));
  };
  yürü("", bare);
  return out;
}

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
  // Ayrılabilir bileşiklerde çok üretken olanlar: anwerben/abwerben,
  // antreten/auftreten/eintreten/zurücktreten. Bunlar listede yokken o
  // maddelerin en tipik Präsens cümlesi ("wirbt … an", "tritt … an")
  // hiç üretilemiyordu.
  werben: ["wirbt", "warb", "geworben"],
  treten: ["tritt", "trat", "getreten"],
  gelten: ["gilt", "galt", "gegolten"],
  messen: ["misst", "mass", "gemessen"],
  stehlen: ["stiehlt", "stahl", "gestohlen"],
  geschehen: ["geschieht", "geschah"],
  stossen: ["stösst", "stiess", "gestossen"],
  heben: ["hob", "gehoben"],
  biegen: ["bog", "gebogen"],
  lügen: ["log", "gelogen"],
  // Düzleştirme bu üçünde de yetmiyor: gövde ünlüsü Ablaut kurallarının
  // dışında değişiyor ("gären" → "gegoren") ya da gövde iki harfe iniyor
  // ("säen" → "sät", "ölen" → "ölt") ve kök araması üç harften kısa köke
  // inmiyor. Üçü de kendi ortacında bulunamıyordu, yani hiçbir doğru cümle
  // üretemiyorlardı.
  gären: ["gor", "gegoren"],
  säen: ["sät", "gesät"],
  ölen: ["ölt", "geölt"],
};

/**
 * Düzensiz fiil arama — anahtarlar umlautlu yazılı, aranan gövde ise
 * düzleştirilmiş oluyor. `IRREGULAR["mogen"]` hiçbir zaman tutmuyordu, yani
 * ön ekli bileşiklerde ("vermögen", "zurückschließen") düzensiz biçimler
 * aranmadan geçiliyordu.
 */
const IRREGULAR_FLAT = new Map(
  Object.entries(IRREGULAR).map(([k, v]) => [
    flat(k).replace(/[^a-z]/g, ""),
    v,
  ]),
);
/**
 * Ayrılmayan ön ekler.
 *
 * Bunlar güçlü fiilin gövdesini gizliyor: "erfahren" düzensizler listesinde
 * yok ama "fahren" var, ve "erfuhr" ancak ön ek soyulunca bulunabiliyor. Sınıf
 * üretken (erfahren, versprechen, bekommen, entnehmen, zerbrechen…) ve kural
 * olmadan her biri listeye tek tek yazılmak zorundaydı — yazılmayanların
 * Präteritum cümlesi reddediliyordu.
 */
const AYRILMAYAN = ["be", "emp", "ent", "er", "ge", "miss", "ver", "zer"];

/**
 * "da(r)-" / "wo(r)-" ile kaynaşabilen edatlar.
 *
 * Çok parçalı maddede edat ayrı bir sözcük olarak aranıyor, oysa en tipik
 * cümlede kaynaşmış oluyor: `sich freuen auf` için "Ich freue mich **darauf**,
 * Sie kennenzulernen." Kaynaşmış hâl aranmayınca doğru cümle reddediliyordu.
 */
const EDATLAR = new Set([
  "auf",
  "an",
  "in",
  "uber",
  "mit",
  "von",
  "zu",
  "fur",
  "bei",
  "nach",
  "um",
  "aus",
  "vor",
  "unter",
  "gegen",
]);

const irrForms = (gövde) => {
  const f = flat(gövde).replace(/[^a-z]/g, "");
  return (
    IRREGULAR[gövde] ??
    IRREGULAR_FLAT.get(f) ??
    IRREGULAR_FLAT.get(`${f}en`) ??
    []
  );
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

/** Çekim ekleri — her biri ayrı ayrı denenir, biri kısa kök bırakırsa atlanır. */
const SUFFIXES = [
  "ern",
  "eln",
  "en",
  "er",
  "es",
  "em",
  "st",
  "te",
  "n",
  "e",
  "s",
];

/**
 * Bir parçanın aranacak kökleri — kırpılmamış hâli de dâhil.
 *
 * Tek bir kök yetmiyor çünkü kırpma bazen fazla götürüyor: "Wurst" fiil eki
 * sanılan "-st" atılınca "wur"a iniyor ve "Currywurst" içinde bulunamıyordu.
 * Bu, doğru bir cümlenin reddedilmesi demekti — ve reddedilen cümleyi ajan
 * yeniden yazıyordu, yani denetleyici sağlam veriyi bozuyordu.
 *
 * Sınırsız kırpma tehlikeli olurdu: "Disco" üç harfe inseydi "Diskothek" de
 * kabul edilirdi — oysa yakalanması gereken tam olarak o.
 */
function roots(part) {
  const bare = flat(part).replace(/[^a-z]/g, "");
  const out = new Set([bare]);
  for (const suf of SUFFIXES) {
    if (bare.endsWith(suf) && bare.length - suf.length >= 3)
      out.add(bare.slice(0, -suf.length));
  }
  return [...out].filter(Boolean);
}

/**
 * Güçlü fiilin gövde ünlüsünün aldığı biçimler (Ablaut).
 *
 * Almancanın güçlü fiillerinde çekim ekini değil ünlüyü değiştirir:
 * finden → fand → gefunden, sprechen → sprach → gesprochen. Düzensiz fiil
 * listesi yalın maddeleri kurtarıyor ama ön ekli bileşiklerini kurtarmıyor —
 * "verschwinden" ("ist verschwunden") ve "versprechen" ("hat versprochen")
 * bu yüzden hiçbir doğal Perfekt cümlesinde bulunamıyordu.
 *
 * Yalnızca son gövde ünlüsü ve yalnızca iki Ablaut dizisi deneniyor
 * (i→a/u, e→a/o): daha geniş bir tarama "Disco" ile "Diskothek"i birbirine
 * karıştırma riskini geri getirirdi.
 */
function stemVariants(r) {
  const out = [];

  // Ünlü ikilisi değişen sınıflar. Tek harf değiştirmek bunları yakalamıyor
  // ve iki ayrı ajan doğal Perfekt cümlesini ("hat beschlossen",
  // "hat verschrieben") kurup denetleyiciye takıldığı için Präsens'e
  // çevirmek zorunda kaldı — yani kural, dilin tipik biçimini veriden
  // çıkarıyordu.
  const ciftler = [
    ["ie", "o"], // schließen → schloss, fliegen → flog, verlieren → verlor
    ["ei", "ie"], // schreiben → schrieb, bleiben → blieb
    ["ei", "i"], // schneiden → schnitt, greifen → griff
  ];
  for (const [from, to] of ciftler) {
    const i = r.lastIndexOf(from);
    if (i >= 0) out.push(r.slice(0, i) + to + r.slice(i + from.length));
  }

  // `a` da kaynak ünlü: Almancanın en kalabalık güçlü sınıfı buradan geçiyor
  // ve hiç aranmıyordu — fahren → fuhr, tragen → trug, halten → hielt,
  // fangen → fing. Kusur `erfahren von` maddesinde görüldü: metinde
  // "Von manchen Verabredungen **erfuhr** ich zu spät." yazıyordu ve
  // denetleyici kelimeyi bulamıyordu.
  const son = r.search(/[iea](?=[^aeiou]*$)/);
  if (son >= 0)
    // e → i de gerekli: Präsens 3. tekil şahısta gövde inceliyor
    // (bewerben → bewirbt, sprechen → spricht, helfen → hilft).
    for (const v of r[son] === "i" ? ["a", "u"] : r[son] === "a" ? ["u", "ie", "i"] : ["a", "o", "i"])
      out.push(r.slice(0, son) + v + r.slice(son + 1));
  return out;
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
  const out = [];
  for (const [onek, kalan] of splits(bare)) {
    const govde = root(kalan);
    // "ge" Perfekt ortacı, "zu" ise mastar: ikisi de ön ek ile gövdenin arasına
    // giriyor ("ist abgeschoben", "um abzuschieben"). `zu`'lu mastar B2'den
    // itibaren çok yaygın ve tanınmadığında ajan doğal biçimden kaçınıyordu.
    //
    // Gövde ayrıca güçlü fiil olabiliyor ve ön ekle Ablaut aynı anda oluyor:
    // "ausweichen" → "ist ausgewichen". Ön ek ile ünlü değişimi ayrı ayrı
    // işlendiğinde bu biçim hiçbir kurala uymuyordu.
    if (govde.length >= 3)
      for (const g of [govde, ...stemVariants(govde)])
        out.push(`${onek}ge${g}`, `${onek}zu${g}`, `${onek}${g}`);
    for (const form of irrForms(kalan)) {
      const f = flat(form).replace(/[^a-z]/g, "");
      out.push(`${onek}${f}`);
    }
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
  /**
   * Kök araması: son iki harf çekimde değişebiliyor, o yüzden düşürülüyor.
   *
   * Taban dörtte kalıyor. Beşe çıkarmak `der Termin` gibi yanlış kabulleri
   * kapatıyor ("wei**term**ache") ama karşılığında doğru cümleleri reddetmeye
   * başlıyor: "Es tut mir leid…" (`leidtun`) ve "Lies die Aufgabe … durch!"
   * (`durchlesen`) ikisi de kusursuz Almanca ve ikisi de düşüyordu. Yanlış ret
   * yanlış kabulden tehlikeli — ret, ajanı doğru veriyi bozmaya itiyor; kabul
   * yalnızca bir uyarıyı susturuyor. Bu yüzden gevşek taraf seçildi ve
   * `der Termin` bilinen bir sınır olarak duruyor.
   */
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
  const varMi = (r) =>
    r.length <= 2 ? kelime(r) : r.length === 3 ? bas(r) : kok(r);

  const parcaVar = (part) => {
    const bare = flat(part).replace(/[^a-z]/g, "");
    const r = root(part);
    if (!r) return true;
    if (roots(part).some((c) => varMi(c))) return true;

    // Edat "darauf"/"worauf" içinde kaynaşmış olabilir (bkz. EDATLAR).
    if (EDATLAR.has(bare))
      for (const ön of ["da", "dar", "wo", "wor"])
        if (kelime(`${ön}${bare}`)) return true;

    // Üç harflik gövde kelime BAŞI olarak aranıyor (bkz. `varMi`), oysa
    // düzenli ortaçta gövde başta değil: "dösen" → "gedöst", "rügen" →
    // "gerügt", "fügen" → "gefügt". Bu fiiller kendi Perfekt cümlelerini hiç
    // kuramıyordu. Gevşeme ortaç/mastar imiyle sınırlı: aranan "ge"/"zu" ile
    // başlayan tam sözcük, serbest bir gövde değil.
    if (r.length === 3 && (bas(`ge${r}`) || bas(`zu${r}`))) return true;

    // Perfekt: "hat angerufen", "ist zurückgefahren", "hat übertrieben".
    if (prefixedForms(part).some((f) => kok(f))) return true;

    // Ablaut: "ist verschwunden", "hat versprochen".
    // Eşik dörde iniyor: "melken" kökü ("melk") beş harften kısa olduğu için
    // Ablaut hiç denenmiyordu ve "gemolken" bulunamıyordu.
    if (r.length >= 4 && stemVariants(r).some((f) => kok(f))) return true;

    // Ayrılabilir fiil: ön ek cümlenin sonuna kaçar ("Siehst du viel fern?").
    // Ön ekin ayrı bir kelime olarak bulunması şart, kök ise gövde olarak.
    //
    // Yalnızca mastar görünümlü parçalarda deneniyor: ayrılan şey **fiilin**
    // ön ekidir, ismin değil. Koşul yokken isimler kendi parçalarına bölünüp
    // metinde varmış sayılıyordu — `der Ausgleich` "aus … gleiche"den,
    // `der Nachteil` "nach … Vorteil"den, `der Beitrag` "bei … tragen"den.
    // Üçü de yanlış kabul ve üçünü de ayrı paket ajanları bildirdi. Bu yönde
    // hata masum değil: denetimin işi sözlükçede metinde hiç geçmeyen
    // kelimeleri bulmak ve kusur tam o aramayı köreltiyordu.
    if (/(en|n)$/.test(bare))
      for (const [onek, kalan] of splits(bare)) {
        if (!kelime(onek)) continue;
        const govde = root(kalan);
        if (govde.length >= 3 && kok(govde)) return true;
        // Ayrılmış hâlde de gövde ünlüsü değişiyor: "mitreißen" → "riss … mit",
        // "aufgeben" → "gab … auf". Ablaut yalnızca bitişik biçimlerde
        // deneniyordu, bu yüzden ayrılabilir güçlü fiillerin doğru Präteritum
        // cümleleri reddediliyor ve ajanlar Präsens'e çekilmek zorunda kalıyordu.
        if (govde.length >= 4 && stemVariants(govde).some((f) => kok(f)))
          return true;
        if (irrForms(kalan).some((f) => varMi(flat(f).replace(/[^a-z]/g, ""))))
          return true;
        // Gövdesi kısa olanlar ("einüben" → "übt … ein"). `root()` iki harften
        // kısa sonuçlarda kırpılmamış hâle geri döndüğü için buradaki gövde
        // ("ub") hiç üretilmiyor ve "übt" bulunamıyordu. Ön ekin cümlede ayrı
        // bir kelime olarak durduğu zaten doğrulandı; bu güçlü bir işaret
        // olduğu için gövde kelime BAŞI olarak aranıyor.
        const kisa = flat(kalan)
          .replace(/[^a-z]/g, "")
          .replace(/(en|n)$/, "");
        if (kisa.length >= 2 && bas(kisa)) return true;
      }

    // Ayrılmayan ön ekin altındaki güçlü gövde (bkz. AYRILMAYAN).
    for (const ön of AYRILMAYAN) {
      if (!bare.startsWith(ön) || bare.length - ön.length < 4) continue;
      const biçimler = irrForms(bare.slice(ön.length));
      if (biçimler.some((f) => kok(`${ön}${flat(f).replace(/[^a-z]/g, "")}`)))
        return true;
    }

    // Güçlü fiiller: gövde ünlüsü değiştiği için kök araması işe yaramıyor.
    const irr =
      IRREGULAR[part.toLowerCase().replace(/[.,]+$/, "")] ?? IRREGULAR[bare];
    return irr ? irr.some((f) => varMi(flat(f).replace(/[^a-z]/g, ""))) : false;
  };

  return forms(headword).some((form) => form.split(/\s+/).every(parcaVar));
}

export { contains, flat, roots, forms };
