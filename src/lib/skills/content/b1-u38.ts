import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 38 — "Meslek ve teknoloji" (dersler 149–152).
 *
 * Dersler: Etwas reparieren lassen · Technik-Diskussion ·
 * Berufe vorstellen · Eine Lehre machen.
 *
 * İki aktarım hatası bu ünitenin diline düşüyor:
 *   meslek adının   Türkçede meslek adı cinsiyete göre değişmez ('mimar'
 *   cinsi           herkes için aynıdır), o yüzden Almancada eril biçim
 *                   herkese uygulanıyor: "Meine Schwester ist Architekt".
 *                   Almanca dişil biçimi -in ile kurar ve artikel de
 *                   değişir: die Architektin, die Übersetzerin.
 *   çıplak mastar   gehen, lernen, helfen, sehen, hören fiillerinden
 *                   sonra ikinci fiil ZU ALMAZ: "Ich gehe arbeiten",
 *                   "Er lernt schwimmen". Ünite 13 kipli fiilleri
 *                   çalışmıştı; bu sınıf ayrı ve öğrenci zu'yu buraya
 *                   fazladan koyuyor.
 *
 * Yeni 32 kelime: der Kopierer, die Klingel, klingeln, das Laufwerk,
 * einstellen, schalten, testen, nützen, die Technologie, die Medien,
 * die Erfindung, beeinflussen, abhängig, süchtig, kritisch,
 * unterschiedlich, der Ingenieur, der Architekt, die Architektin,
 * der Maler, der Musiker, der Übersetzer, der Metzger,
 * der Sozialarbeiter, die Lehrstelle, der Lehrling, die Lehre,
 * die Fortbildung, das Diplom, das Zertifikat, das Abitur, die Matura.
 */
export const b1U38: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u38-r1",
    level: "B1",
    skill: "reading",
    unit: 38,
    title: "Vier Berufe, vier Wege",
    genre: "Meslek tanıtımı",
    intro: "Dört meslek, dört farklı yol. Kim ne yapıyor, nasıl başlamış?",
    minutes: 5,
    gloss: [
      { de: "der Ingenieur", tr: "mühendis", en: "engineer" },
      { de: "die Architektin", tr: "mimar", en: "architect", note: "kadın biçimi" },
      { de: "der Übersetzer", tr: "çevirmen", en: "translator" },
      { de: "der Sozialarbeiter", tr: "sosyal hizmet uzmanı", en: "social worker" },
      { de: "der Metzger", tr: "kasap", en: "butcher" },
    ],
    text:
      "Frau Berger ist Architektin. Sie hat studiert, sechs Jahre lang, und " +
      "arbeitet heute in einem kleinen Büro mit vier Personen.\n\n" +
      "Herr Aydın ist Übersetzer. Er hat kein Diplom in diesem Fach, " +
      "sondern zwei Sprachen von zu Hause und ein Zertifikat aus einer " +
      "Fortbildung. Seine Frau ist Ingenieurin und verdient mehr, das sagt " +
      "er ganz offen.\n\n" +
      "Frau Klein ist Metzgerin in dritter Generation — ihr Vater war auch \n" +
      "Metzger. Sie hat eine Lehre " +
      "gemacht, drei Jahre, und danach den Betrieb übernommen. Ein Studium " +
      "hätte ihr nichts genützt, sagt sie.\n\n" +
      "Und Herr Vogel ist Sozialarbeiter. Er war vorher Musiker und hat mit " +
      "vierzig noch einmal angefangen. Er sagt, dass beide Berufe unterschiedlich sind — aber dass es in " +
      "beiden darum geht, zuzuhören.",
    questions: [
      {
        text: "Wie lange hat Frau Berger studiert?",
        options: ["Drei Jahre", "Sechs Jahre", "Gar nicht"],
        answer: 1,
        explain: "„Sie hat studiert, sechs Jahre lang …“",
      },
      {
        text: "Was hat Herr Aydın statt eines Diploms?",
        options: ["Zwei Sprachen und ein Zertifikat", "Ein Abitur", "Eine Lehre"],
        answer: 0,
        explain: "„… sondern zwei Sprachen von zu Hause und ein Zertifikat aus einer Fortbildung.“",
      },
      {
        text: "Was war Herr Vogel vorher?",
        options: ["Musiker", "Maler", "Metzger"],
        answer: 0,
        explain: "„Er war vorher Musiker und hat mit vierzig noch einmal angefangen.“",
      },
      {
        kind: "gapfill",
        text: "Seine Frau ist ___ und verdient mehr.",
        options: [],
        answer: 0,
        accept: ["Ingenieurin"],
        explain: "Dişil meslek adı -in alır: Ingenieur → Ingenieurin.",
      },
      {
        kind: "short_answer",
        text: "Wie lange dauerte die Lehre von Frau Klein?",
        options: [],
        answer: 0,
        accept: ["drei Jahre", "3 Jahre"],
        explain: "„Sie hat eine Lehre gemacht, drei Jahre …“",
      },
    ],
  },
  {
    id: "b1-u38-r2",
    level: "B1",
    skill: "reading",
    unit: 38,
    title: "Lehre oder Studium?",
    genre: "Rehber metin",
    intro: "İki yol karşılaştırılıyor. Hangisi kime uygun?",
    minutes: 5,
    gloss: [
      { de: "die Lehre", tr: "çıraklık eğitimi", en: "apprenticeship" },
      { de: "die Lehrstelle", tr: "çıraklık yeri", en: "apprenticeship post" },
      { de: "der Lehrling", tr: "çırak", en: "apprentice" },
      { de: "das Abitur", tr: "lise bitirme sınavı", en: "school-leaving exam" },
      { de: "die Fortbildung", tr: "mesleki eğitim", en: "further training" },
    ],
    text:
      "Nach dem Abitur denken viele nur an ein Studium. Dabei ist eine " +
      "Lehre in manchen Berufen der schnellere und sicherere Weg.\n\n" +
      "Ein Lehrling verdient ab dem ersten Tag, wenig zwar, aber er zahlt " +
      "nichts. Nach drei Jahren hat er einen Abschluss und meistens auch " +
      "eine Stelle — oft im selben Betrieb, in dem er gelernt hat.\n\n" +
      "Wer eine Lehrstelle sucht, sollte früh anfangen. Die guten Plätze " +
      "sind ein Jahr vorher weg. Und geh am besten selbst hin: viele " +
      "Betriebe stellen jemanden ein, den sie gesehen haben, nicht den " +
      "mit dem besten Brief.\n\n" +
      "Eine Fortbildung steht später beiden Wegen offen. Ein Studium ist " +
      "deshalb nicht schlechter. Aber wer nicht sicher " +
      "ist, sollte nicht studieren gehen, nur weil alle das machen. " +
      "Man kann nach einer Lehre immer noch anfangen zu studieren — " +
      "umgekehrt ist es schwerer.",
    questions: [
      {
        text: "Was ist der Vorteil einer Lehre?",
        options: ["Man verdient ab dem ersten Tag", "Man lernt mehr", "Sie ist kürzer als ein Jahr"],
        answer: 0,
        explain: "„Ein Lehrling verdient ab dem ersten Tag, wenig zwar, aber er zahlt nichts.“",
      },
      {
        text: "Wann sind die guten Lehrstellen weg?",
        options: ["Ein Jahr vorher", "Einen Monat vorher", "Nie"],
        answer: 0,
        explain: "„Die guten Plätze sind ein Jahr vorher weg.“",
      },
      {
        text: "Wen stellen viele Betriebe ein?",
        options: ["Den mit dem besten Brief", "Jemanden, den sie gesehen haben", "Den Ältesten"],
        answer: 1,
        explain: "„… viele Betriebe stellen jemanden ein, den sie gesehen haben …“",
      },
      {
        kind: "gapfill",
        text: "Wer nicht sicher ist, sollte nicht ___ ___, nur weil alle das machen.",
        options: [],
        answer: 0,
        accept: ["studieren gehen"],
        explain: "„gehen“ ikinci fiili ÇIPLAK mastar olarak alır: zu yok.",
      },
      {
        kind: "short_answer",
        text: "Wie lange dauert eine Lehre?",
        options: [],
        answer: 0,
        accept: ["drei Jahre", "3 Jahre"],
        explain: "„Nach drei Jahren hat er einen Abschluss …“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u38-l1",
    level: "B1",
    skill: "listening",
    unit: 38,
    title: "Der Kopierer klemmt",
    genre: "Ofis arızası",
    intro: "Bir fotokopi makinesi bozulmuş. Kim ne deniyor?",
    minutes: 4,
    gloss: [
      { de: "der Kopierer", tr: "fotokopi makinesi", en: "copier" },
      { de: "einstellen", tr: "ayarlamak", en: "to adjust" },
      { de: "testen", tr: "denemek", en: "to test" },
      { de: "nützen", tr: "işe yaramak", en: "to be of use" },
    ],
    segments: [
      { text: "Der Kopierer geht wieder nicht. Immer am Montag." },
      { text: "Hast du ihn schon aus- und wieder eingeschaltet?" },
      { text: "Zweimal. Das hat nichts genützt." },
      { text: "Dann ist es diesmal nicht das Laufwerk." },
      { text: "Ich lasse ihn morgen reparieren. Heute teste ich noch das Papier." },
      { text: "Gute Idee. Manchmal ist es nur falsch eingestellt." },
      { text: "Bis dahin gehe ich unten kopieren." },
      { text: "Mach das. Und schreib einen Zettel dran, sonst probiert es jeder." },
    ],
    questions: [
      {
        text: "Was hat die erste Person schon versucht?",
        options: ["Aus- und einschalten", "Das Papier gewechselt", "Nichts"],
        answer: 0,
        explain: "„Zweimal. Das hat nichts genützt.“",
      },
      {
        text: "Was macht sie morgen?",
        options: ["Sie kauft einen neuen", "Sie lässt ihn reparieren", "Sie testet das Laufwerk"],
        answer: 1,
        explain: "„Ich lasse ihn morgen reparieren.“",
      },
      {
        text: "Was soll sie noch machen?",
        options: ["Einen Zettel dranschreiben", "Den Chef rufen", "Das Gerät wegräumen"],
        answer: 0,
        explain: "„Und schreib einen Zettel dran, sonst probiert es jeder.“",
      },
      {
        kind: "gapfill",
        text: "Bis dahin ___ ich unten ___.",
        options: [],
        answer: 0,
        accept: ["gehe kopieren", "gehe / kopieren"],
        explain: "„gehen“ + çıplak mastar: gehe kopieren, „zu kopieren“ değil.",
      },
      {
        kind: "short_answer",
        text: "An welchem Tag geht der Kopierer oft nicht?",
        options: [],
        answer: 0,
        accept: ["am Montag", "Montag"],
        explain: "„Der Kopierer geht wieder nicht. Immer am Montag.“",
      },
    ],
  },
  {
    id: "b1-u38-l2",
    level: "B1",
    skill: "listening",
    unit: 38,
    title: "Macht Technik abhängig?",
    genre: "Kısa tartışma",
    intro: "Teknoloji tartışılıyor. İki farklı bakış.",
    minutes: 4,
    gloss: [
      { de: "die Technologie", tr: "teknoloji", en: "technology" },
      { de: "abhängig", tr: "bağımlı", en: "dependent" },
      { de: "beeinflussen", tr: "etkilemek", en: "to influence" },
      { de: "kritisch", tr: "eleştirel", en: "critical" },
    ],
    segments: [
      { text: "Ich finde, die neue Technologie macht uns abhängig." },
      { text: "Abhängig wovon genau?" },
      { text: "Vom Gerät. Ohne Handy findet heute niemand mehr eine Adresse." },
      { text: "Das stimmt. Aber früher hat uns die Karte auch beeinflusst." },
      { text: "Das ist etwas anderes. Eine Karte macht niemanden süchtig." },
      { text: "Da hast du recht. Ich bin auch kritisch, aber nicht so streng." },
      { text: "Die Medien sagen dazu jede Woche etwas Unterschiedliches." },
      { text: "Eben. Deshalb höre ich lieber zu, statt sofort zu antworten." },
    ],
    questions: [
      {
        text: "Was findet die erste Person?",
        options: ["Technologie macht abhängig", "Technologie ist nützlich", "Technologie ist alt"],
        answer: 0,
        explain: "„Ich finde, die neue Technologie macht uns abhängig.“",
      },
      {
        text: "Welches Beispiel nennt sie?",
        options: ["Das Handy und Adressen", "Den Kopierer", "Das Radio"],
        answer: 0,
        explain: "„Vom Gerät. Ohne Handy findet heute niemand mehr eine Adresse.“",
      },
      {
        text: "Was sagt die zweite Person über die Medien?",
        options: ["Sie sagen jede Woche etwas anderes", "Sie haben recht", "Sie sagen nichts"],
        answer: 0,
        explain: "„Die Medien sagen dazu jede Woche etwas Unterschiedliches.“",
      },
      {
        kind: "gapfill",
        text: "Aber früher hat uns die Karte auch ___.",
        options: [],
        answer: 0,
        accept: ["beeinflusst"],
        explain: "„beeinflussen“ ayrılmayan fiildir: ortaçta ge- gelmez.",
      },
      {
        kind: "short_answer",
        text: "Was macht die zweite Person lieber?",
        options: [],
        answer: 0,
        accept: ["zuhören", "sie hört lieber zu", "zuhören statt antworten"],
        explain: "„Deshalb höre ich lieber zu, statt sofort zu antworten.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u38-w1",
    level: "B1",
    skill: "writing",
    unit: 38,
    title: "Einen Beruf vorstellen",
    genre: "Meslek tanıtımı",
    intro: "Bir mesleği tanıt. Almancada meslek adı cinsiyete göre değişir.",
    minutes: 8,
    gloss: [
      { de: "der Architekt", tr: "mimar", en: "architect" },
      { de: "der Maler", tr: "ressam / boyacı", en: "painter" },
      { de: "der Musiker", tr: "müzisyen", en: "musician" },
      { de: "das Zertifikat", tr: "sertifika", en: "certificate" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Kız kardeşim mimar ve altı yıl okudu; kocası ressam ve müzisyen.",
        answer: "Meine Schwester ist Architektin und hat sechs Jahre studiert; ihr Mann ist Maler und Musiker.",
        hint: "Dişil biçim -in alır.",
      },
      {
        kind: "build",
        tr: "Erkek kardeşi mühendis, karısı da mühendis.",
        answer: "Ihr Bruder ist Ingenieur und seine Frau ist auch Ingenieurin.",
        hint: "Aynı meslek, iki biçim.",
      },
      {
        kind: "build",
        tr: "Bu alanda diploması yok, sertifikası var.",
        answer: "In diesem Fach hat er kein Diplom, sondern ein Zertifikat.",
        hint: "Olumsuzdan sonra düzeltme → sondern.",
      },
      {
        kind: "form",
        prompt: "Meslek kartını doldur.",
        facts: "Kişi: Sedef Berger; meslek: mimar; eğitim: 6 yıl üniversite; iş yeri: 4 kişilik büro; ek: sertifika yok.",
        fields: [
          { label: "Name", answer: "Sedef Berger", accept: ["Sedef", "Berger"] },
          { label: "Beruf", answer: "Architektin", accept: ["Architekt", "sie ist Architektin"] },
          { label: "Ausbildung", answer: "6 Jahre Studium", accept: ["sechs Jahre", "Studium"] },
          { label: "Arbeitsort", answer: "kleines Büro", accept: ["Büro", "ein Büro mit vier Personen"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Meslek adlarının cinsini düzelt.",
        source: "Meine Schwester ist Architekt und meine Mutter war Übersetzer.",
        answer: "Meine Schwester ist Architektin und meine Mutter war Übersetzerin.",
        why: "Türkçede meslek adı cinsiyete göre DEĞİŞMEZ ('mimar' herkes için aynıdır), o yüzden Almancada da eril biçim herkese uygulanıyor. Almanca dişil biçimi -in ile kurar: Architekt → Architektin, Übersetzer → Übersetzerin, Ingenieur → Ingenieurin. Artikel de değişir (der → die) ve çoğulda -innen gelir.",
      },
    ],
  },
  {
    id: "b1-u38-w2",
    level: "B1",
    skill: "writing",
    unit: 38,
    title: "Mein Weg nach der Schule",
    genre: "Plan metni",
    intro: "Okuldan sonraki yolunu yaz. Bazı fiillerden sonra 'zu' gelmez.",
    minutes: 12,
    gloss: [
      { de: "die Lehrstelle", tr: "çıraklık yeri", en: "apprenticeship post" },
      { de: "die Matura", tr: "olgunluk sınavı", en: "school-leaving exam" },
      { de: "das Diplom", tr: "diploma", en: "diploma" },
      { de: "die Fortbildung", tr: "mesleki eğitim", en: "further training" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Yaz aylarında çalışmaya gidiyorum.",
        answer: "Im Sommer gehe ich arbeiten.",
        hint: "„gehen“ + çıplak mastar.",
      },
      {
        kind: "build",
        tr: "Kardeşim yüzmeyi öğreniyor ve ben ona yardım ediyorum.",
        answer: "Mein Bruder lernt schwimmen und ich helfe ihm üben.",
        hint: "„lernen“ ve „helfen“ de zu almaz.",
      },
      {
        kind: "free",
        prompt: "Okuldan ya da bir eğitimden sonraki planını yaz: hangi yolu seçtin (çıraklık, okul, iş), neden, hangi adımı ne zaman atacaksın, ne belirsiz ve kime danışacaksın. En az iki 'gehen/lernen/helfen + mastar' cümlesi kullan.",
        checklist: [
          "Seçilen yol net mi?",
          "Gerekçe verilmiş mi?",
          "Zamanlı bir adım var mı?",
          "Belirsiz bir nokta dürüstçe söylenmiş mi?",
          "En az iki çıplak mastar cümlesi var mı?",
        ],
        minWords: 70,
        sample:
          "Nach der Schule mache ich zuerst eine Lehre, kein Studium. " +
          "Der Grund ist einfach: ich möchte früh arbeiten gehen und dabei " +
          "etwas verdienen.\n\n" +
          "Im Frühling suche ich eine Lehrstelle. Ich gehe selbst in die " +
          "Betriebe, statt nur Briefe zu schreiben — mein Onkel sagt, viele " +
          "stellen jemanden ein, den sie gesehen haben.\n\n" +
          "Sicher bin ich noch nicht bei einer Sache: ob ich später doch " +
          "noch studieren gehe. Nach einer Lehre ist das möglich, umgekehrt " +
          "ist es schwerer. Ein Zertifikat aus einer Fortbildung kann " +
          "dabei helfen.\n\n" +
          "Im März rede ich mit meiner Lehrerin. Sie kennt die Betriebe " +
          "hier und hilft mir vorbereiten, wenn ich sie darum bitte. Nach der Matura bekomme ich kein Diplom, sondern ein Zeugnis.",
        phrases: [
          { de: "Ich möchte früh arbeiten gehen.", tr: "Erken çalışmaya başlamak istiyorum.", en: "I want to start working early." },
          { de: "Sie hilft mir vorbereiten.", tr: "Hazırlanmama yardım ediyor.", en: "She helps me prepare." },
          { de: "Sicher bin ich noch nicht bei …", tr: "Şundan henüz emin değilim …", en: "I'm not yet sure about …" },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Fazladan 'zu'yu kaldır.",
        source: "Ich gehe zu arbeiten und mein Bruder lernt zu schwimmen.",
        answer: "Ich gehe arbeiten und mein Bruder lernt schwimmen.",
        why: "Ünite 13 KİPLİ fiillerin zu almadığını çalıştı. Bu ayrı bir sınıf ve aynı kural geçerli: gehen, kommen, lernen, helfen, sehen, hören fiillerinden sonra ikinci fiil ÇIPLAK mastar olur — ich gehe arbeiten, er lernt schwimmen, sie hilft mir tragen, ich höre ihn kommen. Türkçede bu yapı tek bir birleşik fiil gibi ('çalışmaya gitmek'), o yüzden araya bir bağlayıcı konuyor.",
      },
    ],
  },
];
