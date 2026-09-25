import type { SkillExercise } from "../../types";

/**
 * EN · A2 — Beceriler kütüphanesi, parti 7.
 *
 * Kurallar ve emsal: `en-a2.ts` (parti 1) ve `data/content/SPEC.md`.
 * Yalnız konuşma ve dil bilgisi hücreleri (gerekçe: parti 6 başlığı).
 */
export const enA2P7: SkillExercise[] = [
  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a2-lib-s7",
    course: "en",
    level: "A2",
    skill: "speaking",
    title: "thuh apple or thee apple?",
    genre: "pronounce",
    intro: "„the“ tek biçimde yazılır ama iki ayrı okunur; hangisinin geleceğini sonraki sesin türü belirler.",
    gloss: [
      { de: "answer", tr: "cevap" },
      { de: "end", tr: "son" },
      { de: "office", tr: "ofis" },
      { de: "hour", tr: "saat" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "The answer is at the end.",
        tr: "Cevap sonda.",
        hint: "„the answer“ ünlüyle başlıyor → Dİ; „the end“ de öyle → Dİ-END.",
        confusions: [
          { heard: [], fix: "Ünlüden önce „the“ uzun i ile okunur ve sonraki kelimeye bağlanır.", expected: "the answer" },
        ],
      },
      {
        de: "The book is on the table.",
        tr: "Kitap masanın üstünde.",
        hint: "„book“ ve „table“ sessizle başlıyor → Dı-BUK, Dı-TEY-bıl. Kısa ve zayıf.",
        confusions: [
          { heard: [], fix: "Sessizden önce „the“ zayıf bir ı taşır; uzun söylemek yapay duyulur.", expected: "the book" },
        ],
      },
      {
        de: "I'll be back in an hour.",
        tr: "Bir saat sonra dönerim.",
        hint: "Ölçüt harf değil SES: „hour“ h ile yazılır ama ünlüyle başlar, bu yüzden „an“ gelir.",
        confusions: [
          { heard: ["in a hour"], fix: "Yazıma değil söylenişe bak; sessiz h varsa kelime ünlüyle başlar.", expected: "an hour" },
        ],
      },
      {
        de: "She works in the office next to the university.",
        tr: "Üniversitenin yanındaki ofiste çalışıyor.",
        hint: "„the office“ → Dİ; ama „the university“ → Dı, çünkü YU sesiyle başlar, ünlüyle değil.",
        confusions: [
          { heard: [], fix: "„university“ yu- ile başlar; bu bir sessiz sayılır.", expected: "the university" },
        ],
      },
      {
        de: "The other one is better.",
        tr: "Öbürü daha iyi.",
        hint: "„other“ ünlüyle başlar → Dİ-A-dı. İki kelime tek parça gibi akar.",
        confusions: [
          { heard: [], fix: "Ünlüden önce uzun i gelir ve araya küçük bir y sesi girer.", expected: "the other" },
        ],
      },
      {
        de: "THE answer, not an answer.",
        tr: "Asıl cevap, herhangi bir cevap değil.",
        hint: "Vurgulamak istersen „the“ her zaman Dİİ okunur — sessizden önce bile.",
        confusions: [
          { heard: [], fix: "Vurgulu „the“ uzun i taşır; bu bilinçli bir seçimdir.", expected: "THE answer" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a2-lib-g7",
    course: "en",
    level: "A2",
    skill: "grammar",
    title: "should, must, have to",
    genre: "grammar",
    intro: "Üç sözcük de „gerekli“ der ama gerekliliğin kaynağı ve sertliği farklıdır.",
    focus: "Zorunluluk ve tavsiye: should, must, have to, mustn't",
    gloss: [
      { de: "to wear", tr: "giymek" },
      { de: "helmet", tr: "kask" },
      { de: "passport", tr: "pasaport" },
      { de: "visitor", tr: "ziyaretçi" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "should: tavsiye",
        tr: "„should“ bir tavsiyedir, zorunluluk değil: „You should see a doctor.“ Arkasından fiil YALIN gelir, „to“ almaz. Olumsuzu „shouldn't“tır ve „iyi bir fikir değil“ demektir.",
        examples: [
          { de: "You should see a doctor.", tr: "Bir doktora görünmelisin.", note: "tavsiye" },
          { de: "You shouldn't drive so fast.", tr: "Bu kadar hızlı sürmemelisin.", note: "kötü fikir" },
          { de: "Should I call her?", tr: "Onu arasam mı?", note: "soruda should başa geçer" },
        ],
      },
      {
        heading: "must ve have to: zorunluluk",
        tr: "İkisi de zorunluluk bildirir ama kaynağı farklıdır: „must“ genellikle konuşanın kendi kararı ya da bir kural metnidir, „have to“ ise dışarıdan gelen bir zorunluluktur. Ayrıca „must“ yalnız şimdiki zamanda kullanılır; geçmiş ve gelecek için „had to“, „will have to“ gelir.",
        examples: [
          { de: "You must wear a helmet.", tr: "Kask takmak zorundasın.", note: "kural" },
          { de: "I have to work on Saturday.", tr: "Cumartesi çalışmak zorundayım.", note: "dıştan gelen" },
          { de: "We had to wait two hours.", tr: "İki saat beklemek zorunda kaldık.", note: "geçmiş: had to" },
        ],
      },
      {
        heading: "mustn't ile don't have to aynı DEĞİL",
        tr: "Bu ikisi karşıt anlamlıdır ve karıştırmak tehlikelidir. „mustn't“ YASAK demektir: „You mustn't smoke here.“ „don't have to“ ise GEREK YOK demektir: „You don't have to come.“ Türkçede ikisi de „-mek zorunda değilsin“ diye çevrilebildiği için hata sıktır.",
        examples: [
          { de: "You mustn't smoke here.", tr: "Burada sigara içmek yasak.", note: "yasak" },
          { de: "You don't have to come.", tr: "Gelmen gerekmiyor.", note: "gerek yok" },
          { de: "Do I have to bring my passport?", tr: "Pasaportumu getirmem gerekiyor mu?", note: "soru: do + have to" },
        ],
      },
    ],
    questions: [
      {
        text: "You ___ see a doctor. (advice)",
        options: ["must", "should", "have to"],
        answer: 1,
        explain: "Tavsiye „should“ ile verilir.",
      },
      {
        text: "You ___ smoke here — it's forbidden.",
        options: ["don't have to", "mustn't", "shouldn't"],
        answer: 1,
        explain: "Yasak „mustn't“ ile bildirilir.",
      },
      {
        text: "„You don't have to come.“ means:",
        options: [
          "Coming is forbidden.",
          "Coming is not necessary.",
          "You should come.",
        ],
        answer: 1,
        explain: "„don't have to“ gereklilik yokluğunu bildirir.",
      },
      {
        kind: "gapfill",
        text: "We ___ wait two hours yesterday. (have to, geçmiş)",
        options: [],
        answer: 0,
        accept: ["had to"],
        explain: "„must“ geçmişte kullanılmaz; had to gelir.",
      },
      {
        kind: "gapfill",
        text: "___ I have to bring my passport?",
        options: [],
        answer: 0,
        accept: ["Do", "do"],
        explain: "„have to“ sorusu do ile kurulur.",
      },
      {
        kind: "gapfill",
        text: "You ___ drive so fast. (should + not)",
        options: [],
        answer: 0,
        accept: ["shouldn't", "should not"],
        explain: "Kötü fikir olduğunu söylemek için shouldn't kullanılır.",
      },
      {
        kind: "gapfill",
        text: "All visitors ___ wear a helmet. (a written rule)",
        options: [],
        answer: 0,
        accept: ["must"],
        explain: "Yazılı kurallarda must kullanılır.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["I", "have to", "work", "on Saturday"],
        explain: "Özne + have to + yalın fiil + zaman.",
      },
      {
        kind: "truefalse",
        text: "„You should to call her.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„should“ arkasından „to“ almaz: „You should call her.“",
      },
      {
        kind: "truefalse",
        text: "„You mustn't smoke here.“ ile „You don't have to smoke here.“ aynı anlama gelir.",
        options: ["True", "False"],
        answer: 1,
        explain: "Birincisi yasak, ikincisi gereklilik yokluğu bildirir.",
      },
    ],
  },
];
