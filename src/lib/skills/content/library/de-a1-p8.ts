import type { SkillExercise } from "../../types";

/**
 * DE · A1 — Beceriler kütüphanesi, parti 8.
 *
 * Kurallar ve emsal: `de-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 8 alışveriş hattı: mağaza değerlendirmesi, değişim konuşması, mahalle
 * forumunda ilan. Söyleyiş odağı ä, ö, ü; dil bilgisi emir kipi — üç hitap,
 * üç ayrı biçim.
 */
export const deA1P8: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a1-lib-r8",
    course: "de",
    level: "A1",
    skill: "reading",
    title: "Bewertung: Möbelhaus Nord",
    genre: "review",
    intro: "Bir müşteri internette mağazayı değerlendirmiş: nesi iyi, nesi kötü, yine gider mi.",
    gloss: [
      { de: "das Möbelhaus", tr: "mobilya mağazası", en: "furniture store" },
      { de: "der Preis", tr: "fiyat", en: "price" },
      { de: "die Lieferung", tr: "teslimat", en: "delivery" },
      { de: "der Stuhl", tr: "sandalye", en: "chair" },
      { de: "freundlich", tr: "güler yüzlü", en: "friendly" },
      { de: "warten", tr: "beklemek", en: "to wait" },
    ],
    minutes: 4,
    text:
      "Möbelhaus Nord — 3 von 5 Sternen\n\n" +
      "Wir haben am Samstag einen Tisch und vier Stühle gekauft. Der Tisch ist schön und der Preis ist gut. " +
      "Die Frau im Laden war sehr freundlich und hat uns alles erklärt.\n\n" +
      "Aber die Lieferung war ein Problem. Wir haben drei Wochen gewartet. " +
      "Am Telefon sagt man immer: „Nächste Woche kommt alles.“ Das ist nicht korrekt.\n\n" +
      "Ein Stuhl war kaputt. Der Mann am Service hat aber schnell einen neuen Stuhl gebracht.\n\n" +
      "Die Möbel sind gut, das Personal ist nett. Nur die Lieferung ist langsam. " +
      "Wir kaufen wieder dort, aber wir holen die Sachen selbst.",
    questions: [
      {
        text: "Wie findet der Kunde das Möbelhaus insgesamt?",
        options: ["sehr schlecht", "gut, aber nicht perfekt", "perfekt"],
        answer: 1,
        explain: "Beş yıldızdan üç veriyor: mobilyalar ve personel iyi, teslimat kötü.",
      },
      {
        text: "Was war das größte Problem?",
        options: ["die Lieferung", "der Preis", "das Personal"],
        answer: 0,
        explain: "Üç hafta beklemişler; „die Lieferung war ein Problem“.",
      },
      {
        kind: "truefalse",
        text: "Der Service hat den kaputten Stuhl schnell getauscht.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Der Mann am Service hat aber schnell einen neuen Stuhl gebracht.“",
      },
      {
        kind: "gapfill",
        text: "Die Familie hat ___ Wochen auf die Möbel gewartet.",
        options: [],
        answer: 0,
        accept: ["drei", "3"],
        explain: "„Wir haben drei Wochen gewartet.“",
      },
      {
        kind: "short_answer",
        text: "Was hat die Familie gekauft?",
        options: [],
        answer: 0,
        accept: ["einen Tisch und vier Stühle", "Tisch und Stühle", "einen Tisch und Stühle"],
        explain: "„einen Tisch und vier Stühle“ — cumartesi alınmış.",
      },
      {
        text: "Was macht die Familie beim nächsten Mal anders?",
        options: [
          "Sie kauft in einem anderen Laden.",
          "Sie bestellt im Internet.",
          "Sie holt die Möbel selbst ab.",
        ],
        answer: 2,
        explain: "„wir holen die Sachen selbst“ — mağazayı bırakmıyorlar, yalnız teslimatı atlıyorlar.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a1-lib-l8",
    course: "de",
    level: "A1",
    skill: "listening",
    title: "Umtausch im Geschäft",
    genre: "dialogue",
    intro: "Bir müşteri aldığı ceketi değiştirmek istiyor: beden mi renk mi, fiş var mı, para geri alınır mı.",
    gloss: [
      { de: "die Jacke", tr: "ceket", en: "jacket" },
      { de: "umtauschen", tr: "değiştirmek", en: "to exchange" },
      { de: "der Kassenbon", tr: "fiş", en: "receipt" },
      { de: "die Größe", tr: "beden", en: "size" },
      { de: "passen", tr: "uymak", en: "to fit" },
      { de: "die Kasse", tr: "kasa", en: "till" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Herr Neumann", text: "Guten Tag. Ich möchte diese Jacke umtauschen. Sie ist leider zu klein." },
      { speaker: "Frau Roth", text: "Guten Tag. Kein Problem. Haben Sie den Kassenbon dabei?" },
      { speaker: "Herr Neumann", text: "Ja, hier bitte. Ich habe die Jacke am Montag gekauft." },
      { speaker: "Frau Roth", text: "Danke. Welche Größe haben Sie? Die Jacke hier ist Größe achtundvierzig." },
      { speaker: "Herr Neumann", text: "Ich brauche fünfzig. Haben Sie die Jacke auch in Blau?" },
      { speaker: "Frau Roth", text: "In Blau leider nicht, nur in Schwarz und Grau. Möchten Sie Schwarz probieren?" },
      { speaker: "Herr Neumann", text: "Ja, gern. Und wenn sie nicht passt, bekomme ich mein Geld zurück?" },
      { speaker: "Frau Roth", text: "Ja, innerhalb von zwei Wochen. Bitte kommen Sie dann zur Kasse zwei." },
    ],
    questions: [
      {
        text: "Warum kommt Herr Neumann in den Laden?",
        options: ["Er sucht eine neue Hose.", "Er möchte eine Jacke umtauschen.", "Er hat seinen Kassenbon verloren."],
        answer: 1,
        explain: "İlk cümlesi: „Ich möchte diese Jacke umtauschen.“ Fiş yanında.",
      },
      {
        text: "Welches Problem hat die Jacke?",
        options: ["Sie ist zu klein.", "Sie ist kaputt.", "Sie ist zu teuer."],
        answer: 0,
        explain: "„Sie ist leider zu klein“ — beden 48, kendisine 50 lazım.",
      },
      {
        kind: "truefalse",
        text: "Die Jacke gibt es auch in Blau.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„In Blau leider nicht, nur in Schwarz und Grau.“",
      },
      {
        kind: "gapfill",
        text: "Herr Neumann braucht Größe ___.",
        options: [],
        answer: 0,
        accept: ["fünfzig", "50"],
        explain: "„Ich brauche fünfzig.“",
      },
      {
        kind: "short_answer",
        text: "Wie lange kann man das Geld zurückbekommen?",
        options: [],
        answer: 0,
        accept: ["zwei Wochen", "innerhalb von zwei Wochen", "zwei Wochen lang"],
        explain: "„Ja, innerhalb von zwei Wochen.“",
      },
      {
        text: "Wohin soll Herr Neumann gehen?",
        options: ["zur Information", "zum Ausgang", "zur Kasse zwei"],
        answer: 2,
        explain: "„Bitte kommen Sie dann zur Kasse zwei.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a1-lib-w8",
    course: "de",
    level: "A1",
    skill: "writing",
    title: "Im Nachbarschaftsforum",
    genre: "forum",
    intro: "Mahalle forumuna yazıyorsun: önce iki cümle kur, sonra bir alet ödünç isteyen kısa bir ilan yaz.",
    gloss: [
      { de: "die Bohrmaschine", tr: "matkap", en: "drill" },
      { de: "leihen", tr: "ödünç vermek", en: "to lend" },
      { de: "der Nachbar", tr: "komşu", en: "neighbor" },
      { de: "das Regal", tr: "raf", en: "shelf" },
      { de: "melden", tr: "haber vermek", en: "to get in touch" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Bir matkaba ihtiyacım var.",
        answer: "Ich brauche eine Bohrmaschine.",
        alternatives: ["Eine Bohrmaschine brauche ich."],
        hint: "„brauchen“ belirtme hâli ister; dişil isimde „eine“ değişmez.",
      },
      {
        kind: "build",
        tr: "Cumartesi günü onu geri getiriyorum.",
        answer: "Am Samstag bringe ich sie zurück.",
        alternatives: ["Ich bringe sie am Samstag zurück."],
        hint: "„zurückbringen“ ayrılır: ön ek sonda kalır, zaman sözcüğü başa gelince fiil yine ikinci sırada durur.",
      },
      {
        kind: "free",
        prompt:
          "Mahalle forumuna kısa bir ilan yaz: kim olduğunu ve nerede oturduğunu söyle, neye ihtiyacın olduğunu ve ne yapacağını yaz, ne zaman geri vereceğini belirt ve nasıl ulaşılacağını söyle.",
        checklist: [
          "Kendini tanıt ve nerede oturduğunu yaz",
          "Neye ihtiyacın olduğunu ve niçin yaz",
          "Ne zaman geri vereceğini söyle",
          "Nasıl ulaşılacağını yaz ve teşekkür et",
        ],
        minWords: 30,
        phrases: [
          { de: "Hallo liebe Nachbarn,", tr: "Merhaba sevgili komşular,", en: "Hello dear neighbors," },
          { de: "Ich wohne in der …", tr: "… sokağında oturuyorum", en: "I live on …" },
          { de: "Hat jemand …?", tr: "Kimsede … var mı?", en: "Does anyone have …?" },
          { de: "Ich brauche sie nur für …", tr: "Ona yalnız … için ihtiyacım var", en: "I only need it for …" },
          { de: "Bitte melden Sie sich bei mir.", tr: "Lütfen bana haber verin.", en: "Please get in touch with me." },
        ],
        sample:
          "Hallo liebe Nachbarn, ich heiße Tarik und wohne seit zwei Monaten in der Lindenstraße 12. " +
          "Hat jemand eine Bohrmaschine? Ich möchte ein Regal in der Küche montieren. " +
          "Ich brauche sie nur für zwei Stunden und bringe sie am Samstag zurück. " +
          "Bitte melden Sie sich bei mir, Wohnung 7, oder schreiben Sie hier. Vielen Dank!",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a1-lib-s8",
    course: "de",
    level: "A1",
    skill: "speaking",
    title: "ä, ö, ü — die Umlaute",
    genre: "pronounce",
    intro: "Noktalı ünlüler harfin kendisini değil sesi değiştirir; altı cümlede üçünü de ayırarak söyle.",
    gloss: [
      { de: "die Tür", tr: "kapı", en: "door" },
      { de: "schön", tr: "güzel", en: "beautiful" },
      { de: "spät", tr: "geç", en: "late" },
      { de: "die Bücher", tr: "kitaplar", en: "books" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Es ist heute sehr spät.",
        tr: "Bugün çok geç oldu.",
        hint: "ä Türkçedeki açık e gibidir: „spät“ = ŞPEET. Uzun yazılır, uzun okunur.",
        confusions: [
          {
            heard: ["Es ist heute sehr spat"],
            fix: "Noktayı yutma: „spat“ başka kelime olur; ayrıca sp başta ŞP okunur.",
            expected: "spät",
          },
        ],
      },
      {
        de: "Die Tür ist schon zu.",
        tr: "Kapı çoktan kapalı.",
        hint: "ü Türkçedeki ü ile aynıdır ama uzun: TÜÜR. Dudaklar yuvarlak, dil önde.",
        confusions: [
          {
            heard: ["Die Tur ist schon zu", "Die Tuer ist schon zu"],
            fix: "ue yazımı yalnız klavyede yoksa kullanılır; ses yine tek uzun ü'dür.",
            expected: "Tür",
          },
        ],
      },
      {
        de: "Der Garten ist sehr schön.",
        tr: "Bahçe çok güzel.",
        hint: "ö de Türkçedeki ö gibidir ama burada uzun: ŞÖÖN. Dudaklar yuvarlak, dil ortada.",
        confusions: [
          {
            heard: ["Der Garten ist sehr schon"],
            fix: "„schon“ (çoktan) ile „schön“ (güzel) iki ayrı kelimedir; nokta anlamı değiştirir.",
            expected: "schön",
          },
        ],
      },
      {
        de: "Meine Bücher sind im Büro.",
        tr: "Kitaplarım ofiste.",
        hint: "İki kelimede de uzun ü var; „Büro“ son hecede vurgulu: bü-ROO.",
        confusions: [
          {
            heard: ["Meine Bucher sind im Buro"],
            fix: "Noktasız u kalın okunur ve iki kelime de tanınmaz hâle gelir.",
            expected: "Bücher",
          },
        ],
      },
      {
        de: "Die Männer öffnen die Türen.",
        tr: "Adamlar kapıları açıyor.",
        hint: "Kısa ä („Männer“) ve kısa ö („öffnen“): çift sessiz ünlüyü kısaltır.",
        confusions: [
          {
            heard: ["Die Manner offnen die Turen"],
            fix: "Üç noktalı ünlünün üçü de burada; hiçbiri kalın okunmaz.",
            expected: "Männer",
          },
        ],
      },
      {
        de: "Können wir später fahren?",
        tr: "Daha sonra gidebilir miyiz?",
        hint: "„können“ kısa ö, „später“ uzun ä ve sondaki -er bir a gibi: ŞPEE-ta.",
        confusions: [
          {
            heard: ["Konnen wir spater fahren"],
            fix: "Sondaki -er'i r diye söyleme; gevşek bir a yeterlidir.",
            expected: "später",
          },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a1-lib-g8",
    course: "de",
    level: "A1",
    skill: "grammar",
    title: "Komm, kommt, kommen Sie",
    genre: "grammar",
    intro: "Almancada rica ve yönerge üç ayrı biçim taşır; kime söylediğin biçimi belirler.",
    focus: "Imperativ: du, ihr ve Sie biçimleri",
    gloss: [
      { de: "warten", tr: "beklemek", en: "to wait" },
      { de: "anrufen", tr: "aramak", en: "to call" },
      { de: "mitbringen", tr: "yanında getirmek", en: "to bring along" },
      { de: "leise", tr: "sessiz", en: "quiet" },
      { de: "die Tür", tr: "kapı", en: "door" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "du biçimi: özne düşer, ek de düşer",
        tr: "„du“ için emir biçimi, fiilin „du“ çekiminden -st ekinin atılmasıyla kurulur ve özne söylenmez. Kök ünlüsü e → i değişen fiillerde bu değişim KALIR, ama a → ä değişimi KALKAR.",
        examples: [
          { de: "Warte bitte hier!", tr: "Lütfen burada bekle!", note: "du wartest → Warte" },
          { de: "Sprich bitte langsam!", tr: "Lütfen yavaş konuş!", note: "e → i kalır" },
          { de: "Fahr nicht so schnell!", tr: "Bu kadar hızlı gitme!", note: "a → ä kalkar" },
        ],
      },
      {
        heading: "ihr ve Sie biçimleri",
        tr: "„ihr“ biçimi normal çekimle aynıdır, yalnız özne düşer. „Sie“ biçiminde ise özne KALIR ve fiilden sonra gelir; yazıda bu kibar emri soru cümlesinden ayıran tek şey sondaki noktalama işaretidir.",
        examples: [
          { de: "Kommt bitte pünktlich!", tr: "Lütfen tam vaktinde gelin!", note: "ihr kommt → Kommt" },
          { de: "Kommen Sie bitte herein!", tr: "Lütfen içeri buyurun!", note: "Sie kalır, arkaya geçer" },
          { de: "Rufen Sie mich morgen an!", tr: "Beni yarın arayın!", note: "ayrılan ön ek yine sonda" },
        ],
      },
      {
        heading: "bitte ve düzensiz iki fiil",
        tr: "„bitte“ ricayı yumuşatır ve genellikle fiilden hemen sonra ya da cümle sonunda durur. „sein“ düzensizdir: sei / seid / seien Sie. „haben“ ise du biçiminde „hab“ olur.",
        examples: [
          { de: "Sei bitte leise!", tr: "Lütfen sessiz ol!", note: "sein → sei" },
          { de: "Seien Sie bitte vorsichtig!", tr: "Lütfen dikkatli olun!", note: "sein → seien Sie" },
          { de: "Hab keine Angst!", tr: "Korkma!", note: "haben → hab" },
        ],
      },
    ],
    questions: [
      {
        text: "___ bitte die Tür zu! (du)",
        options: ["Machst", "Mach", "Machen"],
        answer: 1,
        explain: "du biçiminde -st düşer ve özne söylenmez: Mach … zu!",
      },
      {
        text: "___ Sie bitte einen Moment!",
        options: ["Warte", "Wartet", "Warten"],
        answer: 2,
        explain: "Kibar biçim mastarla aynıdır ve „Sie“ fiilin arkasından gelir.",
      },
      {
        text: "Welche Form ist für „ihr“ richtig?",
        options: ["Kommen Sie!", "Kommt!", "Komm!"],
        answer: 1,
        explain: "„ihr“ biçimi normal çekimle aynıdır, yalnız özne düşer: Kommt!",
      },
      {
        kind: "gapfill",
        text: "___ bitte langsam! (du, sprechen)",
        options: [],
        answer: 0,
        accept: ["Sprich", "sprich"],
        explain: "e → i değişimi emir biçiminde korunur: Sprich!",
      },
      {
        kind: "gapfill",
        text: "___ bitte leise! (du, sein)",
        options: [],
        answer: 0,
        accept: ["Sei", "sei"],
        explain: "„sein“ düzensizdir; du biçimi sei'dir.",
      },
      {
        kind: "gapfill",
        text: "___ Sie mich heute Abend an! (anrufen)",
        options: [],
        answer: 0,
        accept: ["Rufen", "rufen"],
        explain: "Kibar emirde çekimli kök başa, „Sie“ arkasına, ayrılan ön ek „an“ cümle sonuna gider: Rufen Sie mich heute Abend an!",
      },
      {
        kind: "gapfill",
        text: "___ bitte euer Buch mit! (ihr, mitbringen)",
        options: [],
        answer: 0,
        accept: ["Bringt", "bringt"],
        explain: "„ihr“ biçimi bringt; ayrılan ön ek „mit“ sonda kalır.",
      },
      {
        kind: "order",
        text: "Ricayı doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Kommen", "Sie", "bitte", "herein"],
        explain: "Kibar biçimde fiil başta, özne hemen arkasında: Kommen Sie bitte herein!",
      },
      {
        kind: "truefalse",
        text: "„Du fahr nicht so schnell!“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "du biçiminde özne söylenmez; doğrusu „Fahr nicht so schnell!“",
      },
      {
        kind: "truefalse",
        text: "„Seien Sie bitte vorsichtig!“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„sein“ kibar emir biçiminde seien olur ve „Sie“ arkadan gelir.",
      },
    ],
  },
];
