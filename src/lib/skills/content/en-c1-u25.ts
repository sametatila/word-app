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
 *           A penchant for detail, they said, and rather good against vehemence. ·
 *           The impact assessment above becomes a benefit assessment below. ·
 *           That course-setting decision, as noted, is the technology assessment of an earlier page. ·
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
    title: "The choice itself",
    genre: "info",
    intro: "Dokuz sözcük ve seviyenin ölçtüğü her şey. Orada olmayanları say.",
    gloss: [
      { de: "either", tr: "ikisinden biri" },
      { de: "noun", tr: "isim" },
      { de: "general", tr: "genel" },
      { de: "anywhere", tr: "başka yerde" },
      { de: "object", tr: "nesne" },
      { de: "comma", tr: "virgül" },
      { de: "exist", tr: "var olmak" },
      { de: "judgement", tr: "yargı" },
      { de: "exists", tr: "var" },
      { de: "visible", tr: "görünür" },
      { de: "hole", tr: "delik" },
      { de: "particular", tr: "belirli" },
      { de: "able", tr: "muktedir" },
      { de: "count", tr: "saymak" },
      { de: "not there", tr: "orada olmayan" },
      { de: "an ending", tr: "ek" },
      { de: "centuries ago", tr: "yüzyıllar önce" },
      { de: "supplied", tr: "vermiş" },
      { de: "holding its place", tr: "yerini tutan" },
      { de: "pushed behind", tr: "arkaya itilmiş" },
      { de: "a decision", tr: "karar" },
      { de: "an absence", tr: "yokluk" },
      { de: "earned", tr: "hak edilmiş" },
      { de: "asserted", tr: "ileri sürülmüş" },
      { de: "a role", tr: "rol" },
      { de: "a case ending", tr: "hâl eki" },
      { de: "the class", tr: "sınıf" },
      { de: "a gap", tr: "boşluk" },
      { de: "a slot", tr: "yuva" },
      { de: "second place", tr: "ikinci sıra" },
      { de: "a derived form", tr: "türetilmiş biçim" },
      { de: "leaves holes", tr: "delik bırakıyor" },
      { de: "guessed", tr: "tahmin edilen" },
      { de: "familiar", tr: "tanıdık" },
      { de: "a memory", tr: "anı" },
      { de: "missing", tr: "eksik" },
    ],
    minutes: 12,
    text:
      "Serenity we learn; sincerity, we choose. Nine words, and almost everything this level has measured is in them.\n" +
      "Count what is not there. No article in front of either noun, because both are abstract and general. No ending anywhere to say which word is the object, because English stopped marking that centuries ago. No verb in the second half, because the first half has already supplied it and a comma is holding its place. And no subject at the front of either clause, because the object has been moved there instead and the subject has been pushed behind it.\n" +
      "Four decisions, and not one of them is made by adding anything. Each of them is made by a position or by an absence.\n" +
      "That is the closing measure of this level and it has been earned rather than asserted. Look back at what the units before this one found. The comparison that cannot say which role the compared noun had, because there is no case ending to say it. The class of a word changed by putting nothing in front of it. The gap a reader has to fill because the rule that would have marked it does not exist here. The slot before the verb where a judgement goes, which exists only because the verb is not required to stand in second place.\n" +
      "A neighbouring language does the same work with endings: a case on the noun, a fixed position for the verb, a visible article, a derived form for every change of class. It writes its grammar down. English moves things and leaves holes, and asks the reader to know what a hole means.\n" +
      "Neither is harder in general and each is harder in a particular place. Endings have to be learned and cannot be guessed. Holes cannot be learned at all, because there is nothing there to learn; they have to be met often enough for their shape to become familiar.\n" +
      "The pursuit survives as a habit, the end in itself as a memory. The transience stayed; the equanimity did not.\n" +
      "Two more lines of the same kind, and by now a reader of this level should be able to say of each of them exactly what is missing and what the missing thing was doing.",
    questions: [
      {
        text: "How is each of the four decisions made?",
        options: ["by a position or an absence", "by an ending", "by an article"],
        answer: 0,
        explain: "„Each of them is made by a position or by an absence.“",
      },
      {
        text: "What does the neighbouring language do?",
        options: ["writes its grammar down", "moves things", "leaves holes"],
        answer: 0,
        explain: "„It writes its grammar down.“",
      },
      {
        kind: "truefalse",
        text: "Holes can be learned like endings.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Holes cannot be learned at all, because there is nothing there to learn…“",
      },
      {
        kind: "gapfill",
        text: "Serenity we learn; sincerity, we ___.",
        options: [],
        answer: 0,
        accept: ["choose"],
        explain: "„Serenity we learn; sincerity, we choose.“",
      },
      {
        kind: "order",
        text: "Kapanışın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Serenity we learn; sincerity, we choose.",
          "Count what is not there.",
          "Each decision is made by a position or an absence.",
          "English moves things and leaves holes.",
        ],
        explain: "Cümle, sayım, ölçü; en sonda seviyenin bir cümlelik özeti.",
      },
      {
        kind: "short_answer",
        text: "What has to happen for a hole?",
        options: [],
        answer: 0,
        accept: ["meeting it often", "met often enough", "seeing it often"],
        explain: "„they have to be met often enough for their shape to become familiar.“",
      },
    ],
  },
  {
    id: "en-c1-u25-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 25,
    title: "Holding a long case together",
    genre: "opinion",
    intro: "Tutarlı bir plan ne zaman yetmiyor?",
    gloss: [
      { de: "appears", tr: "beliriyor" },
      { de: "automatic", tr: "kendiliğinden" },
      { de: "skipped", tr: "atlanmış" },
      { de: "exists", tr: "var" },
      { de: "outcome", tr: "sonuç" },
      { de: "revisited", tr: "yeniden ele alınan" },
      { de: "pretending", tr: "numara yapma" },
      { de: "an assessment", tr: "değerlendirme" },
      { de: "an impact", tr: "etki" },
      { de: "a benefit", tr: "fayda" },
      { de: "a chapter", tr: "bölüm" },
      { de: "a pointer", tr: "gönderme" },
      { de: "a promise", tr: "söz" },
      { de: "a decision", tr: "karar" },
      { de: "a course", tr: "yön" },
      { de: "set", tr: "belirlenmiş" },
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
      "The impact assessment above becomes a benefit assessment below. The same project, two chapters apart, under two names that count two different things.\n" +
      "An impact assessment counts what will change. A benefit assessment counts what somebody will gain, and the two lists are never the same list, because a change that helps nobody still appears on the first one and never on the second.\n" +
      "The pointer is doing real work here, as it has in three other units of this level, and by now the habit should be automatic: when a term changes between chapters, say so in the line where it changes.\n" +
      "That course-setting decision, as noted, is the technology assessment of an earlier page. „As noted“ is a promise, and it is worth checking every time, because a claim carried forward as a reminder has skipped the place where it could have been argued with.\n" +
      "Where irreversibility is real, a coherent plan is not enough. And this is the line the whole unit exists to reach.\n" +
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
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The impact assessment above becomes a benefit assessment below.",
          "That course-setting decision, as noted, is the technology assessment of an earlier page.",
          "Where irreversibility is real, a coherent plan is not enough.",
          "Where a step cannot be taken back, buy the delay.",
        ],
        explain: "Gönderme, söz, geri dönülmezlik; en sonda tek satırlık kural.",
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
    title: "Measured indeed",
    genre: "dialogue",
    intro: "Cevap ölçülüydü; ton daha az. Sessizlik ne söylüyor?",
    gloss: [
      { de: "adjective", tr: "sıfat" },
      { de: "entirely", tr: "tümüyle" },
      { de: "category", tr: "ulam" },
      { de: "instance", tr: "örnek" },
      { de: "fifth", tr: "beşinci" },
      { de: "able", tr: "muktedir" },
      { de: "kindness", tr: "incelik" },
      { de: "a tone", tr: "ton" },
      { de: "a reply", tr: "cevap" },
      { de: "a silence", tr: "sessizlik" },
      { de: "a meeting", tr: "toplantı" },
      { de: "a transcript", tr: "çözüm metni" },
      { de: "a recording", tr: "kayıt" },
      { de: "denied", tr: "yadsınan" },
      { de: "admitted", tr: "kabul edilen" },
      { de: "friendlier", tr: "daha dost" },
      { de: "a pause", tr: "duraklama" },
      { de: "a detail", tr: "ayrıntı" },
      { de: "a compliment", tr: "iltifat" },
      { de: "a warning", tr: "uyarı" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Duru", text: "The answer was measured; the tone, less so. Two words at the end again and by now you know what they are doing." },
      { speaker: "Sarp", text: "The verb and the adjective have both been borrowed." },
      { speaker: "Duru", text: "Both borrowed, and nothing has been claimed. The line reports an evening without making a single statement anybody can answer." },
      { speaker: "Sarp", text: "Would a transcript show it?" },
      { speaker: "Duru", text: "A transcript shows the answer and loses the tone entirely, which is why a recording and a transcript of the same meeting are two different documents." },
      { speaker: "Sarp", text: "We have no curt replies here; we have telling silences." },
      { speaker: "Duru", text: "A category denied and an instance admitted under a friendlier name. The fifth time this level has used that shape, and this is the coldest of the five." },
      { speaker: "Sarp", text: "Why the coldest?" },
      { speaker: "Duru", text: "Because a curt reply can be quoted and a silence cannot. Nobody has ever been shown a pause in an appeal." },
      { speaker: "Sarp", text: "A penchant for detail, they said, and rather good against vehemence." },
      { speaker: "Duru", text: "The inserted clause and the compliment at the end, for the last time in this level, and the compliment is a warning dressed as praise." },
      { speaker: "Sarp", text: "Dressed by whom?" },
      { speaker: "Duru", text: "By people who will be asked in two years what they said, and who will be able to point at a line that reads as a kindness." },
    ],
    questions: [
      {
        text: "What has been claimed in the line?",
        options: ["nothing", "the tone", "the answer"],
        answer: 0,
        explain: "„Both borrowed, and nothing has been claimed.“",
      },
      {
        text: "Why is it the coldest?",
        options: ["a silence cannot be quoted", "it is shorter", "it is written"],
        answer: 0,
        explain: "„Because a curt reply can be quoted and a silence cannot.“",
      },
      {
        kind: "truefalse",
        text: "A transcript keeps the tone.",
        options: ["True", "False"],
        answer: 1,
        explain: "„A transcript shows the answer and loses the tone entirely…“",
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
        explain: "İkinci yarı sıfatı da fiili de ödünç alıyor.",
      },
      {
        kind: "short_answer",
        text: "What is the compliment?",
        options: [],
        answer: 0,
        accept: ["a warning", "a warning as praise", "a dressed warning"],
        explain: "„the compliment is a warning dressed as praise.“",
      },
    ],
  },
  {
    id: "en-c1-u25-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 25,
    title: "How well do you know yourself",
    genre: "monologue",
    intro: "Benlik algısı kendini bilmeden daha uzun yaşayabilir. Nasıl?",
    gloss: [
      { de: "hedge", tr: "çekince" },
      { de: "unpleasant", tr: "tatsız" },
      { de: "behaviour", tr: "davranış" },
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
      { speaker: "Ceyda", text: "A self-image may well outlive self-knowledge. The hedge is right and I would keep it, because sometimes the two change together." },
      { speaker: "Ceyda", text: "Usually they do not. A person learns something true about themselves in a difficult year and the picture in their head stays the one from the decade before." },
      { speaker: "Ceyda", text: "It is a photograph that nobody updated. Friends update theirs faster, which is why a friend's description can be so unpleasant and so useful at the same time." },
      { speaker: "Ceyda", text: "Self-deception might look like a defense mechanism. And the word „look“ is the careful one there." },
      { speaker: "Ceyda", text: "A mechanism is protection and it is doing a job. Deception is a mechanism that has kept running after the thing it protected against has gone." },
      { speaker: "Ceyda", text: "That is the only difference and it is a difference in time rather than in kind, which is why the same behaviour can be harmless at thirty and expensive at fifty." },
      { speaker: "Ceyda", text: "A coping strategy may hide transference and stay latent. Three long words, and underneath them a small and ordinary thing." },
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
    title: "Serenity we learn; sincerity, we choose",
    genre: "info",
    intro: "Seviyenin kapanışı: konum ve yokluk.",
    gloss: [
      { de: "holes", tr: "delikler" },
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
        hint: "Tanımlık yok, ek yok, ikinci yarıda fiil yok, özne başta değil.",
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
        tr: "Yukarıdaki etki değerlendirmesi aşağıda bir fayda değerlendirmesine dönüşüyor.",
        answer: "The impact assessment above becomes a benefit assessment below.",
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
        prompt: "Kapanış kartını doldur.",
        facts: "İngilizce kararı konum ve yoklukla veriyor; Almanca ekle veriyor; ek öğrenilmek zorunda ve tahmin edilemez; delik öğrenilemez, tanıdık gelene kadar karşılaşmak gerekir.",
        fields: [
          { label: "In English", answer: "position and absence", accept: ["holes"] },
          { label: "In German", answer: "endings", accept: ["an ending"] },
          { label: "An ending", answer: "must be learned", accept: ["learned"] },
          { label: "A hole", answer: "must be met often", accept: ["met often"] },
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
    title: "A self-image may well outlive self-knowledge",
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
