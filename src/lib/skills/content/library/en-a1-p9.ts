import type { SkillExercise } from "../../types";

/**
 * EN · A1 — Beceriler kütüphanesi, parti 9.
 *
 * Kurallar ve emsal: `en-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 * Yalnız konuşma ve dil bilgisi hücreleri (gerekçe: parti 6 başlığı).
 */
export const enA1P9: SkillExercise[] = [
  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a1-lib-s9",
    course: "en",
    level: "A1",
    skill: "speaking",
    title: "can and can't",
    genre: "pronounce",
    intro: "„can“ ile „can't“ arasındaki fark küçük bir t değil; iki kelime bambaşka okunur.",
    gloss: [
      { de: "to swim", tr: "yüzmek" },
      { de: "to drive", tr: "araba kullanmak" },
      { de: "tomorrow", tr: "yarın" },
      { de: "to help", tr: "yardım etmek" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "I can swim, but I can't drive.",
        tr: "Yüzebiliyorum ama araba kullanamıyorum.",
        hint: "Olumlu „can“ zayıf ve kısadır (kın), olumsuz „can't“ uzun ve vurguludur (KAANT).",
        confusions: [
          { heard: [], fix: "Olumluda vurgu fiile gider; kelimeyi kısa ve zayıf söyle.", expected: "can" },
        ],
      },
      {
        de: "She can help you tomorrow.",
        tr: "Yarın sana yardım edebilir.",
        hint: "„can help“ tek parça gibi akar: kın-HELP. Duraklamak olumsuz duyulmasına yol açar.",
        confusions: [
          { heard: [], fix: "Olumlu cümlede „can“ vurgulanmaz ve arkasından duraklama olmaz.", expected: "can help" },
        ],
      },
      {
        de: "Sorry, I can't come today.",
        tr: "Kusura bakma, bugün gelemem.",
        hint: "„can't“ içindeki a uzundur ve t çoğu zaman yutulur; asıl işaret UZUNLUKTUR.",
        confusions: [
          { heard: ["Sorry, I can come today"], fix: "t duyulmasa bile ünlü uzun kalmalı, yoksa anlam tersine döner.", expected: "can't" },
        ],
      },
      {
        de: "Can you open the window?",
        tr: "Pencereyi açabilir misin?",
        hint: "Soruda da „can“ zayıftır: kın-yu. Vurgu asıl fiildedir.",
        confusions: [
          { heard: [], fix: "Soruyu vurgulu başlatmak sabırsız duyulur; kelimeyi hafif söyle.", expected: "Can you" },
        ],
      },
      {
        de: "He can't hear you.",
        tr: "Seni duyamıyor.",
        hint: "„can't hear“ derken iki kelime arasında küçük bir duraklama olur; bu da olumsuzu belli eder.",
        confusions: [
          { heard: ["He can hear you"], fix: "Olumsuzda ünlüyü uzat ve bir tık dur: KAANT | hiir.", expected: "can't" },
        ],
      },
      {
        de: "We can meet at six, can't we?",
        tr: "Altıda buluşabiliriz, değil mi?",
        hint: "Aynı cümlede iki biçim: ilki zayıf (kın), ikincisi uzun ve vurgulu (KAANT-wi).",
        confusions: [
          { heard: ["six can we"], fix: "Ek soruda olumsuz biçim gelir ve o vurguludur.", expected: "can't we" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a1-lib-g9",
    course: "en",
    level: "A1",
    skill: "grammar",
    title: "me, him, them",
    genre: "grammar",
    intro: "Aynı kişi cümlenin başında bir biçim, sonunda başka bir biçim alır; ikisini karıştırmamak gerekir.",
    focus: "Nesne zamirleri ve cümledeki yerleri",
    gloss: [
      { de: "to call", tr: "aramak" },
      { de: "to show", tr: "göstermek" },
      { de: "message", tr: "mesaj" },
      { de: "teacher", tr: "öğretmen" },
    ],
    minutes: 6,
    explanation: [
      {
        heading: "İki ayrı liste",
        tr: "Cümlenin öznesi olan zamirler: I, you, he, she, it, we, they. Nesnesi olanlar: me, you, him, her, it, us, them. „you“ ve „it“ ikisinde de aynıdır; gerisi değişir. Türkçede bu ayrım ekle yapılır („ben“ / „beni“), İngilizcede ayrı kelimeyle.",
        examples: [
          { de: "I called her yesterday.", tr: "Onu dün aradım.", note: "she → her" },
          { de: "She called me back.", tr: "O da beni geri aradı.", note: "I → me" },
          { de: "We saw them at the station.", tr: "Onları istasyonda gördük.", note: "they → them" },
        ],
      },
      {
        heading: "Edattan sonra da nesne biçimi",
        tr: "Bir edattan sonra her zaman nesne biçimi gelir: „with me“, „for him“, „to us“, „about them“. „with I“ ya da „for he“ yanlıştır. „between you and me“ kalıbı da bu kuralın parçasıdır.",
        examples: [
          { de: "Come with us.", tr: "Bizimle gel.", note: "with + us" },
          { de: "This message is for him.", tr: "Bu mesaj onun için.", note: "for + him" },
          { de: "I talked to them about it.", tr: "Onlarla bunun hakkında konuştum.", note: "to + them" },
        ],
      },
      {
        heading: "Sıra: kim, sonra ne",
        tr: "İki nesne varsa sıra şöyledir: önce kişi, sonra şey — „Give me the book.“ Şeyi öne almak istiyorsan araya „to“ ya da „for“ gerekir: „Give the book to me.“ Zamirle söylerken birinci biçim daha doğaldır.",
        examples: [
          { de: "Give me the book, please.", tr: "Kitabı bana ver lütfen.", note: "kişi önce" },
          { de: "Send the message to her.", tr: "Mesajı ona gönder.", note: "şey önce → to" },
          { de: "The teacher showed us the answer.", tr: "Öğretmen cevabı bize gösterdi.", note: "kişi önce" },
        ],
      },
    ],
    questions: [
      {
        text: "I called ___ yesterday.",
        options: ["she", "her", "hers"],
        answer: 1,
        explain: "Fiilin nesnesi olduğu için „she“ değil her gelir.",
      },
      {
        text: "Come with ___.",
        options: ["we", "us", "our"],
        answer: 1,
        explain: "Edattan sonra nesne biçimi gelir: with us.",
      },
      {
        text: "Which sentence is correct?",
        options: [
          "Give the book me.",
          "Give me the book.",
          "Give to me the book.",
        ],
        answer: 1,
        explain: "İki nesne varsa önce kişi gelir ve araya edat girmez.",
      },
      {
        kind: "gapfill",
        text: "She called ___ back. (I)",
        options: [],
        answer: 0,
        accept: ["me"],
        explain: "„I“ nesne olduğunda me olur.",
      },
      {
        kind: "gapfill",
        text: "This message is for ___. (he)",
        options: [],
        answer: 0,
        accept: ["him"],
        explain: "Edattan sonra nesne biçimi: for him.",
      },
      {
        kind: "gapfill",
        text: "We saw ___ at the station. (they)",
        options: [],
        answer: 0,
        accept: ["them"],
        explain: "„they“ nesne olduğunda them olur.",
      },
      {
        kind: "gapfill",
        text: "The teacher showed ___ the answer. (we)",
        options: [],
        answer: 0,
        accept: ["us"],
        explain: "Kişi nesnesi önce gelir ve „we“ → us olur.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Send", "the message", "to", "her"],
        explain: "Şey öne alındığında araya „to“ girer: Send the message to her.",
      },
      {
        kind: "truefalse",
        text: "„Come with I.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "Edattan sonra nesne biçimi gelir: „Come with me.“",
      },
      {
        kind: "truefalse",
        text: "„Give me the book.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Önce kişi, sonra şey: doğru sıra.",
      },
    ],
  },
];
