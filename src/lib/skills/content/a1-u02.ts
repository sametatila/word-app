import type { SkillExercise } from "../types";

/**
 * A1 · Ünite 2 — "Diller, sayılar, harfler ve meslek" (tema-hizalı içerik).
 *
 * Bu ünitenin dört dersi (Sprichst du Deutsch? · Zahlen bitte! · Wie schreibt
 * man das? · Was bist du von Beruf?) şu kelimeleri öğretir; içerik BUNUN ve
 * ünite 1'in dışına çıkmaz:
 *
 *   Ünite 2: sprechen, Deutsch, Englisch, Türkisch, ein bisschen, die Sprache,
 *            der Kurs, wiederholen · zahlen, zehn, zwanzig, hundert, die Nummer,
 *            wie viel, einmal, mindestens · der Buchstabe, buchstabieren,
 *            schreiben, der Vorname, der Nachname, das Wort, der Fehler,
 *            die Seite · der Beruf, arbeiten, der Lehrer, die Ärztin,
 *            die Firma, die Arbeit, der Verkäufer, arbeitslos
 *   Ünite 1: hallo, heißen, kommen, wohnen, der Name, tschüss, bitte, danke,
 *            gut, du/Sie, der Herr, die Dame, woher, wo, das Land, die Stadt…
 *
 * Sayılar bilerek YAZIYLA ve rakamla birlikte geçiyor: ders ikisini de
 * öğretiyor ve tanıyıcı/okuyucu ikisiyle de karşılaşacak.
 */
export const a1U02: SkillExercise[] = [
  {
    id: "a1-u2-r1",
    level: "A1",
    skill: "reading",
    unit: 2,
    title: "Deutschkurs A1",
    genre: "İlan",
    intro: "Bir dil okulunun kurs ilanını okuyacaksın. Sayılara dikkat et.",
    gloss: [
      { de: "der Kurs", tr: "kurs", en: "course" },
      { de: "die Sprache", tr: "dil", en: "language" },
      { de: "zahlen", tr: "ödemek", en: "to pay" },
      { de: "die Nummer", tr: "numara", en: "number" },
      { de: "mindestens", tr: "en az", en: "at least" },
      { de: "die Seite", tr: "sayfa", en: "page" },
    ],
    minutes: 3,
    text:
      "Sprachschule Mitte — Deutschkurs A1\n\nDer Kurs ist neu. Wir lernen zusammen Deutsch. Wir lernen Deutsch von A1 bis B1.\n\nDer Kurs kostet hundert Euro. Sie zahlen einmal, nicht jeden Monat.\n\nEine Gruppe hat mindestens zehn Personen. Mehr als zwanzig Personen sind zu viel.\n\nSie sprechen kein Deutsch? Kein Problem! Der A1-Kurs ist für Anfänger.\n\nFragen? Rufen Sie uns an: Nummer 030 22 44 88. Oder schreiben Sie an info@sprachschule-mitte.de. Mehr Information finden Sie auf Seite 2.",
    questions: [
      {
        text: "Wie viel kostet der Kurs?",
        options: ["hundert Euro", "zwanzig Euro", "zehn Euro"],
        answer: 0,
        explain: "„Der Kurs kostet hundert Euro.“ — 100 Euro. Zehn ve zwanzig ilandaki kişi sayıları.",
      },
      {
        text: "Richtig oder falsch? Man zahlt jeden Monat.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Sie zahlen einmal, nicht jeden Monat.“ — bir kez ödeniyor.",
      },
      {
        text: "Wie viele Personen sind mindestens in einer Gruppe?",
        options: ["zehn", "zwanzig", "hundert"],
        answer: 0,
        explain: "„mindestens zehn Personen“ — en az on. Zwanzig ise en fazla sayı.",
      },
      {
        kind: "gapfill",
        text: "Die Nummer der Sprachschule ist 030 22 44 ___.",
        options: [],
        answer: 0,
        accept: ["88", "achtundachtzig"],
        explain: "İlanda „Nummer 030 22 44 88“ yazıyor. Rakamla da yazıyla da kabul edilir.",
      },
    ],
  },
  {
    id: "a1-u2-r2",
    level: "A1",
    skill: "reading",
    unit: 2,
    title: "Drei Personen, drei Berufe",
    genre: "Profil",
    intro: "Üç kişi kendini tanıtıyor: mesleği ne, hangi dilleri konuşuyor?",
    gloss: [
      { de: "der Beruf", tr: "meslek", en: "profession" },
      { de: "die Ärztin", tr: "kadın doktor", en: "doctor (f.)" },
      { de: "der Verkäufer", tr: "satıcı", en: "salesperson" },
      { de: "arbeitslos", tr: "işsiz", en: "unemployed" },
      { de: "die Firma", tr: "şirket", en: "company" },
      { de: "ein bisschen", tr: "biraz", en: "a little" },
    ],
    minutes: 3,
    text:
      "Nadia: Hallo! Ich heiße Nadia und komme aus Marokko. Ich wohne in Hamburg. Ich bin Ärztin. Ich spreche Arabisch, Französisch und ein bisschen Deutsch.\n\nTom: Ich bin Tom. Ich komme aus England und spreche Englisch und Deutsch. Ich arbeite als Verkäufer in einer Firma in Köln.\n\nElif: Ich heiße Elif. Ich komme aus der Türkei und wohne in Wien. Ich spreche Türkisch und Deutsch. Im Moment bin ich arbeitslos, aber ich lerne viel und schreibe jeden Tag Bewerbungen.",
    questions: [
      {
        text: "Was ist Nadia von Beruf?",
        options: ["Ärztin", "Verkäuferin", "Lehrerin"],
        answer: 0,
        explain: "„Ich bin Ärztin.“ — kadın doktor.",
      },
      {
        text: "Wer arbeitet in einer Firma?",
        options: ["Tom", "Nadia", "Elif"],
        answer: 0,
        explain: "„Ich arbeite als Verkäufer in einer Firma in Köln.“ — Tom.",
      },
      {
        text: "Richtig oder falsch? Elif hat im Moment Arbeit.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Im Moment bin ich arbeitslos.“ — şu an işsiz.",
      },
      {
        text: "Wer spricht nur ein bisschen Deutsch?",
        options: ["Nadia", "Tom", "Elif"],
        answer: 0,
        explain: "Nadia „ein bisschen Deutsch“ diyor. Tom ve Elif Almanca konuştuklarını sınırlama koymadan söylüyor.",
      },
    ],
  },
  {
    id: "a1-u2-l1",
    level: "A1",
    skill: "listening",
    unit: 2,
    title: "Wie schreibt man das?",
    genre: "Telefon",
    intro: "Bir kadın telefonda adını harf harf söylüyor. Dinle ve yaz.",
    gloss: [
      { de: "buchstabieren", tr: "harf harf söylemek", en: "to spell" },
      { de: "der Nachname", tr: "soyadı", en: "surname" },
      { de: "der Buchstabe", tr: "harf", en: "letter" },
    ],
    minutes: 2,
    segments: [
      { text: "Guten Tag! Mein Vorname ist Anna." },
      { text: "Mein Nachname ist Berger." },
      { text: "Ich buchstabiere: B — E — R — G — E — R." },
      { text: "Meine Nummer ist zehn zwanzig." },
    ],
    questions: [
      {
        text: "Wie heißt die Frau mit Vornamen?",
        options: ["Anna", "Emma", "Nadia"],
        answer: 0,
        explain: "„Mein Vorname ist Anna.“",
      },
      {
        kind: "gapfill",
        text: "Der Nachname ist ___.",
        options: [],
        answer: 0,
        accept: ["Berger"],
        explain: "Kadın B-E-R-G-E-R diye harfliyor: Berger.",
      },
      {
        text: "Wie viele Buchstaben hat der Nachname?",
        options: ["sechs", "fünf", "sieben"],
        answer: 0,
        explain: "B, E, R, G, E, R — altı harf.",
      },
      {
        kind: "gapfill",
        text: "Ihre Nummer ist zehn ___.",
        options: [],
        answer: 0,
        accept: ["zwanzig", "20"],
        explain: "„Meine Nummer ist zehn zwanzig.“ Yazıyla da rakamla da kabul edilir.",
      },
    ],
  },
  {
    id: "a1-u2-l2",
    level: "A1",
    skill: "listening",
    unit: 2,
    title: "Die Kursnummer",
    genre: "Anons",
    intro: "Dil okulunda bir anons duyacaksın. Kurs numarasını ve sayıları yakala.",
    gloss: [
      { de: "wiederholen", tr: "tekrarlamak", en: "to repeat" },
      { de: "der Fehler", tr: "hata", en: "mistake" },
      { de: "wie viel", tr: "ne kadar", en: "how much" },
    ],
    minutes: 2,
    segments: [
      { text: "Guten Morgen! Hier ist der Deutschkurs A1." },
      { text: "Die Kursnummer ist hundert zehn." },
      { text: "Der Kurs kostet zwanzig Euro." },
      { text: "Bitte wiederholen Sie die Wörter. Ein Fehler ist kein Problem!" },
    ],
    questions: [
      {
        text: "Welcher Kurs ist das?",
        options: ["Deutschkurs A1", "Englischkurs A1", "Deutschkurs B1"],
        answer: 0,
        explain: "„Hier ist der Deutschkurs A1.“",
      },
      {
        kind: "gapfill",
        text: "Die Kursnummer ist ___ zehn.",
        options: [],
        answer: 0,
        accept: ["hundert", "100"],
        explain: "„Die Kursnummer ist hundert zehn.“",
      },
      {
        text: "Wie viel kostet der Kurs?",
        options: ["zwanzig Euro", "zehn Euro", "hundert Euro"],
        answer: 0,
        explain: "„Der Kurs kostet zwanzig Euro.“ Hundert ise kurs numarasının bir parçası.",
      },
      {
        text: "Richtig oder falsch? Ein Fehler ist ein Problem.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Ein Fehler ist kein Problem!“ — hata sorun değil.",
      },
    ],
  },
  {
    id: "a1-u2-w1",
    level: "A1",
    skill: "writing",
    unit: 2,
    title: "Anmeldung zum Sprachkurs",
    genre: "Form",
    intro: "Dil kursu kayıt formunu doldur ve iki cümle kur.",
    gloss: [
      { de: "der Vorname", tr: "ad", en: "first name" },
      { de: "der Nachname", tr: "soyadı", en: "surname" },
      { de: "der Beruf", tr: "meslek", en: "profession" },
      { de: "die Sprache", tr: "dil", en: "language" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "form",
        prompt: "Kayıt formunu Tarek için doldur.",
        facts: "Tarek Haddad, Şam doğumlu, şimdi Köln'de oturuyor; öğretmen; Arapça ve biraz Almanca konuşuyor; telefon numarası 030 44 88.",
        fields: [
          { label: "Vorname", answer: "Tarek" },
          { label: "Nachname", answer: "Haddad" },
          { label: "Wohnort", answer: "Köln", accept: ["Koeln"] },
          { label: "Beruf", answer: "Lehrer" },
          { label: "Nummer", answer: "030 44 88", accept: ["030 4488", "0304488"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Aynı soruyu resmî hitapla (Sie) yaz.",
        source: "Wie schreibst du deinen Namen?",
        answer: "Wie schreiben Sie Ihren Namen?",
        why: "Resmî hitapta özne Sie, fiil -en biçiminde (schreiben Sie) ve „deinen“ yerine „Ihren“ gelir.",
      },
      {
        kind: "build",
        tr: "Biraz Almanca konuşuyorum.",
        answer: "Ich spreche ein bisschen Deutsch",
        hint: "„ein bisschen“ fiilden sonra, nesnenin önünde durur: Ich spreche ein bisschen Deutsch.",
      },
    ],
  },
  {
    id: "a1-u2-w2",
    level: "A1",
    skill: "writing",
    unit: 2,
    title: "Kurz über meinen Beruf",
    genre: "Forum mesajı",
    intro: "Dil kursunun forumunda kendini tanıt: mesleğin ve dillerin.",
    gloss: [
      { de: "arbeiten als", tr: "… olarak çalışmak", en: "to work as" },
      { de: "die Firma", tr: "şirket", en: "company" },
      { de: "arbeitslos", tr: "işsiz", en: "unemployed" },
      { de: "wiederholen", tr: "tekrarlamak", en: "to repeat" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Bir şirkette çalışıyorum.",
        answer: "Ich arbeite in einer Firma",
        hint: "Firma dişildir; „in“ Dativ istediği için „einer Firma“ olur.",
      },
      {
        kind: "build",
        tr: "Satıcıyım.",
        answer: "Ich bin Verkäufer",
        hint: "Meslek söylerken artikel KULLANILMAZ: „Ich bin Verkäufer“ — „ein Verkäufer“ değil.",
      },
      {
        kind: "free",
        prompt:
          "Foruma kısa bir mesaj yaz (3-4 cümle). Şunlara değin: adın, nereden geldiğin, mesleğin ve hangi dilleri konuştuğun.",
        minWords: 25,
        checklist: [
          "Adını yazdın mı? (Ich heiße …)",
          "Nereden geldiğini yazdın mı? (Ich komme aus …)",
          "Mesleğini yazdın mı? (Ich bin … / Ich arbeite als …)",
          "Hangi dilleri konuştuğunu yazdın mı? (Ich spreche …)",
        ],
        phrases: [
          { de: "Ich heiße …", tr: "Adım …", en: "My name is …" },
          { de: "Ich arbeite als …", tr: "… olarak çalışıyorum", en: "I work as …" },
        ],
        sample:
          "Hallo zusammen!\n\nIch heiße Tarek und komme aus Syrien. Jetzt wohne ich in Köln.\n\nIch bin Lehrer, aber im Moment arbeite ich nicht. Ich spreche Arabisch, Englisch und ein bisschen Deutsch.\n\nIch wiederhole jeden Tag die Wörter. Bis bald!\nTarek",
      },
    ],
  },
];
