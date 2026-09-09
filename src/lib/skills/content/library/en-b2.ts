import type { SkillExercise } from "../../types";

/**
 * EN · B2 — Beceriler kütüphanesi, ilk parti (2026-09-08).
 *
 * Alan adı `de` hedef dil (İngilizce) metnini taşır; `en` alanı yazılmaz.
 * Amerikan yazımı.
 *
 * B2'nin işi bir konumu gerekçelendirmek ve karşı tarafı hakkıyla anlatmak:
 * okuma bir yorum yazısı, dinleme iki meslektaşın anlaşamadığı bir karar,
 * yazma bir kurum adına verilen yanıt, konuşma iki taraflı bir tartışma.
 * Dil bilgisi odağı, o tartışmanın taşıyıcısı: koşul cümleleri ve „wish“.
 */
export const enB2: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-lib-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    title: "The five-star problem",
    genre: "Yorum yazısı",
    intro: "Puanlama sistemlerinin neden işe yaramaz hale geldiğini anlatan bir yorum yazısı: sorun yıldızlarda mı, bizde mi?",
    gloss: [
      { de: "rating", tr: "puanlama" },
      { de: "average", tr: "ortalama" },
      { de: "praise", tr: "övgü" },
      { de: "threshold", tr: "eşik" },
      { de: "sample", tr: "örneklem" },
      { de: "punish", tr: "cezalandırmak" },
      { de: "honest", tr: "dürüst" },
    ],
    minutes: 9,
    text:
      "THE FIVE-STAR PROBLEM\n\n" +
      "Somewhere between the taxi app and the food delivery, five stars stopped meaning „excellent“ and started " +
      "meaning „nothing went wrong.“ Ask any driver: a four-star rating is not praise. In many companies it is a " +
      "warning, and below 4.6 the account may be closed. The scale runs from one to five, but in practice it has " +
      "two positions.\n\n" +
      "This happens because we are not rating a service; we are deciding whether to punish a person. Most customers " +
      "know that a low score can cost someone their work, so they give five stars to anyone who was not rude. " +
      "The result is an average that looks precise and tells you almost nothing. If everything is 4.8, the number " +
      "is decoration.\n\n" +
      "The second problem is who writes at all. People rarely stop to praise an ordinary experience. They write when " +
      "they are angry, and sometimes when a company has asked them three times. So the ratings we read come mostly " +
      "from two groups: the furious and the reminded. Neither is a good sample.\n\n" +
      "Companies know this, and some of them have quietly moved the threshold. One hotel chain now treats anything " +
      "below nine out of ten as a complaint. Staff are trained to ask for a ten, which is why you are handed a card " +
      "explaining that „anything less than ten means we have failed.“ That sentence is not information. It is pressure, " +
      "and it turns the guest into an employee of the marketing department.\n\n" +
      "None of this means feedback is useless. Written comments still work, because they cannot be averaged. " +
      "A single sentence — „the room was clean but we could hear every door“ — carries more than three hundred " +
      "identical stars. The problem is not that people are dishonest. It is that we asked them a question with only " +
      "one acceptable answer, and then treated the answer as data.",
    questions: [
      {
        text: "What is the writer's main argument?",
        options: [
          "Star ratings have become almost meaningless because of how they are used.",
          "Customers deliberately give unfair ratings to punish companies.",
          "Companies should stop asking for feedback of any kind.",
        ],
        answer: 0,
        explain: "Yazı boyunca ölçeğin ikiye indiği, örneklemin bozuk olduğu ve baskının eklendiği anlatılıyor; son paragraf geri bildirimin kendisini savunuyor.",
      },
      {
        text: "Why do most customers give five stars?",
        options: [
          "They know a lower score can cost the worker their job.",
          "They believe the service was truly excellent.",
          "They want the company to send them a discount.",
        ],
        answer: 0,
        explain: "„a low score can cost someone their work, so they give five stars to anyone who was not rude“ — puan bir değerlendirme değil, bir karar.",
      },
      {
        kind: "truefalse",
        text: "According to the text, people who write reviews are a good sample of all customers.",
        options: ["True", "False"],
        answer: 1,
        explain: "„the ratings we read come mostly from two groups: the furious and the reminded. Neither is a good sample.“",
      },
      {
        text: "What does the writer mean by „it turns the guest into an employee of the marketing department“?",
        options: [
          "The guest is being asked to work for the company's targets.",
          "The hotel offers guests a job in marketing.",
          "Guests must fill in a form before they leave.",
        ],
        answer: 0,
        explain: "On üzerinden ondan azını şikâyet sayan bir sistemde misafirden şirketin hedefini tutturması isteniyor; cümle bunun ironisi.",
      },
      {
        kind: "gapfill",
        text: "One hotel chain treats anything below ___ out of ten as a complaint.",
        options: [],
        answer: 0,
        accept: ["nine", "9"],
        explain: "„One hotel chain now treats anything below nine out of ten as a complaint.“",
      },
      {
        kind: "short_answer",
        text: "Why does the writer think written comments still work?",
        options: [],
        answer: 0,
        accept: [
          "because they cannot be averaged",
          "they cannot be averaged",
          "because you cannot average them",
        ],
        explain: "„Written comments still work, because they cannot be averaged.“ Tek bir cümle üç yüz yıldızdan fazlasını taşıyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-lib-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    title: "Promote or hire?",
    genre: "İş görüşmesi",
    intro: "Bir müdür ve insan kaynakları sorumlusu boşalan pozisyonu tartışıyor: içeriden terfi mi, dışarıdan işe alım mı?",
    gloss: [
      { de: "promote", tr: "terfi ettirmek" },
      { de: "vacancy", tr: "açık pozisyon" },
      { de: "shortlist", tr: "kısa liste" },
      { de: "external", tr: "dışarıdan" },
      { de: "assumption", tr: "varsayım" },
      { de: "advertise", tr: "ilan vermek" },
    ],
    minutes: 9,
    segments: [
      { speaker: "Marek", text: "So, the vacancy. I want to promote Dilara. She has done half the job for eight months already, and the team trusts her." },
      { speaker: "Ana", text: "I like Dilara. But I would like to see an external shortlist as well, even if we end up choosing her." },
      { speaker: "Marek", text: "That feels like a waste of everyone's time. And if she finds out we interviewed outsiders, what does that tell her?" },
      { speaker: "Ana", text: "It tells her the role was worth a proper process. If we hand it over quietly, the other three people in the team never get to apply." },
      { speaker: "Marek", text: "Nobody else wants it. I have asked." },
      { speaker: "Ana", text: "You asked in a meeting, with you in the room. That is not the same as an open call." },
      { speaker: "Marek", text: "Fair point. But there is a cost. An external hire needs six months before they are useful. We do not have six months." },
      { speaker: "Ana", text: "Agreed, and that is a real argument for Dilara. I just want it written down as a decision, not as an assumption." },
      { speaker: "Marek", text: "What would change your mind about the shortlist?" },
      { speaker: "Ana", text: "If we advertise internally for two weeks and nobody applies, I will drop the external search completely." },
      { speaker: "Marek", text: "Two weeks I can live with. But I want to tell Dilara today that she is the strongest candidate, otherwise she will start looking elsewhere." },
      { speaker: "Ana", text: "Tell her she is the strongest candidate. Do not tell her the job is hers. Those are different sentences, and one of them we can keep." },
    ],
    questions: [
      {
        text: "What do Marek and Ana disagree about?",
        options: [
          "Whether the role should be advertised before Dilara is chosen.",
          "Whether Dilara is good enough for the job.",
          "How much the new manager should be paid.",
        ],
        answer: 0,
        explain: "Ana da Dilara'yı beğeniyor; tartışma süreç üzerine: „I would like to see an external shortlist as well, even if we end up choosing her.“",
      },
      {
        text: "Why does Ana question Marek's claim that nobody else wants the job?",
        options: [
          "Because he asked in a meeting where he was present.",
          "Because two people have already complained to her.",
          "Because the team was on holiday at the time.",
        ],
        answer: 0,
        explain: "„You asked in a meeting, with you in the room. That is not the same as an open call.“ — soru soruluş biçimi cevabı belirliyor.",
      },
      {
        kind: "truefalse",
        text: "Marek accepts that an internal advertisement is reasonable.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Two weeks I can live with.“ — Ana'nın koşullu önerisini kabul ediyor, yalnız Dilara'ya bugün konuşmak istiyor.",
      },
      {
        kind: "short_answer",
        text: "How long would an external hire need to become useful?",
        options: [],
        answer: 0,
        accept: ["six months", "6 months", "about six months"],
        explain: "„An external hire needs six months before they are useful. We do not have six months.“",
      },
      {
        kind: "dictation",
        text: "Ana'nın Dilara'ya ne söylenmesi gerektiğini ayıran son cümlesini duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: [
          "Those are different sentences, and one of them we can keep.",
          "Those are different sentences and one of them we can keep",
        ],
        explain: "„Those are different sentences, and one of them we can keep.“ — söz verilebilecek olanla verilemeyecek olanı ayırıyor.",
      },
      {
        text: "What does Ana finally agree to?",
        options: [
          "To drop the external search if nobody applies internally within two weeks.",
          "To interview three external candidates next month.",
          "To let Marek decide without any process.",
        ],
        answer: 0,
        explain: "„If we advertise internally for two weeks and nobody applies, I will drop the external search completely.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-lib-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    title: "Answering a complaint",
    genre: "Kurumsal e-posta",
    intro: "Önce iki cümle kur, sonra bir kurum adına gelen şikâyete yanıt yaz.",
    gloss: [
      { de: "delay", tr: "gecikme" },
      { de: "refund", tr: "para iadesi" },
      { de: "apologize", tr: "özür dilemek" },
      { de: "goodwill", tr: "iyi niyet" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Bize daha erken haber verselerdi, kursu ertelerdik.",
        answer: "If they had told us earlier, we would have postponed the course.",
        alternatives: ["If they had told us earlier, we would have delayed the course."],
        hint: "Geçmişe dönük gerçek dışı koşul (third conditional): if + past perfect, ana cümlede would have + past participle.",
      },
      {
        kind: "build",
        tr: "Keşke şikâyeti daha ciddiye alsaydık.",
        answer: "I wish we had taken the complaint more seriously.",
        alternatives: ["I wish that we had taken the complaint more seriously."],
        hint: "Geçmiş için pişmanlık: „wish“ + past perfect. Şimdi için olsaydı „wish“ + past simple olurdu.",
      },
      {
        kind: "free",
        prompt:
          "Bir dil okulunun ofisinde çalışıyorsun. Aşağıdaki şikâyete kurum adına yanıt yaz: sorunu kabul et, ne olduğunu açıkla, somut bir çözüm sun ve ilişkiyi koru. Suçlama ve boş vaat yok.",
        stimulus:
          "From: r.demirci@mail.com\n" +
          "Subject: Course B2.2 - three changes of teacher\n\n" +
          "Dear Sir or Madam,\n\n" +
          "I paid 480 euros for a twelve-week evening course. In eleven weeks we have had three different teachers. " +
          "Nobody told us in advance, and each teacher started again with the same unit on conditionals. " +
          "Two of them were good, but that is not the point.\n\n" +
          "I do not want a discussion about staffing. I want to know what you will do about the four weeks " +
          "we effectively repeated.\n\n" +
          "Regards,\nR. Demirci",
        checklist: [
          "Şikâyeti kendi cümlelerinle özetle ve kabul et",
          "Ne olduğunu savunmaya geçmeden açıkla",
          "Somut bir telafi sun (rakam ya da tarih içersin)",
          "İlişkiyi koruyan bir kapanış yaz",
        ],
        minWords: 90,
        phrases: [
          { de: "Thank you for taking the time to write.", tr: "Yazdığınız için teşekkür ederiz." },
          { de: "You are right that …", tr: "… konusunda haklısınız" },
          { de: "What happened was …", tr: "Yaşanan şu oldu: …" },
          { de: "As a first step, we would like to …", tr: "İlk adım olarak … istiyoruz" },
          { de: "If that does not work for you, …", tr: "Bu size uymazsa …" },
        ],
        sample:
          "Dear Ms. Demirci,\n\n" +
          "Thank you for taking the time to write, and I am sorry that you had to. You are right that three teachers " +
          "in eleven weeks is too many, and you are also right that the repeated unit is the real issue, not the staffing.\n\n" +
          "What happened was that your original teacher left at short notice in week four and her replacement was ill " +
          "in week nine. We should have sent you the course plan when the first change was made; if we had done that, " +
          "the second teacher would not have started the same unit again. That was our mistake, not yours.\n\n" +
          "As a first step, we would like to credit four sessions to your account, which you can use in any course " +
          "this year, or we can refund 160 euros directly. We will also send the full plan for the remaining weeks " +
          "tomorrow, with the name of the teacher for each date. If neither option works for you, please call me and " +
          "we will find something that does.\n\n" +
          "Kind regards,\nLeyla Arslan, Course Office",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b2-lib-s1",
    course: "en",
    level: "B2",
    skill: "speaking",
    title: "Tips or better pay?",
    genre: "Monolog",
    intro: "Bir buçuk dakikaya kadar konuşacaksın: iki tarafı da tart, sonra kendi konumunu koşuluyla söyle.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Bazı ülkelerde bahşiş maaşın bir parçası, bazılarında hiç yok. Bahşiş sistemi kalmalı mı, yoksa ücretler yükseltilip kaldırılmalı mı? İki tarafı da anlat ve kendi konumunu söyle.",
      bulletsTr: [
        "İki sistemi kısaca karşılaştır",
        "Bahşişi savunan en güçlü argümanı anlat",
        "Kaldırılmasını savunan argümanı anlat",
        "Kendi konumunu bir koşulla bitir",
      ],
      targets: [
        { de: "There are two ways of looking at this.", tr: "Buna iki türlü bakılabilir." },
        { de: "The argument in favor is that …", tr: "Lehteki argüman şu: …" },
        { de: "The problem with that is …", tr: "Bunun sorunu şu: …" },
        { de: "I would support it only if …", tr: "Bunu ancak … olursa desteklerim" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "There are two ways of looking at this. The argument in favor of tipping is that it rewards the person " +
        "in front of you, not the company. In a good week a waiter can earn far more than a fixed wage would ever " +
        "give them, and customers feel they have some control over the service they get. " +
        "The problem with that is how unequal it becomes. Research keeps showing that tips depend on things that " +
        "have nothing to do with the work: the weather, the time of day, and, uncomfortably, what the server looks " +
        "like. If your income depends on being liked, you cannot afford to correct a rude customer, and that changes " +
        "the job itself. There is also the quiet part: tipping lets the employer move a business cost onto the guest. " +
        "So I would support keeping tips only if they were genuinely extra, on top of a wage people could actually " +
        "live on. If a restaurant cannot pay that wage, the answer is not a jar by the till; the answer is a higher " +
        "price on the menu, printed honestly.",
      rubricHint:
        "İki taraf da gerekçesiyle geçmeli; sonuç bir koşula bağlanmalı (conditional yapıları beklenir).",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b2-lib-g1",
    course: "en",
    level: "B2",
    skill: "grammar",
    title: "if only we had known",
    genre: "Kural",
    intro: "Olmayanı konuşmanın dilbilgisi: şimdiki gerçek dışı, geçmişteki gerçek dışı ve ikisinin karışımı.",
    focus: "Conditionals 2-3, mixed conditionals ve wish / if only",
    gloss: [
      { de: "deadline", tr: "son tarih" },
      { de: "advertisement", tr: "ilan" },
      { de: "warn", tr: "uyarmak" },
      { de: "regret", tr: "pişman olmak" },
      { de: "shortlist", tr: "kısa liste" },
    ],
    minutes: 8,
    explanation: [
      {
        heading: "Şimdi için gerçek dışı: second conditional",
        tr: "Türkçede „-se … -ardı“ kalıbı ne yapıyorsa second conditional da onu yapar: bugün doğru olmayan bir durumu konuşur. Yapı: if + past simple, ana cümlede would + yalın fiil. Buradaki „past“ geçmişi değil, mesafeyi gösterir.",
        examples: [
          { de: "If I had more time, I would take the course.", tr: "Daha çok vaktim olsa kursa yazılırdım.", note: "vakit yok, şimdi" },
          { de: "If she were my manager, I would say it directly.", tr: "Müdürüm o olsaydı doğrudan söylerdim.", note: "resmî dilde was değil were" },
        ],
      },
      {
        heading: "Geçmiş için gerçek dışı: third conditional",
        tr: "Olmuş bitmiş bir şeyi tersine çevirir. Yapı: if + past perfect, ana cümlede would have + üçüncü hâl. Bu cümle her zaman bir pişmanlık ya da suçlama taşır, o yüzden iş yazışmasında dikkatli kullanılır.",
        examples: [
          { de: "If they had warned us, we would have changed the date.", tr: "Bizi uyarsalardı tarihi değiştirirdik." },
          { de: "I would have applied if I had seen the advertisement.", tr: "İlanı görseydim başvururdum.", note: "if yan cümlesi sonra da gelebilir" },
        ],
      },
      {
        heading: "Karışık koşul ve wish",
        tr: "Geçmişteki bir olayın bugüne uzanan sonucu varsa iki yapı karışır: if + past perfect ama would + yalın fiil. „wish“ ve „if only“ aynı mesafeyi kullanır: şimdi için past simple, geçmiş için past perfect.",
        examples: [
          { de: "If I had studied medicine, I would be a doctor now.", tr: "Tıp okusaydım şimdi doktor olurdum.", note: "geçmiş neden, bugünkü sonuç" },
          { de: "I wish I lived closer to the office.", tr: "Keşke ofise daha yakın otursam.", note: "şimdi: past simple" },
          { de: "If only we had booked earlier.", tr: "Keşke daha erken rezervasyon yapsaydık.", note: "geçmiş: past perfect" },
        ],
      },
    ],
    questions: [
      {
        text: "If I ___ more money, I would move to a bigger flat.",
        options: ["had", "have", "would have"],
        answer: 0,
        explain: "Second conditional: if yan cümlesinde past simple, ana cümlede would. „would“ if'ten sonra gelmez.",
      },
      {
        text: "Which sentence is a third conditional?",
        options: [
          "If we had left earlier, we would have caught the train.",
          "If we leave earlier, we will catch the train.",
          "If we left earlier, we would catch the train.",
        ],
        answer: 0,
        explain: "Third conditional geçmişi tersine çevirir: past perfect + would have + past participle. Diğerleri birinci ve ikinci koşul.",
      },
      {
        text: "I wish I ___ his number. I would call him now.",
        options: ["had", "have had", "would have"],
        answer: 0,
        explain: "Şimdiki bir eksiklik için „wish“ + past simple: I wish I had his number.",
      },
      {
        kind: "gapfill",
        text: "If she ___ (not / miss) the deadline, she would be on the shortlist now.",
        options: [],
        answer: 0,
        accept: ["hadn't missed", "had not missed"],
        explain: "Karışık koşul: geçmişteki neden past perfect ile, bugünkü sonuç „would be“ ile verilir.",
      },
      {
        kind: "gapfill",
        text: "If only we ___ (ask) for the plan in week four!",
        options: [],
        answer: 0,
        accept: ["had asked"],
        explain: "„if only“ geçmiş pişmanlığında past perfect ister: had asked.",
      },
      {
        kind: "gapfill",
        text: "If I were you, I ___ (accept) the offer.",
        options: [],
        answer: 0,
        accept: ["would accept", "'d accept"],
        explain: "Tavsiye kalıbı: If I were you, I would … Ana cümlede would + yalın fiil.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["If", "they", "had", "told", "us", "earlier"],
        explain: "Third conditional'ın yan cümlesi: If they had told us earlier, …",
      },
      {
        kind: "truefalse",
        text: "„If I would have known, I would have come.“ - Is this sentence correct?",
        options: ["True", "False"],
        answer: 1,
        explain: "„would“ if yan cümlesinde kullanılmaz: If I had known, I would have come.",
      },
      {
        kind: "truefalse",
        text: "„I wish I had taken that job.“ - Is this sentence correct?",
        options: ["True", "False"],
        answer: 0,
        explain: "Geçmişe dönük pişmanlık: wish + past perfect. Cümle doğru.",
      },
      {
        text: "Why do speakers often avoid third conditionals in work emails?",
        options: [
          "Because they sound like blame or regret.",
          "Because they are grammatically incorrect in formal English.",
          "Because they can only be used in spoken English.",
        ],
        answer: 0,
        explain: "„If you had told us …“ karşı tarafa yönelince suçlama gibi okunur; bu yüzden kurumsal yazıda özneyi kendine çevirmek yaygındır.",
      },
    ],
  },
];
