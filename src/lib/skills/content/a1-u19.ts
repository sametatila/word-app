import type { SkillExercise } from "../types";

/**
 * A1 · Ünite 19 — "Spor, müzik, sinema ve hava durumu".
 *
 * Dört ders: Machst du Sport? · Welche Musik hörst du? · Gehen wir ins Kino? ·
 * Schönes Wetter heute! İçerik ünite 1-19'un kelimeleriyle sınırlı.
 *
 *   Ünite 19: der Sport, joggen, das Fitnessstudio, die Mannschaft, zweimal,
 *             der Fußball, der Basketball, Tennis spielen · die Musik,
 *             das Lied, die Gitarre, das Konzert, hören, die Band,
 *             das Klavier, die CD · das Kino, der Film, die Idee,
 *             das Popcorn, abholen, das Theater, die Geschichte, lachen ·
 *             das Wetter, die Sonne, der Regen, regnen, kalt, hoffentlich,
 *             wunderbar, draußen
 *   Kalıplar: Ich mache Sport. · zweimal pro Woche · Ich höre gern … ·
 *             Ich spiele Gitarre. · Gehen wir ins Kino? · Gute Idee! ·
 *             Es regnet. · Was für ein Wetter!
 *
 * Hava durumu sohbeti Almanya'da bir NEZAKET biçimi: tanımadığın biriyle
 * asansörde ya da kasada konuşmanın standart yolu. Egzersizler bunu bir
 * "küçük sohbet" kalıbı olarak kuruyor, bilgi aktarımı olarak değil.
 *
 * Müzik aleti çalmak "spielen" ile ARTİKELSİZ kurulur: "Ich spiele Gitarre"
 * — "die Gitarre spielen" değil. Yazma görevi bunu ayrıca vurguluyor.
 */
export const a1U19: SkillExercise[] = [
  {
    id: "a1-u19-r1",
    level: "A1",
    skill: "reading",
    unit: 19,
    title: "Sport im Verein",
    genre: "İlan",
    intro: "Bir spor derneğinin ilanı. Ne zaman, ne kadar?",
    gloss: [
      { de: "die Mannschaft", tr: "takım", en: "team" },
      { de: "joggen", tr: "koşu yapmak", en: "to jog" },
      { de: "das Fitnessstudio", tr: "spor salonu", en: "gym" },
      { de: "zweimal", tr: "iki kez", en: "twice" },
    ],
    minutes: 3,
    text:
      "SPORTVEREIN BREMEN\n\nFußball: Wir suchen Spieler für unsere Mannschaft. Wir üben zweimal pro Woche — am Dienstag und am Samstag, immer um 18 Uhr.\n\nBasketball: montags um 19 Uhr. Auch für alle!\n\nTennis spielen: am Sonntag, 10 bis 12 Uhr. Bitte einen Ball holen.\n\nJoggen: Jeden Morgen um 7 Uhr am Marktplatz. Kostenlos, auch bei Regen!\n\nDas Fitnessstudio im Haus ist von 8 bis 22 Uhr auf. Für Mitglieder kostenlos.\n\nWollen Sie mitmachen? Kommen Sie einfach!",
    questions: [
      {
        text: "Wie oft übt die Fußballmannschaft?",
        options: ["zweimal pro Woche", "einmal pro Woche", "jeden Tag"],
        answer: 0,
        explain: "„Wir üben zweimal pro Woche — am Dienstag und am Samstag.“",
      },
      {
        kind: "gapfill",
        text: "Basketball ist am Montag um ___ Uhr.",
        options: [],
        answer: 0,
        accept: ["19"],
        explain: "„Basketball: montags um 19 Uhr.“",
      },
      {
        text: "Was soll man zum Tennis mitbringen?",
        options: ["einen Ball", "Popcorn", "eine CD"],
        answer: 0,
        explain: "„Bitte einen Ball holen.“",
      },
      {
        text: "Richtig oder falsch? Bei Regen gibt es kein Joggen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Kostenlos, auch bei Regen!“",
      },
      {
        text: "Wann ist das Fitnessstudio auf?",
        options: ["von 8 bis 22 Uhr", "von 7 bis 19 Uhr", "nur am Wochenende"],
        answer: 0,
        explain: "„Das Fitnessstudio im Haus ist von 8 bis 22 Uhr auf.“",
      },
    ],
  },
  {
    id: "a1-u19-r2",
    level: "A1",
    skill: "reading",
    unit: 19,
    title: "Welche Musik hörst du?",
    genre: "Forum mesajı",
    intro: "Üç kişi müzik zevkini anlatıyor.",
    gloss: [
      { de: "das Lied", tr: "şarkı", en: "song" },
      { de: "die Band", tr: "müzik grubu", en: "band" },
      { de: "das Konzert", tr: "konser", en: "concert" },
      { de: "die Gitarre", tr: "gitar", en: "guitar" },
    ],
    minutes: 3,
    text:
      "Mia: Ich höre gern Musik aus der Türkei. Meine Mutter hat viele CDs zu Hause. Ich spiele auch Gitarre, aber nicht so gut.\n\nTom: Ich spiele Klavier, seit ich zehn bin. In meiner Band spielen wir zusammen und schreiben Lieder. Konzert: am Samstag im Theater!\n\nElif: Ich spiele nicht Gitarre und nicht Klavier. Aber ich höre jeden Tag Musik — beim Putzen, beim Kochen, überall. Mein Lieblingslied ist alt, aber wunderbar.",
    questions: [
      {
        text: "Was spielt Tom?",
        options: ["Klavier", "Gitarre", "kein Instrument"],
        answer: 0,
        explain: "„Ich spiele Klavier, seit ich zehn bin.“ Gitar çalan Mia.",
      },
      {
        text: "Wo ist das Konzert von Toms Band?",
        options: ["im Theater", "im Kino", "im Fitnessstudio"],
        answer: 0,
        explain: "„Nächstes Konzert: am Samstag im Theater!“",
      },
      {
        text: "Richtig oder falsch? Elif spielt Gitarre.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Ich spiele nicht Gitarre und nicht Klavier.“",
      },
      {
        kind: "gapfill",
        text: "Mia spielt ___, aber nicht so gut.",
        options: [],
        answer: 0,
        accept: ["Gitarre"],
        explain: "„Ich spiele auch Gitarre, aber nicht so gut.“ — artikel YOK.",
      },
    ],
  },
  {
    id: "a1-u19-l1",
    level: "A1",
    skill: "listening",
    unit: 19,
    title: "Gehen wir ins Kino?",
    genre: "Telefon",
    intro: "Sinema planı yapılıyor. Hangi film, ne zaman, kim kimi alıyor?",
    gloss: [
      { de: "der Film", tr: "film", en: "film" },
      { de: "abholen", tr: "almaya gelmek", en: "to pick up" },
      { de: "die Idee", tr: "fikir", en: "idea" },
    ],
    minutes: 2,
    segments: [
      { text: "Gehen wir heute ins Kino?" },
      { text: "Gute Idee! Welcher Film?" },
      { text: "Eine Geschichte aus Berlin. Alle lachen viel." },
      { text: "Wann fängt der Film an?" },
      { text: "Um 20 Uhr. Ich hole dich um halb acht ab." },
      { text: "Super. Und Popcorn kaufe ich!" },
    ],
    questions: [
      {
        text: "Was für ein Film ist das?",
        options: ["eine Geschichte aus Berlin", "ein Konzert", "ein Theaterstück"],
        answer: 0,
        explain: "„Eine Geschichte aus Berlin.“",
      },
      {
        kind: "gapfill",
        text: "Der Film fängt um ___ Uhr an.",
        options: [],
        answer: 0,
        accept: ["20"],
        explain: "„Um 20 Uhr.“",
      },
      {
        text: "Wann holt die erste Person die zweite ab?",
        options: ["um halb acht", "um acht", "um 20 Uhr"],
        answer: 0,
        explain: "„Ich hole dich um halb acht ab.“ — 19:30, film 20:00'de.",
      },
      {
        text: "Wer kauft das Popcorn?",
        options: ["die zweite Person", "die erste Person", "niemand"],
        answer: 0,
        explain: "„Und Popcorn kaufe ich!“ — cevap veren kişi.",
      },
    ],
  },
  {
    id: "a1-u19-l2",
    level: "A1",
    skill: "listening",
    unit: 19,
    title: "Schönes Wetter heute!",
    genre: "Küçük sohbet",
    intro: "Asansörde iki komşu. Almanya'da hava sohbeti bir nezaket biçimidir.",
    gloss: [
      { de: "das Wetter", tr: "hava", en: "weather" },
      { de: "regnen", tr: "yağmur yağmak", en: "to rain" },
      { de: "hoffentlich", tr: "umarım", en: "hopefully" },
    ],
    minutes: 2,
    segments: [
      { text: "Guten Morgen! Schönes Wetter heute." },
      { text: "Ja, wunderbar! Die Sonne scheint." },
      { text: "Und morgen? Hoffentlich regnet es nicht." },
      { text: "Hoffentlich bleibt es so. Am Samstag will ich draußen sein." },
      { text: "Ich auch. Einen schönen Tag noch!" },
    ],
    questions: [
      {
        text: "Wie ist das Wetter heute?",
        options: ["schön, die Sonne scheint", "es regnet", "es ist kalt"],
        answer: 0,
        explain: "„Schönes Wetter heute.“ — „Ja, wunderbar! Die Sonne scheint.“",
      },
      {
        text: "Was hofft die Person für morgen?",
        options: ["dass es nicht regnet", "dass es kalt wird", "dass sie ins Kino geht"],
        answer: 0,
        explain: "„Hoffentlich regnet es nicht.“",
      },
      {
        kind: "gapfill",
        text: "„___ bleibt es so.“",
        options: [],
        answer: 0,
        accept: ["Hoffentlich"],
        explain: "„Hoffentlich bleibt es so.“ — umarım böyle kalır.",
      },
      {
        text: "Was will die Person am Samstag machen?",
        options: ["draußen sein", "ins Kino gehen", "Musik hören"],
        answer: 0,
        explain: "„Am Samstag will ich draußen sein.“",
      },
    ],
  },
  {
    id: "a1-u19-w1",
    level: "A1",
    skill: "writing",
    unit: 19,
    title: "Sport, Musik, Wetter",
    genre: "Dil bilgisi",
    intro: "Üç konunun kalıplarını yaz.",
    gloss: [
      { de: "zweimal", tr: "iki kez", en: "twice" },
      { de: "die Gitarre", tr: "gitar", en: "guitar" },
      { de: "regnen", tr: "yağmur yağmak", en: "to rain" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Haftada iki kez spor yapıyorum.",
        answer: "Ich mache zweimal pro Woche Sport",
        hint: "Sıklık kalıbı: „zweimal pro Woche“. „Sport machen“ artikelsiz kurulur.",
      },
      {
        kind: "build",
        tr: "Gitar çalıyorum.",
        answer: "Ich spiele Gitarre",
        hint: "DİKKAT: müzik aleti ARTİKELSİZ gelir — „Ich spiele Gitarre / Klavier“. „die Gitarre spielen“ denmez.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi hava durumu sohbetine çevir.",
        source: "Die Sonne scheint.",
        answer: "Schönes Wetter heute!",
        alternatives: ["Was für ein Wetter!", "Schönes Wetter heute"],
        why: "Almanya'da hava sohbeti nezaket biçimidir; bilgi vermek değil, konuşmayı açmak için kullanılır.",
      },
    ],
  },
  {
    id: "a1-u19-w2",
    level: "A1",
    skill: "writing",
    unit: 19,
    title: "Was machst du gern?",
    genre: "Forum mesajı",
    intro: "Boş zamanını, sporunu ve müzik zevkini yaz.",
    gloss: [
      { de: "der Sport", tr: "spor", en: "sport" },
      { de: "die Musik", tr: "müzik", en: "music" },
      { de: "draußen", tr: "dışarıda", en: "outside" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Sinemaya gidelim mi?",
        answer: "Gehen wir ins Kino",
        hint: "Teklif kurarken fiil BAŞA gelir: „Gehen wir …?“ — „Wollen wir …?“ de aynı işi görür.",
      },
      {
        kind: "free",
        prompt:
          "Foruma yaz (4-5 cümle): Hangi sporu yapıyorsun, ne sıklıkta? Hangi müziği dinliyorsun? Hava güzelken ne yaparsın?",
        minWords: 30,
        checklist: [
          "Bir spor ve sıklık yazdın mı? (… zweimal pro Woche / jeden Morgen)",
          "Müzik hakkında bir şey yazdın mı? (Ich höre gern … / Ich spiele …)",
          "Hava durumundan bahsettin mi? (Wenn die Sonne scheint … / Bei Regen …)",
          "Yapamadığın ya da sevmediğin bir şey yazdın mı?",
        ],
        phrases: [
          { de: "Ich mache … Sport.", tr: "… spor yaparım.", en: "I do … sport." },
          { de: "Ich höre gern …", tr: "… dinlemeyi severim", en: "I like listening to …" },
          { de: "Bei Regen bleibe ich zu Hause.", tr: "Yağmurda evde kalırım.", en: "When it rains I stay home." },
        ],
        sample:
          "Hallo!\n\nIch mache zweimal pro Woche Sport. Am Dienstag gehe ich joggen und am Samstag spiele ich Fußball in einer Mannschaft.\n\nMusik höre ich jeden Tag. Ich spiele auch Gitarre, aber nicht so gut. Konzerte finde ich wunderbar.\n\nWenn die Sonne scheint, bin ich gern draußen. Bei Regen bleibe ich zu Hause und höre CDs.\n\nUnd ihr? Macht ihr Sport?",
      },
    ],
  },
];
