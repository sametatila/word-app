import type { SkillExercise } from "../../types";

/**
 * DE · A1 — Beceriler kütüphanesi, parti 7.
 *
 * Kurallar ve emsal: `de-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 7 yazışma ve yol hattı: telefon mesajlaşması, gar anonsları, okula
 * mazeret notu. Söyleyiş odağı r sesinin başta ve sonda iki hâli; dil bilgisi
 * iyelik ve olumsuzlama — „mein“ ile „kein“ aynı çekimi paylaşıyor.
 */
export const deA1P7: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a1-lib-r7",
    course: "de",
    level: "A1",
    skill: "reading",
    title: "Nachrichten: Ein Geschenk für Nuri",
    genre: "message",
    intro: "İki arkadaş telefondan yazışıyor: kime hediye alınacak, ne alınacak, parayı kim topluyor.",
    gloss: [
      { de: "das Geschenk", tr: "hediye", en: "gift" },
      { de: "der Gutschein", tr: "hediye çeki", en: "voucher" },
      { de: "zusammen", tr: "birlikte", en: "together" },
      { de: "die Idee", tr: "fikir", en: "idea" },
      { de: "teuer", tr: "pahalı", en: "expensive" },
      { de: "überweisen", tr: "havale etmek", en: "to transfer" },
    ],
    minutes: 4,
    text:
      "Mia, 18:02\nHallo Jan! Nuri hat am Samstag Geburtstag. Hast du eine Idee für ein Geschenk?\n\n" +
      "Jan, 18:09\nHallo! Ein Buch vielleicht? Oder wir kaufen zusammen etwas Großes.\n\n" +
      "Mia, 18:11\nZusammen ist besser. Er kocht so gern. Eine Pfanne?\n\n" +
      "Jan, 18:15\nGute Idee! Aber eine gute Pfanne ist teuer. Wie viel bezahlen wir?\n\n" +
      "Mia, 18:17\nWir sind sechs Personen. Jeder gibt zehn Euro, dann haben wir sechzig.\n\n" +
      "Jan, 18:20\nOkay. Ich kaufe die Pfanne morgen. Bitte überweist mir das Geld bis Freitag.\n\n" +
      "Mia, 18:21\nPerfekt. Und der Gutschein für das Kochbuch? Den nehmen wir nicht, oder?\n\n" +
      "Jan, 18:23\nNein, nur die Pfanne. Bis Samstag!",
    questions: [
      {
        text: "Worüber schreiben Mia und Jan?",
        options: ["über einen Kochkurs", "über ein Geschenk", "über eine neue Wohnung"],
        answer: 1,
        explain: "Konu Nuri'nin cumartesi günkü doğum günü ve ona ne alınacağı.",
      },
      {
        text: "Was kaufen sie am Ende?",
        options: ["ein Buch", "einen Gutschein", "eine Pfanne"],
        answer: 2,
        explain: "„Nein, nur die Pfanne“ — kitap ve hediye çeki fikri elenir.",
      },
      {
        kind: "truefalse",
        text: "Jeder bezahlt zwanzig Euro.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Jeder gibt zehn Euro“ — altı kişi toplam altmış euro veriyor.",
      },
      {
        kind: "gapfill",
        text: "Sie sind ___ Personen.",
        options: [],
        answer: 0,
        accept: ["sechs", "6"],
        explain: "„Wir sind sechs Personen.“",
      },
      {
        kind: "short_answer",
        text: "Bis wann soll das Geld bei Jan sein?",
        options: [],
        answer: 0,
        accept: ["bis Freitag", "Freitag"],
        explain: "„Bitte überweist mir das Geld bis Freitag.“",
      },
      {
        text: "Warum passt eine Pfanne gut zu Nuri?",
        options: ["Er kocht sehr gern.", "Er hat eine neue Küche.", "Er arbeitet in einem Restaurant."],
        answer: 0,
        explain: "„Er kocht so gern“ cümlesi hediyenin gerekçesi; mutfak ve iş konusu hiç geçmiyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a1-lib-l7",
    course: "de",
    level: "A1",
    skill: "listening",
    title: "Durchsagen am Bahnhof",
    genre: "info",
    intro: "Garda peş peşe dört anons: hangi tren nereye, hangi perondan, kaç dakika gecikmeli.",
    gloss: [
      { de: "das Gleis", tr: "peron", en: "platform" },
      { de: "die Verspätung", tr: "gecikme", en: "delay" },
      { de: "der Zug", tr: "tren", en: "train" },
      { de: "abfahren", tr: "kalkmak", en: "to depart" },
      { de: "einsteigen", tr: "binmek", en: "to get on" },
      { de: "der Anschluss", tr: "aktarma", en: "connection" },
    ],
    minutes: 4,
    segments: [
      { text: "Guten Tag und willkommen am Hauptbahnhof Leipzig. Wir informieren Sie über die nächsten Züge." },
      { text: "Der Zug nach Dresden fährt um vierzehn Uhr zehn von Gleis drei ab. Bitte steigen Sie jetzt ein." },
      { text: "Achtung, eine Information für die Reisenden nach München: Der Zug hat heute zwanzig Minuten Verspätung." },
      { text: "Der Anschluss nach Nürnberg wartet. Sie haben in München genug Zeit." },
      { text: "Der Zug nach Berlin fährt heute nicht von Gleis fünf, sondern von Gleis sieben." },
      { text: "Bitte achten Sie auf Ihr Gepäck. Wir wünschen Ihnen eine gute Reise." },
    ],
    questions: [
      {
        text: "Von welchem Gleis fährt der Zug nach Dresden?",
        options: ["von Gleis fünf", "von Gleis drei", "von Gleis sieben"],
        answer: 1,
        explain: "„Der Zug nach Dresden fährt um vierzehn Uhr zehn von Gleis drei ab.“",
      },
      {
        text: "Was ist mit dem Zug nach München?",
        options: ["Er hat Verspätung.", "Er fällt heute aus.", "Er ist schon abgefahren."],
        answer: 0,
        explain: "„Der Zug hat heute zwanzig Minuten Verspätung“ — iptal değil, gecikme.",
      },
      {
        kind: "truefalse",
        text: "Der Zug nach Berlin fährt von Gleis fünf.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„nicht von Gleis fünf, sondern von Gleis sieben“ — peron değişmiş.",
      },
      {
        kind: "gapfill",
        text: "Der Zug nach München hat ___ Minuten Verspätung.",
        options: [],
        answer: 0,
        accept: ["zwanzig", "20"],
        explain: "„zwanzig Minuten Verspätung“.",
      },
      {
        kind: "short_answer",
        text: "Wohin fährt der Anschluss, der in München wartet?",
        options: [],
        answer: 0,
        accept: ["nach Nürnberg", "Nürnberg", "Nurnberg"],
        explain: "„Der Anschluss nach Nürnberg wartet.“",
      },
      {
        text: "Worauf sollen die Reisenden am Ende achten?",
        options: ["auf die Uhrzeit", "auf die Kinder", "auf ihr Gepäck"],
        answer: 2,
        explain: "Son anons „Bitte achten Sie auf Ihr Gepäck“ diyor.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a1-lib-w7",
    course: "de",
    level: "A1",
    skill: "writing",
    title: "Eine Entschuldigung für die Schule",
    genre: "letter",
    intro: "Çocuğun okula gelemiyor: önce iki cümle kur, sonra öğretmene kısa bir mazeret notu yaz.",
    gloss: [
      { de: "die Entschuldigung", tr: "mazeret notu", en: "note of excuse" },
      { de: "krank", tr: "hasta", en: "ill" },
      { de: "der Unterricht", tr: "ders", en: "lesson" },
      { de: "die Klasse", tr: "sınıf", en: "class" },
      { de: "unterschreiben", tr: "imzalamak", en: "to sign" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Oğlum bugün hasta ve okula gelemiyor.",
        answer: "Mein Sohn ist heute krank und kann nicht in die Schule kommen.",
        alternatives: ["Mein Sohn ist heute krank und kann nicht zur Schule kommen."],
        hint: "„kann“ ikinci sırada durur, asıl fiil („kommen“) cümlenin sonuna gider.",
      },
      {
        kind: "build",
        tr: "Yarın yine derste olacak.",
        answer: "Morgen ist er wieder im Unterricht.",
        alternatives: ["Er ist morgen wieder im Unterricht."],
        hint: "Zaman sözcüğü başa gelince fiil yine İKİNCİ sırada kalır: Morgen ist er …",
      },
      {
        kind: "free",
        prompt:
          "Sınıf öğretmenine kısa bir mazeret notu yaz: kimden söz ettiğini ve hangi sınıfta olduğunu söyle, neden gelemediğini yaz, kaç gün süreceğini belirt ve kibarca bitir.",
        checklist: [
          "Öğretmene hitap et",
          "Çocuğun adını ve sınıfını yaz",
          "Neden gelemediğini ve kaç gün süreceğini yaz",
          "Teşekkür et ve adını yaz",
        ],
        minWords: 30,
        phrases: [
          { de: "Sehr geehrte Frau …,", tr: "Sayın … Hanım,", en: "Dear Ms …," },
          { de: "Mein Sohn ist krank.", tr: "Oğlum hasta.", en: "My son is ill." },
          { de: "Er kann heute nicht kommen.", tr: "Bugün gelemiyor.", en: "He cannot come today." },
          { de: "Er bleibt zwei Tage zu Hause.", tr: "İki gün evde kalıyor.", en: "He is staying at home for two days." },
          { de: "Vielen Dank für Ihr Verständnis.", tr: "Anlayışınız için teşekkürler.", en: "Thank you for your understanding." },
        ],
        sample:
          "Sehr geehrte Frau Lehmann, mein Sohn Deniz aus der Klasse 3b ist seit gestern krank. " +
          "Er hat Fieber und kann heute nicht in die Schule kommen. Der Arzt sagt, er bleibt zwei Tage zu Hause. " +
          "Am Donnerstag ist er wieder im Unterricht. Vielen Dank für Ihr Verständnis. " +
          "Mit freundlichen Grüßen, Aylin Kaya",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a1-lib-s7",
    course: "de",
    level: "A1",
    skill: "speaking",
    title: "r am Anfang, -er am Ende",
    genre: "pronounce",
    intro: "Almanca r kelimenin başında boğazdan gelir, sonunda ise neredeyse bir a'ya dönüşür; altı cümlede ikisini ayır.",
    gloss: [
      { de: "die Reise", tr: "yolculuk", en: "journey" },
      { de: "der Bruder", tr: "erkek kardeş", en: "brother" },
      { de: "die Uhr", tr: "saat", en: "clock" },
      { de: "wieder", tr: "yine", en: "again" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Meine Reise beginnt am Montag.",
        tr: "Yolculuğum pazartesi başlıyor.",
        hint: "Baştaki r Türkçedeki titrek r değil: dilin arkası küçük dile yaklaşır, hafif bir gıcırtı duyulur.",
        confusions: [
          {
            heard: [],
            fix: "Dilin ucunu titretme; ses boğazın arkasından ve kısa çıkar.",
            expected: "Reise",
          },
        ],
      },
      {
        de: "Mein Bruder wohnt in Bremen.",
        tr: "Erkek kardeşim Bremen'de oturuyor.",
        hint: "„Bruder“ içinde iki r var: ilki ünsüzden sonra duyulur, sondaki -er ise a gibi okunur (BRUU-da).",
        confusions: [
          {
            heard: [],
            fix: "Sondaki -er'i r diye söyleme; kısa, gevşek bir a sesi yeterlidir.",
            expected: "Bruder",
          },
        ],
      },
      {
        de: "Die Uhr ist schon halb vier.",
        tr: "Saat çoktan üç buçuk.",
        hint: "„Uhr“ ve „vier“ sonundaki r de a'ya döner: UU-a, Fİİ-a.",
        confusions: [
          {
            heard: ["Die Ur ist schon halb vier"],
            fix: "Uzun u'dan sonra r yutulmaz; ses hafif bir a ile biter.",
            expected: "Uhr",
          },
        ],
      },
      {
        de: "Wir fahren wieder nach Rostock.",
        tr: "Yine Rostock'a gidiyoruz.",
        hint: "„Rostock“ başta sert r; „wieder“ sonda yumuşak -er; „fahren“ ortada ikisinin arası.",
        confusions: [
          {
            heard: [],
            fix: "„Rostock“ başındaki r dilin ucuyla değil, boğazın arkasından gelir.",
            expected: "Rostock",
          },
        ],
      },
      {
        de: "Der Lehrer erklärt die Regel.",
        tr: "Öğretmen kuralı açıklıyor.",
        hint: "r üç ayrı hâlde: „Lehrer“ sonu a gibi, „erklärt“ içindeki iki r de a'ya yakın, „Regel“ ise baştaki tam r.",
        confusions: [
          {
            heard: [],
            fix: "„Lehrer“ iki heceli: LEE-ra. Ama ilk r yazıda da seste de duruyor, atlanmaz.",
            expected: "Lehrer",
          },
        ],
      },
      {
        de: "Wer repariert mein Fahrrad?",
        tr: "Bisikletimi kim tamir ediyor?",
        hint: "„Wer“ sonda a gibi, „repariert“ içinde iki r, „Fahrrad“ içinde çift r tek ses.",
        confusions: [
          {
            heard: [],
            fix: "Çift r tek ses verir ama önündeki a kısalmaz: FAAR-raat.",
            expected: "Fahrrad",
          },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a1-lib-g7",
    course: "de",
    level: "A1",
    skill: "grammar",
    title: "mein, dein, kein",
    genre: "grammar",
    intro: "İyelik sözcükleri ile „kein“ aynı çekimi paylaşır; birini bilen ötekini de bilir.",
    focus: "Possessivartikel ve olumsuzlama: kein ya da nicht",
    gloss: [
      { de: "der Bruder", tr: "erkek kardeş", en: "brother" },
      { de: "die Schwester", tr: "kız kardeş", en: "sister" },
      { de: "das Fahrrad", tr: "bisiklet", en: "bicycle" },
      { de: "die Zeit", tr: "zaman", en: "time" },
      { de: "das Auto", tr: "araba", en: "car" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "İyelik sözcüğü ismin cinsine bakar",
        tr: "Türkçede iyelik ek olarak kelimenin sonuna gelir. Almancada ise ismin ÖNÜNE gelir ve o ismin cinsine göre biçim alır: eril ve nötr isimlerde ek yok, dişil ve çoğul isimlerde -e eklenir.",
        examples: [
          { de: "Das ist mein Bruder.", tr: "Bu benim erkek kardeşim.", note: "eril → mein" },
          { de: "Das ist meine Schwester.", tr: "Bu benim kız kardeşim.", note: "dişil → meine" },
          { de: "Wo sind deine Bücher?", tr: "Kitapların nerede?", note: "çoğul → deine" },
        ],
      },
      {
        heading: "kein aynı çekimi alır",
        tr: "„kein“ tam olarak „ein“ gibi çekilir ve isimleri olumsuzlar: bir isim „ein/eine“ ile ya da artikelsiz duruyorsa, olumsuzu „kein/keine“ olur. Çoğulda „ein“ yoktur ama „keine“ vardır.",
        examples: [
          { de: "Ich habe kein Auto.", tr: "Arabam yok.", note: "nötr → kein" },
          { de: "Wir haben keine Zeit.", tr: "Vaktimiz yok.", note: "dişil → keine" },
          { de: "Er hat keine Kinder.", tr: "Çocuğu yok.", note: "çoğul → keine" },
        ],
      },
      {
        heading: "kein mi, nicht mi?",
        tr: "İsmi olumsuzluyorsan „kein“, başka her şeyi olumsuzluyorsan „nicht“ kullanılır. Belirli artikelli („der/die/das“) ya da iyelikli bir isim de „nicht“ ister, çünkü orada isim zaten belirlidir.",
        examples: [
          { de: "Ich trinke keinen Kaffee.", tr: "Kahve içmem.", note: "belirsiz isim → kein" },
          { de: "Ich trinke den Kaffee nicht.", tr: "O kahveyi içmiyorum.", note: "belirli isim → nicht" },
          { de: "Heute arbeite ich nicht.", tr: "Bugün çalışmıyorum.", note: "fiil → nicht" },
        ],
      },
    ],
    questions: [
      {
        text: "Das ist ___ Schwester.",
        options: ["mein", "meine", "meinen"],
        answer: 1,
        explain: "„die Schwester“ dişildir; iyelik sözcüğü -e alır: meine.",
      },
      {
        text: "Ich habe ___ Auto.",
        options: ["keine", "kein", "nicht"],
        answer: 1,
        explain: "„das Auto“ nötrdür ve belirsizdir; olumsuzu kein'dir.",
      },
      {
        text: "Wo ist ___ Fahrrad?",
        options: ["deine", "deinen", "dein"],
        answer: 2,
        explain: "„das Fahrrad“ nötr: iyelik sözcüğü eksizdir.",
      },
      {
        kind: "gapfill",
        text: "Wir haben ___ Zeit. (kein)",
        options: [],
        answer: 0,
        accept: ["keine"],
        explain: "„die Zeit“ dişil olduğu için keine.",
      },
      {
        kind: "gapfill",
        text: "Das sind ___ Bücher. (mein)",
        options: [],
        answer: 0,
        accept: ["meine"],
        explain: "Çoğulda iyelik sözcüğü her zaman -e alır: meine.",
      },
      {
        kind: "gapfill",
        text: "Heute arbeite ich ___. (nicht / kein)",
        options: [],
        answer: 0,
        accept: ["nicht"],
        explain: "Olumsuzlanan bir isim değil fiil; o yüzden nicht.",
      },
      {
        kind: "gapfill",
        text: "Er hat ___ Bruder. (kein)",
        options: [],
        answer: 0,
        accept: ["keinen"],
        explain: "„der Bruder“ eril ve burada nesne: belirtme hâlinde keinen olur.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Ich", "trinke", "keinen", "Kaffee"],
        explain: "Fiil ikinci sırada, olumsuzlanan isim arkasından gelir: Ich trinke keinen Kaffee.",
      },
      {
        kind: "truefalse",
        text: "„Ich habe nicht Zeit.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Artikelsiz bir isim olumsuzlanıyor; doğrusu „Ich habe keine Zeit.“",
      },
      {
        kind: "truefalse",
        text: "„Ich kenne deine Schwester nicht.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "İyelikli isim belirlidir; olumsuzlama nicht ile ve cümle sonunda yapılır.",
      },
    ],
  },
];
