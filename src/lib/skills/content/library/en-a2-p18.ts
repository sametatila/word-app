import type { SkillExercise } from "../../types";

/**
 * EN · A2 — Beceriler kütüphanesi, parti 18.
 *
 * Hücreleri YİRMİYE tamamlayan partilerden biri (gerekçe: parti 11 başlığı).
 * Okuma, dinleme ve yazma hücreleri yirmiye ulaştı; bu parti yalnız
 * KONUŞMA ve DİL BİLGİSİ hücrelerini taşır. Kurallar ve emsal: `en-a2.ts`
 * (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 18 seçimler ve boş zaman hattı. Söyleyiş odağı Amerikan
 * İngilizcesinde ünlüler arasında yumuşayan t (water, better, city); dil
 * bilgisi iki şey için both, either, neither.
 */
export const enA2P18: SkillExercise[] = [
  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a2-lib-s18",
    course: "en",
    level: "A2",
    skill: "speaking",
    title: "water, better, city",
    genre: "pronounce",
    intro: "Amerikan İngilizcesinde iki ünlü arasındaki t yumuşar ve hızlı bir d'ye benzer: water, better, city. Kendin söyleyince duyduğunda da tanırsın.",
    gloss: [
      { de: "water", tr: "su" },
      { de: "butter", tr: "tereyağı" },
      { de: "pretty", tr: "şirin" },
      { de: "city", tr: "şehir" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "Can I have some water?",
        tr: "Biraz su alabilir miyim?",
        hint: "„water“ = WA-dır. t, dilin ucu damağa bir kez hafifçe dokunarak çıkar; sert bir t patlatma.",
        confusions: [
          { heard: [], fix: "Sert t de anlaşılır ama yabancı duyulur; dilin ucuyla hızlı, hafif bir dokunuş yeter.", expected: "water" },
        ],
      },
      {
        de: "It's getting better.",
        tr: "Gittikçe iyileşiyor.",
        hint: "„getting“ = GE-dıŋ, „better“ = BE-dır. İki kelimede de aynı yumuşak t.",
        confusions: [
          { heard: [], fix: "t'ler iki ünlü arasında; ikisini de yumuşak söyle.", expected: "better" },
        ],
      },
      {
        de: "The city is pretty at night.",
        tr: "Şehir geceleri çok güzel.",
        hint: "„city“ = Sİ-di, „pretty“ = PRİ-di. „at night“ta ise t ünsüzden önce durduğu için yumuşamaz.",
        confusions: [
          { heard: [], fix: "Yalnız iki ünlü arasındaki t yumuşar; „night“ın sonundaki t değişmez.", expected: "pretty" },
        ],
      },
      {
        de: "Put it on the table.",
        tr: "Masanın üstüne koy.",
        hint: "Kelime sınırında da olur: „put it on“ = PU-di-DON. „table“daki t ise vurgulu hecenin başında, sert kalır.",
        confusions: [
          { heard: [], fix: "Kelimeler birleşince t iki ünlü arasına düşer ve yumuşar.", expected: "put it on" },
        ],
      },
      {
        de: "What a lot of butter!",
        tr: "Ne çok tereyağı!",
        hint: "„what a“ = WA-dı, „lot of“ = LA-dıv, „butter“ = BA-dır. Üç yerde aynı yumuşama.",
        confusions: [
          { heard: [], fix: "Cümleyi tek parça söyle; kelime aralarındaki t'ler kendiliğinden yumuşar.", expected: "lot of" },
        ],
      },
      {
        de: "I forgot about it.",
        tr: "Onu unuttum.",
        hint: "„forgot about it“ = fır-GA-dı-BAU-dit. Sondaki t ise cümle bittiği için sert ya da yarım kalır.",
        confusions: [
          { heard: [], fix: "Yumuşama cümlenin içinde olur; son t'yi yumuşatma.", expected: "forgot about" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a2-lib-g18",
    course: "en",
    level: "A2",
    skill: "grammar",
    title: "both, either, neither",
    genre: "grammar",
    intro: "İki seçenek söz konusu olduğunda Türkçedeki „ikisi de, ikisinden biri, hiçbiri“ İngilizcede üç ayrı sözcükle söylenir.",
    focus: "İki şey için: both, either, neither ve both … and, either … or",
    gloss: [
      { de: "jacket", tr: "ceket" },
      { de: "parents", tr: "anne baba" },
      { de: "correct", tr: "doğru" },
      { de: "wrong", tr: "yanlış" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "both: ikisi de",
        tr: "„both“ iki şeyin ikisini birden kapsar ve fiil çoğul olur. İsimden önce doğrudan („both movies“) ya da „of“ ile („both of my brothers“) gelir. İki şeyi bağlarken „both … and“ kullanılır.",
        examples: [
          { de: "Both movies are good.", tr: "İki film de güzel." },
          { de: "Both of my brothers live in Izmir.", tr: "İki erkek kardeşim de İzmir'de yaşıyor." },
          { de: "I like both tea and coffee.", tr: "Hem çayı hem kahveyi severim.", note: "both … and" },
        ],
      },
      {
        heading: "either: ikisinden biri, fark etmez",
        tr: "„either“ ikisinden herhangi birini anlatır ve arkasından TEKİL isim gelir: either table. İki seçeneği „either … or“ bağlar. Olumsuz cümlede „not … either“ „ikisini de değil“ demektir.",
        examples: [
          { de: "You can sit at either table.", tr: "İki masadan birine oturabilirsin.", note: "tekil isim" },
          { de: "We can meet either on Friday or on Saturday.", tr: "Ya cuma ya cumartesi buluşabiliriz." },
          { de: "I don't like either of them.", tr: "İkisini de sevmiyorum.", note: "not + either" },
        ],
      },
      {
        heading: "neither: ikisi de değil",
        tr: "„neither“ kendisi olumsuzdur, bu yüzden fiil OLUMLU kalır: „Neither answer is correct.“ Yanına ikinci bir olumsuzluk gelmez. „neither of us“ gibi öbeklerden sonra fiil genelde tekil kullanılır.",
        examples: [
          { de: "Neither answer is correct.", tr: "İki cevap da doğru değil." },
          { de: "Neither of us can drive.", tr: "İkimiz de araba kullanamıyoruz." },
          { de: "Neither of my parents has a car.", tr: "Annemin de babamın da arabası yok.", note: "fiil olumlu" },
        ],
      },
    ],
    questions: [
      {
        text: "___ of my parents are teachers. My mother and my father teach at the same school.",
        options: ["Both", "Either", "Neither"],
        answer: 0,
        explain: "İki kişi de öğretmen; ikisini birden kapsayan both, fiil çoğul.",
      },
      {
        text: "I don't mind. We can go on ___ day.",
        options: ["both", "either", "neither"],
        answer: 1,
        explain: "Hangisi olursa olsun: either + tekil isim.",
      },
      {
        text: "Which sentence is correct?",
        options: ["Neither of us don't have a car.", "Neither of us hasn't a car.", "Neither of us has a car."],
        answer: 2,
        explain: "„neither“ zaten olumsuzdur; fiil olumlu kalır.",
      },
      {
        kind: "gapfill",
        text: "I like ___ tea and coffee — I drink them every day.",
        options: [],
        answer: 0,
        accept: ["both"],
        explain: "İkisini birden severim: both … and.",
      },
      {
        kind: "gapfill",
        text: "You can take ___ bus. They both go to the center.",
        options: [],
        answer: 0,
        accept: ["either"],
        explain: "İkisinden herhangi biri olur: either bus.",
      },
      {
        kind: "gapfill",
        text: "___ answer is correct. They are both wrong.",
        options: [],
        answer: 0,
        accept: ["Neither", "neither"],
        explain: "İkisi de doğru değil: neither + tekil isim, fiil olumlu.",
      },
      {
        kind: "gapfill",
        text: "She didn't like ___ of the jackets, so she bought nothing.",
        options: [],
        answer: 0,
        accept: ["either"],
        explain: "Olumsuz cümlede „ikisini de“: not … either.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["We", "can meet", "either today", "or tomorrow"],
        explain: "İki seçenek either … or ile bağlanır.",
      },
      {
        kind: "truefalse",
        text: "„Neither of my friends didn't come.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "İki olumsuz yan yana gelmez: Neither of my friends came.",
      },
      {
        kind: "truefalse",
        text: "„Both of my brothers live in Izmir.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "both of + çoğul isim, fiil çoğul (live); cümle doğru.",
      },
    ],
  },
];
