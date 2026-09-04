import type { SkillExercise } from "../types";

/**
 * A1 · Ünite 23 — "Sağlık, diş hekimi, telefon ve mesaj".
 *
 * Dört ders: Gesund leben · Beim Zahnarzt · Am Telefon ·
 * Eine Nachricht schreiben. İçerik ünite 1-23'ün kelimeleriyle sınırlı.
 *
 *   Ünite 23: gesund, rauchen, genug, sich bewegen, wichtig, leben,
 *             das Ergebnis, hoch · der Zahn, der Zahnarzt, der Mund,
 *             öffnen, ziehen, die Angst, der Schluss, möchten · das Handy,
 *             klingeln, später, zurückrufen, falsch, das Telefon,
 *             die Vorwahl, das Wiederhören · die Nachricht, schicken,
 *             der Gruß, lieb, bald, der Brief, die E-Mail, die Briefmarke
 *
 * ÜÇ ALMANCAYA ÖZGÜ NOKTA — üçü de Türkçeden aktarılamaz:
 *
 * 1) "Auf Wiederhören" YALNIZ telefonda söylenir; yüz yüze "Auf Wiedersehen"
 *    denir. Kök fark: hören (duymak) ↔ sehen (görmek). Telefonda karşındakini
 *    görmediğin için "yine görüşürüz" mantıksız kaçar. Öğrencinin en sık
 *    yaptığı hata telefonu "Auf Wiedersehen" ile kapatmaktır.
 *
 * 2) Telefonu ADINI SÖYLEYEREK açarsın: "Yılmaz?" ya da "Hier ist Elif
 *    Yılmaz." Türkçedeki "alo" karşılığı "hallo" DEĞİLDİR; adsız açmak
 *    Almanya'da eksik sayılır. Dinleme egzersizi bunu iki uçta da gösteriyor.
 *
 * 3) Mektup/e-posta kapanışı ilişkiye göre ikiye ayrılır ve karıştırılmaz:
 *    "Liebe Grüße" arkadaşa, "Mit freundlichen Grüßen" resmî yazışmaya.
 *    İş başvurusunu "Liebe Grüße" ile bitirmek ciddiyetsiz görünür.
 *
 * "zurückrufen" ayrılabilir: "Ich rufe dich später zurück." — önek SONA gider.
 */
export const a1U23: SkillExercise[] = [
  {
    id: "a1-u23-r1",
    level: "A1",
    skill: "reading",
    unit: 23,
    title: "Gesund leben",
    genre: "Broşür",
    intro: "Sağlık ocağının broşürü. Beş öneri.",
    gloss: [
      { de: "gesund", tr: "sağlıklı", en: "healthy" },
      { de: "sich bewegen", tr: "hareket etmek", en: "to move, exercise" },
      { de: "genug", tr: "yeterli", en: "enough" },
      { de: "rauchen", tr: "sigara içmek", en: "to smoke" },
    ],
    minutes: 3,
    text:
      "Gesund leben — fünf einfache Sachen\n\n1. Bewegen Sie sich! Dreißig Minuten pro Tag sind genug. Gehen Sie zu Fuß oder nehmen Sie das Fahrrad.\n\n2. Schlafen Sie sieben oder acht Stunden. Zu wenig Schlaf macht krank.\n\n3. Trinken Sie viel Wasser — das ist sehr wichtig.\n\n4. Rauchen Sie nicht. Das ist am wichtigsten.\n\n5. Gehen Sie einmal im Jahr zum Arzt und zum Zahnarzt — auch ohne Schmerzen.\n\nSie haben Fragen? Rufen Sie uns an: Vorwahl 0231, dann 55 44 33.",
    questions: [
      {
        text: "Wie lange soll man sich pro Tag bewegen?",
        options: ["dreißig Minuten", "eine Stunde", "zwei Stunden"],
        answer: 0,
        explain: "„Dreißig Minuten pro Tag sind genug.“",
      },
      {
        text: "Was ist am wichtigsten?",
        options: ["nicht rauchen", "viel trinken", "genug schlafen"],
        answer: 0,
        explain: "„Rauchen Sie nicht. Das ist am wichtigsten.“",
      },
      {
        kind: "gapfill",
        text: "Man soll viel ___ trinken.",
        options: [],
        answer: 0,
        accept: ["Wasser"],
        explain: "„Trinken Sie viel Wasser — das ist sehr wichtig.“",
      },
      {
        text: "Wie oft soll man zum Zahnarzt gehen?",
        options: ["einmal im Jahr", "nur bei Schmerzen", "jeden Monat"],
        answer: 0,
        explain: "„Gehen Sie einmal im Jahr zum Arzt und zum Zahnarzt — auch ohne Schmerzen.“",
      },
      {
        kind: "gapfill",
        text: "Die ___ ist 0231.",
        options: [],
        answer: 0,
        accept: ["Vorwahl"],
        explain: "„Vorwahl 0231“ — şehir kodu. Almanya'da her şehrin kendi Vorwahl'ı var.",
      },
    ],
  },
  {
    id: "a1-u23-r2",
    level: "A1",
    skill: "reading",
    unit: 23,
    title: "Zwei Nachrichten",
    genre: "E-posta",
    intro:
      "Aynı kişi iki mesaj yazıyor: biri arkadaşına, biri muayenehaneye. Kapanışlara dikkat.",
    gloss: [
      { de: "der Gruß", tr: "selam", en: "greeting" },
      { de: "die Nachricht", tr: "mesaj", en: "message" },
      { de: "schicken", tr: "göndermek", en: "to send" },
      { de: "Mit freundlichen Grüßen", tr: "Saygılarımla (resmî)", en: "Yours sincerely" },
      { de: "Sehr geehrte …", tr: "Sayın … (resmî hitap)", en: "Dear … (formal)" },
      { de: "ändern", tr: "değiştirmek", en: "to change" },
    ],
    minutes: 3,
    text:
      "A — an eine Freundin\n\nHallo Mia,\n\nwie geht es dir? Ich möchte dich bald wieder sehen. Hast du am Samstag Zeit? Schick mir eine Nachricht oder ruf mich an.\n\nLiebe Grüße\nElif\n\n\nB — an die Praxis\n\nSehr geehrte Frau Dr. Weber,\n\nich möchte meinen Termin am Mittwoch um 10 Uhr ändern. Ist ein Termin am Freitag möglich? Meine Nummer ist 0231 / 55 44 33.\n\nMit freundlichen Grüßen\nElif Yılmaz",
    questions: [
      {
        text: "Wie endet die Nachricht an die Freundin?",
        options: ["Liebe Grüße", "Mit freundlichen Grüßen", "Auf Wiederhören"],
        answer: 0,
        explain: "Arkadaşa „Liebe Grüße“.",
      },
      {
        text: "Warum schreibt Elif an die Praxis?",
        options: [
          "Sie möchte ihren Termin ändern.",
          "Sie ist krank.",
          "Sie braucht ein Rezept.",
        ],
        answer: 0,
        explain: "„ich möchte meinen Termin am Mittwoch um 10 Uhr ändern.“",
      },
      {
        text: "Bir iş başvurusunu hangisiyle bitirirsin?",
        options: ["Mit freundlichen Grüßen", "Liebe Grüße", "Auf Wiederhören"],
        answer: 0,
        explain:
          "Resmî yazışmada „Mit freundlichen Grüßen“. İş başvurusunu „Liebe Grüße“ ile bitirmek ciddiyetsiz görünür.",
      },
      {
        kind: "gapfill",
        text: "Elif fragt: Ist ein Termin am ___ möglich?",
        options: [],
        answer: 0,
        accept: ["Freitag"],
        explain: "„Ist ein Termin am Freitag möglich?“",
      },
    ],
  },
  {
    id: "a1-u23-l1",
    level: "A1",
    skill: "listening",
    unit: 23,
    title: "Am Telefon",
    genre: "Telefon",
    intro:
      "İki telefon. Almanya'da telefonu ADINLA açarsın — „alo“ demek eksik sayılır.",
    gloss: [
      { de: "zurückrufen", tr: "geri aramak", en: "to call back" },
      { de: "später", tr: "sonra", en: "later" },
      { de: "falsch", tr: "yanlış", en: "wrong" },
    ],
    minutes: 2,
    segments: [
      { text: "Yılmaz?" },
      { text: "Guten Tag, hier ist Tom Berger. Kann ich bitte mit Elif sprechen?" },
      { text: "Sie ist gerade nicht da. Sie ruft Sie später zurück." },
      { text: "Danke. Meine Nummer ist 0231 / 77 88 99." },
      { text: "Gut, ich schreibe es auf. Auf Wiederhören!" },
      { text: "Auf Wiederhören!" },
    ],
    questions: [
      {
        text: "İlk kişi telefonu nasıl açıyor?",
        options: ["mit ihrem Namen", "mit „Hallo“", "gar nicht"],
        answer: 0,
        explain:
          "„Yılmaz?“ — Almanya'da telefonu adınla açarsın. Türkçedeki „alo“nun karşılığı „hallo“ değildir.",
      },
      {
        text: "Warum kann Tom nicht mit Elif sprechen?",
        options: ["Sie ist nicht da.", "Sie schläft.", "Sie ist krank."],
        answer: 0,
        explain: "„Sie ist gerade nicht da.“",
      },
      {
        kind: "gapfill",
        text: "Elif ___ Tom später zurück.",
        options: [],
        answer: 0,
        accept: ["ruft"],
        explain: "„Sie ruft Sie später zurück.“ — ayrılabilen fiil: ruft … zurück.",
      },
      {
        text: "Warum sagen beide „Auf Wiederhören“ und nicht „Auf Wiedersehen“?",
        options: [
          "Weil sie telefonieren.",
          "Weil sie sich nicht kennen.",
          "Weil es später Abend ist.",
        ],
        answer: 0,
        explain:
          "hören = duymak, sehen = görmek. Telefonda karşındakini görmezsin, o yüzden „Wiedersehen“ mantıksız kaçar.",
      },
    ],
  },
  {
    id: "a1-u23-l2",
    level: "A1",
    skill: "listening",
    unit: 23,
    title: "Beim Zahnarzt",
    genre: "Muayene",
    intro: "Diş hekiminde. Hasta korkuyor.",
    gloss: [
      { de: "der Zahn", tr: "diş", en: "tooth" },
      { de: "die Angst", tr: "korku", en: "fear" },
      { de: "ziehen", tr: "çekmek", en: "to pull" },
    ],
    minutes: 2,
    segments: [
      { text: "Guten Tag. Was fehlt Ihnen?" },
      { text: "Ein Zahn tut sehr weh. Seit drei Tagen schon." },
      { text: "Bitte den Mund öffnen. … Ja, ich sehe es." },
      { text: "Müssen Sie den Zahn ziehen? Ich habe ein bisschen Angst." },
      { text: "Keine Sorge, das müssen wir heute nicht machen. Sie bekommen ein Rezept." },
      { text: "Zum Schluss noch etwas: Putzen Sie die Zähne zweimal täglich!" },
    ],
    questions: [
      {
        text: "Seit wann tut der Zahn weh?",
        options: ["seit drei Tagen", "seit heute", "seit einer Woche"],
        answer: 0,
        explain: "„Ein Zahn tut sehr weh. Seit drei Tagen schon.“",
      },
      {
        text: "Hasta neyden korkuyor?",
        options: ["dass der Zahnarzt den Zahn zieht", "vor dem Rezept", "vor dem Termin"],
        answer: 0,
        explain: "„Müssen Sie den Zahn ziehen? Ich habe ein bisschen Angst.“",
      },
      {
        text: "Zieht der Zahnarzt den Zahn?",
        options: ["Nein, heute nicht.", "Ja, sofort.", "Ja, am Freitag."],
        answer: 0,
        explain: "„Keine Sorge, das müssen wir heute nicht machen.“",
      },
      {
        kind: "gapfill",
        text: "„Putzen Sie die Zähne ___ täglich!“",
        options: [],
        answer: 0,
        accept: ["zweimal"],
        explain: "„Putzen Sie die Zähne zweimal täglich!“",
      },
    ],
  },
  {
    id: "a1-u23-w1",
    level: "A1",
    skill: "writing",
    unit: 23,
    title: "Wiederhören oder Wiedersehen?",
    genre: "Dil bilgisi",
    intro: "Üç kalıp, üçü de yanlış yerde kullanılınca göze batar.",
    gloss: [
      { de: "das Wiederhören", tr: "tekrar duyma (telefonda vedalaşma)", en: "hearing again" },
      { de: "zurückrufen", tr: "geri aramak", en: "to call back" },
      { de: "der Gruß", tr: "selam", en: "greeting" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "rewrite",
        prompt: "Telefon konuşmasını bitir.",
        source: "Auf Wiedersehen!",
        answer: "Auf Wiederhören!",
        alternatives: ["Auf Wiederhören"],
        why:
          "hören = duymak, sehen = görmek. Telefonda karşındakini GÖRMEZSİN. „Auf Wiedersehen“ yüz yüze vedadır; telefonda söylemek öğrencinin en sık hatasıdır.",
      },
      {
        kind: "build",
        tr: "Seni sonra geri ararım.",
        answer: "Ich rufe dich später zurück",
        hint: "„zurückrufen“ AYRILIR: önek cümlenin SONUNA gider — rufe … zurück.",
      },
      {
        kind: "build",
        tr: "Bana bir mesaj gönder!",
        answer: "Schick mir eine Nachricht",
        hint: "Samimi emir: „schick“ (sonda -e yok). „mir“ datif, „eine Nachricht“ akkusatif.",
      },
    ],
  },
  {
    id: "a1-u23-w2",
    level: "A1",
    skill: "writing",
    unit: 23,
    title: "Eine E-Mail an die Praxis",
    genre: "E-posta",
    intro: "Resmî bir e-posta yaz. Kapanışı doğru seç.",
    gloss: [
      { de: "möchten", tr: "istemek (kibar)", en: "would like" },
      { de: "die E-Mail", tr: "e-posta", en: "email" },
      { de: "Mit freundlichen Grüßen", tr: "Saygılarımla (resmî)", en: "Yours sincerely" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Randevumu değiştirmek istiyorum.",
        answer: "Ich möchte meinen Termin ändern",
        hint: "„möchte“ kibar biçimdir; „ich will“ bu bağlamda sert durur. İkinci fiil MASTAR hâlde sona gider.",
      },
      {
        kind: "free",
        prompt:
          "Muayenehaneye resmî bir e-posta yaz (4-5 cümle): kibar hitapla başla, çarşamba günkü randevunu değiştirmek istediğini yaz, hangi günün uygun olduğunu sor, telefon numaranı bırak ve DOĞRU kapanışla bitir.",
        minWords: 30,
        checklist: [
          "Resmî hitapla başladın mı? (Sehr geehrte Frau … / Sehr geehrter Herr …)",
          "Ne istediğini yazdın mı? (Ich möchte … ändern.)",
          "Bir soru sordun mu? (Ist ein Termin am … möglich?)",
          "RESMÎ kapanış kullandın mı? („Liebe Grüße“ burada YANLIŞ.)",
        ],
        phrases: [
          { de: "Sehr geehrte Frau Weber,", tr: "Sayın Weber Hanım,", en: "Dear Ms Weber," },
          { de: "Ich möchte meinen Termin ändern.", tr: "Randevumu değiştirmek istiyorum.", en: "I'd like to change my appointment." },
          { de: "Mit freundlichen Grüßen", tr: "Saygılarımla", en: "Yours sincerely" },
        ],
        sample:
          "Sehr geehrte Frau Dr. Weber,\n\nich möchte meinen Termin am Mittwoch um 10 Uhr ändern. Leider muss ich an dem Tag arbeiten.\n\nIst ein Termin am Freitag möglich? Am Nachmittag habe ich Zeit.\n\nSie können mich unter 0231 / 55 44 33 anrufen. Ich bin ab 17 Uhr zu Hause.\n\nMit freundlichen Grüßen\nElif Yılmaz",
      },
    ],
  },
];
