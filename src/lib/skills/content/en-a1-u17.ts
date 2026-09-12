import type { SkillExercise } from "../types";

/**
 * EN · A1 · Ünite 17 — "Kurallar, kira, ev işleri, taşınma".
 *
 * Dört ders: House rules · Rent and bills · Housework · Moving house.
 *
 *   Kelime: rule, noise, quiet, clean, allow, have to, bin, fire, rent,
 *           bill, water, electricity, expensive, bank, paper, each, wash,
 *           help, tidy up, rubbish, put, dry, wet, box, carry, heavy, new,
 *           hard, push, down.
 *   Kalıp:  You must be quiet. · You mustn't make noise. · Is it allowed? ·
 *           How much is the rent? · I pay the rent every month. ·
 *           Is water included? · I tidy up my room. ·
 *           I take out the rubbish. · Do you help at home? ·
 *           Can you help me? · I can carry it. · This box is very heavy.
 *
 * Ünitenin yeni yapısı ZORUNLULUK ve tuzağı OLUMSUZDA: „You mustn't make
 * noise“ izin vermemek demek, „you don't have to“ ise gerek yok demek —
 * ikisi Türkçede de ayrı ("yapmamalısın" / "yapmak zorunda değilsin") ama
 * İngilizcede aynı kökten türüyor ve karışıyor. İçerik bu ünitede yalnız
 * „must“ ile „have to“yu kuruyor; olumsuz ayrımın kendisi A2'nin işi.
 */
export const enA1U17: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a1-u17-r1",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 17,
    title: "House rules",
    genre: "formal",
    intro: "Apartman kuralları. Ne yasak, ne serbest, ne zaman?",
    gloss: [
      { de: "party", tr: "parti" },
      { de: "end", tr: "bitmek" },
      { de: "included", tr: "dâhil" },
      { de: "bin", tr: "çöp kutusu" },
    ],
    minutes: 4,
    text:
      "HOUSE RULES\n\n" +
      "You must be quiet from ten at night to seven in the morning. You mustn't make noise on Sunday.\n\n" +
      "The stairs must be clean. Please put the rubbish in the bin downstairs, not in front of your door.\n\n" +
      "Is it allowed to have a party? Yes, but you have to ask your neighbours. A party has to end at eleven.\n\n" +
      "Water and electricity are not included in the rent. Each apartment pays the bill every month.\n\n" +
      "In a fire: don't take the lift. Go down the stairs.\n\n" +
      "Thank you!",
    questions: [
      {
        text: "When must you be quiet?",
        options: ["from ten at night to seven in the morning", "only on Sunday", "every afternoon"],
        answer: 0,
        explain: "„You must be quiet from ten at night to seven in the morning.“ Pazar ayrı bir kural.",
      },
      {
        text: "Where does the rubbish go?",
        options: ["in the bin downstairs", "in front of the door", "on the stairs"],
        answer: 0,
        explain: "„Please put the rubbish in the bin downstairs, not in front of your door.“",
      },
      {
        kind: "truefalse",
        text: "Water is not included in the rent.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Water and electricity are not included in the rent.“",
      },
      {
        kind: "gapfill",
        text: "A party has to end at ___.",
        options: [],
        answer: 0,
        accept: ["eleven", "11"],
        explain: "„A party has to end at eleven.“ — „has to“ da zorunluluk söylüyor.",
      },
      {
        kind: "short_answer",
        text: "What mustn't you take in a fire?",
        options: [],
        answer: 0,
        accept: ["the lift", "lift", "you mustn't take the lift"],
        explain: "„In a fire: don't take the lift. Go down the stairs.“",
      },
    ],
  },
  {
    id: "en-a1-u17-r2",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 17,
    title: "Moving house",
    genre: "dialogue",
    intro: "Taşınma günü. Kutu ağır, asansör çalışmıyor — kim ne yapıyor?",
    gloss: [
      { de: "soft", tr: "yumuşak" },
      { de: "fourth", tr: "dördüncü" },
      { de: "a month", tr: "ayda" },
      { de: "included", tr: "dâhil" },
    ],
    minutes: 4,
    text:
      "Kaan: Can you help me? This box is very heavy.\n" +
      "Ela: Of course. What is in it?\n" +
      "Kaan: Books. Twenty books in one box — that was not a good idea.\n" +
      "Ela: I can carry it with you. One, two, three, up!\n" +
      "Kaan: Thank you. Please put it down here, next to the door.\n" +
      "Ela: Is the new apartment far?\n" +
      "Kaan: No, it is in this street. But it is on the fourth floor and the lift doesn't work.\n" +
      "Ela: The stairs then! Is the box hard or soft?\n" +
      "Kaan: Hard. Don't push it — carry it.\n" +
      "Ela: I understand. How much is the rent there?\n" +
      "Kaan: Eight hundred euros a month. Water is included, electricity is not.\n" +
      "Ela: That is expensive. But the apartment is clean and new.",
    questions: [
      {
        text: "What is in the box?",
        options: ["books", "plates", "a lamp"],
        answer: 0,
        explain: "„Books. Twenty books in one box — that was not a good idea.“",
      },
      {
        text: "Why do they take the stairs?",
        options: ["the lift doesn't work", "the box is soft", "the apartment is on the first floor"],
        answer: 0,
        explain: "„it is on the fourth floor and the lift doesn't work“",
      },
      {
        kind: "truefalse",
        text: "Electricity is included in the rent.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Water is included, electricity is not.“ — ikisi ayrı ayrı söyleniyor.",
      },
      {
        kind: "gapfill",
        text: "The apartment is on the ___ floor.",
        options: [],
        answer: 0,
        accept: ["fourth"],
        explain: "„But it is on the fourth floor and the lift doesn't work.“",
      },
      {
        kind: "order",
        text: "Konuşmanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Can you help me?",
          "I can carry it with you.",
          "Is the new apartment far?",
          "How much is the rent there?",
        ],
        explain: "Önce yardım, sonra taşıma, sonra uzaklık, en son kira.",
      },
      {
        kind: "short_answer",
        text: "How much is the rent?",
        options: [],
        answer: 0,
        accept: ["eight hundred euros", "800 euros", "eight hundred"],
        explain: "„Eight hundred euros a month.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a1-u17-l1",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 17,
    title: "Housework",
    genre: "dialogue",
    intro: "Ev işleri paylaşılıyor. Hangi iş önce, hangisi sonra?",
    gloss: [
      { de: "full", tr: "dolu" },
      { de: "fast", tr: "hızlı" },
      { de: "know", tr: "bilmek" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Mother", text: "Can you help me at home today?" },
      { speaker: "Son", text: "Yes. What do I have to do?" },
      { speaker: "Mother", text: "First, tidy up your room. Then take out the rubbish." },
      { speaker: "Son", text: "The bin is full again!" },
      { speaker: "Mother", text: "Yes, and after that you have to wash the plates." },
      { speaker: "Son", text: "Wet plates or dry plates?" },
      { speaker: "Mother", text: "Wash them and then dry them, please." },
      { speaker: "Son", text: "And the floor?" },
      { speaker: "Mother", text: "The floor is clean. But the bathroom is not." },
      { speaker: "Son", text: "I don't like the bathroom!" },
      { speaker: "Mother", text: "I know. But you must help — we all live here." },
      { speaker: "Son", text: "Good. Then I start with the rubbish. It is the fast work." },
    ],
    questions: [
      {
        text: "What does the son have to do first?",
        options: ["tidy up his room", "take out the rubbish", "wash the plates"],
        answer: 0,
        explain: "„First, tidy up your room. Then take out the rubbish.“ — ama başlarken çöpü seçiyor.",
      },
      {
        text: "What is not clean?",
        options: ["the bathroom", "the floor", "the room"],
        answer: 0,
        explain: "„The floor is clean. But the bathroom is not.“",
      },
      {
        kind: "truefalse",
        text: "The son does not like the bathroom.",
        options: ["True", "False"],
        answer: 0,
        explain: "„I don't like the bathroom!“",
      },
      {
        kind: "gapfill",
        text: "He has to wash and then ___ the plates.",
        options: [],
        answer: 0,
        accept: ["dry"],
        explain: "„Wash them and then dry them, please.“ — „dry“ burada fiil, sıfat değil.",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["First, tidy up your room.", "First tidy up your room."],
        explain: "„First, tidy up your room.“ — „tidy up“ iki parçalı ve nesne sona geliyor.",
      },
      {
        kind: "short_answer",
        text: "What does the son start with?",
        options: [],
        answer: 0,
        accept: ["the rubbish", "rubbish", "taking out the rubbish"],
        explain: "„Then I start with the rubbish. It is the fast work.“",
      },
    ],
  },
  {
    id: "en-a1-u17-l2",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 17,
    title: "Rent and bills",
    genre: "monologue",
    intro: "Kira ve faturalar anlatılıyor. Hangi fatura ne zaman, ne kadar?",
    gloss: [
      { de: "another", tr: "başka bir" },
      { de: "included", tr: "dâhil" },
      { de: "a month", tr: "ayda" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Deniz", text: "I pay the rent every month: six hundred euros for two rooms." },
      { speaker: "Deniz", text: "Water is included, but electricity is not. That is another bill." },
      { speaker: "Deniz", text: "The electricity bill comes every three months. It is about ninety euros." },
      { speaker: "Deniz", text: "I pay at the bank. Sometimes I get a paper bill, sometimes only an email." },
      { speaker: "Deniz", text: "Each person in the house pays for the stairs. That is ten euros a month." },
      { speaker: "Deniz", text: "My apartment is not expensive, and the neighbours are quiet. I am happy here." },
    ],
    questions: [
      {
        text: "How much is the rent?",
        options: ["six hundred euros", "ninety euros", "ten euros"],
        answer: 0,
        explain: "„six hundred euros for two rooms“ — doksan elektrik, on merdiven.",
      },
      {
        text: "What is not included in the rent?",
        options: ["electricity", "water", "the stairs"],
        answer: 0,
        explain: "„Water is included, but electricity is not.“",
      },
      {
        kind: "truefalse",
        text: "The electricity bill comes every month.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The electricity bill comes every three months.“ — her ay gelen kira.",
      },
      {
        kind: "gapfill",
        text: "Deniz pays at the ___.",
        options: [],
        answer: 0,
        accept: ["bank"],
        explain: "„I pay at the bank.“",
      },
      {
        kind: "order",
        text: "Deniz'in saydığı sıra: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "I pay the rent every month.",
          "Water is included, but electricity is not.",
          "I pay at the bank.",
          "Each person in the house pays for the stairs.",
        ],
        explain: "Önce kira, sonra dâhil olan ve olmayan, sonra ödeme yeri, en son ortak gider.",
      },
      {
        kind: "short_answer",
        text: "How much does each person pay for the stairs?",
        options: [],
        answer: 0,
        accept: ["ten euros", "10 euros", "ten"],
        explain: "„That is ten euros a month.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-u17-w1",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 17,
    title: "You must be quiet",
    genre: "formal",
    intro: "Zorunluluk ve yasak yaz. Sonunda kira formunu doldur.",
    gloss: [
      { de: "You must …", tr: "… meli/malısın" },
      { de: "You mustn't …", tr: "… memelisin" },
      { de: "Is it allowed?", tr: "izin var mı" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Sessiz olmalısın.",
        answer: "You must be quiet.",
        hint: "„must“ sonrası fiil eksiz: must be, „must to be“ değil.",
      },
      {
        kind: "build",
        tr: "Gürültü yapmamalısın.",
        answer: "You mustn't make noise.",
        alternatives: ["You must not make noise."],
        hint: "„mustn't“ yasak demek. „noise“ sayılamaz, önünde „a“ yok.",
      },
      {
        kind: "build",
        tr: "İzin var mı?",
        answer: "Is it allowed?",
        hint: "Edilgen bir kalıp: izin veren kim, söylenmiyor.",
      },
      {
        kind: "build",
        tr: "Kira ne kadar?",
        answer: "How much is the rent?",
        hint: "„rent“ sayılamaz ve tekil: „how much“, „how many“ değil.",
      },
      {
        kind: "form",
        prompt: "Kira formunu doldur.",
        facts: "Altı yüz euro; her ay ödenir; su dâhil; elektrik ayrı.",
        fields: [
          { label: "Rent", answer: "six hundred euros", accept: ["600 euros"] },
          { label: "Pay", answer: "every month", accept: ["each month"] },
          { label: "Water", answer: "included" },
          { label: "Electricity", answer: "not included", accept: ["no"] },
        ],
      },
    ],
  },
  {
    id: "en-a1-u17-w2",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 17,
    title: "Can you help me?",
    genre: "personal",
    intro: "Yardım ve ev işi cümlelerini yaz. İki parçalı fiillerde nesnenin yeri önemli.",
    gloss: [
      { de: "Can you help me?", tr: "bana yardım edebilir misin" },
      { de: "I tidy up my room.", tr: "odamı topluyorum" },
      { de: "I take out the rubbish.", tr: "çöpü çıkarıyorum" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Bana yardım edebilir misin?",
        answer: "Can you help me?",
        hint: "„help“ nesnesini edatsız alır: help me, „help to me“ değil.",
      },
      {
        kind: "build",
        tr: "Onu taşıyabilirim.",
        answer: "I can carry it.",
        hint: "„can“ sonrası fiil eksiz; nesne „it“ zorunlu.",
      },
      {
        kind: "build",
        tr: "Bu kutu çok ağır.",
        answer: "This box is very heavy.",
        hint: "Yakındaki tek şey için „this“; sıfat „be“ ile geliyor.",
      },
      {
        kind: "build",
        tr: "Odamı topluyorum.",
        answer: "I tidy up my room.",
        hint: "Nesne isim olduğu için sona gelebiliyor: tidy up my room. Zamir olsa araya girerdi.",
      },
      {
        kind: "build",
        tr: "Çöpü çıkarıyorum.",
        answer: "I take out the rubbish.",
        hint: "„rubbish“ sayılamaz ve tekil: the rubbish, „the rubbishes“ olmaz.",
      },
    ],
  },
];
