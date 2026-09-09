import type { SkillExercise } from "../../types";

/**
 * DE · A1 — Beceriler kütüphanesi, ilk parti (2026-09-08).
 *
 * Bu dosya diğer kurs × seviye dosyalarının EMSALİ: biçim, ton ve derinlik
 * buradaki gibi. Beş egzersiz, beş beceri; hiçbiri Patika ünitesine bağlı değil.
 *
 * Konu seçimi bilinçli: A1 Patikası gündelik hayatın neredeyse her sahnesini
 * (kafe, market, doktor, ev, yol tarifi…) zaten işliyor. Burada metin TÜRÜ
 * yeni: kayıp ilanı, postane diyaloğu, kartpostal, ei/ie söyleyiş çalışması ve
 * A1'in en sık hatası olan Akkusativ. Kelimeler A1 havuz katmanından; havuz
 * dışı birkaç kelime (Halsband, Telefonnummer) sözlükçede açıklanıyor.
 */
export const deA1: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a1-lib-r1",
    course: "de",
    level: "A1",
    skill: "reading",
    title: "Katze gesucht!",
    genre: "ad",
    intro: "Sokakta bir direğe asılmış kayıp ilanı okuyacaksın: kim kayıp, nasıl görünüyor, kime haber verilecek.",
    gloss: [
      { de: "weg", tr: "kayıp", en: "gone" },
      { de: "das Halsband", tr: "tasma", en: "collar" },
      { de: "seit", tr: "-den beri", en: "since" },
      { de: "Angst haben vor", tr: "korkmak", en: "to be afraid of" },
      { de: "anrufen", tr: "telefon etmek", en: "to call" },
      { de: "die Nachricht", tr: "mesaj", en: "message" },
    ],
    minutes: 4,
    text:
      "KATZE GESUCHT!\n\n" +
      "Unsere Katze ist weg. Sie heißt Luna und ist zwei Jahre alt. Luna ist klein, schwarz und weiß. " +
      "Sie hat grüne Augen und ein rotes Halsband.\n\n" +
      "Wir wohnen in der Gartenstraße 12. Luna ist seit Montag nicht mehr zu Hause. " +
      "Sie ist sehr lieb, aber sie hat Angst vor Hunden.\n\n" +
      "Haben Sie Luna gesehen? Bitte rufen Sie uns an: 0176 55 43 21. Sie können auch eine Nachricht schreiben. " +
      "Luna braucht ihre Familie!\n\n" +
      "Vielen Dank!\nFamilie Öztürk",
    questions: [
      {
        text: "Was ist das für ein Text?",
        options: ["Eine Familie sucht ihre Katze.", "Eine Familie möchte eine Katze kaufen.", "Eine Katze ist krank."],
        answer: 0,
        explain: "Başlık „Katze gesucht“ ve ilk cümle „Unsere Katze ist weg“ — aile kedisini arıyor, satın almıyor.",
      },
      {
        text: "Wie sieht Luna aus?",
        options: ["klein, schwarz und weiß", "groß und schwarz", "klein und rot"],
        answer: 0,
        explain: "„Luna ist klein, schwarz und weiß.“ Kırmızı olan kedi değil, tasması.",
      },
      {
        kind: "truefalse",
        text: "Luna ist seit Sonntag weg.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Metin „seit Montag“ diyor — pazartesiden beri; pazar değil.",
      },
      {
        kind: "gapfill",
        text: "Luna hat Angst vor ___.",
        options: [],
        answer: 0,
        accept: ["Hunden", "Hunde"],
        explain: "„Sie hat Angst vor Hunden.“ — köpeklerden korkuyor. „vor“ edatından sonra çoğul -n alır: Hunden.",
      },
      {
        kind: "short_answer",
        text: "Wie alt ist Luna?",
        options: [],
        answer: 0,
        accept: ["zwei Jahre", "zwei", "2", "2 Jahre", "zwei Jahre alt"],
        explain: "„Sie heißt Luna und ist zwei Jahre alt.“",
      },
      {
        text: "Man sieht Luna. Was soll man machen?",
        options: ["anrufen oder eine Nachricht schreiben", "zur Polizei gehen", "die Katze in die Gartenstraße bringen"],
        answer: 0,
        explain: "„Bitte rufen Sie uns an … Sie können auch eine Nachricht schreiben.“ İlan yalnız haber vermeyi istiyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a1-lib-l1",
    course: "de",
    level: "A1",
    skill: "listening",
    title: "Ein Paket in die Türkei",
    genre: "dialogue",
    intro: "Postanede bir müşteri Türkiye'ye paket gönderiyor; fiyatı, süreyi ve ne yazması gerektiğini dinle.",
    gloss: [
      { de: "das Paket", tr: "paket", en: "parcel" },
      { de: "schicken", tr: "göndermek", en: "to send" },
      { de: "schwer", tr: "ağır", en: "heavy" },
      { de: "ankommen", tr: "varmak", en: "to arrive" },
      { de: "die Telefonnummer", tr: "telefon numarası", en: "phone number" },
      { de: "bezahlen", tr: "ödemek", en: "to pay" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Frau Lang", text: "Guten Tag! Was kann ich für Sie tun?" },
      { speaker: "Herr Demir", text: "Guten Tag. Ich möchte dieses Paket in die Türkei schicken." },
      { speaker: "Frau Lang", text: "Gern. Was ist im Paket?" },
      { speaker: "Herr Demir", text: "Kleidung und ein bisschen Schokolade. Ein Geschenk für meine Oma." },
      { speaker: "Frau Lang", text: "Alles klar. Das Paket ist nicht schwer. Das kostet neunzehn Euro." },
      { speaker: "Herr Demir", text: "Neunzehn Euro, okay. Wann kommt das Paket an?" },
      { speaker: "Frau Lang", text: "In fünf bis sieben Tagen. Bitte schreiben Sie hier die Adresse und Ihre Telefonnummer." },
      { speaker: "Herr Demir", text: "Hier, bitte. Kann ich mit Karte bezahlen?" },
      { speaker: "Frau Lang", text: "Ja, klar. Danke und einen schönen Tag noch!" },
      { speaker: "Herr Demir", text: "Danke, Ihnen auch. Auf Wiedersehen!" },
    ],
    questions: [
      {
        text: "Wohin schickt Herr Demir das Paket?",
        options: ["in die Türkei", "nach Österreich", "in die Schweiz"],
        answer: 0,
        explain: "„Ich möchte dieses Paket in die Türkei schicken.“ Ülke adı ilk cümlede geçiyor.",
      },
      {
        text: "Was ist im Paket?",
        options: ["Kleidung und Schokolade", "Bücher und Fotos", "Kaffee und Tee"],
        answer: 0,
        explain: "„Kleidung und ein bisschen Schokolade.“ — ninesine hediye.",
      },
      {
        kind: "truefalse",
        text: "Das Paket kostet neunzehn Euro.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Das kostet neunzehn Euro.“ Müşteri de sayıyı tekrar ediyor: „Neunzehn Euro, okay.“",
      },
      {
        kind: "short_answer",
        text: "Wann kommt das Paket an?",
        options: [],
        answer: 0,
        accept: ["in fünf bis sieben Tagen", "in 5 bis 7 Tagen", "fünf bis sieben Tage", "in fünf bis sieben Tage"],
        explain: "„In fünf bis sieben Tagen.“ — beş ila yedi gün içinde.",
      },
      {
        kind: "dictation",
        text: "Herr Demir sorar: ödeme cümlesini duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Kann ich mit Karte bezahlen?", "Kann ich mit Karte bezahlen"],
        explain: "„Kann ich mit Karte bezahlen?“ — soru cümlesinde fiil (kann) başa gelir.",
      },
      {
        text: "Was muss Herr Demir schreiben?",
        options: ["die Adresse und die Telefonnummer", "seinen Namen und sein Alter", "die E-Mail-Adresse"],
        answer: 0,
        explain: "„Bitte schreiben Sie hier die Adresse und Ihre Telefonnummer.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a1-lib-w1",
    course: "de",
    level: "A1",
    skill: "writing",
    title: "Grüße vom Meer",
    genre: "personal",
    intro: "Tatildesin; önce iki cümle kur, sonra bir arkadaşına kısa bir kartpostal yaz.",
    gloss: [
      { de: "das Wetter", tr: "hava", en: "weather" },
      { de: "die Insel", tr: "ada", en: "island" },
      { de: "das Meer", tr: "deniz", en: "sea" },
      { de: "zurück", tr: "geri", en: "back" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Hava çok güzel ve sıcak.",
        answer: "Das Wetter ist sehr schön und warm.",
        alternatives: ["Das Wetter ist sehr warm und schön."],
        hint: "„Das Wetter ist …“ — sıfatlar cümle sonunda ve çekimsiz kalır: schön, warm.",
      },
      {
        kind: "build",
        tr: "Yarın adaya gidiyoruz.",
        answer: "Morgen fahren wir auf die Insel.",
        alternatives: ["Wir fahren morgen auf die Insel."],
        hint: "Zaman sözcüğü başa gelince fiil yine İKİNCİ sırada kalır: Morgen fahren wir …",
      },
      {
        kind: "free",
        prompt:
          "Deniz kenarında tatildesin. Bir arkadaşına kartpostal yaz: neredesin, hava nasıl, her gün ne yapıyorsun, ne zaman dönüyorsun.",
        checklist: ["Nerede olduğunu yaz", "Havayı anlat", "Her gün yaptığın bir şeyi yaz", "Ne zaman döndüğünü söyle ve vedalaş"],
        minWords: 25,
        phrases: [
          { de: "Viele Grüße aus …", tr: "…'den selamlar" },
          { de: "Hier ist es …", tr: "Burası …" },
          { de: "Jeden Tag …", tr: "Her gün …" },
          { de: "Am … komme ich zurück.", tr: "… günü dönüyorum." },
          { de: "Bis bald!", tr: "Yakında görüşürüz!" },
        ],
        sample:
          "Hallo Ali, viele Grüße aus Italien! Ich bin mit meiner Familie am Meer. Das Wetter ist super, jeden Tag scheint die Sonne. " +
          "Wir schwimmen viel und essen jeden Abend Fisch. Morgen fahren wir mit dem Schiff auf eine kleine Insel. " +
          "Am Sonntag komme ich zurück. Bis bald! Deine Selin",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a1-lib-s1",
    course: "de",
    level: "A1",
    skill: "speaking",
    title: "ei oder ie?",
    genre: "pronounce",
    intro: "Yazılışı benzeyen iki ses: „ei“ hep „ay“, „ie“ hep uzun „ii“. Yedi cümlede ikisini karıştırmadan söyle.",
    gloss: [
      { de: "die Miete", tr: "kira", en: "rent" },
      { de: "bleiben", tr: "kalmak", en: "to stay" },
      { de: "leider", tr: "maalesef", en: "unfortunately" },
      { de: "der Brief", tr: "mektup", en: "letter" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Mein Freund heißt Dieter.",
        tr: "Arkadaşımın adı Dieter.",
        hint: "„mein“ ve „heißt“: ay. „Dieter“: uzun ii — Dİİ-ter.",
        confusions: [{ heard: ["Ditter", "Dita"], fix: "„ie“ uzun i: Diiter. Kısa söylersen başka bir ad duyulur.", expected: "Dieter" }],
      },
      {
        de: "Die Miete ist nicht billig.",
        tr: "Kira ucuz değil.",
        hint: "„Miete“ = Mİİ-te, uzun i. „billig“ sonu „-iç“ okunur.",
        confusions: [{ heard: ["Mitte", "mit"], fix: "„ie“ uzun i: Miite. Kısa söylersen „Mitte“ (orta) olur.", expected: "Miete" }],
      },
      {
        de: "Ich bleibe bis Dienstag hier.",
        tr: "Salıya kadar burada kalıyorum.",
        hint: "„bleibe“ = BLAY-be; „Dienstag“ = DİİNS-tak.",
        confusions: [{ heard: ["bliebe", "blibe"], fix: "„ei“ = ay: blay-be. „bliebe“ başka bir biçim.", expected: "bleibe" }],
      },
      {
        de: "Wie viel kostet das Eis?",
        tr: "Dondurma ne kadar?",
        hint: "„wie“ ve „viel“ uzun i; „Eis“ = AYS, sondaki s duyulmalı.",
        confusions: [{ heard: ["das Ei", "das ist"], fix: "„Eis“ sonundaki s'yi söyle; „Ei“ yumurta demek.", expected: "Eis" }],
      },
      {
        de: "Wir spielen heute im Garten.",
        tr: "Bugün bahçede oynuyoruz.",
        hint: "„spielen“ = ŞPİİ-len: baştaki sp „şp“, ie uzun i.",
        confusions: [{ heard: ["spilen", "spielt"], fix: "„ie“ uzun i: şpiilen. Fiil çoğul: -en ile bitmeli.", expected: "spielen" }],
      },
      {
        de: "Meine Schwester liebt Tee.",
        tr: "Kız kardeşim çayı sever.",
        hint: "„meine“ = MAY-ne; „liebt“ = LİİPT, uzun i.",
        confusions: [{ heard: ["lebt", "liebte"], fix: "„ie“ uzun i: liibt. „lebt“ (yaşıyor) bambaşka bir kelime.", expected: "liebt" }],
      },
      {
        de: "Ich schreibe einen Brief.",
        tr: "Bir mektup yazıyorum.",
        hint: "„schreibe“ = ŞRAY-be; „Brief“ = BRİİF, uzun i.",
        confusions: [{ heard: ["schriebe", "schribe"], fix: "„ei“ = ay: şray-be. Uzun i ile söylersen fiil değişir.", expected: "schreibe" }],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a1-lib-g1",
    course: "de",
    level: "A1",
    skill: "grammar",
    title: "den oder einen?",
    genre: "grammar",
    intro: "Nesneyi söylerken artikelin nasıl değiştiğini öğren: Akkusativ yalnız eril kelimede görünür.",
    focus: "Akkusativ: den / einen (belirtme hâli)",
    gloss: [
      { de: "brauchen", tr: "ihtiyaç duymak", en: "to need" },
      { de: "es gibt", tr: "var", en: "there is" },
      { de: "der Schlüssel", tr: "anahtar", en: "key" },
      { de: "die Lampe", tr: "lamba", en: "lamp" },
    ],
    minutes: 6,
    explanation: [
      {
        heading: "Ne oluyor?",
        tr: "Türkçede nesneye -i ekliyorsun: „kahveyi“, „kitabı“. Almancada bu iş artikelin üstünde olur ve yalnız ERİL (der) kelimede görünür: der → den, ein → einen. Dişil (die) ve nötr (das) kelimede hiçbir şey değişmez.",
        examples: [
          { de: "Ich trinke den Kaffee.", tr: "Kahveyi içiyorum.", note: "der Kaffee → den Kaffee" },
          { de: "Ich habe einen Bruder.", tr: "Bir erkek kardeşim var.", note: "ein Bruder → einen Bruder" },
          { de: "Ich kaufe die Zeitung und das Brot.", tr: "Gazeteyi ve ekmeği alıyorum.", note: "die ve das değişmiyor" },
        ],
      },
      {
        heading: "Hangi fiiller ister?",
        tr: "Nesne alan hemen her fiil: haben, kaufen, trinken, essen, sehen, suchen, brauchen, möchten. „Es gibt“ kalıbı da hep Akkusativ ister.",
        examples: [
          { de: "Ich brauche einen Schlüssel.", tr: "Bir anahtara ihtiyacım var." },
          { de: "Es gibt hier einen Supermarkt.", tr: "Burada bir süpermarket var." },
        ],
      },
      {
        heading: "En sık hata",
        tr: "„Ich habe ein Hund“ yanlış: Hund eril, o yüzden einen Hund. Kelimenin artikelini bilmeden Akkusativ kurulamaz; isimleri hep artikeliyle öğren.",
        examples: [
          { de: "Ich habe einen Hund.", tr: "Bir köpeğim var.", note: "der Hund → einen" },
          { de: "Sie hat eine Katze.", tr: "Bir kedisi var.", note: "die Katze → eine, değişmez" },
        ],
      },
    ],
    questions: [
      {
        text: "Ich sehe ___ Mann.",
        options: ["den", "der", "dem"],
        answer: 0,
        explain: "„der Mann“ eril; nesne olunca der → den.",
      },
      {
        text: "Wir brauchen ___ Tisch.",
        options: ["einen", "ein", "eine"],
        answer: 0,
        explain: "„der Tisch“ eril; ein → einen.",
      },
      {
        text: "Sie kauft ___ Lampe.",
        options: ["eine", "einen", "ein"],
        answer: 0,
        explain: "„die Lampe“ dişil; Akkusativ'de dişil artikel değişmez: eine.",
      },
      {
        text: "Hast du ___ Auto?",
        options: ["ein", "einen", "eine"],
        answer: 0,
        explain: "„das Auto“ nötr; nötr artikel Akkusativ'de aynı kalır: ein.",
      },
      {
        kind: "gapfill",
        text: "Ich möchte ___ Apfel. (der Apfel)",
        options: [],
        answer: 0,
        accept: ["einen"],
        explain: "Eril kelime nesne olunca ein → einen: einen Apfel.",
      },
      {
        kind: "gapfill",
        text: "Er trinkt ___ Tee. (der Tee)",
        options: [],
        answer: 0,
        accept: ["den"],
        explain: "Belirli artikel eril nesnede der → den: den Tee.",
      },
      {
        kind: "gapfill",
        text: "Wir suchen ___ Schlüssel. (der Schlüssel)",
        options: [],
        answer: 0,
        accept: ["den"],
        explain: "„suchen“ nesne alır; der Schlüssel eril → den Schlüssel.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Ich", "habe", "einen", "Bruder"],
        explain: "Özne, fiil ikinci sırada, sonra nesne: Ich habe einen Bruder.",
      },
      {
        kind: "truefalse",
        text: "„Ich esse ein Brot.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„das Brot“ nötr; nötr artikel Akkusativ'de değişmez, cümle doğru.",
      },
      {
        kind: "truefalse",
        text: "„Wir haben ein Sohn.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„der Sohn“ eril; doğrusu „Wir haben einen Sohn.“",
      },
    ],
  },
];
