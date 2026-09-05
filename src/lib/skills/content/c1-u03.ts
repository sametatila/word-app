import type { SkillExercise } from "../types";

/**
 * C1 · Ünite 3 — "Pitch, arabuluculuk, doch, ja ve mal".
 *
 * Dört ders: Der perfekte Pitch · Zwischen den Fronten · Komm doch mit! ·
 * Das ist ja spannend!
 *
 *   Kelime: der Clou, das Alleinstellungsmerkmal, skalieren, der Bedarf,
 *           zünden, die Strategie, belegen, die Überzeugungskraft · schlichten,
 *           die Gegenseite, der Standpunkt, sich festfahren, die Annäherung,
 *           beschwichtigen, der Unterhändler, erörtern · die Aufforderung, der
 *           Widerspruch, bekräftigen, die Ermunterung, selbstverständlich,
 *           dennoch, keineswegs, ausdrücklich · die Überraschung, auffordern,
 *           der Nachdruck, locker, erstaunt, gewissermaßen, sich erweisen,
 *           bewirken
 *
 * Ünite iki uçtan aynı şeye bakıyor: İKNANIN ARACI. Pitch dersi bunu retorik
 * yapıyla kuruyor (iddia, kanıt, ayrım), parçacık dersleri ise tek heceyle —
 * "Komm doch mit" ile "Komm mit" arasındaki fark bir davetle bir emir
 * arasındaki farktır. Arabuluculuk dersi ikisini birleştiriyor: başkasının
 * sözünü aktarırken kendi tonunu katmamak.
 *
 * Bu yüzden sorular ikna edici cümlenin NEYE dayandığını ayırt ettiriyor:
 * kanıt mı, ton mu, yoksa yalnız kendine güven mi.
 */
export const c1U03: SkillExercise[] = [
  {
    id: "c1-u03-r1",
    level: "C1",
    skill: "reading",
    unit: 3,
    title: "Zwei Pitches, ein Produkt",
    genre: "Analiz yazısı",
    intro: "Aynı ürün, iki sunum. Hangisi ikna ediyor ve neye dayanarak?",
    gloss: [
      { de: "der Clou", tr: "püf noktası", en: "the clever part" },
      { de: "das Alleinstellungsmerkmal", tr: "ayırt edici özellik", en: "unique selling point" },
      { de: "skalieren", tr: "ölçeklenmek", en: "to scale" },
      { de: "der Bedarf", tr: "ihtiyaç", en: "demand" },
      { de: "belegen", tr: "belgelemek, kanıtlamak", en: "to substantiate" },
      { de: "die Überzeugungskraft", tr: "ikna gücü", en: "persuasive power" },
      { de: "zünden", tr: "tutmak, etkisini göstermek", en: "to catch on" },
    ],
    minutes: 7,
    text:
      "ZWEI PITCHES, EIN PRODUKT\n\n" +
      "Team A begann so: „Stellen Sie sich vor, jede Werkstatt in Europa wüsste heute Abend, welches Ersatzteil sie morgen braucht.“ Danach kamen drei Zahlen: 900 Werkstätten im Test, 22 Prozent weniger Lagerkosten, Rückgang der Wartezeit von neun auf zwei Tage. Der Clou daran ist, dass die Vorhersage aus Daten stammt, die die Werkstätten ohnehin erzeugen.\n\n" +
      "Team B begann so: „Wir sind ein hochmotiviertes Team mit langjähriger Branchenerfahrung und einer disruptiven Vision.“ Es folgten vier Folien über die Marktgröße und eine über das Produkt.\n\n" +
      "Beide Teams beanspruchen dasselbe Alleinstellungsmerkmal. Nur eines belegt es. Team A spricht vom Bedarf der Werkstätten und zeigt ihn an Zahlen; Team B spricht vom Markt und meint dasselbe, ohne es messbar zu machen.\n\n" +
      "Bemerkenswert ist, was Team A NICHT getan hat. Es hat nicht behauptet, das Produkt skaliere mühelos. Auf die Frage nach dem Wachstum kam: „Ab etwa 3.000 Werkstätten brauchen wir eine zweite Datenquelle. Das ist gelöst, aber nicht billig.“\n\n" +
      "Diese Antwort hat mehr Überzeugungskraft entfaltet als jede Wachstumskurve. Wer eine Schwäche selbst benennt, wird bei den übrigen Aussagen geglaubt.\n\n" +
      "Der Pitch von Team B zündete im Raum durchaus. In der Nachbesprechung erinnerte sich niemand an eine einzige Zahl.",
    questions: [
      {
        text: "Worauf stützt Team A seine Überzeugungskraft?",
        options: [
          "Auf die Erfahrung des Teams",
          "Auf belegte Zahlen und eine benannte Schwäche",
          "Auf die Größe des Marktes",
        ],
        answer: 1,
        explain: "Üç rakam artı „Das ist gelöst, aber nicht billig“ — kanıt ve kendi zayıflığını adlandırma.",
      },
      {
        kind: "gapfill",
        text: "Der ___ daran ist, dass die Vorhersage aus Daten stammt, die die Werkstätten ohnehin erzeugen.",
        options: [],
        answer: 0,
        accept: ["Clou"],
        explain: "Pitch'in ayırt edici cümlesi bu kalıpla kuruluyor: der Clou daran ist, dass …",
      },
      {
        text: "Warum wirkt das Eingeständnis der Schwäche überzeugend?",
        options: [
          "Weil es Bescheidenheit zeigt",
          "Weil die übrigen Aussagen dadurch glaubwürdig werden",
          "Weil Investoren Probleme mögen",
        ],
        answer: 1,
        explain: "„Wer eine Schwäche selbst benennt, wird bei den übrigen Aussagen geglaubt.“",
      },
      {
        kind: "short_answer",
        text: "Der Text sagt, Team Bs Pitch habe „gezündet“. Was schränkt diese Aussage sofort ein?",
        options: [],
        answer: 0,
        accept: [
          "es blieb nichts hängen",
          "in der Nachbesprechung erinnerte sich niemand an eine Zahl",
          "niemand erinnerte sich an eine einzige Zahl",
        ],
        explain: "Son cümle övgüyü geri alıyor: anlık etki ile kalıcı etki ayrı şeyler.",
      },
      {
        kind: "short_answer",
        text: "Beide Teams beanspruchen dasselbe Alleinstellungsmerkmal. Worin liegt der Unterschied?",
        options: [],
        answer: 0,
        accept: [
          "nur eines belegt es",
          "Team A belegt es",
          "eines beweist es, das andere behauptet es nur",
        ],
        explain: "„Nur eines belegt es.“ İddia ile kanıt arasındaki fark bu ünitenin ölçtüğü şey.",
      },
    ],
  },
  {
    id: "c1-u03-r2",
    level: "C1",
    skill: "reading",
    unit: 3,
    title: "Der Vermittler berichtet",
    genre: "Rapor",
    intro: "Arabulucunun raporu. İki tarafın sözü nasıl aktarılıyor?",
    gloss: [
      { de: "schlichten", tr: "arabuluculuk etmek", en: "to mediate" },
      { de: "die Gegenseite", tr: "karşı taraf", en: "the other side" },
      { de: "der Standpunkt", tr: "duruş, görüş", en: "position" },
      { de: "sich festfahren", tr: "tıkanmak", en: "to reach a deadlock" },
      { de: "die Annäherung", tr: "yakınlaşma", en: "rapprochement" },
      { de: "beschwichtigen", tr: "yatıştırmak", en: "to placate" },
      { de: "erörtern", tr: "ele almak", en: "to discuss" },
    ],
    minutes: 7,
    text:
      "VERMITTLUNGSBERICHT — SACHE MÜLLER / ABTEILUNG LOGISTIK\n\n" +
      "Beide Seiten wurden getrennt angehört.\n\n" +
      "Herr Müller gibt an, er sei bei der Umverteilung der Schichten nicht gefragt worden. Er habe dies mehrfach angesprochen und keine Antwort erhalten. Nach seiner Darstellung habe sich die Situation erst zugespitzt, nachdem er sich an die Bereichsleitung gewandt habe.\n\n" +
      "Die Abteilungsleitung erklärt, die Umverteilung sei in der Teamsitzung am 4. Mai erörtert worden. Herr Müller habe an dieser Sitzung nicht teilgenommen; eine gesonderte Information sei versäumt worden.\n\n" +
      "Die Standpunkte liegen in einem Punkt näher beieinander, als beide annehmen: Keine Seite bestreitet, dass die Information Herrn Müller nicht erreicht hat. Strittig ist ausschließlich, wer sie hätte weitergeben müssen.\n\n" +
      "Ein Versuch, das Gespräch mit einer allgemeinen Formel zu beschwichtigen, wäre hier verfehlt. Das Verfahren hat sich nicht an der Sache festgefahren, sondern an der Frage der Zuständigkeit.\n\n" +
      "Wer in einer solchen Lage schlichten will, sollte deshalb nicht bei der Schuldfrage ansetzen. Beide Seiten erwarten, dass die Gegenseite zuerst nachgibt, und beide haben in ihrem Teil der Darstellung recht.\n\n" +
      "Empfehlung: eine gemeinsame Sitzung, in der ausschließlich die Weitergabe von Sitzungsergebnissen geregelt wird. Eine Annäherung in der Schichtfrage ist danach wahrscheinlich.",
    questions: [
      {
        text: "In welcher Form gibt der Bericht die Aussagen wieder?",
        options: [
          "Im Indikativ, als Tatsachen",
          "Im Konjunktiv I, als fremde Aussagen",
          "In direkter Rede",
        ],
        answer: 1,
        explain: "„er sei … nicht gefragt worden“, „die Umverteilung sei … erörtert worden“ — aktarım kipi, yazarın kendi iddiası değil.",
      },
      {
        kind: "gapfill",
        text: "Herr Müller gibt an, er ___ bei der Umverteilung nicht gefragt worden.",
        options: [],
        answer: 0,
        accept: ["sei"],
        explain: "Dolaylı aktarımın kipi: tarafsızlık dilbilgisiyle kuruluyor, sözcükle değil.",
      },
      {
        text: "Worin sind sich beide Seiten einig?",
        options: [
          "Dass die Sitzung am 4. Mai stattfand",
          "Dass die Information Herrn Müller nicht erreicht hat",
          "Wer die Information hätte weitergeben müssen",
        ],
        answer: 1,
        explain: "„Keine Seite bestreitet, dass die Information Herrn Müller nicht erreicht hat.“",
      },
      {
        kind: "short_answer",
        text: "Woran hat sich das Verfahren laut Bericht festgefahren?",
        options: [],
        answer: 0,
        accept: [
          "an der Frage der Zuständigkeit",
          "an der Zuständigkeit",
          "nicht an der Sache, sondern an der Zuständigkeit",
        ],
        explain: "„nicht an der Sache, sondern an der Frage der Zuständigkeit“ — arabulucunun asıl bulgusu.",
      },
      {
        text: "Der Bericht empfiehlt, das Gespräch mit einer allgemeinen Formel zu beschwichtigen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Ein Versuch, … zu beschwichtigen, wäre hier verfehlt.“",
      },
    ],
  },
  {
    id: "c1-u03-l1",
    level: "C1",
    skill: "listening",
    unit: 3,
    title: "Ein Wort verändert die Einladung",
    genre: "Diyalog",
    intro: "Aynı cümle, tek parçacık farkı. Davet mi, baskı mı?",
    gloss: [
      { de: "die Aufforderung", tr: "çağrı, talep", en: "request" },
      { de: "der Widerspruch", tr: "karşı çıkma", en: "contradiction" },
      { de: "bekräftigen", tr: "pekiştirmek", en: "to affirm" },
      { de: "die Ermunterung", tr: "yüreklendirme", en: "encouragement" },
      { de: "keineswegs", tr: "hiç de değil", en: "by no means" },
      { de: "ausdrücklich", tr: "açıkça", en: "explicitly" },
      { de: "dennoch", tr: "yine de", en: "nevertheless" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Lars", text: "Sag mal, was ist der Unterschied zwischen „Komm mit“ und „Komm doch mit“?" },
      { speaker: "Ipek", text: "„Komm mit“ ist eine Aufforderung. „Komm doch mit“ ist eine Ermunterung." },
      { speaker: "Lars", text: "Das klingt für mich fast gleich." },
      { speaker: "Ipek", text: "Stell dir vor, jemand hat schon abgesagt. Dann sagst du „Komm doch mit“ — du nimmst die Absage nicht als endgültig." },
      { speaker: "Lars", text: "Also widerspricht das „doch“ etwas?" },
      { speaker: "Ipek", text: "Genau. „Doch“ arbeitet immer gegen etwas, das schon im Raum steht — gegen eine Absage, gegen einen Zweifel." },
      { speaker: "Lars", text: "Und wenn jemand sagt: „Das stimmt doch gar nicht“?" },
      { speaker: "Ipek", text: "Dann ist es Widerspruch, kein freundliches Angebot. Der Ton entscheidet, nicht das Wort." },
      { speaker: "Lars", text: "Wobei ich das Wort keineswegs weglassen würde." },
      { speaker: "Ipek", text: "Auf keinen Fall. Ohne Partikel klingt Deutsch ausdrücklich — und ausdrücklich heißt oft unfreundlich." },
      { speaker: "Ipek", text: "Und mit „ja“ bekräftigst du etwas, das beide schon wissen." },
      { speaker: "Lars", text: "Dennoch: In einer Mail an eine Behörde lasse ich es weg." },
      { speaker: "Ipek", text: "Da hast du recht. Schriftlich und amtlich, da will man keine Ermunterung, da will man eine Aussage." },
    ],
    questions: [
      {
        text: "Was ist laut Ipek der Unterschied zwischen „Komm mit“ und „Komm doch mit“?",
        options: [
          "Aufforderung gegenüber Ermunterung",
          "Höflich gegenüber unhöflich",
          "Schriftlich gegenüber mündlich",
        ],
        answer: 0,
        explain: "„‚Komm mit‘ ist eine Aufforderung. ‚Komm doch mit‘ ist eine Ermunterung.“",
      },
      {
        kind: "gapfill",
        text: "„Doch“ arbeitet immer gegen etwas, das schon im ___ steht.",
        options: [],
        answer: 0,
        accept: ["Raum"],
        explain: "Parçacığın işlevi: söylenmiş ya da sezilmiş bir şeye karşı çalışmak.",
      },
      {
        text: "Wann wirkt „doch“ als Widerspruch statt als Ermunterung?",
        options: [
          "In der Schriftsprache",
          "Wenn der Ton es so färbt",
          "Nur in Fragen",
        ],
        answer: 1,
        explain: "„Der Ton entscheidet, nicht das Wort.“",
      },
      {
        kind: "dictation",
        text: "Ipek'in parçacıksız Almancayı nasıl nitelediğini yaz.",
        options: [],
        answer: 0,
        accept: [
          "Ohne Partikel klingt Deutsch ausdrücklich — und ausdrücklich heißt oft unfreundlich.",
          "Ohne Partikel klingt Deutsch ausdrücklich",
        ],
        explain: "Bu ünitenin özeti: parçacık süs değil, nezaketin taşıyıcısı.",
      },
    ],
  },
  {
    id: "c1-u03-l2",
    level: "C1",
    skill: "listening",
    unit: 3,
    title: "Das ist ja interessant",
    genre: "Diyalog",
    intro: "Şaşkınlık mı, kibar bir itiraz mı? Aynı cümle iki yönde okunuyor.",
    gloss: [
      { de: "die Überraschung", tr: "şaşkınlık", en: "surprise" },
      { de: "erstaunt", tr: "hayret etmiş", en: "astonished" },
      { de: "der Nachdruck", tr: "vurgu", en: "emphasis" },
      { de: "locker", tr: "rahat", en: "relaxed" },
      { de: "gewissermaßen", tr: "bir bakıma", en: "in a way" },
      { de: "sich erweisen", tr: "olduğu anlaşılmak", en: "to turn out" },
      { de: "bewirken", tr: "sağlamak, etkisini yaratmak", en: "to bring about" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Chef", text: "Sie haben den Zeitplan also um vier Wochen gekürzt. Das ist ja interessant." },
      { speaker: "Nadja", text: "Danke. Ich dachte, das bringt uns vor die Messe." },
      { speaker: "Chef", text: "Schauen Sie mal auf Seite drei. Die Testphase — die ist ja jetzt zweitägig." },
      { speaker: "Nadja", text: "Ja, das war die einzige Stelle mit Spielraum." },
      { speaker: "Chef", text: "Hm." },
      { speaker: "Nadja", text: "Sie halten das für zu kurz." },
      { speaker: "Chef", text: "Ich habe nichts gesagt." },
      { speaker: "Nadja", text: "Sie haben zweimal „ja“ gesagt und einmal „hm“. Bei Ihnen ist das ein Gutachten." },
      { speaker: "Chef", text: "Gut. Dann mit Nachdruck: zwei Tage Test haben sich bei uns noch nie als ausreichend erwiesen." },
      { speaker: "Nadja", text: "Ehrlich gesagt bin ich erstaunt. Ich hatte Ihr „interessant“ locker als Lob gelesen." },
      { speaker: "Chef", text: "Das war keine Überraschung für mich — genau so war es gemeint und genau so nicht." },
      { speaker: "Nadja", text: "Warum sagen Sie das nicht gleich so?" },
      { speaker: "Chef", text: "Weil ich gehofft hatte, Sie kommen selbst darauf. Das bewirkt mehr." },
      { speaker: "Nadja", text: "Gewissermaßen ist das ja auch passiert." },
    ],
    questions: [
      {
        text: "Was drückt „Das ist ja interessant“ hier aus?",
        options: [
          "Echte Begeisterung",
          "Einen unausgesprochenen Vorbehalt",
          "Eine Bitte um mehr Information",
        ],
        answer: 1,
        explain: "Sonraki hamleler bunu açıyor: „ja“ burada beğeni değil, dikkat çekilen bir sorun.",
      },
      {
        kind: "gapfill",
        text: "Zwei Tage Test haben sich bei uns noch nie als ausreichend ___.",
        options: [],
        answer: 0,
        accept: ["erwiesen"],
        explain: "sich erweisen als: deneyim sonucunda ortaya çıkan yargı — iddiadan daha güçlü.",
      },
      {
        text: "Woran erkennt Nadja die Kritik?",
        options: [
          "An einer ausdrücklichen Aussage",
          "An zwei „ja“ und einem „hm“",
          "An der Körpersprache",
        ],
        answer: 1,
        explain: "„Sie haben zweimal ‚ja‘ gesagt und einmal ‚hm‘. Bei Ihnen ist das ein Gutachten.“",
      },
      {
        kind: "short_answer",
        text: "Warum hat der Chef die Kritik nicht sofort deutlich gesagt?",
        options: [],
        answer: 0,
        accept: [
          "damit sie selbst darauf kommt",
          "er hoffte, sie kommt selbst darauf",
          "weil das mehr bewirkt",
        ],
        explain: "„Weil ich gehofft hatte, Sie kommen selbst darauf. Das bewirkt mehr.“",
      },
    ],
  },
  {
    id: "c1-u03-w1",
    level: "C1",
    skill: "writing",
    unit: 3,
    title: "Parçacık, kanıt, aktarım",
    genre: "Dil bilgisi",
    intro: "Üç ayrı ikna aracı: ton taşıyan parçacık, kanıt, tarafsız aktarım.",
    gloss: [
      { de: "belegen", tr: "kanıtlamak", en: "to substantiate" },
      { de: "keineswegs", tr: "hiç de değil", en: "by no means" },
      { de: "der Standpunkt", tr: "duruş", en: "position" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Hadi sen de gel!",
        answer: "Komm doch mit",
        hint: "doch daveti ısrar değil yüreklendirme yapar; söylenmemiş bir reddin karşısına geçer.",
      },
      {
        kind: "build",
        tr: "Bu rakamları bir çalışmayla kanıtlayabiliriz.",
        answer: "Wir können diese Zahlen mit einer Studie belegen",
        hint: "belegen kanıt sunmak; behaupten yalnız iddia etmek.",
      },
      {
        kind: "build",
        tr: "Müller Bey vardiyalar konusunda kendisine sorulmadığını söylüyor.",
        answer: "Herr Müller sagt, er sei bei den Schichten nicht gefragt worden",
        hint: "Dolaylı aktarımda Konjunktiv I: sei. Yazar iddiayı üstlenmez.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: aktarımda yazar başkasının iddiasını kendi iddiası gibi sunuyor.",
        source: "Herr Müller sagt, er wurde bei den Schichten nicht gefragt.",
        answer: "Herr Müller sagt, er sei bei den Schichten nicht gefragt worden.",
        alternatives: ["Herr Müller sagt, er sei bei den Schichten nicht gefragt worden"],
        why: "Bildirme kipiyle aktarmak, aktaranı olayın doğruluğuna ortak eder. Arabulucu ya da gazeteci için bu tarafsızlığın kaybıdır; Konjunktiv I mesafeyi dilbilgisiyle kurar.",
      },
    ],
  },
  {
    id: "c1-u03-w2",
    level: "C1",
    skill: "writing",
    unit: 3,
    title: "Ein Pitch in sechs Sätzen",
    genre: "Sunum metni",
    intro: "İkna et ama kanıtla: iddia, rakam, ayırt edici nokta, kabul edilen zayıflık.",
    gloss: [
      { de: "das Alleinstellungsmerkmal", tr: "ayırt edici özellik", en: "unique selling point" },
      { de: "der Bedarf", tr: "ihtiyaç", en: "demand" },
      { de: "skalieren", tr: "ölçeklenmek", en: "to scale" },
      { de: "der Clou", tr: "püf noktası", en: "the clever part" },
      { de: "belegen", tr: "kanıtlamak", en: "to substantiate" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "free",
        prompt:
          "Aşağıdaki verilerle altı-sekiz cümlelik bir pitch yaz. Bir sahneyle başla, ihtiyacı adlandır, ayırt edici noktayı „Der Clou daran ist, dass …“ ile söyle, en az iki rakamla kanıtla ve sonunda bir zayıflığı kendin adlandır. Abartma; metindeki Team B'nin hatasına düşme.",
        stimulus:
          "ÜRÜN: Küçük fırınlar için gün sonu talep tahmini.\n\n" +
          "VERİ:\n" +
          "— 140 fırında altı aylık test\n" +
          "— Atılan ürün %31 azaldı\n" +
          "— Kurulum: mevcut kasa verisinden, ek donanım yok\n" +
          "— Sınır: 500 şubeden sonra ikinci veri kaynağı gerekiyor, çözümü var ama maliyetli\n" +
          "— Rakip çözümler ayrı terazi donanımı istiyor",
        checklist: [
          "Bir sahneyle başladın mı (Stellen Sie sich vor, …)?",
          "Ayırt edici noktayı „Der Clou daran ist, dass …“ ile söyledin mi?",
          "En az iki rakamla kanıtladın mı?",
          "Bir zayıflığı kendin adlandırdın mı?",
        ],
        minWords: 90,
        phrases: [
          { de: "Stellen Sie sich vor, …", tr: "bir düşünün, …", en: "imagine that …" },
          { de: "Der Clou daran ist, dass …", tr: "işin püf noktası şu ki …", en: "the clever part is that …" },
          { de: "Das ist gelöst, aber nicht billig.", tr: "çözümü var ama ucuz değil", en: "that is solved, but not cheap" },
        ],
        sample:
          "Stellen Sie sich vor, jede kleine Bäckerei wüsste am Vorabend, wie viel Brot sie morgen wirklich verkauft.\n\n" +
          "Der Bedarf ist da: Jede vierte Backware wandert abends in die Tonne. Unsere Vorhersage senkt genau das.\n\n" +
          "Der Clou daran ist, dass wir keine neue Hardware brauchen. Wir rechnen mit den Kassendaten, die jede Bäckerei ohnehin erzeugt — die Wettbewerber verlangen eine eigene Waage.\n\n" +
          "Belegen können wir das: In sechs Monaten mit 140 Bäckereien ist der Ausschuss um 31 Prozent gesunken. Die Einrichtung dauert einen Nachmittag.\n\n" +
          "Eine Grenze nenne ich Ihnen gleich selbst. Ab etwa 500 Filialen reicht die Kassenquelle nicht mehr; wir brauchen dann eine zweite Datenquelle. Das ist gelöst, aber nicht billig, und es ist der Punkt, an dem wir Kapital brauchen.\n\n" +
          "Alles davor läuft heute schon.",
      },
    ],
  },
];
