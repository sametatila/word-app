import type { SkillExercise } from "../types";

/**
 * EN · A2 · Ünite 11 — "İş ilanı, deneyim, mülakat, iş yeri".
 *
 * Dört ders: Reading a job ad · My experience · At the interview ·
 * My workplace.
 *
 *   Kelime: experience, salary, apply, full-time, required, ad, position,
 *           business, work, company, year, learn, skill, worker,
 *           workplace, project, interview, strength, team, reason, start,
 *           chance, introduce oneself, successful, office, colleague,
 *           boss, desk, floor, department, corridor, coffee break.
 *   Kalıp:  Experience is required. · I have two years of experience. ·
 *           I want to apply for this job. ·
 *           I have worked at a big company. · I worked there for two years. ·
 *           How long have you worked here? ·
 *           I have worked in a team for three years. ·
 *           My greatest strength is working with people. ·
 *           I can start on Monday. ·
 *           I work in an office on the third floor. ·
 *           There are ten people in my team. · What's your office like?
 *
 * Ünitenin tek öğretme noktası PRESENT PERFECT İLE SIMPLE PAST'IN İŞ
 * GEÇMİŞİNDEKİ AYRIMI. „I have worked at a big company“ deneyimin kendisini
 * söylüyor, tarihi söylemiyor; „I worked there for two years“ kapanmış bir
 * dönemi söylüyor. Aynı özgeçmişte ikisi yan yana duruyor ve seçim
 * anlamı değiştiriyor — o yüzden mektup, mülakat ve yazma egzersizi
 * üçü de aynı çifti kullanıyor.
 */
export const enA2U11: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a2-u11-r1",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 11,
    title: "Reading a job ad",
    genre: "ad",
    intro: "Bir iş ilanı. Ne zorunlu, ne değil?",
    gloss: [
      { de: "helper", tr: "yardımcı" },
      { de: "at least", tr: "en az" },
      { de: "offer", tr: "sunmak" },
      { de: "instructions", tr: "yönergeler" },
    ],
    minutes: 5,
    text:
      "Kitchen helper — full-time\n" +
      "We are a small business in the city centre. We are looking for a kitchen helper for our restaurant.\n" +
      "The position: Monday to Friday, from ten to six. No work at the weekend.\n" +
      "Salary: 2100 euros a month. After one year 2300.\n" +
      "Experience is required: at least one year in a kitchen.\n" +
      "German is not required, but you have to understand simple instructions.\n" +
      "What we offer: a free meal every day, a coffee break in the morning and in the afternoon, and a team of eight people.\n" +
      "If you want to apply for this job, write to us and tell us where you have worked before.\n" +
      "We answer every letter — also when the answer is no.",
    questions: [
      {
        text: "When is the work?",
        options: ["Monday to Friday, ten to six", "at the weekend", "every evening"],
        answer: 0,
        explain: "„The position: Monday to Friday, from ten to six. No work at the weekend.“",
      },
      {
        text: "What is required?",
        options: ["one year in a kitchen", "German", "a full-time team"],
        answer: 0,
        explain: "„Experience is required: at least one year in a kitchen.“",
      },
      {
        kind: "truefalse",
        text: "German is not required for this job.",
        options: ["True", "False"],
        answer: 0,
        explain: "„German is not required, but you have to understand simple instructions.“",
      },
      {
        kind: "gapfill",
        text: "After one year the salary is ___ euros.",
        options: [],
        answer: 0,
        accept: ["2300", "2.300"],
        explain: "„Salary: 2100 euros a month. After one year 2300.“",
      },
      {
        kind: "short_answer",
        text: "What should you write in your letter?",
        options: [],
        answer: 0,
        accept: ["where you have worked", "where I have worked", "your experience"],
        explain: "„…tell us where you have worked before.“",
      },
    ],
  },
  {
    id: "en-a2-u11-r2",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 11,
    title: "My experience",
    genre: "letter",
    intro: "Başvuru mektubu. Hangi cümle deneyimi, hangisi kapanmış dönemi söylüyor?",
    gloss: [
      { de: "canteen", tr: "yemekhane" },
      { de: "everything else", tr: "kalan her şey" },
      { de: "a little", tr: "biraz" },
      { de: "Best wishes", tr: "saygılarımla" },
    ],
    minutes: 6,
    text:
      "Dear Mr Arda,\n" +
      "I am writing about the kitchen helper position in your advert.\n" +
      "I have worked in a kitchen for four years. From 2021 to 2023 I worked at a big company with a canteen for three hundred people. After that I worked for two years in a small restaurant near the station.\n" +
      "In the canteen I learned to work fast and in a team. In the small restaurant I learned everything else: the long evenings, the money and the noise.\n" +
      "I have also worked with a cook from Italy, so I know a little Italian, but my English is better.\n" +
      "I can start on the first of March. I am free every day and I have already talked to my old boss.\n" +
      "Thank you for reading this. I hope to hear from you.\n" +
      "Best wishes,\n" +
      "Deniz Kaya",
    questions: [
      {
        text: "How long has Deniz worked in a kitchen?",
        options: ["four years", "two years", "three hundred days"],
        answer: 0,
        explain: "„I have worked in a kitchen for four years.“ — hâlâ süren deneyim.",
      },
      {
        text: "Where did Deniz work from 2021 to 2023?",
        options: ["at a big company with a canteen", "in a small restaurant", "in Italy"],
        answer: 0,
        explain: "Kapanmış bir dönem olduğu için „I worked“, „I have worked“ değil.",
      },
      {
        kind: "truefalse",
        text: "Deniz speaks Italian better than English.",
        options: ["True", "False"],
        answer: 1,
        explain: "„…I know a little Italian, but my English is better.“",
      },
      {
        kind: "gapfill",
        text: "Deniz can start on the first of ___.",
        options: [],
        answer: 0,
        accept: ["March"],
        explain: "„I can start on the first of March.“",
      },
      {
        kind: "order",
        text: "İş geçmişinin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "a big company with a canteen",
          "a small restaurant near the station",
          "a talk with the old boss",
          "a letter to Mr Arda",
        ],
        explain: "Önce iki iş, sonra bu hafta olanlar: konuşma, sonra mektup.",
      },
      {
        kind: "short_answer",
        text: "What did Deniz learn in the canteen?",
        options: [],
        answer: 0,
        accept: ["to work fast", "to work fast and in a team", "work in a team"],
        explain: "„In the canteen I learned to work fast and in a team.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a2-u11-l1",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 11,
    title: "At the interview",
    genre: "interview",
    intro: "Mülakat. Hangi soruya hangi zamanla cevap veriliyor?",
    gloss: [
      { de: "yourself", tr: "kendiniz" },
      { de: "greatest", tr: "en büyük" },
      { de: "calm", tr: "sakin" },
      { de: "canteen", tr: "yemekhane" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Boss", text: "Good morning, Deniz. Please sit down. Tell me about yourself." },
      { speaker: "Deniz", text: "I have worked in kitchens for four years. Two years in a canteen, two years in a restaurant." },
      { speaker: "Boss", text: "Why do you want a new job?" },
      { speaker: "Deniz", text: "Not because the old one is bad. I want a team and a plan for the week." },
      { speaker: "Boss", text: "What is your greatest strength?" },
      { speaker: "Deniz", text: "Working with people. In the canteen I have worked in a team of twelve." },
      { speaker: "Boss", text: "And your reason for this business?" },
      { speaker: "Deniz", text: "I ate here in June. The kitchen was open and everybody was calm. That is not normal at seven in the evening." },
      { speaker: "Boss", text: "True. When can you start?" },
      { speaker: "Deniz", text: "I can start on Monday." },
      { speaker: "Boss", text: "One more question: what was difficult for you at work?" },
      { speaker: "Deniz", text: "I said yes to everything in my first year. Now I ask first." },
      { speaker: "Boss", text: "That is a good answer. We call you on Friday." },
    ],
    questions: [
      {
        text: "How long has Deniz worked in kitchens?",
        options: ["four years", "two years", "twelve years"],
        answer: 0,
        explain: "„I have worked in kitchens for four years.“ — ikişer yıl iki yerde.",
      },
      {
        text: "What is Deniz's greatest strength?",
        options: ["working with people", "cooking fast", "the Italian language"],
        answer: 0,
        explain: "„Working with people. In the canteen I have worked in a team of twelve.“",
      },
      {
        kind: "truefalse",
        text: "Deniz wants a team and a plan for the week.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Not because the old one is bad. I want a team and a plan for the week.“",
      },
      {
        kind: "gapfill",
        text: "The team in the canteen had ___ people.",
        options: [],
        answer: 0,
        accept: ["twelve", "12"],
        explain: "„In the canteen I have worked in a team of twelve.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I can start on Monday.", "I can start on Monday"],
        explain: "„can“ sonrası fiil eksiz; gün „on“ ile.",
      },
      {
        kind: "short_answer",
        text: "What was difficult for Deniz in the first year?",
        options: [],
        answer: 0,
        accept: ["saying yes to everything", "to say yes", "saying yes"],
        explain: "„I said yes to everything in my first year. Now I ask first.“",
      },
    ],
  },
  {
    id: "en-a2-u11-l2",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 11,
    title: "My workplace",
    genre: "monologue",
    intro: "Bir ofis anlatılıyor. Kaç kişi, hangi kat, nesi özel?",
    gloss: [
      { de: "strange", tr: "tuhaf" },
      { de: "What's my workplace like?", tr: "iş yerim nasıl bir yer?" },
      { de: "warm", tr: "sıcak" },
      { de: "winter", tr: "kış" },
      { de: "a real kitchen", tr: "gerçek bir mutfak" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Nil", text: "I work in an office on the third floor. Twelve desks, one window for two people." },
      { speaker: "Nil", text: "There are ten people in my team. Four of them have worked here longer than me." },
      { speaker: "Nil", text: "My boss sits in the same room. That was strange in the first week, and now it is the best thing." },
      { speaker: "Nil", text: "The corridor is long and cold. In winter we walk fast." },
      { speaker: "Nil", text: "The coffee break is at half past ten. It is not in the rules, but everybody comes." },
      { speaker: "Nil", text: "The department next to us is bigger, twenty people, and their coffee is free." },
      { speaker: "Nil", text: "We have a small kitchen. I have worked in three offices and this is the only one with a real kitchen." },
      { speaker: "Nil", text: "What's my workplace like? Old building, cold corridor, warm people. I would not change it." },
    ],
    questions: [
      {
        text: "How many people are in Nil's team?",
        options: ["ten", "twelve", "twenty"],
        answer: 0,
        explain: "„There are ten people in my team.“ — on iki masa, yirmi kişi yan departman.",
      },
      {
        text: "What is special about Nil's office?",
        options: ["it has a real kitchen", "the coffee is free", "it is on the ground floor"],
        answer: 0,
        explain: "„…this is the only one with a real kitchen.“ Bedava kahve yan departmanda.",
      },
      {
        kind: "truefalse",
        text: "Nil's boss sits far from the team.",
        options: ["True", "False"],
        answer: 1,
        explain: "„My boss sits in the same room.“",
      },
      {
        kind: "gapfill",
        text: "The coffee break is at half past ___.",
        options: [],
        answer: 0,
        accept: ["ten", "10"],
        explain: "„The coffee break is at half past ten.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I work in an office on the third floor.", "I work in an office on the third floor"],
        explain: "Kat „on the … floor“ ile; sıra sayısında „the“ zorunlu.",
      },
      {
        kind: "short_answer",
        text: "How many offices has Nil worked in?",
        options: [],
        answer: 0,
        accept: ["three", "3"],
        explain: "„I have worked in three offices…“ — deneyimin kendisi, tarihi değil.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-u11-w1",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 11,
    title: "I have worked at a big company",
    genre: "formal",
    intro: "Aynı özgeçmişte iki zaman. Hangisi deneyim, hangisi kapanmış dönem?",
    gloss: [
      { de: "apply for", tr: "başvurmak" },
      { de: "of experience", tr: "deneyim" },
      { de: "worked there", tr: "orada çalıştım" },
      { de: "canteen", tr: "yemekhane" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Büyük bir şirkette çalıştım.",
        answer: "I have worked at a big company.",
        alternatives: ["I've worked at a big company."],
        hint: "Ne zaman olduğu söylenmiyor: present perfect. Önemli olan deneyimin kendisi.",
      },
      {
        kind: "build",
        tr: "Orada iki yıl çalıştım.",
        answer: "I worked there for two years.",
        hint: "Kapanmış ve bitmiş bir dönem: simple past. „have worked“ olsaydı hâlâ sürüyor derdi.",
      },
      {
        kind: "build",
        tr: "Ne kadar zamandır burada çalışıyorsun?",
        answer: "How long have you worked here?",
        hint: "İş sürüyor, o yüzden present perfect; Türkçe aynı yerde şimdiki zaman diyor.",
      },
      {
        kind: "build",
        tr: "Bu işe başvurmak istiyorum.",
        answer: "I want to apply for this job.",
        hint: "„apply“ kendi edatını taşıyor: for. Başvurulan şey ondan sonra geliyor.",
      },
      {
        kind: "form",
        prompt: "Başvuru kartını doldur.",
        facts: "Mutfakta dört yıl; 2021–2023 büyük şirket; sonra iki yıl küçük restoran; başlangıç bir mart.",
        fields: [
          { label: "Experience", answer: "four years", accept: ["4 years"] },
          { label: "2021 to 2023", answer: "a big company", accept: ["a canteen", "a big company with a canteen"] },
          { label: "After that", answer: "a small restaurant", accept: ["a restaurant"] },
          { label: "Start", answer: "the first of March", accept: ["1 March", "March"] },
        ],
      },
    ],
  },
  {
    id: "en-a2-u11-w2",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 11,
    title: "At the interview",
    genre: "formal",
    intro: "Mülakatın beş cümlesi. İlanın dili edilgen, cevabın dili birinci tekil.",
    gloss: [
      { de: "greatest strength", tr: "en güçlü yön" },
      { de: "is required", tr: "zorunlu" },
      { de: "in a team", tr: "takım hâlinde" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Üç yıldır bir takımda çalışıyorum.",
        answer: "I have worked in a team for three years.",
        alternatives: ["I've worked in a team for three years."],
        hint: "Süre + hâlâ sürüyor: „for“ ile present perfect.",
      },
      {
        kind: "build",
        tr: "En güçlü yönüm insanlarla çalışmak.",
        answer: "My greatest strength is working with people.",
        hint: "Yüklemden sonra fiil „-ing“ alıyor, mastar değil.",
      },
      {
        kind: "build",
        tr: "Pazartesi başlayabilirim.",
        answer: "I can start on Monday.",
        hint: "Gün „on“ ile; „can“ sonrası fiil eksiz kalıyor.",
      },
      {
        kind: "build",
        tr: "İki yıl deneyimim var.",
        answer: "I have two years of experience.",
        hint: "Buradaki „have“ sahiplik, yardımcı fiil değil; ölçüyü „of“ bağlıyor.",
      },
      {
        kind: "build",
        tr: "Deneyim zorunlu.",
        answer: "Experience is required.",
        hint: "Edilgen kuruluyor: „is required“. İlanda kimin istediği zaten belli.",
      },
    ],
  },
];
