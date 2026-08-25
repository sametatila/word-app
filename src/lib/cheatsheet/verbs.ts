import type { CefrLevel } from "@/lib/skills/types";

/**
 * Düzensiz fiiller — dört temel biçim.
 *
 * Kaynak: "Deutsch intensiv. Wortschatz B2" (Klett, ISBN 978-3-12-675078-3)
 * ekindeki *Liste der unregelmäßigen Verben*; sütun düzeni de oradan geliyor
 * (Infinitiv · Präsens · Präteritum · Perfekt). Türkçe karşılıklar uygulamanın
 * kendi Goethe kelime listelerinden eşleştirildi, listede bulunmayan 24 fiil
 * elle yazıldı.
 *
 * Liste TEK yerde duruyor ve seviye etiketiyle bölünüyor. Dört ayrı dosyaya
 * kopyalansaydı "beginnen"in Perfekt'i dört yerde düzeltilmek zorunda kalırdı;
 * seviye ise sunumun kararı, fiilin kendisinin değil.
 *
 * Etiket "bu fiil bu seviyede ÖĞRETİLİR" demek, "bu seviyede geçer" değil:
 * A1 listesi ders müfredatının ilk 100 dersinde geçen çekirdek fiiller, üstü
 * kendi seviyesinde ekleniyor. Bir seviyenin sayfası kendi etiketini VE
 * altındakileri gösteriyor — B1'de "gehen"i aramak zorunda kalmak liste
 * mantığının kullanıcıya sızması olurdu.
 */
export type IrregularVerb = {
  /** Mastar. */
  inf: string;
  /** 3. tekil Präsens — ünlü değişimi yalnızca burada görünür. */
  prs: string;
  /** 3. tekil Präteritum. */
  prt: string;
  /** Perfekt, yardımcı fiiliyle birlikte: "ist gegangen". */
  prf: string;
  /** Türkçe karşılık. */
  tr: string;
  level: CefrLevel;
};

const RAW: [string, string, string, string, string, string][] = [
  ["abbiegen", "biegt ab", "bog ab", "ist abgebogen", "dönmek, sapmak", "B1"],
  ["abfahren", "fährt ab", "fuhr ab", "ist abgefahren", "hareket etmek, kalkmak", "A1"],
  ["abfliegen", "fliegt ab", "flog ab", "ist abgeflogen", "kalkmak, havalanmak", "B1"],
  ["abgeben", "gibt ab", "gab ab", "hat abgegeben", "teslim etmek, vermek", "A2"],
  ["abhängen", "hängt ab", "hing ab", "hat abgehangen", "bağlı olmak", "B1"],
  ["abheben", "hebt ab", "hob ab", "hat abgehoben", "para çekmek, kaldırmak", "A2"],
  ["abschließen", "schließt ab", "schloss ab", "hat abgeschlossen", "kilitlemek, tamamlamak", "A2"],
  ["abwaschen", "wäscht ab", "wusch ab", "hat abgewaschen", "bulaşık yıkamak", "A2"],
  ["anbieten", "bietet an", "bot an", "hat angeboten", "sunmak, ikram etmek", "A2"],
  ["anfangen", "fängt an", "fing an", "hat angefangen", "başlamak", "A1"],
  ["angehen", "geht an", "ging an", "ist angegangen", "ilgilendirmek; (ışık) yanmak", "B1"],
  ["angreifen", "greift an", "griff an", "hat angegriffen", "saldırmak", "B1"],
  ["ankommen", "kommt an", "kam an", "ist angekommen", "varmak", "A1"],
  ["annehmen", "nimmt an", "nahm an", "hat angenommen", "kabul etmek / varsaymak", "A2"],
  ["anrufen", "ruft an", "rief an", "hat angerufen", "aramak, telefon etmek", "A1"],
  ["ansehen", "sieht an", "sah an", "hat angesehen", "izlemek, bakmak, seyretmek", "A1"],
  ["anziehen", "zieht an", "zog an", "hat angezogen", "giymek; çekmek", "A1"],
  ["aufgeben", "gibt auf", "gab auf", "hat aufgegeben", "vazgeçmek, pes etmek, postaya vermek", "A2"],
  ["aufheben", "hebt auf", "hob auf", "hat aufgehoben", "kaldırmak, saklamak", "A2"],
  ["aufnehmen", "nimmt auf", "nahm auf", "hat aufgenommen", "kabul etmek, kaydetmek", "A2"],
  ["aufstehen", "steht auf", "stand auf", "ist aufgestanden", "kalkmak, ayağa kalkmak", "A1"],
  ["ausgeben", "gibt aus", "gab aus", "hat ausgegeben", "harcamak", "A2"],
  ["ausgehen", "geht aus", "ging aus", "ist ausgegangen", "dışarı çıkmak, sönmek", "A1"],
  ["ausschließen", "schließt aus", "schloss aus", "hat ausgeschlossen", "hariç tutmak, imkânsız kılmak", "B1"],
  ["aussehen", "sieht aus", "sah aus", "hat ausgesehen", "görünmek", "A1"],
  ["aussprechen", "spricht aus", "sprach aus", "hat ausgesprochen", "telaffuz etmek", "A2"],
  ["aussteigen", "steigt aus", "stieg aus", "ist ausgestiegen", "inmek", "A1"],
  ["befehlen", "befiehlt", "befahl", "hat befohlen", "emretmek", "B2"],
  ["beginnen", "beginnt", "begann", "hat begonnen", "başlamak", "A1"],
  ["beißen", "beißt", "biss", "hat gebissen", "ısırmak", "B2"],
  ["belügen", "belügt", "belog", "hat belogen", "birine yalan söylemek", "B2"],
  ["beraten", "berät", "beriet", "hat beraten", "danışmanlık yapmak, tavsiye vermek", "B1"],
  ["beschließen", "beschließt", "beschloss", "hat beschlossen", "karar vermek", "B1"],
  ["beschreiben", "beschreibt", "beschrieb", "hat beschrieben", "tarif etmek, tanımlamak", "A2"],
  ["besitzen", "besitzt", "besaß", "hat besessen", "sahip olmak", "B1"],
  ["bestehen", "besteht", "bestand", "hat bestanden", "geçmek, oluşmak", "B1"],
  ["betragen", "beträgt", "betrug", "hat betragen", "(miktar olarak) tutmak", "B1"],
  ["betrügen", "betrügt", "betrog", "hat betrogen", "aldatmak, dolandırmak", "B2"],
  ["beweisen", "beweist", "bewies", "hat bewiesen", "kanıtlamak, ispatlamak", "B1"],
  ["bewerben", "bewirbt", "bewarb", "hat beworben", "başvurmak (sich)", "B1"],
  ["beziehen", "bezieht", "bezog", "hat bezogen", "ilgili olmak (sich auf); almak", "B1"],
  ["biegen", "biegt", "bog", "hat gebogen", "bükmek, kıvırmak", "B2"],
  ["bieten", "bietet", "bot", "hat geboten", "sunmak, teklif etmek", "B1"],
  ["binden", "bindet", "band", "hat gebunden", "bağlamak", "B1"],
  ["bitten", "bittet", "bat", "hat gebeten", "rica etmek", "A2"],
  ["blasen", "bläst", "blies", "hat geblasen", "üflemek", "B2"],
  ["bleiben", "bleibt", "blieb", "ist geblieben", "kalmak", "A1"],
  ["braten", "brät", "briet", "hat gebraten", "kızartmak, kavurmak", "B2"],
  ["brechen", "bricht", "brach", "hat gebrochen", "kırmak, kırılmak", "A2"],
  ["brennen", "brennt", "brannte", "hat gebrannt", "yanmak", "A2"],
  ["bringen", "bringt", "brachte", "hat gebracht", "getirmek", "A1"],
  ["denken", "denkt", "dachte", "hat gedacht", "düşünmek", "A1"],
  ["dürfen", "darf", "durfte", "hat gedurft", "izinli olmak, -ebilmek", "A1"],
  ["einfallen", "fällt ein", "fiel ein", "ist eingefallen", "aklına gelmek", "A2"],
  ["einladen", "lädt ein", "lud ein", "hat eingeladen", "davet etmek", "A1"],
  ["einschlafen", "schläft ein", "schlief ein", "ist eingeschlafen", "uykuya dalmak", "A1"],
  ["einsteigen", "steigt ein", "stieg ein", "ist eingestiegen", "binmek", "A1"],
  ["einziehen", "zieht ein", "zog ein", "ist eingezogen", "taşınmak, içeri girmek", "B1"],
  ["empfehlen", "empfiehlt", "empfahl", "hat empfohlen", "tavsiye etmek, önermek", "A2"],
  ["enthalten", "enthält", "enthielt", "hat enthalten", "içermek", "B1"],
  ["entlassen", "entlässt", "entließ", "hat entlassen", "taburcu etmek, işten çıkarmak", "B1"],
  ["entscheiden", "entscheidet", "entschied", "hat entschieden", "karar vermek", "A2"],
  ["entsprechen", "entspricht", "entsprach", "hat entsprochen", "karşılık gelmek, uygun olmak", "B1"],
  ["entstehen", "entsteht", "entstand", "ist entstanden", "oluşmak, ortaya çıkmak", "B1"],
  ["erfahren", "erfährt", "erfuhr", "hat erfahren", "öğrenmek", "B1"],
  ["erfinden", "erfindet", "erfand", "hat erfunden", "icat etmek", "B1"],
  ["erhalten", "erhält", "erhielt", "hat erhalten", "almak, elde etmek", "A2"],
  ["erkennen", "erkennt", "erkannte", "hat erkannt", "tanımak, fark etmek, anlamak", "A2"],
  ["erscheinen", "erscheint", "erschien", "ist erschienen", "görünmek; yayımlanmak", "B1"],
  ["erschrecken", "erschrickt", "erschrak", "ist erschrocken", "korkmak, ürkmek, korkutmak", "B2"],
  ["erziehen", "erzieht", "erzog", "hat erzogen", "yetiştirmek, eğitmek", "B1"],
  ["essen", "isst", "aß", "hat gegessen", "yemek", "A1"],
  ["fahren", "fährt", "fuhr", "ist gefahren", "gitmek, sürmek", "A1"],
  ["fallen", "fällt", "fiel", "ist gefallen", "düşmek", "A2"],
  ["fangen", "fängt", "fing", "hat gefangen", "yakalamak, tutmak", "A2"],
  ["festhalten", "hält fest", "hielt fest", "hat festgehalten", "sıkıca tutmak, tutunmak", "B1"],
  ["finden", "findet", "fand", "hat gefunden", "bulmak, düşünmek", "A1"],
  ["fliegen", "fliegt", "flog", "ist geflogen", "uçmak", "A1"],
  ["fließen", "fließt", "floss", "ist geflossen", "akmak", "B1"],
  ["fressen", "frisst", "fraß", "hat gefressen", "yemek (hayvan için)", "B2"],
  ["frieren", "friert", "fror", "hat gefroren", "üşümek, donmak", "B2"],
  ["geben", "gibt", "gab", "hat gegeben", "vermek, bulunmak", "A1"],
  ["gefallen", "gefällt", "gefiel", "hat gefallen", "hoşuna gitmek, beğenilmek", "A1"],
  ["gehen", "geht", "ging", "ist gegangen", "gitmek", "A1"],
  ["gelingen", "gelingt", "gelang", "ist gelungen", "başarılı olmak", "B1"],
  ["gelten", "gilt", "galt", "hat gegolten", "geçerli olmak", "B1"],
  ["genießen", "genießt", "genoss", "hat genossen", "tadını çıkarmak, keyfini sürmek", "B1"],
  ["geschehen", "geschieht", "geschah", "ist geschehen", "olmak, gerçekleşmek", "A2"],
  ["gewinnen", "gewinnt", "gewann", "hat gewonnen", "kazanmak", "A2"],
  ["gießen", "gießt", "goss", "hat gegossen", "sulamak", "B2"],
  ["greifen", "greift", "griff", "hat gegriffen", "tutmak, kapmak", "B2"],
  ["haben", "hat", "hatte", "hat gehabt", "sahip olmak", "A1"],
  ["halten", "hält", "hielt", "hat gehalten", "durmak, tutmak", "A1"],
  ["hängen", "hängt", "hing", "hat gehangen", "asılı olmak, asmak", "B1"],
  ["heben", "hebt", "hob", "hat gehoben", "kaldırmak", "B2"],
  ["heißen", "heißt", "hieß", "hat geheißen", "adı olmak, denmek", "A1"],
  ["helfen", "hilft", "half", "hat geholfen", "yardım etmek", "A1"],
  ["kennen", "kennt", "kannte", "hat gekannt", "tanımak, bilmek", "A1"],
  ["kommen", "kommt", "kam", "ist gekommen", "gelmek", "A1"],
  ["können", "kann", "konnte", "hat gekonnt", "yapabilmek, bilmek", "A1"],
  ["laden", "lädt", "lud", "hat geladen", "yüklemek; davet etmek", "B2"],
  ["lassen", "lässt", "ließ", "hat gelassen", "bırakmak", "A1"],
  ["laufen", "läuft", "lief", "ist gelaufen", "koşmak, yürümek", "A1"],
  ["leiden", "leidet", "litt", "hat gelitten", "acı çekmek, muzdarip olmak", "B2"],
  ["leihen", "leiht", "lieh", "hat geliehen", "ödünç vermek, ödünç almak", "A2"],
  ["lesen", "liest", "las", "hat gelesen", "okumak", "A1"],
  ["liegen", "liegt", "lag", "hat gelegen", "yatmak, bulunmak", "A1"],
  ["lügen", "lügt", "log", "hat gelogen", "yalan söylemek", "B2"],
  ["messen", "misst", "maß", "hat gemessen", "ölçmek", "A2"],
  ["missverstehen", "missversteht", "missverstand", "hat missverstanden", "yanlış anlamak", "B2"],
  ["mögen", "mag", "mochte", "hat gemocht", "hoşlanmak, sevmek, istemek", "A1"],
  ["müssen", "muss", "musste", "hat gemusst", "zorunda olmak, gerekmek", "A1"],
  ["nachschlagen", "schlägt nach", "schlug nach", "hat nachgeschlagen", "sözlükte bakmak, aramak", "B2"],
  ["nehmen", "nimmt", "nahm", "hat genommen", "almak", "A1"],
  ["nennen", "nennt", "nannte", "hat genannt", "adlandırmak, çağırmak", "A2"],
  ["pfeifen", "pfeift", "pfiff", "hat gepfiffen", "ıslık çalmak", "B2"],
  ["raten", "rät", "riet", "hat geraten", "tahmin etmek", "A2"],
  ["rennen", "rennt", "rannte", "ist gerannt", "koşmak", "A2"],
  ["riechen", "riecht", "roch", "hat gerochen", "koklamak, kokmak", "A2"],
  ["rufen", "ruft", "rief", "hat gerufen", "çağırmak, seslenmek", "A1"],
  ["scheiden", "scheidet", "schied", "hat geschieden", "ayırmak; boşanmak (sich)", "B2"],
  ["scheinen", "scheint", "schien", "hat geschienen", "parlamak, görünmek", "A2"],
  ["schieben", "schiebt", "schob", "hat geschoben", "itmek", "B2"],
  ["schlafen", "schläft", "schlief", "hat geschlafen", "uyumak", "A1"],
  ["schlagen", "schlägt", "schlug", "hat geschlagen", "vurmak, yenmek, çakmak", "A2"],
  ["schließen", "schließt", "schloss", "hat geschlossen", "kapatmak", "A2"],
  ["schneiden", "schneidet", "schnitt", "hat geschnitten", "kesmek", "A2"],
  ["schreiben", "schreibt", "schrieb", "hat geschrieben", "yazmak", "A1"],
  ["schreien", "schreit", "schrie", "hat geschrien", "bağırmak, çığlık atmak", "B2"],
  ["schweigen", "schweigt", "schwieg", "hat geschwiegen", "susmak", "B2"],
  ["schwimmen", "schwimmt", "schwamm", "ist geschwommen", "yüzmek", "A1"],
  ["sehen", "sieht", "sah", "hat gesehen", "görmek", "A1"],
  ["sein", "ist", "war", "ist gewesen", "olmak", "A1"],
  ["senden", "sendet", "sandte/sendete", "hat gesandt/gesendet", "göndermek", "B1"],
  ["sich unterhalten", "unterhält sich", "unterhielt sich", "hat sich unterhalten", "sohbet etmek, eğlenmek", "A2"],
  ["sich verhalten", "verhält sich", "verhielt sich", "hat sich verhalten", "davranmak", "B1"],
  ["singen", "singt", "sang", "hat gesungen", "şarkı söylemek", "A1"],
  ["sinken", "sinkt", "sank", "ist gesunken", "batmak, düşmek, azalmak", "B2"],
  ["sitzen", "sitzt", "saß", "hat / ist gesessen", "oturmak", "A1"],
  ["sollen", "soll", "sollte", "hat gesollt", "gerekmek, -meli", "A1"],
  ["sprechen", "spricht", "sprach", "hat gesprochen", "konuşmak", "A1"],
  ["springen", "springt", "sprang", "ist gesprungen", "atlamak, sıçramak", "A2"],
  ["stehen", "steht", "stand", "hat/ist gestanden", "durmak, yazılı olmak", "A1"],
  ["stehlen", "stiehlt", "stahl", "hat gestohlen", "çalmak", "B2"],
  ["steigen", "steigt", "stieg", "ist gestiegen", "yükselmek, artmak, çıkmak", "A2"],
  ["sterben", "stirbt", "starb", "ist gestorben", "ölmek", "A2"],
  ["stinken", "stinkt", "stank", "hat gestunken", "kokmak", "B2"],
  ["streichen", "streicht", "strich", "hat gestrichen", "sürmek, boyamak; çizmek", "B2"],
  ["streiten", "streitet", "stritt", "hat gestritten", "tartışmak, kavga etmek", "B1"],
  ["teilnehmen", "nimmt teil", "nahm teil", "hat teilgenommen", "katılmak", "A2"],
  ["tragen", "trägt", "trug", "hat getragen", "taşımak, giymek", "A1"],
  ["treffen", "trifft", "traf", "hat getroffen", "buluşmak, karşılaşmak", "A1"],
  ["treiben", "treibt", "trieb", "hat getrieben", "yapmak, uğraşmak", "B2"],
  ["treten", "tritt", "trat", "ist/hat getreten", "basmak, adım atmak, tekme atmak", "A2"],
  ["trinken", "trinkt", "trank", "hat getrunken", "içmek", "A1"],
  ["tun", "tut", "tat", "hat getan", "yapmak", "A1"],
  ["überfahren", "überfährt", "überfuhr", "hat überfahren", "araçla ezmek, çarpmak", "B2"],
  ["übernehmen", "übernimmt", "übernahm", "hat übernommen", "devralmak, üstlenmek", "B1"],
  ["überweisen", "überweist", "überwies", "hat überwiesen", "havale etmek", "A2"],
  ["umsteigen", "steigt um", "stieg um", "ist umgestiegen", "aktarma yapmak", "A1"],
  ["umziehen", "zieht um", "zog um", "ist umgezogen", "taşınmak", "A2"],
  ["unterscheiden", "unterscheidet", "unterschied", "hat unterschieden", "ayırt etmek, ayırmak", "A2"],
  ["verbieten", "verbietet", "verbot", "hat verboten", "yasaklamak", "A2"],
  ["verbinden", "verbindet", "verband", "hat verbunden", "bağlamak, sarmak", "A2"],
  ["verbringen", "verbringt", "verbrachte", "hat verbracht", "geçirmek", "A2"],
  ["vergessen", "vergisst", "vergaß", "hat vergessen", "unutmak", "A1"],
  ["vergleichen", "vergleicht", "verglich", "hat verglichen", "karşılaştırmak", "A2"],
  ["verlassen", "verlässt", "verließ", "hat verlassen", "terk etmek, ayrılmak", "A2"],
  ["verlieren", "verliert", "verlor", "hat verloren", "kaybetmek", "A2"],
  ["verraten", "verrät", "verriet", "hat verraten", "ele vermek, açığa vurmak", "B2"],
  ["verschreiben", "verschreibt", "verschrieb", "hat verschrieben", "reçete etmek, reçete yazmak", "B1"],
  ["versprechen", "verspricht", "versprach", "hat versprochen", "söz vermek", "A2"],
  ["verstehen", "versteht", "verstand", "hat verstanden", "anlamak", "A1"],
  ["vertreten", "vertritt", "vertrat", "hat vertreten", "temsil etmek, vekalet etmek", "B1"],
  ["verzeihen", "verzeiht", "verzieh", "hat verziehen", "affetmek", "B2"],
  ["vorschlagen", "schlägt vor", "schlug vor", "hat vorgeschlagen", "önermek, teklif etmek", "A2"],
  ["vorziehen", "zieht vor", "zog vor", "hat vorgezogen", "tercih etmek", "B2"],
  ["wachsen", "wächst", "wuchs", "ist gewachsen", "büyümek, uzamak", "A2"],
  ["waschen", "wäscht", "wusch", "hat gewaschen", "yıkamak", "A1"],
  ["wehtun", "tut weh", "tat weh", "hat wehgetan", "acımak, canını yakmak", "A2"],
  ["werden", "wird", "wurde", "ist geworden", "olmak, haline gelmek", "A1"],
  ["werfen", "wirft", "warf", "hat geworfen", "atmak, fırlatmak", "A2"],
  ["widersprechen", "widerspricht", "widersprach", "hat widersprochen", "itiraz etmek, karşı çıkmak", "B2"],
  ["wiegen", "wiegt", "wog", "hat gewogen", "tartmak, ağırlığında olmak", "A2"],
  ["wissen", "weiß", "wusste", "hat gewusst", "bilmek", "A1"],
  ["wollen", "will", "wollte", "hat gewollt", "istemek", "A1"],
  ["ziehen", "zieht", "zog", "hat gezogen", "çekmek; taşınmak", "A1"],
  ["zunehmen", "nimmt zu", "nahm zu", "hat zugenommen", "kilo almak, artmak", "A2"],
  ["zwingen", "zwingt", "zwang", "hat gezwungen", "zorlamak", "B2"],
];

export const IRREGULAR_VERBS: IrregularVerb[] = RAW.map(
  ([inf, prs, prt, prf, tr, level]) => ({
    inf,
    prs,
    prt,
    prf,
    tr,
    level: level as CefrLevel,
  }),
);

/** Verilen seviyeye kadarki (o seviye dâhil) fiiller, mastar sırasında. */
export function verbsUpTo(level: CefrLevel): IrregularVerb[] {
  const order = ["A1", "A2", "B1", "B2", "C1"];
  const max = order.indexOf(level);
  return IRREGULAR_VERBS.filter((v) => order.indexOf(v.level) <= max);
}
