import type { QuizWeek } from "../types";

/**
 * C1 · Hafta 1 · Kanıt ve iddia (İngilizce kursu).
 *
 * ÖLÇÜLEN ŞEY: Almanca C1 W1 ile aynı yetkinlikler — bir iddianın dayanağını
 * değerlendirmek. Hedef dilin kendi araçları başka: devrik yapı (inversion),
 * ölçülü dil (hedging) ve bildirme fiilleriyle kurulan edilgen.
 *
 * ÖLÇÜLÜ DİL BU HAFTANIN OMURGASI ve iki anadilde iki ayrı sebeple zor:
 * Türkçede kesinlik derecesi `-miş`/`-dir` gibi EKLERLE taşınır, yani öğrenci
 * ayrı sözcük aramıyor ve iddiayı olduğundan kesin yazıyor. Almancada ise
 * kesinlik Konjunktiv ile taşınır — kip arayan öğrenci İngilizcede kip
 * bulamayınca yine kesinliğe düşüyor. İki yol, aynı sonuç: fazla iddialı
 * akademik İngilizce.
 */
export const EN_C1_W01: QuizWeek = {
  id: "en-c1-w01",
  course: "en",
  level: "C1",
  no: 1,
  theme: "Evidence and claim",
  themeTr: "Kanıt ve iddia",
  canDo: ["C1.RD.1", "C1.LS.1", "C1.GR.1", "C1.WR.1"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Opinion column",
      genreTr: "Köşe yazısı",
      title: "What a study proves — and what it does not",
      body:
        "A recent study claims that short breaks improve concentration. The authors report that they " +
        "followed more than a thousand employees over two years. At first glance the result seems convincing; " +
        "on closer reading, however, questions remain.\n\n" +
        "First, the research was funded by a company that sells software for planning breaks. " +
        "That does not make the findings false, but it does raise the question of how independent they are. " +
        "Second, a considerable part of the data rests on self-report: participants said themselves how " +
        "focused they felt. Such statements can hardly be checked.\n\n" +
        "Critics acknowledge that breaks are useful. What they doubt is the strength of the link, " +
        "which the authors present as firmly established. Rarely is a single study enough to settle a question, " +
        "and other research points in a different direction.\n\n" +
        "Anyone examining a claim should therefore look not only at the result, but also at who paid for the " +
        "study and how the data came about.",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Radio discussion",
      genreTr: "Radyo tartışması",
      plays: 2,
      segments: [
        { speaker: "Host", text: "Dr Shaw, the study is widely quoted. Does it convince you?" },
        { speaker: "Shaw", text: "Partly. The question is interesting; the method is weak." },
        { speaker: "Host", text: "What exactly do you mean?" },
        { speaker: "Shaw", text: "The data rest on what participants said about themselves. That is an impression, not evidence." },
        { speaker: "Host", text: "Mr Adeyemi, you see it differently." },
        { speaker: "Adeyemi", text: "I accept that the method has weaknesses. Even so, I find the result plausible." },
        { speaker: "Shaw", text: "Plausible is not the same as demonstrated." },
        { speaker: "Adeyemi", text: "Granted. But we do not demand final proof from any single study." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ──────────────────────────────────────────────── */
    {
      id: "en-c1-w01-r1",
      block: "read",
      ref: "t1",
      stem: "What is the main objection raised in the text?",
      options: [
        "The study was never published",
        "Too few employees took part",
        "The funding and the data basis raise questions",
        "Breaks were shown to harm concentration",
      ],
      answer: 2,
      why: "Metin iki itirazı `First` ve `Second` ile sıralıyor: kim finanse etti ve veriler nasıl toplandı. Sonuç yanlışlanmıyor — DAYANAĞI sorgulanıyor. Katılımcı sayısı binden fazla diye veriliyor, yani itiraz orada değil.",
      targets: ["reading.source-critique", "argument.objection"],
    },
    {
      id: "en-c1-w01-r2",
      block: "read",
      ref: "t1",
      stem: "What is the critics' position on breaks?",
      options: [
        "They reject all research on the topic",
        "They consider breaks useless",
        "They demand longer breaks",
        "They accept that breaks are useful but doubt how strong the link is",
      ],
      answer: 3,
      why: "\"Critics acknowledge that breaks are useful. What they doubt is the strength of the link.\" `What they doubt is …` yarık cümlesi itirazın hedefini tek noktaya kilitliyor: bağın GÜCÜ. Bir iddiayı zayıflatmak onu reddetmek değildir.",
      targets: ["reading.nuance", "syntax.cleft"],
    },
    {
      id: "en-c1-w01-r3",
      block: "read",
      ref: "t1",
      stem: "According to the text, what should one examine besides the result?",
      options: [
        "Only the number of citations",
        "Who funded the study and how the data came about",
        "The length of the study",
        "The reputation of the journal",
      ],
      answer: 1,
      why: "Son cümle: `not only at the result, but also at who paid … and how the data came about`. İki yıllık süre metinde bilgi olarak geçiyor, ölçüt olarak değil.",
      targets: ["reading.detail", "argument.criterion"],
    },

    /* ── Dinlediğini anlama ────────────────────────────────────────────── */
    {
      id: "en-c1-w01-l1",
      block: "listen",
      ref: "a1",
      stem: "How does Dr Shaw assess the study?",
      options: [
        "The question is interesting but the method is weak",
        "It convinces her completely",
        "She believes the data were invented",
        "She has not read it",
      ],
      answer: 0,
      why: "\"Partly. The question is interesting; the method is weak.\" `Partly` değerlendirmeyi baştan bölüyor — ne tam onay ne tam ret. Sahtecilik suçlaması hiç yapılmıyor.",
      targets: ["listening.stance", "discourse.concession"],
    },
    {
      id: "en-c1-w01-l2",
      block: "listen",
      ref: "a1",
      stem: "What is Dr Shaw's objection to the data?",
      options: [
        "They are too old",
        "They come from another country",
        "They rest on impressions rather than evidence",
        "They were never collected",
      ],
      answer: 2,
      why: "\"That is an impression, not evidence.\" Eleştirinin tamamı bu karşıtlıkta: veri uydurma değil, KANIT değerinde değil. C1'de bu iki suçlamayı ayırmak belirleyicidir.",
      targets: ["listening.argument", "wordfield.evidence"],
    },
    {
      id: "en-c1-w01-l3",
      block: "listen",
      ref: "a1",
      stem: "What do both speakers agree on?",
      options: [
        "That the study is worthless",
        "That the method has weaknesses",
        "That breaks are harmful",
        "That more funding is needed",
      ],
      answer: 1,
      why: "Adeyemi \"I accept that the method has weaknesses\" diyor; Shaw zaten yöntemi eleştiriyor. Anlaşmazlık yöntemde değil, o zayıflığın sonucu geçersiz kılıp kılmadığında.",
      targets: ["listening.consensus", "discourse.concession"],
    },

    /* ── Dilbilgisi ────────────────────────────────────────────────────── */
    {
      id: "en-c1-w01-g1",
      block: "grammar",
      stem: "___ a single study enough to settle a question.",
      options: ["Rarely it is", "Rarely has", "Rarely was it", "Rarely is"],
      answer: 3,
      why: "Olumsuz ya da sınırlayıcı bir zarf cümle başına gelince özne ile yardımcı fiil YER DEĞİŞTİRİR: `Rarely is a single study…`. Bu, soru değil vurgu yapısıdır ve yazı dilinde sık kullanılır.",
      targets: ["syntax.inversion", "register.formal"],
      byNative: {
        tr: {
          options: ["Rarely it is", "Rarely has", "Rarely was it", "Rarely is"],
          answer: 3,
          why: "Türkçede vurgu için sözcük sırası serbestçe değişir ama yardımcı fiil diye bir öğe yoktur, o yüzden devrik yapı 'sadece başa almak' sanılıyor ve özne yerinde bırakılıyor: `Rarely it is`.",
        },
        de: {
          options: ["Rarely it is", "Rarely has", "Rarely was it", "Rarely is"],
          answer: 3,
          why: "Almancada başa bir öğe gelince fiil zaten ikinci sıraya geçer (V2), yani yer değiştirme sezgisi TANIDIK. Tuzak burada değil: İngilizcede yer değiştiren tam fiil değil YARDIMCI fiildir ve zaman uyumu korunmalıdır.",
        },
      },
    },
    {
      id: "en-c1-w01-g2",
      block: "grammar",
      stem: "___ they doubt is the strength of the link.",
      options: ["What", "That", "Which", "It"],
      answer: 0,
      why: "Yarık cümle (cleft) bir öğeyi öne çıkarmak için `What … is …` kalıbıyla kurulur. `That` ve `which` ilgi cümlesi kurar ve bir öncül ister; burada öncül yok, vurgulanan şeyin kendisi cümlenin öznesi.",
      targets: ["syntax.cleft", "register.formal"],
    },
    {
      id: "en-c1-w01-g3",
      block: "grammar",
      stem: "Such statements ___ checked.",
      options: ["can hardly been", "can hardly being", "can hardly be", "are hardly can be"],
      answer: 2,
      why: "Modal + edilgen: `can be checked`, ve `hardly` modal ile mastar arasına girer: `can hardly be`. Modal fiili yalın mastar izler; `been` ve `being` `can`den sonra gelmez.",
      targets: ["passive.modal", "adverb.position"],
    },
    {
      id: "en-c1-w01-g4",
      block: "grammar",
      stem: "The authors ___ that they followed a thousand employees.",
      options: ["reports", "report", "reporting", "are report"],
      answer: 1,
      why: "`The authors` çoğul, o yüzden fiil `-s` almaz. Bildirme fiilleri (`report`, `claim`, `argue`) akademik yazıda aktarımı işaretler ve kesinlik derecesini onlar taşır.",
      targets: ["verb.reporting", "subject-verb.agreement"],
    },
    {
      id: "en-c1-w01-g5",
      block: "grammar",
      stem: "The link, ___ the authors present as firmly established, is disputed.",
      options: ["that", "what", "who", "which"],
      answer: 3,
      why: "Virgüller arasındaki ilgi cümlesi TANIMLAMAYAN türdendir ve `which` ister; `that` yalnız tanımlayan ilgi cümlesinde kullanılır ve virgül almaz. Ayrım anlamlıdır: burada bağ zaten belirli, cümle ek bilgi veriyor.",
      targets: ["relative.non-defining", "punctuation.comma"],
      byNative: {
        de: {
          options: ["that", "what", "who", "which"],
          answer: 3,
          why: "Almancada ilgi cümlesi her zaman virgülle ayrılır ve tanımlayan/tanımlamayan ayrımı yazımda görünmez. O yüzden virgülün İngilizcede bir ANLAM taşıdığı gözden kaçıyor ve `that` seçiliyor.",
        },
      },
    },

    /* ── Bağlamda kelime ───────────────────────────────────────────────── */
    {
      id: "en-c1-w01-v1",
      block: "vocab",
      stem: "Critics ___ that breaks are useful, but question the evidence.",
      options: ["acknowledge", "announce", "admit to", "recognise as"],
      answer: 0,
      why: "`acknowledge that` karşı tarafın haklı yanını kabul etmek demek ve `that` cümlesi alır. `announce` duyurmaktır; `admit to` ve `recognise as` başka tamlayıcılar ister ve `that` cümlesiyle kurulmaz.",
      targets: ["verb.acknowledge", "argument.concession"],
    },
    {
      id: "en-c1-w01-v2",
      block: "vocab",
      stem: "A considerable part of the data ___ self-report.",
      options: ["stands on", "lies in", "rests on", "holds on"],
      answer: 2,
      why: "`rest on` bir şeyin bir dayanağa oturmasını anlatır ve kanıt dilinin yerleşik eşdizimidir. Öteki üçü gerçek öbekler ama başka alanlara ait: durmak, bulunmak, tutunmak.",
      targets: ["collocation.rest-on", "wordfield.evidence"],
    },
    {
      id: "en-c1-w01-v3",
      block: "vocab",
      stem: "The results have been ___ by several specialists.",
      options: ["placed into question", "called into question", "set into question", "taken into question"],
      answer: 1,
      why: "`call into question` sorgulamak anlamında sabit bir öbektir ve fiili değişmez. Anlamı parçalarından türetilemediği için, yakın anlamlı fiiller (`place`, `set`, `take`) öbeği bozar.",
      targets: ["collocation.fixed", "wordfield.evidence"],
      byNative: {
        de: {
          options: ["placed into question", "called into question", "set into question", "taken into question"],
          answer: 1,
          why: "Almanca `in Frage stellen` öbeğindeki `stellen` İngilizcede `place` ya da `set` gibi görünüyor ve doğrudan aktarılıyor. İngilizcede öbeğin fiili `call`.",
        },
      },
    },
  ],
};
