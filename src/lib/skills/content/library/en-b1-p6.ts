import type { SkillExercise } from "../../types";

/**
 * EN · B1 — Beceriler kütüphanesi, parti 6.
 *
 * Kurallar ve emsal: `en-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 6 yerel hizmet hattı: kütüphane değerlendirmesi, ödünç alma
 * konuşması, hizmete dair bir görüş yazısı. Dil bilgisi geçmiş alışkanlık —
 * used to ve would.
 */
export const enB1P6: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-lib-r6",
    course: "en",
    level: "B1",
    skill: "reading",
    title: "Four Stars for a Building I Never Enter",
    genre: "review",
    intro: "Bir kullanıcı mahalle kütüphanesini değerlendirmiş: neyi kullanıyor, neyi hiç kullanmıyor, neden yine de iyi buluyor.",
    gloss: [
      { de: "library", tr: "kütüphane" },
      { de: "to reserve", tr: "ayırtmak" },
      { de: "locker", tr: "dolap" },
      { de: "staff", tr: "çalışanlar" },
      { de: "to renew", tr: "süre uzatmak" },
      { de: "quiet", tr: "sessiz" },
      { de: "judge", tr: "değerlendirmek" },
      { de: "search", tr: "arama yapmak" },
      { de: "log", tr: "oturumu kapatmak" },
      { de: "pick", tr: "gidip almak" },
      { de: "enter", tr: "girmek" },
      { de: "stupid", tr: "aptal" },
      { de: "basic", tr: "basit" },
      { de: "title", tr: "kitap adı" },
    ],
    minutes: 6,
    text:
      "Four stars for a building I never enter\n\n" +
      "I have had a card for this library for three years and I have been inside twice. " +
      "That sounds like a bad review, but it isn't.\n\n" +
      "Almost everything I use is online. I reserve a book from my phone, I get a message " +
      "two days later, and I pick it up from a locker by the door. I can renew books without " +
      "asking anyone. Last winter I read eleven books this way and paid nothing.\n\n" +
      "The two times I did go in, the staff were patient with a question that must sound very " +
      "stupid by now. Nobody made me feel that I was wasting their time.\n\n" +
      "What I cannot judge is the part most people come for: the quiet room, the children's " +
      "hour on Saturdays, the free computers. My neighbor, who has three children and no " +
      "printer at home, uses all of it and says the printer is the real service.\n\n" +
      "So why four stars and not five? The app. It logs me out every week, it looks like it " +
      "was built in 2011, and the search only works if you already know the title. " +
      "For a library whose best service is the one you never see, that is the wrong place " +
      "to save money.",
    questions: [
      {
        text: "Why does the writer give a good review?",
        options: [
          "because the building is beautiful",
          "because the online service works well",
          "because the staff visit readers at home",
        ],
        answer: 1,
        explain: "Neredeyse her şeyi çevrimiçi kullanıyor ve kitapları dolaptan alıyor.",
      },
      {
        text: "What does the writer say about the staff?",
        options: [
          "They were patient with a basic question.",
          "They were too busy to help.",
          "They insisted on a printed card.",
        ],
        answer: 0,
        explain: "„the staff were patient with a question that must sound very stupid by now“.",
      },
      {
        kind: "truefalse",
        text: "The writer uses the quiet room and the free computers.",
        options: ["True", "False"],
        answer: 1,
        explain: "Bunları değerlendiremediğini söylüyor; kullanan komşusu.",
      },
      {
        kind: "gapfill",
        text: "The writer read ___ books last winter.",
        options: [],
        answer: 0,
        accept: ["eleven", "11"],
        explain: "„Last winter I read eleven books this way“.",
      },
      {
        kind: "short_answer",
        text: "What does the neighbor call the real service?",
        options: [],
        answer: 0,
        accept: ["the printer", "printer", "the free printer"],
        explain: "„says the printer is the real service“.",
      },
      {
        text: "What is the writer's main criticism?",
        options: ["the library hours", "the app", "the number of books"],
        answer: 1,
        explain: "Uygulama sürekli çıkış yapıyor ve arama yalnız başlık biliniyorsa çalışıyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-lib-l6",
    course: "en",
    level: "B1",
    skill: "listening",
    title: "The Book Somebody Else Wants",
    genre: "dialogue",
    intro: "Kütüphane masasında bir sorun çözülüyor: gecikmiş bir kitap, bir bekleyen ve bir ceza.",
    gloss: [
      { de: "to return", tr: "iade etmek" },
      { de: "fine", tr: "ceza" },
      { de: "waiting list", tr: "bekleme listesi" },
      { de: "to extend", tr: "uzatmak" },
      { de: "receipt", tr: "makbuz" },
      { de: "to waive", tr: "ücreti silmek" },
      { de: "unpaid", tr: "ödenmemiş" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Mr. Patel", text: "I'd like to return this one and keep the other for another two weeks, if that's possible." },
      { speaker: "Ms. Oduya", text: "The first one is fine. The second I can't extend, I'm afraid — there are four people on the waiting list." },
      { speaker: "Mr. Patel", text: "Four? For a book about kitchen gardens?" },
      { speaker: "Ms. Oduya", text: "It's the season. Everybody remembers their garden in March and forgets it again in July." },
      { speaker: "Mr. Patel", text: "Fair enough. When is it due back?" },
      { speaker: "Ms. Oduya", text: "Saturday. And there's a fine on your account from last year, one pound eighty." },
      { speaker: "Mr. Patel", text: "I paid that. I'm fairly sure I paid it at the machine in the hall." },
      { speaker: "Ms. Oduya", text: "Then the machine didn't send it through. It happens. Do you have the receipt?" },
      { speaker: "Mr. Patel", text: "Not with me, no." },
      { speaker: "Ms. Oduya", text: "I'll waive it. It's less work than checking, and one pound eighty isn't worth either of our afternoons." },
    ],
    questions: [
      {
        text: "Why can't Mr. Patel keep the second book?",
        options: [
          "It is damaged.",
          "Four people are waiting for it.",
          "He has an unpaid fine.",
        ],
        answer: 1,
        explain: "„there are four people on the waiting list“.",
      },
      {
        text: "How does Ms. Oduya explain the waiting list?",
        options: [
          "The book is new.",
          "People think about gardens in spring.",
          "The library bought only one copy.",
        ],
        answer: 1,
        explain: "„Everybody remembers their garden in March and forgets it again in July.“",
      },
      {
        kind: "truefalse",
        text: "Mr. Patel has the receipt with him.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Not with me, no.“",
      },
      {
        kind: "gapfill",
        text: "The fine on the account is one pound ___.",
        options: [],
        answer: 0,
        accept: ["eighty", "80"],
        explain: "„one pound eighty“.",
      },
      {
        kind: "short_answer",
        text: "When must the second book come back?",
        options: [],
        answer: 0,
        accept: ["Saturday", "on Saturday", "by Saturday"],
        explain: "„Saturday.“",
      },
      {
        text: "Why does Ms. Oduya waive the fine?",
        options: [
          "Checking would cost more time than the fine is worth.",
          "Mr. Patel complained.",
          "The library has a rule about old fines.",
        ],
        answer: 0,
        explain: "„It's less work than checking, and one pound eighty isn't worth either of our afternoons.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-lib-w6",
    course: "en",
    level: "B1",
    skill: "writing",
    title: "Is a Local Library Still Worth It?",
    genre: "opinion",
    intro: "Yerel bir gazetenin okur köşesine yazıyorsun: önce iki cümle kur, sonra dengeli bir görüş yazısı yaz.",
    gloss: [
      { de: "to fund", tr: "finanse etmek" },
      { de: "council", tr: "belediye meclisi" },
      { de: "to close down", tr: "kapatmak" },
      { de: "service", tr: "hizmet" },
      { de: "to replace", tr: "yerini almak" },
      { de: "branch", tr: "şube" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Eskiden her cumartesi kütüphaneye giderdik.",
        answer: "We used to go to the library every Saturday.",
        alternatives: ["We would go to the library every Saturday."],
        hint: "Geçmişte tekrarlanan ama artık yapılmayan alışkanlık: used to / would.",
      },
      {
        kind: "build",
        tr: "İnternet kütüphanenin yerini alamaz.",
        answer: "The internet cannot replace a library.",
        alternatives: ["A library cannot be replaced by the internet."],
        hint: "„replace“ doğrudan nesne alır; „replace with“ ayrı bir kalıptır.",
      },
      {
        kind: "free",
        prompt:
          "Yerel kütüphane üzerine bir görüş yazısı yaz: konuyu tanıt ve görüşünü söyle, iki gerekçe ver, en güçlü karşı görüşü yaz ve ona cevap ver, sonunda somut bir öneriyle bitir.",
        checklist: [
          "Konuyu tanıt ve görüşünü tek cümleyle söyle",
          "İki farklı gerekçe ver",
          "En güçlü karşı görüşü yaz ve cevapla",
          "Somut bir öneriyle bitir",
        ],
        minWords: 90,
        phrases: [
          { de: "The council is considering …", tr: "Belediye meclisi …'i değerlendiriyor", en: "" },
          { de: "In my view, the main argument is …", tr: "Bana göre asıl argüman …", en: "" },
          { de: "Some people say that …", tr: "Bazıları … diyor", en: "" },
          { de: "That may be true, but …", tr: "Bu doğru olabilir ama …", en: "" },
          { de: "Instead of closing it, the council could …", tr: "Kapatmak yerine meclis … yapabilir", en: "" },
        ],
        sample:
          "The council is considering closing the branch on Birch Road, and I think that would be " +
          "a mistake. In my view, the main argument is not the books at all. " +
          "It is the printer, the free computers and the quiet room, which are used every day by " +
          "people who have none of these things at home. " +
          "Secondly, the library is the only place in this part of town where you can sit for an " +
          "hour without buying something. " +
          "Some people say that the internet has replaced all of this and that almost nobody " +
          "borrows books any more. That may be true for readers like me, who reserve everything " +
          "online, but the internet cannot replace a room. " +
          "Instead of closing it, the council could open the building for shorter hours and " +
          "spend the money it saves on a better app. The service most people never see is " +
          "the one that is easiest to cut and hardest to bring back.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b1-lib-s6",
    course: "en",
    level: "B1",
    skill: "speaking",
    title: "Learning From Mistakes or From Advice?",
    genre: "monologue",
    intro: "Yaklaşık bir dakika tek başına konuşacaksın: bir soruyu kendi deneyiminle cevapla.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "İnsan kendi hatalarından mı yoksa başkalarının tavsiyelerinden mi daha iyi öğrenir? Görüşünü söyle, kendi hayatından bir örnek ver ve görüşünün geçerli olmadığı bir durumu anlat.",
      bulletsTr: [
        "Sorunun cevabını tek cümleyle ver",
        "Kendi deneyiminden somut bir örnek anlat",
        "Görüşünün işlemediği bir durumu söyle",
        "Bir tavsiye ile bitir",
      ],
      targets: [
        { de: "In my experience, it depends on …", tr: "Benim deneyimime göre bu … bağlı" },
        { de: "I only really understood this when …", tr: "Bunu gerçekten … olduğunda anladım" },
        { de: "There are cases where that doesn't work, for example …", tr: "Bunun işlemediği durumlar var, örneğin …" },
        { de: "So what I would say to someone is …", tr: "Yani birine şunu söylerdim: …" },
      ],
      minSeconds: 40,
      maxSeconds: 80,
      sampleDe:
        "In my experience, it depends on how expensive the mistake is. " +
        "For small things, I learn much better by doing them wrong. " +
        "People told me for two years that I should not translate word by word when I speak, " +
        "and I nodded every time, and I kept doing it. " +
        "I only really understood this when I had to explain a problem at work in English and " +
        "nobody understood my second sentence. After that meeting I changed how I prepare, " +
        "and I have never gone back. " +
        "There are cases where that doesn't work, for example with anything that is dangerous " +
        "or costs a lot of money. Nobody should learn about electricity or about contracts by " +
        "making their own mistakes. " +
        "So what I would say to someone is this: take advice seriously when a mistake would be " +
        "hard to undo, and stop asking for advice when the worst thing that can happen is " +
        "a bit of embarrassment.",
      rubricHint:
        "Somut bir örnek ve bir sınır beklenir; „it depends on“, „I only really understood this when“ ve „would say“ kalıpları kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b1-lib-g6",
    course: "en",
    level: "B1",
    skill: "grammar",
    title: "I used to walk to school",
    genre: "grammar",
    intro: "Geçmişte olan ama artık olmayan şeyler için ayrı bir yapı var; „would“ ile arasındaki sınırı öğren.",
    focus: "used to, would ve be used to ayrımı",
    gloss: [
      { de: "to walk", tr: "yürümek" },
      { de: "abroad", tr: "yurt dışı" },
      { de: "noise", tr: "gürültü" },
      { de: "shift", tr: "vardiya" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "used to: artık olmayan",
        tr: "„used to + yalın fiil“ geçmişte düzenli olan ama ARTIK olmayan bir durumu ya da alışkanlığı anlatır: „I used to walk to school.“ Soru ve olumsuzda „did“ gelir ve biçim „use to“ olur: „Did you use to …?“, „I didn't use to …“.",
        examples: [
          { de: "I used to walk to school.", tr: "Eskiden okula yürürdüm.", note: "artık yürümüyor" },
          { de: "She didn't use to like coffee.", tr: "Eskiden kahveyi sevmezdi.", note: "olumsuzda use to" },
          { de: "Did you use to live abroad?", tr: "Eskiden yurt dışında mı yaşardın?", note: "soruda use to" },
        ],
      },
      {
        heading: "would: yalnız eylemler",
        tr: "„would“ da geçmiş alışkanlık anlatır ama YALNIZ tekrarlanan EYLEMLER için: „Every summer we would drive to the coast.“ Bir DURUM anlatıyorsan („I used to have a car“, „She used to be a teacher“) „would“ kullanılamaz. Ayrıca „would“ genellikle bir zaman çerçevesiyle birlikte gelir.",
        examples: [
          { de: "Every summer we would drive to the coast.", tr: "Her yaz sahile arabayla giderdik.", note: "eylem" },
          { de: "I used to have long hair.", tr: "Eskiden uzun saçlıydım.", note: "durum: would olmaz" },
          { de: "He used to be a nurse.", tr: "Eskiden hemşireydi.", note: "durum: would olmaz" },
        ],
      },
      {
        heading: "be used to: alışkın olmak",
        tr: "Bu üçüncü yapı bambaşka bir şey söyler: „be used to“ bir şeye ALIŞKIN olmak demektir ve arkasından isim ya da -ing gelir. „I'm used to the noise“ — gürültüye alışığım. „get used to“ ise alışma sürecini anlatır. Bunları „used to“ ile karıştırmak anlamı tamamen değiştirir.",
        examples: [
          { de: "I'm used to the noise now.", tr: "Artık gürültüye alıştım.", note: "be used to + isim" },
          { de: "She isn't used to working nights.", tr: "Gece çalışmaya alışkın değil.", note: "be used to + -ing" },
          { de: "You'll get used to the shifts.", tr: "Vardiyalara alışacaksın.", note: "alışma süreci" },
        ],
      },
    ],
    questions: [
      {
        text: "I ___ walk to school when I was seven.",
        options: ["use to", "used to", "am used to"],
        answer: 1,
        explain: "Olumlu cümlede biçim „used to“dur.",
      },
      {
        text: "Which sentence is correct?",
        options: [
          "I would have long hair.",
          "I used to have long hair.",
          "I am used to have long hair.",
        ],
        answer: 1,
        explain: "„have“ burada bir durumdur; „would“ yalnız eylemlerde kullanılır.",
      },
      {
        text: "„I'm used to the noise.“ means:",
        options: [
          "The noise was there in the past.",
          "The noise does not bother me now.",
          "I want the noise to stop.",
        ],
        answer: 1,
        explain: "„be used to“ alışkın olmayı bildirir.",
      },
      {
        kind: "gapfill",
        text: "She didn't ___ to like coffee. (use / used)",
        options: [],
        answer: 0,
        accept: ["use"],
        explain: "„did“ varsa biçim „use“ olur: didn't use to.",
      },
      {
        kind: "gapfill",
        text: "Every summer we ___ drive to the coast. (would / used to)",
        options: [],
        answer: 0,
        accept: ["would", "used to"],
        explain: "Tekrarlanan bir eylem: hem „would“ hem „used to“ olur. Durum anlatılsaydı yalnız „used to“ kalırdı.",
      },
      {
        kind: "gapfill",
        text: "She isn't used to ___ nights. (work)",
        options: [],
        answer: 0,
        accept: ["working"],
        explain: "„be used to“ arkasından -ing gelir.",
      },
      {
        kind: "gapfill",
        text: "___ you use to live abroad?",
        options: [],
        answer: 0,
        accept: ["Did", "did"],
        explain: "Soruda yardımcı fiil did'dir.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["You'll", "get", "used to", "the new shifts"],
        explain: "get used to + isim: alışma sürecini bildirir.",
      },
      {
        kind: "truefalse",
        text: "„He would be a nurse.“ — Bu cümle geçmiş bir mesleği anlatır mı?",
        options: ["True", "False"],
        answer: 1,
        explain: "Durum anlatılıyor; doğrusu „He used to be a nurse.“",
      },
      {
        kind: "truefalse",
        text: "„I used to walk to school.“ — Bu cümle bugün de yürüdüğünü söyler mi?",
        options: ["True", "False"],
        answer: 1,
        explain: "„used to“ artık yapılmayan bir şeyi bildirir.",
      },
    ],
  },
];
