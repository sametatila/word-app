import type { SkillExercise } from "../../types";

/**
 * EN · C1 — Beceriler kütüphanesi, parti 19.
 *
 * Hücreyi YİRMİYE tamamlayan on partiden biri. Kurallar ve emsal:
 * `en-c1.ts` (parti 1), `en-c1-p6` … `p10` ve `data/content/SPEC.md`.
 *
 * Parti 19 kurayla seçilen yurttaş meclisi hattı: kırk sakinin kasabanın
 * sıcak hava planını hazırladığı meclis üzerine bir makale, meclisin
 * kolaylaştırıcısıyla söyleşi, üyelerden birinin sakinlere açık mektubu.
 * Dil bilgisi ön-değiştiriciler ve isim öbekleri — a two-year-old study,
 * a much-needed break, cost-cutting measures, a heat plan.
 */
export const enC1P19: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-lib-r19",
    course: "en",
    level: "C1",
    skill: "reading",
    title: "Forty Names Out of a Hat",
    genre: "article",
    intro: "Bir makale: bir kasaba sıcak hava planını kurayla seçilen kırk sakine bıraktı; nasıl çalıştılar, ne önerdiler, kim ikna olmadı.",
    gloss: [
      { de: "household", tr: "hane" },
      { de: "randomly", tr: "rastgele" },
      { de: "drawn by lot", tr: "kurayla seçilmiş" },
      { de: "income", tr: "gelir" },
      { de: "childcare", tr: "çocuk bakımı" },
      { de: "roofer", tr: "çatı ustası" },
      { de: "admission", tr: "hastaneye yatış" },
      { de: "heatwave", tr: "sıcak hava dalgası" },
      { de: "planner", tr: "şehir plancısı" },
      { de: "to favor", tr: "desteklemek" },
      { de: "shade", tr: "gölge" },
      { de: "isolated", tr: "yalnız kalmış" },
      { de: "recommendation", tr: "öneri" },
      { de: "councilor", tr: "meclis üyesi" },
      { de: "elected", tr: "seçilmiş" },
      { de: "retired", tr: "emekli" },
      { de: "rise", tr: "artış" },
      { de: "concerns", tr: "ilgili olmak" },
      { de: "typical", tr: "tipik" },
      { de: "appear", tr: "yer almak" },
      { de: "surrounding", tr: "çevredeki" },
      { de: "assembly", tr: "meclis" },
    ],
    minutes: 10,
    text:
      "Forty names out of a hat\n\n" +
      "Last spring the council of Addersley did something it had never tried before. Instead of drafting a " +
      "heat plan itself, it sent letters to eight thousand randomly chosen households and asked for volunteers. " +
      "From the six hundred who replied, forty residents were drawn by lot, balanced by age, area and income, " +
      "and given four weekends to answer a single question: how should the town prepare for summers that are " +
      "getting hotter?\n\n" +
      "The members were paid for their time, and childcare was provided on each of the eight meeting days, " +
      "which the organizers say explains why the group included two night-shift workers, a retired roofer and " +
      "several parents of small children, people who seldom appear at public meetings.\n\n" +
      "The first weekend was spent listening. Doctors described the rise in hospital admissions among older " +
      "people during last year's week-long heatwave; a planner explained why the town center stays several " +
      "degrees warmer than the surrounding fields. Only after that did the members begin to argue.\n\n" +
      "What surprised observers most was how often people changed their minds. Early votes favored " +
      "air-conditioned public buildings. By the final weekend, the assembly had moved toward cheaper and " +
      "slower measures: shade trees on the ten hottest streets, a phone list of isolated residents to be called " +
      "during heat warnings, and later opening hours for the town's two swimming pools.\n\n" +
      "The council accepted seven of the nine recommendations, and the other two are still under review. Not " +
      "everyone is convinced. A long-serving councilor argued that decisions of this kind belong to elected " +
      "members, who can be removed at the next election, while forty volunteers answer to nobody. Supporters " +
      "reply that the assembly advised and the council decided.\n\n" +
      "The harder criticism concerns the six hundred. Fewer than one letter in ten was answered, and those who " +
      "replied were more likely to be retired and to own their homes. The lottery was random; the list it drew " +
      "from was not.",
    questions: [
      {
        text: "How were the forty members chosen?",
        options: [
          "by lot from the people who replied",
          "by the council from local groups",
          "by a vote among all the households",
        ],
        answer: 0,
        explain: "Cevap veren altı yüz kişiden yaş, bölge ve gelire göre dengelenerek kurayla seçildiler.",
      },
      {
        text: "Why did the group include people who seldom attend public meetings?",
        options: [
          "The meetings were held online at night.",
          "Members were paid and childcare was provided.",
          "The council invited each of them personally.",
        ],
        answer: 1,
        explain: "Düzenleyicilere göre ücret ve sekiz toplantı gününün hepsinde sağlanan çocuk bakımı bunu açıklıyor.",
      },
      {
        kind: "truefalse",
        text: "Early votes favored shade trees on the hottest streets.",
        options: ["True", "False"],
        answer: 1,
        explain: "İlk oylamalar klimalı kamu binalarından yanaydı; ağaçlar son hafta sonunda öne çıktı.",
      },
      {
        kind: "gapfill",
        text: "The council accepted seven of the ___ recommendations.",
        options: [],
        answer: 0,
        accept: ["nine", "9"],
        explain: "„The council accepted seven of the nine recommendations“; öteki ikisi hâlâ inceleniyor.",
      },
      {
        kind: "short_answer",
        text: "How many weekends were the members given?",
        options: [],
        answer: 0,
        accept: ["four", "4", "four weekends"],
        explain: "„given four weekends to answer a single question“ — toplam sekiz toplantı günü.",
      },
      {
        text: "What is the harder criticism mentioned at the end?",
        options: [
          "The councilors ignored most of the results.",
          "The experts were chosen by the council itself.",
          "Those who replied were not typical of the town.",
        ],
        answer: 2,
        explain: "Mektupların onda birinden azı yanıtlandı ve yanıtlayanlar daha çok emekli ev sahipleriydi.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-lib-l19",
    course: "en",
    level: "C1",
    skill: "listening",
    title: "What Happens in the Room",
    genre: "interview",
    intro: "Kurayla seçilen meclisi yöneten kolaylaştırıcıyla söyleşi: kimin konuştuğu nasıl dengelendi, uzmanları kim seçti, anlaşmazlık nasıl kayda geçti.",
    gloss: [
      { de: "confident", tr: "kendinden emin" },
      { de: "to nod", tr: "başını sallamak" },
      { de: "session", tr: "oturum" },
      { de: "steering group", tr: "yönlendirme grubu" },
      { de: "on principle", tr: "ilke olarak" },
      { de: "one-sided", tr: "tek taraflı" },
      { de: "to spot", tr: "fark etmek" },
      { de: "automatically", tr: "kendiliğinden" },
      { de: "minority", tr: "azınlık" },
      { de: "unanimous", tr: "oy birliğiyle alınmış" },
      { de: "popular", tr: "sevilen" },
      { de: "roofer", tr: "çatı ustası" },
      { de: "retired", tr: "emekli" },
      { de: "childish", tr: "çocukça" },
      { de: "reasonably", tr: "haklı olarak" },
      { de: "assembly", tr: "meclis" },
    ],
    minutes: 10,
    segments: [
      { speaker: "Host", text: "You ran the forty-member assembly in Addersley. What is the first problem you face when strangers sit down together?" },
      { speaker: "Ms Okafor", text: "That the confident ones start talking and the rest decide, quite reasonably, to let them. Within an hour you can have a room where five people speak and thirty-five nod." },
      { speaker: "Host", text: "How do you stop that?" },
      { speaker: "Ms Okafor", text: "Small tables of six, a new mix every session, and a rule that everyone at the table speaks once before anyone speaks twice. It sounds childish. It works surprisingly well." },
      { speaker: "Host", text: "Who chose the experts?" },
      { speaker: "Ms Okafor", text: "A steering group that included two people who oppose assemblies on principle. We wanted someone whose job was to spot a one-sided list before the members did." },
      { speaker: "Host", text: "Did the members trust what they heard?" },
      { speaker: "Ms Okafor", text: "Not automatically, and I was glad. The best question of the whole process came from a retired roofer, who asked a doctor how many of last summer's admissions were people living alone." },
      { speaker: "Host", text: "And the answer?" },
      { speaker: "Ms Okafor", text: "Nearly two-thirds. That single figure moved the group away from air-conditioned buildings and toward phoning people at home. Nobody had planned for that question." },
      { speaker: "Host", text: "What happens when the group can't agree?" },
      { speaker: "Ms Okafor", text: "We don't force it. The final report records every vote and includes a minority statement, written by the members who disagreed, in their own words and at the same length." },
      { speaker: "Host", text: "Isn't that a way of avoiding a decision?" },
      { speaker: "Ms Okafor", text: "I'd say the opposite. A council reading a unanimous report learns what forty people concluded. A report with a minority statement also tells it where the argument is still open." },
    ],
    questions: [
      {
        text: "What is the first problem Ms Okafor describes?",
        options: [
          "Confident people talk and the others let them.",
          "Members arrive without having read the papers.",
          "Strangers refuse to sit at the same tables.",
        ],
        answer: 0,
        explain: "Kendinden emin olanlar konuşuyor, ötekiler onlara bırakıyor: beş kişi konuşur, otuz beşi başını sallar.",
      },
      {
        text: "Why did the steering group include opponents of assemblies?",
        options: [
          "to make the final report more popular",
          "to spot a one-sided list of experts",
          "to replace members who left early",
        ],
        answer: 1,
        explain: "Tek taraflı bir uzman listesini üyelerden önce fark edecek biri odada olsun istediler.",
      },
      {
        kind: "truefalse",
        text: "Ms Okafor admits that the table rule sounds childish.",
        options: ["True", "False"],
        answer: 0,
        explain: "„It sounds childish. It works surprisingly well.“",
      },
      {
        kind: "gapfill",
        text: "Nearly ___ of last summer's admissions were people living alone.",
        options: [],
        answer: 0,
        accept: ["two-thirds", "two thirds"],
        explain: "„Nearly two-thirds.“ — bu tek rakam grubu evdeki insanları aramaya yöneltti.",
      },
      {
        kind: "short_answer",
        text: "Who writes the minority statement?",
        options: [],
        answer: 0,
        accept: ["the members who disagreed", "members who disagreed", "the members who disagree", "those who disagreed"],
        explain: "„written by the members who disagreed, in their own words and at the same length“.",
      },
      {
        text: "What does a minority statement tell the council, according to Ms Okafor?",
        options: [
          "which members missed the meetings",
          "how long the meetings really lasted",
          "where the argument is still open",
        ],
        answer: 2,
        explain: "Oy birliğiyle yazılmış rapor sonucu, azınlık görüşlü rapor tartışmanın nerede açık kaldığını da söyler.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-lib-w19",
    course: "en",
    level: "C1",
    skill: "writing",
    title: "To Residents Who Were Not in the Room",
    genre: "letter",
    intro: "Kurayla seçilen meclisin bir üyesisin ve toplantılarda bulunmayan sakinlere açık mektup yazıyorsun: önce iki cümle kur, sonra önerileri ve karşı görüşü dürüstçe anlatan bir mektup yaz.",
    gloss: [
      { de: "invitation", tr: "davet" },
      { de: "to summarize", tr: "özetlemek" },
      { de: "in full", tr: "eksiksiz" },
      { de: "to deserve", tr: "hak etmek" },
      { de: "fully grown", tr: "tam boyuna ulaşmış" },
      { de: "to volunteer", tr: "gönüllü olmak" },
      { de: "shade trees", tr: "gölge ağaçları" },
    ],
    minutes: 16,
    tasks: [
      {
        kind: "build",
        tr: "Geriye bakınca sekiz günlük süreç çoğumuzun beklediğinden daha zordu.",
        answer: "Looking back, the eight-day process was harder than most of us expected.",
        alternatives: ["The eight-day process was harder than most of us expected, looking back."],
        hint: "Sayı + isim ismin önüne geçince isim tekil kalır ve tireyle bağlanır: „eight-day“.",
      },
      {
        kind: "build",
        tr: "Gölge ağaçları çok ihtiyaç duyulan ama yavaş bir çözüm.",
        answer: "Shade trees are a much-needed but slow solution.",
        alternatives: ["Shade trees are a slow but much-needed solution."],
        hint: "Zarf + üçüncü hâl ismin önünde tireyle birleşir: „much-needed“.",
      },
      {
        kind: "free",
        prompt:
          "Kurayla seçilen meclisin bir üyesi olarak toplantılarda bulunmayan sakinlere açık bir mektup yaz: kendini ve nasıl seçildiğini kısaca anlat, önerilerden en az ikisini gerekçesiyle açıkla, karşı çıkan üyelerin görüşünü hakkıyla aktar ve sakinleri somut bir şey yapmaya davet et.",
        checklist: [
          "Kendini ve nasıl seçildiğini anlat",
          "En az iki öneriyi gerekçesiyle açıkla",
          "Karşı görüşü hakkıyla aktar",
          "Sakinleri somut bir şeye davet et",
        ],
        minWords: 160,
        phrases: [
          { de: "I was one of the forty residents who …", tr: "… kırk sakinden biriydim.", en: "" },
          { de: "Our first recommendation is …, because …", tr: "İlk önerimiz …, çünkü …", en: "" },
          { de: "Not all of us agreed. Those who disagreed argued that …", tr: "Hepimiz aynı fikirde değildik. Karşı çıkanlar … diye savundu.", en: "" },
          { de: "a much-needed …", tr: "çok ihtiyaç duyulan bir …", en: "" },
          { de: "If you would like to …, …", tr: "… isterseniz …", en: "" },
        ],
        sample:
          "To the residents of Addersley\n\n" +
          "I was one of the forty residents whose names were drawn last spring, and I am writing to those of you " +
          "who were not in the room, which is almost everyone. I drive a bus for a living, I had never been to a " +
          "council meeting, and I very nearly threw the invitation away.\n\n" +
          "Our first recommendation is a phone list for people who live alone. Most of the people taken to hospital " +
          "during last summer's heat were older residents on their own, and a daily call on the worst days costs " +
          "almost nothing. Our second is planting trees along the town's hottest streets. They are a much-needed " +
          "but slow solution, and we chose them knowing that some of us will be old ourselves before they are " +
          "fully grown.\n\n" +
          "Not all of us agreed. Those who disagreed argued for cooled rooms in the library and the sports hall, " +
          "because trees do nothing for anyone next July. Their statement is printed in full in the report, and I " +
          "think it deserves to be read rather than summarized by me.\n\n" +
          "If you would like to volunteer for the phone list, the council is looking for about sixty people. The " +
          "eight-day process was harder than most of us expected, but this part takes ten minutes a week.\n\n" +
          "Yours,\nDaniel Price",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-c1-lib-s19",
    course: "en",
    level: "C1",
    skill: "speaking",
    title: "Should Citizens Chosen by Lot Make Decisions?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: kurayla seçilen yurttaşlar kamusal kararlarda ne kadar söz sahibi olmalı?",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Bazı kamusal kararlar kurayla seçilen yurttaşlara bırakılmalı mı? Konumunu söyle, bu yöntemin seçilmiş temsilcilerin yapamadığı neyi yapabildiğini adlandır, en güçlü itirazı kabul et ve yöntemin hangi tür kararlarla sınırlı kalması gerektiğini söyle.",
      bulletsTr: [
        "Konumunu tek cümleyle söyle",
        "Yöntemin neyi farklı yapabildiğini adlandır",
        "En güçlü itirazı kabul et",
        "Yöntemi hangi kararlarla sınırlayacağını söyle",
      ],
      targets: [
        { de: "I would give them a real role, but a clearly limited one.", tr: "Onlara gerçek ama sınırları açık bir rol verirdim." },
        { de: "What a randomly chosen group can do that elected members cannot is …", tr: "Rastgele seçilmiş bir grubun, seçilmiş temsilcilerin yapamayıp kendisinin yapabildiği şey …" },
        { de: "The strongest objection is that …, and I think it is partly right.", tr: "En güçlü itiraz şu: … ve bence kısmen haklı." },
        { de: "I would keep it to long-term questions, such as …", tr: "Bunu … gibi uzun vadeli sorularla sınırlı tutardım." },
      ],
      minSeconds: 60,
      maxSeconds: 100,
      sampleDe:
        "I would give citizens chosen by lot a real role in public decisions, but a clearly limited one. " +
        "What a randomly chosen group can do that elected members cannot is ignore the next election. A " +
        "councilor with a four-year term has every reason to avoid a slow, unpopular measure whose benefits " +
        "arrive after she has gone. Forty residents who will never stand for office can afford to think about " +
        "the town in twenty years. " +
        "They also bring people into the room who are usually missing from decision-making: shift workers, " +
        "young parents, people who would never join a party. " +
        "The strongest objection is that nobody can vote them out, and I think it is partly right. If a group " +
        "of volunteers makes a bad decision, there is no one to hold responsible. That is why I would leave " +
        "the final word with elected members and ask them to publish a written reply to every recommendation " +
        "they reject. " +
        "I would keep it to long-term questions, such as adapting to hotter summers, housing or the future of " +
        "a hospital, rather than day-to-day budgets. Those are exactly the questions that short electoral " +
        "cycles handle worst, and where a well-prepared group of ordinary people has the most to add.",
      rubricHint:
        "Bir konum, yöntemin ayırt edici katkısı, hesap verebilirlik itirazının kabulü ve açık bir sınır beklenir; „a four-year term“, „long-term questions“, „a well-prepared group“ gibi ön-değiştiricili isim öbekleri kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-c1-lib-g19",
    course: "en",
    level: "C1",
    skill: "grammar",
    title: "a two-year-old study, a much-needed break",
    genre: "grammar",
    intro: "İngilizce bilgiyi ismin önüne yığar: Türkçede bir yan cümleyle söylenecek şey tek bir tireli öbeğe sığar.",
    focus: "Ön-değiştiriciler ve isim öbekleri: sayı + isim (a two-year-old study), zarf + üçüncü hâl (a much-needed break), isim + -ing (cost-cutting measures), isim + isim (a heat plan)",
    gloss: [
      { de: "assembly", tr: "meclis" },
      { de: "measure", tr: "önlem" },
      { de: "to reject", tr: "reddetmek" },
      { de: "to await", tr: "beklemek" },
      { de: "heat", tr: "sıcak hava" },
    ],
    minutes: 12,
    explanation: [
      {
        heading: "Sayı + isim: tekil ve tireli",
        tr: "Bir sayı ile bir isim ismin önüne sıfat olarak geçince isim tekil kalır ve öğeler tireyle bağlanır: „a study that is two years old“ → „a two-year-old study“, „a report of forty pages“ → „a forty-page report“. „a two-years-old study“ yanlıştır. Aynı bilgi fiilden sonra gelirse isim çoğul olur ve tire düşer: „The study is two years old.“",
        examples: [
          { de: "It was a forty-member assembly.", tr: "Kırk üyeli bir meclisti.", note: "member tekil" },
          { de: "They relied on a two-year-old study.", tr: "İki yıllık bir çalışmaya dayandılar.", note: "önde: tireli" },
          { de: "The study is two years old.", tr: "Çalışma iki yıllık.", note: "fiilden sonra: çoğul, tiresiz" },
        ],
      },
      {
        heading: "Zarf + üçüncü hâl ve isim + -ing",
        tr: "„much“, „well“, „long“ gibi bir sözcük üçüncü hâlle birleşip ismin önüne gelir: „a much-needed break“, „a long-awaited report“, „a well-attended meeting“. İsim + -ing ise bir işi yapan şeyi adlandırır: „cost-cutting measures“ (maliyeti düşüren önlemler), „decision-making“, „time-consuming“. Bu öbekler fiilden sonra geçince çoğu zaman tiresiz yazılır: „The break was much needed.“",
        examples: [
          { de: "We took a much-needed break.", tr: "Çok ihtiyaç duyulan bir mola verdik.", note: "much + needed" },
          { de: "The council rejected the cost-cutting measures.", tr: "Meclis maliyeti düşüren önlemleri reddetti.", note: "isim + -ing" },
          { de: "The meeting was well attended.", tr: "Toplantıya katılım iyiydi.", note: "fiilden sonra: tiresiz" },
        ],
      },
      {
        heading: "İsim + isim: ilk isim sıfat gibi çalışır",
        tr: "İki isim yan yana gelince ilki ikincisini niteler ve genelde tekil kalır: „a heat plan“, „a council meeting“, „a phone list“. Asıl anlamı son isim taşır: „a phone list“ bir listedir. Öbek üç dört isme uzayabilir ama haber ve rapor dilinde bile ikiden fazlası okuru yorar; o zaman öbeği „of“ ya da bir yan cümleyle açmak daha anlaşılırdır.",
        examples: [
          { de: "the town's heat plan", tr: "kasabanın sıcak hava planı", note: "heat: niteleyen isim" },
          { de: "a phone list for people living alone", tr: "yalnız yaşayanlar için bir telefon listesi", note: "phone tekil" },
          { de: "a review of the plan for the town center", tr: "kasaba merkezine yönelik planın gözden geçirilmesi", note: "uzun yığını of ile açmak" },
        ],
      },
    ],
    questions: [
      {
        text: "They relied on a ___ study.",
        options: ["two-years-old", "two-year-old", "two year olds"],
        answer: 1,
        explain: "İsmin önündeki sayı + isim tekil ve tirelidir: „two-year-old“.",
      },
      {
        text: "Which phrase means “a report of forty pages”?",
        options: ["a forty-pages report", "a report forty-page", "a forty-page report"],
        answer: 2,
        explain: "Sayı + isim ön-değiştiricide isim tekil kalır ve ismin önüne gelir.",
      },
      {
        text: "The council rejected the ___ measures.",
        options: ["cost-cutting", "cost-cut", "costs-cutting"],
        answer: 0,
        explain: "İsim + -ing bir işi yapan şeyi adlandırır ve ilk isim tekil kalır.",
      },
      {
        kind: "gapfill",
        text: "After the first weekend we took a much-___ break. (need)",
        options: [],
        answer: 0,
        accept: ["needed"],
        explain: "Zarf + üçüncü hâl: „a much-needed break“.",
      },
      {
        kind: "gapfill",
        text: "It had forty members, so it was a forty-___ assembly.",
        options: [],
        answer: 0,
        accept: ["member"],
        explain: "Ön-değiştiricide isim çoğul eki almaz: „forty-member“.",
      },
      {
        kind: "gapfill",
        text: "Everyone had been waiting for it: the report was long ___. (await)",
        options: [],
        answer: 0,
        accept: ["awaited"],
        explain: "Fiilden sonra tiresiz: „long awaited“; ismin önünde „a long-awaited report“.",
      },
      {
        kind: "gapfill",
        text: "A plan that prepares a town for hot summers is a ___ plan.",
        options: [],
        answer: 0,
        accept: ["heat", "heatwave"],
        explain: "İsim + isim: ilk isim („heat“) ikincisini („plan“) niteler.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["It was", "a well-attended", "public", "meeting"],
        explain: "Tireli ön-değiştirici öteki niteleyicilerden önce, isim en sonda.",
      },
      {
        kind: "truefalse",
        text: "“The study is two-years-old.” — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "Fiilden sonra isim çoğul ve tiresiz olur: „two years old“.",
      },
      {
        kind: "truefalse",
        text: "“a phone list” öbeğinde asıl isim “list”tir.",
        options: ["True", "False"],
        answer: 0,
        explain: "İsim + isim öbeğinde asıl anlamı son isim taşır; „phone“ onu niteler.",
      },
    ],
  },
];
