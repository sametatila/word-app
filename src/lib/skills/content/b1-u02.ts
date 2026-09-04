import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 2 — "İş dünyası" devamı (dersler 5–8).
 *
 * Dersler: Der erste Arbeitstag · Gleitzeit und Überstunden ·
 * Über das Gehalt sprechen · Die Absage.
 *
 * Ünite 1'in 32 kelimesi hâlâ serbest; buraya 32 tane daha eklendi:
 * sich wenden, unsicher, der Praktikant, die Kollegin, das Personal,
 * die Besprechung, die Organisation, die Kommunikation, die Überstunde,
 * flexibel, der Feierabend, die Vollzeit, die Erholung, der Antrag, gelten,
 * regelmäßig, das Gehalt, der Lohn, das Einkommen, erhöhen, fordern,
 * die Kosten, die Steuer, die Rente, nachdem, der Versuch, melden,
 * die Absage, die Enttäuschung, die Hoffnung, aufgeben, das Pech.
 * Kalıplar: dolaylı soru · wenn · Konjunktiv II · Plusquamperfekt.
 */
export const b1U02: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u2-r1",
    level: "B1",
    skill: "reading",
    unit: 2,
    title: "Der erste Arbeitstag",
    genre: "Blog yazısı",
    intro: "Yeni bir işe başlayan birinin ilk gün notları. Neyi bilmediğini ve kime sorduğunu oku.",
    minutes: 5,
    gloss: [
      { de: "der Praktikant", tr: "stajyer", en: "intern" },
      { de: "die Besprechung", tr: "toplantı", en: "meeting" },
      { de: "das Personal", tr: "personel", en: "staff" },
      { de: "die Kommunikation", tr: "iletişim", en: "communication" },
      { de: "unsicher", tr: "emin olmayan", en: "unsure" },
    ],
    text:
      "Heute war mein erster Arbeitstag und ich war den ganzen Morgen unsicher. " +
      "Ich wusste nicht, wo die Küche ist, und ich wusste auch nicht, wann die erste Besprechung beginnt. " +
      "Zum Glück war eine Kollegin da. Sie zeigte mir alles und sagte: Wenn du etwas nicht weißt, " +
      "dann frag einfach. Das half mir sehr.\n\n" +
      "Am Vormittag lernte ich das ganze Personal kennen. Ein Praktikant erklärte mir, die " +
      "Organisation im Haus und sagte, an wen ich mich bei Problemen wenden kann. " +
      "Die Kommunikation ist hier freundlich, aber schnell.\n\n" +
      "Um zwölf hatte ich schon fast alles vergessen, also schrieb ich alles auf. " +
      "Nachdem ich meine Notizen sortiert hatte, war ich viel ruhiger. " +
      "Am Nachmittag fragte mich der Chef, ob ich flexibel arbeiten möchte. " +
      "Ich sagte ja, weil ich morgens gern früh anfange. Um sechs war Feierabend.",
    questions: [
      {
        text: "Warum war der neue Kollege am Morgen unsicher?",
        options: ["Weil er zu spät kam", "Weil er nicht wusste, wo alles ist", "Weil er müde war"],
        answer: 1,
        explain: "„Ich wusste nicht, wo die Küche ist, und ich wusste auch nicht, wann die erste Besprechung beginnt.“",
      },
      {
        text: "Was sagte die Kollegin?",
        options: ["Er soll einfach fragen", "Er soll nichts fragen", "Er soll früher kommen"],
        answer: 0,
        explain: "„Wenn du etwas nicht weißt, dann frag einfach.“",
      },
      {
        text: "Was erklärte der Praktikant?",
        options: ["Wie das Gehalt berechnet wird", "Die Organisation im Haus", "Wo die Kantine ist"],
        answer: 1,
        explain: "„Ein Praktikant erklärte mir die Organisation im Haus.“",
      },
      {
        text: "Was machte er, nachdem er alles vergessen hatte?",
        options: ["Er ging nach Hause", "Er schrieb alles auf", "Er fragte den Chef"],
        answer: 1,
        explain: "„… also schrieb ich alles auf. Nachdem ich meine Notizen sortiert hatte, war ich viel ruhiger.“",
      },
      {
        kind: "gapfill",
        text: "Um sechs war ___.",
        options: [],
        answer: 0,
        accept: ["Feierabend"],
        explain: "„Um sechs war Feierabend.“",
      },
    ],
  },
  {
    id: "b1-u2-r2",
    level: "B1",
    skill: "reading",
    unit: 2,
    title: "Zwei Antworten",
    genre: "E-posta",
    intro: "Bir başvuruya gelen iki farklı cevap. Hangisi ret, hangisi davet? Gerekçelere dikkat et.",
    minutes: 5,
    gloss: [
      { de: "die Absage", tr: "ret cevabı", en: "rejection" },
      { de: "die Enttäuschung", tr: "hayal kırıklığı", en: "disappointment" },
      { de: "der Versuch", tr: "deneme", en: "attempt" },
      { de: "das Pech", tr: "şanssızlık", en: "bad luck" },
      { de: "aufgeben", tr: "pes etmek", en: "to give up" },
      { de: "Mit freundlichen Grüßen", tr: "Saygılarımla", en: "Kind regards" },
    ],
    text:
      "Sehr geehrte Frau Aydin,\n\n" +
      "vielen Dank für Ihre Bewerbung. Leider müssen wir Ihnen eine Absage schicken. " +
      "Wir hatten sehr viele Bewerbungen und haben eine andere Person genommen. " +
      "Das sagt nichts über Ihre Erfahrung. Wir wünschen Ihnen für Ihre nächsten Versuche viel Erfolg.\n\n" +
      "Mit freundlichen Grüßen, Firma Weber\n\n" +
      "Liebe Frau Aydin,\n\n" +
      "wir haben Ihre Unterlagen gelesen und würden Sie gern kennenlernen. " +
      "Hätten Sie am Mittwoch um zehn Uhr Zeit? Wenn der Termin nicht passt, melden Sie sich bitte. " +
      "Bringen Sie bitte Ihren Abschluss mit.\n\n" +
      "Freundliche Grüße, Firma Lange\n\n" +
      "Notiz von Frau Aydin: Die erste Mail war eine Enttäuschung, aber die zweite kam am selben Tag. " +
      "Nachdem ich die Absage gelesen hatte, wollte ich fast aufgeben. Das wäre ein Fehler gewesen. " +
      "Manchmal ist es einfach Pech, und der nächste Versuch ist der richtige.",
    questions: [
      {
        text: "Warum bekam Frau Aydin von der Firma Weber eine Absage?",
        options: ["Ihre Erfahrung war schlecht", "Es gab sehr viele Bewerbungen", "Sie kam zu spät"],
        answer: 1,
        explain: "„Wir hatten sehr viele Bewerbungen und haben eine andere Person genommen.“",
      },
      {
        text: "Was will die Firma Lange?",
        options: ["Sie kennenlernen", "Ihr eine Absage schicken", "Ihr Gehalt wissen"],
        answer: 0,
        explain: "„… würden Sie gern kennenlernen.“",
      },
      {
        text: "Was soll Frau Aydin tun, wenn der Termin nicht passt?",
        options: ["Nichts tun", "Sich melden", "Später kommen"],
        answer: 1,
        explain: "„Wenn der Termin nicht passt, melden Sie sich bitte.“",
      },
      {
        text: "Was wollte Frau Aydin nach der Absage fast tun?",
        options: ["Aufgeben", "Die Firma anrufen", "Eine neue Ausbildung machen"],
        answer: 0,
        explain: "„Nachdem ich die Absage gelesen hatte, wollte ich fast aufgeben.“",
      },
      {
        kind: "gapfill",
        text: "___ ich die Absage gelesen hatte, wollte ich fast aufgeben.",
        options: [],
        answer: 0,
        accept: ["Nachdem"],
        explain: "Önce olan olayı geriye alan bağlaç: „nachdem“ + Plusquamperfekt.",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u2-l1",
    level: "B1",
    skill: "listening",
    unit: 2,
    title: "Gleitzeit oder feste Zeit?",
    genre: "İş yeri konuşması",
    intro: "İki meslektaş çalışma saatlerini konuşuyor. Dinle: kim esnek çalışıyor, fazla mesai ne oluyor?",
    minutes: 4,
    gloss: [
      { de: "die Überstunde", tr: "fazla mesai", en: "overtime" },
      { de: "flexibel", tr: "esnek", en: "flexible" },
      { de: "die Vollzeit", tr: "tam zamanlı çalışma", en: "full-time" },
      { de: "regelmäßig", tr: "düzenli", en: "regular" },
    ],
    segments: [
      { text: "Du fängst immer so früh an. Arbeitest du flexibel?" },
      { text: "Ja, ich komme um sieben und gehe um vier. Das passt gut zu meiner Familie." },
      { text: "Und wenn du länger bleiben musst?" },
      { text: "Dann sind das Überstunden. Die schreibe ich auf und nehme später frei." },
      { text: "Bei mir geht das nicht. Ich arbeite in Vollzeit mit festen Zeiten." },
      { text: "Hast du schon einen Antrag gestellt?" },
      { text: "Noch nicht. Aber wenn die neue Regel gilt, versuche ich es." },
      { text: "Mach das. Regelmäßige Erholung ist wichtiger als ein bisschen mehr Lohn." },
    ],
    questions: [
      {
        text: "Wann fängt die erste Person an?",
        options: ["Um sechs", "Um sieben", "Um acht"],
        answer: 1,
        explain: "„Ich komme um sieben und gehe um vier.“",
      },
      {
        text: "Was macht sie mit Überstunden?",
        options: ["Sie schreibt sie auf und nimmt später frei", "Sie bekommt mehr Lohn", "Sie vergisst sie"],
        answer: 0,
        explain: "„Die schreibe ich auf und nehme später frei.“",
      },
      {
        text: "Warum kann die zweite Person nicht flexibel arbeiten?",
        options: ["Sie will nicht", "Sie arbeitet in Vollzeit mit festen Zeiten", "Sie hat keinen Chef"],
        answer: 1,
        explain: "„Ich arbeite in Vollzeit mit festen Zeiten.“",
      },
      {
        kind: "gapfill",
        text: "Wenn die neue Regel ___, versuche ich es.",
        options: [],
        answer: 0,
        accept: ["gilt"],
        explain: "„Aber wenn die neue Regel gilt, versuche ich es.“",
      },
    ],
  },
  {
    id: "b1-u2-l2",
    level: "B1",
    skill: "listening",
    unit: 2,
    title: "Über Geld sprechen",
    genre: "Görüşme",
    intro: "Maaş konuşuluyor. Dinle: aday ne kadar istiyor, firma ne diyor, sonuç ne?",
    minutes: 4,
    gloss: [
      { de: "das Gehalt", tr: "maaş", en: "salary" },
      { de: "erhöhen", tr: "artırmak", en: "to increase" },
      { de: "das Einkommen", tr: "gelir", en: "income" },
      { de: "die Steuer", tr: "vergi", en: "tax" },
    ],
    segments: [
      { text: "Kommen wir zum Gehalt. Was stellen Sie sich vor?" },
      { text: "Ich hätte gern etwas mehr als in meiner alten Stelle." },
      { text: "Wie viel war das denn?" },
      { text: "Mein Einkommen lag bei dreitausend im Monat, vor Steuern." },
      { text: "Wir könnten mit dreitausendzweihundert anfangen." },
      { text: "Wäre es möglich, das nach einem Jahr zu erhöhen?" },
      { text: "Das ist bei uns normal, wenn die Arbeit gut läuft." },
      { text: "Dann bin ich einverstanden. Vielen Dank." },
    ],
    questions: [
      {
        text: "Wie hoch war ihr altes Einkommen?",
        options: ["Zweitausend", "Dreitausend", "Viertausend"],
        answer: 1,
        explain: "„Mein Einkommen lag bei dreitausend im Monat, vor Steuern.“",
      },
      {
        text: "Was bietet die Firma an?",
        options: ["Dreitausend", "Dreitausendzweihundert", "Dreitausendfünfhundert"],
        answer: 1,
        explain: "„Wir könnten mit dreitausendzweihundert anfangen.“",
      },
      {
        text: "Was fragt die Kandidatin danach?",
        options: ["Ob sie später mehr bekommen kann", "Ob sie flexibel arbeiten kann", "Ob es Überstunden gibt"],
        answer: 0,
        explain: "„Wäre es möglich, das nach einem Jahr zu erhöhen?“",
      },
      {
        kind: "gapfill",
        text: "Mein Einkommen lag bei dreitausend im Monat, vor ___.",
        options: [],
        answer: 0,
        accept: ["Steuern"],
        explain: "„… vor Steuern.“ — vergiler kesilmeden önce.",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u2-w1",
    level: "B1",
    skill: "writing",
    unit: 2,
    title: "Der Antrag",
    genre: "Resmî istek",
    intro: "Esnek çalışma için bir istek yaz. Önce cümle kur, sonra formu doldur.",
    minutes: 8,
    gloss: [
      { de: "der Antrag", tr: "dilekçe / başvuru", en: "application" },
      { de: "flexibel", tr: "esnek", en: "flexible" },
      { de: "die Überstunde", tr: "fazla mesai", en: "overtime" },
      { de: "die Erholung", tr: "dinlenme", en: "recovery" },
      { de: "gelten", tr: "geçerli olmak", en: "to be valid" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Daha esnek çalışabilir miyim diye soruyorum.",
        answer: "Ich frage, ob ich flexibler arbeiten kann.",
        hint: "Dolaylı soru: bağlaçtan sonra çekimli fiil sona gider.",
      },
      {
        kind: "build",
        tr: "Erken başlarsam akşam çocuğumu alabilirim.",
        answer: "Wenn ich früh anfange, kann ich mein Kind am Abend abholen.",
        alternatives: ["Ich kann mein Kind am Abend abholen, wenn ich früh anfange."],
        hint: "Koşul yan cümlesi başta; ana cümle fiille başlar.",
      },
      {
        kind: "build",
        tr: "Fazla mesaiyi yazıp sonra izin almak isterdim.",
        answer: "Ich würde die Überstunden aufschreiben und später frei nehmen.",
        hint: "Kibar istek için Konjunktiv II; iki mastar bağlaçla birleşiyor.",
      },
      {
        kind: "form",
        prompt: "Esnek çalışma isteği formunu doldur.",
        facts: "Çalışan: tam zamanlı; istediği başlangıç saati 07:00; gerekçe: çocuk; fazla mesai için istek: sonradan izin.",
        fields: [
          { label: "Arbeitszeit jetzt", answer: "Vollzeit", accept: ["die Vollzeit", "Vollzeit mit festen Zeiten"] },
          { label: "Neuer Beginn", answer: "sieben Uhr", accept: ["7 Uhr", "um sieben", "07:00"] },
          { label: "Grund", answer: "das Kind", accept: ["Kind", "mein Kind", "Familie"] },
          { label: "Überstunden", answer: "später frei nehmen", accept: ["frei nehmen", "Freizeit"] },
        ],
      },
    ],
  },
  {
    id: "b1-u2-w2",
    level: "B1",
    skill: "writing",
    unit: 2,
    title: "Nach der Absage",
    genre: "Yarı resmî e-posta",
    intro: "Ret cevabı geldi. Kibarca geri bildirim iste ve kapıyı açık bırak.",
    minutes: 12,
    gloss: [
      { de: "die Absage", tr: "ret cevabı", en: "rejection" },
      { de: "die Hoffnung", tr: "umut", en: "hope" },
      { de: "der Versuch", tr: "deneme", en: "attempt" },
      { de: "melden", tr: "haber vermek", en: "to get in touch" },
      { de: "die Enttäuschung", tr: "hayal kırıklığı", en: "disappointment" },
      { de: "Mit freundlichen Grüßen", tr: "Saygılarımla", en: "Kind regards" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Ret cevabı için teşekkür ederim.",
        answer: "Ich danke Ihnen für Ihre Absage.",
        hint: "Teşekkür fiili yönelme hâli ister: „Ich danke Ihnen …“.",
      },
      {
        kind: "build",
        tr: "Nerede daha iyi olabileceğimi öğrenmek isterdim.",
        answer: "Ich würde gern wissen, wo ich mich verbessern kann.",
        hint: "Konjunktiv II ile kibar istek, sonra dolaylı soru: fiil sonda.",
      },
      {
        kind: "free",
        prompt: "Bir başvurunun reddedildiğini öğrendin. Firmaya kısa ve kibar bir e-posta yaz: teşekkür et, kısa bir geri bildirim iste, ileride yeni bir pozisyon açılırsa haber vermelerini rica et.",
        checklist: [
          "Resmî hitap ve kapanış var mı?",
          "Ret için teşekkür ettin mi (suçlama yok)?",
          "Geri bildirimi Konjunktiv II ile kibarca istedin mi?",
          "İleride haber vermelerini rica ettin mi?",
        ],
        minWords: 60,
        sample:
          "Sehr geehrte Frau Weber,\n\n" +
          "vielen Dank für Ihre Nachricht. Natürlich war Ihre Absage für mich eine " +
          "Enttäuschung, aber ich verstehe, dass Sie sehr viele Bewerbungen hatten.\n\n" +
          "Ich würde gern wissen, wo ich mich noch verbessern kann. Wenn Sie mir dazu " +
          "kurz etwas schreiben könnten, wäre ich Ihnen sehr dankbar.\n\n" +
          "Falls Sie später wieder eine Stelle haben, würde ich mich über eine " +
          "Nachricht freuen. Ich melde mich in sechs Monaten noch einmal, denn " +
          "meine Hoffnung ist, dass der nächste Versuch klappt.\n\n" +
          "Mit freundlichen Grüßen\nSelin Aydin",
        phrases: [
          { de: "Vielen Dank für Ihre Nachricht.", tr: "Mesajınız için teşekkürler.", en: "Thank you for your message." },
          { de: "Ich würde gern wissen, …", tr: "… öğrenmek isterdim.", en: "I would like to know …" },
          { de: "Falls Sie später …", tr: "İleride … olursa", en: "If you later …" },
          { de: "Ich melde mich noch einmal.", tr: "Tekrar haber veririm.", en: "I will get in touch again." },
        ],
      },
    ],
  },
];
