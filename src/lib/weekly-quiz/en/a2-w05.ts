import type { QuizWeek } from "../types";

/**
 * A2 · Hafta 5 · Transfer (İngilizce kursu).
 *
 * ÖLÇÜLEN ŞEY: saf tekrar değil — W1–W4'ün hedefleri yeni bağlamlarda (yeni
 * bir şehre taşınmak, yolculukta hastalanmak, müze, doğum günü). Bazı
 * maddeler iki kuralı üst üste bindiriyor (`was riding` + `stopped`,
 * `a … The`), çünkü transferin zor kısmı kuralların aynı cümlede buluşması.
 *
 * ÇELDİRİCİLERİN GEREKÇESİ:
 *  - `w05-g3` (`don't have to`): W2'deki ayrım bir müzede; Almanca
 *    `müssen nicht` → `mustn't` aktarımı yine anlamı tersine çeviriyor.
 *  - `w05-g5` (`more expensive`): Almanca kursun W4'ündeki kuralın tersi —
 *    Almancada sıfat uzunluğu fark etmez, İngilizcede uzun sıfat `more` ister.
 *  - `w05-v3` (`it takes`): Almanca `braucht man` → `need`, Türkçe 'sürer' →
 *    `last`. Aynı şıklar, iki ayrı sebep.
 */
export const EN_A2_W05: QuizWeek = {
  id: "en-a2-w05",
  course: "en",
  level: "A2",
  no: 5,
  theme: "Putting it all together",
  themeTr: "Hepsi bir arada: yeni durumlar",
  canDo: ["A2.LS.3", "A2.SPK.4", "A2.GR.11", "A2.GR.12", "A2.GR.13", "A2.GR.14", "A2.GR.15", "A2.GR.16"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Blog post",
      genreTr: "Blog yazısı",
      title: "My first month in Dublin",
      body:
        "Last month I came to Dublin for a new job. On my first day I got lost, because I took the wrong bus. " +
        "A kind woman showed me the way, and I arrived just in time. " +
        "My new colleagues are very friendly, and the work is more interesting than in my old job. " +
        "In my second week I got a bad cold. I had to stay at home for three days, and my boss told me to rest. " +
        "Since then I have felt much better. I have already visited two museums, but I haven't seen the famous castle yet. " +
        "My apartment is smaller than my old one, but it is on a quiet street near the river. " +
        "I think I'm going to stay here for a long time!",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Phone call",
      genreTr: "Telefon görüşmesi",
      plays: 2,
      segments: [
        { speaker: "Kate", text: "Hi Omar! How was your trip to Edinburgh?" },
        { speaker: "Omar", text: "Not bad, but I didn't see much. I was ill for two days." },
        { speaker: "Kate", text: "Oh no! What happened?" },
        { speaker: "Omar", text: "I think I ate something bad on the train. I felt terrible, so I stayed in the hotel." },
        { speaker: "Kate", text: "Did you see a doctor?" },
        { speaker: "Omar", text: "No, but I went to a pharmacy, and the woman there gave me some pills." },
        { speaker: "Kate", text: "Are you OK now?" },
        { speaker: "Omar", text: "Yes, much better. I'm going to go back in May, because I really want to see the castle." },
        { speaker: "Kate", text: "Can I come with you? I've never been to Scotland!" },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ───────────────────────────────────────────────── */
    {
      id: "en-a2-w05-r1",
      block: "read",
      ref: "t1",
      stem: "Why did the writer get lost on the first day?",
      options: ["A woman showed the writer the wrong way.", "The bus was late.", "The writer took the wrong bus.", "The writer had a cold."],
      answer: 2,
      why: "Sebep `because` ile hemen arkasında geliyor. Kadın yolu gösterdi, yanlış yol göstermedi; soğuk algınlığı ise ikinci haftaya ait. Sebebi olayla aynı zamana bağlamadan okuyunca metindeki başka bir sorun seçiliyor.",
      targets: ["reading.detail", "past.irregular"],
    },
    {
      id: "en-a2-w05-r2",
      block: "read",
      ref: "t1",
      stem: "Which sentence is true?",
      options: [
        "The writer hasn't seen the castle yet.",
        "The writer has already seen the castle.",
        "The writer hasn't visited any museums.",
        "The writer visited the castle last month.",
      ],
      answer: 0,
      why: "`already` olumlu cümlede 'çoktan oldu', `yet` olumsuz cümlede 'henüz olmadı' demek. Metin ikisini tek cümlede müzeler ve kale için ayrı ayrı kullanıyor; `but`un iki yanını karıştırınca müzelere ait `already` kaleye taşınıyor.",
      targets: ["reading.detail", "present-perfect.already-yet"],
    },
    {
      id: "en-a2-w05-r3",
      block: "read",
      ref: "t1",
      stem: "What does the writer say about the apartment?",
      options: ["It is bigger than the old one.", "It is on a noisy street.", "It is smaller than the old one, but quiet.", "It is next to the castle."],
      answer: 2,
      why: "`smaller than my old one` bir karşılaştırma: yeni daire eskisinden küçük. `than`ın iki yanını ters okumak ('eskisi daha küçük') karşılaştırmada sık hata; `quiet street` de gürültülü seçeneğini eliyor.",
      targets: ["reading.detail", "compare.comparative"],
    },

    /* ── Dinlediğini anlama ─────────────────────────────────────────────── */
    {
      id: "en-a2-w05-l1",
      block: "listen",
      ref: "a1",
      stem: "Why didn't Omar see much in Edinburgh?",
      options: ["The weather was bad.", "The castle was closed.", "The train was late.", "He was ill."],
      answer: 3,
      why: "Gerekçe ilk cevapta: `I was ill for two days`. Tren konuşmada geçiyor ama hastalığın nereden geldiğini anlatırken, gecikme olarak değil. Duyulan sözcüğü (tren) beklenen hikâyeyle (tren → gecikme) birleştirmek tuzak.",
      targets: ["listening.detail", "past.was-were"],
    },
    {
      id: "en-a2-w05-l2",
      block: "listen",
      ref: "a1",
      stem: "What did Omar do when he was ill?",
      options: ["He saw a doctor.", "He called Kate.", "He went home.", "He went to a pharmacy."],
      answer: 3,
      why: "`Did you see a doctor?` → `No, but…`: doktor elendi, asıl yapılan `but`tan sonra geliyor. `did` ile sorulan soruya verilen kısa olumsuz cevabı atlayınca soru cümlesi olmuş olay gibi duyuluyor.",
      targets: ["listening.detail", "past.did-question"],
    },
    {
      id: "en-a2-w05-l3",
      block: "listen",
      ref: "a1",
      stem: "What is Omar's plan?",
      options: ["to see a doctor in May", "to go back to Edinburgh in May", "to visit Kate in Scotland", "to take the train with Kate"],
      answer: 1,
      why: "`I'm going to` önceden verilmiş bir kararı söyler. Kate'in gelmek istemesi yalnız bir soru (`Can I come with you?`), henüz cevaplanmış bir plan değil; soruyu kararla karıştırmak hata.",
      targets: ["listening.detail", "future.going-to"],
    },

    /* ── Dilbilgisi ─────────────────────────────────────────────────────── */
    {
      id: "en-a2-w05-g1",
      block: "grammar",
      stem: "I ___ my bike to work when a car suddenly stopped in front of me.",
      options: ["rode", "am riding", "was riding", "have ridden"],
      answer: 2,
      why: "Aniden olan bir olay (`stopped`) sürmekte olan bir eylemi kesiyor: süren eylem `was riding`. `rode` iki olayı art arda sıralar, iç içe değil; kesilen eylem hangi fiil olursa olsun `-ing` alır.",
      targets: ["past.continuous", "past.irregular"],
      byNative: {
        de: {
          options: ["was riding", "rode", "have ridden", "am riding"],
          answer: 0,
          why: "Almanca `Ich fuhr mit dem Rad, als…` tek bir geçmiş biçimle kurulur. İngilizcede arka planda süren eylem `was riding`, onu kesen olay `stopped`; `have ridden` ise bitmiş bir anlatıya girmez.",
        },
      },
    },
    {
      id: "en-a2-w05-g2",
      block: "grammar",
      stem: "We have known each other ___ we were children.",
      options: ["for", "since", "from", "ago"],
      answer: 1,
      why: "`since` başlangıç anını verir ve bu an bir tarih değil bir olay da olabilir: `since we were children`. `for` yalnız süreyle gelir (`for twenty years`). Türkçe 'çocukluğumuzdan beri' '-den beri' ile kurulduğu için `from` seçiliyor.",
      targets: ["present-perfect.since-for"],
      byNative: {
        de: {
          options: ["for", "from", "ago", "since"],
          answer: 3,
          why: "Burada Almanca `seit` → `since` doğru, çünkü arkadan bir başlangıç anı geliyor (`seit wir Kinder waren`). `for` Almanca `für` gibi görünür ama süre ölçer.",
        },
      },
    },
    {
      id: "en-a2-w05-g3",
      block: "grammar",
      stem: "Today is Sunday. You ___ pay to go into the museum, it's free.",
      options: ["mustn't", "don't have to", "haven't to", "don't must"],
      answer: 1,
      why: "Ücretsiz bir yerde ödemek yasak değil, gerekmiyor: `don't have to`. `mustn't` bir şeyin yasak olduğunu söyler. Hata `must` = 'zorunda' ezberinden geliyor: 'zorunda değilsin' `must`un olumsuzu sanılıp `mustn't` kuruluyor.",
      targets: ["modal.have-to", "modal.must-not"],
      byNative: {
        de: {
          options: ["don't have to", "mustn't", "don't must", "haven't to"],
          answer: 0,
          why: "Almanca `Sie müssen nicht bezahlen` → `mustn't pay` aktarımı anlamı tersine çeviriyor: İngilizce `mustn't` yasak. 'Gerek yok' `don't have to`.",
        },
      },
    },
    {
      id: "en-a2-w05-g4",
      block: "grammar",
      stem: "I bought ___ new laptop last week. ___ laptop is already broken!",
      options: ["the … A", "a … A", "a … The", "(no word) … The"],
      answer: 2,
      why: "İlk kez söz edilen şey `a` alır; aynı şeyden ikinci kez söz edilince artık bilinen bir şeydir ve `the` alır. Türkçede belirlilik çoğu zaman sıra ya da ekle anlaşılıyor; İngilizcede her seferinde artikelle işaretleniyor.",
      targets: ["article.a-an", "article.the"],
      byNative: {
        de: {
          options: ["a … The", "the … A", "a … A", "(no word) … The"],
          answer: 0,
          why: "Almancadaki `ein Laptop … Der Laptop` ayrımı aynen geçerli: ilk kez söz edilen `a`, ikinci kez `the`. İngilizcede artikel cinsiyete göre değişmediği için dikkat edilecek tek şey belirli/belirsiz ayrımı.",
        },
      },
    },
    {
      id: "en-a2-w05-g5",
      block: "grammar",
      stem: "The train is ___ than the bus, but it's much faster.",
      options: ["expensiver", "most expensive", "more expensiver", "more expensive"],
      answer: 3,
      why: "İki heceden uzun sıfatlar karşılaştırmada `more` alır: `more expensive`. `-er` yalnız kısa sıfatlar içindir (`faster`) ve ikisi birlikte hiçbir zaman gelmez. Aynı cümlede iki biçim de var: kısa `faster`, uzun `more expensive`.",
      targets: ["compare.comparative"],
      byNative: {
        de: {
          options: ["more expensive", "expensiver", "most expensive", "more expensiver"],
          answer: 0,
          why: "Almancada sıfatın uzunluğu fark etmez, her zaman `-er` eklenir (`teurer`, `interessanter`). İngilizcede uzun sıfat `more` ister: `more expensive`.",
        },
      },
    },

    /* ── Bağlamda kelime ────────────────────────────────────────────────── */
    {
      id: "en-a2-w05-v1",
      block: "vocab",
      stem: "I love Dublin, but I ___ my family a lot.",
      options: ["lose", "forget", "miss", "leave"],
      answer: 2,
      why: "`miss` iki anlam taşır: treni kaçırmak ve birini özlemek. Türkçede bunlar iki ayrı fiil; `miss`i yalnız 'kaçırmak' diye ezberleyen öğrenci özlem cümlesinde başka bir fiil arıyor.",
      targets: ["verb.miss"],
      byNative: {
        de: {
          options: ["lose", "forget", "leave", "miss"],
          answer: 3,
          why: "Almancada iki ayrı fiil var: `vermissen` (özlemek) ve `verpassen` (kaçırmak); İngilizcede ikisi de `miss`. `lose` Almanca `verlieren` gibi bir şeyi kaybetmek, özlem bildirmez.",
        },
      },
    },
    {
      id: "en-a2-w05-v2",
      block: "vocab",
      stem: "I ___ a new phone for my birthday.",
      options: ["took", "gave", "made", "got"],
      answer: 3,
      why: "Hediye, mektup ya da mesaj sana gelince `get`. Türkçe 'almak' `take`e, 'hediye' düşüncesi de `gave`e çekiyor; ama hediyeyi alan sensen fiil `get`.",
      targets: ["verb.get", "falsefriend.become"],
      byNative: {
        de: {
          options: ["took", "got", "became", "made"],
          answer: 1,
          why: "Almanca `Ich habe ein Handy bekommen` → `became` aktarımı: İngilizce `become` 'olmak' demek. 'Hediye olarak aldım' `I got`.",
        },
      },
    },
    {
      id: "en-a2-w05-v3",
      block: "vocab",
      stem: "How long does it ___ to get to the airport by train?",
      options: ["need", "last", "take", "make"],
      answer: 2,
      why: "Yolculuğun ne kadar sürdüğü `it takes` kalıbıyla sorulur. Türkçe 'sürmek' `last`e çekiyor ama `last` bir olayın süresi için (`The film lasted two hours`), bir yere varma süresi için değil.",
      targets: ["collocation.take"],
      byNative: {
        de: {
          options: ["need", "take", "last", "make"],
          answer: 1,
          why: "Almanca `Wie lange braucht man…?` → `need` aktarımı. İngilizcede bir yere varma süresi `it takes` ile sorulur: `How long does it take?`",
        },
      },
    },
  ],
};
