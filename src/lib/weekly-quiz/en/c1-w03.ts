import type { QuizWeek } from "../types";

/**
 * C1 · Hafta 3 · Toplum ve değişim (İngilizce kursu).
 *
 * ÖLÇÜLEN ŞEY: uzun, katmanlı cümleleri çözebilmek ve gerçekleşmemiş bir
 * durumu kurabilmek — ortaç öbekleri, tanımlamayan ilgi cümleleri ve
 * geçmişe dönük gerçek dışılık.
 *
 * ORTAÇ ÖBEĞİ (`w03-g1`) iki anadilde iki ayrı zorluk. Türkçede ortaçlı
 * niteleme isimden ÖNCE gelir ('geçen yıl yayımlanan rapor'), yani yapı
 * tanıdık ama YÖNÜ ters: İngilizcede öbek isimden sonra gelir ve öğrenci
 * onu öne almaya çalışır. Almancada uzun niteleme yine isimden önce toplanır
 * (erweitertes Partizipialattribut), yani aynı ters yön — ama Almanca
 * konuşan ayrıca ilgi cümlesine kaçma eğiliminde.
 *
 * ARALIKLI TEKRAR: `w03-g3` W1'in tanımlamayan ilgi cümlesi hedefine
 * dönüyor; `w03-g4` W2'nin `modal.perfect` hedefini gerçek dışı koşulda
 * yokluyor.
 */
export const EN_C1_W03: QuizWeek = {
  id: "en-c1-w03",
  course: "en",
  level: "C1",
  no: 3,
  theme: "Society and change",
  themeTr: "Toplum ve değişim",
  canDo: ["C1.RD.3", "C1.LS.3", "C1.GR.3", "C1.WR.2"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Essay",
      genreTr: "Deneme",
      title: "Who is moving out, and why",
      body:
        "The report on internal migration published last year paints a picture that runs against common " +
        "expectations. It is not the large cities that are growing fastest, but the towns around them.\n\n" +
        "The reasons are familiar. Rents in the centers have become unaffordable for many. " +
        "Those with children look for space; those able to work online need to be near an office less and less " +
        "often. Had anyone predicted this twenty years ago, they would probably have been laughed at.\n\n" +
        "The consequences for the receiving towns are mixed. Revenues rise, which is welcome; " +
        "but schools, doctors and bus services are lacking. Investment in infrastructure regularly lags " +
        "behind the arrival of new residents.\n\n" +
        "Should the trend continue, many small places will face a task for which they are prepared " +
        "neither in staff nor in funding.",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Interview",
      genreTr: "Söyleşi",
      plays: 2,
      segments: [
        { speaker: "Reporter", text: "Ms. Okonkwo, your town is growing fast. Are you pleased?" },
        { speaker: "Okonkwo", text: "In principle, yes. But growth on its own solves nothing; it also creates problems." },
        { speaker: "Reporter", text: "What do you have in mind?" },
        { speaker: "Okonkwo", text: "The school. We have two more classes and no room for them." },
        { speaker: "Reporter", text: "Would a new building not be the answer?" },
        { speaker: "Okonkwo", text: "If we had the money, it would already be standing. As it is, we are waiting for the region." },
        { speaker: "Reporter", text: "And if the funding does not come?" },
        { speaker: "Okonkwo", text: "Then we would have to turn children away. Nobody here wants to say that out loud." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ──────────────────────────────────────────────── */
    {
      id: "en-c1-w03-r1",
      block: "read",
      ref: "t1",
      stem: "Which finding runs against expectations?",
      options: [
        "Rents in the centers are falling",
        "Internal migration has stopped",
        "The towns around the cities grow fastest",
        "The large cities are losing no residents",
      ],
      answer: 2,
      why: "\"It is not the large cities that are growing fastest, but the towns around them.\" Yarık cümle beklentiyi ve gerçeği yan yana koyuyor; şaşırtıcı olan `but` sonrası.",
      targets: ["reading.detail", "syntax.cleft"],
    },
    {
      id: "en-c1-w03-r2",
      block: "read",
      ref: "t1",
      stem: "How does the text describe the consequences for the towns?",
      options: [
        "Clearly positive",
        "Clearly negative",
        "Without noticeable effect",
        "Mixed: higher revenues but missing services",
      ],
      answer: 3,
      why: "Metin `mixed` diyor ve iki yanı da veriyor: gelir artıyor, hizmet eksik. Tek yöne çeken bir okuma cümlenin yarısını görmezden gelmek olur.",
      targets: ["reading.evaluation", "discourse.contrast"],
    },
    {
      id: "en-c1-w03-r3",
      block: "read",
      ref: "t1",
      stem: "What does the final paragraph say about small towns?",
      options: [
        "They will certainly cope",
        "They are prepared neither in staff nor in funding",
        "They have staff but no money",
        "They refuse further arrivals",
      ],
      answer: 1,
      why: "`neither … nor` ikisini birden dışlıyor. Yalnız birini seçen şık, yapıyı yarım okumaktan geliyor — C1'de çift bağlaçlar tam okunmalı.",
      targets: ["reading.detail", "syntax.neither-nor"],
    },

    /* ── Dinlediğini anlama ────────────────────────────────────────────── */
    {
      id: "en-c1-w03-l1",
      block: "listen",
      ref: "a1",
      stem: "How does Ms. Okonkwo assess the growth?",
      options: [
        "As positive in principle, but problem-creating",
        "As a burden only",
        "As a success of her own policy",
        "As temporary",
      ],
      answer: 0,
      why: "\"In principle, yes. But growth on its own solves nothing; it also creates problems.\" `In principle` onayı sınırlıyor, `but` ikinci yarıyı açıyor — iki parça birlikte okunmalı.",
      targets: ["listening.stance", "discourse.contrast"],
    },
    {
      id: "en-c1-w03-l2",
      block: "listen",
      ref: "a1",
      stem: "Why has the new school building not been built?",
      options: [
        "Because there is no need",
        "Because the town refuses it",
        "Because the money is missing",
        "Because no site was found",
      ],
      answer: 2,
      why: "\"If we had the money, it would already be standing.\" Gerçek dışı koşul tam da paranın OLMADIĞINI söylüyor; yapının işlevi söylenmeyeni ima etmektir.",
      targets: ["listening.inference", "conditional.unreal"],
    },
    {
      id: "en-c1-w03-l3",
      block: "listen",
      ref: "a1",
      stem: "What would happen if the funding did not arrive?",
      options: [
        "The school would close",
        "The town would have to turn children away",
        "New teachers would be hired",
        "The region would take over the town",
      ],
      answer: 1,
      why: "\"Then we would have to turn children away.\" Koşullu yapı henüz gerçekleşmemiş bir sonucu anlatıyor; son cümle bunun ağırlığını taşıyor ama yeni bilgi eklemiyor.",
      targets: ["listening.inference", "conditional.unreal"],
    },

    /* ── Dilbilgisi ────────────────────────────────────────────────────── */
    {
      id: "en-c1-w03-g1",
      block: "grammar",
      stem: "Which phrase matches: „the report that was published last year\"?",
      options: [
        "the last year published report",
        "the publishing report of last year",
        "the report which publishing last year",
        "the report published last year",
      ],
      answer: 3,
      why: "Ortaç öbeği ismin ARDINDAN gelir ve ilgi cümlesini kısaltır: `the report published last year`. Ortaç edilgen anlam taşıdığı için `published`; `publishing` etken olurdu ve raporu yayımlayan raporun kendisi olurdu.",
      targets: ["participle.clause", "relative.reduced"],
      byNative: {
        tr: {
          options: [
            "the last year published report",
            "the publishing report of last year",
            "the report which publishing last year",
            "the report published last year",
          ],
          answer: 3,
          why: "Türkçede ortaçlı niteleme isimden ÖNCE gelir ('geçen yıl yayımlanan rapor'), o yüzden öbek öne alınıyor: `the last year published report`. İngilizcede tümleçli ortaç isimden sonra durur.",
        },
        de: {
          options: [
            "the last year published report",
            "the publishing report of last year",
            "the report which publishing last year",
            "the report published last year",
          ],
          answer: 3,
          why: "Almancada uzun niteleme isimden önce toplanır (`der im vergangenen Jahr veröffentlichte Bericht`), yani aynı ters yön. İngilizcede bu yapı yok; öbek isimden sonra gelir.",
        },
      },
    },
    {
      id: "en-c1-w03-g2",
      block: "grammar",
      stem: "___ anyone predicted this twenty years ago, they would have been laughed at.",
      options: ["Had", "If", "Would", "Should"],
      answer: 0,
      why: "Koşul bağlaçsız da kurulabilir; o zaman yardımcı fiil BAŞA geçer: `Had anyone predicted …`. `If` ile kurulsaydı cümle `If anyone had predicted` olurdu — iki yapı aynı anlamı taşır, ikisi birden kullanılmaz.",
      targets: ["conditional.inversion", "conditional.unreal"],
      byNative: {
        de: {
          options: ["Had", "If", "Would", "Should"],
          answer: 0,
          why: "Almancada da bağlaçsız koşul var (`Hätte jemand …`), yani yapı tanıdık; tuzak hangi yardımcı fiilin başa geçtiğinde. Geçmişe dönük gerçek dışılık `had` ile kurulur, `would` ile değil.",
        },
      },
    },
    {
      id: "en-c1-w03-g3",
      block: "grammar",
      stem: "Revenues rise, ___ is welcome, but services are lacking.",
      options: ["what", "that", "which", "it"],
      answer: 2,
      why: "Virgülden sonraki ilgi cümlesi önceki CÜMLENİN TAMAMINI önceleyebilir ve bunu yalnız `which` yapar. `that` tanımlayan ilgi cümlesinde kullanılır ve cümleyi önceleyemez.",
      targets: ["relative.non-defining", "relative.sentential"],
      byNative: {
        tr: {
          options: ["what", "that", "which", "it"],
          answer: 2,
          why: "Türkçede bu bağ 'ki' ya da ayrı bir cümleyle kurulur ve bir ilgi zamiri seçmek gerekmez; `what` en genel karşılık gibi göründüğü için seçiliyor. `what` öncülü OLMAYAN yapılarda kullanılır.",
        },
      },
    },
    {
      id: "en-c1-w03-g4",
      block: "grammar",
      stem: "They ___ been laughed at, had they said this earlier.",
      options: ["will have", "would have", "would", "had"],
      answer: 1,
      why: "Geçmişe dönük gerçek dışı sonuç `would have + Partizip` ile kurulur. `would` tek başına şimdiye ya da geleceğe bakar; `had` koşul yarısında kullanılmış durumda ve iki yarıda da tekrar edilmez.",
      targets: ["modal.perfect", "conditional.unreal"],
    },
    {
      id: "en-c1-w03-g5",
      block: "grammar",
      stem: "They are prepared ___ in staff ___ in funding.",
      options: ["either … or", "both … and", "not only … but also", "neither … nor"],
      answer: 3,
      why: "Cümle bir eksikliği anlatıyor, yani iki şeyi birden dışlayan çift bağlaç gerekiyor. Ötekiler ekleme ya da seçenek kurar ve cümleyi olumluya çevirir.",
      targets: ["syntax.neither-nor", "connector.correlative"],
    },

    /* ── Bağlamda kelime ───────────────────────────────────────────────── */
    {
      id: "en-c1-w03-v1",
      block: "vocab",
      stem: "Investment in infrastructure regularly ___ behind the arrival of new residents.",
      options: ["lags", "stays", "follows", "remains"],
      answer: 0,
      why: "`lag behind` geride kalmayı ve bunun bir KUSUR olduğunu birlikte taşır. `follow` yalnız arkadan gelmeyi anlatır, gecikme yargısı yoktur — cümledeki eleştiri o yargıda.",
      targets: ["phrasal-verb.lag-behind", "wordfield.development"],
    },
    {
      id: "en-c1-w03-v2",
      block: "vocab",
      stem: "Rents in the centers have become ___ for many households.",
      options: ["unpayable", "uncostly", "unaffordable", "unpriced"],
      answer: 2,
      why: "`unaffordable` bir kişinin gücünün yetmediğini anlatır ve konut dilinin yerleşik sözcüğüdür. `unpayable` bir borcun ödenemezliği için kullanılır; öteki ikisi kurulmuş biçimler değildir.",
      targets: ["adjective.unaffordable", "wordfield.housing"],
    },
    {
      id: "en-c1-w03-v3",
      block: "vocab",
      stem: "The report paints a picture that ___ common expectations.",
      options: ["runs from", "runs against", "runs over", "runs after"],
      answer: 1,
      why: "`run against` bir beklentiyle çelişmeyi anlatır. Öteki üçü gerçek öbekler ama bambaşka anlamlar taşır: kaçmak, ezmek, peşinden koşmak. Deyimsel fiilde anlamı edat belirler.",
      targets: ["phrasal-verb.run-against", "wordfield.evidence"],
      byNative: {
        de: {
          options: ["runs from", "runs against", "runs over", "runs after"],
          answer: 1,
          why: "Almanca `widersprechen` tek bir fiildir ve edat gerektirmez; İngilizcede anlamı taşıyan şey fiil+edat bütünü. Doğru edat seçilmezse cümle bambaşka bir şey söyler.",
        },
      },
    },
  ],
};
