import type { SkillExercise } from "../../types";

/**
 * EN · A2 — Beceriler kütüphanesi, parti 20.
 *
 * İngilizce kursun A2 konuşma ve dil bilgisi hücrelerini YİRMİYE tamamlayan
 * son parti; bu partiyle A2'nin beş hücresi de yirmide. Yalnız KONUŞMA ve
 * DİL BİLGİSİ taşır (gerekçe: parti 18 başlığı). Kurallar ve emsal:
 * `en-a2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 20 belirsizlik ve hava hattı. Söyleyiş odağı kelime SONUNDAKİ
 * sessiz kümeleri (next, texts, months); dil bilgisi gelecekte olasılık:
 * might, may ve will probably.
 */
export const enA2P20: SkillExercise[] = [
  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a2-lib-s20",
    course: "en",
    level: "A2",
    skill: "speaking",
    title: "next, texts, months",
    genre: "pronounce",
    intro: "İngilizce kelimeler iki üç sessizle bitebilir; araya ya da sona ünlü eklemek kelimeyi uzatır, bir sessizi düşürmek ise başka kelime yapar.",
    gloss: [
      { de: "text", tr: "mesaj" },
      { de: "month", tr: "ay" },
      { de: "desk", tr: "çalışma masası" },
      { de: "gift", tr: "hediye" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "See you next week.",
        tr: "Haftaya görüşürüz.",
        hint: "„next“ = NEKST: k, s, t üst üste; t'yi yutma, ardından hemen „week“ gelsin.",
        confusions: [
          { heard: ["see you necks week"], fix: "Son t'yi hafif de olsa söyle; sona ünlü ekleme.", expected: "next" },
        ],
      },
      {
        de: "I sent you two texts.",
        tr: "Sana iki mesaj attım.",
        hint: "„texts“ = TEKSTS. Zorlanırsan ortadaki t'yi hafif söyle ama sona ı ekleme: teksts, tekstıs değil.",
        confusions: [
          { heard: [], fix: "Kümeyi bozma: k-s-t-s tek nefeste.", expected: "texts" },
        ],
      },
      {
        de: "We waited six months.",
        tr: "Altı ay bekledik.",
        hint: "„months“ = MANTHS: th'den hemen sonra s. „six“ = SİKS: sonu da ks kümesi.",
        confusions: [
          { heard: ["We waited six mons"], fix: "th'yi düşürme ve çoğul s'yi ekle: manths.", expected: "months" },
        ],
      },
      {
        de: "It's the first desk on the left.",
        tr: "Soldaki ilk masa.",
        hint: "„first“ ST, „desk“ SK, „left“ FT ile biter. Hiçbirinin sonuna ünlü ekleme.",
        confusions: [
          { heard: [], fix: "Son t'leri düşürürsen kelimeler yarım kalır.", expected: "first" },
        ],
      },
      {
        de: "Thanks for the gifts.",
        tr: "Hediyeler için teşekkürler.",
        hint: "„thanks“ NKS, „gifts“ FTS ile biter. Üç sessiz arka arkaya, arada ünlü yok.",
        confusions: [
          { heard: ["Tanks for the gifs", "thank for the gift"], fix: "gifts'teki t ile thanks'teki s duyulmalı.", expected: "gifts" },
        ],
      },
      {
        de: "Both hands are cold.",
        tr: "İki elim de soğuk.",
        hint: "„hands“ = HENDZ, „cold“ = KOULD. d'yi düşürme: „hans“ ve „coal“ başka kelimeler.",
        confusions: [
          { heard: ["Both hans are coal"], fix: "Kümedeki d sessizdir ama söylenir: hendz, kould.", expected: "hands" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a2-lib-g20",
    course: "en",
    level: "A2",
    skill: "grammar",
    title: "It might rain",
    genre: "grammar",
    intro: "Türkçede „belki yağmur yağar“ dediğin şey İngilizcede kendi kiplik sözcüğüyle söylenir; ne kadar emin olduğunu da sözcüğün seçimi gösterir.",
    focus: "Gelecekte olasılık: might, may ve will probably",
    gloss: [
      { de: "umbrella", tr: "şemsiye" },
      { de: "probably", tr: "büyük ihtimalle" },
      { de: "sure", tr: "emin" },
      { de: "snow", tr: "kar yağmak" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "might / may + yalın fiil: belki",
        tr: "Olabilecek ama emin olmadığın bir şey için „might“ ya da „may“ kullanılır. İkisi de kişiye göre değişmez ve arkasından yalın fiil gelir. Olumsuzu „might not“ ve „may not“tur.",
        examples: [
          { de: "It might rain this afternoon.", tr: "Öğleden sonra yağmur yağabilir." },
          { de: "I may be late tonight.", tr: "Bu akşam geç kalabilirim." },
          { de: "She might not come.", tr: "Gelmeyebilir.", note: "olumsuz" },
        ],
      },
      {
        heading: "Ne kadar eminsin?",
        tr: "Kesin bildiğin şey için „will“, büyük olasılıkla olacak şey için „will probably“, yarı yarıya olan için „might“ gelir. „probably“ olumluda will'den SONRA, olumsuzda won't'tan ÖNCE durur.",
        examples: [
          { de: "The store will be open on Sunday.", tr: "Dükkân pazar günü açık olacak.", note: "kesin" },
          { de: "The train will probably be late.", tr: "Tren büyük ihtimalle gecikecek.", note: "will + probably" },
          { de: "He probably won't come.", tr: "Büyük ihtimalle gelmeyecek.", note: "probably + won't" },
        ],
      },
      {
        heading: "İki ihtimal ve tavsiye",
        tr: "Plan belli değilse iki ihtimal „might … or might …“ ile yan yana konur. Bir tavsiyenin nedenini söylerken de might sık kullanılır: şemsiye al, yağmur yağabilir.",
        examples: [
          { de: "We might stay at home, or we might visit my aunt.", tr: "Evde kalabiliriz ya da teyzeme gidebiliriz." },
          { de: "Take an umbrella. It might rain later.", tr: "Şemsiye al, sonra yağmur yağabilir." },
          { de: "I'm not sure yet. I might.", tr: "Henüz emin değilim. Belki.", note: "kısa cevap" },
        ],
      },
    ],
    questions: [
      {
        text: "Take a coat. It ___ be cold in the mountains.",
        options: ["might", "must to", "is"],
        answer: 0,
        explain: "Emin değilsin, bir olasılık söylüyorsun: might + yalın fiil.",
      },
      {
        text: "She ___ come. She isn't sure yet.",
        options: ["will", "may", "does"],
        answer: 1,
        explain: "Kendisi de emin değil; olasılık „may“ ile söylenir.",
      },
      {
        text: "Which sentence is correct?",
        options: ["He might comes tomorrow.", "He might to come tomorrow.", "He might come tomorrow."],
        answer: 2,
        explain: "„might“ kişiye göre değişmez ve arkasından yalın fiil gelir.",
      },
      {
        kind: "gapfill",
        text: "I ___ not have time tomorrow. I don't know yet.",
        options: [],
        answer: 0,
        accept: ["might", "may"],
        explain: "Belirsiz bir olumsuz olasılık: might not / may not.",
      },
      {
        kind: "gapfill",
        text: "The train will ___ be late. It's always late on Fridays.",
        options: [],
        answer: 0,
        accept: ["probably"],
        explain: "Büyük olasılık: will + probably.",
      },
      {
        kind: "gapfill",
        text: "He probably ___ come. He's very busy. (will + not)",
        options: [],
        answer: 0,
        accept: ["won't", "will not"],
        explain: "Olumsuzda probably won't'tan önce durur: He probably won't come.",
      },
      {
        kind: "gapfill",
        text: "We might go to the lake, or we ___ stay at home.",
        options: [],
        answer: 0,
        accept: ["might", "may"],
        explain: "İki ihtimal yan yana: might … or might …",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["It", "might", "snow", "tonight"],
        explain: "Özne + might + yalın fiil + zaman: It might snow tonight.",
      },
      {
        kind: "truefalse",
        text: "„I may be late tonight.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "may + yalın fiil (be) ile olasılık; cümle doğru.",
      },
      {
        kind: "truefalse",
        text: "„It will might snow tomorrow.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "İki kiplik sözcük yan yana gelmez: It might snow tomorrow.",
      },
    ],
  },
];
