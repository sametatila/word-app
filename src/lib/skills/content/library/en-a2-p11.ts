import type { SkillExercise } from "../../types";

/**
 * EN · A2 — Beceriler kütüphanesi, parti 11.
 *
 * Hücreleri YİRMİYE tamamlayan partilerden biri (p11–p20). A2'de okuma ve
 * dinleme hücreleri 17'de, yazma 13'te, konuşma ve dil bilgisi 10'da
 * duruyordu (mobil partisi + p1–p10): okuma ve dinleme p11–p13'le, yazma
 * p11–p17'yle, konuşma ve dil bilgisi p11–p20'yle yirmiye çıkar. Bu parti
 * beş becerinin HEPSİNİ taşır. Kurallar ve emsal: `en-a2.ts` (parti 1) ve
 * `data/content/SPEC.md`.
 *
 * Parti 11 yolculuk ve ev takası hattı: iki ailenin evlerini takas ettiği
 * yerel haber, bir feribot anonsu, ayrılırken ev sahiplerine bırakılan
 * teşekkür mektubu. Söyleyiş odağı düzensiz fiillerde geçmişi taşıyan ünlü
 * değişimi (run / ran); dil bilgisi soru sonunda kalan edat (Who … with?).
 */
export const enA2P11: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a2-lib-r11",
    course: "en",
    level: "A2",
    skill: "reading",
    title: "Two Weeks in Someone Else's Home",
    genre: "article",
    intro: "Yazın evlerini iki haftalığına başka bir aileyle takas eden bir aileyi anlatan yerel haberi okuyacaksın.",
    gloss: [
      { de: "swap", tr: "takas etmek" },
      { de: "website", tr: "web sitesi" },
      { de: "switch", tr: "şalter" },
      { de: "neighbor", tr: "komşu" },
      { de: "invite", tr: "davet etmek" },
      { de: "jar", tr: "kavanoz" },
      { de: "honey", tr: "bal" },
      { de: "French", tr: "Fransız" },
    ],
    minutes: 5,
    text:
      "TWO WEEKS IN SOMEONE ELSE'S HOME\n\n" +
      "Last summer the Kaya family from Bursa tried something new: they swapped homes with a family from Lyon for " +
      "two weeks. Nobody paid any money. The French family stayed in the Kayas' apartment, and the Kayas stayed in a small " +
      "house with a garden in Lyon.\n\n" +
      "“We found them on a website in March,” says Deniz Kaya. “We wrote to each other for two months before we said yes.”\n\n" +
      "Not everything was easy. On the first evening the family was having dinner outside when all the lights in the " +
      "house went off. They looked for the switch for an hour. In the end, the man next door showed them where it was.\n\n" +
      "“The best part was the neighbors,” says Deniz. “While we were living there, they invited us to dinner three times.”\n\n" +
      "The French family had a good time, too. They left a thank-you card and a jar of honey on the kitchen table.\n\n" +
      "Would the Kayas do it again? “Yes, but next time we will ask more questions before we arrive.”",
    questions: [
      {
        text: "What is the article about?",
        options: [
          "a French family that moved to Bursa",
          "a family that lived in another family's home",
          "a family that bought a small house in Lyon",
        ],
        answer: 1,
        explain: "„They swapped homes with a family from Lyon for two weeks. Nobody paid any money.“ — ev satın alınmadı, taşınılmadı.",
      },
      {
        text: "What happened on the first evening?",
        options: [
          "A neighbor came to eat in the garden.",
          "The family could not find the house.",
          "The lights went off during dinner.",
        ],
        answer: 2,
        explain: "„… the family was having dinner outside when all the lights in the house went off.“",
      },
      {
        kind: "truefalse",
        text: "The Kayas paid the French family for the house.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Nobody paid any money.“ — takasta para ödenmedi.",
      },
      {
        kind: "gapfill",
        text: "The two families wrote to each other for two ___ before they said yes.",
        options: [],
        answer: 0,
        accept: ["months"],
        explain: "„We wrote to each other for two months before we said yes.“",
      },
      {
        kind: "short_answer",
        text: "What did the French family leave on the kitchen table?",
        options: [],
        answer: 0,
        accept: ["a card and honey", "a thank-you card and a jar of honey", "a card and a jar of honey", "a thank-you card and honey", "a jar of honey and a card", "honey and a card"],
        explain: "„They left a thank-you card and a jar of honey on the kitchen table.“",
      },
      {
        text: "What will the Kayas do differently next time?",
        options: [
          "ask more questions before they go",
          "stay for a shorter time",
          "choose an apartment without a garden",
        ],
        answer: 0,
        explain: "„Yes, but next time we will ask more questions before we arrive.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a2-lib-l11",
    course: "en",
    level: "A2",
    skill: "listening",
    title: "Welcome on Board",
    genre: "info",
    intro: "Adaya giden bir feribotta kalkıştan sonra yapılan anonsu dinleyeceksin: yolculuk ne kadar sürüyor, çantalar nereye, kime ne dikkat etmeli.",
    gloss: [
      { de: "ferry", tr: "feribot" },
      { de: "island", tr: "ada" },
      { de: "adult", tr: "yetişkin" },
      { de: "wet", tr: "ıslak" },
      { de: "sick", tr: "hasta" },
      { de: "middle", tr: "orta" },
      { de: "ladies and gentlemen", tr: "hanımlar beyler" },
      { de: "ship", tr: "gemi" },
      { de: "wind", tr: "rüzgâr" },
      { de: "top floor", tr: "en üst kat" },
    ],
    minutes: 5,
    segments: [
      { text: "Good morning, ladies and gentlemen, and welcome on board the Blue Star ferry to Castle Island." },
      { text: "The trip takes one hour and forty minutes. We stop once, at Green Point, where some passengers get off." },
      { text: "Please keep your bags with you or put them in the room behind the café. Do not leave them on the stairs." },
      { text: "Children must stay with an adult when they are outside on the top floor of the ship. The floor can be wet." },
      { text: "Today there is some wind, so the front of the ship moves more than usual. If you feel sick, sit in the middle." },
      { text: "Tickets for the island bus are on sale at the café. They are two euros cheaper here than on the bus." },
      { text: "The café closes at half past ten. We arrive at Castle Island at ten fifty. Thank you, and have a good trip." },
    ],
    questions: [
      {
        text: "Where is the ferry going?",
        options: ["to Green Point only", "back to the city", "to Castle Island"],
        answer: 2,
        explain: "„Welcome on board the Blue Star ferry to Castle Island.“ Green Point yalnız ara durak.",
      },
      {
        text: "Where can passengers leave their bags?",
        options: ["in the room behind the café", "on the stairs near the door", "on the top floor of the ship"],
        answer: 0,
        explain: "„… put them in the room behind the café. Do not leave them on the stairs.“",
      },
      {
        kind: "truefalse",
        text: "Children can go outside on the top floor alone.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Children must stay with an adult when they are outside on the top floor of the ship.“",
      },
      {
        kind: "short_answer",
        text: "Where should you sit if you feel sick?",
        options: [],
        answer: 0,
        accept: ["in the middle", "the middle", "in the middle of the ship"],
        explain: "„If you feel sick, sit in the middle.“ — önde gemi daha çok sallanıyor.",
      },
      {
        kind: "dictation",
        text: "Üst kattaki tehlikeyi söyleyen kısa cümleyi duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["The floor can be wet.", "The floor can be wet"],
        explain: "„The floor can be wet.“ — „can“ burada bir olasılık bildiriyor.",
      },
      {
        text: "Why should passengers buy bus tickets at the café?",
        options: [
          "The bus does not sell tickets.",
          "They cost less there.",
          "The café is open all day.",
        ],
        answer: 1,
        explain: "„They are two euros cheaper here than on the bus.“ Kafe de on buçukta kapanıyor.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-lib-w11",
    course: "en",
    level: "A2",
    skill: "writing",
    title: "Thank You for Your Home",
    genre: "letter",
    intro: "Ev takasıyla iki hafta başka bir ailenin evinde kaldın; önce iki cümle kur, sonra ayrılırken masaya bırakacağın mektubu yaz.",
    gloss: [
      { de: "cupboard", tr: "dolap" },
      { de: "plant", tr: "bitki" },
      { de: "glass", tr: "bardak" },
      { de: "key", tr: "anahtar" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Biz kahvaltı yaparken komşunuz kapıyı çaldı.",
        answer: "While we were having breakfast, your neighbor knocked on the door.",
        alternatives: ["Your neighbor knocked on the door while we were having breakfast."],
        hint: "Süren olay past continuous (were having), araya giren kısa olay past simple (knocked) alır; „while“ cümlesi baştaysa virgül konur.",
      },
      {
        kind: "build",
        tr: "Bir bardak kırdık ama yenisini aldık.",
        answer: "We broke a glass, but we bought a new one.",
        alternatives: ["We broke a glass but we bought a new one."],
        hint: "break → broke, buy → bought düzensizdir; „one“ az önce geçen ismi tekrar etmemek için kullanılır.",
      },
      {
        kind: "free",
        prompt:
          "Ev takasıyla iki hafta başka bir ailenin evinde kaldın. Ayrılmadan önce masaya bırakacağın bir mektup yaz: teşekkür et, evde en çok neyi sevdiğinizi söyle, küçük bir aksaklığı ve ne yaptığını anlat, anahtarı nereye bıraktığını yaz.",
        checklist: [
          "Teşekkür et ve kısa bir selamla başla",
          "En çok neyi sevdiğinizi geçmiş zamanla anlat",
          "Bir aksaklığı ve ne yaptığını söyle",
          "Anahtarın yerini yaz ve iyi bir dilekle bitir",
        ],
        minWords: 40,
        phrases: [
          { de: "Thank you for your home.", tr: "Eviniz için teşekkürler." },
          { de: "We really enjoyed …", tr: "…'den çok keyif aldık" },
          { de: "One small problem: …", tr: "Küçük bir sorun: …" },
          { de: "The key is in …", tr: "Anahtar …'de" },
          { de: "We hope you enjoyed …, too.", tr: "Umarız siz de …'den keyif almışsınızdır." },
        ],
        sample:
          "Dear Clara and Marc, thank you for your home. We really enjoyed the two weeks here. The children loved the " +
          "garden, and we ate outside almost every evening. Mrs Blanc next door was very kind: on Tuesday she brought " +
          "us a big bag of tomatoes from her garden. One small problem: we broke a glass, but we bought a new one at the " +
          "market. It is in the cupboard with the others. We watered the plants every morning, and the fridge is clean " +
          "and empty. The key is in the green box next to the door. We hope you enjoyed Bursa, too! Best wishes, Deniz and family",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a2-lib-s11",
    course: "en",
    level: "A2",
    skill: "speaking",
    title: "run or ran?",
    genre: "pronounce",
    intro: "Pek çok düzensiz fiilde geçmişi yalnız ünlü taşır: run – ran, sit – sat, come – came. Ünlüyü net söylemezsen dinleyen olayın bugün mü geçmişte mi olduğunu anlayamaz.",
    gloss: [
      { de: "sit", tr: "oturmak" },
      { de: "swim", tr: "yüzmek" },
      { de: "begin", tr: "başlamak" },
      { de: "give", tr: "vermek" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "We ran to the station.",
        tr: "İstasyona koştuk.",
        hint: "„ran“ = REN: ağız geniş açık, e'ye yakın. „run“ ise kısa a: RAN. Zamanı bu tek ünlü söylüyor.",
        confusions: [
          { heard: ["We run to the station"], fix: "Geçmişte ünlü değişir: ağzı daha çok açıp REN de.", expected: "ran" },
        ],
      },
      {
        de: "She sat next to me.",
        tr: "Yanıma oturdu.",
        hint: "„sat“ = SET (geniş e), „sit“ = SİT (kısa i). Farkı ağzın açıklığı yapar.",
        confusions: [
          { heard: ["She sit next to me"], fix: "i'yi geniş bir e'ye çevir: set.", expected: "sat" },
        ],
      },
      {
        de: "They came home late.",
        tr: "Eve geç geldiler.",
        hint: "„came“ = KEYM, e'den y'ye kayar. „come“ ise kısa KAM.",
        confusions: [
          { heard: ["They come home late"], fix: "Geçmişte ünlü uzar ve kayar: keym.", expected: "came" },
        ],
      },
      {
        de: "I swam in the lake.",
        tr: "Gölde yüzdüm.",
        hint: "„swam“ = SWEM, „swim“ = SWİM. s ile w arasına ünlü koyma.",
        confusions: [
          { heard: ["I swim in the lake"], fix: "Kısa i yerine geniş e: swem.", expected: "swam" },
        ],
      },
      {
        de: "The film began at nine.",
        tr: "Film dokuzda başladı.",
        hint: "„began“ = bi-GEN, „begin“ = bi-GİN. Vurgu ikinci hecede, değişen ünlü de orada.",
        confusions: [
          { heard: ["The film begin at nine"], fix: "Vurgulu hecedeki ünlüyü aç: bi-GEN.", expected: "began" },
        ],
      },
      {
        de: "We gave them the keys.",
        tr: "Anahtarları onlara verdik.",
        hint: "„gave“ = GEYV, „give“ = GİV. İkisi de v ile biter; yalnız ünlü değişir.",
        confusions: [
          { heard: ["We give them the keys"], fix: "Kısa i yerine kayan ey: geyv.", expected: "gave" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a2-lib-g11",
    course: "en",
    level: "A2",
    skill: "grammar",
    title: "Who are you traveling with?",
    genre: "grammar",
    intro: "Türkçede „kiminle, nereden, ne için“ tek bir soru sözcüğüdür; İngilizcede edat soru sözcüğünden ayrılır ve sorunun SONUNA gider.",
    focus: "Soru sonunda edat: Where … from?, Who … with?, What … for?, What … about?",
    gloss: [
      { de: "travel", tr: "seyahat etmek" },
      { de: "button", tr: "düğme" },
      { de: "lunch", tr: "öğle yemeği" },
      { de: "look at", tr: "bakmak" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "Edat sona gider",
        tr: "Türkçedeki „kiminle“ İngilizcede iki parçaya ayrılır: soru başında „who“, sonunda „with“. Aynısı „nereden“ (where … from) ve „neye“ (what … at) için de geçerli. Gündelik dilde edat başa alınmaz.",
        examples: [
          { de: "Who are you traveling with?", tr: "Kiminle seyahat ediyorsun?", note: "who … with" },
          { de: "Where is your friend from?", tr: "Arkadaşın nereli?", note: "where … from" },
          { de: "What are you looking at?", tr: "Neye bakıyorsun?", note: "what … at" },
        ],
      },
      {
        heading: "İki kelimelik kısa sorular",
        tr: "Konuşmada birinin söylediğine kısa bir soruyla karşılık verirken soru sözcüğü ile edat yan yana gelir: Who with? What for? Where to? Burada da sıra değişmez: önce soru sözcüğü, sonra edat.",
        examples: [
          { de: "I'm going to the bank. — What for?", tr: "Bankaya gidiyorum. — Ne için?" },
          { de: "I had lunch with a friend. — Who with?", tr: "Bir arkadaşla öğle yemeği yedim. — Kiminle?" },
          { de: "We're flying tomorrow. — Where to?", tr: "Yarın uçuyoruz. — Nereye?" },
        ],
      },
      {
        heading: "Fiil ile edat birlikte",
        tr: "Bazı fiiller edatla birlikte anlam taşır: talk about, wait for, look at, listen to. Soruda fiil ortada kalır, edat yine sona gider. „What is it for?“ ise bir şeyin ne işe yaradığını sorar.",
        examples: [
          { de: "What are you talking about?", tr: "Neden bahsediyorsun?", note: "talk about" },
          { de: "Who is she waiting for?", tr: "Kimi bekliyor?", note: "wait for" },
          { de: "What is this button for?", tr: "Bu düğme ne işe yarıyor?" },
        ],
      },
    ],
    questions: [
      {
        text: "___ are you from?",
        options: ["Where", "What", "Who"],
        answer: 0,
        explain: "Memleket „where … from“ ile sorulur.",
      },
      {
        text: "Which question is correct?",
        options: ["Who with are you going?", "Who are you going with?", "Who are you with going?"],
        answer: 1,
        explain: "Edat sorunun en sonuna gider: Who are you going with?",
      },
      {
        text: "What is this button ___?",
        options: ["to", "with", "for"],
        answer: 2,
        explain: "Bir şeyin ne işe yaradığını „What is it for?“ sorar.",
      },
      {
        kind: "gapfill",
        text: "Who did you have lunch ___?",
        options: [],
        answer: 0,
        accept: ["with"],
        explain: "„Kiminle“ = who … with; edat sonda.",
      },
      {
        kind: "gapfill",
        text: "What are you talking ___?",
        options: [],
        answer: 0,
        accept: ["about"],
        explain: "Fiil „talk about“; edat sorunun sonunda kalır.",
      },
      {
        kind: "gapfill",
        text: "Where does your teacher come ___?",
        options: [],
        answer: 0,
        accept: ["from"],
        explain: "„come from“ = …'li olmak; soruda from sona gider.",
      },
      {
        kind: "gapfill",
        text: "I'm going to the bank. — What ___?",
        options: [],
        answer: 0,
        accept: ["for"],
        explain: "Amacı soran kısa soru: What for?",
      },
      {
        kind: "order",
        text: "Soruyu doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Who", "is", "she", "waiting", "for?"],
        explain: "Soru sözcüğü başta, edat sonda: Who is she waiting for?",
      },
      {
        kind: "truefalse",
        text: "„What are you listening to?“ — Bu soru doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "„listen to“ edatı sorunun sonunda; soru doğru.",
      },
      {
        kind: "truefalse",
        text: "„Who are you waiting?“ (Kimi bekliyorsun?) — Bu soru doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„wait“ edatla kullanılır: Who are you waiting for?",
      },
    ],
  },
];
