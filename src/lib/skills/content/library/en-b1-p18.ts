import type { SkillExercise } from "../../types";

/**
 * EN · B1 — Beceriler kütüphanesi, parti 18.
 *
 * Hücreyi YİRMİYE tamamlayan partilerden biri (11–20). Kurallar ve emsal:
 * `en-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 18 küçük yerler hattı: kışın küçük bir adada bir hafta, önünde kuyruk
 * biriken yeni bir fırın, fok görmek için tekne turu yorumu. Dil bilgisi so
 * ve such — derece ve sonuç (so … that / such a … that).
 */
export const enB1P18: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-lib-r18",
    course: "en",
    level: "B1",
    skill: "reading",
    title: "A Week on Inchmore in January",
    genre: "blog",
    intro: "Bir gezi blogu: herkesin kışın gitme dediği küçük bir adada geçen bir hafta; neler şaşırttı, ne zor oldu.",
    gloss: [
      { de: "ferry", tr: "feribot" },
      { de: "sheep", tr: "koyun" },
      { de: "storm", tr: "fırtına" },
      { de: "stuck", tr: "mahsur" },
      { de: "indoors", tr: "içeride" },
      { de: "range", tr: "çeşit" },
      { de: "cottage", tr: "kır evi" },
      { de: "to refuse", tr: "reddetmek" },
      { de: "wind", tr: "rüzgâr" },
      { de: "anyway", tr: "yine de" },
      { de: "terrible", tr: "korkunç" },
      { de: "stormy", tr: "fırtınalı" },
    ],
    minutes: 6,
    text:
      "Everyone told me not to go to Inchmore in January. The ferry only runs twice a week in " +
      "winter, the island's one café closes in October, and there are more sheep than people. " +
      "I went anyway, and it was the best week I've had in years.\n\n" +
      "The island is so small that you can walk round it in four hours. On my first morning I did " +
      "exactly that, and I met two people, both of whom stopped to ask if I was lost. By the end " +
      "of the week everyone knew my name, and several people knew what I'd had for dinner.\n\n" +
      "The weather was a surprise. I had expected such terrible storms that I would be stuck " +
      "indoors, but most days were cold, bright and completely still. It was so quiet at night " +
      "that I could hear the sea from my bed, three fields away.\n\n" +
      "There were difficult moments. The shop sells such a small range of food that I ate eggs on " +
      "four of the seven days. On Thursday the ferry was canceled because of the wind, and I had " +
      "to stay two extra nights.\n\n" +
      "I didn't mind. The woman who rented me the cottage refused to take money for those nights. " +
      "“You're not a tourist now,” she said. “You're stuck, like the rest of us.”",
    questions: [
      {
        text: "How often does the ferry run in winter?",
        options: ["twice a week", "every day", "once a month"],
        answer: 0,
        explain: "„The ferry only runs twice a week in winter“.",
      },
      {
        text: "What was surprising about the weather?",
        options: [
          "It snowed every day.",
          "It was stormy all week.",
          "Most days were bright and still.",
        ],
        answer: 2,
        explain: "Büyük fırtınalar beklemiş ama günlerin çoğu soğuk, parlak ve rüzgârsızmış.",
      },
      {
        kind: "truefalse",
        text: "The writer had to stay longer than planned.",
        options: ["True", "False"],
        answer: 0,
        explain: "Perşembe feribotu rüzgâr yüzünden iptal olmuş; iki gece fazla kalmış.",
      },
      {
        kind: "gapfill",
        text: "You can walk round the island in ___ hours.",
        options: [],
        answer: 0,
        accept: ["four", "4"],
        explain: "„you can walk round it in four hours“.",
      },
      {
        kind: "short_answer",
        text: "What did the writer eat on four of the seven days?",
        options: [],
        answer: 0,
        accept: ["eggs"],
        explain: "Dükkânda çeşit o kadar azmış ki yedi günün dördünde yumurta yemiş.",
      },
      {
        text: "Why didn't the woman take money for the extra nights?",
        options: [
          "The writer had paid in advance.",
          "She saw the writer as one of the islanders now.",
          "The ferry company paid for them.",
        ],
        answer: 1,
        explain: "„You're not a tourist now. You're stuck, like the rest of us.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-lib-l18",
    course: "en",
    level: "B1",
    skill: "listening",
    title: "Why Is There Always a Line on Birch Lane?",
    genre: "report",
    intro: "Yerel bir radyo haberi: yeni bir fırının önünde her sabah kuyruk var; fırıncı, bir müşteri ve komşular ne diyor.",
    gloss: [
      { de: "line", tr: "kuyruk" },
      { de: "to sell out", tr: "tükenmek" },
      { de: "oven", tr: "fırın" },
      { de: "trick", tr: "hile" },
      { de: "to block", tr: "önünü kapatmak" },
      { de: "entrance", tr: "giriş" },
      { de: "sidewalk", tr: "kaldırım" },
      { de: "bake", tr: "pişirmek" },
      { de: "clever", tr: "akıllıca" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Presenter", text: "If you've walked down Birch Lane before eight in the morning, you've seen it: a line of thirty people outside a bakery that only opened in March. We went to find out why." },
      { speaker: "Mr Novak", text: "Honestly, I didn't plan any of this. I bake such a small amount each day that it sells out by ten. People think it's a clever trick. It isn't. My oven is just very small." },
      { speaker: "Sarah", text: "I come every Saturday. The bread is so good that I don't mind waiting twenty minutes. And you talk to people in the line. I've made two friends there." },
      { speaker: "Presenter", text: "Not everyone is happy. The shop next door says the line blocks its entrance, and a neighbor has complained about the noise at half past six." },
      { speaker: "Mr Novak", text: "That's fair. We've painted a line on the sidewalk, so people stand on one side, and I've asked customers to keep their voices down before seven." },
      { speaker: "Presenter", text: "So will you buy a bigger oven?" },
      { speaker: "Mr Novak", text: "Maybe next year. But I'll tell you something. If the bread gets worse, the line will disappear, and it should." },
    ],
    questions: [
      {
        text: "Why does the bread sell out by ten?",
        options: [
          "Mr Novak wants to create a line.",
          "Most customers come after nine.",
          "His oven is small, so he bakes only a little.",
        ],
        answer: 2,
        explain: "„I bake such a small amount each day … My oven is just very small.“",
      },
      {
        text: "Why doesn't Sarah mind waiting?",
        options: ["The bread is very good.", "She lives next door.", "The line is short on Saturdays."],
        answer: 0,
        explain: "„The bread is so good that I don't mind waiting twenty minutes.“",
      },
      {
        kind: "truefalse",
        text: "The shop next door is happy about the line.",
        options: ["True", "False"],
        answer: 1,
        explain: "Yan dükkân kuyruğun girişini kapattığını söylüyor.",
      },
      {
        kind: "gapfill",
        text: "The bakery opened in ___.",
        options: [],
        answer: 0,
        accept: ["March"],
        explain: "„a bakery that only opened in March“.",
      },
      {
        kind: "short_answer",
        text: "What has been painted on the sidewalk?",
        options: [],
        answer: 0,
        accept: ["a line", "a line on the sidewalk", "line"],
        explain: "„We've painted a line on the sidewalk, so people stand on one side“.",
      },
      {
        text: "What does Mr Novak say about a bigger oven?",
        options: ["He has already ordered one.", "Maybe next year.", "He will never buy one."],
        answer: 1,
        explain: "„Maybe next year.“ — ama ekmek kötüleşirse kuyruğun kaybolması gerektiğini de ekliyor.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-lib-w18",
    course: "en",
    level: "B1",
    skill: "writing",
    title: "Review: The Seal Trip",
    genre: "review",
    intro: "Fok görmek için katıldığın bir tekne turunu değerlendiriyorsun: önce iki cümle kur, sonra dengeli ve yararlı bir yorum yaz.",
    gloss: [
      { de: "seal", tr: "fok" },
      { de: "captain", tr: "kaptan" },
      { de: "rock", tr: "kaya" },
      { de: "whiskers", tr: "bıyık" },
      { de: "rough", tr: "dalgalı" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Dönüş yolunda deniz o kadar dalgalıydı ki iki kişi kendini kötü hissetti.",
        answer: "On the way back the sea was so rough that two people felt sick.",
        alternatives: ["The sea was so rough on the way back that two people felt sick."],
        hint: "„so“ + sıfat + „that“ + sonuç; sıfattan sonra isim gelmez.",
      },
      {
        kind: "build",
        tr: "Öğleden sonra hava öyle sıcaktı ki kimse dönmek istemedi.",
        answer: "In the afternoon we had such warm weather that nobody wanted to go back.",
        alternatives: ["We had such warm weather in the afternoon that nobody wanted to go back."],
        hint: "Sayılamayan isimden önce „such“ tek başına gelir: such warm weather („a“ yok).",
      },
      {
        kind: "free",
        prompt:
          "Fok görmek için bir tekne turuna katıldın ve bir yorum sitesine değerlendirme yazıyorsun: turu ve fiyatı tanıt, en güzel anı anlat, bir eksiğini söyle, kimlere uygun olduğunu yaz ve puanını gerekçelendir.",
        checklist: [
          "Turu ve fiyatı tanıt",
          "En güzel anı so/such … that ile anlat",
          "Bir eksiğini söyle",
          "Kimlere uygun olduğunu yaz ve puanını gerekçelendir",
        ],
        minWords: 100,
        phrases: [
          { de: "We booked the … trip for …", tr: "… turunu … için ayırttık", en: "" },
          { de: "The best moment was when …", tr: "En güzel an … olduğu zamandı", en: "" },
          { de: "It was so … that …", tr: "O kadar …-ydi ki …", en: "" },
          { de: "The one thing I'd change is …", tr: "Değiştireceğim tek şey …", en: "" },
          { de: "I'd give it … because …", tr: "… veririm çünkü …", en: "" },
        ],
        sample:
          "We booked the two-hour seal trip from Bridge Street for a Saturday in August. Tickets " +
          "were twenty-two pounds for adults and twelve for children, which felt fair for what you " +
          "get. The boat is small, with room for about twenty people, and the captain talks the " +
          "whole time, mostly about the seals and sometimes about his dog. " +
          "The best moment was when we stopped near the rocks and a young seal swam right up to the " +
          "boat. It was so close that my daughter could see its whiskers, and she hasn't stopped " +
          "talking about it since. " +
          "On the way back the sea was so rough that two people felt sick, and there is nowhere to " +
          "sit inside. The one thing I'd change is the information before you book: nobody told us " +
          "to bring warm clothes, even in summer. " +
          "It's great for families with children over five, but not for anyone who hates getting " +
          "wet. I'd give it four stars because the seals were worth every minute of the cold.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b1-lib-s18",
    course: "en",
    level: "B1",
    skill: "speaking",
    title: "Vacations at Home or Abroad?",
    genre: "monologue",
    intro: "Yaklaşık bir dakika tek başına konuşacaksın: iki seçenekten birini seç ve ötekinin hakkını ver.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Tatil için yurt dışına mı gitmeli, kendi ülkende mi kalmalı? Görüşünü söyle, kendi tatillerinden bir örnek ver, öteki seçeneğin bir avantajını kabul et ve kendi alışkanlığını söyle.",
      bulletsTr: [
        "Seçimini tek cümleyle söyle",
        "Kendi tatillerinden bir örnek ver",
        "Öteki seçeneğin bir avantajını kabul et",
        "Kendi alışkanlığını söyle",
      ],
      targets: [
        { de: "If I have to choose, I'd pick …, because …", tr: "Seçmem gerekirse …'i seçerim çünkü …" },
        { de: "The trip that changed my mind was …", tr: "Fikrimi değiştiren yolculuk …" },
        { de: "I have to admit that …", tr: "…'i kabul etmeliyim" },
        { de: "These days I try to …", tr: "Bugünlerde …-meye çalışıyorum" },
      ],
      minSeconds: 40,
      maxSeconds: 80,
      sampleDe:
        "If I have to choose, I'd pick a vacation in my own country, because I spent years going " +
        "abroad and knowing less and less about the places two hours from my home. " +
        "The trip that changed my mind was a week on the Black Sea coast with my aunt. I had " +
        "expected such a boring week that I took four books. I read none of them. The villages " +
        "were so different from the city I grew up in that I felt like a tourist, but I could talk " +
        "to everybody, and people told me things they would never tell a foreigner. " +
        "I have to admit that going abroad gives you something home can't: the feeling of being " +
        "completely new, of not understanding the menu. That is valuable, especially when you " +
        "are young. " +
        "These days I try to do one of each every year: one trip to somewhere I can't pronounce, " +
        "and one to somewhere I should have visited long ago.",
      rubricHint:
        "Açık bir seçim, kişisel bir örnek, öteki seçeneğe ödün ve kişisel bir alışkanlık beklenir; „so … that“, „I have to admit that“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b1-lib-g18",
    course: "en",
    level: "B1",
    skill: "grammar",
    title: "so tired, such a long day",
    genre: "grammar",
    intro: "Türkçedeki „o kadar … ki“ İngilizcede iki kelimeye ayrılır: sıfatın önünde „so“, isim öbeğinin önünde „such“.",
    focus: "so ile such ayrımı: so + sıfat, such (a) + isim öbeği ve that ile sonuç",
    gloss: [
      { de: "lake", tr: "göl" },
      { de: "wall", tr: "duvar" },
      { de: "cook", tr: "aşçı" },
      { de: "storm", tr: "fırtına" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "so + sıfat / zarf",
        tr: "„so“ bir sıfatın ya da zarfın önüne gelir ve arkasında isim yoktur: „so tired“, „so quickly“. „much, many, few, little“ da „so“ alır: „so many people“, „so little time“.",
        examples: [
          { de: "I was so tired after the trip.", tr: "Yolculuktan sonra çok yorgundum.", note: "so + sıfat" },
          { de: "She speaks so quickly.", tr: "Çok hızlı konuşuyor.", note: "so + zarf" },
          { de: "There were so many people on the beach.", tr: "Plajda çok fazla insan vardı.", note: "so many + çoğul" },
        ],
      },
      {
        heading: "such + (a) + sıfat + isim",
        tr: "„such“ bir isim öbeğinin önüne gelir: tekil sayılabilen isimde „such a/an“, çoğul ve sayılamayan isimde yalnız „such“ kullanılır. „a so long day“ yanlıştır.",
        examples: [
          { de: "It was such a long day.", tr: "Çok uzun bir gündü.", note: "such a + tekil isim" },
          { de: "They're such nice people.", tr: "Çok iyi insanlar.", note: "çoğul: a yok" },
          { de: "We had such bad weather.", tr: "Hava çok kötüydü.", note: "sayılamaz: a yok" },
        ],
      },
      {
        heading: "… that: sonucu bağlamak",
        tr: "İkisi de „that“ ile bir sonuç cümlesine bağlanır ve Türkçedeki „o kadar … ki“ yapısının tam karşılığıdır. Konuşmada „that“ çoğu zaman düşer.",
        examples: [
          { de: "It was so cold that the lake froze.", tr: "O kadar soğuktu ki göl dondu.", note: "so … that" },
          { de: "It was such a cold night that the lake froze.", tr: "O kadar soğuk bir geceydi ki göl dondu.", note: "such a … that" },
          { de: "The film was so funny I cried.", tr: "Film o kadar komikti ki ağladım.", note: "that düşebilir" },
        ],
      },
    ],
    questions: [
      {
        text: "The hotel was ___ expensive that we left after one night.",
        options: ["such", "so", "such an"],
        answer: 1,
        explain: "Arkada isim yok, yalnız sıfat var: „so expensive“.",
      },
      {
        text: "It was ___ that everyone stayed inside.",
        options: ["so a bad storm", "such bad storm", "such a bad storm"],
        answer: 2,
        explain: "Tekil sayılabilen isim öbeği: „such a bad storm“.",
      },
      {
        text: "Which sentence is correct?",
        options: [
          "They were such kind neighbors.",
          "They were such a kind neighbors.",
          "They were so kind neighbors.",
        ],
        answer: 0,
        explain: "Çoğul isim öbeğinde „such“ tek başına gelir, „a“ almaz.",
      },
      {
        kind: "gapfill",
        text: "We had ___ good weather that we ate outside every day. (so / such)",
        options: [],
        answer: 0,
        accept: ["such"],
        explain: "„weather“ sayılamaz bir isim: „such good weather“.",
      },
      {
        kind: "gapfill",
        text: "The room was ___ small that the bed touched both walls. (so / such)",
        options: [],
        answer: 0,
        accept: ["so"],
        explain: "Arkada yalnız sıfat var: „so small“.",
      },
      {
        kind: "gapfill",
        text: "She's such ___ good cook. (a / an / —)",
        options: [],
        answer: 0,
        accept: ["a"],
        explain: "Tekil sayılabilen isim: „such a good cook“.",
      },
      {
        kind: "gapfill",
        text: "There were ___ many people that we couldn't move. (so / such)",
        options: [],
        answer: 0,
        accept: ["so"],
        explain: "„many“ önünde „so“ kullanılır: „so many people“.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["It was", "such a", "long day", "that I fell asleep"],
        explain: "such a + sıfat + isim + that + sonuç.",
      },
      {
        kind: "truefalse",
        text: "„It was so a nice evening.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "İsim öbeği var: „It was such a nice evening.“",
      },
      {
        kind: "truefalse",
        text: "„The film was so funny that I cried.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "so + sıfat + that + sonuç; cümle doğru.",
      },
    ],
  },
];
