import type { SkillExercise } from "../types";

/**
 * A1 · Ünite 3 — "Yaş, form ve aile" (tema-hizalı içerik).
 *
 * Dört ders: Wie alt bist du? · Das Anmeldeformular · Meine Familie ·
 * Hast du Geschwister? İçerik bu ünitenin ve önceki iki ünitenin kelimeleriyle
 * sınırlı:
 *
 *   Ünite 3: alt, jung, das Jahr, geboren, der Geburtstag, das Alter,
 *            der Erwachsene, das Baby · das Formular, die Adresse,
 *            die Postleitzahl, die Anmeldung, unterschreiben, ausfüllen,
 *            ankreuzen, der Familienstand · die Familie, die Mutter,
 *            der Vater, die Tochter, der Sohn, die Großeltern, die Ehefrau,
 *            der Ehemann · die Geschwister, der Bruder, die Schwester,
 *            die Eltern, haben, der Junge, das Mädchen, beide
 *   Kalıplar: Ich bin … Jahre alt · Ich bin in … geboren · Das ist mein/meine …
 *            Ich habe einen/eine … · Hast du Geschwister?
 *
 * Akrabalık adlarında artikel bilerek her yerde görünüyor: bu ünitede
 * "mein Bruder / meine Schwester" ayrımı öğrenilen asıl şey.
 */
export const a1U03: SkillExercise[] = [
  {
    id: "a1-u3-r1",
    level: "A1",
    skill: "reading",
    unit: 3,
    title: "Das ist meine Familie",
    genre: "Profil",
    intro: "Lena ailesini tanıtıyor. Kim kimin nesi, kaç yaşında?",
    gloss: [
      { de: "die Geschwister", tr: "kardeşler", en: "siblings" },
      { de: "die Großeltern", tr: "büyükanne ve büyükbaba", en: "grandparents" },
      { de: "geboren", tr: "doğmuş", en: "born" },
      { de: "beide", tr: "her ikisi", en: "both" },
    ],
    minutes: 3,
    text:
      "Hallo! Ich heiße Lena und ich bin zwanzig Jahre alt. Ich wohne in Bremen.\n\nDas ist meine Familie. Meine Mutter heißt Petra und mein Vater heißt Jonas. Beide arbeiten: meine Mutter ist Ärztin und mein Vater ist Lehrer.\n\nIch habe zwei Geschwister. Mein Bruder heißt Max. Er ist zehn Jahre alt. Meine Schwester heißt Nora und sie ist ein Baby.\n\nMeine Großeltern wohnen nicht in Bremen. Sie kommen aus Polen und sprechen ein bisschen Deutsch.",
    questions: [
      {
        text: "Wie alt ist Lena?",
        options: ["zwanzig", "zehn", "hundert"],
        answer: 0,
        explain: "„Ich bin zwanzig Jahre alt.“ Zehn ise erkek kardeşinin yaşı.",
      },
      {
        text: "Was ist Lenas Mutter von Beruf?",
        options: ["Ärztin", "Lehrerin", "Verkäuferin"],
        answer: 0,
        explain: "„meine Mutter ist Ärztin“ — baba ise Lehrer.",
      },
      {
        text: "Richtig oder falsch? Lena hat einen Bruder und eine Schwester.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: „Ich habe zwei Geschwister“ — Max (Bruder) ve Nora (Schwester).",
      },
      {
        text: "Woher kommen die Großeltern?",
        options: ["aus Polen", "aus Bremen", "aus Deutschland"],
        answer: 0,
        explain: "„Sie kommen aus Polen.“ Bremen Lena'nın oturduğu şehir.",
      },
      {
        kind: "gapfill",
        text: "Lenas Schwester ist noch ein ___.",
        options: [],
        answer: 0,
        accept: ["Baby"],
        explain: "„Meine Schwester heißt Nora und sie ist ein Baby.“",
      },
    ],
  },
  {
    id: "a1-u3-r2",
    level: "A1",
    skill: "reading",
    unit: 3,
    title: "Das Anmeldeformular",
    genre: "Form",
    intro: "Doldurulmuş bir kayıt formunu okuyacaksın. Bilgiler doğru mu?",
    gloss: [
      { de: "die Anmeldung", tr: "kayıt", en: "registration" },
      { de: "die Postleitzahl", tr: "posta kodu", en: "postal code" },
      { de: "der Familienstand", tr: "medeni hâl", en: "marital status" },
      { de: "unterschreiben", tr: "imzalamak", en: "to sign" },
      { de: "ankreuzen", tr: "işaretlemek", en: "to tick" },
    ],
    minutes: 3,
    text:
      "ANMELDUNG — Sprachschule Bremen\n\nVorname: Amir\nNachname: Karimi\nGeboren: 1998\nAlter: 27 Jahre\nAdresse: Lindenstraße 8, Postleitzahl 28203 Bremen\nFamilienstand: verheiratet\nBeruf: Verkäufer\nSprachen: Persisch, Englisch, ein bisschen Deutsch\nNummer: 0421 55 66\n\nBitte kreuzen Sie an: [X] A1-Kurs  [ ] A2-Kurs\n\nUnterschrift: A. Karimi",
    questions: [
      {
        text: "Wie ist der Nachname?",
        options: ["Karimi", "Amir", "Bremen"],
        answer: 0,
        explain: "„Nachname: Karimi“ — Amir ise Vorname.",
      },
      {
        kind: "gapfill",
        text: "Die Postleitzahl ist ___.",
        options: [],
        answer: 0,
        accept: ["28203"],
        explain: "„Postleitzahl 28203 Bremen“.",
      },
      {
        text: "Welchen Kurs hat Amir angekreuzt?",
        options: ["den A1-Kurs", "den A2-Kurs", "beide Kurse"],
        answer: 0,
        explain: "A1'in yanında [X] var, A2 boş: „[X] A1-Kurs  [ ] A2-Kurs“.",
      },
      {
        text: "Richtig oder falsch? Amir ist ledig.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Familienstand: verheiratet“ — evli.",
      },
    ],
  },
  {
    id: "a1-u3-l1",
    level: "A1",
    skill: "listening",
    unit: 3,
    title: "Meine Geschwister",
    genre: "Tanışma",
    intro: "Jonas kardeşlerinden bahsediyor. Kaç kardeşi var, kaç yaşındalar?",
    gloss: [
      { de: "der Bruder", tr: "erkek kardeş", en: "brother" },
      { de: "die Schwester", tr: "kız kardeş", en: "sister" },
      { de: "das Mädchen", tr: "kız", en: "girl" },
    ],
    minutes: 2,
    segments: [
      { text: "Hallo, ich bin Jonas. Ich bin zwanzig Jahre alt." },
      { text: "Ich habe einen Bruder und eine Schwester." },
      { text: "Mein Bruder ist zehn Jahre alt." },
      { text: "Meine Schwester ist ein kleines Mädchen." },
      { text: "Meine Eltern wohnen in Wien." },
    ],
    questions: [
      {
        text: "Wie viele Geschwister hat Jonas?",
        options: ["zwei", "einen", "drei"],
        answer: 0,
        explain: "„einen Bruder und eine Schwester“ — iki kardeş.",
      },
      {
        kind: "gapfill",
        text: "Sein Bruder ist ___ Jahre alt.",
        options: [],
        answer: 0,
        accept: ["zehn", "10"],
        explain: "„Mein Bruder ist zehn Jahre alt.“ Yazıyla da rakamla da olur.",
      },
      {
        text: "Wo wohnen die Eltern?",
        options: ["in Wien", "in Bremen", "in Berlin"],
        answer: 0,
        explain: "„Meine Eltern wohnen in Wien.“",
      },
      {
        text: "Richtig oder falsch? Jonas ist zehn Jahre alt.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: Jonas zwanzig, kardeşi zehn. İki sayıyı karıştırmamak gerek.",
      },
    ],
  },
  {
    id: "a1-u3-l2",
    level: "A1",
    skill: "listening",
    unit: 3,
    title: "Bei der Anmeldung",
    genre: "Diyalog",
    intro: "Kayıt masasında bir görevli bilgi soruyor. Cevapları yakala.",
    gloss: [
      { de: "das Formular", tr: "form", en: "form" },
      { de: "ausfüllen", tr: "doldurmak", en: "to fill in" },
      { de: "die Adresse", tr: "adres", en: "address" },
    ],
    minutes: 2,
    segments: [
      { text: "Guten Tag! Füllen Sie bitte das Formular aus." },
      { text: "Wie ist Ihr Nachname?" },
      { text: "Mein Nachname ist Weber." },
      { text: "Und Ihre Adresse?" },
      { text: "Lindenstraße zwanzig, Bremen." },
      { text: "Danke. Unterschreiben Sie bitte hier." },
    ],
    questions: [
      {
        kind: "gapfill",
        text: "Der Nachname ist ___.",
        options: [],
        answer: 0,
        accept: ["Weber"],
        explain: "„Mein Nachname ist Weber.“",
      },
      {
        text: "In welcher Straße wohnt die Person?",
        options: ["Lindenstraße", "Hauptstraße", "Bahnhofstraße"],
        answer: 0,
        explain: "„Lindenstraße zwanzig, Bremen.“",
      },
      {
        text: "Was macht die Person zuletzt?",
        options: ["unterschreiben", "ausfüllen", "buchstabieren"],
        answer: 0,
        explain: "„Unterschreiben Sie bitte hier.“ — imzalamak.",
      },
      {
        text: "Richtig oder falsch? Die Person soll das Formular ausfüllen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru, ilk cümle: „Füllen Sie bitte das Formular aus.“",
      },
    ],
  },
  {
    id: "a1-u3-w1",
    level: "A1",
    skill: "writing",
    unit: 3,
    title: "Formular für den Kurs",
    genre: "Form",
    intro: "Kayıt formunu doldur ve aile cümleleri kur.",
    gloss: [
      { de: "der Familienstand", tr: "medeni hâl", en: "marital status" },
      { de: "das Alter", tr: "yaş", en: "age" },
      { de: "geboren", tr: "doğmuş", en: "born" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "form",
        prompt: "Kayıt formunu Maria için doldur.",
        facts: "Maria Silva, 1990 doğumlu, 35 yaşında; Hamburg'da Parkstraße 5'te oturuyor, posta kodu 20095; evli; öğretmen.",
        fields: [
          { label: "Vorname", answer: "Maria" },
          { label: "Nachname", answer: "Silva" },
          { label: "Alter", answer: "35", accept: ["35 Jahre"] },
          { label: "Postleitzahl", answer: "20095" },
          { label: "Familienstand", answer: "verheiratet" },
          { label: "Beruf", answer: "Lehrerin", accept: ["Lehrer"] },
        ],
      },
      {
        kind: "build",
        tr: "Bir erkek kardeşim var.",
        answer: "Ich habe einen Bruder",
        hint: "„haben“ Akkusativ ister: der Bruder → einen Bruder. Dişilde değişmez: eine Schwester.",
      },
      {
        kind: "rewrite",
        prompt: "Aynı soruyu resmî hitapla (Sie) yaz.",
        source: "Wie alt bist du?",
        answer: "Wie alt sind Sie?",
        why: "Resmî hitapta „bist du“ yerine „sind Sie“ gelir.",
      },
    ],
  },
  {
    id: "a1-u3-w2",
    level: "A1",
    skill: "writing",
    unit: 3,
    title: "Über meine Familie schreiben",
    genre: "Forum mesajı",
    intro: "Kurs forumunda aileni tanıt.",
    gloss: [
      { de: "die Familie", tr: "aile", en: "family" },
      { de: "der Erwachsene", tr: "yetişkin", en: "adult" },
      { de: "beide", tr: "her ikisi", en: "both" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Bu benim annem.",
        answer: "Das ist meine Mutter",
        hint: "die Mutter dişil olduğu için „meine“; der Vater eril olduğu için „mein Vater“.",
      },
      {
        kind: "build",
        tr: "1998'de doğdum.",
        answer: "Ich bin 1998 geboren",
        hint: "Yıl doğrudan gelir, „in“ kullanılmaz: Ich bin 1998 geboren.",
      },
      {
        kind: "free",
        prompt:
          "Kurs forumuna aileni tanıtan kısa bir mesaj yaz (4-5 cümle). Kaç yaşında olduğunu, anne babanı ve varsa kardeşlerini anlat.",
        minWords: 30,
        checklist: [
          "Yaşını yazdın mı? (Ich bin … Jahre alt.)",
          "Anne veya babandan bahsettin mi? (Das ist meine Mutter / mein Vater …)",
          "Kardeşin var mı yok mu yazdın mı? (Ich habe einen Bruder / eine Schwester / keine Geschwister.)",
          "En az bir kişinin mesleğini ya da yaşını verdin mi?",
        ],
        phrases: [
          { de: "Ich bin … Jahre alt.", tr: "… yaşındayım.", en: "I am … years old." },
          { de: "Ich habe einen Bruder.", tr: "Bir erkek kardeşim var.", en: "I have a brother." },
          { de: "Meine Eltern wohnen in …", tr: "Ailem …'da oturuyor.", en: "My parents live in …" },
        ],
        sample:
          "Hallo zusammen!\n\nIch heiße Yusuf und ich bin 25 Jahre alt. Ich bin in Ankara geboren.\n\nDas ist meine Familie: meine Mutter heißt Ayşe und mein Vater heißt Kemal. Beide arbeiten in einer Firma.\n\nIch habe eine Schwester. Sie ist zehn Jahre alt. Meine Großeltern wohnen auch in Ankara.\n\nUnd ihr? Habt ihr Geschwister?\nYusuf",
      },
    ],
  },
];
