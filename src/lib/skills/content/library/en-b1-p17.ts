import type { SkillExercise } from "../../types";

/**
 * EN · B1 — Beceriler kütüphanesi, parti 17.
 *
 * Hücreyi YİRMİYE tamamlayan partilerden biri (11–20). Kurallar ve emsal:
 * `en-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 17 zorluk ve başarı hattı: siste dağdan inen iki yürüyüşçü, dükkânını
 * hisse satarak kurtaran bir köy, yolda yardım eden yabancıya teşekkür
 * mektubu. Dil bilgisi geçmişte yetenek ve başarı — could, was able to,
 * managed to.
 */
export const enB1P17: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-lib-r17",
    course: "en",
    level: "B1",
    skill: "reading",
    title: "Down the Mountain in the Fog",
    genre: "personal",
    intro: "Kişisel bir anlatı: iki arkadaş zirvede sise yakalanıyor; yolu nasıl buldular, ne öğrendiler.",
    gloss: [
      { de: "fog", tr: "sis" },
      { de: "boot", tr: "bot" },
      { de: "useless", tr: "işe yaramaz" },
      { de: "signal", tr: "çekim" },
      { de: "pile", tr: "yığın" },
      { de: "stream", tr: "dere" },
      { de: "mountain rescue", tr: "dağ kurtarma" },
      { de: "sky", tr: "gökyüzü" },
      { de: "stones", tr: "taş" },
      { de: "at the top", tr: "en üstte" },
    ],
    minutes: 6,
    text:
      "We had walked up Ben Carra many times, so on the first Saturday in October we didn't check " +
      "the weather as carefully as we should have. At the top the sky was blue. Twenty minutes " +
      "later we couldn't see our own boots.\n\n" +
      "My friend Joe had a map, but the fog was so thick that the map was almost useless. We could " +
      "see about three meters in every direction. My phone had no signal, and the battery was at " +
      "eleven percent.\n\n" +
      "What saved us was something Joe had learned in the scouts thirty years earlier. We weren't " +
      "able to see the path, but we were able to see the small piles of stones that walkers leave " +
      "next to it. Joe walked from one pile to the next and waited, and I followed his voice.\n\n" +
      "It took us three hours to come down a path that normally takes one. Twice we lost the " +
      "stones completely. The second time, we managed to find them again only because Joe " +
      "remembered a stream that crossed the path, and we followed the sound of the water.\n\n" +
      "We reached the parking lot just as it got dark. We could have called mountain rescue, and some " +
      "people say we should have. Next time I will. But I also learned why those little piles of " +
      "stones are there, and I have added a stone to every pile I have passed since.",
    questions: [
      {
        text: "Why didn't they check the weather carefully?",
        options: [
          "They had no phone signal.",
          "They had walked up the mountain many times.",
          "The forecast had been good all week.",
        ],
        answer: 1,
        explain: "„We had walked up Ben Carra many times“ — bu yüzden havaya dikkatle bakmamışlar.",
      },
      {
        text: "How far could they see in the fog?",
        options: ["about thirty meters", "about one meter", "about three meters"],
        answer: 2,
        explain: "„We could see about three meters in every direction.“",
      },
      {
        kind: "truefalse",
        text: "Once they found the piles of stones, they never lost them again.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Twice we lost the stones completely.“",
      },
      {
        kind: "gapfill",
        text: "Coming down the mountain took ___ hours.",
        options: [],
        answer: 0,
        accept: ["three", "3"],
        explain: "„It took us three hours to come down a path that normally takes one.“",
      },
      {
        kind: "short_answer",
        text: "What helped them find the stones the second time?",
        options: [],
        answer: 0,
        accept: ["a stream", "the stream", "the sound of the water", "the sound of water", "a stream that crossed the path"],
        explain: "Joe yolu kesen bir dereyi hatırlamış; suyun sesini takip etmişler.",
      },
      {
        text: "What does the writer do now?",
        options: [
          "adds a stone to every pile",
          "always carries two phones",
          "never walks in October",
        ],
        answer: 0,
        explain: "„I have added a stone to every pile I have passed since.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-lib-l17",
    course: "en",
    level: "B1",
    skill: "listening",
    title: "The Village That Bought Its Shop",
    genre: "interview",
    intro: "Kısa bir radyo söyleşisi: tek dükkânı kapanan bir köy onu nasıl yeniden açtı, neyi başardı, neyi başaramıyor.",
    gloss: [
      { de: "to retire", tr: "emekli olmak" },
      { de: "buyer", tr: "alıcı" },
      { de: "share", tr: "hisse" },
      { de: "to raise", tr: "para toplamak" },
      { de: "volunteer", tr: "gönüllü" },
      { de: "to compete", tr: "rekabet etmek" },
      { de: "counter", tr: "gişe" },
      { de: "led", tr: "yönetti" },
      { de: "retired", tr: "emekli oldu" },
      { de: "hoped", tr: "umut etmek" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Presenter", text: "When the only shop in Haddon closed last year, the nearest bread and milk were eleven kilometers away. Today the shop is open again, run by the village itself. Mrs Evans led the project." },
      { speaker: "Mrs Evans", text: "The owner retired and tried to sell it for two years, but he couldn't find a buyer. Nobody could make a normal shop pay in a village this size." },
      { speaker: "Presenter", text: "So how were you able to do it?" },
      { speaker: "Mrs Evans", text: "We sold shares at twenty pounds each. We hoped to raise fifteen thousand. In the end, three hundred and ten people bought shares, and we managed to raise almost twenty-two thousand." },
      { speaker: "Mrs Evans", text: "The hardest part wasn't the money. It was finding people to work. We couldn't pay a full team, so forty volunteers do shifts of three hours." },
      { speaker: "Presenter", text: "And is it working?" },
      { speaker: "Mrs Evans", text: "We were able to pay the rent from the first month, which surprised the bank. What we still can't do is compete with supermarket prices, and we've stopped trying." },
      { speaker: "Mrs Evans", text: "People come for the post office counter, the bread from the farm and the conversation. Honestly, I think the conversation matters most." },
    ],
    questions: [
      {
        text: "Why did the old shop close?",
        options: [
          "The owner retired and couldn't sell it.",
          "The rent went up.",
          "A supermarket opened nearby.",
        ],
        answer: 0,
        explain: "Sahibi emekli olmuş ve iki yıl boyunca alıcı bulamamış.",
      },
      {
        text: "How did the village raise the money?",
        options: ["with a bank loan", "by selling shares", "with help from the council"],
        answer: 1,
        explain: "„We sold shares at twenty pounds each.“",
      },
      {
        kind: "truefalse",
        text: "The village raised more money than it had hoped.",
        options: ["True", "False"],
        answer: 0,
        explain: "On beş bin umuyorlarmış; yaklaşık yirmi iki bin toplamışlar.",
      },
      {
        kind: "gapfill",
        text: "Each share cost ___ pounds.",
        options: [],
        answer: 0,
        accept: ["twenty", "20"],
        explain: "„We sold shares at twenty pounds each.“",
      },
      {
        kind: "short_answer",
        text: "Who works in the shop?",
        options: [],
        answer: 0,
        accept: ["volunteers", "forty volunteers", "40 volunteers"],
        explain: "„forty volunteers do shifts of three hours“.",
      },
      {
        text: "What has the shop stopped trying to do?",
        options: [
          "pay the rent",
          "sell bread from the farm",
          "compete with supermarket prices",
        ],
        answer: 2,
        explain: "„What we still can't do is compete with supermarket prices, and we've stopped trying.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-lib-w17",
    course: "en",
    level: "B1",
    skill: "writing",
    title: "Thank You for Stopping",
    genre: "letter",
    intro: "Gece yolda sana yardım eden bir yabancıya teşekkür ediyorsun: önce iki cümle kur, sonra sıcak ve somut bir mektup yaz.",
    gloss: [
      { de: "to break down", tr: "bozulmak" },
      { de: "signal", tr: "çekim" },
      { de: "battery", tr: "akü" },
      { de: "situation", tr: "durum" },
      { de: "properly", tr: "gereği gibi" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "O gece arabayı çalıştıramadım.",
        answer: "I couldn't start the car that night.",
        alternatives: ["That night I couldn't start the car."],
        hint: "Geçmişte yapamamak: „couldn't“ ya da „wasn't able to“ + yalın fiil.",
      },
      {
        kind: "build",
        tr: "Sonunda kardeşime ulaşmayı başardım.",
        answer: "In the end I managed to reach my brother.",
        alternatives: ["I managed to reach my brother in the end."],
        hint: "Zorlukla başarılan tek bir iş: „managed to“ + yalın fiil; olumlu cümlede „could“ olmaz.",
      },
      {
        kind: "free",
        prompt:
          "Geçen hafta gece yolda araban bozuldu ve tanımadığın biri durup sana yardım etti. Adını yerel bir grup üzerinden buldun. Ona bir teşekkür mektubu yaz: ne olduğunu hatırlat, neyi yapamadığını ve onun sayesinde neyi başardığını anlat, sonrasında ne olduğunu söyle ve somut bir teklifle bitir.",
        checklist: [
          "Ne olduğunu kısaca hatırlat",
          "Neyi yapamadığını anlat (couldn't / wasn't able to)",
          "Onun sayesinde neyi başardığını yaz (managed to)",
          "Sonrasını söyle ve somut bir teklifle bitir",
        ],
        minWords: 100,
        phrases: [
          { de: "You probably don't remember me, but …", tr: "Muhtemelen beni hatırlamıyorsunuz ama …", en: "" },
          { de: "I couldn't …, and I wasn't able to …", tr: "… yapamadım, … de yapamadım", en: "" },
          { de: "Thanks to you, I managed to …", tr: "Sizin sayenizde …-meyi başardım", en: "" },
          { de: "You'll be glad to hear that …", tr: "…'i duyunca sevineceksiniz", en: "" },
          { de: "If you're ever in …, …", tr: "Bir gün yolunuz …'e düşerse …", en: "" },
        ],
        sample:
          "Dear Mr Hughes, you probably don't remember me, but last Thursday night you stopped on the " +
          "road between Ashby and Wells when my car broke down. I found your name through the village " +
          "group online, and I wanted to thank you properly. " +
          "I was in a difficult situation. I couldn't start the car, and I wasn't able to call anyone, " +
          "because my phone had no signal there. It was raining and completely dark. " +
          "Thanks to you, I managed to get the car off the road and into the parking lot of the farm " +
          "shop, and you drove me to the village, where my phone worked again. In the end I managed " +
          "to reach my brother, and he came to get me an hour later. " +
          "You'll be glad to hear that the car is fine now: it was only the battery. " +
          "If you're ever in Wells, please let me buy you lunch at the café on the square. I really " +
          "mean it. With many thanks, Leyla Arslan",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b1-lib-s17",
    course: "en",
    level: "B1",
    skill: "speaking",
    title: "Is a Gap Year a Good Idea?",
    genre: "monologue",
    intro: "Yaklaşık bir dakika tek başına konuşacaksın: büyük bir kararı bir örnekle tart ve bir koşul koy.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Liseden sonra üniversiteye başlamadan bir yıl ara vermek iyi bir fikir mi? Görüşünü söyle, tanıdığın birinden bir örnek ver, bir riskini kabul et ve bu yılı işe yarar kılacak koşulu söyle.",
      bulletsTr: [
        "Görüşünü tek cümleyle söyle",
        "Tanıdığın birinden bir örnek ver",
        "Bir riskini kabul et",
        "İşe yarar kılacak koşulu söyle",
      ],
      targets: [
        { de: "It can be a very good idea, but only if …", tr: "Çok iyi bir fikir olabilir ama yalnız … olursa" },
        { de: "A friend of mine managed to …", tr: "Bir arkadaşım …-meyi başardı" },
        { de: "The risk is that …", tr: "Risk şu: …" },
        { de: "For me, the key is …", tr: "Bana göre işin anahtarı …" },
      ],
      minSeconds: 40,
      maxSeconds: 80,
      sampleDe:
        "It can be a very good idea, but only if the year has a shape. A year is long, and " +
        "“I'll find myself” is not a plan. " +
        "A friend of mine managed to turn hers into the most useful year of her life. For six " +
        "months she worked in a hotel kitchen and saved almost everything, and then she spent three " +
        "months volunteering on a farm in Portugal. She couldn't speak any Portuguese when she " +
        "arrived, and by the end she was able to argue with the farmer about tomatoes. When she " +
        "started university, she knew exactly why she had chosen her subject. " +
        "The risk is that the year slowly becomes two, and then three, and the idea of studying " +
        "starts to feel strange. I've seen that happen to my cousin, and it wasn't a disaster, " +
        "but it wasn't a choice either. " +
        "For me, the key is to decide two things before the year starts: what you will do in it, " +
        "and the date it ends.",
      rubricHint:
        "Görüş, bir örnek (could / was able to / managed to), dürüst bir risk ve açık bir koşul beklenir; „only if“, „the risk is that“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b1-lib-g17",
    course: "en",
    level: "B1",
    skill: "grammar",
    title: "could, was able to, managed to",
    genre: "grammar",
    intro: "Türkçede „-ebildim“ tek biçimdir; İngilizce ise genel bir yetenekle zorlukla başarılan tek bir işi ayırır.",
    focus: "Geçmişte yetenek ve başarı: could, was able to, managed to",
    gloss: [
      { de: "jar", tr: "kavanoz" },
      { de: "race", tr: "yarış" },
      { de: "to climb", tr: "tırmanmak" },
      { de: "noisy", tr: "gürültülü" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "could: genel yetenek",
        tr: "„could“ geçmişte GENEL olarak sahip olunan bir yeteneği anlatır: bir kez olan bir olay değil, o dönemdeki bir beceridir. Görmek, duymak gibi algı fiilleriyle tek bir anda da kullanılır: „I could hear music.“",
        examples: [
          { de: "She could swim when she was four.", tr: "Dört yaşındayken yüzebiliyordu.", note: "genel yetenek" },
          { de: "My grandfather could speak three languages.", tr: "Dedem üç dil konuşabiliyordu.", note: "genel yetenek" },
          { de: "We could hear the sea from our room.", tr: "Odamızdan denizi duyabiliyorduk.", note: "algı fiili" },
        ],
      },
      {
        heading: "was able to / managed to: tek seferlik başarı",
        tr: "Belli bir durumda, çoğu zaman zorluğa rağmen BAŞARILAN tek bir iş için olumlu cümlede „could“ kullanılmaz; „was/were able to“ ya da „managed to“ gelir. „managed to“ zorluğu daha çok vurgular.",
        examples: [
          { de: "The fire was big, but everyone managed to get out.", tr: "Yangın büyüktü ama herkes çıkmayı başardı.", note: "zorlukla başarı" },
          { de: "We were able to find a hotel near the station.", tr: "İstasyonun yakınında bir otel bulabildik.", note: "tek seferlik" },
          { de: "After three tries, he managed to open the jar.", tr: "Üç denemeden sonra kavanozu açmayı başardı.", note: "managed to + yalın fiil" },
        ],
      },
      {
        heading: "Olumsuzda fark kalkar",
        tr: "Olumsuz cümlede „couldn't“, „wasn't able to“ ve „didn't manage to“ üçü de olur ve anlam hemen hemen aynıdır. Sık hata: „managed“ arkasından „to“yu unutmak ya da -ing kullanmak („managed opening“ yanlıştır).",
        examples: [
          { de: "I couldn't sleep last night.", tr: "Dün gece uyuyamadım.", note: "olumsuzda could olur" },
          { de: "They weren't able to come to the wedding.", tr: "Düğüne gelemediler.", note: "aynı anlam" },
          { de: "She didn't manage to finish the race.", tr: "Yarışı bitiremedi.", note: "didn't manage to" },
        ],
      },
    ],
    questions: [
      {
        text: "When I was a child, I ___ climb trees very fast.",
        options: ["managed to", "was able", "could"],
        answer: 2,
        explain: "Çocuklukta genel bir yetenek: „could“.",
      },
      {
        text: "The road was closed, but we ___ find another way.",
        options: ["managed to", "could", "manage"],
        answer: 0,
        explain: "Zorluğa rağmen başarılan tek bir iş: olumlu cümlede „could“ değil „managed to“.",
      },
      {
        text: "Which sentence is correct?",
        options: [
          "I could pass the driving test yesterday.",
          "I managed to pass the driving test yesterday.",
          "I managed pass the driving test yesterday.",
        ],
        answer: 1,
        explain: "Dün bir kez başarılan iş: „managed to“ + yalın fiil.",
      },
      {
        kind: "gapfill",
        text: "It was very noisy, and I ___ hear what she said. (could, negative)",
        options: [],
        answer: 0,
        accept: ["couldn't", "could not"],
        explain: "Olumsuzda „couldn't“ tek seferlik durum için de kullanılır.",
      },
      {
        kind: "gapfill",
        text: "After a long search, they were ___ to find the keys.",
        options: [],
        answer: 0,
        accept: ["able"],
        explain: "Tek seferlik başarı: were able to + yalın fiil.",
      },
      {
        kind: "gapfill",
        text: "Did you manage ___ get tickets for the concert?",
        options: [],
        answer: 0,
        accept: ["to"],
        explain: "„manage“ arkasından „to“ + yalın fiil gelir.",
      },
      {
        kind: "gapfill",
        text: "From the top we ___ see the whole city. (can)",
        options: [],
        answer: 0,
        accept: ["could"],
        explain: "Algı fiili „see“ ile geçmişte „could“ kullanılır.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["In the end,", "we managed", "to catch", "the last bus"],
        explain: "Zorlukla başarılan tek bir iş: managed to + yalın fiil.",
      },
      {
        kind: "truefalse",
        text: "„She didn't manage to finish the race.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Olumsuzda „didn't manage to“ doğal ve doğrudur.",
      },
      {
        kind: "truefalse",
        text: "„He managed opening the jar.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„manage“ -ing değil „to“ ister: „He managed to open the jar.“",
      },
    ],
  },
];
