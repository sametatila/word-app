import type { SkillExercise } from "../types";

/**
 * EN · A1 · Ünite 5 — "Görünüş, arkadaşlar, akrabalar, karakter".
 *
 * Dört ders: What he looks like · My friends · Relatives ·
 * What people are like.
 *
 *   Kelime: tall, short, hair, eye, look, face, nose, mouth, friend,
 *           play, work, like, together, talk, game, club, aunt, uncle,
 *           cousin, grandmother, grandfather, grandparents, parent,
 *           husband, kind, funny, quiet, busy, nice, angry, strong, great.
 *   Kalıp:  He is tall. · She has got long hair. · What does he look like? ·
 *           He plays football. · She likes music. · We work together. ·
 *           This is my aunt. · Ali's cousin · Who is this? ·
 *           He is very kind. · She isn't quiet. · Is she nice?
 *
 * Ünitenin ayırt edici zorluğu İKİ „gibi“: „What does he look like?“ dış
 * görünüşü, „What is he like?“ karakteri sorar ve ikisinin Türkçesi de
 * "nasıl biri". İçerik ikisini aynı egzersizde yan yana koyuyor, çünkü
 * ayrı ayrı görüldüğünde fark hiç fark edilmiyor.
 */
export const enA1U05: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a1-u5-r1",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 5,
    title: "My friend Kaan",
    genre: "personal",
    intro: "Bir arkadaş anlatılıyor: hem nasıl göründüğü hem nasıl biri olduğu.",
    gloss: [
      { de: "green", tr: "yeşil" },
      { de: "small", tr: "küçük" },
      { de: "a lot", tr: "çok" },
      { de: "look like", tr: "benzemek" },
    ],
    minutes: 4,
    text:
      "My friend Kaan is nineteen. He is very tall and he has got short hair. His eyes are green.\n\n" +
      "Kaan is not quiet. He is funny, and he talks a lot. He is kind too — he never forgets a birthday.\n\n" +
      "We work together in a small school. After work we play a game or we talk about music. Kaan likes music very much.\n\n" +
      "Kaan's cousin Ada is in our club. She is quiet, but she is nice. Her hair is long and she looks like Kaan. They are a funny group!",
    questions: [
      {
        text: "How old is Kaan?",
        options: ["nineteen", "nine", "ninety"],
        answer: 0,
        explain: "„My friend Kaan is nineteen.“ — yaşta „years old“ düşebiliyor.",
      },
      {
        text: "What does Kaan like very much?",
        options: ["music", "games", "birthdays"],
        answer: 0,
        explain: "„Kaan likes music very much.“ Oyun da oynuyorlar ama „very much“ müzik için.",
      },
      {
        kind: "truefalse",
        text: "Kaan talks a lot.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Kaan is not quiet. He is funny, and he talks a lot.“ Sessiz olan kuzeni Ada.",
      },
      {
        kind: "gapfill",
        text: "Kaan has got ___ hair.",
        options: [],
        answer: 0,
        accept: ["short"],
        explain: "„he has got short hair“ — Ada'nınki uzun.",
      },
      {
        kind: "short_answer",
        text: "Who is Ada?",
        options: [],
        answer: 0,
        accept: ["Kaan's cousin", "his cousin", "a cousin"],
        explain: "„Kaan's cousin Ada is in our club.“ — iyelik „-'s“ ile: Kaan's cousin.",
      },
    ],
  },
  {
    id: "en-a1-u5-r2",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 5,
    title: "What does he look like?",
    genre: "dialogue",
    intro: "Sena akrabalarını anlatıyor. „look like“ görünüşü sorar — cevabı da görünüş olmalı.",
    gloss: [
      { de: "really", tr: "gerçekten" },
      { de: "know", tr: "bilmek" },
      { de: "look like", tr: "benzemek" },
    ],
    minutes: 4,
    text:
      "Mert: Who is that man? Is he your uncle?\n" +
      "Sena: No, he isn't. That is my grandfather.\n" +
      "Mert: Really? He looks very strong!\n" +
      "Sena: Yes, he is. He is seventy-one, but he plays with us every day.\n" +
      "Mert: And the woman with him?\n" +
      "Sena: That is my grandmother. My grandparents live together in Izmir.\n" +
      "Mert: What does your aunt look like?\n" +
      "Sena: She is short and she has got long hair. She is very funny.\n" +
      "Mert: Is she busy?\n" +
      "Sena: Yes, she is always busy. She has got four children.\n" +
      "Mert: Four! Ali's cousin has got four children too.\n" +
      "Sena: I know. Ada is my friend.",
    questions: [
      {
        text: "Who is the strong man?",
        options: ["Sena's grandfather", "Sena's uncle", "Mert"],
        answer: 0,
        explain: "„No, he isn't. That is my grandfather.“ — Mert amcası sanıyor, Sena düzeltiyor.",
      },
      {
        text: "What does Sena's aunt look like?",
        options: ["short, with long hair", "tall, with short hair", "strong and quiet"],
        answer: 0,
        explain: "„She is short and she has got long hair.“ — „funny“ ve „busy“ görünüş değil, karakter.",
      },
      {
        kind: "truefalse",
        text: "Sena's grandparents live in Izmir.",
        options: ["True", "False"],
        answer: 0,
        explain: "„My grandparents live together in Izmir.“ — ikisi birlikte.",
      },
      {
        kind: "gapfill",
        text: "Sena's aunt has got ___ children.",
        options: [],
        answer: 0,
        accept: ["four", "4"],
        explain: "„She has got four children.“",
      },
      {
        kind: "order",
        text: "Konuşmanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Who is that man?",
          "That is my grandfather.",
          "What does your aunt look like?",
          "She is short and she has got long hair.",
        ],
        explain: "Önce kim olduğu, sonra nasıl göründüğü. İki soru iki ayrı kalıpla geliyor.",
      },
      {
        kind: "short_answer",
        text: "How old is the grandfather?",
        options: [],
        answer: 0,
        accept: ["seventy-one", "71"],
        explain: "„He is seventy-one, but he plays with us every day.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a1-u5-l1",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 5,
    title: "Our club",
    genre: "monologue",
    intro: "Eda kulübündeki üç kişiyi anlatıyor. Her biri için hem görünüş hem karakter geliyor.",
    gloss: [
      { de: "dark", tr: "koyu" },
      { de: "music", tr: "müzik" },
      { de: "a lot", tr: "çok" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Eda", text: "Hello! I am Eda. This is our music club. We work together every week." },
      { speaker: "Eda", text: "My friend Can is here. He is tall and he has got short, dark hair." },
      { speaker: "Eda", text: "Can is very funny. He talks a lot and he is never quiet." },
      { speaker: "Eda", text: "This is Nil. She is short and she has got great eyes. She is kind and nice." },
      { speaker: "Eda", text: "Nil's cousin Ali plays with us too. He is quiet, but he is very strong." },
      { speaker: "Eda", text: "We are a good group. We play, we talk, and we are never angry." },
    ],
    questions: [
      {
        text: "What does Can look like?",
        options: ["tall, with short hair", "short, with long hair", "strong and quiet"],
        answer: 0,
        explain: "„He is tall and he has got short, dark hair.“ — „funny“ karakter, görünüş değil.",
      },
      {
        text: "Who is quiet?",
        options: ["Ali", "Can", "Eda"],
        answer: 0,
        explain: "„He is quiet, but he is very strong.“ Can ise „never quiet“.",
      },
      {
        kind: "truefalse",
        text: "Nil is Ali's cousin.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Nil's cousin Ali plays with us too.“ — kuzenlik iki yönlüdür.",
      },
      {
        kind: "gapfill",
        text: "Can has got short, ___ hair.",
        options: [],
        answer: 0,
        accept: ["dark"],
        explain: "„he has got short, dark hair“ — iki sıfat virgülle art arda geliyor.",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["He talks a lot and he is never quiet.", "He talks a lot and he is never quiet"],
        explain: "„He talks a lot and he is never quiet.“ — üçüncü tekil kişide fiil „-s“ alıyor: talks.",
      },
      {
        kind: "short_answer",
        text: "How often does the club work together?",
        options: [],
        answer: 0,
        accept: ["every week", "week"],
        explain: "„We work together every week.“",
      },
    ],
  },
  {
    id: "en-a1-u5-l2",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 5,
    title: "Relatives in a photo",
    genre: "dialogue",
    intro: "Deniz fotoğraftaki akrabalarını tanıtıyor. Kim kimin nesi?",
    gloss: [
      { de: "take a photo", tr: "fotoğraf çekmek" },
      { de: "grandparents", tr: "büyükanne ve büyükbaba" },
      { de: "Is this …?", tr: "bu … mi" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Ayse", text: "Deniz, who is this in the photo? Your uncle?" },
      { speaker: "Deniz", text: "No, that is my aunt's husband. His name is Kaan." },
      { speaker: "Ayse", text: "And this woman with the great hair?" },
      { speaker: "Deniz", text: "That is my grandmother. My grandfather is here too, with the dog." },
      { speaker: "Ayse", text: "Your grandparents look very nice." },
      { speaker: "Deniz", text: "They are. My grandmother is funny and my grandfather is quiet." },
      { speaker: "Ayse", text: "Is this your cousin?" },
      { speaker: "Deniz", text: "Yes, Ali's cousin is my cousin too. We are one family!" },
      { speaker: "Ayse", text: "Are your parents in the photo?" },
      { speaker: "Deniz", text: "No, they aren't. My mother takes a photo." },
      { speaker: "Ayse", text: "Then it is a good photo!" },
    ],
    questions: [
      {
        text: "Who is Kaan?",
        options: ["Deniz's aunt's husband", "Deniz's uncle", "Deniz's grandfather"],
        answer: 0,
        explain: "„No, that is my aunt's husband. His name is Kaan.“ — Ayse amca sanıyor.",
      },
      {
        text: "Who takes the photo?",
        options: ["Deniz's mother", "Deniz's grandmother", "Ayse"],
        answer: 0,
        explain: "„My mother takes a photo.“ — bu yüzden anne fotoğrafta yok.",
      },
      {
        kind: "truefalse",
        text: "Deniz's grandfather is funny.",
        options: ["True", "False"],
        answer: 1,
        explain: "„My grandmother is funny and my grandfather is quiet.“ — komik olan büyükanne.",
      },
      {
        kind: "gapfill",
        text: "Deniz's grandfather is ___.",
        options: [],
        answer: 0,
        accept: ["quiet"],
        explain: "„…my grandfather is quiet.“",
      },
      {
        kind: "order",
        text: "Konuşmanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Who is this in the photo?",
          "That is my aunt's husband.",
          "Are your parents in the photo?",
          "No, they aren't.",
        ],
        explain: "Önce tek kişi sorulur, sonra anne baba. Cevaplar kısa biçimde geliyor.",
      },
      {
        kind: "short_answer",
        text: "Who is with the dog?",
        options: [],
        answer: 0,
        accept: ["the grandfather", "his grandfather", "grandfather"],
        explain: "„My grandfather is here too, with the dog.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-u5-w1",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 5,
    title: "What does he look like?",
    genre: "personal",
    intro: "Görünüş yaz. Sonunda kişi kartını doldur.",
    gloss: [
      { de: "He is tall.", tr: "o uzun boylu" },
      { de: "She has got long hair.", tr: "uzun saçları var" },
      { de: "What does he look like?", tr: "o neye benziyor" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "O uzun boylu.",
        answer: "He is tall.",
        hint: "Görünüş sıfatı „be“ ile: he is tall. Fiil değil, sıfat.",
      },
      {
        kind: "build",
        tr: "Uzun saçları var.",
        answer: "She has got long hair.",
        alternatives: ["She has long hair."],
        hint: "„hair“ tekildir ve „-s“ almaz: long hair, „hairs“ değil.",
      },
      {
        kind: "build",
        tr: "O neye benziyor?",
        answer: "What does he look like?",
        hint: "Görünüş sorusu „look like“ ile ve „like“ SONDA duruyor.",
      },
      {
        kind: "build",
        tr: "Birlikte çalışıyoruz.",
        answer: "We work together.",
        hint: "„together“ cümlenin sonunda; „birlikte çalışmak“ tek sözcük değil.",
      },
      {
        kind: "form",
        prompt: "Kişi kartını Kaan için doldur.",
        facts: "Kaan; uzun boylu; kısa saçlı; komik; on dokuz yaşında.",
        fields: [
          { label: "Name", answer: "Kaan" },
          { label: "Hair", answer: "short" },
          { label: "Character", answer: "funny" },
          { label: "Age", answer: "19", accept: ["nineteen"] },
        ],
      },
    ],
  },
  {
    id: "en-a1-u5-w2",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 5,
    title: "He is very kind",
    genre: "personal",
    intro: "Karakteri yaz. Olumsuzu ve sorusu „be“ ile kuruluyor, „do“ ile değil.",
    gloss: [
      { de: "He is very kind.", tr: "o çok iyi kalpli" },
      { de: "She isn't quiet.", tr: "o sessiz değil" },
      { de: "Is she nice?", tr: "o cana yakın mı" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "O çok iyi kalpli.",
        answer: "He is very kind.",
        hint: "„very“ sıfattan önce gelir: very kind.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi olumsuz yap.",
        source: "She is quiet.",
        answer: "She isn't quiet.",
        alternatives: ["She is not quiet."],
        why: "Fiil „be“ olduğu için olumsuzluk „not“ ile ve „do“ hiç girmiyor: is + not → isn't.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi soru yap.",
        source: "She is nice.",
        answer: "Is she nice?",
        why: "„be“ öne geçer. Bir önceki üniteye dikkat: „do“ ile kurulan soru başka bir fiil ailesi.",
      },
      {
        kind: "build",
        tr: "O müzik seviyor.",
        answer: "She likes music.",
        hint: "Üçüncü tekil kişide fiil „-s“ alır: she likes.",
      },
      {
        kind: "build",
        tr: "Bu benim teyzem.",
        answer: "This is my aunt.",
        hint: "İngilizcede teyze ile hala aynı sözcük: aunt. Amca, dayı ve enişte de uncle.",
      },
    ],
  },
];
