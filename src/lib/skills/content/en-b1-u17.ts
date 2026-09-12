import type { SkillExercise } from "../types";

/**
 * EN · B1 · Ünite 17 — "Çevrimiçi yaşam, ikna, çıkarım, kaynak".
 *
 * Dört ders: Online and offline · Talking someone round ·
 * It must be true · Where did you read that?
 *
 *   Kelime: post, follower, like, block, private, profile, scroll, trend,
 *           persuade, effort, chance, deny, mind, worry, attempt,
 *           influence, truth, fact, lie, guess, doubt, impression,
 *           possible, definitely, author, expert, quote, survey, figure,
 *           research, magazine, reader.
 *   Kalıp:  I have not posted anything this week. ·
 *           I deleted my old profile last year. ·
 *           Have you ever blocked anyone? ·
 *           I persuaded him to change the date. ·
 *           They deny changing the rule. ·
 *           Would you mind waiting one more day? ·
 *           He must know the truth. ·
 *           It can't be a lie, because I saw it. ·
 *           She might have a different impression. ·
 *           The author who wrote it is an expert. ·
 *           This is the survey that everyone quotes. ·
 *           The magazine where I read it is old.
 *
 * Ünitenin tek öğretme noktası ÇIKARIM KİPLERİ. „He must know the truth“
 * cümlesinde „must“ zorunluluk DEĞİL, kesinlik: elimizdeki kanıta göre
 * başka türlüsü olamaz. „can't“ de beceriksizlik değil, imkânsızlık ve
 * tam olarak bu „must“ın olumsuzu — „mustn't“ değil. Arada „might“
 * duruyor. Aynı üç sözcük başka bir işte, ve öğrenci kip tablosunu
 * yeniden öğrenmek zorunda.
 */
export const enB1U17: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-u17-r1",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 17,
    title: "Where did you read that?",
    genre: "guide",
    intro: "Bir rakamın izi sürülüyor. Kaynak nerede bitiyor?",
    gloss: [
      { de: "tracing", tr: "izini sürmek" },
      { de: "spent", tr: "harcadım" },
      { de: "exists", tr: "var" },
      { de: "real", tr: "gerçek" },
      { de: "become", tr: "dönüşmüş" },
      { de: "neither", tr: "hiçbiri" },
    ],
    minutes: 7,
    text:
      "Somebody sent me a figure last week: eighty-one in a hundred. I spent forty minutes tracing it and the forty minutes were worth more than the figure.\n" +
      "This is the survey that everyone quotes. It exists, it is real, and it was done in 2019 with four hundred people in one city. None of that is in the posts.\n" +
      "The author who wrote it is an expert — that part is true and it is the part that makes the rest hard. An expert wrote a careful paper; somebody else wrote a headline; a third person wrote a post about the headline.\n" +
      "The magazine where I read it is old. Not wrong, old: the piece is from 2021 and it quotes the survey correctly. The posts from this month quote the post from last month.\n" +
      "That is the shape of it. Three steps from the research and each step lost one condition. By the third step, a figure about four hundred people in one city had become a figure about everybody.\n" +
      "The test I use now takes two minutes: find the year, find the number of people, find who paid. If a post does not let me find all three in two clicks, I do not send it on.\n" +
      "The figure might still be right. I do not know, and neither does anybody who shared it.",
    questions: [
      {
        text: "When was the survey done?",
        options: ["in 2019", "in 2021", "last month"],
        answer: 0,
        explain: "„it was done in 2019 with four hundred people in one city.“",
      },
      {
        text: "What happened by the third step?",
        options: ["the conditions were lost", "the number changed", "the author was wrong"],
        answer: 0,
        explain: "„each step lost one condition. By the third step … had become eighty-one per cent of everybody.“",
      },
      {
        kind: "truefalse",
        text: "The magazine quoted the survey wrongly.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Not wrong, old: the piece is from 2021 and it quotes the survey correctly.“",
      },
      {
        kind: "gapfill",
        text: "The survey had ___ hundred people.",
        options: [],
        answer: 0,
        accept: ["four", "4"],
        explain: "„it was done in 2019 with four hundred people in one city.“",
      },
      {
        kind: "order",
        text: "Rakamın yolu: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "An expert wrote a careful paper.",
          "Somebody wrote a headline.",
          "A third person wrote a post about the headline.",
          "The posts from this month quote last month.",
        ],
        explain: "Araştırma, başlık, ilk paylaşım, paylaşımın paylaşımı.",
      },
      {
        kind: "short_answer",
        text: "What three things does the writer look for?",
        options: [],
        answer: 0,
        accept: ["year, people, who paid", "the year and the number", "three things"],
        explain: "„find the year, find the number of people, find who paid.“",
      },
    ],
  },
  {
    id: "en-b1-u17-r2",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 17,
    title: "It must be true",
    genre: "story",
    intro: "Kayıp bir anahtar ve üç çıkarım. Hangisi kesin?",
    gloss: [
      { de: "the lock", tr: "kilit" },
      { de: "whole", tr: "bütün" },
      { de: "search", tr: "arama" },
      { de: "sentence", tr: "cümle" },
      { de: "explanation", tr: "açıklama" },
      { de: "ability", tr: "beceri" },
      { de: "impossible", tr: "imkânsız" },
      { de: "the middle", tr: "ortası" },
      { de: "certain", tr: "kesin" },
      { de: "modal", tr: "kip" },
      { de: "sounded", tr: "kulağa geliyordu" },
      { de: "certainty", tr: "kesinlik" },
    ],
    minutes: 7,
    text:
      "The key was gone on Tuesday evening and the whole search was three sentences.\n" +
      "He must know the truth. That was the first thought and it was wrong, but look at the word: „must“ here is not an order. Nobody is telling him to know anything. It says: from what I have, there is no other explanation.\n" +
      "It can't be a lie, because I saw it. Here „can't“ is not about ability. It is the opposite of the first sentence — not „mustn't“, which would be a rule. English uses „can't“ for the impossible and „mustn't“ for the forbidden, and the two sit in different parts of the room.\n" +
      "She might have a different impression. That is the middle of the three: possible, not certain, and the honest one.\n" +
      "The key was in the lock, outside, where I had left it at four. Nobody had lied, nobody had taken it, and the person who „must have known“ had been at work since eight.\n" +
      "What the evening taught me is not about keys. My first sentence had a modal in it that sounded like certainty and was doing the work of a guess.\n" +
      "Now I say „might“ first and „must“ last, in that order, and I am wrong less often out loud.",
    questions: [
      {
        text: "What does „must“ mean in the first sentence?",
        options: ["there is no other explanation", "somebody is ordered to know", "it is allowed"],
        answer: 0,
        explain: "„It says: from what I have, there is no other explanation.“",
      },
      {
        text: "What is the opposite of „must“ here?",
        options: ["can't", "mustn't", "might"],
        answer: 0,
        explain: "„It is the opposite of the first sentence — not „mustn't“, which would be a rule.“",
      },
      {
        kind: "truefalse",
        text: "Somebody had taken the key.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The key was in the lock, outside, where I had left it at four.“",
      },
      {
        kind: "gapfill",
        text: "The key had been left there at ___.",
        options: [],
        answer: 0,
        accept: ["four", "4"],
        explain: "„where I had left it at four.“",
      },
      {
        kind: "short_answer",
        text: "In what order does the writer use the modals now?",
        options: [],
        answer: 0,
        accept: ["might first, must last", "might then must", "might first"],
        explain: "„Now I say „might“ first and „must“ last, in that order…“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-u17-l1",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 17,
    title: "Talking someone round",
    genre: "dialogue",
    intro: "Bir tarih değiştiriliyor. İkna nasıl işliyor?",
    gloss: [
      { de: "persuaded", tr: "ikna ettim" },
      { de: "deny", tr: "inkâr etmek" },
      { de: "one more day", tr: "bir gün daha" },
      { de: "whole", tr: "bütün" },
      { de: "became", tr: "oldu" },
      { de: "matter", tr: "önemli olmak" },
      { de: "the reason", tr: "sebep" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Sena", text: "You got the date moved. How?" },
      { speaker: "Can", text: "I persuaded him to change the date. It took eleven minutes and one number." },
      { speaker: "Sena", text: "Which number?" },
      { speaker: "Can", text: "How many people could not come on the old date. Four out of nine. I did not argue; I counted." },
      { speaker: "Sena", text: "And he accepted that?" },
      { speaker: "Can", text: "Not at first. He said the room was booked, which was true and not the reason." },
      { speaker: "Sena", text: "What was the reason?" },
      { speaker: "Can", text: "He had told two people the old date was final. Changing it made him look like somebody who changes things." },
      { speaker: "Sena", text: "So you gave him a way out." },
      { speaker: "Can", text: "I asked: would you mind waiting one more day before we tell anybody? That day was the whole deal." },
      { speaker: "Sena", text: "Because it became his decision." },
      { speaker: "Can", text: "Because it stopped being mine. They deny changing the rule about dates, by the way, and the rule changed in March." },
      { speaker: "Sena", text: "Does that matter now?" },
      { speaker: "Can", text: "No. That is the second thing I learned: win the date, not the argument about the rule." },
    ],
    questions: [
      {
        text: "What did Can use to persuade him?",
        options: ["a number", "a rule", "a longer meeting"],
        answer: 0,
        explain: "„It took eleven minutes and one number. … I did not argue; I counted.“",
      },
      {
        text: "What was the reason for saying no?",
        options: ["he had told two people it was final", "the room was booked", "the rule changed"],
        answer: 0,
        explain: "„He had told two people the old date was final.“",
      },
      {
        kind: "truefalse",
        text: "The room booking was the reason.",
        options: ["True", "False"],
        answer: 1,
        explain: "„He said the room was booked, which was true and not the reason.“",
      },
      {
        kind: "gapfill",
        text: "___ out of nine people could not come.",
        options: [],
        answer: 0,
        accept: ["Four", "four", "4"],
        explain: "„How many people could not come on the old date. Four out of nine.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I persuaded him to change the date.", "I persuaded him to change the date"],
        explain: "„persuade“ kişiyi alıyor ve sonrası mastar.",
      },
      {
        kind: "short_answer",
        text: "What is the second thing Can learned?",
        options: [],
        answer: 0,
        accept: ["win the date", "not the argument", "the date"],
        explain: "„win the date, not the argument about the rule.“",
      },
    ],
  },
  {
    id: "en-b1-u17-l2",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 17,
    title: "Online and offline",
    genre: "monologue",
    intro: "Bir hesabın silinmesi. Ne değişti, ne değişmedi?",
    gloss: [
      { de: "followers", tr: "takipçiler" },
      { de: "the habit", tr: "alışkanlık" },
      { de: "reaching", tr: "uzanmak" },
      { de: "the trend", tr: "gündem" },
      { de: "used to read", tr: "okurdum" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Nil", text: "I have not posted anything this week. Nobody has asked why, and that is the first finding." },
      { speaker: "Nil", text: "I deleted my old profile last year. Eleven hundred followers, four years of posts, gone in one afternoon." },
      { speaker: "Nil", text: "What I expected was quiet. What I got was two months of reaching for a phone that had nothing on it." },
      { speaker: "Nil", text: "The account was not the habit. The habit was the hand and the hand needed something else to do." },
      { speaker: "Nil", text: "Have you ever blocked anyone? I had blocked four people in four years, and three of them I could not name a month later." },
      { speaker: "Nil", text: "The new profile is private and has nineteen followers. Nineteen people see a photo of a lake and that is the correct number." },
      { speaker: "Nil", text: "What I miss is one thing only: three people I never see and used to read every week." },
      { speaker: "Nil", text: "So I wrote to them. Two answered and one of them now sends me a message every month. The trend does not miss me and I do not miss the trend." },
    ],
    questions: [
      {
        text: "What did Nil expect after deleting the profile?",
        options: ["quiet", "more followers", "a new phone"],
        answer: 0,
        explain: "„What I expected was quiet. What I got was two months of reaching for a phone…“",
      },
      {
        text: "What was the habit?",
        options: ["the hand reaching for the phone", "the account", "the followers"],
        answer: 0,
        explain: "„The account was not the habit. The habit was the hand…“",
      },
      {
        kind: "truefalse",
        text: "Nil could name all the blocked people later.",
        options: ["True", "False"],
        answer: 1,
        explain: "„three of them I could not name a month later.“",
      },
      {
        kind: "gapfill",
        text: "The new profile has ___ followers.",
        options: [],
        answer: 0,
        accept: ["nineteen", "19"],
        explain: "„The new profile is private and has nineteen followers.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I have not posted anything this week.", "I have not posted anything this week"],
        explain: "Hafta bitmedi: present perfect. „last week“ olsaydı sade geçmiş olurdu.",
      },
      {
        kind: "short_answer",
        text: "What did Nil miss?",
        options: [],
        answer: 0,
        accept: ["three people", "three people online", "reading three people"],
        explain: "„three people I never see and used to read every week.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-u17-w1",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 17,
    title: "He must know the truth",
    genre: "personal",
    intro: "Üç kip, üç kesinlik derecesi. Burada „must“ zorunluluk değil.",
    gloss: [
      { de: "must know", tr: "biliyor olmalı" },
      { de: "can't be", tr: "olamaz" },
      { de: "might have", tr: "olabilir" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Gerçeği biliyor olmalı.",
        answer: "He must know the truth.",
        hint: "Burada „must“ zorunluluk değil KESİNLİK: başka açıklama yok.",
      },
      {
        kind: "build",
        tr: "Yalan olamaz, çünkü onu gördüm.",
        answer: "It can't be a lie, because I saw it.",
        hint: "Çıkarımın olumsuzu „can't“; „mustn't“ olsaydı yasak olurdu.",
      },
      {
        kind: "build",
        tr: "Onun izlenimi farklı olabilir.",
        answer: "She might have a different impression.",
        hint: "„might“ ortadaki derece: mümkün ama kesin değil.",
      },
      {
        kind: "build",
        tr: "Bu hafta hiçbir şey paylaşmadım.",
        answer: "I have not posted anything this week.",
        alternatives: ["I haven't posted anything this week."],
        hint: "Hafta bitmedi: present perfect.",
      },
      {
        kind: "form",
        prompt: "Kaynak kartını doldur.",
        facts: "Anket 2019'da; dört yüz kişi; tek şehir; dergi yazısı 2021'den.",
        fields: [
          { label: "Survey", answer: "2019" },
          { label: "People", answer: "four hundred", accept: ["400"] },
          { label: "Where", answer: "one city", accept: ["a city"] },
          { label: "Magazine", answer: "2021" },
        ],
      },
    ],
  },
  {
    id: "en-b1-u17-w2",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 17,
    title: "I persuaded him to change the date",
    genre: "personal",
    intro: "İkna ve kaynak cümleleri. Hangi fiil mastar, hangisi „-ing“ alıyor?",
    gloss: [
      { de: "persuade", tr: "ikna etmek" },
      { de: "deny", tr: "inkâr etmek" },
      { de: "Would you mind", tr: "sakıncası var mı" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Onu tarihi değiştirmeye ikna ettim.",
        answer: "I persuaded him to change the date.",
        hint: "„persuade“ kişiyi doğrudan alıyor ve sonrası MASTAR.",
      },
      {
        kind: "build",
        tr: "Kuralı değiştirdiklerini inkâr ediyorlar.",
        answer: "They deny changing the rule.",
        hint: "„deny“ sonrası „-ing“; „deny to change“ olmaz.",
      },
      {
        kind: "build",
        tr: "Bir gün daha beklemenizin sakıncası var mı?",
        answer: "Would you mind waiting one more day?",
        hint: "„mind“ da „-ing“ istiyor; kalıp bir ricadır.",
      },
      {
        kind: "build",
        tr: "Onu yazan yazar bir uzman.",
        answer: "The author who wrote it is an expert.",
        hint: "Özne konumundaki „who“ düşemez.",
      },
      {
        kind: "build",
        tr: "Onu okuduğum dergi eski.",
        answer: "The magazine where I read it is old.",
        hint: "„where“ yer için; burada yer bir yayın.",
      },
    ],
  },
];
