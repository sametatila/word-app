import type { SkillExercise } from "../../types";

/**
 * EN · A1 — Beceriler kütüphanesi, parti 8.
 *
 * Kurallar ve emsal: `en-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 * Yalnız konuşma ve dil bilgisi hücreleri (gerekçe: parti 6 başlığı).
 */
export const enA1P8: SkillExercise[] = [
  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a1-lib-s8",
    course: "en",
    level: "A1",
    skill: "speaking",
    title: "full or fool?",
    genre: "pronounce",
    intro: "Türkçede u tektir, İngilizcede iki ayrı u vardır; kısa olanla uzun olanı karıştırmak kelimeyi değiştirir.",
    gloss: [
      { de: "full", tr: "dolu" },
      { de: "food", tr: "yemek" },
      { de: "to pull", tr: "çekmek" },
      { de: "pool", tr: "havuz" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "The bus is full.",
        tr: "Otobüs dolu.",
        hint: "„full“ kısa ve gevşek bir u taşır: FUL. Dudaklar fazla yuvarlanmaz.",
        confusions: [
          { heard: ["The bus is fool"], fix: "Uzatırsan „fool“ (aptal) olur; sesi kısa tut.", expected: "full" },
        ],
      },
      {
        de: "The food is on the table.",
        tr: "Yemek masanın üstünde.",
        hint: "„food“ uzun ve gergin: FUUD. Dudaklar iyice yuvarlanır ve ses sürer.",
        confusions: [
          { heard: ["The fud is on the table"], fix: "Kısa söylersen kelime tanınmaz; uzunluk anlamın kendisidir.", expected: "food" },
        ],
      },
      {
        de: "Please pull the door.",
        tr: "Lütfen kapıyı çek.",
        hint: "„pull“ kısa (PUL), „pool“ uzun (PUUL). Aynı harfler, iki ayrı kelime.",
        confusions: [
          { heard: ["Please pool the door"], fix: "Kapı çekilir, havuz çekilmez; ünlüyü kısa tut.", expected: "pull" },
        ],
      },
      {
        de: "We live near a pool.",
        tr: "Bir havuzun yakınında oturuyoruz.",
        hint: "Burada uzun ses gerekiyor: PUUL. Kısa söylersen „pull“ duyulur.",
        confusions: [
          { heard: ["We live near a pull"], fix: "İki l aynı; fark yalnız ünlünün uzunluğunda.", expected: "pool" },
        ],
      },
      {
        de: "This book looks good.",
        tr: "Bu kitap iyi görünüyor.",
        hint: "Üçü de KISA: BUK, LUKS, GUD. Yazımda iki o var ama ses kısa kalır.",
        confusions: [
          { heard: ["This buuk luuks guud"], fix: "Çift o her zaman uzun demek değil; bu üç kelimede kısadır.", expected: "book" },
        ],
      },
      {
        de: "Choose a room with a view.",
        tr: "Manzaralı bir oda seç.",
        hint: "Üçü de UZUN: ÇUUZ, RUUM, VYUU. Ses dudakları yuvarlayıp sürer.",
        confusions: [
          { heard: ["Chose a rum with a vyu"], fix: "Uzunluğu kesme; kısa söylersen başka kelimeler çıkar.", expected: "room" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a1-lib-g8",
    course: "en",
    level: "A1",
    skill: "grammar",
    title: "what, where, how much",
    genre: "grammar",
    intro: "Soru sözcüğüyle kurulan sorularda kelime sırası sabittir; bu sıra öğrenilince bütün sorular açılır.",
    focus: "Soru sözcükleri ve soru cümlesinin sırası",
    gloss: [
      { de: "to cost", tr: "tutmak" },
      { de: "address", tr: "adres" },
      { de: "to start", tr: "başlamak" },
      { de: "ticket", tr: "bilet" },
    ],
    minutes: 6,
    explanation: [
      {
        heading: "Soru sözcüğü + yardımcı + özne + fiil",
        tr: "Sıra her zaman aynıdır: soru sözcüğü başta, sonra yardımcı fiil (do/does/did/is/are), sonra özne, en sonda asıl fiil. „Where do you live?“ — „Where you live?“ yanlıştır, çünkü yardımcı fiil eksiktir.",
        examples: [
          { de: "Where do you live?", tr: "Nerede oturuyorsun?", note: "do + özne + fiil" },
          { de: "What does she want?", tr: "Ne istiyor?", note: "does + özne + yalın fiil" },
          { de: "When does the film start?", tr: "Film ne zaman başlıyor?", note: "üçüncü tekil: does" },
        ],
      },
      {
        heading: "„be“ fiilinde yardımcı yok",
        tr: "Fiil „to be“ ise ayrı bir yardımcıya gerek kalmaz; fiilin kendisi öne geçer: „Where is the station?“, „How old are you?“ Burada „do“ kullanmak („Where does the station is?“) en sık yapılan hatalardan biridir.",
        examples: [
          { de: "Where is the station?", tr: "İstasyon nerede?", note: "be → kendisi öne geçer" },
          { de: "How old are you?", tr: "Kaç yaşındasın?", note: "are + özne" },
          { de: "What's your address?", tr: "Adresin ne?", note: "what is → what's" },
        ],
      },
      {
        heading: "how much, how many, whose",
        tr: "„how“ birçok soruyu kurar: „how much“ sayılamayanlar ve fiyat için, „how many“ sayılabilenler için, „how long“ süre için, „how often“ sıklık için. „whose“ ise sahibi sorar ve arkasından isim gelir: „Whose ticket is this?“",
        examples: [
          { de: "How much does it cost?", tr: "Ne kadar tutuyor?", note: "fiyat → how much" },
          { de: "How many tickets do you need?", tr: "Kaç bilet lazım?", note: "sayılabilen → how many" },
          { de: "Whose ticket is this?", tr: "Bu kimin bileti?", note: "whose + isim" },
        ],
      },
    ],
    questions: [
      {
        text: "___ do you live?",
        options: ["Where", "Where is", "Where does"],
        answer: 0,
        explain: "Soru sözcüğü + do + özne + fiil sırası geçerlidir.",
      },
      {
        text: "___ is the station?",
        options: ["Where does", "Where do", "Where"],
        answer: 2,
        explain: "Fiil „to be“ olduğu için ayrı bir yardımcı gelmez.",
      },
      {
        text: "___ tickets do you need?",
        options: ["How much", "How many", "How long"],
        answer: 1,
        explain: "„ticket“ sayılabilir bir isimdir: how many.",
      },
      {
        kind: "gapfill",
        text: "What ___ she want? (does / do)",
        options: [],
        answer: 0,
        accept: ["does"],
        explain: "Üçüncü tekil kişide yardımcı fiil does olur.",
      },
      {
        kind: "gapfill",
        text: "How ___ does it cost?",
        options: [],
        answer: 0,
        accept: ["much"],
        explain: "Fiyat sorulurken how much kullanılır.",
      },
      {
        kind: "gapfill",
        text: "___ old are you?",
        options: [],
        answer: 0,
        accept: ["How", "how"],
        explain: "Yaş „How old …?“ ile sorulur ve „be“ fiili öne geçer.",
      },
      {
        kind: "gapfill",
        text: "___ ticket is this? (sahibi soruluyor)",
        options: [],
        answer: 0,
        accept: ["Whose", "whose"],
        explain: "Sahibi soran sözcük whose'dur ve arkasından isim gelir.",
      },
      {
        kind: "order",
        text: "Soruyu doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["When", "does", "the film", "start"],
        explain: "Soru sözcüğü + yardımcı + özne + yalın fiil.",
      },
      {
        kind: "truefalse",
        text: "„Where you live?“ — Bu soru doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "Yardımcı fiil eksik: „Where do you live?“",
      },
      {
        kind: "truefalse",
        text: "„What's your address?“ — Bu soru doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "„what is“ kısalmış hâliyle doğru bir sorudur.",
      },
    ],
  },
];
