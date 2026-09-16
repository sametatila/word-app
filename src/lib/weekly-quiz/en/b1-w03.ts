import type { QuizWeek } from "../types";

/**
 * B1 · Hafta 3 · Eğitim ve kariyer planları (İngilizce kursu).
 *
 * ÖLÇÜLEN ŞEY: bir tavsiye köşesinde soruyu soranın ikilemini, cevap verenin
 * görüşünü KISITLAYAN ilgi cümlesini ve `If I were you` tavsiyesini ayırmak;
 * bir danışmanlık görüşmesinde koşul zincirini ve yanlış bilinen bir tarihi
 * izlemek. Dilbilgisi: birinci ve ikinci tip koşul, ilgi cümlesi.
 *
 * ARALIKLI TEKRAR: `w03-g5` W1'in `present-perfect.since-for` hedefine
 * kişisel bir öğrenme geçmişiyle dönüyor.
 *
 * ÇELDİRİCİLERİN GEREKÇESİ:
 *  - `w03-g1` (`If I take`): Türkçede `-rsa` eki gelecek anlamını kendisi
 *    taşıyor ve `If I will take` üretiliyor.
 *  - `w03-g2` (`If I had`): Almanca `Wenn ich … hätte` ile `would have`
 *    birebir sanılıyor; Türkçe `olsa` zaman bildirmediği için `have` geliyor.
 *  - `w03-g4` (`where`): Türkçede `-dığı` eki hem nesneyi hem yeri
 *    karşılıyor (`babamın çalıştığı banka`), o yüzden `which` geliyor;
 *    Almancada yer `in der` ile kuruluyor ve edat düşünce `which` kalıyor.
 *  - `w03-v1` (`become`): Almanca konuşan için `bekommen` → `get`.
 */
export const EN_B1_W03: QuizWeek = {
  id: "en-b1-w03",
  course: "en",
  level: "B1",
  no: 3,
  theme: "Education and career plans",
  themeTr: "Eğitim ve kariyer planları",
  canDo: ["B1.RD.1", "B1.LS.1", "B1.SPK.5", "B1.GR.14", "B1.GR.15", "B1.GR.11"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Advice column",
      genreTr: "Tavsiye köşesi",
      title: "Job or university?",
      body:
        "Dear Anna,\n" +
        "I'm 19 and I have just finished school. I have been offered a job at the bank where my father works, " +
        "but I have always wanted to study design. My parents say that if I take the job, I will have a safe future. " +
        "But if I go to university, I will have to borrow money. What should I do? – Jake\n\n" +
        "Dear Jake,\n" +
        "First of all, it's great that you have two choices. Many people who write to me have none.\n\n" +
        "Before you decide, ask yourself one question: where do you want to be in ten years? " +
        "If you accept the job only because it is safe, you may feel unhappy later. " +
        "On the other hand, a design degree which doesn't lead to a job isn't a good plan either.\n\n" +
        "So here is my advice. Talk to people who work in design and find out how they started. " +
        "Some of them didn't go to university at all. You could also ask the bank if you can start a year later. " +
        "If I were you, I would spend that year on a short design course and collect examples of my work.\n\n" +
        "Good luck, and remember that no decision is for your whole life. – Anna",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Advice meeting",
      genreTr: "Danışmanlık görüşmesi",
      plays: 2,
      segments: [
        { speaker: "Nora", text: "Hi. I'm thinking about spending a year abroad, but I'm not sure it's worth it." },
        { speaker: "Advisor", text: "Well, students who study abroad often find jobs more quickly. What are you studying?" },
        { speaker: "Nora", text: "Business. I've learned German for three years, so I'd like to go to Germany." },
        { speaker: "Advisor", text: "That's a good start. If your German is good enough, you can take normal courses there." },
        { speaker: "Nora", text: "And if it isn't?" },
        { speaker: "Advisor", text: "Then you'll do a language course first. That costs extra, but the university pays part of it." },
        { speaker: "Nora", text: "What about money for an apartment and food? My parents can't help me much." },
        { speaker: "Advisor", text: "You can apply for financial help. The form must be sent by the end of January." },
        { speaker: "Nora", text: "January? I thought I had until the summer." },
        { speaker: "Advisor", text: "No, the summer is when you'll hear if you got the money. So I'd start the form this week." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ───────────────────────────────────────────────── */
    {
      id: "en-b1-w03-r1",
      block: "read",
      ref: "t1",
      stem: "Why doesn't Jake know what to do?",
      options: [
        "He hasn't finished school yet.",
        "His parents want him to study design at university.",
        "He wants to study design, but his parents prefer the job.",
        "The bank hasn't offered him a job yet.",
      ],
      answer: 2,
      why: "`I have been offered a job` edilgen present perfect: teklif GELMİŞ ve hâlâ geçerli. Güvenli işi savunan ailesi (`My parents say that if I take the job …`), tasarımı isteyen Jake'in kendisi. İkilemin iki tarafının kime ait olduğunu ayırmak gerekiyor.",
      targets: ["reading.detail", "passive.present-perfect"],
    },
    {
      id: "en-b1-w03-r2",
      block: "read",
      ref: "t1",
      stem: "What does Anna think about a design degree?",
      options: [
        "It is always better than a job.",
        "It is only a good plan if it leads to work.",
        "It is too expensive for Jake.",
        "Jake should not study at all.",
      ],
      answer: 1,
      why: "`a design degree which doesn't lead to a job isn't a good plan`: ilgi cümlesi olumsuz yargıyı KISITLIYOR. Her tasarım diploması değil, işe götürmeyeni kötü bir plan. İlgi cümlesini atlayıp cümlenin geri kalanını okumak görüşü genelleştiriyor.",
      targets: ["reading.opinion", "relative.who-which"],
    },
    {
      id: "en-b1-w03-r3",
      block: "read",
      ref: "t1",
      stem: "What would Anna do in Jake's situation?",
      options: [
        "take the job at the bank immediately",
        "borrow money from the bank and go to university",
        "never go to university",
        "take a short course and collect examples of her work",
      ],
      answer: 3,
      why: "`If I were you, I would …` ikinci tip koşul: kendini okurun yerine koyarak verilen tavsiye. Bankaya sormak (`You could also ask`) ayrı bir öneri ve bankaya HEMEN başlamak değil, bir yıl sonra başlamak. `Some of them didn't go to university` ise bir gözlem, bir öğüt değil.",
      targets: ["reading.opinion", "conditional.second"],
    },

    /* ── Dinlediğini anlama ─────────────────────────────────────────────── */
    {
      id: "en-b1-w03-l1",
      block: "listen",
      ref: "a1",
      stem: "Why does Nora want to go to Germany?",
      options: [
        "Her parents live there.",
        "She has learned German for three years.",
        "Business courses are cheaper there.",
        "The advisor told her it is the best country for business.",
      ],
      answer: 1,
      why: "`I've learned German for three years, so I'd like to go to Germany`: `so` bir sonucu bağlar, sebep ondan ÖNCEKİ cümlede. Nora'nın ailesi yalnız para konusunda geçiyor.",
      targets: ["listening.detail", "present-perfect.since-for"],
    },
    {
      id: "en-b1-w03-l2",
      block: "listen",
      ref: "a1",
      stem: "What happens if Nora's German is not good enough?",
      options: [
        "She can't go to Germany.",
        "She has to pay for everything.",
        "She takes a language course first.",
        "She takes normal courses.",
      ],
      answer: 2,
      why: "Koşul zinciri iki adımda geliyor: `And if it isn't?` → `Then you'll do a language course first`. Masraf tamamen öğrenciye kalmıyor: `the university pays part of it`. `part` kısmi desteği bildiriyor.",
      targets: ["listening.detail", "conditional.first"],
    },
    {
      id: "en-b1-w03-l3",
      block: "listen",
      ref: "a1",
      stem: "What was Nora wrong about?",
      options: [
        "the last day to send the form",
        "the cost of the language course",
        "her parents' help",
        "the courses in Germany",
      ],
      answer: 0,
      why: "`I thought I had until the summer`: `I thought` + geçmiş zaman, yanlış bilinen bir bilgiyi bildiriyor. Yaz, formun son günü değil, sonucun AÇIKLANACAĞI zaman. İki tarihi neyin tarihi olduklarına göre ayırmak gerekiyor.",
      targets: ["listening.detail"],
    },

    /* ── Dilbilgisi ─────────────────────────────────────────────────────── */
    {
      id: "en-b1-w03-g1",
      block: "grammar",
      stem: "If I ___ the job, I will have a safe future.",
      options: ["will take", "would take", "took", "take"],
      answer: 3,
      why: "Birinci tip koşul gerçekleşebilecek bir durumu anlatır: `if` kısmı geniş zaman (present simple), `will` yalnız ana cümlede. Gelecek anlamı zaten ana cümledeki `will` taşıyor.",
      targets: ["conditional.first"],
      byNative: {
        tr: {
          options: ["will take", "would take", "took", "take"],
          answer: 3,
          why: "Türkçede `işi alırsam` koşul eki geleceği de kapsıyor, bu yüzden `if` kısmına `will` konuyor. İngilizcede gelecek anlamını ana cümle taşır; `if` kısmı geniş zamanda kalır: `If I take`.",
        },
      },
    },
    {
      id: "en-b1-w03-g2",
      block: "grammar",
      stem: "If I ___ more money, I would study design.",
      options: ["have", "had", "would have", "will have"],
      answer: 1,
      why: "İkinci tip koşul gerçek olmayan bir şimdiki durumu anlatır: `if` kısmı past simple, ana cümle `would`. Geçmiş biçimi burada geçmişi değil GERÇEK DIŞILIĞI bildiriyor. `would` `if` kısmına girmez.",
      targets: ["conditional.second"],
      byNative: {
        tr: {
          options: ["have", "had", "would have", "will have"],
          answer: 1,
          why: "Türkçede `param olsa` zaman bildirmiyor, bu yüzden geniş zaman `have` doğal görünüyor. İngilizcede gerçek dışı koşul geçmiş zaman biçimiyle kurulur: `If I had`. Biçim geçmiş, anlam şimdi.",
        },
        de: {
          options: ["have", "had", "would have", "will have"],
          answer: 1,
          why: "Almancada `Wenn ich mehr Geld hätte` şart kısmında da Konjunktiv II var ve `hätte` → `would have` birebir sanılıyor. İngilizcede `would` yalnız ana cümlede; `if` kısmı düz geçmiş biçim: `had`.",
        },
      },
    },
    {
      id: "en-b1-w03-g3",
      block: "grammar",
      stem: "Many people ___ write to me have no choice at all.",
      options: ["which", "what", "who", "whose"],
      answer: 2,
      why: "İnsanları niteleyen ilgi zamiri `who`, nesneleri niteleyen `which`. `what` bir ismi nitelemez, `the thing that` anlamına gelir; `whose` sahiplik bildirir.",
      targets: ["relative.who-which"],
      byNative: {
        tr: {
          options: ["which", "what", "who", "whose"],
          answer: 2,
          why: "Türkçede `bana yazan insanlar` yapısında zamir yok ve insan ile nesne ayrımı yapılmıyor. İngilizcede ilgi zamiri öncülün insan mı nesne mi olduğuna göre seçilir: insan için `who`.",
        },
        de: {
          options: ["which", "what", "who", "whose"],
          answer: 2,
          why: "Almanca ilgi zamiri (`die`) insan ve nesne ayırmıyor, cinsiyet ayırıyor; `was` → `what` aktarımı da geliyor. İngilizcede seçimi öncülün insan olup olmaması belirler: insanlar için `who`.",
        },
      },
    },
    {
      id: "en-b1-w03-g4",
      block: "grammar",
      stem: "I have been offered a job at the bank ___ my father works.",
      options: ["where", "which", "who", "what"],
      answer: 0,
      why: "İlgi cümlesinin fiili (`works`) bir nesne istemiyor, bir YER bildiriyor: babam bankada çalışıyor. Yer bildiren ilgi cümlesi `where` ile kurulur; `which` ancak edatla birlikte (`in which`) aynı işi görür.",
      targets: ["relative.where", "relative.who-which"],
      byNative: {
        tr: {
          options: ["where", "which", "who", "what"],
          answer: 0,
          why: "Türkçede `-dığı` eki hem nesneyi (`okuduğu kitap`) hem yeri (`çalıştığı banka`) karşılıyor, o yüzden ikisi için de `which` seçiliyor. İngilizcede ilgi cümlesi bir yer bildiriyorsa `where` gerekir.",
        },
        de: {
          options: ["where", "which", "who", "what"],
          answer: 0,
          why: "Almancada `die Bank, in der mein Vater arbeitet` edatlı ilgi zamiriyle kuruluyor; edat düşünce geriye `which` kalıyor. İngilizcede edatsız yer ilgi cümlesi `where` ile kurulur.",
        },
      },
    },
    {
      id: "en-b1-w03-g5",
      block: "grammar",
      stem: "I ___ German since I was 12.",
      options: ["study", "am studying", "studied", "have studied"],
      answer: 3,
      why: "`since` geçmişteki bir başlangıç noktasından bugüne uzanan dönemi ölçer ve present perfect ister. `studied` dönemi kapatır, `study` ve `am studying` ise başlangıç noktası olmayan bir şimdiyi anlatır.",
      targets: ["present-perfect.since-for", "tense.present-perfect-vs-present"],
      byNative: {
        tr: {
          options: ["study", "am studying", "studied", "have studied"],
          answer: 3,
          why: "Türkçede `on iki yaşımdan beri çalışıyorum` şimdiki zamanla kuruluyor ve `am studying`e götürüyor. İngilizcede başlangıcı `since` ile verilen ve bugüne süren dönem present perfect ister.",
        },
        de: {
          options: ["study", "am studying", "studied", "have studied"],
          answer: 3,
          why: "Almancada `Seit ich zwölf bin, lerne ich Deutsch` düz Präsens ve `study`ye götürüyor. İngilizcede `since` ile ölçülen, bugüne uzanan dönem present perfect ister: `have studied`.",
        },
      },
    },

    /* ── Bağlamda kelime ────────────────────────────────────────────────── */
    {
      id: "en-b1-w03-v1",
      block: "vocab",
      stem: "After her degree, she wants to ___ a teacher.",
      options: ["get", "become", "make", "receive"],
      answer: 1,
      why: "Bir mesleğe girmek, bir şey hâline gelmek `become`. `get` ve `receive` bir şey almak ya da edinmek, `make` ise bir meslek adıyla bu anlamda kullanılmaz.",
      targets: ["falsefriend.become"],
      byNative: {
        de: {
          options: ["get", "become", "make", "receive"],
          answer: 1,
          why: "`become` Almanca `bekommen` DEĞİL — klasik sahte dost. `become` = werden; `bekommen`in İngilizcesi `get`. `get a teacher` bir öğretmen edinmek demek olurdu.",
        },
      },
    },
    {
      id: "en-b1-w03-v2",
      block: "vocab",
      stem: "I can't ___ to study abroad without financial help.",
      options: ["afford", "pay", "spend", "cost"],
      answer: 0,
      why: "Bir şeye paranın yetmesi `afford (to do)`. `pay` ve `spend` bir miktar ya da nesne ister ve `to` + fiil almaz; `cost`un öznesi insan değil, ücretli olan şeydir.",
      targets: ["wordfield.money"],
      byNative: {
        tr: {
          options: ["afford", "pay", "spend", "cost"],
          answer: 0,
          why: "Türkçede `yurt dışında okumayı karşılayamam` ya da `ödeyemem` deniyor ve `pay` seçiliyor. İngilizcede paranın bir şeye yetip yetmemesi ayrı bir fiille anlatılır: `can't afford to`.",
        },
      },
    },
    {
      id: "en-b1-w03-v3",
      block: "vocab",
      stem: "Is a year abroad really ___ it?",
      options: ["valuable", "useful", "worth", "important"],
      answer: 2,
      why: "`be worth it` sabit bir kalıp: bir şeyin harcanan emeğe ya da paraya değmesi. `valuable`, `useful` ve `important` sıfattır ve arkalarından `it` nesnesini almazlar.",
      targets: ["wordfield.value"],
      byNative: {
        de: {
          options: ["valuable", "useful", "worth", "important"],
          answer: 2,
          why: "Almanca `Lohnt es sich?` bir fiille kuruluyor ve İngilizcede bir sıfat aranıyor. Karşılığı sabit kalıp `be worth it`: sıfatların hiçbiri arkasından `it` almaz.",
        },
      },
    },
  ],
};
