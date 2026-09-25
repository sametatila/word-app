import type { SkillExercise } from "../../types";

/**
 * EN · C1 — Beceriler kütüphanesi, parti 8.
 *
 * Kurallar ve emsal: `en-c1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 8 kurumsal geçmiş hattı: bir sergi değerlendirmesi, bir tartışma
 * yayını, foruma katkı. Dil bilgisi kayıt kaydırma — aynı içeriğin resmî ve
 * gündelik dilbilgisi.
 */
export const enC1P8: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-lib-r8",
    course: "en",
    level: "C1",
    skill: "reading",
    title: "The Room They Did Not Rebuild",
    genre: "review",
    intro: "Bir sergi değerlendirmesi: müze kendi geçmişini nasıl anlatıyor, nerede duruyor, nerede duraksıyor.",
    gloss: [
      { de: "to acquire", tr: "edinmek" },
      { de: "omission", tr: "atlama" },
      { de: "claim", tr: "talep" },
      { de: "restitution", tr: "iade" },
      { de: "curator", tr: "küratör" },
      { de: "wall text", tr: "duvar metni" },
      { de: "specific", tr: "açık, somut" },
      { de: "institution", tr: "kurum" },
      { de: "uncomfortable", tr: "rahatsız" },
      { de: "object", tr: "nesne" },
      { de: "general", tr: "genel" },
      { de: "panel", tr: "sergi panosu" },
      { de: "difficulty", tr: "zorluk" },
      { de: "type", tr: "yazı tipi" },
      { de: "consist", tr: "oluşmak" },
      { de: "hesitate", tr: "tereddüt etmek" },
      { de: "flee", tr: "kaçmak" },
      { de: "unusual", tr: "alışılmadık" },
      { de: "risky", tr: "riskli" },
    ],
    minutes: 10,
    text:
      "The room they did not rebuild\n\n" +
      "The new permanent display at the Whitfield opens with a sentence I did not expect: " +
      "“Most of what you are about to see was acquired in circumstances we would not " +
      "accept today.” It is on the wall, in the same type size as everything else, " +
      "and it is not repeated anywhere afterwards.\n\n" +
      "That single decision carries the whole exhibition, and it is worth saying why it works. " +
      "A museum that apologizes in every label teaches visitors to stop reading labels. " +
      "The Whitfield says it once, clearly, and then does something more demanding: " +
      "it tells you, object by object, what is actually known about how each piece arrived.\n\n" +
      "Roughly a fifth of the wall texts end with a sentence beginning “The record is " +
      "incomplete”, followed by what the gap consists of. " +
      "This is far more uncomfortable than an apology and far more useful. " +
      "An apology closes a subject; an admission of missing evidence keeps it open, " +
      "and invites the kind of visitor who might be able to fill it.\n\n" +
      "Where the exhibition hesitates is on restitution. " +
      "There is a panel that describes the process in general terms, lists the number of " +
      "claims received and states that three have been resolved. It does not say how, " +
      "or what the museum argued in the two that were refused. " +
      "Given the candour of everything before it, the omission is loud.\n\n" +
      "The curator has been quoted as saying that these matters are “subject to ongoing " +
      "legal processes”, which may well be true and is also what every institution says. " +
      "Having admitted so much, the Whitfield could afford to be specific here too. " +
      "It has already shown that visitors do not flee from difficulty; " +
      "they flee from the feeling that they are being managed.",
    questions: [
      {
        text: "What is unusual about the opening sentence of the display?",
        options: [
          "It admits the acquisitions would not be accepted today, once and plainly.",
          "It apologizes repeatedly throughout.",
          "It is printed in much larger type.",
        ],
        answer: 0,
        explain: "Aynı punto, bir kez söyleniyor ve sonra tekrarlanmıyor.",
      },
      {
        text: "Why does the reviewer prefer admission to apology?",
        options: [
          "An apology closes a subject; an admission keeps it open.",
          "Apologies are legally risky.",
          "Visitors do not read apologies.",
        ],
        answer: 0,
        explain: "Eksik kanıtın kabulü konuyu açık tutuyor ve doldurabilecek ziyaretçiyi davet ediyor.",
      },
      {
        kind: "truefalse",
        text: "The exhibition explains how the resolved claims were settled.",
        options: ["True", "False"],
        answer: 1,
        explain: "Nasıl çözüldüğünü ve reddedilen ikisinde ne savunulduğunu söylemiyor.",
      },
      {
        kind: "gapfill",
        text: "Roughly a ___ of the wall texts admit that the record is incomplete.",
        options: [],
        answer: 0,
        accept: ["fifth"],
        explain: "„Roughly a fifth of the wall texts end with a sentence beginning …“",
      },
      {
        kind: "short_answer",
        text: "How many claims have been resolved?",
        options: [],
        answer: 0,
        accept: ["three", "3"],
        explain: "„states that three have been resolved“.",
      },
      {
        text: "What does the reviewer say visitors flee from?",
        options: [
          "the feeling of being managed",
          "difficult subjects",
          "long wall texts",
        ],
        answer: 0,
        explain: "Zorluktan değil, yönetiliyor olma hissinden kaçıyorlar.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-lib-l8",
    course: "en",
    level: "C1",
    skill: "listening",
    title: "Does an Institution Owe an Apology?",
    genre: "opinion",
    intro: "İki konuk tartışıyor: kurumsal özür anlamlı mı, yoksa ucuz bir hamle mi.",
    gloss: [
      { de: "to apologize", tr: "özür dilemek" },
      { de: "successor", tr: "halef" },
      { de: "regret", tr: "pişmanlık" },
      { de: "correlation", tr: "bağıntı" },
      { de: "disclosure", tr: "ifşa" },
      { de: "obligation", tr: "yükümlülük" },
      { de: "entire", tr: "tüm" },
      { de: "precise", tr: "kesin" },
      { de: "institution", tr: "kurum" },
      { de: "individual", tr: "bireysel" },
      { de: "valuable", tr: "değerli" },
      { de: "invent", tr: "icat etmek" },
    ],
    minutes: 10,
    segments: [
      { speaker: "Prof. Adeyemi", text: "An institution is not a person. It cannot feel regret, so an apology from one is always a statement about the future, not the past." },
      { speaker: "Ms Larkin", text: "I'd accept that and draw the opposite conclusion. If it is about the future, then it commits successors, and that is precisely what makes it worth having." },
      { speaker: "Prof. Adeyemi", text: "Only if something follows it. An apology with no obligation attached is the cheapest thing an institution can produce, and it is often produced instead of the expensive thing." },
      { speaker: "Ms Larkin", text: "That's an argument against bad apologies, not against apologies. Had the Whitfield said nothing at all, nobody would be asking about the two refused claims." },
      { speaker: "Prof. Adeyemi", text: "A fair point. Though notice what did the work there: not the apology, but the object-by-object disclosure. That could have been done without a word of regret." },
      { speaker: "Ms Larkin", text: "It could. In practice institutions that disclose tend also to apologize, and those that refuse to apologize rarely disclose. The two travel together." },
      { speaker: "Prof. Adeyemi", text: "Correlation, and I suspect the causation runs the other way: the ones willing to disclose are already the ones under pressure." },
      { speaker: "Ms Larkin", text: "Then we agree on the test, at least. Ask what the institution does differently the following year. If the answer is nothing, the apology was decoration." },
      { speaker: "Prof. Adeyemi", text: "On that we agree entirely, and it is a better standard than either of us started with." },
    ],
    questions: [
      {
        text: "What is Prof. Adeyemi's opening argument?",
        options: [
          "An institution cannot feel regret, so an apology is about the future.",
          "Apologies are always insincere.",
          "Only individuals should apologize.",
        ],
        answer: 0,
        explain: "Kurum bir kişi değil; pişmanlık duyamaz.",
      },
      {
        text: "How does Ms Larkin use the same premise?",
        options: [
          "She says committing successors is what makes it valuable.",
          "She rejects the premise entirely.",
          "She says the past matters more.",
        ],
        answer: 0,
        explain: "Gelecekle ilgiliyse halefleri bağlar ve değeri buradadır.",
      },
      {
        kind: "truefalse",
        text: "Prof. Adeyemi accepts that the apology did the work at the Whitfield.",
        options: ["True", "False"],
        answer: 1,
        explain: "İşi yapanın özür değil, nesne nesne açıklama olduğunu söylüyor.",
      },
      {
        kind: "gapfill",
        text: "Ms Larkin says disclosure and apology tend to ___ together.",
        options: [],
        answer: 0,
        accept: ["travel"],
        explain: "„The two travel together.“",
      },
      {
        kind: "short_answer",
        text: "What test do they finally agree on?",
        options: [],
        answer: 0,
        accept: [
          "what the institution does differently",
          "what changes the following year",
          "what is done differently next year",
          "what the institution does differently the following year",
        ],
        explain: "Cevap „hiçbir şey“ ise özür süsmüş.",
      },
      {
        text: "What does Prof. Adeyemi suspect about the correlation?",
        options: [
          "Institutions that disclose are already under pressure.",
          "Disclosure causes apology.",
          "The correlation is invented.",
        ],
        answer: 0,
        explain: "Nedenselliğin ters yönde işlediğini düşünüyor.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-lib-w8",
    course: "en",
    level: "C1",
    skill: "writing",
    title: "A Contribution on Institutional Statements",
    genre: "forum",
    intro: "Bir uzmanlık forumuna yazıyorsun: önce iki cümle kur, sonra kayıt farkını da gözeten bir katkı yaz.",
    gloss: [
      { de: "statement", tr: "bildiri" },
      { de: "to commit", tr: "bağlamak" },
      { de: "wording", tr: "ifade biçimi" },
      { de: "credibility", tr: "inandırıcılık" },
      { de: "follow-up", tr: "takip" },
      { de: "appear", tr: "görünmek" },
      { de: "passive", tr: "pasif" },
      { de: "specific", tr: "somut" },
      { de: "institution", tr: "kurum" },
      { de: "fund", tr: "finanse etmek" },
      { de: "anyway", tr: "zaten" },
      { de: "agent", tr: "eylemi yapan" },
      { de: "worthless", tr: "değersiz" },
      { de: "regardless", tr: "-e bakılmaksızın" },
    ],
    minutes: 16,
    tasks: [
      {
        kind: "build",
        tr: "Kurum sözünü tutmazsa bildiri değersizdir.",
        answer: "The statement is worthless if the institution fails to honor its commitment.",
        alternatives: ["If the institution does not honor its commitment, the statement is worthless."],
        hint: "Resmî kayıt: „fails to“ ve „honor a commitment“ Latin kökenli ve ağır; gündelik biçim „doesn't keep its word“ olurdu.",
      },
      {
        kind: "build",
        tr: "Bunu söylemeselerdi kimse sormazdı.",
        answer: "Had they not said it, nobody would have asked.",
        alternatives: ["If they had not said it, nobody would have asked."],
        hint: "Resmî yazıda „if“ düşer ve „had“ öne geçer.",
      },
      {
        kind: "free",
        prompt:
          "Bir uzmanlık forumuna katkı yaz: tartışmaya bağlan, kurumsal bildirilerin işe yaradığı ve yaramadığı durumu ayır, bir ölçüt öner, kendi ölçütünün kötüye kullanılabileceği yeri söyle ve bir soruyla kapat.",
        checklist: [
          "Tartışmaya bağlan ve konumunu söyle",
          "İşe yarayan ile yaramayan durumu ayır",
          "Bir ölçüt öner",
          "Ölçütünün zayıf yanını söyle ve bir soruyla kapat",
        ],
        minWords: 150,
        phrases: [
          { de: "Reading the thread, I think the disagreement is narrower than it looks.", tr: "Başlığı okuyunca anlaşmazlığın göründüğünden dar olduğunu düşünüyorum.", en: "" },
          { de: "A statement does work when …; it does none when …", tr: "Bir bildiri … olduğunda iş görür; … olduğunda hiç görmez", en: "" },
          { de: "The test I'd propose is …", tr: "Önereceğim ölçüt …", en: "" },
          { de: "I can see how that could be gamed: …", tr: "Bunun nasıl suistimal edilebileceğini görüyorum: …", en: "" },
          { de: "What I'm less sure about is whether …", tr: "Daha az emin olduğum şey … olup olmadığı", en: "" },
        ],
        sample:
          "Reading the thread, I think the disagreement is narrower than it looks. " +
          "Nobody here is defending the statement that says only that lessons have been learned. " +
          "A statement does work when it names something specific that was previously not said " +
          "in public and attaches a date to what happens next; it does none when it is written " +
          "in the passive throughout, so that no agent appears anywhere in it. " +
          "That is not a stylistic complaint. An institution that cannot write “we decided” " +
          "is usually one that has not decided. " +
          "The test I'd propose is the twelve-month test: what is done differently in the year " +
          "after the statement that would not have been done anyway? " +
          "Anything that would have happened regardless — a review already scheduled, " +
          "a post already funded — does not count. " +
          "I can see how that could be gamed: an institution could simply schedule nothing in " +
          "advance, then claim everything afterwards as a consequence. " +
          "Had we applied the test to the Whitfield before the display opened, " +
          "we would probably have scored it lower than it deserves. " +
          "What I'm less sure about is whether the test can be applied by anyone outside the " +
          "institution at all. Does anyone here know of a case where it was?",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-c1-lib-s8",
    course: "en",
    level: "C1",
    skill: "speaking",
    title: "Should Institutions Apologize for the Past?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: bir ayrım kur ve kendi ölçütünü sına.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Kurumlar geçmişte olanlar için özür dilemeli mi? Bir ayrım kur, ölçütünü söyle, ölçütünün başarısız olacağı bir durumu kabul et ve kapat.",
      bulletsTr: [
        "Bir ayrım kur ve tanımla",
        "Bir ölçüt öner",
        "Ölçütünün başarısız olacağı durumu kabul et",
        "Kısa bir kapanış yap",
      ],
      targets: [
        { de: "The question is usually asked as if … when in fact …", tr: "Soru genelde … gibi soruluyor, oysa aslında …" },
        { de: "My criterion is not sincerity but …", tr: "Ölçütüm samimiyet değil …" },
        { de: "I can see one case where that criterion fails: …", tr: "Ölçütün başarısız olacağı bir durum görüyorum: …" },
        { de: "Which is why I'd rather be judged on …", tr: "Bu yüzden … üzerinden değerlendirilmeyi tercih ederim" },
      ],
      minSeconds: 60,
      maxSeconds: 100,
      sampleDe:
        "The question is usually asked as if an institution could be sorry, when in fact " +
        "an institution is a set of procedures with a name on the door. " +
        "Whatever the people inside it feel, the statement it issues is a promise about " +
        "next year, not a report on anyone's conscience. " +
        "My criterion is not sincerity but consequence: what does the organization do in the " +
        "twelve months afterwards that it would not have done otherwise? " +
        "Anything already budgeted, already scheduled or already demanded by a regulator " +
        "should be excluded, because it tells you nothing about the statement. " +
        "I can see one case where that criterion fails, and it is not a rare one. " +
        "Some harms cannot be undone by any subsequent action; " +
        "for those, the only thing an institution can offer is an accurate account, " +
        "and my test would score that at zero. " +
        "That is a real weakness, and I would rather state it than pretend the criterion " +
        "covers everything. " +
        "Which is why I'd rather be judged on disclosure than on regret. " +
        "An institution that publishes what it knows, including the parts it cannot explain, " +
        "has done something that cannot be faked in a paragraph.",
      rubricHint:
        "Bir ayrım, ölçüt ve ölçütün başarısız olduğu durumun kabulü beklenir; „as if … when in fact“, „I can see one case where that criterion fails“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-c1-lib-g8",
    course: "en",
    level: "C1",
    skill: "grammar",
    title: "we decided or a decision was made",
    genre: "grammar",
    intro: "Aynı içerik iki ayrı kayıtta yazılabilir; seçim üslup değil, kimin görünüp kimin gizlendiğidir.",
    focus: "Kayıt kaydırma: edilgen, adlaştırma, kısaltmalar ve öbek fiiller",
    gloss: [
      { de: "to postpone", tr: "ertelemek" },
      { de: "to put off", tr: "ertelemek" },
      { de: "consideration", tr: "değerlendirme" },
      { de: "to inform", tr: "bilgilendirmek" },
    ],
    minutes: 12,
    explanation: [
      {
        heading: "Öbek fiil mi, Latin kökenli mi?",
        tr: "İngilizcede çoğu eylemin iki karşılığı vardır: gündelik bir öbek fiil ve resmî bir Latin kökenli fiil. „put off“ ↔ „postpone“, „find out“ ↔ „ascertain“, „go up“ ↔ „increase“, „look into“ ↔ „investigate“. Anlam aynıdır; kayıt değişir. Resmî bir metinde öbek fiil yadırgatır, e-postada Latin kökenli olan soğuk durur.",
        examples: [
          { de: "We put the meeting off until June.", tr: "Toplantıyı hazirana erteledik.", note: "gündelik" },
          { de: "The meeting was postponed until June.", tr: "Toplantı hazirana ertelendi.", note: "resmî" },
          { de: "We'll look into it and let you know.", tr: "Bakıp size haber veririz.", note: "gündelik: look into" },
        ],
      },
      {
        heading: "Edilgen ve adlaştırma: eyleyeni gizlemek",
        tr: "Resmî kayıt üç araçla eyleyeni siler: edilgen („a decision was made“), adlaştırma („after consideration of the request“) ve „it“ ile başlayan yapılar („it was felt that“). Bunlar dil bilgisi açısından kusursuzdur ve tam da bu yüzden tehlikelidir: kimin karar verdiğini yazmadan bir kararı bildirirler.",
        examples: [
          { de: "A decision was made to postpone the project.", tr: "Projenin ertelenmesine karar verildi.", note: "eyleyen yok" },
          { de: "We decided to postpone the project.", tr: "Projeyi ertelemeye karar verdik.", note: "eyleyen var" },
          { de: "It was felt that further consultation was needed.", tr: "Daha fazla görüşmeye ihtiyaç duyulduğu düşünüldü.", note: "kim hissetti?" },
        ],
      },
      {
        heading: "Kısaltmalar ve doğrudanlık",
        tr: "Kısaltmalar („we'll“, „don't“, „it's“) gündelik kayda aittir ve resmî yazıda açılır. Aynı şekilde „get“ fiili, soru etiketleri ve cümle başındaki „And“/„But“ resmî metinde seyrekleşir. Bunlar kural değil BEKLENTİDİR: bilinçli olarak kırıldığında etki yaratır, farkında olmadan kırıldığında acemilik okunur.",
        examples: [
          { de: "We'll inform you as soon as we know.", tr: "Öğrenir öğrenmez haber veririz.", note: "kısaltma: gündelik" },
          { de: "You will be informed in due course.", tr: "Zamanı gelince bilgilendirileceksiniz.", note: "resmî" },
          { de: "Applicants are advised to apply early.", tr: "Adaylara erken başvurmaları önerilir.", note: "kurumsal kalıp" },
        ],
      },
    ],
    questions: [
      {
        text: "Which is the formal equivalent of “put off”?",
        options: ["postpone", "put away", "put up with"],
        answer: 0,
        explain: "„postpone“ aynı anlamı resmî kayıtta verir.",
      },
      {
        text: "Which sentence hides the agent?",
        options: [
          "We decided to postpone the project.",
          "A decision was made to postpone the project.",
          "The board decided to postpone the project.",
        ],
        answer: 1,
        explain: "Edilgen yapı kararı bildirip karar vereni gizler.",
      },
      {
        text: "“It was felt that further consultation was needed.” — What is missing?",
        options: ["the verb", "the agent", "the object"],
        answer: 1,
        explain: "Kimin hissettiği söylenmiyor.",
      },
      {
        kind: "gapfill",
        text: "The meeting was ___ until June. (put off → formal)",
        options: [],
        answer: 0,
        accept: ["postponed"],
        explain: "Resmî kayıtta öbek fiil yerine Latin kökenli fiil gelir.",
      },
      {
        kind: "gapfill",
        text: "We'll look ___ it and let you know. (araştırmak)",
        options: [],
        answer: 0,
        accept: ["into"],
        explain: "„look into“ = „investigate“ın gündelik karşılığı.",
      },
      {
        kind: "gapfill",
        text: "You will be ___ in due course. (inform)",
        options: [],
        answer: 0,
        accept: ["informed"],
        explain: "Kurumsal kayıtta edilgen ve kısaltmasız biçim gelir.",
      },
      {
        kind: "gapfill",
        text: "After ___ of the request, the panel refused it. (consider → noun)",
        options: [],
        answer: 0,
        accept: ["consideration"],
        explain: "Adlaştırma resmî kaydın taşıyıcısıdır.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Applicants", "are advised", "to apply", "early"],
        explain: "Kurumsal kalıp: edilgen + „to + mastar“.",
      },
      {
        kind: "truefalse",
        text: "“A decision was made” ile “We decided” aynı bilgiyi verir.",
        options: ["True", "False"],
        answer: 1,
        explain: "İkincisi kararı verenin kim olduğunu da söyler.",
      },
      {
        kind: "truefalse",
        text: "“We'll inform you as soon as we know.” — Bu cümle gündelik kayıttadır.",
        options: ["True", "False"],
        answer: 0,
        explain: "Kısaltma (we'll) ve doğrudan „we … you“ hitabıyla gündelik bir tondadır.",
      },
    ],
  },
];
