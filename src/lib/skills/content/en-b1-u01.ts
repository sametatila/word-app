import type { SkillExercise } from "../types";

/**
 * EN · B1 · Ünite 1 — "Kariyer, CV, ön yazı, mülakat".
 *
 * B1'in ilk ünitesi. Ölçü A2'den bir basamak yukarıda: okuma metni
 * 150–260 kelime (A2'de 100–180) ve cümleler birden çok zamanı aynı anda
 * taşıyabiliyor.
 *
 * Dört ders: My career so far · Writing a CV · The cover letter ·
 * The job interview.
 *
 *   Kelime: career, experience, industry, apply, position, promote,
 *           achieve, responsibility, degree, qualification, previous,
 *           employer, skill, reference, achievement, training, motivation,
 *           suitable, opportunity, enclose, mention, strength, contribute,
 *           attach, candidate, salary, notice, contract, expect, prepare,
 *           formal, weakness.
 *   Kalıp:  I have worked in this industry for six years. ·
 *           I worked there for two years. ·
 *           How long have you been in this industry? ·
 *           I had finished my degree before I started there. ·
 *           My previous employer gave me a reference. ·
 *           What had you done before that job? ·
 *           I enjoy working with small teams. ·
 *           I decided to apply for this opportunity. ·
 *           I am writing to mention my strengths. ·
 *           You have to give one month's notice. ·
 *           You don't have to wear a suit. ·
 *           You should prepare two questions.
 *
 * Ünitenin tek öğretme noktası PAST PERFECT: iki geçmiş olaydan ÖNCE
 * olanı „had“ + üçüncü hâl taşıyor, sonraki sade geçmişte kalıyor. A2
 * present perfect ile simple past'ı ayırmıştı; B1 üçüncü bir katman
 * ekliyor ve özgeçmiş anlatısı bunun doğal yuvası, çünkü orada her cümle
 * bir başka cümleden önce ya da sonra oluyor.
 */
export const enB1U01: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-u1-r1",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 1,
    title: "Writing a CV",
    genre: "guide",
    intro: "Yirmi saniyede karar veren üç şey. Hangisi neden önemli?",
    gloss: [
      { de: "gap", tr: "boşluk" },
      { de: "cared for", tr: "baktım" },
      { de: "touch", tr: "ilgili olmak" },
      { de: "somewhere", tr: "bir yerde" },
    ],
    minutes: 7,
    text:
      "Three things that decide a CV in twenty seconds.\n" +
      "Order. The reader starts at the top and stops when it gets boring. Put the last job first and the degree after it, not before. Nobody reads a CV from 2009 to today.\n" +
      "Time. Every job needs two dates and no gaps. If there is a gap, write one line: travelled, studied, cared for a parent. A gap with no line is a question; a gap with a line is a fact.\n" +
      "Proof. „Reliable and careful“ says nothing, because everybody writes it. „I had finished my degree before I started there, so I worked and studied for two years“ says the same thing and can be checked.\n" +
      "One more thing about the previous employer. Ask for the reference before you leave, not six months later. People change jobs, and the person who knows your work today may be somewhere else in April.\n" +
      "And the training courses: only the ones that touch this job. A CV is not a list of everything you have done. It is an answer to one question — why this person for this position?\n" +
      "Two pages at most. One is better.",
    questions: [
      {
        text: "What should come first in a CV?",
        options: ["the last job", "the degree", "the training courses"],
        answer: 0,
        explain: "„Put the last job first and the degree after it, not before.“",
      },
      {
        text: "What should you do with a gap?",
        options: ["write one line about it", "leave it out", "move the dates"],
        answer: 0,
        explain: "„A gap with no line is a question; a gap with a line is a fact.“",
      },
      {
        kind: "truefalse",
        text: "You should ask for the reference before you leave.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Ask for the reference before you leave, not six months later.“",
      },
      {
        kind: "gapfill",
        text: "A CV should be ___ pages at most.",
        options: [],
        answer: 0,
        accept: ["two", "2"],
        explain: "„Two pages at most. One is better.“",
      },
      {
        kind: "order",
        text: "Yazının sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Order: the last job first.",
          "Time: two dates and no gaps.",
          "Proof: a line that can be checked.",
          "The reference: ask before you leave.",
        ],
        explain: "Üç başlık sırayla, sonra referans uyarısı.",
      },
      {
        kind: "short_answer",
        text: "Which training courses should be in a CV?",
        options: [],
        answer: 0,
        accept: ["only these ones", "the ones for this job", "the ones that touch it"],
        explain: "„only the ones that touch this job.“",
      },
    ],
  },
  {
    id: "en-b1-u1-r2",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 1,
    title: "The job interview",
    genre: "interview",
    intro: "Bir mülakat baştan sona. Hangi cevap neden işe yarıyor?",
    gloss: [
      { de: "growing", tr: "büyümek" },
      { de: "Fair", tr: "yerinde" },
      { de: "I noticed", tr: "fark ettim" },
      { de: "easily", tr: "kolayca" },
      { de: "a real answer", tr: "gerçek bir cevap" },
    ],
    minutes: 7,
    text:
      "Deniz: Come in. Please sit down. Did you find us easily?\n" +
      "Can: Yes, thank you. The tram stops at the door.\n" +
      "Deniz: Good. Tell me about the last two years.\n" +
      "Can: I worked in a small company until March. Before that I had worked in a bigger one for three years, but I wanted a team where I know every name.\n" +
      "Deniz: And why are you leaving the small one?\n" +
      "Can: I am not leaving because it is bad. The work stopped growing and I did not.\n" +
      "Deniz: Fair. What is your weakness?\n" +
      "Can: I say yes too fast. I had said yes to four projects in one week once, and two of them were late. Now I ask for the deadline before I answer.\n" +
      "Deniz: That is a real answer. Salary?\n" +
      "Can: I read the advert. The number there works for me.\n" +
      "Deniz: You have to give one month's notice, yes?\n" +
      "Can: One month, from the first of the month.\n" +
      "Deniz: Then March. You don't have to wear a suit here, by the way. Nobody does.\n" +
      "Can: I noticed at the door. I wore it for me, not for you.",
    questions: [
      {
        text: "Where did Can work before the small company?",
        options: ["in a bigger company", "in a team of three", "in a shop"],
        answer: 0,
        explain: "„Before that I had worked in a bigger one for three years…“ — önceki geçmiş „had worked“ ile.",
      },
      {
        text: "Why is Can leaving the small company?",
        options: ["the work stopped growing", "the company is bad", "the salary is low"],
        answer: 0,
        explain: "„I am not leaving because it is bad. The work stopped growing and I did not.“",
      },
      {
        kind: "truefalse",
        text: "Can has to wear a suit in the new job.",
        options: ["True", "False"],
        answer: 1,
        explain: "„You don't have to wear a suit here, by the way. Nobody does.“",
      },
      {
        kind: "gapfill",
        text: "Can has to give ___ month's notice.",
        options: [],
        answer: 0,
        accept: ["one", "1"],
        explain: "„You have to give one month's notice, yes? — One month, from the first of the month.“",
      },
      {
        kind: "short_answer",
        text: "What does Can do now before saying yes?",
        options: [],
        answer: 0,
        accept: ["ask for the deadline", "ask about the deadline", "ask the deadline"],
        explain: "„Now I ask for the deadline before I answer.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-u1-l1",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 1,
    title: "My career so far",
    genre: "monologue",
    intro: "Altı yıllık bir yol. Hangi adım hangisinden önce geldi?",
    gloss: [
      { de: "step sideways", tr: "yana adım" },
      { de: "on purpose", tr: "bilerek" },
      { de: "turned out", tr: "sonradan anlaşıldı" },
      { de: "lesson", tr: "ders" },
      { de: "less", tr: "daha az" },
      { de: "title", tr: "unvan" },
      { de: "somewhere", tr: "bir yerde" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Nil", text: "I have worked in this industry for six years. Three companies, two cities, one long lesson." },
      { speaker: "Nil", text: "The first position was in a shop that sold machines. I had studied something else, so everything was new and slow." },
      { speaker: "Nil", text: "I worked there for two years and was promoted once. Then the company closed. Nobody asked me why I left; there was nothing to leave." },
      { speaker: "Nil", text: "The second job I took on purpose: less money, more responsibility. Before I applied, I had asked three people from that team what a bad week looks like." },
      { speaker: "Nil", text: "That question turned out to be the best one I have ever asked in an interview. Two of them said the same thing and I still believe them." },
      { speaker: "Nil", text: "The third move was a step sideways. Same title, same salary, different industry. My family thought I had made a mistake." },
      { speaker: "Nil", text: "Two years later I achieved more there than in the four years before, because everything I had learned somewhere else was new in that room." },
      { speaker: "Nil", text: "How long have you been in this industry? People ask it to hear a number. The number is six. The answer is three." },
    ],
    questions: [
      {
        text: "Why did Nil leave the first job?",
        options: ["the company closed", "the salary was low", "a better offer came"],
        answer: 0,
        explain: "„Then the company closed. Nobody asked me why I left; there was nothing to leave.“",
      },
      {
        text: "What did Nil do before applying for the second job?",
        options: ["asked three people about a bad week", "studied something else", "took a bigger salary"],
        answer: 0,
        explain: "„Before I applied, I had asked three people from that team what a bad week looks like.“",
      },
      {
        kind: "truefalse",
        text: "The third move had the same salary.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Same title, same salary, different industry.“",
      },
      {
        kind: "gapfill",
        text: "Nil has worked in this industry for ___ years.",
        options: [],
        answer: 0,
        accept: ["six", "6"],
        explain: "„I have worked in this industry for six years.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I have worked in this industry for six years.", "I have worked in this industry for six years"],
        explain: "Hâlâ sürüyor: „for“ ile present perfect.",
      },
      {
        kind: "short_answer",
        text: "How many companies has Nil worked for?",
        options: [],
        answer: 0,
        accept: ["three", "3"],
        explain: "„Three companies, two cities, one long lesson.“",
      },
    ],
  },
  {
    id: "en-b1-u1-l2",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 1,
    title: "The cover letter",
    genre: "dialogue",
    intro: "Ön yazı düzeltiliyor. İlk satır neden bu kadar önemli?",
    gloss: [
      { de: "poem", tr: "şiir" },
      { de: "consider", tr: "değerlendirmek" },
      { de: "too direct", tr: "fazla dolaysız" },
      { de: "a system", tr: "sistem" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Sena", text: "Can you read this before I send it?" },
      { speaker: "Mert", text: "Send me the file… here. First line: „I am writing to apply for the position.“" },
      { speaker: "Sena", text: "That is the normal opening." },
      { speaker: "Mert", text: "It is the opening four hundred people write. What did you do that they did not?" },
      { speaker: "Sena", text: "I moved a team from paper to a system in six months." },
      { speaker: "Mert", text: "Then that is your first line. „I moved a team of nine from paper to a system in six months.“ The rest can stay." },
      { speaker: "Sena", text: "Is that not too direct?" },
      { speaker: "Mert", text: "It is a cover letter, not a poem. Second thing: you mention three strengths and you show no proof." },
      { speaker: "Sena", text: "I enclose the reference." },
      { speaker: "Mert", text: "Nobody opens the second file before the first line works. Put one number in every strength." },
      { speaker: "Sena", text: "And the end?" },
      { speaker: "Mert", text: "„I would enjoy contributing to this team.“ Not „I hope you will consider me.“ One of those two lines has a person in it." },
      { speaker: "Sena", text: "Two hours for four lines." },
      { speaker: "Mert", text: "Two hours for the four lines that decide it. The other twenty are already fine." },
    ],
    questions: [
      {
        text: "What is wrong with the first line?",
        options: ["four hundred people write it", "it is too long", "it has no name"],
        answer: 0,
        explain: "„It is the opening four hundred people write. What did you do that they did not?“",
      },
      {
        text: "What should the first line say?",
        options: ["what Sena did", "why Sena wants the job", "which file is attached"],
        answer: 0,
        explain: "„I moved a team of nine from paper to a system in six months.“",
      },
      {
        kind: "truefalse",
        text: "Mert says the reference file is read first.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Nobody opens the second file before the first line works.“",
      },
      {
        kind: "gapfill",
        text: "Put one ___ in every strength.",
        options: [],
        answer: 0,
        accept: ["number"],
        explain: "„Put one number in every strength.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["It is a cover letter, not a poem.", "It is a cover letter, not a poem"],
        explain: "Ön yazının işi süslemek değil, kanıt vermek.",
      },
      {
        kind: "short_answer",
        text: "How many lines decide the letter?",
        options: [],
        answer: 0,
        accept: ["four", "4"],
        explain: "„Two hours for the four lines that decide it.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-u1-w1",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 1,
    title: "I had finished my degree before I started there",
    genre: "formal",
    intro: "İki geçmiş olay. Önce olan „had“ alıyor, sonraki sade kalıyor.",
    gloss: [
      { de: "had finished", tr: "bitirmiştim" },
      { de: "before", tr: "önce" },
      { de: "previous employer", tr: "önceki işveren" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Oraya başlamadan önce diplomamı bitirmiştim.",
        answer: "I had finished my degree before I started there.",
        hint: "İki geçmişten ÖNCE olanı „had“ + üçüncü hâl taşıyor; sonraki sade geçmişte kalıyor.",
      },
      {
        kind: "build",
        tr: "O işten önce ne yapmıştın?",
        answer: "What had you done before that job?",
        hint: "Soruda „had“ özneden önce geçiyor; „done“ üçüncü hâl.",
      },
      {
        kind: "build",
        tr: "Önceki işverenim bana referans verdi.",
        answer: "My previous employer gave me a reference.",
        hint: "Tek bir geçmiş olay: sade geçmiş yetiyor, „had“ gereksiz olurdu.",
      },
      {
        kind: "build",
        tr: "Bu sektörde altı yıldır çalışıyorum.",
        answer: "I have worked in this industry for six years.",
        alternatives: ["I've worked in this industry for six years."],
        hint: "Hâlâ sürüyor: „for“ ile present perfect.",
      },
      {
        kind: "form",
        prompt: "CV kartını doldur.",
        facts: "Altı yıl sektörde; diploma işten önce bitti; önceki işverenden referans var; iki eğitim kursu.",
        fields: [
          { label: "Experience", answer: "six years", accept: ["6 years"] },
          { label: "Degree", answer: "before the job", accept: ["finished before"] },
          { label: "Reference", answer: "the previous employer", accept: ["previous employer"] },
          { label: "Training", answer: "two courses", accept: ["2 courses"] },
        ],
      },
    ],
  },
  {
    id: "en-b1-u1-w2",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 1,
    title: "I am writing to mention my strengths",
    genre: "formal",
    intro: "Ön yazı ve mülakat cümleleri. Hangi fiil mastar, hangisi „-ing“ istiyor?",
    gloss: [
      { de: "enjoy working", tr: "çalışmayı sevmek" },
      { de: "decided to apply", tr: "başvurmaya karar verdim" },
      { de: "one month's notice", tr: "bir ay ihbar" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Küçük ekiplerle çalışmayı seviyorum.",
        answer: "I enjoy working with small teams.",
        hint: "„enjoy“ sonrası „-ing“ istiyor; mastar almaz.",
      },
      {
        kind: "build",
        tr: "Bu fırsata başvurmaya karar verdim.",
        answer: "I decided to apply for this opportunity.",
        hint: "„decide“ sonrası mastar geliyor — „enjoy“un tam tersi.",
      },
      {
        kind: "build",
        tr: "Bir ay ihbar süresi vermen gerekiyor.",
        answer: "You have to give one month's notice.",
        hint: "„one month's“ iyelik eki alıyor: süre de iyelik kurabiliyor.",
      },
      {
        kind: "build",
        tr: "Takım elbise giymen gerekmiyor.",
        answer: "You don't have to wear a suit.",
        alternatives: ["You do not have to wear a suit."],
        hint: "Yasak değil, gerek yok. „mustn't“ olsaydı yasak olurdu.",
      },
      {
        kind: "build",
        tr: "İki soru hazırlamalısın.",
        answer: "You should prepare two questions.",
        hint: "Öğüt „should“ ile; zorunluluk değil tavsiye.",
      },
    ],
  },
];
