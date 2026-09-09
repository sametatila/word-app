import type { SkillExercise } from "../../types";

/**
 * EN · A2 — Beceriler kütüphanesi, parti 2.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 2. seti taşır (kimlik sonu 2).
 * Kurallar ve emsal: `en-a2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Alan adı `de` İngilizce metni taşır; `en` alanı bu kursta yazılmaz.
 * Türler: röportaj, kütüphane anonsu ve resmî e-posta. Söyleyiş odağı kelime
 * vurgusu; dil bilgisi going to ile will arasındaki seçim.
 */
export const enA2P2: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a2-lib-r2",
    course: "en",
    level: "A2",
    skill: "reading",
    title: "Bees on the Roof",
    genre: "interview",
    intro: "Şehirde arıcılık yapan biriyle üç soruluk kısa bir söyleşi okuyacaksın.",
    gloss: [
      { de: "beekeeper", tr: "arıcı" },
      { de: "swarm", tr: "arı oğulu" },
      { de: "by accident", tr: "tesadüfen" },
      { de: "afraid", tr: "korkmuş" },
      { de: "field", tr: "tarla" },
      { de: "hive", tr: "kovan" },
      { de: "worried", tr: "endişeli" },
    ],
    minutes: 5,
    text:
      "BEES ON THE ROOF\n" +
      "Three questions for Ines Falk, city beekeeper\n\n" +
      "How did you start?\n" +
      "By accident. Four years ago a swarm sat on my balcony for two days. I called the fire service and they " +
      "gave me the number of a beekeeper. He came, took the bees away and then said: “You are not afraid. " +
      "Do you want to learn?”\n\n" +
      "Is the city really good for bees?\n" +
      "Better than most people think. In the country there are big fields with only one plant. Here we have " +
      "gardens, parks and balconies, so the bees find something from March to October.\n\n" +
      "What is the hardest part?\n" +
      "The neighbors, not the bees. Before I put a hive on a roof, I talk to every flat in the building. " +
      "It takes longer than the beekeeping, but after that nobody is worried.",
    questions: [
      {
        text: "How did Ines start beekeeping?",
        options: ["A swarm came to her balcony.", "The fire service offered her a course.", "A neighbor asked her to take a hive."],
        answer: 0,
        explain: "„By accident. Four years ago a swarm sat on my balcony for two days.“",
      },
      {
        text: "Why is the city good for bees?",
        options: [
          "There are many different plants.",
          "There are fewer people in summer.",
          "The weather is much warmer.",
        ],
        answer: 0,
        explain: "„Here we have gardens, parks and balconies, so the bees find something from March to October.“",
      },
      {
        kind: "truefalse",
        text: "Ines talks to the neighbors before she puts a hive on a roof.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Before I put a hive on a roof, I talk to every flat in the building.“",
      },
      {
        kind: "gapfill",
        text: "The bees find food from March to ___.",
        options: [],
        answer: 0,
        accept: ["October"],
        explain: "„… so the bees find something from March to October.“",
      },
      {
        kind: "short_answer",
        text: "Who did Ines call about the swarm?",
        options: [],
        answer: 0,
        accept: ["the fire service", "fire service", "she called the fire service"],
        explain: "„I called the fire service and they gave me the number of a beekeeper.“",
      },
      {
        text: "What does she do before she puts a hive on a roof?",
        options: [
          "She talks to everybody in the building.",
          "She asks the city for a paper.",
          "She buys a second hive.",
        ],
        answer: 0,
        explain: "„Before I put a hive on a roof, I talk to every flat in the building.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a2-lib-l2",
    course: "en",
    level: "A2",
    skill: "listening",
    title: "The Library System Is Down",
    genre: "phone",
    intro: "Kütüphanede bir anons dinleyeceksin: sorun ne, bugün ne değişiyor, ne zaman düzelecek.",
    gloss: [
      { de: "announcement", tr: "anons" },
      { de: "borrow", tr: "ödünç almak" },
      { de: "return", tr: "geri vermek" },
      { de: "either", tr: "de" },
      { de: "technician", tr: "teknisyen" },
      { de: "patience", tr: "sabır" },
    ],
    minutes: 5,
    segments: [
      { text: "Good morning. This is an announcement for all visitors." },
      { text: "Our computer system is not working this morning. We are very sorry about that." },
      { text: "This means three things. First, you cannot borrow or return books at the machines." },
      { text: "Please come to the desk near the door. We write everything on paper today." },
      { text: "Second, the computers for visitors are off. The printers do not work either." },
      { text: "Third, if your books are late this week, you do not pay anything. We will not count these days." },
      { text: "The reading rooms and the children's corner are open as usual." },
      { text: "Our technicians think the system will be back this afternoon. Thank you for your patience." },
    ],
    questions: [
      {
        text: "What is the problem?",
        options: ["The computer system is not working.", "The printers have all been taken away.", "The reading rooms are closed today."],
        answer: 0,
        explain: "„Our computer system is not working this morning.“",
      },
      {
        text: "Where do you borrow books today?",
        options: ["from a person, not from a machine", "at one of the machines as usual", "in the reading room upstairs"],
        answer: 0,
        explain: "„Please come to the desk near the door. We write everything on paper today.“ — makineler kapalı.",
      },
      {
        kind: "truefalse",
        text: "Visitors can use the printers today.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The computers for visitors are off. The printers do not work either.“",
      },
      {
        kind: "short_answer",
        text: "What happens if your books are late this week?",
        options: [],
        answer: 0,
        accept: ["you pay nothing", "nothing", "you do not pay", "no money"],
        explain: "„… if your books are late this week, you do not pay anything.“",
      },
      {
        kind: "dictation",
        text: "Bugün nasıl çalışıldığını söyleyen cümleyi duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["We write everything on paper today.", "We write everything on paper today"],
        explain: "„We write everything on paper today.“ — zaman ifadesi cümle sonunda.",
      },
      {
        text: "When will the system be back?",
        options: ["this afternoon", "tomorrow morning", "next week"],
        answer: 0,
        explain: "„Our technicians think the system will be back this afternoon.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-lib-w2",
    course: "en",
    level: "A2",
    skill: "writing",
    title: "Cancelling a Membership",
    genre: "email",
    intro: "Bir spor salonu üyeliğini bitireceksin; önce iki cümle kur, sonra resmî bir e-posta yaz.",
    gloss: [
      { de: "membership", tr: "üyelik" },
      { de: "cancel", tr: "iptal etmek" },
      { de: "notice period", tr: "ihbar süresi" },
      { de: "confirmation", tr: "teyit" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Ağustos sonunda taşınacağım.",
        answer: "I am going to move at the end of August.",
        alternatives: ["At the end of August I am going to move."],
        hint: "Önceden verilmiş bir karar için „be going to“ kullanılır; „will“ o anda alınan kararlar içindir.",
      },
      {
        kind: "build",
        tr: "Sözleşmeye göre ihbar süresi bir ay.",
        answer: "According to the contract the notice period is one month.",
        alternatives: ["The notice period is one month according to the contract."],
        hint: "„according to“ öbeği cümlenin başında da sonunda da durabilir.",
      },
      {
        kind: "free",
        prompt:
          "Spor salonuna e-posta yaz ve üyeliğini iptal et: adını ve üye numaranı yaz, ne zaman bitirmek istediğini söyle, nedenini açıkla, sözleşmedeki ihbar süresine değin ve yazılı teyit iste.",
        checklist: [
          "Adını ve üye numaranı yaz",
          "Bitiş tarihini net söyle",
          "Nedenini kısaca açıkla",
          "İhbar süresine değin ve teyit iste",
        ],
        minWords: 40,
        phrases: [
          { de: "I would like to cancel …", tr: "… iptal etmek istiyorum" },
          { de: "My member number is …", tr: "Üye numaram …" },
          { de: "The notice period is …", tr: "İhbar süresi …" },
          { de: "Could you send me …?", tr: "Bana … gönderir misiniz?" },
          { de: "Best regards,", tr: "Saygılarımla," },
        ],
        sample:
          "Dear Sir or Madam, my name is Deniz Aksu and my member number is four four seven one. " +
          "I would like to cancel my membership at the end of September. I am going to move to another city in " +
          "October for a new job, so I will not be able to come. On my contract the notice period is one month, " +
          "so I hope this email is in time. Could you send me a written confirmation? " +
          "Thank you very much. Best regards, Deniz Aksu",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a2-lib-s2",
    course: "en",
    level: "A2",
    skill: "speaking",
    title: "Where is the stress?",
    genre: "pronounce",
    intro: "İngilizcede vurgulu hece daha uzun ve daha yüksektir; yanlış heceyi vurgulamak kelimeyi tanınmaz yapar.",
    gloss: [
      { de: "photographer", tr: "fotoğrafçı" },
      { de: "information", tr: "bilgi" },
      { de: "record", tr: "kaydetmek" },
      { de: "traffic", tr: "trafik" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "The bus stop is next to the post office.",
        tr: "Otobüs durağı postanenin yanında.",
        hint: "Birleşik adlarda ilk parça vurgulanır: BUS stop, POST office.",
        confusions: [
          { heard: ["bus STOP", "post OFFICE"], fix: "İkinci kelimeyi yükseltme; ağırlık ilk parçada: BAS stop.", expected: "bus stop" },
        ],
      },
      {
        de: "I want to be a photographer.",
        tr: "Fotoğrafçı olmak istiyorum.",
        hint: "Vurgu ikinci hecede: fo-TO-gra-fır. Dört heceyi de söyle ama ikincisini uzat.",
        confusions: [
          { heard: ["PHO-tographer", "photo grapher"], fix: "İlk heceyi vurgulama; ağırlık „to“ hecesinde.", expected: "photographer" },
        ],
      },
      {
        de: "This is a beautiful photograph.",
        tr: "Bu güzel bir fotoğraf.",
        hint: "Burada vurgu ilk hecede: FO-to-graf. Aynı kökten iki kelime, iki farklı vurgu.",
        confusions: [
          { heard: ["photoGRAPH", "photographer"], fix: "Kısa biçimde ağırlık başta: FO-to-graf.", expected: "photograph" },
        ],
      },
      {
        de: "We need more information about the hotel.",
        tr: "Otel hakkında daha çok bilgiye ihtiyacımız var.",
        hint: "„-tion“ ile biten kelimelerde vurgu hep ondan bir önceki hecededir: in-for-MEY-şın. „hotel“ ise ho-TEL.",
        confusions: [
          { heard: ["INformation", "HOtel"], fix: "İkisinde de vurgu sona yakın: informEYşın, hoTEL.", expected: "information" },
        ],
      },
      {
        de: "Please record the meeting.",
        tr: "Lütfen toplantıyı kaydet.",
        hint: "Fiil olduğunda vurgu ikinci hecededir: ri-KORD.",
        confusions: [
          { heard: ["REcord the meeting"], fix: "Burada fiil var; ağırlığı ikinci heceye ver: riKORD.", expected: "record" },
        ],
      },
      {
        de: "Her new album is a great record.",
        tr: "Yeni albümü harika bir kayıt.",
        hint: "Aynı kelime ad olunca vurgu başa kayar: RE-kırd.",
        confusions: [
          { heard: ["a great reCORD"], fix: "Burada ad var; ilk heceyi vurgula: REkırd.", expected: "record" },
        ],
      },
      {
        de: "The traffic in the city center is terrible.",
        tr: "Şehir merkezindeki trafik berbat.",
        hint: "Üç kelimede de vurgu ilk hecede: TRA-fik, SI-ti, TE-rıbıl.",
        confusions: [
          { heard: ["traFFIC", "terRIBLE"], fix: "Bu üç kelimede ağırlık baştadır; sonu hafifçe yut.", expected: "terrible" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a2-lib-g2",
    course: "en",
    level: "A2",
    skill: "grammar",
    title: "going to or will?",
    genre: "grammar",
    intro: "Türkçedeki tek gelecek eki İngilizcede ikiye ayrılır ve seçimi kararın ne zaman verildiği belirler.",
    focus: "going to ve will",
    gloss: [
      { de: "promise", tr: "söz vermek" },
      { de: "contract", tr: "sözleşme" },
      { de: "cloud", tr: "bulut" },
      { de: "answer", tr: "cevaplamak" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "Karar ne zaman verildi?",
        tr: "Türkçede „arayacağım“ hem önceden planlanmış hem de o an verilmiş bir kararı anlatır. İngilizcede ikisi ayrılır: plan zaten varsa „be going to“, karar konuşma anında veriliyorsa „will“.",
        examples: [
          { de: "I am going to call her tonight.", tr: "Bu akşam onu arayacağım.", note: "plan önceden var" },
          { de: "The phone is ringing. — I will answer it.", tr: "Telefon çalıyor. — Ben açarım.", note: "karar şimdi" },
          { de: "We are going to visit my aunt. We have the tickets.", tr: "Halamı ziyarete gideceğiz. Biletler bizde." },
        ],
      },
      {
        heading: "Tahminde de fark var",
        tr: "Gözünle gördüğün bir işaretten yola çıkarak tahmin ediyorsan „going to“, yalnız düşüncene dayanıyorsan „will“ kullanılır.",
        examples: [
          { de: "Look at those clouds! It is going to rain.", tr: "Şu bulutlara bak! Yağmur yağacak.", note: "görünen kanıt" },
          { de: "I think he will like the film.", tr: "Bence filmi beğenecek.", note: "yalnız fikir" },
          { de: "Don't worry, it will be fine.", tr: "Merak etme, iyi olacak." },
        ],
      },
      {
        heading: "Biçim",
        tr: "„be going to“ üç parçadır: am / is / are + going to + yalın fiil. „will“ hiç değişmez ve arkasından yalın fiil gelir; kısa biçimi 'll, olumsuzu won't'tur. Söz verme ve teklif her zaman „will“ ile yapılır.",
        examples: [
          { de: "She is going to start a new job.", tr: "Yeni bir işe başlayacak." },
          { de: "I'll help you with that bag.", tr: "Sana o çantada yardım ederim.", note: "teklif" },
          { de: "They won't come tomorrow.", tr: "Yarın gelmeyecekler." },
        ],
      },
    ],
    questions: [
      {
        text: "Look at those clouds! It ___ rain.",
        options: ["is going to", "will", "would"],
        answer: 0,
        explain: "Görünen bir kanıt var (bulutlar), bu yüzden „going to“ gelir.",
      },
      {
        text: "The phone is ringing. — I ___ answer it.",
        options: ["will", "am going to", "would"],
        answer: 0,
        explain: "Karar tam konuşma anında veriliyor: „will“.",
      },
      {
        text: "We ___ visit my aunt next weekend. We have the tickets.",
        options: ["are going to", "will", "would"],
        answer: 0,
        explain: "Plan önceden yapılmış ve biletler alınmış: „going to“.",
      },
      {
        kind: "gapfill",
        text: "I ___ (call) you tonight, I promise.",
        options: [],
        answer: 0,
        accept: ["will call", "'ll call"],
        explain: "Söz verme her zaman „will“ ile yapılır.",
      },
      {
        kind: "gapfill",
        text: "She ___ (start) a new job in June. She signed the contract last week.",
        options: [],
        answer: 0,
        accept: ["is going to start", "'s going to start"],
        explain: "Karar çoktan verilmiş ve sözleşme imzalanmış: be going to.",
      },
      {
        kind: "gapfill",
        text: "It's cold in here. I ___ (close) the window.",
        options: [],
        answer: 0,
        accept: ["will close", "'ll close"],
        explain: "Karar o anda alınıyor: will.",
      },
      {
        kind: "gapfill",
        text: "They ___ (not / come) tomorrow. They told us last week.",
        options: [],
        answer: 0,
        accept: ["are not going to come", "aren't going to come"],
        explain: "Plan önceden bellidir, bu yüzden olumsuz biçim de „going to“ ile kurulur.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["I", "am", "going", "to", "study", "tonight"],
        explain: "Sıra: özne + be + going to + yalın fiil: I am going to study tonight.",
      },
      {
        kind: "truefalse",
        text: "„I will visit my sister next week; I bought the ticket yesterday.“ — En doğal biçim bu mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "Bilet dün alınmış, yani plan önceden var; doğal biçim „I am going to visit my sister“.",
      },
      {
        kind: "truefalse",
        text: "„I'll help you with that bag.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Teklif konuşma anında yapılıyor ve „will“ ile kurulur; cümle doğru.",
      },
    ],
  },
];
