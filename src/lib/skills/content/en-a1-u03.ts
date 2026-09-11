import type { SkillExercise } from "../types";

/**
 * EN · A1 · Ünite 3 — "Yaş, form ve aile".
 *
 * Dört ders: Age and birthday · Filling a form · My family ·
 * Brothers and sisters. Ünitenin eklediği kelime ve kalıplar:
 *
 *   Kelime: birthday, when, old, year, month, cake, adult, baby,
 *           address, phone number, name, city, email address,
 *           first name, last name, code, family, mother, father,
 *           sister, brother, parents, grandma, grandpa, have, child,
 *           son, daughter, young, boy, girl, grow.
 *   Kalıp:  How old are you? · I'm twenty-five years old. ·
 *           My birthday is in May. · What's your name? ·
 *           What's your address? · I live in … · This is my … ·
 *           His name is … / Her name is … · I have … ·
 *           I've got a brother. · She's got two children. ·
 *           Have you got a sister?
 *
 * Ünite 1–2'nin kelimeleri de serbest (kümülatif).
 *
 * Bu ünitenin asıl zorluğu iyelik: Türkçe eki isme takıyor ("anne-m"),
 * İngilizce ayrı bir sözcük koyuyor ve o sözcük SAHİBİN cinsiyetine göre
 * değişiyor ("his name" / "her name"). İçerik üçüncü kişiyi bilerek çok
 * kullanıyor — „his“ ile „her“ yan yana gelmeden fark görünmüyor.
 */
export const enA1U03: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a1-u3-r1",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 3,
    title: "This is my family",
    genre: "personal",
    intro: "Ayla ailesini anlatıyor. Okurken kimin kim olduğunu ve yaşları takip et.",
    gloss: [
      { de: "house", tr: "ev" },
      { de: "small", tr: "küçük" },
      { de: "eat", tr: "yemek" },
      { de: "fast", tr: "hızlı" },
    ],
    minutes: 4,
    text:
      "Hello! My name is Ayla. This is my family.\n\n" +
      "My mother is a doctor. Her name is Sevgi. She is fifty-two years old. My father is a teacher. His name is Kemal.\n\n" +
      "I have got one sister and one brother. My sister is twenty and my brother is only nine. He is still a boy, but he grows very fast!\n\n" +
      "My grandma and my grandpa live in a small town. Their house is old. We are there in May, for my grandma's birthday. We eat cake and we are all very happy.",
    questions: [
      {
        text: "What is Ayla's mother?",
        options: ["a doctor", "a teacher", "a student"],
        answer: 0,
        explain: "„My mother is a doctor.“ — öğretmen olan baba: „My father is a teacher.“",
      },
      {
        text: "How old is Ayla's brother?",
        options: ["nine", "twenty", "fifty-two"],
        answer: 0,
        explain: "„my brother is only nine“ — yirmi kız kardeşin, elli iki annenin yaşı.",
      },
      {
        kind: "truefalse",
        text: "Ayla's father is a doctor.",
        options: ["True", "False"],
        answer: 1,
        explain: "Doktor olan anne. „His name is Kemal“ öğretmen olan babayı anlatıyor.",
      },
      {
        kind: "gapfill",
        text: "Ayla's grandma and grandpa live in a small ___.",
        options: [],
        answer: 0,
        accept: ["town"],
        explain: "„My grandma and my grandpa live in a small town.“",
      },
      {
        kind: "short_answer",
        text: "When is grandma's birthday?",
        options: [],
        answer: 0,
        accept: ["in May", "May"],
        explain: "„We are there in May, for my grandma's birthday.“ — ay adı büyük harfle.",
      },
    ],
  },
  {
    id: "en-a1-u3-r2",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 3,
    title: "A library card",
    genre: "formal",
    intro: "Doldurulmuş bir kütüphane kartı formunu oku. Hangi bilgi hangi satıra yazılmış?",
    gloss: [
      { de: "library", tr: "kütüphane" },
      { de: "card", tr: "kart" },
      { de: "street", tr: "sokak" },
    ],
    minutes: 4,
    text:
      "CITY LIBRARY — NEW CARD\n\n" +
      "First name: Deniz\n" +
      "Last name: Yalin\n" +
      "Age: 34\n" +
      "Address: 12 Green Street, Bremen\n" +
      "City: Bremen\n" +
      "Code: 28195\n" +
      "Phone number: 0421 55 66 77\n" +
      "Email address: deniz.yalin@mail.com\n\n" +
      "Have you got a card? No.\n" +
      "Do you live in Bremen? Yes, I do.\n" +
      "How old are you? I am thirty-four years old.\n" +
      "When is your birthday? My birthday is in June.\n\n" +
      "Please write your first name and your last name again here.",
    questions: [
      {
        text: "What is the last name?",
        options: ["Yalin", "Deniz", "Bremen"],
        answer: 0,
        explain: "„Last name: Yalin.“ — Deniz ad, Bremen şehir. Formda her satırın kendi etiketi var.",
      },
      {
        text: "How old is Deniz?",
        options: ["thirty-four", "twelve", "twenty-eight"],
        answer: 0,
        explain: "„Age: 34“ ve „I am thirty-four years old.“ — on iki adresin numarası.",
      },
      {
        kind: "truefalse",
        text: "Deniz lives in Bremen.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Do you live in Bremen? Yes, I do.“ — kısa cevap soruyu doğruluyor.",
      },
      {
        kind: "gapfill",
        text: "The birthday is in ___.",
        options: [],
        answer: 0,
        accept: ["June"],
        explain: "„When is your birthday? My birthday is in June.“",
      },
      {
        kind: "short_answer",
        text: "What is the code?",
        options: [],
        answer: 0,
        accept: ["28195"],
        explain: "„Code: 28195“ — şehir kodu adresle aynı satırda değil, kendi satırında.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a1-u3-l1",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 3,
    title: "Have you got a big family?",
    genre: "dialogue",
    intro: "Mia ile Tarik ailelerini konuşuyor. Kaç kardeş, kaç çocuk, kim kaç yaşında?",
    gloss: [
      { de: "big", tr: "büyük" },
      { de: "Have you got …?", tr: "senin … var mı" },
      { de: "I have got …", tr: "benim … var" },
      { de: "children", tr: "çocuklar" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Mia", text: "Have you got a big family, Tarik?" },
      { speaker: "Tarik", text: "Yes, I have. I have got two sisters and one brother." },
      { speaker: "Mia", text: "How old are they?" },
      { speaker: "Tarik", text: "My sisters are twelve and nineteen. My brother is a baby — he is one year old." },
      { speaker: "Mia", text: "A baby! And your parents?" },
      { speaker: "Tarik", text: "My mother is forty-five and my father is fifty. They live in Izmir." },
      { speaker: "Mia", text: "Have you got children?" },
      { speaker: "Tarik", text: "No, I have not. And you?" },
      { speaker: "Mia", text: "I have got one daughter. Her name is Ela. She is six." },
      { speaker: "Tarik", text: "Six! Is she at school?" },
      { speaker: "Mia", text: "Yes, she is. She can write her first name and her last name." },
    ],
    questions: [
      {
        text: "How many sisters has Tarik got?",
        options: ["two", "one", "three"],
        answer: 0,
        explain: "„I have got two sisters and one brother.“ — bir olan erkek kardeş.",
      },
      {
        text: "How old is Mia's daughter?",
        options: ["six", "one", "twelve"],
        answer: 0,
        explain: "„Her name is Ela. She is six.“ — bir yaşında olan Tarik'in erkek kardeşi.",
      },
      {
        kind: "truefalse",
        text: "Tarik has got children.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Have you got children? No, I have not.“ — kardeşi var, çocuğu yok.",
      },
      {
        kind: "gapfill",
        text: "Tarik's brother is one ___ old.",
        options: [],
        answer: 0,
        accept: ["year"],
        explain: "„he is one year old“ — bir tane olduğu için „year“ tekil kalıyor.",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I have got one daughter.", "I have got one daughter", "I've got one daughter."],
        explain: "„I have got one daughter.“ Konuşmada „I have“ çoğu zaman „I've“ diye büzülüyor.",
      },
      {
        kind: "short_answer",
        text: "Where do Tarik's parents live?",
        options: [],
        answer: 0,
        accept: ["in Izmir", "Izmir"],
        explain: "„They live in Izmir.“ — „they“ anne ile babayı birlikte gösteriyor.",
      },
    ],
  },
  {
    id: "en-a1-u3-l2",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 3,
    title: "My birthday",
    genre: "monologue",
    intro: "Ela doğum gününü anlatıyor. Kaç yaşında, hangi ay, evde kim var?",
    gloss: [
      { de: "make", tr: "yapmak" },
      { de: "big", tr: "büyük" },
      { de: "eat", tr: "yemek" },
      { de: "happy birthday", tr: "doğum günün kutlu olsun" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Ela", text: "Hello! My name is Ela. Today is my birthday." },
      { speaker: "Ela", text: "I am seven years old. My birthday is in June." },
      { speaker: "Ela", text: "My mother makes a big cake. My father writes my name on the cake." },
      { speaker: "Ela", text: "My grandma and my grandpa are here. My grandma is seventy-two." },
      { speaker: "Ela", text: "I have got one brother. He is a baby, so he does not eat cake." },
      { speaker: "Ela", text: "My family says: happy birthday, Ela! I am very happy." },
    ],
    questions: [
      {
        text: "How old is Ela today?",
        options: ["seven", "seventy-two", "one"],
        answer: 0,
        explain: "„I am seven years old.“ — yetmiş iki ninenin yaşı.",
      },
      {
        text: "Who makes the cake?",
        options: ["her mother", "her father", "her grandma"],
        answer: 0,
        explain: "„My mother makes a big cake.“ Baba keke adı yazıyor, yapan anne.",
      },
      {
        kind: "truefalse",
        text: "Ela's brother eats cake.",
        options: ["True", "False"],
        answer: 1,
        explain: "„He is a baby, so he does not eat cake.“ — bebek olduğu için yemiyor.",
      },
      {
        kind: "gapfill",
        text: "Ela's birthday is in ___.",
        options: [],
        answer: 0,
        accept: ["June"],
        explain: "„My birthday is in June.“ — ay adından önce „in“ geliyor.",
      },
      {
        kind: "order",
        text: "Ela'nın anlattığı sıra: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Today is my birthday.",
          "My mother makes a big cake.",
          "My grandma and my grandpa are here.",
          "My family says: happy birthday, Ela!",
        ],
        explain: "Önce gün, sonra kek, sonra gelenler, en son kutlama. Anlatı hep bu sırayla gidiyor.",
      },
      {
        kind: "short_answer",
        text: "How old is the grandma?",
        options: [],
        answer: 0,
        accept: ["seventy-two", "72"],
        explain: "„My grandma is seventy-two.“ Burada „years old“ düşmüş — konuşmada olur.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-u3-w1",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 3,
    title: "Filling a form",
    genre: "formal",
    intro: "Yaşı, doğum gününü ve form sorularını yaz. Sonunda kütüphane kartını doldur.",
    gloss: [
      { de: "first name", tr: "ad" },
      { de: "last name", tr: "soyadı" },
      { de: "birthday", tr: "doğum günü" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Yirmi beş yaşındayım.",
        answer: "I am twenty-five years old.",
        alternatives: ["I'm twenty-five years old."],
        hint: "Bileşik sayı tireyle yazılır: twenty-five, forty-one.",
      },
      {
        kind: "build",
        tr: "Doğum günüm mayısta.",
        answer: "My birthday is in May.",
        hint: "Ay adından önce „in“, ay adı büyük harfle: in May, in June.",
      },
      {
        kind: "build",
        tr: "Adın ne?",
        answer: "What's your name?",
        alternatives: ["What is your name?"],
        hint: "„What's“ = „What is“. Formda uzun biçim, konuşmada kısa biçim doğal.",
      },
      {
        kind: "build",
        tr: "Adresin ne?",
        answer: "What's your address?",
        alternatives: ["What is your address?"],
        hint: "Aynı kalıp, başka bilgi. Soru sözcüğü hep başta duruyor.",
      },
      {
        kind: "form",
        prompt: "Kütüphane kartı formunu Ela için doldur.",
        facts: "Ela Yalin; adı Ela, soyadı Yalin; Bremen'de oturuyor; doğum günü haziranda.",
        fields: [
          { label: "First name", answer: "Ela" },
          { label: "Last name", answer: "Yalin" },
          { label: "City", answer: "Bremen" },
          { label: "Birthday", answer: "June", accept: ["in June"] },
        ],
      },
    ],
  },
  {
    id: "en-a1-u3-w2",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 3,
    title: "His name, her name",
    genre: "personal",
    intro: "Aileni yaz. Dikkat: İngilizcede iyelik ayrı bir sözcük ve SAHİBİN cinsiyetine göre değişiyor.",
    gloss: [
      { de: "This is my …", tr: "bu benim …" },
      { de: "His name is …", tr: "onun adı …", note: "sahibi erkekse" },
      { de: "Her name is …", tr: "onun adı …", note: "sahibi kadınsa" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Bir erkek kardeşim var.",
        answer: "I've got a brother.",
        alternatives: ["I have got a brother."],
        hint: "„have got“ sahip olmayı söyler; konuşmada „I've got“ diye büzülür.",
      },
      {
        kind: "build",
        tr: "Bu benim annem.",
        answer: "This is my mother.",
        hint: "Türkçe iyelik eki isme takılıyor (anne-m), İngilizce ayrı sözcük koyuyor: my mother.",
      },
      {
        kind: "build",
        tr: "Onun adı Kemal.",
        answer: "His name is Kemal.",
        hint: "Kemal erkek, o yüzden „his“. Kadın olsaydı „her name“ olurdu — iyelik SAHİBE bakıyor.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi soru yap.",
        source: "You have got a sister.",
        answer: "Have you got a sister?",
        why: "„have got“ sorusunda „have“ öne geçer, tıpkı „be“ gibi: You have → Have you?",
      },
      {
        kind: "build",
        tr: "İki çocuğu var.",
        answer: "She's got two children.",
        alternatives: ["She has got two children."],
        hint: "Üçüncü tekil kişide „have“ → „has“: she has got, he has got.",
      },
    ],
  },
];
