import type { SkillExercise } from "../types";

/**
 * EN · A1 · Ünite 25 — "Geçmiş zaman ve veda". A1'in SON ünitesi.
 *
 * Dört ders: The -ed past · Did you...? · My last weekend ·
 * Staying in touch.
 *
 *   Kelime: worked, played, watched, visited, finished, homework,
 *           shopping, play tennis, ask, answer, when, where, yesterday,
 *           what, how much, how many, go, went, see, saw, have, had,
 *           meet, met, eat, ate, river, mountain, farm, call, visit,
 *           soon, again, miss, friends, life, come here.
 *   Kalıp:  I worked yesterday. · I didn't watch TV. · Did you finish? ·
 *           Did you ...? · I didn't ... · Where did you go? ·
 *           I went to … · I saw … / I met … / I ate … ·
 *           What did you do last weekend? · See you soon! ·
 *           I'll call you. · Let's meet again.
 *
 * Geçmiş zamanın asıl kuralı SORUDA VE OLUMSUZDA FİİLİN GERİ DÖNMESİ:
 * „I went“ ama „Did you go?“ ve „I didn't go“. Geçmişlik „did“e taşınıyor
 * ve fiil ilk hâline dönüyor. Türkçede ek fiilde kalıyor ("gitmedin mi"),
 * o yüzden öğrenci „Did you went?“ diyor. İçerik olumluyu, olumsuzu ve
 * soruyu hep aynı metinde yan yana koyuyor.
 *
 * Son egzersiz (l2) bilerek VEDA: kurs A1'i burada bitiriyor ve kapanış
 * metninin kendisi „See you soon“ diyor.
 */
export const enA1U25: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a1-u25-r1",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 25,
    title: "My last weekend",
    genre: "personal",
    intro: "Geçen hafta sonu anlatılıyor. Düzensiz geçmiş biçimlerini yakala.",
    gloss: [
      { de: "went", tr: "gitti" },
      { de: "saw", tr: "gördü" },
      { de: "ate", tr: "yedi" },
      { de: "had", tr: "vardı" },
    ],
    minutes: 4,
    text:
      "What did you do last weekend? I went to the mountains with two friends.\n\n" +
      "We went by train on Saturday morning. The weather was sunny. We walked four hours and we saw a river and a small farm.\n\n" +
      "In the evening we ate in a café near the lake. I had soup and bread, my friend had chicken.\n\n" +
      "On Sunday I visited my grandmother. She was very happy. We watched a film and I finished my homework there.\n\n" +
      "I didn't watch TV in the evening — I was too tired. I went to bed at nine!",
    questions: [
      {
        text: "Where did the writer go on Saturday?",
        options: ["to the mountains", "to the grandmother", "to the cinema"],
        answer: 0,
        explain: "„I went to the mountains with two friends.“ — büyükanne pazar günü.",
      },
      {
        text: "What did the writer eat?",
        options: ["soup and bread", "chicken", "nothing"],
        answer: 0,
        explain: "„I had soup and bread, my friend had chicken.“",
      },
      {
        kind: "truefalse",
        text: "The writer did not watch TV in the evening.",
        options: ["True", "False"],
        answer: 0,
        explain: "„I didn't watch TV in the evening — I was too tired.“ — „didn't“ sonrası fiil ilk hâlinde.",
      },
      {
        kind: "gapfill",
        text: "They walked ___ hours.",
        options: [],
        answer: 0,
        accept: ["four", "4"],
        explain: "„We walked four hours and we saw a river and a small farm.“",
      },
      {
        kind: "short_answer",
        text: "Who did the writer visit on Sunday?",
        options: [],
        answer: 0,
        accept: ["his grandmother", "the grandmother", "grandmother"],
        explain: "„On Sunday I visited my grandmother.“ — düzenli geçmiş: visit → visited.",
      },
    ],
  },
  {
    id: "en-a1-u25-r2",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 25,
    title: "Did you …?",
    genre: "dialogue",
    intro: "Geçmişte soru sorma. Dikkat: „did“ varken fiil ilk hâline dönüyor.",
    gloss: [
      { de: "slow", tr: "yavaş" },
      { de: "know", tr: "bilmek" },
      { de: "Did you …?", tr: "… ettin mi" },
    ],
    minutes: 4,
    text:
      "Ela: What did you do yesterday?\n" +
      "Can: I worked in the morning and I played tennis in the afternoon.\n" +
      "Ela: Did you finish the work?\n" +
      "Can: No, I didn't finish. I have two hours today.\n" +
      "Ela: And the tennis? Did you win?\n" +
      "Can: No! My friend played very well. I didn't win, but it was good.\n" +
      "Ela: Where did you play?\n" +
      "Can: Near the river, next to the farm. Do you know that place?\n" +
      "Ela: Yes. I was there last week with my sister. We saw many birds.\n" +
      "Can: Did you go by bike?\n" +
      "Ela: No, we went by bus. The bike is too slow for me.\n" +
      "Can: Then let's meet again on Saturday. I'll call you.\n" +
      "Ela: Good. See you soon!",
    questions: [
      {
        text: "What did Can do in the afternoon?",
        options: ["he played tennis", "he worked", "he went by bus"],
        answer: 0,
        explain: "„I worked in the morning and I played tennis in the afternoon.“",
      },
      {
        text: "Did Can win?",
        options: ["no", "yes", "he didn't play"],
        answer: 0,
        explain: "„I didn't win, but it was good.“ — „didn't“ sonrası „win“ ilk hâlinde.",
      },
      {
        kind: "truefalse",
        text: "Can finished the work.",
        options: ["True", "False"],
        answer: 1,
        explain: "„No, I didn't finish. I have two hours today.“",
      },
      {
        kind: "gapfill",
        text: "Ela and her sister saw many ___.",
        options: [],
        answer: 0,
        accept: ["birds"],
        explain: "„I was there last week with my sister. We saw many birds.“",
      },
      {
        kind: "order",
        text: "Sorulan soruların sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "What did you do yesterday?",
          "Did you finish the work?",
          "Where did you play?",
          "Did you go by bike?",
        ],
        explain: "Önce genel soru, sonra iş, sonra yer, en son ulaşım.",
      },
      {
        kind: "short_answer",
        text: "How did Ela go there?",
        options: [],
        answer: 0,
        accept: ["by bus", "bus", "she went by bus"],
        explain: "„No, we went by bus. The bike is too slow for me.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a1-u25-l1",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 25,
    title: "Where did you go?",
    genre: "dialogue",
    intro: "İki kişi hafta sonunu anlatıyor. Kim nereye gitti, kim ne yaptı?",
    gloss: [
      { de: "went", tr: "gitti" },
      { de: "saw", tr: "gördü" },
      { de: "ate", tr: "yedi" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Nil", text: "Where did you go last weekend?" },
      { speaker: "Kaan", text: "I went to a farm near the mountains." },
      { speaker: "Nil", text: "Really? What did you do there?" },
      { speaker: "Kaan", text: "I helped with the animals. I saw two horses and many birds." },
      { speaker: "Nil", text: "Did you stay there?" },
      { speaker: "Kaan", text: "Yes, two days. I ate with the family in the evening." },
      { speaker: "Nil", text: "And the weather?" },
      { speaker: "Kaan", text: "On Saturday it was sunny, but on Sunday it rained all day." },
      { speaker: "Nil", text: "I visited my parents. We watched an old film and I played with my brother." },
      { speaker: "Kaan", text: "Did you finish your homework too?" },
      { speaker: "Nil", text: "No, I didn't finish it. I do it tonight." },
      { speaker: "Kaan", text: "Then work now! And call me later." },
    ],
    questions: [
      {
        text: "Where did Kaan go?",
        options: ["to a farm", "to his parents", "to the cinema"],
        answer: 0,
        explain: "„I went to a farm near the mountains.“ — anne babayı ziyaret eden Nil.",
      },
      {
        text: "What did Nil do?",
        options: ["she visited her parents", "she went to a farm", "she finished her homework"],
        answer: 0,
        explain: "„I visited my parents. We watched an old film…“",
      },
      {
        kind: "truefalse",
        text: "Nil finished her homework.",
        options: ["True", "False"],
        answer: 1,
        explain: "„No, I didn't finish it. I do it tonight.“",
      },
      {
        kind: "gapfill",
        text: "Kaan saw two ___.",
        options: [],
        answer: 0,
        accept: ["horses"],
        explain: "„I saw two horses and many birds.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Where did you go last weekend?", "Where did you go last weekend"],
        explain: "„Where did you go last weekend?“ — „did“ varken fiil „go“, „went“ değil.",
      },
      {
        kind: "short_answer",
        text: "How was the weather on Sunday?",
        options: [],
        answer: 0,
        accept: ["it rained", "rain", "it rained all day"],
        explain: "„On Saturday it was sunny, but on Sunday it rained all day.“",
      },
    ],
  },
  {
    id: "en-a1-u25-l2",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 25,
    title: "Staying in touch",
    genre: "dialogue",
    intro: "A1'in son metni: bir veda. Sonra ne olacak, ne zaman görüşülecek?",
    gloss: [
      { de: "miss", tr: "özlemek" },
      { de: "know", tr: "bilmek" },
      { de: "promise", tr: "söz vermek" },
      { de: "Come here", tr: "buraya gel" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Ela", text: "So, this is my last day here." },
      { speaker: "Kaan", text: "I know. We are going to miss you." },
      { speaker: "Ela", text: "I miss you too. But I'll call you every week." },
      { speaker: "Kaan", text: "And I'll send you a message every day!" },
      { speaker: "Ela", text: "Good. And you can visit me. Come here in the summer." },
      { speaker: "Kaan", text: "I come, I promise. Is there a lake there?" },
      { speaker: "Ela", text: "Yes, and mountains. We can walk together." },
      { speaker: "Kaan", text: "Then let's meet again in July." },
      { speaker: "Ela", text: "July is good. I'll write you the address." },
      { speaker: "Kaan", text: "See you soon! Life is long." },
      { speaker: "Ela", text: "Yes. Thank you for everything, my friend." },
      { speaker: "Kaan", text: "Bye-bye, Ela!" },
    ],
    questions: [
      {
        text: "What is Ela going to do?",
        options: ["call every week", "send a message every day", "stay here"],
        answer: 0,
        explain: "„But I'll call you every week.“ — her gün mesaj atacak olan Kaan.",
      },
      {
        text: "When do they meet again?",
        options: ["in July", "tomorrow", "next week"],
        answer: 0,
        explain: "„Then let's meet again in July.“ — yaz genel, temmuz kesin.",
      },
      {
        kind: "truefalse",
        text: "Kaan is going to visit Ela.",
        options: ["True", "False"],
        answer: 0,
        explain: "„And you can visit me. Come here in the summer. — I come, I promise.“",
      },
      {
        kind: "gapfill",
        text: "Kaan sends a message every ___.",
        options: [],
        answer: 0,
        accept: ["day"],
        explain: "„And I'll send you a message every day!“",
      },
      {
        kind: "order",
        text: "Vedanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "So, this is my last day here.",
          "But I'll call you every week.",
          "Come here in the summer.",
          "Then let's meet again in July.",
        ],
        explain: "Önce ayrılık, sonra söz, sonra davet, en son kesin tarih.",
      },
      {
        kind: "short_answer",
        text: "What is Ela going to write to Kaan?",
        options: [],
        answer: 0,
        accept: ["the address", "her address", "address"],
        explain: "„July is good. I'll write you the address.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-u25-w1",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 25,
    title: "I worked yesterday",
    genre: "personal",
    intro: "Geçmiş zamanı yaz. Olumsuzda ve soruda fiil ilk hâline dönüyor.",
    gloss: [
      { de: "I worked yesterday.", tr: "dün çalıştım" },
      { de: "I didn't watch TV.", tr: "televizyon izlemedim" },
      { de: "Did you finish?", tr: "bitirdin mi" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Dün çalıştım.",
        answer: "I worked yesterday.",
        hint: "Düzenli fiil geçmişte „-ed“ alır: work → worked. Kişiye göre değişmez.",
      },
      {
        kind: "build",
        tr: "Televizyon izlemedim.",
        answer: "I didn't watch TV.",
        alternatives: ["I did not watch TV."],
        hint: "Geçmişlik „didn't“e taşınıyor ve fiil ilk hâline dönüyor: watch, „watched“ değil.",
      },
      {
        kind: "build",
        tr: "Bitirdin mi?",
        answer: "Did you finish?",
        hint: "Soruda da aynı: „did“ geçmişi taşıyor, fiil eksiz kalıyor.",
      },
      {
        kind: "build",
        tr: "Nereye gittin?",
        answer: "Where did you go?",
        hint: "Düzensiz fiil bile „did“ varken ilk hâline dönüyor: go, „went“ değil.",
      },
      {
        kind: "form",
        prompt: "Hafta sonu formunu doldur.",
        facts: "Dağlar; cumartesi trenle; nehir ve çiftlik görüldü; pazar büyükanne.",
        fields: [
          { label: "Place", answer: "the mountains", accept: ["mountains"] },
          { label: "Travel", answer: "by train", accept: ["train"] },
          { label: "Saw", answer: "a river and a farm", accept: ["river and farm"] },
          { label: "Sunday", answer: "grandmother", accept: ["his grandmother"] },
        ],
      },
    ],
  },
  {
    id: "en-a1-u25-w2",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 25,
    title: "See you soon!",
    genre: "personal",
    intro: "A1'in son yazma egzersizi: düzensiz geçmiş ve veda.",
    gloss: [
      { de: "I went to …", tr: "…'e gittim" },
      { de: "See you soon!", tr: "yakında görüşürüz" },
      { de: "Let's meet again.", tr: "hadi tekrar buluşalım" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Dağlara gittim.",
        answer: "I went to the mountains.",
        hint: "„go“ düzensiz: geçmişi „went“ ve „-ed“ almıyor.",
      },
      {
        kind: "build",
        tr: "Bir nehir gördüm.",
        answer: "I saw a river.",
        hint: "„see“ de düzensiz: saw. Bu biçimleri tek tek öğrenmek gerekiyor.",
      },
      {
        kind: "build",
        tr: "Geçen hafta sonu ne yaptın?",
        answer: "What did you do last weekend?",
        hint: "İki „do“ var: ilki soruyu kuran „did“, ikincisi asıl fiil.",
      },
      {
        kind: "build",
        tr: "Yakında görüşürüz!",
        answer: "See you soon!",
        hint: "Veda kalıbı; özne yok ve „soon“ sonda duruyor.",
      },
      {
        kind: "build",
        tr: "Hadi tekrar buluşalım.",
        answer: "Let's meet again.",
        hint: "„again“ cümlenin sonunda. A1'in son cümlesi bir sözle bitiyor.",
      },
    ],
  },
];
