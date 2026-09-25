import type { QuizWeek } from "../types";

/**
 * B1 · Hafta 1 · Görüş bildirme ve gerekçelendirme (İngilizce kursu).
 *
 * ÖLÇÜLEN ŞEY: bir görüş yazısında sebebi sonuçtan, yazarın görüşünü
 * sınırladığı yeri (`I am not saying that …`) ve koşullu öneriyi ayırmak; bir
 * tartışmada yanlış anlaşılan bilgiyi ve düzeltmeyi izlemek. Dilbilgisi: B1'in
 * en çok karıştırılan ayrımı olan present perfect ↔ past simple, `since`/`for`.
 *
 * ÇELDİRİCİLERİN GEREKÇESİ. B1'de hata anadil yapısının taşınmasından geliyor:
 *  - `w01-g1`/`w01-g5` (past simple): Almancada Perfekt geçmişin TAMAMINI
 *    karşılıyor, bu yüzden `has stopped` + `last spring` ve `When have you
 *    started?` sistematik olarak üretiliyor. Türkçede `durdu` iki İngilizce
 *    zamanı birden karşılıyor; ayrım hiç görünmüyor.
 *  - `w01-g2` (`since then` + present perfect): Almanca `seitdem benutze ich`
 *    ve Türkçe `o zamandan beri kullanıyorum` İKİSİ DE şimdiki zaman; ama
 *    birinden `use`, ötekinden `am using` geliyor.
 *  - `w01-g3` (`for`/`since`): Almanca `seit` ikisini birden karşılıyor;
 *    Türkçede `-dır` eki de öyle.
 *  - `w01-v1`/`w01-v2`: `actually` ≠ aktuell, `eventually` ≠ eventuell.
 */
export const EN_B1_W01: QuizWeek = {
  id: "en-b1-w01",
  course: "en",
  level: "B1",
  no: 1,
  theme: "Giving and supporting opinions",
  themeTr: "Görüş bildirme ve gerekçelendirme",
  canDo: ["B1.SPK.1", "B1.SPK.6", "B1.RD.1", "B1.LS.3", "B1.GR.11"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Opinion column",
      genreTr: "Görüş yazısı",
      title: "Should we all stop driving to work?",
      body:
        "I drove to work for almost 15 years. Last spring, my car stopped working, and for three weeks I had to take my bike. " +
        "I expected to hate it. Actually, I loved it.\n\n" +
        "Since then, I have used the car only on weekends. I have saved a lot of money, and I feel healthier than I did five years ago. " +
        "My colleagues think I am crazy, especially in winter, but I don't agree with them.\n\n" +
        "I am not saying that everyone should sell their car. People who live far from the city or have small children often have no choice. " +
        "And I have to admit that the first cold morning in November was not much fun.\n\n" +
        "However, I believe that many of us use the car because we have always done it, not because we really need it. " +
        "If you live near your work, try the bike for one week. Maybe you will be surprised, like I was.\n\n" +
        "What do you think? Have you ever tried it? Write to us and tell us about your experience.",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Conversation",
      genreTr: "Sohbet",
      plays: 2,
      segments: [
        { speaker: "Maya", text: "Did you see the news? Our old school doesn't allow phones anymore." },
        { speaker: "Tom", text: "Good. I think that's a great idea." },
        { speaker: "Maya", text: "Really? I'm not so sure. Lots of parents want to call their children after school." },
        { speaker: "Tom", text: "They can still do that. The phones just stay in a box during lessons." },
        { speaker: "Maya", text: "Oh, that's different. I thought they had taken them away for the whole day." },
        { speaker: "Tom", text: "No. My sister teaches there, and she says the students talk to each other more at lunch now." },
        { speaker: "Maya", text: "That's nice. But what about using phones for homework or to look things up?" },
        { speaker: "Tom", text: "They've got computers in every classroom for that." },
        { speaker: "Maya", text: "Fair enough. I still think teenagers should learn to control their phones themselves." },
        { speaker: "Tom", text: "Maybe. But I've seen how hard that is for adults, so I don't expect it from teenagers." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ───────────────────────────────────────────────── */
    {
      id: "en-b1-w01-r1",
      block: "read",
      ref: "t1",
      stem: "Why did the writer start going to work by bike?",
      options: [
        "A doctor said it was a good idea.",
        "The car stopped working.",
        "The writer wanted to save money.",
        "Some colleagues suggested it.",
      ],
      answer: 1,
      why: "Başlangıç sebebi `Last spring, my car stopped working` ile past simple'da veriliyor. Para biriktirmek `Since then, I have saved` ile gelen bir SONUÇ. Zaman işaretleri sebebi sonuçtan ayırıyor: sonradan kazanılan bir faydayı başlangıç sebebi sanmak tuzak.",
      targets: ["reading.detail", "tense.past-vs-present-perfect"],
    },
    {
      id: "en-b1-w01-r2",
      block: "read",
      ref: "t1",
      stem: "What does the writer think about people with small children?",
      options: [
        "They should sell their car.",
        "They should take the bike with their children.",
        "They are crazy to drive in winter.",
        "They often really need a car.",
      ],
      answer: 3,
      why: "`I am not saying that everyone should …` yazarın kendi görüşünü SINIRLADIĞI yer: çocuklu ailelerin `no choice` durumunda olduğunu kabul ediyor. `crazy` ise meslektaşlarının yazar hakkındaki sözü. Görüş yazısında yazarın geri çekildiği cümleleri atlamak onu olduğundan kesin gösteriyor.",
      targets: ["reading.opinion"],
    },
    {
      id: "en-b1-w01-r3",
      block: "read",
      ref: "t1",
      stem: "What does the writer suggest to the readers?",
      options: [
        "to sell their car",
        "to use the car only on weekends",
        "to try the bike for a week if they live near work",
        "to write about their car",
      ],
      answer: 2,
      why: "Öneri bir koşula bağlı: `If you live near your work, try …`. Arabayı yalnız hafta sonu kullanmak yazarın KENDİ alışkanlığı, satmak ise açıkça reddettiği bir fikir. Kişisel deneyimi okura verilen öğütle karıştırmamak gerekiyor.",
      targets: ["reading.opinion", "conditional.first"],
    },

    /* ── Dinlediğini anlama ─────────────────────────────────────────────── */
    {
      id: "en-b1-w01-l1",
      block: "listen",
      ref: "a1",
      stem: "What did Maya think at first about the new rule?",
      options: [
        "Students lose their phones for the whole day.",
        "The rule is a great idea.",
        "Parents have to collect the phones.",
        "Teachers can't use phones either.",
      ],
      answer: 0,
      why: "`I thought they had taken them away for the whole day`: `I thought` + past perfect Maya'nın YANLIŞ anladığı ilk durumu bildiriyor; Tom hemen düzeltiyor. `great idea` ise Tom'un görüşü. Konuşmada düzeltilen bilgiyi de, kimin ne düşündüğünü de izlemek gerekiyor.",
      targets: ["listening.detail"],
    },
    {
      id: "en-b1-w01-l2",
      block: "listen",
      ref: "a1",
      stem: "According to Tom's sister, what has changed?",
      options: [
        "Students do more homework.",
        "Students talk to each other more at lunch.",
        "Parents call the school less.",
        "Students use computers at home.",
      ],
      answer: 1,
      why: "Tom kız kardeşinin sözünü aktarıyor: `she says the students talk …`. Bilgisayarlar ev ödevi sorusuna Tom'un kendi cevabı, kız kardeşin gözlemi değil. Aktarılan sözün nerede başlayıp bittiğini izlemek gerekiyor.",
      targets: ["listening.detail", "reported.say-tell"],
    },
    {
      id: "en-b1-w01-l3",
      block: "listen",
      ref: "a1",
      stem: "Why doesn't Tom expect teenagers to control their phones?",
      options: [
        "His sister told him so.",
        "The school has computers.",
        "It is hard even for adults.",
        "Teenagers don't want to learn.",
      ],
      answer: 2,
      why: "Gerekçe `so`dan ÖNCE geliyor: `I've seen how hard that is for adults, so …`. `so` bir sonucu bağlar; sebebi onun önündeki cümlede aramak gerekiyor.",
      targets: ["listening.opinion"],
    },

    /* ── Dilbilgisi ─────────────────────────────────────────────────────── */
    {
      id: "en-b1-w01-g1",
      block: "grammar",
      stem: "Last spring, my car ___ working.",
      options: ["has stopped", "is stopped", "stops", "stopped"],
      answer: 3,
      why: "`Last spring` bitmiş ve belli bir zaman: past simple ister. Present perfect zamanı belli olmayan ya da etkisi bugüne uzanan olaylar içindir ve `last spring`, `yesterday`, `ago` gibi zaman belirteçleriyle birlikte kullanılmaz.",
      targets: ["tense.past-vs-present-perfect"],
      byNative: {
        tr: {
          options: ["has stopped", "is stopped", "stops", "stopped"],
          answer: 3,
          why: "Türkçede `durdu` hem `stopped` hem `has stopped` karşılığı; ayrım görünmüyor. İngilizcede seçimi zaman belirteci yapar: `last spring` bitmiş bir zaman, yani past simple.",
        },
        de: {
          options: ["has stopped", "is stopped", "stops", "stopped"],
          answer: 3,
          why: "Almancada `Letzten Frühling hat mein Auto aufgehört zu funktionieren` Perfekt'le kuruluyor, çünkü Perfekt geçmişin tamamını karşılıyor. İngilizcede `has stopped` biçimi belli bir geçmiş zamanla (`last spring`) birleşemez: past simple.",
        },
      },
    },
    {
      id: "en-b1-w01-g2",
      block: "grammar",
      stem: "Since then, I ___ the car only on weekends.",
      options: ["use", "used", "have used", "am using"],
      answer: 2,
      why: "`Since then` geçmişte başlayıp BUGÜNE kadar süren bir dönemi ölçer ve present perfect ister. `used` dönemin bittiğini, `use` ve `am using` başlangıç noktası olmayan bir şimdiyi bildirir.",
      targets: ["present-perfect.since-for", "tense.present-perfect-vs-present"],
      byNative: {
        tr: {
          options: ["use", "used", "have used", "am using"],
          answer: 2,
          why: "Türkçede `o zamandan beri kullanıyorum` şimdiki zamanla kuruluyor, o yüzden `am using` doğal görünüyor. İngilizcede geçmişte başlayıp bugüne gelen bir dönem present perfect ile anlatılır: `have used`.",
        },
        de: {
          options: ["use", "used", "have used", "am using"],
          answer: 2,
          why: "Almancada `Seitdem benutze ich das Auto nur am Wochenende` düz Präsens, o yüzden `use` geliyor. İngilizcede `since` ile ölçülen, bugüne uzanan dönem present perfect ister: `have used`.",
        },
      },
    },
    {
      id: "en-b1-w01-g3",
      block: "grammar",
      stem: "I have driven to work ___ almost 15 years.",
      options: ["since", "for", "during", "from"],
      answer: 1,
      why: "`for` bir SÜRENİN uzunluğunu verir (fifteen years), `since` bir başlangıç NOKTASINI (since 2010, since spring). `during` bir dönemin içinde olan bir şeyi anlatır, süre ölçmez.",
      targets: ["present-perfect.since-for"],
      byNative: {
        tr: {
          options: ["since", "for", "during", "from"],
          answer: 1,
          why: "Türkçede süre (`on beş yıldır`) ile başlangıç (`2010'dan beri`) aynı `şimdiye kadar süren` anlamı taşıyor ve ikisi de `beri` diye öğrenilen `since`e çekiliyor. İngilizcede ikisi ayrı: süre `for`, başlangıç noktası `since`.",
        },
        de: {
          options: ["since", "for", "during", "from"],
          answer: 1,
          why: "Almanca `seit` hem `seit fünfzehn Jahren` hem `seit 2010` diyor, bu yüzden `since` her ikisine genelleniyor. İngilizcede süre `for` ile, başlangıç noktası `since` ile verilir.",
        },
      },
    },
    {
      id: "en-b1-w01-g4",
      block: "grammar",
      stem: "My colleagues think I am crazy, but I ___ with them.",
      options: ["am not agree", "don't agree", "not agree", "am not agreeing"],
      answer: 1,
      why: "`agree` bir fiildir, sıfat değil: olumsuzu `do` yardımcısıyla kurulur. Görüş bildiren fiiller (agree, think, believe) genellikle continuous biçimde kullanılmaz.",
      targets: ["verb.agree"],
      byNative: {
        tr: {
          options: ["am not agree", "don't agree", "not agree", "am not agreeing"],
          answer: 1,
          why: "Türkçedeki `aynı fikirde değilim` yapısı bir sıfat + `değil` gibi kuruluyor, bu da `I am not agree`yu çağırıyor. İngilizcede `agree` bir fiil: olumsuzu `don't agree`.",
        },
        de: {
          options: ["am not agree", "don't agree", "not agree", "am not agreeing"],
          answer: 1,
          why: "Almanca `Ich bin nicht einverstanden` `sein` ile kuruluyor ve `I am not agree` diye aktarılıyor. İngilizcede `agree` kendisi fiil; olumsuz için `do` gerekir.",
        },
      },
    },
    {
      id: "en-b1-w01-g5",
      block: "grammar",
      stem: "When ___ cycling to work? – Last spring.",
      options: ["did you start", "have you started", "do you start", "were you start"],
      answer: 0,
      why: "Cevap (`Last spring`) bitmiş, belli bir geçmiş an: soru past simple ile kurulur. Present perfect olayın ZAMANINI değil bugüne etkisini öne çıkarır, bu yüzden geçmişteki bir anı soran `when` ile birleşmez; `do you start` ise bir plan sorar.",
      targets: ["tense.past-vs-present-perfect", "past.did-question"],
      byNative: {
        de: {
          options: ["did you start", "have you started", "do you start", "were you start"],
          answer: 0,
          why: "Almancada `Wann hast du angefangen?` Perfekt'le soruluyor ve `When have you started?` aktarımı geliyor. İngilizcede geçmişteki belli bir anı soran `when` present perfect ile birleşmez: `When did you start?`.",
        },
      },
    },

    /* ── Bağlamda kelime ────────────────────────────────────────────────── */
    {
      id: "en-b1-w01-v1",
      block: "vocab",
      stem: "I expected to hate cycling. ___, I loved it.",
      options: ["Actually", "Currently", "Lately", "Recently"],
      answer: 0,
      why: "Beklentiyle çelişen gerçeği `Actually` getirir: `aslında`. `Currently` şu anda, `Recently` ve `Lately` son zamanlarda; hiçbiri beklenti ile gerçek arasında karşıtlık kurmaz.",
      targets: ["falsefriend.actually"],
      byNative: {
        de: {
          options: ["Actually", "Currently", "Lately", "Recently"],
          answer: 0,
          why: "`actually` Almanca `aktuell` DEĞİL — sahte dost. `actually` = eigentlich/tatsächlich; `aktuell` İngilizcede `currently` ya da `current`. Şıklarda ikisi yan yana duruyor.",
        },
      },
    },
    {
      id: "en-b1-w01-v2",
      block: "vocab",
      stem: "At first my colleagues laughed, but ___ two of them started cycling too.",
      options: ["possibly", "eventually", "probably", "currently"],
      answer: 1,
      why: "`At first … but …` bir süreç anlatıyor ve boşluk onun sonunu işaret ediyor: `eventually` = zamanla, sonunda. `possibly` ve `probably` sonucu belirsizleştirir; oysa `At first … but` kalıbı bilinen bir sonu bekliyor.",
      targets: ["falsefriend.eventually"],
      byNative: {
        de: {
          options: ["possibly", "eventually", "probably", "currently"],
          answer: 1,
          why: "`eventually` Almanca `eventuell` DEĞİL — sahte dost. `eventually` = schließlich, zamanla; `eventuell` İngilizcede `possibly`. Cümle kesin olarak olmuş bir şeyi anlatıyor.",
        },
      },
    },
    {
      id: "en-b1-w01-v3",
      block: "vocab",
      stem: "We ___ the new rule at dinner last night.",
      options: ["talked", "discussed about", "said", "discussed"],
      answer: 3,
      why: "`discuss` doğrudan nesne alır, edatsız: `discuss the rule`. `talk` ve `say` bir konuyu nesne olarak almaz; `talk about` gerekirdi.",
      targets: ["verb.discuss"],
      byNative: {
        tr: {
          options: ["talked", "discussed about", "said", "discussed"],
          answer: 3,
          why: "Türkçede `kural hakkında konuştuk` kalıbı `hakkında`yı çağırıyor ve `discuss about` üretiliyor. `discuss` ise kendisi `bir konuyu konuşmak` demek ve edat almaz.",
        },
        de: {
          options: ["talked", "discussed about", "said", "discussed"],
          answer: 3,
          why: "Almanca `über die Regel diskutieren` edatla kuruluyor ve `discuss about` diye aktarılıyor. İngilizcede `discuss` doğrudan nesne alır: `discuss the rule`.",
        },
      },
    },
  ],
};
