import type { MockPaper } from "../types";

/**
 * A1 · Deneme 7 — "Clothes, Weather and Shopping".
 *
 * A1'in öteki denemeleriyle AYNI PLAN; konu ayrı. Giysi ve hava A1'de
 * verimli çünkü ölçülen şey yine sayıyı doğru yerden almak: derece,
 * beden, fiyat, gün sayısı. Renk ve beden sözcükleri de havuzun içinde
 * kalıyor, yani metin seviyeyi zorlamıyor.
 *
 * A1 SINIRI: geniş zaman, `can`, `there is / there are`, basit geçmiş
 * biçimler. Present perfect, edilgen, ilgi cümlesi ve koşul kipleri yok.
 */
export const EN_A1_07: MockPaper = {
  id: "en-a1-07",
  course: "en",
  level: "A1",
  no: 7,
  theme: "Clothes, Weather and Shopping",
  themeTr: "Giysi, hava ve alışveriş",
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
          id: "en-a1-07-l1",
          no: 1,
          format: "truefalse",
          goal: "detail",
          prompt: "Read the two texts and questions 1 to 5. Are the sentences true or false?",
          promptTr: "İki metni ve 1–5. maddeleri oku. Cümleler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Message",
              genreTr: "İleti",
              title: "From Cato",
              body: `Hi Wren,

It is very cold here — two degrees this morning! Bring your big coat, not the thin one.

The shops are open until eight, so we can go on Friday after work.

I have a red hat for you. It is a present, please do not buy one.

See you on Friday!
Cato`,
              gloss: [
                { de: "a degree", tr: "derece", en: "degree" },
                { de: "a present", tr: "hediye", en: "present" },
              ],
            },
            {
              kind: "text",
              id: "t2",
              genre: "Notice in a shop",
              genreTr: "Mağaza duyurusu",
              title: "WINTER SALE",
              body: `Coats and shoes: 30 per cent less.

You can change the size in seven days. Bring the paper.

Hats and gloves are not in the sale.

Open Monday to Saturday, 9 to 20.`,
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-07-l1-1",
              no: 1,
              ref: "t1",
              text: "Wren must bring a warm coat.",
              answer: true,
              explain:
                "İleti seçimi açık yapıyor: «Bring your big coat, not the thin one». Sabah iki derece olduğu için kalın olan isteniyor.",
            },
            {
              kind: "bool",
              id: "en-a1-07-l1-2",
              no: 2,
              ref: "t1",
              text: "Cato wants Wren to buy a hat.",
              answer: false,
              explain:
                "İleti tam tersini söylüyor: «It is a present, please do not buy one». Şapka zaten alınmış durumda.",
            },
            {
              kind: "bool",
              id: "en-a1-07-l1-3",
              no: 3,
              ref: "t1",
              text: "The shops close at nine in the evening.",
              answer: false,
              explain:
                "İleti kapanış saatini veriyor: «The shops are open until eight». Dokuz bu saatten sonra; cuma planı da bu saate göre kuruluyor.",
            },
            {
              kind: "bool",
              id: "en-a1-07-l1-4",
              no: 4,
              ref: "t2",
              text: "Hats are cheaper in the sale.",
              answer: false,
              explain:
                "Duyuru istisnayı ayrı satırda yazıyor: «Hats and gloves are not in the sale». İndirim yalnız mont ve ayakkabıda.",
            },
            {
              kind: "bool",
              id: "en-a1-07-l1-5",
              no: 5,
              ref: "t2",
              text: "You can change the size of a coat in the first week.",
              answer: true,
              explain:
                "Duyuru süreyi veriyor: «You can change the size in seven days». Yedi gün bir haftadır; fiş de isteniyor.",
            },
          ],
        },
        {
          id: "en-a1-07-l2",
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
              title: "Second Hand Clothes",
              body: `Open Tuesday to Saturday from 10 to 18.

Coats, shoes and children's clothes.

Everything under fifteen euros.

We do not take clothes from you; we only sell.`,
            },
            {
              kind: "text",
              id: "p2",
              genre: "Notice",
              genreTr: "Duyuru",
              title: "Market on the Square",
              body: `Every Thursday from 7 to 14.

Clothes, food and flowers.

Cheap, but you cannot change anything.

Money only, no cards.`,
            },
            {
              kind: "text",
              id: "p3",
              genre: "Notice",
              genreTr: "Duyuru",
              title: "Big Shop Central",
              body: `Open every day from 9 to 21, also on Sunday.

All sizes.

You can change a thing in thirty days with the paper.

Coffee shop on the first floor.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-07-l2-6",
              no: 6,
              text: "You want to buy a coat on a Thursday and you have money, not a card.",
              options: ["Second Hand Clothes", "Market on the Square", "Big Shop Central"],
              answer: 1,
              explain:
                "Pazar duyurusu iki koşulu da karşılıyor: «Every Thursday» ve «Money only, no cards». İkinci el dükkânı perşembe açık ama duyurusunda ödeme biçimi yazmıyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-07-l2-7",
              no: 7,
              text: "You are not sure about the size and you want a month to think.",
              options: ["Second Hand Clothes", "Market on the Square", "Big Shop Central"],
              answer: 2,
              explain:
                "Büyük mağaza süreyi veriyor: «You can change a thing in thirty days with the paper». Pazarda hiçbir şey değiştirilemiyor, ikinci el dükkânında ise bir süre yazmıyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-07-l2-8",
              no: 8,
              text: "You want cheap shoes for a child and today is Saturday.",
              options: ["Second Hand Clothes", "Market on the Square", "Big Shop Central"],
              answer: 0,
              explain:
                "İkinci el duyurusu üç şeyi birden veriyor: «children's clothes», «Everything under fifteen euros» ve cumartesi açık. Pazar yalnız perşembe kuruluyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-07-l2-9",
              no: 9,
              text: "You want to buy something at eight in the morning.",
              options: ["Second Hand Clothes", "Market on the Square", "Big Shop Central"],
              answer: 1,
              explain:
                "Yalnız pazar bu saatte açık: «from 7 to 14». İkinci el dükkânı onda, büyük mağaza dokuzda açılıyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-07-l2-10",
              no: 10,
              text: "You want to go shopping on a Sunday.",
              options: ["Second Hand Clothes", "Market on the Square", "Big Shop Central"],
              answer: 2,
              explain:
                "Büyük mağaza duyurusu bunu açıkça yazıyor: «Open every day from 9 to 21, also on Sunday». Öteki iki yer pazar günü kapalı.",
            },
          ],
        },
        {
          id: "en-a1-07-l3",
          no: 3,
          format: "truefalse",
          goal: "instruction",
          prompt: "Read the four signs and questions 11 to 14. Are the sentences true or false?",
          promptTr: "Dört levhayı ve 11–14. maddeleri oku. Cümleler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "s1",
              genre: "Sign at the changing room",
              genreTr: "Kabin levhası",
              title: "CHANGING ROOM",
              body: `Four things only.

Please give the card to the person at the door.

Do not eat or drink here.`,
            },
            {
              kind: "text",
              id: "s2",
              genre: "Sign in the shoe shop",
              genreTr: "Ayakkabıcıdaki levha",
              title: "SHOES",
              body: `Please do not walk outside with new shoes.

You can walk on the small grey carpet.

Ask for another size at the desk.`,
            },
            {
              kind: "text",
              id: "s3",
              genre: "Sign at the desk",
              genreTr: "Kasadaki levha",
              title: "PAY HERE",
              body: `Cards and money.

We do not take cheques.

Children under twelve: not alone at the desk.`,
            },
            {
              kind: "text",
              id: "s4",
              genre: "Sign on the door",
              genreTr: "Kapıdaki levha",
              title: "CLOSED FOR ONE HOUR",
              body: `We open again at 14:00.

The coffee shop on the first floor is open.

Thank you!`,
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-07-l3-11",
              no: 11,
              ref: "s1",
              text: "You can take five things into the changing room.",
              answer: false,
              explain:
                "Levha sınırı ilk satırda veriyor: «Four things only». `only` bir üst sınır koyuyor; beş bu sınırın üstünde.",
            },
            {
              kind: "bool",
              id: "en-a1-07-l3-12",
              no: 12,
              ref: "s2",
              text: "You can walk on the grey carpet with new shoes.",
              answer: true,
              explain:
                "Levha yasağı ve istisnayı ayrı satırlara koyuyor: dışarıda yürünmez, ama «You can walk on the small grey carpet». İki satırı birlikte okumak gerekiyor.",
            },
            {
              kind: "bool",
              id: "en-a1-07-l3-13",
              no: 13,
              ref: "s3",
              text: "You cannot pay with a cheque.",
              answer: true,
              explain:
                "Levha kabul edileni ve edilmeyeni ayrı satırlarda veriyor: «Cards and money» ve «We do not take cheques».",
            },
            {
              kind: "bool",
              id: "en-a1-07-l3-14",
              no: 14,
              ref: "s4",
              text: "The coffee shop is open now.",
              answer: true,
              explain:
                "Mağaza bir saat kapalı ama levha bir seçenek veriyor: «The coffee shop on the first floor is open». İki satırı birlikte okumak gerekiyor.",
            },
          ],
        },
        {
          id: "en-a1-07-l4",
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
              title: "To Uma",
              body: `Hello Uma,

Thank you for the photo! I come {{15}} Sunday, not on Saturday.

The weather here {{16}} very cold. I take two jumpers and a big coat.

I have a small bag, {{17}} it is full. Sorry!

Last winter I {{18}} you a warm hat. Do you still have it?

Eren`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-07-l4-15",
              no: 15,
              text: "Gap 15",
              options: ["in", "at", "on"],
              answer: 2,
              explain:
                "Gün adlarıyla `on` kullanılır: on Sunday. Cümlenin devamı da bunu gösteriyor: «not on Saturday». `in` ay ve yıl için, `at` saat için gelir.",
            },
            {
              kind: "mcq",
              id: "en-a1-07-l4-16",
              no: 16,
              text: "Gap 16",
              options: ["is", "are", "have"],
              answer: 0,
              explain:
                "Özne `the weather` tekildir, bu yüzden `is` gelir. `are` çoğul öznelerle kullanılır; `have` ise hava durumu için kullanılmaz.",
            },
            {
              kind: "mcq",
              id: "en-a1-07-l4-17",
              no: 17,
              text: "Gap 17",
              options: ["so", "but", "because"],
              answer: 1,
              explain:
                "İki bilgi karşıt: çanta küçük, ama dolu. Karşıtlığı `but` kurar. `so` sonuç, `because` sebep bildirir ve ikisi de bu beklenmedikliği veremez.",
            },
            {
              kind: "mcq",
              id: "en-a1-07-l4-18",
              no: 18,
              text: "Gap 18",
              options: ["gave", "give", "gives"],
              answer: 0,
              explain:
                "Cümle «Last winter» ile başlıyor: zaman geçmiş. `give` fiilinin geçmiş biçimi düzensizdir: `gave`. Öteki iki şık geniş zamandır.",
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
          id: "en-a1-07-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "You hear six short recordings, questions 1 to 6. Choose a, b or c. You hear every recording twice.",
          promptTr: "Altı kısa kayıt dinleyeceksin, 1–6. maddeler. a, b ya da c'yi seç. Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Announcement",
              genreTr: "Anons",
              situation: "Mağazada anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "Attention please. The shop closes at six today, not at eight, because of the snow. The sale starts again tomorrow at nine. Thank you." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Phone message",
              genreTr: "Telefon iletisi",
              situation: "Mağaza müşteriye ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello, this is the shop about your coat. The red one in your size is here now. We keep it for you until Friday. Please bring the paper." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "At home",
              genreTr: "Evde",
              situation: "İki kişi dışarı çıkmadan önce konuşuyor.",
              plays: 2,
              segments: [
                { text: "Is it cold outside?" },
                { text: "Very. Take a hat." },
                { text: "And an umbrella?" },
                { text: "No, it does not rain. It is only cold and dry." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Radyoda hava durumu veriliyor.",
              plays: 2,
              segments: [
                { text: "Good morning. Today it is cold and grey, four degrees. It rains in the afternoon. Tomorrow the sun comes back and it is nine degrees." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "In a shop",
              genreTr: "Mağazada",
              situation: "Bir müşteri kazak değiştirmek istiyor.",
              plays: 2,
              segments: [
                { text: "Can I change this jumper? It is too small." },
                { text: "Of course. Have you got the paper?" },
                { text: "Yes, here." },
                { text: "Then take the bigger one from the shelf." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Announcement",
              genreTr: "Anons",
              situation: "Mağazada kabinler için anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "A note for all customers. The changing rooms on the first floor are closed today. Please use the rooms next to the shoes on the ground floor." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-07-h1-1",
              no: 1,
              ref: "a1",
              text: "When does the shop close today?",
              options: ["At six", "At eight", "At nine"],
              answer: 0,
              explain:
                "Anons düzeltmeyi kendisi yapıyor: «closes at six today, not at eight». Dokuz ise yarınki açılış saati; üç sayı da kayıtta geçiyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-07-h1-2",
              no: 2,
              ref: "a2",
              text: "What must the customer bring?",
              options: ["Money for the coat", "The paper", "A photo"],
              answer: 1,
              explain:
                "İleti tek bir şey istiyor: «Please bring the paper». Ödeme ya da fotoğraf kayıtta hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-07-h1-3",
              no: 3,
              ref: "a3",
              text: "What must the person take?",
              options: ["An umbrella", "Nothing", "A hat"],
              answer: 2,
              explain:
                "Öneri açık: «Take a hat». Şemsiye sorulduğunda cevap «No, it does not rain» oluyor, yani gerekmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-07-h1-4",
              no: 4,
              ref: "a4",
              text: "How is the weather today?",
              options: ["Cold and grey", "Warm and sunny", "Nine degrees"],
              answer: 0,
              explain:
                "Kayıt bugünü ve yarını ayırıyor: «Today it is cold and grey, four degrees». Dokuz derece ve güneş yarına ait.",
            },
            {
              kind: "mcq",
              id: "en-a1-07-h1-5",
              no: 5,
              ref: "a5",
              text: "What is the problem with the jumper?",
              options: ["The colour", "The price", "The size"],
              answer: 2,
              explain:
                "Müşteri sorunu söylüyor: «It is too small», ve görevli rafta daha büyüğünü gösteriyor. Renk ve fiyat kayıtta hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-07-h1-6",
              no: 6,
              ref: "a6",
              text: "Where can people change clothes today?",
              options: ["On the first floor", "Next to the shoes", "At home"],
              answer: 1,
              explain:
                "Anons yeri değiştiriyor: birinci kattaki kabinler kapalı, «Please use the rooms next to the shoes on the ground floor».",
            },
          ],
        },
        {
          id: "en-a1-07-h2",
          no: 2,
          format: "truefalse",
          goal: "instruction",
          prompt: "You hear an announcement in a big shop. Are sentences 7 to 10 true or false? You hear the announcement twice.",
          promptTr: "Büyük bir mağazada yapılan anonsu dinleyeceksin. 7–10. cümleler doğru mu yanlış mı? Anonsu iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Announcement",
              genreTr: "Anons",
              situation: "Mağaza müdürü iki değişiklik duyuruyor.",
              plays: 2,
              segments: [
                { text: "Good afternoon. Two things. From Monday the shop opens at eight in the morning, one hour earlier. The winter sale finishes on Saturday, so this is the last week. And a small thing: the lift to the second floor does not work today; please use the stairs." },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-07-h2-7",
              no: 7,
              ref: "b1",
              text: "From Monday the shop opens earlier.",
              answer: true,
              explain:
                "Anons bunu iki kez söylüyor: «opens at eight in the morning, one hour earlier». Yani eski saat dokuzdu.",
            },
            {
              kind: "bool",
              id: "en-a1-07-h2-8",
              no: 8,
              ref: "b1",
              text: "The sale finishes on Sunday.",
              answer: false,
              explain:
                "Anons günü veriyor: «The winter sale finishes on Saturday». Pazar bu günden sonra; gün adlarını ayırmak gerekiyor.",
            },
            {
              kind: "bool",
              id: "en-a1-07-h2-9",
              no: 9,
              ref: "b1",
              text: "The lift works today.",
              answer: false,
              explain:
                "Anons tam tersini söylüyor: «the lift to the second floor does not work today; please use the stairs».",
            },
            {
              kind: "bool",
              id: "en-a1-07-h2-10",
              no: 10,
              ref: "b1",
              text: "This is the last week of the sale.",
              answer: true,
              explain:
                "Anons sonucu kendisi çıkarıyor: indirim cumartesi bitiyor, «so this is the last week».",
            },
          ],
        },
        {
          id: "en-a1-07-h3",
          no: 3,
          format: "mcq",
          goal: "detail",
          prompt: "You hear five short recordings, questions 11 to 15. Choose a, b or c. You hear every recording twice.",
          promptTr: "Beş kısa kayıt dinleyeceksin, 11–15. maddeler. a, b ya da c'yi seç. Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Phone message",
              genreTr: "Telefon iletisi",
              situation: "Bir arkadaş yolda ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hi Katri, it snows here! I take the train, not the car. I come at four, not at two. Do not wait outside, it is very cold." },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "In a shop",
              genreTr: "Mağazada",
              situation: "Bir müşteri iki gömlek alıyor.",
              plays: 2,
              segments: [
                { text: "Two of these shirts, please." },
                { text: "The blue ones?" },
                { text: "Yes." },
                { text: "They are twelve euros each, so twenty-four." },
                { text: "Here is thirty." },
                { text: "And six back. Thank you." },
              ],
            },
            {
              kind: "audio",
              id: "c3",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Radyoda hafta sonu hava durumu veriliyor.",
              plays: 2,
              segments: [
                { text: "Tomorrow is a good day for the beach: twenty-six degrees and no rain. On Sunday it is only sixteen degrees and windy." },
              ],
            },
            {
              kind: "audio",
              id: "c4",
              genre: "In a shop",
              genreTr: "Mağazada",
              situation: "Bir müşteri mont rengi soruyor.",
              plays: 2,
              segments: [
                { text: "Have you got this coat in blue?" },
                { text: "Only in black and grey. Blue comes next week." },
                { text: "Then I come back on Tuesday." },
              ],
            },
            {
              kind: "audio",
              id: "c5",
              genre: "Announcement",
              genreTr: "Anons",
              situation: "Pazarda anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "The market on the square is open until two today, not until four. It rains after two. Bring a bag; we have no plastic bags." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-07-h3-11",
              no: 11,
              ref: "c1",
              text: "When does the person come?",
              options: ["At two", "At two in the morning", "At four"],
              answer: 2,
              explain:
                "İleti düzeltmeyi kendisi yapıyor: «I come at four, not at two». İki, iptal edilen eski saat.",
            },
            {
              kind: "mcq",
              id: "en-a1-07-h3-12",
              no: 12,
              ref: "c2",
              text: "How much are the two shirts?",
              options: ["Twenty-four euros", "Thirty euros for two", "Six euros"],
              answer: 0,
              explain:
                "Görevli hesabı yapıyor: «twelve euros each, so twenty-four». Otuz müşterinin verdiği para, altı ise üstü.",
            },
            {
              kind: "mcq",
              id: "en-a1-07-h3-13",
              no: 13,
              ref: "c3",
              text: "How is the weather on Sunday?",
              options: ["Warm and dry", "Cold and windy", "Twenty-six degrees"],
              answer: 1,
              explain:
                "Kayıt iki günü ayırıyor: «On Sunday it is only sixteen degrees and windy». Yirmi altı derece yarına ait.",
            },
            {
              kind: "mcq",
              id: "en-a1-07-h3-14",
              no: 14,
              ref: "c4",
              text: "What does the customer do?",
              options: ["She buys the black coat today", "She buys nothing today", "She comes back next week"],
              answer: 2,
              explain:
                "Mavi mont gelecek hafta geliyor ve müşteri «Then I come back on Tuesday» diyor. Siyah ya da gri almıyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-07-h3-15",
              no: 15,
              ref: "c5",
              text: "Why does the market close early?",
              options: ["Because of the rain", "Because of the bags", "Because it is Sunday"],
              answer: 0,
              explain:
                "Anons gerekçeyi hemen veriyor: «It rains after two». Torbalar ayrı bir uyarı; gün ise hiç söylenmiyor.",
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
          id: "en-a1-07-w1",
          no: 1,
          format: "gap",
          goal: "detail",
          prompt:
            "Your friend Tomo Vidal orders a winter coat on the internet. He wants the black coat, size 52. It comes to 9 Church Road. His phone number is 07700 900 372. Five things are missing on the form. Write them in the gaps.",
          promptTr:
            "Arkadaşın Tomo Vidal internetten kışlık bir mont sipariş ediyor. Siyah montu, 52 beden istiyor. 9 Church Road adresine gelecek. Telefonu 07700 900 372. Formda beş bilgi eksik; boşluklara yaz.",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Form",
              genreTr: "Form",
              title: "COAT — ORDER",
              body: `Family name:       Vidal
First name:        {{1}}
Colour:            {{2}}
Size:              {{3}}
Street and number: {{4}}
Phone:             {{5}}`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a1-07-w1-1",
              no: 1,
              text: "First name",
              accept: ["Tomo"],
              explain:
                "Yönergede tam ad «Tomo Vidal» olarak geçiyor. Soyadı formda zaten basılı, bu yüzden boşluğa yalnız ilk ad yazılır.",
            },
            {
              kind: "gap",
              id: "en-a1-07-w1-2",
              no: 2,
              text: "Colour",
              accept: ["black"],
              explain:
                "Yönerge rengi veriyor: «He wants the black coat». Renk adları küçük harfle yazılır ve karşılaştırma büyük-küçük harfe bakmıyor.",
            },
            {
              kind: "gap",
              id: "en-a1-07-w1-3",
              no: 3,
              text: "Size",
              accept: ["52"],
              explain:
                "Yönergede beden «size 52» olarak veriliyor. Form yalnız sayıyı istiyor; rengi buraya yazan öğrenci iki alanı karıştırmış olur.",
            },
            {
              kind: "gap",
              id: "en-a1-07-w1-4",
              no: 4,
              text: "Street and number",
              accept: ["9 Church Road", "Church Road 9"],
              explain:
                "Adres yönergede «9 Church Road» olarak veriliyor. İngilizcede kapı numarası sokak adından ÖNCE gelir; Türkçe sıraya alışkın öğrenci ters yazabilir, ikisi de kabul ediliyor.",
            },
            {
              kind: "gap",
              id: "en-a1-07-w1-5",
              no: 5,
              text: "Phone",
              accept: ["07700 900 372", "07700900372"],
              explain:
                "Telefon numarası yönergede «07700 900 372» olarak veriliyor. Boşluklu ve boşluksuz yazım kabul edilir; baştaki sıfır düşürülmemeli.",
            },
          ],
        },
        {
          id: "en-a1-07-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "A friend comes to your city for three days. Write a short message about the weather and clothes. Write one or two sentences about each point (about 25 words). Do not forget the greeting at the start and at the end.",
          promptTr:
            "Bir arkadaşın üç günlüğüne şehrine geliyor. Hava ve giysiler hakkında kısa bir ileti yaz. Her maddeye bir-iki cümle yaz (yaklaşık 25 kelime). Baştaki hitabı ve sondaki veda cümlesini unutma.",
          items: [],
          rubric: {
            minWords: 25,
            points: [
              { de: "Say what the weather is like.", tr: "Havanın nasıl olduğunu söyle." },
              { de: "Say what clothes your friend should bring.", tr: "Arkadaşının hangi giysileri getirmesi gerektiğini söyle." },
              { de: "Say what you can do together.", tr: "Birlikte ne yapabileceğinizi söyle." },
            ],
            sample: `Hi Wren,

It is very cold here, only three degrees, and it rains on Thursday.

Please bring a big coat and good shoes. A hat is also good.

On Friday we can go to the market and drink hot coffee.

See you soon!
Cato`,
            criteria: [
              "Üç içerik noktasının üçü de var mı? Biri eksikse metin tam sayılmaz.",
              "Hava somut mu anlatıldı? (derece ya da yağmur/kar)",
              "Giysi önerisi açık mı?",
              "Yaklaşık 25 kelime yazıldı mı? Hitap ve veda var mı?",
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
      instruction: "This part has three tasks: you talk about clothes and weather, you ask and answer questions, and you act in a shop.",
      instructionTr: "Bu bölümde üç görev var: giysi ve havayı anlatma, soru sorup cevaplama ve mağazada rol yapma.",
      tasks: [
        {
          id: "en-a1-07-s1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt: "Talk about clothes and weather. Speak about these words: today's weather — your coat — a colour you like — winter — summer — something you do not like.",
          promptTr: "Giysi ve havayı anlat. Şu sözcüklere göre konuş: bugünkü hava — montun — sevdiğin bir renk — kış — yaz — sevmediğin bir şey.",
          prepSeconds: 30,
          speakSeconds: 90,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "today's weather", tr: "Bugünkü hava" },
              { de: "your coat and a colour you like", tr: "Montun ve sevdiğin bir renk" },
              { de: "winter and summer", tr: "Kış ve yaz" },
              { de: "one thing you do not like", tr: "Sevmediğin bir şey" },
            ],
            sample:
              "Today it is cold and grey, about six degrees. My coat is black and it is very warm. I like blue and I have three blue shirts. In winter I wear a hat every day. In summer I wear a T-shirt and I go to the sea. I do not like rain in the morning.",
            criteria: [
              "Altı sözcüğün her birine değinildi mi?",
              "Derece ve renk söylenebiliyor mu?",
              "Giysi adları doğru kullanıldı mı?",
              "Anlaşılır bir tempoda mı konuşuldu?",
            ],
          },
        },
        {
          id: "en-a1-07-s2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Topic: shopping and weather. Make a question for each word and answer my questions: shop — coat — money — rain — weekend.",
          promptTr:
            "Konu: alışveriş ve hava. Her sözcük için bir soru kur ve benim sorularımı cevapla: dükkân — mont — para — yağmur — hafta sonu.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "Now we talk about shopping. Your first word is: shop. Please ask me a question.", tr: "Şimdi alışverişi konuşuyoruz. İlk sözcüğün: dükkân. Bana bir soru sor." },
            { who: "you", hint: "«shop» sözcüğüyle bir soru kur.", expect: "shop sözcüğüyle dilbilgisel olarak doğru bir soru kurmak", seconds: 25 },
            { who: "partner", de: "I buy my clothes in a small shop near my house. Your next word is: coat.", tr: "Giysilerimi evimin yanındaki küçük bir dükkândan alırım. Sıradaki sözcüğün: mont." },
            { who: "you", hint: "«coat» için bir soru kur.", expect: "coat sözcüğüyle bir soru kurmak", seconds: 25 },
            { who: "partner", de: "My coat is green and it is ten years old. Now a question for you: what do you wear when it rains?", tr: "Montum yeşil ve on yaşında. Şimdi sana bir soru: Yağmur yağdığında ne giyersin?" },
            { who: "you", hint: "Giysi adı vererek cevapla.", expect: "giysi adlarıyla tam bir cümle kurmak", seconds: 25 },
            { who: "partner", de: "Thank you. Last question: how much is a warm coat where you live?", tr: "Teşekkürler. Son soru: Yaşadığın yerde sıcak bir mont kaç para?" },
            { who: "you", hint: "Bir fiyat söyle.", expect: "bir fiyatı İngilizce söylemek (para birimiyle)", seconds: 25 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "a question for each word", tr: "Her sözcük için bir soru" },
              { de: "answers to my questions", tr: "Sorulara cevap vermek" },
            ],
            sample:
              "Where do you buy your clothes? — In a small shop. Have you got a warm coat? — Yes, a black one. How much money do you take? — About fifty euros. What do you wear when it rains? — A coat and old shoes. How much is a warm coat? — Sixty or seventy euros.",
            criteria: [
              "Beş sözcüğün her biri için bir soru kuruldu mu?",
              "Sorular doğru kuruldu mu? (Where … / Have you got … / How much …)",
              "Cevaplar soruya uygun mu?",
              "Fiyat ve renk söylenebiliyor mu?",
            ],
          },
        },
        {
          id: "en-a1-07-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "You are in a clothes shop. Situations: you say what you want. — You ask about the size. — You ask about changing it.",
          promptTr:
            "Giysi mağazasındasın. Durumlar: Ne istediğini söyle. — Bedeni sor. — Değiştirmeyi sor.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good morning. Can I help you?", tr: "Günaydın. Yardımcı olabilir miyim?" },
            { who: "you", hint: "Ne aradığını söyle (giysi ve renk).", expect: "aradığı giysiyi ve rengini söylemek", seconds: 25 },
            { who: "partner", de: "Of course. The coats are here, on the left.", tr: "Tabii. Montlar burada, solda." },
            { who: "you", hint: "Bedenini sor ya da söyle.", expect: "beden sormak ya da bildirmek", seconds: 25 },
            { who: "partner", de: "Size 50 is here. It is eighty euros. Anything else?", tr: "50 beden burada. Seksen euro. Başka bir şey var mı?" },
            { who: "you", hint: "Değiştirip değiştiremeyeceğini kibarca sor.", expect: "kibarca değiştirme koşulunu sormak", seconds: 25 },
          ],
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "say what you want", tr: "Ne istediğini söylemek" },
              { de: "ask about the size", tr: "Bedeni sormak" },
              { de: "ask about changing it politely", tr: "Kibarca değiştirmeyi sormak" },
            ],
            sample:
              "I need a warm coat, please. In black or grey. — Have you got size 50? — Can I change it, please? I am not sure about the size.",
            criteria: [
              "İstek açıkça söylendi mi? (giysi ve renk)",
              "Beden sorusu doğru kuruldu mu? (Have you got size …)",
              "Değiştirme sorusu kibar bir kalıpla mı kuruldu? (Can I … please)",
              "Sayılar (beden, fiyat) anlaşıldı mı?",
            ],
          },
        },
      ],
    },
  ],
};
