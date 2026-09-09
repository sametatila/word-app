import type { SkillExercise } from "../../types";

/**
 * EN · A2 — Beceriler kütüphanesi, parti 3.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 3. seti taşır (kimlik sonu 3).
 * Kurallar ve emsal: `en-a2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Alan adı `de` İngilizce metni taşır; `en` alanı bu kursta yazılmaz.
 * Türler: mağaza bilgilendirmesi, sesli mesaj ve forum cevabı. Söyleyiş
 * odağı vurgusuz hecedeki zayıf ünlü; dil bilgisi karşılaştırma dereceleri.
 */
export const enA2P3: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a2-lib-r3",
    course: "en",
    level: "A2",
    skill: "reading",
    title: "Quiet Hour at Marlow's",
    genre: "Bilgilendirme",
    intro: "Bir marketin sessiz saat uygulamasını anlatan bilgi yazısını okuyacaksın: ne değişiyor, kimin için, nasıl başladı.",
    gloss: [
      { de: "shelves", tr: "raflar" },
      { de: "cart", tr: "market arabası" },
      { de: "checkout", tr: "kasa" },
      { de: "beep", tr: "bip sesi çıkarmak" },
      { de: "staff", tr: "çalışanlar" },
      { de: "bright", tr: "parlak" },
    ],
    minutes: 5,
    text:
      "QUIET HOUR — EVERY TUESDAY, EIGHT TO NINE\n\n" +
      "From this month, Marlow's is a quieter shop for one hour every week.\n\n" +
      "What is different?\n" +
      "- No music and no announcements.\n" +
      "- The lights in the shop are lower.\n" +
      "- We do not fill the shelves during this hour, so there are no carts in the way.\n" +
      "- At the checkout, the machines do not beep. Our staff speak quietly.\n\n" +
      "Who is it for?\n" +
      "For everybody, but especially for people who find noise and bright light difficult: many autistic " +
      "customers, people with a headache, older customers and parents with small babies.\n\n" +
      "Do I have to say anything?\n" +
      "No. Just come in and shop as usual.\n\n" +
      "We started this after a customer wrote to us in January. Twenty-two people answered her letter in one " +
      "week. Thank you for the idea.",
    questions: [
      {
        text: "What is a quiet hour?",
        options: [
          "one hour a week with less noise and light",
          "an hour when the shop is closed",
          "a special hour only for older people",
        ],
        answer: 0,
        explain: "„Marlow's is a quieter shop for one hour every week“ — müzik yok, ışıklar kısık.",
      },
      {
        text: "What is different at the checkout?",
        options: ["The machines do not beep.", "You pay only with cards.", "There is only one desk open."],
        answer: 0,
        explain: "„At the checkout, the machines do not beep. Our staff speak quietly.“",
      },
      {
        kind: "truefalse",
        text: "You must tell the staff before you come.",
        options: ["True", "False"],
        answer: 1,
        explain: "„No. Just come in and shop as usual.“",
      },
      {
        kind: "gapfill",
        text: "The quiet hour is every ___ from eight to nine.",
        options: [],
        answer: 0,
        accept: ["Tuesday"],
        explain: "Başlık: „QUIET HOUR — EVERY TUESDAY, EIGHT TO NINE“.",
      },
      {
        kind: "short_answer",
        text: "Who had the idea?",
        options: [],
        answer: 0,
        accept: ["a customer", "one customer", "a customer wrote to them"],
        explain: "„We started this after a customer wrote to us in January.“",
      },
      {
        text: "Why do they not fill the shelves during this hour?",
        options: [
          "so that there are no carts in the way",
          "because the staff are on a break",
          "because the lights are too low",
        ],
        answer: 0,
        explain: "„We do not fill the shelves during this hour, so there are no carts in the way.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a2-lib-l3",
    course: "en",
    level: "A2",
    skill: "listening",
    title: "Your Lesson on Thursday",
    genre: "Sesli mesaj",
    intro: "Sürücü kursundan bir sesli mesaj dinleyeceksin: ders neden iptal, hangi seçenekler var, ne getirilecek.",
    gloss: [
      { de: "cancel", tr: "iptal etmek" },
      { de: "garage", tr: "tamirhane" },
      { de: "hurt", tr: "yaralı" },
      { de: "offer", tr: "önermek" },
      { de: "highway", tr: "otoyol" },
      { de: "road sign", tr: "trafik levhası" },
    ],
    minutes: 5,
    segments: [
      { text: "Hi Melis, this is Hakan from Central Driving School. I'm calling about your lesson on Thursday." },
      { text: "I'm sorry, but I have to cancel it. My car is in the garage; somebody drove into it yesterday evening." },
      { text: "Nobody was hurt, don't worry, but the door has to be changed and that takes four days." },
      { text: "I can offer you two other times. Saturday at nine in the morning, or Monday at four in the afternoon." },
      { text: "Saturday is better if you want to practice on the highway. On Monday the traffic is heavier, which is also good practice, but slower." },
      { text: "Please text me before tomorrow evening. If I don't hear from you, I will keep Saturday for you." },
      { text: "And one more thing: bring your theory book. We will look at the road signs together for ten minutes." },
    ],
    questions: [
      {
        text: "Why does Hakan call?",
        options: ["He has to cancel a lesson.", "He wants to change the price.", "He needs the theory book."],
        answer: 0,
        explain: "„I'm sorry, but I have to cancel it.“",
      },
      {
        text: "What happened to the car?",
        options: ["Somebody drove into it.", "It broke down on the highway.", "Somebody took it away."],
        answer: 0,
        explain: "„My car is in the garage; somebody drove into it yesterday evening.“",
      },
      {
        kind: "truefalse",
        text: "Melis can choose between a morning and an afternoon lesson.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Saturday at nine in the morning, or Monday at four in the afternoon.“",
      },
      {
        kind: "short_answer",
        text: "When must Melis answer?",
        options: [],
        answer: 0,
        accept: ["before tomorrow evening", "tomorrow evening", "by tomorrow evening"],
        explain: "„Please text me before tomorrow evening.“",
      },
      {
        kind: "dictation",
        text: "Hakan'ın cevap isteğini duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Please text me before tomorrow evening.", "Please text me before tomorrow evening"],
        explain: "„Please text me before tomorrow evening.“ — emir kipiyle kurulmuş kibar bir rica.",
      },
      {
        text: "What should Melis bring?",
        options: ["her theory book", "her own car", "a new photo"],
        answer: 0,
        explain: "„And one more thing: bring your theory book.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-lib-w3",
    course: "en",
    level: "A2",
    skill: "writing",
    title: "Advice for a New Week",
    genre: "Forum yazısı",
    intro: "Bir forumda ilk tam zamanlı işe başlayan birine tavsiye vereceksin; önce iki cümle kur, sonra cevabını yaz.",
    gloss: [
      { de: "tip", tr: "tavsiye" },
      { de: "empty", tr: "boş" },
      { de: "calendar", tr: "takvim" },
      { de: "tired", tr: "yorgun" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Bana göre sabahlar akşamlardan daha sakin.",
        answer: "For me the mornings are quieter than the evenings.",
        alternatives: ["The mornings are quieter than the evenings for me."],
        hint: "Kısa sıfatlar -er alır ve karşılaştırmada „than“ gelir; „for me“ iki uçta da durabilir.",
      },
      {
        kind: "build",
        tr: "Benim için en zor gün pazartesi.",
        answer: "Monday is the most difficult day for me.",
        alternatives: ["For me, Monday is the most difficult day."],
        hint: "Uzun sıfatlar üstünlük derecesinde „the most“ ile kurulur.",
      },
      {
        kind: "free",
        prompt:
          "Forumdaki soruya kendi deneyiminle cevap ver: haftan nasıl geçiyor, neler işe yaradı, ne işe yaramadı ve somut bir tavsiye ver.",
        stimulus:
          "Hi everyone. I start my first full-time job next month and I am a bit afraid. I think I will have no " +
          "time for cooking, sport or friends. How do you organize your week?",
        checklist: [
          "Duyguyu tanıdığını söyle",
          "İşe yarayan iki şeyi anlat",
          "İşe yaramayan bir şeyi söyle",
          "Somut tek bir tavsiyeyle bitir",
        ],
        minWords: 40,
        phrases: [
          { de: "I remember that feeling.", tr: "O duyguyu hatırlıyorum." },
          { de: "Two things helped me.", tr: "Bende iki şey işe yaradı." },
          { de: "What did not work for me was …", tr: "Bende işe yaramayan şey … oldu" },
          { de: "My tip: …", tr: "Tavsiyem: …" },
          { de: "Good luck!", tr: "Bol şans!" },
        ],
        sample:
          "Hi, I remember that feeling very well. My first year was harder than I expected, but it got better. " +
          "Two things helped me. First, I do all the shopping and cooking on Sunday afternoon. It takes three " +
          "hours, but during the week I never stand in front of an empty fridge. Second, I put one evening in my " +
          "calendar with nothing in it. If a friend asks, I say yes only if I still have another free evening. " +
          "What did not work for me was getting up at five to study. I was just tired all day. " +
          "My tip: choose one small thing and keep it for a month. Good luck!",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a2-lib-s3",
    course: "en",
    level: "A2",
    skill: "speaking",
    title: "The weak vowel",
    genre: "Ses çalışması",
    intro: "İngilizcede vurgusuz heceler kısalır ve ünlüsü belirsiz bir „ı“ sesine döner; her heceyi net söylemek aksanı ağırlaştırır.",
    gloss: [
      { de: "banana", tr: "muz" },
      { de: "cinema", tr: "sinema" },
      { de: "company", tr: "şirket" },
      { de: "problem", tr: "sorun" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "Can I have a banana, please?",
        tr: "Bir muz alabilir miyim lütfen?",
        hint: "„a“ tek başına „ey“ değil, kısa bir „ı“dır. „banana“ = bı-NAA-nı.",
        confusions: [
          { heard: ["Can I have ey banana", "ba-na-na"], fix: "Yalnız ortadaki hece uzun; ilk ve son heceyi hafif „ı“ ile söyle.", expected: "banana" },
        ],
      },
      {
        de: "My brother is a teacher.",
        tr: "Erkek kardeşim öğretmen.",
        hint: "Sondaki -er hecesi „er“ değil, zayıf „ı“ gibidir: BRA-dı, TİİÇ-ı.",
        confusions: [
          { heard: ["brotherr", "teacherr"], fix: "Son heceyi vurgulama ve r'yi yuvarlama: bradı, tiiçı.", expected: "teacher" },
        ],
      },
      {
        de: "The children are at the cinema.",
        tr: "Çocuklar sinemada.",
        hint: "„the“ = dı, „children“ = ÇİL-drın, „cinema“ = Sİ-nı-mı. Üçünde de zayıf ünlü var.",
        confusions: [
          { heard: ["Dee children are at dee cinema"], fix: "„the“ vurgusuzken „dii“ değil „dı“ okunur.", expected: "the" },
        ],
      },
      {
        de: "I was at the doctor on Monday.",
        tr: "Pazartesi doktordaydım.",
        hint: "„was“ vurgusuzken „wız“ olur; „doctor“ = DOK-tı, „Monday“ = MAN-di.",
        confusions: [
          { heard: ["I woz at the doctorr"], fix: "„was“ yardımcı olduğunda kısalır; sondaki -or da zayıflar.", expected: "was" },
        ],
      },
      {
        de: "We can come tomorrow afternoon.",
        tr: "Yarın öğleden sonra gelebiliriz.",
        hint: "„can“ olumluda vurgusuzdur ve „kın“ okunur; „tomorrow“ = tı-MO-rou.",
        confusions: [
          { heard: ["We KEN come", "to-mo-rrow"], fix: "„can“ olumlu cümlede zayıftır; vurgu asıl fiilde.", expected: "can" },
        ],
      },
      {
        de: "There are seven computers in the office.",
        tr: "Ofiste yedi bilgisayar var.",
        hint: "„computers“ = kım-PYU-tız; ilk ve son hece zayıf, orta hece güçlü.",
        confusions: [
          { heard: ["COM-puters", "offiss"], fix: "İlk heceyi vurgulama; vurgu ortadaki „pu“ hecesinde.", expected: "computers" },
        ],
      },
      {
        de: "It was a problem for the company.",
        tr: "Bu, şirket için bir sorundu.",
        hint: "„for“ vurgusuzken „fı“ olur; „company“ = KAM-pı-ni.",
        confusions: [
          { heard: ["for the com-PA-ny"], fix: "Vurgu ilk hecede ve ortadaki hece neredeyse yutulur: KAMpıni.", expected: "company" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a2-lib-g3",
    course: "en",
    level: "A2",
    skill: "grammar",
    title: "bigger, the biggest",
    genre: "Kural",
    intro: "Karşılaştırma İngilizcede ayrı bir kelimeyle değil, çoğu zaman sıfatın kendisine gelen eklerle kurulur.",
    focus: "Comparatives ve superlatives",
    gloss: [
      { de: "expensive", tr: "pahalı" },
      { de: "interesting", tr: "ilginç" },
      { de: "young", tr: "genç" },
      { de: "tall", tr: "uzun boylu" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "Kısa sıfatlar: -er ve the -est",
        tr: "Türkçede „daha büyük“ ve „en büyük“ ayrı kelimelerdir. İngilizcede tek ya da iki heceli sıfatlarda ek gelir: big → bigger → the biggest. Kısa ünlüden sonra son sessiz ikilenir (big → bigger), sonu -y olanlarda y düşer (happy → happier).",
        examples: [
          { de: "This bag is bigger than mine.", tr: "Bu çanta benimkinden büyük.", note: "big → bigger" },
          { de: "Today is hotter than yesterday.", tr: "Bugün dünden sıcak.", note: "sessiz ikileniyor" },
          { de: "She is the happiest person here.", tr: "Buradaki en mutlu kişi o.", note: "y → i" },
        ],
      },
      {
        heading: "Uzun sıfatlar: more ve the most",
        tr: "Üç ve daha çok heceli sıfatlarda ek gelmez, önüne kelime gelir: expensive → more expensive → the most expensive. Ekle kelimeyi birlikte kullanmak („more bigger“) yaygın bir hatadır.",
        examples: [
          { de: "This phone is more expensive.", tr: "Bu telefon daha pahalı." },
          { de: "It is the most interesting book in the series.", tr: "Serideki en ilginç kitap bu." },
          { de: "The film was more difficult than the book.", tr: "Film kitaptan daha zordu." },
        ],
      },
      {
        heading: "Düzensizler ve eşitlik",
        tr: "Dört sıfat kuralın dışındadır: good → better → the best, bad → worse → the worst, far → further, much/many → more → the most. Eşitlik için „as … as“ kullanılır: as tall as.",
        examples: [
          { de: "This is the best day of the year.", tr: "Yılın en güzel günü bu." },
          { de: "The weather is worse than yesterday.", tr: "Hava dünden kötü." },
          { de: "He is as tall as his brother.", tr: "Kardeşiyle aynı boyda." },
        ],
      },
    ],
    questions: [
      {
        text: "This bag is ___ than mine.",
        options: ["bigger", "more big", "biggest"],
        answer: 0,
        explain: "Tek heceli sıfat -er alır ve „than“ ile karşılaştırılır.",
      },
      {
        text: "It is the ___ restaurant in town.",
        options: ["most expensive", "expensivest", "more expensive"],
        answer: 0,
        explain: "Uzun sıfatlarda üstünlük derecesi „the most“ ile kurulur.",
      },
      {
        text: "Today is ___ than yesterday.",
        options: ["hotter", "hoter", "more hot"],
        answer: 0,
        explain: "Kısa ünlüden sonra son sessiz ikilenir: hot → hotter.",
      },
      {
        kind: "gapfill",
        text: "good → better → the ___",
        options: [],
        answer: 0,
        accept: ["best"],
        explain: "„good“ düzensizdir: good, better, the best.",
      },
      {
        kind: "gapfill",
        text: "My sister is two years ___ (young) than me.",
        options: [],
        answer: 0,
        accept: ["younger"],
        explain: "Tek heceli sıfat -er alır: younger than.",
      },
      {
        kind: "gapfill",
        text: "This is the ___ (interesting) book in the series.",
        options: [],
        answer: 0,
        accept: ["most interesting"],
        explain: "Dört heceli sıfat ek almaz: the most interesting.",
      },
      {
        kind: "gapfill",
        text: "He is as tall ___ his brother.",
        options: [],
        answer: 0,
        accept: ["as"],
        explain: "Eşitlik „as … as“ ile kurulur; „than“ yalnız farkta kullanılır.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["This", "is", "the", "best", "day"],
        explain: "Üstünlük derecesi artikel ister: This is the best day.",
      },
      {
        kind: "truefalse",
        text: "„This film is more better than the book.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„better“ zaten karşılaştırma biçimidir; „more“ eklenmez.",
      },
      {
        kind: "truefalse",
        text: "„Winter is colder than spring.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Tek heceli sıfat -er almış ve „than“ doğru kullanılmış.",
      },
    ],
  },
];
