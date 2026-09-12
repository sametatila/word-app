import type { SkillExercise } from "../types";

/**
 * EN · B1 · Ünite 5 — "Faturalar, gürültü, çıkış, mahalle".
 *
 * Dört ders: The bills · The noise problem · Moving out ·
 * The neighbourhood.
 *
 *   Kelime: electricity, gas, heating, usage, reading, waste, save,
 *           provider, neighbour, noise, calm, wall, disturb, apologise,
 *           downstairs, ignore, inspection, damage, refund, empty, final,
 *           key, charge, return, area, shop, safe, local, community, walk,
 *           green, noisy.
 *   Kalıp:  If we used less heating, the bill would be lower. ·
 *           If the bill comes tomorrow, I will pay it. ·
 *           Could we change the provider? ·
 *           Although I asked twice, the noise continued. ·
 *           The walls are thin. However, we can talk about it. ·
 *           Despite the noise, I stayed calm. ·
 *           I had cleaned everything before they arrived. ·
 *           They returned the deposit in full. ·
 *           What had you done before the inspection? ·
 *           I enjoy living in this area. ·
 *           I decided to stay another year. ·
 *           It is worth walking to the park.
 *
 * Ünitenin tek öğretme noktası ÖDÜN VERMENİN ÜÇ SÖZDİZİMİ. Üçü de aynı
 * şeyi söylüyor ama üçü de başka bir yapı istiyor: „although“ bir CÜMLE
 * bağlıyor, „however“ YENİ bir cümle başlatıyor, „despite“ bir İSİM
 * alıyor. Öğrencinin hatası anlamda değil, sözdiziminde çıkıyor —
 * „despite I asked“ ve „although the noise“ aynı sıklıkta görülüyor.
 */
export const enB1U05: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-u5-r1",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 5,
    title: "The noise problem",
    genre: "story",
    intro: "Üst kattaki çamaşır makinesi. Sorun nasıl çözülüyor?",
    gloss: [
      { de: "politely", tr: "kibarca" },
      { de: "method", tr: "yöntem" },
      { de: "on purpose", tr: "bilerek" },
      { de: "above", tr: "üst kattaki" },
      { de: "whole", tr: "bütün" },
      { de: "my own calls", tr: "kendi konuşmalarım" },
    ],
    minutes: 7,
    text:
      "The family above us moved in in March. By May I knew their washing machine better than mine.\n" +
      "Although I asked twice, the noise continued. The first time I went up and said it politely at the door. The second time I wrote a note, which was a mistake — a note is easy to ignore and nobody has to look at you.\n" +
      "The walls are thin. However, we can talk about it. That line came from the woman downstairs, who had lived in the building for nineteen years and had heard four families through the same wall.\n" +
      "Despite the noise, I stayed calm, and that turned out to be the whole method. The man upstairs was not disturbing anybody on purpose. He was working nights and doing the washing at eleven because that was the only hour he had.\n" +
      "We moved the washing to seven in the evening and I moved my own calls to the kitchen, which is on the far side. Nobody apologised and nobody had to.\n" +
      "The thing I learned is small and it is not about noise. A person who is asked at the door answers a person. A person who gets a note answers a piece of paper.",
    questions: [
      {
        text: "Why was the note a mistake?",
        options: ["it is easy to ignore", "it was too long", "it was not polite"],
        answer: 0,
        explain: "„a note is easy to ignore and nobody has to look at you.“",
      },
      {
        text: "Why was the man doing the washing at eleven?",
        options: ["he was working nights", "the machine was new", "he wanted to disturb them"],
        answer: 0,
        explain: "„He was working nights and doing the washing at eleven because that was the only hour he had.“",
      },
      {
        kind: "truefalse",
        text: "The man upstairs apologised.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Nobody apologised and nobody had to.“",
      },
      {
        kind: "gapfill",
        text: "The washing moved to ___ in the evening.",
        options: [],
        answer: 0,
        accept: ["seven", "7"],
        explain: "„We moved the washing to seven in the evening…“",
      },
      {
        kind: "order",
        text: "Olayların sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "I went up and said it at the door.",
          "I wrote a note.",
          "The woman downstairs said we can talk about it.",
          "We moved the washing to seven.",
        ],
        explain: "Kapı, not, komşunun sözü, çözüm.",
      },
      {
        kind: "short_answer",
        text: "How long had the woman downstairs lived there?",
        options: [],
        answer: 0,
        accept: ["nineteen years", "19 years", "nineteen"],
        explain: "„…who had lived in the building for nineteen years…“",
      },
    ],
  },
  {
    id: "en-b1-u5-r2",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 5,
    title: "The bills",
    genre: "dialogue",
    intro: "Yüksek bir fatura. Asıl sorun hangisi?",
    gloss: [
      { de: "estimate", tr: "tahminî" },
      { de: "degree", tr: "derece" },
      { de: "guessed", tr: "tahmin ettiler" },
      { de: "real", tr: "gerçek" },
    ],
    minutes: 7,
    text:
      "Mert: The electricity bill came. Two hundred and forty for three months.\n" +
      "Nil: That is high for two people.\n" +
      "Mert: That is what I said. Then I looked at the reading. The last one was an estimate, not a real reading.\n" +
      "Nil: So they guessed.\n" +
      "Mert: They guessed high. If we send the real reading today, the next bill is lower and the difference comes back.\n" +
      "Nil: And the heating?\n" +
      "Mert: The heating is the other half. If we used less heating, the bill would be lower — but I am not cold in this flat and I am not going to be.\n" +
      "Nil: Nobody said cold. One degree is not cold.\n" +
      "Mert: One degree is about six in a hundred. That is eight euros a month in this flat.\n" +
      "Nil: Then two degrees at night, when nobody is in the room.\n" +
      "Mert: That I can do. Waste is heating an empty room, not being warm in a full one.\n" +
      "Nil: Could we change the provider?\n" +
      "Mert: We could, and we should look, but not this week. First the real reading. A wrong number stays wrong at every provider.",
    questions: [
      {
        text: "What was the problem with the last reading?",
        options: ["it was an estimate", "it was too low", "it came late"],
        answer: 0,
        explain: "„The last one was an estimate, not a real reading.“",
      },
      {
        text: "What does Mert want to do first?",
        options: ["send the real reading", "change the provider", "turn off the heating"],
        answer: 0,
        explain: "„First the real reading. A wrong number stays wrong at every provider.“",
      },
      {
        kind: "truefalse",
        text: "Mert agrees to be cold in the flat.",
        options: ["True", "False"],
        answer: 1,
        explain: "„but I am not cold in this flat and I am not going to be.“",
      },
      {
        kind: "gapfill",
        text: "One degree is about six in a ___.",
        options: [],
        answer: 0,
        accept: ["hundred", "100"],
        explain: "„One degree is about six in a hundred. That is eight euros a month in this flat.“",
      },
      {
        kind: "short_answer",
        text: "What is waste, in Mert's words?",
        options: [],
        answer: 0,
        accept: ["heating an empty room", "an empty room", "heating a room"],
        explain: "„Waste is heating an empty room, not being warm in a full one.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-u5-l1",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 5,
    title: "Moving out",
    genre: "monologue",
    intro: "Çıkış kontrolü. Depozito neden tam geri geliyor?",
    gloss: [
      { de: "oven", tr: "fırın" },
      { de: "a mark", tr: "iz" },
      { de: "pointed at", tr: "işaret etti" },
      { de: "whole", tr: "bütün" },
      { de: "zero", tr: "sıfır" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Ela", text: "The inspection was at ten and I had cleaned everything before they arrived. That line is the whole story." },
      { speaker: "Ela", text: "I had taken photos of every room the day I moved in, two years earlier. Nine photos, in a folder I never opened." },
      { speaker: "Ela", text: "At the inspection the man pointed at a mark on the wall behind the door. I opened the folder on my phone and the mark was there in the first photo." },
      { speaker: "Ela", text: "They returned the deposit in full. Eleven days, into the same account. That is not normal and I know it." },
      { speaker: "Ela", text: "What had you done before the inspection? A friend asked me that and I said: nothing special. Then I counted." },
      { speaker: "Ela", text: "I had cleaned the oven, which takes three hours and which nobody thanks you for. I had returned both keys and written down the date." },
      { speaker: "Ela", text: "And I had left the flat empty. Really empty — not a shelf in the basement, not a box in the corridor." },
      { speaker: "Ela", text: "The final charge was zero. The cost was one evening in September two years earlier, taking nine photos nobody asked for." },
    ],
    questions: [
      {
        text: "What did Ela do on the day she moved in?",
        options: ["took photos of every room", "cleaned the oven", "returned the keys"],
        answer: 0,
        explain: "„I had taken photos of every room the day I moved in, two years earlier.“",
      },
      {
        text: "What was the final charge?",
        options: ["zero", "eleven euros", "the deposit"],
        answer: 0,
        explain: "„The final charge was zero.“",
      },
      {
        kind: "truefalse",
        text: "The mark on the wall was new.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I opened the folder on my phone and the mark was there in the first photo.“",
      },
      {
        kind: "gapfill",
        text: "The deposit came back in ___ days.",
        options: [],
        answer: 0,
        accept: ["eleven", "11"],
        explain: "„Eleven days, into the same account.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["They returned the deposit in full.", "They returned the deposit in full"],
        explain: "„in full“ eksiksiz demek; kalıp olarak öğreniliyor.",
      },
      {
        kind: "short_answer",
        text: "How long does cleaning the oven take?",
        options: [],
        answer: 0,
        accept: ["three hours", "3 hours"],
        explain: "„I had cleaned the oven, which takes three hours…“",
      },
    ],
  },
  {
    id: "en-b1-u5-l2",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 5,
    title: "The neighbourhood",
    genre: "dialogue",
    intro: "Bir yıl daha mı? Karar neye dayanıyor?",
    gloss: [
      { de: "mood", tr: "ruh hâli" },
      { de: "calculation", tr: "hesap" },
      { de: "notice", tr: "fark etmek" },
      { de: "instead of", tr: "yerine" },
      { de: "whole", tr: "bütün" },
      { de: "strange", tr: "tuhaf" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Can", text: "So — one more year here or not?" },
      { speaker: "Sena", text: "I decided to stay another year. I enjoy living in this area and I could not say that in the first six months." },
      { speaker: "Can", text: "What changed?" },
      { speaker: "Sena", text: "Nothing changed. I started using it. The park is eight minutes away and it is worth walking there instead of taking the bus for two stops." },
      { speaker: "Can", text: "The bus takes four minutes." },
      { speaker: "Sena", text: "The bus takes four minutes and the walk takes eight and I arrive in a different mood. That is the whole calculation." },
      { speaker: "Can", text: "And the shops?" },
      { speaker: "Sena", text: "Three local ones and a big one. I use the big one twice a month and the local ones four times a week." },
      { speaker: "Can", text: "Is that good or strange?" },
      { speaker: "Sena", text: "Both. It is also why I feel safe here at eleven at night. There is no camera on that street. There is a man who would notice." },
      { speaker: "Can", text: "That is a community." },
      { speaker: "Sena", text: "That is a community. Nobody calls it that and nobody organises it." },
    ],
    questions: [
      {
        text: "Why does Sena walk to the park?",
        options: ["she arrives in a different mood", "the bus is expensive", "there is no bus"],
        answer: 0,
        explain: "„…and I arrive in a different mood. That is the whole calculation.“",
      },
      {
        text: "Why does Sena feel safe at night?",
        options: ["there is a man who would notice", "there is a camera", "the street is empty"],
        answer: 0,
        explain: "„There is no camera on that street. There is a man who would notice.“",
      },
      {
        kind: "truefalse",
        text: "Something in the area changed.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Nothing changed. I started using it.“",
      },
      {
        kind: "gapfill",
        text: "The park is ___ minutes away on foot.",
        options: [],
        answer: 0,
        accept: ["eight", "8"],
        explain: "„The park is eight minutes away…“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I decided to stay another year.", "I decided to stay another year"],
        explain: "„decide“ sonrası mastar geliyor.",
      },
      {
        kind: "short_answer",
        text: "How often does Sena use the local shops?",
        options: [],
        answer: 0,
        accept: ["four times a week", "4 times a week", "four times"],
        explain: "„I use the big one twice a month and the local ones four times a week.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-u5-w1",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 5,
    title: "Although I asked twice, the noise continued",
    genre: "personal",
    intro: "Üç ödün sözcüğü. Hangisi cümle, hangisi isim, hangisi yeni cümle istiyor?",
    gloss: [
      { de: "Although", tr: "rağmen" },
      { de: "However", tr: "ancak" },
      { de: "Despite", tr: "rağmen" },
      { de: "the real reading", tr: "gerçek okuma" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "İki kez sormama rağmen gürültü sürdü.",
        answer: "Although I asked twice, the noise continued.",
        hint: "„although“ bir CÜMLE bağlıyor; virgül iki yarıyı ayırıyor.",
      },
      {
        kind: "build",
        tr: "Duvarlar ince. Ancak bunu konuşabiliriz.",
        answer: "The walls are thin. However, we can talk about it.",
        hint: "„however“ YENİ bir cümle başlatıyor ve kendi virgülüyle geliyor.",
      },
      {
        kind: "build",
        tr: "Gürültüye rağmen sakin kaldım.",
        answer: "Despite the noise, I stayed calm.",
        hint: "„despite“ bir İSİM istiyor; cümle gelseydi „although“ gerekirdi.",
      },
      {
        kind: "build",
        tr: "Daha az ısıtma kullansaydık fatura daha düşük olurdu.",
        answer: "If we used less heating, the bill would be lower.",
        hint: "Gerçek olmayan koşul: geçmiş biçim burada olmayan bir şimdiyi anlatıyor.",
      },
      {
        kind: "form",
        prompt: "Fatura kartını doldur.",
        facts: "Elektrik iki yüz kırk; üç aylık; son okuma tahminî; gerçek okuma bugün gönderilecek.",
        fields: [
          { label: "Bill", answer: "two hundred and forty", accept: ["240"] },
          { label: "Period", answer: "three months", accept: ["3 months"] },
          { label: "Last reading", answer: "an estimate", accept: ["estimate"] },
          { label: "Action", answer: "send the real reading", accept: ["the real reading"] },
        ],
      },
    ],
  },
  {
    id: "en-b1-u5-w2",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 5,
    title: "I had cleaned everything before they arrived",
    genre: "personal",
    intro: "Çıkış ve mahalle cümleleri. Hangi fiil mastar, hangisi „-ing“ alıyor?",
    gloss: [
      { de: "in full", tr: "eksiksiz" },
      { de: "the inspection", tr: "çıkış kontrolü" },
      { de: "worth walking", tr: "yürümeye değer" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Onlar gelmeden önce her şeyi temizlemiştim.",
        answer: "I had cleaned everything before they arrived.",
        hint: "Önce olan iş „had“ + üçüncü hâl alıyor; sonraki sade geçmişte kalıyor.",
      },
      {
        kind: "build",
        tr: "Depozitoyu eksiksiz geri verdiler.",
        answer: "They returned the deposit in full.",
        hint: "„in full“ kalıp: tamamı demek.",
      },
      {
        kind: "build",
        tr: "Kontrolden önce ne yapmıştın?",
        answer: "What had you done before the inspection?",
        hint: "Soruda „had“ özneden önce geçiyor.",
      },
      {
        kind: "build",
        tr: "Bu bölgede yaşamayı seviyorum.",
        answer: "I enjoy living in this area.",
        hint: "„enjoy“ sonrası „-ing“ istiyor.",
      },
      {
        kind: "build",
        tr: "Parka yürümeye değer.",
        answer: "It is worth walking to the park.",
        hint: "„worth“ da „-ing“ istiyor; „worth to walk“ olmaz.",
      },
    ],
  },
];
