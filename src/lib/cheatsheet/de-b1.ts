import { note, table, type CheatSheet } from "./types";
import { verbsUpTo } from "./verbs";

/**
 * B1 başvuru sayfaları — cümlenin içine cümle koymak.
 *
 * A2'de iki cümle yan yana bağlanıyordu; B1'de cümle iç içe geçiyor: ilgi
 * cümlesi ismin içine, zu'lu mastar fiilin içine, edilgen ise özneyi tamamen
 * kaldırıyor. Bu yüzden buradaki sayfaların çoğu bir TABLO değil bir DÖNÜŞÜM
 * gösteriyor — etken cümleden edilgen cümleye, iki cümleden ilgi cümlesine.
 */
export const DE_B1: CheatSheet[] = [
  {
    id: "b1-konnektoren",
    level: "B1",
    title: "Bağlaçlar — tam liste",
    de: "Konnektoren",
    summary: "aynı anlamı üç farklı dizilişle kurmanın haritası",
    blocks: [
      table(
        ["Anlam", "Yan cümle (fiil sonda)", "Zarf (fiil hemen arkada)", "Ana cümle bağlacı"],
        [
          ["Neden", "weil, da", "deshalb, deswegen, darum, daher", "denn"],
          ["Zıtlık", "obwohl, obgleich", "trotzdem, dennoch, jedoch", "aber, doch"],
          ["Amaç", "damit, um … zu", "dazu, dafür", "—"],
          ["Koşul", "wenn, falls, sofern", "sonst, andernfalls", "—"],
          ["Sonuç", "sodass, so … dass", "also, folglich, somit", "—"],
          ["Zaman: aynı anda", "während, solange, wenn", "gleichzeitig, dabei", "—"],
          ["Zaman: önce", "bevor, ehe", "vorher, davor, zuerst", "—"],
          ["Zaman: sonra", "nachdem, sobald", "danach, dann, anschließend", "—"],
          ["Zaman: -den beri", "seit, seitdem", "seitdem", "—"],
          ["Zaman: -e kadar", "bis", "—", "—"],
          ["Karşıtlık", "während, wohingegen", "dagegen, hingegen", "—"],
          ["Ekleme", "—", "außerdem, zudem, ferner", "und"],
          ["Seçenek", "—", "sonst", "oder"],
          ["Düzeltme", "—", "vielmehr", "sondern"],
        ],
      ),
      note(
        "Tablonun okunuşu: bir satırdaki üç seçenek AYNI şeyi söyler, yalnızca " +
          "fiili farklı yere koyar. Ich blieb zu Hause, weil ich krank war. / " +
          "Ich war krank, deshalb blieb ich zu Hause. / Ich blieb zu Hause, " +
          "denn ich war krank.",
      ),
      table(
        ["Bağlaç", "Türkçe", "Örnek"],
        [
          ["obwohl", "-mesine rağmen", "Obwohl es regnete, gingen wir spazieren."],
          ["da", "madem, çünkü (bilinen sebep)", "Da du krank bist, bleib zu Hause."],
          ["falls", "şayet, olur da", "Falls es regnet, nehmen wir ein Taxi."],
          ["sodass", "öyle ki, bu yüzden", "Er sprach leise, sodass ich nichts verstand."],
          ["so … dass", "o kadar … ki", "Es war so kalt, dass wir umkehrten."],
          ["sobald", "-er -mez", "Sobald ich ankomme, rufe ich an."],
          ["solange", "-diği sürece", "Solange du hier wohnst, zahlst du keine Miete."],
          ["indem", "-erek (yöntem)", "Man lernt, indem man Fehler macht."],
          ["anstatt dass", "-ecek yerde", "Anstatt dass er hilft, sieht er zu."],
          ["außer wenn", "-medikçe", "Ich komme, außer wenn es regnet."],
          ["je … desto", "ne kadar … o kadar", "Je mehr ich lerne, desto besser verstehe ich."],
        ],
        "B1'de eklenen bağlaçlar",
      ),
      note(
        "\"je … desto\" iki parçalıdır ve dizilişi de iki farklıdır: \"je\" " +
          "parçası yan cümledir (fiil sonda), \"desto\" parçasında fiil hemen " +
          "desto + karşılaştırmadan sonra gelir.",
      ),
      table(
        ["Bağlaç", "Zaman uyumu", "Örnek"],
        [
          ["nachdem (geçmiş)", "yan cümle Plusquamperfekt, ana cümle Präteritum", "Nachdem er gegessen hatte, ging er."],
          ["nachdem (şimdi)", "yan cümle Perfekt, ana cümle Präsens", "Nachdem ich gegessen habe, gehe ich."],
          ["bevor", "iki cümle de aynı zamanda", "Bevor ich gehe, rufe ich an."],
          ["als", "geçmişte TEK bir kez", "Als ich in Berlin war, …"],
          ["wenn (geçmiş)", "geçmişte TEKRARLANAN", "Immer wenn ich dort war, …"],
          ["wenn (şimdi/gelecek)", "her zaman wenn", "Wenn ich Zeit habe, komme ich."],
        ],
        "als mı wenn mi, nachdem'de hangi zaman",
      ),
    ],
  },

  {
    id: "b1-relativsatz",
    level: "B1",
    title: "İlgi cümleleri",
    de: "Relativsätze",
    summary: "der, den, dem, dessen — ve hangisinin ne zaman geldiği",
    blocks: [
      table(
        ["Durum", "maskulin", "feminin", "neutrum", "çoğul"],
        [
          ["Nominativ", "der", "die", "das", "die"],
          ["Akkusativ", "den", "die", "das", "die"],
          ["Dativ", "dem", "der", "dem", "denen"],
          ["Genitiv", "dessen", "deren", "dessen", "deren"],
        ],
        "İlgi zamirleri — belirli artikelle aynı, iki hücre hariç",
      ),
      note(
        "Belirli artikelden ayrılan yalnızca iki satır: Dativ çoğul \"denen\" " +
          "ve bütün Genitiv satırı (dessen / deren). Gerisi der/die/das " +
          "tablosunun aynısı.",
      ),
      note(
        "En önemli kural iki parçalı: zamirin CİNSİYETİ ve SAYISI önceki " +
          "isimden gelir, DURUMU ise ilgi cümlesindeki görevinden. \"Der Mann, " +
          "den ich gesehen habe\" — eril çünkü Mann, Akkusativ çünkü ilgi " +
          "cümlesinde nesne.",
      ),
      table(
        ["Görev", "Örnek", "Neden o hâl"],
        [
          ["Özne", "Der Mann, der dort steht, ist mein Chef.", "ilgi cümlesinin öznesi"],
          ["Nesne", "Der Mann, den ich gesehen habe, war mein Chef.", "ilgi cümlesinin nesnesi"],
          ["Dativ nesne", "Der Mann, dem ich geholfen habe, …", "helfen Dativ ister"],
          ["Sahiplik", "Der Mann, dessen Auto kaputt ist, …", "araba adamın"],
          ["Sahiplik (dişil)", "Die Frau, deren Sohn hier arbeitet, …", "oğul kadının"],
          ["Edatla", "Die Stadt, in der ich wohne, ist klein.", "in + wo? → Dativ"],
          ["Edatla", "Das Projekt, an dem wir arbeiten, …", "arbeiten an + Dativ"],
          ["Çoğul Dativ", "Die Kollegen, denen ich vertraue, …", "vertrauen Dativ ister"],
        ],
      ),
      note(
        "Edat varsa ilgi zamirinden ÖNCE gelir ve durumu edat belirler: \"die " +
          "Stadt, in der…\" Türkçedeki \"içinde yaşadığım şehir\" sırası " +
          "tersine döner.",
      ),
      table(
        ["Zamir", "Ne zaman", "Örnek"],
        [
          ["was", "das, alles, nichts, etwas, viel sonrası", "Alles, was du sagst, stimmt."],
          ["was", "bütün ana cümleye gönderme", "Er kam zu spät, was mich ärgerte."],
          ["was", "üstünlük sıfatından sonra", "Das ist das Beste, was ich kenne."],
          ["wo", "yer adı", "Die Stadt, wo ich geboren bin, …"],
          ["wo(r)+edat", "eşya için, seçimlik", "Das Thema, worüber wir sprachen, …"],
        ],
        "was ve wo",
      ),
      note("İlgi cümlesi her zaman virgülle ayrılır ve çekilmiş fiili sondadır."),
    ],
  },

  {
    id: "b1-passiv",
    level: "B1",
    title: "Edilgen çatı",
    de: "Passiv",
    summary: "werden + Partizip II — bütün zamanlarda",
    blocks: [
      table(
        ["Zaman", "Yapı", "Örnek"],
        [
          ["Präsens", "wird + Partizip II", "Das Haus wird gebaut."],
          ["Präteritum", "wurde + Partizip II", "Das Haus wurde gebaut."],
          ["Perfekt", "ist + Partizip II + worden", "Das Haus ist gebaut worden."],
          ["Plusquamperfekt", "war + Partizip II + worden", "Das Haus war gebaut worden."],
          ["Futur I", "wird + Partizip II + werden", "Das Haus wird gebaut werden."],
          ["Modal", "muss + Partizip II + werden", "Das Haus muss gebaut werden."],
          ["Modal, geçmiş", "musste + Partizip II + werden", "Das Haus musste gebaut werden."],
        ],
      ),
      note(
        "Perfekt'te \"geworden\" değil \"worden\" kullanılır — ge- düşer. " +
          "\"Er ist Arzt geworden\" (doktor oldu) ile \"Das Haus ist gebaut " +
          "worden\" (ev inşa edildi) bu tek heceyle ayrılır.",
      ),
      table(
        ["Kişi", "Präsens", "Präteritum"],
        [
          ["ich", "werde gefragt", "wurde gefragt"],
          ["du", "wirst gefragt", "wurdest gefragt"],
          ["er / sie / es", "wird gefragt", "wurde gefragt"],
          ["wir", "werden gefragt", "wurden gefragt"],
          ["ihr", "werdet gefragt", "wurdet gefragt"],
          ["sie / Sie", "werden gefragt", "wurden gefragt"],
        ],
        "Çekim — Partizip değişmez, yalnızca werden çekilir",
      ),
      table(
        ["Etken", "Edilgen", "Ne oldu"],
        [
          ["Der Chef liest den Bericht.", "Der Bericht wird gelesen.", "Akkusativ nesnesi özne oldu"],
          ["Der Chef liest den Bericht.", "Der Bericht wird vom Chef gelesen.", "eski özne von + Dativ"],
          ["Der Sturm zerstörte das Dach.", "Das Dach wurde durch den Sturm zerstört.", "sebep durch + Akkusativ"],
          ["Man repariert das Auto.", "Das Auto wird repariert.", "\"man\" edilgende kaybolur"],
          ["Er hilft mir.", "Mir wird geholfen.", "Dativ nesnesi Dativ KALIR"],
          ["Hier arbeitet man viel.", "Hier wird viel gearbeitet.", "öznesiz edilgen"],
        ],
      ),
      note(
        "Fail gerekiyorsa: insan ise von + Dativ, cansız sebep ya da araç ise " +
          "durch + Akkusativ. Ama edilgenin varlık sebebi faili SÖYLEMEMEK; " +
          "cümlelerin çoğunda hiç yazılmaz.",
      ),
      note(
        "Yalnızca Akkusativ nesnesi olan fiiller tam edilgen kurar. Dativ " +
          "alan fiillerde (helfen, danken, gratulieren) nesne Dativ kalır ve " +
          "cümlenin öznesi olmaz: \"Mir wird geholfen.\"",
      ),
    ],
  },

  {
    id: "b1-plusquamperfekt",
    level: "B1",
    title: "Geçmişin öncesi",
    de: "Plusquamperfekt",
    summary: "hatte / war + Partizip II — geçmişte daha da geride",
    blocks: [
      table(
        ["Kişi", "haben ile", "sein ile"],
        [
          ["ich", "hatte gearbeitet", "war gegangen"],
          ["du", "hattest gearbeitet", "warst gegangen"],
          ["er / sie / es", "hatte gearbeitet", "war gegangen"],
          ["wir", "hatten gearbeitet", "waren gegangen"],
          ["ihr", "hattet gearbeitet", "wart gegangen"],
          ["sie / Sie", "hatten gearbeitet", "waren gegangen"],
        ],
      ),
      note(
        "Yardımcı fiil seçimi Perfekt'le AYNI: Perfekt'te \"ist gegangen\" " +
          "diyorsanız Plusquamperfekt'te \"war gegangen\" olur. Değişen " +
          "yalnızca yardımcı fiilin zamanı.",
      ),
      table(
        ["Cümle", "Önce olan", "Sonra olan"],
        [
          ["Nachdem ich gegessen hatte, ging ich spazieren.", "yemek", "yürüyüş"],
          ["Als wir ankamen, war der Film schon zu Ende gegangen.", "filmin bitmesi", "varış"],
          ["Ich hatte den Schlüssel vergessen, deshalb konnte ich nicht rein.", "unutmak", "girememek"],
          ["Sie war noch nie geflogen, bevor sie nach Japan reiste.", "hiç uçmamış olmak", "yolculuk"],
        ],
        "İki geçmiş olayın sırası",
      ),
      note(
        "Tek başına neredeyse hiç kullanılmaz: her zaman BAŞKA bir geçmiş " +
          "olayla birlikte, ondan önce olduğunu göstermek için. En sık eşlikçisi " +
          "\"nachdem\".",
      ),
    ],
  },

  {
    id: "b1-konjunktiv2",
    level: "B1",
    title: "Dilek-şart kipi",
    de: "Konjunktiv II",
    summary: "olmayan durumlar: keşke, olsaydı, yapardım",
    blocks: [
      table(
        ["Mastar", "Konjunktiv II", "Kullanılır mı"],
        [
          ["sein", "wäre", "her zaman"],
          ["haben", "hätte", "her zaman"],
          ["werden", "würde", "her zaman"],
          ["können", "könnte", "her zaman"],
          ["müssen", "müsste", "her zaman"],
          ["dürfen", "dürfte", "her zaman"],
          ["sollen", "sollte", "her zaman"],
          ["mögen", "möchte", "her zaman"],
          ["wissen", "wüsste", "sık"],
          ["gehen", "ginge", "yazı dili"],
          ["kommen", "käme", "yazı dili"],
          ["geben", "gäbe", "yazı dili (es gäbe)"],
          ["tun", "täte", "yazı dili"],
          ["brauchen", "bräuchte", "konuşmada yaygın"],
          ["diğer bütün fiiller", "würde + mastar", "her zaman"],
        ],
      ),
      note(
        "Präteritum gövdesine umlaut ve -e eklenerek yapılır (war → wäre, " +
          "konnte → könnte). Ama düzenli fiillerde Präteritum'la aynı çıkar " +
          "(machte = machte) — bu yüzden onlarda \"würde + mastar\" kullanılır.",
      ),
      table(
        ["Kullanım", "Yapı", "Örnek"],
        [
          ["Gerçek dışı koşul", "Wenn … Konjunktiv II, … würde/wäre", "Wenn ich Zeit hätte, würde ich kommen."],
          ["Geçmişte gerçekleşmemiş", "Wenn … hätte/wäre + P II", "Wenn ich Zeit gehabt hätte, wäre ich gekommen."],
          ["Keşke", "Wenn … nur/doch …!", "Wenn ich nur mehr Zeit hätte!"],
          ["Tavsiye", "An deiner Stelle würde ich …", "An deiner Stelle würde ich warten."],
          ["Yumuşak öneri", "sollte / könnte", "Du solltest zum Arzt gehen."],
          ["Kibar rica", "Könnten Sie …?", "Könnten Sie mir helfen?"],
          ["Tahmin", "dürfte", "Er dürfte schon zu Hause sein."],
          ["Neredeyse oluyordu", "fast / beinahe + Konj. II geçmiş", "Ich wäre fast eingeschlafen."],
          ["Sanki", "als ob / als wenn + Konj. II", "Er tut so, als ob er alles wüsste."],
        ],
      ),
      note(
        "Geçmiş biçim TEK bir kalıptır: hätte/wäre + Partizip II. \"würde " +
          "gemacht haben\" diye bir şey öğretilmez, kullanılmaz.",
      ),
      note(
        "Koşul cümlesinde \"wenn\" atılabilir; o zaman fiil başa geçer: " +
          "\"Hätte ich Zeit, würde ich kommen.\" Yazı dilinde sık.",
      ),
    ],
  },

  {
    id: "b1-genitiv",
    level: "B1",
    title: "Genitiv",
    de: "Genitiv",
    summary: "sahiplik hâli ve Genitiv isteyen edatlar",
    blocks: [
      table(
        ["Durum", "maskulin", "feminin", "neutrum", "çoğul"],
        [
          ["Genitiv artikel", "des", "der", "des", "der"],
          ["Belirsiz", "eines", "einer", "eines", "—"],
          ["İyelik", "meines", "meiner", "meines", "meiner"],
          ["İsim eki", "-(e)s", "yok", "-(e)s", "yok"],
          ["Örnek", "des Mannes", "der Frau", "des Kindes", "der Kinder"],
        ],
      ),
      note(
        "Yalnızca eril ve nötr isimler ek alır: tek heceliler -es (des " +
          "Kindes, des Mannes), çok heceliler -s (des Lehrers, des Computers). " +
          "Dişil isim ve çoğul HİÇ değişmez, yalnızca artikel değişir.",
      ),
      table(
        ["Edat", "Türkçe", "Örnek"],
        [
          ["wegen", "yüzünden", "wegen des Wetters"],
          ["während", "sırasında", "während der Pause"],
          ["trotz", "-e rağmen", "trotz des Regens"],
          ["statt / anstatt", "yerine", "statt eines Autos"],
          ["außerhalb", "dışında", "außerhalb der Stadt"],
          ["innerhalb", "içinde (süre/alan)", "innerhalb einer Woche"],
          ["aufgrund", "-den dolayı", "aufgrund der Krise"],
          ["anlässlich", "vesilesiyle", "anlässlich des Jubiläums"],
          ["angesichts", "karşısında", "angesichts der Lage"],
          ["unweit", "yakınında", "unweit des Bahnhofs"],
        ],
        "Genitiv isteyen edatlar",
      ),
      table(
        ["Yazı dili (Genitiv)", "Konuşma (von + Dativ)"],
        [
          ["das Auto meines Bruders", "das Auto von meinem Bruder"],
          ["die Farbe des Hauses", "die Farbe von dem Haus"],
          ["wegen des Wetters", "wegen dem Wetter"],
          ["trotz des Regens", "trotz dem Regen"],
        ],
        "Konuşmada Genitiv çoğu zaman von'a döner",
      ),
      note(
        "Özel isimlerde -s doğrudan eklenir ve artikel gerekmez: Annas Auto, " +
          "Peters Bruder. -s, -ß, -x, -z ile bitiyorsa kesme işareti: " +
          "Thomas' Buch.",
      ),
      note(
        "Genitiv'de SIFAT da çekilir ve tablosu kısadır: artikelli her " +
          "durumda -en (des guten Weines, der guten Frau, trotz des " +
          "schlechten Wetters). Artikelsizken eril ve nötr yine -en " +
          "(guten Weines), dişil ve çoğul -er alır (guter Milch, guter Weine).",
      ),
    ],
  },

  {
    id: "b1-ndeklination",
    level: "B1",
    title: "n-çekimi",
    de: "n-Deklination",
    summary: "Nominativ dışında -(e)n alan eril isimler",
    blocks: [
      table(
        ["Durum", "der Junge", "der Student", "der Herr", "der Name"],
        [
          ["Nominativ", "der Junge", "der Student", "der Herr", "der Name"],
          ["Akkusativ", "den Jungen", "den Studenten", "den Herrn", "den Namen"],
          ["Dativ", "dem Jungen", "dem Studenten", "dem Herrn", "dem Namen"],
          ["Genitiv", "des Jungen", "des Studenten", "des Herrn", "des Namens"],
          ["Çoğul", "die Jungen", "die Studenten", "die Herren", "die Namen"],
        ],
      ),
      table(
        ["Grup", "Örnekler"],
        [
          ["-e ile biten canlılar", "der Junge, der Kunde, der Kollege, der Neffe, der Zeuge"],
          ["Milletler", "der Türke, der Franzose, der Grieche, der Pole, der Ire"],
          ["Hayvanlar", "der Löwe, der Bär, der Hase, der Affe, der Rabe"],
          ["-ent, -ant, -ist, -at", "der Student, der Praktikant, der Journalist, der Soldat"],
          ["-oge, -graf, -arch", "der Biologe, der Fotograf, der Monarch"],
          ["Tek tek", "der Mensch, der Nachbar, der Bauer, der Held, der Herr"],
          ["Genitiv'de -ns", "der Name, der Gedanke, der Wille, das Herz"],
        ],
      ),
      note(
        "Kural şu: bu isimler Nominativ TEKİL dışında her yerde -(e)n alır. " +
          "\"Ich kenne den Student\" yanlıştır — \"den Studenten\" olmalı. " +
          "Sık yapılan ve kulakla yakalanmayan bir hata.",
      ),
      note(
        "İki istisna: \"der Herr\" tekilde -n, çoğulda -en alır (den Herrn / " +
          "die Herren). \"der Name\" grubu Genitiv'de -ns alır (des Namens).",
      ),
    ],
  },

  {
    id: "b1-infinitiv-zu",
    level: "B1",
    title: "zu'lu mastar",
    de: "Infinitiv mit zu",
    summary: "zu ne zaman gelir, ne zaman gelmez — ve um…zu",
    blocks: [
      table(
        ["Tetikleyen", "Örnek"],
        [
          ["versuchen", "Ich versuche, früher aufzustehen."],
          ["vergessen", "Vergiss nicht, mich anzurufen!"],
          ["anfangen / beginnen", "Es fing an zu regnen."],
          ["aufhören", "Hör auf zu rauchen!"],
          ["hoffen", "Ich hoffe, dich bald zu sehen."],
          ["planen / vorhaben", "Wir haben vor, nach Wien zu fahren."],
          ["sich freuen", "Ich freue mich, Sie kennenzulernen."],
          ["Lust / Zeit haben", "Hast du Lust, ins Kino zu gehen?"],
          ["es ist + sıfat", "Es ist wichtig, pünktlich zu sein."],
          ["scheinen", "Er scheint müde zu sein."],
          ["brauchen + nicht/nur", "Du brauchst nicht zu kommen."],
        ],
        "zu GEREKİR",
      ),
      table(
        ["Grup", "Örnek"],
        [
          ["Modal fiiller", "Ich muss arbeiten."],
          ["werden (gelecek)", "Ich werde arbeiten."],
          ["gehen, fahren, kommen", "Ich gehe schwimmen."],
          ["sehen, hören", "Ich höre ihn singen."],
          ["lassen", "Ich lasse mir die Haare schneiden."],
          ["bleiben", "Er blieb stehen."],
          ["helfen, lehren, lernen", "Er hilft mir aufräumen."],
        ],
        "zu GELMEZ",
      ),
      note(
        "Ayrılabilen fiilde \"zu\" önekle kökün ARASINA girer ve bitişik " +
          "yazılır: anrufen → anzurufen, aufstehen → aufzustehen, mitkommen → " +
          "mitzukommen.",
      ),
      table(
        ["Yapı", "Anlam", "Örnek", "Koşul"],
        [
          ["um … zu", "-mek için", "Ich lerne, um die Prüfung zu bestehen.", "iki cümlenin öznesi AYNI"],
          ["damit", "-mesi için", "Ich erkläre es, damit du es verstehst.", "özneler farklı olabilir"],
          ["ohne … zu", "-meden", "Er ging, ohne etwas zu sagen.", "özneler aynı"],
          ["ohne dass", "-meden", "Er ging, ohne dass ich es merkte.", "özneler farklı"],
          ["(an)statt … zu", "-ecek yerde", "Statt zu lernen, spielt er.", "özneler aynı"],
        ],
        "Amaç ve karşıtlık",
      ),
      note(
        "\"um … zu\" yalnızca iki cümlenin öznesi aynıysa kullanılabilir. " +
          "Farklıysa \"damit\" zorunlu: \"Ich erkläre es, damit du es " +
          "verstehst\" — açıklayan ben, anlayan sen.",
      ),
    ],
  },

  {
    id: "b1-da-wo",
    level: "B1",
    title: "da- ve wo- bileşikleri",
    de: "Präpositionaladverbien",
    summary: "darauf, worauf — edatın nesnesi eşya olduğunda",
    blocks: [
      table(
        ["Edat", "da- biçimi", "wo- biçimi", "Örnek"],
        [
          ["an", "daran", "woran", "Ich denke daran. — Woran denkst du?"],
          ["auf", "darauf", "worauf", "Ich warte darauf. — Worauf wartest du?"],
          ["aus", "daraus", "woraus", "Daraus folgt nichts."],
          ["bei", "dabei", "wobei", "Er hilft mir dabei."],
          ["für", "dafür", "wofür", "Danke dafür! — Wofür ist das?"],
          ["gegen", "dagegen", "wogegen", "Ich bin dagegen."],
          ["in", "darin", "worin", "Worin liegt das Problem?"],
          ["mit", "damit", "womit", "Ich rechne damit. — Womit fährst du?"],
          ["nach", "danach", "wonach", "Ich frage danach."],
          ["über", "darüber", "worüber", "Wir sprechen darüber."],
          ["um", "darum", "worum", "Es geht darum. — Worum geht es?"],
          ["von", "davon", "wovon", "Ich träume davon."],
          ["vor", "davor", "wovor", "Ich habe Angst davor."],
          ["zu", "dazu", "wozu", "Was sagst du dazu?"],
        ],
      ),
      note(
        "Kural tek cümle: edatın nesnesi EŞYA ya da bir olaysa da(r)-/wo(r)- " +
          "bileşiği kullanılır; İNSANSA normal zamir ve soru kelimesi kalır. " +
          "Ich warte auf den Bus → Ich warte darauf. Ich warte auf meinen " +
          "Bruder → Ich warte auf ihn.",
      ),
      note(
        "Edat ünlüyle başlıyorsa araya -r- girer: da + auf → darauf, wo + " +
          "über → worüber.",
      ),
      table(
        ["Yapı", "Örnek"],
        [
          ["da-Wort + dass", "Ich freue mich darauf, dass du kommst."],
          ["da-Wort + zu", "Ich freue mich darauf, dich zu sehen."],
          ["da-Wort + soru", "Ich weiß nicht, wovon er spricht."],
        ],
        "Bir cümleye gönderme yaparken",
      ),
      note(
        "Fiil bir edat istiyorsa ve arkasından yan cümle geliyorsa, ana " +
          "cümlede da-Wort yer TUTUCU olarak durur: \"Ich freue mich darauf, " +
          "dass…\" — darauf atılamaz.",
      ),
    ],
  },

  {
    id: "b1-futur",
    level: "B1",
    title: "Gelecek zaman",
    de: "Futur I",
    summary: "werden + mastar — ve neden az kullanıldığı",
    blocks: [
      table(
        ["Kişi", "Futur I", "Örnek"],
        [
          ["ich", "werde … machen", "Ich werde morgen anrufen."],
          ["du", "wirst … machen", "Du wirst es schaffen."],
          ["er / sie / es", "wird … machen", "Er wird bald kommen."],
          ["wir", "werden … machen", "Wir werden uns melden."],
          ["ihr", "werdet … machen", "Ihr werdet euch freuen."],
          ["sie / Sie", "werden … machen", "Sie werden benachrichtigt."],
        ],
      ),
      table(
        ["Kullanım", "Örnek"],
        [
          ["Söz, karar", "Ich werde dich nicht enttäuschen."],
          ["Tahmin (wohl, sicher ile)", "Er wird wohl im Stau stehen."],
          ["Uyarı", "Das wirst du bereuen."],
          ["Resmî duyuru", "Der Zug wird mit Verspätung eintreffen."],
        ],
      ),
      note(
        "Gündelik Almancada gelecek çoğunlukla PRÄSENS ile söylenir; zaman " +
          "zarfı zaten geleceği gösterir: \"Morgen fahre ich nach Berlin.\" " +
          "Futur I daha çok söz verirken ve tahmin ederken kullanılır.",
      ),
      note(
        "Şimdiki zamanla ilgili tahmin de Futur I ile kurulur: \"Er wird " +
          "jetzt zu Hause sein\" = şu anda evdedir herhalde. Gelecekle ilgisi " +
          "yok.",
      ),
    ],
  },

  {
    id: "b1-adjektiv-nomen",
    level: "B1",
    title: "Sıfattan isim, sıfat olarak ortaç",
    de: "Nominalisierte Adjektive und Partizipien",
    summary: "das Beste, etwas Neues, das schlafende Kind",
    blocks: [
      table(
        ["Biçim", "Anlam", "Örnek"],
        [
          ["der / die Deutsche", "Alman (belirli)", "Die Deutsche heißt Anna."],
          ["ein Deutscher", "bir Alman erkek", "Ein Deutscher hat gefragt."],
          ["eine Deutsche", "bir Alman kadın", "Eine Deutsche hat gefragt."],
          ["der Angestellte", "çalışan", "Der Angestellte kommt gleich."],
          ["die Erwachsenen", "yetişkinler", "Nur für Erwachsene."],
          ["der Bekannte", "tanıdık", "Ein Bekannter von mir."],
          ["das Beste", "en iyisi", "Das ist das Beste."],
          ["etwas Neues", "yeni bir şey", "Gibt es etwas Neues?"],
          ["nichts Besonderes", "özel bir şey yok", "Nichts Besonderes."],
          ["viel Interessantes", "çok ilginç şey", "Ich habe viel Interessantes gelesen."],
        ],
      ),
      note(
        "Sıfattan yapılan isim büyük harfle yazılır ama SIFAT gibi çekilmeye " +
          "devam eder: der Deutsche / ein Deutscher / mit einem Deutschen. " +
          "etwas, nichts, viel, wenig sonrası -es alır ve büyük yazılır.",
      ),
      table(
        ["Ortaç", "Yapılışı", "Anlamı", "Örnek"],
        [
          ["Partizip I", "mastar + d", "aktif, sürüyor", "das schlafende Kind"],
          ["Partizip I", "mastar + d", "aktif, sürüyor", "die steigenden Preise"],
          ["Partizip II", "Partizip II", "edilgen ya da bitmiş", "das gekochte Ei"],
          ["Partizip II", "Partizip II", "edilgen ya da bitmiş", "der reparierte Wagen"],
          ["Partizip II (sein fiilleri)", "Partizip II", "bitmiş, aktif", "der angekommene Zug"],
        ],
      ),
      note(
        "Ortaç sıfat gibi ÇEKİLİR: das schlafende Kind, dem schlafenden Kind. " +
          "Partizip I \"yapan/yapmakta olan\", Partizip II \"yapılmış\" demek: " +
          "das lesende Kind (okuyan çocuk) / das gelesene Buch (okunmuş kitap).",
      ),
    ],
  },

  {
    id: "b1-verben",
    level: "B1",
    title: "Düzensiz fiiller — B1",
    de: "Unregelmäßige Verben",
    summary: "B1'e kadar geçen düzensiz fiillerin dört biçimi",
    blocks: [
      table(
        ["Infinitiv", "Präsens (er)", "Präteritum", "Perfekt", "Türkçe"],
        verbsUpTo("B1").map((v) => [v.inf, v.prs, v.prt, v.prf, v.tr]),
      ),
      note(
        "Präteritum sütunu B1'de ayrıca önem kazanıyor: yazılı metinlerin " +
          "geçmiş zamanı bu ve okuma sınavlarında Perfekt'ten çok bu biçim " +
          "geçiyor.",
      ),
    ],
  },
];
