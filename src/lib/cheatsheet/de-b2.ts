import { note, table, type CheatSheet } from "./types";
import { verbsUpTo } from "./verbs";

/**
 * B2 başvuru sayfaları — söyleneni kim söylüyor, kim yapıyor.
 *
 * B2'nin bütün omurgası tek bir soruyla özetlenebiliyor: cümlenin faili
 * nerede? Edilgen faili siliyor, Passiversatz onu başka biçimlerle saklıyor,
 * dolaylı aktarım sözü başkasına yıkıyor, öznel modal fiiller iddianın
 * sahibini işaretliyor, Nominalstil ise fiili tamamen isme çeviriyor.
 *
 * Düzensiz fiil listesi tam hâliyle burada — kaynak kitap da onu B2 ekinde
 * veriyor (bkz. verbs.ts).
 */
export const DE_B2: CheatSheet[] = [
  {
    id: "b2-verben",
    level: "B2",
    title: "Düzensiz fiiller — tam liste",
    de: "Liste der unregelmäßigen Verben",
    summary: "189 fiil, dört biçim: Infinitiv, Präsens, Präteritum, Perfekt",
    blocks: [
      table(
        ["Infinitiv", "Präsens (er)", "Präteritum", "Perfekt", "Türkçe"],
        verbsUpTo("B2").map((v) => [v.inf, v.prs, v.prt, v.prf, v.tr]),
      ),
      note(
        "Liste \"Deutsch intensiv. Wortschatz B2\" (Klett) ekindeki " +
          "Liste der unregelmäßigen Verben'den alındı; sütun düzeni de " +
          "oradan. Türkçe karşılıklar uygulamanın kendi kelime " +
          "listelerinden eşleştirildi.",
      ),
      note(
        "Çalışma modunda Präteritum ve Perfekt sütunlarını gizlemek listenin " +
          "asıl kullanımıdır: dört biçimden ikisi tahmin edilemez ve sınavda " +
          "sorulan da o ikisidir.",
      ),
    ],
  },

  {
    id: "b2-passiv",
    level: "B2",
    title: "Edilgenin bütün hâlleri",
    de: "Vorgangs- und Zustandspassiv",
    summary: "süreç mi durum mu, ve kipli edilgen",
    blocks: [
      table(
        ["Yapı", "Adı", "Anlamı", "Örnek"],
        [
          ["wird + Partizip II", "Vorgangspassiv", "olay oluyor", "Die Tür wird geöffnet."],
          ["ist + Partizip II", "Zustandspassiv", "sonuç duruyor", "Die Tür ist geöffnet."],
          ["wurde + Partizip II", "Vorgangspassiv, geçmiş", "olay oldu", "Die Tür wurde geöffnet."],
          ["war + Partizip II", "Zustandspassiv, geçmiş", "durum vardı", "Die Tür war geöffnet."],
          ["ist + Partizip II + worden", "Vorgangspassiv, Perfekt", "olay olmuş", "Die Tür ist geöffnet worden."],
        ],
      ),
      note(
        "Fark tek kelimede: \"worden\" varsa OLAY anlatılıyor, yoksa DURUM. " +
          "\"Das Geschäft ist geschlossen\" dükkân kapalı demek; \"Das " +
          "Geschäft ist geschlossen worden\" dükkân kapatıldı demek.",
      ),
      table(
        ["Zaman / kip", "Yapı", "Örnek"],
        [
          ["Präsens", "wird + P II", "Der Antrag wird geprüft."],
          ["Präteritum", "wurde + P II", "Der Antrag wurde geprüft."],
          ["Perfekt", "ist + P II + worden", "Der Antrag ist geprüft worden."],
          ["Plusquamperfekt", "war + P II + worden", "Der Antrag war geprüft worden."],
          ["Futur I", "wird + P II + werden", "Der Antrag wird geprüft werden."],
          ["Modal, şimdi", "muss + P II + werden", "Der Antrag muss geprüft werden."],
          ["Modal, geçmiş", "musste + P II + werden", "Der Antrag musste geprüft werden."],
          ["Modal, Perfekt", "hat + P II + werden müssen", "Der Antrag hat geprüft werden müssen."],
          ["Konjunktiv II", "würde + P II", "Der Antrag würde geprüft."],
          ["Konjunktiv II, geçmiş", "wäre + P II + worden", "Der Antrag wäre geprüft worden."],
        ],
      ),
      table(
        ["Tür", "Örnek", "Not"],
        [
          ["Öznesiz edilgen", "Hier wird nicht geraucht.", "özne yok, es de yok"],
          ["Başta es ile", "Es wird viel gearbeitet.", "es yalnızca yer tutuyor"],
          ["Dativ nesneli", "Dem Kunden wird geholfen.", "Dativ Dativ kalır"],
          ["Yan cümlede", "…, dass der Antrag geprüft werden muss.", "modal en sona"],
          ["Fail: insan", "…von der Kommission geprüft.", "von + Dativ"],
          ["Fail: sebep/araç", "…durch einen Fehler verursacht.", "durch + Akkusativ"],
        ],
      ),
      note(
        "Modal fiilli edilgen yan cümleye girince sıra ters döner ve çekilmiş " +
          "fiil EN SONA gider: \"Ich weiß, dass der Antrag geprüft werden " +
          "muss.\" Perfekt'te ise çekilmiş fiil üç mastardan ÖNCE gelir: " +
          "\"…, dass er hat geprüft werden müssen.\"",
      ),
    ],
  },

  {
    id: "b2-passiversatz",
    level: "B2",
    title: "Edilgen yerine geçen yapılar",
    de: "Passiversatzformen",
    summary: "lässt sich, ist zu, -bar: edilgen demeden edilgen demek",
    blocks: [
      table(
        ["Yapı", "Anlamı", "Örnek", "Edilgen karşılığı"],
        [
          ["sich lassen + mastar", "yapılabilir", "Das lässt sich reparieren.", "kann repariert werden"],
          ["sein + zu + mastar", "yapılabilir / yapılmalı", "Das ist noch zu klären.", "muss geklärt werden"],
          ["-bar", "yapılabilir", "Der Text ist lesbar.", "kann gelesen werden"],
          ["-lich", "yapılabilir", "Das ist unverständlich.", "kann nicht verstanden werden"],
          ["man", "genel özne", "Man repariert das schnell.", "wird schnell repariert"],
          ["es gibt … zu + mastar", "yapılacak var", "Es gibt viel zu tun.", "muss viel getan werden"],
          ["bekommen / kriegen + P II", "birine yapılıyor", "Er bekommt das Buch geschenkt.", "ihm wird geschenkt"],
          ["gehören + P II", "yapılmalı (öfkeli)", "Das gehört verboten.", "sollte verboten werden"],
          ["sich + mastar (nesnesiz)", "kendiliğinden", "Das Buch verkauft sich gut.", "wird gut verkauft"],
        ],
      ),
      note(
        "\"sein + zu + mastar\" iki anlama gelir ve hangisi olduğunu bağlam " +
          "söyler: \"Das ist zu machen\" hem yapılabilir hem yapılmalı " +
          "demektir. \"sich lassen\" ise yalnızca imkân bildirir.",
      ),
      note(
        "Bu yapılar resmî yazışmanın dilidir: \"Der Antrag ist bis Freitag " +
          "einzureichen\" cümlesi \"Sie müssen den Antrag einreichen\"den daha " +
          "mesafeli ve daha bağlayıcı duyulur.",
      ),
    ],
  },

  {
    id: "b2-konjunktiv1",
    level: "B2",
    title: "Dolaylı aktarım",
    de: "Indirekte Rede und Konjunktiv I",
    summary: "başkasının sözünü aktarırken mesafe koymak",
    blocks: [
      table(
        ["Kişi", "sein", "haben", "können", "sagen", "kommen"],
        [
          ["ich", "sei", "habe", "könne", "sage", "komme"],
          ["du", "sei(e)st", "habest", "könnest", "sagest", "kommest"],
          ["er / sie / es", "sei", "habe", "könne", "sage", "komme"],
          ["wir", "seien", "hätten", "könnten", "sagten", "kämen"],
          ["ihr", "seiet", "habet", "könnet", "saget", "kommet"],
          ["sie / Sie", "seien", "hätten", "könnten", "sagten", "kämen"],
        ],
      ),
      note(
        "Konjunktiv I biçimi Präsens'le AYNI çıkıyorsa Konjunktiv II'ye " +
          "geçilir — tablodaki wir ve sie satırları bu yüzden hätten, könnten, " +
          "sagten. Kural mekaniktir: aktarım Präsens'ten ayırt edilebilmelidir.",
      ),
      table(
        ["Doğrudan söz", "Aktarım", "Zaman"],
        [
          ["\"Ich bin müde.\"", "Er sagt, er sei müde.", "şimdi → Konjunktiv I"],
          ["\"Ich habe keine Zeit.\"", "Er sagt, er habe keine Zeit.", "şimdi"],
          ["\"Ich war krank.\"", "Er sagt, er sei krank gewesen.", "geçmiş → sei/habe + P II"],
          ["\"Ich habe gearbeitet.\"", "Er sagt, er habe gearbeitet.", "geçmiş"],
          ["\"Ich hatte gearbeitet.\"", "Er sagt, er habe gearbeitet.", "geçmiş — tek biçim"],
          ["\"Ich werde kommen.\"", "Er sagt, er werde kommen.", "gelecek → werde + mastar"],
          ["\"Kommst du?\"", "Er fragt, ob ich komme.", "evet/hayır sorusu → ob"],
          ["\"Wann kommst du?\"", "Er fragt, wann ich komme.", "W-sorusu korunur"],
          ["\"Komm bitte!\"", "Er bittet mich, ich solle kommen.", "emir → sollen"],
        ],
      ),
      note(
        "Üç geçmiş zamanın hepsi TEK bir aktarım biçimine iner: sei/habe + " +
          "Partizip II. Präteritum, Perfekt ve Plusquamperfekt ayrımı " +
          "aktarımda kaybolur.",
      ),
      note(
        "\"dass\" yazılabilir de yazılmayabilir de. Yazılmazsa yan cümle " +
          "dizilişi de kalkar: \"Er sagt, er sei müde\" — fiil ikinci sırada. " +
          "\"Er sagt, dass er müde sei\" — fiil sonda.",
      ),
      table(
        ["İşaret", "Ne söyler"],
        [
          ["Konjunktiv I", "aktarıyorum, doğruluğunu üstlenmiyorum"],
          ["Indikativ", "aktarıyorum ve katılıyorum"],
          ["Konjunktiv II", "aktarıyorum ve kuşkuluyum"],
          ["angeblich", "sözde, iddiaya göre"],
          ["laut / nach Angaben von", "-e göre (resmî)"],
        ],
        "Gazetecilikte neden kullanılıyor",
      ),
    ],
  },

  {
    id: "b2-subjektive-modalverben",
    level: "B2",
    title: "Öznel modal fiiller",
    de: "Subjektive Bedeutung der Modalverben",
    summary: "aynı fiiller, bu kez tahmin ve iddia bildiriyor",
    blocks: [
      table(
        ["Fiil", "Öznel anlam", "Kesinlik", "Örnek"],
        [
          ["muss", "kesin öyledir", "%95", "Er muss zu Hause sein."],
          ["müsste", "öyle olmalı", "%80", "Er müsste jetzt da sein."],
          ["dürfte", "büyük ihtimalle", "%75", "Das dürfte stimmen."],
          ["kann", "olabilir", "%50", "Das kann sein."],
          ["könnte", "olabilirdi", "%40", "Er könnte krank sein."],
          ["mag", "olabilir (kabullenme)", "%40", "Das mag stimmen, aber…"],
          ["kann nicht", "imkânsız", "%0", "Das kann nicht stimmen."],
          ["soll", "başkaları öyle diyor", "—", "Er soll sehr reich sein."],
          ["will", "kendisi öyle iddia ediyor", "—", "Er will nichts gewusst haben."],
        ],
      ),
      note(
        "soll ve will kesinlik değil KAYNAK bildirir: \"soll\" başkalarının " +
          "söylediğini, \"will\" öznenin kendi iddiasını işaretler ve " +
          "çoğunlukla kuşku taşır.",
      ),
      table(
        ["Zaman", "Yapı", "Örnek"],
        [
          ["Şimdi", "Modal + mastar", "Er muss krank sein."],
          ["Geçmiş", "Modal + P II + haben/sein", "Er muss krank gewesen sein."],
          ["Geçmiş", "Modal + P II + haben", "Er soll viel Geld verdient haben."],
          ["Geçmiş", "Modal + P II + haben", "Sie will ihn nie gesehen haben."],
        ],
        "Geçmişe dair tahmin",
      ),
      note(
        "Nesnel anlamla karışmasın: \"Er muss arbeiten\" (çalışmak zorunda) " +
          "nesnel, \"Er muss krank sein\" (hasta olmalı) özneldir. Ayrımı " +
          "yapan şey mastarın türü: sein, haben gibi durum fiilleri öznel " +
          "okumayı getirir.",
      ),
    ],
  },

  {
    id: "b2-partizipialattribute",
    level: "B2",
    title: "Ortaç öbekleri",
    de: "Partizipialattribute",
    summary: "ilgi cümlesini ismin önüne sıkıştırmak",
    blocks: [
      table(
        ["Ortaç", "Anlam", "Örnek", "İlgi cümlesi karşılığı"],
        [
          ["Partizip I", "aktif, sürüyor", "der wartende Kunde", "der Kunde, der wartet"],
          ["Partizip II", "edilgen, bitmiş", "die renovierte Wohnung", "die Wohnung, die renoviert wurde"],
          ["Partizip II (sein fiili)", "aktif, bitmiş", "der angekommene Zug", "der Zug, der angekommen ist"],
          ["zu + Partizip I", "yapılması gereken", "die zu lösende Aufgabe", "die Aufgabe, die gelöst werden muss"],
        ],
      ),
      table(
        ["Genişletilmiş öbek", "İlgi cümlesi karşılığı"],
        [
          [
            "der seit Wochen auf eine Antwort wartende Kunde",
            "der Kunde, der seit Wochen auf eine Antwort wartet",
          ],
          [
            "die im letzten Jahr komplett renovierte Wohnung",
            "die Wohnung, die im letzten Jahr komplett renoviert wurde",
          ],
          [
            "das von der Kommission geprüfte Konzept",
            "das Konzept, das von der Kommission geprüft wurde",
          ],
          [
            "die bis Freitag einzureichenden Unterlagen",
            "die Unterlagen, die bis Freitag eingereicht werden müssen",
          ],
          [
            "die ständig steigenden Mieten",
            "die Mieten, die ständig steigen",
          ],
        ],
      ),
      note(
        "Okurken sondan başa gidilir: önce artikel görülür, sonra uzun bir " +
          "araya girilir, İSİM en sonda gelir. \"der … wartende Kunde\" " +
          "öbeğinde artikelle isim arasındaki her şey ortacın tamlayıcısıdır.",
      ),
      note(
        "Yapı yazı dilinin işaretidir: gazete, rapor, ilan ve resmî " +
          "yazışmada sık, konuşmada neredeyse hiç. Konuşurken ilgi cümlesine " +
          "çevrilir.",
      ),
    ],
  },

  {
    id: "b2-nominalisierung",
    level: "B2",
    title: "Fiilden isme",
    de: "Nominalstil und Verbalstil",
    summary: "yan cümleyi edat öbeğine çevirmenin tam eşleşmesi",
    blocks: [
      table(
        ["Bağlaç (Verbalstil)", "Edat (Nominalstil)", "Durum"],
        [
          ["weil / da", "wegen, aufgrund", "Genitiv"],
          ["obwohl", "trotz", "Genitiv"],
          ["während (aynı anda)", "während", "Genitiv"],
          ["wenn / falls", "bei, im Falle", "Dativ / Genitiv"],
          ["nachdem", "nach", "Dativ"],
          ["bevor", "vor", "Dativ"],
          ["seit(dem)", "seit", "Dativ"],
          ["bis", "bis zu", "Dativ"],
          ["damit / um … zu", "zu, zwecks", "Dativ / Genitiv"],
          ["ohne dass / ohne … zu", "ohne", "Akkusativ"],
          ["(an)statt dass", "(an)statt", "Genitiv"],
          ["indem / dadurch, dass", "durch", "Akkusativ"],
          ["je nachdem, ob", "je nach", "Dativ"],
        ],
      ),
      table(
        ["Verbalstil", "Nominalstil"],
        [
          ["Weil das Wetter schlecht war, fiel das Spiel aus.", "Wegen des schlechten Wetters fiel das Spiel aus."],
          ["Nachdem er angekommen war, rief er an.", "Nach seiner Ankunft rief er an."],
          ["Bevor sie abreiste, packte sie.", "Vor ihrer Abreise packte sie."],
          ["Während sie studierte, arbeitete sie.", "Während ihres Studiums arbeitete sie."],
          ["Obwohl es regnete, gingen wir los.", "Trotz des Regens gingen wir los."],
          ["Damit die Qualität steigt, …", "Zur Steigerung der Qualität …"],
          ["Wenn Sie nicht zahlen, …", "Bei Nichtzahlung …"],
          ["Indem man Energie spart, …", "Durch Energiesparen …"],
          ["Wenn man diese Regel beachtet, …", "Bei Beachtung dieser Regel …"],
          ["Falls es nötig ist, …", "Bei Bedarf …"],
        ],
      ),
      table(
        ["Ek", "Fiilden isim", "Cinsiyet"],
        [
          ["-ung", "prüfen → die Prüfung", "die"],
          ["mastar", "essen → das Essen", "das"],
          ["-e", "fragen → die Frage", "die"],
          ["kök", "beginnen → der Beginn", "der"],
          ["-nis", "erlauben → die Erlaubnis", "die (bazen das)"],
          ["-t", "fahren → die Fahrt", "die"],
          ["-heit / -keit", "(sıfattan) frei → die Freiheit", "die"],
        ],
        "İsimleştirme ekleri",
      ),
      note(
        "-ung, -heit, -keit, -schaft, -ion, -tät, -ur ile biten isimler her " +
          "zaman dişildir; mastardan yapılan isim her zaman nötr. Cinsiyet " +
          "ezberinin kural bağlanan tek yeri burasıdır.",
      ),
    ],
  },

  {
    id: "b2-zweiteilige-konnektoren",
    level: "B2",
    title: "İki parçalı bağlaçlar",
    de: "Zweiteilige Konnektoren",
    summary: "sowohl … als auch, weder … noch, zwar … aber",
    blocks: [
      table(
        ["Yapı", "Türkçe", "Örnek"],
        [
          ["sowohl … als auch", "hem … hem", "Sowohl er als auch sie kommen mit."],
          ["nicht nur … sondern auch", "sadece … değil, ayrıca", "Er spricht nicht nur Deutsch, sondern auch Russisch."],
          ["weder … noch", "ne … ne", "Ich habe weder Zeit noch Geld."],
          ["entweder … oder", "ya … ya", "Entweder du kommst mit oder du bleibst hier."],
          ["zwar … aber", "gerçi … ama", "Das Auto ist zwar alt, aber zuverlässig."],
          ["einerseits … andererseits", "bir yandan … öte yandan", "Einerseits will ich, andererseits habe ich Angst."],
          ["teils … teils", "kısmen … kısmen", "Der Vortrag war teils gut, teils langweilig."],
          ["je … desto / umso", "ne kadar … o kadar", "Je früher wir anfangen, desto besser."],
          ["nicht … sondern", "… değil, aksine", "Das ist nicht Tee, sondern Kaffee."],
          ["mal … mal", "bazen … bazen", "Mal regnet es, mal scheint die Sonne."],
        ],
      ),
      note(
        "\"weder … noch\" kendisi zaten olumsuzdur; cümleye ayrıca \"nicht\" " +
          "eklenmez. \"Ich habe nicht weder Zeit noch Geld\" yanlıştır.",
      ),
      note(
        "\"je … desto\" iki farklı diziliş taşır: \"je\" parçası YAN cümledir " +
          "ve fiili sondadır; \"desto\" parçasında fiil karşılaştırma " +
          "sıfatından hemen sonra gelir. Je mehr ich lerne, desto sicherer " +
          "werde ich.",
      ),
      note(
        "\"entweder\" cümle başında olursa fiil hemen arkasından gelir " +
          "(Entweder kommst du mit…) ya da özne öne alınır (Entweder du kommst " +
          "mit…). İkisi de doğrudur.",
      ),
    ],
  },

  {
    id: "b2-konnektoren",
    level: "B2",
    title: "İleri bağlaçlar",
    de: "Konnektoren B2",
    summary: "indem, sofern, es sei denn ve diğerleri",
    blocks: [
      table(
        ["Bağlaç", "Türkçe", "Örnek"],
        [
          ["indem", "-erek (yöntem)", "Man spart Energie, indem man weniger heizt."],
          ["dadurch, dass", "-mesi yoluyla", "Dadurch, dass er half, ging es schneller."],
          ["sofern", "şu şartla ki", "Sofern nichts dazwischenkommt, komme ich."],
          ["es sei denn", "meğer ki", "Ich komme, es sei denn, es regnet."],
          ["außer wenn", "-medikçe", "Wir fahren, außer wenn es schneit."],
          ["anstatt dass", "-ecek yerde", "Anstatt dass er hilft, sieht er nur zu."],
          ["ohne dass", "-meksizin", "Er ging, ohne dass jemand es merkte."],
          ["sodass", "öyle ki", "Er sprach leise, sodass niemand ihn hörte."],
          ["zumal", "hele ki, üstelik", "Ich bleibe, zumal es regnet."],
          ["wobei", "ki bu arada", "Er kam pünktlich, wobei das selten ist."],
          ["wohingegen", "buna karşılık", "Er arbeitet viel, wohingegen sie kaum etwas tut."],
          ["insofern als", "şu bakımdan ki", "Der Plan ist gut, insofern als er realistisch ist."],
          ["geschweige denn", "… şöyle dursun", "Er kann nicht kochen, geschweige denn backen."],
          ["soweit", "-diği kadarıyla", "Soweit ich weiß, ist er verreist."],
          ["inwiefern", "ne bakımdan", "Es ist unklar, inwiefern das hilft."],
        ],
      ),
      note(
        "\"es sei denn\" cümlesinde fiil SONA gitmez: ana cümle dizilişi " +
          "korunur. \"Ich komme, es sei denn, ich werde krank.\"",
      ),
      note(
        "\"indem\" yöntem bildirir, \"dadurch, dass\" ise sebep-sonuç " +
          "vurgular; ikisi çoğu bağlamda değiştirilebilir. \"indem\"i " +
          "\"während\" ile karıştırmamak gerekir — \"indem\" nasıl sorusunu " +
          "cevaplar, \"während\" ne zaman sorusunu.",
      ),
    ],
  },

  {
    id: "b2-funktionsverbgefuege",
    level: "B2",
    title: "İsim-fiil öbekleri",
    de: "Funktionsverbgefüge",
    summary: "resmî dilin kalıpları ve tek kelimelik karşılıkları",
    blocks: [
      table(
        ["Öbek", "Fiil karşılığı", "Türkçe"],
        [
          ["eine Entscheidung treffen", "entscheiden", "karar vermek"],
          ["einen Antrag stellen", "beantragen", "başvuru yapmak"],
          ["eine Frage stellen", "fragen", "soru sormak"],
          ["einen Vorschlag machen", "vorschlagen", "öneri sunmak"],
          ["zur Verfügung stehen", "verfügbar sein", "hazır olmak"],
          ["zur Verfügung stellen", "bereitstellen", "sunmak, tahsis etmek"],
          ["in Frage kommen", "möglich sein", "söz konusu olmak"],
          ["in Frage stellen", "bezweifeln", "sorgulamak"],
          ["Rücksicht nehmen auf", "berücksichtigen", "gözetmek"],
          ["Bezug nehmen auf", "sich beziehen auf", "atıfta bulunmak"],
          ["Stellung nehmen zu", "sich äußern zu", "görüş bildirmek"],
          ["in Kraft treten", "gültig werden", "yürürlüğe girmek"],
          ["zum Ausdruck bringen", "ausdrücken", "dile getirmek"],
          ["eine Rolle spielen", "wichtig sein", "rol oynamak"],
          ["Kritik üben an", "kritisieren", "eleştirmek"],
          ["in Betracht ziehen", "erwägen", "göz önüne almak"],
          ["Abschied nehmen von", "sich verabschieden", "veda etmek"],
          ["zur Sprache bringen", "ansprechen", "gündeme getirmek"],
          ["Anspruch haben auf", "beanspruchen", "hak sahibi olmak"],
          ["Bescheid geben", "informieren", "haber vermek"],
          ["Widerspruch einlegen", "widersprechen", "itiraz etmek"],
          ["zur Kenntnis nehmen", "erfahren", "bilgi edinmek"],
          ["in Erfüllung gehen", "sich erfüllen", "gerçekleşmek"],
          ["Druck ausüben auf", "unter Druck setzen", "baskı yapmak"],
          ["eine Erklärung abgeben", "erklären", "açıklama yapmak"],
          ["Maßnahmen ergreifen", "handeln", "önlem almak"],
          ["Verantwortung übernehmen", "verantworten", "sorumluluk almak"],
          ["einen Beitrag leisten", "beitragen", "katkıda bulunmak"],
        ],
      ),
      note(
        "Öbekteki fiil (treffen, stellen, nehmen) anlamını kaybeder; anlamı " +
          "taşıyan İSİMDİR. Bu yüzden \"eine Entscheidung machen\" gibi " +
          "birebir çeviriler yanlış duyulur — fiil isimle birlikte ezberlenir.",
      ),
      note(
        "Kalıplar sunum, tutanak, dilekçe ve resmî yazışmanın dilidir. Sözlü " +
          "sınavda kullanmak seviyeyi doğrudan gösterir; gündelik sohbette ise " +
          "yapmacık durur.",
      ),
    ],
  },

  {
    id: "b2-verben-praeposition",
    level: "B2",
    title: "Fiil + edat — ileri",
    de: "Verben mit Präpositionen B2",
    summary: "resmî ve soyut dilin fiil-edat çiftleri",
    blocks: [
      table(
        ["Fiil + edat", "Durum", "Türkçe", "Örnek"],
        [
          ["sich beziehen auf", "Akkusativ", "atıfta bulunmak", "Ich beziehe mich auf Ihr Schreiben."],
          ["hinweisen auf", "Akkusativ", "dikkat çekmek", "Ich weise auf das Risiko hin."],
          ["verzichten auf", "Akkusativ", "vazgeçmek", "Wir verzichten auf eine Klage."],
          ["sich verlassen auf", "Akkusativ", "güvenmek", "Ich verlasse mich auf dich."],
          ["sich einigen auf", "Akkusativ", "uzlaşmak", "Wir einigen uns auf einen Termin."],
          ["sich einstellen auf", "Akkusativ", "kendini hazırlamak", "Stell dich auf Verzögerungen ein."],
          ["drängen auf", "Akkusativ", "ısrar etmek", "Sie drängen auf eine Antwort."],
          ["sich gewöhnen an", "Akkusativ", "alışmak", "Ich gewöhne mich an das Klima."],
          ["sich wenden an", "Akkusativ", "başvurmak", "Wenden Sie sich an das Sekretariat."],
          ["sich handeln um", "Akkusativ", "söz konusu olmak", "Es handelt sich um einen Irrtum."],
          ["es geht um", "Akkusativ", "mesele … dır", "Es geht um die Kosten."],
          ["protestieren gegen", "Akkusativ", "protesto etmek", "Sie protestieren gegen den Bau."],
          ["sich auszeichnen durch", "Akkusativ", "-le öne çıkmak", "Er zeichnet sich durch Fleiß aus."],
          ["bestehen auf", "Dativ", "ısrar etmek", "Ich bestehe auf meinem Recht."],
          ["bestehen aus", "Dativ", "-den oluşmak", "Das Team besteht aus fünf Personen."],
          ["verfügen über", "Akkusativ", "sahip olmak", "Er verfügt über viel Erfahrung."],
          ["zweifeln an", "Dativ", "kuşku duymak", "Ich zweifle an dieser Zahl."],
          ["leiden an / unter", "Dativ", "-den muzdarip olmak", "Sie leidet unter dem Lärm."],
          ["sich beschäftigen mit", "Dativ", "ilgilenmek, uğraşmak", "Er beschäftigt sich mit Statistik."],
          ["rechnen mit", "Dativ", "hesaba katmak", "Wir rechnen mit Widerstand."],
          ["beruhen auf", "Dativ", "-e dayanmak", "Das beruht auf einem Missverständnis."],
          ["führen zu", "Dativ", "-e yol açmak", "Das führt zu Problemen."],
          ["beitragen zu", "Dativ", "katkıda bulunmak", "Jeder trägt zum Erfolg bei."],
          ["sich äußern zu", "Dativ", "görüş bildirmek", "Er äußerte sich nicht dazu."],
          ["halten von", "Dativ", "-i düşünmek, değer vermek", "Was hältst du davon?"],
          ["mangeln an", "Dativ", "eksikliğini çekmek", "Es mangelt an Personal."],
          ["sich eignen für", "Akkusativ", "uygun olmak", "Das eignet sich für Anfänger."],
          ["gelten als", "—", "sayılmak", "Er gilt als Experte."],
        ],
      ),
      note(
        "\"bestehen\" üç edatla üç ayrı fiildir: bestehen auf + Dativ (ısrar " +
          "etmek), bestehen aus + Dativ (oluşmak), bestehen in + Dativ " +
          "(-den ibaret olmak). Ayrıca edatsız \"eine Prüfung bestehen\" = " +
          "sınavı geçmek.",
      ),
      note(
        "\"halten\" de öyle: halten von (fikri olmak), halten für (saymak), " +
          "sich halten an (uymak). Edat değişince fiil değişiyor sayılır.",
      ),
    ],
  },
];
