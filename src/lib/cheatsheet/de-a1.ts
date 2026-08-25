import { note, table, type CheatSheet } from "./types";
import { verbsUpTo } from "./verbs";

/**
 * A1 başvuru sayfaları — dilin iskeleti.
 *
 * Seçim müfredatın kendisinden çıkıyor (data/lessons-plan/topics-a1.md): ilk
 * 100 derste öğretilen her dilbilgisi konusunun burada bir tablosu var. Ders
 * konuyu anlatıyor, buradaki sayfa onu tek ekranda TOPLUYOR — ikisi aynı şey
 * değil ve biri diğerinin yerine geçmiyor.
 */
export const DE_A1: CheatSheet[] = [
  {
    id: "a1-artikel",
    level: "A1",
    title: "Artikel ve durumlar",
    de: "Artikel im Nominativ, Akkusativ, Dativ",
    summary: "der/die/das üç durumda nasıl değişiyor",
    blocks: [
      table(
        ["Durum", "maskulin", "feminin", "neutrum", "çoğul"],
        [
          ["Nominativ (kim? ne?)", "der", "die", "das", "die"],
          ["Akkusativ (kimi? neyi?)", "den", "die", "das", "die"],
          ["Dativ (kime? neye?)", "dem", "der", "dem", "den"],
        ],
        "Belirli artikel",
      ),
      table(
        ["Durum", "maskulin", "feminin", "neutrum", "çoğul"],
        [
          ["Nominativ", "ein", "eine", "ein", "—"],
          ["Akkusativ", "einen", "eine", "ein", "—"],
          ["Dativ", "einem", "einer", "einem", "—"],
        ],
        "Belirsiz artikel",
      ),
      table(
        ["Durum", "maskulin", "feminin", "neutrum", "çoğul"],
        [
          ["Nominativ", "kein", "keine", "kein", "keine"],
          ["Akkusativ", "keinen", "keine", "kein", "keine"],
          ["Dativ", "keinem", "keiner", "keinem", "keinen"],
        ],
        "Olumsuz artikel — ein gibi çekilir, çoğulu da vardır",
      ),
      note(
        "Değişen tek hücre maskulin Akkusativ: der → den, ein → einen. Dişil " +
          "ve nötr Nominativ ile Akkusativ'de aynı kalır — bu yüzden hata da " +
          "hep eril kelimelerde yapılır.",
      ),
      note(
        "Dativ çoğulda İSİM de -n alır: mit den Kindern, mit den Freunden. " +
          "Zaten -n ile bitenler ve -s ile çoğullananlar hariç: mit den " +
          "Frauen, mit den Autos.",
      ),
      table(
        ["Kaynaşma", "Açılımı", "Örnek"],
        [
          ["am", "an dem", "am Montag, am Bahnhof"],
          ["ans", "an das", "Ich gehe ans Fenster."],
          ["im", "in dem", "im Juni, im Kino"],
          ["ins", "in das", "Ich gehe ins Kino."],
          ["beim", "bei dem", "beim Arzt"],
          ["vom", "von dem", "vom Bahnhof"],
          ["zum", "zu dem", "zum Arzt, zum Bahnhof"],
          ["zur", "zu der", "zur Schule, zur Arbeit"],
          ["aufs", "auf das", "aufs Land"],
        ],
        "Artikel edatla kaynaşır",
      ),
    ],
  },

  {
    id: "a1-pronomen",
    level: "A1",
    title: "Kişi zamirleri",
    de: "Personalpronomen",
    summary: "ich–mich–mir: zamirin üç durumdaki hâli",
    blocks: [
      table(
        ["Nominativ", "Akkusativ", "Dativ", "Türkçe"],
        [
          ["ich", "mich", "mir", "ben"],
          ["du", "dich", "dir", "sen"],
          ["er", "ihn", "ihm", "o (eril)"],
          ["sie", "sie", "ihr", "o (dişil)"],
          ["es", "es", "ihm", "o (nötr)"],
          ["wir", "uns", "uns", "biz"],
          ["ihr", "euch", "euch", "siz"],
          ["sie", "sie", "ihnen", "onlar"],
          ["Sie", "Sie", "Ihnen", "siz (resmî)"],
        ],
      ),
      note(
        "Nesne bir EŞYAYSA da zamir cinsiyeti taşır: Wo ist der Schlüssel? — " +
          "Ich habe ihn. Türkçede hepsi \"o\" olduğu için burada \"es\" demek " +
          "en sık yapılan hata.",
      ),
      note(
        "İki nesne varsa sıra: önce Akkusativ, sonra Dativ — ama yalnızca " +
          "ikisi de ZAMİRSE. Ich gebe dem Kind das Buch. → Ich gebe es ihm.",
      ),
    ],
  },

  {
    id: "a1-possessiv",
    level: "A1",
    title: "İyelik sıfatları",
    de: "Possessivartikel",
    summary: "mein, dein, sein… ve aldıkları ekler",
    blocks: [
      table(
        ["Kişi", "maskulin / neutrum", "feminin / çoğul", "Türkçe"],
        [
          ["ich", "mein", "meine", "benim"],
          ["du", "dein", "deine", "senin"],
          ["er / es", "sein", "seine", "onun (eril/nötr)"],
          ["sie", "ihr", "ihre", "onun (dişil)"],
          ["wir", "unser", "unsere", "bizim"],
          ["ihr", "euer", "eure", "sizin"],
          ["sie", "ihr", "ihre", "onların"],
          ["Sie", "Ihr", "Ihre", "sizin (resmî)"],
        ],
        "Nominativ",
      ),
      table(
        ["Durum", "maskulin", "feminin", "neutrum", "çoğul"],
        [
          ["Nominativ", "mein", "meine", "mein", "meine"],
          ["Akkusativ", "meinen", "meine", "mein", "meine"],
          ["Dativ", "meinem", "meiner", "meinem", "meinen"],
        ],
        "Ekler ein/kein ile birebir aynı — biri biliniyorsa üçü de biliniyor",
      ),
      note(
        "\"ihr\" iki şey demek: onun (dişil) ve onların. Hangisi olduğunu " +
          "yalnızca cümlenin öznesi söyler. Büyük harfli \"Ihr\" ise her zaman " +
          "resmî \"sizin\".",
      ),
      note("euer + ek alınca \"e\" düşer: euer Haus, ama eure Wohnung, euren Sohn."),
    ],
  },

  {
    id: "a1-praesens",
    level: "A1",
    title: "Geniş zaman çekimi",
    de: "Präsens",
    summary: "düzenli ekler ve du/er'de ünlü değiştiren fiiller",
    blocks: [
      table(
        ["Kişi", "Ek", "lernen", "arbeiten", "heißen"],
        [
          ["ich", "-e", "lerne", "arbeite", "heiße"],
          ["du", "-st", "lernst", "arbeitest", "heißt"],
          ["er / sie / es", "-t", "lernt", "arbeitet", "heißt"],
          ["wir", "-en", "lernen", "arbeiten", "heißen"],
          ["ihr", "-t", "lernt", "arbeitet", "heißt"],
          ["sie / Sie", "-en", "lernen", "arbeiten", "heißen"],
        ],
        "Düzenli çekim ve iki yazım kuralı",
      ),
      note(
        "Kök -t, -d, -n, -m ile bitiyorsa araya \"e\" girer (du arbeitest, er " +
          "findet). Kök -s, -ß, -z, -x ile bitiyorsa du eki yalnızca -t olur " +
          "(du heißt, du sitzt) — yani du ve er aynı görünür.",
      ),
      table(
        ["Mastar", "du", "er / sie / es", "Değişim", "Türkçe"],
        [
          ["fahren", "fährst", "fährt", "a → ä", "gitmek (araçla)"],
          ["schlafen", "schläfst", "schläft", "a → ä", "uyumak"],
          ["tragen", "trägst", "trägt", "a → ä", "taşımak, giymek"],
          ["laufen", "läufst", "läuft", "au → äu", "koşmak"],
          ["sprechen", "sprichst", "spricht", "e → i", "konuşmak"],
          ["essen", "isst", "isst", "e → i", "yemek"],
          ["geben", "gibst", "gibt", "e → i", "vermek"],
          ["helfen", "hilfst", "hilft", "e → i", "yardım etmek"],
          ["treffen", "triffst", "trifft", "e → i", "buluşmak"],
          ["nehmen", "nimmst", "nimmt", "e → i", "almak"],
          ["lesen", "liest", "liest", "e → ie", "okumak"],
          ["sehen", "siehst", "sieht", "e → ie", "görmek"],
          ["empfehlen", "empfiehlst", "empfiehlt", "e → ie", "tavsiye etmek"],
          ["wissen", "weißt", "weiß", "düzensiz", "bilmek"],
        ],
        "Ünlü değiştirenler — yalnızca du ve er/sie/es",
      ),
      note(
        "Değişim ihr'de YOKTUR: ihr fahrt, ihr sprecht, ihr lest. Emirde de " +
          "du biçimi esas alınır ama -st düşer: Sprich! Nimm! Lies! — buna " +
          "karşılık a → ä değişimi emirde olmaz: Fahr! Schlaf!",
      ),
    ],
  },

  {
    id: "a1-sein-haben",
    level: "A1",
    title: "sein, haben, werden",
    de: "Die drei Hilfsverben",
    summary: "üç yardımcı fiil, şimdi ve geçmiş",
    blocks: [
      table(
        ["Kişi", "sein (olmak)", "haben (sahip olmak)", "werden (olmak, dönüşmek)"],
        [
          ["ich", "bin", "habe", "werde"],
          ["du", "bist", "hast", "wirst"],
          ["er / sie / es", "ist", "hat", "wird"],
          ["wir", "sind", "haben", "werden"],
          ["ihr", "seid", "habt", "werdet"],
          ["sie / Sie", "sind", "haben", "werden"],
        ],
        "Präsens",
      ),
      table(
        ["Kişi", "sein", "haben", "werden"],
        [
          ["ich", "war", "hatte", "wurde"],
          ["du", "warst", "hattest", "wurdest"],
          ["er / sie / es", "war", "hatte", "wurde"],
          ["wir", "waren", "hatten", "wurden"],
          ["ihr", "wart", "hattet", "wurdet"],
          ["sie / Sie", "waren", "hatten", "wurden"],
        ],
        "Präteritum — bu üç fiil geçmişte Perfekt yerine bu biçimde kullanılır",
      ),
      note(
        "\"Ich bin gewesen\" ve \"ich habe gehabt\" dilbilgisi olarak doğru ama " +
          "konuşmada kimse kullanmaz. Bu üç fiil ve modal fiiller geçmişte " +
          "Präteritum ile söylenir: Ich war müde. Ich hatte keine Zeit.",
      ),
    ],
  },

  {
    id: "a1-modalverben",
    level: "A1",
    title: "Modal fiiller",
    de: "Modalverben",
    summary: "können, müssen, wollen, sollen, dürfen, mögen, möchten",
    blocks: [
      table(
        ["Kişi", "können", "müssen", "wollen", "sollen", "dürfen", "mögen", "möchten"],
        [
          ["ich", "kann", "muss", "will", "soll", "darf", "mag", "möchte"],
          ["du", "kannst", "musst", "willst", "sollst", "darfst", "magst", "möchtest"],
          ["er / sie / es", "kann", "muss", "will", "soll", "darf", "mag", "möchte"],
          ["wir", "können", "müssen", "wollen", "sollen", "dürfen", "mögen", "möchten"],
          ["ihr", "könnt", "müsst", "wollt", "sollt", "dürft", "mögt", "möchtet"],
          ["sie / Sie", "können", "müssen", "wollen", "sollen", "dürfen", "mögen", "möchten"],
        ],
        "Präsens",
      ),
      note(
        "Tekilde ünlü değişir ve ich ile er EK ALMAZ — ikisi hep aynıdır: ich " +
          "kann / er kann. Çoğulda fiil mastarına döner.",
      ),
      table(
        ["Fiil", "Anlamı", "Örnek"],
        [
          ["können", "-ebilmek (yetenek, imkân)", "Ich kann schwimmen."],
          ["müssen", "zorunda olmak", "Ich muss arbeiten."],
          ["nicht müssen", "gerek yok (yasak DEĞİL)", "Du musst nicht kommen."],
          ["dürfen", "izin var", "Darf ich hier rauchen?"],
          ["nicht dürfen", "yasak", "Hier darf man nicht parken."],
          ["wollen", "istemek (kararlı, niyet)", "Ich will Arzt werden."],
          ["möchten", "istemek (kibar, o anlık)", "Ich möchte einen Kaffee."],
          ["sollen", "-meli (başkasının isteği)", "Der Arzt sagt, ich soll schlafen."],
          ["mögen", "sevmek (çoğu zaman fiilsiz)", "Ich mag Schokolade."],
        ],
        "Anlam farkları — çekimden çok bu karıştırılıyor",
      ),
      note(
        "Modal fiil çekilir, ASIL fiil mastar hâlinde cümlenin sonuna gider: " +
          "Ich kann heute leider nicht kommen. Ayrılabilen fiil sona giderken " +
          "birleşir: Ich muss dich morgen anrufen.",
      ),
      table(
        ["Kişi", "können", "müssen", "wollen", "sollen", "dürfen"],
        [
          ["ich / er", "konnte", "musste", "wollte", "sollte", "durfte"],
          ["du", "konntest", "musstest", "wolltest", "solltest", "durftest"],
          ["wir / sie", "konnten", "mussten", "wollten", "sollten", "durften"],
          ["ihr", "konntet", "musstet", "wolltet", "solltet", "durftet"],
        ],
        "Präteritum — umlaut düşer, -te eklenir",
      ),
    ],
  },

  {
    id: "a1-trennbar",
    level: "A1",
    title: "Ayrılabilen fiiller",
    de: "Trennbare Verben",
    summary: "önek sona gider — hangi önekler ayrılır, hangileri ayrılmaz",
    blocks: [
      table(
        ["Fiil", "Cümlede", "Türkçe"],
        [
          ["aufstehen", "Ich stehe um sieben auf.", "kalkmak"],
          ["anrufen", "Ich rufe dich später an.", "telefon etmek"],
          ["einkaufen", "Wir kaufen im Supermarkt ein.", "alışveriş etmek"],
          ["aussehen", "Du siehst müde aus.", "görünmek"],
          ["mitkommen", "Kommst du mit?", "birlikte gelmek"],
          ["abfahren", "Der Zug fährt um acht ab.", "hareket etmek"],
          ["ankommen", "Wir kommen um zehn an.", "varmak"],
          ["zumachen", "Mach bitte die Tür zu.", "kapatmak"],
          ["aufmachen", "Ich mache das Fenster auf.", "açmak"],
          ["vorstellen", "Ich stelle dir Anna vor.", "tanıştırmak"],
          ["fernsehen", "Abends sehe ich fern.", "televizyon izlemek"],
          ["anfangen", "Der Film fängt gleich an.", "başlamak"],
          ["aufhören", "Hör bitte auf!", "durmak, bırakmak"],
          ["einladen", "Ich lade dich ein.", "davet etmek"],
          ["weggehen", "Er geht früh weg.", "ayrılmak, gitmek"],
          ["zurückkommen", "Wann kommst du zurück?", "geri dönmek"],
        ],
        "Ayrılan önekler: ab-, an-, auf-, aus-, ein-, mit-, nach-, vor-, zu-, zurück-, weg-, fern-, los-, hin-, her-",
      ),
      table(
        ["Fiil", "Cümlede", "Türkçe"],
        [
          ["bezahlen", "Ich bezahle die Rechnung.", "ödemek"],
          ["verstehen", "Ich verstehe dich nicht.", "anlamak"],
          ["erzählen", "Er erzählt eine Geschichte.", "anlatmak"],
          ["gehören", "Das gehört mir.", "ait olmak"],
          ["entschuldigen", "Entschuldigen Sie bitte!", "affetmek"],
          ["empfehlen", "Ich empfehle das Fischgericht.", "tavsiye etmek"],
          ["missverstehen", "Du hast mich missverstanden.", "yanlış anlamak"],
        ],
        "Ayrılmayan önekler: be-, ge-, er-, ver-, zer-, ent-, emp-, miss-",
      ),
      note(
        "Ayrılabilen fiilin öneki vurguludur: ANrufen. Ayrılmayanda vurgu " +
          "kökte: verSTEHen. Kural ezberlenmese bile kelime doğru duyulunca " +
          "hangisi olduğu anlaşılır.",
      ),
      note(
        "Önek yan cümlede ve mastar hâlinde YENİDEN birleşir: Ich weiß, dass " +
          "der Zug um acht abfährt. / Ich muss dich anrufen. Perfekt'te ise " +
          "araya girer: Ich habe dich angerufen.",
      ),
    ],
  },

  {
    id: "a1-satzbau",
    level: "A1",
    title: "Cümle dizilişi",
    de: "Wortstellung",
    summary: "fiil ikinci sırada — ve sıranın geri kalanı",
    blocks: [
      table(
        ["Cümle türü", "1. yer", "2. yer: fiil", "Devamı"],
        [
          ["Düz cümle", "Ich", "lerne", "heute Deutsch."],
          ["Öne çekilmiş", "Heute", "lerne", "ich Deutsch."],
          ["Öne çekilmiş", "In Berlin", "wohnt", "meine Schwester."],
          ["W-sorusu", "Wann", "lernst", "du Deutsch?"],
          ["Ja/Nein sorusu", "—", "Lernst", "du Deutsch?"],
          ["Emir", "—", "Lern", "bitte Deutsch!"],
        ],
      ),
      note(
        "Tek kural: düz cümlede ve W-sorusunda ÇEKİLMİŞ FİİL İKİNCİ SIRADADIR. " +
          "Birinci sıraya ne gelirse gelsin özne fiilin arkasına geçer — " +
          "Türkçedeki gibi cümle başına zaman koyup özneyi yerinde bırakmak " +
          "en sık yapılan hata: \"Heute ich lerne\" değil, \"Heute lerne ich\".",
      ),
      table(
        ["Kısaltma", "Soru", "Örnekten", "Sıra"],
        [
          ["Te", "wann? (zaman)", "morgen", "1"],
          ["Ka", "warum? (neden)", "wegen der Arbeit", "2"],
          ["Mo", "wie? (nasıl)", "mit dem Zug", "3"],
          ["Lo", "wohin? wo? (yer)", "nach Berlin", "4"],
        ],
        "TeKaMoLo — cümle ortasının sırası",
      ),
      note(
        "Ich fahre morgen wegen der Arbeit mit dem Zug nach Berlin. Sıra " +
          "zorunlu değil ama doğal olan bu; vurgulanmak istenen öğe başa " +
          "çekilir.",
      ),
      table(
        ["Yapı", "Fiil nerede", "Örnek"],
        [
          ["Modal fiil", "mastar sona", "Ich will heute nicht arbeiten."],
          ["Perfekt", "Partizip sona", "Ich habe gestern gearbeitet."],
          ["Ayrılabilen fiil", "önek sona", "Ich stehe jeden Tag um sechs auf."],
          ["Yan cümle (weil, dass…)", "çekilmiş fiil sona", "…, weil ich müde bin."],
        ],
        "Cümle çerçevesi — Satzklammer",
      ),
    ],
  },

  {
    id: "a1-wfragen",
    level: "A1",
    title: "Soru kelimeleri",
    de: "W-Fragen",
    summary: "wer, was, wo, wohin… ve neyi sordukları",
    blocks: [
      table(
        ["Soru", "Türkçe", "Örnek"],
        [
          ["Wer?", "kim", "Wer ist das?"],
          ["Wen?", "kimi (Akkusativ)", "Wen rufst du an?"],
          ["Wem?", "kime (Dativ)", "Wem gehört das Buch?"],
          ["Was?", "ne", "Was machst du?"],
          ["Wo?", "nerede", "Wo wohnst du?"],
          ["Wohin?", "nereye", "Wohin gehst du?"],
          ["Woher?", "nereden", "Woher kommst du?"],
          ["Wann?", "ne zaman", "Wann beginnt der Kurs?"],
          ["Wie?", "nasıl", "Wie geht es dir?"],
          ["Wie viel?", "ne kadar", "Wie viel kostet das?"],
          ["Wie viele?", "kaç tane", "Wie viele Kinder hast du?"],
          ["Wie lange?", "ne kadar süre", "Wie lange bleibst du?"],
          ["Wie oft?", "ne sıklıkla", "Wie oft machst du Sport?"],
          ["Wie alt?", "kaç yaşında", "Wie alt bist du?"],
          ["Warum?", "niçin", "Warum lernst du Deutsch?"],
          ["Welcher / Welche / Welches?", "hangi", "Welches Buch liest du?"],
          ["Was für ein…?", "ne tür bir", "Was für ein Auto hast du?"],
        ],
      ),
      note(
        "Wo = nerede (durağan), wohin = nereye (hareket). Türkçede ikisi de " +
          "\"nere\" köküyle kurulduğu için ayrım gözden kaçar; Almancada " +
          "edatın durumunu bile bu belirler.",
      ),
      note(
        "welcher belirli seçenekler arasından seçtirir (Welches Hemd nimmst " +
          "du? — masadaki üç gömlekten), was für ein tür sorar (Was für ein " +
          "Hemd suchst du? — pamuklu mu, uzun kollu mu).",
      ),
    ],
  },

  {
    id: "a1-zahlen",
    level: "A1",
    title: "Sayılar, saat, tarih",
    de: "Zahlen, Uhrzeit, Datum",
    summary: "sayı okuma, saat söyleme, gün ve ay adları",
    blocks: [
      table(
        ["Sayı", "Almanca", "Sayı", "Almanca"],
        [
          ["0", "null", "16", "sechzehn"],
          ["1", "eins", "17", "siebzehn"],
          ["2", "zwei", "18", "achtzehn"],
          ["3", "drei", "19", "neunzehn"],
          ["4", "vier", "20", "zwanzig"],
          ["5", "fünf", "21", "einundzwanzig"],
          ["6", "sechs", "30", "dreißig"],
          ["7", "sieben", "40", "vierzig"],
          ["8", "acht", "50", "fünfzig"],
          ["9", "neun", "60", "sechzig"],
          ["10", "zehn", "70", "siebzig"],
          ["11", "elf", "80", "achtzig"],
          ["12", "zwölf", "90", "neunzig"],
          ["13", "dreizehn", "100", "(ein)hundert"],
          ["14", "vierzehn", "1000", "(ein)tausend"],
          ["15", "fünfzehn", "1 000 000", "eine Million"],
        ],
      ),
      note(
        "İki basamaklı sayılar TERSTEN okunur: 21 = einundzwanzig, yani " +
          "\"bir ve yirmi\". 345 = dreihundertfünfundvierzig. Dikkat edilecek " +
          "üç yazım: sechzehn/sechzig (s düşer), siebzehn/siebzig (en düşer), " +
          "dreißig (ß ile).",
      ),
      table(
        ["Saat", "Resmî", "Günlük"],
        [
          ["13:00", "dreizehn Uhr", "ein Uhr"],
          ["13:05", "dreizehn Uhr fünf", "fünf nach eins"],
          ["13:15", "dreizehn Uhr fünfzehn", "Viertel nach eins"],
          ["13:20", "dreizehn Uhr zwanzig", "zwanzig nach eins"],
          ["13:25", "dreizehn Uhr fünfundzwanzig", "fünf vor halb zwei"],
          ["13:30", "dreizehn Uhr dreißig", "halb zwei"],
          ["13:35", "dreizehn Uhr fünfunddreißig", "fünf nach halb zwei"],
          ["13:40", "dreizehn Uhr vierzig", "zwanzig vor zwei"],
          ["13:45", "dreizehn Uhr fünfundvierzig", "Viertel vor zwei"],
          ["13:55", "dreizehn Uhr fünfundfünfzig", "fünf vor zwei"],
        ],
      ),
      note(
        "\"halb zwei\" 1:30 demektir, 2:30 değil: Almanca yarım saati BİR " +
          "SONRAKİ saate göre söyler — \"ikiye yarım\". Aynı mantık 13:25 için " +
          "\"fünf vor halb zwei\" biçimini üretir.",
      ),
      table(
        ["Gün", "Ay", "Ay"],
        [
          ["Montag", "Januar", "Juli"],
          ["Dienstag", "Februar", "August"],
          ["Mittwoch", "März", "September"],
          ["Donnerstag", "April", "Oktober"],
          ["Freitag", "Mai", "November"],
          ["Samstag", "Juni", "Dezember"],
          ["Sonntag", "—", "—"],
        ],
      ),
      table(
        ["Ne söyleniyor", "Biçim", "Örnek"],
        [
          ["Saatte", "um + saat", "um acht Uhr"],
          ["Günde", "am + gün", "am Montag, am Wochenende"],
          ["Ayda / mevsimde", "im + ay", "im Juni, im Sommer"],
          ["Yılda", "yalın ya da im Jahr", "2026 / im Jahr 2026"],
          ["Tarihte", "am + sıra sayısı + -n", "am dritten Mai (3.5.)"],
          ["…den beri", "seit + Dativ", "seit einem Jahr"],
          ["…-e kadar", "bis", "bis Freitag"],
          ["…-den …-e", "von … bis", "von Montag bis Freitag"],
        ],
      ),
    ],
  },

  {
    id: "a1-plural",
    level: "A1",
    title: "Çoğul",
    de: "Plural",
    summary: "beş çoğul eki ve hangi kelimelere geldiği",
    blocks: [
      table(
        ["Ek", "Tekil", "Çoğul", "Tipik grup"],
        [
          ["-e", "der Tisch", "die Tische", "çoğu eril"],
          ["¨-e", "der Stuhl", "die Stühle", "eril, ünlü umlautlanır"],
          ["-er", "das Kind", "die Kinder", "kısa nötr"],
          ["¨-er", "das Buch", "die Bücher", "nötr ve bazı eriller"],
          ["-en", "die Frau", "die Frauen", "neredeyse bütün dişiller"],
          ["-n", "die Straße", "die Straßen", "-e ile bitenler"],
          ["-nen", "die Lehrerin", "die Lehrerinnen", "-in ile bitenler"],
          ["-s", "das Auto", "die Autos", "yabancı kelimeler, kısaltmalar"],
          ["— (değişmez)", "der Lehrer", "die Lehrer", "-er, -en, -el ile bitenler"],
          ["¨ (yalnız umlaut)", "der Vater", "die Väter", "-er ile biten akrabalık"],
        ],
      ),
      note("Çoğulun artikeli cinsiyetten bağımsız olarak her zaman \"die\"dir."),
      note(
        "Kural değil eğilim: çoğul kelimenin bir PARÇASIDIR ve kelimeyle " +
          "birlikte öğrenilir. Sözlükte \"der Stuhl, -¨e\" yazması bunun için.",
      ),
      table(
        ["Kelime", "Çoğulu", "Neden dikkat"],
        [
          ["der Mann", "die Männer", "eril ama -er alır"],
          ["die Stadt", "die Städte", "dişil ama -e alır"],
          ["die Mutter", "die Mütter", "yalnız umlaut"],
          ["die Tochter", "die Töchter", "yalnız umlaut"],
          ["das Haus", "die Häuser", "au → äu"],
          ["der Bus", "die Busse", "-s ikizleşir"],
          ["die Frau", "die Frauen", "-en"],
          ["das Museum", "die Museen", "-um → -en"],
          ["der Urlaub", "—", "çoğulu yok"],
        ],
        "Sık geçen düzensizler",
      ),
    ],
  },

  {
    id: "a1-praepositionen",
    level: "A1",
    title: "Edatlar",
    de: "Präpositionen mit Akkusativ und Dativ",
    summary: "hangi edat hangi durumu istiyor",
    blocks: [
      table(
        ["Edat", "Türkçe", "Örnek"],
        [
          ["durch", "içinden, boyunca", "Wir gehen durch den Park."],
          ["für", "için", "Das ist für dich."],
          ["gegen", "karşı, -e doğru", "Ich bin gegen den Vorschlag."],
          ["ohne", "-siz", "Ich trinke Kaffee ohne Zucker."],
          ["um", "etrafında, saatte", "um den Tisch / um acht Uhr"],
          ["bis", "-e kadar", "bis nächsten Montag"],
          ["entlang", "boyunca (isimden SONRA)", "Wir gehen die Straße entlang."],
        ],
        "Her zaman Akkusativ — DOGFUBE",
      ),
      table(
        ["Edat", "Türkçe", "Örnek"],
        [
          ["aus", "içinden, -li (memleket)", "Ich komme aus der Türkei."],
          ["bei", "yanında, -de (kurum/kişi)", "Ich bin beim Arzt."],
          ["mit", "ile", "Ich fahre mit dem Bus."],
          ["nach", "-e (şehir/ülke), sonra", "Ich fliege nach Berlin."],
          ["seit", "-den beri", "Ich lerne seit einem Jahr Deutsch."],
          ["von", "-den, -in", "Das ist ein Geschenk von meiner Mutter."],
          ["zu", "-e (kişi/kurum)", "Ich gehe zum Arzt."],
          ["gegenüber", "karşısında", "Die Bank ist dem Kino gegenüber."],
          ["ab", "-den itibaren", "ab nächster Woche"],
        ],
        "Her zaman Dativ",
      ),
      note(
        "nach mı zu mu: şehir, ülke ve yön için nach (nach Berlin, nach " +
          "Hause, nach links), kişi ve kurum için zu (zum Arzt, zur Schule, " +
          "zu meiner Freundin). Artikelli ülkeler istisna: in die Türkei, in " +
          "die Schweiz.",
      ),
      note(
        "\"in\" ve \"an\" gibi dokuz edat iki durum da alır — kural A2'deki " +
          "\"Yer edatları\" sayfasında.",
      ),
    ],
  },

  {
    id: "a1-negation",
    level: "A1",
    title: "Olumsuzlama",
    de: "Negation: nicht oder kein",
    summary: "nicht mi kein mi, ve nicht nereye konuyor",
    blocks: [
      table(
        ["Olumsuzlanan", "Hangisi", "Örnek"],
        [
          ["Belirsiz artikelli isim", "kein", "Ich habe ein Auto. → Ich habe kein Auto."],
          ["Artikelsiz isim", "kein", "Ich trinke Kaffee. → Ich trinke keinen Kaffee."],
          ["Belirli artikelli isim", "nicht", "Ich kenne den Mann nicht."],
          ["İyelikli isim", "nicht", "Das ist nicht mein Buch."],
          ["Fiil", "nicht", "Ich komme nicht."],
          ["Sıfat", "nicht", "Das ist nicht teuer."],
          ["Zarf", "nicht", "Er kommt nicht oft."],
          ["Özel isim", "nicht", "Das ist nicht Berlin."],
        ],
      ),
      note(
        "Kısaca: artikeli \"ein\" olan ya da hiç artikeli olmayan isim → kein. " +
          "Geri kalan her şey → nicht.",
      ),
      table(
        ["Cümle", "nicht nerede", "Kural"],
        [
          ["Ich komme heute nicht.", "en sonda", "yalın fiilde sona yakın"],
          ["Ich kann heute nicht kommen.", "mastardan önce", "cümle sonundaki fiil parçasından önce"],
          ["Ich rufe dich nicht an.", "önekten önce", "aynı kural, ayrılabilen fiilde"],
          ["Ich habe ihn nicht gesehen.", "Partizip'ten önce", "aynı kural, Perfekt'te"],
          ["Das Auto ist nicht neu.", "sıfattan önce", "olumsuzlanan öğeden hemen önce"],
          ["Ich fahre nicht nach Berlin.", "yer öbeğinden önce", "olumsuzlanan öğeden hemen önce"],
        ],
        "nicht'in yeri",
      ),
      table(
        ["Soru", "Evet", "Hayır"],
        [
          ["Kommst du?", "Ja, ich komme.", "Nein, ich komme nicht."],
          ["Kommst du nicht?", "Doch, ich komme!", "Nein, ich komme nicht."],
        ],
        "doch — olumsuz soruya olumlu cevap",
      ),
      note(
        "Olumsuz sorulmuş bir soruya \"evet\" demek için ja değil DOCH " +
          "kullanılır. Türkçede karşılığı olmadığı için hep unutulur: " +
          "\"Hast du keine Zeit?\" — \"Doch!\" (var, tabii ki).",
      ),
    ],
  },

  {
    id: "a1-perfekt",
    level: "A1",
    title: "Geçmiş zaman — ilk adım",
    de: "Perfekt",
    summary: "haben/sein + Partizip II: konuşmanın geçmiş zamanı",
    blocks: [
      table(
        ["Fiil türü", "Partizip II kuralı", "Örnek", "Cümlede"],
        [
          ["Düzenli", "ge- + kök + -t", "machen → gemacht", "Ich habe das gemacht."],
          ["Düzensiz", "ge- + kök + -en", "sehen → gesehen", "Ich habe ihn gesehen."],
          ["Karışık", "ge- + değişmiş kök + -t", "denken → gedacht", "Ich habe daran gedacht."],
          ["Ayrılabilen", "önek + ge + ...", "aufstehen → aufgestanden", "Ich bin aufgestanden."],
          ["Ayrılmayan önekli", "ge- YOK", "bezahlen → bezahlt", "Ich habe bezahlt."],
          ["-ieren ile biten", "ge- YOK", "studieren → studiert", "Ich habe studiert."],
        ],
      ),
      table(
        ["Yardımcı fiil", "Ne zaman", "Örnek fiiller"],
        [
          ["sein", "yer değiştirme", "gehen, kommen, fahren, fliegen, laufen, reisen"],
          ["sein", "durum değişimi", "aufstehen, einschlafen, aufwachen, werden, sterben"],
          ["sein", "üç istisna", "sein, bleiben, passieren"],
          ["haben", "geri kalan her şey", "machen, sehen, essen, arbeiten, lesen"],
          ["haben", "nesne alan fiiller", "Ich habe das Auto gefahren."],
        ],
        "haben mi sein mi",
      ),
      note(
        "Kural kısaca: gitmek/olmak → sein, yapmak → haben. Aynı fiil ikisini " +
          "de alabilir ve anlam değişir: Ich bin gefahren (gittim) / Ich habe " +
          "das Auto gefahren (arabayı sürdüm).",
      ),
      note(
        "Perfekt konuşmanın geçmiş zamanıdır; Präteritum yazının. Ama sein, " +
          "haben ve modal fiiller konuşmada da Präteritum ile söylenir: " +
          "\"Ich war\", \"ich hatte\", \"ich konnte\".",
      ),
    ],
  },

  {
    id: "a1-verben",
    level: "A1",
    title: "Düzensiz fiiller — çekirdek",
    de: "Unregelmäßige Verben",
    summary: "A1'de geçen düzensiz fiillerin dört biçimi",
    group: "verben",
    blocks: [
      table(
        ["Infinitiv", "Präsens (er)", "Präteritum", "Perfekt", "Türkçe"],
        verbsUpTo("A1").map((v) => [v.inf, v.prs, v.prt, v.prf, v.tr]),
      ),
      note(
        "Präsens sütununda 3. tekil kişi var: ünlü değişimi yalnızca orada " +
          "(ve du'da) görünür. Perfekt sütunu yardımcı fiiliyle birlikte " +
          "yazıldı — \"ist\" mi \"hat\" mı, ezberin asıl zor kısmı o.",
      ),
    ],
  },
];
