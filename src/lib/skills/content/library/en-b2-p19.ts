import type { SkillExercise } from "../../types";

/**
 * EN · B2 — Beceriler kütüphanesi, parti 19.
 *
 * Hücreyi YİRMİYE tamamlayan partilerden biri (11–20). Kurallar ve emsal:
 * `en-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 19 kirada evcil hayvan hattı: kiracı derneğinin bilgi metni, dairede
 * hangi hayvanın uygun olduğu üzerine bir veterinerle radyo söyleşisi, ev
 * sahibinden izin isteyen mektup. Dil bilgisi sözcük türetme — olumsuz ön
 * ekler (un-, im-, ir-, dis-) ve -ity, -ness, -ment, -able son ekleri.
 */
export const enB2P19: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-lib-r19",
    course: "en",
    level: "B2",
    skill: "reading",
    title: "Pets in Rented Homes",
    genre: "info",
    intro: "Bir kiracı derneğinin bilgi metni: kiralık evde evcil hayvan için izin nasıl istenir, ne teklif edilir, hangi ret haklıdır.",
    gloss: [
      { de: "tenant", tr: "kiracı" },
      { de: "minority", tr: "azınlık" },
      { de: "tenancy agreement", tr: "kira sözleşmesi" },
      { de: "consent", tr: "onay" },
      { de: "refusal", tr: "ret" },
      { de: "to challenge", tr: "itiraz etmek" },
      { de: "neutered", tr: "kısırlaştırılmış" },
      { de: "vaccinated", tr: "aşılı" },
      { de: "manageable", tr: "idare edilebilir" },
      { de: "unaware", tr: "habersiz" },
      { de: "verbal", tr: "sözlü" },
      { de: "specific", tr: "somut" },
    ],
    minutes: 8,
    text:
      "Pets in rented homes: what tenants should know\n\n" +
      "More than half of renters say they would like a pet, but only a small minority have one. " +
      "The gap is not mainly about money or space. In most cases it is about permission, and " +
      "about how the request is made.\n\n" +
      "Start by reading your tenancy agreement. Some agreements ban pets completely; many more " +
      "say that pets are allowed “with the landlord's written consent”. That phrase matters. " +
      "It means the landlord must actually consider your request, and in several countries a " +
      "refusal without a reasonable explanation can be challenged.\n\n" +
      "Make the request in writing and make it specific. A landlord who reads “Can I get a " +
      "dog?” imagines the worst dog they have ever met. A landlord who reads about a " +
      "nine-year-old cat, already neutered and vaccinated, with a reference from a previous " +
      "landlord, is being asked something far more manageable.\n\n" +
      "Offer to reduce the risk, not just to promise good behaviour. Common offers include an " +
      "additional deposit, professional cleaning when you leave, or insurance that covers damage " +
      "caused by animals. Some landlords are unaware that such insurance exists.\n\n" +
      "Be realistic about what counts as reasonable. A large dog in a small flat with no outside " +
      "space is a different request from a cat in a house with a garden, and a refusal in the " +
      "first case is not necessarily unfair.\n\n" +
      "Finally, if permission is given, get it in writing and keep a copy. Verbal agreements " +
      "tend to be forgotten, especially when a property changes hands.",
    questions: [
      {
        text: "According to the text, what mainly explains the gap?",
        options: ["the cost", "permission", "lack of space"],
        answer: 1,
        explain: "„In most cases it is about permission“: para ya da yer değil, izin.",
      },
      {
        text: "Why should the request be specific?",
        options: [
          "Otherwise landlords imagine the worst.",
          "Specific requests are required by law.",
          "Specific requests cost the tenant less.",
        ],
        answer: 0,
        explain: "„Can I get a dog?“ okuyan ev sahibi tanıdığı en kötü köpeği hayal eder.",
      },
      {
        kind: "truefalse",
        text: "Some landlords do not know that insurance for pet damage exists.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Some landlords are unaware that such insurance exists.“",
      },
      {
        kind: "gapfill",
        text: "The cat in the example is ___ years old.",
        options: [],
        answer: 0,
        accept: ["nine", "9"],
        explain: "„a nine-year-old cat, already neutered and vaccinated“.",
      },
      {
        kind: "short_answer",
        text: "What should you do if permission is given?",
        options: [],
        answer: 0,
        accept: ["get it in writing", "get it written down", "keep a written copy"],
        explain: "İzni yazılı alıp bir kopyasını saklamak gerekiyor; sözlü anlaşmalar unutulur.",
      },
      {
        text: "What does the text say about a large dog in a small flat?",
        options: [
          "It must always be allowed.",
          "It only needs extra insurance.",
          "A refusal may well be fair.",
        ],
        answer: 2,
        explain: "„a refusal in the first case is not necessarily unfair“.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-lib-l19",
    course: "en",
    level: "B2",
    skill: "listening",
    title: "The Right Pet for a Flat",
    genre: "interview",
    intro: "Bir radyo söyleşisi: bir veteriner dairede yaşayan biri için hangi hayvanın uygun olduğunu ve nereden başlanacağını anlatıyor.",
    gloss: [
      { de: "suitable", tr: "uygun" },
      { de: "loneliness", tr: "yalnızlık" },
      { de: "out of the question", tr: "söz konusu bile değil" },
      { de: "responsibility", tr: "sorumluluk" },
      { de: "carer", tr: "bakıcı" },
      { de: "destructive", tr: "yıkıcı" },
      { de: "unwise", tr: "akıl kârı olmayan" },
      { de: "to foster", tr: "geçici bakım vermek" },
      { de: "irreversible", tr: "geri dönüşsüz" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Host", text: "A listener writes that she's finally allowed a pet in her flat and wants to know what's suitable. Dr Mensah, where would you start?" },
      { speaker: "Dr Mensah", text: "With her hours, not with the animal. The most common problem I see in flats isn't space at all. It's loneliness in animals that are left alone for ten hours a day." },
      { speaker: "Host", text: "So a dog is out of the question for someone who works full-time in an office?" },
      { speaker: "Dr Mensah", text: "Not necessarily, but it becomes her responsibility to arrange a walker or a daytime carer, and that costs money every single week, not just at the beginning." },
      { speaker: "Host", text: "What about cats? People often assume they're the easy option." },
      { speaker: "Dr Mensah", text: "An adult indoor cat is usually very manageable. Kittens are a different matter: they're energetic, occasionally destructive, and a new sofa is an unwise purchase in the first year." },
      { speaker: "Host", text: "And for someone who has genuinely never had an animal before?" },
      { speaker: "Dr Mensah", text: "I'd suggest fostering first. Rescue centres need temporary homes, the costs are usually covered, and after two months you'll know whether you can cope, without making an irreversible decision." },
      { speaker: "Dr Mensah", text: "The unhappiest cases I deal with come from people who chose a pet for how it looked in a photograph rather than for how they actually live." },
    ],
    questions: [
      {
        text: "Where does Dr Mensah say the choice should start?",
        options: [
          "with the owner's working hours",
          "with the size of the flat",
          "with the price of the animal",
        ],
        answer: 0,
        explain: "„With her hours, not with the animal.“",
      },
      {
        text: "What does Dr Mensah say about kittens?",
        options: [
          "They are easier than adult cats.",
          "They always need a garden.",
          "They can damage furniture.",
        ],
        answer: 2,
        explain: "Yavrular zaman zaman yıkıcı; ilk yıl yeni kanepe almak akıl kârı değil.",
      },
      {
        kind: "truefalse",
        text: "Dr Mensah recommends fostering an animal before adopting one.",
        options: ["True", "False"],
        answer: 0,
        explain: "„I'd suggest fostering first.“",
      },
      {
        kind: "gapfill",
        text: "The most common problem is animals left alone for ___ hours a day.",
        options: [],
        answer: 0,
        accept: ["ten", "10"],
        explain: "„animals that are left alone for ten hours a day“.",
      },
      {
        kind: "short_answer",
        text: "After how long will a new foster carer know whether they can cope?",
        options: [],
        answer: 0,
        accept: ["two months", "after two months", "about two months"],
        explain: "„after two months you'll know whether you can cope“.",
      },
      {
        text: "What leads to the unhappiest cases?",
        options: [
          "adopting from rescue centres",
          "choosing a pet from a photo",
          "moving house too often",
        ],
        answer: 1,
        explain: "Hayvanı nasıl yaşadıklarına göre değil, fotoğraftaki görüntüsüne göre seçenler.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-lib-w19",
    course: "en",
    level: "B2",
    skill: "writing",
    title: "Asking Permission for a Cat",
    genre: "letter",
    intro: "Ev sahibine mektup yazıyorsun: önce iki cümle kur, sonra evcil hayvan için somut, riski azaltan ve kibar bir izin isteği yaz.",
    gloss: [
      { de: "consent", tr: "onay" },
      { de: "indoors", tr: "ev içinde" },
      { de: "additional", tr: "ek" },
      { de: "carpet", tr: "halı" },
      { de: "to take out", tr: "yaptırmak" },
      { de: "vet", tr: "veteriner" },
      { de: "concern", tr: "kaygı" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Bu isteği mantıksız bulmayacağınızı umuyorum.",
        answer: "I hope you will not find this request unreasonable.",
        alternatives: ["I hope you won't find this request unreasonable."],
        hint: "Olumsuz ön ek: reasonable → unreasonable.",
      },
      {
        kind: "build",
        tr: "Her türlü hasarın tüm sorumluluğunu üstlenirim.",
        answer: "I would take full responsibility for any damage.",
        alternatives: ["I'd take full responsibility for any damage."],
        hint: "Sıfattan isim: responsible → responsibility (-ity eki).",
      },
      {
        kind: "free",
        prompt:
          "Ev sahibine bir mektup yaz: bir evcil hayvan için yazılı izin iste; hayvanı somut olarak tanıt, riski nasıl azaltacağını anlat, bir belge ya da referans ekle ve kararı ev sahibine bırakarak kibarca bitir.",
        checklist: [
          "Ne için izin istediğini açıkça yaz",
          "Hayvanı somut ayrıntılarla tanıt",
          "Riski azaltmak için ne teklif ettiğini söyle",
          "Ek belgeleri an ve kibarca bitir",
        ],
        minWords: 120,
        phrases: [
          { de: "I am writing to ask for your written consent to …", tr: "… için yazılı onayınızı istemek üzere yazıyorum", en: "" },
          { de: "To give you a clear picture, …", tr: "Size net bir fikir vermek için …", en: "" },
          { de: "To reduce any risk, I would be willing to …", tr: "Riski azaltmak için … yapmaya hazırım", en: "" },
          { de: "I have attached …", tr: "… ekte sunuyorum", en: "" },
          { de: "I would of course understand if …", tr: "… durumunda elbette anlayışla karşılarım", en: "" },
        ],
        sample:
          "Dear Mr Price, I am writing to ask for your written consent to keep a cat in the flat " +
          "at 14 Mill Lane, as my tenancy agreement requires. " +
          "To give you a clear picture, the cat is a nine-year-old female who has lived indoors " +
          "all her life. She is neutered, vaccinated and very calm, and she currently lives with " +
          "my mother, who is moving into a care home. " +
          "To reduce any risk, I would be willing to pay an additional deposit of two hundred " +
          "pounds and to have the carpets professionally cleaned when I leave. I would also take " +
          "out insurance that covers damage caused by pets, and I would take full responsibility " +
          "for anything it does not cover. " +
          "I have attached a letter from my mother's landlord, confirming that there has been no " +
          "damage in six years, and a copy of the vet's records. " +
          "I hope you will not find this request unreasonable. I would of course understand if " +
          "you had concerns, and I would be happy to discuss them before you decide. " +
          "Yours sincerely, Hanna Lindgren",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b2-lib-s19",
    course: "en",
    level: "B2",
    skill: "speaking",
    title: "Should Landlords Be Able to Ban Pets?",
    genre: "monologue",
    intro: "Bir dakikadan uzun tek başına konuşacaksın: karşı tarafın kaygısını hakkıyla ver ve adil bir ölçütü örnekle sına.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Ev sahipleri kiracılara evcil hayvanı tamamen yasaklayabilmeli mi? Konumunu söyle, ev sahibinin kaygısını hakkıyla ver, daha adil bir ölçüt öner ve onu iki örnekle sına.",
      bulletsTr: [
        "Konumunu tek cümleyle söyle",
        "Ev sahibinin kaygısını hakkıyla ver",
        "Daha adil bir ölçüt öner",
        "Ölçütü iki örnekle sına",
      ],
      targets: [
        { de: "A blanket ban seems unreasonable to me, but …", tr: "Topyekûn bir yasak bana makul gelmiyor, ama …" },
        { de: "The landlord's concern is understandable: …", tr: "Ev sahibinin kaygısı anlaşılır: …" },
        { de: "A fairer test would be whether …", tr: "Daha adil bir ölçüt … olup olmadığı olurdu" },
        { de: "Take, for example, …", tr: "Örneğin … düşünelim" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "A blanket ban seems unreasonable to me, but I don't think landlords should lose the " +
        "right to say no in every case. " +
        "The landlord's concern is understandable: they own the property, they pay for repairs, " +
        "and one destructive animal can cost them more than a year's rent. Most of them have " +
        "heard a story like that, and some have lived through one. " +
        "The trouble with a ban is that it treats every animal and every tenant as the worst " +
        "case. A fairer test would be whether the request is reasonable for that particular " +
        "home: the size of the animal, the size of the flat, whether there is outside space, " +
        "and whether the tenant is willing to reduce the risk with a deposit or insurance. " +
        "Take, for example, an elderly tenant who wants a quiet adult cat in a ground-floor " +
        "flat. Refusing that has no real justification, and it takes something important away " +
        "from the tenant. A large, young dog in a small upstairs flat is a different request, " +
        "and a refusal there would be perfectly fair. " +
        "So I'd keep the landlord's right to refuse, but I'd require a reason.",
      rubricHint:
        "Karşı tarafın kaygısını adil anlatma, açık bir ölçüt ve onu sınayan iki zıt örnek beklenir; „a fairer test would be whether“ ve „take, for example“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b2-lib-g19",
    course: "en",
    level: "B2",
    skill: "grammar",
    title: "unreasonable, responsibility, manageable",
    genre: "grammar",
    intro: "Bir kökten ön ve son eklerle yeni sözcükler türetilir; hangi ekin hangi köke geldiği tam bir kural değildir ama güvenilir kalıplar vardır.",
    focus: "Sözcük türetme: olumsuz ön ekler (un-, im-, ir-, dis-) ve -ity, -ness, -ment, -al, -able, -ive son ekleri",
    gloss: [
      { de: "tenant", tr: "kiracı" },
      { de: "landlord", tr: "ev sahibi" },
      { de: "unreasonable", tr: "makul olmayan" },
      { de: "impossible", tr: "imkânsız" },
      { de: "irreversible", tr: "geri dönüşsüz" },
      { de: "destructive", tr: "yıkıcı" },
      { de: "refusal", tr: "ret" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "Olumsuz ön ekler",
        tr: "Sıfatın anlamını tersine çeviren en yaygın ön ek „un-“dur (unreasonable, unaware). Latin kökenli sözcüklerde „in-“ gelir ve „p, b, m“ önünde „im-“, „l“ önünde „il-“, „r“ önünde „ir-“ olur. Fiillerde çoğu zaman „dis-“ kullanılır: disagree, disappear.",
        examples: [
          { de: "The landlord's refusal seemed unreasonable.", tr: "Ev sahibinin reddi makul görünmedi.", note: "un-" },
          { de: "Keeping a dog there would be impossible.", tr: "Orada köpek beslemek imkânsız olurdu.", note: "p önünde im-" },
          { de: "It is an irreversible decision.", tr: "Geri dönüşü olmayan bir karar.", note: "r önünde ir-" },
        ],
      },
      {
        heading: "İsim yapan son ekler",
        tr: "Sıfattan isim yapmanın sık yolları „-ity“ (responsible → responsibility) ve „-ness“tir (lonely → loneliness). Fiilden isim için „-ment“ (agree → agreement) ve „-al“ (refuse → refusal) kullanılır. „-ness“ yerli köklerde, „-ity“ Latin kökenlilerde daha yaygındır.",
        examples: [
          { de: "The tenant takes responsibility for any damage.", tr: "Kiracı her türlü hasarın sorumluluğunu alır.", note: "-ity" },
          { de: "Loneliness is a problem for many animals.", tr: "Yalnızlık birçok hayvan için bir sorun.", note: "-ness" },
          { de: "Please read the agreement before you sign.", tr: "İmzalamadan önce sözleşmeyi oku.", note: "-ment" },
        ],
      },
      {
        heading: "Sıfat yapan son ekler",
        tr: "„-able/-ible“ bir şeyin yapılabileceğini söyler (manage → manageable); „-ful“ ve „-less“ bir özelliğin varlığını ya da yokluğunu anlatır (careful, careless); „-ive“ bir eğilimi anlatır ve kök bazen değişir: destroy → destructive.",
        examples: [
          { de: "An adult cat is usually manageable.", tr: "Yetişkin bir kedi genelde idare edilebilir.", note: "-able" },
          { de: "Kittens can be quite destructive.", tr: "Yavru kediler epey yıkıcı olabilir.", note: "kök değişir" },
          { de: "The request was careful and specific.", tr: "İstek özenli ve net yazılmıştı.", note: "-ful" },
        ],
      },
    ],
    questions: [
      {
        text: "Keeping a large dog in that flat would be ___.",
        options: ["unpossible", "inpossible", "impossible"],
        answer: 2,
        explain: "„p“ önünde olumsuz ön ek „im-“ olur.",
      },
      {
        text: "The tenant takes full ___ for any damage.",
        options: ["responsible", "responsibility", "responsibleness"],
        answer: 1,
        explain: "Burada isim gerekiyor: responsible → responsibility.",
      },
      {
        text: "Kittens can be quite ___ in their first year.",
        options: ["destructive", "destroyful", "destroyable"],
        answer: 0,
        explain: "Eğilim bildiren sıfat „-ive“ ile kurulur ve kök değişir: destructive.",
      },
      {
        kind: "gapfill",
        text: "Please read the ___ before you sign. (agree)",
        options: [],
        answer: 0,
        accept: ["agreement"],
        explain: "Fiilden isim: agree → agreement.",
      },
      {
        kind: "gapfill",
        text: "Many animals suffer from ___ when they are left alone. (lonely)",
        options: [],
        answer: 0,
        accept: ["loneliness"],
        explain: "Sıfattan isim: lonely → loneliness; „y“ „i“ olur.",
      },
      {
        kind: "gapfill",
        text: "An adult cat is usually ___. (manage)",
        options: [],
        answer: 0,
        accept: ["manageable"],
        explain: "„-able“ yapılabilirlik bildirir; „manage“ son „e“sini korur.",
      },
      {
        kind: "gapfill",
        text: "The landlord's ___ came without any explanation. (refuse)",
        options: [],
        answer: 0,
        accept: ["refusal"],
        explain: "Fiilden isim: refuse → refusal.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["It is", "an", "irreversible", "decision"],
        explain: "Ünlüyle başlayan sıfattan önce „an“ gelir; „r“ önünde „ir-“.",
      },
      {
        kind: "truefalse",
        text: "„The landlord was unaware of the insurance.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "„aware“ sıfatının olumsuzu „un-“ ile kurulur: unaware.",
      },
      {
        kind: "truefalse",
        text: "„disreasonable“ — Bu sözcük „reasonable“ın doğru olumsuzu mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "Doğru biçim „unreasonable“dır; „dis-“ daha çok fiillerde kullanılır.",
      },
    ],
  },
];
