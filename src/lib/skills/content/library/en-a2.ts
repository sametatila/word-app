import type { SkillExercise } from "../../types";

/**
 * EN · A2 — Beceriler kütüphanesi, ilk parti (2026-09-08).
 *
 * Alan adı `de` hedef dil (İngilizce) metnini taşır; `en` alanı bu kursta
 * yazılmaz. Amerikan yazımı.
 *
 * A2'nin belirleyicisi geçmiş zaman: okuma bir gönüllülük günlüğü, yazma iki
 * geçmiş cümlesi ve bir anlatı, söyleyiş drilli -ed sonlarının üç okunuşu,
 * dil bilgisi past simple. Dinleme ise A2'nin öteki işi: bir bilgiyi telefonda
 * eksiksiz almak.
 */
export const enA2: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a2-lib-r1",
    course: "en",
    level: "A2",
    skill: "reading",
    title: "My First Month at the Shelter",
    genre: "blog",
    intro: "Hayvan barınağında gönüllü olan birinin ilk ayını anlattığı blog yazısını okuyacaksın.",
    gloss: [
      { de: "shelter", tr: "barınak" },
      { de: "volunteer", tr: "gönüllü" },
      { de: "cage", tr: "kafes" },
      { de: "scared", tr: "korkmuş" },
      { de: "owner", tr: "sahip" },
      { de: "carry", tr: "taşımak" },
    ],
    minutes: 5,
    text:
      "MY FIRST MONTH AT THE SHELTER\n\n" +
      "Four weeks ago I started as a volunteer at the animal shelter near my flat. I go there every Saturday " +
      "morning for three hours.\n\n" +
      "On my first day I was nervous. Marta, who has worked there for nine years, showed me everything: where the food is, " +
      "how much water each bowl needs, and which dogs you can walk alone.\n\n" +
      "The work is not romantic. I clean cages, I wash blankets and I carry heavy bags. But then there is the other part. " +
      "Two weeks ago I walked a small brown dog called Rocky. He was scared of everything - cars, bikes, even plastic bags. " +
      "Last Saturday a bus stopped next to us and he did not run away. That felt better than any thank-you.\n\n" +
      "Two dogs found a new owner last month. One of them was Rocky's friend, so now Rocky is alone again. I know this is " +
      "good news, but I was sad for a day.\n\n" +
      "If you have three free hours a week, go and ask them. They always need people.",
    questions: [
      {
        text: "What is the text about?",
        options: [
          "The writer's first weeks as a volunteer.",
          "How to choose a dog for your family.",
          "A shelter that will close next month.",
        ],
        answer: 0,
        explain: "Başlık ve ilk cümle bunu söylüyor: dört hafta önce gönüllü olarak başladı. Kapanma ya da köpek seçme hiç geçmiyor.",
      },
      {
        text: "Who is Marta?",
        options: [
          "A woman who has worked at the shelter for nine years.",
          "The writer's neighbor who has two dogs.",
          "A visitor who wants to take Rocky home.",
        ],
        answer: 0,
        explain: "„Marta, who has worked there for nine years, showed me everything.“ — deneyimli çalışan, komşu ya da ziyaretçi değil.",
      },
      {
        kind: "truefalse",
        text: "The writer thinks the work is easy and beautiful.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The work is not romantic. I clean cages, I wash blankets and I carry heavy bags.“ — iş ağır, güzel olan başka bir şey.",
      },
      {
        kind: "gapfill",
        text: "The writer goes to the shelter every ___ morning.",
        options: [],
        answer: 0,
        accept: ["Saturday"],
        explain: "„I go there every Saturday morning and stay for three hours.“",
      },
      {
        text: "Why was the bus important for the writer?",
        options: [
          "It showed that Rocky is less scared now.",
          "It showed that Rocky wants a new owner.",
          "It showed that the streets are dangerous.",
        ],
        answer: 0,
        explain: "Rocky her şeyden korkuyordu; otobüs durduğunda kaçmadı. Yazar bunu „better than any thank-you“ diye anlatıyor.",
      },
      {
        kind: "short_answer",
        text: "Why was the writer sad for a day?",
        options: [],
        answer: 0,
        accept: ["because Rocky is alone", "Rocky is alone", "Rocky's friend left", "because Rocky's friend left"],
        explain: "İki köpek sahip buldu; biri Rocky'nin arkadaşıydı, „so now Rocky is alone again“.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a2-lib-l1",
    course: "en",
    level: "A2",
    skill: "listening",
    title: "Joining the Sunday Ride",
    genre: "phone",
    intro: "Nadir bir bisiklet kulübünü arıyor. Hangi grup, nerede, saat kaçta ve yanında ne getirmeli - dinleyip yakala.",
    gloss: [
      { de: "helmet", tr: "kask" },
      { de: "route", tr: "güzergâh" },
      { de: "pump", tr: "pompa" },
      { de: "brake", tr: "fren" },
      { de: "flag", tr: "bayrak" },
      { de: "on time", tr: "vaktinde" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Nadir", text: "Hello, is that the Riverside Cycling Club?" },
      { speaker: "Priya", text: "Yes, Priya speaking. How can I help you?" },
      { speaker: "Nadir", text: "I saw your poster at the library. I would like to join the Sunday ride, but I have never cycled in a group." },
      { speaker: "Priya", text: "That is no problem. We have two groups. The fast one rides sixty kilometers, the slow one rides twenty-five." },
      { speaker: "Nadir", text: "The slow one, please. Where do you meet?" },
      { speaker: "Priya", text: "At the old bridge. We start at nine, so please come ten minutes earlier. We always leave on time." },
      { speaker: "Nadir", text: "And what do I need to bring?" },
      { speaker: "Priya", text: "A helmet - that is our only rule - some water and a small pump. And please check your brakes at home." },
      { speaker: "Nadir", text: "Is the route difficult?" },
      { speaker: "Priya", text: "It is flat for twenty kilometers and then there is one hill. Last Sunday it rained and we stopped after an hour, but this week the weather looks good." },
      { speaker: "Nadir", text: "Perfect. See you at the bridge on Sunday." },
      { speaker: "Priya", text: "See you, Nadir. Look for the yellow flag." },
    ],
    questions: [
      {
        text: "Why does Nadir call the club?",
        options: [
          "He wants to join the Sunday ride.",
          "He wants to buy a bicycle from the club.",
          "He wants to put a poster in the library.",
        ],
        answer: 0,
        explain: "„I would like to join the Sunday ride“ - afişi kütüphanede görmüş, kendisi asmamış.",
      },
      {
        text: "Which group does Nadir choose?",
        options: ["the group that rides 25 kilometers", "the group that rides 60 kilometers", "he cannot decide yet"],
        answer: 0,
        explain: "Priya iki grubu anlatınca Nadir „The slow one, please“ diyor; yavaş grup yirmi beş kilometre.",
      },
      {
        kind: "truefalse",
        text: "Nadir should be at the bridge at ten to nine.",
        options: ["True", "False"],
        answer: 0,
        explain: "„We start at nine, so please come ten minutes earlier.“ — dokuza on kala orada olmalı.",
      },
      {
        kind: "short_answer",
        text: "What is the club's only rule?",
        options: [],
        answer: 0,
        accept: ["a helmet", "helmet", "wear a helmet", "you need a helmet"],
        explain: "„A helmet - that is our only rule.“ Su ve pompa öneri, kural değil.",
      },
      {
        kind: "dictation",
        text: "Priya'nın son cümlesini duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Look for the yellow flag.", "Look for the yellow flag"],
        explain: "„Look for the yellow flag.“ — emir cümlesi özne almaz.",
      },
      {
        text: "What happened last Sunday?",
        options: [
          "It rained and the group stopped early.",
          "The group rode sixty kilometers.",
          "Nobody came to the meeting point.",
        ],
        answer: 0,
        explain: "„Last Sunday it rained and we stopped after an hour“ - bu hafta hava iyi görünüyor.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-lib-w1",
    course: "en",
    level: "A2",
    skill: "writing",
    title: "One Small Change",
    genre: "message",
    intro: "Önce iki cümle kur, sonra bir arkadaşına son zamanlarda değiştirdiğin bir alışkanlığı anlat.",
    gloss: [
      { de: "instead of", tr: "yerine" },
      { de: "at first", tr: "başta" },
      { de: "save", tr: "biriktirmek" },
      { de: "give up", tr: "vazgeçmek" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Geçen cumartesi ilk kez gönüllü olarak çalıştım.",
        answer: "Last Saturday I worked as a volunteer for the first time.",
        alternatives: ["I worked as a volunteer for the first time last Saturday."],
        hint: "Past simple düzenli fiilde -ed alır ve kişiye göre DEĞİŞMEZ: I worked, she worked. Zaman ifadesi başta ya da sonda durabilir.",
      },
      {
        kind: "build",
        tr: "Otobüse binmedim çünkü hava çok güzeldi.",
        answer: "I didn't take the bus because the weather was very nice.",
        alternatives: [
          "I did not take the bus because the weather was very nice.",
          "I didn't take the bus because the weather was really nice.",
        ],
        hint: "Olumsuzda zamanı „did“ taşır, asıl fiil YALIN kalır: didn't take, didn't took değil.",
      },
      {
        kind: "free",
        prompt:
          "Son birkaç ayda küçük bir alışkanlığını değiştirdin (yürüyerek gitmek, erken kalkmak, daha az şey almak - sen seç). Bir arkadaşına yaz: ne yaptın, başta nasıldı, şimdi nasıl, ona da öner.",
        checklist: [
          "Ne zaman ve neyi değiştirdiğini yaz",
          "Başta nasıl olduğunu geçmiş zamanla anlat",
          "Şimdi ne fark ettiğini söyle",
          "Arkadaşına öner ve bir soru sor",
        ],
        minWords: 40,
        phrases: [
          { de: "About two months ago I started …", tr: "Yaklaşık iki ay önce … başladım" },
          { de: "At first it was …", tr: "Başta … idi" },
          { de: "Now I feel …", tr: "Şimdi kendimi … hissediyorum" },
          { de: "You should try it, because …", tr: "Sen de dene, çünkü …" },
          { de: "Let me know if …", tr: "… olursa haber ver" },
        ],
        sample:
          "Hi Berk, I have news. About two months ago I stopped taking the bus to work and now I walk. It is only " +
          "thirty-five minutes. At first it was hard, because I had to get up earlier and my legs hurt for a week. " +
          "Now I feel much better in the morning and I save forty euros a month. You should try it, because your " +
          "office is even closer than mine. Let me know if you want to walk together on Monday. Selin",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a2-lib-s1",
    course: "en",
    level: "A2",
    skill: "speaking",
    title: "Three sounds of -ed",
    genre: "pronounce",
    intro: "Yazılışı hep aynı, sesi üç türlü: -ed kimi zaman „t“, kimi zaman „d“, yalnız t/d'den sonra „ıd“ olur.",
    gloss: [
      { de: "walked", tr: "yürüdü" },
      { de: "called", tr: "aradı" },
      { de: "waited", tr: "bekledi" },
      { de: "syllable", tr: "hece" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "I walked to work yesterday.",
        tr: "Dün işe yürüyerek gittim.",
        hint: "„walked“ tek hecedir: WOKT. Sonundaki -ed „t“ okunur, ayrı hece değildir.",
        confusions: [
          { heard: ["I walk ed", "I walkid", "I walk it"], fix: "-ed'i ayrı hece yapma; „walked“ tek hecede biter: wokt.", expected: "walked" },
        ],
      },
      {
        de: "We watched a film last night.",
        tr: "Dün gece bir film izledik.",
        hint: "„watched“ = WOÇT. Sessiz harften (ç) sonra -ed „t“ olur.",
        confusions: [
          { heard: ["we watch ed", "we watchid"], fix: "„watched“ tek hece: woçt. Sonuna „ıd“ ekleme.", expected: "watched" },
        ],
      },
      {
        de: "She called me twice.",
        tr: "Beni iki kez aradı.",
        hint: "„called“ = KOLD. „l“ sesli bir harftir, bu yüzden -ed burada „d“ okunur.",
        confusions: [
          { heard: ["she call ed", "she called it", "she call"], fix: "Sonu „d“: kold. Ayrı hece yok ama „d“ duyulmalı.", expected: "called" },
        ],
      },
      {
        de: "They cleaned the kitchen together.",
        tr: "Mutfağı birlikte temizlediler.",
        hint: "„cleaned“ = KLİİND. Yine „d“, tek hece.",
        confusions: [
          { heard: ["they clean ed", "they clean the kitchen"], fix: "Geçmiş zamanın „d“ sesini yutma: kliind.", expected: "cleaned" },
        ],
      },
      {
        de: "I wanted to help you.",
        tr: "Sana yardım etmek istedim.",
        hint: "„wanted“ = WON-tıd, İKİ hece. Kök „t“ ile bittiği için -ed burada ayrı hece olur.",
        confusions: [
          { heard: ["I want to help", "I wantd"], fix: "„t“den sonra -ed ayrı hecedir: won-tıd. Burada hece eklemek DOĞRU.", expected: "wanted" },
        ],
      },
      {
        de: "We waited for an hour.",
        tr: "Bir saat bekledik.",
        hint: "„waited“ = WEY-tıd, iki hece. „hour“ baştaki h okunmaz: AUIR.",
        confusions: [
          { heard: ["we wait for an hour", "we weyted"], fix: "„waited“ iki hece; „hour“ h'siz başlar.", expected: "waited" },
        ],
      },
      {
        de: "He asked a very good question.",
        tr: "Çok iyi bir soru sordu.",
        hint: "„asked“ = AASKT, tek hece ve üç sessiz üst üste: s-k-t. Araya ünlü koyma.",
        confusions: [
          { heard: ["he ask ed", "he askid", "he ask a very good question"], fix: "Sonu „skt“ diye biter; hece ekleme.", expected: "asked" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a2-lib-g1",
    course: "en",
    level: "A2",
    skill: "grammar",
    title: "did and the past",
    genre: "grammar",
    intro: "Geçmişi anlatmanın temel zamanı: düzenli -ed, düzensiz biçimler ve soruda ortaya çıkan „did“.",
    focus: "Past simple: düzenli ve düzensiz fiiller, did ile soru ve olumsuz",
    gloss: [
      { de: "arrive", tr: "varmak" },
      { de: "leave", tr: "ayrılmak" },
      { de: "buy", tr: "satın almak" },
      { de: "understand", tr: "anlamak" },
      { de: "ago", tr: "önce" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "Kişiye göre değişmez",
        tr: "Türkçede geçmiş zaman kişiye göre değişir: gittim, gittin, gitti. İngilizcede past simple herkes için AYNIDIR. Şimdiki zamandaki „-s“ derdi burada yok.",
        examples: [
          { de: "I worked late yesterday.", tr: "Dün geç saate kadar çalıştım." },
          { de: "She worked late, too.", tr: "O da geç saate kadar çalıştı.", note: "she ile de worked, works değil" },
          { de: "We arrived two hours ago.", tr: "İki saat önce vardık.", note: "sonu -e ise yalnız -d eklenir" },
        ],
      },
      {
        heading: "Düzensiz fiiller ezberdir",
        tr: "En sık kullanılan fiillerin çoğu -ed almaz; ikinci biçimi ezberlenir. Kural yok, ama liste kısadır ve her gün karşına çıkar.",
        examples: [
          { de: "I went to the market and bought bread.", tr: "Pazara gittim ve ekmek aldım.", note: "go - went, buy - bought" },
          { de: "She saw the message but forgot to answer.", tr: "Mesajı gördü ama cevap vermeyi unuttu.", note: "see - saw, forget - forgot" },
          { de: "They had a long day.", tr: "Uzun bir gün geçirdiler.", note: "have - had" },
        ],
      },
      {
        heading: "Soru ve olumsuzda zamanı „did“ taşır",
        tr: "Soru ve olumsuz cümlede „did“ devreye girer ve geçmiş bilgisini o üstlenir. Bu yüzden asıl fiil YALIN hâle döner. En sık hata budur: „Did you went?“ yanlış, çünkü zaman iki kez işaretlenmiş olur.",
        examples: [
          { de: "Did you see the film?", tr: "Filmi izledin mi?", note: "see, saw değil" },
          { de: "I didn't understand the question.", tr: "Soruyu anlamadım." },
          { de: "Why did she leave so early?", tr: "Neden bu kadar erken ayrıldı?" },
        ],
      },
    ],
    questions: [
      {
        text: "Yesterday I ___ my grandmother.",
        options: ["visited", "visit", "visits"],
        answer: 0,
        explain: "Geçmiş için düzenli fiil -ed alır: visited. „Yesterday“ zamanı belli ediyor.",
      },
      {
        text: "Which sentence is correct?",
        options: [
          "Did you finish the book?",
          "Did you finished the book?",
          "Do you finished the book?",
        ],
        answer: 0,
        explain: "Soruda zamanı „did“ taşır, asıl fiil yalın kalır: Did you finish …?",
      },
      {
        text: "She ___ to the party because she was ill.",
        options: ["didn't come", "didn't came", "not came"],
        answer: 0,
        explain: "Olumsuzda da fiil yalın: didn't come. „not came“ diye bir biçim yok.",
      },
      {
        kind: "gapfill",
        text: "We ___ (go) to the beach last summer.",
        options: [],
        answer: 0,
        accept: ["went"],
        explain: "„go“ düzensizdir: go - went - gone. Burada ikinci biçim gerekir.",
      },
      {
        kind: "gapfill",
        text: "___ they enjoy the concert? (do / does / did)",
        options: [],
        answer: 0,
        accept: ["Did", "did"],
        explain: "Geçmiş zaman sorusu „did“ ile açılır; „enjoy“ yalın kalır.",
      },
      {
        kind: "gapfill",
        text: "I ___ (buy) this jacket two years ago.",
        options: [],
        answer: 0,
        accept: ["bought"],
        explain: "„buy“ düzensiz: buy - bought. „ago“ geçmiş zamanla kullanılır.",
      },
      {
        kind: "order",
        text: "Soruyu doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Where", "did", "you", "buy", "it?"],
        explain: "Soru kelimesi, did, özne, yalın fiil: Where did you buy it?",
      },
      {
        kind: "truefalse",
        text: "„He didn't wanted to come.“ - Is this sentence correct?",
        options: ["True", "False"],
        answer: 1,
        explain: "„didn't“ zaten geçmişi gösteriyor; doğrusu „He didn't want to come.“",
      },
      {
        kind: "truefalse",
        text: "„They arrived at ten and left at eleven.“ - Is this sentence correct?",
        options: ["True", "False"],
        answer: 0,
        explain: "Biri düzenli (arrive - arrived), öteki düzensiz (leave - left); ikisi de doğru.",
      },
      {
        text: "Soruda ve olumsuzda asıl fiil neden yalın kalır?",
        options: [
          "Çünkü geçmiş bilgisini „did“ taşır.",
          "Çünkü İngilizcede soru cümlesinde fiil çekilmez.",
          "Çünkü „did“ yalnız kibar cümlelerde kullanılır.",
        ],
        answer: 0,
        explain: "Zaman iki kez işaretlenmez: „did“ geçmişi üstlenince fiil yalın hâline döner.",
      },
    ],
  },
];
