import type { SkillExercise } from "../types";

/**
 * EN · A1 · Ünite 22 — "Eczane, rapor, öğüt, acil durum".
 *
 * Dört ders: At the pharmacy · Calling in sick · Friendly advice ·
 * Emergency.
 *
 *   Kelime: medicine, tablet, headache, take, water, glass, little,
 *           closed, work, today, call, better, tomorrow, cell phone,
 *           be cold, tell, should, try, drink, sleep, careful, more,
 *           light, simple, help, ambulance, fast, danger, cry, dark, out.
 *   Kalıp:  I have a headache. · Can I have some medicine, please? ·
 *           How many times a day? · I'm not feeling well. ·
 *           I can't come to work today. · I'll be better tomorrow. ·
 *           You should + fiil · You shouldn't + fiil · What should I do? ·
 *           Call an ambulance! · I need help. · Don't move!
 *
 * Ünitenin yeni kipi ÖĞÜT: „should“. Zorunluluktan („must“) farkı derece
 * değil KAYNAK — „must“ bir kural söylüyor, „should“ bir tavsiye. Türkçe
 * ikisini de „-meli“ ile karşılıyor ve fark ancak bağlamdan çıkıyor;
 * içerik ikisini bilerek ayrı egzersizlere koymuyor, aynı diyalogda yan
 * yana kullanıyor.
 */
export const enA1U22: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a1-u22-r1",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 22,
    title: "At the pharmacy",
    genre: "dialogue",
    intro: "Eczanede ilaç alınıyor. Günde kaç kez, ne kadar, kime uygun?",
    gloss: [
      { de: "Get better soon", tr: "geçmiş olsun" },
      { de: "tablet", tr: "tablet" },
      { de: "careful", tr: "dikkatli" },
    ],
    minutes: 4,
    text:
      "Ela: Good morning. I have a headache. Can I have some medicine, please?\n" +
      "Chemist: Of course. These tablets are good. Take one with a glass of water.\n" +
      "Ela: How many times a day?\n" +
      "Chemist: Three times: morning, afternoon and evening. But not more!\n" +
      "Ela: And can I drink coffee?\n" +
      "Chemist: A little, yes. But you should drink more water and sleep more.\n" +
      "Ela: I can't sleep. I work every day and I am tired.\n" +
      "Chemist: Then you shouldn't work tomorrow. Call your office and tell them.\n" +
      "Ela: Maybe. How much are the tablets?\n" +
      "Chemist: Six euros. And be careful: this medicine is not for children.\n" +
      "Ela: I understand. Thank you.\n" +
      "Chemist: Get better soon!",
    questions: [
      {
        text: "What does Ela need?",
        options: ["medicine for a headache", "a glass of water", "coffee"],
        answer: 0,
        explain: "„I have a headache. Can I have some medicine, please?“ — su ilacı içmek için.",
      },
      {
        text: "How many times a day does Ela take the tablets?",
        options: ["three", "one", "six"],
        answer: 0,
        explain: "„Three times: morning, afternoon and evening.“ — bir tanedir her seferde, altı fiyat.",
      },
      {
        kind: "truefalse",
        text: "The medicine is for children too.",
        options: ["True", "False"],
        answer: 1,
        explain: "„And be careful: this medicine is not for children.“",
      },
      {
        kind: "gapfill",
        text: "Take one tablet with a glass of ___.",
        options: [],
        answer: 0,
        accept: ["water"],
        explain: "„Take one with a glass of water.“",
      },
      {
        kind: "short_answer",
        text: "How much are the tablets?",
        options: [],
        answer: 0,
        accept: ["six euros", "6 euros", "six"],
        explain: "„How much are the tablets? — Six euros.“",
      },
    ],
  },
  {
    id: "en-a1-u22-r2",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 22,
    title: "Calling in sick",
    genre: "phone",
    intro: "İşe rapor bildiriliyor. Bugün ne oluyor, yarın ne, öbür gün ne?",
    gloss: [
      { de: "One moment", tr: "bir dakika" },
      { de: "problem", tr: "sorun" },
      { de: "Get better soon", tr: "geçmiş olsun" },
    ],
    minutes: 4,
    text:
      "Deniz: Good morning, this is Deniz. Can I speak to Mr. Kaya?\n" +
      "Office: One moment. Yes, here is Mr. Kaya.\n" +
      "Deniz: Good morning. I'm not feeling well. I can't come to work today.\n" +
      "Mr. Kaya: I'm sorry. What is the problem?\n" +
      "Deniz: I have a headache and I am cold. Maybe thirty-eight degrees.\n" +
      "Mr. Kaya: Then you should stay at home. Do you have medicine?\n" +
      "Deniz: Yes, tablets. I take them three times a day.\n" +
      "Mr. Kaya: Good. And drink more water.\n" +
      "Deniz: I'll be better tomorrow, I think.\n" +
      "Mr. Kaya: Don't come tomorrow. Come on Thursday. Call me tomorrow and tell me.\n" +
      "Deniz: Thank you. I call you with my cell phone.\n" +
      "Mr. Kaya: Get better soon!",
    questions: [
      {
        text: "Why can't Deniz come to work?",
        options: ["he is not feeling well", "he has no medicine", "the office is closed"],
        answer: 0,
        explain: "„I'm not feeling well. I can't come to work today.“ — ilacı var.",
      },
      {
        text: "When does Deniz come to work?",
        options: ["on Thursday", "tomorrow", "today"],
        answer: 0,
        explain: "„Don't come tomorrow. Come on Thursday.“ — yarın yalnız telefon edecek.",
      },
      {
        kind: "truefalse",
        text: "Deniz has no medicine.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Yes, tablets. I take them three times a day.“",
      },
      {
        kind: "gapfill",
        text: "Deniz takes the tablets three ___ a day.",
        options: [],
        answer: 0,
        accept: ["times"],
        explain: "„I take them three times a day.“",
      },
      {
        kind: "order",
        text: "Konuşmanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Can I speak to Mr. Kaya?",
          "I can't come to work today.",
          "Then you should stay at home.",
          "Come on Thursday.",
        ],
        explain: "Önce bağlantı, sonra haber, sonra öğüt, en son yeni gün.",
      },
      {
        kind: "short_answer",
        text: "What must Deniz do tomorrow?",
        options: [],
        answer: 0,
        accept: ["call Mr. Kaya", "call the office", "call and tell"],
        explain: "„Call me tomorrow and tell me.“ — gelmeyecek, yalnız arayacak.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a1-u22-l1",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 22,
    title: "Friendly advice",
    genre: "dialogue",
    intro: "Bir arkadaş öğüt veriyor. „should“ ve „shouldn't“ art arda geliyor.",
    gloss: [
      { de: "sugar", tr: "şeker" },
      { de: "light", tr: "hafif" },
      { de: "You should …", tr: "… melisin" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Nil", text: "I am tired every morning. What should I do?" },
      { speaker: "Can", text: "You should sleep more. How many hours do you sleep?" },
      { speaker: "Nil", text: "Five, maybe six." },
      { speaker: "Can", text: "That is too little. You should sleep eight hours." },
      { speaker: "Nil", text: "And in the evening I drink three cups of coffee." },
      { speaker: "Can", text: "Then you shouldn't drink coffee after six! Try water or light tea." },
      { speaker: "Nil", text: "Maybe you are right. And food?" },
      { speaker: "Can", text: "A light dinner is better. Something simple: soup, bread, cheese." },
      { speaker: "Nil", text: "I eat a big dinner at ten in the evening." },
      { speaker: "Can", text: "At ten! You shouldn't eat so late. And be careful with sugar." },
      { speaker: "Nil", text: "Good. I try it for one week." },
      { speaker: "Can", text: "And call me on Sunday. Then you tell me!" },
    ],
    questions: [
      {
        text: "How many hours should Nil sleep?",
        options: ["eight", "five", "six"],
        answer: 0,
        explain: "„You should sleep eight hours.“ — beş ve altı şu anki hâli.",
      },
      {
        text: "What shouldn't Nil drink after six?",
        options: ["coffee", "water", "light tea"],
        answer: 0,
        explain: "„Then you shouldn't drink coffee after six! Try water or light tea.“",
      },
      {
        kind: "truefalse",
        text: "Nil eats a light dinner.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I eat a big dinner at ten in the evening.“ — hafif akşam yemeği öğüdün kendisi.",
      },
      {
        kind: "gapfill",
        text: "A light dinner is ___.",
        options: [],
        answer: 0,
        accept: ["better"],
        explain: "„A light dinner is better.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["You should sleep more.", "You should sleep more"],
        explain: "„You should sleep more.“ — „should“ sonrası fiil eksiz kalıyor.",
      },
      {
        kind: "short_answer",
        text: "When must Nil call Can?",
        options: [],
        answer: 0,
        accept: ["on Sunday", "Sunday"],
        explain: "„And call me on Sunday. Then you tell me!“",
      },
    ],
  },
  {
    id: "en-a1-u22-l2",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 22,
    title: "Emergency",
    genre: "dialogue",
    intro: "Acil bir durum. Emirler art arda geliyor — kim ne yapıyor?",
    gloss: [
      { de: "ambulance", tr: "ambulans" },
      { de: "hear", tr: "duymak" },
      { de: "danger", tr: "tehlike" },
      { de: "Don't move!", tr: "kımıldama" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Woman", text: "Help! I need help!" },
      { speaker: "Man", text: "What is the problem?" },
      { speaker: "Woman", text: "A man is on the ground. He doesn't move." },
      { speaker: "Man", text: "Call an ambulance! The number is one one two." },
      { speaker: "Woman", text: "I call now. My cell phone is here." },
      { speaker: "Man", text: "Good. Don't move him! That is a danger." },
      { speaker: "Woman", text: "He is cold. And it is dark here." },
      { speaker: "Man", text: "Take my jacket. Put it on him." },
      { speaker: "Woman", text: "A child is crying. That is his son, I think." },
      { speaker: "Man", text: "Come here, little one. Everything is good." },
      { speaker: "Woman", text: "The ambulance comes fast. I hear it." },
      { speaker: "Man", text: "Good. Then we wait here." },
    ],
    questions: [
      {
        text: "What is the problem?",
        options: ["a man is on the ground", "a child is crying", "it is dark"],
        answer: 0,
        explain: "„A man is on the ground. He doesn't move.“",
      },
      {
        text: "What is the number for the ambulance?",
        options: ["one one two", "one one one", "two two one"],
        answer: 0,
        explain: "„Call an ambulance! The number is one one two.“",
      },
      {
        kind: "truefalse",
        text: "The woman moves the man.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Don't move him! That is a danger.“",
      },
      {
        kind: "gapfill",
        text: "The man gives his ___.",
        options: [],
        answer: 0,
        accept: ["jacket"],
        explain: "„Take my jacket. Put it on him.“",
      },
      {
        kind: "order",
        text: "Yapılanların sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Help! I need help!",
          "Call an ambulance!",
          "Don't move him!",
          "Take my jacket.",
        ],
        explain: "Önce yardım çağrısı, sonra ambulans, sonra uyarı, en son ceket.",
      },
      {
        kind: "short_answer",
        text: "Who is crying?",
        options: [],
        answer: 0,
        accept: ["a child", "the child", "his son"],
        explain: "„A child is crying. That is his son, I think.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-u22-w1",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 22,
    title: "Can I have some medicine?",
    genre: "formal",
    intro: "Eczane ve rapor cümlelerini yaz. Sonunda eczane fişini doldur.",
    gloss: [
      { de: "Can I have some medicine, please?", tr: "biraz ilaç alabilir miyim lütfen" },
      { de: "How many times a day?", tr: "günde kaç kez" },
      { de: "I'm not feeling well.", tr: "iyi hissetmiyorum" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Biraz ilaç alabilir miyim, lütfen?",
        answer: "Can I have some medicine, please?",
        hint: "İkramda ve istekte „some“; „medicine“ sayılamaz, „a medicine“ olmaz.",
      },
      {
        kind: "build",
        tr: "Günde kaç kez?",
        answer: "How many times a day?",
        hint: "„times“ sayılabilir, o yüzden „how many“. Günde demek için „a day“.",
      },
      {
        kind: "build",
        tr: "İyi hissetmiyorum.",
        answer: "I'm not feeling well.",
        alternatives: ["I am not feeling well."],
        hint: "Şu anki hâl olduğu için „-ing“: am not feeling. Geniş zamanla „I don't feel well“ de doğru.",
      },
      {
        kind: "build",
        tr: "Bugün işe gelemem.",
        answer: "I can't come to work today.",
        hint: "„to work“ hedef; „work“ önünde artikel almıyor.",
      },
      {
        kind: "form",
        prompt: "Eczane fişini doldur.",
        facts: "Tablet; baş ağrısı; günde üç kez; altı euro.",
        fields: [
          { label: "Medicine", answer: "tablets", accept: ["tablet"] },
          { label: "Problem", answer: "headache", accept: ["a headache"] },
          { label: "Times", answer: "three a day", accept: ["three times a day", "three"] },
          { label: "Price", answer: "six euros", accept: ["6 euros", "six"] },
        ],
      },
    ],
  },
  {
    id: "en-a1-u22-w2",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 22,
    title: "You should …",
    genre: "personal",
    intro: "Öğüt ve acil çağrı yaz. „should“ kural değil tavsiye söylüyor.",
    gloss: [
      { de: "You should …", tr: "… melisin" },
      { de: "You shouldn't …", tr: "… memelisin" },
      { de: "What should I do?", tr: "ne yapmalıyım" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Daha çok uyumalısın.",
        answer: "You should sleep more.",
        hint: "„should“ sonrası eksiz fiil; „more“ cümlenin sonunda.",
      },
      {
        kind: "build",
        tr: "Kahve içmemelisin.",
        answer: "You shouldn't drink coffee.",
        alternatives: ["You should not drink coffee."],
        hint: "„shouldn't“ yasak değil tavsiye: „mustn't“ten yumuşak.",
      },
      {
        kind: "build",
        tr: "Ne yapmalıyım?",
        answer: "What should I do?",
        hint: "Soruda „should“ özneden öne geçiyor; „do“ burada asıl fiil.",
      },
      {
        kind: "build",
        tr: "Bir ambulans çağır!",
        answer: "Call an ambulance!",
        hint: "„call“ burada telefon etmek; sesli harfle başladığı için „an“.",
      },
      {
        kind: "build",
        tr: "Yardıma ihtiyacım var.",
        answer: "I need help.",
        hint: "„help“ sayılamaz: „a help“ olmaz, çoğulu da yok.",
      },
    ],
  },
];
