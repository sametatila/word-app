import { note, table, type CheatSheet } from "./types";

/**
 * C1 başvuru sayfaları — dilbilgisi bitti, TON başladı.
 *
 * C1'de yeni bir zaman ya da yeni bir durum öğrenilmiyor; öğrenilen şey aynı
 * içeriği farklı kayıtlarda söyleyebilmek. Bu yüzden buradaki sayfaların çoğu
 * çekim tablosu değil EŞDEĞERLİK tablosu: aynı cümlenin gündelik, resmî ve
 * yazınsal karşılıkları yan yana duruyor.
 *
 * Modal parçacıklar bu bölümün en pratik sayfası: hiçbir sözlükte doğru
 * dürüst karşılığı olmayan ama her cümlede geçen kelimeler.
 */
export const DE_C1: CheatSheet[] = [
  {
    id: "c1-modalpartikeln",
    level: "C1",
    title: "Modal parçacıklar",
    de: "Modalpartikeln",
    summary: "doch, mal, ja, wohl — çevrilemeyen ama her cümlede olan kelimeler",
    blocks: [
      table(
        ["Parçacık", "Ne katıyor", "Örnek", "Türkçe hissi"],
        [
          ["ja", "bilinen şeyi hatırlatma", "Du weißt ja, wie er ist.", "hani, biliyorsun"],
          ["ja (vurgulu)", "şaşkınlık", "Das ist ja unglaublich!", "ya, vay"],
          ["doch", "itiraz, düzeltme", "Das habe ich doch gesagt!", "ama, işte"],
          ["doch (rica)", "ısrarlı davet", "Komm doch mit!", "hadi gelsene"],
          ["mal", "ricayı yumuşatma", "Warte mal kurz.", "bir"],
          ["denn", "soruda ilgi ya da şaşkınlık", "Was machst du denn hier?", "peki, ki"],
          ["wohl", "tahmin", "Er ist wohl krank.", "herhalde"],
          ["eben / halt", "değiştirilemezlik", "Das ist eben so.", "işte böyle"],
          ["schon", "rahatlatma", "Das wird schon klappen.", "nasılsa olur"],
          ["aber", "şaşkınlık ünlemi", "Das ist aber schön!", "ne kadar da"],
          ["etwa", "endişeli soru", "Hast du etwa vergessen?", "yoksa … mı"],
          ["bloß / nur", "ısrarlı merak ya da uyarı", "Was hat er bloß?", "bir, sakın"],
          ["ruhig", "izin verme", "Frag ruhig!", "çekinme"],
          ["eigentlich", "asıl konuya dönme", "Was machst du eigentlich beruflich?", "aslında"],
          ["überhaupt", "temelden sorgulama", "Willst du überhaupt mitkommen?", "zaten, ki"],
          ["einfach", "başka çare yok", "Ich habe es einfach vergessen.", "öylece"],
          ["vielleicht", "abartma ünlemi", "Das war vielleicht ein Tag!", "ne gündü ama"],
          ["gar", "olumsuzu güçlendirme", "Das ist gar nicht wahr.", "hiç"],
        ],
      ),
      note(
        "Modal parçacıklar VURGUSUZDUR ve cümlenin ortasında (Mittelfeld) " +
          "durur, asla başta olmaz. Aynı kelimenin vurgulu hâli bambaşka bir " +
          "şeydir: \"Ich komme SCHON\" (yakında geliyorum) ile \"Das wird schon " +
          "klappen\" (nasılsa olur) aynı kelime değildir.",
      ),
      note(
        "Sözlük karşılıkları yanıltıcı — bunlar anlamı değil TAVRI taşıyor. " +
          "Cümleden çıkarılırsa cümle yine doğrudur ama soğuk, hatta kaba " +
          "duyulur: \"Warte!\" ile \"Warte mal.\" arasındaki fark budur.",
      ),
      table(
        ["Cümle türü", "Kullanılabilenler"],
        [
          ["Bildirme", "ja, doch, eben, halt, wohl, schon, einfach"],
          ["W-sorusu", "denn, bloß, nur, eigentlich, wohl"],
          ["Evet/hayır sorusu", "denn, etwa, wohl"],
          ["Emir / rica", "doch, mal, doch mal, ruhig, bloß, ja (uyarı)"],
          ["Ünlem", "aber, vielleicht, ja"],
        ],
        "Hangi parçacık hangi cümlede",
      ),
    ],
  },

  {
    id: "c1-konjunktiv2-erweitert",
    level: "C1",
    title: "Dilek-şart kipi — ileri",
    de: "Konjunktiv II: erweiterte Formen",
    summary: "als ob, zu … als dass, hätte kommen sollen",
    blocks: [
      table(
        ["Yapı", "Anlam", "Örnek"],
        [
          ["Wenn … nur / doch (nur)!", "keşke", "Wenn ich das nur früher gewusst hätte!"],
          ["Hätte ich doch …!", "keşke (wenn'siz)", "Hätte ich doch geschwiegen!"],
          ["als ob / als wenn + Konj. II", "-mış gibi", "Er tut so, als ob er alles wüsste."],
          ["als + Konj. II (fiil öne)", "-mış gibi", "Er tut so, als wüsste er alles."],
          ["zu … , als dass + Konj. II", "-mek için fazla …", "Es ist zu spät, als dass wir noch anfangen könnten."],
          ["ohne dass + Konj. II", "-meksizin", "Er ging, ohne dass es jemand bemerkt hätte."],
          ["beinahe / fast + Konj. II geçmiş", "az kalsın", "Ich wäre beinahe eingeschlafen."],
          ["Sollte … , (dann) …", "olur da … -se", "Sollte es regnen, bleiben wir zu Hause."],
          ["an deiner Stelle", "yerinde olsam", "An deiner Stelle hätte ich abgelehnt."],
          ["Es wäre besser gewesen, wenn …", "daha iyi olurdu", "Es wäre besser gewesen, wenn du gefragt hättest."],
        ],
      ),
      table(
        ["Yapı", "Anlam", "Örnek"],
        [
          ["hätte + mastar + können", "yapabilirdi (yapmadı)", "Ich hätte dir helfen können."],
          ["hätte + mastar + müssen", "yapması gerekirdi", "Du hättest anrufen müssen."],
          ["hätte + mastar + sollen", "yapmalıydı (sitem)", "Er hätte früher kommen sollen."],
          ["hätte + mastar + dürfen", "yapmamalıydı", "Das hättest du nicht sagen dürfen."],
          ["wäre + P II + worden", "yapılmış olurdu (edilgen)", "Der Fehler wäre bemerkt worden."],
        ],
        "Geçmişte gerçekleşmemiş kip — sitem ve pişmanlığın dili",
      ),
      note(
        "Modal fiilli geçmiş Konjunktiv II'de Partizip II KULLANILMAZ, iki " +
          "mastar arka arkaya gelir: \"hätte helfen können\" — \"hätte helfen " +
          "gekonnt\" değil. Yan cümlede ise hätte iki mastarın ÖNÜNE geçer: " +
          "\"…, dass ich dir hätte helfen können.\"",
      ),
      note(
        "\"als ob\" ile \"als\" aynı şeyi söyler, dizilişleri farklıdır: " +
          "\"als ob\" yan cümledir (fiil sonda), yalın \"als\" ise fiili hemen " +
          "arkasına alır. İkincisi daha yazınsal.",
      ),
    ],
  },

  {
    id: "c1-textkonnektoren",
    level: "C1",
    title: "Metin bağlayıcıları",
    de: "Textkonnektoren",
    summary: "paragrafı paragrafa bağlayan resmî bağlaçlar",
    blocks: [
      table(
        ["İşlev", "Bağlayıcılar"],
        [
          ["Ekleme", "darüber hinaus, zudem, ferner, überdies, des Weiteren, außerdem"],
          ["Vurgulama", "insbesondere, vor allem, namentlich, besonders, nicht zuletzt"],
          ["Zıtlık", "dennoch, gleichwohl, nichtsdestotrotz, demgegenüber, im Gegensatz dazu"],
          ["Sınırlama", "allerdings, freilich, jedoch, indes, immerhin"],
          ["Sonuç", "folglich, somit, mithin, demnach, infolgedessen, daher"],
          ["Sebep", "denn, nämlich, schließlich, zumal"],
          ["Örnekleme", "beispielsweise, etwa, so, unter anderem"],
          ["Sıralama", "zunächst, sodann, im Anschluss, schließlich, abschließend"],
          ["Özetleme", "zusammenfassend, kurzum, letztlich, alles in allem, im Ergebnis"],
          ["Koşul", "andernfalls, gegebenenfalls, im Falle, ansonsten"],
          ["Yeniden ifade", "das heißt, mit anderen Worten, genauer gesagt, anders formuliert"],
          ["Karşılaştırma", "im Vergleich dazu, demgegenüber, ähnlich, ebenso"],
        ],
      ),
      table(
        ["Bağlaç", "Türkçe", "Örnek"],
        [
          ["wenngleich", "-mesine rağmen (yazınsal)", "Der Plan ist gut, wenngleich teuer."],
          ["obgleich / obschon", "-mesine rağmen", "Obgleich er müde war, arbeitete er weiter."],
          ["sofern", "şu şartla ki", "Sofern keine Einwände bestehen, beginnen wir."],
          ["soweit", "-diği ölçüde", "Soweit mir bekannt ist, wurde nichts entschieden."],
          ["insofern als", "şu bakımdan ki", "Das ist wichtig, insofern als es alle betrifft."],
          ["zumal", "hele ki, üstelik", "Wir sollten warten, zumal die Lage unklar ist."],
          ["angenommen, dass", "diyelim ki", "Angenommen, dass es klappt, was dann?"],
          ["vorausgesetzt, dass", "şartıyla", "Vorausgesetzt, dass alle zustimmen, …"],
          ["gesetzt den Fall, dass", "farz edelim ki", "Gesetzt den Fall, dass er absagt, …"],
          ["es sei denn, dass", "meğer ki", "Wir fahren, es sei denn, dass es schneit."],
          ["so … auch", "ne kadar … olsa da", "So schwer es auch sein mag, wir schaffen es."],
          ["sei es … sei es", "ister … ister", "Sei es aus Angst, sei es aus Trotz — er schwieg."],
          ["geschweige denn", "… şöyle dursun", "Er grüßt nicht, geschweige denn dass er hilft."],
        ],
        "Yazınsal ve resmî bağlaçlar",
      ),
      note(
        "\"jedoch\", \"allerdings\", \"indes\" cümlenin başında da ortasında " +
          "da durabilir; ortadayken cümle dizilişini bozmaz: \"Der Plan ist " +
          "jedoch teuer.\" Başta olduğunda ise birinci sırayı kaplar ve özneyi " +
          "arkaya iter.",
      ),
    ],
  },

  {
    id: "c1-nominalstil",
    level: "C1",
    title: "Resmî dil ve isim üslubu",
    de: "Nominalstil und Behördensprache",
    summary: "gündelik cümlenin resmî karşılığı",
    blocks: [
      table(
        ["Gündelik", "Resmî / isim üslubu"],
        [
          ["Wir haben Ihren Brief bekommen.", "Ihr Schreiben ist bei uns eingegangen."],
          ["Wir schicken Ihnen die Rechnung.", "Die Rechnung geht Ihnen gesondert zu."],
          ["Bitte antworten Sie bis Freitag.", "Um Rückäußerung bis Freitag wird gebeten."],
          ["Sie müssen den Antrag bis Freitag abgeben.", "Der Antrag ist bis Freitag einzureichen."],
          ["Wir können das nicht machen.", "Eine Umsetzung ist uns nicht möglich."],
          ["Wenn Sie nicht zahlen, …", "Bei Nichtzahlung …"],
          ["Nachdem wir geprüft haben, …", "Nach eingehender Prüfung …"],
          ["Weil das Wetter schlecht war, …", "Aufgrund der ungünstigen Witterung …"],
          ["Wir haben uns entschieden.", "Es wurde eine Entscheidung getroffen."],
          ["Ich beziehe mich auf Ihr Schreiben.", "Bezug nehmend auf Ihr Schreiben vom 3. Mai …"],
          ["Ich muss leider absagen.", "Ich sehe mich leider gezwungen abzusagen."],
          ["Das gilt ab dem 1. Januar.", "Die Regelung tritt zum 1. Januar in Kraft."],
        ],
      ),
      table(
        ["Kalıp", "İşlevi"],
        [
          ["Hiermit teile ich Ihnen mit, dass …", "resmî bildirim"],
          ["Ich wende mich an Sie mit der Bitte um …", "başvuru açılışı"],
          ["Ich wäre Ihnen sehr dankbar, wenn Sie …", "kibar talep"],
          ["Für Rückfragen stehe ich Ihnen gern zur Verfügung.", "kapanış"],
          ["Über eine baldige Rückmeldung würde ich mich freuen.", "kapanış"],
          ["Wie bereits telefonisch besprochen, …", "önceki temasa gönderme"],
          ["In der Anlage übersende ich Ihnen …", "ek bildirimi"],
          ["Ich bitte um Verständnis, dass …", "olumsuz haberin yumuşatılması"],
          ["Sollten Sie damit nicht einverstanden sein, …", "koşullu itiraz"],
        ],
        "Resmî yazışma kalıpları",
      ),
      note(
        "İsim üslubunun üç aracı: yan cümlenin edat öbeğine çevrilmesi " +
          "(weil → aufgrund), fiilin isme çevrilmesi (prüfen → die Prüfung) ve " +
          "edilgen ya da edilgen yerine geçen yapılar. Üçü birlikte faili " +
          "cümleden tamamen çıkarır — resmî dilin amacı da budur.",
      ),
      note(
        "Sınavda bu üslubu ÜRETMEK C1'in ölçüsü; ama aşırıya kaçmak da " +
          "cezalandırılıyor. İyi metin ikisini değiştirerek kullanır: uzun " +
          "isim öbeğinden sonra kısa ve fiilli bir cümle gelir.",
      ),
    ],
  },

  {
    id: "c1-wortbildung",
    level: "C1",
    title: "Kelime yapımı",
    de: "Wortbildung",
    summary: "önek ve sonekler — bilinmeyen kelimeyi çözmenin yolu",
    blocks: [
      table(
        ["Önek", "Kattığı anlam", "Örnek"],
        [
          ["be-", "fiili geçişli yapar", "antworten → beantworten (bir şeyi cevaplamak)"],
          ["ver-", "yanlış yapma, bitirme", "sprechen → sich versprechen (dili sürçmek)"],
          ["ver-", "yok olma, harcama", "brauchen → verbrauchen (tüketmek)"],
          ["ent-", "uzaklaşma, geri alma", "laden → entladen (boşaltmak)"],
          ["er-", "başarıya ulaşma", "finden → erfinden (icat etmek)"],
          ["zer-", "parçalanma", "stören → zerstören (yıkmak)"],
          ["miss-", "yanlış, başarısız", "verstehen → missverstehen"],
          ["un-", "olumsuzluk (sıfat/isim)", "möglich → unmöglich"],
          ["ur-", "asıl, kök", "Sprache → Ursprache"],
          ["nach-", "sonradan, tekrar", "denken → nachdenken (düşünmek)"],
          ["vor-", "önceden", "bereiten → vorbereiten (hazırlamak)"],
        ],
      ),
      table(
        ["Fiil", "Ayrılabilir okunuş", "Ayrılmaz okunuş"],
        [
          ["übersetzen", "ÜBERsetzen — karşıya geçirmek", "überSETZen — çevirmek"],
          ["umfahren", "UMfahren — çarpıp devirmek", "umFAHRen — etrafından dolaşmak"],
          ["durchschauen", "DURCHschauen — içinden bakmak", "durchSCHAUen — foyasını anlamak"],
          ["umgehen", "UMgehen — muamele etmek", "umGEHen — atlatmak, es geçmek"],
          ["unterhalten", "UNTERhalten — altında tutmak", "unterHALTen — sohbet etmek"],
          ["wiederholen", "WIEDERholen — geri getirmek", "wiederHOLen — tekrarlamak"],
        ],
        "Aynı yazılış, iki fiil — vurgu ayırır",
      ),
      table(
        ["Sonek", "Ne yapar", "Örnek"],
        [
          ["-ung", "fiilden isim (die)", "prüfen → die Prüfung"],
          ["-heit / -keit", "sıfattan isim (die)", "frei → die Freiheit"],
          ["-schaft", "topluluk, durum (die)", "Freund → die Freundschaft"],
          ["-nis", "sonuç (die/das)", "erlauben → die Erlaubnis"],
          ["-tum", "alan, durum (das/der)", "Eigen → das Eigentum"],
          ["-chen / -lein", "küçültme (das)", "Haus → das Häuschen"],
          ["-er / -ler", "yapan kişi (der)", "arbeiten → der Arbeiter"],
          ["-bar", "yapılabilir", "essen → essbar"],
          ["-lich", "-e ait, -ce", "Freund → freundlich"],
          ["-ig", "sahip olan", "Durst → durstig"],
          ["-los", "-siz", "Arbeit → arbeitslos"],
          ["-voll / -reich", "-le dolu, zengin", "Erfolg → erfolgreich"],
          ["-arm", "-ce fakir", "Fett → fettarm"],
          ["-fähig", "-ebilir durumda", "Arbeit → arbeitsfähig"],
          ["-würdig", "-e değer", "Sehen → sehenswürdig"],
          ["-mäßig", "-e göre, -sel", "Regel → regelmäßig"],
          ["-sam", "eğilimli", "sparen → sparsam"],
          ["-haft", "-imsi, -e benzer", "Fehler → fehlerhaft"],
        ],
      ),
      note(
        "Sonek CİNSİYETİ de belirler ve bu ezberi ortadan kaldıran tek " +
          "kuraldır: -ung, -heit, -keit, -schaft, -ion, -tät, -ur, -ei → die; " +
          "-chen, -lein, -tum, -ment → das; -er, -ling, -ismus → der.",
      ),
    ],
  },

  {
    id: "c1-adjektiv-nomen-praeposition",
    level: "C1",
    title: "Sıfat ve isim + edat",
    de: "Adjektive und Nomen mit Präpositionen",
    summary: "fiilden sonra sıra sıfat ve isim tamlamalarında",
    blocks: [
      table(
        ["Sıfat + edat", "Durum", "Örnek"],
        [
          ["stolz auf", "Akkusativ", "Ich bin stolz auf dich."],
          ["neugierig auf", "Akkusativ", "Ich bin neugierig auf das Ergebnis."],
          ["böse auf", "Akkusativ", "Sie ist böse auf ihn."],
          ["neidisch auf", "Akkusativ", "Er ist neidisch auf ihren Erfolg."],
          ["verantwortlich für", "Akkusativ", "Wer ist dafür verantwortlich?"],
          ["zuständig für", "Akkusativ", "Ich bin für den Einkauf zuständig."],
          ["dankbar für", "Akkusativ", "Ich bin dir dankbar für alles."],
          ["typisch für", "Akkusativ", "Das ist typisch für ihn."],
          ["geeignet für", "Akkusativ", "Der Kurs ist für Anfänger geeignet."],
          ["entscheidend für", "Akkusativ", "Das war entscheidend für den Erfolg."],
          ["offen für", "Akkusativ", "Wir sind offen für Vorschläge."],
          ["gewöhnt an", "Akkusativ", "Ich bin an Stress gewöhnt."],
          ["interessiert an", "Dativ", "Er ist an Physik interessiert."],
          ["beteiligt an", "Dativ", "Sie war an dem Projekt beteiligt."],
          ["schuld an", "Dativ", "Niemand ist schuld daran."],
          ["reich / arm an", "Dativ", "Die Region ist arm an Rohstoffen."],
          ["zufrieden mit", "Dativ", "Ich bin mit dem Ergebnis zufrieden."],
          ["einverstanden mit", "Dativ", "Sind Sie damit einverstanden?"],
          ["verwandt mit", "Dativ", "Er ist mit ihr verwandt."],
          ["abhängig von", "Dativ", "Das ist von vielen Faktoren abhängig."],
          ["überzeugt von", "Dativ", "Ich bin davon überzeugt."],
          ["bereit zu", "Dativ", "Wir sind zu einem Kompromiss bereit."],
          ["fähig zu", "Dativ", "Er ist zu allem fähig."],
          ["empfindlich gegen", "Akkusativ", "Ich bin empfindlich gegen Kälte."],
        ],
      ),
      table(
        ["İsim + edat", "Durum", "Örnek"],
        [
          ["die Angst vor", "Dativ", "die Angst vor dem Scheitern"],
          ["das Interesse an", "Dativ", "das Interesse an der Sache"],
          ["der Zweifel an", "Dativ", "Zweifel an seiner Aussage"],
          ["die Kritik an", "Dativ", "Kritik an der Entscheidung"],
          ["die Teilnahme an", "Dativ", "die Teilnahme am Wettbewerb"],
          ["der Bedarf an", "Dativ", "der Bedarf an Fachkräften"],
          ["die Frage nach", "Dativ", "die Frage nach der Ursache"],
          ["die Nachfrage nach", "Dativ", "die Nachfrage nach Wohnraum"],
          ["die Beziehung zu", "Dativ", "die Beziehung zu den Nachbarn"],
          ["der Zugang zu", "Dativ", "der Zugang zu Informationen"],
          ["der Grund für", "Akkusativ", "der Grund für die Verspätung"],
          ["die Verantwortung für", "Akkusativ", "die Verantwortung für das Team"],
          ["das Verständnis für", "Akkusativ", "Verständnis für die Lage"],
          ["die Voraussetzung für", "Akkusativ", "die Voraussetzung für den Erfolg"],
          ["die Antwort auf", "Akkusativ", "die Antwort auf meine Frage"],
          ["der Anspruch auf", "Akkusativ", "Anspruch auf Entschädigung"],
          ["der Einfluss auf", "Akkusativ", "der Einfluss auf die Preise"],
          ["die Auswirkung auf", "Akkusativ", "die Auswirkungen auf die Umwelt"],
        ],
      ),
      note(
        "Sıfat ve isim çoğunlukla aynı kökten gelen fiille AYNI edatı taşır: " +
          "sich interessieren für → das Interesse an (istisna), Angst haben " +
          "vor → die Angst vor, verantwortlich sein für → die Verantwortung " +
          "für. Ama garanti değil, tek tek doğrulanmalı.",
      ),
    ],
  },

  {
    id: "c1-satzstellung",
    level: "C1",
    title: "İleri cümle dizilişi",
    de: "Satzklammer und Feldermodell",
    summary: "Vorfeld, Mittelfeld, Nachfeld — ve neyin nereye çekilebildiği",
    blocks: [
      table(
        ["Vorfeld", "Sol parantez", "Mittelfeld", "Sağ parantez", "Nachfeld"],
        [
          ["Gestern", "hat", "er mir das Buch", "gegeben", "—"],
          ["Ich", "habe", "ihn gestern", "gesehen", "—"],
          ["Er", "ist", "größer", "—", "als sein Bruder"],
          ["Wir", "haben", "lange", "gesprochen", "über das Projekt"],
          ["—", "Hat", "er dich", "angerufen", "—"],
          ["Morgen", "will", "ich früher", "aufstehen", "—"],
        ],
      ),
      note(
        "Vorfeld'de yalnızca BİR öğe durabilir — bu, Almanca dizilişinin en " +
          "katı kuralıdır. \"Gestern ich habe…\" yanlış olmasının sebebi de " +
          "budur: iki öğe aynı anda birinci sıraya sığmaz.",
      ),
      table(
        ["Kural", "Örnek"],
        [
          ["Zamirler isimlerden önce", "Ich habe es dem Kind gegeben."],
          ["İki zamirde Akkusativ önce", "Ich habe es ihm gegeben."],
          ["Bilinen bilgi yeniden önce", "Ich habe dem Kind ein Buch gegeben."],
          ["İsimlerde Dativ, Akkusativ'den önce", "Ich gebe dem Kind das Buch."],
          ["Zarf sırası TeKaMoLo", "Ich fahre morgen mit dem Zug nach Köln."],
          ["nicht sağ parantezden hemen önce", "Ich habe ihn gestern nicht gesehen."],
          ["Modal parçacık Mittelfeld'in başında", "Ich habe ihm ja gesagt, dass …"],
        ],
        "Mittelfeld sırası",
      ),
      table(
        ["Nachfeld'e çıkabilen", "Örnek"],
        [
          ["Karşılaştırma öbeği", "Er ist größer als sein Bruder."],
          ["Uzun edat öbeği", "Ich habe lange gesprochen mit dem neuen Kollegen."],
          ["Yan cümle", "Ich habe ihm gesagt, dass er kommen soll."],
          ["zu'lu mastar öbeği", "Ich habe versucht, ihn zu erreichen."],
          ["Sonradan eklenen açıklama", "Wir treffen uns morgen, also am Freitag."],
        ],
        "Ausklammerung — sağ parantezin dışına taşımak",
      ),
      note(
        "Yan cümle ve zu'lu mastar öbeği Nachfeld'e çıkmak ZORUNDADIR; edat " +
          "öbeğini çıkarmak ise üsluptur: uzun bir öbeği Mittelfeld'de " +
          "bırakmak cümleyi okunmaz yapar, sona atmak nefes aldırır.",
      ),
    ],
  },

  {
    id: "c1-redemittel",
    level: "C1",
    title: "Tartışma ve sunum kalıpları",
    de: "Redemittel für Erörterung und Vortrag",
    summary: "sınavda ve toplantıda kullanılan hazır cümle iskeletleri",
    blocks: [
      table(
        ["İşlev", "Kalıp"],
        [
          ["Konuya giriş", "Im Folgenden möchte ich auf … näher eingehen."],
          ["Konuya giriş", "Das Thema meines Vortrags ist …"],
          ["Yapı bildirme", "Ich gliedere meinen Vortrag in drei Teile."],
          ["Tez koyma", "Es lässt sich festhalten, dass …"],
          ["Lehte", "Dafür spricht, dass …"],
          ["Lehte", "Ein wesentliches Argument ist, dass …"],
          ["Aleyhte", "Dagegen lässt sich einwenden, dass …"],
          ["Aleyhte", "Kritisch anzumerken ist, dass …"],
          ["Karşı görüşü kabul", "Zwar …, allerdings darf nicht übersehen werden, dass …"],
          ["Örnek", "Dies zeigt sich beispielsweise daran, dass …"],
          ["Kaynak", "Laut einer aktuellen Studie …"],
          ["Kaynak", "Wie die Zahlen belegen, …"],
          ["Kendi görüşü", "Meines Erachtens …"],
          ["Kendi görüşü", "Ich vertrete die Auffassung, dass …"],
          ["Sınırlama", "Dies gilt jedoch nur, sofern …"],
          ["Karşılaştırma", "Im Vergleich dazu fällt auf, dass …"],
          ["Sonuç", "Zusammenfassend lässt sich sagen, dass …"],
          ["Sonuç", "Abschließend komme ich zu dem Schluss, dass …"],
          ["Soruya dönüş", "Darauf komme ich später noch zurück."],
          ["Anlaşılmayanı sorma", "Habe ich Sie richtig verstanden, dass …?"],
        ],
      ),
      table(
        ["İşlev", "Kalıp"],
        [
          ["Grafiği tanıtma", "Die Grafik veranschaulicht die Entwicklung von …"],
          ["Kaynak/dönem", "Die Daten stammen aus dem Jahr … und beziehen sich auf …"],
          ["Artış", "Die Zahl ist deutlich / leicht / kontinuierlich gestiegen."],
          ["Azalış", "Ein spürbarer Rückgang ist zu verzeichnen."],
          ["Durağanlık", "Der Wert blieb weitgehend konstant."],
          ["Zirve", "Den Höhepunkt erreichte die Kurve im Jahr …"],
          ["Dikkat çekme", "Auffällig ist, dass …"],
          ["Oran", "Rund ein Drittel der Befragten gab an, …"],
          ["Yorum", "Daraus lässt sich schließen, dass …"],
        ],
        "Grafik ve veri anlatımı",
      ),
      note(
        "Kalıplar cümlenin İSKELETİDİR, içeriği değil. Sınavda üst puanı " +
          "getiren şey kalıbın kendisi değil, kalıbın arkasına konan somut " +
          "örnek: \"Dafür spricht, dass…\" cümlesi ardından bir veri ya da " +
          "yaşanmış bir durum gelmiyorsa boş kalır.",
      ),
    ],
  },

  {
    id: "c1-wendungen",
    level: "C1",
    title: "Kalıplaşmış ifadeler",
    de: "Feste Wendungen und Redewendungen",
    summary: "kelimelerinden anlamı çıkmayan yerleşik ifadeler",
    blocks: [
      table(
        ["İfade", "Anlamı", "Türkçe"],
        [
          ["etwas auf die lange Bank schieben", "sürekli ertelemek", "işi savsaklamak"],
          ["ins Wasser fallen", "iptal olmak", "suya düşmek"],
          ["die Daumen drücken", "başarı dilemek", "şans dilemek"],
          ["jemandem auf die Nerven gehen", "sinir etmek", "sinirine dokunmak"],
          ["unter vier Augen", "baş başa", "dört göz arasında"],
          ["den Nagel auf den Kopf treffen", "tam isabet ettirmek", "on ikiden vurmak"],
          ["mit dem Kopf durch die Wand wollen", "inatla dayatmak", "kafasının dikine gitmek"],
          ["etwas in Kauf nehmen", "göze almak", "razı olmak"],
          ["ins Gewicht fallen", "önemli olmak", "ağırlığı olmak"],
          ["auf dem Spiel stehen", "tehlikede olmak", "tehlikede"],
          ["über den Berg sein", "en zoru atlatmak", "yokuşu aşmak"],
          ["Hals über Kopf", "apar topar", "aceleyle"],
          ["aus dem Ruder laufen", "kontrolden çıkmak", "çığırından çıkmak"],
          ["ein Auge zudrücken", "görmezden gelmek", "göz yummak"],
          ["das ist nicht mein Bier", "beni ilgilendirmez", "benim işim değil"],
          ["den Faden verlieren", "konuyu kaybetmek", "ipin ucunu kaçırmak"],
          ["auf großem Fuß leben", "savurgan yaşamak", "har vurup harman savurmak"],
          ["jemandem reinen Wein einschenken", "gerçeği açıkça söylemek", "açık konuşmak"],
          ["etwas aus dem Ärmel schütteln", "zahmetsizce yapmak", "kolayca çıkarmak"],
          ["auf Nummer sicher gehen", "riske girmemek", "garantiye almak"],
          ["die Katze im Sack kaufen", "görmeden almak", "kör alışveriş"],
          ["jemanden im Stich lassen", "yüzüstü bırakmak", "yarı yolda bırakmak"],
          ["Öl ins Feuer gießen", "kızıştırmak", "yangına körükle gitmek"],
          ["Schwein haben", "şansı yaver gitmek", "talihi olmak"],
        ],
      ),
      note(
        "Deyimler C1'in ayırt edici işaretidir ama kullanımı risklidir: " +
          "yanlış bağlamda ya da çok sık kullanıldığında ezberlenmiş duyulur. " +
          "Anlamak zorunlu, üretmek seçimlik.",
      ),
    ],
  },
];
