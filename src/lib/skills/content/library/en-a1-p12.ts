import type { SkillExercise } from "../../types";

/**
 * EN · A1 — Beceriler kütüphanesi, parti 12.
 *
 * Hücreleri YİRMİYE tamamlayan partilerden biri. Kurallar ve emsal:
 * `en-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Bu parti BEŞ beceriyi de taşır. Parti 12 tatil ve konaklama hattı: kamp
 * alanının bilgi yazısı, otelde giriş yapmak, pansiyona oda ayırtma
 * e-postası. Söyleyiş odağı „ng“ sesi (sing/sink); dil bilgisi yer edatları
 * (konum edatları: under, next to, between, opposite; in / on / at ve
 * hareket edatları A2'de).
 */
export const enA1P12: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a1-lib-r12",
    course: "en",
    level: "A1",
    skill: "reading",
    title: "Pine Lake Camping",
    genre: "info",
    intro: "Göl kenarındaki bir kamp alanının misafirlere verdiği bilgi yazısını okuyacaksın: ofis, dükkân, duşlar, yüzme ve sessizlik saatleri.",
    gloss: [
      { de: "lake", tr: "göl" },
      { de: "stay", tr: "konaklama" },
      { de: "fresh", tr: "taze" },
      { de: "shower", tr: "duş" },
      { de: "beach", tr: "plaj" },
      { de: "rent", tr: "kiralamak" },
      { de: "quiet", tr: "sessiz" },
    ],
    minutes: 4,
    text:
      "PINE LAKE CAMPING — INFORMATION\n\n" +
      "Welcome! Here is some information for your stay.\n\n" +
      "The office is open every day from eight to seven. After seven, please call 0172 55 60 90.\n\n" +
      "Our small shop sells bread, milk, fruit and ice. The fresh bread is ready at half past seven.\n\n" +
      "The showers have hot water from six to eleven in the morning and from five to ten in the evening.\n\n" +
      "You can swim in the lake, but only near the beach. Please do not swim at night.\n\n" +
      "You can rent a bike at the office. It costs ten euros a day.\n\n" +
      "After ten at night, please be quiet. No music until seven in the morning.\n\n" +
      "Have a nice stay!",
    questions: [
      {
        text: "The office closes at seven. What can you do after that?",
        options: ["go to the office again", "buy fresh bread", "call a phone number"],
        answer: 2,
        explain: "„After seven, please call 0172 55 60 90.“ — ofis kapandıktan sonra telefonla ulaşılıyor.",
      },
      {
        text: "Where can you swim?",
        options: ["near the beach", "in any part of the lake", "only in the evening"],
        answer: 0,
        explain: "„You can swim in the lake, but only near the beach.“ — gölün her yerinde değil, yalnız plajın yakınında.",
      },
      {
        kind: "truefalse",
        text: "You can buy fruit at the camping shop.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Our small shop sells bread, milk, fruit and ice.“",
      },
      {
        kind: "gapfill",
        text: "A bike costs ___ euros a day.",
        options: [],
        answer: 0,
        accept: ["ten", "10"],
        explain: "„You can rent a bike at the office. It costs ten euros a day.“",
      },
      {
        kind: "short_answer",
        text: "When is the fresh bread ready?",
        options: [],
        answer: 0,
        accept: ["at half past seven", "half past seven", "7.30", "at 7.30", "7:30", "at 7:30", "seven thirty"],
        explain: "„The fresh bread is ready at half past seven.“",
      },
      {
        text: "When must people be quiet?",
        options: ["from five in the evening", "after ten at night", "after eleven in the morning"],
        answer: 1,
        explain: "„After ten at night, please be quiet.“ — beş ve on bir, sıcak suyun saatleriyle ilgili.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a1-lib-l12",
    course: "en",
    level: "A1",
    skill: "listening",
    title: "Checking In at the Blue Bay",
    genre: "dialogue",
    intro: "Ela bir otele varıyor ve resepsiyonda giriş yapıyor; oda, kahvaltı, internet ve çantası için ne öğrendiğini dinle.",
    gloss: [
      { de: "single room", tr: "tek kişilik oda" },
      { de: "passport", tr: "pasaport" },
      { de: "lift", tr: "asansör" },
      { de: "breakfast", tr: "kahvaltı" },
      { de: "password", tr: "şifre" },
      { de: "leave", tr: "bırakmak" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Receptionist", text: "Good evening, welcome to the Blue Bay Hotel." },
      { speaker: "Ela", text: "Hello. I have a room for one night. My name is Ela Kaya." },
      { speaker: "Receptionist", text: "Yes, a single room with a shower. Can I see your passport, please?" },
      { speaker: "Ela", text: "Here you are." },
      { speaker: "Receptionist", text: "Thank you. You're in room 305, on the third floor. The lift is on the left." },
      { speaker: "Ela", text: "What time is breakfast?" },
      { speaker: "Receptionist", text: "From seven to ten, in the room next to reception." },
      { speaker: "Ela", text: "Is there Wi-Fi in the room?" },
      { speaker: "Receptionist", text: "Yes, it's free. The password is on your key card." },
      { speaker: "Ela", text: "Great. My train is at four tomorrow. Can I leave my bag here after breakfast?" },
      { speaker: "Receptionist", text: "Of course. Please leave the room by eleven, but your bag can stay here until four." },
      { speaker: "Ela", text: "Perfect. Thank you!" },
    ],
    questions: [
      {
        text: "How long does Ela stay at the hotel?",
        options: ["two nights", "one night", "one week"],
        answer: 1,
        explain: "„I have a room for one night.“ — Ela yarın trenle ayrılıyor.",
      },
      {
        text: "Where is Ela's room?",
        options: ["next to reception", "on the first floor", "on the third floor"],
        answer: 2,
        explain: "„You're in room 305, on the third floor.“ — resepsiyonun yanındaki oda kahvaltı salonu.",
      },
      {
        kind: "truefalse",
        text: "Ela can use the Wi-Fi for free.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Yes, it's free.“ — şifre de oda kartının üstünde yazıyor.",
      },
      {
        kind: "short_answer",
        text: "When is breakfast?",
        options: [],
        answer: 0,
        accept: ["from seven to ten", "seven to ten", "from 7 to 10", "7 to 10", "from seven to ten in the morning"],
        explain: "„From seven to ten, in the room next to reception.“",
      },
      {
        kind: "dictation",
        text: "Asansörün yerini söyleyen cümleyi duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["The lift is on the left.", "The lift is on the left"],
        explain: "„The lift is on the left.“ — yön „on the left / on the right“ kalıbıyla söylenir.",
      },
      {
        text: "Why does Ela want to leave her bag at the hotel?",
        options: ["Her train is at four.", "Her room is very small.", "The lift is not working."],
        answer: 0,
        explain: "„My train is at four tomorrow.“ — odayı on birde boşaltıyor, çanta dörde kadar otelde kalabiliyor.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-lib-w12",
    course: "en",
    level: "A1",
    skill: "writing",
    title: "Booking a Room",
    genre: "email",
    intro: "Tatil için küçük bir pansiyonda yer arıyorsun; önce iki cümle kur, sonra oda ayırtmak için kısa bir e-posta yaz.",
    gloss: [
      { de: "double room", tr: "çift kişilik oda" },
      { de: "stay", tr: "kalmak" },
      { de: "arrive", tr: "varmak" },
      { de: "price", tr: "fiyat" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Temmuzda iki gece kalmak istiyoruz.",
        answer: "We want to stay for two nights in July.",
        alternatives: ["In July we want to stay for two nights."],
        hint: "Süre „for“ ile söylenir: for two nights. Ay adından önce „in“ gelir ve bu zaman ifadesi başa da alınabilir.",
      },
      {
        kind: "build",
        tr: "Cuma akşamı saat yedide varıyoruz.",
        answer: "We arrive at seven on Friday evening.",
        alternatives: ["On Friday evening we arrive at seven."],
        hint: "Saat için „at“, gün için „on“ kullanılır; belli bir plan geniş zamanla da söylenebilir: we arrive.",
      },
      {
        kind: "free",
        prompt:
          "Küçük bir pansiyona e-posta yazıp oda ayırtmak istiyorsun: hangi tarihlerde ve kaç kişi geleceğinizi, nasıl bir oda istediğini yaz, fiyatı ve kahvaltıyı sor, ne zaman varacağını söyle ve adınla bitir.",
        checklist: [
          "Tarihleri ve kaç kişi olduğunuzu yaz",
          "Nasıl bir oda istediğini söyle",
          "Fiyatı ve kahvaltıyı sor",
          "Varış saatini yaz ve adınla bitir",
        ],
        minWords: 30,
        phrases: [
          { de: "I would like to book …", tr: "… ayırtmak istiyorum." },
          { de: "We are two adults and one child.", tr: "İki yetişkin ve bir çocuğuz." },
          { de: "How much is the room for one night?", tr: "Oda bir gece için ne kadar?" },
          { de: "Is breakfast included in the price?", tr: "Kahvaltı fiyata dâhil mi?" },
          { de: "We arrive at … on …", tr: "… günü saat …'de varıyoruz." },
        ],
        sample:
          "Hello, I would like to book a double room for two nights, from Friday, July 12 to Sunday, July 14. " +
          "We are two adults and one small child. How much is the room for one night? Is breakfast included in the price? " +
          "We arrive at seven on Friday evening. Thank you and best wishes, Kaan Demir",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a1-lib-s12",
    course: "en",
    level: "A1",
    skill: "speaking",
    title: "sing or sink?",
    genre: "pronounce",
    intro: "„ng“ İngilizcede tek bir burun sesidir; Türkçedeki gibi arkasına g ya da k eklenmez, eklenirse kelime değişir.",
    gloss: [
      { de: "to sing", tr: "şarkı söylemek" },
      { de: "wing", tr: "kanat" },
      { de: "to bring", tr: "getirmek" },
      { de: "ring", tr: "yüzük" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Do you like to sing?",
        tr: "Şarkı söylemeyi sever misin?",
        hint: "„ng“ tek bir sestir: dilin arkası damağa değer ve ses burundan çıkar. Arkasında g ya da k yok.",
        confusions: [
          { heard: ["sink"], fix: "Sona k eklenirse „sink“ (lavabo) duyulur; sesi burunda bitir.", expected: "sing" },
        ],
      },
      {
        de: "What's that thing on the table?",
        tr: "Masanın üstündeki o şey ne?",
        hint: "„thing“: önce dişler arasında th, sonda yine tek bir ng. k eklenirse başka bir kelime çıkar.",
        confusions: [
          { heard: ["think"], fix: "Sondaki k „thing“i „think“e (düşünmek) çevirir; ses burunda kalsın.", expected: "thing" },
        ],
      },
      {
        de: "Birds have two wings.",
        tr: "Kuşların iki kanadı var.",
        hint: "„wings“: ng'den sonra doğrudan z gelir, araya g ya da k girmez.",
        confusions: [
          { heard: ["winks"], fix: "ng ile z arasına k koyarsan „winks“ (göz kırpar) olur.", expected: "wings" },
        ],
      },
      {
        de: "Bring your coat, it's cold.",
        tr: "Montunu getir, hava soğuk.",
        hint: "„bring“ sonu burunda biter; k ile kapanmaz.",
        confusions: [
          { heard: ["brink"], fix: "Sonda k duyulursa „brink“ (kenar) olur; burun sesini kesmeden bitir.", expected: "bring" },
        ],
      },
      {
        de: "She's singing a long song.",
        tr: "Uzun bir şarkı söylüyor.",
        hint: "Dört ng var: „singing“ içinde iki, „long“ ve „song“ sonunda birer. Hiçbirinde g duyulmaz.",
        confusions: [
          { heard: ["sinking"], fix: "„singing“ ortasına k girerse „sinking“ (batıyor) gibi duyulur.", expected: "singing" },
        ],
      },
      {
        de: "The king has a gold ring.",
        tr: "Kralın altın bir yüzüğü var.",
        hint: "„king“ ve „ring“ aynı sesle biter; sonda k ya da g yok.",
        confusions: [
          { heard: ["rink"], fix: "„ring“ k ile biterse „rink“ (buz pisti) olur; sesi burunda bırak.", expected: "ring" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a1-lib-g12",
    course: "en",
    level: "A1",
    skill: "grammar",
    title: "under, next to, between",
    genre: "grammar",
    intro: "Türkçede yer bir ekle söylenir (masanın altında, evin önünde); İngilizcede ismin ÖNÜNE bir edat gelir ve çoğu zaman bu iki üç kelimelik bir kalıptır.",
    focus: "Konum edatları: under, behind, in front of, next to, between, opposite (in / on / at ve hareket edatları A2'de)",
    gloss: [
      { de: "chair", tr: "sandalye" },
      { de: "tree", tr: "ağaç" },
      { de: "bank", tr: "banka" },
      { de: "opposite", tr: "karşısında" },
    ],
    minutes: 6,
    explanation: [
      {
        heading: "under, behind, in front of",
        tr: "„under“ altında, „behind“ arkasında, „in front of“ önünde demektir. Türkçede ek ismin sonuna gelir (evin önünde); İngilizcede edat ismin önünde durur ve isim hiç değişmez: in front of the house.",
        examples: [
          { de: "The cat is under the chair.", tr: "Kedi sandalyenin altında.", note: "altında → under" },
          { de: "The car is behind the tree.", tr: "Araba ağacın arkasında.", note: "arkasında → behind" },
          { de: "We meet in front of the station.", tr: "İstasyonun önünde buluşuyoruz.", note: "üç kelimelik tek kalıp" },
        ],
      },
      {
        heading: "next to, between, opposite",
        tr: "Yan yana olanlar için „next to“, iki şeyin arası için „between … and …“, karşısında için „opposite“ kullanılır. „between“ iki isim ister ve araya „and“ girer; „opposite“ arkasına ikinci bir edat almaz.",
        examples: [
          { de: "The bank is next to the station.", tr: "Banka istasyonun yanında." },
          { de: "The bakery is between the school and the park.", tr: "Fırın okulla parkın arasında.", note: "between … and" },
          { de: "The hotel is opposite the bank.", tr: "Otel bankanın karşısında.", note: "opposite of değil" },
        ],
      },
      {
        heading: "Where is …? ve there is",
        tr: "Yer sorusu „Where is …?“ ile sorulur, cevapta „It's“ ve edat gelir. Bir yerde ne olduğunu söylemek için edat öbeği there is / there are cümlesinin sonuna eklenir.",
        examples: [
          { de: "Where is the bank? — It's next to the station.", tr: "Banka nerede? — İstasyonun yanında." },
          { de: "There is a park behind our school.", tr: "Okulumuzun arkasında bir park var." },
          { de: "There are two shops opposite my flat.", tr: "Dairemin karşısında iki dükkân var." },
        ],
      },
    ],
    questions: [
      {
        text: "The car is ___ the tree. I can't see it from here.",
        options: ["in front of", "behind", "next"],
        answer: 1,
        explain: "Ağaç arabayı saklıyor, yani araba ağacın arkasında: behind.",
      },
      {
        text: "The bakery is ___ the school and the park.",
        options: ["between", "next to", "opposite"],
        answer: 0,
        explain: "İki yer „and“ ile bağlanmış; iki şeyin arası between ile söylenir.",
      },
      {
        text: "The hotel is ___ the bank.",
        options: ["opposite of", "between", "opposite"],
        answer: 2,
        explain: "opposite arkasına of almaz; between ise iki isim ister.",
      },
      {
        kind: "gapfill",
        text: "My shoes are ___ the bed. (not on the bed)",
        options: [],
        answer: 0,
        accept: ["under"],
        explain: "Yatağın altında olan bir şey under ile söylenir.",
      },
      {
        kind: "gapfill",
        text: "We meet in ___ of the station.",
        options: [],
        answer: 0,
        accept: ["front"],
        explain: "„önünde“ üç kelimelik kalıpla söylenir: in front of.",
      },
      {
        kind: "gapfill",
        text: "The bank is next ___ the station.",
        options: [],
        answer: 0,
        accept: ["to"],
        explain: "„yanında“ iki kelimeyle söylenir: next to.",
      },
      {
        kind: "gapfill",
        text: "„Where is the bank?“ — „___ next to the station.“",
        options: [],
        answer: 0,
        accept: ["It's", "It is", "it's"],
        explain: "Yer sorusunun cevabı It's + edat ile başlar.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["There is", "a park", "behind", "our school"],
        explain: "there is + isim + edat öbeği: There is a park behind our school.",
      },
      {
        kind: "truefalse",
        text: "„The bakery is between the school or the park.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "between iki ismi „and“ ile bağlar: between the school and the park.",
      },
      {
        kind: "truefalse",
        text: "„The hotel is opposite the bank.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "opposite doğrudan isimle kullanılır; cümle doğru.",
      },
    ],
  },
];
