import type { SkillExercise } from "../../types";

/**
 * EN · C1 — Beceriler kütüphanesi, parti 5.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 5. seti taşır (kimlik sonu 5).
 * Kurallar ve emsal: `en-c1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Alan adı `de` İngilizce metni taşır; `en` alanı bu kursta yazılmaz.
 * Kalan türler: kurum raporu, konferans konuşması ve kişisel deneme.
 * Üçü de bağlayıcılarla ve bilgi sırasıyla çalışıyor.
 */
export const enC1P5: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-lib-r5",
    course: "en",
    level: "C1",
    skill: "reading",
    title: "School Eye Tests: Three-Year Review",
    genre: "report",
    intro: "Bir okul programının üç yıllık değerlendirmesini okuyacaksın: hangi sayı ne söylüyor, hangi iddia desteklenmiyor.",
    gloss: [
      { de: "prescribe", tr: "reçete etmek" },
      { de: "prescription", tr: "reçete" },
      { de: "remainder", tr: "geri kalan" },
      { de: "arrangement", tr: "düzen" },
      { de: "uptake", tr: "kullanım oranı" },
      { de: "predecessor", tr: "öncel" },
      { de: "fluency", tr: "akıcılık" },
      { de: "caution", tr: "sakındırmak" },
    ],
    minutes: 10,
    text:
      "SCHOOL EYE TESTS AND GLASSES: THREE-YEAR REVIEW\n" +
      "Summary for the education committee\n\n" +
      "Background. In the first year of the scheme, sight tests were offered in school to all pupils in year " +
      "three, and glasses were provided free of charge where they were prescribed. The scheme was introduced " +
      "after a survey found that a fifth of children who had failed a test at a routine appointment had never " +
      "collected the prescription.\n\n" +
      "Coverage. Over three years, four thousand one hundred and eighty children were tested, that is " +
      "ninety-one per cent of the year group; the remainder were absent or had opted out. Of those tested, " +
      "fourteen per cent were prescribed glasses. In other words, roughly one child in seven left the hall with " +
      "a prescription that would otherwise have arrived, at best, several months later.\n\n" +
      "Uptake. This is where the scheme differs from its predecessor. Under the old arrangement, glasses were " +
      "prescribed and the family collected them; uptake was sixty-two per cent. Under the current arrangement, " +
      "the glasses are made and delivered to the school; uptake is ninety-six per cent. The difference is not " +
      "attitude. It is a journey to a shop during opening hours.\n\n" +
      "Effects. Teacher-reported reading fluency improved in the treated group. The design does not, however, " +
      "allow us to say by how much, since there was no comparison class. Attendance did not change. We would " +
      "therefore caution against the claim, made in one newspaper report, that the scheme has improved results; " +
      "nothing here supports that.\n\n" +
      "Costs. The scheme costs thirty-one euros per child tested, of which nineteen is the frames. A second " +
      "pair, requested by forty per cent of families, would add eleven euros. We recommend funding it, and not " +
      "primarily for convenience: children who break their only pair go without for an average of five weeks.\n\n" +
      "Recommendation. Continue the scheme, extend it to year seven rather than to a second year group, and " +
      "stop reporting uptake as a success measure. It is now high enough that it tells us nothing, whereas the " +
      "five-week gap tells us a great deal.",
    questions: [
      {
        text: "What does the report recommend?",
        options: [
          "continuing the scheme and extending it to year seven",
          "stopping the scheme after the third year",
          "returning to the previous arrangement",
        ],
        answer: 0,
        explain: "„Continue the scheme, extend it to year seven rather than to a second year group …“",
      },
      {
        text: "Why did uptake rise?",
        options: [
          "The glasses are delivered to the school.",
          "The prescription is valid for a longer period.",
          "The year group is tested twice instead of once.",
        ],
        answer: 0,
        explain: "„Under the current arrangement, the glasses are made and delivered to the school … It is a journey to a shop during opening hours.“",
      },
      {
        kind: "truefalse",
        text: "The report confirms that the scheme has improved results.",
        options: ["True", "False"],
        answer: 1,
        explain: "„We would therefore caution against the claim … that the scheme has improved results; nothing here supports that.“",
      },
      {
        kind: "gapfill",
        text: "Under the old arrangement, uptake was ___ per cent.",
        options: [],
        answer: 0,
        accept: ["sixty-two", "62", "sixty two"],
        explain: "„Under the old arrangement … uptake was sixty-two per cent.“",
      },
      {
        kind: "short_answer",
        text: "How long do children go without a broken pair?",
        options: [],
        answer: 0,
        accept: ["five weeks", "about five weeks", "an average of five weeks"],
        explain: "„… children who break their only pair go without for an average of five weeks.“",
      },
      {
        text: "Why should uptake no longer be reported as a success measure?",
        options: [
          "It is now too high to be informative.",
          "It has become too hard to measure.",
          "It was never accurately recorded.",
        ],
        answer: 0,
        explain: "„It is now high enough that it tells us nothing, whereas the five-week gap tells us a great deal.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-lib-l5",
    course: "en",
    level: "C1",
    skill: "listening",
    title: "Writing for Somebody in a Hurry",
    genre: "meeting",
    intro: "Bir konferans konuşması dinleyeceksin: acele okuyan biri için nasıl yazılır ve bağlayıcılar ne zaman zarar verir.",
    gloss: [
      { de: "draft", tr: "taslak" },
      { de: "skim", tr: "göz gezdirmek" },
      { de: "paragraph", tr: "paragraf" },
      { de: "connective", tr: "bağlayıcı" },
      { de: "redundant", tr: "gereksiz" },
      { de: "assumption", tr: "varsayım" },
    ],
    minutes: 10,
    segments: [
      { text: "Thank you. My subject this morning is not clear writing in general. It is writing for one specific reader: somebody who is going to skim your text in ninety seconds and then decide something." },
      { text: "That reader is common in every organization and almost never described in style guides, which tend to assume a reader who begins at the beginning." },
      { text: "Three points, then two warnings. First: put the conclusion where it can be found. Not at the end, and not, please, in the subject line only." },
      { text: "Second: one idea per paragraph, and the idea in the first sentence. A reader who is skimming reads first sentences. If your first sentences do not form a summary, you do not have a structure; you have a sequence." },
      { text: "Third: repeat the noun. Pronouns are cheap for the writer and expensive for a reader who has jumped in halfway. Say the committee again, even if you said it two lines earlier." },
      { text: "Now the warnings, and this is where I disagree with most guides. The first concerns connectives. However, moreover, furthermore: these are useful, but they are also the easiest way to sound organized without being organized." },
      { text: "If the order of your sentences already carries the argument, a connective adds nothing. If the order does not, a connective will not rescue it. In other words, the marker should confirm a relation that is already there." },
      { text: "The second warning is about summaries. A summary that repeats the text in shorter words is redundant. A summary that states what follows from the text is not." },
      { text: "Test it like this. Delete every connective from your draft and read it again. Most of the text will survive. Wherever the argument collapses, you have found a real join, and that is where a marker belongs." },
      { text: "One last assumption I would ask you to drop: that a reader in a hurry is a careless reader. In my experience it is the opposite. That reader is the one who notices when a sentence does not follow." },
    ],
    questions: [
      {
        text: "Which reader is the talk about?",
        options: [
          "somebody who skims and then decides",
          "somebody who reads every word closely",
          "somebody who reads only the summary",
        ],
        answer: 0,
        explain: "„… somebody who is going to skim your text in ninety seconds and then decide something.“",
      },
      {
        text: "Why does the speaker recommend repeating the noun?",
        options: [
          "Pronouns are expensive for a reader who joins halfway.",
          "Pronouns are considered too informal in reports.",
          "Repetition makes a text sound more confident.",
        ],
        answer: 0,
        explain: "„Pronouns are cheap for the writer and expensive for a reader who has jumped in halfway.“",
      },
      {
        kind: "truefalse",
        text: "The speaker calls a summary useful only if it goes beyond the text.",
        options: ["True", "False"],
        answer: 0,
        explain: "„A summary that repeats the text in shorter words is redundant. A summary that states what follows from the text is not.“",
      },
      {
        kind: "short_answer",
        text: "What test does the speaker propose?",
        options: [],
        answer: 0,
        accept: ["delete every connective", "remove the connectives", "delete the markers"],
        explain: "„Delete every connective from your draft and read it again.“",
      },
      {
        kind: "dictation",
        text: "Bağlayıcıları silme testinin sonucunu anlatan cümleyi duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Most of the text will survive.", "Most of the text will survive"],
        explain: "„Most of the text will survive.“ — bağlayıcıların çoğu gerçek bir ilişkiyi taşımıyor demektir.",
      },
      {
        text: "Which assumption does the speaker ask the audience to drop?",
        options: [
          "that a hurried reader is a careless reader",
          "that summaries are always unnecessary",
          "that style guides are written by experts",
        ],
        answer: 0,
        explain: "„One last assumption I would ask you to drop: that a reader in a hurry is a careless reader.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-lib-w5",
    course: "en",
    level: "C1",
    skill: "writing",
    title: "Something I Changed My Mind About",
    genre: "essay",
    intro: "Fikrini değiştirdiğin bir konuyu anlatan kısa bir deneme yazacaksın; önce iki cümle kur, sonra denemeyi yaz.",
    gloss: [
      { de: "handover", tr: "devir" },
      { de: "thin", tr: "zayıf" },
      { de: "concede", tr: "kabul etmek" },
      { de: "suspicion", tr: "kuşku" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Bu doğru; ne var ki bütün hikâye değil.",
        answer: "That is true; it is not, however, the whole story.",
        alternatives: ["That is true; however, it is not the whole story."],
        hint: "„however“ cümle içinde de durabilir ve iki virgülle ayrılır; anlamı değil, ritmi değişir.",
      },
      {
        kind: "build",
        tr: "Kanıt zayıftı. Buna rağmen yıllarca ona güvendim.",
        answer: "The evidence was thin. Even so, I relied on it for years.",
        alternatives: ["The evidence was thin. I relied on it for years even so."],
        hint: "„even so“ beklenmeyen bir devamı işaret eder ve genelde cümle başında durur.",
      },
      {
        kind: "free",
        prompt:
          "Fikrini değiştirdiğin bir konuyu anlat: eski kanaatin neydi ve neden makuldü, seni sarsan şey neydi, bugün ne düşünüyorsun, neden bu kadar sürdü ve eski görüşünden ne kaldı. Bağlayıcıları yalnız gerçekten gerektiği yerde kullan.",
        checklist: [
          "Eski kanaatini ve neden makul olduğunu yaz",
          "Seni sarsan somut olayı anlat",
          "Bugünkü ayrımını tek cümleyle koy",
          "Neden geç olduğunu ve eskiden kalanı söyle",
        ],
        minWords: 120,
        phrases: [
          { de: "For a long time I believed that …", tr: "Uzun süre … olduğuna inandım" },
          { de: "That is true; it is not, however, …", tr: "Bu doğru; ne var ki … değil" },
          { de: "Even so, …", tr: "Buna rağmen, …" },
          { de: "What I now think is narrower: …", tr: "Bugün düşündüğüm şey daha dar: …" },
          { de: "What I would still defend is …", tr: "Hâlâ savunacağım şey …" },
        ],
        sample:
          "For a long time I believed that meetings were a symptom. If a team met often, I thought, it was " +
          "because the work had not been divided properly, and the right answer was to divide it better. That " +
          "is true of some meetings; it is not, however, true of the kind I was actually complaining about.\n\n" +
          "The thing that changed my mind was a handover. A colleague left, and we discovered that four " +
          "decisions we treated as settled had never been written anywhere. They existed only as a shared " +
          "understanding, and the understanding had been produced in exactly those meetings I had been calling " +
          "a waste. The evidence for my old position had always been thin: I had counted the hours, which are " +
          "easy to count, and not the agreements, which are not. Even so, I had relied on it for years.\n\n" +
          "What I now think is narrower. A meeting that transfers information is usually a badly written " +
          "document. A meeting in which a group arrives at a shared judgment is not replaceable by a document, " +
          "because the document records the conclusion and not the ownership of it.\n\n" +
          "It took me a long time partly because my old rule worked in the easy cases, which are the majority. " +
          "What I would still defend is the original suspicion. Most meetings are indeed a symptom, and the test " +
          "is simple: if the meeting could have been an email, it should have been. The mistake was to assume " +
          "that the reverse never applies.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-c1-lib-s5",
    course: "en",
    level: "C1",
    skill: "speaking",
    title: "What Makes an Explanation Stick?",
    genre: "monologue",
    intro: "İki dakikaya kadar konuşacaksın: kolay cevabı ele, iki koşul öner ve ikisini de örnekle.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Bir açıklamanın akılda kalmasını ne sağlar? Yaygın cevabı sına, en az iki koşul öner, her birini örnekle ve neyin işe yaramadığını söyle.",
      bulletsTr: [
        "Yaygın cevabı adlandır ve neden yetersiz olduğunu söyle",
        "Birinci koşulu ver ve örnekle",
        "İkinci koşulu ver ve örnekle",
        "İşe yaramayan yaygın bir tekniği söyle",
      ],
      targets: [
        { de: "The usual answer is simplicity; that said, …", tr: "Alışıldık cevap sadelik; bununla birlikte …" },
        { de: "The first condition is …", tr: "Birinci koşul …" },
        { de: "In other words, …", tr: "Başka bir deyişle, …" },
        { de: "What does not work, in my experience, is …", tr: "Benim deneyimimde işe yaramayan şey …" },
      ],
      minSeconds: 60,
      maxSeconds: 110,
      sampleDe:
        "The usual answer is simplicity; that said, I have heard a great many simple explanations that " +
        "disappeared within an hour, so simplicity cannot be the whole of it. Two conditions seem to matter " +
        "more. The first condition is that the explanation has to answer a question the listener already had. " +
        "If I explain how a lock works to somebody who has never been locked out, I am giving information; if I " +
        "explain it on the doorstep, I am answering. In other words, the same sentence is memorable or " +
        "forgettable depending on when it arrives, which is inconvenient for teachers and central to teaching. " +
        "The second condition is that a good explanation gives you something to do with it. Not an exercise, " +
        "necessarily, but a distinction you can apply the next day. When somebody told me that a form is a " +
        "classification and not a layout, I could not stop seeing it, and that is why I still have the sentence " +
        "eight years later. What does not work, in my experience, is the metaphor chosen for charm rather than " +
        "for structure. A vivid image that does not match the thing it describes is worse than no image at all, " +
        "because it survives the explanation and then has to be removed one misunderstanding at a time.",
      rubricHint:
        "Yaygın cevap sınanmalı, en az iki koşul örneklenmeli ve bağlayıcılar gerçekten ilişki kurduğu yerde kullanılmalı.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-c1-lib-g5",
    course: "en",
    level: "C1",
    skill: "grammar",
    title: "however, that said, in other words",
    genre: "grammar",
    intro: "Bağlayıcılar içerik eklemez; okura hangi ilişkinin geldiğini söyler ve yanlış kullanıldıklarında düzeni taklit ederler.",
    focus: "Söylem belirteçleri ve bağdaşıklık",
    gloss: [
      { de: "consistent", tr: "tutarlı" },
      { de: "uptake", tr: "kullanım oranı" },
      { de: "objection", tr: "itiraz" },
      { de: "benefit", tr: "kazanç" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "Dört aile",
        tr: "Bağlayıcılar dört işi görür: karşıtlık (however, nevertheless, that said), ekleme (moreover, in addition), yeniden ifade (in other words, that is) ve sonuç (therefore, hence, accordingly). Türkçede bu işi „ne var ki“, „ayrıca“, „yani“, „dolayısıyla“ görür.",
        examples: [
          { de: "The result was small; nevertheless, it was consistent.", tr: "Sonuç küçüktü; yine de tutarlıydı." },
          { de: "Prices rose. In other words, the plan became more expensive.", tr: "Fiyatlar arttı. Yani plan pahalılaştı." },
          { de: "The class had no comparison group. We therefore cannot say how much.", tr: "Sınıfın karşılaştırma grubu yoktu. Bu yüzden ne kadar olduğunu söyleyemeyiz." },
        ],
      },
      {
        heading: "however bir bağlaç değildir",
        tr: "En sık hata budur: „It rained, however we went“ yanlıştır, çünkü „however“ iki cümleyi bağlayamaz. Ya nokta ya noktalı virgül gerekir. Ayrıca cümlenin ortasına da girebilir ve iki virgülle ayrılır.",
        examples: [
          { de: "It rained; however, we went for a walk.", tr: "Yağmur yağdı; yine de yürüyüşe çıktık." },
          { de: "The costs are fixed; the benefits, however, are not.", tr: "Maliyetler sabit; kazançlar ise değil.", note: "orta konum" },
          { de: "That said, the objection is real.", tr: "Bununla birlikte, itiraz gerçek." },
        ],
      },
      {
        heading: "Bağdaşıklık yalnız bağlayıcı değildir",
        tr: "Metni tutan asıl şey sıradır: bilinen bilgi önce, yeni bilgi sonra. Buna ismi tekrar etmek ve zamiri fazla kullanmamak eklenir. Sıra zaten iş görüyorsa bağlayıcı eklemek metni ağırlaştırır, düzenli göstermez.",
        examples: [
          { de: "The report has two parts. The first sets out the figures; the second draws conclusions from them.", tr: "Raporun iki bölümü var. İlki rakamları veriyor, ikincisi onlardan sonuç çıkarıyor.", note: "bilinen önce" },
          { de: "Repeat the name of the department rather than writing it a third time.", tr: "Zamir yerine birimin adını tekrar et, üçüncü kez yazmaktansa." },
          { de: "Remove the linking words and see what still holds.", tr: "Bağlayıcı kelimeleri çıkar ve neyin ayakta kaldığına bak." },
        ],
      },
    ],
    questions: [
      {
        text: "It rained. ___, we went for a walk.",
        options: ["However", "Although", "Despite"],
        answer: 0,
        explain: "Ayrı bir cümle başlatan zarf gerekiyor; „although“ ve „despite“ bağlaç ve edattır.",
      },
      {
        text: "The result was small; ___, it was consistent.",
        options: ["nevertheless", "despite", "although"],
        answer: 0,
        explain: "Noktalı virgülden sonra bir zarf gelir: nevertheless.",
      },
      {
        text: "Which sentence is punctuated correctly?",
        options: [
          "It rained; however, we went.",
          "It rained, however we went.",
          "It rained however, we went.",
        ],
        answer: 0,
        explain: "„however“ iki cümleyi bağlayamaz; nokta ya da noktalı virgül gerekir.",
      },
      {
        kind: "gapfill",
        text: "Prices rose. ___ other words, the plan became more expensive.",
        options: [],
        answer: 0,
        accept: ["In", "in"],
        explain: "Yeniden ifade kalıbı: in other words.",
      },
      {
        kind: "gapfill",
        text: "The evidence was thin. ___ so, I relied on it for years.",
        options: [],
        answer: 0,
        accept: ["Even", "even"],
        explain: "„even so“ beklenmeyen bir devamı işaret eder.",
      },
      {
        kind: "gapfill",
        text: "The costs are fixed; the benefits, ___, are not.",
        options: [],
        answer: 0,
        accept: ["however"],
        explain: "„however“ cümlenin ortasında iki virgül arasında durabilir.",
      },
      {
        kind: "gapfill",
        text: "The tests were free. ___, uptake was low.",
        options: [],
        answer: 0,
        accept: ["Nevertheless", "Even so", "Still"],
        explain: "Beklenenin tersi bir sonuç geliyor; karşıtlık belirteci gerekir.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["That", "said", "the", "objection", "is", "real"],
        explain: "„That said“ önceki cümleye ödün verir ve virgülle ayrılır: That said, the objection is real.",
      },
      {
        kind: "truefalse",
        text: "“It rained, however we stayed at home.” — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„however“ bağlaç değildir; virgül yerine nokta ya da noktalı virgül gerekir.",
      },
      {
        kind: "truefalse",
        text: "“That said, the objection is real.” — Bu ifade önceki cümleye ödün verir.",
        options: ["True", "False"],
        answer: 0,
        explain: "„That said“ bir önceki iddiayı kabul edip sınırlandırır; karşıtlık ailesindendir.",
      },
    ],
  },
];
