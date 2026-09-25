import type { SkillExercise } from "../../types";

/**
 * EN · B1 — Beceriler kütüphanesi, parti 20.
 *
 * İngilizce kursun B1 satırını YİRMİYE tamamlayan son parti. Kurallar ve
 * emsal: `en-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 20 tercih ve karar hattı: pahalı bir doğum günü gezisi üzerine
 * tavsiye köşesi, mezunlar buluşması için yer seçen üç eski sınıf arkadaşı,
 * iki yaz teklifi arasında kalan kuzene e-posta. Dil bilgisi had better,
 * would rather ve prefer — güçlü öğüt ve tercih.
 */
export const enB1P20: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-lib-r20",
    course: "en",
    level: "B1",
    skill: "reading",
    title: "I'd Rather Not Go to Lisbon",
    genre: "letter",
    intro: "Bir tavsiye köşesi: arkadaşlarının pahalı doğum günü gezisine gitmek istemeyen biri yazıyor, köşe yazarı cevap veriyor.",
    gloss: [
      { de: "to celebrate", tr: "kutlamak" },
      { de: "flight", tr: "uçuş" },
      { de: "deposit", tr: "peşinat" },
      { de: "to spoil", tr: "bozmak" },
      { de: "to invent", tr: "uydurmak" },
      { de: "excuse", tr: "bahane" },
      { de: "to respect", tr: "saygı duymak" },
      { de: "to organise", tr: "düzenlemek" },
    ],
    minutes: 6,
    text:
      "Dear Maggie,\n\n" +
      "Six of my oldest friends are turning thirty this year, and someone had the idea that we " +
      "should celebrate with a long weekend in Lisbon. Everybody said yes immediately. I didn't " +
      "say anything, which they took as a yes too.\n\n" +
      "The problem is money. The flights and the flat together will cost about four hundred " +
      "pounds, and I'm saving for a deposit on a flat of my own. I'd rather spend one evening with " +
      "them here than a weekend there. But I'd hate to be the person who spoils it. What should " +
      "I do? — Quietly Counting\n\n" +
      "Dear Quietly Counting,\n\n" +
      "You'd better tell them soon, and not by message. The longer you wait, the more the plan " +
      "grows around you, and the harder it is to step out without a drama.\n\n" +
      "I'd rather you didn't invent an excuse, either. “I'm busy that weekend” will be checked " +
      "against your photos online within a day. The truth is simpler: you're saving for something " +
      "important, and four hundred pounds is too much right now. Most people respect that more " +
      "than you expect.\n\n" +
      "Then offer something. Suggest that you organise the first evening when they come back, " +
      "with their photos and your food. That way you are choosing a different part of the " +
      "celebration, not refusing all of it. — Maggie",
    questions: [
      {
        text: "Why doesn't the writer of the letter want to go to Lisbon?",
        options: [
          "The writer is afraid of flying.",
          "The writer has to work that weekend.",
          "The writer is saving for a flat.",
        ],
        answer: 2,
        explain: "„I'm saving for a deposit on a flat of my own.“",
      },
      {
        text: "How did the friends understand the writer's silence?",
        options: ["as a yes", "as a no", "as a maybe"],
        answer: 0,
        explain: "„I didn't say anything, which they took as a yes too.“",
      },
      {
        kind: "truefalse",
        text: "Maggie advises the writer to invent an excuse.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I'd rather you didn't invent an excuse“ — gerçeği söylemesini öneriyor.",
      },
      {
        kind: "gapfill",
        text: "The trip will cost about four ___ pounds.",
        options: [],
        answer: 0,
        accept: ["hundred"],
        explain: "„will cost about four hundred pounds“.",
      },
      {
        kind: "short_answer",
        text: "How should the writer not tell the friends, according to Maggie?",
        options: [],
        answer: 0,
        accept: ["by message", "not by message", "in a message"],
        explain: "„You'd better tell them soon, and not by message.“",
      },
      {
        text: "What does Maggie suggest offering?",
        options: [
          "to pay for half of the flight",
          "to organise an evening when they come back",
          "to join them for one day",
        ],
        answer: 1,
        explain: "Döndüklerinde ilk akşamı düzenlemeyi önermesini söylüyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-lib-l20",
    course: "en",
    level: "B1",
    skill: "listening",
    title: "Twenty Years Later: Where Do We Meet?",
    genre: "phone",
    intro: "Üç eski sınıf arkadaşı telefonda mezunlar buluşmasının yerini seçiyor: hangi seçenek, hangi sakınca, hangi karar.",
    gloss: [
      { de: "reunion", tr: "buluşma" },
      { de: "option", tr: "seçenek" },
      { de: "picnic", tr: "piknik" },
      { de: "to dress up", tr: "şık giyinmek" },
      { de: "hall", tr: "salon" },
      { de: "backup", tr: "yedek" },
      { de: "to split", tr: "bölüşmek" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Omar", text: "Right, the reunion. Twenty years since we left school, and we have to choose a place by Friday. Options: the Crown Hotel, the school hall, or Jana's idea." },
      { speaker: "Jana", text: "My idea is a picnic in Hilltop Park. It's free, children can come, and nobody has to dress up. I'd rather be outside than sit in a room with a DJ." },
      { speaker: "Clare", text: "I like it, but it's in June. If it rains, we've got a hundred people and nowhere to go. We'd better have a plan B." },
      { speaker: "Omar", text: "The Crown is easy. They do the food and the tables. But it's thirty pounds a person, and some people just won't come for that." },
      { speaker: "Jana", text: "I'd prefer the school hall to the hotel. At least it means something. We could look at the old photos on the walls." },
      { speaker: "Clare", text: "What if we do both? The park in the afternoon, and we book the school hall as a backup in case it rains. It's only eighty pounds." },
      { speaker: "Omar", text: "I'd rather not pay for a room we might not use, but eighty pounds split a hundred ways is nothing. Fine. Jana, you'd better check the park rules for barbecues." },
    ],
    questions: [
      {
        text: "How long ago did they leave school?",
        options: ["ten years ago", "twenty years ago", "thirty years ago"],
        answer: 1,
        explain: "„Twenty years since we left school“.",
      },
      {
        text: "What is Clare worried about?",
        options: ["the price of the hotel", "the children", "rain on the day"],
        answer: 2,
        explain: "Buluşma haziranda; yağarsa yüz kişinin gidecek yeri olmayacak.",
      },
      {
        kind: "truefalse",
        text: "The Crown Hotel costs thirty pounds a person.",
        options: ["True", "False"],
        answer: 0,
        explain: "„it's thirty pounds a person“.",
      },
      {
        kind: "gapfill",
        text: "Booking the school hall as a backup costs ___ pounds.",
        options: [],
        answer: 0,
        accept: ["eighty", "80"],
        explain: "„It's only eighty pounds.“",
      },
      {
        kind: "short_answer",
        text: "What does Jana have to check?",
        options: [],
        answer: 0,
        accept: ["the park rules for barbecues", "the park rules", "the barbecue rules"],
        explain: "„Jana, you'd better check the park rules for barbecues.“",
      },
      {
        text: "What do they decide?",
        options: [
          "a picnic with the school hall as a backup",
          "dinner at the Crown Hotel",
          "a party in the school hall only",
        ],
        answer: 0,
        explain: "Öğleden sonra park, yağmura karşı yedek olarak okul salonu.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-lib-w20",
    course: "en",
    level: "B1",
    skill: "writing",
    title: "Café or Studio?",
    genre: "email",
    intro: "Kuzenin iki yaz teklifi arasında kararsız: önce iki cümle kur, sonra dengeli ve dürüst bir tavsiye e-postası yaz.",
    gloss: [
      { de: "internship", tr: "staj" },
      { de: "design", tr: "tasarım" },
      { de: "unpaid", tr: "ücretsiz" },
      { de: "CV", tr: "özgeçmiş" },
      { de: "autumn", tr: "sonbahar" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Bence stüdyodaki işi alsan iyi olur.",
        answer: "I think you'd better take the job at the studio.",
        alternatives: ["You'd better take the job at the studio, I think."],
        hint: "Güçlü öğüt: had better ('d better) + yalın fiil; „to“ gelmez.",
      },
      {
        kind: "build",
        tr: "Açıkçası ben bütün yaz kafede çalışmaktansa stüdyoda öğrenmeyi tercih ederdim.",
        answer: "Honestly, I'd rather learn at the studio than work at the café all summer.",
        alternatives: ["I'd rather learn at the studio than work at the café all summer, honestly."],
        hint: "would rather + yalın fiil + than + yalın fiil.",
      },
      {
        kind: "free",
        prompt:
          "Kuzenin yaz için iki teklif arasında kararsız: bir kafede ücretli iş ya da bir tasarım stüdyosunda ücretsiz staj. Ona bir e-posta yaz: iki seçeneği kısaca tart, kendi tercihini gerekçesiyle söyle, dikkat etmesi gereken bir şeyi „had better“ ile belirt ve son kararın onun olduğunu söyleyerek bitir.",
        checklist: [
          "İki seçeneği kısaca tart",
          "Kendi tercihini gerekçesiyle söyle (would rather / prefer)",
          "Bir uyarıyı „had better“ ile ver",
          "Kararın onun olduğunu söyleyerek bitir",
        ],
        minWords: 100,
        phrases: [
          { de: "Thanks for asking me about …", tr: "… konusunda bana sorduğun için teşekkürler", en: "" },
          { de: "On the one hand, …; on the other hand, …", tr: "Bir yandan …; öte yandan …", en: "" },
          { de: "If it were me, I'd rather …", tr: "Ben olsam …'i tercih ederdim", en: "" },
          { de: "Whatever you choose, you'd better …", tr: "Ne seçersen seç, …-sen iyi olur", en: "" },
          { de: "In the end, it's your decision.", tr: "Sonuçta karar senin.", en: "" },
        ],
        sample:
          "Hi Kerem, thanks for asking me about the summer. I've thought about it for two days, " +
          "which is more than I usually think about my own plans. " +
          "On the one hand, the café pays well, you know the people, and you'd have money for the " +
          "autumn. On the other hand, the studio is exactly the kind of place you want to work in " +
          "after university, and they don't take many students. " +
          "If it were me, I'd rather learn at the studio than work at the café all summer. Three " +
          "months of making coffee won't look very different on your CV next year, but a real " +
          "project with real designers will. " +
          "Whatever you choose, you'd better ask the studio two things before you say yes: how many " +
          "hours they expect, and whether you will work on real projects or just make copies. " +
          "Unpaid is fine for one summer; unpaid and bored is not. " +
          "In the end, it's your decision, and I'll help either way. Your cousin, Melis",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b1-lib-s20",
    course: "en",
    level: "B1",
    skill: "speaking",
    title: "Is It Better to Live Near Your Family?",
    genre: "monologue",
    intro: "Yaklaşık bir dakika tek başına konuşacaksın: kişisel bir tercihi bir örnekle savun ve öteki tarafın hakkını ver.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Ailene yakın yaşamak mı daha iyi, uzakta yaşamak mı? Görüşünü söyle, kendi hayatından ya da çevrenden bir örnek ver, öteki tarafın avantajını kabul et ve kendi idealini söyle.",
      bulletsTr: [
        "Tercihini tek cümleyle söyle",
        "Kendi hayatından ya da çevrenden bir örnek ver",
        "Öteki tarafın avantajını kabul et",
        "Kendi idealini söyle",
      ],
      targets: [
        { de: "I'd rather live close to my family, but not too close.", tr: "Aileme yakın yaşamayı tercih ederim ama çok yakın değil." },
        { de: "When my …, living nearby meant that …", tr: "…-diğinde yakında yaşamak … demekti" },
        { de: "I know that living far away has one big advantage: …", tr: "Uzakta yaşamanın büyük bir avantajı olduğunu biliyorum: …" },
        { de: "So my ideal would be …", tr: "Yani benim idealim … olurdu" },
      ],
      minSeconds: 40,
      maxSeconds: 80,
      sampleDe:
        "I'd rather live close to my family, but not too close. Forty minutes by train seems about " +
        "right to me. " +
        "When my father was in hospital two years ago, living nearby meant that I could visit every " +
        "evening after work instead of taking a week off and sleeping on a sofa. My brother lives " +
        "in another country, and he felt terrible that he couldn't help. He sent money, but money " +
        "wasn't what my mother needed; she needed someone to sit with her. " +
        "I know that living far away has one big advantage: you become an adult on your own terms. " +
        "Nobody drops in on a Sunday with opinions about your kitchen, and you make decisions " +
        "without checking what your parents think. " +
        "So my ideal would be a place close enough for an emergency, but far enough that every " +
        "visit is a choice, not a habit.",
      rubricHint:
        "Açık bir tercih, somut bir örnek, öteki tarafa ödün ve kişisel bir ideal beklenir; „I'd rather“, „one big advantage“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b1-lib-g20",
    course: "en",
    level: "B1",
    skill: "grammar",
    title: "You'd better go, I'd rather stay",
    genre: "grammar",
    intro: "„-sen iyi olur“ ve „-meyi tercih ederim“ Türkçede kolaydır; İngilizcede üç kalıbın her biri başka bir arkadaş ister: yalın fiil, „than“ ya da „to“.",
    focus: "had better, would rather + yalın fiil ve prefer: güçlü öğüt ve tercih (özneli „I'd rather you …“ değil)",
    gloss: [
      { de: "umbrella", tr: "şemsiye" },
      { de: "to miss", tr: "kaçırmak" },
      { de: "boss", tr: "patron" },
      { de: "to hurry", tr: "acele etmek" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "had better: güçlü öğüt ve uyarı",
        tr: "„had better“ (kısaca „'d better“) şimdi ya da yakın gelecek için GÜÇLÜ bir öğüttür ve çoğu zaman bir uyarı taşır: yapmazsan kötü bir şey olur. Biçim geçmiş gibi görünse de anlam şimdiki zamandır. Arkasından yalın fiil gelir; olumsuzu „had better not“.",
        examples: [
          { de: "You'd better leave now, or you'll miss the train.", tr: "Şimdi çıksan iyi olur, yoksa treni kaçırırsın.", note: "uyarı" },
          { de: "We'd better not tell her yet.", tr: "Ona henüz söylemesek iyi olur.", note: "olumsuz: better not" },
          { de: "I'd better call my mother tonight.", tr: "Bu akşam annemi arasam iyi olur.", note: "kendine öğüt" },
        ],
      },
      {
        heading: "would rather: tercih",
        tr: "„would rather“ (kısaca „'d rather“) bir tercihi söyler ve arkasından yalın fiil gelir. İki şeyi karşılaştırırken „than“ kullanılır; olumsuzu „would rather not“.",
        examples: [
          { de: "I'd rather walk than wait for the bus.", tr: "Otobüs beklemektense yürümeyi tercih ederim.", note: "rather … than" },
          { de: "She'd rather not talk about it.", tr: "Bu konuda konuşmamayı tercih ediyor.", note: "olumsuz" },
          { de: "Would you rather stay in or go out tonight?", tr: "Bu akşam evde kalmayı mı tercih edersin, dışarı çıkmayı mı?", note: "soru" },
        ],
      },
      {
        heading: "prefer: genel tercih",
        tr: "„prefer“ çoğu zaman genel bir tercihi anlatır ve iki şeyi „to“ ile karşılaştırır: „I prefer tea to coffee.“ Fiillerle „-ing … to -ing“ kullanılır. Tek bir durum için „would prefer to“ gelir.",
        examples: [
          { de: "I prefer tea to coffee.", tr: "Çayı kahveye tercih ederim.", note: "prefer A to B" },
          { de: "He prefers walking to driving.", tr: "Yürümeyi araba kullanmaya tercih eder.", note: "-ing to -ing" },
          { de: "I'd prefer to stay at home tonight.", tr: "Bu akşam evde kalmayı tercih ederim.", note: "tek durum: would prefer to" },
        ],
      },
    ],
    questions: [
      {
        text: "It's going to rain. You'd better ___ an umbrella.",
        options: ["take", "to take", "taking"],
        answer: 0,
        explain: "„had better“ arkasından yalın fiil gelir.",
      },
      {
        text: "I'd rather stay at home ___ go to the party.",
        options: ["to", "than", "that"],
        answer: 1,
        explain: "„would rather“ iki seçeneği „than“ ile karşılaştırır.",
      },
      {
        text: "Which sentence is correct?",
        options: ["I prefer coffee than tea.", "I'd rather to walk.", "I prefer coffee to tea."],
        answer: 2,
        explain: "„prefer A to B“; „would rather“ ise „to“ almaz.",
      },
      {
        kind: "gapfill",
        text: "We'd better ___ be late. The boss is already angry. (negative)",
        options: [],
        answer: 0,
        accept: ["not"],
        explain: "Olumsuz biçim „had better not“ + yalın fiil.",
      },
      {
        kind: "gapfill",
        text: "She prefers swimming ___ running.",
        options: [],
        answer: 0,
        accept: ["to"],
        explain: "„prefer“ iki şeyi „to“ ile karşılaştırır.",
      },
      {
        kind: "gapfill",
        text: "Would you ___ sit by the window or by the door?",
        options: [],
        answer: 0,
        accept: ["rather"],
        explain: "Tercih sorusu: Would you rather + yalın fiil?",
      },
      {
        kind: "gapfill",
        text: "I'd prefer ___ eat later, if that's OK.",
        options: [],
        answer: 0,
        accept: ["to"],
        explain: "Tek bir durumdaki tercih: would prefer to + yalın fiil.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["You'd better", "check", "the tickets", "again"],
        explain: "had better + yalın fiil + nesne.",
      },
      {
        kind: "truefalse",
        text: "„I'd rather not talk about it.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Olumsuz tercih: would rather not + yalın fiil.",
      },
      {
        kind: "truefalse",
        text: "„You'd better to hurry.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„had better“ „to“ almaz: „You'd better hurry.“",
      },
    ],
  },
];
