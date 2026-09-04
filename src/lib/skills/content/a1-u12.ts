import type { SkillExercise } from "../types";

/**
 * A1 · Ünite 12 — "Beğeni, iade, hediye ve pazar".
 *
 * Dört ders: Das gefällt mir! · Ich möchte das umtauschen · Ein Geschenk
 * suchen · Auf dem Wochenmarkt. İçerik ünite 1-12'nin kelimeleriyle sınırlı.
 *
 *   Ünite 12: gefallen, praktisch, schön, besser, gar nicht, der Ohrring,
 *             die Karte, zeigen · umtauschen, zurückgeben, der Kassenbon,
 *             eng, weit, verkaufen, die Bank, der Laden · das Geschenk,
 *             einpacken, die Tasche, das Parfüm, der Gutschein, der Rucksack,
 *             der Koffer, kaufen · der Markt, frisch, das Pfund, mehr,
 *             weniger, der Marktplatz, die Bäckerei, der Kiosk
 *   Kalıplar: Das gefällt mir. · Mir gefällt … besser. · Wie findest du …? ·
 *             Ich möchte … umtauschen. · Es ist zu eng. · Ich suche ein
 *             Geschenk für … · Können Sie es einpacken? · Das macht … Euro.
 *
 * "gefallen" bu ünitenin dil bilgisi tuzağı: Türkçedeki "beğenmek" ile
 * özne-nesne TERS. "Mir gefällt die Jacke" = ceket bana hoş geliyor, yani
 * beğenen kişi DATİV'de. Egzersizler bunu ayrıca sınıyor.
 */
export const a1U12: SkillExercise[] = [
  {
    id: "a1-u12-r1",
    level: "A1",
    skill: "reading",
    unit: 12,
    title: "Ein Geschenk für Mia",
    genre: "Mesaj",
    intro: "İki arkadaş hediye arıyor. Ne alacaklar?",
    gloss: [
      { de: "das Geschenk", tr: "hediye", en: "gift" },
      { de: "gefallen", tr: "hoşuna gitmek", en: "to please" },
      { de: "der Gutschein", tr: "hediye çeki", en: "voucher" },
      { de: "einpacken", tr: "paketlemek", en: "to wrap" },
    ],
    minutes: 3,
    text:
      "Tom: Hallo! Ich suche ein Geschenk für Mia. Was kaufe ich?\n\nElif: Vielleicht ein Parfüm? Oder eine Tasche?\n\nTom: Ein Parfüm ist ein Problem — ich weiß nicht, was ihr gefällt. Eine Tasche finde ich praktisch.\n\nElif: Mir gefällt die schwarze Tasche im Laden am Marktplatz besser als die rote. Sie kostet 35 Euro.\n\nTom: Gut, die kaufe ich. Können sie das im Laden einpacken?\n\nElif: Ja, immer. Und wenn sie Mia gar nicht gefällt, kann sie die Tasche umtauschen — mit dem Kassenbon.",
    questions: [
      {
        text: "Was kauft Tom am Ende?",
        options: ["eine Tasche", "ein Parfüm", "einen Gutschein"],
        answer: 0,
        explain: "„Gut, die kaufe ich.“ — siyah çanta.",
      },
      {
        text: "Welche Tasche gefällt Elif besser?",
        options: ["die schwarze", "die rote", "beide gleich"],
        answer: 0,
        explain: "„Mir gefällt die schwarze Tasche … besser als die rote.“",
      },
      {
        kind: "gapfill",
        text: "Die Tasche kostet ___ Euro.",
        options: [],
        answer: 0,
        accept: ["35"],
        explain: "„Sie kostet 35 Euro.“",
      },
      {
        text: "Was braucht Mia zum Umtauschen?",
        options: ["den Kassenbon", "einen Gutschein", "eine Karte"],
        answer: 0,
        explain: "„kann sie die Tasche umtauschen — mit dem Kassenbon.“",
      },
      {
        text: "Richtig oder falsch? Tom weiß, welches Parfüm Mia mag.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „ich weiß nicht, was ihr gefällt.“",
      },
    ],
  },
  {
    id: "a1-u12-r2",
    level: "A1",
    skill: "reading",
    unit: 12,
    title: "Auf dem Wochenmarkt",
    genre: "Blog",
    intro: "Bir pazar gezisi. Ne alınıyor, ne kadar?",
    gloss: [
      { de: "frisch", tr: "taze", en: "fresh" },
      { de: "das Pfund", tr: "yarım kilo", en: "pound (500 g)" },
      { de: "mehr", tr: "daha fazla", en: "more" },
      { de: "die Bäckerei", tr: "fırın", en: "bakery" },
    ],
    minutes: 3,
    text:
      "Jeden Samstag gehe ich auf den Markt am Marktplatz. Das Obst und Gemüse ist dort sehr frisch und oft günstiger als im Supermarkt.\n\nHeute kaufe ich ein Pfund Tomaten und zwei Pfund Kartoffeln. Dann kommt die Frage: „Ein bisschen mehr?“ Ich möchte weniger — ein Pfund ist gut.\n\nDanach gehe ich in die Bäckerei und kaufe Brot und Brötchen.\n\nAm Kiosk kaufe ich noch eine Zeitung. Das macht zusammen 14 Euro.\n\nDer Markt gefällt mir besser als der Supermarkt — im Supermarkt ist alles so groß.",
    questions: [
      {
        text: "Wann geht die Person auf den Markt?",
        options: ["jeden Samstag", "jeden Sonntag", "jeden Tag"],
        answer: 0,
        explain: "„Jeden Samstag gehe ich auf den Markt.“",
      },
      {
        kind: "gapfill",
        text: "Sie kauft ___ Pfund Kartoffeln.",
        options: [],
        answer: 0,
        accept: ["zwei", "2"],
        explain: "„ein Pfund Tomaten und zwei Pfund Kartoffeln“.",
      },
      {
        text: "Was kauft sie in der Bäckerei?",
        options: ["Brot und Brötchen", "Obst und Gemüse", "eine Zeitung"],
        answer: 0,
        explain: "„gehe ich in die Bäckerei und kaufe Brot und Brötchen“. Gazete kioskta.",
      },
      {
        text: "Warum gefällt ihr der Markt besser?",
        options: [
          "Im Supermarkt ist alles so groß",
          "Der Markt ist teurer",
          "Der Supermarkt hat kein Obst",
        ],
        answer: 0,
        explain: "„im Supermarkt ist alles so groß“ — pazarı tercih etme sebebi.",
      },
    ],
  },
  {
    id: "a1-u12-l1",
    level: "A1",
    skill: "listening",
    unit: 12,
    title: "Ich möchte das umtauschen",
    genre: "Diyalog",
    intro: "Bir müşteri iade yapmak istiyor. Sorun ne?",
    gloss: [
      { de: "umtauschen", tr: "değiştirmek", en: "to exchange" },
      { de: "eng", tr: "dar", en: "tight" },
      { de: "der Kassenbon", tr: "fiş", en: "receipt" },
    ],
    minutes: 2,
    segments: [
      { text: "Guten Tag, ich möchte diese Hose umtauschen." },
      { text: "Gern. Was ist das Problem?" },
      { text: "Sie ist zu eng. Haben Sie eine Größe weiter?" },
      { text: "Haben Sie den Kassenbon?" },
      { text: "Ja, hier bitte." },
      { text: "Gut. Größe 42 haben wir noch in Schwarz." },
    ],
    questions: [
      {
        text: "Was möchte die Person umtauschen?",
        options: ["eine Hose", "ein Hemd", "eine Jacke"],
        answer: 0,
        explain: "„ich möchte diese Hose umtauschen.“",
      },
      {
        text: "Was ist das Problem?",
        options: ["Die Hose ist zu eng", "Die Farbe gefällt nicht", "Die Hose ist zu teuer"],
        answer: 0,
        explain: "„Sie ist zu eng.“ — bir beden büyüğü isteniyor.",
      },
      {
        kind: "gapfill",
        text: "Die Person braucht den ___.",
        options: [],
        answer: 0,
        accept: ["Kassenbon"],
        explain: "„Haben Sie den Kassenbon?“ — „Ja, hier bitte.“",
      },
      {
        text: "In welcher Farbe gibt es Größe 42?",
        options: ["in Schwarz", "in Rot", "in Weiß"],
        answer: 0,
        explain: "„Größe 42 haben wir noch in Schwarz.“",
      },
    ],
  },
  {
    id: "a1-u12-l2",
    level: "A1",
    skill: "listening",
    unit: 12,
    title: "Wie findest du das?",
    genre: "Diyalog",
    intro: "İki arkadaş bir hediye seçiyor. Hangisi daha çok beğeniliyor?",
    gloss: [
      { de: "gefallen", tr: "hoşuna gitmek", en: "to please" },
      { de: "besser", tr: "daha iyi", en: "better" },
      { de: "zeigen", tr: "göstermek", en: "to show" },
    ],
    minutes: 2,
    segments: [
      { text: "Schau, ich zeige dir zwei Sachen. Wie findest du den Rucksack?" },
      { text: "Der gefällt mir gut. Er ist praktisch." },
      { text: "Und der Koffer? Der ist schön, aber teuer." },
      { text: "Mir gefällt der Rucksack besser. Der Koffer gefällt mir gar nicht." },
      { text: "Gut, dann kaufe ich den Rucksack." },
    ],
    questions: [
      {
        text: "Was gefällt der zweiten Person besser?",
        options: ["der Rucksack", "der Koffer", "beides gleich"],
        answer: 0,
        explain: "„Mir gefällt der Rucksack besser.“",
      },
      {
        text: "Warum gefällt der Rucksack?",
        options: ["Er ist praktisch", "Er ist billig", "Er ist schwarz"],
        answer: 0,
        explain: "„Der gefällt mir gut. Er ist praktisch.“",
      },
      {
        kind: "gapfill",
        text: "Der Koffer gefällt der Person ___ nicht.",
        options: [],
        answer: 0,
        accept: ["gar"],
        explain: "„Der Koffer gefällt mir gar nicht.“ — „gar nicht“ = hiç.",
      },
      {
        text: "Richtig oder falsch? Sie kaufen den Koffer.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „dann kaufe ich den Rucksack.“",
      },
    ],
  },
  {
    id: "a1-u12-w1",
    level: "A1",
    skill: "writing",
    unit: 12,
    title: "gefallen — dikkat!",
    genre: "Dil bilgisi",
    intro: "„gefallen“ kalıbını ve iade cümlelerini yaz.",
    gloss: [
      { de: "gefallen", tr: "hoşuna gitmek", en: "to please" },
      { de: "umtauschen", tr: "değiştirmek", en: "to exchange" },
      { de: "zurückgeben", tr: "geri vermek", en: "to give back" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Ceket hoşuma gidiyor.",
        answer: "Die Jacke gefällt mir",
        hint: "DİKKAT: Türkçedeki „beğenmek“ ile özne TERS. Beğenen kişi Dativ'de (mir), beğenilen şey ÖZNE: „Die Jacke gefällt mir“ — „Ich gefalle die Jacke“ DEĞİL.",
      },
      {
        kind: "build",
        tr: "Bu pantolonu değiştirmek istiyorum.",
        answer: "Ich möchte diese Hose umtauschen",
        hint: "umtauschen ayrılabilir ama „möchte“ ile mastar hâlinde SONDA durur, ayrılmaz.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi „gar nicht“ ile olumsuz yap.",
        source: "Der Koffer gefällt mir.",
        answer: "Der Koffer gefällt mir gar nicht.",
        alternatives: ["Der Koffer gefällt mir gar nicht"],
        why: "„gar nicht“ = hiç. „nicht“ten daha güçlüdür ve cümlenin sonunda durur.",
      },
    ],
  },
  {
    id: "a1-u12-w2",
    level: "A1",
    skill: "writing",
    unit: 12,
    title: "Ein Geschenk aussuchen",
    genre: "Mesaj",
    intro: "Arkadaşının mesajına cevap yaz: hangi hediyeyi öneriyorsun?",
    gloss: [
      { de: "das Geschenk", tr: "hediye", en: "gift" },
      { de: "praktisch", tr: "kullanışlı", en: "practical" },
      { de: "der Laden", tr: "dükkân", en: "shop" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Bana çanta daha çok hoş geliyor.",
        answer: "Mir gefällt die Tasche besser",
        hint: "Cümle „Mir“ ile başlayabilir: „Mir gefällt …“ — fiil yine ikinci sırada.",
      },
      {
        kind: "free",
        prompt:
          "Arkadaşının mesajına cevap yaz (4-5 cümle). Bir hediye öner, neden beğendiğini söyle, fiyat ver ve nereden alınacağını yaz.",
        stimulus:
          "Hallo! Ich suche ein Geschenk für meine Schwester. Sie ist 25 und mag Farben. Vielleicht ein Parfüm oder eine Tasche? Was meinst du? Tom",
        minWords: 30,
        checklist: [
          "Bir hediye önerdin mi? (Vielleicht … / Ich finde … gut.)",
          "„gefallen“ kalıbını doğru kullandın mı? (Mir gefällt … / Ihr gefällt …)",
          "Fiyat verdin mi? (Das kostet … Euro.)",
          "Nereden alınacağını yazdın mı? (im Laden … / auf dem Markt …)",
        ],
        phrases: [
          { de: "Mir gefällt … besser.", tr: "Bana … daha çok hoş geliyor.", en: "I prefer …" },
          { de: "Ich finde … praktisch.", tr: "… kullanışlı buluyorum.", en: "I find … practical." },
          { de: "Können Sie es einpacken?", tr: "Paketleyebilir misiniz?", en: "Can you wrap it?" },
        ],
        sample:
          "Hallo Tom,\n\nmir gefällt die Tasche besser als das Parfüm. Bei einem Parfüm weißt du nicht, was ihr gefällt.\n\nIm Laden am Marktplatz gibt es Taschen in Rot und Blau. Sie kosten 35 Euro. Das finde ich günstig.\n\nEine Tasche ist auch praktisch. Und wenn sie ihr gar nicht gefällt, kann sie die Tasche umtauschen.\n\nViele Grüße\nElif",
      },
    ],
  },
];
