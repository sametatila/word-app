import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 13 — "Anlam kaydığında, aidiyetin söylemedikleri,
 * tek bir ölçüye üç ad, emri kim veriyor".
 *
 * Dört ders: When meaning shifts · What belonging leaves unsaid ·
 * Three names for one measure · Who gives the orders.
 *
 *   Kelime: language change, language norm, semantic change, semantic
 *           context, literal meaning, diaspora, heritage language, enclave,
 *           untranslatability, spirituality, social stratum, efficiency gain,
 *           work intensification, flexibilization, precarization,
 *           standardization, rationalization, power structure, power
 *           imbalance, delegation, subordination.
 *   Kalıp:  The language change described above becomes the language norm discussed below. ·
 *           This semantic change, as noted earlier, comes from everyday language usage. ·
 *           Where the semantic context is missing, the literal meaning does not hold. ·
 *           The diaspora keeps the heritage language; the enclave, the silence. ·
 *           The old religion survives as spirituality, the crisis of faith as a question. ·
 *           The social stratum changed; its values did not. ·
 *           In the report it is an efficiency gain; on the floor, work intensification. ·
 *           What management calls flexibilization, the union calls precarization. ·
 *           Standardization is a method; rationalization is a program. ·
 *           What the power structure does is hide the power imbalance. ·
 *           Behind the delegation stands the authority to give orders. ·
 *           Subordination we notice; room to maneuver we do not.
 *
 * Ünitenin tek öğretme noktası YER SÖZCÜKLERİNİN YERİ BIRAKMASI. „Where“
 * burada hiçbir yeri göstermiyor, „şu durumlarda ki“ demek, ve akademik
 * İngilizcenin bu iş için olağan bağlacı. Yalnız da değil: „whereas“
 * (ünite 7'de bir mektupta geçmişti), „whereby“, „wherein“, „whereupon“ —
 * hepsi bir yer sözcüğü ile bir edattan kurulmuş ve hiçbiri artık yerle
 * ilgili değil. Almanca AYNI aileyi aynı parçalardan kurmuş („wobei“,
 * „wodurch“, „wohingegen“, „worauf“): mekanizma birebir aynı, anlamlar
 * neredeyse madde madde örtüşüyor. Ayrım öğrenenin GÖREBİLDİĞİNDE:
 * Almanca parçaları yazıyor ve görünür tutuyor, bilmeyen bir okur sözcüğü
 * söküp aşağı yukarı doğruyu bulabiliyor; İngilizce yüzyıllar önce
 * kaynaştırmış ve „whereas“ı sökmek, cevabı zaten bilmeyen için olanaksız.
 * Ölçü: **AYNI YAPIM İKİ DİLDE DE VAR; ALMANCADA PARÇA GÖRÜNÜR, İNGİLİZCEDE
 * KAYNAŞMIŞ** — sökülebilen sözcük tahmin edilebilir, sökülemeyen
 * öğretilmek zorunda. İkinci ölçü ünitenin kendisinden çıkıyor: buradan
 * sonra biçimler yenilenmiyor, DEĞİŞKEN sözcük dağarcığı oluyor.
 */
export const enC1U13: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-u13-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 13,
    title: "Interpreters on the hospital ward",
    genre: "report",
    intro: "Bir hastanede çeviri uygulaması denemesinin raporu. Uygulama nerede işe yaradı, nerede yaramadı?",
    gloss: [
      { de: "whereby", tr: "sayesinde" },
      { de: "a ward", tr: "servis" },
      { de: "a translation", tr: "çeviri" },
      { de: "summarize", tr: "özetlemek" },
      { de: "whereupon", tr: "bunun üzerine" },
      { de: "die", tr: "ölmek" },
      { de: "complicated", tr: "karmaşık" },
      { de: "discharge", tr: "taburcu" },
      { de: "wherein", tr: "içinde" },
      { de: "involve", tr: "içermek" },
    ],
    minutes: 12,
    text:
      "A REPORT ON THE INTERPRETING PILOT AT ST. MARY'S HOSPITAL\n" +
      "In January, St. Mary's Hospital began a six-month pilot whereby nurses on two wards used a translation app instead of calling a phone interpreter. The aim was to save time and money. This report summarizes what happened.\n" +
      "The results were mixed. Where a conversation was short and routine, the app worked well: patients were asked about allergies, meals or pain on a scale from one to ten, and the answers were clear. Whereas a phone interpreter took on average eleven minutes to connect, the app answered at once.\n" +
      "Where the context was missing, however, the literal translation did not hold. In one case described in the staff survey, a patient said her father had „gone to sleep“, whereupon the app told the nurse that he was resting. He had in fact died the week before, and the patient was asking for someone to talk to.\n" +
      "Nurses also reported that older patients from the Turkish, Arabic and Greek communities often used expressions from their heritage language that the app translated word for word. As noted earlier, these were not complicated sentences; they were everyday phrases whose meaning had shifted over time.\n" +
      "The problem described above becomes more serious in the situations discussed below. Consent forms, discharge instructions and conversations about bad news are all cases wherein a small mistake can cause real harm.\n" +
      "Recommendations: the app should remain available for routine questions. Where a decision about treatment is involved, a trained interpreter must be called. The cost of this arrangement is estimated at about 60 percent of the old system.\n" +
      "The full data are attached to this report.",
    questions: [
      {
        text: "How long did the pilot last?",
        options: ["six months", "eleven minutes", "one year"],
        answer: 0,
        explain: "„a six-month pilot whereby nurses on two wards used a translation app instead of calling a phone interpreter.“",
      },
      {
        text: "When did the app work well?",
        options: ["when a conversation was short and routine", "when a patient had bad news", "when a form had to be signed"],
        answer: 0,
        explain: "„Where a conversation was short and routine, the app worked well…“",
      },
      {
        kind: "truefalse",
        text: "The phone interpreter took longer to connect than the app.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Whereas a phone interpreter took on average eleven minutes to connect, the app answered at once.“",
      },
      {
        kind: "gapfill",
        text: "Where the context was missing, however, the literal translation did not ___.",
        options: [],
        answer: 0,
        accept: ["hold"],
        explain: "„Where the context was missing, however, the literal translation did not hold.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The hospital began the pilot in January.",
          "The app told the nurse the father was resting.",
          "Consent forms can cause real harm.",
          "The data are attached to the report.",
        ],
        explain: "Deneme, bir vaka, riskli durumlar; en sonda ek.",
      },
      {
        kind: "short_answer",
        text: "When must a trained interpreter be called?",
        options: [],
        answer: 0,
        accept: ["for decisions about treatment", "when treatment is decided", "when a treatment decision is involved"],
        explain: "„Where a decision about treatment is involved, a trained interpreter must be called.“",
      },
    ],
  },
  {
    id: "en-c1-u13-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 13,
    title: "The new scanners at the warehouse",
    genre: "opinion",
    intro: "Bir depo çalışanının yeni el tarayıcıları üzerine yazısı. Aynı değişiklik raporda ve depoda nasıl görünüyor?",
    gloss: [
      { de: "a scanner", tr: "tarayıcı" },
      { de: "a slide", tr: "slayt" },
      { de: "pick", tr: "toplamak" },
      { de: "rise", tr: "yükselmek" },
    ],
    minutes: 12,
    text:
      "Six months ago the distribution center where I work introduced hand scanners that tell each of us which shelf to go to next. Management presented them at a meeting with slides and coffee. I have worked here for fourteen years, and I want to describe what the scanners changed.\n" +
      "In the quarterly report it is an efficiency gain; on the floor, work intensification. Both are true. We now pick about 20 percent more orders per shift. We also walk further, take shorter breaks and finish each shift more tired than before.\n" +
      "What management calls flexibilization, the union calls precarization. Since the spring, new staff have been hired on three-month contracts, and shifts are published only four days in advance. Some colleagues like the freedom. Most of those with children do not, because a school does not change its hours every week.\n" +
      "Standardization is a method; rationalization is a program. The first made sense: every shelf now has the same label, and new colleagues learn the building in a day instead of a month. The second is harder to accept. The target rises every quarter, and the scanner records every minute we stand still.\n" +
      "I am not against technology. The old paper lists were slow, and nobody misses them. But a machine that measures how fast we walk will never measure what we used to do in between: show a new colleague the heavy boxes, or cover for someone whose child is sick.\n" +
      "The union committee meets management next week. We are asking for two things: stable shifts published two weeks ahead, and a target that stops rising once it has been reached for a year.",
    questions: [
      {
        text: "What do the scanners tell the workers?",
        options: ["which shelf to go to next", "when to take a break", "how much they earn"],
        answer: 0,
        explain: "„hand scanners that tell each of us which shelf to go to next.“",
      },
      {
        text: "How many more orders do they pick per shift?",
        options: ["about 20 percent more", "twice as many", "about 4 percent more"],
        answer: 0,
        explain: "„We now pick about 20 percent more orders per shift.“",
      },
      {
        kind: "truefalse",
        text: "The writer is against technology.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I am not against technology.“",
      },
      {
        kind: "gapfill",
        text: "Standardization is a method; rationalization is a ___.",
        options: [],
        answer: 0,
        accept: ["program"],
        explain: "„Standardization is a method; rationalization is a program.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The scanners were presented at a meeting.",
          "New staff are hired on three-month contracts.",
          "Every shelf now has the same label.",
          "The union committee meets management next week.",
        ],
        explain: "Tanıtım, sözleşmeler, standart etiketler; en sonda toplantı.",
      },
      {
        kind: "short_answer",
        text: "How far ahead should shifts be published?",
        options: [],
        answer: 0,
        accept: ["two weeks ahead", "two weeks", "2 weeks"],
        explain: "„stable shifts published two weeks ahead…“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-u13-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 13,
    title: "The flat organization chart",
    genre: "dialogue",
    intro: "Yetki devrinin arkasında ne duruyor? Ne fark edilmiyor?",
    gloss: [
      { de: "least", tr: "en az" },
      { de: "somewhere", tr: "bir yerde" },
      { de: "whenever", tr: "her ne zaman" },
      { de: "visible", tr: "görünür" },
      { de: "particular", tr: "belirli" },
      { de: "able", tr: "muktedir" },
      { de: "an order", tr: "emir" },
      { de: "hide", tr: "gizlemek" },
      { de: "a chart", tr: "şema" },
      { de: "flat", tr: "yatay" },
      { de: "an owner", tr: "sahip" },
      { de: "a title", tr: "unvan" },
      { de: "handed over", tr: "devredilmiş" },
      { de: "kept", tr: "elde tutulan" },
      { de: "a deadline", tr: "son tarih" },
      { de: "invisible", tr: "görünmez" },
      { de: "narrower", tr: "daha dar" },
      { de: "a form", tr: "form" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Jacob", text: "What the power structure does is hide the power imbalance. A chart is drawn, everybody can see it, and what it shows is not the thing it is about." },
      { speaker: "Polly", text: "So a flat chart can hide more than a tall one." },
      { speaker: "Jacob", text: "Far more, because a tall chart at least names the owner of each decision. A flat one has nobody on it and the decisions still get made somewhere." },
      { speaker: "Polly", text: "Behind the delegation stands the authority to give orders." },
      { speaker: "Jacob", text: "That is the sentence I would put in front of anybody being given a new title. What has been handed over is the work, and what has been kept is the deadline." },
      { speaker: "Polly", text: "Is that always true?" },
      { speaker: "Jacob", text: "It is true whenever the deadline was not handed over with it. Ask that one question and you will know within a minute which kind of delegation you have been given." },
      { speaker: "Polly", text: "Subordination we notice; room to maneuver we do not." },
      { speaker: "Jacob", text: "And this is the hard half. Being told what to do is visible and it can be complained about. Having less room than last year is invisible and there is no form for it." },
      { speaker: "Polly", text: "Because nothing happened on any particular day." },
      { speaker: "Jacob", text: "Nothing happened on any particular day, and a year later the job is narrower and nobody can name the week it got that way." },
      { speaker: "Polly", text: "So what do you write down?" },
      { speaker: "Jacob", text: "Write down what you were able to decide alone in January, and read it again in December. It is the only record anybody keeps of that kind of change." },
    ],
    questions: [
      {
        text: "What can hide more than a tall chart?",
        options: ["a flat one", "a long one", "a new one"],
        answer: 0,
        explain: "„a flat chart can hide more than a tall one.“ — „Far more…“",
      },
      {
        text: "What has been kept?",
        options: ["the deadline", "the work", "the title"],
        answer: 0,
        explain: "„What has been handed over is the work, and what has been kept is the deadline.“",
      },
      {
        kind: "truefalse",
        text: "There is no form for having less room than last year.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Having less room than last year is invisible and there is no form for it.“",
      },
      {
        kind: "gapfill",
        text: "Subordination we notice; room to maneuver we do ___.",
        options: [],
        answer: 0,
        accept: ["not"],
        explain: "„Subordination we notice; room to maneuver we do not.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Behind the delegation stands the authority to give orders.", "Behind the delegation stands the authority to give orders"],
        explain: "Baştaki yuvayı bir yer almış; özne sonda.",
      },
      {
        kind: "short_answer",
        text: "What should you write down in January?",
        options: [],
        answer: 0,
        accept: ["what you decide alone", "your decisions", "what you can decide"],
        explain: "„Write down what you were able to decide alone in January…“",
      },
    ],
  },
  {
    id: "en-c1-u13-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 13,
    title: "Three generations at one table",
    genre: "monologue",
    intro: "Üç kuşaklık bir göçmen ailesini anlatan podcast bölümü. Aile neyi korudu, ne değişti?",
    gloss: [
      { de: "a sewing machine", tr: "dikiş makinesi" },
      { de: "pray", tr: "dua etmek" },
      { de: "bedtime", tr: "yatma vakti" },
      { de: "a factory", tr: "fabrika" },
      { de: "politics", tr: "siyaset" },
      { de: "a census", tr: "nüfus sayımı" },
      { de: "furniture", tr: "mobilya" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Becky", text: "My grandparents came to this city in 1971 with two suitcases and a sewing machine. This episode is about what they kept, and what they did not." },
      { speaker: "Becky", text: "Our family is part of a large diaspora. We kept the heritage language: my grandmother still speaks it at dinner, and my son answers her in English." },
      { speaker: "Becky", text: "Some families on our street lived in something closer to an enclave. They kept the language too, but they also kept a silence: nobody talked about why they had left." },
      { speaker: "Becky", text: "The diaspora keeps the heritage language; the enclave, the silence. That is how my grandmother puts it, and she has lived in both." },
      { speaker: "Becky", text: "Religion changed as well. My grandfather prayed five times a day, and my mother lights a candle on holidays." },
      { speaker: "Becky", text: "The old religion survives as spirituality, the crisis of faith as a question my children ask at bedtime." },
      { speaker: "Becky", text: "In two generations our family moved from a factory floor to a university office. The social stratum changed; its values did not." },
      { speaker: "Becky", text: "We still eat together every Sunday, we still send money to cousins, and we still argue loudly about politics at the table." },
      { speaker: "Becky", text: "A census would record my income and my degree. It would not record the Sunday dinners, and they are the part of the story that changes most slowly." },
      { speaker: "Becky", text: "Next week my grandmother will tell the story of the sewing machine herself. Do not miss it." },
    ],
    questions: [
      {
        text: "What did the grandparents bring with them?",
        options: ["two suitcases and a sewing machine", "a car and some furniture", "only one suitcase"],
        answer: 0,
        explain: "„My grandparents came to this city in 1971 with two suitcases and a sewing machine.“",
      },
      {
        text: "In which language does Becky's son answer?",
        options: ["English", "the heritage language", "He does not answer."],
        answer: 0,
        explain: "„my son answers her in English.“",
      },
      {
        kind: "truefalse",
        text: "The families in the enclave talked openly about why they had left.",
        options: ["True", "False"],
        answer: 1,
        explain: "„nobody talked about why they had left.“",
      },
      {
        kind: "gapfill",
        text: "The diaspora keeps the heritage language; the enclave, the ___.",
        options: [],
        answer: 0,
        accept: ["silence"],
        explain: "„The diaspora keeps the heritage language; the enclave, the silence.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The social stratum changed; its values did not.", "The social stratum changed; its values did not"],
        explain: "Hızlı yarı ile yavaş yarı aynı cümlede.",
      },
      {
        kind: "short_answer",
        text: "Who will tell the story of the sewing machine?",
        options: [],
        answer: 0,
        accept: ["her grandmother", "the grandmother", "Becky's grandmother"],
        explain: "„Next week my grandmother will tell the story of the sewing machine herself.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-u13-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 13,
    title: "Notes on change at work",
    genre: "info",
    intro: "İş yerindeki ve dildeki değişim üzerine notlar: cümleleri kur, sonra sendika toplantısı kartını doldur.",
    gloss: [
      { de: "a language change", tr: "dil değişimi" },
      { de: "a language norm", tr: "dil normu" },
      { de: "a semantic context", tr: "anlam bağlamı" },
      { de: "an efficiency gain", tr: "verimlilik artışı" },
      { de: "flexibilization", tr: "esnekleştirme" },
      { de: "rationalization", tr: "rasyonelleştirme" },
      { de: "a scanner", tr: "tarayıcı" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Anlam bağlamının eksik olduğu yerde gerçek anlam tutmaz.",
        answer: "Where the semantic context is missing, the literal meaning does not hold.",
        hint: "„Where“ bir yer bildirmiyor; „…diği durumlarda“ demek.",
      },
      {
        kind: "build",
        tr: "Yukarıda anlatılan dil değişimi, aşağıda ele alınan dil normuna dönüşüyor.",
        answer: "The language change described above becomes the language norm discussed below.",
        hint: "Biçim eski; değişen yalnız konu.",
      },
      {
        kind: "build",
        tr: "Raporda verimlilik artışı, atölyede iş yoğunlaşması.",
        answer: "In the report it is an efficiency gain; on the floor, work intensification.",
        hint: "Aynı olay, iki defter; ikinci yarıda fiil yok.",
      },
      {
        kind: "build",
        tr: "Yönetimin esnekleştirme dediğine sendika güvencesizleşme diyor.",
        answer: "What management calls flexibilization, the union calls precarization.",
        hint: "İki ad ve sahipleri aynı cümlede.",
      },
      {
        kind: "build",
        tr: "Standartlaştırma bir yöntem, rasyonelleştirme bir programdır.",
        answer: "Standardization is a method; rationalization is a program.",
        hint: "Yöntem işe yarayıp yaramadığına göre yargılanır; programın bütçesi vardır.",
      },
      {
        kind: "form",
        prompt: "Sendika toplantısı için not kartını doldur.",
        facts: "Depoya altı ay önce el tarayıcıları geldi; vardiya başına yaklaşık yüzde 20 daha fazla sipariş toplanıyor; yeni çalışanlar üç aylık sözleşmelerle işe alınıyor; vardiyalar yalnız dört gün önceden açıklanıyor; sendika vardiyaların iki hafta önceden yayımlanmasını istiyor.",
        fields: [
          { label: "New equipment", answer: "hand scanners", accept: ["scanners"] },
          { label: "More orders per shift", answer: "about 20 percent", accept: ["20 percent", "20%"] },
          { label: "New contracts", answer: "three months", accept: ["three-month contracts", "3 months"] },
          { label: "Shifts published", answer: "four days in advance", accept: ["four days ahead", "4 days"] },
          { label: "Union demand", answer: "shifts two weeks ahead", accept: ["two weeks ahead", "two weeks"] },
        ],
      },
    ],
  },
  {
    id: "en-c1-u13-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 13,
    title: "Community and power",
    genre: "info",
    intro: "Aidiyet ve güç üzerine cümleler: bir topluluğun neyi koruduğunu, emri kimin verdiğini İngilizce yaz.",
    gloss: [
      { de: "a heritage language", tr: "köken dili" },
      { de: "an enclave", tr: "enklav" },
      { de: "religion", tr: "din" },
      { de: "a social stratum", tr: "toplumsal katman" },
      { de: "a power imbalance", tr: "güç dengesizliği" },
      { de: "subordination", tr: "boyun eğme" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Diaspora köken dilini saklıyor; enklav, sessizliği.",
        answer: "The diaspora keeps the heritage language; the enclave, the silence.",
        hint: "Fiil aynı olduğu için ikinci yarıda yazılmıyor.",
      },
      {
        kind: "build",
        tr: "Eski din maneviyat olarak, inanç krizi bir soru olarak varlığını sürdürüyor.",
        answer: "The old religion survives as spirituality, the crisis of faith as a question.",
        hint: "Taşınamayan şey yok olmuyor, yer değiştiriyor.",
      },
      {
        kind: "build",
        tr: "Toplumsal katman değişti, değerleri değişmedi.",
        answer: "The social stratum changed; its values did not.",
        hint: "Hızlı yarı ile yavaş yarı.",
      },
      {
        kind: "build",
        tr: "Güç yapısının yaptığı şey güç dengesizliğini gizlemektir.",
        answer: "What the power structure does is hide the power imbalance.",
        hint: "Şema herkesin görebildiği şey; anlattığı şey değil.",
      },
      {
        kind: "build",
        tr: "Yetki devrinin arkasında talimat verme yetkisi duruyor.",
        answer: "Behind the delegation stands the authority to give orders.",
        hint: "Devredilen iş, elde tutulan son tarih.",
      },
    ],
  },
];
