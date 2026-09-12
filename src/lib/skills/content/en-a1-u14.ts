import type { SkillExercise } from "../types";

/**
 * EN · A1 · Ünite 14 — "Bilet, rötar, taksi, konum".
 *
 * Dört ders: Buying a ticket · Delays · In a taxi · Near and far.
 *
 *   Kelime: ticket, buy, platform, seat, return, airport, plane, place,
 *           late, wait, time, problem, sorry, a long time, attention,
 *           be sorry, taxi, driver, address, to stop, far, car, drive,
 *           square, near, next to, behind, between, in front of, side,
 *           everywhere.
 *   Kalıp:  I'd like a ticket to London, please. · Single or return? ·
 *           How much is it? · The train is running late. ·
 *           I'm waiting for the bus. · How long is the delay? ·
 *           Can I have a receipt, please? · How long does it take? ·
 *           Please stop here. · It's near here. · Is it far from here? ·
 *           The bank is next to the hotel.
 *
 * Bu ünite ŞİMDİKİ ZAMANI ilk kez kuruyor: „The train is running late“,
 * „I'm waiting for the bus“. Türkçede geniş zaman ile şimdiki zaman çoğu
 * cümlede aynı eki taşıyor (-yor), yani ayrım yok; İngilizcede „I wait“
 * ile „I'm waiting“ başka iki şey. İçerik ikisini aynı diyalogda
 * karşılaştırmıyor — önce yalnız sürmekte olanı kuruyor, ayrım B1'in işi.
 */
export const enA1U14: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a1-u14-r1",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 14,
    title: "Buying a ticket",
    genre: "dialogue",
    intro: "Gişede bilet alınıyor. Peron, saat, fiyat ve rötar — dördünü de yakala.",
    gloss: [
      { de: "window", tr: "pencere" },
      { de: "listen", tr: "dinlemek" },
      { de: "know", tr: "bilmek" },
    ],
    minutes: 4,
    text:
      "Ali: Good morning. I'd like a ticket to London, please.\n" +
      "Clerk: Single or return?\n" +
      "Ali: Return, please. When does the next train leave?\n" +
      "Clerk: At ten past nine, from platform four.\n" +
      "Ali: How much is it?\n" +
      "Clerk: Forty euros. Do you want a seat near the window?\n" +
      "Ali: Yes, please. And how long does it take?\n" +
      "Clerk: Two hours. But the train is running late today — twenty minutes.\n" +
      "Ali: Twenty minutes! How long is the delay in the evening?\n" +
      "Clerk: I am sorry, I don't know. Please wait here and listen.\n" +
      "Ali: Thank you. Is the airport near the station?\n" +
      "Clerk: No, it is far. Take a taxi from the square in front of the station.",
    questions: [
      {
        text: "What ticket does Ali buy?",
        options: ["a return ticket", "a single ticket", "a plane ticket"],
        answer: 0,
        explain: "„Single or return? — Return, please.“",
      },
      {
        text: "From which platform does the train leave?",
        options: ["platform four", "platform nine", "platform ten"],
        answer: 0,
        explain: "„At ten past nine, from platform four.“ — dokuz ve on saatin parçaları.",
      },
      {
        kind: "truefalse",
        text: "The airport is far from the station.",
        options: ["True", "False"],
        answer: 0,
        explain: "„No, it is far. Take a taxi from the square…“",
      },
      {
        kind: "gapfill",
        text: "The train is running late: ___ minutes.",
        options: [],
        answer: 0,
        accept: ["twenty", "20"],
        explain: "„the train is running late today — twenty minutes“",
      },
      {
        kind: "short_answer",
        text: "How long does it take to London?",
        options: [],
        answer: 0,
        accept: ["two hours", "2 hours", "two"],
        explain: "„And how long does it take? — Two hours.“ Rötar bunun üstüne biniyor.",
      },
    ],
  },
  {
    id: "en-a1-u14-r2",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 14,
    title: "In a taxi",
    genre: "dialogue",
    intro: "Havalimanına taksi. Ne kadar sürüyor, ne kadar tutuyor?",
    gloss: [
      { de: "terminal", tr: "terminal" },
      { de: "of course", tr: "tabii ki" },
      { de: "machine", tr: "makine" },
      { de: "know", tr: "bilmek" },
    ],
    minutes: 4,
    text:
      "Ela: Hello. To the airport, please.\n" +
      "Driver: Of course. Which terminal?\n" +
      "Ela: I don't know. My plane is at two o'clock.\n" +
      "Driver: Then terminal one. How long does it take? Forty minutes today.\n" +
      "Ela: Forty! Is that far?\n" +
      "Driver: The airport is far from here, yes. But the road is good.\n" +
      "Ela: Please stop here for one minute. I want to buy water.\n" +
      "Driver: No problem.\n" +
      "Ela: Thank you. Can I have a receipt, please?\n" +
      "Driver: Yes, here it is. That is thirty-five euros.\n" +
      "Ela: Can I pay by card?\n" +
      "Driver: Yes. The card machine is next to your seat, on the left.\n" +
      "Ela: Thank you. Sorry for the stop!\n" +
      "Driver: No problem at all.",
    questions: [
      {
        text: "Where does Ela go?",
        options: ["to the airport", "to the station", "to the square"],
        answer: 0,
        explain: "„Hello. To the airport, please.“",
      },
      {
        text: "How much does the taxi cost?",
        options: ["thirty-five euros", "forty euros", "two euros"],
        answer: 0,
        explain: "„That is thirty-five euros.“ — kırk, dakikaların sayısı.",
      },
      {
        kind: "truefalse",
        text: "The airport is near.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The airport is far from here, yes.“",
      },
      {
        kind: "gapfill",
        text: "The card machine is next to the ___.",
        options: [],
        answer: 0,
        accept: ["seat"],
        explain: "„The card machine is next to your seat, on the left.“",
      },
      {
        kind: "order",
        text: "Konuşmanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "To the airport, please.",
          "How long does it take?",
          "Please stop here for one minute.",
          "Can I have a receipt, please?",
        ],
        explain: "Önce hedef, sonra süre, sonra duraklama, en son fiş. Takside sıra hep böyle.",
      },
      {
        kind: "short_answer",
        text: "What does Ela get from the driver?",
        options: [],
        answer: 0,
        accept: ["a receipt", "the receipt", "receipt"],
        explain: "„Can I have a receipt, please? — Yes, here it is.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a1-u14-l1",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 14,
    title: "The train is running late",
    genre: "report",
    intro: "İstasyon anonsu. Rötar kaç dakika, yolcular nerede bekleyecek?",
    gloss: [
      { de: "information", tr: "bilgi" },
      { de: "listen", tr: "dinlemek" },
      { de: "Attention", tr: "dikkat" },
      { de: "sorry", tr: "özür dilerim" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Station", text: "Attention, please! The train to London is running late." },
      { speaker: "Station", text: "The delay is twenty minutes. The train leaves from platform four at ten past nine." },
      { speaker: "Station", text: "Passengers with a return ticket can wait in the café next to platform three." },
      { speaker: "Station", text: "We are sorry for the problem. Please listen for more information." },
      { speaker: "Station", text: "The bus to the airport leaves from the road behind the station." },
      { speaker: "Station", text: "The taxi place is in front of the station, on the square." },
    ],
    questions: [
      {
        text: "How long is the delay?",
        options: ["twenty minutes", "ten minutes", "nine minutes"],
        answer: 0,
        explain: "„The delay is twenty minutes.“ — on ve dokuz kalkış saatinin parçaları.",
      },
      {
        text: "Where can passengers wait?",
        options: ["in the café", "on platform four", "on the square"],
        answer: 0,
        explain: "„Passengers with a return ticket can wait in the café next to platform three.“",
      },
      {
        kind: "truefalse",
        text: "The train leaves from platform four.",
        options: ["True", "False"],
        answer: 0,
        explain: "„The train leaves from platform four…“ — üç, kafenin yanındaki peron.",
      },
      {
        kind: "gapfill",
        text: "The bus to the airport leaves from the road ___ the station.",
        options: [],
        answer: 0,
        accept: ["behind"],
        explain: "„The bus to the airport leaves from the road behind the station.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The train to London is running late.", "The train to London is running late"],
        explain: "„The train to London is running late.“ — şu an sürdüğü için „is running“.",
      },
      {
        kind: "short_answer",
        text: "Where is the taxi place?",
        options: [],
        answer: 0,
        accept: ["in front of the station", "on the square", "in front of the station, on the square"],
        explain: "„The taxi place is in front of the station, on the square.“",
      },
    ],
  },
  {
    id: "en-a1-u14-l2",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 14,
    title: "Near and far",
    genre: "dialogue",
    intro: "Konum edatları art arda: next to, behind, between, in front of.",
    gloss: [
      { de: "post office", tr: "postane" },
      { de: "on foot", tr: "yürüyerek" },
      { de: "see", tr: "görmek" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Sena", text: "Excuse me, is the bank far from here?" },
      { speaker: "Man", text: "No, it's near here. The bank is next to the hotel." },
      { speaker: "Sena", text: "And the hotel?" },
      { speaker: "Man", text: "Go straight. The hotel is behind the square, on the right." },
      { speaker: "Sena", text: "Is there a taxi near here?" },
      { speaker: "Man", text: "Yes, in front of the station. But the bank is only five minutes on foot." },
      { speaker: "Sena", text: "Good. And the post office?" },
      { speaker: "Man", text: "Between the bank and the hotel. You see them everywhere in this street." },
      { speaker: "Sena", text: "Thank you! One more thing: how long does it take to the airport?" },
      { speaker: "Man", text: "By taxi, forty minutes. By train, one hour." },
      { speaker: "Sena", text: "Then I take the taxi. Thank you very much!" },
    ],
    questions: [
      {
        text: "Where is the bank?",
        options: ["next to the hotel", "behind the square", "in front of the station"],
        answer: 0,
        explain: "„The bank is next to the hotel.“ — meydanın arkasında olan otel, istasyonun önünde taksi.",
      },
      {
        text: "Where is the post office?",
        options: ["between the bank and the hotel", "next to the station", "on the square"],
        answer: 0,
        explain: "„Between the bank and the hotel.“ — „between“ iki şeyin arasını söyler.",
      },
      {
        kind: "truefalse",
        text: "The bank is far from here.",
        options: ["True", "False"],
        answer: 1,
        explain: "„No, it's near here.“ — beş dakika yürüyerek.",
      },
      {
        kind: "gapfill",
        text: "The hotel is ___ the square.",
        options: [],
        answer: 0,
        accept: ["behind"],
        explain: "„The hotel is behind the square, on the right.“",
      },
      {
        kind: "order",
        text: "Sorulan yerlerin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "is the bank far from here?",
          "And the hotel?",
          "And the post office?",
          "how long does it take to the airport?",
        ],
        explain: "Önce banka, sonra otel, sonra postane, en son havalimanı.",
      },
      {
        kind: "short_answer",
        text: "How long does it take to the airport by taxi?",
        options: [],
        answer: 0,
        accept: ["forty minutes", "40 minutes", "forty"],
        explain: "„By taxi, forty minutes. By train, one hour.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-u14-w1",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 14,
    title: "I'd like a ticket",
    genre: "formal",
    intro: "Bilet ve taksi cümlelerini yaz. Sonunda bilet formunu doldur.",
    gloss: [
      { de: "Single or return?", tr: "gidiş mi gidiş-dönüş mü" },
      { de: "How long does it take?", tr: "ne kadar sürüyor" },
      { de: "Please stop here.", tr: "lütfen burada durun" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Londra'ya bir bilet istiyorum, lütfen.",
        answer: "I'd like a ticket to London, please.",
        alternatives: ["I would like a ticket to London, please."],
        hint: "Hedef „to“ ile: a ticket to London. „for London“ değil.",
      },
      {
        kind: "build",
        tr: "Gidiş mi gidiş-dönüş mü?",
        answer: "Single or return?",
        hint: "İki sözcük yeter; „ticket“ tekrarlanmıyor, çünkü zaten konuşuluyor.",
      },
      {
        kind: "build",
        tr: "Ne kadar sürüyor?",
        answer: "How long does it take?",
        hint: "Süre „how long“ ile ve fiil „take“. „How much time“ de doğru ama bu daha doğal.",
      },
      {
        kind: "build",
        tr: "Lütfen burada durun.",
        answer: "Please stop here.",
        hint: "Emirde özne yok; „please“ başta ya da sonda durabilir.",
      },
      {
        kind: "form",
        prompt: "Bilet formunu doldur.",
        facts: "Londra; gidiş-dönüş; peron dört; kırk euro.",
        fields: [
          { label: "To", answer: "London" },
          { label: "Ticket", answer: "return" },
          { label: "Platform", answer: "four", accept: ["4"] },
          { label: "Price", answer: "forty euros", accept: ["40 euros", "forty"] },
        ],
      },
    ],
  },
  {
    id: "en-a1-u14-w2",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 14,
    title: "near, next to, behind",
    genre: "personal",
    intro: "Konum ve mesafe yaz. Edatların hepsi ayrı bir ilişki söylüyor.",
    gloss: [
      { de: "It's near here.", tr: "buraya yakın" },
      { de: "Is it far from here?", tr: "buradan uzak mı" },
      { de: "next to", tr: "yanında" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Buraya yakın.",
        answer: "It's near here.",
        alternatives: ["It is near here."],
        hint: "„near“ edat gibi çalışır ve „to“ istemez: near here, near the bank.",
      },
      {
        kind: "build",
        tr: "Buradan uzak mı?",
        answer: "Is it far from here?",
        hint: "„far“ ise „from“ ister: far from here. „near“ ile „far“ burada ayrılıyor.",
      },
      {
        kind: "build",
        tr: "Banka otelin yanında.",
        answer: "The bank is next to the hotel.",
        hint: "„next to“ iki sözcüklü tek edat; „next the hotel“ olmaz.",
      },
      {
        kind: "build",
        tr: "Otobüsü bekliyorum.",
        answer: "I'm waiting for the bus.",
        alternatives: ["I am waiting for the bus."],
        hint: "„wait“ nesnesini „for“ ile alır. Şu an sürdüğü için „am waiting“.",
      },
      {
        kind: "build",
        tr: "Bir fiş alabilir miyim, lütfen?",
        answer: "Can I have a receipt, please?",
        hint: "İstek „Can I have …?“ ile; „I want“ kaba kaçar.",
      },
    ],
  },
];
