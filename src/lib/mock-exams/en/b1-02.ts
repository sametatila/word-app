import type { MockPaper } from "../types";

/**
 * B1 · Deneme 2 — "Everyday Choices and the Environment".
 *
 * Deneme 1 ile AYNI PLAN; konu ayrı. Birincisi iş ve öğrenimi, bu ikincisi
 * gündelik seçimleri ve çevreyi konu alıyor. İkisi de B1'in ölçtüğü şeyi
 * taşıyor: bir görüşün gerekçesini izlemek ve iki seçenek arasında karar
 * verirken ölçüt kullanmak.
 *
 * B1 SINIRI: present perfect ile past simple ayrımı, birinci ve ikinci tip
 * koşul, ilgi cümlesi, `used to`, temel edilgen, sık öbek fiiller.
 */
export const EN_B1_02: MockPaper = {
  id: "en-b1-02",
  course: "en",
  level: "B1",
  no: 2,
  theme: "Everyday Choices and the Environment",
  themeTr: "Gündelik seçimler ve çevre",
  minutes: 155,
  parts: [
    /* ── READING ───────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 55,
      instruction:
        "This part has six tasks. You read notices, adverts, an article and two texts with gaps. Choose the correct answer for each question.",
      instructionTr:
        "Bu bölümde altı görev var. Duyurular, ilanlar, bir yazı ve boşluklu iki metin okuyacaksın. Her soruda doğru cevabı işaretle.",
      tasks: [
        {
          id: "en-b1-02-l1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Read the five texts and questions 1 to 5. Choose a, b or c.",
          promptTr: "Beş metni ve 1–5. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "m1",
              genre: "Notice in a supermarket",
              genreTr: "Market duyurusu",
              title: "Bring your own container",
              body: `From October you can fill your own box at the cheese and olive counter. The box must be clean and it must close. We weigh it first, so you only pay for the food. Boxes that have held meat are not accepted.`,
            },
            {
              kind: "text",
              id: "m2",
              genre: "Email to residents",
              genreTr: "Sakinlere e-posta",
              title: "New rubbish collection",
              body: `Paper will be collected on Tuesdays instead of Fridays from 1 May. Glass does not change. If your street has building work, the lorry may come a day late, and we will not send a message about this.`,
            },
            {
              kind: "text",
              id: "m3",
              genre: "Advert",
              genreTr: "İlan",
              title: "Repair, do not replace",
              body: `Our workshop repairs coffee machines, toasters and kettles. We look at your machine for free and then tell you the price. If a repair costs more than half of a new machine, we say so honestly and you decide.`,
            },
            {
              kind: "text",
              id: "m4",
              genre: "Message",
              genreTr: "İleti",
              title: "From the allotment group",
              body: `The water tank is empty again. Please do not use the hose for the paths, only for the beds. We have asked twice now. If it continues, the group will have to lock the tap and give out keys.`,
            },
            {
              kind: "text",
              id: "m5",
              genre: "Notice at a station",
              genreTr: "İstasyon duyurusu",
              title: "Cycle parking",
              body: `The covered stands are for season ticket holders, who receive a code by email. Everybody else can use the open stands at the north entrance. Bicycles left for more than two weeks are removed and stored for a month.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-02-l1-1",
              no: 1,
              ref: "m1",
              text: "Which box can you not use?",
              options: ["One that was used for meat", "One that you weigh yourself at home", "One that is not completely full"],
              answer: 0,
              explain:
                "Duyuru tek bir kutu türünü dışlıyor: «Boxes that have held meat are not accepted». Tartmayı mağaza yapıyor («We weigh it first»), müşteri evde tartmıyor; doluluk ise hiç şart koşulmuyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-02-l1-2",
              no: 2,
              ref: "m2",
              text: "What should residents expect during building work?",
              options: ["A message from the council about the delay", "A collection that may happen one day later", "Paper and glass collected on the same day"],
              answer: 1,
              explain:
                "E-posta hem gecikmeyi hem de haber verilmeyeceğini söylüyor: «the lorry may come a day late, and we will not send a message about this». Cam günü değişmiyor, dolayısıyla iki atığın aynı güne düşmesi diye bir bilgi yok.",
            },
            {
              kind: "mcq",
              id: "en-b1-02-l1-3",
              no: 3,
              ref: "m3",
              text: "What does the workshop promise?",
              options: ["A repair that is always cheaper than a new machine", "A free repair for small machines", "An honest answer when a repair is not worth it"],
              answer: 2,
              explain:
                "İlan tam bunu taahhüt ediyor: «If a repair costs more than half of a new machine, we say so honestly and you decide». Ücretsiz olan tamir değil, ilk bakış; her tamirin ucuz olacağına dair bir söz de verilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-02-l1-4",
              no: 4,
              ref: "m4",
              text: "What will happen if the problem does not stop?",
              options: ["The group will pay for more water", "The tap will be locked and keys given out", "The paths will be closed to members"],
              answer: 1,
              explain:
                "İleti sonucu açıkça söylüyor: «the group will have to lock the tap and give out keys». Yollar hortum kullanımının yasak olduğu yer, kapatılan bir alan değil; su satın almaktan hiç söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-02-l1-5",
              no: 5,
              ref: "m5",
              text: "Who can use the covered stands?",
              options: ["Anybody who arrives before the stands are full", "People with a season ticket", "People who have registered at the north entrance"],
              answer: 1,
              explain:
                "Duyuru bir grup tanımlıyor: «The covered stands are for season ticket holders, who receive a code by email». Kuzey giriş kayıt yeri değil, ötekiler için açık park yerinin bulunduğu yer; doluluk sırası hiç geçmiyor.",
            },
          ],
        },
        {
          id: "en-b1-02-l2",
          no: 2,
          format: "match",
          goal: "orientation",
          prompt:
            "Read about five people, 6 to 10. Then read the eight adverts a to h. Which advert is right for each person? You use each advert once only.",
          promptTr:
            "6–10. maddelerdeki beş kişiyi oku. Sonra a'dan h'ye sekiz ilanı oku. Her kişiye hangi ilan uyar? Her ilan en fazla bir kez kullanılır.",
          options: [
            { key: "a", label: "Tool Library", body: "Borrow a drill, a ladder or a sewing machine for up to a week. Twenty pounds a year for as many items as you like. You must return things clean." },
            { key: "b", label: "Community Fridge", body: "Food that shops cannot sell, free for anybody, every evening from six. No questions and no forms. Bring a bag; we cannot give you one." },
            { key: "c", label: "Bike Kitchen", body: "Repair your own bicycle with our tools and our help, Wednesdays and Saturdays. You pay for parts only. Beginners very welcome; we do not repair it for you." },
            { key: "d", label: "Clothes Swap", body: "Bring up to five clean items and take up to five home. First Sunday of the month, in the community hall. No money changes hands." },
            { key: "e", label: "Garden Share", body: "People with a big garden and no time are matched with people who want to grow food and have no garden. You share the harvest. Free to join." },
            { key: "f", label: "Solar Advice Evening", body: "An independent engineer explains what a roof can and cannot do. No company is present and nothing is sold. Third Thursday, 7 p.m., online or in person." },
            { key: "g", label: "Weekly Veg Box", body: "Vegetables from three farms within thirty kilometres, delivered on Thursday. You cannot choose what is in the box. From 14 pounds a week." },
            { key: "h", label: "Furniture Rescue", body: "We collect sofas, tables and beds you no longer want, and pass them on to families setting up a home. Free collection, but the item must be in good condition." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b1-02-l2-6",
              no: 6,
              text: "Sandra needs a ladder for two days and does not want to buy one that she will use once.",
              answer: "a",
              explain:
                "İlan hem nesneyi hem süreyi karşılıyor: «Borrow a drill, a ladder or a sewing machine for up to a week». Sandra iki gün için istiyor, bu sınırın içinde. Öteki ilanların hiçbiri alet ödünç vermiyor.",
            },
            {
              kind: "match",
              id: "en-b1-02-l2-7",
              no: 7,
              text: "Yusuf wants to learn how to fix his own bicycle rather than pay somebody to do it.",
              answer: "c",
              explain:
                "İlan bu ayrımı kendi cümlesinde yapıyor: «Repair your own bicycle with our tools and our help» ve «we do not repair it for you». Yusuf öğrenmek istiyor, hizmet satın almak değil.",
            },
            {
              kind: "match",
              id: "en-b1-02-l2-8",
              no: 8,
              text: "The Osei family are moving into an empty flat and have almost no furniture.",
              answer: "h",
              explain:
                "İlan tam bu durumu adlandırıyor: eşyalar «families setting up a home» için toplanıyor. Kıyafet takası da ücretsiz ama mobilya vermiyor; Osei ailesinin ihtiyacı mobilya.",
            },
            {
              kind: "match",
              id: "en-b1-02-l2-9",
              no: 9,
              text: "Lena has a large garden that she cannot look after any more, and she would like it to be used.",
              answer: "e",
              explain:
                "İlan iki tarafı eşleştiriyor: «People with a big garden and no time are matched with people who want to grow food». Lena tam birinci taraf. Sebze kutusu da yiyecekle ilgili ama bir satın alma hizmeti, bahçesi olan biri için değil.",
            },
            {
              kind: "match",
              id: "en-b1-02-l2-10",
              no: 10,
              text: "Deniz is thinking about panels on his roof but does not want a sales talk.",
              answer: "f",
              explain:
                "İlan satışı açıkça dışlıyor: «No company is present and nothing is sold», bilgi veren de bağımsız bir mühendis. Deniz'in tek çekincesi satış konuşması olduğu için ölçüt tam bu cümlede karşılanıyor.",
            },
          ],
        },
        {
          id: "en-b1-02-l3",
          no: 3,
          format: "mcq",
          goal: "opinion",
          prompt: "Read the article and questions 11 to 15. Choose a, b, c or d.",
          promptTr: "Yazıyı ve 11–15. maddeleri oku. a, b, c ya da d'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t3",
              genre: "Newspaper column",
              genreTr: "Gazete köşe yazısı",
              title: "I counted everything I threw away for a month",
              body: `I did not start this as an experiment. My bin broke, and for two weeks I put everything in bags in the hall, where I had to look at it. That was the whole method.

By the end of the month I had counted four hundred and twelve items. Two thirds of them were packaging. The rest was mostly food, and here I want to be honest: almost none of it was food I had planned to throw away. It was food I had bought twice because I could not remember what was already in the fridge.

The obvious answer is a list. I have tried lists for years and they have never worked for me, because I write them at home and I shop on the way back from work. What did work was a photograph. Before I leave the flat I take a picture of the open fridge. It takes two seconds and it has cut my food waste by about half.

I should say clearly that this is not a solution to anything large. The packaging, which was two thirds of the problem, is not my decision. I cannot buy rice that comes without a bag, and the shop that sells loose rice is a bus ride away, which has its own cost.

So I have stopped feeling proud about my bin and I have started writing to the supermarket instead. If enough of us do that, they may listen, although I would not bet my month on it.`,
              gloss: [
                { de: "packaging", tr: "ambalaj", en: "packaging" },
                { de: "waste", tr: "atık, israf", en: "waste" },
                { de: "loose", tr: "ambalajsız, dökme", en: "loose, unpackaged" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-02-l3-11",
              no: 11,
              text: "Why did the writer start counting?",
              options: [
                "She wanted to write an article about waste",
                "A friend asked her to try it for a month",
                "Her bin stopped working and the bags stayed in sight",
                "Her council sent her a form to complete",
              ],
              answer: 2,
              explain:
                "İlk paragraf niyeti reddediyor: «I did not start this as an experiment». Sebep tesadüf: «My bin broke, and for two weeks I put everything in bags in the hall, where I had to look at it». Arkadaş, belediye ya da yazı planı metinde hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-02-l3-12",
              no: 12,
              text: "What does she say about the food she threw away?",
              options: [
                "Most of it had passed its date",
                "It was mostly food her family did not like",
                "It was a small part of the total",
                "Most of it was bought twice by mistake",
              ],
              answer: 3,
              explain:
                "Yazar sebebi kendisi adlandırıyor: «It was food I had bought twice because I could not remember what was already in the fridge». Tarih geçmesi ya da beğenilmemesi metinde yok; yiyecek toplamın üçte biri, yani küçük bir pay değil.",
            },
            {
              kind: "mcq",
              id: "en-b1-02-l3-13",
              no: 13,
              text: "Why did shopping lists not work for her?",
              options: [
                "Because she often lost the paper on the way",
                "Because she wrote them in the wrong place at the wrong time",
                "Because her flatmate changed them",
                "Because she found them too slow to write",
              ],
              answer: 1,
              explain:
                "Gerekçe cümlenin ikinci yarısında: «because I write them at home and I shop on the way back from work». Sorun listenin kendisi değil, yazıldığı yer ile alışverişin yapıldığı yerin ayrı olması. Kaybolma ya da ev arkadaşı metinde geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-02-l3-14",
              no: 14,
              text: "What is her attitude to her own solution?",
              options: [
                "She thinks every household should copy it",
                "She thinks it helps her but changes little overall",
                "She thinks it was a waste of a month",
                "She thinks it will work better with a list as well",
              ],
              answer: 1,
              explain:
                "Yazar kendi çözümünün etkisini de sınırını da söylüyor: gıda israfını yarıya indirmiş, ama «this is not a solution to anything large» ve ambalaj «is not my decision». Herkese önerme ya da pişmanlık metinde yok.",
            },
            {
              kind: "mcq",
              id: "en-b1-02-l3-15",
              no: 15,
              text: "How does she describe writing to the supermarket?",
              options: [
                "As something she does instead of feeling proud",
                "As a campaign she has organised with her supermarket",
                "As advice she gives but does not follow",
                "As a step she is sure will succeed",
              ],
              answer: 0,
              explain:
                "Son paragraf iki davranışı karşı karşıya koyuyor: «I have stopped feeling proud about my bin and I have started writing to the supermarket instead». Başarıdan emin değil («I would not bet my month on it»), örgütlü bir kampanyadan da söz etmiyor.",
            },
          ],
        },
        {
          id: "en-b1-02-l4",
          no: 4,
          format: "match",
          goal: "structure",
          prompt:
            "Read the text. One sentence is missing from each of the gaps 16 to 20. Which sentence a to f fits which gap? One sentence fits nowhere.",
          promptTr:
            "Metni oku. 16–20. boşluklarda birer cümle eksik. a–f cümlelerinden hangisi hangi boşluğa uyar? Bir cümle hiçbir yere uymuyor.",
          texts: [
            {
              kind: "text",
              id: "t4",
              genre: "Magazine text",
              genreTr: "Dergi metni",
              title: "The return of the repair shop",
              body: `For thirty years the number of repair shops in Europe fell every single year. Since 2019 that number has been rising again. {{16}}

Part of the reason is a change in the law. In several countries a manufacturer must now sell spare parts for a set number of years. {{17}}

But the law alone does not explain the change. Repair cafés, which are run by volunteers, have taught a generation that a machine can be opened. {{18}}

There is a limit, and it is worth naming. A repair is only cheap if the labour is cheap or free. {{19}}

The most interesting effect may be a slower one. When people expect to repair a thing, they buy differently in the first place. {{20}}`,
              gloss: [
                { de: "a manufacturer", tr: "üretici", en: "manufacturer" },
                { de: "spare parts", tr: "yedek parça", en: "spare parts" },
                { de: "labour", tr: "işçilik", en: "labour" },
              ],
            },
          ],
          options: [
            { key: "a", label: "a", body: "Shops now ask whether a machine can be opened at all, and some customers pay more for one that can." },
            { key: "b", label: "b", body: "In a commercial workshop an hour of work can cost more than the machine is worth, and that has not changed." },
            { key: "c", label: "c", body: "The rise is small, but it has now continued for six years in a row." },
            { key: "d", label: "d", body: "That single rule has done more for repair than twenty years of advice to consumers." },
            { key: "e", label: "e", body: "Once you have seen the inside of a toaster, you stop believing that it is a sealed box." },
            { key: "f", label: "f", body: "Sales of new kitchen machines were higher last winter than in any winter since 2015." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b1-02-l4-16",
              no: 16,
              text: "Gap 16",
              answer: "c",
              explain:
                "Boşluktan önce «Since 2019 that number has been rising again» deniyor; (c) bu yükselişi niteliyor ve süresini veriyor: küçük ama altı yıldır sürüyor. Sayıdan sayının değerlendirmesine geçiş.",
            },
            {
              kind: "match",
              id: "en-b1-02-l4-17",
              no: 17,
              text: "Gap 17",
              answer: "d",
              explain:
                "Önceki cümle tek bir yasal kuralı anlatıyor (yedek parça zorunluluğu); (d) «That single rule» ile ona geri gönderme yapıp etkisini tartıyor. Gönderme öğesi bağı doğrudan kuruyor.",
            },
            {
              kind: "match",
              id: "en-b1-02-l4-18",
              no: 18,
              text: "Gap 18",
              answer: "e",
              explain:
                "Paragraf «Repair cafés, which are run by volunteers, have taught a generation that a machine can be opened» diyor; (e) bunu birinci tekil deneyime çeviriyor: bir kez içini gördükten sonra kapalı bir kutu olduğuna inanmazsın. Aynı düşüncenin somut hâli.",
            },
            {
              kind: "match",
              id: "en-b1-02-l4-19",
              no: 19,
              text: "Gap 19",
              answer: "b",
              explain:
                "Önceki cümle sınırı koyuyor: tamir ancak işçilik ucuzsa ucuzdur; (b) bunu ticari atölye örneğiyle açıyor ve «that has not changed» diyerek sınırın kalıcı olduğunu söylüyor.",
            },
            {
              kind: "match",
              id: "en-b1-02-l4-20",
              no: 20,
              text: "Gap 20",
              answer: "a",
              explain:
                "Son paragraf «they buy differently in the first place» diyor; (a) bunu somutlaştırıyor: mağazalar artık açılabilirliği soruyor ve müşteri bunun için fazla ödüyor. (f) yeni makine satışlarından söz ediyor ve metnin hiçbir yerinde satış rakamı tartışılmıyor — hiçbir boşluğa uymayan cümle odur.",
            },
          ],
        },
        {
          id: "en-b1-02-l5",
          no: 5,
          format: "gapMcq",
          goal: "structure",
          prompt: "Read the text and complete gaps 21 to 25. Which word fits: a, b, c or d?",
          promptTr: "Metni oku ve 21–25. boşlukları tamamla. Hangi sözcük uyar: a, b, c ya da d?",
          texts: [
            {
              kind: "text",
              id: "t5",
              genre: "Consumer advice",
              genreTr: "Tüketici tavsiyesi",
              title: "Before you buy a second-hand phone",
              body: `A used phone can be a very good deal, but only if you {{21}} attention to three things.

First, ask how long the maker will still send security updates. A phone that no longer {{22}} updates is cheap for a reason.

Second, check the battery. Sellers often {{23}} that the battery is fine, and in most cases they believe it, because a battery fails slowly.

Third, agree in advance what happens if something goes wrong. A private seller does not have to {{24}} the phone back, and many buyers discover this too late.

None of this takes long. Fifteen minutes of questions can {{25}} you from a year of small problems.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-02-l5-21",
              no: 21,
              text: "Gap 21",
              options: ["give", "pay", "make", "put"],
              answer: 1,
              explain:
                "`pay attention to` sabit bir eşdizim. `give attention` bazı bağlamlarda geçse de `to` ile bu kalıbı kurmaz; `make attention` ve `put attention` İngilizcede yoktur.",
            },
            {
              kind: "mcq",
              id: "en-b1-02-l5-22",
              no: 22,
              text: "Gap 22",
              options: ["is receiving", "received", "would receive", "receives"],
              answer: 3,
              explain:
                "Özne `a phone` tekil ve cümle genel bir durumu anlatıyor: geniş zaman gerekiyor. `receives` doğru; `received` geçmiş, `is receiving` o an süren bir eylem, `would receive` ise koşullu bir kip ve buradaki genel doğruya uymaz.",
            },
            {
              kind: "mcq",
              id: "en-b1-02-l5-23",
              no: 23,
              text: "Gap 23",
              options: ["explain", "say", "tell", "speak"],
              answer: 1,
              explain:
                "Boşluktan sonra `that` ile bir yan cümle geliyor ve nesne yok. `say that …` bu yapıyı kurar; `tell` bir kişi nesnesi ister (tell you that), `speak` yan cümle almaz, `explain` ise burada anlamı değil biçimi bozar.",
            },
            {
              kind: "mcq",
              id: "en-b1-02-l5-24",
              no: 24,
              text: "Gap 24",
              options: ["take", "bring", "carry", "hold"],
              answer: 0,
              explain:
                "`take something back` bir öbek fiil: iade almak. `bring back` geri getirmek demektir ve özne satıcı olduğunda yön ters döner; `carry` ve `hold` bu anlamı hiç vermez.",
            },
            {
              kind: "mcq",
              id: "en-b1-02-l5-25",
              no: 25,
              text: "Gap 25",
              options: ["save", "protect", "keep", "defend"],
              answer: 0,
              explain:
                "`save somebody from something` kalıbı: birini bir şeyden kurtarmak. `protect from` de doğrudur ama nesne bir kişi ve kaynak bir zaman kaybı olduğunda `save` çok daha doğal; `keep` ve `defend` bu kalıpta bu anlamı vermez.",
            },
          ],
        },
        {
          id: "en-b1-02-l6",
          no: 6,
          format: "gap",
          goal: "structure",
          prompt: "Read the text and complete gaps 26 to 30. Write ONE word in each gap.",
          promptTr: "Metni oku ve 26–30. boşlukları tamamla. Her boşluğa TEK bir sözcük yaz.",
          texts: [
            {
              kind: "text",
              id: "t6",
              genre: "Blog comment",
              genreTr: "Blog yorumu",
              title: "On the plastic bag question",
              body: `I used {{26}} think that paper bags were the obvious answer, and I said so loudly for years.

Then a friend {{27}} works in packaging showed me the numbers. A paper bag needs more water and more energy to make, so it has to be used several times before it is better.

The bag that is really better is the one you already own. If I {{28}} remembered my old bag, I would not have bought three new ones last month.

So I have changed my mind, {{29}} not in the direction people expect. The material matters much less {{30}} the number of times you carry it.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b1-02-l6-26",
              no: 26,
              text: "Gap 26",
              accept: ["to"],
              explain:
                "`used to + yalın fiil` geçmişteki bir alışkanlığı ya da eski bir kanıyı bildirir: «I used to think …». Devamındaki «Then a friend … showed me» bu kanının değiştiğini gösteriyor, yani yapı tam yerinde.",
            },
            {
              kind: "gap",
              id: "en-b1-02-l6-27",
              no: 27,
              text: "Gap 27",
              accept: ["who", "that"],
              explain:
                "«a friend ___ works in packaging» yapısında boşluk özne konumunda bir ilgi zamiri istiyor ve öncül insan: `who` ya da `that`. Zamir özne olduğu için düşürülemez; `which` insanlar için kullanılmaz.",
            },
            {
              kind: "gap",
              id: "en-b1-02-l6-28",
              no: 28,
              text: "Gap 28",
              accept: ["had"],
              explain:
                "Ana cümlede `would not have bought` var: geçmişe dair gerçekleşmemiş bir koşul. Üçüncü tip koşulun `if` yarısı `had + üçüncü hâl` ister. `have` ya da `did` bu yapıda gelmez.",
            },
            {
              kind: "gap",
              id: "en-b1-02-l6-29",
              no: 29,
              text: "Gap 29",
              accept: ["but", "though", "although"],
              explain:
                "Yazar fikrini değiştirdiğini söylüyor ama beklenen yönde değil: iki yarı karşıt. `but` bu karşıtlığı kurar; `though` ve `although` da aynı ilişkiyi verir. `and` ya da `so` karşıtlığı siler.",
            },
            {
              kind: "gap",
              id: "en-b1-02-l6-30",
              no: 30,
              text: "Gap 30",
              accept: ["than"],
              explain:
                "Cümlede `much less` var, yani karşılaştırma başlamış; ikinci öğe `than` ile bağlanır. `as` yalnız `as … as` yapısında gelir ve orada `less` kullanılmaz.",
            },
          ],
        },
      ],
    },

    /* ── LISTENING ─────────────────────────────────────────────────────── */
    {
      skill: "listening",
      minutes: 35,
      instruction:
        "This part has four tasks. You hear short extracts, conversations, a talk and an interview. You hear every recording twice.",
      instructionTr:
        "Bu bölümde dört görev var. Kısa parçalar, konuşmalar, bir sunum ve bir söyleşi dinleyeceksin. Her kaydı iki kez dinleyebilirsin.",
      tasks: [
        {
          id: "en-b1-02-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "You hear seven short extracts. Choose a, b or c. You hear every extract twice.",
          promptTr: "Yedi kısa parça dinleyeceksin. a, b ya da c'yi seç. Her parçayı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Announcement",
              genreTr: "Anons",
              situation: "Bir alışveriş merkezinde anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "The car park on level three is closed this weekend for cleaning. Levels one and two are open as usual, and the first hour is still free for everybody." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "In a café",
              genreTr: "Kafede",
              situation: "İki arkadaş bir kurstan söz ediyor.",
              plays: 2,
              segments: [
                { speaker: "Nils", text: "How is the cookery course going?" },
                { speaker: "Ayse", text: "The cooking is easy. What I did not expect is how much I have learnt about buying: what is in season, what freezes well." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Voicemail",
              genreTr: "Telesekreter iletisi",
              situation: "Bir tamirci müşteriye ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello, it is the workshop. Your washing machine needs a new pump. The part is twenty-eight pounds and the work is an hour. Shall I go ahead?" },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "At the town hall",
              genreTr: "Belediyede",
              situation: "Bir sakin görevliyle konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Resident", text: "Can I get a second recycling bin?" },
                { speaker: "Officer", text: "Only if four or more people live in the flat. Otherwise we give you extra bags, which are free." },
                { speaker: "Resident", text: "There are two of us, so bags then." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Radyoda kısa bir haber veriliyor.",
              plays: 2,
              segments: [
                { text: "The river path will reopen on Friday, two weeks earlier than planned, although the bridge at the mill stays closed until the autumn." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "At home",
              genreTr: "Evde",
              situation: "İki ev arkadaşı elektrik faturasından söz ediyor.",
              plays: 2,
              segments: [
                { speaker: "Ola", text: "The bill is higher again, and we have hardly used the heating." },
                { speaker: "Tam", text: "It is not the heating. Look: the old freezer in the cellar uses more than everything else together." },
              ],
            },
            {
              kind: "audio",
              id: "a7",
              genre: "In a shop",
              genreTr: "Mağazada",
              situation: "Bir müşteri ürün soruyor.",
              plays: 2,
              segments: [
                { speaker: "Customer", text: "Do you sell rice without packaging?" },
                { speaker: "Assistant", text: "Not here. Our branch in Mill Street has a loose food section, and it is open on Sundays too." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-02-h1-1",
              no: 1,
              ref: "a1",
              text: "What is still true this weekend?",
              options: ["All three levels are open to drivers", "Cleaning work has closed the whole car park", "The first hour of parking costs nothing"],
              answer: 2,
              explain:
                "Anons kapanışı bildirdikten sonra değişmeyeni de söylüyor: «the first hour is still free for everybody». Yalnız üçüncü kat kapalı, dolayısıyla ne üç kat açık ne de tamamı kapalı.",
            },
            {
              kind: "mcq",
              id: "en-b1-02-h1-2",
              no: 2,
              ref: "a2",
              text: "What surprised Ayse about the course?",
              options: ["How much she has learnt about shopping", "How difficult the recipes were", "How many people were in the group"],
              answer: 0,
              explain:
                "Ayse pişirmenin kolay olduğunu söyleyip sürprizi adlandırıyor: «how much I have learnt about buying». Tarif zorluğu tersine çevriliyor, grup büyüklüğü kayıtta hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-02-h1-3",
              no: 3,
              ref: "a3",
              text: "What does the workshop want?",
              options: ["The customer to bring the machine in", "Permission to do the repair", "Payment before the work starts"],
              answer: 1,
              explain:
                "İleti fiyatı verdikten sonra tek bir soru soruyor: «Shall I go ahead?» — yani onay istiyor. Makine zaten atölyede, ödeme zamanından hiç söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-02-h1-4",
              no: 4,
              ref: "a4",
              text: "What will the resident get?",
              options: ["A second bin, because two people live there", "Free bags instead of a bin", "Nothing, because the flat is too small"],
              answer: 1,
              explain:
                "İkinci kutu için dört kişi gerekiyor, dairede iki kişi var; görevli alternatifi veriyor: «we give you extra bags, which are free» ve sakin «bags then» diyor. Boş çıkmıyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-02-h1-5",
              no: 5,
              ref: "a5",
              text: "What do we learn about the river path?",
              options: ["It will open sooner than expected", "It will stay closed until the autumn", "It will open at the same time as the bridge"],
              answer: 0,
              explain:
                "Haber «two weeks earlier than planned» diyor: plandan erken. Sonbahara kadar kapalı kalan yol değil, değirmendeki köprü; iki yapı ayrı ayrı veriliyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-02-h1-6",
              no: 6,
              ref: "a6",
              text: "What does Tam think is the cause?",
              options: ["The heating in the flat", "An old appliance in the cellar", "A mistake in the bill"],
              answer: 1,
              explain:
                "Tam ısıtmayı eliyor ve sebebi gösteriyor: «the old freezer in the cellar uses more than everything else together». Faturada hata olduğu iddia edilmiyor, tersine tüketim açıklanıyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-02-h1-7",
              no: 7,
              ref: "a7",
              text: "What does the assistant suggest?",
              options: ["Coming back on a weekday", "Buying a larger packet instead", "Going to a different branch"],
              answer: 2,
              explain:
                "Görevli bu şubede olmadığını söyleyip başka bir şube veriyor: «Our branch in Mill Street has a loose food section». Pazar günü açık olması ek bir kolaylık, gün değiştirme önerisi değil.",
            },
          ],
        },
        {
          id: "en-b1-02-h2",
          no: 2,
          format: "mcq",
          goal: "gist",
          prompt: "You hear six short conversations. What is the main point? Choose a, b or c. You hear every conversation twice.",
          promptTr: "Altı kısa konuşma dinleyeceksin. Ana nokta nedir? a, b ya da c'yi seç. Her konuşmayı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "At work",
              genreTr: "İş yerinde",
              situation: "İki meslektaş yeni bir uygulamadan söz ediyor.",
              plays: 2,
              segments: [
                { speaker: "Kai", text: "We have to record every journey in the new app now." },
                { speaker: "Lu", text: "I was against it, honestly. But last month it showed me that half my trips could be one trip. I plan differently now." },
              ],
            },
            {
              kind: "audio",
              id: "b2",
              genre: "In the street",
              genreTr: "Sokakta",
              situation: "İki komşu bir ağaç dikimi projesinden söz ediyor.",
              plays: 2,
              segments: [
                { speaker: "Ida", text: "They planted forty trees in our street last spring." },
                { speaker: "Marc", text: "And nobody watered them in July. Eleven are already dead. It is not planting that is difficult, it is the second summer." },
              ],
            },
            {
              kind: "audio",
              id: "b3",
              genre: "At home",
              genreTr: "Evde",
              situation: "İki ev arkadaşı alışveriş alışkanlığını konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Zoe", text: "The veg box is cheaper than the supermarket." },
                { speaker: "Ben", text: "It is, but we threw away half of it in June because we did not know what to do with the greens. Cheap food you do not eat is not cheap." },
              ],
            },
            {
              kind: "audio",
              id: "b4",
              genre: "On the phone",
              genreTr: "Telefonda",
              situation: "İki arkadaş bir kurstan söz ediyor.",
              plays: 2,
              segments: [
                { speaker: "Hanne", text: "Is the repair café worth going to?" },
                { speaker: "Alp", text: "Go, but not with a broken laptop. They are wonderful with lamps and kettles, and honest about what they cannot do." },
              ],
            },
            {
              kind: "audio",
              id: "b5",
              genre: "At the college",
              genreTr: "Okulda",
              situation: "İki öğrenci bir sunum hakkında konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Ravi", text: "Your presentation had far too many numbers." },
                { speaker: "Mina", text: "You are right. When I practised it at home, I could not remember them either. Next time I will keep three." },
              ],
            },
            {
              kind: "audio",
              id: "b6",
              genre: "In a shop",
              genreTr: "Mağazada",
              situation: "Bir müşteri ve bir görevli konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Customer", text: "This shirt says it is made from recycled material." },
                { speaker: "Assistant", text: "Part of it is. The label tells you the percentage, and honestly it is lower than most people assume." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-02-h2-8",
              no: 8,
              ref: "b1",
              text: "What is Lu's point about the app?",
              options: ["It changed how she plans her work", "It takes too long to fill in every day", "It should be used by the whole company"],
              answer: 0,
              explain:
                "Lu başta karşı olduğunu söylüyor («I was against it, honestly»), sonra uygulamanın yolculuklarını birleştirmesini sağladığını ve artık farklı planladığını anlatıyor. Süre şikâyeti ya da yaygınlaştırma önerisi kayıtta yok.",
            },
            {
              kind: "mcq",
              id: "en-b1-02-h2-9",
              no: 9,
              ref: "b2",
              text: "What is Marc's main criticism?",
              options: ["Too few trees were planted", "The care after planting was missing", "The wrong species were chosen for the street"],
              answer: 1,
              explain:
                "Marc sorunu tek cümlede adlandırıyor: «It is not planting that is difficult, it is the second summer» — temmuzda kimse sulamamış ve on bir ağaç ölmüş. Sayı ya da tür seçimi eleştirilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-02-h2-10",
              no: 10,
              ref: "b3",
              text: "Why does Ben question the veg box?",
              options: ["Because it arrives on the wrong day", "Because the vegetables are of poor quality", "Because the savings disappear when food is wasted"],
              answer: 2,
              explain:
                "Ben ucuzluğu kabul edip sonucu söylüyor: «Cheap food you do not eat is not cheap». Sorun kalite ya da teslim günü değil, kullanılmayan yeşilliklerin çöpe gitmesi.",
            },
            {
              kind: "mcq",
              id: "en-b1-02-h2-11",
              no: 11,
              ref: "b4",
              text: "What does Alp advise?",
              options: ["To go, but with realistic expectations", "To take any broken machine there", "To wait until they open a bigger workshop"],
              answer: 0,
              explain:
                "Alp gitmeyi öneriyor ama sınırını koyuyor: «Go, but not with a broken laptop» ve yapamadıkları konusunda dürüst olduklarını ekliyor. Her makineyi götürmek tam olarak uyarılan şey.",
            },
            {
              kind: "mcq",
              id: "en-b1-02-h2-12",
              no: 12,
              ref: "b5",
              text: "How does Mina react to the criticism?",
              options: ["She rejects it politely", "She accepts it and gives an example", "She blames the time she was given"],
              answer: 1,
              explain:
                "Mina «You are right» diyor ve kendi deneyimiyle destekliyor: evde çalışırken rakamları kendisi de hatırlayamamış. Süre bahanesi ya da nazik bir ret kayıtta yok.",
            },
            {
              kind: "mcq",
              id: "en-b1-02-h2-13",
              no: 13,
              ref: "b6",
              text: "What does the assistant tell the customer?",
              options: ["The shirt is not recycled at all, despite the label", "The claim is true but smaller than it sounds", "The label is often wrong"],
              answer: 1,
              explain:
                "Görevli iddiayı kısmen doğruluyor: «Part of it is» ve oranın sanılandan düşük olduğunu ekliyor. Etiketin yanlış olduğunu söylemiyor, tersine etikete bakılmasını öneriyor.",
            },
          ],
        },
        {
          id: "en-b1-02-h3",
          no: 3,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear a talk about a tool library. Complete the notes, questions 14 to 19. Write ONE or TWO words or a number in each gap. You hear the talk twice.",
          promptTr:
            "Bir alet kütüphanesi hakkında sunum dinleyeceksin. 14–19. maddelerdeki notları tamamla. Her boşluğa BİR ya da İKİ sözcük veya bir sayı yaz. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Talk",
              genreTr: "Sunum",
              situation: "Bir alet kütüphanesinin sorumlusu yeni üyelere bilgi veriyor.",
              plays: 2,
              segments: [
                {
                  text: "Welcome, and thank you for coming. We opened in 2018 in a church hall, and we now have nine hundred tools. Membership costs twenty pounds a year, and that is for as many items as you like. You can keep an item for one week; if nobody else has asked for it, you can extend once by phone. The most borrowed item is not the drill, as everybody guesses, but the wallpaper steamer. We are open on Wednesday evenings and on Saturday mornings, and we are closed for the whole of August. If you damage something, tell us; we do not charge for normal wear, but we do ask you to report it. And one thing that surprises people: you must bring proof of your address, because everything here belongs to the members together.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notes",
              genreTr: "Not kâğıdı",
              title: "Tool library — notes",
              body: `Opened in:               {{14}}
Number of tools:         {{15}}
Membership per year:     {{16}} pounds
Borrowing time:          {{17}} week
Most borrowed item:      the wallpaper {{18}}
Closed in the month of:  {{19}}`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b1-02-h3-14",
              no: 14,
              ref: "c1",
              text: "Gap 14",
              accept: ["2018"],
              explain:
                "«We opened in 2018 in a church hall» — açılış yılı. Kayıttaki dokuz yüz alet sayısı, yirmi ise yıllık ücret; hangi sayının yıl olduğunu ayırmak gerekiyor.",
            },
            {
              kind: "gap",
              id: "en-b1-02-h3-15",
              no: 15,
              ref: "c1",
              text: "Gap 15",
              accept: ["900", "nine hundred"],
              explain:
                "«we now have nine hundred tools» — bugünkü alet sayısı dokuz yüz. Not kâğıdı sayıyı soruyor; rakam da yazı da kabul edilir.",
            },
            {
              kind: "gap",
              id: "en-b1-02-h3-16",
              no: 16,
              ref: "c1",
              text: "Gap 16",
              accept: ["20", "twenty"],
              explain:
                "«Membership costs twenty pounds a year» — yıllık aidat yirmi pound ve bu, istenen kadar alet için geçerli. Not kâğıdında `pounds` basılı, boşluğa yalnız sayı yazılır.",
            },
            {
              kind: "gap",
              id: "en-b1-02-h3-17",
              no: 17,
              ref: "c1",
              text: "Gap 17",
              accept: ["1", "one"],
              explain:
                "«You can keep an item for one week» — ödünç süresi bir hafta, uzatma ayrı bir imkân. Not kâğıdında `week` tekil basılı olduğu için boşluğa sayı yazılır.",
            },
            {
              kind: "gap",
              id: "en-b1-02-h3-18",
              no: 18,
              ref: "c1",
              text: "Gap 18",
              accept: ["steamer"],
              explain:
                "Konuşmacı yaygın tahmini eliyor: «The most borrowed item is not the drill, as everybody guesses, but the wallpaper steamer». Matkabı yazan öğrenci cümlenin ilk yarısında durmuş olur.",
            },
            {
              kind: "gap",
              id: "en-b1-02-h3-19",
              no: 19,
              ref: "c1",
              text: "Gap 19",
              accept: ["August"],
              explain:
                "«we are closed for the whole of August» — kapalı olunan ay ağustos. Çarşamba ve cumartesi açık olunan günler; not kâğıdı ayı soruyor, günü değil.",
            },
          ],
        },
        {
          id: "en-b1-02-h4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt: "You hear an interview with a man who gave up his car. Choose a, b or c for questions 20 to 25. You hear the interview twice.",
          promptTr: "Arabasından vazgeçen bir adamla söyleşi dinleyeceksin. 20–25. maddeler için a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Interview",
              genreTr: "Söyleşi",
              situation: "Bir radyo programında arabasını satan bir adamla söyleşi yapılıyor.",
              plays: 2,
              segments: [
                { speaker: "Host", text: "Ivan, you sold your car eighteen months ago. Was that a decision about the environment?" },
                { speaker: "Ivan", text: "People always assume that, and I would like to say yes. But the honest answer is that the car needed a repair I could not afford in that month. The environment came later, as a reason to stay without one." },
                { speaker: "Host", text: "What was the hardest part at the beginning?" },
                { speaker: "Ivan", text: "Not the daily journeys, which were fine. It was the exceptions: a sofa, a trip to a hospital in another town, my mother's birthday. Those four or five days a year are where a car really earns its money." },
                { speaker: "Host", text: "And how do you manage those days now?" },
                { speaker: "Ivan", text: "I rent a car by the hour. It costs me about two hundred pounds a year in total. My old car cost that much in insurance alone, before I put any fuel in it." },
                { speaker: "Host", text: "Has anything got worse?" },
                { speaker: "Ivan", text: "Yes, and I want to be clear about this. I see my brother less. He lives forty minutes away by car and two hours by two buses. I have not solved that, and I do not pretend I have." },
                { speaker: "Host", text: "What would you say to somebody who is thinking about it?" },
                { speaker: "Ivan", text: "Do not sell the car first. Leave it on the street for a month and use it only when you truly have to. If you use it four times, you have your answer. If you use it twenty times, you also have your answer, and there is no shame in that." },
              ],
              gloss: [
                { de: "insurance", tr: "sigorta", en: "insurance" },
                { de: "an exception", tr: "istisna", en: "exception" },
                { de: "fuel", tr: "yakıt", en: "fuel" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-02-h4-20",
              no: 20,
              ref: "d1",
              text: "Why did Ivan sell his car?",
              options: ["He wanted to reduce his effect on the environment", "He could not pay for a repair at that time", "His insurance company refused to cover him"],
              answer: 1,
              explain:
                "Ivan yaygın varsayımı reddediyor: «the honest answer is that the car needed a repair I could not afford in that month». Çevre sonradan gelen bir gerekçe; sigorta yalnız maliyet karşılaştırmasında geçiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-02-h4-21",
              no: 21,
              ref: "d1",
              text: "What did he find hardest at first?",
              options: ["The few days a year that need a car", "The journey to work every morning", "Explaining his decision to other people"],
              answer: 0,
              explain:
                "Ivan günlük yolculukları eliyor («which were fine») ve istisnaları sayıyor: kanepe, başka şehirdeki hastane, annesinin doğum günü — «those four or five days a year». Açıklama yapma zorluğu söyleşide geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-02-h4-22",
              no: 22,
              ref: "d1",
              text: "What does he say about the cost?",
              options: ["Renting costs about the same as owning", "He has not calculated it carefully", "Renting costs less than his old insurance"],
              answer: 2,
              explain:
                "Kiralama yılda yaklaşık iki yüz pound; eski arabası «that much in insurance alone, before I put any fuel in it». Yani yalnız sigorta bile aynı tutardı, yakıt hariç. Hesaplamadığını söylemiyor, tersine sayı veriyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-02-h4-23",
              no: 23,
              ref: "d1",
              text: "What has become worse for him?",
              options: ["He spends more on public transport", "He sees a family member less often", "He has less time for his work"],
              answer: 1,
              explain:
                "Ivan bunu kendisi söylüyor: «I see my brother less» — arabayla kırk dakika, iki otobüsle iki saat. Ulaşım maliyeti ya da iş zamanı kötüleşen şeyler arasında sayılmıyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-02-h4-24",
              no: 24,
              ref: "d1",
              text: "How does he talk about that problem?",
              options: ["He admits he has no answer for it", "He says it will solve itself in time", "He blames the bus company"],
              answer: 0,
              explain:
                "Ivan açıkça kabul ediyor: «I have not solved that, and I do not pretend I have». Otobüs şirketini suçlamıyor ve zamanla düzeleceğine dair bir söz vermiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-02-h4-25",
              no: 25,
              ref: "d1",
              text: "What does he advise other people to do?",
              options: ["To sell the car and see what happens", "To keep the car but use public transport too", "To test the idea for a month before deciding"],
              answer: 2,
              explain:
                "Tavsiyesi net: «Do not sell the car first. Leave it on the street for a month and use it only when you truly have to». Sonuç ne çıkarsa çıksın kabul edilebilir buluyor; ikisini birlikte kullanmayı bir çözüm olarak önermiyor, bir deney olarak öneriyor.",
            },
          ],
        },
      ],
    },

    /* ── WRITING ───────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 50,
      instruction: "This part has two tasks: an email and a longer text. Both are compulsory.",
      instructionTr: "Bu bölümde iki görev var: bir e-posta ve daha uzun bir metin. İkisi de zorunlu.",
      tasks: [
        {
          id: "en-b1-02-w1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "You ordered a lamp online. It arrived damaged. Write an email to the shop. Write about 100 words and cover all the points.",
          promptTr:
            "İnternetten bir lamba sipariş ettin. Hasarlı geldi. Mağazaya bir e-posta yaz. Yaklaşık 100 kelime, bütün maddeleri işle.",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Say what you ordered and when it arrived.", tr: "Ne sipariş ettiğini ve ne zaman geldiğini söyle." },
              { de: "Describe the damage clearly.", tr: "Hasarı açıkça tarif et." },
              { de: "Say what you want the shop to do, and by when.", tr: "Mağazadan ne yapmasını, ne zamana kadar istediğini söyle." },
            ],
            sample: `Dear Sir or Madam,

I ordered a floor lamp from your website on 3 March and it arrived on 9 March.

Unfortunately the lamp was damaged. The glass shade has a crack about ten centimetres long on one side, and the box itself was open at one corner when the driver handed it to me.

I would like a replacement rather than a refund, because I still want the lamp. Could you send it before the end of the month? If that is not possible, please tell me and I will ask for my money back.

Yours faithfully,
Emre Yildiz`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "Hasar somut mu tarif edildi? (\"bozuk geldi\" bir tarif değildir)",
              "Talep açık mı ve bir zaman sınırı verildi mi?",
              "Kayıt resmî mi? Şikâyet mektubunda `Hi` ve ünlem uygun değil.",
              "Yaklaşık 100 kelime yazıldı mı?",
              "Öfke değil, çözüm odaklı bir ton kurulmuş mu?",
            ],
          },
        },
        {
          id: "en-b1-02-w2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Write an article for a website with this title: \"One habit I changed and one I could not\". Describe both, say why one worked and the other did not. Write about 100 words.",
          promptTr:
            "Bir internet sitesi için şu başlıkla bir yazı yaz: \"Değiştirdiğim bir alışkanlık ve değiştiremediğim bir alışkanlık\". İkisini de anlat, birinin neden işe yaradığını ötekinin neden yaramadığını söyle. Yaklaşık 100 kelime.",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Describe the habit you changed.", tr: "Değiştirdiğin alışkanlığı anlat." },
              { de: "Describe the habit you could not change.", tr: "Değiştiremediğin alışkanlığı anlat." },
              { de: "Explain why one worked and the other did not.", tr: "Birinin neden işe yaradığını, ötekinin neden yaramadığını açıkla." },
            ],
            sample: `Two years ago I stopped buying bottled water. I bought one metal bottle and put it next to my keys, so I could not leave the flat without seeing it. That habit has never come back.

The one I could not change is my phone in the evening. I have tried a timer, a drawer and a rule about ten o'clock. None of them lasted a week.

The difference, I think, is that the bottle needed one decision and the phone needs a decision every single evening. If a change needs willpower every day, it will not survive a bad week.`,
            criteria: [
              "İki alışkanlık da somut olarak anlatıldı mı?",
              "Fark bir gerekçeyle mi açıklandı, yoksa yalnız anlatıldı mı?",
              "Present perfect (`I have tried …`) doğru kullanıldı mı?",
              "Metin bir yazı gibi mi kurulmuş — giriş, karşılaştırma, sonuç?",
              "Yaklaşık 100 kelime yazıldı mı?",
            ],
          },
        },
      ],
    },

    /* ── SPEAKING ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "This part has four tasks: an interview, a long turn, a task we do together, and a general conversation.",
      instructionTr: "Bu bölümde dört görev var: söyleşi, tek başına konuşma, birlikte yapılan bir görev ve genel sohbet.",
      tasks: [
        {
          id: "en-b1-02-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about your daily habits and about shopping.",
          promptTr: "Sana günlük alışkanlıkların ve alışveriş hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good afternoon. Could you describe a normal weekday for you, from the morning?", tr: "İyi günler. Senin için normal bir hafta içi günü sabahtan itibaren anlatır mısın?" },
            { who: "you", hint: "Bir günü sırayla anlat; zaman ifadeleri kullan.", expect: "sıralı zaman ifadeleriyle bir günü anlatmak", seconds: 40 },
            { who: "partner", de: "Thank you. Where do you usually do your food shopping, and has that changed?", tr: "Teşekkürler. Gıda alışverişini genelde nerede yaparsın, bu değişti mi?" },
            { who: "you", hint: "Şimdiki durumu ve bir değişikliği anlat.", expect: "şimdiki alışkanlığı ve geçmişten bir değişikliği anlatmak", seconds: 40 },
            { who: "partner", de: "And if you had more time in the week, what would you do differently?", tr: "Haftada daha çok vaktin olsa neyi farklı yapardın?" },
            { who: "you", hint: "Koşul kipiyle cevapla.", expect: "ikinci tip koşul cümlesiyle bir varsayım kurmak", seconds: 40 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "describe a day in order", tr: "Bir günü sırayla anlatmak" },
              { de: "describe a change over time", tr: "Zaman içindeki bir değişikliği anlatmak" },
              { de: "use a second conditional", tr: "İkinci tip koşulu kullanmak" },
            ],
            sample:
              "I get up at half past six and I leave the house at eight. I used to shop in the big supermarket on the way home, but since last year I have used the small shop near my flat, because the queue is shorter. If I had more time in the week, I would cook twice at the weekend and freeze half of it.",
            criteria: [
              "Gün sırayla mı anlatıldı? (first, then, after that)",
              "`used to` ya da present perfect ile değişim anlatıldı mı?",
              "Son cevapta ikinci tip koşul kuruldu mu?",
              "Cevaplar geliştirildi mi, tek cümlede mi kaldı?",
            ],
          },
        },
        {
          id: "en-b1-02-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about one minute. Compare these two ways of getting food: a weekly delivery box that you cannot choose, and shopping yourself in a market. Say which you would prefer and why.",
          promptTr:
            "Yaklaşık bir dakika tek başına konuş. Gıda edinmenin şu iki yolunu karşılaştır: içindekini seçemediğin haftalık bir teslimat kutusu ve pazardan kendin alışveriş. Hangisini tercih edeceğini ve nedenini söyle.",
          prepSeconds: 60,
          speakSeconds: 75,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "compare the two ways", tr: "İki yolu karşılaştır" },
              { de: "say which you prefer and why", tr: "Hangisini tercih ettiğini ve nedenini söyle" },
              { de: "mention one disadvantage of your choice", tr: "Seçtiğin yolun bir olumsuz yanını da söyle" },
            ],
            sample:
              "A delivery box saves time and it makes you cook things you would never buy. On the other hand, you cannot plan, and if you do not like something you still have it. Shopping in a market takes longer but you see what you get and you can talk to the person who grew it. I would prefer the market, mainly because I cook from what I see, not from a plan. The disadvantage is honest: on a busy week I do not go, and then I eat badly.",
            criteria: [
              "İki yol da gerçekten karşılaştırıldı mı?",
              "Karşılaştırma yapıları kullanıldı mı? (on the other hand, takes longer, whereas)",
              "Tercih gerekçelendirildi mi?",
              "Seçilen yolun olumsuz yanı da söylendi mi?",
              "Bir dakika kesintisiz konuşuldu mu?",
            ],
          },
        },
        {
          id: "en-b1-02-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Our building has money for one improvement. Talk with me about the options and decide together.",
          promptTr:
            "Binamızın tek bir iyileştirme için parası var. Seçenekleri benimle konuş ve birlikte karar ver.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "The options are: a covered bicycle shelter, better lights in the stairwell, a shared garden bed, or new windows in the hall. Which do you think we should choose?", tr: "Seçenekler: kapalı bir bisiklet barınağı, merdiven boşluğunda daha iyi aydınlatma, ortak bir bahçe yatağı ya da girişte yeni pencereler. Sence hangisini seçmeliyiz?" },
            { who: "you", hint: "Bir seçenek seç ve gerekçelendir.", expect: "bir seçeneği seçmek ve gerekçelendirmek", seconds: 40 },
            { who: "partner", de: "I understand. But only six people in the building have a bicycle, and everybody uses the stairs. Does that change your mind?", tr: "Anlıyorum. Ama binada yalnız altı kişinin bisikleti var, merdiveni ise herkes kullanıyor. Bu fikrini değiştirir mi?" },
            { who: "you", hint: "İtiraza doğrudan karşılık ver: kabul et ya da çürüt.", expect: "bir itiraza doğrudan karşılık vermek", seconds: 40 },
            { who: "partner", de: "Fair enough. So what do we put forward at the meeting?", tr: "Peki. Toplantıda neyi öneriyoruz?" },
            { who: "you", hint: "Ortak bir karar ver ve kısaca özetle.", expect: "ortak bir karara varmak ve gerekçesini özetlemek", seconds: 35 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "give an opinion with a reason", tr: "Görüşü gerekçesiyle vermek" },
              { de: "answer an objection directly", tr: "Bir itiraza doğrudan karşılık vermek" },
              { de: "reach a decision together", tr: "Birlikte bir karara varmak" },
            ],
            sample:
              "I would start with the bicycle shelter, because bicycles in the hall block the door. That is a strong argument, I had not thought about the numbers. All right: let us put the stairwell lights forward, and ask about the shelter next year.",
            criteria: [
              "Görüş gerekçelendirildi mi?",
              "İtiraza doğrudan mı karşılık verildi?",
              "Karşı tarafın sözlerine gönderme yapıldı mı?",
              "Sonunda ortak bir karar çıktı mı?",
            ],
          },
        },
        {
          id: "en-b1-02-s4",
          no: 4,
          format: "speaking",
          goal: "interaction",
          prompt: "We talk a little more about the same topic: who should pay for changes like these.",
          promptTr: "Aynı konu üzerine biraz daha konuşuyoruz: böyle değişikliklerin parasını kim ödemeli.",
          prepSeconds: 15,
          exchange: [
            { who: "partner", de: "Do you think people change their habits because of money, or because of information?", tr: "Sence insanlar alışkanlıklarını para yüzünden mi bilgi yüzünden mi değiştirir?" },
            { who: "you", hint: "Görüşünü söyle ve bir örnek ver.", expect: "genel bir soruya görüş bildirmek ve örneklendirmek", seconds: 40 },
            { who: "partner", de: "Some people say that campaigns are useless and only prices work. Would you agree?", tr: "Bazıları kampanyaların işe yaramadığını, yalnız fiyatların etkili olduğunu söylüyor. Katılır mısın?" },
            { who: "you", hint: "Kısmen katıl ya da karşı çık; iki yanı da anmaya çalış.", expect: "bir iddiaya kısmen katılmak ya da karşı çıkmak, iki yanı da anmak", seconds: 45 },
          ],
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "give an opinion with an example", tr: "Görüşü bir örnekle vermek" },
              { de: "agree or disagree in a nuanced way", tr: "Katılırken ya da karşı çıkarken ince ayrım yapmak" },
            ],
            sample:
              "I think money changes behaviour faster, but information decides what people do with the money. When bags cost money here, everybody brought their own within a month. I partly agree about campaigns: alone they do very little, but they explain why the price changed, and without that people just get angry.",
            criteria: [
              "Görüş açıkça bildirildi mi?",
              "Somut bir örnek verildi mi?",
              "Kısmi katılım ifadeleri kullanıldı mı? (I partly agree, it depends on …)",
              "Cevaplar geliştirildi mi?",
            ],
          },
        },
      ],
    },
  ],
};
