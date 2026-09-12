import type { SkillExercise } from "../types";

/**
 * EN · A2 · Ünite 17 — "Gezi, seyahat sorunları, araba kiralama, dışarıda yemek".
 *
 * Dört ders: Sightseeing · Travel problems · Renting a car ·
 * Eating out abroad.
 *
 *   Kelime: tour, museum, ticket, guide, worth, exhibition, castle, tower,
 *           flight, miss, lost, help, insurance, get lost, backpack,
 *           travel bag, rent, licence, fuel, return, extra, gas station,
 *           highway, speed limit, menu, allergy, recommend, bill, tip,
 *           main course, dessert, waitress.
 *   Kalıp:  Let's visit the museum. · How about taking a bus tour? ·
 *           The museum is worth visiting. · My flight is delayed. ·
 *           I've missed my connection. · Could you help me, please? ·
 *           I'd like to rent a car for three days. · Is the fuel included? ·
 *           I have to return the car at six. ·
 *           Could I see the menu, please? · I'm allergic to … ·
 *           Could we have the bill, please?
 *
 * Ünitenin tek öğretme noktası ÖNERİ VE DEĞER KALIPLARINDA „-ing“:
 * „How about taking a bus tour?“ ve „The museum is worth visiting.“ Bu iki
 * sözcükten sonra mastar gelmiyor, fiil „-ing“ biçimine giriyor. Karşıtı
 * hemen yanında duruyor ve ayrımı görünür kılıyor: „Let's visit …“ eksiz
 * fiil istiyor. Öğrencinin sezgisi burada üçünü de aynı sanmaya yatkın.
 */
export const enA2U17: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a2-u17-r1",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 17,
    title: "Sightseeing",
    genre: "blog",
    intro: "İki günlük gezi yazısı. Neyi ne zaman görmeli?",
    gloss: [
      { de: "queue", tr: "kuyruk" },
      { de: "the top", tr: "tepe" },
      { de: "the best part", tr: "en iyi yanı" },
      { de: "bridge", tr: "köprü" },
    ],
    minutes: 6,
    text:
      "Two days in this city, and everybody says: see the castle. We saw it. It is worth visiting, but not on Saturday — the queue for the ticket is longer than the tour.\n" +
      "My advice: go on Monday morning. The guide starts at ten and there are six people, not sixty.\n" +
      "How about taking a bus tour first? Two hours, and after that you know where everything is. The tower, the museum, the old bridge. Then you choose.\n" +
      "The exhibition in the museum was the best part of the trip. Photos from nineteen twenty: the same streets, the same houses, different people. Worth seeing even if you don't like museums.\n" +
      "And the tower? Two hundred steps. From the top you see the sea. I stayed there half an hour and said nothing. That does not happen often.\n" +
      "Let's go again in September. The castle is open until eight then.",
    questions: [
      {
        text: "When should you visit the castle?",
        options: ["on Monday morning", "on Saturday", "in the evening"],
        answer: 0,
        explain: "„My advice: go on Monday morning. The guide starts at ten and there are six people, not sixty.“",
      },
      {
        text: "What was the best part of the trip?",
        options: ["the exhibition", "the tower", "the bus tour"],
        answer: 0,
        explain: "„The exhibition in the museum was the best part of the trip.“",
      },
      {
        kind: "truefalse",
        text: "The queue on Saturday is short.",
        options: ["True", "False"],
        answer: 1,
        explain: "„…the queue for the ticket is longer than the tour.“",
      },
      {
        kind: "gapfill",
        text: "The tower has two hundred ___.",
        options: [],
        answer: 0,
        accept: ["steps"],
        explain: "„And the tower? Two hundred steps. From the top you see the sea.“",
      },
      {
        kind: "short_answer",
        text: "How long is the castle open in September?",
        options: [],
        answer: 0,
        accept: ["until eight", "until 8", "eight"],
        explain: "„Let's go again in September. The castle is open until eight then.“",
      },
    ],
  },
  {
    id: "en-a2-u17-r2",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 17,
    title: "Renting a car",
    genre: "dialogue",
    intro: "Araba kiralama. Yakıt dahil mi, sınır kaç?",
    gloss: [
      { de: "full", tr: "dolu" },
      { de: "fill", tr: "doldurmak" },
      { de: "Understood", tr: "anlaşıldı" },
    ],
    minutes: 5,
    text:
      "Mert: Good morning. I'd like to rent a car for three days.\n" +
      "Office: Of course. Do you have your licence?\n" +
      "Mert: Here. And my passport.\n" +
      "Office: Thank you. A small car or a bigger one?\n" +
      "Mert: The small one. Two people, two bags.\n" +
      "Office: Ninety euros for three days.\n" +
      "Mert: Is the fuel included?\n" +
      "Office: No. You get it full and you bring it back full. The gas station is next to the airport.\n" +
      "Mert: And if I come back with half?\n" +
      "Office: Then we fill it and it costs more than at the station. Always more.\n" +
      "Mert: Understood. What is the speed limit on the highway?\n" +
      "Office: A hundred and thirty. In the city fifty.\n" +
      "Mert: I have to return the car at six on Friday, yes?\n" +
      "Office: Six, yes. After that every hour is extra.\n" +
      "Mert: Then I come at five. I don't like extra.",
    questions: [
      {
        text: "What does the car cost?",
        options: ["ninety euros for three days", "a hundred and thirty", "fifty a day"],
        answer: 0,
        explain: "„Ninety euros for three days.“ — yüz otuz hız sınırı.",
      },
      {
        text: "What happens if the car comes back with half?",
        options: ["the office fills it and it costs more", "it is free", "the rent is longer"],
        answer: 0,
        explain: "„Then we fill it and it costs more than at the station. Always more.“",
      },
      {
        kind: "truefalse",
        text: "The fuel is included.",
        options: ["True", "False"],
        answer: 1,
        explain: "„No. You get it full and you bring it back full.“",
      },
      {
        kind: "gapfill",
        text: "The speed limit in the city is ___.",
        options: [],
        answer: 0,
        accept: ["fifty", "50"],
        explain: "„A hundred and thirty. In the city fifty.“",
      },
      {
        kind: "order",
        text: "Konuşmanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "I'd like to rent a car for three days.",
          "Do you have your licence?",
          "Is the fuel included?",
          "I have to return the car at six on Friday, yes?",
        ],
        explain: "Önce istek, sonra belge, sonra yakıt, en son iade saati.",
      },
      {
        kind: "short_answer",
        text: "When does Mert want to come back?",
        options: [],
        answer: 0,
        accept: ["at five", "five", "at 5"],
        explain: "„Then I come at five. I don't like extra.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a2-u17-l1",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 17,
    title: "Travel problems",
    genre: "dialogue",
    intro: "Kaçan aktarma ve kayıp çanta. Ne zaman, nerede?",
    gloss: [
      { de: "worry", tr: "endişelenmek" },
      { de: "stand", tr: "ayakta durmak" },
      { de: "connection", tr: "aktarma" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Ela", text: "Excuse me. Could you help me, please? My flight is delayed and I've missed my connection." },
      { speaker: "Desk", text: "Which flight?" },
      { speaker: "Ela", text: "The one from Rome at eleven. It landed at half past two." },
      { speaker: "Desk", text: "And your connection was at one. I see it. We have a flight at seven this evening." },
      { speaker: "Ela", text: "Seven? That is five hours." },
      { speaker: "Desk", text: "I am sorry. There is nothing before that." },
      { speaker: "Ela", text: "And my luggage?" },
      { speaker: "Desk", text: "It goes with the seven o'clock flight. You get it at the end." },
      { speaker: "Ela", text: "One more problem. My travel bag is lost. Not the big one — the small one, from the plane." },
      { speaker: "Desk", text: "Did you leave it in the plane?" },
      { speaker: "Ela", text: "I think so." },
      { speaker: "Desk", text: "Then it comes here in an hour. Everything from the plane comes here. Do you have insurance?" },
      { speaker: "Ela", text: "Yes." },
      { speaker: "Desk", text: "Then don't worry today. Eat something. Five hours is long only when you stand." },
    ],
    questions: [
      {
        text: "Why was the connection missed?",
        options: ["the flight was delayed", "the luggage was lost", "the plane landed at one"],
        answer: 0,
        explain: "„My flight is delayed and I've missed my connection.“ — aktarma birdeydi, uçak iki buçukta indi.",
      },
      {
        text: "When is the next flight?",
        options: ["at seven this evening", "at one", "at half past two"],
        answer: 0,
        explain: "„We have a flight at seven this evening.“",
      },
      {
        kind: "truefalse",
        text: "The luggage comes before the seven o'clock flight.",
        options: ["True", "False"],
        answer: 1,
        explain: "„It goes with the seven o'clock flight. You get it at the end.“",
      },
      {
        kind: "gapfill",
        text: "Ela has to wait ___ hours.",
        options: [],
        answer: 0,
        accept: ["five", "5"],
        explain: "„Seven? That is five hours.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Could you help me, please?", "Could you help me, please"],
        explain: "„help“ sonrası doğrudan nesne geliyor; edat yok.",
      },
      {
        kind: "short_answer",
        text: "Where is the small travel bag?",
        options: [],
        answer: 0,
        accept: ["in the plane", "the plane"],
        explain: "„Did you leave it in the plane? — I think so.“",
      },
    ],
  },
  {
    id: "en-a2-u17-l2",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 17,
    title: "Eating out abroad",
    genre: "dialogue",
    intro: "Lokantada sipariş. Alerji nerede sorun çıkarıyor?",
    gloss: [
      { de: "allergic", tr: "alerjisi olan" },
      { de: "separately", tr: "ayrı ayrı" },
      { de: "worth waiting for", tr: "beklemeye değer" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Waitress", text: "Good evening. A table for two?" },
      { speaker: "Can", text: "Yes, please. Could I see the menu?" },
      { speaker: "Waitress", text: "Here you are. Today we have fish with rice — that is what I recommend." },
      { speaker: "Can", text: "I'm allergic to fish. Is there anything with chicken?" },
      { speaker: "Waitress", text: "The main course with chicken and vegetables. No fish near it." },
      { speaker: "Can", text: "Good. And for my friend the soup first." },
      { speaker: "Waitress", text: "And to drink?" },
      { speaker: "Can", text: "Water for both, please." },
      { speaker: "Waitress", text: "Dessert comes with the main course here. Is that fine?" },
      { speaker: "Can", text: "Yes. What is the dessert today?" },
      { speaker: "Waitress", text: "Apple cake. It is worth waiting for." },
      { speaker: "Can", text: "Then we wait." },
      { speaker: "Waitress", text: "Could I bring you bread now?" },
      { speaker: "Can", text: "Yes, please. And later could we have the bill together, not separately?" },
      { speaker: "Waitress", text: "Of course." },
    ],
    questions: [
      {
        text: "What is Can allergic to?",
        options: ["fish", "chicken", "apples"],
        answer: 0,
        explain: "„I'm allergic to fish. Is there anything with chicken?“",
      },
      {
        text: "When does the dessert come?",
        options: ["with the main course", "after the bill", "before the soup"],
        answer: 0,
        explain: "„Dessert comes with the main course here. Is that fine?“",
      },
      {
        kind: "truefalse",
        text: "They want two bills.",
        options: ["True", "False"],
        answer: 1,
        explain: "„…could we have the bill together, not separately?“",
      },
      {
        kind: "gapfill",
        text: "The dessert today is ___ cake.",
        options: [],
        answer: 0,
        accept: ["apple"],
        explain: "„Apple cake. It is worth waiting for.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Could I see the menu?", "Could I see the menu"],
        explain: "Lokantanın ilk cümlesi; „Can I“ da olur ama „Could I“ daha kibar.",
      },
      {
        kind: "short_answer",
        text: "What does the waitress recommend?",
        options: [],
        answer: 0,
        accept: ["fish with rice", "the fish", "fish"],
        explain: "„Today we have fish with rice — that is what I recommend.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-u17-w1",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 17,
    title: "How about taking a bus tour?",
    genre: "personal",
    intro: "Üç öneri kalıbı. Hangisi eksiz fiil, hangisi „-ing“ istiyor?",
    gloss: [
      { de: "How about", tr: "ne dersin" },
      { de: "worth visiting", tr: "görülmeye değer" },
      { de: "rent a car", tr: "araba kiralamak" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Müzeyi ziyaret edelim.",
        answer: "Let's visit the museum.",
        hint: "„Let's“ sonrası fiil eksiz ve „to“ almıyor.",
      },
      {
        kind: "build",
        tr: "Otobüs turuna ne dersin?",
        answer: "How about taking a bus tour?",
        hint: "„How about“ sonrası fiil „-ing“ biçimine giriyor, mastar olmaz.",
      },
      {
        kind: "build",
        tr: "Müze görülmeye değer.",
        answer: "The museum is worth visiting.",
        hint: "„worth“ da „-ing“ istiyor: „worth to visit“ diye bir kuruluş yok.",
      },
      {
        kind: "build",
        tr: "Üç günlüğüne bir araba kiralamak istiyorum.",
        answer: "I'd like to rent a car for three days.",
        alternatives: ["I would like to rent a car for three days."],
        hint: "Süre „for“ ile; „I'd like“ sonrası bu kez „to“ + fiil.",
      },
      {
        kind: "form",
        prompt: "Kiralama kartını doldur.",
        facts: "Küçük araba; üç gün; doksan euro; yakıt dahil değil; iade cuma altıda.",
        fields: [
          { label: "Car", answer: "a small car", accept: ["small"] },
          { label: "Days", answer: "three", accept: ["3"] },
          { label: "Price", answer: "ninety euros", accept: ["90 euros"] },
          { label: "Fuel", answer: "not included", accept: ["no"] },
        ],
      },
    ],
  },
  {
    id: "en-a2-u17-w2",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 17,
    title: "Could you help me, please?",
    genre: "formal",
    intro: "Seyahat sorunu ve lokanta. Aynı kalıp iki kişi için de çalışıyor.",
    gloss: [
      { de: "is delayed", tr: "gecikti" },
      { de: "my connection", tr: "aktarmam" },
      { de: "the bill", tr: "hesap" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Uçuşum gecikti.",
        answer: "My flight is delayed.",
        hint: "Edilgen biçim burada sıfat gibi çalışıyor: „is delayed“.",
      },
      {
        kind: "build",
        tr: "Aktarmamı kaçırdım.",
        answer: "I've missed my connection.",
        alternatives: ["I have missed my connection."],
        hint: "Sonucu şimdi önemli — hâlâ havaalanındasın: present perfect.",
      },
      {
        kind: "build",
        tr: "Bana yardım edebilir misiniz, lütfen?",
        answer: "Could you help me, please?",
        hint: "„help“ sonrası doğrudan nesne geliyor; edat gerekmiyor.",
      },
      {
        kind: "build",
        tr: "Menüyü görebilir miyim, lütfen?",
        answer: "Could I see the menu, please?",
        hint: "Tekil özneyle aynı kalıp; lokantada en olağan giriş.",
      },
      {
        kind: "build",
        tr: "Hesabı alabilir miyiz, lütfen?",
        answer: "Could we have the bill, please?",
        hint: "Çoğul özneyle aynı kalıp; „bill“ burada hesap demek.",
      },
    ],
  },
];
