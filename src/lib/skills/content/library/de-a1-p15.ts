import type { SkillExercise } from "../../types";

/**
 * DE · A1 — Beceriler kütüphanesi, parti 15.
 *
 * Kurallar ve emsal: `de-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Hücreyi YİRMİYE tamamlayan partilerden biri. Hayvanlar hattı: hayvan
 * parkının bilgi tabelası, veterinerde hasta bir köpek, ev sahibinden köpek
 * için izin isteyen e-posta. Söyleyiş odağı Fransızcadan gelen kelimeler;
 * dil bilgisi birleşik isimler — artikeli son kelime belirler.
 */
export const deA1P15: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a1-lib-r15",
    course: "de",
    level: "A1",
    skill: "reading",
    title: "Tierpark Sonnenberg",
    genre: "info",
    intro: "Hayvan parkının girişinde bir bilgi tabelası var: ne zaman açık, giriş ne kadar, hayvanlarla ilgili hangi kurallar geçerli.",
    gloss: [
      { de: "der Tierpark", tr: "hayvan parkı", en: "animal park" },
      { de: "der Eintritt", tr: "giriş ücreti", en: "admission" },
      { de: "der Erwachsene", tr: "yetişkin", en: "adult" },
      { de: "das Tier", tr: "hayvan", en: "animal" },
      { de: "zusehen", tr: "seyretmek", en: "to watch" },
      { de: "der Spielplatz", tr: "oyun parkı", en: "playground" },
    ],
    minutes: 4,
    text:
      "TIERPARK SONNENBERG — INFORMATIONEN\n\n" +
      "Im Sommer ist der Tierpark jeden Tag von neun bis neunzehn Uhr offen, im Winter von zehn bis sechzehn Uhr.\n\n" +
      "Eintritt: Erwachsene zahlen acht Euro, Kinder ab drei Jahren vier Euro. Kinder unter drei Jahren sind frei.\n\n" +
      "Um elf Uhr bekommen die Affen ihr Essen, um vierzehn Uhr die Pinguine. Kinder dürfen dann zusehen und Fragen stellen.\n\n" +
      "Bitte geben Sie den Tieren kein Brot und keine Schokolade! Davon werden die Tiere krank.\n\n" +
      "Hunde dürfen leider nicht in den Tierpark.\n\n" +
      "Neben dem Eingang gibt es einen Spielplatz und ein kleines Café. Das Café schließt eine Stunde vor dem Tierpark.",
    questions: [
      {
        text: "Wann ist der Tierpark im Winter offen?",
        options: ["von zehn bis sechzehn Uhr", "von neun bis neunzehn Uhr", "nur am Wochenende"],
        answer: 0,
        explain: "„im Winter von zehn bis sechzehn Uhr“; dokuzdan on dokuza kadar yaz saatleri.",
      },
      {
        text: "Was kostet der Eintritt für ein Kind mit fünf Jahren?",
        options: ["nichts", "acht Euro", "vier Euro"],
        answer: 2,
        explain: "„Kinder ab drei Jahren vier Euro“; üç yaşından küçükler ücretsiz.",
      },
      {
        kind: "truefalse",
        text: "Man darf mit dem Hund in den Tierpark.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Hunde dürfen leider nicht in den Tierpark.“",
      },
      {
        kind: "gapfill",
        text: "Die Affen bekommen um ___ Uhr ihr Essen.",
        options: [],
        answer: 0,
        accept: ["elf", "11"],
        explain: "„Um elf Uhr bekommen die Affen ihr Essen“; penguenler saat on dörtte.",
      },
      {
        kind: "short_answer",
        text: "Was gibt es neben dem Eingang?",
        options: [],
        answer: 0,
        accept: ["einen Spielplatz und ein Café", "einen Spielplatz und ein kleines Café", "einen Spielplatz"],
        explain: "„Neben dem Eingang gibt es einen Spielplatz und ein kleines Café.“",
      },
      {
        text: "Warum soll man den Tieren kein Brot geben?",
        options: ["Das Brot ist zu teuer.", "Die Tiere werden davon krank.", "Die Tiere essen nur Obst."],
        answer: 1,
        explain: "„Davon werden die Tiere krank“ — ekmek ve çikolata hayvanlara zarar veriyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a1-lib-l15",
    course: "de",
    level: "A1",
    skill: "listening",
    title: "Beim Tierarzt",
    genre: "dialogue",
    intro: "Bir adam köpeğini veterinere getiriyor: köpeğin nesi var, hangi ilaç verilecek, ne zaman yeniden gelecekler.",
    gloss: [
      { de: "schlimm", tr: "fena", en: "bad" },
      { de: "fressen", tr: "yemek", en: "to eat" },
      { de: "der Bauch", tr: "karın", en: "belly" },
      { de: "die Tablette", tr: "hap", en: "tablet" },
      { de: "das Futter", tr: "mama", en: "pet food" },
      { de: "zweimal", tr: "iki kez", en: "twice" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Frau Doktor Kraus", text: "Guten Tag, Herr Schulz. Was ist denn mit Ihrem Hund los?" },
      { speaker: "Herr Schulz", text: "Guten Tag. Das ist Lucky, er ist sechs Jahre alt. Seit zwei Tagen frisst er nicht und er schläft sehr viel." },
      { speaker: "Frau Doktor Kraus", text: "Hm. Trinkt er Wasser?" },
      { speaker: "Herr Schulz", text: "Ja, Wasser trinkt er. Aber am Sonntag hat er im Park etwas gefressen, vielleicht etwas Altes." },
      { speaker: "Frau Doktor Kraus", text: "Das ist oft das Problem. Der Bauch ist ein bisschen dick, aber das ist nicht schlimm. Ich gebe Ihnen Tabletten." },
      { speaker: "Herr Schulz", text: "Wie oft bekommt er die Tabletten?" },
      { speaker: "Frau Doktor Kraus", text: "Zweimal am Tag, morgens und abends, mit ein bisschen Futter. Und bitte zwei Tage kein Fleisch, nur Reis und Kartoffeln." },
      { speaker: "Herr Schulz", text: "Gut. Muss ich noch einmal kommen?" },
      { speaker: "Frau Doktor Kraus", text: "Ja, am Freitag um zehn. Frisst er morgen immer noch nicht? Dann rufen Sie bitte an." },
    ],
    questions: [
      {
        text: "Was ist das Problem mit Lucky?",
        options: ["Er trinkt kein Wasser.", "Er frisst nicht und schläft viel.", "Er hat Probleme mit dem Bein."],
        answer: 1,
        explain: "„Seit zwei Tagen frisst er nicht und er schläft sehr viel“; su içiyor.",
      },
      {
        text: "Wie oft bekommt Lucky die Tabletten?",
        options: ["zweimal am Tag", "einmal am Tag", "dreimal am Tag"],
        answer: 0,
        explain: "„Zweimal am Tag, morgens und abends, mit ein bisschen Futter.“",
      },
      {
        kind: "truefalse",
        text: "Lucky soll zwei Tage kein Fleisch fressen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„bitte zwei Tage kein Fleisch, nur Reis und Kartoffeln“.",
      },
      {
        kind: "gapfill",
        text: "Lucky ist ___ Jahre alt.",
        options: [],
        answer: 0,
        accept: ["sechs", "6"],
        explain: "„Das ist Lucky, er ist sechs Jahre alt.“",
      },
      {
        kind: "short_answer",
        text: "Wann soll Herr Schulz wiederkommen?",
        options: [],
        answer: 0,
        accept: ["am Freitag um zehn", "am Freitag", "Freitag um zehn Uhr"],
        explain: "„Ja, am Freitag um zehn.“",
      },
      {
        text: "Wo hat Lucky am Sonntag etwas gefressen?",
        options: ["in der Küche", "vor der Praxis", "im Park"],
        answer: 2,
        explain: "„am Sonntag hat er im Park etwas gefressen, vielleicht etwas Altes“.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a1-lib-w15",
    course: "de",
    level: "A1",
    skill: "writing",
    title: "Dürfen wir einen Hund haben?",
    genre: "email",
    intro: "Barınaktan bir köpek almak istiyorsunuz ve ev sahibinden izin istiyorsun: önce iki cümle kur, sonra kısa bir e-posta yaz.",
    gloss: [
      { de: "der Vermieter", tr: "ev sahibi", en: "landlord" },
      { de: "das Tierheim", tr: "hayvan barınağı", en: "animal shelter" },
      { de: "ruhig", tr: "sakin", en: "quiet" },
      { de: "bellen", tr: "havlamak", en: "to bark" },
      { de: "erlauben", tr: "izin vermek", en: "to allow" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Barınaktan küçük bir köpek almak istiyoruz.",
        answer: "Wir möchten einen kleinen Hund aus dem Tierheim nehmen.",
        alternatives: ["Aus dem Tierheim möchten wir einen kleinen Hund nehmen."],
        hint: "„möchten“ ikinci sırada, „nehmen“ sonda; eril isim nesne olunca „einen kleinen Hund“ olur.",
      },
      {
        kind: "build",
        tr: "Köpek sakin ve çok havlamıyor.",
        answer: "Der Hund ist ruhig und bellt nicht viel.",
        alternatives: ["Der Hund bellt nicht viel und ist ruhig."],
        hint: "İki ana cümle „und“ ile bağlanır; özne aynı olduğu için tekrar edilmez.",
      },
      {
        kind: "free",
        prompt:
          "Ev sahibine kısa bir e-posta yaz: kim olduğunu ve hangi dairede oturduğunu söyle, nasıl bir köpek almak istediğinizi anlat, neden sorun olmayacağını yaz ve kibarca izin iste.",
        checklist: [
          "Kibarca hitap et, adını ve daireni yaz",
          "Köpeği anlat: adı, yaşı, nasıl bir köpek",
          "Neden sorun olmayacağını açıkla",
          "İzin iste ve kibarca bitir",
        ],
        minWords: 35,
        phrases: [
          { de: "Sehr geehrter Herr …,", tr: "Sayın … Bey,", en: "Dear Mr …," },
          { de: "Ich wohne in der Wohnung …", tr: "… numaralı dairede oturuyorum.", en: "I live in flat …" },
          { de: "Wir möchten gern einen Hund haben.", tr: "Bir köpeğimiz olsun istiyoruz.", en: "We would like to have a dog." },
          { de: "Er ist klein und ruhig.", tr: "Küçük ve sakin.", en: "He is small and quiet." },
          { de: "Dürfen wir einen Hund haben?", tr: "Köpek besleyebilir miyiz?", en: "May we have a dog?" },
        ],
        sample:
          "Sehr geehrter Herr Schmitt, ich heiße Merve Kaya und wohne mit meinem Mann in der Wohnung 5 im zweiten Stock. " +
          "Wir möchten gern einen kleinen Hund aus dem Tierheim nehmen. Er heißt Pepe, ist vier Jahre alt und sehr ruhig. " +
          "Wir arbeiten beide nur am Vormittag und haben viel Zeit für ihn. " +
          "Dürfen wir einen Hund in der Wohnung haben? Mit freundlichen Grüßen, Merve Kaya",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a1-lib-s15",
    course: "de",
    level: "A1",
    skill: "speaking",
    title: "Restaurant, Garage, Friseur",
    genre: "pronounce",
    intro: "Fransızcadan gelen kelimeler Almancada da Fransızca gibi okunur: sondaki n genizde kalır, g ve j yumuşar, eu ö olur. Altı cümlede bu kelimeleri çalış.",
    gloss: [
      { de: "das Restaurant", tr: "restoran", en: "restaurant" },
      { de: "die Garage", tr: "garaj", en: "garage" },
      { de: "der Friseur", tr: "kuaför", en: "hairdresser" },
      { de: "die Orange", tr: "portakal", en: "orange" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Wir essen heute im Restaurant.",
        tr: "Bugün restoranda yemek yiyoruz.",
        hint: "„Restaurant“ = res-to-RAAN: au o okunur, sondaki nt duyulmaz ve ses genizde kalır.",
        confusions: [
          {
            heard: [],
            fix: "Sondaki t'yi söyleme ve au'yu a-u diye ayırma: res-to-RAAN.",
            expected: "Restaurant",
          },
        ],
      },
      {
        de: "Das Auto steht in der Garage.",
        tr: "Araba garajda duruyor.",
        hint: "„Garage“ = ga-RAA-je: ikinci g Türkçedeki j gibi yumuşak.",
        confusions: [
          {
            heard: [],
            fix: "Sondaki g'yi sert g okuma; Türkçedeki „garaj“ın j'si gibi.",
            expected: "Garage",
          },
        ],
      },
      {
        de: "Ich trinke jeden Morgen Orangensaft.",
        tr: "Her sabah portakal suyu içerim.",
        hint: "„Orange“ = o-RAN-je: g burada da j gibi yumuşak.",
        confusions: [
          {
            heard: [],
            fix: "„Orangen“ içindeki g'yi sert okursan kelime tanınmaz; yumuşak j kullan.",
            expected: "Orangensaft",
          },
        ],
      },
      {
        de: "Mein Friseur hat am Montag zu.",
        tr: "Kuaförüm pazartesi kapalı.",
        hint: "„Friseur“ = fri-ZÖÖR: eu burada oy değil, uzun ö.",
        confusions: [
          {
            heard: [],
            fix: "Almanca kelimelerdeki eu = oy kuralı bu kelimede geçmez; ö söyle.",
            expected: "Friseur",
          },
        ],
      },
      {
        de: "Meine Cousine wohnt in Paris.",
        tr: "Kuzenim Paris'te oturuyor.",
        hint: "„Cousine“ = ku-Zİİ-ne: ou u okunur, c k okunur.",
        confusions: [
          {
            heard: [],
            fix: "o ile u'yu ayrı okuma; tek bir u sesi.",
            expected: "Cousine",
          },
        ],
      },
      {
        de: "Der Chef trinkt Kaffee im Büro.",
        tr: "Şef ofiste kahve içiyor.",
        hint: "„Chef“ = ŞEF: Fransızca ch Türkçedeki ş gibi; „Büro“ bü-ROO, vurgu sonda.",
        confusions: [
          {
            heard: [],
            fix: "„Chef“i ç ya da k ile okuma; baştaki ses ş.",
            expected: "Chef",
          },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a1-lib-g15",
    course: "de",
    level: "A1",
    skill: "grammar",
    title: "die Haustür, der Zimmerschlüssel",
    genre: "grammar",
    intro: "Almanca kelimeleri uç uca ekleyerek yeni kelimeler kurar; artikeli ve asıl anlamı hangi parçanın taşıdığını öğren.",
    focus: "Birleşik isimler (Komposita): artikeli ve anlamı son kelime belirler",
    gloss: [
      { de: "die Tür", tr: "kapı", en: "door" },
      { de: "der Schlüssel", tr: "anahtar", en: "key" },
      { de: "der Geburtstag", tr: "doğum günü", en: "birthday" },
      { de: "die Schokolade", tr: "çikolata", en: "chocolate" },
      { de: "der Bahnhof", tr: "tren istasyonu", en: "train station" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "Asıl kelime sonda",
        tr: "Birleşik isimde asıl kelime SONDADIR; baştaki kelime onun ne tür olduğunu söyler. Türkçedeki „kapı zili“ gibi: asıl şey zil, „kapı“ hangi zil olduğunu anlatır. Artikel de her zaman son kelimeden gelir.",
        examples: [
          { de: "das Haus + die Tür → die Haustür", tr: "sokak kapısı", note: "die Tür → die" },
          { de: "das Zimmer + der Schlüssel → der Zimmerschlüssel", tr: "oda anahtarı", note: "der Schlüssel → der" },
          { de: "die Kinder + das Zimmer → das Kinderzimmer", tr: "çocuk odası", note: "das Zimmer → das" },
        ],
      },
      {
        heading: "Sıra anlamı değiştirir",
        tr: "Parçaların yeri değişirse kelime başka bir şey olur. Baştaki parça „nasıl bir?“ sorusuna cevap verir, sondaki parça ise asıl nesnedir.",
        examples: [
          { de: "die Milchschokolade", tr: "sütlü çikolata", note: "asıl şey çikolata" },
          { de: "die Schokoladenmilch", tr: "çikolatalı süt", note: "asıl şey süt" },
          { de: "die Woche + das Ende → das Wochenende", tr: "hafta sonu", note: "das Ende → das" },
        ],
      },
      {
        heading: "Ara sesler ve çoğul",
        tr: "Parçaların arasına bazen bir bağlantı sesi girer: -s-, -n- ya da -en-. Bunlar ezberlenir, kuralı yoktur. Çoğul ise yalnız son kelimede yapılır; baştaki parça değişmez.",
        examples: [
          { de: "der Geburtstag", tr: "doğum günü", note: "Geburt + s + Tag" },
          { de: "die Tomatensuppe", tr: "domates çorbası", note: "Tomate + n + Suppe" },
          { de: "zwei Haustüren", tr: "iki sokak kapısı", note: "çoğul yalnız sonda" },
        ],
      },
    ],
    questions: [
      {
        text: "der Bahnhof + die Uhr → ___ Bahnhofsuhr",
        options: ["der", "das", "die"],
        answer: 2,
        explain: "Son kelime „die Uhr“ olduğu için birleşik isim de die alır.",
      },
      {
        text: "Was ist eine Milchschokolade?",
        options: ["Milch mit Schokolade", "Schokolade mit Milch", "eine Flasche Milch"],
        answer: 1,
        explain: "Asıl kelime sonda: Schokolade. Milch yalnız ne tür çikolata olduğunu söyler.",
      },
      {
        text: "das Obst + der Salat → ___ Obstsalat",
        options: ["der", "die", "das"],
        answer: 0,
        explain: "Son kelime „der Salat“; artikel oradan gelir: der Obstsalat.",
      },
      {
        kind: "gapfill",
        text: "die Stadt + der Plan → ___ Stadtplan",
        options: [],
        answer: 0,
        accept: ["der"],
        explain: "„der Plan“ sonda olduğu için der Stadtplan.",
      },
      {
        kind: "gapfill",
        text: "das Haus + die Aufgabe → ___ Hausaufgabe",
        options: [],
        answer: 0,
        accept: ["die"],
        explain: "Son kelime „die Aufgabe“: die Hausaufgabe.",
      },
      {
        kind: "gapfill",
        text: "der Geburtstag + das Geschenk → ___ Geburtstagsgeschenk",
        options: [],
        answer: 0,
        accept: ["das"],
        explain: "Son kelime „das Geschenk“: das Geburtstagsgeschenk.",
      },
      {
        kind: "gapfill",
        text: "Plural: die Haustür → zwei ___",
        options: [],
        answer: 0,
        accept: ["Haustüren"],
        explain: "Çoğul yalnız son kelimede yapılır: Tür → Türen, yani Haustüren.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Der", "Zimmerschlüssel", "liegt", "an der", "Rezeption"],
        explain: "Artikel son kelimeden gelir (der Schlüssel → der Zimmerschlüssel); fiil ikinci sırada.",
      },
      {
        kind: "truefalse",
        text: "„das Wochenende“ — Bu artikel doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Son kelime „das Ende“ olduğu için das Wochenende doğru.",
      },
      {
        kind: "truefalse",
        text: "„Der Kinderzimmer ist sehr groß.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Son kelime „das Zimmer“; doğrusu „Das Kinderzimmer ist sehr groß.“",
      },
    ],
  },
];
