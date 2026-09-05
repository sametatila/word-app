/**
 * Kümülatif kelime kapısı — İKİ denetleyicinin ORTAK çekirdeği.
 *
 * Beceri egzersizleri için yazılan mantık modül sınavı kâğıtlarına da gerekti.
 * Kopyalamak yerine buraya alındı: iki kopya ayrı ayrı eskiyor ve biri
 * diğerinin yakaladığını kaçırmaya başlıyor — dump-skills betiğinde tam bu
 * oldu, bayat bir kopya bir ünitenin egzersizlerini aylarca mobile taşımadı.
 *
 * Verdiği şey: bir ünitenin sonuna kadar ÖĞRETİLMİŞ sözcük kümesi (`cum`) ve
 * bir metnin o kümenin dışına ne kadar çıktığını ölçen `olc`.
 *
 * Kesin bir kapı DEĞİL: çekimli biçim ve özel ad yanlış alarm üretebilir.
 * Amaç oranı görmek ve gözden kaçan ağır kelimeyi yakalamak.
 */
const fs = require("fs");
const R = process.cwd();

// çok sık işlev sözcükleri + sayı + selam: her ünitede serbest
const SERBEST = new Set(`der die das den dem des ein eine einen einem einer eines kein keine keinen
ich du er sie es wir ihr mich dich sich uns euch mir dir ihm ihn ihnen mein meine meinen meinem meiner
dein deine deinen deinem deiner sein seine seinen seinem ihre ihren ihrem unser unsere euer eure und oder aber denn dass weil wenn als ob wie wo woher wohin
zu in an auf aus bei mit nach von vor über unter für um durch gegen ohne seit bis ab nicht ja nein doch man
ist sind bin bist war waren hat habe haben hast wird werden kann können muss müssen will
wurde wurden würde würden hatte hatten musste mussten konnte konnten wollte wollten sollte sollten durfte durften
gewesen geworden musst kannst willst sollst darfst magst möchte möchten wisst weiß weißt wusste wussten
gekonnt gemusst gedurft gewollt gesollt
wäre wären hätte hätten könnte könnten müsste müssten sollte wollte dürfte ginge käme gäbe
auch noch nur schon sehr hier da dann jetzt heute sehr viel mehr alle etwas nichts
guten tag morgen abend hallo bitte danke herr frau sie ihnen ihr
grüßen grüße geehrte geehrter damen herren freundlichen
null eins zwei drei vier fünf sechs sieben acht neun zehn elf zwölf zwanzig dreißig hundert tausend
euro uhr jahre jahr person personen gruppe kurs a1 a2 b1
oh ok ach na so
richtig falsch wer welche welcher welches warum wann
problem moment zusammen jeden monat
im am zum zur beim vom ins aufs
machen macht soll sollen heißt bin`.split(/\s+/).filter(Boolean));

// Havuzun TAMAMI (her seviye): özel ad ayıklaması için — bir sözcük havuzda
// hiç yoksa ve metinde büyük harfle geçiyorsa büyük olasılıkla bir isim
// (Emma, Bremen, Türkei). Bunları "seviye dışı kelime" saymak yanıltıcı.
const pool = require(`${R}/data/app/words.json`);
const havuzKok = new Set();
for (const r of pool) for (const w of String(r.de).toLowerCase().match(/[a-zäöüß]{3,}/g) || []) havuzKok.add(w);

// Tireli bileşik ("E-Mail", "Deutsch-Start") metinde parçalanıp geçiyor;
// izin kümesine parçalarıyla girmeli, yoksa öğretilen sözcük kayma sayılır.
const norm = (s) => String(s || "").toLowerCase().replace(/^(der|die|das)\s+/, "").trim();
const parcala = (s) => norm(s).split(/[\s\-]+/).filter(Boolean);

// Gün ve ay adları büyük harfle yazılır ve havuzda olmayabilir, ama ÖZEL AD
// DEĞİL — öğretilmesi gerekir; muafiyet onları geçirmemeli.
const TAKVIM = new Set(["montag", "dienstag", "mittwoch", "donnerstag", "freitag",
  "samstag", "sonntag", "januar", "februar", "märz", "april", "mai", "juni",
  "juli", "august", "september", "oktober", "november", "dezember"]);

const AYRILABILIR = /^(an|auf|aus|ein|mit|nach|vor|zu|ab|bei|los|weg|zurück)/;

/**
 * Düzensiz ortaç ve geçmiş — kural üretemediklerimiz.
 *
 * Ünlü değişimi kuralı güçlü fiillerin çoğunu yakalıyor ama en sık kullanılan
 * yirmi kadarı kuralsız (nehmen→genommen, gehen→gegangen). Bunlar her B1
 * metninde geçiyor ve her seferinde ÖĞRETİLEN fiil kayma sayılıyordu.
 * Liste bilerek kısa: yalnız kuralın üretemediği, çok sık biçimler.
 */
const DUZENSIZ = {
  nehmen: ["nimmt", "nahm", "genommen"], gehen: ["geht", "ging", "gegangen"],
  kommen: ["kommt", "kam", "gekommen"], sein: ["war", "waren", "gewesen"],
  werden: ["wird", "wurde", "geworden"], haben: ["hat", "hatte", "gehabt"],
  finden: ["findet", "fand", "gefunden"], geben: ["gibt", "gab", "gegeben"],
  sprechen: ["spricht", "sprach", "gesprochen"], schreiben: ["schreibt", "schrieb", "geschrieben"],
  lesen: ["liest", "las", "gelesen"], sehen: ["sieht", "sah", "gesehen"],
  stehen: ["steht", "stand", "gestanden"], verstehen: ["versteht", "verstand", "verstanden"],
  bringen: ["bringt", "brachte", "gebracht"], denken: ["denkt", "dachte", "gedacht"],
  wissen: ["weiß", "wusste", "gewusst"], bleiben: ["bleibt", "blieb", "geblieben"],
  helfen: ["hilft", "half", "geholfen"], essen: ["isst", "aß", "gegessen"],
  fahren: ["fährt", "fuhr", "gefahren"], laufen: ["läuft", "lief", "gelaufen"],
  tun: ["tut", "tat", "getan"], halten: ["hält", "hielt", "gehalten"],
  ziehen: ["zieht", "zog", "gezogen"], schließen: ["schließt", "schloss", "geschlossen"],
  entscheiden: ["entscheidet", "entschied", "entschieden"], bekommen: ["bekommt", "bekam", "bekommen"],
  // Anlatı üniteleri (als/wenn) bu dördünü sürekli Präteritum'da kullanıyor ve
  // ünlü değişimleri kural tablosunda yok: a→ie, a→i, a→u, u→ie.
  fallen: ["fällt", "fiel", "gefallen"], fangen: ["fängt", "fing", "gefangen"],
  tragen: ["trägt", "trug", "getragen"], rufen: ["ruft", "rief", "gerufen"],
  // Karma fiil: ünlü DEĞİŞİR ama ek ZAYIF kalır (kennen → kannte). Ne ünlü
  // kuralı ne zayıf kural tek başına üretebiliyor. denken/bringen zaten yukarıda.
  kennen: ["kennt", "kannte", "gekannt"], sitzen: ["sitzt", "saß", "gesessen"],
  schreien: ["schreit", "schrie", "geschrien"],
  // schneiden → geschnitten: ünlü kısalır ve ünsüz ikizleşir, kural üretemez.
  schneiden: ["schneidet", "schnitt", "geschnitten"],
};

// "hoch" çekilirken ch → h olur (hohe, hohen, hoher) ve bu tek başına bir
// istisnadır: ne sıfat çekimi ne ünlü kuralı üretebiliyor. Havuzda A-katmanı
// sözcüğü olmasına rağmen çekimli hâlleri kayma sayılıyordu.
const DUZENSIZ_SIFAT = { hoch: ["hoh", "hohe", "hohen", "hoher", "hohes", "hohem", "höher", "höhere", "höheren"] };

// Almanca sayı BİLEŞİKTİR: "achtunddreißig" = acht+und+dreißig. Parçaları
// öğretiliyor ama bileşiğin kendisi hiçbir ders listesinde yok, o yüzden
// kayma sanılıyordu. Yalnız sayı morfemlerinden kurulmuş bir sözcük sayıdır.
const SAYI_MORFEM = "null|eins|ein|eine|zwei|drei|vier|fünf|sechs|sech|sieben|sieb|acht|neun|zehn|elf|zwölf|zwanzig|dreißig|vierzig|fünfzig|sechzig|siebzig|achtzig|neunzig|hundert|tausend|und";
// Kerecik sayısı da sayıdır: einmal, zweimal, dreimal, zehnmal. "mal"
// öğretilen bir sözcük ama bileşiği hiçbir listede yok; bazıları başka
// kurallara takılıp geçiyor, bazıları geçmiyordu (zweimal geçiyor,
// dreimal geçmiyordu) — yani davranış tutarsızdı.
const SAYI_RE = new RegExp(`^(?:${SAYI_MORFEM})+(?:mal)?$`, "i");
// Sıra sayısı: "am dritten Mai", "die erste Stelle".
const SIRA_RE = new RegExp(`^(?:erst|zweit|dritt|viert|fünft|sechst|siebt|acht|neunt|zehnt|elft|zwölft|(?:${SAYI_MORFEM})+t)(?:e|en|es|er|em)$`, "i");
const sayiMi = (w) => SAYI_RE.test(w) || SIRA_RE.test(w);

// da-bileşikleri ÜRETKEN: dazu, dafür, damit, daran, darüber … Edatların
// hepsi zaten serbest; bileşiği tek tek listelemek listeyi şişiriyordu.
// "vor" edatı listede yoktu: davor ve wovor bu yüzden kayma sayılıyordu,
// oysa kalıp aynı ve edatın kendisi zaten serbest.
const DA_RE = /^(?:da|dar|wo|wor)(?:zu|für|mit|von|bei|an|auf|in|über|unter|nach|gegen|durch|um|aus|hin|her|vor)$/i;

// Türkçe yazılmış soru kökü / kaynak cümle Almanca sanılıp ölçülmemeli.
// "-yor" eki tek başına kesin işaret: Almancada -yor ile biten sözcük YOK.
const TR_ISARET = /[ışğİıŞĞ]|\w+yor\b|\b(ne|neden|neye|neyi|neyden|nasıl|hangi|nedir|demek|sorusu|için|değil|yok|kaç|kim|kime|nerede|var|hasta|kişi)\b/i;
const türkçeMi = (s) => TR_ISARET.test(String(s || ""));

const dersler = (lv) => JSON.parse(fs.readFileSync(`${R}/mobile/src/data/lessons/de-${lv}.json`, "utf8"));
const ekle = (acc, ls) => {
  for (const l of ls) {
    for (const v of l.vocab || []) for (const w of parcala(v.de)) acc.add(w);
    for (const p of l.patterns || []) for (const w of String(p.de).toLowerCase().match(/[a-zäöüß]+/g) || []) acc.add(w);
  }
  return acc;
};

/**
 * Seviyeye göre kümülatif küme.
 *
 * Eşik seviyeden seviyeye DEĞİŞİR: A1 öğrencisi ilk ünitede neredeyse hiçbir
 * şey bilmez, ama B1 öğrencisi A1 ile A2'nin TAMAMINI bilir. B1'in birinci
 * ünitesinde "die Wohnung"u kayma saymak yanlış olurdu. O yüzden izin kümesi
 * alt seviyelerin tamamı artı kendi seviyesinin o üniteye kadarki kısmı.
 */
const ONCEKI = { a1: [], a2: ["A1"], b1: ["A1", "A2"], b2: ["A1", "A2", "B1"], c1: ["A1", "A2", "B1", "C1"] };

/**
 * Alt seviyeler DERS sözlükçesiyle değil HAVUZ KATMANIYLA giriyor.
 *
 * Sebep ölçülebilir: A1 patikası havuzun A1 katmanının %75'ini öğretiyor,
 * gerisi yalnız kart motorundan geliyor (session.ts seviye bandı). Bir B1
 * öğrencisi "also" ya da "deshalb"ı hiçbir A1 dersinde görmemiş olabilir ama
 * kartlarda görmüştür. Ders sözlükçesini eşik almak bu sözcükleri kayma
 * sayıyordu ve B1 metninde onlarsız yazmak imkânsız.
 */
const havuzKatman = (lv) => {
  const acc = new Set();
  for (const r of pool) if (r.niveau === lv) for (const w of parcala(r.de)) acc.add(w);
  return acc;
};
const cumBellek = new Map();
function cumFor(seviye = "a1") {
  const lv = String(seviye).toLowerCase();
  if (cumBellek.has(lv)) return cumBellek.get(lv);
  const taban = new Set();
  for (const alt of ONCEKI[lv] || []) for (const w of havuzKatman(alt)) taban.add(w);
  const L = dersler(lv);
  const m = new Map();
  let acc = new Set(taban);
  for (let u = 1; u <= Math.ceil(L.length / 4); u++) {
    ekle(acc, L.slice((u - 1) * 4, u * 4));
    m.set(u, new Set(acc));
  }
  cumBellek.set(lv, m);
  return m;
}

/** Geriye uyum: eski çağıranlar `cum`u doğrudan okuyor, o A1 kalıyor. */
const cum = cumFor("a1");

/**
 * `ham` metnini, `unit` sonuna kadar öğretilenlere göre ölç.
 * `ekIzin`: egzersizin kendi sözlükçesi gibi metne özel eklemeler.
 */
function olc(ham0, unit, ekIzin = [], seviye = "a1") {
  const izin = new Set([...(cumFor(seviye).get(unit) || [])]);
  // Gün ve ay adları A1'de ÖĞRETİLMELİ (mevcut karar), ama üst seviyede
  // öğrenci onları çoktan biliyor. Havuzda da yalnız "Mai" ile "Mittwoch"
  // var; ötekiler eksik ve bu ayrı bir iş. Üst seviyede serbest bırakıyoruz.
  if (String(seviye).toLowerCase() !== "a1") for (const t of TAKVIM) izin.add(t);
  for (const w of ekIzin) for (const x of parcala(w)) izin.add(x);
  // Türkçe harf taşıyan özel ad ("Yılmaz") Almanca sözcük regexinde parçalanıp
  // sahte gövde bırakıyor ("lmaz"); böyle belirteci bütünüyle atıyoruz.
  const ham = String(ham0 || "").split(/\s+/).filter((t) => !/[ışğİıŞĞçÇ]/.test(t)).join(" ");
  // Türkçe harfli belirteci atmak gövde uydurmasını önlüyor ama ad-soyad
  // KANITINI da siliyor: "Emre Şahin" → "Emre" tek başına kalıyor ve cümle
  // başındaki büyük harf muafiyetsiz olduğu için özel ad sayılmıyordu.
  // Ad taramasını harfleri ASCII'ye çevrilmiş AYRI bir metinde yap; sözcük
  // denetimi (aşağıda `ham`) değişmeden kalsın, yoksa sahte Almanca gövde üretir.
  const TR_ASCII = { ı: "i", İ: "I", ş: "s", Ş: "S", ğ: "g", Ğ: "G", ç: "c", Ç: "C" };
  const adMetni = String(ham0 || "").replace(/[ıİşŞğĞçÇ]/g, (c) => TR_ASCII[c]);
  const ozelAd = new Set((adMetni.match(/(?<![.!?]\s)(?<!^)\b[A-ZÄÖÜ][a-zäöüß]{2,}\b/g) || [])
    .map((w) => w.toLowerCase()).filter((w) => !havuzKok.has(w) && !TAKVIM.has(w)));
  // Unvan ZİNCİRLENEBİLİR ("Frau Dr. Weber"); tek unvanlı desen ilk eşleşmede
  // lastIndex'i ilerletip asıl adı yutuyordu.
  // İki büyük harfli sözcük yan yana ise ad-soyaddır ("Leyla Kaya", "Markus
  // Bauer") — cümle başında da olsa özel addır. Tek başına baştaki büyük harf
  // muaf tutulmuyor, çünkü her cümle büyük harfle başlar.
  // İkinci belirteci LOOKAHEAD ile al: desen onu yutarsa üçlü dizide ortadaki
  // çift hiç denenmiyordu. Her mektup "Grüßen Nuri Öz" ile bitiyor ve
  // (Grüßen, Nuri) çifti havuz sözcüğü olduğu için elenince (Nuri, Öz) hiç
  // sınanmıyor, yani her imzadaki soyad kayma sayılıyordu.
  for (const m of adMetni.matchAll(/\b([A-ZÄÖÜ][a-zäöüß]{1,})(?=\s+([A-ZÄÖÜ][a-zäöüß]{1,})\b)/g)) {
    if (!havuzKok.has(m[1].toLowerCase())) { ozelAd.add(m[1].toLowerCase()); ozelAd.add(m[2].toLowerCase()); }
  }
  for (const m of adMetni.matchAll(/\b(Dr|Prof|Frau|Herrn|Herr)\.?\s+(?:(?:Dr|Prof)\.?\s+)?([A-ZÄÖÜ][a-zäöüß]+)/g)) {
    // Unvandan SONRA gelen sözcük soyadıdır — havuzda ortak isim olarak da
    // bulunması ("Berg" = dağ) bunu değiştirmez, o yüzden koşulsuz muaf.
    ozelAd.add(m[1].toLowerCase()); ozelAd.add("dr"); ozelAd.add("prof");
    ozelAd.add(m[2].toLowerCase());
  }
  // Ayrılabilen fiilde çekim öneki AYIRIR (anrufen → "rufe … an"); öneksiz
  // gövde de bilinir sayılmalı. Ayrılan önek metinde tek başına da geçer.
  const izinKok = [];
  for (const w of izin) {
    if (w.length >= 4) izinKok.push(w);
    const m = w.match(AYRILABILIR);
    if (m && w.length - m[0].length >= 4) izinKok.push(w.slice(m[0].length));
    for (const on of ["fern", "spazieren", "statt", "teil", "heim", "frei"]) {
      if (w.startsWith(on) && w.length > on.length + 2) izinKok.push(on);
    }
  }
  // Beş harfli mastarda önek toleransı yetmiyor ("sagen"→"sage", "sagt" tutmaz).
  // Öneki KISALTMAK çözüm değil: "geben"→"geb" öneki "gebracht"ı yutar ve tam
  // yakalanması gereken erken Perfekt kaçar. Çekimli biçimler TAM üretiliyor.
  // Çekimler yalnız MASTARDAN üretiliyordu; ayrılabilen fiilin önekten soyulmuş
  // gövdesi (aufhören → hören) izinKok'a giriyor ama çekimi üretilmiyordu, o
  // yüzden metindeki "hört … auf" kayma sayılıyordu. Soyulmuş gövdeler de dahil.
  const izinCekim = new Set();
  for (const w of [...izin, ...izinKok]) {
    if (w.length >= 4 && (w.endsWith("en") || /[eo]rn$|eln$/.test(w))) {
      // -ern/-eln fiillerinde gövde SON n atılarak bulunur: ändern → änder,
      // sammeln → sammel. "en" atmak "änd" verirdi ve geändert/änderte/ändert
      // hiç üretilmezdi — bu sınıf (ändern, wechseln, sich erinnern, sammeln,
      // verbessern) baştan beri tamamen kapının dışındaydı.
      const g = /[eo]rn$|eln$/.test(w) ? w.slice(0, -1) : w.slice(0, -2);
      for (const son of ["t", "st", "e", "en"]) izinCekim.add(g + son);
      // B1 yazı dilinin geçmişini (Präteritum) ve Perfekt ortacını AÇIKÇA
      // öğretiyor; bu biçimler üretilmezse öğretilen fiilin kendisi kayma
      // sayılıyor ("arbeitete", "gearbeitet" → arbeiten).
      for (const son of ["te", "test", "ten", "tet"]) izinCekim.add(g + son);
      izinCekim.add("ge" + g + "t");
      izinCekim.add("ge" + g + "en");
      // Gövdesi t/d ile biten fiilde ortaç araya bir e alır:
      // arbeiten → gearbeitet, nicht "gearbeitt".
      if (/[td]$/.test(g)) { izinCekim.add("ge" + g + "et"); izinCekim.add(g + "et"); }
      // Güçlü fiilde gövde ünlüsü değişir: sehen→sieht, bewerben→bewirbt/
      // beworben, fahren→fährt. Kapı yalnız zayıf çekimi üretiyordu ve
      // ÖĞRETİLEN fiilin kendisi kayma sayılıyordu.
      // Değişen ünlü gövdenin SON ünlüsüdür, ilki değil: bewerb → bewirb
      // (biwerb değil). İlk ünlüyü değiştiren kural önekli fiilleri bozuyordu.
      for (const [a, b2] of [["ei", "ie"], ["e", "i"], ["e", "ie"], ["a", "ä"], ["e", "o"], ["e", "a"], ["i", "a"], ["o", "a"], ["i", "u"], ["ie", "o"]]) {
        const i = g.lastIndexOf(a);
        if (i < 0) continue;
        // a TEK harf olmayabilir ("ei", "ie"): kesme uzunluğu a kadar olmalı.
        // i+1 sabiti çok harfli ünlüde artığı bırakıyordu (steig → "stieig"),
        // yani ["ie","o"] kuralı da baştan beri hiç çalışmamıştı.
        const v = g.slice(0, i) + b2 + g.slice(i + a.length);
        for (const son of ["", "t", "st", "en", "e"]) izinCekim.add(v + son);
        izinCekim.add("ge" + v + "en");
        // Güçlü fiilin geçmişinde çift ünsüz sadeleşir: bekomm → bekam.
        const tek = v.replace(/([bcdfgklmnprstz])\1$/, "$1");
        if (tek !== v) for (const son of ["", "t", "en", "st"]) izinCekim.add(tek + son);
      }
      izinCekim.add(g + "t");   // ayrılabilen/ayrılmayan ortaç: bewerben → beworben yakalanmaz ama besucht yakalanır
    }
    // İSİM ÇOĞULU umlaut alabilir ve biçim tahmin edilemez: Frucht → Früchte,
    // Buch → Bücher, Stadt → Städte, Tochter → Töchter. Öğretilen ismin
    // kendisi biliniyorsa çoğulu da bilinmiş sayılmalı; kapı yalnız umlautsuz
    // çoğulu üretiyordu ve öğretilen kelimenin çoğulu kayma sayılıyordu.
    if (w.length >= 4 && !w.endsWith("en")) {
      for (const [a, b2] of [["au", "äu"], ["a", "ä"], ["o", "ö"], ["u", "ü"]]) {
        const i = w.lastIndexOf(a);
        if (i < 0) continue;
        const v = w.slice(0, i) + b2 + w.slice(i + a.length);
        for (const son of ["", "e", "er", "en", "n"]) izinCekim.add(v + son);
        break;
      }
    }
    // Düzensiz sıfat: hoch → hohe.
    for (const [kok, bicimler] of Object.entries(DUZENSIZ_SIFAT)) {
      if (w === kok) for (const b of bicimler) izinCekim.add(b);
    }
    // Düzensiz biçimler: gövde tablodaysa onun biçimleri de bilinir.
    for (const [mastar, bicimler] of Object.entries(DUZENSIZ)) {
      if (w === mastar || (w.length > mastar.length && w.endsWith(mastar))) {
        const on = w.slice(0, w.length - mastar.length);
        for (const b of bicimler) {
          izinCekim.add(on + b);
          // Tablo Präteritum'un yalnız 3. tekilini tutuyor ("ging"), ama anlatı
          // metni çoğulu da kullanıyor ("gingen", "fuhren", "bliebst"). Kişi
          // eklerini üret: güçlü gövdeye -en/-st/-t, zayıf -te gövdesine -n/-st/-t.
          if (b === bicimler[1]) {
            for (const son of ["en", "st", "t", "n"]) izinCekim.add(on + b + son);
            // d/t ile biten gövde bağlantı ünlüsü alır: fand → fandest,
            // fandet (fandst değil) — ortaçtaki gearbeitet ile aynı sebep.
            if (/[td]$/.test(b)) for (const son of ["est", "et"]) izinCekim.add(on + b + son);
          }
          // Aynı eksiklik ŞİMDİKİ zamanda da var: tablo 3. tekili tutuyor
          // ("nimmt", "wird") ama diyalog 2. tekili ve emri kullanıyor
          // ("nimmst", "wirst", "Nimm bitte …"). Güçlü fiilin emri gövdenin
          // kendisidir: 3. tekilden sondaki t düşer.
          if (b === bicimler[0] && /[td]$/.test(b)) {
            const govde = b.slice(0, -1);
            izinCekim.add(on + govde);
            izinCekim.add(on + govde + "st");
          }
          // Ayrılabilen önekte "ge" öneke ile gövde arasına girer: angerufen.
          if (on && b.startsWith("ge")) izinCekim.add(on + b);
          if (on) izinCekim.add(b.replace(/^ge/, on + "ge"));
        }
      }
    }
    // Sıfat çekimi: kısa sıfat da izinKok'a giremiyordu (w.length >= 4 süzgeci),
    // o yüzden "neu" öğretilmişken "neue" kayma sayılıyordu.
    if (w.length >= 3) {
      for (const son of ["e", "en", "es", "er", "em", "ere", "eren", "sten", "ste"]) izinCekim.add(w + son);
      // Karşılaştırmada -el/-er ile biten sıfat bir e düşürür:
      // teuer → teurer, dunkel → dunkler. Kural olmadan öğretilen sıfak kayıyordu.
      if (/e[lr]$/.test(w)) {
        const kis = w.slice(0, -2) + w.slice(-1);
        for (const son of ["er", "ere", "eren", "e", "en", "es", "em"]) izinCekim.add(kis + son);
      }
      // Karşılaştırmada gövde ünlüsü umlaut alır: lang → länger, alt → älter.
      for (const [a, b2] of [["a", "ä"], ["o", "ö"], ["u", "ü"]]) {
        const i = w.lastIndexOf(a);
        if (i < 0) continue;
        const v = w.slice(0, i) + b2 + w.slice(i + 1);
        for (const son of ["", "er", "ere", "eren", "sten", "ste"]) izinCekim.add(v + son);
      }
    }
  }
  const soyPrefix = (w) => { const m = w.match(AYRILABILIR); return m && w.length - m[0].length >= 4 ? w.slice(m[0].length) : null; };
  // Ayrılabilen fiilin mastarında `zu` öneke ile gövde ARASINA girer:
  // ausziehen → auszuziehen. Kural olmadan öğretilen fiil kayma sayılıyordu.
  const soyZu = (w) => { const m = w.match(/^(an|auf|aus|ein|mit|nach|vor|zu|ab|bei|los|weg|zurück)zu(.+)$/); return m ? m[1] + m[2] : null; };
  const bilinir = (w) => izin.has(w) || ozelAd.has(w) || izinCekim.has(w) ||
    (soyPrefix(w) && (izin.has(soyPrefix(w)) || izinCekim.has(soyPrefix(w)))) ||
    (soyZu(w) && (izin.has(soyZu(w)) || izinCekim.has(soyZu(w)))) ||
    izinKok.some((k) => w.startsWith(k.slice(0, Math.max(4, k.length - 2)))) ||
    (w.length >= 3 && izinKok.some((k) => k.startsWith(w)));
  const tok = (ham.toLowerCase().match(/[a-zäöüß]{2,}/g) || []);
  const disi = tok.filter((w) => !SERBEST.has(w) && !sayiMi(w) && !DA_RE.test(w) && !bilinir(w));
  return { tok, disi };
}

const ozet = (disi) => {
  const say = {}; for (const w of disi) say[w] = (say[w] || 0) + 1;
  return Object.entries(say).sort((a, b) => b[1] - a[1]).map(([w, n]) => `${w}×${n}`);
};

module.exports = { SERBEST, havuzKok, cum, cumFor, norm, parcala, türkçeMi, olc, ozet, TAKVIM, sayiMi };
