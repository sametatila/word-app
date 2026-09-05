import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 9 — "İlgi cümlesinin derin ucu" (dersler 33–36).
 *
 * Dersler: Relativsatz (Dativ) · Relativsatz mit Präposition ·
 * Mein Traumhaus · Menschen beschreiben.
 *
 * Ünite 8 ilgi cümlesini kurdu (Nominativ/Akkusativ); ünite 9 onu Türkçe
 * konuşanın hiç dayanağı olmayan iki yere götürüyor:
 *   Dativ zamiri    — hâl fiilin İSTEĞİNDEN gelir, anlamdan değil:
 *                     vertrauen, helfen, begegnen, verzeihen hep Dativ ister.
 *                     Türkçede "güvendiğim arkadaş" hiçbir hâl göstermez.
 *   Edatlı zamir    — edat zamirin ÖNÜNE geçer (in dem, mit der, auf die).
 *                     Türkçe sıfat-fiili edat taşımaz, o yüzden edat ya
 *                     büsbütün düşüyor ya cümlenin sonuna atılıyor.
 *
 * Yeni 32 kelime: vertrauen, der Rat, begegnen, verzeihen, die Schuld,
 * das Gefühl, beruhigen, persönlich, die Gegend, der Bezirk, sich wohlfühlen,
 * die Umgebung, die Lage, der Einwohner, das Gebiet, öffentlich,
 * die Terrasse, das Grundstück, leisten, träumen, sich befinden,
 * das Material, die Schulden, der Schatten, der Charakter, sich verhalten,
 * menschlich, hassen, beleidigen, enttäuschen, akzeptieren, hilfsbereit.
 */
export const b1U09: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u9-r1",
    level: "B1",
    skill: "reading",
    unit: 9,
    title: "Das Haus, von dem ich träume",
    genre: "Blog yazısı",
    intro: "Biri hayalindeki evi anlatıyor. Her ilgi cümlesinde edatın nereye gittiğine bak.",
    minutes: 6,
    gloss: [
      { de: "die Gegend", tr: "semt / yöre", en: "area" },
      { de: "die Lage", tr: "konum", en: "location" },
      { de: "das Grundstück", tr: "arsa", en: "plot" },
      { de: "sich leisten", tr: "gücü yetmek", en: "to afford" },
      { de: "sich befinden", tr: "bulunmak", en: "to be located" },
    ],
    text:
      "Jeder träumt von etwas. Das Haus, von dem ich träume, ist nicht groß. " +
      "Es hat drei Zimmer, eine Terrasse und einen Baum, unter dem man im Sommer " +
      "sitzen kann.\n\n" +
      "Wichtiger als das Haus ist die Gegend, in der es sich befindet. Ich möchte " +
      "einen Bezirk, in dem es einen Laden und eine Schule gibt. Die Umgebung, " +
      "über die man sich keine Sorgen macht, ist mehr wert als ein großes " +
      "Grundstück.\n\n" +
      "Das Material ist mir persönlich egal. Alt oder neu — beides geht. " +
      "Wichtig ist der Schatten am Nachmittag und dass ich mich dort wohlfühle.\n\n" +
      "Ehrlich gesagt kann ich mir so ein Haus heute nicht leisten. Ich möchte " +
      "keine Schulden, mit denen ich zwanzig Jahre lebe. Aber die Lage kenne ich " +
      "schon: ein Gebiet im Osten, in dem noch nicht viele Einwohner wohnen und " +
      "wo der öffentliche Bus alle zehn Minuten fährt.",
    questions: [
      {
        text: "Wie groß ist das Traumhaus?",
        options: ["Sehr groß", "Nicht groß, drei Zimmer", "Ein Zimmer"],
        answer: 1,
        explain: "„Das Haus, von dem ich träume, ist nicht groß. Es hat drei Zimmer …“",
      },
      {
        text: "Was ist der Person wichtiger als das Haus?",
        options: ["Die Gegend", "Das Material", "Das Grundstück"],
        answer: 0,
        explain: "„Wichtiger als das Haus ist die Gegend, in der es sich befindet.“",
      },
      {
        text: "Warum kauft sie das Haus jetzt nicht?",
        options: ["Es gefällt ihr nicht", "Sie will keine langen Schulden", "Es ist zu klein"],
        answer: 1,
        explain: "„Ich möchte keine Schulden, mit denen ich zwanzig Jahre lebe.“",
      },
      {
        kind: "gapfill",
        text: "Ich möchte einen Bezirk, ___ ___ es einen Laden und eine Schule gibt.",
        options: [],
        answer: 0,
        accept: ["in dem", "in welchem"],
        explain: "Edat zamirin ÖNÜNE geçer: „in dem“ — sona atılmaz.",
      },
      {
        kind: "short_answer",
        text: "Wie oft fährt der Bus in dem Gebiet?",
        options: [],
        answer: 0,
        accept: ["alle zehn Minuten", "alle 10 Minuten", "zehn Minuten"],
        explain: "„… wo der öffentliche Bus alle zehn Minuten fährt.“",
      },
    ],
  },
  {
    id: "b1-u9-r2",
    level: "B1",
    skill: "reading",
    unit: 9,
    title: "Menschen, denen man vertraut",
    genre: "Deneme",
    intro: "Güven üzerine kısa bir yazı. Hangi fiillerin ardından 'dem/denen' geldiğine dikkat et.",
    minutes: 6,
    gloss: [
      { de: "vertrauen", tr: "güvenmek", en: "to trust" },
      { de: "begegnen", tr: "karşılaşmak", en: "to encounter" },
      { de: "verzeihen", tr: "affetmek", en: "to forgive" },
      { de: "der Charakter", tr: "karakter", en: "character" },
      { de: "enttäuschen", tr: "hayal kırıklığına uğratmak", en: "to disappoint" },
    ],
    text:
      "Es gibt Menschen, denen man sofort vertraut, und man weiß nicht genau warum. " +
      "Der Charakter zeigt sich nicht in schönen Worten, sondern im Verhalten.\n\n" +
      "Ein Kollege, dem ich einmal begegnet bin, hat mir das gezeigt. Er sprach wenig. " +
      "Aber jedes Mal, wenn jemand einen Rat brauchte, war er da. Er war hilfsbereit, " +
      "ohne darüber zu reden.\n\n" +
      "Natürlich enttäuscht jeder irgendwann jemanden. Das ist menschlich. Die Frage " +
      "ist, was danach passiert. Wer die Schuld sofort bei anderen sucht, den kann man " +
      "schwer beruhigen. Wer dagegen sagt „das war mein Fehler“, dem verzeiht man leichter.\n\n" +
      "Ich hasse große Worte. Aber ein Gefühl bleibt: Menschen, mit denen man arbeiten " +
      "kann, beleidigen niemanden, wenn sie ärgerlich sind. Sie akzeptieren, dass der " +
      "andere anders ist, und verhalten sich trotzdem höflich.",
    questions: [
      {
        text: "Wo zeigt sich der Charakter laut Text?",
        options: ["In schönen Worten", "Im Verhalten", "Im Beruf"],
        answer: 1,
        explain: "„Der Charakter zeigt sich nicht in schönen Worten, sondern im Verhalten.“",
      },
      {
        text: "Was machte den Kollegen besonders?",
        options: ["Er sprach viel", "Er war da, wenn jemand Rat brauchte", "Er half nur Freunden"],
        answer: 1,
        explain: "„Aber jedes Mal, wenn jemand einen Rat brauchte, war er da.“",
      },
      {
        text: "Wer bekommt leichter Verzeihung?",
        options: ["Wer die Schuld bei anderen sucht", "Wer den eigenen Fehler zugibt", "Wer nichts sagt"],
        answer: 1,
        explain: "„Wer dagegen sagt „das war mein Fehler“, dem verzeiht man leichter.“",
      },
      {
        kind: "gapfill",
        text: "Es gibt Menschen, ___ man sofort vertraut.",
        options: [],
        answer: 0,
        accept: ["denen"],
        explain: "„vertrauen“ Dativ ister; çoğul Dativ ilgi zamiri „denen“.",
      },
      {
        kind: "short_answer",
        text: "Was tun Menschen, mit denen man arbeiten kann, NICHT?",
        options: [],
        answer: 0,
        accept: ["beleidigen", "sie beleidigen niemanden", "niemanden beleidigen"],
        explain: "„… beleidigen niemanden, wenn sie ärgerlich sind.“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u9-l1",
    level: "B1",
    skill: "listening",
    unit: 9,
    title: "In welcher Gegend?",
    genre: "Semt konuşması",
    intro: "İki kişi taşınacakları semti konuşuyor. Hangi ölçüt kime önemli?",
    minutes: 4,
    gloss: [
      { de: "der Bezirk", tr: "ilçe", en: "district" },
      { de: "die Umgebung", tr: "çevre", en: "surroundings" },
      { de: "sich wohlfühlen", tr: "kendini iyi hissetmek", en: "to feel at home" },
      { de: "öffentlich", tr: "toplu / kamusal", en: "public" },
    ],
    segments: [
      { text: "Und? In welchem Bezirk suchst du jetzt?" },
      { text: "Im Osten. Da ist die Umgebung ruhiger." },
      { text: "Aber der öffentliche Verkehr, auf den du angewiesen bist, ist dort schlecht." },
      { text: "Der Bus, mit dem ich zur Arbeit fahre, kommt alle zehn Minuten." },
      { text: "Wirklich? Dann nehme ich das zurück." },
      { text: "Wichtig ist mir eine Wohnung, in der ich mich wohlfühle." },
      { text: "Verstehe. Und die Lage zum Park?" },
      { text: "Fünf Minuten. Das Gebiet, von dem ich rede, ist ziemlich grün." },
    ],
    questions: [
      {
        text: "In welchem Teil der Stadt sucht die erste Person?",
        options: ["Im Osten", "Im Westen", "In der Mitte"],
        answer: 0,
        explain: "„Im Osten. Da ist die Umgebung ruhiger.“",
      },
      {
        text: "Was war der Einwand der zweiten Person?",
        options: ["Zu teuer", "Schlechter öffentlicher Verkehr", "Kein Park"],
        answer: 1,
        explain: "„Aber der öffentliche Verkehr, auf den du angewiesen bist, ist dort schlecht.“",
      },
      {
        text: "Wie weit ist der Park?",
        options: ["Fünf Minuten", "Zehn Minuten", "Eine halbe Stunde"],
        answer: 0,
        explain: "„Fünf Minuten.“",
      },
      {
        kind: "gapfill",
        text: "Der Bus, ___ ___ ich zur Arbeit fahre, kommt alle zehn Minuten.",
        options: [],
        answer: 0,
        accept: ["mit dem"],
        explain: "„fahren mit“ → edat zamirin önünde: „mit dem“.",
      },
      {
        kind: "short_answer",
        text: "Wie oft kommt der Bus?",
        options: [],
        answer: 0,
        accept: ["alle zehn Minuten", "alle 10 Minuten", "zehn Minuten"],
        explain: "„… kommt alle zehn Minuten.“",
      },
    ],
  },
  {
    id: "b1-u9-l2",
    level: "B1",
    skill: "listening",
    unit: 9,
    title: "Das war mein Fehler",
    genre: "Barışma konuşması",
    intro: "Bir tartışmadan sonra iki kişi konuşuyor. Kim suçu nereye koyuyor?",
    minutes: 4,
    gloss: [
      { de: "die Schuld", tr: "suç / kabahat", en: "fault" },
      { de: "beruhigen", tr: "sakinleştirmek", en: "to calm" },
      { de: "verzeihen", tr: "affetmek", en: "to forgive" },
      { de: "das Gefühl", tr: "duygu", en: "feeling" },
    ],
    segments: [
      { text: "Hast du kurz Zeit? Ich möchte über gestern reden." },
      { text: "Ja. Ich habe mich inzwischen beruhigt." },
      { text: "Das war mein Fehler. Ich hätte nicht so laut werden sollen." },
      { text: "Die Schuld liegt nicht nur bei dir. Ich war auch nicht höflich." },
      { text: "Ich hatte das Gefühl, dass du mir nicht mehr vertraust." },
      { text: "Doch. Der Mensch, dem ich am meisten vertraue, bist du." },
      { text: "Dann verzeihst du mir?" },
      { text: "Schon lange. Lass uns das einfach akzeptieren und weitermachen." },
    ],
    questions: [
      {
        text: "Worüber will die erste Person reden?",
        options: ["Über gestern", "Über die Arbeit", "Über das Wochenende"],
        answer: 0,
        explain: "„Ich möchte über gestern reden.“",
      },
      {
        text: "Was sagt die zweite Person über die Schuld?",
        options: ["Sie liegt ganz bei der ersten", "Sie liegt nicht nur bei der ersten", "Es gibt keine Schuld"],
        answer: 1,
        explain: "„Die Schuld liegt nicht nur bei dir. Ich war auch nicht höflich.“",
      },
      {
        text: "Welches Gefühl hatte die erste Person?",
        options: ["Dass sie zu viel arbeitet", "Dass ihr nicht mehr vertraut wird", "Dass sie gehen soll"],
        answer: 1,
        explain: "„Ich hatte das Gefühl, dass du mir nicht mehr vertraust.“",
      },
      {
        kind: "gapfill",
        text: "Der Mensch, ___ ich am meisten vertraue, bist du.",
        options: [],
        answer: 0,
        accept: ["dem"],
        explain: "„vertrauen“ Dativ ister → eril tekil Dativ: „dem“.",
      },
      {
        kind: "short_answer",
        text: "Wann hat die zweite Person verziehen?",
        options: [],
        answer: 0,
        accept: ["schon lange", "seit langem"],
        explain: "„Schon lange. Lass uns das einfach akzeptieren …“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u9-w1",
    level: "B1",
    skill: "writing",
    unit: 9,
    title: "Mein Traumhaus",
    genre: "Betimleme",
    intro: "Hayalindeki evi ve semti anlat. Edatlı ilgi cümlelerini doğru kur.",
    minutes: 8,
    gloss: [
      { de: "die Terrasse", tr: "teras", en: "terrace" },
      { de: "der Schatten", tr: "gölge", en: "shade" },
      { de: "das Material", tr: "malzeme", en: "material" },
      { de: "die Umgebung", tr: "çevre", en: "surroundings" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Oturduğum ev sakin bir sokakta.",
        answer: "Das Haus, in dem ich wohne, liegt in einer ruhigen Straße.",
        hint: "„wohnen in“ → edat zamirin önüne geçer.",
      },
      {
        kind: "build",
        tr: "Altında oturduğumuz ağaç çok gölge veriyor.",
        answer: "Der Baum, unter dem wir sitzen, gibt viel Schatten.",
        hint: "„unter“ + Dativ, zamirin önünde.",
      },
      {
        kind: "build",
        tr: "Kendimi iyi hissettiğim bir semt arıyorum.",
        answer: "Ich suche eine Gegend, in der ich mich wohlfühle.",
        hint: "Dişil tekil Dativ: in der.",
      },
      {
        kind: "form",
        prompt: "Ev arama kartını doldur.",
        facts: "Arayan: Leyla Kaya; semt: doğu; oda: 3; istenen: teras ve ağaç; ölçüt: toplu taşıma yakın.",
        fields: [
          { label: "Name", answer: "Leyla Kaya", accept: ["Leyla", "Kaya"] },
          { label: "Bezirk", answer: "Osten", accept: ["im Osten", "der Osten"] },
          { label: "Zimmer", answer: "3", accept: ["drei", "drei Zimmer"] },
          { label: "Wunsch", answer: "Terrasse und Baum", accept: ["eine Terrasse", "Terrasse"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "İlgi cümlesindeki edatı yerine koy.",
        source: "Das Haus, das ich wohne, liegt in einer ruhigen Straße.",
        answer: "Das Haus, in dem ich wohne, liegt in einer ruhigen Straße.",
        why: "Türkçe sıfat-fiil edat taşımaz ('oturduğum ev'), o yüzden edat büsbütün düşüyor. Almancada fiilin istediği edat (wohnen IN) ilgi zamirinin ÖNÜNE gelir ve zamirin hâlini de o edat belirler: in + Dativ → in dem.",
      },
    ],
  },
  {
    id: "b1-u9-w2",
    level: "B1",
    skill: "writing",
    unit: 9,
    title: "Ein Mensch, dem ich vertraue",
    genre: "Kişi ve karakter",
    intro: "Güvendiğin birini anlat. Dativ isteyen fiillere dikkat et.",
    minutes: 12,
    gloss: [
      { de: "vertrauen", tr: "güvenmek", en: "to trust" },
      { de: "der Rat", tr: "öğüt", en: "advice" },
      { de: "sich verhalten", tr: "davranmak", en: "to behave" },
      { de: "akzeptieren", tr: "kabul etmek", en: "to accept" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Güvendiğim arkadaş başka bir şehirde yaşıyor.",
        answer: "Der Freund, dem ich vertraue, wohnt in einer anderen Stadt.",
        hint: "„vertrauen“ Dativ ister → dem.",
      },
      {
        kind: "build",
        tr: "Yardım ettiğim insanlar hâlâ yazıyor.",
        answer: "Die Menschen, denen ich geholfen habe, schreiben mir noch.",
        hint: "„helfen“ Dativ ister → çoğulda denen.",
      },
      {
        kind: "free",
        prompt: "Güvendiğin bir insanı anlat: kim olduğunu, nerede tanıştığınızı, hangi davranışının sana güven verdiğini ve bir kez seni hayal kırıklığına uğratıp uğratmadığını yaz. En az iki Dativ ilgi cümlesi (dem / denen) kullan.",
        checklist: [
          "Kişi ve tanışma yeri anlatılmış mı?",
          "En az iki Dativ ilgi cümlesi var mı (dem / denen)?",
          "Güven somut bir davranışla desteklenmiş mi?",
          "Bir zorluk ya da hayal kırıklığı anlatılmış mı?",
          "Sonunda bir değerlendirme var mı?",
        ],
        minWords: 70,
        sample:
          "Der Mensch, dem ich am meisten vertraue, ist meine ältere Schwester.\n\n" +
          "Wir sind uns als Kinder täglich begegnet, aber richtig verstanden haben wir " +
          "uns erst später. Sie ist der Typ, der wenig sagt und viel merkt.\n\n" +
          "Einmal hatte ich Schulden, über die ich mit niemandem reden wollte. " +
          "Sie hat mich nicht beleidigt und nicht gefragt, wer die Schuld hat. " +
          "Sie hat mich beruhigt und mir einen Rat gegeben, den ich bis heute nicht vergessen habe.\n\n" +
          "Natürlich hat sie mich auch schon enttäuscht. Das ist menschlich. " +
          "Aber sie hat es gesagt, und danach konnte ich ihr leicht verzeihen.\n\n" +
          "Menschen, denen man alles sagen kann, gibt es nicht viele. Ich akzeptiere, dass " +
          "sie anders ist als ich, und genau deshalb funktioniert es.",
        phrases: [
          { de: "Der Mensch, dem ich vertraue, …", tr: "Güvendiğim insan …", en: "The person I trust …" },
          { de: "einen Rat geben", tr: "öğüt vermek", en: "to give advice" },
          { de: "Das ist menschlich.", tr: "Bu insanca.", en: "That is only human." },
        ],
      },
      {
        kind: "rewrite",
        prompt: "İlgi zamirinin hâlini fiile göre düzelt.",
        source: "Der Freund, den ich vertraue, wohnt in einer anderen Stadt.",
        answer: "Der Freund, dem ich vertraue, wohnt in einer anderen Stadt.",
        why: "Türkçede 'güvendiğim arkadaş' hiçbir hâl göstermez, o yüzden nesne sanılıp Akkusativ (den) seçiliyor. Almancada hâli FİİL belirler: vertrauen, helfen, begegnen, verzeihen, gefallen Dativ ister → dem. Anlamı değil, fiilin isteğini ezberlemek gerekiyor.",
      },
    ],
  },
];
