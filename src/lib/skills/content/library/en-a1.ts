import type { SkillExercise } from "../../types";

/**
 * EN · A1 — Beceriler kütüphanesi, ilk parti (2026-09-08).
 *
 * İngilizce dosyaların EMSALİ. Alan adı `de` hedef dil metnini (İngilizce)
 * taşır; `en` alanı bu kursta yazılmaz. Amerikan yazımı (color).
 *
 * Konular Patika'nın 100 A1 dersinin ve mobil kökenli 32 egzersizin dışından:
 * okula gezi mektubu, kayıp eşya bürosu, nineye doğum günü kartı, „th“ sesi
 * ve present simple'ın do/does kuralı. Havuz dışı kelimeler (camera, half
 * past, lost property) sözlükçede.
 */
export const enA1: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a1-lib-r1",
    course: "en",
    level: "A1",
    skill: "reading",
    title: "School Trip to the Zoo",
    genre: "text",
    intro: "Öğretmenin velilere gönderdiği kısa mektubu oku: gezi ne zaman, kaç para, çocuk yanında ne getirecek.",
    gloss: [
      { de: "trip", tr: "gezi" },
      { de: "half past eight", tr: "sekiz buçuk" },
      { de: "come back", tr: "geri dönmek" },
      { de: "cost", tr: "tutmak" },
      { de: "need", tr: "ihtiyacı olmak" },
      { de: "camera", tr: "fotoğraf makinesi" },
    ],
    minutes: 4,
    text:
      "Dear parents,\n\n" +
      "On Friday, May 10, class 3B goes to the city zoo. We meet at school at half past eight and come back at three o'clock.\n\n" +
      "The trip costs five euros. Please give the money to the teacher on Monday.\n\n" +
      "Your child needs a small bag, lunch, water and good shoes. The zoo is big and we walk a lot!\n\n" +
      "Phones stay at home. Cameras are okay.\n\n" +
      "Thank you,\nMs. Carter",
    questions: [
      {
        text: "What is the letter about?",
        options: ["a school trip", "a new teacher", "a birthday party at the zoo"],
        answer: 0,
        explain: "İlk cümle „class 3B goes to the city zoo“ — sınıf geziye gidiyor; öğretmen ya da parti anlatılmıyor.",
      },
      {
        text: "When does the class come back?",
        options: ["at three o'clock", "at half past eight", "on Monday"],
        answer: 0,
        explain: "„…and come back at three o'clock.“ Sekiz buçuk buluşma saati, pazartesi paranın günü.",
      },
      {
        kind: "truefalse",
        text: "The children can bring their phones.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Phones stay at home.“ — telefonlar evde kalıyor; fotoğraf makinesi serbest.",
      },
      {
        kind: "gapfill",
        text: "The trip costs ___ euros.",
        options: [],
        answer: 0,
        accept: ["five", "5"],
        explain: "„The trip costs five euros.“",
      },
      {
        kind: "short_answer",
        text: "What day is the trip?",
        options: [],
        answer: 0,
        accept: ["Friday", "on Friday", "Friday, May 10", "May 10", "Friday May 10"],
        explain: "„On Friday, May 10 …“ — gezi cuma günü.",
      },
      {
        text: "What does a child need for the trip?",
        options: ["lunch, water and good shoes", "a camera and a phone", "five euros and a book"],
        answer: 0,
        explain: "„Your child needs a small bag, lunch, water and good shoes.“ Para öğretmene pazartesi veriliyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a1-lib-l1",
    course: "en",
    level: "A1",
    skill: "listening",
    title: "Lost Property at the Bus Station",
    genre: "dialogue",
    intro: "Nadia otobüste çantasını unutmuş; kayıp eşya bürosundaki görevliyle konuşmasını dinle.",
    gloss: [
      { de: "lost", tr: "kayıp" },
      { de: "color", tr: "renk" },
      { de: "library card", tr: "kütüphane kartı" },
      { de: "phone number", tr: "telefon numarası" },
      { de: "call", tr: "telefon etmek" },
      { de: "find", tr: "bulmak" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Officer", text: "Hello. Can I help you?" },
      { speaker: "Nadia", text: "Yes, please. I lost my bag on the bus this morning." },
      { speaker: "Officer", text: "Okay. Which bus?" },
      { speaker: "Nadia", text: "Bus number twenty-two, at about nine o'clock." },
      { speaker: "Officer", text: "What color is the bag?" },
      { speaker: "Nadia", text: "It's black, with a small red flower on it." },
      { speaker: "Officer", text: "And what is in the bag?" },
      { speaker: "Nadia", text: "My phone, my keys and a book." },
      { speaker: "Officer", text: "Is there a name in the bag?" },
      { speaker: "Nadia", text: "No, but the book is from the city library. My name is on the library card." },
      { speaker: "Officer", text: "Good. What's your name and phone number?" },
      { speaker: "Nadia", text: "Nadia Sarkis. Zero seven seven, one two three, four five six." },
      { speaker: "Officer", text: "Thank you, Nadia. We call you when we find the bag." },
      { speaker: "Nadia", text: "Great, thank you very much!" },
    ],
    questions: [
      {
        text: "Where did Nadia lose her bag?",
        options: ["on the bus", "in the library", "at the bus station"],
        answer: 0,
        explain: "„I lost my bag on the bus this morning.“ Büro istasyonda ama çanta otobüste kaldı.",
      },
      {
        text: "What does the bag look like?",
        options: ["black with a red flower", "red with a black flower", "small and green"],
        answer: 0,
        explain: "„It's black, with a small red flower on it.“ Küçük olan çanta değil, çiçek.",
      },
      {
        kind: "truefalse",
        text: "Nadia's name is in the bag.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Is there a name in the bag?“ — „No, but … my name is on the library card.“ Ad kartta, çantada değil.",
      },
      {
        kind: "short_answer",
        text: "What number is the bus?",
        options: [],
        answer: 0,
        accept: ["twenty-two", "22", "twenty two", "bus twenty-two", "number twenty-two"],
        explain: "„Bus number twenty-two, at about nine o'clock.“",
      },
      {
        kind: "dictation",
        text: "Görevlinin renk sorusunu duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["What color is the bag?", "What color is the bag", "What colour is the bag?"],
        explain: "„What color is the bag?“ — soru kelimesi + is + özne.",
      },
      {
        text: "What does the officer do at the end?",
        options: ["He calls Nadia when they find the bag.", "He gives Nadia a new bag.", "He sends Nadia to the library."],
        answer: 0,
        explain: "„We call you when we find the bag.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-lib-w1",
    course: "en",
    level: "A1",
    skill: "writing",
    title: "A Card for Grandma",
    genre: "personal",
    intro: "Ninenin doğum günü; önce iki cümle kur, sonra ona kısa bir kart yaz.",
    gloss: [
      { de: "grandma", tr: "nine" },
      { de: "present", tr: "hediye" },
      { de: "visit", tr: "ziyaret etmek" },
      { de: "lots of love", tr: "sevgiler" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Doğum günün kutlu olsun, Nine!",
        answer: "Happy birthday, Grandma!",
        alternatives: ["Happy birthday Grandma!"],
        hint: "Kutlama kalıbı „Happy birthday“ + virgül + kişi; Türkçedeki gibi „olsun“ fiili yok.",
      },
      {
        kind: "build",
        tr: "Pazar günü seni ziyaret ediyoruz.",
        answer: "We are visiting you on Sunday.",
        alternatives: ["On Sunday we are visiting you.", "We visit you on Sunday."],
        hint: "Kesin bir plan için „be + -ing“: We are visiting. Gün adından önce „on“ gelir.",
      },
      {
        kind: "free",
        prompt:
          "Ninenin doğum günü. Kart yaz: kutla, onun sevdiğin bir yanını söyle, hediyeni yaz, ne zaman ziyaret edeceğini söyle ve imzala.",
        checklist: ["Doğum gününü kutla", "Sevdiğin bir yanını söyle", "Hediyeni yaz", "Ziyaret gününü söyle ve imzala"],
        minWords: 25,
        phrases: [
          { de: "Happy birthday!", tr: "Doğum günün kutlu olsun!" },
          { de: "You are the best …", tr: "Sen en iyi …sın" },
          { de: "Your present is …", tr: "Hediyen …" },
          { de: "See you on …", tr: "… günü görüşürüz" },
          { de: "Lots of love,", tr: "Sevgiler," },
        ],
        sample:
          "Dear Grandma, happy birthday! I hope you have a great day. You are the best cook in the family and I love your cake. " +
          "Your present is a new book about gardens. We are visiting you on Sunday at four o'clock. See you soon! Lots of love, Deniz",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a1-lib-s1",
    course: "en",
    level: "A1",
    skill: "speaking",
    title: "th: think and this",
    genre: "pronounce",
    intro: "Türkçede olmayan „th“ sesi: dilin ucu dişlerin arasında. Yedi cümlede t, s ve d'ye kaçmadan söyle.",
    gloss: [
      { de: "think", tr: "düşünmek" },
      { de: "weather", tr: "hava" },
      { de: "third", tr: "üçüncü" },
      { de: "both", tr: "ikisi de" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Thank you very much.",
        tr: "Çok teşekkür ederim.",
        hint: "„th“: dilin ucunu üst dişlerine değdir ve hava üfle. t değil, s değil.",
        confusions: [{ heard: ["tank you", "sank you"], fix: "Dilin ucu dişlerin arasında, sessiz üfleme: „thank“. „tank“ ve „sank“ başka kelimeler.", expected: "thank" }],
      },
      {
        de: "I think this is my bag.",
        tr: "Sanırım bu benim çantam.",
        hint: "„think“ sessiz th (üfleme), „this“ sesli th (titreşimli). İkisinde de dil dişlerin arasında.",
        confusions: [{ heard: ["I tink", "I sink", "dis is"], fix: "„think“te t ya da s değil, dişler arasından üfle; „this“te aynı yerde titreşim.", expected: "think" }],
      },
      {
        de: "My brother is thirty-three.",
        tr: "Erkek kardeşim otuz üç yaşında.",
        hint: "„thirty-three“: iki kez sessiz th. „brother“ ortasındaki th sesli.",
        confusions: [{ heard: ["turty-tree", "dirty-tree", "thirty-free"], fix: "Her iki th'de dil dişlerin arasında; „tree“ (ağaç) ve „free“ (bedava) başka kelimeler.", expected: "thirty-three" }],
      },
      {
        de: "The weather is good on Thursday.",
        tr: "Perşembe hava güzel.",
        hint: "„the“ ve „weather“: sesli th. „Thursday“: sessiz th.",
        confusions: [{ heard: ["de weather", "Tursday", "Tuesday"], fix: "„the“ d ile değil, dişler arasında titreşimle. „Thursday“ Tuesday ile karışmasın: th üfle.", expected: "Thursday" }],
      },
      {
        de: "Is this the third bus?",
        tr: "Bu üçüncü otobüs mü?",
        hint: "„third“ = sessiz th + kısa ı sesi; r duyulmasa da olur.",
        confusions: [{ heard: ["turd", "dis the", "tird"], fix: "„third“ baştaki th üflemeli; t ile söylersen kaba bir kelime çıkar.", expected: "third" }],
      },
      {
        de: "Both of them are here.",
        tr: "İkisi de burada.",
        hint: "„both“ sonu sessiz th; „them“ başı sesli th.",
        confusions: [{ heard: ["boat of dem", "bot of them"], fix: "„both“ kelime sonunda dişler arasından üfle; „boat“ (tekne) olmasın.", expected: "both" }],
      },
      {
        de: "I have three brothers and a mother.",
        tr: "Üç erkek kardeşim ve bir annem var.",
        hint: "„three“ sessiz th; „brothers“ ve „mother“ sesli th.",
        confusions: [{ heard: ["tree brothers", "free brothers", "mudder"], fix: "„three“ t ya da f değil, üflemeli th. „mother“ d ile değil, titreşimli th.", expected: "three" }],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a1-lib-g1",
    course: "en",
    level: "A1",
    skill: "grammar",
    title: "do or does?",
    genre: "grammar",
    intro: "Alışkanlıkları anlatırken fiilin ne zaman -s aldığını ve soruda do/does'ın nasıl çalıştığını öğren.",
    focus: "Present simple: do / does ve üçüncü tekilde -s",
    gloss: [
      { de: "every morning", tr: "her sabah" },
      { de: "watch", tr: "izlemek" },
      { de: "speak", tr: "konuşmak" },
      { de: "by bus", tr: "otobüsle" },
    ],
    minutes: 6,
    explanation: [
      {
        heading: "Ne zaman kullanılır?",
        tr: "Alışkanlık, rutin ve genel doğrular için: her sabah kahve içmek, bir şehirde yaşamak. Türkçede -r/-ir eki ne yapıyorsa (içerim, yaşarım) present simple onu yapar.",
        examples: [
          { de: "I drink coffee every morning.", tr: "Her sabah kahve içerim." },
          { de: "She lives in Berlin.", tr: "Berlin'de yaşar." },
          { de: "They work at a bank.", tr: "Bir bankada çalışırlar." },
        ],
      },
      {
        heading: "Üçüncü tekilde -s",
        tr: "he / she / it ile fiil -s alır: work → works, live → lives. Sonu -o, -sh, -ch ile bitenlerde -es: goes, watches. „have“ düzensiz: has.",
        examples: [
          { de: "He works in a shop.", tr: "Bir dükkânda çalışır.", note: "work → works" },
          { de: "She watches TV in the evening.", tr: "Akşamları televizyon izler.", note: "watch → watches" },
          { de: "My brother has a dog.", tr: "Erkek kardeşimin bir köpeği var.", note: "have → has" },
        ],
      },
      {
        heading: "Soru ve olumsuz: do / does",
        tr: "Soruda ve olumsuzda yardımcı fiil do/does gelir ve -s yardımcıya geçer: Does she work? — She doesn't work. Asıl fiil yalın kalır, -s almaz.",
        examples: [
          { de: "Do you like tea?", tr: "Çay sever misin?" },
          { de: "Does he speak English?", tr: "İngilizce konuşur mu?", note: "does + speak, speaks değil" },
          { de: "We don't eat fish.", tr: "Balık yemeyiz." },
        ],
      },
    ],
    questions: [
      {
        text: "She ___ in Izmir.",
        options: ["lives", "live", "is live"],
        answer: 0,
        explain: "„she“ üçüncü tekil: live → lives. „is live“ diye bir biçim yok.",
      },
      {
        text: "___ you like coffee?",
        options: ["Do", "Does", "Are"],
        answer: 0,
        explain: "„you“ ile yardımcı fiil „do“; „does“ yalnız he/she/it ile.",
      },
      {
        text: "He ___ tennis on Saturday.",
        options: ["plays", "play", "playing"],
        answer: 0,
        explain: "„he“ ile -s: plays. Rutin için -ing biçimi kullanılmaz.",
      },
      {
        kind: "gapfill",
        text: "My mother ___ (work) at a school.",
        options: [],
        answer: 0,
        accept: ["works"],
        explain: "„my mother“ = she → works.",
      },
      {
        kind: "gapfill",
        text: "___ your brother speak English? (do / does)",
        options: [],
        answer: 0,
        accept: ["Does", "does"],
        explain: "„your brother“ = he → Does. Asıl fiil yalın: speak.",
      },
      {
        kind: "gapfill",
        text: "They ___ (not / drink) tea.",
        options: [],
        answer: 0,
        accept: ["don't drink", "do not drink"],
        explain: "Olumsuz: do + not + yalın fiil → don't drink.",
      },
      {
        kind: "order",
        text: "Soruyu doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Does", "she", "live", "here?"],
        explain: "Soruda sıra: Does + özne + yalın fiil: Does she live here?",
      },
      {
        kind: "truefalse",
        text: "„He don't like pizza.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„he“ ile olumsuz „doesn't“: He doesn't like pizza.",
      },
      {
        kind: "truefalse",
        text: "„We go to school by bus.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "„we“ ile fiil yalın kalır: go. Cümle doğru.",
      },
      {
        text: "Ali ___ TV in the evening.",
        options: ["watches", "watchs", "watch"],
        answer: 0,
        explain: "Sonu -ch ile biten fiil üçüncü tekilde -es alır: watches.",
      },
    ],
  },
];
