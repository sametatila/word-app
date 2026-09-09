import type { SkillExercise } from "../../types";

/**
 * EN · C1 — Beceriler kütüphanesi, parti 2.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 2. seti taşır (kimlik sonu 2).
 * Kurallar ve emsal: `en-c1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Alan adı `de` İngilizce metni taşır; `en` alanı bu kursta yazılmaz.
 * Türler parti 1'den ayrı: akademik yazı, ders ve özet. Üçü de adlaştırmanın
 * doğal alanı; dil bilgisi nominalisation ve akademik kayıt.
 */
export const enC1P2: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-lib-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    title: "What a Form Does Before Anybody Answers It",
    genre: "Bilim yazısı",
    intro: "Formların soru sormadan önce ne yaptığını inceleyen bir yazı okuyacaksın: kategoriler kararı nasıl önceden veriyor.",
    gloss: [
      { de: "classification", tr: "sınıflandırma" },
      { de: "provision", tr: "sunulması" },
      { de: "comparability", tr: "karşılaştırılabilirlik" },
      { de: "defer", tr: "ertelemek" },
      { de: "respondent", tr: "yanıtlayan" },
      { de: "attribute", tr: "atfetmek" },
      { de: "rotation", tr: "döndürme" },
      { de: "instrument", tr: "araç" },
    ],
    minutes: 10,
    text:
      "WHAT A FORM DOES BEFORE ANYBODY ANSWERS IT\n\n" +
      "The design of a form is usually treated as a matter of layout. It is in fact a matter of classification, " +
      "and classification is the point at which most of the decisions have already been taken.\n\n" +
      "Consider the request for an occupation. The provision of a free text box produces answers of great " +
      "variety and almost no comparability; the provision of a list of twelve categories produces comparability " +
      "and a substantial loss of information. Neither option is neutral. The first defers the classification to " +
      "whoever later reads the answers; the second performs it in advance, in an office, by people who will " +
      "never meet the respondent.\n\n" +
      "The consequences of that choice are rarely visible in the results. A widely cited example is the " +
      "treatment of unpaid care. Where the categories are drawn from employment records, care performed at home " +
      "does not appear, not because it has been judged unimportant but because there is no line for it. " +
      "The absence is then read, several steps later, as a measurement: care of this kind is described as rare, " +
      "and its rarity is attributed to the people rather than to the instrument.\n\n" +
      "A second and less discussed effect is the ordering of the options. There is good evidence for a " +
      "first-position advantage in long lists, with the size of the effect increasing as the list grows. " +
      "The recommendation that follows is not the removal of lists, which would be impractical, but the " +
      "rotation of their order between respondents, a change of no cost that is nevertheless implemented in a " +
      "minority of cases.\n\n" +
      "None of this amounts to an argument for suspicion. Forms are among the most useful instruments we have, " +
      "precisely because they force a definition. The argument is for the publication of the definition " +
      "alongside the result. A number without its categories is not a smaller truth; it is a different one, " +
      "and the difference is not recoverable afterwards.",
    questions: [
      {
        text: "What is the central claim of the text?",
        options: [
          "A form's categories decide much of the result.",
          "Forms should be replaced by interviews.",
          "Free text boxes are always the better option.",
        ],
        answer: 0,
        explain: "„… classification is the point at which most of the decisions have already been taken.“",
      },
      {
        text: "What does a free text box produce?",
        options: [
          "variety with almost no comparability",
          "comparability with almost no variety",
          "considerably fewer answers overall",
        ],
        answer: 0,
        explain: "„The provision of a free text box produces answers of great variety and almost no comparability.“",
      },
      {
        kind: "truefalse",
        text: "The writer argues that forms should be treated with suspicion.",
        options: ["True", "False"],
        answer: 1,
        explain: "„None of this amounts to an argument for suspicion. Forms are among the most useful instruments we have.“",
      },
      {
        kind: "gapfill",
        text: "There is good evidence for a ___-position advantage in long lists.",
        options: [],
        answer: 0,
        accept: ["first"],
        explain: "„There is good evidence for a first-position advantage in long lists …“",
      },
      {
        kind: "short_answer",
        text: "What does the writer argue should be published with the result?",
        options: [],
        answer: 0,
        accept: ["the definition", "the categories", "the definition used"],
        explain: "„The argument is for the publication of the definition alongside the result.“",
      },
      {
        text: "Why does unpaid care not appear in the figures?",
        options: [
          "There is no category for it.",
          "Respondents refuse to report it.",
          "It has been judged unimportant.",
        ],
        answer: 0,
        explain: "„… not because it has been judged unimportant but because there is no line for it.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-lib-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    title: "The Most Neglected Infrastructure",
    genre: "Ders",
    intro: "Bir ders dinleyeceksin: hangi altyapı hiçbir strateji belgesinde geçmiyor ve yokluğu kimin şehrini küçültüyor.",
    gloss: [
      { de: "infrastructure", tr: "altyapı" },
      { de: "provision", tr: "sunulması" },
      { de: "vandalism", tr: "vandalizm" },
      { de: "radius", tr: "yarıçap" },
      { de: "facility", tr: "tesis" },
      { de: "reverse", tr: "tersine çevirmek" },
    ],
    minutes: 10,
    segments: [
      { text: "Good afternoon. Today's lecture is about a piece of infrastructure that appears in no strategy document and that determines who can spend a whole day in a city." },
      { text: "I mean public toilets. I ask you to resist the smile, because the smile is part of the problem: the difficulty of discussing the subject is one reason for the state of the provision." },
      { text: "Let me start with the numbers. In the countries where counts have been done, the number of public toilets has fallen by between forty and sixty per cent since the nineteen nineties." },
      { text: "The reason usually given is cost. The reason more often found in the minutes is vandalism, which is a genuine problem and also a convenient one, because it produces closure without a decision." },
      { text: "Now the part that concerns us. The absence of provision does not fall on everybody equally. It falls on people with certain medical conditions, on parents of small children, on older people and on anybody who works outdoors." },
      { text: "There is a useful phrase for the result: the toilet leash. It describes the radius within which a person can move away from a known facility. For some people that radius is under an hour." },
      { text: "So the effect of a removal is not the inconvenience of one afternoon. It is a reduction in the size of the city available to a part of its population." },
      { text: "And that reduction is invisible in every measure we normally use." },
      { text: "One more observation before I move to the case studies. The provision that survives is almost always attached to something else: a station, a library, a department store." },
      { text: "That is not an accident. A facility that belongs to an institution has a person who is responsible for it, and responsibility, not money, is the variable that predicts whether it is open." },
      { text: "In the second half I will look at three cities that reversed the trend, and at what each of them had to accept in order to do it." },
    ],
    questions: [
      {
        text: "What is the lecture about?",
        options: [
          "public toilets as infrastructure",
          "the rising cost of city cleaning",
          "medical conditions in large cities",
        ],
        answer: 0,
        explain: "„I mean public toilets. I ask you to resist the smile …“",
      },
      {
        text: "Why does the speaker call vandalism a convenient reason?",
        options: [
          "It allows closure without a decision.",
          "It is cheaper to repair than to clean.",
          "It is the easiest thing to measure.",
        ],
        answer: 0,
        explain: "„… which is a genuine problem and also a convenient one, because it produces closure without a decision.“",
      },
      {
        kind: "truefalse",
        text: "The speaker says the effect falls on everybody equally.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The absence of provision does not fall on everybody equally.“",
      },
      {
        kind: "short_answer",
        text: "Which variable predicts whether a facility is open?",
        options: [],
        answer: 0,
        accept: ["responsibility", "who is responsible", "having somebody responsible"],
        explain: "„… responsibility, not money, is the variable that predicts whether it is open.“",
      },
      {
        kind: "dictation",
        text: "Konuşmacının hayatta kalan tesisler hakkındaki kısa yargısını duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["That is not an accident.", "That is not an accident"],
        explain: "„That is not an accident.“ — bir önceki gözlemin rastlantı olmadığını söylüyor.",
      },
      {
        text: "What does the phrase “the toilet leash” describe?",
        options: [
          "how far a person can move from a facility",
          "how long a queue at a facility is",
          "how often a facility is cleaned",
        ],
        answer: 0,
        explain: "„It describes the radius within which a person can move away from a known facility.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-lib-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    title: "Writing an Abstract",
    genre: "Özet",
    intro: "Küçük bir çalışmanın akademik özetini yazacaksın; önce iki cümle kur, sonra özeti yaz.",
    gloss: [
      { de: "questionnaire", tr: "anket formu" },
      { de: "limitation", tr: "sınırlılık" },
      { de: "rotation", tr: "döndürme" },
      { de: "reliance", tr: "dayanma" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Kategorilerin değiştirilmesi farklı bir sonuç üretti.",
        answer: "The change of categories produced a different result.",
        hint: "Akademik kayıtta fiil sık sık adlaştırılır: we changed → the change of.",
      },
      {
        kind: "build",
        tr: "Veriler üç okulda toplandı.",
        answer: "The data were collected in three schools.",
        hint: "„data“ akademik yazıda çoğul sayılır; edilgen çatı faili geri planda bırakır.",
      },
      {
        kind: "free",
        prompt:
          "Küçük bir araştırmanın özetini yaz: amaç, yöntem, ana bulgu, bir sınırlılık ve çıkarım. Akademik kayıt kullan: kısaltma yok, adlaştırma ve edilgen çatı serbest.",
        checklist: [
          "Amacı tek cümleyle ve adlaştırmayla yaz",
          "Yöntemi sayı ve süreyle ver",
          "Ana bulguyu abartmadan söyle",
          "Bir sınırlılık ve bir çıkarımla bitir",
        ],
        minWords: 120,
        phrases: [
          { de: "The present study examines …", tr: "Bu çalışma …'i inceliyor" },
          { de: "The data were collected …", tr: "Veriler … toplandı" },
          { de: "The results indicate …", tr: "Sonuçlar … gösteriyor" },
          { de: "A limitation of the study is …", tr: "Çalışmanın bir sınırlılığı …" },
          { de: "The findings suggest that …", tr: "Bulgular … olduğunu düşündürüyor" },
        ],
        sample:
          "The present study examines the effect of option order on responses to a single-choice question about " +
          "reasons for leaving a voluntary role. Two versions of an otherwise identical questionnaire were " +
          "distributed to nine hundred and forty former volunteers in eleven organizations over four months; " +
          "the versions differed only in the sequence of the six response options. The data were collected " +
          "online and analyzed without knowledge of the version. The results indicate a first-position " +
          "advantage of approximately nine percentage points, which is larger than the difference between the " +
          "two most frequently reported reasons. A limitation of the study is the reliance on organizations " +
          "that agreed to participate, a group in which record-keeping is likely to be better than average; " +
          "the size of the effect may therefore be underestimated. The findings suggest that the reported " +
          "ranking of reasons is not stable, and that the rotation of option order should be treated as a " +
          "minimum requirement rather than as a refinement.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-c1-lib-s2",
    course: "en",
    level: "C1",
    skill: "speaking",
    title: "Should Official Language Be Simplified?",
    genre: "Monolog",
    intro: "İki dakikaya kadar konuşacaksın: kolay cevabı sorgula, ödünleşimi adlandır ve kendi ölçütünü koy.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Resmî ve hukuki metinler sadeleştirilmeli mi? Kolay cevabı sorgula, sadeleştirmenin neyi kaybettirdiğini söyle ve kendi ölçütünü koy.",
      bulletsTr: [
        "Yaygın cevabı adlandır ve neden yetersiz olduğunu söyle",
        "Sadeleştirmenin gerçek kazancını göster",
        "Neyin kaybedildiğini somut örnekle söyle",
        "Ölçütünü koy: hangi metin nasıl yazılmalı",
      ],
      targets: [
        { de: "The usual answer is …, and it is not wrong, but …", tr: "Alışıldık cevap …, yanlış değil, ama …" },
        { de: "What is lost is …", tr: "Kaybedilen şey …" },
        { de: "The trade-off is between … and …", tr: "Ödünleşim … ile … arasında" },
        { de: "My criterion would be …", tr: "Benim ölçütüm … olurdu" },
      ],
      minSeconds: 60,
      maxSeconds: 110,
      sampleDe:
        "The usual answer is that official language should be as simple as possible, and it is not wrong, but " +
        "it hides a trade-off that is worth naming. The gain from simplification is real and it is not mainly " +
        "about comfort: a sentence that has to be read three times is a sentence that some people will not read " +
        "at all, and those people are rarely the ones with a lawyer. What is lost is precision, and precision " +
        "in a legal text is not decoration. The phrase that looks like jargon often carries a distinction that " +
        "was made in a court fifty years ago, and removing it does not remove the distinction; it moves the " +
        "argument to a later and more expensive stage. The trade-off is therefore between how many people can " +
        "read a document and how few of them will end up disagreeing about what it said. My criterion would be " +
        "the separation of the two functions. Every official document should carry a plain summary that is " +
        "clearly marked as a summary and that nobody can rely on in a dispute, alongside a precise text that " +
        "nobody is expected to read first. What should not be done is the thing that is done most often: " +
        "simplifying the operative text itself, which produces a document that is easy to read and impossible " +
        "to apply.",
      rubricHint:
        "Kolay cevap sorgulanmalı, ödünleşim açıkça adlandırılmalı ve sonuç bir ayrımla verilmeli; adlaştırma beklenir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-c1-lib-g2",
    course: "en",
    level: "C1",
    skill: "grammar",
    title: "the removal of the bench",
    genre: "Kural",
    intro: "Akademik ve kurumsal yazının belkemiği: fiili ada çevirmek, bunun neyi kazandırdığını ve neyi gizlediğini bilmek.",
    focus: "Nominalisation ve akademik kayıt",
    gloss: [
      { de: "decision", tr: "karar" },
      { de: "removal", tr: "kaldırma" },
      { de: "analysis", tr: "çözümleme" },
      { de: "increase", tr: "artış" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "Fiilden ada",
        tr: "Türkçede „karar verdiler“ cümlesini „kararları“ diye adlaştırabilirsin; İngilizcede aynı işlem akademik kaydın temelidir: they decided → the decision, we removed → the removal, they analyzed → the analysis.",
        examples: [
          { de: "They decided quickly. → The decision was quick.", tr: "Hızlı karar verdiler. → Karar hızlıydı." },
          { de: "We removed the bench. → The removal of the bench …", tr: "Bankı kaldırdık. → Bankın kaldırılması …" },
          { de: "Prices increased. → The increase in prices …", tr: "Fiyatlar arttı. → Fiyatlardaki artış …" },
        ],
      },
      {
        heading: "Ne kazanılır, ne kaybolur",
        tr: "Adlaştırma cümleyi yoğunlaştırır ve birden çok olayı tek bir öbekte taşımanı sağlar. Bedeli şudur: fail ve zaman kaybolur. Bu bazen dürüsttür (kim yaptığı önemsizdir), bazen kaçamaktır.",
        examples: [
          { de: "The removal of the bench followed a complaint.", tr: "Bankın kaldırılması bir şikâyetin ardından geldi.", note: "kim kaldırdı belli değil" },
          { de: "The council removed the bench after a complaint.", tr: "Belediye bir şikâyetten sonra bankı kaldırdı.", note: "fail geri geldi" },
          { de: "There was a reduction in staffing.", tr: "Personelde bir azalma oldu.", note: "kimin kararı olduğu gizli" },
        ],
      },
      {
        heading: "Kaydın öteki işaretleri",
        tr: "Akademik kayıtta kısaltma kullanılmaz (didn't → did not), öbek fiiller yerine tek kelimeli karşılıkları tercih edilir (find out → determine, go up → increase) ve iddia kalıplarla yumuşatılır: it is argued that, the present study.",
        examples: [
          { de: "The study did not find any effect.", tr: "Çalışma herhangi bir etki bulmadı.", note: "kısaltma yok" },
          { de: "It was determined that the effect was small.", tr: "Etkinin küçük olduğu saptandı." },
          { de: "It is argued that the categories matter more than the layout.", tr: "Kategorilerin düzenden daha önemli olduğu ileri sürülüyor." },
        ],
      },
    ],
    questions: [
      {
        text: "Nominalise: “They decided quickly.” → “The ___ was quick.”",
        options: ["decision", "deciding", "decide"],
        answer: 0,
        explain: "Fiilin ad biçimi „decision“dır; -ing biçimi burada uygun düşmez.",
      },
      {
        text: "Academic register: “We found out that …” → “It was ___ that …”",
        options: ["determined", "found out", "figured out"],
        answer: 0,
        explain: "Öbek fiil yerine tek kelimelik karşılık tercih edilir: determine.",
      },
      {
        text: "Which sentence is the most formal?",
        options: [
          "The results indicate a decrease.",
          "The results show things went down.",
          "Things got worse in the results.",
        ],
        answer: 0,
        explain: "Adlaştırma ve tek kelimelik fiil akademik kaydın işaretidir.",
      },
      {
        kind: "gapfill",
        text: "Nominalise: “Prices increased.” → “The ___ in prices was small.”",
        options: [],
        answer: 0,
        accept: ["increase"],
        explain: "Fiil ada dönüşür ve arkasından „in“ edatı gelir.",
      },
      {
        kind: "gapfill",
        text: "“We removed the bench.” → “The ___ of the bench followed a complaint.”",
        options: [],
        answer: 0,
        accept: ["removal"],
        explain: "„remove“ fiilinin ad biçimi „removal“dır.",
      },
      {
        kind: "gapfill",
        text: "“They analyzed the data.” → “The ___ of the data took three weeks.”",
        options: [],
        answer: 0,
        accept: ["analysis"],
        explain: "„analyze“ fiilinin ad biçimi „analysis“tir.",
      },
      {
        kind: "gapfill",
        text: "Formal: “The study didn't find any effect.” → “The study ___ not find any effect.”",
        options: [],
        answer: 0,
        accept: ["did"],
        explain: "Akademik kayıtta kısaltma açılır: didn't → did not.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["The", "removal", "of", "the", "bench", "followed"],
        explain: "Adlaştırılmış öbek özne olur ve fiil arkasından gelir.",
      },
      {
        kind: "truefalse",
        text: "Adlaştırma her zaman daha dürüst bir anlatım sağlar.",
        options: ["True", "False"],
        answer: 1,
        explain: "Adlaştırma faili ve zamanı düşürür; bu bazen kaçamak bir anlatıma yol açar.",
      },
      {
        kind: "truefalse",
        text: "“It is argued that the effect is small.” — Bu ifade akademik kayda uygun mudur?",
        options: ["True", "False"],
        answer: 0,
        explain: "İddiayı kaynağını söylemeden ve ölçülü biçimde taşır; akademik kayıtta yerleşik bir kalıptır.",
      },
    ],
  },
];
