import type { SkillExercise } from "../types";

/**
 * EN · A1 · Ünite 13 — "Eczane, sipariş, yol tarifi, ulaşım".
 *
 * Dört ders: Personal care items · Ordering online · Asking directions ·
 * Public transport.
 *
 *   Kelime: medicine, soap, need, use, sick, pharmacy, toothbrush, Band-Aid,
 *           order, address, wait, arrive, delivery, computer, wifi, list,
 *           street, left, right, corner, straight, on the left,
 *           on the right, straight ahead, bus, train, station, stop,
 *           get off, passenger, train station, road.
 *   Kalıp:  I need … · Do you have …? · I'm sick. · I want to order … ·
 *           My address is … · When does it arrive? ·
 *           Excuse me, where is …? · Go straight. · Turn left. / Turn right. ·
 *           I go to work by bus. · I'm on the train. · Where do I get off?
 *
 * Ünitenin taşıdığı iş ULAŞIM EDATI: „by bus“, „by train“, „by bike“ —
 * araçta artikel yok ve „with“ değil „by“ geliyor. Tek istisna „on foot“
 * ve o da ünite 15'te. Türkçe orada tek ek kullanıyor (-le), yani ayrımın
 * hiç karşılığı yok; içerik „by“yı üç egzersizde tekrarlıyor.
 */
export const enA1U13: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a1-u13-r1",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 13,
    title: "At the drugstore",
    genre: "dialogue",
    intro: "Eczanede alışveriş ve yol tarifi. Hangi ürün nerede duruyor?",
    gloss: [
      { de: "a cold", tr: "nezle" },
      { de: "soccer", tr: "futbol" },
      { de: "of course", tr: "tabii ki" },
    ],
    minutes: 4,
    text:
      "Lucy: Excuse me, do you have medicine for a cold?\n" +
      "Pharmacist: Yes, of course. Are you sick?\n" +
      "Lucy: A little. And I need soap and a toothbrush too.\n" +
      "Pharmacist: The soap is here, on the left. The toothbrushes are on the right.\n" +
      "Lucy: Thank you. Do you have Band-Aids?\n" +
      "Pharmacist: Yes, in the corner. How many do you need?\n" +
      "Lucy: Ten, please. My son plays soccer every day!\n" +
      "Pharmacist: I understand. That is nine euros for everything.\n" +
      "Lucy: Can I pay by card?\n" +
      "Pharmacist: Yes. Use this, please.\n" +
      "Lucy: Thank you. Where is the bus stop?\n" +
      "Pharmacist: Go straight, then turn right. It is near the train station.",
    questions: [
      {
        text: "What does Lucy need?",
        options: ["medicine, soap and a toothbrush", "only medicine", "a computer"],
        answer: 0,
        explain: "„medicine for a cold… I need soap and a toothbrush too.“ Yara bandı da alıyor.",
      },
      {
        text: "Where are the toothbrushes?",
        options: ["on the right", "on the left", "in the corner"],
        answer: 0,
        explain: "„The soap is here, on the left. The toothbrushes are on the right.“",
      },
      {
        kind: "truefalse",
        text: "Lucy pays by card.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Can I pay by card? — Yes.“",
      },
      {
        kind: "gapfill",
        text: "Lucy needs ten ___.",
        options: [],
        answer: 0,
        accept: ["Band-Aids", "bandages", "plasters"],
        explain: "„Do you have Band-Aids? … Ten, please.“",
      },
      {
        kind: "short_answer",
        text: "Where is the bus stop?",
        options: [],
        answer: 0,
        accept: ["near the train station", "near the station", "straight, then right"],
        explain: "„Go straight, then turn right. It is near the train station.“",
      },
    ],
  },
  {
    id: "en-a1-u13-r2",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 13,
    title: "Two books and a bag",
    genre: "email",
    intro: "İnternetten sipariş için yazılan mesaj. Ne isteniyor, ne zaman lazım?",
    gloss: [
      { de: "book", tr: "kitap" },
      { de: "at home", tr: "evde" },
      { de: "call", tr: "aramak" },
      { de: "free", tr: "ücretsiz" },
    ],
    minutes: 4,
    text:
      "Hello,\n\n" +
      "I want to order two books and a computer bag from your list.\n\n" +
      "My address is: Charlie Morgan, Green Street 12, Bremen.\n\n" +
      "When does it arrive? I need the bag on Friday. Is that a problem? I can wait one or two days, but not a week.\n\n" +
      "I have wifi at home, so you can email me. Please don't call me at work — I am in a meeting every afternoon.\n\n" +
      "How much is the delivery? Is it free?\n\n" +
      "Thank you,\nCharlie",
    questions: [
      {
        text: "What does Charlie order?",
        options: ["two books and a bag", "a computer", "a toothbrush"],
        answer: 0,
        explain: "„I want to order two books and a computer bag from your list.“ — bilgisayar değil, çantası.",
      },
      {
        text: "When does Charlie need the bag?",
        options: ["on Friday", "in a week", "every afternoon"],
        answer: 0,
        explain: "„I need the bag on Friday.“ — bir hafta beklemek istemiyor.",
      },
      {
        kind: "truefalse",
        text: "Charlie wants a phone call at work.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Please don't call me at work — I am in a meeting every afternoon.“",
      },
      {
        kind: "gapfill",
        text: "Charlie's address is Green ___ 12.",
        options: [],
        answer: 0,
        accept: ["Street"],
        explain: "„My address is: Charlie Morgan, Green Street 12, Bremen.“",
      },
      {
        kind: "short_answer",
        text: "What does Charlie want on Friday?",
        options: [],
        answer: 0,
        accept: ["the bag", "the computer bag", "a bag"],
        explain: "„I need the bag on Friday.“ — kitaplar için tarih vermiyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a1-u13-l1",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 13,
    title: "The way to the station",
    genre: "dialogue",
    intro: "Yol soruluyor. Sağ mı sol mu, dümdüz mü — yönleri takip et.",
    gloss: [
      { de: "far", tr: "uzak" },
      { de: "fourth", tr: "dördüncü" },
      { de: "on foot", tr: "yürüyerek" },
      { de: "new", tr: "yeni" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Lucy", text: "Excuse me, where is the train station?" },
      { speaker: "Katie", text: "Go straight, then turn left at the corner." },
      { speaker: "Lucy", text: "Straight and then left. Is it far?" },
      { speaker: "Katie", text: "No, it is near. Five minutes on foot." },
      { speaker: "Lucy", text: "And the bus stop?" },
      { speaker: "Katie", text: "The bus stop is on the right, near the pharmacy." },
      { speaker: "Lucy", text: "Thank you. I go to work by bus every day, but I am new here." },
      { speaker: "Katie", text: "Then take bus number four. Where do you get off?" },
      { speaker: "Lucy", text: "At the market." },
      { speaker: "Katie", text: "Good. The market is the fourth stop." },
      { speaker: "Lucy", text: "Thank you very much!" },
      { speaker: "Katie", text: "Have a nice day!" },
    ],
    questions: [
      {
        text: "Where is the train station?",
        options: ["straight, then left", "straight, then right", "near the market"],
        answer: 0,
        explain: "„Go straight, then turn left at the corner.“ — sağ, otobüs durağının yönü.",
      },
      {
        text: "Which bus does Lucy take?",
        options: ["number four", "number five", "number three"],
        answer: 0,
        explain: "„Then take bus number four.“ — dört hem hattın numarası hem durağın sırası.",
      },
      {
        kind: "truefalse",
        text: "The train station is near.",
        options: ["True", "False"],
        answer: 0,
        explain: "„No, it is near. Five minutes on foot.“",
      },
      {
        kind: "gapfill",
        text: "The bus stop is on the ___.",
        options: [],
        answer: 0,
        accept: ["right"],
        explain: "„The bus stop is on the right, near the pharmacy.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Go straight, then turn left at the corner.", "Go straight then turn left at the corner."],
        explain: "„Go straight, then turn left at the corner.“ — iki emir art arda, araya „then“ giriyor.",
      },
      {
        kind: "short_answer",
        text: "Where does Lucy get off?",
        options: [],
        answer: 0,
        accept: ["at the market", "the market", "market"],
        explain: "„Where do you get off? — At the market.“",
      },
    ],
  },
  {
    id: "en-a1-u13-l2",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 13,
    title: "On the train",
    genre: "monologue",
    intro: "Liam işe nasıl gidip geldiğini anlatıyor. Sabah ve akşam aynı araç mı?",
    gloss: [
      { de: "read", tr: "okumak" },
      { de: "fast", tr: "hızlı" },
      { de: "in a hurry", tr: "acelesi olmak" },
      { de: "problem", tr: "sorun" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Liam", text: "I go to work by train every day. The train station is near my office." },
      { speaker: "Liam", text: "I am on the train now. There are many passengers this morning." },
      { speaker: "Liam", text: "I get off at the third stop. Then I walk for five minutes." },
      { speaker: "Liam", text: "Sometimes the train is late. That is not a problem for me." },
      { speaker: "Liam", text: "I read or I use my computer. There is wifi on the train." },
      { speaker: "Liam", text: "In the evening I take the bus. The bus is not fast, but I am not in a hurry." },
    ],
    questions: [
      {
        text: "How does Liam go to work?",
        options: ["by train", "by bus", "by train and bus"],
        answer: 0,
        explain: "„I go to work by train every day.“ — otobüs akşam dönüş için.",
      },
      {
        text: "Where does Liam get off?",
        options: ["at the third stop", "at the station", "on the road"],
        answer: 0,
        explain: "„I get off at the third stop.“ — sonra beş dakika yürüyor.",
      },
      {
        kind: "truefalse",
        text: "Liam takes the train in the evening too.",
        options: ["True", "False"],
        answer: 1,
        explain: "„In the evening I take the bus.“ — sabah tren, akşam otobüs.",
      },
      {
        kind: "gapfill",
        text: "There is ___ on the train.",
        options: [],
        answer: 0,
        accept: ["wifi", "Wi-Fi"],
        explain: "„I read or I use my computer. There is wifi on the train.“",
      },
      {
        kind: "order",
        text: "Liam'ın anlattığı sıra: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "I go to work by train every day.",
          "I am on the train now.",
          "I get off at the third stop.",
          "In the evening I take the bus.",
        ],
        explain: "Önce genel alışkanlık, sonra şimdiki an, sonra iniş, en son akşam.",
      },
      {
        kind: "short_answer",
        text: "How does Liam travel in the evening?",
        options: [],
        answer: 0,
        accept: ["by bus", "bus", "he takes the bus"],
        explain: "„In the evening I take the bus.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-u13-w1",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 13,
    title: "An online order",
    genre: "formal",
    intro: "İhtiyaç ve sipariş cümlelerini yaz. Sonunda sipariş formunu doldur.",
    gloss: [
      { de: "I need …", tr: "…'e ihtiyacım var" },
      { de: "Do you have …?", tr: "…'nız var mı" },
      { de: "book", tr: "kitap" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "İlaca ihtiyacım var.",
        answer: "I need medicine.",
        hint: "„medicine“ sayılamaz: önünde „a“ yok, çoğulu da yok.",
      },
      {
        kind: "build",
        tr: "Sabununuz var mı?",
        answer: "Do you have soap?",
        hint: "Soru „do“ ile. „soap“ da sayılamaz, „a soap“ olmaz.",
      },
      {
        kind: "build",
        tr: "Hastayım.",
        answer: "I'm sick.",
        alternatives: ["I am sick."],
        hint: "Durum „be“ ile: I am sick. Türkçedeki gibi tek sözcük yetmiyor.",
      },
      {
        kind: "build",
        tr: "İki kitap sipariş etmek istiyorum.",
        answer: "I want to order two books.",
        hint: "„want“ sonrası fiil „to“ ile gelir: want to order. „-ing“ almaz.",
      },
      {
        kind: "form",
        prompt: "Sipariş formunu doldur.",
        facts: "Charlie Morgan; 12 Green Street, Bremen; iki kitap; cuma günü teslim.",
        fields: [
          { label: "Name", answer: "Charlie Morgan", accept: ["Charlie", "Morgan"] },
          { label: "Address", answer: "12 Green Street", accept: ["12 Green Street, Bremen", "Green Street 12"] },
          { label: "Order", answer: "two books", accept: ["2 books"] },
          { label: "Delivery", answer: "Friday", accept: ["on Friday"] },
        ],
      },
    ],
  },
  {
    id: "en-a1-u13-w2",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 13,
    title: "Directions and buses",
    genre: "personal",
    intro: "Yol tarifi ve ulaşım yaz. Araçta „by“ geliyor ve artikel hiç kullanılmıyor.",
    gloss: [
      { de: "Go straight.", tr: "dümdüz git" },
      { de: "Turn left.", tr: "sola dön" },
      { de: "by bus", tr: "otobüsle" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Dümdüz git.",
        answer: "Go straight.",
        hint: "Emirde özne yok. „straight“ burada sıfat değil, yön zarfı.",
      },
      {
        kind: "build",
        tr: "Sola dön.",
        answer: "Turn left.",
        hint: "„left“ tek başına yeter: „turn to the left“ gerekmiyor.",
      },
      {
        kind: "build",
        tr: "Affedersiniz, istasyon nerede?",
        answer: "Excuse me, where is the station?",
        hint: "Belli bir istasyon olduğu için „the“. Nezaket sözü virgülle ayrılıyor.",
      },
      {
        kind: "build",
        tr: "İşe otobüsle gidiyorum.",
        answer: "I go to work by bus.",
        hint: "Araçta „by“ ve artikel YOK: by bus, by train. „with the bus“ yanlış.",
      },
      {
        kind: "build",
        tr: "Nerede ineceğim?",
        answer: "Where do I get off?",
        hint: "„get off“ iki parçalı; nesnesiz kullanıldığında parçalar ayrılmaz.",
      },
    ],
  },
];
