import type { SkillExercise } from "../../types";

/**
 * DE · B1 — Beceriler kütüphanesi, parti 12.
 *
 * B1 hücresini YİRMİYE tamamlayan partilerden biri. Kurallar ve emsal:
 * `de-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 12 spor ve hareket hattı: yetişkin yaşta yüzme öğrenen birinin blogu,
 * tırmanma salonunda güvenlik anlatımı, kulüp bülteni için turnuva haberi.
 * Dil bilgisi zaman bağlaçları — bevor, während, bis, seitdem, sobald.
 */
export const deB1P12: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b1-lib-r12",
    course: "de",
    level: "B1",
    skill: "reading",
    title: "Schwimmen lernen mit achtunddreißig",
    genre: "blog",
    intro: "Bir blog yazısı: yetişkin yaşta yüzme öğrenen biri neden bu kadar beklemiş, en çok nerede zorlanmış, bugün ne değişti.",
    gloss: [
      { de: "zugeben", tr: "itiraf etmek", en: "to admit" },
      { de: "peinlich", tr: "utanç verici", en: "embarrassing" },
      { de: "ausatmen", tr: "nefes vermek", en: "to breathe out" },
      { de: "scheitern", tr: "başarısız olmak", en: "to fail" },
      { de: "das Becken", tr: "havuz", en: "pool" },
      { de: "heimlich", tr: "gizlice", en: "secretly" },
    ],
    minutes: 6,
    text:
      "Schwimmen lernen mit achtunddreißig\n\n" +
      "Ich gebe es zu: Bis letzten Herbst konnte ich nicht schwimmen. Als Kind hatte ich nie Unterricht, " +
      "und später war es mir peinlich. Im Urlaub bin ich immer nur bis zum Bauch ins Meer gegangen und " +
      "habe erzählt, dass mir das Wasser zu kalt ist.\n\n" +
      "Dann hat unser Hallenbad einen Kurs nur für Erwachsene angeboten: zehn Abende, acht Leute, eine " +
      "sehr ruhige Trainerin. In der ersten Stunde haben wir nur gelernt, unter Wasser auszuatmen. " +
      "Das klingt lächerlich, aber genau daran wäre ich fast gescheitert. Sobald mein Gesicht nass war, " +
      "bekam ich Panik.\n\n" +
      "Die Trainerin hat nie Druck gemacht. Während die anderen schon ihre Bahnen schwammen, durfte ich " +
      "am Rand bleiben, bis ich mich sicher fühlte. In der sechsten Woche bin ich zum ersten Mal allein " +
      "durch das ganze Becken geschwommen. Danach habe ich im Auto geweint, ehrlich.\n\n" +
      "Seitdem gehe ich jeden Sonntag früh ins Bad, bevor es voll wird. Schnell bin ich nicht, und " +
      "vom Rand springe ich immer noch nicht. Aber ich habe keine Angst mehr vor dem Wasser.\n\n" +
      "Wenn ihr auch heimlich nicht schwimmen könnt: Ihr seid nicht allein. In meinem Kurs war die " +
      "Jüngste zweiundzwanzig, der Älteste einundsiebzig.",
    questions: [
      {
        text: "Warum hat die Autorin so lange keinen Kurs gemacht?",
        options: [
          "Es war ihr peinlich.",
          "Es gab kein Hallenbad in der Nähe.",
          "Sie hatte im Urlaub keine Zeit.",
        ],
        answer: 0,
        explain: "„Als Kind hatte ich nie Unterricht, und später war es mir peinlich.“",
      },
      {
        text: "Was war am Anfang das größte Problem?",
        options: ["das Tempo der anderen", "das Gesicht im Wasser", "die kalte Halle"],
        answer: 1,
        explain: "„Sobald mein Gesicht nass war, bekam ich Panik.“ Su altında nefes vermek bile zordu.",
      },
      {
        kind: "truefalse",
        text: "Die Autorin durfte am Rand bleiben, bis sie sich sicher fühlte.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Eğitmen baskı yapmamış; öteki katılımcılar yüzerken o kenarda kalabilmiş.",
      },
      {
        kind: "gapfill",
        text: "In der ___ Woche ist sie zum ersten Mal allein durch das Becken geschwommen.",
        options: [],
        answer: 0,
        accept: ["sechsten", "6."],
        explain: "„In der sechsten Woche bin ich zum ersten Mal allein durch das ganze Becken geschwommen.“",
      },
      {
        kind: "short_answer",
        text: "Wann geht die Autorin heute schwimmen?",
        options: [],
        answer: 0,
        accept: ["jeden Sonntag früh", "sonntags früh", "am Sonntag früh", "sonntags", "jeden Sonntag", "am Sonntag", "sonntagmorgens", "am Sonntagmorgen", "jeden Sonntagmorgen"],
        explain: "„Seitdem gehe ich jeden Sonntag früh ins Bad, bevor es voll wird.“",
      },
      {
        text: "Was will die Autorin mit dem letzten Absatz sagen?",
        options: [
          "Der Kurs war vor allem für Rentner.",
          "Man sollte schon als Kind schwimmen lernen.",
          "Viele Erwachsene haben dasselbe Problem.",
        ],
        answer: 2,
        explain: "„Ihr seid nicht allein“ — kursta yirmi iki yaşından yetmiş bir yaşına kadar herkes vardı.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b1-lib-l12",
    course: "de",
    level: "B1",
    skill: "listening",
    title: "Einweisung in der Kletterhalle",
    genre: "guide",
    intro: "Tırmanma salonunda yeni gelenlere güvenlik anlatımı: hangi üç kural var, ne zaman tek başına tırmanılabilir.",
    gloss: [
      { de: "die Einweisung", tr: "ön eğitim", en: "induction" },
      { de: "der Knoten", tr: "düğüm", en: "knot" },
      { de: "prüfen", tr: "kontrol etmek", en: "to check" },
      { de: "selbstverständlich", tr: "apaçık", en: "obvious" },
      { de: "der Boden", tr: "zemin", en: "floor" },
      { de: "der Unfall", tr: "kaza", en: "accident" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Herr Weber", text: "Guten Abend und willkommen zur Einweisung. Bevor jemand an die Wand geht, erkläre ich drei Regeln. Das dauert zehn Minuten, und ohne diese Regeln klettert hier niemand." },
      { speaker: "Herr Weber", text: "Erstens der Knoten. Jeder prüft den Knoten seines Partners, bevor er losklettert. Jedes Mal, auch wenn ihr seit Jahren zusammen klettert." },
      { speaker: "Teilnehmerin", text: "Und wenn ich nicht sicher bin, ob der Knoten richtig ist?" },
      { speaker: "Herr Weber", text: "Dann ruft ihr mich. Das ist keine dumme Frage, sondern die wichtigste des ganzen Abends." },
      { speaker: "Herr Weber", text: "Zweitens: Während jemand klettert, schaut der Partner nach oben und nicht aufs Handy. Das klingt selbstverständlich, ist aber der häufigste Fehler." },
      { speaker: "Herr Weber", text: "Drittens: Unter der Wand bleibt der Boden frei. Taschen und Flaschen kommen in die Regale an der Tür." },
      { speaker: "Teilnehmer", text: "Dürfen wir heute schon allein klettern?" },
      { speaker: "Herr Weber", text: "Noch nicht. Ihr klettert mit mir, bis ihr am Ende die kleine Prüfung bestanden habt. Sobald ihr die Karte habt, dürft ihr jederzeit kommen." },
      { speaker: "Herr Weber", text: "Die Karte gilt ein Jahr. Seitdem wir das so machen, hatten wir keinen einzigen ernsten Unfall." },
    ],
    questions: [
      {
        text: "Was passiert, bevor jemand an die Wand geht?",
        options: [
          "Alle zahlen zuerst den Eintritt.",
          "Herr Weber erklärt drei Regeln.",
          "Jeder klettert eine kurze Probe.",
        ],
        answer: 1,
        explain: "„Bevor jemand an die Wand geht, erkläre ich drei Regeln.“",
      },
      {
        text: "Was ist laut Herrn Weber der häufigste Fehler?",
        options: [
          "Der Partner schaut nicht nach oben.",
          "Der Knoten ist zu locker.",
          "Die Flaschen stehen im Regal.",
        ],
        answer: 0,
        explain: "Tırmanan varken partner telefona bakıyor: „ist aber der häufigste Fehler“.",
      },
      {
        kind: "truefalse",
        text: "Auch erfahrene Partner sollen den Knoten jedes Mal prüfen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Jedes Mal, auch wenn ihr seit Jahren zusammen klettert.“",
      },
      {
        kind: "gapfill",
        text: "Taschen und Flaschen kommen in die ___ an der Tür.",
        options: [],
        answer: 0,
        accept: ["Regale"],
        explain: "Duvarın altı boş kalmalı: „Taschen und Flaschen kommen in die Regale an der Tür.“",
      },
      {
        kind: "short_answer",
        text: "Wie lange gilt die Karte?",
        options: [],
        answer: 0,
        accept: ["ein Jahr", "1 Jahr", "ein ganzes Jahr", "ein Jahr lang"],
        explain: "„Die Karte gilt ein Jahr.“",
      },
      {
        text: "Wann dürfen die Teilnehmer allein klettern?",
        options: [
          "gleich nach der Einweisung",
          "erst im nächsten Monat",
          "wenn sie die Prüfung bestanden haben",
        ],
        answer: 2,
        explain: "„Ihr klettert mit mir, bis ihr am Ende die kleine Prüfung bestanden habt.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b1-lib-w12",
    course: "de",
    level: "B1",
    skill: "writing",
    title: "Bericht für den Vereinsnewsletter",
    genre: "report",
    intro: "Spor kulübünün bültenine yazıyorsun: önce iki cümle kur, sonra çocuk takımının ilk turnuvası hakkında kısa bir haber yaz.",
    gloss: [
      { de: "das Turnier", tr: "turnuva", en: "tournament" },
      { de: "die Mannschaft", tr: "takım", en: "team" },
      { de: "aufgeregt", tr: "heyecanlı", en: "excited" },
      { de: "das Tor", tr: "gol", en: "goal" },
      { de: "der Trainer", tr: "antrenör", en: "coach" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Maç başlamadan önce çocuklar çok heyecanlıydı.",
        answer: "Bevor das Spiel begann, waren die Kinder sehr aufgeregt.",
        alternatives: ["Die Kinder waren sehr aufgeregt, bevor das Spiel begann."],
        hint: "„bevor“ yan cümle kurar ve fiil sona gider; yan cümle başta olunca ana cümle fiille başlar.",
      },
      {
        kind: "build",
        tr: "İlk gol atılır atılmaz herkes rahatladı.",
        answer: "Sobald das erste Tor gefallen war, entspannten sich alle.",
        alternatives: ["Alle entspannten sich, sobald das erste Tor gefallen war."],
        hint: "„sobald“ Türkçedeki „-ir -mez“dir; önce olan olay Plusquamperfekt'te ve fiil sonda.",
      },
      {
        kind: "free",
        prompt:
          "Kulüp bülteni için bir haber yaz: turnuvanın ne zaman ve nerede olduğunu söyle, takımın nasıl oynadığını anlat, akılda kalan bir anı yaz, yardım edenlere teşekkür et ve bir sonraki etkinliği duyur.",
        checklist: [
          "Tarihi, yeri ve takımı yaz",
          "Maçların gidişini kısaca anlat",
          "Akılda kalan bir anı ekle",
          "Teşekkür et ve sonraki etkinliği duyur",
        ],
        minWords: 90,
        phrases: [
          { de: "Am vergangenen Samstag fand … statt.", tr: "Geçen cumartesi … yapıldı.", en: "Last Saturday … took place." },
          { de: "Unsere Mannschaft hat … von … Spielen gewonnen.", tr: "Takımımız … maçtan …'ini kazandı.", en: "Our team won … of … matches." },
          { de: "In Erinnerung bleibt vor allem …", tr: "Akılda en çok … kalıyor.", en: "What will be remembered above all is …" },
          { de: "Ein großes Dankeschön geht an …", tr: "…'e çok teşekkür ederiz.", en: "A big thank you goes to …" },
          { de: "Das nächste … findet am … statt.", tr: "Bir sonraki … …'de yapılacak.", en: "The next … will take place on …" },
        ],
        sample:
          "Am vergangenen Samstag fand in der Sporthalle Nord das erste Turnier unserer neuen " +
          "Kindermannschaft statt. Acht Teams aus der Umgebung waren dabei, unsere Spielerinnen und " +
          "Spieler sind zwischen sieben und neun Jahre alt. Bevor das erste Spiel begann, waren die Kinder sehr " +
          "aufgeregt, und zwei wollten zuerst gar nicht auf das Feld. Sobald das erste Tor gefallen war, " +
          "entspannten sich alle. Unsere Mannschaft hat zwei von fünf Spielen gewonnen und am Ende den " +
          "sechsten Platz erreicht. In Erinnerung bleibt vor allem der Moment, als Lina im letzten Spiel " +
          "den Ball aus der Ecke ins Tor geschossen hat. Ein großes Dankeschön geht an unseren Trainer " +
          "Herrn Yilmaz und an alle Eltern, die Kuchen gebacken haben. Das nächste Turnier findet am " +
          "14. November in Weststadt statt.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b1-lib-s12",
    course: "de",
    level: "B1",
    skill: "speaking",
    title: "Sollte Sport in der Schule benotet werden?",
    genre: "monologue",
    intro: "Bir dakikaya yakın tek başına konuşacaksın: bir okul kuralını tart ve bir alternatif öner.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Okulda beden eğitimi notla değerlendirilmeli mi? Görüşünü söyle, kendi okul yıllarından bir örnek ver ve not yerine ne yapılabileceğini öner.",
      bulletsTr: [
        "Görüşünü tek cümleyle söyle",
        "Okul yıllarından bir örnek anlat",
        "Karşı tarafın en güçlü argümanını söyle",
        "Nota bir alternatif öner",
      ],
      targets: [
        { de: "Ich halte es für problematisch, dass …", tr: "…'i sorunlu buluyorum" },
        { de: "Solange …, ist eine Note ungerecht.", tr: "… olduğu sürece not adaletsizdir." },
        { de: "Befürworter sagen natürlich, dass …", tr: "Destekleyenler elbette … diyor" },
        { de: "Statt einer Note könnte man …", tr: "Not yerine … yapılabilir" },
      ],
      minSeconds: 40,
      maxSeconds: 80,
      sampleDe:
        "Ich halte es für problematisch, dass Sport genauso benotet wird wie Mathematik. " +
        "In meiner Schulzeit hat ein Mitschüler, der in allen Fächern sehr gut war, jedes Jahr eine Vier " +
        "in Sport bekommen, obwohl er sich wirklich angestrengt hat. Er war einfach klein und langsam, " +
        "und das konnte er nicht ändern. Solange die Note vor allem den Körper misst und nicht die Mühe, " +
        "ist sie ungerecht. Befürworter sagen natürlich, dass ohne Note niemand mehr mitmacht. " +
        "Das habe ich im freiwilligen Volleyballkurs anders erlebt: Dort gab es keine Noten, und trotzdem " +
        "war die Halle jede Woche voll. Statt einer Note könnte man bewerten, ob jemand regelmäßig kommt, " +
        "fair spielt und sich verbessert. Dann hätte auch der langsamste Schüler eine echte Chance.",
      rubricHint:
        "Somut bir örnek ve uygulanabilir bir alternatif beklenir; „solange“, „obwohl“ ve Konjunktiv II („könnte“, „hätte“) kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b1-lib-g12",
    course: "de",
    level: "B1",
    skill: "grammar",
    title: "Bevor das Training anfängt",
    genre: "grammar",
    intro: "Olayların zaman ilişkisini beş yan cümle bağlacıyla kurarsın: önce, sırasında, -e kadar, -den beri ve -ir -mez.",
    focus: "Zaman bağlaçları: bevor, während, bis, seit(dem), sobald",
    gloss: [
      { de: "das Training", tr: "antrenman", en: "training" },
      { de: "aufwärmen", tr: "ısınmak", en: "to warm up" },
      { de: "duschen", tr: "duş almak", en: "to shower" },
      { de: "die Halle", tr: "salon", en: "hall" },
      { de: "anfangen", tr: "başlamak", en: "to start" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "Önce ve sırasında: bevor, während",
        tr: "„bevor“ ana cümledeki olaydan SONRA gelen olayı taşır: Türkçedeki „-meden önce“. „während“ iki olayın aynı anda olduğunu söyler: „-irken“. İkisi de yan cümle bağlacıdır; çekimli fiil sona gider.",
        examples: [
          { de: "Bevor das Training anfängt, wärmen wir uns auf.", tr: "Antrenman başlamadan önce ısınıyoruz.", note: "bevor: -meden önce" },
          { de: "Während die Kinder schwimmen, trinken die Eltern Kaffee.", tr: "Çocuklar yüzerken ebeveynler kahve içiyor.", note: "während: -irken" },
          { de: "Ich dusche immer, bevor ich nach Hause fahre.", tr: "Eve gitmeden önce hep duş alırım.", note: "fahre sonda" },
        ],
      },
      {
        heading: "Sınır ve başlangıç: bis, seit(dem)",
        tr: "„bis“ bir olayın NE ZAMANA kadar sürdüğünü, „seit“ ya da „seitdem“ bir durumun NE ZAMANDAN beri sürdüğünü söyler. „seitdem“ cümlesinde fiil çoğu zaman şimdiki zamandadır, çünkü durum hâlâ devam eder; Türkçedeki „-den beri“ gibi.",
        examples: [
          { de: "Warte in der Halle, bis ich komme.", tr: "Ben gelene kadar salonda bekle.", note: "bis: -e kadar" },
          { de: "Seitdem ich jeden Tag laufe, schlafe ich besser.", tr: "Her gün koştuğumdan beri daha iyi uyuyorum.", note: "durum sürüyor → Präsens" },
          { de: "Seit sie im Verein ist, hat sie viele Freunde.", tr: "Kulübe girdiğinden beri çok arkadaşı var.", note: "seit = seitdem" },
        ],
      },
      {
        heading: "Hemen ardından: sobald",
        tr: "„sobald“ ikinci olayın birincisi biter bitmez başladığını söyler: Türkçedeki „-ir -mez“. Gelecek için de geçmiş için de kullanılır; geçmişte önce olan olay çoğu zaman Plusquamperfekt'tedir.",
        examples: [
          { de: "Sobald die Halle offen ist, gehen wir hinein.", tr: "Salon açılır açılmaz içeri giriyoruz.", note: "genel durum" },
          { de: "Sobald er angekommen war, ging das Training los.", tr: "O varır varmaz antrenman başladı.", note: "geçmiş: Plusquamperfekt" },
          { de: "Ruf mich an, sobald du fertig bist.", tr: "Biter bitmez beni ara.", note: "bist sonda" },
        ],
      },
    ],
    questions: [
      {
        text: "___ das Training anfängt, wärmen wir uns auf.",
        options: ["Bevor", "Während", "Seitdem"],
        answer: 0,
        explain: "Isınma antrenmandan önce oluyor; „-meden önce“ bevor'dur.",
      },
      {
        text: "Warte hier, ___ ich zurückkomme.",
        options: ["während", "bis", "seit"],
        answer: 1,
        explain: "Bekleme dönüşe KADAR sürüyor: bis.",
      },
      {
        text: "___ die Kinder schwimmen, lesen die Eltern Zeitung.",
        options: ["Bis", "Bevor", "Während"],
        answer: 2,
        explain: "İki olay aynı anda oluyor: während = -irken.",
      },
      {
        kind: "gapfill",
        text: "___ ich jeden Tag laufe, schlafe ich besser. (Beginn in der Vergangenheit, bis heute)",
        options: [],
        answer: 0,
        accept: ["Seitdem", "Seit", "seitdem", "seit"],
        explain: "Durum başladığından beri sürüyor: seitdem ya da seit; fiil şimdiki zamanda.",
      },
      {
        kind: "gapfill",
        text: "Ruf mich an, ___ du fertig bist. (sofort danach)",
        options: [],
        answer: 0,
        accept: ["sobald"],
        explain: "Biter bitmez arama: sobald.",
      },
      {
        kind: "gapfill",
        text: "Ich dusche immer, bevor ich nach Hause ___. (fahren)",
        options: [],
        answer: 0,
        accept: ["fahre"],
        explain: "„bevor“ yan cümlesinde çekimli fiil sona gider: fahre.",
      },
      {
        kind: "gapfill",
        text: "Sobald er ___ war, ging das Training los. (ankommen)",
        options: [],
        answer: 0,
        accept: ["angekommen"],
        explain: "Geçmişte önce olan olay Plusquamperfekt'te: angekommen war.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Während", "die Kinder spielen", "trinken", "die Eltern", "Kaffee"],
        explain: "Yan cümle başta ve fiili sonda; ana cümle fiille başlar: … spielen, trinken die Eltern Kaffee.",
      },
      {
        kind: "truefalse",
        text: "„Bevor ich gehe nach Hause, dusche ich.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„bevor“dan sonra fiil sona gider: „Bevor ich nach Hause gehe, dusche ich.“",
      },
      {
        kind: "truefalse",
        text: "„Seitdem sie im Verein ist, hat sie viele Freunde.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Durum hâlâ sürüyor; iki cümlede de şimdiki zaman doğru, yan cümlede fiil sonda.",
      },
    ],
  },
];
