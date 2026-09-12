import type { SkillExercise } from "../types";

/**
 * EN · A2 · Ünite 21 — "Akıllı telefon, sosyal medya, diziler, haberler".
 *
 * Dört ders: Using a smartphone · Social media · Series and films ·
 * Following the news.
 *
 *   Kelime: screen, battery, charge, settings, update, keyboard, speaker,
 *           digital, post, follow, comment, share, account, selfie, blog,
 *           fan, series, episode, watch, boring, recommend, TV show,
 *           actor, audience, news, happen, report, true, believe, article,
 *           magazine, fact.
 *   Kalıp:  First open Settings, then tap Update. ·
 *           Turn it off and turn it on again. ·
 *           Have you updated your phone yet? ·
 *           I usually post photos at the weekend. ·
 *           I don't think social media is good. ·
 *           I have had this account for two years. · Have you seen …? ·
 *           I recommend it. · It's about … · Have you heard the news? ·
 *           It happened yesterday. · I don't believe it's true.
 *
 * Ünitenin tek öğretme noktası OLUMSUZLUĞUN ÖNE ÇEKİLMESİ. İngilizce
 * „I don't think social media is good“ diyor: olumsuz ANA fiile takılıyor,
 * iç cümleye değil. Türkçe tam tersini yapıyor ("bence sosyal medya iyi
 * değil"), o yüzden öğrenci „I think social media isn't good“ demeye
 * yatkın — anlaşılır ama İngilizcede duyulmayan bir sıra. Aynı çekme
 * „believe“ ile de çalışıyor ve ünitenin iki dersi bunu yan yana koyuyor.
 */
export const enA2U21: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a2-u21-r1",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 21,
    title: "Using a smartphone",
    genre: "guide",
    intro: "Üç sık soru, üç kısa cevap. Hangisi hangi sorunu çözüyor?",
    gloss: [
      { de: "app", tr: "uygulama" },
      { de: "inside", tr: "içeride" },
      { de: "how that sounds", tr: "kulağa nasıl geldiği" },
      { de: "slow", tr: "yavaş" },
      { de: "empty", tr: "boş" },
    ],
    minutes: 5,
    text:
      "Three things people ask me every week.\n" +
      "My phone is slow. First open Settings, then tap Update. Usually the phone is not slow — it is old inside. An update takes eight minutes and you get a new keyboard too.\n" +
      "Nothing works. Turn it off and turn it on again. I know how that sounds. It works because the phone forgets everything it did wrong since the morning.\n" +
      "The battery is empty at two in the afternoon. Look at Settings again. There is a list: which app took how much. The first one on that list is usually a map you opened in June.\n" +
      "And one more thing. The speaker gets quiet after two years. Clean it — thirty seconds, and it is loud again.\n" +
      "I don't think phones are hard. I think the menus are.",
    questions: [
      {
        text: "What should you do when the phone is slow?",
        options: ["open Settings and tap Update", "turn it off", "clean the speaker"],
        answer: 0,
        explain: "„First open Settings, then tap Update.“",
      },
      {
        text: "Why does the speaker get quiet?",
        options: ["it is not clean", "the battery is empty", "the app is old"],
        answer: 0,
        explain: "„The speaker gets quiet after two years. Clean it — thirty seconds, and it is loud again.“",
      },
      {
        kind: "truefalse",
        text: "The writer thinks the menus are hard.",
        options: ["True", "False"],
        answer: 0,
        explain: "„I don't think phones are hard. I think the menus are.“",
      },
      {
        kind: "gapfill",
        text: "An update takes ___ minutes.",
        options: [],
        answer: 0,
        accept: ["eight", "8"],
        explain: "„An update takes eight minutes and you get a new keyboard too.“",
      },
      {
        kind: "short_answer",
        text: "What is usually first on the battery list?",
        options: [],
        answer: 0,
        accept: ["a map", "an old map", "a map from June"],
        explain: "„The first one on that list is usually a map you opened in June.“",
      },
    ],
  },
  {
    id: "en-a2-u21-r2",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 21,
    title: "Social media",
    genre: "forum",
    intro: "On üç yaşında bir hesap sorusu. Dört cevap, tek karar.",
    gloss: [
      { de: "for that age", tr: "o yaş için" },
      { de: "either", tr: "de" },
      { de: "awake", tr: "uyanık" },
    ],
    minutes: 6,
    text:
      "Question: My daughter is thirteen and wants an account. What do you say?\n" +
      "Answer 1: I don't think social media is good for that age. But I don't believe you can stop it either. We made the account together and we follow each other. Two years now, no problem.\n" +
      "Answer 2: I have had this account for two years and I post photos at the weekend. That is all. Nobody needs to see my Tuesday.\n" +
      "Answer 3: Read the comments under any post about a school. Then decide. I don't think a child of thirteen should read those.\n" +
      "Answer 4: My rule at home: the phone sleeps in the kitchen. Not because I don't trust her — because I don't trust the thing that keeps her awake.\n" +
      "Question: Thank you. We decided: yes to the account, no to the phone in the bedroom.",
    questions: [
      {
        text: "What did the writer of Answer 1 do?",
        options: ["made the account together", "stopped the account", "read the comments"],
        answer: 0,
        explain: "„We made the account together and we follow each other. Two years now, no problem.“",
      },
      {
        text: "Where does the phone sleep in Answer 4?",
        options: ["in the kitchen", "in the bedroom", "at school"],
        answer: 0,
        explain: "„My rule at home: the phone sleeps in the kitchen.“",
      },
      {
        kind: "truefalse",
        text: "Answer 1 says you can stop it.",
        options: ["True", "False"],
        answer: 1,
        explain: "„But I don't believe you can stop it either.“",
      },
      {
        kind: "gapfill",
        text: "Answer 2 has had the account for ___ years.",
        options: [],
        answer: 0,
        accept: ["two", "2"],
        explain: "„I have had this account for two years…“",
      },
      {
        kind: "order",
        text: "Cevapların sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "We made the account together.",
          "I post photos at the weekend.",
          "Read the comments, then decide.",
          "The phone sleeps in the kitchen.",
        ],
        explain: "Dört cevap sırayla; en sonda evin kuralı geliyor.",
      },
      {
        kind: "short_answer",
        text: "What did the family decide?",
        options: [],
        answer: 0,
        accept: ["yes to the account", "the account yes", "an account"],
        explain: "„We decided: yes to the account, no to the phone in the bedroom.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a2-u21-l1",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 21,
    title: "Series and films",
    genre: "dialogue",
    intro: "Yeni bir dizi. Kaç bölüm izlendi, konusu ne?",
    gloss: [
      { de: "as good as", tr: "kadar iyi" },
      { de: "midnight", tr: "gece yarısı" },
      { de: "Give it four", tr: "dörde kadar sabret" },
      { de: "slow", tr: "yavaş" },
      { de: "the fourth", tr: "dördüncüsü" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Deniz", text: "Have you seen the new series? Everybody at work talks about it." },
      { speaker: "Ela", text: "Three episodes. I don't think it is as good as people say." },
      { speaker: "Deniz", text: "Give it four. The first three are slow, and then something happens in the fourth." },
      { speaker: "Ela", text: "That is what people always say about a boring start." },
      { speaker: "Deniz", text: "True. But this time it is right. What is it about? A family, a house, and forty years." },
      { speaker: "Ela", text: "Forty years in eight episodes?" },
      { speaker: "Deniz", text: "One episode, five years. Every actor plays the same person older." },
      { speaker: "Ela", text: "That I want to see. Who is in it?" },
      { speaker: "Deniz", text: "The woman from the film we watched in June." },
      { speaker: "Ela", text: "Then I watch it tonight. Two episodes, not more." },
      { speaker: "Deniz", text: "Everybody says two. Nobody stops at two." },
      { speaker: "Ela", text: "I don't believe you." },
      { speaker: "Deniz", text: "Write to me at midnight." },
    ],
    questions: [
      {
        text: "How many episodes has Ela seen?",
        options: ["three", "four", "eight"],
        answer: 0,
        explain: "„Three episodes. I don't think it is as good as people say.“",
      },
      {
        text: "What is the series about?",
        options: ["a family, a house and forty years", "an actor", "a film from June"],
        answer: 0,
        explain: "„What is it about? A family, a house, and forty years.“",
      },
      {
        kind: "truefalse",
        text: "Ela does not think the series is as good as people say.",
        options: ["True", "False"],
        answer: 0,
        explain: "„I don't think it is as good as people say.“ — olumsuz „think“e takılıyor.",
      },
      {
        kind: "gapfill",
        text: "One episode covers ___ years.",
        options: [],
        answer: 0,
        accept: ["five", "5"],
        explain: "„One episode, five years. Every actor plays the same person older.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Have you seen the new series?", "Have you seen the new series"],
        explain: "Deneyim sorusu: „see“nin üçüncü hâli „seen“.",
      },
      {
        kind: "short_answer",
        text: "When will Ela watch it?",
        options: [],
        answer: 0,
        accept: ["tonight", "this evening"],
        explain: "„Then I watch it tonight. Two episodes, not more.“",
      },
    ],
  },
  {
    id: "en-a2-u21-l2",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 21,
    title: "Following the news",
    genre: "dialogue",
    intro: "Bir fotoğraf dolaşıyor. Ne kadarı doğru?",
    gloss: [
      { de: "lane", tr: "şerit" },
      { de: "dangerous", tr: "tehlikeli" },
      { de: "newspaper", tr: "gazete" },
      { de: "bridge", tr: "köprü" },
      { de: "inside", tr: "içinde" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Can", text: "Have you heard the news? The bridge is closed." },
      { speaker: "Nil", text: "Which bridge?" },
      { speaker: "Can", text: "The old one. It happened yesterday at four." },
      { speaker: "Nil", text: "Where did you read that?" },
      { speaker: "Can", text: "Somebody sent it to me. A photo and three lines." },
      { speaker: "Nil", text: "I don't believe it's true. Two weeks ago the same photo was here with a city in Italy under it." },
      { speaker: "Can", text: "Then let us look. The newspaper says nothing. The city page says nothing." },
      { speaker: "Nil", text: "There. One article, this morning: the bridge is open, one lane closed for work." },
      { speaker: "Can", text: "So it is half true." },
      { speaker: "Nil", text: "Half true is the most dangerous kind. It has a fact inside, so people believe the rest." },
      { speaker: "Can", text: "And what do I do now? Six people got that photo from me." },
      { speaker: "Nil", text: "Send them the article. Not a long text — one line: it is only one lane." },
      { speaker: "Can", text: "That is more work than sending the photo." },
      { speaker: "Nil", text: "Always. That is why the photo travels faster." },
    ],
    questions: [
      {
        text: "What is really true about the bridge?",
        options: ["one lane is closed", "it is closed", "it is new"],
        answer: 0,
        explain: "„One article, this morning: the bridge is open, one lane closed for work.“",
      },
      {
        text: "Where did the true information come from?",
        options: ["an article this morning", "a photo", "three lines"],
        answer: 0,
        explain: "„There. One article, this morning…“",
      },
      {
        kind: "truefalse",
        text: "The bridge is closed.",
        options: ["True", "False"],
        answer: 1,
        explain: "„…the bridge is open, one lane closed for work.“",
      },
      {
        kind: "gapfill",
        text: "___ people got the photo from Can.",
        options: [],
        answer: 0,
        accept: ["Six", "six", "6"],
        explain: "„Six people got that photo from me.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Have you heard the news?", "Have you heard the news"],
        explain: "„news“ tekil sayılıyor: „the news is“, „the news are“ değil.",
      },
      {
        kind: "short_answer",
        text: "Why is half true dangerous?",
        options: [],
        answer: 0,
        accept: ["it has a fact inside", "there is a fact", "a fact inside"],
        explain: "„It has a fact inside, so people believe the rest.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-u21-w1",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 21,
    title: "I don't think social media is good",
    genre: "personal",
    intro: "Olumsuz nereye takılıyor? İngilizce onu öne çekiyor.",
    gloss: [
      { de: "I don't think", tr: "bence değil" },
      { de: "I don't believe", tr: "inanmıyorum" },
      { de: "the news", tr: "haber" },
      { de: "bridge", tr: "köprü" },
      { de: "lane", tr: "şerit" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Bence sosyal medya iyi değil.",
        answer: "I don't think social media is good.",
        alternatives: ["I do not think social media is good."],
        hint: "İngilizce olumsuzu ÖNE alıyor: „don't think … is“, „think … isn't“ değil.",
      },
      {
        kind: "build",
        tr: "Doğru olduğuna inanmıyorum.",
        answer: "I don't believe it's true.",
        alternatives: ["I do not believe it is true."],
        hint: "Aynı çekme burada da var: olumsuz „believe“e takılıyor, iç cümleye değil.",
      },
      {
        kind: "build",
        tr: "Haberi duydun mu?",
        answer: "Have you heard the news?",
        hint: "Yeni ve şimdi önemli: present perfect. „news“ tekil sayılıyor.",
      },
      {
        kind: "build",
        tr: "Dün oldu.",
        answer: "It happened yesterday.",
        hint: "„yesterday“ zamanı çiviliyor: simple past.",
      },
      {
        kind: "form",
        prompt: "Haber kartını doldur.",
        facts: "Köprüyle ilgili haber; dün saat dörtte; bir şerit kapalı; kaynak sabahki makale.",
        fields: [
          { label: "News", answer: "the bridge", accept: ["about the bridge"] },
          { label: "When", answer: "yesterday at four", accept: ["yesterday"] },
          { label: "True", answer: "one lane closed", accept: ["one lane"] },
          { label: "Source", answer: "an article", accept: ["the article"] },
        ],
      },
    ],
  },
  {
    id: "en-a2-u21-w2",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 21,
    title: "Have you updated your phone yet?",
    genre: "personal",
    intro: "Telefon ve hesap cümleleri. Ayrılabilen fiiller burada nesneyi araya alıyor.",
    gloss: [
      { de: "tap", tr: "dokunmak" },
      { de: "turn it off", tr: "kapatmak" },
      { de: "updated", tr: "güncelledin" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Önce Ayarlar'ı aç, sonra Güncelle'ye dokun.",
        answer: "First open Settings, then tap Update.",
        hint: "İki emir cümlesi; sırayı „first“ ve „then“ kuruyor.",
      },
      {
        kind: "build",
        tr: "Kapat ve tekrar aç.",
        answer: "Turn it off and turn it on again.",
        hint: "„turn off“ ve „turn on“ ayrılabiliyor: nesne araya giriyor.",
      },
      {
        kind: "build",
        tr: "Telefonunu güncelledin mi?",
        answer: "Have you updated your phone yet?",
        hint: "Soruda „yet“ en sonda; iş bitti mi diye soruyor.",
      },
      {
        kind: "build",
        tr: "Bu hesabım iki yıldır var.",
        answer: "I have had this account for two years.",
        alternatives: ["I've had this account for two years."],
        hint: "Hâlâ sürüyor: „for“ ile present perfect. İlk „have“ yardımcı, ikincisi asıl fiil.",
      },
      {
        kind: "build",
        tr: "Onu tavsiye ederim.",
        answer: "I recommend it.",
        hint: "„recommend“ doğrudan nesne alıyor; araya edat girmiyor.",
      },
    ],
  },
];
