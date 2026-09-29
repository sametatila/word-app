import type { SkillExercise } from "../types";

/**
 * EN · B1 · Ünite 23 — "Önceki hâli, şehir mi kır mı, duyguyu adlandırmak,
 * geriye bakış".
 *
 * Dört ders: Before they built it · City or country · Naming a feeling ·
 * Looking back.
 *
 *   Kelime: field, farm, forest, river, lake, wild, island, far, busy,
 *           lonely, distance, bicycle, air, sea, snow, near, mood,
 *           feeling, relief, happy, sad, angry, afraid, excited, memory,
 *           hurt, secret, regret, remember, guilty, tear, shout.
 *   Kalıp:  Before they built the road, this was a field. ·
 *           The farm had closed before we moved here. ·
 *           They had cut the forest before anyone noticed. ·
 *           The city is busy; on the other hand, it is never lonely. ·
 *           Despite the distance, I take my bicycle. ·
 *           The air is clean there; in contrast, here it is not. ·
 *           My mood has been low since Monday. ·
 *           The feeling started when she left. ·
 *           I have never felt such relief. ·
 *           By the time I understood, the memory had faded. ·
 *           I had hurt her before I noticed. ·
 *           They had kept the secret for years.
 *
 * Ünitenin tek öğretme noktası BAĞLAÇ SIRAYI SÖYLÜYORSA GEÇMİŞİN GEÇMİŞİ
 * SEÇİME KALIYOR. „before“ iki olayı zaten sıraya koyduğu için yalın
 * geçmiş yetiyor („Before they built the road, this was a field“); sıra
 * cümlenin KENDİ konusuysa „had“ geri geliyor. „by the time“ ise seçeneği
 * kaldırıyor: o bir olay değil bir son tarih adlandırıyor, önceki işi
 * ancak geçmişin geçmişi taşıyabiliyor.
 */
export const enB1U23: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-u23-r1",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 23,
    title: "The valley before the road",
    genre: "article",
    intro: "Bir vadinin yol yapılmadan önceki hâli. Neler, hangi sırayla değişti?",
    gloss: [
      { de: "sheep", tr: "koyun" },
      { de: "cows", tr: "inekler" },
      { de: "the grass", tr: "ot" },
      { de: "the wind", tr: "rüzgâr" },
      { de: "a factory", tr: "fabrika" },
      { de: "faded", tr: "soldu" },
      { de: "the wall", tr: "duvar" },
      { de: "reached", tr: "ulaştı" },
      { de: "a parking lot", tr: "otopark" },
    ],
    minutes: 7,
    text:
      "Before they built the road, this was a field. My grandfather kept sheep here, and in summer the children from the village walked to the river through the tall grass.\n" +
      "The farm had closed before we moved here in 1998. The last family had left two years earlier, and the house was empty, with its windows open to the wind.\n" +
      "They had cut the forest before anyone noticed. It happened in one winter. By the time the village council met to talk about it, the trees had already gone to a factory in the north.\n" +
      "The road came in 2004. Before it came, the trip to town took two hours by bus. After it came, it took twenty minutes, and the young people started to leave.\n" +
      "The island in the lake was a farm once. The lake had reached the wall before the first house was finished, and the wild grass took the rest. People far from here still call it a farm.\n" +
      "Today the field is a parking lot for the lake, and every summer somebody asks me where the old farm was. I show them the wall. By the time they leave, the memory of the farm has faded a little more, even for me.",
    questions: [
      {
        text: "What did the grandfather keep in the field?",
        options: ["sheep", "cows", "horses"],
        answer: 0,
        explain: "„My grandfather kept sheep here…“",
      },
      {
        text: "How long did the trip to town take before the road?",
        options: ["two hours", "twenty minutes", "one hour"],
        answer: 0,
        explain: "„Before it came, the trip to town took two hours by bus.“",
      },
      {
        kind: "truefalse",
        text: "The forest was cut in one winter.",
        options: ["True", "False"],
        answer: 0,
        explain: "„It happened in one winter.“",
      },
      {
        kind: "gapfill",
        text: "The farm ___ closed before we moved here.",
        options: [],
        answer: 0,
        accept: ["had"],
        explain: "„The farm had closed before we moved here in 1998.“",
      },
      {
        kind: "order",
        text: "Vadinin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Before they built the road, this was a field.",
          "The farm had closed before we moved here.",
          "The lake had reached the wall.",
          "People far from here still call it a farm.",
        ],
        explain: "Tarla, kapanan çiftlik, göl, en sonda bugünkü ad.",
      },
      {
        kind: "short_answer",
        text: "What did the wild grass do?",
        options: [],
        answer: 0,
        accept: ["took the rest", "it took the rest", "covered the rest"],
        explain: "„and the wild grass took the rest.“",
      },
    ],
  },
  {
    id: "en-b1-u23-r2",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 23,
    title: "Busy city, quiet country",
    genre: "opinion",
    intro: "Şehirde mi kırda mı? Yazar iki yaşamı karşılaştırıyor.",
    gloss: [
      { de: "a film", tr: "film" },
      { de: "a cinema", tr: "sinema" },
      { de: "the nearest", tr: "en yakın" },
      { de: "taste", tr: "tadını almak" },
      { de: "calm", tr: "sakin" },
      { de: "a relief", tr: "rahatlama" },
      { de: "the stars", tr: "yıldızlar" },
      { de: "the peace", tr: "huzur" },
      { de: "the argument", tr: "tartışma" },
      { de: "breakfast", tr: "kahvaltı" },
    ],
    minutes: 7,
    text:
      "I have lived in both places, and people always ask me which one is better.\n" +
      "The city is busy; on the other hand, it is never lonely. On a Tuesday evening I can meet three friends, see a film and be home by ten. In the village, the nearest cinema was forty minutes away.\n" +
      "Despite the distance, I take my bicycle to work. It is eleven kilometers along the river, and despite the rain in November, I have missed only four days this year.\n" +
      "The air is clean there; in contrast, here it is not. In the village I could see the stars every night. Here, on a bad day in winter, I can taste the traffic.\n" +
      "Although the country is quiet, it is not always calm. Everybody knows your name, your car and your plans for Saturday. In the city, nobody cares, and some days that is a relief.\n" +
      "My mother still lives in the village, near the lake. When I visit her, I sleep ten hours and I walk in the forest. After three days, despite the peace, I want to go back.\n" +
      "So which one is better? I think the argument is never really about the air. It is about how many people you want to see before breakfast.",
    questions: [
      {
        text: "How does the writer go to work?",
        options: ["by bicycle", "by bus", "on foot"],
        answer: 0,
        explain: "„Despite the distance, I take my bicycle to work.“",
      },
      {
        text: "What could the writer see every night in the village?",
        options: ["the stars", "the traffic", "the river"],
        answer: 0,
        explain: "„In the village I could see the stars every night.“",
      },
      {
        kind: "truefalse",
        text: "After three days in the village, the writer wants to stay there.",
        options: ["True", "False"],
        answer: 1,
        explain: "„After three days, despite the peace, I want to go back.“",
      },
      {
        kind: "gapfill",
        text: "___ the distance, I take my bicycle to work.",
        options: [],
        answer: 0,
        accept: ["Despite", "despite"],
        explain: "„Despite the distance, I take my bicycle to work.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The city is busy; on the other hand, it is never lonely.",
          "Despite the distance, I take my bicycle to work.",
          "The air is clean there; in contrast, here it is not.",
          "My mother still lives in the village.",
        ],
        explain: "Şehrin artısı, bisiklet, hava, en sonda köydeki anne.",
      },
      {
        kind: "short_answer",
        text: "How far is it to work?",
        options: [],
        answer: 0,
        accept: ["eleven kilometers", "11 kilometers", "eleven"],
        explain: "„It is eleven kilometers along the river…“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-u23-l1",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 23,
    title: "A low week",
    genre: "dialogue",
    intro: "Zor bir hafta. Elif duygusunu nasıl adlandırıyor?",
    gloss: [
      { de: "either", tr: "de" },
      { de: "out loud", tr: "sesli olarak" },
      { de: "instead of", tr: "yerine" },
      { de: "tired", tr: "yorgun" },
      { de: "sleep", tr: "uyku" },
      { de: "finally", tr: "sonunda" },
      { de: "such", tr: "böylesi" },
      { de: "somehow", tr: "nedense" },
      { de: "a roommate", tr: "ev arkadaşı" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Elif", text: "My mood has been low since Monday. I have not been out, and I have not called anybody." },
      { speaker: "Poyraz", text: "Do you know when it started?" },
      { speaker: "Elif", text: "Yes. The feeling started when she left, on Sunday night, and it has been with me since then." },
      { speaker: "Poyraz", text: "Have you talked to her since?" },
      { speaker: "Elif", text: "Once. She has been very kind about it, which somehow makes it worse. We have been friends since school." },
      { speaker: "Poyraz", text: "Then you have lost a roommate, not a friend." },
      { speaker: "Elif", text: "Yes. And I have never felt such relief as on the evening I finally said the word „sad“ out loud instead of „tired“." },
      { speaker: "Poyraz", text: "Why does that work?" },
      { speaker: "Elif", text: "Because „tired“ asks for sleep and „sad“ asks for a person. I was angry for two days before I noticed that I was afraid, and those are not the same thing either." },
      { speaker: "Poyraz", text: "Are you excited about Thursday?" },
      { speaker: "Elif", text: "I am, and that is new. Happy is a big word; excited is a small one, and small words are the ones I can still say." },
    ],
    questions: [
      {
        text: "Since when has the mood been low?",
        options: ["since Monday", "since Thursday", "since she left"],
        answer: 0,
        explain: "„My mood has been low since Monday.“",
      },
      {
        text: "When did the feeling start?",
        options: ["when she left", "on Thursday", "at school"],
        answer: 0,
        explain: "„The feeling started when she left, on Sunday night…“",
      },
      {
        kind: "truefalse",
        text: "Elif was angry before she noticed that she was afraid.",
        options: ["True", "False"],
        answer: 0,
        explain: "„I was angry for two days before I noticed that I was afraid…“",
      },
      {
        kind: "gapfill",
        text: "„Tired“ asks for sleep and „sad“ asks for a ___.",
        options: [],
        answer: 0,
        accept: ["person"],
        explain: "„Because ‚tired‘ asks for sleep and ‚sad‘ asks for a person.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["My mood has been low since Monday.", "My mood has been low since Monday"],
        explain: "Süre: pazartesi başladı ve hâlâ sürüyor.",
      },
      {
        kind: "short_answer",
        text: "Which words can Elif still say?",
        options: [],
        answer: 0,
        accept: ["small words", "the small ones", "small"],
        explain: "„small words are the ones I can still say.“",
      },
    ],
  },
  {
    id: "en-b1-u23-l2",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 23,
    title: "Eleven years later",
    genre: "monologue",
    intro: "Geriye bakış. Hangi olay önce oldu?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "faded", tr: "soldu" },
      { de: "carried", tr: "taşıdı" },
      { de: "lied", tr: "yalan söyledi" },
      { de: "guilt", tr: "suçluluk" },
      { de: "the kitchen", tr: "mutfak" },
      { de: "an apology", tr: "özür" },
      { de: "a party", tr: "parti" },
      { de: "reach for", tr: "uzanmak" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Naz", text: "By the time I understood, the memory had faded. That is the sentence I have carried for eleven years." },
      { speaker: "Naz", text: "I was nineteen. My best friend had told me a secret, and I told it to two other people at a party." },
      { speaker: "Naz", text: "I had hurt her before I noticed. It took me years to understand what I had done, and by then she had moved to another city." },
      { speaker: "Naz", text: "They had kept the secret for years before anyone asked a question. Nobody lied. Nobody was asked." },
      { speaker: "Naz", text: "I regret saying it. I regret it more than anything I have done, and I have never told her so." },
      { speaker: "Naz", text: "There were tears and there was a shout in a kitchen, and I remember the kitchen better than the words." },
      { speaker: "Naz", text: "Guilty is the word people reach for and I think it is the wrong one. Guilt is about a rule. Regret is about a person." },
      { speaker: "Naz", text: "What I would tell anyone is this: say it on the day. By the time the memory has faded, the apology is about you and not about her." },
    ],
    questions: [
      {
        text: "How long has Naz carried that sentence?",
        options: ["eleven years", "two years", "a month"],
        answer: 0,
        explain: "„That is the sentence I have carried for eleven years.“",
      },
      {
        text: "Which one is about a rule?",
        options: ["guilt", "regret", "a memory"],
        answer: 0,
        explain: "„Guilt is about a rule. Regret is about a person.“",
      },
      {
        kind: "truefalse",
        text: "Somebody lied about the secret.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Nobody lied. Nobody was asked.“",
      },
      {
        kind: "gapfill",
        text: "I ___ hurt her before I noticed.",
        options: [],
        answer: 0,
        accept: ["had"],
        explain: "„I had hurt her before I noticed.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["They had kept the secret for years before anyone asked a question.", "They had kept the secret for years before anyone asked a question"],
        explain: "Önce olan iş „had“ + üçüncü hâl; soru sonra geliyor.",
      },
      {
        kind: "short_answer",
        text: "What does Naz remember best?",
        options: [],
        answer: 0,
        accept: ["the kitchen", "kitchen", "not the words"],
        explain: "„I remember the kitchen better than the words.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-u23-w1",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 23,
    title: "The field, the farm, the forest",
    genre: "opinion",
    intro: "Bir vadinin eski hâli. Olanları sırasıyla anlatan cümleleri kur, notu doldur.",
    gloss: [
      { de: "had faded", tr: "solmuştu" },
      { de: "had closed", tr: "kapanmıştı" },
      { de: "had cut", tr: "kesmişlerdi" },
      { de: "had kept", tr: "saklamışlardı" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Anladığımda anı çoktan solmuştu.",
        answer: "By the time I understood, the memory had faded.",
        hint: "„by the time“ seçenek bırakmıyor: önceki iş „had“ + üçüncü hâl.",
      },
      {
        kind: "build",
        tr: "Yolu yapmadan önce burası tarlaydı.",
        answer: "Before they built the road, this was a field.",
        hint: "„before“ sırayı zaten söylüyor; „had“ gerekmiyor.",
      },
      {
        kind: "build",
        tr: "Biz buraya taşınmadan önce çiftlik kapanmıştı.",
        answer: "The farm had closed before we moved here.",
        hint: "Sıra cümlenin kendi konusu; o yüzden „had“ duruyor.",
      },
      {
        kind: "build",
        tr: "Kimse fark etmeden ormanı kesmişlerdi.",
        answer: "They had cut the forest before anyone noticed.",
        hint: "İki olay arasındaki boşluk anlatılıyor.",
      },
      {
        kind: "form",
        prompt: "Vadi notunu doldur.",
        facts: "Yol yapılmadan önce burası tarlaydı; çiftlik biz 1998'de taşınmadan önce kapanmıştı; orman tek bir kışta kesildi; yol 2004'te geldi.",
        fields: [
          { label: "Before the road", answer: "a field", accept: ["field", "it was a field"] },
          { label: "The farm", answer: "had closed", accept: ["closed", "closed before we moved", "had closed before 1998"] },
          { label: "The forest", answer: "cut in one winter", accept: ["in one winter", "one winter", "they had cut it"] },
          { label: "The road", answer: "in 2004", accept: ["2004", "came in 2004"] },
        ],
      },
    ],
  },
  {
    id: "en-b1-u23-w2",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 23,
    title: "City days and moods",
    genre: "opinion",
    intro: "Şehir hayatı ve zor bir hafta. Karşılaştıran ve duyguyu anlatan cümleleri kur.",
    gloss: [
      { de: "despite", tr: "rağmen" },
      { de: "on the other hand", tr: "öte yandan" },
      { de: "in contrast", tr: "buna karşılık" },
      { de: "has been low", tr: "bozuk" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Mesafeye rağmen bisikletimi alıyorum.",
        answer: "Despite the distance, I take my bicycle.",
        hint: "„despite“ İSİM alıyor; cümlecik almıyor.",
      },
      {
        kind: "build",
        tr: "Şehir yoğun; öte yandan hiç yalnız değil.",
        answer: "The city is busy; on the other hand, it is never lonely.",
        hint: "„on the other hand“ önünde bir ilk taraf istiyor.",
      },
      {
        kind: "build",
        tr: "Orada hava temiz; buna karşılık burada değil.",
        answer: "The air is clean there; in contrast, here it is not.",
        hint: "„in contrast“ iki ölçülmüş şeyi yan yana koyuyor.",
      },
      {
        kind: "build",
        tr: "Pazartesiden beri moralim bozuk.",
        answer: "My mood has been low since Monday.",
        hint: "Çizgi: başladı ve sürüyor.",
      },
      {
        kind: "build",
        tr: "O gittiğinde his başladı.",
        answer: "The feeling started when she left.",
        hint: "Nokta: bir an anlatılıyor, süre değil.",
      },
    ],
  },
];
