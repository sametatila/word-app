import type { SkillExercise } from "../../types";

/**
 * EN · A2 — Beceriler kütüphanesi, parti 4.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 4. seti taşır (kimlik sonu 4).
 * Kurallar ve emsal: `en-a2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Alan adı `de` İngilizce metni taşır; `en` alanı bu kursta yazılmaz.
 * Türler: yerel haber, iş yeri diyaloğu ve toplantı notu. Söyleyiş odağı
 * yazılan ama okunmayan harfler; dil bilgisi sayılabilenler ve much/many.
 */
export const enA2P4: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a2-lib-r4",
    course: "en",
    level: "A2",
    skill: "reading",
    title: "A Fridge on the Street",
    genre: "Haber",
    intro: "Sokağa konmuş bir buzdolabını anlatan yerel haberi okuyacaksın: fikir kimden çıktı, kurallar neler, sonuç ne.",
    gloss: [
      { de: "fridge", tr: "buzdolabı" },
      { de: "throw away", tr: "atmak" },
      { de: "enough", tr: "yeterli" },
      { de: "packet", tr: "paket" },
      { de: "date", tr: "tarih" },
      { de: "volunteer", tr: "gönüllü" },
    ],
    minutes: 5,
    text:
      "A FRIDGE ON THE STREET\n\n" +
      "Since April there has been a fridge in front of the old post office in Mill Street. Anybody can put food " +
      "in it, and anybody can take food out. Nobody has to explain why.\n\n" +
      "The idea came from a group of six people from the neighborhood. “We saw two things,” says Ola Brenner, " +
      "one of them. “Shops throw away good food every evening, and some people in this street do not have " +
      "enough. The fridge is the shortest way between the two.”\n\n" +
      "Three shops and one bakery bring things every day. There are rules: no meat, no fish, no open packets, " +
      "and every person checks the date.\n\n" +
      "Two volunteers clean the fridge in the morning and in the evening. “Most days it is empty by eight,” " +
      "says Ola. “That is not a problem. That is the answer.”",
    questions: [
      {
        text: "What is the fridge for?",
        options: ["sharing food in the street", "keeping food for the shops", "selling cheap food"],
        answer: 0,
        explain: "„Anybody can put food in it, and anybody can take food out.“",
      },
      {
        text: "What can you not put in the fridge?",
        options: ["meat and fish", "bread and cake", "fruit and vegetables"],
        answer: 0,
        explain: "„There are rules: no meat, no fish, no open packets …“",
      },
      {
        kind: "truefalse",
        text: "You have to say why you take food.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Nobody has to explain why.“",
      },
      {
        kind: "gapfill",
        text: "The fridge stands in front of the old ___ office.",
        options: [],
        answer: 0,
        accept: ["post"],
        explain: "„… a fridge in front of the old post office in Mill Street.“",
      },
      {
        kind: "short_answer",
        text: "How often do volunteers clean the fridge?",
        options: [],
        answer: 0,
        accept: ["twice a day", "two times a day", "morning and evening"],
        explain: "„Two volunteers clean the fridge in the morning and in the evening.“",
      },
      {
        text: "What does Ola mean at the end?",
        options: [
          "An empty fridge shows that it works.",
          "The fridge is too small for the street.",
          "People take much more than they need.",
        ],
        answer: 0,
        explain: "„Most days it is empty by eight … That is not a problem. That is the answer.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a2-lib-l4",
    course: "en",
    level: "A2",
    skill: "listening",
    title: "A Present for Kerem",
    genre: "Diyalog",
    intro: "İki iş arkadaşı ayrılan bir meslektaşları için hazırlık yapıyor: ne alınacak, ne kadar toplanacak, kim ne yapacak.",
    gloss: [
      { de: "present", tr: "hediye" },
      { de: "collect", tr: "toplamak" },
      { de: "pot", tr: "saksı" },
      { de: "soil", tr: "toprak" },
      { de: "sign", tr: "imzalamak" },
      { de: "card", tr: "kart" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Ana", text: "Have you got a minute? It's about Kerem. His last day is on the twenty-eighth." },
      { speaker: "Bruno", text: "Already? I thought he was leaving in July." },
      { speaker: "Ana", text: "No, he found a flat there faster than he expected. So we have two weeks." },
      { speaker: "Bruno", text: "Okay. Are we doing a present or just a card?" },
      { speaker: "Ana", text: "Both, I think. I asked around: most people want to give something for the garden. He talks about that balcony all the time." },
      { speaker: "Bruno", text: "Good idea. How much do we collect?" },
      { speaker: "Ana", text: "Five euros from everybody. There are nineteen of us, so that is enough for the big pots and some soil." },
      { speaker: "Bruno", text: "I can buy them on Saturday. My car is bigger than yours." },
      { speaker: "Ana", text: "Perfect. Can you also write the card and put it on the table in the kitchen? People sign it during the week." },
      { speaker: "Bruno", text: "Sure. And the cake?" },
      { speaker: "Ana", text: "Tuana is baking. Don't tell him anything, please." },
    ],
    questions: [
      {
        text: "What are Ana and Bruno planning?",
        options: [
          "a present and a card for a colleague",
          "a party for the whole office",
          "a new balcony for the kitchen",
        ],
        answer: 0,
        explain: "„Are we doing a present or just a card?“ — „Both, I think.“",
      },
      {
        text: "When is Kerem's last day?",
        options: ["on the twenty-eighth", "in July", "on Saturday"],
        answer: 0,
        explain: "„His last day is on the twenty-eighth.“ Temmuz Bruno'nun yanlış hatırladığı tarih.",
      },
      {
        kind: "truefalse",
        text: "They collect ten euros from everybody.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Five euros from everybody.“",
      },
      {
        kind: "short_answer",
        text: "What is Bruno going to buy?",
        options: [],
        answer: 0,
        accept: ["pots and soil", "the pots and some soil", "big pots and soil"],
        explain: "„… that is enough for the big pots and some soil.“ — „I can buy them on Saturday.“",
      },
      {
        kind: "dictation",
        text: "Bruno'nun neden alışverişi üstlendiğini söylediği cümleyi duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["My car is bigger than yours.", "My car is bigger than yours"],
        explain: "„My car is bigger than yours.“ — karşılaştırmada „than“ ve iyelik zamiri „yours“.",
      },
      {
        text: "What is Tuana doing?",
        options: ["baking a cake", "buying the pots", "writing the card"],
        answer: 0,
        explain: "„And the cake?“ — „Tuana is baking.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-lib-w4",
    course: "en",
    level: "A2",
    skill: "writing",
    title: "Notes from the Meeting",
    genre: "Rapor",
    intro: "Toplantıya gelemeyen bir arkadaşın için kısa not yazacaksın; önce iki cümle kur, sonra notu yaz.",
    gloss: [
      { de: "decide", tr: "karar vermek" },
      { de: "deadline", tr: "son tarih" },
      { de: "left", tr: "kalan" },
      { de: "important", tr: "önemli" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Toplantıda fazla bilgi vardı.",
        answer: "There was too much information in the meeting.",
        alternatives: ["In the meeting there was too much information."],
        hint: "„information“ sayılamaz: çoğulu yoktur ve „much“ ile kullanılır.",
      },
      {
        kind: "build",
        tr: "Kaç kişi geldi?",
        answer: "How many people came?",
        alternatives: ["How many people were there?"],
        hint: "Sayılabilen isimlerde „many“, sayılamayanlarda „much“ kullanılır.",
      },
      {
        kind: "free",
        prompt:
          "Bir iş arkadaşın toplantıya gelemedi. Ona kısa not yaz: kimler vardı, hangi kararlar alındı, hangi soru açık kaldı, son tarihler neler ve ondan ne bekleniyor.",
        checklist: [
          "Kimlerin olduğunu ve kimin olmadığını yaz",
          "En az üç kararı numaralayarak yaz",
          "Açık kalan soruyu ve kimin ilgileneceğini söyle",
          "Son tarihi ve ondan isteneni yaz",
        ],
        minWords: 40,
        phrases: [
          { de: "Here are my notes from …", tr: "…'den notlarım şöyle" },
          { de: "We decided that …", tr: "… kararı alındı" },
          { de: "One question is still open: …", tr: "Bir soru hâlâ açık: …" },
          { de: "The deadline is …", tr: "Son tarih …" },
          { de: "Please send … before …", tr: "Lütfen …'i …'den önce gönder" },
        ],
        sample:
          "Hi Marta, here are my notes from Tuesday. Nine people were there; Kerem and you were not. " +
          "We decided three things. First, the summer party is on the twelfth of July, in the garden, not in the " +
          "canteen. Second, we buy two new printers, one for each floor. Third, the Friday meeting starts at nine " +
          "now, not at half past eight. One question is still open: nobody knows how much money is left for the " +
          "training. Nina is going to ask the office on Monday. The deadline for the party list is the twentieth " +
          "of June. Please send your holiday dates to Ali before Friday. That was everything important!",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a2-lib-s4",
    course: "en",
    level: "A2",
    skill: "speaking",
    title: "Letters you do not say",
    genre: "Ses çalışması",
    intro: "İngilizcede yazılan her harf okunmaz; bu sessiz harfler kelimelerin en sık tanınmama nedenidir.",
    gloss: [
      { de: "answer", tr: "cevap" },
      { de: "hour", tr: "saat" },
      { de: "island", tr: "ada" },
      { de: "climb", tr: "tırmanmak" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "I know the answer.",
        tr: "Cevabı biliyorum.",
        hint: "„know“ baştaki k okunmaz: nou. „answer“ ortadaki w de okunmaz: AAN-sır.",
        confusions: [
          { heard: ["I ke-now the an-swer"], fix: "kn- ile başlayan kelimelerde k sessizdir; „answer“da w yoktur.", expected: "know" },
        ],
      },
      {
        de: "Write your name here, please.",
        tr: "Lütfen adını buraya yaz.",
        hint: "„write“ baştaki w okunmaz: rayt. Aynı kural „wrong“ ve „wrist“ için de geçerli.",
        confusions: [
          { heard: ["ve-rite your name"], fix: "wr- ile başlayan kelimelerde w sessizdir: rayt.", expected: "Write" },
        ],
      },
      {
        de: "Half an hour is enough.",
        tr: "Yarım saat yeter.",
        hint: "„half“ içindeki l okunmaz: haaf. „hour“ baştaki h de okunmaz: auır.",
        confusions: [
          { heard: ["hal-f an hour with h"], fix: "„half“ta l yok, „hour“da h yok: haaf ın auır.", expected: "hour" },
        ],
      },
      {
        de: "Listen! Somebody is at the door.",
        tr: "Dinle! Kapıda biri var.",
        hint: "„listen“ ortadaki t okunmaz: Lİ-sın. Aynısı „castle“ ve „often“ için de olur.",
        confusions: [
          { heard: ["Lis-ten", "listten"], fix: "st- birleşiminde t düşer: lisın.", expected: "Listen" },
        ],
      },
      {
        de: "The island is very beautiful.",
        tr: "Ada çok güzel.",
        hint: "„island“ içindeki s okunmaz: AY-lınd.",
        confusions: [
          { heard: ["is-land", "isslend"], fix: "Baştaki i uzun „ay“, arkasından gelen s ise hiç duyulmaz.", expected: "island" },
        ],
      },
      {
        de: "Could you climb the stairs?",
        tr: "Merdivenleri çıkabilir misin?",
        hint: "„could“ içindeki l okunmaz: kud. „climb“ sonundaki b de okunmaz: klaym.",
        confusions: [
          { heard: ["could with l", "climb with b"], fix: "İkisinde de bir harf yazılır ama söylenmez: kud, klaym.", expected: "climb" },
        ],
      },
      {
        de: "My friend is a foreign student.",
        tr: "Arkadaşım yabancı bir öğrenci.",
        hint: "„friend“ içindeki i okunmaz: frend. „foreign“ sonundaki g de düşer: FO-rın.",
        confusions: [
          { heard: ["fri-end", "foreign with g"], fix: "İkisi de kısalır: frend ve forın.", expected: "friend" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a2-lib-g4",
    course: "en",
    level: "A2",
    skill: "grammar",
    title: "much, many and a lot of",
    genre: "Kural",
    intro: "Türkçedeki tek „çok“ İngilizcede ikiye ayrılır ve bazı isimler hiç çoğul olmaz.",
    focus: "Sayılabilen ve sayılamayan isimler, much / many",
    gloss: [
      { de: "advice", tr: "tavsiye" },
      { de: "money", tr: "para" },
      { de: "bread", tr: "ekmek" },
      { de: "bottle", tr: "şişe" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "İki tür isim",
        tr: "Türkçede „üç bilgi“ demek sorun değildir. İngilizcede bazı isimler sayılamaz: çoğul olmazlar ve önlerine a / an gelmez. Sık kullanılanlar: information, advice, money, bread, water, work, news, furniture.",
        examples: [
          { de: "She gave me a lot of advice.", tr: "Bana çok tavsiye verdi.", note: "„advices“ olmaz" },
          { de: "I need some information.", tr: "Biraz bilgiye ihtiyacım var." },
          { de: "There is a lot of work today.", tr: "Bugün çok iş var." },
        ],
      },
      {
        heading: "many, much ve a lot of",
        tr: "Sayılabilenlerin çoğuluyla „many“, sayılamayanlarla „much“ kullanılır. „a lot of“ ikisiyle de gider ve olumlu cümlede en doğal seçimdir; „much“ daha çok soruda ve olumsuzda görülür.",
        examples: [
          { de: "How many people were there?", tr: "Kaç kişi vardı?", note: "sayılabilir" },
          { de: "I don't have much time.", tr: "Fazla vaktim yok.", note: "sayılamaz" },
          { de: "We have a lot of books.", tr: "Çok kitabımız var." },
        ],
      },
      {
        heading: "Sayma birimleri",
        tr: "Sayılamayan bir şeyi saymak istiyorsan araya bir birim koyarsın: a piece of advice, a slice of bread, a bottle of water, two pieces of information.",
        examples: [
          { de: "Can I have a bottle of water?", tr: "Bir şişe su alabilir miyim?" },
          { de: "He gave me one piece of advice.", tr: "Bana bir tavsiye verdi." },
          { de: "I ate two slices of bread.", tr: "İki dilim ekmek yedim." },
        ],
      },
    ],
    questions: [
      {
        text: "How ___ people were there?",
        options: ["many", "much", "a lot"],
        answer: 0,
        explain: "„people“ sayılabilir bir çoğuldur, bu yüzden „many“ gelir.",
      },
      {
        text: "I don't have ___ time this week.",
        options: ["much", "many", "a lot"],
        answer: 0,
        explain: "„time“ burada sayılamaz ve cümle olumsuz: much.",
      },
      {
        text: "She gave me a lot of ___.",
        options: ["advice", "advices", "an advice"],
        answer: 0,
        explain: "„advice“ sayılamaz: çoğul olmaz ve artikel almaz.",
      },
      {
        kind: "gapfill",
        text: "How ___ money do you need?",
        options: [],
        answer: 0,
        accept: ["much"],
        explain: "„money“ sayılamaz, bu yüzden „much“ kullanılır.",
      },
      {
        kind: "gapfill",
        text: "There isn't ___ bread left.",
        options: [],
        answer: 0,
        accept: ["much"],
        explain: "„bread“ sayılamaz ve cümle olumsuz: much.",
      },
      {
        kind: "gapfill",
        text: "We have too ___ chairs in this room.",
        options: [],
        answer: 0,
        accept: ["many"],
        explain: "„chairs“ sayılabilir bir çoğuldur: many.",
      },
      {
        kind: "gapfill",
        text: "Can I have a ___ of water, please?",
        options: [],
        answer: 0,
        accept: ["bottle", "glass"],
        explain: "Sayılamayan bir şeyi saymak için araya bir birim girer: a bottle of water.",
      },
      {
        kind: "order",
        text: "Soruyu doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["How", "many", "books", "do", "you", "have"],
        explain: "Soru kelimesi öbeği başta, sonra yardımcı fiil ve özne: How many books do you have?",
      },
      {
        kind: "truefalse",
        text: "„He gave me three informations.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„information“ sayılamaz; doğrusu „three pieces of information“.",
      },
      {
        kind: "truefalse",
        text: "„There is a lot of work today.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "„work“ sayılamaz ve „a lot of“ ikisiyle de kullanılabilir; cümle doğru.",
      },
    ],
  },
];
