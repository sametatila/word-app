import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 27 — "Yemek kültürü ve şikâyet" (dersler 105–108).
 *
 * Dersler: Mein Heimatgericht · Reklamation im Lokal · Haltbar machen ·
 * Esskultur.
 *
 * İki aktarım hatası bu ünitenin diline düşüyor:
 *   am besten ↔       Türkçede 'en' TEK sözcüktür ve hem sıfatta hem
 *   der beste         zarfta aynıdır ('en iyi yemek' · 'en iyi burada
 *                     olur'). Almanca ayırır: isimden önce der/die/das
 *                     beste, fiili niteliyorsa am besten. Yanlış seçim
 *                     cümleyi bozmuyor ama hep yabancı bırakıyor.
 *   etwas + sıfat     Türkçede 'tatlı bir şey' sıradan bir sıfat-isim
 *                     dizisidir. Almanca sıfatı İSİMLEŞTİRİR ve büyük
 *                     harfle yazar: etwas Süßes, nichts Warmes,
 *                     viel Interessantes. Yapının Türkçede eşi yok.
 *
 * Yeni 32 kelime: der Braten, das Schnitzel, das Hackfleisch, der Grill,
 * der Koch, die Köchin, die Semmel, die Limonade, der Wirt, die Wirtin,
 * die Kneipe, der Imbiss, die Gaststätte, die Mensa, der Speisewagen,
 * der Fleck, die Büchse, die Tüte, übrig, die Scheibe, roh, mager,
 * gießen, der Ofen, der Alkohol, salzig, der Bedarf, der Konsum, dienen,
 * die Anzahl, die Ausgabe, der Mangel.
 */
export const b1U27: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u27-r1",
    level: "B1",
    skill: "reading",
    unit: 27,
    title: "Mein Heimatgericht",
    genre: "Kişisel tarif yazısı",
    intro: "Biri memleket yemeğini anlatıyor. Ne en iyi nasıl olur?",
    minutes: 5,
    gloss: [
      { de: "der Braten", tr: "fırın kızartması", en: "roast" },
      { de: "das Hackfleisch", tr: "kıyma", en: "minced meat" },
      { de: "der Ofen", tr: "fırın", en: "oven" },
      { de: "mager", tr: "yağsız", en: "lean" },
      { de: "die Scheibe", tr: "dilim", en: "slice" },
    ],
    text:
      "Bei uns zu Hause gab es sonntags immer den gleichen Braten. Meine Mutter " +
      "hat ihn nie gegrillt, sondern immer im Ofen gemacht — langsam, drei " +
      "Stunden, bei kleiner Hitze.\n\n" +
      "Das Fleisch soll nicht zu mager sein. Wer es ganz ohne Fett nimmt, " +
      "bekommt am Ende etwas Trockenes, und das rettet auch kein Öl. " +
      "Hackfleisch geht auch, aber dann schmeckt es anders.\n\n" +
      "Am besten schneidet man den Braten in dünne Scheiben, erst nach " +
      "zwanzig Minuten Ruhe. Wer sofort schneidet, verliert den Saft. " +
      "Das ist der wichtigste Teil und der, den alle vergessen.\n\n" +
      "Dazu gibt es bei uns nichts Kompliziertes: Brot, etwas Salziges " +
      "eingelegtes Gemüse, fertig. Der beste Sonntag meiner Kindheit riecht " +
      "genau so.",
    questions: [
      {
        text: "Wie hat die Mutter den Braten gemacht?",
        options: ["Auf dem Grill", "Im Ofen", "In der Pfanne"],
        answer: 1,
        explain: "„Meine Mutter hat ihn nie gegrillt, sondern immer im Ofen gemacht …“",
      },
      {
        text: "Warum soll das Fleisch nicht zu mager sein?",
        options: ["Es wird trocken", "Es wird zu teuer", "Es kocht zu schnell"],
        answer: 0,
        explain: "„Wer es ganz ohne Fett nimmt, bekommt am Ende etwas Trockenes …“",
      },
      {
        text: "Wann soll man schneiden?",
        options: ["Sofort", "Nach zwanzig Minuten Ruhe", "Am nächsten Tag"],
        answer: 1,
        explain: "„Am besten schneidet man den Braten in dünne Scheiben, erst nach zwanzig Minuten Ruhe.“",
      },
      {
        kind: "gapfill",
        text: "___ ___ schneidet man den Braten in dünne Scheiben.",
        options: [],
        answer: 0,
        accept: ["Am besten"],
        explain: "Fiili niteliyor → „am besten“. İsimden önce olsaydı „der beste“ olurdu.",
      },
      {
        kind: "short_answer",
        text: "Wie lange kommt der Braten in den Ofen?",
        options: [],
        answer: 0,
        accept: ["drei Stunden", "3 Stunden"],
        explain: "„… langsam, drei Stunden, bei niedriger Hitze.“",
      },
    ],
  },
  {
    id: "b1-u27-r2",
    level: "B1",
    skill: "reading",
    unit: 27,
    title: "Reklamation im Lokal",
    genre: "Rehber metin",
    intro: "Lokantada bir sorun nasıl söylenir? Ne işe yarar, ne yaramaz?",
    minutes: 5,
    gloss: [
      { de: "der Wirt", tr: "işletmeci", en: "landlord" },
      { de: "die Gaststätte", tr: "lokanta", en: "restaurant" },
      { de: "der Fleck", tr: "leke", en: "stain" },
      { de: "salzig", tr: "tuzlu", en: "salty" },
      { de: "übrig", tr: "artan", en: "left over" },
    ],
    text:
      "In einer Gaststätte etwas zu sagen ist keine Unhöflichkeit. " +
      "Unhöflich ist nur, wie man es manchmal macht.\n\n" +
      "Sagen Sie es sofort, nicht am Ende. Ein Gericht, das zu salzig ist, " +
      "kann man tauschen, solange es noch warm ist. Wer erst beim Zahlen " +
      "etwas sagt, bekommt meistens nichts Neues, sondern nur ein " +
      "ärgerliches Gesicht.\n\n" +
      "Sagen Sie außerdem genau, was das Problem ist. „Es schmeckt nicht“ " +
      "hilft niemandem. „Die Suppe ist kalt“ oder „auf dem Glas ist ein " +
      "Fleck“ kann der Wirt sofort lösen.\n\n" +
      "Am besten bleiben Sie ruhig und sprechen leise. Die Wirtin steht " +
      "meistens auf Ihrer Seite: eine Gaststätte lebt von Leuten, die " +
      "wiederkommen. Wenn etwas übrig bleibt, fragen Sie ruhig nach einer " +
      "Büchse — das ist hier normal geworden.",
    questions: [
      {
        text: "Wann soll man etwas sagen?",
        options: ["Sofort", "Beim Zahlen", "Am nächsten Tag"],
        answer: 0,
        explain: "„Sagen Sie es sofort, nicht am Ende.“",
      },
      {
        text: "Was hilft niemandem?",
        options: ["„Es schmeckt nicht“", "„Die Suppe ist kalt“", "„Auf dem Glas ist ein Fleck“"],
        answer: 0,
        explain: "„„Es schmeckt nicht“ hilft niemandem.“",
      },
      {
        text: "Warum steht die Wirtin meistens auf Ihrer Seite?",
        options: ["Sie muss", "Die Gaststätte lebt von Leuten, die wiederkommen", "Sie kennt Sie"],
        answer: 1,
        explain: "„… eine Gaststätte lebt von Leuten, die wiederkommen.“",
      },
      {
        kind: "gapfill",
        text: "Wer erst beim Zahlen etwas sagt, bekommt meistens ___ ___.",
        options: [],
        answer: 0,
        accept: ["nichts Neues"],
        explain: "„nichts/etwas“ sonrası sıfat İSİMLEŞİR ve büyük harfle yazılır.",
      },
      {
        kind: "short_answer",
        text: "Wonach soll man fragen, wenn etwas übrig bleibt?",
        options: [],
        answer: 0,
        accept: ["nach einer Büchse", "eine Büchse", "Büchse"],
        explain: "„… fragen Sie ruhig nach einer Büchse …“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u27-l1",
    level: "B1",
    skill: "listening",
    unit: 27,
    title: "Was machen wir mit dem Rest?",
    genre: "Mutfak konuşması",
    intro: "Artan yemek konuşuluyor. Ne saklanabilir, nasıl?",
    minutes: 4,
    gloss: [
      { de: "übrig", tr: "artan", en: "left over" },
      { de: "die Büchse", tr: "kutu", en: "tin" },
      { de: "die Tüte", tr: "poşet", en: "bag" },
      { de: "roh", tr: "çiğ", en: "raw" },
    ],
    segments: [
      { text: "Wir haben viel zu viel gekocht. Was machen wir mit dem Rest?" },
      { text: "Das Gemüse kommt in eine Büchse, das hält vier Tage." },
      { text: "Und das Fleisch? Das ist noch fast roh in der Mitte." },
      { text: "Dann brate es kurz fertig, sonst wird es nichts." },
      { text: "Gut. Und das Brot? Es ist schon von gestern." },
      { text: "Schneide es in Scheiben und friere es in einer Tüte ein." },
      { text: "So einfach? Ich habe immer alles weggeworfen." },
      { text: "Am besten machst du das direkt, nicht erst nach drei Tagen." },
    ],
    questions: [
      {
        text: "Wohin kommt das Gemüse?",
        options: ["In eine Büchse", "In eine Tüte", "In den Ofen"],
        answer: 0,
        explain: "„Das Gemüse kommt in eine Büchse, das hält vier Tage.“",
      },
      {
        text: "Was ist mit dem Fleisch?",
        options: ["Es ist verbrannt", "Es ist noch fast roh in der Mitte", "Es ist zu salzig"],
        answer: 1,
        explain: "„Das ist noch fast roh in der Mitte.“",
      },
      {
        text: "Was soll mit dem Brot passieren?",
        options: ["Wegwerfen", "In Scheiben schneiden und einfrieren", "Sofort essen"],
        answer: 1,
        explain: "„Schneide es in Scheiben und friere es in einer Tüte ein.“",
      },
      {
        kind: "gapfill",
        text: "___ ___ machst du das direkt, nicht erst nach drei Tagen.",
        options: [],
        answer: 0,
        accept: ["Am besten"],
        explain: "Fiili niteleyen üstünlük: „am besten“.",
      },
      {
        kind: "short_answer",
        text: "Wie lange hält das Gemüse in der Büchse?",
        options: [],
        answer: 0,
        accept: ["vier Tage", "4 Tage"],
        explain: "„… das hält vier Tage.“",
      },
    ],
  },
  {
    id: "b1-u27-l2",
    level: "B1",
    skill: "listening",
    unit: 27,
    title: "Mittags in der Mensa",
    genre: "Öğle sohbeti",
    intro: "Öğle yemeği alışkanlıkları. Kim nerede yiyor, neden?",
    minutes: 4,
    gloss: [
      { de: "die Mensa", tr: "yemekhane", en: "canteen" },
      { de: "der Imbiss", tr: "büfe", en: "snack bar" },
      { de: "die Semmel", tr: "sandviç ekmeği", en: "bread roll" },
      { de: "der Konsum", tr: "tüketim", en: "consumption" },
    ],
    segments: [
      { text: "Isst du mittags immer in der Mensa?" },
      { text: "Fast immer. Zwei Euro achtzig, das findest du sonst nirgends." },
      { text: "Ich gehe lieber zum Imbiss an der Ecke." },
      { text: "Da zahlst du aber das Dreifache." },
      { text: "Stimmt. Dafür ist es dort ruhiger und ich brauche nur eine Semmel." },
      { text: "Ich hätte danach Hunger. Mir schmeckt es in der Mensa am besten." },
      { text: "Geschmackssache. Aber mein Konsum ist dort einfach kleiner." },
      { text: "Da hast du recht. Ich esse in der Mensa meistens zu viel." },
    ],
    questions: [
      {
        text: "Wie viel kostet das Essen in der Mensa?",
        options: ["Zwei Euro achtzig", "Fünf Euro", "Acht Euro"],
        answer: 0,
        explain: "„Fast immer. Zwei Euro achtzig …“",
      },
      {
        text: "Warum geht die zweite Person lieber zum Imbiss?",
        options: ["Es ist billiger", "Es ist ruhiger", "Es ist näher"],
        answer: 1,
        explain: "„Dafür ist es dort ruhiger und ich brauche nur eine Semmel.“",
      },
      {
        text: "Was sagt die erste Person über die Mensa?",
        options: ["Sie isst dort meistens zu viel", "Sie geht nie hin", "Es ist zu teuer"],
        answer: 0,
        explain: "„Ich esse in der Mensa meistens zu viel.“",
      },
      {
        kind: "gapfill",
        text: "Mir schmeckt es in der Mensa ___ ___.",
        options: [],
        answer: 0,
        accept: ["am besten"],
        explain: "„schmecken“ fiilini niteliyor → am besten, „das beste“ değil.",
      },
      {
        kind: "short_answer",
        text: "Was braucht die zweite Person beim Imbiss?",
        options: [],
        answer: 0,
        accept: ["nur eine Semmel", "eine Semmel", "Semmel"],
        explain: "„… ich brauche nur eine Semmel.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u27-w1",
    level: "B1",
    skill: "writing",
    unit: 27,
    title: "Ein Gericht empfehlen",
    genre: "Tarif ve öneri",
    intro: "Bir yemeği anlat ve öner. 'en iyi' sıfatta ve fiilde farklı yazılır.",
    minutes: 8,
    gloss: [
      { de: "der Koch", tr: "aşçı", en: "cook" },
      { de: "der Grill", tr: "ızgara", en: "grill" },
      { de: "das Schnitzel", tr: "şnitzel", en: "schnitzel" },
      { de: "die Anzahl", tr: "sayı / adet", en: "number" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Eti en iyi ince dilimler hâlinde kesersin.",
        answer: "Am besten schneidest du das Fleisch in dünne Scheiben.",
        hint: "Fiili niteliyor → am besten.",
      },
      {
        kind: "build",
        tr: "Bu çocukluğumun en iyi pazar günüydü.",
        answer: "Das war der beste Sonntag meiner Kindheit.",
        hint: "İsimden önce → der beste.",
      },
      {
        kind: "build",
        tr: "Et çok yağsız olmamalı.",
        answer: "Das Fleisch soll nicht zu mager sein.",
        hint: "Yüklemdeki sıfat çekilmez.",
      },
      {
        kind: "form",
        prompt: "Yemek kartını doldur.",
        facts: "Yemek: fırın kızartması; pişirme: fırın, 3 saat; sıcaklık: düşük; dinlendirme: 20 dakika; yanında: ekmek ve turşu.",
        fields: [
          { label: "Gericht", answer: "Braten", accept: ["der Braten", "ein Braten"] },
          { label: "Wie", answer: "im Ofen", accept: ["Ofen", "im Ofen, 3 Stunden"] },
          { label: "Ruhezeit", answer: "20 Minuten", accept: ["zwanzig Minuten"] },
          { label: "Dazu", answer: "Brot und Gemüse", accept: ["Brot", "Brot und eingelegtes Gemüse"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Üstünlük biçimlerini düzelt.",
        source: "Am besten Braten meiner Kindheit schmeckte das beste im Ofen.",
        answer: "Der beste Braten meiner Kindheit schmeckte am besten aus dem Ofen.",
        why: "Türkçede 'en' TEK sözcüktür ve sıfatta da zarfta da aynıdır ('en iyi yemek' · 'en iyi burada olur'), o yüzden Almancada iki biçim karışıyor. Almanca ayırır: İSİMDEN ÖNCE der/die/das beste (çekimli sıfat), FİİLİ niteliyorsa am besten (değişmez zarf).",
      },
    ],
  },
  {
    id: "b1-u27-w2",
    level: "B1",
    skill: "writing",
    unit: 27,
    title: "Eine Reklamation",
    genre: "Şikâyet yazısı",
    intro: "Lokantadaki bir sorunu yaz. 'bir şey' + sıfat Almancada isimleşir.",
    minutes: 12,
    gloss: [
      { de: "die Wirtin", tr: "işletmeci (kadın)", en: "landlady" },
      { de: "der Fleck", tr: "leke", en: "stain" },
      { de: "salzig", tr: "tuzlu", en: "salty" },
      { de: "die Ausgabe", tr: "harcama", en: "expense" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Sıcak bir şey sipariş ettim ama soğuk geldi.",
        answer: "Ich habe etwas Warmes bestellt, aber es kam kalt.",
        hint: "etwas + sıfat → isimleşir, büyük harf.",
      },
      {
        kind: "build",
        tr: "Yeni bir şey almadım, sadece bir özür.",
        answer: "Ich habe nichts Neues bekommen, nur eine Entschuldigung.",
        hint: "nichts + sıfat → aynı kural.",
      },
      {
        kind: "free",
        prompt: "Bir lokantada yaşadığın sorunu yaz: nerede ve ne zaman, sorun tam olarak neydi, o an ne söyledin, işletmeci nasıl karşıladı, ve ne beklediğin. Nazik ama açık ol. En az bir 'etwas' ya da 'nichts' + sıfat kullan.",
        checklist: [
          "Yer ve zaman verilmiş mi?",
          "Sorun somut anlatılmış mı (genel değil)?",
          "O an ne söylendiği yazılmış mı?",
          "Beklenti açık mı?",
          "En az bir 'etwas/nichts' + isimleşmiş sıfat var mı?",
        ],
        minWords: 70,
        sample:
          "Sehr geehrte Damen und Herren,\n\n" +
          "am Samstagabend war ich mit zwei Freunden in Ihrer Gaststätte, " +
          "Tisch neun.\n\n" +
          "Ich hatte etwas Warmes bestellt, aber die Suppe kam kalt. " +
          "Ich habe das sofort gesagt, nicht erst beim Zahlen. Der Kellner " +
          "hat sie mitgenommen, und danach ist zwanzig Minuten nichts " +
          "passiert. Am Ende habe ich nichts Neues bekommen, nur eine " +
          "Entschuldigung.\n\n" +
          "Auf einem Glas war außerdem ein Fleck. Das ist kein großes " +
          "Problem, aber zusammen mit dem Rest war der Abend ärgerlich, " +
          "und die Ausgabe war für uns nicht klein.\n\n" +
          "Ich schreibe nicht, weil ich Geld zurück will. Ich schreibe, " +
          "weil wir gern wiederkommen würden und die Wirtin das vermutlich " +
          "auch möchte.\n\n" +
          "Mit freundlichen Grüßen\nSedef Aydın",
        phrases: [
          { de: "Ich hatte etwas Warmes bestellt.", tr: "Sıcak bir şey sipariş etmiştim.", en: "I had ordered something warm." },
          { de: "Ich habe das sofort gesagt.", tr: "Bunu hemen söyledim.", en: "I said so straight away." },
          { de: "Ich schreibe nicht, weil …", tr: "… olduğu için yazmıyorum.", en: "I am not writing because …" },
        ],
      },
      {
        kind: "rewrite",
        prompt: "„etwas“ ve „nichts“ sonrasını düzelt.",
        source: "Ich möchte etwas süß essen, aber ich habe nichts warm gefunden.",
        answer: "Ich möchte etwas Süßes essen, aber ich habe nichts Warmes gefunden.",
        why: "Türkçede 'tatlı bir şey' sıradan bir sıfat-isim dizisidir ve sıfat değişmez, o yüzden Almancada da çıplak sıfat yazılıyor. Almanca burada sıfatı İSİMLEŞTİRİR: etwas/nichts/viel/wenig sonrasında sıfat büyük harfle yazılır ve -es eki alır — etwas Süßes, nichts Warmes, viel Interessantes.",
      },
    ],
  },
];
