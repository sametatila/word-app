import type { SkillExercise } from "../../types";

/**
 * EN · B2 — Beceriler kütüphanesi, parti 3.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 3. seti taşır (kimlik sonu 3).
 * Kurallar ve emsal: `en-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Alan adı `de` İngilizce metni taşır; `en` alanı bu kursta yazılmaz.
 * Türler: tüketici rehberi, uzman sunumu ve kurum içi yönerge. Üçü de iş
 * yaptırma ve kaynaksız aktarım diliyle yazılmış.
 */
export const enB2P3: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-lib-r3",
    course: "en",
    level: "B2",
    skill: "reading",
    title: "Before You Have Work Done on Your Flat",
    genre: "Bilgilendirme",
    intro: "Tadilat yaptıracaklara yönelik bir rehber okuyacaksın: teklifler nasıl okunur, ödeme nasıl bölünür, ne yazıya geçirilir.",
    gloss: [
      { de: "dispute", tr: "anlaşmazlık" },
      { de: "quote", tr: "teklif" },
      { de: "disposal", tr: "bertaraf" },
      { de: "coat", tr: "kat" },
      { de: "delay", tr: "gecikme" },
      { de: "in advance", tr: "peşin" },
      { de: "settle", tr: "çözmek" },
    ],
    minutes: 9,
    text:
      "BEFORE YOU HAVE WORK DONE ON YOUR FLAT\n\n" +
      "Most disputes about building work do not start with bad work. They start with two people who each " +
      "believed something different and never wrote it down.\n\n" +
      "Get three quotes, and read them side by side before you read the prices. A quote that is fifteen per " +
      "cent cheaper is often cheaper because something has been left out: the removal of the old material, the " +
      "disposal fee, the second coat. It is said in the trade that the second page is where the money is, and " +
      "the second page is the one people skip.\n\n" +
      "Have the start and the end written into the contract, together with what happens if they move. It is " +
      "widely reported that most delays are caused by materials, not by workers, and materials are ordered by " +
      "whoever placed the order first. If you sign in March for work in September, ask when the order will " +
      "actually be placed.\n\n" +
      "Do not have everything paid before the work is finished. A third at the start, a third in the middle and " +
      "a third on completion is normal; anything above half in advance should be questioned. If you are asked " +
      "for cash, ask for the reason in writing.\n\n" +
      "Photograph the room before anybody starts. It costs nothing and it settles nine arguments out of ten.\n\n" +
      "Finally, the point that is most often forgotten: agree who cleans. It sounds small until a Friday " +
      "evening when you have your kitchen back but cannot cook in it. Have that written down as well. " +
      "A sentence in a contract is cheaper than a phone call at nine on a Friday.",
    questions: [
      {
        text: "What is the main advice of the text?",
        options: [
          "write things down before the work starts",
          "always choose the cheapest quote",
          "never pay anything before the end",
        ],
        answer: 0,
        explain: "„They start with two people who each believed something different and never wrote it down.“",
      },
      {
        text: "Why can a cheaper quote be cheaper?",
        options: [
          "Something has been left out of it.",
          "The workers are always less experienced.",
          "The materials are always of lower quality.",
        ],
        answer: 0,
        explain: "„… often cheaper because something has been left out: the removal of the old material, the disposal fee, the second coat.“",
      },
      {
        kind: "truefalse",
        text: "The text says that most delays are caused by workers.",
        options: ["True", "False"],
        answer: 1,
        explain: "„It is widely reported that most delays are caused by materials, not by workers.“",
      },
      {
        kind: "gapfill",
        text: "Anything above ___ in advance should be questioned.",
        options: [],
        answer: 0,
        accept: ["half", "a half"],
        explain: "„… anything above half in advance should be questioned.“",
      },
      {
        kind: "short_answer",
        text: "What should you do before anybody starts?",
        options: [],
        answer: 0,
        accept: ["photograph the room", "take photos of the room", "photograph everything"],
        explain: "„Photograph the room before anybody starts. It costs nothing …“",
      },
      {
        text: "Why does the text mention cleaning?",
        options: [
          "Because it is forgotten and causes arguments.",
          "Because it is the most expensive part.",
          "Because the law requires it in a contract.",
        ],
        answer: 0,
        explain: "„… the point that is most often forgotten: agree who cleans.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-lib-l3",
    course: "en",
    level: "B2",
    skill: "listening",
    title: "Where Stolen Bikes Go",
    genre: "Sunum",
    intro: "Bisiklet hırsızlığı üzerine kısa bir sunum dinleyeceksin: yaygın inanışlar, gerçek rakamlar ve tek bir öneri.",
    gloss: [
      { de: "recover", tr: "geri bulmak" },
      { de: "frame", tr: "kadro" },
      { de: "prove", tr: "kanıtlamak" },
      { de: "assume", tr: "varsaymak" },
      { de: "lock", tr: "kilit" },
      { de: "owner", tr: "sahip" },
    ],
    minutes: 9,
    segments: [
      { text: "Good evening. I have twenty minutes and one message: almost everything you have been told about bicycle theft is a little bit wrong." },
      { text: "It is often said that bikes are stolen by organized gangs and driven abroad. Some are. But in this city, seventy per cent of recovered bikes are found within four kilometers of where they were taken." },
      { text: "It is also believed that expensive locks are the answer. They help, but the strongest lock in the world is useless around a wheel." },
      { text: "Now the part that matters. Every year we recover about eleven hundred bikes. Fewer than one in ten is returned to its owner." },
      { text: "That is not because we do not try. It is because we cannot prove whose bike it is." },
      { text: "A bike has a frame number, usually under the pedals. Almost nobody has ever written it down." },
      { text: "So here is what I would like you to do tonight. Turn the bike over, photograph the number, and send the photo to yourself." },
      { text: "If you buy a second-hand bike, have the number checked before you pay. It takes ten seconds on our website." },
      { text: "And if your bike is taken, report it with that number the same day. A bike that is reported without a number is reported to nowhere." },
      { text: "One last thing. If you find that a bike you own is on our list, do not be afraid to come. Nobody is assumed to be a thief for asking." },
    ],
    questions: [
      {
        text: "What is the speaker's main message?",
        options: [
          "Most people cannot prove which bike is theirs.",
          "Bicycle theft has increased sharply this year.",
          "Expensive locks do not work at all.",
        ],
        answer: 0,
        explain: "„It is because we cannot prove whose bike it is.“",
      },
      {
        text: "Where are most recovered bikes found?",
        options: [
          "within four kilometers of the theft",
          "in other countries after a few weeks",
          "at second-hand markets on Sundays",
        ],
        answer: 0,
        explain: "„… seventy per cent of recovered bikes are found within four kilometers of where they were taken.“",
      },
      {
        kind: "truefalse",
        text: "More than half of the recovered bikes are returned to their owners.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Fewer than one in ten is returned to its owner.“",
      },
      {
        kind: "short_answer",
        text: "Where is the frame number usually?",
        options: [],
        answer: 0,
        accept: ["under the pedals", "below the pedals", "under the bike"],
        explain: "„A bike has a frame number, usually under the pedals.“",
      },
      {
        kind: "dictation",
        text: "Kadro numarasıyla ilgili sorunu anlatan cümleyi duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Almost nobody has ever written it down.", "Almost nobody has ever written it down"],
        explain: "„Almost nobody has ever written it down.“ — „ever“ olumsuza yakın anlamı güçlendirir.",
      },
      {
        text: "What should you do when you buy a second-hand bike?",
        options: [
          "have the number checked first",
          "ask for the original receipt",
          "buy only from a real shop",
        ],
        answer: 0,
        explain: "„If you buy a second-hand bike, have the number checked before you pay.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-lib-w3",
    course: "en",
    level: "B2",
    skill: "writing",
    title: "How to Get Equipment Serviced",
    genre: "Yönerge",
    intro: "İş yerindeki cihazların bakımı için meslektaşlarına yönerge yazacaksın; önce iki cümle kur, sonra yönergeyi yaz.",
    gloss: [
      { de: "label", tr: "etiket" },
      { de: "request", tr: "talep" },
      { de: "replacement", tr: "yedek" },
      { de: "urgent", tr: "acil" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Yazıcıya her altı ayda bir bakım yaptırıyoruz.",
        answer: "We have the printer serviced every six months.",
        alternatives: ["Every six months we have the printer serviced."],
        hint: "„have + nesne + üçüncü hâl“ işi başkasına yaptırmayı anlatır; özne işi kendisi yapmaz.",
      },
      {
        kind: "build",
        tr: "Uygulamada onarımların iki gün sürdüğü söyleniyor.",
        answer: "In practice repairs are said to take two days.",
        alternatives: ["Repairs are said to take two days in practice."],
        hint: "Kaynağı belirsiz bilgi „is said to“ ile aktarılır; belirteç öbeği iki uçta da durabilir.",
      },
      {
        kind: "free",
        prompt:
          "İş yerindeki cihazların bakımı ve onarımı için meslektaşlarına yönerge yaz: kime haber verilecek, hangi bilgiler gerekli, sonra ne oluyor, ne yapılmamalı ve acil durumda ne yapılacak. Kısa başlıklar kullan.",
        checklist: [
          "Kime ve nasıl haber verileceğini yaz",
          "Gereken bilgileri madde madde say",
          "Sürecin ne kadar sürdüğünü ve yedek cihaz durumunu yaz",
          "Yapılmaması gerekeni ve acil yolu belirt",
        ],
        minWords: 90,
        phrases: [
          { de: "Send the request to …", tr: "Talebi …'e gönder" },
          { de: "We have the machines serviced …", tr: "Cihazlara … bakım yaptırıyoruz" },
          { de: "Repairs are said to take …", tr: "Onarımların … sürdüğü söyleniyor" },
          { de: "Please do not …", tr: "Lütfen … yapmayın" },
          { de: "In an urgent case, …", tr: "Acil bir durumda, …" },
        ],
        sample:
          "How to get a machine repaired\n\n" +
          "Where to send it. All requests go to the facilities mailbox, not to a person. People go on holiday; " +
          "the mailbox does not.\n\n" +
          "What to write. Four things, in this order: the room number, the label on the machine (a six-digit " +
          "number on the back), what happens and since when, and whether you can work without it today. " +
          "A request without the label is sent back, and that costs a day.\n\n" +
          "What happens then. We have the machines serviced by an outside company, so nothing is repaired the " +
          "same morning. Repairs are said to take two working days, and in our experience three is more " +
          "realistic. If you cannot work without the machine, write that in the first line and a replacement " +
          "will be brought from the store room.\n\n" +
          "Please do not open anything yourself, and please do not have a repair done privately and send us the " +
          "bill. Both are refused, and the second one is refused twice.\n\n" +
          "In an urgent case, for example water or smoke, call the internal number three three three first and " +
          "write the email afterwards.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b2-lib-s3",
    course: "en",
    level: "B2",
    skill: "speaking",
    title: "Do It Yourself or Have It Done?",
    genre: "Monolog",
    intro: "Bir buçuk dakikaya kadar konuşacaksın: iki yaklaşımı karşılaştır ve kendi ölçütünü örnekle sına.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Evdeki işleri kendin mi yapmalısın, yoksa yaptırmalı mısın? İki tarafı da tart, kendi ölçütünü koy ve onu bir örnekle sına.",
      bulletsTr: [
        "Soruyu yalnız para sorusu olmaktan çıkar",
        "Kendin yapmanın gerçek maliyetini say",
        "Yaptırmanın zayıf yanını söyle",
        "Ölçütünü koy ve bir örnekle sına",
      ],
      targets: [
        { de: "The question is usually about money, but …", tr: "Soru genelde para sorusu, ama …" },
        { de: "The real cost of doing it yourself is …", tr: "Kendin yapmanın gerçek maliyeti …" },
        { de: "On the other hand, if you have it done, …", tr: "Öte yandan, yaptırırsan …" },
        { de: "My rule is …", tr: "Kuralım şu: …" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "The question is usually about money, but money is the part that is easiest to compare and the least " +
        "interesting. The real cost of doing it yourself is not the tools; it is the second Saturday. Almost " +
        "everything takes twice as long as the video, and the video was made by somebody who had done it forty " +
        "times. On the other hand, if you have it done, you lose something that people rarely mention: you " +
        "never learn how your own flat is built, so the next problem is also somebody else's problem. " +
        "My rule has two parts. First, if a mistake is invisible and cheap, do it yourself — painting, shelves, " +
        "a tap washer. Second, if a mistake is hidden inside a wall or involves water, gas or electricity, have " +
        "it done, and have it done by somebody who will still exist in two years. The test is not how hard the " +
        "job looks. It is how expensive it is to be wrong.",
      rubricHint:
        "İki tarafın da gerçek maliyeti anlatılmalı ve ölçüt bir örnekle sınanmalı; „have something done“ yapısı beklenir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b2-lib-g3",
    course: "en",
    level: "B2",
    skill: "grammar",
    title: "I had it repaired",
    genre: "Kural",
    intro: "Bir işi kendin yapmadığında ve bir bilginin kaynağını söylemek istemediğinde kullanılan iki yapı.",
    focus: "have something done ve reporting passives",
    gloss: [
      { de: "hairdresser", tr: "kuaför" },
      { de: "printer", tr: "yazıcı" },
      { de: "kitchen", tr: "mutfak" },
      { de: "repair", tr: "tamir" },
    ],
    minutes: 8,
    explanation: [
      {
        heading: "Yaptırmak: have + nesne + üçüncü hâl",
        tr: "Türkçede „kestirdim“ demek için fiile -tir eki gelir. İngilizcede yapı üç parçadır: have + nesne + fiilin üçüncü hâli. „I cut my hair“ kendin kestin demektir; „I had my hair cut“ kestirdin demektir.",
        examples: [
          { de: "I had my hair cut yesterday.", tr: "Dün saçımı kestirdim." },
          { de: "We have the printer serviced every six months.", tr: "Yazıcıya altı ayda bir bakım yaptırıyoruz." },
          { de: "We are having the kitchen painted next week.", tr: "Gelecek hafta mutfağı boyatıyoruz." },
        ],
      },
      {
        heading: "Başına gelen için de aynı yapı",
        tr: "Aynı kalıp, senin istemediğin ama başına gelen şeyler için de kullanılır: „He had his bike stolen.“ Burada kimse bir iş yaptırmıyor; yapı yalnız olayın kime olduğunu gösteriyor.",
        examples: [
          { de: "He had his bike stolen last week.", tr: "Geçen hafta bisikleti çalındı." },
          { de: "She had her flight canceled.", tr: "Uçuşu iptal edildi." },
          { de: "I will have the number checked before I pay.", tr: "Ödemeden önce numarayı kontrol ettireceğim." },
        ],
      },
      {
        heading: "Kaynağı söylemeden aktarmak",
        tr: "„İnsanlar diyor ki“ yerine iki edilgen kalıp kullanılır: „It is said that he lives abroad“ ya da „He is said to live abroad“. Aynı biçimde believed, thought, reported, known ve expected de kullanılır.",
        examples: [
          { de: "It is said that the second page is where the money is.", tr: "Paranın ikinci sayfada olduğu söylenir." },
          { de: "Repairs are said to take two days.", tr: "Onarımların iki gün sürdüğü söyleniyor." },
          { de: "He is thought to be the best in the country.", tr: "Ülkenin en iyisi olduğu düşünülüyor." },
        ],
      },
    ],
    questions: [
      {
        text: "I ___ my hair cut yesterday.",
        options: ["had", "have", "did"],
        answer: 0,
        explain: "Geçmişte yaptırılan bir iş: had + nesne + üçüncü hâl.",
      },
      {
        text: "We are ___ the kitchen painted next week.",
        options: ["having", "doing", "making"],
        answer: 0,
        explain: "Yaptırma yapısında yalnız „have“ kullanılır; „do“ ya da „make“ değil.",
      },
      {
        text: "It is ___ that the company will close.",
        options: ["said", "saying", "say"],
        answer: 0,
        explain: "Kaynağı belirsiz aktarımda edilgen biçim gelir: it is said that …",
      },
      {
        kind: "gapfill",
        text: "„Somebody stole his bike.“ → „He ___ his bike stolen.“",
        options: [],
        answer: 0,
        accept: ["had"],
        explain: "Başına gelen bir olay da aynı kalıpla anlatılır: he had his bike stolen.",
      },
      {
        kind: "gapfill",
        text: "„People believe that she is in Rome.“ → „She is ___ to be in Rome.“",
        options: [],
        answer: 0,
        accept: ["believed"],
        explain: "Özneli biçimde fiil edilgen olur ve arkasından „to“ gelir: is believed to be.",
      },
      {
        kind: "gapfill",
        text: "We ___ (have) the printer serviced every six months.",
        options: [],
        answer: 0,
        accept: ["have"],
        explain: "Düzenli bir iş anlatılıyor: geniş zaman, we have … serviced.",
      },
      {
        kind: "gapfill",
        text: "„People say that repairs take two days.“ → „Repairs ___ said to take two days.“",
        options: [],
        answer: 0,
        accept: ["are"],
        explain: "Özne çoğul olduğu için „are said to“ gelir.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["I", "had", "my", "car", "repaired", "yesterday"],
        explain: "Sıra: özne + had + nesne + üçüncü hâl + zaman.",
      },
      {
        kind: "truefalse",
        text: "„I cut my hair at the hairdresser's.“ — Bu cümle saçını kuaförde KESTİRDİĞİNİ söyler mi?",
        options: ["True", "False"],
        answer: 1,
        explain: "Bu cümle saçını kendin kestiğini söyler; kestirmek için „I had my hair cut“ gerekir.",
      },
      {
        kind: "truefalse",
        text: "„He is thought to be the best in the country.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Özneli aktarım biçimi doğru kurulmuş: is thought to be.",
      },
    ],
  },
];
