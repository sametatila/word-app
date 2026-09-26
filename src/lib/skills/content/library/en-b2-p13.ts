import type { SkillExercise } from "../../types";

/**
 * EN · B2 — Beceriler kütüphanesi, parti 13.
 *
 * Hücreyi YİRMİYE tamamlayan partilerden biri (11–20). Kurallar ve emsal:
 * `en-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 13 okul ve telefon hattı: bir öğretmenin görüş yazısı, kızlarına
 * telefon alıp almamayı tartışan iki ebeveyn, veli konseyi için bir dönem
 * raporu. Dil bilgisi ettirgen fiiller — make/let + yalın fiil, get + to,
 * be allowed to (g3'teki have something done'dan ayrı bir kalıp ailesi).
 */
export const enB2P13: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-lib-r13",
    course: "en",
    level: "B2",
    skill: "reading",
    title: "What Happened When We Took the Phones Away",
    genre: "opinion",
    intro: "Bir öğretmenin görüş yazısı: okul gün boyu telefonları topladı; ne değişti, ne değişmedi, ne yanlış yapıldı.",
    gloss: [
      { de: "to hand in", tr: "teslim etmek" },
      { de: "pouch", tr: "kılıf" },
      { de: "corridor", tr: "koridor" },
      { de: "outcome", tr: "sonuç" },
      { de: "playground", tr: "okul bahçesi" },
      { de: "instant", tr: "anında" },
      { de: "locker", tr: "dolap" },
      { de: "habit", tr: "alışkanlık" },
      { de: "to rely on", tr: "güvenmek" },
      { de: "to impose", tr: "dayatmak" },
      { de: "to justify", tr: "gerekçelendirmek" },
      { de: "teenagers", tr: "ergen" },
      { de: "majority", tr: "çoğunluk" },
    ],
    minutes: 8,
    text:
      "What happened when we took the phones away\n\n" +
      "Two years ago our school stopped letting students keep their phones during the day. " +
      "Phones are handed in at the gate, locked in pouches and given back at half past three. " +
      "I voted against the policy, and I want to explain why I have changed my mind, and also " +
      "what I still think we got wrong.\n\n" +
      "The change in the corridors was immediate. Break time became loud again. Students who " +
      "had spent lunch looking down started arguing about soccer, which is not an educational " +
      "outcome but is not nothing either. Staff noticed that fewer fights began online and " +
      "finished in the playground, because during the day there was no online for them to " +
      "begin in.\n\n" +
      "What I had not expected was the reaction of the students themselves. When we asked them " +
      "after a year, a clear majority said they would not want to go back. Several told me the " +
      "rule had made it easier to say no to their friends: nobody could expect an instant reply " +
      "from someone whose phone was in a locker.\n\n" +
      "Where I think we went wrong was in making it a rule about phones rather than about " +
      "attention. We still let students use laptops in lessons, and within a term the same " +
      "habits had moved to a different screen. Getting teenagers to concentrate is not solved " +
      "by removing one device.\n\n" +
      "The other cost falls on parents. Some had relied on being able to reach their children " +
      "at any moment, and we did not explain the change well enough. A rule that is imposed in " +
      "September and justified in November starts badly, however good it turns out to be.",
    questions: [
      {
        text: "What happens to students' phones during the school day?",
        options: [
          "They are handed in and locked away.",
          "They are switched off in lessons only.",
          "They are kept at home by the parents.",
        ],
        answer: 0,
        explain: "Telefonlar kapıda teslim ediliyor, kılıflara kilitleniyor ve üç buçukta geri veriliyor.",
      },
      {
        text: "What does the writer say about fights between students?",
        options: [
          "They became more common at break.",
          "Fewer of them started online.",
          "They moved from phones to laptops.",
        ],
        answer: 1,
        explain: "Gün içinde çevrimiçi ortam kalmadığı için kavgaların daha azı internette başlamış.",
      },
      {
        kind: "truefalse",
        text: "Most students said they would like the old system back.",
        options: ["True", "False"],
        answer: 1,
        explain: "„a clear majority said they would not want to go back“.",
      },
      {
        kind: "gapfill",
        text: "Phones are given back at half past ___.",
        options: [],
        answer: 0,
        accept: ["three", "3"],
        explain: "„given back at half past three“.",
      },
      {
        kind: "short_answer",
        text: "According to several students, what did the rule make easier?",
        options: [],
        answer: 0,
        accept: ["saying no to friends", "saying no to their friends", "to say no to friends", "to say no to their friends", "say no to friends", "say no to their friends", "saying no"],
        explain: "„the rule had made it easier to say no to their friends“.",
      },
      {
        text: "What does the writer think the school got wrong?",
        options: [
          "It gave the phones back too early.",
          "It never asked the students at all.",
          "It targeted one device, not attention.",
        ],
        answer: 2,
        explain: "Kural dikkat üzerine değil telefon üzerine kuruldu; alışkanlıklar dizüstü ekrana taşındı.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-lib-l13",
    course: "en",
    level: "B2",
    skill: "listening",
    title: "Is She Ready for a Phone?",
    genre: "dialogue",
    intro: "İki ebeveyn on bir yaşındaki kızlarına akıllı telefon alıp almamayı ve hangi kuralları koyacaklarını konuşuyor.",
    gloss: [
      { de: "group chat", tr: "grup sohbeti" },
      { de: "to charge", tr: "şarj etmek" },
      { de: "non-negotiable", tr: "pazarlığa kapalı" },
      { de: "to stick to", tr: "bağlı kalmak" },
      { de: "to download", tr: "indirmek" },
      { de: "gradually", tr: "yavaş yavaş" },
      { de: "freedom", tr: "özgürlük" },
      { de: "ordinary", tr: "sıradan" },
      { de: "overnight", tr: "gece boyunca" },
      { de: "basic", tr: "basit" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Mother", text: "Every girl in her class has one except her. She told me yesterday she's stopped being invited to things because the plans are all made in a group chat." },
      { speaker: "Father", text: "I believe her, and it worries me too. But I'm not sure a phone fixes that. It might just move the problem to half past eleven at night." },
      { speaker: "Mother", text: "Then we don't let her keep it upstairs. It lives in the kitchen and gets charged there overnight. That part is non-negotiable." },
      { speaker: "Father", text: "Fine, but rules like that last about three weeks unless she's agreed to them herself. Could we get her to write the rules with us?" },
      { speaker: "Mother", text: "I like that. She'd be far more likely to stick to something she'd suggested. What about apps, though? Do we make her ask before downloading anything?" },
      { speaker: "Father", text: "For the first year, yes. After that I'd rather give her more freedom gradually than hand everything over on her twelfth birthday." },
      { speaker: "Mother", text: "There's a middle option too. A basic phone for calls and messages now, and a smartphone when she starts at the new school." },
      { speaker: "Father", text: "That only solves the group chat if her friends use ordinary messages, and they don't. Let's ask her which matters more to her, and decide on Sunday." },
    ],
    questions: [
      {
        text: "Why does their daughter want a phone?",
        options: [
          "to play games late at night",
          "to get help with her homework",
          "to join her class group chat",
        ],
        answer: 2,
        explain: "Planlar grup sohbetinde yapıldığı için davet edilmemeye başlamış.",
      },
      {
        text: "Where will the phone be kept at night?",
        options: ["in the kitchen", "in her bedroom", "in the car"],
        answer: 0,
        explain: "„It lives in the kitchen and gets charged there overnight.“",
      },
      {
        kind: "truefalse",
        text: "The father thinks their daughter should help write the rules.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Could we get her to write the rules with us?“",
      },
      {
        kind: "gapfill",
        text: "The father thinks rules last about ___ weeks unless she has agreed to them.",
        options: [],
        answer: 0,
        accept: ["three", "3"],
        explain: "„rules like that last about three weeks unless she's agreed to them herself“.",
      },
      {
        kind: "short_answer",
        text: "When will the parents make their decision?",
        options: [],
        answer: 0,
        accept: ["on Sunday", "Sunday"],
        explain: "„Let's ask her which matters more to her, and decide on Sunday.“",
      },
      {
        text: "What is the “middle option”?",
        options: [
          "a smartphone with no apps at all",
          "a simple phone first, a smartphone later",
          "one shared phone for the family",
        ],
        answer: 1,
        explain: "Şimdi arama ve mesaj için basit bir telefon, yeni okulda akıllı telefon.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-lib-w13",
    course: "en",
    level: "B2",
    skill: "writing",
    title: "Report on the Phone-Free Term",
    genre: "report",
    intro: "Veli konseyi için bir rapor yazıyorsun: önce iki cümle kur, sonra bir dönemlik denemeyi kanıt ve öneriyle özetle.",
    gloss: [
      { de: "trial", tr: "deneme" },
      { de: "incident", tr: "olay" },
      { de: "to consult", tr: "danışmak" },
      { de: "survey", tr: "anket" },
      { de: "noticeably", tr: "belirgin biçimde" },
      { de: "to summarize", tr: "özetlemek" },
      { de: "recommendation", tr: "öneri" },
      { de: "active", tr: "hareketli" },
      { de: "relied", tr: "güvenmek" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Okul, öğrencilere telefonlarını kapıda teslim ettiriyor.",
        answer: "The school makes students hand in their phones at the gate.",
        alternatives: ["At the gate, the school makes students hand in their phones."],
        hint: "make + kişi + yalın fiil: araya „to“ girmez.",
      },
      {
        kind: "build",
        tr: "Öğretmenler derslerde öğrencilerin dizüstü bilgisayar kullanmasına izin veriyor.",
        answer: "Teachers let students use laptops during lessons.",
        alternatives: ["During lessons, teachers let students use laptops."],
        hint: "let + kişi + yalın fiil; edilgende „be allowed to“ kullanılır.",
      },
      {
        kind: "free",
        prompt:
          "Veli konseyi için kısa bir rapor yaz: bir dönemlik telefonsuz okul denemesinin ne olduğunu anlat, iki olumlu etkisini rakamla göster, bir sorunu dürüstçe söyle ve bir öneriyle bitir.",
        checklist: [
          "Raporun amacını ve denemeyi tanımla",
          "İki olumlu etkiyi rakam ya da gözlemle göster",
          "Bir sorunu dürüstçe söyle",
          "Somut bir öneriyle bitir",
        ],
        minWords: 130,
        phrases: [
          { de: "The purpose of this report is to …", tr: "Bu raporun amacı …", en: "" },
          { de: "Over the term, we observed that …", tr: "Dönem boyunca şunu gözlemledik: …", en: "" },
          { de: "A less positive finding was that …", tr: "Daha az olumlu bir bulgu şuydu: …", en: "" },
          { de: "It is worth noting that …", tr: "Şunu belirtmek gerekir: …", en: "" },
          { de: "We therefore recommend that …", tr: "Bu nedenle … öneriyoruz", en: "" },
        ],
        sample:
          "The purpose of this report is to summarize the first term of the phone-free trial and " +
          "to make one recommendation to the parent council. " +
          "Since September, the school has made students hand in their phones at the gate each " +
          "morning. They are allowed to collect them at the end of the day, or earlier if a parent " +
          "calls the office. " +
          "Over the term, we observed that break times became noticeably more active and that the " +
          "number of incidents reported by staff fell from thirty-one to twelve. In a short survey, " +
          "sixty percent of students said the rule had helped them concentrate. " +
          "A less positive finding was that parents felt they had not been consulted. Several had " +
          "relied on messaging their children during the day and heard about the change from " +
          "their children rather than from the school. " +
          "It is worth noting that students are still allowed to use laptops in lessons, and " +
          "teachers report that some habits have simply moved there. " +
          "We therefore recommend that the rules for laptops are reviewed before spring, and that " +
          "parents are invited to a meeting before any further change is made.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b2-lib-s13",
    course: "en",
    level: "B2",
    skill: "speaking",
    title: "Should Phones Be Banned in Schools?",
    genre: "monologue",
    intro: "Bir dakikadan uzun tek başına konuşacaksın: bir yasağın neyi çözüp neyi çözmediğini ayır.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Okullarda gün boyu telefon yasaklanmalı mı? Konumunu söyle, yasağın gerçekte neyi çözüp neyi çözmediğini ayır, ailelerin kaygısına cevap ver ve yasağın nasıl uygulanması gerektiğini söyle.",
      bulletsTr: [
        "Konumunu tek cümleyle söyle",
        "Yasağın neyi çözüp neyi çözmediğini ayır",
        "Ailelerin kaygısına cevap ver",
        "Nasıl uygulanması gerektiğini söyle",
      ],
      targets: [
        { de: "I'd support a ban during the school day, with conditions.", tr: "Okul saatlerinde bir yasağı koşullu olarak desteklerim." },
        { de: "What a ban does solve is …; what it doesn't solve is …", tr: "Yasağın çözdüğü şey …; çözmediği şey …" },
        { de: "Parents are right to worry about …, but …", tr: "Aileler … konusunda kaygılanmakta haklı, ama …" },
        { de: "If it's going to work, it has to be …", tr: "İşe yarayacaksa … olmalı" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "I'd support a ban during the school day, with conditions, because what I've heard from " +
        "schools that have tried it is more encouraging than I expected. " +
        "What a ban does solve is the social side. Break times get louder, arguments that used " +
        "to start online at lunch have nowhere to start, and some students say it's easier to " +
        "ignore a group chat when nobody expects them to answer. " +
        "What it doesn't solve is attention in lessons. If students are allowed to use laptops, " +
        "the same habits move to the bigger screen, and the school has banned a device rather " +
        "than a behavior. " +
        "Parents are right to worry about being unable to reach their children, but that is a " +
        "problem of communication, not of phones. Every school office has a phone, and a clear " +
        "rule about when it will be used is more reassuring than a child who may or may not " +
        "read a message. " +
        "If it's going to work, it has to be explained before it starts, agreed with students " +
        "rather than announced to them, and reviewed after a year, with laptops included in " +
        "the review.",
      rubricHint:
        "Çözülen ile çözülmeyeni ayırma, ailelerin kaygısına somut cevap ve uygulama koşulları beklenir; „what a ban does solve“ ve „if it's going to work“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b2-lib-g13",
    course: "en",
    level: "B2",
    skill: "grammar",
    title: "make them, let them, get them to",
    genre: "grammar",
    intro: "Birine bir şey yaptırmanın, izin vermenin ve onu ikna etmenin ayrı kalıpları var; hangisinin „to“ aldığı kuralın kendisidir.",
    focus: "Ettirgen fiiller: make/let + yalın fiil, get + to, be allowed to (have something done'dan farkı)",
    gloss: [
      { de: "to hand in", tr: "teslim etmek" },
      { de: "to allow", tr: "izin vermek" },
      { de: "to rewrite", tr: "yeniden yazmak" },
      { de: "homework", tr: "ödev" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "make ve let: „to“ yok",
        tr: "„make + kişi + yalın fiil“ birini zorlamayı, „let + kişi + yalın fiil“ izin vermeyi anlatır; ikisinde de „to“ YOKTUR. „have something done“da işi başkası yapıyordu; burada ise nesne olan kişi eylemi kendisi yapar.",
        examples: [
          { de: "The school makes students hand in their phones.", tr: "Okul öğrencilere telefonlarını teslim ettiriyor.", note: "zorlama" },
          { de: "Her parents let her stay up late on Fridays.", tr: "Ailesi cuma günleri geç yatmasına izin veriyor.", note: "izin" },
          { de: "The teacher made us rewrite the essay.", tr: "Öğretmen bize kompozisyonu yeniden yazdırdı.", note: "geçmiş: made" },
        ],
      },
      {
        heading: "get ve help: farklı davranış",
        tr: "„get + kişi + to + fiil“ birini ikna ederek ya da uğraşarak bir şey yaptırmaktır ve „to“ ALIR. „help“ ise iki biçimi de kabul eder: „help her do“ da „help her to do“ da doğrudur.",
        examples: [
          { de: "We finally got him to do his homework.", tr: "Sonunda ona ödevini yaptırabildik.", note: "ikna: to var" },
          { de: "Could you get her to call me back?", tr: "Onun beni geri aramasını sağlayabilir misin?", note: "rica" },
          { de: "The rule helped students concentrate.", tr: "Kural öğrencilerin odaklanmasına yardım etti.", note: "help + yalın" },
        ],
      },
      {
        heading: "Edilgende ne olur?",
        tr: "„let“ edilgene girmez; yerine „be allowed to“ kullanılır. „make“ edilgene geçince „to“ geri gelir: „They were made to wait.“ Etken cümledeki „to“suz kalıp edilgende korunmaz.",
        examples: [
          { de: "Students are allowed to use laptops in lessons.", tr: "Öğrencilerin derste dizüstü kullanmasına izin veriliyor.", note: "let → be allowed to" },
          { de: "We were made to wait outside.", tr: "Dışarıda bekletildik.", note: "make → be made to" },
          { de: "She isn't allowed to keep her phone upstairs.", tr: "Telefonunu üst katta tutmasına izin verilmiyor.", note: "olumsuz" },
        ],
      },
    ],
    questions: [
      {
        text: "The school makes students ___ their phones at the gate.",
        options: ["to hand in", "hand in", "handing in"],
        answer: 1,
        explain: "„make + kişi“ ardından „to“suz yalın fiil gelir.",
      },
      {
        text: "We finally got him ___ his homework.",
        options: ["do", "doing", "to do"],
        answer: 2,
        explain: "„get + kişi“ ikna anlamında „to + fiil“ alır.",
      },
      {
        text: "Which is correct?",
        options: [
          "Students are allowed to use laptops.",
          "Students are let to use laptops.",
          "Students are let use laptops.",
        ],
        answer: 0,
        explain: "„let“ edilgene girmez; yerine „be allowed to“ kullanılır.",
      },
      {
        kind: "gapfill",
        text: "Her parents ___ her stay up late on Fridays. (permission)",
        options: [],
        answer: 0,
        accept: ["let"],
        explain: "Arkasında „to“suz yalın fiil olduğu için „let“ gerekir; „allow“ „to“ isterdi.",
      },
      {
        kind: "gapfill",
        text: "We were made ___ wait outside.",
        options: [],
        answer: 0,
        accept: ["to"],
        explain: "„make“ edilgene geçince „to“ geri gelir: be made to.",
      },
      {
        kind: "gapfill",
        text: "Could you get her ___ call me back?",
        options: [],
        answer: 0,
        accept: ["to"],
        explain: "„get + kişi + to + fiil“ kalıbı „to“ ister.",
      },
      {
        kind: "gapfill",
        text: "She isn't ___ to keep her phone upstairs. (allow)",
        options: [],
        answer: 0,
        accept: ["allowed"],
        explain: "Edilgen izin kalıbı: be allowed to.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["The teacher", "made", "us", "rewrite", "the essay"],
        explain: "make + kişi + yalın fiil + nesne.",
      },
      {
        kind: "truefalse",
        text: "„The rule helped students concentrate.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "„help“ yalın fiille de „to“lu fiille de kullanılabilir.",
      },
      {
        kind: "truefalse",
        text: "„They let us to leave early.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„let“ „to“ almaz: „They let us leave early.“",
      },
    ],
  },
];
