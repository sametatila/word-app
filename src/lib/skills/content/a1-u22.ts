import type { SkillExercise } from "../types";

/**
 * A1 · Ünite 22 — "Eczane, soğuk algınlığı ve acil çağrı".
 *
 * Dört ders: In der Apotheke · Ich bin krank · Trink viel Wasser! ·
 * Der Notruf. İçerik ünite 1-22'nin kelimeleriyle sınırlı.
 *
 *   Ünite 22: die Apotheke, die Tablette, nehmen, täglich, das Rezept,
 *             geben, wenig, drücken · die Erkältung, der Husten, bleiben,
 *             die Besserung, wieder, antworten, die Antwort, weg sein ·
 *             schlafen, die Sorge, der Saft, der Honig, viel, lassen,
 *             machen, sagen · der Notruf, der Unfall, rufen, die Hilfe,
 *             die Polizei, das Krankenhaus, die Achtung, die Lösung
 *
 * GERÇEK BİLGİ — bu ünitede içerik doğruluğu dilbilgisinden önce gelir:
 *   112 → Rettungsdienst ve Feuerwehr. Tüm Avrupa Birliği'nde aynı numara.
 *   110 → Polizei (yalnız Almanya).
 *   İkisi de ÜCRETSİZ, alan kodu istemez, her telefondan çalışır.
 * Acil çağrının Almanya'da öğretilen sırası dört adımdır ve dinleme
 * egzersizi tam bu sırayı izler: WO ist es passiert? · WAS ist passiert? ·
 * WIE VIELE Menschen brauchen Hilfe? · WARTEN — telefonu KAPATMA, merkez
 * soru sormayı bitirene kadar hatta kal. Son adım en çok atlanandır.
 *
 * DİL NOKTASI: "Gute Besserung!" hasta birine söylenmesi BEKLENEN kalıptır —
 * söylememek soğukluk sayılır. Türkçedeki "geçmiş olsun"un tam karşılığı.
 *
 * Apotheke ≠ Drogerie: reçeteli ilaç yalnız Apotheke'de, hatta ağrı kesici
 * bile. Drogerie'de sabun ve şampuan var, ilaç yok. Okuma bunu veriyor.
 */
export const a1U22: SkillExercise[] = [
  {
    id: "a1-u22-r1",
    level: "A1",
    skill: "reading",
    unit: 22,
    title: "In der Apotheke",
    genre: "Bilgi yazısı",
    intro: "Eczanenin kapısındaki bilgi. Ne zaman açık, gece ne olur?",
    gloss: [
      { de: "die Apotheke", tr: "eczane", en: "pharmacy" },
      { de: "das Rezept", tr: "reçete", en: "prescription" },
      { de: "die Tablette", tr: "hap", en: "tablet" },
      { de: "die Drogerie", tr: "kozmetik marketi (ilaç satmaz)", en: "drugstore" },
    ],
    minutes: 3,
    text:
      "Apotheke am Markt\n\nAn der Tür steht: DRÜCKEN.\n\nMontag bis Freitag: 8 bis 18:30 Uhr\nSamstag: 9 bis 13 Uhr\nSonntag: zu\n\nSie brauchen nachts oder am Sonntag etwas aus der Apotheke? Dann hilft die Not-Apotheke. Welche Apotheke gerade auf ist, steht hier an der Tür und im Internet.\n\nTabletten mit Rezept bekommen Sie nur in der Apotheke, nicht in der Drogerie. Auch Tabletten gegen Schmerzen gibt es hier.\n\nWir geben Ihnen gern eine Antwort auf Ihre Fragen. Fragen Sie einfach!\n\nGute Besserung!",
    questions: [
      {
        text: "Wann ist die Apotheke am Samstag auf?",
        options: ["von 9 bis 13 Uhr", "von 8 bis 18:30 Uhr", "gar nicht"],
        answer: 0,
        explain: "„Samstag: 9 bis 13 Uhr“.",
      },
      {
        text: "Wo bekommt man Tabletten mit Rezept?",
        options: ["nur in der Apotheke", "auch in der Drogerie", "im Supermarkt"],
        answer: 0,
        explain:
          "„Tabletten mit Rezept bekommen Sie nur in der Apotheke, nicht in der Drogerie.“ Almanya'da Drogerie ilaç satmaz — sabun ve şampuan satar.",
      },
      {
        kind: "gapfill",
        text: "Nachts hilft die ___-Apotheke.",
        options: [],
        answer: 0,
        accept: ["Not"],
        explain: "„Dann hilft die Not-Apotheke.“ — nöbetçi eczane.",
      },
      {
        text: "„Gute Besserung!“ ne demek?",
        options: ["Geçmiş olsun!", "Görüşürüz!", "Afiyet olsun!"],
        answer: 0,
        explain:
          "Hasta birine söylenmesi BEKLENEN kalıptır; söylememek soğukluk sayılır. Türkçedeki „geçmiş olsun“un tam karşılığı.",
      },
      {
        text: "Richtig oder falsch? Am Sonntag ist die Apotheke auf.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Sonntag: zu“.",
      },
          {
        kind: "gapfill",
        text: "Sie brauchen nachts oder am Sonntag etwas aus der ___?",
        options: [],
        answer: 0,
        accept: ["Apotheke"],
        explain: "„Sie brauchen nachts oder am Sonntag etwas aus der Apotheke?“",
      },
],
  },
  {
    id: "a1-u22-r2",
    level: "A1",
    skill: "reading",
    unit: 22,
    title: "Trink viel Tee!",
    genre: "Forum mesajı",
    intro: "Soğuk algınlığına karşı üç öneri. Kim ne diyor?",
    gloss: [
      { de: "die Erkältung", tr: "soğuk algınlığı", en: "cold" },
      { de: "der Husten", tr: "öksürük", en: "cough" },
      { de: "der Honig", tr: "bal", en: "honey" },
      { de: "die Sorge", tr: "endişe", en: "worry" },
    ],
    minutes: 3,
    text:
      "Frage von Ali: Ich habe eine Erkältung und Husten. Was soll ich machen?\n\nMia: Trink viel! Tee mit Honig ist gut gegen Husten. Und schlaf viel — mindestens acht Stunden.\n\nTom: Bleib zu Hause und geh nicht arbeiten. Mit einer Erkältung ist Sport keine gute Idee. Nach drei oder vier Tagen ist es oft wieder weg.\n\nElif: Keine Sorge, das ist oft so. Aber wenn du Fieber über 39 hast oder es nach einer Woche nicht besser ist, dann geh bitte zum Arzt. Tabletten nur mit Rezept!\n\nGute Besserung, Ali!",
    questions: [
      {
        text: "Was ist gut gegen Husten?",
        options: ["Tee mit Honig", "Saft mit Wasser", "kalte Milch"],
        answer: 0,
        explain: "„Tee mit Honig ist gut gegen Husten.“",
      },
      {
        text: "Was sagt Tom?",
        options: ["Ali soll zu Hause bleiben.", "Ali soll Sport machen.", "Ali soll sofort zum Arzt."],
        answer: 0,
        explain: "„Bleib zu Hause und geh nicht arbeiten.“",
      },
      {
        kind: "gapfill",
        text: "Mia sagt: schlaf mindestens ___ Stunden.",
        options: [],
        answer: 0,
        accept: ["acht", "8"],
        explain: "„Und schlaf viel — mindestens acht Stunden.“",
      },
      {
        text: "Wann soll Ali zum Arzt gehen?",
        options: [
          "bei Fieber über 39 oder wenn es nach einer Woche nicht besser ist",
          "sofort",
          "gar nicht",
        ],
        answer: 0,
        explain:
          "„Aber wenn du Fieber über 39 hast oder es nach einer Woche nicht besser ist, dann geh bitte zum Arzt.“",
      },
          {
        kind: "gapfill",
        text: "Frage von Ali: Ich habe eine ___ und Husten.",
        options: [],
        answer: 0,
        accept: ["Erkältung"],
        explain: "„Frage von Ali: Ich habe eine Erkältung und Husten.“",
      },
],
  },
  {
    id: "a1-u22-l1",
    level: "A1",
    skill: "listening",
    unit: 22,
    title: "Etwas gegen Husten",
    genre: "Eczane",
    intro: "Eczanede bir müşteri. Ne alıyor, nasıl kullanacak?",
    gloss: [
      { de: "täglich", tr: "her gün", en: "daily" },
    ],
    minutes: 2,
    segments: [
      { text: "Guten Tag. Ich brauche etwas gegen Husten." },
      { text: "Haben Sie ein Rezept?" },
      { text: "Nein, ich war nicht beim Arzt." },
      { text: "Kein Problem. Dann nehmen Sie den Saft hier. Er kostet 9 Euro." },
      { text: "Wie oft soll ich ihn nehmen?" },
      { text: "Dreimal täglich, immer nach dem Essen. Und trinken Sie viel Wasser!" },
      { text: "Danke schön." },
      { text: "Gute Besserung!" },
    ],
    questions: [
      {
        text: "Was bekommt der Kunde?",
        options: ["einen Saft", "Tabletten", "Tee mit Honig"],
        answer: 0,
        explain: "„Dann nehmen Sie den Saft hier.“ — reçetesi olmadığı için hap değil.",
      },
      {
        kind: "gapfill",
        text: "Der Saft kostet ___ Euro.",
        options: [],
        answer: 0,
        accept: ["9", "neun"],
        explain: "„Er kostet 9 Euro.“",
      },
      {
        text: "Wie oft soll er den Saft nehmen?",
        options: ["dreimal täglich", "einmal täglich", "nur bei Husten"],
        answer: 0,
        explain: "„Dreimal täglich, immer nach dem Essen.“",
      },
      {
        text: "Wie endet das Gespräch?",
        options: ["Gute Besserung!", "Guten Appetit!", "Bis morgen!"],
        answer: 0,
        explain: "Eczanede standart kapanış — hastaya bunu söylemek beklenir.",
      },
          {
        kind: "gapfill",
        text: "Dreimal ___, immer nach dem Essen.",
        options: [],
        answer: 0,
        accept: ["täglich"],
        explain: "„Dreimal täglich, immer nach dem Essen.“",
      },
],
  },
  {
    id: "a1-u22-l2",
    level: "A1",
    skill: "listening",
    unit: 22,
    title: "Der Notruf: 112",
    genre: "Acil çağrı",
    intro:
      "Bir kaza ihbarı. Almanya'da acil çağrının sırası dörttür — dördüncüsü en çok atlanan.",
    gloss: [
      { de: "der Unfall", tr: "kaza", en: "accident" },
      { de: "die Hilfe", tr: "yardım", en: "help" },
    ],
    minutes: 2,
    segments: [
      { text: "Notruf 112, was ist passiert?" },
      { text: "Hier ist ein Unfall! Ein Auto und ein Fahrrad." },
      { text: "Wo sind Sie?" },
      { text: "In der Bahnhofstraße, direkt vor der Apotheke." },
      { text: "Wie viele Menschen brauchen Hilfe?" },
      { text: "Eine Frau. Ihr Bein tut sehr weh." },
      { text: "Gut. Wir kommen sofort. Bitte bleiben Sie am Telefon." },
    ],
    questions: [
      {
        text: "Welche Nummer ruft man in Europa für einen Unfall?",
        options: ["112", "110", "911"],
        answer: 0,
        explain:
          "112 = Rettungsdienst ve Feuerwehr, tüm Avrupa Birliği'nde aynı. 110 = yalnız Alman polisi. İkisi de ücretsiz.",
      },
      {
        text: "Wo ist der Unfall?",
        options: ["in der Bahnhofstraße", "vor dem Krankenhaus", "im Park"],
        answer: 0,
        explain: "„In der Bahnhofstraße, direkt vor der Apotheke.“",
      },
      {
        kind: "gapfill",
        text: "___ Frau braucht Hilfe.",
        options: [],
        answer: 0,
        accept: ["Eine"],
        explain: "„Eine Frau. Ihr Bein tut sehr weh.“",
      },
      {
        text: "Acil çağrının SON adımı nedir?",
        options: [
          "am Telefon bleiben und warten",
          "sofort auflegen",
          "die Polizei auch anrufen",
        ],
        answer: 0,
        explain:
          "„Bitte bleiben Sie am Telefon.“ En çok atlanan adım budur: merkez soru sormayı bitirene kadar telefonu KAPATMA.",
      },
          {
        kind: "gapfill",
        text: "Hier ist ein ___!",
        options: [],
        answer: 0,
        accept: ["Unfall"],
        explain: "„Hier ist ein Unfall!“",
      },
],
  },
  {
    id: "a1-u22-w1",
    level: "A1",
    skill: "writing",
    unit: 22,
    title: "Rat geben",
    genre: "Dil bilgisi",
    intro: "Hasta bir arkadaşa öğüt vermenin üç biçimi.",
    gloss: [
      { de: "bleiben", tr: "kalmak", en: "to stay" },
      { de: "die Besserung", tr: "iyileşme", en: "recovery" },
      { de: "schlafen", tr: "uyumak", en: "to sleep" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Çok su iç!",
        answer: "Trink viel Wasser",
        hint: "Samimi emir kipi: fiilin gövdesi YALIN kalır, „du“ düşer — „trink“, „trinke“ değil.",
      },
      {
        kind: "build",
        tr: "Evde kal ve çok uyu!",
        answer: "Bleib zu Hause und schlaf viel",
        hint: "İki emir arka arkaya: „bleib“ ve „schlaf“. İkisinde de sonda -e yok.",
      },
      {
        kind: "rewrite",
        prompt: "Hasta bir arkadaşa mesajını nasıl bitirirsin?",
        source: "Geçmiş olsun!",
        answer: "Gute Besserung!",
        alternatives: ["Gute Besserung"],
        why:
          "Almanca'da hasta birine bunu söylemek BEKLENİR; yazmamak soğukluk sayılır. Nezaketin isteğe bağlı değil, standart parçası.",
      },
    ],
  },
  {
    id: "a1-u22-w2",
    level: "A1",
    skill: "writing",
    unit: 22,
    title: "Was ist passiert?",
    genre: "Mesaj",
    intro: "Hasta bir arkadaşa öğüt yaz.",
    gloss: [
      { de: "die Hilfe", tr: "yardım", en: "help" },
      { de: "die Sorge", tr: "endişe", en: "worry" },
      { de: "wieder", tr: "tekrar", en: "again" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Merak etme!",
        answer: "Keine Sorge",
        hint: "Kısa kalıp, fiilsiz. „Mach dir keine Sorgen“ uzun biçimidir; günlük dilde kısası yeter.",
      },
      {
        kind: "free",
        prompt:
          "Arkadaşın soğuk algınlığı olduğunu yazdı. Ona cevap yaz (4-5 cümle): üzüldüğünü söyle, en az iki öğüt ver (emir kipiyle), ne zaman doktora gitmesi gerektiğini yaz ve „Gute Besserung“ ile bitir.",
        minWords: 30,
        checklist: [
          "İki emir kipi kullandın mı? (Trink … / Bleib … / Schlaf …)",
          "Ne zaman doktora gitmeli, yazdın mı? (Wenn du Fieber hast …)",
          "„Keine Sorge“ ya da benzeri bir rahatlatma yazdın mı?",
          "„Gute Besserung!“ ile bitirdin mi?",
        ],
        phrases: [
          { de: "Das tut mir leid.", tr: "Üzüldüm.", en: "I'm sorry." },
          { de: "Trink viel Tee!", tr: "Çok çay iç!", en: "Drink a lot of tea!" },
          { de: "Gute Besserung!", tr: "Geçmiş olsun!", en: "Get well soon!" },
        ],
        sample:
          "Hallo Mia,\n\ndas tut mir leid! Eine Erkältung ist wirklich nicht schön.\n\nTrink viel Tee mit Honig — das ist gut gegen Husten. Und bleib zu Hause, geh nicht arbeiten. Schlaf viel!\n\nKeine Sorge, nach drei oder vier Tagen ist es oft wieder weg. Aber wenn du Fieber hast oder es nach einer Woche nicht besser ist, dann geh bitte zum Arzt.\n\nGute Besserung!\nDein Ali",
      },
    ],
  },
];
