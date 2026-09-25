import type { QuizWeek } from "../types";

/**
 * B1 · Hafta 5 · Transfer (İngilizce kursu).
 *
 * SAF TEKRAR DEĞİL. W1–W4'ün yapıları bilerek BAŞKA metin türlerinde çıkıyor:
 * görüş bildirme görüş yazısından bir kurs YORUMUNA, dolaylı anlatım haberden
 * bir müşteri hizmetleri görüşmesine, ikinci tip koşul tavsiye köşesinden
 * puan vermeye, `despite`/`although` çevre broşüründen kişisel bir
 * değerlendirmeye taşınıyor. Aynı kuralı tanıdık bağlamın dışında da
 * kurabilmek, ezberlenmiş kalıptan ayrılan şey bu.
 *
 * ARALIKLI TEKRAR — hangi madde neye dönüyor:
 *  - `w05-g1` → W1 `present-perfect.since-for`
 *  - `w05-g2` → W1 `tense.past-vs-present-perfect`, W2 `passive.past`
 *  - `w05-g3` → W2 `reported.backshift`
 *  - `w05-g4` → W3 `conditional.second`
 *  - `w05-g5` → W4 `clause.although-despite`
 *  - `w05-v1` → W1 `falsefriend.actually`, `w05-v2` → W3 `falsefriend.become`
 *
 * ÇELDİRİCİLERİN GEREKÇESİ:
 *  - `w05-g2` (`was canceled`): Almancada `ist abgesagt worden` Perfekt'le
 *    kuruluyor ve `has been canceled` getiriyor; Türkçede `iptal edildi`
 *    edilgenliği ekle taşıyor ve `be` düşüyor.
 *  - `w05-g4` (`If … were`): Almanca `wäre` → `would be`.
 *
 * EK TEKRAR: `w05-g6` W4'ün `passive.present`, `w05-g7` W4'ün `passive.modal`
 * hedefine müşteri hizmetleri bağlamında dönüyor.
 */
export const EN_B1_W05: QuizWeek = {
  id: "en-b1-w05",
  course: "en",
  level: "B1",
  no: 5,
  theme: "Transfer: reviews and complaints",
  themeTr: "Transfer: değerlendirme ve şikâyet",
  canDo: ["B1.RD.1", "B1.LS.5", "B1.SPK.4", "B1.WR.4", "B1.GR.11", "B1.GR.14", "B1.GR.16", "B1.GR.17", "B1.GR.20"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Online review",
      genreTr: "İnternet yorumu",
      title: "Three stars: good teacher, bad organization",
      body:
        "I have taken a lot of evening courses, but this photography course was a strange experience.\n\n" +
        "Let's start with the good things. The teacher, who has worked as a photographer for 20 years, was excellent. " +
        "She explained everything clearly and gave us useful feedback on every photo. " +
        "I have learned more in ten weeks than in two years of watching videos online.\n\n" +
        "However, the organization was a disaster. The first lesson was canceled one hour before it started, and we were only told by text message. " +
        "In week four, we arrived at the room where the course usually took place and found a dance class there. " +
        "Nobody from the school said sorry.\n\n" +
        "When I complained, a man at the office said that the problems would be solved soon. They weren't. " +
        "Two students left the course in the middle, and I don't blame them.\n\n" +
        "Would I recommend it? If the school were better organized, I would give it five stars without thinking. " +
        "Although there were problems, I don't regret taking the course, because the teacher was worth it. " +
        "But if you need a reliable schedule, look somewhere else.",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Phone call",
      genreTr: "Telefon görüşmesi",
      plays: 2,
      segments: [
        { speaker: "Agent", text: "Good morning, City Internet. How can I help you?" },
        { speaker: "Ruth", text: "Hi. My internet hasn't worked since Friday. I called on Saturday, and someone said that a person would come to check it on Monday." },
        { speaker: "Agent", text: "Let me look… I'm sorry, I can see that the visit was never booked." },
        { speaker: "Ruth", text: "You're joking. I stayed at home all Monday morning." },
        { speaker: "Agent", text: "I'm really sorry. I can book a visit for tomorrow between 8 and 12." },
        { speaker: "Ruth", text: "Tomorrow I'm at work. Is there anything in the afternoon?" },
        { speaker: "Agent", text: "Thursday afternoon is possible. And because of the problem, you won't pay for this month." },
        { speaker: "Ruth", text: "Well, that's something, at least. Can you send me an email to confirm it?" },
        { speaker: "Agent", text: "Of course. It will be sent in the next hour." },
        { speaker: "Ruth", text: "Thank you. But if nobody comes on Thursday, I'll change to a different company." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ───────────────────────────────────────────────── */
    {
      id: "en-b1-w05-r1",
      block: "read",
      ref: "t1",
      stem: "What does the writer think about the teacher?",
      options: [
        "She didn't have much experience.",
        "She was very good at explaining.",
        "She was often late for the lessons.",
        "She canceled the first lesson.",
      ],
      answer: 1,
      why: "Öğretmen `Let's start with the good things` ile başlayan kısımda anlatılıyor ve orada her şey olumlu; `However` ile başlayan kısım okulun organizasyonunu anlatıyor. İlk dersin iptali okula ait bir sorun. `who has worked as a photographer for 20 years` ilgi cümlesi de deneyimin az değil çok olduğunu söylüyor.",
      targets: ["reading.opinion", "relative.who-which"],
    },
    {
      id: "en-b1-w05-r2",
      block: "read",
      ref: "t1",
      stem: "What happened in week four?",
      options: [
        "The lesson was canceled by text message.",
        "Two students left the course.",
        "The teacher did not come.",
        "Another class was in their room.",
      ],
      answer: 3,
      why: "`the room where the course usually took place` ilgi cümlesi odanın hangi oda olduğunu söylüyor, orada `a dance class` bulunuyor. SMS ile iptal ilk derse ait; iki öğrencinin ayrılması ise bir tarihe bağlanmamış. Olayları zaman işaretlerine göre eşleştirmek gerekiyor.",
      targets: ["reading.detail", "relative.where"],
    },
    {
      id: "en-b1-w05-r3",
      block: "read",
      ref: "t1",
      stem: "Who does the writer recommend the course to?",
      options: [
        "people for whom the schedule is not very important",
        "everyone, without thinking",
        "nobody at all",
        "people who prefer videos online",
      ],
      answer: 0,
      why: "`If the school were better organized, I would give it five stars` ikinci tip koşul: okul şu an iyi organize DEĞİL, yani beş yıldız yok. `without thinking` bu gerçek dışı durumun parçası. Tavsiye son cümlede bir koşulla geliyor: güvenilir bir program gerekiyorsa başka yere bakın.",
      targets: ["reading.opinion", "conditional.second"],
    },

    /* ── Dinlediğini anlama ─────────────────────────────────────────────── */
    {
      id: "en-b1-w05-l1",
      block: "listen",
      ref: "a1",
      stem: "What was Ruth told on Saturday?",
      options: [
        "Her internet would work again on Friday.",
        "Someone would come on Monday.",
        "The visit was never booked.",
        "She wouldn't pay for this month.",
      ],
      answer: 1,
      why: "`someone said that a person would come … on Monday`: cumartesi söylenen söz, `will come`un geriye kaymış hâli. Ziyaretin hiç kaydedilmediği ise BUGÜNKÜ konuşmada ortaya çıkıyor. Aktarılan söz ile gerçekte olanı ayırmak gerekiyor.",
      targets: ["listening.detail", "reported.backshift"],
    },
    {
      id: "en-b1-w05-l2",
      block: "listen",
      ref: "a1",
      stem: "When will someone come to Ruth's home?",
      options: [
        "tomorrow morning",
        "on Monday morning",
        "on Thursday afternoon",
        "on Friday",
      ],
      answer: 2,
      why: "Birkaç zaman geçiyor ama yalnız biri kabul ediliyor. Yarın sabah önerildi ve Ruth `Tomorrow I'm at work` diyerek reddetti; pazartesi hiç kaydedilmemiş eski randevu. Bir teklifin kabul edilip edilmediğine cevaba bakarak karar vermek gerekiyor.",
      targets: ["listening.detail"],
    },
    {
      id: "en-b1-w05-l3",
      block: "listen",
      ref: "a1",
      stem: "What will Ruth do if nobody comes on Thursday?",
      options: [
        "stay at home again",
        "call the company again",
        "pay for this month",
        "change to a different company",
      ],
      answer: 3,
      why: "`if nobody comes on Thursday, I'll change to a different company` birinci tip koşul: sonuç `will` ile ana cümlede. Bu ayın ücretsiz olması şirketin zaten verdiği söz, Ruth'un koşula bağladığı şey değil.",
      targets: ["listening.detail", "conditional.first"],
    },

    /* ── Dilbilgisi ─────────────────────────────────────────────────────── */
    {
      id: "en-b1-w05-g1",
      block: "grammar",
      stem: "My internet ___ since Friday.",
      options: ["didn't work", "doesn't work", "hasn't worked", "wasn't working"],
      answer: 2,
      why: "`since Friday` geçmişte başlayıp BUGÜNE kadar süren bir durumu ölçer: present perfect. `didn't work` ve `wasn't working` durumun bittiğini, `doesn't work` ise başlangıcı olmayan bir şimdiyi anlatır.",
      targets: ["present-perfect.since-for", "tense.present-perfect-vs-present"],
      byNative: {
        tr: {
          options: ["didn't work", "doesn't work", "hasn't worked", "wasn't working"],
          answer: 2,
          why: "Türkçede `cumadan beri çalışmıyor` şimdiki zamanla kuruluyor ve `doesn't work` doğal görünüyor. İngilizcede `since` ile başlangıcı verilen, bugüne süren durum present perfect ister.",
        },
        de: {
          options: ["didn't work", "doesn't work", "hasn't worked", "wasn't working"],
          answer: 2,
          why: "Almancada `Seit Freitag funktioniert mein Internet nicht` Präsens'le kuruluyor ve `seit` → `since` doğru eşleşse de zaman yanlış taşınıyor. İngilizcede `since` present perfect ister: `hasn't worked`.",
        },
      },
    },
    {
      id: "en-b1-w05-g2",
      block: "grammar",
      stem: "The first lesson ___ one hour before it started.",
      options: ["was canceled", "has been canceled", "canceled", "is canceled"],
      answer: 0,
      why: "Olay geçmişte belli bir ana bağlı (`one hour before it started`): past simple. Dersi biri iptal etti, ders bir şeyi iptal etmedi, yani edilgen: `was` + fiilin üçüncü hâli.",
      targets: ["passive.past", "tense.past-vs-present-perfect"],
      byNative: {
        tr: {
          options: ["was canceled", "has been canceled", "canceled", "is canceled"],
          answer: 0,
          why: "Türkçede `iptal edildi` edilgenliği ekle taşıyor, ayrı bir yardımcı fiil yok; bu yüzden `canceled` yetiyor gibi görünüyor. Ama o biçim etken: `ders bir şeyi iptal etti`. Edilgen `be` ister: `was canceled`.",
        },
        de: {
          options: ["was canceled", "has been canceled", "canceled", "is canceled"],
          answer: 0,
          why: "Almancada `Die erste Stunde ist abgesagt worden` Perfekt'le kuruluyor ve `has been canceled` getiriyor. İngilizcede geçmişte belli bir ana bağlı olay past simple ister; present perfect bu zaman bilgisiyle birleşmez.",
        },
      },
    },
    {
      id: "en-b1-w05-g3",
      block: "grammar",
      stem: "A man at the office said that the problems ___ solved soon, but they weren't.",
      options: ["will be", "are", "have been", "would be"],
      answer: 3,
      why: "Aktarma fiili geçmişte (`said`) ve söylenen şeyin zamanı da geçmiş (`but they weren't`): `will` bir basamak geriye kayarak `would` olur. `are` ve `have been` sözün söylendiği anı bugüne bağlar.",
      targets: ["reported.backshift", "passive.future"],
      byNative: {
        tr: {
          options: ["will be", "are", "have been", "would be"],
          answer: 3,
          why: "Türkçede `sorunların yakında çözüleceğini söyledi` gelecek ekini koruyor, aktarımda zaman değişmiyor. İngilizcede `said` geçmişte olduğu için `will` de geriye kayar: `would be solved`.",
        },
      },
    },
    {
      id: "en-b1-w05-g4",
      block: "grammar",
      stem: "If the school ___ better organized, I would give it five stars.",
      options: ["is", "will be", "were", "would be"],
      answer: 2,
      why: "İkinci tip koşul: okul şu an iyi organize DEĞİL. `if` kısmında geçmiş biçim (`were`), `would` yalnız ana cümlede. `is` ve `will be` gerçekleşebilecek bir koşul kurar.",
      targets: ["conditional.second"],
      byNative: {
        tr: {
          options: ["is", "will be", "were", "would be"],
          answer: 2,
          why: "Türkçede `okul daha düzenli olsa` fiilin zaman biçimini değiştirmiyor, bu yüzden `is` seçiliyor. İngilizcede gerçek dışı koşul geçmiş biçimle kurulur: `were`.",
        },
        de: {
          options: ["is", "will be", "were", "would be"],
          answer: 2,
          why: "Almancada `Wenn die Schule besser organisiert wäre` şart kısmında da Konjunktiv II var ve `wäre` → `would be` sanılıyor. İngilizcede `would` şart kısmına girmez; orada geçmiş biçim: `were`.",
        },
      },
    },
    {
      id: "en-b1-w05-g5",
      block: "grammar",
      stem: "___ the course was badly organized, I don't regret taking it.",
      options: ["Although", "Despite", "However", "Because of"],
      answer: 0,
      why: "Boşluktan sonra özne ve fiil geliyor (`the course was`): karşıtlık bağlacı `although`. `despite` ve `because of` arkalarından bir isim öbeği ister; `however` iki ayrı cümleyi bağlar.",
      targets: ["clause.although-despite"],
      byNative: {
        tr: {
          options: ["Although", "Despite", "However", "Because of"],
          answer: 0,
          why: "Türkçede `kötü organize edilmesine rağmen` fiili isimleştirip `-e rağmen` ekliyor, bu da `despite`ı çağırıyor. İngilizcede cümle olduğu gibi kalır ve önüne `although` gelir; `despite` yalnız isim öbeği alır.",
        },
      },
    },
    {
      id: "en-b1-w05-g6",
      block: "grammar",
      stem: "Your internet bill ___ to you by email every month.",
      options: ["sends", "is sending", "is sent", "becomes sent"],
      answer: 2,
      why: "Fatura bir şey göndermiyor, gönderiliyor: edilgen gerekiyor. Düzenli tekrarlanan bir işlem için `is` + fiilin üçüncü hâli. `sends` ve `is sending` faturayı gönderen özne yapar.",
      targets: ["passive.present"],
      byNative: {
        tr: {
          options: ["sends", "is sending", "is sent", "becomes sent"],
          answer: 2,
          why: "Türkçede `fatura her ay gönderilir` edilgenliği bir ekle taşıyor ve ayrı yardımcı fiil yok; bu yüzden `sends` yetiyor gibi görünüyor. İngilizcede edilgen `be` olmadan kurulamaz: `is sent`.",
        },
        de: {
          options: ["sends", "is sending", "is sent", "becomes sent"],
          answer: 2,
          why: "Almancada `Die Rechnung wird jeden Monat geschickt` ve `werden` = `become` diye öğrenildiği için `becomes sent` geliyor. İngilizce edilgenin yardımcı fiili `be`: `is sent`.",
        },
      },
    },
    {
      id: "en-b1-w05-g7",
      block: "grammar",
      stem: "The visit must ___ before Thursday.",
      options: ["book", "be booked", "been booked", "booked be"],
      answer: 1,
      why: "Modal fiilli edilgen: modal + `be` + fiilin üçüncü hâli. Modal fiilden sonra yalın mastar gelir, `been` değil; `book` tek başına ziyareti randevu alan özne yapar.",
      targets: ["passive.modal"],
      byNative: {
        tr: {
          options: ["book", "be booked", "been booked", "booked be"],
          answer: 1,
          why: "Türkçede `ziyaret ayarlanmalı` tek sözcük: edilgen ve gereklilik eki fiile yapışıyor. İngilizcede üç ayrı parça ve sabit bir sıra var: `must` + `be` + `booked`.",
        },
        de: {
          options: ["book", "be booked", "been booked", "booked be"],
          answer: 1,
          why: "Almancada `muss vor Donnerstag gebucht werden` sırası Partizip'i yardımcı fiilden önce koyuyor ve `booked be` üretiliyor. İngilizcede sıra ters: önce `be`, sonra fiilin üçüncü hâli.",
        },
      },
    },

    /* ── Bağlamda kelime ────────────────────────────────────────────────── */
    {
      id: "en-b1-w05-v1",
      block: "vocab",
      stem: "I thought the course would be easy. ___, it was quite hard.",
      options: ["Recently", "Actually", "Currently", "Eventually"],
      answer: 1,
      why: "Beklentiyle (`I thought …`) çelişen gerçeği `Actually` getirir. `Recently` ve `Currently` zaman bildirir; `Eventually` bir sürecin sonunu anlatır ve bütün kurs boyunca süren bir durumla uyuşmaz.",
      targets: ["falsefriend.actually"],
      byNative: {
        de: {
          options: ["Recently", "Actually", "Currently", "Eventually"],
          answer: 1,
          why: "`actually` = eigentlich, in Wirklichkeit; `aktuell` ise İngilizcede `currently`. Cümle bir beklentiyi düzeltiyor (`I thought … easy`), bir zaman bildirmiyor.",
        },
      },
    },
    {
      id: "en-b1-w05-v2",
      block: "vocab",
      stem: "I ___ a letter from the university yesterday.",
      options: ["got", "became", "made", "did"],
      answer: 0,
      why: "Size gönderilen bir şeyi almak `get`. `become` bir şey hâline gelmek demek ve nesnesi bir mektup olamaz; `made` ve `did` ise mektubu kişinin kendisinin yazdığını ya da yaptığını söylerdi.",
      targets: ["falsefriend.become"],
      byNative: {
        de: {
          options: ["got", "became", "made", "did"],
          answer: 0,
          why: "Almanca `Ich bekam einen Brief` → `I became a letter`: ses benzerliği tam burada tuzak. `become` = werden; `bekommen`in İngilizcesi `get`: `I got a letter`.",
        },
      },
    },
    {
      id: "en-b1-w05-v3",
      block: "vocab",
      stem: "There were problems, but I don't ___ taking the course.",
      options: ["miss", "complain", "blame", "regret"],
      answer: 3,
      why: "Yaptığı bir şeyden dolayı üzüntü duymamak `not regret doing`. `miss` bir şeyin yokluğunu hissetmek, `blame` birini suçlamak; `complain` ise `about` ister ve bir eylemi doğrudan nesne almaz.",
      targets: ["verb.regret"],
    },
  ],
};
