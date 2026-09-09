import type { SkillExercise } from "../../types";

/**
 * EN · B1 — Beceriler kütüphanesi, ilk parti (2026-09-08).
 *
 * Alan adı `de` hedef dil metnini (İngilizce) taşır; `en` alanı bu kursta
 * yazılmaz. Amerikan yazımı (neighbor, meters).
 *
 * B1'de Patika dersi yok; kaçınılan alan iki deneme kâğıdının temaları
 * (iş/şehir, çevre/onarım). Buradaki beş parça başka yerlerden: yetişkin
 * yaşta yüzme öğrenen bir kadının blog yazısı, ev takasıyla tatil yapan bir
 * konukla radyo röportajı, köpek almayı düşünen arkadaşa tavsiye e-postası,
 * evden ayrılma yaşı üzerine görüş monoloğu ve B1'in ayırıcı kuralı olan
 * present perfect / past simple ayrımı. Konuşma B1'den itibaren monolog.
 *
 * Havuz dışı kelimeler (confident, lesson, silly, stranger) sözlükçede.
 */
export const enB1: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-lib-r1",
    course: "en",
    level: "B1",
    skill: "reading",
    title: "Learning to Swim at Thirty-Five",
    genre: "Blog yazısı",
    intro: "Yetişkin yaşta yüzme öğrenen bir kadının blog yazısını oku: neden başladı, ilk ders nasıl geçti, bugün nerede.",
    gloss: [
      { de: "confident", tr: "kendine güvenen" },
      { de: "sign up", tr: "kaydolmak" },
      { de: "lesson", tr: "ders" },
      { de: "fear", tr: "korku" },
      { de: "breathe", tr: "nefes almak" },
      { de: "book", tr: "yer ayırtmak" },
      { de: "advice", tr: "tavsiye" },
    ],
    minutes: 5,
    text:
      "I have never been a confident swimmer. When I was a child, my family lived far from the sea, and the school pool was closed for years. " +
      "So I grew up as the person who sat on the beach and watched.\n\n" +
      "Last spring, my daughter started swimming lessons, and she asked me why I never came into the water with her. I didn't have a good answer. " +
      "The next week, I decided to sign up for an adult beginners' course at the local pool.\n\n" +
      "The first lesson was hard. I was the oldest person in the group, and I couldn't even put my face in the water. Our teacher, Marta, didn't laugh. " +
      "She told us that fear is normal and that most adults learn faster than they expect, because they listen.\n\n" +
      "Since then, I have been to the pool twice a week. I have already learned to breathe in the water, and last month I swam twenty-five meters without stopping. " +
      "I haven't swum in the sea yet, but we have booked a holiday for August, and this time I won't be sitting on the beach.\n\n" +
      "If you have been thinking about lessons for years, my advice is simple: don't wait for the perfect moment. Book the first class. The rest will follow.",
    questions: [
      {
        text: "What is the text mainly about?",
        options: ["how the writer learned to swim as an adult", "how the writer's daughter learned to swim", "why the writer prefers the beach to the pool"],
        answer: 0,
        explain: "Metnin tamamı yazarın kendi yüzme hikâyesi; kızı ve plaj yalnız başlangıç noktası (ilk iki paragraf).",
      },
      {
        text: "Why did the writer decide to take lessons?",
        options: ["Her daughter asked a question she could not answer.", "Her teacher told her that fear is normal.", "Her family booked a holiday by the sea."],
        answer: 0,
        explain: "„she asked me why I never came into the water … I didn't have a good answer.“ Öğretmenin sözü ve tatil daha sonra geliyor.",
      },
      {
        text: "What does the writer think of Marta, the teacher?",
        options: ["She was patient and understanding.", "She was strict but very funny.", "She expected too much from the group."],
        answer: 0,
        explain: "„Marta didn't laugh. She told us that fear is normal …“ — yazar öğretmenin anlayışını vurguluyor; sertlik ya da şaka yok.",
      },
      {
        kind: "truefalse",
        text: "The writer has already swum in the sea.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I haven't swum in the sea yet“ — henüz denizde yüzmedi; ağustostaki tatil ilk fırsat olacak.",
      },
      {
        kind: "gapfill",
        text: "Since then, the writer has been to the pool ___ a week.",
        options: [],
        answer: 0,
        accept: ["twice", "two times"],
        explain: "„Since then, I have been to the pool twice a week.“ — dördüncü paragrafın ilk cümlesi.",
      },
      {
        kind: "short_answer",
        text: "How far did the writer swim last month?",
        options: [],
        answer: 0,
        accept: ["twenty-five meters", "25 meters", "twenty five meters", "twenty-five metres", "25 m"],
        explain: "„last month I swam twenty-five meters without stopping.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-lib-l1",
    course: "en",
    level: "B1",
    skill: "listening",
    title: "Swapping Homes for the Summer",
    genre: "Röportaj",
    intro: "Radyo sunucusu, tatillerini ev takasıyla geçiren Leyla'yla konuşuyor: sistem nasıl işliyor, başta neden endişeliydi, şimdi ne düşünüyor.",
    gloss: [
      { de: "home exchange", tr: "ev takası" },
      { de: "swap", tr: "takas etmek" },
      { de: "rent", tr: "kira" },
      { de: "stranger", tr: "yabancı" },
      { de: "admit", tr: "kabul etmek" },
      { de: "silly", tr: "saçma" },
      { de: "apology", tr: "özür" },
      { de: "honest", tr: "dürüst" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Host", text: "Welcome back. My guest today is Leyla, who has spent the last three summers in other people's homes and let other people stay in hers. Leyla, how does a home exchange work?" },
      { speaker: "Leyla", text: "It's simple, really. You put your flat on a website, with photos, and look for a family who wants to visit your city. You agree on dates, and then you just swap keys." },
      { speaker: "Host", text: "And you don't pay anything?" },
      { speaker: "Leyla", text: "No rent, no. You pay for the flights, of course, but for a family of four, that saves a lot of money." },
      { speaker: "Host", text: "Weren't you worried about strangers living in your home?" },
      { speaker: "Leyla", text: "At first, yes, I have to admit. Before our first exchange, I hid all our photos and locked one room. It sounds silly now." },
      { speaker: "Host", text: "So what changed?" },
      { speaker: "Leyla", text: "We came home, and the flat was cleaner than before. There was even a cake on the table. Since then, we have done it every year, and we've never had a real problem." },
      { speaker: "Host", text: "Never? Not one?" },
      { speaker: "Leyla", text: "Well, once a guest broke a lamp. He wrote us a long apology and left money for a new one. Honestly, my own children have broken more." },
      { speaker: "Host", text: "Any advice for someone who wants to try it?" },
      { speaker: "Leyla", text: "Be honest in your description. If the shower is slow, say so. Nobody wants surprises on holiday." },
    ],
    questions: [
      {
        text: "What is the interview mainly about?",
        options: ["holidays in other people's homes without paying rent", "renting your flat to tourists to make money", "a website where families sell holiday photos"],
        answer: 0,
        explain: "Leyla ev takasını anlatıyor: „you just swap keys“, „No rent, no.“ Para kazanmak ya da fotoğraf satmak yok.",
      },
      {
        text: "What did Leyla do before her first exchange?",
        options: ["She hid her photos and locked a room.", "She cleaned the flat and baked a cake.", "She paid the other family some money."],
        answer: 0,
        explain: "„Before our first exchange, I hid all our photos and locked one room.“ Pasta ve temiz ev, döndüklerinde buldukları şey.",
      },
      {
        text: "How does Leyla feel about the broken lamp now?",
        options: ["It was not a big problem for her.", "She is still angry with the guest.", "She thinks the guest should pay more."],
        answer: 0,
        explain: "„He wrote us a long apology … my own children have broken more.“ — özür ve karşılaştırma, olayı küçümsediğini gösteriyor.",
      },
      {
        kind: "truefalse",
        text: "The guests pay Leyla rent for her flat.",
        options: ["True", "False"],
        answer: 1,
        explain: "„And you don't pay anything?“ — „No rent, no.“ Yalnız kendi uçak biletleri ödeniyor.",
      },
      {
        kind: "dictation",
        text: "Leyla'nın son tavsiye cümlesini duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Nobody wants surprises on holiday.", "Nobody wants surprises on holiday"],
        explain: "„Nobody wants surprises on holiday.“ — nobody olumsuz anlam taşır ama fiil olumlu ve tekil kalır: wants.",
      },
      {
        kind: "short_answer",
        text: "How many summers has Leyla spent in other people's homes?",
        options: [],
        answer: 0,
        accept: ["three", "3", "three summers", "the last three summers"],
        explain: "Sunucu tanıtıyor: „who has spent the last three summers in other people's homes“.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-lib-w1",
    course: "en",
    level: "B1",
    skill: "writing",
    title: "Should Ayla Get a Dog?",
    genre: "E-posta",
    intro: "Arkadaşın Ayla köpek almayı düşünüyor ve fikrini soruyor; önce iki cümle kur, sonra e-postasına görüşünü ve gerekçelerini yaz.",
    gloss: [
      { de: "opinion", tr: "görüş" },
      { de: "honest", tr: "dürüst" },
      { de: "neighbor", tr: "komşu" },
      { de: "decide", tr: "karar vermek" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Senin yerinde olsam yaza kadar beklerdim.",
        answer: "If I were you, I would wait until summer.",
        alternatives: ["I would wait until summer if I were you."],
        hint: "İkinci koşul: If + past simple (were), ana cümlede would + yalın fiil. Türkçedeki „olsam … -irdim“ kalıbı; koşul cümlesi başa da sona da gelebilir.",
      },
      {
        kind: "build",
        tr: "İki yıldır bir köpeğim var ve bir kez bile pişman olmadım.",
        answer: "I have had a dog for two years and I have never regretted it.",
        alternatives: ["For two years I have had a dog and I have never regretted it."],
        hint: "Hâlâ süren durum: present perfect + for (süre). Türkçede „var“ şimdiki zaman; İngilizce geçmişi şimdiye bağlar: have had. never + üçüncü hâl: have never regretted.",
      },
      {
        kind: "free",
        prompt:
          "Arkadaşın Ayla köpek almayı düşünüyor ve senin dürüst görüşünü istiyor. E-postasına cevap yaz: görüşünü açıkça söyle, en az iki gerekçe ver, kendi deneyiminden ya da tanıdığın birinden örnek ver ve ona bir soru sor.",
        stimulus:
          "Hi! I need your honest opinion. I have been thinking about getting a dog for months. I live alone in a small flat, and I work from home three days a week. " +
          "My neighbor says a dog would be too much for me, but I have wanted one since I was a child. What do you think? Should I do it, or should I wait? Write soon! Ayla",
        checklist: ["Görüşünü açıkça söyle: al, alma ya da bekle", "En az iki gerekçe ver", "Kendi deneyiminden ya da tanıdığın birinden örnek ver", "Bir soru sor ve vedalaş"],
        minWords: 60,
        phrases: [
          { de: "In my opinion, …", tr: "Bence …" },
          { de: "If I were you, I would …", tr: "Senin yerinde olsam …" },
          { de: "I have had … for / since …", tr: "…-dır / …-den beri … var" },
          { de: "The problem is that …", tr: "Sorun şu ki …" },
          { de: "Have you thought about …?", tr: "…-i düşündün mü?" },
        ],
        sample:
          "Hi Ayla, thanks for your message! In my opinion, you should get a dog, but not yet. I have had one for two years, and it is the best thing that has happened to me. " +
          "But a dog needs a lot of time, and the first months are hard. Since I got mine, I have not slept late once! " +
          "The problem is that you are away from home two days a week. If I were you, I would wait until you have found someone who can walk the dog on those days. " +
          "Have you thought about a smaller dog? They are happier in a flat. Let me know what you decide! Love, Deniz",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b1-lib-s1",
    course: "en",
    level: "B1",
    skill: "speaking",
    title: "When Should You Leave Home?",
    genre: "Monolog",
    intro: "Gençlerin evden ayrılma yaşı üzerine kırk ile yetmiş beş saniyelik bir konuşma yap: görüşün ve en az iki gerekçen.",
    gloss: [],
    minutes: 5,
    monologue: {
      promptTr:
        "Bazı gençler on sekizinde evden ayrılır, bazıları otuzuna kadar ailesiyle yaşar. Sence bir genç ne zaman kendi evine çıkmalı? Görüşünü söyle ve en az iki gerekçe ver.",
      bulletsTr: [
        "Görüşün: erken mi, geç mi, yoksa duruma göre mi?",
        "Birinci gerekçe: para, bağımsızlık ya da aile",
        "İkinci gerekçe ya da karşı görüşe kısa bir cevap",
        "Kendi hayatından ya da tanıdığından bir örnek",
        "Tek cümlelik sonuç",
      ],
      targets: [
        { de: "In my opinion, …", tr: "Bence …" },
        { de: "The main reason is that …", tr: "Asıl sebep şu ki …" },
        { de: "For example, …", tr: "Örneğin …" },
        { de: "On the other hand, …", tr: "Öte yandan …" },
        { de: "That's why I think …", tr: "Bu yüzden bence …" },
      ],
      minSeconds: 40,
      maxSeconds: 75,
      sampleDe:
        "In my opinion, young people should move out when they can pay for their own life, not at a fixed age. " +
        "The main reason is that living alone teaches you things that nobody can teach you at home: how to cook, how to plan your money, how to solve problems on your own. " +
        "For example, my cousin moved out at twenty, and after a year he was a completely different person. " +
        "On the other hand, rents have become very high, and many young people just can't afford a flat. In that case, staying with your parents for a few more years is not a problem. " +
        "That's why I think the right time depends on money and on the person, not on a number.",
      rubricHint: "Görüş + en az iki gerekçe bekle; hedef kalıplardan en az üçü geçmeli. Present perfect (have become) ve koşul yapısı artı puan.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b1-lib-g1",
    course: "en",
    level: "B1",
    skill: "grammar",
    title: "have done or did?",
    genre: "Kural",
    intro: "İngilizcenin iki geçmiş zamanını ayırmayı öğren: ne zaman have + üçüncü hâl, ne zaman -ed; since/for, already/yet, ever/never işaretleri.",
    focus: "Present perfect ile past simple: since/for, already/yet, ever/never",
    gloss: [
      { de: "since", tr: "-den beri" },
      { de: "for", tr: "boyunca" },
      { de: "already", tr: "çoktan" },
      { de: "yet", tr: "henüz" },
      { de: "ever", tr: "hiç" },
    ],
    minutes: 6,
    explanation: [
      {
        heading: "İki geçmiş, tek -di",
        tr: "Türkçede „Berlin'e gittim“ hem dün olanı hem hayatında bir kez olanı anlatır; İngilizce ikiye ayırır. Zaman belliyse ya da bittiyse past simple (yesterday, last year, in 2019). Zaman söylenmiyorsa ve sonuç şimdiyi ilgilendiriyorsa present perfect: have/has + fiilin üçüncü hâli.",
        examples: [
          { de: "I went to Berlin last year.", tr: "Geçen yıl Berlin'e gittim.", note: "last year → past simple" },
          { de: "I have been to Berlin twice.", tr: "Berlin'e iki kez gittim.", note: "ne zaman olduğu söylenmiyor" },
          { de: "She lost her keys yesterday.", tr: "Dün anahtarlarını kaybetti." },
          { de: "She has lost her keys, so she cannot get in.", tr: "Anahtarlarını kaybetti, o yüzden içeri giremiyor.", note: "sonuç şimdi" },
        ],
      },
      {
        heading: "since / for: hâlâ süren durum",
        tr: "Türkçede „beş yıldır burada yaşıyorum“ şimdiki zamandır; İngilizce bunu present perfect ile söyler, çünkü durum geçmişte başladı ve sürüyor. for + süre (for five years), since + başlangıç noktası (since 2021, since Monday). Aynı „for“ past simple ile gelirse durum bitmiştir.",
        examples: [
          { de: "We have lived here for five years.", tr: "Beş yıldır burada yaşıyoruz.", note: "for + süre" },
          { de: "We have lived here since 2021.", tr: "2021'den beri burada yaşıyoruz.", note: "since + başlangıç" },
          { de: "We lived there for five years.", tr: "Orada beş yıl yaşadık.", note: "bitti, artık orada değiliz" },
        ],
      },
      {
        heading: "already / yet / ever / never",
        tr: "already olumlu cümlede have ile fiilin arasına girer („çoktan“). yet olumsuz cümlede ve soruda en sona gelir („henüz“). ever soruda „hiç“ demektir; never olumsuz cümlenin kendisidir, „hiç … -medi“ anlamını verir ve not ile birlikte kullanılmaz.",
        examples: [
          { de: "I have already finished the report.", tr: "Raporu çoktan bitirdim." },
          { de: "Have you finished yet?", tr: "Henüz bitirdin mi?", note: "yet sonda" },
          { de: "Have you ever eaten Turkish breakfast?", tr: "Hiç Türk kahvaltısı yedin mi?" },
          { de: "I have never seen snow.", tr: "Hiç kar görmedim.", note: "never + üçüncü hâl, not yok" },
        ],
      },
      {
        heading: "En sık hata",
        tr: "„I have seen him yesterday“ yanlış: yesterday zamanı sabitler ve past simple ister. „since three years“ da yanlış: since yalnız başlangıç noktası alır; süre için for.",
        examples: [
          { de: "I saw him yesterday.", tr: "Onu dün gördüm.", note: "yesterday → past simple" },
          { de: "I have known her for three years.", tr: "Onu üç yıldır tanıyorum.", note: "for + süre, since değil" },
        ],
      },
    ],
    questions: [
      {
        text: "We ___ in Ankara for two years, then we moved to Izmir.",
        options: ["lived", "have lived", "are living"],
        answer: 0,
        explain: "„then we moved“ — Ankara dönemi bitti. for + süre olsa da bitmiş durum past simple ister: lived.",
      },
      {
        text: "She ___ in this flat since 2020.",
        options: ["has lived", "lived", "lives"],
        answer: 0,
        explain: "since + başlangıç noktası, durum sürüyor → present perfect: has lived. Türkçedeki „yaşıyor“ seni „lives“e çekmesin.",
      },
      {
        text: "___ you ever been to Japan?",
        options: ["Have", "Did", "Were"],
        answer: 0,
        explain: "ever + been: „hayatında hiç“ sorusu → present perfect soru: Have you ever been …?",
      },
      {
        kind: "gapfill",
        text: "We have known each other ___ ten years. (since / for)",
        options: [],
        answer: 0,
        accept: ["for"],
        explain: "„ten years“ bir süre → for. since yalnız başlangıç noktasıyla kullanılır (since 2015).",
      },
      {
        kind: "gapfill",
        text: "I haven't seen that movie ___. (already / yet)",
        options: [],
        answer: 0,
        accept: ["yet"],
        explain: "Olumsuz cümlede „henüz“ = yet, cümle sonunda. already yalnız olumlu cümlede.",
      },
      {
        kind: "gapfill",
        text: "They ___ (move) to Izmir in 2018.",
        options: [],
        answer: 0,
        accept: ["moved"],
        explain: "„in 2018“ zamanı sabitliyor → past simple: moved.",
      },
      {
        kind: "gapfill",
        text: "He ___ (never / eat) fish.",
        options: [],
        answer: 0,
        accept: ["has never eaten", "'s never eaten"],
        explain: "Hayatında hiç: has + never + fiilin üçüncü hâli (eaten). not eklenmez.",
      },
      {
        kind: "order",
        text: "Soruyu doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Have", "you", "finished", "your homework", "yet?"],
        explain: "Soru sırası: Have + özne + üçüncü hâl + nesne; yet en sona: Have you finished your homework yet?",
      },
      {
        kind: "truefalse",
        text: "„I have seen him yesterday.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "yesterday zamanı sabitler; present perfect ile bir arada olmaz. Doğrusu: I saw him yesterday.",
      },
      {
        kind: "truefalse",
        text: "„She has already left.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "already olumlu cümlede has ile üçüncü hâl (left) arasında; cümle doğru.",
      },
    ],
  },
];
