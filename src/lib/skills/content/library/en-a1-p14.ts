import type { SkillExercise } from "../../types";

/**
 * EN · A1 — Beceriler kütüphanesi, parti 14.
 *
 * Hücreleri YİRMİYE tamamlayan partilerden biri. Kurallar ve emsal:
 * `en-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Bu parti YAZMA, KONUŞMA ve DİL BİLGİSİ taşır (okuma ve dinleme 13'te
 * yirmiye ulaştı). Parti 14 şehir hattı: şehirdeki en sevdiğin yeri anlatan
 * blog yazısı. Söyleyiş odağı kısa ve açık /ʌ/ (cup/cap); dil bilgisi kısa
 * cevaplar (Yes, I do / No, she isn't).
 */
export const enA1P14: SkillExercise[] = [
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-lib-w14",
    course: "en",
    level: "A1",
    skill: "writing",
    title: "My Favorite Place in Town",
    genre: "blog",
    intro: "Bir şehir blogu okurlarından en sevdikleri yeri soruyor; önce iki cümle kur, sonra kendi yerini anlatan kısa bir yazı yaz.",
    gloss: [
      { de: "middle", tr: "orta" },
      { de: "meet", tr: "buluşmak" },
      { de: "quiet", tr: "sessiz" },
      { de: "favorite", tr: "favori" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Parkın ortasında küçük bir kafe var.",
        answer: "There is a small café in the middle of the park.",
        alternatives: ["In the middle of the park there is a small café."],
        hint: "„var“ için there is; „ortasında“ üç parçalı bir kalıpla söylenir: in the middle of. Yer ifadesi başa da alınabilir.",
      },
      {
        kind: "build",
        tr: "Orada her pazar arkadaşlarımla buluşurum.",
        answer: "I meet my friends there every Sunday.",
        alternatives: ["Every Sunday I meet my friends there."],
        hint: "Önce özne ve fiil, sonra nesne, sonra yer ve zaman gelir; „every Sunday“ başa da alınabilir.",
      },
      {
        kind: "free",
        prompt:
          "Bir şehir blogu okurlarına soruyor: „Şehirde en sevdiğin yer neresi?“ Kısa bir yazı yaz: yerin adı ve nerede olduğu, orada ne var, orada ne yapıyorsun, oraya ne zaman ve kiminle gidiyorsun, neden seviyorsun.",
        checklist: [
          "Yerin adını ve nerede olduğunu yaz",
          "Orada ne olduğunu there is / there are ile anlat",
          "Orada ne yaptığını ve ne zaman gittiğini söyle",
          "Neden sevdiğini because ile yaz",
        ],
        minWords: 30,
        phrases: [
          { de: "My favorite place in town is …", tr: "Şehirde en sevdiğim yer …" },
          { de: "It is near …", tr: "…'ın yakınında." },
          { de: "There are many …", tr: "Orada birçok … var." },
          { de: "You can … there.", tr: "Orada … yapabilirsin." },
          { de: "I like it because …", tr: "Onu seviyorum çünkü …" },
        ],
        sample:
          "My favorite place in town is Rose Park. It is near the old bridge, ten minutes from my flat. There is a small " +
          "café in the middle of the park and there are many old trees. You can sit by the water and read a book. " +
          "I meet my friends there every Sunday. I like it because it is green and quiet.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a1-lib-s14",
    course: "en",
    level: "A1",
    skill: "speaking",
    title: "cup or cap?",
    genre: "pronounce",
    intro: "İngilizcede u ve bazen o harfi kısa, gevşek bir „a“ verir: cup, bus, love. Türkçedeki u ya da o gibi okunursa kelime değişir.",
    gloss: [
      { de: "cup", tr: "fincan" },
      { de: "sun", tr: "güneş" },
      { de: "luck", tr: "şans" },
      { de: "money", tr: "para" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "I'd like a cup of tea.",
        tr: "Bir fincan çay istiyorum.",
        hint: "„cup“ = KAP: ağız yarı açık, dudaklar yuvarlak değil. u diye okuma.",
        confusions: [
          { heard: ["cop", "cap"], fix: "Dudakları yuvarlarsan „cop“, ağzı fazla açarsan „cap“ olur; kısa ve gevşek bir a.", expected: "cup" },
        ],
      },
      {
        de: "The bus is late again.",
        tr: "Otobüs yine geç kaldı.",
        hint: "„bus“ = BAS; u harfi burada u sesi vermez.",
        confusions: [
          { heard: ["boss"], fix: "o ile söylenirse „boss“ (patron) duyulur; dudakları gevşek bırak.", expected: "bus" },
        ],
      },
      {
        de: "Come in and sit down.",
        tr: "İçeri gel ve otur.",
        hint: "„come“ = KAM: o harfi burada o değil, kısa ve gevşek bir a sesi verir.",
        confusions: [
          { heard: ["comb", "calm"], fix: "o diye okursan „comb“ (tarak), uzatırsan „calm“ (sakin) gibi duyulur; ses kısa ve orta.", expected: "Come" },
        ],
      },
      {
        de: "My mother loves the sun.",
        tr: "Annem güneşi çok sever.",
        hint: "„mother“, „loves“ ve „sun“: o ve u harfleri aynı kısa a sesini verir.",
        confusions: [
          { heard: ["soon"], fix: "Uzun bir u ile „sun“ „soon“ (yakında) olur; sesi kısa tut.", expected: "sun" },
        ],
      },
      {
        de: "Good luck with your test!",
        tr: "Sınavında bol şans!",
        hint: "„luck“ = LAK; „lock“ (kilit) ve „look“ (bakmak) başka kelimeler.",
        confusions: [
          { heard: ["lock", "look"], fix: "Dudaklar yuvarlanınca „lock“ ya da „look“ duyulur; ağız gevşek kalsın.", expected: "luck" },
        ],
      },
      {
        de: "How much money do you have?",
        tr: "Ne kadar paran var?",
        hint: "„much“ = MAÇ'a yakın, „money“ = MA-ni; ikisinde de aynı kısa a.",
        confusions: [
          { heard: ["match"], fix: "Ağzı fazla açarsan „match“ (maç) olur; ünlü daha kapalı ve kısa.", expected: "much" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a1-lib-g14",
    course: "en",
    level: "A1",
    skill: "grammar",
    title: "Yes, I do. No, she isn't.",
    genre: "grammar",
    intro: "Soruya yalnız „yes“ ya da „no“ demek kısa ve sert kaçar; kısa cevapta soruyu kuran yardımcı fiil tekrar edilir.",
    focus: "Kısa cevaplar: Yes, I do / No, she isn't (sorudaki yardımcı fiili tekrarlamak)",
    gloss: [
      { de: "hungry", tr: "aç" },
      { de: "swim", tr: "yüzmek" },
      { de: "far", tr: "uzak" },
      { de: "car", tr: "araba" },
    ],
    minutes: 6,
    explanation: [
      {
        heading: "Soruyu kuran kelime cevapta döner",
        tr: "Türkçede „Çay sever misin? — Evet, severim.“ deriz ve asıl fiili tekrar ederiz. İngilizcede asıl fiil değil, soruyu kuran yardımcı fiil tekrar edilir: do, does, is, are, can. Sorudaki isim de zamire döner.",
        examples: [
          { de: "Do you like tea? — Yes, I do.", tr: "Çay sever misin? — Evet, severim." },
          { de: "Is your brother at home? — No, he isn't.", tr: "Kardeşin evde mi? — Hayır, değil.", note: "your brother → he" },
          { de: "Can you swim? — Yes, I can.", tr: "Yüzebilir misin? — Evet, yüzebilirim." },
        ],
      },
      {
        heading: "Olumluda kısaltma yok",
        tr: "Olumsuz kısa cevapta kısaltma doğaldır: No, I'm not. No, it isn't. Ama olumlu kısa cevap kısaltılmaz: „Yes, I am“ doğru, „Yes, I'm“ yanlıştır; „Yes, it is“ doğru, „Yes, it's“ yanlıştır.",
        examples: [
          { de: "Are you hungry? — Yes, I am.", tr: "Aç mısın? — Evet.", note: "Yes, I'm değil" },
          { de: "Is it far? — No, it isn't.", tr: "Uzak mı? — Hayır, değil." },
          { de: "Are they students? — Yes, they are.", tr: "Öğrenciler mi? — Evet." },
        ],
      },
      {
        heading: "have got, there is ve does",
        tr: "Aynı kural öteki yardımcılarda da geçerlidir: „Have you got …?“ sorusuna „Yes, I have“, „Is there …?“ sorusuna „Yes, there is“ denir. „got“ ve asıl fiil kısa cevapta tekrar edilmez.",
        examples: [
          { de: "Have you got a car? — No, I haven't.", tr: "Araban var mı? — Hayır, yok." },
          { de: "Is there a bank near here? — Yes, there is.", tr: "Yakında banka var mı? — Evet, var." },
          { de: "Does she work here? — Yes, she does.", tr: "Burada mı çalışıyor? — Evet.", note: "works değil, does" },
        ],
      },
    ],
    questions: [
      {
        text: "„Do you like tea?“ — „Yes, I ___.“",
        options: ["like", "do", "am"],
        answer: 1,
        explain: "Soru do ile kurulmuş; kısa cevapta asıl fiil değil do tekrar edilir.",
      },
      {
        text: "„Are you hungry?“ — „Yes, ___.“",
        options: ["I'm", "I do", "I am"],
        answer: 2,
        explain: "Soru are ile kurulmuş, cevap am ile verilir; olumlu kısa cevap kısaltılmaz.",
      },
      {
        text: "„Is your brother at home?“ — „No, ___.“",
        options: ["he isn't", "he doesn't", "your brother not"],
        answer: 0,
        explain: "Soru is ile kurulmuş; isim zamire döner ve olumsuz isn't gelir.",
      },
      {
        kind: "gapfill",
        text: "„Can you swim?“ — „Yes, I ___.“",
        options: [],
        answer: 0,
        accept: ["can"],
        explain: "Soruyu can kurmuş, kısa cevapta da can tekrar edilir.",
      },
      {
        kind: "gapfill",
        text: "„Does she work here?“ — „Yes, she ___.“",
        options: [],
        answer: 0,
        accept: ["does"],
        explain: "Soru does ile kurulmuş; cevapta works değil does döner.",
      },
      {
        kind: "gapfill",
        text: "„Is there a bank near here?“ — „Yes, there ___.“",
        options: [],
        answer: 0,
        accept: ["is"],
        explain: "„Is there …?“ sorusunun olumlu kısa cevabı: Yes, there is.",
      },
      {
        kind: "gapfill",
        text: "„Have you got a car?“ — „No, I ___.“",
        options: [],
        answer: 0,
        accept: ["haven't", "have not"],
        explain: "have got sorusunda have döner; got tekrar edilmez: No, I haven't.",
      },
      {
        kind: "order",
        text: "„Are they at school?“ sorusunun olumsuz kısa cevabını sıraya diz.",
        options: [],
        answer: 0,
        items: ["No,", "they", "aren't"],
        explain: "Soru are ile kurulmuş: No, they aren't.",
      },
      {
        kind: "truefalse",
        text: "„Is it far?“ — „Yes, it's.“ Bu cevap doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "Olumlu kısa cevap kısaltılmaz: „Yes, it is.“",
      },
      {
        kind: "truefalse",
        text: "„Do they live here?“ — „No, they don't.“ Bu cevap doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Soru do ile kurulmuş, olumsuz kısa cevapta don't doğal ve doğru.",
      },
    ],
  },
];
