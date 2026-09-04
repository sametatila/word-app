import type { SkillExercise } from "../types";

/**
 * A1 · Ünite 24 — "Randevu erteleme, davet ve GEÇMİŞ ZAMAN".
 *
 * Dört ders: Einen Termin machen · Die Einladung · Was hast du gemacht? ·
 * Wohin bist du gegangen? İçerik ünite 1-24'ün kelimeleriyle sınırlı.
 *
 *   Ünite 24: verschieben, der Kalender, das Datum, die Uhrzeit, nächste,
 *             die Anrede, erklären, wissen · die Einladung, einladen,
 *             mitbringen, der Gast, die Party, der Partner, die Partnerin,
 *             die Postkarte · gestern, gemacht, gekauft, gesehen, gehört,
 *             erzählen, denken, die Welt · gegangen, gefahren, geblieben,
 *             gekommen, wohin, fliegen, das Flugzeug, das Schiff
 *
 * BU ÜNİTE A1'İN EN AĞIR DİLBİLGİSİ NOKTASI: Perfekt (konuşma dilinin
 * geçmiş zamanı). İki şey aynı anda öğrenilmek zorunda:
 *
 * 1) CÜMLE KISKACI (Satzklammer): çekimli yardımcı fiil İKİNCİ sırada,
 *    ortaç (Partizip) cümlenin SONUNDA. Aradaki her şey kıskacın içinde
 *    kalır: "Ich habe gestern einen Pullover gekauft."
 *    Türkçede fiil zaten sondadır, o yüzden asıl yenilik yardımcı fiilin
 *    başta kalması ve ikisinin AYRI durmasıdır.
 *
 * 2) haben mi sein mi? — Türkçede böyle bir ayrım HİÇ YOK, o yüzden
 *    ezberlenecek tek şey budur:
 *      sein  → yer değiştirme ve durum değişimi: gehen, fahren, kommen,
 *              fliegen … ve KURALDIŞI "bleiben" (hareket yok ama sein)
 *      haben → geri kalan her şey
 *    "bleiben" istisnası öğrencinin en sık takıldığı yerdir, o yüzden hem
 *    dinlemede hem yazmada ayrıca çalıştırılıyor.
 *
 * KÜLTÜREL: Almanya'da davete "Was soll ich mitbringen?" diye SORULUR ve
 * bir şey götürmek beklenir; eli boş gitmek ayıp sayılır. Ayrıca davette
 * saat CİDDİDİR — "um 19 Uhr" 19:00 demektir, 19:30 değil.
 */
export const a1U24: SkillExercise[] = [
  {
    id: "a1-u24-r1",
    level: "A1",
    skill: "reading",
    unit: 24,
    title: "Die Einladung",
    genre: "Davetiye",
    intro: "Bir doğum günü daveti. Ne zaman, nerede, ne götürmeli?",
    gloss: [
      { de: "die Einladung", tr: "davet(iye)", en: "invitation" },
      { de: "mitbringen", tr: "yanında getirmek", en: "to bring along" },
      { de: "der Gast", tr: "misafir", en: "guest" },
      { de: "die Partnerin", tr: "(kadın) eş, partner", en: "partner" },
    ],
    minutes: 3,
    text:
      "Liebe Freunde,\n\nam Samstag habe ich Geburtstag! Das möchte ich mit euch feiern.\n\nWann: am Samstag um 19 Uhr\nWo: bei mir zu Hause, Bahnhofstraße 12\n\nBitte kommt pünktlich um 19 Uhr — dann essen wir zusammen. Ich koche für alle Gäste.\n\nWas sollt ihr mitbringen? Nichts Großes! Vielleicht einen Saft oder etwas Süßes. Dein Partner oder deine Partnerin kann auch kommen.\n\nSchreibt mir bitte bis Mittwoch. Dann weiß ich, wie viele Gäste kommen.\n\nLiebe Grüße\nMia",
    questions: [
      {
        text: "Warum feiert Mia?",
        options: ["Sie hat Geburtstag.", "Sie hat eine Wohnung gekauft.", "Sie hat eine Stelle bekommen."],
        answer: 0,
        explain: "„am Samstag habe ich Geburtstag! Das möchte ich mit euch feiern.“",
      },
      {
        kind: "gapfill",
        text: "Die Party ist um ___ Uhr.",
        options: [],
        answer: 0,
        accept: ["19"],
        explain:
          "„um 19 Uhr“ — ve „kommt pünktlich“. Almanya'da davette saat CİDDİDİR: 19 Uhr, 19:30 değil.",
      },
      {
        text: "Was sollen die Gäste mitbringen?",
        options: ["etwas Kleines, zum Beispiel Saft", "nichts", "ein großes Geschenk"],
        answer: 0,
        explain:
          "„Nichts Großes! Vielleicht einen Saft oder etwas Süßes.“ Almanya'da bir şey götürmek beklenir; eli boş gitmek ayıp sayılır.",
      },
      {
        text: "Darf man den Partner mitbringen?",
        options: ["Ja", "Nein", "Nur mit Anruf"],
        answer: 0,
        explain: "„Dein Partner oder deine Partnerin kann auch kommen.“",
      },
      {
        text: "Bis wann sollen die Gäste antworten?",
        options: ["bis Mittwoch", "bis Samstag", "bis Freitag"],
        answer: 0,
        explain: "„Schreibt mir bitte bis Mittwoch.“",
      },
    ],
  },
  {
    id: "a1-u24-r2",
    level: "A1",
    skill: "reading",
    unit: 24,
    title: "Was hast du gemacht?",
    genre: "Forum mesajı",
    intro:
      "Üç kişi dünü anlatıyor. Yardımcı fiillere dikkat: bazıları haben, bazıları sein.",
    gloss: [
      { de: "gestern", tr: "dün", en: "yesterday" },
      { de: "erzählen", tr: "anlatmak", en: "to tell" },
      { de: "geblieben", tr: "kalmış (bleiben)", en: "stayed" },
      { de: "gefahren", tr: "gitmiş (araçla)", en: "went (by vehicle)" },
    ],
    minutes: 3,
    text:
      "Tom: Gestern habe ich viel gemacht. Am Morgen bin ich in die Stadt gefahren und habe einen Pullover gekauft. Am Abend habe ich einen Film gesehen.\n\nElif: Ich bin gestern zu Hause geblieben. Ich war krank. Ich habe nur Musik gehört. Kein schöner Tag!\n\nAli: Ich bin mit dem Zug nach Berlin gefahren. In Berlin habe ich meine Schwester gesehen. Am Abend sind wir zusammen ins Kino gegangen. Berlin ist wirklich schön!",
    questions: [
      {
        text: "Was hat Tom gekauft?",
        options: ["einen Pullover", "einen Film", "eine Postkarte"],
        answer: 0,
        explain: "„…und habe einen Pullover gekauft.“",
      },
      {
        text: "Warum ist Elif zu Hause geblieben?",
        options: ["Sie war krank.", "Es hat geregnet.", "Sie hatte keine Zeit."],
        answer: 0,
        explain: "„Ich bin gestern zu Hause geblieben. Ich war krank.“",
      },
      {
        text: "Warum heißt es „ich BIN geblieben“, aber „ich HABE gekauft“?",
        options: [
          "„bleiben“ nimmt sein, „kaufen“ nimmt haben.",
          "Weil „bleiben“ negativ ist.",
          "Das ist Zufall, beide gehen auch anders.",
        ],
        answer: 0,
        explain:
          "Yer değiştirme ve durum değişimi fiilleri „sein“ alır; „bleiben“ hareket olmadığı hâlde KURALDIŞI olarak „sein“ alır. Geri kalan her şey „haben“.",
      },
      {
        kind: "gapfill",
        text: "Ali ist mit dem Zug nach Berlin ___.",
        options: [],
        answer: 0,
        accept: ["gefahren"],
        explain: "„Ich bin mit dem Zug nach Berlin gefahren.“ — araçla gitmek: fahren + sein.",
      },
    ],
  },
  {
    id: "a1-u24-l1",
    level: "A1",
    skill: "listening",
    unit: 24,
    title: "Einen Termin verschieben",
    genre: "Telefon",
    intro: "Randevu erteleniyor. Yeni tarih ve saat ne?",
    gloss: [
      { de: "verschieben", tr: "ertelemek", en: "to postpone" },
      { de: "das Datum", tr: "tarih", en: "date" },
      { de: "die Uhrzeit", tr: "saat (kaç)", en: "time of day" },
    ],
    minutes: 2,
    segments: [
      { text: "Praxis Weber, guten Tag." },
      { text: "Guten Tag, hier ist Ali Demir. Ich möchte meinen Termin verschieben." },
      { text: "Gern. Welches Datum haben Sie denn?" },
      { text: "Mittwoch um 10 Uhr. Leider muss ich da arbeiten." },
      { text: "Kein Problem. Geht es nächste Woche am Freitag um 16 Uhr?" },
      { text: "Ja, das passt gut. Vielen Dank!" },
      { text: "Ich schreibe es in den Kalender. Auf Wiederhören!" },
    ],
    questions: [
      {
        text: "Was möchte Ali machen?",
        options: ["seinen Termin verschieben", "einen neuen Termin machen", "den Termin absagen"],
        answer: 0,
        explain: "„Ich möchte meinen Termin verschieben.“ — iptal değil, erteleme.",
      },
      {
        text: "Warum kann er am Mittwoch nicht kommen?",
        options: ["Er muss arbeiten.", "Er ist krank.", "Er ist nicht in der Stadt."],
        answer: 0,
        explain: "„Leider muss ich da arbeiten.“",
      },
      {
        kind: "gapfill",
        text: "Der Termin ist jetzt am Freitag um ___ Uhr.",
        options: [],
        answer: 0,
        accept: ["16"],
        explain: "„Geht es nächste Woche am Freitag um 16 Uhr?“",
      },
      {
        text: "Wohin schreibt die Praxis den Termin?",
        options: ["in den Kalender", "auf eine Postkarte", "in eine E-Mail"],
        answer: 0,
        explain: "„Ich schreibe es in den Kalender.“",
      },
    ],
  },
  {
    id: "a1-u24-l2",
    level: "A1",
    skill: "listening",
    unit: 24,
    title: "Wohin bist du gegangen?",
    genre: "Diyalog",
    intro:
      "Hafta sonu sohbeti. Her cümlede yardımcı fiili dinle: haben mi, sein mi?",
    gloss: [
      { de: "wohin", tr: "nereye", en: "where to" },
      { de: "gegangen", tr: "gitmiş (yürüyerek)", en: "went" },
      { de: "gesehen", tr: "görmüş", en: "saw" },
    ],
    minutes: 2,
    segments: [
      { text: "Wohin bist du am Wochenende gegangen?" },
      { text: "Ich bin mit Tom ins Kino gegangen. Wir haben einen Film gesehen." },
      { text: "Und am Sonntag?" },
      { text: "Am Sonntag bin ich zu Hause geblieben. Ich habe Musik gehört." },
      { text: "Ich bin nach Hamburg gefahren. Mit dem Zug, nicht mit dem Flugzeug." },
      { text: "Schön! Erzähl mir mehr." },
    ],
    questions: [
      {
        text: "Wohin ist die erste Person am Samstag gegangen?",
        options: ["ins Kino", "nach Hamburg", "in den Park"],
        answer: 0,
        explain: "„Ich bin mit Tom ins Kino gegangen.“",
      },
      {
        text: "İkinci kişi Hamburg'a neyle gitti?",
        options: ["mit dem Zug", "mit dem Flugzeug", "mit dem Schiff"],
        answer: 0,
        explain: "„Mit dem Zug, nicht mit dem Flugzeug.“",
      },
      {
        kind: "gapfill",
        text: "Am Sonntag ___ ich zu Hause geblieben.",
        options: [],
        answer: 0,
        accept: ["bin"],
        explain: "„bleiben“ KURALDIŞI: hareket yok ama yardımcı fiil „sein“.",
      },
      {
        text: "Hangi cümlede yardımcı fiil „haben“?",
        options: [
          "Wir haben einen Film gesehen.",
          "Ich bin ins Kino gegangen.",
          "Ich bin nach Hamburg gefahren.",
        ],
        answer: 0,
        explain:
          "„sehen“ yer değiştirme değil, o yüzden „haben“. „gehen“ ve „fahren“ hareket bildirir, „sein“ alır.",
      },
    ],
  },
  {
    id: "a1-u24-w1",
    level: "A1",
    skill: "writing",
    unit: 24,
    title: "haben oder sein?",
    genre: "Dil bilgisi",
    intro: "A1'in en çok karıştırılan noktası. Üç cümle.",
    gloss: [
      { de: "gekauft", tr: "satın almış", en: "bought" },
      { de: "gegangen", tr: "gitmiş", en: "went" },
      { de: "geblieben", tr: "kalmış", en: "stayed" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Dün bir kazak satın aldım.",
        answer: "Gestern habe ich einen Pullover gekauft",
        hint:
          "CÜMLE KISKACI: „habe“ ikinci sırada, ortaç „gekauft“ EN SONDA; aradaki her şey ikisinin arasında kalır. „kaufen“ hareket değil → haben.",
      },
      {
        kind: "build",
        tr: "Sinemaya gittim.",
        answer: "Ich bin ins Kino gegangen",
        hint: "„gehen“ yer değiştirmedir → yardımcı fiil SEIN. „Ich habe gegangen“ yanlıştır.",
      },
      {
        kind: "build",
        tr: "Dün evde kaldım.",
        answer: "Gestern bin ich zu Hause geblieben",
        hint:
          "KURALDIŞI: „bleiben“de hareket YOK ama yardımcı fiil yine „sein“. Öğrencinin en sık takıldığı yer burasıdır — ezberle.",
      },
    ],
  },
  {
    id: "a1-u24-w2",
    level: "A1",
    skill: "writing",
    unit: 24,
    title: "Mein Wochenende",
    genre: "Forum mesajı",
    intro: "Hafta sonunu geçmiş zamanla anlat.",
    gloss: [
      { de: "erzählen", tr: "anlatmak", en: "to tell" },
      { de: "gemacht", tr: "yapmış", en: "did" },
      { de: "gehört", tr: "dinlemiş, duymuş", en: "heard" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Ne getirmeliyim?",
        answer: "Was soll ich mitbringen",
        hint:
          "Almanya'da davete bu SORULUR ve bir şey götürmek beklenir. „mitbringen“ ayrılır: soll ich … mitbringen (mastar sonda, bitişik).",
      },
      {
        kind: "free",
        prompt:
          "Hafta sonunu foruma yaz (5-6 cümle), hepsi GEÇMİŞ ZAMANDA: nereye gittin, ne yaptın, ne gördün ya da dinledin. En az bir „sein“li ve bir „haben“li cümle kur.",
        minWords: 35,
        checklist: [
          "En az bir „sein“ yardımcı fiilli cümle var mı? (Ich bin … gegangen/gefahren/geblieben)",
          "En az bir „haben“ yardımcı fiilli cümle var mı? (Ich habe … gemacht/gekauft/gesehen/gehört)",
          "Ortaçları cümlenin SONUNA koydun mu?",
          "„gestern“ ya da „am Wochenende“ gibi bir zaman ifadesi kullandın mı?",
        ],
        phrases: [
          { de: "Ich bin ins Kino gegangen.", tr: "Sinemaya gittim.", en: "I went to the cinema." },
          { de: "Ich habe einen Film gesehen.", tr: "Bir film izledim.", en: "I saw a film." },
          { de: "Ich bin zu Hause geblieben.", tr: "Evde kaldım.", en: "I stayed home." },
        ],
        sample:
          "Hallo zusammen,\n\nam Samstag bin ich in die Stadt gefahren. Da habe ich einen Pullover gekauft — er war nicht teuer.\n\nAm Abend bin ich mit Tom ins Kino gegangen. Wir haben einen Film gesehen. Der Film war wirklich gut.\n\nAm Sonntag bin ich zu Hause geblieben. Ich habe nur Musik gehört.\n\nUnd ihr? Was habt ihr am Wochenende gemacht? Erzählt mir!",
      },
    ],
  },
];
