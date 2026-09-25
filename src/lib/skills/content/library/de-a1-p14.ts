import type { SkillExercise } from "../../types";

/**
 * DE · A1 — Beceriler kütüphanesi, parti 14.
 *
 * Kurallar ve emsal: `de-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Hücreyi YİRMİYE tamamlayan partilerden biri. Yemek hattı: belediye
 * yemekhanesinin haftalık menüsü, yemek kursunun ilk akşamı, ortak yemek
 * kitabı için memleketten bir tarif. Söyleyiş odağı yabancı kökenli
 * kelimelerde -tion, ph ve th; dil bilgisi beğeni: gern ve mögen.
 */
export const deA1P14: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a1-lib-r14",
    course: "de",
    level: "A1",
    skill: "reading",
    title: "Speiseplan der Kantine",
    genre: "info",
    intro: "Belediye binasındaki yemekhanenin kapısında bu haftanın menüsü asılı: hangi gün ne var, ne kadar, nasıl ödeniyor.",
    gloss: [
      { de: "die Kantine", tr: "yemekhane", en: "cafeteria" },
      { de: "das Hähnchen", tr: "piliç", en: "chicken" },
      { de: "die Suppe", tr: "çorba", en: "soup" },
      { de: "der Reis", tr: "pirinç", en: "rice" },
      { de: "das Bargeld", tr: "nakit", en: "cash" },
      { de: "die Feier", tr: "kutlama", en: "celebration" },
    ],
    minutes: 4,
    text:
      "KANTINE IM RATHAUS — SPEISEPLAN FÜR DIESE WOCHE\n\n" +
      "Montag: Gemüsesuppe mit Brot, ohne Fleisch.\n" +
      "Dienstag: Hähnchen mit Reis und Salat.\n" +
      "Mittwoch: Nudeln mit Tomaten und Käse.\n" +
      "Donnerstag: Fisch mit Kartoffeln und Gemüse.\n" +
      "Freitag: Pizza. Es gibt auch eine Pizza ohne Fleisch.\n\n" +
      "Jeden Tag gibt es Obst und Joghurt. Ein Essen kostet vier Euro fünfzig, mit Getränk fünf Euro fünfzig.\n\n" +
      "Die Kantine ist von halb zwölf bis vierzehn Uhr offen. Bitte bezahlen Sie mit Ihrer Karte, Bargeld nehmen wir nicht.\n\n" +
      "Am Montag ist die Kantine schon ab dreizehn Uhr zu. Wir haben eine kleine Feier für Frau Keller: " +
      "Sie arbeitet seit dreißig Jahren bei uns!",
    questions: [
      {
        text: "Was ist das für ein Text?",
        options: ["eine Einladung zu einer Feier", "ein Plan für das Essen in dieser Woche", "ein Rezept für Pizza"],
        answer: 1,
        explain: "Başlık „Speiseplan für diese Woche“ ve altında her günün yemeği sıralanıyor.",
      },
      {
        text: "An welchem Tag gibt es Fisch?",
        options: ["am Dienstag", "am Freitag", "am Donnerstag"],
        answer: 2,
        explain: "„Donnerstag: Fisch mit Kartoffeln und Gemüse.“ Salı günü piliç var.",
      },
      {
        kind: "truefalse",
        text: "In der Kantine kann man nicht bar bezahlen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Bitte bezahlen Sie mit Ihrer Karte, Bargeld nehmen wir nicht.“",
      },
      {
        kind: "gapfill",
        text: "Ein Essen mit Getränk kostet ___ Euro fünfzig.",
        options: [],
        answer: 0,
        accept: ["fünf", "5"],
        explain: "„mit Getränk fünf Euro fünfzig“; içeceksiz dört elli.",
      },
      {
        kind: "short_answer",
        text: "Was gibt es jeden Tag?",
        options: [],
        answer: 0,
        accept: ["Obst und Joghurt", "Obst und einen Joghurt", "Obst"],
        explain: "„Jeden Tag gibt es Obst und Joghurt.“",
      },
      {
        text: "Warum ist die Kantine am Montag früher zu?",
        options: ["Es gibt eine Feier für eine Kollegin.", "Die Küche ist kaputt.", "Am Montag gibt es kein Essen."],
        answer: 0,
        explain: "Frau Keller otuz yıldır orada çalışıyor ve onun için „eine kleine Feier“ yapılıyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a1-lib-l14",
    course: "de",
    level: "A1",
    skill: "listening",
    title: "Der erste Abend im Kochkurs",
    genre: "monologue",
    intro: "Yemek kursunun ilk akşamı; kursu veren aşçı grubu karşılıyor: kurs ne zaman, bugün ne pişecek, nasıl çalışılacak.",
    gloss: [
      { de: "der Kurs", tr: "kurs", en: "course" },
      { de: "die Hand", tr: "el", en: "hand" },
      { de: "das Messer", tr: "bıçak", en: "knife" },
      { de: "der Herd", tr: "ocak", en: "stove" },
      { de: "zusammen", tr: "birlikte", en: "together" },
      { de: "der Markt", tr: "pazar", en: "market" },
    ],
    minutes: 4,
    segments: [
      { text: "Guten Abend und herzlich willkommen im Kochkurs „Schnell und gesund“! Ich heiße Marco und koche seit zwanzig Jahren." },
      { text: "Der Kurs hat sechs Abende, immer mittwochs von achtzehn bis einundzwanzig Uhr." },
      { text: "Heute kochen wir eine Tomatensuppe und backen Brot. Am Ende essen wir alle zusammen." },
      { text: "Bitte waschen Sie zuerst Ihre Hände. Die Messer liegen im Schrank neben der Tür." },
      { text: "Sie arbeiten immer zu zweit. Jedes Paar hat einen Herd und einen großen Tisch." },
      { text: "Essen Sie etwas nicht? Dann sagen Sie es mir bitte jetzt." },
      { text: "Nächste Woche gehen wir zuerst zusammen auf den Markt. Bringen Sie dann bitte eine Tasche mit." },
    ],
    questions: [
      {
        text: "Wer spricht?",
        options: ["ein Gast im Restaurant", "eine Verkäuferin auf dem Markt", "der Lehrer im Kochkurs"],
        answer: 2,
        explain: "„Ich heiße Marco und koche seit zwanzig Jahren“ — kursu veren aşçı grubu karşılıyor.",
      },
      {
        text: "Was kochen sie heute?",
        options: ["eine Tomatensuppe und Brot", "Fisch mit Reis und Salat", "einen Kuchen mit Äpfeln"],
        answer: 0,
        explain: "„Heute kochen wir eine Tomatensuppe und backen Brot.“",
      },
      {
        kind: "truefalse",
        text: "Jede Person hat einen eigenen Herd.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Sie arbeiten immer zu zweit. Jedes Paar hat einen Herd“ — ocak iki kişiye bir tane.",
      },
      {
        kind: "gapfill",
        text: "Der Kurs ist immer am ___.",
        options: [],
        answer: 0,
        accept: ["Mittwoch", "mittwochs"],
        explain: "„immer mittwochs von achtzehn bis einundzwanzig Uhr“.",
      },
      {
        kind: "short_answer",
        text: "Was soll man zuerst machen?",
        options: [],
        answer: 0,
        accept: ["die Hände waschen", "Hände waschen", "seine Hände waschen"],
        explain: "„Bitte waschen Sie zuerst Ihre Hände.“",
      },
      {
        text: "Was machen sie nächste Woche zuerst?",
        options: ["Sie backen Brot.", "Sie gehen auf den Markt.", "Sie essen im Restaurant."],
        answer: 1,
        explain: "„Nächste Woche gehen wir zuerst zusammen auf den Markt.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a1-lib-w14",
    course: "de",
    level: "A1",
    skill: "writing",
    title: "Ein Rezept aus meiner Heimat",
    genre: "guide",
    intro: "Kurs arkadaşlarınla bir yemek kitabı hazırlıyorsunuz: önce iki cümle kur, sonra memleketinden basit bir yemeğin tarifini yaz.",
    gloss: [
      { de: "die Heimat", tr: "memleket", en: "homeland" },
      { de: "das Ei", tr: "yumurta", en: "egg" },
      { de: "das Öl", tr: "sıvı yağ", en: "oil" },
      { de: "die Pfanne", tr: "tava", en: "pan" },
      { de: "schneiden", tr: "kesmek", en: "to cut" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Bu yemek için dört yumurtaya ihtiyacın var.",
        answer: "Für dieses Essen brauchst du vier Eier.",
        alternatives: ["Du brauchst vier Eier für dieses Essen."],
        hint: "„für“ belirtme hâli ister; „für dieses Essen“ başa gelince fiil ikinci, özne arkasında kalır.",
      },
      {
        kind: "build",
        tr: "Sonra her şeyi beş dakika pişir.",
        answer: "Dann koch alles fünf Minuten.",
        alternatives: ["Koch dann alles fünf Minuten."],
        hint: "du'ya emir: özne söylenmez, fiil kökü başta ya da „dann“dan hemen sonra gelir.",
      },
      {
        kind: "free",
        prompt:
          "Memleketinden sevdiğin basit bir yemeği anlat: adı ne, ne zaman yenir, hangi malzemeler gerekir, nasıl yapılır (üç dört adım) ve yanında ne yenir.",
        checklist: [
          "Yemeğin adını ve ne zaman yendiğini yaz",
          "Malzemeleri say",
          "Üç dört adımda nasıl yapıldığını anlat",
          "Yanında ne yendiğini söyle",
        ],
        minWords: 35,
        phrases: [
          { de: "Das Essen heißt …", tr: "Yemeğin adı …", en: "The dish is called …" },
          { de: "Man isst es oft …", tr: "Çoğunlukla … yenir.", en: "People often eat it …" },
          { de: "Du brauchst …", tr: "…'e ihtiyacın var.", en: "You need …" },
          { de: "Zuerst …, dann …", tr: "Önce …, sonra …", en: "First …, then …" },
          { de: "Dazu passt …", tr: "Yanına … yakışır.", en: "… goes well with it." },
        ],
        sample:
          "Das Essen heißt Menemen und kommt aus der Türkei. Man isst es oft zum Frühstück. " +
          "Du brauchst vier Eier, drei Tomaten, eine Zwiebel, Öl und Salz. " +
          "Zuerst schneidest du die Zwiebel und die Tomaten klein. Dann kochst du alles fünf Minuten in einer Pfanne. " +
          "Am Ende kommen die Eier dazu. Dazu passt frisches Brot. Guten Appetit!",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a1-lib-s14",
    course: "de",
    level: "A1",
    skill: "speaking",
    title: "-tion, ph und th",
    genre: "pronounce",
    intro: "Yabancı kökenli kelimelerde üç kural var: -tion TSİON okunur, ph f okunur, th ise yalnız t'dir. Altı cümlede yazıya değil kurala göre oku.",
    gloss: [
      { de: "die Portion", tr: "porsiyon", en: "portion" },
      { de: "die Information", tr: "bilgi", en: "information" },
      { de: "das Theater", tr: "tiyatro", en: "theater" },
      { de: "die Apotheke", tr: "eczane", en: "pharmacy" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Die Portion ist sehr groß.",
        tr: "Porsiyon çok büyük.",
        hint: "„Portion“ = por-TSİON: -tion içindeki t, ts okunur ve vurgu sondadır.",
        confusions: [
          {
            heard: [],
            fix: "t'yi düz t ya da ş gibi okuma; -tion hep TSİON.",
            expected: "Portion",
          },
        ],
      },
      {
        de: "Die Information ist im ersten Stock.",
        tr: "Danışma birinci katta.",
        hint: "„Information“ = in-for-ma-TSİON: dört hece, vurgu en sonda.",
        confusions: [
          {
            heard: [],
            fix: "Vurguyu başa alma; son hece TSİON en güçlü hecedir.",
            expected: "Information",
          },
        ],
      },
      {
        de: "Heute Abend gehen wir ins Theater.",
        tr: "Bu akşam tiyatroya gidiyoruz.",
        hint: "„Theater“ = te-AA-ter: th yalnız t, h okunmaz.",
        confusions: [
          {
            heard: [],
            fix: "İngilizcedeki gibi dili dişlerin arasına koyma; düz bir t yeterli.",
            expected: "Theater",
          },
        ],
      },
      {
        de: "Die Apotheke ist neben dem Bahnhof.",
        tr: "Eczane garın yanında.",
        hint: "„Apotheke“ = a-po-TEE-ke: th burada da t.",
        confusions: [
          {
            heard: [],
            fix: "th'yi t ile h diye iki ses okuma; tek bir t.",
            expected: "Apotheke",
          },
        ],
      },
      {
        de: "Das Alphabet hat sechsundzwanzig Buchstaben.",
        tr: "Alfabede yirmi altı harf var.",
        hint: "„Alphabet“ = al-fa-BEET: ph her zaman f okunur.",
        confusions: [
          {
            heard: [],
            fix: "ph'yi p ile h diye ayırma; tek bir f sesi.",
            expected: "Alphabet",
          },
        ],
      },
      {
        de: "Die nächste Station ist der Marktplatz.",
        tr: "Sonraki durak Marktplatz.",
        hint: "„Station“ = ştat-TSİON: baştaki st şt, sondaki -tion TSİON.",
        confusions: [
          {
            heard: [],
            fix: "İki kural aynı kelimede: başta şt, sonda ts; ikisini de uygula.",
            expected: "Station",
          },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a1-lib-g14",
    course: "de",
    level: "A1",
    skill: "grammar",
    title: "Ich mag Tee, ich trinke gern Tee",
    genre: "grammar",
    intro: "Türkçede tek fiil yeter: „severim“. Almancada sevdiğin bir eylemse „gern“, sevdiğin bir şeyse „mögen“ kullanılır; ikisini ayırmayı öğren.",
    focus: "Beğeni bildirmek: gern + fiil, mögen + isim",
    gloss: [
      { de: "mögen", tr: "sevmek", en: "to like" },
      { de: "tanzen", tr: "dans etmek", en: "to dance" },
      { de: "die Katze", tr: "kedi", en: "cat" },
      { de: "der Winter", tr: "kış", en: "winter" },
      { de: "lesen", tr: "okumak", en: "to read" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "gern: eylemi sevmek",
        tr: "Türkçede „yüzmeyi severim“ dersin. Almancada sevdiğin eylem normal fiille söylenir ve arkasına „gern“ eklenir. Fiil yine ikinci sıradadır, „gern“ ondan sonra gelir.",
        examples: [
          { de: "Ich schwimme gern.", tr: "Yüzmeyi severim.", note: "fiil + gern" },
          { de: "Wir kochen gern zusammen.", tr: "Birlikte yemek yapmayı severiz.", note: "gern fiilden sonra" },
          { de: "Liest du gern?", tr: "Okumayı sever misin?", note: "soruda da fiilden sonra" },
        ],
      },
      {
        heading: "mögen: bir şeyi sevmek",
        tr: "Bir şeyi ya da birini sevdiğini söylerken „mögen“ kullanılır ve arkasından isim gelir; isim belirtme hâlindedir. Tekil çekim düzensizdir: ich mag, du magst, er/sie mag; çoğulda wir mögen, ihr mögt, sie mögen.",
        examples: [
          { de: "Ich mag Tee.", tr: "Çayı severim.", note: "ich mag" },
          { de: "Magst du Katzen?", tr: "Kedileri sever misin?", note: "du magst" },
          { de: "Er mag den Winter.", tr: "Kışı sever.", note: "der → den (belirtme hâli)" },
        ],
      },
      {
        heading: "Sevmemek ve sık hata",
        tr: "Sevmediğin bir eylem için „nicht gern“, bir şey için „mag … nicht“ ya da „mag kein …“ dersin. „gern“ tek başına fiil değildir: „Ich gern Tee“ olmaz; ya „Ich trinke gern Tee“ ya da „Ich mag Tee“ dersin.",
        examples: [
          { de: "Ich tanze nicht gern.", tr: "Dans etmeyi sevmem.", note: "nicht gern" },
          { de: "Sie mag keinen Fisch.", tr: "Balık sevmez.", note: "mag kein …" },
          { de: "Ich trinke gern Tee.", tr: "Çay içmeyi severim.", note: "fiil + gern + isim" },
        ],
      },
    ],
    questions: [
      {
        text: "Ich ___ Schokolade.",
        options: ["mag", "gern", "möge"],
        answer: 0,
        explain: "Arkadan bir isim geliyor; isimle beğeni mögen ile söylenir: ich mag.",
      },
      {
        text: "Welcher Satz ist richtig?",
        options: ["Ich gern lese Bücher.", "Ich mag lesen gern.", "Ich lese gern Bücher."],
        answer: 2,
        explain: "Fiil ikinci sırada, gern hemen ardından: Ich lese gern Bücher.",
      },
      {
        text: "___ du Hunde?",
        options: ["Mag", "Magst", "Mögst"],
        answer: 1,
        explain: "du biçimi magst'tır; soruda fiil başa geçer.",
      },
      {
        kind: "gapfill",
        text: "Wir ___ den Sommer. (mögen)",
        options: [],
        answer: 0,
        accept: ["mögen"],
        explain: "Çoğulda kök ünlüsü ö kalır: wir mögen.",
      },
      {
        kind: "gapfill",
        text: "Er spielt jeden Samstag ___ Fußball. (sevdiğini söyle)",
        options: [],
        answer: 0,
        accept: ["gern", "gerne"],
        explain: "Sevilen şey bir eylem (oynamak); fiile gern eklenir.",
      },
      {
        kind: "gapfill",
        text: "Ihr ___ Pizza, oder? (mögen)",
        options: [],
        answer: 0,
        accept: ["mögt"],
        explain: "ihr biçimi mögt'tür.",
      },
      {
        kind: "gapfill",
        text: "Meine Schwester ___ keinen Kaffee. (mögen)",
        options: [],
        answer: 0,
        accept: ["mag"],
        explain: "Üçüncü tekilde ek yok: sie mag.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Am Wochenende", "koche", "ich", "gern", "für Freunde"],
        explain: "Zaman başta, fiil ikinci, özne arkasında, gern ondan sonra: Am Wochenende koche ich gern für Freunde.",
      },
      {
        kind: "truefalse",
        text: "„Ich gern tanze.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Fiil ikinci sırada olmalı ve gern ondan sonra gelir: „Ich tanze gern.“",
      },
      {
        kind: "truefalse",
        text: "„Mein Vater mag den Winter nicht.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "mögen + belirtme hâlinde isim (den Winter), olumsuzluk nicht ile sonda.",
      },
    ],
  },
];
