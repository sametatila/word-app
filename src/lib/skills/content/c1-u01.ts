import type { SkillExercise } from "../types";

/**
 * C1 · Ünite 1 — "Karar, başvuru, itiraz, satır arası".
 *
 * Dört ders: Eine Entscheidung treffen · Einen Antrag stellen · Sagen, ohne zu
 * verletzen · Zwischen den Zeilen.
 *
 *   Kelime: die Erwägung, in Frage kommen, zur Verfügung stehen, in Betracht
 *           ziehen, die Tragweite, der Beschluss, die Bestimmung, veranlassen ·
 *           in Anspruch nehmen, zum Ausdruck bringen, Abstand nehmen, Rücksicht
 *           nehmen, in Kraft treten, einreichen, die Vollmacht, die Bewilligung ·
 *           die Zurückhaltung, relativieren, der Vorbehalt, verbindlich,
 *           taktvoll, der Einwand, besonnen, umsichtig · die Andeutung,
 *           eigentlich, an sich, unterschwellig, heraushören, die Perspektive,
 *           nachvollziehen, die Schlussfolgerung
 *
 * C1'de ölçülen bilgi değil SEÇİM. Bu yüzden sorular "metinde ne yazıyor"
 * değil "yazar neyi söylemeden söylüyor" diye soruyor: işlev fiili öbeğinin
 * yerine düz fiil konsaydı ne değişirdi, çekince nereye gizlenmiş, hangi
 * cümle kibar göründüğü hâlde reddediyor. Metinler bu yüzden A2'dekinden
 * uzun ve sorular çıkarım istiyor.
 */
export const c1U01: SkillExercise[] = [
  {
    id: "c1-u01-r1",
    level: "C1",
    skill: "reading",
    unit: 1,
    title: "Beschlussvorlage zur Standortfrage",
    genre: "formal",
    intro: "Bir yönetim kurulu tutanağı. Karar ne, çekince nerede saklı?",
    gloss: [
      { de: "die Erwägung", tr: "değerlendirme", en: "consideration" },
      { de: "in Betracht ziehen", tr: "göz önüne almak", en: "to take into account" },
      { de: "die Tragweite", tr: "kapsam / ağırlık", en: "significance" },
      { de: "der Beschluss", tr: "karar", en: "resolution" },
      { de: "die Bestimmung", tr: "hüküm", en: "provision" },
      { de: "veranlassen", tr: "yol açmak / talimat vermek", en: "to arrange for" },
      { de: "in Kraft treten", tr: "yürürlüğe girmek", en: "to come into force" },
      { de: "der Vorbehalt", tr: "çekince", en: "reservation" },
      { de: "der Vorstand", tr: "yönetim kurulu", en: "board" },
      { de: "reiflich", tr: "etraflıca", en: "careful" },
      { de: "sehen", tr: "görmek", en: "to see" },
      { de: "folgend", tr: "aşağıdaki", en: "following" },
      { de: "die Sitzung", tr: "oturum", en: "session" },
      { de: "die Geschäftsführung", tr: "şirket yönetimi", en: "management" },
      { de: "vorlegen", tr: "sunmak", en: "to submit" },
      { de: "rund", tr: "yaklaşık", en: "about" },
      { de: "wirtschaftlich", tr: "ekonomik", en: "economic" },
      { de: "die Entwicklung", tr: "gelişim", en: "development" },
      { de: "der Vertrieb", tr: "satış bölümü", en: "sales department" },
      { de: "der Standort", tr: "konum", en: "location" },
      { de: "strecken", tr: "zamana yaymak", en: "to spread out" },
      { de: "bemessen", tr: "ölçüp belirlemek", en: "to gauge" },
      { de: "der Text", tr: "metin", en: "text" },
      { de: "genau", tr: "tam olarak", en: "exactly" },
    ],
    minutes: 7,
    text:
      "BESCHLUSSVORLAGE 14/3 — VERLAGERUNG DES STANDORTS NORD\n\n" +
      "Der Vorstand hat die Verlagerung des Standorts Nord nach reiflicher Erwägung geprüft. In Betracht gezogen wurden drei Varianten: vollständige Verlagerung, Teilverlagerung und Beibehaltung bei reduzierter Fläche.\n\n" +
      "Die Tragweite der Entscheidung ist erheblich. Betroffen sind 84 Beschäftigte, von denen nach derzeitigem Stand 31 einen Umzug nicht als Option sehen. Für diese Gruppe stehen ab Januar Beratungsgespräche zur Verfügung.\n\n" +
      "Der Vorstand fasst folgenden Beschluss: Variante 2 (Teilverlagerung) wird umgesetzt. Die entsprechenden Bestimmungen treten zum 1. April in Kraft, vorbehaltlich der Zustimmung des Aufsichtsrats in seiner Sitzung am 12. Februar.\n\n" +
      "Die Geschäftsführung wird veranlasst, bis Ende Januar einen Sozialplan vorzulegen. Von einer Ankündigung gegenüber der Presse ist bis zur Sitzung des Aufsichtsrats Abstand zu nehmen.\n\n" +
      "Zur Begründung: Variante 1 hätte eine Einsparung von jährlich rund 1,2 Millionen Euro erbracht, wäre jedoch mit dem vollständigen Verlust der regionalen Zulieferbeziehungen verbunden gewesen. Variante 3 ist wirtschaftlich nicht darstellbar, da die Bestimmungen des bestehenden Mietvertrags eine Reduzierung der Fläche vor 2029 nicht zulassen.\n\n" +
      "Die Teilverlagerung sieht vor, dass Entwicklung und Vertrieb am Standort Nord verbleiben, während Produktion und Lager an den Standort Süd wechseln. Die Tragweite ist für die Bereiche sehr unterschiedlich; eine nach Abteilungen aufgeschlüsselte Darstellung findet sich in Anlage 3.\n\n" +
      "Der Vorstand weist darauf hin, dass über den Zeitpunkt der Umsetzung noch nicht entschieden ist. In Betracht gezogen wird, die Verlagerung über zwei Jahre zu strecken, um betriebsbedingte Kündigungen zu vermeiden. Eine Kalkulation hierzu liegt bislang nicht vor und wird bis zur Sitzung des Aufsichtsrats veranlasst.\n\n" +
      "Anmerkung des Betriebsrats: Der Betriebsrat trägt den Beschluss mit, bringt jedoch zum Ausdruck, dass die Frist für den Sozialplan sehr knapp bemessen ist.",
    questions: [
      {
        text: "Was ist der eigentliche Vorbehalt in diesem Beschluss?",
        options: [
          "Die Zustimmung des Aufsichtsrats steht noch aus.",
          "Der Betriebsrat lehnt den Beschluss ab.",
          "Die Zahl der Beschäftigten ist unklar.",
        ],
        answer: 0,
        explain: "„vorbehaltlich der Zustimmung des Aufsichtsrats“ — karar alınmış görünüyor ama bir onaya bağlı.",
      },
      {
        kind: "gapfill",
        text: "Die entsprechenden Bestimmungen ___ zum 1. April in ___.",
        options: [],
        answer: 0,
        accept: ["treten … Kraft", "treten Kraft", "treten, Kraft"],
        explain: "in Kraft treten: işlev fiili öbeği tanımlık almaz ve parçaları cümlenin iki ucuna dağılır.",
      },
      {
        text: "Wie äußert der Betriebsrat seine Kritik?",
        options: [
          "Er lehnt den Beschluss ab.",
          "Er trägt ihn mit, bringt aber einen Einwand zum Ausdruck.",
          "Er verlangt eine neue Abstimmung.",
        ],
        answer: 1,
        explain: "„trägt den Beschluss mit, bringt jedoch zum Ausdruck, dass …“ — kabul ve itiraz aynı cümlede.",
      },
      {
        kind: "short_answer",
        text: "Was soll bis zur Sitzung des Aufsichtsrats unterbleiben?",
        options: [],
        answer: 0,
        accept: [
          "eine Ankündigung gegenüber der Presse",
          "die Presseankündigung",
          "Von einer Ankündigung gegenüber der Presse ist Abstand zu nehmen.",
        ],
        explain: "„Von einer Ankündigung gegenüber der Presse ist … Abstand zu nehmen.“",
      },
      {
        kind: "short_answer",
        text: "Der Text sagt nicht, dass 31 Personen gekündigt wird. Was sagt er genau?",
        options: [],
        answer: 0,
        accept: [
          "Umzug kommt nicht in Frage", "dass für sie ein Umzug nicht in Frage kommt",
          "sie sehen einen Umzug nicht als Option",
          "für sie kommt ein Umzug nicht in Frage",
        ],
        explain: "Kurum dili sonucu değil durumu bildiriyor: taşınmayı seçenek görmüyorlar. Sonuç okuyucunun çıkarımına bırakılmış.",
      },
    ],
  },
  {
    id: "c1-u01-r2",
    level: "C1",
    skill: "reading",
    unit: 1,
    title: "Antwort auf einen Förderantrag",
    genre: "formal",
    intro: "Bir destek başvurusuna yanıt. Onay mı, ret mi — ve nasıl söyleniyor?",
    gloss: [
      { de: "einreichen", tr: "teslim etmek", en: "to submit" },
      { de: "die Bewilligung", tr: "resmî onay", en: "approval" },
      { de: "in Anspruch nehmen", tr: "yararlanmak / zaman almak", en: "to make use of" },
      { de: "die Vollmacht", tr: "vekâletname", en: "power of attorney" },
      { de: "Rücksicht nehmen", tr: "gözetmek", en: "to show consideration" },
      { de: "relativieren", tr: "görecelileştirmek", en: "to qualify" },
      { de: "verbindlich", tr: "bağlayıcı", en: "binding" },
      { de: "positiv", tr: "olumlu", en: "positive" },
      { de: "hervorheben", tr: "vurgulamak", en: "to emphasize" },
      { de: "insbesondere", tr: "bilhassa", en: "in particular" },
      { de: "methodisch", tr: "yöntemsel", en: "methodological" },
      { de: "raten", tr: "tavsiye etmek", en: "to advise" },
      { de: "das Fach", tr: "ders", en: "subject" },
      { de: "die Einschätzung", tr: "değerlendirme", en: "assessment" },
      { de: "solche", tr: "böyle", en: "such" },
      { de: "sehen", tr: "görmek", en: "to see" },
      { de: "rechnen", tr: "hesaplamak", en: "to calculate" },
      { de: "erteilen", tr: "vermek", en: "to grant" },
    ],
    minutes: 7,
    text:
      "Sehr geehrte Frau Dr. Sarikaya,\n\n" +
      "vielen Dank für den von Ihnen am 3. März eingereichten Antrag auf Projektförderung.\n\n" +
      "Ihr Vorhaben hat in der Vorprüfung durchweg positive Rückmeldungen erhalten. Die Gutachter heben insbesondere die methodische Sorgfalt hervor. Gleichwohl können wir Ihnen zum jetzigen Zeitpunkt keine verbindliche Bewilligung in Aussicht stellen.\n\n" +
      "Der Grund liegt nicht in der Qualität des Antrags. Die für diese Förderlinie zur Verfügung stehenden Mittel sind für das laufende Jahr bereits vollständig gebunden. Eine Entscheidung über die Mittel des Folgejahres wird der Vergabeausschuss im Oktober treffen.\n\n" +
      "Wir möchten Ihre Zeit nicht unnötig in Anspruch nehmen und raten daher, den Antrag im Herbst unverändert erneut einzureichen. Eine erneute Vorprüfung wird dann nicht erforderlich sein.\n\n" +
      "Wir möchten die positive Vorprüfung an dieser Stelle ausdrücklich relativieren: Sie ist eine fachliche Einschätzung, keine Zusage. Der Vergabeausschuss ist an die dann verfügbaren Mittel gebunden, und wir können Ihnen zum jetzigen Zeitpunkt weder eine Rangfolge noch eine Wahrscheinlichkeit nennen.\n\n" +
      "Zu Ihrer Anfrage vom 18. März, ob eine Zwischenfinanzierung möglich sei: Eine solche ist in dieser Förderlinie nicht vorgesehen. Sofern Ihre Einrichtung eigene Mittel vorstreckt, können diese nachträglich nicht angerechnet werden.\n\n" +
      "Wir nehmen Rücksicht darauf, dass Ihre Planung an das Semester gebunden ist, und teilen Ihnen das Ergebnis der Oktobersitzung noch in derselben Woche mit, statt den regulären Bescheid abzuwarten.\n\n" +
      "Sollten Sie sich vertreten lassen wollen, reichen Sie bitte eine Vollmacht nach.\n\n" +
      "Für Rückfragen zum Verfahren steht Ihnen die Geschäftsstelle zur Verfügung; zur inhaltlichen Bewertung können wir vor der Ausschusssitzung keine Auskunft erteilen.\n\n" +
      "Mit freundlichen Grüßen\nDr. H. Bergmann, Vergabestelle",
    questions: [
      {
        text: "Wie lautet die Entscheidung?",
        options: [
          "Der Antrag ist abgelehnt.",
          "Der Antrag ist bewilligt.",
          "Es gibt vorerst keine verbindliche Zusage.",
        ],
        answer: 2,
        explain: "„keine verbindliche Bewilligung in Aussicht stellen“ — ret değil, ertelenmiş bir karar.",
      },
      {
        kind: "gapfill",
        text: "Wir möchten Ihre Zeit nicht unnötig ___ ___ ___.",
        options: [],
        answer: 0,
        accept: ["in Anspruch nehmen"],
        explain: "Kurum dilinde nezaket işlev fiili öbeğiyle kuruluyor; düz fiil („stehlen“, „kosten“) burada kaba düşerdi.",
      },
      {
        text: "Warum wird der Antrag nicht bewilligt?",
        options: [
          "Die Methodik überzeugt nicht.",
          "Die Mittel für dieses Jahr sind bereits vergeben.",
          "Die Vollmacht fehlt.",
        ],
        answer: 1,
        explain: "„Die … Mittel sind für das laufende Jahr bereits vollständig gebunden.“ Kalite gerekçe değil, bilerek ayrı cümlede belirtiliyor.",
      },
      {
        kind: "short_answer",
        text: "Welchen konkreten Rat gibt der Brief?",
        options: [],
        answer: 0,
        accept: [
          "im Herbst erneut einreichen",
          "den Antrag im Herbst unverändert erneut einzureichen",
          "den Antrag im Herbst noch einmal einreichen",
        ],
        explain: "„raten daher, den Antrag im Herbst unverändert erneut einzureichen“ — hem ret hem yol gösterme.",
      },
      {
        text: "Der Satz „Der Grund liegt nicht in der Qualität des Antrags“ dient dazu, die Absage zu relativieren.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "İfade doğru: cümle reddi yumuşatıyor, yani ret sebebini başvurudan ayırıyor.",
      },
    ],
  },
  {
    id: "c1-u01-l1",
    level: "C1",
    skill: "listening",
    unit: 1,
    title: "Einwand in der Sitzung",
    genre: "meeting",
    intro: "Bir toplantıda itiraz. Kim neyi reddediyor, kim yalnız erteliyor?",
    gloss: [
      { de: "der Einwand", tr: "itiraz", en: "objection" },
      { de: "die Zurückhaltung", tr: "çekimserlik", en: "restraint" },
      { de: "besonnen", tr: "soğukkanlı", en: "level-headed" },
      { de: "umsichtig", tr: "tedbirli", en: "prudent" },
      { de: "taktvoll", tr: "incelikli", en: "tactful" },
      { de: "der Vorbehalt", tr: "çekince", en: "reservation" },
      { de: "die Erwägung", tr: "değerlendirme", en: "consideration" },
      { de: "solche", tr: "böyle", en: "such" },
      { de: "formulieren", tr: "ifade etmek", en: "to phrase" },
      { de: "reif", tr: "olgun", en: "ripe" },
      { de: "die Sitzung", tr: "oturum", en: "session" },
      { de: "vertagen", tr: "ertelemek", en: "to adjourn" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Frau Kern", text: "Ich fasse zusammen: Wir starten im Mai mit dem neuen Verfahren. Gibt es Einwände?" },
      { speaker: "Herr Lutz", text: "Ich hätte da einen Einwand. Nicht gegen das Verfahren als solches — gegen den Zeitpunkt." },
      { speaker: "Frau Kern", text: "Bitte." },
      { speaker: "Herr Lutz", text: "Im Mai läuft die Zertifizierung. Zwei große Umstellungen gleichzeitig halte ich für nicht umsichtig." },
      { speaker: "Frau Bauer", text: "Bei allem Respekt: Wir verschieben das jetzt zum dritten Mal. Irgendwann ist Zurückhaltung auch keine Tugend mehr." },
      { speaker: "Herr Lutz", text: "Das nehme ich auf. Ich sage nicht nein, ich sage September." },
      { speaker: "Frau Kern", text: "Das war taktvoll formuliert, Herr Lutz, und es bleibt trotzdem ein Nein für Mai." },
      { speaker: "Herr Lutz", text: "Es ist ein Nein für Mai. Nach reiflicher Erwägung, nicht aus dem Bauch." },
      { speaker: "Frau Kern", text: "Herr Haas, Sie waren bisher sehr still." },
      { speaker: "Herr Haas", text: "Ich würde die Zahlen gern noch einmal in Ruhe ansehen, bevor ich mich festlege." },
      { speaker: "Frau Bauer", text: "Das heißt, Sie sind dagegen." },
      { speaker: "Herr Haas", text: "Das heißt, ich möchte es besonnen entscheiden und nicht in dieser Sitzung." },
      { speaker: "Frau Kern", text: "Gut. Dann vertagen wir mit dem Vorbehalt, dass bis Freitag die Zahlen vorliegen." },
    ],
    questions: [
      {
        text: "Wogegen richtet sich Herrn Lutz’ Einwand?",
        options: ["Gegen das Verfahren selbst", "Gegen den Zeitpunkt", "Gegen die Zertifizierung"],
        answer: 1,
        explain: "„Nicht gegen das Verfahren als solches — gegen den Zeitpunkt.“ C1'de itirazın KAPSAMI ayrıca belirtilir.",
      },
      {
        kind: "gapfill",
        text: "Ich ___ da einen Einwand.",
        options: [],
        answer: 0,
        accept: ["hätte"],
        explain: "Dilek kipi itirazı yumuşatıyor: „Ich habe einen Einwand“ karşı çıkma, „Ich hätte“ ise kapı aralama.",
      },
      {
        text: "Was macht Herr Haas wirklich?",
        options: [
          "Er lehnt den Vorschlag ab.",
          "Er stimmt zu.",
          "Er vermeidet eine Festlegung in dieser Sitzung.",
        ],
        answer: 2,
        explain: "Frau Bauer „dagegen“ diye okuyor ama o „nicht in dieser Sitzung“ diyor — ret değil erteleme.",
      },
      {
        kind: "dictation",
        text: "Frau Bauer'in çekimserliği eleştirdiği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "Irgendwann ist Zurückhaltung auch keine Tugend mehr.",
          "Irgendwann ist Zurückhaltung auch keine Tugend mehr",
        ],
        explain: "„Bei allem Respekt“ ile açılan sözün en sert cümlesi bu; kalıp sertliği taşımak için var.",
      },
    ],
  },
  {
    id: "c1-u01-l2",
    level: "C1",
    skill: "listening",
    unit: 1,
    title: "Der Entwurf für den Pausenraum",
    genre: "dialogue",
    intro: "Bölüm müdürü, yeni dinlenme odası taslağına kısa bir yanıt yazmış. İki meslektaş ne yapacaklarını konuşuyor.",
    gloss: [
      { de: "die Andeutung", tr: "ima", en: "hint" },
      { de: "unterschwellig", tr: "üstü örtük", en: "implicit" },
      { de: "heraushören", tr: "sezmek / tondan anlamak", en: "to detect in someone's tone" },
      { de: "nachvollziehen", tr: "anlamak / takip etmek", en: "to follow, to grasp" },
      { de: "die Schlussfolgerung", tr: "çıkarım", en: "conclusion" },
      { de: "die Perspektive", tr: "bakış açısı", en: "perspective" },
      { de: "an sich", tr: "esasen", en: "in itself" },
      { de: "in Frage kommen", tr: "söz konusu olmak", en: "to be an option" },
      { de: "der Entwurf", tr: "taslak", en: "draft" },
      { de: "der Pausenraum", tr: "dinlenme odası", en: "break room" },
      { de: "gebraucht", tr: "ikinci el", en: "second-hand" },
      { de: "der Betriebsrat", tr: "işyeri temsilciler kurulu", en: "works council" },
      { de: "die Summe", tr: "tutar", en: "sum" },
      { de: "die Schichtleitung", tr: "vardiya amirliği", en: "shift management" },
      { de: "verteidigen", tr: "savunmak", en: "to defend" },
      { de: "genau", tr: "tam olarak", en: "exactly" },
      { de: "senken", tr: "düşürmek", en: "to lower" },
      { de: "die Zahl", tr: "sayı", en: "number" },
      { de: "zahlen", tr: "ödemek", en: "to pay" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Nils", text: "Frau Brandt hat unseren Entwurf für den neuen Pausenraum zurückgeschickt. Sie schreibt: „Die Idee ist an sich überzeugend.“" },
      { speaker: "Elke", text: "Und dann?" },
      { speaker: "Nils", text: "„Nur bei den Kosten hätte ich noch Fragen.“ Mehr steht da nicht. Eigentlich klingt das doch gut, oder?" },
      { speaker: "Elke", text: "Ich höre da ein Aber heraus. Achtzehntausend für Möbel sind viel, und letztes Jahr hat sie die neue Küche im dritten Stock mit genau diesem Satz abgelehnt." },
      { speaker: "Nils", text: "Die Küche? Davon wusste ich nichts." },
      { speaker: "Elke", text: "Es gab keine Absage, nur eine Andeutung — und danach kam nie wieder etwas. So etwas steht bei ihr unterschwellig in jedem zweiten Satz." },
      { speaker: "Nils", text: "Dann sollten wir die Zahl nicht verteidigen, sondern senken. Die Sofas könnten wir gebraucht kaufen." },
      { speaker: "Elke", text: "Das spart gut sechstausend. Und die Kaffeemaschine zahlt der Betriebsrat, das hat er schon zugesagt." },
      { speaker: "Nils", text: "Dann liegen wir bei knapp zwölftausend. Kann sie das nachvollziehen, ohne dass wir ihr drei Seiten schicken?" },
      { speaker: "Elke", text: "Eine Tabelle, eine Seite. Und aus ihrer Perspektive geschrieben: Was kostet der Raum, und was spart er?" },
      { speaker: "Nils", text: "Was spart denn ein Pausenraum?" },
      { speaker: "Elke", text: "Wege. Die Schichtleitung sagt, die Leute laufen jeden Tag zum Bäcker gegenüber, und das kostet pro Person zwanzig Minuten." },
      { speaker: "Nils", text: "Die Schlussfolgerung ziehe ich aber nicht für sie. Ich schreibe die Zahlen hin und rufe sie morgen früh an." },
      { speaker: "Elke", text: "Gut. Frag sie direkt, welche Summe für sie in Frage kommt. Dann bleibt nichts Unausgesprochenes, nur eine Zahl." },
    ],
    questions: [
      {
        text: "Was hat Frau Brandt am Entwurf eigentlich auszusetzen?",
        options: [
          "Die Farbe der Möbel",
          "Den Zeitplan",
          "Die Kosten",
        ],
        answer: 2,
        explain: "„Nur bei den Kosten hätte ich noch Fragen.“ Övgünün ardındaki asıl çekince maliyet.",
      },
      {
        kind: "gapfill",
        text: "Ich höre da ein Aber ___.",
        options: [],
        answer: 0,
        accept: ["heraus"],
        explain: "Ayrılabilen ön ek cümlenin sonunda; heraushören yalnız duymayı değil sezmeyi anlatıyor.",
      },
      {
        text: "Wie wollen die beiden die Summe senken?",
        options: [
          "Mit einem kleineren Raum",
          "Mit weniger Pausen",
          "Mit gebrauchten Sofas und einem Beitrag des Betriebsrats",
        ],
        answer: 2,
        explain: "Kanepeler ikinci el alınacak, kahve makinesini işyeri temsilciler kurulu ödeyecek.",
      },
      {
        kind: "short_answer",
        text: "Was soll Nils Frau Brandt am Telefon fragen?",
        options: [],
        answer: 0,
        accept: [
          "welche Summe in Frage kommt",
          "welche Summe für sie in Frage kommt",
          "welche Summe",
          "wie viel sie ausgeben will",
        ],
        explain: "„Frag sie direkt, welche Summe für sie in Frage kommt.“",
      },
    ],
  },
  {
    id: "c1-u01-w1",
    level: "C1",
    skill: "writing",
    unit: 1,
    title: "Aus der Vorstandssitzung",
    genre: "grammar",
    intro: "Resmî dilde fiil boşalır, anlam isme geçer — ve öbek tanımlık almaz.",
    gloss: [
      { de: "in Frage kommen", tr: "söz konusu olmak", en: "to be an option" },
      { de: "in Kraft treten", tr: "yürürlüğe girmek", en: "to come into force" },
      { de: "in Anspruch nehmen", tr: "yararlanmak", en: "to make use of" },
      { de: "Abstand nehmen", tr: "vazgeçmek", en: "to refrain" },
      { de: "vorerst", tr: "şimdilik", en: "for now" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Bu seçenek bizim için söz konusu değil.",
        answer: "Diese Option kommt für uns nicht in Frage",
        hint: "Öbek tanımlıksızdır; olumsuzluk öbekten önce durur.",
      },
      {
        kind: "build",
        tr: "Yeni hüküm nisanda yürürlüğe giriyor.",
        answer: "Die neue Bestimmung tritt im April in Kraft",
        hint: "Çekimli fiil ikinci sırada, öbeğin ismi en sonda.",
      },
      {
        kind: "build",
        tr: "Bir dava açmaktan şimdilik vazgeçtik.",
        answer: "Von einer Klage haben wir vorerst Abstand genommen",
        hint: "Abstand nehmen von: vazgeçilen şey von ile bağlanır.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: öbeğe tanımlık eklenmiş.",
        source: "Diese Option kommt für uns nicht in die Frage.",
        answer: "Diese Option kommt für uns nicht in Frage.",
        alternatives: ["Diese Option kommt für uns nicht in Frage"],
        why: "İşlev fiili öbeğindeki isim tanımlık almaz. Tek sözcüklük ekleme cümleyi amatör gösterir ve bu ayrım C1'de ölçülür.",
      },
    ],
  },
  {
    id: "c1-u01-w2",
    level: "C1",
    skill: "writing",
    unit: 1,
    title: "Eine Absage, die niemanden verliert",
    genre: "formal",
    intro: "Reddet ama kapıyı kapatma: gerekçeyi kaliteden ayır, yol göster.",
    gloss: [
      { de: "relativieren", tr: "görecelileştirmek", en: "to qualify" },
      { de: "der Vorbehalt", tr: "çekince", en: "reservation" },
      { de: "verbindlich", tr: "bağlayıcı", en: "binding" },
      { de: "in Aussicht stellen", tr: "vaat etmek", en: "to hold out the prospect of" },
      { de: "die Bewilligung", tr: "onay", en: "approval" },
      { de: "hervorheben", tr: "vurgulamak", en: "to emphasize" },
      { de: "vorlegen", tr: "sunmak", en: "to submit" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "free",
        prompt:
          "Herr Böhm'ün önümüzdeki yarıyıl için gönderdiği iş birliği önerisine olumsuz ama kapıyı kapatmayan bir yanıt yaz. Kaliteyi ret gerekçesinden ayır, çekinceyi açıkça koy, somut bir yol göster ve en az bir işlev fiili öbeği kullan (in Frage kommen, zur Verfügung stehen, in Anspruch nehmen, Abstand nehmen).",
        checklist: [
          "Kaliteyi ret gerekçesinden ayırdın mı?",
          "Çekinceyi (neye bağlı olduğunu) açıkça yazdın mı?",
          "Somut bir sonraki adım verdin mi?",
          "En az bir işlev fiili öbeği kullandın mı, tanımlıksız?",
        ],
        minWords: 90,
        phrases: [
          { de: "Der Grund liegt nicht in der Qualität …", tr: "sebep kalitede değil", en: "the reason does not lie in the quality" },
          { de: "… können wir keine verbindliche Zusage in Aussicht stellen.", tr: "bağlayıcı bir söz veremiyoruz", en: "we cannot hold out the prospect of a binding commitment" },
          { de: "Wir möchten Ihre Zeit nicht in Anspruch nehmen.", tr: "vaktinizi almak istemiyoruz", en: "we do not wish to take up your time" },
        ],
        sample:
          "Sehr geehrter Herr Böhm,\n\n" +
          "vielen Dank für den von Ihnen eingereichten Vorschlag zur Zusammenarbeit im kommenden Halbjahr.\n\n" +
          "Ihr Konzept ist in der Sache überzeugend; die Gutachter heben die klare Struktur eigens hervor. Der Grund für unsere Rückmeldung liegt daher nicht in der Qualität des Vorschlags.\n\n" +
          "Zum jetzigen Zeitpunkt können wir Ihnen jedoch keine verbindliche Zusage in Aussicht stellen. Die für Kooperationen zur Verfügung stehenden Mittel sind für dieses Jahr gebunden; eine Entscheidung über das Folgejahr trifft der Ausschuss im Oktober. Von einer vorzeitigen Zusage nehmen wir bis dahin bewusst Abstand.\n\n" +
          "Wir möchten Ihre Zeit nicht unnötig in Anspruch nehmen und schlagen deshalb vor, den Vorschlag im Herbst unverändert erneut vorzulegen. Eine erneute Vorprüfung wäre dann nicht erforderlich.\n\n" +
          "Für Rückfragen stehe ich Ihnen gern zur Verfügung.\n\n" +
          "Mit freundlichen Grüßen\nA. Vogel",
      },
    ],
  },
];
