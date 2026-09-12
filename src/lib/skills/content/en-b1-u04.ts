import type { SkillExercise } from "../types";

/**
 * EN · B1 · Ünite 4 — "Kira sözleşmesi, taşınma günü, ev arkadaşları, tamir".
 *
 * Dört ders: The lease · Moving day · Living with flatmates ·
 * Getting it fixed.
 *
 *   Kelime: lease, deposit, renew, sign, van, carry, fragile, unpack,
 *           address, meter, ground, upstairs, share, chore, rota, tidy,
 *           guest, split, agree, argue, leak, plumber, boiler, fix, damp,
 *           broken, complain, delay.
 *   Kalıp:  The deposit is paid before you move in. ·
 *           The lease was signed last week. · When is the lease renewed? ·
 *           The van is coming at nine. ·
 *           I am going to unpack the kitchen first. ·
 *           I will carry that one. ·
 *           You have to tidy the kitchen after cooking. ·
 *           You don't have to ask about guests. ·
 *           We should agree on a rota. ·
 *           He said that he would come on Monday. ·
 *           She told me to wait for the plumber. ·
 *           He asked if the boiler was old.
 *
 * Ünitenin tek öğretme noktası ÜÇ GELECEĞİN AYNI SAHNEDE BULUŞMASI:
 * „The van is coming at nine“ (ayarlanmış), „I am going to unpack the
 * kitchen first“ (önceden kurulmuş plan), „I will carry that one“ (o anda
 * verilen karar). A2 ikisini, B1 ünite 2 üçüncüsünü getirmişti; taşınma
 * günü üçünü bir arada kullanmadan anlatılamıyor ve fark ancak yan yana
 * görülünce oturuyor.
 */
export const enB1U04: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-u4-r1",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 4,
    title: "Moving day",
    genre: "story",
    intro: "Taşınma günü. Ne plana uydu, ne uymadı?",
    gloss: [
      { de: "knife", tr: "bıçak" },
      { de: "except", tr: "dışında" },
      { de: "went to plan", tr: "plana uydu" },
      { de: "packed", tr: "topladım" },
      { de: "myself", tr: "kendim" },
    ],
    minutes: 7,
    text:
      "The van came at nine, which is the only thing that went to plan.\n" +
      "I had packed everything except the kitchen. I am going to unpack the kitchen first, I said at eight, and I believed it. At four in the afternoon the kitchen was still four boxes in the corridor and I was looking for a knife.\n" +
      "Two men carried the cupboard upstairs and stopped. It did not go through the door. They took the doors off the cupboard, carried it in two parts, and put it back together in the bedroom. Twenty minutes. They had done it before.\n" +
      "The fragile box was the one I carried myself. Six glasses from my grandmother, one towel between each. I will carry that one, I said at every step, and nobody argued.\n" +
      "The meter reading is the thing everybody forgets. I took a photo of both meters at ten past nine, before the first box came in. Three weeks later the gas company sent a bill for the previous flat and the photo closed the question in one email.\n" +
      "The last thing that went wrong was the address. Two streets in this city have almost the same name. The van driver knew. I did not.",
    questions: [
      {
        text: "What was the only thing that went to plan?",
        options: ["the van came at nine", "the kitchen was unpacked first", "the address was right"],
        answer: 0,
        explain: "„The van came at nine, which is the only thing that went to plan.“",
      },
      {
        text: "How did the cupboard get through the door?",
        options: ["the doors were taken off", "it went in one part", "it stayed outside"],
        answer: 0,
        explain: "„They took the doors off the cupboard, carried it in two parts, and put it back together…“",
      },
      {
        kind: "truefalse",
        text: "The van driver did not know about the two streets.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The van driver knew. I did not.“",
      },
      {
        kind: "gapfill",
        text: "The meter photo was taken at ___ past nine.",
        options: [],
        answer: 0,
        accept: ["ten", "10"],
        explain: "„I took a photo of both meters at ten past nine, before the first box came in.“",
      },
      {
        kind: "order",
        text: "Günün sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The van came at nine.",
          "I took a photo of both meters.",
          "Two men carried the cupboard upstairs.",
          "At four the kitchen was still in boxes.",
        ],
        explain: "Kamyonet, sayaç, dolap, akşamüstü mutfak.",
      },
      {
        kind: "short_answer",
        text: "What closed the question about the bill?",
        options: [],
        answer: 0,
        accept: ["the photo", "the meter photo"],
        explain: "„…the photo closed the question in one email.“",
      },
    ],
  },
  {
    id: "en-b1-u4-r2",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 4,
    title: "Living with flatmates",
    genre: "dialogue",
    intro: "Üç kural değil, üç gerekçe. Hangisi neden var?",
    gloss: [
      { de: "columns", tr: "sütun" },
      { de: "fridge", tr: "buzdolabı" },
      { de: "lasted", tr: "sürdü" },
      { de: "fair", tr: "yerinde" },
    ],
    minutes: 7,
    text:
      "Sena: Before you move in, three things. They are not rules, they are the reasons we still talk to each other.\n" +
      "Can: Go on.\n" +
      "Sena: You have to tidy the kitchen after cooking. Not the next morning — after.\n" +
      "Can: That is fair. I am the person who cooks at eleven at night.\n" +
      "Sena: Then you are the person who tidies at half past eleven.\n" +
      "Can: And guests?\n" +
      "Sena: You don't have to ask about guests. This is your flat too. Tell us if somebody stays three nights, because of the bathroom in the morning.\n" +
      "Can: And the chores?\n" +
      "Sena: We should agree on a rota. The last one lasted four months and then it lived on the fridge as a picture.\n" +
      "Can: Why did it stop working?\n" +
      "Sena: Because it had nine lines and nobody reads nine lines. The new one has three.\n" +
      "Can: Three chores?\n" +
      "Sena: Three columns. Kitchen, bathroom, rubbish. Everything else is: if you see it, you do it.\n" +
      "Can: And if somebody does not?\n" +
      "Sena: Then we argue once, quietly, and we split the work again. We have argued twice in two years. Both times about the same cupboard.",
    questions: [
      {
        text: "When do you have to tidy the kitchen?",
        options: ["after cooking", "the next morning", "once a week"],
        answer: 0,
        explain: "„You have to tidy the kitchen after cooking. Not the next morning — after.“",
      },
      {
        text: "Why did the old rota stop working?",
        options: ["it had nine lines", "nobody cooked", "it was on the fridge"],
        answer: 0,
        explain: "„Because it had nine lines and nobody reads nine lines. The new one has three.“",
      },
      {
        kind: "truefalse",
        text: "You have to ask before a guest comes.",
        options: ["True", "False"],
        answer: 1,
        explain: "„You don't have to ask about guests. This is your flat too.“",
      },
      {
        kind: "gapfill",
        text: "The new rota has ___ columns.",
        options: [],
        answer: 0,
        accept: ["three", "3"],
        explain: "„Three columns. Kitchen, bathroom, rubbish.“",
      },
      {
        kind: "short_answer",
        text: "How often have they argued in two years?",
        options: [],
        answer: 0,
        accept: ["twice", "two times", "2"],
        explain: "„We have argued twice in two years. Both times about the same cupboard.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-u4-l1",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 4,
    title: "Getting it fixed",
    genre: "dialogue",
    intro: "Beş gündür sıcak su yok. Ne işe yarıyor?",
    gloss: [
      { de: "Probably", tr: "herhâlde" },
      { de: "in writing", tr: "yazılı olarak" },
      { de: "so far", tr: "şimdiye kadar" },
      { de: "becomes", tr: "hâline geliyor" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Nil", text: "The boiler stopped on Saturday. No hot water since then." },
      { speaker: "Mert", text: "Did you call the landlord?" },
      { speaker: "Nil", text: "Twice. He said that he would come on Monday." },
      { speaker: "Mert", text: "And today is Wednesday." },
      { speaker: "Nil", text: "Today is Wednesday. Then he called and told me to wait for the plumber. The plumber called nobody." },
      { speaker: "Mert", text: "Write it down. Every call, the date and what was said." },
      { speaker: "Nil", text: "I have. Four lines so far." },
      { speaker: "Mert", text: "Good. That list is the only thing that works after two weeks." },
      { speaker: "Nil", text: "He asked if the boiler was old. I said it was in the flat before me and before the person before me." },
      { speaker: "Mert", text: "Then it is old." },
      { speaker: "Nil", text: "There is also damp in the corner of the bathroom now. Probably not the boiler." },
      { speaker: "Mert", text: "Probably the same leak. Send both in one email and ask for a date, not a promise." },
      { speaker: "Nil", text: "And if nothing happens?" },
      { speaker: "Mert", text: "Then you complain in writing and the delay becomes his problem, not yours. But most of the time the email with two dates is enough." },
    ],
    questions: [
      {
        text: "What did the landlord say first?",
        options: ["that he would come on Monday", "that the boiler was new", "that he would send a plumber"],
        answer: 0,
        explain: "„He said that he would come on Monday.“ — aktarılınca „will“ „would“ oluyor.",
      },
      {
        text: "What does Mert say Nil should ask for?",
        options: ["a date", "a promise", "a new boiler"],
        answer: 0,
        explain: "„Send both in one email and ask for a date, not a promise.“",
      },
      {
        kind: "truefalse",
        text: "The plumber called Nil.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Then he called and told me to wait for the plumber. The plumber called nobody.“",
      },
      {
        kind: "gapfill",
        text: "Nil has written ___ lines so far.",
        options: [],
        answer: 0,
        accept: ["four", "4"],
        explain: "„I have. Four lines so far.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["He said that he would come on Monday.", "He said that he would come on Monday"],
        explain: "Dolaylı anlatımda „will“ bir basamak geriye kayıp „would“ oluyor.",
      },
      {
        kind: "short_answer",
        text: "What is also wrong in the bathroom?",
        options: [],
        answer: 0,
        accept: ["damp", "there is damp", "damp in the corner"],
        explain: "„There is also damp in the corner of the bathroom now.“",
      },
    ],
  },
  {
    id: "en-b1-u4-l2",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 4,
    title: "The lease",
    genre: "monologue",
    intro: "Sözleşme üç kez okunmuş. En önemli kısım hangisi?",
    gloss: [
      { de: "rulebook", tr: "kural kitabı" },
      { de: "Automatically", tr: "kendiliğinden" },
      { de: "matters", tr: "önemli" },
      { de: "becomes", tr: "hâline geliyor" },
      { de: "anyway", tr: "zaten" },
      { de: "middle", tr: "orta" },
      { de: "arguments", tr: "tartışmalar" },
      { de: "renewed", tr: "yenileniyor" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Ela", text: "The lease was signed last week and I have read it three times since." },
      { speaker: "Ela", text: "The deposit is paid before you move in. Two months, into an account that is not the landlord's normal one." },
      { speaker: "Ela", text: "That last part matters. If the deposit sits in a separate account, it comes back. If it sits with the rent, it becomes a conversation." },
      { speaker: "Ela", text: "When is the lease renewed? Automatically, every twelve months, if nobody writes three months before." },
      { speaker: "Ela", text: "Three months. Not one. I put it in my calendar for the first of August and I will forget it anyway, so I put a second one in July." },
      { speaker: "Ela", text: "The part nobody reads is the middle: who pays for what. The boiler is the landlord. The light in the corridor is me." },
      { speaker: "Ela", text: "I asked why. The answer was honest: because the last three people broke it and nobody ever said how." },
      { speaker: "Ela", text: "A lease is not a rulebook. It is a list of arguments that already happened to somebody else." },
    ],
    questions: [
      {
        text: "How much is the deposit?",
        options: ["two months", "three months", "twelve months"],
        answer: 0,
        explain: "„Two months, into an account that is not the landlord's normal one.“",
      },
      {
        text: "When must somebody write to stop the lease?",
        options: ["three months before", "one month before", "in August"],
        answer: 0,
        explain: "„Automatically, every twelve months, if nobody writes three months before.“",
      },
      {
        kind: "truefalse",
        text: "The landlord pays for the light in the corridor.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The boiler is the landlord. The light in the corridor is me.“",
      },
      {
        kind: "gapfill",
        text: "Ela has read the lease ___ times.",
        options: [],
        answer: 0,
        accept: ["three", "3"],
        explain: "„The lease was signed last week and I have read it three times since.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The deposit is paid before you move in.", "The deposit is paid before you move in"],
        explain: "Edilgen: ödeyen kim, söylenmiyor, çünkü kuralın kendisi anlatılıyor.",
      },
      {
        kind: "short_answer",
        text: "What is a lease, in Ela's words?",
        options: [],
        answer: 0,
        accept: ["a list of arguments", "old arguments", "not a rulebook"],
        explain: "„It is a list of arguments that already happened to somebody else.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-u4-w1",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 4,
    title: "The van is coming at nine",
    genre: "personal",
    intro: "Üç gelecek, üç anlam. Hangisi ayarlanmış, hangisi plan, hangisi o anki karar?",
    gloss: [
      { de: "is coming", tr: "geliyor" },
      { de: "am going to", tr: "yapacağım" },
      { de: "I will carry", tr: "ben taşırım" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Kamyonet dokuzda geliyor.",
        answer: "The van is coming at nine.",
        hint: "Ayarlanmış: saat belli ve karşı taraf da biliyor. Şimdiki zamanın sürerli biçimi.",
      },
      {
        kind: "build",
        tr: "Önce mutfağı boşaltacağım.",
        answer: "I am going to unpack the kitchen first.",
        alternatives: ["I'm going to unpack the kitchen first."],
        hint: "Önceden kurulmuş plan: „going to“. Kimseyle ayarlanmış değil.",
      },
      {
        kind: "build",
        tr: "Onu ben taşırım.",
        answer: "I will carry that one.",
        alternatives: ["I'll carry that one."],
        hint: "O anda verilen karar: „will“. Üç biçim üç ayrı anlam taşıyor.",
      },
      {
        kind: "build",
        tr: "Depozito taşınmadan önce ödeniyor.",
        answer: "The deposit is paid before you move in.",
        hint: "Edilgen: ödeyen kim, söylenmiyor; kural anlatılıyor.",
      },
      {
        kind: "form",
        prompt: "Taşınma kartını doldur.",
        facts: "Kamyonet dokuzda; önce mutfak; kırılacak kutu elde taşındı; sayaç fotoğrafı dokuz onda.",
        fields: [
          { label: "Van", answer: "at nine", accept: ["nine"] },
          { label: "First", answer: "the kitchen", accept: ["kitchen"] },
          { label: "Fragile box", answer: "by hand", accept: ["I carried it"] },
          { label: "Meter photo", answer: "at ten past nine", accept: ["ten past nine"] },
        ],
      },
    ],
  },
  {
    id: "en-b1-u4-w2",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 4,
    title: "We should agree on a rota",
    genre: "personal",
    intro: "Ev kuralları ve aktarılan sözler. Hangi fiil kişiyi doğrudan alıyor?",
    gloss: [
      { de: "tidy", tr: "toplamak" },
      { de: "agree on", tr: "anlaşmak" },
      { de: "he would come", tr: "geleceğini" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Yemekten sonra mutfağı toplaman gerekiyor.",
        answer: "You have to tidy the kitchen after cooking.",
        hint: "Kuraldan gelen zorunluluk; „after“ sonrası fiil „-ing“ alıyor.",
      },
      {
        kind: "build",
        tr: "Misafirleri sormana gerek yok.",
        answer: "You don't have to ask about guests.",
        alternatives: ["You do not have to ask about guests."],
        hint: "Yasak değil, gerek yok.",
      },
      {
        kind: "build",
        tr: "Bir çizelgede anlaşmalıyız.",
        answer: "We should agree on a rota.",
        hint: "„agree“ konuda „on“ alıyor; kişide „with“ alırdı.",
      },
      {
        kind: "build",
        tr: "Pazartesi geleceğini söyledi.",
        answer: "He said that he would come on Monday.",
        alternatives: ["He said he would come on Monday."],
        hint: "Aktarılınca „will“ bir basamak geriye kayıp „would“ oluyor.",
      },
      {
        kind: "build",
        tr: "Bana tesisatçıyı beklememi söyledi.",
        answer: "She told me to wait for the plumber.",
        hint: "„tell“ kişiyi doğrudan alıyor ve sonrası mastar.",
      },
    ],
  },
];
