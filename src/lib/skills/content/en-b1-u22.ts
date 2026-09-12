import type { SkillExercise } from "../types";

/**
 * EN · B1 · Ünite 22 — "Şehir değişimi, işe gidiş, su ve atık, yerel proje".
 *
 * Dört ders: How the city changed · The daily commute · Water and waste ·
 * A local project.
 *
 *   Kelime: town, bridge, traffic, suburb, building, square, street,
 *           pollution, seat, route, passenger, cycle, lane, commute,
 *           driver, rush, clean, bottle, pipe, supply, landfill, destroy,
 *           plant, dirty, mayor, space, poster, petition, committee,
 *           vote, stop, paper.
 *   Kalıp:  The town has changed a lot since 2010. ·
 *           They built the bridge in 2015. ·
 *           I have never seen so much traffic. ·
 *           You have to book a seat on this route. ·
 *           Passengers don't have to show a card. ·
 *           You must not cycle in the bus lane. ·
 *           They decided to clean the river. ·
 *           We gave up buying bottles. ·
 *           The council suggested repairing the pipe. ·
 *           The mayor said the space was free. ·
 *           They told us not to remove the poster. ·
 *           She asked whether we had signed the petition.
 *
 * Ünitenin tek öğretme noktası „MUST“UN GEÇMİŞİ YOK. Zorunluluk üçlüsü
 * A2 ünite 10'da ve B1 ünite 6'da iki kez geçti; burada üçlünün
 * söylenmemiş yanı geliyor: „must“ yalnız şimdiye ait bir sözcük,
 * geçmişte yerini „have to“ alıyor („had to“), yasak da „were not
 * allowed to“ya dönüyor. Yani iki biçim eşdeğer değil — biri bütün
 * zamanlarda çalışıyor, öteki tek zamanda.
 */
export const enB1U22: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-u22-r1",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 22,
    title: "The daily commute",
    genre: "info",
    intro: "Kapıdaki üç kural. Hangisi dünü anlatabiliyor?",
    gloss: [
      { de: "sentences", tr: "cümleler" },
      { de: "middle", tr: "orta" },
      { de: "pair", tr: "çift" },
      { de: "sentence", tr: "cümle" },
      { de: "tense", tr: "zaman kipi" },
      { de: "belongs", tr: "ait" },
      { de: "a notice", tr: "duyuru" },
      { de: "requirement", tr: "gereklilik" },
      { de: "prohibition", tr: "yasak" },
      { de: "opposite", tr: "karşıt" },
      { de: "required", tr: "gerekli" },
      { de: "trap", tr: "tuzak" },
      { de: "removes", tr: "kaldırıyor" },
      { de: "creates", tr: "yaratıyor" },
      { de: "allowed", tr: "izinli" },
      { de: "travels", tr: "yol alıyor" },
      { de: "rule", tr: "kural" },
      { de: "company", tr: "şirket" },
    ],
    minutes: 7,
    text:
      "Three sentences on a notice by the door, and they are not the same kind of rule.\n" +
      "You have to book a seat on this route. That is a requirement and it comes from outside me: the company has decided, and if I do not book, there is no seat for me on the bus.\n" +
      "Passengers don't have to show a card. That is the opposite of a rule. Nothing is required; if you want to show one, nobody stops you.\n" +
      "You must not cycle in the bus lane. That is a prohibition and it is the strongest of the three.\n" +
      "The trap is in the middle. „Don't have to“ and „must not“ look like a pair and they are not: one removes the rule, the other creates it.\n" +
      "The thing nobody puts on the notice is what happens in the past. „Must“ has no past. There is no „musted“, and „I must book a seat yesterday“ is not a sentence at all. When the rule was yesterday, English takes the other form: I had to book a seat. The prohibition goes the same way — we were not allowed to cycle there.\n" +
      "So „must“ is a word for now, and only for now. „Have to“ is the one that travels: to yesterday, to tomorrow, into every other tense in the language. I use „must“ where the rule is mine and „have to“ where it belongs to the company, and both of them turn into „had to“ the moment the day is over.",
    questions: [
      {
        text: "Which sentence takes a rule away?",
        options: ["Passengers don't have to show a card.", "You must not cycle in the bus lane.", "You have to book a seat."],
        answer: 0,
        explain: "„That is the opposite of a rule. Nothing is required.“",
      },
      {
        text: "Which form has no past?",
        options: ["must", "have to", "was allowed to"],
        answer: 0,
        explain: "„„Must“ has no past. There is no „musted“…“",
      },
      {
        kind: "truefalse",
        text: "„Don't have to“ and „must not“ mean the same thing.",
        options: ["True", "False"],
        answer: 1,
        explain: "„one removes the rule, the other creates it.“",
      },
      {
        kind: "gapfill",
        text: "When the rule was yesterday, English says: I ___ to book a seat.",
        options: [],
        answer: 0,
        accept: ["had"],
        explain: "„When the rule was yesterday, English takes the other form: I had to book a seat.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "You have to book a seat on this route.",
          "Passengers don't have to show a card.",
          "You must not cycle in the bus lane.",
          "I had to book a seat.",
        ],
        explain: "Gereklilik, gerekliliğin yokluğu, yasak, en sonda geçmiş biçim.",
      },
      {
        kind: "short_answer",
        text: "When does the writer use „must“?",
        options: [],
        answer: 0,
        accept: ["where the rule is mine", "for his rules", "for now"],
        explain: "„I use „must“ where the rule is mine and „have to“ where it belongs to the company.“",
      },
    ],
  },
  {
    id: "en-b1-u22-r2",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 22,
    title: "How the city changed",
    genre: "info",
    intro: "Bir kasaba 2010'dan beri değişti. Hangi cümlede tarih var?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "reaches", tr: "ulaşıyor" },
      { de: "verb", tr: "fiil" },
      { de: "a date", tr: "tarih" },
      { de: "finished", tr: "bitmiş" },
      { de: "moment", tr: "an" },
      { de: "rebuilt", tr: "yeniden yapıldı" },
      { de: "doubled", tr: "ikiye katlandı" },
      { de: "possible", tr: "olanaklı" },
      { de: "grew", tr: "büyüdü" },
      { de: "centre", tr: "merkez" },
      { de: "photograph", tr: "fotoğraf" },
      { de: "carries", tr: "taşıyor" },
      { de: "covers", tr: "kapsıyor" },
    ],
    minutes: 7,
    text:
      "The town has changed a lot since 2010, and the sentence you have just read is the reason this page looks the way it does.\n" +
      "When there is no date, English uses the perfect: the change reaches the present and is not finished. When there is a date, it takes the simple past. They built the bridge in 2015, and 2015 is closed.\n" +
      "So the two forms are not about how long ago something happened. They are about whether the sentence names a moment.\n" +
      "The square was rebuilt in 2018 and the traffic has doubled since then. One page, two forms, and the difference is only in the words that come after the verb.\n" +
      "I have never seen so much traffic. „Never“ has no date inside it; it covers everything up to now, which is why the perfect is the only possible form there.\n" +
      "The suburb grew fastest of all. Four streets in 2012, thirty by 2019, and the pollution followed the new buildings out of the centre.\n" +
      "What surprised me is that nobody here talks about the bridge. They talk about the square, which is smaller, older and in every photograph. The bridge carries four times more people and has never once been in the paper.",
    questions: [
      {
        text: "Why does the town sentence take the perfect?",
        options: ["there is no date", "it happened long ago", "it is about a bridge"],
        answer: 0,
        explain: "„When there is no date, English uses the perfect…“",
      },
      {
        text: "When was the square rebuilt?",
        options: ["in 2018", "in 2015", "in 2012"],
        answer: 0,
        explain: "„The square was rebuilt in 2018…“",
      },
      {
        kind: "truefalse",
        text: "The two forms show how long ago something happened.",
        options: ["True", "False"],
        answer: 1,
        explain: "„They are about whether the sentence names a moment.“",
      },
      {
        kind: "gapfill",
        text: "They built the bridge in ___.",
        options: [],
        answer: 0,
        accept: ["2015"],
        explain: "„They built the bridge in 2015, and 2015 is closed.“",
      },
      {
        kind: "order",
        text: "Kasabanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The town has changed a lot since 2010.",
          "Four streets in 2012.",
          "They built the bridge in 2015.",
          "The square was rebuilt in 2018.",
        ],
        explain: "Önce kuralı taşıyan cümle, sonra takvim sırası.",
      },
      {
        kind: "short_answer",
        text: "What do people in the town talk about?",
        options: [],
        answer: 0,
        accept: ["the square", "square", "not the bridge"],
        explain: "„They talk about the square, which is smaller, older and in every photograph.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-u22-l1",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 22,
    title: "Water and waste",
    genre: "dialogue",
    intro: "İki kişi bir nehri konuşuyor. Hangi fiil „-ing“ istiyor?",
    gloss: [
      { de: "verb", tr: "fiil" },
      { de: "sentence", tr: "cümle" },
      { de: "the council", tr: "belediye meclisi" },
      { de: "repairing", tr: "onarmak" },
      { de: "afterwards", tr: "sonrasında" },
      { de: "agree", tr: "anlaşmak" },
      { de: "measure", tr: "ölçmek" },
      { de: "shape", tr: "biçim" },
      { de: "learnt", tr: "öğrenildi" },
      { de: "straight after", tr: "hemen ardından" },
      { de: "slowly", tr: "yavaşça" },
      { de: "thousand", tr: "bin" },
      { de: "spring", tr: "ilkbahar" },
      { de: "a map", tr: "harita" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Ada", text: "They decided to clean the river last spring. The first thing they found was a pipe that nobody had on a map." },
      { speaker: "Kerem", text: "Who pays for that?" },
      { speaker: "Ada", text: "The council. They suggested repairing the pipe first and cleaning the water afterwards, which is the right order and took two years to agree." },
      { speaker: "Kerem", text: "And the bottles?" },
      { speaker: "Ada", text: "We gave up buying bottles at home in March. Six people, one tap, and the landfill is forty kilometres away, so it is a small thing that is easy to measure." },
      { speaker: "Kerem", text: "Why does „decided“ take „to“ and „gave up“ take „-ing“?" },
      { speaker: "Ada", text: "There is no reason. The first verb chooses the shape of the second one, and the list has to be learnt." },
      { speaker: "Kerem", text: "So „suggest me to repair it“ is wrong." },
      { speaker: "Ada", text: "It is not a sentence at all. „Suggest“ never takes a person straight after it, and that is the part people still get wrong at C1." },
      { speaker: "Kerem", text: "What was the dirty water doing to the plant?" },
      { speaker: "Ada", text: "Destroying it slowly. The plant was built for a town of nine thousand and the suburb alone is twelve now." },
      { speaker: "Kerem", text: "So the supply is the problem, not the river." },
      { speaker: "Ada", text: "The supply is the problem. The river is only the place where you can see it." },
    ],
    questions: [
      {
        text: "What did they find first?",
        options: ["a pipe", "a bottle", "a landfill"],
        answer: 0,
        explain: "„The first thing they found was a pipe that nobody had on a map.“",
      },
      {
        text: "What did the council suggest doing first?",
        options: ["repairing the pipe", "cleaning the water", "closing the plant"],
        answer: 0,
        explain: "„They suggested repairing the pipe first and cleaning the water afterwards…“",
      },
      {
        kind: "truefalse",
        text: "There is a clear reason why the second verb takes „-ing“.",
        options: ["True", "False"],
        answer: 1,
        explain: "„There is no reason. The first verb chooses the shape of the second one…“",
      },
      {
        kind: "gapfill",
        text: "The plant was built for a town of nine ___.",
        options: [],
        answer: 0,
        accept: ["thousand"],
        explain: "„The plant was built for a town of nine thousand…“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["We gave up buying bottles at home in March.", "We gave up buying bottles at home in March"],
        explain: "„give up“ „-ing“ istiyor; „give up to buy“ olmaz.",
      },
      {
        kind: "short_answer",
        text: "What is the problem?",
        options: [],
        answer: 0,
        accept: ["the supply", "supply", "not the river"],
        explain: "„The supply is the problem. The river is only the place where you can see it.“",
      },
    ],
  },
  {
    id: "en-b1-u22-l2",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 22,
    title: "A local project",
    genre: "monologue",
    intro: "Aktarılan üç cümle. Hangisinde „whether“ geliyor?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "verb", tr: "fiil" },
      { de: "infinitive", tr: "mastar" },
      { de: "anywhere", tr: "başka yerde" },
      { de: "none", tr: "hiçbiri" },
      { de: "reporting", tr: "aktarma" },
      { de: "signature", tr: "imza" },
      { de: "promised", tr: "söz verdi" },
      { de: "flat", tr: "düz" },
      { de: "inversion", tr: "devrik sıra" },
      { de: "mattered", tr: "önemliydi" },
      { de: "signed", tr: "imzaladı" },
      { de: "twice a day", tr: "günde iki kez" },
      { de: "in the end", tr: "sonunda" },
      { de: "learnt", tr: "öğrenildi" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Doruk", text: "The mayor said the space was free. That sentence is the reason forty people gave up a Saturday." },
      { speaker: "Doruk", text: "She said it in May. In the room it was „the space is free“; on paper it became „the space was free“, because reporting moves the verb one step back." },
      { speaker: "Doruk", text: "They told us not to remove the poster from the door of the committee room, which we had already removed." },
      { speaker: "Doruk", text: "„Told us not to remove“ — the „not“ sits in front of the infinitive, and putting it anywhere else makes a different sentence or none at all." },
      { speaker: "Doruk", text: "She asked whether we had signed the petition. Not „did we sign“: in a reported question the word order goes flat, and „whether“ does the work the inversion used to do." },
      { speaker: "Doruk", text: "Two hundred and forty signatures in the end, and the vote was in September." },
      { speaker: "Doruk", text: "We lost it by nine. The committee had promised a second date and there has not been one." },
      { speaker: "Doruk", text: "What I learnt is that the poster mattered more than the petition. People sign in thirty seconds and forget in thirty more; a poster on a bus stop is read by the same person twice a day for a month." },
    ],
    questions: [
      {
        text: "What did the mayor say?",
        options: ["the space was free", "the vote was in May", "the poster was wrong"],
        answer: 0,
        explain: "„The mayor said the space was free.“",
      },
      {
        text: "Where does the „not“ go?",
        options: ["in front of the infinitive", "after the infinitive", "at the end"],
        answer: 0,
        explain: "„the „not“ sits in front of the infinitive…“",
      },
      {
        kind: "truefalse",
        text: "They won the vote.",
        options: ["True", "False"],
        answer: 1,
        explain: "„We lost it by nine.“",
      },
      {
        kind: "gapfill",
        text: "There were two hundred and ___ signatures.",
        options: [],
        answer: 0,
        accept: ["forty", "40"],
        explain: "„Two hundred and forty signatures in the end…“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["She asked whether we had signed the petition.", "She asked whether we had signed the petition"],
        explain: "Aktarılan soruda sıra düzleşiyor; „whether“ devrik sıranın işini üstleniyor.",
      },
      {
        kind: "short_answer",
        text: "What mattered more than the petition?",
        options: [],
        answer: 0,
        accept: ["the poster", "poster"],
        explain: "„the poster mattered more than the petition.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-u22-w1",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 22,
    title: "You must not cycle in the bus lane",
    genre: "info",
    intro: "Üç kural, üç ayrı iş. Hangisi geçmişe gidebiliyor?",
    gloss: [
      { de: "have to book", tr: "ayırtmak zorunda" },
      { de: "don't have to", tr: "gerekmiyor" },
      { de: "must not", tr: "yasak" },
      { de: "had to", tr: "zorunda kaldı" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Bu güzergâhta yer ayırtmak zorundasın.",
        answer: "You have to book a seat on this route.",
        hint: "Dışarıdan gelen zorunluluk: „have to“.",
      },
      {
        kind: "build",
        tr: "Yolcuların kart göstermesi gerekmiyor.",
        answer: "Passengers don't have to show a card.",
        hint: "Kural YOK demek; yasak değil.",
      },
      {
        kind: "build",
        tr: "Otobüs şeridinde bisiklet sürmek yasak.",
        answer: "You must not cycle in the bus lane.",
        hint: "Yasak: „must not“, „don't have to“ değil.",
      },
      {
        kind: "build",
        tr: "Dün yer ayırtmak zorunda kaldım.",
        answer: "I had to book a seat yesterday.",
        hint: "„must“un geçmişi yok; geçmişte „had to“ giriyor.",
      },
      {
        kind: "form",
        prompt: "Kural kartını doldur.",
        facts: "Yer ayırtmak zorunlu; kart göstermek gerekmiyor; şeritte bisiklet yasak; geçmişte „had to“ giriyor.",
        fields: [
          { label: "Seat", answer: "have to book", accept: ["book a seat"] },
          { label: "Card", answer: "don't have to show", accept: ["no card"] },
          { label: "Bus lane", answer: "must not cycle", accept: ["no cycling"] },
          { label: "Yesterday", answer: "had to book", accept: ["had to"] },
        ],
      },
    ],
  },
  {
    id: "en-b1-u22-w2",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 22,
    title: "The mayor said the space was free",
    genre: "info",
    intro: "Aktarma ve fiil sonrası biçim. Hangi fiil mastar istiyor?",
    gloss: [
      { de: "said", tr: "söyledi" },
      { de: "told us not to", tr: "yapmamamızı söyledi" },
      { de: "asked whether", tr: "olup olmadığını sordu" },
      { de: "gave up", tr: "bıraktı" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Belediye başkanı alanın boş olduğunu söyledi.",
        answer: "The mayor said the space was free.",
        hint: "Aktarılınca „is“ bir basamak geriye kayıp „was“ oluyor.",
      },
      {
        kind: "build",
        tr: "Bize afişi kaldırmamamızı söylediler.",
        answer: "They told us not to remove the poster.",
        hint: "„not“ mastarın ÖNÜNE geliyor.",
      },
      {
        kind: "build",
        tr: "Dilekçeyi imzalayıp imzalamadığımızı sordu.",
        answer: "She asked whether we had signed the petition.",
        hint: "Aktarılan soruda sıra düzleşiyor; „whether“ işi üstleniyor.",
      },
      {
        kind: "build",
        tr: "Nehri temizlemeye karar verdiler.",
        answer: "They decided to clean the river.",
        hint: "„decide“ mastar istiyor.",
      },
      {
        kind: "build",
        tr: "Şişe almayı bıraktık.",
        answer: "We gave up buying bottles.",
        hint: "„give up“ „-ing“ istiyor.",
      },
    ],
  },
];
