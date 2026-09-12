import type { SkillExercise } from "../types";

/**
 * EN · B1 · Ünite 16 — "Görüş bildirme, katılma, tartışma, habere tepki".
 *
 * Dört ders: In my view · Agreeing and disagreeing · The debate ·
 * Reacting to the news.
 *
 *   Kelime: idea, believe, probably, maybe, feel, mean, strong, obvious,
 *           disagree, partly, exactly, wrong, sure, true, opposite,
 *           depend, debate, argument, defend, attack, speaker, audience,
 *           silence, interrupt, news, headline, article, journalist,
 *           publish, media, shocking, spread.
 *   Kalıp:  I believe it works, because I have tried it. ·
 *           It is a strong idea. However, it costs a lot. ·
 *           Although it is obvious, nobody says it. ·
 *           If you mean the price, I agree. ·
 *           If I were sure, I would say yes. ·
 *           It depends on what you mean. ·
 *           She said that the argument had been weak. ·
 *           He told the audience to listen first. ·
 *           They asked if I had prepared an answer. ·
 *           The article was published this morning. ·
 *           The story is being shared everywhere. ·
 *           I find the headline shocking.
 *
 * Ünitenin tek öğretme noktası NESNE + SIFAT KURULUŞU: „I find the
 * headline shocking.“ Arada „to be“ yok, „that“ yok, yan cümle yok —
 * fiil, nesne, sıfat. Aynı kalıp „consider“, „think“ ve „call“ ile de
 * çalışıyor ve görüş bildirmenin en kısa biçimi bu. Öğrenci araya bir şey
 * koymaya yatkın, çünkü Türkçe orada bir yapı istiyor.
 */
export const enB1U16: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-u16-r1",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 16,
    title: "Reacting to the news",
    genre: "opinion",
    intro: "Bir başlık ve iki gün. Neden bu kadar yayıldı?",
    gloss: [
      { de: "shocking", tr: "şaşırtıcı" },
      { de: "the wording", tr: "sözcük seçimi" },
      { de: "in fairness", tr: "hakkını vermek gerekirse" },
      { de: "editor", tr: "editör" },
      { de: "the fourth", tr: "dördüncü" },
      { de: "falls apart", tr: "dağılıyor" },
      { de: "skips", tr: "atlıyor" },
      { de: "reached", tr: "ulaştı" },
      { de: "readers", tr: "okurlar" },
    ],
    minutes: 7,
    text:
      "The article was published this morning and by ten it was on four sites with three different headlines.\n" +
      "I find the headline shocking, and not for the reason the journalist wanted. The facts in the piece are careful; the six words at the top are not. The wording turns a number into a claim.\n" +
      "The story is being shared everywhere. That form says it is happening now and nobody has stopped it — there is no editor between the second and the fourth site, only a button.\n" +
      "I believe the piece is good, because I have read it twice and the second reading is where bad writing falls apart. It did not.\n" +
      "It is a strong idea. However, it costs a lot to check, and checking is the part the headline skips.\n" +
      "Although it is obvious, nobody says it: the same article with a flat headline would have been read by two hundred people. With this one it reached forty thousand before lunch.\n" +
      "In fairness, the journalist did not write the headline. Somebody else did, in a different room, paid for a different thing. That is the part readers never see and the part that decides what they read.",
    questions: [
      {
        text: "What does the writer find shocking?",
        options: ["the headline", "the facts", "the journalist"],
        answer: 0,
        explain: "„I find the headline shocking, and not for the reason the journalist wanted.“",
      },
      {
        text: "Why is the piece good, for the writer?",
        options: ["it works on a second reading", "it is short", "it has a strong headline"],
        answer: 0,
        explain: "„I have read it twice and the second reading is where bad writing falls apart.“",
      },
      {
        kind: "truefalse",
        text: "The journalist wrote the headline.",
        options: ["True", "False"],
        answer: 1,
        explain: "„In fairness, the journalist did not write the headline. Somebody else did…“",
      },
      {
        kind: "gapfill",
        text: "The article reached ___ thousand readers before lunch.",
        options: [],
        answer: 0,
        accept: ["forty", "40"],
        explain: "„With this one it reached forty thousand before lunch.“",
      },
      {
        kind: "order",
        text: "Yazının sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The article was published this morning.",
          "I find the headline shocking.",
          "The story is being shared everywhere.",
          "The journalist did not write the headline.",
        ],
        explain: "Yayım, tepki, yayılma, en sonda sorumluluk.",
      },
      {
        kind: "short_answer",
        text: "What does the headline turn a number into?",
        options: [],
        answer: 0,
        accept: ["a claim", "into a claim"],
        explain: "„The wording turns a number into a claim.“",
      },
    ],
  },
  {
    id: "en-b1-u16-r2",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 16,
    title: "Agreeing and disagreeing",
    genre: "guide",
    intro: "Katılmanın dereceleri. Neden düz „hayır“ az duyuluyor?",
    gloss: [
      { de: "hedge", tr: "yumuşatıcı" },
      { de: "narrow", tr: "daraltmak" },
      { de: "flat", tr: "düz" },
      { de: "the softest", tr: "en yumuşağı" },
      { de: "clothes", tr: "giysi" },
      { de: "sentence", tr: "cümle" },
      { de: "halves", tr: "yarılar" },
      { de: "useless", tr: "işe yaramaz" },
      { de: "on its own", tr: "tek başına" },
      { de: "underneath", tr: "altında" },
      { de: "whole", tr: "bütün" },
    ],
    minutes: 7,
    text:
      "Four ways to disagree in a meeting, from the softest to the one that ends the conversation.\n" +
      "If you mean the price, I agree. This one is not a hedge; it is a question wearing the clothes of an answer. It says: there are two things in your sentence and I agree with one of them. Half the arguments in a meeting are two people agreeing about different halves.\n" +
      "It depends on what you mean. Weaker than it looks. Used once it opens the door; used twice it closes it, because the second time everybody hears: I am not going to say.\n" +
      "I partly agree. Honest and almost useless on its own. It needs the next sentence — which part — and without that sentence it is a way of saying nothing politely.\n" +
      "I think that is exactly wrong. This is the flat one and it has a place. Not often, and not first, and never about a person: about a claim.\n" +
      "The rule underneath all four: narrow before you answer. A meeting is slow because people answer the whole sentence when they only disagree with four words of it.\n" +
      "And the sentence that is worth more than all of them: if I were sure, I would say yes. Nobody says that and everybody should.",
    questions: [
      {
        text: "What does „If you mean the price, I agree“ really do?",
        options: ["it asks a question", "it ends the talk", "it says nothing"],
        answer: 0,
        explain: "„it is a question wearing the clothes of an answer.“",
      },
      {
        text: "What is wrong with using „it depends“ twice?",
        options: ["everybody hears that you will not say", "it is too short", "it is too long"],
        answer: 0,
        explain: "„used twice it closes it, because the second time everybody hears: I am not going to say.“",
      },
      {
        kind: "truefalse",
        text: "„I partly agree“ works on its own.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Honest and almost useless on its own. It needs the next sentence — which part…“",
      },
      {
        kind: "gapfill",
        text: "The rule underneath all four is: ___ before you answer.",
        options: [],
        answer: 0,
        accept: ["narrow"],
        explain: "„The rule underneath all four: narrow before you answer.“",
      },
      {
        kind: "short_answer",
        text: "Which sentence does nobody say?",
        options: [],
        answer: 0,
        accept: ["if I were sure", "if I were sure I would say yes", "the last one"],
        explain: "„if I were sure, I would say yes. Nobody says that and everybody should.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-u16-l1",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 16,
    title: "The debate",
    genre: "meeting",
    intro: "Tartışma sonrası değerlendirme. Kim ne söyledi?",
    gloss: [
      { de: "weak", tr: "zayıf" },
      { de: "interrupt", tr: "sözünü kesmek" },
      { de: "none", tr: "hiçbiri" },
      { de: "fair", tr: "yerinde" },
      { de: "interruption", tr: "söz kesme" },
      { de: "anyway", tr: "yine de" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Ela", text: "How was it? I could only stay for the first half." },
      { speaker: "Can", text: "The second half was the interesting one. She said that the argument had been weak." },
      { speaker: "Ela", text: "Which argument?" },
      { speaker: "Can", text: "The one about the cost. Three numbers, none of them from the same year." },
      { speaker: "Ela", text: "Did he defend it?" },
      { speaker: "Can", text: "He tried. Then he told the audience to listen first and answer at the end, which was fair and did not work." },
      { speaker: "Ela", text: "Why not?" },
      { speaker: "Can", text: "Because two people had already started. Once a debate has an interruption, it has twenty." },
      { speaker: "Ela", text: "And the silence after?" },
      { speaker: "Can", text: "Eight seconds. The longest eight seconds I have sat through, and the most useful part of the evening." },
      { speaker: "Ela", text: "Did anybody ask you anything?" },
      { speaker: "Can", text: "They asked if I had prepared an answer. I had not, and I said so, and that was the right call." },
      { speaker: "Ela", text: "Was it?" },
      { speaker: "Can", text: "The speaker before me had prepared one for a question nobody asked. He gave it anyway. Everybody noticed." },
    ],
    questions: [
      {
        text: "What did she say about the argument?",
        options: ["that it had been weak", "that it was new", "that it was long"],
        answer: 0,
        explain: "„She said that the argument had been weak.“",
      },
      {
        text: "What did he tell the audience?",
        options: ["to listen first", "to leave", "to write questions"],
        answer: 0,
        explain: "„he told the audience to listen first and answer at the end…“",
      },
      {
        kind: "truefalse",
        text: "Can had prepared an answer.",
        options: ["True", "False"],
        answer: 1,
        explain: "„They asked if I had prepared an answer. I had not, and I said so…“",
      },
      {
        kind: "gapfill",
        text: "The silence lasted ___ seconds.",
        options: [],
        answer: 0,
        accept: ["eight", "8"],
        explain: "„Eight seconds. The longest eight seconds I have sat through…“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["She said that the argument had been weak.", "She said that the argument had been weak"],
        explain: "Aktarılınca „was“ bir basamak geriye kayıp „had been“ oluyor.",
      },
      {
        kind: "short_answer",
        text: "What did the speaker before Can do?",
        options: [],
        answer: 0,
        accept: ["gave a prepared answer", "answered anyway", "used a prepared answer"],
        explain: "„He gave it anyway. Everybody noticed.“",
      },
    ],
  },
  {
    id: "en-b1-u16-l2",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 16,
    title: "In my view",
    genre: "dialogue",
    intro: "Bir fikir savunuluyor. Gerekçe nerede duruyor?",
    gloss: [
      { de: "obvious", tr: "apaçık" },
      { de: "the catch", tr: "işin püf noktası" },
      { de: "I mean", tr: "demek istediğim" },
      { de: "system", tr: "sistem" },
      { de: "matters", tr: "önemli" },
      { de: "themselves", tr: "kendileri" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Nil", text: "You tried the new system for a month. Verdict?" },
      { speaker: "Mert", text: "I believe it works, because I have tried it. That second half is the only part that matters." },
      { speaker: "Nil", text: "Plenty of people believe things they have not tried." },
      { speaker: "Mert", text: "That is my point. I am not saying it is good. I am saying I have four weeks of evidence and they are not." },
      { speaker: "Nil", text: "What is the catch?" },
      { speaker: "Mert", text: "It is a strong idea. However, it costs a lot in the first month, and most teams stop in week two." },
      { speaker: "Nil", text: "So it works for people who finish." },
      { speaker: "Mert", text: "Which is a smaller claim than the one on the website, yes." },
      { speaker: "Nil", text: "Would you recommend it?" },
      { speaker: "Mert", text: "To somebody who has four weeks, yes. To somebody who has one, no, and that is most people." },
      { speaker: "Nil", text: "That is not what the website says." },
      { speaker: "Mert", text: "Although it is obvious, nobody says it. A tool that needs a month is not a tool for a bad month." },
      { speaker: "Nil", text: "Fair. And after four weeks?" },
      { speaker: "Mert", text: "Probably I keep it. I mean: I have not decided, and anybody who has decided after four weeks is telling you about themselves, not the tool." },
    ],
    questions: [
      {
        text: "Why does Mert believe it works?",
        options: ["he has tried it for four weeks", "the website says so", "the idea is strong"],
        answer: 0,
        explain: "„I believe it works, because I have tried it.“",
      },
      {
        text: "What is the problem with the system?",
        options: ["it costs a lot in the first month", "it is hard to buy", "it is slow"],
        answer: 0,
        explain: "„However, it costs a lot in the first month, and most teams stop in week two.“",
      },
      {
        kind: "truefalse",
        text: "Mert has decided to keep it.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I mean: I have not decided…“",
      },
      {
        kind: "gapfill",
        text: "Most teams stop in week ___.",
        options: [],
        answer: 0,
        accept: ["two", "2"],
        explain: "„most teams stop in week two.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I believe it works, because I have tried it.", "I believe it works, because I have tried it"],
        explain: "„because“ gerekçeyi bağlıyor ve cümlenin ikinci yarısında duruyor.",
      },
      {
        kind: "short_answer",
        text: "Who would Mert not recommend it to?",
        options: [],
        answer: 0,
        accept: ["somebody with one week", "people with one week", "most people"],
        explain: "„To somebody who has one, no, and that is most people.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-u16-w1",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 16,
    title: "I find the headline shocking",
    genre: "opinion",
    intro: "Fiil, nesne, sıfat. Arada hiçbir şey yok.",
    gloss: [
      { de: "I find", tr: "buluyorum" },
      { de: "the headline", tr: "başlık" },
      { de: "published", tr: "yayımlandı" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Başlığı şaşırtıcı buluyorum.",
        answer: "I find the headline shocking.",
        hint: "Fiil, nesne, sıfat: arada „to be“ de „that“ de yok.",
      },
      {
        kind: "build",
        tr: "Makale bu sabah yayımlandı.",
        answer: "The article was published this morning.",
        hint: "Bitmiş bir olay: yalın edilgen geçmiş.",
      },
      {
        kind: "build",
        tr: "Haber her yerde paylaşılıyor.",
        answer: "The story is being shared everywhere.",
        hint: "Şu anda sürüyor: edilgenin sürerli biçimi.",
      },
      {
        kind: "build",
        tr: "İşe yaradığına inanıyorum, çünkü denedim.",
        answer: "I believe it works, because I have tried it.",
        hint: "„because“ gerekçeyi bağlıyor; „have tried“ deneyimi şimdiye taşıyor.",
      },
      {
        kind: "form",
        prompt: "Haber kartını doldur.",
        facts: "Makale bu sabah yayımlandı; dört sitede üç başlık; öğleden önce kırk bin okur; başlığı gazeteci yazmadı.",
        fields: [
          { label: "Published", answer: "this morning", accept: ["today"] },
          { label: "Sites", answer: "four", accept: ["4"] },
          { label: "Readers", answer: "forty thousand", accept: ["40000"] },
          { label: "Headline", answer: "not the journalist", accept: ["somebody else"] },
        ],
      },
    ],
  },
  {
    id: "en-b1-u16-w2",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 16,
    title: "If you mean the price, I agree",
    genre: "opinion",
    intro: "Katılmanın dereceleri. Hangi koşul gerçek, hangisi değil?",
    gloss: [
      { de: "If you mean", tr: "kastettiğin" },
      { de: "depends on", tr: "bağlı" },
      { de: "sure", tr: "emin" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Fiyatı kastediyorsan katılıyorum.",
        answer: "If you mean the price, I agree.",
        hint: "Gerçek koşul: iki yarıda da geniş zaman.",
      },
      {
        kind: "build",
        tr: "Emin olsaydım evet derdim.",
        answer: "If I were sure, I would say yes.",
        hint: "Gerçek olmayan koşulda „I“ yanında bile „were“ geliyor.",
      },
      {
        kind: "build",
        tr: "Ne demek istediğine bağlı.",
        answer: "It depends on what you mean.",
        hint: "„depend“ edatı „on“; edattan sonra bütün bir yan cümle gelebiliyor.",
      },
      {
        kind: "build",
        tr: "Apaçık olmasına rağmen kimse söylemiyor.",
        answer: "Although it is obvious, nobody says it.",
        hint: "„although“ bir cümle bağlıyor; virgül iki yarıyı ayırıyor.",
      },
      {
        kind: "build",
        tr: "Güçlü bir fikir. Ancak çok pahalı.",
        answer: "It is a strong idea. However, it costs a lot.",
        hint: "„however“ yeni bir cümle başlatıyor ve kendi virgülüyle geliyor.",
      },
    ],
  },
];
