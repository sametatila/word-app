import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 10 — "Okumadaki fark, metin ne kadar söylüyor,
 * demek istediğinden azını söylemek, uzun bir denemeyi bir arada tutmak".
 *
 * Dört ders: The difference in reading · How much the text says ·
 * Saying less than you mean · Holding a long essay together.
 *
 *   Kelime: strangeness, otherness, demeanor, milieu, purity, artifact,
 *           stigma, mundane, permeate, ostracize, exoticism, hearty,
 *           estrangement, headstrong, inquisitive, multilayeredness,
 *           predisposition, wrath, resentment, emancipation, stagnate, subside.
 *   Kalıp:  Much as we like to call it strangeness, it is really otherness. ·
 *           Her demeanor, albeit formal, fits the milieu. ·
 *           Although a symbol of purity, the artifact bears a stigma. ·
 *           The scene may well be mundane rather than highly symbolic. ·
 *           A time-honored reading might permeate a whole field. ·
 *           A culture may hand down its exoticism and ostracize the doubter. ·
 *           The meal was hearty; the welcome, less so. ·
 *           We never become estranged here; we just name the estrangement later. ·
 *           A headstrong child, they said, and rather inquisitive. ·
 *           The multilayeredness described above explains the predisposition discussed below. ·
 *           This wrath, as noted earlier, grows out of an old resentment. ·
 *           Where emancipation stagnates, the anger does not subside.
 *
 * Ünitenin tek öğretme noktası SONA ASILAN NİTELEME. İsmi tanımlayan her
 * şey İngilizcede ismin ARDINA, parça parça asılabiliyor („the
 * multilayeredness described above“, „the resentment in the first chapter
 * that nobody answered“) ve öbek yol boyunca her noktada tamamlanmış oluyor; Almanca
 * aynı öbeği ÖNDEN kuruyor, ismin önünde erken açılan ve isim gelene dek
 * kapanmayan bir parantezle, ve okurun ortada durabileceği bir yer yok.
 * Yeniden ölçüm bu seviyenin açılış ipini TERSİNE çeviriyor: cümle
 * düzeyinde ağırlığı başa koyan İngilizce, isim öbeğinde ağırlığı sona
 * koyuyor; yük dağılımı dilin değil KATMANIN özelliği. Pratik sonucu da
 * var: İngilizce yazar öbeğin arkasına eklemeye devam edebiliyor, Alman
 * yazar bir parantez dolduruyor ve parantezin bir boyu var.
 */
export const enC1U10: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-u10-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 10,
    title: "The suffrage exhibition downtown",
    genre: "review",
    intro: "Kadınların oy hakkı mücadelesini anlatan bir müze sergisinin eleştirisi. Hangi oda en çok akılda kalıyor?",
    gloss: [
      { de: "fought", tr: "mücadele etti" },
      { de: "a soldier", tr: "asker" },
      { de: "property", tr: "mülk" },
      { de: "contains", tr: "içeriyor" },
      { de: "heroic", tr: "kahramanca" },
      { de: "a disappointment", tr: "hayal kırıklığı" },
      { de: "deserve", tr: "hak etmek" },
      { de: "the exit", tr: "çıkış" },
      { de: "a granddaughter", tr: "torun" },
      { de: "a marcher", tr: "yürüyüşçü" },
      { de: "wrath", tr: "öfke" },
      { de: "resentment", tr: "kırgınlık" },
      { de: "emancipation", tr: "özgürleşme" },
      { de: "stagnate", tr: "durgunlaşmak" },
      { de: "subside", tr: "dinmek" },
      { de: "the vote", tr: "oy hakkı" },
    ],
    minutes: 12,
    text:
      "The new exhibition at the City Museum, which opened on Saturday and runs until March, tells the story of the women who fought for the vote in this state between 1890 and 1920.\n" +
      "The first room, filled with posters printed by hand in kitchens and church halls, sets the tone. The posters are polite. The letters displayed in the second room are not. Written by women who had been refused a vote for thirty years, they are full of a wrath that the posters were careful to hide.\n" +
      "This wrath, as the labels point out, grew out of an old resentment. Women in the state had paid taxes, run farms and raised soldiers, and a law passed in 1870 still treated them as the property of their husbands. Where emancipation stagnated, the anger did not subside; it moved from the letters to the street.\n" +
      "The third room, the one most visitors will remember, contains photographs taken during the march of 1913, when four thousand women walked from the station to the state house in the rain. The faces seen in these pictures are not heroic. They are tired, wet and very determined.\n" +
      "The weakest part of the show is the final room, devoted to the years after the vote was won. The story told there is too tidy. The disappointments described in letters from the 1920s, when many of the same women found that the vote changed less than they had hoped, deserve more than one small case near the exit.\n" +
      "Still, this is an exhibition worth an afternoon. Allow two hours, and leave time for the short film shown every hour in the basement, which uses the recorded voices of the granddaughters of the marchers.",
    questions: [
      {
        text: "What are the letters in the second room full of?",
        options: ["anger", "jokes", "numbers"],
        answer: 0,
        explain: "„they are full of a wrath that the posters were careful to hide.“",
      },
      {
        text: "How many women walked in the march of 1913?",
        options: ["four thousand", "four hundred", "thirty"],
        answer: 0,
        explain: "„four thousand women walked from the station to the state house in the rain.“",
      },
      {
        kind: "truefalse",
        text: "The reviewer thinks the story in the final room is too tidy.",
        options: ["True", "False"],
        answer: 0,
        explain: "„The story told there is too tidy.“",
      },
      {
        kind: "gapfill",
        text: "Where emancipation stagnated, the anger did not ___.",
        options: [],
        answer: 0,
        accept: ["subside"],
        explain: "„Where emancipation stagnated, the anger did not subside…“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Posters printed by hand fill the first room.",
          "Angry letters are shown in the second room.",
          "Photographs of the march fill the third room.",
          "The final room covers the years after the vote.",
        ],
        explain: "Dört oda sırayla: afişler, mektuplar, fotoğraflar, oy hakkından sonraki yıllar.",
      },
      {
        kind: "short_answer",
        text: "How long should visitors allow?",
        options: [],
        answer: 0,
        accept: ["two hours", "2 hours", "two"],
        explain: "„Allow two hours, and leave time for the short film shown every hour in the basement…“",
      },
    ],
  },
  {
    id: "en-c1-u10-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 10,
    title: "A teacher in a small town",
    genre: "essay",
    intro: "Küçük bir kasabada tek yabancı öğretmen olmanın hikâyesi. Kasaba onu ne zaman kabul etti?",
    gloss: [
      { de: "a landlady", tr: "ev sahibesi" },
      { de: "chemistry", tr: "kimya" },
      { de: "ordinary", tr: "sıradan" },
      { de: "acceptance", tr: "kabul" },
      { de: "judged", tr: "yargılanmak" },
      { de: "harshly", tr: "sertçe" },
      { de: "a jar", tr: "kavanoz" },
      { de: "history", tr: "tarih" },
      { de: "albeit", tr: "gerçi" },
      { de: "demeanor", tr: "tavır" },
      { de: "the milieu", tr: "çevre" },
      { de: "a foreigner", tr: "yabancı" },
    ],
    minutes: 12,
    text:
      "Much as I like to think of myself as a good traveler, my first year in Hallstead was not easy. I arrived from Istanbul in September to teach at the local high school, and I was the only foreigner most of my students had ever met.\n" +
      "The town was kind, albeit in its own careful way. People said hello in the street and asked where I was from, but for months nobody invited me into their home. My landlady was a good example. Her demeanor, albeit formal, fitted the milieu perfectly: she brought me soup when I was sick and never once asked how I was feeling.\n" +
      "Although a small place, Hallstead has strong opinions. I learned this at the first parents' evening, when a father asked me, politely but firmly, whether I planned to teach his son about my religion. I said I planned to teach him chemistry.\n" +
      "Much as I wanted to be angry, I understood the question. For him I was not a person yet; I was a story he had heard on the news. The only way to change that was to stay long enough to become boring.\n" +
      "It took about eight months. In May the same father stopped me in the supermarket to complain about the grades of his son, and I realized, with some joy, that I had become an ordinary teacher.\n" +
      "Although a sign of acceptance, that complaint was also a warning. Being ordinary meant I would be judged like everyone else, and some of my colleagues were judged harshly.\n" +
      "I stayed three years in the end. When I left, my landlady gave me a jar of her soup and said nothing at all, which in Hallstead counts as a long speech.",
    questions: [
      {
        text: "What did the writer teach?",
        options: ["chemistry", "religion", "history"],
        answer: 0,
        explain: "„I said I planned to teach him chemistry.“",
      },
      {
        text: "When did the father complain about his son's grades?",
        options: ["in May", "in September", "at the first parents' evening"],
        answer: 0,
        explain: "„In May the same father stopped me in the supermarket to complain about the grades of his son…“",
      },
      {
        kind: "truefalse",
        text: "People invited the writer into their homes in the first weeks.",
        options: ["True", "False"],
        answer: 1,
        explain: "„for months nobody invited me into their home.“",
      },
      {
        kind: "gapfill",
        text: "The town was kind, ___ in its own careful way.",
        options: [],
        answer: 0,
        accept: ["albeit"],
        explain: "„The town was kind, albeit in its own careful way.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The writer arrived in September to teach.",
          "A father asked about religion at the parents' evening.",
          "The father complained about his son's grades.",
          "The landlady gave the writer a jar of soup.",
        ],
        explain: "Geliş, ilk karşılaşma, sıradanlaşma, en sonda veda.",
      },
      {
        kind: "short_answer",
        text: "How long did the writer stay in Hallstead?",
        options: [],
        answer: 0,
        accept: ["three years", "3 years", "three"],
        explain: "„I stayed three years in the end.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-u10-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 10,
    title: "Meeting the girlfriend's parents",
    genre: "dialogue",
    intro: "Berk, kız arkadaşının ailesiyle geçirdiği hafta sonunu anlatıyor. Karşılama nasıldı?",
    gloss: [
      { de: "a girlfriend", tr: "kız arkadaş" },
      { de: "dramatic", tr: "dramatik" },
      { de: "shook", tr: "sıktı" },
      { de: "football", tr: "futbol" },
      { de: "shaking hands", tr: "el sıkışmak" },
      { de: "hearty", tr: "doyurucu" },
      { de: "headstrong", tr: "dik başlı" },
      { de: "inquisitive", tr: "meraklı" },
      { de: "fall out", tr: "küsmek" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Selin", text: "So, how was the weekend with the parents of your girlfriend?" },
      { speaker: "Berk", text: "Mixed. The meal was hearty; the welcome, less so." },
      { speaker: "Selin", text: "Oh no. What happened?" },
      { speaker: "Berk", text: "Nothing dramatic. Her father shook my hand, asked what I earn, and went back to the football." },
      { speaker: "Selin", text: "And her mother?" },
      { speaker: "Berk", text: "Warmer, but careful. She showed me old photos and said Leyla had been a headstrong child, and rather inquisitive. I think it was a warning." },
      { speaker: "Selin", text: "A warning for you, or for Leyla?" },
      { speaker: "Berk", text: "For me, I think. Leyla just laughed and said nothing has changed." },
      { speaker: "Selin", text: "Did you talk to her brother?" },
      { speaker: "Berk", text: "Briefly. He is friendly; his wife, less so. She spent the evening on her phone." },
      { speaker: "Selin", text: "That sounds like my family at New Year." },
      { speaker: "Berk", text: "Leyla says her family never falls out. They just stop calling each other for a year, and then somebody has a birthday." },
      { speaker: "Selin", text: "Will you go again?" },
      { speaker: "Berk", text: "At Easter. I am bringing a cake this time, and I have learned the football results." },
    ],
    questions: [
      {
        text: "How was the welcome?",
        options: ["not as good as the meal", "better than the meal", "very dramatic"],
        answer: 0,
        explain: "„The meal was hearty; the welcome, less so.“",
      },
      {
        text: "What did the father do after shaking hands?",
        options: ["went back to the football", "showed old photos", "cooked dinner"],
        answer: 0,
        explain: "„Her father shook my hand, asked what I earn, and went back to the football.“",
      },
      {
        kind: "truefalse",
        text: "The mother showed Berk old photos.",
        options: ["True", "False"],
        answer: 0,
        explain: "„She showed me old photos and said Leyla had been a headstrong child, and rather inquisitive.“",
      },
      {
        kind: "gapfill",
        text: "He is friendly; his wife, ___ so.",
        options: [],
        answer: 0,
        accept: ["less"],
        explain: "„He is friendly; his wife, less so.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The meal was hearty; the welcome, less so.", "The meal was hearty; the welcome, less so"],
        explain: "İkinci yarıda fiil ve sıfat düşmüş: „less so“ ikisinin yerini tutuyor.",
      },
      {
        kind: "short_answer",
        text: "When will Berk visit again?",
        options: [],
        answer: 0,
        accept: ["at Easter", "Easter"],
        explain: "„At Easter.“",
      },
    ],
  },
  {
    id: "en-c1-u10-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 10,
    title: "A careful first reading",
    genre: "monologue",
    intro: "Bir okuma ne zaman bir alanı kaplar? Çekince nerede duruyor?",
    gloss: [
      { de: "caution", tr: "temkin" },
      { de: "certainty", tr: "kesinlik" },
      { de: "fourth", tr: "dördüncü" },
      { de: "defense", tr: "savunma" },
      { de: "a scene", tr: "sahne" },
      { de: "an ordinary thing", tr: "sıradan şey" },
      { de: "a field", tr: "alan" },
      { de: "a footnote", tr: "dipnot" },
      { de: "the doubter", tr: "kuşku duyan" },
      { de: "expensive", tr: "pahalı" },
      { de: "a seminar", tr: "seminer" },
      { de: "a reading", tr: "okuma" },
      { de: "the evidence", tr: "kanıt" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Aylin", text: "The scene may well be mundane rather than highly symbolic. Start every reading with that sentence and half your work is already done." },
      { speaker: "Aylin", text: "That caution is not weakness. It is the only honest opening when the evidence is a single scene." },
      { speaker: "Aylin", text: "A reading that begins with certainty has decided before it looked, and a reader can hear that in the first line of a paper." },
      { speaker: "Aylin", text: "A time-honored reading might permeate a whole field. This is the danger and it is quiet, because nobody chooses it." },
      { speaker: "Aylin", text: "One paper says it, a second quotes the first, a third quotes the second, and by the fourth the claim has become a footnote nobody has checked." },
      { speaker: "Aylin", text: "The age of a reading is not evidence for it. That is the shortest rule in this seminar and the hardest one to keep." },
      { speaker: "Aylin", text: "A culture may hand down its exoticism and ostracize the doubter. The same two moves, one page higher, and now they are about people rather than papers." },
      { speaker: "Aylin", text: "What is handed down is cheap and what is asked of the doubter is expensive, and the difference in price is the whole of how a reading survives." },
      { speaker: "Aylin", text: "So when you write, mark the ordinary thing as ordinary. It costs one word and it is the only defense a paper has against its own field." },
      { speaker: "Aylin", text: "And when you read, find the first paper in the chain. It is usually shorter than you expect and it usually says less." },
    ],
    questions: [
      {
        text: "When is caution not weakness?",
        options: ["when the evidence is one scene", "when the reading is old", "when the field agrees"],
        answer: 0,
        explain: "„It is the only honest opening when the evidence is a single scene.“",
      },
      {
        text: "What is not evidence for a reading?",
        options: ["its age", "its length", "its field"],
        answer: 0,
        explain: "„The age of a reading is not evidence for it.“",
      },
      {
        kind: "truefalse",
        text: "Somebody chooses the danger in the second example.",
        options: ["True", "False"],
        answer: 1,
        explain: "„This is the danger and it is quiet, because nobody chooses it.“",
      },
      {
        kind: "gapfill",
        text: "The scene may well be ___ rather than highly symbolic.",
        options: [],
        answer: 0,
        accept: ["mundane"],
        explain: "„The scene may well be mundane rather than highly symbolic.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The scene may well be mundane rather than highly symbolic.", "The scene may well be mundane rather than highly symbolic"],
        explain: "Çekince burada zayıflık değil, dürüstlük.",
      },
      {
        kind: "short_answer",
        text: "What should you find when you read?",
        options: [],
        answer: 0,
        accept: ["the first paper", "the first one", "the start of the chain"],
        explain: "„find the first paper in the chain.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-u10-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 10,
    title: "Notes on anger and resentment",
    genre: "info",
    intro: "Öfke ve kırgınlık üzerine bir yazının cümlelerini kur, sonra sergi rehberinin kartını doldur.",
    gloss: [
      { de: "multilayeredness", tr: "çok katmanlılık" },
      { de: "a predisposition", tr: "yatkınlık" },
      { de: "wrath", tr: "gazap" },
      { de: "resentment", tr: "içerleme" },
      { de: "emancipation", tr: "özgürleşme" },
      { de: "to subside", tr: "dinmek" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Yukarıda anlatılan çok katmanlılık, aşağıda ele alınan yatkınlığı açıklıyor.",
        answer: "The multilayeredness described above explains the predisposition discussed below.",
        hint: "İki edat nesnesiz kalmış; ortaçla birlikte ismin ardına asılmış.",
      },
      {
        kind: "build",
        tr: "Bu gazap, daha önce belirtildiği gibi, eski bir içerlemeden doğuyor.",
        answer: "This wrath, as noted earlier, grows out of an old resentment.",
        hint: "Ara söz okura bunun bir yineleme olduğunu söylüyor.",
      },
      {
        kind: "build",
        tr: "Özgürleşmenin yerinde saydığı yerde öfke dinmiyor.",
        answer: "Where emancipation stagnates, the anger does not subside.",
        hint: "Sayfada değil savda bir yer gösteriyor.",
      },
      {
        kind: "build",
        tr: "Onun tavrı, resmî olsa da, muhite yakışıyor.",
        answer: "Her demeanor, albeit formal, fits the milieu.",
        hint: "„Albeit“ cümlecik istemiyor; ardında yalnız bir sıfat var.",
      },
      {
        kind: "build",
        tr: "Saflık simgesi olsa da eser bir damga taşıyor.",
        answer: "Although a symbol of purity, the artifact bears a stigma.",
        hint: "Cümle başında „albeit“ değil „although“; ardında yine fiilsiz bir isim öbeği.",
      },
      {
        kind: "form",
        prompt: "Sergi rehberi için bilgi kartını doldur.",
        facts: "Sergi mart ayına kadar açık; ilk odada elle basılmış afişler, ikinci odada öfkeli mektuplar, üçüncüde 1913 yürüyüşünün fotoğrafları var; bodrumdaki kısa film her saat gösteriliyor.",
        fields: [
          { label: "Open until", answer: "March", accept: ["the end of March"] },
          { label: "Room one", answer: "posters printed by hand", accept: ["posters", "printed posters"] },
          { label: "Room two", answer: "letters written in anger", accept: ["angry letters", "letters"] },
          { label: "Room three", answer: "photographs taken in 1913", accept: ["photographs of the march", "photographs"] },
          { label: "Film shown", answer: "every hour in the basement", accept: ["every hour", "hourly"] },
        ],
      },
    ],
  },
  {
    id: "en-c1-u10-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 10,
    title: "Being a stranger",
    genre: "info",
    intro: "Yabancı olmak üzerine bir denemenin cümlelerini kur.",
    gloss: [
      { de: "hearty", tr: "doyurucu" },
      { de: "estrangement", tr: "yabancılaşma" },
      { de: "headstrong", tr: "dik başlı" },
      { de: "inquisitive", tr: "her şeyi merak eden" },
      { de: "strangeness", tr: "tuhaflık" },
      { de: "otherness", tr: "ötekilik" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Yemek doyurucuydu; karşılama, daha az.",
        answer: "The meal was hearty; the welcome, less so.",
        hint: "İkinci yarı hem sıfatı hem fiili ödünç alıyor.",
      },
      {
        kind: "build",
        tr: "Burada hiç yabancılaşmayız; yabancılaşmayı sonradan adlandırırız.",
        answer: "We never become estranged here; we just name the estrangement later.",
        hint: "Olay yok, ad var: adlandırma sonradan geliyor.",
      },
      {
        kind: "build",
        tr: "Dik başlı bir çocuk, dediler, epey de meraklı.",
        answer: "A headstrong child, they said, and rather inquisitive.",
        hint: "Araya sokulmuş cümlecik hükümden sonra geliyor.",
      },
      {
        kind: "build",
        tr: "Ona ne kadar tuhaflık demeyi sevsek de aslında ötekiliktir.",
        answer: "Much as we like to call it strangeness, it is really otherness.",
        hint: "Biri özellik, öteki ilişki: fark nesnede değil.",
      },
      {
        kind: "build",
        tr: "Sahne son derece sembolik değil, pekâlâ sıradan olabilir.",
        answer: "The scene may well be mundane rather than highly symbolic.",
        hint: "Kanıt tek bir sahneyse tek dürüst açılış bu.",
      },
    ],
  },
];
