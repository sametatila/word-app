import type { SkillExercise } from "../../types";

/**
 * EN · B1 — Beceriler kütüphanesi, parti 3.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 3. seti taşır (kimlik sonu 3).
 * Kurallar ve emsal: `en-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Alan adı `de` İngilizce metni taşır; `en` alanı bu kursta yazılmaz.
 * Türler: süreç bilgilendirmesi, tesis sunumu ve kişisel blog yazısı.
 * Üçü de edilgen çatının doğal alanı; dil bilgisi bu yüzden passive voice.
 */
export const enB1P3: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-lib-r3",
    course: "en",
    level: "B1",
    skill: "reading",
    title: "What Happens to Your Suitcase",
    genre: "Bilgilendirme",
    intro: "Havalimanında bagajın izlediği yolu anlatan bir yazı okuyacaksın: hangi adımlar var, ne zaman insan devreye giriyor.",
    gloss: [
      { de: "label", tr: "etiket" },
      { de: "handle", tr: "sap" },
      { de: "belt", tr: "bant" },
      { de: "curtain", tr: "perde" },
      { de: "sort", tr: "ayırmak" },
      { de: "load", tr: "yüklemek" },
      { de: "return", tr: "geri vermek" },
    ],
    minutes: 7,
    text:
      "WHAT HAPPENS TO YOUR SUITCASE\n\n" +
      "Between the moment your bag is taken at the desk and the moment it appears in another country, it travels " +
      "about two kilometers and is touched by almost nobody.\n\n" +
      "First a label is printed and stuck on the handle. The label carries a code, and everything after that is " +
      "done by that code, not by your name. The bag is put on a belt and disappears through a rubber curtain.\n\n" +
      "Below the terminal, it is photographed from six sides. If the code cannot be read, the bag is sent to a " +
      "small room where a person reads it by hand. About one bag in three hundred ends up there.\n\n" +
      "Then it is sorted. In a large airport the bags are pushed onto separate lines by little arms; each line " +
      "belongs to one flight. Bags for early flights are stored in a cold hall, sometimes for several hours.\n\n" +
      "Finally the bags are loaded into containers and driven to the plane. This is the only part where a human " +
      "decision is still made every time: somebody must check that the container is closed correctly.\n\n" +
      "Most lost bags are not lost. They are simply late, because they missed one of these steps and were put on " +
      "the next flight. Nine out of ten are returned within two days.",
    questions: [
      {
        text: "What does the text describe?",
        options: [
          "the steps between the desk and the plane",
          "how to pack a suitcase for a long trip",
          "why airports lose so many bags",
        ],
        answer: 0,
        explain: "Metin adım adım bagajın yolunu anlatıyor: etiket, bant, ayırma, yükleme.",
      },
      {
        text: "What is used to move the bag through the system?",
        options: [
          "a printed code on the label",
          "the name of the passenger",
          "the flight number written by hand",
        ],
        answer: 0,
        explain: "„The label carries a code, and everything after that is done by that code, not by your name.“",
      },
      {
        kind: "truefalse",
        text: "Every bag is read by a person.",
        options: ["True", "False"],
        answer: 1,
        explain: "„If the code cannot be read, the bag is sent to a small room where a person reads it by hand.“ — yalnız üç yüzde bir.",
      },
      {
        kind: "gapfill",
        text: "About one bag in ___ hundred is read by hand.",
        options: [],
        answer: 0,
        accept: ["three", "3"],
        explain: "„About one bag in three hundred ends up there.“",
      },
      {
        kind: "short_answer",
        text: "Where are bags for early flights kept?",
        options: [],
        answer: 0,
        accept: ["in a cold hall", "a cold hall", "in a cold room"],
        explain: "„Bags for early flights are stored in a cold hall, sometimes for several hours.“",
      },
      {
        text: "Why are most lost bags not really lost?",
        options: [
          "They are late and come on a later flight.",
          "They are sent to the wrong country.",
          "They are opened and checked again.",
        ],
        answer: 0,
        explain: "„They are simply late … and were put on the next flight. Nine out of ten are returned within two days.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-lib-l3",
    course: "en",
    level: "B1",
    skill: "listening",
    title: "Where Your Water Comes From",
    genre: "Sunum",
    intro: "Su arıtma tesisinde bir sunum dinleyeceksin: su nereden geliyor, neler yapılıyor, ne yapılmıyor.",
    gloss: [
      { de: "layer", tr: "katman" },
      { de: "filter", tr: "süzmek" },
      { de: "aerate", tr: "havalandırmak" },
      { de: "sample", tr: "numune" },
      { de: "soft", tr: "yumuşak" },
      { de: "pump", tr: "pompalamak" },
    ],
    minutes: 7,
    segments: [
      { text: "Good evening, and thank you for coming. In the next twenty minutes I will show you what happens to the water between the ground and your kitchen." },
      { text: "The first surprise is the distance. Our water is not taken from the river you can see from here. It is pumped from a layer of sand about forty meters below us." },
      { text: "That sand is already a filter. Water that goes in at the top of the hill is not used for about nine years." },
      { text: "In the works, four things are done. First, the water is aerated: it falls through the air so that iron comes out of it." },
      { text: "Second, it is filtered through sand again. Third, in dry summers a small amount of chlorine is added. And fourth, it is tested, every day, in that room behind me." },
      { text: "We take fifty samples a week. Nothing is sent out before it has been checked twice by two different people." },
      { text: "And the last thing, because I am always asked: no, the water is not made softer here. That is done in your house, or not at all." },
      { text: "Now, if you follow me, the pumps are through this door. Please stay behind the yellow line." },
    ],
    questions: [
      {
        text: "Where does the water come from?",
        options: [
          "from sand deep under the ground",
          "from the river near the works",
          "from a lake up in the hills",
        ],
        answer: 0,
        explain: "„It is pumped from a layer of sand about forty meters below us.“",
      },
      {
        text: "When is chlorine added?",
        options: ["in dry summers", "every single day", "only after a test fails"],
        answer: 0,
        explain: "„Third, in dry summers a small amount of chlorine is added.“",
      },
      {
        kind: "truefalse",
        text: "The water is checked more than once before it leaves the works.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Nothing is sent out before it has been checked twice by two different people.“",
      },
      {
        kind: "short_answer",
        text: "How many samples are taken each week?",
        options: [],
        answer: 0,
        accept: ["fifty", "50", "fifty samples"],
        explain: "„We take fifty samples a week.“",
      },
      {
        kind: "dictation",
        text: "Numune sayısını söyleyen cümleyi duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["We take fifty samples a week.", "We take fifty samples a week"],
        explain: "„We take fifty samples a week.“ — sıklık için „a week“ kullanılır.",
      },
      {
        text: "What is checked twice before the water is sent out?",
        options: [
          "every sample, by two different people",
          "the chlorine, by one engineer",
          "the sand filter, once a week",
        ],
        answer: 0,
        explain: "„Nothing is sent out before it has been checked twice by two different people.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-lib-w3",
    course: "en",
    level: "B1",
    skill: "writing",
    title: "Three Months on the Night Desk",
    genre: "Blog yazısı",
    intro: "Çoğu kişinin görmediği bir işi anlatan blog yazısı yazacaksın; önce iki cümle kur, sonra yazıyı yaz.",
    gloss: [
      { de: "desk", tr: "resepsiyon" },
      { de: "guest", tr: "misafir" },
      { de: "trained", tr: "eğitilmiş" },
      { de: "awake", tr: "uyanık" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Odalar gece boyunca temizlenmiyor.",
        answer: "The rooms are not cleaned during the night.",
        alternatives: ["During the night the rooms are not cleaned."],
        hint: "Edilgen çatı „be + üçüncü hâl“ ile kurulur; eylemi kimin yaptığı söylenmez.",
      },
      {
        kind: "build",
        tr: "Kapı sabah altıda açılıyor.",
        answer: "The door is opened at six in the morning.",
        alternatives: ["At six in the morning the door is opened."],
        hint: "Düzenli olarak yapılan bir iş edilgen geniş zamanla anlatılır: is opened.",
      },
      {
        kind: "free",
        prompt:
          "Çoğu kişinin içeriden görmediği bir işi ya da rolü anlat: ne yapıyorsun, seni ne şaşırttı, insanların sandığından farklı olan bir şey, en zor yanı ve yine yapar mıydın.",
        checklist: [
          "İşi ve saatlerini somut yaz",
          "İnsanların sandığıyla gerçeği karşılaştır",
          "Seni şaşırtan şeyi anlat",
          "En zor yanı ve son yargınla bitir",
        ],
        minWords: 60,
        phrases: [
          { de: "Everybody asked me the same question.", tr: "Herkes bana aynı soruyu sordu." },
          { de: "Here is the honest answer.", tr: "Dürüst cevap şu." },
          { de: "The surprise was …", tr: "Şaşırtan şey … oldu" },
          { de: "I was never trained for …", tr: "… için hiç eğitilmemiştim" },
          { de: "Would I do it again?", tr: "Yine yapar mıydım?" },
        ],
        sample:
          "I worked on the night desk of a small hotel for three months, from eleven at night to seven in the " +
          "morning. Everybody asked me the same question: what do you actually do? Here is the honest answer. " +
          "About two hours of the night are work. The accounts are closed at half past one, the breakfast lists " +
          "are printed, and the door is opened at six in the morning. The rest is waiting. " +
          "The surprise was who comes down at three o'clock. Not the loud guests; they sleep. It is people who " +
          "cannot sleep, and they want to talk to somebody who is not their family. I was never trained for that " +
          "part, and it was the part I did most. The hard part was the second day off: the first day you sleep, " +
          "and on the second you are awake at four in the morning in a flat where nothing is open. " +
          "Would I do it again? Yes, but not in winter.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b1-lib-s3",
    course: "en",
    level: "B1",
    skill: "speaking",
    title: "First Aid Every Year?",
    genre: "Monolog",
    intro: "Bir dakikaya yakın tek başına konuşacaksın: görüşünü söyle, karşı görüşü kabul et ve bir şart koy.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Okullarda ilk yardım her yıl öğretilmeli mi? Görüşünü söyle, en güçlü gerekçeni ver, karşı görüşü kabul et ve bir şart koyarak bitir.",
      bulletsTr: [
        "Görüşünü tek cümleyle söyle",
        "En güçlü gerekçeni ver (tıp değil, davranış)",
        "Karşı görüşü kabul et ve haklı yanını söyle",
        "Bir şart koy ve nedenini açıkla",
      ],
      targets: [
        { de: "I think they should, but not in the way …", tr: "Bence gerekir, ama … biçimde değil" },
        { de: "The strongest argument is …", tr: "En güçlü gerekçe …" },
        { de: "Against this, people say …", tr: "Buna karşı şu söyleniyor: …" },
        { de: "My only condition is …", tr: "Tek şartım …" },
      ],
      minSeconds: 40,
      maxSeconds: 75,
      sampleDe:
        "I think they should, but not in the way it is usually done. The strongest argument is simple and it is " +
        "not about medicine. In an emergency most people do nothing, and they do nothing because they are afraid " +
        "of making it worse. That fear is not removed by one afternoon at the age of sixteen; it is removed by " +
        "doing the same thing every year until it feels normal. Against this, people say the timetable is " +
        "already full, and they are right. But first aid does not need a whole subject. Twenty minutes, three " +
        "times a year, would be enough if it is always the same three things: call, check, press. " +
        "My only condition is that it must be practical. If it is taught from a book and tested on paper, we " +
        "will get students who can name the steps and still stand still, and that is worse than nothing, " +
        "because it looks like a solution.",
      rubricHint:
        "Karşı görüş açıkça kabul edilmeli ve sonuçta bir şart bulunmalı; edilgen biçimler doğal olarak geçebilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b1-lib-g3",
    course: "en",
    level: "B1",
    skill: "grammar",
    title: "is done, was done",
    genre: "Kural",
    intro: "Kurum ve süreç dilinin temel çatısı: işi kimin yaptığı değil, neyin yapıldığı öne çıkar.",
    focus: "Passive voice: present ve past",
    gloss: [
      { de: "build", tr: "inşa etmek" },
      { de: "letter", tr: "mektup" },
      { de: "clean", tr: "temizlemek" },
      { de: "bridge", tr: "köprü" },
    ],
    minutes: 8,
    explanation: [
      {
        heading: "Türkçede ek, İngilizcede iki kelime",
        tr: "Türkçede edilgen fiilin içine girer: yap-ıl-ıyor. İngilizcede iki parça gerekir: „be“ + fiilin üçüncü hâli. Etken cümlenin nesnesi, edilgen cümlenin öznesi olur.",
        examples: [
          { de: "They clean the rooms every morning.", tr: "Odaları her sabah temizliyorlar.", note: "etken" },
          { de: "The rooms are cleaned every morning.", tr: "Odalar her sabah temizleniyor.", note: "edilgen" },
          { de: "English is spoken in many countries.", tr: "İngilizce birçok ülkede konuşuluyor." },
        ],
      },
      {
        heading: "Zamanı „be“ taşır",
        tr: "Zaman ikinci parçada değil, „be“ fiilinde görünür: is/are done (şimdi), was/were done (geçmiş), has been done (yakın geçmiş), must be done (zorunluluk). Üçüncü hâl hiç değişmez.",
        examples: [
          { de: "This bridge was built in eighteen ninety.", tr: "Bu köprü bin sekiz yüz doksanda inşa edildi." },
          { de: "The samples were tested yesterday.", tr: "Numuneler dün test edildi." },
          { de: "Nothing is sent out before it has been checked.", tr: "Hiçbir şey kontrol edilmeden gönderilmiyor." },
        ],
      },
      {
        heading: "Faili söylemek: by",
        tr: "Fail genelde hiç söylenmez; gerekirse „by“ ile eklenir. Ayrıca İngilizcede kişi de edilgen öznesi olabilir: „I was told …“ Türkçede bu yapı yoktur ve bu yüzden zor gelir.",
        examples: [
          { de: "The letter was written by my sister.", tr: "Mektubu kız kardeşim yazdı." },
          { de: "I was told about the meeting.", tr: "Toplantı bana söylendi.", note: "kişi özne olabiliyor" },
          { de: "We were given two weeks.", tr: "Bize iki hafta verildi." },
        ],
      },
    ],
    questions: [
      {
        text: "The rooms ___ every morning.",
        options: ["are cleaned", "are cleaning", "clean"],
        answer: 0,
        explain: "Odalar kendileri temizlemiyor, temizleniyor: be + üçüncü hâl.",
      },
      {
        text: "This bridge ___ in eighteen ninety.",
        options: ["was built", "was build", "is built"],
        answer: 0,
        explain: "Geçmişte olmuş bir iş: was + üçüncü hâl. „build“ değil „built“.",
      },
      {
        text: "The letter was written ___ my sister.",
        options: ["by", "from", "with"],
        answer: 0,
        explain: "Edilgen cümlede fail „by“ ile eklenir.",
      },
      {
        kind: "gapfill",
        text: "English ___ (speak) in many countries.",
        options: [],
        answer: 0,
        accept: ["is spoken"],
        explain: "Genel bir durum: is + üçüncü hâl.",
      },
      {
        kind: "gapfill",
        text: "The samples ___ (test) yesterday.",
        options: [],
        answer: 0,
        accept: ["were tested"],
        explain: "Özne çoğul ve zaman geçmiş: were + tested.",
      },
      {
        kind: "gapfill",
        text: "Nothing ___ (send) out before it is checked.",
        options: [],
        answer: 0,
        accept: ["is sent"],
        explain: "„nothing“ tekil sayılır: is + sent.",
      },
      {
        kind: "gapfill",
        text: "Active: „Somebody stole my bike.“ — Passive: „My bike ___ stolen.“",
        options: [],
        answer: 0,
        accept: ["was"],
        explain: "Etkenin nesnesi edilgenin öznesi olur ve zaman „be“ ile taşınır: was stolen.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["The", "door", "is", "opened", "at", "six"],
        explain: "Özne + be + üçüncü hâl + zaman: The door is opened at six.",
      },
      {
        kind: "truefalse",
        text: "„My bike was stole yesterday.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "Edilgende ikinci hâl değil üçüncü hâl gelir: „was stolen“.",
      },
      {
        kind: "truefalse",
        text: "„I was told about the meeting.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "İngilizcede kişi de edilgen öznesi olabilir; cümle doğru.",
      },
    ],
  },
];
