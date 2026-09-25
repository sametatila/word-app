import type { QuizWeek } from "../types";

/**
 * B1 · Hafta 4 · Çevre ve toplum (İngilizce kursu).
 *
 * ÖLÇÜLEN ŞEY: bir bilgilendirme yazısında süreci (`are collected … sorted …
 * burned`), varsayımı (`if everyone used …, it could`) ve değişimi (`has
 * fallen by half`) ayırmak; bir sohbette işi kimin yapacağını ve bir sözün
 * neye bağlandığını izlemek. Dilbilgisi: şimdiki zaman ve modal fiilli
 * edilgen, `despite`/`although`.
 *
 * ARALIKLI TEKRAR: `w04-g4` W3'ün `conditional.first` hedefine, `w04-g5` W3'ün
 * `relative.who-which` hedefine yeni bir bağlamda dönüyor; `w04-l2` W2'nin
 * `passive.by` hedefini dinlemede yokluyor.
 *
 * ÇELDİRİCİLERİN GEREKÇESİ:
 *  - `w04-g2` (`can be recycled`): Almanca edilgen `werden` ile kuruluyor ve
 *    `werden` = `become` diye öğrenildiği için `can become recycled` geliyor.
 *  - `w04-g3` (`despite`): Türkçede `-e rağmen` isimle de fiille de aynı;
 *    İngilizcede isim öbeği `despite`, cümle `although` ister.
 *  - `w04-g5` (`which`): Türkçede ilgi cümlesi insanı nesneden ayırmıyor;
 *    Almanca `die` cinsiyet taşıyor ve `who` ile eşleşiyor.
 *  - `w04-v2` (`reduce`): Türkçede `azalmak`/`azaltmak` bir ekle ayrılıyor;
 *    Almancada `sinken`/`senken` → `sink`.
 */
export const EN_B1_W04: QuizWeek = {
  id: "en-b1-w04",
  course: "en",
  level: "B1",
  no: 4,
  theme: "The environment and society",
  themeTr: "Çevre ve toplum",
  canDo: ["B1.RD.3", "B1.LS.1", "B1.SPK.6", "B1.GR.17", "B1.GR.20", "B1.GR.14"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Information leaflet",
      genreTr: "Bilgilendirme broşürü",
      title: "Where does your bottle go?",
      body:
        "Every year, a huge number of plastic bottles are sold in our city. But what happens to them after you have finished your drink?\n\n" +
        "Bottles that are put in the yellow bin are collected every two weeks and taken to a recycling center outside the city. " +
        "There they are sorted by machines and cleaned. Clear plastic can be recycled several times, " +
        "but colored plastic is much harder to use again, so most of it is burned to produce energy.\n\n" +
        "Although many people recycle correctly, about a third of all bottles still go into normal rubbish bins. " +
        "This plastic is not recycled at all. The city says that if everyone used the yellow bin correctly, " +
        "it could save around 200,000 euros a year.\n\n" +
        "Since January, shops which sell drinks have had to take back empty bottles. " +
        "Customers who bring bottles back get 25 cents for each one. " +
        "Despite some complaints from small shops, the system seems to work: the number of bottles in parks has fallen by half.\n\n" +
        "Small changes make a difference. Bring your bottles back, and if you can, buy your drinks in glass.",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Conversation",
      genreTr: "Sohbet",
      plays: 2,
      segments: [
        { speaker: "Olivia", text: "Are you coming to the park cleaning day on Saturday?" },
        { speaker: "Sam", text: "I'd like to, but I have to work until two." },
        { speaker: "Olivia", text: "That's fine. It starts at ten, but people who come later can still help until five." },
        { speaker: "Sam", text: "OK. Do I need to bring anything?" },
        { speaker: "Olivia", text: "Just a bottle of water. Bags and gloves are provided by the city." },
        { speaker: "Sam", text: "Good. To be honest, I'm not sure it changes much. The park is dirty again a week later." },
        { speaker: "Olivia", text: "I know what you mean. But last time we found lots of broken glass near the playground. Children could get hurt there." },
        { speaker: "Sam", text: "That's true. Maybe the city should put more bins there." },
        { speaker: "Olivia", text: "We asked them last time, and they've promised to put four new bins next to the playground." },
        { speaker: "Sam", text: "Well, if they keep that promise, I'll come every time." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ───────────────────────────────────────────────── */
    {
      id: "en-b1-w04-r1",
      block: "read",
      ref: "t1",
      stem: "What happens to most colored plastic?",
      options: [
        "It is recycled several times.",
        "It is burned to produce energy.",
        "It is taken back to the shops.",
        "It is cleaned and sold again.",
      ],
      answer: 1,
      why: "`Clear plastic can be recycled …, but colored plastic …, so most of it is burned`: `but` iki plastik türünü ayırıyor. Defalarca geri dönüşüm şeffaf plastiğe ait. Edilgen cümlelerde öznenin hangi plastik olduğunu izlemek gerekiyor.",
      targets: ["reading.detail", "passive.present"],
    },
    {
      id: "en-b1-w04-r2",
      block: "read",
      ref: "t1",
      stem: "What would happen if everyone used the yellow bin correctly?",
      options: [
        "The city could save money.",
        "Shops would take back more bottles.",
        "No plastic would be burned.",
        "Bins would be collected every week.",
      ],
      answer: 0,
      why: "`if everyone used …, it could save …` ikinci tip koşul: şu an GERÇEK OLMAYAN bir durum (şişelerin üçte biri hâlâ çöpe gidiyor). Sonucu yalnız `could save` veriyor; öteki şıklar metinde başka cümlelere ait bilgileri bu koşula bağlıyor.",
      targets: ["reading.detail", "conditional.second"],
    },
    {
      id: "en-b1-w04-r3",
      block: "read",
      ref: "t1",
      stem: "What has changed since January?",
      options: [
        "Small shops have stopped selling drinks.",
        "Customers pay 25 cents more for a drink.",
        "The yellow bin is collected more often.",
        "There are fewer bottles in the parks.",
      ],
      answer: 3,
      why: "`has fallen by half` present perfect ile bugüne kadar olan sonucu veriyor. 25 sent müşterinin şişeyi getirince GERİ ALDIĞI para, ödediği değil. Küçük dükkânlar şikâyet etmiş ama `Despite` sistemin yine de işlediğini söylüyor.",
      targets: ["reading.detail", "tense.past-vs-present-perfect"],
    },

    /* ── Dinlediğini anlama ─────────────────────────────────────────────── */
    {
      id: "en-b1-w04-l1",
      block: "listen",
      ref: "a1",
      stem: "When can Sam help?",
      options: [
        "at ten in the morning",
        "only on Sunday",
        "in the afternoon, after work",
        "not at all",
      ],
      answer: 2,
      why: "Cevap iki bilginin birleşiminden çıkıyor: Sam ikiye kadar çalışıyor, Olivia da `people who come later can still help until five` diyor. Onda başlaması etkinliğin saati, Sam'in gelebileceği saat değil.",
      targets: ["listening.detail", "relative.who-which"],
    },
    {
      id: "en-b1-w04-l2",
      block: "listen",
      ref: "a1",
      stem: "What does Sam need to bring?",
      options: [
        "bags",
        "gloves",
        "some new bins",
        "a bottle of water",
      ],
      answer: 3,
      why: "`Bags and gloves are provided by the city`: edilgen cümlede `by` işi YAPANI veriyor, yani torba ve eldiveni şehir getiriyor. Edilgen cümlede adı geçen her şeyi dinleyene düşen bir görev sanmak tuzak.",
      targets: ["listening.detail", "passive.by"],
    },
    {
      id: "en-b1-w04-l3",
      block: "listen",
      ref: "a1",
      stem: "What will make Sam come every time?",
      options: [
        "new bins next to the playground",
        "a clean park after one week",
        "more people from the city",
        "help from children",
      ],
      answer: 0,
      why: "`if they keep that promise` birinci tip koşul ve `that promise` bir önceki replikteki söze, oyun parkına dört yeni çöp kutusu konmasına geri gönderiyor. Temiz park Sam'in şüphesiydi, şartı değil.",
      targets: ["listening.detail", "conditional.first"],
    },

    /* ── Dilbilgisi ─────────────────────────────────────────────────────── */
    {
      id: "en-b1-w04-g1",
      block: "grammar",
      stem: "Bottles in the yellow bin ___ every two weeks.",
      options: ["collect", "are collecting", "are collected", "have collected"],
      answer: 2,
      why: "Şişeler bir şey toplamıyor, toplanıyor: edilgen gerekiyor. Düzenli bir süreç için `are` + fiilin üçüncü hâli. `collect` ve `are collecting` şişeleri toplayan özne yapar.",
      targets: ["passive.present"],
      byNative: {
        tr: {
          options: ["collect", "are collecting", "are collected", "have collected"],
          answer: 2,
          why: "Türkçede `toplanır` edilgenliği bir ekle taşıyor ve ayrı bir yardımcı fiil yok; bu yüzden `collect` yetiyor gibi görünüyor. İngilizcede edilgen `be` olmadan kurulamaz: `are collected`.",
        },
      },
    },
    {
      id: "en-b1-w04-g2",
      block: "grammar",
      stem: "Clear plastic can ___ several times.",
      options: ["recycle", "be recycled", "become recycled", "recycled"],
      answer: 1,
      why: "Modal fiilli edilgen: modal + `be` + fiilin üçüncü hâli. Modal fiilden sonra her zaman yalın mastar gelir, yani `be`; `recycle` tek başına plastiği geri dönüştüren özne yapar.",
      targets: ["passive.modal", "passive.present"],
      byNative: {
        tr: {
          options: ["recycle", "be recycled", "become recycled", "recycled"],
          answer: 1,
          why: "Türkçede `geri dönüştürülebilir` tek sözcük: edilgen ve yeterlilik eki fiile yapışıyor. İngilizcede üç parça var: `can` + `be` + `recycled`. `be` düşerse cümle etken olur.",
        },
        de: {
          options: ["recycle", "be recycled", "become recycled", "recycled"],
          answer: 1,
          why: "Almancada `kann recycelt werden` ve `werden` = `become` diye öğrenildiği için `can become recycled` üretiliyor. İngilizce edilgenin yardımcı fiili `be`: `can be recycled`.",
        },
      },
    },
    {
      id: "en-b1-w04-g3",
      block: "grammar",
      stem: "___ some complaints from small shops, the system seems to work.",
      options: ["Although", "However", "Because", "Despite"],
      answer: 3,
      why: "Boşluktan sonra bir isim öbeği geliyor (`some complaints`), fiilli bir cümle değil: karşıtlık için `despite`. `although` aynı anlamı taşır ama arkasından özne ve fiil ister; `however` iki cümleyi bağlayan bir zarftır.",
      targets: ["clause.although-despite"],
      byNative: {
        tr: {
          options: ["Although", "However", "Because", "Despite"],
          answer: 3,
          why: "Türkçede `-e rağmen` hem isimle (`şikâyetlere rağmen`) hem fiille (`şikâyet etmelerine rağmen`) aynı. İngilizcede ikisi ayrı sözcük: isim öbeğinden önce `despite`, cümleden önce `although`.",
        },
      },
    },
    {
      id: "en-b1-w04-g4",
      block: "grammar",
      stem: "If they ___ that promise, I'll come every time.",
      options: ["keep", "will keep", "would keep", "kept"],
      answer: 0,
      why: "Birinci tip koşul: `if` kısmı geniş zaman, `will` yalnız ana cümlede (`I'll come`). `would keep` ve `kept` gerçek dışı bir varsayım kurar, ama söz verilmiş ve gerçekleşmesi mümkün.",
      targets: ["conditional.first"],
      byNative: {
        tr: {
          options: ["keep", "will keep", "would keep", "kept"],
          answer: 0,
          why: "Türkçede `sözlerini tutarlarsa` gelecek anlamını koşul ekiyle taşıyor ve `will keep` doğal görünüyor. İngilizcede gelecek anlamı ana cümledeki `will` ile gelir; `if` kısmı geniş zamanda kalır.",
        },
      },
    },
    {
      id: "en-b1-w04-g5",
      block: "grammar",
      stem: "Shops ___ sell drinks have to take back empty bottles.",
      options: ["who", "what", "which", "where"],
      answer: 2,
      why: "`shops` bir nesne ya da kurum, insan değil: ilgi zamiri `which`. `where` ancak ilgi cümlesi bir yer bildirseydi (`shops where you can buy drinks`) doğru olurdu; burada dükkânlar satışı yapan özne.",
      targets: ["relative.who-which"],
      byNative: {
        tr: {
          options: ["who", "what", "which", "where"],
          answer: 2,
          why: "Türkçede `içecek satan dükkânlar` yapısında insan ile nesne ayrılmıyor ve satış eylemi akla insanı getiriyor. İngilizcede zamiri öncül isim belirler: `shops` insan değil, `which`.",
        },
        de: {
          options: ["who", "what", "which", "where"],
          answer: 2,
          why: "Almancada `Läden, die Getränke verkaufen` ilgi zamiri insan ile nesneyi ayırmıyor, o yüzden bu ölçüt İngilizcede yeni. Satış eylemi akla insanı getirince `who` seçiliyor; ama zamiri öncül belirler: `shops` → `which`.",
        },
      },
    },

    /* ── Bağlamda kelime ────────────────────────────────────────────────── */
    {
      id: "en-b1-w04-v1",
      block: "vocab",
      stem: "We should use less plastic to ___ the environment.",
      options: ["prevent", "protect", "prepare", "provide"],
      answer: 1,
      why: "Çevreyi zarardan korumak `protect`. `prevent` bir şeyin olmasını ÖNLEMEK demek ve nesnesi olumsuz bir olaydır (`prevent pollution`); `prepare` hazırlamak, `provide` sağlamak.",
      targets: ["wordfield.environment"],
    },
    {
      id: "en-b1-w04-v2",
      block: "vocab",
      stem: "Shops want to ___ the number of plastic bags.",
      options: ["fall", "sink", "go down", "reduce"],
      answer: 3,
      why: "Boşluktan sonra bir nesne var (`the number`), yani fiil geçişli olmalı: `reduce`. `fall` ve `go down` geçişsizdir: sayı kendiliğinden azalır. `sink` ise geçişli olduğunda bir gemiyi batırmak gibi fiziksel bir anlam taşır, bir sayıyı nesne almaz.",
      targets: ["verb.reduce-fall"],
      byNative: {
        tr: {
          options: ["fall", "sink", "go down", "reduce"],
          answer: 3,
          why: "Türkçede `azalmak` ile `azaltmak` aynı kökten, fark yalnız bir ek. İngilizcede iki ayrı fiil var: sayı kendiliğinden `fall`/`go down`, birisi onu `reduce` eder. Burada azaltan dükkânlar.",
        },
        de: {
          options: ["fall", "sink", "go down", "reduce"],
          answer: 3,
          why: "Almancada `sinken` ile `senken` iki benzer fiil ve `sink` akla ilk geleni. İngilizce `sink` bir sayıyı nesne olarak almaz; bir sayıyı düşürmek `reduce`.",
        },
      },
    },
    {
      id: "en-b1-w04-v3",
      block: "vocab",
      stem: "It took a long time, but ___ the city found a good solution.",
      options: ["currently", "possibly", "eventually", "soon"],
      answer: 2,
      why: "`It took a long time, but …` uzun bir sürecin SONUNU işaret ediyor: `eventually`. `soon` uzun süren bir süreçle çelişir, `currently` geçmiş zamanla uyuşmaz; `possibly` ise olmuş bir şeyi belirsizleştirir.",
      targets: ["falsefriend.eventually"],
      byNative: {
        de: {
          options: ["currently", "possibly", "eventually", "soon"],
          answer: 2,
          why: "`eventually` = schließlich, am Ende; Almanca `eventuell` ise `possibly`. İkisi yan yana duruyor ve cümle uzun bir sürecin sonunu anlatıyor.",
        },
      },
    },
  ],
};
