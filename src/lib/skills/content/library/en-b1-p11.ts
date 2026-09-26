import type { SkillExercise } from "../../types";

/**
 * EN · B1 — Beceriler kütüphanesi, parti 11.
 *
 * Hücreyi YİRMİYE tamamlayan on partinin (11–20) ilki. Kurallar ve emsal:
 * `en-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 11 beklenmedik anlar hattı: asansörde kalan altı komşu, erken gelen
 * kar üzerine bir radyo programı, küçük bir kazanın tanık e-postası. Dil
 * bilgisi past continuous ile past simple — arka plan ve onu kesen olay.
 */
export const enB1P11: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-lib-r11",
    course: "en",
    level: "B1",
    skill: "reading",
    title: "Forty Minutes Between Floors",
    genre: "story",
    intro: "Kısa bir anlatı: bir apartmanın asansörü iki kat arasında duruyor ve içerideki altı kişi birbirini ilk kez tanıyor.",
    gloss: [
      { de: "elevator", tr: "asansör" },
      { de: "floor", tr: "kat" },
      { de: "to carry", tr: "taşımak" },
      { de: "comic", tr: "çizgi roman" },
      { de: "fire service", tr: "itfaiye" },
      { de: "to pass round", tr: "dağıtmak" },
      { de: "trumpet", tr: "trompet" },
      { de: "to complain", tr: "şikâyet etmek" },
      { de: "top floor", tr: "en üst kat" },
      { de: "engineer", tr: "teknisyen" },
    ],
    minutes: 6,
    text:
      "Last Thursday evening the elevator in our building stopped between the fourth and fifth floors. " +
      "There were six of us inside, and until that evening I knew exactly one of them by name.\n\n" +
      "When it happened, everyone was doing something different. Mrs. Okafor was carrying two bags " +
      "of shopping. A young man from the top floor was talking on the phone, and a girl of about " +
      "ten was reading a comic. I was checking my messages and not paying attention to anything.\n\n" +
      "For the first five minutes nobody said a word. Then the lights went off, the girl started " +
      "laughing, and after that it was impossible to stay silent. The man on the phone told the " +
      "fire service where we were. Mrs. Okafor opened one of her bags and passed round a packet " +
      "of cookies.\n\n" +
      "By the time the engineer arrived, we knew a lot about each other. The young man was " +
      "studying to be a nurse. The girl's father turned out to be the man who plays the trumpet " +
      "on Sunday mornings, the one we all complain about. Mrs. Okafor had lived in the building " +
      "for thirty-one years.\n\n" +
      "The elevator was repaired the next day. What surprised me was what happened afterward. " +
      "On Saturday there was a note on the door of apartment 12: “Elevator group, tea on Sunday at four.” " +
      "Five of us went. The sixth was at work that afternoon, but she sent a cake.",
    questions: [
      {
        text: "Where did the elevator stop?",
        options: [
          "between the ground and first floors",
          "between the fourth and fifth floors",
          "at the top floor",
        ],
        answer: 1,
        explain: "„the elevator in our building stopped between the fourth and fifth floors“.",
      },
      {
        text: "What was the writer doing when the elevator stopped?",
        options: ["checking messages", "carrying shopping", "talking on the phone"],
        answer: 0,
        explain: "„I was checking my messages and not paying attention to anything.“",
      },
      {
        kind: "truefalse",
        text: "The people in the elevator started talking immediately.",
        options: ["True", "False"],
        answer: 1,
        explain: "İlk beş dakika kimse konuşmamış; ışıklar sönüp kız gülünce sessizlik bozulmuş.",
      },
      {
        kind: "gapfill",
        text: "Mrs. Okafor had lived in the building for ___ years.",
        options: [],
        answer: 0,
        accept: ["thirty-one", "31", "thirty one"],
        explain: "„Mrs. Okafor had lived in the building for thirty-one years.“",
      },
      {
        kind: "short_answer",
        text: "Who told the fire service where they were?",
        options: [],
        answer: 0,
        accept: ["the man on the phone", "the young man", "the man from the top floor", "a young man", "the young man from the top floor"],
        explain: "„The man on the phone told the fire service where we were.“",
      },
      {
        text: "What happened on Saturday?",
        options: [
          "The elevator stopped again.",
          "The engineer came back.",
          "Someone invited the group to tea.",
        ],
        answer: 2,
        explain: "12 numaralı dairenin kapısında bir not vardı: pazar saat dörtte çay.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-lib-l11",
    course: "en",
    level: "B1",
    skill: "listening",
    title: "The Day the Snow Came Early",
    genre: "phone",
    intro: "Bir radyo programına dinleyiciler bağlanıyor: kar bastırdığında neredeydiler, ne yaptılar, günün sonunda ne kaldı.",
    gloss: [
      { de: "forecast", tr: "hava tahmini" },
      { de: "bridge", tr: "köprü" },
      { de: "proud", tr: "gururlu" },
      { de: "shelves", tr: "raflar" },
      { de: "to knock", tr: "kapıyı çalmak" },
      { de: "stranger", tr: "yabancı" },
      { de: "directions", tr: "yol tarifi" },
      { de: "garage", tr: "oto tamirhanesi" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Host", text: "Good morning. Yesterday the snow arrived six hours before the forecast said it would, and the whole city stopped. We asked where you were when it started. Amina, you're first." },
      { speaker: "Amina", text: "I was driving my son to school. We were sitting in traffic on the bridge when it began, and within ten minutes you couldn't see the car in front." },
      { speaker: "Host", text: "So what did you do?" },
      { speaker: "Amina", text: "We left the car at a garage and walked the last kilometer. He was the only child in his class who arrived that day, and he's still proud of it." },
      { speaker: "Host", text: "Tom, you were at work, I think?" },
      { speaker: "Tom", text: "I work in a supermarket. We were putting out the bread when the manager told us to stay open all night. By eleven, people were sleeping between the shelves." },
      { speaker: "Petra", text: "Mine is short. I was waiting for a bus that never came, so I knocked on a stranger's door to ask for directions, and she made me soup. We're meeting again next week." },
      { speaker: "Host", text: "That's the thing about a day like this. The plans break, and something else happens instead." },
    ],
    questions: [
      {
        text: "Why did the city stop?",
        options: [
          "The bridge was closed.",
          "The buses were on strike.",
          "The snow came earlier than expected.",
        ],
        answer: 2,
        explain: "Kar hava tahmininin söylediğinden altı saat önce gelmiş.",
      },
      {
        text: "Where was Amina when the snow began?",
        options: ["at her son's school", "in traffic on the bridge", "at a garage"],
        answer: 1,
        explain: "„We were sitting in traffic on the bridge when it began“.",
      },
      {
        kind: "truefalse",
        text: "Amina's son was the only child in his class who got to school.",
        options: ["True", "False"],
        answer: 0,
        explain: "„He was the only child in his class who arrived that day“.",
      },
      {
        kind: "gapfill",
        text: "Amina and her son walked the last ___.",
        options: [],
        answer: 0,
        accept: ["kilometer", "km"],
        explain: "„walked the last kilometer“ — arabayı bir servise bırakıp yürümüşler.",
      },
      {
        kind: "short_answer",
        text: "What was Tom doing when the manager spoke to him?",
        options: [],
        answer: 0,
        accept: ["putting out the bread", "putting out bread"],
        explain: "„We were putting out the bread when the manager told us to stay open“.",
      },
      {
        text: "What happened to Petra?",
        options: [
          "A stranger helped her and made her soup.",
          "Her bus arrived very late.",
          "She slept in a supermarket.",
        ],
        answer: 0,
        explain: "Yol sormak için bir yabancının kapısını çalmış; kadın ona çorba yapmış.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-lib-w11",
    course: "en",
    level: "B1",
    skill: "writing",
    title: "What I Saw Outside the Bakery",
    genre: "email",
    intro: "Bir fırının önünde gördüğün küçük kazayı dükkân sahibine anlatıyorsun: önce iki cümle kur, sonra sırayla ve açık bir tanık e-postası yaz.",
    gloss: [
      { de: "van", tr: "kamyonet" },
      { de: "to reverse", tr: "geri geri gitmek" },
      { de: "sign", tr: "tabela" },
      { de: "number plate", tr: "plaka" },
      { de: "bent", tr: "bükülmüş" },
      { de: "hit", tr: "çarptı" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Kamyonet geri geri giderken tabelaya çarptı.",
        answer: "The van hit the sign while it was reversing.",
        alternatives: ["While it was reversing, the van hit the sign."],
        hint: "Süren arka plan past continuous, kısa olay past simple; „while“ arka planı başlatır.",
      },
      {
        kind: "build",
        tr: "Karşıdaki durakta otobüs bekliyordum.",
        answer: "I was waiting for the bus at the stop opposite.",
        alternatives: ["At the stop opposite I was waiting for the bus."],
        hint: "Olay anındaki durumun: was + -ing; „wait“ fiili „for“ ister.",
      },
      {
        kind: "free",
        prompt:
          "Fırın sahibine bir e-posta yaz: kim olduğunu ve nerede durduğunu söyle, olayı sırayla anlat, aracı ve sürücüyü tarif et, emin olmadığın bir şeyi açıkça belirt ve yardım teklif ederek bitir.",
        checklist: [
          "Kim olduğunu ve olay anında nerede olduğunu yaz",
          "Olayı sırayla anlat: arka plan ve kesen olay",
          "Aracı ve sürücüyü tarif et, emin olmadığını söyle",
          "Yardım teklif ederek bitir",
        ],
        minWords: 100,
        phrases: [
          { de: "I was the person standing at …", tr: "…'da duran kişi bendim", en: "" },
          { de: "At the moment it happened, I was …", tr: "Olay olduğu anda …", en: "" },
          { de: "As far as I could see, …", tr: "Görebildiğim kadarıyla …", en: "" },
          { de: "I'm not completely sure whether …", tr: "… emin değilim", en: "" },
          { de: "If it helps, I'm happy to …", tr: "İşe yararsa memnuniyetle …", en: "" },
        ],
        sample:
          "Dear Mr. Hadley, I was the person standing at the bus stop opposite your bakery on " +
          "Sunday morning, and one of your staff gave me your email address. I thought a written " +
          "account of what happened might be useful. " +
          "At the moment it happened, I was waiting for the bus and looking at my phone. A white van " +
          "was reversing out of the side street, and the driver was talking to someone through the " +
          "window. The van hit your sign while it was reversing, and the sign fell against the glass. " +
          "As far as I could see, the window did not break, but the sign is badly bent. " +
          "The driver got out, looked at it for a moment and then drove away. I'm not completely " +
          "sure whether he saw me. The van had a blue logo on the side, and I remember the first " +
          "three letters of the number plate: KTR. " +
          "If it helps, I'm happy to speak to the police or to your insurance company. " +
          "Best wishes, Deniz Aksoy",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b1-lib-s11",
    course: "en",
    level: "B1",
    skill: "speaking",
    title: "Should You Film What Happens in the Street?",
    genre: "monologue",
    intro: "Yaklaşık bir dakika tek başına konuşacaksın: beklenmedik bir anda ne yapılması gerektiğini somut bir anla tart.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Sokakta beklenmedik bir şey olduğunda (küçük bir kaza, bir kavga) telefonla çekmek doğru mu? Görüşünü söyle, gördüğün ya da duyduğun somut bir anı anlat, karşı görüşü kabul et ve kendi kuralını söyle.",
      bulletsTr: [
        "Görüşünü tek cümleyle söyle",
        "Gördüğün ya da duyduğun somut bir anı anlat",
        "Karşı görüşü kabul et",
        "Kendi kuralını söyle",
      ],
      targets: [
        { de: "In my view, it depends on one thing: …", tr: "Bence tek bir şeye bağlı: …" },
        { de: "I remember once, I was … when …", tr: "Bir keresinde … iken … oldu, hatırlıyorum" },
        { de: "To be fair, a video can …", tr: "Hakkını vermek gerekirse, bir video …" },
        { de: "So my own rule is: …", tr: "O yüzden benim kuralım şu: …" },
      ],
      minSeconds: 40,
      maxSeconds: 80,
      sampleDe:
        "In my view, it depends on one thing: is anyone hurt or in danger? If they are, put the phone away and help. " +
        "I remember once, I was waiting for a tram when a cyclist hit a car door that someone had just opened. " +
        "He was lying in the road, and at least five people were holding up their phones, but nobody was asking him " +
        "if he was all right. In the end, an old man put down his shopping bags, sat next to him and called an ambulance. " +
        "To be fair, a video can be really useful. The driver later said the cyclist was going too fast, and one short " +
        "video showed that this wasn't true. " +
        "So my own rule is: help first, film second, and never post it online. If a video is needed, I give it to the " +
        "police or to the person involved, not to the whole internet.",
      rubricHint:
        "Somut bir an (past continuous ile arka plan), karşı görüşü kabul ve kişisel bir kural beklenir; „I remember once, I was … when …“, „To be fair“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b1-lib-g11",
    course: "en",
    level: "B1",
    skill: "grammar",
    title: "I was cooking when the phone rang",
    genre: "grammar",
    intro: "Bir anlatıda iki katman vardır: süren arka plan ve onu kesen kısa olay. İngilizce ikisine ayrı zaman verir.",
    focus: "Past continuous ile past simple: arka plan ve kesen olay (when / while)",
    gloss: [
      { de: "doorbell", tr: "kapı zili" },
      { de: "to ring", tr: "çalmak" },
      { de: "to knock", tr: "kapıyı çalmak" },
      { de: "shower", tr: "duş" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "was/were + -ing: o anda sürüyordu",
        tr: "Past continuous geçmişte belli bir anda SÜREN bir eylemi anlatır ve Türkçedeki „-iyordu“ ekine karşılık gelir. Yapı „was/were + fiil-ing“; olumsuzu „wasn't/weren't“, sorusu „Were you …?“ biçimindedir.",
        examples: [
          { de: "At eight o'clock I was having breakfast.", tr: "Saat sekizde kahvaltı ediyordum.", note: "o anda sürüyor" },
          { de: "They were watching the match.", tr: "Maçı izliyorlardı.", note: "çoğulda were" },
          { de: "Were you sleeping when I called?", tr: "Aradığımda uyuyor muydun?", note: "soru: were başa" },
        ],
      },
      {
        heading: "when ve while: arka plan ve kesen olay",
        tr: "Uzun eylem past continuous, onu kesen kısa olay past simple olur. „while“ çoğunlukla uzun eylemin önüne, „when“ çoğunlukla kısa olayın önüne gelir. Türkçede „-ken“ ve „-dığında“ aynı işi görür.",
        examples: [
          { de: "I was cooking when the phone rang.", tr: "Telefon çaldığında yemek yapıyordum.", note: "kısa olay → past simple" },
          { de: "While we were walking home, it started to rain.", tr: "Eve yürürken yağmur başladı.", note: "while + uzun eylem" },
          { de: "She fell while she was running for the bus.", tr: "Otobüse koşarken düştü.", note: "düşmek kısa olay" },
        ],
      },
      {
        heading: "Sıra mı, eşzamanlılık mı?",
        tr: "İki past simple art arda gelirse olaylar SIRAYLA olmuştur: önce biri, sonra öteki. Past continuous kullanırsan eylem o sırada zaten sürüyordu. Durum fiilleri (know, want, need) -ing almaz: „I knew“ denir, „I was knowing“ denmez.",
        examples: [
          { de: "When she arrived, we started dinner.", tr: "O gelince yemeğe başladık.", note: "sıra: önce geldi" },
          { de: "When she arrived, we were eating dinner.", tr: "O geldiğinde yemek yiyorduk.", note: "zaten sürüyordu" },
          { de: "I knew the answer, but I didn't say it.", tr: "Cevabı biliyordum ama söylemedim.", note: "durum fiili: -ing yok" },
        ],
      },
    ],
    questions: [
      {
        text: "I ___ a shower when the lights went off.",
        options: ["was having", "had", "have had"],
        answer: 0,
        explain: "Duş sürüyordu, ışıkların sönmesi onu kesen kısa olay.",
      },
      {
        text: "While they ___ the movie, someone knocked on the door.",
        options: ["watched", "have watched", "were watching"],
        answer: 2,
        explain: "„while“ arkasında süren eylem past continuous olur.",
      },
      {
        text: "Which sentence says the events happened one after the other?",
        options: [
          "When he came in, we were talking.",
          "When he came in, we stopped talking.",
          "While he was coming in, we were talking.",
        ],
        answer: 1,
        explain: "İki past simple art arda: önce içeri girdi, sonra konuşmayı kestik.",
      },
      {
        kind: "gapfill",
        text: "It ___ raining when we left the house. (was / were)",
        options: [],
        answer: 0,
        accept: ["was"],
        explain: "Tekil özne „it“ ile „was“ kullanılır.",
      },
      {
        kind: "gapfill",
        text: "What ___ you doing at ten o'clock last night?",
        options: [],
        answer: 0,
        accept: ["were"],
        explain: "Soruda „were“ özneden önce gelir: What were you doing …?",
      },
      {
        kind: "gapfill",
        text: "She broke her arm while she ___ skiing. (be)",
        options: [],
        answer: 0,
        accept: ["was"],
        explain: "Kayak süren eylem: was + -ing.",
      },
      {
        kind: "gapfill",
        text: "I was reading when the doorbell ___. (ring)",
        options: [],
        answer: 0,
        accept: ["rang"],
        explain: "Zilin çalması kısa olay; düzensiz geçmiş biçimi „rang“.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["While I was waiting", "for the elevator,", "the lights", "went off"],
        explain: "while + süren eylem, ardından kesen olay past simple ile.",
      },
      {
        kind: "truefalse",
        text: "„I was knowing the answer.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„know“ durum fiilidir ve -ing almaz: „I knew the answer.“",
      },
      {
        kind: "truefalse",
        text: "„We were walking home when it started to rain.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Süren yürüyüş past continuous, başlayan yağmur past simple.",
      },
    ],
  },
];
