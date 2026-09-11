import type { SkillExercise } from "../types";

/**
 * EN · A1 · Ünite 4 — "Olumsuzluk, hayvanlar ve çoğul".
 *
 * Dört ders: I don't … · Pets · In the photo · One or many.
 *
 *   Kelime: not, never, without, stop, forget, nothing, no, only, animal,
 *           dog, cat, bird, fish, horse, zoo, photo, this, here, there,
 *           who, picture, that, person, people, man, woman, friend, many,
 *           thing, group, both.
 *   Kalıp:  I don't … · He doesn't … / She doesn't … · Don't … ·
 *           I have a dog. · Do you have a pet? · Its name is Luna. ·
 *           This is my brother. · These are my friends. · Who is this? ·
 *           I have two friends. · There are many people here. ·
 *           These are my books.
 *
 * Ünitenin iki zorluğu birbirini kesiyor ve içerik ikisini birlikte
 * kullanıyor: üçüncü tekil kişide olumsuzluk „doesn't“a geçerken FİİL
 * ekini kaybediyor („he doesn't talk“, „he talks“ değil), ve „man“ gibi
 * düzensiz çoğullar „-s“ almıyor. İkisi de Türkçede karşılığı olmayan
 * kurallar: Türkçede olumsuzluk kişiye göre değişmez, çoğul tek ektir.
 */
export const enA1U04: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a1-u4-r1",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 4,
    title: "Our animals",
    genre: "personal",
    intro: "Bir aile evcil hayvanlarını anlatıyor. Kimin hangi hayvanı var, hangisi ne yapmıyor?",
    gloss: [
      { de: "sleep", tr: "uyumak" },
      { de: "play", tr: "oynamak" },
      { de: "big", tr: "büyük" },
      { de: "talk", tr: "konuşmak" },
      { de: "sing", tr: "şarkı söylemek" },
      { de: "farm", tr: "çiftlik" },
      { de: "house", tr: "ev" },
    ],
    minutes: 4,
    text:
      "Hello! This is a photo of my family and our animals.\n\n" +
      "I have a dog. Its name is Luna. Luna is very big and she is not young. She plays with my brother. My sister has two cats. Their names are Mia and Nil. The cats don't play with Luna — they only sleep.\n\n" +
      "We have a bird too. Its name is Pit. Pit doesn't talk, and he never sings. My father says: \"Don't forget the bird!\"\n\n" +
      "We don't have a horse. A horse is for a farm, not for a house. But there are many horses at the zoo.",
    questions: [
      {
        text: "What is the name of the dog?",
        options: ["Luna", "Mia", "Pit"],
        answer: 0,
        explain: "„I have a dog. Its name is Luna.“ — Mia kedilerden biri, Pit kuş.",
      },
      {
        text: "Who has two cats?",
        options: ["my sister", "my brother", "my father"],
        answer: 0,
        explain: "„My sister has two cats.“ Erkek kardeş köpekle oynuyor, baba kuşu hatırlatıyor.",
      },
      {
        kind: "truefalse",
        text: "The bird sings.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Pit doesn't talk, and he never sings.“ — „never“ tek başına olumsuzluk taşıyor.",
      },
      {
        kind: "gapfill",
        text: "The cats don't play with Luna — they only ___.",
        options: [],
        answer: 0,
        accept: ["sleep"],
        explain: "„…they only sleep.“ — „only“ başka bir şey yapmadıklarını söylüyor.",
      },
      {
        kind: "short_answer",
        text: "Where are there many horses?",
        options: [],
        answer: 0,
        accept: ["at the zoo", "the zoo", "zoo"],
        explain: "„But there are many horses at the zoo.“ — evde at yok, hayvanat bahçesinde var.",
      },
    ],
  },
  {
    id: "en-a1-u4-r2",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 4,
    title: "Who is this?",
    genre: "dialogue",
    intro: "Eda bir fotoğrafı anlatıyor. „this“, „that“ ve „these“ arasındaki farka dikkat et.",
    gloss: [
      { de: "know", tr: "bilmek" },
      { de: "big", tr: "büyük" },
      { de: "cousin", tr: "kuzen" },
      { de: "Those are …", tr: "onlar …" },
    ],
    minutes: 4,
    text:
      "Ali: This is a good photo. Who is this?\n" +
      "Eda: This is my mother. And these are my friends.\n" +
      "Ali: How many people are there in the photo?\n" +
      "Eda: There are many people — one, two, three … eight!\n" +
      "Ali: Is that a man or a woman?\n" +
      "Eda: That is a man. He doesn't live here. He is from Ankara.\n" +
      "Ali: And this group here?\n" +
      "Eda: Those are my cousins. I don't know all their names!\n" +
      "Ali: You have a big family.\n" +
      "Eda: Yes. But I don't have a brother. I only have two sisters.\n" +
      "Ali: Is there an animal in the photo?\n" +
      "Eda: Yes, there is a dog. Its name is Nero. Don't forget Nero!",
    questions: [
      {
        text: "How many people are there in the photo?",
        options: ["eight", "two", "three"],
        answer: 0,
        explain: "„one, two, three … eight!“ — Eda sayıyor ve sekizde bitiriyor.",
      },
      {
        text: "What is the dog's name?",
        options: ["Nero", "Eda", "Ali"],
        answer: 0,
        explain: "„there is a dog. Its name is Nero.“ — hayvan için „its“ kullanılıyor.",
      },
      {
        kind: "truefalse",
        text: "Eda has a brother.",
        options: ["True", "False"],
        answer: 1,
        explain: "„But I don't have a brother. I only have two sisters.“",
      },
      {
        kind: "gapfill",
        text: "Eda only has two ___.",
        options: [],
        answer: 0,
        accept: ["sisters"],
        explain: "„I only have two sisters.“ — iki tane olduğu için çoğul: sister → sisters.",
      },
      {
        kind: "order",
        text: "Konuşmanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Who is this?",
          "This is my mother.",
          "How many people are there in the photo?",
          "There are many people.",
        ],
        explain: "Önce tek kişi sorulur, sonra kaç kişi olduğu. „who“ kişiyi, „how many“ sayıyı sorar.",
      },
      {
        kind: "short_answer",
        text: "Where is the man from?",
        options: [],
        answer: 0,
        accept: ["Ankara", "from Ankara"],
        explain: "„He doesn't live here. He is from Ankara.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a1-u4-l1",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 4,
    title: "I don't have a pet",
    genre: "dialogue",
    intro: "Lena ile Can evcil hayvanları konuşuyor. Kimin nesi var, kimin yok?",
    gloss: [
      { de: "bring", tr: "getirmek" },
      { de: "home", tr: "ev" },
      { de: "Why not?", tr: "neden yok" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Lena", text: "Do you have a pet, Can?" },
      { speaker: "Can", text: "No, I don't. I don't have an animal at home." },
      { speaker: "Lena", text: "Why not?" },
      { speaker: "Can", text: "My mother says: Don't bring a dog here!" },
      { speaker: "Lena", text: "I have a cat and a fish. The cat's name is Zeyno." },
      { speaker: "Can", text: "And the fish?" },
      { speaker: "Lena", text: "The fish doesn't have a name. It's only a fish!" },
      { speaker: "Can", text: "Is the zoo good?" },
      { speaker: "Lena", text: "Yes, it is very good. There are horses, birds and many animals." },
      { speaker: "Can", text: "I am never at the zoo. I forget it every year." },
      { speaker: "Lena", text: "Don't forget this year! There are two young birds there." },
    ],
    questions: [
      {
        text: "What animals does Lena have?",
        options: ["a cat and a fish", "a dog and a cat", "a bird and a horse"],
        answer: 0,
        explain: "„I have a cat and a fish.“ — at ve kuş hayvanat bahçesinde.",
      },
      {
        text: "What is the cat's name?",
        options: ["Zeyno", "Can", "Lena"],
        answer: 0,
        explain: "„The cat's name is Zeyno.“ — balığın adı yok.",
      },
      {
        kind: "truefalse",
        text: "Can has a dog at home.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I don't have an animal at home.“ Annesi de „Don't bring a dog here!“ diyor.",
      },
      {
        kind: "gapfill",
        text: "The fish doesn't have a ___.",
        options: [],
        answer: 0,
        accept: ["name"],
        explain: "„The fish doesn't have a name.“ — üçüncü tekil kişide „doesn't“ ve fiil eksiz: have, has değil.",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I don't have an animal at home.", "I do not have an animal at home."],
        explain: "„I don't have an animal at home.“ — „an“ sesli harfle başlayan sözcükten önce.",
      },
      {
        kind: "short_answer",
        text: "How many young birds are there at the zoo?",
        options: [],
        answer: 0,
        accept: ["two", "2"],
        explain: "„There are two young birds there.“",
      },
    ],
  },
  {
    id: "en-a1-u4-l2",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 4,
    title: "In the picture",
    genre: "monologue",
    intro: "Ayse iş yerindeki grup fotoğrafını anlatıyor. Kim kim, kim fotoğrafta yok?",
    gloss: [
      { de: "cousin", tr: "kuzen" },
      { de: "like", tr: "sevmek" },
      { de: "at work", tr: "işte" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Ayse", text: "This is a picture of my group at work. There are many people here." },
      { speaker: "Ayse", text: "This is Deniz. He doesn't work here now. He is in Bremen." },
      { speaker: "Ayse", text: "These are my two friends, Nil and Mert. They are not only friends — they are cousins." },
      { speaker: "Ayse", text: "That woman there is our teacher. Her name is Ela." },
      { speaker: "Ayse", text: "The man with the dog is my brother. The dog's name is Tosun." },
      { speaker: "Ayse", text: "I am not in the picture. I don't like photos!" },
    ],
    questions: [
      {
        text: "Who is not in the picture?",
        options: ["Ayse", "Deniz", "Ela"],
        answer: 0,
        explain: "„I am not in the picture. I don't like photos!“ — Deniz resimde ama artık orada çalışmıyor.",
      },
      {
        text: "Who is the teacher?",
        options: ["Ela", "Nil", "Mert"],
        answer: 0,
        explain: "„That woman there is our teacher. Her name is Ela.“",
      },
      {
        kind: "truefalse",
        text: "Deniz works here now.",
        options: ["True", "False"],
        answer: 1,
        explain: "„He doesn't work here now. He is in Bremen.“",
      },
      {
        kind: "gapfill",
        text: "The dog's name is ___.",
        options: [],
        answer: 0,
        accept: ["Tosun"],
        explain: "„The dog's name is Tosun.“",
      },
      {
        kind: "order",
        text: "Ayse'nin anlattığı sıra: doğru sıraya koy.",
        options: [
        ],
        answer: 0,
        items: [
          "This is a picture of my group at work.",
          "This is Deniz.",
          "These are my two friends, Nil and Mert.",
          "I am not in the picture.",
        ],
        explain: "Önce fotoğrafın kendisi, sonra tek kişi, sonra iki kişi, en son kendisi.",
      },
      {
        kind: "short_answer",
        text: "Who is the man with the dog?",
        options: [],
        answer: 0,
        accept: ["her brother", "brother", "Ayse's brother"],
        explain: "„The man with the dog is my brother.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-u4-w1",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 4,
    title: "I don't …",
    genre: "personal",
    intro: "Olumsuz cümleyi yaz. Dikkat: üçüncü tekil kişide „don't“ değil „doesn't“ geliyor.",
    gloss: [
      { de: "I don't …", tr: "ben … değilim" },
      { de: "He doesn't …", tr: "o … etmiyor" },
      { de: "Don't …", tr: "… etme" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Bir köpeğim var.",
        answer: "I have a dog.",
        hint: "Hayvan için „a“ gerekir: a dog, a cat. Türkçede böyle bir sözcük yok.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi olumsuz yap.",
        source: "I have a cat.",
        answer: "I don't have a cat.",
        alternatives: ["I do not have a cat."],
        why: "Fiil „be“ değilse olumsuzluk „don't“ ile kurulur ve fiilden ÖNCE gelir.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi olumsuz yap.",
        source: "She has a bird.",
        answer: "She doesn't have a bird.",
        alternatives: ["She does not have a bird."],
        why: "Üçüncü tekil kişide „don't“ → „doesn't“ VE fiil ekini kaybeder: has → have.",
      },
      {
        kind: "build",
        tr: "Kuşu unutma!",
        answer: "Don't forget the bird!",
        hint: "Emir olumsuzu „Don't“ ile başlar; özne yazılmaz.",
      },
      {
        kind: "build",
        tr: "Bunlar benim arkadaşlarım.",
        answer: "These are my friends.",
        hint: "Çoğulda „this“ → „these“ ve „is“ → „are“. İkisi birlikte değişir.",
      },
    ],
  },
  {
    id: "en-a1-u4-w2",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 4,
    title: "One or many",
    genre: "personal",
    intro: "Tekil ile çoğulu yaz. İngilizcede çoğul, ismi ve ona bağlı sözcükleri birlikte değiştiriyor.",
    gloss: [
      { de: "There are many …", tr: "birçok … var" },
      { de: "These are …", tr: "bunlar …" },
      { de: "people", tr: "insanlar" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "İki arkadaşım var.",
        answer: "I have two friends.",
        hint: "Sayı birden çoksa isim „-s“ alır: two friends.",
      },
      {
        kind: "build",
        tr: "Burada birçok insan var.",
        answer: "There are many people here.",
        hint: "„people“ zaten çoğul, „-s“ almaz ve „are“ ister.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi çoğul yap.",
        source: "This is my friend.",
        answer: "These are my friends.",
        why: "Üç sözcük birden değişir: this → these, is → are, friend → friends.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi çoğul yap.",
        source: "That is a man.",
        answer: "Those are men.",
        why: "„man“ düzensiz çoğul: men, „mans“ değil. Ayrıca çoğulda „a“ düşer.",
      },
      {
        kind: "build",
        tr: "Bu kim?",
        answer: "Who is this?",
        hint: "Soru sözcüğü başta, sonra „is this“. Yakındaki kişi için „this“.",
      },
    ],
  },
];
