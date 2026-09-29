import type { SkillExercise } from "../types";

/**
 * EN · B1 · Ünite 20 — "Hastanede bir gece, tedavi seçimi, ikinci görüş, rapor".
 *
 * Dört ders: A night in the hospital · Choosing a treatment ·
 * A second opinion · The sick note.
 *
 *   Kelime: operate, stay, night, bed, care, visit, rest, recover,
 *           alternative, worse, better, smoke, diet, healthy, exercise,
 *           weight, pulse, pressure, temperature, heart, lung, muscle,
 *           skin, scale, moreover, absence, leave, otherwise, besides,
 *           instead, ill, recovery.
 *   Kalıp:  They will operate tomorrow morning. ·
 *           I am going to stay for one night. ·
 *           My sister is visiting at eight. ·
 *           I decided to try the alternative. ·
 *           He gave up smoking last year. ·
 *           She suggested changing my diet. ·
 *           If the pulse is normal, we will wait. ·
 *           If I were you, I would check the heart again. ·
 *           Unless the temperature falls, call us. ·
 *           I sent the note; moreover, I called the office. ·
 *           Take the leave now; otherwise you lose it. ·
 *           Besides the note, they want a date.
 *
 * Ünitenin tek öğretme noktası DÖRT BAĞLACIN DÖRT AYRI İŞİ. Şimdiye
 * kadarki bağlaç turları hep ÖDÜN üzerineydi („although“, „however“,
 * „despite“, „whereas“); burada başka dört iş var: „moreover“ EKLİYOR,
 * „besides“ KATIYOR, „otherwise“ UYARIYOR (yoksa şu olur), „instead“
 * DEĞİŞTİRİYOR. Dördü de noktalı virgülle ya da virgülle kendi yerinde
 * duruyor ve karıştırıldığında cümle anlaşılır kalıp yanlış şey söylüyor.
 */
export const enB1U20: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-u20-r1",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 20,
    title: "An email from HR",
    genre: "email",
    intro: "İnsan kaynaklarından bir e-posta. Emre'nin rapordan sonra ne yapması gerekiyor?",
    gloss: [
      { de: "the note", tr: "rapor" },
      { de: "absence", tr: "devamsızlık" },
      { de: "backdate", tr: "geriye tarihlemek" },
      { de: "itself", tr: "kendisi" },
      { de: "informed", tr: "haberdar edildi" },
      { de: "unpaid", tr: "ücretsiz" },
      { de: "correct", tr: "düzeltmek" },
      { de: "unfortunately", tr: "maalesef" },
      { de: "mail", tr: "postalamak" },
      { de: "required", tr: "zorunlu" },
      { de: "Human Resources", tr: "insan kaynakları" },
      { de: "ill", tr: "hasta" },
    ],
    minutes: 7,
    text:
      "Subject: Your absence last week\n" +
      "Hi Emre,\n" +
      "Thank you for your message on Monday. I am sorry to hear you were ill, and I hope you are feeling better.\n" +
      "You sent the note from your doctor; moreover, you called the office on the first morning. That was exactly right, and your manager was informed the same day.\n" +
      "Besides the note, we need one more thing: the date you are coming back. Please send it by Friday. Otherwise, the system will count the whole week as unpaid leave, and that is hard to correct later.\n" +
      "You asked about your vacation. You still have six days of leave from last year. Please take the leave before the end of March; otherwise you lose it. Many people forget this every year.\n" +
      "You also asked if you can send the next note by email. Unfortunately not. Instead, please bring the paper note to reception, or mail it to us.\n" +
      "For the note itself: three working days. The practice will not backdate it, so an absence on Monday needs a note by Thursday.\n" +
      "And one last point: the note says you were sick, not what you had. We are not allowed to ask, and you are not required to say.\n" +
      "Best wishes,\n" +
      "Petra, Human Resources",
    questions: [
      {
        text: "What does HR need besides the note?",
        options: ["the date Emre is coming back", "a second note", "a phone call"],
        answer: 0,
        explain: "„Besides the note, we need one more thing: the date you are coming back.“",
      },
      {
        text: "How should Emre send the next note?",
        options: ["bring it to reception or mail it", "by email", "by phone"],
        answer: 0,
        explain: "„Instead, please bring the paper note to reception, or mail it to us.“",
      },
      {
        kind: "truefalse",
        text: "The practice will not backdate the note.",
        options: ["True", "False"],
        answer: 0,
        explain: "„The practice will not backdate it…“",
      },
      {
        kind: "gapfill",
        text: "The note takes ___ working days.",
        options: [],
        answer: 0,
        accept: ["three", "3"],
        explain: "„For the note itself: three working days.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "You sent the note and called the office.",
          "We need the date you are coming back.",
          "Take the leave before the end of March.",
          "Bring the paper note to reception.",
        ],
        explain: "Rapor, dönüş tarihi, izin, en sonda kâğıt rapor.",
      },
      {
        kind: "short_answer",
        text: "What does the note say?",
        options: [],
        answer: 0,
        accept: ["that you were sick", "you were sick", "only that"],
        explain: "„the note says you were sick, not what you had.“",
      },
    ],
  },
  {
    id: "en-b1-u20-r2",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 20,
    title: "Two good answers",
    genre: "story",
    intro: "İki yol, bir karar. Neye göre seçilmiş?",
    gloss: [
      { de: "gave up", tr: "bıraktı" },
      { de: "the alternative", tr: "öteki yol" },
      { de: "in his case", tr: "onun durumunda" },
      { de: "the operation", tr: "ameliyat" },
      { de: "spent", tr: "harcadım" },
      { de: "removed", tr: "çıkarılan" },
      { de: "sentence", tr: "cümle" },
    ],
    minutes: 7,
    text:
      "Two treatments were on the table and both of them worked. That is the part nobody tells you about a choice like this: the hard ones are between two good answers.\n" +
      "I decided to try the alternative. Slower, no operation, and a number I could check: sixty-eight out of a hundred get better within a year. The other way was faster and the number was seventy-one.\n" +
      "Three points between them. I spent a week on those three points and then I chose the slower one, and not because of the number.\n" +
      "She suggested changing my diet at the same visit, and that turned out to matter more than the treatment. Not a diet — two things removed and one added, written on a card in nine words.\n" +
      "My father gave up smoking last year at sixty-three, after forty years, and told me one sentence I use now: the decision is one afternoon, the rest is Tuesdays.\n" +
      "In his case the weight came back and the breathing did not get worse. In my case the exercise was the hard half and the diet was the easy one, which is the opposite of what I expected.\n" +
      "Six months in: better, slowly, and I still do not know whether the other way would have been faster. That is the honest end and I have stopped looking for a different one.",
    questions: [
      {
        text: "Why was the choice hard?",
        options: ["both treatments worked", "both were expensive", "nobody explained them"],
        answer: 0,
        explain: "„the hard ones are between two good answers.“",
      },
      {
        text: "What mattered more than the treatment?",
        options: ["the change in diet", "the operation", "the number"],
        answer: 0,
        explain: "„She suggested changing my diet at the same visit, and that turned out to matter more…“",
      },
      {
        kind: "truefalse",
        text: "The writer chose the faster treatment.",
        options: ["True", "False"],
        answer: 1,
        explain: "„then I chose the slower one, and not because of the number.“",
      },
      {
        kind: "gapfill",
        text: "The father gave up smoking at ___.",
        options: [],
        answer: 0,
        accept: ["sixty-three", "63"],
        explain: "„My father gave up smoking last year at sixty-three, after forty years…“",
      },
      {
        kind: "short_answer",
        text: "What is the father's sentence?",
        options: [],
        answer: 0,
        accept: ["the rest is Tuesdays", "one afternoon then Tuesdays", "the decision is one afternoon"],
        explain: "„the decision is one afternoon, the rest is Tuesdays.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-u20-l1",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 20,
    title: "The pulse and the heart",
    genre: "dialogue",
    intro: "İkinci bir görüş isteniyor. Hangi koşul gerçek?",
    gloss: [
      { de: "the pulse", tr: "nabız" },
      { de: "blood pressure", tr: "tansiyon" },
      { de: "If I were you", tr: "yerinde olsam" },
      { de: "the sheet", tr: "form" },
      { de: "measurement", tr: "ölçüm" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Sena", text: "You saw the numbers. What would you do?" },
      { speaker: "Can", text: "If the pulse is normal tomorrow, we will wait. That is not my opinion, that is what the sheet says." },
      { speaker: "Sena", text: "And your opinion?" },
      { speaker: "Can", text: "If I were you, I would check the heart again. Not because I think something is wrong — because one measurement is not a measurement." },
      { speaker: "Sena", text: "The doctor was not worried." },
      { speaker: "Can", text: "Nor am I. A second opinion is not a second doctor; it is a second day." },
      { speaker: "Sena", text: "And the temperature?" },
      { speaker: "Can", text: "Unless the temperature falls by tomorrow evening, call them. That one is written on the paper and it has a number on it." },
      { speaker: "Sena", text: "Everybody keeps saying tomorrow." },
      { speaker: "Can", text: "Because today told you very little. Blood pressure at eight in the evening after a day like yours is not information." },
      { speaker: "Sena", text: "What if it is the same tomorrow?" },
      { speaker: "Can", text: "Then it is the same and that is useful too. Two readings the same is a fact; one reading is a number." },
      { speaker: "Sena", text: "And if it is higher?" },
      { speaker: "Can", text: "Then you go in the morning and you do not wait for the afternoon appointment. That is the only part of this where I would be quick." },
    ],
    questions: [
      {
        text: "What does the sheet say?",
        options: ["if the pulse is normal, wait", "go tomorrow morning", "call tonight"],
        answer: 0,
        explain: "„If the pulse is normal tomorrow, we will wait. That is not my opinion, that is what the sheet says.“",
      },
      {
        text: "Why does Can want a second reading?",
        options: ["one measurement is not a measurement", "the doctor was wrong", "the paper says so"],
        answer: 0,
        explain: "„because one measurement is not a measurement.“",
      },
      {
        kind: "truefalse",
        text: "Can does not think something is wrong with the heart.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Not because I think something is wrong…“",
      },
      {
        kind: "gapfill",
        text: "Call them unless the ___ falls by tomorrow evening.",
        options: [],
        answer: 0,
        accept: ["temperature"],
        explain: "„Unless the temperature falls by tomorrow evening, call them.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["If I were you, I would check the heart again.", "If I were you, I would check the heart again"],
        explain: "Öğüt kalıbı: gerçek olmayan koşulda „were“ geliyor.",
      },
      {
        kind: "short_answer",
        text: "What should Sena do if it is higher?",
        options: [],
        answer: 0,
        accept: ["go in the morning", "go early", "not wait"],
        explain: "„Then you go in the morning and you do not wait for the afternoon appointment.“",
      },
    ],
  },
  {
    id: "en-b1-u20-l2",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 20,
    title: "The first on the list",
    genre: "monologue",
    intro: "Bir gecelik yatış. Hangi cümle plan, hangisi ayarlanmış?",
    gloss: [
      { de: "operate", tr: "ameliyat etmek" },
      { de: "the unit", tr: "hastane servisi" },
      { de: "apparently", tr: "anlaşılan" },
      { de: "a bit further", tr: "biraz daha uzağa" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Ela", text: "They will operate tomorrow morning. Eight o'clock, and I am the first on the list, which everybody tells me is the good slot." },
      { speaker: "Ela", text: "I am going to stay for one night. That was my decision three weeks ago and the unit agreed with it today." },
      { speaker: "Ela", text: "My sister is visiting at eight this evening. Arranged, in the calendar, and she will bring the one thing the list does not mention: a phone charger with a long cable." },
      { speaker: "Ela", text: "The bed by the window was free and I took it. Six hours later I understand why it was free: the door and the window are the two noisy places." },
      { speaker: "Ela", text: "The care here is calm in a way I did not expect. Nobody hurries and nobody is late, and those two things are apparently possible together." },
      { speaker: "Ela", text: "What I brought and did not need: three books. What I needed and did not bring: a pen." },
      { speaker: "Ela", text: "Recovery is four weeks, of which the first is rest and the other three are walking a bit further every day." },
      { speaker: "Ela", text: "The nurse said one thing I will keep: people who recover fastest are not the strongest; they are the ones who ask when something hurts." },
    ],
    questions: [
      {
        text: "When will they operate?",
        options: ["tomorrow at eight", "this evening", "in four weeks"],
        answer: 0,
        explain: "„They will operate tomorrow morning. Eight o'clock, and I am the first on the list…“",
      },
      {
        text: "What will the sister bring?",
        options: ["a charger with a long cable", "three books", "a pen"],
        answer: 0,
        explain: "„she will bring the one thing the list does not mention: a phone charger with a long cable.“",
      },
      {
        kind: "truefalse",
        text: "The bed by the window is the quiet one.",
        options: ["True", "False"],
        answer: 1,
        explain: "„the door and the window are the two noisy places.“",
      },
      {
        kind: "gapfill",
        text: "Recovery takes ___ weeks.",
        options: [],
        answer: 0,
        accept: ["four", "4"],
        explain: "„Recovery is four weeks, of which the first is rest…“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I am going to stay for one night.", "I am going to stay for one night"],
        explain: "Önceden kurulmuş karar: „going to“.",
      },
      {
        kind: "short_answer",
        text: "Who recovers fastest, the nurse says?",
        options: [],
        answer: 0,
        accept: ["the ones who ask", "people who ask", "those who ask"],
        explain: "„they are the ones who ask when something hurts.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-u20-w1",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 20,
    title: "Rules for a sick note",
    genre: "info",
    intro: "Dört bağlaç, dört iş. Hangisi ekliyor, hangisi uyarıyor, hangisi değiştiriyor?",
    gloss: [
      { de: "moreover", tr: "üstelik" },
      { de: "otherwise", tr: "yoksa" },
      { de: "Besides", tr: "ayrıca" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Raporu gönderdim; üstelik ofisi de aradım.",
        answer: "I sent the note; moreover, I called the office.",
        hint: "„moreover“ aynı türden ikinci bir şey EKLİYOR ve yazıya ait.",
      },
      {
        kind: "build",
        tr: "İzni şimdi kullan; yoksa onu kaybedersin.",
        answer: "Take the leave now; otherwise you lose it.",
        hint: "„otherwise“ UYARIYOR: yapmazsan şu olur.",
      },
      {
        kind: "build",
        tr: "Rapora ek olarak bir tarih de istiyorlar.",
        answer: "Besides the note, they want a date.",
        hint: "„besides“ elindekinden başlayıp üstüne KATIYOR.",
      },
      {
        kind: "build",
        tr: "E-posta göndermedim; onun yerine kayıt masasına gittim.",
        answer: "I did not send an email; instead I went to reception.",
        hint: "„instead“ DEĞİŞTİRİYOR: eklemiyor, yerine koyuyor.",
      },
      {
        kind: "form",
        prompt: "Rapor kartını doldur.",
        facts: "Rapor üç iş günü; geriye tarihlenmiyor; pazartesi devamsızlığa perşembeye kadar rapor; raporda tanı yazmıyor.",
        fields: [
          { label: "Time", answer: "three working days", accept: ["3 days", "3 working days", "three business days", "3 business days"] },
          { label: "Backdate", answer: "no", accept: ["not possible"] },
          { label: "Monday absence", answer: "by Thursday", accept: ["Thursday"] },
          { label: "The note says", answer: "you were sick", accept: ["only that you were sick"] },
        ],
      },
    ],
  },
  {
    id: "en-b1-u20-w2",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 20,
    title: "Health advice",
    genre: "personal",
    intro: "Öğüt, koşul ve üç gelecek. Hangisi gerçek, hangisi değil?",
    gloss: [
      { de: "If I were you", tr: "yerinde olsam" },
      { de: "gave up", tr: "bıraktı" },
      { de: "suggested", tr: "önerdi" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Nabız normalse bekleyeceğiz.",
        answer: "If the pulse is normal, we will wait.",
        hint: "Gerçek koşul: „if“ yanında geniş zaman, öteki yanda „will“.",
      },
      {
        kind: "build",
        tr: "Yerinde olsam kalbi bir daha kontrol ettirirdim.",
        answer: "If I were you, I would check the heart again.",
        hint: "Öğüdün kalıbı; gerçek olmayan koşulda „were“ geliyor.",
      },
      {
        kind: "build",
        tr: "Ateş düşmezse bizi arayın.",
        answer: "Unless the temperature falls, call us.",
        hint: "„unless“ „eğer … değilse“ demek; sonrası geniş zaman.",
      },
      {
        kind: "build",
        tr: "Geçen yıl sigarayı bıraktı.",
        answer: "He gave up smoking last year.",
        hint: "„give up“ sonrası „-ing“ istiyor; „give up to smoke“ olmaz.",
      },
      {
        kind: "build",
        tr: "Beslenme düzenimi değiştirmemi önerdi.",
        answer: "She suggested changing my diet.",
        hint: "„suggest“ de „-ing“ alıyor; „suggest me to change“ diye bir kuruluş yok.",
      },
    ],
  },
];
