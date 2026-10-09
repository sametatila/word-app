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
    genre: "text",
    intro: "Aynı ürün, iki sunum. Hangisi ikna ediyor ve neye dayanarak?",
    gloss: [
      { de: "der Clou", tr: "püf noktası", en: "the clever part" },
      { de: "das Alleinstellungsmerkmal", tr: "ayırt edici özellik", en: "unique selling point" },
      { de: "skalieren", tr: "ölçeklenmek", en: "to scale" },
      { de: "der Bedarf", tr: "ihtiyaç", en: "demand" },
      { de: "belegen", tr: "belgelemek / kanıtlamak", en: "to substantiate" },
      { de: "die Überzeugungskraft", tr: "ikna gücü", en: "persuasive power" },
      { de: "zünden", tr: "tutmak / etkisini göstermek", en: "to catch on" },
      { de: "das Produkt", tr: "ürün", en: "product" },
      { de: "erzeugen", tr: "üretmek", en: "to generate" },
      { de: "disruptiv", tr: "yıkıcı", en: "disruptive" },
      { de: "einzige", tr: "tek", en: "only" },
      { de: "die Zahl", tr: "sayı", en: "number" },
      { de: "der Text", tr: "metin", en: "text" },
      { de: "die Aussage", tr: "ifade", en: "statement" },
    ],
    minutes: 7,
    text:
      "ZWEI PITCHES, EIN PRODUKT\n\n" +
      "Team A begann so: „Stellen Sie sich vor, jede Werkstatt in Europa wüsste heute Abend, welches Ersatzteil sie morgen braucht.“ Danach kamen drei Zahlen: 900 Werkstätten im Test, 22 Prozent weniger Lagerkosten, Rückgang der Wartezeit von neun auf zwei Tage. Der Clou daran ist, dass die Vorhersage aus Daten stammt, die die Werkstätten ohnehin erzeugen.\n\n" +
      "Team B begann so: „Wir sind ein hochmotiviertes Team mit langjähriger Branchenerfahrung und einer disruptiven Vision.“ Es folgten vier Folien über die Marktgröße und eine über das Produkt.\n\n" +
      "Beide Teams beanspruchen dasselbe Alleinstellungsmerkmal. Nur eines belegt es. Team A spricht vom Bedarf der Werkstätten und zeigt ihn an Zahlen; Team B spricht vom Markt und meint dasselbe, ohne es messbar zu machen.\n\n" +
      "Bemerkenswert ist, was Team A NICHT getan hat. Es hat nicht behauptet, das Produkt skaliere mühelos. Auf die Frage nach dem Wachstum kam: „Ab etwa 3.000 Werkstätten brauchen wir eine zweite Datenquelle. Das ist gelöst, aber nicht billig.“\n\n" +
      "Diese Antwort hat mehr Überzeugungskraft entfaltet als jede Wachstumskurve. Wer eine Schwäche selbst benennt, wird bei den übrigen Aussagen geglaubt.\n\n" +
      "Ein dritter Unterschied betrifft die Reihenfolge. Team A nannte das Problem, bevor es die Lösung nannte — vierzig Sekunden lang war unklar, ob überhaupt ein Produkt kommt. Team B begann mit sich selbst und kam auf Folie sechs zum Problem, das es lösen will.\n\n" +
      "Diese Reihenfolge entscheidet, wem der Zuhörer zuhört. Wer mit dem Problem beginnt, verkauft eine Notwendigkeit; wer mit sich beginnt, verkauft Vertrauen — und Vertrauen bringt man in einen Pitch nicht mit, man verlässt ihn damit.\n\n" +
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
        text: "Der Text sagt, der Pitch von Team B habe „gezündet“. Was schränkt diese Aussage sofort ein?",
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
    genre: "report",
    intro: "Arabulucunun raporu. İki tarafın sözü nasıl aktarılıyor?",
    gloss: [
      { de: "schlichten", tr: "arabuluculuk etmek", en: "to mediate" },
      { de: "die Gegenseite", tr: "karşı taraf", en: "the other side" },
      { de: "der Standpunkt", tr: "duruş / görüş", en: "position" },
      { de: "sich festfahren", tr: "tıkanmak", en: "to reach a deadlock" },
      { de: "die Annäherung", tr: "yakınlaşma", en: "rapprochement" },
      { de: "beschwichtigen", tr: "yatıştırmak", en: "to placate" },
      { de: "erörtern", tr: "ele almak", en: "to discuss" },
      { de: "angehören", tr: "üyesi olmak", en: "to be a member of" },
      { de: "mehrfach", tr: "birden çok kez", en: "multiple times" },
      { de: "spitz", tr: "sivri", en: "pointed" },
      { de: "die Sitzung", tr: "oturum", en: "session" },
      { de: "die Information", tr: "bilgi", en: "information" },
      { de: "strittig", tr: "ihtilaflı", en: "disputed" },
      { de: "ausschließlich", tr: "yalnızca", en: "exclusively" },
      { de: "solche", tr: "böyle", en: "such" },
      { de: "die Anhörung", tr: "dinleme oturumu", en: "hearing" },
      { de: "die Moderation", tr: "moderatörlük", en: "moderation" },
      { de: "in vergleichbaren Fällen", tr: "benzer durumlarda", en: "in comparable cases" },
      { de: "sich bewähren", tr: "kendini kanıtlamak", en: "to prove itself" },
      { de: "zugespitzt", tr: "keskinleşmiş", en: "intensified" },
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
      "Hinzu kommt ein Umstand, den beide Seiten in der getrennten Anhörung von sich aus erwähnt haben: Die Teamsitzungen finden seit Januar unregelmäßig statt, und ein schriftliches Ergebnisprotokoll wird nicht geführt. Damit ist der strittige Vorgang kein Einzelfall, sondern der erste, der aufgefallen ist.\n\n" +
      "Beide Seiten haben zugesagt, an einem gemeinsamen Termin teilzunehmen.\n\n" +
      "Eine Moderation durch eine dritte, unbeteiligte Person hat sich in vergleichbaren Fällen bewährt.\n\n" +
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
        explain: "„nicht an der Sache festgefahren, sondern an der Frage der Zuständigkeit“ — arabulucunun asıl bulgusu.",
      },
      {
        text: "Der Bericht rät davon ab, das Gespräch mit einer allgemeinen Formel zu beschwichtigen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "İfade doğru: „Ein Versuch, … zu beschwichtigen, wäre hier verfehlt.“",
      },
    ],
  },
  {
    id: "c1-u03-l1",
    level: "C1",
    skill: "listening",
    unit: 3,
    title: "Freitag in der Kletterhalle",
    genre: "dialogue",
    intro: "Inga yeni gelen meslektaşını iş çıkışı tırmanma salonuna davet ediyor. Lars'ın çekinceleri ne, Inga onları nasıl gideriyor?",
    gloss: [
      { de: "ausdrücklich", tr: "açıkça", en: "explicitly" },
      { de: "selbstverständlich", tr: "elbette", en: "of course" },
      { de: "keineswegs", tr: "hiç de değil", en: "by no means" },
      { de: "dennoch", tr: "yine de", en: "nevertheless" },
      { de: "die Kletterhalle", tr: "tırmanma salonu", en: "climbing gym" },
      { de: "klettern", tr: "tırmanmak", en: "to climb" },
      { de: "sich blamieren", tr: "rezil olmak", en: "to embarrass oneself" },
      { de: "der Eintritt", tr: "giriş ücreti", en: "admission" },
      { de: "der Gurt", tr: "emniyet kemeri", en: "harness" },
      { de: "leihen", tr: "kiralamak", en: "to rent" },
      { de: "nicht locker lassen", tr: "üstelemek", en: "to not let up" },
      { de: "der Knoten", tr: "düğüm", en: "knot" },
      { de: "wetten", tr: "iddiaya girmek", en: "to bet" },
      { de: "runterkommen", tr: "aşağı inmek", en: "to get down" },
      { de: "genau", tr: "tam olarak", en: "exactly" },
      { de: "der Streit", tr: "tartışma", en: "argument" },
      { de: "die Halle", tr: "salon", en: "hall" },
      { de: "zahlen", tr: "ödemek", en: "to pay" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Inga", text: "Wir gehen am Freitag nach der Arbeit in die Kletterhalle. Komm doch mit!" },
      { speaker: "Lars", text: "Danke, aber ich bin erst seit drei Wochen hier. Ich kenne ja kaum jemanden." },
      { speaker: "Inga", text: "Genau deshalb. Beim Klettern lernst du in zwei Stunden mehr Leute kennen als in drei Monaten Kantine." },
      { speaker: "Lars", text: "Ich bin aber noch nie geklettert. Ich blamiere mich doch nur." },
      { speaker: "Inga", text: "Das stimmt doch gar nicht. Die Hälfte von uns fängt jedes Mal wieder an den leichten Wänden an." },
      { speaker: "Lars", text: "Und was kostet das? Schuhe, Gurt, Eintritt …" },
      { speaker: "Inga", text: "Den Eintritt zahlt die Firma, das hat die Chefin ausdrücklich gesagt. Schuhe und Gurt kannst du vor Ort leihen, für sechs Euro." },
      { speaker: "Lars", text: "Kommt Herr Albers auch? Mit ihm hatte ich letzte Woche Streit wegen der Lieferliste." },
      { speaker: "Inga", text: "Er kommt, selbstverständlich. Aber in der Halle redet keiner über Lieferlisten, keineswegs. Da redet man über Knoten." },
      { speaker: "Lars", text: "Du lässt nicht locker, oder?" },
      { speaker: "Inga", text: "Nein. Dann sag doch einfach ja, und wir fahren um halb sechs zusammen hin." },
      { speaker: "Lars", text: "Na gut. Aber wenn ich oben hänge und nicht mehr runterkomme, holst du mich." },
      { speaker: "Inga", text: "Versprochen. Dennoch wette ich, dass du am Ende als Letzter gehen willst." },
    ],
    questions: [
      {
        text: "Warum will Lars zuerst nicht mitkommen?",
        options: [
          "Er hat am Freitag einen Arzttermin",
          "Er findet die Halle zu weit weg",
          "Er ist neu im Team und noch nie geklettert",
        ],
        answer: 2,
        explain: "Lars üç haftadır burada, kimseyi tanımıyor ve daha önce hiç tırmanmamış.",
      },
      {
        kind: "gapfill",
        text: "Den Eintritt zahlt die Firma, das hat die Chefin ___ gesagt.",
        options: [],
        answer: 0,
        accept: ["ausdrücklich"],
        explain: "„Den Eintritt zahlt die Firma, das hat die Chefin ausdrücklich gesagt.“",
      },
      {
        text: "Wann fahren die beiden los?",
        options: [
          "Um halb sechs",
          "Um sechs",
          "Direkt nach dem Mittagessen",
        ],
        answer: 0,
        explain: "„Dann sag doch einfach ja, und wir fahren um halb sechs zusammen hin.“",
      },
      {
        kind: "dictation",
        text: "Inga'nın Lars'ın endişesine karşı çıktığı cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Das stimmt doch gar nicht.", "Das stimmt doch gar nicht"],
        explain: "„Doch“ burada Lars'ın söylediğine karşı çıkıyor: rezil olmayacaksın, diyor.",
      },
    ],
  },
  {
    id: "c1-u03-l2",
    level: "C1",
    skill: "listening",
    unit: 3,
    title: "Das ist ja interessant",
    genre: "dialogue",
    intro: "Şaşkınlık mı, kibar bir itiraz mı? Aynı cümle iki yönde okunuyor.",
    gloss: [
      { de: "überraschen", tr: "şaşırtmak", en: "surprise" },
      { de: "erstaunt", tr: "hayret etmiş", en: "astonished" },
      { de: "der Nachdruck", tr: "vurgu", en: "emphasis" },
      { de: "locker", tr: "rahat", en: "relaxed" },
      { de: "gewissermaßen", tr: "bir bakıma", en: "in a way" },
      { de: "sich erweisen", tr: "olduğu anlaşılmak", en: "to turn out" },
      { de: "bewirken", tr: "sağlamak / etkisini yaratmak", en: "to bring about" },
      { de: "also", tr: "yani", en: "so" },
      { de: "interessant", tr: "ilginç", en: "interesting" },
      { de: "einzige", tr: "tek", en: "only" },
      { de: "lesen", tr: "okumak", en: "to read" },
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
      { speaker: "Chef", text: "Das überrascht mich nicht. So klingt es, aber so war es nicht gemeint." },
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
    title: "Zwischen Pitch und Schlichtung",
    genre: "grammar",
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
    genre: "monologue",
    intro: "İkna et ama kanıtla: iddia, rakam, ayırt edici nokta, kabul edilen zayıflık.",
    gloss: [
      { de: "das Alleinstellungsmerkmal", tr: "ayırt edici özellik", en: "unique selling point" },
      { de: "der Bedarf", tr: "ihtiyaç", en: "demand" },
      { de: "skalieren", tr: "ölçeklenmek", en: "to scale" },
      { de: "der Clou", tr: "püf noktası", en: "the clever part" },
      { de: "belegen", tr: "kanıtlamak", en: "to substantiate" },
      { de: "genau", tr: "tam olarak", en: "exactly" },
      { de: "rechnen", tr: "hesaplamak", en: "to calculate" },
      { de: "der Erzeuger", tr: "üretici", en: "producer" },
      { de: "das Kapital", tr: "sermaye", en: "capital" },
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
          "Der Bedarf ist da: Was abends übrig bleibt, wandert in die Tonne. Unsere Vorhersage senkt genau das.\n\n" +
          "Der Clou daran ist, dass wir keine neue Hardware brauchen. Wir rechnen mit den Kassendaten, die jede Bäckerei ohnehin erzeugt — die Wettbewerber verlangen eine eigene Waage.\n\n" +
          "Belegen können wir das: In sechs Monaten mit 140 Bäckereien ist der Ausschuss um 31 Prozent gesunken.\n\n" +
          "Eine Grenze nenne ich Ihnen gleich selbst. Ab etwa 500 Filialen reicht die Kassenquelle nicht mehr; wir brauchen dann eine zweite Datenquelle. Das ist gelöst, aber nicht billig, und es ist der Punkt, an dem wir Kapital brauchen.\n\n" +
          "Alles davor läuft heute schon.",
      },
    ],
  },
];
