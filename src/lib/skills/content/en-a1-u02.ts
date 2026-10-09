import type { SkillExercise } from "../types";

/**
 * EN · A1 · Ünite 2 — "Dil, sayı ve iş".
 *
 * Dört ders: Languages · Numbers 1-100 · Spelling · Jobs. Ünitenin
 * eklediği kelime ve kalıplar:
 *
 *   Kelime: speak, language, English, a little, understand, word, mean,
 *           easy, number, age, old, year, price, count, one, how much,
 *           letter, spell, write, say, again, pen, page, print, work,
 *           job, doctor, singer, coach, staff.
 *   Kalıp:  Do you speak English? · I speak a little English. ·
 *           Yes, I do. / No, I don't. · I'm twenty years old. ·
 *           How old are you? · How much is it? · How do you spell it? ·
 *           Can you say that again, please? · I'm a teacher. ·
 *           What do you do? · I work in a school.
 *
 * Ünite 1'in kelimeleri de serbest (kümülatif). Bunun dışındaki her
 * sözcük egzersizin sözlükçesinde; ölçü `npm run check:en-unitvocab -- a1`.
 *
 * Sayı bu ünitede İKİ İŞ görüyor ve içerik ikisini de kullanıyor: yaş
 * ("I am twenty-two") ve fiyat ("forty euros"). Türkçe konuşan için ikisi
 * de kolay görünüyor ama İngilizcede yaşta „years old“ zorunlu, fiyatta
 * hiçbir şey eklenmiyor — soru kökleri o farkı ölçüyor.
 */
export const enA1U02: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a1-u2-r1",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 2,
    title: "English course — A1",
    genre: "ad",
    intro: "Bir dil okulunun kurs ilanını oku: ne zaman başlıyor, kim veriyor, ne kadar tutuyor.",
    gloss: [
      { de: "course", tr: "kurs" },
      { de: "learn", tr: "öğrenmek" },
      { de: "start", tr: "başlamak" },
      { de: "lesson", tr: "ders" },
      { de: "problem", tr: "sorun" },
    ],
    minutes: 4,
    text:
      "ENGLISH COURSE — A1\n\n" +
      "Do you speak a little English? Come and learn with us.\n\n" +
      "The course is easy. We start on Monday, September 7. One lesson is ninety minutes. We write words, we say words, and we spell our names.\n\n" +
      "Your teacher is Nora Scott. She is from Ireland. She is a very good teacher.\n\n" +
      "Price: forty euros for one month. For students: thirty euros. How much is a pen? One euro.\n\n" +
      "Do you understand every word? No — and that is not a problem. We say it again.",
    questions: [
      {
        text: "When does the course start?",
        options: ["on Monday", "on Sunday", "in one month"],
        answer: 0,
        explain: "„We start on Monday, September 7.“ — bir ay fiyatın süresi, başlangıç günü değil.",
      },
      {
        text: "Where is the teacher from?",
        options: ["Ireland", "Germany", "Italy"],
        answer: 0,
        explain: "„Your teacher is Nora Scott. She is from Ireland.“",
      },
      {
        kind: "truefalse",
        text: "The course is thirty euros for students.",
        options: ["True", "False"],
        answer: 0,
        explain: "Öğrenciler için otuz avro: „For students: thirty euros.“ Kırk avro ötekiler için.",
      },
      {
        kind: "gapfill",
        text: "One lesson is ___ minutes.",
        options: [],
        answer: 0,
        accept: ["ninety", "90"],
        explain: "„One lesson is ninety minutes.“ Sayıyı yazıyla da rakamla da yazabilirsin.",
      },
      {
        kind: "short_answer",
        text: "How much is a pen?",
        options: [],
        answer: 0,
        accept: ["one euro", "1 euro", "one"],
        explain: "„How much is a pen? One euro.“ — fiyatta „years old“ gibi bir ek yok, sayı tek başına duruyor.",
      },
    ],
  },
  {
    id: "en-a1-u2-r2",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 2,
    title: "A doctor and a singer",
    genre: "dialogue",
    intro: "İki kişi işlerini, yaşlarını ve konuştukları dilleri anlatıyor.",
    gloss: [
      { de: "hospital", tr: "hastane" },
      { de: "big", tr: "büyük" },
      { de: "music", tr: "müzik" },
      { de: "fast", tr: "hızlı" },
    ],
    minutes: 4,
    text:
      "Ana: Hello! I am Ana. What do you do?\n" +
      "Sam: Hi, Ana. I am a doctor. I work in a big hospital. And you?\n" +
      "Ana: I am a singer. I work in a school too — I am a music teacher there.\n" +
      "Sam: Very good! Do you speak English?\n" +
      "Ana: Yes, I do. I speak a little English and a little German.\n" +
      "Sam: How do you spell your name?\n" +
      "Ana: A, N, A. It is easy!\n" +
      "Sam: And how old are you, Ana?\n" +
      "Ana: I am twenty-nine years old. And you?\n" +
      "Sam: I am forty. My job is not easy, but I am happy.\n" +
      "Ana: Can you say that again, please? You speak very fast!\n" +
      "Sam: I said: I am happy.",
    questions: [
      {
        text: "What is Sam's job?",
        options: ["a doctor", "a singer", "a music teacher"],
        answer: 0,
        explain: "„I am a doctor. I work in a big hospital.“ — şarkıcı ve müzik öğretmeni olan ise Sam değil, Ana.",
      },
      {
        text: "How old is Ana?",
        options: ["twenty-nine", "forty", "nineteen"],
        answer: 0,
        explain: "„I am twenty-nine years old.“ Kırk yaşında olan ise Ana değil, Sam.",
      },
      {
        kind: "truefalse",
        text: "Ana speaks a little German.",
        options: ["True", "False"],
        answer: 0,
        explain: "„I speak a little English and a little German.“ — iki dili de az konuşuyor.",
      },
      {
        kind: "gapfill",
        text: "Sam works in a big ___.",
        options: [],
        answer: 0,
        accept: ["hospital"],
        explain: "„I work in a big hospital.“",
      },
      {
        kind: "order",
        text: "Konuşmanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "What do you do?",
          "I am a doctor.",
          "How old are you, Ana?",
          "I am twenty-nine years old.",
        ],
        explain: "Önce iş sorulur ve söylenir, sonra yaş sorulur ve söylenir. İkisi ayrı soru köküyle geliyor.",
      },
      {
        kind: "short_answer",
        text: "How does Ana spell her name?",
        options: [],
        answer: 0,
        accept: ["A, N, A", "ANA", "A N A"],
        explain: "„A, N, A. It is easy!“ — burada ad harf harf söyleniyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a1-u2-l1",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 2,
    title: "A place in the course",
    genre: "phone",
    intro: "Owen dil okulunu arıyor. Dinlerken sayıları yakala: yaş, fiyat ve süre.",
    gloss: [
      { de: "want", tr: "istemek" },
      { de: "place", tr: "yer" },
      { de: "course", tr: "kurs" },
      { de: "start", tr: "başlamak" },
      { de: "problem", tr: "sorun" },
      { de: "fast", tr: "hızlı" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Clerk", text: "Good morning, City Language School." },
      { speaker: "Owen", text: "Good morning. My name is Owen. I want a place in the A1 course." },
      { speaker: "Clerk", text: "How do you spell your name?" },
      { speaker: "Owen", text: "O, W, E, N. Owen." },
      { speaker: "Clerk", text: "Thank you. And how old are you?" },
      { speaker: "Owen", text: "I am twenty-two years old." },
      { speaker: "Clerk", text: "How much English do you speak?" },
      { speaker: "Owen", text: "I speak a little English. I understand many words, but I do not speak fast." },
      { speaker: "Clerk", text: "No problem. The course is one hundred euros for three months." },
      { speaker: "Owen", text: "One hundred? Can you say that again, please?" },
      { speaker: "Clerk", text: "Yes. One hundred euros. We start on Monday." },
      { speaker: "Owen", text: "Good. Thank you very much!" },
    ],
    questions: [
      {
        text: "How old is Owen?",
        options: ["twenty-two", "twenty", "two"],
        answer: 0,
        explain: "„I am twenty-two years old.“",
      },
      {
        text: "How much is the course?",
        options: ["one hundred euros", "three euros", "twenty-two euros"],
        answer: 0,
        explain: "„The course is one hundred euros for three months.“ — üç, ayların sayısı.",
      },
      {
        kind: "truefalse",
        text: "Owen does not speak fast.",
        options: ["True", "False"],
        answer: 0,
        explain: "„I speak a little English … but I do not speak fast.“ — tam olarak bunu söylüyor.",
      },
      {
        kind: "gapfill",
        text: "The course is one ___ euros.",
        options: [],
        answer: 0,
        accept: ["hundred"],
        explain: "„One hundred euros.“ Tutar iki kez geçiyor: Owen emin olmak için tekrar soruyor.",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I speak a little English.", "I speak a little English"],
        explain: "„I speak a little English.“ — „a little“ iki ayrı sözcük, „English“ ise büyük harfle yazılır.",
      },
      {
        kind: "short_answer",
        text: "When does the course start?",
        options: [],
        answer: 0,
        accept: ["on Monday", "Monday"],
        explain: "„We start on Monday.“",
      },
    ],
  },
  {
    id: "en-a1-u2-l2",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 2,
    title: "Three jobs",
    genre: "profile",
    intro: "Üç kişi işini anlatıyor. Her biri için üç şeyi not et: iş, yaş, konuştuğu dil.",
    gloss: [
      { de: "young", tr: "genç" },
      { de: "small", tr: "küçük" },
      { de: "Spanish", tr: "İspanyolca" },
      { de: "at night", tr: "geceleri" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Fiona", text: "Hello. My name is Fiona. I am a doctor and I work in a small town." },
      { speaker: "Fiona", text: "I speak English and a little Spanish. I am thirty-four years old." },
      { speaker: "Ben", text: "Hi! I am Ben, and I am a singer. My job is not easy, but it is very good." },
      { speaker: "Ben", text: "I work at night. I am twenty-six years old." },
      { speaker: "Iona", text: "Hello. I am Iona. I am a coach. I work with young people." },
      { speaker: "Iona", text: "I am forty-one. I do not speak English, but I understand many words." },
    ],
    questions: [
      {
        text: "Who is a doctor?",
        options: ["Fiona", "Ben", "Iona"],
        answer: 0,
        explain: "„I am a doctor and I work in a small town.“ — Ben şarkıcı, Iona antrenör.",
      },
      {
        text: "How old is Ben?",
        options: ["twenty-six", "thirty-four", "forty-one"],
        answer: 0,
        explain: "„I am twenty-six years old.“ Otuz dört Fiona'nın, kırk bir Iona'nın yaşı.",
      },
      {
        kind: "truefalse",
        text: "Iona speaks English.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I do not speak English, but I understand many words.“ — anlamak ile konuşmak ayrı iki şey.",
      },
      {
        kind: "gapfill",
        text: "Ben works at ___.",
        options: [],
        answer: 0,
        accept: ["night"],
        explain: "„I work at night.“ — şarkıcının işi geceleri.",
      },
      {
        kind: "order",
        text: "Konuşmacıların sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: ["I am a doctor.", "I am a singer.", "I am a coach."],
        explain: "Önce Fiona (doktor), sonra Ben (şarkıcı), en son Iona (antrenör) konuşuyor.",
      },
      {
        kind: "short_answer",
        text: "What is Iona's job?",
        options: [],
        answer: 0,
        accept: ["a coach", "coach"],
        explain: "„I am a coach. I work with young people.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-u2-w1",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 2,
    title: "Numbers and spelling",
    genre: "profile",
    intro: "Yaşı, fiyatı ve harf harf söylemeyi yazarak çalış. Sonunda kurs formunu doldur.",
    gloss: [
      { de: "years old", tr: "yaşında" },
      { de: "How much is it?", tr: "bu ne kadar" },
      { de: "spell", tr: "harf harf söylemek" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Ben otuz yaşındayım.",
        answer: "I am thirty years old.",
        alternatives: ["I'm thirty years old."],
        hint: "Yaş „be“ ile söylenir: I am + sayı + years old. Kısaca „I am thirty.“ da denir.",
      },
      {
        kind: "build",
        tr: "Biraz İngilizce konuşuyorum.",
        answer: "I speak a little English.",
        hint: "„a little“ sayılamayan şeyler için: a little English, a little water.",
      },
      {
        kind: "build",
        tr: "Bu ne kadar?",
        answer: "How much is it?",
        hint: "Fiyat sorusu „how much“ ile. Yaş sorusunda „how old“ vardı — ikisi karışmasın.",
      },
      {
        kind: "build",
        tr: "Bu nasıl yazılıyor?",
        answer: "How do you spell it?",
        hint: "Soru „do“ ile kuruluyor, çünkü fiil „be“ değil: How do you …?",
      },
      {
        kind: "form",
        prompt: "Kurs formunu Owen için doldur.",
        facts: "Owen Morgan; 22 yaşında; öğretmen; Bremen'de yaşıyor.",
        fields: [
          { label: "Name", answer: "Owen Morgan", accept: ["Owen", "Morgan"] },
          { label: "Age", answer: "22", accept: ["twenty-two"] },
          { label: "Job", answer: "teacher", accept: ["a teacher"] },
          { label: "City", answer: "Bremen" },
        ],
      },
    ],
  },
  {
    id: "en-a1-u2-w2",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 2,
    title: "Languages and work",
    genre: "profile",
    intro: "„do“ ile kurulan soruyu ve kısa cevabı yaz. „be“ ile kurulan soruyla karışması kolay.",
    gloss: [
      { de: "Do you speak English?", tr: "İngilizce konuşuyor musun" },
      { de: "Yes, I do.", tr: "evet konuşuyorum" },
      { de: "No, I don't.", tr: "hayır konuşmuyorum" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "İngilizce konuşuyor musun?",
        answer: "Do you speak English?",
        hint: "Fiil „be“ değilse soru „do“ ile başlar: Do you …? Fiilin kendisi değişmez.",
      },
      {
        kind: "rewrite",
        prompt: "Soruya kısa cevap ver: evet.",
        source: "Do you speak English?",
        answer: "Yes, I do.",
        why: "Kısa cevap sorunun yardımcı fiilini tekrarlar: soru „do“ ile kurulduysa cevap da „do“ taşır.",
      },
      {
        kind: "rewrite",
        prompt: "Soruya kısa cevap ver: hayır.",
        source: "Do you speak English?",
        answer: "No, I don't.",
        alternatives: ["No, I do not."],
        why: "Olumsuz kısa cevapta „not“ yardımcı fiile yapışır: do + not → don't.",
      },
      {
        kind: "build",
        tr: "Bir okulda çalışıyorum.",
        answer: "I work in a school.",
        hint: "İş yeri için „in“: I work in a school, in a hospital.",
      },
      {
        kind: "build",
        tr: "Ne iş yapıyorsun?",
        answer: "What do you do?",
        hint: "İki „do“ var: ilki soruyu kuran yardımcı, ikincisi „yapmak“ fiili.",
      },
    ],
  },
];
