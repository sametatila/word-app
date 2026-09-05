import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 15 — "Öğrenmenin insan tarafı" (dersler 57–60).
 *
 * Dersler: Das Praktikum · Lernmethoden · Fehlerkultur · Der Mentor.
 *
 * Ünitenin ortak konusu bir ustadan öğrenmek: bakmak, denemek, yanılmak,
 * geri bildirim almak. Dil tarafında iki nokta ölçülüyor ve ikisi de
 * Türkçenin TEK yaptığı bir şeyin Almancada ikiye ayrılması:
 *   cümle ortasının sırası  Türkçede zarflar özneden sonra serbestçe
 *                           dizilir; Almancada ZAMAN → BİÇİM → YER sırası
 *                           neredeyse sabittir ("morgen mit dem Zug nach
 *                           Berlin", tersi değil).
 *   nicht ↔ kein            Türkçede olumsuzluk tek biçimdir ('değil/yok');
 *                           Almanca belirsiz isimden önce kein, geri
 *                           kalanında nicht ister.
 *
 * Yeni 32 kelime: der Betrieb, betreuen, zusehen, bedienen, beobachten,
 * darstellen, der Rechner, die Aushilfe, die Methode, die Konzentration,
 * die Wiederholung, sinnlos, aufschreiben, der Vortrag, erleichtern,
 * sich anstrengen, korrigieren, sich ärgern, peinlich, die Rücksicht,
 * hinweisen, der Humor, Verzeihung, einverstanden, begleiten,
 * der Standpunkt, die Unterstützung, die Empfehlung, Ratschlag,
 * besprechen, die Richtung, erleben.
 */
export const b1U15: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u15-r1",
    level: "B1",
    skill: "reading",
    unit: 15,
    title: "Die erste Woche im Betrieb",
    genre: "Staj günlüğü",
    intro: "Bir stajın ilk haftası. Hangi gün ne yapıldı, sırayla oku.",
    minutes: 5,
    gloss: [
      { de: "der Betrieb", tr: "işletme", en: "company" },
      { de: "betreuen", tr: "ilgilenmek / eğitmek", en: "to supervise" },
      { de: "zusehen", tr: "izlemek", en: "to watch" },
      { de: "bedienen", tr: "kullanmak / hizmet etmek", en: "to operate" },
      { de: "die Aushilfe", tr: "yardımcı eleman", en: "temporary help" },
    ],
    text:
      "Am Montag bin ich um sieben mit dem Rad in den Betrieb gefahren. " +
      "Eine Kollegin hat mich betreut und mir alles gezeigt.\n\n" +
      "Die ersten zwei Tage habe ich nur zugesehen. Das war keine verlorene Zeit: " +
      "wer vorher genau beobachtet, macht später weniger Fehler. Am Mittwoch " +
      "durfte ich zum ersten Mal den Rechner bedienen.\n\n" +
      "Am Donnerstag kam eine Aushilfe dazu, und ich sollte ihr die Arbeit " +
      "darstellen. Da habe ich gemerkt, wie viel ich schon verstanden hatte. " +
      "Etwas zu erklären ist die beste Wiederholung.\n\n" +
      "Am Freitag haben wir die Woche besprochen. Ich habe mir alles " +
      "aufgeschrieben, weil ich sonst zu schnell alles vergesse. " +
      "Nächste Woche darf ich allein arbeiten — mit Unterstützung im " +
      "Hintergrund, aber allein.",
    questions: [
      {
        text: "Wie ist die Person am Montag gekommen?",
        options: ["Mit dem Rad", "Mit dem Bus", "Zu Fuß"],
        answer: 0,
        explain: "„Am Montag bin ich um sieben mit dem Rad in den Betrieb gefahren.“",
      },
      {
        text: "Was hat sie die ersten zwei Tage gemacht?",
        options: ["Allein gearbeitet", "Nur zugesehen", "Den Rechner bedient"],
        answer: 1,
        explain: "„Die ersten zwei Tage habe ich nur zugesehen.“",
      },
      {
        text: "Was war am Donnerstag ihre Aufgabe?",
        options: ["Der Aushilfe die Arbeit darstellen", "Den Rechner reparieren", "Die Woche besprechen"],
        answer: 0,
        explain: "„Am Donnerstag kam eine Aushilfe dazu, und ich sollte ihr die Arbeit darstellen.“",
      },
      {
        kind: "gapfill",
        text: "Am Montag bin ich ___ ___ ___ in den Betrieb gefahren.",
        options: [],
        answer: 0,
        accept: ["um sieben mit dem Rad"],
        explain: "Sıra: ZAMAN (um sieben) → BİÇİM (mit dem Rad) → YER (in den Betrieb).",
      },
      {
        kind: "short_answer",
        text: "Warum hat sie sich alles aufgeschrieben?",
        options: [],
        answer: 0,
        accept: ["sie vergisst sonst alles", "weil sie sonst alles vergisst", "sie vergisst schnell"],
        explain: "„… weil ich sonst zu schnell alles vergesse.“",
      },
    ],
  },
  {
    id: "b1-u15-r2",
    level: "B1",
    skill: "reading",
    unit: 15,
    title: "Welche Methode hilft wirklich?",
    genre: "Rehber metin",
    intro: "Öğrenme yöntemleri üzerine bir yazı. Hangisi işe yarıyor, hangisi yaramıyor?",
    minutes: 5,
    gloss: [
      { de: "die Methode", tr: "yöntem", en: "method" },
      { de: "die Wiederholung", tr: "tekrar", en: "repetition" },
      { de: "sinnlos", tr: "anlamsız", en: "pointless" },
      { de: "sich anstrengen", tr: "çabalamak", en: "to make an effort" },
      { de: "erleichtern", tr: "kolaylaştırmak", en: "to make easier" },
    ],
    text:
      "Es gibt keine Methode, die für alle passt. Aber es gibt Methoden, die " +
      "fast nie funktionieren. Einen Text zehnmal zu lesen ist fast sinnlos: " +
      "es fühlt sich gut an und bringt kaum etwas.\n\n" +
      "Was hilft, ist die Wiederholung mit Abstand. Heute lernen, morgen kurz " +
      "prüfen, in einer Woche noch einmal. Das ist anstrengender, aber " +
      "es bleibt hängen. Ohne Anstrengung kein Fortschritt.\n\n" +
      "Zweitens kommt die Konzentration. Zwanzig Minuten ohne Handy " +
      "sind mehr wert als zwei Stunden mit. Wer dauernd unterbrochen wird, " +
      "fängt jedes Mal von vorn an.\n\n" +
      "Drittens hilft etwas ganz Einfaches: aufschreiben. Nicht abschreiben — " +
      "neu schreiben. Und wenn Sie etwas jemandem erklären können, " +
      "etwa in einem kurzen Vortrag, dann können Sie es wirklich. " +
      "Das erleichtert später alles.",
    questions: [
      {
        text: "Was hält der Text für fast nutzlos?",
        options: ["Wiederholung mit Abstand", "Einen Text zehnmal lesen", "Aufschreiben"],
        answer: 1,
        explain: "„Einen Text zehnmal zu lesen ist fast sinnlos: es fühlt sich gut an und bringt kaum etwas.“",
      },
      {
        text: "Wie sieht Wiederholung mit Abstand aus?",
        options: ["Alles an einem Tag", "Heute, morgen, in einer Woche", "Nur vor der Prüfung"],
        answer: 1,
        explain: "„Heute lernen, morgen kurz prüfen, in einer Woche noch einmal.“",
      },
      {
        text: "Was ist mehr wert als zwei Stunden mit Handy?",
        options: ["Zwanzig Minuten ohne Handy", "Eine Stunde mit Musik", "Gar nichts"],
        answer: 0,
        explain: "„Zwanzig Minuten ohne Handy sind mehr wert als zwei Stunden mit.“",
      },
      {
        kind: "gapfill",
        text: "Es gibt ___ Methode, die für alle passt.",
        options: [],
        answer: 0,
        accept: ["keine"],
        explain: "Belirsiz isimden önce olumsuzluk „kein“ ile kurulur, „nicht eine“ ile değil.",
      },
      {
        kind: "short_answer",
        text: "Wie soll man aufschreiben?",
        options: [],
        answer: 0,
        accept: ["neu schreiben", "nicht abschreiben", "selbst schreiben"],
        explain: "„Nicht abschreiben — neu schreiben.“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u15-l1",
    level: "B1",
    skill: "listening",
    unit: 15,
    title: "Das war mein Fehler",
    genre: "İş yerinde geri bildirim",
    intro: "Bir hata konuşuluyor. Ton nasıl, sonuç ne?",
    minutes: 4,
    gloss: [
      { de: "korrigieren", tr: "düzeltmek", en: "to correct" },
      { de: "peinlich", tr: "utandırıcı", en: "embarrassing" },
      { de: "hinweisen", tr: "dikkat çekmek", en: "to point out" },
      { de: "einverstanden", tr: "hemfikir", en: "in agreement" },
    ],
    segments: [
      { text: "Du, in der Abrechnung von gestern sind zwei Zahlen falsch." },
      { text: "Oh nein. Das ist mir peinlich." },
      { text: "Muss es nicht. Ich weise dich darauf hin, damit du es korrigieren kannst." },
      { text: "Danke. Ich ärgere mich trotzdem über mich selbst." },
      { text: "Das bringt nichts. Wichtig ist nur, dass es niemand weitergibt." },
      { text: "Verzeihung, ich mache das sofort." },
      { text: "Kein Stress. Und nimm dir zehn Minuten, bevor du schickst." },
      { text: "Einverstanden. Beim nächsten Mal lese ich alles noch einmal." },
    ],
    questions: [
      {
        text: "Was ist in der Abrechnung falsch?",
        options: ["Zwei Zahlen sind falsch", "Ein Name fehlt", "Das Datum fehlt"],
        answer: 0,
        explain: "„… in der Abrechnung von gestern sind zwei Zahlen falsch.“",
      },
      {
        text: "Warum weist die erste Person darauf hin?",
        options: ["Um zu ärgern", "Damit es korrigiert werden kann", "Um es zu melden"],
        answer: 1,
        explain: "„Ich weise dich darauf hin, damit du es korrigieren kannst.“",
      },
      {
        text: "Was rät sie zum Schluss?",
        options: ["Schneller arbeiten", "Vor dem Schicken zehn Minuten warten", "Nichts mehr schicken"],
        answer: 1,
        explain: "„Und nimm dir zehn Minuten, bevor du schickst.“",
      },
      {
        kind: "gapfill",
        text: "Ich ___ mich trotzdem ___ mich selbst.",
        options: [],
        answer: 0,
        accept: ["ärgere über"],
        explain: "„sich ärgern über“ — dönüşlü zamir ve edat birlikte gelir.",
      },
      {
        kind: "short_answer",
        text: "Was macht die zweite Person beim nächsten Mal?",
        options: [],
        answer: 0,
        accept: ["alles noch einmal lesen", "noch einmal lesen", "sie liest alles noch einmal"],
        explain: "„Beim nächsten Mal lese ich alles noch einmal.“",
      },
    ],
  },
  {
    id: "b1-u15-l2",
    level: "B1",
    skill: "listening",
    unit: 15,
    title: "Ein Gespräch mit dem Mentor",
    genre: "Yönlendirme konuşması",
    intro: "Bir mentor görüşmesi. Hangi öneri, hangi gerekçe?",
    minutes: 4,
    gloss: [
      { de: "begleiten", tr: "eşlik etmek", en: "to accompany" },
      { de: "die Empfehlung", tr: "tavsiye", en: "recommendation" },
      { de: "der Standpunkt", tr: "bakış açısı", en: "point of view" },
      { de: "die Richtung", tr: "yön", en: "direction" },
    ],
    segments: [
      { text: "Ich begleite dich jetzt seit sechs Monaten. Wie siehst du das?" },
      { text: "Besser als am Anfang. Aber ich weiß nicht, in welche Richtung es geht." },
      { text: "Das ist normal. Was hast du in dieser Zeit erlebt?" },
      { text: "Dass ich gern erkläre. Der Vortrag im März hat mir Spaß gemacht." },
      { text: "Dann ist mein Ratschlag: geh in die Richtung." },
      { text: "Meinst du wirklich? Ich habe keine Erfahrung im Unterrichten." },
      { text: "Noch nicht. Meine Empfehlung wäre eine Weiterbildung nebenher." },
      { text: "Von deinem Standpunkt ist das klar. Ich denke darüber nach." },
    ],
    questions: [
      {
        text: "Wie lange begleitet der Mentor die Person schon?",
        options: ["Sechs Monate", "Zwei Jahre", "Einen Monat"],
        answer: 0,
        explain: "„Ich begleite dich jetzt seit sechs Monaten.“",
      },
      {
        text: "Was hat der Person Spaß gemacht?",
        options: ["Der Vortrag im März", "Die Arbeit am Rechner", "Das Praktikum"],
        answer: 0,
        explain: "„Der Vortrag im März hat mir Spaß gemacht.“",
      },
      {
        text: "Was empfiehlt der Mentor?",
        options: ["Sofort wechseln", "Eine Weiterbildung nebenher", "Nichts zu ändern"],
        answer: 1,
        explain: "„Meine Empfehlung wäre eine Weiterbildung nebenher.“",
      },
      {
        kind: "gapfill",
        text: "Ich habe ___ Erfahrung im Unterrichten.",
        options: [],
        answer: 0,
        accept: ["keine"],
        explain: "Artikelsiz isim → kein. „nicht Erfahrung“ olmaz.",
      },
      {
        kind: "short_answer",
        text: "Was sagt die Person am Ende?",
        options: [],
        answer: 0,
        accept: ["sie denkt darüber nach", "ich denke darüber nach", "darüber nachdenken"],
        explain: "„Ich denke darüber nach.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u15-w1",
    level: "B1",
    skill: "writing",
    unit: 15,
    title: "Praktikumsbericht",
    genre: "Staj raporu",
    intro: "Staj haftanı anlat. Cümle ortasında zaman, biçim ve yer sırasına dikkat et.",
    minutes: 8,
    gloss: [
      { de: "der Betrieb", tr: "işletme", en: "company" },
      { de: "beobachten", tr: "gözlemlemek", en: "to observe" },
      { de: "darstellen", tr: "anlatmak / göstermek", en: "to present" },
      { de: "die Unterstützung", tr: "destek", en: "support" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Pazartesi günü saat yedide bisikletle işletmeye gittim.",
        answer: "Am Montag bin ich um sieben mit dem Rad in den Betrieb gefahren.",
        hint: "Sıra: zaman → biçim → yer.",
      },
      {
        kind: "build",
        tr: "İlk iki gün sadece izledim.",
        answer: "Die ersten zwei Tage habe ich nur zugesehen.",
        hint: "Ayrılabilen fiil: ortaç ge-'yi öneke alır (zugesehen).",
      },
      {
        kind: "build",
        tr: "Henüz hiç deneyimim yoktu.",
        answer: "Ich hatte noch keine Erfahrung.",
        hint: "Belirsiz isim → kein.",
      },
      {
        kind: "form",
        prompt: "Staj raporu künyesini doldur.",
        facts: "Stajyer: Nuri Öz; işletme: küçük bir atölye; süre: 4 hafta; sorumlu: bir meslektaş; ilk görev: izlemek.",
        fields: [
          { label: "Praktikant", answer: "Nuri Öz", accept: ["Nuri", "Öz"] },
          { label: "Betrieb", answer: "kleine Werkstatt", accept: ["eine Werkstatt", "Werkstatt"] },
          { label: "Dauer", answer: "4 Wochen", accept: ["vier Wochen"] },
          { label: "Erste Aufgabe", answer: "zusehen", accept: ["beobachten", "nur zusehen"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Cümle ortasının sırasını düzelt.",
        source: "Ich bin in den Betrieb am Montag mit dem Rad gefahren.",
        answer: "Ich bin am Montag mit dem Rad in den Betrieb gefahren.",
        why: "Türkçede zarflar özneden sonra hemen hemen serbest dizilir, o yüzden en önemli görülen bilgi öne alınıyor. Almancada cümle ortasının sırası neredeyse sabittir: ZAMAN → BİÇİM → YER (wann, wie, wo). Yeri öne almak cümleyi yanlış yapmaz ama kulağa hep yabancı gelir.",
      },
    ],
  },
  {
    id: "b1-u15-w2",
    level: "B1",
    skill: "writing",
    unit: 15,
    title: "Eine Rückmeldung geben",
    genre: "Geri bildirim notu",
    intro: "Birine hatasını nazikçe söyle. Olumsuzlukta 'nicht' mi 'kein' mi?",
    minutes: 12,
    gloss: [
      { de: "hinweisen", tr: "dikkat çekmek", en: "to point out" },
      { de: "die Rücksicht", tr: "anlayış", en: "consideration" },
      { de: "Ratschlag", tr: "öğüt", en: "piece of advice" },
      { de: "der Humor", tr: "mizah", en: "humour" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Hesapta iki sayı yanlış.",
        answer: "In der Abrechnung sind zwei Zahlen falsch.",
        hint: "Yer bilgisi öne alınınca fiil ikinci sırada kalır.",
      },
      {
        kind: "build",
        tr: "Bu bir sorun değil.",
        answer: "Das ist kein Problem.",
        hint: "Belirsiz isim → kein, „nicht ein“ değil.",
      },
      {
        kind: "free",
        prompt: "Bir meslektaşına yaptığı hatayla ilgili kısa ve nazik bir not yaz: hatanın ne olduğunu, neden yazdığını (suçlamak değil düzeltmesini sağlamak), somut bir öneri ve iyi bir kapanış. Suçlayıcı olmayan bir ton kur.",
        checklist: [
          "Hata somut olarak söylenmiş mi?",
          "Yazma sebebi (yardım etmek) açık mı?",
          "Somut bir öneri var mı?",
          "Ton suçlayıcı değil mi?",
          "Olumlu bir kapanış var mı?",
        ],
        minWords: 70,
        sample:
          "Hallo Aylin,\n\n" +
          "in der Abrechnung von gestern sind zwei Zahlen falsch — bei Nummer vier " +
          "und Nummer neun. Ich weise dich darauf hin, damit du es korrigieren " +
          "kannst, bevor sie weitergeht.\n\n" +
          "Das ist kein großes Problem und mir ist es auch schon passiert. " +
          "Es muss dir also nicht peinlich sein.\n\n" +
          "Ein Ratschlag, der mir sehr geholfen hat: nimm dir zehn Minuten Abstand, " +
          "bevor du so etwas schickst. Man sieht mit etwas Abstand mehr als " +
          "direkt danach. Das erleichtert die Sache wirklich.\n\n" +
          "Wenn du willst, schaue ich beim nächsten Mal kurz mit drüber. " +
          "Sag einfach Bescheid.\n\n" +
          "Viele Grüße\nNuri",
        phrases: [
          { de: "Ich weise dich darauf hin, damit …", tr: "Düzeltebilesin diye söylüyorum …", en: "I'm pointing it out so that …" },
          { de: "Das ist kein großes Problem.", tr: "Büyük bir sorun değil.", en: "That's not a big problem." },
          { de: "Sag einfach Bescheid.", tr: "Sadece haber ver.", en: "Just let me know." },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Olumsuzluk sözcüğünü düzelt.",
        source: "Ich habe nicht eine Idee und das ist nicht ein Problem.",
        answer: "Ich habe keine Idee und das ist kein Problem.",
        why: "Türkçede olumsuzluk tek biçimdir ('yok' / 'değil'), o yüzden Almancada da tek sözcük bekleniyor ve varsayılan olarak nicht seçiliyor. Almanca ikiye ayırır: BELİRSİZ ya da ARTİKELSİZ bir isim olumsuzlanıyorsa kein gelir (keine Idee, kein Problem, keine Erfahrung); belirli isim, fiil ya da sıfat olumsuzlanıyorsa nicht.",
      },
    ],
  },
];
