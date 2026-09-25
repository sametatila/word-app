import type { SkillExercise } from "../../types";

/**
 * DE · B2 — Beceriler kütüphanesi, parti 11.
 *
 * B2 hücresini YİRMİYE tamamlayan on partinin ilki. Kurallar ve emsal:
 * `de-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 11 turizm hattı: bir dizi yüzünden ünlenen bir köyün raporu, bir
 * turist rehberiyle radyo söyleşisi, bir tur operatörüne şikâyet. Dil bilgisi
 * edilgenin geçmiş zamanları — Perfekt ve Plusquamperfekt'te „worden“.
 */
export const deB2P11: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b2-lib-r11",
    course: "de",
    level: "B2",
    skill: "reading",
    title: "Wenn ein Dorf zur Kulisse wird",
    genre: "report",
    intro: "Bir televizyon dizisinden sonra günübirlik ziyaretçilerle dolan bir köyün raporu: ne değiştirildi, kim memnun, kim değil.",
    gloss: [
      { de: "die Kulisse", tr: "dekor", en: "scenery" },
      { de: "der Tagesgast", tr: "günübirlik ziyaretçi", en: "day visitor" },
      { de: "der Reiseveranstalter", tr: "tur operatörü", en: "tour operator" },
      { de: "sperren", tr: "kapatmak", en: "to close off" },
      { de: "die Einnahme", tr: "hasılat", en: "revenue" },
      { de: "der Gemeinderat", tr: "belediye meclisi", en: "municipal council" },
    ],
    minutes: 8,
    text:
      "Wenn ein Dorf zur Kulisse wird\n\n" +
      "Vor drei Jahren kannte kaum jemand Hollbach. Dann ist dort eine Fernsehserie gedreht " +
      "worden, und seitdem kommen an schönen Wochenenden bis zu viertausend Tagesgäste in " +
      "ein Dorf mit sechshundert Einwohnern.\n\n" +
      "Im ersten Sommer war man darauf nicht vorbereitet. Autos parkten in fremden Einfahrten, " +
      "Reisebusse blockierten die einzige Hauptstraße, und in manchen Gärten standen Fremde, " +
      "weil sie das Haus der Hauptfigur fotografieren wollten.\n\n" +
      "Inzwischen ist einiges geändert worden. Am Ortseingang ist ein Parkplatz eingerichtet " +
      "worden, der sechs Euro am Tag kostet. Die Dorfstraße ist für Busse gesperrt worden; " +
      "die Reiseveranstalter müssen ihre Gäste am Parkplatz aussteigen lassen. Von dort fährt " +
      "am Wochenende ein kleiner Bus in den Ort.\n\n" +
      "Nach einem Sommer fällt das Ergebnis gemischt aus. Der Verkehr im Ort hat spürbar " +
      "abgenommen, und die Einnahmen aus dem Parkplatz haben die Kosten für den Bus fast " +
      "gedeckt. Die Bäckerei und das einzige Gasthaus melden bessere Umsätze als je zuvor.\n\n" +
      "Unzufrieden sind vor allem die Bewohner der Straße, in der die Serie spielt. " +
      "„Uns ist versprochen worden, dass es ruhiger wird“, sagt eine Anwohnerin. " +
      "„Ruhiger ist es geworden, aber nur für die anderen.“ Ein Schild mit der Bitte, " +
      "nicht in die Gärten zu gehen, war schon im Juni zweimal gestohlen worden.\n\n" +
      "Der Gemeinderat will im Herbst über feste Besuchszeiten für diese Straße beraten. " +
      "Ob das rechtlich überhaupt möglich ist, ist noch nicht geklärt worden.",
    questions: [
      {
        text: "Warum kommen so viele Menschen nach Hollbach?",
        options: [
          "wegen des neuen Parkplatzes",
          "wegen eines großen Weinfests",
          "weil dort eine Serie gedreht wurde",
        ],
        answer: 2,
        explain: "„Dann ist dort eine Fernsehserie gedreht worden“ — ziyaretçiler o günden beri geliyor.",
      },
      {
        text: "Was müssen die Reiseveranstalter jetzt tun?",
        options: [
          "ihre Gäste am Parkplatz aussteigen lassen",
          "für jeden Gast eine Gebühr zahlen",
          "ihre Fahrten beim Gemeinderat anmelden",
        ],
        answer: 0,
        explain: "Köy yolu otobüslere kapatıldı; yolcular otoparkta inmek zorunda.",
      },
      {
        kind: "truefalse",
        text: "Die Einnahmen aus dem Parkplatz haben die Kosten für den Bus fast gedeckt.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Metin tam bunu söylüyor: otopark hasılatı otobüsün masrafını neredeyse karşılamış.",
      },
      {
        kind: "gapfill",
        text: "Der Parkplatz am Ortseingang kostet ___ Euro am Tag.",
        options: [],
        answer: 0,
        accept: ["sechs", "6"],
        explain: "„ein Parkplatz …, der sechs Euro am Tag kostet“.",
      },
      {
        kind: "short_answer",
        text: "Worüber will der Gemeinderat im Herbst beraten?",
        options: [],
        answer: 0,
        accept: ["über feste Besuchszeiten", "feste Besuchszeiten", "Besuchszeiten für die Straße", "Besuchszeiten", "feste Besuchszeiten für diese Straße", "über feste Besuchszeiten für diese Straße"],
        explain: "Dizinin geçtiği sokak için sabit ziyaret saatleri konuşulacak.",
      },
      {
        text: "Was meint die Anwohnerin mit „nur für die anderen“?",
        options: [
          "Das ganze Dorf ist lauter geworden.",
          "In ihrer Straße ist es nicht ruhiger geworden.",
          "Die Touristen fühlen sich im Dorf gestört.",
        ],
        answer: 1,
        explain: "Köyün geri kalanı rahatladı, ama dizinin geçtiği sokakta kalabalık sürüyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b2-lib-l11",
    course: "de",
    level: "B2",
    skill: "listening",
    title: "Führungen mit Kopfhörern",
    genre: "interview",
    intro: "Radyo söyleşisi: eski şehirde on beş yıldır tur yapan bir rehber, grupların küçülmesini ve kulaklıklı turları anlatıyor.",
    gloss: [
      { de: "die Führung", tr: "rehberli tur", en: "guided tour" },
      { de: "die Beschwerde", tr: "şikâyet", en: "complaint" },
      { de: "der Kopfhörer", tr: "kulaklık", en: "headphones" },
      { de: "der Vortrag", tr: "konuşma", en: "talk" },
      { de: "vermissen", tr: "özlemek", en: "to miss" },
      { de: "grüßen", tr: "selam vermek", en: "to greet" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Moderatorin", text: "Frau Albers, Sie führen seit fünfzehn Jahren Gruppen durch die Altstadt. Was hat sich in dieser Zeit am stärksten verändert?" },
      { speaker: "Frau Albers", text: "Die Größe der Gruppen. Früher hatte ich oft fünfzig Leute dabei, seit letztem Jahr sind höchstens zwanzig erlaubt. Das hat die Stadt nach vielen Beschwerden so entschieden." },
      { speaker: "Moderatorin", text: "Beschwerden von wem?" },
      { speaker: "Frau Albers", text: "Von den Leuten, die hier wohnen. Stellen Sie sich vor, vor Ihrem Schlafzimmerfenster bleiben jeden Tag zwölf Gruppen stehen, und alle erzählen dieselbe Geschichte, nur lauter." },
      { speaker: "Moderatorin", text: "Und wie haben Sie darauf reagiert?" },
      { speaker: "Frau Albers", text: "Wir arbeiten jetzt mit Kopfhörern. Ich spreche leise in ein Mikrofon, die Gäste hören mich trotzdem gut, und auf der Straße bleibt es ruhig." },
      { speaker: "Moderatorin", text: "Und die Gäste? Haben die sich nicht über die kleineren Gruppen beschwert?" },
      { speaker: "Frau Albers", text: "Am Anfang schon, weil der Preis gestiegen ist. Inzwischen buchen viele gerade deshalb bei uns: In einer kleinen Gruppe sieht man mehr und steht nicht ständig hinter jemandem." },
      { speaker: "Moderatorin", text: "Gibt es auch etwas, das Sie vermissen?" },
      { speaker: "Frau Albers", text: "Ehrlich gesagt, ja. Mit Kopfhörern stellen die Leute weniger Fragen. Die Führung wird zum Vortrag, und das Gespräch, das ich früher so geliebt habe, findet kaum noch statt." },
      { speaker: "Moderatorin", text: "Was raten Sie Menschen, die eine Stadt wirklich kennenlernen wollen?" },
      { speaker: "Frau Albers", text: "Früh aufstehen. Meine Führung um sieben Uhr morgens ist die schönste: keine Busse, offene Bäckereien, und die Bewohner grüßen einen noch." },
    ],
    questions: [
      {
        text: "Warum wurde die Größe der Gruppen begrenzt?",
        options: [
          "weil die Gäste es sich wünschten",
          "nach Beschwerden der Bewohner",
          "weil die Straßen zu eng wurden",
        ],
        answer: 1,
        explain: "„Das hat die Stadt nach vielen Beschwerden so entschieden“ — şikâyet edenler orada oturanlar.",
      },
      {
        text: "Wozu dienen die Kopfhörer vor allem?",
        options: [
          "Die Führung kann übersetzt werden.",
          "Mehr Gäste passen in eine Gruppe.",
          "Auf der Straße bleibt es ruhig.",
        ],
        answer: 2,
        explain: "Rehber mikrofona alçak sesle konuşuyor; „auf der Straße bleibt es ruhig“.",
      },
      {
        kind: "truefalse",
        text: "Frau Albers sieht an den Kopfhörern nur Vorteile.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Konuklar daha az soru soruyor ve eskiden sevdiği sohbet neredeyse kalmadı.",
      },
      {
        kind: "gapfill",
        text: "Heute sind höchstens ___ Personen pro Gruppe erlaubt.",
        options: [],
        answer: 0,
        accept: ["zwanzig", "20"],
        explain: "„seit letztem Jahr sind höchstens zwanzig erlaubt“.",
      },
      {
        kind: "short_answer",
        text: "Wann beginnt ihre schönste Führung?",
        options: [],
        answer: 0,
        accept: ["um sieben Uhr morgens", "um sieben Uhr", "um sieben", "sieben Uhr morgens", "morgens um sieben", "früh um sieben", "sieben Uhr"],
        explain: "„Meine Führung um sieben Uhr morgens ist die schönste.“",
      },
      {
        text: "Was vermisst Frau Albers?",
        options: [
          "das Gespräch mit den Gästen",
          "die großen Gruppen von früher",
          "die Busse am frühen Morgen",
        ],
        answer: 0,
        explain: "Tur bir konuşmaya dönüşüyor ve sevdiği sohbet artık neredeyse hiç olmuyor.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b2-lib-w11",
    course: "de",
    level: "B2",
    skill: "writing",
    title: "Beschwerde an den Reiseveranstalter",
    genre: "formal",
    intro: "Bir otobüs gezisinden döndün: önce iki cümle kur, sonra tur operatörüne gerekçeli ve ölçülü bir şikâyet yaz.",
    gloss: [
      { de: "die Ankündigung", tr: "duyuru", en: "announcement" },
      { de: "der Reiseveranstalter", tr: "tur operatörü", en: "tour operator" },
      { de: "der Prospekt", tr: "broşür", en: "brochure" },
      { de: "zusagen", tr: "söz vermek", en: "to promise" },
      { de: "erstatten", tr: "geri ödemek", en: "to reimburse" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Şato turu önceden duyurulmadan iptal edildi.",
        answer: "Die Führung durch das Schloss ist ohne Ankündigung abgesagt worden.",
        alternatives: ["Ohne Ankündigung ist die Führung durch das Schloss abgesagt worden."],
        hint: "Edilgen Perfekt: „ist“ + Partizip II + „worden“ — burada „geworden“ yanlış olur.",
      },
      {
        kind: "build",
        tr: "Bize otelin eski şehirde olduğu söz verilmişti.",
        answer: "Uns war zugesagt worden, dass das Hotel in der Altstadt liegt.",
        alternatives: ["Dass das Hotel in der Altstadt liegt, war uns zugesagt worden."],
        hint: "Başka bir geçmiş olaydan önce: Plusquamperfekt edilgen „war … zugesagt worden“.",
      },
      {
        kind: "free",
        prompt:
          "Bir otobüs gezisinden döndün. Tur operatörüne resmî bir şikâyet yaz: geziyi ve rezervasyonunu tanımla, programda neyin değiştirildiğini anlat, bunun sana neye mal olduğunu söyle, somut bir telafi iste ve bir süre ver.",
        checklist: [
          "Geziyi ve rezervasyon bilgisini ver",
          "Neyin değiştirildiğini edilgen geçmişle anlat",
          "Bunun sana neye mal olduğunu söyle",
          "Somut bir telafi iste ve bir süre ver",
        ],
        minWords: 120,
        phrases: [
          { de: "Vom … bis … habe ich an Ihrer Reise teilgenommen.", tr: "… ile … arasında gezinize katıldım.", en: "I took part in your trip from … to …" },
          { de: "Leider muss ich mich über … beschweren.", tr: "Maalesef … hakkında şikâyette bulunmam gerekiyor.", en: "Unfortunately I have to complain about …" },
          { de: "Darüber sind wir nicht informiert worden.", tr: "Bu konuda bilgilendirilmedik.", en: "We were not informed about this." },
          { de: "Ich bitte Sie deshalb, …", tr: "Bu yüzden sizden … rica ediyorum.", en: "I therefore ask you to …" },
          { de: "Ihrer Antwort sehe ich bis zum … entgegen.", tr: "… tarihine kadar yanıtınızı bekliyorum.", en: "I look forward to your reply by …" },
        ],
        sample:
          "Sehr geehrte Damen und Herren, vom 4. bis 8. Mai habe ich an Ihrer Busreise „Burgen am Rhein“ " +
          "teilgenommen, Buchungsnummer 20417. Leider muss ich mich über zwei Änderungen beschweren, " +
          "über die wir vorher nicht informiert worden sind. " +
          "Erstens ist die Schlossführung am dritten Tag ohne jede Ankündigung abgesagt worden, obwohl " +
          "sie im Prospekt als Höhepunkt der Reise beschrieben war. " +
          "Zweitens war uns bei der Buchung zugesagt worden, dass wir in der Altstadt wohnen. Tatsächlich " +
          "sind wir in einem Hotel an der Autobahn untergebracht worden, zwanzig Minuten vom Zentrum " +
          "entfernt, und abends fuhr dorthin kein Bus. Eine Erklärung haben wir weder vom Fahrer noch " +
          "von der Reiseleitung bekommen. " +
          "Damit sind genau die zwei Gründe weggefallen, aus denen ich diese Reise gebucht hatte. " +
          "Ich bitte Sie deshalb, mir dreißig Prozent des Reisepreises zu erstatten. " +
          "Ich habe Ihre Reisen bisher gern weiterempfohlen und würde das auch künftig gern tun. " +
          "Ihrer Antwort sehe ich bis zum 15. Juni entgegen. " +
          "Mit freundlichen Grüßen, Selin Arslan",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b2-lib-s11",
    course: "de",
    level: "B2",
    skill: "speaking",
    title: "Sollten beliebte Orte den Zugang begrenzen?",
    genre: "monologue",
    intro: "Bir dakikadan uzun tek başına konuşacaksın: bir sınırlamayı savun ya da reddet, ama bedelini kimin ödediğini unutma.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Çok ziyaret edilen yerler (eski şehirler, doğal alanlar) ziyaretçi sayısını sınırlamalı mı? Neyin tehlikede olduğunu adlandır, bir sınırlama biçimini değerlendir, adalet sorununu anlat ve kendi önerini söyle.",
      bulletsTr: [
        "Neyin tehlikede olduğunu adlandır",
        "Bir sınırlama biçimini değerlendir",
        "Kime karşı adaletsiz olacağını anlat",
        "Kendi önerini söyle",
      ],
      targets: [
        { de: "Auf dem Spiel steht hier nicht nur …, sondern auch …", tr: "Burada tehlikede olan yalnız … değil, … da" },
        { de: "Eine Obergrenze hätte den Vorteil, dass …", tr: "Bir üst sınırın avantajı … olurdu" },
        { de: "Ungerecht wäre das vor allem gegenüber …", tr: "Bu özellikle … karşı adaletsiz olurdu" },
        { de: "Mein Vorschlag wäre deshalb, …", tr: "Bu yüzden önerim … olurdu" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "Auf dem Spiel steht hier nicht nur die Ruhe der Bewohner, sondern auch das, was die Besucher " +
        "eigentlich sehen wollen. Eine Altstadt, durch die man sich nur noch im Strom der Gruppen schiebt, " +
        "ist keine Altstadt mehr, sondern eine Kulisse. " +
        "Eine Obergrenze hätte den Vorteil, dass man sie planen kann: Wer ein Zeitfenster bucht, weiß, " +
        "dass er nicht drei Stunden in der Schlange steht. " +
        "Ungerecht wäre das vor allem gegenüber Menschen, die spontan reisen oder sich teure Pakete nicht " +
        "leisten können, denn in der Praxis landen die Plätze schnell bei den großen Anbietern. " +
        "Mein Vorschlag wäre deshalb eine Mischung: Ein Teil der Plätze wird im Voraus vergeben, ein Teil " +
        "bleibt für Leute, die am selben Tag kommen, und Tagesgäste zahlen eine kleine Gebühr, deren " +
        "Einnahmen im Ort bleiben. So wird nicht der Besuch bestraft, sondern nur der Andrang gesteuert.",
      rubricHint:
        "Somut bir sınırlama biçimi ve adalet boyutu beklenir; „nicht nur … sondern auch“, Konjunktiv II („hätte den Vorteil“, „wäre“) ve edilgen kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b2-lib-g11",
    course: "de",
    level: "B2",
    skill: "grammar",
    title: "Der Parkplatz ist gebaut worden",
    genre: "grammar",
    intro: "Edilgenin geçmişte tamamlanmış hâli: „worden“ nereye gelir ve „geworden“dan farkı ne.",
    focus: "Passiv Perfekt ve Plusquamperfekt: ist … worden, war … worden",
    gloss: [
      { de: "sperren", tr: "kapatmak", en: "to close off" },
      { de: "benachrichtigen", tr: "haber vermek", en: "to notify" },
      { de: "absagen", tr: "iptal etmek", en: "to cancel" },
      { de: "das Schild", tr: "tabela", en: "sign" },
      { de: "die Ankunft", tr: "varış", en: "arrival" },
    ],
    minutes: 10,
    explanation: [
      {
        heading: "Perfekt: ist + Partizip + worden",
        tr: "Edilgenin Perfekt'i her zaman „sein“ ile kurulur, çünkü yardımcı fiil „werden“dir ve „werden“ Perfekt'te „sein“ alır. Cümlenin sonuna iki öge gelir: asıl fiilin Partizip II'si ve „worden“. Konuşmada geçmişteki edilgen çoğunlukla bu biçimle anlatılır; „wurde gebaut“ ise yazıda ve haberde daha sık görülür.",
        examples: [
          { de: "Der Parkplatz ist im Frühjahr gebaut worden.", tr: "Otopark ilkbaharda yapıldı.", note: "Perfekt edilgen" },
          { de: "Die Straße ist für Busse gesperrt worden.", tr: "Yol otobüslere kapatıldı.", note: "ist … gesperrt worden" },
          { de: "Sind die Gäste schon benachrichtigt worden?", tr: "Konuklara haber verildi mi?", note: "soruda da ikisi sonda" },
        ],
      },
      {
        heading: "worden mi, geworden mi?",
        tr: "„geworden“, „werden“ tam fiil olarak kullanıldığında gelir: bir şey OLMAK. Edilgende ise yardımcı fiilin Partizip'i ge- ön ekini düşürür ve „worden“ olur. Pratik ölçüt: yanında başka bir Partizip varsa „worden“, yoksa „geworden“.",
        examples: [
          { de: "Es ist im Dorf ruhiger geworden.", tr: "Köyde ortalık sakinleşti.", note: "tam fiil: olmak" },
          { de: "Für die Ruhe ist viel getan worden.", tr: "Sakinlik için çok şey yapıldı.", note: "edilgen: worden" },
          { de: "Sie ist Lehrerin geworden.", tr: "Öğretmen oldu.", note: "meslek → geworden" },
        ],
      },
      {
        heading: "Plusquamperfekt ve yan cümle",
        tr: "Başka bir geçmiş olaydan DAHA ÖNCE olmuş bir edilgen için „war … worden“ kullanılır. Yan cümlede çekimli „ist“ ya da „war“ en sona geçer ve üç parçalı bir fiil öbeği oluşur: „gesperrt worden ist“.",
        examples: [
          { de: "Das Schild war schon zweimal entfernt worden.", tr: "Tabela daha önce iki kez sökülmüştü.", note: "Plusquamperfekt" },
          { de: "Bei unserer Ankunft war die Führung schon abgesagt worden.", tr: "Vardığımızda tur çoktan iptal edilmişti.", note: "önceki olay" },
          { de: "Ich weiß nicht, ob die Straße schon gesperrt worden ist.", tr: "Yolun kapatılıp kapatılmadığını bilmiyorum.", note: "yan cümle: ist en sonda" },
        ],
      },
    ],
    questions: [
      {
        text: "Die Straße ___ für Busse gesperrt worden.",
        options: ["ist", "hat", "wird"],
        answer: 0,
        explain: "Edilgen Perfekt her zaman „sein“ ile kurulur: ist … gesperrt worden.",
      },
      {
        text: "Welcher Satz steht im Passiv Perfekt?",
        options: [
          "Es ist im Dorf ruhiger geworden.",
          "Der Parkplatz ist gebaut worden.",
          "Der Parkplatz wird gerade gebaut.",
        ],
        answer: 1,
        explain: "Partizip + „worden“ edilgen Perfekt'tir; „geworden“ tam fiil, „wird gebaut“ şimdiki zaman.",
      },
      {
        text: "„Die Führung war abgesagt worden.“ — Wann geschah die Absage?",
        options: [
          "im Moment des Sprechens",
          "nach einem anderen Ereignis",
          "vor einem anderen Ereignis",
        ],
        answer: 2,
        explain: "Plusquamperfekt, başka bir geçmiş olaydan daha önce olanı anlatır.",
      },
      {
        kind: "gapfill",
        text: "Die Gäste sind gestern benachrichtigt ___.",
        options: [],
        answer: 0,
        accept: ["worden"],
        explain: "Yanında Partizip var („benachrichtigt“), o yüzden „worden“ gelir.",
      },
      {
        kind: "gapfill",
        text: "Es ist in diesem Jahr viel ruhiger ___.",
        options: [],
        answer: 0,
        accept: ["geworden"],
        explain: "Burada „werden“ tam fiil (olmak); yanında Partizip yok, o yüzden „geworden“.",
      },
      {
        kind: "gapfill",
        text: "Die Führung ___ gestern abgesagt worden. (sein, Perfekt)",
        options: [],
        answer: 0,
        accept: ["ist"],
        explain: "Edilgen Perfekt'in yardımcı fiili „sein“dir: ist … abgesagt worden.",
      },
      {
        kind: "gapfill",
        text: "Bei unserer Ankunft ___ das Hotel schon verkauft worden. (sein, Plusquamperfekt)",
        options: [],
        answer: 0,
        accept: ["war"],
        explain: "Varıştan önce olmuş bir edilgen: war … verkauft worden.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Ich weiß nicht,", "ob", "die Straße", "gesperrt worden", "ist"],
        explain: "Yan cümlede çekimli „ist“ en sona gider: gesperrt worden ist.",
      },
      {
        kind: "truefalse",
        text: "„Der Parkplatz ist gebaut geworden.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Edilgende ge- düşer: doğrusu „Der Parkplatz ist gebaut worden.“",
      },
      {
        kind: "truefalse",
        text: "„Sind die Gäste schon benachrichtigt worden?“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Soruda „sind“ başa geçer, Partizip ve „worden“ sonda kalır.",
      },
    ],
  },
];
