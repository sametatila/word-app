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
 *           Do you have a sister?
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
    title: "Freya's family",
    genre: "personal",
    intro: "Freya ailesini anlatıyor. Okurken kimin kim olduğunu ve yaşları takip et.",
    gloss: [
      { de: "house", tr: "ev" },
      { de: "small", tr: "küçük" },
      { de: "eat", tr: "yemek" },
      { de: "fast", tr: "hızlı" },
    ],
    minutes: 4,
    text:
      "Hello! My name is Freya. This is my family.\n\n" +
      "My mother is a doctor. Her name is Norah. She is fifty-two years old. My father is a teacher. His name is Phil.\n\n" +
      "I have one sister and one brother. My sister is twenty and my brother is only nine. He is still a boy, but he grows very fast!\n\n" +
      "My grandma and my grandpa live in a small town. Their house is old. We are there in May, for my grandma's birthday. We eat cake and we are all very happy.",
    questions: [
      {
        text: "What is Freya's mother?",
        options: ["a doctor", "a teacher", "a student"],
        answer: 0,
        explain: "„My mother is a doctor.“ — öğretmen olan baba: „My father is a teacher.“",
      },
      {
        text: "How old is Freya's brother?",
        options: ["nine", "twenty", "fifty-two"],
        answer: 0,
        explain: "„my brother is only nine“ — yirmi kız kardeşin, elli iki annenin yaşı.",
      },
      {
        kind: "truefalse",
        text: "Freya's mother is a doctor.",
        options: ["True", "False"],
        answer: 0,
        explain: "Doktor olan anne. „His name is Phil“ öğretmen olan babayı anlatıyor.",
      },
      {
        kind: "gapfill",
        text: "Freya's grandma and grandpa live in a small ___.",
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
      "First name: Charlie\n" +
      "Last name: Thornton\n" +
      "Age: 34\n" +
      "Address: 12 Green Street, Bremen\n" +
      "City: Bremen\n" +
      "Code: 28195\n" +
      "Phone number: 0421 55 66 77\n" +
      "Email address: charlie.thornton@mail.com\n\n" +
      "Do you have a card? No.\n" +
      "Do you live in Bremen? Yes, I do.\n" +
      "How old are you? I am thirty-four years old.\n" +
      "When is your birthday? My birthday is in June.\n\n" +
      "Please write your first name and your last name again here.",
    questions: [
      {
        text: "What is the last name?",
        options: ["Thornton", "Charlie", "Bremen"],
        answer: 0,
        explain: "„Last name: Thornton.“ — Charlie ad, Bremen şehir. Formda her satırın kendi etiketi var.",
      },
      {
        text: "How old is Charlie?",
        options: ["thirty-four", "twelve", "twenty-eight"],
        answer: 0,
        explain: "„Age: 34“ ve „I am thirty-four years old.“ — on iki adresin numarası.",
      },
      {
        kind: "truefalse",
        text: "Charlie lives in Bremen.",
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
        explain: "„Code: 28195“ — posta kodu adresle aynı satırda değil, kendi satırında.",
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
    title: "Aaron's family",
    genre: "dialogue",
    intro: "Mia ile Aaron ailelerini konuşuyor. Kaç kardeş, kaç çocuk, kim kaç yaşında?",
    gloss: [
      { de: "big", tr: "büyük" },
      { de: "Do you have …?", tr: "senin … var mı" },
      { de: "I have …", tr: "benim … var" },
      { de: "children", tr: "çocuklar" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Mia", text: "Do you have a big family, Aaron?" },
      { speaker: "Aaron", text: "Yes, I do. I have two sisters and one brother." },
      { speaker: "Mia", text: "How old are they?" },
      { speaker: "Aaron", text: "My sisters are twelve and nineteen. My brother is a baby — he is one year old." },
      { speaker: "Mia", text: "A baby! And your parents?" },
      { speaker: "Aaron", text: "My mother is forty-five and my father is fifty. They live in Izmir." },
      { speaker: "Mia", text: "Do you have children?" },
      { speaker: "Aaron", text: "No, I don't. And you?" },
      { speaker: "Mia", text: "I've got one daughter. Her name is Lucy. She is six." },
      { speaker: "Aaron", text: "Six! Is she in school?" },
      { speaker: "Mia", text: "Yes, she is. She can write her first name and her last name." },
    ],
    questions: [
      {
        text: "How many sisters does Aaron have?",
        options: ["two", "one", "three"],
        answer: 0,
        explain: "„I have two sisters and one brother.“ — bir olan erkek kardeş.",
      },
      {
        text: "How old is Mia's daughter?",
        options: ["six", "one", "twelve"],
        answer: 0,
        explain: "„Her name is Lucy. She is six.“ — bir yaşında olan ise Mia'nın kızı değil, Aaron'un erkek kardeşi.",
      },
      {
        kind: "truefalse",
        text: "Aaron doesn't have children.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Do you have children? No, I don't.“ — kardeşi var, çocuğu yok.",
      },
      {
        kind: "gapfill",
        text: "Aaron's brother is one ___ old.",
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
        accept: ["I've got one daughter.", "I've got one daughter", "I have got one daughter."],
        explain: "„I've got one daughter.“ Günlük konuşmada „I have“ yerine „I've got“ da sık duyulur.",
      },
      {
        kind: "short_answer",
        text: "Where do Aaron's parents live?",
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
    intro: "Lucy doğum gününü anlatıyor. Kaç yaşında, hangi ay, evde kim var?",
    gloss: [
      { de: "make", tr: "yapmak" },
      { de: "big", tr: "büyük" },
      { de: "eat", tr: "yemek" },
      { de: "happy birthday", tr: "doğum günün kutlu olsun" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Lucy", text: "Hello! My name is Lucy. Today is my birthday." },
      { speaker: "Lucy", text: "I am seven years old. My birthday is in June." },
      { speaker: "Lucy", text: "My mother makes a big cake. My father writes my name on the cake." },
      { speaker: "Lucy", text: "My grandma and my grandpa are here. My grandma is seventy-two." },
      { speaker: "Lucy", text: "I've got one brother. He is a baby, so he does not eat cake." },
      { speaker: "Lucy", text: "My family says: happy birthday, Lucy! I am very happy." },
    ],
    questions: [
      {
        text: "How old is Lucy today?",
        options: ["seven", "seventy-two", "one"],
        answer: 0,
        explain: "„I am seven years old.“ — yetmiş iki ninenin yaşı.",
      },
      {
        text: "Who makes the cake?",
        options: ["her mother", "her father", "her grandma"],
        answer: 0,
        explain: "„My mother makes a big cake.“ Baba pastaya adı yazıyor, yapan anne.",
      },
      {
        kind: "truefalse",
        text: "Lucy's brother eats cake.",
        options: ["True", "False"],
        answer: 1,
        explain: "„He is a baby, so he does not eat cake.“ — bebek olduğu için yemiyor.",
      },
      {
        kind: "gapfill",
        text: "Lucy's birthday is in ___.",
        options: [],
        answer: 0,
        accept: ["June"],
        explain: "„My birthday is in June.“ — ay adından önce „in“ geliyor.",
      },
      {
        kind: "order",
        text: "Lucy'nin anlattığı sıra: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Today is my birthday.",
          "My mother makes a big cake.",
          "My grandma and my grandpa are here.",
          "My family says: happy birthday, Lucy!",
        ],
        explain: "Önce gün, sonra pasta, sonra gelenler, en son kutlama. Anlatı hep bu sırayla gidiyor.",
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
    title: "The library form",
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
        prompt: "Kütüphane kartı formunu Lucy için doldur.",
        facts: "Lucy Thornton; adı Lucy, soyadı Thornton; Bremen'de oturuyor; doğum günü haziranda.",
        fields: [
          { label: "First name", answer: "Lucy" },
          { label: "Last name", answer: "Thornton" },
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
    title: "About my family",
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
        alternatives: ["I have a brother.", "I have got a brother."],
        hint: "Düz cümlede „I have a brother.“; konuşmada çok sık „I've got“ duyulur.",
      },
      {
        kind: "build",
        tr: "Bu benim annem.",
        answer: "This is my mother.",
        hint: "Türkçe iyelik eki isme takılıyor (anne-m), İngilizce ayrı sözcük koyuyor: my mother.",
      },
      {
        kind: "build",
        tr: "Onun adı Phil.",
        answer: "His name is Phil.",
        hint: "Phil erkek, o yüzden „his“. Kadın olsaydı „her name“ olurdu — iyelik SAHİBE bakıyor.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi soru yap.",
        source: "You have a sister.",
        answer: "Do you have a sister?",
        why: "Amerikan İngilizcesinde „have“ sorusu „do“ ile kurulur: You have → Do you have?",
      },
      {
        kind: "build",
        tr: "Onun (bir kadının) iki çocuğu var.",
        answer: "She's got two children.",
        alternatives: ["She has two children.", "She has got two children."],
        hint: "Üçüncü tekil kişide „have“ → „has“: she has, she's got.",
      },
    ],
  },
];
