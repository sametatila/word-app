import type { SkillExercise } from "../../types";

/**
 * DE · C1 — Beceriler kütüphanesi, parti 12.
 *
 * Hücreyi YİRMİYE tamamlayan partilerden biri (11–20). Kurallar ve emsal:
 * `de-c1.ts` (parti 1), `de-c1-p10.ts` ve `data/content/SPEC.md`.
 *
 * Parti 12 kültür kurumlarının ritüelleri hattı: bir köşe yazısı, bir
 * orkestra şefiyle söyleşi, bir şikâyete verilen cevap. Dil bilgisi
 * Konjunktiv I'in aktarım dışı kullanımları — es lebe, man nehme, es sei
 * darauf hingewiesen, gelte; B2'deki dolaylı aktarımdan ayrı bir iş.
 */
export const deC1P12: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-c1-lib-r12",
    course: "de",
    level: "C1",
    skill: "reading",
    title: "Der Applaus zwischen den Sätzen",
    genre: "opinion",
    intro: "Bir kültür köşe yazısı: klasik konserde bölümler arasında alkışlamak neden ayıp sayılıyor ve bu kural kime hizmet ediyor.",
    gloss: [
      { de: "der Satz", tr: "bölüm", en: "movement" },
      { de: "die Stille", tr: "sessizlik", en: "silence" },
      { de: "die Zurechtweisung", tr: "azarlama", en: "rebuke" },
      { de: "die Wucht", tr: "şiddet", en: "force" },
      { de: "voraussetzen", tr: "peşinen varsaymak", en: "to presuppose" },
      { de: "das Erkennungszeichen", tr: "tanınma işareti", en: "badge of recognition" },
    ],
    minutes: 10,
    text:
      "Der Applaus zwischen den Sätzen\n\n" +
      "Wer zum ersten Mal ein Sinfoniekonzert besucht, lernt die wichtigste Regel meist auf " +
      "die unangenehme Art: Nach dem ersten Satz klatscht er, und ringsum dreht sich eine " +
      "Reihe von Köpfen nach ihm um. Niemand sagt etwas, und gerade das macht die " +
      "Zurechtweisung so wirksam.\n\n" +
      "Dabei ist die Regel jünger, als ihre Verteidiger glauben. Noch im neunzehnten " +
      "Jahrhundert wurde zwischen den Sätzen geklatscht, gelegentlich sogar mitten hinein, " +
      "und mancher Komponist berichtete stolz, ein Satz sei so gut angekommen, dass man ihn " +
      "wiederholen musste. Die ehrfürchtige Stille, die heute als Ausdruck von Kennerschaft " +
      "gilt, hat sich erst im zwanzigsten Jahrhundert durchgesetzt.\n\n" +
      "Man kann dafür gute Gründe anführen. Ein Werk ist ein Ganzes, und der Bogen, den es " +
      "spannt, reicht über die Pausen hinweg. Wer nach einem leisen Schluss sofort klatscht, " +
      "zerstört einen Moment, den der Komponist womöglich bewusst gesetzt hat.\n\n" +
      "Nur betrifft dieses Argument einen Teil der Fälle, nicht alle. Es gibt erste Sätze, " +
      "die mit einer solchen Wucht enden, dass Schweigen danach fast unnatürlich wirkt; das " +
      "Publikum hält den Atem an, weil es muss, nicht weil es will.\n\n" +
      "Problematischer ist etwas anderes. Die Regel wird nirgends erklärt, sie wird " +
      "vorausgesetzt. Sie funktioniert deshalb weniger als Schutz der Musik denn als " +
      "Erkennungszeichen: Wer sie kennt, gehört dazu, wer sie nicht kennt, wird sichtbar. " +
      "Für Häuser, die jüngeres Publikum gewinnen wollen, ist dieser Preis zu hoch, als dass " +
      "man ihn einfach hinnehmen könnte.\n\n" +
      "Ein Vorschlag, der wenig kostet: ein einziger Satz im Programmheft, der die " +
      "Konvention benennt, statt sie stillschweigend zu verlangen. Wer dann trotzdem klatscht, " +
      "tut es wenigstens nicht mehr aus Unwissen.",
    questions: [
      {
        text: "Wie lernt ein Neuling die Regel meistens?",
        options: [
          "durch einen Hinweis im Programm",
          "durch die Blicke der anderen",
          "durch eine Ansage vor Beginn",
        ],
        answer: 1,
        explain: "Çevresindeki başlar ona dönüyor; kimse bir şey söylemiyor ama uyarı yerine ulaşıyor.",
      },
      {
        text: "Was sagt der Text über das Alter der Regel?",
        options: [
          "Sie ist jünger, als viele denken.",
          "Sie stammt aus dem 19. Jahrhundert.",
          "Sie geht auf die Komponisten zurück.",
        ],
        answer: 0,
        explain: "Kural ancak yirminci yüzyılda yerleşmiş: „jünger, als ihre Verteidiger glauben“.",
      },
      {
        kind: "truefalse",
        text: "Im neunzehnten Jahrhundert war Applaus zwischen den Sätzen verpönt.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Tam tersi: o dönemde bölümler arasında, hatta ortasında alkışlanıyordu.",
      },
      {
        kind: "gapfill",
        text: "Die ehrfürchtige Stille hat sich erst im ___ Jahrhundert durchgesetzt.",
        options: [],
        answer: 0,
        accept: ["zwanzigsten", "20."],
        explain: "„hat sich erst im zwanzigsten Jahrhundert durchgesetzt“.",
      },
      {
        kind: "short_answer",
        text: "Wie funktioniert die Regel laut Text eher als zum Schutz der Musik?",
        options: [],
        answer: 0,
        accept: ["als Erkennungszeichen", "Erkennungszeichen", "als Zeichen der Zugehörigkeit"],
        explain: "Bilen içeride sayılıyor, bilmeyen göze batıyor: kural bir tanınma işareti gibi çalışıyor.",
      },
      {
        text: "Was schlägt der Text vor?",
        options: [
          "das Klatschen ausdrücklich zu erlauben",
          "nur noch kurze Werke zu spielen",
          "die Konvention im Programmheft zu nennen",
        ],
        answer: 2,
        explain: "Programda tek bir cümleyle kuralı açıkça adlandırmayı öneriyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-c1-lib-l12",
    course: "de",
    level: "C1",
    skill: "listening",
    title: "Gespräch: Der Saal und seine Regeln",
    genre: "interview",
    intro: "Bir radyo söyleşisi: bir orkestra şefi salon kurallarını üç sezondur gevşeten konser dizisini ve bunun bedelini anlatıyor.",
    gloss: [
      { de: "die Dirigentin", tr: "orkestra şefi", en: "conductor" },
      { de: "lockern", tr: "gevşetmek", en: "to relax" },
      { de: "der Stammgast", tr: "müdavim", en: "regular" },
      { de: "der Mitschnitt", tr: "kayıt", en: "recording" },
      { de: "die Absprache", tr: "mutabakat", en: "arrangement" },
      { de: "abschrecken", tr: "caydırmak", en: "to deter" },
    ],
    minutes: 10,
    segments: [
      { speaker: "Herr Brenner", text: "Frau Albrecht, Ihr Orchester lockert seit drei Spielzeiten bei einer eigenen Konzertreihe die Regeln im Saal. Was heißt das konkret?" },
      { speaker: "Frau Albrecht", text: "Man darf klatschen, wann man möchte, man darf ein Getränk mit in den Saal nehmen, und die Konzerte dauern höchstens siebzig Minuten, ohne Pause." },
      { speaker: "Herr Brenner", text: "Viele Stammgäste empfinden das als Zumutung. Sie fürchten, dass die Aufmerksamkeit leidet und aus dem Konzertsaal eine Bar wird." },
      { speaker: "Frau Albrecht", text: "Die Sorge verstehe ich. Aber wer einmal einen Mitschnitt von einem gewöhnlichen Abend gehört hat, weiß, wie laut ein angeblich stilles Publikum ist: Husten, Bonbonpapier, raschelnde Programmhefte." },
      { speaker: "Frau Albrecht", text: "Die Stille, die wir verteidigen, ist also ohnehin eine Idealvorstellung. Die Frage ist nur, wer sich an ihr messen lassen muss." },
      { speaker: "Herr Brenner", text: "Und die Musikerinnen und Musiker? Stört es sie nicht, wenn nach einem leisen Schluss sofort geklatscht wird?" },
      { speaker: "Frau Albrecht", text: "Manche schon. Wir haben deshalb eine einfache Absprache getroffen: Bei Stücken, die leise enden, halte ich die Hände oben, bis der Klang verschwunden ist. Das versteht jeder sofort." },
      { speaker: "Herr Brenner", text: "Sie verzichten also nicht auf jede Regel, auch wenn es zunächst so klingt." },
      { speaker: "Frau Albrecht", text: "Nein. Ich verzichte auf Regeln, die niemand erklärt. Eine Regel, die man sehen kann, akzeptieren die Leute erstaunlich gern; eine, die man erraten muss, schreckt sie ab." },
      { speaker: "Herr Brenner", text: "Gibt es nach drei Spielzeiten schon Zahlen, die Ihre Entscheidung stützen?" },
      { speaker: "Frau Albrecht", text: "Etwa ein Drittel des Publikums dieser Reihe kommt zum ersten Mal in unser Haus, und jeder Fünfte davon kauft später auch Karten für die klassischen Abende." },
      { speaker: "Frau Albrecht", text: "Das ist noch kein Beweis, zumal wir die Zahlen selbst erheben. Aber es widerspricht der Befürchtung, dass wir das alte Publikum gegen ein neues eintauschen." },
    ],
    questions: [
      {
        text: "Was ist bei der neuen Reihe erlaubt?",
        options: [
          "Klatschen und ein Getränk im Saal",
          "Fotografieren und Telefonieren",
          "Zuspätkommen und leises Sprechen",
        ],
        answer: 0,
        explain: "İstenildiğinde alkışlamak ve salona içecek götürmek serbest.",
      },
      {
        text: "Womit zeigt Frau Albrecht, dass die Stille eine Idealvorstellung ist?",
        options: [
          "mit Beschwerden der Musiker",
          "mit Umfragen unter Stammgästen",
          "mit Mitschnitten normaler Abende",
        ],
        answer: 2,
        explain: "Sıradan bir akşamın kaydı öksürük ve kâğıt hışırtısıyla dolu.",
      },
      {
        kind: "truefalse",
        text: "Bei leisen Schlüssen hält die Dirigentin die Hände oben, bis der Klang verschwunden ist.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Müzisyenlerle yapılan anlaşma tam olarak bu: eller ses bitene kadar havada kalıyor.",
      },
      {
        kind: "gapfill",
        text: "Die Konzerte der neuen Reihe dauern höchstens ___ Minuten.",
        options: [],
        answer: 0,
        accept: ["siebzig", "70"],
        explain: "„die Konzerte dauern höchstens siebzig Minuten, ohne Pause“.",
      },
      {
        kind: "short_answer",
        text: "Auf welche Regeln verzichtet Frau Albrecht?",
        options: [],
        answer: 0,
        accept: ["auf Regeln, die niemand erklärt", "unerklärte Regeln", "Regeln, die niemand erklärt", "auf unerklärte Regeln", "Regeln, die man erraten muss"],
        explain: "Görülebilen kuralı kabul ediyor; kimsenin açıklamadığı kuraldan vazgeçiyor.",
      },
      {
        text: "Wie viele Besucher der Reihe kommen zum ersten Mal ins Haus?",
        options: ["etwa ein Fünftel", "etwa ein Drittel", "etwa die Hälfte"],
        answer: 1,
        explain: "Üçte biri ilk kez geliyor; beşte biri ise bunların arasından sonra klasik akşamlara bilet alıyor.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-c1-lib-w12",
    course: "de",
    level: "C1",
    skill: "writing",
    title: "Antwort auf eine Publikumsbeschwerde",
    genre: "letter",
    intro: "Bir konser salonu adına bir şikâyete cevap yazıyorsun: önce iki cümle kur, sonra şikâyeti ciddiye alan ama kararı savunan bir mektup yaz.",
    gloss: [
      { de: "die Beschwerde", tr: "şikâyet", en: "complaint" },
      { de: "das Abonnement", tr: "abonelik", en: "subscription" },
      { de: "der Ausgleich", tr: "telafi", en: "compensation" },
      { de: "übergehen", tr: "geçiştirmek", en: "to pass over" },
      { de: "kennzeichnen", tr: "işaretlemek", en: "to label" },
    ],
    minutes: 16,
    tasks: [
      {
        kind: "build",
        tr: "Ne olursa olsun, bu diziyi sürdürüyoruz.",
        answer: "Wie dem auch sei, wir halten an der Reihe fest.",
        alternatives: ["Wir halten an der Reihe fest, wie dem auch sei."],
        hint: "„wie dem auch sei“ Konjunktiv I ile kalıplaşmış bir imtiyaz öbeğidir; ardından ana cümle normal sırayla başlar.",
      },
      {
        kind: "build",
        tr: "Şu da hatırlatılsın: abonelerin yerleri bundan sonra ayrılmış kalacak.",
        answer: "Es sei darauf hingewiesen, dass die Plätze der Abonnenten künftig reserviert bleiben.",
        alternatives: ["Es sei darauf hingewiesen, dass künftig die Plätze der Abonnenten reserviert bleiben."],
        hint: "„es sei darauf hingewiesen“ resmî bir duyuru kalıbıdır: Konjunktiv I burada aktarım değil, bir bildirim ya da talimattır.",
      },
      {
        kind: "free",
        prompt:
          "Otuz yıllık bir abone, kuralları gevşetilen yeni konser dizisinden şikâyet ediyor: her bölümden sonra alkışlanmış, salonda içki içilmiş, kendi yerini bulamamış. Konser salonu adına cevap yaz: şikâyeti doğru özetle, haklı olduğu noktayı açıkça kabul et, diziyi gerekçesiyle savun, somut bir telafi öner ve kişisel bir kapanışla bitir.",
        checklist: [
          "Şikâyeti doğru ve kısa özetle",
          "Haklı olduğu noktayı açıkça kabul et",
          "Kararı gerekçesiyle savun",
          "Somut bir telafi öner ve kişisel bir kapanış yaz",
        ],
        minWords: 150,
        phrases: [
          { de: "Vielen Dank, dass Sie uns so offen schreiben.", tr: "Bize bu kadar açık yazdığınız için teşekkür ederiz.", en: "Thank you for writing to us so openly." },
          { de: "Ihren Zeilen entnehme ich, dass es Ihnen um … geht.", tr: "Satırlarınızdan meselenin … olduğunu anlıyorum.", en: "I gather from your lines that your concern is …" },
          { de: "In einem Punkt haben Sie ohne Einschränkung recht: …", tr: "Bir noktada kayıtsız şartsız haklısınız: …", en: "On one point you are entirely right: …" },
          { de: "Dass wir dennoch daran festhalten, hat einen Grund: …", tr: "Buna rağmen bunda ısrar etmemizin bir nedeni var: …", en: "That we are nevertheless sticking to it has a reason: …" },
          { de: "Als kleinen Ausgleich möchten wir Ihnen … anbieten.", tr: "Küçük bir telafi olarak size … sunmak isteriz.", en: "As a small compensation we would like to offer you …" },
        ],
        sample:
          "Sehr geehrte Frau Seeger, vielen Dank, dass Sie uns so offen schreiben — nach " +
          "dreißig Jahren im Abonnement haben Sie jedes Recht dazu. " +
          "Ihren Zeilen entnehme ich, dass es Ihnen weniger um das Klatschen selbst geht als um " +
          "den Eindruck, dass Ihr Haus Sie gegen ein anderes Publikum eintauscht. Sie fragen, " +
          "ob wir unser treues Publikum etwa nicht mehr wollen. Doch, und gerade Sie. " +
          "In einem Punkt haben Sie ohne Einschränkung recht: Wir haben die neue Reihe " +
          "angekündigt, ohne unseren Abonnentinnen und Abonnenten zu erklären, was sie dort " +
          "erwartet. Das Konzert war so voll, dass viele von Ihnen keinen gewohnten Platz " +
          "fanden, und wir hatten niemanden vorgewarnt. " +
          "Dass wir dennoch an der Reihe festhalten, hat einen Grund: Ein Drittel der Besucher " +
          "kommt dort zum ersten Mal zu uns, und manche von ihnen sitzen später in Ihren " +
          "Konzerten. Ihre Beschwerde übergehen wir trotzdem nicht: Wir werden die Reihe " +
          "im Spielplan deutlich kennzeichnen, und es sei darauf hingewiesen, dass die " +
          "Plätze der Abonnenten künftig reserviert bleiben. Wie dem auch sei, Sie sollen sich in " +
          "Ihrem Haus weiterhin zu Hause fühlen. " +
          "Als kleinen Ausgleich möchten wir Ihnen zwei Karten für ein Konzert Ihrer Wahl " +
          "anbieten. Ich würde mich freuen, Sie an diesem Abend persönlich zu begrüßen. " +
          "Mit freundlichen Grüßen, Jonas Weber, Publikumsdienst",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-c1-lib-s12",
    course: "de",
    level: "C1",
    skill: "speaking",
    title: "Sollten Kulturhäuser ihre Regeln lockern?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: bir kuralın kime hizmet ettiğini sorgula ve bir orta yol öner.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Tiyatro ve konser salonları gibi kültür kurumları yazılı olmayan davranış kurallarını gevşetmeli mi? Bir kural seç, kime hizmet ettiğini açıkla, kaldırılırsa ne kaybedileceğini dürüstçe söyle ve bir orta yol öner.",
      bulletsTr: [
        "Bir kural seç ve tanımla",
        "Kuralın kime hizmet ettiğini açıkla",
        "Kaldırılırsa kaybedilecek şeyi dürüstçe söyle",
        "Bir orta yol öner",
      ],
      targets: [
        { de: "Nehmen wir als Beispiel die Regel, dass …", tr: "Örnek olarak … kuralını alalım" },
        { de: "Sie dient weniger …, als vielmehr …", tr: "…'den çok …'e hizmet ediyor" },
        { de: "Verloren ginge dabei allerdings …", tr: "Bu durumda ise … kaybolurdu" },
        { de: "Ein Mittelweg könnte so aussehen, dass …", tr: "Bir orta yol şöyle olabilir: …" },
      ],
      minSeconds: 60,
      maxSeconds: 100,
      sampleDe:
        "Nehmen wir als Beispiel die Regel, dass Zuspätkommende im Theater bis zur Pause vor " +
        "der Tür warten müssen. " +
        "Sie dient weniger den Schauspielern, die ein leises Zuspätkommen kaum bemerken, als " +
        "vielmehr dem Publikum in den vorderen Reihen, das sich nicht stören lassen will. " +
        "Das ist ein berechtigtes Interesse, aber es trifft vor allem Menschen, die mit " +
        "Kindern, nach einer Schicht oder mit öffentlichen Verkehrsmitteln anreisen. " +
        "Verloren ginge bei einer Lockerung allerdings etwas, das man nicht unterschätzen " +
        "sollte: der gemeinsame Anfang, der Moment, in dem ein ganzer Saal zur selben Zeit " +
        "still wird. Diesen Moment kann man nicht nachholen, und wer ihn einmal erlebt hat, " +
        "versteht, warum manche so hartnäckig an der Regel festhalten. " +
        "Ein Mittelweg könnte so aussehen, dass es in jedem Saal einige Plätze am Rand gibt, " +
        "die man auch nach Beginn noch leise erreichen kann. " +
        "Das kostet ein paar Karten pro Abend und nimmt der Regel ihre Härte, ohne sie " +
        "abzuschaffen.",
      rubricHint:
        "Bir kuralın kime hizmet ettiğinin çözümlenmesi, kaybın dürüstçe kabulü ve somut bir orta yol beklenir; „weniger …, als vielmehr“, Konjunktiv II ve „so aussehen, dass“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-c1-lib-g12",
    course: "de",
    level: "C1",
    skill: "grammar",
    title: "Es lebe die Musik! Man beachte die Pause.",
    genre: "grammar",
    intro: "Konjunktiv I yalnız başkasının sözünü aktarmaz; dilek, talimat ve kural bildiren kalıplaşmış cümlelerde de yaşar.",
    focus: "Konjunktiv I dolaylı aktarım dışında: es lebe, man nehme, es sei darauf hingewiesen, gelte",
    gloss: [
      { de: "die Pause", tr: "ara", en: "pause" },
      { de: "der Schlussakkord", tr: "son akor", en: "final chord" },
      { de: "die Anmerkung", tr: "ek açıklama", en: "remark" },
      { de: "gestattet", tr: "izinli", en: "permitted" },
      { de: "die Aufnahme", tr: "kayıt", en: "recording" },
    ],
    minutes: 12,
    explanation: [
      {
        heading: "Dilek ve kutlama: es lebe, möge",
        tr: "Ana cümlede üçüncü tekil Konjunktiv I bir dilek ya da kutlama bildirir: „Es lebe die Musik!“ (Yaşasın müzik!), „Gott sei Dank“. Burada kimsenin sözü aktarılmaz; B2'deki dolaylı aktarımdan farkı budur: konuşan kendi dileğini söyler. „möge“ ile kurulan biçim resmî konuşmalarda ve kutlamalarda duyulur.",
        examples: [
          { de: "Es lebe die Musik!", tr: "Yaşasın müzik!", note: "kutlama" },
          { de: "Gott sei Dank hat niemand gehustet.", tr: "Çok şükür kimse öksürmedi.", note: "kalıp" },
          { de: "Der Abend möge lange in Erinnerung bleiben.", tr: "Bu akşam uzun süre hatırlansın.", note: "möge: resmî dilek" },
        ],
      },
      {
        heading: "Talimat: man nehme, man beachte",
        tr: "„man“ ile kurulan Konjunktiv I bir talimat verir: „Man nehme zwei Eier“ tarif dilinden bilinir. Resmî ve bilimsel metinde okuru yönlendirir: „Man beachte …“, „Man vergleiche Seite 12“. Emir kipinin kişisiz ve mesafeli karşılığıdır; kimseye doğrudan seslenmez.",
        examples: [
          { de: "Man beachte die lange Pause vor dem Schlussakkord.", tr: "Son akordan önceki uzun sessizliğe dikkat edilsin.", note: "okura talimat" },
          { de: "Man vergleiche dazu die Anmerkung im Programmheft.", tr: "Bunun için program kitapçığındaki nota bakılsın.", note: "gönderme" },
          { de: "Man nehme sich Zeit für den zweiten Satz.", tr: "İkinci bölüme zaman ayrılsın.", note: "tavsiye" },
        ],
      },
      {
        heading: "Duyuru, kural ve kalıplar: es sei darauf hingewiesen, gelte",
        tr: "Resmî duyurularda „Es sei darauf hingewiesen, dass …“ (şu hatırlatılır: …) kalıbı kullanılır. Bir kural ya da varsayım konurken de Konjunktiv I gelir: „Es gelte folgende Regel.“ Kalıplaşmış imtiyaz öbekleri de bu kiptendir: „wie dem auch sei“, „koste es, was es wolle“, „sei es …, sei es …“.",
        examples: [
          { de: "Es sei darauf hingewiesen, dass Aufnahmen nicht gestattet sind.", tr: "Kayıt yapılmasına izin verilmediği hatırlatılır.", note: "duyuru" },
          { de: "Für alle Konzerte gelte dieselbe Regel.", tr: "Bütün konserler için aynı kural geçerli olsun.", note: "kural koymak" },
          { de: "Sei es im Theater, sei es im Konzert: Die Pause gehört dazu.", tr: "İster tiyatroda ister konserde: ara işin parçasıdır.", note: "sei es … sei es" },
        ],
      },
    ],
    questions: [
      {
        text: "Welcher Satz gibt KEINE fremde Rede wieder?",
        options: [
          "Er sagte, der Saal sei voll.",
          "Es lebe die Musik!",
          "Sie meinte, sie komme später.",
        ],
        answer: 1,
        explain: "„Es lebe …“ konuşanın kendi dileğidir; öteki ikisi başkasının sözünü aktarır.",
      },
      {
        text: "„Man beachte die Pause vor dem Schluss.“ — Was drückt der Satz aus?",
        options: ["eine Vermutung", "eine Frage", "eine Anweisung an den Leser"],
        answer: 2,
        explain: "„man“ + Konjunktiv I okura kişisiz bir talimat verir.",
      },
      {
        text: "Welche Form ist richtig?",
        options: [
          "Es sei darauf hingewiesen, dass …",
          "Es ist darauf hinweisen, dass …",
          "Es wäre darauf hingewiesen, dass …",
        ],
        answer: 0,
        explain: "Kalıp Konjunktiv I ile kurulur: es sei darauf hingewiesen.",
      },
      {
        kind: "gapfill",
        text: "Es ___ die Musik! (leben, Konjunktiv I)",
        options: [],
        answer: 0,
        accept: ["lebe"],
        explain: "Üçüncü tekil Konjunktiv I kök + -e ile kurulur: lebe.",
      },
      {
        kind: "gapfill",
        text: "Man ___ dazu die Anmerkung im Programmheft. (vergleichen, Konjunktiv I)",
        options: [],
        answer: 0,
        accept: ["vergleiche"],
        explain: "Okuru bir yere gönderen talimat: man vergleiche.",
      },
      {
        kind: "gapfill",
        text: "Für alle Konzerte ___ dieselbe Regel. (gelten, Konjunktiv I)",
        options: [],
        answer: 0,
        accept: ["gelte"],
        explain: "Bir kural konurken Konjunktiv I gelir; ünlü değişmez: gelte, gilt değil.",
      },
      {
        kind: "gapfill",
        text: "Wie dem auch ___, wir halten an der Reihe fest. (sein, Konjunktiv I)",
        options: [],
        answer: 0,
        accept: ["sei"],
        explain: "„wie dem auch sei“ Konjunktiv I ile kalıplaşmış bir imtiyaz öbeğidir.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Es", "sei", "darauf", "hingewiesen", "dass Aufnahmen nicht gestattet sind"],
        explain: "Kalıp „es sei … hingewiesen“ ile kurulur; „dass“ cümlesi en sonda durur.",
      },
      {
        kind: "truefalse",
        text: "In „Es lebe die Musik!“ wird die Rede einer anderen Person wiedergegeben.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Burada aktarım yok; Konjunktiv I bir dilek ya da kutlama bildirir.",
      },
      {
        kind: "truefalse",
        text: "„Man nehme …“ ist eine unpersönliche, distanzierte Form der Aufforderung.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Kimseye doğrudan seslenmeden talimat verir; emir kipinin mesafeli karşılığıdır.",
      },
    ],
  },
];
