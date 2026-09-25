import type { SkillExercise } from "../../types";

/**
 * EN · C1 — Beceriler kütüphanesi, parti 15.
 *
 * Hücreyi YİRMİYE tamamlayan on partiden biri. Kurallar ve emsal:
 * `en-c1.ts` (parti 1), `en-c1-p6` … `p10` ve `data/content/SPEC.md`.
 *
 * Parti 15 ortak yaşam hattı: beş yılını dolduran bir ortak konut projesi,
 * bir mimarla bir sosyoloğun yalnızlık tartışması, ortak konuta taşınmayı
 * düşünen bir arkadaşa e-posta. Dil bilgisi vurgu için öne alma — Gone are
 * the days, Such was …, Much as …, Try as they might; parti 1'deki olumsuz
 * zarf devriğinden farklı olarak öne çıkan yüklem ya da ödün.
 */
export const enC1P15: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-lib-r15",
    course: "en",
    level: "C1",
    skill: "reading",
    title: "Linden Yard, Five Years On",
    genre: "article",
    intro: "Bir makale: yirmi üç hanenin paylaştığı bir konut projesi beş yıl sonra neyi başardı, neyi başaramadı.",
    gloss: [
      { de: "household", tr: "hane" },
      { de: "brochure", tr: "broşür" },
      { de: "durable", tr: "dayanıklı" },
      { de: "workshop", tr: "atölye" },
      { de: "laundry", tr: "çamaşırhane" },
      { de: "comparable", tr: "benzer" },
      { de: "seldom", tr: "nadiren" },
      { de: "to attend", tr: "katılmak" },
      { de: "loneliness", tr: "yalnızlık" },
      { de: "survey", tr: "anket" },
      { de: "average", tr: "ortalama" },
      { de: "acquaintance", tr: "tanışıklık" },
      { de: "to settle", tr: "karara bağlamak" },
      { de: "modest", tr: "mütevazı" },
    ],
    minutes: 10,
    text:
      "Linden Yard, five years on\n\n" +
      "When twenty-three households moved into Linden Yard, the shared-housing project on the edge of the " +
      "old railway land, the brochure promised “private homes, shared lives”. Five years later, residents " +
      "describe something both smaller and more durable than the brochure imagined.\n\n" +
      "Each household has its own flat, kitchen and front door. What is shared is a large dining room, " +
      "a workshop, a guest room and a laundry, together with a meal cooked by a rota of residents three " +
      "evenings a week. The flats are about fifteen per cent smaller than comparable ones nearby, and the " +
      "shared rooms are supposed to make up the difference.\n\n" +
      "Whether they do depends on whom you ask. The more a household uses the common rooms, the less it " +
      "seems to miss the space; families with young children, who eat at the shared table most weeks, " +
      "rarely mention size at all. Two retired residents who seldom attend meals told me their flats feel " +
      "nowhere near as large as the ones they left.\n\n" +
      "The project's clearest success is one nobody planned for. Residents report knowing roughly three " +
      "times as many neighbours by name as they did in their previous homes, and loneliness, measured by a " +
      "short annual survey, is far lower than the city average. The shared laundry, which was nearly cut " +
      "from the plans to save money, turns out to be the room where most of those acquaintances begin.\n\n" +
      "The difficulties are just as real. Meetings are long, decisions are slow, and a disagreement about a " +
      "dog two years ago took eight months to settle. “It is every bit as political as people fear,” one " +
      "resident said, “but the politics happens between people who will see each other at breakfast.”\n\n" +
      "For anyone considering the model, the lesson may be a modest one: sharing works best where it is " +
      "chosen, not assumed.",
    questions: [
      {
        text: "What does each household have to itself?",
        options: [
          "a dining room and a laundry",
          "a workshop and a guest room",
          "its own flat, kitchen and front door",
        ],
        answer: 2,
        explain: "„Each household has its own flat, kitchen and front door.“ — gerisi ortak.",
      },
      {
        text: "Which households seem to miss the space least?",
        options: [
          "households with retired members",
          "those that use the common rooms most",
          "households without young children",
        ],
        answer: 1,
        explain: "„The more a household uses the common rooms, the less it seems to miss the space“.",
      },
      {
        kind: "truefalse",
        text: "The shared laundry was part of the plans from the start without any debate.",
        options: ["True", "False"],
        answer: 1,
        explain: "Tasarruf etmek için neredeyse planlardan çıkarılıyordu; tanışıklıkların çoğu orada başlıyor.",
      },
      {
        kind: "gapfill",
        text: "The flats are about ___ per cent smaller than comparable ones nearby.",
        options: [],
        answer: 0,
        accept: ["fifteen", "15"],
        explain: "„about fifteen per cent smaller than comparable ones nearby“.",
      },
      {
        kind: "short_answer",
        text: "How long did the disagreement about a dog take to settle?",
        options: [],
        answer: 0,
        accept: ["eight months", "8 months"],
        explain: "„a disagreement about a dog two years ago took eight months to settle“.",
      },
      {
        text: "What lesson does the writer draw?",
        options: [
          "Sharing works best where it is chosen.",
          "Shared flats should be larger.",
          "Meetings should be held less often.",
        ],
        answer: 0,
        explain: "„sharing works best where it is chosen, not assumed“.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-lib-l15",
    course: "en",
    level: "C1",
    skill: "listening",
    title: "Can a Building Make Friends?",
    genre: "opinion",
    intro: "Bir mimar ile bir sosyolog tartışıyor: ortak konut yalnızlığı azaltıyor mu, yoksa zaten sosyal olanları mı topluyor?",
    gloss: [
      { de: "cure", tr: "çare" },
      { de: "cautiously", tr: "temkinli" },
      { de: "contact", tr: "temas" },
      { de: "evidence", tr: "kanıt" },
      { de: "sociable", tr: "sokulgan" },
      { de: "to flatter", tr: "olduğundan iyi göstermek" },
      { de: "objection", tr: "itiraz" },
      { de: "route", tr: "güzergâh" },
      { de: "basement", tr: "bodrum" },
      { de: "intervention", tr: "müdahale" },
      { de: "to collect", tr: "almak" },
    ],
    minutes: 10,
    segments: [
      { speaker: "Ms Ferrand", text: "Shared housing is often sold as a cure for loneliness. As someone who designs it, I'd put it more cautiously: it makes contact cheaper, which isn't the same as making it happen." },
      { speaker: "Mr Osei", text: "I agree with the distinction, but the evidence is stronger than you're allowing. In the schemes we studied, residents had twice as many weekly conversations as similar people in ordinary flats." },
      { speaker: "Ms Ferrand", text: "Similar on paper. The people who choose to live like this are far more sociable to begin with. The comparison flatters the building." },
      { speaker: "Mr Osei", text: "That's the standard objection, and it's partly fair. So we also followed people who moved in for practical reasons, mainly cost. The effect was smaller, but it was still there." },
      { speaker: "Ms Ferrand", text: "How much smaller?" },
      { speaker: "Mr Osei", text: "Roughly half. Nowhere near as dramatic as the brochures, but a good deal more than nothing." },
      { speaker: "Mr Osei", text: "And it took longer to appear. In the first year there was almost no difference at all; the gap opened in the second, once people had stopped thinking of themselves as newcomers." },
      { speaker: "Ms Ferrand", text: "Then here's where design matters. The effect depends almost entirely on routes. If the laundry and the post boxes sit on the way to every front door, people meet. Put them in a basement and they don't." },
      { speaker: "Mr Osei", text: "Which suggests the cheapest intervention isn't the shared kitchen everyone photographs." },
      { speaker: "Ms Ferrand", text: "Exactly. The more ordinary the shared room, the more it gets used. Nobody needs a reason to collect their post." },
    ],
    questions: [
      {
        text: "How does Ms Ferrand describe what shared housing does?",
        options: [
          "It makes contact cheaper.",
          "It cures loneliness.",
          "It reduces rents.",
        ],
        answer: 0,
        explain: "Teması ucuzlatıyor; bu, teması gerçekleştirmekle aynı şey değil.",
      },
      {
        text: "Why does Ms Ferrand doubt the comparison?",
        options: [
          "The sample of schemes was far too small.",
          "The study lasted only a few months.",
          "Residents are more sociable to begin with.",
        ],
        answer: 2,
        explain: "„The people who choose to live like this are far more sociable to begin with.“",
      },
      {
        kind: "truefalse",
        text: "Mr Osei admits that the standard objection is partly fair.",
        options: ["True", "False"],
        answer: 0,
        explain: "„That's the standard objection, and it's partly fair.“",
      },
      {
        kind: "gapfill",
        text: "Residents had ___ as many weekly conversations as similar people in ordinary flats.",
        options: [],
        answer: 0,
        accept: ["twice"],
        explain: "„twice as many weekly conversations as similar people in ordinary flats“.",
      },
      {
        kind: "short_answer",
        text: "What does the effect depend on almost entirely, according to Ms Ferrand?",
        options: [],
        answer: 0,
        accept: ["routes", "the routes"],
        explain: "Çamaşırhane ve posta kutuları her kapının yolundaysa insanlar karşılaşıyor.",
      },
      {
        text: "Which shared room gets used most, according to the end of the discussion?",
        options: [
          "the one with the best view",
          "the most ordinary one",
          "the largest kitchen",
        ],
        answer: 1,
        explain: "„The more ordinary the shared room, the more it gets used.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-lib-w15",
    course: "en",
    level: "C1",
    skill: "writing",
    title: "Before You Move In",
    genre: "personal",
    intro: "Ortak bir konut projesine taşınmayı düşünen bir arkadaşına yazıyorsun: önce iki cümle kur, sonra dürüst ve dengeli bir e-posta yaz.",
    gloss: [
      { de: "spacious", tr: "ferah" },
      { de: "rota", tr: "nöbet çizelgesi" },
      { de: "to tolerate", tr: "katlanmak" },
      { de: "privacy", tr: "mahremiyet" },
      { de: "compromise", tr: "uzlaşma" },
      { de: "lonely", tr: "yalnız" },
    ],
    minutes: 16,
    tasks: [
      {
        kind: "build",
        tr: "Pratikte daireler hiç de sandığım kadar küçük değil.",
        answer: "In practice, the flats are nowhere near as small as I had expected.",
        alternatives: ["The flats are nowhere near as small as I had expected in practice."],
        hint: "„nowhere near as … as“ „hiç de … değil“ anlamında güçlü bir olumsuz karşılaştırmadır.",
      },
      {
        kind: "build",
        tr: "Deneyimime göre ortak odaları ne kadar çok kullanırsan alanı o kadar az özlüyorsun.",
        answer: "In my experience, the more you use the shared rooms, the less you miss the space.",
        alternatives: ["The more you use the shared rooms, the less you miss the space in my experience."],
        hint: "„The more …, the less …“: iki karşılaştırmalı öbek de „the“ ile başlar ve virgülle ayrılır.",
      },
      {
        kind: "free",
        prompt:
          "Ortak konuta taşınmayı düşünen bir arkadaşına e-posta yaz: kendi deneyiminden bir iyi ve bir zor yanı somut olarak anlat, kimin için iyi işlediğini söyle, taşınmadan önce sorması gereken iki soruyu yaz ve samimi bir kapanış yap.",
        checklist: [
          "Bir iyi ve bir zor yanı somut olarak anlat",
          "Kimin için iyi işlediğini söyle",
          "Taşınmadan önce sorulacak iki soruyu yaz",
          "Samimi bir kapanış yap",
        ],
        minWords: 160,
        phrases: [
          { de: "You asked me whether I'd do it again.", tr: "Yeniden yapar mıydım diye sormuştun.", en: "" },
          { de: "It is every bit as … as people say, but …", tr: "İnsanların dediği kadar …, ama …", en: "" },
          { de: "The more …, the more …", tr: "Ne kadar çok …, o kadar çok …", en: "" },
          { de: "Before you sign anything, ask them …", tr: "Bir şey imzalamadan önce onlara … diye sor", en: "" },
          { de: "Come for a meal first and see for yourself.", tr: "Önce bir yemeğe gel, kendin gör.", en: "" },
        ],
        sample:
          "Dear Hana,\n\n" +
          "You asked me whether I'd do it again, and the short answer is yes, with two conditions.\n\n" +
          "The good part first. In practice, the flats are nowhere near as small as I had expected, because " +
          "I hardly use half of mine. I cook at the shared table twice a week, I borrow tools from the " +
          "workshop instead of owning them, and I know more of my neighbours than I did in ten years in my " +
          "old building. The more you take part, the more the place gives back.\n\n" +
          "The hard part is the meetings. It is every bit as slow as people say, and some weeks it feels as if " +
          "every decision about a doormat needs a vote. If you are somebody who wants a problem solved by " +
          "Friday, you will find it far more frustrating than I do.\n\n" +
          "It works best for people who actually want the shared life and not just the lower rent. " +
          "Before you sign anything, ask them two questions: how often does the cooking rota fail, and what " +
          "happened the last time two residents seriously disagreed? The answers will tell you more than the " +
          "brochure.\n\n" +
          "Come for a meal first and see for yourself. Thursday is my turn to cook, so I can promise it will be " +
          "edible.\n\nLove,\nMira",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-c1-lib-s15",
    course: "en",
    level: "C1",
    skill: "speaking",
    title: "Is Shared Living an Answer to Loneliness?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: ortak yaşamın yalnızlığa etkisini tart ve kanıtın sınırını söyle.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Ortak yaşam yalnızlığa bir çare mi? Konumunu söyle, lehte en güçlü kanıtı ya da örneği ver, bu kanıtın neden olduğundan güçlü görünebileceğini açıkla ve kimler için işe yarayacağını söyle.",
      bulletsTr: [
        "Konumunu tek cümleyle söyle",
        "Lehte en güçlü örneği ver",
        "Kanıtın neden olduğundan güçlü görünebileceğini açıkla",
        "Kimler için işe yarayacağını söyle",
      ],
      targets: [
        { de: "It helps, but nowhere near as much as its supporters claim.", tr: "İşe yarıyor ama savunucularının iddia ettiği kadar değil." },
        { de: "The strongest case for it is …", tr: "Lehindeki en güçlü gerekçe …" },
        { de: "The comparison is flattering because …", tr: "Karşılaştırma olduğundan iyi gösteriyor, çünkü …" },
        { de: "The more …, the more likely it is that …", tr: "Ne kadar …, … olasılığı o kadar yüksek" },
      ],
      minSeconds: 60,
      maxSeconds: 100,
      sampleDe:
        "It helps, but nowhere near as much as its supporters claim, and the reason matters more than the " +
        "size of the effect. " +
        "The strongest case for it is simple and practical: loneliness is partly a problem of cost. " +
        "Meeting someone usually requires a plan, a place and a reason, and shared housing removes all three. " +
        "You see the same people at the post boxes every morning whether you meant to or not. " +
        "The comparison is flattering, though, because those who sign up for this kind of life tend to be " +
        "unusually sociable before they ever arrive. Comparing them with their old neighbours tells you about " +
        "the kind of person who signs up, not only about the building. " +
        "Where the model seems to work is for people who are lonely by circumstance rather than by " +
        "temperament: someone new to a city, a parent at home with small children, a widower whose friends " +
        "have moved away. " +
        "The more ordinary the shared spaces, the more likely it is that those people will actually use them. " +
        "What it cannot do is make a withdrawn person want company, and I think we should stop selling it as " +
        "if it could.",
      rubricHint:
        "Ölçülü bir konum, lehte kanıt, kanıtın sınırı ve hedef grubun belirlenmesi beklenir; „nowhere near as“, „the more …, the more …“ gibi ileri karşılaştırma yapıları kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-c1-lib-g15",
    course: "en",
    level: "C1",
    skill: "grammar",
    title: "Gone are the days, much as I like it",
    genre: "grammar",
    intro: "Cümlenin başı en güçlü yerdir; İngilizce bazen bir yüklemi ya da bir ödünü oraya taşır ve sözcük sırası buna göre değişir.",
    focus: "Vurgu için öne alma (fronting): Gone are the days, Such was …, Much as …, Try as they might, sıfat + as + özne — olumsuz zarflı devrikten (Hardly had we …) farklı: öne çıkan yüklem ya da ödün",
    gloss: [
      { de: "laundry", tr: "çamaşırhane" },
      { de: "demand", tr: "talep" },
      { de: "waiting list", tr: "bekleme listesi" },
      { de: "to admire", tr: "hayran olmak" },
    ],
    minutes: 12,
    explanation: [
      {
        heading: "Yüklemi öne almak: Gone are the days, Such was",
        tr: "Durum bildiren bir yüklem başa alınınca fiil özneden önce gelir: „The days when … are gone“ yerine „Gone are the days when …“. „Such“ ile „be“ bir şeyin derecesini başa taşır, sonucu „that“ verir: „Such was the demand that …“. Bir yer öbeği de aynı sırayı kurabilir: „At the centre of the yard stands …“. Bu yapılar yazıda ve konuşmalarda vurgu içindir; gündelik sohbette yapay durabilir.",
        examples: [
          { de: "Gone are the days when neighbours met by accident.", tr: "Komşuların birbiriyle tesadüfen karşılaştığı günler geride kaldı.", note: "yüklem + be + özne" },
          { de: "Such was the demand that the waiting list closed.", tr: "Talep öyle büyüktü ki bekleme listesi kapandı.", note: "such + be + özne + that" },
          { de: "At the centre of the yard stands the old laundry.", tr: "Avlunun ortasında eski çamaşırhane duruyor.", note: "yer öbeği + fiil + özne" },
        ],
      },
      {
        heading: "Ödünü öne almak: Much as, Try as they might",
        tr: "„Much as I admire the project, …“ „projeye çok hayran olsam da“ demektir; ödünü başa koyar, asıl savı ikinci yarıya bırakır. „Try as they might, …“ „ne kadar uğraşsalar da“ anlamındadır ve kalıplaşmıştır. Bir sıfat da „as“ ya da „though“ ile başa alınabilir: „Small as the flats are, …“ = „Although the flats are small, …“.",
        examples: [
          { de: "Much as I admire the project, I could not live there.", tr: "Projeye ne kadar hayran olsam da orada yaşayamazdım.", note: "much as = although … very much" },
          { de: "Try as they might, they could not shorten the meetings.", tr: "Ne kadar uğraştılarsa da toplantıları kısaltamadılar.", note: "kalıp" },
          { de: "Small as the flats are, nobody has moved out.", tr: "Daireler küçük olsa da kimse taşınmadı.", note: "sıfat + as + özne + fiil" },
        ],
      },
      {
        heading: "Devrikten farkı",
        tr: "„Hardly had we …“ gibi olumsuz zarflı devrikte yardımcı fiil öne geçer. Ödün yapılarında ise sıra değişmez: „Much as I like it“, „Strange as it may seem“ özne + fiil diye sürer. Yalnız „Gone are“, „Such was“ ve yer öbeğiyle başlayan cümlelerde ana fiil öznenin önüne geçer; özne bir zamirse bu da olmaz: „Here it is“, „Here is it“ değil.",
        examples: [
          { de: "Hardly had we moved in when the first meeting began.", tr: "Daha taşınır taşınmaz ilk toplantı başladı.", note: "olumsuz zarf + yardımcı fiil" },
          { de: "Strange as it may seem, the laundry made us friends.", tr: "Tuhaf görünse de bizi çamaşırhane arkadaş yaptı.", note: "sıfat + as: devrik yok" },
          { de: "On the top floor is a guest room.", tr: "En üst katta bir misafir odası var.", note: "yer öbeği + be + özne" },
        ],
      },
    ],
    questions: [
      {
        text: "___ are the days when every flat came with a garden.",
        options: ["Gone", "Went", "Going"],
        answer: 0,
        explain: "Başa alınan yüklem üçüncü hâldir: „Gone are the days“.",
      },
      {
        text: "___ as I admire the project, I could not live there.",
        options: ["Many", "So", "Much"],
        answer: 2,
        explain: "„Much as“ ödün bildirir: çok hayran olsam da.",
      },
      {
        text: "Which sentence is correct?",
        options: [
          "Small as are the flats, nobody has left.",
          "Small as the flats are, nobody has left.",
          "As small the flats are, nobody has left.",
        ],
        answer: 1,
        explain: "Sıfat + as + özne + fiil; ödün yapısında yardımcı fiil öne geçmez.",
      },
      {
        kind: "gapfill",
        text: "Try as they ___, they could not shorten the meetings.",
        options: [],
        answer: 0,
        accept: ["might"],
        explain: "Kalıp „Try as they might“: ne kadar uğraşsalar da.",
      },
      {
        kind: "gapfill",
        text: "___ was the demand that the waiting list closed within a week.",
        options: [],
        answer: 0,
        accept: ["Such", "such"],
        explain: "„Such was …, that …“ derecesi başa alır, sonucu „that“ verir.",
      },
      {
        kind: "gapfill",
        text: "At the centre of the yard ___ the old laundry. (stand)",
        options: [],
        answer: 0,
        accept: ["stands"],
        explain: "Yer öbeği başta, ardından fiil ve özne; özne tekil olduğu için „stands“.",
      },
      {
        kind: "gapfill",
        text: "Strange ___ it may seem, the laundry made us friends.",
        options: [],
        answer: 0,
        accept: ["as", "though"],
        explain: "Sıfat + as/though + özne ödün bildirir.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Gone are", "the days", "when neighbours met", "by accident"],
        explain: "Başa alınan yüklem, ardından fiil ve özne.",
      },
      {
        kind: "truefalse",
        text: "“Small as are the flats, nobody has left.” — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "Ödün yapısında sıra değişmez: „Small as the flats are“.",
      },
      {
        kind: "truefalse",
        text: "“Such was the demand that the list closed.” ile “The demand was so great that the list closed.” aynı anlamdadır.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Such was“ aynı sonucu vurguyla, dereceyi başa alarak söyler.",
      },
    ],
  },
];
