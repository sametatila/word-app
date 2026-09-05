import type { SkillExercise } from "../types";

/**
 * A2 · Ünite 10 — "Yardım, kargo, gürültü, arıza".
 *
 * Dört ders: Kannst du mir helfen? · Ein Paket für den Nachbarn ·
 * Zu laut von oben · Der Hausmeister kommt. İçerik ünite 1-10'un
 * kelimeleriyle sınırlı.
 *
 *   Ünite 10: ausleihen, der Eimer, der Schraubenzieher, der Staubsauger,
 *             die Werkstatt, weiterhelfen, aushelfen, hilfsbereit ·
 *             das Päckchen, die Bestellung, der Postbote, das Postfach,
 *             die Haustür, die Türklingel, austragen, benachrichtigen ·
 *             die Lautstärke, stören, die Ruhe, rücksichtslos,
 *             sich beklagen, meckern, nervig, nachts · der Wasserhahn,
 *             die Heizung, der Klempner, der Elektriker, defekt,
 *             die Glühbirne, der Lichtschalter, lüften
 *   Kalıplar: Kannst du mir kurz helfen? · Kann ich mir … ausleihen? ·
 *             Ich nehme das Päckchen für Sie an. · Wenn es zu laut ist,
 *             kann ich nicht schlafen. · Die Heizung ist defekt. ·
 *             Können Sie mir jemanden schicken?
 *
 * Ünite komşuluk dilini kuruyor ve iki şeyi ölçüyor: yardım fiilinin kişiyi
 * YÖNELME hâline sokması (belirtme değil — herkesin yaptığı hata) ve
 * şikâyetin kibar biçimi; suçlamak yerine koşul cümlesi kurmak
 * ("Wenn es zu laut ist, …") sonucu değiştiriyor.
 */
export const a2U10: SkillExercise[] = [
  {
    id: "a2-u10-r1",
    level: "A2",
    skill: "reading",
    unit: 10,
    title: "Zettel im Treppenhaus",
    genre: "İlan",
    intro: "Apartman girişindeki iki not. Kim ne istiyor, kim ne sunuyor?",
    gloss: [
      { de: "ausleihen", tr: "ödünç almak", en: "to borrow" },
      { de: "der Staubsauger", tr: "elektrikli süpürge", en: "vacuum cleaner" },
      { de: "der Schraubenzieher", tr: "tornavida", en: "screwdriver" },
      { de: "aushelfen", tr: "yardıma gitmek", en: "to help out" },
      { de: "die Türklingel", tr: "kapı zili", en: "doorbell" },
      { de: "die Werkstatt", tr: "tamirhane", en: "workshop" },
    ],
    minutes: 4,
    text:
      "AN ALLE NACHBARN\n\n" +
      "Hallo zusammen! Ich bin Kim aus dem zweiten Stock, ganz neu hier.\n\n" +
      "Mein Staubsauger ist noch in der alten Wohnung. Kann ich mir für einen Tag einen ausleihen? Ich bringe ihn natürlich sofort zurück. Meine Türklingel funktioniert übrigens noch nicht — bitte einfach klopfen.\n\n" +
      "Kim, Wohnung 2b\n\n" +
      "— — — — —\n\n" +
      "Hallo Kim, willkommen im Haus!\n\n" +
      "Staubsauger kannst du bei mir holen, ich bin fast immer ab 18 Uhr da. Wenn du Werkzeug brauchst: ich habe eine kleine Werkstatt im Keller, Schraubenzieher und alles Weitere findest du dort.\n\n" +
      "Und wenn beim Umzug etwas schwer ist, sag Bescheid — ich helfe dir gern aus.\n\n" +
      "Ahmet, Wohnung 1a",
    questions: [
      {
        text: "Was möchte Kim ausleihen?",
        options: ["Einen Schraubenzieher", "Einen Staubsauger", "Eine Leiter"],
        answer: 1,
        explain: "„Mein Staubsauger ist noch in der alten Wohnung. Kann ich mir für einen Tag einen ausleihen?“",
      },
      {
        kind: "gapfill",
        text: "Meine ___ funktioniert übrigens noch nicht.",
        options: [],
        answer: 0,
        accept: ["Türklingel"],
        explain: "Bu yüzden Kim „bitte einfach klopfen“ diye ekliyor.",
      },
      {
        text: "Ab wann ist Ahmet meistens zu Hause?",
        options: ["Ab 16 Uhr", "Ab 18 Uhr", "Nur am Wochenende"],
        answer: 1,
        explain: "„ich bin fast immer ab 18 Uhr da“.",
      },
      {
        kind: "short_answer",
        text: "Wo findet Kim Werkzeug?",
        options: [],
        answer: 0,
        accept: ["in der Werkstatt im Keller", "im Keller", "in der Werkstatt"],
        explain: "„ich habe eine kleine Werkstatt im Keller, Schraubenzieher und alles Weitere findest du dort“.",
      },
      {
        text: "Ahmet will beim Umzug nicht helfen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „sag Bescheid — ich helfe dir gern aus“.",
      },
    ],
  },
  {
    id: "a2-u10-r2",
    level: "A2",
    skill: "reading",
    unit: 10,
    title: "Ihr Paket konnte nicht zugestellt werden",
    genre: "Bilgilendirme",
    intro: "Posta kutusundaki kargo kartı. Paket nerede, ne zamana kadar alınmalı?",
    gloss: [
      { de: "das Päckchen", tr: "küçük paket", en: "small parcel" },
      { de: "die Bestellung", tr: "sipariş", en: "order" },
      { de: "der Postbote", tr: "postacı", en: "postman" },
      { de: "das Postfach", tr: "posta kutusu", en: "post office box" },
      { de: "die Haustür", tr: "sokak kapısı", en: "front door" },
      { de: "benachrichtigen", tr: "haber vermek", en: "to notify" },
      { de: "austragen", tr: "dağıtmak", en: "to deliver" },
    ],
    minutes: 4,
    text:
      "BENACHRICHTIGUNG\n\n" +
      "Sehr geehrte Kundin, sehr geehrter Kunde,\n\n" +
      "unser Postbote hat heute um 10:20 Uhr versucht, Ihnen ein Päckchen zu bringen. Leider hat an der Haustür niemand geöffnet.\n\n" +
      "Ihre Bestellung liegt jetzt bei Ihrer Nachbarin, Frau Lorenz (Wohnung 3c). Bitte holen Sie das Päckchen dort ab.\n\n" +
      "Falls Frau Lorenz nicht da ist, bringen wir die Sendung morgen zur Filiale in der Bahnhofstraße. Dort können Sie sie sieben Tage lang abholen. Danach geht sie zurück an den Absender.\n\n" +
      "Wichtig: Bringen Sie bitte diese Karte und Ihren Ausweis mit. Wir tragen von Montag bis Samstag aus.\n\n" +
      "Ihre Deutsche Post",
    questions: [
      {
        text: "Warum konnte der Postbote nicht zustellen?",
        options: ["Die Adresse war falsch.", "Niemand hat geöffnet.", "Das Päckchen war zu groß."],
        answer: 1,
        explain: "„Leider hat an der Haustür niemand geöffnet.“",
      },
      {
        kind: "gapfill",
        text: "Wir ___ von Montag bis Samstag aus.",
        options: [],
        answer: 0,
        accept: ["tragen"],
        explain: "„austragen“ ayrılabilen bir fiil; şimdiki zamanda ön ek cümlenin sonuna düşer.",
      },
      {
        text: "Wo liegt das Päckchen jetzt?",
        options: ["Bei Frau Lorenz", "In der Filiale", "Im Postfach"],
        answer: 0,
        explain: "„Ihre Bestellung liegt jetzt bei Ihrer Nachbarin, Frau Lorenz (Wohnung 3c).“ Şube yalnız ikinci ihtimal.",
      },
      {
        kind: "short_answer",
        text: "Wie lange kann man das Päckchen in der Filiale abholen?",
        options: [],
        answer: 0,
        accept: ["sieben Tage", "7 Tage", "sieben Tage lang"],
        explain: "„Dort können Sie sie sieben Tage lang abholen. Danach geht sie zurück an den Absender.“",
      },
      {
        text: "Man braucht nur die Karte, keinen Ausweis.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Bringen Sie bitte diese Karte und Ihren Ausweis mit.“",
      },
    ],
  },
  {
    id: "a2-u10-l1",
    level: "A2",
    skill: "listening",
    unit: 10,
    title: "Zu laut von oben",
    genre: "Diyalog",
    intro: "Üst kat komşusuyla gürültü konuşması. Nasıl başlıyor, nasıl bitiyor?",
    gloss: [
      { de: "die Lautstärke", tr: "ses seviyesi", en: "volume" },
      { de: "stören", tr: "rahatsız etmek", en: "to disturb" },
      { de: "die Ruhe", tr: "sessizlik", en: "quiet" },
      { de: "nachts", tr: "geceleri", en: "at night" },
      { de: "sich beklagen", tr: "şikâyet etmek", en: "to complain" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Frau Sander", text: "Hallo, entschuldigen Sie die Störung. Haben Sie kurz Zeit?" },
      { speaker: "Herr Bach", text: "Klar, was gibt es denn?" },
      { speaker: "Frau Sander", text: "Es ist mir unangenehm, aber wenn es nachts so laut ist, kann ich einfach nicht schlafen." },
      { speaker: "Herr Bach", text: "Oh. Meinen Sie die Musik? Das tut mir wirklich leid — ich habe gar nicht gemerkt, dass man das unten hört." },
      { speaker: "Frau Sander", text: "Ich wollte mich nicht beklagen. Aber ab elf brauche ich wirklich Ruhe." },
      { speaker: "Herr Bach", text: "Verstehe. Könnten Sie mir sagen, ab wann genau es stört? Dann stelle ich die Lautstärke leiser." },
      { speaker: "Frau Sander", text: "Ab zehn wäre super. Ich stehe um fünf auf." },
      { speaker: "Herr Bach", text: "Kein Problem. Und wenn ich es wieder vergesse, klopfen Sie einfach." },
    ],
    questions: [
      {
        text: "Wie beginnt Frau Sander das Gespräch?",
        options: ["Sie beschwert sich sofort.", "Sie entschuldigt sich für die Störung.", "Sie ruft den Hausmeister."],
        answer: 1,
        explain: "„Hallo, entschuldigen Sie die Störung. Haben Sie kurz Zeit?“ — suçlamadan başlıyor.",
      },
      {
        kind: "gapfill",
        text: "Wenn es nachts so laut ist, ___ ich einfach nicht schlafen.",
        options: [],
        answer: 0,
        accept: ["kann"],
        explain: "Koşul cümlesi başta olduğu için ana cümlede fiil hemen virgülden sonra gelir, özne arkaya düşer.",
      },
      {
        text: "Wusste Herr Bach von dem Problem?",
        options: ["Ja, aber es war ihm egal.", "Nein, er hat es nicht gemerkt.", "Ja, ein Nachbar hatte es gesagt."],
        answer: 1,
        explain: "„ich habe gar nicht gemerkt, dass man das unten hört“.",
      },
      {
        kind: "dictation",
        text: "Herr Bach'ın saati sorduğu kibar cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Könnten Sie mir sagen, ab wann genau es stört?"],
        explain: "Kip fiilinin bu biçimi rica bildirir ve yan cümlede fiil sona gider.",
      },
    ],
  },
  {
    id: "a2-u10-l2",
    level: "A2",
    skill: "listening",
    unit: 10,
    title: "Die Heizung ist defekt",
    genre: "Telefon görüşmesi",
    intro: "Bina yöneticisine arıza bildirimi. Kaç arıza var, tamirci ne zaman geliyor?",
    gloss: [
      { de: "die Heizung", tr: "kalorifer", en: "heating" },
      { de: "defekt", tr: "arızalı", en: "broken" },
      { de: "der Wasserhahn", tr: "musluk", en: "tap" },
      { de: "der Klempner", tr: "tesisatçı", en: "plumber" },
      { de: "der Elektriker", tr: "elektrikçi", en: "electrician" },
      { de: "die Glühbirne", tr: "ampul", en: "light bulb" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Verwaltung", text: "Hausverwaltung Weber, guten Tag." },
      { speaker: "Frau Cetin", text: "Guten Tag, Cetin, Lindenweg 8. Bei uns ist die Heizung defekt, seit gestern Abend." },
      { speaker: "Verwaltung", text: "Im ganzen Haus oder nur bei Ihnen?" },
      { speaker: "Frau Cetin", text: "Ich glaube nur bei uns. Und der Wasserhahn in der Küche tropft auch schon länger." },
      { speaker: "Verwaltung", text: "Gut, dann schicke ich Ihnen den Klempner. Er kann morgen zwischen acht und zwölf kommen." },
      { speaker: "Frau Cetin", text: "Das passt. Können Sie mir auch einen Elektriker schicken? Im Flur ist der Lichtschalter kaputt." },
      { speaker: "Verwaltung", text: "Ist es nur die Glühbirne oder wirklich der Schalter?" },
      { speaker: "Frau Cetin", text: "Der Schalter. Die Birne habe ich schon gewechselt." },
      { speaker: "Verwaltung", text: "Alles klar, ich notiere beides." },
    ],
    questions: [
      {
        text: "Seit wann ist die Heizung defekt?",
        options: ["Seit gestern Abend", "Seit einer Woche", "Seit heute Morgen"],
        answer: 0,
        explain: "„Bei uns ist die Heizung defekt, seit gestern Abend.“",
      },
      {
        kind: "gapfill",
        text: "Können Sie ___ auch einen Elektriker schicken?",
        options: [],
        answer: 0,
        accept: ["mir"],
        explain: "İki nesne var: gönderilen kişi belirtme hâlinde, kendisi için gönderilen kişi yönelme hâlinde ve önde.",
      },
      {
        text: "Was ist im Flur kaputt?",
        options: ["Nur die Glühbirne", "Der Lichtschalter", "Die Heizung"],
        answer: 1,
        explain: "„Der Schalter. Die Birne habe ich schon gewechselt.“",
      },
      {
        kind: "short_answer",
        text: "Wann kommt der Klempner?",
        options: [],
        answer: 0,
        accept: ["morgen zwischen acht und zwölf", "zwischen acht und zwölf", "morgen"],
        explain: "„Er kann morgen zwischen acht und zwölf kommen.“",
      },
    ],
  },
  {
    id: "a2-u10-w1",
    level: "A2",
    skill: "writing",
    unit: 10,
    title: "helfen und höflich bitten",
    genre: "Dil bilgisi",
    intro: "Yardım fiilinin hâli ve ricanın kibar biçimi. İkisi de komşulukta her gün gerekiyor.",
    gloss: [
      { de: "weiterhelfen", tr: "yardımcı olmak", en: "to help further" },
      { de: "ausleihen", tr: "ödünç almak", en: "to borrow" },
      { de: "die Lautstärke", tr: "ses seviyesi", en: "volume" },
      { de: "der Staubsauger", tr: "elektrikli süpürge", en: "vacuum cleaner" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Bana kısa bir yardım eder misin?",
        answer: "Kannst du mir kurz helfen",
        hint: "Yardım fiili kişiyi YÖNELME hâline sokar: mir, „mich“ değil.",
      },
      {
        kind: "build",
        tr: "Süpürgeni ödünç alabilir miyim?",
        answer: "Kann ich mir deinen Staubsauger ausleihen",
        hint: "Ödünç ALAN için yanında yönelme hâlinde zamir bulunur: „mir ausleihen“ = kendine ödünç almak.",
      },
      {
        kind: "build",
        tr: "Sesi biraz kısabilir misiniz?",
        answer: "Könnten Sie bitte die Lautstärke leiser stellen",
        hint: "Kip fiilinin bu biçimi doğrudan istemez, rica eder — komşu meselelerinde ilk seferde hep bu kullanılır.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: bu fiil hangi hâli ister?",
        source: "Kannst du mich kurz helfen?",
        answer: "Kannst du mir kurz helfen?",
        alternatives: ["Kannst du mir kurz helfen"],
        why: "„helfen“ kişiyi yönelme hâline sokar, belirtme hâline değil. Herkesin yaptığı hata bu.",
      },
    ],
  },
  {
    id: "a2-u10-w2",
    level: "A2",
    skill: "writing",
    unit: 10,
    title: "Eine Nachricht an die Hausverwaltung",
    genre: "Resmî yazı",
    intro: "Bina yönetimine yaz: neyin bozuk olduğunu bildir ve birinin gönderilmesini iste.",
    gloss: [
      { de: "defekt", tr: "arızalı", en: "broken" },
      { de: "die Heizung", tr: "kalorifer", en: "heating" },
      { de: "der Klempner", tr: "tesisatçı", en: "plumber" },
      { de: "der Wasserhahn", tr: "musluk", en: "tap" },
      { de: "benachrichtigen", tr: "haber vermek", en: "to notify" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "reply",
        prompt: "Bina yönetiminin e-postasına cevap yaz. İki arızayı bildir, ne zamandır böyle olduklarını söyle ve birinin gönderilmesini iste. Ne zaman evde olduğunu da yaz.",
        stimulus:
          "Sehr geehrte Mieterinnen und Mieter,\n\nbitte melden Sie Schäden in der Wohnung immer schriftlich. Schreiben Sie uns, was defekt ist und seit wann.\n\nWir benachrichtigen Sie dann, wann ein Handwerker kommt.\n\nMit freundlichen Grüßen\nHausverwaltung Weber",
        checklist: [
          "Resmî hitapla başladın mı?",
          "İki arızayı ve ne zamandır sürdüklerini yazdın mı?",
          "Birinin gönderilmesini istedin mi („Können Sie mir … schicken?“)?",
          "Ne zaman evde olduğunu söyledin mi?",
        ],
        minWords: 45,
        phrases: [
          { de: "Die Heizung ist seit gestern defekt.", tr: "kalorifer dünden beri arızalı", en: "the heating has been broken since yesterday" },
          { de: "Können Sie mir bitte jemanden schicken?", tr: "bana birini gönderebilir misiniz", en: "could you please send someone" },
          { de: "Ich bin vormittags zu Hause.", tr: "sabahları evdeyim", en: "I am at home in the mornings" },
        ],
        sample:
          "Sehr geehrte Damen und Herren,\n\nich wohne im Lindenweg 8, Wohnung 3b, und möchte Ihnen zwei Schäden melden.\n\nDie Heizung ist seit gestern Abend defekt. Das Wohnzimmer wird gar nicht mehr warm. Außerdem tropft der Wasserhahn in der Küche, das ist schon seit zwei Wochen so.\n\nKönnen Sie mir bitte einen Klempner schicken? Ich bin von Montag bis Mittwoch vormittags zu Hause, danach erst wieder ab 17 Uhr.\n\nBitte benachrichtigen Sie mich kurz per E-Mail, wann jemand kommt.\n\nMit freundlichen Grüßen\nElif Cetin",
      },
    ],
  },
];
