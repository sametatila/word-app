import type { SkillExercise } from "../../types";

/**
 * EN · B2 — Beceriler kütüphanesi, parti 7.
 *
 * Kurallar ve emsal: `en-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 7 dil ve aksan hattı: kişisel bir blog yazısı, bir araştırma haberi,
 * bir deneme. Dil bilgisi aktarma fiilleri ve kalıpları.
 */
export const enB2P7: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-lib-r7",
    course: "en",
    level: "B2",
    skill: "reading",
    title: "I Stopped Trying to Lose My Accent",
    genre: "blog",
    intro: "Kişisel bir blog yazısı: aksanı değiştirme çabası, ne işe yaradı, ne işe yaramadı.",
    gloss: [
      { de: "accent", tr: "aksan" },
      { de: "to blend in", tr: "kaynaşmak" },
      { de: "pronunciation", tr: "telaffuz" },
      { de: "clarity", tr: "anlaşılırlık" },
      { de: "to hesitate", tr: "duraksamak" },
      { de: "structure", tr: "yapı" },
      { de: "judge", tr: "yargılamak" },
      { de: "resist", tr: "direnmek" },
      { de: "explanation", tr: "açıklama" },
      { de: "communication", tr: "iletişim" },
    ],
    minutes: 8,
    text:
      "I stopped trying to lose my accent\n\n" +
      "For about three years I spent an hour a week with a pronunciation app and, later, " +
      "with a teacher. My goal was not clarity. People understood me perfectly well before " +
      "I started. My goal was to blend in, and I want to be honest about that, " +
      "because most articles about accents pretend the aim is always communication.\n\n" +
      "It partly worked. Some sounds moved, and two of them stayed. What did not change at " +
      "all was the thing I actually wanted, which was the half-second pause before somebody " +
      "asks where I'm from.\n\n" +
      "My teacher told me something in the second year that I resisted for months. " +
      "She said that I was working on the wrong layer. She suggested recording myself giving " +
      "the same three-minute explanation every week, and she insisted that I listen for " +
      "structure rather than sounds — where I hesitated, where I repeated myself, " +
      "where I started a sentence I could not finish.\n\n" +
      "That work changed more in four months than the pronunciation work had in two years. " +
      "Nobody has ever said “your accent is clearer now”, but several people have said " +
      "that I explain things well, which is what I was really after.\n\n" +
      "I am not going to claim that accents don't matter. They do, and people are judged by " +
      "them, and telling someone to stop worrying is easy advice to give from a comfortable " +
      "chair. What I will say is this: I could not change how I was heard, " +
      "but I could change what there was to hear.",
    questions: [
      {
        text: "What was the writer's real goal at the start?",
        options: ["to be understood", "to blend in", "to become a teacher"],
        answer: 1,
        explain: "„My goal was not clarity … My goal was to blend in“.",
      },
      {
        text: "What did the teacher suggest?",
        options: [
          "recording the same explanation weekly and listening for structure",
          "practicing two difficult sounds daily",
          "speaking more slowly",
        ],
        answer: 0,
        explain: "Seslere değil yapıya odaklanmasını istemiş.",
      },
      {
        kind: "truefalse",
        text: "The writer says accents do not matter.",
        options: ["True", "False"],
        answer: 1,
        explain: "„They do, and people are judged by them“.",
      },
      {
        kind: "gapfill",
        text: "The structure work changed more in ___ months than two years of pronunciation work.",
        options: [],
        answer: 0,
        accept: ["four", "4"],
        explain: "„changed more in four months than the pronunciation work had in two years“.",
      },
      {
        kind: "short_answer",
        text: "What have several people said to the writer?",
        options: [],
        answer: 0,
        accept: [
          "that he explains things well",
          "he explains things well",
          "that she explains well",
        ],
        explain: "„several people have said that I explain things well“.",
      },
      {
        text: "What does the last sentence mean?",
        options: [
          "The writer changed the content, not the sound.",
          "The writer gave up speaking English.",
          "The writer changed the listeners.",
        ],
        answer: 0,
        explain: "„I could not change how I was heard, but I could change what there was to hear.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-lib-l7",
    course: "en",
    level: "B2",
    skill: "listening",
    title: "What the Accent Study Actually Found",
    genre: "report",
    intro: "Bir araştırma haberi: aksana göre değerlendirme üzerine bir çalışma ve yanlış aktarılan sonucu.",
    gloss: [
      { de: "to rate", tr: "puanlamak" },
      { de: "recording", tr: "ses kaydı" },
      { de: "credibility", tr: "inandırıcılık" },
      { de: "transcript", tr: "yazılı döküm" },
      { de: "to replicate", tr: "yinelemek" },
      { de: "headline", tr: "başlık" },
      { de: "practical", tr: "pratik" },
      { de: "participant", tr: "katılımcı" },
      { de: "unfamiliar", tr: "tanıdık olmayan" },
      { de: "poor", tr: "kötü" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Presenter", text: "A study on accent and credibility has been quoted everywhere this week, usually with the wrong number attached." },
      { speaker: "Presenter", text: "Participants heard short recordings of the same text read by eight speakers, and rated how believable each one sounded." },
      { speaker: "Dr. Whelan", text: "The gap was real but small. Speakers with an accent that was unfamiliar to the listener scored about seven percent lower." },
      { speaker: "Presenter", text: "Several headlines turned that into a claim that people with accents are not believed, which the study does not say." },
      { speaker: "Dr. Whelan", text: "What interested us more was the second condition. When participants read a transcript at the same time, the difference disappeared completely." },
      { speaker: "Presenter", text: "The researchers argue that the effect is about processing effort rather than prejudice: an unfamiliar accent is harder work, and listeners read that effort as doubt." },
      { speaker: "Dr. Whelan", text: "That matters practically. It suggests that captions in an online meeting do more for a speaker than months of pronunciation training." },
      { speaker: "Presenter", text: "The team admits the study has limits. It used one language, one text, and listeners from a single city, and nobody has replicated it yet." },
    ],
    questions: [
      {
        text: "How large was the difference in ratings?",
        options: ["about seven percent", "about thirty percent", "there was none"],
        answer: 0,
        explain: "„scored about seven percent lower“ — gerçek ama küçük.",
      },
      {
        text: "What happened when participants read a transcript?",
        options: [
          "The difference disappeared.",
          "The difference doubled.",
          "Participants stopped listening.",
        ],
        answer: 0,
        explain: "„the difference disappeared completely“.",
      },
      {
        kind: "truefalse",
        text: "The researchers say the effect is caused by prejudice.",
        options: ["True", "False"],
        answer: 1,
        explain: "„about processing effort rather than prejudice“.",
      },
      {
        kind: "gapfill",
        text: "The recordings were read by ___ speakers.",
        options: [],
        answer: 0,
        accept: ["eight", "8"],
        explain: "„read by eight speakers“.",
      },
      {
        kind: "short_answer",
        text: "What practical suggestion follows from the study?",
        options: [],
        answer: 0,
        accept: ["captions in meetings", "captions in online meetings", "use captions", "using captions", "captions"],
        explain: "„captions in an online meeting do more … than months of pronunciation training“.",
      },
      {
        text: "What limit does the team admit?",
        options: [
          "one language, one text, one city, no replication",
          "the sample was too large",
          "the recordings were of poor quality",
        ],
        answer: 0,
        explain: "Son cümlede dört sınır birden sayılıyor.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-lib-w7",
    course: "en",
    level: "B2",
    skill: "writing",
    title: "What a Study Can and Cannot Show",
    genre: "essay",
    intro: "Kısa bir deneme yazıyorsun: önce iki cümle kur, sonra bir bulguyu ve sınırlarını tartış.",
    gloss: [
      { de: "finding", tr: "bulgu" },
      { de: "to overstate", tr: "abartmak" },
      { de: "sample", tr: "örneklem" },
      { de: "cautious", tr: "temkinli" },
      { de: "conclusion", tr: "vargı" },
      { de: "participant", tr: "katılımcı" },
      { de: "unfamiliar", tr: "tanıdık olmayan" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Araştırmacılar etkinin küçük olduğunu kabul etti.",
        answer: "The researchers admitted that the effect was small.",
        alternatives: ["The researchers acknowledged that the effect was small."],
        hint: "„admit“ arkasından „that“ cümlesi ya da -ing alır; „to“ almaz.",
      },
      {
        kind: "build",
        tr: "Gazeteler manşetlerinde sonucun çok daha güçlü olduğunu iddia etti.",
        answer: "In their headlines the newspapers claimed that the result was much stronger.",
        alternatives: ["The newspapers claimed in their headlines that the result was much stronger."],
        hint: "„claim“ arkasından „that“ cümlesi gelir; özne aynıysa „to + mastar“ da alır (they claimed to know).",
      },
      {
        kind: "free",
        prompt:
          "Bir araştırma bulgusu üzerine deneme yaz: bulguyu ve nasıl aktarıldığını anlat, aradaki farkı adlandır, bulgunun gerçekten ne gösterdiğini yaz, sınırlarını dürüstçe say ve pratik bir sonuç çıkar.",
        checklist: [
          "Bulguyu ve medyadaki aktarımını anlat",
          "Aradaki farkı adlandır",
          "Sınırları dürüstçe say",
          "Pratik ama temkinli bir sonuç çıkar",
        ],
        minWords: 130,
        phrases: [
          { de: "The study is usually reported as showing that …", tr: "Araştırma genelde … gösterdiği biçiminde aktarılıyor", en: "" },
          { de: "What it actually found was …", tr: "Gerçekte bulduğu şey …", en: "" },
          { de: "The difference between those two claims matters because …", tr: "Bu iki iddia arasındaki fark önemli çünkü …", en: "" },
          { de: "It should also be said that …", tr: "Şunu da söylemek gerek: …", en: "" },
          { de: "A cautious conclusion would be …", tr: "Temkinli bir sonuç … olurdu", en: "" },
        ],
        sample:
          "The study is usually reported as showing that people with accents are not believed. " +
          "What it actually found was a gap of about seven percent in how believable listeners " +
          "rated eight recordings of the same text, and only when the accent was unfamiliar " +
          "to that listener. " +
          "The difference between those two claims matters because the first invites despair " +
          "and the second invites a solution. " +
          "The most interesting result was not the gap at all. When participants could read a " +
          "transcript while listening, the difference vanished, which suggests that the effect " +
          "has more to do with how much work listening takes than with what listeners think " +
          "of the speaker. " +
          "It should also be said that the study used one language, one text and listeners from " +
          "a single city, and that nobody has repeated it. Any one of those could explain the " +
          "result on its own. " +
          "A cautious conclusion would be that captions cost nothing and may help more than " +
          "years of pronunciation practice, and that a finding of seven percent should not be " +
          "used to tell anyone how they will be treated at work.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b2-lib-s7",
    course: "en",
    level: "B2",
    skill: "speaking",
    title: "Does an Accent Change How You Are Heard?",
    genre: "monologue",
    intro: "Bir dakikadan uzun tek başına konuşacaksın: kişisel deneyimi bir iddiayla birleştir.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Aksan insanın nasıl duyulduğunu değiştirir mi? Görüşünü söyle, kendi deneyiminden bir örnek ver, kolay tavsiyenin neden yetersiz olduğunu anlat ve ne yapılabileceğini öner.",
      bulletsTr: [
        "Görüşünü tek cümleyle söyle",
        "Kendi deneyiminden bir örnek ver",
        "Kolay tavsiyenin neden yetersiz olduğunu anlat",
        "Ne yapılabileceğini öner",
      ],
      targets: [
        { de: "Yes, it does, though not in the way that is usually described.", tr: "Evet değiştiriyor, ama genelde anlatıldığı biçimde değil." },
        { de: "I noticed this most clearly when …", tr: "Bunu en açık … olduğunda fark ettim" },
        { de: "The easy advice — just practice — ignores …", tr: "Kolay tavsiye — sadece çalış — şunu görmezden geliyor: …" },
        { de: "What actually helps, in my experience, is …", tr: "Deneyimime göre gerçekten işe yarayan şey …" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "Yes, it does, though not in the way that is usually described. " +
        "The research I've read suggests the gap is small and disappears when listeners can " +
        "also read what is being said, which points at effort rather than prejudice. " +
        "That matches my own experience. " +
        "I noticed this most clearly when I moved from phone calls to video meetings with " +
        "captions turned on. The same explanation that used to produce three clarifying " +
        "questions now produces none, and my pronunciation has not changed at all. " +
        "The easy advice — just practice — ignores how long it takes and how little of it " +
        "transfers. I spent two years on sounds and four months on structure, " +
        "and only the second one changed how people responded to me. " +
        "What actually helps, in my experience, is reducing the work for the listener in " +
        "every way that isn't your accent: captions, a clear first sentence that says where " +
        "you are going, and short sentences when the content is difficult. " +
        "None of that is fair, exactly. But it is available today, and changing how other " +
        "people listen is not.",
      rubricHint:
        "Kişisel deneyim, bir araştırmaya gönderme ve uygulanabilir bir öneri beklenir; „though not in the way that“, „ignores“ ve „what actually helps“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b2-lib-g7",
    course: "en",
    level: "B2",
    skill: "grammar",
    title: "admit, refuse, suggest",
    genre: "grammar",
    intro: "Aktarma yalnız „said“ demek değildir; her fiil kendi kalıbını taşır ve kalıbı yanlış seçmek cümleyi bozar.",
    focus: "Aktarma fiilleri ve aldıkları kalıplar",
    gloss: [
      { de: "to admit", tr: "kabul etmek" },
      { de: "to refuse", tr: "reddetmek" },
      { de: "to suggest", tr: "önermek" },
      { de: "to warn", tr: "uyarmak" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "Dört ana kalıp",
        tr: "Aktarma fiilleri dört gruba ayrılır. „that“ cümlesi alanlar: say, admit, claim, explain. „to + mastar“ alanlar: refuse, promise, agree, offer. Kişi + „to + mastar“ alanlar: tell, advise, warn, remind. -ing alanlar: suggest, deny, admit, recommend. Bazı fiiller birden çok grupta yer alır, ama hepsi değil.",
        examples: [
          { de: "She admitted that the effect was small.", tr: "Etkinin küçük olduğunu kabul etti.", note: "admit + that" },
          { de: "He refused to answer.", tr: "Cevap vermeyi reddetti.", note: "refuse + to" },
          { de: "She warned me not to quote it.", tr: "Onu alıntılamamam konusunda beni uyardı.", note: "warn + kişi + to" },
        ],
      },
      {
        heading: "suggest ve recommend tuzağı",
        tr: "„suggest“ ve „recommend“ İNGİLİZCEDE „to + mastar“ ALMAZ. Doğru biçimler: „suggest doing“, „suggest that we do“. „She suggested me to record“ yanlıştır. Ayrıca bu iki fiil doğrudan bir kişi nesnesi de almaz: „suggest me something“ değil, „suggest something to me“.",
        examples: [
          { de: "She suggested recording the interview.", tr: "Görüşmeyi kaydetmeyi önerdi.", note: "suggest + -ing" },
          { de: "She suggested that I record myself.", tr: "Kendimi kaydetmemi önerdi.", note: "suggest + that" },
          { de: "He recommended a shorter version to us.", tr: "Bize daha kısa bir biçim önerdi.", note: "recommend + nesne + to" },
        ],
      },
      {
        heading: "say ve tell ayrımı",
        tr: "„tell“ her zaman KİME söylendiğini ister: „He told me that …“. „say“ ise kişiyi doğrudan almaz; araya „to“ girer: „He said to me that …“, ya da kişi hiç söylenmez. Bu ayrım küçük ama sınavlarda ve yazıda sürekli ölçülür.",
        examples: [
          { de: "He told me that he had finished.", tr: "Bitirdiğini bana söyledi.", note: "tell + kişi" },
          { de: "He said that he had finished.", tr: "Bitirdiğini söyledi.", note: "say: kişi yok" },
          { de: "She insisted that I listen for structure.", tr: "Yapıya kulak vermemde ısrar etti.", note: "insist + that" },
        ],
      },
    ],
    questions: [
      {
        text: "She ___ the interview.",
        options: ["suggested me to record", "suggested recording", "suggested me recording"],
        answer: 1,
        explain: "„suggest“ -ing ya da „that“ alır, „to“ almaz.",
      },
      {
        text: "He ___ to answer the question.",
        options: ["refused", "admitted", "suggested"],
        answer: 0,
        explain: "„refuse“ arkasından „to + mastar“ gelir.",
      },
      {
        text: "Which is correct?",
        options: [
          "He said me that he had finished.",
          "He told that he had finished.",
          "He told me that he had finished.",
        ],
        answer: 2,
        explain: "„tell“ kişi nesnesi ister; „say“ almaz.",
      },
      {
        kind: "gapfill",
        text: "She ___ that the effect was small. (admit)",
        options: [],
        answer: 0,
        accept: ["admitted", "admits"],
        explain: "„admit“ „that“ cümlesi alabilir.",
      },
      {
        kind: "gapfill",
        text: "She warned me ___ to quote the headline. (negative)",
        options: [],
        answer: 0,
        accept: ["not"],
        explain: "Olumsuz mastar „not to + fiil“ biçimindedir.",
      },
      {
        kind: "gapfill",
        text: "He recommended a shorter version ___ us. (to / for)",
        options: [],
        answer: 0,
        accept: ["to"],
        explain: "„recommend something to somebody“ kalıbı geçerlidir.",
      },
      {
        kind: "gapfill",
        text: "The newspapers ___ that the result was much stronger. (claim)",
        options: [],
        answer: 0,
        accept: ["claimed", "claim"],
        explain: "„claim“ „that“ cümlesi alır.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["She", "insisted", "that", "I listen", "for structure"],
        explain: "„insist“ „that“ cümlesiyle gelir.",
      },
      {
        kind: "truefalse",
        text: "„She suggested me to record myself.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„suggest“ ne kişi nesnesi ne „to“ alır: „suggested recording“ ya da „suggested that I record“.",
      },
      {
        kind: "truefalse",
        text: "„He told me that he had finished.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "„tell“ kişi nesnesiyle kullanılır.",
      },
    ],
  },
];
