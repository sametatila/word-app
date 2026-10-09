import type { SkillExercise } from "../types";

/**
 * EN · B1 · Ünite 22 — "Şehir değişimi, işe gidiş, su ve atık, yerel proje".
 *
 * Dört ders: How the city changed · The daily commute · Water and waste ·
 * A local project.
 *
 *   Kelime: town, bridge, traffic, suburb, building, square, street,
 *           pollution, seat, route, passenger, bike, lane, commute,
 *           driver, rush hour, clean, bottle, pipe, supply, landfill, destroy,
 *           plant, dirty, mayor, space, poster, petition, committee,
 *           vote, stop, paper.
 *   Kalıp:  The town has changed a lot since 2010. ·
 *           They built the bridge in 2015. ·
 *           I have never seen so much traffic. ·
 *           You have to book a seat on this route. ·
 *           Passengers don't have to show a card. ·
 *           You must not bike in the bus lane. ·
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
    title: "New rules for night bus 14",
    genre: "info",
    intro: "Gece otobüsünün yeni kuralları. Ne zorunlu, ne serbest, ne yasak?",
    gloss: [
      { de: "a notice", tr: "duyuru" },
      { de: "company", tr: "şirket" },
      { de: "online", tr: "internetten" },
      { de: "the ticket office", tr: "bilet gişesi" },
      { de: "departure", tr: "kalkış" },
      { de: "a booking", tr: "rezervasyon" },
      { de: "print", tr: "yazdırmak" },
      { de: "cameras", tr: "kameralar" },
      { de: "a fine", tr: "para cezası" },
      { de: "cyclists", tr: "bisikletliler" },
      { de: "a folding bike", tr: "katlanır bisiklet" },
    ],
    minutes: 7,
    text:
      "A notice from the bus company, on the door of every night bus:\n" +
      "NIGHT BUS 14: RULES FOR PASSENGERS FROM 1 JUNE\n" +
      "You have to book a seat on this route. Seats can be booked online or at the ticket office until one hour before departure. If you do not book, the driver cannot let you on.\n" +
      "Passengers don't have to show a card when they get on. Your booking number is enough, and you don't have to print it; a photo on your phone is fine.\n" +
      "You must not bike in the bus lane on Station Road. Cameras check the lane day and night, and the fine is sixty euros.\n" +
      "Why the changes? Until last year, passengers had to stand for forty minutes at rush hour, and drivers had to leave people at the stop. Cyclists were not allowed to use the lane either, but nobody checked it, and there were two accidents in the winter. We had to do something.\n" +
      "Bikes: you don't have to book a place for a folding bike. Other bikes have to stay at home at rush hour.\n" +
      "Questions? Ask any driver or call us at the ticket office.",
    questions: [
      {
        text: "What do passengers not have to do?",
        options: ["show a card", "book a seat", "stay out of the bus lane"],
        answer: 0,
        explain: "Binerken kart göstermek gerekmiyor; rezervasyon numarası yetiyor.",
      },
      {
        text: "How much is the fine in the bus lane?",
        options: ["sixty euros", "forty euros", "fourteen euros"],
        answer: 0,
        explain: "„Cameras check the lane day and night, and the fine is sixty euros.“",
      },
      {
        kind: "truefalse",
        text: "You can show your booking number on your phone.",
        options: ["True", "False"],
        answer: 0,
        explain: "„a photo on your phone is fine.“",
      },
      {
        kind: "gapfill",
        text: "Until last year, passengers ___ to stand for forty minutes at rush hour.",
        options: [],
        answer: 0,
        accept: ["had"],
        explain: "„Until last year, passengers had to stand for forty minutes at rush hour…“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "You have to book a seat on this route.",
          "Passengers don't have to show a card.",
          "You must not bike in the bus lane.",
          "Passengers had to stand for forty minutes.",
        ],
        explain: "Önce üç yeni kural, sonra değişikliğin gerekçesi.",
      },
      {
        kind: "short_answer",
        text: "Where can seats be booked?",
        options: [],
        answer: 0,
        accept: ["online", "at the ticket office", "online or at the ticket office"],
        explain: "„Seats can be booked online or at the ticket office until one hour before departure.“",
      },
    ],
  },
  {
    id: "en-b1-u22-r2",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 22,
    title: "A town since 2010",
    genre: "article",
    intro: "Bir kasabanın 2010'dan bu yana değişimi. Ne değişti, insanlar neyi konuşuyor?",
    gloss: [
      { de: "louder", tr: "daha gürültülü" },
      { de: "center", tr: "merkez" },
      { de: "rebuilt", tr: "yeniden yapıldı" },
      { de: "a fountain", tr: "fıskiye" },
      { de: "doubled", tr: "ikiye katlandı" },
      { de: "a shop owner", tr: "dükkân sahibi" },
      { de: "a corner", tr: "köşe" },
      { de: "grew", tr: "büyüdü" },
      { de: "photograph", tr: "fotoğraf" },
      { de: "carries", tr: "taşıyor" },
    ],
    minutes: 7,
    text:
      "OUR TOWN, THEN AND NOW\n" +
      "The town has changed a lot since 2010. Ask anybody who has lived here for more than ten years and they will tell you the same thing: it has become bigger, louder and much busier.\n" +
      "They built the bridge in 2015. Before that, cars had to go around through the old center, and the trip to the station took half an hour. Now it takes eight minutes.\n" +
      "The square was rebuilt in 2018, with new trees, a fountain and a market on Saturdays. The traffic around it has doubled since then, and the shop owners have asked the mayor twice for a Sunday without cars.\n" +
      "„I have never seen so much traffic,“ says Mrs. Lloyd, who has sold newspapers on the corner for thirty years. She has seen three mayors, two new schools and one bridge.\n" +
      "The suburb grew fastest of all. Four streets in 2012, thirty by 2019, and the pollution followed the new buildings out of the center.\n" +
      "What surprised me is that nobody here talks about the bridge. They talk about the square, which is smaller, older and in every photograph. The bridge carries four times more people and has never once been in the paper.",
    questions: [
      {
        text: "How long does the trip to the station take now?",
        options: ["eight minutes", "half an hour", "ten minutes"],
        answer: 0,
        explain: "„Now it takes eight minutes.“",
      },
      {
        text: "When was the square rebuilt?",
        options: ["in 2018", "in 2015", "in 2012"],
        answer: 0,
        explain: "„The square was rebuilt in 2018, with new trees, a fountain and a market on Saturdays.“",
      },
      {
        kind: "truefalse",
        text: "The traffic around the square has gone down since 2018.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The traffic around it has doubled since then…“",
      },
      {
        kind: "gapfill",
        text: "They built the bridge in ___.",
        options: [],
        answer: 0,
        accept: ["2015"],
        explain: "„They built the bridge in 2015.“",
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
        explain: "Önce genel değişim, sonra takvim sırası.",
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
    title: "A pipe on no map",
    genre: "dialogue",
    intro: "Nehir temizliği ve evde şişe su. Asıl sorun ne?",
    gloss: [
      { de: "the city council", tr: "belediye meclisi" },
      { de: "repairing", tr: "onarmak" },
      { de: "afterward", tr: "sonrasında" },
      { de: "agree", tr: "anlaşmak" },
      { de: "measure", tr: "ölçmek" },
      { de: "a filter", tr: "filtre" },
      { de: "fizzy water", tr: "maden suyu" },
      { de: "slowly", tr: "yavaşça" },
      { de: "thousand", tr: "bin" },
      { de: "spring", tr: "ilkbahar" },
      { de: "a map", tr: "harita" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Ada", text: "They decided to clean the river last spring. The first thing they found was a pipe that nobody had on a map." },
      { speaker: "Connor", text: "Who pays for that?" },
      { speaker: "Ada", text: "The city council. They suggested repairing the pipe first and cleaning the water afterward, which is the right order and took two years to agree on." },
      { speaker: "Connor", text: "And the bottles?" },
      { speaker: "Ada", text: "We gave up buying bottles at home in March. Six people, one faucet, and the landfill is forty kilometers away, so it is a small thing that is easy to measure." },
      { speaker: "Connor", text: "Did you really stop buying them completely?" },
      { speaker: "Ada", text: "Almost. We decided to buy a filter instead, and my son keeps asking me to buy fizzy water again." },
      { speaker: "Connor", text: "And the council? Did they promise to do anything about the landfill?" },
      { speaker: "Ada", text: "They agreed to look at it next year. They also suggested using the old pipe for the park, which nobody understood." },
      { speaker: "Connor", text: "What was the dirty water doing to the plant?" },
      { speaker: "Ada", text: "Destroying it slowly. The plant was built for a town of nine thousand and the suburb alone is twelve now." },
      { speaker: "Connor", text: "So the supply is the problem, not the river." },
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
        text: "What did the city council suggest doing first?",
        options: ["repairing the pipe", "cleaning the water", "closing the plant"],
        answer: 0,
        explain: "„They suggested repairing the pipe first and cleaning the water afterward…“",
      },
      {
        kind: "truefalse",
        text: "Ada's son wants fizzy water again.",
        options: ["True", "False"],
        answer: 0,
        explain: "„my son keeps asking me to buy fizzy water again.“",
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
    title: "Forty people on a Saturday",
    genre: "monologue",
    intro: "Bir mahalle projesi ve imza kampanyası. Oylama nasıl sonuçlandı?",
    gloss: [
      { de: "signature", tr: "imza" },
      { de: "sentence", tr: "cümle" },
      { de: "on top of", tr: "üstüne" },
      { de: "a bench", tr: "bank" },
      { de: "a stage", tr: "sahne" },
      { de: "promised", tr: "söz verdi" },
      { de: "mattered", tr: "önemliydi" },
      { de: "signed", tr: "imzaladı" },
      { de: "twice a day", tr: "günde iki kez" },
      { de: "in the end", tr: "sonunda" },
      { de: "learned", tr: "öğrendim / öğrendiğim" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Sean", text: "The mayor said the space was free. That sentence is the reason forty people gave up a Saturday." },
      { speaker: "Sean", text: "She said it in May, in front of forty people, and we believed her. We planned a garden with benches and a small stage." },
      { speaker: "Sean", text: "They told us not to remove the poster from the door of the committee room, which we had already removed." },
      { speaker: "Sean", text: "The poster had our phone numbers on it. Somebody from the council had put a notice on top of it, and we took the notice down." },
      { speaker: "Sean", text: "She asked whether we had signed the petition. We had, all forty of us, and then we collected more signatures at the bus stop." },
      { speaker: "Sean", text: "Two hundred and forty signatures in the end, and the vote was in September." },
      { speaker: "Sean", text: "We lost it by nine. The committee had promised a second date and there has not been one." },
      { speaker: "Sean", text: "What I learned is that the poster mattered more than the petition. People sign in thirty seconds and forget in thirty more; a poster at a bus stop is read by the same person twice a day for a month." },
    ],
    questions: [
      {
        text: "What did the mayor say?",
        options: ["the space was free", "the vote was in May", "the poster was wrong"],
        answer: 0,
        explain: "„The mayor said the space was free.“",
      },
      {
        text: "What was on the poster?",
        options: ["our phone numbers", "the date of the vote", "a map of the garden"],
        answer: 0,
        explain: "„The poster had our phone numbers on it.“",
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
    title: "Bus and bike rules",
    genre: "info",
    intro: "Otobüs ve bisiklet kuralları. Duyurunun cümlelerini kur, notu doldur.",
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
        answer: "You must not bike in the bus lane.",
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
        prompt: "Gece otobüsü notunu doldur.",
        facts: "Gece 14 otobüsünde yer ayırtmak zorunlu; binerken kart göstermek gerekmiyor; otobüs şeridinde bisiklet yasak; ceza altmış avro.",
        fields: [
          { label: "Seat", answer: "have to book", accept: ["book a seat", "you have to book a seat", "booking"] },
          { label: "Card", answer: "don't have to show", accept: ["no card", "not needed", "you don't have to show a card"] },
          { label: "Bus lane", answer: "must not bike", accept: ["no biking", "no bikes", "you must not bike"] },
          { label: "Fine", answer: "sixty euros", accept: ["60 euros", "sixty", "60"] },
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
    title: "The neighborhood petition",
    genre: "info",
    intro: "Mahalle dilekçesi ve nehir projesi. Olanları anlatan cümleleri kur.",
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
