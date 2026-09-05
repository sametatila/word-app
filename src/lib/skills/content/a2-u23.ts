import type { SkillExercise } from "../types";

/**
 * A2 · Ünite 23 — "Görüntülü görüşme, dijital mola, nüfus dairesi, form".
 *
 * Dört ders: Der Online-Termin · Ein Tag ohne Handy · Auf dem Bürgeramt ·
 * Das Formular ausfüllen. İçerik ünite 1-23'ün kelimeleriyle sınırlı.
 *
 *   Ünite 23: das Mikrofon, die Website, der Link, sich eintragen,
 *             sich abmelden, unverständlich, mitschreiben, gegenseitig ·
 *             ausprobieren, offline, gelangweilt, spazieren, nachdenklich,
 *             das Tablet, aufbleiben, wach · das Rathaus,
 *             die Meldebescheinigung, das Anmeldeformular, sich ausweisen,
 *             stempeln, die Hausnummer, das Arbeitsamt, örtlich · leserlich,
 *             vollständig, fehlerfrei, durchlesen, der Stift, zuordnen,
 *             beschriften, der Notizblock
 *   Kalıplar: Wenn Sie mich nicht hören, schreiben Sie bitte im Chat. ·
 *             Ich schicke Ihnen den Link. · Ich habe einen Tag ohne Handy
 *             ausprobiert. · Am Anfang war ich gelangweilt. · Ich möchte mich
 *             anmelden. · Wo bekomme ich das Formular? · Füllen Sie das
 *             Formular vollständig aus. · Bitte schreiben Sie leserlich.
 *
 * Ünitenin ölçtüğü şey Sie emri: resmî hitapta emir cümlesi fiille başlar ve
 * Sie hemen arkasından gelir (Füllen Sie …), du emrinde ise özne hiç
 * söylenmez (Fülle …). İkisi aynı derste öğretilmiyor ve öğrenci resmî
 * ortamda du biçimini kullanıp kaba görünüyor. Nüfus dairesi ve form dili bu
 * ayrımın gerçekten önemli olduğu tek A2 bağlamı.
 */
export const a2U23: SkillExercise[] = [
  {
    id: "a2-u23-r1",
    level: "A2",
    skill: "reading",
    unit: 23,
    title: "Anmeldung beim Bürgeramt",
    genre: "Bilgilendirme",
    intro: "Nüfus dairesi bilgilendirmesi. Ne getirilecek, kaç günde yapılacak?",
    gloss: [
      { de: "das Rathaus", tr: "belediye binası", en: "town hall" },
      { de: "die Meldebescheinigung", tr: "ikamet belgesi", en: "registration certificate" },
      { de: "das Anmeldeformular", tr: "kayıt formu", en: "registration form" },
      { de: "sich ausweisen", tr: "kimlik göstermek", en: "to show ID" },
      { de: "stempeln", tr: "mühürlemek", en: "to stamp" },
      { de: "die Hausnummer", tr: "kapı numarası", en: "house number" },
      { de: "örtlich", tr: "yerel", en: "local" },
      { de: "vollständig", tr: "eksiksiz", en: "complete" },
    ],
    minutes: 4,
    text:
      "ANMELDUNG — WAS SIE MITBRINGEN MÜSSEN\n\n" +
      "Wer umzieht, muss sich innerhalb von 14 Tagen beim örtlichen Bürgeramt anmelden. Zuständig ist immer das Amt am neuen Wohnort, nicht am alten.\n\n" +
      "BRINGEN SIE MIT:\n" +
      "— Ihren Pass oder Personalausweis. Ohne Dokument können Sie sich nicht ausweisen und wir können nichts machen.\n" +
      "— Das Anmeldeformular, vollständig ausgefüllt. Achten Sie besonders auf Straße und Hausnummer.\n" +
      "— Die Bestätigung Ihres Vermieters.\n\n" +
      "Das Formular finden Sie auf unserer Website oder im Erdgeschoss des Rathauses, Zimmer 4.\n\n" +
      "Der Termin dauert etwa zehn Minuten. Sie bekommen Ihre Meldebescheinigung sofort, gestempelt und unterschrieben. Heben Sie sie gut auf — Bank, Arbeitsamt und Schule fragen alle danach.\n\n" +
      "Die Anmeldung ist kostenlos. Eine zweite Meldebescheinigung kostet später fünf Euro.",
    questions: [
      {
        text: "Bis wann muss man sich nach dem Umzug anmelden?",
        options: ["Innerhalb von 7 Tagen", "Innerhalb von 14 Tagen", "Innerhalb eines Monats"],
        answer: 1,
        explain: "„Wer umzieht, muss sich innerhalb von 14 Tagen beim örtlichen Bürgeramt anmelden.“",
      },
      {
        kind: "gapfill",
        text: "___ Sie das Formular vollständig aus.",
        options: [],
        answer: 0,
        accept: ["Füllen"],
        explain: "Resmî emirde fiil başta durur ve Sie hemen arkasından gelir.",
      },
      {
        text: "Welches Amt ist zuständig?",
        options: ["Das am alten Wohnort", "Das am neuen Wohnort", "Das Arbeitsamt"],
        answer: 1,
        explain: "„Zuständig ist immer das Amt am neuen Wohnort, nicht am alten.“",
      },
      {
        kind: "short_answer",
        text: "Wann bekommt man die Meldebescheinigung?",
        options: [],
        answer: 0,
        accept: ["sofort", "am selben Tag", "gleich im Termin"],
        explain: "„Sie bekommen Ihre Meldebescheinigung sofort, gestempelt und unterschrieben.“",
      },
      {
        text: "Die Anmeldung kostet fünf Euro.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: kayıt ücretsiz; beş euro ikinci belge için.",
      },
    ],
  },
  {
    id: "a2-u23-r2",
    level: "A2",
    skill: "reading",
    unit: 23,
    title: "Ein Tag ohne Handy",
    genre: "Blog yazısı",
    intro: "Telefonsuz bir gün denemesi. Ne zaman zor oldu, ne değişti?",
    gloss: [
      { de: "ausprobieren", tr: "denemek", en: "to try out" },
      { de: "offline", tr: "çevrimdışı", en: "offline" },
      { de: "gelangweilt", tr: "canı sıkkın", en: "bored" },
      { de: "nachdenklich", tr: "düşünceli", en: "thoughtful" },
      { de: "spazieren", tr: "yürüyüş yapmak", en: "to stroll" },
      { de: "das Tablet", tr: "tablet", en: "tablet" },
      { de: "aufbleiben", tr: "geç saate kadar oturmak", en: "to stay up" },
      { de: "wach", tr: "uyanık", en: "awake" },
    ],
    minutes: 4,
    text:
      "Ich habe einen Tag ohne Handy ausprobiert. Samstag, sieben Uhr morgens bis Sonntag früh. Das Tablet habe ich auch weggelegt, sonst wäre es geschummelt.\n\n" +
      "Die erste Stunde war leicht, ich habe geschlafen. Die zweite war furchtbar. Am Anfang war ich einfach gelangweilt und bin dreimal zur Schublade gegangen, wo das Handy lag.\n\n" +
      "Gegen elf bin ich spazieren gegangen, ohne Musik. Nach zwanzig Minuten wurde es angenehm. Ich habe Dinge gesehen, an denen ich seit zwei Jahren vorbeigehe: einen Brunnen, eine sehr alte Tür, einen Mann, der Tauben zählt.\n\n" +
      "Nachmittags habe ich gelesen, dann gekocht, dann wieder gelesen. Ehrlich gesagt war ich abends nachdenklich: Was mache ich sonst mit diesen sechs Stunden?\n\n" +
      "Das Beste kam nachts. Ich bin nicht bis eins aufgeblieben, ich war um halb elf im Bett und morgens ohne Wecker wach.\n\n" +
      "Mache ich das jetzt jede Woche? Nein. Aber einmal im Monat offline zu sein, das ist machbar.",
    questions: [
      {
        text: "Warum hat der Autor auch das Tablet weggelegt?",
        options: [
          "Es war kaputt.",
          "Sonst wäre es geschummelt.",
          "Er hat es verliehen.",
        ],
        answer: 1,
        explain: "„Das Tablet habe ich auch weggelegt, sonst wäre es geschummelt.“",
      },
      {
        kind: "gapfill",
        text: "Ich habe einen Tag ohne Handy ___.",
        options: [],
        answer: 0,
        accept: ["ausprobiert"],
        explain: "Ayrılabilen fiilin Perfekt biçimi: aus-ge-probiert; ge- ön ekten sonra gelir.",
      },
      {
        text: "Wann wurde der Spaziergang angenehm?",
        options: ["Sofort", "Nach zwanzig Minuten", "Erst am Abend"],
        answer: 1,
        explain: "„Nach zwanzig Minuten wurde es angenehm.“",
      },
      {
        kind: "short_answer",
        text: "Was war laut Text das Beste?",
        options: [],
        answer: 0,
        accept: [
          "die Nacht",
          "er war früh im Bett und morgens ohne Wecker wach",
          "der Schlaf",
        ],
        explain: "„Das Beste kam nachts … um halb elf im Bett und morgens ohne Wecker wach.“",
      },
      {
        text: "Der Autor will das jetzt jede Woche machen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Nein. Aber einmal im Monat offline zu sein, das ist machbar.“",
      },
    ],
  },
  {
    id: "a2-u23-l1",
    level: "A2",
    skill: "listening",
    unit: 23,
    title: "Der Online-Termin",
    genre: "Diyalog",
    intro: "Görüntülü görüşmenin başı. Ses sorunu nasıl çözülüyor?",
    gloss: [
      { de: "das Mikrofon", tr: "mikrofon", en: "microphone" },
      { de: "die Website", tr: "internet sitesi", en: "website" },
      { de: "der Link", tr: "bağlantı", en: "link" },
      { de: "sich eintragen", tr: "kaydolmak, adını yazmak", en: "to sign up" },
      { de: "sich abmelden", tr: "çıkış yapmak", en: "to log out" },
      { de: "unverständlich", tr: "anlaşılmaz", en: "unintelligible" },
      { de: "mitschreiben", tr: "not almak", en: "to take notes" },
      { de: "gegenseitig", tr: "karşılıklı", en: "mutually" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Frau Demir", text: "Guten Tag, hören Sie mich? Ihr Ton ist ganz unverständlich." },
      { speaker: "Herr Klein", text: "Jetzt besser? Ich hatte das falsche Mikrofon eingestellt." },
      { speaker: "Frau Demir", text: "Perfekt, jetzt ist es klar. Wenn Sie mich nicht hören, schreiben Sie bitte im Chat." },
      { speaker: "Herr Klein", text: "Mache ich. Wo finde ich denn die Unterlagen?" },
      { speaker: "Frau Demir", text: "Ich schicke Ihnen den Link. Er steht auch auf unserer Website unter „Kurse“." },
      { speaker: "Herr Klein", text: "Danke. Muss ich mich vorher irgendwo eintragen?" },
      { speaker: "Frau Demir", text: "Ja, mit Name und Mailadresse. Das dauert zwei Minuten." },
      { speaker: "Herr Klein", text: "Und wenn ich später doch nicht kann?" },
      { speaker: "Frau Demir", text: "Dann melden Sie sich bitte bis Montag ab, damit der Platz frei wird." },
      { speaker: "Herr Klein", text: "Verstanden. Ich schreibe kurz mit, sonst vergesse ich die Hälfte." },
      { speaker: "Frau Demir", text: "Gute Idee. Am Ende schicke ich Ihnen aber sowieso alles schriftlich." },
    ],
    questions: [
      {
        text: "Was war das Problem am Anfang?",
        options: [
          "Das Bild war schlecht.",
          "Herr Klein hatte das falsche Mikrofon eingestellt.",
          "Der Link funktionierte nicht.",
        ],
        answer: 1,
        explain: "„Ich hatte das falsche Mikrofon eingestellt.“",
      },
      {
        kind: "gapfill",
        text: "___ Sie mich nicht hören, schreiben Sie bitte im Chat.",
        options: [],
        answer: 0,
        accept: ["Wenn"],
        explain: "Koşul yan cümlesi başta; ana cümle emir biçimiyle devam ediyor.",
      },
      {
        text: "Was muss Herr Klein tun, wenn er doch nicht kann?",
        options: [
          "Nichts machen",
          "Sich bis Montag abmelden",
          "Am Termin trotzdem teilnehmen",
        ],
        answer: 1,
        explain: "„Dann melden Sie sich bitte bis Montag ab, damit der Platz frei wird.“",
      },
      {
        kind: "dictation",
        text: "Frau Demir'in bağlantıyı göndereceğini söylediği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Ich schicke Ihnen den Link."],
        explain: "Resmî hitapta yönelme hâli Ihnen olur; küçük ama sürekli kaçırılan bir ayrıntı.",
      },
    ],
  },
  {
    id: "a2-u23-l2",
    level: "A2",
    skill: "listening",
    unit: 23,
    title: "Das Formular ausfüllen",
    genre: "Diyalog",
    intro: "Formda hatalar var. Memur ne düzeltilmesini istiyor?",
    gloss: [
      { de: "leserlich", tr: "okunaklı", en: "legible" },
      { de: "vollständig", tr: "eksiksiz", en: "complete" },
      { de: "fehlerfrei", tr: "hatasız", en: "error-free" },
      { de: "durchlesen", tr: "baştan sona okumak", en: "to read through" },
      { de: "der Stift", tr: "kalem", en: "pen" },
      { de: "zuordnen", tr: "eşleştirmek", en: "to assign" },
      { de: "beschriften", tr: "üstüne yazmak", en: "to label" },
      { de: "der Notizblock", tr: "not defteri", en: "notepad" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Beamter", text: "So, Ihr Formular. Zwei Sachen fehlen noch." },
      { speaker: "Frau Yıldız", text: "Oh. Welche denn?" },
      { speaker: "Beamter", text: "Die Hausnummer bei der alten Adresse, und hier unten die Unterschrift." },
      { speaker: "Frau Yıldız", text: "Entschuldigung. Haben Sie einen Stift?" },
      { speaker: "Beamter", text: "Bitte, hier. Und schreiben Sie die Hausnummer leserlich — die letzte konnte ich nicht zuordnen." },
      { speaker: "Frau Yıldız", text: "Ist es besser, wenn ich in Druckbuchstaben schreibe?" },
      { speaker: "Beamter", text: "Viel besser. Bei Zahlen hilft das am meisten." },
      { speaker: "Frau Yıldız", text: "So. Und das Datum hier oben — ist das richtig?" },
      { speaker: "Beamter", text: "Ja. Lesen Sie es aber bitte noch einmal ganz durch, bevor Sie unterschreiben." },
      { speaker: "Frau Yıldız", text: "Gut. Brauchen Sie den Umschlag auch?" },
      { speaker: "Beamter", text: "Nein, nur das Formular. Vollständig und unterschrieben, dann sind wir fertig." },
    ],
    questions: [
      {
        text: "Was fehlt im Formular?",
        options: [
          "Der Name und das Datum",
          "Die Hausnummer und die Unterschrift",
          "Die Mailadresse",
        ],
        answer: 1,
        explain: "„Die Hausnummer bei der alten Adresse, und hier unten die Unterschrift.“",
      },
      {
        kind: "gapfill",
        text: "Bitte schreiben Sie ___.",
        options: [],
        answer: 0,
        accept: ["leserlich"],
        explain: "Formda en sık duyulan uyarı: okunaklı yaz, özellikle rakamlarda.",
      },
      {
        text: "Was rät der Beamte bei Zahlen?",
        options: ["Druckbuchstaben", "Einen anderen Stift", "Größer schreiben"],
        answer: 0,
        explain: "„Ist es besser, wenn ich in Druckbuchstaben schreibe?“ — „Viel besser. Bei Zahlen hilft das am meisten.“",
      },
      {
        kind: "short_answer",
        text: "Was soll Frau Yıldız vor dem Unterschreiben machen?",
        options: [],
        answer: 0,
        accept: [
          "das Formular noch einmal ganz durchlesen",
          "es durchlesen",
          "alles noch einmal lesen",
        ],
        explain: "„Lesen Sie es aber bitte noch einmal ganz durch, bevor Sie unterschreiben.“",
      },
    ],
  },
  {
    id: "a2-u23-w1",
    level: "A2",
    skill: "writing",
    unit: 23,
    title: "Sie emri ve du emri",
    genre: "Dil bilgisi",
    intro: "Resmî emirde Sie söylenir, samimi emirde özne hiç söylenmez.",
    gloss: [
      { de: "ausfüllen", tr: "doldurmak", en: "to fill in" },
      { de: "leserlich", tr: "okunaklı", en: "legible" },
      { de: "durchlesen", tr: "baştan sona okumak", en: "to read through" },
      { de: "speichern", tr: "kaydetmek", en: "to save" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Formu eksiksiz doldurun.",
        answer: "Füllen Sie das Formular vollständig aus",
        hint: "Resmî emir: fiil başta, hemen ardından Sie; ayrılabilen ön ek sona gider.",
      },
      {
        kind: "build",
        tr: "Lütfen okunaklı yazın.",
        answer: "Bitte schreiben Sie leserlich",
        hint: "bitte başta durabilir; fiil yine Sie'den önce gelir.",
      },
      {
        kind: "build",
        tr: "Önce dosyayı kaydet.",
        answer: "Speichere die Datei zuerst",
        hint: "Samimi emirde özne hiç söylenmez, yalnız fiil kökü kullanılır.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi resmî hâle çevir: burada bir memurla konuşuluyor.",
        source: "Lies das Formular noch einmal durch.",
        answer: "Lesen Sie das Formular noch einmal durch.",
        alternatives: ["Lesen Sie das Formular noch einmal durch"],
        why: "Resmî emirde fiil tam biçimini alır ve Sie söylenir; du biçimi resmî ortamda kaba durur.",
      },
    ],
  },
  {
    id: "a2-u23-w2",
    level: "A2",
    skill: "writing",
    unit: 23,
    title: "Termin vereinbaren",
    genre: "Resmî yazı",
    intro: "Nüfus dairesinden randevu iste: ne için, ne zaman, hangi soru?",
    gloss: [
      { de: "sich anmelden", tr: "kayıt yaptırmak", en: "to register" },
      { de: "das Anmeldeformular", tr: "kayıt formu", en: "registration form" },
      { de: "die Meldebescheinigung", tr: "ikamet belgesi", en: "registration certificate" },
      { de: "sich ausweisen", tr: "kimlik göstermek", en: "to show ID" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "reply",
        prompt: "Bürgeramt'a bir randevu e-postası yaz. Ne için geldiğini, ne zaman taşındığını, hangi günler uygun olduğunu yaz ve neyi getirmen gerektiğini sor.",
        stimulus:
          "BÜRGERAMT MITTE\n\n" +
          "Termine nur nach Vereinbarung. Schreiben Sie an termin@buergeramt-mitte.de und nennen Sie:\n" +
          "— Ihren Namen und Ihr Geburtsdatum\n" +
          "— den Grund (Anmeldung, Abmeldung, Ausweis, …)\n" +
          "— zwei mögliche Termine\n\n" +
          "Öffnungszeiten: Mo–Mi 8–15 Uhr, Do 8–18 Uhr, Fr 8–12 Uhr.\n" +
          "Das Anmeldeformular finden Sie auf unserer Website.",
        checklist: [
          "Resmî hitapla ve konu cümlesiyle başladın mı?",
          "Geliş sebebini ve ne zaman taşındığını yazdın mı?",
          "Açılış saatlerine uyan iki tarih verdin mi?",
          "Ne getirmen gerektiğini sordun mu?",
        ],
        minWords: 45,
        phrases: [
          { de: "Ich möchte mich anmelden.", tr: "kayıt yaptırmak istiyorum", en: "I'd like to register" },
          { de: "Ich bin am … umgezogen.", tr: "…-de taşındım", en: "I moved on …" },
          { de: "Was muss ich mitbringen?", tr: "ne getirmem gerekiyor", en: "what do I need to bring" },
        ],
        sample:
          "Betreff: Terminwunsch — Anmeldung nach Umzug\n\n" +
          "Sehr geehrte Damen und Herren,\n\n" +
          "ich möchte mich anmelden. Ich bin am 3. Juni in die Lindenstraße 12 umgezogen und wohne jetzt in Ihrem Bezirk.\n\n" +
          "Mein Name ist Deniz Aydın, geboren am 14. März 1994.\n\n" +
          "Möglich wäre bei mir Donnerstag, der 19. Juni, am späten Nachmittag, oder Freitag, der 20. Juni, am Vormittag.\n\n" +
          "Eine Frage noch: Was muss ich mitbringen? Das Anmeldeformular habe ich von Ihrer Website schon ausgefüllt. Reicht mein Pass, oder brauchen Sie auch die Bestätigung des Vermieters?\n\n" +
          "Vielen Dank im Voraus.\n\n" +
          "Mit freundlichen Grüßen\nDeniz Aydın",
      },
    ],
  },
];
