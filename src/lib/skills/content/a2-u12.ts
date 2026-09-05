import type { SkillExercise } from "../types";

/**
 * A2 · Ünite 12 — "Toplantı, telefon, mola, izin".
 *
 * Dört ders: Das Team-Meeting · Ein Anruf für Sie · In der Mittagspause ·
 * Urlaub beantragen. İçerik ünite 1-12'nin kelimeleriyle sınırlı.
 *
 *   Ünite 12: dass, der Vorschlag, auf jeden Fall, das Projekt, betonen,
 *             diskutieren, berichten, meinen · zurückrufen, auflegen,
 *             das Telefonat, die Mailbox, dranbleiben, erreichen,
 *             die Handynummer, notieren · die Mittagspause, die Kaffeepause,
 *             die Cafeteria, das Mittagessen, die Portion, die Beilage,
 *             das Gericht, die Selbstbedienung · der Urlaubstag,
 *             der Kalender, vereinbaren, schriftlich, notfalls, künftig,
 *             die Geschäftsreise, frühestens
 *   Kalıplar: Ich denke, dass das eine gute Idee ist. · Ich habe einen
 *             Vorschlag. · Ich sage ihm, dass Sie angerufen haben. ·
 *             Können Sie bitte dranbleiben? · Ich esse lieber … ·
 *             Können wir einen Termin vereinbaren?
 *
 * Çekirdek `dass` yan cümlesi ve onun en zor hâli: yan cümlede GEÇMİŞ ZAMAN
 * varsa yardımcı fiil ortacın ARKASINA, en sona gider ("… dass Sie angerufen
 * haben"). A2'de en sık ters kurulan sıralama bu, o yüzden hem dinlemede
 * hem yazmada ayrı ayrı ölçülüyor.
 */
export const a2U12: SkillExercise[] = [
  {
    id: "a2-u12-r1",
    level: "A2",
    skill: "reading",
    unit: 12,
    title: "Protokoll vom Team-Meeting",
    genre: "Tutanak",
    intro: "Toplantı notları. Kim ne önerdi, neye karar verildi?",
    gloss: [
      { de: "der Vorschlag", tr: "öneri", en: "proposal" },
      { de: "das Projekt", tr: "proje", en: "project" },
      { de: "berichten", tr: "bildirmek", en: "to report" },
      { de: "betonen", tr: "vurgulamak", en: "to emphasise" },
      { de: "diskutieren", tr: "tartışmak", en: "to discuss" },
      { de: "meinen", tr: "demek istemek", en: "to think" },
      { de: "auf jeden Fall", tr: "kesinlikle", en: "definitely" },
      { de: "dass", tr: "ki", en: "that" },
    ],
    minutes: 4,
    text:
      "PROTOKOLL — Team-Meeting am 12. März, 9 bis 10 Uhr\n\n" +
      "1. Frau Klein hat über das neue Projekt berichtet. Der Start ist im April.\n\n" +
      "2. Timo hatte einen Vorschlag: Wir sollen die Kunden künftig einmal pro Woche informieren, nicht einmal pro Monat. Wir haben lange darüber diskutiert. Herr Nowak meint, dass eine Woche zu kurz ist. Frau Klein denkt, dass es funktioniert.\n\n" +
      "3. Entschieden: Wir probieren es zwei Monate lang. Danach schauen wir noch einmal.\n\n" +
      "4. Herr Bergmann hat betont, dass alle Termine im gemeinsamen Kalender stehen müssen. Das ist auf jeden Fall wichtig, weil sonst niemand weiß, wer wann im Haus ist.\n\n" +
      "Nächstes Meeting: 19. März, 9 Uhr.",
    questions: [
      {
        text: "Was hat Timo vorgeschlagen?",
        options: ["Die Kunden öfter zu informieren", "Das Projekt zu verschieben", "Längere Meetings"],
        answer: 0,
        explain: "„Wir sollen die Kunden künftig einmal pro Woche informieren, nicht einmal pro Monat.“",
      },
      {
        kind: "gapfill",
        text: "Herr Nowak meint, ___ eine Woche zu kurz ist.",
        options: [],
        answer: 0,
        accept: ["dass"],
        explain: "Düşünme ve söyleme fiillerinden sonra bu bağlaç gelir ve yan cümlede fiil sona gider.",
      },
      {
        text: "Wie wurde entschieden?",
        options: ["Der Vorschlag wurde abgelehnt.", "Sie probieren es zwei Monate.", "Sie diskutieren nächste Woche weiter."],
        answer: 1,
        explain: "„Entschieden: Wir probieren es zwei Monate lang.“",
      },
      {
        kind: "short_answer",
        text: "Wann ist das nächste Meeting?",
        options: [],
        answer: 0,
        accept: ["19. März", "am 19. März", "19. März, 9 Uhr"],
        explain: "„Nächstes Meeting: 19. März, 9 Uhr.“",
      },
      {
        text: "Frau Klein hält Timos Vorschlag für unmöglich.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Frau Klein denkt, dass es funktioniert.“ Şüpheli olan Herr Nowak.",
      },
    ],
  },
  {
    id: "a2-u12-r2",
    level: "A2",
    skill: "reading",
    unit: 12,
    title: "Speiseplan der Cafeteria",
    genre: "Bilgilendirme",
    intro: "İş yerindeki kafeteryanın haftalık menüsü ve kuralları.",
    gloss: [
      { de: "die Cafeteria", tr: "kafeterya", en: "cafeteria" },
      { de: "das Gericht", tr: "yemek", en: "dish" },
      { de: "die Beilage", tr: "garnitür", en: "side dish" },
      { de: "die Portion", tr: "porsiyon", en: "portion" },
      { de: "die Selbstbedienung", tr: "self servis", en: "self-service" },
      { de: "die Mittagspause", tr: "öğle molası", en: "lunch break" },
      { de: "die Kaffeepause", tr: "kahve molası", en: "coffee break" },
      { de: "das Mittagessen", tr: "öğle yemeği", en: "lunch" },
    ],
    minutes: 4,
    text:
      "CAFETERIA — DIESE WOCHE\n\n" +
      "Mittagessen gibt es von 11:30 bis 14:00 Uhr. In der Cafeteria ist Selbstbedienung: Sie nehmen Ihr Tablett am Eingang und bezahlen am Ende.\n\n" +
      "Montag: Nudeln mit Tomatensoße · Beilage: Salat\n" +
      "Dienstag: Hähnchen mit Reis · Beilage: Gemüse\n" +
      "Mittwoch: nur kalte Gerichte, weil die Küche renoviert wird\n" +
      "Donnerstag: Suppe und Brot\n" +
      "Freitag: Fisch mit Kartoffeln · Beilage: Salat\n\n" +
      "Jedes Gericht kostet 4,50 Euro. Eine kleine Portion kostet 3,20 Euro — bitte sagen Sie das an der Kasse.\n\n" +
      "Nach 14 Uhr gibt es nur noch Kaffee und Kuchen. Für die Kaffeepause am Nachmittag ist der Raum bis 16:30 offen.",
    questions: [
      {
        text: "Wie lange gibt es Mittagessen?",
        options: ["Von 11:30 bis 14:00", "Von 12:00 bis 16:30", "Den ganzen Tag"],
        answer: 0,
        explain: "„Mittagessen gibt es von 11:30 bis 14:00 Uhr.“ 16:30 kahve molasının bitişi.",
      },
      {
        kind: "gapfill",
        text: "In der Cafeteria ist ___.",
        options: [],
        answer: 0,
        accept: ["Selbstbedienung"],
        explain: "Tepsiyi girişte alıp sonunda ödüyorsunuz — self servis.",
      },
      {
        text: "Warum gibt es am Mittwoch nur kalte Gerichte?",
        options: ["Es ist ein Feiertag.", "Die Küche wird renoviert.", "Es kommen wenige Gäste."],
        answer: 1,
        explain: "„nur kalte Gerichte, weil die Küche renoviert wird“.",
      },
      {
        kind: "short_answer",
        text: "Was kostet eine kleine Portion?",
        options: [],
        answer: 0,
        accept: ["3,20 Euro", "3,20", "drei Euro zwanzig"],
        explain: "„Eine kleine Portion kostet 3,20 Euro — bitte sagen Sie das an der Kasse.“",
      },
      {
        text: "Am Freitag gibt es Gemüse als Beilage.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: cuma „Beilage: Salat“. Sebze salı günü.",
      },
    ],
  },
  {
    id: "a2-u12-l1",
    level: "A2",
    skill: "listening",
    unit: 12,
    title: "Ein Anruf für Frau Klein",
    genre: "Telefon görüşmesi",
    intro: "Aranan kişi yerinde yok. Mesaj nasıl alınıyor?",
    gloss: [
      { de: "erreichen", tr: "ulaşmak", en: "to reach" },
      { de: "dranbleiben", tr: "hatta kalmak", en: "to hold the line" },
      { de: "die Mailbox", tr: "telesekreter", en: "voicemail" },
      { de: "zurückrufen", tr: "geri aramak", en: "to call back" },
      { de: "notieren", tr: "not almak", en: "to note down" },
      { de: "die Handynummer", tr: "cep telefonu numarası", en: "mobile number" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Herr Vidal", text: "Guten Tag, Vidal von der Firma Kranz. Kann ich bitte Frau Klein sprechen?" },
      { speaker: "Timo", text: "Einen Moment bitte, können Sie kurz dranbleiben?" },
      { speaker: "Timo", text: "Es tut mir leid, Frau Klein ist heute im Außendienst. Sie erreichen sie erst morgen." },
      { speaker: "Herr Vidal", text: "Schade. Ich habe es schon zweimal versucht und nur die Mailbox gehört." },
      { speaker: "Timo", text: "Soll ich ihr etwas ausrichten? Ich sage ihr gern, dass Sie angerufen haben." },
      { speaker: "Herr Vidal", text: "Ja, bitte. Es geht um das Angebot vom Montag." },
      { speaker: "Timo", text: "Gut, das notiere ich. Geben Sie mir bitte Ihre Handynummer?" },
      { speaker: "Herr Vidal", text: "Gern: null eins sieben zwei, drei drei vier acht." },
      { speaker: "Timo", text: "Danke. Frau Klein ruft Sie morgen früh zurück." },
    ],
    questions: [
      {
        text: "Warum ist Frau Klein nicht da?",
        options: ["Sie ist krank.", "Sie ist im Außendienst.", "Sie ist in der Mittagspause."],
        answer: 1,
        explain: "„Frau Klein ist heute im Außendienst. Sie erreichen sie erst morgen.“",
      },
      {
        kind: "gapfill",
        text: "Ich sage ihr gern, dass Sie angerufen ___.",
        options: [],
        answer: 0,
        accept: ["haben"],
        explain: "Yan cümlede geçmiş zamanın yardımcı fiili ortacın ARKASINA, en sona gider.",
      },
      {
        text: "Was hat Herr Vidal vorher gehört?",
        options: ["Die Mailbox", "Einen Kollegen", "Nichts"],
        answer: 0,
        explain: "„Ich habe es schon zweimal versucht und nur die Mailbox gehört.“",
      },
      {
        kind: "dictation",
        text: "Timo'nun hatta kalmasını rica ettiği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Einen Moment bitte, können Sie kurz dranbleiben?"],
        explain: "Ayrılabilen fiil kip fiiliyle birlikte bölünmeden sonda durur: „können Sie … dranbleiben“.",
      },
    ],
  },
  {
    id: "a2-u12-l2",
    level: "A2",
    skill: "listening",
    unit: 12,
    title: "Urlaub beantragen",
    genre: "Diyalog",
    intro: "Yöneticiyle izin görüşmesi. Hangi tarihte anlaşıyorlar?",
    gloss: [
      { de: "der Urlaubstag", tr: "izin günü", en: "day of leave" },
      { de: "vereinbaren", tr: "kararlaştırmak", en: "to agree on" },
      { de: "schriftlich", tr: "yazılı", en: "in writing" },
      { de: "frühestens", tr: "en erken", en: "at the earliest" },
      { de: "die Geschäftsreise", tr: "iş seyahati", en: "business trip" },
      { de: "der Kalender", tr: "takvim", en: "calendar" },
      { de: "notfalls", tr: "gerekirse", en: "if necessary" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Frau Petrow", text: "Sie wollten wegen Urlaub sprechen. Wann hätten Sie denn frei?" },
      { speaker: "Sinan", text: "Am liebsten die erste Juliwoche. Ich habe noch zwölf Urlaubstage." },
      { speaker: "Frau Petrow", text: "Moment, ich schaue in den Kalender. Im Juli ist die Geschäftsreise nach Wien." },
      { speaker: "Sinan", text: "Stimmt, die hatte ich vergessen. Wann genau ist die?" },
      { speaker: "Frau Petrow", text: "Vom zweiten bis zum fünften. Frühestens ab dem achten wäre es also möglich." },
      { speaker: "Sinan", text: "Dann nehme ich den achten bis fünfzehnten. Passt das?" },
      { speaker: "Frau Petrow", text: "Ja, das können wir so vereinbaren. Bitte stellen Sie den Antrag noch schriftlich." },
      { speaker: "Sinan", text: "Mache ich heute noch. Und notfalls bin ich per Handy erreichbar." },
      { speaker: "Frau Petrow", text: "Das ist nicht nötig. Urlaub ist Urlaub." },
    ],
    questions: [
      {
        text: "Wie viele Urlaubstage hat Sinan noch?",
        options: ["Acht", "Zwölf", "Fünfzehn"],
        answer: 1,
        explain: "„Ich habe noch zwölf Urlaubstage.“ Sekiz ve on beş, sonunda anlaşılan tarihler.",
      },
      {
        kind: "gapfill",
        text: "___ ab dem achten wäre es also möglich.",
        options: [],
        answer: 0,
        accept: ["Frühestens", "frühestens"],
        explain: "İş seyahati beşine kadar sürdüğü için izin en erken sekizinde başlayabiliyor.",
      },
      {
        text: "Was muss Sinan noch machen?",
        options: ["Den Antrag schriftlich stellen", "Die Reise buchen", "Den Kalender aktualisieren"],
        answer: 0,
        explain: "„Bitte stellen Sie den Antrag noch schriftlich.“",
      },
      {
        kind: "short_answer",
        text: "Wann ist die Geschäftsreise nach Wien?",
        options: [],
        answer: 0,
        accept: ["vom zweiten bis zum fünften", "vom 2. bis zum 5.", "zweiten bis fünften"],
        explain: "„Vom zweiten bis zum fünften.“",
      },
    ],
  },
  {
    id: "a2-u12-w1",
    level: "A2",
    skill: "writing",
    unit: 12,
    title: "dass — und wohin geht das Verb?",
    genre: "Dil bilgisi",
    intro: "Yan cümlede fiil sona gider. Geçmiş zaman varsa yardımcı fiil EN sona.",
    gloss: [
      { de: "dass", tr: "ki", en: "that" },
      { de: "der Vorschlag", tr: "öneri", en: "proposal" },
      { de: "zurückrufen", tr: "geri aramak", en: "to call back" },
      { de: "vereinbaren", tr: "kararlaştırmak", en: "to agree on" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Bence bu iyi bir öneri.",
        answer: "Ich denke, dass das ein guter Vorschlag ist",
        hint: "Yan cümlede fiil EN SONA gider: „… dass das ein guter Vorschlag ist“.",
      },
      {
        kind: "build",
        tr: "Ona sizin aradığınızı söyleyeceğim.",
        answer: "Ich sage ihm, dass Sie angerufen haben",
        hint: "Yan cümlede geçmiş zaman var: ortaç önce, yardımcı fiil EN sonda — „angerufen haben“.",
      },
      {
        kind: "build",
        tr: "Bir randevu kararlaştırabilir miyiz?",
        answer: "Können wir einen Termin vereinbaren",
        hint: "Kip fiili başa geçince cümle soru olur ve asıl fiil sonda kalır.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: yan cümlede fiil nerede durur?",
        source: "Ich denke, dass das Projekt ist sehr gut.",
        answer: "Ich denke, dass das Projekt sehr gut ist.",
        alternatives: ["Ich denke, dass das Projekt sehr gut ist"],
        why: "Bu bağlaçtan sonra fiil ikinci sıraya değil EN SONA gider.",
      },
    ],
  },
  {
    id: "a2-u12-w2",
    level: "A2",
    skill: "writing",
    unit: 12,
    title: "Einen Urlaubsantrag schreiben",
    genre: "Resmî yazı",
    intro: "Yöneticine yazılı izin talebi yaz: hangi tarihler, kaç gün, yokluğunda ne olacak?",
    gloss: [
      { de: "der Urlaubstag", tr: "izin günü", en: "day of leave" },
      { de: "schriftlich", tr: "yazılı", en: "in writing" },
      { de: "vereinbaren", tr: "kararlaştırmak", en: "to agree on" },
      { de: "die Geschäftsreise", tr: "iş seyahati", en: "business trip" },
      { de: "dass", tr: "ki", en: "that" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "reply",
        prompt: "Yöneticinin isteği üzerine yazılı izin talebini yaz. Tarihleri ve gün sayısını belirt, konuştuğunuzu hatırlat ve yokluğunda işlerin nasıl yürüyeceğine dair bir cümle ekle.",
        stimulus:
          "Betreff: Urlaub Juli\n\nHallo,\n\nwie besprochen: Ihr Urlaub ist vom 8. bis 15. Juli möglich, weil vom 2. bis 5. die Geschäftsreise nach Wien stattfindet.\n\nBitte stellen Sie den Antrag noch schriftlich.\n\nViele Grüße\nA. Petrow",
        checklist: [
          "Resmî hitapla ve konu cümlesiyle başladın mı?",
          "Tarihleri ve kaç izin günü olduğunu yazdın mı?",
          "Konuştuğunuzu bir „dass“ cümlesiyle hatırlattın mı?",
          "Yokluğunda işlerin nasıl yürüyeceğine dair bir cümle ekledin mi?",
        ],
        minWords: 45,
        phrases: [
          { de: "Hiermit beantrage ich Urlaub vom … bis …", tr: "…-den …-e izin talep ediyorum", en: "I hereby request leave from … to …" },
          { de: "Wie besprochen …", tr: "konuştuğumuz gibi", en: "as discussed" },
          { de: "Meine Aufgaben übernimmt …", tr: "işlerimi … devralıyor", en: "my tasks will be taken over by …" },
        ],
        sample:
          "Betreff: Urlaubsantrag 8. bis 15. Juli\n\nSehr geehrte Frau Petrow,\n\nhiermit beantrage ich Urlaub vom 8. bis zum 15. Juli, also sechs Arbeitstage. Danach habe ich noch sechs Urlaubstage übrig.\n\nWie besprochen habe ich die erste Juliwoche nicht gewählt, weil in dieser Zeit die Geschäftsreise nach Wien stattfindet. Ich denke, dass der spätere Termin für das Team besser ist.\n\nMeine Aufgaben übernimmt in dieser Zeit Frau Klein. Die offenen Punkte trage ich vorher in den gemeinsamen Kalender ein.\n\nMit freundlichen Grüßen\nSinan Aydın",
      },
    ],
  },
];
