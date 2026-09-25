import type { SkillExercise } from "../../types";

/**
 * EN · A1 — Beceriler kütüphanesi, parti 11.
 *
 * Hücreleri YİRMİYE tamamlayan on partinin (11–20) ilki. Kurallar ve emsal:
 * `en-a1.ts` (parti 1) ve `data/content/SPEC.md`. `de` alanı İngilizce
 * metni taşır; sözlükçede `en` yazılmaz.
 *
 * Bu parti BEŞ beceriyi de taşır (okuma ve dinleme 11–13'te, yazma 11–17'de
 * yirmiye tamamlanıyor). Parti 11 kutlama hattı: çocuk doğum günü daveti,
 * sürpriz parti için telefon, hediye için teşekkür notu. Söyleyiş odağı
 * kelime sonundaki titreşimli sessizler (bag/back); dil bilgisi
 * this / that / these / those.
 */
export const enA1P11: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a1-lib-r11",
    course: "en",
    level: "A1",
    skill: "reading",
    title: "Leo Is Seven!",
    genre: "personal",
    intro: "Bir annenin oğlunun doğum günü için gönderdiği davet kartını okuyacaksın: parti ne zaman, nerede, misafirlerden ne isteniyor.",
    gloss: [
      { de: "party", tr: "parti" },
      { de: "playground", tr: "oyun parkı" },
      { de: "balloon", tr: "balon" },
      { de: "rain", tr: "yağmur yağmak" },
      { de: "floor", tr: "kat" },
      { de: "present", tr: "hediye" },
      { de: "answer", tr: "cevap vermek" },
    ],
    minutes: 4,
    text:
      "LEO IS SEVEN!\n\n" +
      "Dear friends,\n\n" +
      "Please come to Leo's birthday party on Saturday, June 14. The party starts at two o'clock and ends at five. " +
      "At five, parents can have a cup of coffee with us.\n\n" +
      "We are in Sunny Hill Park, next to the big playground. Look for the green and yellow balloons! " +
      "If it rains, the party is at our flat: 21 Oak Street, third floor.\n\n" +
      "There are games, music and a big chocolate cake. Leo loves books and animals, but please do not buy big presents. " +
      "A card is perfect.\n\n" +
      "Please answer by Wednesday. Call Anna on 0157 342 118.\n\n" +
      "See you soon!\nAnna and Leo",
    questions: [
      {
        text: "What is this text?",
        options: ["a letter from Leo's teacher", "an invitation to a party", "an ad for a toy shop"],
        answer: 1,
        explain: "„Please come to Leo's birthday party …“ — metin okuyanları bir doğum günü partisine çağırıyor.",
      },
      {
        text: "Where is the party if it rains?",
        options: ["at Anna and Leo's flat", "next to the playground", "in a café in the park"],
        answer: 0,
        explain: "„If it rains, the party is at our flat: 21 Oak Street, third floor.“",
      },
      {
        kind: "truefalse",
        text: "At five, parents can have coffee at the party.",
        options: ["True", "False"],
        answer: 0,
        explain: "„At five, parents can have a cup of coffee with us.“ — veliler saat beşte kahveye davetli.",
      },
      {
        kind: "gapfill",
        text: "The party ends at ___.",
        options: [],
        answer: 0,
        accept: ["five", "5", "five o'clock"],
        explain: "„The party starts at two o'clock and ends at five.“",
      },
      {
        kind: "short_answer",
        text: "What color are the balloons?",
        options: [],
        answer: 0,
        accept: ["green and yellow", "yellow and green", "green, yellow"],
        explain: "„Look for the green and yellow balloons!“",
      },
      {
        text: "What does Anna ask the guests to do?",
        options: ["to buy Leo a big present", "to bring a book about animals", "to answer by Wednesday"],
        answer: 2,
        explain: "„Please answer by Wednesday.“ — büyük hediye ise özellikle istenmiyor, bir kart yeterli.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a1-lib-l11",
    course: "en",
    level: "A1",
    skill: "listening",
    title: "Who Brings What?",
    genre: "phone",
    intro: "Selin, arkadaşları Ben için sürpriz bir parti hazırlıyor ve Mert'i arıyor; kim ne getiriyor, parti ne zaman, hediye ne kadar tutuyor, dinle.",
    gloss: [
      { de: "surprise", tr: "sürpriz" },
      { de: "bring", tr: "getirmek" },
      { de: "juice", tr: "meyve suyu" },
      { de: "favorite", tr: "favori" },
      { de: "present", tr: "hediye" },
      { de: "pay", tr: "ödemek" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Selin", text: "Hi Mert, it's Selin. Have you got a minute?" },
      { speaker: "Mert", text: "Sure. Is it about the party for Ben?" },
      { speaker: "Selin", text: "Yes. It's a surprise, so don't tell him! It's on Friday at eight, at my flat." },
      { speaker: "Mert", text: "Great. What can I bring?" },
      { speaker: "Selin", text: "Can you bring some drinks? Juice and water, please, but no cola." },
      { speaker: "Mert", text: "No problem. What about the cake?" },
      { speaker: "Selin", text: "My sister is making an apple cake. It's Ben's favorite." },
      { speaker: "Mert", text: "How many people are coming?" },
      { speaker: "Selin", text: "Twelve. Please come at half past seven. Nora is bringing Ben at eight." },
      { speaker: "Mert", text: "And what about a present?" },
      { speaker: "Selin", text: "We're buying him a new bag. It's twenty-four euros, so everyone pays two euros." },
      { speaker: "Mert", text: "Perfect. See you on Friday!" },
    ],
    questions: [
      {
        text: "Who is the party for?",
        options: ["Nora", "Mert", "Ben"],
        answer: 2,
        explain: "„Is it about the party for Ben?“ sorusuna Selin evet diyor; Nora yalnız Ben'i partiye getiren kişi.",
      },
      {
        text: "What does Mert bring?",
        options: ["an apple cake", "juice and water", "cola and water"],
        answer: 1,
        explain: "Selin ondan içecek istiyor: „Juice and water, please, but no cola.“ — keki kız kardeşi yapıyor.",
      },
      {
        kind: "truefalse",
        text: "Ben knows about the party.",
        options: ["True", "False"],
        answer: 1,
        explain: "„It's a surprise, so don't tell him!“ — parti sürpriz, Ben'in haberi yok.",
      },
      {
        kind: "short_answer",
        text: "What time must Mert come?",
        options: [],
        answer: 0,
        accept: ["at half past seven", "half past seven", "7.30", "at 7.30", "7:30", "at 7:30", "seven thirty"],
        explain: "„Please come at half past seven.“ — Ben saat sekizde geliyor, misafirler ondan önce.",
      },
      {
        kind: "dictation",
        text: "Selin'in Mert'e yaptığı uyarıyı duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["It's a surprise, so don't tell him!", "It's a surprise, so don't tell him", "It is a surprise, so do not tell him!", "It is a surprise, so do not tell him"],
        explain: "„It's a surprise, so don't tell him!“ — „so“ sonucu bağlıyor, „don't tell“ olumsuz emir.",
      },
      {
        text: "How much does everyone pay for the present?",
        options: ["twelve euros", "twenty-four euros", "two euros"],
        answer: 2,
        explain: "„It's twenty-four euros, so everyone pays two euros.“ — yirmi dört euro çantanın toplam fiyatı.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-lib-w11",
    course: "en",
    level: "A1",
    skill: "writing",
    title: "Thank You for the Present",
    genre: "personal",
    intro: "Teyzen doğum günün için sana bir hediye gönderdi; önce iki cümle kur, sonra ona kısa bir teşekkür notu yaz.",
    gloss: [
      { de: "sweater", tr: "kazak" },
      { de: "warm", tr: "sıcak tutan" },
      { de: "wear", tr: "giymek" },
      { de: "color", tr: "renk" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Kazak çok sıcak tutuyor ve rengini seviyorum.",
        answer: "The sweater is very warm and I love the color.",
        alternatives: ["I love the color and the sweater is very warm."],
        hint: "İki kısa cümle „and“ ile bağlanır ve hangisinin önce geleceği serbest; sıfat „be“ fiiliyle gelir: is very warm.",
      },
      {
        kind: "build",
        tr: "Onu her sabah işe giyiyorum.",
        answer: "I wear it to work every morning.",
        alternatives: ["Every morning I wear it to work."],
        hint: "Alışkanlık için geniş zaman: I wear. „it“ fiilin hemen arkasına gelir; zaman ifadesi sonda da başta da durabilir.",
      },
      {
        kind: "free",
        prompt:
          "Teyzen doğum günün için sana bir hediye gönderdi. Ona kısa bir not yaz: teşekkür et, hediyenin ne olduğunu ve neyini sevdiğini söyle, onu ne zaman kullandığını yaz ve ne zaman görüşeceğinizi söyleyip imzala.",
        checklist: [
          "Hediye için teşekkür et",
          "Hediyenin ne olduğunu ve neyini sevdiğini yaz",
          "Onu ne zaman ya da nerede kullandığını söyle",
          "Ne zaman görüşeceğinizi yaz ve imzala",
        ],
        minWords: 30,
        phrases: [
          { de: "Thank you so much for …", tr: "… için çok teşekkür ederim." },
          { de: "I really love …", tr: "…'ı çok seviyorum." },
          { de: "It is perfect for …", tr: "… için harika." },
          { de: "I wear it every …", tr: "Onu her … giyiyorum." },
          { de: "See you at …", tr: "…'de görüşürüz." },
        ],
        sample:
          "Dear Aunt Rita, thank you so much for the birthday present! The sweater is very warm and I love the color. " +
          "Blue is my favorite. I wear it to work every morning, and my friends like it too. It is perfect for the cold " +
          "weather this week. See you at Grandma's house on Sunday! Love, Ceren",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a1-lib-s11",
    course: "en",
    level: "A1",
    skill: "speaking",
    title: "bag or back?",
    genre: "pronounce",
    intro: "Türkçede kelime sonundaki b, d, g ve v sertleşir (kitap, ağaç); İngilizcede sertleşmez ve sertleşirse kelime değişir.",
    gloss: [
      { de: "bag", tr: "çanta" },
      { de: "hard", tr: "sert" },
      { de: "prize", tr: "ödül" },
      { de: "card", tr: "kart" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "My bag is on the bed.",
        tr: "Çantam yatağın üstünde.",
        hint: "„bag“ g ile, „bed“ d ile biter ve ikisi de titreşimli kalır; Türkçedeki gibi k ve t'ye çevirme.",
        confusions: [
          { heard: ["back", "bet"], fix: "Sondaki g sertleşirse „back“ (sırt), d sertleşirse „bet“ olur; titreşimi kelimenin sonuna kadar sür.", expected: "bag" },
        ],
      },
      {
        de: "The dog is in the garden.",
        tr: "Köpek bahçede.",
        hint: "„dog“ sonundaki g yumuşak kalır: DOG, DOK değil. „garden“ sonundaki n de tam söylenir.",
        confusions: [
          { heard: ["dock"], fix: "g k'ye dönerse „dock“ (rıhtım) duyulur; sesi boğazda titreşimle bitir.", expected: "dog" },
        ],
      },
      {
        de: "I have five cards.",
        tr: "Beş kartım var.",
        hint: "„have“ ve „five“ v ile, „cards“ dz ile biter; f ve ts'ye kaçmasın.",
        confusions: [
          { heard: ["half"], fix: "v sertleşirse „have“ „half“ (yarım) gibi duyulur; alt dudağı dişe değdirip titreştir.", expected: "have" },
        ],
      },
      {
        de: "Please close your eyes.",
        tr: "Lütfen gözlerini kapat.",
        hint: "„close“ ve „eyes“ z sesiyle biter: KLOUZ, AYZ. s ile bitirirsen başka bir kelime çıkar.",
        confusions: [
          { heard: ["ice"], fix: "„eyes“ s ile biterse „ice“ (buz) olur; sonda arı vızıltısı gibi bir z duyulsun.", expected: "eyes" },
        ],
      },
      {
        de: "The bread is hard.",
        tr: "Ekmek sert.",
        hint: "„bread“ ve „hard“ d ile biter; sondaki d'yi t yapma.",
        confusions: [
          { heard: ["heart"], fix: "d t'ye dönerse „hard“ „heart“ (kalp) gibi duyulur; dili bırakırken titreşim sürsün.", expected: "hard" },
        ],
      },
      {
        de: "The prize is a new bike.",
        tr: "Ödül yeni bir bisiklet.",
        hint: "„prize“ z ile biter: PRAYZ. s ile söylersen „price“ (fiyat) olur.",
        confusions: [
          { heard: ["price"], fix: "Sondaki z'yi s yapma; „prize“ ödül, „price“ fiyat demek.", expected: "prize" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a1-lib-g11",
    course: "en",
    level: "A1",
    skill: "grammar",
    title: "this, that, these, those",
    genre: "grammar",
    intro: "Türkçede bu, şu ve o var; İngilizcede ise yakın ve uzak ayrımı yapılır ve kelime çoğulda değişir.",
    focus: "İşaret sözcükleri: this / that / these / those",
    gloss: [
      { de: "phone", tr: "telefon" },
      { de: "apple", tr: "elma" },
      { de: "key", tr: "anahtar" },
      { de: "busy", tr: "meşgul" },
    ],
    minutes: 6,
    explanation: [
      {
        heading: "this ve that: yakın ve uzak",
        tr: "Türkçedeki üç kelimenin (bu, şu, o) yerine İngilizcede iki kelime yeter. Elinin altındaki, yakındaki şey için „this“, uzaktaki ya da karşıdaki şey için „that“ kullanılır. İkisi de tekil isimle gelir.",
        examples: [
          { de: "This is my phone.", tr: "Bu benim telefonum.", note: "yakın" },
          { de: "That is our school.", tr: "Şu bizim okulumuz.", note: "uzak" },
          { de: "Is this your key?", tr: "Bu senin anahtarın mı?", note: "soruda da aynı" },
        ],
      },
      {
        heading: "Çoğulda: these ve those",
        tr: "Türkçede „bu elma“ ile „bu elmalar“ arasında „bu“ değişmez. İngilizcede işaret sözcüğü de isimle birlikte çoğul olur: this → these, that → those. Fiil de „are“ olur.",
        examples: [
          { de: "These apples are sweet.", tr: "Bu elmalar tatlı.", note: "yakın, çoğul" },
          { de: "Those shoes are very nice.", tr: "Şu ayakkabılar çok güzel.", note: "uzak, çoğul" },
          { de: "Are these your keys?", tr: "Bunlar senin anahtarların mı?" },
        ],
      },
      {
        heading: "Tanıştırma, telefon ve zaman",
        tr: "Birini tanıştırırken ve telefonda kendini tanıtırken „this“ kullanılır: „This is Ela.“ Zaman ifadesinde de „this“ içinde bulunduğumuz dönemi anlatır: „this week“ bu hafta demektir. Tek başına da durabilir: „What is that?“",
        examples: [
          { de: "This is my friend Ali.", tr: "Bu arkadaşım Ali.", note: "tanıştırma" },
          { de: "Hello, this is Ela.", tr: "Merhaba, ben Ela.", note: "telefonda" },
          { de: "I'm very busy this week.", tr: "Bu hafta çok meşgulüm.", note: "zaman" },
        ],
      },
    ],
    questions: [
      {
        text: "Look at ___ bus over there. It's our bus!",
        options: ["these", "this", "that"],
        answer: 2,
        explain: "„over there“ uzaktaki tek bir şeyi gösteriyor, bu yüzden that gelir.",
      },
      {
        text: "___ shoes are very nice.",
        options: ["This", "These", "That"],
        answer: 1,
        explain: "„shoes“ çoğul; şıklar arasında çoğul isimle giden tek kelime these.",
      },
      {
        text: "Are ___ your keys?",
        options: ["these", "this", "that"],
        answer: 0,
        explain: "„keys“ çoğul ve fiil „are“, bu yüzden these gelir.",
      },
      {
        kind: "gapfill",
        text: "___ is my phone. (it is in my hand)",
        options: [],
        answer: 0,
        accept: ["This", "this"],
        explain: "Elindeki, yakındaki bir şey için this kullanılır.",
      },
      {
        kind: "gapfill",
        text: "I'm very busy ___ week.",
        options: [],
        answer: 0,
        accept: ["this"],
        explain: "İçinde bulunduğumuz hafta „this week“ ile söylenir.",
      },
      {
        kind: "gapfill",
        text: "Those apples ___ cheap. (be)",
        options: [],
        answer: 0,
        accept: ["are"],
        explain: "„those“ çoğul olduğu için fiil de çoğul olur: are.",
      },
      {
        kind: "gapfill",
        text: "Hello, ___ is Ela. Can I talk to Mert? (on the phone)",
        options: [],
        answer: 0,
        accept: ["this"],
        explain: "Telefonda kendini tanıtırken „I am“ değil, „this is“ kullanılır.",
      },
      {
        kind: "order",
        text: "Soruyu doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Is", "that", "your", "school"],
        explain: "„be“ ile kurulan soruda fiil başa geçer: Is that your school?",
      },
      {
        kind: "truefalse",
        text: "„These shoe is new.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "these çoğul isimle ve are ile gelir: „These shoes are new.“",
      },
      {
        kind: "truefalse",
        text: "„What is that?“ — Bu soru doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "that isim olmadan da kullanılabilir; uzaktaki bir şeyi sorar.",
      },
    ],
  },
];
