import type { SkillExercise } from "../types";

/**
 * A1 · Ünite 25 — SON ÜNİTE: "Dün, hafta sonu, mevsimler ve Almanca yolculuğu".
 *
 * Dört ders: Gestern war ein guter Tag · Mein Wochenende · Die Jahreszeiten ·
 * Mein Deutsch-Start. İçerik ünite 1-25'in tamamıyla sınırlı.
 *
 *   Ünite 25: aufgestanden, gegessen, getrunken, geschlafen, vorgestern,
 *             die Schule, der Unterricht, die Hausaufgabe · besucht,
 *             getroffen, war, die Reise, toll, das Hotel, übernachten,
 *             reisen · der Sommer, der Winter, der Frühling, der Herbst,
 *             der Mai, früher, lange, gemütlich · gelernt, jetzt, stolz,
 *             weiter, der Anfang, die Prüfung, der Test, werden
 *
 * ÜÇ KAPANIŞ NOKTASI:
 *
 * 1) "war" — Almanca'nın kuralı burada TERSİNE döner. Ünite 24 her şeyi
 *    Perfekt'le anlatmayı öğretti; ama "sein" ve "haben" konuşma dilinde bile
 *    Präteritum kullanır: "Ich WAR krank" denir, "ich bin krank gewesen"
 *    neredeyse hiç duyulmaz. Yani yeni öğrenilen kural tam da en sık
 *    kullanılan iki fiilde geçerli değildir.
 *
 * 2) AYRILABİLEN FİİLİN ORTACI: "ge-" öneki fiilin İÇİNE girer —
 *    aufstehen → auf·GE·standen. "geaufstanden" diye bir şey yoktur.
 *    Öğrenci ünite 24'te ortacı öğrendi, burada onun kırılımını görüyor.
 *
 * 3) "gemütlich" — Almanca'nın çevrilemeyen sözcüğü. "Rahat" değil, "sıcak"
 *    değil, "keyifli" değil; bir mekânın ya da anın insana huzur veren
 *    toplamı. Almanların kendi kültürlerini anlatırken kullandıkları
 *    sözcüktür ve A1'i bitiren biri bunu tanımalı.
 *
 * Bu ünite aynı zamanda kursun KAPANIŞIDIR: son yazma görevi öğrenciye
 * kendi Almanca yolculuğunu geçmiş zamanla anlattırıyor — yani öğrendiği
 * son dilbilgisini, öğrendiği her şeyi anlatmak için kullanıyor.
 */
export const a1U25: SkillExercise[] = [
  {
    id: "a1-u25-r1",
    level: "A1",
    skill: "reading",
    unit: 25,
    title: "Die vier Jahreszeiten",
    genre: "Blog",
    intro: "Dört mevsim, dört kısa paragraf. Kim hangisini seviyor?",
    gloss: [
      { de: "der Frühling", tr: "ilkbahar", en: "spring" },
      { de: "der Herbst", tr: "sonbahar", en: "autumn" },
      { de: "gemütlich", tr: "huzurlu, iç açıcı (tam karşılığı yok)", en: "cosy" },
      { de: "früher", tr: "eskiden", en: "in the past" },
    ],
    minutes: 3,
    text:
      "Der Frühling kommt nach dem Winter. Es wird wieder warm und die Bäume werden wieder schön. Im Mai sitzen alle draußen im Park.\n\nDer Sommer ist lang und hell. Viele Menschen reisen ans Meer oder an einen See. Die Kinder haben keine Schule.\n\nIm Herbst wird es kalt und es regnet oft. Aber die Bäume sind sehr schön.\n\nDer Winter ist kalt und lang. Aber zu Hause ist es gemütlich: Tee, Musik, ein Buch. Früher war der Winter für mich zu lang. Jetzt finde ich ihn schön.",
    questions: [
      {
        text: "Wann kommt der Frühling?",
        options: ["nach dem Winter", "nach dem Sommer", "im Mai"],
        answer: 0,
        explain: "„Der Frühling kommt nach dem Winter.“",
      },
      {
        text: "Was machen viele Menschen im Sommer?",
        options: ["Sie reisen ans Meer.", "Sie bleiben zu Hause.", "Sie gehen zur Schule."],
        answer: 0,
        explain: "„Viele Menschen reisen ans Meer oder an einen See.“",
      },
      {
        kind: "gapfill",
        text: "Im Winter ist es zu Hause ___.",
        options: [],
        answer: 0,
        accept: ["gemütlich"],
        explain:
          "„gemütlich“ — „rahat“ da değil „sıcak“ da değil: bir mekânın insana huzur veren toplamı. Almancanın çevrilemeyen sözcüğü.",
      },
      {
        text: "Wie war es früher?",
        options: [
          "Der Winter war für die Person zu lang.",
          "Der Winter war zu kurz.",
          "Es hat nicht geregnet.",
        ],
        answer: 0,
        explain: "„Früher war der Winter für mich zu lang. Jetzt finde ich ihn schön.“",
      },
    ],
  },
  {
    id: "a1-u25-r2",
    level: "A1",
    skill: "reading",
    unit: 25,
    title: "Mein Deutsch-Start",
    genre: "Forum mesajı",
    intro: "Bir yıl önce başlayan biri anlatıyor. Kursun kapanış metni.",
    gloss: [
      { de: "gelernt", tr: "öğrenmiş", en: "learned" },
      { de: "stolz", tr: "gururlu", en: "proud" },
      { de: "der Anfang", tr: "başlangıç", en: "beginning" },
      { de: "die Prüfung", tr: "sınav", en: "exam" },
      { de: "der Start", tr: "başlangıç", en: "start" },
    ],
    minutes: 3,
    text:
      "Hallo zusammen,\n\nvor einem Jahr war mein Deutsch-Start. Am Anfang war es schwer. Im Unterricht habe ich nichts verstanden.\n\nAber ich habe jeden Tag ein bisschen gelernt — zehn Minuten, manchmal zwanzig. Ich habe meine Hausaufgaben gemacht und viel Musik gehört.\n\nJetzt kann ich einen Termin machen, im Supermarkt fragen und eine E-Mail schreiben. Letzte Woche habe ich eine Frau aus Berlin getroffen. Eine halbe Stunde, nur auf Deutsch!\n\nIch bin wirklich stolz. Nächsten Monat mache ich den Test.\n\nWeiter machen, jeden Tag ein bisschen! Der Anfang ist schwer, aber es wird besser.\n\nEuer Ali",
    questions: [
      {
        text: "Wie war es am Anfang?",
        options: ["schwer", "leicht", "gemütlich"],
        answer: 0,
        explain: "„Am Anfang war es schwer.“ — „war“, „ist gewesen“ DEĞİL.",
      },
      {
        text: "Wie hat Ali gelernt?",
        options: [
          "jeden Tag ein bisschen",
          "einmal pro Woche viel",
          "nur im Unterricht",
        ],
        answer: 0,
        explain: "„Aber ich habe jeden Tag ein bisschen gelernt — zehn Minuten, manchmal zwanzig.“",
      },
      {
        kind: "gapfill",
        text: "Ali hat eine Frau aus Berlin ___.",
        options: [],
        answer: 0,
        accept: ["getroffen"],
        explain: "„Letzte Woche habe ich eine Frau aus Berlin getroffen.“",
      },
      {
        text: "Was macht Ali nächsten Monat?",
        options: ["den Test", "eine Reise", "einen Kurs"],
        answer: 0,
        explain: "„Nächsten Monat mache ich den Test.“",
      },
      {
        text: "Ali ne öneriyor?",
        options: [
          "jeden Tag ein bisschen weiter machen",
          "einen langen Kurs machen",
          "nach Deutschland reisen",
        ],
        answer: 0,
        explain: "„Weiter machen, jeden Tag ein bisschen!“",
      },
    ],
  },
  {
    id: "a1-u25-l1",
    level: "A1",
    skill: "listening",
    unit: 25,
    title: "Gestern war ein guter Tag",
    genre: "Diyalog",
    intro:
      "Bir gün anlatılıyor. „war“ ile „habe/bin“ arasındaki farka kulak ver.",
    gloss: [
      { de: "aufgestanden", tr: "kalkmış (yataktan)", en: "got up" },
      { de: "die Hausaufgabe", tr: "ödev", en: "homework" },
      { de: "vorgestern", tr: "evvelsi gün", en: "the day before yesterday" },
      { de: "hatte", tr: "sahiptim (haben geçmişi)", en: "had" },
      { de: "gewesen", tr: "olmuş (sein ortacı — çok az kullanılır)", en: "been" },
    ],
    minutes: 2,
    segments: [
      { text: "Wie war dein Tag gestern?" },
      { text: "Gut! Ich bin um sieben aufgestanden und habe Tee getrunken." },
      { text: "So früh?" },
      { text: "Ja, ich hatte Unterricht. Danach habe ich meine Hausaufgaben gemacht." },
      { text: "Und am Abend?" },
      { text: "Am Abend habe ich mit Elif gegessen. Es war sehr gemütlich." },
      { text: "Schön. Vorgestern war mein Tag nicht so gut — ich war krank." },
    ],
    questions: [
      {
        kind: "gapfill",
        text: "Ich bin um ___ aufgestanden.",
        options: [],
        answer: 0,
        accept: ["sieben", "7"],
        explain: "„Ich bin um sieben aufgestanden.“ — kalkmak yer değiştirmedir: sein.",
      },
      {
        text: "Was hat die Person nach dem Unterricht gemacht?",
        options: ["die Hausaufgaben", "gegessen", "geschlafen"],
        answer: 0,
        explain: "„Danach habe ich meine Hausaufgaben gemacht.“",
      },
      {
        text: "Warum sagt die zweite Person „ich WAR krank“ und nicht „ich bin krank gewesen“?",
        options: [
          "„sein“ nimmt im Gespräch das Präteritum.",
          "Weil es vorgestern war.",
          "Beides ist gleich häufig.",
        ],
        answer: 0,
        explain:
          "Ünite 24 her şeyi Perfekt'le anlatmayı öğretti; ama „sein“ ve „haben“ konuşma dilinde bile „war“/„hatte“ kullanır. En sık kullanılan iki fiil kuralın DIŞINDA.",
      },
      {
        text: "Wie war der Abend?",
        options: ["gemütlich", "langweilig", "zu kurz"],
        answer: 0,
        explain: "„Es war sehr gemütlich.“",
      },
    ],
  },
  {
    id: "a1-u25-l2",
    level: "A1",
    skill: "listening",
    unit: 25,
    title: "Mein Wochenende",
    genre: "Diyalog",
    intro: "Bir hafta sonu gezisi. Nereye, kiminle, nerede kalmış?",
    gloss: [
      { de: "die Reise", tr: "yolculuk", en: "trip" },
      { de: "übernachten", tr: "geceyi geçirmek", en: "to stay overnight" },
      { de: "besucht", tr: "ziyaret etmiş", en: "visited" },
    ],
    minutes: 2,
    segments: [
      { text: "Wie war dein Wochenende?" },
      { text: "Toll! Ich bin nach Hamburg gefahren und habe meinen Bruder besucht." },
      { text: "Wo hast du übernachtet?" },
      { text: "Bei ihm. Ein Hotel war zu teuer." },
      { text: "Und was habt ihr gemacht?" },
      { text: "Am Samstag sind wir ans Meer gefahren. Das Wetter war wunderbar." },
      { text: "Eine schöne Reise!" },
    ],
    questions: [
      {
        text: "Wen hat die Person in Hamburg besucht?",
        options: ["ihren Bruder", "ihre Schwester", "eine Freundin"],
        answer: 0,
        explain: "„…und habe meinen Bruder besucht.“",
      },
      {
        text: "Wo hat sie übernachtet?",
        options: ["bei ihrem Bruder", "im Hotel", "im Zug"],
        answer: 0,
        explain: "„Bei ihm. Ein Hotel war zu teuer.“",
      },
      {
        kind: "gapfill",
        text: "Am Samstag ___ wir ans Meer gefahren.",
        options: [],
        answer: 0,
        accept: ["sind"],
        explain: "„fahren“ yer değiştirmedir → sein. Çoğul: „wir sind“.",
      },
      {
        text: "Wie war das Wetter?",
        options: ["wunderbar", "kalt", "es hat geregnet"],
        answer: 0,
        explain: "„Das Wetter war wunderbar.“",
      },
    ],
  },
  {
    id: "a1-u25-w1",
    level: "A1",
    skill: "writing",
    unit: 25,
    title: "war, nicht gewesen",
    genre: "Dil bilgisi",
    intro: "Son üç kalıp. İkisi ünite 24'ün kuralını kırıyor.",
    gloss: [
      { de: "war", tr: "idi, -dı", en: "was" },
      { de: "aufgestanden", tr: "kalkmış", en: "got up" },
      { de: "stolz", tr: "gururlu", en: "proud" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Dün hastaydım.",
        answer: "Gestern war ich krank",
        hint:
          "DİKKAT: „sein“ Perfekt KULLANMAZ. „Ich bin krank gewesen“ neredeyse hiç duyulmaz — konuşmada bile „war“ denir. Aynı şey „haben“ için de geçerli (hatte).",
      },
      {
        kind: "build",
        tr: "Saat yedide kalktım.",
        answer: "Ich bin um sieben aufgestanden",
        hint:
          "Ayrılabilen fiilin ortacında „ge-“ öneğin İÇİNE girer: auf·GE·standen. „geaufstanden“ diye bir şey yoktur. Ve kalkmak yer değiştirmedir → sein.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi geçmiş zamana çevir.",
        source: "Ich esse mit Elif.",
        answer: "Ich habe mit Elif gegessen",
        alternatives: ["Ich habe mit Elif gegessen."],
        why:
          "„essen“ yer değiştirme değil → haben. Ortaç „gegessen“ sona gider; kıskacın içinde „mit Elif“ kalır.",
      },
    ],
  },
  {
    id: "a1-u25-w2",
    level: "A1",
    skill: "writing",
    unit: 25,
    title: "Mein Deutsch-Start",
    genre: "Forum mesajı",
    intro:
      "A1'in son görevi: kendi Almanca yolculuğunu anlat — öğrendiğin son dilbilgisiyle.",
    gloss: [
      { de: "der Anfang", tr: "başlangıç", en: "beginning" },
      { de: "weiter", tr: "devam, ileri", en: "further" },
      { de: "die Prüfung", tr: "sınav", en: "exam" },
      { de: "der Start", tr: "başlangıç", en: "start" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Başlangıçta her şey zordu.",
        answer: "Am Anfang war alles schwer",
        hint: "Yine „war“ — „ist gewesen“ değil. „alles“ tekil sayılır: war, waren değil.",
      },
      {
        kind: "free",
        prompt:
          "Kendi Almanca yolculuğunu foruma yaz (6-7 cümle): Ne zaman başladın? Başlangıçta nasıldı? Nasıl çalıştın? Şimdi neler yapabiliyorsun? Bundan sonra ne yapacaksın? Geçmişi anlatırken „war“ ve Perfekt'i birlikte kullan.",
          minWords: 45,
        checklist: [
          "En az bir „war“ cümlesi var mı? (Am Anfang war …)",
          "En az bir „haben“li ve bir „sein“li Perfekt cümlesi var mı?",
          "Şimdi ne yapabildiğini yazdın mı? (Jetzt kann ich …)",
          "Bundan sonrası için bir cümle yazdın mı? (Nächsten Monat … / Ich lerne weiter.)",
        ],
        phrases: [
          { de: "Am Anfang war alles schwer.", tr: "Başlangıçta her şey zordu.", en: "At the beginning everything was hard." },
          { de: "Ich habe jeden Tag gelernt.", tr: "Her gün çalıştım.", en: "I studied every day." },
          { de: "Jetzt kann ich …", tr: "Şimdi … yapabiliyorum", en: "Now I can …" },
        ],
        sample:
          "Hallo zusammen,\n\nvor einem Jahr war mein Deutsch-Start. Am Anfang war es schwer. Im Unterricht habe ich nichts verstanden.\n\nAber ich habe jeden Tag ein bisschen gelernt und meine Hausaufgaben gemacht. Ich habe auch viel Musik gehört und Filme gesehen.\n\nLetzte Woche bin ich allein zum Arzt gegangen. Das war ein guter Tag! Ich bin wirklich stolz.\n\nJetzt kann ich einen Termin machen und eine E-Mail schreiben. Nächsten Monat mache ich den Test.\n\nIch lerne weiter — jeden Tag ein bisschen.",
      },
    ],
  },
];
