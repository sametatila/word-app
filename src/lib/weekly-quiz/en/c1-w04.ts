import type { QuizWeek } from "../types";

/**
 * C1 · Hafta 4 · Teknik ve sorumluluk (İngilizce kursu).
 *
 * ÖLÇÜLEN ŞEY: sorumluluğun dilde nasıl gizlendiğini görmek. Edilgen çatı
 * bir eylemi FAİLSİZ anlatabiliyor ("mistakes were made") ve bu bir
 * dilbilgisi ayrıntısı değil, bir retorik araç. C1 okuru bunu fark
 * edebilmeli.
 *
 * `w04-r2` ve `w04-g1` birlikte çalışıyor: biri metinde failin silindiğini
 * FARK ETTİRİYOR, öteki aynı yapıyı KURDURUYOR — tanıma ile üretim aynı
 * hedefte.
 *
 * ARALIKLI TEKRAR: `w04-g3` W2'nin `modal.perfect` hedefine dönüyor;
 * `w04-g5` W1'in devrik yapı hedefini ikinci bir zarfla yokluyor.
 */
export const EN_C1_W04: QuizWeek = {
  id: "en-c1-w04",
  course: "en",
  level: "C1",
  no: 4,
  theme: "Technology and responsibility",
  themeTr: "Teknik ve sorumluluk",
  canDo: ["C1.RD.4", "C1.LS.4", "C1.GR.4", "C1.WR.3"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "News analysis",
      genreTr: "Haber analizi",
      title: "When nobody admits to deciding",
      body:
        "After the booking system failed, the first statement said that mistakes had been made. " +
        "Who made them was not mentioned. This way of putting things is common: the passive allows an event " +
        "to be described without naming anyone responsible.\n\n" +
        "Technically the cause lay in an update installed on a Friday evening. It should have been tested first, " +
        "but the step set aside for that was skipped. Whether this happened under time pressure, " +
        "or because nobody felt responsible, is still unclear.\n\n" +
        "Specialists point out, however, that the real weakness lies deeper. A system whose failure affects " +
        "thousands is said to require more than one safeguard — all the more so since warnings had been on record " +
        "for years.\n\n" +
        "Responsibility cannot be handed over to technology. It has to be assigned, and assigned before " +
        "something breaks.",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Podcast",
      genreTr: "Söyleşi programı",
      plays: 2,
      segments: [
        { speaker: "Host", text: "Mr. Novak, was this a technical failure or an organizational one?" },
        { speaker: "Novak", text: "Technically it was trivial. Organisationally it was the real problem." },
        { speaker: "Host", text: "You will have to explain that." },
        { speaker: "Novak", text: "The test was planned. What was not settled was who would carry it out." },
        { speaker: "Host", text: "So a question of responsibility." },
        { speaker: "Novak", text: "Exactly. And gaps like that only show up once something goes wrong." },
        { speaker: "Host", text: "Have lessons been learned?" },
        { speaker: "Novak", text: "Partly. The rule is on paper now. Whether it is followed, we shall see next time." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ──────────────────────────────────────────────── */
    {
      id: "en-c1-w04-r1",
      block: "read",
      ref: "t1",
      stem: "What was the technical cause of the failure?",
      options: [
        "An attack from outside",
        "A power cut on Friday evening",
        "An untested update",
        "Too many bookings at once",
      ],
      answer: 2,
      why: "\"Technically the cause lay in an update installed on a Friday evening. It should have been tested first, but the step … was skipped.\" Cuma akşamı güncellemenin ZAMANI, sebebi değil.",
      targets: ["reading.detail", "argument.cause"],
    },
    {
      id: "en-c1-w04-r2",
      block: "read",
      ref: "t1",
      stem: "Why does the text single out the phrase „mistakes had been made\"?",
      options: [
        "Because it is grammatically wrong",
        "Because it exaggerates the failure",
        "Because it is too technical",
        "Because it describes an event without naming anyone responsible",
      ],
      answer: 3,
      why: "Metin bunu doğrudan söylüyor: `the passive allows an event to be described without naming anyone responsible`. Eleştiri dil bilgisine değil, edilgen çatının FAİLİ SİLME imkânına yönelik.",
      targets: ["reading.language-critique", "passive.agentless"],
    },
    {
      id: "en-c1-w04-r3",
      block: "read",
      ref: "t1",
      stem: "Where do the specialists locate the real weakness?",
      options: [
        "In outdated software",
        "In a system depending on a single safeguard",
        "In the time pressure on staff",
        "In the delay of the public statement",
      ],
      answer: 1,
      why: "\"A system whose failure affects thousands is said to require more than one safeguard.\" Zaman baskısı metinde olası bir sebep olarak anılıyor ama uzmanların işaret ettiği yer yapısal.",
      targets: ["reading.nuance", "relative.whose"],
    },

    /* ── Dinlediğini anlama ────────────────────────────────────────────── */
    {
      id: "en-c1-w04-l1",
      block: "listen",
      ref: "a1",
      stem: "How does Mr. Novak classify the failure?",
      options: [
        "Technically trivial, organisationally serious",
        "Purely technical",
        "An unavoidable one-off",
        "The result of an attack",
      ],
      answer: 0,
      why: "\"Technically it was trivial. Organisationally it was the real problem.\" İki cümle bir karşıtlık kuruyor ve ağırlık ikincisinde — `the real problem` bunu işaretliyor.",
      targets: ["listening.stance", "discourse.contrast"],
    },
    {
      id: "en-c1-w04-l2",
      block: "listen",
      ref: "a1",
      stem: "What exactly was missing, according to Novak?",
      options: [
        "The test had not been planned",
        "There was no software for testing",
        "It was not settled who would carry out the test",
        "The test was wrongly evaluated",
      ],
      answer: 2,
      why: "\"The test was planned. What was not settled was who would carry it out.\" Yarık cümle eksiği tek noktaya kilitliyor: plan değil, SORUMLU.",
      targets: ["listening.detail", "syntax.cleft"],
    },
    {
      id: "en-c1-w04-l3",
      block: "listen",
      ref: "a1",
      stem: "How does Novak judge the lesson learned?",
      options: [
        "Fully implemented",
        "Cautiously: the rule exists, the practice is untested",
        "A failure",
        "Unnecessary",
      ],
      answer: 1,
      why: "\"The rule is on paper now. Whether it is followed, we shall see next time.\" `on paper` ile `followed` arasındaki karşıtlık temkinli bir değerlendirme kuruyor — ne onay ne ret.",
      targets: ["listening.stance", "idiom.on-paper"],
    },

    /* ── Dilbilgisi ────────────────────────────────────────────────────── */
    {
      id: "en-c1-w04-g1",
      block: "grammar",
      stem: "The passive allows an event ___ without naming anyone.",
      options: ["to describe", "describing", "being described", "to be described"],
      answer: 3,
      why: "`allow something to be done` yapısı edilgen mastar ister: olay anlatılan taraftır, anlatan değil. `to describe` etken olurdu ve olayı anlatan olayın kendisi olurdu.",
      targets: ["passive.infinitive", "passive.agentless"],
      byNative: {
        de: {
          options: ["to describe", "describing", "being described", "to be described"],
          answer: 3,
          why: "Almancada `erlauben, etwas zu schildern` etken mastarla kurulabiliyor ve edilgenlik bağlamdan anlaşılıyor. İngilizcede bu fark biçimde görünmek zorunda: `to be described`.",
        },
      },
    },
    {
      id: "en-c1-w04-g2",
      block: "grammar",
      stem: "A system ___ failure affects thousands needs more than one safeguard.",
      options: ["whose", "which", "that", "of which"],
      answer: 0,
      why: "`failure` sistemin arızası — iyelik ilişkisi. İlgi cümlesinde iyelik `whose` ile kurulur ve cansız öncüllerde de kullanılır. `of which` mümkün olsa da sözcük sırası değişirdi (`the failure of which`), şıktaki hâliyle cümleye oturmaz.",
      targets: ["relative.whose", "relative.defining"],
    },
    {
      id: "en-c1-w04-g3",
      block: "grammar",
      stem: "The update ___ tested before it was installed.",
      options: ["should be", "should have", "should have been", "should been"],
      answer: 2,
      why: "Geçmişte yapılmamış bir gerekliliği `should have been + Partizip` anlatır: test edilmeliydi ama edilmedi. `should be` şimdiki bir gerekliliktir ve olayın geçmişte kaldığını söylemez.",
      targets: ["modal.perfect", "passive.modal"],
      byNative: {
        tr: {
          options: ["should be", "should have", "should have been", "should been"],
          answer: 2,
          why: "Türkçede 'test edilmeliydi' tek bir ekle kurulur ve geçmişlik ekin içindedir. İngilizcede üç parça gerekiyor (`should` + `have` + `been`) ve öğrenci genellikle ortadakini düşürüyor.",
        },
      },
    },
    {
      id: "en-c1-w04-g4",
      block: "grammar",
      stem: "Specialists point out, ___, that the real weakness lies deeper.",
      options: ["although", "however", "despite", "whereas"],
      answer: 1,
      why: "Boşluk virgüller arasında bir ARA SÖZ; oraya yalnız zarf girer ve `however` bunu karşılar. `although` ve `whereas` yan cümle kurar, `despite` isim ister — üçü de bu konumda cümleyi bozar.",
      targets: ["discourse.marker", "connector.adverbial"],
      byNative: {
        de: {
          options: ["although", "however", "despite", "whereas"],
          answer: 1,
          why: "Almancada `indes`/`jedoch` benzer bir ara söz konumunda durabiliyor, yani sezgi doğru; tuzak İngilizcede `although`un ASLA bu konuma girememesi — o bir bağlaçtır ve arkasında cümle ister.",
        },
      },
    },
    {
      id: "en-c1-w04-g5",
      block: "grammar",
      stem: "___ do such gaps show up before something goes wrong.",
      options: ["Seldom they", "Seldom it", "Seldom there", "Seldom"],
      answer: 3,
      why: "Sınırlayıcı bir zarf başa gelince özne ile yardımcı fiil yer değiştirir ve cümle `Seldom do such gaps show up` olur. Şıklardaki öteki üçü özneyi yardımcı fiilin önünde bırakıyor, yani devrik yapıyı yarım kuruyor.",
      targets: ["syntax.inversion", "register.formal"],
    },

    /* ── Bağlamda kelime ───────────────────────────────────────────────── */
    {
      id: "en-c1-w04-v1",
      block: "vocab",
      stem: "Warnings had been ___ record for years.",
      options: ["on", "in", "at", "under"],
      answer: 0,
      why: "`on record` kayıtlı/belgeli olmak demek ve edatı sabittir. Öbek bir bütün olarak öğrenilir; `in record` ya da `under record` diye bir kalıp yoktur.",
      targets: ["collocation.fixed", "wordfield.evidence"],
    },
    {
      id: "en-c1-w04-v2",
      block: "vocab",
      stem: "The step set aside for testing was ___.",
      options: ["jumped", "passed", "skipped", "missed out"],
      answer: 2,
      why: "`skip a step` bir adımı atlamak için yerleşik fiildir. `jump` fiziksel sıçramayı, `pass` geçmeyi anlatır; `miss out` ise bir fırsatı kaçırmaktır ve nesnesi başkadır.",
      targets: ["verb.skip", "wordfield.process"],
    },
    {
      id: "en-c1-w04-v3",
      block: "vocab",
      stem: "Responsibility cannot be ___ to technology.",
      options: ["handed in", "handed over", "handed out", "handed down"],
      answer: 1,
      why: "`hand over` devretmek demek. `hand in` teslim etmek (ödev), `hand out` dağıtmak, `hand down` miras bırakmaktır — dördü de gerçek öbek, anlamı belirleyen edat.",
      targets: ["phrasal-verb.hand-over", "wordfield.responsibility"],
      byNative: {
        tr: {
          options: ["handed in", "handed over", "handed out", "handed down"],
          answer: 1,
          why: "Türkçede 'devretmek' tek fiildir ve edat seçimi diye bir adım yoktur; öğrenci `hand` fiilini doğru bulup edatı rastgele seçiyor. Deyimsel fiilde anlamı taşıyan şey edattır.",
        },
      },
    },
  ],
};
