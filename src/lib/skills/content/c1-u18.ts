import type { SkillExercise } from "../types";

/**
 * C1 · Ünite 18 — "Tür ve kayıt, kelime hassasiyeti, als-ob, imtiyaz".
 *
 * Dört ders: Ein Inhalt, drei Töne · Das treffende Wort ·
 * Als wäre nichts geschehen · Wenngleich und dennoch.
 *
 *   Kelime: die Textsorte, das Register, umschreiben, der Adressat, die
 *           Tonlage, herablassend, anmaßend, überheblich · scheinbar,
 *           anscheinend, effektiv, effizient, unterscheiden, die Genauigkeit,
 *           der Anschein, die Interpretation · verdrängen, die Illusion,
 *           aufrechterhalten, die Normalität, der Bruch, die Identifikation,
 *           die Emotion, die Unsicherheit · ungeachtet, nichtsdestotrotz,
 *           einschränken, abschwächen, die Gegenposition, tolerieren,
 *           beanspruchen, die Übereinkunft
 *
 * Ünitenin çekirdeği: BİR CÜMLE NE KADAR İDDİA EDİYOR? Dört ders bunun
 * dört ayarı — "scheinbar" görünüşün yanıltıcı olduğunu iddia eder,
 * "anscheinend" doğru olabileceğini; "als ob" gerçek dışı olduğunu
 * işaretler; konzessiv bağlaç karşı görüşü kabul edip iddiayı bırakmaz;
 * kayıt ise ilişki hakkında ne iddia ettiğini belirler.
 *
 * Türkçe konuşan için ilginç olan şu: scheinbar/anscheinend ayrımının
 * Türkçe karşılığı ZATEN VAR — "sözde" ve "görünüşe göre". Ama scheinbar
 * biçim olarak "görünüş"e (Schein) benzediği için eşleşme ters kuruluyor
 * ve tam tersi anlam çıkıyor. Ders bunu doğrudan adlandırıyor.
 */
export const c1U18: SkillExercise[] = [
  {
    id: "c1-u18-r1",
    level: "C1",
    skill: "reading",
    unit: 18,
    title: "Ein Jahr Rufbus im Landkreis",
    genre: "article",
    intro: "Kırsalda çağrıyla çalışan minibüs projesi bir yılı doldurdu. Pahalı mı, gerçekten işe yarıyor mu?",
    gloss: [
      { de: "scheinbar", tr: "sözde / görünürde", en: "seemingly (but not)", note: "ama değil" },
      { de: "anscheinend", tr: "görünüşe göre", en: "apparently", note: "muhtemelen öyle" },
      { de: "der Anschein", tr: "görünüş / izlenim", en: "appearance" },
      { de: "die Genauigkeit", tr: "kesinlik", en: "precision" },
      { de: "die Interpretation", tr: "yorum", en: "interpretation" },
      { de: "effizient", tr: "verimli", en: "efficient" },
      { de: "effektiv", tr: "etkili", en: "effective" },
      { de: "vermuten", tr: "tahmin etmek / düşündürmek", en: "to presume / to suggest" },
      { de: "der Rufbus", tr: "çağrı üzerine gelen minibüs", en: "on-demand bus" },
      { de: "der Landkreis", tr: "ilçe", en: "district" },
      { de: "die Bilanz", tr: "bilanço", en: "assessment" },
      { de: "täuschen", tr: "yanıltmak", en: "to deceive" },
      { de: "der Linienbus", tr: "hat otobüsü", en: "scheduled bus" },
      { de: "herausrechnen", tr: "hesaptan çıkarmak", en: "to factor out" },
      { de: "der Vorgänger", tr: "önceki", en: "predecessor" },
      { de: "die Stoßzeit", tr: "yoğun saat", en: "rush hour" },
      { de: "der Kreistag", tr: "ilçe meclisi", en: "district council" },
      { de: "abfragen", tr: "sormak", en: "to ask about" },
      { de: "also", tr: "yani", en: "so" },
      { de: "der Fahrgast", tr: "yolcu", en: "passenger" },
      { de: "geboten", tr: "gerekli", en: "advisable" },
      { de: "per", tr: "ile", en: "by" },
      { de: "rund", tr: "yaklaşık", en: "about, roughly" },
      { de: "die Zahl", tr: "sayı", en: "number" },
    ],
    minutes: 7,
    text:
      "RUFBUS AUF DEM LAND: DIE ERSTE BILANZ\n\n" +
      "Seit einem Jahr fährt im Landkreis Uelzen ein Rufbus: Wer mitfahren will, bestellt ihn per App oder Telefon, und der Kleinbus holt die Fahrgäste an der Haustür ab. Nach zwölf Monaten legt der Landkreis nun eine erste Bilanz vor, und sie fällt anders aus, als der Anschein vermuten lässt.\n\n" +
      "Auf den ersten Blick ist das Angebot scheinbar teuer. Pro Fahrgast kostet eine Fahrt den Landkreis rund 14 Euro, beim alten Linienbus waren es nur 6 Euro. Kritiker sprechen deshalb von Geldverschwendung.\n\n" +
      "Die Zahl täuscht allerdings. Der alte Linienbus fuhr auf vielen Strecken fast leer; genutzt wurde er vor allem von Schülern, und die fahren inzwischen mit einem eigenen Schulbus. Rechnet man den Schulverkehr heraus, lag der Linienbus bei 17 Euro pro Fahrgast. Der Rufbus ist also nicht nur effektiv, weil er die Menschen tatsächlich dorthin bringt, wohin sie wollen, sondern auch effizienter als sein Vorgänger.\n\n" +
      "Die Fahrgastzahlen sind deutlich gestiegen, von 900 auf 2.300 im Monat. Anscheinend sind es vor allem ältere Menschen, die das Angebot nutzen: für Arztbesuche, Einkäufe und Besuche bei Verwandten. Genaue Daten dazu fehlen jedoch, weil die App das Alter nicht abfragt. Bei der Interpretation der Zahlen ist deshalb Vorsicht geboten.\n\n" +
      "Ein Problem bleibt die Wartezeit. Im Durchschnitt dauert es 25 Minuten, bis der Bus kommt, am Montagmorgen oft über eine Stunde. Scheinbar gibt es genug Fahrzeuge, doch zu Stoßzeiten sind alle sechs Busse gleichzeitig unterwegs.\n\n" +
      "Der Kreistag will das Projekt verlängern und zwei weitere Busse anschaffen. Ob sich das rechnet, soll eine unabhängige Untersuchung klären, die mit größerer Genauigkeit erfasst, wer den Rufbus wofür nutzt.",
    questions: [
      {
        text: "Warum ist der Rufbus nur scheinbar teuer?",
        options: [
          "Weil der alte Linienbus ohne Schulverkehr noch teurer war",
          "Weil das Land die Kosten übernimmt",
          "Weil die Fahrgäste mehr bezahlen",
        ],
        answer: 0,
        explain: "Okul taşımacılığı hesaptan çıkarılınca eski otobüs yolcu başına 17 avroya geliyordu.",
      },
      {
        kind: "gapfill",
        text: "___ sind es vor allem ältere Menschen, die das Angebot nutzen.",
        options: [],
        answer: 0,
        accept: ["Anscheinend"],
        explain: "anscheinend: elde ipucu var ve taşıdığı varsayılıyor.",
      },
      {
        text: "Warum muss man am Montagmorgen oft lange warten?",
        options: [
          "Weil die App dann oft ausfällt",
          "Weil zu Stoßzeiten alle Busse gleichzeitig unterwegs sind",
          "Weil montags weniger Fahrer arbeiten",
        ],
        answer: 1,
        explain: "„Scheinbar gibt es genug Fahrzeuge, doch zu Stoßzeiten sind alle sechs Busse gleichzeitig unterwegs.“",
      },
      {
        kind: "short_answer",
        text: "Wie haben sich die Fahrgastzahlen entwickelt?",
        options: [],
        answer: 0,
        accept: [
          "von 900 auf 2.300",
          "deutlich gestiegen",
          "sie sind gestiegen",
          "von 900 auf 2300 im Monat",
        ],
        explain: "„Die Fahrgastzahlen sind deutlich gestiegen, von 900 auf 2.300 im Monat.“",
      },
      {
        text: "Der Landkreis weiß genau, wie alt die Fahrgäste sind.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Genaue Daten dazu fehlen jedoch, weil die App das Alter nicht abfragt.“",
      },
    ],
  },
  {
    id: "c1-u18-r2",
    level: "C1",
    skill: "reading",
    unit: 18,
    title: "Drei Nachrichten zu einem Ausfall",
    genre: "report",
    intro: "Aynı sunucu kesintisi hakkında üç metin: ekibe, müşterilere ve basına. Kim neyi öğreniyor?",
    gloss: [
      { de: "rund", tr: "yaklaşık", en: "about, roughly" },
      { de: "erweitern", tr: "genişletmek", en: "to expand" },
      { de: "der Ausfall", tr: "kesinti", en: "outage" },
      { de: "das Speicherleck", tr: "bellek sızıntısı", en: "memory leak" },
      { de: "einspielen", tr: "yüklemek", en: "to install" },
      { de: "die Nachbesprechung", tr: "değerlendirme toplantısı", en: "debriefing" },
      { de: "sichern", tr: "yedeklemek", en: "to back up" },
      { de: "fehlerhaft", tr: "hatalı", en: "faulty" },
      { de: "überlasten", tr: "aşırı yüklemek", en: "to overload" },
      { de: "der Ausgleich", tr: "telafi", en: "compensation" },
      { de: "die Grundgebühr", tr: "temel ücret", en: "base fee" },
      { de: "gutschreiben", tr: "hesaba geçirmek", en: "to credit" },
      { de: "uneingeschränkt", tr: "kısıtlamasız", en: "without restriction" },
      { de: "gewährleistet", tr: "güvence altında", en: "guaranteed" },
      { de: "die Information", tr: "bilgi", en: "information" },
      { de: "innerhalb", tr: "içinde", en: "within" },
    ],
    minutes: 7,
    text:
      "DREI NACHRICHTEN ZUM AUSFALL AM DIENSTAG\n\n" +
      "1. Interne Meldung im Technikkanal, Dienstag, 13:20 Uhr\n" +
      "Ausfall Node 3, 09:12 bis 13:04 Uhr. Ursache: Speicherleck im Cache-Dienst nach dem Update vom Montagabend. Korrektur eingespielt, Überwachung angepasst. Betroffen rund 2.000 Nutzer. Nachbesprechung Mittwoch 10 Uhr, Raum 2. Bitte Logs bis dahin sichern.\n\n" +
      "2. E-Mail an die betroffenen Kundinnen und Kunden, Dienstag, 16:00 Uhr\n" +
      "Liebe Kundin, lieber Kunde,\n" +
      "am Dienstagvormittag war unser Dienst rund vier Stunden nicht erreichbar. Die Ursache lag bei uns: Ein fehlerhaftes Update hatte einen Teil unserer Server überlastet. Wir haben den Fehler behoben und die Überwachung erweitert, damit sich so etwas nicht wiederholt. Ihre Daten waren zu keinem Zeitpunkt in Gefahr. Für die Unterbrechung entschuldigen wir uns. Als Ausgleich schreiben wir Ihnen einen Monat Grundgebühr gut; Sie müssen dafür nichts tun.\n" +
      "Ihr Kundenservice\n\n" +
      "3. Pressemitteilung, Mittwoch, 9:00 Uhr\n" +
      "Cloudia stellt Dienst nach kurzer Störung vollständig wieder her. Nach einer technischen Störung am Dienstagvormittag, von der rund zwei Prozent der Nutzer betroffen waren, steht der Dienst von Cloudia wieder uneingeschränkt zur Verfügung. Die Ursache wurde innerhalb weniger Stunden gefunden und behoben. „Die Sicherheit der Kundendaten war jederzeit gewährleistet“, sagt Geschäftsführerin Anja Lorenz. Das Unternehmen hat zusätzliche Kontrollen für künftige Updates eingeführt.",
    questions: [
      {
        text: "Wie lange war der Dienst nicht erreichbar?",
        options: [
          "Einen ganzen Tag",
          "Rund vier Stunden",
          "Wenige Minuten",
        ],
        answer: 1,
        explain: "İç bildirime göre kesinti 09:12 ile 13:04 arasında, yani yaklaşık dört saat sürdü.",
      },
      {
        kind: "gapfill",
        text: "Als Ausgleich schreiben wir Ihnen einen Monat ___ gut.",
        options: [],
        answer: 0,
        accept: ["Grundgebühr"],
        explain: "Müşterilere telafi olarak bir aylık temel ücret hesaplarına geçiriliyor.",
      },
      {
        text: "Welche Information steht nur in der internen Meldung?",
        options: [
          "Dass die Daten sicher waren",
          "Der Termin der Nachbesprechung",
          "Eine Entschuldigung",
        ],
        answer: 1,
        explain: "„Nachbesprechung Mittwoch 10 Uhr, Raum 2.“",
      },
      {
        kind: "short_answer",
        text: "Was war die Ursache des Ausfalls?",
        options: [],
        answer: 0,
        accept: [
          "ein fehlerhaftes Update",
          "ein Speicherleck",
          "Speicherleck nach einem Update",
          "das Update vom Montagabend",
        ],
        explain: "Pazartesi akşamki güncelleme önbellek hizmetinde bellek sızıntısına yol açtı.",
      },
      {
        kind: "short_answer",
        text: "Was hat das Unternehmen laut Pressemitteilung eingeführt?",
        options: [],
        answer: 0,
        accept: [
          "zusätzliche Kontrollen",
          "zusätzliche Kontrollen für Updates",
          "mehr Kontrollen",
        ],
        explain: "„Das Unternehmen hat zusätzliche Kontrollen für künftige Updates eingeführt.“",
      },
    ],
  },
  {
    id: "c1-u18-l1",
    level: "C1",
    skill: "listening",
    unit: 18,
    title: "Als wäre nichts geschehen",
    genre: "dialogue",
    intro: "als ob / als wäre: gerçek dışını işaretlemek.",
    gloss: [
      { de: "verdrängen", tr: "bastırmak", en: "to suppress" },
      { de: "die Illusion", tr: "yanılsama", en: "illusion" },
      { de: "aufrechterhalten", tr: "sürdürmek", en: "to maintain" },
      { de: "die Normalität", tr: "olağanlık", en: "normality" },
      { de: "der Bruch", tr: "kopuş / kırılma", en: "rupture" },
      { de: "die Unsicherheit", tr: "belirsizlik", en: "uncertainty" },
      { de: "die Emotion", tr: "duygu", en: "emotion" },
      { de: "die Sitzung", tr: "oturum", en: "session" },
      { de: "genau", tr: "tam olarak", en: "exactly" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Sascha", text: "Er kam heute rein und hat gegrüßt, als wäre nichts geschehen." },
      { speaker: "Miriam", text: "Nach der Sitzung letzte Woche?" },
      { speaker: "Sascha", text: "Ja. Er hat mich vor allen unterbrochen, dreimal. Und heute: „Morgen, alles gut?“" },
      { speaker: "Miriam", text: "Vielleicht hat er es verdrängt. Manche merken es wirklich nicht." },
      { speaker: "Sascha", text: "Das macht es nicht besser. Und es hält die Illusion aufrecht, dass nichts passiert ist." },
      { speaker: "Miriam", text: "Nein. Aber es ändert, was du tun kannst. Wenn er es nicht gemerkt hat, hilft ein Gespräch. Wenn er so tut, als ob, hilft es nicht." },
      { speaker: "Sascha", text: "Wie unterscheide ich das?" },
      { speaker: "Miriam", text: "An der Reaktion. Sag ihm sachlich, was passiert ist. Wer es verdrängt hat, erschrickt. Wer die Normalität bewusst aufrechterhält, weicht aus." },
      { speaker: "Sascha", text: "Und wenn er ausweicht?" },
      { speaker: "Miriam", text: "Dann weißt du, woran du bist, und das ist mehr wert als eine Entschuldigung, die keine ist." },
      { speaker: "Sascha", text: "Ich will keinen Bruch. Ich will nur, dass es benannt wird." },
      { speaker: "Miriam", text: "Dann sag genau das. Ohne Emotion in der Stimme, mit dem Satz, den du dir vorher zurechtgelegt hast." },
      { speaker: "Sascha", text: "Ich hasse diese Unsicherheit." },
      { speaker: "Miriam", text: "Die verschwindet erst, wenn du fragst. Solange du es dir selbst erklärst, erklärst du es dir immer schlechter." },
    ],
    questions: [
      {
        text: "Was unterscheidet laut Miriam Verdrängung vom bewussten Tun-als-ob?",
        options: [
          "Die Wortwahl",
          "Die Reaktion: Erschrecken gegen Ausweichen",
          "Die Zeit, die vergangen ist",
        ],
        answer: 1,
        explain: "Bunu ancak konuşarak ayırt edebiliyorsun.",
      },
      {
        kind: "gapfill",
        text: "Er hat gegrüßt, als ___ nichts geschehen.",
        options: [],
        answer: 0,
        accept: ["wäre"],
        explain: "als + Konjunktiv II, fiil hemen als'ın ardında.",
      },
      {
        text: "Warum ist Ausweichen laut Miriam trotzdem nützlich?",
        options: [
          "Weil es eine Entschuldigung ist",
          "Weil man dann weiß, woran man ist",
          "Weil es das Problem löst",
        ],
        answer: 1,
        explain: "Sahte bir özürden daha değerli bilgi.",
      },
      {
        kind: "dictation",
        text: "Miriam'ın kendi kendine açıklamanın neden işe yaramadığını söylediği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "Solange du es dir selbst erklärst, erklärst du es dir immer schlechter.",
          "Solange du es dir selbst erklärst, erklärst du es dir immer schlechter",
        ],
        explain: "Belirsizlik ancak sorulunca dağılıyor.",
      },
    ],
  },
  {
    id: "c1-u18-l2",
    level: "C1",
    skill: "listening",
    unit: 18,
    title: "Ungeachtet aller Einwände",
    genre: "meeting",
    intro: "İmtiyaz bağlaçları: kabul et, ama iddianı bırakma.",
    gloss: [
      { de: "ungeachtet", tr: "-e rağmen", en: "notwithstanding" },
      { de: "nichtsdestotrotz", tr: "yine de", en: "nonetheless" },
      { de: "einschränken", tr: "sınırlamak", en: "to qualify" },
      { de: "abschwächen", tr: "yumuşatmak", en: "to soften" },
      { de: "die Gegenposition", tr: "karşı görüş", en: "counter-position" },
      { de: "beanspruchen", tr: "talep etmek", en: "to claim" },
      { de: "die Übereinkunft", tr: "mutabakat", en: "agreement" },
      { de: "genau", tr: "tam olarak", en: "exactly" },
      { de: "also", tr: "yani", en: "so" },
      { de: "die Vertragsstrafe", tr: "cezai şart", en: "contractual penalty" },
      { de: "schiefgehen", tr: "ters gitmek", en: "to go wrong" },
      { de: "formulieren", tr: "ifade etmek", en: "to phrase" },
      { de: "genügen", tr: "yetmek", en: "to be enough" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Frau Busch", text: "Ungeachtet der Einwände aus der Technik halte ich am Termin fest." },
      { speaker: "Herr Weiß", text: "Sie haben die Einwände gehört und ändern nichts?" },
      { speaker: "Frau Busch", text: "Ich habe sie gehört und für berechtigt gehalten. Das ist der Unterschied zwischen „ungeachtet“ und „trotz Ihrer falschen Bedenken“." },
      { speaker: "Herr Weiß", text: "Das ist ein feiner Unterschied." },
      { speaker: "Frau Busch", text: "Es ist der ganze Unterschied. Ich schwäche Ihre Position nicht ab, ich stelle sie nur hinter eine andere." },
      { speaker: "Herr Weiß", text: "Obgleich Sie damit das Risiko übernehmen." },
      { speaker: "Frau Busch", text: "Genau deshalb steht mein Name unter der Entscheidung und nicht Ihrer." },
      { speaker: "Herr Weiß", text: "Sie beanspruchen also, meine Gegenposition zu kennen und trotzdem anders zu entscheiden." },
      { speaker: "Frau Busch", text: "Ja. Genau das ist meine Aufgabe." },
      { speaker: "Herr Weiß", text: "Und welche Position geht vor?" },
      { speaker: "Frau Busch", text: "Die Vertragsstrafe. Verschieben wir um drei Wochen, zahlen wir vierzigtausend. Nichtsdestotrotz nehme ich Ihre Bedenken ins Protokoll auf." },
      { speaker: "Herr Weiß", text: "Was bringt mir das Protokoll?" },
      { speaker: "Frau Busch", text: "Wenn es schiefgeht, war es meine Entscheidung, nicht Ihr Versäumnis. Das ist keine Höflichkeit, das ist die Verteilung der Verantwortung." },
      { speaker: "Herr Weiß", text: "Dann brauche ich eine Einschränkung darin: Der Test der Migration bleibt unvollständig." },
      { speaker: "Frau Busch", text: "Einverstanden. Formulieren Sie den Satz, ich unterschreibe. Damit haben wir keine Übereinkunft in der Sache, aber eine über das Verfahren — und das genügt heute." },
    ],
    questions: [
      {
        text: "Worin liegt für Frau Busch der Unterschied bei „ungeachtet“?",
        options: [
          "Es ist höflicher formuliert",
          "Die Einwände werden als berechtigt anerkannt, nur nachgeordnet",
          "Es bedeutet, dass sie die Einwände nicht kennt",
        ],
        answer: 1,
        explain: "„Ich schwäche Ihre Position nicht ab, ich stelle sie nur hinter eine andere.“",
      },
      {
        kind: "gapfill",
        text: "___ der Einwände aus der Technik halte ich am Termin fest.",
        options: [],
        answer: 0,
        accept: ["Ungeachtet"],
        explain: "ungeachtet + Genitiv; edat, bağlaç değil.",
      },
      {
        text: "Wozu dient die Aufnahme ins Protokoll?",
        options: [
          "Zur Höflichkeit",
          "Zur Verteilung der Verantwortung",
          "Zur Vertragsstrafe",
        ],
        answer: 1,
        explain: "Ters giderse karar onun, ihmal Herr Weiß'ın değil.",
      },
      {
        kind: "short_answer",
        text: "Worüber besteht am Ende Einigkeit?",
        options: [],
        answer: 0,
        accept: [
          "über das Verfahren",
          "über das Verfahren, nicht in der Sache",
          "keine Übereinkunft in der Sache, aber über das Verfahren",
        ],
        explain: "Usulde mutabakat, esasta değil — ve bugünlük yetiyor.",
      },
    ],
  },
  {
    id: "c1-u18-w1",
    level: "C1",
    skill: "writing",
    unit: 18,
    title: "Aus dem Teamalltag",
    genre: "grammar",
    intro: "Görünüş bildiren iki zarf, imtiyaz edatı ve gerçek dışı kıyas.",
    gloss: [
      { de: "anscheinend", tr: "görünüşe göre", en: "apparently" },
      { de: "scheinbar", tr: "sözde", en: "seemingly (but not)" },
      { de: "ungeachtet", tr: "-e rağmen", en: "notwithstanding" },
      { de: "nichtsdestotrotz", tr: "yine de", en: "nonetheless" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Görünüşe göre hasta.",
        answer: "Anscheinend ist er krank",
        hint: "Elde ipucu var (sabahtan beri kimse ondan haber almadı) ve muhtemelen doğru: anscheinend.",
      },
      {
        kind: "build",
        tr: "Teknik birimden gelen itirazlara rağmen tarihte ısrar ediyorum.",
        answer: "Ungeachtet der Einwände aus der Technik halte ich am Termin fest",
        hint: "ungeachtet Genitiv ister; ardından ana cümle fiille başlar.",
      },
      {
        kind: "build",
        tr: "Hiçbir şey olmamış gibi selam verdi.",
        answer: "Er hat gegrüßt, als wäre nichts geschehen",
        hint: "als + Konjunktiv II; fiil doğrudan als'ın ardında.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: sözcük seçimi kastedilmeyen bir suçlama taşıyor.",
        source: "Der Mitarbeiter war scheinbar krank; wir haben ihn deshalb entschuldigt.",
        answer: "Der Mitarbeiter war anscheinend krank; wir haben ihn deshalb entschuldigt.",
        alternatives: [
          "Der Mitarbeiter war anscheinend krank; wir haben ihn deshalb entschuldigt",
          "Der Mitarbeiter war anscheinend krank, wir haben ihn deshalb entschuldigt.",
        ],
        why: "„scheinbar“ hastalığın numara olduğunu ima ediyor, ikinci yarıysa mazur gördüğünü söylüyor — cümle kendi içinde çelişiyor. Türkçede ayrım zaten var (sözde / görünüşe göre); tuzak scheinbar'ın biçim olarak „görünüş“e benzemesi.",
      },
    ],
  },
  {
    id: "c1-u18-w2",
    level: "C1",
    skill: "writing",
    unit: 18,
    title: "Eine Störung, zwei Meldungen",
    genre: "formal",
    intro: "Bir arıza, iki metin: ekip içi ve müşteriye.",
    gloss: [
      { de: "die Textsorte", tr: "metin türü", en: "text type" },
      { de: "der Adressat", tr: "muhatap", en: "addressee" },
      { de: "umschreiben", tr: "yeniden yazmak", en: "to rewrite" },
      { de: "die Tonlage", tr: "ton", en: "tone" },
      { de: "einschränken", tr: "sınırlamak", en: "to qualify" },
      { de: "die Schwelle", tr: "eşik", en: "threshold" },
      { de: "rund", tr: "yaklaşık", en: "about" },
      { de: "der Datenverlust", tr: "veri kaybı", en: "data loss" },
      { de: "ergänzen", tr: "tamamlamak", en: "to complete" },
      { de: "offen", tr: "açık", en: "open" },
      { de: "mehrere", tr: "birden fazla", en: "several" },
      { de: "verlobt", tr: "nişanlı", en: "engaged" },
      { de: "solche", tr: "böyle", en: "such" },
      { de: "vorsorglich", tr: "tedbiren", en: "as a precaution" },
      { de: "gesenkt", tr: "düşürülmüş", en: "lowered" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "reply",
        prompt:
          "Aşağıdaki olay notundan İKİ ayrı metin yaz. (A) Ekip kanalına kısa iç bildirim — eksiltili, teknik, özür yok. (B) Etkilenen müşterilere bildirim — tam cümleler, sorumluluk adlandırılmış, teknik ayrıntı yok, ne yapıldığı ve tekrar etmemesi için ne değiştiği açık. İkisinde de aynı olguları ver; uydurma bilgi ekleme, olanı da gizleme.",
        stimulus:
          "OLAY NOTU (ham)\n\n" +
          "12.03., 09.12–13.04 (3 sa 52 dk). Node 3 kaynaklı kesinti.\n" +
          "Neden: cache servisinde bellek sızıntısı, üç haftadır birikiyormuş, izleme eşiği yanlış ayarlıymış.\n" +
          "Etki: ~2.000 kullanıcı giriş yapamadı. Veri kaybı YOK.\n" +
          "Yapılan: düzeltme yayınlandı, izleme eşiği düşürüldü, haftalık bellek raporu eklendi.\n" +
          "Açık kalan: aynı sızıntı Node 5'te de olabilir, kontrol 15.03.'te.",
        checklist: [
          "İç bildirim eksiltili ve olgusal mı, özür içermiyor mu?",
          "Müşteri bildirimi tam cümlelerle mi, teknik terimsiz mi?",
          "Sorumluluk müşteri metninde açıkça üstlenildi mi?",
          "Veri kaybı olmadığı söylendi, açık kalan nokta gizlenmedi mi?",
        ],
        minWords: 110,
        phrases: [
          { de: "Fix eingespielt, Monitoring angepasst.", tr: "düzeltme yayınlandı, izleme ayarlandı", en: "fix deployed, monitoring adjusted" },
          { de: "Die Ursache lag bei uns.", tr: "sebep bizdeydi", en: "the cause was on our side" },
          { de: "Kundendaten waren zu keinem Zeitpunkt betroffen.", tr: "müşteri verileri hiçbir anda etkilenmedi", en: "customer data was never affected" },
        ],
        sample:
          "A — INTERN (#incidents)\n\n" +
          "Ausfall Node 3, 12.03., 09:12–13:04. Ursache: Speicherleck im Cache-Dienst, Aufbau über drei Wochen, Monitoring-Schwelle zu hoch gesetzt. Rund 2.000 Nutzer ohne Login, kein Datenverlust.\n" +
          "Fix eingespielt, Schwelle gesenkt, wöchentlicher Speicherreport ergänzt.\n" +
          "Offen: gleiches Leck auf Node 5 möglich — Prüfung am 15.03.\n\n" +
          "B — AN DIE KUNDEN\n\n" +
          "Betreff: Störung am 12. März — was passiert ist\n\n" +
          "Sehr geehrte Kundinnen und Kunden,\n\n" +
          "am 12. März war die Anmeldung bei unserem Dienst zwischen 9:12 und 13:04 Uhr nicht möglich. Etwa 2.000 Nutzerinnen und Nutzer waren betroffen.\n\n" +
          "Die Ursache lag bei uns: Ein Fehler in einem internen Dienst hatte sich über mehrere Wochen aufgebaut, ohne dass unsere Überwachung rechtzeitig Alarm geschlagen hat. Kundendaten waren zu keinem Zeitpunkt betroffen, und es sind keine Daten verloren gegangen.\n\n" +
          "Wir haben den Fehler behoben und unsere Überwachung so umgestellt, dass ein solcher Aufbau künftig früh auffällt. Eine weitere Komponente prüfen wir am 15. März vorsorglich auf denselben Fehler.\n\n" +
          "Für die Unterbrechung entschuldigen wir uns.\n\n" +
          "Mit freundlichen Grüßen\nIhr Team von Aventis Digital",
      },
    ],
  },
];
