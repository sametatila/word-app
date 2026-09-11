import type { SkillExercise } from "../types";

/**
 * EN · A1 · Ünite 8 — "Meyve sebze, ödeme, günlük akış, saat".
 *
 * Dört ders: Fruit and vegetables · Paying the bill · Daily routine ·
 * Telling the time.
 *
 *   Kelime: apple, tomato, potato, fresh, kilo, banana, carrot, vegetable,
 *           bill, pay, cash, card, together, cheque, give, get, get up,
 *           wake up, breakfast, work, sleep, shower, dinner,
 *           in the morning, time, hour, clock, half, quarter, midnight,
 *           at night, lunchtime.
 *   Kalıp:  I'd like a kilo of apples. · Are the tomatoes fresh? ·
 *           How much are the apples? · Can I have the bill, please? ·
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
        text: "The writer works on Sunday.",
        options: ["True", "False"],
        answer: 1,
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
    title: "Paying the bill",
    genre: "dialogue",
    intro: "Hesap ödeniyor. Nakit mi, kart mı, birlikte mi?",
    gloss: [
      { de: "close", tr: "kapanmak" },
      { de: "of course", tr: "tabii ki" },
      { de: "moment", tr: "an" },
      { de: "problem", tr: "sorun" },
      { de: "a quarter to", tr: "çeyrek kala" },
    ],
    minutes: 4,
    text:
      "Waiter: Here is the bill. Twenty-four euros, please.\n" +
      "Ali: Can we pay together?\n" +
      "Waiter: Of course.\n" +
      "Eda: I'd like to pay by card.\n" +
      "Waiter: No problem. Or cash, if you prefer.\n" +
      "Ali: I only have a card too. No cash today.\n" +
      "Waiter: That's fine. Here you are.\n" +
      "Eda: Can I have a cheque for my work?\n" +
      "Waiter: Yes, one moment. What time is it now?\n" +
      "Eda: It's a quarter to nine.\n" +
      "Waiter: Then we close in one hour, at ten.\n" +
      "Ali: Thank you. Can you give me the card?\n" +
      "Waiter: Here. Have a good evening!",
    questions: [
      {
        text: "How much is the bill?",
        options: ["twenty-four euros", "twenty euros", "ten euros"],
        answer: 0,
        explain: "„Here is the bill. Twenty-four euros, please.“ — on, kapanış saati.",
      },
      {
        text: "How do they pay?",
        options: ["by card", "with cash", "with a cheque"],
        answer: 0,
        explain: "„I'd like to pay by card… I only have a card too.“ Çek, Eda'nın işi için bir belge.",
      },
      {
        kind: "truefalse",
        text: "Ali has cash today.",
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
        explain: "„It's a quarter to nine.“ — dokuza çeyrek kala, yani 8:45.",
      },
      {
        kind: "order",
        text: "Konuşmanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Here is the bill.",
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
        explain: "„Then we close in one hour, at ten.“ — bir saat sonra, yani onda.",
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
    title: "What time is it?",
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
      { speaker: "Can", text: "Excuse me, what time is it?" },
      { speaker: "Nil", text: "It's half past eight." },
      { speaker: "Can", text: "Half past eight! I get up at seven every day, but today I sleep until eight." },
      { speaker: "Nil", text: "Do you work today?" },
      { speaker: "Can", text: "Yes, I work from nine until five. And you?" },
      { speaker: "Nil", text: "I don't work on Monday. I wake up at nine and I take a long shower." },
      { speaker: "Can", text: "You are lucky! What do you do in the morning?" },
      { speaker: "Nil", text: "I have breakfast and I read. At lunchtime I cook." },
      { speaker: "Can", text: "And at night?" },
      { speaker: "Nil", text: "At night I am always tired. I sleep at a quarter past eleven." },
      { speaker: "Can", text: "I sleep at midnight. My clock is always in my hand!" },
    ],
    questions: [
      {
        text: "What time is it?",
        options: ["half past eight", "half past seven", "a quarter past eleven"],
        answer: 0,
        explain: "„It's half past eight.“ — sekiz buçuk; on bir çeyrek Nil'in uyku saati.",
      },
      {
        text: "When does Nil wake up on Monday?",
        options: ["at nine", "at seven", "at eight"],
        answer: 0,
        explain: "„I don't work on Monday. I wake up at nine…“ — yedi Can'ın kalkma saati.",
      },
      {
        kind: "truefalse",
        text: "Nil works on Monday.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I don't work on Monday.“",
      },
      {
        kind: "gapfill",
        text: "Can works from nine until ___.",
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
        text: "When does Can sleep?",
        options: [],
        answer: 0,
        accept: ["at midnight", "midnight"],
        explain: "„I sleep at midnight.“",
      },
    ],
  },
  {
    id: "en-a1-u8-l2",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 8,
    title: "Fruit and vegetables",
    genre: "monologue",
    intro: "Ela pazar alışverişini anlatıyor. Ne aldı, ne kadar ödedi?",
    gloss: [
      { de: "go to", tr: "gitmek" },
      { de: "open", tr: "açılmak" },
      { de: "at the end", tr: "sonunda" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Ela", text: "I go to the market every Saturday morning. It opens at seven." },
      { speaker: "Ela", text: "I'd like a kilo of apples, some potatoes and two carrots." },
      { speaker: "Ela", text: "Are the tomatoes fresh? Yes, they are very fresh and cheap today." },
      { speaker: "Ela", text: "How much are the apples? Two euros a kilo. That is not expensive." },
      { speaker: "Ela", text: "A banana costs half a euro. I take four bananas for my children." },
      { speaker: "Ela", text: "At the end I pay by card. The bill is nine euros." },
    ],
    questions: [
      {
        text: "When does Ela go to the market?",
        options: ["every Saturday morning", "every Monday", "at midnight"],
        answer: 0,
        explain: "„I go to the market every Saturday morning.“",
      },
      {
        text: "How much are the apples?",
        options: ["two euros a kilo", "half a euro", "nine euros"],
        answer: 0,
        explain: "„Two euros a kilo.“ — yarım euro muzun fiyatı, dokuz euro toplam.",
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
        text: "Ela takes four ___.",
        options: [],
        answer: 0,
        accept: ["bananas"],
        explain: "„I take four bananas for my children.“",
      },
      {
        kind: "order",
        text: "Ela'nın anlattığı sıra: doğru sıraya koy.",
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
        text: "How does Ela pay?",
        options: [],
        answer: 0,
        accept: ["by card", "card", "with a card"],
        explain: "„At the end I pay by card.“ — ödeme biçimi „by“ ile: by card, by cheque.",
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
    title: "What time is it?",
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
        hint: "„to“ kala demek ve gelecek saati söyler: a quarter to nine, yani 8:45.",
      },
      {
        kind: "build",
        tr: "Yedide kalkarım.",
        answer: "I get up at seven.",
        hint: "Saatte „at“: at seven, at midnight. Günde „on“, ayda „in“.",
      },
      {
        kind: "form",
        prompt: "Günlük programı doldur.",
        facts: "Yedide kalkar; sekiz buçukta kahvaltı; dokuzdan beşe çalışır; gece yarısı uyur.",
        fields: [
          { label: "Get up", answer: "seven", accept: ["at seven", "7"] },
          { label: "Breakfast", answer: "half past eight", accept: ["at half past eight"] },
          { label: "Work", answer: "nine to five", accept: ["from nine to five", "nine until five"] },
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
    title: "Can I pay by card?",
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
        hint: "Ödeme biçimi „by“ ile: by card, by cheque. „with“ değil.",
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
