import type { SkillExercise } from "../../types";

/**
 * DE · A1 — Beceriler kütüphanesi, parti 19.
 *
 * Kurallar ve emsal: `de-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Hücreyi YİRMİYE tamamlayan partilerden biri. İnsanlar ve günleri hattı:
 * göl kenarında geçen bir pazarın günlüğü, radyoda bir otobüs şoförüyle
 * söyleşi, sınıfın veli grubuna ilk mesaj. Söyleyiş odağı vurgusuz -ie ve
 * -ien (Familie, Ferien); dil bilgisi sıra sayıları ve tarih.
 */
export const deA1P19: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a1-lib-r19",
    course: "de",
    level: "A1",
    skill: "reading",
    title: "Mein Tagebuch: Ein Sonntag am See",
    genre: "story",
    intro: "Bir genç kadın günlüğüne pazar gününü yazmış: nereye gitmişler, ne yapmışlar, hava nasılmış.",
    gloss: [
      { de: "das Tagebuch", tr: "günlük", en: "diary" },
      { de: "der See", tr: "göl", en: "lake" },
      { de: "dauern", tr: "sürmek", en: "to last" },
      { de: "frühstücken", tr: "kahvaltı yapmak", en: "to have breakfast" },
      { de: "plötzlich", tr: "aniden", en: "suddenly" },
      { de: "glücklich", tr: "mutlu", en: "happy" },
    ],
    minutes: 4,
    text:
      "Sonntag, 14. Juli\n\n" +
      "Heute war ein schöner Tag! Ich bin früh aufgestanden, um sieben Uhr. Das Wetter war super: Sonne und fünfundzwanzig Grad.\n\n" +
      "Um neun Uhr hat mich Jana abgeholt. Wir sind mit dem Rad zum See gefahren. Das hat eine Stunde gedauert.\n\n" +
      "Am See haben wir zuerst gefrühstückt: Brot, Käse und Obst. Dann sind wir lange geschwommen. " +
      "Das Wasser war noch ein bisschen kalt.\n\n" +
      "Am Nachmittag hat es plötzlich geregnet. Wir haben im Café am See gewartet und Kuchen gegessen.\n\n" +
      "Um sechs Uhr sind wir nach Hause gefahren. Jetzt bin ich sehr müde, aber glücklich. Nächsten Sonntag fahren wir wieder!",
    questions: [
      {
        text: "Was für ein Text ist das?",
        options: ["ein Tagebuch", "eine E-Mail an Jana", "eine Einladung zum See"],
        answer: 0,
        explain: "Tarihle başlıyor ve yazan kendi gününü anlatıyor: bu bir günlük sayfası.",
      },
      {
        text: "Wie sind die zwei Freundinnen zum See gekommen?",
        options: ["mit dem Bus", "mit dem Auto", "mit dem Fahrrad"],
        answer: 2,
        explain: "„Wir sind mit dem Rad zum See gefahren“ — Rad, Fahrrad demek.",
      },
      {
        kind: "truefalse",
        text: "Das Wasser im See war warm.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Hava sıcakmış ama „Das Wasser war noch ein bisschen kalt.“",
      },
      {
        kind: "gapfill",
        text: "Die Fahrt zum See hat eine ___ gedauert.",
        options: [],
        answer: 0,
        accept: ["Stunde"],
        explain: "„Das hat eine Stunde gedauert.“",
      },
      {
        kind: "short_answer",
        text: "Was haben sie im Café gegessen?",
        options: [],
        answer: 0,
        accept: ["Kuchen", "Kuchen gegessen"],
        explain: "„Wir haben im Café am See gewartet und Kuchen gegessen.“",
      },
      {
        text: "Warum sind sie ins Café gegangen?",
        options: ["Sie hatten Hunger.", "Es hat geregnet.", "Das Wasser war zu kalt."],
        answer: 1,
        explain: "„Am Nachmittag hat es plötzlich geregnet“ — kafede yağmurun dinmesini beklemişler.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a1-lib-l19",
    course: "de",
    level: "A1",
    skill: "listening",
    title: "Mein Beruf: Busfahrerin",
    genre: "interview",
    intro: "Bir radyo programında otobüs şoförü bir kadın işini anlatıyor: günü ne zaman başlıyor, neyi seviyor, neyi sevmiyor.",
    gloss: [
      { de: "der Beruf", tr: "meslek", en: "profession" },
      { de: "die Linie", tr: "hat", en: "line" },
      { de: "die Dame", tr: "hanım", en: "lady" },
      { de: "der Verkehr", tr: "trafik", en: "traffic" },
      { de: "manche", tr: "bazı", en: "some" },
      { de: "der Feierabend", tr: "iş çıkışı", en: "quitting time" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Moderator", text: "Willkommen bei „Mein Beruf“. Heute ist Sabine Petersen bei uns. Frau Petersen, was machen Sie beruflich?" },
      { speaker: "Frau Petersen", text: "Ich bin Busfahrerin hier in Kiel. Ich fahre die Linie zwölf, vom Bahnhof bis zur Uni." },
      { speaker: "Moderator", text: "Wann beginnt Ihr Tag?" },
      { speaker: "Frau Petersen", text: "Sehr früh. Ich stehe um vier Uhr auf. Um fünf Uhr fahre ich den ersten Bus." },
      { speaker: "Moderator", text: "Das ist wirklich früh! Was gefällt Ihnen an der Arbeit?" },
      { speaker: "Frau Petersen", text: "Die Menschen. Viele Leute im Bus kenne ich schon lange. Eine alte Dame bringt mir jeden Freitag einen Apfel mit." },
      { speaker: "Moderator", text: "Und was ist nicht so schön?" },
      { speaker: "Frau Petersen", text: "Der Verkehr am Nachmittag. Und manche Leute essen im Bus, das ist verboten." },
      { speaker: "Moderator", text: "Wann haben Sie Feierabend?" },
      { speaker: "Frau Petersen", text: "Um halb zwei. Dann gehe ich nach Hause und schlafe eine Stunde." },
    ],
    questions: [
      {
        text: "Wo arbeitet Frau Petersen?",
        options: ["in einem Taxi", "in einem Bus in Kiel", "am Bahnhof im Büro"],
        answer: 1,
        explain: "„Ich bin Busfahrerin hier in Kiel.“",
      },
      {
        text: "Was gefällt ihr an der Arbeit?",
        options: ["die Menschen", "der Verkehr", "das frühe Aufstehen"],
        answer: 0,
        explain: "„Was gefällt Ihnen an der Arbeit? — Die Menschen.“ Trafik sevmediği şey.",
      },
      {
        kind: "truefalse",
        text: "Frau Petersen fährt den ersten Bus um fünf Uhr.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Dörtte kalkıyor ve „Um fünf Uhr fahre ich den ersten Bus.“",
      },
      {
        kind: "gapfill",
        text: "Sie fährt die Linie ___.",
        options: [],
        answer: 0,
        accept: ["zwölf", "12"],
        explain: "„Ich fahre die Linie zwölf, vom Bahnhof bis zur Uni.“",
      },
      {
        kind: "short_answer",
        text: "Was bringt eine alte Dame jeden Freitag mit?",
        options: [],
        answer: 0,
        accept: ["einen Apfel", "Apfel", "einen Apfel für sie"],
        explain: "„Eine alte Dame bringt mir jeden Freitag einen Apfel mit.“",
      },
      {
        text: "Was macht Frau Petersen nach der Arbeit?",
        options: ["Sie fährt zur Uni.", "Sie kauft Äpfel.", "Sie schläft eine Stunde."],
        answer: 2,
        explain: "„Dann gehe ich nach Hause und schlafe eine Stunde.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a1-lib-w19",
    course: "de",
    level: "A1",
    skill: "writing",
    title: "Hallo aus der Klasse 2b",
    genre: "message",
    intro: "Çocuğunun sınıfının veli grubuna ilk kez yazıyorsun: önce iki cümle kur, sonra kendini tanıtan kısa bir mesaj yaz.",
    gloss: [
      { de: "die Klasse", tr: "sınıf", en: "class" },
      { de: "der Verein", tr: "kulüp", en: "club" },
      { de: "das Schulfest", tr: "okul şenliği", en: "school fair" },
      { de: "helfen", tr: "yardım etmek", en: "to help" },
      { de: "neu", tr: "yeni", en: "new" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Mayıstan beri Blumenstraße'de oturuyoruz.",
        answer: "Wir wohnen seit Mai in der Blumenstraße.",
        alternatives: ["Seit Mai wohnen wir in der Blumenstraße."],
        hint: "Bir süredir devam eden durum Almancada şimdiki zaman + „seit“ ile söylenir; fiil yine ikinci sırada.",
      },
      {
        kind: "build",
        tr: "Okul şenliğinde memnuniyetle yardım edebilirim.",
        answer: "Beim Schulfest kann ich gern helfen.",
        alternatives: ["Ich kann beim Schulfest gern helfen.", "Ich kann gern beim Schulfest helfen."],
        hint: "„kann“ ikinci sırada, „helfen“ en sonda; „gern“ modal fiilden sonra gelir.",
      },
      {
        kind: "free",
        prompt:
          "Veli grubuna kısa bir mesaj yaz: kendini ve çocuğunu tanıt, nerede oturduğunuzu söyle, bir konuda yardım teklif et ve gruba bir soru sor (ör. çocuklar için bir spor kulübü).",
        checklist: [
          "Kendini ve çocuğunu tanıt",
          "Nerede oturduğunuzu yaz",
          "Yardım teklif et",
          "Gruba bir soru sor ve vedalaş",
        ],
        minWords: 35,
        phrases: [
          { de: "Hallo zusammen,", tr: "Herkese merhaba,", en: "Hello everyone," },
          { de: "Ich bin die Mutter von …", tr: "…'in annesiyim.", en: "I am …'s mother." },
          { de: "Wir wohnen seit … in …", tr: "…'den beri …'de oturuyoruz.", en: "We have lived in … since …" },
          { de: "Ich kann gern … helfen.", tr: "…'de memnuniyetle yardım edebilirim.", en: "I'm happy to help with …" },
          { de: "Kennt jemand …?", tr: "… bilen var mı?", en: "Does anyone know …?" },
        ],
        sample:
          "Hallo zusammen, ich bin Hatice, die Mutter von Emil. Emil ist neu in der Klasse 2b. " +
          "Wir wohnen seit Mai in der Blumenstraße, das ist nicht weit von der Schule. " +
          "Ich arbeite vormittags, aber nachmittags habe ich Zeit. Beim Schulfest kann ich gern helfen, ich backe gern Kuchen. " +
          "Eine Frage: Emil spielt gern Fußball. Kennt jemand einen Verein für Kinder? Viele Grüße, Hatice",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a1-lib-s19",
    course: "de",
    level: "A1",
    skill: "speaking",
    title: "Familie, Ferien, Linie",
    genre: "pronounce",
    intro: "Almancada „ie“ çoğunlukla uzun ii'dir; ama bazı kelimelerin sonunda vurgusuz „-ie“ ve „-ien“ iki ayrı ses verir: i-e. Altı cümlede iki okunuşu ayır.",
    gloss: [
      { de: "die Familie", tr: "aile", en: "family" },
      { de: "die Ferien", tr: "okul tatili", en: "school vacation" },
      { de: "die Linie", tr: "hat", en: "line" },
      { de: "die Energie", tr: "enerji", en: "energy" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Meine Familie wohnt in Hamburg.",
        tr: "Ailem Hamburg'da oturuyor.",
        hint: "„Familie“ = fa-MİİL-ye: vurgu ortada, sondaki -ie YE gibi okunur.",
        confusions: [
          {
            heard: [],
            fix: "Sonu uzun ii ile okursan „fa-mi-Lİİ“ olur; vurgu ikinci hecede kalmalı.",
            expected: "Familie",
          },
        ],
      },
      {
        de: "In den Ferien fahren wir ans Meer.",
        tr: "Okul tatilinde denize gidiyoruz.",
        hint: "„Ferien“ = FEE-ryen: iki hece, -ien burada YEN.",
        confusions: [
          {
            heard: [],
            fix: "„fe-RİİN“ deme; vurgu ilk hecede, sonu kısa ve hafif.",
            expected: "Ferien",
          },
        ],
      },
      {
        de: "Die Linie fünf fährt zum Zoo.",
        tr: "Beş numaralı hat hayvanat bahçesine gidiyor.",
        hint: "„Linie“ = LİİN-ye: ilk i uzun, sondaki -ie YE.",
        confusions: [
          {
            heard: [],
            fix: "Son iki harfi uzun ii yapma; kelime iki hecelidir.",
            expected: "Linie",
          },
        ],
      },
      {
        de: "Mein Sohn hat viel Energie.",
        tr: "Oğlumun çok enerjisi var.",
        hint: "„Energie“ = e-ner-Gİİ: burada -ie vurgulu ve uzun ii. Kural: vurgu sondaysa ii.",
        confusions: [
          {
            heard: [],
            fix: "Bu kelimede sonu YE diye okuma; vurgu son hecede ve ses uzun ii.",
            expected: "Energie",
          },
        ],
      },
      {
        de: "Wir fahren im Sommer nach Italien.",
        tr: "Yazın İtalya'ya gidiyoruz.",
        hint: "„Italien“ = i-TAA-lyen: vurgu ikinci hecede, sonu YEN.",
        confusions: [
          {
            heard: [],
            fix: "„ita-LİİN“ deme; son hece vurgusuz ve kısa.",
            expected: "Italien",
          },
        ],
      },
      {
        de: "Die Familie fährt in den Ferien nach Italien.",
        tr: "Aile okul tatilinde İtalya'ya gidiyor.",
        hint: "Üç kelimenin sonunda vurgusuz -ie/-ien: fa-MİİL-ye, FEE-ryen, i-TAA-lyen.",
        confusions: [
          {
            heard: [],
            fix: "Üçünde de vurgu sondan önceki hecede; sonları kısa ve hafif söyle.",
            expected: "Ferien",
          },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a1-lib-g19",
    course: "de",
    level: "A1",
    skill: "grammar",
    title: "am ersten Mai",
    genre: "grammar",
    intro: "Tarih söylerken Almanca sıra sayısı kullanır: bugün ayın kaçı, doğum günün ne zaman. Sıra sayılarının nasıl kurulduğunu öğren.",
    focus: "Sıra sayıları ve tarih: der erste, am dritten, der zwanzigste",
    gloss: [
      { de: "der Geburtstag", tr: "doğum günü", en: "birthday" },
      { de: "der Stock", tr: "kat", en: "floor" },
      { de: "heute", tr: "bugün", en: "today" },
      { de: "der Kurs", tr: "kurs", en: "course" },
      { de: "die Party", tr: "parti", en: "party" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "-te ve -ste",
        tr: "1'den 19'a kadar sayıya -te eklenir: zwei → zweite, vier → vierte. 20 ve sonrasına -ste eklenir: zwanzig → zwanzigste. Üç sayı düzensizdir: erste, dritte, siebte; „acht“ da tek t ile achte olur.",
        examples: [
          { de: "Wir wohnen im vierten Stock.", tr: "Dördüncü katta oturuyoruz.", note: "vier + te" },
          { de: "Heute ist der zwanzigste Juni.", tr: "Bugün yirmi Haziran.", note: "zwanzig + ste" },
          { de: "der erste, der dritte, der siebte Tag", tr: "birinci, üçüncü, yedinci gün", note: "düzensiz üçlü" },
        ],
      },
      {
        heading: "der … ya da am …",
        tr: "„Bugün ayın kaçı?“ sorusuna „der“ ile cevap verilir: Heute ist der dritte Mai. „Ne zaman?“ sorusuna ise „am“ ile cevap verilir ve sıra sayısı -en alır: am dritten Mai.",
        examples: [
          { de: "Heute ist der zweite Oktober.", tr: "Bugün iki Ekim.", note: "der … -te" },
          { de: "Mein Geburtstag ist am zwölften März.", tr: "Doğum günüm on iki Mart'ta.", note: "am … -ten" },
          { de: "Wann kommst du? — Am ersten Juni.", tr: "Ne zaman geliyorsun? — Bir Haziran'da.", note: "am ersten" },
        ],
      },
      {
        heading: "Yazıda nokta",
        tr: "Yazıda sıra sayısı rakamdan sonra bir nokta ile gösterilir, tıpkı Türkçedeki „3. kat“ gibi. Okurken nokta sıra sayısına dönüşür: „am 1. Mai“ = am ersten Mai.",
        examples: [
          { de: "am 1. Mai — am ersten Mai", tr: "bir Mayıs'ta", note: "1. = ersten" },
          { de: "im 3. Stock — im dritten Stock", tr: "üçüncü katta", note: "3. = dritten" },
          { de: "am 7. Mai — am siebten Mai", tr: "yedi Mayıs'ta", note: "7. = siebten" },
        ],
      },
    ],
    questions: [
      {
        text: "Heute ist der ___ Mai. (3.)",
        options: ["dreite", "dreißigste", "dritte"],
        answer: 2,
        explain: "3 düzensizdir: dritte. „dreißigste“ otuzuncu demek.",
      },
      {
        text: "Mein Geburtstag ist am ___ April. (1.)",
        options: ["erste", "ersten", "einsten"],
        answer: 1,
        explain: "„am“dan sonra sıra sayısı -en alır ve 1 düzensizdir: am ersten.",
      },
      {
        text: "Welche Form ist richtig? (20.)",
        options: ["zwanzigste", "zwanzigte", "zwanzigtste"],
        answer: 0,
        explain: "20 ve sonrası -ste alır: zwanzigste.",
      },
      {
        kind: "gapfill",
        text: "Wir wohnen im ___ Stock. (4.)",
        options: [],
        answer: 0,
        accept: ["vierten"],
        explain: "„im“den sonra da sıra sayısı -en alır: im vierten Stock.",
      },
      {
        kind: "gapfill",
        text: "Heute ist der ___ Oktober. (2.)",
        options: [],
        answer: 0,
        accept: ["zweite"],
        explain: "„der“ ile tarih: zwei + te = der zweite.",
      },
      {
        kind: "gapfill",
        text: "Der Kurs beginnt am ___ Mai. (15.)",
        options: [],
        answer: 0,
        accept: ["fünfzehnten"],
        explain: "19'a kadar -te, „am“dan sonra -ten: am fünfzehnten.",
      },
      {
        kind: "gapfill",
        text: "Die Party ist am ___ Mai. (30.)",
        options: [],
        answer: 0,
        accept: ["dreißigsten"],
        explain: "20 ve sonrası -ste, „am“dan sonra -sten: am dreißigsten.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Mein Geburtstag", "ist", "am", "achten", "März"],
        explain: "Tarih „am“ + sıra sayısı -en ile: Mein Geburtstag ist am achten März.",
      },
      {
        kind: "truefalse",
        text: "„Heute ist der dreite Juni.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "3 düzensizdir; doğrusu „der dritte Juni“.",
      },
      {
        kind: "truefalse",
        text: "„Wir fliegen am zwanzigsten August.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "20 → zwanzigste, „am“dan sonra -en: am zwanzigsten. Cümle doğru.",
      },
    ],
  },
];
