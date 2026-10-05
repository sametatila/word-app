import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 17 — "Şenlik nedir, hiç böyle bir infial olmadı,
 * açılışa kadar, ikinci perde".
 *
 * Dört ders: What the festival is · Never such an outrage ·
 * By the opening · The second act.
 *
 *   Kelime: custom, interpretation, varied, entertaining, idiom, defeat,
 *           outrage, supporter, grandstand, archive, approval, commission,
 *           preserve, documentation, hasty, shortcoming, revealing,
 *           undisputed, persistence.
 *   Kalıp:  The folk festival, which keeps an old custom, is free. ·
 *           The dress, which is a traditional costume, is new. ·
 *           My aunt, whose interpretation is varied, dances first. ·
 *           Never has a defeat caused such outrage. ·
 *           Rarely does a supporter leave the grandstand early. ·
 *           Only after the final do they cheer on the rest. ·
 *           By June we will have archived the letters. ·
 *           Next month we will be waiting for approval. ·
 *           By autumn we will have decided to commission the work. ·
 *           The ending must have been hasty. ·
 *           They can't have missed the shortcoming. ·
 *           We should have noticed the revealing line.
 *
 * Ünitenin tek öğretme noktası „WHICH IS“ DÜŞÜYOR. Virgüllü (fazladan)
 * bir ilgi cümlesinde „which is“ ya da „who is“ silinebiliyor ve geriye
 * ismin yanında ismi açıklayan bir öbek kalıyor: „The dress, a traditional
 * costume, is new“. Silme yalnız „be“ye kadar uzanıyor — „which keeps“
 * silinmiyor, „whose“ silinmiyor, ve seçim yapan (virgülsüz) cümlecikte
 * hiç olmuyor.
 */
export const enB2U17: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u17-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 17,
    title: "A village harvest festival",
    genre: "article",
    intro: "Bir köyün hasat şenliğini anlatan yazı. Şenlikte neler oluyor, kim ne yapıyor?",
    gloss: [
      { de: "east", tr: "doğu" },
      { de: "pick", tr: "toplamak" },
      { de: "a cherry", tr: "kiraz" },
      { de: "a fig", tr: "incir" },
      { de: "a basket", tr: "sepet" },
      { de: "the harvest", tr: "hasat" },
      { de: "an association", tr: "dernek" },
      { de: "has sewn", tr: "dikmiş" },
      { de: "embroidery", tr: "nakış" },
      { de: "a dancer", tr: "dansçı" },
      { de: "a drum", tr: "davul" },
      { de: "a schoolyard", tr: "okul bahçesi" },
      { de: "serve", tr: "sunmak" },
      { de: "a mayor", tr: "belediye başkanı" },
      { de: "declare", tr: "ilan etmek" },
    ],
    minutes: 9,
    text:
      "THE HARVEST FESTIVAL IN KIRAZ\n" +
      "Every September the village of Kiraz, which lies two hours east of Izmir, doubles in size for one weekend. The folk festival, which keeps an old custom, is free, and it has been free for as long as anyone can remember.\n" +
      "The custom is simple. On Saturday morning the families, who have picked cherries and figs all summer, carry the last baskets to the square. The mayor, a farmer himself, tastes the first fig and declares the harvest over. Then the music starts.\n" +
      "Most visitors come for the dancing. The dress, which is a traditional costume, is new this year: the women's association, which has sewn the costumes by hand since 1985, finally replaced the old ones. The colors are brighter, the embroidery is finer, and the older women say it looks exactly like the dresses their grandmothers wore.\n" +
      "My aunt, whose interpretation is varied, dances first. She never dances the same steps twice, and the younger dancers, who learned everything from her, try to follow her and laugh when they fail. Her husband, a quiet man, plays the drum and watches only her.\n" +
      "On Sunday there is a market, which is the most entertaining part for children, and a long lunch in the schoolyard. The food, which the families cook together, is served on long tables, and nobody pays for it.\n" +
      "If you go, take the early bus. The last one leaves at six, and the evening, which is the best part of the festival, does not start until eight.",
    questions: [
      {
        text: "How much does the festival cost?",
        options: ["nothing", "a few euros", "only the lunch"],
        answer: 0,
        explain: "„The folk festival, which keeps an old custom, is free…“",
      },
      {
        text: "Who declares the harvest over?",
        options: ["the mayor", "the aunt", "the dancers"],
        answer: 0,
        explain: "„The mayor, a farmer himself, tastes the first fig and declares the harvest over.“",
      },
      {
        kind: "truefalse",
        text: "The new costumes were sewn by hand.",
        options: ["True", "False"],
        answer: 0,
        explain: "„which has sewn the costumes by hand since 1985, finally replaced the old ones.“",
      },
      {
        kind: "gapfill",
        text: "My aunt, whose interpretation is ___, dances first.",
        options: [],
        answer: 0,
        accept: ["varied"],
        explain: "„My aunt, whose interpretation is varied, dances first.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The families carry the last baskets to the square.",
          "The music starts.",
          "There is a market on Sunday.",
          "The last bus leaves at six.",
        ],
        explain: "Cumartesi sabahı hasat, ardından müzik, pazar günü pazar yeri, en sonda yol bilgisi.",
      },
      {
        kind: "short_answer",
        text: "When does the last bus leave?",
        options: [],
        answer: 0,
        accept: ["at six", "six", "at 6"],
        explain: "„The last one leaves at six…“",
      },
    ],
  },
  {
    id: "en-b2-u17-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 17,
    title: "A hasty ending",
    genre: "review",
    intro: "Yeni bir oyunun eleştirisi. Eleştirmen neyi beğeniyor, neyi beğenmiyor?",
    gloss: [
      { de: "a character", tr: "karakter" },
      { de: "a rehearsal", tr: "prova" },
      { de: "an explanation", tr: "açıklama" },
      { de: "gorgeous", tr: "göz alıcı" },
      { de: "deserve", tr: "hak etmek" },
      { de: "every bit", tr: "her zerresi" },
      { de: "a scene", tr: "sahne" },
      { de: "the interval", tr: "ara" },
      { de: "designed", tr: "tasarlanmış" },
      { de: "rush through", tr: "aceleyle geçmek" },
    ],
    minutes: 9,
    text:
      "THE SECOND ACT LETS IT DOWN\n" +
      "The Commission, the new play at the City Theater, starts better than anything I have seen this year. The first act is sharp, funny and full of small, revealing moments. Then the second act arrives, and something goes wrong.\n" +
      "The ending must have been hasty. Two characters who have not spoken for an hour suddenly solve everything in five minutes, and a line that the whole evening had been building toward is given to the wrong person. The writer must have run out of time, or the director must have cut twenty minutes in the last week of rehearsals. There is no other explanation.\n" +
      "The actors can't have missed the shortcoming. You can see it in their faces: Megan Akar, who plays the mother, rushes through her last speech as if she wants to get off the stage. She can't have been happy with it, and she should not have had to carry it alone.\n" +
      "It is not all bad news. The set is gorgeous, the music is well chosen, and the first act deserves every bit of praise it has received.\n" +
      "But the theater should have given this play two more weeks. And we should have noticed the revealing line in the first scene, too, when the father says that nothing in this house ends the way it should. He was right, and the play did not end well either.\n" +
      "Go for the first act. Leave at the interval if you like; you will not have missed much.",
    questions: [
      {
        text: "What does the reviewer think of the first act?",
        options: ["It is sharp and funny.", "It is too long.", "It is hasty."],
        answer: 0,
        explain: "„The first act is sharp, funny and full of small, revealing moments.“",
      },
      {
        text: "Who plays the mother?",
        options: ["Megan Akar", "the director", "the writer"],
        answer: 0,
        explain: "„Megan Akar, who plays the mother, rushes through her last speech…“",
      },
      {
        kind: "truefalse",
        text: "The reviewer thinks the set is badly designed.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The set is gorgeous, the music is well chosen…“",
      },
      {
        kind: "gapfill",
        text: "The ending must have been ___.",
        options: [],
        answer: 0,
        accept: ["hasty"],
        explain: "„The ending must have been hasty.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The first act is sharp and funny.",
          "Two characters solve everything in five minutes.",
          "The set is gorgeous.",
          "Leave at the interval if you like.",
        ],
        explain: "Güçlü başlangıç, aceleye gelmiş son, olumlu yanlar, en sonda öneri.",
      },
      {
        kind: "short_answer",
        text: "How much more time should the theater have given the play?",
        options: [],
        answer: 0,
        accept: ["two more weeks", "two weeks"],
        explain: "„But the theater should have given this play two more weeks.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u17-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 17,
    title: "A phone-in after the defeat",
    genre: "dialogue",
    intro: "Ağır bir yenilginin ardından radyoya bağlanan bir taraftar. Stadyumda neler olmuş?",
    gloss: [
      { de: "a stadium", tr: "stadyum" },
      { de: "fourth", tr: "dördüncü" },
      { de: "the whistle", tr: "düdük" },
      { de: "a listener", tr: "dinleyici" },
      { de: "a player", tr: "oyuncu" },
      { de: "a defender", tr: "defans oyuncusu" },
      { de: "panic", tr: "paniğe kapılmak" },
      { de: "a match", tr: "maç" },
      { de: "anyway", tr: "yine de" },
      { de: "a supporter", tr: "taraftar" },
      { de: "a season ticket", tr: "kombine bilet" },
      { de: "an injury", tr: "sakatlık" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Jacob", text: "Good evening, this is Sports Talk, and the phones have not stopped ringing. Never has a defeat caused such outrage in this city. Amelia, you were at the stadium. Go ahead." },
      { speaker: "Amelia", text: "Thanks, Jacob. Five goals at home. Never have I seen our team play so badly, and I have had a season ticket for twenty years." },
      { speaker: "Jacob", text: "What was the mood in the grandstand?" },
      { speaker: "Amelia", text: "Angry, then silent. Rarely does a supporter leave the grandstand early, but by the fourth goal half the seats were empty." },
      { speaker: "Jacob", text: "Did you stay?" },
      { speaker: "Amelia", text: "I stayed. Only after the final whistle did the loyal ones cheer on the rest of the team, and I was one of them." },
      { speaker: "Jacob", text: "Some listeners say the coach should go." },
      { speaker: "Amelia", text: "Not so fast. Not once this season has he blamed the players, and that counts for something." },
      { speaker: "Jacob", text: "So what went wrong?" },
      { speaker: "Amelia", text: "Injuries, mostly. Seldom has a team lost three defenders in one month. Under no circumstances should we panic now." },
      { speaker: "Jacob", text: "Strong words. And the next match?" },
      { speaker: "Amelia", text: "Saturday, away. Rarely do we win there, but I will be in the away section anyway." },
      { speaker: "Jacob", text: "Amelia, thank you. Next caller, you are on Sports Talk." },
    ],
    questions: [
      {
        text: "How long has Amelia had a season ticket?",
        options: ["twenty years", "one season", "five years"],
        answer: 0,
        explain: "„I have had a season ticket for twenty years.“",
      },
      {
        text: "According to Amelia, what went wrong?",
        options: ["injuries", "the coach", "the supporters"],
        answer: 0,
        explain: "„Injuries, mostly.“",
      },
      {
        kind: "truefalse",
        text: "Half the seats were empty by the fourth goal.",
        options: ["True", "False"],
        answer: 0,
        explain: "„by the fourth goal half the seats were empty.“",
      },
      {
        kind: "gapfill",
        text: "Rarely does a supporter leave the ___ early.",
        options: [],
        answer: 0,
        accept: ["grandstand"],
        explain: "„Rarely does a supporter leave the grandstand early…“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Never has a defeat caused such outrage in this city.", "Never has a defeat caused such outrage in this city"],
        explain: "„has“ özneden öne geçiyor; fiilin gerisi yerinde kalıyor.",
      },
      {
        kind: "short_answer",
        text: "When is the next match?",
        options: [],
        answer: 0,
        accept: ["on Saturday", "Saturday"],
        explain: "„Saturday, away.“",
      },
    ],
  },
  {
    id: "en-b2-u17-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 17,
    title: "Archiving the letters",
    genre: "monologue",
    intro: "Şenlik arşivi ve sergi için haftalık güncelleme. Hangi iş ne zaman bitmiş olacak?",
    gloss: [
    ],
    minutes: 7,
    segments: [
      { speaker: "Darcy", text: "Hello everyone, this is Darcy with the weekly update on the festival archive and the exhibition that opens in September." },
      { speaker: "Darcy", text: "First, the good news. By June we will have archived the letters. That is almost four hundred letters from the families who started the festival in the fifties." },
      { speaker: "Darcy", text: "The photographs will take longer. By the end of July we will have scanned about half of them, and the rest will have been done by the middle of August." },
      { speaker: "Darcy", text: "Next month we will be waiting for approval. The city council has to agree to the exhibition budget, and until then we cannot order the display cases." },
      { speaker: "Darcy", text: "By fall we will have decided to commission the work, or not. I mean the large painting of the square, which the committee has been discussing since March." },
      { speaker: "Darcy", text: "The documentation is going well. Two students will be working with us over the summer, and they will be preserving the old costumes and writing the labels." },
      { speaker: "Darcy", text: "One warning: in the first week of August I will be traveling, so please send any questions before the end of July." },
      { speaker: "Darcy", text: "By the opening we will have been working on this for two years. I think it will be worth it. Thanks, everyone." },
    ],
    questions: [
      {
        text: "How many letters are there?",
        options: ["almost four hundred", "about fifty", "two hundred"],
        answer: 0,
        explain: "„That is almost four hundred letters from the families who started the festival in the fifties.“",
      },
      {
        text: "What will the two students do?",
        options: ["preserve the costumes and write the labels", "scan the photographs", "paint the square"],
        answer: 0,
        explain: "„they will be preserving the old costumes and writing the labels.“",
      },
      {
        kind: "truefalse",
        text: "The display cases can be ordered now.",
        options: ["True", "False"],
        answer: 1,
        explain: "„until then we cannot order the display cases.“",
      },
      {
        kind: "gapfill",
        text: "By June we will have ___ the letters.",
        options: [],
        answer: 0,
        accept: ["archived"],
        explain: "„By June we will have archived the letters.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Next month we will be waiting for approval.", "Next month we will be waiting for approval"],
        explain: "İşin içinde olmak: sürekli biçim, denetimimizde olmayan iş.",
      },
      {
        kind: "short_answer",
        text: "When should questions be sent?",
        options: [],
        answer: 0,
        accept: ["before the end of July", "by the end of July", "in July"],
        explain: "„please send any questions before the end of July.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u17-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 17,
    title: "A folk festival",
    genre: "info",
    intro: "Köy şenliğini tanıtan bir yazı için cümleler ve bir bilgi kartı.",
    gloss: [
      { de: "which is", tr: "olan" },
      { de: "which keeps", tr: "sürdüren" },
      { de: "whose interpretation", tr: "yorumlaması olan" },
      { de: "hasty", tr: "aceleye gelmiş" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Yöresel kıyafet olan elbise yeni.",
        answer: "The dress, which is a traditional costume, is new.",
        hint: "„which is“ buradan silinebilir; virgüller şart.",
      },
      {
        kind: "build",
        tr: "Eski bir göreneği sürdüren halk şenliği ücretsiz.",
        answer: "The folk festival, which keeps an old custom, is free.",
        hint: "„keeps“ silinmiyor; silme yalnız „be“ye kadar uzanıyor.",
      },
      {
        kind: "build",
        tr: "Yorumlaması çeşit çeşit olan teyzem ilk o dans ediyor.",
        answer: "My aunt, whose interpretation is varied, dances first.",
        hint: "„whose“ iyelik taşıyor; silinecek bir şey yok.",
      },
      {
        kind: "build",
        tr: "Son aceleye gelmiş olmalı.",
        answer: "The ending must have been hasty.",
        hint: "Çıkarım: kanıt tek bir açıklama bırakıyor.",
      },
      {
        kind: "form",
        prompt: "Şenlik için bilgi kartını doldur.",
        facts: "Kiraz köyünün halk şenliği eylülde yapılıyor ve ücretsiz; yöresel kıyafetler bu yıl yeni; ilk dansı teyzem yapıyor; son otobüs altıda kalkıyor.",
        fields: [
          { label: "Month", answer: "September", accept: ["in September"] },
          { label: "Price", answer: "free", accept: ["it is free", "nothing"] },
          { label: "Costumes", answer: "new this year", accept: ["new"] },
          { label: "First dancer", answer: "my aunt", accept: ["the aunt", "aunt"] },
          { label: "Last bus", answer: "at six", accept: ["six", "6:00"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u17-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 17,
    title: "Fans in the grandstand",
    genre: "opinion",
    intro: "Maçtan sonra taraftar sayfasına ve arşiv planına yazılacak cümleler.",
    gloss: [
      { de: "never has", tr: "hiç olmadı" },
      { de: "rarely does", tr: "nadiren" },
      { de: "only after the final", tr: "ancak finalden sonra" },
      { de: "will have archived", tr: "arşivlemiş olacak" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Bir yenilgi hiç bu kadar infial yaratmadı.",
        answer: "Never has a defeat caused such outrage.",
        hint: "„has“ özneden öne geçiyor.",
      },
      {
        kind: "build",
        tr: "Bir destekçi tribünü nadiren erken terk eder.",
        answer: "Rarely does a supporter leave the grandstand early.",
        hint: "„does“ geliyor; ana fiil çekimini kaybediyor.",
      },
      {
        kind: "build",
        tr: "Ancak finalden sonra gerisini tezahüratla destekliyorlar.",
        answer: "Only after the final do they cheer on the rest.",
        hint: "Parçacık „on“ fiille kalıyor; yalnız yardımcı fiil öne geçiyor.",
      },
      {
        kind: "build",
        tr: "Hazirana kadar mektupları arşivlemiş olacağız.",
        answer: "By June we will have archived the letters.",
        hint: "Gelecekte bir tarihten geriye bakış.",
      },
      {
        kind: "build",
        tr: "Eksikliği kaçırmış olamazlar.",
        answer: "They can't have missed the shortcoming.",
        hint: "Olumsuzu „can't have“.",
      },
    ],
  },
];
