import type { SkillExercise } from "../../types";

/**
 * EN · B1 — Beceriler kütüphanesi, parti 15.
 *
 * Hücreyi YİRMİYE tamamlayan partilerden biri (11–20). Kurallar ve emsal:
 * `en-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 15 aile ve büyümek hattı: bir anneyle on beş yaşındaki oğlunun
 * pazarlığı, yaz kampının veli bilgilendirmesi, on sekiz yaşına giren
 * yeğene yazılan mektup. Dil
 * bilgisi çift nesneli fiiller — give someone something / give something to
 * someone.
 */
export const enB1P15: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-lib-r15",
    course: "en",
    level: "B1",
    skill: "reading",
    title: "One Question, Two Answers",
    genre: "article",
    intro: "Bir anneyle on beş yaşındaki oğluna aynı soru soruluyor: ebeveynler bir gence neye izin vermeli, neye vermemeli?",
    gloss: [
      { de: "teenagers", tr: "ergenler" },
      { de: "to allow", tr: "izin vermek" },
      { de: "to refuse", tr: "reddetmek" },
      { de: "on his own", tr: "tek başına" },
      { de: "deal", tr: "anlaşma" },
      { de: "location", tr: "konum" },
      { de: "to trust", tr: "güvenmek" },
      { de: "washing", tr: "çamaşır" },
    ],
    minutes: 6,
    text:
      "We asked a mother and her fifteen-year-old son the same question: what should parents of " +
      "teenagers allow, and what should they refuse?\n\n" +
      "HANNAH, 44: When Leo turned fifteen, he wanted us to let him go to concerts in the city " +
      "on his own. My first answer was no. My husband made me think again. He asked me to remember " +
      "what I was doing at fifteen, and the honest answer was: worse things than concerts. So we " +
      "made a deal. We let him go if he sends a message when he arrives and when he leaves. We " +
      "don't make him share his location all evening. That felt like too much. The first night " +
      "he forgot the second message, and I was standing at the window at midnight. He hasn't " +
      "forgotten since.\n\n" +
      "LEO, 15: The deal is fair, mostly. What I don't like is when Mom tells me to put on a coat " +
      "in front of my friends. I'd like her to trust me with small things first, like when I eat " +
      "or when I go to bed, because those are easier to get right. My parents also make me do " +
      "my own washing now. I didn't want that, but I understand it.\n\n" +
      "HANNAH: He's right about the coat. I've stopped doing that. The washing stays.",
    questions: [
      {
        text: "What did Leo want his parents to let him do?",
        options: ["go to concerts on his own", "stay up all night", "get a part-time job"],
        answer: 0,
        explain: "„he wanted us to let him go to concerts in the city on his own“.",
      },
      {
        text: "Why did Hannah change her mind?",
        options: [
          "Leo promised to be home by ten.",
          "A friend's mother said yes.",
          "Her husband asked her to remember being fifteen.",
        ],
        answer: 2,
        explain: "Eşi on beş yaşında ne yaptığını hatırlamasını istemiş; cevap konserlerden kötüymüş.",
      },
      {
        kind: "truefalse",
        text: "Leo has to share his location all evening.",
        options: ["True", "False"],
        answer: 1,
        explain: "„We don't make him share his location all evening.“",
      },
      {
        kind: "gapfill",
        text: "Leo must send a ___ when he arrives and when he leaves.",
        options: [],
        answer: 0,
        accept: ["message"],
        explain: "„if he sends a message when he arrives and when he leaves“.",
      },
      {
        kind: "short_answer",
        text: "What do Leo's parents make him do now?",
        options: [],
        answer: 0,
        accept: ["his own washing", "do his own washing", "the washing", "do the washing", "his washing"],
        explain: "„My parents also make me do my own washing now.“",
      },
      {
        text: "What has Hannah stopped doing?",
        options: [
          "asking him to send two messages",
          "telling him to put on a coat",
          "washing all of his clothes for him",
        ],
        answer: 1,
        explain: "„He's right about the coat. I've stopped doing that.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-lib-l15",
    course: "en",
    level: "B1",
    skill: "listening",
    title: "A Week at Lakeside Camp",
    genre: "info",
    intro: "Yaz kampının sorumlusu velilere haftayı anlatıyor: telefonlar, göl, yeni etkinlikler ve ilk gece.",
    gloss: [
      { de: "lake", tr: "göl" },
      { de: "instructor", tr: "eğitmen" },
      { de: "climbing", tr: "tırmanma" },
      { de: "sailing", tr: "yelken" },
      { de: "homesick", tr: "evini özlemiş" },
      { de: "flashlight", tr: "el feneri" },
      { de: "urgent", tr: "acil" },
      { de: "pack", tr: "yanına koymak" },
      { de: "camp", tr: "kamp" },
      { de: "activity", tr: "etkinlik" },
    ],
    minutes: 6,
    segments: [
      { text: "Good evening, and thank you for coming. I'm going to explain how the week at Lakeside Camp works, and then you can ask questions." },
      { text: "First, phones. We ask children to hand them in on the first evening. They get them back for thirty minutes after dinner, so they can call home if they want to." },
      { text: "We don't make anyone swim in the lake. Every child does a swimming test on Monday, and only the ones who pass are allowed in, always with two instructors." },
      { text: "We do want them to try one activity they have never done before. For most it's climbing or sailing. Nobody has to like it, but everybody tries once." },
      { text: "At night we let the older groups stay up until ten. The younger ones are in bed by nine, and yes, they complain about that every single year." },
      { text: "If your child gets homesick, please don't ask us to send them home on the first night. It nearly always passes by Tuesday." },
      { text: "Please pack old clothes, a flashlight and a water bottle with their name on it. We'd rather you didn't send candy, because the ants find them before the children do." },
      { text: "We'll send you a short message every evening, so there's no need to call the office unless it's urgent." },
    ],
    questions: [
      {
        text: "When do children get their phones back?",
        options: ["only on the last day, Friday", "every morning before breakfast", "for thirty minutes after dinner"],
        answer: 2,
        explain: "„They get them back for thirty minutes after dinner“.",
      },
      {
        text: "Who is allowed to swim in the lake?",
        options: ["everybody who wants to", "children who pass the test", "only the older groups"],
        answer: 1,
        explain: "Pazartesi yüzme sınavı var; yalnız geçenler göle giriyor, hep iki eğitmenle.",
      },
      {
        kind: "truefalse",
        text: "Every child has to try one new activity.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Nobody has to like it, but everybody tries once.“",
      },
      {
        kind: "gapfill",
        text: "The younger children are in bed by ___.",
        options: [],
        answer: 0,
        accept: ["nine", "9"],
        explain: "„The younger ones are in bed by nine“.",
      },
      {
        kind: "short_answer",
        text: "Why shouldn't parents send candy?",
        options: [],
        answer: 0,
        accept: ["the ants find them", "because of the ants", "ants", "because the ants find them", "the ants"],
        explain: "„the ants find them before the children do“.",
      },
      {
        text: "What does the camp ask parents not to do on the first night?",
        options: [
          "ask them to send a homesick child home",
          "call the office after nine",
          "send extra clothes",
        ],
        answer: 0,
        explain: "Özlem genellikle salıya kadar geçiyor; ilk gece eve gönderme istenmiyor.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-lib-w15",
    course: "en",
    level: "B1",
    skill: "writing",
    title: "A Letter for Your Eighteenth",
    genre: "letter",
    intro: "Yeğenin on sekiz yaşına giriyor ve aile ona mektuplardan bir defter hazırlıyor: önce iki cümle kur, sonra sıcak ve kişisel bir mektup yaz.",
    gloss: [
      { de: "stubborn", tr: "inatçı" },
      { de: "advice", tr: "tavsiye" },
      { de: "proud", tr: "gururlu" },
      { de: "to lend", tr: "ödünç vermek" },
      { de: "to remember", tr: "hatırlamak" },
      { de: "adventure", tr: "macera" },
      { de: "silly", tr: "gülünç" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Bugün sana tek bir tavsiye vermek istiyorum.",
        answer: "I'd like to give you one piece of advice today.",
        alternatives: ["Today I'd like to give you one piece of advice."],
        hint: "give + kişi + şey: önce you, sonra advice; advice sayılamaz, „one piece of advice“ denir.",
      },
      {
        kind: "build",
        tr: "Büyükannen bu saati bana vermişti, şimdi ben onu sana veriyorum.",
        answer: "Your grandmother gave me this watch, and now I'm giving it to you.",
        alternatives: ["Your grandmother gave me this watch and now I'm giving it to you."],
        hint: "Şey bir zamir (it) olunca kişi sona gider ve önüne „to“ gelir: giving it to you.",
      },
      {
        kind: "free",
        prompt:
          "Yeğenin Elif on sekiz yaşına giriyor ve aile, doğum gününde ona vermek için mektuplardan bir defter hazırlıyor. Ona bir mektup yaz: birlikte yaşadığınız bir çocukluk anısını anlat, ondan öğrendiğin bir şeyi söyle, ona bir tavsiye ver ve mektubu bir dilek ya da küçük bir hediyeyle bitir.",
        checklist: [
          "Birlikte yaşadığınız somut bir anıyı anlat",
          "Ondan öğrendiğin bir şeyi söyle",
          "Ona bir tavsiye ver ve nedenini açıkla",
          "Bir dilekle ya da küçük bir hediyeyle bitir",
        ],
        minWords: 100,
        phrases: [
          { de: "I still remember the day you …", tr: "…-diğin günü hâlâ hatırlıyorum", en: "" },
          { de: "You taught me that …", tr: "Bana … olduğunu öğrettin", en: "" },
          { de: "If I could give you one piece of advice, …", tr: "Sana tek bir tavsiye verebilseydim …", en: "" },
          { de: "I'm so proud of you, because …", tr: "Seninle çok gurur duyuyorum, çünkü …", en: "" },
          { de: "I hope this year brings you …", tr: "Umarım bu yıl sana … getirir", en: "" },
        ],
        sample:
          "Dear Elif, happy eighteenth birthday! I still remember the day you learned to ride a bike in " +
          "Grandma's garden. You were six, you fell eleven times, and every time you got up and said, “Again.” " +
          "I was watching from the kitchen window and I couldn't believe how stubborn you were. " +
          "You taught me something that day: it's fine to look silly while you're learning. I think of it " +
          "every time I try something new at work. " +
          "If I could give you one piece of advice, it would be this: don't be afraid to ask people for help. " +
          "You always want to do everything on your own, but the people who love you are happy to lend you a hand. " +
          "Your grandmother gave me this watch when I turned eighteen, and now I'm giving it to you. Look after it! " +
          "I hope this year brings you lots of adventures. I'm so proud of you, because you have never stopped " +
          "getting up again. Love, Aunt Selin",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b1-lib-s15",
    course: "en",
    level: "B1",
    skill: "speaking",
    title: "Should Children Be Paid for Helping at Home?",
    genre: "monologue",
    intro: "Yaklaşık bir dakika tek başına konuşacaksın: bir aile kuralını tart ve bir sistem öner.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Çocuklara evde yaptıkları işler için para verilmeli mi? Görüşünü söyle, kendi ailenden ya da çevrenden bir örnek ver, karşı görüşün en güçlü gerekçesini kabul et ve bir sistem öner.",
      bulletsTr: [
        "Görüşünü tek cümleyle söyle",
        "Ailenden ya da çevrenden bir örnek ver",
        "Karşı görüşün en güçlü gerekçesini kabul et",
        "Bir sistem öner",
      ],
      targets: [
        { de: "I don't think they should be paid for everything, but …", tr: "Her şey için para almaları gerektiğini düşünmüyorum ama …" },
        { de: "In my family, my parents made us …", tr: "Bizim ailede annemle babam bize … yaptırırdı" },
        { de: "The strongest argument on the other side is …", tr: "Karşı taraftaki en güçlü gerekçe …" },
        { de: "What I would do is …", tr: "Benim yapacağım şey …" },
      ],
      minSeconds: 40,
      maxSeconds: 80,
      sampleDe:
        "I don't think they should be paid for everything, but I do think some money should be " +
        "connected to work. " +
        "In my family, my parents made us do the ordinary jobs for nothing: making our beds, " +
        "clearing the table, keeping our rooms tidy. Nobody pays an adult for washing their own cup. " +
        "But when my brother wanted a new bike, they let him earn half of it by washing the car " +
        "and cleaning the windows every Saturday. He was twelve, and he still talks about that bike. " +
        "The strongest argument on the other side is that payment teaches children to ask " +
        "“What do I get?” every time someone needs help. I have seen that happen, and it isn't nice. " +
        "What I would do is keep two lists. The first list is simply what everyone in a home does. " +
        "The second list is extra jobs with a price, and a child can choose them or leave them.",
      rubricHint:
        "Görüş, aileden somut bir örnek, karşı görüşün kabulü ve uygulanabilir bir sistem beklenir; „the strongest argument on the other side“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b1-lib-g15",
    course: "en",
    level: "B1",
    skill: "grammar",
    title: "give her the keys, give them to her",
    genre: "grammar",
    intro: "Türkçede „kime“ ve „neyi“ eklerle ayrılır ve sıra serbesttir; İngilizcede iki nesnenin sırası kuralla belirlenir, sıra değişince araya edat girer.",
    focus: "Çift nesneli fiiller: give someone something / give something to someone (to mu, for mu)",
    gloss: [
      { de: "to lend", tr: "ödünç vermek" },
      { de: "scarf", tr: "atkı" },
      { de: "salt", tr: "tuz" },
      { de: "to explain", tr: "açıklamak" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "Kişi + şey",
        tr: "„give, send, show, lend, bring, tell, buy“ gibi fiiller iki nesne alabilir. En sık sıra ÖNCE KİŞİ, SONRA ŞEY'dir ve arada edat yoktur. Türkçedeki „-e“ eki İngilizcede bu sırayla karşılanır.",
        examples: [
          { de: "She gave her son the keys.", tr: "Oğluna anahtarları verdi.", note: "kişi + şey" },
          { de: "Can you send me the photos?", tr: "Bana fotoğrafları gönderebilir misin?", note: "zamir kişi" },
          { de: "He showed us his new apartment.", tr: "Bize yeni dairesini gösterdi.", note: "show + kişi + şey" },
        ],
      },
      {
        heading: "Şey + to / for + kişi",
        tr: "Sırayı değiştirirsen kişinin önüne edat girer. Çoğu fiil „to“ alır (give, send, show, lend, tell); „buy, make, get, cook“ ise „for“ alır. Kişi bilgisi yeniyse ya da vurgulanıyorsa bu sıra seçilir.",
        examples: [
          { de: "She gave the keys to her son.", tr: "Anahtarları oğluna verdi.", note: "şey + to + kişi" },
          { de: "I bought a present for my sister.", tr: "Kız kardeşime bir hediye aldım.", note: "buy → for" },
          { de: "Could you lend your bike to Ali?", tr: "Bisikletini Ali'ye ödünç verebilir misin?", note: "lend → to" },
        ],
      },
      {
        heading: "Şey bir zamirse ve explain",
        tr: "Şey „it“ ya da „them“ gibi bir zamirse önce gelir ve kişi edatla sona gider: „Give it to me.“ „explain, describe, suggest“ ise kişi + şey sırasını hiç almaz: „Explain the rule to me“ denir, „Explain me the rule“ denmez.",
        examples: [
          { de: "Give it to me, please.", tr: "Onu bana ver lütfen.", note: "zamir şey → to + kişi" },
          { de: "I sent them to her yesterday.", tr: "Onları dün ona gönderdim.", note: "iki zamir" },
          { de: "Can you explain the rule to me?", tr: "Kuralı bana açıklayabilir misin?", note: "explain + şey + to" },
        ],
      },
    ],
    questions: [
      {
        text: "Can you pass ___, please?",
        options: ["the salt me", "me the salt", "to me the salt"],
        answer: 1,
        explain: "Edatsız sırada önce kişi, sonra şey gelir: „pass me the salt“.",
      },
      {
        text: "I bought a new scarf ___ my mother.",
        options: ["for", "to", "with"],
        answer: 0,
        explain: "„buy“ fiili şeyden sonra kişiyi „for“ ile alır.",
      },
      {
        text: "Which sentence is correct?",
        options: [
          "Can you explain me the problem?",
          "She gave to me the keys.",
          "Can you explain the problem to me?",
        ],
        answer: 2,
        explain: "„explain“ kişi + şey sırası almaz; kişi „to“ ile sona gider.",
      },
      {
        kind: "gapfill",
        text: "She showed ___ her photos from the trip. (we)",
        options: [],
        answer: 0,
        accept: ["us"],
        explain: "Kişi fiilden hemen sonra ve nesne biçiminde gelir: „us“.",
      },
      {
        kind: "gapfill",
        text: "I lent my camera ___ Ben last week.",
        options: [],
        answer: 0,
        accept: ["to"],
        explain: "Şey önce gelince kişi „to“ ile bağlanır: lend something to someone.",
      },
      {
        kind: "gapfill",
        text: "Don't give it ___ him yet.",
        options: [],
        answer: 0,
        accept: ["to"],
        explain: "Şey zamir („it“) olunca önce gelir ve kişi „to“ ile sona gider.",
      },
      {
        kind: "gapfill",
        text: "My dad cooked dinner ___ all of us.",
        options: [],
        answer: 0,
        accept: ["for"],
        explain: "„cook“ fiili kişiyi „for“ ile alır.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Could you", "send me", "the address", "again?"],
        explain: "send + kişi + şey: arada edat yok.",
      },
      {
        kind: "truefalse",
        text: "„Please describe me the man.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„describe“ kişi + şey sırası almaz: „Please describe the man to me.“",
      },
      {
        kind: "truefalse",
        text: "„He gave the flowers to his teacher.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Şey önce, kişi „to“ ile sonda; cümle doğru.",
      },
    ],
  },
];
