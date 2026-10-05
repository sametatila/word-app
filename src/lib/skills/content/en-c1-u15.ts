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
 *           pension level, full retirement age, intergenerational contract,
 *           twilight years, earmarked, thrive.
 *   Kalıp:  Knowledge work may well end in self-exploitation. ·
 *           A role conflict might look like a pacing problem. ·
 *           Piecework may weaken collegiality and strain the interpersonal side. ·
 *           The excellence initiative was a success; the transition rate, less so. ·
 *           We have no elite formation here; we have a competitive logic. ·
 *           Healthy publication pressure, they said, and rather good for quality. ·
 *           The structural change described above threatens the core business discussed below. ·
 *           The distortion of competition, as noted earlier, was flagged in the feasibility study. ·
 *           Where the operational responsibility is unclear, the performance indicator does not help. ·
 *           The pension level fell; the full retirement age did not. ·
 *           The intergenerational contract promises twilight years, the job self-fulfillment. ·
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
    title: "What the new pension report shows",
    genre: "article",
    intro: "Yıllık emeklilik raporunu anlatan bir haber. Ne düştü, ne yükseldi, bunu kim değiştirdi?",
    gloss: [
      { de: "an association", tr: "dernek" },
      { de: "a government", tr: "hükûmet" },
      { de: "a fund", tr: "fon" },
      { de: "funds", tr: "fonlar" },
      { de: "supposed to", tr: "…mesi beklenen" },
      { de: "sudden", tr: "ani" },
      { de: "a shock", tr: "sarsıntı" },
      { de: "shrank", tr: "küçüldü" },
      { de: "a sector", tr: "sektör" },
      { de: "slip", tr: "gerilemek" },
      { de: "regional", tr: "bölgesel" },
      { de: "simply", tr: "sadece" },
      { de: "a formula", tr: "formül" },
      { de: "secure", tr: "güvende" },
    ],
    minutes: 12,
    text:
      "The government's annual pension report was published on Tuesday, and its main message fits into one line: the pension level fell; the full retirement age did not.\n" +
      "According to the report, the average pension fell to 46 percent of the average wage, down from 48 percent five years ago. Over the same period, the full retirement age stayed at 67, and the number of people working past that age rose sharply.\n" +
      "Several other figures moved as well. The labor force participation rate rose; the earmarked money, not at all. Payments into the pension fund grew by four percent, mainly because more women now work full time. At the same time, the reserve that was supposed to protect pensions from sudden shocks shrank for the third year in a row.\n" +
      "The report is careful not to say why. It notes that prices increased faster than pensions, that wages improved in some sectors and slipped in others, and that two large regional funds closed during the period. None of these sentences names a decision, and none of them says who made it.\n" +
      "Critics say that is the problem. „Pensions did not simply fall,“ said Freya Brandt of the Pensioners' Association. „The formula was changed in 2021, and people voted for that change.“ The ministry replied that the formula had been changed to protect younger workers, who will pay into the system for decades.\n" +
      "The intergenerational contract promises twilight years, the job self-fulfillment. For many of those interviewed for this article, neither promise feels secure. A 64-year-old nurse from Hanover said she plans to keep working part time after 67, „not because I love it, but because the numbers do not work otherwise.“\n" +
      "Parliament will debate the report next month.",
    questions: [
      {
        text: "What did the average pension fall to?",
        options: ["46 percent of the average wage", "48 percent of the average wage", "67 percent of the average wage"],
        answer: 0,
        explain: "„the average pension fell to 46 percent of the average wage, down from 48 percent five years ago.“",
      },
      {
        text: "Why did payments into the pension fund grow?",
        options: ["More women now work full time.", "The retirement age rose.", "Prices increased."],
        answer: 0,
        explain: "„Payments into the pension fund grew by four percent, mainly because more women now work full time.“",
      },
      {
        kind: "truefalse",
        text: "The reserve shrank for the third year in a row.",
        options: ["True", "False"],
        answer: 0,
        explain: "„the reserve that was supposed to protect pensions from sudden shocks shrank for the third year in a row.“",
      },
      {
        kind: "gapfill",
        text: "The pension level fell; the full retirement age did ___.",
        options: [],
        answer: 0,
        accept: ["not"],
        explain: "„the pension level fell; the full retirement age did not.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The pension report was published on Tuesday.",
          "Payments into the fund grew.",
          "Critics say the formula was changed.",
          "Parliament will debate the report.",
        ],
        explain: "Yayın, rakamlar, eleştiri; en sonda meclis.",
      },
      {
        kind: "short_answer",
        text: "When was the formula changed?",
        options: [],
        answer: 0,
        accept: ["in 2021", "2021"],
        explain: "„The formula was changed in 2021, and people voted for that change.“",
      },
    ],
  },
  {
    id: "en-c1-u15-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 15,
    title: "Five years of the excellence initiative",
    genre: "opinion",
    intro: "Genç bir araştırmacının üniversitenin mükemmeliyet girişimi üzerine yazısı. Başarının bedelini kim ödedi?",
    gloss: [
      { de: "external", tr: "dış" },
      { de: "an audit", tr: "denetim" },
      { de: "attract", tr: "çekmek" },
      { de: "international", tr: "uluslararası" },
      { de: "a bachelor's", tr: "lisans" },
      { de: "a master's", tr: "yüksek lisans" },
      { de: "a panel", tr: "kurul" },
      { de: "a seminar", tr: "seminer" },
      { de: "shrank", tr: "küçüldü" },
      { de: "popular", tr: "sevilen" },
      { de: "a lecturer", tr: "öğretim görevlisi" },
      { de: "elsewhere", tr: "başka yerde" },
      { de: "a dean", tr: "dekan" },
    ],
    minutes: 12,
    text:
      "Five years ago our university won 40 million dollars in the national excellence initiative. Last month the external audit was published, and I have read all 120 pages so that my colleagues do not have to.\n" +
      "The summary is short: the excellence initiative was a success; the transition rate, less so. The university attracted three new research centers and doubled its international publications. But the share of students who move on from the bachelor's to the master's program fell from 61 to 48 percent, and nobody on the audit panel seems to know why.\n" +
      "I have a guess. The money went to research, and teaching was expected to follow. It did not. Seminars grew, office hours shrank, and several popular lecturers left for better contracts elsewhere.\n" +
      "When I raised this at a faculty meeting, the dean said: „We have no elite formation here; we have a competitive logic.“ I understand what he meant. We do not choose students by their parents' income. But a competition decides who wins, and the audit does not say who lost.\n" +
      "Healthy publication pressure, they said, and rather good for quality. That is how the initiative was sold to us. The audit now reports three cases of plagiarism in five years, compared with none in the five years before. Three is a small number, but it did not come from nowhere.\n" +
      "I am not arguing that the initiative should end. The new centers are excellent, and several of my students work there. I am asking that the next five years include a target for teaching, and that the next audit count the students we lose as carefully as the papers we publish.",
    questions: [
      {
        text: "How much money did the university win?",
        options: ["40 million dollars", "120 million dollars", "61 million dollars"],
        answer: 0,
        explain: "„Five years ago our university won 40 million dollars in the national excellence initiative.“",
      },
      {
        text: "What happened to the transition rate?",
        options: ["It fell from 61 to 48 percent.", "It doubled.", "It stayed the same."],
        answer: 0,
        explain: "„fell from 61 to 48 percent, and nobody on the audit panel seems to know why.“",
      },
      {
        kind: "truefalse",
        text: "The writer wants the initiative to end.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I am not arguing that the initiative should end.“",
      },
      {
        kind: "gapfill",
        text: "The excellence initiative was a success; the transition rate, ___ so.",
        options: [],
        answer: 0,
        accept: ["less"],
        explain: "„the excellence initiative was a success; the transition rate, less so.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The university won the excellence initiative.",
          "Several popular lecturers left.",
          "The dean spoke about a competitive logic.",
          "The writer asks for a target for teaching.",
        ],
        explain: "Kazanılan para, öğretimin durumu, dekanın sözü; en sonda öneri.",
      },
      {
        kind: "short_answer",
        text: "How many cases of plagiarism does the audit report?",
        options: [],
        answer: 0,
        accept: ["three", "3", "three cases"],
        explain: "„The audit now reports three cases of plagiarism in five years…“",
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
    title: "Knowledge work and self-exploitation",
    genre: "dialogue",
    intro: "Bilgi işçileriyle yapılan görüşmeler üzerine bir sohbet. Kimse zorlamadıysa gönüllü müdür?",
    gloss: [
      { de: "fourth", tr: "dördüncü" },
      { de: "per", tr: "başına" },
      { de: "appears", tr: "beliriyor" },
      { de: "a deadline", tr: "son tarih" },
      { de: "a role", tr: "rol" },
      { de: "a rhythm", tr: "ritim" },
      { de: "two jobs", tr: "iki iş" },
      { de: "a planner", tr: "ajanda" },
      { de: "a colleague", tr: "meslektaş" },
      { de: "a piece", tr: "parça" },
      { de: "a rate", tr: "birim ücret" },
      { de: "a favor", tr: "iyilik" },
      { de: "counted", tr: "sayılan" },
      { de: "a designer", tr: "tasarımcı" },
      { de: "a developer", tr: "yazılımcı" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Kerry", text: "Knowledge work may well end in self-exploitation. That is what two years of interviews with designers and software developers suggest." },
      { speaker: "Brian", text: "But not always?" },
      { speaker: "Kerry", text: "Not always. Some of them were relaxed and well paid, and a study that claimed otherwise would lose its readers on the first page." },
      { speaker: "Brian", text: "What makes the difference?" },
      { speaker: "Kerry", text: "Whether the deadline was set by the person doing the work. Not whether they like the work, not whether anybody told them to stay: who owns the date." },
      { speaker: "Brian", text: "A role conflict might look like a pacing problem." },
      { speaker: "Kerry", text: "And it will be treated as one, because a rhythm can be fixed with a planner and a role conflict cannot be fixed without somebody losing half of a job." },
      { speaker: "Brian", text: "So the cheaper reading wins." },
      { speaker: "Kerry", text: "The cheaper reading always wins the first meeting. It loses the fourth one, a year later, when the same person is in the room with the same two jobs." },
      { speaker: "Brian", text: "Piecework may weaken collegiality and strain the interpersonal side." },
      { speaker: "Kerry", text: "That one I have watched happen. Once the rate is per piece, a question from a colleague costs money, and helping becomes a favor rather than the work." },
      { speaker: "Brian", text: "Nobody decides that." },
      { speaker: "Kerry", text: "Nobody decides it and everybody notices it, and it never appears in a report because the thing that was lost was never counted when it was there." },
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
        text: "The lost thing never appears in a report.",
        options: ["True", "False"],
        answer: 0,
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
        accept: ["money", "it costs money"],
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
    title: "A report on the regional buses",
    genre: "monologue",
    intro: "Bölgesel otobüs şirketi raporunun meclise sunumu. Göstergeler neden işe yaramıyor?",
    gloss: [
      { de: "regional", tr: "bölgesel" },
      { de: "a region", tr: "bölge" },
      { de: "transport", tr: "taşımacılık" },
      { de: "profitable", tr: "kârlı" },
      { de: "punctuality", tr: "dakiklik" },
      { de: "an alarm", tr: "alarm" },
      { de: "a recommendation", tr: "öneri" },
      { de: "responsible", tr: "sorumlu" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Craig", text: "Good morning. I will take you through the main points of our report on the regional bus company. It is ninety pages long, so I will be brief." },
      { speaker: "Craig", text: "Chapter two describes the structural change in the region: fewer children, more older people, and new housing far from the old routes." },
      { speaker: "Craig", text: "The structural change described above threatens the core business discussed below. That core business is school transport, which still brings in almost half of its income." },
      { speaker: "Craig", text: "The distortion of competition, as noted earlier, was flagged in the feasibility study of 2019. Private coaches now take the most profitable routes, and the company keeps the rest." },
      { speaker: "Craig", text: "Chapter five looks at the performance indicators. The company measures forty of them, from punctuality to fuel use." },
      { speaker: "Craig", text: "Where the operational responsibility is unclear, the performance indicator does not help. The punctuality alarm has been red for three quarters, and nobody was sure whose job it was to act." },
      { speaker: "Craig", text: "Our first recommendation is simple. Every indicator gets the name of a person next to it, not the name of a department." },
      { speaker: "Craig", text: "Our second recommendation, discussed in chapter seven, is a new route plan for the housing areas described in chapter two." },
      { speaker: "Craig", text: "I am happy to take questions now. The full report, as noted earlier, is on your desks." },
    ],
    questions: [
      {
        text: "How long is the report?",
        options: ["ninety pages", "forty pages", "seven pages"],
        answer: 0,
        explain: "„It is ninety pages long, so I will be brief.“",
      },
      {
        text: "What brings in almost half of the income?",
        options: ["school transport", "private coaches", "new housing routes"],
        answer: 0,
        explain: "„That core business is school transport, which still brings in almost half of its income.“",
      },
      {
        kind: "truefalse",
        text: "Somebody was clearly responsible for the punctuality alarm.",
        options: ["True", "False"],
        answer: 1,
        explain: "„nobody was sure whose job it was to act.“",
      },
      {
        kind: "gapfill",
        text: "Where the operational responsibility is unclear, the performance indicator does not ___.",
        options: [],
        answer: 0,
        accept: ["help"],
        explain: "„Where the operational responsibility is unclear, the performance indicator does not help.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The structural change described above threatens the core business discussed below.", "The structural change described above threatens the core business discussed below"],
        explain: "Yukarıya ve aşağıya gönderen iki ortaç öbeği: gönderme katmanı.",
      },
      {
        kind: "short_answer",
        text: "Where is the full report?",
        options: [],
        answer: 0,
        accept: ["on your desks", "on the desks", "on their desks"],
        explain: "„The full report, as noted earlier, is on your desks.“",
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
    title: "Work, age and pensions",
    genre: "info",
    intro: "Emeklilik ve çalışma hayatı üzerine cümleler: rakamları haber diliyle yaz, sonra haber kartını doldur.",
    gloss: [
      { de: "a pension level", tr: "emekli aylığı düzeyi" },
      { de: "an intergenerational contract", tr: "kuşaklar arası sözleşme" },
      { de: "twilight years", tr: "yaşlılık günleri" },
      { de: "earmarked", tr: "tahsis edilmiş" },
      { de: "knowledge work", tr: "bilgi emeği" },
      { de: "piecework", tr: "parça başı iş" },
      { de: "shrank", tr: "küçüldü" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Emekli aylığı düzeyi düştü; yasal emeklilik yaşı düşmedi.",
        answer: "The pension level fell; the full retirement age did not.",
        hint: "Hiçbir şey silinmedi ve yine de kimse yok.",
      },
      {
        kind: "build",
        tr: "Kuşaklar arası sözleşme yaşlılık günleri, iş kendini gerçekleştirme vadediyor.",
        answer: "The intergenerational contract promises twilight years, the job self-fulfillment.",
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
        tr: "Bilgi emeği pekâlâ öz sömürüyle sonuçlanabilir.",
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
        prompt: "Emeklilik raporu için haber kartını doldur.",
        facts: "Ortalama emekli aylığı ortalama ücretin yüzde 48'inden yüzde 46'sına düştü; yasal emeklilik yaşı 67'de kaldı; emeklilik fonuna yapılan ödemeler yüzde dört arttı; yedek fon üst üste üçüncü yıl küçüldü; meclis raporu gelecek ay görüşecek.",
        fields: [
          { label: "Average pension", answer: "fell to 46 percent", accept: ["46 percent", "it fell"] },
          { label: "Full retirement age", answer: "stayed at 67", accept: ["67", "did not change"] },
          { label: "Payments into the fund", answer: "rose by four percent", accept: ["grew by four percent", "four percent"] },
          { label: "Reserve", answer: "shrank again", accept: ["shrank", "shrank for the third year"] },
          { label: "Debate in parliament", answer: "next month", accept: ["in a month"] },
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
    title: "Pressure in the university",
    genre: "info",
    intro: "Üniversitedeki baskı üzerine cümleler: bir denetim raporunun satırlarını İngilizce yaz.",
    gloss: [
      { de: "an excellence initiative", tr: "mükemmeliyet girişimi" },
      { de: "a transition rate", tr: "geçiş oranı" },
      { de: "a competitive logic", tr: "rekabet mantığı" },
      { de: "a structural change", tr: "yapısal değişim" },
      { de: "a performance indicator", tr: "performans göstergesi" },
      { de: "threatens", tr: "tehdit ediyor" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Mükemmeliyet girişimi başarılı oldu; geçiş oranı, o kadar değil.",
        answer: "The excellence initiative was a success; the transition rate, less so.",
        hint: "İlk yarıda açık bir hüküm var, ikincide yok.",
      },
      {
        kind: "build",
        tr: "Burada elit yetiştirme yok; rekabet mantığı var.",
        answer: "We have no elite formation here; we have a competitive logic.",
        hint: "Aynı nefeste yadsıma ve kabul.",
      },
      {
        kind: "build",
        tr: "Sağlıklı bir yayın baskısı, dediler, üstelik kaliteye iyi geliyor.",
        answer: "Healthy publication pressure, they said, and rather good for quality.",
        hint: "Sondaki iltifat güvenilmeyecek yer.",
      },
      {
        kind: "build",
        tr: "Yukarıda anlatılan yapısal değişim, aşağıda ele alınan ana iş kolunu tehdit ediyor.",
        answer: "The structural change described above threatens the core business discussed below.",
        hint: "Gönderme bir sözcüğe mal oluyor, okura bir sayfa kazandırıyor.",
      },
      {
        kind: "build",
        tr: "İşletme sorumluluğu belirsizse performans göstergesi işe yaramaz.",
        answer: "Where the operational responsibility is unclear, the performance indicator does not help.",
        hint: "„Where“ yer değil, durum gösteriyor.",
      },
    ],
  },
];
