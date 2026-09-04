import type { SkillExercise } from "../types";

/**
 * A2 · Ünite 9 — "Nerede, nereye, mahalle".
 *
 * Dört ders: Wo liegt der Schlüssel? · Wohin stelle ich das? ·
 * Wir richten das Zimmer ein · In meiner Nachbarschaft. İçerik ünite 1-9'un
 * kelimeleriyle sınırlı.
 *
 *   Ünite 9: die Schublade, der Nachttisch, das Bücherregal, hinter, neben,
 *            irgendwo, vorne, drinnen · hängen, aufhängen, hinstellen,
 *            anbringen, befestigen, stapeln, hin, her · renovieren,
 *            streichen, die Tapete, der Fußboden, die Matratze,
 *            der Schreibtisch, dunkel, zwischen · das Zentrum, nebenan,
 *            der Bürgersteig, die Abkürzung, außerhalb, die Bushaltestelle,
 *            drüben, parken
 *   Kalıplar: Der Schlüssel liegt in der Schublade. · Das Buch steht im
 *             Regal. · Ich hänge das Bild an die Wand. · Stell die Blumen
 *             bitte dort hin. · Da drüben ist die Haltestelle.
 *
 * Ünitenin tamamı tek bir ayrım üzerine kurulu: aynı edat NEREDE sorusunda
 * yönelme, NEREYE sorusunda belirtme hâli getirir. Türkçede böyle bir seçim
 * yok — "masada" ile "masaya" ekten anlaşılır, edat değişmez. Bu yüzden ayrım
 * okuma, dinleme ve yazmada ayrı ayrı ölçülüyor; ayrıca duran/yatan nesne için
 * ayrı fiiller (stehen/liegen ↔ stellen/hängen) çalıştırılıyor.
 */
export const a2U09: SkillExercise[] = [
  {
    id: "a2-u09-r1",
    level: "A2",
    skill: "reading",
    unit: 9,
    title: "Wo ist der Schlüssel?",
    genre: "Mesaj",
    intro: "Evden çıkmış birine yazılmış mesaj: eşyalar tam olarak nerede?",
    gloss: [
      { de: "die Schublade", tr: "çekmece", en: "drawer" },
      { de: "der Nachttisch", tr: "komodin", en: "bedside table" },
      { de: "das Bücherregal", tr: "kitaplık", en: "bookshelf" },
      { de: "hinter", tr: "arkasında", en: "behind" },
      { de: "neben", tr: "yanında", en: "next to" },
      { de: "vorne", tr: "önde", en: "at the front" },
      { de: "drinnen", tr: "içeride", en: "inside" },
      { de: "irgendwo", tr: "bir yerde", en: "somewhere" },
    ],
    minutes: 4,
    text:
      "Hallo Mama,\n\n" +
      "ich bin schon unterwegs, deshalb schreibe ich schnell.\n\n" +
      "Der Ersatzschlüssel liegt in der kleinen Schublade im Flur, ganz vorne. Wenn er da nicht ist, schau bitte auf dem Nachttisch neben meinem Bett.\n\n" +
      "Die Papiere für den Arzt stehen im Bücherregal im Wohnzimmer, im zweiten Fach. Der Ordner ist grün. Hinter dem Ordner liegt noch ein alter Umschlag — den brauchst du nicht.\n\n" +
      "Meine Brille ist irgendwo in der Küche, ich weiß es leider nicht genau. Aber sie ist drinnen, nicht auf dem Balkon.\n\n" +
      "Danke dir! Bis heute Abend.\nLina",
    questions: [
      {
        text: "Wo liegt der Ersatzschlüssel?",
        options: ["Auf dem Nachttisch", "In der Schublade im Flur", "Im Bücherregal"],
        answer: 1,
        explain: "„Der Ersatzschlüssel liegt in der kleinen Schublade im Flur, ganz vorne.“ Komodin ikinci ihtimal.",
      },
      {
        kind: "gapfill",
        text: "Die Papiere ___ im Bücherregal im Wohnzimmer.",
        options: [],
        answer: 0,
        accept: ["stehen"],
        explain: "Dik duran şeyler için „stehen“, yatanlar için „liegen“ kullanılır. Klasör rafta dik duruyor.",
      },
      {
        text: "Was liegt hinter dem Ordner?",
        options: ["Die Brille", "Ein alter Umschlag", "Der Schlüssel"],
        answer: 1,
        explain: "„Hinter dem Ordner liegt noch ein alter Umschlag — den brauchst du nicht.“",
      },
      {
        kind: "short_answer",
        text: "Wo ist die Brille ungefähr?",
        options: [],
        answer: 0,
        accept: ["irgendwo in der Küche", "in der Küche", "Küche"],
        explain: "„Meine Brille ist irgendwo in der Küche.“ Balkonda değil, içeride.",
      },
      {
        text: "Die Brille ist auf dem Balkon.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Aber sie ist drinnen, nicht auf dem Balkon.“",
      },
    ],
  },
  {
    id: "a2-u09-r2",
    level: "A2",
    skill: "reading",
    unit: 9,
    title: "Unsere Nachbarschaft",
    genre: "Blog yazısı",
    intro: "Mahalle tanıtımı: ne nerede, en yakın durak hangisi?",
    gloss: [
      { de: "das Zentrum", tr: "merkez", en: "town centre" },
      { de: "nebenan", tr: "yan tarafta", en: "next door" },
      { de: "der Bürgersteig", tr: "kaldırım", en: "pavement" },
      { de: "die Bushaltestelle", tr: "otobüs durağı", en: "bus stop" },
      { de: "drüben", tr: "karşıda", en: "over there" },
      { de: "die Abkürzung", tr: "kestirme yol", en: "shortcut" },
      { de: "außerhalb", tr: "dışında", en: "outside" },
      { de: "parken", tr: "park etmek", en: "to park" },
    ],
    minutes: 4,
    text:
      "Wir wohnen seit zwei Jahren hier, etwas außerhalb vom Zentrum. Am Anfang fand ich das schade, heute bin ich froh darüber.\n\n" +
      "Alles Wichtige ist zu Fuß erreichbar. Der Bäcker ist direkt nebenan, und drüben auf der anderen Straßenseite gibt es einen kleinen Supermarkt. Die Bushaltestelle liegt fünf Minuten weiter; von dort fährt man in zwölf Minuten ins Zentrum.\n\n" +
      "Es gibt sogar eine Abkürzung durch den Park. Abends nehme ich sie nicht, weil dort keine Lampen stehen.\n\n" +
      "Ein Vorteil hier draußen: man kann fast immer vor dem Haus parken. Im Zentrum sucht man dafür eine halbe Stunde. Nur der Bürgersteig ist an einer Stelle sehr eng — mit Kinderwagen wird es dort schwierig.",
    questions: [
      {
        text: "Wo liegt die Wohnung?",
        options: ["Im Zentrum", "Etwas außerhalb", "Direkt am Park"],
        answer: 1,
        explain: "„Wir wohnen seit zwei Jahren hier, etwas außerhalb vom Zentrum.“",
      },
      {
        kind: "gapfill",
        text: "Der Bäcker ist direkt ___.",
        options: [],
        answer: 0,
        accept: ["nebenan"],
        explain: "„nebenan“ bir zarf: kendinden sonra isim almaz ve cümlenin sonunda durur.",
      },
      {
        text: "Warum nimmt sie abends die Abkürzung nicht?",
        options: ["Sie ist zu lang.", "Dort stehen keine Lampen.", "Der Park ist geschlossen."],
        answer: 1,
        explain: "„weil dort keine Lampen stehen“.",
      },
      {
        kind: "short_answer",
        text: "Wie lange fährt der Bus ins Zentrum?",
        options: [],
        answer: 0,
        accept: ["zwölf Minuten", "12 Minuten", "in zwölf Minuten"],
        explain: "„von dort fährt man in zwölf Minuten ins Zentrum“. Beş dakika, durağa yürüme süresi.",
      },
      {
        text: "Im Zentrum findet man leichter einen Parkplatz.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: dışarıda hemen park edilebiliyor, „Im Zentrum sucht man dafür eine halbe Stunde“.",
      },
    ],
  },
  {
    id: "a2-u09-l1",
    level: "A2",
    skill: "listening",
    unit: 9,
    title: "Wohin stellen wir das?",
    genre: "Diyalog",
    intro: "Oda düzenleniyor. Ne nereye gidiyor, hangi karar değişiyor?",
    gloss: [
      { de: "hinstellen", tr: "oraya koymak", en: "to put there" },
      { de: "aufhängen", tr: "asmak", en: "to hang up" },
      { de: "der Schreibtisch", tr: "çalışma masası", en: "desk" },
      { de: "die Matratze", tr: "şilte", en: "mattress" },
      { de: "stapeln", tr: "istiflemek", en: "to stack" },
      { de: "dunkel", tr: "karanlık", en: "dark" },
      { de: "zwischen", tr: "arasında", en: "between" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Bilal", text: "Ich habe hier den Schreibtisch. Wohin stelle ich den?" },
      { speaker: "Hanna", text: "Ans Fenster, bitte. Sonst ist es beim Arbeiten zu dunkel." },
      { speaker: "Bilal", text: "Okay. Und die Matratze?" },
      { speaker: "Hanna", text: "Leg sie erst mal in die Ecke. Das Bett bauen wir morgen auf." },
      { speaker: "Bilal", text: "Und die Bilder? Hängen wir die heute noch auf?" },
      { speaker: "Hanna", text: "Nein, morgen. Stell sie bitte hinter die Tür, dann stehen sie niemandem im Weg." },
      { speaker: "Bilal", text: "Gut. Die Kisten stapele ich zwischen dem Schrank und der Wand." },
      { speaker: "Hanna", text: "Perfekt. Dann ist der Rest vom Zimmer frei." },
    ],
    questions: [
      {
        text: "Wohin kommt der Schreibtisch?",
        options: ["Ans Fenster", "In die Ecke", "Hinter die Tür"],
        answer: 0,
        explain: "„Ans Fenster, bitte. Sonst ist es beim Arbeiten zu dunkel.“",
      },
      {
        kind: "gapfill",
        text: "Stell sie bitte hinter ___ Tür.",
        options: [],
        answer: 0,
        accept: ["die"],
        explain: "Hareket var (NEREYE), o yüzden edat belirtme hâlini getirir: hinter die Tür.",
      },
      {
        text: "Wann bauen sie das Bett auf?",
        options: ["Heute", "Morgen", "Nächste Woche"],
        answer: 1,
        explain: "„Das Bett bauen wir morgen auf.“ Tablolar da yarına kalıyor.",
      },
      {
        kind: "dictation",
        text: "Bilal'in kutuları nereye istifleyeceğini söylediği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Die Kisten stapele ich zwischen dem Schrank und der Wand."],
        explain: "Bu edat iki ismi birden alır ve NEREDE sorusuna cevap verdiği için ikisi de yönelme hâlinde.",
      },
    ],
  },
  {
    id: "a2-u09-l2",
    level: "A2",
    skill: "listening",
    unit: 9,
    title: "Wie komme ich zur Haltestelle?",
    genre: "Diyalog",
    intro: "Yeni taşınan biri yol soruyor. Hangi yol daha kısa?",
    gloss: [
      { de: "die Bushaltestelle", tr: "otobüs durağı", en: "bus stop" },
      { de: "die Abkürzung", tr: "kestirme yol", en: "shortcut" },
      { de: "der Bürgersteig", tr: "kaldırım", en: "pavement" },
      { de: "drüben", tr: "karşıda", en: "over there" },
      { de: "das Zentrum", tr: "merkez", en: "town centre" },
      { de: "parken", tr: "park etmek", en: "to park" },
      { de: "nebenan", tr: "yan tarafta", en: "next door" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Neuer Nachbar", text: "Entschuldigung, wie komme ich am schnellsten zur Bushaltestelle?" },
      { speaker: "Frau Ritter", text: "Gehen Sie die Straße runter bis zur Kreuzung. Da drüben sehen Sie schon das gelbe Schild." },
      { speaker: "Neuer Nachbar", text: "Und wie lange dauert das ungefähr?" },
      { speaker: "Frau Ritter", text: "Fünf Minuten. Es gibt auch eine Abkürzung durch den Park, dann sind es nur drei." },
      { speaker: "Neuer Nachbar", text: "Nehmen Sie die immer?" },
      { speaker: "Frau Ritter", text: "Tagsüber ja. Abends nicht, weil dort keine Lampen sind. Und der Bürgersteig ist an der Stelle sehr eng." },
      { speaker: "Neuer Nachbar", text: "Verstehe. Und kann ich hier vor dem Haus parken?" },
      { speaker: "Frau Ritter", text: "Meistens ja. Nur dienstags nicht, da kommt die Straßenreinigung." },
    ],
    questions: [
      {
        text: "Wo ist die Bushaltestelle?",
        options: ["An der Kreuzung", "Im Park", "Vor dem Haus"],
        answer: 0,
        explain: "„Gehen Sie die Straße runter bis zur Kreuzung. Da drüben sehen Sie schon das gelbe Schild.“",
      },
      {
        kind: "gapfill",
        text: "Es gibt auch eine ___ durch den Park.",
        options: [],
        answer: 0,
        accept: ["Abkürzung"],
        explain: "Parktan geçen kestirme yol üç dakika sürüyor, normal yol beş.",
      },
      {
        text: "Warum nimmt Frau Ritter die Abkürzung abends nicht?",
        options: ["Sie ist länger.", "Dort sind keine Lampen.", "Der Park ist zu."],
        answer: 1,
        explain: "„Abends nicht, weil dort keine Lampen sind.“",
      },
      {
        kind: "short_answer",
        text: "Wann darf man nicht vor dem Haus parken?",
        options: [],
        answer: 0,
        accept: ["dienstags", "am Dienstag"],
        explain: "„Nur dienstags nicht, da kommt die Straßenreinigung.“",
      },
    ],
  },
  {
    id: "a2-u09-w1",
    level: "A2",
    skill: "writing",
    unit: 9,
    title: "Wo oder wohin?",
    genre: "Dil bilgisi",
    intro: "Aynı edat, iki hâl. Soru NEREDE ise yönelme, NEREYE ise belirtme.",
    gloss: [
      { de: "das Bücherregal", tr: "kitaplık", en: "bookshelf" },
      { de: "aufhängen", tr: "asmak", en: "to hang up" },
      { de: "die Schublade", tr: "çekmece", en: "drawer" },
      { de: "hinstellen", tr: "oraya koymak", en: "to put there" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Anahtar çekmecede duruyor.",
        answer: "Der Schlüssel liegt in der Schublade",
        hint: "Soru NEREDE → yönelme hâli (in der). Yatan bir nesne için „liegen“ kullanılır.",
      },
      {
        kind: "build",
        tr: "Tabloyu duvara asıyorum.",
        answer: "Ich hänge das Bild an die Wand",
        hint: "Hareket var, soru NEREYE → belirtme hâli (an die). Aynı edat, başka hâl.",
      },
      {
        kind: "build",
        tr: "Çiçekleri lütfen oraya koy.",
        answer: "Stell die Blumen bitte dort hin",
        hint: "Emirde fiil başa geçer; ayrılabilen ön ek cümlenin sonuna düşer ve yönü gösterir.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: burada hareket var.",
        source: "Ich hänge das Bild an der Wand.",
        answer: "Ich hänge das Bild an die Wand.",
        alternatives: ["Ich hänge das Bild an die Wand"],
        why: "Yazıldığı gibi „duvarda asılıyken asıyorum“ demek olur. Tablo duvara doğru gittiği için edat belirtme hâlini getirir.",
      },
    ],
  },
  {
    id: "a2-u09-w2",
    level: "A2",
    skill: "writing",
    unit: 9,
    title: "Deine Nachbarschaft beschreiben",
    genre: "Forum mesajı",
    intro: "Yeni taşınan birine mahalleni anlat: ne nerede, en yakın durak, bir tavsiye.",
    gloss: [
      { de: "das Zentrum", tr: "merkez", en: "town centre" },
      { de: "die Bushaltestelle", tr: "otobüs durağı", en: "bus stop" },
      { de: "nebenan", tr: "yan tarafta", en: "next door" },
      { de: "drüben", tr: "karşıda", en: "over there" },
      { de: "die Abkürzung", tr: "kestirme yol", en: "shortcut" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "reply",
        prompt: "Foruma cevap yaz. Mahalleni anlat: ne nerede, en yakın durak ne kadar uzakta, alışverişi nerede yapıyorsun. Bir de tavsiye ver.",
        stimulus:
          "FORUM · Neu in der Stadt\n\nHallo! Ich ziehe nächsten Monat um und kenne die Gegend noch gar nicht.\n\nWie ist es bei euch in der Nachbarschaft? Ist alles zu Fuß erreichbar, oder braucht man ein Auto?",
        checklist: [
          "En az üç yeri tarif ettin mi (nebenan, drüben, in der Nähe)?",
          "En yakın durağın ne kadar uzakta olduğunu yazdın mı?",
          "„Nerede“ sorusunda yönelme hâlini doğru kullandın mı?",
          "Bir tavsiye ya da uyarı verdin mi?",
        ],
        minWords: 45,
        phrases: [
          { de: "Der Bäcker ist direkt nebenan.", tr: "fırın hemen yan tarafta", en: "the baker is right next door" },
          { de: "Da drüben gibt es einen Supermarkt.", tr: "karşıda bir süpermarket var", en: "there is a supermarket over there" },
          { de: "Die Bushaltestelle liegt fünf Minuten weiter.", tr: "otobüs durağı beş dakika ileride", en: "the bus stop is five minutes further on" },
        ],
        sample:
          "Hallo,\n\nbei uns ist fast alles zu Fuß erreichbar, obwohl wir etwas außerhalb vom Zentrum wohnen.\n\nDer Bäcker ist direkt nebenan, und da drüben auf der anderen Straßenseite gibt es einen kleinen Supermarkt. Die Bushaltestelle liegt fünf Minuten weiter; von dort fährt der Bus in zwölf Minuten ins Zentrum.\n\nEs gibt auch eine Abkürzung durch den Park. Mein Tipp: Nimm sie tagsüber, abends ist es dort sehr dunkel.\n\nEin Auto brauchst du nicht wirklich. Aber wenn du eins hast, kannst du hier fast immer vor dem Haus parken.\n\nViel Glück beim Umzug!\nMarco",
      },
    ],
  },
];
