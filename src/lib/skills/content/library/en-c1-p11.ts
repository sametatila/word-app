import type { SkillExercise } from "../../types";

/**
 * EN · C1 — Beceriler kütüphanesi, parti 11.
 *
 * Hücreyi YİRMİYE tamamlayan on partinin (11–20) ilki. Kurallar ve emsal:
 * `en-c1.ts` (parti 1), `en-c1-p6` … `p10` ve `data/content/SPEC.md`.
 *
 * Parti 11 dikkat ve sessizlik hattı: konuşmaya açılan bir kütüphane,
 * restoran gürültüsü üzerine bir söyleşi, ortak çalışma alanına bir öneri
 * mektubu. Dil bilgisi öncül „it“ (extraposition) — It is worth …,
 * I find it odd that, I'd appreciate it if; parti 1'deki cleft'ten farklı.
 */
export const enC1P11: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-lib-r11",
    course: "en",
    level: "C1",
    skill: "reading",
    title: "The Library That Let People Talk",
    genre: "article",
    intro: "Bir makale: sessizlik kuralını zemin katta kaldıran bir kütüphane ve dört yıl sonra ortaya çıkan tablo.",
    gloss: [
      { de: "petition", tr: "dilekçe" },
      { de: "loyal", tr: "sadık" },
      { de: "to enforce", tr: "uygulatmak" },
      { de: "striking", tr: "dikkat çekici" },
      { de: "whisper", tr: "fısıltı" },
      { de: "dispute", tr: "anlaşmazlık" },
      { de: "request", tr: "istek" },
      { de: "concourse", tr: "istasyon holü" },
      { de: "telling", tr: "manidar" },
      { de: "signature", tr: "imza" },
      { de: "prediction", tr: "tahmin" },
      { de: "confident", tr: "emin" },
      { de: "to divide", tr: "bölmek" },
      { de: "record", tr: "kayıt" },
    ],
    minutes: 10,
    text:
      "The library that let people talk\n\n" +
      "When the central library in Harwick removed the “Silence please” signs from its ground floor " +
      "four years ago, it was widely assumed that the building would lose its most loyal users. " +
      "It is worth recalling how confident that prediction was. Letters to the local paper described " +
      "the decision as the end of the last quiet room in the city, and a petition against it collected " +
      "nearly three thousand signatures.\n\n" +
      "What actually happened is more interesting than either side expected. " +
      "Visits rose by about a quarter in the first year, almost entirely among people under thirty, " +
      "many of whom had never held a library card. The quiet readers did not disappear; " +
      "they moved upstairs, where the second floor was kept silent and, for the first time, " +
      "properly enforced.\n\n" +
      "The staff I spoke to found it striking that complaints about noise fell rather than rose. " +
      "Their explanation is simple. Under the old rule, silence was expected everywhere and achieved " +
      "nowhere, so every whisper became a dispute. Once the building was divided, people knew what " +
      "each floor was for, and it became far easier to ask somebody to be quiet, because the request " +
      "now pointed to a clear agreement rather than to a general mood.\n\n" +
      "It would be a mistake to present this as a success without cost. Some older users say the " +
      "ground floor now feels like a station concourse, and they no longer come in at all. " +
      "The library has no record of how many of them there are, since nobody counts the people " +
      "who stop arriving.\n\n" +
      "I find it telling that the most useful change was not the noise itself but the map. " +
      "A space that tries to serve everyone in the same way tends to serve nobody well. " +
      "It seems obvious once it has been said, and it took a petition, a vote and four years to say it.",
    questions: [
      {
        text: "What was widely predicted when the signs were removed?",
        options: [
          "Visits would double within a year.",
          "The library would lose its most loyal users.",
          "Staff would stop enforcing any rules.",
        ],
        answer: 1,
        explain: "„it was widely assumed that the building would lose its most loyal users“.",
      },
      {
        text: "Why did complaints about noise fall, according to the staff?",
        options: [
          "Most noisy visitors left after a year.",
          "New carpets absorbed the sound.",
          "Each floor had a clear, shared purpose.",
        ],
        answer: 2,
        explain: "Bina bölününce istek genel bir havaya değil, açık bir anlaşmaya dayanıyordu.",
      },
      {
        kind: "truefalse",
        text: "The quiet readers stopped using the library altogether.",
        options: ["True", "False"],
        answer: 1,
        explain: "Kaybolmadılar; sessizliğin gerçekten uygulandığı ikinci kata çıktılar.",
      },
      {
        kind: "gapfill",
        text: "In the first year, visits rose by about a ___.",
        options: [],
        answer: 0,
        accept: ["quarter"],
        explain: "„Visits rose by about a quarter in the first year“.",
      },
      {
        kind: "short_answer",
        text: "Where did the quiet readers move to?",
        options: [],
        answer: 0,
        accept: ["upstairs", "the second floor", "to the second floor"],
        explain: "„they moved upstairs, where the second floor was kept silent“.",
      },
      {
        text: "What does the writer consider the most useful change?",
        options: [
          "dividing the building by purpose",
          "allowing talk on every floor",
          "counting the users who left",
        ],
        answer: 0,
        explain: "„not the noise itself but the map“ — her katın ne için olduğunun belli olması.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-lib-l11",
    course: "en",
    level: "C1",
    skill: "listening",
    title: "Why Restaurants Got Louder",
    genre: "interview",
    intro: "Bir akustik uzmanıyla söyleşi: restoranlar neden gürültülü, bedelini kim ödüyor, ilk ne değişmeli.",
    gloss: [
      { de: "impression", tr: "izlenim" },
      { de: "accurate", tr: "hatasız" },
      { de: "decibel", tr: "desibel" },
      { de: "surface", tr: "yüzey" },
      { de: "curtain", tr: "perde" },
      { de: "tablecloth", tr: "masa örtüsü" },
      { de: "sensible", tr: "mantıklı" },
      { de: "hearing aid", tr: "işitme cihazı" },
      { de: "ceiling", tr: "tavan" },
      { de: "to survey", tr: "incelemek" },
      { de: "to redesign", tr: "yeniden tasarlamak" },
    ],
    minutes: 10,
    segments: [
      { speaker: "Host", text: "Restaurants have become noticeably louder over the last twenty years. You measure them for a living. Is that impression actually accurate?" },
      { speaker: "Ms Varga", text: "It is. In the places we survey, the average level at eight in the evening has risen by roughly eight decibels, which the ear hears as close to twice as loud." },
      { speaker: "Host", text: "Why? Nobody sets out to build a noisy room." },
      { speaker: "Ms Varga", text: "Nobody decides it, which is the point. Carpets, curtains and tablecloths went because hard surfaces look modern and are easier to clean. Each choice was sensible. Together they produced a room that returns every sound." },
      { speaker: "Host", text: "And the owners don't mind?" },
      { speaker: "Ms Varga", text: "Some prefer it. A loud room feels busy, and people eat faster when they can't hear each other. It's hard to prove that anyone plans for that, but I've heard it said openly more than once." },
      { speaker: "Host", text: "Who pays the price?" },
      { speaker: "Ms Varga", text: "Anyone with a hearing aid, anyone over sixty, and anyone trying to have a serious conversation. They don't complain. They simply stop coming, so they never appear in the owner's figures." },
      { speaker: "Host", text: "What would you change first?" },
      { speaker: "Ms Varga", text: "The ceiling. It's the largest surface nobody touches, and treating it costs less than a new coffee machine. It makes no sense to redesign the menu before fixing the room." },
    ],
    questions: [
      {
        text: "How, according to Ms Varga, did rooms become so loud?",
        options: [
          "Owners asked designers for louder rooms.",
          "Regulations required hard surfaces.",
          "No single person ever decided it.",
        ],
        answer: 2,
        explain: "Her seçim tek başına mantıklıydı; birlikte her sesi geri veren bir oda çıktı.",
      },
      {
        kind: "truefalse",
        text: "Ms Varga has heard the idea of a deliberately loud room discussed openly.",
        options: ["True", "False"],
        answer: 0,
        explain: "„I've heard it said openly more than once“ — kanıtlamanın zor olduğunu da ekliyor.",
      },
      {
        kind: "gapfill",
        text: "At eight in the evening, the average level has risen by roughly ___ decibels.",
        options: [],
        answer: 0,
        accept: ["eight", "8"],
        explain: "„risen by roughly eight decibels“ — kulağa neredeyse iki kat yüksek gelen bir fark.",
      },
      {
        kind: "short_answer",
        text: "What would Ms Varga change first?",
        options: [],
        answer: 0,
        accept: ["the ceiling", "ceiling"],
        explain: "Kimsenin dokunmadığı en büyük yüzey ve yeni bir kahve makinesinden ucuz.",
      },
      {
        text: "Why do the affected guests never appear in the owner's figures?",
        options: [
          "They stop coming instead of complaining.",
          "They are never asked for feedback.",
          "They mostly visit at lunchtime.",
        ],
        answer: 0,
        explain: "„They don't complain. They simply stop coming“.",
      },
      {
        text: "Which effect of a loud room might some owners welcome?",
        options: ["Guests leave larger tips.", "People eat faster.", "Staff talk less."],
        answer: 1,
        explain: "„people eat faster when they can't hear each other“.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-lib-w11",
    course: "en",
    level: "C1",
    skill: "writing",
    title: "A Proposal for Quiet Hours",
    genre: "letter",
    intro: "Ortak bir çalışma alanının yöneticisine yazıyorsun: önce iki cümle kur, sonra somut ve ölçülü bir öneri mektubu yaz.",
    gloss: [
      { de: "booth", tr: "kabin" },
      { de: "headphones", tr: "kulaklık" },
      { de: "to tolerate", tr: "katlanmak" },
      { de: "to concentrate", tr: "konsantre olmak" },
      { de: "trial", tr: "deneme" },
      { de: "realistic", tr: "gerçekçi" },
    ],
    minutes: 16,
    tasks: [
      {
        kind: "build",
        tr: "Toplantıdan önce kuralı yazılı olarak açıklarsanız memnun olurum.",
        answer: "I would appreciate it if you could explain the rule in writing before the meeting.",
        alternatives: ["Before the meeting, I would appreciate it if you could explain the rule in writing."],
        hint: "„appreciate it if“: „it“ arkadan gelen if-cümlesini önceden gösterir ve atlanamaz.",
      },
      {
        kind: "build",
        tr: "Açık bir ofiste herkesten sessizlik beklemek gerçekçi değil.",
        answer: "It is not realistic to expect silence from everyone in an open office.",
        alternatives: ["In an open office, it is not realistic to expect silence from everyone."],
        hint: "Uzun bir mastar öbeği özne olunca başa „It“ konur ve öbek cümlenin sonuna atılır.",
      },
      {
        kind: "free",
        prompt:
          "Ortak çalışma alanının yöneticisine bir öneri mektubu yaz: sorunu somut olarak anlat, kimsenin kötü niyetli olmadığını kabul et, basit bir düzen öner, deneme süresi ve ölçüt koy ve nazik bir kapanış yap.",
        checklist: [
          "Sorunu somut bir örnekle anlat",
          "Kimseyi suçlamadan kabul ettiğin noktayı söyle",
          "Basit ve uygulanabilir bir düzen öner",
          "Bir deneme süresi ve başarı ölçütü koy",
        ],
        minWords: 160,
        phrases: [
          { de: "I am writing to suggest a small change to …", tr: "… konusunda küçük bir değişiklik önermek için yazıyorum", en: "" },
          { de: "It is worth saying at the outset that …", tr: "Baştan şunu söylemekte yarar var: …", en: "" },
          { de: "I find it hard to … when …", tr: "… olduğunda … zorlanıyorum", en: "" },
          { de: "What I would propose is …", tr: "Önereceğim şey …", en: "" },
          { de: "I would appreciate it if we could review this after …", tr: "Bunu … sonra gözden geçirebilirsek memnun olurum", en: "" },
        ],
        sample:
          "Dear Ms Lindqvist,\n\n" +
          "I am writing to suggest a small change to how the second floor is used. " +
          "It is worth saying at the outset that nobody here is behaving badly. " +
          "The problem is that the room is asked to do two jobs at once: it is where people take calls " +
          "and where people write, and the two cannot share a table without one of them losing.\n\n" +
          "On an ordinary Tuesday I counted eleven calls at the long desk between ten and twelve. " +
          "I find it hard to concentrate on anything longer than an email when that happens, " +
          "and I know from conversations in the kitchen that I am not the only one. " +
          "Headphones help, but it seems unfair that the quieter use should be the one that pays for the " +
          "equipment.\n\n" +
          "What I would propose is simple. The long desk becomes a quiet area from nine to one, calls move " +
          "to the two booths and the corridor during those hours, and the afternoon stays as it is. " +
          "Nothing needs to be bought, and anyone who prefers the old arrangement still has half of every day.\n\n" +
          "I would appreciate it if we could run this as a four-week trial and review it after that, " +
          "using one question only: did anyone who used to work here stop coming?\n\n" +
          "With best wishes,\nOmar Haddad",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-c1-lib-s11",
    course: "en",
    level: "C1",
    skill: "speaking",
    title: "Should Quiet Be Protected in Public Spaces?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: sessizliğin kamusal bir değer olup olmadığını tart ve bir düzen öner.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Kamusal alanlarda sessizlik korunmalı mı? Konumunu söyle, sessizliğin kime yaradığını ve kime yük olduğunu adlandır, bir düzen öner ve önerinin zayıf yanını kabul et.",
      bulletsTr: [
        "Konumunu tek cümleyle söyle",
        "Sessizliğin kime yaradığını ve kime yük olduğunu adlandır",
        "Uygulanabilir bir düzen öner",
        "Önerinin zayıf yanını kabul et",
      ],
      targets: [
        { de: "It seems to me that the question is badly framed.", tr: "Bana öyle geliyor ki soru kötü kurulmuş." },
        { de: "It is worth asking who pays for …", tr: "… bedelini kimin ödediğini sormakta yarar var" },
        { de: "What I would suggest instead is …", tr: "Bunun yerine önereceğim şey …" },
        { de: "I find it hard to defend … when …", tr: "… olduğunda …'i savunmakta zorlanıyorum" },
      ],
      minSeconds: 60,
      maxSeconds: 100,
      sampleDe:
        "It seems to me that the question is badly framed. Asking whether quiet should be protected " +
        "makes it sound like a private taste, like a preference for tea over coffee, when in fact it is a " +
        "condition that some activities simply cannot happen without. " +
        "Reading, recovering from illness, thinking through a difficult letter: none of these can be done " +
        "in a room that returns every sound. " +
        "It is worth asking who pays for noise, though, because it is rarely the people making it. " +
        "A loud café costs its owner nothing and costs a person with a hearing aid the whole evening. " +
        "What I would suggest instead of a general rule is a map: some places, or some hours, where quiet " +
        "is the stated purpose and is actually enforced, and the rest left alone. " +
        "That way nobody is asked to whisper in a station, and nobody is asked to concentrate in one either. " +
        "I find it hard to defend my own position in one respect. A map works in a library or a train, where " +
        "somebody is in charge of the space. It does very little for a street or a park, which is exactly " +
        "where people with no other choice spend their time.",
      rubricHint:
        "Konum, yararlanan ile yük taşıyanın ayrımı, somut bir düzen ve zayıf yanın kabulü beklenir; „It is worth asking“, „I find it hard to“ gibi öncül it yapıları kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-c1-lib-g11",
    course: "en",
    level: "C1",
    skill: "grammar",
    title: "it is worth noting that",
    genre: "grammar",
    intro: "Uzun bir özne ya da nesne cümlenin başına sığmayınca yerini „it“ tutar, asıl bilgi sona gider.",
    focus: "Yer tutucu it (extraposition): It is worth …, I find it odd that, I'd appreciate it if — cleft değil",
    gloss: [
      { de: "to appreciate", tr: "takdir etmek" },
      { de: "odd", tr: "tuhaf" },
      { de: "worth", tr: "değer" },
      { de: "to recall", tr: "hatırlamak" },
    ],
    minutes: 12,
    explanation: [
      {
        heading: "Özne uzunsa it başa geçer",
        tr: "İngilizce uzun bir özneyi cümlenin başında sevmez. Mastar öbeği ya da „that“ cümlesi özne olduğunda başa boş bir „It“ konur ve asıl özne sona gider: „To expect silence is unrealistic“ doğrudur ama ağırdır; „It is unrealistic to expect silence“ doğal olandır. „It was the wording that …“ gibi cleft yapısıyla karıştırılmamalı: cleft bir öğeyi vurgular, burada „it“ yalnız yer tutar.",
        examples: [
          { de: "It is unrealistic to expect silence everywhere.", tr: "Her yerde sessizlik beklemek gerçekçi değil.", note: "mastar öbeği sonda" },
          { de: "It was widely assumed that the plan would fail.", tr: "Planın başarısız olacağı yaygın biçimde varsayılıyordu.", note: "that cümlesi sonda" },
          { de: "It doesn't matter who made the decision.", tr: "Kararı kimin verdiği önemli değil.", note: "wh-cümlesi sonda" },
        ],
      },
      {
        heading: "Nesne olarak it: find it, make it, appreciate it",
        tr: "Aynı iş nesne konumunda da yapılır. „find/make/consider + it + sıfat + that/to“ kalıbında „it“ zorunludur: „I find odd that …“ yanlıştır, „I find it odd that …“ doğrudur. „I'd appreciate it if …“ ve „I hate it when …“ kalıplarında da „it“ arkadan gelen cümleyi haber verir ve düşürülmez.",
        examples: [
          { de: "I find it odd that nobody complained.", tr: "Kimsenin şikâyet etmemesini tuhaf buluyorum.", note: "find it + sıfat + that" },
          { de: "The new layout made it easier to ask for quiet.", tr: "Yeni düzen sessizlik istemeyi kolaylaştırdı.", note: "make it + sıfat + to" },
          { de: "I'd appreciate it if you could reply by Friday.", tr: "Cuma gününe kadar cevap verirseniz memnun olurum.", note: "appreciate it if" },
        ],
      },
      {
        heading: "Sabit kalıplar: worth, no use, no point",
        tr: "Bazı kalıplar bu yapıyla ezberlenir ve arkalarından -ing gelir: „It is worth recalling …“, „It's no use complaining …“, „There's no point (in) arguing …“. „It seems/appears that …“ ve „It turns out that …“ ise iddiayı konuşandan uzaklaştırır ve resmî metinde sık görülür.",
        examples: [
          { de: "It is worth recalling how confident everyone was.", tr: "Herkesin ne kadar emin olduğunu hatırlamakta yarar var.", note: "worth + -ing" },
          { de: "It's no use complaining after the vote.", tr: "Oylamadan sonra şikâyet etmenin faydası yok.", note: "no use + -ing" },
          { de: "It turns out that the figures were wrong.", tr: "Rakamların yanlış olduğu ortaya çıktı.", note: "turns out that" },
        ],
      },
    ],
    questions: [
      {
        text: "Which sentence is the most natural?",
        options: [
          "It is unrealistic to expect silence everywhere.",
          "To expect silence everywhere it is unrealistic.",
          "Is unrealistic to expect silence everywhere.",
        ],
        answer: 0,
        explain: "Mastar öbeği sona gider, başta boş „It“ durur; iki özne birden olmaz.",
      },
      {
        text: "I find ___ odd that nobody complained.",
        options: ["that", "it", "this"],
        answer: 1,
        explain: "„find it + sıfat + that“ kalıbında „it“ zorunludur.",
      },
      {
        text: "It is worth ___ how confident everyone was.",
        options: ["to recall", "recall", "recalling"],
        answer: 2,
        explain: "„It is worth“ arkasından -ing alır.",
      },
      {
        kind: "gapfill",
        text: "I'd appreciate ___ if you could reply by Friday.",
        options: [],
        answer: 0,
        accept: ["it"],
        explain: "„appreciate it if“ kalıbında „it“ arkadan gelen cümleyi haber verir.",
      },
      {
        kind: "gapfill",
        text: "It's no use ___ after the vote. (complain)",
        options: [],
        answer: 0,
        accept: ["complaining"],
        explain: "„It's no use“ kalıbından sonra -ing gelir.",
      },
      {
        kind: "gapfill",
        text: "___ turns out that the figures were wrong.",
        options: [],
        answer: 0,
        accept: ["It", "it"],
        explain: "„It turns out that“ bilgiyi sona atar ve iddiayı konuşandan uzaklaştırır.",
      },
      {
        kind: "gapfill",
        text: "The new layout made ___ easier to ask for quiet.",
        options: [],
        answer: 0,
        accept: ["it"],
        explain: "„make it + sıfat + to“: nesne konumunda da „it“ yer tutar.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["It", "doesn't matter", "who", "made the decision"],
        explain: "Boş „It“ başta, wh-cümlesi sonda.",
      },
      {
        kind: "truefalse",
        text: "“I find odd that nobody complained.” — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„it“ eksik: „I find it odd that nobody complained.“",
      },
      {
        kind: "truefalse",
        text: "“It was widely assumed that the plan would fail.” — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "„that“ cümlesi sona atılmış, başta yer tutan „It“ var.",
      },
    ],
  },
];
