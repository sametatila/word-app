import type { SkillExercise } from "../../types";

/**
 * EN · B2 — Beceriler kütüphanesi, parti 8.
 *
 * Kurallar ve emsal: `en-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 8 sorumluluk hattı: belediyeden gelen bir mektup, bir bilgilendirme
 * yayını, bir hizmet değerlendirmesi. Dil bilgisi miktar belirteçleri —
 * few / a few, the majority of, a great deal of.
 */
export const enB2P8: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-lib-r8",
    course: "en",
    level: "B2",
    skill: "reading",
    title: "Changes to Your Recycling Collection",
    genre: "letter",
    intro: "Belediyeden gelen bir mektup: sistem neden değişiyor, ne isteniyor, itiraz edilebilir mi.",
    gloss: [
      { de: "collection", tr: "toplama" },
      { de: "contamination", tr: "karışma" },
      { de: "landfill", tr: "çöp sahası" },
      { de: "every two weeks", tr: "iki haftada bir" },
      { de: "consultation", tr: "görüş alma" },
      { de: "to reject", tr: "geri çevirmek" },
      { de: "current", tr: "mevcut" },
      { de: "container", tr: "konteyner" },
      { de: "cardboard", tr: "karton" },
      { de: "household", tr: "hane" },
      { de: "object", tr: "itiraz etmek" },
      { de: "property", tr: "mülk" },
      { de: "can", tr: "teneke kutu" },
      { de: "majority", tr: "çoğunluk" },
    ],
    minutes: 8,
    text:
      "Dear Resident,\n\n" +
      "From September 1 the way we collect recycling will change, and we are writing to " +
      "everyone before the consultation closes rather than after it.\n\n" +
      "At present all recycling goes into one bin and is separated at the plant. " +
      "This is convenient, but the majority of loads we send now arrive with some " +
      "contamination, most often food left in containers. " +
      "When contamination goes above a certain level, the whole load is rejected " +
      "and goes to a landfill. Last year we lost almost a fifth of what residents had " +
      "carefully put in the right bin.\n\n" +
      "From September there will be two containers: one for paper and cardboard, one for " +
      "plastic, glass and cans. Collections will still be every two weeks. " +
      "A few streets with no space for two containers will keep the current system, " +
      "and we will write to those households separately.\n\n" +
      "We know this asks more of you, and we want to be straight about the reason. " +
      "It is not that residents have been careless. It is that one bin makes a small " +
      "mistake expensive: a single unwashed jar can cost a whole street's effort.\n\n" +
      "The consultation runs until June 30. Few of the responses we have received so far " +
      "have objected to the change itself; a great deal of the comment has been about " +
      "storage space, which is exactly the point we are least certain about. " +
      "If your property has nowhere to put a second container, please tell us before the end " +
      "of June rather than in September.",
    questions: [
      {
        text: "Why is the council changing the system?",
        options: [
          "Contamination causes whole loads to be rejected.",
          "Residents asked for two bins.",
          "Collections are becoming too expensive.",
        ],
        answer: 0,
        explain: "Kirlilik belli bir düzeyi aşınca bütün yük çöpe gidiyor.",
      },
      {
        text: "What does the letter say about residents?",
        options: [
          "They have been careless.",
          "They are not to blame; one bin makes small mistakes expensive.",
          "They should complain less.",
        ],
        answer: 1,
        explain: "„It is not that residents have been careless.“",
      },
      {
        kind: "truefalse",
        text: "A few streets will keep the current one-bin system.",
        options: ["True", "False"],
        answer: 0,
        explain: "Yer olmayan birkaç sokak mevcut sistemde kalacak.",
      },
      {
        kind: "gapfill",
        text: "Last year almost a ___ of correctly sorted recycling was lost.",
        options: [],
        answer: 0,
        accept: ["fifth"],
        explain: "„we lost almost a fifth of what residents had carefully put in the right bin“.",
      },
      {
        kind: "short_answer",
        text: "What have most comments in the consultation been about?",
        options: [],
        answer: 0,
        accept: ["storage space", "space", "storage"],
        explain: "„a great deal of the comment has been about storage space“.",
      },
      {
        text: "What does the council ask residents without space to do?",
        options: [
          "Tell them before the end of June.",
          "Wait until September and then complain.",
          "Buy their own container.",
        ],
        answer: 0,
        explain: "„please tell us before the end of June rather than in September“.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-lib-l8",
    course: "en",
    level: "B2",
    skill: "listening",
    title: "Who Actually Pays for Recycling?",
    genre: "info",
    intro: "Bir bilgilendirme yayını: geri dönüşümün maliyeti kimde, hangi model deneniyor.",
    gloss: [
      { de: "packaging", tr: "ambalaj" },
      { de: "manufacturer", tr: "üretici" },
      { de: "levy", tr: "harç" },
      { de: "shopper", tr: "alışveriş yapan" },
      { de: "incentive", tr: "teşvik" },
      { de: "kerbside", tr: "kapı önü" },
      { de: "household", tr: "hane" },
      { de: "anyway", tr: "zaten" },
      { de: "calculate", tr: "hesaplamak" },
      { de: "tray", tr: "ambalaj tepsisi" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Presenter", text: "Household recycling is usually discussed as a question of behavior. Financially, it is mostly a question of packaging." },
      { speaker: "Presenter", text: "Roughly seventy percent of the cost of kerbside collection is paid by councils, which means by local taxes." },
      { speaker: "Ms. Reinhardt", text: "The people who decide what the packaging looks like pay almost none of it. That is the part worth changing." },
      { speaker: "Presenter", text: "Several countries have introduced a levy on manufacturers, calculated by weight and by how difficult the material is to recycle." },
      { speaker: "Ms. Reinhardt", text: "The effect was not what campaigners expected. Recycling rates moved a little. Packaging design moved a lot." },
      { speaker: "Presenter", text: "Within three years, black plastic trays, which machines cannot detect, had largely disappeared from the shelves of the countries with a levy." },
      { speaker: "Presenter", text: "Critics point out that manufacturers pass the cost on to shoppers, so households pay anyway, just through prices instead of taxes." },
      { speaker: "Ms. Reinhardt", text: "That's true, and I don't think it's an argument against. If the cost sits in the price, the incentive sits with the person who chose the material." },
      { speaker: "Presenter", text: "What nobody has solved is the small producer. A levy that a supermarket absorbs can close a store with four employees." },
    ],
    questions: [
      {
        text: "Who pays most of the cost of kerbside collection?",
        options: ["manufacturers", "councils, through local taxes", "shoppers, through prices"],
        answer: 1,
        explain: "„Roughly seventy percent … is paid by councils, which means by local taxes.“",
      },
      {
        text: "What changed most after the levy?",
        options: ["recycling rates", "packaging design", "collection frequency"],
        answer: 1,
        explain: "„Recycling rates moved a little. Packaging design moved a lot.“",
      },
      {
        kind: "truefalse",
        text: "Ms. Reinhardt thinks passing the cost to shoppers is an argument against the levy.",
        options: ["True", "False"],
        answer: 1,
        explain: "„That's true, and I don't think it's an argument against.“",
      },
      {
        kind: "gapfill",
        text: "Black plastic trays disappeared within ___ years.",
        options: [],
        answer: 0,
        accept: ["three", "3"],
        explain: "„Within three years, black plastic trays … had largely disappeared“.",
      },
      {
        kind: "short_answer",
        text: "What problem has nobody solved?",
        options: [],
        answer: 0,
        accept: ["the small producer", "small producers", "small stores", "small shops", "small businesses"],
        explain: "Süpermarketin yutabildiği bir harç, dört çalışanlı bir dükkânı kapatabiliyor.",
      },
      {
        text: "Why is the levy calculated by material as well as weight?",
        options: [
          "because some materials are harder to recycle",
          "because heavy packaging is always worse",
          "because councils requested it",
        ],
        answer: 0,
        explain: "„calculated by weight and by how difficult the material is to recycle“.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-lib-w8",
    course: "en",
    level: "B2",
    skill: "writing",
    title: "Review of the New Collection Service",
    genre: "review",
    intro: "Yeni toplama hizmetini değerlendiriyorsun: önce iki cümle kur, sonra ölçütlü ve dengeli bir yorum yaz.",
    gloss: [
      { de: "reliable", tr: "güvenilir" },
      { de: "to miss", tr: "atlamak" },
      { de: "container", tr: "çöp konteyneri" },
      { de: "helpline", tr: "yardım hattı" },
      { de: "improvement", tr: "iyileşme" },
      { de: "genuine", tr: "hakiki" },
      { de: "household", tr: "hane" },
      { de: "contaminate", tr: "kirletmek" },
      { de: "in total", tr: "toplamda" },
      { de: "majority", tr: "çoğunluk" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Sakinlerin çoğunluğu değişikliği kabul etti.",
        answer: "The majority of residents have accepted the change.",
        alternatives: ["Most residents have accepted the change."],
        hint: "„the majority of“ arkasından çoğul isim gelir ve fiil de çoğul çekilir.",
      },
      {
        kind: "build",
        tr: "Yalnız birkaç toplama atlandı.",
        answer: "Only a few collections were missed.",
        alternatives: ["Just a few collections were missed."],
        hint: "„a few“ az ama var demektir; „few“ ise neredeyse hiç.",
      },
      {
        kind: "free",
        prompt:
          "Yeni hizmeti değerlendir: ne zamandan beri kullandığını söyle, üç ölçütte somut ol (güvenilirlik, açıklık, destek), bir aksaklığı ve nasıl çözüldüğünü anlat, kime uygun olduğunu söyle ve puanını gerekçelendir.",
        checklist: [
          "Ne zamandan beri kullandığını yaz",
          "Üç ölçütte somut ol",
          "Bir aksaklığı ve çözümünü anlat",
          "Puanını gerekçelendir",
        ],
        minWords: 120,
        phrases: [
          { de: "We have been using the new service since …", tr: "Yeni hizmeti …'den beri kullanıyoruz", en: "" },
          { de: "On reliability, I would say …", tr: "Güvenilirlik konusunda … derim", en: "" },
          { de: "The information was clear about …, less so about …", tr: "Bilgilendirme … konusunda açıktı, … konusunda daha az", en: "" },
          { de: "When something went wrong, …", tr: "Bir şey ters gittiğinde …", en: "" },
          { de: "Three out of five, and the missing two are …", tr: "Beş üzerinden üç; eksik ikisi …", en: "" },
        ],
        sample:
          "We have been using the new two-container service since the beginning of September, " +
          "so this covers about four months and eight collections. " +
          "On reliability, I would say the service is better than the old one. " +
          "Only a few collections were missed, two in total, both in the first two weeks, and both were " +
          "collected two days later without our having to phone. " +
          "The information was clear about what goes in which container, less so about what " +
          "happens if a container is contaminated. We found that out from a neighbor, " +
          "not from the flyer. " +
          "When something went wrong — our paper container disappeared, probably taken by " +
          "mistake — the helpline answered in four minutes and a replacement arrived in a week. " +
          "That is genuinely good and worth saying, because people only write about helplines " +
          "when they are bad. " +
          "The service suits households with outside space. The majority of residents here have " +
          "that; the apartments above the stores do not, and I would not want to be sorting two " +
          "containers in a one-bedroom apartment. " +
          "Three out of five, and the missing two are storage and the flyer.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b2-lib-s8",
    course: "en",
    level: "B2",
    skill: "speaking",
    title: "Who Should Pay for Packaging Waste?",
    genre: "monologue",
    intro: "Bir dakikadan uzun tek başına konuşacaksın: sorumluluğu dağıt ve istenmeyen sonucu düşün.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Ambalaj atığının maliyetini kim üstlenmeli: üretici, tüketici mi yoksa belediye mi? Bir dağılım öner, gerekçelendir, istenmeyen bir sonucu adlandır ve bir güvence ekle.",
      bulletsTr: [
        "Bir dağılım öner ve tek cümleyle tanımla",
        "Gerekçeni ver",
        "İstenmeyen bir sonucu adlandır",
        "Bir güvence ekle",
      ],
      targets: [
        { de: "The cost should sit with whoever chose …", tr: "Maliyet … seçen kimdeyse orada durmalı" },
        { de: "The reason is not fairness so much as …", tr: "Sebep adalet olmaktan çok …" },
        { de: "The obvious risk is that …", tr: "Belli olan risk şu: …" },
        { de: "I'd want a safeguard for …", tr: "… için bir güvence isterdim" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "The cost should sit with whoever chose the material, which in practice means the " +
        "manufacturer rather than the household. " +
        "The reason is not fairness so much as information. " +
        "A shopper standing in front of a shelf cannot tell whether a black tray can be sorted " +
        "by a machine; the company that specified that tray knows exactly, " +
        "and is the only party that can change it at no real cost. " +
        "Where levies of this kind have been introduced, recycling rates moved slightly " +
        "and packaging design changed a great deal, which is what you would expect if the " +
        "problem is design rather than behavior. " +
        "The obvious risk is that the cost is simply passed on in prices, so households pay " +
        "anyway. I don't think that defeats the argument — the money still travels through " +
        "the person who made the decision — but it does mean the poorest pay twice, " +
        "once in prices and once in local taxes that don't fall. " +
        "I'd want a safeguard for small producers, who cannot absorb a fixed charge the way " +
        "a supermarket can. A levy scaled to turnover would keep the incentive and stop the " +
        "policy from clearing out exactly the stores everyone says they want to keep.",
      rubricHint:
        "Bir dağılım, istenmeyen sonuç ve somut güvence beklenir; „not … so much as“, „the obvious risk is that“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b2-lib-g8",
    course: "en",
    level: "B2",
    skill: "grammar",
    title: "few, a few, the majority of",
    genre: "grammar",
    intro: "Miktar belirteçleri yalnız sayı değil TUTUM da bildirir; „few“ ile „a few“ arasındaki fark bir harften ibaret değildir.",
    focus: "Miktar belirteçleri: few/a few, little/a little, the majority of, a great deal of",
    gloss: [
      { de: "response", tr: "yanıt" },
      { de: "resident", tr: "sakin" },
      { de: "progress", tr: "ilerleme" },
      { de: "evidence", tr: "kanıt" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "few ve a few: aynı sayı, ters tutum",
        tr: "İkisi de sayılabilen isimlerle gelir ve aynı miktarı anlatabilir, ama yön farklıdır. „a few“ OLUMLU bakar: az ama var. „few“ OLUMSUZ bakar: beklenenden az, neredeyse hiç. Sayılamayan isimlerde aynı ikili „a little“ ve „little“ olur.",
        examples: [
          { de: "A few residents objected.", tr: "Birkaç sakin itiraz etti.", note: "az ama var" },
          { de: "Few residents objected.", tr: "Neredeyse hiç sakin itiraz etmedi.", note: "beklenenden az" },
          { de: "There is little evidence for this.", tr: "Bunun için neredeyse hiç kanıt yok.", note: "sayılamaz + olumsuz" },
        ],
      },
      {
        heading: "the majority of, most, a great deal of",
        tr: "„most“ artikelsiz ve genel gelir: „Most residents have space.“ „the majority of“ daha resmîdir ve belirli bir gruba bakar: „the majority of the responses“. „a great deal of“ ve „a large amount of“ yalnız SAYILAMAYAN isimlerle; „a large number of“ ise yalnız çoğul sayılabilenlerle kullanılır.",
        examples: [
          { de: "Most residents have outside space.", tr: "Sakinlerin çoğunun dış alanı var.", note: "genel" },
          { de: "The majority of the responses mentioned storage.", tr: "Yanıtların çoğu depolamadan söz etti.", note: "belirli grup" },
          { de: "A great deal of progress has been made.", tr: "Epey ilerleme kaydedildi.", note: "sayılamaz" },
        ],
      },
      {
        heading: "Fiil tekil mi çoğul mu?",
        tr: "„the majority of“ ve „a number of“ arkasındaki isim ne ise fiil de ona uyar: „A number of residents HAVE complained“, ama „The number of complaints HAS risen.“ İlki bir miktar belirtecidir, ikincisi gerçek bir öznedir. Bu ayrım yazıda sık ölçülür.",
        examples: [
          { de: "A number of residents have complained.", tr: "Bir dizi sakin şikâyet etti.", note: "miktar → çoğul fiil" },
          { de: "The number of complaints has risen.", tr: "Şikâyet sayısı arttı.", note: "gerçek özne → tekil" },
          { de: "The majority of the letters were about space.", tr: "Mektupların çoğu yer üzerineydi.", note: "letters → çoğul" },
        ],
      },
    ],
    questions: [
      {
        text: "___ residents objected — in fact almost nobody did.",
        options: ["A few", "Few", "Little"],
        answer: 1,
        explain: "Beklenenden az anlamı „few“ ile verilir.",
      },
      {
        text: "There is ___ evidence for that claim.",
        options: ["few", "a few", "little"],
        answer: 2,
        explain: "„evidence“ sayılamaz; olumsuz tutum „little“ ile gelir.",
      },
      {
        text: "Which is correct?",
        options: [
          "The number of complaints have risen.",
          "A number of residents has complained.",
          "A number of residents have complained.",
        ],
        answer: 2,
        explain: "„a number of“ bir miktar belirtecidir; fiil çoğul olur.",
      },
      {
        kind: "gapfill",
        text: "___ residents have outside space. (general, no article)",
        options: [],
        answer: 0,
        accept: ["Most", "most"],
        explain: "Genel bir ifade için „most“ artikelsiz kullanılır.",
      },
      {
        kind: "gapfill",
        text: "The majority ___ the responses mentioned storage.",
        options: [],
        answer: 0,
        accept: ["of"],
        explain: "„the majority of“ kalıbı sabittir.",
      },
      {
        kind: "gapfill",
        text: "A great ___ of progress has been made. (deal / number)",
        options: [],
        answer: 0,
        accept: ["deal"],
        explain: "„progress“ sayılamaz; „a great deal of“ gelir.",
      },
      {
        kind: "gapfill",
        text: "___ few streets will keep the old system. (az ama var)",
        options: [],
        answer: 0,
        accept: ["A", "a"],
        explain: "Olumlu bakış „a few“ ile kurulur.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["The number", "of complaints", "has", "risen"],
        explain: "„The number of“ gerçek öznedir ve tekil fiil alır.",
      },
      {
        kind: "truefalse",
        text: "„Few residents objected.“ ile „A few residents objected.“ aynı tutumu bildirir.",
        options: ["True", "False"],
        answer: 1,
        explain: "„few“ beklenenden az, „a few“ az ama var demektir.",
      },
      {
        kind: "truefalse",
        text: "„A great deal of progress has been made.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "„progress“ sayılamaz ve „a great deal of“ onunla kullanılır.",
      },
    ],
  },
];
