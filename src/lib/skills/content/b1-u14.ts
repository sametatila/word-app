import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 14 — "Öğrenmenin kurumları" (dersler 53–56).
 *
 * Dersler: Der Sprachkurs · Die B1-Prüfung · Die Weiterbildung ·
 * Das Studium.
 *
 * Ünitenin dili KARŞILAŞTIRMA ve SORUŞTURMA: hangi kurs daha hızlı, sınav
 * sandığımdan zor muydu, kurs karşılığını veriyor mu. İki aktarım hatası
 * doğrudan buradan çıkıyor:
 *   als ↔ wie   Türkçe karşılaştırmayı tek yapıyla kurar ('-den daha' /
 *               '… kadar'), Almanca ikiye ayırır: EŞİT DEĞİLSE als,
 *               EŞİTSE so … wie. "schwerer wie" bu yüzden çok sık.
 *   ob ↔ wenn   Türkçede '-ip -mediğini' ile 'eğer' ayrı görünmez; Almanca
 *               dolaylı EVET/HAYIR sorusu için ob, koşul için wenn ister.
 *
 * Yeni 32 kelime: der Intensivkurs, das Tempo, die Lehrerin, unterrichten,
 * die Nachhilfe, verständlich, ausgebildet, derselbe, die Panik, der Trick,
 * die Vorbereitung, mutig, aufregen, zweifeln, achten, die Schrift,
 * die Weiterbildung, finanzieren, die Teilzeit, sich lohnen, der Alltag,
 * das Talent, nutzen, die Auswahl, die Hochschule, die Studentin,
 * der Professor, das Semester, sich erkundigen, die Wissenschaft,
 * das Referat, beschließen.
 */
export const b1U14: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u14-r1",
    level: "B1",
    skill: "reading",
    unit: 14,
    title: "Intensiv oder langsam?",
    genre: "Kurs karşılaştırması",
    intro: "İki kurs biçimi karşılaştırılıyor. Hangisi kime uygun?",
    minutes: 5,
    gloss: [
      { de: "der Intensivkurs", tr: "yoğun kurs", en: "intensive course" },
      { de: "das Tempo", tr: "hız", en: "pace" },
      { de: "verständlich", tr: "anlaşılır", en: "comprehensible" },
      { de: "die Nachhilfe", tr: "özel ders", en: "tutoring" },
      { de: "ausgebildet", tr: "eğitimli", en: "trained" },
    ],
    text:
      "Bei uns gibt es zwei Wege zum gleichen Ziel. Der Intensivkurs läuft vier " +
      "Wochen, jeden Tag vier Stunden. Der Abendkurs dauert sechs Monate, " +
      "zweimal pro Woche.\n\n" +
      "Das Tempo im Intensivkurs ist deutlich höher als im Abendkurs. Wer arbeitet, " +
      "schafft das meistens nicht. Der Abendkurs ist dafür nicht so schnell wie " +
      "der Intensivkurs, aber man hat Zeit, alles noch einmal zu lesen.\n\n" +
      "Beide Kurse werden von ausgebildeten Lehrerinnen unterrichtet, und beide " +
      "benutzen dasselbe Buch. Der Unterschied ist nicht der Inhalt, sondern das " +
      "Tempo. Wenn Sie zweifeln, kommen Sie einmal zum Zuschauen.\n\n" +
      "Wer im Kurs etwas nicht versteht, bekommt Nachhilfe. Das kostet nichts. " +
      "Sagen Sie es einfach — eine Erklärung ist nur dann verständlich, wenn " +
      "jemand nachfragt.",
    questions: [
      {
        text: "Wie lange dauert der Intensivkurs?",
        options: ["Vier Wochen", "Sechs Monate", "Zwei Monate"],
        answer: 0,
        explain: "„Der Intensivkurs läuft vier Wochen, jeden Tag vier Stunden.“",
      },
      {
        text: "Worin liegt der Unterschied zwischen den Kursen?",
        options: ["Im Inhalt", "Im Tempo", "Im Preis"],
        answer: 1,
        explain: "„Der Unterschied ist nicht der Inhalt, sondern das Tempo.“",
      },
      {
        text: "Was kostet die Nachhilfe?",
        options: ["Nichts", "Zehn Euro", "Die Hälfte des Kurses"],
        answer: 0,
        explain: "„Wer im Kurs etwas nicht versteht, bekommt Nachhilfe. Das kostet nichts.“",
      },
      {
        kind: "gapfill",
        text: "Der Abendkurs ist nicht so schnell ___ der Intensivkurs.",
        options: [],
        answer: 0,
        accept: ["wie"],
        explain: "„so … wie“ EŞİTLİK kurar. Eşit olmasaydı „als“ gelirdi.",
      },
      {
        kind: "short_answer",
        text: "Wie oft trifft sich der Abendkurs?",
        options: [],
        answer: 0,
        accept: ["zweimal pro Woche", "zweimal", "zwei Mal pro Woche"],
        explain: "„Der Abendkurs dauert sechs Monate, zweimal pro Woche.“",
      },
    ],
  },
  {
    id: "b1-u14-r2",
    level: "B1",
    skill: "reading",
    unit: 14,
    title: "Die Prüfung war anders",
    genre: "Deneyim yazısı",
    intro: "Biri sınav deneyimini anlatıyor. Beklenti ile gerçek arasındaki farka dikkat et.",
    minutes: 5,
    gloss: [
      { de: "die Panik", tr: "panik", en: "panic" },
      { de: "die Vorbereitung", tr: "hazırlık", en: "preparation" },
      { de: "zweifeln", tr: "kuşku duymak", en: "to doubt" },
      { de: "achten", tr: "dikkat etmek", en: "to pay attention" },
      { de: "der Trick", tr: "püf noktası", en: "trick" },
    ],
    text:
      "Vor der Prüfung habe ich mich furchtbar aufgeregt. Ich war sicher, dass " +
      "sie schwerer wird als alles, was ich bisher gemacht hatte. Sie war dann " +
      "anders, aber nicht schwerer.\n\n" +
      "Meine Vorbereitung war lang, aber nicht gut organisiert. Ich habe " +
      "dauernd neue Texte gelesen, statt dieselben noch einmal zu üben. " +
      "Das war mein Fehler.\n\n" +
      "Der beste Trick kam von einer Kollegin: Achte auf die Uhr, nicht auf die " +
      "anderen. Wer neben sich schaut, bekommt Panik. Wer nur auf seine Zeit " +
      "achtet, bleibt ruhig.\n\n" +
      "Beim Schreiben habe ich langsamer geschrieben als sonst, damit man die Schrift " +
      "gut lesen kann. Am Ende war ich mutig genug, eine Aufgabe nicht zu machen und " +
      "lieber zwei richtig zu schreiben. Ich habe nicht mehr gezweifelt — ich habe " +
      "einfach abgegeben.",
    questions: [
      {
        text: "Wie war die Prüfung im Vergleich zur Erwartung?",
        options: ["Schwerer", "Anders, aber nicht schwerer", "Genau gleich"],
        answer: 1,
        explain: "„Sie war dann anders, aber nicht schwerer.“",
      },
      {
        text: "Was war der Fehler bei der Vorbereitung?",
        options: ["Zu wenig Zeit", "Immer neue Texte statt Wiederholung", "Kein Buch"],
        answer: 1,
        explain: "„Ich habe dauernd neue Texte gelesen, statt dieselben noch einmal zu üben.“",
      },
      {
        text: "Was war der beste Trick?",
        options: ["Auf die Uhr achten, nicht auf die anderen", "Schnell schreiben", "Zuerst die schwerste Aufgabe"],
        answer: 0,
        explain: "„Achte auf die Uhr, nicht auf die anderen.“",
      },
      {
        kind: "gapfill",
        text: "Ich war sicher, dass sie schwerer wird ___ alles, was ich bisher gemacht hatte.",
        options: [],
        answer: 0,
        accept: ["als"],
        explain: "Karşılaştırma EŞİT DEĞİL (schwerer) → „als“, „wie“ değil.",
      },
      {
        kind: "short_answer",
        text: "Warum hat sie langsamer geschrieben?",
        options: [],
        answer: 0,
        accept: ["wegen der Schrift", "für die Schrift", "damit man es lesen kann"],
        explain: "„… habe ich langsamer geschrieben als sonst, damit man die Schrift gut lesen kann.“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u14-l1",
    level: "B1",
    skill: "listening",
    unit: 14,
    title: "Lohnt sich die Weiterbildung?",
    genre: "Danışma konuşması",
    intro: "Bir mesleki eğitim konuşuluyor. Kim ödüyor, ne kazandırıyor?",
    minutes: 4,
    gloss: [
      { de: "die Weiterbildung", tr: "mesleki eğitim", en: "further training" },
      { de: "finanzieren", tr: "finanse etmek", en: "to fund" },
      { de: "sich lohnen", tr: "değmek", en: "to be worth it" },
      { de: "die Teilzeit", tr: "yarı zamanlı", en: "part-time" },
    ],
    segments: [
      { text: "Ich überlege, ob ich die Weiterbildung machen soll." },
      { text: "Wie lang ist die denn?" },
      { text: "Ein Jahr, in Teilzeit. Zwei Abende pro Woche." },
      { text: "Und wer finanziert das?" },
      { text: "Die Firma zahlt einen Teil, wenn ich danach zwei Jahre bleibe." },
      { text: "Das ist gut. Lohnt es sich denn für den Alltag?" },
      { text: "Ich glaube schon. Ich könnte danach selbst unterrichten." },
      { text: "Dann mach das. Du hast Talent dafür, das sieht man." },
    ],
    questions: [
      {
        text: "Wie lange dauert die Weiterbildung?",
        options: ["Ein Jahr", "Ein halbes Jahr", "Zwei Jahre"],
        answer: 0,
        explain: "„Ein Jahr, in Teilzeit. Zwei Abende pro Woche.“",
      },
      {
        text: "Unter welcher Bedingung zahlt die Firma?",
        options: ["Ohne Bedingung", "Wenn die Person danach zwei Jahre bleibt", "Wenn die Prüfung bestanden wird"],
        answer: 1,
        explain: "„Die Firma zahlt einen Teil, wenn ich danach zwei Jahre bleibe.“",
      },
      {
        text: "Was könnte die Person danach machen?",
        options: ["Selbst unterrichten", "Die Firma wechseln", "Studieren"],
        answer: 0,
        explain: "„Ich könnte danach selbst unterrichten.“",
      },
      {
        kind: "gapfill",
        text: "Ich überlege, ___ ich die Weiterbildung machen soll.",
        options: [],
        answer: 0,
        accept: ["ob"],
        explain: "Dolaylı EVET/HAYIR sorusu → „ob“. „wenn“ koşul kurardı.",
      },
      {
        kind: "short_answer",
        text: "Was zahlt die Firma?",
        options: [],
        answer: 0,
        accept: ["einen Teil", "ein Teil", "Teil"],
        explain: "„Die Firma zahlt einen Teil …“",
      },
    ],
  },
  {
    id: "b1-u14-l2",
    level: "B1",
    skill: "listening",
    unit: 14,
    title: "An der Hochschule",
    genre: "Danışma masası",
    intro: "Biri okul hakkında bilgi alıyor. Hangi soruya hangi yanıt?",
    minutes: 4,
    gloss: [
      { de: "die Hochschule", tr: "yüksekokul", en: "university" },
      { de: "sich erkundigen", tr: "bilgi almak", en: "to enquire" },
      { de: "das Semester", tr: "dönem", en: "semester" },
      { de: "das Referat", tr: "sunum ödevi", en: "presentation" },
    ],
    segments: [
      { text: "Guten Tag, ich möchte mich über das Studium erkundigen." },
      { text: "Gern. Welcher Bereich interessiert Sie?" },
      { text: "Wissenschaft, aber ich weiß noch nicht, ob ich das schaffe." },
      { text: "Das erste Semester ist für alle schwer. Danach wird es besser. Das ist an jeder Hochschule so." },
      { text: "Wie viele Prüfungen gibt es pro Semester?" },
      { text: "Meistens drei, dazu ein Referat. Der Professor sagt es am Anfang." },
      { text: "Und wenn ich arbeite? Geht das nebenher?" },
      { text: "Viele Studentinnen arbeiten. Die Auswahl der Kurse hilft dabei." },
    ],
    questions: [
      {
        text: "Worüber möchte sich die Person erkundigen?",
        options: ["Über das Studium", "Über einen Kurs", "Über die Miete"],
        answer: 0,
        explain: "„… ich möchte mich über das Studium erkundigen.“",
      },
      {
        text: "Was sagt die Beraterin über das erste Semester?",
        options: ["Es ist leicht", "Es ist für alle schwer", "Es fällt aus"],
        answer: 1,
        explain: "„Das erste Semester ist für alle schwer. Danach wird es besser.“",
      },
      {
        text: "Wie viele Prüfungen gibt es meistens?",
        options: ["Eine", "Drei plus ein Referat", "Fünf"],
        answer: 1,
        explain: "„Meistens drei, dazu ein Referat.“",
      },
      {
        kind: "gapfill",
        text: "Ich weiß noch nicht, ___ ich das schaffe.",
        options: [],
        answer: 0,
        accept: ["ob"],
        explain: "„Başarıp başaramayacağımı“ — dolaylı evet/hayır sorusu: „ob“.",
      },
      {
        kind: "short_answer",
        text: "Wer sagt die Zahl der Prüfungen am Anfang?",
        options: [],
        answer: 0,
        accept: ["der Professor", "Professor"],
        explain: "„Der Professor sagt es am Anfang.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u14-w1",
    level: "B1",
    skill: "writing",
    unit: 14,
    title: "Zwei Kurse vergleichen",
    genre: "Karşılaştırma metni",
    intro: "İki kursu karşılaştır. Eşitlik mi, fark mı — bağlacı ona göre seç.",
    minutes: 8,
    gloss: [
      { de: "das Tempo", tr: "hız", en: "pace" },
      { de: "die Auswahl", tr: "seçenek", en: "selection" },
      { de: "sich lohnen", tr: "değmek", en: "to be worth it" },
      { de: "verständlich", tr: "anlaşılır", en: "comprehensible" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Yoğun kurstaki hız akşam kursundan çok daha yüksek.",
        answer: "Das Tempo im Intensivkurs ist viel höher als im Abendkurs.",
        hint: "Fark var → als.",
      },
      {
        kind: "build",
        tr: "Akşam kursundaki seçenek yoğun kurstaki kadar fazla değil, ama her şey anlaşılır.",
        answer: "Die Auswahl im Abendkurs ist nicht so groß wie im Intensivkurs, aber alles ist verständlich.",
        hint: "Eşitlik kalıbı → so … wie.",
      },
      {
        kind: "build",
        tr: "Bu kursun bana değip değmeyeceğini bilmiyorum.",
        answer: "Ich weiß nicht, ob sich dieser Kurs für mich lohnt.",
        hint: "Dolaylı evet/hayır sorusu → ob.",
      },
      {
        kind: "form",
        prompt: "Kurs seçim kartını doldur.",
        facts: "Katılımcı: Leyla Kaya; seçilen: akşam kursu; süre: 6 ay; sıklık: haftada 2; sebep: gündüz çalışıyor.",
        fields: [
          { label: "Name", answer: "Leyla Kaya", accept: ["Leyla", "Kaya"] },
          { label: "Kurs", answer: "Abendkurs", accept: ["der Abendkurs", "Abend"] },
          { label: "Dauer", answer: "6 Monate", accept: ["sechs Monate", "ein halbes Jahr"] },
          { label: "Grund", answer: "arbeitet tagsüber", accept: ["Arbeit", "sie arbeitet"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Karşılaştırma bağlacını düzelt.",
        source: "Die Prüfung war schwerer wie ich dachte.",
        answer: "Die Prüfung war schwerer als ich dachte.",
        why: "Türkçe karşılaştırmayı tek yapıyla kurar ('sandığımdan zor'), o yüzden als ile wie arasında bir seçim olduğu görünmüyor. Almanca ayırır: EŞİT DEĞİLSE als (schwerer als, mehr als), EŞİTSE so … wie (so schwer wie). Karşılaştırma biçimi (-er) varsa daima als gelir.",
      },
    ],
  },
  {
    id: "b1-u14-w2",
    level: "B1",
    skill: "writing",
    unit: 14,
    title: "Anfrage an die Hochschule",
    genre: "Bilgi isteme e-postası",
    intro: "Bir okula soru sor. Dolaylı soruda 'ob' ile 'wenn' karışmasın.",
    minutes: 12,
    gloss: [
      { de: "sich erkundigen", tr: "bilgi almak", en: "to enquire" },
      { de: "das Semester", tr: "dönem", en: "semester" },
      { de: "beschließen", tr: "karar vermek", en: "to decide" },
      { de: "die Wissenschaft", tr: "bilim", en: "science" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Yanında çalışmanın mümkün olup olmadığını sormak istiyorum.",
        answer: "Ich möchte fragen, ob es möglich ist, nebenher zu arbeiten.",
        hint: "Dolaylı soru → ob; sonra zu'lu mastar.",
      },
      {
        kind: "build",
        tr: "Kayıt olursam ilk dönem ne zaman başlar?",
        answer: "Wenn ich mich anmelde, wann beginnt dann das erste Semester?",
        alternatives: ["Wann beginnt das erste Semester, wenn ich mich anmelde?"],
        hint: "Burası gerçek bir KOŞUL → wenn.",
      },
      {
        kind: "free",
        prompt: "Bir yüksekokula bilgi isteyen resmî bir e-posta yaz: kendini tanıt, hangi alanla ilgilendiğini söyle, en az üç soru sor (dönem başlangıcı, sınav sayısı, yanında çalışma), ve yanıt bekle. En az iki 'ob' cümlesi kullan.",
        checklist: [
          "Resmî hitap ve kapanış var mı?",
          "Kendini tanıtan bir cümle var mı?",
          "En az üç soru var mı?",
          "En az iki 'ob' cümlesi var mı?",
          "Yanıt isteği açık mı?",
        ],
        minWords: 70,
        sample:
          "Sehr geehrte Damen und Herren,\n\n" +
          "ich möchte mich über Ihr Studium im Bereich Wissenschaft erkundigen. " +
          "Ich arbeite seit vier Jahren in einem Betrieb und habe beschlossen, " +
          "noch einmal anzufangen.\n\n" +
          "Ich habe drei Fragen. Erstens: Wann beginnt das erste Semester? " +
          "Zweitens: Wie viele Prüfungen gibt es pro Semester, und kommt ein " +
          "Referat dazu? Drittens würde ich gern wissen, ob es möglich ist, " +
          "nebenher in Teilzeit zu arbeiten.\n\n" +
          "Außerdem bin ich nicht sicher, ob meine Ausbildung reicht oder ob " +
          "ich zusätzlich eine Prüfung machen muss. Über eine kurze Auskunft " +
          "wäre ich sehr dankbar.\n\n" +
          "Mit freundlichen Grüßen\nLeyla Kaya",
        phrases: [
          { de: "Ich möchte mich über … erkundigen.", tr: "… hakkında bilgi almak istiyorum.", en: "I would like to enquire about …" },
          { de: "Ich würde gern wissen, ob …", tr: "… olup olmadığını bilmek isterdim.", en: "I would like to know whether …" },
          { de: "Über eine kurze Auskunft wäre ich dankbar.", tr: "Kısa bir bilgi için minnettar olurum.", en: "I would be grateful for brief information." },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Dolaylı sorunun bağlacını düzelt.",
        source: "Ich weiß nicht, wenn ich das schaffe.",
        answer: "Ich weiß nicht, ob ich das schaffe.",
        why: "Türkçede '-ip -mediğini' ile 'eğer' ayrı sözcükler değil, o yüzden ikisi de wenn'e çevriliyor. Almanca ayırır: dolaylı EVET/HAYIR sorusu ob ister ('başarıp başaramayacağımı'), gerçek koşul ise wenn ('başarırsam'). Cümlenin başına 'ya da olmasın' eklenebiliyorsa ob gelir.",
      },
    ],
  },
];
