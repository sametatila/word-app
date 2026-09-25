import type { SkillExercise } from "../../types";

/**
 * EN · C1 — Beceriler kütüphanesi, parti 20.
 *
 * Hücreyi YİRMİYE tamamlayan on partinin sonuncusu: bununla her beceri
 * hücresi yirmiye ulaşıyor. Kurallar ve emsal: `en-c1.ts` (parti 1),
 * `en-c1-p6` … `p10` ve `data/content/SPEC.md`.
 *
 * Parti 20 bağış ve hibe hattı: koşullu bağışların sorunu üzerine bir
 * deneme, bir başvuru sahibinin hibe görevlisiyle telefon görüşmesi, bir
 * hibe başvurusunun ön yazısı. Dil bilgisi karmaşık edat öbekleri — in view
 * of, on the grounds of/that, in the event of, with regard to, by virtue
 * of; parti 5'teki söylem belirteçlerinden farklı olarak isim alan edatlar.
 */
export const enC1P20: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-lib-r20",
    course: "en",
    level: "C1",
    skill: "reading",
    title: "The Trouble With Restricted Gifts",
    genre: "essay",
    intro: "Bir deneme: belli bir amaca bağlanan bağışlar neden hem bağışçıyı hem hayır kurumunu memnun ediyor gibi görünüp kurumu yıpratıyor.",
    gloss: [
      { de: "donor", tr: "bağışçı" },
      { de: "charity", tr: "hayır kurumu" },
      { de: "scandal", tr: "skandal" },
      { de: "restricted", tr: "koşula bağlı" },
      { de: "accountant", tr: "muhasebeci" },
      { de: "roof", tr: "çatı" },
      { de: "running costs", tr: "işletme giderleri" },
      { de: "self-contained", tr: "kendi içinde tamam" },
      { de: "counter-argument", tr: "karşı argüman" },
      { de: "to abolish", tr: "yürürlükten kaldırmak" },
      { de: "foundation", tr: "vakıf" },
      { de: "grant", tr: "hibe" },
      { de: "purpose", tr: "amaç" },
      { de: "agreement", tr: "onay" },
    ],
    minutes: 10,
    text:
      "The trouble with restricted gifts\n\n" +
      "Most people who give to charity would like to know where their money goes, and in view of some " +
      "well-publicised scandals, that wish is entirely reasonable. The usual way of satisfying it is the " +
      "restricted gift: money given on condition that it is spent on a particular project, a named school or a " +
      "specific number of meals.\n\n" +
      "Restricted gifts are popular with donors and, on the surface, with charities too. They produce clear " +
      "stories and neat reports. The difficulty lies in what they leave out. A charity that runs forty projects " +
      "also needs an accountant, a roof, a telephone system and someone to answer it, and almost nobody wants " +
      "their name attached to any of those.\n\n" +
      "In a survey of small charities last year, nearly two-thirds said they had turned down or delayed work on the " +
      "grounds that no restricted fund covered its running costs. Several described keeping two sets of figures: " +
      "one showing each project as a separate, self-contained success, and one showing the building slowly " +
      "falling apart.\n\n" +
      "There is a counter-argument, and it deserves a fair hearing. Unrestricted money can be wasted more easily, " +
      "and a donor has no way of checking in advance whether it will be. By virtue of being specific, a restricted " +
      "gift at least makes failure visible.\n\n" +
      "The answer, I think, is not to abolish restrictions but to price them honestly. Some foundations now add a " +
      "fixed share, often around fifteen per cent, to every restricted grant for general costs, and state this " +
      "openly in their terms. In the event of a project being cancelled, the money can move to another purpose " +
      "with the donor's agreement rather than being returned.\n\n" +
      "With regard to trust, the lesson is simple. A charity that is never allowed to spend money on itself will " +
      "eventually have nothing left to spend it through.",
    questions: [
      {
        text: "Why are restricted gifts popular with donors?",
        options: [
          "They are free of tax.",
          "They show clearly where the money goes.",
          "They are required by law.",
        ],
        answer: 1,
        explain: "Net hikâyeler ve düzgün raporlar üretiyorlar; bağışçı parasının nereye gittiğini biliyor.",
      },
      {
        text: "What do restricted gifts leave out, according to the writer?",
        options: [
          "the running costs of the charity",
          "the projects run abroad",
          "the names of the donors",
        ],
        answer: 0,
        explain: "Muhasebeci, çatı, telefon ve ona cevap veren kişi: kimse adını bunlara bağlamak istemiyor.",
      },
      {
        kind: "truefalse",
        text: "The writer argues for abolishing restrictions entirely.",
        options: ["True", "False"],
        answer: 1,
        explain: "„not to abolish restrictions but to price them honestly“.",
      },
      {
        kind: "gapfill",
        text: "Some foundations add around ___ per cent to every restricted grant.",
        options: [],
        answer: 0,
        accept: ["fifteen", "15"],
        explain: "„often around fifteen per cent, to every restricted grant for general costs“.",
      },
      {
        kind: "short_answer",
        text: "What share of small charities had turned down or delayed work?",
        options: [],
        answer: 0,
        accept: ["nearly two-thirds", "two-thirds", "two thirds"],
        explain: "Hiçbir koşullu fon işletme giderlerini karşılamadığı gerekçesiyle.",
      },
      {
        text: "What does a restricted gift do well, according to the counter-argument?",
        options: [
          "It reduces the charity's costs.",
          "It attracts more donors.",
          "It makes failure visible.",
        ],
        answer: 2,
        explain: "„By virtue of being specific, a restricted gift at least makes failure visible.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-lib-l20",
    course: "en",
    level: "C1",
    skill: "listening",
    title: "Calling About the Small Grants Round",
    genre: "phone",
    intro: "Bir telefon görüşmesi: yetişkinler için okuma kulübü yürüten biri, başvurmadan önce hibe görevlisine koşulları soruyor.",
    gloss: [
      { de: "grant", tr: "hibe" },
      { de: "eligible", tr: "başvurmaya uygun" },
      { de: "condition", tr: "koşul" },
      { de: "rent", tr: "kira" },
      { de: "to justify", tr: "gerekçelendirmek" },
      { de: "relief", tr: "rahatlama" },
      { de: "coordinator", tr: "koordinatör" },
      { de: "accordance", tr: "uygunluk" },
      { de: "unspent", tr: "harcanmamış" },
      { de: "deadline", tr: "son tarih" },
    ],
    minutes: 10,
    segments: [
      { speaker: "Mr Farrant", text: "Hello, I'm calling with regard to the small grants round. We run a reading club for adults, and I wanted to check we're eligible before we apply." },
      { speaker: "Ms Obi", text: "Of course. The main condition is that the work is local and open to anyone. In view of what you've described, that shouldn't be a problem." },
      { speaker: "Mr Farrant", text: "The part I'm unsure about is costs. Most of what we need is rent for the room, not books." },
      { speaker: "Ms Obi", text: "That's fine. We changed the rules two years ago. Up to twenty per cent of any grant can now go on running costs, and you don't need to justify it line by line." },
      { speaker: "Mr Farrant", text: "That's a relief. The last fund we applied to refused on the grounds that rent wasn't a project." },
      { speaker: "Ms Obi", text: "We heard that a lot, which is partly why we changed. A club without a room isn't a club." },
      { speaker: "Mr Farrant", text: "And if we can't spend it all? We're a small group. In the event of our coordinator leaving, things could stop for a while." },
      { speaker: "Ms Obi", text: "Then tell us early. In accordance with our terms, unspent money can be carried into a second year, as long as you agree it with us in writing." },
      { speaker: "Mr Farrant", text: "And when's the deadline?" },
      { speaker: "Ms Obi", text: "The last Friday in October. Decisions are made within eight weeks, and we always give a reason when we say no." },
    ],
    questions: [
      {
        text: "What is the main condition for the grant?",
        options: [
          "The applicant must be a registered company.",
          "The group must have existed for five years.",
          "The work must be local and open to anyone.",
        ],
        answer: 2,
        explain: "„The main condition is that the work is local and open to anyone.“",
      },
      {
        text: "Why did the last fund refuse Mr Farrant's group?",
        options: [
          "The application arrived late.",
          "Rent was not seen as a project.",
          "The club was too small.",
        ],
        answer: 1,
        explain: "„refused on the grounds that rent wasn't a project“.",
      },
      {
        kind: "truefalse",
        text: "Unspent money can be carried into a second year if it is agreed in writing.",
        options: ["True", "False"],
        answer: 0,
        explain: "„unspent money can be carried into a second year, as long as you agree it with us in writing“.",
      },
      {
        kind: "gapfill",
        text: "Up to ___ per cent of any grant can go on running costs.",
        options: [],
        answer: 0,
        accept: ["twenty", "20"],
        explain: "„Up to twenty per cent of any grant can now go on running costs“.",
      },
      {
        kind: "short_answer",
        text: "When is the deadline?",
        options: [],
        answer: 0,
        accept: ["the last Friday in October", "last Friday in October", "the last Friday of October"],
        explain: "Kararlar sekiz hafta içinde veriliyor.",
      },
      {
        text: "What does the fund always do when it says no?",
        options: [
          "It gives a reason.",
          "It offers a smaller grant.",
          "It asks for a new application.",
        ],
        answer: 0,
        explain: "„we always give a reason when we say no“.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-lib-w20",
    course: "en",
    level: "C1",
    skill: "writing",
    title: "A Cover Letter for a Grant",
    genre: "letter",
    intro: "Bir vakfa hibe başvurusunun ön yazısını yazıyorsun: önce iki cümle kur, sonra kısa, somut ve dürüst bir mektup yaz.",
    gloss: [
      { de: "applicant", tr: "başvuru sahibi" },
      { de: "to apply", tr: "başvurmak" },
      { de: "budget", tr: "bütçe" },
      { de: "rent", tr: "kira" },
      { de: "to cover", tr: "karşılamak" },
      { de: "unspent", tr: "harcanmamış" },
    ],
    minutes: 16,
    tasks: [
      {
        kind: "build",
        tr: "Artan kira nedeniyle bu yıl bir hibeye başvuruyoruz.",
        answer: "In view of the rising rent, we are applying for a grant this year.",
        alternatives: ["We are applying for a grant this year in view of the rising rent."],
        hint: "„in view of“ bir bağlaç değil edattır: arkasından tam cümle değil isim öbeği gelir.",
      },
      {
        kind: "build",
        tr: "Koordinatörümüzün ayrılması durumunda gönüllülerden biri görevi üstlenecek.",
        answer: "In the event of our coordinator leaving, one of the volunteers will take over.",
        alternatives: ["One of the volunteers will take over in the event of our coordinator leaving."],
        hint: "„in the event of“ isim ya da -ing alır; tam cümle için „in the event that“ kullanılır.",
      },
      {
        kind: "free",
        prompt:
          "Bir vakfa hibe başvurusunun ön yazısını yaz: grubunuzu ve ne istediğinizi bir paragrafta tanıt, paranın nereye gideceğini somut olarak söyle, işletme giderlerini açıkça gerekçelendir, bir riski ve ona karşı planınızı yaz ve kısa bir kapanış yap.",
        checklist: [
          "Grubunuzu ve istediğiniz tutarı tanıt",
          "Paranın nereye gideceğini somut olarak söyle",
          "İşletme giderlerini açıkça gerekçelendir",
          "Bir riski ve ona karşı planınızı yaz",
        ],
        minWords: 160,
        phrases: [
          { de: "I am writing with regard to …", tr: "… ile ilgili olarak yazıyorum", en: "" },
          { de: "We are applying for … in order to …", tr: "… amacıyla … için başvuruyoruz", en: "" },
          { de: "In view of …, a larger share will go on …", tr: "… göz önüne alındığında daha büyük bir pay …'e gidecek", en: "" },
          { de: "In the event of …, …", tr: "… durumunda …", en: "" },
          { de: "We would be glad to provide any further information.", tr: "Her türlü ek bilgiyi memnuniyetle sağlarız.", en: "" },
        ],
        sample:
          "Dear Ms Obi,\n\n" +
          "I am writing with regard to the small grants round on behalf of the Tuesday Reading Club, a group of " +
          "about thirty adults who meet weekly in the community hall on Station Road to read and discuss one book a " +
          "month. We are applying for £2,400 in order to keep the club running for another year.\n\n" +
          "Most of the money would go on things that are easy to describe: copies of the monthly book for members who " +
          "cannot afford them, and two large-print editions for our two members with poor eyesight. In view of the " +
          "rising rent, however, a larger share than before will go on the hall itself, roughly twenty per cent. " +
          "We want to say this openly rather than hide it inside other lines. Without the room there is no club, " +
          "and the rent has gone up twice in eighteen months.\n\n" +
          "The main risk is our size. The club depends heavily on one coordinator. In the event of her leaving, one of " +
          "the volunteers has agreed to take over, and we have written down how bookings and orders work so that the " +
          "change would not stop the meetings. If any money remained unspent, we would contact you before the end of " +
          "the year.\n\n" +
          "We would be glad to provide any further information, and you would be very welcome to visit on a Tuesday.\n\n" +
          "Yours sincerely,\nDaniel Farrant",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-c1-lib-s20",
    course: "en",
    level: "C1",
    skill: "speaking",
    title: "Should Donors Decide How Charities Spend Money?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: bağışçının söz hakkı ile kurumun bağımsızlığı arasında bir denge kur.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Bağışçılar hayır kurumlarının parayı nasıl harcayacağına karar vermeli mi? Bağışçının haklı kaygısını kabul et, bu kaygının ne zaman zarara dönüştüğünü göster, bir denge öner ve kendi önerinin zayıf yanını söyle.",
      bulletsTr: [
        "Bağışçının haklı kaygısını kabul et",
        "Kaygının ne zaman zarara dönüştüğünü göster",
        "Bir denge öner",
        "Önerinin zayıf yanını söyle",
      ],
      targets: [
        { de: "In view of how often money has been misused, the wish is reasonable.", tr: "Paranın ne sıklıkla kötüye kullanıldığı göz önüne alındığında istek makul." },
        { de: "Where it becomes harmful is …", tr: "Zararlı hâle geldiği yer …" },
        { de: "What I'd propose is a balance: …", tr: "Önereceğim şey bir denge: …" },
        { de: "The weakness of this, with regard to …, is that …", tr: "Bunun … açısından zayıf yanı şu: …" },
      ],
      minSeconds: 60,
      maxSeconds: 100,
      sampleDe:
        "In view of how often money has been misused, the wish to decide is reasonable, and I don't think donors " +
        "should be made to feel suspicious for having it. " +
        "If I give to a school project, I would like the money to reach the school. " +
        "Where it becomes harmful is when every donor makes the same choice. " +
        "Nobody restricts a gift to the accountant, the rent or the phone bill, and so the organisation slowly " +
        "stops being able to run the projects that everybody is so keen to fund. " +
        "It is a little like paying for the meal but refusing to pay for the kitchen. " +
        "What I'd propose is a balance: donors choose the purpose, but a fixed share of every gift, perhaps " +
        "fifteen per cent, goes on general costs, and the charity says so clearly before anybody gives. " +
        "In the event of a project failing, the money should be moved with the donor's agreement rather than " +
        "returned, because a returned gift helps no one. " +
        "The weakness of this, with regard to trust, is that it asks donors to accept a cost they cannot see. " +
        "Charities that publish their general spending openly will earn that trust. Those that don't probably " +
        "should not have it.",
      rubricHint:
        "Bağışçının kaygısının kabulü, zararın gösterilmesi, somut bir denge önerisi ve zayıf yanın kabulü beklenir; „in view of“, „in the event of“, „with regard to“ gibi edat öbekleri kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-c1-lib-g20",
    course: "en",
    level: "C1",
    skill: "grammar",
    title: "in view of, on the grounds that",
    genre: "grammar",
    intro: "Resmî yazının gerekçeyi, koşulu ve konuyu bağlama biçimi: birkaç sözcükten kurulmuş ama tek bir edat gibi davranan öbekler.",
    focus: "Karmaşık edat öbekleri: in view of, on the grounds of/that, in the event of, with regard to, by virtue of (söylem belirteci değil, isim alan edat)",
    gloss: [
      { de: "grant", tr: "hibe" },
      { de: "rent", tr: "kira" },
      { de: "to refuse", tr: "reddetmek" },
      { de: "coordinator", tr: "koordinatör" },
    ],
    minutes: 12,
    explanation: [
      {
        heading: "Söylem belirteci değil, edat",
        tr: "„however“ ve „that said“ gibi söylem belirteçleri tek başına durur ve iki cümleyi bağlar. Buradaki öbekler ise birkaç sözcükten oluşan EDATLARDIR: arkalarından bir isim öbeği ya da -ing gelir. „In view of the delay, …“ doğrudur; „In view of, the delay grew“ yanlıştır. Anlamlarına göre üç gruba ayrılırlar: gerekçe, koşul ve konu.",
        examples: [
          { de: "In view of the delay, the committee postponed its decision.", tr: "Gecikme göz önüne alındığında kurul kararını erteledi.", note: "gerekçe + isim öbeği" },
          { de: "By virtue of being specific, the gift makes failure visible.", tr: "Belirli olması sayesinde bağış başarısızlığı görünür kılıyor.", note: "by virtue of + -ing" },
          { de: "With regard to costs, the rules have changed.", tr: "Giderler konusunda kurallar değişti.", note: "konu" },
        ],
      },
      {
        heading: "of mu, that mi?",
        tr: "Bazı öbeklerin iki biçimi vardır. „on the grounds of“ ve „in the event of“ isim ya da -ing alır; „on the grounds that“ ve „in the event that“ ise tam bir cümle alır. İkisini karıştırmak C1 yazısında en sık görülen hatalardandır: „on the grounds that the room was too small“ doğrudur, „on the grounds of the room was too small“ yanlıştır.",
        examples: [
          { de: "They refused on the grounds that the room was too small.", tr: "Odanın çok küçük olduğu gerekçesiyle reddettiler.", note: "that + cümle" },
          { de: "They refused on the grounds of cost.", tr: "Maliyet gerekçesiyle reddettiler.", note: "of + isim" },
          { de: "In the event of our coordinator leaving, a volunteer will take over.", tr: "Koordinatörümüzün ayrılması durumunda bir gönüllü görevi üstlenecek.", note: "of + -ing" },
        ],
      },
      {
        heading: "Kayıt: resmî ve gündelik karşılıklar",
        tr: "Bu öbekler resmî kayda aittir ve gündelik konuşmada ağır durur. „with regard to“ yerine „about“, „in view of“ yerine „because of“, „in the event of“ yerine „if“ söylenir. „in accordance with“ ise neredeyse yalnız kurallar ve sözleşmeler için kullanılır: „in accordance with our terms“.",
        examples: [
          { de: "I'm calling with regard to the grants round.", tr: "Hibe turu ile ilgili olarak arıyorum.", note: "resmî: with regard to" },
          { de: "I'm calling about the grants round.", tr: "Hibe turu hakkında arıyorum.", note: "gündelik: about" },
          { de: "In accordance with our terms, the money can be carried over.", tr: "Koşullarımıza göre para bir sonraki yıla aktarılabilir.", note: "kurallar için" },
        ],
      },
    ],
    questions: [
      {
        text: "They refused on the grounds ___ the room was too small.",
        options: ["of", "that", "for"],
        answer: 1,
        explain: "Arkasından tam cümle geldiği için „on the grounds that“.",
      },
      {
        text: "Which is the informal equivalent of “with regard to”?",
        options: ["about", "despite", "unless"],
        answer: 0,
        explain: "Gündelik dilde „with regard to“ yerine „about“ söylenir.",
      },
      {
        text: "___ being specific, the gift makes failure visible.",
        options: ["In spite of", "In the event of", "By virtue of"],
        answer: 2,
        explain: "Gerekçe bildiren „by virtue of“ (sayesinde) + -ing.",
      },
      {
        kind: "gapfill",
        text: "In ___ of the delay, the committee postponed its decision.",
        options: [],
        answer: 0,
        accept: ["view"],
        explain: "„in view of“ gerekçe bildirir ve isim öbeği alır.",
      },
      {
        kind: "gapfill",
        text: "They refused on the grounds ___ cost.",
        options: [],
        answer: 0,
        accept: ["of"],
        explain: "İsimden önce „on the grounds of“.",
      },
      {
        kind: "gapfill",
        text: "In the event ___ our coordinator leaving, a volunteer will take over.",
        options: [],
        answer: 0,
        accept: ["of"],
        explain: "-ing ile „in the event of“ kullanılır.",
      },
      {
        kind: "gapfill",
        text: "In accordance ___ our terms, the money can be carried over.",
        options: [],
        answer: 0,
        accept: ["with"],
        explain: "Sabit öbek: „in accordance with“.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["I'm calling", "with regard to", "the grants round"],
        explain: "Edat öbeği + isim öbeği.",
      },
      {
        kind: "truefalse",
        text: "“In view of, the rent rose again.” — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„in view of“ tek başına duramaz; arkasından bir isim öbeği gelmeli.",
      },
      {
        kind: "truefalse",
        text: "“In the event that the coordinator leaves, a volunteer will take over.” — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Tam cümle için „in the event that“ kullanılır.",
      },
    ],
  },
];
