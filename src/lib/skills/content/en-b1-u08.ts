import type { SkillExercise } from "../types";

/**
 * EN · B1 · Ünite 8 — "Kurallar, deneyim, kişi betimleme, yer betimleme".
 *
 * Dört ders: The rules here · What I have done ·
 * The one with the glasses · The place where I grew up.
 *
 *   Kelime: member, allowed, forbidden, permission, strict, warn, penalty,
 *           behave, abroad, volunteer, internship, gain, recently, ever,
 *           challenge, succeed, appearance, tall, beard, glasses, friendly,
 *           quiet, personality, wear, village, coast, valley, crowded,
 *           peaceful, tourist, scenery, hill.
 *   Kalıp:  You must show your card at the door. ·
 *           You mustn't bring food inside. ·
 *           You should ask for permission first. ·
 *           I have worked abroad for two years. ·
 *           I volunteered at a school last summer. ·
 *           Have you ever led a team? ·
 *           He is the man who wears glasses. ·
 *           She is the one I met yesterday. ·
 *           That is the woman whose car is outside. ·
 *           This is the village where I grew up. ·
 *           It is a place that tourists love. ·
 *           The town, which is on the coast, is small.
 *
 * Ünitenin tek öğretme noktası VİRGÜLLÜ VE VİRGÜLSÜZ SIFAT CÜMLESİ.
 * „The town which is on the coast is small“ birçok kasaba arasından birini
 * seçiyor; „The town, which is on the coast, is small“ kasabayı zaten
 * belirlemiş, virgüller arası yalnızca ek bilgi. İki virgül anlamı
 * değiştiriyor — B1'in en sessiz ama en pahalı ayrımı. Yanında „whose“
 * geliyor: iyelik ilgi adılı, kişide de nesnede de aynı.
 */
export const enB1U08: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-u8-r1",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 8,
    title: "The place where I grew up",
    genre: "story",
    intro: "Kıyıda küçük bir köy. İki virgül ne değiştiriyor?",
    gloss: [
      { de: "grew up", tr: "büyüdüm" },
      { de: "in between", tr: "arada" },
      { de: "winter", tr: "kış" },
      { de: "middle", tr: "orta" },
      { de: "comma", tr: "virgül" },
      { de: "matters", tr: "önemli" },
      { de: "sentence", tr: "cümle" },
    ],
    minutes: 7,
    text:
      "This is the village where I grew up. Four hundred people in winter, two thousand in August, and one road in between.\n" +
      "It is a place that tourists love for eleven days a year. They arrive in the last week of July, they photograph the same three houses on the hill, and by the middle of August the scenery is the only thing left.\n" +
      "The town, which is on the coast, is small. That comma matters. If I wrote „the town which is on the coast“, I would be choosing one town from several, and there is only one. The commas say: you already know which town, and here is something extra about it.\n" +
      "The valley behind the village is the peaceful part. Nobody photographs it because there is nothing in it: grass, a river, and the road to the next village where my grandmother was born.\n" +
      "The crowded weeks pay for the quiet ones. I understood that late, at about twenty-five, and my father said one sentence: we are not tired of them, we are tired in August.\n" +
      "I live in a city now and I go back twice a year. Never in August.",
    questions: [
      {
        text: "How many people live in the village in winter?",
        options: ["four hundred", "two thousand", "twenty-five"],
        answer: 0,
        explain: "„Four hundred people in winter, two thousand in August…“",
      },
      {
        text: "What do the two commas say?",
        options: ["you already know which town", "there are several towns", "the town is new"],
        answer: 0,
        explain: "„The commas say: you already know which town, and here is something extra about it.“",
      },
      {
        kind: "truefalse",
        text: "Tourists photograph the valley.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Nobody photographs it because there is nothing in it…“",
      },
      {
        kind: "gapfill",
        text: "The writer goes back ___ a year.",
        options: [],
        answer: 0,
        accept: ["twice", "two times"],
        explain: "„I live in a city now and I go back twice a year. Never in August.“",
      },
      {
        kind: "order",
        text: "Yazının sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "This is the village where I grew up.",
          "It is a place that tourists love.",
          "The valley behind the village is the peaceful part.",
          "I go back twice a year.",
        ],
        explain: "Köy, turistler, vadi, bugün.",
      },
      {
        kind: "short_answer",
        text: "What did the father say about August?",
        options: [],
        answer: 0,
        accept: ["we are tired in August", "tired in August", "not tired of them"],
        explain: "„we are not tired of them, we are tired in August.“",
      },
    ],
  },
  {
    id: "en-b1-u8-r2",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 8,
    title: "The rules here",
    genre: "info",
    intro: "Üye kuralları. Hangisi zorunlu, hangisi yasak, hangisi öğüt?",
    gloss: [
      { de: "sign in", tr: "kayıt olmak" },
      { de: "on the wall", tr: "duvarda" },
      { de: "twice in a row", tr: "üst üste iki kez" },
      { de: "rather", tr: "tercihen" },
    ],
    minutes: 7,
    text:
      "For members, and for the people who bring them.\n" +
      "You must show your card at the door. Every time, also on the days when the person at the desk knows you. The rule is not about you; it is about the evening when somebody else is at the desk.\n" +
      "You mustn't bring food inside. Water in a bottle is fine. The reason is on the wall in one line: the room was repaired twice in four years and both times it was food.\n" +
      "You should ask for permission first if you want to bring a guest. Not must — should. Nobody has ever said no, but the room has twenty seats and the person who asks on Tuesday gets one.\n" +
      "Members who do not sign in are warned once. The second time there is a penalty of five euros, which goes into the coffee box and has paid for the coffee since March.\n" +
      "One more thing, and it is not a rule. If somebody behaves badly here twice in a row, three people will talk to them before anybody writes anything down. That has worked every time so far, and we would rather keep it that way.",
    questions: [
      {
        text: "When must you show your card?",
        options: ["every time", "only on Tuesday", "when you bring a guest"],
        answer: 0,
        explain: "„You must show your card at the door. Every time…“",
      },
      {
        text: "Why is food forbidden?",
        options: ["the room was repaired twice", "the room is too small", "it is expensive"],
        answer: 0,
        explain: "„the room was repaired twice in four years and both times it was food.“",
      },
      {
        kind: "truefalse",
        text: "You must ask before you bring a guest.",
        options: ["True", "False"],
        answer: 1,
        explain: "„You should ask for permission first … Not must — should.“",
      },
      {
        kind: "gapfill",
        text: "The penalty is ___ euros.",
        options: [],
        answer: 0,
        accept: ["five", "5"],
        explain: "„The second time there is a penalty of five euros…“",
      },
      {
        kind: "short_answer",
        text: "Where does the penalty money go?",
        options: [],
        answer: 0,
        accept: ["the coffee box", "into the coffee box", "coffee"],
        explain: "„…which goes into the coffee box and has paid for the coffee since March.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-u8-l1",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 8,
    title: "The one with the glasses",
    genre: "dialogue",
    intro: "Fotoğrafta kim kim? Betimlemeler nasıl kuruluyor?",
    gloss: [
      { de: "whose", tr: "kimin" },
      { de: "row", tr: "sıra" },
      { de: "in the middle", tr: "ortada" },
      { de: "whole", tr: "bütün" },
      { de: "character", tr: "karakter" },
      { de: "the fifth", tr: "beşinci" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Sena", text: "Who is who in this photo? I met four of them last week and I remember two." },
      { speaker: "Mert", text: "Start on the left." },
      { speaker: "Sena", text: "He is the man who wears glasses. Tall, quiet, said about nine words all evening." },
      { speaker: "Mert", text: "That is Deniz. Nine words is a good evening for Deniz." },
      { speaker: "Sena", text: "And she is the one I met yesterday, in the middle of the second row." },
      { speaker: "Mert", text: "Ela. She runs the whole thing and nobody outside the team knows it." },
      { speaker: "Sena", text: "That is the woman whose car is outside. The blue one with the broken light." },
      { speaker: "Mert", text: "Nil. The car has been broken for a year and she says it gives her character." },
      { speaker: "Sena", text: "The friendly one with the beard?" },
      { speaker: "Mert", text: "Can. He is friendly for the first two hours. After that he is honest, which is better." },
      { speaker: "Sena", text: "And the fifth person?" },
      { speaker: "Mert", text: "That is me. Behind the man who wears glasses, so you can see half of my face." },
      { speaker: "Sena", text: "Which half?" },
      { speaker: "Mert", text: "The one that was not talking." },
    ],
    questions: [
      {
        text: "Who is Deniz?",
        options: ["the man who wears glasses", "the woman in the second row", "the one with the beard"],
        answer: 0,
        explain: "„He is the man who wears glasses. Tall, quiet…“",
      },
      {
        text: "Whose car is outside?",
        options: ["Nil's", "Ela's", "Can's"],
        answer: 0,
        explain: "„that is the woman whose car is outside. The blue one with the broken light. — Nil.“",
      },
      {
        kind: "truefalse",
        text: "Everybody outside the team knows that Ela runs it.",
        options: ["True", "False"],
        answer: 1,
        explain: "„She runs the whole thing and nobody outside the team knows it.“",
      },
      {
        kind: "gapfill",
        text: "Nil's car has been broken for a ___.",
        options: [],
        answer: 0,
        accept: ["year"],
        explain: "„The car has been broken for a year and she says it gives her character.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["That is the woman whose car is outside.", "That is the woman whose car is outside"],
        explain: "„whose“ iyelik ilgi adılı: kimin arabası olduğunu bağlıyor.",
      },
      {
        kind: "short_answer",
        text: "Where is Mert in the photo?",
        options: [],
        answer: 0,
        accept: ["behind Deniz", "behind the man with glasses", "at the back"],
        explain: "„Behind the man who wears glasses, so you can see half of my face.“",
      },
    ],
  },
  {
    id: "en-b1-u8-l2",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 8,
    title: "What I have done",
    genre: "interview",
    intro: "Deneyim soruları. Hangi cevap tarihli, hangisi tarihsiz?",
    gloss: [
      { de: "led", tr: "yönettim" },
      { de: "hand it over", tr: "devretmek" },
      { de: "title", tr: "unvan" },
      { de: "whether", tr: "olup olmadığı" },
      { de: "system", tr: "sistem" },
      { de: "terrible", tr: "berbat" },
      { de: "spend", tr: "geçirmek" },
      { de: "built", tr: "kurmuştum" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Boss", text: "Tell me about your experience outside this country." },
      { speaker: "Nil", text: "I have worked abroad for two years. Poland, in a team of six." },
      { speaker: "Boss", text: "And before that?" },
      { speaker: "Nil", text: "An internship here, and I volunteered at a school last summer. Three weeks, thirty children, no phone." },
      { speaker: "Boss", text: "Have you ever led a team?" },
      { speaker: "Nil", text: "Not with the title. I led one for five months when my manager was ill, and nobody called it that." },
      { speaker: "Boss", text: "What did you gain from those five months?" },
      { speaker: "Nil", text: "One thing: I stopped answering questions that were not mine to answer." },
      { speaker: "Boss", text: "Give me an example." },
      { speaker: "Nil", text: "Somebody asked me on day three whether we would keep the old system. I said I did not know and I would ask. That was the right answer and it felt terrible." },
      { speaker: "Boss", text: "Most people say yes on day three." },
      { speaker: "Nil", text: "Most people say yes and then spend April explaining it." },
      { speaker: "Boss", text: "And the biggest challenge?" },
      { speaker: "Nil", text: "Handing it back. The manager returned and I had built things. I had to hand it over in one week and say nothing about the parts I liked." },
    ],
    questions: [
      {
        text: "How long has Nil worked abroad?",
        options: ["two years", "five months", "three weeks"],
        answer: 0,
        explain: "„I have worked abroad for two years. Poland, in a team of six.“",
      },
      {
        text: "What did Nil learn in the five months?",
        options: ["not to answer questions that were not mine", "to say yes quickly", "to write a summary"],
        answer: 0,
        explain: "„I stopped answering questions that were not mine to answer.“",
      },
      {
        kind: "truefalse",
        text: "Nil had the title.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Not with the title. I led one for five months … and nobody called it that.“",
      },
      {
        kind: "gapfill",
        text: "Nil volunteered at a school for ___ weeks.",
        options: [],
        answer: 0,
        accept: ["three", "3"],
        explain: "„…I volunteered at a school last summer. Three weeks, thirty children, no phone.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I have worked abroad for two years.", "I have worked abroad for two years"],
        explain: "Tarih verilmiyor ve deneyim şimdi sayılıyor: present perfect.",
      },
      {
        kind: "short_answer",
        text: "What was the biggest challenge?",
        options: [],
        answer: 0,
        accept: ["handing it back", "the handover", "giving it back"],
        explain: "„And the biggest challenge? — Handing it back.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-u8-w1",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 8,
    title: "The town, which is on the coast, is small",
    genre: "personal",
    intro: "Virgül anlamı değiştiriyor. Hangisi seçiyor, hangisi ekliyor?",
    gloss: [
      { de: "where I grew up", tr: "büyüdüğüm yer" },
      { de: "whose", tr: "kimin" },
      { de: "on the coast", tr: "kıyıda" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Burası büyüdüğüm köy.",
        answer: "This is the village where I grew up.",
        hint: "„where“ yer için; ismi arkadan tamlıyor ve düşemiyor.",
      },
      {
        kind: "build",
        tr: "Turistlerin sevdiği bir yer.",
        answer: "It is a place that tourists love.",
        hint: "Virgül YOK: birçok yer arasından bunu seçiyor.",
      },
      {
        kind: "build",
        tr: "Kıyıdaki kasaba küçüktür.",
        answer: "The town, which is on the coast, is small.",
        hint: "İki virgül: kasaba zaten belli, arada duran yalnızca ek bilgi.",
      },
      {
        kind: "build",
        tr: "Arabası dışarıda olan kadın o.",
        answer: "That is the woman whose car is outside.",
        hint: "„whose“ iyelik ilgi adılı; „who's“ ile karıştırılmaz.",
      },
      {
        kind: "form",
        prompt: "Köy kartını doldur.",
        facts: "Kışın dört yüz kişi; ağustosta iki bin; vadi sakin kısım; yılda iki kez gidiliyor.",
        fields: [
          { label: "Winter", answer: "four hundred", accept: ["400"] },
          { label: "August", answer: "two thousand", accept: ["2000"] },
          { label: "Quiet part", answer: "the valley", accept: ["valley"] },
          { label: "Visits", answer: "twice a year", accept: ["2 times a year"] },
        ],
      },
    ],
  },
  {
    id: "en-b1-u8-w2",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 8,
    title: "You must show your card at the door",
    genre: "info",
    intro: "Kural, yasak, öğüt ve deneyim. Hangi kip hangi gücü taşıyor?",
    gloss: [
      { de: "must", tr: "zorundasın" },
      { de: "permission", tr: "izin" },
      { de: "ever", tr: "hiç" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Kapıda kartını göstermek zorundasın.",
        answer: "You must show your card at the door.",
        hint: "„must“ kuralın kendisinden geliyor; „have to“ da olurdu ama bu daha sert.",
      },
      {
        kind: "build",
        tr: "İçeri yiyecek getirmemelisin.",
        answer: "You mustn't bring food inside.",
        alternatives: ["You must not bring food inside."],
        hint: "„mustn't“ yasak demek; „don't have to“ olsaydı gerek yok olurdu.",
      },
      {
        kind: "build",
        tr: "Önce izin istemelisin.",
        answer: "You should ask for permission first.",
        hint: "„should“ öğüt; kural değil.",
      },
      {
        kind: "build",
        tr: "İki yıldır yurt dışında çalışıyorum.",
        answer: "I have worked abroad for two years.",
        alternatives: ["I've worked abroad for two years."],
        hint: "Tarih verilmiyor ve süre sürüyor: present perfect.",
      },
      {
        kind: "build",
        tr: "Hiç bir ekip yönettin mi?",
        answer: "Have you ever led a team?",
        hint: "„ever“ deneyim sorusunda; „lead“in üçüncü hâli „led“.",
      },
    ],
  },
];
