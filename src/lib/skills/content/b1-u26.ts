import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 26 — "Mutfak, lokanta, pazar" (dersler 101–104).
 *
 * Dersler: Ein Rezept lesen · Im Gasthaus · Frisch vom Markt ·
 * Zum Essen eingeladen.
 *
 * İki aktarım hatası bu ünitenin somut diline düşüyor:
 *   stellen ↔ stehen  Almanca aynı yeri iki ayrı fiil ve iki ayrı hâlle
 *                     anlatır: HAREKET varsa stellen/legen/setzen +
 *                     Akkusativ ("stell die Schüssel auf den Tisch"),
 *                     DURUM varsa stehen/liegen/sitzen + Dativ ("die
 *                     Schüssel steht auf dem Tisch"). Türkçede 'koymak'
 *                     ve 'durmak' vardır ama hâl ayrımı yoktur, o yüzden
 *                     edat sonrası hâl rastgele seçiliyor.
 *   sayıdan sonra     Türkçede sayıdan sonra isim TEKİL kalır ('üç soğan'),
 *   çoğul             Almancada ÇOĞUL olur (drei Zwiebeln). Bu, birebir
 *                     çeviriden doğan en düzenli hatalardan biri.
 *
 * Yeni 32 kelime: die Zutaten, das Mehl, das Fett, der Essig, der Pfeffer,
 * das Gewürz, die Schüssel, die Zwiebel, das Gasthaus, der Kellner,
 * die Kellnerin, das Menü, die Reservierung, das Trinkgeld, der Ober,
 * die Bar, die Frucht, die Pflaume, die Karotte, der Pilz,
 * das Sonderangebot, die Dose, das Nahrungsmittel, wiegen, die Mahlzeit,
 * die Nachspeise, die Sahne, der Honig, das Gebäck, die Konfitüre,
 * das Buffet, die Kanne.
 */
export const b1U26: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u26-r1",
    level: "B1",
    skill: "reading",
    unit: 26,
    title: "Ein Rezept für vier Personen",
    genre: "Yemek tarifi",
    intro: "Bir tarif. Neyi nereye koyuyoruz, ne nerede duruyor?",
    minutes: 5,
    gloss: [
      { de: "die Zutaten", tr: "malzemeler", en: "ingredients" },
      { de: "die Schüssel", tr: "kâse", en: "bowl" },
      { de: "das Gewürz", tr: "baharat", en: "spice" },
      { de: "der Essig", tr: "sirke", en: "vinegar" },
      { de: "die Zwiebel", tr: "soğan", en: "onion" },
    ],
    text:
      "Zutaten für vier Personen: drei Zwiebeln, zwei Karotten, zweihundert " +
      "Gramm Mehl, etwas Fett, Essig, Salz und Pfeffer.\n\n" +
      "Stellen Sie zuerst eine große Schüssel auf den Tisch. In dieser " +
      "Schüssel mischen Sie das Mehl mit dem Wasser. Die Schüssel steht " +
      "dann zwanzig Minuten auf dem Tisch, damit der Teig ruht.\n\n" +
      "In der Zeit schneiden Sie die Zwiebeln und die Karotten klein. " +
      "Legen Sie das Gemüse in die Pfanne, nicht in den Topf — es soll " +
      "braun werden, nicht kochen. Erst danach kommen die Gewürze dazu.\n\n" +
      "Zum Schluss ein Löffel Essig. Das klingt seltsam, aber es macht " +
      "den Unterschied. Wer es probiert hat, macht es nie wieder ohne.",
    questions: [
      {
        text: "Wie viele Zwiebeln braucht man?",
        options: ["Zwei", "Drei", "Vier"],
        answer: 1,
        explain: "„Zutaten für vier Personen: drei Zwiebeln, zwei Karotten …“",
      },
      {
        text: "Wie lange ruht der Teig?",
        options: ["Zehn Minuten", "Zwanzig Minuten", "Eine Stunde"],
        answer: 1,
        explain: "„Die Schüssel steht dann zwanzig Minuten auf dem Tisch …“",
      },
      {
        text: "Wohin kommt das Gemüse?",
        options: ["In den Topf", "In die Pfanne", "In die Schüssel"],
        answer: 1,
        explain: "„Legen Sie das Gemüse in die Pfanne, nicht in den Topf …“",
      },
      {
        kind: "gapfill",
        text: "Stellen Sie eine große Schüssel auf ___ Tisch. Die Schüssel steht dann auf ___ Tisch.",
        options: [],
        answer: 0,
        accept: ["den dem", "den / dem"],
        explain: "Hareket → Akkusativ (auf den Tisch). Durum → Dativ (auf dem Tisch).",
      },
      {
        kind: "short_answer",
        text: "Wie viel Mehl braucht man?",
        options: [],
        answer: 0,
        accept: ["zweihundert Gramm", "200 Gramm", "zweihundert"],
        explain: "„… zweihundert Gramm Mehl …“",
      },
    ],
  },
  {
    id: "b1-u26-r2",
    level: "B1",
    skill: "reading",
    unit: 26,
    title: "Im Gasthaus",
    genre: "Lokanta rehberi",
    intro: "Bir lokantada neler bilinmeli? Rezervasyon, sipariş, bahşiş.",
    minutes: 5,
    gloss: [
      { de: "das Gasthaus", tr: "lokanta", en: "inn" },
      { de: "die Reservierung", tr: "rezervasyon", en: "reservation" },
      { de: "das Menü", tr: "menü", en: "set menu" },
      { de: "das Trinkgeld", tr: "bahşiş", en: "tip" },
      { de: "der Kellner", tr: "garson", en: "waiter" },
    ],
    text:
      "In einem kleinen Gasthaus reicht meistens ein Anruf am Vormittag. " +
      "Eine Reservierung für zwei Personen bekommen Sie fast immer; " +
      "bei sechs Personen sollten Sie zwei Tage vorher fragen.\n\n" +
      "Am Mittag gibt es oft ein Menü: Suppe, Hauptgericht und eine kleine " +
      "Nachspeise für einen festen Preis. Das ist günstiger als drei einzelne " +
      "Gerichte und geht schneller.\n\n" +
      "Der Kellner bringt die Karte, aber fragen Sie ruhig, was heute frisch " +
      "ist. Diese Frage hört jede Kellnerin gern. Wer schweigt, bekommt " +
      "das, was am längsten in der Küche steht.\n\n" +
      "Das Trinkgeld liegt bei etwa zehn Prozent. Man sagt beim Zahlen " +
      "einfach die Summe, die man geben will. Legen Sie das Geld nicht " +
      "wortlos auf den Tisch — das gilt hier als unhöflich.",
    questions: [
      {
        text: "Wann soll man bei sechs Personen fragen?",
        options: ["Am selben Tag", "Zwei Tage vorher", "Eine Woche vorher"],
        answer: 1,
        explain: "„… bei sechs Personen sollten Sie zwei Tage vorher fragen.“",
      },
      {
        text: "Was gehört zum Mittagsmenü?",
        options: ["Suppe, Hauptgericht, Nachspeise", "Nur ein Hauptgericht", "Getränke"],
        answer: 0,
        explain: "„… ein Menü: Suppe, Hauptgericht und eine kleine Nachspeise für einen festen Preis.“",
      },
      {
        text: "Wie hoch ist das Trinkgeld etwa?",
        options: ["Fünf Prozent", "Zehn Prozent", "Zwanzig Prozent"],
        answer: 1,
        explain: "„Das Trinkgeld liegt bei etwa zehn Prozent.“",
      },
      {
        kind: "gapfill",
        text: "Legen Sie das Geld nicht wortlos auf ___ Tisch.",
        options: [],
        answer: 0,
        accept: ["den"],
        explain: "„legen“ hareket bildirir → Akkusativ: auf den Tisch.",
      },
      {
        kind: "short_answer",
        text: "Was soll man den Kellner fragen?",
        options: [],
        answer: 0,
        accept: ["was heute frisch ist", "was frisch ist"],
        explain: "„… fragen Sie ruhig, was heute frisch ist.“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u26-l1",
    level: "B1",
    skill: "listening",
    unit: 26,
    title: "Auf dem Markt",
    genre: "Pazar konuşması",
    intro: "Pazarda alışveriş. Ne kadar, kaç tane, kaç para?",
    minutes: 4,
    gloss: [
      { de: "die Frucht", tr: "meyve", en: "fruit" },
      { de: "der Pilz", tr: "mantar", en: "mushroom" },
      { de: "wiegen", tr: "tartmak", en: "to weigh" },
      { de: "das Sonderangebot", tr: "özel fiyat", en: "special offer" },
    ],
    segments: [
      { text: "Guten Morgen. Was kostet das Kilo Pflaumen?" },
      { text: "Heute drei Euro. Sonderangebot, sonst vier." },
      { text: "Dann nehme ich zwei Kilo. Und vier Karotten." },
      { text: "Gern. Soll ich die Pilze auch wiegen?" },
      { text: "Ja, dreihundert Gramm bitte." },
      { text: "Sind Sie sicher? Die sind heute sehr frisch, nehmen Sie fünfhundert." },
      { text: "Gut, überzeugt. Legen Sie alles in eine Tasche." },
      { text: "Macht zusammen elf Euro vierzig." },
    ],
    questions: [
      {
        text: "Was kostet das Kilo Pflaumen heute?",
        options: ["Drei Euro", "Vier Euro", "Elf Euro"],
        answer: 0,
        explain: "„Heute drei Euro. Sonderangebot, sonst vier.“",
      },
      {
        text: "Wie viele Pilze nimmt die Kundin am Ende?",
        options: ["Dreihundert Gramm", "Fünfhundert Gramm", "Ein Kilo"],
        answer: 1,
        explain: "„… nehmen Sie fünfhundert.“ — „Gut, überzeugt.“",
      },
      {
        text: "Wie viel kostet alles zusammen?",
        options: ["Elf Euro vierzig", "Zehn Euro", "Vierzehn Euro"],
        answer: 0,
        explain: "„Macht zusammen elf Euro vierzig.“",
      },
      {
        kind: "gapfill",
        text: "Dann nehme ich zwei Kilo. Und vier ___.",
        options: [],
        answer: 0,
        accept: ["Karotten"],
        explain: "Sayıdan sonra Almancada ÇOĞUL gelir: vier Karotten.",
      },
      {
        kind: "short_answer",
        text: "Worin soll alles gelegt werden?",
        options: [],
        answer: 0,
        accept: ["in eine Tasche", "in die Tasche", "Tasche"],
        explain: "„Legen Sie alles in eine Tasche.“",
      },
    ],
  },
  {
    id: "b1-u26-l2",
    level: "B1",
    skill: "listening",
    unit: 26,
    title: "Zum Essen eingeladen",
    genre: "Akşam yemeği",
    intro: "Bir davet. Ne getirilmiş, tatlıda ne var?",
    minutes: 4,
    gloss: [
      { de: "die Mahlzeit", tr: "öğün", en: "meal" },
      { de: "die Nachspeise", tr: "tatlı", en: "dessert" },
      { de: "die Sahne", tr: "krema", en: "cream" },
      { de: "die Kanne", tr: "demlik", en: "pot" },
    ],
    segments: [
      { text: "Kommt herein! Stellt die Sachen einfach auf den Tisch." },
      { text: "Wir haben Gebäck mitgebracht und eine Konfitüre." },
      { text: "Das wäre nicht nötig gewesen. Aber danke, sehr lieb." },
      { text: "Es riecht wunderbar. Was gibt es denn?" },
      { text: "Erst eine Suppe, dann Gemüse mit Reis." },
      { text: "Und zur Nachspeise?" },
      { text: "Etwas Süßes mit Sahne und Honig. Die Kanne mit Tee steht schon da." },
      { text: "Perfekt. Dann setzen wir uns." },
    ],
    questions: [
      {
        text: "Was haben die Gäste mitgebracht?",
        options: ["Gebäck und Konfitüre", "Blumen", "Wein"],
        answer: 0,
        explain: "„Wir haben Gebäck mitgebracht und eine Konfitüre.“",
      },
      {
        text: "Was gibt es als Hauptgericht?",
        options: ["Suppe", "Gemüse mit Reis", "Fleisch"],
        answer: 1,
        explain: "„Erst eine Suppe, dann Gemüse mit Reis.“",
      },
      {
        text: "Was ist in der Nachspeise?",
        options: ["Sahne und Honig", "Konfitüre", "Nur Obst"],
        answer: 0,
        explain: "„Etwas Süßes mit Sahne und Honig.“",
      },
      {
        kind: "gapfill",
        text: "Stellt die Sachen einfach auf ___ Tisch. Die Kanne steht schon auf ___ Tisch.",
        options: [],
        answer: 0,
        accept: ["den dem", "den / dem"],
        explain: "Koyma hareketi → Akkusativ; durma → Dativ.",
      },
      {
        kind: "short_answer",
        text: "Was steht schon da?",
        options: [],
        answer: 0,
        accept: ["die Kanne mit Tee", "die Kanne", "Tee"],
        explain: "„Die Kanne mit Tee steht schon da.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u26-w1",
    level: "B1",
    skill: "writing",
    unit: 26,
    title: "Ein Rezept aufschreiben",
    genre: "Tarif metni",
    intro: "Bir tarif yaz. Koymak mı, durmak mı — hâl ona göre.",
    minutes: 8,
    gloss: [
      { de: "die Schüssel", tr: "kâse", en: "bowl" },
      { de: "das Mehl", tr: "un", en: "flour" },
      { de: "das Fett", tr: "yağ", en: "fat" },
      { de: "der Pfeffer", tr: "karabiber", en: "pepper" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Büyük bir kâseyi masaya koyun.",
        answer: "Stellen Sie eine große Schüssel auf den Tisch.",
        hint: "Hareket → Akkusativ.",
      },
      {
        kind: "build",
        tr: "Kâse yirmi dakika masada duruyor.",
        answer: "Die Schüssel steht zwanzig Minuten auf dem Tisch.",
        hint: "Durum → Dativ.",
      },
      {
        kind: "build",
        tr: "Sebzeyi tavaya koyun, tencereye değil.",
        answer: "Legen Sie das Gemüse in die Pfanne, nicht in den Topf.",
        hint: "İki kez hareket → iki kez Akkusativ.",
      },
      {
        kind: "form",
        prompt: "Tarif kartını doldur.",
        facts: "Kişi sayısı: 4; soğan: 3; havuç: 2; un: 200 gram; bekleme: 20 dakika.",
        fields: [
          { label: "Personen", answer: "4", accept: ["vier", "für vier Personen"] },
          { label: "Zwiebeln", answer: "3", accept: ["drei", "drei Zwiebeln"] },
          { label: "Mehl", answer: "200 Gramm", accept: ["zweihundert Gramm", "200 g"] },
          { label: "Ruhezeit", answer: "20 Minuten", accept: ["zwanzig Minuten"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Fiil ve hâl seçimini düzelt.",
        source: "Stellen Sie die Schüssel auf dem Tisch, dort stellt sie zwanzig Minuten.",
        answer: "Stellen Sie die Schüssel auf den Tisch, dort steht sie zwanzig Minuten.",
        why: "Türkçede 'koymak' ve 'durmak' ayrı fiillerdir ama HÂL ayrımı yoktur ('masaya koy' · 'masada duruyor' — edat ekiyle çözülür). Almanca ikisini birden ister: HAREKET varsa stellen/legen/setzen + Akkusativ, DURUM varsa stehen/liegen/sitzen + Dativ. İki karar aynı anda verilir.",
      },
    ],
  },
  {
    id: "b1-u26-w2",
    level: "B1",
    skill: "writing",
    unit: 26,
    title: "Einkaufszettel und Bericht",
    genre: "Alışveriş yazısı",
    intro: "Pazardan aldıklarını yaz. Sayıdan sonra isim çoğul olur.",
    minutes: 12,
    gloss: [
      { de: "die Pflaume", tr: "erik", en: "plum" },
      { de: "die Karotte", tr: "havuç", en: "carrot" },
      { de: "die Dose", tr: "konserve kutusu", en: "tin" },
      { de: "das Nahrungsmittel", tr: "gıda maddesi", en: "food item" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Üç soğan ve dört havuç aldım.",
        answer: "Ich habe drei Zwiebeln und vier Karotten gekauft.",
        hint: "Sayıdan sonra çoğul.",
      },
      {
        kind: "build",
        tr: "İki kilo erik özel fiyattaydı.",
        answer: "Zwei Kilo Pflaumen waren im Sonderangebot.",
        hint: "Ölçü birimi tekil kalır, ürün çoğul olur.",
      },
      {
        kind: "free",
        prompt: "Bir pazar alışverişini anlat: nereye gittin, ne aldın (en az beş şey, sayılarla), fiyatlar nasıldı, ve neyi neden almadın. Sayıdan sonra çoğul biçimlere dikkat et.",
        checklist: [
          "Yer ve zaman söylenmiş mi?",
          "En az beş ürün sayılmış mı?",
          "Sayıdan sonra çoğul doğru mu?",
          "Fiyatlar geçiyor mu?",
          "Alınmayan bir şey ve sebebi var mı?",
        ],
        minWords: 70,
        sample:
          "Am Samstagmorgen war ich auf dem Markt am Rathaus. Um acht ist es " +
          "dort noch ruhig, und das Gemüse liegt frisch auf den Tischen.\n\n" +
          "Ich habe drei Zwiebeln, vier Karotten, zwei Kilo Pflaumen und " +
          "fünfhundert Gramm Pilze gekauft. Die Pflaumen waren im " +
          "Sonderangebot, drei Euro statt vier. Dazu noch eine Dose Konfitüre " +
          "und eine kleine Kanne Honig vom Stand daneben.\n\n" +
          "Zusammen habe ich ungefähr achtzehn Euro bezahlt. Das ist mehr als " +
          "im Laden, aber die Nahrungsmittel kommen von hier und schmecken " +
          "auch anders.\n\n" +
          "Fleisch habe ich nicht gekauft. Es war mir zu teuer, und ich hatte " +
          "keine Tasche mehr frei. Nächstes Mal nehme ich zwei Taschen mit.",
        phrases: [
          { de: "Ich habe drei … und vier … gekauft.", tr: "Üç … ve dört … aldım.", en: "I bought three … and four …" },
          { de: "… waren im Sonderangebot.", tr: "… özel fiyattaydı.", en: "… were on special offer." },
          { de: "Zusammen habe ich … bezahlt.", tr: "Toplam … ödedim.", en: "Altogether I paid …" },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Sayılardan sonraki isimleri düzelt.",
        source: "Ich kaufe drei Zwiebel, zwei Frucht und vier Karotte.",
        answer: "Ich kaufe drei Zwiebeln, zwei Früchte und vier Karotten.",
        why: "Türkçede sayıdan sonra isim TEKİL kalır ('üç soğan', 'dört havuç') — çoğul eki gereksiz sayılır. Almancada tam tersi: birden büyük her sayıdan sonra isim ÇOĞUL olur. Üstelik çoğul biçimi tahmin edilemez ve kelimeyle birlikte öğrenilir: Zwiebel → Zwiebeln, Frucht → Früchte, Karotte → Karotten.",
      },
    ],
  },
];
