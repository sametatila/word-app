import type { SkillExercise } from "../../types";

/**
 * DE · A2 — Beceriler kütüphanesi, parti 9.
 *
 * Kurallar ve emsal: `de-a2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 9 seyahat hattı: yolda başa gelen bir olay, dönen birinin anlattıkları,
 * konaklama değerlendirmesi. Söyleyiş odağı sözcük başındaki gırtlak vuruşu;
 * dil bilgisi dönüşlü fiiller.
 */
export const deA2P9: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a2-lib-r9",
    course: "de",
    level: "A2",
    skill: "reading",
    title: "Der Koffer, der weiterfuhr",
    genre: "story",
    intro: "Kısa bir yolculuk hikâyesi: bir valiz kayboluyor, sonra beklenmedik bir yerden çıkıyor.",
    gloss: [
      { de: "der Koffer", tr: "valiz", en: "suitcase" },
      { de: "umsteigen", tr: "aktarma yapmak", en: "to change trains" },
      { de: "der Schaffner", tr: "kondüktör", en: "ticket inspector" },
      { de: "das Fundbüro", tr: "kayıp eşya bürosu", en: "lost property office" },
      { de: "peinlich", tr: "utandırıcı", en: "embarrassing" },
      { de: "abgeben", tr: "teslim etmek", en: "to hand in" },
    ],
    minutes: 5,
    text:
      "Im Mai bin ich mit dem Zug zu einer Hochzeit nach Dresden gefahren. In Leipzig musste ich umsteigen. " +
      "Der Anschlusszug stand schon da und ich hatte nur vier Minuten.\n\n" +
      "Ich bin gerannt, bin eingestiegen und habe mich gefreut. " +
      "Dann habe ich gemerkt: Mein Koffer stand noch im anderen Zug.\n\n" +
      "Der Schaffner war sehr ruhig. „Das passiert oft“, hat er gesagt und telefoniert. " +
      "Eine halbe Stunde später wusste er, dass ein Mitarbeiter den Koffer in Dresden abgegeben hat.\n\n" +
      "Am Abend bin ich zum Fundbüro gegangen. Der Koffer war da, aber er war offen. " +
      "Eine Frau hatte ihn geöffnet, weil sie meinen Namen suchen wollte. " +
      "Sie hat mir eine Nachricht hineingelegt: „Schöne Hochzeit! Ihr Anzug hängt jetzt ordentlich.“\n\n" +
      "Das war mir ein bisschen peinlich. Aber der Anzug war wirklich nicht mehr geknittert.",
    questions: [
      {
        text: "Warum ist der Koffer nicht mitgefahren?",
        options: [
          "Die Erzählerin hat ihn im ersten Zug vergessen.",
          "Jemand hat ihn gestohlen.",
          "Der Schaffner hat ihn ausgeladen.",
        ],
        answer: 0,
        explain: "Aktarmada dört dakikası vardı, koşup bindi ve valiz öteki trende kaldı.",
      },
      {
        text: "Wie hat der Schaffner reagiert?",
        options: ["Er war ärgerlich.", "Er war ruhig und hat geholfen.", "Er hat nichts gesagt."],
        answer: 1,
        explain: "„Der Schaffner war sehr ruhig“ ve telefon edip valizi bulmuş.",
      },
      {
        kind: "truefalse",
        text: "Der Koffer war am Abend noch im Zug.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Bir görevli valizi Dresden'de teslim etmiş; akşam kayıp eşyada bulunuyor.",
      },
      {
        kind: "gapfill",
        text: "In Leipzig hatte die Erzählerin nur ___ Minuten Zeit.",
        options: [],
        answer: 0,
        accept: ["vier", "4"],
        explain: "„ich hatte nur vier Minuten“.",
      },
      {
        kind: "short_answer",
        text: "Was wollte die Frau im Koffer finden?",
        options: [],
        answer: 0,
        accept: ["meinen Namen", "den Namen", "Namen"],
        explain: "„weil sie meinen Namen suchen wollte“.",
      },
      {
        text: "Wie endet die Geschichte?",
        options: [
          "Der Anzug war kaputt.",
          "Der Koffer ist verschwunden.",
          "Der Anzug war ordentlich aufgehängt.",
        ],
        answer: 2,
        explain: "Notta „Ihr Anzug hängt jetzt ordentlich“ yazıyor ve takım gerçekten buruşuk değil.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a2-lib-l9",
    course: "de",
    level: "A2",
    skill: "listening",
    title: "Zurück aus dem Urlaub",
    genre: "interview",
    intro: "Bir dil kursunda öğretmen, tatilden dönen kursiyere sorular soruyor: nereye gitti, ne yaptı, ne öneriyor.",
    gloss: [
      { de: "der Urlaub", tr: "tatil", en: "holiday" },
      { de: "die Unterkunft", tr: "konaklama", en: "accommodation" },
      { de: "wandern", tr: "doğa yürüyüşü yapmak", en: "to hike" },
      { de: "die Aussicht", tr: "manzara", en: "view" },
      { de: "sich erholen", tr: "dinlenmek", en: "to recover" },
      { de: "empfehlen", tr: "tavsiye etmek", en: "to recommend" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Frau Seidel", text: "Schön, dass du wieder da bist, Nadia. Erzähl mal: Wo warst du im Urlaub?" },
      { speaker: "Nadia", text: "Ich war zwei Wochen in Österreich, in einem kleinen Dorf in den Bergen." },
      { speaker: "Frau Seidel", text: "Und wie war die Unterkunft?" },
      { speaker: "Nadia", text: "Einfach, aber sehr sauber. Das Zimmer hatte kein Fernsehen, dafür eine tolle Aussicht auf das Tal." },
      { speaker: "Frau Seidel", text: "Was hast du den ganzen Tag gemacht?" },
      { speaker: "Nadia", text: "Am Anfang bin ich jeden Tag gewandert. Später habe ich mich einfach auf die Wiese gelegt und gelesen." },
      { speaker: "Frau Seidel", text: "Hast du dich gut erholt?" },
      { speaker: "Nadia", text: "Sehr gut. In der ersten Woche habe ich mich langweilig gefühlt, in der zweiten war ich richtig ruhig." },
      { speaker: "Frau Seidel", text: "Würdest du es empfehlen?" },
      { speaker: "Nadia", text: "Ja, aber nur ohne Auto. Man braucht dort wirklich gute Schuhe, keinen Parkplatz." },
    ],
    questions: [
      {
        text: "Wo war Nadia im Urlaub?",
        options: ["an der Ostsee", "in einem Bergdorf in Österreich", "in einer großen Stadt"],
        answer: 1,
        explain: "„in einem kleinen Dorf in den Bergen“ ve ülke Avusturya.",
      },
      {
        text: "Was sagt sie über das Zimmer?",
        options: [
          "Es war einfach, aber sauber.",
          "Es war teuer und laut.",
          "Es hatte einen großen Fernseher.",
        ],
        answer: 0,
        explain: "„Einfach, aber sehr sauber“ — televizyon yok, manzara var.",
      },
      {
        kind: "truefalse",
        text: "Nadia hat sich die ganze Zeit gelangweilt.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yalnız ilk hafta sıkılmış; ikinci hafta „richtig ruhig“ olmuş.",
      },
      {
        kind: "gapfill",
        text: "Nadia war ___ Wochen in Österreich.",
        options: [],
        answer: 0,
        accept: ["zwei", "2"],
        explain: "„Ich war zwei Wochen in Österreich.“",
      },
      {
        kind: "short_answer",
        text: "Was braucht man dort laut Nadia?",
        options: [],
        answer: 0,
        accept: ["gute Schuhe", "Schuhe", "wirklich gute Schuhe"],
        explain: "„Man braucht dort wirklich gute Schuhe, keinen Parkplatz.“",
      },
      {
        text: "Was hat sie später im Urlaub gemacht?",
        options: ["jeden Tag gewandert", "auf der Wiese gelesen", "Ausflüge mit dem Auto gemacht"],
        answer: 1,
        explain: "„Später habe ich mich einfach auf die Wiese gelegt und gelesen.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a2-lib-w9",
    course: "de",
    level: "A2",
    skill: "writing",
    title: "Bewertung für die Pension",
    genre: "review",
    intro: "Kaldığın pansiyonu değerlendiriyorsun: önce iki cümle kur, sonra dengeli bir yorum yaz.",
    gloss: [
      { de: "die Pension", tr: "pansiyon", en: "guesthouse" },
      { de: "das Frühstück", tr: "kahvaltı", en: "breakfast" },
      { de: "freundlich", tr: "güler yüzlü", en: "friendly" },
      { de: "der Lärm", tr: "gürültü", en: "noise" },
      { de: "weiterempfehlen", tr: "tavsiye etmek", en: "to recommend to others" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Kahvaltı çok iyiydi çünkü her şey tazeydi.",
        answer: "Das Frühstück war sehr gut, weil alles frisch war.",
        alternatives: ["Weil alles frisch war, war das Frühstück sehr gut."],
        hint: "„weil“ yan cümlesinde çekimli fiil („war“) en sona gider.",
      },
      {
        kind: "build",
        tr: "Bir dahaki sefere arka taraftan bir oda isteyeceğim.",
        answer: "Das nächste Mal nehme ich ein Zimmer nach hinten.",
        alternatives: ["Nächstes Mal nehme ich ein Zimmer nach hinten."],
        hint: "Zaman öbeği başa gelince fiil yine ikinci sırada kalır, özne arkaya geçer.",
      },
      {
        kind: "free",
        prompt:
          "Kaldığın pansiyon için bir değerlendirme yaz: ne zaman ve kaç gece kaldığını söyle, iyi bulduğun iki şeyi yaz, rahatsız olduğun bir şeyi dürüstçe anlat ve sonunda tavsiye edip etmediğini söyle.",
        checklist: [
          "Ne zaman ve kaç gece kaldığını yaz",
          "İyi bulduğun iki şeyi anlat",
          "Rahatsız olduğun bir şeyi yaz",
          "Tavsiye edip etmediğini ve kime uygun olduğunu söyle",
        ],
        minWords: 50,
        phrases: [
          { de: "Wir waren im … für … Nächte dort.", tr: "… ayında … gece kaldık", en: "We were there in … for … nights." },
          { de: "Besonders gut hat uns … gefallen.", tr: "Özellikle … hoşumuza gitti", en: "We particularly liked …" },
          { de: "Weniger schön war …", tr: "Daha az güzel olan şey …", en: "Less nice was …" },
          { de: "Das Personal war sehr freundlich.", tr: "Personel çok güler yüzlüydü.", en: "The staff were very friendly." },
          { de: "Ich würde die Pension weiterempfehlen.", tr: "Pansiyonu tavsiye ederim.", en: "I would recommend the guesthouse." },
        ],
        sample:
          "Wir waren im Juni für vier Nächte in der Pension Talblick. " +
          "Besonders gut hat uns das Frühstück gefallen: Es gab frisches Brot, Obst und sogar Kuchen. " +
          "Das Personal war sehr freundlich und hat uns gute Wege zum Wandern gezeigt. " +
          "Weniger schön war der Lärm von der Straße. Unser Zimmer lag nach vorn und morgens um sechs " +
          "fuhren schon die ersten Autos. Das nächste Mal nehme ich ein Zimmer nach hinten. " +
          "Insgesamt würde ich die Pension weiterempfehlen, vor allem Leuten, die gern in die Berge gehen.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a2-lib-s9",
    course: "de",
    level: "A2",
    skill: "speaking",
    title: "Der kleine Stopp vor dem Vokal",
    genre: "pronounce",
    intro: "Almancada ünlüyle başlayan hece, önündeki sözcüğe yapışmaz; aradaki küçük duraklamayı altı cümlede kur.",
    gloss: [
      { de: "der Abend", tr: "akşam", en: "evening" },
      { de: "die Antwort", tr: "cevap", en: "answer" },
      { de: "beantworten", tr: "cevaplamak", en: "to answer" },
      { de: "das Auto", tr: "araba", en: "car" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "Am Abend esse ich immer spät.",
        tr: "Akşamları hep geç yerim.",
        hint: "„am_Abend“ yapışmaz: A'dan önce çok kısa bir duraklama var. Türkçede „bir elma“ derken sesler birleşir, Almancada birleşmez.",
        confusions: [
          {
            heard: ["A-mabend esse ich immer spät"],
            fix: "m ile A arasında sesi kes: am | Abend. Aksi hâlde tek kelime gibi duyulur.",
            expected: "Abend",
          },
        ],
      },
      {
        de: "Das ist eine einfache Antwort.",
        tr: "Bu basit bir cevap.",
        hint: "Üç kelime de ünlüyle başlıyor: eine | einfache | Antwort. Üçünün de önünde küçük bir vuruş var.",
        confusions: [
          {
            heard: ["Das ist eineeinfacheantwort"],
            fix: "Her ünlü başı ayrı başlar; hepsini bir nefeste birleştirmek anlaşılmaz yapar.",
            expected: "Antwort",
          },
        ],
      },
      {
        de: "Wir haben ein altes Auto.",
        tr: "Eski bir arabamız var.",
        hint: "„ein | altes | Auto“ — üç ayrı başlangıç. Hiçbiri öncekinin sonuna eklenmez.",
        confusions: [
          {
            heard: ["Wir haben einaltes Auto"],
            fix: "n ile a birleşmez; „ein“ biter, kısa bir kesme olur, sonra „altes“ başlar.",
            expected: "altes",
          },
        ],
      },
      {
        de: "Bitte beantworte meine E-Mail.",
        tr: "Lütfen e-postamı cevapla.",
        hint: "„beantworte“ kelimesinin ORTASINDA da vuruş var: be | ANT-vor-te. Ön ek ile kök ayrılır.",
        confusions: [
          {
            heard: ["Bitte benantworte meine E-Mail"],
            fix: "be- ile -antworten arasında kısa bir kesme duyulur; sesler kaynaşmaz.",
            expected: "beantworte",
          },
        ],
      },
      {
        de: "Er arbeitet in einem alten Haus.",
        tr: "Eski bir evde çalışıyor.",
        hint: "„Er | arbeitet | in | einem | alten“ — art arda beş ünlü başlangıcı.",
        confusions: [
          {
            heard: ["E-rarbeitet ineinemalten Haus"],
            fix: "r sesini sonraki kelimeye taşıma; Almancada bağlanma yoktur.",
            expected: "arbeitet",
          },
        ],
      },
      {
        de: "Am achten April um acht Uhr.",
        tr: "Sekiz Nisan'da saat sekizde.",
        hint: "Beş sözcükten dördü ünlüyle başlıyor; hepsinin önünde aynı küçük duraklama var.",
        confusions: [
          {
            heard: ["Amachten Aprilumacht Uhr"],
            fix: "Rakam ve ay adı bile olsa kural değişmez: her ünlü başı ayrı vurulur.",
            expected: "acht",
          },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a2-lib-g9",
    course: "de",
    level: "A2",
    skill: "grammar",
    title: "Ich freue mich",
    genre: "grammar",
    intro: "Bazı fiiller Almancada yanında küçük bir zamir taşır; Türkçede karşılığı yoktur ama atlanamaz.",
    focus: "Dönüşlü fiiller: sich freuen, sich waschen, sich treffen",
    gloss: [
      { de: "sich freuen", tr: "sevinmek", en: "to be glad" },
      { de: "sich interessieren", tr: "ilgilenmek", en: "to be interested" },
      { de: "sich treffen", tr: "buluşmak", en: "to meet" },
      { de: "sich beeilen", tr: "acele etmek", en: "to hurry" },
      { de: "sich vorstellen", tr: "kendini tanıtmak", en: "to introduce oneself" },
    ],
    minutes: 8,
    explanation: [
      {
        heading: "Zamir fiilin parçası",
        tr: "„sich freuen“, „sich beeilen“ gibi fiiller sözlükte „sich“ ile yazılır ve cümlede bu zamir özneye göre değişir: mich, dich, sich, uns, euch, sich. Türkçede karşılığı çoğu zaman yoktur, ama Almancada atlanırsa cümle bozulur.",
        examples: [
          { de: "Ich freue mich auf das Wochenende.", tr: "Hafta sonunu dört gözle bekliyorum.", note: "ich → mich" },
          { de: "Beeil dich, der Bus kommt!", tr: "Acele et, otobüs geliyor!", note: "du → dich" },
          { de: "Wir treffen uns um sieben.", tr: "Yedide buluşuyoruz.", note: "wir → uns" },
        ],
      },
      {
        heading: "Zamir cümlede nereye gider?",
        tr: "Dönüşlü zamir genellikle çekimli fiilin hemen ARKASINDA durur. Özne fiilden sonra geldiyse zamir özneden sonra gelir. Yan cümlede ise özneden hemen sonra yer alır.",
        examples: [
          { de: "Heute treffen wir uns im Park.", tr: "Bugün parkta buluşuyoruz.", note: "özne → sonra zamir" },
          { de: "Interessierst du dich für Musik?", tr: "Müzikle ilgileniyor musun?", note: "soruda da aynı sıra" },
          { de: "Er sagt, dass er sich beeilt.", tr: "Acele ettiğini söylüyor.", note: "yan cümlede özneden sonra" },
        ],
      },
      {
        heading: "Sabit edatlar",
        tr: "Çoğu dönüşlü fiil belirli bir edatla kalıplaşmıştır ve o edat bir hâl ister: „sich freuen auf“ + Akkusativ (gelecek bir şey), „sich freuen über“ + Akkusativ (olmuş bir şey), „sich interessieren für“ + Akkusativ. Bu ikilileri fiille birlikte öğrenmek gerekir.",
        examples: [
          { de: "Ich freue mich auf den Urlaub.", tr: "Tatili dört gözle bekliyorum.", note: "auf: henüz olmadı" },
          { de: "Ich freue mich über dein Geschenk.", tr: "Hediyene sevindim.", note: "über: olmuş bitmiş" },
          { de: "Sie interessiert sich für Geschichte.", tr: "Tarihle ilgileniyor.", note: "für + Akkusativ" },
        ],
      },
    ],
    questions: [
      {
        text: "Ich freue ___ auf das Wochenende.",
        options: ["mir", "mich", "sich"],
        answer: 1,
        explain: "„ich“ öznesinin dönüşlü zamiri mich'tir.",
      },
      {
        text: "Wir treffen ___ um sieben Uhr.",
        options: ["uns", "euch", "sich"],
        answer: 0,
        explain: "„wir“ öznesinin dönüşlü zamiri uns'tur.",
      },
      {
        text: "Welcher Satz ist richtig?",
        options: [
          "Interessierst du für Musik?",
          "Interessierst du dich für Musik?",
          "Interessierst dich du für Musik?",
        ],
        answer: 1,
        explain: "Zamir atlanamaz ve özneden hemen sonra gelir.",
      },
      {
        kind: "gapfill",
        text: "Beeil ___, der Bus kommt! (du)",
        options: [],
        answer: 0,
        accept: ["dich"],
        explain: "Emir kipinde de dönüşlü zamir kalır: Beeil dich!",
      },
      {
        kind: "gapfill",
        text: "Sie interessiert ___ für Geschichte. (sie)",
        options: [],
        answer: 0,
        accept: ["sich"],
        explain: "Üçüncü tekil kişide zamir sich'tir.",
      },
      {
        kind: "gapfill",
        text: "Ich freue mich ___ dein Geschenk. (auf / über)",
        options: [],
        answer: 0,
        accept: ["über"],
        explain: "Olmuş bitmiş bir şeye sevinmek „über“ ile kurulur.",
      },
      {
        kind: "gapfill",
        text: "Darf ich ___ kurz vorstellen? (ich)",
        options: [],
        answer: 0,
        accept: ["mich"],
        explain: "„sich vorstellen“ dönüşlüdür; birinci tekil kişide mich olur.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Heute", "treffen", "wir", "uns", "im Park"],
        explain: "Fiil ikinci sırada, özne arkasında, dönüşlü zamir ondan sonra gelir.",
      },
      {
        kind: "truefalse",
        text: "„Wir treffen um sieben.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Dönüşlü zamir eksik; doğrusu „Wir treffen uns um sieben.“",
      },
      {
        kind: "truefalse",
        text: "„Er sagt, dass er sich beeilt.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Yan cümlede zamir özneden sonra, çekimli fiil en sonda.",
      },
    ],
  },
];
