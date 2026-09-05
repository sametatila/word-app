import type { SkillExercise } from "../types";

/**
 * A2 · Ünite 14 — "İki ceket, renk ve desen, kuaför, şikâyet".
 *
 * Dört ders: Welche Jacke ist besser? · Ein hellblaues Hemd · Beim Friseur ·
 * Die Reklamation. İçerik ünite 1-14'ün kelimeleriyle sınırlı.
 *
 *   Ünite 14: der Anzug, die Mode, weich, der Rock, entweder, dünn, bequem,
 *             hässlich · grün, grau, hellblau, dunkelblau, bunt, gestreift,
 *             kariert, einfarbig · der Friseursalon, die Schere, föhnen,
 *             bürsten, sich kämmen, glänzend, gepflegt, das Parfüm ·
 *             fehlerhaft, beschädigt, zerbrochen, abgenutzt, die Rückgabe,
 *             der Kassenzettel, verärgert, der Filialleiter
 *   Kalıplar: Entweder der Rock oder der Anzug. · Kann ich das anprobieren? ·
 *             Ich suche ein hellblaues Hemd. · Haben Sie das auch einfarbig? ·
 *             Bitte etwas kürzer. · Ich möchte das zurückgeben.
 *
 * Çekirdek sıfat çekimi: Türkçede sıfat hiç değişmez, Almancada bir ismin
 * ÖNÜNDE durunca cinse göre son alır — ama yüklem olarak kullanılınca hiç
 * almaz. Renk ve desen sıfatları bu kuralı üç cinste birden tekrarlatmanın en
 * doğal yolu, o yüzden okuma, dinleme ve yazmada aynı sekiz sıfat dönüyor.
 */
export const a2U14: SkillExercise[] = [
  {
    id: "a2-u14-r1",
    level: "A2",
    skill: "reading",
    unit: 14,
    title: "Was ziehe ich an?",
    genre: "Blog yazısı",
    intro: "Bir giyim yazısı: hangi renk neye gider, hangi desen ne zaman?",
    gloss: [
      { de: "hellblau", tr: "açık mavi", en: "light blue" },
      { de: "dunkelblau", tr: "koyu mavi", en: "dark blue" },
      { de: "gestreift", tr: "çizgili", en: "striped" },
      { de: "kariert", tr: "kareli", en: "checked" },
      { de: "einfarbig", tr: "tek renkli", en: "plain" },
      { de: "bunt", tr: "rengârenk", en: "colourful" },
      { de: "der Anzug", tr: "takım elbise", en: "suit" },
      { de: "die Mode", tr: "moda", en: "fashion" },
      { de: "dünn", tr: "ince", en: "thin" },
      { de: "bequem", tr: "rahat", en: "comfortable" },
      { de: "hässlich", tr: "çirkin", en: "ugly" },
    ],
    minutes: 4,
    text:
      "Viele Leute fragen mich: Was ziehe ich zu einem Bewerbungsgespräch an?\n\n" +
      "Meine Antwort ist immer gleich: einfach. Ein dunkelblauer Anzug oder ein einfarbiger Rock funktioniert fast überall. Dazu ein hellblaues Hemd — das wirkt freundlich, aber nicht zu bunt.\n\n" +
      "Ein kariertes Hemd ist nicht falsch, aber es zieht die Blicke auf sich. Ein gestreifter Pullover ebenso. Wenn Sie unsicher sind, nehmen Sie lieber etwas Einfarbiges.\n\n" +
      "Noch ein Wort zum Stoff: Nehmen Sie nichts zu Dünnes. Ein dünnes Hemd sieht nach zwei Stunden müde aus, und im Sommer sieht man alles darunter. Wichtiger ist aber, dass die Sachen bequem sind — wer die ganze Zeit an seiner Hose zieht, wirkt unsicher. Und ein Kleidungsstück, das Sie selbst hässlich finden, ziehen Sie an diesem Tag bitte nicht an.\n\n" +
      "Und die Mode? Die ändert sich jedes Jahr, aber ein grauer Anzug sieht auch in zehn Jahren noch gut aus. Grün und Rot sind schön — nur nicht am ersten Tag.",
    questions: [
      {
        text: "Was empfiehlt der Text für ein Bewerbungsgespräch?",
        options: ["Etwas Buntes", "Einen dunkelblauen Anzug", "Ein kariertes Hemd"],
        answer: 1,
        explain: "„Ein dunkelblauer Anzug oder ein einfarbiger Rock funktioniert fast überall.“",
      },
      {
        kind: "gapfill",
        text: "Dazu ein ___ Hemd — das wirkt freundlich.",
        options: [],
        answer: 0,
        accept: ["hellblaues"],
        explain: "Cinssiz bir ismin önünde, belirsiz artikelden sonra sıfat iki harflik son alır: hellblaues.",
      },
      {
        text: "Was sagt der Text über ein kariertes Hemd?",
        options: ["Es ist falsch.", "Es zieht die Blicke auf sich.", "Es ist die beste Wahl."],
        answer: 1,
        explain: "„Ein kariertes Hemd ist nicht falsch, aber es zieht die Blicke auf sich.“",
      },
      {
        kind: "short_answer",
        text: "Welche Farbe sieht auch in zehn Jahren noch gut aus?",
        options: [],
        answer: 0,
        accept: ["grau", "ein grauer Anzug", "Grau"],
        explain: "„ein grauer Anzug sieht auch in zehn Jahren noch gut aus“.",
      },
      {
        text: "Der Text empfiehlt am ersten Tag Grün und Rot.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Grün und Rot sind schön — nur nicht am ersten Tag.“",
      },
    ],
  },
  {
    id: "a2-u14-r2",
    level: "A2",
    skill: "reading",
    unit: 14,
    title: "Rückgabe und Reklamation",
    genre: "Bilgilendirme",
    intro: "Mağazanın iade kuralları. Ne zaman iade olur, ne zaman olmaz?",
    gloss: [
      { de: "die Rückgabe", tr: "iade", en: "return" },
      { de: "der Kassenzettel", tr: "kasa fişi", en: "receipt" },
      { de: "beschädigt", tr: "hasarlı", en: "damaged" },
      { de: "zerbrochen", tr: "kırık", en: "broken" },
      { de: "fehlerhaft", tr: "hatalı", en: "faulty" },
      { de: "abgenutzt", tr: "yıpranmış", en: "worn out" },
      { de: "der Filialleiter", tr: "şube müdürü", en: "branch manager" },
      { de: "verärgert", tr: "kızgın", en: "annoyed" },
    ],
    minutes: 4,
    text:
      "RÜCKGABE — WAS SIE WISSEN SOLLTEN\n\n" +
      "Sie können Ware innerhalb von 14 Tagen zurückgeben. Bringen Sie bitte immer den Kassenzettel mit; ohne ihn ist eine Rückgabe leider nicht möglich.\n\n" +
      "Ist ein Artikel fehlerhaft, beschädigt oder zerbrochen bei Ihnen angekommen, tauschen wir ihn sofort um. In diesem Fall gilt die Frist von 14 Tagen nicht.\n\n" +
      "Nicht zurücknehmen können wir Ware, die schon abgenutzt ist. Ein Pullover, den Sie zwei Monate getragen haben, ist kein Reklamationsfall.\n\n" +
      "Wenn Sie mit einer Entscheidung nicht einverstanden sind, sprechen Sie bitte mit unserem Filialleiter. Wir wissen: niemand steht gern verärgert an der Kasse.",
    questions: [
      {
        text: "Wie lange kann man Ware zurückgeben?",
        options: ["Sieben Tage", "14 Tage", "Zwei Monate"],
        answer: 1,
        explain: "„Sie können Ware innerhalb von 14 Tagen zurückgeben.“",
      },
      {
        kind: "gapfill",
        text: "Ohne ihn ist eine ___ leider nicht möglich.",
        options: [],
        answer: 0,
        accept: ["Rückgabe"],
        explain: "Fişsiz iade kabul edilmiyor — metnin ilk kuralı bu.",
      },
      {
        text: "Wann gilt die Frist von 14 Tagen nicht?",
        options: ["Bei fehlerhafter Ware", "Bei abgenutzter Ware", "Bei Sonderangeboten"],
        answer: 0,
        explain: "„Ist ein Artikel fehlerhaft, beschädigt oder zerbrochen … In diesem Fall gilt die Frist von 14 Tagen nicht.“",
      },
      {
        kind: "short_answer",
        text: "Mit wem soll man bei Problemen sprechen?",
        options: [],
        answer: 0,
        accept: ["mit dem Filialleiter", "dem Filialleiter", "Filialleiter"],
        explain: "„sprechen Sie bitte mit unserem Filialleiter“.",
      },
      {
        text: "Ein zwei Monate getragener Pullover ist ein Reklamationsfall.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Ein Pullover, den Sie zwei Monate getragen haben, ist kein Reklamationsfall.“",
      },
    ],
  },
  {
    id: "a2-u14-l1",
    level: "A2",
    skill: "listening",
    unit: 14,
    title: "Beim Friseur",
    genre: "Diyalog",
    intro: "Kuaförde. Ne kadar kısaltılıyor, hangi ek hizmet isteniyor?",
    gloss: [
      { de: "der Friseursalon", tr: "kuaför salonu", en: "hair salon" },
      { de: "die Schere", tr: "makas", en: "scissors" },
      { de: "föhnen", tr: "fön çekmek", en: "to blow-dry" },
      { de: "bürsten", tr: "fırçalamak", en: "to brush" },
      { de: "sich kämmen", tr: "saçını taramak", en: "to comb one's hair" },
      { de: "glänzend", tr: "parlak", en: "shiny" },
      { de: "gepflegt", tr: "bakımlı", en: "well-groomed" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Friseurin", text: "So, was darf es heute sein? Nur schneiden?" },
      { speaker: "Herr Adam", text: "Ja, bitte etwas kürzer. Aber nicht zu kurz — im letzten Salon war es fast eine Glatze." },
      { speaker: "Friseurin", text: "Verstehe. Zwei Zentimeter, dann sieht es noch gepflegt aus." },
      { speaker: "Herr Adam", text: "Perfekt. Nehmen Sie die Schere oder die Maschine?" },
      { speaker: "Friseurin", text: "Nur die Schere, das wird weicher. Möchten Sie danach föhnen?" },
      { speaker: "Herr Adam", text: "Können Sie mir die Haare föhnen? Ich mache das zu Hause nie richtig." },
      { speaker: "Friseurin", text: "Gern. Ich bürste sie vorher gut durch, dann werden sie auch glänzender." },
      { speaker: "Herr Adam", text: "Und kämmen Sie es bitte nach links, nicht nach rechts." },
      { speaker: "Friseurin", text: "Alles klar. Dauert etwa zwanzig Minuten." },
    ],
    questions: [
      {
        text: "Wie viel soll abgeschnitten werden?",
        options: ["Zwei Zentimeter", "Fünf Zentimeter", "Sehr kurz"],
        answer: 0,
        explain: "„Zwei Zentimeter, dann sieht es noch gepflegt aus.“",
      },
      {
        kind: "gapfill",
        text: "Können Sie ___ die Haare föhnen?",
        options: [],
        answer: 0,
        accept: ["mir"],
        explain: "Hizmet verilen kişi yönelme hâlinde durur ve saç belirlilik takısıyla gelir.",
      },
      {
        text: "Womit schneidet die Friseurin?",
        options: ["Mit der Maschine", "Nur mit der Schere", "Mit beidem"],
        answer: 1,
        explain: "„Nur die Schere, das wird weicher.“",
      },
      {
        kind: "dictation",
        text: "Herr Adam'ın ne kadar kısaltılacağını söylediği kısa cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Ja, bitte etwas kürzer."],
        explain: "Karşılaştırma biçimi burada bir ölçü değil bir yön söylüyor: şimdikinden daha kısa.",
      },
    ],
  },
  {
    id: "a2-u14-l2",
    level: "A2",
    skill: "listening",
    unit: 14,
    title: "Die Jacke ist beschädigt",
    genre: "Diyalog",
    intro: "Mağazada şikâyet. Sorun ne, çözüm ne oluyor?",
    gloss: [
      { de: "der Kassenzettel", tr: "kasa fişi", en: "receipt" },
      { de: "die Rückgabe", tr: "iade", en: "return" },
      { de: "fehlerhaft", tr: "hatalı", en: "faulty" },
      { de: "verärgert", tr: "kızgın", en: "annoyed" },
      { de: "der Filialleiter", tr: "şube müdürü", en: "branch manager" },
      { de: "anprobieren", tr: "üstünde denemek", en: "to try on" },
      { de: "beschädigt", tr: "hasarlı", en: "damaged" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Frau Roth", text: "Guten Tag. Ich habe diese Jacke vorgestern hier gekauft, und der Reißverschluss ist fehlerhaft." },
      { speaker: "Verkäufer", text: "Das tut mir leid. Haben Sie den Kassenzettel dabei?" },
      { speaker: "Frau Roth", text: "Ja, hier. Ich habe sie im Laden anprobiert, da ging alles noch." },
      { speaker: "Verkäufer", text: "Dann ist das ein klarer Fall. Möchten Sie eine Rückgabe oder lieber die gleiche Jacke noch einmal?" },
      { speaker: "Frau Roth", text: "Lieber die gleiche, aber in Grau. Haben Sie die noch?" },
      { speaker: "Verkäufer", text: "Einen Moment … in Ihrer Größe leider nur noch dunkelblau." },
      { speaker: "Frau Roth", text: "Hm. Dann nehme ich das Geld zurück." },
      { speaker: "Verkäufer", text: "Kein Problem. Ich hole kurz den Filialleiter, er muss das unterschreiben." },
      { speaker: "Frau Roth", text: "Danke, dass es so unkompliziert geht. Ich war ehrlich gesagt schon verärgert." },
    ],
    questions: [
      {
        text: "Was ist mit der Jacke?",
        options: ["Sie ist zu klein.", "Der Reißverschluss ist fehlerhaft.", "Sie ist abgenutzt."],
        answer: 1,
        explain: "„der Reißverschluss ist fehlerhaft“ — mağazada denerken sorun yokmuş.",
      },
      {
        kind: "gapfill",
        text: "Haben Sie den ___ dabei?",
        options: [],
        answer: 0,
        accept: ["Kassenzettel"],
        explain: "İadenin ilk şartı fiş; Frau Roth yanında getirmiş.",
      },
      {
        text: "Warum nimmt sie nicht die gleiche Jacke?",
        options: ["Grau gibt es nicht in ihrer Größe.", "Sie mag die Farbe nicht.", "Sie ist zu teuer."],
        answer: 0,
        explain: "„in Ihrer Größe leider nur noch dunkelblau“ — istediği gri kalmamış.",
      },
      {
        kind: "short_answer",
        text: "Wer muss die Rückgabe unterschreiben?",
        options: [],
        answer: 0,
        accept: ["der Filialleiter", "Filialleiter"],
        explain: "„Ich hole kurz den Filialleiter, er muss das unterschreiben.“",
      },
    ],
  },
  {
    id: "a2-u14-w1",
    level: "A2",
    skill: "writing",
    unit: 14,
    title: "Sıfat ne zaman ek alır?",
    genre: "Dil bilgisi",
    intro: "Sıfat bir ismin önünde durunca son alır, yüklem olunca hiç almaz.",
    gloss: [
      { de: "hellblau", tr: "açık mavi", en: "light blue" },
      { de: "kariert", tr: "kareli", en: "checked" },
      { de: "einfarbig", tr: "tek renkli", en: "plain" },
      { de: "grau", tr: "gri", en: "grey" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Açık mavi bir gömlek arıyorum.",
        answer: "Ich suche ein hellblaues Hemd",
        hint: "Cinssiz isim, belirsiz artikel: sıfat iki harflik son alır — hellblaues.",
      },
      {
        kind: "build",
        tr: "Gri bir pantolon arıyorum.",
        answer: "Ich suche eine graue Hose",
        hint: "Dişil isimde sıfat tek harflik son alır — graue.",
      },
      {
        kind: "build",
        tr: "Bunun tek renklisi var mı?",
        answer: "Haben Sie das auch einfarbig",
        hint: "Burada sıfat bir ismin önünde DEĞİL, o yüzden hiç ek almaz.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: sıfat burada ismin önünde duruyor.",
        source: "Ich möchte ein kariert Hemd.",
        answer: "Ich möchte ein kariertes Hemd.",
        alternatives: ["Ich möchte ein kariertes Hemd"],
        why: "Belirsiz artikel ismin cinsini göstermediği için o işi sıfat üstlenir ve cinssiz isimde iki harfle biter.",
      },
    ],
  },
  {
    id: "a2-u14-w2",
    level: "A2",
    skill: "writing",
    unit: 14,
    title: "Eine Reklamation schreiben",
    genre: "Resmî yazı",
    intro: "Mağazaya şikâyet yaz: ne aldın, sorun ne, ne istiyorsun?",
    gloss: [
      { de: "fehlerhaft", tr: "hatalı", en: "faulty" },
      { de: "beschädigt", tr: "hasarlı", en: "damaged" },
      { de: "die Rückgabe", tr: "iade", en: "return" },
      { de: "der Kassenzettel", tr: "kasa fişi", en: "receipt" },
      { de: "zerbrochen", tr: "kırık", en: "broken" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "reply",
        prompt: "Mağazanın iade kurallarına göre bir şikâyet e-postası yaz. Ne aldığını ve ne zaman aldığını söyle, sorunu tarif et, ne istediğini yaz ve fişin yanında olduğunu belirt.",
        stimulus:
          "RÜCKGABE — WAS SIE WISSEN SOLLTEN\n\nSie können Ware innerhalb von 14 Tagen zurückgeben. Bringen Sie bitte immer den Kassenzettel mit.\n\nIst ein Artikel fehlerhaft, beschädigt oder zerbrochen bei Ihnen angekommen, tauschen wir ihn sofort um.\n\nBei Fragen schreiben Sie an service@nordstern.de.",
        checklist: [
          "Resmî hitapla ve konu cümlesiyle başladın mı?",
          "Ne aldığını ve ne zaman aldığını yazdın mı?",
          "Sorunu bir sıfatla tarif ettin mi (fehlerhaft / beschädigt / zerbrochen)?",
          "Ne istediğini ve fişin yanında olduğunu belirttin mi?",
        ],
        minWords: 45,
        phrases: [
          { de: "Ich habe am … eine Jacke gekauft.", tr: "…-de bir ceket aldım", en: "I bought a jacket on …" },
          { de: "Der Artikel ist leider fehlerhaft.", tr: "ürün maalesef hatalı", en: "unfortunately the item is faulty" },
          { de: "Ich möchte das Geld zurück.", tr: "paramı geri istiyorum", en: "I would like a refund" },
        ],
        sample:
          "Betreff: Reklamation — bestellte Jacke beschädigt\n\nSehr geehrte Damen und Herren,\n\nich habe am 3. April in Ihrer Filiale in der Bahnhofstraße eine dunkelblaue Jacke gekauft.\n\nLeider ist der Reißverschluss fehlerhaft: er geht nach zwei Tagen nicht mehr zu. Im Laden habe ich die Jacke anprobiert, da hat noch alles funktioniert.\n\nIch möchte die Jacke gern umtauschen, am liebsten in Grau. Wenn Sie diese Farbe nicht mehr haben, hätte ich lieber das Geld zurück.\n\nDen Kassenzettel bringe ich natürlich mit.\n\nMit freundlichen Grüßen\nNuray Roth",
      },
    ],
  },
];
