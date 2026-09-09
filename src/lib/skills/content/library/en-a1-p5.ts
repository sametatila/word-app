import type { SkillExercise } from "../../types";

/**
 * EN · A1 — Beceriler kütüphanesi, parti 5.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 5. seti taşır (kimlik sonu 5).
 * Kurallar ve emsal: `en-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Alan adı `de` İngilizce metni taşır; `en` alanı bu kursta yazılmaz.
 * Kalan türler: iş ilanı, tur rehberi konuşması ve internet yorumu.
 * Söyleyiş odağı çoğul -s'nin üç sesi; dil bilgisi çoğul, artikel ve some/any.
 */
export const enA1P5: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a1-lib-r5",
    course: "en",
    level: "A1",
    skill: "reading",
    title: "Dog Walker Wanted",
    genre: "ad",
    intro: "Apartman girişindeki küçük iş ilanını okuyacaksın: kim aranıyor, ne zaman, ne kadar ödeniyor.",
    gloss: [
      { de: "walk", tr: "yürüyüş" },
      { de: "friendly", tr: "cana yakın" },
      { de: "somebody", tr: "biri" },
      { de: "pay", tr: "ödemek" },
      { de: "start", tr: "başlamak" },
      { de: "near", tr: "yakın" },
    ],
    minutes: 4,
    text:
      "DOG WALKER WANTED\n\n" +
      "Hello neighbors! I need help with my dog, Milo.\n\n" +
      "Milo is a small brown dog. He is six years old and very friendly. He is not good with cats, " +
      "but he loves children.\n\n" +
      "I work from Monday to Friday, from nine to five. I need somebody for one walk every day, " +
      "at about one o'clock. The walk is thirty or forty minutes in the park.\n\n" +
      "I pay ten euros for one walk.\n\n" +
      "You can start in March. You do not need a car; I live in Lime Street eight, near the bus stop.\n\n" +
      "Please call me: 0176 22 88 41. Ask for Marta.",
    questions: [
      {
        text: "What does Marta need?",
        options: ["somebody for one walk a day", "a place for Milo from Monday to Friday", "a driver who takes Milo to the park"],
        answer: 0,
        explain: "„I need somebody for one walk every day, at about one o'clock.“",
      },
      {
        text: "When is the walk?",
        options: ["at about one o'clock", "from nine to five", "at nine in the morning"],
        answer: 0,
        explain: "Dokuzdan beşe Marta'nın çalışma saatleri; yürüyüş „at about one o'clock“.",
      },
      {
        kind: "truefalse",
        text: "Milo is good with cats.",
        options: ["True", "False"],
        answer: 1,
        explain: "„He is not good with cats, but he loves children.“",
      },
      {
        kind: "gapfill",
        text: "Marta pays ___ euros for one walk.",
        options: [],
        answer: 0,
        accept: ["ten", "10"],
        explain: "„I pay ten euros for one walk.“",
      },
      {
        kind: "short_answer",
        text: "How old is Milo?",
        options: [],
        answer: 0,
        accept: ["six years old", "six", "6", "six years"],
        explain: "„He is six years old and very friendly.“",
      },
      {
        text: "What do you not need for this job?",
        options: ["a car", "time in the afternoon", "a phone"],
        answer: 0,
        explain: "„You do not need a car; I live in Lime Street eight, near the bus stop.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a1-lib-l5",
    course: "en",
    level: "A1",
    skill: "listening",
    title: "Welcome on the City Bus Tour",
    genre: "profile",
    intro: "Şehir turunda rehberin karşılama konuşmasını dinleyeceksin: tur ne kadar sürüyor, nerede duruluyor, kurallar neler.",
    gloss: [
      { de: "guide", tr: "rehber" },
      { de: "tour", tr: "tur" },
      { de: "castle", tr: "kale" },
      { de: "river", tr: "nehir" },
      { de: "front", tr: "ön" },
      { de: "question", tr: "soru" },
    ],
    minutes: 4,
    segments: [
      { text: "Hello everyone and welcome! My name is Rick and I am your guide today." },
      { text: "The tour is ninety minutes. We stop two times: at the castle and at the river." },
      { text: "At the castle you have twenty minutes. Please come back to the bus at half past three." },
      { text: "The bus is warm, so you can leave your coats here. Nobody comes in." },
      { text: "Please do not eat on the bus, but water is fine." },
      { text: "If you have a question, come to the front. I am here all the time." },
      { text: "And now, look on your right: that is the old market. Let's go!" },
    ],
    questions: [
      {
        text: "Who is Rick?",
        options: ["the guide", "the bus driver", "a tourist on the bus"],
        answer: 0,
        explain: "„My name is Rick and I am your guide today.“",
      },
      {
        text: "How long is the tour?",
        options: ["ninety minutes", "twenty minutes", "half an hour"],
        answer: 0,
        explain: "„The tour is ninety minutes.“ Yirmi dakika kaledeki mola.",
      },
      {
        kind: "truefalse",
        text: "The bus stops two times during the tour.",
        options: ["True", "False"],
        answer: 0,
        explain: "„We stop two times: at the castle and at the river.“",
      },
      {
        kind: "short_answer",
        text: "When must people come back to the bus?",
        options: [],
        answer: 0,
        accept: ["at half past three", "half past three", "at 3.30"],
        explain: "„Please come back to the bus at half past three.“",
      },
      {
        kind: "dictation",
        text: "Turun süresini söyleyen cümleyi duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["The tour is ninety minutes.", "The tour is ninety minutes"],
        explain: "„The tour is ninety minutes.“ — süre için „be“ yeter.",
      },
      {
        text: "What is on the right at the start?",
        options: ["the old market", "the castle", "the river"],
        answer: 0,
        explain: "„… look on your right: that is the old market.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-lib-w5",
    course: "en",
    level: "A1",
    skill: "writing",
    title: "My Hotel Review",
    genre: "opinion",
    intro: "Kaldığın bir yeri internette değerlendireceksin; önce iki cümle kur, sonra kısa bir yorum yaz.",
    gloss: [
      { de: "clean", tr: "temiz" },
      { de: "breakfast", tr: "kahvaltı" },
      { de: "loud", tr: "gürültülü" },
      { de: "star", tr: "yıldız" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Sabahları oda çok sessiz.",
        answer: "In the morning the room is very quiet.",
        alternatives: ["The room is very quiet in the morning."],
        hint: "Günün bölümü „in the“ ile söylenir ve cümlenin başında da sonunda da durabilir.",
      },
      {
        kind: "build",
        tr: "Kahvaltı sabah yedide başlıyor.",
        answer: "Breakfast starts at seven in the morning.",
        alternatives: ["In the morning, breakfast starts at seven."],
        hint: "Saat için „at“, günün bölümü için „in the“ kullanılır.",
      },
      {
        kind: "free",
        prompt:
          "Kaldığın bir oteli ya da pansiyonu internette değerlendir: nerede, neyi beğendin, kahvaltı nasıl, iyi olmayan bir şey ve kaç yıldız veriyorsun.",
        checklist: [
          "Yerini ve nasıl gidildiğini yaz",
          "Odayı ve kahvaltıyı anlat",
          "İyi olmayan bir şeyi söyle",
          "Kaç yıldız verdiğini yaz",
        ],
        minWords: 25,
        phrases: [
          { de: "… is in the old town.", tr: "… eski şehirde." },
          { de: "The room is …", tr: "Oda …" },
          { de: "Breakfast starts at …", tr: "Kahvaltı … başlıyor." },
          { de: "Only one thing is not good: …", tr: "Yalnız bir şey iyi değil: …" },
          { de: "I give … stars from five.", tr: "Beş üzerinden … yıldız veriyorum." },
        ],
        sample:
          "Hotel Rosa is in the old town, five minutes from the station. The room is small but very clean, and the bed " +
          "is good. Breakfast starts at seven in the morning: bread, eggs, cheese and fruit. The people at the desk " +
          "are very friendly and they speak English. Only one thing is not good: the street is loud at night. " +
          "I give four stars from five.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a1-lib-s5",
    course: "en",
    level: "A1",
    skill: "speaking",
    title: "cats, dogs and buses",
    genre: "pronounce",
    intro: "Çoğul eki hep aynı yazılır ama üç ayrı ses verir: s, z ve iz. Hangisinin geleceğini önceki harf belirler.",
    gloss: [
      { de: "bridge", tr: "köprü" },
      { de: "dish", tr: "tabak" },
      { de: "box", tr: "kutu" },
      { de: "shop", tr: "dükkân" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "The cats and the books are here.",
        tr: "Kediler ve kitaplar burada.",
        hint: "„cats“ ve „books“ sert sesle biter (t, k), bu yüzden ek „s“ okunur: kets, buks.",
        confusions: [
          { heard: ["catz and bookz"], fix: "Sert sessizden sonra ek titreşimsizdir: s sesi, z değil.", expected: "cats" },
        ],
      },
      {
        de: "My friends have two dogs.",
        tr: "Arkadaşlarımın iki köpeği var.",
        hint: "„friends“ ve „dogs“ titreşimli sesle biter (n, g), bu yüzden ek „z“ okunur.",
        confusions: [
          { heard: ["frends have two dokss"], fix: "Titreşimli sessizden sonra ek z olur: frendz, dogz.", expected: "dogs" },
        ],
      },
      {
        de: "The buses stop at the bridges.",
        tr: "Otobüsler köprülerde duruyor.",
        hint: "„bus“ ve „bridge“ ıslıklı sesle biter, bu yüzden araya bir hece girer: BA-siz, BRİ-ciz.",
        confusions: [
          { heard: ["The buss stop at the bridgs"], fix: "s ve c seslerinden sonra ek ayrı bir hecedir: -iz.", expected: "buses" },
        ],
      },
      {
        de: "She washes the dishes.",
        tr: "Bulaşıkları yıkıyor.",
        hint: "Fiildeki -es de aynı kuralı izler: WO-şiz, Dİ-şiz. İki kez fazladan hece.",
        confusions: [
          { heard: ["She wash the dish", "washs"], fix: "„sh“ sesinden sonra ek ayrı hece olarak eklenir: -iz.", expected: "washes" },
        ],
      },
      {
        de: "He works in two shops.",
        tr: "İki dükkânda çalışıyor.",
        hint: "„works“ ve „shops“ sert sesle bitiyor: wörks, şops. Ek s okunur.",
        confusions: [
          { heard: ["workz in two shopz"], fix: "k ve p sert olduğu için ek de sert kalır: s.", expected: "works" },
        ],
      },
      {
        de: "The boxes are on the tables.",
        tr: "Kutular masaların üstünde.",
        hint: "„boxes“ fazladan hece alır (BOK-siz), „tables“ ise yalnız z sesiyle biter.",
        confusions: [
          { heard: ["The box are on the tablez", "boxs"], fix: "x sesinden sonra -iz gelir; l sesinden sonra yalnız z.", expected: "boxes" },
        ],
      },
      {
        de: "My sister watches films.",
        tr: "Kız kardeşim film izliyor.",
        hint: "„watches“ ayrı hece alır (WO-çiz), „films“ ise z ile biter.",
        confusions: [
          { heard: ["watch films", "watchs"], fix: "„ch“ sesinden sonra -iz gelir: woçiz.", expected: "watches" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a1-lib-g5",
    course: "en",
    level: "A1",
    skill: "grammar",
    title: "a, an, the — and some or any",
    genre: "grammar",
    intro: "Türkçede olmayan üç küçük kelime ve Türkçeden farklı çalışan bir çoğul: ikisi birlikte öğrenilir.",
    focus: "Çoğul biçimler, a / an / the ve some / any",
    gloss: [
      { de: "child", tr: "çocuk" },
      { de: "city", tr: "şehir" },
      { de: "umbrella", tr: "şemsiye" },
      { de: "engineer", tr: "mühendis" },
    ],
    minutes: 6,
    explanation: [
      {
        heading: "Çoğul: sayıdan sonra da eklenir",
        tr: "Türkçede sayıdan sonra çoğul eki düşer: „iki kitap“. İngilizcede düşmez: two books. Ek genelde -s'tir; -s, -x, -ch, -sh ile bitenler -es alır; sessizden sonra -y gelen kelimeler -ies olur. Bir de ezberlenecek düzensizler var: child → children, man → men, foot → feet.",
        examples: [
          { de: "two books, three cars", tr: "iki kitap, üç araba", note: "sayıdan sonra da -s" },
          { de: "one box → two boxes", tr: "bir kutu → iki kutu", note: "-x → -es" },
          { de: "one city → two cities", tr: "bir şehir → iki şehir", note: "-y → -ies" },
        ],
      },
      {
        heading: "a, an, the",
        tr: "Tekil sayılabilir bir şeyden ilk kez söz ederken „a“ gelir; kelime ünlü SESİYLE başlıyorsa „an“ olur. Karşındaki hangisi olduğunu biliyorsa „the“ kullanılır. Genel bir şey söylerken çoğulda artikel hiç konmaz.",
        examples: [
          { de: "She is an engineer.", tr: "O bir mühendis.", note: "ünlü sesi → an" },
          { de: "I need an umbrella.", tr: "Bir şemsiyeye ihtiyacım var." },
          { de: "I like books.", tr: "Kitapları severim.", note: "genel: artikel yok" },
        ],
      },
      {
        heading: "some ve any",
        tr: "Belirsiz bir miktar için olumlu cümlede „some“, olumsuz ve soruda „any“ kullanılır. Bir tek istisna vardır: teklif ve ricada soruda da „some“ gelir.",
        examples: [
          { de: "There are some books here.", tr: "Burada birkaç kitap var." },
          { de: "There isn't any milk.", tr: "Hiç süt yok." },
          { de: "Would you like some tea?", tr: "Çay ister misin?", note: "teklif: some" },
        ],
      },
    ],
    questions: [
      {
        text: "I have two ___.",
        options: ["children", "childs", "childrens"],
        answer: 0,
        explain: "„child“ düzensizdir: çoğulu children'dır ve üzerine -s eklenmez.",
      },
      {
        text: "She is ___ engineer.",
        options: ["an", "a", "the"],
        answer: 0,
        explain: "„engineer“ ünlü sesiyle başlar, bu yüzden „an“ gelir.",
      },
      {
        text: "We do not have ___ milk at home.",
        options: ["any", "some", "a"],
        answer: 0,
        explain: "Olumsuz cümlede belirsiz miktar „any“ ile söylenir.",
      },
      {
        kind: "gapfill",
        text: "Plural: one box → two ___",
        options: [],
        answer: 0,
        accept: ["boxes"],
        explain: "-x ile biten kelimeler -es alır: boxes.",
      },
      {
        kind: "gapfill",
        text: "Plural: one city → two ___",
        options: [],
        answer: 0,
        accept: ["cities"],
        explain: "Sessizden sonra gelen -y, -ies olur: cities.",
      },
      {
        kind: "gapfill",
        text: "Would you like ___ tea?",
        options: [],
        answer: 0,
        accept: ["some"],
        explain: "Teklif ve ricada soruda da „some“ kullanılır.",
      },
      {
        kind: "gapfill",
        text: "I need ___ umbrella.",
        options: [],
        answer: 0,
        accept: ["an"],
        explain: "„umbrella“ ünlü sesiyle başlıyor: an umbrella.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["There", "are", "some", "books", "here"],
        explain: "Olumlu cümlede belirsiz miktar „some“ ile gelir: There are some books here.",
      },
      {
        kind: "truefalse",
        text: "„I have two childs.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "Doğrusu „two children“; bu kelimenin çoğulu düzensizdir.",
      },
      {
        kind: "truefalse",
        text: "„I like music.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Genel bir şeyden söz ediliyor ve „music“ sayılamaz; artikel gerekmez.",
      },
    ],
  },
];
