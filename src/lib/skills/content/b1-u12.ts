import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 12 — "Resmî hayatın pürüzleri" (dersler 45–48).
 *
 * Dersler: Der Führerschein · Steuern · Die Versicherung ·
 * Einen Termin verschieben.
 *
 * Dördü de bir aksaklığı anlatmayı gerektiriyor: ceza kesildi, kaza oldu,
 * randevuya yetişilemedi. Yani ünitenin dili GEÇMİŞ ANLATI + ÖZÜR.
 * İki aktarım hatası tam buraya düşüyor:
 *   Perfekt yardımcı fiili  Türkçede geçmiş tek ektir; Almanca hareket ve
 *                           durum değişimi için sein, geri kalanı için haben
 *                           seçer. "Ich habe gekommen" en sık hatalardan biri.
 *   Dönüşlü zamir           Türkçede dönüşlülük fiilin içinde ("acele etmek"),
 *                           Almancada ayrı bir zamir: sich beeilen. Zamir
 *                           unutulunca cümle bütünüyle bozuluyor.
 *
 * Yeni 32 kelime: der Führerschein, der Polizist, die Strafe, der Strafzettel,
 * die Geschwindigkeit, bremsen, überholen, abbiegen, die Quittung, angeben,
 * die Angabe, die Einnahme, möglichst, kürzlich, bestrafen, beweisen,
 * die Versicherung, der Vorfall, entstehen, versichern, der Zeuge,
 * die Aufnahme, gespannt, die Nachfrage, dankbar, bestätigen, absagen,
 * ausfallen, die Eile, sich beeilen, geeignet, der Feiertag.
 */
export const b1U12: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u12-r1",
    level: "B1",
    skill: "reading",
    unit: 12,
    title: "Der Strafzettel",
    genre: "Bilgi metni ve itiraz notu",
    intro: "Bir trafik cezası ve buna bir yanıt. Neyin kanıtlanması gerekiyor?",
    minutes: 5,
    gloss: [
      { de: "der Strafzettel", tr: "ceza makbuzu", en: "ticket" },
      { de: "die Geschwindigkeit", tr: "hız", en: "speed" },
      { de: "überholen", tr: "sollamak", en: "to overtake" },
      { de: "beweisen", tr: "kanıtlamak", en: "to prove" },
      { de: "die Aufnahme", tr: "kayıt / çekim", en: "recording" },
    ],
    text:
      "Ein Strafzettel kommt fast immer mit einem Foto. Darauf sieht man das Auto, " +
      "die Zeit und die Geschwindigkeit. Wer zu schnell war, zahlt; wer zweimal im " +
      "Jahr zu schnell war, verliert unter Umständen den Führerschein.\n\n" +
      "Nicht jede Strafe ist richtig. Manchmal ist die Aufnahme nicht klar, manchmal " +
      "stand das Schild hinter einem Baum. Man wird nicht bestraft, wenn man " +
      "beweisen kann, dass das Schild nicht zu sehen war.\n\n" +
      "Notiz von Herrn Öz: Ich bin am Dienstag um sieben dort gefahren. Ich habe " +
      "gebremst, sobald ich das Schild gesehen habe. Danach bin ich rechts " +
      "abgebogen und habe niemanden überholt. Der Polizist hat mir gesagt, ich " +
      "solle die Sache schriftlich angeben.\n\n" +
      "Meine Frau ist mitgefahren und ist damit Zeugin. Ich schicke die Quittung " +
      "der Werkstatt mit, weil die Bremsen kürzlich geprüft wurden.",
    questions: [
      {
        text: "Was sieht man auf dem Foto?",
        options: ["Auto, Zeit und Geschwindigkeit", "Nur das Auto", "Den Fahrer"],
        answer: 0,
        explain: "„Darauf sieht man das Auto, die Zeit und die Geschwindigkeit.“",
      },
      {
        text: "Wann wird man nicht bestraft?",
        options: ["Wenn man langsam fährt", "Wenn man beweisen kann, dass das Schild nicht zu sehen war", "Immer beim ersten Mal"],
        answer: 1,
        explain: "„Man wird nicht bestraft, wenn man beweisen kann, dass das Schild nicht zu sehen war.“",
      },
      {
        text: "Wer ist Zeugin?",
        options: ["Der Polizist", "Seine Frau", "Niemand"],
        answer: 1,
        explain: "„Meine Frau ist mitgefahren und ist damit Zeugin.“",
      },
      {
        kind: "gapfill",
        text: "Danach ___ ich rechts abgebogen und ___ niemanden überholt.",
        options: [],
        answer: 0,
        accept: ["bin habe", "bin / habe"],
        explain: "abbiegen hareket → sein. überholen nesne alıyor → haben.",
      },
      {
        kind: "short_answer",
        text: "Was schickt Herr Öz mit?",
        options: [],
        answer: 0,
        accept: ["die Quittung", "die Quittung der Werkstatt", "Quittung"],
        explain: "„Ich schicke die Quittung der Werkstatt mit …“",
      },
    ],
  },
  {
    id: "b1-u12-r2",
    level: "B1",
    skill: "reading",
    unit: 12,
    title: "Ein Schaden, zwei Versicherungen",
    genre: "Sigorta bilgilendirmesi",
    intro: "Bir hasarın nasıl bildirileceği. Hangi bilgi ne zaman veriliyor?",
    minutes: 5,
    gloss: [
      { de: "die Versicherung", tr: "sigorta", en: "insurance" },
      { de: "der Vorfall", tr: "olay", en: "incident" },
      { de: "entstehen", tr: "meydana gelmek", en: "to arise" },
      { de: "der Zeuge", tr: "tanık", en: "witness" },
      { de: "die Angabe", tr: "beyan", en: "statement" },
    ],
    text:
      "Wenn ein Schaden entstanden ist, gilt eine einfache Reihenfolge: erst melden, " +
      "dann reparieren. Wer zuerst repariert, bekommt oft nichts zurück.\n\n" +
      "Melden Sie den Vorfall möglichst am selben Tag. Wichtig sind vier Angaben: " +
      "wann, wo, wie und wer. Wenn ein Zeuge dabei war, geben Sie auch seinen Namen " +
      "an. Eine Aufnahme mit dem Handy hilft mehr als eine lange Beschreibung.\n\n" +
      "Bei einem Unfall mit zwei Autos sind zwei Versicherungen im Spiel. " +
      "Sie schreiben nur an Ihre Versicherung. Was danach zwischen den beiden passiert, " +
      "ist nicht Ihre Sache.\n\n" +
      "Bewahren Sie jede Quittung auf. Ohne Quittung wird nichts bezahlt, auch " +
      "wenn der Schaden offensichtlich ist. Und rufen Sie an, bevor Sie etwas " +
      "unterschreiben — dafür sind Sie schließlich versichert.",
    questions: [
      {
        text: "Was ist die richtige Reihenfolge?",
        options: ["Erst reparieren, dann melden", "Erst melden, dann reparieren", "Nur reparieren"],
        answer: 1,
        explain: "„… erst melden, dann reparieren.“",
      },
      {
        text: "Welche vier Angaben sind wichtig?",
        options: ["Wann, wo, wie und wer", "Preis, Zeit, Ort und Farbe", "Name, Adresse, Alter und Beruf"],
        answer: 0,
        explain: "„Wichtig sind vier Angaben: wann, wo, wie und wer.“",
      },
      {
        text: "An wen schreibt man bei einem Unfall mit zwei Autos?",
        options: ["An beide Versicherungen", "Nur an die eigene Versicherung", "An die Polizei"],
        answer: 1,
        explain: "„Sie schreiben nur an Ihre Versicherung.“",
      },
      {
        kind: "gapfill",
        text: "Wenn ein Schaden ___ ___, gilt eine einfache Reihenfolge.",
        options: [],
        answer: 0,
        accept: ["entstanden ist"],
        explain: "entstehen bir DURUM DEĞİŞİMİ → sein ile: ist entstanden.",
      },
      {
        kind: "short_answer",
        text: "Was hilft mehr als eine lange Beschreibung?",
        options: [],
        answer: 0,
        accept: ["eine Aufnahme", "eine Aufnahme mit dem Handy", "ein Foto"],
        explain: "„Eine Aufnahme mit dem Handy hilft mehr als eine lange Beschreibung.“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u12-l1",
    level: "B1",
    skill: "listening",
    unit: 12,
    title: "Der Termin fällt aus",
    genre: "Telefon konuşması",
    intro: "Bir randevu erteleniyor. Yeni tarih ne, sebep ne?",
    minutes: 4,
    gloss: [
      { de: "absagen", tr: "iptal etmek", en: "to cancel" },
      { de: "ausfallen", tr: "iptal olmak", en: "to be cancelled" },
      { de: "bestätigen", tr: "teyit etmek", en: "to confirm" },
      { de: "der Feiertag", tr: "resmî tatil", en: "public holiday" },
    ],
    segments: [
      { text: "Guten Tag, hier Praxis Berger. Ihr Termin morgen fällt leider aus." },
      { text: "Oh. Ist etwas passiert?" },
      { text: "Die Kollegin ist krank geworden. Es tut uns leid." },
      { text: "Kein Problem. Wann geht es denn sonst?" },
      { text: "Donnerstag um zehn? Freitag ist Feiertag, da haben wir zu." },
      { text: "Donnerstag passt. Können Sie mir das schriftlich bestätigen?" },
      { text: "Natürlich, ich schicke Ihnen gleich eine Nachricht." },
      { text: "Danke. Dann muss ich mich Donnerstag früh beeilen, aber das geht." },
    ],
    questions: [
      {
        text: "Warum fällt der Termin aus?",
        options: ["Die Kollegin ist krank geworden", "Der Patient hat abgesagt", "Es ist Feiertag"],
        answer: 0,
        explain: "„Die Kollegin ist krank geworden.“",
      },
      {
        text: "Warum geht es nicht am Freitag?",
        options: ["Da ist Feiertag", "Da ist alles voll", "Da ist die Praxis umgezogen"],
        answer: 0,
        explain: "„Freitag ist Feiertag, da haben wir zu.“",
      },
      {
        text: "Was möchte die zweite Person bekommen?",
        options: ["Ein neues Rezept", "Eine schriftliche Bestätigung", "Geld zurück"],
        answer: 1,
        explain: "„Können Sie mir das schriftlich bestätigen?“",
      },
      {
        kind: "gapfill",
        text: "Dann muss ich ___ Donnerstag früh ___.",
        options: [],
        answer: 0,
        accept: ["mich beeilen"],
        explain: "„sich beeilen“ dönüşlüdür: zamir düşerse cümle bozulur.",
      },
      {
        kind: "short_answer",
        text: "Wann ist der neue Termin?",
        options: [],
        answer: 0,
        accept: ["Donnerstag um zehn", "am Donnerstag um zehn", "Donnerstag"],
        explain: "„Donnerstag um zehn?“ — „Donnerstag passt.“",
      },
    ],
  },
  {
    id: "b1-u12-l2",
    level: "B1",
    skill: "listening",
    unit: 12,
    title: "Was kann ich angeben?",
    genre: "Vergi danışması",
    intro: "Vergi beyanı konuşuluyor. Hangi belge neden gerekiyor?",
    minutes: 4,
    gloss: [
      { de: "angeben", tr: "beyan etmek", en: "to declare" },
      { de: "die Quittung", tr: "makbuz", en: "receipt" },
      { de: "die Einnahme", tr: "gelir", en: "income" },
      { de: "möglichst", tr: "mümkün olduğunca", en: "as … as possible" },
    ],
    segments: [
      { text: "Ich mache das zum ersten Mal. Was kann ich überhaupt angeben?" },
      { text: "Alles, was mit der Arbeit zu tun hat. Fahrten, Kurse, Werkzeug." },
      { text: "Auch den Sprachkurs vom letzten Jahr?" },
      { text: "Wenn er beruflich war, ja. Hast du die Quittung noch?" },
      { text: "Ich glaube schon. Ich bin damals nur dafür hingefahren." },
      { text: "Gut, dann gib auch die Fahrten an. Sammle möglichst alles." },
      { text: "Und meine Einnahmen aus dem Nebenjob?" },
      { text: "Die musst du sowieso angeben. Das ist keine Wahl." },
    ],
    questions: [
      {
        text: "Was kann man angeben?",
        options: ["Alles, was mit der Arbeit zu tun hat", "Nur die Miete", "Nichts"],
        answer: 0,
        explain: "„Alles, was mit der Arbeit zu tun hat. Fahrten, Kurse, Werkzeug.“",
      },
      {
        text: "Wann zählt der Sprachkurs?",
        options: ["Immer", "Wenn er beruflich war", "Nie"],
        answer: 1,
        explain: "„Wenn er beruflich war, ja.“",
      },
      {
        text: "Was gilt für die Einnahmen aus dem Nebenjob?",
        options: ["Man kann sie angeben", "Man muss sie angeben", "Sie zählen nicht"],
        answer: 1,
        explain: "„Die musst du sowieso angeben. Das ist keine Wahl.“",
      },
      {
        kind: "gapfill",
        text: "Ich ___ damals nur dafür hingefahren.",
        options: [],
        answer: 0,
        accept: ["bin"],
        explain: "„fahren“ hareket bildirir → Perfekt sein ile kurulur.",
      },
      {
        kind: "short_answer",
        text: "Welche drei Beispiele nennt die zweite Person?",
        options: [],
        answer: 0,
        accept: ["Fahrten, Kurse, Werkzeug", "Fahrten Kurse Werkzeug"],
        explain: "„Fahrten, Kurse, Werkzeug.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u12-w1",
    level: "B1",
    skill: "writing",
    unit: 12,
    title: "Den Vorfall melden",
    genre: "Hasar bildirimi",
    intro: "Bir olayı sigortaya bildir. Geçmiş anlatırken yardımcı fiili doğru seç.",
    minutes: 8,
    gloss: [
      { de: "der Vorfall", tr: "olay", en: "incident" },
      { de: "entstehen", tr: "meydana gelmek", en: "to arise" },
      { de: "der Zeuge", tr: "tanık", en: "witness" },
      { de: "bremsen", tr: "fren yapmak", en: "to brake" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Salı sabahı saat yedide oradan geçtim.",
        answer: "Ich bin am Dienstagmorgen um sieben dort gefahren.",
        hint: "Hareket fiili → sein.",
      },
      {
        kind: "build",
        tr: "Levhayı görür görmez fren yaptım.",
        answer: "Ich habe gebremst, sobald ich das Schild gesehen habe.",
        hint: "„bremsen“ hareket değil bir eylem → haben.",
      },
      {
        kind: "build",
        tr: "Hasar dün akşam oluştu.",
        answer: "Der Schaden ist gestern Abend entstanden.",
        hint: "„entstehen“ durum değişimi → sein.",
      },
      {
        kind: "form",
        prompt: "Hasar bildirim formunu doldur.",
        facts: "Bildiren: Nuri Öz; olay: trafik cezası; gün: salı, saat 7; tanık: eşi; ek: tamirhane makbuzu.",
        fields: [
          { label: "Name", answer: "Nuri Öz", accept: ["Nuri", "Öz"] },
          { label: "Vorfall", answer: "Strafzettel", accept: ["ein Strafzettel", "die Strafe"] },
          { label: "Zeit", answer: "Dienstag um 7", accept: ["Dienstag", "am Dienstag um sieben"] },
          { label: "Zeuge", answer: "meine Frau", accept: ["die Frau", "seine Frau"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Perfekt yardımcı fiilini düzelt.",
        source: "Ich habe zu spät gekommen und habe rechts abgebogen.",
        answer: "Ich bin zu spät gekommen und bin rechts abgebogen.",
        why: "Türkçede geçmiş tek ektir ('geldim' · 'saptım'), o yüzden yardımcı fiil seçimi diye bir karar yok ve varsayılan olarak haben kullanılıyor. Almancada HAREKET ve DURUM DEĞİŞİMİ bildiren fiiller sein ister: kommen, gehen, fahren, abbiegen, entstehen, werden. Geri kalanı haben ile kurulur.",
      },
    ],
  },
  {
    id: "b1-u12-w2",
    level: "B1",
    skill: "writing",
    unit: 12,
    title: "Den Termin verschieben",
    genre: "Randevu e-postası",
    intro: "Bir randevuyu ertele. Dönüşlü fiillerde zamiri unutma.",
    minutes: 12,
    gloss: [
      { de: "sich beeilen", tr: "acele etmek", en: "to hurry" },
      { de: "die Eile", tr: "acele", en: "haste" },
      { de: "geeignet", tr: "uygun", en: "suitable" },
      { de: "dankbar", tr: "minnettar", en: "grateful" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Ne yazık ki salı günkü randevuyu iptal etmem gerekiyor.",
        answer: "Leider muss ich den Termin am Dienstag absagen.",
        hint: "„leider“ birinci öğe değilse özne başta kalır.",
      },
      {
        kind: "build",
        tr: "Yeni bir tarih için minnettar olurum.",
        answer: "Für einen neuen Termin wäre ich dankbar.",
        hint: "Kibar dilek: Konjunktiv II.",
      },
      {
        kind: "free",
        prompt: "Bir randevuyu erteleyen resmî bir e-posta yaz: hangi randevu (gün ve saat), neden erteleyemediğin, hangi tarihlerin sana uygun olduğu ve teyit istediğin. Resmî hitap ve kapanış kullan.",
        checklist: [
          "Resmî hitap ve kapanış var mı?",
          "Hangi randevu olduğu (gün ve saat) yazılmış mı?",
          "Sebep kısa ve nazik mi?",
          "En az iki uygun tarih önerilmiş mi?",
          "Teyit istenmiş mi?",
        ],
        minWords: 70,
        sample:
          "Sehr geehrte Frau Berger,\n\n" +
          "leider muss ich meinen Termin am Dienstag um neun Uhr absagen. " +
          "Ich bin an dem Tag beruflich unterwegs und komme nicht rechtzeitig " +
          "zurück. Es tut mir leid, dass ich erst jetzt schreibe.\n\n" +
          "Geeignet wären für mich Donnerstag ab zehn oder Montag am Nachmittag. " +
          "Freitag geht leider nicht, weil da Feiertag ist.\n\n" +
          "Könnten Sie mir den neuen Termin kurz schriftlich bestätigen? " +
          "Dann muss ich mich am Morgen nicht beeilen und bin sicher pünktlich.\n\n" +
          "Für Ihre Nachfrage bin ich dankbar.\n\n" +
          "Mit freundlichen Grüßen\nNuri Öz",
        phrases: [
          { de: "Leider muss ich … absagen.", tr: "Ne yazık ki … iptal etmem gerekiyor.", en: "Unfortunately I have to cancel …" },
          { de: "Geeignet wären für mich …", tr: "Bana uygun olan …", en: "Suitable for me would be …" },
          { de: "Könnten Sie … bestätigen?", tr: "… teyit eder misiniz?", en: "Could you confirm …?" },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Dönüşlü zamiri yerine koy.",
        source: "Dann muss ich am Morgen nicht beeilen.",
        answer: "Dann muss ich mich am Morgen nicht beeilen.",
        why: "Türkçede dönüşlülük fiilin içindedir ('acele etmek'), ayrı bir sözcük yoktur — o yüzden zamir büsbütün düşüyor. Almancada sich beeilen, sich freuen, sich befinden, sich verhalten gibi fiillerde zamir fiilin PARÇASIDIR ve özneye göre değişir: ich mich, du dich, er sich.",
      },
    ],
  },
];
