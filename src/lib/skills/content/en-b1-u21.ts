import type { SkillExercise } from "../types";

/**
 * EN · B1 · Ünite 21 — "Çöp ayrımı, enerji tasarrufu, yeşil alan, iklim".
 *
 * Dört ders: Sorting the rubbish · Saving energy at home ·
 * Parks and green space · Talking about the climate.
 *
 *   Kelime: glass, collect, plastic, separate, throw, bin, metal, recycle,
 *           tap, lamp, energy, shower, warm, cool, heat, cold, park, tree,
 *           flower, grass, path, playground, bird, fountain, climate,
 *           melt, storm, weather, season, flood, drought, rain.
 *   Kalıp:  The glass is collected on Tuesdays. ·
 *           Plastic must be separated from paper. ·
 *           Nothing is thrown into the wrong bin. ·
 *           If you close the tap, you save water. ·
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
    title: "Talking about the climate",
    genre: "opinion",
    intro: "Aynı konu, üç gelecek biçimi. Hangisi kanaat, hangisi veri?",
    gloss: [
      { de: "the ice", tr: "buz" },
      { de: "forecast", tr: "tahmin" },
      { de: "measurement", tr: "ölçüm" },
      { de: "sentence", tr: "cümle" },
      { de: "the tone", tr: "ton" },
      { de: "visible", tr: "görünür" },
      { de: "continuous", tr: "sürerli" },
      { de: "whole", tr: "bütün" },
      { de: "backwards", tr: "tersine" },
      { de: "certain", tr: "kesin" },
      { de: "my own writing", tr: "kendi yazdıklarım" },
    ],
    minutes: 7,
    text:
      "Three sentences about the same subject, and the difference between them is not the tone. It is the evidence.\n" +
      "The climate will change slowly. „Will“ is the weakest of the three and the most honest here. It is a view about something nobody has a date for, and using anything stronger would be a claim I cannot support.\n" +
      "The ice is going to melt faster. „Going to“ rests on something already visible: the measurements from the last ten seasons are on a page and they point one way. Not a feeling — a line.\n" +
      "The storm is arriving on Saturday. Present continuous, and it is the strongest of the three because it is the smallest. Two days, one forecast, and the weather service has put it in a table with a time.\n" +
      "That is the whole rule and it runs backwards from the size of the claim. The more certain the evidence, the nearer the form is to the present.\n" +
      "It works outside the weather too. „I will call you“ and „I am calling you at four“ are different promises, and everybody in the room hears which one they got.\n" +
      "What I notice in my own writing is that I use „will“ where I have data and „going to“ where I have a feeling. That is exactly backwards, and it took a page of forecasts to see it.",
    questions: [
      {
        text: "Which form is the weakest?",
        options: ["will", "going to", "is arriving"],
        answer: 0,
        explain: "„„Will“ is the weakest of the three and the most honest here.“",
      },
      {
        text: "What does „going to“ rest on?",
        options: ["something already visible", "a timetable", "a feeling"],
        answer: 0,
        explain: "„„Going to“ rests on something already visible: the measurements from the last ten seasons…“",
      },
      {
        kind: "truefalse",
        text: "The strongest form is the one about the shortest time.",
        options: ["True", "False"],
        answer: 0,
        explain: "„it is the strongest of the three because it is the smallest. Two days, one forecast…“",
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
        text: "Kanıt sırası: en zayıftan en güçlüye koy.",
        options: [],
        answer: 0,
        items: [
          "The climate will change slowly.",
          "The ice is going to melt faster.",
          "The storm is arriving on Saturday.",
          "The more certain the evidence, the nearer the present.",
        ],
        explain: "Kanaat, veri, takvim, en sonda kuralın kendisi.",
      },
      {
        kind: "short_answer",
        text: "What does the writer do backwards?",
        options: [],
        answer: 0,
        accept: ["uses will with data", "will for data", "the two forms"],
        explain: "„I use „will“ where I have data and „going to“ where I have a feeling.“",
      },
    ],
  },
  {
    id: "en-b1-u21-r2",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 21,
    title: "Sorting the rubbish",
    genre: "info",
    intro: "Ayırma kuralları. Yanlış kutu neye mal oluyor?",
    gloss: [
      { de: "the bin", tr: "çöp kutusu" },
      { de: "lorry", tr: "kamyon" },
      { de: "contaminated", tr: "bozulmuş" },
      { de: "whole", tr: "bütün" },
      { de: "modal", tr: "kip" },
      { de: "passive", tr: "edilgen" },
      { de: "tape", tr: "bant" },
      { de: "spoil", tr: "bozmak" },
      { de: "unsorted", tr: "ayrılmamış" },
      { de: "behaviour", tr: "davranış" },
      { de: "leaflet", tr: "broşür" },
      { de: "rinse", tr: "durulamak" },
      { de: "container", tr: "kap" },
    ],
    minutes: 7,
    text:
      "What happens to the bins here, and why one mistake costs more than you would think.\n" +
      "The glass is collected on Tuesdays. Not weekly — every second Tuesday, and the calendar on the door of the building has the dates for the whole year on one page.\n" +
      "Plastic must be separated from paper. A modal and a passive together, and this is the line that is broken most often, usually by a box with tape on it.\n" +
      "Nothing is thrown into the wrong bin without a cost. One bag of the wrong thing does not spoil one bag; it makes the whole lorry contaminated, and a contaminated lorry goes where the unsorted rubbish goes.\n" +
      "That is the part that changes behaviour. Not the fine, not the sign — the fact that your one bag decides what happens to the other four hundred.\n" +
      "Metal and glass go together in this city and separately in the next one. There is no rule you can carry from one place to another, which is why the calendar is on the door and not in a leaflet.\n" +
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
        options: ["the whole lorry is contaminated", "only that bag is lost", "the fine is doubled"],
        answer: 0,
        explain: "„it makes the whole lorry contaminated, and a contaminated lorry goes where the unsorted rubbish goes.“",
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
    title: "Saving energy at home",
    genre: "dialogue",
    intro: "Faturayı düşüren şeyler. Hangi koşul gerçek?",
    gloss: [
      { de: "the tap", tr: "musluk" },
      { de: "bulb", tr: "ampul" },
      { de: "draught", tr: "cereyan" },
      { de: "sentence", tr: "cümle" },
      { de: "brush", tr: "fırçalamak" },
      { de: "uncomfortable", tr: "rahatsız edici" },
      { de: "visible", tr: "görünür" },
      { de: "action", tr: "eylem" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Mert", text: "The bill went up by a third and nothing in the flat changed." },
      { speaker: "Nil", text: "Something changed. Start with the shower." },
      { speaker: "Mert", text: "Unless the shower is short, the bill goes up — I know the sentence, I do not believe the size of it." },
      { speaker: "Nil", text: "Four minutes instead of nine is about eleven euros a month in a flat like yours. That is the biggest single line." },
      { speaker: "Mert", text: "And the tap?" },
      { speaker: "Nil", text: "If you close the tap while you brush your teeth, you save water and almost no money. Do it for the water." },
      { speaker: "Mert", text: "So which one is for the money?" },
      { speaker: "Nil", text: "Heat. Warm rooms you do not sit in, and the draught under the door of the cold one." },
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
        options: ["a shorter shower", "new bulbs", "the tap"],
        answer: 0,
        explain: "„Four minutes instead of nine is about eleven euros a month… That is the biggest single line.“",
      },
      {
        text: "Why should you close the tap?",
        options: ["for the water", "for the money", "for the heat"],
        answer: 0,
        explain: "„you save water and almost no money. Do it for the water.“",
      },
      {
        kind: "truefalse",
        text: "Changing the bulbs saves four euros a year.",
        options: ["True", "False"],
        answer: 0,
        explain: "„true, and it is four euros a year.“",
      },
      {
        kind: "gapfill",
        text: "A shorter shower saves about ___ euros a month.",
        options: [],
        answer: 0,
        accept: ["eleven", "11"],
        explain: "„Four minutes instead of nine is about eleven euros a month in a flat like yours.“",
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
    title: "Parks and green space",
    genre: "monologue",
    intro: "Bir park anlatılıyor. Hangi cümlede bağlaç düşüyor?",
    gloss: [
      { de: "planted", tr: "dikti" },
      { de: "the path", tr: "patika" },
      { de: "a bench", tr: "bank" },
      { de: "anywhere", tr: "başka yerde" },
      { de: "winter", tr: "kış" },
      { de: "the space", tr: "boşluk" },
      { de: "stood", tr: "durduğu" },
      { de: "towards", tr: "doğru" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Sena", text: "The park where we meet is open late, which is the reason we meet there and not anywhere else." },
      { speaker: "Sena", text: "It closes at eleven in the summer and at eight in the winter, and the eight is the one that decides how the year feels." },
      { speaker: "Sena", text: "The tree that fell was very old. Two hundred years, the sign said, and the sign is still there next to the space where it stood." },
      { speaker: "Sena", text: "They planted three in its place, which everybody says is a good thing and nobody thinks is the same thing." },
      { speaker: "Sena", text: "The woman who planted the flowers along the path lives here, in the building with the green door, and she is seventy-nine." },
      { speaker: "Sena", text: "Nobody asked her to and nobody pays her. The city cuts the grass and she does the sixty metres along the path." },
      { speaker: "Sena", text: "The playground is at the far end, away from the road, which was not an accident: four people wrote letters in 2016." },
      { speaker: "Sena", text: "What I like most is the bench near the fountain. It faces the wrong way — towards the path, not towards the water — and that is why you see people and not scenery." },
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
    title: "The storm is arriving on Saturday",
    genre: "opinion",
    intro: "Üç gelecek, üç kanıt derecesi. Hangisi kanaat, hangisi takvim?",
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
        hint: "En güçlü ve en dar: takvimde saatiyle duruyor.",
      },
      {
        kind: "build",
        tr: "Cam salı günleri toplanıyor.",
        answer: "The glass is collected on Tuesdays.",
        hint: "Edilgen ve zamansız: işleyiş anlatılıyor.",
      },
      {
        kind: "form",
        prompt: "İklim kartını doldur.",
        facts: "İklim yavaş değişecek; buz daha hızlı eriyecek; fırtına cumartesi; en güçlü biçim en dar olanı.",
        fields: [
          { label: "Climate", answer: "will change", accept: ["slowly"] },
          { label: "Ice", answer: "going to melt", accept: ["faster"] },
          { label: "Storm", answer: "Saturday", accept: ["on Saturday"] },
          { label: "Strongest form", answer: "the smallest claim", accept: ["the narrowest"] },
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
    title: "Plastic must be separated from paper",
    genre: "info",
    intro: "Kipli edilgen ve koşullar. Hangi koşul gerçek, hangisi değil?",
    gloss: [
      { de: "must be separated", tr: "ayrılmalı" },
      { de: "the tap", tr: "musluk" },
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
        answer: "If you close the tap, you save water.",
        hint: "Gerçek koşul: iki yarıda da geniş zaman.",
      },
      {
        kind: "build",
        tr: "Yeni bir lambam olsaydı daha az enerji kullanırdım.",
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
