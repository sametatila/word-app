import type { SkillExercise } from "../../types";

/**
 * EN · C1 — Beceriler kütüphanesi, parti 7.
 *
 * Kurallar ve emsal: `en-c1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 7 onarım hakkı hattı: üreticiye yazılan mektup, bir araştırma
 * bildirimi, bir ürün değerlendirmesi. Dil bilgisi koşul ve ödün
 * belirteçleri — whatever, provided that, unless.
 */
export const enC1P7: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-lib-r7",
    course: "en",
    level: "C1",
    skill: "reading",
    title: "An Open Letter to a Manufacturer",
    genre: "letter",
    intro: "Bir tamir atölyesi ağından üreticiye açık mektup: ne istiyorlar, ne istemiyorlar, neyi kabul ediyorlar.",
    gloss: [
      { de: "spare part", tr: "yedek parça" },
      { de: "clip", tr: "klips" },
      { de: "legislation", tr: "yasa" },
      { de: "adhesive", tr: "yapıştırıcı" },
      { de: "schematic", tr: "devre şeması" },
      { de: "to concede", tr: "kabul etmek" },
      { de: "genuine", tr: "hakiki" },
      { de: "current", tr: "mevcut" },
      { de: "slight", tr: "ufak" },
      { de: "manufacturer", tr: "imalatçı" },
      { de: "independent", tr: "bağımsız" },
      { de: "commercial", tr: "ticari" },
      { de: "production", tr: "üretim" },
      { de: "environment", tr: "çevre" },
      { de: "sue", tr: "dava açmak" },
      { de: "threaten", tr: "tehdit etmek" },
      { de: "explicitly", tr: "açıkça" },
      { de: "intend", tr: "niyetinde olmak" },
    ],
    minutes: 10,
    text:
      "An open letter to the manufacturer of the K40 series\n\n" +
      "We are a network of thirty-one independent repair workshops. " +
      "We are writing publicly because two years of correspondence has produced " +
      "three polite acknowledgements and no change.\n\n" +
      "Let us begin with what we are not asking for. " +
      "We are not asking you to open your designs, nor to supply parts below cost, " +
      "nor to guarantee repairs carried out by us. " +
      "Those demands are made elsewhere and we think they weaken the case.\n\n" +
      "We are asking for three things. " +
      "First, that spare parts be sold to anyone at the price you charge your own service " +
      "centres, provided the buyer has an account with a trade supplier. " +
      "Second, that the battery in the K40 be held with screws or clips rather than adhesive, " +
      "which adds, by your own published figure, forty cents to the unit cost. " +
      "Third, that schematics be released five years after a model leaves production, " +
      "by which time no commercial interest remains.\n\n" +
      "We concede two points that are usually skated over by people on our side. " +
      "A device designed to be opened is, other things being equal, slightly less " +
      "water-resistant, and that matters to buyers. " +
      "And some repairs genuinely should not be attempted outside a controlled environment, " +
      "whatever the customer believes.\n\n" +
      "What we do not concede is that these are reasons for the current position. " +
      "Unless a design choice can be shown to serve the user, it is a commercial decision " +
      "dressed as an engineering one, and it should be defended on those terms.\n\n" +
      "We would rather negotiate than legislate. But legislation is coming in two of our " +
      "markets, and it will be written by people who have never opened a K40. " +
      "Should you prefer to shape it, the invitation remains open.",
    questions: [
      {
        text: "Why are the workshops writing publicly?",
        options: [
          "Two years of private correspondence produced no change.",
          "They have been threatened legally.",
          "A customer asked them to.",
        ],
        answer: 0,
        explain: "Üç nazik yanıt alınmış, değişiklik olmamış.",
      },
      {
        text: "Which demand do they explicitly NOT make?",
        options: [
          "opening the designs",
          "selling parts at service-centre prices",
          "releasing schematics after five years",
        ],
        answer: 0,
        explain: "„We are not asking you to open your designs“ — bu taleplerin davayı zayıflattığını düşünüyorlar.",
      },
      {
        kind: "truefalse",
        text: "The workshops deny that openable devices are less water-resistant.",
        options: ["True", "False"],
        answer: 1,
        explain: "Bunu açıkça kabul ediyorlar ve alıcılar için önemli olduğunu söylüyorlar.",
      },
      {
        kind: "gapfill",
        text: "Replacing adhesive with screws adds ___ cents to the unit cost.",
        options: [],
        answer: 0,
        accept: ["forty", "40"],
        explain: "„by your own published figure, forty cents to the unit cost“.",
      },
      {
        kind: "short_answer",
        text: "How many workshops are in the network?",
        options: [],
        answer: 0,
        accept: ["thirty-one", "31", "thirty one"],
        explain: "„a network of thirty-one independent repair workshops“.",
      },
      {
        text: "What is the point of the final paragraph?",
        options: [
          "Legislation is coming, so negotiating now is in the manufacturer's interest.",
          "They will stop repairing the K40.",
          "They intend to sue the manufacturer.",
        ],
        answer: 0,
        explain: "Yasayı K40 açmamış kişiler yazacak; şekillendirmek isterse davet açık.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-lib-l7",
    course: "en",
    level: "C1",
    skill: "listening",
    title: "What the Repair Data Showed",
    genre: "report",
    intro: "Bir araştırma bildirimi: hangi cihazlar tamir ediliyor, hangileri edilmiyor ve sebebi ne.",
    gloss: [
      { de: "to abandon", tr: "vazgeçmek" },
      { de: "replacement", tr: "yenisi" },
      { de: "diagnostic", tr: "arıza tespiti" },
      { de: "proprietary", tr: "tescilli" },
      { de: "to calibrate", tr: "ayarlamak" },
      { de: "technician", tr: "teknisyen" },
      { de: "assume", tr: "varsaymak" },
      { de: "rise", tr: "yükselmek" },
      { de: "concern", tr: "ilgilendirmek" },
      { de: "bench", tr: "test tezgâhı" },
      { de: "independent", tr: "bağımsız" },
      { de: "uncertainty", tr: "belirsizlik" },
      { de: "fold", tr: "dahil etmek" },
      { de: "diagnosis", tr: "teşhis" },
      { de: "competent", tr: "yetkin" },
      { de: "intervention", tr: "müdahale" },
      { de: "sharp", tr: "keskin" },
    ],
    minutes: 10,
    segments: [
      { text: "We tracked eleven thousand repair attempts across four countries over eighteen months, and the pattern is not the one the debate assumes." },
      { text: "Cost is the stated reason in most surveys. In the data, cost decides only about a third of cases." },
      { speaker: "Dr Ferreira", text: "The larger factor is uncertainty. People will pay sixty per cent of the replacement price if they are told what is wrong before they commit." },
      { text: "Where a diagnostic fee is charged separately, abandonment rises sharply, even when the eventual repair is cheap." },
      { speaker: "Dr Ferreira", text: "That points at a fix nobody is campaigning for: fold the diagnosis into the quote. It costs the workshop almost nothing and moves more devices than any parts policy we modeled." },
      { text: "The second finding concerns calibration. Repairs that require proprietary software to complete fail at four times the rate of those that do not." },
      { text: "The part is available, the technician is competent, and the device still leaves the bench unusable because a value cannot be written back." },
      { speaker: "Dr Ferreira", text: "If I had to choose one intervention, it would be that, not the battery adhesive that everyone photographs." },
      { text: "The study has an obvious limit: every workshop in it was already an independent repairer, so we know nothing about the devices that never reach a bench at all." },
    ],
    questions: [
      {
        text: "What decides about a third of cases?",
        options: ["cost", "uncertainty", "the age of the device"],
        answer: 0,
        explain: "„In the data, cost decides only about a third of cases.“",
      },
      {
        text: "What does Dr Ferreira say is the larger factor?",
        options: ["uncertainty about what is wrong", "the price of parts", "lack of skilled staff"],
        answer: 0,
        explain: "Neyin bozuk olduğu önceden söylenirse insanlar yenisinin fiyatının %60'ını ödemeye razı.",
      },
      {
        kind: "truefalse",
        text: "Repairs needing proprietary software fail at the same rate as others.",
        options: ["True", "False"],
        answer: 1,
        explain: "„fail at four times the rate of those that do not“.",
      },
      {
        kind: "gapfill",
        text: "The study tracked ___ thousand repair attempts.",
        options: [],
        answer: 0,
        accept: ["eleven", "11"],
        explain: "„eleven thousand repair attempts across four countries“.",
      },
      {
        kind: "short_answer",
        text: "What single intervention would Dr Ferreira choose?",
        options: [],
        answer: 0,
        accept: ["calibration software", "the software problem", "proprietary software", "calibration", "the calibration step"],
        explain: "Herkesin fotoğrafladığı pil yapıştırıcısı değil, kalibrasyon.",
      },
      {
        text: "What limit does the study admit?",
        options: [
          "All workshops were already independent repairers.",
          "The sample was only one country.",
          "The period was too short to measure cost.",
        ],
        answer: 0,
        explain: "Hiç tezgâha ulaşmayan cihazlar hakkında bir şey bilinmiyor.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-lib-w7",
    course: "en",
    level: "C1",
    skill: "writing",
    title: "A Review With a Caveat",
    genre: "review",
    intro: "Bir cihazı değerlendiriyorsun: önce iki cümle kur, sonra hem öneren hem uyaran bir yorum yaz.",
    gloss: [
      { de: "durable", tr: "dayanıklı" },
      { de: "caveat", tr: "çekince" },
      { de: "to justify", tr: "gerekçelendirmek" },
      { de: "irreversible", tr: "geri alınamaz" },
      { de: "to withhold", tr: "esirgemek" },
      { de: "appear", tr: "görünmek" },
      { de: "intend", tr: "niyetinde olmak" },
      { de: "manufacturer", tr: "imalatçı" },
      { de: "commercial", tr: "ticari" },
      { de: "clip", tr: "klips" },
    ],
    minutes: 16,
    tasks: [
      {
        kind: "build",
        tr: "Pili değiştirilebildiği sürece bunu tavsiye ederim.",
        answer: "I would recommend it provided that the battery can be replaced.",
        alternatives: ["I would recommend it as long as the battery can be replaced."],
        hint: "„provided that“ ve „as long as“ koşul kurar ve „if“ten daha vurguludur.",
      },
      {
        kind: "build",
        tr: "Üretici ne derse desin, tamiri üç yıl sonra mümkün olmayacak.",
        answer: "Whatever the manufacturer says, repair will not be possible after three years.",
        alternatives: ["No matter what the manufacturer says, repair will not be possible after three years."],
        hint: "„whatever“ ve „no matter what“ ödün bildirir ve cümle başında durur.",
      },
      {
        kind: "free",
        prompt:
          "Bir cihaz için çekinceli bir değerlendirme yaz: ne kadar süredir kullandığını söyle, iki ölçütte somut ol, bir uzun vadeli riski adlandır, tavsiyeni koşula bağla ve puanını gerekçelendir.",
        checklist: [
          "Ne kadar süredir kullandığını yaz",
          "İki ölçütte somut ol",
          "Uzun vadeli bir riski adlandır",
          "Tavsiyeni koşula bağla ve puanı gerekçelendir",
        ],
        minWords: 150,
        phrases: [
          { de: "After fourteen months of daily use, …", tr: "On dört aylık günlük kullanımdan sonra, …", en: "" },
          { de: "On the two things that matter to me — … and … — it performs well.", tr: "Benim için önemli iki şeyde — … ve … — iyi.", en: "" },
          { de: "The caveat is not about performance but about …", tr: "Çekince başarımla değil … ile ilgili", en: "" },
          { de: "I would recommend it provided that …", tr: "… olduğu sürece tavsiye ederim", en: "" },
          { de: "Four stars, with the fifth withheld for …", tr: "Dört yıldız; beşinciyi … için ayırıyorum", en: "" },
        ],
        sample:
          "After fourteen months of daily use, I can say more about this device than the reviews " +
          "written in the first week, which is roughly when most of them appear. " +
          "On the two things that matter to me — battery behavior in the cold and the quality " +
          "of the screen at low brightness — it performs well, and better than the model it " +
          "replaced. The battery has lost about nine per cent of its original capacity, " +
          "which is unremarkable and honestly reported by the manufacturer's own tool. " +
          "The caveat is not about performance but about what happens in year three. " +
          "The battery is held in with adhesive rather than clips, and the calibration step " +
          "after replacement requires software that is only issued to authorized centers. " +
          "That combination means the decision about whether this device is still worth " +
          "keeping will not be mine; it will belong to whoever still runs an authorized " +
          "center in my city. " +
          "Whatever the manufacturer says about durability, an irreversible design choice is " +
          "not a durability feature. " +
          "I would recommend it provided that you intend to keep it for two to three years " +
          "and are comfortable replacing it after that. " +
          "Four stars, with the fifth withheld for a decision that was commercial and " +
          "presented as engineering.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-c1-lib-s7",
    course: "en",
    level: "C1",
    skill: "speaking",
    title: "Who Decides What Gets Repaired?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: bir kararın kimde olması gerektiğini savun.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Bir cihazın tamir edilip edilemeyeceğine kim karar vermeli? Konumunu söyle, karşı tarafın en iyi argümanını kur, ona cevap ver ve bir kural öner.",
      bulletsTr: [
        "Konumunu tek cümleyle söyle",
        "Karşı tarafın en iyi argümanını kur",
        "Ona cevap ver",
        "Uygulanabilir bir kural öner",
      ],
      targets: [
        { de: "The decision should rest with …, and not because …", tr: "Karar …'de olmalı, hem de … olduğu için değil" },
        { de: "The best case for the other position is …", tr: "Karşı konumun en iyi gerekçesi …" },
        { de: "Where that argument stops working is …", tr: "O argümanın işlemeyi bıraktığı yer …" },
        { de: "A rule I could actually defend is …", tr: "Gerçekten savunabileceğim bir kural …" },
      ],
      minSeconds: 60,
      maxSeconds: 100,
      sampleDe:
        "The decision should rest with the owner, and not because ownership is sacred — " +
        "it isn't, and we accept limits on it everywhere else — " +
        "but because the alternative puts the decision with the party that profits from " +
        "one of the two answers. " +
        "The best case for the other position is safety, and it is not a bad case. " +
        "A badly reseated battery is a genuine hazard, calibration exists for a reason, " +
        "and a manufacturer that certifies nothing is also a manufacturer that is blamed " +
        "for everything. " +
        "Where that argument stops working is in the detail. " +
        "If safety were the driver, we would expect the difficult repairs to be restricted " +
        "and the trivial ones left open. What we see instead is adhesive on a battery " +
        "that could be held by two clips, and a software step required to write back a value " +
        "that the device itself measured. " +
        "Neither of those is a safety design; they are commercial designs that safety is " +
        "invoked to defend. " +
        "A rule I could actually defend is this: any restriction on repair has to be stated " +
        "in the technical documentation with a reason, and the reason has to be one that " +
        "an engineer outside the company could check. " +
        "That leaves every genuine safety case intact and removes the ones that are not.",
      rubricHint:
        "Karşı argümanın dürüst kurulması ve denetlenebilir bir kural beklenir; „and not because“, „where that argument stops working“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-c1-lib-g7",
    course: "en",
    level: "C1",
    skill: "grammar",
    title: "provided that, whatever, unless",
    genre: "grammar",
    intro: "Koşul ve ödün belirteçleri argümanın sınırlarını çizer; her biri farklı bir kesinlik derecesi taşır.",
    focus: "Koşul ve ödün belirteçleri: provided that, unless, whatever, no matter",
    gloss: [
      { de: "battery", tr: "pil" },
      { de: "manufacturer", tr: "üretici" },
      { de: "objection", tr: "itiraz" },
      { de: "evidence", tr: "kanıt" },
    ],
    minutes: 12,
    explanation: [
      {
        heading: "provided that / as long as: vurgulu koşul",
        tr: "„provided that“, „providing“ ve „as long as“ hepsi „if“ demektir ama koşulun ZORUNLU olduğunu vurgular: yerine getirilmezse iddia da düşer. Resmî yazıda „provided that“, konuşmada „as long as“ tercih edilir. Arkasından present simple gelir, gelecek anlatılsa bile.",
        examples: [
          { de: "I'd recommend it provided that the battery can be replaced.", tr: "Pil değiştirilebildiği sürece tavsiye ederim.", note: "zorunlu koşul" },
          { de: "As long as the reason is published, I have no objection.", tr: "Gerekçe yayımlandığı sürece itirazım yok.", note: "konuşma dili" },
          { de: "Parts will be sold to anyone, provided they hold a trade account.", tr: "Ticari hesabı olan herkese parça satılır.", note: "„that“ düşebilir" },
        ],
      },
      {
        heading: "unless: tek istisna",
        tr: "„unless“ „if not“ demek gibi görünür ama tam olarak öyle değildir: TEK bir istisnayı işaret eder, yani „bu durum dışında“. Bu yüzden ana cümle olumsuz koşulun kendisine bir tepki ya da duygu bildiriyorsa kullanılmaz: „I'd be surprised if she didn't object“ doğrudur, „… unless she objected“ değildir. Kendisi olumsuzdur ve ikinci bir olumsuzluk almaz.",
        examples: [
          { de: "Unless a design serves the user, it is a commercial decision.", tr: "Bir tasarım kullanıcıya hizmet etmiyorsa ticari bir karardır.", note: "tek istisna" },
          { de: "We won't act unless we are asked.", tr: "İstenmedikçe işlem yapmayız.", note: "olumsuz + unless" },
          { de: "I'd be surprised if she didn't object.", tr: "İtiraz etmemesine şaşardım.", note: "burada unless olmaz" },
        ],
      },
      {
        heading: "whatever, however, no matter: ödün",
        tr: "„whatever“, „whoever“, „however“ ve „no matter what/how“ koşulun SONUCU DEĞİŞTİRMEDİĞİNİ söyler: hangi durumda olursa olsun aynı şey geçerli. Cümlenin başında ya da sonunda durabilirler. „however“ burada bir zarf değil bağlaçtır ve arkasından sıfat gelir: „however strong the argument is“.",
        examples: [
          { de: "Whatever the manufacturer says, the choice was commercial.", tr: "Üretici ne derse desin, seçim ticariydi.", note: "sonuç değişmiyor" },
          { de: "However strong the evidence is, some will not accept it.", tr: "Kanıt ne kadar güçlü olursa olsun bazıları kabul etmez.", note: "however + sıfat" },
          { de: "No matter who asks, the data is not released.", tr: "Kim sorarsa sorsun veriler paylaşılmıyor.", note: "no matter who" },
        ],
      },
    ],
    questions: [
      {
        text: "I'd recommend it ___ the battery can be replaced.",
        options: ["unless", "provided that", "no matter"],
        answer: 1,
        explain: "Zorunlu bir koşul bildiriliyor.",
      },
      {
        text: "___ a design serves the user, it is a commercial decision.",
        options: ["Provided that", "Unless", "However"],
        answer: 1,
        explain: "Tek bir istisna işaret ediliyor: „unless“.",
      },
      {
        text: "___ strong the evidence is, some will not accept it.",
        options: ["Whatever", "However", "No matter"],
        answer: 1,
        explain: "Arkasından sıfat geldiği için „however“ kullanılır.",
      },
      {
        kind: "gapfill",
        text: "We won't act ___ we are asked.",
        options: [],
        answer: 0,
        accept: ["unless"],
        explain: "„unless“ kendisi olumsuzdur; ikinci bir olumsuzluk gelmez.",
      },
      {
        kind: "gapfill",
        text: "___ the manufacturer says, the choice was commercial.",
        options: [],
        answer: 0,
        accept: ["Whatever", "whatever"],
        explain: "Söylenen ne olursa olsun sonuç değişmiyor.",
      },
      {
        kind: "gapfill",
        text: "Parts will be sold to anyone, ___ they hold a trade account. (a necessary condition)",
        options: [],
        answer: 0,
        accept: ["provided", "providing", "provided that", "providing that", "as long as", "so long as"],
        explain: "Zorunlu koşul: „provided (that)“; „that“ düşebilir.",
      },
      {
        kind: "gapfill",
        text: "No matter ___ asks, the data is not released.",
        options: [],
        answer: 0,
        accept: ["who"],
        explain: "Kişi soruluyorsa „no matter who“ gelir.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["As long as", "the reason", "is published", "I have no objection"],
        explain: "Koşul cümlesi başta, virgül, ana cümle.",
      },
      {
        kind: "truefalse",
        text: "“We won't act unless we aren't asked.” — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„unless“ zaten olumsuzdur; ikinci olumsuzluk anlamı tersine çevirir.",
      },
      {
        kind: "truefalse",
        text: "“However strong the evidence is, some will not accept it.” — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "„however“ ödün bağlacı olarak sıfatla birlikte kullanılır.",
      },
    ],
  },
];
