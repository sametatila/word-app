import type { SkillExercise } from "../types";

/**
 * EN · B1 · Ünite 25 — "Korkular, sırdaşlık, şükran, ileriye bakış".
 *
 * Dört ders: Fears and worries · What they told me · Being thankful ·
 * Where I want to be. Seviyenin kapanış ünitesi.
 *
 *   Kelime: face, dark, fight, danger, escape, win, lose, later,
 *           friendship, whisper, voice, loyal, respect, excuse, often,
 *           rarely, gift, appreciate, celebrate, generous, hero, example,
 *           word, always, direction, meaning, sense, follow, guide,
 *           develop, model, freedom.
 *   Kalıp:  I decided to face the fear. ·
 *           He avoids walking in the dark. ·
 *           She kept fighting the same worry. ·
 *           She said the friendship was over. ·
 *           He told me not to whisper about it. ·
 *           They asked whether I had heard his voice. ·
 *           The gift was chosen with care. ·
 *           Her work is appreciated by everyone. ·
 *           The day must be celebrated properly. ·
 *           I changed jobs in order to find a direction. ·
 *           The work had meaning; as a result, I stayed. ·
 *           Even though it makes sense, I hesitate.
 *
 * Ünitenin tek öğretme noktası AMAÇ, SONUÇ VE ÖDÜN ÜÇ AYRI İŞ: „in order
 * to“ nedeni öne koyuyor, „as a result“ yalnız geriye bakıyor, „even
 * though“ bir şeyi kabul edip yine de diyor. Yanlışını koyunca cümle
 * yine okunuyor — bu yüzden yakalanması en zor yanlış sınıfı.
 *
 * Ünite aynı zamanda SEVİYENİN KAPANIŞ İPİNİ söylüyor: B1 az sayıda yeni
 * biçim öğretti; öğrettiği şey bilinen biçimlerin İKİNCİ İŞİ oldu — „had“
 * anlatıda ve aktarmada, edilgen olayda haberde ve işleyişte, „must“
 * zorunlulukta ve çıkarımda, „will“ gelecekte ve kanaatte.
 */
export const enB1U25: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-u25-r1",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 25,
    title: "Where I want to be",
    genre: "opinion",
    intro: "Üç bağlaç, üç ayrı iş. Hangisi yalnız geriye bakıyor?",
    gloss: [
      { de: "sentences", tr: "cümleler" },
      { de: "linkers", tr: "bağlayıcılar" },
      { de: "none", tr: "hiçbiri" },
      { de: "backwards", tr: "geriye" },
      { de: "anyway", tr: "yine de" },
      { de: "sentence", tr: "cümle" },
      { de: "larger", tr: "daha büyük" },
      { de: "stands", tr: "duruyor" },
      { de: "itself", tr: "kendisi" },
      { de: "a purpose", tr: "amaç" },
      { de: "an outcome", tr: "sonuç" },
      { de: "concession", tr: "ödün" },
      { de: "admits", tr: "kabul ediyor" },
      { de: "hesitate", tr: "tereddüt etmek" },
      { de: "a conclusion", tr: "çıkarım" },
      { de: "a guess", tr: "tahmin" },
      { de: "the passive", tr: "edilgen" },
      { de: "pointed", tr: "yöneltilmiş" },
      { de: "apart", tr: "ayrı" },
      { de: "hardest", tr: "en zor" },
      { de: "reads", tr: "okunuyor" },
      { de: "a list", tr: "liste" },
    ],
    minutes: 8,
    text:
      "I changed jobs in order to find a direction. The work had meaning; as a result, I stayed. Even though it makes sense, I hesitate. Three sentences, three linkers, and none of them can take another one's place.\n" +
      "„In order to“ gives a purpose: the reason I did it, and the reason came first. „As a result“ gives an outcome: the thing that followed, and it can only look backwards. „Even though“ gives way — it admits one thing and then says the other anyway.\n" +
      "Purpose, outcome, concession. Put the wrong one in and the sentence still reads, which is what makes this the hardest kind of mistake to catch.\n" +
      "There is a larger thing to notice here at the end of the level. Very little of what this level taught was a new shape. „Had“ was already known and it took a second job. The passive was already known and it took a third. „Must“ was a rule and became a conclusion. „Will“ was a future and became a guess.\n" +
      "So the work was not learning more forms. It was learning that a form can be pointed at something else, and that the reader tells the two apart from where the sentence stands and not from the shape itself.\n" +
      "That is the direction I wanted. The freedom in a language is rarely a longer list. It is the second use of something you already have.",
    questions: [
      {
        text: "Which linker can only look backwards?",
        options: ["as a result", "in order to", "even though"],
        answer: 0,
        explain: "„„As a result“ gives an outcome: the thing that followed, and it can only look backwards.“",
      },
      {
        text: "Why is this mistake hard to catch?",
        options: ["the sentence still reads", "the words are long", "there is no rule"],
        answer: 0,
        explain: "„Put the wrong one in and the sentence still reads…“",
      },
      {
        kind: "truefalse",
        text: "This level taught mostly new shapes.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Very little of what this level taught was a new shape.“",
      },
      {
        kind: "gapfill",
        text: "I changed jobs ___ order to find a direction.",
        options: [],
        answer: 0,
        accept: ["in"],
        explain: "„I changed jobs in order to find a direction.“",
      },
      {
        kind: "order",
        text: "Üç bağlacın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "I changed jobs in order to find a direction.",
          "The work had meaning; as a result, I stayed.",
          "Even though it makes sense, I hesitate.",
          "Purpose, outcome, concession.",
        ],
        explain: "Amaç, sonuç, ödün, en sonda üçünün adı.",
      },
      {
        kind: "short_answer",
        text: "What is freedom in a language?",
        options: [],
        answer: 0,
        accept: ["the second use", "a second use", "not a longer list"],
        explain: "„It is the second use of something you already have.“",
      },
    ],
  },
  {
    id: "en-b1-u25-r2",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 25,
    title: "Being thankful",
    genre: "info",
    intro: "Üç edilgen, üç ayrı iş. Hangisinde fail geri geliyor?",
    gloss: [
      { de: "passives", tr: "edilgenler" },
      { de: "sentence", tr: "cümle" },
      { de: "modal", tr: "kip" },
      { de: "decoration", tr: "süs" },
      { de: "sounds", tr: "gibi geliyor" },
      { de: "passive", tr: "edilgen" },
      { de: "genuinely", tr: "gerçekten" },
      { de: "left out", tr: "dışarıda bırakılmış" },
      { de: "precisely", tr: "tam olarak" },
      { de: "the doer", tr: "eyleyen" },
      { de: "optional", tr: "seçimlik" },
      { de: "a decision", tr: "karar" },
      { de: "unimportant", tr: "önemsiz" },
      { de: "unknown", tr: "bilinmeyen" },
      { de: "obvious", tr: "apaçık" },
      { de: "a label", tr: "etiket" },
      { de: "a notice", tr: "duyuru" },
      { de: "a trap", tr: "tuzak" },
      { de: "shorter", tr: "daha kısa" },
      { de: "properly", tr: "gerektiği gibi" },
    ],
    minutes: 7,
    text:
      "The gift was chosen with care. Her work is appreciated by everyone. The day must be celebrated properly. Three passives in three lines, and each of them is doing a different job.\n" +
      "In the first one the person who chose is left out, because the sentence is about the gift. In the second the person is put back in with „by“, because the point of the sentence is precisely who does the appreciating: everyone.\n" +
      "The third has a modal in front of it, and the order never moves: „must“, then „be“, then the third form.\n" +
      "So „by“ is not decoration and it is not optional grammar. It is a decision. Leaving it out says the doer does not matter; putting it in says the doer is the news.\n" +
      "There is a small trap in a letter of thanks. „Your help is appreciated“ sounds generous and is not: nobody is thanking anybody, and the person reading it hears a form letter. „I appreciate your help“ names me and names you, and it is two words shorter.\n" +
      "Use the passive where the doer is genuinely unimportant, unknown or obvious. Use it in a notice, on a label, in a report. In a letter of thanks, be a person; a hero in a story is always somebody with a name.",
    questions: [
      {
        text: "Why is „by everyone“ there?",
        options: ["the doer is the point", "the rule needs it", "the gift is small"],
        answer: 0,
        explain: "„the point of the sentence is precisely who does the appreciating: everyone.“",
      },
      {
        text: "What comes after „must“?",
        options: ["be", "been", "being"],
        answer: 0,
        explain: "„the order never moves: „must“, then „be“, then the third form.“",
      },
      {
        kind: "truefalse",
        text: "„Your help is appreciated“ is the warmer sentence.",
        options: ["True", "False"],
        answer: 1,
        explain: "„„Your help is appreciated“ sounds generous and is not…“",
      },
      {
        kind: "gapfill",
        text: "The gift was ___ with care.",
        options: [],
        answer: 0,
        accept: ["chosen"],
        explain: "„The gift was chosen with care.“",
      },
      {
        kind: "order",
        text: "Üç edilgenin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The gift was chosen with care.",
          "Her work is appreciated by everyone.",
          "The day must be celebrated properly.",
          "So „by“ is not decoration.",
        ],
        explain: "Failsiz, failli, kipli; en sonda kuralın kendisi.",
      },
      {
        kind: "short_answer",
        text: "Where should you use the passive?",
        options: [],
        answer: 0,
        accept: ["in a notice", "on a label", "in a report"],
        explain: "„Use it in a notice, on a label, in a report.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-u25-l1",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 25,
    title: "Fears and worries",
    genre: "dialogue",
    intro: "Bir korkuyla yüzleşme. Hangi fiil mastar istiyor?",
    gloss: [
      { de: "verb", tr: "fiil" },
      { de: "sentence", tr: "cümle" },
      { de: "a map", tr: "harita" },
      { de: "logic", tr: "mantık" },
      { de: "pretends", tr: "öyleymiş gibi yapıyor" },
      { de: "crossed off", tr: "üstünü çizdi" },
      { de: "the route", tr: "güzergâh" },
      { de: "a worry", tr: "endişe" },
      { de: "the saying", tr: "söylemek" },
      { de: "as well", tr: "de" },
      { de: "the infinitive", tr: "mastar" },
      { de: "a course", tr: "kurs" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Derya", text: "I decided to face the fear in March. That was easier to say than to do, and the saying took four months." },
      { speaker: "Onur", text: "What does facing it mean here?" },
      { speaker: "Derya", text: "Walking home. He avoids walking in the dark and I used to as well. The two of us made a small map of streets we would not use." },
      { speaker: "Onur", text: "Why „to face“ but „avoids walking“?" },
      { speaker: "Derya", text: "Because the first verb decides. „Decide“ takes the infinitive; „avoid“ takes the „-ing“. There is no logic in it and every course pretends there is." },
      { speaker: "Onur", text: "And „keep“?" },
      { speaker: "Derya", text: "„-ing“ as well. She kept fighting the same worry for two years, which is the sentence I would put on the door of that room." },
      { speaker: "Onur", text: "Did the map help?" },
      { speaker: "Derya", text: "The map was the danger. Every street we crossed off made the next one worse, and by the summer there were three streets left." },
      { speaker: "Onur", text: "So you lost." },
      { speaker: "Derya", text: "I lost for a year and then I won a small thing: one street, once, in October. Later it was two. The fear did not go; it stopped choosing the route." },
    ],
    questions: [
      {
        text: "When did Derya decide to face the fear?",
        options: ["in March", "in October", "in the summer"],
        answer: 0,
        explain: "„I decided to face the fear in March.“",
      },
      {
        text: "Which verb takes the infinitive?",
        options: ["decide", "avoid", "keep"],
        answer: 0,
        explain: "„„Decide“ takes the infinitive; „avoid“ takes the „-ing“.“",
      },
      {
        kind: "truefalse",
        text: "The map helped.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The map was the danger.“",
      },
      {
        kind: "gapfill",
        text: "By the summer there were ___ streets left.",
        options: [],
        answer: 0,
        accept: ["three", "3"],
        explain: "„by the summer there were three streets left.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["He avoids walking in the dark and I used to as well.", "He avoids walking in the dark and I used to as well"],
        explain: "„avoid“ „-ing“ istiyor; „avoid to walk“ olmaz.",
      },
      {
        kind: "short_answer",
        text: "What did the fear stop doing?",
        options: [],
        answer: 0,
        accept: ["choosing the route", "it stopped choosing", "the route"],
        explain: "„The fear did not go; it stopped choosing the route.“",
      },
    ],
  },
  {
    id: "en-b1-u25-l2",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 25,
    title: "What they told me",
    genre: "monologue",
    intro: "Aktarılan üç cümle, bir dostluk. Hangisinde sıra düzleşiyor?",
    gloss: [
      { de: "whole", tr: "bütün" },
      { de: "speech", tr: "söz" },
      { de: "infinitive", tr: "mastar" },
      { de: "nowhere", tr: "hiçbir yerde" },
      { de: "sounds", tr: "gibi geliyor" },
      { de: "either", tr: "ikisinden biri" },
      { de: "neither", tr: "ikisi de değil" },
      { de: "sentence", tr: "cümle" },
      { de: "one step back", tr: "bir basamak geriye" },
      { de: "marks", tr: "puan" },
      { de: "flat", tr: "düz" },
      { de: "the word order", tr: "sözcük sırası" },
      { de: "argue", tr: "tartışmak" },
      { de: "believe", tr: "inanmak" },
      { de: "warm", tr: "sıcak" },
      { de: "an ending", tr: "bitiş" },
      { de: "stopped using", tr: "kullanmayı bıraktı" },
      { de: "in the first place", tr: "en baştan" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Cemre", text: "She said the friendship was over. In the room she said „it is over“, and by the time I told anyone it had become „was“." },
      { speaker: "Cemre", text: "That one step back is the whole of reported speech, and it costs people more marks than any other rule in this level." },
      { speaker: "Cemre", text: "He told me not to whisper about it. „Told me not to whisper“ — the „not“ sits in front of the infinitive and nowhere else." },
      { speaker: "Cemre", text: "They asked whether I had heard his voice. Not „did I hear“: a reported question goes flat, and „whether“ carries what the word order used to carry." },
      { speaker: "Cemre", text: "Loyal is a word I have stopped using. It sounds like a rule, and a friendship is not a rule; it is a hundred small hours." },
      { speaker: "Cemre", text: "There was an excuse and it was a good one. Good excuses are worse than bad ones, because you cannot argue with them and you cannot believe them either." },
      { speaker: "Cemre", text: "We speak rarely now. Twice a year, and both times it is warm and neither time is close." },
      { speaker: "Cemre", text: "What I respect is that she said it out loud. Most of these endings are never reported at all, because nobody ever says the sentence in the first place." },
    ],
    questions: [
      {
        text: "What did she say in the room?",
        options: ["it is over", "it was over", "it is not over"],
        answer: 0,
        explain: "„In the room she said „it is over“, and by the time I told anyone it had become „was“.“",
      },
      {
        text: "What carries the work of the word order?",
        options: ["whether", "did", "not"],
        answer: 0,
        explain: "„a reported question goes flat, and „whether“ carries what the word order used to carry.“",
      },
      {
        kind: "truefalse",
        text: "Cemre still uses the word „loyal“.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Loyal is a word I have stopped using.“",
      },
      {
        kind: "gapfill",
        text: "We speak ___ now. Twice a year.",
        options: [],
        answer: 0,
        accept: ["rarely"],
        explain: "„We speak rarely now. Twice a year…“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["He told me not to whisper about it.", "He told me not to whisper about it"],
        explain: "Aktarılan olumsuz buyrukta „not“ mastarın ÖNÜNE geliyor.",
      },
      {
        kind: "short_answer",
        text: "What does Cemre respect?",
        options: [],
        answer: 0,
        accept: ["she said it out loud", "saying it out loud", "that she said it"],
        explain: "„What I respect is that she said it out loud.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-u25-w1",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 25,
    title: "I changed jobs in order to find a direction",
    genre: "opinion",
    intro: "Amaç, sonuç, ödün. Hangi bağlaç nereye gidiyor?",
    gloss: [
      { de: "in order to", tr: "-mek için" },
      { de: "as a result", tr: "sonuç olarak" },
      { de: "even though", tr: "-e rağmen" },
      { de: "hesitate", tr: "tereddüt etmek" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Bir yön bulmak için iş değiştirdim.",
        answer: "I changed jobs in order to find a direction.",
        hint: "Amaç: neden önce geliyor, „in order to“ + mastar.",
      },
      {
        kind: "build",
        tr: "İşin bir anlamı vardı; sonuç olarak kaldım.",
        answer: "The work had meaning; as a result, I stayed.",
        hint: "Sonuç: „as a result“ yalnız geriye bakabiliyor.",
      },
      {
        kind: "build",
        tr: "Mantıklı olsa da tereddüt ediyorum.",
        answer: "Even though it makes sense, I hesitate.",
        hint: "Ödün: bir şeyi kabul ediyor, sonra yine de diyor.",
      },
      {
        kind: "build",
        tr: "Korkuyla yüzleşmeye karar verdim.",
        answer: "I decided to face the fear.",
        hint: "„decide“ mastar istiyor.",
      },
      {
        kind: "form",
        prompt: "Bağlaç kartını doldur.",
        facts: "Amaç için „in order to“; sonuç için „as a result“; ödün için „even though“; yanlışı koyunca cümle yine okunuyor.",
        fields: [
          { label: "Purpose", answer: "in order to", accept: ["to find a direction"] },
          { label: "Outcome", answer: "as a result", accept: ["I stayed"] },
          { label: "Concession", answer: "even though", accept: ["I hesitate"] },
          { label: "The danger", answer: "it still reads", accept: ["hard to catch"] },
        ],
      },
    ],
  },
  {
    id: "en-b1-u25-w2",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 25,
    title: "The gift was chosen with care",
    genre: "info",
    intro: "Edilgen ve aktarma. Fail nerede duruyor?",
    gloss: [
      { de: "was chosen", tr: "seçildi" },
      { de: "is appreciated", tr: "takdir ediliyor" },
      { de: "must be celebrated", tr: "kutlanmalı" },
      { de: "whisper", tr: "fısıldamak" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Armağan özenle seçildi.",
        answer: "The gift was chosen with care.",
        hint: "Fail yok, çünkü cümle armağanı anlatıyor.",
      },
      {
        kind: "build",
        tr: "Onun işi herkes tarafından takdir ediliyor.",
        answer: "Her work is appreciated by everyone.",
        hint: "Fail „by“ ile geri geliyor, çünkü haber o.",
      },
      {
        kind: "build",
        tr: "Gün gerektiği gibi kutlanmalı.",
        answer: "The day must be celebrated properly.",
        hint: "Kip ve edilgen: „must“ + „be“ + üçüncü hâl.",
      },
      {
        kind: "build",
        tr: "Arkadaşlığın bittiğini söyledi.",
        answer: "She said the friendship was over.",
        hint: "Aktarılınca „is“ bir basamak geriye kayıyor.",
      },
      {
        kind: "build",
        tr: "Bana bu konuda fısıldamamamı söyledi.",
        answer: "He told me not to whisper about it.",
        hint: "„not“ mastarın ÖNÜNE geliyor.",
      },
    ],
  },
];
