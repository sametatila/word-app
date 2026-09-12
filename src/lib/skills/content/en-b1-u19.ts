import type { SkillExercise } from "../types";

/**
 * EN · B1 · Ünite 19 — "Acil servis, prospektüs, tahlil sonucu, sevk".
 *
 * Dört ders: At the emergency room · Reading the label ·
 * The results are in · Seeing a specialist.
 *
 *   Kelime: bleed, emergency, ambulance, injury, wound, chest, breath,
 *           ward, tablet, dose, pack, medicine, pharmacy, painkiller,
 *           side effect, warning, blood, test, sample, scan, infection,
 *           virus, allergy, chronic, refer, specialist, surgeon, examine,
 *           x-ray, bone, knee, joint.
 *   Kalıp:  By the time we arrived, the bleeding had stopped. ·
 *           The doctor had seen the wound before I spoke. ·
 *           They had already called an ambulance. ·
 *           The tablet is taken twice a day. ·
 *           The medicine was prescribed by a doctor. ·
 *           The pack must be kept in the fridge. ·
 *           The doctor said the blood test was normal. ·
 *           She told me not to worry about the scan. ·
 *           They asked whether I had an allergy. ·
 *           The doctor who referred me works upstairs. ·
 *           This is the x-ray that shows the bone. ·
 *           The clinic where the specialist works is new.
 *
 * Ünitenin tek öğretme noktası KİPLİ EDİLGEN: „The pack must be kept in
 * the fridge.“ Kip ile edilgen üst üste biniyor ve sıra değişmiyor:
 * „must“ + „be“ + üçüncü hâl. Prospektüs dili bu biçimle konuşuyor,
 * çünkü hem kural hem faili söylemeyen bir cümle gerekiyor. Yanında
 * ünitenin ikinci yeniliği duruyor: aktarılan OLUMSUZ buyruk — „She told
 * me not to worry“, „not“ mastarın önünde.
 */
export const enB1U19: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-u19-r1",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 19,
    title: "Reading the label",
    genre: "info",
    intro: "Prospektüsün altı satırı. Neden hep edilgen?",
    gloss: [
      { de: "prescribed", tr: "reçete edildi" },
      { de: "the fridge", tr: "buzdolabı" },
      { de: "swallow", tr: "yutmak" },
      { de: "the passive", tr: "edilgen" },
      { de: "the agent", tr: "fail" },
      { de: "exists", tr: "var" },
      { de: "modal", tr: "kip" },
      { de: "sentence", tr: "cümle" },
      { de: "reaching", tr: "ulaşması" },
      { de: "least", tr: "en az" },
      { de: "the bottom", tr: "en alt" },
    ],
    minutes: 7,
    text:
      "Six lines from a pack, and what each one is really doing.\n" +
      "The tablet is taken twice a day. Not „take the tablet“ — the passive, with no time in it, because this is how the medicine works and not what you are being told to do this morning.\n" +
      "The medicine was prescribed by a doctor. Here the agent is named, and it is named for one reason: this line exists so that nobody else takes the pack.\n" +
      "The pack must be kept in the fridge. A modal and a passive together, in that order: „must“, then „be“, then the third form. This is the sentence people read last and the one that decides whether the medicine works at all.\n" +
      "Each tablet should be swallowed with water, not with tea. The reason is in a smaller line two paragraphs down, and it is about the dose reaching the stomach at the right speed.\n" +
      "Side effects are listed by how often they happen, not by how serious they are. The first three on the list are the common ones and usually the least worrying.\n" +
      "The warning at the bottom is the only line written as an order: do not drive in the first two days. Everything else is a rule about the medicine. That one is a rule about you.",
    questions: [
      {
        text: "Why is „The tablet is taken twice a day“ passive?",
        options: ["it describes how the medicine works", "it is an order", "the doctor wrote it"],
        answer: 0,
        explain: "„because this is how the medicine works and not what you are being told to do this morning.“",
      },
      {
        text: "Why is the doctor named in the second line?",
        options: ["so that nobody else takes the pack", "so you can call them", "to show the date"],
        answer: 0,
        explain: "„this line exists so that nobody else takes the pack.“",
      },
      {
        kind: "truefalse",
        text: "Side effects are listed by how often they happen.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Side effects are listed by how often they happen, not by how serious they are.“",
      },
      {
        kind: "gapfill",
        text: "The pack must be kept in the ___.",
        options: [],
        answer: 0,
        accept: ["fridge"],
        explain: "„The pack must be kept in the fridge.“",
      },
      {
        kind: "order",
        text: "Prospektüsün sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The tablet is taken twice a day.",
          "The medicine was prescribed by a doctor.",
          "The pack must be kept in the fridge.",
          "Do not drive in the first two days.",
        ],
        explain: "Doz, reçete, saklama, en sonda emir kipindeki uyarı.",
      },
      {
        kind: "short_answer",
        text: "Which line is written as an order?",
        options: [],
        answer: 0,
        accept: ["the warning", "do not drive", "the last line"],
        explain: "„The warning at the bottom is the only line written as an order…“",
      },
    ],
  },
  {
    id: "en-b1-u19-r2",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 19,
    title: "At the emergency room",
    genre: "story",
    intro: "Acil serviste bir akşam. Ne zaten olmuştu?",
    gloss: [
      { de: "the bleeding", tr: "kanama" },
      { de: "triage", tr: "aciliyet sıralaması" },
      { de: "stitches", tr: "dikiş" },
      { de: "sentence", tr: "cümle" },
      { de: "reached", tr: "ulaştı" },
      { de: "frightened", tr: "korkutmuş" },
      { de: "medical", tr: "tıbbi" },
      { de: "the sound", tr: "ses" },
      { de: "belonged", tr: "aitti" },
    ],
    minutes: 7,
    text:
      "By the time we arrived, the bleeding had stopped. That is the sentence I keep, because it changed everything that came after.\n" +
      "They had already called an ambulance from the building, before I knew anything about it, and the ambulance and I reached the door within a minute of each other.\n" +
      "The doctor had seen the wound before I spoke. Four seconds, from two metres away, while I was still saying the word „kitchen“. Everything I had prepared in the car was answered by looking.\n" +
      "Then the waiting. Two hours, and the triage nurse explained it in one line: the people who go first are the ones who cannot wait, and tonight that was not us.\n" +
      "The injury needed six stitches and the chest pain that had frightened me most turned out to be breath, not heart. I had made it into something else on the way in, which is what a car journey does.\n" +
      "We left at one in the morning with a paper for the ward on Thursday. In the corridor a man was sitting with a bag and had been there since seven.\n" +
      "What I took away was not medical. It was the triage line: two hours of waiting is the sound of a system working, and the hour I would have preferred belonged to somebody else.",
    questions: [
      {
        text: "What had happened before they arrived?",
        options: ["the bleeding had stopped", "the doctor had gone", "the ward had closed"],
        answer: 0,
        explain: "„By the time we arrived, the bleeding had stopped.“",
      },
      {
        text: "What turned out to be the chest pain?",
        options: ["breath", "the heart", "the wound"],
        answer: 0,
        explain: "„the chest pain that had frightened me most turned out to be breath, not heart.“",
      },
      {
        kind: "truefalse",
        text: "The writer called the ambulance.",
        options: ["True", "False"],
        answer: 1,
        explain: "„They had already called an ambulance from the building, before I knew anything about it.“",
      },
      {
        kind: "gapfill",
        text: "The injury needed ___ stitches.",
        options: [],
        answer: 0,
        accept: ["six", "6"],
        explain: "„The injury needed six stitches…“",
      },
      {
        kind: "short_answer",
        text: "What does the triage line say?",
        options: [],
        answer: 0,
        accept: ["who cannot wait goes first", "the urgent go first", "not us tonight"],
        explain: "„the people who go first are the ones who cannot wait…“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-u19-l1",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 19,
    title: "The results are in",
    genre: "dialogue",
    intro: "Tahlil sonuçları. Hangi cümle aktarılmış?",
    gloss: [
      { de: "normal", tr: "olağan" },
      { de: "not to worry", tr: "endişelenmemem" },
      { de: "whether", tr: "olup olmadığı" },
      { de: "range", tr: "aralık" },
      { de: "sentence", tr: "cümle" },
      { de: "whole", tr: "bütün" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Nil", text: "You had the results this morning. And?" },
      { speaker: "Mert", text: "The doctor said the blood test was normal. Everything in the normal range, including the one I was worried about." },
      { speaker: "Nil", text: "And the scan?" },
      { speaker: "Mert", text: "She told me not to worry about the scan. Which is a sentence that makes everybody worry, and she knows it." },
      { speaker: "Nil", text: "Then why say it?" },
      { speaker: "Mert", text: "Because she said the next part too: there is a small thing on it, it has been there since 2021, and it has not changed." },
      { speaker: "Nil", text: "That is a different sentence." },
      { speaker: "Mert", text: "It is the whole difference. „Do not worry“ is nothing. „It has not changed in four years“ is information." },
      { speaker: "Nil", text: "Did they ask you anything?" },
      { speaker: "Mert", text: "They asked whether I had an allergy. Twice, in two rooms, from two people, which I now understand is on purpose." },
      { speaker: "Nil", text: "And the infection?" },
      { speaker: "Mert", text: "Gone. Ten days of tablets and the sample from Friday came back clear." },
      { speaker: "Nil", text: "So a good morning." },
      { speaker: "Mert", text: "A long morning with a good end. And one thing I will do differently: I will write the questions down before, because I forgot two of three." },
    ],
    questions: [
      {
        text: "What did the doctor say about the blood test?",
        options: ["it was normal", "it was not clear", "it had changed"],
        answer: 0,
        explain: "„The doctor said the blood test was normal.“",
      },
      {
        text: "Why is „it has not changed in four years“ better?",
        options: ["it is information", "it is shorter", "it is kinder"],
        answer: 0,
        explain: "„„Do not worry“ is nothing. „It has not changed in four years“ is information.“",
      },
      {
        kind: "truefalse",
        text: "They asked about the allergy twice.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Twice, in two rooms, from two people, which I now understand is on purpose.“",
      },
      {
        kind: "gapfill",
        text: "The infection needed ___ days of tablets.",
        options: [],
        answer: 0,
        accept: ["ten", "10"],
        explain: "„Ten days of tablets and the sample from Friday came back clear.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["She told me not to worry about the scan.", "She told me not to worry about the scan"],
        explain: "Aktarılan olumsuz buyrukta „not“ mastarın ÖNÜNE geliyor.",
      },
      {
        kind: "short_answer",
        text: "What will Mert do differently?",
        options: [],
        answer: 0,
        accept: ["write the questions down", "write questions first", "prepare questions"],
        explain: "„I will write the questions down before, because I forgot two of three.“",
      },
    ],
  },
  {
    id: "en-b1-u19-l2",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 19,
    title: "Seeing a specialist",
    genre: "dialogue",
    intro: "Sevk kâğıdı ve röntgen. Hangi hekim nerede?",
    gloss: [
      { de: "referred", tr: "sevk etti" },
      { de: "the joint", tr: "eklem" },
      { de: "upstairs", tr: "üst katta" },
      { de: "referral", tr: "sevk kâğıdı" },
      { de: "version", tr: "hâli" },
      { de: "above", tr: "üstündeki" },
      { de: "operate", tr: "ameliyat etmek" },
      { de: "the operation", tr: "ameliyat" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Ela", text: "So you have the referral. Who sent you?" },
      { speaker: "Can", text: "The doctor who referred me works upstairs. Same building, second floor, and I did not know that for two months." },
      { speaker: "Ela", text: "Two months?" },
      { speaker: "Can", text: "I had been going to the clinic where the specialist works, which is new and across the city, for an appointment I could have had here." },
      { speaker: "Ela", text: "Nobody told you." },
      { speaker: "Can", text: "Nobody was asked. That is the honest version." },
      { speaker: "Ela", text: "And the knee?" },
      { speaker: "Can", text: "This is the x-ray that shows the bone. The line you can see is old — from 2018, from football." },
      { speaker: "Ela", text: "And the pain now?" },
      { speaker: "Can", text: "Not the bone. The joint above it, which does not show on an x-ray at all, and that is why the first two visits found nothing." },
      { speaker: "Ela", text: "Will they operate?" },
      { speaker: "Can", text: "The surgeon says no, twice, clearly. Six weeks of exercises first and then we look again." },
      { speaker: "Ela", text: "Are you disappointed?" },
      { speaker: "Can", text: "I was for an afternoon. Then I read the paper he gave me: four out of five knees like mine are better after the six weeks. That is a better number than the operation has." },
    ],
    questions: [
      {
        text: "Where does the doctor who referred Can work?",
        options: ["upstairs in the same building", "across the city", "in the new clinic"],
        answer: 0,
        explain: "„The doctor who referred me works upstairs. Same building, second floor…“",
      },
      {
        text: "Where is the pain?",
        options: ["in the joint", "in the bone", "in the knee only"],
        answer: 0,
        explain: "„Not the bone. The joint above it, which does not show on an x-ray at all…“",
      },
      {
        kind: "truefalse",
        text: "The surgeon wants to operate.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The surgeon says no, twice, clearly. Six weeks of exercises first…“",
      },
      {
        kind: "gapfill",
        text: "The exercises take ___ weeks.",
        options: [],
        answer: 0,
        accept: ["six", "6"],
        explain: "„Six weeks of exercises first and then we look again.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The doctor who referred me works upstairs.", "The doctor who referred me works upstairs"],
        explain: "Özne konumundaki „who“ düşemez.",
      },
      {
        kind: "short_answer",
        text: "How many knees like Can's get better?",
        options: [],
        answer: 0,
        accept: ["four out of five", "four in five", "four"],
        explain: "„four out of five knees like mine are better after the six weeks.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-u19-w1",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 19,
    title: "The pack must be kept in the fridge",
    genre: "info",
    intro: "Kip ve edilgen üst üste. Sıra hiç değişmiyor.",
    gloss: [
      { de: "is taken", tr: "alınıyor" },
      { de: "was prescribed", tr: "reçete edildi" },
      { de: "must be kept", tr: "saklanmalı" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Hap günde iki kez alınıyor.",
        answer: "The tablet is taken twice a day.",
        hint: "Edilgen ve zamansız: ilacın işleyişi anlatılıyor, emir verilmiyor.",
      },
      {
        kind: "build",
        tr: "İlaç bir hekim tarafından reçete edildi.",
        answer: "The medicine was prescribed by a doctor.",
        hint: "Fail „by“ ile söyleniyor, çünkü kimin yazdığı burada önemli.",
      },
      {
        kind: "build",
        tr: "Kutu buzdolabında saklanmalı.",
        answer: "The pack must be kept in the fridge.",
        hint: "Kip ve edilgen üst üste: „must“ + „be“ + üçüncü hâl, bu sırayla.",
      },
      {
        kind: "build",
        tr: "Ben konuşmadan önce hekim yarayı görmüştü.",
        answer: "The doctor had seen the wound before I spoke.",
        hint: "Önce olan iş „had“ + üçüncü hâl; konuşma sonra geliyor.",
      },
      {
        kind: "form",
        prompt: "Prospektüs kartını doldur.",
        facts: "Günde iki hap; hekim reçete etti; buzdolabında saklanacak; ilk iki gün araç kullanılmayacak.",
        fields: [
          { label: "Dose", answer: "twice a day", accept: ["two a day"] },
          { label: "Prescribed by", answer: "a doctor", accept: ["the doctor"] },
          { label: "Storage", answer: "the fridge", accept: ["in the fridge"] },
          { label: "Warning", answer: "do not drive", accept: ["no driving"] },
        ],
      },
    ],
  },
  {
    id: "en-b1-u19-w2",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 19,
    title: "She told me not to worry about the scan",
    genre: "personal",
    intro: "Aktarılan buyruk olumsuzlanınca „not“ nereye gidiyor?",
    gloss: [
      { de: "not to worry", tr: "endişelenmemem" },
      { de: "whether", tr: "olup olmadığı" },
      { de: "referred", tr: "sevk etti" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Hekim kan tahlilinin normal olduğunu söyledi.",
        answer: "The doctor said the blood test was normal.",
        hint: "Aktarılınca „is“ bir basamak geriye kayıp „was“ oluyor.",
      },
      {
        kind: "build",
        tr: "Bana görüntüleme için endişelenmememi söyledi.",
        answer: "She told me not to worry about the scan.",
        hint: "Aktarılan olumsuz buyrukta „not“ mastarın ÖNÜNE geliyor: „not to worry“.",
      },
      {
        kind: "build",
        tr: "Alerjim olup olmadığını sordular.",
        answer: "They asked whether I had an allergy.",
        alternatives: ["They asked if I had an allergy."],
        hint: "„whether“ ile „if“ burada aynı işi görüyor; „whether“ biraz daha resmî.",
      },
      {
        kind: "build",
        tr: "Beni sevk eden hekim üst katta çalışıyor.",
        answer: "The doctor who referred me works upstairs.",
        hint: "Özne konumundaki „who“ düşemez.",
      },
      {
        kind: "build",
        tr: "Kemiği gösteren röntgen bu.",
        answer: "This is the x-ray that shows the bone.",
        hint: "„that“ burada da özne konumunda; o yüzden kalıyor.",
      },
    ],
  },
];
