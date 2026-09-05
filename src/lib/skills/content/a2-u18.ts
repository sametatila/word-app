import type { SkillExercise } from "../types";

/**
 * A2 · Ünite 18 — "Hediyelik, tren rötarı, doğum günü, parti planı".
 *
 * Dört ders: Souvenirs kaufen · Der Zug hat Verspätung · Alles Gute zum
 * Geburtstag! · Wir planen eine Party. İçerik ünite 1-18'in kelimeleriyle
 * sınırlı.
 *
 *   Ünite 18: das Andenken, typisch, originell, handlich, der Becher,
 *             die Kette, das Wechselgeld, die Kosmetik · abreisen, eintreffen,
 *             umkehren, der Fahrschein, der Schaffner, das Abteil,
 *             die Endstation, die Zugfahrt · die Torte, die Feier, das Fest,
 *             die Familienfeier, festlich, naschen, der Zwilling,
 *             die Jahreszeit · planen, organisieren, veranstalten, aufstellen,
 *             decken, die Serviette, der Teller, der Besuch
 *   Kalıplar: Ich kaufe meiner Schwester ein Andenken. · Was ist typisch für
 *             diese Stadt? · Unser Zug hat Verspätung. · Wir müssen bis zur
 *             Endstation fahren. · Alles Gute zum Geburtstag! · Ich habe am
 *             dritten Mai Geburtstag. · Ich hoffe, dass alle kommen. ·
 *             Kannst du bitte den Tisch decken?
 *
 * Ünitenin iki zor noktası birbirine hiç benzemiyor ama ikisi de A2'de
 * kanamaya devam ediyor: kime alındığını söyleyen yönelme hâli
 * (meiner Schwester, nicht meine Schwester) ve tarihin sıra sayısıyla
 * söylenmesi (am dritten Mai). Hediye ve doğum günü bu ikisini doğal olarak
 * aynı sohbete getiriyor, o yüzden egzersizler o sohbetin içinde duruyor.
 */
export const a2U18: SkillExercise[] = [
  {
    id: "a2-u18-r1",
    level: "A2",
    skill: "reading",
    unit: 18,
    title: "Was nehme ich mit nach Hause?",
    genre: "Blog yazısı",
    intro: "Hediyelik alma rehberi. Kime ne, ne kadara?",
    gloss: [
      { de: "das Andenken", tr: "hediyelik eşya", en: "souvenir" },
      { de: "typisch", tr: "tipik", en: "typical" },
      { de: "originell", tr: "özgün", en: "original" },
      { de: "handlich", tr: "elverişli, taşınabilir", en: "handy" },
      { de: "der Becher", tr: "kupa", en: "mug" },
      { de: "die Kette", tr: "kolye", en: "necklace" },
      { de: "die Kosmetik", tr: "kozmetik", en: "cosmetics" },
      { de: "das Wechselgeld", tr: "para üstü", en: "change" },
    ],
    minutes: 4,
    text:
      "ANDENKEN — ABER BITTE KEINE BECHER\n\n" +
      "Jede Stadt hat einen Laden voll mit Bechern. Sie sind billig, sie sind typisch, und niemand freut sich wirklich darüber.\n\n" +
      "Ich kaufe meiner Schwester lieber etwas Kleines aus einem normalen Geschäft: eine Kette vom Markt, Kosmetik aus der Apotheke, eine Packung Kaffee. Handlich, nicht schwer, und man benutzt es.\n\n" +
      "Meinem Vater bringe ich meistens etwas zu essen mit. Das ist nicht originell, aber es kommt immer gut an.\n\n" +
      "Ein Tipp noch: Auf dem Markt zahlen Sie besser bar und passend. Die Händler haben oft kein Wechselgeld, und ein großer Geldschein macht schnell schlechte Laune.\n\n" +
      "Und wenn Sie wirklich nicht wissen, was typisch für diese Stadt ist: fragen Sie im Café. Da bekommen Sie bessere Antworten als im Andenkenladen.",
    questions: [
      {
        text: "Was hält der Text von Bechern als Andenken?",
        options: ["Sie sind das beste Geschenk.", "Niemand freut sich wirklich darüber.", "Sie sind zu teuer."],
        answer: 1,
        explain: "„Sie sind billig, sie sind typisch, und niemand freut sich wirklich darüber.“",
      },
      {
        kind: "gapfill",
        text: "Ich kaufe ___ Schwester lieber etwas Kleines.",
        options: [],
        answer: 0,
        accept: ["meiner"],
        explain: "Kime alındığı yönelme hâliyle söylenir; dişil isimde iyelik sözcüğü meiner olur.",
      },
      {
        text: "Was bringt der Autor seinem Vater mit?",
        options: ["Eine Kette", "Etwas zu essen", "Kosmetik"],
        answer: 1,
        explain: "„Meinem Vater bringe ich meistens etwas zu essen mit.“",
      },
      {
        kind: "short_answer",
        text: "Warum soll man auf dem Markt passend bezahlen?",
        options: [],
        answer: 0,
        accept: [
          "die Händler haben oft kein Wechselgeld",
          "sie haben kein Wechselgeld",
          "kein Wechselgeld",
        ],
        explain: "„Die Händler haben oft kein Wechselgeld, und ein großer Geldschein macht schnell schlechte Laune.“",
      },
      {
        text: "Der Text empfiehlt, im Andenkenladen nach Tipps zu fragen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „fragen Sie im Café. Da bekommen Sie bessere Antworten als im Andenkenladen.“",
      },
    ],
  },
  {
    id: "a2-u18-r2",
    level: "A2",
    skill: "reading",
    unit: 18,
    title: "Einladung zur Familienfeier",
    genre: "Davetiye",
    intro: "Bir aile kutlaması daveti. Ne zaman, nerede, kim ne getiriyor?",
    gloss: [
      { de: "die Familienfeier", tr: "aile kutlaması", en: "family celebration" },
      { de: "die Feier", tr: "kutlama", en: "celebration" },
      { de: "festlich", tr: "şık, bayramlık", en: "festive" },
      { de: "die Torte", tr: "yaş pasta", en: "cake" },
      { de: "der Zwilling", tr: "ikiz", en: "twin" },
      { de: "veranstalten", tr: "düzenlemek", en: "to organise" },
      { de: "naschen", tr: "atıştırmak (tatlı)", en: "to nibble sweets" },
    ],
    minutes: 4,
    text:
      "LIEBE FAMILIE, LIEBE FREUNDE,\n\n" +
      "unsere Zwillinge werden sechs! Am dritten Mai feiern wir das — und weil der dritte ein Mittwoch ist, veranstalten wir die Feier am Samstag, dem sechsten Mai.\n\n" +
      "Wann: 15 Uhr, bei uns im Garten (Lindenweg 8).\n" +
      "Was: Kaffee, Torte und später Würstchen vom Grill.\n\n" +
      "Bitte nichts Festliches anziehen — die Kinder spielen im Garten, und am Ende sind alle schmutzig.\n\n" +
      "Wer möchte, bringt einen Salat mit. Sagt uns aber bitte vorher Bescheid, damit wir nicht fünf Kartoffelsalate haben. Getränke und Torte machen wir.\n\n" +
      "Und noch etwas: Die Zwillinge naschen genug. Statt Süßigkeiten freuen wir uns über ein Buch oder etwas für draußen.\n\n" +
      "Sagt uns bis zum 28. April Bescheid.\nAnja und Robert",
    questions: [
      {
        text: "Wann findet die Feier statt?",
        options: ["Am dritten Mai", "Am sechsten Mai", "Am 28. April"],
        answer: 1,
        explain: "Doğum günü 3 Mayıs ama çarşamba; kutlama „am Samstag, dem sechsten Mai“.",
      },
      {
        kind: "gapfill",
        text: "Am ___ Mai feiern wir das.",
        options: [],
        answer: 0,
        accept: ["dritten"],
        explain: "Tarih sıra sayısıyla söylenir ve am'den sonra -en eki alır.",
      },
      {
        text: "Was sollen die Gäste anziehen?",
        options: ["Etwas Festliches", "Nichts Festliches", "Etwas Weißes"],
        answer: 1,
        explain: "„Bitte nichts Festliches anziehen — die Kinder spielen im Garten.“",
      },
      {
        kind: "short_answer",
        text: "Was wünschen sich die Eltern statt Süßigkeiten?",
        options: [],
        answer: 0,
        accept: ["ein Buch oder etwas für draußen", "ein Buch", "etwas für draußen"],
        explain: "„Statt Süßigkeiten freuen wir uns über ein Buch oder etwas für draußen.“",
      },
      {
        text: "Die Gäste sollen die Torte mitbringen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Getränke und Torte machen wir.“ Misafirler isterse salata getiriyor.",
      },
    ],
  },
  {
    id: "a2-u18-l1",
    level: "A2",
    skill: "listening",
    unit: 18,
    title: "Der Zug hat Verspätung",
    genre: "Diyalog",
    intro: "Trende bir aksilik. Kaç dakika gecikme, ne yapmak gerekiyor?",
    gloss: [
      { de: "der Schaffner", tr: "kondüktör", en: "conductor" },
      { de: "der Fahrschein", tr: "bilet", en: "ticket" },
      { de: "das Abteil", tr: "kompartıman", en: "compartment" },
      { de: "die Endstation", tr: "son durak", en: "final stop" },
      { de: "die Verspätung", tr: "gecikme", en: "delay" },
      { de: "eintreffen", tr: "varmak", en: "to arrive" },
      { de: "aufheben", tr: "saklamak", en: "to keep" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Schaffner", text: "Die Fahrscheine bitte." },
      { speaker: "Frau Genç", text: "Hier, bitte. Sagen Sie, stimmt das — unser Zug hat Verspätung?" },
      { speaker: "Schaffner", text: "Leider ja, etwa fünfundzwanzig Minuten. Vor uns steht ein Güterzug." },
      { speaker: "Frau Genç", text: "Oh nein. Ich muss in Fulda umsteigen, mein Anschluss geht um 17:20." },
      { speaker: "Schaffner", text: "Den bekommen Sie nicht mehr. Aber um 18:05 fährt der nächste." },
      { speaker: "Frau Genç", text: "Und wann bin ich dann zu Hause?" },
      { speaker: "Schaffner", text: "Kurz nach neun. Sie fahren ja bis zur Endstation, oder?" },
      { speaker: "Frau Genç", text: "Ja, bis Kassel. Ich bin gestern schon zwei Stunden zu spät eingetroffen." },
      { speaker: "Schaffner", text: "Das tut mir leid. Heben Sie den Fahrschein auf, damit bekommen Sie Geld zurück." },
      { speaker: "Frau Genç", text: "Gut zu wissen. Ist das Abteil hinten noch frei? Hier ist es sehr laut." },
      { speaker: "Schaffner", text: "Ja, gehen Sie ruhig nach hinten." },
    ],
    questions: [
      {
        text: "Wie viel Verspätung hat der Zug?",
        options: ["Fünf Minuten", "Etwa 25 Minuten", "Zwei Stunden"],
        answer: 1,
        explain: "„Leider ja, etwa fünfundzwanzig Minuten. Vor uns steht ein Güterzug.“",
      },
      {
        kind: "gapfill",
        text: "Unser Zug ___ Verspätung.",
        options: [],
        answer: 0,
        accept: ["hat"],
        explain: "Almancada gecikme „sahip olunur“: Verspätung haben.",
      },
      {
        text: "Wann fährt der nächste Anschluss?",
        options: ["Um 17:20", "Um 18:05", "Um 21:00"],
        answer: 1,
        explain: "17:20 kaçıyor: „Aber um 18:05 fährt der nächste.“",
      },
      {
        kind: "dictation",
        text: "Kondüktörün bileti saklama nedenini söylediği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "Heben Sie den Fahrschein auf, damit bekommen Sie Geld zurück.",
          "Heben Sie den Fahrschein auf",
        ],
        explain: "Gecikme parasını almak için bilet gerekiyor — pratik bir bilgi.",
      },
    ],
  },
  {
    id: "a2-u18-l2",
    level: "A2",
    skill: "listening",
    unit: 18,
    title: "Wir planen eine Party",
    genre: "Diyalog",
    intro: "İki ev arkadaşı parti hazırlığı yapıyor. Kim neyi üstleniyor?",
    gloss: [
      { de: "aufstellen", tr: "kurmak, dizmek", en: "to set up" },
      { de: "decken", tr: "(masa) kurmak", en: "to set (the table)" },
      { de: "die Serviette", tr: "peçete", en: "napkin" },
      { de: "der Teller", tr: "tabak", en: "plate" },
      { de: "der Besuch", tr: "misafir, ziyaret", en: "visitors" },
      { de: "organisieren", tr: "organize etmek", en: "to organise" },
      { de: "planen", tr: "planlamak", en: "to plan" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Lena", text: "Also, Samstag um acht. Ich hoffe, dass alle kommen." },
      { speaker: "Kaan", text: "Bis jetzt haben elf zugesagt. Rechne mit fünfzehn." },
      { speaker: "Lena", text: "Fünfzehn? Dann brauchen wir mehr Teller. Wir haben nur acht." },
      { speaker: "Kaan", text: "Ich glaube, dass meine Mutter uns welche leiht. Ich frage sie morgen." },
      { speaker: "Lena", text: "Perfekt. Kannst du dann auch die Servietten kaufen?" },
      { speaker: "Kaan", text: "Mache ich. Und wer stellt die Tische auf?" },
      { speaker: "Lena", text: "Die stellen wir zusammen auf, Samstagnachmittag. Danach decke ich den Tisch." },
      { speaker: "Kaan", text: "Und das Essen? Kochen wir, oder bestellen wir?" },
      { speaker: "Lena", text: "Ich koche eine große Suppe. Den Rest bringt der Besuch mit." },
      { speaker: "Kaan", text: "Gut. Ich organisiere die Getränke und die Musik." },
    ],
    questions: [
      {
        text: "Mit wie vielen Gästen rechnen sie?",
        options: ["Acht", "Elf", "Fünfzehn"],
        answer: 2,
        explain: "Onbir kişi kabul etmiş ama „Rechne mit fünfzehn.“",
      },
      {
        kind: "gapfill",
        text: "Ich hoffe, ___ alle kommen.",
        options: [],
        answer: 0,
        accept: ["dass"],
        explain: "Umut, inanç ve düşünce cümleleri dass ile bağlanır; fiil sona gider.",
      },
      {
        text: "Woher bekommen sie mehr Teller?",
        options: ["Sie kaufen neue.", "Kaans Mutter leiht welche.", "Der Besuch bringt Teller mit."],
        answer: 1,
        explain: "„Ich glaube, dass meine Mutter uns welche leiht.“",
      },
      {
        kind: "short_answer",
        text: "Was organisiert Kaan?",
        options: [],
        answer: 0,
        accept: [
          "die Getränke und die Musik",
          "Getränke und Musik",
          "die Getränke und Musik",
        ],
        explain: "„Ich organisiere die Getränke und die Musik.“ Peçeteleri de o alıyor.",
      },
    ],
  },
  {
    id: "a2-u18-w1",
    level: "A2",
    skill: "writing",
    unit: 18,
    title: "Kime, ne zaman, umarım ki",
    genre: "Dil bilgisi",
    intro: "Yönelme hâli, sıra sayılı tarih ve dass yan cümlesi.",
    gloss: [
      { de: "das Andenken", tr: "hediyelik eşya", en: "souvenir" },
      { de: "die Feier", tr: "kutlama", en: "celebration" },
      { de: "decken", tr: "(masa) kurmak", en: "to set (the table)" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Kız kardeşime bir hediyelik alıyorum.",
        answer: "Ich kaufe meiner Schwester ein Andenken",
        hint: "Kime alındığı yönelme hâlinde ve nesneden önce durur.",
      },
      {
        kind: "build",
        tr: "Doğum günüm üç Mayıs'ta.",
        answer: "Ich habe am dritten Mai Geburtstag",
        hint: "Tarih sıra sayısıyla: am + sayı + -ten/-sten.",
      },
      {
        kind: "build",
        tr: "Umarım herkes gelir.",
        answer: "Ich hoffe, dass alle kommen",
        hint: "dass yan cümlesinde çekimli fiil en sona gider.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: hediyeyi alan kişi yanlış hâlde.",
        source: "Ich bringe meine Vater etwas zu essen mit.",
        answer: "Ich bringe meinem Vater etwas zu essen mit.",
        alternatives: ["Ich bringe meinem Vater etwas zu essen mit"],
        why: "mitbringen iki nesne alır: getirilen şey belirtme, getirilen kişi yönelme hâlinde — eril isimde meinem.",
      },
    ],
  },
  {
    id: "a2-u18-w2",
    level: "A2",
    skill: "writing",
    unit: 18,
    title: "Antwort auf die Einladung",
    genre: "Mesaj",
    intro: "Davete cevap yaz: geliyor musun, ne getiriyorsun, ne soruyorsun?",
    gloss: [
      { de: "die Feier", tr: "kutlama", en: "celebration" },
      { de: "die Torte", tr: "yaş pasta", en: "cake" },
      { de: "der Zwilling", tr: "ikiz", en: "twin" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "reply",
        prompt: "Davete cevap yaz. Geleceğini söyle, tebrik et, ne getireceğini bildir ve bir şey sor.",
        stimulus:
          "LIEBE FAMILIE, LIEBE FREUNDE,\n\n" +
          "unsere Zwillinge werden sechs! Wir feiern am Samstag, dem sechsten Mai, um 15 Uhr bei uns im Garten (Lindenweg 8).\n\n" +
          "Kaffee, Torte und später Würstchen vom Grill. Wer möchte, bringt einen Salat mit — bitte vorher Bescheid sagen.\n\n" +
          "Statt Süßigkeiten freuen wir uns über ein Buch oder etwas für draußen.\n\n" +
          "Antwort bitte bis zum 28. April.\nAnja und Robert",
        checklist: [
          "Geleceğini (ya da gelemeyeceğini) açıkça yazdın mı?",
          "Tebrik cümlesi kurdun mu?",
          "Ne getireceğini söyledin mi?",
          "En az bir soru sordun mu (saat, adres ya da hediye)?",
        ],
        minWords: 40,
        phrases: [
          { de: "Wir kommen gern.", tr: "seve seve geliriz", en: "we'd love to come" },
          { de: "Alles Gute zum Geburtstag!", tr: "doğum günün kutlu olsun", en: "happy birthday" },
          { de: "Ich bringe einen Salat mit.", tr: "bir salata getireceğim", en: "I'll bring a salad" },
        ],
        sample:
          "Liebe Anja, lieber Robert,\n\n" +
          "vielen Dank für die Einladung — wir kommen sehr gern! Und schon jetzt: alles Gute zum Geburtstag, ihr beiden Großen.\n\n" +
          "Ich bringe einen Nudelsalat mit, für ungefähr acht Personen. Sagt Bescheid, wenn schon jemand anders Nudelsalat macht, dann nehme ich etwas anderes.\n\n" +
          "Für die Zwillinge haben wir zwei Bücher und einen Ball gekauft. Kein Zucker, versprochen.\n\n" +
          "Eine Frage noch: Sollen wir Stühle mitbringen? Wir haben vier im Keller.\n\n" +
          "Bis zum sechsten Mai!\nNilay und Tim",
      },
    ],
  },
];
