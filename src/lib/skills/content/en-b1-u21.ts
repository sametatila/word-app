import type { SkillExercise } from "../types";

/**
 * EN · B1 · Ünite 21 — "Çöp ayrımı, enerji tasarrufu, yeşil alan, iklim".
 *
 * Dört ders: Sorting the trash · Saving energy at home ·
 * Parks and green space · Talking about the climate.
 *
 *   Kelime: glass, collect, plastic, separate, throw, bin, metal, recycle,
 *           faucet, lamp, energy, shower, warm, cool, heat, cold, park, tree,
 *           flower, grass, path, playground, bird, fountain, climate,
 *           melt, storm, weather, season, flood, drought, rain.
 *   Kalıp:  The glass is collected on Tuesdays. ·
 *           Plastic must be separated from paper. ·
 *           Nothing is thrown into the wrong bin. ·
 *           If you turn off the faucet, you save water. ·
 *           If I had a new lamp, I would use less energy. ·
 *           Unless the shower is short, the bill goes up. ·
 *           The park where we meet is open late. ·
 *           The tree that fell was very old. ·
 *           The woman who planted the flowers lives here. ·
 *           The climate will change slowly. ·
 *           The ice is going to melt faster. ·
 *           The storm is arriving on Saturday.
 *
 * Ünitenin tek öğretme noktası GELECEĞİN ÜÇ BİÇİMİ KANIT DERECESİNİ
 * GÖSTERİYOR. Ünite 4 üç biçimin üç ANLAM taşıdığını göstermişti;
 * hava ve iklim konuşmasında aynı üç biçim üç KANIT düzeyi oluyor:
 * „will“ kanaat, „going to“ elde veri var, „is arriving“ takvimde duruyor.
 * Aynı cümlenin üç biçimi, aynı olay, üç ayrı güven derecesi — ve okuyan
 * bunu sözcükten anlıyor, tondan değil.
 */
export const enB1U21: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-u21-r1",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 21,
    title: "A storm on Saturday",
    genre: "article",
    intro: "Vadiden haftalık hava ve iklim haberi. Hangi bilgi kesin, hangisi tahmin?",
    gloss: [
      { de: "the ice", tr: "buz" },
      { de: "measurement", tr: "ölçüm" },
      { de: "the valley", tr: "vadi" },
      { de: "heavy", tr: "şiddetli" },
      { de: "wind", tr: "rüzgâr" },
      { de: "clouds", tr: "bulutlar" },
      { de: "rise", tr: "yükselmek" },
      { de: "sandbags", tr: "kum torbaları" },
      { de: "further ahead", tr: "daha ileride" },
      { de: "on record", tr: "kayıtlara geçen" },
      { de: "scientists", tr: "bilim insanları" },
      { de: "data", tr: "veri" },
      { de: "register", tr: "kaydolmak" },
      { de: "noon", tr: "öğle" },
      { de: "football", tr: "futbol" },
      { de: "a match", tr: "maç" },
      { de: "the sky", tr: "gökyüzü" },
      { de: "reach", tr: "ulaşmak" },
      { de: "a bridge", tr: "köprü" },
      { de: "spring", tr: "ilkbahar" },
    ],
    minutes: 7,
    text:
      "THIS WEEK IN THE VALLEY: WEATHER AND CLIMATE\n" +
      "The storm is arriving on Saturday. The weather service has put it in its table for Saturday afternoon: heavy rain from two o'clock and strong wind until the evening. The market on the square is closing at noon, and the football match is moving to Sunday.\n" +
      "Look at the sky on Friday evening and you will see it coming. The clouds are already building over the sea, so it is going to rain hard. The question is how much.\n" +
      "The river is going to rise, too. The measurements from the last ten seasons are clear: after two days of heavy rain the water reaches the bridge. The town is putting sandbags along the path near the playground on Friday.\n" +
      "Further ahead, the picture is slower. The ice on the mountains is going to melt faster this spring, because the winter was the warmest on record. Scientists at the university think the climate will change slowly here, but they will need twenty more years of data to be sure.\n" +
      "One thing will not change: the town will send a text message to every phone if the river reaches the bridge. If you have not registered yet, you can do it on the town website.",
    questions: [
      {
        text: "What is moving to Sunday?",
        options: ["the football match", "the market", "the storm"],
        answer: 0,
        explain: "„The market on the square is closing at noon, and the football match is moving to Sunday.“",
      },
      {
        text: "Why is the ice going to melt faster?",
        options: ["the winter was the warmest on record", "the storm is coming", "the river is rising"],
        answer: 0,
        explain: "„The ice on the mountains is going to melt faster this spring, because the winter was the warmest on record.“",
      },
      {
        kind: "truefalse",
        text: "After two days of heavy rain the water reaches the bridge.",
        options: ["True", "False"],
        answer: 0,
        explain: "„after two days of heavy rain the water reaches the bridge.“",
      },
      {
        kind: "gapfill",
        text: "The storm is arriving on ___.",
        options: [],
        answer: 0,
        accept: ["Saturday"],
        explain: "„The storm is arriving on Saturday.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The storm is arriving on Saturday.",
          "The river is going to rise, too.",
          "The ice on the mountains is going to melt faster.",
          "The town will send a text message.",
        ],
        explain: "Cumartesi fırtınası, nehir, uzun vadeli iklim, en sonda uyarı mesajı.",
      },
      {
        kind: "short_answer",
        text: "How many more years of data do the scientists need?",
        options: [],
        answer: 0,
        accept: ["twenty", "twenty years", "20"],
        explain: "„they will need twenty more years of data to be sure.“",
      },
    ],
  },
  {
    id: "en-b1-u21-r2",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 21,
    title: "Bins and collection days",
    genre: "info",
    intro: "Ayırma kuralları. Yanlış kutu neye mal oluyor?",
    gloss: [
      { de: "the bin", tr: "çöp kutusu" },
      { de: "truck", tr: "kamyon" },
      { de: "contaminated", tr: "kirlenmiş" },
      { de: "whole", tr: "bütün" },
      { de: "tape", tr: "bant" },
      { de: "spoil", tr: "bozmak" },
      { de: "unsorted", tr: "ayrılmamış" },
      { de: "behavior", tr: "davranış" },
      { de: "flyer", tr: "broşür" },
      { de: "rinse", tr: "durulamak" },
      { de: "container", tr: "kap" },
    ],
    minutes: 7,
    text:
      "What happens to the bins here, and why one mistake costs more than you would think.\n" +
      "The glass is collected on Tuesdays. Not weekly — every second Tuesday, and the calendar on the door of the building has the dates for the whole year on one page.\n" +
      "Plastic must be separated from paper. This is the rule that is broken most often, usually by a box with tape on it.\n" +
      "Nothing is thrown into the wrong bin without a cost. One bag of the wrong thing does not spoil one bag; it makes the whole truck contaminated, and a contaminated truck goes where the unsorted trash goes.\n" +
      "That is the part that changes behavior. Not the fine, not the sign — the fact that your one bag decides what happens to the other four hundred.\n" +
      "Metal and glass go together in this city and separately in the next one. There is no rule you can carry from one place to another, which is why the calendar is on the door and not in a flyer.\n" +
      "The one thing nobody does and everybody could: rinse the container. Ten seconds of water, and the paper next to it in the bin stays dry enough to be used.",
    questions: [
      {
        text: "How often is the glass collected?",
        options: ["every second Tuesday", "every Tuesday", "once a month"],
        answer: 0,
        explain: "„Not weekly — every second Tuesday…“",
      },
      {
        text: "What happens with one wrong bag?",
        options: ["the whole truck is contaminated", "only that bag is lost", "the fine is doubled"],
        answer: 0,
        explain: "„it makes the whole truck contaminated, and a contaminated truck goes where the unsorted trash goes.“",
      },
      {
        kind: "truefalse",
        text: "The rules are the same in the next city.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Metal and glass go together in this city and separately in the next one.“",
      },
      {
        kind: "gapfill",
        text: "Rinsing takes ___ seconds of water.",
        options: [],
        answer: 0,
        accept: ["ten", "10"],
        explain: "„Ten seconds of water, and the paper next to it in the bin stays dry enough to be used.“",
      },
      {
        kind: "short_answer",
        text: "Where is the calendar?",
        options: [],
        answer: 0,
        accept: ["on the door", "the building door", "on the door of the building"],
        explain: "„the calendar on the door of the building has the dates for the whole year on one page.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-u21-l1",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 21,
    title: "Four minutes in the shower",
    genre: "dialogue",
    intro: "Faturayı düşüren şeyler. Hangi koşul gerçek?",
    gloss: [
      { de: "the faucet", tr: "musluk" },
      { de: "bulb", tr: "ampul" },
      { de: "draft", tr: "cereyan" },
      { de: "sentence", tr: "cümle" },
      { de: "brush", tr: "fırçalamak" },
      { de: "uncomfortable", tr: "rahatsız edici" },
      { de: "visible", tr: "görünür" },
      { de: "action", tr: "eylem" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Mert", text: "The bill went up by a third and nothing in the apartment changed." },
      { speaker: "Nil", text: "Something changed. Start with the shower." },
      { speaker: "Mert", text: "Unless the shower is short, the bill goes up — I know the sentence, I do not believe the size of it." },
      { speaker: "Nil", text: "Four minutes instead of nine is about eleven euros a month in an apartment like yours. That is the biggest single line." },
      { speaker: "Mert", text: "And the faucet?" },
      { speaker: "Nil", text: "If you turn off the faucet while you brush your teeth, you save water and almost no money. Do it for the water." },
      { speaker: "Mert", text: "So which one is for the money?" },
      { speaker: "Nil", text: "Heat. Warm rooms you do not sit in, and the draft under the door of the cold one." },
      { speaker: "Mert", text: "The lamps?" },
      { speaker: "Nil", text: "If I had a new lamp, I would use less energy. True, and it is four euros a year; people change bulbs because it feels like doing something." },
      { speaker: "Mert", text: "That is uncomfortable." },
      { speaker: "Nil", text: "It is the most useful thing I know about this. The visible action and the expensive one are almost never the same." },
      { speaker: "Mert", text: "So: shower, heat, door." },
      { speaker: "Nil", text: "In that order. And check the bill in March, not in June, because June tells you nothing about heating." },
    ],
    questions: [
      {
        text: "What is the biggest single saving?",
        options: ["a shorter shower", "new bulbs", "the faucet"],
        answer: 0,
        explain: "„Four minutes instead of nine is about eleven euros a month… That is the biggest single line.“",
      },
      {
        text: "Why should you turn off the faucet?",
        options: ["for the water", "for the money", "for the heat"],
        answer: 0,
        explain: "„you save water and almost no money. Do it for the water.“",
      },
      {
        kind: "truefalse",
        text: "Changing the bulbs saves four euros a year.",
        options: ["True", "False"],
        answer: 0,
        explain: "„True, and it is four euros a year.“",
      },
      {
        kind: "gapfill",
        text: "A shorter shower saves about ___ euros a month.",
        options: [],
        answer: 0,
        accept: ["eleven", "11"],
        explain: "„Four minutes instead of nine is about eleven euros a month in an apartment like yours.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["If I had a new lamp, I would use less energy.", "If I had a new lamp, I would use less energy"],
        explain: "Gerçek olmayan koşul: geçmiş biçim olmayan bir şimdiyi anlatıyor.",
      },
      {
        kind: "short_answer",
        text: "When should Mert check the bill?",
        options: [],
        answer: 0,
        accept: ["in March", "March", "not in June"],
        explain: "„check the bill in March, not in June, because June tells you nothing about heating.“",
      },
    ],
  },
  {
    id: "en-b1-u21-l2",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 21,
    title: "The park open late",
    genre: "monologue",
    intro: "Bir park anlatılıyor. Hangi ilgi zamiri cümleden düşemez?",
    gloss: [
      { de: "planted", tr: "dikti" },
      { de: "the path", tr: "patika" },
      { de: "a bench", tr: "bank" },
      { de: "anywhere", tr: "başka yerde" },
      { de: "winter", tr: "kış" },
      { de: "the space", tr: "boşluk" },
      { de: "stood", tr: "durduğu" },
      { de: "toward", tr: "doğru" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Sena", text: "The park where we meet is open late, which is the reason we meet there and not anywhere else." },
      { speaker: "Sena", text: "It closes at eleven in the summer and at eight in the winter, and the eight is the one that decides how the year feels." },
      { speaker: "Sena", text: "The tree that fell was very old. Two hundred years, the sign said, and the sign is still there next to the space where it stood." },
      { speaker: "Sena", text: "They planted three in its place, which everybody says is a good thing and nobody thinks is the same thing." },
      { speaker: "Sena", text: "The woman who planted the flowers along the path lives here, in the building with the green door, and she is seventy-nine." },
      { speaker: "Sena", text: "Nobody asked her to and nobody pays her. The city cuts the grass and she does the sixty meters along the path." },
      { speaker: "Sena", text: "The playground is at the far end, away from the road, which was not an accident: four people wrote letters in 2016." },
      { speaker: "Sena", text: "What I like most is the bench near the fountain. It faces the wrong way — toward the path, not toward the water — and that is why you see people and not scenery." },
    ],
    questions: [
      {
        text: "Why do they meet in that park?",
        options: ["it is open late", "it has a fountain", "it is near the road"],
        answer: 0,
        explain: "„The park where we meet is open late, which is the reason we meet there…“",
      },
      {
        text: "Who plants the flowers?",
        options: ["a woman who lives here", "the city", "the playground group"],
        answer: 0,
        explain: "„The woman who planted the flowers along the path lives here…“",
      },
      {
        kind: "truefalse",
        text: "The city pays the woman for the flowers.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Nobody asked her to and nobody pays her.“",
      },
      {
        kind: "gapfill",
        text: "The old tree was ___ hundred years old.",
        options: [],
        answer: 0,
        accept: ["two", "2"],
        explain: "„Two hundred years, the sign said…“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The tree that fell was very old.", "The tree that fell was very old"],
        explain: "Özne konumundaki „that“ düşemez.",
      },
      {
        kind: "short_answer",
        text: "Why does Sena like the bench?",
        options: [],
        answer: 0,
        accept: ["you see people", "it faces the path", "not the water"],
        explain: "„that is why you see people and not scenery.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-u21-w1",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 21,
    title: "Climate forecasts",
    genre: "opinion",
    intro: "Vadide hava ve iklim. Cümleleri kur, hava notunu doldur.",
    gloss: [
      { de: "will change", tr: "değişecek" },
      { de: "going to melt", tr: "eriyecek" },
      { de: "is arriving", tr: "geliyor" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "İklim yavaş yavaş değişecek.",
        answer: "The climate will change slowly.",
        hint: "En zayıf kanıt: kanaat. Tarih yok, veri yok.",
      },
      {
        kind: "build",
        tr: "Buz daha hızlı eriyecek.",
        answer: "The ice is going to melt faster.",
        hint: "Elde görünen veri var: ölçümler bir yöne işaret ediyor.",
      },
      {
        kind: "build",
        tr: "Fırtına cumartesi geliyor.",
        answer: "The storm is arriving on Saturday.",
        hint: "En güçlü ve en dar: takvimde günüyle duruyor.",
      },
      {
        kind: "build",
        tr: "Cam salı günleri toplanıyor.",
        answer: "The glass is collected on Tuesdays.",
        hint: "Edilgen ve zamansız: işleyiş anlatılıyor.",
      },
      {
        kind: "form",
        prompt: "Hava durumu notunu doldur.",
        facts: "Fırtına cumartesi öğleden sonra geliyor; maç pazara kaldı; nehir taşacak; dağlardaki buz bu bahar daha hızlı eriyecek.",
        fields: [
          { label: "Storm", answer: "Saturday afternoon", accept: ["on Saturday afternoon", "Saturday", "on Saturday"] },
          { label: "Football match", answer: "on Sunday", accept: ["Sunday", "moved to Sunday"] },
          { label: "River", answer: "going to flood", accept: ["is going to flood", "will flood", "flood"] },
          { label: "Ice", answer: "going to melt faster", accept: ["is going to melt faster", "melt faster", "faster"] },
        ],
      },
    ],
  },
  {
    id: "en-b1-u21-w2",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 21,
    title: "Small green habits",
    genre: "info",
    intro: "Evde ve mahallede küçük çevre alışkanlıkları. Cümleleri kur.",
    gloss: [
      { de: "must be separated", tr: "ayrılmalı" },
      { de: "the faucet", tr: "musluk" },
      { de: "planted", tr: "dikti" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Plastik kâğıttan ayrılmalı.",
        answer: "Plastic must be separated from paper.",
        hint: "Kip ve edilgen üst üste: „must“ + „be“ + üçüncü hâl.",
      },
      {
        kind: "build",
        tr: "Musluğu kapatırsan su tasarrufu yaparsın.",
        answer: "If you turn off the faucet, you save water.",
        hint: "Gerçek koşul: iki yarıda da geniş zaman.",
      },
      {
        kind: "build",
        tr: "Yeni bir lambam olsa daha az enerji kullanırdım.",
        answer: "If I had a new lamp, I would use less energy.",
        hint: "Gerçek olmayan koşul: geçmiş biçim olmayan bir şimdiyi anlatıyor.",
      },
      {
        kind: "build",
        tr: "Duş kısa olmadıkça fatura artar.",
        answer: "Unless the shower is short, the bill goes up.",
        hint: "„unless“ olumsuzluğu kendi içinde taşıyor.",
      },
      {
        kind: "build",
        tr: "Çiçekleri diken kadın burada yaşıyor.",
        answer: "The woman who planted the flowers lives here.",
        hint: "Özne konumundaki „who“ düşemez.",
      },
    ],
  },
];
