import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 25 — "Sözleşme kapanırken, yanıtlanan şikâyet, teklif
 * tutsaydı, kapanış satırı". Seviyenin kapanış ünitesi.
 *
 * Dört ders: When the contract closes · The complaint answered ·
 * If the offer had held · The closing line.
 *
 *   Kelime: contractual, misleading, deceive, chargeable, overpriced,
 *           redeem, voucher, retail, in view of, provided that,
 *           make clear, lay out, casually.
 *   Kalıp:  By March we will have signed the supplementary agreement. ·
 *           Next month we will be checking the price adjustment. ·
 *           By then the remaining amount will have been paid. ·
 *           The ad must have been misleading. ·
 *           They can't have meant to deceive us. ·
 *           We should have kept the proof of purchase. ·
 *           If the voucher had arrived, we would have ordered. ·
 *           If the rate plan had been clear, the base fee would be lower now. ·
 *           If the insurance coverage had been wider, we would have claimed. ·
 *           It seems to be settled, in view of your letter. ·
 *           Apparently we can close this, provided that the file is complete. ·
 *           On balance, one last point is arguably worth making.
 *
 * Ünitenin öğretme noktası „PROVIDED THAT“: koşulun üçüncü biçimi ve „if“
 * ile aynı şey değil — „if“ bir durumu betimliyor, „provided that“ bir
 * ŞART KOYUYOR. Yanında „in view of“ duruyor: geriye bakan, masadaki bir
 * şeye dayanan neden.
 *
 * Ünite aynı zamanda SEVİYENİN KAPANIŞ İPİNİ söylüyor: B2 yeni bir zaman
 * öğretmedi. Öğrettiği on yapının her biri KİMİN GÖRÜNECEĞİNE dair bir
 * karar — edilgen faili gizliyor, adlaştırma kişiyi gizliyor, yarık cümle
 * okuru yönlendiriyor, çekince kaynak olmayı reddediyor, devrik sıra sesi
 * yükseltiyor, ortaç iki şeyin birbirine ait olduğunu söylüyor, aktarma
 * fiili kanıtı derecelendiriyor.
 */
export const enB2U25: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u25-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 25,
    title: "Settling the sofa complaint",
    genre: "letter",
    intro: "Bir mobilya şirketinin şikâyeti kapatan yanıt mektubu. Müşteriye hangi koşullarla ne öneriliyor?",
    gloss: [
      { de: "a sofa", tr: "kanepe" },
      { de: "damaged", tr: "hasarlı" },
      { de: "a warehouse", tr: "depo" },
      { de: "settle", tr: "çözüme bağlamak" },
      { de: "as follows", tr: "şöyle" },
      { de: "original", tr: "orijinal" },
      { de: "packaging", tr: "ambalaj" },
      { de: "collect", tr: "teslim almak" },
      { de: "free of charge", tr: "ücretsiz" },
      { de: "suit", tr: "uymak" },
      { de: "refund", tr: "iade etmek" },
      { de: "a credit card", tr: "kredi kartı" },
      { de: "a solution", tr: "çözüm" },
      { de: "arrange", tr: "ayarlamak" },
      { de: "available", tr: "mevcut" },
      { de: "charge", tr: "ücret almak" },
      { de: "suggest", tr: "önermek" },
      { de: "further", tr: "başka" },
      { de: "directly", tr: "doğrudan" },
      { de: "sincerely", tr: "saygılarımla" },
      { de: "furniture", tr: "mobilya" },
      { de: "trouble", tr: "sıkıntı" },
    ],
    minutes: 10,
    text:
      "Dear Ms. Carter,\n" +
      "Thank you for your letter of April 2 about the sofa you ordered from our online store.\n" +
      "In view of your letter and the photos you sent, it seems to be clear that the sofa was damaged before it left our warehouse. We are sorry for the trouble this has caused you and your family.\n" +
      "We would like to settle the matter as follows. Provided that the sofa is still in its original packaging, our partner company will collect it free of charge next week. Apparently the driver can come on Tuesday or Thursday morning; please let us know which day suits you.\n" +
      "Once the sofa has been collected, we will refund the full price of $1,240 to your credit card. In view of the delay, we will also send you a voucher for $100, which can be redeemed in any of our retail stores or online, provided that it is used within twelve months.\n" +
      "On balance, we believe this is a fair solution. However, if you would prefer a new sofa instead of a refund, we can arrange that too, provided that the same model is still available.\n" +
      "We would also like to make clear that you will not be charged for the collection, and that nothing in this offer is chargeable.\n" +
      "In view of all this, we would suggest closing your complaint once the refund has been paid. If you have any further questions, please contact me directly.\n" +
      "Yours sincerely,\n" +
      "Laura Brooks, Customer Service, Brightway Furniture",
    questions: [
      {
        text: "When was the sofa damaged?",
        options: ["before it left the warehouse", "during the delivery", "at the home of the customer"],
        answer: 0,
        explain: "„it seems to be clear that the sofa was damaged before it left our warehouse.“",
      },
      {
        text: "What is the condition for the collection?",
        options: ["The sofa must be in its original packaging.", "The customer must pay the driver.", "The customer must send more photos."],
        answer: 0,
        explain: "„Provided that the sofa is still in its original packaging, our partner company will collect it free of charge next week.“",
      },
      {
        kind: "truefalse",
        text: "The customer can choose a new sofa instead of a refund.",
        options: ["True", "False"],
        answer: 0,
        explain: "„if you would prefer a new sofa instead of a refund, we can arrange that too…“",
      },
      {
        kind: "gapfill",
        text: "The voucher can be redeemed in any of our ___ stores or online.",
        options: [],
        answer: 0,
        accept: ["retail"],
        explain: "„a voucher for $100, which can be redeemed in any of our retail stores or online…“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The sofa was damaged before it left the warehouse.",
          "The sofa will be collected next week.",
          "The customer will get a refund and a voucher.",
          "The complaint can then be closed.",
        ],
        explain: "Önce sorunun kabulü, sonra teslim alma, geri ödeme ve kupon, en sonda şikâyetin kapanması.",
      },
      {
        kind: "short_answer",
        text: "How long can the voucher be used?",
        options: [],
        answer: 0,
        accept: ["twelve months", "for twelve months", "a year"],
        explain: "„provided that it is used within twelve months.“",
      },
    ],
  },
  {
    id: "en-b2-u25-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 25,
    title: "A misleading phone deal",
    genre: "article",
    intro: "Tüketici sayfasında yanıltıcı bir telefon kampanyası üzerine bir yazı. Okurlar neden şikâyet ediyor?",
    gloss: [
      { de: "a deal", tr: "fırsat" },
      { de: "advertise", tr: "reklamını yapmak" },
      { de: "unlimited", tr: "sınırsız" },
      { de: "data", tr: "internet paketi" },
      { de: "sign up", tr: "kaydolmak" },
      { de: "a bill", tr: "fatura" },
      { de: "small print", tr: "küçük harfli ayrıntılar" },
      { de: "valid", tr: "geçerli" },
      { de: "probably", tr: "muhtemelen" },
      { de: "an article", tr: "makale" },
      { de: "offer", tr: "önermek" },
      { de: "a refund", tr: "para iadesi" },
      { de: "marketing", tr: "pazarlama" },
      { de: "realize", tr: "fark etmek" },
      { de: "damage", tr: "zarar" },
      { de: "a receipt", tr: "fiş" },
      { de: "proof of purchase", tr: "satın alma belgesi" },
      { de: "threw away", tr: "attım" },
      { de: "advice", tr: "tavsiye" },
      { de: "a seller", tr: "satıcı" },
      { de: "a newspaper", tr: "gazete" },
      { de: "mobile", tr: "cep" },
      { de: "the bottom", tr: "alt kısım" },
    ],
    minutes: 9,
    text:
      "THE PHONE DEAL THAT WAS TOO GOOD\n" +
      "Last month, a mobile phone company in our area advertised a new plan: unlimited data for $15 a month. Hundreds of people signed up in the first week. Then the first bills arrived, and many of them were for $45.\n" +
      "The ad must have been misleading. In small print at the bottom, it said that the price was valid for the first month only. Three readers wrote to us about it in the same week, without knowing each other, and all three said the same thing: nobody at the store had mentioned it.\n" +
      "Was the company trying to deceive its customers? Probably not. They can't have meant to deceive anyone, because they changed the ad within two days of our first article and offered refunds without being asked. Someone in the marketing department must have made a bad decision, and the company must have realized quickly how much damage it was doing.\n" +
      "But customers can learn something too. One reader, Tom, got his money back in a week because he still had the receipt and a photo of the ad. Another reader, Maria, waited a month. „We should have kept the proof of purchase,“ she told us. „I threw away the receipt the same day.“\n" +
      "So here is our advice. Keep every receipt for at least three months. Take a photo of any ad that sounds too good to be true. And before you sign anything, ask the seller to make clear what you will pay after the first month.",
    questions: [
      {
        text: "How much were many of the first bills?",
        options: ["$45", "$15", "$100"],
        answer: 0,
        explain: "„Then the first bills arrived, and many of them were for $45.“",
      },
      {
        text: "Why did Tom get his money back quickly?",
        options: ["He had the receipt and a photo of the ad.", "He worked for the company.", "He wrote to a newspaper."],
        answer: 0,
        explain: "„he still had the receipt and a photo of the ad.“",
      },
      {
        kind: "truefalse",
        text: "The company refused to give refunds.",
        options: ["True", "False"],
        answer: 1,
        explain: "„they changed the ad within two days of our first article and offered refunds without being asked.“",
      },
      {
        kind: "gapfill",
        text: "The ad must have been ___.",
        options: [],
        answer: 0,
        accept: ["misleading"],
        explain: "„The ad must have been misleading.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "A company advertised a cheap plan.",
          "The first bills were much higher.",
          "The company offered refunds.",
          "The writer gives some advice.",
        ],
        explain: "Reklam, faturalar, şirketin tepkisi, okurların deneyimi, en sonda öneriler.",
      },
      {
        kind: "short_answer",
        text: "How long should you keep every receipt?",
        options: [],
        answer: 0,
        accept: ["three months", "at least three months", "for three months"],
        explain: "„Keep every receipt for at least three months.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u25-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 25,
    title: "A voucher that never came",
    genre: "dialogue",
    intro: "Bir çift gelmeyen kuponu, yüksek telefon faturasını ve kırık ekranı konuşuyor. Hangi sorun hâlâ çözülebilir?",
    gloss: [
      { de: "annoy", tr: "sinirlendirmek" },
      { de: "boots", tr: "bot" },
      { de: "sold out", tr: "tükenmiş" },
      { de: "on time", tr: "zamanında" },
      { de: "never mind", tr: "boş ver" },
      { de: "a bill", tr: "fatura" },
      { de: "a contract", tr: "sözleşme" },
      { de: "a screen", tr: "ekran" },
      { de: "claim", tr: "tazminat istemek" },
      { de: "include", tr: "kapsamak" },
      { de: "repair", tr: "tamir etmek" },
      { de: "an order number", tr: "sipariş numarası" },
      { de: "expensive", tr: "pahalı" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Tuana", text: "Did the voucher from the shoe store ever arrive?" },
      { speaker: "Uras", text: "No. And that annoys me, because if the voucher had arrived, we would have ordered the boots last week." },
      { speaker: "Tuana", text: "And now they are sold out." },
      { speaker: "Uras", text: "Exactly. If they had sent it on time, you would be wearing them now." },
      { speaker: "Tuana", text: "Never mind the boots. Look at this phone bill. Sixty dollars again." },
      { speaker: "Uras", text: "If the rate plan had been clear, the base fee would be lower now. The store said twenty-five." },
      { speaker: "Tuana", text: "Twenty-five for the first three months. It is in the contract. We just did not read it." },
      { speaker: "Uras", text: "Then we should call and change the plan today. A bill that is wrong can still be changed." },
      { speaker: "Tuana", text: "And the broken screen on my old phone? Can we claim anything?" },
      { speaker: "Uras", text: "No. If the insurance coverage had been wider, we would have claimed. But screens were not included." },
      { speaker: "Tuana", text: "Then I will take it to the shop on Main Street. They repair screens for forty." },
      { speaker: "Uras", text: "Good. And I will write to the shoe store about the voucher, provided that you give me the order number." },
    ],
    questions: [
      {
        text: "Why did they not order the boots?",
        options: ["The voucher did not arrive.", "The boots were too expensive.", "Tuana did not like them."],
        answer: 0,
        explain: "„if the voucher had arrived, we would have ordered the boots last week.“",
      },
      {
        text: "How much is the phone bill?",
        options: ["sixty dollars", "twenty-five dollars", "forty dollars"],
        answer: 0,
        explain: "„Sixty dollars again.“",
      },
      {
        kind: "truefalse",
        text: "The low price was only for the first three months.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Twenty-five for the first three months.“",
      },
      {
        kind: "gapfill",
        text: "If the insurance coverage had been ___, we would have claimed.",
        options: [],
        answer: 0,
        accept: ["wider"],
        explain: "„If the insurance coverage had been wider, we would have claimed.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["If the rate plan had been clear, the base fee would be lower now.", "If the rate plan had been clear, the base fee would be lower now"],
        explain: "Karışık koşul: neden geçmişte kaldı, sonucu bu ayın faturasında.",
      },
      {
        kind: "short_answer",
        text: "What does Uras need from Tuana?",
        options: [],
        answer: 0,
        accept: ["the order number", "order number"],
        explain: "„provided that you give me the order number.“",
      },
    ],
  },
  {
    id: "en-b2-u25-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 25,
    title: "An update on the office lease",
    genre: "monologue",
    intro: "Ofis yöneticisi Defne, kira sözleşmesiyle ilgili ekibe sesli bir güncelleme bırakıyor. Önümüzdeki aylarda ne olacak?",
    gloss: [
      { de: "a lease", tr: "kira sözleşmesi" },
      { de: "several", tr: "birkaç" },
      { de: "supplementary", tr: "ek" },
      { de: "a landlord", tr: "ev sahibi" },
      { de: "a floor", tr: "kat" },
      { de: "a lawyer", tr: "avukat" },
      { de: "fair", tr: "adil" },
      { de: "the remaining amount", tr: "kalan tutar" },
      { de: "transfer", tr: "havale etmek" },
      { de: "upstairs", tr: "üst kata" },
      { de: "a desk", tr: "masa" },
      { de: "deliver", tr: "teslim etmek" },
      { de: "turn into", tr: "dönüştürmek" },
      { de: "parking", tr: "otopark" },
      { de: "a visitor", tr: "ziyaretçi" },
      { de: "rent", tr: "kira" },
      { de: "free", tr: "ücretsiz" },
      { de: "finance", tr: "finans" },
      { de: "design", tr: "tasarım" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Defne", text: "Hi everyone, Defne here with a quick update on the office lease, since several of you have asked." },
      { speaker: "Defne", text: "The good news first. By March we will have signed the supplementary agreement with the landlord, which gives us the second floor as well." },
      { speaker: "Defne", text: "Next month we will be checking the price adjustment. The landlord wants eight percent more, and our lawyer thinks four is fair." },
      { speaker: "Defne", text: "By then the remaining amount from last year will have been paid. Finance has promised me that it will be transferred before the end of February." },
      { speaker: "Defne", text: "From April we will be moving the design team upstairs. That will take about two weeks, and I will send a plan as soon as it is ready." },
      { speaker: "Defne", text: "By the summer all the new desks will have been delivered, and the old meeting room will have been turned into a quiet room." },
      { speaker: "Defne", text: "One thing is not decided yet: parking. This time next month I will still be talking to the landlord about it, so please do not promise anything to visitors." },
      { speaker: "Defne", text: "That is all for now. Questions to me, as always." },
    ],
    questions: [
      {
        text: "What does the supplementary agreement give the company?",
        options: ["the second floor", "free parking", "new desks"],
        answer: 0,
        explain: "„By March we will have signed the supplementary agreement with the landlord, which gives us the second floor as well.“",
      },
      {
        text: "How much more rent does the landlord want?",
        options: ["eight percent", "four percent", "two percent"],
        answer: 0,
        explain: "„The landlord wants eight percent more, and our lawyer thinks four is fair.“",
      },
      {
        kind: "truefalse",
        text: "The parking question has already been decided.",
        options: ["True", "False"],
        answer: 1,
        explain: "„One thing is not decided yet: parking.“",
      },
      {
        kind: "gapfill",
        text: "From April we will be moving the ___ team upstairs.",
        options: [],
        answer: 0,
        accept: ["design"],
        explain: "„From April we will be moving the design team upstairs.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["By then the remaining amount from last year will have been paid.", "By then the remaining amount from last year will have been paid"],
        explain: "Gelecekte bitmiş ve edilgen bir iş: „will have been“ + üçüncü hâl.",
      },
      {
        kind: "short_answer",
        text: "What will the old meeting room become?",
        options: [],
        answer: 0,
        accept: ["a quiet room", "quiet room"],
        explain: "„the old meeting room will have been turned into a quiet room.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u25-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 25,
    title: "Final lines of a letter",
    genre: "opinion",
    intro: "Bir şikâyeti kapatan mektubun son satırlarını kur, sonra dosya için kapanış kartını doldur.",
    gloss: [
      { de: "in view of", tr: "göz önüne alındığında" },
      { de: "provided that", tr: "şartıyla" },
      { de: "worth making", tr: "belirtilmeye değer" },
      { de: "misleading", tr: "yanıltıcı" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Mektubunuz göz önüne alındığında konu kapanmış görünüyor.",
        answer: "It seems to be settled, in view of your letter.",
        hint: "„in view of“ geriye bakan bir neden veriyor.",
      },
      {
        kind: "build",
        tr: "Görünüşe göre, dosya tam olmak şartıyla bunu kapatabiliriz.",
        answer: "Apparently we can close this, provided that the file is complete.",
        hint: "„provided that“ bir şart koyuyor; „if“ yalnızca durumu betimliyor.",
      },
      {
        kind: "build",
        tr: "Her şey tartıldığında son bir nokta belki de belirtilmeye değer.",
        answer: "On balance, one last point is arguably worth making.",
        hint: "İki çekince; bir şey söyleyen „on balance“.",
      },
      {
        kind: "build",
        tr: "İlan yanıltıcı olmuş olmalı.",
        answer: "The ad must have been misleading.",
        hint: "Çıkarım: kanıt tek bir açıklama bırakıyor.",
      },
      {
        kind: "form",
        prompt: "Şikâyet dosyası için kapanış kartını doldur.",
        facts: "Kanepe depodan çıkmadan hasar görmüş; orijinal ambalajındaysa gelecek hafta ücretsiz alınacak; tam bedel olan 1.240 dolar iade edilecek; 100 dolarlık kupon on iki ay içinde kullanılmak şartıyla geçerli.",
        fields: [
          { label: "Cause", answer: "damaged in the warehouse", accept: ["damaged before it left", "damaged before delivery"] },
          { label: "Collection", answer: "next week, free of charge", accept: ["free of charge", "next week"] },
          { label: "Condition for collection", answer: "original packaging", accept: ["the original packaging", "in its original packaging"] },
          { label: "Refund", answer: "$1,240", accept: ["1,240 dollars", "1240 dollars"] },
          { label: "Voucher", answer: "$100 for twelve months", accept: ["100 dollars", "$100"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u25-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 25,
    title: "A customer complaint",
    genre: "info",
    intro: "Bir müşteri şikâyetinin cümlelerini kur: ne oldu, ne olmalıydı, bundan sonra ne olacak?",
    gloss: [
      { de: "can't have meant", tr: "amaçlamış olamaz" },
      { de: "should have kept", tr: "saklamamız gerekirdi" },
      { de: "would have ordered", tr: "sipariş verirdik" },
      { de: "would be lower", tr: "daha düşük olurdu" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Bizi kandırmayı amaçlamış olamazlar.",
        answer: "They can't have meant to deceive us.",
        hint: "Sert olumsuz: kanıt güçlü olduğu için.",
      },
      {
        kind: "build",
        tr: "Satın alma belgesini saklamamız gerekirdi.",
        answer: "We should have kept the proof of purchase.",
        hint: "Kendi payımız; mektupta hatırlanan tek satır.",
      },
      {
        kind: "build",
        tr: "Hediye çeki gelseydi sipariş verirdik.",
        answer: "If the voucher had arrived, we would have ordered.",
        hint: "Kapalı kutu: iki yarı da geçmişte.",
      },
      {
        kind: "build",
        tr: "Tarife açık olsaydı sabit ücret şimdi daha düşük olurdu.",
        answer: "If the rate plan had been clear, the base fee would be lower now.",
        hint: "Karışık koşul: sonuç bu ayın faturasında.",
      },
      {
        kind: "build",
        tr: "Marta kadar ek anlaşmayı imzalamış olacağız.",
        answer: "By March we will have signed the supplementary agreement.",
        hint: "Gelecekte bir tarihten geriye bakış.",
      },
    ],
  },
];
