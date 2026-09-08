import type { MockPaper } from "../types";

/**
 * A1 · Deneme 3 — "Food, Shops and Money".
 *
 * Deneme 1 ve 2 ile AYNI PLAN; konu ayrı. İlk ikisi bir şehre varmayı ve
 * orada yerleşmeyi konu alıyordu, bu üçüncüsü gündelik alışverişi: yiyecek,
 * fiyat, para üstü. A1'in kendi ölçütü olan sayı, saat ve fiyat okumak bu
 * konuda kendiliğinden yoğunlaşıyor.
 *
 * A1 SINIRI: present simple ve `be`, `can`, `there is/are`, temel edatlar,
 * en sık düzensiz fiillerin geçmiş biçimi. Present perfect, edilgen, ilgi
 * cümlesi ve koşul cümlesi yok.
 */
export const EN_A1_03: MockPaper = {
  id: "en-a1-03",
  course: "en",
  level: "A1",
  no: 3,
  theme: "Food, Shops and Money",
  themeTr: "Yemek, alışveriş ve para",
  minutes: 85,
  parts: [
    /* ── READING ───────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 30,
      instruction:
        "This part has four tasks. You read short messages, notices and signs, and you complete a short text. Choose the correct answer for each question.",
      instructionTr:
        "Bu bölümde dört görev var. Kısa iletiler, duyurular ve levhalar okuyacak, sonra kısa bir metni tamamlayacaksın. Her soruda doğru cevabı işaretle.",
      tasks: [
        {
          id: "en-a1-03-l1",
          no: 1,
          format: "truefalse",
          goal: "detail",
          prompt: "Read the two texts and questions 1 to 5. Are the sentences true or false?",
          promptTr: "İki metni ve 1–5. maddeleri oku. Cümleler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Note in the kitchen",
              genreTr: "Mutfaktaki not",
              title: "For Zeynep",
              body: `Hi Zeynep,

I go to the market at four. We need bread, milk and six eggs.

Please do not buy fruit. I get apples and oranges from my sister today.

The money is in the blue cup next to the coffee. Take ten euros, no more.

I cook at seven. Are you hungry?

Mateo`,
              gloss: [
                { de: "the market", tr: "pazar", en: "market" },
                { de: "hungry", tr: "aç", en: "hungry" },
                { de: "no more", tr: "daha fazla değil", en: "no more" },
              ],
            },
            {
              kind: "text",
              id: "t2",
              genre: "Notice in a café",
              genreTr: "Kafe duyurusu",
              title: "Breakfast",
              body: `We make breakfast every day from 7 to 11. On Sunday we start at 9.

Tea and coffee cost 2 euros. Bread, cheese and eggs together cost 6 euros.

Children under six eat for free.

We do not take cards. Please pay with money.

Greta and Hakan`,
              gloss: [
                { de: "for free", tr: "ücretsiz", en: "for free" },
                { de: "together", tr: "birlikte", en: "together" },
                { de: "to take a card", tr: "kart kabul etmek", en: "to accept a card" },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-03-l1-1",
              no: 1,
              ref: "t1",
              text: "Zeynep must buy apples.",
              answer: false,
              explain:
                "Not tam tersini söylüyor: «Please do not buy fruit», çünkü Mateo elmayı ve portakalı kız kardeşinden alıyor. Meyve adları metinde geçiyor ama alınacaklar listesinde değil, alınmayacaklar listesinde.",
            },
            {
              kind: "bool",
              id: "en-a1-03-l1-2",
              no: 2,
              ref: "t1",
              text: "Zeynep can take twelve euros.",
              answer: false,
              explain:
                "Notta sınır yazılı: «Take ten euros, no more». On iki euro bu sınırın üstünde. A1'de sayıyı okumak yetmiyor, sayının bir sınır olduğunu da görmek gerekiyor.",
            },
            {
              kind: "bool",
              id: "en-a1-03-l1-3",
              no: 3,
              ref: "t1",
              text: "Mateo makes the food in the evening.",
              answer: true,
              explain:
                "Not «I cook at seven» diyor ve öncesinde saat dörtte pazara gittiğini söylüyor; yedi akşamüstüdür. Yemeği yapan Mateo, Zeynep değil — madde kimin pişirdiğini de ölçüyor.",
            },
            {
              kind: "bool",
              id: "en-a1-03-l1-4",
              no: 4,
              ref: "t2",
              text: "You can have breakfast at 8 o'clock on Sunday.",
              answer: false,
              explain:
                "Duyuruda pazar için ayrı bir saat var: «On Sunday we start at 9». Sekiz o saatten önce. İlk satırdaki 7 normal günler için; iki satırı birlikte okumak gerekiyor.",
            },
            {
              kind: "bool",
              id: "en-a1-03-l1-5",
              no: 5,
              ref: "t2",
              text: "A child of four pays nothing.",
              answer: true,
              explain:
                "Duyuru «Children under six eat for free» diyor: altı yaşın altı ücretsiz. Dört yaş bu sınırın altında. A1'de `under` ile kurulan yaş sınırını okumak ölçülen becerilerden biri.",
            },
          ],
        },
        {
          id: "en-a1-03-l2",
          no: 2,
          format: "mcq",
          goal: "orientation",
          prompt: "Read situations 6 to 10 and the three notices. Which place helps you?",
          promptTr: "6–10. durumları ve üç duyuruyu oku. Hangi yer sana uygun?",
          texts: [
            {
              kind: "text",
              id: "p1",
              genre: "Notice",
              genreTr: "Duyuru",
              title: "Green Market",
              body: `Every Saturday from 7 to 13, in the old square.

Fruit, vegetables, bread and cheese from farms near the town.

Bring your own bag. We have no plastic bags.

You can pay with money or with a card.`,
            },
            {
              kind: "text",
              id: "p2",
              genre: "Notice",
              genreTr: "Duyuru",
              title: "Late Night Shop",
              body: `Open every day from 6 in the morning to 1 at night.

Bread, milk, water and simple food. Small shop, not cheap.

Hot coffee for one euro. You can drink it here.

No fruit and no vegetables.`,
            },
            {
              kind: "text",
              id: "p3",
              genre: "Notice",
              genreTr: "Duyuru",
              title: "Cooking Club",
              body: `Every Wednesday at 6 in the school kitchen.

We cook together and we eat together. Five euros for the food.

Children come with a parent. All ages.

Write your name on the paper at the door.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-03-l2-6",
              no: 6,
              text: "You need milk at half past eleven at night.",
              options: ["Green Market", "Late Night Shop", "Cooking Club"],
              answer: 1,
              explain:
                "Gece dükkânı «to 1 at night» açık, yani gece bire kadar; 23.30 bu aralığın içinde. Pazar cumartesi 13'te kapanıyor, yemek kulübü ise akşam altıda başlayıp çabuk bitiyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-03-l2-7",
              no: 7,
              text: "You want cheap vegetables from farms near the town.",
              options: ["Green Market", "Late Night Shop", "Cooking Club"],
              answer: 0,
              explain:
                "Pazar duyurusu «Fruit, vegetables, bread and cheese from farms near the town» diyor. Gece dükkânı hem sebze satmıyor («No fruit and no vegetables») hem de kendi için «not cheap» diyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-03-l2-8",
              no: 8,
              text: "You want to learn to cook with other people.",
              options: ["Green Market", "Late Night Shop", "Cooking Club"],
              answer: 2,
              explain:
                "Kulüp duyurusu «We cook together and we eat together» diyor. Öteki iki duyuruda yemek satılıyor ama birlikte pişirmekten söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-03-l2-9",
              no: 9,
              text: "You have no cash, only a card.",
              options: ["Green Market", "Late Night Shop", "Cooking Club"],
              answer: 0,
              explain:
                "Yalnız pazar duyurusu ödeme biçimini açıkça veriyor: «You can pay with money or with a card». Öteki iki duyuruda kart kabul edildiğine dair bir bilgi yok.",
            },
            {
              kind: "mcq",
              id: "en-a1-03-l2-10",
              no: 10,
              text: "You want to do something on Wednesday evening with your son.",
              options: ["Green Market", "Late Night Shop", "Cooking Club"],
              answer: 2,
              explain:
                "Kulüp «Every Wednesday at 6» toplanıyor ve «Children come with a parent» diyor: çocuk ebeveynle geliyor. Pazar yalnız cumartesi, gece dükkânı ise bir etkinlik değil.",
            },
          ],
        },
        {
          id: "en-a1-03-l3",
          no: 3,
          format: "truefalse",
          goal: "instruction",
          prompt: "Read the four signs and questions 11 to 14. Are the sentences true or false?",
          promptTr: "Dört levhayı ve 11–14. maddeleri oku. Cümleler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "s1",
              genre: "Sign in the shop",
              genreTr: "Mağazadaki levha",
              title: "FRUIT AND VEGETABLES",
              body: `Please use the small bags on the left.

Put the price paper on the bag.

Do not eat here. You pay first.`,
            },
            {
              kind: "text",
              id: "s2",
              genre: "Sign at the door",
              genreTr: "Kapıdaki levha",
              title: "BAKERY",
              body: `Monday to Saturday: 6 - 18
Sunday: 7 - 12

Warm bread at 6 and again at 15.`,
            },
            {
              kind: "text",
              id: "s3",
              genre: "Sign in the café",
              genreTr: "Kafedeki levha",
              title: "WATER",
              body: `Water from the tap is free. Please ask us.

Water in a bottle costs 2 euros.

We do not give free water for a big group.`,
            },
            {
              kind: "text",
              id: "s4",
              genre: "Sign at the cash desk",
              genreTr: "Kasadaki levha",
              title: "CASH DESK 1",
              body: `We give you your money back for ten days.

Bring the paper from the shop.

Food and drinks: no money back.`,
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-03-l3-11",
              no: 11,
              ref: "s1",
              text: "You can eat an apple in the shop before you pay.",
              answer: false,
              explain:
                "Levha iki cümleyle bunu kapatıyor: «Do not eat here. You pay first». Yeme yasağı ile ödeme sırası birlikte veriliyor; ilk cümleyi okuyup duran öğrenci de aynı sonuca varır.",
            },
            {
              kind: "bool",
              id: "en-a1-03-l3-12",
              no: 12,
              ref: "s2",
              text: "The bakery is open on Sunday morning.",
              answer: true,
              explain:
                "Levhada pazar için ayrı bir satır var: «Sunday: 7 - 12», yani sabah açık. Öğleden sonra kapalı ama madde yalnız sabahı soruyor.",
            },
            {
              kind: "bool",
              id: "en-a1-03-l3-13",
              no: 13,
              ref: "s3",
              text: "Water from the tap costs two euros.",
              answer: false,
              explain:
                "Levha ikisini ayırıyor: «Water from the tap is free», iki euro olan şişedeki su. Fiyatı görüp hangi suya ait olduğunu okumayan öğrenci yanılır.",
            },
            {
              kind: "bool",
              id: "en-a1-03-l3-14",
              no: 14,
              ref: "s4",
              text: "You cannot get your money back for bread.",
              answer: true,
              explain:
                "Levhanın son satırı istisnayı veriyor: «Food and drinks: no money back». Ekmek bir yiyecek, dolayısıyla on günlük kural onun için geçerli değil.",
            },
          ],
        },
        {
          id: "en-a1-03-l4",
          no: 4,
          format: "gapMcq",
          goal: "structure",
          prompt: "Read the message and complete gaps 15 to 18. Which word fits: a, b or c?",
          promptTr: "İletiyi oku ve 15–18. boşlukları tamamla. Hangi sözcük uyar: a, b ya da c?",
          texts: [
            {
              kind: "text",
              id: "t4",
              genre: "Message",
              genreTr: "İleti",
              title: "To my new neighbour",
              body: `Hello Lina,

Welcome to the house! My name is Paulo and I live {{15}} the first floor.

The small shop in our street is open every day, {{16}} it is expensive.

There {{17}} a big market on Saturday. I go there at eight in the morning.

Last week I {{18}} you a cake at the door. Did you find it?

Paulo`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-03-l4-15",
              no: 15,
              text: "Gap 15",
              options: ["in", "at", "on"],
              answer: 2,
              explain:
                "Kat bildirirken `on` kullanılır: on the first floor. `in` bir binanın ya da odanın içini, `at` bir noktayı bildirir; ikisi de katla kullanılmaz.",
            },
            {
              kind: "mcq",
              id: "en-a1-03-l4-16",
              no: 16,
              text: "Gap 16",
              options: ["so", "but", "because"],
              answer: 1,
              explain:
                "İki bilgi karşıt: dükkân her gün açık, ama pahalı. Karşıtlığı `but` kurar. `so` sonuç, `because` sebep bildirir ve ikisi de burada anlamı bozar.",
            },
            {
              kind: "mcq",
              id: "en-a1-03-l4-17",
              no: 17,
              text: "Gap 17",
              options: ["is", "are", "has"],
              answer: 0,
              explain:
                "Kalıp `there is / there are` ve devamındaki özne tekil: «a big market». Tekil özne `is` ister. `has` bu kalıpta hiç kullanılmaz.",
            },
            {
              kind: "mcq",
              id: "en-a1-03-l4-18",
              no: 18,
              text: "Gap 18",
              options: ["leave", "leaves", "left"],
              answer: 2,
              explain:
                "Cümle «Last week» ile başlıyor ve devamı «Did you find it?» diye soruyor: zaman geçmiş. `leave` fiilinin geçmiş biçimi düzensizdir: `left`. Öteki iki şık şimdiki zamandır.",
            },
          ],
        },
      ],
    },

    /* ── LISTENING ─────────────────────────────────────────────────────── */
    {
      skill: "listening",
      minutes: 20,
      instruction:
        "This part has three tasks. You hear short conversations, announcements and phone messages. You hear every recording twice.",
      instructionTr:
        "Bu bölümde üç görev var. Kısa konuşmalar, anonslar ve telefon iletileri dinleyeceksin. Her kaydı iki kez dinleyebilirsin.",
      tasks: [
        {
          id: "en-a1-03-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Which answer is right? You hear every recording twice.",
          promptTr: "Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "At the market",
              genreTr: "Pazarda",
              situation: "Bir müşteri elma alıyor.",
              plays: 2,
              segments: [
                { speaker: "Customer", text: "How much are the apples?" },
                { speaker: "Seller", text: "Two euros a kilo. The small ones are one euro fifty." },
                { speaker: "Customer", text: "Two kilos of the small ones, please." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "In the bakery",
              genreTr: "Fırında",
              situation: "Bir müşteri ekmek soruyor.",
              plays: 2,
              segments: [
                { speaker: "Customer", text: "Do you have warm bread now?" },
                { speaker: "Baker", text: "Not now. The next warm bread comes at three." },
                { speaker: "Customer", text: "Then I come back after work." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "At home",
              genreTr: "Evde",
              situation: "İki ev arkadaşı akşam yemeğini konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Sena", text: "There is rice and there are eggs. What do we make?" },
                { speaker: "Dario", text: "I ate rice at work today. Can we make soup?" },
                { speaker: "Sena", text: "Good. We have tomatoes for that." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "On the phone",
              genreTr: "Telefonda",
              situation: "Bir kişi masa ayırtıyor.",
              plays: 2,
              segments: [
                { speaker: "Caller", text: "A table for four people on Friday, please." },
                { speaker: "Waiter", text: "Friday is full. Saturday at seven is free." },
                { speaker: "Caller", text: "Saturday, then. Four people." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "In the shop",
              genreTr: "Mağazada",
              situation: "Bir müşteri kasada ödüyor.",
              plays: 2,
              segments: [
                { speaker: "Customer", text: "Here is twenty euros." },
                { speaker: "Cashier", text: "That is fourteen euros eighty. Six euros twenty back." },
                { speaker: "Customer", text: "Thank you. Can I have a bag too?" },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "At the café",
              genreTr: "Kafede",
              situation: "İki arkadaş sipariş veriyor.",
              plays: 2,
              segments: [
                { speaker: "Bruno", text: "I take a coffee. And you?" },
                { speaker: "Iris", text: "Tea for me, please. And water for both of us." },
                { speaker: "Waiter", text: "One coffee, one tea, two waters." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-03-h1-1",
              no: 1,
              ref: "a1",
              text: "How much does the customer pay?",
              options: ["Four euros", "Three euros", "Two euros fifty"],
              answer: 1,
              explain:
                "Küçük elma kilosu «one euro fifty» ve müşteri iki kilo alıyor: 1,50 × 2 = 3 euro. Büyük elma iki euro; onu alsaydı dört euro olurdu. A1'de basit bir çarpma da ölçülüyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-03-h1-2",
              no: 2,
              ref: "a2",
              text: "When is the next warm bread?",
              options: ["Now, at the front of the shop", "Tomorrow morning", "At three"],
              answer: 2,
              explain:
                "Fırıncı «The next warm bread comes at three» diyor. Müşterinin sorusu «now» ile başladığı için ilk şık tuzak; cevap soruyu düzeltiyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-03-h1-3",
              no: 3,
              ref: "a3",
              text: "What do they cook?",
              options: ["Soup", "Rice", "Eggs and tomatoes together"],
              answer: 0,
              explain:
                "Dario işte pilav yediğini söyleyip «Can we make soup?» diyor; Sena kabul ediyor. Pirinç ve yumurta kayıtta geçiyor ama pişirilen yemek çorba.",
            },
            {
              kind: "mcq",
              id: "en-a1-03-h1-4",
              no: 4,
              ref: "a4",
              text: "When is the table free?",
              options: ["On Friday at seven", "On Saturday", "There is no free table"],
              answer: 1,
              explain:
                "Garson «Friday is full. Saturday at seven is free» diyor ve arayan cumartesiyi seçiyor. Cuma kayıtta geçiyor ama dolu gün olarak.",
            },
            {
              kind: "mcq",
              id: "en-a1-03-h1-5",
              no: 5,
              ref: "a5",
              text: "How much money does the customer get back?",
              options: ["Six euros twenty", "Fourteen euros eighty", "Twenty euros"],
              answer: 0,
              explain:
                "Kasiyer «Six euros twenty back» diyor. Kayıttaki öteki iki sayı alışverişin tutarı ve verilen para; hangi sayının para üstü olduğunu ayırmak gerekiyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-03-h1-6",
              no: 6,
              ref: "a6",
              text: "What does the waiter bring?",
              options: ["Two coffees and one water", "One coffee and one tea only", "One coffee, one tea and two waters"],
              answer: 2,
              explain:
                "Garson siparişi tekrarlıyor: «One coffee, one tea, two waters». Iris ikisi için de su istiyor, bu yüzden su sayısı iki.",
            },
          ],
        },
        {
          id: "en-a1-03-h2",
          no: 2,
          format: "truefalse",
          goal: "instruction",
          prompt: "Are the sentences true or false? You hear every announcement twice.",
          promptTr: "Cümleler doğru mu yanlış mı? Her anonsu iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Announcement in a shop",
              genreTr: "Mağaza anonsu",
              situation: "Markette bir anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "Dear customers, today the fish is half price. The offer is only until two o'clock. Cash desks three and four are open." },
              ],
            },
            {
              kind: "audio",
              id: "b2",
              genre: "Announcement at the market",
              genreTr: "Pazar anonsu",
              situation: "Pazarda kapanış anonsu.",
              plays: 2,
              segments: [
                { text: "The market closes in thirty minutes. Please take your bags. Next Saturday we open at seven as usual." },
              ],
            },
            {
              kind: "audio",
              id: "b3",
              genre: "Message on a phone",
              genreTr: "Telefon anonsu",
              situation: "Bir restoranın telesekreter mesajı.",
              plays: 2,
              segments: [
                { text: "Hello, this is the restaurant Sole. We are closed on Monday. From Tuesday to Sunday we are open from twelve to eleven." },
              ],
            },
            {
              kind: "audio",
              id: "b4",
              genre: "Announcement in a café",
              genreTr: "Kafe anonsu",
              situation: "Kafede bir duyuru yapılıyor.",
              plays: 2,
              segments: [
                { text: "Attention please. Our coffee machine is broken. We have tea and cold drinks today. Sorry for that." },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-03-h2-7",
              no: 7,
              ref: "b1",
              text: "The fish is cheap all day.",
              answer: false,
              explain:
                "Anons süreyi sınırlıyor: «The offer is only until two o'clock». Balık ucuz ama bütün gün değil; `only until` ile kurulan sınırı duymak gerekiyor.",
            },
            {
              kind: "bool",
              id: "en-a1-03-h2-8",
              no: 8,
              ref: "b2",
              text: "The market opens at seven next Saturday.",
              answer: true,
              explain:
                "Anonsun son cümlesi geleceği veriyor: «Next Saturday we open at seven as usual». Otuz dakika bilgisi bugünkü kapanışa ait, gelecek haftaya değil.",
            },
            {
              kind: "bool",
              id: "en-a1-03-h2-9",
              no: 9,
              ref: "b3",
              text: "You can eat in the restaurant on Monday.",
              answer: false,
              explain:
                "Mesaj «We are closed on Monday» diyor. Salıdan pazara kadar açık; pazartesi o aralığın dışında kalıyor ve tek istisna günü o.",
            },
            {
              kind: "bool",
              id: "en-a1-03-h2-10",
              no: 10,
              ref: "b4",
              text: "You cannot get a hot coffee today.",
              answer: true,
              explain:
                "Anons makinenin bozuk olduğunu söylüyor: «Our coffee machine is broken» ve yerine çay ile soğuk içecek sunuyor. Kahve bugün yok.",
            },
          ],
        },
        {
          id: "en-a1-03-h3",
          no: 3,
          format: "mcq",
          goal: "detail",
          prompt: "Which answer is right? You hear every recording twice.",
          promptTr: "Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Voicemail",
              genreTr: "Telesekreter iletisi",
              situation: "Bir arkadaş ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hi, it is Greta. I am at the shop. Do you want bread or rice? Call me in five minutes, please." },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "In the street",
              genreTr: "Sokakta",
              situation: "Bir turist market soruyor.",
              plays: 2,
              segments: [
                { speaker: "Tourist", text: "Excuse me, is there a supermarket near here?" },
                { speaker: "Man", text: "Yes, behind the church. It is open until eight." },
                { speaker: "Tourist", text: "Thank you. Is it far?" },
                { speaker: "Man", text: "Three minutes on foot." },
              ],
            },
            {
              kind: "audio",
              id: "c3",
              genre: "At work",
              genreTr: "İş yerinde",
              situation: "İki meslektaş öğle yemeğini konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Hakan", text: "Do you come to the canteen at twelve?" },
                { speaker: "Zeynep", text: "I bring food from home today. But I come for a coffee at one." },
              ],
            },
            {
              kind: "audio",
              id: "c4",
              genre: "On the phone",
              genreTr: "Telefonda",
              situation: "Bir müşteri sipariş veriyor.",
              plays: 2,
              segments: [
                { speaker: "Customer", text: "One big pizza with cheese, please. To my house." },
                { speaker: "Shop", text: "That is twelve euros. Twenty minutes." },
                { speaker: "Customer", text: "Good. Number 14, second floor." },
              ],
            },
            {
              kind: "audio",
              id: "c5",
              genre: "At home",
              genreTr: "Evde",
              situation: "Bir anne kızına alışveriş listesini söylüyor.",
              plays: 2,
              segments: [
                { speaker: "Mum", text: "Milk, sugar and six eggs. And a cake for Sunday." },
                { speaker: "Lina", text: "Is the money in the kitchen?" },
                { speaker: "Mum", text: "No, in my bag on the chair." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-03-h3-11",
              no: 11,
              ref: "c1",
              text: "What does Greta want to know?",
              options: ["Which food she must buy", "When the shop closes", "Where you are now"],
              answer: 0,
              explain:
                "İleti tek soru soruyor: «Do you want bread or rice?». Mağazanın kapanış saati ya da karşıdakinin yeri hiç geçmiyor; beş dakika bilgisi geri arama süresi.",
            },
            {
              kind: "mcq",
              id: "en-a1-03-h3-12",
              no: 12,
              ref: "c2",
              text: "Where is the supermarket?",
              options: ["In front of the church, on the big square", "Behind the church", "Next to the bus stop"],
              answer: 1,
              explain:
                "Adam «behind the church» diyor. Kilise kayıtta geçiyor ama yön arkasıdır; ilk şık yönü tersine çeviriyor. Üç dakika bilgisi mesafe, yer değil.",
            },
            {
              kind: "mcq",
              id: "en-a1-03-h3-13",
              no: 13,
              ref: "c3",
              text: "What does Zeynep do at twelve?",
              options: ["She goes to the canteen", "She drinks a coffee there", "She eats her own food"],
              answer: 2,
              explain:
                "Zeynep «I bring food from home today» diyor, yani on ikide yemekhaneye gitmiyor. Kahve için geliyor ama saat birde; iki saati ayırmak gerekiyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-03-h3-14",
              no: 14,
              ref: "c4",
              text: "How long does the customer wait?",
              options: ["Twelve minutes", "Fourteen minutes", "Twenty minutes"],
              answer: 2,
              explain:
                "Dükkân «Twenty minutes» diyor. Kayıttaki öteki iki sayı fiyat (on iki euro) ve kapı numarası (14); hangi sayının süre olduğunu ayırmak gerekiyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-03-h3-15",
              no: 15,
              ref: "c5",
              text: "Where is the money?",
              options: ["In her mother's bag", "In the kitchen", "On the table"],
              answer: 0,
              explain:
                "Anne «No, in my bag on the chair» diyor: para çantada, mutfakta değil. Lina mutfağı soruyor ve cevap onu reddediyor.",
            },
          ],
        },
      ],
    },

    /* ── WRITING ───────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 20,
      instruction: "This part has two tasks: you complete a form and you write a short message.",
      instructionTr: "Bu bölümde iki görev var: bir formu tamamlayacak ve kısa bir ileti yazacaksın.",
      tasks: [
        {
          id: "en-a1-03-w1",
          no: 1,
          format: "gap",
          goal: "detail",
          prompt:
            "Your friend Sena Kaplan orders a food box for one week. She wants the small box. She does not eat meat. The box comes to 5 River Street, Leeds. She wants it on Thursday. Five things are missing on the form. Write them in the gaps.",
          promptTr:
            "Arkadaşın Sena Kaplan bir haftalık yiyecek kutusu sipariş ediyor. Küçük kutuyu istiyor. Et yemiyor. Kutu 5 River Street, Leeds adresine gelecek. Perşembe istiyor. Formda beş bilgi eksik; boşluklara yaz.",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Form",
              genreTr: "Form",
              title: "FOOD BOX — ORDER",
              body: `Family name:        Kaplan
First name:         {{1}}
Size of the box:    {{2}}
No meat?            {{3}}
Street and number:  {{4}}
Town:               Leeds
Day:                {{5}}`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a1-03-w1-1",
              no: 1,
              text: "First name",
              accept: ["Sena"],
              explain:
                "Yönergede tam ad «Sena Kaplan» olarak geçiyor. Soyadı formda zaten basılı, bu yüzden boşluğa yalnız ilk ad yazılır; iki alanı karıştıran öğrenci soyadını tekrarlar.",
            },
            {
              kind: "gap",
              id: "en-a1-03-w1-2",
              no: 2,
              text: "Size of the box",
              accept: ["small", "the small box", "small box"],
              explain:
                "Yönerge «She wants the small box» diyor. Boyut için tek sözcük yeter; tam öbek de kabul edilir, çünkü ölçülen şey bilgiyi doğru alana taşımak.",
            },
            {
              kind: "gap",
              id: "en-a1-03-w1-3",
              no: 3,
              text: "No meat?",
              accept: ["yes", "no meat", "correct"],
              explain:
                "Yönergede «She does not eat meat» geçiyor ve form «No meat?» diye soruyor. Soru olumsuz kurulduğu için doğru cevap `yes`: et istemiyor. `no` yazmak tam tersini söylerdi.",
            },
            {
              kind: "gap",
              id: "en-a1-03-w1-4",
              no: 4,
              text: "Street and number",
              accept: ["5 River Street", "River Street 5"],
              explain:
                "Adres yönergede «5 River Street, Leeds» olarak veriliyor; bu satır yalnız sokağı ve numarayı istiyor. Şehir formda zaten basılı, buraya yazılmaz.",
            },
            {
              kind: "gap",
              id: "en-a1-03-w1-5",
              no: 5,
              text: "Day",
              accept: ["Thursday", "on Thursday"],
              explain:
                "Yönerge «She wants it on Thursday» diyor. Gün adı büyük harfle yazılır ama karşılaştırma büyük-küçük harfe bakmadığı için küçük yazım da doğru sayılır.",
            },
          ],
        },
        {
          id: "en-a1-03-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "You want to invite a friend to dinner at your home. Write a short message. Write one or two sentences about each point (about 25 words). Do not forget the greeting at the start and at the end.",
          promptTr:
            "Bir arkadaşını evine yemeğe çağırmak istiyorsun. Kısa bir ileti yaz. Her maddeye bir-iki cümle yaz (yaklaşık 25 kelime). Baştaki hitabı ve sondaki veda cümlesini unutma.",
          items: [],
          rubric: {
            minWords: 25,
            points: [
              { de: "Say when your friend can come.", tr: "Arkadaşın ne zaman gelebilir, söyle." },
              { de: "Say what you cook.", tr: "Ne pişireceğini söyle." },
              { de: "Ask your friend to bring something.", tr: "Arkadaşından bir şey getirmesini iste." },
            ],
            sample: `Dear Bruno,

Can you come to my home on Saturday at seven? I cook fish and rice. Please bring bread or fruit.

See you on Saturday!
Iris`,
            criteria: [
              "Üç içerik noktasının üçü de var mı? Biri eksikse metin tam sayılmaz.",
              "Hitap ve veda var mı? (Dear … / See you …)",
              "Yaklaşık 25 kelime yazıldı mı?",
              "Çağrı bir soru ya da açık bir cümleyle mi yapıldı? (Can you come … / Come to …)",
              "Cümleler anlaşılıyor mu? A1'de birkaç hata anlamı bozmuyorsa sorun değil.",
            ],
          },
        },
      ],
    },

    /* ── SPEAKING ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "This part has three tasks: you introduce yourself, you ask and answer questions about food, and you act in a shop.",
      instructionTr: "Bu bölümde üç görev var: kendini tanıtma, yemek üzerine soru sorup cevaplama ve mağazada rol yapma.",
      tasks: [
        {
          id: "en-a1-03-s1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt: "Talk about your food and your day. Speak about these words: breakfast — lunch — favourite food — shopping day — cooking — a drink you like.",
          promptTr: "Yemeğinden ve gününden söz et. Şu sözcüklere göre konuş: kahvaltı — öğle yemeği — en sevdiğin yemek — alışveriş günü — yemek pişirme — sevdiğin bir içecek.",
          prepSeconds: 30,
          speakSeconds: 90,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "breakfast and lunch", tr: "Kahvaltı ve öğle yemeği" },
              { de: "your favourite food", tr: "En sevdiğin yemek" },
              { de: "when you go shopping", tr: "Ne zaman alışverişe gidiyorsun" },
              { de: "one drink you like", tr: "Sevdiğin bir içecek" },
            ],
            sample:
              "For breakfast I eat bread with cheese and I drink tea. At one o'clock I eat at work. My favourite food is fish with rice. I go shopping on Saturday morning. I cook every evening. I like cold water with lemon.",
            criteria: [
              "Altı sözcüğün her birine değinildi mi?",
              "Cümleler kısa ve tam mı? A1'de \"I eat …\", \"I like …\" kalıpları yeterli.",
              "Saat ve gün adları doğru söylendi mi?",
              "Anlaşılır bir tempoda mı konuşuldu?",
            ],
          },
        },
        {
          id: "en-a1-03-s2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Topic: shopping for food. Make a question for each word and answer my questions: market — bread — price — bag — Sunday.",
          promptTr:
            "Konu: yiyecek alışverişi. Her sözcük için bir soru kur ve benim sorularımı cevapla: pazar — ekmek — fiyat — çanta — pazar günü.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "Now we talk about shopping for food. Your first word is: market. Please ask me a question.", tr: "Şimdi yiyecek alışverişini konuşuyoruz. İlk sözcüğün: pazar. Bana bir soru sor." },
            { who: "you", hint: "«market» sözcüğüyle bir soru kur.", expect: "market sözcüğüyle dilbilgisel olarak doğru bir soru kurmak", seconds: 25 },
            { who: "partner", de: "The market in my town is open on Saturday. Your next word is: bread.", tr: "Benim şehrimde pazar cumartesi kuruluyor. Sıradaki sözcüğün: ekmek." },
            { who: "you", hint: "«bread» için bir soru kur.", expect: "bread sözcüğüyle bir soru kurmak", seconds: 25 },
            { who: "partner", de: "I buy bread every morning. Now a question for you: how much is a kilo of apples where you live?", tr: "Her sabah ekmek alıyorum. Şimdi sana bir soru: Yaşadığın yerde bir kilo elma kaç para?" },
            { who: "you", hint: "Bir fiyat söyle.", expect: "bir fiyatı İngilizce söylemek (para birimiyle)", seconds: 25 },
            { who: "partner", de: "Thank you. Last question: what do you do on Sunday?", tr: "Teşekkürler. Son soru: Pazar günü ne yaparsın?" },
            { who: "you", hint: "Pazar gününü tam bir cümleyle anlat.", expect: "bir günü tam bir cümleyle anlatmak", seconds: 25 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "a question for each word", tr: "Her sözcük için bir soru" },
              { de: "answers to my questions", tr: "Sorulara cevap vermek" },
            ],
            sample:
              "Where is the market? — It is in the old square. Do you buy bread every day? — Yes, in the morning. How much is the bread? — One euro twenty. Do you have a bag? — No, I need a bag. What do you do on Sunday? — I cook for my family.",
            criteria: [
              "Beş sözcüğün her biri için bir soru kuruldu mu?",
              "Sorular doğru kuruldu mu? (Where is … / Do you … / How much is …)",
              "Cevaplar soruya uygun mu?",
              "Fiyat ve gün adları söylenebiliyor mu?",
            ],
          },
        },
        {
          id: "en-a1-03-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "You are in a shop. Situations: you want two kilos of tomatoes. — You do not have a bag. — The shop assistant gives you the wrong change.",
          promptTr:
            "Bir mağazadasın. Durumlar: İki kilo domates istiyorsun. — Çantan yok. — Görevli sana yanlış para üstü veriyor.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good morning. What can I get you?", tr: "Günaydın. Ne verebilirim?" },
            { who: "you", hint: "İki kilo domates iste.", expect: "miktar belirterek bir ürün istemek", seconds: 20 },
            { who: "partner", de: "Here you are. Do you have a bag?", tr: "Buyurun. Çantanız var mı?" },
            { who: "you", hint: "Çantan olmadığını söyle ve bir çanta iste.", expect: "olumsuz cevap verip kibarca bir şey istemek", seconds: 20 },
            { who: "partner", de: "That is four euros fifty. Here is your change: two euros.", tr: "Dört euro elli. Para üstünüz: iki euro." },
            { who: "you", hint: "Para üstünün yanlış olduğunu kibarca söyle.", expect: "bir hatayı kibarca bildirmek", seconds: 25 },
          ],
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "ask for a quantity", tr: "Miktar belirterek istemek" },
              { de: "ask for something politely", tr: "Kibarca bir şey istemek" },
              { de: "say that something is wrong", tr: "Bir şeyin yanlış olduğunu söylemek" },
            ],
            sample:
              "Two kilos of tomatoes, please. — No, I do not have a bag. Can I have one, please? — Sorry, I think that is not right. I give you ten euros.",
            criteria: [
              "Miktar doğru söylendi mi? (two kilos of …)",
              "Rica `please` ile ve kibar bir kalıpla mı kuruldu?",
              "Hata kibarca mı bildirildi? (Sorry, I think …)",
              "Sayılar ve fiyatlar anlaşılır söylendi mi?",
            ],
          },
        },
      ],
    },
  ],
};
