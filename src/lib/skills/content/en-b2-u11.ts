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
    title: "Growing crystals at school",
    genre: "guide",
    intro: "Okul laboratuvarı için çalışma kâğıdı: kristal yetiştirmek. Hangi adım hangisinden sonra geliyor?",
    gloss: [
      { de: "chemistry", tr: "kimya" },
      { de: "copper sulfate", tr: "bakır sülfat" },
      { de: "a glove", tr: "eldiven" },
      { de: "poisonous", tr: "zehirli" },
      { de: "pour", tr: "dökmek" },
      { de: "ml", tr: "mililitre" },
      { de: "stir", tr: "karıştırmak" },
      { de: "dissolve", tr: "çözünmek" },
      { de: "a jar", tr: "kavanoz" },
      { de: "a tray", tr: "tepsi" },
      { de: "hang", tr: "asmak" },
      { de: "a thread", tr: "iplik" },
      { de: "tied", tr: "bağlanmış" },
      { de: "tie", tr: "bağlamak" },
      { de: "the top", tr: "ağız" },
      { de: "shaken", tr: "sallanmış" },
      { de: "produce", tr: "üretmek" },
    ],
    minutes: 9,
    text:
      "SCHOOL CHEMISTRY LAB, WEEK 6: GROWING CRYSTALS\n" +
      "Aim: to grow blue crystals from a copper sulfate solution and to measure how fast they form.\n" +
      "Safety first. Wear gloves and glasses at all times. Being poisonous, copper sulfate must never touch your skin or be left on the table. Having finished the experiment, wash your hands, even if you wore gloves.\n" +
      "Method.\n" +
      "1. Pour 100 ml of water into the glass and heat it to about 60 degrees.\n" +
      "2. Having heated the liquid, add the copper sulfate one spoon at a time, stirring after each spoon, until no more will dissolve.\n" +
      "3. Pour the solution into a clean jar. Being hot, the jar should be placed on the metal tray, not on the plastic table.\n" +
      "4. Hang a thread in the liquid, tied to a pencil that lies across the top of the jar.\n" +
      "5. Leave the jar in a quiet place. Moved or shaken, the solution will form many small crystals instead of one large one.\n" +
      "Results. Formed after two or three days, the first crystals can be measured with a ruler. Record their size every morning in the table on page 2.\n" +
      "Last year, one group added a drop of a catalyst by mistake. Being fast, the reaction produced crystals in a few hours, but they were small and broken. Your teacher will explain why in week 7.\n" +
      "Questions for your report: Which jar grew the largest crystal? What might explain the difference between the groups?",
    questions: [
      {
        text: "Why must copper sulfate never touch your skin?",
        options: ["It is poisonous.", "It is hot.", "It is expensive."],
        answer: 0,
        explain: "„Being poisonous, copper sulfate must never touch your skin or be left on the table.“",
      },
      {
        text: "What happens if the solution is moved or shaken?",
        options: ["Many small crystals form.", "No crystals form.", "One large crystal forms."],
        answer: 0,
        explain: "„Moved or shaken, the solution will form many small crystals instead of one large one.“",
      },
      {
        kind: "truefalse",
        text: "You should wash your hands even if you wore gloves.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Having finished the experiment, wash your hands, even if you wore gloves.“",
      },
      {
        kind: "gapfill",
        text: "Having heated the ___, add the copper sulfate one spoon at a time.",
        options: [],
        answer: 0,
        accept: ["liquid"],
        explain: "„Having heated the liquid, add the copper sulfate one spoon at a time…“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Heat the water to about 60 degrees.",
          "Add the copper sulfate one spoon at a time.",
          "Hang a thread in the liquid.",
          "Measure the crystals with a ruler.",
        ],
        explain: "Yöntemin adımları: ısıtmak, çözmek, ipi asmak, en sonda ölçmek.",
      },
      {
        kind: "short_answer",
        text: "When will the teacher explain what happened last year?",
        options: [],
        answer: 0,
        accept: ["in week 7", "week 7", "week seven"],
        explain: "„Your teacher will explain why in week 7.“",
      },
    ],
  },
  {
    id: "en-b2-u11-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 11,
    title: "Doubts about a sleep therapy",
    genre: "article",
    intro: "Yeni bir uyku tedavisi hakkında haber. Sonuçlar neden kuşkuyla karşılanıyor?",
    gloss: [
      { de: "scientific", tr: "bilimsel" },
      { de: "a journal", tr: "dergi" },
      { de: "react", tr: "tepki vermek" },
      { de: "a press release", tr: "basın bülteni" },
      { de: "deserve", tr: "hak etmek" },
    ],
    minutes: 9,
    text:
      "NEW SLEEP THERAPY: TOO GOOD TO BE TRUE?\n" +
      "A new therapy for people who cannot sleep has been in the news all week. It is reported that the patients in the study slept almost two hours longer after only four weeks of treatment. The results are said to be the best ever recorded for a therapy without medicine.\n" +
      "The study was carried out at a private institute in Geneva and has not yet been published in a scientific journal. The company that sells the therapy is thought to have paid for most of the research, although neither the company nor the institute has confirmed this.\n" +
      "Some doctors are worried. The cohort is thought to have been too small: only 36 patients took part, and all of them are believed to have been under forty. Older patients, who make up most of the people with sleep problems, are said to react quite differently to this kind of treatment.\n" +
      "It is also reported that the experiment was repeated with a second group, but the numbers from that group are not included in the press release.\n" +
      "Dr. Elif Tan, a sleep specialist at the city hospital, said that the idea behind the therapy was interesting and deserved a proper trial. She advised patients not to pay for the therapy until larger studies are available. The measurements are said to be stable, she added, but a stable result from 36 young people says very little about everybody else.\n" +
      "A larger study with 400 patients is expected to begin next year.",
    questions: [
      {
        text: "How much longer did the patients reportedly sleep?",
        options: ["almost two hours", "four hours", "thirty minutes"],
        answer: 0,
        explain: "„It is reported that the patients in the study slept almost two hours longer after only four weeks of treatment.“",
      },
      {
        text: "Who is thought to have paid for most of the research?",
        options: ["the company that sells the therapy", "the city hospital", "a scientific journal"],
        answer: 0,
        explain: "„The company that sells the therapy is thought to have paid for most of the research…“",
      },
      {
        kind: "truefalse",
        text: "Older patients took part in the study.",
        options: ["True", "False"],
        answer: 1,
        explain: "„only 36 patients took part, and all of them are believed to have been under forty.“",
      },
      {
        kind: "gapfill",
        text: "The cohort is thought to have been too ___.",
        options: [],
        answer: 0,
        accept: ["small"],
        explain: "„The cohort is thought to have been too small…“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The therapy has been in the news all week.",
          "The study has not yet been published.",
          "Some doctors are worried about the cohort.",
          "A larger study is expected next year.",
        ],
        explain: "Haber, çalışmanın durumu, eleştiriler, en sonda yeni çalışma.",
      },
      {
        kind: "short_answer",
        text: "How many patients will the larger study have?",
        options: [],
        answer: 0,
        accept: ["400", "four hundred", "400 patients"],
        explain: "„A larger study with 400 patients is expected to begin next year.“",
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
    title: "A poster for the open day",
    genre: "dialogue",
    intro: "İki araştırmacı açık gün için poster hazırlıyor. Robot laboratuvarda neyi değiştirdi?",
    gloss: [
      { de: "the top", tr: "üst kısım" },
      { de: "a technician", tr: "teknisyen" },
      { de: "zero", tr: "sıfır" },
      { de: "a gripper", tr: "tutucu" },
      { de: "a tube", tr: "tüp" },
      { de: "software", tr: "yazılım" },
      { de: "a title", tr: "başlık" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Koray", text: "Selma, the open day is on Saturday and our poster is still empty. What do we put at the top?" },
      { speaker: "Selma", text: "The big news. The automation of the process took a year. Before the robot, two technicians sorted every blood sample by hand." },
      { speaker: "Koray", text: "How many samples a day?" },
      { speaker: "Selma", text: "About three thousand. Now the robot does it in half the time, and the number of mistakes has dropped to almost zero." },
      { speaker: "Koray", text: "Should we mention the invention of the gripper? That was our own idea." },
      { speaker: "Selma", text: "Yes, definitely. The invention of the soft gripper is the reason the tubes no longer break. Put a photo next to it." },
      { speaker: "Koray", text: "And the software problem in March?" },
      { speaker: "Selma", text: "Just one line. The introduction of the patch was delayed by two weeks, but nothing was lost." },
      { speaker: "Koray", text: "Visitors always ask about jobs. Did anybody lose theirs?" },
      { speaker: "Selma", text: "No. After the introduction of the robot, the two technicians moved to the research team. Say that clearly. People worry." },
      { speaker: "Koray", text: "Okay. What about a title: from hand to robot in one year?" },
      { speaker: "Selma", text: "Perfect. Short, and everybody will understand it." },
    ],
    questions: [
      {
        text: "How many samples are sorted every day?",
        options: ["about three thousand", "about three hundred", "about thirty thousand"],
        answer: 0,
        explain: "„About three thousand.“",
      },
      {
        text: "Why do the tubes no longer break?",
        options: ["because of the soft gripper", "because of the patch", "because the technicians check them"],
        answer: 0,
        explain: "„The invention of the soft gripper is the reason the tubes no longer break.“",
      },
      {
        kind: "truefalse",
        text: "The two technicians kept working at the institute.",
        options: ["True", "False"],
        answer: 0,
        explain: "„After the introduction of the robot, the two technicians moved to the research team.“",
      },
      {
        kind: "gapfill",
        text: "The introduction of the patch was delayed by two ___.",
        options: [],
        answer: 0,
        accept: ["weeks"],
        explain: "„The introduction of the patch was delayed by two weeks, but nothing was lost.“",
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
        text: "When is the open day?",
        options: [],
        answer: 0,
        accept: ["on Saturday", "Saturday"],
        explain: "„Selma, the open day is on Saturday and our poster is still empty.“",
      },
    ],
  },
  {
    id: "en-b2-u11-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 11,
    title: "Testing the electric bus",
    genre: "monologue",
    intro: "Proje yöneticisinin elektrikli otobüs denemesi hakkındaki aylık sesli mesajı. Sırada ne var?",
    gloss: [
      { de: "transport", tr: "ulaşım" },
      { de: "a lab", tr: "laboratuvar" },
      { de: "steep", tr: "dik" },
      { de: "real", tr: "gerçek" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Devrim", text: "Hello, this is Devrim from the transport lab with the monthly update on the electric bus project." },
      { speaker: "Devrim", text: "The good news first. By June the emissions will have been measured on all three routes, including the steep one up to the hospital." },
      { speaker: "Devrim", text: "This time next week we will be testing the vehicle in the mountains, where the cold and the hills put the most pressure on the battery." },
      { speaker: "Devrim", text: "The consumption will have been checked by then. So far, on the city routes, the bus uses about a third less energy than we expected." },
      { speaker: "Devrim", text: "The insulation around the driver is still a problem. The drivers say it is too cold in the mornings, and they are right." },
      { speaker: "Devrim", text: "By the end of next month the heating will have been replaced. The supplier has promised us, and they have kept every date so far." },
      { speaker: "Devrim", text: "In September we will be running the bus with real passengers for the first time, on route 12, for six weeks." },
      { speaker: "Devrim", text: "If you have questions before then, I will be in the lab all week. Thanks, and speak soon." },
    ],
    questions: [
      {
        text: "Where will they be testing the vehicle next week?",
        options: ["in the mountains", "on route 12", "at the hospital"],
        answer: 0,
        explain: "„This time next week we will be testing the vehicle in the mountains…“",
      },
      {
        text: "How much energy does the bus use so far?",
        options: ["about a third less than expected", "about a third more than expected", "exactly what was expected"],
        answer: 0,
        explain: "„So far, on the city routes, the bus uses about a third less energy than we expected.“",
      },
      {
        kind: "truefalse",
        text: "The drivers are happy with the heating.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The drivers say it is too cold in the mornings, and they are right.“",
      },
      {
        kind: "gapfill",
        text: "By June the ___ will have been measured on all three routes.",
        options: [],
        answer: 0,
        accept: ["emissions"],
        explain: "„By June the emissions will have been measured on all three routes…“",
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
        text: "On which route will the bus carry real passengers?",
        options: [],
        answer: 0,
        accept: ["route 12", "12", "route twelve"],
        explain: "„In September we will be running the bus with real passengers for the first time, on route 12, for six weeks.“",
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
    title: "Lab notes",
    genre: "info",
    intro: "Laboratuvar defteri için cümleler kur ve deney kartını doldur.",
    gloss: [
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
        prompt: "Laboratuvar defteri için deney kartını doldur.",
        facts: "Sıvı ısıtıldıktan sonra katalizör eklendi; tepkime yavaş olduğu için daha çok ısı gerekti; kristal pazartesi oluştu ve ölçüldü; deneyin yinelendiği bildiriliyor.",
        fields: [
          { label: "Catalyst added", answer: "after heating the liquid", accept: ["having heated the liquid", "after heating", "after the liquid was heated"] },
          { label: "More heat needed because", answer: "the reaction was slow", accept: ["being slow", "it was slow", "slow reaction"] },
          { label: "Crystal formed", answer: "on Monday", accept: ["Monday", "formed on Monday"] },
          { label: "Experiment", answer: "repeated", accept: ["was repeated", "it was repeated"] },
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
    title: "Writing an abstract",
    genre: "info",
    intro: "Bir araştırma özeti için cümleler kur: süreç, buluş, ölçümler.",
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
