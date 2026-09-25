import type { SkillExercise } from "../../types";

/**
 * DE · B2 — Beceriler kütüphanesi, parti 16.
 *
 * B2 hücresini YİRMİYE tamamlayan on partiden biri. Kurallar ve emsal:
 * `de-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 16 para ve sözleşme hattı: "şimdi al, sonra öde" üzerine bir rehber,
 * radyoda tüketici hattı, taksitle telefon almak isteyen bir kuzene e-posta.
 * Dil bilgisi koşul bağlaçları — falls, sofern, vorausgesetzt ve es sei denn.
 */
export const deB2P16: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b2-lib-r16",
    course: "de",
    level: "B2",
    skill: "reading",
    title: "Jetzt kaufen, später zahlen",
    genre: "guide",
    intro: "Bir rehber metin: internette „sonra öde“ seçeneği ne zaman gerçekten bedava, asıl risk nerede.",
    gloss: [
      { de: "die Frist", tr: "son tarih", en: "deadline" },
      { de: "die Mahnung", tr: "ihtar", en: "payment reminder" },
      { de: "die Gebühr", tr: "ücret", en: "fee" },
      { de: "fällig", tr: "vadesi gelmiş", en: "due" },
      { de: "der Überblick", tr: "genel bakış", en: "overview" },
      { de: "vertraulich", tr: "gizli", en: "confidential" },
    ],
    minutes: 8,
    text:
      "Jetzt kaufen, später zahlen\n\n" +
      "Beim Einkaufen im Netz erscheint an der Kasse immer häufiger ein verlockendes Angebot: " +
      "Man bestellt heute und bezahlt in dreißig Tagen, ohne Zinsen. Das klingt nach einem kleinen " +
      "Kredit, der nichts kostet. Und das stimmt auch — allerdings nur, sofern alles nach Plan läuft.\n\n" +
      "Wer innerhalb der Frist bezahlt, zahlt tatsächlich keinen Cent mehr. Falls man die Frist " +
      "jedoch verpasst, wird es schnell teuer: Nach der ersten Mahnung kommen Gebühren von bis zu " +
      "zehn Euro dazu, und nach der zweiten gibt der Anbieter die Forderung häufig an ein " +
      "Inkassobüro weiter.\n\n" +
      "Das eigentliche Risiko liegt aber woanders. Weil der Betrag erst später fällig wird, fühlt " +
      "sich der Kauf nicht wie eine Ausgabe an. Verbraucherberatungen berichten von jungen Leuten, " +
      "die fünf oder sechs solcher Käufe gleichzeitig offen hatten und den Überblick verloren " +
      "haben: jeder einzelne harmlos, alle zusammen ein Monatsgehalt.\n\n" +
      "Drei Regeln helfen.\n\n" +
      "Erstens: Nutzen Sie den späteren Termin nur, vorausgesetzt, Sie könnten den Betrag auch " +
      "heute schon bezahlen.\n\n" +
      "Zweitens: Tragen Sie jedes Datum sofort in Ihren Kalender ein, es sei denn, Sie haben " +
      "bereits eine automatische Zahlung eingerichtet.\n\n" +
      "Drittens: Mehr als ein offener Kauf zur gleichen Zeit ist ein Warnzeichen.\n\n" +
      "Für den Fall, dass Sie den Überblick bereits verloren haben, gibt es Schuldnerberatungen. " +
      "Sie sind kostenlos und vertraulich.",
    questions: [
      {
        text: "Wann kostet der spätere Kauf wirklich nichts?",
        options: [
          "wenn man innerhalb der Frist bezahlt",
          "wenn man mehr als zehn Euro ausgibt",
          "wenn man die erste Mahnung abwartet",
        ],
        answer: 0,
        explain: "„Wer innerhalb der Frist bezahlt, zahlt tatsächlich keinen Cent mehr.“",
      },
      {
        text: "Worin liegt laut Text das eigentliche Risiko?",
        options: [
          "in hohen Zinsen ab dem ersten Tag",
          "in unsicheren Daten beim Bezahlen",
          "im fehlenden Überblick über die Käufe",
        ],
        answer: 2,
        explain: "Ödeme sonra geldiği için alışveriş harcama gibi hissettirmiyor ve birikince insan hesabı kaçırıyor.",
      },
      {
        kind: "truefalse",
        text: "Nach der ersten Mahnung können Gebühren dazukommen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Nach der ersten Mahnung kommen Gebühren von bis zu zehn Euro dazu.“",
      },
      {
        kind: "gapfill",
        text: "Man bestellt heute und bezahlt in ___ Tagen, ohne Zinsen.",
        options: [],
        answer: 0,
        accept: ["dreißig", "30"],
        explain: "„bezahlt in dreißig Tagen, ohne Zinsen“.",
      },
      {
        kind: "short_answer",
        text: "Wo bekommt man Hilfe, wenn man den Überblick verloren hat?",
        options: [],
        answer: 0,
        accept: ["bei einer Schuldnerberatung", "Schuldnerberatung", "bei der Schuldnerberatung"],
        explain: "Borç danışmanlıkları ücretsiz ve gizli yardım veriyor.",
      },
      {
        text: "Was ist laut Text ein Warnzeichen?",
        options: [
          "ein einzelner Kauf über zehn Euro",
          "mehr als ein offener Kauf gleichzeitig",
          "eine automatische Zahlung vom Konto",
        ],
        answer: 1,
        explain: "Üçüncü kural: aynı anda birden fazla açık alışveriş bir uyarı işareti.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b2-lib-l16",
    course: "de",
    level: "B2",
    skill: "listening",
    title: "Das Verbrauchertelefon",
    genre: "interview",
    intro: "Radyoda tüketici hattı: bir hukukçu, geri ödenmeyen bir borç ve iade edilmeyen bir depozito için dinleyicilere yol gösteriyor.",
    gloss: [
      { de: "leihen", tr: "ödünç vermek", en: "to lend" },
      { de: "das Darlehen", tr: "kredi", en: "loan" },
      { de: "beweisen", tr: "kanıtlamak", en: "to prove" },
      { de: "überweisen", tr: "havale etmek", en: "to transfer" },
      { de: "die Kaution", tr: "depozito", en: "deposit" },
      { de: "der Vermieter", tr: "ev sahibi", en: "landlord" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Moderator", text: "Willkommen zum Verbrauchertelefon. Heute bei uns im Studio ist die Juristin Frau Brückner. Die erste Anruferin ist Frau Aksoy. Bitte sehr!" },
      { speaker: "Frau Aksoy", text: "Ich habe einem Freund vor einem Jahr zweitausend Euro geliehen. Er wollte es nach drei Monaten zurückzahlen, aber bis heute ist nichts gekommen. Einen Vertrag haben wir nicht." },
      { speaker: "Frau Brückner", text: "Das ist leider häufig. Auch ohne schriftlichen Vertrag ist ein Darlehen gültig, vorausgesetzt, Sie können es beweisen. Haben Sie das Geld überwiesen?" },
      { speaker: "Frau Aksoy", text: "Ja, und als Verwendungszweck steht sogar „Darlehen“ auf der Überweisung." },
      { speaker: "Frau Brückner", text: "Sehr gut, das hilft Ihnen. Schreiben Sie ihm eine Nachricht mit einer klaren Frist, zum Beispiel vierzehn Tage." },
      { speaker: "Frau Brückner", text: "Falls er dann nicht zahlt, können Sie beim Gericht einen Mahnbescheid beantragen. Das geht online und kostet nicht viel." },
      { speaker: "Moderator", text: "Danke. Unser zweiter Anrufer ist Herr Lang." },
      { speaker: "Herr Lang", text: "Ich bin vor sechs Monaten ausgezogen, und der Vermieter hat mir die Kaution noch nicht zurückgezahlt. Er sagt, er müsse zuerst die Nebenkosten abrechnen." },
      { speaker: "Frau Brückner", text: "Das darf er grundsätzlich, aber nicht mit dem ganzen Betrag. Er darf nur einen Teil behalten, sofern eine Nachzahlung realistisch ist." },
      { speaker: "Frau Brückner", text: "Den Rest muss er auszahlen, es sei denn, es gibt Schäden in der Wohnung." },
      { speaker: "Herr Lang", text: "Schäden gab es keine. Das steht auch so im Übergabeprotokoll." },
      { speaker: "Frau Brückner", text: "Dann fordern Sie den Rest schriftlich an, wieder mit einer Frist, und legen Sie eine Kopie des Protokolls bei." },
    ],
    questions: [
      {
        text: "Warum ist Frau Aksoys Lage besser, als sie denkt?",
        options: [
          "weil ihr Freund schon einen Teil gezahlt hat",
          "weil sie die Überweisung beweisen kann",
          "weil sie doch einen schriftlichen Vertrag hat",
        ],
        answer: 1,
        explain: "Sözleşme olmasa da borç kanıtlanabiliyorsa geçerli; havalede „Darlehen“ yazıyor.",
      },
      {
        text: "Was soll Frau Aksoy als Erstes tun?",
        options: [
          "eine klare Frist setzen",
          "sofort zum Gericht gehen",
          "einen Anwalt beauftragen",
        ],
        answer: 0,
        explain: "Önce açık bir süre veren bir mesaj; ödeme gelmezse mahkemeden ödeme emri.",
      },
      {
        kind: "truefalse",
        text: "Ein Darlehen ohne schriftlichen Vertrag ist ungültig.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Auch ohne schriftlichen Vertrag ist ein Darlehen gültig“ — yeter ki kanıtlanabilsin.",
      },
      {
        kind: "gapfill",
        text: "Herr Lang ist vor ___ Monaten ausgezogen.",
        options: [],
        answer: 0,
        accept: ["sechs", "6"],
        explain: "„Ich bin vor sechs Monaten ausgezogen.“",
      },
      {
        kind: "short_answer",
        text: "Was soll Herr Lang seinem Schreiben beilegen?",
        options: [],
        answer: 0,
        accept: ["eine Kopie des Protokolls", "das Übergabeprotokoll", "das Protokoll"],
        explain: "Hasar olmadığını gösteren teslim tutanağının bir kopyası.",
      },
      {
        text: "Was darf der Vermieter von Herrn Lang?",
        options: [
          "die ganze Kaution für sich behalten",
          "keinen einzigen Euro mehr behalten",
          "einen Teil für Nebenkosten behalten",
        ],
        answer: 2,
        explain: "Yan gider farkı gerçekçiyse yalnız bir kısmını tutabilir; gerisini ödemek zorunda.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b2-lib-w16",
    course: "de",
    level: "B2",
    skill: "writing",
    title: "Ein Handy auf Raten?",
    genre: "email",
    intro: "Kuzenin taksitle telefon almak istiyor: önce iki cümle kur, sonra samimi ama dürüst bir tavsiye e-postası yaz.",
    gloss: [
      { de: "die Rate", tr: "taksit", en: "installment" },
      { de: "die Gebühr", tr: "ücret", en: "fee" },
      { de: "die Mahnung", tr: "ihtar", en: "payment reminder" },
      { de: "gebraucht", tr: "ikinci el", en: "used" },
      { de: "sparen", tr: "biriktirmek", en: "to save" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Taksitleri rahatça ödeyebildiğin sürece bu sorun değil.",
        answer: "Das ist kein Problem, sofern du die Raten locker bezahlen kannst.",
        alternatives: ["Sofern du die Raten locker bezahlen kannst, ist das kein Problem."],
        hint: "„sofern“ sınırlayıcı bir koşul bildirir ve yan cümle kurar: çekimli fiil en sonda.",
      },
      {
        kind: "build",
        tr: "Bir taksiti kaçırırsan ek ücret ödersin.",
        answer: "Falls du eine Rate verpasst, zahlst du eine Gebühr.",
        alternatives: ["Du zahlst eine Gebühr, falls du eine Rate verpasst."],
        hint: "„falls“ yan cümlesi başa gelirse ana cümle fiille başlar: „…, zahlst du“.",
      },
      {
        kind: "free",
        prompt:
          "Kuzenin Deniz yeni bir telefonu taksitle almak istiyor ve fikrini soruyor. Ona samimi bir e-posta yaz: isteğini anlayışla karşıla, hangi koşulda sorun olmadığını söyle, bir riski somut bir örnekle anlat, bir seçenek öner ve kararı ona bırak.",
        checklist: [
          "İsteğini anlayışla karşıla",
          "Hangi koşulda sorun olmadığını söyle",
          "Bir riski somut bir örnekle anlat",
          "Bir seçenek öner ve kararı ona bırak",
        ],
        minWords: 120,
        phrases: [
          { de: "Ich verstehe gut, dass …", tr: "…'i çok iyi anlıyorum.", en: "I understand very well that …" },
          { de: "Grundsätzlich ist das kein Problem, sofern …", tr: "… olduğu sürece aslında sorun yok.", en: "Basically, that is no problem as long as …" },
          { de: "Ein Risiko solltest du aber kennen: …", tr: "Ama bir riski bilmelisin: …", en: "But there is one risk you should know about: …" },
          { de: "An deiner Stelle würde ich …", tr: "Senin yerinde olsam … yapardım.", en: "If I were you, I would …" },
          { de: "Am Ende ist es natürlich deine Entscheidung.", tr: "Sonuçta karar elbette senin.", en: "In the end, of course, it is your decision." },
        ],
        sample:
          "Hallo Deniz, danke für deine Nachricht! Ich verstehe gut, dass du ein neues Handy willst, dein altes " +
          "hat ja schon einiges mitgemacht. " +
          "Grundsätzlich ist ein Ratenkauf kein Problem, sofern du die Raten locker bezahlen kannst, also auch " +
          "in einem Monat, in dem du im Café weniger Schichten bekommst. Rechne das vorher einmal ehrlich durch. " +
          "Ein Risiko solltest du aber kennen: Wenn du auch nur eine Rate verpasst, kostet das sofort eine Gebühr, " +
          "und nach der zweiten Mahnung wird es richtig unangenehm. Einer Freundin von mir ist genau das passiert; " +
          "am Ende hat ihr Handy fast hundert Euro mehr gekostet als im Laden. " +
          "An deiner Stelle würde ich noch drei Monate sparen und das Gerät dann direkt kaufen, es sei denn, dein " +
          "altes gibt vorher ganz den Geist auf. Vielleicht findest du auch ein gutes gebrauchtes Modell. " +
          "Am Ende ist es natürlich deine Entscheidung. Melde dich, wenn wir zusammen rechnen sollen! " +
          "Liebe Grüße, Aylin",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b2-lib-s16",
    course: "de",
    level: "B2",
    skill: "speaking",
    title: "Freunden Geld leihen?",
    genre: "monologue",
    intro: "Bir dakikadan uzun tek başına konuşacaksın: kendi kuralını söyle, hangi koşulla ve hangi istisnayla borç verdiğini gerekçelendir.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Arkadaşlara ya da akrabalara borç para verilmeli mi? Kendi kuralını söyle, hangi koşulda borç verdiğini açıkla, bir örnekle destekle ve kuralının istisnasını söyle.",
      bulletsTr: [
        "Kendi kuralını söyle",
        "Hangi koşulda borç verdiğini açıkla",
        "Bir örnekle destekle",
        "Kuralının istisnasını söyle",
      ],
      targets: [
        { de: "Ich leihe Freunden Geld, sofern …", tr: "… olduğu sürece arkadaşlara borç veririm" },
        { de: "Vorausgesetzt, …, ist das für mich kein Problem.", tr: "Yeter ki …, bu benim için sorun değil" },
        { de: "Mir ist einmal passiert, dass …", tr: "Bir keresinde başıma … geldi" },
        { de: "…, es sei denn, …", tr: "… olmadıkça …" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "Ich leihe Freunden Geld, sofern ich den Betrag notfalls auch verschenken könnte. Das ist meine einzige " +
        "feste Regel, und sie hat mir schon viel Ärger erspart. Wer Geld verleiht, das er selbst dringend braucht, " +
        "riskiert nämlich nicht nur das Geld, sondern auch die Freundschaft. " +
        "Mir ist einmal passiert, dass ich einem Mitbewohner dreihundert Euro für einen Umzugswagen geliehen habe. " +
        "Er hat alles zurückgezahlt, aber erst nach einem Jahr, und in dieser Zeit habe ich jedes Mal an das Geld " +
        "gedacht, wenn er sich etwas Neues gekauft hat. " +
        "Seitdem mache ich es anders: Vorausgesetzt, wir schreiben kurz auf, bis wann das Geld zurückkommt, ist ein " +
        "Darlehen unter Freunden für mich kein Problem. Das ist nicht unhöflich, sondern ehrlich. " +
        "Größere Summen verleihe ich dagegen nicht, es sei denn, jemand ist wirklich in Not, etwa nach einem " +
        "Unfall. Dann frage ich nicht nach Regeln.",
      rubricHint:
        "Açık bir kural, bir koşul, somut bir örnek ve bir istisna beklenir; „sofern“, „vorausgesetzt“, „es sei denn“ ve Konjunktiv II kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b2-lib-g16",
    course: "de",
    level: "B2",
    skill: "grammar",
    title: "falls, sofern, es sei denn",
    genre: "grammar",
    intro: "„wenn“ tek koşul bağlacı değil: olasılık, sınır, şart ve istisna için dört ayrı araç ve her birinin dizilişi.",
    focus: "Koşul bağlaçları: falls, sofern, vorausgesetzt (dass), es sei denn",
    gloss: [
      { de: "die Rate", tr: "taksit", en: "installment" },
      { de: "die Gebühr", tr: "ücret", en: "fee" },
      { de: "leihen", tr: "ödünç vermek", en: "to lend" },
      { de: "die Kaution", tr: "depozito", en: "deposit" },
      { de: "der Schaden", tr: "hasar", en: "damage" },
    ],
    minutes: 10,
    explanation: [
      {
        heading: "falls ve sofern",
        tr: "„falls“ bir olasılığı koşul yapar (… olursa; belki olur, belki olmaz). „sofern“ ise sınırlayıcı bir koşuldur (… olduğu sürece). İkisi de „wenn“ gibi yan cümle kurar: çekimli fiil en sona gider. Yan cümle başa gelirse ana cümle fiille başlar.",
        examples: [
          { de: "Falls du eine Rate verpasst, zahlst du eine Gebühr.", tr: "Bir taksiti kaçırırsan ücret ödersin.", note: "falls: olasılık" },
          { de: "Sofern alles pünktlich bezahlt wird, entstehen keine Kosten.", tr: "Her şey zamanında ödendiği sürece masraf çıkmaz.", note: "sofern: sınır" },
          { de: "Ruf mich an, falls es Probleme gibt.", tr: "Sorun çıkarsa beni ara.", note: "ana cümle önde" },
        ],
      },
      {
        heading: "vorausgesetzt (, dass)",
        tr: "„vorausgesetzt, dass …“ koşulu açıkça bir şart olarak koyar (… şartıyla). „dass“ düşebilir; o zaman arkasından gelen cümle DÜZ sıradadır ve fiil sona gitmez. İki durumda da „vorausgesetzt“tan sonra virgül gelir.",
        examples: [
          { de: "Ich leihe dir das Geld, vorausgesetzt, dass du es bis Mai zurückzahlst.", tr: "Mayısa kadar geri ödemen şartıyla sana parayı ödünç veririm.", note: "dass: fiil sonda" },
          { de: "Ich leihe dir das Geld, vorausgesetzt, du zahlst es bis Mai zurück.", tr: "Mayısa kadar geri ödemen şartıyla sana parayı ödünç veririm.", note: "dass yok: düz sıra" },
          { de: "Der Kauf lohnt sich, vorausgesetzt, man braucht das Gerät wirklich.", tr: "Cihaz gerçekten gerekiyorsa almaya değer.", note: "şart" },
        ],
      },
      {
        heading: "es sei denn: istisna",
        tr: "„es sei denn“ bir istisna bildirir (… olmadıkça). Anlamı „wenn … nicht“e yakındır ama arkasından gelen cümle genellikle DÜZ sıradadır. Cümle başına geçemez; hep ana cümleden sonra ve virgülle gelir.",
        examples: [
          { de: "Die Kaution wird ausgezahlt, es sei denn, es gibt Schäden.", tr: "Hasar olmadıkça depozito ödenir.", note: "düz sıra" },
          { de: "Wir kommen morgen, es sei denn, es regnet.", tr: "Yağmur yağmazsa yarın geliyoruz.", note: "= wenn es nicht regnet" },
          { de: "Ich würde warten, es sei denn, dein Handy ist wirklich kaputt.", tr: "Telefonun gerçekten bozuk değilse beklerdim.", note: "istisna" },
        ],
      },
    ],
    questions: [
      {
        text: "Ruf mich bitte an, ___ es Probleme gibt.",
        options: ["es sei denn", "vorausgesetzt", "falls"],
        answer: 2,
        explain: "Olasılık bildiren yan cümle „falls“ ile kurulur ve fiil („gibt“) sona gider.",
      },
      {
        text: "„Wir kommen morgen, es sei denn, es regnet.“ — Was bedeutet das?",
        options: [
          "Wir kommen nur, wenn es regnet.",
          "Wir kommen, wenn es nicht regnet.",
          "Wir kommen, auch wenn es regnet.",
        ],
        answer: 1,
        explain: "„es sei denn“ bir istisnadır: yağmur yağarsa gelmiyoruz.",
      },
      {
        text: "Welcher Satz ist richtig?",
        options: [
          "Ich helfe dir, vorausgesetzt, du hast Zeit.",
          "Ich helfe dir, vorausgesetzt, du Zeit hast.",
          "Ich helfe dir, vorausgesetzt, dass du hast Zeit.",
        ],
        answer: 0,
        explain: "„dass“ yoksa düz sıra, „dass“ varsa fiil sonda olur.",
      },
      {
        kind: "gapfill",
        text: "___ du eine Rate verpasst, zahlst du eine Gebühr. (olasılık)",
        options: [],
        answer: 0,
        accept: ["Falls", "falls", "Wenn"],
        explain: "Olasılık bildiren koşul: „Falls du … verpasst“.",
      },
      {
        kind: "gapfill",
        text: "Der Kauf kostet nichts, ___ man pünktlich bezahlt. (… olduğu sürece)",
        options: [],
        answer: 0,
        accept: ["sofern", "solange"],
        explain: "Sınırlayıcı koşul „sofern“ ile kurulur.",
      },
      {
        kind: "gapfill",
        text: "Ich leihe dir das Geld, vorausgesetzt, du ___ es bis Mai zurück. (zurückzahlen)",
        options: [],
        answer: 0,
        accept: ["zahlst"],
        explain: "„dass“ düşünce cümle düz sıradadır: du zahlst es … zurück.",
      },
      {
        kind: "gapfill",
        text: "Die Kaution wird ausgezahlt, es sei ___, es gibt Schäden.",
        options: [],
        answer: 0,
        accept: ["denn"],
        explain: "Kalıp sabittir: es sei denn.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Falls", "es Probleme gibt,", "ruf", "mich", "an"],
        explain: "„falls“ yan cümlesi başta; ana cümle fiille (ruf) başlar.",
      },
      {
        kind: "truefalse",
        text: "„Es sei denn, es regnet, wir kommen morgen.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„es sei denn“ başa geçemez: „Wir kommen morgen, es sei denn, es regnet.“",
      },
      {
        kind: "truefalse",
        text: "„Sofern alles pünktlich bezahlt wird, entstehen keine Kosten.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„sofern“ yan cümlesinde fiil sonda; ana cümle fiille başlıyor.",
      },
    ],
  },
];
