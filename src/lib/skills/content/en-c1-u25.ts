import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 25 — "Kendini ne kadar tanıyorsun, gerçekten ölçülü,
 * uzun bir dosyayı bir arada tutmak, seçimin kendisi".
 *
 * Dört ders: How well do you know yourself · Measured indeed ·
 * Holding a long case together · The choice itself.
 *
 *   Kelime: self-image, self-knowledge, self-deception, defense mechanism,
 *           coping strategy, transference, latent, measured, curt, telling,
 *           penchant, vehemence, impact assessment, benefit assessment,
 *           technology assessment, irreversibility, coherent, pursuit,
 *           end in itself, transience, equanimity, serenity, sincerity.
 *   Kalıp:  A self-image may well outlive self-knowledge. ·
 *           Self-deception might look like a defense mechanism. ·
 *           A coping strategy may hide transference and stay latent. ·
 *           The answer was measured; the tone, less so. ·
 *           We have no curt replies here; we have telling silences. ·
 *           A penchant for detail, they said, and rather charming. ·
 *           The impact assessment above must be weighed against the benefit assessment below. ·
 *           That pivotal decision, as noted earlier, rested on a technology assessment. ·
 *           Where irreversibility is real, a coherent plan is not enough. ·
 *           The pursuit survives as a habit, the end in itself as a memory. ·
 *           The transience stayed; the equanimity did not. ·
 *           Serenity we learn; sincerity, we choose.
 *
 * Seviyenin KAPANIŞ ünitesi. „Serenity we learn; sincerity, we choose“ —
 * dokuz sözcük, ve bu seviyenin ölçtüğü neredeyse her şey içinde. Orada
 * OLMAYANLARI say: iki ismin de önünde tanımlık yok (ikisi de soyut ve
 * genel, ünite 23); hangi sözcüğün nesne olduğunu söyleyen hiçbir ek yok
 * (ünite 12'nin çözümsüz belirsizliği); ikinci yarıda fiil yok, çünkü
 * ilk yarı onu çoktan verdi ve yerini virgül tutuyor (ünite 7); ve iki
 * cümlecikte de başta özne yok, çünkü nesne oraya taşınmış (ünite 4).
 * Dört karar ve hiçbiri bir şey EKLENEREK verilmiş değil; her biri bir
 * KONUM ya da bir YOKLUK. Seviyenin kapanış ölçüsü bu ve yirmi dört
 * ünitelik kanıtla hak edilmiş: **KOMŞU DİL AYNI İŞİ EKLERLE GÖRÜYOR —
 * isimde hâl, fiile ayrılmış konum, görünür tanımlık, her sınıf değişimi
 * için türetilmiş biçim; dil bilgisini YAZIYA DÖKÜYOR. İNGİLİZCE ŞEYLERİ
 * YERİNDEN OYNATIYOR VE DELİK BIRAKIYOR, VE OKURDAN DELİĞİN NE DEMEK
 * OLDUĞUNU BİLMESİNİ İSTİYOR.** İkisi genel olarak birbirinden zor değil,
 * her biri ayrı bir yerde zor: ek öğrenilmek zorunda ve tahmin edilemez;
 * delik hiç öğrenilemez, çünkü öğrenilecek bir şey yok — biçimi tanıdık
 * gelene kadar yeterince sık karşılaşmak gerekiyor.
 */
export const enC1U25: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-u25-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 25,
    title: "A surgeon looks back",
    genre: "essay",
    intro: "Emekli bir cerrah geriye bakıyor. Neyi özlüyor, neyi geride bıraktı?",
    gloss: [
      { de: "serenity", tr: "dinginlik" },
      { de: "sincerity", tr: "içtenlik" },
      { de: "transience", tr: "geçicilik" },
      { de: "equanimity", tr: "sükûnet" },
      { de: "retired", tr: "emekli olmak" },
      { de: "retire", tr: "emekli olmak" },
      { de: "an operation", tr: "ameliyat" },
      { de: "gently", tr: "nazikçe" },
      { de: "a pace", tr: "tempo" },
      { de: "curiosity", tr: "merak" },
      { de: "medical", tr: "tıbbi" },
      { de: "history", tr: "tarih" },
      { de: "forever", tr: "sonsuza dek" },
    ],
    minutes: 12,
    text:
      "WHAT I KEPT: A SURGEON LOOKS BACK\n" +
      "For thirty-one years I operated at the city hospital. I retired in March, and people keep asking me what I miss. The honest answer is: less than I expected, and different things.\n" +
      "The hours I do not miss. The night calls I do not miss either, although my body still wakes at four as if a phone were about to ring. What I miss is the team: the nurse who could tell from my face that a case was going badly, and the young doctors who asked questions I could not always answer.\n" +
      "Serenity I learned from my patients; sincerity, I had to choose. Patients taught me calm without meaning to. A woman of eighty once told me, before a difficult operation, that she had already had a good life and I should not look so worried. I have thought about her every week since.\n" +
      "Sincerity was harder. In the early years I gave families hope because hope was easier to give than numbers. Later I gave them the numbers, gently, and found that most people preferred the truth to comfort.\n" +
      "The pace slowed; the curiosity did not. I read more now than at any time since medical school. Last month I started a course on the history of medicine, and I am the oldest student by thirty years.\n" +
      "Ambition survives as a habit, the goal itself as a memory. I still wake up wanting to finish something by lunchtime. There is nothing to finish, so I walk the dog to the river and back, faster than the dog would like.\n" +
      "Some things changed forever when I left. The skill in my hands will not come back; nobody keeps it without practice. That transience I accept. The equanimity I am still working on.\n" +
      "If a younger colleague asked me for one piece of advice, it would be this: choose early which of your habits you want to keep when the job is gone.",
    questions: [
      {
        text: "How long did the writer work at the hospital?",
        options: ["thirty-one years", "thirty years", "eighty years"],
        answer: 0,
        explain: "„For thirty-one years I operated at the city hospital.“",
      },
      {
        text: "What does the writer miss most?",
        options: ["the team", "the night calls", "the long hours"],
        answer: 0,
        explain: "„What I miss is the team…“",
      },
      {
        kind: "truefalse",
        text: "Most families preferred the truth to comfort.",
        options: ["True", "False"],
        answer: 0,
        explain: "„most people preferred the truth to comfort.“",
      },
      {
        kind: "gapfill",
        text: "The pace slowed; the curiosity did ___.",
        options: [],
        answer: 0,
        accept: ["not"],
        explain: "„The pace slowed; the curiosity did not.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The writer retires in March.",
          "An old patient tells the writer not to worry.",
          "The writer starts a course on the history of medicine.",
          "The writer gives advice to younger colleagues.",
        ],
        explain: "Emeklilik, bir hastanın sözü, yeni bir kurs; en sonda genç meslektaşlara öğüt.",
      },
      {
        kind: "short_answer",
        text: "Where does the writer walk the dog?",
        options: [],
        answer: 0,
        accept: ["to the river", "the river", "to the river and back"],
        explain: "„I walk the dog to the river and back, faster than the dog would like.“",
      },
    ],
  },
  {
    id: "en-c1-u25-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 25,
    title: "Weighing a project",
    genre: "opinion",
    intro: "Tutarlı bir plan ne zaman yetmiyor?",
    gloss: [
      { de: "differ", tr: "farklı olmak" },
      { de: "appears", tr: "beliriyor" },
      { de: "skipped", tr: "atlanmış" },
      { de: "exists", tr: "var" },
      { de: "outcome", tr: "sonuç" },
      { de: "revisited", tr: "yeniden ele alınan" },
      { de: "pretending", tr: "numara yapma" },
      { de: "an assessment", tr: "değerlendirme" },
      { de: "an impact", tr: "etki" },
      { de: "a benefit", tr: "fayda" },
      { de: "a chapter", tr: "bölüm" },
      { de: "a decision", tr: "karar" },
      { de: "coherent", tr: "tutarlı" },
      { de: "enough", tr: "yeterli" },
      { de: "a mistake", tr: "hata" },
      { de: "corrected", tr: "düzeltilen" },
      { de: "a species", tr: "tür" },
      { de: "a valley", tr: "vadi" },
      { de: "flooded", tr: "sular altında" },
      { de: "a cost", tr: "bedel" },
      { de: "an option", tr: "seçenek" },
      { de: "a delay", tr: "gecikme" },
      { de: "a rule", tr: "kural" },
      { de: "one line", tr: "tek satır" },
    ],
    minutes: 12,
    text:
      "The impact assessment above must be weighed against the benefit assessment below. The same project, two chapters apart, under two names that count two different things.\n" +
      "An impact assessment counts what will change. A benefit assessment counts what somebody will gain, and the two lists are never the same list, because a change that helps nobody still appears on the first one and never on the second.\n" +
      "The report is careful to say where the two lists differ, and that care is the best thing in it: when a term changes between chapters, a good report says so in the line where it changes.\n" +
      "That pivotal decision, as noted earlier, rested on a technology assessment. That sentence is worth checking, because a claim carried forward as a reminder has skipped the place where it could have been argued with.\n" +
      "Where irreversibility is real, a coherent plan is not enough. And this is the line the whole report exists to reach.\n" +
      "A coherent plan is a plan whose parts agree with each other. It can be coherent and wrong, and the question that matters is not whether the parts agree but what happens if they do not hold.\n" +
      "A mistake that can be corrected is a cost. A mistake that cannot is a different kind of thing, and it should be decided by a different rule: not the best expected outcome, but the one that keeps an option open.\n" +
      "A valley that has been flooded is not a bad decision that can be revisited. A species that has gone is not a line in a budget. So the rule for this class of case is one line long: where a step cannot be taken back, buy the delay, and price the delay honestly rather than pretending it costs nothing.",
    questions: [
      {
        text: "What does an impact assessment count?",
        options: ["what will change", "what somebody gains", "what it costs"],
        answer: 0,
        explain: "„An impact assessment counts what will change.“",
      },
      {
        text: "What should decide an irreversible case?",
        options: ["keeping an option open", "the best expected outcome", "a coherent plan"],
        answer: 0,
        explain: "„not the best expected outcome, but the one that keeps an option open.“",
      },
      {
        kind: "truefalse",
        text: "A coherent plan cannot be wrong.",
        options: ["True", "False"],
        answer: 1,
        explain: "„It can be coherent and wrong…“",
      },
      {
        kind: "gapfill",
        text: "Where irreversibility is real, a ___ plan is not enough.",
        options: [],
        answer: 0,
        accept: ["coherent"],
        explain: "„Where irreversibility is real, a coherent plan is not enough.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The impact assessment above must be weighed against the benefit assessment below.",
          "That pivotal decision, as noted earlier, rested on a technology assessment.",
          "Where irreversibility is real, a coherent plan is not enough.",
          "Where a step cannot be taken back, buy the delay.",
        ],
        explain: "İki değerlendirme, teknoloji değerlendirmesi, geri dönülmezlik; en sonda tek satırlık kural.",
      },
      {
        kind: "short_answer",
        text: "What should be priced honestly?",
        options: [],
        answer: 0,
        accept: ["the delay", "a delay", "the waiting"],
        explain: "„buy the delay, and price the delay honestly…“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-u25-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 25,
    title: "After the staff meeting",
    genre: "dialogue",
    intro: "Personel toplantısından sonra iki iş arkadaşı konuşuyor. Müdür soruları nasıl yanıtladı?",
    gloss: [
      { de: "measured", tr: "ölçülü" },
      { de: "vehemence", tr: "şiddet" },
      { de: "curt", tr: "ters" },
      { de: "telling", tr: "anlamlı" },
      { de: "a penchant", tr: "düşkünlük" },
      { de: "a silence", tr: "sessizlik" },
      { de: "a pause", tr: "duraklama" },
      { de: "angrily", tr: "öfkeyle" },
      { de: "reassuring", tr: "güven verici" },
      { de: "finance", tr: "finans" },
      { de: "a slide", tr: "slayt" },
      { de: "react", tr: "tepki vermek" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Duru", text: "Were you at the staff meeting yesterday? I had to leave after the first twenty minutes." },
      { speaker: "Sarp", text: "I stayed to the end. Somebody asked the director straight out whether the Izmir office will close." },
      { speaker: "Duru", text: "And what did she say?" },
      { speaker: "Sarp", text: "The answer was measured; the tone, less so. She said no decision had been made, but she said it with real vehemence, almost angrily." },
      { speaker: "Duru", text: "That is not exactly reassuring." },
      { speaker: "Sarp", text: "No. And when the next question was about bonuses, she said nothing for about five seconds. The whole room noticed." },
      { speaker: "Duru", text: "We have no curt replies here; we have telling silences." },
      { speaker: "Sarp", text: "Exactly. Nobody will be able to quote that pause in an email, but everyone will remember it." },
      { speaker: "Duru", text: "What about the new finance manager? Did he speak?" },
      { speaker: "Sarp", text: "Briefly. He has a penchant for detail. He showed us eleven slides about travel costs." },
      { speaker: "Duru", text: "A penchant for detail, they said, and rather charming." },
      { speaker: "Sarp", text: "Charming is not the word I would use. Half the people in the room were checking their phones by slide six." },
      { speaker: "Duru", text: "So what happens next?" },
      { speaker: "Sarp", text: "The director promised a written answer about the Izmir office by Friday. I will believe it when I read it." },
    ],
    questions: [
      {
        text: "What was the director asked first?",
        options: ["whether the Izmir office will close", "how large the bonuses will be", "who the new finance manager is"],
        answer: 0,
        explain: "„Somebody asked the director straight out whether the Izmir office will close.“",
      },
      {
        text: "How did the director react to the question about bonuses?",
        options: ["She said nothing for a few seconds.", "She answered angrily.", "She showed eleven slides."],
        answer: 0,
        explain: "„she said nothing for about five seconds.“",
      },
      {
        kind: "truefalse",
        text: "The finance manager spoke about travel costs.",
        options: ["True", "False"],
        answer: 0,
        explain: "„He showed us eleven slides about travel costs.“",
      },
      {
        kind: "gapfill",
        text: "We have no curt replies here; we have ___ silences.",
        options: [],
        answer: 0,
        accept: ["telling"],
        explain: "„We have no curt replies here; we have telling silences.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The answer was measured; the tone, less so.", "The answer was measured; the tone, less so"],
        explain: "Müdürün cevabı ölçülüydü, ama sesinin tonu değildi.",
      },
      {
        kind: "short_answer",
        text: "By when will the written answer come?",
        options: [],
        answer: 0,
        accept: ["by Friday", "Friday", "on Friday"],
        explain: "„The director promised a written answer about the Izmir office by Friday.“",
      },
    ],
  },
  {
    id: "en-c1-u25-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 25,
    title: "Self-image and self-knowledge",
    genre: "monologue",
    intro: "Benlik algısı kendini bilmeden daha uzun yaşayabilir. Nasıl?",
    gloss: [
      { de: "unpleasant", tr: "tatsız" },
      { de: "behavior", tr: "davranış" },
      { de: "underneath", tr: "altta" },
      { de: "ordinary", tr: "olağan" },
      { de: "deception", tr: "kandırma" },
      { de: "a self-image", tr: "benlik algısı" },
      { de: "outlive", tr: "daha uzun yaşamak" },
      { de: "a photograph", tr: "fotoğraf" },
      { de: "a decade", tr: "on yıl" },
      { de: "a friend", tr: "arkadaş" },
      { de: "updated", tr: "güncellenmiş" },
      { de: "a mechanism", tr: "mekanizma" },
      { de: "protection", tr: "koruma" },
      { de: "harmless", tr: "zararsız" },
      { de: "a strategy", tr: "strateji" },
      { de: "a question", tr: "soru" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Ceyda", text: "A self-image may well outlive self-knowledge. Not always, because sometimes the two change together." },
      { speaker: "Ceyda", text: "Usually they do not. A person learns something true about themselves in a difficult year and the picture in their head stays the one from the decade before." },
      { speaker: "Ceyda", text: "It is a photograph that nobody updated. Friends update theirs faster, which is why a friend's description can be so unpleasant and so useful at the same time." },
      { speaker: "Ceyda", text: "Self-deception might look like a defense mechanism. From the outside, at least, the two are hard to tell apart." },
      { speaker: "Ceyda", text: "A mechanism is protection and it is doing a job. Deception is a mechanism that has kept running after the thing it protected against has gone." },
      { speaker: "Ceyda", text: "That is the only difference and it is a difference in time rather than in kind, which is why the same behavior can be harmless at thirty and expensive at fifty." },
      { speaker: "Ceyda", text: "A coping strategy may hide transference and stay latent. It sounds technical, but underneath it is a small and ordinary thing." },
      { speaker: "Ceyda", text: "A person who was not listened to at home will hear a manager as a parent, and will answer the manager the way a child answers a parent." },
      { speaker: "Ceyda", text: "Nobody in the room knows this, including them, and the strategy that carried them through one house is now the thing costing them a job." },
      { speaker: "Ceyda", text: "So the useful question is never what you feel. It is which room you learned to feel it in, and whether that room is still standing." },
    ],
    questions: [
      {
        text: "What is a self-image?",
        options: ["a photograph nobody updated", "a difficult year", "a friend's description"],
        answer: 0,
        explain: "„It is a photograph that nobody updated.“",
      },
      {
        text: "What is deception?",
        options: ["a mechanism still running", "protection", "a strategy"],
        answer: 0,
        explain: "„Deception is a mechanism that has kept running after the thing it protected against has gone.“",
      },
      {
        kind: "truefalse",
        text: "The difference is one of kind.",
        options: ["True", "False"],
        answer: 1,
        explain: "„it is a difference in time rather than in kind…“",
      },
      {
        kind: "gapfill",
        text: "A self-image may well ___ self-knowledge.",
        options: [],
        answer: 0,
        accept: ["outlive"],
        explain: "„A self-image may well outlive self-knowledge.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Self-deception might look like a defense mechanism.", "Self-deception might look like a defense mechanism"],
        explain: "Dikkatli sözcük „look“.",
      },
      {
        kind: "short_answer",
        text: "What is the useful question?",
        options: [],
        answer: 0,
        accept: ["which room", "where you learned it", "which room you learned it in"],
        explain: "„It is which room you learned to feel it in…“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-u25-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 25,
    title: "Thoughts on a calm life",
    genre: "info",
    intro: "Bir cerrahın emekliliği: cümleler ve bir not kartı.",
    gloss: [
      { de: "serenity", tr: "dinginlik" },
      { de: "sincerity", tr: "içtenlik" },
      { de: "a pursuit", tr: "arayış" },
      { de: "transience", tr: "geçicilik" },
      { de: "equanimity", tr: "sükûnet" },
      { de: "irreversibility", tr: "geri dönülmezlik" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Dinginliği öğreniriz; içtenliği, seçeriz.",
        answer: "Serenity we learn; sincerity, we choose.",
        hint: "Tanımlık yok, ek yok; nesne başta, özne ondan sonra.",
      },
      {
        kind: "build",
        tr: "Arayış bir alışkanlık olarak, kendi başına amaç bir anı olarak sağ kalıyor.",
        answer: "The pursuit survives as a habit, the end in itself as a memory.",
        hint: "İkinci yarı fiili ilk yarıdan alıyor.",
      },
      {
        kind: "build",
        tr: "Geçicilik kaldı; sükûnet kalmadı.",
        answer: "The transience stayed; the equanimity did not.",
        hint: "Yüklem gitmiş; „did not“ onu taşıyor.",
      },
      {
        kind: "build",
        tr: "Yukarıdaki etki değerlendirmesi, aşağıdaki fayda değerlendirmesiyle tartılmalı.",
        answer: "The impact assessment above must be weighed against the benefit assessment below.",
        hint: "İki edat nesnesiz kalmış; gönderme katmanı.",
      },
      {
        kind: "build",
        tr: "Geri dönülmezliğin gerçek olduğu yerde tutarlı bir plan yetmez.",
        answer: "Where irreversibility is real, a coherent plan is not enough.",
        hint: "„Where“ yer değil, durum gösteriyor.",
      },
      {
        kind: "form",
        prompt: "Emeklilik söyleşisi için not kartını doldur.",
        facts: "Cerrah otuz bir yıl şehir hastanesinde çalıştı; en çok ekibini özlüyor; dinginliği hastalarından öğrendi; genç meslektaşlarına öğüdü, işten sonra hangi alışkanlıkların kalacağını erkenden seçmek.",
        fields: [
          { label: "Years at the hospital", answer: "thirty-one", accept: ["31", "thirty-one years"] },
          { label: "What is missed most", answer: "the team", accept: ["the hospital team"] },
          { label: "Serenity learned from", answer: "the patients", accept: ["patients"] },
          { label: "Advice", answer: "choose your habits early", accept: ["choose habits early"] },
        ],
      },
    ],
  },
  {
    id: "en-c1-u25-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 25,
    title: "Defenses of the self",
    genre: "info",
    intro: "Kendini bilmenin çekinceleri ve ölçülü olan cevap.",
    gloss: [
      { de: "self-knowledge", tr: "kendini bilme" },
      { de: "self-deception", tr: "kendini kandırma" },
      { de: "a coping strategy", tr: "başa çıkma stratejisi" },
      { de: "measured", tr: "ölçülü" },
      { de: "curt", tr: "ters" },
      { de: "a penchant", tr: "düşkünlük" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Benlik algısı kendini bilmeden pekâlâ daha uzun yaşayabilir.",
        answer: "A self-image may well outlive self-knowledge.",
        hint: "Kimsenin güncellemediği bir fotoğraf.",
      },
      {
        kind: "build",
        tr: "Kendini kandırma bir savunma mekanizmasına benzeyebilir.",
        answer: "Self-deception might look like a defense mechanism.",
        hint: "Dikkatli sözcük „look“.",
      },
      {
        kind: "build",
        tr: "Bir başa çıkma stratejisi duygu aktarımını gizleyip gizil kalabilir.",
        answer: "A coping strategy may hide transference and stay latent.",
        hint: "Üç uzun sözcük, altlarında küçük ve sıradan bir şey.",
      },
      {
        kind: "build",
        tr: "Cevap ölçülüydü; ton, daha az.",
        answer: "The answer was measured; the tone, less so.",
        hint: "Hem fiil hem sıfat ödünç alınmış; hiçbir iddia yok.",
      },
      {
        kind: "build",
        tr: "Burada ters cevaplar yok; manidar sessizliklerimiz var.",
        answer: "We have no curt replies here; we have telling silences.",
        hint: "Ters cevap alıntılanabilir, sessizlik alıntılanamaz.",
      },
    ],
  },
];
