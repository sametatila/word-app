import type { SkillExercise } from "../../types";

/**
 * EN · C1 — Beceriler kütüphanesi, parti 12.
 *
 * Hücreyi YİRMİYE tamamlayan on partiden biri. Kurallar ve emsal:
 * `en-c1.ts` (parti 1), `en-c1-p6` … `p10` ve `data/content/SPEC.md`.
 *
 * Parti 12 gönüllülük hattı: bir dağ kurtarma ekibinin yıllık raporu,
 * gönüllülerin neden bıraktığını anlatan bir bilgilendirme, gönüllülere
 * değişiklik duyuran bir e-posta. Dil bilgisi olumsuzluğun kapsamı —
 * not all / all … not, not necessarily, no longer, hardly any.
 */
export const enC1P12: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-lib-r12",
    course: "en",
    level: "C1",
    skill: "reading",
    title: "What the Year Told Us",
    genre: "report",
    intro: "Gönüllü bir dağ kurtarma ekibinin yıllık raporundan bir bölüm: rakamlar, ayrılanlar ve gelecek yıl için öneri.",
    gloss: [
      { de: "call-out", tr: "kurtarma çağrısı" },
      { de: "schedule", tr: "nöbet çizelgesi" },
      { de: "to recruit", tr: "işe almak" },
      { de: "misleading", tr: "yanıltıcı" },
      { de: "commitment", tr: "yükümlülük" },
      { de: "to deserve", tr: "hak etmek" },
      { de: "retired", tr: "emekli olmuş" },
      { de: "to reduce", tr: "azaltmak" },
      { de: "rescue", tr: "kurtarma" },
      { de: "crew", tr: "ekip" },
      { de: "mentor", tr: "rehber" },
      { de: "necessarily", tr: "zorunlu olarak" },
      { de: "safety", tr: "emniyet" },
      { de: "share", tr: "pay" },
      { de: "active", tr: "aktif" },
      { de: "history", tr: "tarih" },
      { de: "intend", tr: "niyetinde olmak" },
      { de: "accurate", tr: "doğru" },
      { de: "affecting", tr: "etkilemek" },
      { de: "dramatic", tr: "çarpıcı" },
    ],
    minutes: 10,
    text:
      "Northfell Mountain Rescue — from the annual report\n\n" +
      "This year the team answered ninety-four call-outs, the highest number in its history, " +
      "with fewer active members than at any point in the last decade. That combination is not " +
      "necessarily a crisis, but it is not something we can ignore for another year either.\n\n" +
      "We recruited fourteen new volunteers in the spring. By December, six of them were no longer " +
      "on the schedule. Not all of those who left did so for the same reason, and it would be misleading " +
      "to describe them as a single group. Two moved away. Two told us, honestly, that the training " +
      "commitment was more than they had understood when they signed up. The remaining two left " +
      "without giving a reason, and we have not asked, which is something we intend to change.\n\n" +
      "The training figure deserves attention. New members are expected to complete around ninety " +
      "hours in their first year before they go out on a call. Hardly any of that can be cut without " +
      "affecting safety, and we do not propose to reduce it. What we can change is when it happens. " +
      "At present almost all of it takes place on weekday evenings, which suits members who are " +
      "retired and suits almost nobody with young children.\n\n" +
      "We should also be honest about the call-outs themselves. Not every call is a rescue in the " +
      "dramatic sense; a large share are walkers who are lost, cold or late, and who would have been " +
      "fine with better information before they set out. Every such call still takes a crew of six " +
      "away from their families for an average of four hours.\n\n" +
      "Our proposal for next year is therefore not to recruit more people but to lose fewer: " +
      "weekend training blocks, a mentor for each new member, and a short conversation with anyone " +
      "who decides to leave.",
    questions: [
      {
        text: "How does the report describe this year's combination of figures?",
        options: [
          "as a crisis needing urgent action",
          "as not necessarily a crisis, but not to be ignored",
          "as a normal result for a busy year",
        ],
        answer: 1,
        explain: "„not necessarily a crisis, but it is not something we can ignore for another year either“.",
      },
      {
        text: "Which statement about the six who left is accurate?",
        options: [
          "They all left for the same reason.",
          "Most of them moved away.",
          "Two of them gave no reason.",
        ],
        answer: 2,
        explain: "İkisi taşındı, ikisi eğitim yükünü söyledi, kalan ikisi sebep vermeden ayrıldı.",
      },
      {
        kind: "truefalse",
        text: "According to the report, most training currently takes place on weekday evenings.",
        options: ["True", "False"],
        answer: 0,
        explain: "„almost all of it takes place on weekday evenings“ — emeklilere uyuyor, küçük çocuklulara uymuyor.",
      },
      {
        kind: "gapfill",
        text: "This year the team answered ___ call-outs.",
        options: [],
        answer: 0,
        accept: ["ninety-four", "94", "ninety four"],
        explain: "„answered ninety-four call-outs, the highest number in its history“.",
      },
      {
        kind: "short_answer",
        text: "How many new volunteers were recruited in the spring?",
        options: [],
        answer: 0,
        accept: ["fourteen", "14"],
        explain: "„We recruited fourteen new volunteers in the spring“; aralıkta altısı çizelgede değildi.",
      },
      {
        text: "What is the team's proposal for next year?",
        options: [
          "to lose fewer volunteers",
          "to recruit twice as many people",
          "to answer fewer call-outs",
        ],
        answer: 0,
        explain: "„not to recruit more people but to lose fewer“.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-lib-l12",
    course: "en",
    level: "C1",
    skill: "listening",
    title: "Why Volunteers Stop Coming",
    genre: "info",
    intro: "Bir bilgilendirme: yaşlılara arkadaşlık eden bir gönüllü programı, bırakanlarla konuşunca ne öğrendi.",
    gloss: [
      { de: "minority", tr: "azınlık" },
      { de: "scheme", tr: "program" },
      { de: "consistent", tr: "tutarlı" },
      { de: "confidence", tr: "güven" },
      { de: "polite", tr: "kibar" },
      { de: "frankly", tr: "açıkçası" },
      { de: "novelty", tr: "yenilik" },
      { de: "inspection", tr: "denetim" },
      { de: "placement", tr: "görevlendirme" },
      { de: "to extend", tr: "uzatmak" },
      { de: "to abandon", tr: "yüzüstü bırakmak" },
      { de: "active", tr: "aktif" },
      { de: "reduced", tr: "azaltmak" },
      { de: "risen", tr: "artmak" },
      { de: "charities", tr: "yardım kuruluşu" },
      { de: "concerned", tr: "ilgili olmak" },
      { de: "disliked", tr: "sevmemek" },
    ],
    minutes: 10,
    segments: [
      { text: "Most charities assume that volunteers leave because they run out of time. In our befriending scheme, that turned out to be true for only a minority." },
      { speaker: "Ms Achterberg", text: "We interviewed everyone who left over two years, eighty-one people. Not all of them would talk to us, but most did, and the answers were surprisingly consistent." },
      { text: "The largest group had not lost interest in the older person they visited. They had lost confidence that the visits were doing any good." },
      { speaker: "Ms Achterberg", text: "Nobody tells you whether an hour of conversation helped. The person you visit is often too polite to say, and we, frankly, weren't asking." },
      { text: "The second finding concerned timing. Almost nobody left in the first month. The drop came in the third, once the novelty had gone and before any real friendship had formed." },
      { speaker: "Ms Achterberg", text: "So we changed two things. Every volunteer now gets a short call from us at week ten. It is not an inspection, just a question about how it is going." },
      { text: "And every placement now has an agreed end date of six months, which either side can extend if they wish." },
      { speaker: "Ms Achterberg", text: "People worried that an end date would sound cold. In practice it made it easier to stay, because leaving no longer felt like abandoning someone." },
      { text: "Since the change, the share of volunteers still active after a year has risen from under half to nearly two-thirds." },
    ],
    questions: [
      {
        text: "What was true for only a minority of those who left?",
        options: [
          "They disliked the person they visited.",
          "They moved to another charity.",
          "They ran out of time.",
        ],
        answer: 2,
        explain: "Hayır kurumlarının varsaydığı sebep programda yalnız azınlık için doğru çıkmış.",
      },
      {
        text: "What had the largest group lost?",
        options: [
          "confidence that the visits helped",
          "interest in the older person",
          "their weekly free time",
        ],
        answer: 0,
        explain: "İlgiyi değil, ziyaretlerin işe yaradığına dair güveni kaybetmişler.",
      },
      {
        kind: "truefalse",
        text: "Most volunteers left in the first month.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Almost nobody left in the first month.“ — düşüş üçüncü ayda.",
      },
      {
        kind: "gapfill",
        text: "The scheme interviewed ___ people who had left.",
        options: [],
        answer: 0,
        accept: ["eighty-one", "81", "eighty one"],
        explain: "„everyone who left over two years, eighty-one people“.",
      },
      {
        kind: "short_answer",
        text: "When does every volunteer now get a call?",
        options: [],
        answer: 0,
        accept: ["at week ten", "week ten", "in week ten", "at week 10"],
        explain: "Onuncu haftada, denetim değil yalnız nasıl gittiğini soran kısa bir arama.",
      },
      {
        text: "Why did the end date make it easier to stay?",
        options: [
          "It came with a small payment.",
          "Leaving no longer felt like abandoning someone.",
          "It reduced the number of visits.",
        ],
        answer: 1,
        explain: "„leaving no longer felt like abandoning someone“.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-lib-w12",
    course: "en",
    level: "C1",
    skill: "writing",
    title: "Changes to How We Train",
    genre: "email",
    intro: "Gönüllü bir ekibin koordinatörü olarak herkese yazıyorsun: önce iki cümle kur, sonra neyin değişip neyin değişmediğini açıkça söyleyen bir e-posta yaz.",
    gloss: [
      { de: "to recruit", tr: "işe almak" },
      { de: "schedule", tr: "nöbet çizelgesi" },
      { de: "mentor", tr: "rehber" },
      { de: "to pair", tr: "eşleştirmek" },
      { de: "unpaid", tr: "ödenmemiş" },
      { de: "commitment", tr: "yükümlülük" },
      { de: "discover", tr: "fark etmek" },
    ],
    minutes: 16,
    tasks: [
      {
        kind: "build",
        tr: "Geçen yıl ayrılan gönüllülerin hepsi aynı sebebi vermedi.",
        answer: "Last year, not every volunteer who left gave the same reason.",
        alternatives: ["Not every volunteer who left gave the same reason last year."],
        hint: "„Not every“ olumsuzluğu „every“ye bağlar: bazıları başka bir sebep verdi demektir.",
      },
      {
        kind: "build",
        tr: "Önümüzdeki aydan itibaren eğitim artık yalnızca hafta içi akşamları yapılmayacak.",
        answer: "From next month, training will no longer take place only on weekday evenings.",
        alternatives: ["Training will no longer take place only on weekday evenings from next month."],
        hint: "„no longer“ bir durumun sona erdiğini söyler ve yardımcı fiilden sonra gelir.",
      },
      {
        kind: "free",
        prompt:
          "Gönüllü ekibe bir e-posta yaz: neden yazdığını söyle, bu yıl ne öğrendiğinizi özetle, neyin değiştiğini ve neyin bilerek değişmediğini ayır, ayrılmayı düşünenlere bir çağrı yap ve görüş iste.",
        checklist: [
          "Neden yazdığını ve ne öğrendiğinizi söyle",
          "Neyin değiştiğini somut olarak yaz",
          "Neyin bilerek değişmediğini gerekçesiyle söyle",
          "Ayrılmayı düşünenlere bir çağrı yap ve görüş iste",
        ],
        minWords: 160,
        phrases: [
          { de: "I'm writing to explain two changes and one thing that is not changing.", tr: "İki değişikliği ve değişmeyen bir şeyi açıklamak için yazıyorum.", en: "" },
          { de: "Not all of … , but enough of … to …", tr: "…'in hepsi değil ama … için yeterince …", en: "" },
          { de: "From next month, … will no longer …", tr: "Önümüzdeki aydan itibaren … artık … olmayacak", en: "" },
          { de: "What is not changing, and deliberately so, is …", tr: "Değişmeyen, hem de bilerek değişmeyen şey …", en: "" },
          { de: "If you are thinking of stepping back, …", tr: "Geri çekilmeyi düşünüyorsanız …", en: "" },
        ],
        sample:
          "Dear all,\n\n" +
          "I'm writing to explain two changes and one thing that is not changing. " +
          "This year we recruited fourteen people, and by December six had gone. " +
          "Their reasons varied, but enough of them mentioned training for us to take " +
          "it seriously. Almost all of our sessions have been on weekday evenings, which works well for " +
          "some of us and hardly at all for anyone with young children.\n\n" +
          "From next month, training will no longer take place only on weekday evenings. " +
          "We are adding one full Saturday block each month, and new members will be paired with a mentor " +
          "from their first week rather than from their first call-out. If you would be willing to mentor " +
          "someone, please tell me by the end of the month.\n\n" +
          "What is not changing, and deliberately so, is the number of hours. We looked hard at it and " +
          "could not find anything that would be safe to remove. We would rather be honest about the " +
          "commitment than lose people after they discover it.\n\n" +
          "If you are thinking of stepping back, please talk to me first. You will not be asked to stay, " +
          "and nobody will think less of you for leaving; we simply want to know what would have made a " +
          "difference.\n\n" +
          "Thank you, as always, for giving your time unpaid.\nKatrin",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-c1-lib-s12",
    course: "en",
    level: "C1",
    skill: "speaking",
    title: "Should Essential Services Depend on Volunteers?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: gönüllülüğün değerini ve sınırını ayır, bir ölçüt öner.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Temel hizmetler gönüllülere dayanmalı mı? Gönüllülüğün gerçekten değerli olduğu yeri söyle, riskli olduğu yeri adlandır, bir ölçüt öner ve karşı tarafın en güçlü argümanını kabul et.",
      bulletsTr: [
        "Gönüllülüğün değerli olduğu yeri söyle",
        "Riskli olduğu yeri adlandır",
        "Bir ölçüt öner",
        "Karşı tarafın en güçlü argümanını kabul et",
      ],
      targets: [
        { de: "Not every service is the same, and the difference matters.", tr: "Her hizmet aynı değil ve fark önemli." },
        { de: "Where volunteering genuinely adds something is …", tr: "Gönüllülüğün gerçekten bir şey kattığı yer …" },
        { de: "The test I would apply is whether …", tr: "Uygulayacağım ölçüt … olup olmadığı" },
        { de: "The strongest objection to this is …, and I don't dismiss it.", tr: "Buna en güçlü itiraz …; bunu hafife almıyorum." },
      ],
      minSeconds: 60,
      maxSeconds: 100,
      sampleDe:
        "Not every service is the same, and the difference matters more than the general question suggests. " +
        "Where volunteering genuinely adds something is in work that is better because nobody is paid to do it: " +
        "visiting someone who is lonely, coaching a children's team, reading to patients. " +
        "The fact that you chose to come is part of what you are giving. " +
        "The risk begins when a service that people cannot do without is quietly allowed to depend on goodwill. " +
        "Then the question is no longer whether volunteers are generous but what happens on the night when " +
        "not enough of them turn up. " +
        "The test I would apply is whether the service could fail without anybody being responsible. " +
        "If the answer is yes, volunteers should be supporting a paid core, not replacing it. " +
        "The strongest objection to this is cost, and I don't dismiss it. " +
        "Some rescue teams exist only because volunteers built them where no public body ever would have. " +
        "Insisting on a paid core in those places might not produce a better service; it might produce none. " +
        "So I would treat my test as a direction of travel rather than a rule to apply tomorrow.",
      rubricHint:
        "Değerli ve riskli durumun ayrımı, somut bir ölçüt ve karşı argümanın kabulü beklenir; „not every“, „no longer“ gibi olumsuzluk kapsamı yapıları kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-c1-lib-g12",
    course: "en",
    level: "C1",
    skill: "grammar",
    title: "not all, not necessarily, no longer",
    genre: "grammar",
    intro: "Olumsuzluğun cümlede neye dokunduğu anlamı değiştirir: „hiçbiri“ ile „hepsi değil“ arasındaki fark tam da buradadır.",
    focus: "Olumsuzluğun kapsamı: not all / all … not, not necessarily, I don't think, no longer, hardly any",
    gloss: [
      { de: "necessarily", tr: "zorunlu olarak" },
      { de: "volunteer", tr: "gönüllü" },
      { de: "entirely", tr: "tamamen" },
      { de: "to reduce", tr: "azaltmak" },
    ],
    minutes: 12,
    explanation: [
      {
        heading: "not all, none ve all … not",
        tr: "„Not all of them left“ kısmi olumsuzluktur: bazıları ayrıldı, bazıları kaldı. „None of them left“ tam olumsuzluktur. „All of them did not leave“ ise iki türlü okunabilir ve bu yüzden dikkatli yazıda kaçınılır; kısmi anlam isteniyorsa „not all“ başa alınır. Türkçedeki „hepsi gitmedi“ de aynı belirsizliği taşır.",
        examples: [
          { de: "Not all of the volunteers stayed.", tr: "Gönüllülerin hepsi kalmadı.", note: "bazıları kaldı" },
          { de: "None of the volunteers stayed.", tr: "Gönüllülerin hiçbiri kalmadı.", note: "tam olumsuzluk" },
          { de: "Not every call is a rescue.", tr: "Her çağrı bir kurtarma değildir.", note: "not every: kısmi" },
        ],
      },
      {
        heading: "not necessarily ve I don't think",
        tr: "„not necessarily“, „not always“ ve „not entirely“ bir iddiayı tümden reddetmez, yalnız zorunluluğunu ya da genelliğini kaldırır: „It is not necessarily a crisis.“ İngilizcede olumsuzluk ayrıca ana fiile taşınır: „I don't think it will work“ doğaldır, „I think it won't work“ daha serttir. Türkçede „bence işe yaramaz“ demek çok doğal olduğu için ikinci biçime kaymak kolaydır.",
        examples: [
          { de: "It is not necessarily a crisis.", tr: "Bu illa ki bir kriz değil.", note: "zorunluluk kalkıyor" },
          { de: "I'm not entirely convinced.", tr: "Tamamen ikna olmuş değilim.", note: "kısmi" },
          { de: "I don't think we can reduce it.", tr: "Bunu azaltabileceğimizi sanmıyorum.", note: "olumsuzluk think'e taşındı" },
        ],
      },
      {
        heading: "no longer, not anymore, hardly any",
        tr: "„no longer“ bir durumun sona erdiğini bildirir ve yardımcı fiilden sonra, ana fiilden önce durur; „not … anymore“ aynı anlamın gündelik biçimidir ve cümle sonuna gider. „hardly any“ ise miktarı neredeyse sıfıra indirir: „Hardly any of it can be cut.“ Bu kullanım cümle başında bile devrik yapı gerektirmez, çünkü „hardly“ burada cümleyi değil öznenin içindeki „any“yi niteler.",
        examples: [
          { de: "Six of them are no longer on the schedule.", tr: "Altısı artık çizelgede değil.", note: "resmî" },
          { de: "They don't come to meetings anymore.", tr: "Artık toplantılara gelmiyorlar.", note: "gündelik" },
          { de: "Hardly any of the training can be cut.", tr: "Eğitimin neredeyse hiçbir kısmı kısaltılamaz.", note: "miktar" },
        ],
      },
    ],
    questions: [
      {
        text: "“Not all of the volunteers stayed.” — What does it mean?",
        options: [
          "Nobody stayed.",
          "Some stayed and some did not.",
          "Everybody stayed.",
        ],
        answer: 1,
        explain: "„not all“ kısmi olumsuzluktur: bazıları kaldı.",
      },
      {
        text: "Which sentence is the most natural way to express doubt?",
        options: [
          "I think we can't reduce it.",
          "I think not we can reduce it.",
          "I don't think we can reduce it.",
        ],
        answer: 2,
        explain: "İngilizcede olumsuzluk genellikle „think“e taşınır.",
      },
      {
        text: "Six of them are ___ on the schedule.",
        options: ["no longer", "not longer", "no more longer"],
        answer: 0,
        explain: "Sona eren durum „no longer“ ile anlatılır.",
      },
      {
        kind: "gapfill",
        text: "___ every call is a rescue. (her … değil)",
        options: [],
        answer: 0,
        accept: ["Not", "not"],
        explain: "„Not every“ kısmi olumsuzluk kurar.",
      },
      {
        kind: "gapfill",
        text: "It is not ___ a crisis. (of necessity)",
        options: [],
        answer: 0,
        accept: ["necessarily"],
        explain: "„not necessarily“ iddiayı reddetmez, zorunluluğunu kaldırır.",
      },
      {
        kind: "gapfill",
        text: "___ of the volunteers stayed — they all left. (not one)",
        options: [],
        answer: 0,
        accept: ["None", "none"],
        explain: "Tam olumsuzluk „none of“ ile kurulur.",
      },
      {
        kind: "gapfill",
        text: "They don't come to meetings ___. (= no longer, informal)",
        options: [],
        answer: 0,
        accept: ["anymore", "any more"],
        explain: "„not … anymore“ gündelik biçimdir ve sona gider.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Hardly any", "of the training", "can be", "cut"],
        explain: "„hardly any“ bir isim öbeğinin içinde; devrik yapı gerekmez.",
      },
      {
        kind: "truefalse",
        text: "“I'm not entirely convinced.” — Konuşan tamamen karşı mı?",
        options: ["True", "False"],
        answer: 1,
        explain: "„not entirely“ kısmi bir çekincedir, tam ret değildir.",
      },
      {
        kind: "truefalse",
        text: "“Not all of the volunteers stayed.” — Bazı gönüllülerin ayrıldığını söyler mi?",
        options: ["True", "False"],
        answer: 0,
        explain: "Hepsi kalmadıysa en az bir kısmı ayrılmıştır.",
      },
    ],
  },
];
