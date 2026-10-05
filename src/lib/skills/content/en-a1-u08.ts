import type { SkillExercise } from "../types";

/**
 * EN · A1 · Ünite 8 — "Meyve sebze, ödeme, günlük akış, saat".
 *
 * Dört ders: Fruit and vegetables · Paying the check · Daily routine ·
 * Telling the time.
 *
 *   Kelime: apple, tomato, potato, fresh, kilo, banana, carrot, vegetable,
 *           bill, pay, cash, card, together, check, give, get, get up,
 *           wake up, breakfast, work, sleep, shower, dinner,
 *           in the morning, time, hour, clock, half, quarter, midnight,
 *           at night, lunchtime.
 *   Kalıp:  I'd like a kilo of apples. · Are the tomatoes fresh? ·
 *           How much are the apples? · Can I have the check, please? ·
 *           Can I pay by card? · Can we pay together? ·
 *           I get up at seven. · He works every day. ·
 *           Do you work on Sunday? · What time is it? ·
 *           It's half past seven. · It's a quarter to nine.
 *
 * Saatin iki yönü bu ünitenin asıl tuzağı: „half past seven“ yedi buçuk,
 * ama „half“ Almanca ve Türkçe sezgiyle sekizin yarısı gibi okunuyor.
 * „past“ geçe, „to“ kala. İçerik ikisini aynı egzersizde kullanıyor ve
 * sorular hep saatin kendisini soruyor.
 */
export const enA1U08: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a1-u8-r1",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 8,
    title: "My day",
    genre: "personal",
    intro: "Bir günün tamamı saatleriyle anlatılıyor. Hangi iş hangi saatte?",
    gloss: [
      { de: "fruit", tr: "meyve" },
      { de: "until", tr: "-e kadar" },
      { de: "a quarter past", tr: "çeyrek geçe" },
    ],
    minutes: 4,
    text:
      "I wake up at six and I get up at a quarter past six. I take a shower and then I have breakfast: bread, cheese and a cup of tea.\n\n" +
      "I work from eight until five. At lunchtime I eat a sandwich with tomatoes and carrots. I don't work on Sunday.\n\n" +
      "After work I buy fruit and vegetables at the market: apples, potatoes and bananas. A kilo of apples costs two euros.\n\n" +
      "I have dinner at half past seven. At midnight I sleep. I am always tired at night!",
    questions: [
      {
        text: "What time does the writer get up?",
        options: ["at a quarter past six", "at six", "at half past seven"],
        answer: 0,
        explain: "„I wake up at six and I get up at a quarter past six.“ — uyanmak ile kalkmak ayrı iki iş.",
      },
      {
        text: "What does the writer buy at the market?",
        options: ["fruit and vegetables", "bread and cheese", "a sandwich"],
        answer: 0,
        explain: "„After work I buy fruit and vegetables at the market.“ — ekmek ve peynir kahvaltıda.",
      },
      {
        kind: "truefalse",
        text: "The writer does not work on Sunday.",
        options: ["True", "False"],
        answer: 0,
        explain: "„I don't work on Sunday.“ — gün adından önce „on“ geliyor.",
      },
      {
        kind: "gapfill",
        text: "A kilo of apples costs ___ euros.",
        options: [],
        answer: 0,
        accept: ["two", "2"],
        explain: "„A kilo of apples costs two euros.“",
      },
      {
        kind: "short_answer",
        text: "When does the writer have dinner?",
        options: [],
        answer: 0,
        accept: ["at half past seven", "half past seven", "seven thirty"],
        explain: "„I have dinner at half past seven.“ — „half past seven“ yedi buçuk, sekiz buçuk değil.",
      },
    ],
  },
  {
    id: "en-a1-u8-r2",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 8,
    title: "Card or cash?",
    genre: "dialogue",
    intro: "Hesap ödeniyor. Nakit mi, kart mı, birlikte mi?",
    gloss: [
      { de: "close", tr: "kapanmak" },
      { de: "of course", tr: "tabii ki" },
      { de: "moment", tr: "an" },
      { de: "problem", tr: "sorun" },
      { de: "a quarter to", tr: "çeyrek kala" },
      { de: "receipt", tr: "fiş" },
      { de: "back", tr: "geri" },
    ],
    minutes: 4,
    text:
      "Waiter: Here is the check. Twenty-four euros, please.\n" +
      "Harry: Can we pay together?\n" +
      "Waiter: Of course.\n" +
      "Erin: I'd like to pay by card.\n" +
      "Waiter: No problem. Or cash, if you prefer.\n" +
      "Harry: I only have a card too. No cash today.\n" +
      "Waiter: That's fine. Here you are.\n" +
      "Erin: Can I get a receipt for my work, please?\n" +
      "Waiter: Yes, one moment.\n" +
      "Erin: What time is it now?\n" +
      "Waiter: It's a quarter to nine. We close at ten.\n" +
      "Harry: Thank you. Can I have my card back?\n" +
      "Waiter: Here. Have a good evening!",
    questions: [
      {
        text: "How much is the check?",
        options: ["twenty-four euros", "twenty euros", "ten euros"],
        answer: 0,
        explain: "„Here is the check. Twenty-four euros, please.“ — on, kapanış saati.",
      },
      {
        text: "How do they pay?",
        options: ["by card", "with cash", "with a check"],
        answer: 0,
        explain: "„I'd like to pay by card… I only have a card too.“ „with a check“ yanlış: Erin'in istediği „receipt“ iş için bir fiş, ödeme biçimi değil.",
      },
      {
        kind: "truefalse",
        text: "Harry has cash today.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I only have a card too. No cash today.“",
      },
      {
        kind: "gapfill",
        text: "It's a quarter to ___.",
        options: [],
        answer: 0,
        accept: ["nine", "9"],
        explain: "„It's a quarter to nine.“ — dokuza çeyrek kala, yani 8.45.",
      },
      {
        kind: "order",
        text: "Konuşmanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Here is the check.",
          "Can we pay together?",
          "I'd like to pay by card.",
          "What time is it now?",
        ],
        explain: "Önce hesap gelir, sonra birlikte ödeme sorulur, sonra ödeme biçimi, en son saat.",
      },
      {
        kind: "short_answer",
        text: "What time does the restaurant close?",
        options: [],
        answer: 0,
        accept: ["at ten", "ten", "10"],
        explain: "„We close at ten.“ — saat dokuza çeyrek var, restoran onda kapanıyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a1-u8-l1",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 8,
    title: "Half past eight",
    genre: "dialogue",
    intro: "Saatler ve günlük akış. „past“ geçe, „to“ kala — ikisine de dikkat.",
    gloss: [
      { de: "lucky", tr: "şanslı" },
      { de: "until", tr: "-e kadar" },
      { de: "read", tr: "okumak" },
      { de: "in my hand", tr: "elimde" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Tyler", text: "Excuse me, what time is it?" },
      { speaker: "Katie", text: "It's half past eight." },
      { speaker: "Tyler", text: "Half past eight! I get up at seven every day. Today is not a good day!" },
      { speaker: "Katie", text: "Do you work today?" },
      { speaker: "Tyler", text: "Yes, I work from nine until five. And you?" },
      { speaker: "Katie", text: "I don't work on Monday. I wake up at nine and I take a long shower." },
      { speaker: "Tyler", text: "You are lucky! What do you do in the morning?" },
      { speaker: "Katie", text: "I have breakfast and I read. At lunchtime I cook." },
      { speaker: "Tyler", text: "And at night?" },
      { speaker: "Katie", text: "At night I am always tired. I am in bed at a quarter past eleven." },
      { speaker: "Tyler", text: "I am in bed at midnight. My phone is always in my hand!" },
    ],
    questions: [
      {
        text: "What time is it?",
        options: ["half past eight", "half past seven", "a quarter past eleven"],
        answer: 0,
        explain: "„It's half past eight.“ — sekiz buçuk; on biri çeyrek geçe Katie'nin yatma saati.",
      },
      {
        text: "When does Katie wake up on Monday?",
        options: ["at nine", "at seven", "at eight"],
        answer: 0,
        explain: "„I don't work on Monday. I wake up at nine…“ — yedi Tyler'in kalkma saati.",
      },
      {
        kind: "truefalse",
        text: "Katie does not work on Monday.",
        options: ["True", "False"],
        answer: 0,
        explain: "„I don't work on Monday.“",
      },
      {
        kind: "gapfill",
        text: "Tyler works from nine until ___.",
        options: [],
        answer: 0,
        accept: ["five", "5"],
        explain: "„I work from nine until five.“ — „from … until …“ başlangıç ve bitiş.",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["It's half past eight.", "It is half past eight."],
        explain: "„It's half past eight.“ — „half past“ dokuzun değil sekizin buçuğu.",
      },
      {
        kind: "short_answer",
        text: "When is Tyler in bed?",
        options: [],
        answer: 0,
        accept: ["at midnight", "midnight"],
        explain: "„I am in bed at midnight.“",
      },
    ],
  },
  {
    id: "en-a1-u8-l2",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 8,
    title: "Saturday at the market",
    genre: "monologue",
    intro: "Lucy pazar alışverişini anlatıyor. Ne aldı, ne kadar ödedi?",
    gloss: [
      { de: "go to", tr: "gitmek" },
      { de: "open", tr: "açılmak" },
      { de: "at the end", tr: "sonunda" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Lucy", text: "I go to the market every Saturday morning. It opens at seven." },
      { speaker: "Lucy", text: "I'd like a kilo of apples, some potatoes and two carrots." },
      { speaker: "Lucy", text: "Are the tomatoes fresh? Yes, they are very fresh and cheap today." },
      { speaker: "Lucy", text: "How much are the apples? Two euros a kilo. That is not expensive." },
      { speaker: "Lucy", text: "A banana costs half a euro. I take four bananas for my children." },
      { speaker: "Lucy", text: "At the end I pay by card. It is nine euros." },
    ],
    questions: [
      {
        text: "When does Lucy go to the market?",
        options: ["every Saturday morning", "every Monday", "at midnight"],
        answer: 0,
        explain: "„I go to the market every Saturday morning.“",
      },
      {
        text: "How much are the apples?",
        options: ["two euros a kilo", "half a euro", "nine euros"],
        answer: 0,
        explain: "„Two euros a kilo.“ — yarım avro muzun fiyatı, dokuz avro toplam.",
      },
      {
        kind: "truefalse",
        text: "The tomatoes are not fresh.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Yes, they are very fresh and cheap today.“",
      },
      {
        kind: "gapfill",
        text: "Lucy takes four ___.",
        options: [],
        answer: 0,
        accept: ["bananas"],
        explain: "„I take four bananas for my children.“",
      },
      {
        kind: "order",
        text: "Lucy'nin anlattığı sıra: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "I go to the market every Saturday morning.",
          "I'd like a kilo of apples.",
          "How much are the apples?",
          "At the end I pay by card.",
        ],
        explain: "Önce pazara gidiş, sonra sipariş, sonra fiyat, en son ödeme.",
      },
      {
        kind: "short_answer",
        text: "How does Lucy pay?",
        options: [],
        answer: 0,
        accept: ["by card", "card", "with a card"],
        explain: "„At the end I pay by card.“ — ödeme biçimi „by“ ile: by card, by check.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-u8-w1",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 8,
    title: "My daily plan",
    genre: "personal",
    intro: "Saati yaz. Sonunda günlük programı doldur.",
    gloss: [
      { de: "half past", tr: "buçuk" },
      { de: "until", tr: "-e kadar" },
      { de: "a quarter to", tr: "çeyrek kala" },
      { de: "What time is it?", tr: "saat kaç" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Saat kaç?",
        answer: "What time is it?",
        hint: "„time“ burada süre değil, saatin kendisi. Özne „it“ zorunlu.",
      },
      {
        kind: "build",
        tr: "Saat yedi buçuk.",
        answer: "It's half past seven.",
        alternatives: ["It is half past seven."],
        hint: "„half past seven“ yediyi yarım geçiyor. Türkçedeki gibi yedi buçuk, sekizin yarısı değil.",
      },
      {
        kind: "build",
        tr: "Dokuza çeyrek var.",
        answer: "It's a quarter to nine.",
        alternatives: ["It is a quarter to nine."],
        hint: "„to“ kala demek ve gelecek saati söyler: a quarter to nine, yani 8.45.",
      },
      {
        kind: "build",
        tr: "Yedide kalkarım.",
        answer: "I get up at seven.",
        alternatives: ["At seven I get up."],
        hint: "Saatte „at“: at seven, at midnight. Günde „on“, ayda „in“.",
      },
      {
        kind: "form",
        prompt: "Günlük programı doldur.",
        facts: "Yedide kalkar; sekiz buçukta kahvaltı; dokuzdan beşe çalışır; gece yarısı uyur.",
        fields: [
          { label: "Get up", answer: "seven", accept: ["at seven", "7"] },
          { label: "Breakfast", answer: "half past eight", accept: ["at half past eight"] },
          { label: "Work", answer: "nine to five", accept: ["from nine to five", "nine until five", "from nine until five"] },
          { label: "Sleep", answer: "midnight", accept: ["at midnight"] },
        ],
      },
    ],
  },
  {
    id: "en-a1-u8-w2",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 8,
    title: "At the shop",
    genre: "formal",
    intro: "Ödeme ve alışveriş isteklerini yaz. Sayılabilen çoğulda „are“, tekilde „is“.",
    gloss: [
      { de: "Can I pay by card?", tr: "kartla ödeyebilir miyim" },
      { de: "Can we pay together?", tr: "birlikte ödeyebilir miyiz" },
      { de: "a kilo of apples", tr: "bir kilo elma" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Kartla ödeyebilir miyim?",
        answer: "Can I pay by card?",
        hint: "Ödeme biçimi „by“ ile: by card, by check. „with“ değil.",
      },
      {
        kind: "build",
        tr: "Birlikte ödeyebilir miyiz?",
        answer: "Can we pay together?",
        hint: "„together“ cümlenin sonunda duruyor.",
      },
      {
        kind: "build",
        tr: "Bir kilo elma istiyorum.",
        answer: "I'd like a kilo of apples.",
        alternatives: ["I would like a kilo of apples."],
        hint: "Miktar ile isim arasında „of“ var: a kilo of apples, a bottle of water.",
      },
      {
        kind: "build",
        tr: "Domatesler taze mi?",
        answer: "Are the tomatoes fresh?",
        hint: "Çoğul özne „are“ ister. Sıfat sonda: are the tomatoes fresh.",
      },
      {
        kind: "build",
        tr: "Elmalar ne kadar?",
        answer: "How much are the apples?",
        hint: "Fiyat sorusunda çoğulsa „are“: how much ARE the apples, is değil.",
      },
    ],
  },
];
