import type { SkillExercise } from "../types";

/**
 * A1 · Ünite 4 — "Olumsuzluk, hayvanlar, fotoğraflar ve çoğul".
 *
 * Dört ders: Nein, kein Problem! · Hast du ein Haustier? · Wer ist das auf dem
 * Foto? · Ein Kind, zwei Kinder. İçerik ünite 1-4'ün kelimeleriyle sınırlı.
 *
 *   Ünite 4: das Problem, die Zeit, das Geld, die Ahnung, leider, nichts,
 *            niemand, die Entschuldigung · das Tier, der Hund, die Katze,
 *            der Fisch, süß, das Pferd, der Ball, lieben · das Foto, wer,
 *            die Oma, der Opa, die Großmutter, das Bild, der Großvater,
 *            der Verwandte · das Kind, das Buch, viele, ein paar, die Leute,
 *            das Auge, der Fuß, die Tür
 *   Kalıplar: Ich habe kein/keine … · Ich habe einen … · Wer ist das auf dem
 *            Foto? · Das ist unser/ihre … · Ich habe zwei/viele … · ein paar …
 *
 * Bu ünitenin dil bilgisi odağı İKİ tane: kein/keine olumsuzluğu ve çoğul.
 * Egzersizler ikisini de sınıyor — özellikle "einen Hund" (tekil, Akkusativ)
 * ile "zwei Hunde" (çoğul) karşıtlığı.
 */
export const a1U04: SkillExercise[] = [
  {
    id: "a1-u4-r1",
    level: "A1",
    skill: "reading",
    unit: 4,
    title: "Haustiere im Haus",
    genre: "Forum mesajı",
    intro: "Üç kişi evcil hayvanlarını anlatıyor. Kimde ne var, kimde yok?",
    gloss: [
      { de: "das Tier", tr: "hayvan", en: "animal" },
      { de: "süß", tr: "sevimli", en: "cute" },
      { de: "lieben", tr: "sevmek", en: "to love" },
      { de: "leider", tr: "maalesef", en: "unfortunately" },
    ],
    minutes: 3,
    text:
      "Mia: Ich habe einen Hund. Er heißt Bruno und ist zwei Jahre alt. Bruno ist sehr süß. Er liebt den Ball.\n\nTom: Ich habe keinen Hund und keine Katze. Ich habe zwei Fische. Fische machen nichts, aber ich liebe sie.\n\nElif: Ich habe leider kein Tier. Ich habe keine Zeit und kein Geld. Aber meine Oma hat ein Pferd! Das Pferd heißt Luna. Ich liebe Luna.",
    questions: [
      {
        text: "Wer hat einen Hund?",
        options: ["Mia", "Tom", "Elif"],
        answer: 0,
        explain: "„Ich habe einen Hund. Er heißt Bruno.“ — Mia.",
      },
      {
        text: "Wie viele Fische hat Tom?",
        options: ["zwei", "einen", "viele"],
        answer: 0,
        explain: "„Ich habe zwei Fische.“ — Çoğul: Fisch → Fische.",
      },
      {
        text: "Richtig oder falsch? Elif hat ein Tier.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Ich habe leider kein Tier.“ At büyükannesinin, kendisinin değil.",
      },
      {
        kind: "gapfill",
        text: "Das Pferd von Elifs Oma heißt ___.",
        options: [],
        answer: 0,
        accept: ["Luna"],
        explain: "„Das Pferd heißt Luna.“",
      },
      {
        text: "Warum hat Elif kein Tier?",
        options: ["Sie hat keine Zeit und kein Geld", "Sie liebt Tiere nicht", "Sie hat kein Foto"],
        answer: 0,
        explain: "„Ich habe keine Zeit und kein Geld.“ Hayvan sevmemekle ilgisi yok — Luna'yı seviyor.",
      },
    ],
  },
  {
    id: "a1-u4-r2",
    level: "A1",
    skill: "reading",
    unit: 4,
    title: "Wer ist das auf dem Foto?",
    genre: "Fotoğraf açıklaması",
    intro: "Bir aile fotoğrafının altındaki yazıyı okuyacaksın.",
    gloss: [
      { de: "das Bild", tr: "resim", en: "picture" },
      { de: "der Verwandte", tr: "akraba", en: "relative" },
      { de: "die Leute", tr: "insanlar", en: "people" },
      { de: "ein paar", tr: "birkaç", en: "a few" },
    ],
    minutes: 3,
    text:
      "Das ist ein Foto. Auf dem Bild sind viele Leute: meine Familie.\n\nDas ist meine Oma. Sie ist 80 Jahre alt. Das ist mein Opa. Er hat ein Buch.\n\nDa sind auch meine Eltern und ein paar Verwandte aus Polen. Und da sind zwei Kinder: mein Bruder und ich.\n\nDer Hund heißt Rex. Er liebt Kinder!",
    questions: [
      {
        text: "Wer ist 80 Jahre alt?",
        options: ["die Oma", "der Opa", "der Bruder"],
        answer: 0,
        explain: "„Das ist meine Oma. Sie ist 80 Jahre alt.“",
      },
      {
        text: "Was hat der Opa?",
        options: ["ein Buch", "einen Ball", "ein Foto"],
        answer: 0,
        explain: "„Er hat ein Buch.“",
      },
      {
        text: "Wie viele Kinder sind auf dem Foto?",
        options: ["zwei", "viele", "ein paar"],
        answer: 0,
        explain: "„Da sind zwei Kinder: mein Bruder und ich.“",
      },
      {
        kind: "gapfill",
        text: "Die Verwandten kommen aus ___.",
        options: [],
        answer: 0,
        accept: ["Polen"],
        explain: "„ein paar Verwandte aus Polen“.",
      },
    ],
  },
  {
    id: "a1-u4-l1",
    level: "A1",
    skill: "listening",
    unit: 4,
    title: "Ich habe keine Zeit",
    genre: "Diyalog",
    intro: "İki arkadaş konuşuyor. Kim ne yapamıyor ve neden?",
    gloss: [
      { de: "die Zeit", tr: "zaman", en: "time" },
      { de: "leider", tr: "maalesef", en: "unfortunately" },
      { de: "die Entschuldigung", tr: "özür", en: "apology" },
    ],
    minutes: 2,
    segments: [
      { text: "Hallo Nora! Hast du heute Zeit?" },
      { text: "Nein, leider habe ich keine Zeit." },
      { text: "Kein Problem! Und morgen?" },
      { text: "Morgen ja! Morgen habe ich viel Zeit." },
      { text: "Gut. Bis morgen!" },
    ],
    questions: [
      {
        text: "Hat Nora heute Zeit?",
        options: ["Nein", "Ja", "Nur ein bisschen"],
        answer: 0,
        explain: "„Nein, leider habe ich keine Zeit.“",
      },
      {
        text: "Wann hat Nora Zeit?",
        options: ["morgen", "heute", "nie"],
        answer: 0,
        explain: "„Morgen ja!“",
      },
      {
        kind: "gapfill",
        text: "„Leider habe ich ___ Zeit.“",
        options: [],
        answer: 0,
        accept: ["keine"],
        explain: "die Zeit dişil olduğu için „keine Zeit“ — „kein Zeit“ değil.",
      },
      {
        text: "Richtig oder falsch? Das ist ein Problem.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Kein Problem!“ diyor — sorun değil.",
      },
    ],
  },
  {
    id: "a1-u4-l2",
    level: "A1",
    skill: "listening",
    unit: 4,
    title: "Mein Hund Bruno",
    genre: "Tanıtım",
    intro: "Bir çocuk köpeğini anlatıyor. Adı, yaşı ve neyi sevdiği ne?",
    gloss: [
      { de: "der Ball", tr: "top", en: "ball" },
      { de: "süß", tr: "sevimli", en: "cute" },
      { de: "das Auge", tr: "göz", en: "eye" },
    ],
    minutes: 2,
    segments: [
      { text: "Das ist mein Hund. Er heißt Bruno." },
      { text: "Bruno ist drei Jahre alt." },
      { text: "Er hat zwei Augen und vier Füße." },
      { text: "Bruno liebt den Ball." },
      { text: "Eine Katze haben wir nicht." },
    ],
    questions: [
      {
        kind: "gapfill",
        text: "Der Hund heißt ___.",
        options: [],
        answer: 0,
        accept: ["Bruno"],
        explain: "„Er heißt Bruno.“",
      },
      {
        text: "Wie alt ist Bruno?",
        options: ["drei", "zwei", "zehn"],
        answer: 0,
        explain: "„Bruno ist drei Jahre alt.“",
      },
      {
        text: "Was liebt Bruno?",
        options: ["seinen Ball", "die Katze", "das Buch"],
        answer: 0,
        explain: "„Bruno liebt den Ball.“",
      },
      {
        text: "Richtig oder falsch? Die Familie hat auch eine Katze.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Eine Katze haben wir nicht.“",
      },
    ],
  },
  {
    id: "a1-u4-w1",
    level: "A1",
    skill: "writing",
    unit: 4,
    title: "kein oder keine?",
    genre: "Dil bilgisi",
    intro: "Olumsuzluk ve çoğul üzerine kısa alıştırmalar.",
    gloss: [
      { de: "kein", tr: "hiç (eril/nötr)", en: "no (m./n.)" },
      { de: "keine", tr: "hiç (dişil/çoğul)", en: "no (f./pl.)" },
      { de: "die Ahnung", tr: "fikir", en: "idea" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Hiç param yok.",
        answer: "Ich habe kein Geld",
        hint: "das Geld nötr → „kein Geld“. Dişilde ve çoğulda „keine“ olur: keine Zeit, keine Kinder.",
      },
      {
        kind: "build",
        tr: "İki kedim var.",
        answer: "Ich habe zwei Katzen",
        hint: "Sayıdan sonra ad ÇOĞUL olur: die Katze → zwei Katzen.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi olumsuz yap.",
        source: "Ich habe eine Katze.",
        answer: "Ich habe keine Katze.",
        alternatives: ["Ich habe keine Katze"],
        why: "„eine“ olumsuzda „keine“ olur. Eril/nötrde „ein“ → „kein“.",
      },
    ],
  },
  {
    id: "a1-u4-w2",
    level: "A1",
    skill: "writing",
    unit: 4,
    title: "Ein Foto beschreiben",
    genre: "Forum mesajı",
    intro: "Bir aile fotoğrafını anlat: kimler var, kaç kişi?",
    gloss: [
      { de: "das Foto", tr: "fotoğraf", en: "photo" },
      { de: "viele", tr: "birçok", en: "many" },
      { de: "der Verwandte", tr: "akraba", en: "relative" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Fotoğrafta birçok insan var.",
        answer: "Auf dem Foto sind viele Leute",
        hint: "„Leute“ her zaman çoğuldur, tekili yoktur; fiil de çoğul olur: sind.",
      },
      {
        kind: "free",
        prompt:
          "Bir aile fotoğrafını anlat (4-5 cümle). Kimlerin olduğunu, kaç kişi olduklarını ve birinin yaşını yaz.",
        minWords: 30,
        checklist: [
          "Fotoğrafta kimler var, yazdın mı? (Das ist meine … / Auf dem Foto sind …)",
          "Bir sayı ya da çoğul kullandın mı? (zwei Kinder, viele Leute, ein paar …)",
          "Birinin yaşını verdin mi? (Sie ist … Jahre alt.)",
          "Bir kişiyi ya da hayvanı tarif ettin mi? (Er ist süß. / Sie hat zwei Augen.)",
        ],
        phrases: [
          { de: "Auf dem Foto sind …", tr: "Fotoğrafta … var", en: "In the photo there are …" },
          { de: "Das ist meine Oma.", tr: "Bu benim büyükannem.", en: "This is my grandma." },
          { de: "ein paar Verwandte", tr: "birkaç akraba", en: "a few relatives" },
        ],
        sample:
          "Das ist ein Foto von meiner Familie.\n\nAuf dem Foto sind viele Leute. Das ist meine Oma. Sie ist 70 Jahre alt. Das ist mein Opa.\n\nDa sind auch meine Eltern und ein paar Verwandte. Und da sind zwei Kinder: meine Schwester und ich.\n\nWir haben auch einen Hund. Er heißt Rex und ist sehr süß.",
      },
    ],
  },
];
