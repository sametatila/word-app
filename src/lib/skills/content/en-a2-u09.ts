import type { SkillExercise } from "../types";

/**
 * EN · A2 · Ünite 9 — "Mobilya, arıza, gürültü, taşınma".
 *
 * Dört ders: Furniture and rooms · Telling the landlord · Noisy neighbours ·
 * Moving in.
 *
 *   Kelime: furniture, shelf, carpet, cupboard, corner, armchair, drawer,
 *           mirror, a leak, the heating, broken, to fix, immediately,
 *           damage, pipe, caretaker, noise, loud, late, complain, polite,
 *           noisy, resident, apology, move, key, contract, sign,
 *           electricity, front door, hallway, gas.
 *   Kalıp:  There is a carpet in the living room. ·
 *           There are two shelves on the wall. ·
 *           Is there a cupboard in the kitchen? ·
 *           There's a leak in the bathroom. ·
 *           The heating hasn't worked since Monday. ·
 *           Could you send someone today? · Sorry to bother you, but … ·
 *           Could you … , please? · I haven't … since … ·
 *           First, we signed the contract. · After that, we got the keys. ·
 *           We haven't turned on the electricity yet.
 *
 * Ünitenin tek öğretme noktası OLUMSUZ PRESENT PERFECT: hâlâ süren bir
 * aksaklık İngilizcede „hasn't worked since Monday“ / „haven't turned on
 * … yet“ ile anlatılıyor. Türkçe aynı yerde şimdiki zaman kuruyor
 * („pazartesiden beri çalışmıyor“), o yüzden bu biçim öğrenci için yeni
 * ve üç ders boyunca aynı kalıba dönüyor. Yanında sessiz bir imla dersi
 * var: shelf → shelves.
 */
export const enA2U09: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a2-u9-r1",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 9,
    title: "Telling the landlord",
    genre: "email",
    intro: "İki arıza bildiriliyor. Hangisi ne zamandan beri sürüyor?",
    gloss: [
      { de: "sink", tr: "lavabo" },
      { de: "easier", tr: "daha kolay" },
      { de: "Best wishes", tr: "saygılarımla" },
    ],
    minutes: 5,
    text:
      "Dear Mr Yılmaz,\n" +
      "I am writing about two problems in my flat.\n" +
      "There's a leak in the bathroom. The water comes from the pipe under the sink and it has been there since Saturday. There is already damage on the carpet.\n" +
      "The second problem is the heating. The heating hasn't worked since Monday. In the morning the rooms are very cold and my daughter is ill.\n" +
      "I called the caretaker twice. He came on Tuesday, looked at the pipe and said: I can't fix it.\n" +
      "Could you send someone today or tomorrow? I am at home after four.\n" +
      "If it is easier for you, I can be at home on Saturday too.\n" +
      "Thank you very much.\n" +
      "Best wishes,\n" +
      "Ela Demir",
    questions: [
      {
        text: "Since when has the heating not worked?",
        options: ["since Monday", "since Saturday", "since Tuesday"],
        answer: 0,
        explain: "„The heating hasn't worked since Monday.“ — cumartesi sızıntının başlangıcı.",
      },
      {
        text: "What did the caretaker say?",
        options: ["he can't fix it", "he will come on Saturday", "the pipe is new"],
        answer: 0,
        explain: "„He came on Tuesday, looked at the pipe and said: I can't fix it.“",
      },
      {
        kind: "truefalse",
        text: "The leak started on Monday.",
        options: ["True", "False"],
        answer: 1,
        explain: "„…it has been there since Saturday.“ — pazartesi kalorifere ait.",
      },
      {
        kind: "gapfill",
        text: "There is already damage on the ___.",
        options: [],
        answer: 0,
        accept: ["carpet"],
        explain: "„There is already damage on the carpet.“",
      },
      {
        kind: "short_answer",
        text: "When is Ela at home?",
        options: [],
        answer: 0,
        accept: ["after four", "after four o'clock", "after 4"],
        explain: "„Could you send someone today or tomorrow? I am at home after four.“",
      },
    ],
  },
  {
    id: "en-a2-u9-r2",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 9,
    title: "Moving in",
    genre: "story",
    intro: "Taşınma günü, adım adım. Ne bitti, ne henüz bitmedi?",
    gloss: [
      { de: "stairs", tr: "merdiven" },
      { de: "carried", tr: "taşıdılar" },
      { de: "In the end", tr: "sonunda" },
    ],
    minutes: 6,
    text:
      "We moved in on the first of March. First, we signed the contract in the office of the old building.\n" +
      "After that, we got the keys — three for the front door and one for the flat.\n" +
      "The furniture came at eleven. Two men carried the cupboard up the stairs and it didn't go through the door.\n" +
      "In the end they took the drawers out and then it was fine.\n" +
      "The first night we slept on the carpet, because the bed was still in the hallway.\n" +
      "There is a big mirror in the corner of the bedroom. It was already here before us.\n" +
      "We haven't turned on the electricity yet, so we ate bread and cheese with a light from the phone.\n" +
      "The gas man comes on Thursday. Until then, cold water.\n" +
      "My brother asked: Was it a good day? I said: The best. Nothing was ready, but everything was ours.",
    questions: [
      {
        text: "What was the problem with the cupboard?",
        options: ["it didn't go through the door", "it was broken", "it was too small"],
        answer: 0,
        explain: "„Two men carried the cupboard up the stairs and it didn't go through the door.“",
      },
      {
        text: "Why did they eat bread and cheese?",
        options: ["there was no electricity", "the kitchen was small", "the gas man came"],
        answer: 0,
        explain: "„We haven't turned on the electricity yet…“ — ışık telefondan.",
      },
      {
        kind: "truefalse",
        text: "The mirror is new.",
        options: ["True", "False"],
        answer: 1,
        explain: "„It was already here before us.“",
      },
      {
        kind: "gapfill",
        text: "The first night they slept on the ___.",
        options: [],
        answer: 0,
        accept: ["carpet"],
        explain: "„The first night we slept on the carpet, because the bed was still in the hallway.“",
      },
      {
        kind: "order",
        text: "Taşınma gününün sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "We signed the contract.",
          "We got the keys.",
          "The furniture came at eleven.",
          "We slept on the carpet.",
        ],
        explain: "„First…“, „After that…“ ve saatler sırayı metnin içinde veriyor.",
      },
      {
        kind: "short_answer",
        text: "When does the gas man come?",
        options: [],
        answer: 0,
        accept: ["on Thursday", "Thursday"],
        explain: "„The gas man comes on Thursday. Until then, cold water.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a2-u9-l1",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 9,
    title: "Furniture and rooms",
    genre: "dialogue",
    intro: "Yeni daire geziliyor. Ne nerede duruyor?",
    gloss: [
      { de: "shelves", tr: "raflar" },
      { de: "papers", tr: "kâğıtlar" },
      { de: "Later", tr: "sonra" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Sena", text: "Come in! This is the living room." },
      { speaker: "Mert", text: "It's bigger than the advert said. Is there a carpet under the table?" },
      { speaker: "Sena", text: "Yes, and there are two shelves on the wall. My father put them there." },
      { speaker: "Mert", text: "And the armchair in the corner — is it old?" },
      { speaker: "Sena", text: "From my grandmother. It is the most comfortable chair in the flat." },
      { speaker: "Mert", text: "Where do you put your books?" },
      { speaker: "Sena", text: "In the cupboard next to the door. The drawers are for papers." },
      { speaker: "Mert", text: "Is there a mirror in the bathroom?" },
      { speaker: "Sena", text: "Of course. And one in the hallway, next to the front door." },
      { speaker: "Mert", text: "You have a lot of furniture for two rooms." },
      { speaker: "Sena", text: "Not a lot — old. Everything here has a story." },
      { speaker: "Mert", text: "Then tell me one story. The mirror first." },
      { speaker: "Sena", text: "Later. First the coffee." },
    ],
    questions: [
      {
        text: "Where are the shelves?",
        options: ["on the wall", "in the corner", "under the table"],
        answer: 0,
        explain: "„…there are two shelves on the wall. My father put them there.“",
      },
      {
        text: "What is in the drawers?",
        options: ["papers", "books", "the mirror"],
        answer: 0,
        explain: "„In the cupboard next to the door. The drawers are for papers.“",
      },
      {
        kind: "truefalse",
        text: "The armchair is new.",
        options: ["True", "False"],
        answer: 1,
        explain: "„From my grandmother. It is the most comfortable chair in the flat.“",
      },
      {
        kind: "gapfill",
        text: "There is a carpet under the ___.",
        options: [],
        answer: 0,
        accept: ["table"],
        explain: "„Is there a carpet under the table? — Yes…“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Is there a mirror in the bathroom?", "Is there a mirror in the bathroom"],
        explain: "Varlık sorusunda „is there“ tekil, „are there“ çoğul.",
      },
      {
        kind: "short_answer",
        text: "How many shelves are on the wall?",
        options: [],
        answer: 0,
        accept: ["two", "2"],
        explain: "„…there are two shelves on the wall.“ — tekili „shelf“, çoğulu „shelves“.",
      },
    ],
  },
  {
    id: "en-a2-u9-l2",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 9,
    title: "Noisy neighbours",
    genre: "monologue",
    intro: "Gürültü şikâyeti, üç adımda. Sonuncusu pastayla bitiyor.",
    gloss: [
      { de: "above", tr: "üstümüzdeki" },
      { de: "bother", tr: "rahatsız etmek" },
      { de: "in that order", tr: "bu sırayla" },
      { de: "real", tr: "gerçek" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Nil", text: "The family above us moved in in June. Since then, Saturday night is not my night." },
      { speaker: "Nil", text: "The first week I said nothing. The second week I couldn't sleep until two." },
      { speaker: "Nil", text: "Then I went up. I said: Sorry to bother you, but the noise is really loud after eleven." },
      { speaker: "Nil", text: "The man was polite. He said sorry and closed the door." },
      { speaker: "Nil", text: "The next Saturday it was loud again. This time I wrote a letter — short, and without angry words." },
      { speaker: "Nil", text: "Two residents from the second floor signed it with me." },
      { speaker: "Nil", text: "After the letter the man came down with cake. A real apology, with sugar." },
      { speaker: "Nil", text: "And now? It is quiet. I haven't heard the music since August." },
      { speaker: "Nil", text: "One thing I learned: a polite word first, a letter second. In that order it works." },
    ],
    questions: [
      {
        text: "What did Nil do first?",
        options: ["she said nothing", "she wrote a letter", "she went up"],
        answer: 0,
        explain: "„The first week I said nothing.“ — yukarı çıkmak ikinci, mektup üçüncü adım.",
      },
      {
        text: "Who signed the letter?",
        options: ["two residents from the second floor", "the man above", "the caretaker"],
        answer: 0,
        explain: "„Two residents from the second floor signed it with me.“",
      },
      {
        kind: "truefalse",
        text: "The man was angry.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The man was polite. He said sorry and closed the door.“",
      },
      {
        kind: "gapfill",
        text: "After the letter the man came down with ___.",
        options: [],
        answer: 0,
        accept: ["cake"],
        explain: "„After the letter the man came down with cake. A real apology, with sugar.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Sorry to bother you, but the noise is really loud after eleven."],
        explain: "Şikâyetin kibar açılışı; asıl konu „but“tan sonra geliyor.",
      },
      {
        kind: "short_answer",
        text: "Since when has Nil not heard the music?",
        options: [],
        answer: 0,
        accept: ["since August", "August"],
        explain: "„I haven't heard the music since August.“ — olumsuz present perfect: o günden beri hiç.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-u9-w1",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 9,
    title: "There's a leak in the bathroom",
    genre: "formal",
    intro: "Arızayı bildir. Süren bozukluk olumsuz present perfect istiyor.",
    gloss: [
      { de: "a leak", tr: "sızıntı" },
      { de: "the heating", tr: "kalorifer" },
      { de: "broken", tr: "bozuk" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Banyoda bir sızıntı var.",
        answer: "There's a leak in the bathroom.",
        alternatives: ["There is a leak in the bathroom."],
        hint: "Varlık cümlesi „there is“ ile; tekil olduğu için „a leak“.",
      },
      {
        kind: "build",
        tr: "Kalorifer pazartesiden beri çalışmıyor.",
        answer: "The heating hasn't worked since Monday.",
        alternatives: ["The heating has not worked since Monday."],
        hint: "Arıza SÜRÜYOR: İngilizce olumsuz present perfect istiyor, Türkçe şimdiki zaman diyor.",
      },
      {
        kind: "build",
        tr: "Bugün birini gönderebilir misiniz?",
        answer: "Could you send someone today?",
        hint: "„Could you“ en kibar rica; kim olduğu önemsizse „someone“.",
      },
      {
        kind: "build",
        tr: "Boru bozuk.",
        answer: "The pipe is broken.",
        hint: "„broken“ burada sıfat gibi çalışıyor; „break“in üçüncü hâli.",
      },
      {
        kind: "form",
        prompt: "Arıza formunu doldur.",
        facts: "Banyoda sızıntı; kalorifer pazartesiden beri çalışmıyor; halıda hasar; evde dörtten sonra.",
        fields: [
          { label: "Problem 1", answer: "a leak", accept: ["leak", "a leak in the bathroom"] },
          { label: "Problem 2", answer: "the heating", accept: ["heating"] },
          { label: "Since", answer: "Monday", accept: ["since Monday"] },
          { label: "At home", answer: "after four", accept: ["after 4"] },
        ],
      },
    ],
  },
  {
    id: "en-a2-u9-w2",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 9,
    title: "Moving in",
    genre: "personal",
    intro: "Taşınmayı sırayla anlat. „yet“ ve „since“ henüz bitmemişi taşıyor.",
    gloss: [
      { de: "the contract", tr: "sözleşme" },
      { de: "turned on", tr: "açtık" },
      { de: "the noise", tr: "gürültü" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Önce sözleşmeyi imzaladık.",
        answer: "First, we signed the contract.",
        alternatives: ["First we signed the contract."],
        hint: "„First“ sıralamanın ilk adımı; virgül yaygın ama zorunlu değil.",
      },
      {
        kind: "build",
        tr: "Ondan sonra anahtarları aldık.",
        answer: "After that, we got the keys.",
        alternatives: ["After that we got the keys."],
        hint: "„after that“ bir sonraki adımı bağlıyor; „get“in geçmişi „got“.",
      },
      {
        kind: "build",
        tr: "Elektriği henüz açmadık.",
        answer: "We haven't turned on the electricity yet.",
        alternatives: ["We have not turned on the electricity yet."],
        hint: "„yet“ olumsuzda ve en SONDA; iş bitmedi ama bitecek.",
      },
      {
        kind: "build",
        tr: "Ağustostan beri müziği duymadım.",
        answer: "I haven't heard the music since August.",
        alternatives: ["I have not heard the music since August."],
        hint: "Olumsuz present perfect + „since“: o günden bu yana HİÇ.",
      },
      {
        kind: "build",
        tr: "Rahatsız ettiğim için özür dilerim ama gürültü çok yüksek.",
        answer: "Sorry to bother you, but the noise is very loud.",
        hint: "Şikâyetin kibar açılışı kalıp; asıl konu „but“tan sonra geliyor.",
      },
    ],
  },
];
