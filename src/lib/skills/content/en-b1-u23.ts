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
    title: "Before they built it",
    genre: "info",
    intro: "Yol yapılmadan önce burası neydi? Hangi cümlede „had“ gerekiyor?",
    gloss: [
      { de: "confused", tr: "şaşırmış" },
      { de: "events", tr: "olaylar" },
      { de: "verb", tr: "fiil" },
      { de: "sentences", tr: "cümleler" },
      { de: "sentence", tr: "cümle" },
      { de: "either", tr: "ikisinden biri" },
      { de: "event", tr: "olay" },
      { de: "whole", tr: "bütün" },
      { de: "conjunction", tr: "bağlaç" },
      { de: "the order", tr: "sıra" },
      { de: "a choice", tr: "seçim" },
      { de: "the gap", tr: "aradaki boşluk" },
      { de: "a deadline", tr: "son tarih" },
      { de: "earlier", tr: "önceki" },
      { de: "carry", tr: "taşımak" },
      { de: "faded", tr: "soldu" },
      { de: "the valley", tr: "vadi" },
      { de: "the wall", tr: "duvar" },
      { de: "grass", tr: "ot" },
      { de: "reached", tr: "ulaştı" },
      { de: "halves", tr: "yarılar" },
    ],
    minutes: 7,
    text:
      "Before they built the road, this was a field. Simple past in both halves, and nobody is confused: „before“ has already put the two events in order, so the verb does not have to do it again.\n" +
      "Now take the same idea away from that conjunction. The farm had closed before we moved here. Here the order is the point — the closing came first and the moving second — and „had closed“ says so.\n" +
      "Both sentences are correct, and the difference between them is small. That is why the rule is easy to state and hard to feel: when the conjunction does the ordering, the past perfect becomes a choice.\n" +
      "They had cut the forest before anyone noticed. This one keeps the „had“, because the sentence is about the gap between the two events and not about either of them.\n" +
      "Then there is „by the time“, and that one takes the choice away. By the time I understood, the memory had faded. „By the time“ names a deadline, not an event; the second verb has to be the earlier one, and only the past perfect can carry it.\n" +
      "The island is the clearest case in the whole valley. The lake had reached the wall before the first house was finished, and the wild grass took the rest. People far from here still call it a farm.",
    questions: [
      {
        text: "Why is simple past enough in the first sentence?",
        options: ["„before“ gives the order", "the events are recent", "there is no second verb"],
        answer: 0,
        explain: "„„before“ has already put the two events in order, so the verb does not have to do it again.“",
      },
      {
        text: "Which one takes the choice away?",
        options: ["by the time", "before", "after that"],
        answer: 0,
        explain: "„Then there is „by the time“, and that one takes the choice away.“",
      },
      {
        kind: "truefalse",
        text: "„By the time“ names a deadline.",
        options: ["True", "False"],
        answer: 0,
        explain: "„„By the time“ names a deadline, not an event…“",
      },
      {
        kind: "gapfill",
        text: "The farm ___ closed before we moved here.",
        options: [],
        answer: 0,
        accept: ["had"],
        explain: "„The farm had closed before we moved here.“",
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
        explain: "Önce kuralın iki örneği, sonra vadinin kendi hikâyesi.",
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
    title: "City or country",
    genre: "opinion",
    intro: "İki yaşam yan yana. Hangi bağlaç isim alıyor?",
    gloss: [
      { de: "unit", tr: "ünite" },
      { de: "sentence", tr: "cümle" },
      { de: "a clause", tr: "cümlecik" },
      { de: "a linker", tr: "bağlayıcı" },
      { de: "a noun", tr: "isim" },
      { de: "common", tr: "yaygın" },
      { de: "a mistake", tr: "yanlış" },
      { de: "measured", tr: "ölçülmüş" },
      { de: "colder", tr: "daha soğuk" },
      { de: "belongs", tr: "ait" },
      { de: "a report", tr: "rapor" },
      { de: "backwards", tr: "geriye" },
      { de: "a letter", tr: "mektup" },
      { de: "a table", tr: "çizelge" },
      { de: "the argument", tr: "tartışma" },
    ],
    minutes: 7,
    text:
      "The city is busy; on the other hand, it is never lonely. Two clauses, and a linker that needs something in front of it: „on the other hand“ only works if a first hand has already been given.\n" +
      "Despite the distance, I take my bicycle. „Despite“ takes a noun — the distance, the snow, the rain — and never a clause. „Despite it is far“ is the most common mistake in this unit and it is not a sentence.\n" +
      "The air is clean there; in contrast, here it is not. „In contrast“ puts two measured things side by side, and it is colder than the other two; it belongs to a report.\n" +
      "So there are three shapes for one idea. „Although“ joins two clauses inside a single sentence. „Despite“ takes a noun. „On the other hand“ and „in contrast“ open a new sentence and look backwards at the one before.\n" +
      "Which one I choose says more about the page than about the city. In a letter I write „although“. In a report I write „in contrast“, and the reader hears a table even when there is no table.\n" +
      "The sea is near and the forest is far. I have lived in both places long enough to know that the argument is never really about the air.",
    questions: [
      {
        text: "What does „despite“ take?",
        options: ["a noun", "a clause", "a new sentence"],
        answer: 0,
        explain: "„„Despite“ takes a noun — the distance, the snow, the rain — and never a clause.“",
      },
      {
        text: "Which linker belongs to a report?",
        options: ["in contrast", "although", "despite"],
        answer: 0,
        explain: "„it is colder than the other two; it belongs to a report.“",
      },
      {
        kind: "truefalse",
        text: "„On the other hand“ can open a text.",
        options: ["True", "False"],
        answer: 1,
        explain: "„„on the other hand“ only works if a first hand has already been given.“",
      },
      {
        kind: "gapfill",
        text: "___ the distance, I take my bicycle.",
        options: [],
        answer: 0,
        accept: ["Despite", "despite"],
        explain: "„Despite the distance, I take my bicycle.“",
      },
      {
        kind: "order",
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The city is busy; on the other hand, it is never lonely.",
          "Despite the distance, I take my bicycle.",
          "The air is clean there; in contrast, here it is not.",
          "Which one I choose says more about the page.",
        ],
        explain: "Metnin kendi sırası: cümlecik, isim, rapor dili, en sonda kural.",
      },
      {
        kind: "short_answer",
        text: "What does the writer write in a letter?",
        options: [],
        answer: 0,
        accept: ["although", "she writes although", "the word although"],
        explain: "„In a letter I write „although“.“",
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
    title: "Naming a feeling",
    genre: "dialogue",
    intro: "Duyguyu adlandırmak. Hangi cümle çizgi, hangisi nokta?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "either", tr: "ikisinden biri" },
      { de: "honest", tr: "dürüst" },
      { de: "a line", tr: "çizgi" },
      { de: "a point", tr: "nokta" },
      { de: "out loud", tr: "sesli olarak" },
      { de: "instead of", tr: "yerine" },
      { de: "tired", tr: "yorgun" },
      { de: "sleep", tr: "uyku" },
      { de: "finally", tr: "sonunda" },
      { de: "such", tr: "böylesi" },
      { de: "the shape", tr: "biçim" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Elif", text: "My mood has been low since Monday. The honest part of that sentence is that I know the day." },
      { speaker: "Poyraz", text: "Does knowing the day help?" },
      { speaker: "Elif", text: "It helps more than anything else. The feeling started when she left, which is a moment, and „started“ is the right form for a moment." },
      { speaker: "Poyraz", text: "And the mood is not a moment." },
      { speaker: "Elif", text: "The mood is a line. „Has been low since Monday“ — it began then and it is still here, and English wants the perfect for exactly that shape." },
      { speaker: "Poyraz", text: "So one story, two forms, because one of them is a point and the other is a line." },
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
        text: "Which form does a moment take?",
        options: ["started", "has been", "is starting"],
        answer: 0,
        explain: "„The feeling started when she left, which is a moment, and „started“ is the right form for a moment.“",
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
        explain: "„Because „tired“ asks for sleep and „sad“ asks for a person.“",
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
    title: "Looking back",
    genre: "monologue",
    intro: "Geriye bakış. Hangi olay önce oldu?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "event", tr: "olay" },
      { de: "halves", tr: "yarılar" },
      { de: "whole", tr: "bütün" },
      { de: "faded", tr: "soldu" },
      { de: "carried", tr: "taşıdı" },
      { de: "a deadline", tr: "son tarih" },
      { de: "lied", tr: "yalan söyledi" },
      { de: "guilt", tr: "suçluluk" },
      { de: "the kitchen", tr: "mutfak" },
      { de: "an apology", tr: "özür" },
      { de: "strange", tr: "tuhaf" },
      { de: "reach for", tr: "uzanmak" },
      { de: "both shapes", tr: "iki biçim" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Naz", text: "By the time I understood, the memory had faded. That is the sentence I have carried for eleven years." },
      { speaker: "Naz", text: "„By the time“ does not name an event. It names a deadline, and the thing that happened before it has to be in the past perfect." },
      { speaker: "Naz", text: "I had hurt her before I noticed. Both halves are mine, and the order is the whole story: the hurting came first and the noticing years later." },
      { speaker: "Naz", text: "They had kept the secret for years before anyone asked a question. Nobody lied. Nobody was asked." },
      { speaker: "Naz", text: "Regret is a strange word in English, because it takes both shapes. „I regret saying it“ is about a thing I did; „I regret to say“ is about a thing I am doing now." },
      { speaker: "Naz", text: "The first one is mine. There were tears and there was a shout in a kitchen, and I remember the kitchen better than the sentence." },
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
        accept: ["the kitchen", "kitchen", "not the sentence"],
        explain: "„I remember the kitchen better than the sentence.“",
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
    title: "By the time I understood, the memory had faded",
    genre: "opinion",
    intro: "Geçmişin iki katmanı. Hangi cümlede „had“ zorunlu?",
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
        prompt: "Sıra kartını doldur.",
        facts: "Yol yapılmadan önce tarla; çiftlik önce kapandı; orman fark edilmeden kesildi; „by the time“ seçenek bırakmıyor.",
        fields: [
          { label: "Before the road", answer: "a field", accept: ["field"] },
          { label: "The farm", answer: "had closed", accept: ["closed first"] },
          { label: "The forest", answer: "had cut", accept: ["they had cut it"] },
          { label: "By the time", answer: "past perfect", accept: ["had faded"] },
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
    title: "Despite the distance, I take my bicycle",
    genre: "opinion",
    intro: "Karşıtlığın üç biçimi ve duygunun iki zamanı.",
    gloss: [
      { de: "despite", tr: "rağmen" },
      { de: "on the other hand", tr: "öte yandan" },
      { de: "in contrast", tr: "buna karşılık" },
      { de: "has been low", tr: "düşük" },
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
        tr: "Ruh hâlim pazartesiden beri düşük.",
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
