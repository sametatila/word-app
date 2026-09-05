import type { SkillExercise } from "../types";

/**
 * A1 · Ünite 9 — "Ayrılabilir fiiller, hafta günleri, cümle dizilişi, sabah".
 *
 * Dört ders: Ich stehe früh auf · Am Montag habe ich Zeit · Heute lerne ich
 * Deutsch · Zuerst dusche ich. İçerik ünite 1-9'un kelimeleriyle sınırlı.
 *
 *   Ünite 9: aufstehen, einkaufen, anrufen, ankommen, mitkommen, aufmachen,
 *            zumachen, anmachen · der Montag, der Dienstag, der Samstag,
 *            der Sonntag, die Woche, jeder, letzte, nie · heute, morgen,
 *            das Wochenende, lernen, manchmal, noch, schon, sicher ·
 *            wecken, sich waschen, duschen, sich anziehen, schnell, baden,
 *            frühstücken, früh
 *   Kalıplar: Ich stehe um … auf. · Ich kaufe … ein. · Am Montag … ·
 *            von … bis … · Heute lerne ich … · Zuerst … Dann … Danach …
 *
 * Bu ünitenin iki dil bilgisi odağı var ve ikisi de yazıda GÖRÜLÜR:
 *  1. AYRILABİLİR FİİL: ön ek cümlenin SONUNA gider — "Ich stehe um sechs auf."
 *  2. FİİL İKİNCİ SIRADA: cümle zaman bilgisiyle başlarsa özne fiilden SONRA
 *     gelir — "Heute lerne ich Deutsch." ("Heute ich lerne" değil.)
 * Egzersizler ikisini de ayrı ayrı sınıyor.
 */
export const a1U09: SkillExercise[] = [
  {
    id: "a1-u9-r1",
    level: "A1",
    skill: "reading",
    unit: 9,
    title: "Meine Woche",
    genre: "Blog",
    intro: "Tom haftasını anlatıyor: hangi gün ne yapıyor?",
    gloss: [
      { de: "aufstehen", tr: "kalkmak", en: "to get up" },
      { de: "einkaufen", tr: "alışveriş yapmak", en: "to shop" },
      { de: "jeder", tr: "her", en: "every" },
      { de: "nie", tr: "asla", en: "never" },
    ],
    minutes: 3,
    text:
      "Am Montag stehe ich früh auf. Um halb sieben! Dann dusche ich schnell und frühstücke.\n\nAm Dienstag lerne ich Deutsch. Mein Kurs beginnt um neun Uhr und geht von neun bis elf.\n\nAm Samstag kaufe ich ein. Ich gehe in den Supermarkt und kaufe Obst, Gemüse und Milch.\n\nAm Sonntag stehe ich nie früh auf. Ich schlafe lange und frühstücke um halb elf. Sonntag ist mein Tag!\n\nJede Woche rufe ich meine Eltern an. Manchmal kommt meine Schwester mit.",
    questions: [
      {
        text: "Wann steht Tom früh auf?",
        options: ["am Montag", "am Sonntag", "am Samstag"],
        answer: 0,
        explain: "„Am Montag stehe ich früh auf.“ Pazar günü asla erken kalkmıyor.",
      },
      {
        text: "Richtig oder falsch? Tom steht am Sonntag früh auf.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Am Sonntag stehe ich nie früh auf.“ — „nie“ asla demek.",
      },
      {
        text: "Von wann bis wann geht der Deutschkurs?",
        options: ["von neun bis elf", "von halb sieben bis neun", "von neun bis halb elf"],
        answer: 0,
        explain: "„geht von neun bis elf“.",
      },
      {
        kind: "gapfill",
        text: "Am Samstag kauft Tom ___.",
        options: [],
        answer: 0,
        accept: ["ein"],
        explain: "Ayrılabilir fiil: einkaufen → „kaufe ich ein“. Ön ek cümlenin sonuna gider.",
      },
      {
        text: "Wen ruft Tom jede Woche an?",
        options: ["seine Eltern", "seine Schwester", "seinen Kurs"],
        answer: 0,
        explain: "„Jede Woche rufe ich meine Eltern an.“",
      },
          {
        kind: "gapfill",
        text: "Am ___ stehe ich früh auf.",
        options: [],
        answer: 0,
        accept: ["Montag"],
        explain: "„Am Montag stehe ich früh auf.“",
      },
],
  },
  {
    id: "a1-u9-r2",
    level: "A1",
    skill: "reading",
    unit: 9,
    title: "Zuerst, dann, danach",
    genre: "Forum mesajı",
    intro: "İki kişi sabah rutinini anlatıyor. Sıraya dikkat et.",
    gloss: [
      { de: "sich anziehen", tr: "giyinmek", en: "to get dressed" },
      { de: "wecken", tr: "uyandırmak", en: "to wake someone" },
      { de: "schnell", tr: "hızlı", en: "quick" },
    ],
    minutes: 3,
    text:
      "Mia: Zuerst wecke ich meine Kinder. Dann dusche ich schnell. Danach ziehe ich mich an und frühstücke. Um acht Uhr gehe ich zur Arbeit.\n\nElif: Bei mir ist es anders. Zuerst frühstücke ich, dann wasche ich mich. Ich dusche nicht jeden Morgen — manchmal bade ich am Abend.\n\nMein Ehemann steht immer sehr früh auf. Er macht die Tür auf und kocht Kaffee. Ich stehe später auf.",
    questions: [
      {
        text: "Was macht Mia zuerst?",
        options: ["Sie weckt die Kinder", "Sie duscht", "Sie frühstückt"],
        answer: 0,
        explain: "„Zuerst wecke ich meine Kinder.“",
      },
      {
        text: "Was macht Elif zuerst?",
        options: ["Sie frühstückt", "Sie wäscht sich", "Sie duscht"],
        answer: 0,
        explain: "„Zuerst frühstücke ich, dann wasche ich mich.“ Mia'nın tam tersi sıra.",
      },
      {
        text: "Richtig oder falsch? Elif duscht jeden Morgen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Ich dusche nicht jeden Morgen — manchmal bade ich am Abend.“",
      },
      {
        kind: "gapfill",
        text: "Elifs Ehemann macht die Tür ___.",
        options: [],
        answer: 0,
        accept: ["auf"],
        explain: "Ayrılabilir fiil: aufmachen → „macht die Tür auf“.",
      },
          {
        kind: "gapfill",
        text: "Dann dusche ich ___.",
        options: [],
        answer: 0,
        accept: ["schnell"],
        explain: "„Dann dusche ich schnell.“",
      },
],
  },
  {
    id: "a1-u9-l1",
    level: "A1",
    skill: "listening",
    unit: 9,
    title: "Wann stehst du auf?",
    genre: "Diyalog",
    intro: "İki arkadaş sabah alışkanlıklarını konuşuyor.",
    gloss: [
      { de: "aufstehen", tr: "kalkmak", en: "to get up" },
      { de: "früh", tr: "erken", en: "early" },
      { de: "manchmal", tr: "bazen", en: "sometimes" },
    ],
    minutes: 2,
    segments: [
      { text: "Wann stehst du auf?" },
      { text: "Ich stehe um halb sieben auf. Und du?" },
      { text: "Das ist früh! Ich stehe um acht Uhr auf." },
      { text: "Am Wochenende stehe ich auch später auf." },
      { text: "Manchmal schlafe ich am Sonntag bis elf." },
    ],
    questions: [
      {
        text: "Wann steht die erste Person auf?",
        options: ["um halb sieben", "um acht Uhr", "um elf"],
        answer: 0,
        explain: "„Ich stehe um halb sieben auf.“ — 6:30.",
      },
      {
        kind: "gapfill",
        text: "Die zweite Person steht um ___ Uhr auf.",
        options: [],
        answer: 0,
        accept: ["acht", "8"],
        explain: "„Ich stehe um acht Uhr auf.“",
      },
      {
        text: "Was ist am Wochenende anders?",
        options: ["Sie stehen später auf", "Sie stehen früher auf", "Sie stehen nie auf"],
        answer: 0,
        explain: "„Am Wochenende stehe ich auch später auf.“",
      },
      {
        text: "Richtig oder falsch? Am Sonntag schläft die Person manchmal bis elf.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: „Manchmal schlafe ich am Sonntag bis elf.“",
      },
          {
        kind: "gapfill",
        text: "Am ___ stehe ich auch später auf.",
        options: [],
        answer: 0,
        accept: ["Wochenende"],
        explain: "„Am Wochenende stehe ich auch später auf.“",
      },
],
  },
  {
    id: "a1-u9-l2",
    level: "A1",
    skill: "listening",
    unit: 9,
    title: "Rufst du mich an?",
    genre: "Telefon",
    intro: "Bir plan yapılıyor. Hangi gün, saat kaçta?",
    gloss: [
      { de: "anrufen", tr: "telefonla aramak", en: "to call" },
      { de: "mitkommen", tr: "birlikte gelmek", en: "to come along" },
      { de: "ankommen", tr: "varmak", en: "to arrive" },
    ],
    minutes: 2,
    segments: [
      { text: "Hallo! Hast du am Dienstag Zeit?" },
      { text: "Am Dienstag arbeite ich. Aber am Samstag habe ich Zeit." },
      { text: "Gut, dann treffen wir uns am Samstag. Kommt deine Schwester mit?" },
      { text: "Ich glaube ja. Ich rufe sie heute an." },
      { text: "Gut. Wir kommen um halb drei an." },
    ],
    questions: [
      {
        text: "An welchem Tag treffen sie sich?",
        options: ["am Samstag", "am Dienstag", "am Sonntag"],
        answer: 0,
        explain: "„dann treffen wir uns am Samstag“ — salı çalışıyor.",
      },
      {
        text: "Wen ruft die Person heute an?",
        options: ["ihre Schwester", "ihren Bruder", "ihre Eltern"],
        answer: 0,
        explain: "„Ich rufe sie heute an.“ — kız kardeşini.",
      },
      {
        kind: "gapfill",
        text: "Sie kommen um ___ drei an.",
        options: [],
        answer: 0,
        accept: ["halb"],
        explain: "„Wir kommen um halb drei an.“ — 14:30.",
      },
      {
        text: "Richtig oder falsch? Die Schwester kommt sicher mit.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Ich glaube ja.“ — emin değil, arayıp soracak.",
      },
          {
        kind: "gapfill",
        text: "Hast du am ___ Zeit?",
        options: [],
        answer: 0,
        accept: ["Dienstag"],
        explain: "„Hast du am Dienstag Zeit?“",
      },
],
  },
  {
    id: "a1-u9-w1",
    level: "A1",
    skill: "writing",
    unit: 9,
    title: "Trennbare Verben",
    genre: "Dil bilgisi",
    intro: "Ayrılabilir fiiller ve cümle dizilişi.",
    gloss: [
      { de: "aufstehen", tr: "kalkmak", en: "to get up" },
      { de: "einkaufen", tr: "alışveriş yapmak", en: "to shop" },
      { de: "anrufen", tr: "telefonla aramak", en: "to call" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Saat altıda kalkıyorum.",
        answer: "Ich stehe um sechs auf",
        hint: "AYRILABİLİR FİİL: aufstehen → „stehe … auf“. Ön ek cümlenin SONUNA gider.",
      },
      {
        kind: "build",
        tr: "Bugün Almanca öğreniyorum.",
        answer: "Heute lerne ich Deutsch",
        hint: "Cümle zaman bilgisiyle başlarsa fiil İKİNCİ sırada kalır, özne fiilden sonra gelir: „Heute lerne ich“ — „Heute ich lerne“ DEĞİL.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi „Am Montag“ ile başlat.",
        source: "Ich kaufe am Montag ein.",
        answer: "Am Montag kaufe ich ein.",
        alternatives: ["Am Montag kaufe ich ein"],
        why: "Zaman öne alınınca fiil ikinci sırada kalır ve özne arkasına geçer; ayrılabilir ön ek yine sonda durur.",
      },
    ],
  },
  {
    id: "a1-u9-w2",
    level: "A1",
    skill: "writing",
    unit: 9,
    title: "Meine Woche beschreiben",
    genre: "Blog",
    intro: "Haftanı anlat: hangi gün ne yapıyorsun?",
    gloss: [
      { de: "die Woche", tr: "hafta", en: "week" },
      { de: "das Wochenende", tr: "hafta sonu", en: "weekend" },
      { de: "letzte", tr: "son", en: "last" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Pazar günü asla erken kalkmam.",
        answer: "Am Sonntag stehe ich nie früh auf",
        hint: "Üç kural bir arada: zaman önde → fiil ikinci → ayrılabilir ön ek sonda.",
      },
      {
        kind: "free",
        prompt:
          "Haftanı anlat (5-6 cümle). En az üç gün adı kullan, her gün için ne yaptığını yaz ve en az bir ayrılabilir fiil kullan.",
        minWords: 35,
        checklist: [
          "En az üç gün adı kullandın mı? (Montag, Dienstag, Samstag, Sonntag)",
          "Cümlelerin bazıları gün adıyla başlıyor mu? (Am Montag …)",
          "Fiil ikinci sırada mı? (Am Montag STEHE ich …)",
          "En az bir ayrılabilir fiil var mı? (aufstehen, einkaufen, anrufen …)",
        ],
        phrases: [
          { de: "Am Montag …", tr: "Pazartesi …", en: "On Monday …" },
          { de: "Ich stehe um … auf.", tr: "Saat …'da kalkarım.", en: "I get up at …" },
          { de: "Am Wochenende …", tr: "Hafta sonu …", en: "At the weekend …" },
        ],
        sample:
          "Am Montag stehe ich früh auf, um halb sieben. Dann dusche ich und frühstücke schnell.\n\nAm Dienstag lerne ich Deutsch. Mein Kurs geht von neun bis elf.\n\nAm Samstag kaufe ich ein. Ich gehe in den Supermarkt und kaufe Obst und Milch.\n\nAm Sonntag stehe ich nie früh auf. Ich schlafe lange und rufe meine Eltern an.\n\nAm Wochenende habe ich immer mehr Zeit.",
      },
    ],
  },
];
