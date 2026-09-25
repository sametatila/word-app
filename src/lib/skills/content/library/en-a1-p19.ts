import type { SkillExercise } from "../../types";

/**
 * EN · A1 — Beceriler kütüphanesi, parti 19.
 *
 * Hücreleri YİRMİYE tamamlayan partilerden biri. Kurallar ve emsal:
 * `en-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Bu parti yalnız KONUŞMA ve DİL BİLGİSİ taşır. Parti 19 düzen hattı:
 * söyleyiş odağı kısa açık /æ/ ile uzun /ɑː/ ayrımı (hat/heart; bad/bed
 * ayrımı parti 4'te); dil bilgisi cümlede kelime sırası: özne + fiil +
 * nesne, sonra yer ve zaman (sıklık zarfı parti 7'de, soru sırası parti
 * 8'de).
 */
export const enA1P19: SkillExercise[] = [
  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a1-lib-s19",
    course: "en",
    level: "A1",
    skill: "speaking",
    title: "hat or heart?",
    genre: "pronounce",
    intro: "İngilizcede iki ayrı a var: kısa ve açık olan (hat) ile uzun ve geride olan (heart). Türkçedeki tek a ikisinin arasında kalır.",
    gloss: [
      { de: "hat", tr: "şapka" },
      { de: "heart", tr: "kalp" },
      { de: "to park", tr: "park etmek" },
      { de: "match", tr: "maç" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Where's my hat?",
        tr: "Şapkam nerede?",
        hint: "„hat“ kısa ve açık: ağız geniş, dil önde; e'ye yakın bir a.",
        confusions: [
          { heard: ["heart", "hut"], fix: "Uzatırsan „heart“, ağzı kapatırsan „hut“ olur; kısa ve geniş bir a.", expected: "hat" },
        ],
      },
      {
        de: "Her heart is strong.",
        tr: "Kalbi güçlü.",
        hint: "„heart“ = HAAT: uzun ve boğazın gerisinden gelen bir a; r söylenmez.",
        confusions: [
          { heard: ["hat"], fix: "Kısa söylersen „hat“ (şapka) duyulur; ünlüyü uzat ve geride tut.", expected: "heart" },
        ],
      },
      {
        de: "We park the car here.",
        tr: "Arabayı buraya park ederiz.",
        hint: "„park“ ve „car“ uzun a taşır: PAAK, KAA.",
        confusions: [
          { heard: ["pack"], fix: "Kısa ve açık a ile „pack“ (paketlemek) olur; sesi uzat.", expected: "park" },
        ],
      },
      {
        de: "Is that your cat?",
        tr: "Şu senin kedin mi?",
        hint: "„that“ ve „cat“ kısa ve açık a taşır: ağız genişçe açık, ses kısa.",
        confusions: [
          { heard: ["cut", "cart"], fix: "Ağzı kapatırsan „cut“, uzatırsan „cart“ duyulur.", expected: "cat" },
        ],
      },
      {
        de: "The match is in March.",
        tr: "Maç martta.",
        hint: "„match“ kısa ve açık (MEÇ'e yakın), „March“ uzun ve geride (MAAÇ).",
        confusions: [
          { heard: ["The March is in March", "The match is in match"], fix: "İki kelimeyi aynı söyleme; ilki kısa ve açık, ikincisi uzun.", expected: "match" },
        ],
      },
      {
        de: "This is a hard hat.",
        tr: "Bu bir baret.",
        hint: "„hard“ uzun (HAAD), „hat“ kısa ve açık; aynı harf, iki ayrı ses.",
        confusions: [
          { heard: ["hat hat", "hard heart"], fix: "İki a'yı ayır: ilki uzun ve geride, ikincisi kısa ve önde.", expected: "hard hat" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a1-lib-g19",
    course: "en",
    level: "A1",
    skill: "grammar",
    title: "I go to school at eight",
    genre: "grammar",
    intro: "Türkçede fiil sonda durur; İngilizcede özneden hemen sonra gelir. Yer ve zaman da sabit bir sırayla cümlenin sonuna eklenir.",
    focus: "Cümlede kelime sırası: özne + fiil + nesne, sonra yer ve zaman",
    gloss: [
      { de: "newspaper", tr: "gazete" },
      { de: "soccer", tr: "futbol" },
      { de: "lunch", tr: "öğle yemeği" },
      { de: "arrive", tr: "varmak" },
    ],
    minutes: 6,
    explanation: [
      {
        heading: "Fiil özneden hemen sonra",
        tr: "Türkçede „Ben çay içerim“ derken fiil en sondadır. İngilizcede sıra özne + fiil + nesnedir: I drink tea. Fiili sona atmak („I tea drink“) cümleyi anlaşılmaz yapar.",
        examples: [
          { de: "I drink tea.", tr: "Çay içerim.", note: "özne + fiil + nesne" },
          { de: "My brother reads the newspaper.", tr: "Erkek kardeşim gazeteyi okur." },
          { de: "They play soccer.", tr: "Futbol oynarlar." },
        ],
      },
      {
        heading: "Önce yer, sonra zaman",
        tr: "Cümlenin sonunda hem yer hem zaman varsa önce yer, sonra zaman söylenir: I go to school at eight. Türkçede sıra çoğu zaman terstir: sekizde okula giderim.",
        examples: [
          { de: "I go to school at eight.", tr: "Sekizde okula giderim.", note: "yer + zaman" },
          { de: "We have lunch at home on Sundays.", tr: "Pazar günleri evde öğle yemeği yeriz.", note: "yer + zaman" },
          { de: "He arrives in London tomorrow.", tr: "Yarın Londra'ya varıyor." },
        ],
      },
      {
        heading: "Zaman başa geçebilir, fiil ile nesne ayrılmaz",
        tr: "Zaman ifadesi cümlenin başına alınabilir: On Sundays we visit Grandma. Ama fiil ile nesnenin arasına hiçbir şey girmez: „I drink every morning tea“ yanlış, „I drink tea every morning“ doğrudur.",
        examples: [
          { de: "On Sundays we visit Grandma.", tr: "Pazar günleri ninemizi ziyaret ederiz.", note: "zaman başta" },
          { de: "I drink tea every morning.", tr: "Her sabah çay içerim.", note: "fiil + nesne yan yana" },
          { de: "She reads a book every evening.", tr: "Her akşam kitap okur.", note: "nesne fiilin hemen arkasında" },
        ],
      },
    ],
    questions: [
      {
        text: "Which sentence is correct?",
        options: ["I tea drink every morning.", "I drink tea every morning.", "I drink every morning tea."],
        answer: 1,
        explain: "Özne + fiil + nesne, zaman en sonda: I drink tea every morning.",
      },
      {
        text: "I go ___.",
        options: ["at eight to school", "school at eight to", "to school at eight"],
        answer: 2,
        explain: "Fiilden sonra önce yer, sonra zaman gelir.",
      },
      {
        text: "She speaks ___.",
        options: ["English every day", "every day English", "day every English"],
        answer: 0,
        explain: "Nesne (English) fiilin hemen arkasında durur; zaman ifadesi ondan sonra gelir.",
      },
      {
        kind: "gapfill",
        text: "We have lunch ___ on Sundays. (at home)",
        options: [],
        answer: 0,
        accept: ["at home"],
        explain: "Yer, zamandan önce gelir: at home on Sundays.",
      },
      {
        kind: "gapfill",
        text: "He arrives ___ tomorrow. (in London)",
        options: [],
        answer: 0,
        accept: ["in London"],
        explain: "Önce yer, sonra zaman: in London tomorrow.",
      },
      {
        kind: "gapfill",
        text: "___ we visit Grandma. (on Sundays)",
        options: [],
        answer: 0,
        accept: ["On Sundays", "on Sundays"],
        explain: "Zaman ifadesi cümlenin başına alınabilir.",
      },
      {
        kind: "gapfill",
        text: "I drink ___ every morning. (tea)",
        options: [],
        answer: 0,
        accept: ["tea"],
        explain: "Nesne fiilin hemen arkasına gelir; zaman ondan sonra.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["They", "play", "soccer", "in the park", "on Saturdays"],
        explain: "Özne + fiil + nesne + yer + zaman.",
      },
      {
        kind: "truefalse",
        text: "„I every day coffee drink.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "Fiil özneden hemen sonra gelir: „I drink coffee every day.“",
      },
      {
        kind: "truefalse",
        text: "„On Sundays we visit Grandma.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Zaman başa alınmış; özne + fiil + nesne sırası bozulmamış.",
      },
    ],
  },
];
