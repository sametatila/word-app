import type { SkillExercise } from "../../types";

/**
 * EN · C1 — Beceriler kütüphanesi, parti 10.
 *
 * İki kursun kütüphane hedefini kapatan son parti: bununla her kurs ×
 * beceri × seviye hücresi ONA tamamlanıyor. Kurallar ve emsal: `en-c1.ts`
 * (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 10 uzmanlık ve güven hattı: bir blog yazısı, sesli bir rehber, bir
 * blog denemesi. Dil bilgisi geçmişe bakan kiplik — needn't have, should
 * have, was to have.
 */
export const enC1P10: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-lib-r10",
    course: "en",
    level: "C1",
    skill: "reading",
    title: "Why I Stopped Saying “Studies Show”",
    genre: "blog",
    intro: "Bir blog yazısı: bir uzmanın kendi dilini gözden geçirmesi ve bunun neye mal olduğu.",
    gloss: [
      { de: "sample", tr: "örneklem" },
      { de: "authority", tr: "otorite" },
      { de: "summary", tr: "özet" },
      { de: "persuasive", tr: "ikna edici" },
      { de: "to replicate", tr: "yinelemek" },
      { de: "trade", tr: "takas" },
      { de: "genuine", tr: "hakiki" },
      { de: "science", tr: "bilim" },
      { de: "rely", tr: "bel bağlamak" },
      { de: "property", tr: "özellik" },
      { de: "efficient", tr: "verimli" },
      { de: "honesty", tr: "dürüstlük" },
      { de: "shorten", tr: "kısaltmak" },
      { de: "inform", tr: "bilgilendirmek" },
    ],
    minutes: 10,
    text:
      "Why I stopped saying “studies show”\n\n" +
      "For most of my working life I used the phrase without thinking about it. " +
      "It is efficient, it is usually true in some weak sense, and it ends arguments. " +
      "That last property should have worried me much earlier than it did.\n\n" +
      "The phrase does two things at once. It reports evidence, and it transfers authority " +
      "from the speaker to an unnamed body of work that the listener cannot check. " +
      "The second part is what makes it effective and what makes it a problem. " +
      "Nobody can disagree with “studies”. They can only disagree with me, " +
      "and I have arranged things so that doing so looks like disagreeing with science.\n\n" +
      "What changed my practice was not a philosophical argument but an embarrassment. " +
      "I said “studies show” in a meeting about screen time, " +
      "and a colleague asked, politely, which ones. " +
      "I could name one. It had a sample of fifty-four, it had not been replicated, " +
      "and I had read a summary of it eighteen months earlier. " +
      "I needn't have been so confident; nothing in what I knew justified the sentence " +
      "I had built on it.\n\n" +
      "Now I try to say the smallest true thing instead. " +
      "“One study I've read suggests” is longer, weaker and much harder to hide behind. " +
      "It also invites the question I used to dread and now rely on, which is: " +
      "how good is that study?\n\n" +
      "I'd like to report that this has made me more persuasive. " +
      "It has not. I lose arguments I used to win, including some I should have won, " +
      "because the weaker sentence is genuinely weaker and the person across the table " +
      "is still saying “studies show”. " +
      "I think it is still the right trade, but I would rather say that honestly than " +
      "pretend that honesty is always rewarded.",
    questions: [
      {
        text: "What two things does the phrase do, according to the writer?",
        options: [
          "It reports evidence and transfers authority.",
          "It simplifies and shortens.",
          "It informs and entertains.",
        ],
        answer: 0,
        explain: "İkincisi hem etkili kılıyor hem sorun yaratıyor.",
      },
      {
        text: "What changed the writer's practice?",
        options: [
          "an embarrassment in a meeting",
          "a philosophical argument",
          "a change of job",
        ],
        answer: 0,
        explain: "Bir meslektaş kibarca hangi araştırmalar diye sormuş.",
      },
      {
        kind: "truefalse",
        text: "The writer says the change has made them more persuasive.",
        options: ["True", "False"],
        answer: 1,
        explain: "„It has not.“ — eskiden kazandığı tartışmaları kaybediyor.",
      },
      {
        kind: "gapfill",
        text: "The study the writer could name had a sample of ___.",
        options: [],
        answer: 0,
        accept: ["fifty-four", "54", "fifty four"],
        explain: "„It had a sample of fifty-four“.",
      },
      {
        kind: "short_answer",
        text: "What question does the writer now rely on?",
        options: [],
        answer: 0,
        accept: [
          "how good is that study",
          "how good the study is",
          "how good that study is",
        ],
        explain: "Eskiden korktuğu soru artık dayandığı soru.",
      },
      {
        text: "How does the writer describe the trade at the end?",
        options: [
          "right, but not always rewarded",
          "clearly wrong in hindsight",
          "too costly to continue",
        ],
        answer: 0,
        explain: "Doğru takas ama dürüstlüğün her zaman ödüllendirildiğini söylemek istemiyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-lib-l10",
    course: "en",
    level: "C1",
    skill: "listening",
    title: "Saying You Were Wrong, Usefully",
    genre: "guide",
    intro: "Sesli bir rehber: yanıldığını söylemenin işe yarayan biçimi ve üç sık hata.",
    gloss: [
      { de: "correction", tr: "düzeltme" },
      { de: "credibility", tr: "inandırıcılık" },
      { de: "context", tr: "bağlam" },
      { de: "to recur", tr: "yinelenmek" },
      { de: "audience", tr: "izleyici" },
      { de: "grudging", tr: "gönülsüz" },
      { de: "appear", tr: "görünmek" },
      { de: "entire", tr: "tüm" },
      { de: "precise", tr: "kesin" },
      { de: "broad", tr: "geniş" },
      { de: "volume", tr: "ses seviyesi" },
      { de: "passive", tr: "pasif" },
    ],
    minutes: 10,
    segments: [
      { speaker: "Presenter", text: "There is a version of admitting a mistake that repairs the damage, and a version that doubles it. The difference is almost entirely structural." },
      { speaker: "Presenter", text: "The first mistake is burying it. A correction that appears in the fourth paragraph, after three paragraphs of context, reads as an attempt to be seen to have corrected without being read." },
      { speaker: "Mr. Yildiz", text: "Put the correction in the first sentence. If your audience reads nothing else, they should still leave with the right information." },
      { speaker: "Presenter", text: "The second mistake is the grudging form: “while the broad point stands, one figure may have been imprecise.”" },
      { speaker: "Mr. Yildiz", text: "Everyone can hear what that sentence is doing. It costs you more credibility than the original error did, because the error was a mistake and this is a choice." },
      { speaker: "Presenter", text: "The third is over-correction, which sounds like the opposite but has the same root. Announcing that you can no longer be trusted on anything invites your audience to agree with you." },
      { speaker: "Mr. Yildiz", text: "State precisely what was wrong, precisely what remains, and what you have changed so that it does not recur. Three sentences. Then stop." },
      { speaker: "Presenter", text: "One further point, which people find harder than all of the above: say it in the same place and at the same volume as the original claim." },
      { speaker: "Mr. Yildiz", text: "A mistake made to four thousand people and corrected to forty has not been corrected. It has been filed." },
    ],
    questions: [
      {
        text: "What is the first mistake?",
        options: ["burying the correction", "correcting too quickly", "using technical language"],
        answer: 0,
        explain: "Dördüncü paragrafta gelen düzeltme okunmadan görünmek isteyen bir düzeltmedir.",
      },
      {
        text: "Why is the grudging form so costly?",
        options: [
          "The error was a mistake; this is a choice.",
          "It is too long.",
          "It uses passive verbs.",
        ],
        answer: 0,
        explain: "Herkes o cümlenin ne yaptığını duyuyor.",
      },
      {
        kind: "truefalse",
        text: "Over-correction is recommended as the safest option.",
        options: ["True", "False"],
        answer: 1,
        explain: "Aynı kökten gelen üçüncü hata olarak sayılıyor.",
      },
      {
        kind: "gapfill",
        text: "Mr. Yildiz recommends ___ sentences and then stopping.",
        options: [],
        answer: 0,
        accept: ["three", "3"],
        explain: "„Three sentences. Then stop.“",
      },
      {
        kind: "short_answer",
        text: "Where should the correction appear?",
        options: [],
        answer: 0,
        accept: [
          "in the first sentence",
          "first sentence",
          "at the start",
        ],
        explain: "Başka bir şey okumasalar da doğru bilgiyle ayrılsınlar.",
      },
      {
        text: "What does the final point say?",
        options: [
          "Correct at the same volume and place as the claim.",
          "Correct privately first.",
          "Wait a week before correcting.",
        ],
        answer: 0,
        explain: "Dört bine yapılıp kırka düzeltilen bir hata düzeltilmiş değil, dosyalanmıştır.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-lib-w10",
    course: "en",
    level: "C1",
    skill: "writing",
    title: "A Correction I Had to Write",
    genre: "blog",
    intro: "Bir blog yazısı yazıyorsun: önce iki cümle kur, sonra bir düzeltmeyi ve ondan çıkardığın kuralı anlat.",
    gloss: [
      { de: "to overstate", tr: "abartmak" },
      { de: "caveat", tr: "çekince" },
      { de: "to circulate", tr: "dolaşıma girmek" },
      { de: "accountable", tr: "hesap verir" },
      { de: "to rebuild", tr: "yeniden kurmak" },
      { de: "regional", tr: "bölgesel" },
    ],
    minutes: 16,
    tasks: [
      {
        kind: "build",
        tr: "O kadar emin olmama gerek yokmuş.",
        answer: "I needn't have been so confident.",
        alternatives: ["I did not need to be so confident."],
        hint: "„needn't have + üçüncü biçim“ yapılmış ama gereksiz olan bir şeyi bildirir.",
      },
      {
        kind: "build",
        tr: "Rakamı yayımlamadan önce kontrol etmeliydim.",
        answer: "I should have checked the figure before publishing it.",
        alternatives: ["I ought to have checked the figure before publishing it."],
        hint: "„should have + üçüncü biçim“ yapılmayan ama yapılması gereken şeyi bildirir.",
      },
      {
        kind: "free",
        prompt:
          "Bir blog yazısı yaz: yanıldığın bir şeyi anlat, nasıl fark edildiğini söyle, neyin yanlış neyin doğru kaldığını ayır, ne değiştirdiğini yaz ve aktarılabilir bir kuralla kapat.",
        checklist: [
          "Yanıldığın şeyi ilk paragrafta söyle",
          "Nasıl fark edildiğini anlat",
          "Neyin yanlış, neyin doğru kaldığını ayır",
          "Ne değiştirdiğini yaz ve bir kuralla kapat",
        ],
        minWords: 160,
        phrases: [
          { de: "In March I wrote that … That was wrong.", tr: "Mart ayında … yazmıştım. Bu yanlıştı.", en: "" },
          { de: "What remains true is …", tr: "Doğru kalan şey …", en: "" },
          { de: "I should have … before …", tr: "…'den önce … yapmalıydım", en: "" },
          { de: "What I have changed is …", tr: "Değiştirdiğim şey …", en: "" },
          { de: "The rule I've taken from it is …", tr: "Bundan çıkardığım kural …", en: "" },
        ],
        sample:
          "In March I wrote that the new reporting rule had cut processing times by a third. " +
          "That was wrong. The figure came from a single region in a single quarter, " +
          "and across the service as a whole the reduction was closer to six percent. " +
          "A reader who works in one of the regions I had not looked at wrote to tell me, " +
          "with the numbers attached, which is a more generous response than I had earned. " +
          "What remains true is the direction: times have fallen everywhere I can measure, " +
          "and nobody has produced a region where they rose. " +
          "What is not true, and what I presented as though it were, is the size of the effect, " +
          "and the size was the whole reason anybody shared the post. " +
          "I should have checked how the regional figure was produced before building a " +
          "headline on it, and I needn't have written it that week at all; " +
          "nothing depended on the timing except my own sense that the point was topical. " +
          "What I have changed is small and boring. Any figure I publish now carries the " +
          "source and the sample in the same sentence, not in a note at the end, " +
          "because the note is where my caveats went to be ignored. " +
          "The rule I've taken from it is this: if a number is the reason a piece will " +
          "circulate, it is the part that deserves the most checking and usually gets the least.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-c1-lib-s10",
    course: "en",
    level: "C1",
    skill: "speaking",
    title: "Should Expertise Be Trusted by Default?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: bir varsayılanı savun ve onu nasıl geri alacağını söyle.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Uzmanlığa varsayılan olarak güvenilmeli mi? Bir varsayılan öner, gerekçelendir, bu varsayılanın ne zaman geri alınması gerektiğini söyle ve kendi konumunun zayıf yanını kabul et.",
      bulletsTr: [
        "Bir varsayılan öner ve tanımla",
        "Gerekçeni ver",
        "Varsayılanın ne zaman geri alınacağını söyle",
        "Konumunun zayıf yanını kabul et",
      ],
      targets: [
        { de: "My default would be yes, and the reason is practical rather than respectful.", tr: "Varsayılanım evet olurdu; sebebi saygı değil pratiklik." },
        { de: "The default should be withdrawn when …", tr: "Varsayılan … olduğunda geri alınmalı" },
        { de: "I'm aware this is easier to say from …", tr: "Bunu … konumundan söylemenin daha kolay olduğunun farkındayım" },
        { de: "The weakness of my position is that …", tr: "Konumumun zayıf yanı …" },
      ],
      minSeconds: 60,
      maxSeconds: 100,
      sampleDe:
        "My default would be yes, and the reason is practical rather than respectful. " +
        "Nobody can check everything. A person who refuses to extend provisional trust to " +
        "anybody is not more rigorous; they simply end up trusting whoever shouts loudest, " +
        "because some decision has to be made and the alternative is paralysis. " +
        "So the question is not whether to have a default but how cheaply it can be withdrawn. " +
        "The default should be withdrawn when three things appear together: " +
        "a claim that happens to be very convenient for the speaker, " +
        "a refusal to say what would change their mind, " +
        "and an appeal to credentials rather than to evidence when they are pressed. " +
        "Any one of those on its own means very little; all three at once have never in my " +
        "experience been a false alarm. " +
        "I'm aware this is easier to say from a position where being wrong costs me an " +
        "argument rather than my health or my job, and people who have been badly served by " +
        "institutions are not being irrational when their default is different from mine. " +
        "The weakness of my position is that it works best exactly where it is least needed, " +
        "among people who already have the time to check.",
      rubricHint:
        "Bir varsayılan, geri alma ölçütü ve konumun zayıf yanının kabulü beklenir; „rather than“, „the default should be withdrawn when“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-c1-lib-g10",
    course: "en",
    level: "C1",
    skill: "grammar",
    title: "needn't have, should have, was to have",
    genre: "grammar",
    intro: "Geçmişe bakan kiplik, olmuş olanla olması gerekenin arasındaki farkı tek bir yapıda taşır.",
    focus: "Geçmiş kiplik: needn't have, didn't need to, should have, was to have",
    gloss: [
      { de: "to warn", tr: "uyarmak" },
      { de: "to wait", tr: "beklemek" },
      { de: "figure", tr: "rakam" },
      { de: "to publish", tr: "yayımlamak" },
    ],
    minutes: 12,
    explanation: [
      {
        heading: "needn't have ve didn't need to",
        tr: "Bu ikisi aynı görünür ve farklı şey söyler. „needn't have done“ eylemin YAPILDIĞINI ve gereksiz olduğunu bildirir: „I needn't have checked — it was already right.“ „didn't need to do“ ise yalnız gerekli olmadığını söyler ve genellikle yapılmadığını ima eder: „I didn't need to check.“ Türkçede ikisi de „gerek yoktu“ diye çevrilir.",
        examples: [
          { de: "I needn't have been so confident.", tr: "O kadar emin olmama gerek yokmuş.", note: "oldu ve gereksizdi" },
          { de: "I didn't need to check it again.", tr: "Tekrar kontrol etmem gerekmiyordu.", note: "gerekmiyordu, muhtemelen yapmadı" },
          { de: "You needn't have waited.", tr: "Beklemene gerek yokmuş.", note: "bekledin" },
        ],
      },
      {
        heading: "should have ve ought to have",
        tr: "„should have done“ yapılmamış ama yapılması gereken bir şeyi bildirir ve çoğu zaman sitem ya da pişmanlık taşır. Olumsuzu tersini söyler: „shouldn't have published it“ — yayımlandı ve yayımlanmamalıydı. „ought to have“ aynı işi biraz daha resmî bir tonda görür.",
        examples: [
          { de: "I should have checked the figure.", tr: "Rakamı kontrol etmeliydim.", note: "yapmadı" },
          { de: "They shouldn't have published it so quickly.", tr: "Bu kadar hızlı yayımlamamalıydılar.", note: "yayımladılar" },
          { de: "He ought to have warned us.", tr: "Bizi uyarmalıydı.", note: "resmî ton" },
        ],
      },
      {
        heading: "was to have: gerçekleşmemiş düzenleme",
        tr: "„was/were to have done“ planlanmış ama gerçekleşmemiş bir şeyi bildirir ve resmî anlatıda kullanılır: „The report was to have been published in March.“ „was to do“ ise yalnız planı bildirir; anlatıda çoğu zaman gerçekleştiğini ima eder. Ayrıca „might have“ ve „could have“ gerçekleşmemiş bir olasılığı taşır: „It could have been much worse.“",
        examples: [
          { de: "The report was to have been published in March.", tr: "Rapor mart ayında yayımlanacaktı.", note: "yayımlanmadı" },
          { de: "It could have been much worse.", tr: "Çok daha kötü olabilirdi.", note: "olmadı" },
          { de: "She might have told us earlier.", tr: "Bize daha erken söyleyebilirdi.", note: "sitem" },
        ],
      },
    ],
    questions: [
      {
        text: "“I needn't have been so confident.” — What does it mean?",
        options: [
          "I was confident, and it was not justified.",
          "I was not confident at all.",
          "I had no reason to speak.",
        ],
        answer: 0,
        explain: "„needn't have“ eylemin yapıldığını ve gereksiz olduğunu bildirir.",
      },
      {
        text: "They ___ published it so quickly — it was full of errors.",
        options: ["needn't have", "shouldn't have", "didn't need to"],
        answer: 1,
        explain: "Yayımlandı ve yayımlanmamalıydı: shouldn't have.",
      },
      {
        text: "“The report was to have been published in March.” implies:",
        options: [
          "It was published in March.",
          "It was not published in March.",
          "It will be published in March.",
        ],
        answer: 1,
        explain: "„was to have done“ gerçekleşmemiş bir düzenlemeyi bildirir.",
      },
      {
        kind: "gapfill",
        text: "I ___ have checked the figure before publishing it. (I didn't, and that was a mistake)",
        options: [],
        answer: 0,
        accept: ["should", "ought to"],
        explain: "Yapılmayan ama yapılması gereken: should have.",
      },
      {
        kind: "gapfill",
        text: "You ___ have waited — I was already on my way. (need + not)",
        options: [],
        answer: 0,
        accept: ["needn't", "need not"],
        explain: "Bekledin ama gerek yoktu: needn't have.",
      },
      {
        kind: "gapfill",
        text: "It ___ have been much worse. (a possibility that did not happen)",
        options: [],
        answer: 0,
        accept: ["could", "might"],
        explain: "Gerçekleşmemiş bir olasılık.",
      },
      {
        kind: "gapfill",
        text: "He ___ to have warned us. (= he should have warned us)",
        options: [],
        answer: 0,
        accept: ["ought"],
        explain: "„ought to have“ resmî tonda sitem bildirir.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["She", "might", "have", "told us", "earlier"],
        explain: "might have + üçüncü hâl + nesne + zaman.",
      },
      {
        kind: "truefalse",
        text: "“I didn't need to check it” ile “I needn't have checked it” aynı şeyi söyler.",
        options: ["True", "False"],
        answer: 1,
        explain: "İkincisi kontrol edildiğini de bildirir.",
      },
      {
        kind: "truefalse",
        text: "“They shouldn't have published it.” — Yayımlandığını söyler mi?",
        options: ["True", "False"],
        answer: 0,
        explain: "„shouldn't have“ olmuş bir eylemi eleştirir.",
      },
    ],
  },
];
