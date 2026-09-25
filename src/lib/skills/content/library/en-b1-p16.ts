import type { SkillExercise } from "../../types";

/**
 * EN · B1 — Beceriler kütüphanesi, parti 16.
 *
 * Hücreyi YİRMİYE tamamlayan partilerden biri (11–20). Kurallar ve emsal:
 * `en-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 16 hayvanlar hattı: bir sokağı ikiye bölen tilkiler, yavru kuş
 * bulana kurtarma merkezinin öğüdü, binicilik çiftliğine iş başvurusu. Dil
 * bilgisi ekleme sözcükleri — also, too, as well ve olumsuzda either.
 */
export const enB1P16: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-lib-r16",
    course: "en",
    level: "B1",
    skill: "reading",
    title: "The Foxes of Elm Street",
    genre: "article",
    intro: "Yerel bir haber yazısı: bir bahçede yaşayan tilkiler sokağı ikiye bölüyor; kim korkuyor, kim seviyor, belediye ne diyor.",
    gloss: [
      { de: "fox", tr: "tilki" },
      { de: "shed", tr: "kulübe" },
      { de: "to scream", tr: "çığlık atmak" },
      { de: "council", tr: "belediye" },
      { de: "fascinated", tr: "büyülenmiş" },
      { de: "rubbish", tr: "çöp" },
      { de: "to get rid of", tr: "kurtulmak" },
      { de: "lid", tr: "kapak" },
    ],
    minutes: 6,
    text:
      "Nobody on Elm Street agrees about the foxes. There are at least four of them, living under " +
      "the shed at number 9, and in the last year they have become the only subject anyone talks " +
      "about at the bus stop.\n\n" +
      "Mrs Patel at number 11 is afraid of them. Not because they are dangerous, she says, but " +
      "because they scream at night, and the first time she heard it she thought someone was being " +
      "attacked. She has complained to the council twice.\n\n" +
      "Her neighbor, Tom Reilly, is the opposite. He is fascinated by the foxes and has put a small " +
      "camera in his garden. He is proud of his videos, which show the young ones playing with " +
      "a tennis ball at three in the morning. More than two hundred people follow his page.\n\n" +
      "Most residents are somewhere in the middle. They are tired of finding their rubbish bags " +
      "torn open, but they are not interested in getting rid of the animals.\n\n" +
      "The council's answer is simple, and not very popular. Foxes are not pests in law, so it " +
      "will not remove them. Instead it has asked people to buy bins with lids that lock, and to " +
      "stop feeding the animals. That last request is aimed at one person, and everybody on " +
      "Elm Street knows who it is.",
    questions: [
      {
        text: "Where do the foxes live?",
        options: [
          "in the park at the end of the street",
          "in Tom Reilly's garden",
          "under the shed at number 9",
        ],
        answer: 2,
        explain: "„living under the shed at number 9“.",
      },
      {
        text: "Why is Mrs Patel afraid of the foxes?",
        options: ["They scream at night.", "They attacked her cat.", "They are dangerous to children."],
        answer: 0,
        explain: "Tehlikeli oldukları için değil; geceleri çığlık attıkları için korkuyor.",
      },
      {
        kind: "truefalse",
        text: "Tom Reilly wants the council to remove the foxes.",
        options: ["True", "False"],
        answer: 1,
        explain: "Tam tersi: tilkilere hayran, bahçesine kamera koymuş ve videolarıyla gurur duyuyor.",
      },
      {
        kind: "gapfill",
        text: "More than two ___ people follow Tom's page.",
        options: [],
        answer: 0,
        accept: ["hundred"],
        explain: "„More than two hundred people follow his page.“",
      },
      {
        kind: "short_answer",
        text: "What are most residents tired of?",
        options: [],
        answer: 0,
        accept: ["torn rubbish bags", "rubbish bags torn open", "finding their rubbish bags torn open", "their rubbish bags torn open", "finding rubbish bags torn open"],
        explain: "„They are tired of finding their rubbish bags torn open“.",
      },
      {
        text: "What has the council asked people to do?",
        options: [
          "catch the foxes themselves",
          "buy bins with lids that lock",
          "call a special number at night",
        ],
        answer: 1,
        explain: "Belediye tilkileri kaldırmayacak; kilitli kapaklı çöp kutusu ve beslememe istiyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-lib-l16",
    course: "en",
    level: "B1",
    skill: "listening",
    title: "If You Find a Baby Bird",
    genre: "guide",
    intro: "Bir yaban hayatı kurtarma merkezinin kısa sesli öğüdü: yerde yavru kuş bulursan ne yapmalı, ne yapmamalı.",
    gloss: [
      { de: "feather", tr: "tüy" },
      { de: "to hop", tr: "sekmek" },
      { de: "nest", tr: "yuva" },
      { de: "on purpose", tr: "bilerek" },
      { de: "injured", tr: "yaralı" },
      { de: "infected", tr: "mikrop kapmış" },
      { de: "to digest", tr: "sindirmek" },
    ],
    minutes: 6,
    segments: [
      { text: "Every spring our phone line is full of calls about baby birds, so here is the short version of what we tell people." },
      { text: "First, look at the bird. If it has feathers and is hopping about on the ground, it is almost certainly fine. It has left the nest on purpose, and its parents are nearby." },
      { text: "The parents are very good at hiding. You may watch for an hour and see nothing, but they are waiting for you to go away." },
      { text: "So the best thing you can do is keep cats and dogs inside for a day or two. That is all." },
      { text: "If the bird has no feathers, it has fallen out of the nest too early. If you can see the nest and reach it safely, put the bird back." },
      { text: "The parents don't mind the smell of your hands; that is an old story." },
      { text: "Only bring a bird to us if it is injured, or if it has been in a cat's mouth, even when it looks well. Cat bites become infected very quickly." },
      { text: "Please don't try to feed it bread or milk. Birds can't digest milk, and it does more harm than good." },
      { text: "And if you are not sure, send us a photo before you do anything. We answer most photos within the hour." },
    ],
    questions: [
      {
        text: "What does it usually mean if a baby bird with feathers is on the ground?",
        options: ["It is injured.", "It left the nest on purpose.", "Its parents have gone."],
        answer: 1,
        explain: "„It has left the nest on purpose, and its parents are nearby.“",
      },
      {
        text: "What is the best thing to do in that case?",
        options: ["feed it some bread", "take it to the center", "keep pets inside for a day or two"],
        answer: 2,
        explain: "„keep cats and dogs inside for a day or two. That is all.“",
      },
      {
        kind: "truefalse",
        text: "You should bring a bird to the center if a cat has had it in its mouth.",
        options: ["True", "False"],
        answer: 0,
        explain: "İyi görünse bile getirilmeli: kedi ısırığı çok çabuk mikrop kapıyor.",
      },
      {
        kind: "gapfill",
        text: "The center answers most photos within the ___.",
        options: [],
        answer: 0,
        accept: ["hour"],
        explain: "„We answer most photos within the hour.“",
      },
      {
        kind: "short_answer",
        text: "What should you not feed a baby bird?",
        options: [],
        answer: 0,
        accept: ["bread or milk", "milk", "bread", "bread and milk", "milk or bread"],
        explain: "„Please don't try to feed it bread or milk.“",
      },
      {
        text: "What does the center say about the smell of your hands?",
        options: [
          "It doesn't matter; that is an old story.",
          "The parents will leave the nest.",
          "You should always wear gloves.",
        ],
        answer: 0,
        explain: "„The parents don't mind the smell of your hands; that is an old story.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-lib-w16",
    course: "en",
    level: "B1",
    skill: "writing",
    title: "A Weekend Job at the Stables",
    genre: "email",
    intro: "Bir binicilik çiftliğinin hafta sonu ilanına başvuruyorsun: önce iki cümle kur, sonra dürüst ve somut bir başvuru e-postası yaz.",
    gloss: [
      { de: "advert", tr: "ilan" },
      { de: "stables", tr: "ahır" },
      { de: "patient", tr: "sabırlı" },
      { de: "beginner", tr: "acemi" },
      { de: "available", tr: "müsait" },
      { de: "trial", tr: "deneme" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Cumartesileri saat yedide de başlayabilirim.",
        answer: "I can also start at seven on Saturdays.",
        alternatives: ["On Saturdays I can also start at seven."],
        hint: "„also“ yardımcı fiilin (can) arkasına, ana fiilin önüne gelir.",
      },
      {
        kind: "build",
        tr: "Kirli işlerden korkmam, soğuk sabahlardan da korkmam.",
        answer: "I'm not afraid of dirty jobs, and I'm not afraid of cold mornings either.",
        alternatives: ["I'm not afraid of cold mornings, and I'm not afraid of dirty jobs either."],
        hint: "Olumsuz cümlede „de/da“ „either“ ile söylenir ve cümlenin sonuna gelir.",
      },
      {
        kind: "free",
        prompt:
          "Bir binicilik çiftliği hafta sonları için yardımcı arıyor: ahırları temizlemek, atları beslemek, çocuk derslerinde yardım etmek. Bir başvuru e-postası yaz: kendini tanıt, neden ilgilendiğini ve neyde iyi olduğunu söyle, bir zayıf yanını dürüstçe yaz ve ne zaman çalışabileceğini belirt.",
        checklist: [
          "Kendini tanıt ve ilana değin",
          "Neden ilgilendiğini ve neyde iyi olduğunu yaz (also / too)",
          "Bir zayıf yanını dürüstçe söyle",
          "Ne zaman çalışabileceğini belirt",
        ],
        minWords: 100,
        phrases: [
          { de: "I'm replying to your advert for …", tr: "… ilanınıza cevap yazıyorum", en: "" },
          { de: "I've always been interested in …", tr: "…'e her zaman ilgi duydum", en: "" },
          { de: "I'm quite good at …", tr: "…'de oldukça iyiyim", en: "" },
          { de: "To be honest, I'm a little nervous about …", tr: "Açıkçası … konusunda biraz tedirginim", en: "" },
          { de: "I'm available on …", tr: "… günleri müsaitim", en: "" },
        ],
        sample:
          "Dear Ms Carter, I'm replying to your advert for a weekend helper at Hill Farm Stables. " +
          "My name is Elif Kaya, I'm nineteen and I'm studying biology at the university in town. " +
          "I've always been interested in horses. I rode every summer at my uncle's farm until I " +
          "was fifteen, so I know how much work a stable needs. I'm not afraid of dirty jobs, and I'm " +
          "not afraid of cold mornings either. I'm also quite good at working with children. " +
          "For two years I have helped at a Saturday swimming club for six-year-olds, and I'm " +
          "patient with nervous beginners. " +
          "To be honest, I'm a little nervous about one thing: I have never looked after a horse " +
          "that was ill, and I would need someone to show me what to look for. " +
          "I'm available on Saturdays and Sundays from seven until two, and in the university " +
          "holidays I could do some weekdays as well. I would be happy to come for a trial day. " +
          "Kind regards, Elif Kaya",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b1-lib-s16",
    course: "en",
    level: "B1",
    skill: "speaking",
    title: "Should Zoos Still Exist?",
    genre: "monologue",
    intro: "Yaklaşık bir dakika tek başına konuşacaksın: tartışmalı bir kurumu bir deneyimle tart ve bir koşul koy.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Hayvanat bahçeleri hâlâ var olmalı mı? Görüşünü söyle, bir hayvanat bahçesi ya da hayvan parkıyla ilgili deneyimini anlat, karşı görüşün haklı yanını kabul et ve desteğin için bir koşul koy.",
      bulletsTr: [
        "Görüşünü tek cümleyle söyle",
        "Bir ziyaretini anlat",
        "Karşı görüşün haklı yanını kabul et",
        "Desteğin için bir koşul koy",
      ],
      targets: [
        { de: "My answer is yes, but not in their old form.", tr: "Cevabım evet ama eski hâlleriyle değil." },
        { de: "The visit I remember best was …", tr: "En iyi hatırladığım ziyaret …" },
        { de: "People who are against zoos are right about …", tr: "Hayvanat bahçelerine karşı olanlar … konusunda haklı" },
        { de: "I'd only support them if …", tr: "Onları ancak … olursa desteklerim" },
      ],
      minSeconds: 40,
      maxSeconds: 80,
      sampleDe:
        "My answer is yes, but not in their old form. I don't think anyone should be proud of a lion " +
        "walking in circles on concrete. " +
        "The visit I remember best was to a small park in the north that only kept animals from the " +
        "same region: wolves, owls and a few bears. The spaces were so large that we waited forty " +
        "minutes before we saw a wolf, and my little cousin was bored and then suddenly very excited. " +
        "The keeper told us that two of the owls had been hit by cars and could never fly again. " +
        "People who are against zoos are right about one thing: most animals are there for the " +
        "visitors, not for themselves, and a photo for a child is not a good enough reason to keep " +
        "an elephant in a cold country. " +
        "I'd only support them if they kept fewer species, gave each one far more space and spent " +
        "a real part of the ticket money on protecting animals in the wild.",
      rubricHint:
        "Görüş, somut bir ziyaret, karşı görüşe ödün ve açık bir koşul beklenir; „right about“, „I'd only support them if“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b1-lib-g16",
    course: "en",
    level: "B1",
    skill: "grammar",
    title: "also, too, as well, either",
    genre: "grammar",
    intro: "Türkçedeki „de/da“ İngilizcede dört sözcüğe dağılır; her birinin cümlede kendi yeri vardır ve olumsuz cümle ayrı bir sözcük ister.",
    focus: "Ekleme sözcükleri: also, too, as well ve olumsuzda either — cümledeki yerleri",
    gloss: [
      { de: "horror movie", tr: "korku filmi" },
      { de: "meat", tr: "et" },
      { de: "old town", tr: "eski şehir" },
      { de: "hungry", tr: "aç" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "also: fiilin yanında",
        tr: "„also“ genellikle ana fiilin ÖNÜNE, ama „be“ ve yardımcı fiilin ARKASINA gelir. Cümle başında da durabilir, ama o zaman yazı dilinde daha resmî duyulur.",
        examples: [
          { de: "She also speaks French.", tr: "Fransızca da konuşuyor.", note: "ana fiilin önünde" },
          { de: "He's also a good cook.", tr: "İyi bir aşçı da.", note: "be'nin arkasında" },
          { de: "I've also worked with children.", tr: "Çocuklarla da çalıştım.", note: "yardımcı fiilin arkasında" },
        ],
      },
      {
        heading: "too ve as well: cümle sonunda",
        tr: "„too“ ve „as well“ cümlenin SONUNA gelir ve konuşmada „also“dan daha doğal duyulur. Kısa cevaplarda da kullanılır: „Me too.“",
        examples: [
          { de: "I'd like a coffee too.", tr: "Ben de bir kahve isterim.", note: "too sonda" },
          { de: "They invited my sister as well.", tr: "Kız kardeşimi de davet ettiler.", note: "as well sonda" },
          { de: "I'm tired. — Me too.", tr: "Yoruldum. — Ben de.", note: "kısa cevap" },
        ],
      },
      {
        heading: "Olumsuzda either",
        tr: "Olumsuz cümlede „too“ ve „also“ kullanılmaz; sona „either“ gelir. Türkçe olumsuzda da „de“ der („ben de yemem“), İngilizcede ise sözcük değişir.",
        examples: [
          { de: "I don't eat meat either.", tr: "Ben de et yemem.", note: "olumsuz → either" },
          { de: "She can't swim either.", tr: "O da yüzemez.", note: "can't … either" },
          { de: "We didn't see the start either.", tr: "Başlangıcı biz de görmedik.", note: "didn't … either" },
        ],
      },
    ],
    questions: [
      {
        text: "I don't like horror movies ___.",
        options: ["either", "too", "also"],
        answer: 0,
        explain: "Olumsuz cümlede „de/da“ „either“ ile söylenir.",
      },
      {
        text: "Which sentence is correct?",
        options: ["She also is a doctor.", "She is also a doctor.", "She is a doctor also too."],
        answer: 1,
        explain: "„also“ „be“ fiilinin arkasına gelir.",
      },
      {
        text: "A: I'm hungry. B: Me ___.",
        options: ["either", "also", "too"],
        answer: 2,
        explain: "Olumlu kısa cevap „Me too.“ olur.",
      },
      {
        kind: "gapfill",
        text: "Tom can't come tonight, and Sara can't come ___.",
        options: [],
        answer: 0,
        accept: ["either"],
        explain: "Olumsuz cümlenin sonunda „either“ gelir.",
      },
      {
        kind: "gapfill",
        text: "I speak English, and I speak German ___ well. (= too)",
        options: [],
        answer: 0,
        accept: ["as"],
        explain: "Cümle sonunda „as well“ = „de/da“.",
      },
      {
        kind: "gapfill",
        text: "He has ___ worked in a hotel. (also / too)",
        options: [],
        answer: 0,
        accept: ["also"],
        explain: "Yardımcı fiil ile ana fiil arasına „also“ girer; „too“ sona gelirdi.",
      },
      {
        kind: "gapfill",
        text: "My brother wants to come ___. (too / either)",
        options: [],
        answer: 0,
        accept: ["too"],
        explain: "Olumlu cümlenin sonunda „too“ kullanılır.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["We", "also", "visited", "the old town"],
        explain: "„also“ ana fiilin önüne gelir.",
      },
      {
        kind: "truefalse",
        text: "„I didn't see him too.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "Olumsuz cümlede „too“ olmaz: „I didn't see him either.“",
      },
      {
        kind: "truefalse",
        text: "„They invited my sister as well.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "„as well“ cümle sonunda „de/da“ anlamı verir; cümle doğru.",
      },
    ],
  },
];
