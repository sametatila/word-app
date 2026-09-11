import type { SkillExercise } from "../types";

/**
 * EN · A1 · Ünite 9 — "Günler, phrasal verb, sıklık, sıralama".
 *
 * Dört ders: Days of the week · get up, wake up · Always, usually, never ·
 * My morning.
 *
 *   Kelime: Monday, Friday, weekend, today, morning, next, usual,
 *           in the evening, get up, wake up, turn on, turn off, put on,
 *           sit down, come in, look for, always, usually, sometimes,
 *           often, never, every, all, also, first, then, after, before,
 *           finally, step, until, begin.
 *   Kalıp:  on Monday · at the weekend · in the morning ·
 *           I get up at seven. · Turn off the TV. / Turn the TV off. ·
 *           What time do you get up? · I always drink tea. ·
 *           She is never late. · Sometimes I walk to work. ·
 *           First, … Then, … · After that, … · I … before …
 *
 * İki kural bu ünitede çarpışıyor ve içerik ikisini bilerek yan yana
 * koyuyor. Sıklık zarfı ana fiilden ÖNCE ama „be“ fiilinden SONRA geliyor
 * („I always walk“ / „She is never late“); phrasal verb'in nesnesi ise
 * araya girebiliyor („Turn off the TV“ = „Turn the TV off“). Öğrenci
 * ikisini de „sözcük sırası serbest“ sanıp karıştırıyor — değil, her
 * birinin kendi kuralı var.
 */
export const enA1U09: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a1-u9-r1",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 9,
    title: "My week",
    genre: "personal",
    intro: "Bir haftanın düzeni. Hangi iş her zaman, hangisi bazen yapılıyor?",
    gloss: [
      { de: "clothes", tr: "giysi" },
      { de: "radio", tr: "radyo" },
      { de: "drink", tr: "içmek" },
    ],
    minutes: 4,
    text:
      "I always get up at seven, also at the weekend. First I wake up, then I put on my clothes and I turn on the radio.\n\n" +
      "On Monday and on Friday I work in the city. I usually walk to work. Sometimes I am late, but my teacher is never angry.\n\n" +
      "In the evening I turn off the radio and I sit down with a newspaper. I often sit there until midnight.\n\n" +
      "At the weekend I look for a good game. After that I cook. Finally, before I sleep, I drink a cup of warm milk. That is my usual day.",
    questions: [
      {
        text: "When does the writer get up?",
        options: ["at seven, every day", "at seven, but not at the weekend", "at midnight"],
        answer: 0,
        explain: "„I always get up at seven, also at the weekend.“ — „also“ hafta sonunu da içine alıyor.",
      },
      {
        text: "Who is never angry?",
        options: ["the teacher", "the writer", "nobody"],
        answer: 0,
        explain: "„Sometimes I am late, but my teacher is never angry.“ — „never“ „be“ fiilinden SONRA.",
      },
      {
        kind: "truefalse",
        text: "The writer always walks to work.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I usually walk to work.“ — „usually“ „always“ değil; her zaman demiyor.",
      },
      {
        kind: "gapfill",
        text: "In the evening the writer turns ___ the radio.",
        options: [],
        answer: 0,
        accept: ["off"],
        explain: "„In the evening I turn off the radio.“ — sabah açıyor, akşam kapatıyor.",
      },
      {
        kind: "short_answer",
        text: "What does the writer drink before sleeping?",
        options: [],
        answer: 0,
        accept: ["warm milk", "a cup of warm milk", "milk"],
        explain: "„Finally, before I sleep, I drink a cup of warm milk.“",
      },
    ],
  },
  {
    id: "en-a1-u9-r2",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 9,
    title: "Come in, sit down",
    genre: "dialogue",
    intro: "Geç kalan bir öğrenci. Phrasal verb'lerin hepsi bir arada: come in, sit down, turn on, look for.",
    gloss: [
      { de: "take off", tr: "çıkarmak" },
      { de: "Never mind", tr: "önemli değil" },
      { de: "new", tr: "yeni" },
    ],
    minutes: 4,
    text:
      "Teacher: Good morning! Come in and sit down, please.\n" +
      "Ali: Good morning. Sorry, I am late again.\n" +
      "Teacher: It's only a quarter past nine. What time do you get up?\n" +
      "Ali: I usually wake up at seven, but today my clock doesn't work.\n" +
      "Teacher: Turn on your phone at night, then.\n" +
      "Ali: I always turn it off before I sleep.\n" +
      "Teacher: Then look for a new clock at the weekend!\n" +
      "Ali: Yes. On Saturday I have time.\n" +
      "Teacher: Good. Now, first take off your bag and sit down.\n" +
      "Ali: Sorry again!\n" +
      "Teacher: Never mind. We begin at half past nine. You are not late.",
    questions: [
      {
        text: "Why is Ali late?",
        options: ["his clock doesn't work", "he sleeps at midnight", "he has no phone"],
        answer: 0,
        explain: "„I usually wake up at seven, but today my clock doesn't work.“",
      },
      {
        text: "What time do they begin?",
        options: ["at half past nine", "at a quarter past nine", "at seven"],
        answer: 0,
        explain: "„We begin at half past nine.“ — çeyrek geçe şimdiki saat, yani Ali geç değil.",
      },
      {
        kind: "truefalse",
        text: "Ali turns off his phone before he sleeps.",
        options: ["True", "False"],
        answer: 0,
        explain: "„I always turn it off before I sleep.“ — nesne zamir olunca ARAYA giriyor: turn it off.",
      },
      {
        kind: "gapfill",
        text: "Ali usually wakes ___ at seven.",
        options: [],
        answer: 0,
        accept: ["up"],
        explain: "„I usually wake up at seven“ — „wake up“ iki parçalı bir fiil, parçası düşmez.",
      },
      {
        kind: "order",
        text: "Konuşmanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Come in and sit down, please.",
          "Sorry, I am late again.",
          "What time do you get up?",
          "We begin at half past nine.",
        ],
        explain: "Önce davet, sonra özür, sonra soru, en son başlama saati.",
      },
      {
        kind: "short_answer",
        text: "When will Ali look for a new clock?",
        options: [],
        answer: 0,
        accept: ["at the weekend", "on Saturday", "the weekend"],
        explain: "„Then look for a new clock at the weekend!“ — Ali de „On Saturday I have time“ diyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a1-u9-l1",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 9,
    title: "My morning",
    genre: "monologue",
    intro: "Sabahın adımları sırayla. First, then, after that, before, finally.",
    gloss: [
      { de: "the same", tr: "aynı" },
      { de: "clothes", tr: "giysi" },
      { de: "keys", tr: "anahtarlar" },
      { de: "drink", tr: "içmek" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Deniz", text: "My morning is always the same. First, I wake up at six." },
      { speaker: "Deniz", text: "Then I get up and I turn on the TV. I put on my clothes." },
      { speaker: "Deniz", text: "After that, I have breakfast. I always drink tea, never coffee." },
      { speaker: "Deniz", text: "Before work, I turn off the TV and I look for my keys." },
      { speaker: "Deniz", text: "I usually walk to work. Sometimes, in the evening, I also walk." },
      { speaker: "Deniz", text: "Finally, at night, I sit down and I am happy. That is my usual day." },
    ],
    questions: [
      {
        text: "What does Deniz do first?",
        options: ["he wakes up", "he gets up", "he has breakfast"],
        answer: 0,
        explain: "„First, I wake up at six.“ — kalkmak ikinci adım, kahvaltı üçüncü.",
      },
      {
        text: "What does Deniz always drink?",
        options: ["tea", "coffee", "milk"],
        answer: 0,
        explain: "„I always drink tea, never coffee.“ — iki zarf aynı cümlede karşıt duruyor.",
      },
      {
        kind: "truefalse",
        text: "Deniz turns on the TV before work.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Before work, I turn off the TV.“ — açmak sabahın başında, kapatmak işten önce.",
      },
      {
        kind: "gapfill",
        text: "Deniz usually ___ to work.",
        options: [],
        answer: 0,
        accept: ["walks"],
        explain: "„I usually walk to work.“ — üçüncü tekil kişide „-s“: he walks.",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I always drink tea, never coffee.", "I always drink tea never coffee."],
        explain: "„I always drink tea, never coffee.“ — sıklık zarfı ana fiilden önce: always drink.",
      },
      {
        kind: "short_answer",
        text: "What does Deniz look for?",
        options: [],
        answer: 0,
        accept: ["his keys", "keys", "the keys"],
        explain: "„…I look for my keys.“ — „look for“ aramak demek; „look“ tek başına bakmak.",
      },
    ],
  },
  {
    id: "en-a1-u9-l2",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 9,
    title: "At the weekend",
    genre: "dialogue",
    intro: "Hafta sonu ne yapılıyor? Sıklık zarflarını ve gün edatlarını yakala.",
    gloss: [
      { de: "free", tr: "boş" },
      { de: "big", tr: "büyük" },
      { de: "enough", tr: "yeterli" },
      { de: "vegetables", tr: "sebzeler" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Nil", text: "What do you do at the weekend, Kaan?" },
      { speaker: "Kaan", text: "On Saturday I always sleep until ten. Then I have a big breakfast." },
      { speaker: "Nil", text: "And on Sunday?" },
      { speaker: "Kaan", text: "On Sunday I usually cook. Sometimes my friends come in and we eat together." },
      { speaker: "Nil", text: "Do you work at the weekend?" },
      { speaker: "Kaan", text: "Never! I work from Monday to Friday, that is enough." },
      { speaker: "Nil", text: "I often work on Saturday morning. But in the evening I am free." },
      { speaker: "Kaan", text: "Then come to me next Saturday. We cook together." },
      { speaker: "Kaan", text: "First we buy the vegetables, after that we cook, and finally we eat." },
      { speaker: "Nil", text: "Good! What time?" },
      { speaker: "Kaan", text: "At half past six. Don't be late!" },
      { speaker: "Nil", text: "I am never late." },
    ],
    questions: [
      {
        text: "What does Kaan do on Sunday?",
        options: ["he usually cooks", "he works", "he sleeps until ten"],
        answer: 0,
        explain: "„On Sunday I usually cook.“ — ona kadar uyumak cumartesi.",
      },
      {
        text: "When do they cook together?",
        options: ["next Saturday", "on Sunday", "on Monday"],
        answer: 0,
        explain: "„Then come to me next Saturday. We cook together.“",
      },
      {
        kind: "truefalse",
        text: "Kaan works at the weekend.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Never! I work from Monday to Friday.“ — hafta sonu çalışan Nil.",
      },
      {
        kind: "gapfill",
        text: "Nil often works on Saturday ___.",
        options: [],
        answer: 0,
        accept: ["morning"],
        explain: "„I often work on Saturday morning.“ — akşamları boş.",
      },
      {
        kind: "order",
        text: "Pişirmenin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "First we buy the vegetables,",
          "after that we cook,",
          "and finally we eat.",
        ],
        explain: "„First … after that … finally“ üç adımı sırayla bağlıyor.",
      },
      {
        kind: "short_answer",
        text: "What time do they meet?",
        options: [],
        answer: 0,
        accept: ["at half past six", "half past six", "six thirty"],
        explain: "„At half past six. Don't be late!“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-u9-w1",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 9,
    title: "on Monday, at the weekend",
    genre: "personal",
    intro: "Zaman edatlarını yaz: günde „on“, hafta sonunda „at“, sabahta „in“. Üçü üç ayrı sözcük.",
    gloss: [
      { de: "on Monday", tr: "pazartesi günü" },
      { de: "at the weekend", tr: "hafta sonunda" },
      { de: "in the morning", tr: "sabahları" },
      { de: "free", tr: "boş" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Pazartesi günü çalışıyorum.",
        answer: "I work on Monday.",
        hint: "Gün adından önce „on“ ve gün adı büyük harfle: on Monday.",
      },
      {
        kind: "build",
        tr: "Hafta sonu çalışmıyorum.",
        answer: "I don't work at the weekend.",
        alternatives: ["I do not work at the weekend."],
        hint: "Hafta sonunda „at“: at the weekend. Günde „on“, ayda „in“.",
      },
      {
        kind: "build",
        tr: "Sabahları yürürüm.",
        answer: "I walk in the morning.",
        hint: "Günün bölümünde „in“: in the morning, in the evening. Ama „at night“ istisna.",
      },
      {
        kind: "build",
        tr: "Saat kaçta kalkarsın?",
        answer: "What time do you get up?",
        hint: "Soru „do“ ile, phrasal verb bölünmeden sonda: do you get up.",
      },
      {
        kind: "form",
        prompt: "Haftalık programı doldur.",
        facts: "Pazartesi ve cuma işte; cumartesi pazarda; pazar günü boş; her sabah yürüyüş.",
        fields: [
          { label: "Monday", answer: "work" },
          { label: "Friday", answer: "work" },
          { label: "Saturday", answer: "market", accept: ["the market"] },
          { label: "Sunday", answer: "free" },
        ],
      },
    ],
  },
  {
    id: "en-a1-u9-w2",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 9,
    title: "always, usually, never",
    genre: "personal",
    intro: "Sıklık zarfının yeri kurala bağlı: ana fiilden ÖNCE, „be“ fiilinden SONRA.",
    gloss: [
      { de: "always", tr: "her zaman" },
      { de: "never", tr: "asla" },
      { de: "drink", tr: "içmek" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Her zaman çay içerim.",
        answer: "I always drink tea.",
        hint: "Sıklık zarfı ana fiilden önce: always drink.",
      },
      {
        kind: "build",
        tr: "O asla geç kalmaz.",
        answer: "She is never late.",
        hint: "Burada fiil „be“, o yüzden zarf SONRA geliyor: is never.",
      },
      {
        kind: "build",
        tr: "Bazen işe yürürüm.",
        answer: "Sometimes I walk to work.",
        hint: "„sometimes“ cümlenin başına da gelebilir — tek gezebilen zarf odur.",
      },
      {
        kind: "rewrite",
        prompt: "Sıklık zarfını doğru yere koy: usually.",
        source: "I get up at seven.",
        answer: "I usually get up at seven.",
        why: "Ana fiilden önce: usually get up. Cümle sonuna konmaz.",
      },
      {
        kind: "rewrite",
        prompt: "Sıklık zarfını doğru yere koy: never.",
        source: "She is late.",
        answer: "She is never late.",
        why: "Fiil „be“ olduğu için zarf ondan sonra: is never. Öteki fiillerde önce: never walks.",
      },
    ],
  },
];
