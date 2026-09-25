import type { SkillExercise } from "../../types";

/**
 * DE · A2 — Beceriler kütüphanesi, parti 11.
 *
 * A2 hücresini YİRMİYE tamamlayan on partinin ilki (11–20). Kurallar ve emsal:
 * `de-a2.ts` (parti 1), son partiler `de-a2-p6.ts` … `de-a2-p10.ts` ve
 * `data/content/SPEC.md`.
 *
 * Parti 11 yemek ve mutfak hattı: emekli erkekler için yemek kursu haberi,
 * haftalık pazarda peynir tezgâhı, şirket yemekhanesine öneri e-postası. Söyleyiş
 * odağı ng ile nk; dil bilgisi Dativ isteyen fiiller (schmecken, gefallen,
 * helfen) — edatların Dativ'inden (parti 7) ve iki nesneli fiillerden (parti 8)
 * ayrı bir kapı: burada Dativ'i edat değil fiilin kendisi istiyor.
 */
export const deA2P11: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a2-lib-r11",
    course: "de",
    level: "A2",
    skill: "reading",
    title: "Männer an den Herd",
    genre: "article",
    intro: "Mahalle gazetesinde bir haber: emekli erkekler için açılan yemek kursunda neler oluyor, kim katılıyor, nasıl kayıt olunur.",
    gloss: [
      { de: "der Herd", tr: "ocak", en: "stove" },
      { de: "das Gericht", tr: "yemek", en: "dish" },
      { de: "der Ofen", tr: "fırın", en: "oven" },
      { de: "der Enkel", tr: "torun", en: "grandchild" },
      { de: "der Teilnehmer", tr: "katılımcı", en: "participant" },
      { de: "sich anmelden", tr: "kayıt olmak", en: "to register" },
    ],
    minutes: 5,
    text:
      "Jeden Donnerstag um zehn Uhr riecht es im Familienzentrum Nord nach Suppe und frischem Brot. " +
      "Dann stehen dort zwölf Männer zwischen 62 und 81 Jahren zusammen am Herd.\n\n" +
      "Die Idee hatte Brigitte Hahn. Sie hat dreißig Jahre in einer Krankenhausküche gearbeitet. " +
      "„Viele Männer haben früher nie gekocht, weil ihre Frauen das gemacht haben“, sagt sie. " +
      "„Wenn sie dann allein sind, essen sie oft nur noch Brot und Wurst.“\n\n" +
      "Im Kurs lernen die Männer einfache Gerichte: Suppe, Nudeln, Gemüse aus dem Ofen. " +
      "Am Ende essen alle zusammen an einem langen Tisch. Das gefällt vielen am besten.\n\n" +
      "Werner Kolb, 74, ist seit einem Jahr dabei. „Am Anfang konnte ich nicht einmal ein Ei kochen“, " +
      "erzählt er und lacht. „Letzte Woche habe ich für meine Enkel Pfannkuchen gemacht. " +
      "Sie haben mir gesagt, dass sie besser schmecken als bei Oma.“\n\n" +
      "Der Kurs kostet drei Euro pro Termin. Neue Teilnehmer melden sich bitte im Büro des Familienzentrums an.",
    questions: [
      {
        text: "Warum hatte Brigitte Hahn die Idee für den Kurs?",
        options: [
          "Das Krankenhaus hat sie darum gebeten.",
          "Viele Männer haben nie kochen gelernt.",
          "Sie wollte selbst nicht mehr kochen.",
        ],
        answer: 1,
        explain: "„Viele Männer haben früher nie gekocht, weil ihre Frauen das gemacht haben.“",
      },
      {
        text: "Was gefällt vielen Männern am besten?",
        options: ["die Suppe mit Gemüse", "das frische Brot", "das gemeinsame Essen am Ende"],
        answer: 2,
        explain: "„Am Ende essen alle zusammen an einem langen Tisch. Das gefällt vielen am besten.“",
      },
      {
        kind: "truefalse",
        text: "Werner Kolb konnte schon vor dem Kurs gut kochen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Am Anfang konnte ich nicht einmal ein Ei kochen.“",
      },
      {
        kind: "gapfill",
        text: "Der Kurs ist jeden ___ um zehn Uhr.",
        options: [],
        answer: 0,
        accept: ["Donnerstag"],
        explain: "Haber ilk cümleyle başlıyor: „Jeden Donnerstag um zehn Uhr …“",
      },
      {
        kind: "short_answer",
        text: "Was hat Werner für seine Enkel gemacht?",
        options: [],
        answer: 0,
        accept: ["Pfannkuchen"],
        explain: "„Letzte Woche habe ich für meine Enkel Pfannkuchen gemacht.“",
      },
      {
        text: "Was müssen neue Teilnehmer tun?",
        options: ["sich im Büro anmelden", "drei Euro überweisen", "ein Rezept mitbringen"],
        answer: 0,
        explain: "Son cümle: „Neue Teilnehmer melden sich bitte im Büro … an.“ Ücret her derste ödeniyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a2-lib-l11",
    course: "de",
    level: "A2",
    skill: "listening",
    title: "Am Käsestand",
    genre: "dialogue",
    intro: "Haftalık pazarda bir peynir tezgâhı: Leyla tadına bakıyor, misafirleri için ne kadar alacağını soruyor.",
    gloss: [
      { de: "probieren", tr: "tatmak", en: "to taste" },
      { de: "mild", tr: "yumuşak", en: "mild" },
      { de: "kräftig", tr: "kuvvetli", en: "strong" },
      { de: "das Stück", tr: "parça", en: "piece" },
      { de: "gehören", tr: "ait olmak", en: "to belong" },
      { de: "der Gast", tr: "misafir", en: "guest" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Herr Brandt", text: "Guten Morgen! Möchten Sie mal probieren? Das ist ein junger Käse aus den Bergen." },
      { speaker: "Leyla", text: "Gern. Hm, der schmeckt mir, aber er ist sehr mild. Haben Sie auch etwas Kräftiges?" },
      { speaker: "Herr Brandt", text: "Dann probieren Sie diesen hier. Der ist zwei Jahre alt und hat viel mehr Geschmack." },
      { speaker: "Leyla", text: "Oh ja, der ist gut. Ich brauche ihn für ein Essen am Samstag. Wir sind acht Personen." },
      { speaker: "Herr Brandt", text: "Für acht Gäste nehmen Sie am besten ein halbes Kilo. Soll ich ihn in Scheiben schneiden?" },
      { speaker: "Leyla", text: "Nein, danke, lieber in einem Stück. Was macht das?" },
      { speaker: "Herr Brandt", text: "Zwölf Euro achtzig. Gehört die Tasche hier Ihnen? Die steht schon eine Weile auf dem Tisch." },
      { speaker: "Leyla", text: "Ach ja, danke! Die habe ich fast vergessen." },
      { speaker: "Herr Brandt", text: "Kein Problem. Und wenn der Käse Ihren Gästen gefällt: Wir sind jeden Mittwoch und Samstag hier." },
      { speaker: "Leyla", text: "Am Samstag habe ich keine Zeit, da koche ich ja. Dann komme ich am Mittwoch wieder." },
    ],
    questions: [
      {
        text: "Wie findet Leyla den ersten Käse?",
        options: ["zu alt und zu hart", "gut, aber sehr mild", "lecker, aber zu teuer"],
        answer: 1,
        explain: "„der schmeckt mir, aber er ist sehr mild“ — bu yüzden daha kuvvetlisini istiyor.",
      },
      {
        text: "Wie viel Käse kauft Leyla?",
        options: ["ein Kilo", "zweihundert Gramm", "ein halbes Kilo"],
        answer: 2,
        explain: "Satıcı sekiz kişi için „ein halbes Kilo“ öneriyor, Leyla da onu alıyor.",
      },
      {
        kind: "truefalse",
        text: "Der zweite Käse ist zwei Jahre alt.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Der ist zwei Jahre alt und hat viel mehr Geschmack.“",
      },
      {
        kind: "gapfill",
        text: "Das Essen am Samstag ist für ___ Personen.",
        options: [],
        answer: 0,
        accept: ["acht", "8"],
        explain: "„Wir sind acht Personen.“",
      },
      {
        kind: "short_answer",
        text: "Was hat Leyla fast vergessen?",
        options: [],
        answer: 0,
        accept: ["ihre Tasche", "die Tasche", "Tasche"],
        explain: "Satıcı „Gehört die Tasche hier Ihnen?“ diye soruyor; Leyla „Die habe ich fast vergessen“ diyor.",
      },
      {
        text: "Wann kommt Leyla wieder zum Markt?",
        options: ["am Mittwoch", "am Samstag", "nächsten Montag"],
        answer: 0,
        explain: "Cumartesi yemek yapacağı için „Dann komme ich am Mittwoch wieder.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a2-lib-w11",
    course: "de",
    level: "A2",
    skill: "writing",
    title: "Ein Vorschlag für die Kantine",
    genre: "email",
    intro: "Şirketin yemekhanesi çalışanlardan görüş istiyor: önce iki cümle kur, sonra yemekhane ekibine kısa bir öneri e-postası yaz.",
    gloss: [
      { de: "die Kantine", tr: "yemekhane", en: "canteen" },
      { de: "die Portion", tr: "porsiyon", en: "portion" },
      { de: "die Schicht", tr: "vardiya", en: "shift" },
      { de: "der Vorschlag", tr: "öneri", en: "suggestion" },
      { de: "zurücklegen", tr: "ayırmak", en: "to put aside" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Pazartesi günkü çorba bana çok lezzetli geldi.",
        answer: "Die Suppe am Montag hat mir sehr gut geschmeckt.",
        alternatives: ["Am Montag hat mir die Suppe sehr gut geschmeckt."],
        hint: "„schmecken“ kişiyi Dativ'de ister: mir. Perfekt'te hat … geschmeckt, ortaç en sonda.",
      },
      {
        kind: "build",
        tr: "Öğle saati birçok meslektaşa uymuyor.",
        answer: "Die Mittagszeit passt vielen Kollegen nicht.",
        alternatives: ["Vielen Kollegen passt die Mittagszeit nicht."],
        hint: "„passen“de özne saattir, kişi Dativ'de durur: vielen Kollegen. Fiil özneye göre tekil: passt.",
      },
      {
        kind: "free",
        prompt:
          "Şirketinin yemekhanesi çalışanlardan görüş istiyor. Yemekhane ekibine yaz: yemekte neyi beğendiğini söyle, bir sorunu ve kimi etkilediğini anlat, somut bir öneri getir ve yardım teklif et.",
        checklist: [
          "Yemekhanede neyi beğendiğini yaz",
          "Bir sorunu ve kimi etkilediğini anlat",
          "Somut bir öneri getir",
          "Yardım teklif et ve kibarca bitir",
        ],
        minWords: 55,
        phrases: [
          { de: "Das Essen schmeckt mir meistens gut.", tr: "Yemek bana çoğunlukla lezzetli geliyor.", en: "I usually like the food." },
          { de: "Leider passt … vielen Kollegen nicht.", tr: "Maalesef … birçok meslektaşa uymuyor.", en: "Unfortunately … doesn't suit many colleagues." },
          { de: "Mein Vorschlag ist: …", tr: "Önerim şu: …", en: "My suggestion is: …" },
          { de: "Ich helfe Ihnen gern dabei.", tr: "Bu konuda size seve seve yardım ederim.", en: "I'd be glad to help you with that." },
          { de: "Vielen Dank für Ihre Mühe.", tr: "Emeğiniz için çok teşekkürler.", en: "Thank you very much for your effort." },
        ],
        sample:
          "Liebes Kantinenteam,\n\n" +
          "vielen Dank für Ihre Frage. Das Essen schmeckt mir meistens gut, besonders die Suppen und der frische Salat. " +
          "Leider passt die Mittagszeit von halb zwölf bis halb zwei vielen Kollegen nicht. Wir aus der Spätschicht " +
          "kommen erst um Viertel vor zwei in die Firma, dann ist die Kantine schon zu. Oft essen wir nur ein Brötchen " +
          "aus dem Automaten. Mein Vorschlag ist: Bitte legen Sie für uns jeden Tag zehn oder zwölf warme Portionen zurück. " +
          "Wir bestellen sie gern am Tag vorher, zum Beispiel über eine Liste am Eingang. Ich helfe Ihnen gern dabei " +
          "und spreche mit den Kollegen.\n\n" +
          "Vielen Dank für Ihre Mühe!\n\n" +
          "Viele Grüße\nSelin Yılmaz, Lager",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a2-lib-s11",
    course: "de",
    level: "A2",
    skill: "speaking",
    title: "ng und nk",
    genre: "pronounce",
    intro: "„ng“ tek bir genizden sestir ve arkasından g duyulmaz; „nk“ ise aynı sesin arkasına açık bir k ekler. Altı cümlede ikisini ayır.",
    gloss: [
      { de: "der Enkel", tr: "torun", en: "grandchild" },
      { de: "der Engel", tr: "melek", en: "angel" },
      { de: "singen", tr: "şarkı söylemek", en: "to sing" },
      { de: "schlank", tr: "ince", en: "slim" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "Mein Enkel malt einen Engel.",
        tr: "Torunum bir melek çiziyor.",
        hint: "Enkel: EN-kel, k açıkça duyulur. Engel: EN-el, ng tek ses, arkasında g yok.",
        confusions: [
          {
            heard: ["Mein Engel malt"],
            fix: "Enkel'deki k düşerse „melek“ demiş olursun; n'den sonra dilin arkası kapanır ve k patlar.",
            expected: "Enkel",
          },
        ],
      },
      {
        de: "Die Kinder singen im Garten.",
        tr: "Çocuklar bahçede şarkı söylüyor.",
        hint: "singen: ZİN-en. „ng“ genizden gelir, ardından ayrı bir g ya da k söylenmez.",
        confusions: [
          {
            heard: ["sinken"],
            fix: "g'yi k gibi sertleştirirsen „batıyorlar“ anlamı çıkar; ng'de dilin arkası kapanır ama patlama olmaz.",
            expected: "singen",
          },
        ],
      },
      {
        de: "Vielen Dank, das war ein langer Tag.",
        tr: "Çok teşekkürler, uzun bir gündü.",
        hint: "Dank: sonda k açık. langer: LAN-er, ng tek ses, g duyulmaz.",
        confusions: [
          {
            heard: ["Dang"],
            fix: "Dank'ın sonundaki k'yı yutma; n'den sonra kısa ve sert bir k gelir.",
            expected: "Dank",
          },
        ],
      },
      {
        de: "Die Wohnung liegt an der Ecke.",
        tr: "Daire köşede.",
        hint: "-ung eki genizde biter: WOO-nung. Sona k ya da ayrı bir g ekleme.",
        confusions: [
          {
            heard: ["Wohnunk"],
            fix: "-ung sonundaki g, k gibi söylenmez; ses genizden çıkar ve orada biter.",
            expected: "Wohnung",
          },
        ],
      },
      {
        de: "Wir trinken Tee in der Küche.",
        tr: "Mutfakta çay içiyoruz.",
        hint: "trinken: TRİN-ken. Önce genizden n, hemen ardından açık bir k.",
        confusions: [
          {
            heard: ["tringen"],
            fix: "k yumuşayıp kaybolursa kelime ng'ye döner; k'yı duyulur biçimde patlat.",
            expected: "trinken",
          },
        ],
      },
      {
        de: "Mein Onkel ist jung und schlank.",
        tr: "Amcam genç ve ince.",
        hint: "Onkel ve schlank: nk, k duyulur. jung: ng, sonda hiçbir patlama yok.",
        confusions: [
          {
            heard: ["schlang"],
            fix: "schlank'ın sonundaki k düşerse sıfat tanınmaz; nk'yı sert bir k ile bitir.",
            expected: "schlank",
          },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a2-lib-g11",
    course: "de",
    level: "A2",
    skill: "grammar",
    title: "Das schmeckt mir",
    genre: "grammar",
    intro: "Bazı fiiller nesnesini Akkusativ'de değil Dativ'de ister; edat yoktur, Dativ'i fiilin kendisi getirir.",
    focus: "Dativ isteyen fiiller: helfen, danken, gefallen, schmecken, gehören, passen",
    gloss: [
      { de: "helfen", tr: "yardım etmek", en: "to help" },
      { de: "gefallen", tr: "hoşuna gitmek", en: "to like" },
      { de: "gehören", tr: "ait olmak", en: "to belong" },
      { de: "schmecken", tr: "tadı olmak", en: "to taste" },
      { de: "passen", tr: "uymak", en: "to suit" },
    ],
    minutes: 8,
    explanation: [
      {
        heading: "Kişi Dativ'de",
        tr: "„helfen“, „danken“, „antworten“ gibi fiillerin nesnesi Akkusativ değil Dativ'dir. Türkçede „birine yardım etmek, birine teşekkür etmek“ dediğimiz gibi, kişi „-e“ hâline benzer bir biçim alır. Burada Dativ'i bir edat değil, fiilin kendisi ister.",
        examples: [
          { de: "Kannst du mir helfen?", tr: "Bana yardım edebilir misin?", note: "mich değil, mir" },
          { de: "Ich danke Ihnen für die Einladung.", tr: "Davetiniz için teşekkür ederim.", note: "Sie → Ihnen" },
          { de: "Er antwortet seiner Lehrerin sofort.", tr: "Öğretmenine hemen cevap veriyor.", note: "seine → seiner" },
        ],
      },
      {
        heading: "Özne şey, kişi Dativ",
        tr: "„gefallen“, „schmecken“, „gehören“ ve „passen“ fiillerinde özne kişi değil ŞEYDİR, tıpkı Türkçedeki „bu çorba bana lezzetli geliyor“ gibi. Fiil bu yüzden şeye göre çekilir: şey çoğulsa fiil de çoğul olur. Kişi Dativ'de durur.",
        examples: [
          { de: "Die Suppe schmeckt mir.", tr: "Çorba bana lezzetli geliyor.", note: "özne: die Suppe" },
          { de: "Die Schuhe gefallen meiner Tochter.", tr: "Ayakkabılar kızımın hoşuna gidiyor.", note: "çoğul özne → gefallen" },
          { de: "Gehört das Fahrrad dir?", tr: "Bisiklet senin mi?", note: "du → dir" },
        ],
      },
      {
        heading: "Dativ biçimleri",
        tr: "Artikelde der ve das → dem, die → der, çoğul → den olur ve çoğul ismin sonuna -n eklenir. Zamirler: mir, dir, ihm, ihr, uns, euch, ihnen, Ihnen.",
        examples: [
          { de: "Der Termin passt dem Chef nicht.", tr: "Randevu şefe uymuyor.", note: "der Chef → dem Chef" },
          { de: "Das Spiel gefällt den Kindern.", tr: "Oyun çocukların hoşuna gidiyor.", note: "çoğul: den Kindern" },
          { de: "Wir helfen ihm beim Umzug.", tr: "Taşınmada ona yardım ediyoruz.", note: "er → ihm" },
        ],
      },
    ],
    questions: [
      {
        text: "Kannst du ___ bitte helfen?",
        options: ["mich", "mir", "ich"],
        answer: 1,
        explain: "„helfen“ Dativ ister; ich'in Dativ'i mir'dir.",
      },
      {
        text: "Die Schuhe ___ meiner Tochter sehr.",
        options: ["gefallen", "gefällt", "gefallt"],
        answer: 0,
        explain: "Özne „die Schuhe“ çoğul olduğu için fiil de çoğul: gefallen.",
      },
      {
        text: "Welcher Satz ist richtig?",
        options: ["Das Fahrrad gehört mich.", "Das Fahrrad gehört ich.", "Das Fahrrad gehört mir."],
        answer: 2,
        explain: "„gehören“ kişiyi Dativ'de ister: mir.",
      },
      {
        kind: "gapfill",
        text: "Die Suppe schmeckt ___ nicht. (er)",
        options: [],
        answer: 0,
        accept: ["ihm"],
        explain: "„schmecken“ kişiyi Dativ'de ister; er'in Dativ'i ihm'dir.",
      },
      {
        kind: "gapfill",
        text: "Das Spiel gefällt den ___. (die Kinder)",
        options: [],
        answer: 0,
        accept: ["Kindern"],
        explain: "Çoğul Dativ'de artikel den olur ve isme -n eklenir: den Kindern.",
      },
      {
        kind: "gapfill",
        text: "Ich danke ___ für die Einladung. (Sie)",
        options: [],
        answer: 0,
        accept: ["Ihnen"],
        explain: "„danken“ Dativ ister; resmî Sie'nin Dativ'i Ihnen'dir.",
      },
      {
        kind: "gapfill",
        text: "Passt ___ der Termin am Montag? (du)",
        options: [],
        answer: 0,
        accept: ["dir"],
        explain: "Özne „der Termin“, kişi Dativ'de: du → dir.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Der Kuchen", "schmeckt", "meiner Oma", "sehr gut"],
        explain: "Özne „der Kuchen“ başta, fiil ikinci sırada, kişi Dativ'de: meiner Oma.",
      },
      {
        kind: "truefalse",
        text: "„Ich helfe dich beim Umzug.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„helfen“ Akkusativ değil Dativ ister; doğrusu „Ich helfe dir beim Umzug.“",
      },
      {
        kind: "truefalse",
        text: "„Die Jacke gefällt ihr gut.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Özne „die Jacke“ tekil, kişi Dativ'de: ihr. Cümle doğru.",
      },
    ],
  },
];
