import type { QuizWeek } from "../types";

/**
 * B2 · Hafta 4 · Ekonomi, tüketim ve etik (İngilizce kursu).
 *
 * ÖLÇÜLEN ŞEY: ücretsiz iadenin gerçek maliyeti üzerine bir yorum yazısını ve
 * telefonu tamir ettirmek üzerine bir sohbeti anlamak; `can't have`, bütün
 * cümleye gönderme yapan `, which`, deyimsel fiil `pass on`. Geri dönüş:
 * `tense.past-perfect-continuous` (W2–W3), `conditional.third` (W1–W3),
 * `modal-perfect.should-have` (W1), `style.verbal` (W1–W2), `article.abstract-noun` (W2).
 *
 * ÇELDİRİCİLERİN GEREKÇESİ:
 *  - `w04-g3` (`, which`): Almanca `…, was zu Ärger führte` bütün cümleye `was`
 *    ile gönderme yapıyor → `what`; Türk öğrenci ayrı bir cümle kurup `it`
 *    ile bağlıyor (virgül ekleme hatası).
 *  - `w04-g5` (`can't have`): Almanca `muss nicht` → `mustn't`; Türkçe '-miş
 *    olamaz' ile '-memeli' yakın düşüyor.
 *  - `w04-v2` (`actual` = real): Almanca `aktuell` → `current`, `eventuell` →
 *    `possible`; Türkçe 'aktüel' de 'güncel' anlamıyla `current`e itiyor.
 */
export const EN_B2_W04: QuizWeek = {
  id: "en-b2-w04",
  course: "en",
  level: "B2",
  no: 4,
  theme: "Economy, consumption and ethics",
  themeTr: "Ekonomi, tüketim ve etik",
  canDo: ["B2.GR.11", "B2.GR.12", "B2.GR.17", "B2.GR.19", "B2.RD.1", "B2.LS.3"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Opinion article",
      genreTr: "Yorum yazısı",
      title: "Nothing is really free",
      body:
        "Free delivery, free returns: for many online shoppers, these promises have become so normal that they are hardly noticed any more. " +
        "Yet someone always pays, and it is worth asking who.\n\n" +
        "A recent report, which was written for several consumer groups, suggests that the cost of returns has been rising steadily over the past five years. " +
        "Up to a third of all clothes bought online are said to be sent back, and many of these are never sold again. " +
        "Because checking, cleaning and packing a returned item can cost more than the item itself, some online shops are believed to destroy goods that are in perfect condition.\n\n" +
        "The shops argue that generous return policies are necessary to compete. If they had not offered free returns, they say, many customers would never have started shopping online at all. " +
        "There is some truth in this. However, the report points out that the costs are eventually passed on to all customers through higher prices, including those who never return anything.\n\n" +
        "Some companies have started to act. One British fashion company recently introduced a small fee for returns, which led to angry reactions on social media at first. " +
        "Six months later, though, its sales had hardly changed, while the number of returns had fallen by almost forty per cent.\n\n" +
        "Consumers, too, could admittedly do more. Ordering the same jacket in three sizes and keeping only one may be easy, but it is not a decision without consequences. " +
        "Maybe the most useful question to ask before clicking 'buy' is a simple one: do I actually need this?",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Conversation between flatmates",
      genreTr: "Ev arkadaşları arasında sohbet",
      plays: 2,
      segments: [
        { speaker: "Jess", text: "I've finally decided. I'm not buying the new phone." },
        { speaker: "Tom", text: "Really? You've been talking about it for weeks." },
        { speaker: "Jess", text: "I know. But I read an article about how the materials for phones are taken out of the ground, and I couldn't stop thinking about it." },
        { speaker: "Tom", text: "So you're going to keep the old one?" },
        { speaker: "Jess", text: "I'm getting the battery replaced. The repair shop says the phone will last at least another two years." },
        { speaker: "Tom", text: "How much does that cost?" },
        { speaker: "Jess", text: "About sixty pounds, compared to nine hundred for the new one. To be honest, I should have done it last year." },
        { speaker: "Tom", text: "I'm not sure it makes a big difference, though. If one person doesn't buy a phone, the companies won't even notice." },
        { speaker: "Jess", text: "Maybe not. But if millions of people had kept their phones a year longer, it would have saved a huge amount of resources." },
        { speaker: "Tom", text: "Fair point. Although repairs aren't always possible. My last laptop couldn't be fixed because the manufacturer had stopped making the parts." },
        { speaker: "Jess", text: "That's exactly the problem. Apparently there's a new law in the EU that should make companies offer parts for longer." },
        { speaker: "Tom", text: "Well, if that works, I might follow your example next time." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ───────────────────────────────────────────────── */
    {
      id: "en-b2-w04-r1",
      block: "read",
      ref: "t1",
      stem: "According to the report, what do some online shops do with returned goods?",
      options: [
        "They sell them again at lower prices in special shops.",
        "They give them to people in need through local groups.",
        "They are thought to destroy some of them, even when not damaged.",
        "They send them back to the factories that made them.",
      ],
      answer: 2,
      why: "`some online shops are believed to destroy goods` edilgen bildirme kalıbı: iddia bir kaynağa dayanıyor ama kanıtlanmış bir olgu gibi sunulmuyor. `in perfect condition` 'hasarsız' demek. İndirimli satış ve bağış metinde geçmiyor.",
      targets: ["reading.detail", "passive.reporting"],
    },
    {
      id: "en-b2-w04-r2",
      block: "read",
      ref: "t1",
      stem: "What happened after the fashion company introduced a fee for returns?",
      options: [
        "Sales fell sharply, but the number of returns stayed the same.",
        "Sales stayed almost the same, but returns dropped a lot.",
        "Customers stopped buying from the company online.",
        "The fee was removed after the angry reactions.",
      ],
      answer: 1,
      why: "`at first` öfkeli tepkinin geçici olduğunu söylüyor; asıl sonucu `Six months later, though` getiriyor. İki past perfect (`had hardly changed`, `had fallen`) altı ay sonrasına kadar olanı özetliyor. `hardly` 'neredeyse hiç' demek; kaçırılınca satışların düştüğü sanılıyor.",
      targets: ["reading.detail", "tense.past-perfect"],
    },
    {
      id: "en-b2-w04-r3",
      block: "read",
      ref: "t1",
      stem: "What is the writer's attitude towards consumers?",
      options: [
        "Consumers are not responsible for the problem at all.",
        "Consumers should stop shopping online completely.",
        "Consumers are the only ones who are to blame.",
        "Consumers share some responsibility and should think before buying.",
      ],
      answer: 3,
      why: "`could admittedly do more` ve `may be easy, but` ölçülü bir eleştiri: yazar suçlamıyor, düşünmeye çağırıyor. `admittedly` 'kabul etmek gerekir ki' anlamında iddiayı yumuşatır; onu 'kesinlikle' gibi okumak yazarın tonunu sertleştiriyor.",
      targets: ["reading.inference", "hedging.careful"],
    },

    /* ── Dinlediğini anlama ─────────────────────────────────────────────── */
    {
      id: "en-b2-w04-l1",
      block: "listen",
      ref: "a1",
      stem: "Why has Jess decided not to buy a new phone?",
      options: [
        "She read about how the materials for phones are obtained.",
        "The new phone costs nine hundred pounds.",
        "Her old phone still works perfectly.",
        "A new law does not allow it.",
      ],
      answer: 0,
      why: "Kararın gerekçesi `an article about how the materials … are taken out of the ground`. Fiyat karşılaştırması sonradan geliyor ve kararın nedeni değil. Eski telefon da kusursuz değil, pili değişecek.",
      targets: ["listening.detail"],
    },
    {
      id: "en-b2-w04-l2",
      block: "listen",
      ref: "a1",
      stem: "What does Jess regret?",
      options: [
        "buying her old phone",
        "reading the article",
        "not replacing the battery earlier",
        "spending sixty pounds",
      ],
      answer: 2,
      why: "`I should have done it last year` modal perfect ile bir pişmanlık: geçen yıl yapmalıydı ama yapmadı. `should have` 'yapmalıydı' demek; bunu ileriye dönük bir tavsiye (`should do`) gibi duymak anlamı değiştiriyor.",
      targets: ["listening.detail", "modal-perfect.should-have"],
    },
    {
      id: "en-b2-w04-l3",
      block: "listen",
      ref: "a1",
      stem: "Why couldn't Tom's laptop be repaired?",
      options: [
        "The repair would have been too expensive.",
        "The new law did not allow the repair.",
        "He decided to buy a new laptop instead.",
        "The manufacturer had stopped making the parts.",
      ],
      answer: 3,
      why: "`had stopped making the parts` past perfect: parça üretimi onarım denemesinden önce durmuştu. Yasa geleceğe dönük bir düzenleme (`should make companies offer parts`), onarımı engelleyen şey değil.",
      targets: ["listening.detail", "tense.past-perfect"],
    },

    /* ── Dilbilgisi ─────────────────────────────────────────────────────── */
    {
      id: "en-b2-w04-g1",
      block: "grammar",
      stem: "By the time the report was published, the cost of returns ___ for five years.",
      options: ["has been rising", "had been rising", "was rising", "rose"],
      answer: 1,
      why: "Geçmişteki bir ana (`By the time the report was published`) kadar süren eylem `had been + -ing` ile anlatılır. `has been rising` bugüne bağlar. Türkçe 'beş yıldır artıyordu' '-yordu' ile kurulduğu için `was rising` seçiliyor.",
      targets: ["tense.past-perfect-continuous"],
      byNative: {
        de: {
          options: ["was rising", "rose", "has been rising", "had been rising"],
          answer: 3,
          why: "Almanca `stiegen seit fünf Jahren` bir Präteritum ile kurulur ve `was rising`/`rose` diye taşınıyor. İngilizcede geçmişteki bir ana kadar süren eylem `had been rising`.",
        },
      },
    },
    {
      id: "en-b2-w04-g2",
      block: "grammar",
      stem: "If the shops ___ free returns, many customers would never have started shopping online.",
      options: ["hadn't offered", "didn't offer", "wouldn't have offered", "haven't offered"],
      answer: 0,
      why: "Gerçekleşmemiş geçmiş koşulda `if` tarafı past perfect ister: `hadn't offered`. `didn't offer` ikinci tip koşula kayar ve bugünü anlatır. Türkçe '-meseydi' geçmişi ayrı bir yardımcıyla işaretlemediği için basit geçmiş yeterli görünüyor.",
      targets: ["conditional.third"],
      byNative: {
        de: {
          options: ["wouldn't have offered", "hadn't offered", "didn't offer", "haven't offered"],
          answer: 1,
          why: "Almanca `Wenn die Läden … nicht angeboten hätten` koşul tarafında da kip taşıdığı için `wouldn't have offered` kuruluyor. İngilizcede `if` tarafı `would` almaz: `hadn't offered`.",
        },
      },
    },
    {
      id: "en-b2-w04-g3",
      block: "grammar",
      stem: "The company introduced a fee for returns, ___ led to angry reactions at first.",
      options: ["that", "what", "which", "it"],
      answer: 2,
      why: "Bütün bir cümleye gönderme yapan ek bilgi `, which` ile bağlanır. Virgülden sonra `that` gelmez; `it` ile yeni bir cümle kurmak iki ana cümleyi virgülle yan yana koyar. Türkçe 'bu da … yol açtı' ayrı bir cümle gibi düşünüldüğü için `it` seçiliyor.",
      targets: ["relative.non-defining", "relative.sentential-which"],
      byNative: {
        de: {
          options: ["what", "which", "that", "it"],
          answer: 1,
          why: "Almanca bütün cümleye `was` ile gönderme yapar (`…, was zu Ärger führte`), bu yüzden `what` seçiliyor. İngilizcede bu işi `, which` yapar; `what` ilgi zamiri olarak kullanılmaz.",
        },
      },
    },
    {
      id: "en-b2-w04-g4",
      block: "grammar",
      stem: "Which sentence would sound most natural in a company announcement?",
      options: [
        "The introduction of the implementation of a return fee has been decided upon.",
        "We have decided to charge a small fee for returns.",
        "A decision about the charging of a fee for returns has been made by us.",
        "The realisation of a return fee introduction is planned by the company.",
      ],
      answer: 1,
      why: "Duyuru dili de fiil yeğler: `We have decided to charge`. İsim zincirleri (`the introduction of the implementation`) resmîlik katmaz, okuru yorar. Türkçe resmî dildeki '-me/-ma' ile kurulmuş edilgen yapılar ('alınmasına karar verilmiştir') İngilizceye taşınınca aynı ağırlık çıkıyor.",
      targets: ["style.verbal"],
      byNative: {
        de: {
          options: [
            "A decision about the charging of a fee for returns has been made by us.",
            "The realisation of a return fee introduction is planned by the company.",
            "The introduction of the implementation of a return fee has been decided upon.",
            "We have decided to charge a small fee for returns.",
          ],
          answer: 3,
          why: "Almanca şirket dilinin isim üslubu (`Die Einführung einer Rücksendegebühr wurde beschlossen`) İngilizceye taşınınca ağır ve yapay cümleler çıkıyor. İngilizce aynı resmîliği fiille kurar: `We have decided to charge`.",
        },
      },
    },
    {
      id: "en-b2-w04-g5",
      block: "grammar",
      stem: "Sales hardly changed, so the fee ___ many customers away.",
      options: ["mustn't drive", "shouldn't have driven", "can't have driven", "didn't must drive"],
      answer: 2,
      why: "Kanıta dayanan olumsuz geçmiş çıkarım `can't have` ile kurulur: 'uzaklaştırmış olamaz'. `can't have` en güvenli olumsuz çıkarım; `mustn't` İngiliz İngilizcesinde yasak anlamına kayar ve `mustn't drive` geçmişi de taşımaz. `shouldn't have` ise bir eleştiri. Türkçe '-miş olamaz' ile '-memeli' yakın düştüğü için `mustn't` seçiliyor.",
      targets: ["modal-perfect.cant-have"],
      byNative: {
        de: {
          options: ["can't have driven", "mustn't drive", "didn't must drive", "shouldn't have driven"],
          answer: 0,
          why: "Almanca `kann … nicht vertrieben haben` doğru sezgiyi veriyor, ama `muss nicht` → `mustn't` aktarımı da güçlü. `mustn't` İngiliz İngilizcesinde yasak bildirir; güvenli olumsuz çıkarım `can't have`.",
        },
      },
    },

    /* ── Bağlamda kelime ────────────────────────────────────────────────── */
    {
      id: "en-b2-w04-v1",
      block: "vocab",
      stem: "In the end, the extra costs are ___ to all customers through higher prices.",
      options: ["passed away", "passed on", "passed out", "passed over"],
      answer: 1,
      why: "Bir maliyeti başkasına yansıtmak `pass on (to)`. `pass away` ölmek, `pass out` bayılmak, `pass over` atlamak. Türkçe 'yansıtmak' karşılığında parçacık olmadığı için parçacık tahmin ediliyor.",
      targets: ["phrasal-verb.pass-on"],
      byNative: {
        de: {
          options: ["passed over", "passed out", "passed on", "passed away"],
          answer: 2,
          why: "Almanca `Kosten abwälzen/überwälzen` 'üzerine yıkmak' anlamı `über-` önekiyle `pass over`a götürüyor; ama `pass over` 'atlamak, görmezden geçmek'. Maliyeti yansıtmak `pass on`.",
        },
      },
    },
    {
      id: "en-b2-w04-v2",
      block: "vocab",
      stem: "In \"The actual cost of a return is often higher than the price of the item\", what does \"actual\" mean?",
      options: ["current", "possible", "real", "expected"],
      answer: 2,
      why: "`actual` 'gerçek, fiilen olan' demek: iadenin görünen değil gerçek maliyeti. Türkçe 'aktüel' 'güncel' anlamında kullanıldığı için `current` seçiliyor.",
      targets: ["falsefriend.actual"],
      byNative: {
        de: {
          options: ["real", "current", "possible", "expected"],
          answer: 0,
          why: "Almanca `aktuell` 'güncel' (`current`), `eventuell` 'olası' (`possible`) demek. İngilizce `actual` ise 'gerçek'; benzer görünen sözcükler başka anlam taşıyor.",
        },
      },
    },
    {
      id: "en-b2-w04-v3",
      block: "vocab",
      stem: "Fast fashion has changed ___ society in many ways.",
      options: ["the", "a", "(no word)", "an"],
      answer: 2,
      why: "Genel anlamda kullanılan soyut isim tanımlık almaz: `society`, `nature`, `education`. Türkçede belirlilik tanımlıkla işaretlenmediği için İngilizcede genel bir anlatımda da `the` eklemek güvenli sanılıyor. `the society` belli bir topluluktan söz eder.",
      targets: ["article.abstract-noun"],
      byNative: {
        de: {
          options: ["(no word)", "the", "a", "an"],
          answer: 0,
          why: "Almanca `hat die Gesellschaft verändert` genel anlamda da artikel alır. İngilizcede genel soyut isim artikelsiz: `has changed society`.",
        },
      },
    },
  ],
};
