import type { SkillExercise } from "../types";

/**
 * EN · B1 · Ünite 19 — "Acil servis, prospektüs, tahlil sonucu, sevk".
 *
 * Dört ders: At the emergency room · Reading the label ·
 * The results are in · Seeing a specialist.
 *
 *   Kelime: bleed, emergency, ambulance, injury, wound, chest, breath,
 *           unit, tablet, dose, package, medicine, pharmacy, painkiller,
 *           side effect, warning, blood, test, sample, scan, infection,
 *           virus, allergy, chronic, refer, specialist, surgeon, examine,
 *           x-ray, bone, knee, joint.
 *   Kalıp:  By the time we arrived, the bleeding had stopped. ·
 *           The doctor had seen the wound before I spoke. ·
 *           They had already called an ambulance. ·
 *           The tablet is taken twice a day. ·
 *           The medicine was prescribed by a doctor. ·
 *           The package must be kept in the fridge. ·
 *           The doctor said the blood test was normal. ·
 *           She told me not to worry about the scan. ·
 *           They asked whether I had an allergy. ·
 *           The doctor who referred me works upstairs. ·
 *           This is the x-ray that shows the bone. ·
 *           The clinic where the specialist works is new.
 *
 * Ünitenin tek öğretme noktası KİPLİ EDİLGEN: „The package must be kept in
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
    title: "The leaflet in the box",
    genre: "info",
    intro: "Bir ilacın kullanma talimatı. Nasıl alınıyor, nasıl saklanıyor?",
    gloss: [
      { de: "prescribed", tr: "reçete edildi" },
      { de: "the fridge", tr: "buzdolabı" },
      { de: "swallow", tr: "yutmak" },
      { de: "a leaflet", tr: "kullanma talimatı" },
      { de: "whole", tr: "bütün" },
      { de: "seem", tr: "görünmek" },
      { de: "stored", tr: "saklanır" },
      { de: "degrees", tr: "derece" },
      { de: "frozen", tr: "dondurulmuş" },
      { de: "a headache", tr: "baş ağrısı" },
      { de: "dry", tr: "kuru" },
      { de: "rare", tr: "seyrek" },
      { de: "a rash", tr: "kızarıklık" },
      { de: "appears", tr: "çıkar" },
      { de: "the skin", tr: "cilt" },
    ],
    minutes: 7,
    text:
      "PATIENT INFORMATION: AMOXAN 500 MG TABLETS\n" +
      "Read this leaflet before you start taking the medicine. Keep it, because you may need to read it again.\n" +
      "1. How is the medicine taken? The tablet is taken twice a day, in the morning and in the evening, for seven days. Each tablet should be swallowed whole with a glass of water, not with tea or milk.\n" +
      "2. Who is it for? This medicine was prescribed by a doctor for you. It must not be given to other people, even if they seem to have the same illness.\n" +
      "3. How is it stored? The package must be kept in the fridge, between 2 and 8 degrees. The tablets must not be frozen. An open package should be used within fourteen days.\n" +
      "4. Side effects. Side effects are listed by how often they happen. Common: a headache and a dry mouth. Rare: a rash on the skin. If a rash appears, the medicine should be stopped and a doctor should be called.\n" +
      "5. Warning. Do not drive in the first two days.\n" +
      "Children must be kept away from the package.",
    questions: [
      {
        text: "How often is the tablet taken?",
        options: ["twice a day", "once a day", "three times a day"],
        answer: 0,
        explain: "„The tablet is taken twice a day, in the morning and in the evening, for seven days.“",
      },
      {
        text: "Who can take this medicine?",
        options: ["only the patient", "anybody with the same illness", "children"],
        answer: 0,
        explain: "„It must not be given to other people, even if they seem to have the same illness.“",
      },
      {
        kind: "truefalse",
        text: "Side effects are listed by how often they happen.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Side effects are listed by how often they happen.“",
      },
      {
        kind: "gapfill",
        text: "The package must be kept in the ___.",
        options: [],
        answer: 0,
        accept: ["fridge"],
        explain: "„The package must be kept in the fridge, between 2 and 8 degrees.“",
      },
      {
        kind: "order",
        text: "Prospektüsün sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The tablet is taken twice a day.",
          "This medicine was prescribed by a doctor for you.",
          "The package must be kept in the fridge.",
          "Do not drive in the first two days.",
        ],
        explain: "Doz, reçete, saklama, en sonda araç kullanma uyarısı.",
      },
      {
        kind: "short_answer",
        text: "What should you do if a rash appears?",
        options: [],
        answer: 0,
        accept: ["stop the medicine", "call a doctor", "stop it and call a doctor"],
        explain: "„If a rash appears, the medicine should be stopped and a doctor should be called.“",
      },
    ],
  },
  {
    id: "en-b1-u19-r2",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 19,
    title: "The ambulance at the door",
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
      "The doctor had seen the wound before I spoke. Four seconds, from two meters away, while I was still saying the word „kitchen“. Everything I had prepared in the car was answered by looking.\n" +
      "Then the waiting. Two hours, and the triage nurse explained it in one line: the people who go first are the ones who cannot wait, and tonight that was not us.\n" +
      "The injury needed six stitches and the chest pain that had frightened me most turned out to be breath, not heart. I had made it into something else on the way in, which is what a car journey does.\n" +
      "We left at one in the morning with a paper for the unit on Thursday. In the corridor a man was sitting with a bag and had been there since seven.\n" +
      "What I took away was not medical. It was the triage line: two hours of waiting is the sound of a system working, and the hour I would have preferred belonged to somebody else.",
    questions: [
      {
        text: "What had happened before they arrived?",
        options: ["the bleeding had stopped", "the doctor had gone", "the unit had closed"],
        answer: 0,
        explain: "„By the time we arrived, the bleeding had stopped.“",
      },
      {
        text: "What did the chest pain turn out to be?",
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
    title: "A normal blood test",
    genre: "dialogue",
    intro: "Tahlil sonuçları. Hangi cümle aktarılmış?",
    gloss: [
      { de: "normal", tr: "olağan" },
      { de: "not to worry", tr: "endişelenmemem" },
      { de: "whether", tr: "olup olmadığı" },
      { de: "range", tr: "aralık" },
      { de: "sentence", tr: "cümle" },
      { de: "whole", tr: "bütün" },
      { de: "beforehand", tr: "önceden" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Katie", text: "You got the results this morning. And?" },
      { speaker: "Henry", text: "The doctor said the blood test was normal. Everything in the normal range, including the one I was worried about." },
      { speaker: "Katie", text: "And the scan?" },
      { speaker: "Henry", text: "She told me not to worry about the scan. Which is a sentence that makes everybody worry, and she knows it." },
      { speaker: "Katie", text: "Then why say it?" },
      { speaker: "Henry", text: "Because she said the next part too: there is a small thing on it, it has been there for four years, and it has not changed." },
      { speaker: "Katie", text: "That is a different sentence." },
      { speaker: "Henry", text: "It is the whole difference. „Do not worry“ is nothing. „It has not changed in four years“ is information." },
      { speaker: "Katie", text: "Did they ask you anything?" },
      { speaker: "Henry", text: "They asked whether I had an allergy. Twice, in two rooms, from two people, which I now understand is on purpose." },
      { speaker: "Katie", text: "And the infection?" },
      { speaker: "Henry", text: "Gone. Ten days of pills and the sample from Friday came back clear." },
      { speaker: "Katie", text: "So a good morning." },
      { speaker: "Henry", text: "A long morning with a good end. And one thing I will do differently: I will write the questions down beforehand, because I forgot two of the three." },
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
        explain: "„‚Do not worry‘ is nothing. ‚It has not changed in four years‘ is information.“",
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
        text: "The infection needed ___ days of pills.",
        options: [],
        answer: 0,
        accept: ["ten", "10"],
        explain: "„Ten days of pills and the sample from Friday came back clear.“",
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
        text: "What will Henry do differently?",
        options: [],
        answer: 0,
        accept: ["write the questions down", "write questions first", "prepare questions"],
        explain: "„I will write the questions down beforehand, because I forgot two of the three.“",
      },
    ],
  },
  {
    id: "en-b1-u19-l2",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 19,
    title: "The doctor upstairs",
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
      { speaker: "Lucy", text: "So you have the referral. Who sent you?" },
      { speaker: "Tyler", text: "The doctor who referred me works upstairs. Same building, second floor, and I did not know that for two months." },
      { speaker: "Lucy", text: "Two months?" },
      { speaker: "Tyler", text: "I had been going to the clinic where the specialist works, which is new and across the city, for an appointment I could have had here." },
      { speaker: "Lucy", text: "Nobody told you." },
      { speaker: "Tyler", text: "Nobody was asked. That is the honest version." },
      { speaker: "Lucy", text: "And the knee?" },
      { speaker: "Tyler", text: "This is the x-ray that shows the bone. The line you can see is old — from 2018, from soccer." },
      { speaker: "Lucy", text: "And the pain now?" },
      { speaker: "Tyler", text: "Not the bone. The joint above it, which does not show on an x-ray at all, and that is why the first two visits found nothing." },
      { speaker: "Lucy", text: "Will they operate?" },
      { speaker: "Tyler", text: "The surgeon says no, twice, clearly. Six weeks of exercises first and then we look again." },
      { speaker: "Lucy", text: "Are you disappointed?" },
      { speaker: "Tyler", text: "I was for an afternoon. Then I read the paper he gave me: four out of five knees like mine are better after the six weeks. That is a better number than the operation has." },
    ],
    questions: [
      {
        text: "Where does the doctor who referred Tyler work?",
        options: ["upstairs in the same building", "across the city", "in the new clinic"],
        answer: 0,
        explain: "„The doctor who referred me works upstairs. Same building, second floor…“",
      },
      {
        text: "Where is the pain?",
        options: ["in the joint", "in the bone", "in the back"],
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
        text: "How many knees like Tyler's get better?",
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
    title: "The medicine leaflet",
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
        answer: "The package must be kept in the fridge.",
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
    title: "After the tests",
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
