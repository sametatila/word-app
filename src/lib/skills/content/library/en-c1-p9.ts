import type { SkillExercise } from "../../types";

/**
 * EN · C1 — Beceriler kütüphanesi, parti 9.
 *
 * Kurallar ve emsal: `en-c1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 9 tutarlılık hattı: istisna kılavuzu, emsal üzerine bilgilendirme,
 * kurumsal bir rehber. Dil bilgisi eşdizim ve içi boşalmış fiiller.
 */
export const enC1P9: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-lib-r9",
    course: "en",
    level: "C1",
    skill: "reading",
    title: "When to Make an Exception",
    genre: "guide",
    intro: "Bir kılavuz metin: istisna ne zaman doğru karar, ne zaman kuralın sessiz sonu.",
    gloss: [
      { de: "exception", tr: "istisna" },
      { de: "precedent", tr: "emsal" },
      { de: "to amend", tr: "değiştirmek" },
      { de: "wording", tr: "ifade biçimi" },
      { de: "to document", tr: "belgelemek" },
      { de: "arbitrary", tr: "keyfî" },
      { de: "practical", tr: "pratik" },
      { de: "judge", tr: "değerlendirmek" },
      { de: "broad", tr: "geniş" },
      { de: "reveal", tr: "açığa çıkarmak" },
      { de: "favor", tr: "ayrıcalık" },
      { de: "recognize", tr: "tanımak" },
      { de: "punish", tr: "cezalandırmak" },
      { de: "involve", tr: "işin içine katmak" },
      { de: "harmless", tr: "zararsız" },
      { de: "judgment", tr: "muhakeme" },
    ],
    minutes: 10,
    text:
      "When to make an exception\n\n" +
      "Rules exist because judging every case separately is slow and inconsistent. " +
      "Exceptions exist because rules are written before the cases arrive. " +
      "Both statements are obviously true, which is why the argument between them " +
      "never ends and why it is usually conducted badly.\n\n" +
      "A more useful question than “should we make an exception?” is " +
      "“what kind of exception is this?”, and there are broadly three.\n\n" +
      "The first is the case the rule was never meant to cover. " +
      "Here the exception does not weaken the rule; it reveals that the rule was drafted " +
      "with a narrower situation in mind. The correct response is not to grant a favor " +
      "but to amend the wording, and a request of this kind should make you reach for " +
      "the document rather than for your judgment.\n\n" +
      "The second is the case the rule covers correctly but harshly. " +
      "This is where most of the real decisions live. " +
      "Granting it is sometimes right, but it creates a precedent whether or not anyone " +
      "says so, and the only honest way through is to write down what made this case " +
      "different in terms that somebody else could apply.\n\n" +
      "The third is the case where the person asking has more influence than the people " +
      "who did not ask. This one is easy to recognize and hard to refuse. " +
      "The test is simple: would the same exception have been granted to somebody " +
      "with no standing at all? If the answer is no, the decision is arbitrary " +
      "however reasonable it feels.\n\n" +
      "One practical rule covers all three. " +
      "Every exception should be recorded with its reason in the same place as the rule. " +
      "Not to punish anybody, but because an undocumented exception does not stay an " +
      "exception. Within about a year it becomes the rule, and nobody will be able " +
      "to say when that happened.",
    questions: [
      {
        text: "What does the guide say about the first kind of exception?",
        options: [
          "The rule should be amended rather than a favor granted.",
          "It should always be refused.",
          "It is the most common kind.",
        ],
        answer: 0,
        explain: "Kural dar bir durum düşünülerek yazılmış demektir.",
      },
      {
        text: "Where do most real decisions live?",
        options: [
          "in cases the rule covers correctly but harshly",
          "in cases never meant to be covered",
          "in cases involving influential people",
        ],
        answer: 0,
        explain: "„This is where most of the real decisions live.“",
      },
      {
        kind: "truefalse",
        text: "Granting the second kind of exception avoids creating a precedent.",
        options: ["True", "False"],
        answer: 1,
        explain: "„it creates a precedent whether or not anyone says so“.",
      },
      {
        kind: "gapfill",
        text: "The test for the third kind asks whether the same exception would be granted to somebody with no ___ at all.",
        options: [],
        answer: 0,
        accept: ["standing"],
        explain: "„somebody with no standing at all“.",
      },
      {
        kind: "short_answer",
        text: "Where should exceptions be recorded?",
        options: [],
        answer: 0,
        accept: [
          "with the rule",
          "in the same place as the rule",
          "next to the rule",
        ],
        explain: "„recorded with its reason in the same place as the rule“.",
      },
      {
        text: "What happens to an undocumented exception?",
        options: [
          "It becomes the rule within about a year.",
          "It is forgotten harmlessly.",
          "It is reversed automatically.",
        ],
        answer: 0,
        explain: "Ve bunun ne zaman olduğunu kimse söyleyemez.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-lib-l9",
    course: "en",
    level: "C1",
    skill: "listening",
    title: "How a Precedent Forms",
    genre: "info",
    intro: "Bir bilgilendirme: bir kararın nasıl emsale dönüştüğü ve bunu fark etmenin neden geç kaldığı.",
    gloss: [
      { de: "to accumulate", tr: "birikmek" },
      { de: "log", tr: "kayıt defteri" },
      { de: "to override", tr: "geçersiz kılmak" },
      { de: "audit", tr: "denetim" },
      { de: "distrust", tr: "güvensizlik" },
      { de: "to trace", tr: "izini sürmek" },
      { de: "individual", tr: "bireysel" },
      { de: "resist", tr: "direnmek" },
      { de: "decisive", tr: "belirleyici" },
      { de: "entire", tr: "tüm" },
      { de: "organizations", tr: "kurum" },
    ],
    minutes: 10,
    segments: [
      { speaker: "Presenter", text: "A precedent rarely forms at the moment anybody expects. It does not form when the first exception is granted." },
      { speaker: "Presenter", text: "It forms the second time, when somebody remembers the first and nobody can find a reason why this case is different." },
      { speaker: "Ms. Idrissi", text: "In the audits I've run, the decisive moment is almost always a sentence in a message: “we did this for the other team last year.” Nobody checks whether that is even true." },
      { speaker: "Presenter", text: "By the third case there is no longer a decision to make. The rule has been quietly overridden by three data points, none of which was written down." },
      { speaker: "Ms. Idrissi", text: "What makes this hard to trace is that each individual decision was reasonable. You cannot point to the mistake, because there isn't one." },
      { speaker: "Presenter", text: "The cheapest fix is not a stricter rule. It is a log: one line per exception, with the date, the reason and the name of whoever approved it." },
      { speaker: "Ms. Idrissi", text: "Organizations resist this because it looks like distrust. In practice it protects the people making the decisions, who otherwise have to remember why they said yes eighteen months ago." },
      { speaker: "Presenter", text: "Where a log exists, exceptions do not stop. What changes is that they accumulate visibly, and somebody notices at four rather than at forty." },
    ],
    questions: [
      {
        text: "When does a precedent form, according to the briefing?",
        options: [
          "the second time, when the first is remembered",
          "the first time an exception is granted",
          "when it is written into the rule",
        ],
        answer: 0,
        explain: "İlk istisnada değil, ikincisinde oluşuyor.",
      },
      {
        text: "What sentence does Ms. Idrissi say is decisive?",
        options: [
          "“we did this for the other team last year”",
          "“the rule does not apply here”",
          "“nobody will notice”",
        ],
        answer: 0,
        explain: "Ve bunun doğru olup olmadığını kimse denetlemiyor.",
      },
      {
        kind: "truefalse",
        text: "Each individual decision in the chain was unreasonable.",
        options: ["True", "False"],
        answer: 1,
        explain: "„each individual decision was reasonable. You cannot point to the mistake.“",
      },
      {
        kind: "gapfill",
        text: "The cheapest fix is a ___: one line per exception.",
        options: [],
        answer: 0,
        accept: ["log"],
        explain: "„It is a log: one line per exception“.",
      },
      {
        kind: "short_answer",
        text: "Why do organizations resist the log?",
        options: [],
        answer: 0,
        accept: ["it looks like distrust", "it seems like distrust", "distrust"],
        explain: "Oysa uygulamada karar verenleri koruyor.",
      },
      {
        text: "What changes when a log exists?",
        options: [
          "Exceptions accumulate visibly and are noticed earlier.",
          "Exceptions stop entirely.",
          "The rule becomes stricter.",
        ],
        answer: 0,
        explain: "Kırkta değil dörtte fark ediliyor.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-lib-w9",
    course: "en",
    level: "C1",
    skill: "writing",
    title: "Guidance on Recording Exceptions",
    genre: "guide",
    intro: "Bir kuruma iç kılavuz yazıyorsun: önce iki cümle kur, sonra uygulanabilir ve gerekçeli bir metin yaz.",
    gloss: [
      { de: "to approve", tr: "onaylamak" },
      { de: "rationale", tr: "gerekçe" },
      { de: "to review", tr: "gözden geçirmek" },
      { de: "burden", tr: "yük" },
      { de: "scope", tr: "kapsam" },
      { de: "concern", tr: "ilgilendirmek" },
      { de: "search", tr: "arama yapmak" },
      { de: "log", tr: "kayıt defteri" },
      { de: "departure", tr: "sapma" },
      { de: "significant", tr: "kayda değer" },
      { de: "trace", tr: "izini sürmek" },
      { de: "currently", tr: "şu anda" },
    ],
    minutes: 16,
    tasks: [
      {
        kind: "build",
        tr: "Bu konuda bir karar almamız gerekiyor.",
        answer: "We need to make a decision on this.",
        alternatives: ["We need to take a decision on this."],
        hint: "„take/make a decision“ içi boşalmış fiil + isim kalıbıdır; „do a decision“ yanlıştır.",
      },
      {
        kind: "build",
        tr: "Kimse bu konuda bir istisna yapmadı.",
        answer: "Nobody has made an exception in this case.",
        alternatives: ["No exception has been made in this case."],
        hint: "„make an exception“ sabit eşdizimdir; „do an exception“ olmaz.",
      },
      {
        kind: "free",
        prompt:
          "İç kılavuz yaz: kılavuzun kapsamını söyle, kaydedilecek dört alanı ve gerekçesini ver, kimin sorumlu olduğunu yaz, bu yükün neden küçük olduğunu göster ve gözden geçirme tarihini belirle.",
        checklist: [
          "Kapsamı ve amacı yaz",
          "Kaydedilecek alanları ve gerekçesini ver",
          "Sorumluyu adlandır",
          "Yükü gerekçelendir ve gözden geçirme tarihi koy",
        ],
        minWords: 150,
        phrases: [
          { de: "This guidance applies to …", tr: "Bu kılavuz … için geçerlidir", en: "" },
          { de: "Four fields are required, and no more.", tr: "Dört alan isteniyor, fazlası değil.", en: "" },
          { de: "The rationale for each is as follows: …", tr: "Her birinin gerekçesi şöyledir: …", en: "" },
          { de: "Responsibility rests with …", tr: "Sorumluluk …'dedir", en: "" },
          { de: "This guidance will be reviewed on …", tr: "Bu kılavuz … tarihinde gözden geçirilecektir", en: "" },
        ],
        sample:
          "This guidance applies to any decision that departs from a published rule, " +
          "whether or not the person making it regards the departure as significant. " +
          "It exists because undocumented exceptions do not remain exceptions: " +
          "within about a year they become practice, and by then nobody can trace when " +
          "the change took place. " +
          "Four fields are required, and no more: the date, the rule concerned, " +
          "the reason in one sentence, and the name of whoever approved it. " +
          "The rationale for each is as follows: the date allows a pattern to be seen, " +
          "the rule number allows the log to be searched, the reason is the only field " +
          "that does any real work, and the name exists so that the person can be asked " +
          "rather than guessed at. " +
          "The reason should be written so that a colleague could apply it to a different " +
          "case and reach the same answer. If it cannot be written that way, " +
          "that is itself useful information about the decision. " +
          "Responsibility rests with the approver, not with the person who requested the " +
          "exception, and the entry should be made the same day. " +
          "The burden is roughly thirty seconds. It is smaller than the burden of " +
          "reconstructing the reasoning eighteen months later, which is the alternative " +
          "and the one we currently choose by default. " +
          "This guidance will be reviewed on October 1 and will lapse if it is not.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-c1-lib-s9",
    course: "en",
    level: "C1",
    skill: "speaking",
    title: "Is Consistency Overrated?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: bir değeri tart ve kendi konumunun maliyetini söyle.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Tutarlılık fazla mı değer görüyor? Konumunu söyle, tutarlılığın gerçekten değerli olduğu yeri adlandır, fazla değer gördüğü yeri anlat ve bir ayrım öner.",
      bulletsTr: [
        "Konumunu tek cümleyle söyle",
        "Tutarlılığın gerçekten değerli olduğu yeri adlandır",
        "Fazla değer gördüğü yeri anlat",
        "Bir ayrım öner",
      ],
      targets: [
        { de: "I'd say it is correctly rated in one place and badly overrated in another.", tr: "Bence bir yerde doğru değerleniyor, başka bir yerde fazlasıyla." },
        { de: "Where it genuinely matters is …", tr: "Gerçekten önemli olduğu yer …" },
        { de: "Where it is used as a substitute for thought is …", tr: "Düşüncenin yerine geçirildiği yer …" },
        { de: "The distinction I'd hold on to is …", tr: "Tutunacağım ayrım …" },
      ],
      minSeconds: 60,
      maxSeconds: 100,
      sampleDe:
        "I'd say it is correctly rated in one place and badly overrated in another, " +
        "and most arguments about it fail because they treat it as a single thing. " +
        "Where it genuinely matters is in how similar cases are treated by different people. " +
        "If two applicants with the same circumstances get different answers depending " +
        "on who opened the file, that is not a style difference; that is the definition " +
        "of an unfair process, and nothing about the individual decisions being " +
        "well-intentioned changes it. " +
        "Where it is used as a substitute for thought is in the phrase " +
        "“but we've always done it this way”, " +
        "which describes a pattern and pretends to give a reason. " +
        "A practice that has never been examined is not consistent; it is merely old, " +
        "and the two get confused because they look identical from outside. " +
        "The distinction I'd hold on to is between consistency of treatment and " +
        "consistency of conclusion. " +
        "The first is a duty: like cases, like handling. " +
        "The second is often a failure: if the evidence has changed and the conclusion " +
        "has not, somebody has stopped reading. " +
        "The honest cost of my position is that it makes every decision slightly slower, " +
        "because you have to ask which kind you are defending.",
      rubricHint:
        "Bir ayrım, iki karşıt örnek ve konumun maliyetinin kabulü beklenir; „correctly rated … overrated“, „used as a substitute for thought“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-c1-lib-g9",
    course: "en",
    level: "C1",
    skill: "grammar",
    title: "make a decision, take action, draw a conclusion",
    genre: "grammar",
    intro: "C1'de hata çoğu zaman dil bilgisinde değil eşdizimde olur: doğru kurulmuş bir cümle yine de yanlış duyulabilir.",
    focus: "İçi boşalmış fiiller ve eşdizim: make/do/take/give/draw",
    gloss: [
      { de: "decision", tr: "karar" },
      { de: "effort", tr: "çaba" },
      { de: "conclusion", tr: "sonuç" },
      { de: "attention", tr: "dikkat" },
    ],
    minutes: 12,
    explanation: [
      {
        heading: "make ve do arasındaki sınır",
        tr: "„make“ bir şeyi YARATMAYA yakındır: make a decision, make a mistake, make an exception, make progress, make an offer. „do“ ise bir işi YERİNE GETİRMEYE yakındır: do the work, do research, do a favor, do damage, do business. Sınır mantıklı ama kusursuz değildir, bu yüzden eşdizim listesi fiille birlikte öğrenilir.",
        examples: [
          { de: "We made an exception in that case.", tr: "O durumda bir istisna yaptık.", note: "make an exception" },
          { de: "They did the research themselves.", tr: "Araştırmayı kendileri yaptı.", note: "do research" },
          { de: "The delay did considerable damage.", tr: "Gecikme epey zarar verdi.", note: "do damage" },
        ],
      },
      {
        heading: "take, give ve draw",
        tr: "„take“ bir edimi üstlenmeyi bildirir: take action, take a decision (İngiliz kullanımı), take responsibility, take steps, take an interest. „give“ bir şeyi yöneltmeyi: give consideration, give priority, give an account. „draw“ ise bir sonuca ya da bir ayrıma ulaşmayı: draw a conclusion, draw a distinction, draw attention to.",
        examples: [
          { de: "The board took no action for six months.", tr: "Kurul altı ay hiçbir işlem yapmadı.", note: "take action" },
          { de: "We should give priority to the oldest cases.", tr: "En eski davalara öncelik vermeliyiz.", note: "give priority" },
          { de: "It is too early to draw a conclusion.", tr: "Sonuç çıkarmak için çok erken.", note: "draw a conclusion" },
        ],
      },
      {
        heading: "Eşdizim neden dil bilgisi sayılır",
        tr: "Bu kalıplar isteğe bağlı süsler değildir: yanlış fiil seçmek cümleyi dil bilgisi açısından bozmaz ama okuru durdurur — „do a decision“, „make research“, „take a conclusion“ hepsi anlaşılır ve hepsi yanlıştır. C1 düzeyinde yazının akıcı sayılması, tam olarak bu seçimlerin doğru yapılmasına bağlıdır.",
        examples: [
          { de: "She drew attention to the missing figures.", tr: "Eksik rakamlara dikkat çekti.", note: "draw attention to" },
          { de: "They made every effort to comply.", tr: "Uymak için her türlü çabayı gösterdiler.", note: "make an effort" },
          { de: "He took responsibility for the error.", tr: "Hatanın sorumluluğunu üstlendi.", note: "take responsibility" },
        ],
      },
    ],
    questions: [
      {
        text: "We need to ___ a decision on this.",
        options: ["do", "make", "draw"],
        answer: 1,
        explain: "Amerikan İngilizcesinde „make a decision“ denir (İngiliz İngilizcesinde „take a decision“ da kullanılır); „do“ ve „draw“ bu isimle kullanılmaz.",
      },
      {
        text: "They ___ the research themselves.",
        options: ["made", "did", "took"],
        answer: 1,
        explain: "„do research“ sabit eşdizimdir.",
      },
      {
        text: "It is too early to ___ a conclusion.",
        options: ["take", "make", "draw"],
        answer: 2,
        explain: "Sonuca ulaşmak „draw a conclusion“ ile kurulur.",
      },
      {
        kind: "gapfill",
        text: "We ___ an exception in that case. (make / do / take / give / draw)",
        options: [],
        answer: 0,
        accept: ["made"],
        explain: "„make an exception“ sabit kalıptır.",
      },
      {
        kind: "gapfill",
        text: "The board ___ no action for six months. (make / do / take / give / draw)",
        options: [],
        answer: 0,
        accept: ["took"],
        explain: "„take action“ eşdizimi geçerlidir.",
      },
      {
        kind: "gapfill",
        text: "She ___ attention to the missing figures. (make / do / take / give / draw)",
        options: [],
        answer: 0,
        accept: ["drew"],
        explain: "„draw attention to“ kalıbı sabittir.",
      },
      {
        kind: "gapfill",
        text: "We should ___ priority to the oldest cases. (make / do / take / give / draw)",
        options: [],
        answer: 0,
        accept: ["give"],
        explain: "„give priority to“ kalıbı kullanılır.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["He", "took", "responsibility", "for the error"],
        explain: "take responsibility for + isim.",
      },
      {
        kind: "truefalse",
        text: "“They made research into the problem.” — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„do research“ ya da „carry out research“ denir.",
      },
      {
        kind: "truefalse",
        text: "“It is too early to draw a conclusion.” — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "„draw a conclusion“ doğru eşdizimdir.",
      },
    ],
  },
];
