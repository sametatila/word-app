import type { SkillExercise } from "../../types";

/**
 * EN · B1 — Beceriler kütüphanesi, parti 13.
 *
 * Hücreyi YİRMİYE tamamlayan partilerden biri (11–20). Kurallar ve emsal:
 * `en-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 13 merak ve boş zaman hattı: ulaşım müzesinde bir gece etkinliği,
 * can sıkıntısı üzerine bir araştırma, yemek festivalini soran arkadaşa
 * e-posta. Dil bilgisi -ed / -ing sıfatları — hisseden ve hissettiren.
 */
export const enB1P13: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-lib-r13",
    course: "en",
    level: "B1",
    skill: "reading",
    title: "Late Friday at the Transport Museum",
    genre: "review",
    intro: "Bir ziyaretçi ulaşım müzesinin cuma gecesi etkinliğini değerlendiriyor: ne bekliyordu, neyi sevdi, ne aksadı.",
    gloss: [
      { de: "spare", tr: "fazladan" },
      { de: "retired", tr: "emekli" },
      { de: "vehicle", tr: "araç" },
      { de: "shocking", tr: "şok edici" },
      { de: "tiring", tr: "yorucu" },
      { de: "line", tr: "kuyruk" },
      { de: "confusing", tr: "kafa karıştırıcı" },
      { de: "relaxed", tr: "rahat" },
      { de: "anyway", tr: "zaten" },
      { de: "engineers", tr: "mühendis" },
    ],
    minutes: 6,
    text:
      "I'll be honest: I only went because my brother had a spare ticket. A museum full of old " +
      "buses on a Friday night did not sound exciting to me, and I expected to be bored within " +
      "twenty minutes. I stayed until they turned the lights off.\n\n" +
      "The “Late Friday” evenings run once a month from seven to eleven. The ticket costs twelve " +
      "pounds and includes one drink, which is not cheap, but the normal daytime entrance is " +
      "nine pounds anyway.\n\n" +
      "What makes the evening different is the people. Instead of signs on the walls, retired " +
      "drivers and engineers stand next to the vehicles and tell you about them. One man had " +
      "driven the number 14 bus for twenty-six years. His stories were funny, sometimes a little " +
      "shocking, and I was surprised how interested I was in the way tickets worked in 1970.\n\n" +
      "Not everything worked. The music in the main hall was so loud that it was tiring to listen " +
      "to anybody, and the line for the café was confusing, because there were two lines and " +
      "nobody knew which was which. By ten o'clock the free drinks had run out.\n\n" +
      "Still, I left feeling more relaxed than I had all week. I'd recommend it to anyone, and " +
      "especially to people who think museums are boring. Four stars out of five, and the missing " +
      "star is for the music.",
    questions: [
      {
        text: "Why did the writer go to the museum?",
        options: ["for work", "to see the old buses", "because of a spare ticket"],
        answer: 2,
        explain: "„I only went because my brother had a spare ticket.“",
      },
      {
        text: "What makes the Late Friday different?",
        options: [
          "cheaper tickets for students",
          "people who tell stories about the vehicles",
          "free food and music all evening",
        ],
        answer: 1,
        explain: "Duvardaki yazılar yerine emekli şoförler ve teknisyenler araçları anlatıyor.",
      },
      {
        kind: "truefalse",
        text: "The evening ticket includes a drink.",
        options: ["True", "False"],
        answer: 0,
        explain: "„The ticket costs twelve pounds and includes one drink“.",
      },
      {
        kind: "gapfill",
        text: "One man had driven the number 14 bus for ___ years.",
        options: [],
        answer: 0,
        accept: ["twenty-six", "26", "twenty six"],
        explain: "„One man had driven the number 14 bus for twenty-six years.“",
      },
      {
        kind: "short_answer",
        text: "Why was the café line confusing?",
        options: [],
        answer: 0,
        accept: ["there were two lines", "two lines", "because there were two lines", "there were two lines and nobody knew which was which"],
        explain: "„there were two lines and nobody knew which was which“.",
      },
      {
        text: "Why did the museum lose a star?",
        options: [
          "because of the loud music",
          "because the evening was too short",
          "because the guides were boring",
        ],
        answer: 0,
        explain: "„the missing star is for the music“.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-lib-l13",
    course: "en",
    level: "B1",
    skill: "listening",
    title: "Is Boredom Good for You?",
    genre: "report",
    intro: "Kısa bir radyo haberi: araştırmacılar can sıkıntısını ölçmüş; ne buldular, sınırı nerede, telefon neyi bozuyor.",
    gloss: [
      { de: "boredom", tr: "can sıkıntısı" },
      { de: "to copy", tr: "kopyalamak" },
      { de: "creative", tr: "yaratıcı" },
      { de: "to wander", tr: "dalıp gitmek" },
      { de: "limit", tr: "sınır" },
      { de: "effect", tr: "etki" },
      { de: "annoyed", tr: "sinirli" },
      { de: "pick it up", tr: "eline almak" },
    ],
    minutes: 6,
    segments: [
      { text: "Most of us think of boredom as a waste of time. A group of researchers in Leeds wanted to know whether that is true, and their answer surprised them." },
      { text: "They gave two hundred adults a very boring job: copying numbers from an old phone book for fifteen minutes. A second group went straight to the next task." },
      { text: "The next task was creative. People had to think of as many uses as possible for two plastic cups." },
      { text: "The people who had been bored first had more ideas, and their ideas were more interesting, too." },
      { text: "The researchers think that when we are bored, the mind starts looking for something to do, and it wanders to places it would not normally go." },
      { text: "There is a limit, though. After about forty minutes the effect disappears, and people simply feel tired and annoyed." },
      { text: "And the phone stops it completely. If you pick it up every time you feel bored, your mind never gets to the part where it wanders." },
      { text: "So the advice is surprisingly simple. Next time you are waiting for a bus, try doing nothing for ten minutes. It might be the most useful part of your day." },
    ],
    questions: [
      {
        text: "What did the first group have to do?",
        options: ["copy numbers from a phone book", "read a long report about work", "sit in silence in a dark room"],
        answer: 0,
        explain: "On beş dakika boyunca eski bir telefon rehberinden numara kopyalamışlar.",
      },
      {
        text: "What was the creative task?",
        options: ["drawing a picture", "writing a short story", "finding uses for plastic cups"],
        answer: 2,
        explain: "„think of as many uses as possible for two plastic cups“.",
      },
      {
        kind: "truefalse",
        text: "Being bored for more than an hour still helps people think.",
        options: ["True", "False"],
        answer: 1,
        explain: "Kırk dakika civarında etki kayboluyor; insanlar yalnızca yorgun ve sinirli oluyor.",
      },
      {
        kind: "gapfill",
        text: "The researchers studied two ___ adults.",
        options: [],
        answer: 0,
        accept: ["hundred"],
        explain: "„They gave two hundred adults a very boring job“.",
      },
      {
        kind: "short_answer",
        text: "What stops the mind from wandering?",
        options: [],
        answer: 0,
        accept: ["the phone", "your phone", "picking up the phone", "a phone", "phones", "picking up your phone"],
        explain: "„the phone stops it completely“ — her sıkıldığında eline alırsan zihin dalıp gidemiyor.",
      },
      {
        text: "What is the advice at the end?",
        options: [
          "Always carry a book with you.",
          "Do nothing for ten minutes while you wait.",
          "Avoid boring jobs if you can.",
        ],
        answer: 1,
        explain: "„try doing nothing for ten minutes“ — örneğin otobüs beklerken.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-lib-w13",
    course: "en",
    level: "B1",
    skill: "writing",
    title: "Is the Food Festival Worth It?",
    genre: "email",
    intro: "Arkadaşın gittiğin yemek festivalini soruyor: önce iki cümle kur, sonra dürüst ve pratik bir e-posta yaz.",
    gloss: [
      { de: "stall", tr: "tezgâh" },
      { de: "clay", tr: "kil" },
      { de: "crowd", tr: "kalabalık" },
      { de: "exhausted", tr: "bitkin" },
      { de: "disappointed", tr: "hayal kırıklığına uğramış" },
      { de: "starving", tr: "çok aç" },
      { de: "baking", tr: "pişirmek" },
      { de: "oven", tr: "fırın" },
      { de: "in general", tr: "genel olarak" },
      { de: "dishes", tr: "yemekler" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Konuşmalar sıkıcıydı ama yemek harikaydı.",
        answer: "The talks were boring, but the food was amazing.",
        alternatives: ["The food was amazing, but the talks were boring."],
        hint: "-ing sıfatı bir şeyin nasıl OLDUĞUNU, yani insanda ne his yarattığını söyler: boring, amazing.",
      },
      {
        kind: "build",
        tr: "Sonunda biraz hayal kırıklığına uğramıştım.",
        answer: "I was a bit disappointed at the end.",
        alternatives: ["At the end I was a bit disappointed."],
        hint: "-ed sıfatı kişinin nasıl HİSSETTİĞİNİ söyler: disappointed.",
      },
      {
        kind: "free",
        prompt:
          "Arkadaşın gelecek hafta sonu gittiğin yemek festivaline gitmeyi düşünüyor ve fikrini soruyor. Ona bir e-posta yaz: ne zaman ve kimle gittiğini söyle, neyin ilginç neyin yorucu olduğunu anlat, bir hayal kırıklığını dürüstçe yaz ve pratik bir öneriyle bitir.",
        checklist: [
          "Ne zaman ve kimle gittiğini yaz",
          "Neyin ilginç, neyin yorucu olduğunu anlat",
          "Bir hayal kırıklığını dürüstçe söyle",
          "Pratik bir öneriyle bitir",
        ],
        minWords: 100,
        phrases: [
          { de: "You asked me whether …", tr: "… diye sormuştun", en: "" },
          { de: "What I found most interesting was …", tr: "En ilginç bulduğum şey …", en: "" },
          { de: "The tiring part was …", tr: "Yorucu olan kısım …", en: "" },
          { de: "I was a bit disappointed that …", tr: "…-diği için biraz hayal kırıklığına uğradım", en: "" },
          { de: "If you go, make sure you …", tr: "Gidersen mutlaka …", en: "" },
        ],
        sample:
          "Hi Jess, you asked me whether the food festival in Victoria Park is worth it, so here is " +
          "my honest answer. I went on Saturday with my cousin and we stayed about four hours. " +
          "What I found most interesting was a stall where a woman from Georgia was baking bread " +
          "in a clay oven. We watched her for twenty minutes and nobody around us was bored. " +
          "The food in general was amazing, and most dishes cost five or six pounds, which I " +
          "thought was fair. " +
          "The tiring part was the crowd. After two o'clock it was so full that you waited in line for " +
          "everything, even for water, and I was exhausted by four. I was a bit disappointed that " +
          "the cooking talks were so short and hard to hear. " +
          "If you go, make sure you arrive before twelve, bring your own bottle and eat something " +
          "small first, so you're not choosing lunch while you're starving. Have fun! Selin",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b1-lib-s13",
    course: "en",
    level: "B1",
    skill: "speaking",
    title: "Free Museums for Everyone?",
    genre: "monologue",
    intro: "Yaklaşık bir dakika tek başına konuşacaksın: bir kamu hizmetinin bedelini tart ve bir çözüm öner.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Müzeler ücretsiz olmalı mı? Görüşünü söyle, bir müzeyle ilgili kendi deneyimini anlat, ücretsiz girişin bir sakıncasını kabul et ve bir çözüm öner.",
      bulletsTr: [
        "Görüşünü tek cümleyle söyle",
        "Bir müzeyle ilgili kendi deneyimini anlat",
        "Ücretsiz girişin bir sakıncasını kabul et",
        "Bir çözüm öner",
      ],
      targets: [
        { de: "On balance, I think they should, at least …", tr: "Genel olarak bence olmalı, en azından …" },
        { de: "What convinced me was …", tr: "Beni ikna eden şey …" },
        { de: "The honest problem with free entry is …", tr: "Ücretsiz girişin açık sorunu …" },
        { de: "One way round that would be …", tr: "Bunu aşmanın bir yolu … olurdu" },
      ],
      minSeconds: 40,
      maxSeconds: 80,
      sampleDe:
        "On balance, I think they should, at least for the permanent collection. " +
        "What convinced me was a small thing. When I was a student, the city museum was free, " +
        "and I went in almost every week, sometimes just for fifteen minutes to look at one painting. " +
        "I would never have done that if each visit had cost ten pounds, because when you pay, " +
        "you feel you have to stay all afternoon and see everything. Free entry turns a museum " +
        "into a place you walk through, like a park. " +
        "The honest problem with free entry is money. Somebody pays for the heating and the guards, " +
        "and if it isn't the visitors, it is everybody through taxes, including people who never go. " +
        "Some free museums are also so crowded on weekends that a visit becomes tiring rather than relaxing. " +
        "One way round that would be to keep the collection free but to charge for special " +
        "exhibitions, and to ask tourists for a small donation at the door.",
      rubricHint:
        "Görüş, kişisel bir deneyim, dürüst bir sakınca ve bir çözüm beklenir; „on balance“, „what convinced me was“, „one way round that“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b1-lib-g13",
    course: "en",
    level: "B1",
    skill: "grammar",
    title: "bored or boring?",
    genre: "grammar",
    intro: "Türkçede tek kökle söylenen bazı duygular İngilizcede ikiye ayrılır: biri hisseden kişi için, öteki o hissi veren şey için.",
    focus: "-ed ve -ing sıfatları: hisseden ve hissettiren (bored / boring)",
    gloss: [
      { de: "bored", tr: "canı sıkılmış" },
      { de: "boring", tr: "sıkıcı" },
      { de: "confused", tr: "kafası karışmış" },
      { de: "embarrassed", tr: "utanmış" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "-ed: nasıl hissediyorum?",
        tr: "-ed ile biten sıfat bir KİŞİNİN hissini anlatır: „I'm bored“ — canım sıkılıyor. Öznesi çoğunlukla bir insan ya da hayvandır. Türkçedeki „sıkılmış, yorulmuş, şaşırmış“ gibi biçimlere benzer.",
        examples: [
          { de: "I'm bored. Let's go out.", tr: "Canım sıkıldı. Dışarı çıkalım.", note: "kişinin hissi" },
          { de: "She was surprised by the result.", tr: "Sonuca şaşırdı.", note: "şaşıran kişi" },
          { de: "We felt tired after the trip.", tr: "Yolculuktan sonra yorgun hissettik.", note: "feel + -ed" },
        ],
      },
      {
        heading: "-ing: bu his nereden geliyor?",
        tr: "-ing ile biten sıfat bir şeyin ya da kişinin başkasında NASIL BİR HİS YARATTIĞINI anlatır: „The movie was boring“ — film sıkıcıydı. „He's boring“ dersen onun başkalarını sıktığını söylersin; bu yüzden „I'm boring“ ile „I'm bored“ çok farklı cümlelerdir.",
        examples: [
          { de: "The movie was boring.", tr: "Film sıkıcıydı.", note: "hissi yaratan şey" },
          { de: "It was a tiring journey.", tr: "Yorucu bir yolculuktu.", note: "ismin önünde de durur" },
          { de: "Our new neighbor is a bit boring.", tr: "Yeni komşumuz biraz sıkıcı biri.", note: "başkalarını sıkıyor" },
        ],
      },
      {
        heading: "Aynı cümlede ikisi",
        tr: "İki biçim çoğu zaman aynı cümlede birbirini açıklar: şey -ing, kişi -ed. Sık çiftler: interested/interesting, confused/confusing, disappointed/disappointing, embarrassed/embarrassing, relaxed/relaxing. Türkçe tek kökle karşılasa bile („utanç verici / utanmış“) İngilizcede seçim zorunludur.",
        examples: [
          { de: "The instructions were confusing, so I was confused.", tr: "Talimatlar kafa karıştırıcıydı, bu yüzden kafam karıştı.", note: "şey -ing, kişi -ed" },
          { de: "It was an embarrassing mistake.", tr: "Utanç verici bir hataydı.", note: "hata utandırıyor" },
          { de: "I felt embarrassed all evening.", tr: "Bütün akşam utandım.", note: "kişi utanıyor" },
        ],
      },
    ],
    questions: [
      {
        text: "The lesson was so ___ that I nearly fell asleep.",
        options: ["bored", "boring", "bore"],
        answer: 1,
        explain: "Dersin kendisi sıkıyor: hissi yaratan şey -ing alır.",
      },
      {
        text: "I was really ___ when I heard the news.",
        options: ["surprised", "surprising", "surprise"],
        answer: 0,
        explain: "Şaşıran kişi: -ed.",
      },
      {
        text: "Which sentence means the speaker makes other people bored?",
        options: ["I'm bored.", "I'm getting bored.", "I'm boring."],
        answer: 2,
        explain: "„I'm boring“ başkalarını sıktığını söyler; öteki ikisi kendi hissidir.",
      },
      {
        kind: "gapfill",
        text: "Walking in the hills is very ___. (relax)",
        options: [],
        answer: 0,
        accept: ["relaxing"],
        explain: "Yürüyüş rahatlatıyor: hissi yaratan şey -ing alır.",
      },
      {
        kind: "gapfill",
        text: "The map was confusing, and we were completely ___. (confuse)",
        options: [],
        answer: 0,
        accept: ["confused"],
        explain: "Kafası karışan kişiler: -ed.",
      },
      {
        kind: "gapfill",
        text: "Are you ___ in modern art? (interest)",
        options: [],
        answer: 0,
        accept: ["interested"],
        explain: "Soru kişinin ilgisini soruyor: -ed.",
      },
      {
        kind: "gapfill",
        text: "It was a very ___ day, so I went to bed early. (tire)",
        options: [],
        answer: 0,
        accept: ["tiring"],
        explain: "Gün yoruyor: hissi yaratan şey -ing alır.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["The ending", "of the movie", "was", "disappointing"],
        explain: "Hayal kırıklığı yaratan şey filmin sonu: -ing.",
      },
      {
        kind: "truefalse",
        text: "„I'm very interesting in history.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "İlgi duyan kişi -ed alır: „I'm very interested in history.“",
      },
      {
        kind: "truefalse",
        text: "„It was an exciting match.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Maç heyecan veriyor: hissi yaratan şey -ing alır.",
      },
    ],
  },
];
