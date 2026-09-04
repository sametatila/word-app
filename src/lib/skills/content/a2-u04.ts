import type { SkillExercise } from "../types";

/**
 * A2 · Ünite 4 — "Okul, taşınma, tanışma ve süre".
 *
 * Dört ders: Meine Schulzeit · Der große Umzug · Wie habt ihr euch
 * kennengelernt? · Seit drei Jahren. İçerik ünite 1-4'ün kelimeleriyle sınırlı.
 *
 *   Ünite 4: das Zeugnis, das Gymnasium, der Mitschüler, der Klassenlehrer,
 *            das Schulfach, streng, fleißig, auswendig · die Garage,
 *            einziehen, auspacken, der Kofferraum, leer, das Stockwerk,
 *            schleppen, die Wohnungssuche · sich vertragen, sich anfreunden,
 *            befreundet, romantisch, charmant, flirten, verabredet sein,
 *            zusammenleben · seit, vor, seither, zuvor, momentan, demnächst,
 *            bislang, erst
 *   Kalıplar: Wir durften nicht … · Wir mussten … lernen. · Wir sind …
 *             eingezogen. · Wir haben uns … kennengelernt. ·
 *             Ich wohne seit … hier. · Vor … bin ich gekommen.
 *
 * İki yeni şey: dönüşlü fiillerin karşılıklı anlamı ("wir haben uns …") ve
 * süre ile zaman noktasının ayrımı (seit + şimdiki zaman ↔ vor + geçmiş).
 * İkincisi Türkçe konuşan için görünmez bir tuzak, o yüzden hem okuma hem
 * dinleme hem yazma tarafında ayrı ayrı ölçülüyor.
 */
export const a2U04: SkillExercise[] = [
  {
    id: "a2-u04-r1",
    level: "A2",
    skill: "reading",
    unit: 4,
    title: "Meine Schulzeit",
    genre: "Blog yazısı",
    intro: "Okul yıllarının anlatımı: neye izin vardı, ne zorunluydu?",
    gloss: [
      { de: "das Gymnasium", tr: "lise", en: "grammar school" },
      { de: "der Klassenlehrer", tr: "sınıf öğretmeni", en: "class teacher" },
      { de: "der Mitschüler", tr: "sınıf arkadaşı", en: "classmate" },
      { de: "das Schulfach", tr: "okul dersi", en: "school subject" },
      { de: "streng", tr: "katı", en: "strict" },
      { de: "auswendig", tr: "ezbere", en: "by heart" },
      { de: "fleißig", tr: "çalışkan", en: "hard-working" },
      { de: "das Zeugnis", tr: "karne", en: "school report" },
    ],
    minutes: 4,
    text:
      "Ich bin neun Jahre lang auf ein Gymnasium in einer kleinen Stadt gegangen. Wenn ich heute daran denke, war die Schule sehr streng.\n\n" +
      "Unser Klassenlehrer hieß Herr Vogt. Wir durften im Unterricht nicht sprechen, und wir durften auch nicht aufstehen. Aber er war fair: wer eine Frage hatte, bekam immer eine Antwort.\n\n" +
      "Mein liebstes Schulfach war Geografie, weil wir dort Filme über andere Länder gesehen haben. Am schlimmsten war Latein. Wir mussten jede Woche zwanzig Wörter auswendig lernen, und ich war nie besonders fleißig.\n\n" +
      "Trotzdem war mein Zeugnis am Ende ganz okay. Zwei Mitschüler von damals sehe ich heute noch — wir sind seit fast zwanzig Jahren befreundet.",
    questions: [
      {
        text: "Wie lange war der Autor auf dem Gymnasium?",
        options: ["Fünf Jahre", "Neun Jahre", "Zwanzig Jahre"],
        answer: 1,
        explain: "„Ich bin neun Jahre lang auf ein Gymnasium … gegangen.“ Yirmi, bugünkü arkadaşlığın süresi.",
      },
      {
        kind: "gapfill",
        text: "Wir ___ im Unterricht nicht sprechen.",
        options: [],
        answer: 0,
        accept: ["durften"],
        explain: "İzin fiilinin kısa geçmişi: dürfen → durften. Olumsuzuyla „yasaktı“ demek.",
      },
      {
        text: "Welches Schulfach mochte der Autor am liebsten?",
        options: ["Latein", "Geografie", "Deutsch"],
        answer: 1,
        explain: "„Mein liebstes Schulfach war Geografie.“ Latince ise en kötüsüydü.",
      },
      {
        kind: "short_answer",
        text: "Wie viele Wörter mussten sie pro Woche lernen?",
        options: [],
        answer: 0,
        accept: ["zwanzig", "20", "zwanzig Wörter"],
        explain: "„Wir mussten jede Woche zwanzig Wörter auswendig lernen.“",
      },
      {
        text: "Der Klassenlehrer war unfair.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Aber er war fair: wer eine Frage hatte, bekam immer eine Antwort.“",
      },
    ],
  },
  {
    id: "a2-u04-r2",
    level: "A2",
    skill: "reading",
    unit: 4,
    title: "Seit drei Jahren in Köln",
    genre: "Forum mesajı",
    intro: "Bir forum mesajı. Ne zaman geldi, ne zamandır burada — ikisi aynı şey değil.",
    gloss: [
      { de: "seit", tr: "-den beri", en: "since" },
      { de: "seither", tr: "o zamandan beri", en: "since then" },
      { de: "zuvor", tr: "daha önce", en: "before that" },
      { de: "momentan", tr: "şu anda", en: "at the moment" },
      { de: "demnächst", tr: "yakında", en: "soon" },
      { de: "bislang", tr: "şimdiye kadar", en: "so far" },
      { de: "die Wohnungssuche", tr: "ev arayışı", en: "flat hunting" },
      { de: "einziehen", tr: "yeni eve taşınmak", en: "to move in" },
    ],
    minutes: 4,
    text:
      "Hallo zusammen,\n\n" +
      "ich lese hier schon lange mit und schreibe heute zum ersten Mal.\n\n" +
      "Vor drei Jahren bin ich nach Köln gekommen, wegen der Arbeit. Zuvor habe ich in einem Dorf gewohnt, mit dreihundert Leuten. Seither ist mein Leben komplett anders.\n\n" +
      "Momentan wohne ich noch zur Miete im vierten Stockwerk, ohne Aufzug. Die Wohnungssuche hier ist wirklich hart: bislang habe ich auf zwölf Anzeigen geschrieben und nur zwei Antworten bekommen. Demnächst schaue ich mir eine Wohnung mit Garage an — die wäre perfekt, weil ich ein Auto habe.\n\n" +
      "Wenn alles klappt, ziehe ich im März ein. Hat jemand Tipps für die Suche?\n\n" +
      "Viele Grüße\nTobias",
    questions: [
      {
        text: "Wann ist Tobias nach Köln gekommen?",
        options: ["Vor drei Jahren", "Seit drei Monaten", "Im März"],
        answer: 0,
        explain: "„Vor drei Jahren bin ich nach Köln gekommen“ — bitmiş bir nokta, o yüzden geçmiş zaman.",
      },
      {
        kind: "gapfill",
        text: "___ habe ich auf zwölf Anzeigen geschrieben.",
        options: [],
        answer: 0,
        accept: ["Bislang", "bislang"],
        explain: "„bislang“ = şimdiye kadar; başta durduğu için özne fiilin arkasına düşüyor.",
      },
      {
        text: "Wo wohnt Tobias momentan?",
        options: ["In einem Dorf", "Im vierten Stockwerk", "In einer Wohnung mit Garage"],
        answer: 1,
        explain: "„Momentan wohne ich noch zur Miete im vierten Stockwerk, ohne Aufzug.“ Garajlı daire henüz sadece bir plan.",
      },
      {
        kind: "short_answer",
        text: "Wie viele Antworten hat er bekommen?",
        options: [],
        answer: 0,
        accept: ["zwei", "2", "zwei Antworten"],
        explain: "„auf zwölf Anzeigen geschrieben und nur zwei Antworten bekommen“.",
      },
      {
        text: "Tobias hat zuvor in einer großen Stadt gewohnt.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Zuvor habe ich in einem Dorf gewohnt, mit dreihundert Leuten.“",
      },
    ],
  },
  {
    id: "a2-u04-l1",
    level: "A2",
    skill: "listening",
    unit: 4,
    title: "Der Umzug am Samstag",
    genre: "Diyalog",
    intro: "Taşınma günü. Kim ne taşıdı, ne kaldı?",
    gloss: [
      { de: "einziehen", tr: "yeni eve taşınmak", en: "to move in" },
      { de: "der Kofferraum", tr: "araba bagajı", en: "car boot" },
      { de: "schleppen", tr: "sürükleyerek taşımak", en: "to lug" },
      { de: "das Stockwerk", tr: "kat", en: "floor" },
      { de: "auspacken", tr: "paketten çıkarmak", en: "to unpack" },
      { de: "die Garage", tr: "garaj", en: "garage" },
      { de: "leer", tr: "boş", en: "empty" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Rana", text: "So, der Kofferraum ist leer. Das war die letzte Fuhre." },
      { speaker: "Yusuf", text: "Endlich. Ich habe heute fünfmal in den dritten Stock geschleppt. Meine Arme tun weh." },
      { speaker: "Rana", text: "Es gibt leider keinen Aufzug. Aber die Wohnung ist schön, oder?" },
      { speaker: "Yusuf", text: "Sehr schön. Wann seid ihr offiziell eingezogen?" },
      { speaker: "Rana", text: "Gestern. Wir haben zuerst nur die Betten aufgebaut und sofort geschlafen." },
      { speaker: "Yusuf", text: "Und die Kisten? Habt ihr schon etwas ausgepackt?" },
      { speaker: "Rana", text: "Nur die Küche. Der Rest steht noch in der Garage. Das machen wir demnächst, vielleicht nächstes Wochenende." },
    ],
    questions: [
      {
        text: "In welches Stockwerk haben sie getragen?",
        options: ["In den ersten", "In den dritten", "In den vierten"],
        answer: 1,
        explain: "„Ich habe heute fünfmal in den dritten Stock geschleppt.“",
      },
      {
        kind: "gapfill",
        text: "Wann seid ihr offiziell ___?",
        options: [],
        answer: 0,
        accept: ["eingezogen"],
        explain: "„einziehen“ yer değiştiren ve ayrılabilen bir fiil: ist eingezogen.",
      },
      {
        text: "Was haben sie schon ausgepackt?",
        options: ["Nur die Küche", "Alle Kisten", "Nichts"],
        answer: 0,
        explain: "„Nur die Küche. Der Rest steht noch in der Garage.“",
      },
      {
        kind: "dictation",
        text: "Rana'nın ilk cümlesini yaz.",
        options: [],
        answer: 0,
        accept: ["So, der Kofferraum ist leer."],
        explain: "Sıfat yüklem olarak kullanıldığı için ek almıyor: „ist leer“.",
      },
    ],
  },
  {
    id: "a2-u04-l2",
    level: "A2",
    skill: "listening",
    unit: 4,
    title: "Wie habt ihr euch kennengelernt?",
    genre: "Diyalog",
    intro: "Bir tanışma hikâyesi. Nerede tanışmışlar, ne kadar zamandır birlikteler?",
    gloss: [
      { de: "sich anfreunden", tr: "arkadaş olmak", en: "to become friends" },
      { de: "befreundet", tr: "arkadaş", en: "friends" },
      { de: "charmant", tr: "sevimli", en: "charming" },
      { de: "flirten", tr: "flört etmek", en: "to flirt" },
      { de: "verabredet sein", tr: "sözleşmiş olmak", en: "to have a date" },
      { de: "zusammenleben", tr: "birlikte yaşamak", en: "to live together" },
      { de: "sich vertragen", tr: "iyi geçinmek", en: "to get along" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Gast", text: "Ihr kennt euch schon lange, oder? Wie habt ihr euch eigentlich kennengelernt?" },
      { speaker: "Marie", text: "In einem Sprachkurs, vor sieben Jahren. Wir haben uns dort ziemlich schnell angefreundet." },
      { speaker: "Onur", text: "Sie sagt das so nett. In Wahrheit habe ich zwei Monate lang mit ihr geflirtet, und sie hat nichts gemerkt." },
      { speaker: "Marie", text: "Das stimmt nicht! Du warst einfach sehr charmant und sehr unklar." },
      { speaker: "Gast", text: "Und wann wart ihr das erste Mal verabredet?" },
      { speaker: "Onur", text: "Im Winter danach. Seither sind wir zusammen. Seit drei Jahren leben wir auch zusammen." },
      { speaker: "Marie", text: "Und wir vertragen uns fast immer. Nur beim Kochen nicht." },
    ],
    questions: [
      {
        text: "Wo haben sie sich kennengelernt?",
        options: ["In einem Sprachkurs", "Auf einer Party", "Bei der Arbeit"],
        answer: 0,
        explain: "„In einem Sprachkurs, vor sieben Jahren.“",
      },
      {
        kind: "gapfill",
        text: "Wir haben uns dort ziemlich schnell ___.",
        options: [],
        answer: 0,
        accept: ["angefreundet"],
        explain: "Dönüşlü ve ayrılabilen fiil: „sich anfreunden“ → haben uns angefreundet.",
      },
      {
        text: "Wie lange leben sie schon zusammen?",
        options: ["Seit sieben Jahren", "Seit drei Jahren", "Seit dem Winter"],
        answer: 1,
        explain: "„Seit drei Jahren leben wir auch zusammen.“ Yedi yıl, tanışmalarının üzerinden geçen süre.",
      },
      {
        kind: "short_answer",
        text: "Wobei vertragen sie sich nicht?",
        options: [],
        answer: 0,
        accept: ["beim Kochen", "Kochen"],
        explain: "„Und wir vertragen uns fast immer. Nur beim Kochen nicht.“",
      },
    ],
  },
  {
    id: "a2-u04-w1",
    level: "A2",
    skill: "writing",
    unit: 4,
    title: "seit oder vor?",
    genre: "Dil bilgisi",
    intro: "Süren bir zaman mı, bitmiş bir nokta mı? İki edat ve iki ayrı zaman.",
    gloss: [
      { de: "seit", tr: "-den beri", en: "since" },
      { de: "einziehen", tr: "yeni eve taşınmak", en: "to move in" },
      { de: "befreundet", tr: "arkadaş", en: "friends" },
      { de: "auswendig", tr: "ezbere", en: "by heart" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Üç yıldır burada oturuyorum.",
        answer: "Ich wohne seit drei Jahren hier",
        hint: "Süre hâlâ sürüyor → „seit“ ve fiil ŞİMDİKİ zamanda kalır. Edat yönelme hâlini getirir: seit drei Jahren.",
      },
      {
        kind: "build",
        tr: "Üç yıl önce buraya geldim.",
        answer: "Vor drei Jahren bin ich hierher gekommen",
        hint: "Bitmiş bir nokta → „vor“ ve GEÇMİŞ zaman. Zaman ifadesi başta olunca özne fiilin arkasına düşer.",
      },
      {
        kind: "build",
        tr: "Beş yıldır arkadaşız.",
        answer: "Wir sind seit fünf Jahren befreundet",
        hint: "Yine süren bir durum: „seit“ + şimdiki zaman. Sıfat yüklem olduğu için ek almaz.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi süre bildiren biçime çevir.",
        source: "Vor einem Jahr bin ich eingezogen.",
        answer: "Ich wohne seit einem Jahr hier.",
        alternatives: ["Ich wohne seit einem Jahr hier", "Seit einem Jahr wohne ich hier"],
        why: "Nokta bildiren „vor“ geçmişle, süre bildiren „seit“ şimdiki zamanla çalışır — fiil de onunla birlikte değişir.",
      },
    ],
  },
  {
    id: "a2-u04-w2",
    level: "A2",
    skill: "writing",
    unit: 4,
    title: "Wie wir uns kennengelernt haben",
    genre: "Forum mesajı",
    intro: "Foruma bir tanışma hikâyesi yaz: nerede, ne zaman, bugün nasıl?",
    gloss: [
      { de: "sich anfreunden", tr: "arkadaş olmak", en: "to become friends" },
      { de: "befreundet", tr: "arkadaş", en: "friends" },
      { de: "charmant", tr: "sevimli", en: "charming" },
      { de: "sich vertragen", tr: "iyi geçinmek", en: "to get along" },
      { de: "seit", tr: "-den beri", en: "since" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "reply",
        prompt: "Forumdaki soruya cevap yaz. Yakın bir arkadaşınla nasıl tanıştığını anlat: nerede tanıştınız, ilk izlenimin neydi, bugün nasılsınız.",
        stimulus:
          "FORUM · Freundschaften\n\nHallo! Meine beste Freundin und ich haben uns vor sieben Jahren in einem Sprachkurs kennengelernt. Wir haben uns sehr schnell angefreundet und sind seither befreundet.\n\nWie habt ihr eure besten Freunde kennengelernt?",
        checklist: [
          "Tanışma yerini ve zamanını yazdın mı („vor … Jahren“)?",
          "Karşılıklı anlamı taşıyan dönüşlü zamiri kullandın mı („wir haben uns …“)?",
          "İlk izlenimini bir sıfatla söyledin mi?",
          "Bugünkü durumu „seit“ ile yazdın mı?",
        ],
        minWords: 40,
        phrases: [
          { de: "Wir haben uns in … kennengelernt.", tr: "…-de tanıştık", en: "we met in …" },
          { de: "Wir haben uns schnell angefreundet.", tr: "çabuk arkadaş olduk", en: "we quickly became friends" },
          { de: "Wir sind seit … befreundet.", tr: "…-den beri arkadaşız", en: "we have been friends since …" },
        ],
        sample:
          "Hallo,\n\nmeine beste Freundin heißt Derya. Wir haben uns vor neun Jahren in der Arbeit kennengelernt. Am ersten Tag saß sie einfach neben mir und hat mir ihren Kaffee angeboten.\n\nZuerst fand ich sie sehr laut, aber auch sehr charmant. Nach zwei Wochen haben wir uns richtig angefreundet.\n\nHeute sind wir seit neun Jahren befreundet. Wir vertragen uns fast immer — nur im Urlaub streiten wir über die Pläne.\n\nViele Grüße\nSelin",
      },
    ],
  },
];
