import type { SkillExercise } from "../../types";

/**
 * EN · B2 — Beceriler kütüphanesi, parti 9.
 *
 * Kurallar ve emsal: `en-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 9 uzaktan çalışma hattı: forum tartışması, sesli deneme, forum
 * katkısı. Dil bilgisi zaman ve amaç bağlaçları.
 */
export const enB2P9: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-lib-r9",
    course: "en",
    level: "B2",
    skill: "reading",
    title: "Forum: Three Days In, Two Days Out",
    genre: "forum",
    intro: "Bir forumda dört kişi hibrit çalışmayı tartışıyor: kural mı gerek, esneklik mi.",
    gloss: [
      { de: "attendance", tr: "devam" },
      { de: "junior", tr: "yeni çalışan" },
      { de: "commute", tr: "yol" },
      { de: "mandate", tr: "zorunluluk" },
      { de: "to overlap", tr: "çakışmak" },
      { de: "reliable", tr: "güvenilir" },
    ],
    minutes: 8,
    text:
      "Topic: Three days in, two days out — does it work?\n\n" +
      "jw_taylor: We've had the three-day mandate since January and the honest answer is that " +
      "nothing improved. The office is full on Tuesday and Wednesday and empty on Friday, " +
      "so most people are in the building on the same days they were before, " +
      "just with a longer commute on two extra days.\n\n" +
      "s.marchetti: That's the whole problem with counting days. What matters is overlap, " +
      "not attendance. My team agreed two fixed afternoons together and nobody checks the rest. " +
      "As soon as we did that, the meetings that used to spread over the week collapsed " +
      "into those two afternoons.\n\n" +
      "jw_taylor: Would that survive a manager who didn't trust you?\n\n" +
      "s.marchetti: Probably not, and I'd rather say that than pretend it's a policy. " +
      "It works because my manager measures output. In a team where somebody counts " +
      "the days, the same agreement becomes a rule and then it stops working.\n\n" +
      "D_Novak: I'll say the unpopular thing. Junior staff lose from flexibility. " +
      "I learned this job by hearing the conversation at the next desk, and you cannot " +
      "replace that with a meeting invitation. " +
      "Before we decide anything, somebody should ask who is actually in the building " +
      "on a given Tuesday.\n\n" +
      "s.marchetti: That's fair, and it's the best argument for fixed overlap rather than " +
      "fixed days. Juniors don't need everyone there. They need the same three people " +
      "there at the same time, reliably, so that asking a question doesn't take planning.\n\n" +
      "priya_l: Until managers accept that, every policy will be about buildings " +
      "instead of about learning, because buildings are easy to count.",
    questions: [
      {
        text: "What is jw_taylor's main complaint?",
        options: [
          "People are in on the same days as before but commute more.",
          "The office is too small.",
          "Nobody comes in at all.",
        ],
        answer: 0,
        explain: "Salı ve çarşamba dolu, cuma boş; iki fazladan yol eklenmiş.",
      },
      {
        text: "What does s.marchetti say matters?",
        options: ["attendance", "overlap", "the number of meetings"],
        answer: 1,
        explain: "„What matters is overlap, not attendance.“",
      },
      {
        kind: "truefalse",
        text: "s.marchetti claims the agreement would work under any manager.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Probably not, and I'd rather say that than pretend it's a policy.“",
      },
      {
        kind: "gapfill",
        text: "s.marchetti's team agreed ___ fixed afternoons together.",
        options: [],
        answer: 0,
        accept: ["two", "2"],
        explain: "„My team agreed two fixed afternoons together“.",
      },
      {
        kind: "short_answer",
        text: "How does D_Novak say he learned the job?",
        options: [],
        answer: 0,
        accept: [
          "by hearing conversations nearby",
          "by hearing the next desk",
          "listening at the next desk",
        ],
        explain: "„by hearing the conversation at the next desk“.",
      },
      {
        text: "What does priya_l say at the end?",
        options: [
          "Policies focus on buildings because buildings are easy to count.",
          "Managers should visit more often.",
          "Junior staff should work from home.",
        ],
        answer: 0,
        explain: "Binalar sayılabildiği için politikalar öğrenme yerine binayı konuşuyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-lib-l9",
    course: "en",
    level: "B2",
    skill: "listening",
    title: "The Conversation You Overhear",
    genre: "essay",
    intro: "Sesli bir deneme: iş yerinde öğrenmenin görünmeyen yanı ve uzaktan çalışmanın sessiz bedeli.",
    gloss: [
      { de: "to overhear", tr: "kulak misafiri olmak" },
      { de: "informal", tr: "gayriresmî" },
      { de: "apprentice", tr: "çırak" },
      { de: "to schedule", tr: "planlamak" },
      { de: "corridor", tr: "koridor" },
      { de: "deliberate", tr: "bilinçli" },
      { de: "entire", tr: "tüm" },
      { de: "definition", tr: "tanım" },
      { de: "profession", tr: "meslek" },
    ],
    minutes: 8,
    segments: [
      { text: "Almost everything I know about my first profession, I learned by accident, in the twenty seconds after a meeting ended." },
      { text: "Somebody would turn to somebody else and say the thing they had not said in the room, and I would be standing there." },
      { text: "This kind of learning has a name in the research — informal learning — and estimates suggest it accounts for most of what people learn at work." },
      { text: "It is also, by definition, the part that cannot be scheduled. You can invite people to a training session. You cannot invite them to overhear something." },
      { text: "Remote work does not remove this entirely, but it changes who gets it. A senior colleague loses very little; they already know what the corridor would have told them." },
      { text: "An apprentice loses almost all of it, because everything they would have absorbed now has to be requested, and requesting it requires knowing that it exists." },
      { text: "The usual answer is to bring everyone back for three days, which is expensive and, as far as I can tell, ineffective." },
      { text: "The alternative is duller and probably better: make the informal deliberate. Say out loud why a decision went the way it did, in front of the people who did not ask." },
    ],
    questions: [
      {
        text: "Where did the speaker learn most about their first profession?",
        options: [
          "in the seconds after meetings",
          "in training sessions",
          "from written handbooks",
        ],
        answer: 0,
        explain: "„in the twenty seconds after a meeting ended“.",
      },
      {
        text: "Why can informal learning not be scheduled?",
        options: [
          "It costs too much.",
          "You cannot invite someone to overhear something.",
          "Managers do not allow it.",
        ],
        answer: 1,
        explain: "Tanımı gereği programlanamaz.",
      },
      {
        kind: "truefalse",
        text: "According to the speaker, an apprentice loses far more than a senior colleague.",
        options: ["True", "False"],
        answer: 0,
        explain: "Kıdemli çok az kaybediyor; çırak neredeyse hepsini kaybediyor.",
      },
      {
        kind: "gapfill",
        text: "The learning happened in the twenty ___ after a meeting.",
        options: [],
        answer: 0,
        accept: ["seconds"],
        explain: "„in the twenty seconds after a meeting ended“.",
      },
      {
        kind: "short_answer",
        text: "What alternative does the speaker prefer?",
        options: [],
        answer: 0,
        accept: [
          "make the informal deliberate",
          "making the informal deliberate",
          "say decisions out loud",
          "explain decisions openly",
        ],
        explain: "Kararın neden öyle verildiğini, sormayanların önünde yüksek sesle söylemek.",
      },
      {
        text: "What does the speaker say about bringing everyone back for three days?",
        options: [
          "It is expensive and seems ineffective.",
          "It is the only working solution.",
          "It helps senior staff most.",
        ],
        answer: 0,
        explain: "„expensive and, as far as I can tell, ineffective“.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-lib-w9",
    course: "en",
    level: "B2",
    skill: "writing",
    title: "A Contribution to the Thread",
    genre: "forum",
    intro: "Foruma katkı yazıyorsun: önce iki cümle kur, sonra tartışmayı ilerleten bir ayrım getir.",
    gloss: [
      { de: "distinction", tr: "ayrım" },
      { de: "to concede", tr: "kabul etmek" },
      { de: "practical", tr: "uygulanabilir" },
      { de: "assumption", tr: "varsayım" },
      { de: "trade-off", tr: "ödünleşim" },
      { de: "appear", tr: "görünmek" },
      { de: "pick", tr: "seçmek" },
      { de: "mandate", tr: "zorunluluk" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Sabit öğleden sonralarda anlaşır anlaşmaz toplantılar kısaldı.",
        answer: "As soon as we agreed on fixed afternoons, the meetings got shorter.",
        alternatives: ["The meetings got shorter as soon as we agreed on fixed afternoons."],
        hint: "„as soon as“ arkasından geçmiş zaman gelir; gelecek için present kullanılır.",
      },
      {
        kind: "build",
        tr: "Kural koyduk ki yeni gelenler soru sormak için plan yapmasın.",
        answer: "We made a rule so that new staff don't have to plan in order to ask a question.",
        alternatives: ["We made a rule so that new staff wouldn't have to plan to ask a question."],
        hint: "„so that“ amaç bildirir ve arkasından özne + fiil gelir; „in order to“ ise mastar alır.",
      },
      {
        kind: "free",
        prompt:
          "Bir forum tartışmasına katkı yaz: hangi konumlara yanıt verdiğini söyle, tartışmayı ilerleten bir ayrım getir, ayrımı bir örnekle göster, bir noktada hak ver ve uygulanabilir bir öneri bırak.",
        checklist: [
          "Hangi konumlara yanıt verdiğini yaz",
          "Bir ayrım getir ve tanımla",
          "Bir örnekle göster",
          "Hak ver ve uygulanabilir bir öneri bırak",
        ],
        minWords: 120,
        phrases: [
          { de: "Reading this back, I think two different questions are mixed up here.", tr: "Baştan okuyunca burada iki ayrı sorunun karıştığını düşünüyorum.", en: "" },
          { de: "The useful distinction is between … and …", tr: "İşe yarar ayrım … ile … arasında", en: "" },
          { de: "To give one concrete example, …", tr: "Somut bir örnek vermek gerekirse, …", en: "" },
          { de: "I'd concede that …", tr: "Şunu kabul ederim: …", en: "" },
          { de: "Something that could be tried next month is …", tr: "Gelecek ay denenebilecek bir şey: …", en: "" },
        ],
        sample:
          "Reading this back, I think two different questions are mixed up here. " +
          "One is how much people should be in the building; the other is who learns anything " +
          "while they are there. " +
          "The useful distinction is between presence and overlap. Presence is how many days " +
          "you appear; overlap is whether the same people are there at the same time. " +
          "A three-day mandate raises presence and can leave overlap exactly as it was, " +
          "which is why jw_taylor's office is full on Tuesday and nothing has changed. " +
          "To give one concrete example, our team went from four days each to two fixed " +
          "afternoons, and the number of hours we spend together went up, not down, " +
          "because those afternoons are reliable. " +
          "I'd concede that this only works where somebody measures output rather than days, " +
          "and D_Novak is right that juniors carry the cost when it doesn't. " +
          "Something that could be tried next month is very small: publish who is in on which " +
          "afternoon, and let each team pick two. It costs nothing, it does not need a policy, " +
          "and after eight weeks you can see whether anyone's questions get answered faster.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b2-lib-s9",
    course: "en",
    level: "B2",
    skill: "speaking",
    title: "Should Working From Home Be a Right?",
    genre: "monologue",
    intro: "Bir dakikadan uzun tek başına konuşacaksın: bir hakkı tartış ve kimin bedelini ödediğini söyle.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Evden çalışmak yasal bir hak olmalı mı? Konumunu söyle, gerekçelendir, kimin kaybettiğini adlandır ve bir tasarım önerisiyle bitir.",
      bulletsTr: [
        "Konumunu tek cümleyle söyle",
        "Gerekçeni ver",
        "Kimin kaybettiğini adlandır",
        "Bir tasarım önerisiyle bitir",
      ],
      targets: [
        { de: "I'd support a right to request rather than a right to have.", tr: "Sahip olma hakkından çok talep etme hakkını desteklerim." },
        { de: "The case for it rests on …", tr: "Lehindeki gerekçe … üzerine kurulu" },
        { de: "What usually goes unsaid is who absorbs the cost: …", tr: "Genelde söylenmeyen şey bedeli kimin üstlendiği: …" },
        { de: "If I were designing it, I'd …", tr: "Tasarlayan ben olsam … yapardım" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "I'd support a right to request rather than a right to have, and I think the difference " +
        "is the whole argument. " +
        "The case for it rests on the fact that for a large number of jobs the office adds " +
        "nothing except a commute, and that employers who refuse are usually unable to explain " +
        "why in writing. A right to request forces that explanation, which is most of what is " +
        "needed. " +
        "What usually goes unsaid is who absorbs the cost, and it is not the person requesting. " +
        "It is the apprentice at the next desk who learned the job by overhearing it, " +
        "and the colleague who ends up being the one everybody phones because they are " +
        "reliably there. " +
        "If I were designing it, I'd tie the right to overlap rather than to location: " +
        "you can work where you like, provided your team has agreed fixed hours when everyone " +
        "is reachable and in the same place at least some of the time. " +
        "That keeps the flexibility that people actually want, and it protects the thing that " +
        "quietly disappears, which is the question a junior colleague asks without planning it.",
      rubricHint:
        "Bir ayrım, bedeli üstlenenin adlandırılması ve bir tasarım önerisi beklenir; „rather than“, „what usually goes unsaid“ ve „if I were designing it“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b2-lib-g9",
    course: "en",
    level: "B2",
    skill: "grammar",
    title: "as soon as, by the time, so that",
    genre: "grammar",
    intro: "Zaman ve amaç bağlaçları, arkasından hangi zamanın geleceğini kendileri belirler.",
    focus: "Zaman ve amaç bağlaçları: as soon as, by the time, until, so that, in order to",
    gloss: [
      { de: "to arrive", tr: "varmak" },
      { de: "meeting", tr: "toplantı" },
      { de: "juniors", tr: "yeni çalışanlar" },
      { de: "to finish", tr: "bitirmek" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "Gelecekte „will“ yok",
        tr: "„as soon as, when, until, before, after, by the time“ bağlaçlarından sonra gelecek anlatılsa bile „will“ KULLANILMAZ; present simple ya da present perfect gelir. Ana cümlede „will“ serbesttir. Bu kural koşul cümlelerindekiyle aynı mantıktır.",
        examples: [
          { de: "I'll call you as soon as I arrive.", tr: "Varır varmaz seni ararım.", note: "as soon as + present" },
          { de: "We'll wait until the meeting finishes.", tr: "Toplantı bitene kadar bekleriz.", note: "until + present" },
          { de: "By the time you read this, I'll have left.", tr: "Bunu okuduğunda gitmiş olacağım.", note: "by the time + present" },
        ],
      },
      {
        heading: "by the time ve until farkı",
        tr: "„until“ bir eylemin NE ZAMANA KADAR sürdüğünü söyler: „We waited until six.“ „by the time“ ise bir ana kadar başka bir şeyin olup bittiğini söyler ve genellikle perfect biçimle gelir: „By the time we arrived, they had left.“ İkisini karıştırmak zaman ilişkisini tersine çevirir.",
        examples: [
          { de: "We waited until six o'clock.", tr: "Saat altıya kadar bekledik.", note: "süre" },
          { de: "By the time we arrived, they had left.", tr: "Biz varana kadar onlar gitmişti.", note: "önce olmuş" },
          { de: "I won't decide until I've read it.", tr: "Onu okuyana kadar karar vermem.", note: "present perfect" },
        ],
      },
      {
        heading: "so that ve in order to",
        tr: "İkisi de AMAÇ bildirir ama yapıları farklıdır: „so that“ arkasından özne + fiil ister („so that new staff can ask“), „in order to“ ve „to“ ise mastar alır ve öznesi ana cümleyle aynıdır. Özne değişiyorsa „in order to“ kullanılamaz; „so that“ gerekir.",
        examples: [
          { de: "We wrote it down so that everyone could see it.", tr: "Herkes görebilsin diye yazdık.", note: "özne değişiyor" },
          { de: "We wrote it down in order to save time.", tr: "Zaman kazanmak için yazdık.", note: "aynı özne" },
          { de: "They met early so that the juniors could join.", tr: "Yeni gelenler katılabilsin diye erken toplandılar.", note: "so that + modal" },
        ],
      },
    ],
    questions: [
      {
        text: "I'll call you as soon as I ___.",
        options: ["will arrive", "arrive", "arrived"],
        answer: 1,
        explain: "Zaman bağlaçlarından sonra „will“ kullanılmaz.",
      },
      {
        text: "___ we arrived, they had already left.",
        options: ["Until", "By the time", "As long as"],
        answer: 1,
        explain: "Bir ana kadar başka bir şeyin olup bittiği anlatılıyor.",
      },
      {
        text: "We wrote it down ___ everyone could see it.",
        options: ["in order to", "so that", "to"],
        answer: 1,
        explain: "Özne değiştiği için „so that“ gerekir.",
      },
      {
        kind: "gapfill",
        text: "We'll wait until the meeting ___. (finish)",
        options: [],
        answer: 0,
        accept: ["finishes"],
        explain: "„until“ arkasından present simple gelir.",
      },
      {
        kind: "gapfill",
        text: "I won't decide until I ___ read it. (have)",
        options: [],
        answer: 0,
        accept: ["'ve", "have"],
        explain: "Present perfect de kullanılabilir ve bitmişliği vurgular.",
      },
      {
        kind: "gapfill",
        text: "We wrote it down in order ___ save time.",
        options: [],
        answer: 0,
        accept: ["to"],
        explain: "„in order to“ mastar alır.",
      },
      {
        kind: "gapfill",
        text: "___ the time you read this, I'll have left.",
        options: [],
        answer: 0,
        accept: ["By", "by"],
        explain: "„by the time“ kalıbı sabittir.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["They", "met early", "so that", "the juniors could join"],
        explain: "so that + özne + modal + fiil.",
      },
      {
        kind: "truefalse",
        text: "„I'll call you as soon as I will arrive.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "Zaman bağlacından sonra present simple gelir.",
      },
      {
        kind: "truefalse",
        text: "„We wrote it down in order to everyone could see it.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„in order to“ mastar ister; özne değişiyorsa „so that“ kullanılır.",
      },
    ],
  },
];
