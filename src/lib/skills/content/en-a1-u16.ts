import type { SkillExercise } from "../types";

/**
 * EN · A1 · Ünite 16 — "Ev, odalar, eşyaların yeri, komşular".
 *
 * Dört ders: Showing your home · Rooms · Where things are · Neighbours.
 *
 *   Kelime: house, home, room, door, window, apartment, wall, stairs,
 *           kitchen, bedroom, bathroom, living room, floor, cellar,
 *           toilet, lift, table, chair, bed, under, on, lamp, sofa,
 *           fridge, neighbour, live, next door, quiet, friendly,
 *           downstairs, bell, knock.
 *   Kalıp:  There is a room. · There are three rooms. · Is there a door? ·
 *           This is a kitchen. · The kitchen is small. ·
 *           There is a bathroom on the first floor. ·
 *           The book is on the table. · Where is my phone? ·
 *           It's next to the chair. · She lives next door. ·
 *           My neighbour is very friendly. · Where do you live?
 *
 * Ünitenin yeni yapısı VAROLUŞ CÜMLESİ: „there is“ / „there are“.
 * Türkçede „var“ tek sözcük ve sayıya göre değişmiyor; İngilizcede yapı
 * iki parçalı ve arkadaki isme göre tekil/çoğul seçiyor. İçerik ikisini
 * hep art arda kullanıyor, tek başına hiç bırakmıyor.
 */
export const enA1U16: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a1-u16-r1",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 16,
    title: "My apartment",
    genre: "personal",
    intro: "Bir daire tanıtılıyor. Hangi oda nerede, içinde ne var?",
    gloss: [
      { de: "There is …", tr: "… var" },
      { de: "downstairs", tr: "alt katta" },
      { de: "cellar", tr: "kiler" },
    ],
    minutes: 4,
    text:
      "This is my home. It is an apartment on the second floor, with three rooms.\n\n" +
      "There is a big living room with a sofa and a lamp. The kitchen is small, but there is a fridge and a table with four chairs. There are two bedrooms. In my bedroom there is a bed under the window.\n\n" +
      "Is there a bathroom? Yes, there is one next to the kitchen. The toilet is in the bathroom.\n\n" +
      "We also have a cellar downstairs. The stairs are old, so please be quiet on them. My neighbour is very friendly, but she works at night.",
    questions: [
      {
        text: "How many rooms are there?",
        options: ["three", "two", "four"],
        answer: 0,
        explain: "„an apartment on the second floor, with three rooms“ — iki yatak odasının sayısı, dört sandalyenin.",
      },
      {
        text: "Where is the bed?",
        options: ["under the window", "next to the kitchen", "in the living room"],
        answer: 0,
        explain: "„In my bedroom there is a bed under the window.“ — mutfağın yanında olan banyo.",
      },
      {
        kind: "truefalse",
        text: "The kitchen is small.",
        options: ["True", "False"],
        answer: 0,
        explain: "„The kitchen is small, but there is a fridge and a table…“ — büyük olan oturma odası.",
      },
      {
        kind: "gapfill",
        text: "The bathroom is next to the ___.",
        options: [],
        answer: 0,
        accept: ["kitchen"],
        explain: "„Yes, there is one next to the kitchen.“ — „one“ burada „a bathroom“ yerine geçiyor.",
      },
      {
        kind: "short_answer",
        text: "Where is the cellar?",
        options: [],
        answer: 0,
        accept: ["downstairs", "in the house", "under the apartment"],
        explain: "„We also have a cellar downstairs.“",
      },
    ],
  },
  {
    id: "en-a1-u16-r2",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 16,
    title: "Where is my phone?",
    genre: "dialogue",
    intro: "Kayıp telefon aranıyor. Konum edatlarını takip et: on, under, next to, in.",
    gloss: [
      { de: "hear", tr: "duymak" },
      { de: "something", tr: "bir şey" },
      { de: "call", tr: "aramak" },
      { de: "listen", tr: "dinlemek" },
    ],
    minutes: 4,
    text:
      "Ela: Where is my phone? I don't find it.\n" +
      "Can: Is it on the table?\n" +
      "Ela: No, only a book and a lamp are on the table.\n" +
      "Can: Under the sofa?\n" +
      "Ela: No. And not under the bed.\n" +
      "Can: In the kitchen? Next to the fridge?\n" +
      "Ela: I look. No, it is not there. Is there a phone in the bathroom?\n" +
      "Can: Why a phone in the bathroom? But look, please.\n" +
      "Ela: No! Wait — I call it.\n" +
      "Can: Good idea. Listen. I hear something. It is in the living room!\n" +
      "Ela: Where? Next to the chair, on the floor!\n" +
      "Can: Under the chair, I think. Now be quiet, please — the neighbour downstairs!",
    questions: [
      {
        text: "Where is the phone?",
        options: ["in the living room", "in the kitchen", "in the bathroom"],
        answer: 0,
        explain: "„I hear something. It is in the living room!“ — mutfak ve banyo bakılıp geçiliyor.",
      },
      {
        text: "What is on the table?",
        options: ["a book and a lamp", "the phone", "a fridge"],
        answer: 0,
        explain: "„No, only a book and a lamp are on the table.“",
      },
      {
        kind: "truefalse",
        text: "The phone is under the bed.",
        options: ["True", "False"],
        answer: 1,
        explain: "„No. And not under the bed.“ — telefon sandalyenin altında.",
      },
      {
        kind: "gapfill",
        text: "The phone is under the ___.",
        options: [],
        answer: 0,
        accept: ["chair"],
        explain: "„Under the chair, I think.“",
      },
      {
        kind: "order",
        text: "Aranan yerlerin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Is it on the table?",
          "Under the sofa?",
          "In the kitchen?",
          "It is in the living room!",
        ],
        explain: "Önce masa, sonra kanepe, sonra mutfak; en son oturma odasında bulunuyor.",
      },
      {
        kind: "short_answer",
        text: "Who lives downstairs?",
        options: [],
        answer: 0,
        accept: ["the neighbour", "a neighbour", "neighbour"],
        explain: "„Now be quiet, please — the neighbour downstairs!“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a1-u16-l1",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 16,
    title: "Showing my home",
    genre: "monologue",
    intro: "Nil dairesini gezdiriyor. Odaların sırasını ve sayısını yakala.",
    gloss: [
      { de: "welcome", tr: "hoş geldiniz" },
      { de: "bell", tr: "zil" },
      { de: "wall", tr: "duvar" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Nil", text: "Welcome! This is my apartment. It is on the first floor." },
      { speaker: "Nil", text: "There are four rooms. This is the living room, with a sofa and two chairs." },
      { speaker: "Nil", text: "The kitchen is here, next to the living room. There is a big fridge." },
      { speaker: "Nil", text: "This door is the bathroom. The toilet is there too." },
      { speaker: "Nil", text: "My bedroom is behind this wall. There is a bed, a table and a lamp." },
      { speaker: "Nil", text: "Come, we go downstairs. There is a cellar and the bell for the door." },
    ],
    questions: [
      {
        text: "On which floor is the apartment?",
        options: ["the first floor", "the second floor", "downstairs"],
        answer: 0,
        explain: "„It is on the first floor.“ — kiler alt katta.",
      },
      {
        text: "What is next to the living room?",
        options: ["the kitchen", "the bathroom", "the bedroom"],
        answer: 0,
        explain: "„The kitchen is here, next to the living room.“",
      },
      {
        kind: "truefalse",
        text: "There are four rooms.",
        options: ["True", "False"],
        answer: 0,
        explain: "„There are four rooms.“",
      },
      {
        kind: "gapfill",
        text: "In the bedroom there is a bed, a table and a ___.",
        options: [],
        answer: 0,
        accept: ["lamp"],
        explain: "„There is a bed, a table and a lamp.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["This is my apartment.", "This is my apartment"],
        explain: "„This is my apartment.“ — tanıtırken „this is“, var demek için „there is“.",
      },
      {
        kind: "short_answer",
        text: "What is downstairs?",
        options: [],
        answer: 0,
        accept: ["a cellar", "the cellar", "a cellar and the bell"],
        explain: "„There is a cellar and the bell for the door.“",
      },
    ],
  },
  {
    id: "en-a1-u16-l2",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 16,
    title: "Neighbours",
    genre: "dialogue",
    intro: "Apartmandaki komşular anlatılıyor. Kim hangi katta, nasıl biri?",
    gloss: [
      { de: "through", tr: "içinden" },
      { de: "hear", tr: "duymak" },
      { de: "furniture", tr: "mobilya" },
      { de: "know", tr: "bilmek" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Ali", text: "Do you know the neighbour next door?" },
      { speaker: "Sena", text: "Yes, she lives next door with her two children. She is very friendly." },
      { speaker: "Ali", text: "And downstairs?" },
      { speaker: "Sena", text: "Downstairs there is an old man. He is quiet, but he doesn't open the door." },
      { speaker: "Ali", text: "I knock every week, but nothing." },
      { speaker: "Sena", text: "He is at home. I hear the television through the wall." },
      { speaker: "Ali", text: "Is there a bell?" },
      { speaker: "Sena", text: "Yes, next to the door, under the lamp. Try the bell, not the door." },
      { speaker: "Ali", text: "Good idea. And the apartment on the third floor?" },
      { speaker: "Sena", text: "Nobody lives there now. There is no furniture, only a table." },
      { speaker: "Ali", text: "Then we have a quiet house!" },
      { speaker: "Sena", text: "Yes, and that is good." },
    ],
    questions: [
      {
        text: "Who lives next door?",
        options: ["a friendly woman with two children", "an old man", "nobody"],
        answer: 0,
        explain: "„she lives next door with her two children. She is very friendly.“ — yaşlı adam alt katta.",
      },
      {
        text: "Where is the bell?",
        options: ["next to the door", "under the stairs", "on the third floor"],
        answer: 0,
        explain: "„Yes, next to the door, under the lamp.“",
      },
      {
        kind: "truefalse",
        text: "Somebody lives on the third floor.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Nobody lives there now. There is no furniture, only a table.“",
      },
      {
        kind: "gapfill",
        text: "Ali knocks every ___.",
        options: [],
        answer: 0,
        accept: ["week"],
        explain: "„I knock every week, but nothing.“",
      },
      {
        kind: "order",
        text: "Sorulan komşuların sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Do you know the neighbour next door?",
          "And downstairs?",
          "Is there a bell?",
          "And the apartment on the third floor?",
        ],
        explain: "Önce yan daire, sonra alt kat, sonra zil, en son üçüncü kat.",
      },
      {
        kind: "short_answer",
        text: "What does Sena hear through the wall?",
        options: [],
        answer: 0,
        accept: ["the television", "television", "the TV"],
        explain: "„I hear the television through the wall.“ — yani adam evde.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-u16-w1",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 16,
    title: "There is a room",
    genre: "personal",
    intro: "Varoluş cümlesini yaz. Yapı iki parçalı ve arkadaki isme göre tekil/çoğul seçiyor.",
    gloss: [
      { de: "There is …", tr: "bir … var" },
      { de: "There are …", tr: "birkaç … var" },
      { de: "Is there …?", tr: "… var mı" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Bir oda var.",
        answer: "There is a room.",
        hint: "„there“ burada „orada“ demek değil; yapının parçası ve çevrilmiyor.",
      },
      {
        kind: "build",
        tr: "Üç oda var.",
        answer: "There are three rooms.",
        hint: "Çoğulda „there are“ ve isim „-s“ alır. Türkçede „var“ değişmezdi.",
      },
      {
        kind: "build",
        tr: "Kapı var mı?",
        answer: "Is there a door?",
        hint: "Soruda „is“ öne geçiyor: there is → is there.",
      },
      {
        kind: "build",
        tr: "Kitap masanın üstünde.",
        answer: "The book is on the table.",
        hint: "Belli bir kitap ve belli bir masa: iki „the“. Üstünde „on“.",
      },
      {
        kind: "form",
        prompt: "Ev kartını doldur.",
        facts: "Daire; birinci kat; üç oda; kiler var.",
        fields: [
          { label: "Home", answer: "apartment", accept: ["an apartment"] },
          { label: "Floor", answer: "first", accept: ["first floor", "1"] },
          { label: "Rooms", answer: "three", accept: ["3"] },
          { label: "Cellar", answer: "yes", accept: ["there is a cellar"] },
        ],
      },
    ],
  },
  {
    id: "en-a1-u16-w2",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 16,
    title: "Where is it?",
    genre: "personal",
    intro: "Konum ve komşu cümlelerini yaz. „live“ fiili üçüncü tekil kişide „-s“ alıyor.",
    gloss: [
      { de: "Where is my phone?", tr: "telefonum nerede" },
      { de: "next to the chair", tr: "sandalyenin yanında" },
      { de: "She lives next door.", tr: "yan dairede oturuyor" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Telefonum nerede?",
        answer: "Where is my phone?",
        hint: "Tek bir şey arandığı için „is“; birden çok olsa „where are“ olurdu.",
      },
      {
        kind: "build",
        tr: "Sandalyenin yanında.",
        answer: "It's next to the chair.",
        alternatives: ["It is next to the chair."],
        hint: "Özne „it“ zorunlu: Türkçedeki gibi öznesiz cümle olmuyor.",
      },
      {
        kind: "build",
        tr: "Komşum çok arkadaş canlısı.",
        answer: "My neighbour is very friendly.",
        hint: "„friendly“ sonu „-ly“ ama zarf değil sıfat; „be“ ile geliyor.",
      },
      {
        kind: "build",
        tr: "Yan dairede oturuyor.",
        answer: "She lives next door.",
        hint: "Üçüncü tekil kişide „-s“: she lives. „next door“ edatsız duruyor.",
      },
      {
        kind: "rewrite",
        prompt: "İki sandalye olsun.",
        source: "There is a chair.",
        answer: "There are two chairs.",
        why: "İki şey birden değişir: „there is“ → „there are“ ve chair → chairs.",
      },
    ],
  },
];
