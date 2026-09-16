import type { QuizWeek } from "../types";

/**
 * A2 · Hafta 4 · İş ve başvuru (İngilizce kursu).
 *
 * ÖLÇÜLEN ŞEY: bir iş ilanını ve iş görüşmesini anlamak; deneyim için
 * `Have you ever…?`, tarihli olayda past simple, geçmiş zorunluluk `had to`,
 * `the best`, meslekten önce `a`. Geri dönüş: `past.irregular` (W1),
 * `modal.have-to`, `article.a-an` ve `present-perfect.since-for` (W2).
 *
 * ÇELDİRİCİLERİN GEREKÇESİ:
 *  - `w04-g3` (`had to`): Almanca `musste` geçmiş olduğu için `must` da geçmiş
 *    sanılıyor.
 *  - `w04-v1` (`got`): Almanca `bekommen` → `became`, A1 Almanca kursundaki
 *    `verb.bekommen` tuzağının ters yönü; Türk öğrenci 'almak' → `took`/`bought`.
 *  - `w04-v3` (`mobile phone`): Almanca `Handy` yalnız varyantta şık — tabanda
 *    Türk öğrenci için anlamsız bir çeldirici olurdu.
 *  - `w04-g1` varyantsız: `Have you ever…?` iki anadilde de aynı biçimde
 *    karışıyor, uydurma fark yazılmadı.
 */
export const EN_A2_W04: QuizWeek = {
  id: "en-a2-w04",
  course: "en",
  level: "A2",
  no: 4,
  theme: "Work and looking for a job",
  themeTr: "İş ve başvuru",
  canDo: ["A2.RD.2", "A2.LS.3", "A2.GR.11", "A2.GR.13", "A2.GR.14", "A2.GR.16"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Job advert",
      genreTr: "İş ilanı",
      title: "Summer job at the Seaside Hotel",
      body:
        "We are looking for friendly people to work in our hotel restaurant from June until September. " +
        "You will serve food and drinks to our guests and help in the kitchen. " +
        "The job is full-time: you work 40 hours a week, usually from 7 am to 3 pm. " +
        "You don't need experience, because our team will teach you everything. " +
        "You must speak good English. If you also speak Spanish or German, that's a big advantage, because many of our guests come from abroad. " +
        "You will earn 12 pounds an hour, and you get a free lunch every day. " +
        "Interested? Send an email to our manager, Mr Brown, before 30 April. " +
        "Tell us a little about yourself and when you can start.",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Job interview",
      genreTr: "İş görüşmesi",
      plays: 2,
      segments: [
        { speaker: "Ms Hill", text: "Good morning, Mr Demir. Please sit down. So, why do you want to work here?" },
        { speaker: "Mr Demir", text: "I love working with people, and I'd like to practise my English." },
        { speaker: "Ms Hill", text: "Have you ever worked in a hotel?" },
        { speaker: "Mr Demir", text: "No, I haven't. But I worked in a café in Ankara for two years." },
        { speaker: "Ms Hill", text: "And how long have you lived in England?" },
        { speaker: "Mr Demir", text: "I've lived here since January. Before that, I studied English at a language school in Ankara." },
        { speaker: "Ms Hill", text: "Can you work at weekends?" },
        { speaker: "Mr Demir", text: "Yes, I can. But I can't work on Monday mornings, because I have an English course then." },
        { speaker: "Ms Hill", text: "That's OK. Can you start on the first of June?" },
        { speaker: "Mr Demir", text: "Yes, of course." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ───────────────────────────────────────────────── */
    {
      id: "en-a2-w04-r1",
      block: "read",
      ref: "t1",
      stem: "Do you need experience for this job?",
      options: ["Yes, at least one year.", "No, but you must speak Spanish.", "Yes, in a restaurant.", "No, the team will teach you."],
      answer: 3,
      why: "`You don't need experience` ve gerekçesi `because` ile geliyor. `No, but you must speak Spanish` yarı doğru bir tuzak: deneyim gerekmiyor ama İspanyolca şart değil, `a big advantage` yalnız bir artı. `must` ile `advantage` aynı ağırlıkta değil.",
      targets: ["reading.detail"],
    },
    {
      id: "en-a2-w04-r2",
      block: "read",
      ref: "t1",
      stem: "How much does the job pay?",
      options: ["12 pounds a day", "40 pounds a week", "12 pounds an hour", "3 pounds an hour"],
      answer: 2,
      why: "İlanda üç sayı var: 40 haftalık saat, 12 saatlik ücret, 3 çıkış saati. Bir sayıyı birimiyle birlikte okumak gerekiyor: `an hour` ücreti, `a week` süreyi, `pm` saati bildiriyor.",
      targets: ["reading.detail"],
    },
    {
      id: "en-a2-w04-r3",
      block: "read",
      ref: "t1",
      stem: "What should you write in your email?",
      options: [
        "how much money you want to earn",
        "something about you and when you can start",
        "where you worked before and what your job was",
        "which languages you speak at home",
      ],
      answer: 1,
      why: "Son cümle iki şey istiyor: kendinden biraz söz etmen ve ne zaman başlayabileceğin. Bir başvuruda mantıklı görünen ama ilanın istemediği bilgiyi seçmek, metni değil kendi beklentini okumak olur.",
      targets: ["reading.detail"],
    },

    /* ── Dinlediğini anlama ─────────────────────────────────────────────── */
    {
      id: "en-a2-w04-l1",
      block: "listen",
      ref: "a1",
      stem: "Where did Mr Demir work before?",
      options: ["in a hotel", "in a language school", "in a café", "in a restaurant"],
      answer: 2,
      why: "`Have you ever worked in a hotel?` sorusuna verilen `No, I haven't` oteli eliyor; asıl deneyim `But` ile geliyor. Dil okulu çalıştığı değil okuduğu yer (`studied`); fiile bakmadan yer adını eşlemek hata.",
      targets: ["listening.detail", "present-perfect.ever-never"],
    },
    {
      id: "en-a2-w04-l2",
      block: "listen",
      ref: "a1",
      stem: "How long has Mr Demir lived in England?",
      options: ["for two years", "since January", "since June", "for one year"],
      answer: 1,
      why: "İki süre duyuluyor: iki yıl kafe işi (bitmiş, past simple `worked`) ve Ocak'tan beri İngiltere (present perfect `I've lived`, hâlâ sürüyor). `How long have you…?` yalnız bugün de süren durumu sorar.",
      targets: ["listening.detail", "present-perfect.since-for"],
    },
    {
      id: "en-a2-w04-l3",
      block: "listen",
      ref: "a1",
      stem: "When can't Mr Demir work?",
      options: ["at weekends", "in June", "in the evenings", "on Monday mornings"],
      answer: 3,
      why: "`Yes, I can. But…` kalıbında kısıt `But`tan sonra gelir. Hafta sonu sorusunun cevabı evet; ilk duyulan `Yes`i bütün cevaba yaymak, arkasından gelen istisnayı kaçırmak demek.",
      targets: ["listening.detail"],
    },

    /* ── Dilbilgisi ─────────────────────────────────────────────────────── */
    {
      id: "en-a2-w04-g1",
      block: "grammar",
      stem: "___ you ever worked in a team?",
      options: ["Did", "Were", "Have", "Do"],
      answer: 2,
      why: "`ever` ile deneyim sorusu genellikle present perfect ile kurulur (Amerikan İngilizcesinde `Did you ever work…?` da duyulur). Cümledeki `worked` burada fiilin üçüncü hâli ve `have` ister; `Did` ile gelseydi fiil yalın (`work`) olurdu.",
      targets: ["present-perfect.ever-never", "past.did-question"],
    },
    {
      id: "en-a2-w04-g2",
      block: "grammar",
      stem: "I ___ my last job in 2023.",
      options: ["have left", "left", "have leaved", "leave"],
      answer: 1,
      why: "Tarihi verilmiş bitmiş bir olay (`in 2023`) past simple ister; present perfect zamanı söylenmeyen ya da bugüne uzanan durum içindir. `leave` düzensiz: `left`.",
      targets: ["tense.past-vs-present-perfect", "past.irregular"],
      byNative: {
        de: {
          options: ["left", "have left", "have leaved", "leave"],
          answer: 0,
          why: "Almanca `Ich habe 2023 … gekündigt` Perfekt'le kurulur. İngilizcede tarih verilen bitmiş olay past simple ister; `have left` ile `in 2023` bir arada gelmez.",
        },
      },
    },
    {
      id: "en-a2-w04-g3",
      block: "grammar",
      stem: "In my old job I ___ start work at 6 am every day.",
      options: ["must", "have to", "had to", "musted"],
      answer: 2,
      why: "`must`ın geçmiş biçimi yok; geçmişteki zorunluluk `had to` ile anlatılır. `have to` bugünü anlatır, cümle ise `old job` ile geçmişte.",
      targets: ["modal.have-to"],
      byNative: {
        de: {
          options: ["had to", "must", "have to", "musted"],
          answer: 0,
          why: "Almanca `ich musste` → `must` aktarımı: `musste` geçmiş ama İngilizce `must` geçmiş olamaz. Geçmişteki zorunluluk `had to`.",
        },
      },
    },
    {
      id: "en-a2-w04-g4",
      block: "grammar",
      stem: "This is ___ job I've ever had!",
      options: ["the better", "the best", "best", "the most good"],
      answer: 1,
      why: "`ever` ile 'şimdiye kadarki en…' anlamı superlative ister: `the best`. `good` düzensiz (good–better–best), `most good` kurulmaz. Superlative isimden önce `the` alır; Türkçe 'en iyi iş'te artikel olmadığı için `the` düşürülüyor.",
      targets: ["compare.superlative", "present-perfect.ever-never"],
      byNative: {
        de: {
          options: ["best", "the most good", "the better", "the best"],
          answer: 3,
          why: "Almancada da `der beste Job`, artikel sezgisi doğru. Tuzak `good`un düzensizliği: `the most good` ya da `the better` kurulmaz, `good`–`better`–`best`.",
        },
      },
    },
    {
      id: "en-a2-w04-g5",
      block: "grammar",
      stem: "My sister works as ___ nurse in a big hospital.",
      options: ["(no word)", "a", "the", "an"],
      answer: 1,
      why: "Meslek söylerken İngilizcede `a`/`an` zorunlu: `She is a nurse`, `works as a nurse`. Türkçede 'hemşire olarak' artikelsiz; ama İngilizcede tekil sayılabilen isim çıplak duramaz.",
      targets: ["article.a-an"],
      byNative: {
        de: {
          options: ["a", "(no word)", "the", "an"],
          answer: 0,
          why: "Almanca `Sie arbeitet als Krankenschwester` artikelsiz. İngilizcede meslekten önce `a` gelir: `as a nurse`.",
        },
      },
    },

    /* ── Bağlamda kelime ────────────────────────────────────────────────── */
    {
      id: "en-a2-w04-v1",
      block: "vocab",
      stem: "I ___ a letter from the company yesterday.",
      options: ["took", "bought", "got", "made"],
      answer: 2,
      why: "Mektup, mesaj ya da para sana gelince `get` (`receive`) kullanılır: 'mektup aldım' → `I got a letter`. Türkçe 'almak' hem `take` hem `buy` anlamına geldiği için `took` ve `bought` seçiliyor; mektup ne alınıp götürülür ne satın alınır.",
      targets: ["verb.get", "falsefriend.become"],
      byNative: {
        de: {
          options: ["became", "got", "took", "made"],
          answer: 1,
          why: "Almanca `bekommen` → `became` sahte dost: İngilizce `become` 'olmak' demek. 'Bir mektup aldım' `I got a letter`.",
        },
      },
    },
    {
      id: "en-a2-w04-v2",
      block: "vocab",
      stem: "How much do you ___ in your new job?",
      options: ["win", "pay", "earn", "spend"],
      answer: 2,
      why: "Çalışarak para kazanmak `earn`; `win` bir yarışmada ya da oyunda kazanmak. Türkçe 'kazanmak' ikisini de karşıladığı için `win` seçiliyor. `pay` parayı veren tarafın fiili.",
      targets: ["verb.earn-win"],
      byNative: {
        de: {
          options: ["earn", "win", "spend", "pay"],
          answer: 0,
          why: "Almancadaki ayrım İngilizcede aynen var: `verdienen` → `earn`, `gewinnen` → `win`. `pay` Almanca `bezahlen` gibi ödeyen tarafın fiili, `spend` ise parayı harcamak.",
        },
      },
    },
    {
      id: "en-a2-w04-v3",
      block: "vocab",
      stem: "Can I use your ___? I need to call the manager.",
      options: ["phone call", "mobile phone", "phone number", "phone line"],
      answer: 1,
      why: "Cep telefonu cihazı `mobile phone` (Amerikan İngilizcesinde `cell phone`). `phone call` bir arama, `phone number` numara: ikisi de kullanılacak bir nesne değil. Türkçe 'telefon' hem cihaz hem arama demek ('bir telefon edeyim'), o yüzden `phone call` seçiliyor; bileşik isimde anlamı ikinci sözcük taşır.",
      targets: ["noun.phone"],
      byNative: {
        de: {
          options: ["handy", "mobile phone", "phone call", "phone number"],
          answer: 1,
          why: "Almanca `Handy` İngilizce bir sözcük değil: İngilizce `handy` 'kullanışlı' demek. Cep telefonu `mobile phone`.",
        },
      },
    },
  ],
};
