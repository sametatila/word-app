import type { SkillExercise } from "../../types";

/**
 * EN · A1 — Beceriler kütüphanesi, parti 13.
 *
 * Hücreleri YİRMİYE tamamlayan partilerden biri. Kurallar ve emsal:
 * `en-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Bu parti BEŞ beceriyi de taşır; okuma ve dinleme hücrelerinin son
 * partisidir. Parti 13 ev ve bakım hattı: apartmanın çamaşır odası yazısı,
 * fidancıda bitki seçmek, yeni daireyi anlatan e-posta. Söyleyiş odağı
 * orta ünlü /ɜː/ (work/walk); dil bilgisi was / were (did'li past simple
 * A2'de, burada yalnız be fiilinin geçmişi).
 */
export const enA1P13: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a1-lib-r13",
    course: "en",
    level: "A1",
    skill: "reading",
    title: "Laundry Room — Please Read",
    genre: "guide",
    intro: "Apartmanın bodrumundaki çamaşır odasının kapısına asılmış yazıyı okuyacaksın: nerede, ne zaman açık, nasıl ödeniyor, ne yapmak gerekiyor.",
    gloss: [
      { de: "laundry", tr: "çamaşır" },
      { de: "basement", tr: "bodrum" },
      { de: "washing machine", tr: "çamaşır makinesi" },
      { de: "dryer", tr: "kurutma makinesi" },
      { de: "coin", tr: "madeni para" },
      { de: "clothes", tr: "giysi" },
      { de: "wash", tr: "yıkama" },
    ],
    minutes: 4,
    text:
      "LAUNDRY ROOM — PLEASE READ\n\n" +
      "The laundry room is in the basement, next to the bike room. It is open every day from seven in the morning to ten at night.\n\n" +
      "There are two washing machines and one dryer. One wash costs two euros, and the dryer costs one euro. " +
      "The machines only take coins, so please bring some with you.\n\n" +
      "Please write your name and flat number on the list on the door. One wash takes about one hour.\n\n" +
      "When your wash is finished, take your clothes out. Do not leave them in the machine.\n\n" +
      "After you use a machine, please clean the door.\n\n" +
      "A problem with a machine? Call Mr. Bauer on 0160 71 28 44.",
    questions: [
      {
        text: "Where is the laundry room?",
        options: ["on the first floor", "in the basement", "next to Mr. Bauer's flat"],
        answer: 1,
        explain: "„The laundry room is in the basement, next to the bike room.“",
      },
      {
        text: "How much is the dryer?",
        options: ["one euro", "two euros", "three euros"],
        answer: 0,
        explain: "„… and the dryer costs one euro.“ — iki euro bir yıkamanın fiyatı.",
      },
      {
        kind: "truefalse",
        text: "You need coins for the machines.",
        options: ["True", "False"],
        answer: 0,
        explain: "„The machines only take coins …“ — kart ya da kâğıt para geçmiyor.",
      },
      {
        kind: "gapfill",
        text: "One wash takes about one ___.",
        options: [],
        answer: 0,
        accept: ["hour"],
        explain: "„One wash takes about one hour.“",
      },
      {
        kind: "short_answer",
        text: "What do you write on the list?",
        options: [],
        answer: 0,
        accept: ["your name and flat number", "name and flat number", "my name and flat number", "the name and the flat number"],
        explain: "„Please write your name and flat number on the list on the door.“",
      },
      {
        text: "What must you do after you use a machine?",
        options: ["call Mr. Bauer", "write on the list", "clean the door"],
        answer: 2,
        explain: "„After you use a machine, please clean the door.“ — listeye yazmak kullanmadan ÖNCE yapılıyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a1-lib-l13",
    course: "en",
    level: "A1",
    skill: "listening",
    title: "A Plant for a Dark Kitchen",
    genre: "dialogue",
    intro: "Nora bir fidancıda karanlık mutfağı için bitki arıyor; hangi bitkiyi aldığını, onu ne sıklıkla sulayacağını ve ne ödediğini dinle.",
    gloss: [
      { de: "plant", tr: "bitki" },
      { de: "dark", tr: "karanlık" },
      { de: "water", tr: "sulamak" },
      { de: "once", tr: "bir kere" },
      { de: "grow", tr: "büyümek" },
      { de: "pot", tr: "saksı" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Nora", text: "Hello. I need a plant for my kitchen, but it's quite dark." },
      { speaker: "Assistant", text: "No problem. This one is good for dark rooms. It doesn't need much sun." },
      { speaker: "Nora", text: "It's nice. How often do I water it?" },
      { speaker: "Assistant", text: "Once a week is fine. In winter, every two weeks." },
      { speaker: "Nora", text: "Does it grow fast?" },
      { speaker: "Assistant", text: "No, it grows very slowly, so it stays small." },
      { speaker: "Nora", text: "Good, my kitchen is small too. How much is it?" },
      { speaker: "Assistant", text: "It's fifteen euros. With this blue pot, it's twenty-two." },
      { speaker: "Nora", text: "I have a pot at home. Just the plant, please." },
      { speaker: "Assistant", text: "Here you are. And in winter, don't put it next to a cold window." },
      { speaker: "Nora", text: "Okay. Thanks for your help!" },
    ],
    questions: [
      {
        text: "What does Nora need?",
        options: ["a plant for a dark kitchen", "a pot for a big plant", "a plant for a sunny balcony"],
        answer: 0,
        explain: "„I need a plant for my kitchen, but it's quite dark.“",
      },
      {
        text: "How often does Nora water the plant in winter?",
        options: ["once a week", "every day", "every two weeks"],
        answer: 2,
        explain: "„Once a week is fine. In winter, every two weeks.“ — haftada bir, kış dışındaki aylar için.",
      },
      {
        kind: "truefalse",
        text: "The plant grows very slowly.",
        options: ["True", "False"],
        answer: 0,
        explain: "„No, it grows very slowly, so it stays small.“",
      },
      {
        kind: "short_answer",
        text: "How much does Nora pay?",
        options: [],
        answer: 0,
        accept: ["fifteen euros", "15 euros", "fifteen", "15"],
        explain: "Bitki on beş euro; saksıyla yirmi iki olurdu ama Nora saksıyı almıyor.",
      },
      {
        kind: "dictation",
        text: "Görevlinin bitki hakkında söylediği ikinci cümleyi duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["It doesn't need much sun.", "It doesn't need much sun", "It does not need much sun."],
        explain: "„It doesn't need much sun.“ — „sun“ sayılamaz, bu yüzden „much“ geliyor.",
      },
      {
        text: "Why does Nora not buy the blue pot?",
        options: ["It is too expensive.", "She has a pot at home.", "It is too small."],
        answer: 1,
        explain: "„I have a pot at home. Just the plant, please.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-lib-w13",
    course: "en",
    level: "A1",
    skill: "writing",
    title: "My New Flat",
    genre: "email",
    intro: "Yeni bir daireye taşındın; önce iki cümle kur, sonra bir arkadaşına daireni anlatan ve onu davet eden kısa bir e-posta yaz.",
    gloss: [
      { de: "flat", tr: "daire" },
      { de: "kitchen", tr: "mutfak" },
      { de: "balcony", tr: "balkon" },
      { de: "loud", tr: "gürültülü" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Mutfakta büyük bir pencere var.",
        answer: "There is a big window in the kitchen.",
        alternatives: ["In the kitchen there is a big window."],
        hint: "„var“ İngilizcede „there is“ ile söylenir; yer ifadesi cümlenin sonunda da başında da durabilir.",
      },
      {
        kind: "build",
        tr: "Odamdan parkı görebiliyorum.",
        answer: "I can see the park from my room.",
        alternatives: ["From my room I can see the park."],
        hint: "„can“ + yalın fiil; Türkçedeki -dan eki „from“ olarak ismin önüne gelir.",
      },
      {
        kind: "free",
        prompt:
          "Yeni bir daireye taşındın. Bir arkadaşına e-posta yaz: daire nerede, kaç oda var, en çok neyi seviyorsun, iyi olmayan bir şey ne ve onu hangi gün ve saatte davet ediyorsun.",
        checklist: [
          "Dairenin nerede olduğunu yaz",
          "Odaları there is / there are ile anlat",
          "Sevdiğin bir şeyi ve bir sorunu söyle",
          "Arkadaşını bir gün ve saatle davet et",
        ],
        minWords: 30,
        phrases: [
          { de: "My new flat is in …", tr: "Yeni dairem …'de." },
          { de: "There are … rooms.", tr: "… oda var." },
          { de: "I really like …", tr: "…'ı çok seviyorum." },
          { de: "The only problem is …", tr: "Tek sorun …" },
          { de: "Can you come on …?", tr: "… günü gelebilir misin?" },
        ],
        sample:
          "Hi Defne, I have a new flat! It is in Maple Street, near the river. There are two rooms, a small kitchen " +
          "and a balcony. There is a big window in the kitchen and I can see the park from my room. The only problem is " +
          "the street: it is loud in the morning. Can you come on Saturday at six? I can cook for us. Love, Pelin",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a1-lib-s13",
    course: "en",
    level: "A1",
    skill: "speaking",
    title: "work or walk?",
    genre: "pronounce",
    intro: "„ir, er, ur, or“ yazılışları çoğu zaman tek bir orta ünlü verir ve Amerikan söyleyişinde r ile kaynaşır: dudaklar gevşek, dilin ucu geri kıvrılır. Türkçedeki ö'ye yakındır ama yuvarlak değildir.",
    gloss: [
      { de: "to work", tr: "çalışmak" },
      { de: "shirt", tr: "gömlek" },
      { de: "word", tr: "kelime" },
      { de: "bird", tr: "kuş" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "I work in a big shop.",
        tr: "Büyük bir dükkânda çalışıyorum.",
        hint: "„work“ = WÖRK: ünlü r ile kaynaşır, dudaklar yuvarlanmaz. „o“ harfine bakıp o söylersen başka bir fiil çıkar.",
        confusions: [
          { heard: ["walk"], fix: "Dudakları yuvarlarsan „walk“ (yürümek) duyulur; ağzı gevşek ve yarı açık tut.", expected: "work" },
        ],
      },
      {
        de: "Her shirt is blue.",
        tr: "Onun gömleği mavi.",
        hint: "„her“ ve „shirt“ aynı sesi taşır: HÖR, ŞÖRT. Yazılış farklı, ses aynı.",
        confusions: [
          { heard: ["short", "shot"], fix: "„shirt“ o ile söylenirse „short“ (kısa) duyulur; dudakları yuvarlama.", expected: "shirt" },
        ],
      },
      {
        de: "Say this word again, please.",
        tr: "Bu kelimeyi tekrar söyle lütfen.",
        hint: "„word“ = WÖRD. Buradaki „or“ yazılışı o sesi vermez.",
        confusions: [
          { heard: ["ward"], fix: "o'ya kaçarsa „ward“ (koğuş) olur; ünlü orta ve uzun kalsın.", expected: "word" },
        ],
      },
      {
        de: "The bird is on the roof.",
        tr: "Kuş çatının üstünde.",
        hint: "„bird“ = BÖRD; i harfini i diye okuma.",
        confusions: [
          { heard: ["bid", "bed"], fix: "i ya da e diye okursan „bid“ ya da „bed“ duyulur; ses orta ve uzun.", expected: "bird" },
        ],
      },
      {
        de: "It's my first day at work.",
        tr: "İşteki ilk günüm.",
        hint: "„first“ ve „work“: iki kez aynı orta ünlü. a'ya da kısa i'ye kaçmasın.",
        confusions: [
          { heard: ["fast", "fist"], fix: "a ile „fast“, kısa i ile „fist“ (yumruk) olur; ağzı yarı açık tut.", expected: "first" },
        ],
      },
      {
        de: "My leg hurts a lot.",
        tr: "Bacağım çok ağrıyor.",
        hint: "„hurts“ = HÖRTS; u harfi burada u değil, yine orta ünlü.",
        confusions: [
          { heard: ["hearts", "hats"], fix: "Ağzı fazla açarsan „hearts“ ya da „hats“ gibi duyulur; ses orta kalsın.", expected: "hurts" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a1-lib-g13",
    course: "en",
    level: "A1",
    skill: "grammar",
    title: "was and were",
    genre: "grammar",
    intro: "„be“ fiilinin geçmişi iki biçimle söylenir ve did gerektirmez; soru ve olumsuz da bu iki kelimeyle kurulur.",
    focus: "was / were: be fiilinin geçmişi, there was / there were ve born (did'siz geçmiş)",
    gloss: [
      { de: "yesterday", tr: "dün" },
      { de: "tired", tr: "yorgun" },
      { de: "last week", tr: "geçen hafta" },
      { de: "busy", tr: "meşgul" },
    ],
    minutes: 6,
    explanation: [
      {
        heading: "Biçimler: was ve were",
        tr: "Şimdiki „am“ ve „is“ geçmişte „was“, „are“ ise „were“ olur: I / he / she / it was; you / we / they were. Türkçedeki -di / -ydi ekinin karşılığıdır: evdeydim = I was at home.",
        examples: [
          { de: "I was at home yesterday.", tr: "Dün evdeydim.", note: "I → was" },
          { de: "The movie was very good.", tr: "Film çok iyiydi.", note: "it → was" },
          { de: "We were tired last night.", tr: "Dün akşam yorgunduk.", note: "we → were" },
        ],
      },
      {
        heading: "Olumsuz ve soru: did yok",
        tr: "Olumsuzda „not“ doğrudan eklenir: wasn't, weren't. Soruda was / were başa geçer. Öteki fiillerin geçmişinde kullanılan „did“ burada KULLANILMAZ: „Did you were …?“ yanlıştır.",
        examples: [
          { de: "She wasn't at work on Monday.", tr: "Pazartesi işte değildi.", note: "was + not" },
          { de: "Were you busy last week?", tr: "Geçen hafta meşgul müydün?", note: "were başa geçer" },
          { de: "Was the store open?", tr: "Dükkân açık mıydı?" },
        ],
      },
      {
        heading: "there was / there were ve born",
        tr: "„vardı“ demek için tekilde „there was“, çoğulda „there were“ kullanılır. Doğum da was / were ile söylenir: I was born in May. Türkçedeki „doğdum“ gibi tek bir fiil yoktur.",
        examples: [
          { de: "There was a party at Ela's apartment.", tr: "Ela'nın evinde bir parti vardı.", note: "tekil → was" },
          { de: "There were twenty people at the party.", tr: "Partide yirmi kişi vardı.", note: "çoğul → were" },
          { de: "I was born in May.", tr: "Mayısta doğdum.", note: "born: was ile" },
        ],
      },
    ],
    questions: [
      {
        text: "We ___ tired last night.",
        options: ["was", "were", "are"],
        answer: 1,
        explain: "„we“ ile be fiilinin geçmişi were olur; „last night“ geçmişi gösteriyor.",
      },
      {
        text: "___ you busy last week?",
        options: ["Did", "Was", "Were"],
        answer: 2,
        explain: "„you“ ile were kullanılır ve soruda başa geçer; did gerekmez.",
      },
      {
        text: "There ___ a party at Ela's apartment on Friday.",
        options: ["was", "were", "are"],
        answer: 0,
        explain: "„a party“ tekil ve geçmişte, bu yüzden there was.",
      },
      {
        kind: "gapfill",
        text: "She ___ at work on Monday. (be + not)",
        options: [],
        answer: 0,
        accept: ["wasn't", "was not"],
        explain: "„she“ ile olumsuz geçmiş: wasn't.",
      },
      {
        kind: "gapfill",
        text: "I was ___ in 2001, in Izmir.",
        options: [],
        answer: 0,
        accept: ["born"],
        explain: "Doğum „was born“ kalıbıyla söylenir.",
      },
      {
        kind: "gapfill",
        text: "There ___ twenty people at the party.",
        options: [],
        answer: 0,
        accept: ["were"],
        explain: "„twenty people“ çoğul, bu yüzden there were.",
      },
      {
        kind: "gapfill",
        text: "___ the store open yesterday?",
        options: [],
        answer: 0,
        accept: ["Was", "was"],
        explain: "„the store“ tekil; soruda was başa geçer.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["I", "was", "at home", "yesterday"],
        explain: "Özne + was + yer + zaman: I was at home yesterday.",
      },
      {
        kind: "truefalse",
        text: "„Did you were at home?“ — Bu soru doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "be fiilinde did kullanılmaz: „Were you at home?“",
      },
      {
        kind: "truefalse",
        text: "„The movie was very good.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "„the movie“ tekil (it), bu yüzden was doğru.",
      },
    ],
  },
];
