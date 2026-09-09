import type { SkillExercise } from "../../types";

/**
 * DE · A1 — Beceriler kütüphanesi, parti 4.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 4. seti taşır (kimlik sonu 4).
 * Kurallar ve emsal: `de-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Türler yine yeni: kısa haber, hava durumu ve internet yorumu. Söyleyiş
 * odağı st/sp; dil bilgisi modal fiiller ve cümlenin iki ucu.
 */
export const deA1P4: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a1-lib-r4",
    course: "de",
    level: "A1",
    skill: "reading",
    title: "Neue Adresse für die Stadtbibliothek",
    genre: "Haber",
    intro: "Kütüphanenin taşındığını duyuran kısa bir haber okuyacaksın: yeni adres, kapalı günler ve açılış günü.",
    gloss: [
      { de: "umziehen", tr: "taşınmak", en: "to move house" },
      { de: "hell", tr: "aydınlık", en: "bright" },
      { de: "der Platz", tr: "yer", en: "seat" },
      { de: "der Kasten", tr: "kutu", en: "box" },
      { de: "werfen", tr: "atmak", en: "to throw" },
      { de: "einladen", tr: "davet etmek", en: "to invite" },
    ],
    minutes: 4,
    text:
      "NEUE ADRESSE FÜR DIE STADTBIBLIOTHEK\n\n" +
      "Die Stadtbibliothek zieht um. Ab dem ersten September findet ihr uns in der Bahnhofstraße 3, " +
      "direkt neben der Post.\n\n" +
      "Das neue Haus ist größer und heller. Es gibt einen Raum nur für Kinder und zwanzig Plätze zum Lernen.\n\n" +
      "Vom zwanzigsten bis zum einunddreißigsten August ist die Bibliothek geschlossen. Bücher könnt ihr in " +
      "dieser Zeit in den blauen Kasten vor der Tür werfen.\n\n" +
      "Am ersten September feiern wir von zehn bis sechzehn Uhr. Es gibt Kaffee, Kuchen und Musik. " +
      "Alle sind herzlich eingeladen.",
    questions: [
      {
        text: "Was passiert mit der Stadtbibliothek?",
        options: ["Sie bekommt ein neues Haus.", "Sie sucht neue Mitarbeiter.", "Sie macht für immer zu."],
        answer: 0,
        explain: "„Die Stadtbibliothek zieht um“ ve yeni adres veriliyor — kapanış değil, taşınma haberi.",
      },
      {
        text: "Wo ist die neue Bibliothek?",
        options: [
          "in der Bahnhofstraße, neben der Post",
          "am Bahnhof, neben dem Kino",
          "in der Poststraße, neben dem Park",
        ],
        answer: 0,
        explain: "„… in der Bahnhofstraße 3, direkt neben der Post.“",
      },
      {
        kind: "truefalse",
        text: "Auch während der Schließzeit kann man Bücher zurückgeben.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Bücher könnt ihr in dieser Zeit in den blauen Kasten vor der Tür werfen.“",
      },
      {
        kind: "gapfill",
        text: "Das neue Haus hat einen Raum nur für ___.",
        options: [],
        answer: 0,
        accept: ["Kinder"],
        explain: "„Es gibt einen Raum nur für Kinder …“",
      },
      {
        kind: "short_answer",
        text: "Wann feiert die Bibliothek?",
        options: [],
        answer: 0,
        accept: ["am ersten September", "am 1. September"],
        explain: "„Am ersten September feiern wir von zehn bis sechzehn Uhr.“",
      },
      {
        text: "Was gibt es auf dem Fest?",
        options: ["Kaffee, Kuchen und Musik", "Bücher für einen Euro", "einen Kurs für Kinder"],
        answer: 0,
        explain: "„Es gibt Kaffee, Kuchen und Musik.“ Çocuk odası binada var ama kurs geçmiyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a1-lib-l4",
    course: "de",
    level: "A1",
    skill: "listening",
    title: "Das Wetter am Mittwoch",
    genre: "Hava durumu",
    intro: "Radyoda yarının hava durumunu dinleyeceksin: sabah, öğlen, akşam nasıl olacak ve neye dikkat etmek gerekiyor.",
    gloss: [
      { de: "der Nebel", tr: "sis", en: "fog" },
      { de: "der Grad", tr: "derece", en: "degree" },
      { de: "der Schirm", tr: "şemsiye", en: "umbrella" },
      { de: "der Wind", tr: "rüzgâr", en: "wind" },
      { de: "trocken", tr: "kuru", en: "dry" },
      { de: "vorsichtig", tr: "dikkatli", en: "careful" },
    ],
    minutes: 4,
    segments: [
      { text: "Guten Abend! Hier ist das Wetter für morgen, Mittwoch." },
      { text: "Am Morgen ist es kalt, nur sechs Grad, und im Norden gibt es Nebel." },
      { text: "Am Mittag kommt die Sonne. Im Süden wird es warm, bis zu zweiundzwanzig Grad." },
      { text: "Am Nachmittag regnet es im Westen. Nehmt bitte einen Schirm mit!" },
      { text: "Am Abend wird der Wind stark. Fahrt vorsichtig mit dem Fahrrad." },
      { text: "Am Donnerstag bleibt es trocken und sonnig. Ein schönes Wochenende steht vor der Tür!" },
    ],
    questions: [
      {
        text: "Für welchen Tag ist das Wetter?",
        options: ["für Mittwoch", "für Donnerstag", "für das Wochenende"],
        answer: 0,
        explain: "„Hier ist das Wetter für morgen, Mittwoch.“ Perşembe yalnız sonda kısaca geçiyor.",
      },
      {
        text: "Wie ist das Wetter am Morgen?",
        options: ["kalt, mit Nebel im Norden", "warm und sonnig im Süden", "windig mit Regen im Westen"],
        answer: 0,
        explain: "„Am Morgen ist es kalt, nur sechs Grad, und im Norden gibt es Nebel.“",
      },
      {
        kind: "truefalse",
        text: "Am Nachmittag regnet es im Osten.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Am Nachmittag regnet es im Westen.“ — doğuda değil, batıda.",
      },
      {
        kind: "short_answer",
        text: "Wie warm wird es im Süden?",
        options: [],
        answer: 0,
        accept: ["zweiundzwanzig Grad", "22 Grad", "zweiundzwanzig", "bis zu zweiundzwanzig Grad"],
        explain: "„Im Süden wird es warm, bis zu zweiundzwanzig Grad.“",
      },
      {
        kind: "dictation",
        text: "Yağmurla ilgili ricayı duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Nehmt bitte einen Schirm mit!", "Nehmt bitte einen Schirm mit"],
        explain: "„Nehmt bitte einen Schirm mit!“ — ayrılabilen fiilde „mit“ sona gider.",
      },
      {
        text: "Wie wird das Wetter am Donnerstag?",
        options: ["trocken und sonnig", "kalt und windig", "nass und kühl"],
        answer: 0,
        explain: "„Am Donnerstag bleibt es trocken und sonnig.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a1-lib-w4",
    course: "de",
    level: "A1",
    skill: "writing",
    title: "Meine Bewertung im Netz",
    genre: "Yorum",
    intro: "Bir dükkâna internette puan vereceksin; önce iki cümle kur, sonra kısa bir yorum yaz.",
    gloss: [
      { de: "freundlich", tr: "güler yüzlü", en: "friendly" },
      { de: "frisch", tr: "taze", en: "fresh" },
      { de: "empfehlen", tr: "tavsiye etmek", en: "to recommend" },
      { de: "der Stern", tr: "yıldız", en: "star" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Ekmek her zaman taze ve çok lezzetli.",
        answer: "Das Brot ist immer frisch und sehr lecker.",
        alternatives: ["Das Brot ist immer sehr lecker und frisch."],
        hint: "„immer“ gibi sıklık sözcükleri fiilden hemen sonra gelir; yüklemdeki sıfatlar çekimsiz kalır.",
      },
      {
        kind: "build",
        tr: "Bu fırını herkese tavsiye edebilirim.",
        answer: "Ich kann diese Bäckerei allen empfehlen.",
        alternatives: ["Diese Bäckerei kann ich allen empfehlen."],
        hint: "Modal fiil ikinci sırada, asıl fiil (empfehlen) yalın hâlde cümlenin sonunda kalır.",
      },
      {
        kind: "free",
        prompt:
          "İyi tanıdığın bir dükkânı ya da kafeyi internette değerlendir: nerede, ne satıyor, ne beğendin, daha iyi olabilecek bir şey ve kaç yıldız veriyorsun.",
        checklist: [
          "Dükkânın adını ve yerini yaz",
          "Beğendiğin bir iki şeyi anlat",
          "Daha iyi olabilecek bir şeyi söyle",
          "Kaç yıldız verdiğini yaz",
        ],
        minWords: 25,
        phrases: [
          { de: "Der Laden liegt …", tr: "Dükkân … konumunda" },
          { de: "Mir gefällt besonders …", tr: "Özellikle … hoşuma gidiyor" },
          { de: "Nur … ist nicht so gut.", tr: "Yalnız … pek iyi değil." },
          { de: "Ich kann … empfehlen.", tr: "… tavsiye edebilirim." },
          { de: "Ich gebe … von fünf Sternen.", tr: "Beş yıldız üzerinden … veriyorum." },
        ],
        sample:
          "Die Bäckerei Sonne liegt am Marktplatz, direkt neben der Apotheke. Das Brot ist immer frisch und die " +
          "Verkäuferinnen sind sehr freundlich. Am Samstag gibt es warmen Kuchen. Nur am Morgen muss man oft lange warten. " +
          "Der Laden ist einfach zu klein. Ich kann diese Bäckerei allen empfehlen und gebe vier von fünf Sternen.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a1-lib-s4",
    course: "de",
    level: "A1",
    skill: "speaking",
    title: "st und sp am Wortanfang",
    genre: "Ses çalışması",
    intro: "Kelimenin başındaki „st“ ve „sp“ Almancada şt ve şp okunur, ortada ya da sonda ise normal st kalır.",
    gloss: [
      { de: "still", tr: "sessiz", en: "quiet" },
      { de: "studieren", tr: "üniversitede okumak", en: "to study" },
      { de: "die Haltestelle", tr: "durak", en: "bus stop" },
      { de: "verstehen", tr: "anlamak", en: "to understand" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Die Straße ist heute sehr still.",
        tr: "Cadde bugün çok sessiz.",
        hint: "„Straße“ = ŞTRAA-se, „still“ = ŞTİL. Kelime başındaki st hep şt.",
        confusions: [
          { heard: ["Strasse mit s", "s-till", "die Stelle"], fix: "Baştaki st'yi s ile söyleme: ştraase, ştil.", expected: "Straße" },
        ],
      },
      {
        de: "Wir spielen gern am Sportplatz.",
        tr: "Spor sahasında oynamayı seviyoruz.",
        hint: "„spielen“ = ŞPİİ-len, „Sportplatz“ = ŞPORT-plats. Baştaki sp hep şp.",
        confusions: [
          { heard: ["s-pielen", "Sportplatz mit s"], fix: "Kelime başındaki sp şp okunur: şpiilen, şportplats.", expected: "spielen" },
        ],
      },
      {
        de: "Mein Bruder studiert in Stuttgart.",
        tr: "Erkek kardeşim Stuttgart'ta okuyor.",
        hint: "İki kez şt: ştu-DİİRT ve ŞTUT-gart.",
        confusions: [
          { heard: ["studiert mit s", "Sttutgart", "Stutgart mit s"], fix: "Hem fiilde hem şehir adında baştaki st şt: ştudiirt, ştutgart.", expected: "studiert" },
        ],
      },
      {
        de: "Ich verstehe die Frage nicht.",
        tr: "Soruyu anlamıyorum.",
        hint: "Ön ek sayılmaz: „ver-stehe“ kökün başında st var, yani fer-ŞTEE-e.",
        confusions: [
          { heard: ["verstehe mit s", "fersteehe"], fix: "Ön ekten sonra kök „stehen“ ile başlıyor, o yüzden yine şt: ferşteee.", expected: "verstehe" },
        ],
      },
      {
        de: "Der Bus hält an der Haltestelle.",
        tr: "Otobüs durakta duruyor.",
        hint: "Birleşik kelimede ikinci parça yeni bir kelime gibi: Halte-ŞTE-le.",
        confusions: [
          { heard: ["Haltestelle mit s", "Halte-selle"], fix: "„Stelle“ birleşiğin içinde yeni kelime başlangıcı, yani şt: halte-ştele.", expected: "Haltestelle" },
        ],
      },
      {
        de: "Das Fenster im Zimmer ist kaputt.",
        tr: "Odadaki pencere bozuk.",
        hint: "Burada st kelimenin ORTASINDA: FENS-ter, şt değil.",
        confusions: [
          { heard: ["Fenschter", "Fenşter"], fix: "Ortadaki st şt olmaz; normal s + t: fenster.", expected: "Fenster" },
        ],
      },
      {
        de: "Bist du schon zu Hause?",
        tr: "Şimdiden evde misin?",
        hint: "Burada st kelimenin SONUNDA: BİST, yine şt değil.",
        confusions: [
          { heard: ["Bischt du", "Bişt du"], fix: "Kelime sonundaki st normal kalır: bist.", expected: "Bist" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a1-lib-g4",
    course: "de",
    level: "A1",
    skill: "grammar",
    title: "kann, muss, möchte",
    genre: "Kural",
    intro: "Modal fiillerle kurulan cümlede iki fiil vardır: biri ikinci sırada çekimli, öteki cümlenin sonunda yalın.",
    focus: "Modalverben: können, müssen, möchten",
    gloss: [
      { de: "unterschreiben", tr: "imzalamak", en: "to sign" },
      { de: "einkaufen", tr: "alışveriş yapmak", en: "to shop" },
      { de: "aufstehen", tr: "kalkmak", en: "to get up" },
      { de: "das Formular", tr: "form", en: "form" },
    ],
    minutes: 6,
    explanation: [
      {
        heading: "Cümlenin iki ucu",
        tr: "Türkçede yetenek ve zorunluluk fiilin içine ek olarak girer: gel-ebil-irim, git-meli-yim. Almancada iki ayrı kelime olur ve cümlenin iki ucuna yerleşir: modal fiil ikinci sırada çekilir, asıl fiil en sonda yalın kalır.",
        examples: [
          { de: "Ich kann gut schwimmen.", tr: "İyi yüzebilirim.", note: "kann ikinci, schwimmen sonda" },
          { de: "Wir müssen heute einkaufen.", tr: "Bugün alışveriş yapmalıyız." },
          { de: "Sie möchte einen Tee trinken.", tr: "Bir çay içmek istiyor." },
        ],
      },
      {
        heading: "Çekimde iki sürpriz",
        tr: "Tekil biçimlerde kökün ünlüsü değişir ve üçüncü tekil -t EKİ ALMAZ: ich kann, du kannst, er kann. Aynısı müssen için de geçerli: ich muss, du musst, er muss. „möchten“ ise düzenli gibi çekilir: ich möchte, du möchtest, er möchte.",
        examples: [
          { de: "Ich kann, du kannst, er kann", tr: "yapabilirim, yapabilirsin, yapabilir", note: "er biçiminde -t yok" },
          { de: "Ich muss, du musst, er muss", tr: "zorundayım, zorundasın, zorunda" },
          { de: "Ich möchte, du möchtest, er möchte", tr: "isterim, istersin, ister" },
        ],
      },
      {
        heading: "Anlamlar karışmasın",
        tr: "„können“ yetenek ve imkân, „müssen“ zorunluluk, „möchten“ nazik istek anlatır. Bir şey satın almak istediğini söylerken „ich will“ yerine „ich möchte“ demek çok daha kibardır.",
        examples: [
          { de: "Kannst du mir helfen?", tr: "Bana yardım edebilir misin?", note: "rica" },
          { de: "Du musst das Formular unterschreiben.", tr: "Formu imzalaman gerekiyor." },
          { de: "Ich möchte ein Brot, bitte.", tr: "Bir ekmek istiyorum, lütfen." },
        ],
      },
    ],
    questions: [
      {
        text: "Ich ___ heute leider nicht kommen.",
        options: ["kann", "kannst", "könnt"],
        answer: 0,
        explain: "„ich“ biçiminde modal fiil ek almaz: ich kann.",
      },
      {
        text: "Du ___ das Formular unterschreiben.",
        options: ["musst", "muss", "müsst"],
        answer: 0,
        explain: "„du“ biçiminde -st eki gelir: du musst.",
      },
      {
        text: "Wir ___ bitte zwei Kaffee.",
        options: ["möchten", "möchtet", "möchte"],
        answer: 0,
        explain: "„wir“ biçiminde ek -en'dir: wir möchten.",
      },
      {
        text: "___ du mir bitte helfen?",
        options: ["Kannst", "Kann", "Könnt"],
        answer: 0,
        explain: "Soruda da çekim değişmez, yalnız yer değişir: Kannst du …?",
      },
      {
        kind: "gapfill",
        text: "Er ___ (können) sehr gut kochen.",
        options: [],
        answer: 0,
        accept: ["kann"],
        explain: "Üçüncü tekilde modal fiil -t almaz: er kann.",
      },
      {
        kind: "gapfill",
        text: "___ (müssen) ihr morgen arbeiten?",
        options: [],
        answer: 0,
        accept: ["Müsst", "müsst"],
        explain: "„ihr“ biçiminde kökün ünlüsü değişir ve -t gelir: ihr müsst.",
      },
      {
        kind: "gapfill",
        text: "Ich ___ (möchten) ein Zimmer mit Bad.",
        options: [],
        answer: 0,
        accept: ["möchte"],
        explain: "„möchten“ ich biçiminde -e alır: ich möchte.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Wir", "müssen", "heute", "einkaufen"],
        explain: "Modal fiil ikinci sırada, asıl fiil en sonda: Wir müssen heute einkaufen.",
      },
      {
        kind: "truefalse",
        text: "„Er kann gut schwimmt.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Sondaki fiil çekilmez; doğrusu „Er kann gut schwimmen.“",
      },
      {
        kind: "truefalse",
        text: "„Ich muss um sieben aufstehen.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Modal ikinci sırada, ayrılabilen fiil sonda ve bitişik kalır: cümle doğru.",
      },
    ],
  },
];
