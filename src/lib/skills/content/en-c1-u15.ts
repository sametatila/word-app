import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 15 — "Ne kadar gönüllü, mükemmeliyet girişimi,
 * uzun bir raporu bir arada tutmak, işin söylemedikleri".
 *
 * Dört ders: How voluntary is it · The excellence initiative ·
 * Holding a long report together · What work leaves unsaid.
 *
 *   Kelime: knowledge work, self-exploitation, role conflict, pacing,
 *           piecework, collegiality, excellence initiative, transition rate,
 *           competitive logic, publication pressure, plagiarism, structural
 *           change, core business, feasibility study, performance indicator,
 *           pension level, standard retirement age, generational contract,
 *           twilight years, earmarked, thrive.
 *   Kalıp:  Knowledge work may well end in self-exploitation. ·
 *           A role conflict might look like a pacing problem. ·
 *           Piecework may weaken collegiality and strain the interpersonal side. ·
 *           The excellence initiative was funded; the transition rate, less so. ·
 *           We have no formation of elites here; we have a competitive logic. ·
 *           Publication pressure, they said, and rather good against plagiarism. ·
 *           The structural change above becomes a core business below. ·
 *           That distortion of competition, as noted, is the feasibility study of an earlier page. ·
 *           Where the operating responsibility is unclear, the performance indicator does not help. ·
 *           The pension level fell; the standard retirement age did not. ·
 *           The generational contract promises twilight years, the job self-fulfillment. ·
 *           The labor force participation rate rose; the earmarked money, not at all.
 *
 * Ünitenin tek öğretme noktası GEÇİŞLİLİK DEĞİŞTİREN FİİL. „The pension
 * level fell“ — fiilin öznesi var, nesnesi yok, ve düzey değiştiren değil
 * DEĞİŞEN şey. Bu cümleyi kurmak için hiçbir şey silinmemiş: edilgen yok,
 * geri konacak bir fail yok, bakanlığın yerini tutan soyut isim yok. Fiil
 * yalnızca kimseye gerek duymayan okumasında kullanılmış, ve İngilizce
 * neredeyse her değişim fiiline bunu yaptırıyor (a price drops / they
 * dropped the price). Böylece seviyenin failsiz cümle ailesinin ÜÇÜNCÜ ve
 * en sessiz üyesi ortaya çıkıyor: edilgen bir delik bırakıyor, soyut özne
 * görünür bir isim koyuyor, bu ise hiçbir iz bırakmıyor — cümle tam,
 * olağan ve kısa, ve içinde adın eksik olduğu bir yer yok. Almanca farkı
 * SÖZCÜKTE işaretliyor: değişen için ayrı, değiştiren için ayrı fiil
 * (sinken/senken, steigen/steigern), aynı kökten farklı ekle. Ölçü:
 * **İNGİLİZCEDE FAİL FİİLİN İÇİNDE KAYBOLUYOR; ALMANCADA FİİL HANGİ
 * OKUMADA OLUNDUĞUNU SÖYLÜYOR.**
 */
export const enC1U15: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-u15-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 15,
    title: "What work leaves unsaid",
    genre: "info",
    intro: "Hiçbir şey silinmemiş ve yine de kimse yok. Fail nereye gitti?",
    gloss: [
      { de: "either", tr: "ikisinden biri" },
      { de: "object", tr: "nesne" },
      { de: "passive", tr: "edilgen" },
      { de: "noun", tr: "isim" },
      { de: "simply", tr: "düpedüz" },
      { de: "drops", tr: "düşürüyor" },
      { de: "rises", tr: "yükseliyor" },
      { de: "dropped", tr: "düşürülmüş" },
      { de: "least", tr: "en az" },
      { de: "ordinary", tr: "olağan" },
      { de: "itself", tr: "kendisi" },
      { de: "judgement", tr: "yargı" },
      { de: "objects", tr: "nesneler" },
      { de: "disappear", tr: "yok olmak" },
      { de: "a clause", tr: "cümlecik" },
      { de: "deleted", tr: "silinmiş" },
      { de: "a hole", tr: "delik" },
      { de: "an agent", tr: "fail" },
      { de: "abstract", tr: "soyut" },
      { de: "standing in", tr: "yerini tutan" },
      { de: "a ministry", tr: "bakanlık" },
      { de: "a reading", tr: "okuma" },
      { de: "a price", tr: "fiyat" },
      { de: "a rate", tr: "oran" },
      { de: "slips", tr: "kayıyor" },
      { de: "improves", tr: "iyileşiyor" },
      { de: "the same word", tr: "aynı sözcük" },
      { de: "the quietest", tr: "en sessizi" },
      { de: "visible", tr: "görünür" },
      { de: "no trace", tr: "hiç iz" },
      { de: "removed", tr: "kaldırılmış" },
      { de: "a root", tr: "kök" },
      { de: "an ending", tr: "ek" },
      { de: "considered", tr: "dikkate alınmış" },
      { de: "disappears", tr: "kayboluyor" },
      { de: "an adverb", tr: "belirteç" },
      { de: "double duty", tr: "iki katlı iş" },
      { de: "a promise", tr: "söz" },
    ],
    minutes: 12,
    text:
      "The pension level fell; the standard retirement age did not. Two clauses, two numbers, and nobody in either of them.\n" +
      "Look at the verb. „Fell“ has a subject and no object, and the level is the thing that changed rather than the thing that did the changing. Nothing was deleted to arrive at that sentence: there is no passive, no missing agent waiting to be put back, no abstract noun standing in for a ministry. The verb has simply been used in the reading where it needs nobody.\n" +
      "English lets almost any verb of change do this. A price drops, a rate rises, a standard slips, a figure improves, a department closes. Every one of them also has a version with somebody in front of it — they dropped the price, we improved the figure — and the two versions are the same word.\n" +
      "That is the third and quietest way this level has met of writing a decision with nobody in it. The passive deletes an agent and leaves a hole a careful reader can find. An abstract subject puts a noun where a person was, and the noun is at least visible. This one leaves no trace at all, because nothing was removed: the sentence is complete, ordinary and short, and there is no place in it where a name is missing.\n" +
      "German marks the difference in the word itself. Where English uses one verb in two readings, German usually keeps two verbs — one for the thing that changes and one for the person who changes it — built from the same root with a different ending. So a German reader learns from the verb which of the two sentences they are in, before the subject has been considered at all.\n" +
      "That is the measurement of this unit. In English the agent disappears inside the verb; in German the verb says which reading is in hand.\n" +
      "The labor force participation rate rose; the earmarked money, not at all. Here the gapped second half has kept an adverb where the verb would have been, which the shape allows, and that adverb is carrying the whole judgement of the sentence.\n" +
      "The generational contract promises twilight years, the job self-fulfillment. One more, with a single verb doing double duty across two subjects and two objects.\n" +
      "And it is the right line to end on, because a promise is the one kind of sentence in this vocabulary that always has somebody in it. Something promised, and the sentence says what.",
    questions: [
      {
        text: "What was deleted to arrive at that sentence?",
        options: ["nothing", "the agent", "the object"],
        answer: 0,
        explain: "„Nothing was deleted to arrive at that sentence…“",
      },
      {
        text: "Where does the agent disappear in English?",
        options: ["inside the verb", "into a noun", "into a passive"],
        answer: 0,
        explain: "„In English the agent disappears inside the verb…“",
      },
      {
        kind: "truefalse",
        text: "German uses one verb for both readings.",
        options: ["True", "False"],
        answer: 1,
        explain: "„German usually keeps two verbs…“",
      },
      {
        kind: "gapfill",
        text: "The pension level fell; the standard retirement age did ___.",
        options: [],
        answer: 0,
        accept: ["not"],
        explain: "„The pension level fell; the standard retirement age did not.“",
      },
      {
        kind: "order",
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The pension level fell; the standard retirement age did not.",
          "The two versions are the same word.",
          "This one leaves no trace at all.",
          "German marks the difference in the word itself.",
        ],
        explain: "Cümle, tek sözcük iki okuma, izsizlik; en sonda öteki dil.",
      },
      {
        kind: "short_answer",
        text: "What is carrying the judgement?",
        options: [],
        answer: 0,
        accept: ["the adverb", "an adverb", "that adverb"],
        explain: "„that adverb is carrying the whole judgement of the sentence.“",
      },
    ],
  },
  {
    id: "en-c1-u15-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 15,
    title: "The excellence initiative",
    genre: "opinion",
    intro: "Fonlanan ile fonlanmayan aynı cümlede. Ek neyi ele veriyor?",
    gloss: [
      { de: "failure", tr: "kusur" },
      { de: "none", tr: "hiçbiri" },
      { de: "easiest", tr: "en kolay" },
      { de: "halves", tr: "yarılar" },
      { de: "impossible", tr: "olanaksız" },
      { de: "apart", tr: "ayrı" },
      { de: "funded", tr: "fonlanmış" },
      { de: "a sum", tr: "meblağ" },
      { de: "a line", tr: "satır" },
      { de: "the second half", tr: "ikinci yarı" },
      { de: "an audit", tr: "denetim" },
      { de: "a number", tr: "sayı" },
      { de: "denied", tr: "yadsınan" },
      { de: "the same breath", tr: "aynı nefes" },
      { de: "a rank", tr: "sıralama" },
      { de: "an outcome", tr: "sonuç" },
      { de: "a hire", tr: "işe alım" },
      { de: "an inserted clause", tr: "araya sokulmuş cümlecik" },
      { de: "a compliment", tr: "iltifat" },
      { de: "pressure", tr: "baskı" },
      { de: "a cure", tr: "çare" },
      { de: "a cause", tr: "neden" },
      { de: "a committee", tr: "kurul" },
      { de: "an applicant", tr: "başvuran" },
      { de: "a decade", tr: "on yıl" },
    ],
    minutes: 12,
    text:
      "The excellence initiative was funded; the transition rate, less so. A sum in the first half, a shape in the second, and the second half is where the audit should start.\n" +
      "„Less so“ names no number. It does not say the rate was not funded and it does not say by how much less, and it cannot be answered, because there is nothing in it to answer. A reader who wants the figure has to leave the sentence and go looking, and most readers do not.\n" +
      "So the line is doing two things at once. It reports a success with a sum attached and it admits a failure with no sum attached, and both of those are in the same breath, which is how a report is written when it has to be honest and would rather not be clear.\n" +
      "We have no formation of elites here; we have a competitive logic. The same move seen earlier in a different room, and the second half is again the admission. Something is denied under one word and granted under another, and the second word sounds like a description of how the world works rather than a decision anybody made.\n" +
      "Look at what each name brings with it. A formation of elites has people in it: an applicant, a committee, a rank, a hire. A competitive logic has none, and a logic cannot be asked who it left out last year.\n" +
      "Publication pressure, they said, and rather good against plagiarism. Here is the inserted clause again, arriving after the words it is meant to be reporting, and here is the compliment at the end that should not be trusted.\n" +
      "Read the claim on its own and it turns over. Pressure is the cause of the thing it is being offered as a cure for. Nothing in a decade of counting says otherwise, and the sentence survives in meetings because it is short and the counting is long.\n" +
      "That is the reasoning this unit is named for: a claim that uses its own outcome as its evidence. It is easiest to catch when the two halves are as close together as they are here, and almost impossible when they are four pages apart.",
    questions: [
      {
        text: "What does „less so“ name?",
        options: ["no number", "the sum", "the rate"],
        answer: 0,
        explain: "„„Less so“ names no number.“",
      },
      {
        text: "What does a competitive logic have none of?",
        options: ["people", "numbers", "decisions"],
        answer: 0,
        explain: "„A formation of elites has people in it… A competitive logic has none…“",
      },
      {
        kind: "truefalse",
        text: "Pressure is the cure for the thing it causes.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Pressure is the cause of the thing it is being offered as a cure for.“",
      },
      {
        kind: "gapfill",
        text: "The excellence initiative was ___; the transition rate, less so.",
        options: [],
        answer: 0,
        accept: ["funded"],
        explain: "„The excellence initiative was funded; the transition rate, less so.“",
      },
      {
        kind: "order",
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The excellence initiative was funded; the transition rate, less so.",
          "We have no formation of elites here; we have a competitive logic.",
          "Publication pressure, they said, and rather good against plagiarism.",
          "A claim that uses its own outcome as its evidence.",
        ],
        explain: "Meblağ, ad değişimi, iltifat; en sonda döngü.",
      },
      {
        kind: "short_answer",
        text: "When is it almost impossible to catch?",
        options: [],
        answer: 0,
        accept: ["four pages apart", "when far apart", "pages apart"],
        explain: "„almost impossible when they are four pages apart.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-u15-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 15,
    title: "How voluntary is it",
    genre: "dialogue",
    intro: "Kimse zorlamadıysa gönüllü müdür? Çekince nerede duruyor?",
    gloss: [
      { de: "hedge", tr: "çekince" },
      { de: "fourth", tr: "dördüncü" },
      { de: "per", tr: "başına" },
      { de: "appears", tr: "beliriyor" },
      { de: "a deadline", tr: "son tarih" },
      { de: "a role", tr: "rol" },
      { de: "a rhythm", tr: "ritim" },
      { de: "two jobs", tr: "iki iş" },
      { de: "a diary", tr: "ajanda" },
      { de: "a colleague", tr: "meslektaş" },
      { de: "a piece", tr: "parça" },
      { de: "a rate", tr: "birim ücret" },
      { de: "a favour", tr: "iyilik" },
      { de: "counted", tr: "sayılan" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Ayça", text: "Knowledge work may well end in self-exploitation. The hedge is doing real work in that line and I would not take it out." },
      { speaker: "Tolga", text: "Because it does not always." },
      { speaker: "Ayça", text: "Because it does not always, and a sentence that says it always does can be answered with one happy person and then nobody listens to the rest of the paper." },
      { speaker: "Tolga", text: "What makes the difference?" },
      { speaker: "Ayça", text: "Whether the deadline was set by the person doing the work. Not whether they like the work, not whether anybody told them to stay: who owns the date." },
      { speaker: "Tolga", text: "A role conflict might look like a pacing problem." },
      { speaker: "Ayça", text: "And it will be treated as one, because a rhythm can be fixed with a diary and a role conflict cannot be fixed without somebody losing half of a job." },
      { speaker: "Tolga", text: "So the cheaper reading wins." },
      { speaker: "Ayça", text: "The cheaper reading always wins the first meeting. It loses the fourth one, a year later, when the same person is in the room with the same two jobs." },
      { speaker: "Tolga", text: "Piecework may weaken collegiality and strain the interpersonal side." },
      { speaker: "Ayça", text: "That one I have watched happen. Once the rate is per piece, a question from a colleague costs money, and helping becomes a favour rather than the work." },
      { speaker: "Tolga", text: "Nobody decides that." },
      { speaker: "Ayça", text: "Nobody decides it and everybody notices it, and it never appears in a report because the thing that was lost was never counted when it was there." },
    ],
    questions: [
      {
        text: "What makes the difference?",
        options: ["who owns the date", "whether they like the work", "who stays late"],
        answer: 0,
        explain: "„who owns the date.“",
      },
      {
        text: "When does the cheaper reading lose?",
        options: ["the fourth meeting", "the first meeting", "never"],
        answer: 0,
        explain: "„It loses the fourth one, a year later…“",
      },
      {
        kind: "truefalse",
        text: "The lost thing appears in a report.",
        options: ["True", "False"],
        answer: 1,
        explain: "„it never appears in a report because the thing that was lost was never counted when it was there.“",
      },
      {
        kind: "gapfill",
        text: "Knowledge work may well end in ___.",
        options: [],
        answer: 0,
        accept: ["self-exploitation"],
        explain: "„Knowledge work may well end in self-exploitation.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["A role conflict might look like a pacing problem.", "A role conflict might look like a pacing problem"],
        explain: "Ucuz okuma ilk toplantıyı kazanıyor.",
      },
      {
        kind: "short_answer",
        text: "What does a question from a colleague cost?",
        options: [],
        answer: 0,
        accept: ["money", "it costs money", "a piece"],
        explain: "„a question from a colleague costs money…“",
      },
    ],
  },
  {
    id: "en-c1-u15-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 15,
    title: "Holding a long report together",
    genre: "monologue",
    intro: "Uzun raporu ne bir arada tutuyor? Belirsiz sorumluluk neyi bozuyor?",
    gloss: [
      { de: "none", tr: "hiçbiri" },
      { de: "repetition", tr: "yineleme" },
      { de: "a report", tr: "rapor" },
      { de: "a pointer", tr: "gönderme" },
      { de: "a page", tr: "sayfa" },
      { de: "a reader", tr: "okur" },
      { de: "unclear", tr: "belirsiz" },
      { de: "an indicator", tr: "gösterge" },
      { de: "measure", tr: "ölçmek" },
      { de: "an owner", tr: "sahip" },
      { de: "a quarter", tr: "çeyrek" },
      { de: "a dashboard", tr: "gösterge tablosu" },
      { de: "an alarm", tr: "alarm" },
      { de: "an earlier page", tr: "önceki bir sayfa" },
      { de: "a summary", tr: "özet" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Ufuk", text: "The structural change above becomes a core business below. Every long report needs a layer of these and most of them have none." },
      { speaker: "Ufuk", text: "A pointer costs one word and saves a reader a page. Without it the same reader is holding two versions of a term and does not know they are the same term." },
      { speaker: "Ufuk", text: "That distortion of competition, as noted, is the feasibility study of an earlier page. „As noted“ is a promise, and I check it before I sign a report." },
      { speaker: "Ufuk", text: "If it was not noted, the phrase has made a repetition look like a reminder, and a reader who trusts it will stop looking for the first mention." },
      { speaker: "Ufuk", text: "Where the operating responsibility is unclear, the performance indicator does not help. This is the line I would put on the first page of every report of this kind." },
      { speaker: "Ufuk", text: "An indicator measures something. It does not decide who has to do anything about it, and a number with no owner is read by everybody and acted on by nobody." },
      { speaker: "Ufuk", text: "I have seen a dashboard with forty indicators and an alarm that had been red for three quarters. Nobody in the building was wrong to ignore it." },
      { speaker: "Ufuk", text: "So the rule is one line long. Every indicator gets a name next to it, and the name is a person, not a department." },
      { speaker: "Ufuk", text: "A department cannot be asked a question at the end of a quarter. It can only be asked for a summary, and a summary is what a department writes when it does not want to answer." },
      { speaker: "Ufuk", text: "Put the name in and half your indicators will be removed by the people who now have to carry them. That is the report working, not the report failing." },
    ],
    questions: [
      {
        text: "What does a pointer cost?",
        options: ["one word", "a page", "a quarter"],
        answer: 0,
        explain: "„A pointer costs one word and saves a reader a page.“",
      },
      {
        text: "What is a number with no owner?",
        options: ["acted on by nobody", "read by nobody", "removed at once"],
        answer: 0,
        explain: "„a number with no owner is read by everybody and acted on by nobody.“",
      },
      {
        kind: "truefalse",
        text: "The name next to an indicator should be a department.",
        options: ["True", "False"],
        answer: 1,
        explain: "„the name is a person, not a department.“",
      },
      {
        kind: "gapfill",
        text: "Where the operating responsibility is ___, the performance indicator does not help.",
        options: [],
        answer: 0,
        accept: ["unclear"],
        explain: "„Where the operating responsibility is unclear, the performance indicator does not help.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The structural change above becomes a core business below.", "The structural change above becomes a core business below"],
        explain: "İki edat nesnesiz kalmış; gönderme katmanı.",
      },
      {
        kind: "short_answer",
        text: "What happens when you put the name in?",
        options: [],
        answer: 0,
        accept: ["half are removed", "indicators are removed", "people remove them"],
        explain: "„half your indicators will be removed by the people who now have to carry them.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-u15-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 15,
    title: "The pension level fell; the standard retirement age did not",
    genre: "info",
    intro: "Failin fiilin içinde kaybolması ve çekincenin işi.",
    gloss: [
      { de: "hole", tr: "delik" },
      { de: "visible", tr: "görünür" },
      { de: "trace", tr: "iz" },
      { de: "a pension level", tr: "emekli aylığı düzeyi" },
      { de: "a generational contract", tr: "kuşaklar arası sözleşme" },
      { de: "twilight years", tr: "yaşlılık günleri" },
      { de: "earmarked", tr: "tahsis edilmiş" },
      { de: "knowledge work", tr: "bilgi emeği" },
      { de: "piecework", tr: "parça başı iş" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Emekli aylığı düzeyi düştü; yasal emeklilik yaşı düşmedi.",
        answer: "The pension level fell; the standard retirement age did not.",
        hint: "Hiçbir şey silinmedi ve yine de kimse yok.",
      },
      {
        kind: "build",
        tr: "Kuşaklar arası sözleşme yaşlılık günleri, iş kendini gerçekleştirme vadediyor.",
        answer: "The generational contract promises twilight years, the job self-fulfillment.",
        hint: "Tek fiil iki özne ile iki nesneye yetiyor.",
      },
      {
        kind: "build",
        tr: "İşgücüne katılım oranı yükseldi; tahsis edilmiş para hiç yükselmedi.",
        answer: "The labor force participation rate rose; the earmarked money, not at all.",
        hint: "Eksiltilen yarıda fiil yerine bir belirteç kalmış.",
      },
      {
        kind: "build",
        tr: "Bilgi emeği pekâlâ kendini sömürmeyle bitebilir.",
        answer: "Knowledge work may well end in self-exploitation.",
        hint: "Çekince burada gerçek bir iş görüyor.",
      },
      {
        kind: "build",
        tr: "Parça başı iş meslektaş dayanışmasını zayıflatıp kişiler arası tarafı zorlayabilir.",
        answer: "Piecework may weaken collegiality and strain the interpersonal side.",
        hint: "Birim ücret parça başına olunca soru sormak para tutuyor.",
      },
      {
        kind: "form",
        prompt: "Fail kartını doldur.",
        facts: "Edilgen bir delik bırakıyor; soyut özne görünür bir isim koyuyor; geçişlilik değiştiren fiil hiç iz bırakmıyor; Almanca ayrı bir fiil türetiyor.",
        fields: [
          { label: "The passive", answer: "leaves a hole", accept: ["a hole"] },
          { label: "An abstract subject", answer: "is visible", accept: ["visible"] },
          { label: "This one", answer: "leaves no trace", accept: ["no trace"] },
          { label: "In German", answer: "two verbs", accept: ["a second verb"] },
        ],
      },
    ],
  },
  {
    id: "en-c1-u15-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 15,
    title: "The excellence initiative was funded",
    genre: "info",
    intro: "Meblağsız kabul ve raporun gönderme katmanı.",
    gloss: [
      { de: "an excellence initiative", tr: "mükemmeliyet girişimi" },
      { de: "a transition rate", tr: "geçiş oranı" },
      { de: "a competitive logic", tr: "rekabet mantığı" },
      { de: "plagiarism", tr: "intihal" },
      { de: "a structural change", tr: "yapısal değişim" },
      { de: "a performance indicator", tr: "performans göstergesi" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Mükemmeliyet girişimi fonlandı; geçiş oranı, daha az.",
        answer: "The excellence initiative was funded; the transition rate, less so.",
        hint: "İlk yarıda meblağ var, ikincide yok.",
      },
      {
        kind: "build",
        tr: "Burada elit yetiştirme yok; rekabet mantığı var.",
        answer: "We have no formation of elites here; we have a competitive logic.",
        hint: "Aynı nefeste yadsıma ve kabul.",
      },
      {
        kind: "build",
        tr: "Yayın baskısı, dediler, ve intihale karşı epeyce iyi.",
        answer: "Publication pressure, they said, and rather good against plagiarism.",
        hint: "Sondaki iltifat güvenilmeyecek yer.",
      },
      {
        kind: "build",
        tr: "Yukarıdaki yapısal değişim aşağıda bir ana iş koluna dönüşüyor.",
        answer: "The structural change above becomes a core business below.",
        hint: "Gönderme bir sözcüğe mal oluyor, okura bir sayfa kazandırıyor.",
      },
      {
        kind: "build",
        tr: "İşletme sorumluluğunun belirsiz olduğu yerde performans göstergesi işe yaramaz.",
        answer: "Where the operating responsibility is unclear, the performance indicator does not help.",
        hint: "„Where“ yer değil, durum gösteriyor.",
      },
    ],
  },
];
