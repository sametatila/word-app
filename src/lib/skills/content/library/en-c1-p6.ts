import type { SkillExercise } from "../../types";

/**
 * EN · C1 — Beceriler kütüphanesi, parti 6.
 *
 * Kurallar ve emsal: `en-c1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 6 kamusal tartışma hattı: anonimlik üzerine bir forum, moderasyon
 * toplantısı, editöre mektup. Dil bilgisi eksilti ve yerine geçme —
 * İngilizce metnin tekrar etmeden bağ kurma biçimi.
 */
export const enC1P6: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-lib-r6",
    course: "en",
    level: "C1",
    skill: "reading",
    title: "Forum: Would Real Names Fix Anything?",
    genre: "forum",
    intro: "Uzun bir forum tartışması: gerçek ad zorunluluğu tartışmayı düzeltir mi, kimi susturur.",
    gloss: [
      { de: "anonymity", tr: "anonimlik" },
      { de: "abuse", tr: "taciz" },
      { de: "verification", tr: "kimlik doğrulama" },
      { de: "cruelty", tr: "zalimlik" },
      { de: "moderation", tr: "denetim" },
      { de: "to moderate", tr: "denetlemek" },
      { de: "genuine", tr: "hakiki" },
      { de: "entire", tr: "tüm" },
      { de: "fund", tr: "finanse etmek" },
      { de: "attractive", tr: "çekici" },
      { de: "theory", tr: "teori" },
      { de: "relationship", tr: "ilişki" },
      { de: "eventually", tr: "en sonunda" },
      { de: "intuitive", tr: "sezgisel" },
      { de: "identity", tr: "kimlik" },
      { de: "eliminate", tr: "ortadan kaldırmak" },
      { de: "merge", tr: "birleşmek" },
      { de: "hypothetical", tr: "varsayımsal" },
      { de: "durable", tr: "dayanıklı" },
      { de: "powerful", tr: "kuvvetli" },
    ],
    minutes: 10,
    text:
      "Topic: Would real names fix anything?\n\n" +
      "h_bergstrom: The argument for real names is intuitive and, as far as I can tell, " +
      "unsupported. Platforms that require identity verification report roughly the same " +
      "rate of abuse as those that don't. If anonymity were the cause, we would expect " +
      "a clear difference, and there isn't one.\n\n" +
      "ravensworth: I don't think anyone claims it eliminates abuse. The claim is weaker: " +
      "that it changes who does it. A named account makes a certain kind of casual cruelty " +
      "less attractive, even if it does nothing about the people who are genuinely committed " +
      "to it. That seems worth something.\n\n" +
      "h_bergstrom: It might be, but so is the cost, and the cost falls on a different group " +
      "entirely. The accounts that need anonymity most are the ones with the least power: " +
      "people reporting a workplace, people in the early stages of leaving a relationship, " +
      "anyone whose opinion is legal but dangerous where they live.\n\n" +
      "ravensworth: Granted. Which is why I'd separate the two things people keep merging. " +
      "Anonymity to the public is one question; anonymity to the platform is another. " +
      "You can have the first without the second, and most serious proposals do.\n\n" +
      "m_okafor: You can in theory. In practice, a platform that holds identity data will " +
      "eventually be asked for it by a government, and the ones asking are rarely the " +
      "governments you had in mind when you designed the policy. " +
      "That isn't a hypothetical; it has happened repeatedly.\n\n" +
      "ravensworth: That's the strongest objection anyone has made here, and I don't have " +
      "a good answer to it. I'd still rather have verification with a legal shield than " +
      "moderation alone, but I accept the shield is only as durable as the government " +
      "that wrote it.\n\n" +
      "h_bergstrom: Which brings us back to moderation, which is unglamorous, expensive and " +
      "the only thing anyone has shown to work. Nobody wants to fund it, so we keep " +
      "proposing identity instead.",
    questions: [
      {
        text: "What does h_bergstrom say about platforms requiring identity?",
        options: [
          "They report roughly the same rate of abuse.",
          "They report much less abuse.",
          "They refuse to publish figures.",
        ],
        answer: 0,
        explain: "Anonimlik sebep olsaydı net bir fark beklenirdi; yok.",
      },
      {
        text: "How does ravensworth weaken the claim?",
        options: [
          "It changes who commits abuse, not whether it happens.",
          "It only works on small platforms.",
          "It is about speed rather than identity.",
        ],
        answer: 0,
        explain: "Adı görünen hesapta gelişigüzel zalimlik daha az çekici hâle geliyor.",
      },
      {
        kind: "truefalse",
        text: "ravensworth accepts that m_okafor's objection is strong.",
        options: ["True", "False"],
        answer: 0,
        explain: "„That's the strongest objection anyone has made here, and I don't have a good answer to it.“",
      },
      {
        kind: "gapfill",
        text: "ravensworth separates anonymity to the public from anonymity to the ___.",
        options: [],
        answer: 0,
        accept: ["platform"],
        explain: "„Anonymity to the public is one question; anonymity to the platform is another.“",
      },
      {
        kind: "short_answer",
        text: "Which groups does h_bergstrom say need anonymity most?",
        options: [],
        answer: 0,
        accept: [
          "those with the least power",
          "people with least power",
          "the least powerful",
        ],
        explain: "İşyerini bildirenler, bir ilişkiden ayrılmakta olanlar, görüşü yasal ama tehlikeli olanlar.",
      },
      {
        text: "What does the thread conclude about moderation?",
        options: [
          "It works but nobody wants to fund it.",
          "It has never been tried.",
          "It is cheaper than verification.",
        ],
        answer: 0,
        explain: "„unglamorous, expensive and the only thing anyone has shown to work“.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-lib-l6",
    course: "en",
    level: "C1",
    skill: "listening",
    title: "The Rule We Cannot Enforce",
    genre: "dialogue",
    intro: "İki moderatör bir kuralı konuşuyor: yazıldığı gibi uygulanamıyorsa değiştirmeli mi, kaldırmalı mı.",
    gloss: [
      { de: "to enforce", tr: "uygulatmak" },
      { de: "inconsistent", tr: "tutarsız" },
      { de: "backlog", tr: "birikmiş iş" },
      { de: "to report", tr: "bildirmek" },
      { de: "standard", tr: "ölçüt" },
      { de: "to narrow", tr: "daraltmak" },
      { de: "individual", tr: "bireysel" },
      { de: "hire", tr: "işe almak" },
      { de: "concern", tr: "kaygı" },
      { de: "entire", tr: "tüm" },
      { de: "pointless", tr: "anlamsız" },
      { de: "judgments", tr: "karar" },
    ],
    minutes: 10,
    segments: [
      { speaker: "Ms Halloran", text: "We've had the personal-attack rule for two years. Last month we acted on nineteen reports out of two hundred and forty." },
      { speaker: "Mr Devlin", text: "Which tells us about the backlog, not about the rule. Given three more moderators we'd act on all of them." },
      { speaker: "Ms Halloran", text: "We won't be given three more, and a rule enforced eight percent of the time is worse than none. People learn that reporting does nothing." },
      { speaker: "Mr Devlin", text: "They learn that faster if we delete the rule. At least now there's a standard, even if we apply it unevenly." },
      { speaker: "Ms Halloran", text: "An unevenly applied standard is exactly what people complain about, though. Not that we're strict — that we're inconsistent." },
      { speaker: "Mr Devlin", text: "So narrow it. Keep the rule for named individuals and drop it for groups, which is where most of the two hundred and forty sit and where the judgments are hardest." },
      { speaker: "Ms Halloran", text: "That I could defend publicly. What I couldn't defend is quietly doing the same thing without saying so, which is roughly where we are." },
      { speaker: "Mr Devlin", text: "Agreed. If we're going to water it down, we should write down that we have, and why." },
      { speaker: "Ms Halloran", text: "And set a date to look at it again. Otherwise the narrow version becomes permanent by accident, as the last one did." },
    ],
    questions: [
      {
        text: "What is Ms Halloran's main concern?",
        options: [
          "A rule enforced eight percent of the time teaches people that reporting is pointless.",
          "The rule is too strict.",
          "Moderators are not trained.",
        ],
        answer: 0,
        explain: "240 bildirimin 19'una işlem yapılmış.",
      },
      {
        text: "What does Mr Devlin propose?",
        options: [
          "narrowing the rule to named individuals",
          "deleting the rule entirely",
          "hiring three more moderators",
        ],
        answer: 0,
        explain: "Gruplar için bırakmayı öneriyor; en zor yargılar orada.",
      },
      {
        kind: "truefalse",
        text: "Ms Halloran could defend narrowing the rule publicly.",
        options: ["True", "False"],
        answer: 0,
        explain: "„That I could defend publicly.“ — savunamayacağı şey sessizce aynısını yapmak.",
      },
      {
        kind: "gapfill",
        text: "They acted on nineteen reports out of ___ hundred and forty.",
        options: [],
        answer: 0,
        accept: ["two", "2"],
        explain: "„nineteen reports out of two hundred and forty“.",
      },
      {
        kind: "short_answer",
        text: "What does Ms Halloran want to set at the end?",
        options: [],
        answer: 0,
        accept: ["a date to review it", "a review date", "a date to look at it again", "a date"],
        explain: "Yoksa dar sürüm kazara kalıcı olur.",
      },
      {
        text: "What do people complain about, according to Ms Halloran?",
        options: ["inconsistency", "strictness", "slow replies"],
        answer: 0,
        explain: "„Not that we're strict — that we're inconsistent.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-lib-w6",
    course: "en",
    level: "C1",
    skill: "writing",
    title: "Letter to the Moderation Team",
    genre: "letter",
    intro: "Bir platformun moderasyon ekibine yazıyorsun: önce iki cümle kur, sonra gerekçeli ve ölçülü bir mektup yaz.",
    gloss: [
      { de: "transparency", tr: "şeffaflık" },
      { de: "appeal", tr: "itiraz başvurusu" },
      { de: "criterion", tr: "ölçüt" },
      { de: "to publish", tr: "yayımlamak" },
      { de: "proportionate", tr: "orantılı" },
      { de: "individual", tr: "bireysel" },
      { de: "log", tr: "kaydetmek" },
      { de: "substance", tr: "esas" },
      { de: "procedural", tr: "usule ilişkin" },
    ],
    minutes: 16,
    tasks: [
      {
        kind: "build",
        tr: "Kuralı sevmiyorum, ekibin çoğu da sevmiyor.",
        answer: "I don't like the rule, and neither do most of the team.",
        alternatives: ["I don't like the rule, and nor do most of the team."],
        hint: "Olumsuz bir ifadeyi tekrar etmeden onaylamak: neither/nor + yardımcı fiil + özne.",
      },
      {
        kind: "build",
        tr: "Önceki ekip bunu yapmıştı, bu ekip de yapmalı.",
        answer: "The previous team did so, and this one should too.",
        alternatives: ["The previous team did so, and this team should as well."],
        hint: "„do so“ önceki fiil öbeğinin yerine geçer; „one“ ismin yerine geçer.",
      },
      {
        kind: "free",
        prompt:
          "Moderasyon ekibine bir mektup yaz: hangi karara ilişkin yazdığını söyle, kararın kendisine değil usule odaklan, kabul ettiğin noktayı adlandır, iki somut talep sun ve gerçekçi biçimde kapat.",
        checklist: [
          "Hangi karara ilişkin yazdığını yaz",
          "Usule odaklan, kararın içeriğini tartışma",
          "Kabul ettiğin noktayı adlandır",
          "İki somut talep sun ve gerçekçi kapat",
        ],
        minWords: 150,
        phrases: [
          { de: "I am writing about the decision of … rather than about its outcome.", tr: "… tarihli kararın sonucu hakkında değil kendisi hakkında yazıyorum", en: "" },
          { de: "I accept that …", tr: "Şunu kabul ediyorum: …", en: "" },
          { de: "My concern is procedural: …", tr: "Endişem usule ilişkin: …", en: "" },
          { de: "I would ask for two things.", tr: "İki şey rica ediyorum.", en: "" },
          { de: "I recognize that resources are limited, but …", tr: "Kaynakların sınırlı olduğunu biliyorum ama …", en: "" },
        ],
        sample:
          "Dear Moderation Team, I am writing about the decision of 4 March to remove my post " +
          "rather than about its outcome. I am not asking you to restore it. " +
          "I accept that the post named an individual and that your published rule covers " +
          "exactly that; on the substance you were within your own guidelines, and I would " +
          "have removed it too. " +
          "My concern is procedural. The notice I received gave no reason beyond a rule number, " +
          "the appeal form asked me to explain why the decision was wrong without telling me " +
          "which part of the post had triggered it, and the appeal was closed in under four " +
          "minutes, which suggests nobody read it. " +
          "Two of those three are cheap to fix. " +
          "I would ask for two things. First, that removal notices quote the sentence that " +
          "broke the rule, as the previous version of your system did. " +
          "Second, that appeals closed within five minutes are logged separately and reviewed " +
          "monthly, so that you can see the scale of it yourselves. " +
          "I recognize that resources are limited and that most of your work is invisible and " +
          "thankless. Neither of these requests asks you to moderate more; " +
          "they ask you to show what you already decided. " +
          "Yours sincerely, H. Bergstrom",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-c1-lib-s6",
    course: "en",
    level: "C1",
    skill: "speaking",
    title: "Is Anonymity Good for Public Debate?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: bir ayrım kur ve kendi konumunun bedelini kabul et.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Kamusal tartışmada anonimlik yarar mı zarar mı? Bir ayrım kur, ayrımı iki örnekle sına, kendi konumunun bedelini kabul et ve bir tasarım önerisiyle kapat.",
      bulletsTr: [
        "Bir ayrım kur ve tanımla",
        "İki örnekle sına",
        "Kendi konumunun bedelini kabul et",
        "Bir tasarım önerisiyle kapat",
      ],
      targets: [
        { de: "The distinction I'd draw is between … and …", tr: "Kuracağım ayrım … ile … arasında" },
        { de: "Tested against two cases, it holds up reasonably well.", tr: "İki duruma karşı sınandığında makul biçimde ayakta kalıyor." },
        { de: "The honest cost of my position is that …", tr: "Konumumun dürüst bedeli şu: …" },
        { de: "What I'd actually build is …", tr: "Gerçekten kuracağım şey …" },
      ],
      minSeconds: 60,
      maxSeconds: 100,
      sampleDe:
        "The distinction I'd draw is between anonymity from the public and anonymity from the " +
        "institution that hosts the conversation. " +
        "Almost every argument I hear collapses the two, and once they are separated most of " +
        "the disagreement goes with them. " +
        "Tested against two cases, it holds up reasonably well. " +
        "Someone describing conditions at the place they work needs the first absolutely " +
        "and can usually live without the second; " +
        "someone sending threats needs the second and has no claim to either. " +
        "The honest cost of my position is that it depends on institutions keeping data they " +
        "will one day be asked to hand over, and the asking will not always come from a " +
        "government anyone here would recognize as reasonable. " +
        "I don't have a technical answer to that, and I distrust people who say they do. " +
        "What I'd actually build is narrower than the debate usually allows: " +
        "no verification at sign-up, verification only when an account is repeatedly reported, " +
        "deletion of that data on a fixed schedule, and a published count of how often it was " +
        "demanded and by whom. " +
        "None of that prevents abuse. It does make the trade visible, which is more than " +
        "either of the loud positions offers.",
      rubricHint:
        "Bir ayrım, iki sınama ve konumun bedelinin kabulü beklenir; „the distinction I'd draw“, „the honest cost of my position“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-c1-lib-g6",
    course: "en",
    level: "C1",
    skill: "grammar",
    title: "so do I, neither does he, do so",
    genre: "grammar",
    intro: "İngilizce yazı tekrardan kaçınmak için sözcükleri düşürür ya da yerine kısa bir biçim koyar; bunu okumak da yazmak da C1 işidir.",
    focus: "Eksilti ve yerine geçme: so/neither, do so, one/ones, auxiliary stripping",
    gloss: [
      { de: "to agree", tr: "katılmak" },
      { de: "proposal", tr: "öneri" },
      { de: "version", tr: "sürüm" },
      { de: "to object", tr: "itiraz etmek" },
    ],
    minutes: 12,
    explanation: [
      {
        heading: "so ve neither: onaylama kısayolları",
        tr: "Olumlu bir ifadeye katılmak için „so + yardımcı fiil + özne“ kullanılır: „I agree.“ — „So do I.“ Olumsuz bir ifade için „neither“ ya da „nor“ gelir ve cümlenin kendisi olumlu kurulur: „I don't agree.“ — „Neither do I.“ Yardımcı fiil, önceki cümledeki zamanı taşır.",
        examples: [
          { de: "She objected, and so did the others.", tr: "O itiraz etti, diğerleri de.", note: "so + did + özne" },
          { de: "I don't like it, and neither does he.", tr: "Ben sevmiyorum, o da sevmiyor.", note: "neither + does" },
          { de: "They haven't replied, nor have we.", tr: "Onlar cevap vermedi, biz de vermedik.", note: "nor + have" },
        ],
      },
      {
        heading: "do so ve do it: fiil öbeğinin yerine",
        tr: "„do so“ önceki FİİL ÖBEĞİNİN tamamının yerine geçer ve resmî yazıda sık kullanılır: „The previous team published the figures; this one should do so as well.“ Konuşma dilinde „do it“ ya da yalnız yardımcı fiil tercih edilir. Ayrıca yardımcı fiil tek başına da kalabilir: „I haven't read it, but she has.“",
        examples: [
          { de: "The previous team did so without complaint.", tr: "Önceki ekip bunu şikâyet etmeden yaptı.", note: "do so: fiil öbeği" },
          { de: "I haven't read the report, but she has.", tr: "Raporu okumadım ama o okudu.", note: "yalnız yardımcı" },
          { de: "He said he would object, and he did.", tr: "İtiraz edeceğini söyledi ve etti.", note: "did: tek başına" },
        ],
      },
      {
        heading: "one/ones ve düşen isim",
        tr: "Tekrar eden sayılabilir bir ismin yerine „one“ (tekil) ve „ones“ (çoğul) gelir: „the narrow version“ → „the narrow one“. Sayılamayan isimlerde bu yapılmaz; isim düşer ve yalnız sıfat kalır: „I prefer strong coffee to weak.“ Belirleyiciden sonra isim de düşebilir: „both“, „neither“, „the former“.",
        examples: [
          { de: "The new proposal is better than the old one.", tr: "Yeni öneri eskisinden iyi.", note: "one: tekil isim" },
          { de: "I've read both versions; neither convinced me.", tr: "İki sürümü de okudum; hiçbiri ikna etmedi.", note: "neither: isim düştü" },
          { de: "She prefers strong coffee to weak.", tr: "Koyu kahveyi açığa tercih ediyor.", note: "sayılamaz: one yok" },
        ],
      },
    ],
    questions: [
      {
        text: "“I don't agree.” — “___ do I.”",
        options: ["So", "Neither", "Nor do"],
        answer: 1,
        explain: "Olumsuz bir ifadeye katılma „neither“ ile kurulur.",
      },
      {
        text: "She objected, and ___ the others.",
        options: ["so did", "so were", "neither did"],
        answer: 0,
        explain: "Olumlu ifade ve past simple: so did.",
      },
      {
        text: "The new proposal is better than the old ___.",
        options: ["one", "ones", "it"],
        answer: 0,
        explain: "Tekil sayılabilir ismin yerine „one“ gelir.",
      },
      {
        kind: "gapfill",
        text: "They haven't replied, ___ have we.",
        options: [],
        answer: 0,
        accept: ["nor", "neither"],
        explain: "„nor“ ve „neither“ ikisi de kullanılabilir ve yardımcı fiil öne geçer.",
      },
      {
        kind: "gapfill",
        text: "I haven't read the report, but she ___.",
        options: [],
        answer: 0,
        accept: ["has"],
        explain: "Fiil öbeği düşer, yardımcı fiil kalır.",
      },
      {
        kind: "gapfill",
        text: "The previous team published the figures; this one should do ___.",
        options: [],
        answer: 0,
        accept: ["so"],
        explain: "„do so“ resmî yazıda fiil öbeğinin yerine geçer.",
      },
      {
        kind: "gapfill",
        text: "I've read both versions; ___ convinced me. (not one of the two)",
        options: [],
        answer: 0,
        accept: ["neither"],
        explain: "Belirleyiciden sonra isim düşebilir.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["He", "said", "he would object", "and he did"],
        explain: "Son parçada yardımcı fiil tek başına kalır.",
      },
      {
        kind: "truefalse",
        text: "“I don't like it, and neither do I.” — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "Aynı özne iki kez geçemez; ikinci özne farklı olmalı: „neither does he“.",
      },
      {
        kind: "truefalse",
        text: "“She prefers strong coffee to weak.” — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Sayılamayan isimde „one“ kullanılmaz; isim düşer.",
      },
    ],
  },
];
