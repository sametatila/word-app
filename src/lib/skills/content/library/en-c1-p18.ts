import type { SkillExercise } from "../../types";

/**
 * EN · C1 — Beceriler kütüphanesi, parti 18.
 *
 * Hücreyi YİRMİYE tamamlayan on partiden biri. Kurallar ve emsal:
 * `en-c1.ts` (parti 1), `en-c1-p6` … `p10` ve `data/content/SPEC.md`.
 *
 * Parti 18 ev ödevi hattı: not verilmeyen ödeve geçen bir okul üzerine
 * haber yazısı, müdür yardımcısının velilere sesli duyurusu, okul bültenine
 * bir öğrenci yazısı. Dil bilgisi resmî gelecek — be to, be due to, be set
 * to, be about to / on the point of; B1–B2'deki will / going to'nun ve
 * parti 10'daki „was to have“ın ötesi.
 */
export const enC1P18: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-lib-r18",
    course: "en",
    level: "C1",
    skill: "reading",
    title: "Ridgeway to End Graded Homework",
    genre: "article",
    intro: "Bir haber yazısı: bir okul ev ödevine not vermeyi bırakıyor; deneme ne gösterdi, kim ikna olmadı.",
    gloss: [
      { de: "homework", tr: "ev ödevi" },
      { de: "to grade", tr: "not vermek" },
      { de: "student", tr: "okul öğrencisi" },
      { de: "guidance", tr: "yönerge" },
      { de: "trial", tr: "deneme" },
      { de: "share", tr: "oran" },
      { de: "gap", tr: "uçurum" },
      { de: "to narrow", tr: "daralmak" },
      { de: "to separate", tr: "ayırmak" },
      { de: "convinced", tr: "ikna olmuş" },
      { de: "petition", tr: "dilekçe" },
      { de: "optional", tr: "isteğe bağlı" },
      { de: "completion", tr: "tamamlama" },
      { de: "to settle", tr: "karara bağlamak" },
      { de: "slightly", tr: "biraz" },
      { de: "skip", tr: "atlamak" },
    ],
    minutes: 10,
    text:
      "Ridgeway to end graded homework from September\n\n" +
      "Ridgeway Secondary is to stop grading homework for all students under sixteen from the start of the next " +
      "school year, the head teacher confirmed on Monday. Homework will still be set, but it will no longer " +
      "count toward reports, and teachers are due to receive new guidance on how to use it before the summer.\n\n" +
      "The decision follows a two-year trial in three year groups. According to the school's own figures, the " +
      "share of homework handed in on time fell slightly during the trial, from about eighty-two to seventy-eight " +
      "percent. What changed more was what was handed in. Teachers reported far fewer pieces that had clearly " +
      "been copied or completed by a parent, and the gap between students with and without help at home narrowed " +
      "in the end-of-year tests.\n\n" +
      "“Graded homework was measuring two things at once,” the head, Dr Anita Rao, said. “Partly what a child " +
      "had learned, and partly what kind of kitchen table they went home to. We couldn't separate them, so we " +
      "have stopped pretending to.”\n\n" +
      "Not everyone is convinced. A group of parents is set to present a petition to the governors next week, " +
      "arguing that without grades students will simply stop doing the work. Some teachers share a different " +
      "worry: that homework which carries no mark will quietly become optional, and that the students most in need " +
      "of practice will be the first to skip it.\n\n" +
      "The school says it will publish completion rates each term, and that the policy is to be reviewed after " +
      "one year rather than three. Dr Rao admitted that the trial had been too small to settle the question. " +
      "“We are about to find out whether it works at scale,” she said. “If it doesn't, we will say so.”",
    questions: [
      {
        text: "What will change from September?",
        options: [
          "Homework will no longer be set.",
          "Homework will no longer count toward reports.",
          "Students will receive more homework.",
        ],
        answer: 1,
        explain: "Ödev verilmeye devam edecek ama karneye sayılmayacak.",
      },
      {
        text: "What changed most during the trial?",
        options: [
          "the number of teachers",
          "the length of the homework",
          "what kind of work was handed in",
        ],
        answer: 2,
        explain: "Belli ki kopyalanmış ya da veli tarafından yapılmış ödevler çok azalmış.",
      },
      {
        kind: "truefalse",
        text: "The share of homework handed in on time rose during the trial.",
        options: ["True", "False"],
        answer: 1,
        explain: "Hafifçe düştü: yüzde seksen ikiden yetmiş sekize.",
      },
      {
        kind: "gapfill",
        text: "The trial lasted ___ years.",
        options: [],
        answer: 0,
        accept: ["two", "2"],
        explain: "„The decision follows a two-year trial in three year groups.“",
      },
      {
        kind: "short_answer",
        text: "What will the school publish each term?",
        options: [],
        answer: 0,
        accept: ["completion rates", "the completion rates"],
        explain: "„it will publish completion rates each term“.",
      },
      {
        text: "What did graded homework measure, according to Dr Rao?",
        options: [
          "learning and home circumstances together",
          "only the effort a student made",
          "only how often a student attended",
        ],
        answer: 0,
        explain: "Çocuğun öğrendiğini ve eve döndüğü mutfak masasını; ikisi ayrılamıyordu.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-lib-l18",
    course: "en",
    level: "C1",
    skill: "listening",
    title: "A Message for Parents",
    genre: "info",
    intro: "Müdür yardımcısının velilere sesli duyurusu: ödev değişikliğinde ne değişiyor, ne değişmiyor, takvim nasıl.",
    gloss: [
      { de: "deputy", tr: "müdür yardımcısı" },
      { de: "update", tr: "güncelleme" },
      { de: "to attend", tr: "katılmak" },
      { de: "feedback", tr: "geri bildirim" },
      { de: "specific", tr: "somut" },
      { de: "to hide", tr: "saklanmak" },
      { de: "completion", tr: "tamamlama" },
      { de: "invitation", tr: "davet" },
      { de: "doubt", tr: "kuşku" },
      { de: "due", tr: "beklenen" },
      { de: "appear", tr: "yer almak" },
    ],
    minutes: 10,
    segments: [
      { speaker: "Mr Nakamura", text: "Good evening. This is Tom Nakamura, deputy head at Ridgeway, with a short update on the homework changes that are due to start in September." },
      { speaker: "Mr Nakamura", text: "First, what is not changing. Homework will still be set every week in every subject, and teachers will still read it and write comments." },
      { speaker: "Mr Nakamura", text: "What is changing is that it will no longer carry a mark, and it will not appear on your child's report." },
      { speaker: "Mr Nakamura", text: "Teachers are to attend two training sessions in June. The aim is simple: to make feedback on homework specific enough to be worth reading without a grade." },
      { speaker: "Mr Nakamura", text: "We know some of you are worried that students will stop doing the work. We share that worry, and we are not going to hide from it." },
      { speaker: "Mr Nakamura", text: "In the trial year groups, completion fell by four points. That is small, but it is not nothing, and we will not describe it as nothing." },
      { speaker: "Mr Nakamura", text: "Completion rates for each year group are to be published on the website every term, starting in December." },
      { speaker: "Mr Nakamura", text: "If rates in any year group fall below seventy percent, the head and the governors are due to meet within a month to decide what to do." },
      { speaker: "Mr Nakamura", text: "One last thing. A parents' evening on the changes is set for the fourteenth of May. We are about to send invitations." },
      { speaker: "Mr Nakamura", text: "We would much rather hear your doubts there than at the school gate." },
    ],
    questions: [
      {
        text: "What is not changing?",
        options: [
          "Homework will still be set every week.",
          "Homework will still be graded.",
          "Homework will still appear on reports.",
        ],
        answer: 0,
        explain: "Her hafta her derste ödev verilecek ve öğretmenler yorum yazacak.",
      },
      {
        text: "What is the purpose of the June training?",
        options: [
          "to set more homework",
          "to make feedback useful without a grade",
          "to prepare the new style of reports",
        ],
        answer: 1,
        explain: "Geri bildirimin not olmadan da okunmaya değecek kadar somut olması.",
      },
      {
        kind: "truefalse",
        text: "Completion rates will be published every term, starting in December.",
        options: ["True", "False"],
        answer: 0,
        explain: "„are to be published on the website every term, starting in December“.",
      },
      {
        kind: "gapfill",
        text: "If rates fall below ___ percent, the head and the governors will meet.",
        options: [],
        answer: 0,
        accept: ["seventy", "70"],
        explain: "„If rates in any year group fall below seventy percent“ bir ay içinde toplanılacak.",
      },
      {
        kind: "short_answer",
        text: "When is the parents' evening?",
        options: [],
        answer: 0,
        accept: ["the fourteenth of May", "14 May", "14th May", "the 14th of May", "May 14", "May 14th", "May the fourteenth", "on the fourteenth of May", "on 14 May", "fourteenth of May", "May fourteenth"],
        explain: "„A parents' evening on the changes is set for the fourteenth of May.“",
      },
      {
        text: "Where would the school rather hear parents' doubts?",
        options: [
          "by email",
          "at the school gate",
          "at the parents' evening",
        ],
        answer: 2,
        explain: "„We would much rather hear your doubts there than at the school gate.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-lib-w18",
    course: "en",
    level: "C1",
    skill: "writing",
    title: "For the School Newsletter",
    genre: "article",
    intro: "Okul bülteni için bir öğrenci yazısı yazıyorsun: önce iki cümle kur, sonra ödev değişikliğini öğrenci gözüyle anlat.",
    gloss: [
      { de: "newsletter", tr: "bülten" },
      { de: "mark", tr: "not" },
      { de: "comment", tr: "yorum" },
      { de: "effort", tr: "çaba" },
      { de: "to postpone", tr: "ertelemek" },
      { de: "optional", tr: "isteğe bağlı" },
      { de: "appear", tr: "yayımlanmak" },
    ],
    minutes: 16,
    tasks: [
      {
        kind: "build",
        tr: "Eylülden itibaren ödevler yalnızca yorumla değerlendirilecek.",
        answer: "From September, homework is to be marked with comments only.",
        alternatives: ["Homework is to be marked with comments only from September."],
        hint: "„be to“ resmî bir düzenlemeyi ya da kararı bildirir; duyurularda sık geçer.",
      },
      {
        kind: "build",
        tr: "İlk tamamlama rakamlarının aralıkta yayımlanması bekleniyor.",
        answer: "The first completion figures are due to appear in December.",
        alternatives: ["In December the first completion figures are due to appear."],
        hint: "„be due to“ takvime bağlı, beklenen bir olayı bildirir.",
      },
      {
        kind: "free",
        prompt:
          "Okul bülteni için bir yazı yaz: değişikliği ve takvimini kısaca açıkla, öğrencilerin ne düşündüğünü iki farklı görüşle göster, kendi görüşünü söyle ve okurlara neyi takip etmeleri gerektiğini yaz.",
        checklist: [
          "Değişikliği ve takvimini açıkla",
          "Öğrencilerden iki farklı görüş göster",
          "Kendi görüşünü söyle",
          "Okurlara neyi takip etmeleri gerektiğini yaz",
        ],
        minWords: 160,
        phrases: [
          { de: "From September, … is to …", tr: "Eylülden itibaren … yapılacak", en: "" },
          { de: "… is due to … in …", tr: "…'in …'de … olması bekleniyor", en: "" },
          { de: "Not everyone in Year 10 is convinced.", tr: "10. sınıftaki herkes ikna olmuş değil.", en: "" },
          { de: "My own view is that …", tr: "Benim görüşüm şu: …", en: "" },
          { de: "The number to watch is …", tr: "Takip edilecek rakam …", en: "" },
        ],
        sample:
          "Homework without marks: what changes, and what we think\n\n" +
          "From September, homework is to be marked with comments only. It will still be set every week, and " +
          "teachers will still read it, but it will not count toward our reports. The school ran a trial in three " +
          "year groups for two years, and the policy is to be reviewed after one year.\n\n" +
          "Not everyone in Year 10 is convinced. “If it doesn't count, half the class will stop doing it,” one " +
          "student told me, and she was not joking. Others see it differently. A student in Year 9, who took part " +
          "in the trial, said the comments had become more useful once there was no number to look at first: " +
          "“I actually read them now, because there's nothing else to read.”\n\n" +
          "My own view is that both of them are right. Some of us will treat unmarked work as optional, at least " +
          "at first. But a mark was never the reason I learned anything from homework; the comment was, and the " +
          "mark usually stopped me reading it.\n\n" +
          "The number to watch is the completion rate. The first figures are due to appear in December, and if " +
          "they fall below seventy percent the governors are to meet within a month. If you have an opinion, " +
          "the parents' evening in May is open to students as well.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-c1-lib-s18",
    course: "en",
    level: "C1",
    skill: "speaking",
    title: "Should Homework Be Graded?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: ev ödevine not vermenin neyi ölçtüğünü tart ve bir düzen öner.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Ev ödevine not verilmeli mi? Notun gerçekte neyi ölçtüğünü söyle, notsuz ödevin en ciddi riskini kabul et, bir ara çözüm öner ve bu çözümün nasıl sınanacağını anlat.",
      bulletsTr: [
        "Notun gerçekte neyi ölçtüğünü söyle",
        "Notsuz ödevin en ciddi riskini kabul et",
        "Bir ara çözüm öner",
        "Çözümün nasıl sınanacağını anlat",
      ],
      targets: [
        { de: "A mark on homework measures more than it is meant to.", tr: "Ödevdeki not ölçmesi gerekenden fazlasını ölçüyor." },
        { de: "The most serious risk is that …", tr: "En ciddi risk …" },
        { de: "What I'd propose is a middle position: …", tr: "Önereceğim şey bir ara konum: …" },
        { de: "The test would be whether …", tr: "Sınama … olup olmadığı olurdu" },
      ],
      minSeconds: 60,
      maxSeconds: 100,
      sampleDe:
        "A mark on homework measures more than it is meant to. It is supposed to tell us what a student has " +
        "learned, but work done at home also records how quiet the home is, whether anyone there can help, and " +
        "sometimes whether an adult did the work. " +
        "That is why I'm uneasy about grading it: the students with the most support collect the best marks for " +
        "reasons that have little to do with them. " +
        "The most serious risk of dropping marks is not laziness in general. It is that the students who most need " +
        "practice are the first to decide it is optional, and the gap grows in exactly the place we meant to " +
        "close it. " +
        "What I'd propose is a middle position: no marks, but a simple record of whether the work was attempted, " +
        "shared with parents, and specific comments that a student has to answer in one sentence before the next " +
        "piece is set. " +
        "The test would be whether completion holds up among the students who were already struggling, not the " +
        "average for the whole school. If it drops there, the policy has failed, however good the overall " +
        "figures look.",
      rubricHint:
        "Notun neyi ölçtüğünün çözümlenmesi, en ciddi riskin kabulü, bir ara çözüm ve sınama ölçütü beklenir; „is to“, „is due to“ gibi resmî gelecek yapıları da kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-c1-lib-g18",
    course: "en",
    level: "C1",
    skill: "grammar",
    title: "is to close, is due to open",
    genre: "grammar",
    intro: "Haberlerin ve duyuruların geleceği will ile kurulmaz; takvim, karar ve eşik için ayrı biçimler vardır.",
    focus: "Resmî gelecek: be to, be due to, be set to, be about to / on the point of (will / going to'nun ötesi)",
    gloss: [
      { de: "petition", tr: "dilekçe" },
      { de: "guidance", tr: "yönerge" },
      { de: "invitation", tr: "davet" },
      { de: "to publish", tr: "yayımlamak" },
    ],
    minutes: 12,
    explanation: [
      {
        heading: "be to: karar ve düzenleme",
        tr: "„be to + yalın fiil“ bir makamın verdiği kararı ya da resmî bir düzenlemeyi bildirir: „The school is to stop grading homework.“ Haber başlıklarında „is“ düşer: „Ridgeway to end graded homework.“ Edilgen biçimi de sıktır: „The policy is to be reviewed after a year.“ „was to have“ gerçekleşmemiş geçmiş bir düzenlemeyi söyler; „is to“ ise şimdiki ve geçerli olanıdır.",
        examples: [
          { de: "The school is to stop grading homework.", tr: "Okul ödevlere not vermeyi bırakacak.", note: "resmî karar" },
          { de: "Ridgeway to end graded homework.", tr: "Ridgeway notlu ödevi kaldırıyor.", note: "başlıkta is düşer" },
          { de: "The policy is to be reviewed after a year.", tr: "Politika bir yıl sonra gözden geçirilecek.", note: "edilgen: is to be" },
        ],
      },
      {
        heading: "be due to ve be set to",
        tr: "„be due to“ takvime bağlı, beklenen bir olayı bildirir: „Teachers are due to receive guidance before the summer.“ „be set to“ ise gazetecilikte bir şeyin olmak üzere olduğunu ya da büyük olasılıkla olacağını söyler: „Parents are set to present a petition.“ „set for“ bir tarihe bağlanmış etkinlik için kullanılır: „The meeting is set for May 14.“",
        examples: [
          { de: "Teachers are due to receive new guidance in June.", tr: "Öğretmenlerin haziranda yeni yönerge alması bekleniyor.", note: "takvim" },
          { de: "Parents are set to present a petition next week.", tr: "Velilerin gelecek hafta bir dilekçe sunması bekleniyor.", note: "haber dili" },
          { de: "The parent-teacher conference is set for May 14.", tr: "Veli toplantısı 14 Mayıs'a ayarlandı.", note: "set for + tarih" },
        ],
      },
      {
        heading: "be about to ve be on the point of",
        tr: "„be about to + yalın fiil“ çok yakın bir geleceği bildirir: „We are about to send the invitations.“ „be on the point of + -ing“ aynı yakınlığı daha resmî ve daha dramatik söyler. İkisinin de yanına „tomorrow“ ya da „next year“ gibi zaman sözcüğü konmaz, çünkü yakınlık zaten anlamın içindedir.",
        examples: [
          { de: "We are about to send the invitations.", tr: "Davetleri göndermek üzereyiz.", note: "çok yakın" },
          { de: "The school was on the point of canceling the trial.", tr: "Okul denemeyi iptal etmek üzereydi.", note: "on the point of + -ing" },
          { de: "The figures are about to be published.", tr: "Rakamlar yayımlanmak üzere.", note: "edilgen" },
        ],
      },
    ],
    questions: [
      {
        text: "Which headline is correctly formed?",
        options: [
          "Ridgeway is ending to graded homework.",
          "Ridgeway to end graded homework.",
          "Ridgeway will to end graded homework.",
        ],
        answer: 1,
        explain: "Başlıkta „be to“nun „is“i düşer: „Ridgeway to end …“",
      },
      {
        text: "The school was on the point of ___ the trial.",
        options: ["cancel", "to cancel", "canceling"],
        answer: 2,
        explain: "„on the point of“ + -ing.",
      },
      {
        text: "We are ___ to send the invitations — any minute now.",
        options: ["about", "due", "set"],
        answer: 0,
        explain: "Çok yakın gelecek: „be about to“.",
      },
      {
        kind: "gapfill",
        text: "The policy is to ___ reviewed after a year.",
        options: [],
        answer: 0,
        accept: ["be"],
        explain: "Edilgen resmî gelecek: „is to be reviewed“.",
      },
      {
        kind: "gapfill",
        text: "Teachers are ___ to receive new guidance in June. (expected by the schedule)",
        options: [],
        answer: 0,
        accept: ["due"],
        explain: "Takvime bağlı beklenen olay: „be due to“.",
      },
      {
        kind: "gapfill",
        text: "The parent-teacher conference is set ___ May 14.",
        options: [],
        answer: 0,
        accept: ["for"],
        explain: "Bir tarihe bağlanmış etkinlik: „set for“.",
      },
      {
        kind: "gapfill",
        text: "Parents are ___ to present a petition next week. (news style)",
        options: [],
        answer: 0,
        accept: ["set"],
        explain: "Gazetecilikte büyük olasılıkla olacak bir şey: „be set to“.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["The figures", "are about", "to be", "published"],
        explain: "„be about to“ + edilgen mastar.",
      },
      {
        kind: "truefalse",
        text: "“We are about to send the invitations next year.” — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„be about to“ çok yakın geleceği bildirir; „next year“ ile kullanılmaz.",
      },
      {
        kind: "truefalse",
        text: "“The school is to stop grading homework.” — Bu cümle resmî bir kararı bildirir mi?",
        options: ["True", "False"],
        answer: 0,
        explain: "„be to“ bir makamın kararını ya da düzenlemesini bildirir.",
      },
    ],
  },
];
