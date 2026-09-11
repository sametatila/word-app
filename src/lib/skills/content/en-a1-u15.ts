import type { SkillExercise } from "../types";

/**
 * EN · A1 · Ünite 15 — "Gezilecek yerler, kaybolmak, bisiklet, danışma".
 *
 * Dört ders: Places to visit · Getting lost · By bike ·
 * At the information desk.
 *
 *   Kelime: visit, museum, park, see, open, church, art, photography,
 *           help, find, way, map, lost, path, someone, public, bike, walk,
 *           fast, ride, near, foot, gym, boat, information, ask, answer,
 *           hour, start, example, course, visitor.
 *   Kalıp:  You can visit the museum. · Can I see the park? ·
 *           The museum is open today. · Excuse me, could you help me? ·
 *           I'm lost. · Can you show me the way to the station? ·
 *           I go to work by bike. · I go on foot. · How do you get to …? ·
 *           Where is …? · When does … start? · How long is …?
 *
 * Ünite 13'ün „by bus“ kuralı burada İSTİSNASINI buluyor: yürümek „by
 * foot“ değil „on foot“. Tek başına öğretilince unutuluyor, o yüzden
 * içerik ikisini hep yan yana kullanıyor — „by bike“ ile „on foot“ aynı
 * cümlede seçenek olarak duruyor.
 *
 * İkinci iş kibarlık: „could you help me?“ „can“den daha kibar ve
 * yabancıya söylenen biçim. Türkçede fark ek değil ton olduğu için
 * görünmüyor; içerik ikisini ayrı ayrı kullanıyor.
 */
export const enA1U15: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a1-u15-r1",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 15,
    title: "Places to visit",
    genre: "guide",
    intro: "Şehir rehberi. Ne zaman açık, nereye nasıl gidiliyor?",
    gloss: [
      { de: "welcome", tr: "hoş geldiniz" },
      { de: "information desk", tr: "danışma" },
      { de: "river", tr: "nehir" },
      { de: "free", tr: "ücretsiz" },
    ],
    minutes: 4,
    text:
      "WELCOME TO OUR CITY\n\n" +
      "You can visit the museum every day from ten to six. The museum of art is near the park, behind the old church.\n\n" +
      "Can I see the park? Of course — the park is open at all hours and it is free. You can go on foot or by bike.\n\n" +
      "The church is open today, but not on Monday. Photography is not a problem, but please be quiet.\n\n" +
      "At the information desk you can ask for a map. A visitor can also take a boat on the river. The boat starts every hour.",
    questions: [
      {
        text: "When is the museum open?",
        options: ["every day from ten to six", "only on Monday", "every hour"],
        answer: 0,
        explain: "„You can visit the museum every day from ten to six.“ — pazartesi kapalı olan kilise.",
      },
      {
        text: "Where is the museum of art?",
        options: ["near the park", "in the church", "on the river"],
        answer: 0,
        explain: "„The museum of art is near the park, behind the old church.“ — kilisenin içinde değil arkasında.",
      },
      {
        kind: "truefalse",
        text: "The church is open on Monday.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The church is open today, but not on Monday.“",
      },
      {
        kind: "gapfill",
        text: "At the information desk you can ask for a ___.",
        options: [],
        answer: 0,
        accept: ["map"],
        explain: "„At the information desk you can ask for a map.“",
      },
      {
        kind: "short_answer",
        text: "How often does the boat start?",
        options: [],
        answer: 0,
        accept: ["every hour", "each hour"],
        explain: "„The boat starts every hour.“",
      },
    ],
  },
  {
    id: "en-a1-u15-r2",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 15,
    title: "I'm lost",
    genre: "dialogue",
    intro: "Kaybolan biri yardım istiyor. Kibar istek kalıbına dikkat.",
    gloss: [
      { de: "at the end of", tr: "sonunda" },
      { de: "information desk", tr: "danışma" },
      { de: "problem", tr: "sorun" },
    ],
    minutes: 4,
    text:
      "Ela: Excuse me, could you help me? I'm lost.\n" +
      "Man: Of course. Where do you want to go?\n" +
      "Ela: To the train station. I have a map, but I don't find the way.\n" +
      "Man: You are near. Can you see the church? Go on this path, behind the church.\n" +
      "Ela: And then?\n" +
      "Man: Then turn right. The station is at the end of the street.\n" +
      "Ela: How long does it take on foot?\n" +
      "Man: Ten minutes. Or you can take a bike — it is faster.\n" +
      "Ela: Is there someone at the station? I need information.\n" +
      "Man: Yes, there is an information desk. You can ask there.\n" +
      "Ela: Thank you very much! You are very kind.\n" +
      "Man: No problem. Good day!",
    questions: [
      {
        text: "What is Ela's problem?",
        options: ["she is lost", "she has no map", "the station is closed"],
        answer: 0,
        explain: "„Excuse me, could you help me? I'm lost.“ — haritası var ama yolu bulamıyor.",
      },
      {
        text: "How long does it take on foot?",
        options: ["ten minutes", "five minutes", "one hour"],
        answer: 0,
        explain: "„How long does it take on foot? — Ten minutes.“",
      },
      {
        kind: "truefalse",
        text: "Ela doesn't have a map.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I have a map, but I don't find the way.“ — harita var, yön yok.",
      },
      {
        kind: "gapfill",
        text: "The station is at the end of the ___.",
        options: [],
        answer: 0,
        accept: ["street"],
        explain: "„The station is at the end of the street.“",
      },
      {
        kind: "order",
        text: "Konuşmanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Could you help me? I'm lost.",
          "Where do you want to go?",
          "Go on this path, behind the church.",
          "Then turn right.",
        ],
        explain: "Önce yardım istenir, sonra hedef sorulur, sonra ilk adım, sonra ikinci adım.",
      },
      {
        kind: "short_answer",
        text: "What can Ela find at the station?",
        options: [],
        answer: 0,
        accept: ["an information desk", "information", "a desk"],
        explain: "„Yes, there is an information desk. You can ask there.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a1-u15-l1",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 15,
    title: "How do you get to work?",
    genre: "dialogue",
    intro: "İki kişi ulaşımı konuşuyor. „by bike“ ile „on foot“ aynı cümlede.",
    gloss: [
      { de: "winter", tr: "kış" },
      { de: "house", tr: "ev" },
      { de: "river", tr: "nehir" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Nil", text: "How do you get to work, Can?" },
      { speaker: "Can", text: "I go by bike. It is fast and I see the city." },
      { speaker: "Nil", text: "Every day? Also in the winter?" },
      { speaker: "Can", text: "In the winter I go on foot or by bus. My office is near." },
      { speaker: "Nil", text: "I go by train. The station is far from my house, so I ride a bike to the station." },
      { speaker: "Can", text: "That is a good idea. Do you go to the gym too?" },
      { speaker: "Nil", text: "Yes, on Monday and Friday. The gym is next to the park." },
      { speaker: "Can", text: "I walk in the park at the weekend. Sometimes I take a boat on the river." },
      { speaker: "Nil", text: "A boat! How long does it take?" },
      { speaker: "Can", text: "One hour. You can see the old church and the museum from the river." },
      { speaker: "Nil", text: "Then I am going to take the boat next Sunday." },
    ],
    questions: [
      {
        text: "How does Can get to work?",
        options: ["by bike", "by train", "by boat"],
        answer: 0,
        explain: "„I go by bike. It is fast and I see the city.“ — trenle giden Nil.",
      },
      {
        text: "Where is the gym?",
        options: ["next to the park", "near the river", "in the station"],
        answer: 0,
        explain: "„The gym is next to the park.“",
      },
      {
        kind: "truefalse",
        text: "Can goes by bike in the winter.",
        options: ["True", "False"],
        answer: 1,
        explain: "„In the winter I go on foot or by bus.“ — kışın bisiklet yok.",
      },
      {
        kind: "gapfill",
        text: "Nil goes to the gym on Monday and ___.",
        options: [],
        answer: 0,
        accept: ["Friday"],
        explain: "„Yes, on Monday and Friday.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I go by bike.", "I go by bike"],
        explain: "„I go by bike.“ — araçta „by“ ve artikel yok; yürümek ise „on foot“.",
      },
      {
        kind: "short_answer",
        text: "How long does the boat take?",
        options: [],
        answer: 0,
        accept: ["one hour", "1 hour", "an hour"],
        explain: "„One hour. You can see the old church and the museum from the river.“",
      },
    ],
  },
  {
    id: "en-a1-u15-l2",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 15,
    title: "At the information desk",
    genre: "dialogue",
    intro: "Danışmada soru sorma. Saat, süre ve izin — üçü de ayrı kalıpla.",
    gloss: [
      { de: "question", tr: "soru" },
      { de: "for example", tr: "örneğin" },
      { de: "visit", tr: "gezi" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Visitor", text: "Excuse me, I have a question. When does the museum start?" },
      { speaker: "Clerk", text: "The museum is open at ten. It closes at six." },
      { speaker: "Visitor", text: "And how long is the visit? For example, two hours?" },
      { speaker: "Clerk", text: "Yes, two hours is good. You can see the art of the city." },
      { speaker: "Visitor", text: "Can I take photos? Is photography a problem?" },
      { speaker: "Clerk", text: "No problem. But please ask before you take a photo of a person." },
      { speaker: "Visitor", text: "I understand. Where is the church from here?" },
      { speaker: "Clerk", text: "Go on foot, five minutes. Here is a map — the church is on it." },
      { speaker: "Visitor", text: "Thank you. One more question: is there a course for visitors?" },
      { speaker: "Clerk", text: "Yes, every Friday at three. You can ask for the answer here." },
      { speaker: "Visitor", text: "Perfect. Thank you very much!" },
    ],
    questions: [
      {
        text: "When does the museum open?",
        options: ["at ten", "at six", "at three"],
        answer: 0,
        explain: "„The museum is open at ten. It closes at six.“ — üç, kursun saati.",
      },
      {
        text: "How long is the visit?",
        options: ["two hours", "five minutes", "one hour"],
        answer: 0,
        explain: "„Yes, two hours is good.“ — beş dakika kiliseye yürüme süresi.",
      },
      {
        kind: "truefalse",
        text: "Photography is a problem in the museum.",
        options: ["True", "False"],
        answer: 1,
        explain: "„No problem. But please ask before you take a photo of a person.“",
      },
      {
        kind: "gapfill",
        text: "The course for visitors is every ___.",
        options: [],
        answer: 0,
        accept: ["Friday"],
        explain: "„Yes, every Friday at three.“",
      },
      {
        kind: "order",
        text: "Sorulan şeylerin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "When does the museum start?",
          "And how long is the visit?",
          "Can I take photos?",
          "Where is the church from here?",
        ],
        explain: "Önce saat, sonra süre, sonra izin, en son yol. Danışmada sorular hep bu sırayla geliyor.",
      },
      {
        kind: "short_answer",
        text: "How do you get to the church?",
        options: [],
        answer: 0,
        accept: ["on foot", "walking", "five minutes on foot"],
        explain: "„Go on foot, five minutes.“ — araçta „by“, yürümekte „on“.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-u15-w1",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 15,
    title: "You can visit the museum",
    genre: "guide",
    intro: "Gezi cümlelerini yaz. Sonunda gezi formunu doldur.",
    gloss: [
      { de: "You can visit …", tr: "…'i gezebilirsin" },
      { de: "information desk", tr: "danışma" },
      { de: "The museum is open today.", tr: "müze bugün açık" },
      { de: "by bike", tr: "bisikletle" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Müzeyi ziyaret edebilirsin.",
        answer: "You can visit the museum.",
        hint: "„can“ sonrası fiil eksiz: can visit, „can to visit“ değil.",
      },
      {
        kind: "build",
        tr: "Parkı görebilir miyim?",
        answer: "Can I see the park?",
        hint: "Soruda „can“ öne geçiyor: I can → Can I.",
      },
      {
        kind: "build",
        tr: "Müze bugün açık.",
        answer: "The museum is open today.",
        hint: "„open“ burada sıfat ve „be“ ile geliyor; fiil olsa „opens“ olurdu.",
      },
      {
        kind: "build",
        tr: "İşe bisikletle gidiyorum.",
        answer: "I go to work by bike.",
        hint: "Araçta „by“ ve artikel yok. Yürümek ise istisna: „on foot“.",
      },
      {
        kind: "form",
        prompt: "Gezi formunu doldur.",
        facts: "Müze; onda açılır; iki saat sürer; harita danışmada.",
        fields: [
          { label: "Place", answer: "museum", accept: ["the museum"] },
          { label: "Open", answer: "ten", accept: ["at ten", "10"] },
          { label: "Time", answer: "two hours", accept: ["2 hours"] },
          { label: "Map", answer: "information desk", accept: ["at the information desk", "desk"] },
        ],
      },
    ],
  },
  {
    id: "en-a1-u15-w2",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 15,
    title: "Could you help me?",
    genre: "personal",
    intro: "Kibar istek yaz. „could“ „can“den daha kibar ve yabancıya söylenen biçim.",
    gloss: [
      { de: "Could you help me?", tr: "bana yardım edebilir misiniz" },
      { de: "I'm lost.", tr: "kayboldum" },
      { de: "on foot", tr: "yürüyerek" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Affedersiniz, bana yardım edebilir misiniz?",
        answer: "Excuse me, could you help me?",
        hint: "„could“ geçmiş değil, kibarlık. Yabancıya „can“ yerine bu söylenir.",
      },
      {
        kind: "build",
        tr: "Kayboldum.",
        answer: "I'm lost.",
        alternatives: ["I am lost."],
        hint: "„lost“ burada sıfat ve „be“ ile geliyor; Türkçedeki gibi fiil değil.",
      },
      {
        kind: "build",
        tr: "Bana istasyonun yolunu gösterebilir misiniz?",
        answer: "Can you show me the way to the station?",
        hint: "İki nesne art arda: show + kime + neyi. Hedef „to“ ile.",
      },
      {
        kind: "build",
        tr: "Yürüyerek gidiyorum.",
        answer: "I go on foot.",
        hint: "Tek istisna: yürümekte „on“, araçta „by“. „by foot“ yanlış.",
      },
      {
        kind: "build",
        tr: "İstasyona nasıl gidilir?",
        answer: "How do you get to the station?",
        hint: "„get to“ varmak demek; „go to“ da doğru ama bu daha doğal.",
      },
    ],
  },
];
