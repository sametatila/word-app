import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 11 — "Çalışma nasıl işliyor, laboratuvarda, sürecin
 * otomasyonu, veri geldiğinde".
 *
 * Dört ders: How the study works · In the lab ·
 * The automation of the process · When the data lands.
 *
 *   Kelime: experiment, measurement, cohort, dosage, therapy, organism,
 *           mutation, evolution, liquid, catalyst, reaction, crystal,
 *           alloy, molecule, enzyme, particle, automation, invention,
 *           institute, patch, innovation, faculty, thesis, robot,
 *           emission, vehicle, consumption, insulation, electric,
 *           gravity, acceleration, friction.
 *   Kalıp:  It is reported that the experiment was repeated. ·
 *           The measurements are said to be stable. ·
 *           The cohort is thought to have been too small. ·
 *           Having heated the liquid, add the catalyst. ·
 *           Being slow, the reaction needed more heat. ·
 *           Formed on Monday, the crystal was measured. ·
 *           The automation of the process took a year. ·
 *           The invention of the tool changed the institute. ·
 *           The introduction of the patch was delayed. ·
 *           By June the emissions will have been measured. ·
 *           This time next week we will be testing the vehicle. ·
 *           The consumption will have been checked by then.
 *
 * Ünitenin tek öğretme noktası YALIN ORTAÇ İKİ İLİŞKİYİ BİRDEN TAŞIYOR.
 * „Being slow, the reaction needed more heat“ — buradaki „-ing“
 * eşzamanlılık değil NEDEN veriyor; ünite 1'deki „Being absent all week“
 * de öyleydi. İngilizce hangisi olduğunu SÖYLEMİYOR ve seçimi okura
 * bırakıyor; yazarken kural bu yüzden okurkenkinden dar: iki okuma aynı
 * eyleme çıkmıyorsa bağlacı yaz.
 */
export const enB2U11: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u11-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 11,
    title: "In the lab",
    genre: "info",
    intro: "Yalın ortaç ne söylüyor: „aynı anda“ mı, „çünkü“ mü?",
    gloss: [
      { de: "plain", tr: "yalın" },
      { de: "sentence", tr: "cümle" },
      { de: "unit", tr: "ünite" },
      { de: "participle", tr: "ortaç" },
      { de: "laboratory", tr: "laboratuvar" },
      { de: "lead", tr: "götürmek" },
      { de: "action", tr: "eylem" },
      { de: "differ", tr: "ayrılmak" },
      { de: "the sequence", tr: "sıra" },
      { de: "a relation", tr: "ilişki" },
      { de: "guesses", tr: "tahmin ediyor" },
      { de: "chemistry", tr: "kimya" },
      { de: "removal", tr: "çıkarma" },
      { de: "a procedure", tr: "işlem yordamı" },
      { de: "a method section", tr: "yöntem bölümü" },
      { de: "narrower", tr: "daha dar" },
      { de: "elegance", tr: "zariflik" },
      { de: "a conjunction", tr: "bağlaç" },
      { de: "a reading", tr: "okuma" },
      { de: "improved", tr: "iyileştirilmiş" },
      { de: "an imperative", tr: "emir kipi" },
      { de: "a count", tr: "sayım" },
    ],
    minutes: 9,
    text:
      "Having heated the liquid, add the catalyst. The order is given and the sequence is given, and the second half is an imperative whose subject is the reader.\n" +
      "Being slow, the reaction needed more heat. Now look at what the plain „-ing“ is doing here, because it is not what it did in the first sentence. There is no time gap. But there is something else, and it is a reason: the reaction needed more heat because it was slow.\n" +
      "That is the thing this unit is about. The plain participle carries two relations — at the same time, and because — and it does not say which. English leaves the choice to the reader, and in a laboratory note the reader almost always guesses right, because only one of the two makes sense of the chemistry.\n" +
      "Almost always is not always. „Being warm, the enzyme was removed“ can mean it was removed because it was warm, or that it was warm at the moment of removal, and those are different procedures.\n" +
      "Formed on Monday, the crystal was measured. The third shape, with the third form at the front, so somebody formed it and the sentence does not say who. In a method section that is correct: a procedure is not about the person.\n" +
      "So the rule for writing them is narrower than the rule for reading them. Use the plain „-ing“ where the two readings would lead to the same action. Where they would not, write the conjunction and lose the three words. A molecule does not care about elegance, and a particle count is not improved by a participle.",
    questions: [
      {
        text: "What does the plain „-ing“ do in the second sentence?",
        options: ["it gives a reason", "it gives a time gap", "it gives an order"],
        answer: 0,
        explain: "„there is something else, and it is a reason…“",
      },
      {
        text: "Why does the reader usually guess right?",
        options: ["only one reading makes sense", "the writer says which", "the order is fixed"],
        answer: 0,
        explain: "„because only one of the two makes sense of the chemistry.“",
      },
      {
        kind: "truefalse",
        text: "The rule for writing them is the same as for reading them.",
        options: ["True", "False"],
        answer: 1,
        explain: "„the rule for writing them is narrower than the rule for reading them.“",
      },
      {
        kind: "gapfill",
        text: "___ slow, the reaction needed more heat.",
        options: [],
        answer: 0,
        accept: ["Being", "being"],
        explain: "„Being slow, the reaction needed more heat.“",
      },
      {
        kind: "order",
        text: "Yöntemin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Having heated the liquid, add the catalyst.",
          "Being slow, the reaction needed more heat.",
          "Formed on Monday, the crystal was measured.",
          "Use the plain „-ing“ where the two readings agree.",
        ],
        explain: "Üç biçim, en sonda yazma kuralı.",
      },
      {
        kind: "short_answer",
        text: "What should you write where the readings differ?",
        options: [],
        answer: 0,
        accept: ["the conjunction", "a conjunction", "the full clause"],
        explain: "„Where they would not, write the conjunction and lose the three words.“",
      },
    ],
  },
  {
    id: "en-b2-u11-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 11,
    title: "How the study works",
    genre: "opinion",
    intro: "Üç aktarma. Üçüncüsü zamanı nereye koyuyor?",
    gloss: [
      { de: "sentences", tr: "cümleler" },
      { de: "whole", tr: "bütün" },
      { de: "middle", tr: "orta" },
      { de: "sentence", tr: "cümle" },
      { de: "unit", tr: "ünite" },
      { de: "verb", tr: "fiil" },
      { de: "either", tr: "ikisinden biri" },
      { de: "passive", tr: "edilgen" },
      { de: "stable", tr: "kararlı" },
      { de: "afterwards", tr: "sonradan" },
      { de: "familiar", tr: "bildik" },
      { de: "machinery", tr: "düzenek" },
      { de: "left out", tr: "dışarıda bırakılmış" },
      { de: "an omission", tr: "atlama" },
      { de: "defensible", tr: "savunulabilir" },
      { de: "authority", tr: "yetke" },
      { de: "borrowed", tr: "ödünç alınmış" },
      { de: "survives", tr: "ayakta kalıyor" },
      { de: "a mood", tr: "hava" },
      { de: "signed", tr: "imzalanmış" },
      { de: "the route", tr: "yol" },
    ],
    minutes: 9,
    text:
      "It is reported that the experiment was repeated. The measurements are said to be stable. The cohort is thought to have been too small. Three sentences about the same study, and the third one is doing something the first two are not.\n" +
      "„To be stable“ is about now. „To have been too small“ is about before the thinking — the cohort was too small when the study ran, and somebody worked that out afterwards. Two words carry the whole of that, and they sit in the middle of the sentence where a fast reader does not stop.\n" +
      "The rest is the familiar machinery: the long route with „it“, the short route with the subject in front, and in both of them the person who reports, says and thinks is left out.\n" +
      "In a paper that omission is defensible, and in a summary of a paper it often is not. The paper names its own sources in a list at the end. A summary that says „the measurements are said to be stable“ and gives no list has borrowed the paper's authority without borrowing its evidence.\n" +
      "The test is the one from the last unit and it has not changed. Put a name in front of the verb. „The second cohort reports that the measurements are stable“ either survives or it does not.\n" +
      "Where it does not, the passive was never doing the work of a source. It was doing the work of a mood, and a therapy, a dosage or an organism described in that mood is a claim that nobody has signed.",
    questions: [
      {
        text: "When was the cohort too small?",
        options: ["when the study ran", "after the thinking", "now"],
        answer: 0,
        explain: "„the cohort was too small when the study ran, and somebody worked that out afterwards.“",
      },
      {
        text: "What has a summary with no list borrowed?",
        options: ["the authority", "the evidence", "the sources"],
        answer: 0,
        explain: "„has borrowed the paper's authority without borrowing its evidence.“",
      },
      {
        kind: "truefalse",
        text: "The omission is always defensible.",
        options: ["True", "False"],
        answer: 1,
        explain: "„In a paper that omission is defensible, and in a summary of a paper it often is not.“",
      },
      {
        kind: "gapfill",
        text: "The cohort is thought to have been too ___.",
        options: [],
        answer: 0,
        accept: ["small"],
        explain: "„The cohort is thought to have been too small.“",
      },
      {
        kind: "order",
        text: "Çalışmanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "It is reported that the experiment was repeated.",
          "The measurements are said to be stable.",
          "The cohort is thought to have been too small.",
          "Put a name in front of the verb.",
        ],
        explain: "Uzun yol, kısa yol, geçmişe bakan mastar, en sonda sınama.",
      },
      {
        kind: "short_answer",
        text: "What was the passive doing instead?",
        options: [],
        answer: 0,
        accept: ["the work of a mood", "making a mood", "not sourcing"],
        explain: "„It was doing the work of a mood…“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u11-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 11,
    title: "The automation of the process",
    genre: "dialogue",
    intro: "Özette isimler, teşekkürde fiiller. Neden?",
    gloss: [
      { de: "nouns", tr: "isimler" },
      { de: "verbs", tr: "fiiller" },
      { de: "noun", tr: "isim" },
      { de: "automated", tr: "otomatikleştirdik" },
      { de: "an abstract", tr: "özet" },
      { de: "on purpose", tr: "bilerek" },
      { de: "in pairs", tr: "çiftler hâlinde" },
      { de: "tempting", tr: "ayartıcı" },
      { de: "dated", tr: "tarihlenmiş" },
      { de: "nowhere", tr: "hiçbir yer" },
      { de: "the acknowledgements", tr: "teşekkür bölümü" },
      { de: "apart", tr: "arayla" },
      { de: "an ending", tr: "ek" },
      { de: "a preposition", tr: "edat" },
      { de: "a number", tr: "sayı" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Selma", text: "The automation of the process took a year. That is the first line of the abstract and it is written in nouns on purpose." },
      { speaker: "Koray", text: "Automate, automation. Invent, invention. Introduce, introduction." },
      { speaker: "Selma", text: "Three verbs, three endings, and no rule that gets you from one to the other. You learn them in pairs." },
      { speaker: "Koray", text: "And the prepositions?" },
      { speaker: "Selma", text: "The automation of the process, the invention of the tool, the introduction of the patch. Those three all take „of“, and it is tempting to think they all do." },
      { speaker: "Koray", text: "They do not." },
      { speaker: "Selma", text: "The distinction between two things takes „between“ and the comparison of two things takes „of“, and those two sit next to each other in almost every paper I have written." },
      { speaker: "Koray", text: "So why write it this way?" },
      { speaker: "Selma", text: "Because the noun can be dated. „The automation took a year“ has a number in it. „We automated the process“ has nowhere to put one." },
      { speaker: "Koray", text: "And the institute wants the number." },
      { speaker: "Selma", text: "The faculty wants the number, the thesis wants the number, and the innovation office wants the number in the first line. The people are in the acknowledgements." },
      { speaker: "Koray", text: "Where the verbs are." },
      { speaker: "Selma", text: "Where the verbs are. Two pages apart, and the second page is the one people read first." },
    ],
    questions: [
      {
        text: "How are the endings learnt?",
        options: ["in pairs", "from a rule", "from the preposition"],
        answer: 0,
        explain: "„You learn them in pairs.“",
      },
      {
        text: "Why is the noun used?",
        options: ["it can be dated", "it is shorter", "it is older"],
        answer: 0,
        explain: "„Because the noun can be dated.“",
      },
      {
        kind: "truefalse",
        text: "All of these nouns take „of“.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The distinction between two things takes „between“…“",
      },
      {
        kind: "gapfill",
        text: "The automation of the process took a ___.",
        options: [],
        answer: 0,
        accept: ["year"],
        explain: "„The automation of the process took a year.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The automation of the process took a year.", "The automation of the process took a year"],
        explain: "Fiil isme dönüyor; ek de edat da ezberden geliyor.",
      },
      {
        kind: "short_answer",
        text: "Where are the people?",
        options: [],
        answer: 0,
        accept: ["in the acknowledgements", "two pages apart", "at the end"],
        explain: "„The people are in the acknowledgements.“",
      },
    ],
  },
  {
    id: "en-b2-u11-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 11,
    title: "When the data lands",
    genre: "monologue",
    intro: "Planda kaç söz var, kaç boşluk var?",
    gloss: [
      { de: "verb", tr: "fiil" },
      { de: "sentence", tr: "cümle" },
      { de: "itself", tr: "kendisi" },
      { de: "slip", tr: "kaymak" },
      { de: "a state", tr: "durum" },
      { de: "a meter", tr: "ölçüm aygıtı" },
      { de: "a promise", tr: "söz" },
      { de: "a column", tr: "sütun" },
      { de: "a sponsor", tr: "destekçi" },
      { de: "marked", tr: "işaretlenmiş" },
      { de: "slipped", tr: "kaymış" },
      { de: "a rig", tr: "düzenek" },
      { de: "quietly", tr: "sessizce" },
      { de: "hides", tr: "gizliyor" },
      { de: "missing", tr: "eksik" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Devrim", text: "By June the emissions will have been measured. Four words of verb, one order, and no person in the sentence at all." },
      { speaker: "Devrim", text: "That is the right shape for a plan, because a plan is about states. Who holds the meter in June is not decided and does not need to be." },
      { speaker: "Devrim", text: "This time next week we will be testing the vehicle. Inside the work rather than after it, and the honest form when a thing takes five days." },
      { speaker: "Devrim", text: "The consumption will have been checked by then. The same four words, and the same reason: I do not yet know whose name goes on that line." },
      { speaker: "Devrim", text: "There is a cost that nobody mentions. A page of these reads as a page of promises, and half of them are not promises; they are places where a name is missing." },
      { speaker: "Devrim", text: "So the plan has a second column that does not go to the sponsor. Every future perfect in the first column has a name in the second, and where the second column is empty the sentence is marked." },
      { speaker: "Devrim", text: "The insulation work is the only line with two names, because it needs two, and that is also the only line that has never slipped." },
      { speaker: "Devrim", text: "Acceleration, friction, gravity: those are measured by a rig that runs itself. Everything else is measured by somebody, and the grammar that hides them is the grammar that lets a date slip quietly." },
    ],
    questions: [
      {
        text: "What is a plan about?",
        options: ["states", "people", "meters"],
        answer: 0,
        explain: "„because a plan is about states.“",
      },
      {
        text: "What is in the second column?",
        options: ["a name", "a date", "a number"],
        answer: 0,
        explain: "„Every future perfect in the first column has a name in the second…“",
      },
      {
        kind: "truefalse",
        text: "The insulation line has slipped before.",
        options: ["True", "False"],
        answer: 1,
        explain: "„that is also the only line that has never slipped.“",
      },
      {
        kind: "gapfill",
        text: "By June the ___ will have been measured.",
        options: [],
        answer: 0,
        accept: ["emissions"],
        explain: "„By June the emissions will have been measured.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The consumption will have been checked by then.", "The consumption will have been checked by then"],
        explain: "Edilgen ve gelecek bitmiş: will, have, been, üçüncü hâl.",
      },
      {
        kind: "short_answer",
        text: "What does the grammar that hides them let happen?",
        options: [],
        answer: 0,
        accept: ["a date can slip", "a quiet slip", "it hides a slip"],
        explain: "„the grammar that hides them is the grammar that lets a date slip quietly.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u11-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 11,
    title: "Having heated the liquid, add the catalyst",
    genre: "info",
    intro: "Üç ortaç. İkincisi hangi ilişkiyi taşıyor?",
    gloss: [
      { de: "differ", tr: "ayrılmak" },
      { de: "conjunction", tr: "bağlaç" },
      { de: "having heated", tr: "ısıttıktan sonra" },
      { de: "being slow", tr: "yavaş olduğu için" },
      { de: "formed", tr: "oluşan" },
      { de: "repeated", tr: "yinelenen" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Sıvıyı ısıttıktan sonra katalizörü ekle.",
        answer: "Having heated the liquid, add the catalyst.",
        hint: "İki yarının da öznesi aynı: yazılmayan „sen“.",
      },
      {
        kind: "build",
        tr: "Yavaş olduğu için tepkime daha çok ısı istedi.",
        answer: "Being slow, the reaction needed more heat.",
        hint: "Yalın „-ing“ burada NEDEN taşıyor, eşzamanlılık değil.",
      },
      {
        kind: "build",
        tr: "Pazartesi oluşan kristal ölçüldü.",
        answer: "Formed on Monday, the crystal was measured.",
        hint: "Üçüncü hâlle başlıyor: oluşturan söylenmiyor.",
      },
      {
        kind: "build",
        tr: "Deneyin yinelendiği bildiriliyor.",
        answer: "It is reported that the experiment was repeated.",
        hint: "Uzun yol: „it“ özne, rapor „that“ cümleciğinde.",
      },
      {
        kind: "form",
        prompt: "Yöntem kartını doldur.",
        facts: "Önce ısıtma sonra katalizör; tepkime yavaş olduğu için ısı istedi; kristal pazartesi oluştu; iki okuma ayrılıyorsa bağlaç yaz.",
        fields: [
          { label: "Order", answer: "having heated", accept: ["add the catalyst"] },
          { label: "Reason", answer: "being slow", accept: ["more heat"] },
          { label: "Passive", answer: "formed on Monday", accept: ["the crystal"] },
          { label: "When to write it out", answer: "if the readings differ", accept: ["write the conjunction"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u11-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 11,
    title: "The automation of the process took a year",
    genre: "info",
    intro: "Üç adlaştırma ve iki aktarma.",
    gloss: [
      { de: "the automation", tr: "otomasyonu" },
      { de: "the invention", tr: "icadı" },
      { de: "the introduction", tr: "devreye alınması" },
      { de: "to have been", tr: "olduğu" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Sürecin otomasyonu bir yıl sürdü.",
        answer: "The automation of the process took a year.",
        hint: "Fiil isme dönüyor; ek de edat da ezberden geliyor.",
      },
      {
        kind: "build",
        tr: "Aracın icadı enstitüyü değiştirdi.",
        answer: "The invention of the tool changed the institute.",
        hint: "Başka bir ek: „-ion“.",
      },
      {
        kind: "build",
        tr: "Yamanın devreye alınması gecikti.",
        answer: "The introduction of the patch was delayed.",
        hint: "Yine „-ion“, yine „of“.",
      },
      {
        kind: "build",
        tr: "Ölçümlerin kararlı olduğu söyleniyor.",
        answer: "The measurements are said to be stable.",
        hint: "Kısa yol: özne öne çıkıyor, mastar geriye kalıyor.",
      },
      {
        kind: "build",
        tr: "İzlem grubunun fazla küçük olduğu düşünülüyor.",
        answer: "The cohort is thought to have been too small.",
        hint: "Mastar geçmişe bakıyor: iş düşünmeden önceye ait.",
      },
    ],
  },
];
