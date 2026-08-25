import { note, table, type CheatSheet } from "./types";
import { verbsUpTo } from "./verbs";

/**
 * A2 başvuru sayfaları — geçmişi anlatmak ve cümleyi uzatmak.
 *
 * A1 tek cümle kurmayı öğretiyor; A2'nin bütün konuları iki şeyin etrafında
 * dönüyor: olmuş bir şeyi anlatmak (Perfekt, Präteritum) ve iki cümleyi
 * birbirine bağlamak (weil, dass, wenn). Sıfat çekimi de burada başlıyor
 * çünkü ilk kez isim öbeğinin içi doluyor.
 */
export const DE_A2: CheatSheet[] = [
  {
    id: "a2-praeteritum",
    level: "A2",
    title: "Präteritum",
    de: "Präteritum",
    summary: "yazının geçmiş zamanı — üç çekim örüntüsü",
    blocks: [
      table(
        ["Kişi", "düzenli: machen", "düzensiz: gehen", "karışık: bringen"],
        [
          ["ich", "machte", "ging", "brachte"],
          ["du", "machtest", "gingst", "brachtest"],
          ["er / sie / es", "machte", "ging", "brachte"],
          ["wir", "machten", "gingen", "brachten"],
          ["ihr", "machtet", "gingt", "brachtet"],
          ["sie / Sie", "machten", "gingen", "brachten"],
        ],
      ),
      note(
        "Üç çekimin de ortak yanı: ich ve er/sie/es EK ALMAZ, ikisi birbirinin " +
          "aynısıdır. Präsens'te ayrılan bu iki kişi geçmişte birleşir.",
      ),
      note(
        "Düzensiz fiilin gövdesi ezberlenir, ekler değil: ging, kam, sah, gab, " +
          "fuhr… Gövdeyi bulduktan sonra ekler yukarıdaki gibi. Gövdeler " +
          "\"Düzensiz fiiller\" sayfasındaki Präteritum sütunundadır.",
      ),
      table(
        ["Zaman", "Nerede kullanılır", "Örnek"],
        [
          ["Perfekt", "konuşma, mektup, sohbet", "Ich habe gestern gearbeitet."],
          ["Präteritum", "kitap, haber, hikâye, resmî yazı", "Er arbeitete den ganzen Tag."],
          ["Präteritum", "sein, haben, werden — konuşmada da", "Ich war müde. Ich hatte Hunger."],
          ["Präteritum", "modal fiiller — konuşmada da", "Ich konnte nicht kommen."],
          ["Präteritum", "es gibt → es gab", "Es gab keinen Platz."],
        ],
        "Hangi geçmiş zaman nerede",
      ),
    ],
  },

  {
    id: "a2-perfekt-partizip",
    level: "A2",
    title: "Partizip II kuralları",
    de: "Partizip Perfekt",
    summary: "ge- ne zaman gelir, ne zaman gelmez",
    blocks: [
      table(
        ["Fiil", "Partizip II", "Kural", "Yardımcı"],
        [
          ["machen", "gemacht", "ge- + kök + -t", "haben"],
          ["arbeiten", "gearbeitet", "kök -t/-d ise araya e", "haben"],
          ["sehen", "gesehen", "ge- + kök + -en", "haben"],
          ["gehen", "gegangen", "gövde de değişebilir", "sein"],
          ["denken", "gedacht", "gövde değişir, ek -t", "haben"],
          ["aufstehen", "aufgestanden", "ge- önekten SONRA", "sein"],
          ["einkaufen", "eingekauft", "ge- önekten sonra", "haben"],
          ["bezahlen", "bezahlt", "ayrılmayan önek → ge- yok", "haben"],
          ["verstehen", "verstanden", "ayrılmayan önek → ge- yok", "haben"],
          ["studieren", "studiert", "-ieren → ge- yok", "haben"],
          ["telefonieren", "telefoniert", "-ieren → ge- yok", "haben"],
        ],
      ),
      note(
        "ge- düşen iki grup: ayrılmayan önekli fiiller (be-, ge-, er-, ver-, " +
          "zer-, ent-, emp-, miss-) ve -ieren ile bitenler. Sebebi ortak: her " +
          "ikisinde de vurgu ilk hecede değil, ge- vurgusuz heceye eklenmez.",
      ),
      table(
        ["Yardımcı", "Grup", "Örnekler"],
        [
          ["sein", "yer değiştirme", "gehen, kommen, fahren, fliegen, laufen, reisen, steigen"],
          ["sein", "durum değişimi", "aufstehen, einschlafen, aufwachen, werden, wachsen, sterben"],
          ["sein", "istisnalar", "sein, bleiben, passieren, gelingen, geschehen"],
          ["haben", "geri kalan hepsi", "machen, sehen, essen, lesen, arbeiten, schlafen"],
          ["haben", "dönüşlü fiillerin tamamı", "sich freuen, sich waschen, sich beeilen"],
          ["haben", "modal fiiller", "Ich habe nicht gekonnt."],
        ],
        "haben mi sein mi",
      ),
      note(
        "Nesne alan bir fiil her zaman haben ister — hareket bildirse bile: " +
          "Ich bin nach Berlin gefahren. / Ich habe das Auto gefahren.",
      ),
    ],
  },

  {
    id: "a2-wechselpraepositionen",
    level: "A2",
    title: "Yer edatları",
    de: "Wechselpräpositionen",
    summary: "dokuz edat: wohin? → Akkusativ, wo? → Dativ",
    blocks: [
      table(
        ["Edat", "Türkçe", "wohin? + Akkusativ", "wo? + Dativ"],
        [
          ["in", "içine / içinde", "Ich gehe in die Küche.", "Ich bin in der Küche."],
          ["an", "kenarına / kenarında", "Ich gehe an das Fenster.", "Ich stehe am Fenster."],
          ["auf", "üstüne / üstünde", "Ich lege es auf den Tisch.", "Es liegt auf dem Tisch."],
          ["über", "üzerine / üzerinde", "Ich hänge das Bild über das Sofa.", "Das Bild hängt über dem Sofa."],
          ["unter", "altına / altında", "Die Katze geht unter den Tisch.", "Die Katze ist unter dem Tisch."],
          ["vor", "önüne / önünde", "Ich stelle mich vor die Tür.", "Ich stehe vor der Tür."],
          ["hinter", "arkasına / arkasında", "Er geht hinter das Haus.", "Er ist hinter dem Haus."],
          ["neben", "yanına / yanında", "Setz dich neben mich!", "Er sitzt neben mir."],
          ["zwischen", "arasına / arasında", "Ich stelle es zwischen die Bücher.", "Es steht zwischen den Büchern."],
        ],
      ),
      note(
        "Soru \"wohin?\" ise (bir yere doğru hareket var) Akkusativ, \"wo?\" ise " +
          "(bir yerde duruyor) Dativ. Hareketin kendisi değil, HEDEFİ belirler: " +
          "\"Ich laufe in dem Park\" parkın içinde koşuyorum demektir, \"in den " +
          "Park\" ise parka koşuyorum.",
      ),
      table(
        ["wohin? (Akkusativ)", "wo? (Dativ)", "Anlam"],
        [
          ["stellen", "stehen", "dik koymak / dik durmak"],
          ["legen", "liegen", "yatık koymak / yatık durmak"],
          ["setzen", "sitzen", "oturtmak / oturmak"],
          ["hängen (düzenli)", "hängen (düzensiz)", "asmak / asılı olmak"],
          ["stecken", "stecken", "sokmak / içinde olmak"],
        ],
        "Çift fiiller — biri hareket, biri durum",
      ),
      note(
        "Ich stelle die Flasche auf den Tisch. → Die Flasche steht auf dem " +
          "Tisch. Soldakiler nesne alır ve Akkusativ ister; sağdakiler nesne " +
          "almaz ve Dativ ile kullanılır.",
      ),
    ],
  },

  {
    id: "a2-adjektive",
    level: "A2",
    title: "Sıfat çekimi",
    de: "Adjektivdeklination",
    summary: "üç tablo: belirli, belirsiz ve artikelsiz",
    blocks: [
      table(
        ["Durum", "maskulin", "feminin", "neutrum", "çoğul"],
        [
          ["Nominativ", "der gute Wein", "die gute Suppe", "das gute Brot", "die guten Weine"],
          ["Akkusativ", "den guten Wein", "die gute Suppe", "das gute Brot", "die guten Weine"],
          ["Dativ", "dem guten Wein", "der guten Suppe", "dem guten Brot", "den guten Weinen"],
        ],
        "der / die / das / diese / jeder / welcher sonrası — zayıf çekim",
      ),
      note(
        "Zayıf çekimde yalnızca iki ek var: -e ve -en. Kural neredeyse tek " +
          "cümle: Nominativ tekilde ve dişil/nötr Akkusativ'de -e, kalan her " +
          "yerde -en.",
      ),
      table(
        ["Durum", "maskulin", "feminin", "neutrum", "çoğul"],
        [
          ["Nominativ", "ein guter Wein", "eine gute Suppe", "ein gutes Brot", "keine guten Weine"],
          ["Akkusativ", "einen guten Wein", "eine gute Suppe", "ein gutes Brot", "keine guten Weine"],
          ["Dativ", "einem guten Wein", "einer guten Suppe", "einem guten Brot", "keinen guten Weinen"],
        ],
        "ein / kein / mein sonrası — karışık çekim",
      ),
      note(
        "Fark yalnızca üç hücrede: eril Nominativ (-er) ve nötr Nominativ/" +
          "Akkusativ (-es). Sebebi şu — \"ein\" kelimesi cinsiyeti " +
          "göstermiyor, o bilgiyi sıfat üstleniyor. \"der\" gösterdiğinde " +
          "sıfatın taşımasına gerek kalmıyor.",
      ),
      table(
        ["Durum", "maskulin", "feminin", "neutrum", "çoğul"],
        [
          ["Nominativ", "guter Wein", "gute Suppe", "gutes Brot", "gute Weine"],
          ["Akkusativ", "guten Wein", "gute Suppe", "gutes Brot", "gute Weine"],
          ["Dativ", "gutem Wein", "guter Suppe", "gutem Brot", "guten Weinen"],
        ],
        "Artikelsiz — güçlü çekim",
      ),
      note(
        "Artikel yoksa sıfat artikelin ekini alır: gutem ← dem, guter ← der, " +
          "gutes ← das. Çoğul ve kütle isimlerinde sık: Ich trinke gern " +
          "schwarzen Kaffee. / Wir suchen neue Mitarbeiter.",
      ),
      table(
        ["Sıfat", "Çekimli hâli", "Neden"],
        [
          ["hoch", "ein hoher Turm", "çekilince c düşer"],
          ["teuer", "ein teures Auto", "çekilince e düşer"],
          ["dunkel", "ein dunkler Raum", "çekilince e düşer"],
          ["rosa, lila, prima", "ein rosa Kleid", "hiç çekilmez"],
          ["Berliner, Wiener", "das Berliner Wetter", "şehir sıfatı çekilmez"],
        ],
        "Yazım istisnaları",
      ),
      note(
        "Fiilden sonra gelen sıfat HİÇ çekilmez: Der Wein ist gut. Das Auto " +
          "war teuer. Çekim yalnızca ismin ÖNÜNDE.",
      ),
    ],
  },

  {
    id: "a2-komparativ",
    level: "A2",
    title: "Karşılaştırma",
    de: "Komparativ und Superlativ",
    summary: "-er, am -sten ve düzensiz olanlar",
    blocks: [
      table(
        ["Sıfat", "Komparativ", "Superlativ", "Türkçe"],
        [
          ["billig", "billiger", "am billigsten", "ucuz"],
          ["schnell", "schneller", "am schnellsten", "hızlı"],
          ["schön", "schöner", "am schönsten", "güzel"],
          ["alt", "älter", "am ältesten", "yaşlı, eski"],
          ["jung", "jünger", "am jüngsten", "genç"],
          ["groß", "größer", "am größten", "büyük"],
          ["klein", "kleiner", "am kleinsten", "küçük"],
          ["lang", "länger", "am längsten", "uzun"],
          ["kurz", "kürzer", "am kürzesten", "kısa"],
          ["warm", "wärmer", "am wärmsten", "sıcak"],
          ["kalt", "kälter", "am kältesten", "soğuk"],
          ["stark", "stärker", "am stärksten", "güçlü"],
          ["teuer", "teurer", "am teuersten", "pahalı"],
          ["dunkel", "dunkler", "am dunkelsten", "karanlık"],
          ["hoch", "höher", "am höchsten", "yüksek"],
          ["nah", "näher", "am nächsten", "yakın"],
          ["gut", "besser", "am besten", "iyi"],
          ["viel", "mehr", "am meisten", "çok"],
          ["gern", "lieber", "am liebsten", "severek"],
        ],
      ),
      note(
        "Tek heceli sıfatlarda ünlü çoğunlukla umlautlanır (alt → älter). -d, " +
          "-t, -s, -ß, -z ile bitenlerde Superlativ'e e girer: am ältesten, am " +
          "kürzesten. Son dört satır tamamen düzensiz ve en çok kullanılanlar.",
      ),
      table(
        ["Yapı", "Anlam", "Örnek"],
        [
          ["so … wie", "kadar (eşitlik)", "Anna ist so groß wie Ben."],
          ["nicht so … wie", "kadar değil", "Heute ist es nicht so kalt wie gestern."],
          ["Komparativ + als", "-den daha", "Anna ist größer als Ben."],
          ["immer + Komparativ", "gittikçe daha", "Es wird immer wärmer."],
          ["der/die/das + -ste", "isimden önce en", "der beste Film des Jahres"],
          ["am + -sten", "fiilden sonra en", "Dieser Film ist am besten."],
          ["viel / etwas + Komparativ", "çok / biraz daha", "Das ist viel besser."],
        ],
      ),
      note(
        "\"als\" ile \"wie\" karıştırılır: eşit olan \"wie\", farklı olan " +
          "\"als\". \"größer wie\" günlük konuşmada duyulur ama yanlış sayılır.",
      ),
    ],
  },

  {
    id: "a2-nebensatz",
    level: "A2",
    title: "Cümle bağlama",
    de: "Konjunktionen und Nebensätze",
    summary: "üç bağlaç türü, üç farklı fiil yeri",
    blocks: [
      table(
        ["Bağlaç", "Türkçe", "Örnek"],
        [
          ["und", "ve", "Ich koche und du deckst den Tisch."],
          ["aber", "ama", "Ich möchte kommen, aber ich habe keine Zeit."],
          ["oder", "veya", "Wir gehen ins Kino oder wir bleiben zu Hause."],
          ["denn", "çünkü", "Ich bleibe zu Hause, denn ich bin krank."],
          ["sondern", "aksine (olumsuzdan sonra)", "Das ist nicht Tee, sondern Kaffee."],
        ],
        "Ana cümle bağlaçları — sıraya karışmaz, fiil yine 2. sırada",
      ),
      table(
        ["Bağlaç", "Türkçe", "Örnek"],
        [
          ["weil", "çünkü", "Ich bleibe zu Hause, weil ich krank bin."],
          ["dass", "-diğini", "Ich weiß, dass du recht hast."],
          ["wenn", "eğer / -dığında", "Wenn ich Zeit habe, komme ich."],
          ["als", "-dığında (geçmişte bir kez)", "Als ich klein war, wohnten wir in Izmir."],
          ["ob", "-ip -mediğini", "Ich weiß nicht, ob er kommt."],
          ["obwohl", "-mesine rağmen", "Ich gehe raus, obwohl es regnet."],
          ["damit", "-mesi için", "Ich spare, damit ich reisen kann."],
          ["bevor", "-meden önce", "Bevor ich gehe, rufe ich dich an."],
          ["nachdem", "-dikten sonra", "Nachdem ich gegessen hatte, ging ich."],
          ["seit / seitdem", "-den beri", "Seitdem ich hier wohne, bin ich glücklich."],
          ["während", "-irken", "Während er kocht, deckt sie den Tisch."],
          ["bis", "-e kadar", "Warte, bis ich fertig bin."],
        ],
        "Yan cümle bağlaçları — çekilmiş fiil SONA gider",
      ),
      table(
        ["Zarf", "Türkçe", "Örnek"],
        [
          ["deshalb / deswegen / darum", "bu yüzden", "Ich bin krank, deshalb bleibe ich zu Hause."],
          ["trotzdem", "buna rağmen", "Es regnet, trotzdem gehe ich raus."],
          ["dann", "sonra", "Zuerst esse ich, dann lerne ich."],
          ["danach", "ondan sonra", "Wir essen, danach gehen wir spazieren."],
          ["sonst", "yoksa", "Beeil dich, sonst kommen wir zu spät."],
          ["außerdem", "ayrıca", "Es ist teuer, außerdem ist es weit."],
        ],
        "Bağlayıcı zarflar — 1. sırayı kaplar, fiil hemen arkasına geçer",
      ),
      note(
        "Üç türün farkı fiilin yerinde: ana cümle bağlaçları sıraya hiç " +
          "girmez (und, aber…), zarflar birinci sırayı kaplar ve özneyi arkaya " +
          "iter (deshalb bleibe ich…), yan cümle bağlaçları fiili sona atar " +
          "(weil ich krank bin).",
      ),
      note(
        "weil ile denn AYNI şeyi söyler, dizilişleri farklıdır: \"…, weil ich " +
          "krank bin\" / \"…, denn ich bin krank\". İkisi de doğru.",
      ),
      note(
        "Yan cümle başta gelirse, ana cümlenin FİİLİ hemen virgülden sonra " +
          "gelir: Weil ich krank bin, bleibe ich zu Hause. Yan cümlenin " +
          "tamamı birinci sırayı doldurmuş sayılır.",
      ),
    ],
  },

  {
    id: "a2-reflexiv",
    level: "A2",
    title: "Dönüşlü fiiller",
    de: "Reflexive Verben",
    summary: "sich freuen, sich waschen — ve mich/mir farkı",
    blocks: [
      table(
        ["Kişi", "Akkusativ", "Dativ"],
        [
          ["ich", "mich", "mir"],
          ["du", "dich", "dir"],
          ["er / sie / es", "sich", "sich"],
          ["wir", "uns", "uns"],
          ["ihr", "euch", "euch"],
          ["sie / Sie", "sich", "sich"],
        ],
        "Dönüşlü zamirler — yalnızca ich ve du'da ayrılır",
      ),
      table(
        ["Fiil", "Türkçe", "Örnek"],
        [
          ["sich freuen über / auf", "sevinmek / iple çekmek", "Ich freue mich auf den Urlaub."],
          ["sich interessieren für", "ilgilenmek", "Er interessiert sich für Musik."],
          ["sich ärgern über", "kızmak", "Sie ärgert sich über den Lärm."],
          ["sich erinnern an", "hatırlamak", "Erinnerst du dich an ihn?"],
          ["sich treffen mit", "buluşmak", "Wir treffen uns mit Freunden."],
          ["sich beeilen", "acele etmek", "Beeil dich!"],
          ["sich setzen", "oturmak", "Setzen Sie sich bitte."],
          ["sich fühlen", "hissetmek", "Ich fühle mich nicht gut."],
          ["sich entschuldigen", "özür dilemek", "Ich entschuldige mich."],
          ["sich verspäten", "gecikmek", "Der Zug hat sich verspätet."],
          ["sich unterhalten", "sohbet etmek", "Wir haben uns lange unterhalten."],
          ["sich bedanken für", "teşekkür etmek", "Ich bedanke mich für die Hilfe."],
        ],
      ),
      table(
        ["Akkusativ", "Dativ", "Fark"],
        [
          ["Ich wasche mich.", "Ich wasche mir die Hände.", "nesne varsa zamir Dativ olur"],
          ["Ich ziehe mich an.", "Ich ziehe mir die Jacke an.", "aynı kural"],
          ["Ich stelle mich vor.", "Ich stelle mir das vor.", "tanıtmak / hayal etmek"],
          ["Ich kaufe mich…", "Ich kaufe mir ein Auto.", "yalnızca Dativ mümkün"],
        ],
        "mich mi mir mi",
      ),
      note(
        "Kural basit: cümlede zaten bir Akkusativ nesnesi varsa dönüşlü zamir " +
          "Dativ'e geçer. \"die Hände\" Akkusativ olduğu için \"mir\" gerekir.",
      ),
      note("Bütün dönüşlü fiiller Perfekt'te haben alır: Ich habe mich gefreut."),
    ],
  },

  {
    id: "a2-dativverben",
    level: "A2",
    title: "Dativ alan fiiller",
    de: "Verben mit Dativ",
    summary: "helfen, gefallen, gehören: nesnesi Akkusativ değil",
    blocks: [
      table(
        ["Fiil", "Türkçe", "Örnek"],
        [
          ["helfen", "yardım etmek", "Kannst du mir helfen?"],
          ["danken", "teşekkür etmek", "Ich danke dir."],
          ["gefallen", "hoşuna gitmek", "Das Bild gefällt mir."],
          ["gehören", "ait olmak", "Das Auto gehört meinem Bruder."],
          ["passen", "uymak (beden, zaman)", "Der Termin passt mir nicht."],
          ["schmecken", "tadı hoşuna gitmek", "Die Suppe schmeckt mir."],
          ["antworten", "cevap vermek", "Antworte mir bitte!"],
          ["glauben", "inanmak (kişiye)", "Ich glaube dir."],
          ["folgen", "takip etmek", "Folgen Sie mir bitte."],
          ["gratulieren", "tebrik etmek", "Ich gratuliere dir zum Geburtstag."],
          ["begegnen", "rastlamak", "Ich bin ihm gestern begegnet."],
          ["fehlen", "eksik olmak, özlenmek", "Du fehlst mir."],
          ["wehtun", "acıtmak", "Mein Kopf tut mir weh."],
          ["zuhören", "dinlemek", "Hör mir zu!"],
          ["vertrauen", "güvenmek", "Ich vertraue dir."],
          ["zustimmen", "katılmak", "Ich stimme dir zu."],
        ],
      ),
      note(
        "Bu fiillerin çoğu Türkçede de -e hâli alır (bana yardım et, sana " +
          "teşekkür ederim) — o yüzden mantık yabancı değil. Asıl tuzak " +
          "gefallen: Almancada beğenilen şey ÖZNEDİR. \"Das Bild gefällt mir\" " +
          "= \"resim bana hoş geliyor\".",
      ),
      table(
        ["Fiil", "Dativ (kime)", "Akkusativ (neyi)", "Örnek"],
        [
          ["geben", "dem Kind", "das Buch", "Ich gebe dem Kind das Buch."],
          ["zeigen", "mir", "den Weg", "Zeig mir den Weg!"],
          ["schenken", "meiner Mutter", "Blumen", "Ich schenke meiner Mutter Blumen."],
          ["erklären", "uns", "die Regel", "Er erklärt uns die Regel."],
          ["bringen", "dir", "einen Kaffee", "Ich bringe dir einen Kaffee."],
          ["schicken", "ihm", "eine E-Mail", "Ich schicke ihm eine E-Mail."],
          ["empfehlen", "Ihnen", "das Fischgericht", "Ich empfehle Ihnen das Fischgericht."],
        ],
        "İki nesne alanlar",
      ),
      note(
        "İki nesneli fiillerde sıra: isimler arasında önce Dativ, sonra " +
          "Akkusativ. Ama zamir varsa zamir öne geçer ve iki zamirde sıra " +
          "TERSİNE döner: Ich gebe es ihm.",
      ),
    ],
  },

  {
    id: "a2-hoeflich",
    level: "A2",
    title: "Nezaket kipi",
    de: "Konjunktiv II: höfliche Bitte",
    summary: "würde, könnte, hätte, wäre — rica ve öneri",
    blocks: [
      table(
        ["Kişi", "würde", "könnte", "hätte", "wäre", "möchte"],
        [
          ["ich", "würde", "könnte", "hätte", "wäre", "möchte"],
          ["du", "würdest", "könntest", "hättest", "wärst", "möchtest"],
          ["er / sie / es", "würde", "könnte", "hätte", "wäre", "möchte"],
          ["wir", "würden", "könnten", "hätten", "wären", "möchten"],
          ["ihr", "würdet", "könntet", "hättet", "wärt", "möchtet"],
          ["sie / Sie", "würden", "könnten", "hätten", "wären", "möchten"],
        ],
      ),
      table(
        ["Doğrudan", "Kibar", "Kullanım"],
        [
          ["Hilf mir!", "Könntest du mir helfen?", "rica"],
          ["Geben Sie mir…", "Könnten Sie mir bitte … geben?", "resmî rica"],
          ["Ich will einen Kaffee.", "Ich hätte gern einen Kaffee.", "sipariş"],
          ["Ich will einen Kaffee.", "Ich möchte einen Kaffee.", "sipariş"],
          ["Machen wir das?", "Wir könnten das machen.", "öneri"],
          ["Das ist gut.", "Das wäre gut.", "yumuşatılmış hüküm"],
          ["Hast du Zeit?", "Hättest du vielleicht Zeit?", "yumuşatılmış soru"],
          ["Ich mache das nicht.", "Ich würde das nicht machen.", "tavsiye"],
        ],
      ),
      note(
        "Diğer bütün fiiller için \"würde + mastar\" kullanılır: Ich würde " +
          "gern mitkommen. Kendi Konjunktiv II biçimi konuşmada yaşayan " +
          "fiiller yalnızca bu birkaç tanedir — sein, haben, modal fiiller ve " +
          "birkaç eski fiil (käme, ginge, wüsste).",
      ),
      note(
        "\"hätte gern\" ile \"möchte\" ikisi de sipariş için kullanılır ve " +
          "eşdeğerdir. Restoranda ikisi de doğaldır; \"Ich will\" ise kaba " +
          "duyulur.",
      ),
    ],
  },

  {
    id: "a2-imperativ",
    level: "A2",
    title: "Emir kipi",
    de: "Imperativ",
    summary: "du, ihr ve Sie için üç biçim",
    blocks: [
      table(
        ["Mastar", "du", "ihr", "Sie"],
        [
          ["machen", "Mach!", "Macht!", "Machen Sie!"],
          ["kommen", "Komm!", "Kommt!", "Kommen Sie!"],
          ["warten", "Warte!", "Wartet!", "Warten Sie!"],
          ["sprechen", "Sprich!", "Sprecht!", "Sprechen Sie!"],
          ["nehmen", "Nimm!", "Nehmt!", "Nehmen Sie!"],
          ["lesen", "Lies!", "Lest!", "Lesen Sie!"],
          ["geben", "Gib!", "Gebt!", "Geben Sie!"],
          ["fahren", "Fahr!", "Fahrt!", "Fahren Sie!"],
          ["anrufen", "Ruf an!", "Ruft an!", "Rufen Sie an!"],
          ["sich setzen", "Setz dich!", "Setzt euch!", "Setzen Sie sich!"],
          ["sein", "Sei!", "Seid!", "Seien Sie!"],
          ["haben", "Hab!", "Habt!", "Haben Sie!"],
        ],
      ),
      note(
        "du biçimi: \"du\" çekiminden -st atılır (du kommst → Komm!). e → i " +
          "değişimi KALIR (du sprichst → Sprich!), ama a → ä değişimi DÜŞER " +
          "(du fährst → Fahr!). Sie biçimi mastardır ve zamir yazılır.",
      ),
      note(
        "\"bitte\" emri ricaya çevirir ve cümlenin her yerine girebilir: Komm " +
          "bitte! / Bitte komm! Daha da yumuşatmak için \"mal\" ya da \"doch\" " +
          "eklenir: Komm doch mal vorbei!",
      ),
    ],
  },

  {
    id: "a2-verben-praeposition",
    level: "A2",
    title: "Fiil + edat",
    de: "Verben mit Präpositionen",
    summary: "hangi fiil hangi edatı ve hangi durumu istiyor",
    blocks: [
      table(
        ["Fiil + edat", "Durum", "Türkçe", "Örnek"],
        [
          ["warten auf", "Akkusativ", "beklemek", "Ich warte auf den Bus."],
          ["sich freuen auf", "Akkusativ", "iple çekmek", "Ich freue mich auf den Urlaub."],
          ["sich freuen über", "Akkusativ", "sevinmek", "Sie freut sich über das Geschenk."],
          ["denken an", "Akkusativ", "aklına gelmek", "Ich denke oft an dich."],
          ["sich erinnern an", "Akkusativ", "hatırlamak", "Erinnerst du dich an den Tag?"],
          ["sich interessieren für", "Akkusativ", "ilgilenmek", "Er interessiert sich für Politik."],
          ["sich ärgern über", "Akkusativ", "kızmak", "Ich ärgere mich über den Lärm."],
          ["sprechen über", "Akkusativ", "hakkında konuşmak", "Wir sprechen über das Projekt."],
          ["bitten um", "Akkusativ", "rica etmek", "Ich bitte dich um Hilfe."],
          ["danken für", "Akkusativ", "teşekkür etmek", "Danke für deine Hilfe!"],
          ["sich kümmern um", "Akkusativ", "ilgilenmek, bakmak", "Sie kümmert sich um die Kinder."],
          ["achten auf", "Akkusativ", "dikkat etmek", "Achte auf die Zeit!"],
          ["sprechen mit", "Dativ", "biriyle konuşmak", "Ich spreche mit dem Chef."],
          ["telefonieren mit", "Dativ", "telefonda konuşmak", "Ich telefoniere mit ihr."],
          ["anfangen mit", "Dativ", "başlamak", "Wir fangen mit der Arbeit an."],
          ["aufhören mit", "Dativ", "bırakmak", "Er hört mit dem Rauchen auf."],
          ["Angst haben vor", "Dativ", "korkmak", "Ich habe Angst vor Hunden."],
          ["teilnehmen an", "Dativ", "katılmak", "Sie nimmt am Kurs teil."],
          ["gehören zu", "Dativ", "ait olmak", "Das gehört zu meiner Arbeit."],
          ["träumen von", "Dativ", "hayalini kurmak", "Ich träume von einer Reise."],
          ["einladen zu", "Dativ", "davet etmek", "Ich lade dich zum Essen ein."],
          ["gratulieren zu", "Dativ", "kutlamak", "Ich gratuliere dir zur Prüfung."],
          ["helfen bei", "Dativ", "yardım etmek", "Er hilft mir bei den Hausaufgaben."],
        ],
      ),
      note(
        "Edat fiilin bir PARÇASIDIR ve Türkçeden tahmin edilemez: \"otobüsü " +
          "beklemek\" Almancada \"auf den Bus warten\". Fiil ezberlenirken " +
          "edatı ve durumu birlikte ezberlenir.",
      ),
      note(
        "Bu edatların Akkusativ mi Dativ mi olduğu yer anlamıyla İLGİSİZDİR: " +
          "\"warten auf\" her zaman Akkusativ, \"Angst haben vor\" her zaman " +
          "Dativ. Wechselpräpositionen kuralı burada işlemez.",
      ),
    ],
  },

  {
    id: "a2-ordinalzahlen",
    level: "A2",
    title: "Sıra sayıları ve tarih",
    de: "Ordinalzahlen und Datum",
    summary: "erste, zweite, dritte… ve tarih söyleme",
    blocks: [
      table(
        ["Rakam", "Sıra sayısı", "Rakam", "Sıra sayısı"],
        [
          ["1.", "erste", "11.", "elfte"],
          ["2.", "zweite", "12.", "zwölfte"],
          ["3.", "dritte", "13.", "dreizehnte"],
          ["4.", "vierte", "19.", "neunzehnte"],
          ["5.", "fünfte", "20.", "zwanzigste"],
          ["6.", "sechste", "21.", "einundzwanzigste"],
          ["7.", "siebte", "30.", "dreißigste"],
          ["8.", "achte", "31.", "einunddreißigste"],
          ["9.", "neunte", "100.", "hundertste"],
          ["10.", "zehnte", "1000.", "tausendste"],
        ],
      ),
      note(
        "1'den 19'a kadar -te, 20'den sonra -ste eklenir. Düzensiz olan " +
          "yalnızca dört tane: erste, dritte, siebte, achte (acht + te = achte, " +
          "iki t olmaz).",
      ),
      table(
        ["Ne soruluyor", "Cevap biçimi", "Örnek"],
        [
          ["Der Wievielte ist heute?", "der + -te", "Heute ist der dritte Mai."],
          ["Wann? (tarih)", "am + -ten", "Ich komme am dritten Mai."],
          ["Doğum tarihi", "am + -ten + yıl", "Ich bin am 12. Juni 1990 geboren."],
          ["Yazışmada", "Şehir, tarih", "Berlin, den 3. Mai 2026"],
          ["Kaçıncı kat", "im + -ten Stock", "Ich wohne im dritten Stock."],
          ["Kaçıncı kez", "zum + -ten Mal", "Ich bin zum ersten Mal hier."],
        ],
        "Tarih söyleme",
      ),
      note(
        "Sıra sayısı bir SIFATTIR ve sıfat gibi çekilir: der dritte Mai " +
          "(Nominativ), am dritten Mai (Dativ), meinen ersten Job (Akkusativ).",
      ),
    ],
  },

  {
    id: "a2-verben",
    level: "A2",
    title: "Düzensiz fiiller — A2",
    de: "Unregelmäßige Verben",
    summary: "A1 ve A2'de geçen düzensiz fiillerin dört biçimi",
    group: "verben",
    blocks: [
      table(
        ["Infinitiv", "Präsens (er)", "Präteritum", "Perfekt", "Türkçe"],
        verbsUpTo("A2").map((v) => [v.inf, v.prs, v.prt, v.prf, v.tr]),
      ),
      note(
        "Liste A1'inkini içeriyor — bir seviyede öğrenilen fiil üst seviyede " +
          "kaybolmuyor. Çalışma modunda Präteritum ve Perfekt sütunlarını " +
          "gizlemek, kâğıt listede o sütunları elle kapatmanın karşılığı.",
      ),
    ],
  },
];
