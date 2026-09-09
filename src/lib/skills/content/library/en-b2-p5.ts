import type { SkillExercise } from "../../types";

/**
 * EN · B2 — Beceriler kütüphanesi, parti 5.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 5. seti taşır (kimlik sonu 5).
 * Kurallar ve emsal: `en-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Alan adı `de` İngilizce metni taşır; `en` alanı bu kursta yazılmaz.
 * Kalan türler: dernek raporu, panel tartışması ve resmî görüş. Üçü de
 * mastar ve -ing biçimleriyle dolu; dil bilgisi bu seçim.
 */
export const enB2P5: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-lib-r5",
    course: "en",
    level: "B2",
    skill: "reading",
    title: "Clothes Collection: Two Years On",
    genre: "Rapor",
    intro: "Bir derneğin iki yıllık ara raporunu okuyacaksın: sayılar ne diyor, ne öneriliyor, hangi soru cevapsız.",
    gloss: [
      { de: "permanent", tr: "kalıcı" },
      { de: "volume", tr: "hacim" },
      { de: "share", tr: "pay" },
      { de: "operator", tr: "işletmeci" },
      { de: "insist", tr: "ısrar etmek" },
      { de: "skip", tr: "atlamak" },
      { de: "buyer", tr: "alıcı" },
    ],
    minutes: 9,
    text:
      "CLOTHES COLLECTION: TWO YEARS ON\n" +
      "Report to the members, March\n\n" +
      "Two years ago we agreed to try a monthly clothes collection instead of the permanent container that had " +
      "stood in the yard for seven years. This report explains what we learned and recommends stopping one " +
      "part of it.\n\n" +
      "Volume. We collected forty-one tons in two years, against sixty-two tons in the two years before. That " +
      "looks like a failure and it is not. The container took anything; the monthly collection takes what " +
      "somebody was willing to carry to a table and hand to a person. The share that had to be thrown away " +
      "fell from thirty-one per cent to four.\n\n" +
      "Cost. Emptying the old container cost us nothing, because the operator paid us. The monthly collection " +
      "costs about two thousand four hundred euros a year in transport. We decided to accept that when we " +
      "started, and we still recommend accepting it, for the reason below.\n\n" +
      "The reason. Fifty-eight volunteers have worked at least one collection. Nineteen of them had never done " +
      "anything with us before, and eleven now do something else as well. A container does not do that. " +
      "We did not expect to be writing a sentence like this in a report about textiles, but it is the clearest " +
      "result we have.\n\n" +
      "What we recommend stopping. The summer collection. In July and August we get almost nothing and the " +
      "volunteers who come are the same six people who never take a break. We propose to skip both months and " +
      "to use one of them for sorting instead.\n\n" +
      "What we still cannot answer. We do not know what happens to the clothes after they leave the hall. " +
      "The buyer refuses to tell us, and we have not yet decided whether to insist or to change buyer.",
    questions: [
      {
        text: "What does the report recommend?",
        options: [
          "keeping the collection but stopping it in summer",
          "going back to the old permanent container",
          "stopping the collection completely next year",
        ],
        answer: 0,
        explain: "„What we recommend stopping. The summer collection.“ — geri kalanı sürdürülüyor.",
      },
      {
        text: "Why is the smaller volume not a failure?",
        options: [
          "Far less had to be thrown away.",
          "The transport is much cheaper now.",
          "More people live in the area now.",
        ],
        answer: 0,
        explain: "„The share that had to be thrown away fell from thirty-one per cent to four.“",
      },
      {
        kind: "truefalse",
        text: "The monthly collection is cheaper than the container was.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Emptying the old container cost us nothing, because the operator paid us.“",
      },
      {
        kind: "gapfill",
        text: "The share that had to be thrown away fell to ___ per cent.",
        options: [],
        answer: 0,
        accept: ["four", "4"],
        explain: "„… fell from thirty-one per cent to four.“",
      },
      {
        kind: "short_answer",
        text: "What can the report not answer?",
        options: [],
        answer: 0,
        accept: ["what happens to the clothes", "where the clothes go", "what the buyer does"],
        explain: "„We do not know what happens to the clothes after they leave the hall.“",
      },
      {
        text: "What surprised the writers most?",
        options: [
          "the effect on volunteering",
          "the drop in the total volume",
          "the cost of the transport",
        ],
        answer: 0,
        explain: "„We did not expect to be writing a sentence like this in a report about textiles, but it is the clearest result we have.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-lib-l5",
    course: "en",
    level: "B2",
    skill: "listening",
    title: "Why Volunteers Stop",
    genre: "Panel",
    intro: "Üç konuşmacılı bir panel dinleyeceksin: gönüllüler neden ayrılıyor, çıkış görüşmeleri neden işe yaramıyor, ne yapılabilir.",
    gloss: [
      { de: "coordinate", tr: "koordine etmek" },
      { de: "finding", tr: "bulgu" },
      { de: "reduce", tr: "azaltmak" },
      { de: "honest", tr: "dürüst" },
      { de: "role", tr: "rol" },
      { de: "rarely", tr: "nadiren" },
    ],
    minutes: 9,
    segments: [
      { speaker: "Chair", text: "Our question tonight is not how to find volunteers. It is why they leave. Three people who know. Sena, you coordinate two hundred of them." },
      { speaker: "Sena", text: "And I have stopped asking people to stay. I now ask them to tell me when they are going, four weeks earlier. Almost nobody used to do that, because leaving felt like failing." },
      { speaker: "Chair", text: "Ilias, you left after six years." },
      { speaker: "Ilias", text: "I did, and I want to be honest: I did not stop because of the work. I stopped because I could not find a way to do less. It was all or nothing, and at some point nothing was easier." },
      { speaker: "Sena", text: "That is the sentence I hear most often, and it is the one thing we can actually fix." },
      { speaker: "Chair", text: "Ruth, you research this." },
      { speaker: "Ruth", text: "Two findings. First, people rarely leave because of one event; they leave after a small change that nobody noticed, like a meeting moved to an evening." },
      { speaker: "Ruth", text: "Second, they almost never say the real reason on the way out." },
      { speaker: "Ilias", text: "That is true. I said I was busy." },
      { speaker: "Ruth", text: "So exit conversations tell you very little. What tells you a lot is asking people who have just reduced their hours, because they are still there and they have already decided something." },
      { speaker: "Chair", text: "One practical thing each, and then we take questions." },
      { speaker: "Sena", text: "Offer a smaller role before somebody asks for one." },
      { speaker: "Ruth", text: "And write down what changed in the last six months. That list is usually the answer." },
    ],
    questions: [
      {
        text: "What is the question of the panel?",
        options: [
          "why volunteers leave",
          "how to find new volunteers",
          "how much volunteers should be paid",
        ],
        answer: 0,
        explain: "„Our question tonight is not how to find volunteers. It is why they leave.“",
      },
      {
        text: "Why did Ilias stop?",
        options: [
          "He could not find a way to do less.",
          "The work itself became too hard.",
          "He moved away to another town.",
        ],
        answer: 0,
        explain: "„I stopped because I could not find a way to do less. It was all or nothing.“",
      },
      {
        kind: "truefalse",
        text: "Ruth says that exit conversations are very useful.",
        options: ["True", "False"],
        answer: 1,
        explain: "„So exit conversations tell you very little.“",
      },
      {
        kind: "short_answer",
        text: "Who should you ask, according to Ruth?",
        options: [],
        answer: 0,
        accept: ["people who reduced their hours", "those who do less now", "people still there"],
        explain: "„What tells you a lot is asking people who have just reduced their hours …“",
      },
      {
        kind: "dictation",
        text: "Ilias'ın ayrılırken ne söylediğini anlattığı cümleyi duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["I said I was busy.", "I said I was busy"],
        explain: "„I said I was busy.“ — aktarımda „am“ bir adım geriye kaymış.",
      },
      {
        text: "What does Sena recommend?",
        options: [
          "offering a smaller role early",
          "asking people to promise a year",
          "paying volunteers a small amount",
        ],
        answer: 0,
        explain: "„Offer a smaller role before somebody asks for one.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-lib-w5",
    course: "en",
    level: "B2",
    skill: "writing",
    title: "Response to the Consultation",
    genre: "Resmî görüş",
    intro: "Belediyenin görüşe açtığı bir öneriye resmî yanıt yazacaksın; önce iki cümle kur, sonra görüşünü yaz.",
    gloss: [
      { de: "consultation", tr: "görüş alma" },
      { de: "amend", tr: "değiştirmek" },
      { de: "exempt", tr: "muaf tutmak" },
      { de: "slot", tr: "zaman dilimi" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Cumartesi kapatmak tek başına yığılmayı çözmez.",
        answer: "On its own, closing on Saturday will not solve the congestion.",
        alternatives: ["Closing on Saturday will not solve the congestion on its own."],
        hint: "Fiil özne olduğunda -ing biçimini alır; belirteç öbeği başta da sonda da durabilir.",
      },
      {
        kind: "build",
        tr: "Bu aşamada kuralı bir yıl ertelemeyi öneriyoruz.",
        answer: "At this stage we propose to postpone the rule for one year.",
        alternatives: ["We propose to postpone the rule for one year at this stage."],
        hint: "„propose“ hem mastar hem -ing alır; „decide“ yalnız mastar, „avoid“ yalnız -ing alır.",
      },
      {
        kind: "free",
        prompt:
          "Belediyenin görüşe açtığı bir öneriye resmî yanıt yaz: hangi kısmı desteklediğini, hangisine karşı olduğunu gerekçesiyle söyle, bir değişiklik öner ve ne beklediğini belirt.",
        stimulus:
          "Consultation: from next year, all households would have to book a time slot online before bringing " +
          "bulky waste to the yard. The yard would close on Saturdays. Comments are invited until the fifteenth " +
          "of June.",
        checklist: [
          "Desteklediğin kısmı ve nedenini yaz",
          "Karşı olduğun kısmı gerekçelendir",
          "Somut bir değişiklik öner",
          "Ne beklediğini ve tarihi yaz",
        ],
        minWords: 90,
        phrases: [
          { de: "We support the proposal to …", tr: "… önerisini destekliyoruz" },
          { de: "We object to …", tr: "…'e itiraz ediyoruz" },
          { de: "Removing … will not solve …", tr: "…'i kaldırmak …'i çözmez" },
          { de: "We propose amending …", tr: "…'in değiştirilmesini öneriyoruz" },
          { de: "We would expect …", tr: "… beklerdik" },
        ],
        sample:
          "Dear Sir or Madam,\n\n" +
          "We support the proposal to introduce booked time slots. Queuing at the gate has been the main " +
          "complaint of our members for years, and asking people to choose a time is a reasonable way of " +
          "spreading the load.\n\n" +
          "We object to closing the yard on Saturdays. The consultation document treats the two changes as one " +
          "measure, but they solve different problems. Removing the busiest day will not solve congestion; it " +
          "will move it, and it will move it onto people who cannot take a morning off work. Roughly a third of " +
          "our members work shifts, and for them Saturday is not a convenience.\n\n" +
          "We propose amending point four so that the yard stays open on Saturdays with booked slots only, and " +
          "so that households without internet access can book by telephone. Without that second part, the rule " +
          "will exempt nobody and will simply be impossible to follow for our oldest members.\n\n" +
          "We would expect a written response before the fifteenth of June, and we would be glad to provide our " +
          "own figures on Saturday use if that would help.\n\n" +
          "Yours faithfully",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b2-lib-s5",
    course: "en",
    level: "B2",
    skill: "speaking",
    title: "Promise Less or Try More?",
    genre: "Monolog",
    intro: "Bir buçuk dakikaya kadar konuşacaksın: iki tutumu karşılaştır ve kendi ölçütünü koy.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Az söz verip tutmak mı, çok söz verip denemek mi daha iyidir? İki tutumun da güçlü ve zayıf yanını söyle ve kendi ölçütünü koy.",
      bulletsTr: [
        "İki tutumu kısaca adlandır",
        "Az söz vermenin güçlü ve zayıf yanı",
        "Çok söz vermenin güçlü ve zayıf yanı",
        "Ölçütünü koy ve bir örnekle sına",
      ],
      targets: [
        { de: "Promising less has an obvious advantage: …", tr: "Az söz vermenin açık bir üstünlüğü var: …" },
        { de: "The hidden cost of … is …", tr: "…'in gizli maliyeti …" },
        { de: "It depends on whether …", tr: "… olup olmadığına bağlı" },
        { de: "My rule would be …", tr: "Kuralım … olurdu" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "Promising less has an obvious advantage: you keep your word, and people learn that your sentences mean " +
        "something. In an organization that is worth more than any single project. The hidden cost of promising " +
        "less is that nothing difficult ever gets started, because anything difficult can fail, and a person " +
        "who has decided never to fail will avoid choosing the interesting problem. Promising more has the " +
        "opposite profile. It moves things, it attracts people who want to be part of something, and it burns " +
        "exactly those people when the third promise in a row does not arrive. My rule would be to separate the " +
        "audience from the ambition. Say the ambitious thing to yourself and to your team, because they need to " +
        "know what you are aiming at. Say the careful thing to the people who are going to plan around your " +
        "answer: the funder, the neighbor, the person who cannot come on Tuesday if you are late. The mistake " +
        "is not being ambitious. It is being ambitious out loud to somebody who has to depend on it.",
      rubricHint:
        "İki tutumun da güçlü ve zayıf yanı geçmeli ve sonuç tek bir ayrımla verilmeli; mastar ve -ing biçimleri doğal olarak beklenir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b2-lib-g5",
    course: "en",
    level: "B2",
    skill: "grammar",
    title: "stop smoking or stop to smoke?",
    genre: "Kural",
    intro: "Bir fiilden sonra mastar mı yoksa -ing biçimi mi geleceği ezberlenir; birkaç fiilde ise seçim anlamı değiştirir.",
    focus: "Gerund ve infinitive",
    gloss: [
      { de: "avoid", tr: "kaçınmak" },
      { de: "solve", tr: "çözmek" },
      { de: "instead of", tr: "yerine" },
      { de: "enjoy", tr: "hoşlanmak" },
    ],
    minutes: 8,
    explanation: [
      {
        heading: "Fiil hangisini istiyor?",
        tr: "Türkçede „yüzmeyi severim“ ve „yüzmeye karar verdim“ arasında biçim farkı ektedir. İngilizcede fark, ilk fiilin hangi biçimi istediğidir. -ing isteyenler: enjoy, avoid, finish, suggest, mind, keep, practice. Mastar isteyenler: decide, hope, promise, agree, refuse, manage, offer.",
        examples: [
          { de: "I enjoy cooking in the evening.", tr: "Akşamları yemek yapmayı severim.", note: "enjoy + -ing" },
          { de: "She decided to take the job.", tr: "İşi kabul etmeye karar verdi.", note: "decide + to" },
          { de: "We avoided talking about it.", tr: "O konuyu konuşmaktan kaçındık." },
        ],
      },
      {
        heading: "Edattan sonra her zaman -ing",
        tr: "Bir edattan sonra fiil hep -ing alır: „good at solving“, „instead of waiting“, „before leaving“. En zor durum „look forward to“dur, çünkü buradaki „to“ mastar değil edattır: look forward to seeing you.",
        examples: [
          { de: "He is good at solving problems.", tr: "Sorun çözmede iyidir." },
          { de: "Instead of waiting, we walked.", tr: "Beklemek yerine yürüdük." },
          { de: "I look forward to meeting you.", tr: "Sizinle tanışmayı dört gözle bekliyorum.", note: "to + -ing" },
        ],
      },
      {
        heading: "Anlamı değiştiren üçü",
        tr: "Üç fiilde seçim anlamı değiştirir. „stop doing“ o işi bırakmak, „stop to do“ o işi yapmak için durmaktır. „remember doing“ geçmişi hatırlamak, „remember to do“ yapmayı unutmamaktır. „try doing“ denemek, „try to do“ başarmaya çalışmaktır.",
        examples: [
          { de: "I stopped buying bottled water.", tr: "Şişe su almayı bıraktım." },
          { de: "He stopped to buy water.", tr: "Su almak için durdu." },
          { de: "Remember to lock the door.", tr: "Kapıyı kilitlemeyi unutma." },
        ],
      },
    ],
    questions: [
      {
        text: "I enjoy ___ in the evening.",
        options: ["cooking", "to cook", "cook"],
        answer: 0,
        explain: "„enjoy“ her zaman -ing biçimini alır.",
      },
      {
        text: "She decided ___ the job.",
        options: ["to take", "taking", "take"],
        answer: 0,
        explain: "„decide“ mastar ister: decided to take.",
      },
      {
        text: "He is good at ___ problems.",
        options: ["solving", "solve", "to solve"],
        answer: 0,
        explain: "„at“ bir edattır ve edattan sonra fiil -ing alır.",
      },
      {
        kind: "gapfill",
        text: "We avoided ___ (talk) about it.",
        options: [],
        answer: 0,
        accept: ["talking"],
        explain: "„avoid“ yalnız -ing biçimini alır.",
      },
      {
        kind: "gapfill",
        text: "They promised ___ (call) us back.",
        options: [],
        answer: 0,
        accept: ["to call"],
        explain: "„promise“ mastar ister.",
      },
      {
        kind: "gapfill",
        text: "I look forward to ___ (meet) you.",
        options: [],
        answer: 0,
        accept: ["meeting"],
        explain: "Buradaki „to“ mastar değil edattır, bu yüzden -ing gelir.",
      },
      {
        kind: "gapfill",
        text: "Remember ___ (lock) the door before you leave.",
        options: [],
        answer: 0,
        accept: ["to lock"],
        explain: "İleride yapılacak bir işi unutmamak: remember to do.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["I", "stopped", "buying", "bottled", "water"],
        explain: "Bir alışkanlığı bırakmak: stop + -ing.",
      },
      {
        kind: "truefalse",
        text: "„He stopped to smoke“ sigarayı bıraktığı anlamına gelir.",
        options: ["True", "False"],
        answer: 1,
        explain: "Bu cümle sigara içmek için durduğunu söyler; bırakmak için „stopped smoking“ gerekir.",
      },
      {
        kind: "truefalse",
        text: "„I am looking forward to hearing from you.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "„look forward to“ edatla biter, bu yüzden arkasından -ing gelir; cümle doğru.",
      },
    ],
  },
];
