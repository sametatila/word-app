import type { SkillExercise } from "../types";

/**
 * EN · A1 · Ünite 18 — "Bahçe, arıza, hobi, spor".
 *
 * Dört ders: Balcony and garden · Reporting a problem · Hobbies · Sports.
 *
 *   Kelime: garden, tree, flower, sun, outside, plant, ground, field,
 *           broken, work, fix, call, wrong, tap, printer, telephone,
 *           hobby, free time, enjoy, paint, collect, draw, instrument,
 *           video, sport, football, swim, run, team, basketball, tennis,
 *           win.
 *   Kalıp:  There is a … · There are two … · Is there a …? ·
 *           It's broken. · It doesn't work. · Can you fix it? ·
 *           I like reading. · I enjoy painting. ·
 *           Do you like collecting things? · I play football. ·
 *           I go swimming. · Do you play tennis?
 *
 * Ünitenin görünmez kuralı EŞDİZİM: top oyunları „play“ ile („play
 * football“, „play tennis“), tek başına yapılanlar „go“ + „-ing“ ile
 * („go swimming“, „go running“). Hiçbir anlam farkı yok, yalnız alışkanlık
 * — ve Türkçede ikisi de "yapmak/oynamak" olduğu için seçim görünmüyor.
 * İçerik ikisini aynı metinde art arda kullanıyor.
 */
export const enA1U18: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a1-u18-r1",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 18,
    title: "Balcony and garden",
    genre: "personal",
    intro: "Bahçe ve balkon anlatılıyor. Ne var, ne bozuk?",
    gloss: [
      { de: "summer", tr: "yaz" },
      { de: "balcony", tr: "balkon" },
      { de: "ball", tr: "top" },
      { de: "go", tr: "gitmek" },
    ],
    minutes: 4,
    text:
      "We have a small garden behind the house. There is a tree and there are many flowers.\n\n" +
      "In the sun the flowers are beautiful, but the ground is dry. I water the plants every morning. My neighbour has a field outside the city — that is a big garden!\n\n" +
      "On the balcony there are two chairs and a table. In the summer we eat outside. My son plays football in the garden, and sometimes the ball goes over the wall.\n\n" +
      "Is there a tap in the garden? Yes, next to the door. But the tap is broken — it doesn't work. I call a man on Monday.",
    questions: [
      {
        text: "What is in the garden?",
        options: ["a tree and many flowers", "a field", "a printer"],
        answer: 0,
        explain: "„There is a tree and there are many flowers.“ — tarla komşunun ve şehrin dışında.",
      },
      {
        text: "What is broken?",
        options: ["the tap", "the wall", "the table"],
        answer: 0,
        explain: "„But the tap is broken — it doesn't work.“",
      },
      {
        kind: "truefalse",
        text: "The neighbour's field is in the city.",
        options: ["True", "False"],
        answer: 1,
        explain: "„My neighbour has a field outside the city…“",
      },
      {
        kind: "gapfill",
        text: "On the balcony there are two chairs and a ___.",
        options: [],
        answer: 0,
        accept: ["table"],
        explain: "„On the balcony there are two chairs and a table.“",
      },
      {
        kind: "short_answer",
        text: "When does the writer water the plants?",
        options: [],
        answer: 0,
        accept: ["every morning", "in the morning", "morning"],
        explain: "„I water the plants every morning.“ — „water“ burada fiil.",
      },
    ],
  },
  {
    id: "en-a1-u18-r2",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 18,
    title: "It doesn't work",
    genre: "dialogue",
    intro: "Arıza bildiriliyor. Hangi arıza kimin işi?",
    gloss: [
      { de: "hall", tr: "koridor" },
      { de: "What is wrong?", tr: "sorun ne" },
      { de: "of course", tr: "tabii ki" },
    ],
    minutes: 4,
    text:
      "Ela: Hello. I have a problem in my apartment.\n" +
      "Office: Good morning. What is wrong?\n" +
      "Ela: The tap in the kitchen is broken. It doesn't work.\n" +
      "Office: Only the tap? Is the water in the bathroom good?\n" +
      "Ela: Yes, the bathroom is fine. But there is water on the floor.\n" +
      "Office: I understand. Can you call me this afternoon?\n" +
      "Ela: Of course. And one more thing: the printer in the cellar doesn't work too.\n" +
      "Office: The printer is not our work. Call the shop.\n" +
      "Ela: And the telephone in the hall?\n" +
      "Office: Is it broken too? Then we come on Wednesday.\n" +
      "Ela: Can you fix the tap today? The water is everywhere!\n" +
      "Office: Yes, today. Somebody comes at four.",
    questions: [
      {
        text: "What is broken in the kitchen?",
        options: ["the tap", "the printer", "the telephone"],
        answer: 0,
        explain: "„The tap in the kitchen is broken. It doesn't work.“ — yazıcı kilerde, telefon koridorda.",
      },
      {
        text: "Who fixes the printer?",
        options: ["the shop", "the office", "nobody"],
        answer: 0,
        explain: "„The printer is not our work. Call the shop.“",
      },
      {
        kind: "truefalse",
        text: "The bathroom has a problem.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Yes, the bathroom is fine.“ — yerdeki su mutfaktan geliyor.",
      },
      {
        kind: "gapfill",
        text: "Somebody comes at ___.",
        options: [],
        answer: 0,
        accept: ["four", "4"],
        explain: "„Yes, today. Somebody comes at four.“",
      },
      {
        kind: "order",
        text: "Bildirilen arızaların sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The tap in the kitchen is broken.",
          "the printer in the cellar doesn't work too",
          "And the telephone in the hall?",
          "Can you fix the tap today?",
        ],
        explain: "Önce musluk, sonra yazıcı, sonra telefon; en son ilk arızaya dönülüyor.",
      },
      {
        kind: "short_answer",
        text: "Where is the telephone?",
        options: [],
        answer: 0,
        accept: ["in the hall", "the hall", "hall"],
        explain: "„And the telephone in the hall?“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a1-u18-l1",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 18,
    title: "Hobbies",
    genre: "dialogue",
    intro: "İki kişi hobilerini anlatıyor. „enjoy“ ve „like“ sonrası fiil nasıl geliyor?",
    gloss: [
      { de: "guitar", tr: "gitar" },
      { de: "a lot of", tr: "bir sürü" },
      { de: "free time", tr: "boş zaman" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Nil", text: "What do you do in your free time?" },
      { speaker: "Can", text: "I enjoy painting. I paint every weekend." },
      { speaker: "Nil", text: "Really? What do you paint?" },
      { speaker: "Can", text: "Trees, flowers, the garden. Sometimes I draw people too." },
      { speaker: "Nil", text: "I can't draw. My hobby is music — I play an instrument." },
      { speaker: "Can", text: "Which one?" },
      { speaker: "Nil", text: "The guitar. And I collect old videos." },
      { speaker: "Can", text: "Videos! Do you like collecting things?" },
      { speaker: "Nil", text: "Yes, very much. I have two hundred videos." },
      { speaker: "Can", text: "Two hundred! Where do you put them?" },
      { speaker: "Nil", text: "In the cellar. My apartment is small." },
      { speaker: "Can", text: "Then come to my garden. There is a lot of sun and you can draw there." },
    ],
    questions: [
      {
        text: "What is Can's hobby?",
        options: ["painting", "music", "collecting videos"],
        answer: 0,
        explain: "„I enjoy painting. I paint every weekend.“ — müzik ve video Nil'in.",
      },
      {
        text: "What instrument does Nil play?",
        options: ["the guitar", "the video", "the printer"],
        answer: 0,
        explain: "„The guitar. And I collect old videos.“",
      },
      {
        kind: "truefalse",
        text: "Nil can draw.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I can't draw. My hobby is music…“ — çizen Can.",
      },
      {
        kind: "gapfill",
        text: "Nil has two hundred ___.",
        options: [],
        answer: 0,
        accept: ["videos"],
        explain: "„Yes, very much. I have two hundred videos.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I enjoy painting.", "I enjoy painting"],
        explain: "„I enjoy painting.“ — „enjoy“ sonrası fiil hep „-ing“ alır, „to“ almaz.",
      },
      {
        kind: "short_answer",
        text: "Where does Nil put the videos?",
        options: [],
        answer: 0,
        accept: ["in the cellar", "the cellar", "cellar"],
        explain: "„In the cellar. My apartment is small.“",
      },
    ],
  },
  {
    id: "en-a1-u18-l2",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 18,
    title: "Sports",
    genre: "monologue",
    intro: "Ali sporlarını anlatıyor. Hangi spor „play“ ile, hangisi „go“ ile geliyor?",
    gloss: [
      { de: "summer", tr: "yaz" },
      { de: "winter", tr: "kış" },
      { de: "go swimming", tr: "yüzmeye gitmek" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Ali", text: "I play football every Saturday. My team is not good, but we enjoy it." },
      { speaker: "Ali", text: "Sometimes we win, sometimes not. That is sport." },
      { speaker: "Ali", text: "On Monday and Thursday I go swimming. I swim for one hour." },
      { speaker: "Ali", text: "In the summer I run in the park. In the winter I run on the stairs!" },
      { speaker: "Ali", text: "My sister plays tennis and basketball. She is in a team too." },
      { speaker: "Ali", text: "Do you play tennis? Then come with us on Sunday. We have a free place." },
    ],
    questions: [
      {
        text: "When does Ali play football?",
        options: ["every Saturday", "on Monday", "in the summer"],
        answer: 0,
        explain: "„I play football every Saturday.“ — pazartesi yüzme günü.",
      },
      {
        text: "What does Ali's sister play?",
        options: ["tennis and basketball", "football", "nothing"],
        answer: 0,
        explain: "„My sister plays tennis and basketball.“ — futbol Ali'nin.",
      },
      {
        kind: "truefalse",
        text: "Ali's team always wins.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Sometimes we win, sometimes not. That is sport.“",
      },
      {
        kind: "gapfill",
        text: "Ali swims for one ___.",
        options: [],
        answer: 0,
        accept: ["hour"],
        explain: "„On Monday and Thursday I go swimming. I swim for one hour.“",
      },
      {
        kind: "order",
        text: "Ali'nin saydığı sıra: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "I play football every Saturday.",
          "On Monday and Thursday I go swimming.",
          "In the summer I run in the park.",
          "My sister plays tennis and basketball.",
        ],
        explain: "Önce futbol, sonra yüzme, sonra koşu, en son kız kardeşi.",
      },
      {
        kind: "short_answer",
        text: "Where does Ali run in the summer?",
        options: [],
        answer: 0,
        accept: ["in the park", "the park", "park"],
        explain: "„In the summer I run in the park. In the winter I run on the stairs!“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-u18-w1",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 18,
    title: "It's broken",
    genre: "formal",
    intro: "Arıza cümlelerini yaz. Sonunda arıza formunu doldur.",
    gloss: [
      { de: "It's broken.", tr: "bozuk" },
      { de: "It doesn't work.", tr: "çalışmıyor" },
      { de: "Can you fix it?", tr: "onu tamir edebilir misin" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Bozuk.",
        answer: "It's broken.",
        alternatives: ["It is broken."],
        hint: "„broken“ sıfat ve „be“ ile geliyor; özne „it“ zorunlu.",
      },
      {
        kind: "build",
        tr: "Çalışmıyor.",
        answer: "It doesn't work.",
        hint: "Makine için „work“ çalışmak demek. Üçüncü tekil kişide „doesn't“.",
      },
      {
        kind: "build",
        tr: "Onu tamir edebilir misin?",
        answer: "Can you fix it?",
        hint: "„fix“ tamir etmek; „repair“ de doğru ama konuşmada bu kullanılıyor.",
      },
      {
        kind: "build",
        tr: "Bir ağaç var.",
        answer: "There is a tree.",
        hint: "Tekilde „there is“; iki ağaç olsa „there are two trees“ olurdu.",
      },
      {
        kind: "form",
        prompt: "Arıza formunu doldur.",
        facts: "Mutfak musluğu; bozuk; yerde su var; bugün tamir.",
        fields: [
          { label: "Room", answer: "kitchen", accept: ["the kitchen"] },
          { label: "Problem", answer: "tap", accept: ["the tap", "broken tap"] },
          { label: "Water", answer: "on the floor", accept: ["floor"] },
          { label: "Fix", answer: "today" },
        ],
      },
    ],
  },
  {
    id: "en-a1-u18-w2",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 18,
    title: "I play football, I go swimming",
    genre: "personal",
    intro: "Hobi ve spor yaz. Top oyunları „play“ ile, tek başına yapılanlar „go“ + „-ing“ ile geliyor.",
    gloss: [
      { de: "I enjoy painting.", tr: "resim yapmaktan keyif alıyorum" },
      { de: "I play football.", tr: "futbol oynuyorum" },
      { de: "I go swimming.", tr: "yüzmeye gidiyorum" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Resim yapmaktan keyif alıyorum.",
        answer: "I enjoy painting.",
        hint: "„enjoy“ sonrası hep „-ing“; „enjoy to paint“ hiç olmaz.",
      },
      {
        kind: "build",
        tr: "Bir şeyler biriktirmeyi sever misin?",
        answer: "Do you like collecting things?",
        hint: "Soru „do“ ile, ikinci fiil „-ing“ ile. İki kural aynı cümlede.",
      },
      {
        kind: "build",
        tr: "Futbol oynuyorum.",
        answer: "I play football.",
        hint: "Top oyunlarında „play“ ve sporun önünde artikel yok: play football, play tennis.",
      },
      {
        kind: "build",
        tr: "Yüzmeye gidiyorum.",
        answer: "I go swimming.",
        hint: "Tek başına yapılanlarda „go“ + „-ing“: go swimming, go running.",
      },
      {
        kind: "build",
        tr: "Tenis oynuyor musun?",
        answer: "Do you play tennis?",
        hint: "Tenis de top oyunu: „play“. „go tennis“ yanlış olurdu.",
      },
    ],
  },
];
