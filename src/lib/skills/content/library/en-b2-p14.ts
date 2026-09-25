import type { SkillExercise } from "../../types";

/**
 * EN · B2 — Beceriler kütüphanesi, parti 14.
 *
 * Hücreyi YİRMİYE tamamlayan partilerden biri (11–20). Kurallar ve emsal:
 * `en-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 14 şehir içi ulaşım hattı: kiralık elektrikli scooter denemesinin
 * bir yılı üzerine dergi yazısı, özel scooterların yasal durumu üzerine
 * bir bilgilendirme yayını, yerel gazeteye okur mektubu. Dil bilgisi
 * neden-sonuç bağlaçları — because of / due to, since / as, as a result,
 * so … that.
 */
export const enB2P14: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-lib-r14",
    course: "en",
    level: "B2",
    skill: "reading",
    title: "A Year of Shared Scooters",
    genre: "article",
    intro: "Bir dergi yazısı: kiralık scooter denemesinin bir yılı; iki taraf neyi doğru, neyi yanlış tahmin etti?",
    gloss: [
      { de: "pavement", tr: "kaldırım" },
      { de: "pedestrian", tr: "yaya" },
      { de: "proportion", tr: "oran" },
      { de: "to replace", tr: "yerini almak" },
      { de: "evenly", tr: "eşit biçimde" },
      { de: "compulsory", tr: "zorunlu" },
      { de: "persistent", tr: "süregelen" },
      { de: "pushchair", tr: "puset" },
      { de: "bay", tr: "park yeri" },
      { de: "nuisance", tr: "rahatsızlık" },
      { de: "permanent", tr: "kalıcı" },
      { de: "rider", tr: "sürücü" },
      { de: "tutorial", tr: "kısa eğitim" },
    ],
    minutes: 8,
    text:
      "A year of shared scooters\n\n" +
      "When the city agreed to a twelve-month trial of rental e-scooters, the arguments on both " +
      "sides were already familiar. Supporters promised fewer short car journeys; opponents " +
      "predicted crowded pavements and injured pedestrians. A year later, the data suggests that " +
      "both sides were partly right, though not in the proportions they expected.\n\n" +
      "The scooters were used heavily: just over nine hundred thousand trips, most of them " +
      "shorter than two kilometers. However, a survey of riders found that only about one trip " +
      "in eight had replaced a car journey. The majority had replaced walking or the bus. As a " +
      "result, the environmental benefit was far smaller than the operators' early figures " +
      "suggested.\n\n" +
      "Injuries were also lower than feared, but they were not evenly distributed. Most involved " +
      "the riders themselves, often on their first or second journey, and a noticeable share " +
      "happened late at night. The operators have since introduced a short compulsory tutorial " +
      "before a first ride, and lower speeds in the center after eleven.\n\n" +
      "The most persistent complaint was not about speed at all. It was about parking. Because " +
      "scooters could be left anywhere, they were left everywhere, and wheelchair users and " +
      "people with pushchairs reported being blocked on their own streets. Since September, " +
      "riders have had to end their trip in a marked bay, and complaints have fallen by more " +
      "than half.\n\n" +
      "The council must now decide whether to make the scheme permanent. The honest lesson of " +
      "the trial is that scooters are a transport success and a modest environmental one, and " +
      "that the difference between a nuisance and a service turned out to be a painted " +
      "rectangle on the ground.",
    questions: [
      {
        text: "What did most scooter trips replace?",
        options: ["short car journeys", "walking or the bus", "journeys by bicycle"],
        answer: 1,
        explain: "„The majority had replaced walking or the bus“; arabanın yerini alan yolculuk sekizde bir.",
      },
      {
        text: "Who was involved in most of the injuries?",
        options: [
          "the riders themselves",
          "pedestrians on pavements",
          "drivers of cars",
        ],
        answer: 0,
        explain: "„Most involved the riders themselves“, çoğu da ilk ya da ikinci yolculukta.",
      },
      {
        kind: "truefalse",
        text: "Complaints fell after riders had to park in marked bays.",
        options: ["True", "False"],
        answer: 0,
        explain: "Eylülden beri işaretli alanda park zorunlu ve şikâyetler yarıdan fazla azaldı.",
      },
      {
        kind: "gapfill",
        text: "Only about one trip in ___ had replaced a car journey.",
        options: [],
        answer: 0,
        accept: ["eight", "8"],
        explain: "„only about one trip in eight had replaced a car journey“.",
      },
      {
        kind: "short_answer",
        text: "What must new riders now do before their first ride?",
        options: [],
        answer: 0,
        accept: ["a short tutorial", "a short compulsory tutorial", "a compulsory tutorial", "a tutorial", "complete a tutorial", "complete a short tutorial", "do a tutorial", "do a short tutorial", "take a tutorial", "take a short tutorial"],
        explain: "„a short compulsory tutorial before a first ride“.",
      },
      {
        text: "What does the writer conclude?",
        options: [
          "Scooters should be banned at night.",
          "Operators hid the real injury figures.",
          "Parking rules made the main difference.",
        ],
        answer: 2,
        explain: "Rahatsızlıkla hizmet arasındaki farkı yere boyanmış bir dikdörtgen yaratmış.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-lib-l14",
    course: "en",
    level: "B2",
    skill: "listening",
    title: "Bought in a Shop, Illegal on the Road",
    genre: "info",
    intro: "Bir bilgilendirme yayını: kişisel elektrikli scooterlar nerede kullanılabilir, sürücüler neyi yanlış biliyor?",
    gloss: [
      { de: "confusion", tr: "kafa karışıklığı" },
      { de: "privately", tr: "özel olarak" },
      { de: "to insure", tr: "sigortalamak" },
      { de: "owing to", tr: "nedeniyle" },
      { de: "identical", tr: "tıpatıp aynı" },
      { de: "absurd", tr: "saçma" },
      { de: "fine", tr: "para cezası" },
      { de: "license", tr: "ehliyet" },
      { de: "consultation", tr: "görüş alma" },
    ],
    minutes: 8,
    segments: [
      { text: "Sales of electric scooters have risen sharply this year, and so has confusion about where they can actually be ridden." },
      { speaker: "Ms Rourke", text: "The single most common thing we hear is, “But I bought it in a shop, so it must be legal.” Unfortunately, being sold legally and being ridden legally are two different things." },
      { text: "Under current rules, a privately owned scooter may only be used on private land with the owner's permission. Rental scooters in the city trial are treated differently because they are insured by the operator." },
      { speaker: "Ms Rourke", text: "Owing to that difference, two scooters that look identical can be legal and illegal on the same street. I understand why people find that absurd." },
      { text: "Riders stopped on a public road can have the scooter taken away, and may receive a fine and points on a driving license they may not even hold yet." },
      { speaker: "Ms Rourke", text: "Our approach with teenagers is to talk to the parents first. Most of them bought the scooter as a present and had no idea there was a problem." },
      { text: "The government has said it intends to change the law, but it has not said when, and several consultations have closed without a decision." },
      { speaker: "Ms Rourke", text: "Until then my advice is simple: if you haven't bought one yet, check the rules before you pay, not after you've been stopped." },
    ],
    questions: [
      {
        text: "What is the most common misunderstanding?",
        options: [
          "that helmets are optional",
          "that rental scooters are banned",
          "that a shop sale makes riding legal",
        ],
        answer: 2,
        explain: "„But I bought it in a shop, so it must be legal“: satın almak ile sürmek ayrı şeyler.",
      },
      {
        text: "Why are rental scooters treated differently?",
        options: [
          "They are slower than private ones.",
          "They are insured by the operator.",
          "They can only be used at night.",
        ],
        answer: 1,
        explain: "„because they are insured by the operator“.",
      },
      {
        kind: "truefalse",
        text: "Ms Rourke thinks the current rules make perfect sense.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I understand why people find that absurd“: kuralın saçma göründüğünü kabul ediyor.",
      },
      {
        kind: "gapfill",
        text: "A privately owned scooter may only be used on ___ land.",
        options: [],
        answer: 0,
        accept: ["private"],
        explain: "„may only be used on private land with the owner's permission“.",
      },
      {
        kind: "short_answer",
        text: "Who does Ms Rourke talk to first when teenagers are stopped?",
        options: [],
        answer: 0,
        accept: ["the parents", "their parents", "parents"],
        explain: "„Our approach with teenagers is to talk to the parents first.“",
      },
      {
        text: "What is Ms Rourke's advice?",
        options: [
          "Check the rules before buying.",
          "Only ride at the weekend.",
          "Buy insurance online.",
        ],
        answer: 0,
        explain: "„check the rules before you pay, not after you've been stopped“.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-lib-w14",
    course: "en",
    level: "B2",
    skill: "writing",
    title: "Letter to the Editor: Fix the Parking",
    genre: "letter",
    intro: "Yerel gazeteye okur mektubu yazıyorsun: önce iki cümle kur, sonra bir haberin eksik bıraktığını kendi deneyiminle göster.",
    gloss: [
      { de: "obstacle", tr: "engel" },
      { de: "dropped kerb", tr: "alçaltılmış kaldırım" },
      { de: "considerate", tr: "düşünceli" },
      { de: "condition", tr: "koşul" },
      { de: "to leave out", tr: "dışarıda bırakmak" },
      { de: "wheelchair", tr: "tekerlekli sandalye" },
      { de: "occasion", tr: "sefer" },
      { de: "pushchair", tr: "puset" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Yeni park alanları sayesinde şikâyetler yarıdan fazla azaldı.",
        answer: "Due to the new parking bays, complaints have fallen by more than half.",
        alternatives: ["Complaints have fallen by more than half due to the new parking bays."],
        hint: "„due to“ arkasından isim öbeği gelir, özne ve fiil gelmez.",
      },
      {
        kind: "build",
        tr: "Köşede kaldırım o kadar dardı ki puset geçemiyordu.",
        answer: "At the corner the pavement was so narrow that a pushchair could not get past.",
        alternatives: ["The pavement was so narrow at the corner that a pushchair could not get past."],
        hint: "so + sıfat + that; isim öbeğiyle „such a … that“ kullanılır.",
      },
      {
        kind: "free",
        prompt:
          "Yerel gazeteye bir okur mektubu yaz: hangi habere yanıt verdiğini söyle, haberin neyi eksik bıraktığını kendi deneyiminle göster, bir iyileşmenin gerçek nedenini açıkça kur ve belediyeye somut bir öneriyle bitir.",
        checklist: [
          "Hangi habere yanıt verdiğini yaz",
          "Eksik kalan tarafı kendi deneyiminle göster",
          "Neden-sonuç ilişkisini açıkça kur",
          "Somut bir öneriyle bitir",
        ],
        minWords: 120,
        phrases: [
          { de: "I am writing in response to your article on …", tr: "… konulu yazınıza yanıt olarak yazıyorum", en: "" },
          { de: "What the article leaves out is …", tr: "Yazının dışarıda bıraktığı şey …", en: "" },
          { de: "As someone who …, I …", tr: "… biri olarak …", en: "" },
          { de: "This is largely due to …", tr: "Bu büyük ölçüde … sayesinde", en: "" },
          { de: "The council should therefore …", tr: "Belediye bu yüzden … yapmalı", en: "" },
        ],
        sample:
          "Dear Editor, I am writing in response to your article on the scooter trial, which " +
          "described the scheme as a success. As far as the numbers go, that is fair. What the " +
          "article leaves out is what the trial was like for people who cannot simply step around " +
          "an obstacle. " +
          "As someone who uses a wheelchair, I spent most of last spring planning routes around " +
          "scooters that had been left across dropped kerbs. On one occasion the pavement outside " +
          "my building was so crowded that I had to go into the road. " +
          "The improvement since September is real, and it is largely due to the parking bays, " +
          "not to riders becoming more considerate. When there is somewhere obvious to leave a " +
          "scooter, people use it; when there isn't, they don't. " +
          "The council should therefore make the bays a condition of any permanent scheme, " +
          "check them every week, and ask disabled residents where they ought to go, rather than " +
          "deciding for us. A few lines of paint have done more for my street than a year of " +
          "apologies. Yours faithfully, A. Lindqvist",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b2-lib-s14",
    course: "en",
    level: "B2",
    skill: "speaking",
    title: "Should Cities Welcome Shared Scooters?",
    genre: "monologue",
    intro: "Bir dakikadan uzun tek başına konuşacaksın: bir rakamı doğru yorumla ve bedeli kimin ödediğini göster.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Şehirler kiralık elektrikli scooterlara izin vermeli mi? Konumunu söyle, en önemli rakamı doğru yorumla, bedeli en çok kimin ödediğini söyle ve izin için bir koşul koy.",
      bulletsTr: [
        "Konumunu tek cümleyle söyle",
        "En önemli rakamı doğru yorumla",
        "Bedeli en çok kimin ödediğini söyle",
        "İzin için bir koşul koy",
      ],
      targets: [
        { de: "I'd let them stay, but only on clear terms.", tr: "Kalmalarına izin verirdim ama yalnız açık koşullarla." },
        { de: "The figure that matters most here is …", tr: "Burada en önemli rakam …" },
        { de: "The cost is mostly carried by …", tr: "Bedeli çoğunlukla … taşıyor" },
        { de: "My condition would be that …", tr: "Koşulum şu olurdu: …" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "I'd let them stay, but only on clear terms, because the case for them is weaker than " +
        "their supporters claim and stronger than their critics admit. " +
        "The figure that matters most here is not the number of trips; it's what those trips " +
        "replaced. In most trials only a small share of rides replace a car journey. The rest " +
        "replace walking or a bus, so the environmental gain is modest. That doesn't make " +
        "scooters useless. It makes them a transport option rather than a climate policy, " +
        "and they should be judged as one. " +
        "The cost is mostly carried by people who never ride them: wheelchair users, parents " +
        "with pushchairs, older people who are nervous of anything silent and fast on a " +
        "pavement. Owing to the way the first schemes were designed, those people paid for " +
        "other people's convenience. " +
        "My condition would be that no scooter can end a trip outside a marked bay. It's a " +
        "small rule, it's easy to enforce because the app knows exactly where the scooter is, " +
        "and wherever it has been tried, complaints have dropped dramatically.",
      rubricHint:
        "Bir rakamın doğru yorumu, bedeli ödeyen kesimin adlandırılması ve uygulanabilir bir koşul beklenir; „the figure that matters most“ ve „owing to“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b2-lib-g14",
    course: "en",
    level: "B2",
    skill: "grammar",
    title: "because of, due to, as a result",
    genre: "grammar",
    intro: "Neden ve sonuç bildiren sözcüklerin her biri arkasından ne geleceğini kendisi belirler: isim mi, cümle mi, yeni bir cümle mi.",
    focus: "Neden-sonuç bağlaçları: because of/due to/owing to, since/as, as a result/therefore, so … that",
    gloss: [
      { de: "delay", tr: "gecikme" },
      { de: "sidewalk", tr: "kaldırım" },
      { de: "to cancel", tr: "iptal etmek" },
      { de: "narrow", tr: "dar" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "İsim mi, cümle mi?",
        tr: "„because of“, „due to“ ve „owing to“ arkasından İSİM öbeği alır: „because of the storm“. „because“, „since“ ve „as“ ise CÜMLE alır: „because a tree had fallen“. „since“ ve „as“ nedeni zaten bilinen bir bilgi gibi sunar ve çoğu zaman başa gelir.",
        examples: [
          { de: "The train was canceled because of the storm.", tr: "Tren fırtına yüzünden iptal edildi.", note: "because of + isim" },
          { de: "The train was canceled because a tree had fallen.", tr: "Bir ağaç devrildiği için tren iptal edildi.", note: "because + cümle" },
          { de: "Since you're here, could you check the list?", tr: "Madem buradasın, listeye bakar mısın?", note: "bilinen neden" },
        ],
      },
      {
        heading: "due to ve owing to",
        tr: "„due to“ resmî yazıda sık geçer ve „be“ fiilinden sonra da gelebilir: „The delay was due to a fault.“ „owing to“ bu konumda pek kullanılmaz; cümle başında ya da sonunda durur. Konuşmada ikisinin yerine çoğu zaman „because of“ yeter.",
        examples: [
          { de: "The delay was due to a technical fault.", tr: "Gecikme teknik bir arızadan kaynaklanıyordu.", note: "be + due to" },
          { de: "Owing to the delay, the meeting started late.", tr: "Gecikme nedeniyle toplantı geç başladı.", note: "cümle başı" },
          { de: "Complaints fell due to the new parking spaces.", tr: "Yeni park alanları sayesinde şikâyetler azaldı.", note: "cümle sonu" },
        ],
      },
      {
        heading: "Sonuç: as a result, therefore, so … that",
        tr: "„as a result“, „therefore“ ve „consequently“ sonucu YENİ bir cümlede verir; önceki cümleye virgülle eklenemez. „so + sıfat + that“ ve „such (a) + isim öbeği + that“ ise tek cümlede bir derecenin sonucunu anlatır.",
        examples: [
          { de: "Most trips replaced walking. As a result, the benefit was small.", tr: "Çoğu yolculuk yürümenin yerini aldı. Sonuç olarak fayda küçüktü.", note: "yeni cümle" },
          { de: "The sidewalk was so narrow that we had to walk in the street.", tr: "Kaldırım o kadar dardı ki yola inmek zorunda kaldık.", note: "so + sıfat" },
          { de: "It was such a short trip that I walked.", tr: "O kadar kısa bir yoldu ki yürüdüm.", note: "such a + isim" },
        ],
      },
    ],
    questions: [
      {
        text: "The train was canceled ___ the storm.",
        options: ["because of", "because", "since"],
        answer: 0,
        explain: "Arkasından isim öbeği geliyor: because of.",
      },
      {
        text: "It was ___ short trip that I decided to walk.",
        options: ["so", "so a", "such a"],
        answer: 2,
        explain: "İsim öbeği önünde „such a … that“ kullanılır.",
      },
      {
        text: "Which is punctuated correctly?",
        options: [
          "Most trips replaced walking, as a result the benefit was small.",
          "Most trips replaced walking. As a result, the benefit was small.",
          "Most trips replaced walking as a result, the benefit was small.",
        ],
        answer: 1,
        explain: "„As a result“ sonucu yeni bir cümlede verir ve kendi virgülünü alır.",
      },
      {
        kind: "gapfill",
        text: "The delay was ___ to a technical fault.",
        options: [],
        answer: 0,
        accept: ["due"],
        explain: "„be + due to“ resmî bir neden kalıbıdır.",
      },
      {
        kind: "gapfill",
        text: "The sidewalk was ___ narrow that we had to walk in the street.",
        options: [],
        answer: 0,
        accept: ["so"],
        explain: "Sıfat önünde „so … that“ kullanılır.",
      },
      {
        kind: "gapfill",
        text: "___ you're here, could you check the list? (a reason we both know)",
        options: [],
        answer: 0,
        accept: ["Since", "since", "As", "as"],
        explain: "„since“ ve „as“ cümle alır ve nedeni bilinen bir bilgi gibi sunar.",
      },
      {
        kind: "gapfill",
        text: "The meeting started late ___ to the delay.",
        options: [],
        answer: 0,
        accept: ["owing", "due"],
        explain: "„owing to“ ve „due to“ arkasından isim öbeği alır.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Complaints", "fell", "due to", "the new", "parking spaces"],
        explain: "Sonuç cümlesi, ardından due to + isim öbeği.",
      },
      {
        kind: "truefalse",
        text: "„Because of it was raining, we stayed in.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„because of“ cümle almaz: „Because it was raining“ ya da „Because of the rain“ olmalı.",
      },
      {
        kind: "truefalse",
        text: "„The delay was due to a technical fault.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "„due to“ „be“ fiilinden sonra gelebilir ve isim öbeği alır.",
      },
    ],
  },
];
