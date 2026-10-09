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
    title: "A trip to the mountains",
    genre: "personal",
    intro: "Geçen hafta sonu anlatılıyor. Düzensiz geçmiş biçimlerini yakala.",
    gloss: [
      { de: "went", tr: "gitti" },
      { de: "saw", tr: "gördü" },
      { de: "ate", tr: "yedi" },
      { de: "had", tr: "yedi / aldı" },
    ],
    minutes: 4,
    text:
      "What did you do last weekend? I went to the mountains with two friends.\n\n" +
      "We went by train on Saturday morning. The weather was sunny. We walked four hours and we saw a river and a small farm.\n\n" +
      "In the evening we ate in a café near the lake. I had soup and bread, my friend had chicken.\n\n" +
      "On Sunday I visited my grandmother. She was very happy. We watched a movie and I finished my homework there.\n\n" +
      "I didn't watch TV in the evening — I was too tired. I went to bed at nine!",
    questions: [
      {
        text: "Where did the writer go on Saturday?",
        options: ["to the mountains", "to the grandmother", "to the movies"],
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
    title: "Work and tennis",
    genre: "dialogue",
    intro: "Geçmişte soru sorma. Dikkat: „did“ varken fiil ilk hâline dönüyor.",
    gloss: [
      { de: "slow", tr: "yavaş" },
      { de: "know", tr: "bilmek" },
      { de: "Did you …?", tr: "… ettin mi" },
    ],
    minutes: 4,
    text:
      "Lucy: What did you do yesterday?\n" +
      "Tyler: I worked in the morning and I played tennis in the afternoon.\n" +
      "Lucy: Did you finish the work?\n" +
      "Tyler: No, I didn't finish. I have two more hours today.\n" +
      "Lucy: And the tennis? Did you win?\n" +
      "Tyler: No! My friend played very well. I didn't win, but it was good.\n" +
      "Lucy: Where did you play?\n" +
      "Tyler: Near the river, next to the farm. Do you know that place?\n" +
      "Lucy: Yes. I was there last week with my sister. We saw many birds.\n" +
      "Tyler: Did you go by bike?\n" +
      "Lucy: No, we went by bus. The bike is too slow for me.\n" +
      "Tyler: Then let's meet again on Saturday. I'll call you.\n" +
      "Lucy: Good. See you soon!",
    questions: [
      {
        text: "What did Tyler do in the afternoon?",
        options: ["he played tennis", "he worked", "he went by bus"],
        answer: 0,
        explain: "„I worked in the morning and I played tennis in the afternoon.“",
      },
      {
        text: "Did Tyler win?",
        options: ["no", "yes", "he didn't play"],
        answer: 0,
        explain: "„I didn't win, but it was good.“ — „didn't“ sonrası „win“ ilk hâlinde.",
      },
      {
        kind: "truefalse",
        text: "Tyler finished the work.",
        options: ["True", "False"],
        answer: 1,
        explain: "„No, I didn't finish. I have two more hours today.“",
      },
      {
        kind: "gapfill",
        text: "Lucy and her sister saw many ___.",
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
        text: "How did Lucy go there?",
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
    title: "A weekend on a farm",
    genre: "dialogue",
    intro: "İki kişi hafta sonunu anlatıyor. Kim nereye gitti, kim ne yaptı?",
    gloss: [
      { de: "went", tr: "gitti" },
      { de: "saw", tr: "gördü" },
      { de: "ate", tr: "yedi" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Katie", text: "Where did you go last weekend?" },
      { speaker: "Liam", text: "I went to a farm near the mountains." },
      { speaker: "Katie", text: "Really? What did you do there?" },
      { speaker: "Liam", text: "I helped with the animals. I saw two horses and many birds." },
      { speaker: "Katie", text: "Did you stay there?" },
      { speaker: "Liam", text: "Yes, two days. I ate with the family in the evening." },
      { speaker: "Katie", text: "And the weather?" },
      { speaker: "Liam", text: "On Saturday it was sunny, but on Sunday it rained all day." },
      { speaker: "Katie", text: "I visited my parents. We watched an old movie and I played with my brother." },
      { speaker: "Liam", text: "Did you finish your homework too?" },
      { speaker: "Katie", text: "No, I didn't finish it. I'm going to do it tonight." },
      { speaker: "Liam", text: "Then work now! And call me later." },
    ],
    questions: [
      {
        text: "Where did Liam go?",
        options: ["to a farm", "to his parents", "to the movies"],
        answer: 0,
        explain: "„I went to a farm near the mountains.“ — anne babasını ziyaret eden ise Liam değil, Katie.",
      },
      {
        text: "What did Katie do?",
        options: ["she visited her parents", "she went to a farm", "she finished her homework"],
        answer: 0,
        explain: "„I visited my parents. We watched an old movie…“",
      },
      {
        kind: "truefalse",
        text: "Katie finished her homework.",
        options: ["True", "False"],
        answer: 1,
        explain: "„No, I didn't finish it. I'm going to do it tonight.“",
      },
      {
        kind: "gapfill",
        text: "Liam saw two ___.",
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
    title: "Lucy's last day",
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
      { speaker: "Lucy", text: "So, this is my last day here." },
      { speaker: "Liam", text: "I know. We are going to miss you." },
      { speaker: "Lucy", text: "I'm going to miss you too. But I'll call you every week." },
      { speaker: "Liam", text: "And I'll send you a message every day!" },
      { speaker: "Lucy", text: "Good. And you can visit me. Come here in the summer." },
      { speaker: "Liam", text: "I'll come, I promise. Is there a lake there?" },
      { speaker: "Lucy", text: "Yes, and mountains. We can walk together." },
      { speaker: "Liam", text: "Then let's meet again in July." },
      { speaker: "Lucy", text: "July is good. I'll write you the address." },
      { speaker: "Liam", text: "See you soon, then!" },
      { speaker: "Lucy", text: "Yes. Thank you for everything, my friend." },
      { speaker: "Liam", text: "Bye-bye, Lucy!" },
    ],
    questions: [
      {
        text: "What is Lucy going to do?",
        options: ["call every week", "send a message every day", "stay here"],
        answer: 0,
        explain: "„But I'll call you every week.“ — her gün mesaj atacak olan ise Lucy değil, Liam.",
      },
      {
        text: "When do they meet again?",
        options: ["in July", "tomorrow", "next week"],
        answer: 0,
        explain: "„Then let's meet again in July.“ — yaz genel, temmuz kesin.",
      },
      {
        kind: "truefalse",
        text: "Liam is going to visit Lucy.",
        options: ["True", "False"],
        answer: 0,
        explain: "„And you can visit me. Come here in the summer. — I'll come, I promise.“",
      },
      {
        kind: "gapfill",
        text: "Liam sends a message every ___.",
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
        text: "What is Lucy going to write to Liam?",
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
    title: "A weekend form",
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
        alternatives: ["Yesterday I worked."],
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
          { label: "Sunday", answer: "grandmother", accept: ["his grandmother", "her grandmother", "the grandmother", "grandma"] },
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
    title: "Back from the mountains",
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
