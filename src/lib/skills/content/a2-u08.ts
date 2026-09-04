import type { SkillExercise } from "../types";

/**
 * A2 · Ünite 8 — "Stres, koruyucu sağlık, ödünç ve aitlik".
 *
 * Dört ders: Zu viel Stress · Gesund bleiben · Ich leihe dir meinen Schirm ·
 * Wem gehört das? İçerik ünite 1-8'in kelimeleriyle sınırlı.
 *
 *   Ünite 8: der Stress, gestresst, sich entspannen, abschalten, unruhig,
 *            sich ausschlafen, sich hinlegen, die Massage · die Gesundheit,
 *            fit sein, die Lunge, kontrollieren, jährlich, impfen,
 *            die Blutprobe, der Blutzucker · der Zettel, die Pflanze,
 *            der Schirm, das Ding, liefern, die Telefonnummer, die Person,
 *            weitersagen · gehören, der Handschuh, die Mütze, die Geldbörse,
 *            die Brille, der Kopfhörer, jemand, der Stiefel
 *   Kalıplar: Ich kann nicht abschalten. · Ich muss mich entspannen. ·
 *             Man sollte … machen. · Einmal im Jahr … · Ich leihe dir … ·
 *             Wem gehört das? · Das gehört meiner Kollegin.
 *
 * Sağlık bloğu kapanıp Dativ bloğu açılıyor. Üç sıralama kuralı ölçülüyor:
 * kip fiiliyle birlikte dönüşlü zamirin yeri, iki nesneden zamir olanın öne
 * geçmesi ve aitlik fiilinin sahibi yönelme hâline sokması.
 */
export const a2U08: SkillExercise[] = [
  {
    id: "a2-u08-r1",
    level: "A2",
    skill: "reading",
    unit: 8,
    title: "Warum wir nicht abschalten können",
    genre: "Dergi yazısı",
    intro: "Stres üzerine kısa bir yazı. Neden kafamızı dağıtamıyoruz, ne yardımcı oluyor?",
    gloss: [
      { de: "der Stress", tr: "stres", en: "stress" },
      { de: "abschalten", tr: "kafa dağıtmak", en: "to switch off" },
      { de: "gestresst", tr: "stresli", en: "stressed" },
      { de: "unruhig", tr: "huzursuz", en: "restless" },
      { de: "sich entspannen", tr: "rahatlamak", en: "to relax" },
      { de: "sich ausschlafen", tr: "uykusunu almak", en: "to catch up on sleep" },
      { de: "die Massage", tr: "masaj", en: "massage" },
    ],
    minutes: 4,
    text:
      "Viele Menschen sagen: Ich kann abends einfach nicht abschalten. Sie liegen im Bett, aber der Kopf arbeitet weiter.\n\n" +
      "Der Grund ist meistens nicht die Arbeit allein. Wer den ganzen Tag gestresst war und dann noch zwei Stunden auf das Handy schaut, bleibt unruhig. Das Gehirn braucht ein Signal: jetzt ist Schluss.\n\n" +
      "Was hilft? Nichts Kompliziertes. Ein kurzer Spaziergang nach dem Essen. Zehn Minuten ohne Bildschirm vor dem Schlafen. Und am Wochenende sollte man sich wirklich ausschlafen, nicht nur später aufstehen und dann hektisch werden.\n\n" +
      "Eine Massage ist schön, aber sie löst das Problem nicht. Wer sich jeden Abend fünf Minuten Zeit nimmt, entspannt sich mehr als jemand, der einmal im Monat zur Massage geht.",
    questions: [
      {
        text: "Was ist laut Text der Hauptgrund?",
        options: ["Nur die Arbeit", "Arbeit und Bildschirmzeit", "Zu wenig Sport"],
        answer: 1,
        explain: "„Wer den ganzen Tag gestresst war und dann noch zwei Stunden auf das Handy schaut, bleibt unruhig.“",
      },
      {
        kind: "gapfill",
        text: "Ich kann abends einfach nicht ___.",
        options: [],
        answer: 0,
        accept: ["abschalten"],
        explain: "Kip fiiliyle birlikte ayrılabilen fiil bölünmez ve sonda kalır: „kann nicht abschalten“.",
      },
      {
        text: "Was empfiehlt der Text vor dem Schlafen?",
        options: ["Eine Massage", "Zehn Minuten ohne Bildschirm", "Zwei Stunden lesen"],
        answer: 1,
        explain: "„Zehn Minuten ohne Bildschirm vor dem Schlafen.“",
      },
      {
        kind: "short_answer",
        text: "Was hilft mehr als eine Massage im Monat?",
        options: [],
        answer: 0,
        accept: ["fünf Minuten jeden Abend", "jeden Abend fünf Minuten", "fünf Minuten"],
        explain: "„Wer sich jeden Abend fünf Minuten Zeit nimmt, entspannt sich mehr.“",
      },
      {
        text: "Eine Massage löst das Problem.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Eine Massage ist schön, aber sie löst das Problem nicht.“",
      },
    ],
  },
  {
    id: "a2-u08-r2",
    level: "A2",
    skill: "reading",
    unit: 8,
    title: "Einladung zur Vorsorge",
    genre: "Bilgilendirme",
    intro: "Muayenehaneden gelen kontrol daveti. Ne yapılıyor, ne getirilmeli?",
    gloss: [
      { de: "die Gesundheit", tr: "sağlık", en: "health" },
      { de: "kontrollieren", tr: "kontrol etmek", en: "to check" },
      { de: "jährlich", tr: "yıllık", en: "annually" },
      { de: "die Blutprobe", tr: "kan örneği", en: "blood sample" },
      { de: "der Blutzucker", tr: "kan şekeri", en: "blood sugar" },
      { de: "die Lunge", tr: "akciğer", en: "lung" },
      { de: "impfen", tr: "aşılamak", en: "to vaccinate" },
      { de: "fit sein", tr: "formda olmak", en: "to be fit" },
    ],
    minutes: 4,
    text:
      "EINLADUNG ZUR JÄHRLICHEN VORSORGE\n\n" +
      "Sehr geehrte Patientin, sehr geehrter Patient,\n\n" +
      "einmal im Jahr sollte man die wichtigsten Werte kontrollieren lassen — auch wenn man sich gesund fühlt und fit ist.\n\n" +
      "Bei uns dauert die Untersuchung etwa dreißig Minuten. Wir nehmen eine Blutprobe, messen den Blutzucker und hören Herz und Lunge ab.\n\n" +
      "Bitte kommen Sie nüchtern, das heißt: seit dem Abend vorher nichts essen. Wasser dürfen Sie trinken.\n\n" +
      "Wenn Sie möchten, impfen wir Sie beim selben Termin gegen Grippe. Sagen Sie das bitte am Empfang, dann planen wir zehn Minuten mehr ein.\n\n" +
      "Ihre Gesundheit ist uns wichtig.",
    questions: [
      {
        text: "Wie lange dauert die Untersuchung?",
        options: ["Zehn Minuten", "Etwa dreißig Minuten", "Eine Stunde"],
        answer: 1,
        explain: "„Bei uns dauert die Untersuchung etwa dreißig Minuten.“ On dakika, aşı için eklenen süre.",
      },
      {
        kind: "gapfill",
        text: "Einmal im Jahr ___ man die wichtigsten Werte kontrollieren lassen.",
        options: [],
        answer: 0,
        accept: ["sollte"],
        explain: "Belirsiz özne tekildir ve kip fiilinin yumuşak biçimini alır: man sollte.",
      },
      {
        text: "Was darf man vorher trinken?",
        options: ["Kaffee", "Wasser", "Nichts"],
        answer: 1,
        explain: "„Bitte kommen Sie nüchtern … Wasser dürfen Sie trinken.“",
      },
      {
        kind: "short_answer",
        text: "Wo soll man die Impfung anmelden?",
        options: [],
        answer: 0,
        accept: ["am Empfang", "Empfang"],
        explain: "„Sagen Sie das bitte am Empfang, dann planen wir zehn Minuten mehr ein.“",
      },
      {
        text: "Die Vorsorge ist nur für kranke Menschen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „auch wenn man sich gesund fühlt und fit ist“.",
      },
    ],
  },
  {
    id: "a2-u08-l1",
    level: "A2",
    skill: "listening",
    unit: 8,
    title: "Kannst du mir das leihen?",
    genre: "Diyalog",
    intro: "Komşular arasında ödünç alma. Ne veriliyor, ne zaman geri gelecek?",
    gloss: [
      { de: "der Schirm", tr: "şemsiye", en: "umbrella" },
      { de: "die Pflanze", tr: "bitki", en: "plant" },
      { de: "der Zettel", tr: "not kâğıdı", en: "note" },
      { de: "die Telefonnummer", tr: "telefon numarası", en: "phone number" },
      { de: "weitersagen", tr: "başkasına söylemek", en: "to pass on" },
      { de: "liefern", tr: "teslim etmek", en: "to deliver" },
      { de: "das Ding", tr: "şey", en: "thing" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Nadia", text: "Entschuldige die Störung. Es regnet, und mein Schirm ist kaputt. Kannst du mir deinen leihen?" },
      { speaker: "Ole", text: "Klar, nimm den blauen. Den brauche ich heute nicht." },
      { speaker: "Nadia", text: "Danke! Ich gebe ihn dir morgen früh zurück." },
      { speaker: "Ole", text: "Kein Stress. Sag mal, kannst du am Wochenende meine Pflanzen gießen? Wir fahren weg." },
      { speaker: "Nadia", text: "Mache ich gern. Schreib mir bitte auf einen Zettel, wie oft." },
      { speaker: "Ole", text: "Gute Idee. Und ich gebe dir meine Telefonnummer, falls etwas ist." },
      { speaker: "Nadia", text: "Perfekt. Ach, und am Samstag liefert jemand ein großes Ding für euch — soll ich das annehmen?" },
      { speaker: "Ole", text: "Ja, bitte. Aber sag es bitte nicht weiter, es ist ein Geschenk." },
    ],
    questions: [
      {
        text: "Warum braucht Nadia einen Schirm?",
        options: ["Ihrer ist kaputt.", "Sie hat keinen.", "Ihrer ist zu klein."],
        answer: 0,
        explain: "„Es regnet, und mein Schirm ist kaputt.“",
      },
      {
        kind: "gapfill",
        text: "Ich gebe ___ dir morgen früh zurück.",
        options: [],
        answer: 0,
        accept: ["ihn"],
        explain: "İki nesne de zamirse belirtme hâlindeki ÖNE geçer: „gebe ihn dir“, „gebe dir ihn“ değil.",
      },
      {
        text: "Was soll Nadia am Wochenende machen?",
        options: ["Die Wohnung putzen", "Die Pflanzen gießen", "Den Hund füttern"],
        answer: 1,
        explain: "„kannst du am Wochenende meine Pflanzen gießen?“",
      },
      {
        kind: "dictation",
        text: "Ole'nin hediyeyle ilgili ricasını yaz.",
        options: [],
        answer: 0,
        accept: ["Aber sag es bitte nicht weiter, es ist ein Geschenk."],
        explain: "Emirde ayrılabilen ön ek cümlenin sonuna düşer: „sag … weiter“.",
      },
    ],
  },
  {
    id: "a2-u08-l2",
    level: "A2",
    skill: "listening",
    unit: 8,
    title: "Im Fundbüro",
    genre: "Diyalog",
    intro: "Kayıp eşya bürosunda. Hangi eşya kimin?",
    gloss: [
      { de: "gehören", tr: "ait olmak", en: "to belong to" },
      { de: "die Geldbörse", tr: "cüzdan", en: "wallet" },
      { de: "der Handschuh", tr: "eldiven", en: "glove" },
      { de: "die Mütze", tr: "bere", en: "hat" },
      { de: "der Kopfhörer", tr: "kulaklık", en: "headphones" },
      { de: "die Brille", tr: "gözlük", en: "glasses" },
      { de: "jemand", tr: "biri", en: "someone" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Beamter", text: "Guten Tag. Was haben Sie denn verloren?" },
      { speaker: "Frau Wolf", text: "Eine Geldbörse, braun, ziemlich alt. Im Bus der Linie 12, gestern Nachmittag." },
      { speaker: "Beamter", text: "Moment. Wir haben gestern drei Sachen aus der Linie 12 bekommen: eine Mütze, einen Kopfhörer und eine Geldbörse." },
      { speaker: "Frau Wolf", text: "Die Geldbörse! Ist sie braun?" },
      { speaker: "Beamter", text: "Ja. Können Sie mir sagen, was darin ist?" },
      { speaker: "Frau Wolf", text: "Zwanzig Euro, meine Karte und ein Foto von meiner Tochter." },
      { speaker: "Beamter", text: "Das stimmt. Dann gehört sie Ihnen. Unterschreiben Sie bitte hier." },
      { speaker: "Frau Wolf", text: "Vielen Dank! Und die Handschuhe da — wem gehören die?" },
      { speaker: "Beamter", text: "Keine Ahnung. Die liegen seit zwei Wochen hier, und niemand hat sich gemeldet." },
    ],
    questions: [
      {
        text: "Was hat Frau Wolf verloren?",
        options: ["Eine Mütze", "Eine Geldbörse", "Einen Kopfhörer"],
        answer: 1,
        explain: "„Eine Geldbörse, braun, ziemlich alt.“ Öteki ikisi aynı hattan gelen başka eşyalar.",
      },
      {
        kind: "gapfill",
        text: "Dann ___ sie Ihnen.",
        options: [],
        answer: 0,
        accept: ["gehört"],
        explain: "Aitlik fiilinde eşya ÖZNE, sahibi yönelme hâlindedir: „sie gehört Ihnen“.",
      },
      {
        text: "Woher weiß der Beamte, dass es ihre Geldbörse ist?",
        options: ["Sie hat einen Ausweis.", "Sie sagt, was darin ist.", "Ihr Name steht darauf."],
        answer: 1,
        explain: "„Können Sie mir sagen, was darin ist?“ — içindekileri doğru saydığı için.",
      },
      {
        kind: "short_answer",
        text: "Wie lange liegen die Handschuhe schon dort?",
        options: [],
        answer: 0,
        accept: ["seit zwei Wochen", "zwei Wochen"],
        explain: "„Die liegen seit zwei Wochen hier, und niemand hat sich gemeldet.“",
      },
    ],
  },
  {
    id: "a2-u08-w1",
    level: "A2",
    skill: "writing",
    unit: 8,
    title: "Wem gehört was?",
    genre: "Dil bilgisi",
    intro: "Üç sıralama kuralı: dönüşlü zamirin yeri, iki nesnenin sırası ve aitlik fiilinin hâli.",
    gloss: [
      { de: "sich entspannen", tr: "rahatlamak", en: "to relax" },
      { de: "gehören", tr: "ait olmak", en: "to belong to" },
      { de: "die Mütze", tr: "bere", en: "hat" },
      { de: "der Zettel", tr: "not kâğıdı", en: "note" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Rahatlamam gerekiyor.",
        answer: "Ich muss mich entspannen",
        hint: "Dönüşlü zamir kip fiilinden HEMEN sonra durur; asıl fiil sona gider.",
      },
      {
        kind: "build",
        tr: "Sana notu veriyorum.",
        answer: "Ich gebe dir den Zettel",
        hint: "İki nesne varsa kişi önce ve yönelme hâlinde, şey sonra ve belirtme hâlinde.",
      },
      {
        kind: "build",
        tr: "Bu bere bana ait.",
        answer: "Diese Mütze gehört mir",
        hint: "Aitlik fiilinde eşya ÖZNE olur, sahibi yönelme hâlinde durur — Türkçedeki „bana ait“ gibi.",
      },
      {
        kind: "rewrite",
        prompt: "Nesneyi zamire çevir ve sırayı düzelt.",
        source: "Ich gebe dir den Zettel.",
        answer: "Ich gebe ihn dir.",
        alternatives: ["Ich gebe ihn dir"],
        why: "İki nesne de zamir olunca belirtme hâlindeki öne geçer: ihn dir, „dir ihn“ değil.",
      },
    ],
  },
  {
    id: "a2-u08-w2",
    level: "A2",
    skill: "writing",
    unit: 8,
    title: "Einen Tipp gegen Stress geben",
    genre: "Forum mesajı",
    intro: "Foruma cevap yaz: stresle nasıl baş ediyorsun, iki somut öneri ver.",
    gloss: [
      { de: "abschalten", tr: "kafa dağıtmak", en: "to switch off" },
      { de: "sich entspannen", tr: "rahatlamak", en: "to relax" },
      { de: "sich hinlegen", tr: "uzanmak", en: "to lie down" },
      { de: "unruhig", tr: "huzursuz", en: "restless" },
      { de: "sich ausschlafen", tr: "uykusunu almak", en: "to catch up on sleep" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "reply",
        prompt: "Forumdaki mesaja cevap yaz. Kendi durumunu anlat ve en az iki somut öneri ver.",
        stimulus:
          "FORUM · Alltag\n\nHallo zusammen. Ich bin seit Wochen sehr gestresst. Abends liege ich im Bett und kann einfach nicht abschalten — der Kopf arbeitet weiter und ich bin total unruhig.\n\nWas macht ihr, wenn es euch so geht?",
        checklist: [
          "Kendi deneyiminden bir cümle yazdın mı?",
          "En az iki somut öneri verdin mi („Du solltest …“)?",
          "En az bir dönüşlü fiili doğru sırayla kullandın mı („Ich muss mich …“)?",
          "Genel bir tavsiyeyi „man sollte“ ile yazdın mı?",
        ],
        minWords: 40,
        phrases: [
          { de: "Bei mir hilft …", tr: "bende … işe yarıyor", en: "what helps me is …" },
          { de: "Du solltest dich abends hinlegen.", tr: "akşamları uzansan iyi olur", en: "you should lie down in the evening" },
          { de: "Man sollte das Handy weglegen.", tr: "telefonu bir kenara koymalı", en: "one should put the phone away" },
        ],
        sample:
          "Hallo,\n\ndas kenne ich sehr gut. Letztes Jahr war ich auch monatelang unruhig und konnte abends nicht abschalten.\n\nBei mir haben zwei Dinge geholfen. Erstens: Du solltest nach dem Essen zehn Minuten spazieren gehen, auch bei schlechtem Wetter. Zweitens: Man sollte das Handy eine halbe Stunde vor dem Schlafen weglegen. Das klingt einfach, aber es ist wirklich schwer.\n\nUnd am Wochenende muss ich mich einmal richtig ausschlafen, sonst geht es die ganze Woche nicht.\n\nGute Besserung!\nTarek",
      },
    ],
  },
];
