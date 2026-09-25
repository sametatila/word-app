import type { SkillExercise } from "../../types";

/**
 * EN · B2 — Beceriler kütüphanesi, parti 16.
 *
 * Hücreyi YİRMİYE tamamlayan partilerden biri (11–20). Kurallar ve emsal:
 * `en-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 16 mahalle hattı: otoparktan bahçeye dönen bir alanın kurucusuyla
 * söyleşi, boş bir arsa için yapılan sakinler toplantısı, konut
 * kooperatifine öneri metni. Dil bilgisi gerçek dışı geçmiş zamanın wish
 * dışındaki kalıpları — it's time, would rather, had better.
 */
export const enB2P16: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-lib-r16",
    course: "en",
    level: "B2",
    skill: "reading",
    title: "The Car Park That Became a Garden",
    genre: "interview",
    intro: "Bir söyleşi: bir apartman otoparkını sebze bahçesine çeviren kişi nasıl başladığını, kimin karşı çıktığını ve neyin zor olduğunu anlatıyor.",
    gloss: [
      { de: "rubbish", tr: "çöp" },
      { de: "housing association", tr: "konut kooperatifi" },
      { de: "understandably", tr: "haklı olarak" },
      { de: "raised bed", tr: "yükseltilmiş tarh" },
      { de: "retired", tr: "emekli" },
      { de: "household", tr: "hane" },
      { de: "fairness", tr: "adalet" },
      { de: "permission", tr: "izin" },
    ],
    minutes: 8,
    text:
      "The car park that became a garden\n\n" +
      "Three years ago, the car park behind the Elm Street flats was used by eleven cars and a " +
      "great deal of rubbish. Today it grows vegetables for forty households. We asked Ms Varga, " +
      "who started the project, how it happened.\n\n" +
      "How did it begin?\n" +
      "With a complaint, honestly. I wrote to the housing association to say it was time " +
      "somebody did something about the rubbish. They wrote back asking whether I had any ideas. " +
      "I hadn't expected that, so I'd better admit that the garden was their suggestion as much " +
      "as mine.\n\n" +
      "Was everyone in favour?\n" +
      "Not at all. The eleven drivers were understandably unhappy. Two of them said they would " +
      "rather we left the car park alone and just cleaned it. In the end we kept six spaces and " +
      "turned the rest into raised beds, which were cheap because nothing had to be dug up.\n\n" +
      "What has surprised you?\n" +
      "Who comes. I assumed it would be retired people with time, and some are. But the busiest " +
      "hour is after school, when parents bring children who have never seen a potato come out " +
      "of the ground.\n\n" +
      "And the difficulties?\n" +
      "Water, mainly, and fairness. There are more families wanting a bed than there are beds, " +
      "and a waiting list feels cold when you live next door. We now share the larger beds " +
      "between two households.\n\n" +
      "What would you tell someone thinking of doing the same?\n" +
      "Start with the people who will lose something, not the people who will gain. If the " +
      "drivers had been against us, we would never have got permission.",
    questions: [
      {
        text: "How did the project begin?",
        options: [
          "with a complaint about rubbish",
          "with a grant from the council",
          "with an idea from a school",
        ],
        answer: 0,
        explain: "Ms Varga kooperatife çöp için şikâyet yazmış; onlar da fikri olup olmadığını sormuş.",
      },
      {
        text: "What did two of the drivers want?",
        options: [
          "more parking spaces",
          "a bed of their own",
          "just a cleaner car park",
        ],
        answer: 2,
        explain: "„they would rather we left the car park alone and just cleaned it“.",
      },
      {
        kind: "truefalse",
        text: "The busiest time in the garden is after school.",
        options: ["True", "False"],
        answer: 0,
        explain: "„the busiest hour is after school, when parents bring children“.",
      },
      {
        kind: "gapfill",
        text: "The garden now grows vegetables for ___ households.",
        options: [],
        answer: 0,
        accept: ["forty", "40"],
        explain: "„Today it grows vegetables for forty households.“",
      },
      {
        kind: "short_answer",
        text: "How many parking spaces were kept?",
        options: [],
        answer: 0,
        accept: ["six", "6", "six spaces"],
        explain: "„In the end we kept six spaces“.",
      },
      {
        text: "What is Ms Varga's advice?",
        options: [
          "Raise the money before anything else.",
          "Start with those who will lose something.",
          "Choose people with plenty of free time.",
        ],
        answer: 1,
        explain: "Kazananlarla değil, bir şey kaybedeceklerle başlamak gerekiyor; sürücüler karşı olsaydı izin çıkmazdı.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-lib-l16",
    course: "en",
    level: "B2",
    skill: "listening",
    title: "The Empty Plot on Canal Road",
    genre: "meeting",
    intro: "Bir sakinler toplantısı: iki yıllığına kullanıma açılan boş bir arsa oyun alanı mı olsun, bahçe mi?",
    gloss: [
      { de: "plot", tr: "arsa" },
      { de: "planning application", tr: "imar başvurusu" },
      { de: "insurance", tr: "sigorta" },
      { de: "inspection", tr: "denetim" },
      { de: "fenced off", tr: "çitle çevrili" },
      { de: "planter", tr: "büyük saksı" },
      { de: "bench", tr: "bank" },
      { de: "sharp", tr: "sivri" },
      { de: "to cheat", tr: "kandırmak" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Chair", text: "Next item: the empty plot on Canal Road. The owner has agreed to let residents use it for two years while the planning application is decided." },
      { speaker: "Ms Adeyemi", text: "It's time we had somewhere for the younger children. The nearest playground is across the main road, and I'd rather they didn't have to cross it." },
      { speaker: "Mr Lowe", text: "I'm not against that, but a playground needs equipment, insurance and inspections. For a site we might lose in two years, that's a lot of money to spend." },
      { speaker: "Ms Adeyemi", text: "So what would you rather we did? Leave it fenced off until somebody builds flats on it?" },
      { speaker: "Mr Lowe", text: "No. I'd suggest things that can be moved. Planters, benches, a few picnic tables. If we lose the site, we take it all with us." },
      { speaker: "Chair", text: "Can I point out that both ideas need people to look after them? Whatever we choose, we'd better agree tonight who is responsible for opening and locking the gate." },
      { speaker: "Ms Adeyemi", text: "Fair enough. I'd accept planters if one corner is kept clear for the children, with soft ground and nothing sharp." },
      { speaker: "Mr Lowe", text: "That I can support. And we'd better ask the owner in writing what happens at the end, so nobody feels cheated in two years' time." },
      { speaker: "Chair", text: "Then I'll write to the owner this week, and we'll ask for volunteers for the gate before we leave tonight." },
    ],
    questions: [
      {
        text: "How long can residents use the plot?",
        options: ["for one year", "for two years", "until flats are built"],
        answer: 1,
        explain: "„let residents use it for two years while the planning application is decided“.",
      },
      {
        text: "What worries Mr Lowe about a playground?",
        options: [
          "the cost for a temporary site",
          "the noise the children make",
          "the owner's refusal",
        ],
        answer: 0,
        explain: "Ekipman, sigorta ve denetim iki yıl sonra kaybedilebilecek bir alan için çok para.",
      },
      {
        kind: "truefalse",
        text: "Mr Lowe suggests things that could be taken away if the site is lost.",
        options: ["True", "False"],
        answer: 0,
        explain: "„If we lose the site, we take it all with us.“",
      },
      {
        kind: "gapfill",
        text: "The nearest playground is across the ___ road.",
        options: [],
        answer: 0,
        accept: ["main"],
        explain: "„The nearest playground is across the main road“.",
      },
      {
        kind: "short_answer",
        text: "What will the chair do this week?",
        options: [],
        answer: 0,
        accept: ["write to the owner", "write to the plot owner"],
        explain: "„I'll write to the owner this week“.",
      },
      {
        text: "What do they finally agree on?",
        options: [
          "a playground with insurance",
          "nothing until next month",
          "planters and a corner for children",
        ],
        answer: 2,
        explain: "Taşınabilir saksılar, çocuklar için yumuşak zeminli boş bir köşeyle birlikte.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-lib-w16",
    course: "en",
    level: "B2",
    skill: "writing",
    title: "A Proposal for the Drying Area",
    genre: "formal",
    intro: "Konut kooperatifine bir öneri metni yazıyorsun: önce iki cümle kur, sonra kullanılmayan bir alan için somut ve sorumluluğu belli bir öneri yaz.",
    gloss: [
      { de: "on behalf of", tr: "adına" },
      { de: "drying area", tr: "çamaşır kurutma alanı" },
      { de: "washing line", tr: "çamaşır ipi" },
      { de: "water butt", tr: "yağmur suyu deposu" },
      { de: "volunteer", tr: "gönüllü" },
      { de: "to raise", tr: "toplamak" },
      { de: "committee", tr: "kurul" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Artık birinin bu alanın sorumluluğunu üstlenmesinin zamanı geldi.",
        answer: "It's time somebody finally took responsibility for this space.",
        alternatives: ["It's finally time somebody took responsibility for this space."],
        hint: "„It's time“ ardından özne + geçmiş zaman gelir; anlam şimdidir.",
      },
      {
        kind: "build",
        tr: "Otoparkı tamamen kapatmamanızı tercih ederiz.",
        answer: "We would rather you didn't close the car park completely.",
        alternatives: ["We would rather you didn't completely close the car park."],
        hint: "Başka birinin eylemi için „would rather + özne + geçmiş zaman“.",
      },
      {
        kind: "free",
        prompt:
          "Konut kooperatifine bir öneri metni yaz: kullanılmayan bir alanı tanımla, ne önerdiğini anlat, kimin bir şey kaybedeceğini ve bunu nasıl telafi edeceğinizi söyle, maliyeti ve sorumluluğu belirt, net bir istekle bitir.",
        checklist: [
          "Alanı ve bugünkü durumunu tanımla",
          "Öneriyi ve maliyetini somut olarak yaz",
          "Kimin kaybedeceğini ve nasıl telafi edileceğini söyle",
          "Sorumluyu belirt ve net bir istekle bitir",
        ],
        minWords: 130,
        phrases: [
          { de: "We are writing on behalf of …", tr: "… adına yazıyoruz", en: "" },
          { de: "At present, the space is …", tr: "Şu anda alan …", en: "" },
          { de: "What we propose is …", tr: "Önerdiğimiz şey …", en: "" },
          { de: "We recognise that … would lose …, so …", tr: "… kişilerin … kaybedeceğinin farkındayız, bu yüzden …", en: "" },
          { de: "We would therefore ask you to …", tr: "Bu nedenle sizden … rica ediyoruz", en: "" },
        ],
        sample:
          "Dear Ms Carlisle, we are writing on behalf of the residents of Linden Court to propose " +
          "a new use for the drying area behind blocks C and D. " +
          "At present, the space is fenced off, the washing lines have been broken for years, and " +
          "it is used mainly for storing old furniture. It's time somebody took responsibility " +
          "for it. " +
          "What we propose is a shared garden with eight raised beds, two benches and a water butt. " +
          "The beds would be built by volunteers, and the materials would cost around nine hundred " +
          "pounds, most of which we have already raised. " +
          "We recognise that residents who still dry clothes outside would lose that space, so we " +
          "would keep two lines along the south wall, and we would rather you didn't remove them. " +
          "A committee of four residents, whose names are attached, would be responsible for the " +
          "keys, the watering and any complaints. " +
          "We would therefore ask you to allow a one-year trial from April, after which the " +
          "committee would report back to you and to all residents. " +
          "Yours sincerely, the Linden Court garden group",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b2-lib-s16",
    course: "en",
    level: "B2",
    skill: "speaking",
    title: "Should Empty Land Go to Residents?",
    genre: "monologue",
    intro: "Bir dakikadan uzun tek başına konuşacaksın: sahibin kaygısını hakkıyla ver ve işi kimin taşıyacağını söyle.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Boş duran bir arsa, sahibi karar verene kadar mahalleliye verilmeli mi? Konumunu söyle, sahibin kaygısını hakkıyla ver, işin başarısını neyin belirlediğini söyle ve belediyelere bir öneriyle bitir.",
      bulletsTr: [
        "Konumunu tek cümleyle söyle",
        "Sahibin kaygısını hakkıyla ver",
        "Başarıyı neyin belirlediğini söyle",
        "Belediyelere bir öneriyle bitir",
      ],
      targets: [
        { de: "I'd rather land were used than left empty, but …", tr: "Arazinin boş kalmasındansa kullanılmasını tercih ederim, ama …" },
        { de: "The owner's worry is reasonable: …", tr: "Sahibin kaygısı yerinde: …" },
        { de: "What decides whether it works is …", tr: "İşe yarayıp yaramayacağını belirleyen şey …" },
        { de: "It's time councils made this easier by …", tr: "Belediyelerin bunu … yoluyla kolaylaştırmasının zamanı geldi" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "I'd rather land were used than left empty, but only if everyone knows from the start " +
        "that the arrangement is temporary. " +
        "An empty plot is not neutral. It collects rubbish, it tells people that nobody cares " +
        "about the street, and it can stay that way for years while a planning decision goes " +
        "back and forth. Lending it to residents for that period costs the owner almost nothing. " +
        "The owner's worry is reasonable: once people have planted something, taking it away " +
        "feels like theft, and nobody wants to be the person who flattens a children's garden. " +
        "That is why so many owners simply keep the fence up. " +
        "What decides whether it works is who holds the keys and who signs the agreement. " +
        "A named group of residents, an end date in writing and everything built so that it can " +
        "be moved turn a vague favour into something both sides can rely on. " +
        "It's time councils made this easier by offering a standard agreement, so that owners " +
        "and residents don't have to invent a new one every time a site sits empty.",
      rubricHint:
        "Karşı tarafın kaygısını adil anlatma, başarı koşulunu adlandırma ve somut bir öneri beklenir; „I'd rather … were“ ve „it's time … made“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b2-lib-g16",
    course: "en",
    level: "B2",
    skill: "grammar",
    title: "it's time we, I'd rather you, we'd better",
    genre: "grammar",
    intro: "Bazı kalıplardan sonra fiil geçmiş biçimde gelir ama anlam şimdi ya da gelecektir; „wish“ dışında en sık kullanılan üçü bunlardır.",
    focus: "Gerçek dışı geçmiş zamanın öteki kalıpları: it's time, would rather, had better",
    gloss: [
      { de: "gate", tr: "kapı" },
      { de: "to lock", tr: "kilitlemek" },
      { de: "owner", tr: "sahip" },
      { de: "permission", tr: "izin" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "It's time + geçmiş zaman",
        tr: "„It's time + özne + geçmiş zaman“ bir şeyin artık yapılması gerektiğini, hatta geciktiğini söyler; fiil geçmişte ama anlam şimdidir. Vurgu için „high“ eklenir. Özne yoksa „It's time to + fiil“ kullanılır ve eleştiri tonu kaybolur.",
        examples: [
          { de: "It's time somebody locked the gate.", tr: "Artık birinin kapıyı kilitlemesi gerek.", note: "geçmiş biçim, şimdiki anlam" },
          { de: "It's high time we asked the owner.", tr: "Sahibine sormamızın vakti çoktan geldi.", note: "high: gecikmiş" },
          { de: "It's time to go home.", tr: "Eve gitme vakti.", note: "özne yok: to" },
        ],
      },
      {
        heading: "would rather: iki kalıp",
        tr: "Öznenin kendi tercihi için „would rather + yalın fiil“ kullanılır: „I'd rather stay.“ Başka birinin eylemi için „would rather + özne + geçmiş zaman“ gelir: „I'd rather you stayed.“ Geçmişe dönük tercihte „had + üçüncü biçim“ kullanılır.",
        examples: [
          { de: "I'd rather stay at home tonight.", tr: "Bu akşam evde kalmayı tercih ederim.", note: "kendi tercihi" },
          { de: "I'd rather you didn't tell the owner yet.", tr: "Sahibine henüz söylememeni tercih ederim.", note: "başkası: geçmiş biçim" },
          { de: "She'd rather we had asked her first.", tr: "Önce ona sormuş olmamızı tercih ederdi.", note: "geçmişe dönük" },
        ],
      },
      {
        heading: "had better: öğüt ve uyarı",
        tr: "„had better + yalın fiil“ güçlü bir öğüt verir ve yapılmazsa bir sonuç olacağını ima eder; „had“ geçmiş gibi görünse de anlam şimdi ya da gelecektir. Olumsuzu „had better not“ olur, „hadn't better“ değil.",
        examples: [
          { de: "We'd better get permission in writing.", tr: "İzni yazılı alsak iyi olur.", note: "öğüt" },
          { de: "You'd better not park there.", tr: "Oraya park etmesen iyi olur.", note: "olumsuz" },
          { de: "They'd better lock the gate tonight.", tr: "Bu gece kapıyı kilitleseler iyi olur.", note: "uyarı" },
        ],
      },
    ],
    questions: [
      {
        text: "It's time somebody ___ the gate.",
        options: ["locks", "will lock", "locked"],
        answer: 2,
        explain: "„It's time + özne“ ardından geçmiş biçim gelir; anlam şimdidir.",
      },
      {
        text: "I'd rather you ___ the owner yet.",
        options: ["don't tell", "didn't tell", "not tell"],
        answer: 1,
        explain: "Başka birinin eylemi için „would rather + özne + geçmiş biçim“.",
      },
      {
        text: "We ___ get permission in writing, or we could lose the site.",
        options: ["had better", "had rather to", "better had"],
        answer: 0,
        explain: "Güçlü öğüt „had better + yalın fiil“ ile verilir.",
      },
      {
        kind: "gapfill",
        text: "You'd better ___ park there. (negative)",
        options: [],
        answer: 0,
        accept: ["not"],
        explain: "Olumsuz biçim „had better not“ olur.",
      },
      {
        kind: "gapfill",
        text: "I'd rather ___ at home tonight. (stay)",
        options: [],
        answer: 0,
        accept: ["stay"],
        explain: "Öznenin kendi tercihinde „would rather“ yalın fiil alır.",
      },
      {
        kind: "gapfill",
        text: "It's high ___ we asked the owner.",
        options: [],
        answer: 0,
        accept: ["time"],
        explain: "„It's high time“ işin geciktiğini vurgular.",
      },
      {
        kind: "gapfill",
        text: "She'd rather we ___ asked her first. (looking back)",
        options: [],
        answer: 0,
        accept: ["had", "'d"],
        explain: "Geçmişe dönük tercihte „would rather + özne + had + üçüncü biçim“.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["It's time", "somebody", "locked", "the gate"],
        explain: "It's time + özne + geçmiş biçim + nesne.",
      },
      {
        kind: "truefalse",
        text: "„It's time we asked the owner.“ — Bu cümle geçmişte olmuş bir şeyi mi anlatıyor?",
        options: ["True", "False"],
        answer: 1,
        explain: "Fiil geçmiş biçimde ama anlam şimdidir: sormanın vakti geldi.",
      },
      {
        kind: "truefalse",
        text: "„I'd rather you didn't tell the owner yet.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Başka birinin eylemi için „would rather“ ardından geçmiş biçim gelir.",
      },
    ],
  },
];
