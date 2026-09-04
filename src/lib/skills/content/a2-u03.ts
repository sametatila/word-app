import type { SkillExercise } from "../types";

/**
 * A2 · Ünite 3 — "Hafta, haber ve hayaller".
 *
 * Dört ders: Die letzte Woche · Rate mal, was passiert ist! ·
 * Mein Weg nach Deutschland · Ich wollte Pilot werden. İçerik ünite 1-3'ün
 * kelimeleriyle sınırlı.
 *
 *   Ünite 3: voll, schaffen, der Rest, der Arbeitstag, stattfinden,
 *            wegbringen, durchgehen, wenigstens · bestehen, erraten,
 *            die Zusage, jubeln, das Stipendium, außergewöhnlich, staunen,
 *            die Verlobung · die Hauptstadt, die Kultur, die Landschaft,
 *            vertraut, auskommen, sich ausdrücken, die Kenntnisse,
 *            die Übersetzung · der Traum, träumen, der Pilot, der Tierarzt,
 *            der Feuerwehrmann, berühmt, begabt, der Wunsch
 *   Kalıplar: Ich habe … geschafft. · … hat stattgefunden. · Ich habe …
 *             bestanden. · Am Anfang war alles fremd. · Ich wollte … werden. ·
 *             Ich konnte nicht … · Ich musste …
 *
 * Burada üçüncü geçmiş biçimi giriyor: kip fiillerinin kısa geçmişi
 * (wollte / konnte / musste). Bunlar madde başı değil, fiilin çekimi — o yüzden
 * sözlükçede yoklar ama egzersizlerin dilbilgisi çekirdeği onlar.
 */
export const a2U03: SkillExercise[] = [
  {
    id: "a2-u03-r1",
    level: "A2",
    skill: "reading",
    unit: 3,
    title: "Eine volle Woche",
    genre: "Mesaj",
    intro: "Bir iş arkadaşına yazılmış mesaj: geçen hafta neyi yetiştirdi, neyi yetiştiremedi?",
    gloss: [
      { de: "voll", tr: "dolu", en: "full" },
      { de: "schaffen", tr: "yetiştirmek", en: "to manage" },
      { de: "der Arbeitstag", tr: "iş günü", en: "working day" },
      { de: "stattfinden", tr: "gerçekleşmek", en: "to take place" },
      { de: "durchgehen", tr: "gözden geçirmek", en: "to go through" },
      { de: "der Rest", tr: "kalan", en: "the rest" },
      { de: "wenigstens", tr: "en azından", en: "at least" },
    ],
    minutes: 3,
    text:
      "Hallo Jan,\n\n" +
      "sorry, dass ich erst heute schreibe. Meine Woche war wirklich voll.\n\n" +
      "Am Montag hat unser großes Team-Meeting stattgefunden, und danach hatte ich drei Tage nur Termine. Jeder Arbeitstag ging bis nach sieben. Am Mittwoch habe ich es trotzdem geschafft, die Zahlen für das neue Projekt fertig zu machen.\n\n" +
      "Die Liste mit den offenen Fragen habe ich noch nicht durchgegangen. Das mache ich am Montag, versprochen. Den Rest hat zum Glück Frau Öztürk übernommen.\n\n" +
      "Wenigstens war das Wochenende ruhig. Ich habe zwei Tage lang gar nichts gemacht und viel geschlafen.\n\n" +
      "Bis Montag!\nClaudia",
    questions: [
      {
        text: "Was hat am Montag stattgefunden?",
        options: ["Ein Team-Meeting", "Eine Prüfung", "Ein Ausflug"],
        answer: 0,
        explain: "„Am Montag hat unser großes Team-Meeting stattgefunden.“",
      },
      {
        kind: "gapfill",
        text: "Am Mittwoch habe ich es trotzdem ___.",
        options: [],
        answer: 0,
        accept: ["geschafft"],
        explain: "„schaffen“ kurallı bir fiil: ortacı düz kuruluyor — geschafft.",
      },
      {
        text: "Was hat Claudia noch nicht gemacht?",
        options: ["Die Zahlen fertig gemacht", "Die Liste durchgegangen", "Das Meeting vorbereitet"],
        answer: 1,
        explain: "„Die Liste mit den offenen Fragen habe ich noch nicht durchgegangen.“ Rakamları çarşamba bitirmiş.",
      },
      {
        kind: "short_answer",
        text: "Wer hat den Rest übernommen?",
        options: [],
        answer: 0,
        accept: ["Frau Öztürk", "Öztürk"],
        explain: "„Den Rest hat zum Glück Frau Öztürk übernommen.“",
      },
      {
        text: "Claudias Wochenende war auch sehr voll.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Wenigstens war das Wochenende ruhig.“ İki gün hiçbir şey yapmamış.",
      },
    ],
  },
  {
    id: "a2-u03-r2",
    level: "A2",
    skill: "reading",
    unit: 3,
    title: "Mein Weg nach Deutschland",
    genre: "Blog yazısı",
    intro: "Bir göç hikâyesi: başta neyi zor buldu, bugün nasıl?",
    gloss: [
      { de: "die Hauptstadt", tr: "başkent", en: "capital city" },
      { de: "die Landschaft", tr: "manzara", en: "landscape" },
      { de: "die Kultur", tr: "kültür", en: "culture" },
      { de: "vertraut", tr: "tanıdık", en: "familiar" },
      { de: "sich ausdrücken", tr: "kendini ifade etmek", en: "to express oneself" },
      { de: "die Kenntnisse", tr: "bilgi birikimi", en: "knowledge" },
      { de: "auskommen", tr: "geçinmek", en: "to get along" },
      { de: "die Übersetzung", tr: "çeviri", en: "translation" },
    ],
    minutes: 4,
    text:
      "Vor sechs Jahren bin ich nach Deutschland gekommen. Ich war 24 und hatte keine Deutschkenntnisse — kein einziges Wort.\n\n" +
      "Am Anfang war alles fremd. Ich habe in einer kleinen Stadt gewohnt, nicht in der Hauptstadt, und die Landschaft war ganz anders als zu Hause. Am schwersten war aber nicht das Wetter, sondern die Sprache. Ich konnte mich einfach nicht ausdrücken. Für jedes Formular brauchte ich eine Übersetzung.\n\n" +
      "Nach einem Jahr Kurs ging es besser. Heute komme ich mit meinen Nachbarn gut aus, und die Stadt ist mir vertraut geworden. Manches in der Kultur verstehe ich immer noch nicht, aber das ist okay.\n\n" +
      "Wenn mich jemand fragt, sage ich: der erste Winter war hart, der Rest war Arbeit.",
    questions: [
      {
        text: "Wie alt war der Autor bei der Ankunft?",
        options: ["24", "26", "Sechs"],
        answer: 0,
        explain: "„Ich war 24 und hatte keine Deutschkenntnisse.“ Altı, buradaki yıl sayısı.",
      },
      {
        kind: "gapfill",
        text: "Am Anfang war alles ___.",
        options: [],
        answer: 0,
        accept: ["fremd"],
        explain: "„Am Anfang war alles fremd.“ Olmak fiilinin kısa geçmişi: war.",
      },
      {
        text: "Was war am schwersten?",
        options: ["Das Wetter", "Die Sprache", "Die Landschaft"],
        answer: 1,
        explain: "„Am schwersten war aber nicht das Wetter, sondern die Sprache.“",
      },
      {
        kind: "short_answer",
        text: "Was brauchte er für jedes Formular?",
        options: [],
        answer: 0,
        accept: ["eine Übersetzung", "Übersetzung"],
        explain: "„Für jedes Formular brauchte ich eine Übersetzung.“",
      },
      {
        text: "Er hat in der Hauptstadt gewohnt.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Ich habe in einer kleinen Stadt gewohnt, nicht in der Hauptstadt.“",
      },
    ],
  },
  {
    id: "a2-u03-l1",
    level: "A2",
    skill: "listening",
    unit: 3,
    title: "Rate mal, was passiert ist!",
    genre: "Telefon görüşmesi",
    intro: "Bir telefon konuşması: iyi haber ne, kim ne kazandı?",
    gloss: [
      { de: "erraten", tr: "doğru tahmin etmek", en: "to guess right" },
      { de: "bestehen", tr: "sınavı geçmek", en: "to pass" },
      { de: "die Zusage", tr: "olumlu cevap", en: "acceptance" },
      { de: "das Stipendium", tr: "burs", en: "scholarship" },
      { de: "staunen", tr: "hayret etmek", en: "to be amazed" },
      { de: "jubeln", tr: "sevinç çığlığı atmak", en: "to cheer" },
      { de: "außergewöhnlich", tr: "olağanüstü", en: "extraordinary" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Fatma", text: "Hallo Leon! Rate mal, was passiert ist!" },
      { speaker: "Leon", text: "Keine Ahnung. Hast du die Prüfung bestanden?" },
      { speaker: "Fatma", text: "Das auch, aber das ist nicht alles. Die Zusage ist heute gekommen — ich bekomme das Stipendium!" },
      { speaker: "Leon", text: "Was? Das ist ja außergewöhnlich! Ich staune wirklich." },
      { speaker: "Fatma", text: "Meine Mutter hat am Telefon gejubelt. Ich glaube, die ganze Straße hat es gehört." },
      { speaker: "Leon", text: "Das glaube ich sofort. Und wann geht es los?" },
      { speaker: "Fatma", text: "Im Oktober. Zwei Jahre lang, mit Kurs und allem. Ich habe es selbst noch nicht ganz erraten, wie mein Leben dann aussieht." },
    ],
    questions: [
      {
        text: "Was ist Fatmas Hauptnachricht?",
        options: ["Sie hat die Prüfung bestanden.", "Sie bekommt ein Stipendium.", "Sie zieht nach Berlin."],
        answer: 1,
        explain: "Sınavı da geçmiş ama „das ist nicht alles“ diyor: asıl haber bursun gelmesi.",
      },
      {
        kind: "gapfill",
        text: "Hast du die Prüfung ___?",
        options: [],
        answer: 0,
        accept: ["bestanden"],
        explain: "„bestehen“ kuralsız ve vurgusuz ön ekli: ortaç „ge“ almaz, sonu değişir — bestanden.",
      },
      {
        text: "Wer hat am Telefon gejubelt?",
        options: ["Leon", "Fatmas Mutter", "Fatma"],
        answer: 1,
        explain: "„Meine Mutter hat am Telefon gejubelt.“",
      },
      {
        kind: "dictation",
        text: "Fatma'nın telefonu açtıktan sonraki ilk cümlesini yaz.",
        options: [],
        answer: 0,
        accept: ["Hallo Leon! Rate mal, was passiert ist!"],
        explain: "Emir cümlesi artı yan cümle: yan cümlede fiil sona gider — „was passiert ist“.",
      },
    ],
  },
  {
    id: "a2-u03-l2",
    level: "A2",
    skill: "listening",
    unit: 3,
    title: "Was wolltest du als Kind werden?",
    genre: "Diyalog",
    intro: "Çocukluk hayalleri üzerine bir sohbet. Kim ne olmak istedi, neden olamadı?",
    gloss: [
      { de: "der Traum", tr: "hayal", en: "dream" },
      { de: "der Pilot", tr: "pilot", en: "pilot" },
      { de: "der Tierarzt", tr: "veteriner", en: "vet" },
      { de: "der Feuerwehrmann", tr: "itfaiyeci", en: "firefighter" },
      { de: "begabt", tr: "kabiliyetli", en: "talented" },
      { de: "berühmt", tr: "ünlü", en: "famous" },
      { de: "träumen", tr: "hayal kurmak", en: "to dream" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Sofia", text: "Sag mal, was wolltest du als Kind eigentlich werden?" },
      { speaker: "Aylin", text: "Feuerwehrmann. Also Feuerwehrfrau. Ich habe jahrelang davon geträumt." },
      { speaker: "Sofia", text: "Ernsthaft? Und warum ist es nichts geworden?" },
      { speaker: "Aylin", text: "Ich konnte nicht gut schwimmen, und dafür muss man das können. Später wollte ich dann Tierärztin werden." },
      { speaker: "Sofia", text: "Und das hat auch nicht geklappt?" },
      { speaker: "Aylin", text: "Nein, ich musste nach der Schule sofort arbeiten. Mein Bruder war der Begabte in der Familie — er ist heute Pilot." },
      { speaker: "Sofia", text: "Ein Pilot in der Familie! Ist er berühmt geworden?" },
      { speaker: "Aylin", text: "Nur bei uns zu Hause. Aber er sagt, sein Traum war immer nur das Fliegen." },
    ],
    questions: [
      {
        text: "Was wollte Aylin zuerst werden?",
        options: ["Tierärztin", "Feuerwehrfrau", "Pilotin"],
        answer: 1,
        explain: "İlk cevabı: „Feuerwehrmann. Also Feuerwehrfrau.“ Veterinerlik daha sonraki hayali.",
      },
      {
        kind: "gapfill",
        text: "Ich ___ nicht gut schwimmen.",
        options: [],
        answer: 0,
        accept: ["konnte"],
        explain: "Kip fiilleri geçmişte Perfekt kurmaz, kısa biçimlerini alır: können → konnte.",
      },
      {
        text: "Warum ist Aylin nicht Tierärztin geworden?",
        options: ["Sie musste sofort arbeiten.", "Sie mochte keine Tiere.", "Die Schule war zu teuer."],
        answer: 0,
        explain: "„ich musste nach der Schule sofort arbeiten“ — zorunluluk fiilinin kısa geçmişi.",
      },
      {
        kind: "short_answer",
        text: "Was ist Aylins Bruder von Beruf?",
        options: [],
        answer: 0,
        accept: ["Pilot", "Er ist Pilot"],
        explain: "„er ist heute Pilot“ — meslek adı artikelsiz kullanılıyor.",
      },
    ],
  },
  {
    id: "a2-u03-w1",
    level: "A2",
    skill: "writing",
    unit: 3,
    title: "wollte, konnte, musste",
    genre: "Dil bilgisi",
    intro: "Kip fiillerinin kısa geçmişi. Asıl fiil hep cümlenin sonunda kalır.",
    gloss: [
      { de: "der Pilot", tr: "pilot", en: "pilot" },
      { de: "der Tierarzt", tr: "veteriner", en: "vet" },
      { de: "schaffen", tr: "yetiştirmek", en: "to manage" },
      { de: "bestehen", tr: "sınavı geçmek", en: "to pass" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Pilot olmak istiyordum.",
        answer: "Ich wollte Pilot werden",
        hint: "Kip fiili geçmişte kısa biçimini alır ve asıl fiil SONDA kalır. Meslek adının önüne artikel gelmez.",
      },
      {
        kind: "build",
        tr: "Hemen çalışmak zorundaydım.",
        answer: "Ich musste sofort arbeiten",
        hint: "müssen → musste. Zarf kip fiiliyle asıl fiilin arasında durur.",
      },
      {
        kind: "build",
        tr: "İyi yüzemiyordum.",
        answer: "Ich konnte nicht gut schwimmen",
        hint: "können → konnte. Olumsuzluk kelimesi asıl fiilden önce gelir.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi kip fiilinin kısa geçmişiyle yeniden yaz.",
        source: "Ich habe Tierarzt werden wollen.",
        answer: "Ich wollte Tierarzt werden.",
        alternatives: ["Ich wollte Tierarzt werden"],
        why: "Kip fiilleri konuşmada Perfekt kurmaz; kısa geçmiş biçimi kullanılır.",
      },
    ],
  },
  {
    id: "a2-u03-w2",
    level: "A2",
    skill: "writing",
    unit: 3,
    title: "Eine gute Nachricht weitergeben",
    genre: "Mesaj",
    intro: "Bir arkadaşına iyi haberini yaz: ne oldu, nasıl hissettin, ne zaman başlıyor.",
    gloss: [
      { de: "bestehen", tr: "sınavı geçmek", en: "to pass" },
      { de: "die Zusage", tr: "olumlu cevap", en: "acceptance" },
      { de: "staunen", tr: "hayret etmek", en: "to be amazed" },
      { de: "außergewöhnlich", tr: "olağanüstü", en: "extraordinary" },
      { de: "schaffen", tr: "yetiştirmek", en: "to manage" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "reply",
        prompt: "Fatma'nın mesajına cevap yaz. Onu tebrik et ve kendi iyi haberini anlat: ne oldu, o an ne hissettin, bundan sonra ne olacak.",
        stimulus:
          "Hey!\n\nRate mal, was passiert ist — ich habe die Prüfung bestanden UND die Zusage für das Stipendium bekommen! Meine Mutter hat gejubelt.\n\nIm Oktober geht es los. Und bei dir? Gibt es auch etwas Neues?\n\nFatma",
        checklist: [
          "Fatma'yı tebrik ettin mi?",
          "Kendi haberini Perfekt ile anlattın mı (habe … bestanden / bekommen)?",
          "O anki duyguyu söyledin mi?",
          "Ne zaman başlayacağını yazdın mı?",
        ],
        minWords: 40,
        phrases: [
          { de: "Herzlichen Glückwunsch!", tr: "tebrikler", en: "congratulations" },
          { de: "Ich habe … bestanden.", tr: "…-i geçtim", en: "I passed …" },
          { de: "Ich habe wirklich gestaunt.", tr: "gerçekten hayret ettim", en: "I was really amazed" },
        ],
        sample:
          "Hey Fatma,\n\nherzlichen Glückwunsch! Das ist wirklich außergewöhnlich — beides an einem Tag!\n\nBei mir gibt es auch Neues: Ich habe letzte Woche meine Prüfung bestanden und heute die Zusage für den Praktikumsplatz bekommen. Als die Mail gekommen ist, habe ich erst gestaunt und dann meine Schwester angerufen.\n\nIch fange im November an. Ich habe es kaum geschafft, ruhig zu bleiben.\n\nWir müssen das feiern!\n\nLiebe Grüße\nMerve",
      },
    ],
  },
];
