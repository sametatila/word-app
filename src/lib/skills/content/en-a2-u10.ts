import type { SkillExercise } from "../types";

/**
 * EN · A2 · Ünite 10 — "Tamirci, bina kuralları, mahalle, dükkânlar".
 *
 * Dört ders: Calling a repairman · Building rules · My neighbourhood ·
 * Local shops.
 *
 *   Kelime: repair, tool, cost, estimate, tomorrow, mechanic, drill,
 *           screw, rule, allow, forbidden, rubbish, quiet, be allowed,
 *           garbage can, attic, area, nearby, crowded, park, safe,
 *           neighborhood, bus stop, city center, bakery, corner shop,
 *           laundry, open, close, butcher shop, bookstore, shopping mall.
 *   Kalıp:  My washing machine isn't working. ·
 *           Can you come tomorrow morning? · How much will it cost? ·
 *           You have to … · You mustn't … · You don't have to … ·
 *           There is a park nearby. · It takes ten minutes on foot. ·
 *           It's quieter than the city centre. · What time do you open? ·
 *           I've already been to the bakery. · Do you have any fresh bread?
 *
 * Ünitenin tek öğretme noktası ZORUNLULUK ÜÇLÜSÜ: „have to“ (kural
 * böyle), „mustn't“ (yasak) ve „don't have to“ (gerek yok). Üçüncüsü
 * tuzağın kendisi, çünkü biçimi ikincisine benziyor ama anlamı tam
 * karşıtı. A1'de „mustn't“ tek başına öğretilmişti; burada üçlü
 * tamamlanıyor ve bina kuralları metni üçünü yan yana kullanıyor.
 */
export const enA2U10: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a2-u10-r1",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 10,
    title: "Calling a repairman",
    genre: "phone",
    intro: "Bozuk makine için telefon. Ne zaman geliyor, kaça mal oluyor?",
    gloss: [
      { de: "washing machine", tr: "çamaşır makinesi" },
      { de: "tools", tr: "aletler" },
      { de: "part", tr: "parça" },
      { de: "service", tr: "servis" },
    ],
    minutes: 5,
    text:
      "Ela: Hello, is that the repair service?\n" +
      "Mechanic: Yes. What is the problem?\n" +
      "Ela: My washing machine isn't working. It starts and then it stops after two minutes.\n" +
      "Mechanic: Since when?\n" +
      "Ela: Since Friday. The caretaker looked at it but he had no tools.\n" +
      "Mechanic: I see. Can you tell me the name on the machine?\n" +
      "Ela: It says Bosch, and under it a number.\n" +
      "Mechanic: Good. Can I come tomorrow morning?\n" +
      "Ela: Tomorrow is difficult. I work until four.\n" +
      "Mechanic: Then Thursday at five.\n" +
      "Ela: That is fine. How much will it cost?\n" +
      "Mechanic: The visit is thirty euros. With a new part it can be a hundred.\n" +
      "Ela: Could you give me an estimate first?\n" +
      "Mechanic: Of course. I look at it, I tell you the price, and then you decide.",
    questions: [
      {
        text: "What is the problem with the machine?",
        options: ["it stops after two minutes", "it does not start", "it is too loud"],
        answer: 0,
        explain: "„It starts and then it stops after two minutes.“",
      },
      {
        text: "When does the mechanic come?",
        options: ["on Thursday at five", "tomorrow morning", "on Friday"],
        answer: 0,
        explain: "Yarın Ela dörde kadar çalışıyor, o yüzden „Then Thursday at five.“",
      },
      {
        kind: "truefalse",
        text: "The caretaker had no tools.",
        options: ["True", "False"],
        answer: 0,
        explain: "„The caretaker looked at it but he had no tools.“",
      },
      {
        kind: "gapfill",
        text: "The visit costs ___ euros.",
        options: [],
        answer: 0,
        accept: ["thirty", "30"],
        explain: "„The visit is thirty euros. With a new part it can be a hundred.“",
      },
      {
        kind: "short_answer",
        text: "What does Ela want before the work?",
        options: [],
        answer: 0,
        accept: ["an estimate", "the estimate", "a price"],
        explain: "„Could you give me an estimate first?“",
      },
    ],
  },
  {
    id: "en-a2-u10-r2",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 10,
    title: "Building rules",
    genre: "info",
    intro: "Bina kuralları. Hangisi zorunlu, hangisi yasak, hangisi serbest?",
    gloss: [
      { de: "roof", tr: "çatı" },
      { de: "quiet time", tr: "sessiz saat" },
      { de: "in front of", tr: "önünde" },
      { de: "company", tr: "şirket" },
      { de: "landlord", tr: "ev sahibi" },
    ],
    minutes: 6,
    text:
      "Rules for the residents\n" +
      "You have to put the rubbish in the garbage can before eight in the evening. The caretaker takes it out on Monday and Thursday.\n" +
      "You mustn't make noise between ten at night and seven in the morning. On Sunday the quiet time is all day.\n" +
      "You don't have to clean the stairs. A company comes every week. But you have to clean the balcony in front of your flat.\n" +
      "Bikes are forbidden in the hallway. There is a room for them next to the front door.\n" +
      "The attic is open from April to October. From November it is closed, because the roof is old.\n" +
      "If something is broken, tell the caretaker or write to the landlord. Please don't repair it.\n" +
      "Thank you — a quiet building is a good building.",
    questions: [
      {
        text: "What do you have to do with the rubbish?",
        options: ["put it in the garbage can before eight", "take it out on Monday", "leave it in the hallway"],
        answer: 0,
        explain: "Çöpü kutuya koymak sakine, dışarı çıkarmak görevliye ait.",
      },
      {
        text: "Who cleans the stairs?",
        options: ["a company", "the residents", "the caretaker"],
        answer: 0,
        explain: "„You don't have to clean the stairs. A company comes every week.“",
      },
      {
        kind: "truefalse",
        text: "The residents have to clean the stairs.",
        options: ["True", "False"],
        answer: 1,
        explain: "„You don't have to…“ — yasak değil, GEREK YOK.",
      },
      {
        kind: "gapfill",
        text: "The attic is open from April to ___.",
        options: [],
        answer: 0,
        accept: ["October"],
        explain: "„The attic is open from April to October. In winter it is closed…“",
      },
      {
        kind: "short_answer",
        text: "Where can you put your bike?",
        options: [],
        answer: 0,
        accept: ["next to the front door", "in the room", "the room"],
        explain: "„There is a room for them next to the front door.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a2-u10-l1",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 10,
    title: "My neighbourhood",
    genre: "monologue",
    intro: "Bir mahalle anlatılıyor. Nesi iyi, nesi eksik?",
    gloss: [
      { de: "cinema", tr: "sinema" },
      { de: "missing", tr: "eksik" },
      { de: "on foot", tr: "yürüyerek" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Mert", text: "I moved to this area in March and now I don't want to go back." },
      { speaker: "Mert", text: "There is a park nearby. From my front door it takes ten minutes on foot." },
      { speaker: "Mert", text: "It's quieter than the city centre, but it isn't boring. On Saturday the market is crowded." },
      { speaker: "Mert", text: "The bus stop is under my window. That was a problem in the first week and now I don't hear it." },
      { speaker: "Mert", text: "At night the streets are safe. There are always people, because the bakery opens at four." },
      { speaker: "Mert", text: "What is missing? A cinema. For a film I have to take the bus for twenty minutes." },
      { speaker: "Mert", text: "And the rents are going up. Two years ago this area was cheap." },
      { speaker: "Mert", text: "But I know one thing already: if the rent goes up again, I will stay and cook at home." },
    ],
    questions: [
      {
        text: "How long does it take to the park?",
        options: ["ten minutes on foot", "twenty minutes by bus", "four minutes"],
        answer: 0,
        explain: "„From my front door it takes ten minutes on foot.“ — yirmi dakika sinema için.",
      },
      {
        text: "What is missing in the area?",
        options: ["a cinema", "a park", "a bakery"],
        answer: 0,
        explain: "„What is missing? A cinema.“",
      },
      {
        kind: "truefalse",
        text: "The area is quieter than the city centre.",
        options: ["True", "False"],
        answer: 0,
        explain: "„It's quieter than the city centre, but it isn't boring.“",
      },
      {
        kind: "gapfill",
        text: "The bakery opens at ___.",
        options: [],
        answer: 0,
        accept: ["four", "4"],
        explain: "„There are always people, because the bakery opens at four.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["There is a park nearby.", "There is a park nearby"],
        explain: "Varlık cümlesi; „nearby“ tek sözcük ve edat almıyor.",
      },
      {
        kind: "short_answer",
        text: "Why are the streets safe at night?",
        options: [],
        answer: 0,
        accept: ["there are always people", "the bakery opens at four", "people"],
        explain: "„There are always people, because the bakery opens at four.“",
      },
    ],
  },
  {
    id: "en-a2-u10-l2",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 10,
    title: "Local shops",
    genre: "dialogue",
    intro: "Fırında kısa bir alışveriş. Pazar günü ne açık, ne kapalı?",
    gloss: [
      { de: "fresh", tr: "taze" },
      { de: "counts", tr: "sayar" },
      { de: "Here you are", tr: "buyurun" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Sena", text: "Good morning. Do you have any fresh bread?" },
      { speaker: "Baker", text: "Yes, it came out ten minutes ago. Which one?" },
      { speaker: "Sena", text: "The dark one, please. And two small ones for the children." },
      { speaker: "Baker", text: "Here you are. Anything else?" },
      { speaker: "Sena", text: "What time do you open on Sunday?" },
      { speaker: "Baker", text: "At seven, like every day. But we close at twelve." },
      { speaker: "Sena", text: "Good to know. Is the corner shop open on Sunday too?" },
      { speaker: "Baker", text: "No, only we and the laundry. The butcher shop and the bookstore are closed." },
      { speaker: "Sena", text: "And the shopping mall?" },
      { speaker: "Baker", text: "Open, but it takes half an hour by bus. For bread that is too far." },
      { speaker: "Sena", text: "You are right. I've already been to the bakery three times this week." },
      { speaker: "Baker", text: "Four with today. But who counts?" },
    ],
    questions: [
      {
        text: "What time does the bakery close on Sunday?",
        options: ["at twelve", "at seven", "at four"],
        answer: 0,
        explain: "„At seven, like every day. But we close at twelve.“ — yedi açılış saati.",
      },
      {
        text: "Which shops are open on Sunday?",
        options: ["the bakery and the laundry", "the butcher shop", "the bookstore"],
        answer: 0,
        explain: "„No, only we and the laundry.“",
      },
      {
        kind: "truefalse",
        text: "The shopping mall is closed on Sunday.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Open, but it takes half an hour by bus.“ — açık ama uzak.",
      },
      {
        kind: "gapfill",
        text: "The bread came out ___ minutes ago.",
        options: [],
        answer: 0,
        accept: ["ten", "10"],
        explain: "„Yes, it came out ten minutes ago.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["What time do you open on Sunday?", "What time do you open on Sunday"],
        explain: "Açılış saati sorusu „what time“ ile; gün „on“ ile.",
      },
      {
        kind: "short_answer",
        text: "How often has Sena been to the bakery this week?",
        options: [],
        answer: 0,
        accept: ["three times", "four times", "3 times"],
        explain: "„I've already been to the bakery three times this week.“ — fırıncı bugünü de sayıyor.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-u10-w1",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 10,
    title: "You have to, you mustn't, you don't have to",
    genre: "info",
    intro: "Zorunluluk üçlüsü. Üçüncüsü ikinciye benziyor ama tam karşıtı.",
    gloss: [
      { de: "have to", tr: "zorundasın" },
      { de: "mustn't", tr: "yapmamalısın" },
      { de: "don't have to", tr: "gerek yok" },
      { de: "a company", tr: "bir şirket" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Çöpü akşam sekizden önce çöp kutusuna koymalısın.",
        answer: "You have to put the rubbish in the garbage can before eight.",
        hint: "„have to“ dışarıdan gelen zorunluluk: kural böyle diyor.",
      },
      {
        kind: "build",
        tr: "Geceleri gürültü yapmamalısın.",
        answer: "You mustn't make noise at night.",
        alternatives: ["You must not make noise at night."],
        hint: "„mustn't“ YASAK demek: izin yok.",
      },
      {
        kind: "build",
        tr: "Merdivenleri temizlemen gerekmiyor.",
        answer: "You don't have to clean the stairs.",
        alternatives: ["You do not have to clean the stairs."],
        hint: "„don't have to“ yasak DEĞİL, gerek yok — „mustn't“un tam karşıtı.",
      },
      {
        kind: "build",
        tr: "Çamaşır makinem çalışmıyor.",
        answer: "My washing machine isn't working.",
        alternatives: ["My washing machine is not working."],
        hint: "Şu anda bozuk olduğu için şimdiki zamanın olumsuzu.",
      },
      {
        kind: "form",
        prompt: "Bina kuralları kartını doldur.",
        facts: "Çöp sekizden önce; gürültü geceden sabaha yasak; merdivenler şirkete ait; tavan arası nisandan ekime açık.",
        fields: [
          { label: "Rubbish", answer: "before eight", accept: ["before 8"] },
          { label: "Noise", answer: "forbidden at night", accept: ["forbidden", "not at night"] },
          { label: "Stairs", answer: "a company", accept: ["a company cleans them"] },
          { label: "Attic", answer: "April to October", accept: ["from April to October"] },
        ],
      },
    ],
  },
  {
    id: "en-a2-u10-w2",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 10,
    title: "There is a park nearby",
    genre: "personal",
    intro: "Mahalleni anlat ve tamirciye sor.",
    gloss: [
      { de: "nearby", tr: "yakında" },
      { de: "on foot", tr: "yürüyerek" },
      { de: "cost", tr: "mal olmak" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Yakında bir park var.",
        answer: "There is a park nearby.",
        alternatives: ["There's a park nearby."],
        hint: "„nearby“ tek sözcük ve önüne edat almıyor.",
      },
      {
        kind: "build",
        tr: "Yürüyerek on dakika sürüyor.",
        answer: "It takes ten minutes on foot.",
        hint: "Süre için „it takes“ kalıbı; baştaki „it“ boş bir özne.",
      },
      {
        kind: "build",
        tr: "Şehir merkezinden daha sessiz.",
        answer: "It's quieter than the city centre.",
        alternatives: ["It is quieter than the city centre."],
        hint: "„quiet“ kısa: „-er“ alıyor ve sondaki „t“den önce „e“ düşmüyor.",
      },
      {
        kind: "build",
        tr: "Saat kaçta açıyorsunuz?",
        answer: "What time do you open?",
        hint: "Saat sorusu „what time“ ile; „open“ burada fiil.",
      },
      {
        kind: "build",
        tr: "Ne kadara mal olacak?",
        answer: "How much will it cost?",
        hint: "„cost“ burada fiil, isim değil; gelecek „will“ ile kuruluyor.",
      },
    ],
  },
];
