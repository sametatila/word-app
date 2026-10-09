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
 *   Kalıp:  He is tall. · She has long hair. · What does he look like? ·
 *           He plays soccer. · She likes music. · We work together. ·
 *           This is my aunt. · Harry's cousin · Who is this? ·
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
    title: "My friend Liam",
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
      "My friend Liam is nineteen. He is very tall and he has short hair. His eyes are green.\n\n" +
      "Liam is not quiet. He is funny, and he talks a lot. He is kind too — he never forgets a birthday.\n\n" +
      "We work together in a small school. After work we play a game or we talk about music. Liam likes music very much.\n\n" +
      "Liam's cousin Ada is in our club. She is quiet, but she is nice. Her hair is long and she looks like Liam. They are a funny group!",
    questions: [
      {
        text: "How old is Liam?",
        options: ["nineteen", "nine", "ninety"],
        answer: 0,
        explain: "„My friend Liam is nineteen.“ — yaşta „years old“ düşebiliyor.",
      },
      {
        text: "What does Liam like very much?",
        options: ["music", "games", "birthdays"],
        answer: 0,
        explain: "„Liam likes music very much.“ Oyun da oynuyorlar ama „very much“ müzik için.",
      },
      {
        kind: "truefalse",
        text: "Liam talks a lot.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Liam is not quiet. He is funny, and he talks a lot.“ Sessiz olan ise Liam değil, kuzeni Ada.",
      },
      {
        kind: "gapfill",
        text: "Liam has ___ hair.",
        options: [],
        answer: 0,
        accept: ["short"],
        explain: "„he has short hair“ — Ada'nınki uzun.",
      },
      {
        kind: "short_answer",
        text: "Who is Ada?",
        options: [],
        answer: 0,
        accept: ["Liam's cousin", "his cousin", "a cousin"],
        explain: "„Liam's cousin Ada is in our club.“ — iyelik „-'s“ ile: Liam's cousin.",
      },
    ],
  },
  {
    id: "en-a1-u5-r2",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 5,
    title: "Ellie's grandfather",
    genre: "dialogue",
    intro: "Ellie akrabalarını anlatıyor. „look like“ görünüşü sorar — cevabı da görünüş olmalı.",
    gloss: [
      { de: "really", tr: "gerçekten" },
      { de: "know", tr: "bilmek" },
      { de: "look like", tr: "benzemek" },
    ],
    minutes: 4,
    text:
      "Henry: Who is that man? Is he your uncle?\n" +
      "Ellie: No, he isn't. That is my grandfather.\n" +
      "Henry: Really? He looks very strong!\n" +
      "Ellie: Yes, he is. He is seventy-one, but he plays with us every day.\n" +
      "Henry: And the woman with him?\n" +
      "Ellie: That is my grandmother. My grandparents live together in Izmir.\n" +
      "Henry: What does your aunt look like?\n" +
      "Ellie: She is short and she has long hair. She is very funny.\n" +
      "Henry: Is she busy?\n" +
      "Ellie: Yes, she is always busy. She has four children.\n" +
      "Henry: Four! Harry's cousin has four children too.\n" +
      "Ellie: I know. Ada is my friend.",
    questions: [
      {
        text: "Who is the strong man?",
        options: ["Ellie's grandfather", "Ellie's uncle", "Henry"],
        answer: 0,
        explain: "„No, he isn't. That is my grandfather.“ — Henry amcası sanıyor, Ellie düzeltiyor.",
      },
      {
        text: "What does Ellie's aunt look like?",
        options: ["short, with long hair", "tall, with short hair", "strong and quiet"],
        answer: 0,
        explain: "„She is short and she has long hair.“ — „funny“ ve „busy“ görünüş değil, karakter.",
      },
      {
        kind: "truefalse",
        text: "Ellie's grandparents live in Izmir.",
        options: ["True", "False"],
        answer: 0,
        explain: "„My grandparents live together in Izmir.“ — ikisi birlikte.",
      },
      {
        kind: "gapfill",
        text: "Ellie's aunt has ___ children.",
        options: [],
        answer: 0,
        accept: ["four", "4"],
        explain: "„She has four children.“",
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
          "She is short and she has long hair.",
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
    intro: "Erin kulübündeki üç kişiyi anlatıyor. Her biri için hem görünüş hem karakter geliyor.",
    gloss: [
      { de: "dark", tr: "koyu" },
      { de: "music", tr: "müzik" },
      { de: "a lot", tr: "çok" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Erin", text: "Hello! I am Erin. This is our music club. We play music together every week." },
      { speaker: "Erin", text: "My friend Tyler is here. He is tall and he has short, dark hair." },
      { speaker: "Erin", text: "Tyler is very funny. He talks a lot and he is never quiet." },
      { speaker: "Erin", text: "This is Katie. She is short and she has great eyes. She is kind and nice." },
      { speaker: "Erin", text: "Katie's cousin Harry plays with us too. He is quiet, but he is very strong." },
      { speaker: "Erin", text: "We are a good group. We play, we talk, and we are never angry." },
    ],
    questions: [
      {
        text: "What does Tyler look like?",
        options: ["tall, with short hair", "short, with long hair", "strong and quiet"],
        answer: 0,
        explain: "„He is tall and he has short, dark hair.“ — „funny“ karakter, görünüş değil.",
      },
      {
        text: "Who is quiet?",
        options: ["Harry", "Tyler", "Erin"],
        answer: 0,
        explain: "„He is quiet, but he is very strong.“ Tyler ise „never quiet“.",
      },
      {
        kind: "truefalse",
        text: "Katie is Harry's cousin.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Katie's cousin Harry plays with us too.“ — kuzenlik iki yönlüdür.",
      },
      {
        kind: "gapfill",
        text: "Tyler has short, ___ hair.",
        options: [],
        answer: 0,
        accept: ["dark"],
        explain: "„he has short, dark hair“ — iki sıfat virgülle art arda geliyor.",
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
        text: "How often does the club play together?",
        options: [],
        answer: 0,
        accept: ["every week"],
        explain: "„We play music together every week.“",
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
    intro: "Charlie fotoğraftaki akrabalarını tanıtıyor. Kim kimin nesi?",
    gloss: [
      { de: "photo", tr: "fotoğraf" },
      { de: "grandparents", tr: "büyükanne ve büyükbaba" },
      { de: "Is this …?", tr: "bu … mi" },
      { de: "take", tr: "çekmek" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Rachel", text: "Charlie, who is this in the photo? Your uncle?" },
      { speaker: "Charlie", text: "No, that is my aunt's husband. His name is Liam." },
      { speaker: "Rachel", text: "And this woman with the great hair?" },
      { speaker: "Charlie", text: "That is my grandmother. My grandfather is here too, with the dog." },
      { speaker: "Rachel", text: "Your grandparents look very nice." },
      { speaker: "Charlie", text: "They are. My grandmother is funny and my grandfather is quiet." },
      { speaker: "Rachel", text: "Is this your cousin?" },
      { speaker: "Charlie", text: "Yes, that is my cousin Harry. We are one family!" },
      { speaker: "Rachel", text: "Are your parents in the photo?" },
      { speaker: "Charlie", text: "No, they aren't. My mother always takes our photos." },
      { speaker: "Rachel", text: "Then it is a good photo!" },
    ],
    questions: [
      {
        text: "Who is Liam?",
        options: ["Charlie's aunt's husband", "Charlie's uncle", "Charlie's grandfather"],
        answer: 0,
        explain: "„No, that is my aunt's husband. His name is Liam.“ — Rachel amca sanıyor.",
      },
      {
        text: "Who takes the family photos?",
        options: ["Charlie's mother", "Charlie's grandmother", "Rachel"],
        answer: 0,
        explain: "„My mother always takes our photos.“ — bu yüzden anne fotoğrafta yok.",
      },
      {
        kind: "truefalse",
        text: "Charlie's grandfather is funny.",
        options: ["True", "False"],
        answer: 1,
        explain: "„My grandmother is funny and my grandfather is quiet.“ — komik olan büyükanne.",
      },
      {
        kind: "gapfill",
        text: "Charlie's grandfather is ___.",
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
        accept: ["the grandfather", "his grandfather", "grandfather", "Charlie's grandfather"],
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
    title: "A card about Liam",
    genre: "personal",
    intro: "Görünüş yaz. Sonunda kişi kartını doldur.",
    gloss: [
      { de: "He is tall.", tr: "o uzun boylu" },
      { de: "She has long hair.", tr: "uzun saçları var" },
      { de: "What does he look like?", tr: "görünüşü nasıl" },
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
        answer: "She has long hair.",
        hint: "„hair“ tekildir ve „-s“ almaz: long hair, „hairs“ değil.",
      },
      {
        kind: "build",
        tr: "Görünüşü nasıl?",
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
        prompt: "Kişi kartını Liam için doldur.",
        facts: "Liam; uzun boylu; kısa saçlı; komik; on dokuz yaşında.",
        fields: [
          { label: "Name", answer: "Liam" },
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
    title: "Kind, quiet or funny",
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
