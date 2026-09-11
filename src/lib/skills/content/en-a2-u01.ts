import type { SkillExercise } from "../types";

/**
 * EN · A2 · Ünite 1 — "Geçmiş: düzensiz fiiller ve sürmekte olan".
 *
 * Dört ders: Irregular verbs · What were you doing? · When and while ·
 * A year ago, last week.
 *
 *   Kelime: buy, bring, teach, catch, lose, hold, throw, hide, wait,
 *           rain, cook, sleep, wear, shine, shout, wave, while, suddenly,
 *           happen, meet, leave, at the same time, just now, fall down,
 *           ago, last week, month, year, yesterday, long ago,
 *           the day before yesterday, recently.
 *   Kalıp:  I bought a new phone. · I lost my phone on the bus. ·
 *           Did you bring the tickets? · I was waiting for the bus. ·
 *           What were you doing? · I was cooking when you called. ·
 *           While I was cooking, the phone rang. ·
 *           When you called, I was sleeping. ·
 *           What happened while you were waiting? · two days ago ·
 *           last week / last year · When did you …?
 *
 * A2'nin ilk ünitesi A1'in bıraktığı yerden başlıyor: A1 geçmiş zamanı
 * kurdu, burada İKİNCİ bir geçmiş geliyor ve ikisi bir arada kullanılıyor.
 * Ayrım süre: „I was cooking“ arka planda sürüyor, „the phone rang“ onun
 * içinde bir an. Türkçede ikisi de -yordu/-dı ile kurulabiliyor ve sınır
 * bulanık; içerik ikisini hep aynı cümlede yan yana koyuyor.
 */
export const enA2U01: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a2-u1-r1",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 1,
    title: "I lost my phone",
    genre: "story",
    intro: "Kaybolan bir telefonun hikâyesi. Ne zaman ne oldu, sırasıyla takip et.",
    gloss: [
      { de: "got in", tr: "bindi" },
      { de: "fell asleep", tr: "uyuyakaldı" },
      { de: "hold", tr: "tutmak" },
    ],
    minutes: 5,
    text:
      "Last week I lost my phone on the bus. It was a bad day.\n\n" +
      "I was waiting for the bus in the rain. When the bus came, I was holding my bag in one hand and my phone in the other. I got in, I sat down and I fell asleep.\n\n" +
      "Two stops later I woke up suddenly and I ran out. The phone was on the seat.\n\n" +
      "I went back to the bus station the day before yesterday. A woman there was very kind. \"Somebody brought a phone yesterday,\" she said. And it was my phone!\n\n" +
      "I bought a small bag for the phone. Now I always put it in the bag. I don't want to lose it again.",
    questions: [
      {
        text: "Where did the writer lose the phone?",
        options: ["on the bus", "at the station", "in the rain"],
        answer: 0,
        explain: "„Last week I lost my phone on the bus.“ — istasyon telefonu geri aldığı yer.",
      },
      {
        text: "Who brought the phone to the station?",
        options: ["somebody from the bus", "the woman at the station", "the writer"],
        answer: 0,
        explain: "„Somebody brought a phone yesterday,“ she said. — kadın yalnız haberi veriyor.",
      },
      {
        kind: "truefalse",
        text: "The writer bought a new phone.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I bought a small bag for the phone.“ — telefonu bulundu, yenisini almadı.",
      },
      {
        kind: "gapfill",
        text: "The writer was waiting for the bus in the ___.",
        options: [],
        answer: 0,
        accept: ["rain"],
        explain: "„I was waiting for the bus in the rain.“ — sürmekte olan iş, arka plan.",
      },
      {
        kind: "short_answer",
        text: "When did the writer go back to the station?",
        options: [],
        answer: 0,
        accept: ["the day before yesterday", "two days ago"],
        explain: "„I went back to the bus station the day before yesterday.“",
      },
    ],
  },
  {
    id: "en-a2-u1-r2",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 1,
    title: "What were you doing?",
    genre: "dialogue",
    intro: "İki kişi dün ne yaptıklarını konuşuyor. Hangi iş sürüyordu, hangisi bir andı?",
    gloss: [
      { de: "keys", tr: "anahtarlar" },
      { de: "car", tr: "araba" },
      { de: "fell down", tr: "yere düştü" },
    ],
    minutes: 5,
    text:
      "Ali: What were you doing yesterday at eight? I called you three times.\n" +
      "Sena: At eight? I was cooking. My phone was in the other room.\n" +
      "Ali: I called again at nine.\n" +
      "Sena: At nine I was sleeping! I went to bed early.\n" +
      "Ali: Early? Why?\n" +
      "Sena: Because I worked twelve hours. While I was working, it was raining all day.\n" +
      "Ali: And this morning?\n" +
      "Sena: This morning I was waiting for the bus when I saw your message.\n" +
      "Ali: Good. I lost my keys last week and I found them yesterday — in your car!\n" +
      "Sena: In my car! When did you leave them there?\n" +
      "Ali: Two weeks ago, I think. I was wearing a big jacket that day and the keys fell down.\n" +
      "Sena: Then come and take them. I am at home now.",
    questions: [
      {
        text: "What was Sena doing at eight?",
        options: ["cooking", "sleeping", "waiting for the bus"],
        answer: 0,
        explain: "„At eight? I was cooking.“ — dokuzda uyuyordu, sabah otobüs bekliyordu.",
      },
      {
        text: "Where were Ali's keys?",
        options: ["in Sena's car", "in his jacket", "at the bus stop"],
        answer: 0,
        explain: "„I lost my keys last week and I found them yesterday — in your car!“",
      },
      {
        kind: "truefalse",
        text: "Sena was sleeping at eight.",
        options: ["True", "False"],
        answer: 1,
        explain: "„At nine I was sleeping!“ — sekizde yemek pişiriyordu.",
      },
      {
        kind: "gapfill",
        text: "While Sena was working, it was ___ all day.",
        options: [],
        answer: 0,
        accept: ["raining"],
        explain: "„While I was working, it was raining all day.“ — iki iş aynı anda sürüyor.",
      },
      {
        kind: "order",
        text: "Olayların sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Two weeks ago the keys fell down.",
          "Ali lost his keys last week.",
          "Yesterday he found them.",
          "This morning Sena saw the message.",
        ],
        explain: "En eski olay iki hafta önce, en yenisi bu sabah. Zaman ifadeleri sırayı veriyor.",
      },
      {
        kind: "short_answer",
        text: "When did Ali leave the keys in the car?",
        options: [],
        answer: 0,
        accept: ["two weeks ago", "2 weeks ago", "two weeks"],
        explain: "„Two weeks ago, I think.“ — „ago“ hep geçmişe doğru sayıyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a2-u1-l1",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 1,
    title: "While I was cooking",
    genre: "dialogue",
    intro: "Mutfakta bir gün. Aynı anda kaç iş sürüyor?",
    gloss: [
      { de: "rang", tr: "çaldı" },
      { de: "smoke", tr: "duman" },
      { de: "Poor you", tr: "vah vah" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Nil", text: "What happened yesterday? You called me four times!" },
      { speaker: "Can", text: "Sorry! While I was cooking, the phone rang and I answered." },
      { speaker: "Nil", text: "And?" },
      { speaker: "Can", text: "It was my brother. While we were talking, the water was very hot and the rice was black." },
      { speaker: "Nil", text: "Oh no." },
      { speaker: "Can", text: "Then somebody was waving at the window — the neighbour. She was shouting: Fire!" },
      { speaker: "Nil", text: "Fire!" },
      { speaker: "Can", text: "No fire, only smoke. But at the same time the sun was shining and the kitchen was very hot." },
      { speaker: "Nil", text: "And the rice?" },
      { speaker: "Can", text: "In the bin. We ate bread and cheese." },
      { speaker: "Nil", text: "Poor you. Did you buy new rice?" },
      { speaker: "Can", text: "Yes, I bought two kilos." },
    ],
    questions: [
      {
        text: "What was Can doing when the phone rang?",
        options: ["cooking", "sleeping", "waiting"],
        answer: 0,
        explain: "„While I was cooking, the phone rang and I answered.“ — pişirmek arka plan, telefon bir an.",
      },
      {
        text: "Who was shouting?",
        options: ["the neighbour", "his brother", "Nil"],
        answer: 0,
        explain: "„Then somebody was waving at the window — the neighbour. She was shouting: Fire!“",
      },
      {
        kind: "truefalse",
        text: "There was a fire in the kitchen.",
        options: ["True", "False"],
        answer: 1,
        explain: "„No fire, only smoke.“ — komşu duman gördü.",
      },
      {
        kind: "gapfill",
        text: "At the same time the sun was ___.",
        options: [],
        answer: 0,
        accept: ["shining"],
        explain: "„But at the same time the sun was shining…“ — üç iş birlikte sürüyor.",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["While I was cooking, the phone rang", "While I was cooking, the phone rang."],
        explain: "„While I was cooking, the phone rang…“ — „while“ süren işi, geçmiş zaman anı taşıyor.",
      },
      {
        kind: "short_answer",
        text: "What did they eat?",
        options: [],
        answer: 0,
        accept: ["bread and cheese", "bread", "cheese"],
        explain: "„In the bin. We ate bread and cheese.“ — pirinç çöpe gitti.",
      },
    ],
  },
  {
    id: "en-a2-u1-l2",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 1,
    title: "Two days ago",
    genre: "monologue",
    intro: "Bir bilgisayar hikâyesi. Zaman ifadelerini sırayla yakala.",
    gloss: [
      { de: "screen", tr: "ekran" },
      { de: "teach", tr: "öğretmek" },
      { de: "recently", tr: "geçenlerde" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Deniz", text: "I bought a new computer two days ago. The old one was ten years old." },
      { speaker: "Deniz", text: "Last week I lost all my work on it. Suddenly the screen was dark." },
      { speaker: "Deniz", text: "I brought it to a shop. The man there was teaching a course, so I waited one hour." },
      { speaker: "Deniz", text: "Finally he looked at it and said: This computer is very old. Buy a new one." },
      { speaker: "Deniz", text: "Yesterday I went to the city and I looked at three computers. They were not cheap." },
      { speaker: "Deniz", text: "But recently I work at home every day, so I need a good computer." },
    ],
    questions: [
      {
        text: "When did Deniz lose his work?",
        options: ["last week", "two days ago", "yesterday"],
        answer: 0,
        explain: "„Last week I lost all my work on it.“ — iki gün önce bilgisayarı aldı.",
      },
      {
        text: "Why did Deniz wait one hour?",
        options: ["the man was teaching a course", "the shop was closed", "the computer was dark"],
        answer: 0,
        explain: "„The man there was teaching a course, so I waited one hour.“",
      },
      {
        kind: "truefalse",
        text: "The computers in the city were cheap.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I looked at three computers. They were not cheap.“",
      },
      {
        kind: "gapfill",
        text: "The old computer was ___ years old.",
        options: [],
        answer: 0,
        accept: ["ten", "10"],
        explain: "„The old one was ten years old.“",
      },
      {
        kind: "order",
        text: "Olayların sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Last week I lost all my work on it.",
          "I brought it to a shop.",
          "Yesterday I went to the city.",
          "I bought a new computer two days ago.",
        ],
        explain: "Anlatım sırası olayların sırası değil: en yeni olay ilk cümlede söyleniyor.",
      },
      {
        kind: "short_answer",
        text: "Where does Deniz work recently?",
        options: [],
        answer: 0,
        accept: ["at home", "home"],
        explain: "„But recently I work at home every day…“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-u1-w1",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 1,
    title: "I bought a new phone",
    genre: "personal",
    intro: "Düzensiz geçmişi yaz. Sonunda kayıp eşya formunu doldur.",
    gloss: [
      { de: "I bought …", tr: "… satın aldım" },
      { de: "I lost …", tr: "…'i kaybettim" },
      { de: "two days ago", tr: "iki gün önce" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Yeni bir telefon aldım.",
        answer: "I bought a new phone.",
        hint: "„buy“ düzensiz: bought. Kişiye göre değişmiyor.",
      },
      {
        kind: "build",
        tr: "Telefonumu otobüste kaybettim.",
        answer: "I lost my phone on the bus.",
        hint: "„lose“ düzensiz: lost. Araç için „on the bus“ — içinde demek.",
      },
      {
        kind: "build",
        tr: "Biletleri getirdin mi?",
        answer: "Did you bring the tickets?",
        hint: "„did“ varken fiil ilk hâline dönüyor: bring, „brought“ değil.",
      },
      {
        kind: "build",
        tr: "İki gün önce.",
        answer: "Two days ago.",
        hint: "„ago“ sayıdan SONRA gelir ve hep geçmişe doğru sayar.",
      },
      {
        kind: "form",
        prompt: "Kayıp eşya formunu doldur.",
        facts: "Telefon; otobüste; geçen hafta; istasyonda bulundu.",
        fields: [
          { label: "Item", answer: "phone", accept: ["a phone"] },
          { label: "Where", answer: "on the bus", accept: ["bus"] },
          { label: "When", answer: "last week" },
          { label: "Found", answer: "at the station", accept: ["station"] },
        ],
      },
    ],
  },
  {
    id: "en-a2-u1-w2",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 1,
    title: "I was cooking when you called",
    genre: "personal",
    intro: "İki geçmişi bir arada yaz: süren iş ve onun içindeki an.",
    gloss: [
      { de: "I was waiting …", tr: "bekliyordum" },
      { de: "What were you doing?", tr: "ne yapıyordun" },
      { de: "While I was …", tr: "ben …-ken" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Otobüsü bekliyordum.",
        answer: "I was waiting for the bus.",
        hint: "Süren iş: „was“ + „-ing“. „wait“ nesnesini „for“ ile alıyor.",
      },
      {
        kind: "build",
        tr: "Ne yapıyordun?",
        answer: "What were you doing?",
        hint: "„you“ ile hep „were“; „doing“ süren işi söylüyor.",
      },
      {
        kind: "build",
        tr: "Sen aradığında yemek pişiriyordum.",
        answer: "I was cooking when you called.",
        hint: "Süren iş „was cooking“, içindeki an „called“. İkisi ayrı biçimde.",
      },
      {
        kind: "rewrite",
        prompt: "İki cümleyi „while“ ile birleştir.",
        source: "I was cooking. The phone rang.",
        answer: "While I was cooking, the phone rang.",
        why: "„while“ SÜREN işi başlatıyor; içindeki an düz geçmiş zamanla geliyor.",
      },
      {
        kind: "build",
        tr: "Sen beklerken ne oldu?",
        answer: "What happened while you were waiting?",
        hint: "Soru bir ANI soruyor („happened“), „while“ arka planı veriyor.",
      },
    ],
  },
];
