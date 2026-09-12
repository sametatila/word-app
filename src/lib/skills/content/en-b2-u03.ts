import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 3 — "Resmî açılış, dikkatli söylemek, talep, sorunun
 * kendisi".
 *
 * Dört ders: Opening a formal talk · Saying it carefully · The claim ·
 * What the issue is.
 *
 *   Kelime: pleasure, moderate, assemble, introduction, speech, applause,
 *           opening, participate, apparently, admittedly, rather,
 *           nevertheless, presumably, roughly, hence, accordingly,
 *           supplier, damages, liability, dispute, remedy, correspondence,
 *           attachment, compensate, contest, threshold, unacceptable,
 *           acceptable, satisfactory, sufficient, minimal, demand.
 *   Kalıp:  Rarely have I had such a pleasure. ·
 *           Not only did she moderate, she also spoke. ·
 *           Never before has this group assembled here. ·
 *           Apparently the figures have changed. ·
 *           Admittedly, the plan is rather slow. ·
 *           The cost is high; nevertheless, we continue. ·
 *           It is claimed that the supplier was late. ·
 *           The damages are said to be small. ·
 *           Liability is thought to rest with us. ·
 *           What we contest is the delay. ·
 *           It was the threshold that changed. ·
 *           What is unacceptable is the silence.
 *
 * Ünitenin tek öğretme noktası DEVRİK SIRA ÇOK DAR BİR KAPI. Olumsuz ya
 * da sınırlayıcı bir zarf öne geçince yardımcı fiil özneden ÖNE geliyor
 * („Rarely have I …“), taşınacak yardımcı fiil yoksa „do“ bunun için
 * geliyor. Başka HİÇBİR öğe öne geçtiğinde sıra değişmiyor: „Yesterday I
 * spoke to her“ olduğu gibi kalıyor.
 */
export const enB2U03: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u03-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 3,
    title: "Opening a formal talk",
    genre: "opinion",
    intro: "Yardımcı fiil özneden öne geçiyor. Hangi zarftan sonra?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "plain", tr: "yalın" },
      { de: "appears", tr: "beliriyor" },
      { de: "trick", tr: "numara" },
      { de: "slightly", tr: "biraz" },
      { de: "belongs", tr: "ait" },
      { de: "myself", tr: "kendime" },
      { de: "ordinary", tr: "olağan" },
      { de: "inversion", tr: "devrik sıra" },
      { de: "sounds", tr: "kulağa geliyor" },
      { de: "himself", tr: "kendisini" },
      { de: "narrow", tr: "dar" },
      { de: "limiting", tr: "sınırlayıcı" },
      { de: "an adverbial", tr: "zarf öbeği" },
      { de: "seldom", tr: "seyrek" },
      { de: "no sooner", tr: "daha … demeden" },
      { de: "the auxiliary", tr: "yardımcı fiil" },
      { de: "inverted", tr: "devrik" },
      { de: "a costume", tr: "kostüm" },
      { de: "the temptation", tr: "ayartı" },
      { de: "an audience", tr: "dinleyici topluluğu" },
      { de: "prepared", tr: "hazırlanmış" },
      { de: "a chat", tr: "sohbet" },
      { de: "precisely", tr: "tam olarak" },
      { de: "plainly", tr: "yalın biçimde" },
    ],
    minutes: 9,
    text:
      "Rarely have I had such a pleasure. Read that again and notice what has moved: „have“ has gone in front of „I“, and the sentence is now doing something a plain one cannot.\n" +
      "The rule is narrow. Put a negative or a limiting adverbial at the front — rarely, never, seldom, not only, no sooner — and the auxiliary has to come before the subject. Put anything else at the front and nothing moves at all. „Yesterday I spoke to her“ keeps its order; „Never have I spoken to her“ does not.\n" +
      "Not only did she moderate, she also spoke. When there is no auxiliary to move, „do“ appears just so that something can move, which is the same trick the language uses in a question.\n" +
      "Never before has this group assembled here. The effect is formal and slightly old, and that is precisely why it belongs in an opening. A speech has about eight seconds in which the room decides how to listen, and an inverted first sentence tells them, without saying so, that this is a prepared piece of language and not a chat.\n" +
      "Used twice in a paragraph it becomes a costume. I allow myself one, usually the first sentence, and then I write plainly for as long as the talk lasts.\n" +
      "The thing to watch is the applause line at the end, where the temptation returns. An audience that has been sitting for forty minutes wants a short sentence in the ordinary order, and inversion there sounds like somebody who cannot stop introducing himself.",
    questions: [
      {
        text: "What has to come before the subject?",
        options: ["the auxiliary", "the adverbial", "nothing at all"],
        answer: 0,
        explain: "„the auxiliary has to come before the subject.“",
      },
      {
        text: "Why is „do“ there?",
        options: ["so that something can move", "to make it formal", "to save time"],
        answer: 0,
        explain: "„When there is no auxiliary to move, „do“ appears just so that something can move…“",
      },
      {
        kind: "truefalse",
        text: "„Yesterday I spoke to her“ changes its order too.",
        options: ["True", "False"],
        answer: 1,
        explain: "„„Yesterday I spoke to her“ keeps its order…“",
      },
      {
        kind: "gapfill",
        text: "Never before ___ this group assembled here.",
        options: [],
        answer: 0,
        accept: ["has"],
        explain: "„Never before has this group assembled here.“",
      },
      {
        kind: "order",
        text: "Açılışın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Rarely have I had such a pleasure.",
          "Not only did she moderate, she also spoke.",
          "Never before has this group assembled here.",
          "I allow myself one, usually the first sentence.",
        ],
        explain: "Üç devrik örnek, en sonda yazarın kendi kuralı.",
      },
      {
        kind: "short_answer",
        text: "What does an audience want at the end?",
        options: [],
        answer: 0,
        accept: ["a short sentence", "the ordinary order", "something plain"],
        explain: "„wants a short sentence in the ordinary order…“",
      },
    ],
  },
  {
    id: "en-b2-u03-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 3,
    title: "The claim",
    genre: "info",
    intro: "Mesafe koyan cümleler. Ne zaman bedeli oluyor?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "nouns", tr: "isimler" },
      { de: "own", tr: "kendi" },
      { de: "passive", tr: "edilgen" },
      { de: "either", tr: "ikisinden biri" },
      { de: "contains", tr: "içeriyor" },
      { de: "sentences", tr: "cümleler" },
      { de: "row", tr: "sıra" },
      { de: "none", tr: "hiçbiri" },
      { de: "plain", tr: "yalın" },
      { de: "distance", tr: "mesafe" },
      { de: "proving", tr: "kanıtlamak" },
      { de: "the route", tr: "yol" },
      { de: "an infinitive", tr: "mastar" },
      { de: "scanning", tr: "göz gezdirmek" },
      { de: "at arm's length", tr: "uzak tutarak" },
      { de: "evasive", tr: "kaçamak" },
      { de: "asserted", tr: "ileri sürülmüş" },
      { de: "conceded", tr: "kabul edilmiş" },
      { de: "a technique", tr: "teknik" },
      { de: "the file", tr: "dosya" },
      { de: "untouched", tr: "el değmemiş" },
      { de: "protecting", tr: "koruyan" },
      { de: "a clause", tr: "cümlecik" },
    ],
    minutes: 9,
    text:
      "It is claimed that the supplier was late. Four words before the claim even starts, and every one of them is doing work.\n" +
      "„It is claimed“ says that somebody is saying this and that we are not yet saying it is true. In a letter about a dispute that distance is the point. The moment the sentence becomes „the supplier was late“, the writer has taken on the job of proving it.\n" +
      "The damages are said to be small. The same distance by the shorter route: the subject comes out of the clause and an infinitive is left behind. In correspondence the shorter route is used more often, because the reader is scanning for the nouns.\n" +
      "Liability is thought to rest with us. That one is worth reading slowly. It is our own letter, and the passive is holding our own position at arm's length — which is either careful or evasive, depending on what the attachment contains.\n" +
      "The remedy is the part these sentences are usually protecting. As long as nothing is asserted, nothing has been conceded, and the correspondence can run for months without either side writing a sentence they would have to defend.\n" +
      "There is a point where that stops being a technique and becomes a cost. If four letters in a row say what is claimed, said and thought, and none of them says what happened, the file is longer and the question is untouched. At that point somebody has to write a plain sentence and compensate for the distance the grammar has been keeping.",
    questions: [
      {
        text: "What happens when the sentence loses „it is claimed“?",
        options: ["the writer has to prove it", "the letter gets shorter", "the claim goes"],
        answer: 0,
        explain: "„the writer has taken on the job of proving it.“",
      },
      {
        text: "Why is the shorter route used in correspondence?",
        options: ["the reader scans for nouns", "it is more polite", "it is older"],
        answer: 0,
        explain: "„because the reader is scanning for the nouns.“",
      },
      {
        kind: "truefalse",
        text: "The distance is always careful.",
        options: ["True", "False"],
        answer: 1,
        explain: "„which is either careful or evasive, depending on what the attachment contains.“",
      },
      {
        kind: "gapfill",
        text: "The damages are said to be ___.",
        options: [],
        answer: 0,
        accept: ["small"],
        explain: "„The damages are said to be small.“",
      },
      {
        kind: "order",
        text: "Mektubun sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "It is claimed that the supplier was late.",
          "The damages are said to be small.",
          "Liability is thought to rest with us.",
          "Somebody has to write a plain sentence.",
        ],
        explain: "Uzun yol, kısa yol, kendi konumumuz, en sonda çıkış.",
      },
      {
        kind: "short_answer",
        text: "What are these sentences protecting?",
        options: [],
        answer: 0,
        accept: ["the remedy", "remedy", "the position"],
        explain: "„The remedy is the part these sentences are usually protecting.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u03-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 3,
    title: "Saying it carefully",
    genre: "dialogue",
    intro: "Zarflar iki işe ayrılıyor: ses düzeyi ve yön.",
    gloss: [
      { de: "whole", tr: "bütün" },
      { de: "plain", tr: "yalın" },
      { de: "sentence", tr: "cümle" },
      { de: "somewhere", tr: "bir yerde" },
      { de: "sound", tr: "ses" },
      { de: "pair", tr: "çift" },
      { de: "own", tr: "kendi" },
      { de: "per", tr: "başına" },
      { de: "step back", tr: "geri çekilmek" },
      { de: "conceding", tr: "kabul ederek" },
      { de: "the volume", tr: "ses düzeyi" },
      { de: "a control", tr: "ayar düğmesi" },
      { de: "a sign", tr: "işaret" },
      { de: "overuse", tr: "fazla kullanmak" },
      { de: "believing", tr: "inanmak" },
      { de: "odd", tr: "tuhaf" },
      { de: "softer", tr: "daha yumuşak" },
      { de: "the opposite", tr: "karşıtı" },
      { de: "buys", tr: "kazandırıyor" },
      { de: "carries", tr: "taşıyan" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Kaan", text: "Apparently the figures have changed. That is the whole message, and it is doing something a plain sentence cannot." },
      { speaker: "Zehra", text: "Which is?" },
      { speaker: "Kaan", text: "It reports and it steps back at the same time. „The figures have changed“ makes me the source. „Apparently“ puts the source somewhere else and leaves me holding nothing." },
      { speaker: "Zehra", text: "And „admittedly“?" },
      { speaker: "Kaan", text: "That is the opposite move. Admittedly, the plan is rather slow. I am conceding something before anybody makes me, which buys the right to say the next sentence." },
      { speaker: "Zehra", text: "„Rather“ is doing something there too." },
      { speaker: "Kaan", text: "„Rather slow“ is slower than „slow“ in meaning and softer in sound, which is an odd pair. Half of these words are volume controls and the other half are direction signs." },
      { speaker: "Zehra", text: "Give me the direction ones." },
      { speaker: "Kaan", text: "„Nevertheless“ turns. The cost is high; nevertheless, we continue. „Hence“ and „accordingly“ go forward: this, therefore that. „Presumably“ and „roughly“ are the volume, and they are the ones people overuse." },
      { speaker: "Zehra", text: "Why overuse?" },
      { speaker: "Kaan", text: "Because they cost nothing and they feel careful. Four of them in a paragraph and the reader stops believing any of it, which is the opposite of what each one was doing on its own." },
      { speaker: "Zehra", text: "So one per paragraph." },
      { speaker: "Kaan", text: "One per paragraph, and never in the sentence that carries the number." },
    ],
    questions: [
      {
        text: "What does „apparently“ do to the source?",
        options: ["puts it somewhere else", "names it", "removes the claim"],
        answer: 0,
        explain: "„„Apparently“ puts the source somewhere else and leaves me holding nothing.“",
      },
      {
        text: "Which word turns?",
        options: ["nevertheless", "hence", "roughly"],
        answer: 0,
        explain: "„„Nevertheless“ turns. The cost is high; nevertheless, we continue.“",
      },
      {
        kind: "truefalse",
        text: "Four of them in a paragraph makes the reader believe more.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Four of them in a paragraph and the reader stops believing any of it…“",
      },
      {
        kind: "gapfill",
        text: "Admittedly, the plan is ___ slow.",
        options: [],
        answer: 0,
        accept: ["rather"],
        explain: "„Admittedly, the plan is rather slow.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Apparently the figures have changed.", "Apparently the figures have changed"],
        explain: "Bildiriyor ve aynı anda geri çekiliyor.",
      },
      {
        kind: "short_answer",
        text: "Where should these words never go?",
        options: [],
        answer: 0,
        accept: ["with the number", "in the number sentence", "next to a figure"],
        explain: "„never in the sentence that carries the number.“",
      },
    ],
  },
  {
    id: "en-b2-u03-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 3,
    title: "What the issue is",
    genre: "monologue",
    intro: "Bir uyuşmazlıkta yarık cümle. Neden tek bir şey?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "plain", tr: "yalın" },
      { de: "noun", tr: "isim" },
      { de: "per", tr: "başına" },
      { de: "above", tr: "yukarıda" },
      { de: "the absence", tr: "yokluk" },
      { de: "a position", tr: "konum" },
      { de: "loud", tr: "yüksek sesli" },
      { de: "shouts", tr: "bağırıyor" },
      { de: "a lawyer", tr: "avukat" },
      { de: "deliberately", tr: "bilerek" },
      { de: "unnecessary", tr: "gereksiz" },
      { de: "earn", tr: "hak etmek" },
      { de: "a figure", tr: "rakam" },
      { de: "afterwards", tr: "sonradan" },
      { de: "built", tr: "kurulmuş" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Barış", text: "What we contest is the delay. Not the price, not the wording, not the attachment — the delay, and the sentence is built so that nothing else can be heard." },
      { speaker: "Barış", text: "In a dispute that matters more than in any other kind of writing. The other side will answer the thing they think you said, and a plain sentence leaves them a choice about what that was." },
      { speaker: "Barış", text: "It was the threshold that changed. The same shape, a different half: this one fixes on the noun and everything else goes behind it." },
      { speaker: "Barış", text: "What is unacceptable is the silence. Three weeks, four letters from us, and no reply is not a position — it is the absence of one." },
      { speaker: "Barış", text: "I keep a rule for these. One per letter. The shape is loud, and a letter in which every paragraph shouts is a letter that gets answered by a lawyer rather than by a person." },
      { speaker: "Barış", text: "What is acceptable, since somebody always asks, is a date. Not a remedy yet, not a figure. A date is the minimal thing that would make the next letter unnecessary." },
      { speaker: "Barış", text: "The demand at the end is deliberately small. It asks for one thing, it is satisfactory if it arrives, and it is sufficient to show later that we asked." },
      { speaker: "Barış", text: "What we contest is the delay. I wrote that sentence first and everything above it was written afterwards to earn it." },
    ],
    questions: [
      {
        text: "What do they contest?",
        options: ["the delay", "the price", "the wording"],
        answer: 0,
        explain: "„What we contest is the delay.“",
      },
      {
        text: "What is the silence?",
        options: ["the absence of a position", "a position", "a remedy"],
        answer: 0,
        explain: "„no reply is not a position — it is the absence of one.“",
      },
      {
        kind: "truefalse",
        text: "The letter asks for a figure.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Not a remedy yet, not a figure. A date is the minimal thing…“",
      },
      {
        kind: "gapfill",
        text: "It was the ___ that changed.",
        options: [],
        answer: 0,
        accept: ["threshold"],
        explain: "„It was the threshold that changed.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["What is unacceptable is the silence.", "What is unacceptable is the silence"],
        explain: "Yarık cümle bu kez bir yokluğu adlandırıyor.",
      },
      {
        kind: "short_answer",
        text: "How many of these in one letter?",
        options: [],
        answer: 0,
        accept: ["one", "only one", "just one"],
        explain: "„I keep a rule for these. One per letter.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u03-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 3,
    title: "Rarely have I had such a pleasure",
    genre: "opinion",
    intro: "Devrik sıra ve dikkatli zarflar. Hangi kapı dar?",
    gloss: [
      { de: "rarely", tr: "nadiren" },
      { de: "not only", tr: "yalnızca değil" },
      { de: "never before", tr: "daha önce hiç" },
      { de: "apparently", tr: "görünüşe göre" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Böylesi bir memnuniyeti nadiren yaşadım.",
        answer: "Rarely have I had such a pleasure.",
        hint: "Olumsuz zarf başa geçince yardımcı fiil özneden ÖNE geliyor.",
      },
      {
        kind: "build",
        tr: "Yalnızca oturumu yönetmedi, konuşma da yaptı.",
        answer: "Not only did she moderate, she also spoke.",
        hint: "Taşınacak yardımcı fiil yoksa „do“ bunun için geliyor.",
      },
      {
        kind: "build",
        tr: "Bu grup daha önce hiç burada bir araya gelmedi.",
        answer: "Never before has this group assembled here.",
        hint: "„Never before“ da olumsuz zarf; sıra bozuluyor.",
      },
      {
        kind: "build",
        tr: "Görünüşe göre rakamlar değişti.",
        answer: "Apparently the figures have changed.",
        hint: "Bildiriyor ve aynı anda geri çekiliyor; sıra bozulmuyor.",
      },
      {
        kind: "form",
        prompt: "Açılış kartını doldur.",
        facts: "Olumsuz zarf devirir; yardımcı fiil yoksa „do“ gelir; başka öğe devirmez; bir konuşmada bir tane yeter.",
        fields: [
          { label: "Rarely", answer: "have I had", accept: ["such a pleasure"] },
          { label: "Not only", answer: "did she moderate", accept: ["she also spoke"] },
          { label: "Yesterday", answer: "no change", accept: ["I spoke to her"] },
          { label: "How many", answer: "one", accept: ["one in a talk"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u03-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 3,
    title: "What we contest is the delay",
    genre: "info",
    intro: "Yarık cümle ve mesafe. Ne ileri sürülüyor, ne sürülmüyor?",
    gloss: [
      { de: "what we contest", tr: "itiraz ettiğimiz şey" },
      { de: "it was the threshold", tr: "eşikti" },
      { de: "it is claimed that", tr: "ileri sürülüyor ki" },
      { de: "are said to be", tr: "olduğu söyleniyor" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "İtiraz ettiğimiz şey gecikme.",
        answer: "What we contest is the delay.",
        hint: "Yarık cümle: önce boşluk, sonra tek bir şey.",
      },
      {
        kind: "build",
        tr: "Değişen eşikti.",
        answer: "It was the threshold that changed.",
        hint: "Işık isme düşüyor, gerisi „that“ın arkasına gidiyor.",
      },
      {
        kind: "build",
        tr: "Kabul edilemez olan sessizlik.",
        answer: "What is unacceptable is the silence.",
        hint: "Aynı kalıp, bu kez bir yokluğu adlandırıyor.",
      },
      {
        kind: "build",
        tr: "Tedarikçinin geciktiği ileri sürülüyor.",
        answer: "It is claimed that the supplier was late.",
        hint: "Mesafe: söylenen şey henüz doğrulanmış değil.",
      },
      {
        kind: "build",
        tr: "Tazminatın küçük olduğu söyleniyor.",
        answer: "The damages are said to be small.",
        hint: "Kısa yol: özne öne çıkıyor, geriye mastar kalıyor.",
      },
    ],
  },
];
