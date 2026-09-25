import type { SkillExercise } from "../../types";

/**
 * EN · A2 — Beceriler kütüphanesi, parti 10.
 *
 * İngilizce kursun A2 konuşma ve dil bilgisi hücrelerini ONA tamamlayan son
 * parti. Kurallar ve emsal: `en-a2.ts` (parti 1) ve `data/content/SPEC.md`.
 */
export const enA2P10: SkillExercise[] = [
  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a2-lib-s10",
    course: "en",
    level: "A2",
    skill: "speaking",
    title: "would you, did you, what you",
    genre: "pronounce",
    intro: "d ve t sesleri „you“ ile karşılaşınca değişir; hızlı konuşmanın en tanınmaz kalıplarından biri budur.",
    gloss: [
      { de: "to mind", tr: "sakıncası olmak" },
      { de: "to mean", tr: "kastetmek" },
      { de: "last year", tr: "geçen yıl" },
      { de: "to expect", tr: "beklemek" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "Would you mind waiting?",
        tr: "Beklemenizin sakıncası var mı?",
        hint: "„would you“ tek parça olur: WU-cu. d ile y birleşip c sesi verir.",
        confusions: [
          { heard: [], fix: "İki kelimeyi ayırmak resmî ve yavaş duyulur; birleştir.", expected: "would you" },
        ],
      },
      {
        de: "Did you see it?",
        tr: "Gördün mü?",
        hint: "„did you“ = Dİ-cu. Aynı kural: d + y = c.",
        confusions: [
          { heard: [], fix: "Günlük konuşmada bu iki kelime her zaman kaynaşır.", expected: "did you" },
        ],
      },
      {
        de: "What do you mean?",
        tr: "Ne demek istiyorsun?",
        hint: "„what do you“ üçü birden erir: WO-cu-miin. „do“ neredeyse kaybolur.",
        confusions: [
          { heard: [], fix: "Dört ayrı kelime gibi söylemek cümleyi yapay gösterir.", expected: "what do you" },
        ],
      },
      {
        de: "I met you last year, didn't I?",
        tr: "Seninle geçen yıl tanışmıştım, değil mi?",
        hint: "„met you“ = ME-çu (t + y = ç). „didn't I“ = Dİ-dı-nay.",
        confusions: [
          { heard: [], fix: "t ile y karşılaşınca ç çıkar; bu bir hata değil kuraldır.", expected: "met you" },
        ],
      },
      {
        de: "Can't you come earlier?",
        tr: "Daha erken gelemez misin?",
        hint: "„can't you“ = KEN-çu. Olumsuzun açık, vurgulu ünlüsü korunur ama t ile y birleşir.",
        confusions: [
          { heard: ["Can you come earlier"], fix: "Kaynaşsa bile olumsuzun açık, vurgulu ünlüsü duyulmalı, yoksa anlam döner.", expected: "can't you" },
        ],
      },
      {
        de: "I expect you got my message.",
        tr: "Sanırım mesajımı aldın.",
        hint: "„expect you“ = iks-PEK-çu, „got my“ = GO-may. İki ayrı kaynaşma bir cümlede.",
        confusions: [
          { heard: [], fix: "Kelimeler arasındaki sınırlar konuşmada erir; anlam yine açık kalır.", expected: "expect you" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a2-lib-g10",
    course: "en",
    level: "A2",
    skill: "grammar",
    title: "If it rains, we'll stay",
    genre: "grammar",
    intro: "Gerçekçi bir koşulda iki yan farklı zaman taşır; bu asimetri kuralın kendisidir.",
    focus: "First conditional: if + present, will",
    gloss: [
      { de: "to rain", tr: "yağmur yağmak" },
      { de: "to miss", tr: "kaçırmak" },
      { de: "unless", tr: "-mezse" },
      { de: "to hurry", tr: "acele etmek" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "Koşul şimdiki, sonuç gelecek",
        tr: "Gerçekçi bir koşulda „if“ cümlesi PRESENT SIMPLE, sonuç cümlesi „will“ alır: „If it rains, we'll stay at home.“ İki yanda da „will“ kullanmak („If it will rain“) en sık hatadır. Anlam gelecekte olsa bile „if“ yanı gelecek zaman almaz; bu asimetri alışkanlık ister.",
        examples: [
          { de: "If it rains, we'll stay at home.", tr: "Yağmur yağarsa evde kalırız.", note: "present + will" },
          { de: "If you hurry, you'll catch the bus.", tr: "Acele edersen otobüse yetişirsin.", note: "aynı kalıp" },
          { de: "She'll be angry if you're late.", tr: "Geç kalırsan kızacak.", note: "sıra değişebilir" },
        ],
      },
      {
        heading: "Sıra serbest, virgül değil",
        tr: "„if“ cümlesi başta da sonda da durabilir ve anlam değişmez. Tek fark yazımdadır: „if“ cümlesi BAŞTAYSA virgül konur, sondaysa konmaz. Bu kural küçük görünür ama sınavlarda ölçülür.",
        examples: [
          { de: "If you ask her, she will help.", tr: "Ona sorarsan yardım eder.", note: "başta → virgül" },
          { de: "She will help if you ask her.", tr: "Ona sorarsan yardım eder.", note: "sonda → virgül yok" },
          { de: "If you don't hurry, you'll miss it.", tr: "Acele etmezsen kaçırırsın.", note: "olumsuz koşul" },
        ],
      },
      {
        heading: "unless, when ve may",
        tr: "„unless“ „if not“ demektir ve kendisi olumsuzdur: „Unless you hurry, you'll miss it.“ Yanına ikinci bir olumsuzluk gelmez. „if“ ile „when“ farkı önemlidir: „if“ belirsizdir, „when“ kesindir. Sonuç yanında „will“ yerine „may“, „might“ ya da emir de gelebilir.",
        examples: [
          { de: "Unless you hurry, you'll miss the train.", tr: "Acele etmezsen treni kaçırırsın.", note: "unless = if not" },
          { de: "When I get home, I'll call you.", tr: "Eve varınca seni ararım.", note: "kesin → when" },
          { de: "If you see him, tell him to wait.", tr: "Onu görürsen beklemesini söyle.", note: "sonuç: emir" },
        ],
      },
    ],
    questions: [
      {
        text: "If it ___, we'll stay at home.",
        options: ["will rain", "rains", "rained"],
        answer: 1,
        explain: "„if“ yanında present simple gelir.",
      },
      {
        text: "If you hurry, you ___ the bus.",
        options: ["catch", "caught", "will catch"],
        answer: 2,
        explain: "Sonuç yanında will kullanılır.",
      },
      {
        text: "Which sentence is punctuated correctly?",
        options: [
          "She will help, if you ask her.",
          "If you ask her she will help.",
          "If you ask her, she will help.",
        ],
        answer: 2,
        explain: "„if“ cümlesi baştaysa virgül konur, sondaysa konmaz.",
      },
      {
        kind: "gapfill",
        text: "___ you hurry, you'll miss the train. (if not)",
        options: [],
        answer: 0,
        accept: ["Unless", "unless"],
        explain: "„unless“ tek başına „if not“ anlamı taşır.",
      },
      {
        kind: "gapfill",
        text: "When I ___ home, I'll call you. (get)",
        options: [],
        answer: 0,
        accept: ["get"],
        explain: "„when“ yanında da present simple gelir.",
      },
      {
        kind: "gapfill",
        text: "If you see him, ___ him to wait. (an order)",
        options: [],
        answer: 0,
        accept: ["tell"],
        explain: "Sonuç yanında emir kipi de gelebilir.",
      },
      {
        kind: "gapfill",
        text: "She ___ be angry if you're late. (will)",
        options: [],
        answer: 0,
        accept: ["will", "'ll"],
        explain: "Sonuç cümlesi „if“ cümlesinin önünde de durabilir.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["If", "you", "don't hurry", "you'll miss it"],
        explain: "Olumsuz koşul + sonuç: If you don't hurry, you'll miss it.",
      },
      {
        kind: "truefalse",
        text: "„If it will rain, we'll stay at home.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„if“ yanında will kullanılmaz: „If it rains …“",
      },
      {
        kind: "truefalse",
        text: "„Unless you don't hurry, you'll miss it.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„unless“ zaten olumsuzdur; ikinci bir olumsuzluk anlamı tersine çevirir.",
      },
    ],
  },
];
