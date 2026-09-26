import type { QuizWeek } from "../types";

/**
 * B2 · Hafta 1 · İş yerinde iletişim ve müzakere (İngilizce kursu).
 *
 * ÖLÇÜLEN ŞEY: bir müzakere sonrası ekip e-postasını ve tedarikçiyle bir
 * telefon pazarlığını anlamak; past perfect, üçüncü tip koşul, `should have`,
 * tanımlamayan ilgi cümlesi, deyimsel fiiller. B2'de ölçülen kural bilgisi
 * değil anadilin üslubuna direnmek: en az bir madde (`w01-g5`) Almancanın
 * isimleştirme eğiliminin İngilizceye taşınmasını ölçüyor.
 *
 * ÇELDİRİCİLERİN GEREKÇESİ. Bu kursta anadiller `tr` (taban) ve `de`:
 *  - `w01-g5` (fiil üslubu): Almanca konuşan resmîliği isimle kuruyor ("the
 *    making of a decision"); İngilizce aynı resmîliği fiille verir. Türk
 *    öğrencide `-me/-ma` edilgen isimleştirmesi benzer bir ağırlık üretiyor.
 *  - `w01-g2` (`had checked`): Almanca `hätten … geprüft` koşul tarafında da kip
 *    taşıyor → `would have checked`; Türk öğrenci basit geçmişe (`checked`) kayıyor.
 *  - `w01-v1`/`v2` (`put off`, `turn out`): Türkçede karşılık yok, parçacık tahmin
 *    ediliyor; Almanca ayrılabilir önekler harfiyen eşleniyor.
 *  - `w01-v3` (`chef`): Almanca `Chef` = patron için sahte dost; Türkçe
 *    'şef' de aynı yöne itiyor.
 */
export const EN_B2_W01: QuizWeek = {
  id: "en-b2-w01",
  course: "en",
  level: "B2",
  no: 1,
  theme: "Communication and negotiation at work",
  themeTr: "İş yerinde iletişim ve müzakere",
  canDo: ["B2.GR.11", "B2.GR.12", "B2.GR.17", "B2.GR.19", "B2.RD.2", "B2.LS.5"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Team email",
      genreTr: "Ekip e-postası",
      title: "Update on the Hartley contract",
      body:
        "Hi everyone,\n\n" +
        "I wanted to give you a quick update on yesterday's meeting with Hartley Logistics, which, as most of you know, had been put off twice.\n\n" +
        "When we arrived, it was clear that their team had already discussed our proposal in detail. " +
        "Their finance director, who had joined the company only a month earlier, raised a number of concerns that none of us had expected. " +
        "In particular, she argued that our delivery schedule was not realistic and that the price should be reduced by ten percent.\n\n" +
        "Looking back, we should have prepared more carefully. If we had checked their latest annual report, we would have seen that they have been cutting costs in every department. " +
        "That said, the meeting went better than I had feared. After a long discussion, we agreed on a compromise: we will keep the original price, but we will deliver the first phase two weeks later than planned. " +
        "In return, Hartley will pay forty percent of the fee in advance.\n\n" +
        "A few points are still open. Their legal team has been reviewing the contract since Monday, and they have asked us not to make any public announcement until it is signed. " +
        "I would therefore ask you not to mention the deal to anyone outside the project team.\n\n" +
        "This is probably the most important contract we have won this year, so thank you all for the work you have been putting in over the last few weeks. I'll keep you updated.\n\n" +
        "Best wishes,\nLaura",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Phone call",
      genreTr: "Telefon görüşmesi",
      plays: 2,
      segments: [
        { speaker: "Mark", text: "Hi Sophie, thanks for calling back. I'm afraid I've got some bad news about your order." },
        { speaker: "Sophie", text: "Oh no. Don't tell me it's going to be late again." },
        { speaker: "Mark", text: "Unfortunately, yes. Our main supplier has been having problems with one of its machines since last week, so we won't be able to deliver on Friday." },
        { speaker: "Sophie", text: "That's really difficult for us. We've already promised the goods to our own customers." },
        { speaker: "Mark", text: "I completely understand. What if we sent half of the order on Friday and the rest a week later?" },
        { speaker: "Sophie", text: "Half might work, but only if the delay isn't longer than a week. Can you guarantee that?" },
        { speaker: "Mark", text: "I can't guarantee it, but I'm quite sure. The engineers are said to be almost finished with the repair." },
        { speaker: "Sophie", text: "Quite sure isn't really enough. If this happens again, we'll have to look for another supplier." },
        { speaker: "Mark", text: "That's fair. As an apology, we could cover the shipping costs for both deliveries." },
        { speaker: "Sophie", text: "OK, that would help. Could you put that in writing, please?" },
        { speaker: "Mark", text: "Of course. I'll email you this afternoon with the new dates and the offer." },
        { speaker: "Sophie", text: "Thanks, Mark. And please let me know right away if anything changes." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ───────────────────────────────────────────────── */
    {
      id: "en-b2-w01-r1",
      block: "read",
      ref: "t1",
      stem: "Why was the meeting more difficult than expected?",
      options: [
        "The meeting had been postponed twice before it finally took place.",
        "Hartley's team had not read the proposal before the meeting.",
        "The new finance director raised concerns nobody had expected.",
        "Hartley's legal team refused to sign the contract.",
      ],
      answer: 2,
      why: "Asıl zorluğu `raised a number of concerns that none of us had expected` anlatıyor. İki kez ertelenmesi toplantıdan önceki bir durum (past perfect `had been put off`). Karşı tarafın öneriyi okumamış olması ise metnin tam tersi (`had already discussed our proposal`).",
      targets: ["reading.detail", "tense.past-perfect"],
    },
    {
      id: "en-b2-w01-r2",
      block: "read",
      ref: "t1",
      stem: "What did the two companies agree on?",
      options: [
        "a ten percent price reduction and a faster delivery schedule",
        "a public announcement as soon as the meeting was over",
        "a lower price in exchange for an earlier first delivery",
        "the same price, a later first delivery and payment in advance",
      ],
      answer: 3,
      why: "Yüzde on indirim karşı tarafın talebiydi (`argued that … should be reduced`). Sonuç `we agreed on a compromise` cümlesinden sonra geliyor: fiyat aynı, ilk aşama iki hafta geç, ücretin yüzde kırkı peşin. `In return` karşılıklı tavizi işaret ediyor.",
      targets: ["reading.detail"],
    },
    {
      id: "en-b2-w01-r3",
      block: "read",
      ref: "t1",
      stem: "What does Laura say about the preparation for the meeting?",
      options: [
        "Her team should have found out more about Hartley's situation.",
        "Hartley should have prepared more carefully for the meeting.",
        "Nobody could have known that Hartley was cutting costs.",
        "The preparation was the main reason for the good result.",
      ],
      answer: 0,
      why: "`we should have prepared more carefully` modal perfect ile geçmişe dönük bir özeleştiri: yapılması gereken yapılmadı ve öznesi `we`. `If we had checked … we would have seen` da bilginin elde edilebilir olduğunu söylüyor; yani 'kimse bilemezdi' değil.",
      targets: ["reading.inference", "modal-perfect.should-have"],
    },

    /* ── Dinlediğini anlama ─────────────────────────────────────────────── */
    {
      id: "en-b2-w01-l1",
      block: "listen",
      ref: "a1",
      stem: "Why is Sophie's order going to be late?",
      options: [
        "Mark's company forgot to place the order.",
        "Sophie's customers changed the delivery dates.",
        "The shipping costs have become too high.",
        "A supplier has had problems with a machine since last week.",
      ],
      answer: 3,
      why: "`has been having problems … since last week` present perfect continuous: sorun geçen hafta başladı ve hâlâ sürüyor. Nakliye masrafı sorunun nedeni değil, konuşmanın sonundaki telafi önerisi.",
      targets: ["listening.detail", "tense.present-perfect-continuous"],
    },
    {
      id: "en-b2-w01-l2",
      block: "listen",
      ref: "a1",
      stem: "How sure is Mark that the rest of the order will arrive a week later?",
      options: [
        "quite sure, but he cannot promise it",
        "completely sure, because the repair is finished",
        "not sure at all, so he suggests another supplier",
        "sure, because Sophie has agreed to wait",
      ],
      answer: 0,
      why: "`I can't guarantee it, but I'm quite sure` ölçülü bir dil: 'oldukça eminim ama söz veremem'. `are said to be almost finished` da bilgiyi başkasına dayandırıyor; onarım bitmiş değil, bitmek üzere olduğu söyleniyor.",
      targets: ["listening.detail", "passive.reporting"],
    },
    {
      id: "en-b2-w01-l3",
      block: "listen",
      ref: "a1",
      stem: "What does Mark offer because of the delay?",
      options: [
        "a lower price for the goods",
        "to pay for shipping both deliveries",
        "to find Sophie a new supplier",
        "to deliver everything on Friday",
      ],
      answer: 1,
      why: "`As an apology` bir telafi önerisini açıyor ve teklif hemen arkasında: iki gönderimin nakliyesi. Başka tedarikçi Sophie'nin uyarısı, Mark'ın teklifi değil.",
      targets: ["listening.detail"],
    },

    /* ── Dilbilgisi ─────────────────────────────────────────────────────── */
    {
      id: "en-b2-w01-g1",
      block: "grammar",
      stem: "When we arrived, their team ___ our proposal in detail.",
      options: ["have already discussed", "already discuss", "had already discussed", "already discussed"],
      answer: 2,
      why: "Geçmişteki bir andan (`When we arrived`) daha önce bitmiş olay past perfect ister. Türkçe 'tartışmışlardı' ile 'tartıştılar' arasındaki fark çoğu zaman düşürülüyor ve iki olay aynı zamana yığılıyor. `have discussed` ise olayı bugüne bağlar.",
      targets: ["tense.past-perfect"],
      byNative: {
        de: {
          options: ["had already discussed", "have already discussed", "already discussed", "already discuss"],
          answer: 0,
          why: "Almanca `hatten … besprochen` doğru sezgiyi veriyor. Tuzak konuşma Almancasındaki Perfekt alışkanlığı: `have already discussed` olayı bugüne bağlar, geçmişteki bir andan önceyi anlatamaz.",
        },
      },
    },
    {
      id: "en-b2-w01-g2",
      block: "grammar",
      stem: "If we ___ their annual report, we would have seen the cost cuts.",
      options: ["checked", "had checked", "would have checked", "have checked"],
      answer: 1,
      why: "Gerçekleşmemiş geçmiş koşulda `if` tarafı past perfect, sonuç tarafı `would have` alır. Türkçe '-seydik' geçmişi ayrı bir yardımcıyla işaretlemediği için basit geçmiş (`checked`) yeterli görünüyor; ama o biçim ikinci tip koşulun, yani bugüne dair varsayımın biçimi.",
      targets: ["conditional.third"],
      byNative: {
        de: {
          options: ["would have checked", "checked", "have checked", "had checked"],
          answer: 3,
          why: "Almanca `Wenn wir … geprüft hätten` koşul tarafında da kip taşır, bu yüzden `would have checked` kuruluyor. İngilizcede `if` tarafına `would` gelmez: `had checked`.",
        },
      },
    },
    {
      id: "en-b2-w01-g3",
      block: "grammar",
      stem: "We lost the client. Looking back, we ___ more carefully.",
      options: ["must have prepared", "should have prepared", "should prepare", "should prepared"],
      answer: 1,
      why: "Geçmişte yapılmamış bir şey için eleştiri `should have` + fiilin üçüncü hâli ile kurulur. `must have prepared` bir çıkarım bildirir ('mutlaka hazırlanmışızdır'), eleştiri değil. Türkçe '-meliydik' zamanı ve gerekliliği tek yüklemde birleştirdiği için İngilizcede geçmişin `should`ya değil `have prepared`a yüklendiği gözden kaçıyor.",
      targets: ["modal-perfect.should-have"],
      byNative: {
        de: {
          options: ["should have prepare", "should prepare", "must have prepared", "should have prepared"],
          answer: 3,
          why: "Almanca `Wir hätten … vorbereiten sollen` yapısında geçmiş ortaç yok, mastar var (Ersatzinfinitiv); bu yüzden İngilizcede de mastar korunuyor: `should prepare`, `should have prepare`. İngilizcede geçmiş `have` + üçüncü hâl ile kurulur: `should have prepared`.",
        },
      },
    },
    {
      id: "en-b2-w01-g4",
      block: "grammar",
      stem: "Their finance director, ___ joined the company a month ago, raised several concerns.",
      options: ["that", "who", "which", "whom"],
      answer: 1,
      why: "Virgülle ayrılmış, ek bilgi veren ilgi cümlesinde `that` kullanılmaz; kişi için `who`. Türkçede ilgi cümlesi '-en' ortacıyla kurulduğu ve virgül anlamı değiştirmediği için `that` her yere uyar sanılıyor. `whom` nesne içindir, burada ilgi zamiri özne.",
      targets: ["relative.non-defining"],
      byNative: {
        de: {
          options: ["who", "that", "which", "whom"],
          answer: 0,
          why: "Almanca tanımlayan ve tanımlamayan ilgi cümlesini aynı zamirle (`die`) ve her zaman virgülle kurar; ayrım yapmaz. İngilizcede virgüllü (tanımlamayan) ilgi cümlesinde `that` olmaz; kişi için `who`.",
        },
      },
    },
    {
      id: "en-b2-w01-g5",
      block: "grammar",
      stem: "Which sentence sounds most natural in an email to colleagues?",
      options: [
        "We are in need of the making of a quick decision.",
        "A quick decision-making is needed by us.",
        "We need to decide quickly.",
        "There is a necessity for the realization of a decision.",
      ],
      answer: 2,
      why: "İngilizce iş yazışmasında fiil yeğlenir: `decide`. İsim zincirleri (`the making of a decision`) resmîlik katmaz, cümleyi ağırlaştırır. Türkçede `-me/-ma` ile kurulan edilgen yapılar ('karar verilmesine ihtiyaç var') tanıdık olduğu için ağır seçenekler daha resmî görünüyor.",
      targets: ["style.verbal"],
      byNative: {
        de: {
          options: [
            "There is a necessity for the realization of a decision.",
            "We need to decide quickly.",
            "We are in need of the making of a quick decision.",
            "A quick decision-making is needed by us.",
          ],
          answer: 1,
          why: "Almancanın isimleştirme üslubu (`Die Entscheidungsfindung ist erforderlich`) İngilizceye taşınınca yapay cümleler çıkıyor. İngilizce aynı resmîliği fiille kurar: `We need to decide quickly`. Bu, B2'de tipik bir aktarım hatası.",
        },
      },
    },

    /* ── Bağlamda kelime ────────────────────────────────────────────────── */
    {
      id: "en-b2-w01-v1",
      block: "vocab",
      stem: "They asked us to ___ the announcement until the contract is signed.",
      options: ["put up", "put out", "put off", "put away"],
      answer: 2,
      why: "`put off` 'ertelemek'. Türkçede deyimsel fiil yok ve parçacık anlamın asıl taşıyıcısı: `put away` kaldırmak, `put out` söndürmek ya da yayımlamak, `put up` asmak ya da misafir etmek.",
      targets: ["phrasal-verb.put-off"],
      byNative: {
        de: {
          options: ["put off", "put up", "put away", "put out"],
          answer: 0,
          why: "Almanca `aufschieben` → `put up` gibi öneki harfiyen eşlemek yanlış anlam verir (`put up` asmak). Ayrılabilir fiildeki gibi parçacık anlamı değiştiriyor: 'ertelemek' `put off`.",
        },
      },
    },
    {
      id: "en-b2-w01-v2",
      block: "vocab",
      stem: "In the end, the meeting ___ to be easier than we had feared.",
      options: ["turned up", "turned off", "turned out", "turned over"],
      answer: 2,
      why: "Sonunda bir şeyin öyle olduğu anlaşılınca `turn out (to be)` kullanılır. Türkçe '… olduğu ortaya çıktı' kalıbında parçacık olmadığı için `turn` doğru bulunup parçacık tahmin ediliyor: `turn up` bir yere gelmek, `turn off` kapatmak, `turn over` ters çevirmek.",
      targets: ["phrasal-verb.turn-out"],
      byNative: {
        de: {
          options: ["turned over", "turned out", "turned up", "turned off"],
          answer: 1,
          why: "Almanca `sich herausstellen` anlamı doğru sezdiriyor; tuzak parçacıkta: `turn up` bir yere gelmek, `turn over` ters çevirmek. Sonradan anlaşılan durum `turn out to be`.",
        },
      },
    },
    {
      id: "en-b2-w01-v3",
      block: "vocab",
      stem: "Our new ___ decided to cancel the project without asking the team.",
      options: ["chef", "boss", "cook", "master"],
      answer: 1,
      why: "İş yerindeki yönetici `boss` (ya da `manager`). Türkçe 'şef' hem mutfakta hem ofiste kullanıldığı için `chef` seçiliyor, oysa İngilizce `chef` yalnız aşçıbaşı. `master` ise usta ya da efendi.",
      targets: ["falsefriend.chef"],
      byNative: {
        de: {
          options: ["cook", "master", "chef", "boss"],
          answer: 3,
          why: "Almanca `Chef` 'patron' demek, İngilizce `chef` ise 'aşçıbaşı'. İş yerindeki yönetici `boss`.",
        },
      },
    },
  ],
};
