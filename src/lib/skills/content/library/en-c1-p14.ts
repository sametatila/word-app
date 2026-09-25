import type { SkillExercise } from "../../types";

/**
 * EN · C1 — Beceriler kütüphanesi, parti 14.
 *
 * Hücreyi YİRMİYE tamamlayan on partiden biri. Kurallar ve emsal:
 * `en-c1.ts` (parti 1), `en-c1-p6` … `p10` ve `data/content/SPEC.md`.
 *
 * Parti 14 zevk ve öneri hattı: öneri sistemine altı ay ara veren birinin
 * denemesi, gece yayını yapan bir radyocuyla söyleşi, başkasının seçtiği
 * bir albüm üzerine değerlendirme. Dil bilgisi ileri ilgi yapıları — edat +
 * which/whom, whereby, some of which, cümleye dönük which; B2'deki
 * defining/non-defining ayrımının ötesi.
 */
export const enC1P14: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-lib-r14",
    course: "en",
    level: "C1",
    skill: "reading",
    title: "The Playlist That Knew Me Too Well",
    genre: "essay",
    intro: "Bir deneme: yazar altı ay boyunca dinlediği her albümü bir insana seçtiriyor ve öneri sistemiyle farkı tartıyor.",
    gloss: [
      { de: "whereby", tr: "aracılığıyla" },
      { de: "precisely", tr: "tam olarak" },
      { de: "recommendation", tr: "öneri" },
      { de: "to skip", tr: "atlamak" },
      { de: "narrow", tr: "dar" },
      { de: "edge", tr: "kenar" },
      { de: "presenter", tr: "sunucu" },
      { de: "stranger", tr: "yabancı" },
      { de: "to address", tr: "yöneltmek" },
      { de: "sleeve", tr: "plak kabı" },
      { de: "irritating", tr: "sinir bozucu" },
      { de: "to exaggerate", tr: "abartmak" },
      { de: "objection", tr: "itiraz" },
      { de: "identical", tr: "tıpatıp aynı" },
    ],
    minutes: 10,
    text:
      "The playlist that knew me too well\n\n" +
      "For about three years, almost everything I listened to arrived through a system whereby each song " +
      "was chosen on the basis of the previous one. I never complained, because the system was very good. " +
      "It rarely played anything I disliked, which is precisely what began to bother me.\n\n" +
      "A recommendation engine is built to reduce the chance that you will skip. That is a reasonable goal, " +
      "and the result is a kind of comfort in which nothing is ever wrong and nothing is ever new. " +
      "The songs I heard were not identical, but they belonged to a narrow region of taste, the edges of " +
      "which I had stopped noticing.\n\n" +
      "So last spring I made a rule. For six months, every album I listened to had to be chosen by a person: " +
      "a friend, a shop assistant, a presenter on the radio, or the stranger to whom the library had lent the " +
      "record before me and who had left a note inside the sleeve.\n\n" +
      "The first month was irritating. I disliked about half of what I heard, and some of it I switched off " +
      "after ten minutes. By the third month something had changed. I no longer expected to enjoy everything, " +
      "and the albums I did enjoy felt as if they belonged to me, since I could say exactly why I had kept " +
      "listening.\n\n" +
      "I do not want to exaggerate this. People have always had their taste shaped by others, and a friend " +
      "with strong opinions can narrow you as efficiently as any machine. The difference is that a friend " +
      "can be argued with, whereas a system offers nobody to whom an objection could be addressed.\n\n" +
      "I have gone back to the playlist, mostly. But I keep one day a week for music that somebody chose for " +
      "reasons they could explain, which turns out to be the only day I remember.",
    questions: [
      {
        text: "What began to bother the writer about the system?",
        options: [
          "It rarely played anything the writer disliked.",
          "It played the same songs every day.",
          "It kept stopping in the middle of songs.",
        ],
        answer: 0,
        explain: "„It rarely played anything I disliked, which is precisely what began to bother me.“",
      },
      {
        text: "What rule did the writer make last spring?",
        options: [
          "to listen only to the radio",
          "to let a person choose every album",
          "to buy every album on vinyl",
        ],
        answer: 1,
        explain: "Altı ay boyunca her albümü bir insan seçmek zorundaydı: arkadaş, satıcı, sunucu ya da bir yabancı.",
      },
      {
        kind: "truefalse",
        text: "By the third month, the writer no longer expected to enjoy everything.",
        options: ["True", "False"],
        answer: 0,
        explain: "„By the third month something had changed. I no longer expected to enjoy everything“.",
      },
      {
        kind: "gapfill",
        text: "The writer followed the rule for ___ months.",
        options: [],
        answer: 0,
        accept: ["six", "6"],
        explain: "„For six months, every album I listened to had to be chosen by a person“.",
      },
      {
        kind: "short_answer",
        text: "Who had left a note inside the record sleeve?",
        options: [],
        answer: 0,
        accept: ["a stranger", "the stranger", "the previous borrower", "a previous borrower", "the person who borrowed it before"],
        explain: "Kütüphanenin plağı yazardan önce ödünç verdiği yabancı.",
      },
      {
        text: "What difference does the writer see between a friend and a system?",
        options: [
          "A friend is usually right.",
          "A system is easier to change.",
          "A friend can be argued with.",
        ],
        answer: 2,
        explain: "Sistem, itirazın yöneltilebileceği kimseyi sunmuyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-lib-l14",
    course: "en",
    level: "C1",
    skill: "listening",
    title: "Someone Has to Choose",
    genre: "interview",
    intro: "On dokuz yıldır gece müzik yayını yapan bir sunucuyla söyleşi: bir insan, bir algoritmanın yapamadığı neyi yapar?",
    gloss: [
      { de: "algorithm", tr: "algoritma" },
      { de: "behalf", tr: "ad" },
      { de: "arrogant", tr: "kibirli" },
      { de: "aware", tr: "farkında" },
      { de: "defense", tr: "savunma" },
      { de: "to object", tr: "itiraz etmek" },
      { de: "to employ", tr: "istihdam etmek" },
      { de: "editor", tr: "editör" },
      { de: "curation", tr: "seçki" },
      { de: "signature", tr: "imza" },
      { de: "to trust", tr: "güvenmek" },
    ],
    minutes: 10,
    segments: [
      { speaker: "Host", text: "You've presented the same late-night music show for nineteen years. What does a person do that an algorithm can't?" },
      { speaker: "Ms Lund", text: "Take a risk on the listener's behalf. An algorithm plays what you are likely to finish. I play what I think you ought to hear, which is a far more arrogant position, and I'm aware of that." },
      { speaker: "Host", text: "Arrogant is your word, not mine." },
      { speaker: "Ms Lund", text: "It's the right one. My only defense is that I tell you why. Every record comes with a sentence about the reason it's there, which is the part people write in about." },
      { speaker: "Host", text: "Do listeners ever object?" },
      { speaker: "Ms Lund", text: "Constantly, and I read those letters on air. A show in which nobody ever disagrees with the presenter would be a show nobody was really listening to." },
      { speaker: "Ms Lund", text: "Last winter a man wrote to say that a record I had defended for ten minutes was the worst thing he'd heard all year. I played it again the next week, with his letter." },
      { speaker: "Host", text: "Streaming services now employ human editors as well." },
      { speaker: "Ms Lund", text: "They do, and some are excellent. But their names are rarely shown, so there's nobody to whom a listener can reply. Curation without a signature is just another algorithm." },
      { speaker: "Host", text: "What would you change about those services if you could?" },
      { speaker: "Ms Lund", text: "One thing. Show me who chose the song and let me follow them, the way I'd follow a writer whose reviews I trust." },
    ],
    questions: [
      {
        text: "What does Ms Lund say an algorithm plays?",
        options: [
          "whatever is newest",
          "what the presenter prefers",
          "what you are likely to finish",
        ],
        answer: 2,
        explain: "„An algorithm plays what you are likely to finish.“ — kendisi duyman gerektiğini düşündüğünü çalıyor.",
      },
      {
        text: "What is her only defense of her “arrogant” position?",
        options: [
          "She plays only well-known records.",
          "She explains why each record is there.",
          "She lets listeners vote on the list.",
        ],
        answer: 1,
        explain: "„My only defense is that I tell you why.“",
      },
      {
        kind: "truefalse",
        text: "Ms Lund refuses to read listeners' complaints on air.",
        options: ["True", "False"],
        answer: 1,
        explain: "Tam tersi: „I read those letters on air.“",
      },
      {
        kind: "gapfill",
        text: "She has presented the show for ___ years.",
        options: [],
        answer: 0,
        accept: ["nineteen", "19"],
        explain: "„the same late-night music show for nineteen years“.",
      },
      {
        kind: "short_answer",
        text: "What does she call curation without a signature?",
        options: [],
        answer: 0,
        accept: ["just another algorithm", "another algorithm", "an algorithm"],
        explain: "Editörlerin adı görünmüyorsa dinleyicinin cevap verebileceği kimse yok.",
      },
      {
        text: "What would she change about streaming services?",
        options: [
          "show who chose each song",
          "remove the human editors",
          "play fewer new records",
        ],
        answer: 0,
        explain: "Şarkıyı kimin seçtiğini göstermek ve onu, güvendiği bir eleştirmen gibi takip edebilmek.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-lib-w14",
    course: "en",
    level: "C1",
    skill: "writing",
    title: "An Album Somebody Chose for Me",
    genre: "review",
    intro: "Başkasının senin için seçtiği bir albümü değerlendiriyorsun: önce iki cümle kur, sonra neden dinlemeyi sürdürdüğünü anlatan bir yazı yaz.",
    gloss: [
      { de: "track", tr: "parça" },
      { de: "to owe", tr: "borçlu olmak" },
      { de: "to reward", tr: "karşılığını vermek" },
      { de: "patience", tr: "sabır" },
      { de: "unfamiliar", tr: "yabancı" },
      { de: "to recommend", tr: "tavsiye etmek" },
    ],
    minutes: 16,
    tasks: [
      {
        kind: "build",
        tr: "Bu albümü borçlu olduğum arkadaşım, notunda seçimini açıkladı.",
        answer: "In her note, the friend to whom I owe this album explained her choice.",
        alternatives: ["The friend to whom I owe this album explained her choice in her note."],
        hint: "Resmî yazıda edat ilgi zamirinin önüne gelir: „to whom“; gündelikte „who I owe it to“ denir.",
      },
      {
        kind: "build",
        tr: "İlk başta açılış parçasını sevmedim, bu yüzden neredeyse bırakıyordum.",
        answer: "At first I disliked the opening track, which is why I nearly stopped.",
        alternatives: ["I disliked the opening track at first, which is why I nearly stopped."],
        hint: "Virgülden sonraki „which“ önceki cümlenin tamamını gösterir; burada „that“ kullanılamaz.",
      },
      {
        kind: "free",
        prompt:
          "Başka birinin senin için seçtiği bir albümü değerlendir: kimin ve neden seçtiğini söyle, ilk izlenimini dürüstçe anlat, fikrinin nerede değiştiğini göster, kimlere önereceğini ve kimlere önermeyeceğini yaz.",
        checklist: [
          "Albümü kimin ve neden seçtiğini söyle",
          "İlk izlenimini dürüstçe anlat",
          "Fikrinin nerede ve neden değiştiğini göster",
          "Kime önerip kime önermeyeceğini yaz",
        ],
        minWords: 160,
        phrases: [
          { de: "This is not an album I would have chosen myself.", tr: "Bu kendi başıma seçeceğim bir albüm değil.", en: "" },
          { de: "The friend to whom I owe it …", tr: "Onu borçlu olduğum arkadaşım …", en: "" },
          { de: "…, which is why …", tr: "…, bu yüzden …", en: "" },
          { de: "Somewhere around the … track, …", tr: "Aşağı yukarı … parçada …", en: "" },
          { de: "I would recommend it to anyone who …, but not to …", tr: "… olan herkese tavsiye ederim ama …'e değil", en: "" },
        ],
        sample:
          "This is not an album I would have chosen myself. It is forty minutes of slow piano and field " +
          "recordings, a combination that I would normally skip within the first thirty seconds. " +
          "The friend to whom I owe it gave it to me with a note that said only: listen to it twice, in the " +
          "dark, before you decide.\n\n" +
          "At first I disliked the opening track, which is why I nearly stopped. It seemed to be going " +
          "nowhere, and the sounds behind the piano, rain and a distant train, felt like decoration. " +
          "Somewhere around the fourth track, however, I realized that the recordings were not decoration at " +
          "all. Each one is a place in which the pianist once lived, and the music changes to answer it. " +
          "Once I understood that, the album stopped being slow and started being patient, which is not the " +
          "same thing.\n\n" +
          "It rewards attention and punishes background listening, which is how I first heard it, and that was " +
          "my mistake rather than the album's. I would recommend it to anyone who has an hour, headphones and a willingness to be " +
          "bored for ten minutes, but not to anyone looking for music to work to. " +
          "Three and a half stars for the music, and a full five for the note.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-c1-lib-s14",
    course: "en",
    level: "C1",
    skill: "speaking",
    title: "Do Recommendations Narrow Our Taste?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: öneri sistemlerinin zevki daraltıp daraltmadığını tart ve kendi pratiğini söyle.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Öneri sistemleri zevkimizi daraltıyor mu? Konumunu söyle, sistemlerin gerçekten iyi yaptığı şeyi kabul et, asıl kaybın ne olduğunu adlandır ve kendi uyguladığın ya da önerdiğin bir düzeni anlat.",
      bulletsTr: [
        "Konumunu tek cümleyle söyle",
        "Sistemlerin gerçekten iyi yaptığı şeyi kabul et",
        "Asıl kaybı adlandır",
        "Uyguladığın ya da önerdiğin bir düzeni anlat",
      ],
      targets: [
        { de: "My answer is yes, but not for the reason usually given.", tr: "Cevabım evet ama genelde söylenen sebeple değil." },
        { de: "What these systems do well, and I don't want to deny it, is …", tr: "Bu sistemlerin iyi yaptığı ve inkâr etmek istemediğim şey …" },
        { de: "The loss is something to which we rarely give a name: …", tr: "Kayıp, nadiren ad verdiğimiz bir şey: …" },
        { de: "…, which is why I now …", tr: "…, bu yüzden artık …" },
      ],
      minSeconds: 60,
      maxSeconds: 100,
      sampleDe:
        "My answer is yes, but not for the reason usually given. People say the systems trap us in the same " +
        "songs or the same films, and that isn't quite true; they are rather good at finding things we have " +
        "never heard of. " +
        "What these systems do well, and I don't want to deny it, is remove the cost of trying something. " +
        "Nothing has to be bought, carried home or finished. " +
        "The loss is something to which we rarely give a name: the experience of disliking something and " +
        "staying with it anyway. " +
        "A system is built to avoid that moment, because a skip is a failure by its own measure. " +
        "But a great deal of what I now love, I disliked the first time, and I only came back because " +
        "someone I respected had told me it was worth it. " +
        "No machine has ever given me a reason, only a probability. " +
        "That is the difference I care about, which is why I now keep one evening a week for things a person " +
        "chose for me, and I try to finish them even when I am bored. " +
        "I don't pretend this is a solution for everyone. It is simply the only method I have found in which " +
        "I still get surprised.",
      rubricHint:
        "Koşullu bir konum, sistemin gücünün kabulü, kaybın adlandırılması ve somut bir düzen beklenir; „to which“, „in which“, „…, which is why“ gibi ileri ilgi yapıları kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-c1-lib-g14",
    course: "en",
    level: "C1",
    skill: "grammar",
    title: "to whom, whereby, which is why",
    genre: "grammar",
    intro: "İlgi cümlesinin resmî yüzü: edat öne geçer, bir isim yerine bütün bir cümleye bağlanılır, „whereby“ bir düzeni tanımlar.",
    focus: "İleri ilgi yapıları: edat + which/whom, whereby, some of which, cümleye dönük which (B2'deki defining/non-defining'in ötesi)",
    gloss: [
      { de: "stranger", tr: "yabancı" },
      { de: "comfort", tr: "rahatlık" },
      { de: "whereby", tr: "aracılığıyla" },
      { de: "album", tr: "albüm" },
    ],
    minutes: 12,
    explanation: [
      {
        heading: "Edat öne geçer: to whom, in which",
        tr: "Gündelik İngilizcede edat ilgi cümlesinin sonunda kalır: „the person I lent it to“. Resmî yazıda edat ilgi zamirinin önüne alınır ve o zaman yalnız „whom“ (insan) ya da „which“ (nesne) kullanılabilir: „the person to whom I lent it“. Edattan sonra „that“ ya da „who“ gelmez. B2'de öğrenilen ayrım virgül sorusuydu; buradaki soru kayıt ve edatın yeridir.",
        examples: [
          { de: "The stranger to whom the library had lent it left a note.", tr: "Kütüphanenin onu ödünç verdiği yabancı bir not bırakmıştı.", note: "resmî: to whom" },
          { de: "The stranger the library had lent it to left a note.", tr: "Kütüphanenin onu ödünç verdiği yabancı bir not bırakmıştı.", note: "gündelik: edat sonda" },
          { de: "It is a comfort in which nothing is ever new.", tr: "Hiçbir şeyin yeni olmadığı bir rahatlık bu.", note: "in which" },
        ],
      },
      {
        heading: "whereby ve some of which",
        tr: "„whereby“ „by which“ anlamındadır ve bir düzeni, yöntemi ya da anlaşmayı tanımlar: „a system whereby each song is chosen …“. Miktar sözcükleri de ilgi zamiriyle birleşir: „some of which“, „none of whom“, „the edges of which“. Bu kalıplar ikinci bir cümle kurmadan bilgi ekler ve akademik ile kurumsal metinde sıktır.",
        examples: [
          { de: "They use a system whereby each song follows the last.", tr: "Her şarkının bir öncekini izlediği bir sistem kullanıyorlar.", note: "whereby = by which" },
          { de: "I heard forty albums, some of which I switched off.", tr: "Kırk albüm dinledim, bazılarını kapattım.", note: "some of which" },
          { de: "Six volunteers applied, none of whom had any experience.", tr: "Altı gönüllü başvurdu, hiçbirinin deneyimi yoktu.", note: "none of whom" },
        ],
      },
      {
        heading: "Cümleye dönük which",
        tr: "Virgülden sonra gelen „which“ bazen bir ismi değil, önceki cümlenin tamamını gösterir: „It rarely played anything I disliked, which bothered me.“ Rahatsız eden şey bir şarkı değil, durumun kendisidir. Bu kullanımda „that“ ya da „what“ gelmez. „…, which is why …“ gerekçe bağlamanın kısa ve doğal yoludur.",
        examples: [
          { de: "The system was very good, which is exactly the problem.", tr: "Sistem çok iyiydi; sorun da tam buydu.", note: "which = önceki cümle" },
          { de: "Nobody signs the lists, which is why nobody can be answered.", tr: "Listeleri kimse imzalamıyor; bu yüzden kimseye cevap verilemiyor.", note: "which is why" },
          { de: "She read the complaints on air, which surprised everyone.", tr: "Şikâyetleri yayında okudu, bu herkesi şaşırttı.", note: "olayın tamamı" },
        ],
      },
    ],
    questions: [
      {
        text: "The stranger ___ the library had lent the album left a note.",
        options: ["to that", "to whom", "to who"],
        answer: 1,
        explain: "Edattan sonra insan için yalnız „whom“ gelir.",
      },
      {
        text: "In “The system was very good, which is exactly the problem”, what does “which” refer to?",
        options: [
          "the whole previous clause",
          "the word “system”",
          "the word “problem”",
        ],
        answer: 0,
        explain: "Cümleye dönük „which“ önceki cümlenin tamamını gösterir.",
      },
      {
        text: "They use a system ___ each song follows the last.",
        options: ["which", "what", "whereby"],
        answer: 2,
        explain: "Bir düzen tanımlanıyor: „whereby“ = „by which“.",
      },
      {
        kind: "gapfill",
        text: "It is a comfort in ___ nothing is ever new.",
        options: [],
        answer: 0,
        accept: ["which"],
        explain: "Nesne için edattan sonra „which“ gelir; „that“ gelmez.",
      },
      {
        kind: "gapfill",
        text: "I heard forty albums, some of ___ I switched off.",
        options: [],
        answer: 0,
        accept: ["which"],
        explain: "Miktar sözcüğü + „of which“ nesneler için.",
      },
      {
        kind: "gapfill",
        text: "Six volunteers applied, none of ___ had any experience.",
        options: [],
        answer: 0,
        accept: ["whom"],
        explain: "İnsanlar için „of whom“ kullanılır.",
      },
      {
        kind: "gapfill",
        text: "Nobody signs the lists, which is ___ nobody can be answered.",
        options: [],
        answer: 0,
        accept: ["why"],
        explain: "„…, which is why …“ gerekçeyi önceki cümlenin tamamına bağlar.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["She read", "the complaints on air", "which", "surprised everyone"],
        explain: "Virgülden sonra cümleye dönük „which“ ve yüklemi.",
      },
      {
        kind: "truefalse",
        text: "“The person to who I lent it” — Bu ifade doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "Edattan sonra „who“ değil „whom“ gelir: „to whom I lent it“.",
      },
      {
        kind: "truefalse",
        text: "“The person I lent it to” — Bu ifade gündelik İngilizcede doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Gündelik dilde edat sonda kalabilir ve ilgi zamiri düşer.",
      },
    ],
  },
];
