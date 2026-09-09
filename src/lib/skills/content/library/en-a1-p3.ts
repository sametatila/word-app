import type { SkillExercise } from "../../types";

/**
 * EN · A1 — Beceriler kütüphanesi, parti 3.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 3. seti taşır (kimlik sonu 3).
 * Kurallar ve emsal: `en-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Alan adı `de` İngilizce metni taşır; `en` alanı bu kursta yazılmaz.
 * Türler: tarif, müze anonsu ve kısa mesaj. Söyleyiş odağı w/v ayrımı;
 * dil bilgisi present continuous ile present simple farkı.
 */
export const enA1P3: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a1-lib-r3",
    course: "en",
    level: "A1",
    skill: "reading",
    title: "Lemon Cake — Easy and Fast",
    genre: "guide",
    intro: "Basit bir kek tarifini okuyacaksın: neler gerekiyor, sıra nasıl, sonunda ne öneriliyor.",
    gloss: [
      { de: "flour", tr: "un" },
      { de: "oil", tr: "yağ" },
      { de: "mix", tr: "karıştırmak" },
      { de: "oven", tr: "fırın" },
      { de: "juice", tr: "meyve suyu" },
      { de: "bake", tr: "pişirmek" },
    ],
    minutes: 4,
    text:
      "LEMON CAKE — EASY AND FAST\n\n" +
      "You need: two eggs, one cup of sugar, one cup of flour, half a cup of oil, one lemon and a little salt.\n\n" +
      "First, put the oven on at one hundred and eighty degrees.\n" +
      "Then mix the eggs and the sugar for two minutes.\n" +
      "Add the oil, the flour and the salt. Mix again.\n" +
      "Now wash the lemon. Put the juice and a little skin in the bowl.\n" +
      "Put everything in a small pan and bake it for thirty-five minutes.\n\n" +
      "Wait ten minutes before you cut it. This cake is very good with tea.",
    questions: [
      {
        text: "What is this text?",
        options: ["a recipe for a cake", "a menu in a café", "an ad for a shop"],
        answer: 0,
        explain: "Önce malzemeler, sonra adımlar geliyor — bu bir tarif.",
      },
      {
        text: "What do you mix first?",
        options: ["the eggs and the sugar", "the oil and the flour", "the lemon and the salt"],
        answer: 0,
        explain: "„Then mix the eggs and the sugar for two minutes.“ Yağ ve un sonra ekleniyor.",
      },
      {
        kind: "truefalse",
        text: "You need milk for this cake.",
        options: ["True", "False"],
        answer: 1,
        explain: "Malzeme listesinde süt yok: yumurta, şeker, un, yağ, limon ve tuz.",
      },
      {
        kind: "gapfill",
        text: "The oven is at ___ degrees.",
        options: [],
        answer: 0,
        accept: ["one hundred and eighty", "180"],
        explain: "„First, put the oven on at one hundred and eighty degrees.“",
      },
      {
        kind: "short_answer",
        text: "What do you do before you cut the cake?",
        options: [],
        answer: 0,
        accept: ["wait ten minutes", "wait 10 minutes", "you wait ten minutes"],
        explain: "„Wait ten minutes before you cut it.“",
      },
      {
        text: "How long does the cake bake?",
        options: ["thirty-five minutes", "twenty-five minutes", "forty-five minutes"],
        answer: 0,
        explain: "„… bake it for thirty-five minutes.“ İki dakika karıştırma, on dakika bekleme süresi.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a1-lib-l3",
    course: "en",
    level: "A1",
    skill: "listening",
    title: "The Museum Closes in Twenty Minutes",
    genre: "phone",
    intro: "Müzede kapanış anonsunu dinleyeceksin: hangi kat önce kapanıyor, mağaza ne zamana kadar açık, yarın ne var.",
    gloss: [
      { de: "floor", tr: "kat" },
      { de: "cloakroom", tr: "vestiyer" },
      { de: "forget", tr: "unutmak" },
      { de: "visit", tr: "ziyaret" },
      { de: "map", tr: "harita" },
      { de: "leave", tr: "çıkmak" },
    ],
    minutes: 4,
    segments: [
      { text: "Good afternoon, everyone. The museum closes in twenty minutes, at six o'clock." },
      { text: "Please leave the rooms on the second floor now. That floor closes first." },
      { text: "The shop is open until ten past six. Today all books are five euros." },
      { text: "Do not forget your coats and bags. The cloakroom closes at six." },
      { text: "Tomorrow we open at ten. The new room about old maps opens on Saturday." },
      { text: "Thank you for your visit. We hope to see you again soon." },
    ],
    questions: [
      {
        text: "Where are the people?",
        options: ["in a museum", "in a library", "in a big shop"],
        answer: 0,
        explain: "„The museum closes in twenty minutes“ ve vestiyer, katlar, harita odası — sahne bir müze.",
      },
      {
        text: "Which floor closes first?",
        options: ["the second floor", "the first floor", "the ground floor"],
        answer: 0,
        explain: "„Please leave the rooms on the second floor now. That floor closes first.“",
      },
      {
        kind: "truefalse",
        text: "The shop is open longer than the museum.",
        options: ["True", "False"],
        answer: 0,
        explain: "„The museum closes … at six o'clock“ ama „The shop is open until ten past six.“",
      },
      {
        kind: "short_answer",
        text: "How much are the books today?",
        options: [],
        answer: 0,
        accept: ["five euros", "5 euros", "five"],
        explain: "„Today all books are five euros.“",
      },
      {
        kind: "dictation",
        text: "Yarınki açılış saatini söyleyen cümleyi duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Tomorrow we open at ten.", "Tomorrow we open at ten"],
        explain: "„Tomorrow we open at ten.“ — zaman ifadesi cümle başında da durabilir.",
      },
      {
        text: "What opens on Saturday?",
        options: ["a new room about old maps", "a new shop for books and gifts", "a bigger cloakroom by the door"],
        answer: 0,
        explain: "„The new room about old maps opens on Saturday.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-lib-w3",
    course: "en",
    level: "A1",
    skill: "writing",
    title: "I Am Late",
    genre: "message",
    intro: "Arkadaşın seni bekliyor ama geciktin; önce iki cümle kur, sonra ona kısa bir mesaj yaz.",
    gloss: [
      { de: "late", tr: "geç" },
      { de: "wait", tr: "beklemek" },
      { de: "order", tr: "ısmarlamak" },
      { de: "outside", tr: "dışarıda" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Bugün yirmi dakika geç kaldım.",
        answer: "Today I am twenty minutes late.",
        alternatives: ["I am twenty minutes late today."],
        hint: "„be“ + süre + late kalıbı yeter; zaman ifadesi başta da sonda da durabilir.",
      },
      {
        kind: "build",
        tr: "Lütfen benim için bir çay ısmarla.",
        answer: "Please order a tea for me.",
        alternatives: ["Order a tea for me, please."],
        hint: "Emir cümlesi özne almaz; kime yapıldığını „for me“ ile ya da doğrudan „me“ ile söylersin.",
      },
      {
        kind: "free",
        prompt:
          "Arkadaşın seni bekliyor ama geciktin. Ona mesaj yaz: geç kaldığını söyle, nedenini yaz, ne kadar geç kalacağını belirt, o sırada ne yapmasını istediğini söyle ve özür dile.",
        checklist: [
          "Geç kaldığını ve nedenini yaz",
          "Ne kadar geç kalacağını söyle",
          "Beklerken ne yapmasını istediğini yaz",
          "Özür dile ve vedalaş",
        ],
        minWords: 25,
        phrases: [
          { de: "I am sorry, I am late.", tr: "Üzgünüm, geç kaldım." },
          { de: "The bus is not here.", tr: "Otobüs gelmedi." },
          { de: "Please do not wait outside.", tr: "Lütfen dışarıda bekleme." },
          { de: "Please order … for me.", tr: "Benim için … ısmarla." },
          { de: "See you very soon!", tr: "Birazdan görüşürüz!" },
        ],
        sample:
          "Hi Bea, I am so sorry! The bus is not here and I am twenty minutes late. There is a problem on my line. " +
          "Please do not wait outside, it is very cold. Go in and take our table by the window. " +
          "Please order a tea for me. See you very soon!",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a1-lib-s3",
    course: "en",
    level: "A1",
    skill: "speaking",
    title: "w and v",
    genre: "pronounce",
    intro: "İngilizcede „w“ dudaklarla, „v“ ise diş ve dudakla çıkar; Türkçedeki tek v sesi ikisinin arasında kalır.",
    gloss: [
      { de: "van", tr: "kamyonet" },
      { de: "wallet", tr: "cüzdan" },
      { de: "village", tr: "köy" },
      { de: "window", tr: "pencere" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "We want to visit Vienna.",
        tr: "Viyana'yı ziyaret etmek istiyoruz.",
        hint: "„we“ ve „want“ yuvarlak dudakla, dişe değmeden; „visit“ ve „Vienna“ üst dişler alt dudakta.",
        confusions: [
          { heard: ["Ve vant to", "We want to wisit"], fix: "„w“de dişler dudağa değmez, „v“de değer; ikisini karıştırma.", expected: "visit" },
        ],
      },
      {
        de: "The van is very old.",
        tr: "Kamyonet çok eski.",
        hint: "„van“ ve „very“ ikisi de v: üst dişler alt dudağa hafifçe dokunur.",
        confusions: [
          { heard: ["The wan is wery old"], fix: "Dudakları yuvarlama; dişini dudağına koy ve titreştir: van, very.", expected: "van" },
        ],
      },
      {
        de: "Where is my wallet?",
        tr: "Cüzdanım nerede?",
        hint: "„where“ ve „wallet“ w ile başlar: dudaklar önce yuvarlak, sonra açılır.",
        confusions: [
          { heard: ["Vere is my vallet"], fix: "Ağzını „u“ der gibi yuvarla ve sonra kelimeye geç: uue-a, uo-lit.", expected: "wallet" },
        ],
      },
      {
        de: "Vera works every weekend.",
        tr: "Vera her hafta sonu çalışıyor.",
        hint: "Aynı cümlede üç ses: „Vera“ v, „works“ ve „weekend“ w, „every“ yine v.",
        confusions: [
          { heard: ["Wera vorks", "everi wekend"], fix: "Baştaki ada dikkat: Vera dişle, works dudakla.", expected: "Vera" },
        ],
      },
      {
        de: "We have five white windows.",
        tr: "Beş beyaz penceremiz var.",
        hint: "„have“ ve „five“ v sesi; „we“, „white“ ve „windows“ w sesi.",
        confusions: [
          { heard: ["We hawe five", "vindows"], fix: "„have“ ve „five“ dişli, „windows“ dudaklı: hev, fayv, uindouz.", expected: "windows" },
        ],
      },
      {
        de: "Give me the water, please.",
        tr: "Suyu ver lütfen.",
        hint: "„give“ v ile, „water“ w ile başlar; iki kelime arka arkaya geliyor.",
        confusions: [
          { heard: ["Giwe me the vater"], fix: "İlkinde diş, ikincisinde dudak: giv, uo-ta.", expected: "water" },
        ],
      },
      {
        de: "Victor lives in a village.",
        tr: "Victor bir köyde yaşıyor.",
        hint: "Üç kez v: Victor, lives, village. Cümlenin tamamı diş-dudak çalışması.",
        confusions: [
          { heard: ["Wictor liwes in a willage"], fix: "Üçünde de üst dişler alt dudağa değsin; hiçbirinde dudak yuvarlanmaz.", expected: "village" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a1-lib-g3",
    course: "en",
    level: "A1",
    skill: "grammar",
    title: "I work or I am working?",
    genre: "grammar",
    intro: "Türkçedeki tek „-yor“ eki İngilizcede ikiye ayrılır: alışkanlık başka biçim, şu an başka biçim ister.",
    focus: "Present continuous ile present simple farkı",
    gloss: [
      { de: "sleep", tr: "uyumak" },
      { de: "quiet", tr: "sessiz" },
      { de: "watch", tr: "izlemek" },
      { de: "rain", tr: "yağmur yağmak" },
    ],
    minutes: 6,
    explanation: [
      {
        heading: "İki ayrı iş",
        tr: "Türkçede „çalışıyorum“ hem alışkanlığı hem şu anı anlatır. İngilizcede ikisi ayrılır: alışkanlık ve genel doğru için present simple (I work), tam şu an olan için present continuous (I am working).",
        examples: [
          { de: "I work in a hospital.", tr: "Bir hastanede çalışıyorum.", note: "her zaman, işim bu" },
          { de: "I am working now.", tr: "Şu anda çalışıyorum.", note: "tam bu an" },
          { de: "It rains a lot in November.", tr: "Kasımda çok yağmur yağar." },
        ],
      },
      {
        heading: "Biçim ve yazım",
        tr: "Continuous iki parçadır: be + fiil-ing. Yazımda üç kural: sondaki sessiz e düşer (make → making), kısa ünlüden sonra son sessiz iki olur (sit → sitting), -y düşmez (study → studying).",
        examples: [
          { de: "She is making tea.", tr: "Çay yapıyor.", note: "make → making" },
          { de: "They are sitting outside.", tr: "Dışarıda oturuyorlar.", note: "sit → sitting" },
          { de: "He is studying English.", tr: "İngilizce çalışıyor." },
        ],
      },
      {
        heading: "Bazı fiiller -ing almaz",
        tr: "Durum bildiren fiiller continuous biçimde kullanılmaz: like, love, know, want, need, understand ve sahiplik anlamındaki have. „I am wanting“ yanlıştır, „I want“ doğrudur.",
        examples: [
          { de: "I like this song.", tr: "Bu şarkıyı seviyorum.", note: "„am liking“ olmaz" },
          { de: "She has two brothers.", tr: "İki erkek kardeşi var." },
          { de: "We need help.", tr: "Yardıma ihtiyacımız var." },
        ],
      },
    ],
    questions: [
      {
        text: "Look! The baby ___.",
        options: ["is sleeping", "sleeps", "sleep"],
        answer: 0,
        explain: "„Look!“ tam şu anı gösterir, bu yüzden continuous gelir.",
      },
      {
        text: "She ___ to work by bus every day.",
        options: ["goes", "is going", "go"],
        answer: 0,
        explain: "„every day“ alışkanlık bildirir: present simple ve üçüncü tekilde -es.",
      },
      {
        text: "I ___ this song very much.",
        options: ["like", "am liking", "likes"],
        answer: 0,
        explain: "„like“ durum fiilidir ve -ing biçimi almaz.",
      },
      {
        kind: "gapfill",
        text: "We usually ___ (have) dinner at seven.",
        options: [],
        answer: 0,
        accept: ["have"],
        explain: "„usually“ alışkanlık bildirir ve „we“ ile fiil yalın kalır.",
      },
      {
        kind: "gapfill",
        text: "Be quiet! I ___ (work).",
        options: [],
        answer: 0,
        accept: ["am working", "'m working"],
        explain: "Tam şu an olan bir iş: am + working.",
      },
      {
        kind: "gapfill",
        text: "He ___ (not / watch) TV at the moment.",
        options: [],
        answer: 0,
        accept: ["is not watching", "isn't watching"],
        explain: "„at the moment“ continuous ister; olumsuz „not“ be ile fiil arasına girer.",
      },
      {
        kind: "gapfill",
        text: "My parents ___ (live) in Bursa.",
        options: [],
        answer: 0,
        accept: ["live"],
        explain: "Sürekli bir durum, alışkanlık gibi anlatılır: present simple, çoğul özne.",
      },
      {
        kind: "order",
        text: "Soruyu doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["What", "are", "you", "doing", "now"],
        explain: "Soru kelimesi + be + özne + fiil-ing: What are you doing now?",
      },
      {
        kind: "truefalse",
        text: "„I am wanting a coffee.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„want“ durum fiilidir; doğrusu „I want a coffee.“",
      },
      {
        kind: "truefalse",
        text: "„It is raining now.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "„now“ tam şu anı gösteriyor ve biçim be + -ing; cümle doğru.",
      },
    ],
  },
];
