import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 13 — "Yetki, aidiyet, hedef" (dersler 49–52).
 *
 * Dersler: Die Vollmacht · Die Einbürgerung · Infinitiv mit zu ·
 * Meine Lernziele.
 *
 * Ünitenin dilbilgisi ekseni zu-mastarı ve buradaki tuzak ünite 10'un
 * TERSİ: orada "zu" unutuluyordu, burada FAZLADAN konuyor. Türkçede
 * "gelmek istiyorum" ile "gelmeyi umuyorum" arasında yapısal fark yok,
 * ikisi de mastar alır; Almanca ayırır:
 *   kipli fiil (wollen, können, müssen, möchten) → ÇIPLAK mastar, zu YOK
 *   öteki fiiller (hoffen, vorhaben, versuchen)  → zu'lu mastar
 * İkinci nokta "nicht"in yeri: Türkçe olumsuzluk her zaman fiilin yanında
 * ve sonda ("yapmadım"), Almancada ise nesneden SONRA gelir.
 *
 * Yeni 32 kelime: vertreten, das Original, der Vertreter, die Kopie,
 * kopieren, die Urkunde, sich weigern, überreden, verlangen,
 * das Grundgesetz, die Gesellschaft, die Freiheit, die Grenze,
 * die Tradition, abstimmen, die Fremdsprache, die Absicht, die Gewohnheit,
 * vorhaben, festlegen, die Zukunft, der Einfall, dauernd, bemerken,
 * überprüfen, erreichen, der Fortschritt, die Bedeutung, das Verständnis,
 * erfolgreich, der Sinn, die Planung.
 */
export const b1U13: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u13-r1",
    level: "B1",
    skill: "reading",
    unit: 13,
    title: "Die Vollmacht",
    genre: "Bilgilendirme metni",
    intro: "Birine sizin adınıza iş yapma yetkisi vermek. Neyin aslı, neyin kopyası gerekiyor?",
    minutes: 5,
    gloss: [
      { de: "vertreten", tr: "temsil etmek", en: "to represent" },
      { de: "der Vertreter", tr: "temsilci", en: "representative" },
      { de: "das Original", tr: "asıl nüsha", en: "original" },
      { de: "die Urkunde", tr: "belge / senet", en: "certificate" },
      { de: "verlangen", tr: "talep etmek", en: "to demand" },
    ],
    text:
      "Wer selbst nicht kommen kann, lässt sich vertreten. Dafür braucht der " +
      "Vertreter eine Vollmacht: ein kurzes Schreiben, in dem steht, wer wen " +
      "wobei vertritt.\n\n" +
      "Die Vollmacht muss das Datum, beide Namen und eine Unterschrift haben. " +
      "Viele Ämter verlangen zusätzlich eine Kopie Ihres Ausweises. Das Original " +
      "der Urkunde bleibt bei Ihnen; der Vertreter nimmt nur die Kopie mit.\n\n" +
      "Es ist wichtig, genau festzulegen, wofür die Vollmacht gilt. „Für alles“ " +
      "ist keine gute Absicht — schreiben Sie lieber, worum es geht. Wenn ein " +
      "Amt sich weigert, fragen Sie nach dem Grund und lassen Sie ihn " +
      "schriftlich geben.\n\n" +
      "Manche versuchen, ihre Verwandten zu überreden, die Sache im Gespräch zu " +
      "regeln. Das geht meistens schlecht. Ein Blatt Papier kostet nichts und spart " +
      "später viel Ärger.",
    questions: [
      {
        text: "Was steht in einer Vollmacht?",
        options: ["Wer wen wobei vertritt", "Nur der Name", "Der Preis"],
        answer: 0,
        explain: "„… ein kurzes Schreiben, in dem steht, wer wen wobei vertritt.“",
      },
      {
        text: "Was nimmt der Vertreter mit?",
        options: ["Das Original", "Nur die Kopie", "Gar nichts"],
        answer: 1,
        explain: "„Das Original der Urkunde bleibt bei Ihnen; der Vertreter nimmt nur die Kopie mit.“",
      },
      {
        text: "Was soll man tun, wenn ein Amt sich weigert?",
        options: ["Sofort gehen", "Nach dem Grund fragen", "Einen Anwalt rufen"],
        answer: 1,
        explain: "„Wenn ein Amt sich weigert, fragen Sie nach dem Grund …“",
      },
      {
        kind: "gapfill",
        text: "Es ist wichtig, genau ___, wofür die Vollmacht gilt.",
        options: [],
        answer: 0,
        accept: ["festzulegen"],
        explain: "„es ist wichtig“ sonrası zu'lu mastar; ayrılabilen fiilde zu araya girer.",
      },
      {
        kind: "short_answer",
        text: "Welche drei Dinge muss die Vollmacht haben?",
        options: [],
        answer: 0,
        accept: ["Datum, Namen und Unterschrift", "Datum Namen Unterschrift"],
        explain: "„Die Vollmacht muss das Datum, beide Namen und eine Unterschrift haben.“",
      },
    ],
  },
  {
    id: "b1-u13-r2",
    level: "B1",
    skill: "reading",
    unit: 13,
    title: "Der Weg zur Einbürgerung",
    genre: "Deneyim yazısı",
    intro: "Vatandaşlık süreci üzerine bir yazı. Hangi koşul, hangi duygu?",
    minutes: 6,
    gloss: [
      { de: "das Grundgesetz", tr: "anayasa", en: "constitution" },
      { de: "die Gesellschaft", tr: "toplum", en: "society" },
      { de: "die Freiheit", tr: "özgürlük", en: "freedom" },
      { de: "abstimmen", tr: "oy vermek", en: "to vote" },
      { de: "die Tradition", tr: "gelenek", en: "tradition" },
    ],
    text:
      "Nach elf Jahren habe ich vor, den Antrag zu stellen. Die Bedingungen kenne " +
      "ich inzwischen auswendig: genug Jahre im Land, ein Einkommen, " +
      "Sprachkenntnisse und ein Test über das Grundgesetz.\n\n" +
      "Der Test ist leichter, als viele denken. Man muss keine Fremdsprache " +
      "perfekt können, aber man sollte verstehen, wie die Gesellschaft hier " +
      "organisiert ist: welche Freiheiten gelten, wo die Grenzen sind und " +
      "warum abgestimmt wird.\n\n" +
      "Was mich am meisten bewegt, ist nicht das Dokument. Es ist die " +
      "Möglichkeit, endlich mit abzustimmen. Elf Jahre lang habe ich hier " +
      "gearbeitet und Steuern gezahlt, ohne bei einer Wahl gefragt " +
      "zu werden.\n\n" +
      "Ich habe nicht vor, meine Tradition aufzugeben. Das verlangt auch " +
      "niemand. Man kann zwei Sprachen sprechen, zwei Küchen mögen und " +
      "trotzdem an einem Ort zu Hause sein.",
    questions: [
      {
        text: "Wie lange ist die Person schon im Land?",
        options: ["Elf Jahre", "Fünf Jahre", "Zwanzig Jahre"],
        answer: 0,
        explain: "„Nach elf Jahren habe ich vor, den Antrag zu stellen.“",
      },
      {
        text: "Was soll man laut Text verstehen?",
        options: ["Alle Gesetze auswendig", "Wie die Gesellschaft organisiert ist", "Die ganze Geschichte"],
        answer: 1,
        explain: "„… man sollte verstehen, wie die Gesellschaft hier organisiert ist …“",
      },
      {
        text: "Was bewegt die Person am meisten?",
        options: ["Das Dokument", "Mit abstimmen zu können", "Der Test"],
        answer: 1,
        explain: "„Es ist die Möglichkeit, endlich mit abzustimmen.“",
      },
      {
        kind: "gapfill",
        text: "Ich habe nicht vor, meine Tradition ___.",
        options: [],
        answer: 0,
        accept: ["aufzugeben"],
        explain: "„vorhaben“ zu'lu mastar ister; aufgeben ayrılabilen → auf-zu-geben.",
      },
      {
        kind: "short_answer",
        text: "Welche vier Bedingungen nennt der Text?",
        options: [],
        answer: 0,
        accept: ["Jahre, Einkommen, Sprache, Test", "Jahre Einkommen Sprache Test"],
        explain: "„… genug Jahre im Land, ein Einkommen, Sprachkenntnisse und ein Test über das Grundgesetz.“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u13-l1",
    level: "B1",
    skill: "listening",
    unit: 13,
    title: "Kannst du mich vertreten?",
    genre: "Rica konuşması",
    intro: "Biri başkasından kendi adına gitmesini istiyor. Ne gerekiyor?",
    minutes: 4,
    gloss: [
      { de: "die Kopie", tr: "kopya", en: "copy" },
      { de: "kopieren", tr: "kopyalamak", en: "to copy" },
      { de: "sich weigern", tr: "reddetmek", en: "to refuse" },
      { de: "überreden", tr: "ikna etmek", en: "to persuade" },
    ],
    segments: [
      { text: "Ich muss am Freitag arbeiten. Kannst du mich beim Amt vertreten?" },
      { text: "Klar. Was brauche ich dafür?" },
      { text: "Eine Vollmacht von mir und eine Kopie meines Ausweises." },
      { text: "Reicht eine Kopie? Verlangen die nicht das Original?" },
      { text: "Nein. Das Original bleibt bei mir, du nimmst nur die Kopie mit." },
      { text: "Gut. Ich kopiere das heute Abend." },
      { text: "Danke. Wenn sich jemand weigert, ruf mich einfach an." },
      { text: "Mache ich. Du musst mich nicht überreden, das ist kein Problem." },
    ],
    questions: [
      {
        text: "Warum kann die erste Person nicht selbst gehen?",
        options: ["Sie ist krank", "Sie muss arbeiten", "Sie ist verreist"],
        answer: 1,
        explain: "„Ich muss am Freitag arbeiten.“",
      },
      {
        text: "Was braucht der Vertreter?",
        options: ["Vollmacht und Ausweiskopie", "Nur den Ausweis", "Gar nichts"],
        answer: 0,
        explain: "„Eine Vollmacht von mir und eine Kopie meines Ausweises.“",
      },
      {
        text: "Wo bleibt das Original?",
        options: ["Beim Amt", "Beim Vertreter", "Bei der ersten Person"],
        answer: 2,
        explain: "„Das Original bleibt bei mir …“",
      },
      {
        kind: "gapfill",
        text: "Du musst mich nicht ___, das ist kein Problem.",
        options: [],
        answer: 0,
        accept: ["überreden"],
        explain: "Kipli fiilden sonra ÇIPLAK mastar: „musst … überreden“, zu yok.",
      },
      {
        kind: "short_answer",
        text: "Wann kopiert die zweite Person den Ausweis?",
        options: [],
        answer: 0,
        accept: ["heute Abend", "am Abend", "heute"],
        explain: "„Ich kopiere das heute Abend.“",
      },
    ],
  },
  {
    id: "b1-u13-l2",
    level: "B1",
    skill: "listening",
    unit: 13,
    title: "Was hast du dir vorgenommen?",
    genre: "Hedef konuşması",
    intro: "İki kişi öğrenme hedeflerini konuşuyor. Kim neyi nasıl ölçüyor?",
    minutes: 4,
    gloss: [
      { de: "vorhaben", tr: "niyetlenmek", en: "to plan" },
      { de: "der Fortschritt", tr: "ilerleme", en: "progress" },
      { de: "überprüfen", tr: "gözden geçirmek", en: "to review" },
      { de: "die Gewohnheit", tr: "alışkanlık", en: "habit" },
    ],
    segments: [
      { text: "Was hast du für dieses Jahr vor?" },
      { text: "Ich will die Prüfung schaffen. Aber ohne Plan geht das nicht." },
      { text: "Hast du schon etwas festgelegt?" },
      { text: "Ja. Jeden Tag zwanzig Minuten. Lieber kurz als dauernd nichts." },
      { text: "Das ist gut. Und wie merkst du den Fortschritt?" },
      { text: "Ich überprüfe am Monatsende, was ich wirklich verstanden habe." },
      { text: "Guter Einfall. Bei mir ist das Problem die Gewohnheit." },
      { text: "Dann fang klein an. Der Sinn ist nicht, perfekt zu sein." },
    ],
    questions: [
      {
        text: "Was hat die erste Person vor?",
        options: ["Die Prüfung zu schaffen", "Umzuziehen", "Einen Kurs zu geben"],
        answer: 0,
        explain: "„Ich will die Prüfung schaffen.“",
      },
      {
        text: "Was hat sie festgelegt?",
        options: ["Zwanzig Minuten am Tag", "Zwei Stunden am Wochenende", "Nichts"],
        answer: 0,
        explain: "„Jeden Tag zwanzig Minuten.“",
      },
      {
        text: "Wie überprüft sie den Fortschritt?",
        options: ["Jede Woche", "Am Monatsende", "Gar nicht"],
        answer: 1,
        explain: "„Ich überprüfe am Monatsende, was ich wirklich verstanden habe.“",
      },
      {
        kind: "gapfill",
        text: "Der Sinn ist nicht, ___ ___ sein.",
        options: [],
        answer: 0,
        accept: ["perfekt zu"],
        explain: "„der Sinn ist“ sonrası zu'lu mastar: „perfekt zu sein“.",
      },
      {
        kind: "short_answer",
        text: "Was ist bei der zweiten Person das Problem?",
        options: [],
        answer: 0,
        accept: ["die Gewohnheit", "Gewohnheit"],
        explain: "„Bei mir ist das Problem die Gewohnheit.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u13-w1",
    level: "B1",
    skill: "writing",
    unit: 13,
    title: "Vollmacht schreiben",
    genre: "Yetki belgesi",
    intro: "Bir vekâlet yaz. Kipli fiilden sonra 'zu' gelmediğine dikkat et.",
    minutes: 8,
    gloss: [
      { de: "vertreten", tr: "temsil etmek", en: "to represent" },
      { de: "die Urkunde", tr: "belge", en: "certificate" },
      { de: "festlegen", tr: "belirlemek", en: "to define" },
      { de: "die Absicht", tr: "niyet", en: "intention" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Cuma günü kendim gelemiyorum.",
        answer: "Ich kann am Freitag nicht selbst kommen.",
        hint: "Kipli fiilden sonra çıplak mastar: kann … kommen.",
      },
      {
        kind: "build",
        tr: "Bu yüzden kardeşimin beni temsil etmesini istiyorum.",
        answer: "Deshalb möchte ich mich von meinem Bruder vertreten lassen.",
        alternatives: ["Deshalb soll mich mein Bruder vertreten."],
        hint: "„lassen“ da çıplak mastarla gelir.",
      },
      {
        kind: "build",
        tr: "Belgenin ne için geçerli olduğunu ve niyetimin ne olduğunu belirlemek önemli.",
        answer: "Es ist wichtig festzulegen, wofür die Urkunde gilt und was meine Absicht ist.",
        hint: "„es ist wichtig“ sonrası zu'lu mastar.",
      },
      {
        kind: "form",
        prompt: "Vekâlet künyesini doldur.",
        facts: "Yetki veren: Leyla Kaya; temsilci: Nuri Öz; iş: kurumdaki randevu; tarih: 14 Mart; ek: kimlik kopyası.",
        fields: [
          { label: "Vollmachtgeberin", answer: "Leyla Kaya", accept: ["Leyla", "Kaya"] },
          { label: "Vertreter", answer: "Nuri Öz", accept: ["Nuri", "Öz"] },
          { label: "Wofür", answer: "Termin beim Amt", accept: ["der Termin beim Amt", "Termin"] },
          { label: "Datum", answer: "14. März", accept: ["14. März", "vierzehnter März"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Fazladan 'zu'yu kaldır.",
        source: "Ich möchte zu kommen, aber ich muss zu arbeiten.",
        answer: "Ich möchte kommen, aber ich muss arbeiten.",
        why: "Türkçede 'gelmek istiyorum' ile 'gelmeyi umuyorum' aynı yapıdadır, o yüzden zu her mastara konuyor. Almancada KİPLİ fiiller (wollen, können, müssen, dürfen, sollen, möchten) ve lassen ÇIPLAK mastar alır; zu yalnız öteki fiillerde gelir (hoffen, vorhaben, versuchen, anfangen).",
      },
    ],
  },
  {
    id: "b1-u13-w2",
    level: "B1",
    skill: "writing",
    unit: 13,
    title: "Meine Lernziele",
    genre: "Plan metni",
    intro: "Öğrenme hedeflerini yaz. 'nicht'in nereye geldiğine dikkat et.",
    minutes: 12,
    gloss: [
      { de: "der Fortschritt", tr: "ilerleme", en: "progress" },
      { de: "erreichen", tr: "ulaşmak", en: "to reach" },
      { de: "die Planung", tr: "planlama", en: "planning" },
      { de: "erfolgreich", tr: "başarılı", en: "successful" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Bu yıl sınavı geçmeyi hedefliyorum.",
        answer: "Ich habe vor, dieses Jahr die Prüfung zu schaffen.",
        hint: "„vorhaben“ zu'lu mastar ister.",
      },
      {
        kind: "build",
        tr: "Sınavı geçen yıl geçemedim.",
        answer: "Ich habe die Prüfung letztes Jahr nicht geschafft.",
        hint: "„nicht“ nesneden SONRA, ortaçtan önce gelir.",
      },
      {
        kind: "free",
        prompt: "Bu yıl için öğrenme hedeflerini yaz: neyi başarmak istediğini, bunu nasıl planladığını (ne sıklıkta, ne kadar), ilerlemeyi nasıl ölçeceğini, ve şimdiye kadar neyin işe yaramadığını yaz. En az iki zu'lu mastar kullan.",
        checklist: [
          "Somut bir hedef var mı?",
          "Plan ölçülebilir mi (sıklık ve süre)?",
          "İlerlemenin nasıl ölçüleceği yazılmış mı?",
          "En az iki zu'lu mastar var mı?",
          "Geçmişte işe yaramayan bir şey anlatılmış mı?",
        ],
        minWords: 70,
        sample:
          "Mein Ziel für dieses Jahr ist es, die Prüfung zu schaffen.\n\n" +
          "Ich habe vor, jeden Tag zwanzig Minuten zu lernen. Lieber kurz und " +
          "regelmäßig als einmal drei Stunden. Am Wochenende lese ich zusätzlich " +
          "einen kurzen Text und schreibe fünf Sätze dazu.\n\n" +
          "Den Fortschritt überprüfe ich am Monatsende. Ich schaue nicht auf die " +
          "Zeit, sondern auf das Verständnis: Was habe ich wirklich verstanden? " +
          "Das hat für mich mehr Bedeutung als ein langer Plan.\n\n" +
          "Früher war meine Planung nicht erfolgreich, weil ich zu viel auf einmal " +
          "wollte. Ich habe die Aufgaben oft nicht beendet und dann aufgegeben. " +
          "Diesmal fange ich klein an.\n\n" +
          "Wenn ich das sechs Monate lang mache, werde ich mein Ziel erreichen.",
        phrases: [
          { de: "Mein Ziel ist es, … zu …", tr: "Hedefim … -mek", en: "My goal is to …" },
          { de: "Ich habe vor, … zu …", tr: "… -meyi planlıyorum", en: "I plan to …" },
          { de: "Den Fortschritt überprüfe ich …", tr: "İlerlemeyi … ölçerim", en: "I review progress …" },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Olumsuzluğun yerini düzelt.",
        source: "Ich habe nicht die Prüfung geschafft.",
        answer: "Ich habe die Prüfung nicht geschafft.",
        why: "Türkçede olumsuzluk fiilin EKİDİR ve hep sonda durur ('geçemedim'), o yüzden Almancada da olumsuzluk fiilin hemen yanına, yardımcı fiilden sonra konuyor. Almancada belirli bir nesne varsa nicht ondan SONRA gelir. 'nicht die Prüfung' ancak bir karşıtlık kuruluyorsa doğrudur: nicht die Prüfung, sondern den Kurs.",
      },
    ],
  },
];
