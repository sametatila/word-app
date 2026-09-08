import type { MockPaper } from "../types";

/**
 * A1 · Deneme 5 — "Travel, Tickets and Time".
 *
 * A1'in öteki denemeleriyle AYNI PLAN; konu ayrı. Yolculuk A1'de ayrı bir
 * alan çünkü saat, peron, fiyat ve gün bilgisini bir arada taşıyor: bu
 * kâğıdın ölçtüğü şey sözcük bilgisi değil, kısa bir metinden doğru SAYIYI
 * çekip alabilmek.
 *
 * A1 SINIRI: geniş zaman, `can`, `there is / there are`, basit geçmiş
 * biçimler. Present perfect, edilgen, ilgi cümlesi ve koşul kipleri yok.
 */
export const EN_A1_05: MockPaper = {
  id: "en-a1-05",
  course: "en",
  level: "A1",
  no: 5,
  theme: "Travel, Tickets and Time",
  themeTr: "Yolculuk, bilet ve saat",
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
          id: "en-a1-05-l1",
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
              title: "From Alma",
              body: `Hi Otis,

My train arrives at 18:40, not at 17:40. Sorry!

Please do not come to the station. I take the bus number 9 to your street.

I have one small bag and one big bag. Can you help me with the big one at the door?

I am very hungry. Do we have bread at home?

Alma`,
              gloss: [
                { de: "to arrive", tr: "varmak", en: "arrive" },
                { de: "heavy", tr: "ağır", en: "heavy" },
              ],
            },
            {
              kind: "text",
              id: "t2",
              genre: "Notice at the station",
              genreTr: "İstasyon duyurusu",
              title: "BUS TICKETS",
              body: `You can buy a ticket in the shop or from the driver.

In the shop: 2 euros. From the driver: 3 euros.

Children under seven do not pay.

The last bus on Sunday is at 22:00.`,
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-05-l1-1",
              no: 1,
              ref: "t1",
              text: "Alma comes at twenty to seven in the evening.",
              answer: true,
              explain:
                "İleti «My train arrives at 18:40» diyor. 18:40 akşam yediye yirmi kala demektir. A1'de yirmi dört saatlik yazımı günlük saate çevirmek ölçülen becerilerden biri.",
            },
            {
              kind: "bool",
              id: "en-a1-05-l1-2",
              no: 2,
              ref: "t1",
              text: "Otis must come to the station.",
              answer: false,
              explain:
                "İleti tam tersini söylüyor: «Please do not come to the station». Alma otobüsle geleceğini de ekliyor, yani istasyonda buluşma yok.",
            },
            {
              kind: "bool",
              id: "en-a1-05-l1-3",
              no: 3,
              ref: "t1",
              text: "Alma has two bags.",
              answer: true,
              explain:
                "İleti çantaları sayıyor: «one small bag and one big bag». İkisi birlikte iki çanta eder; yardım istenen yalnız büyük olanı.",
            },
            {
              kind: "bool",
              id: "en-a1-05-l1-4",
              no: 4,
              ref: "t2",
              text: "A ticket from the driver costs two euros.",
              answer: false,
              explain:
                "Duyuru iki fiyat veriyor: «In the shop: 2 euros. From the driver: 3 euros». İki euro dükkândaki fiyat; şoförden alınan bilet bir euro daha pahalı.",
            },
            {
              kind: "bool",
              id: "en-a1-05-l1-5",
              no: 5,
              ref: "t2",
              text: "A child of five pays for the bus.",
              answer: false,
              explain:
                "Duyuru «Children under seven do not pay» diyor: yedi yaşın altı ücretsiz. Beş yaş bu sınırın altında, yani ödemiyor.",
            },
          ],
        },
        {
          id: "en-a1-05-l2",
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
              title: "Station Office",
              body: `Open Monday to Friday from 6 to 20, Saturday from 8 to 14. Closed on Sunday.

Tickets for trains and buses.

We print your ticket on paper.

We also answer questions about the bus.`,
            },
            {
              kind: "text",
              id: "p2",
              genre: "Notice",
              genreTr: "Duyuru",
              title: "City Bike",
              body: `Take a bike at any station and leave it at another one.

The first twenty minutes are free.

You need a card.

Not for children under fourteen.`,
            },
            {
              kind: "text",
              id: "p3",
              genre: "Notice",
              genreTr: "Duyuru",
              title: "Night Taxi",
              body: `From 22:00 to 5:00, every day.

Call 0800 44 44.

Four people, one price.

You pay in the car, with money or with a card.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-05-l2-6",
              no: 6,
              text: "You are at the airport at midnight and there is no bus.",
              options: ["Station Office", "City Bike", "Night Taxi"],
              answer: 2,
              explain:
                "Taksi duyurusu saatleri veriyor: «From 22:00 to 5:00, every day». Gece yarısı bu aralığın içinde. İstasyon ofisi sekizde kapanıyor, bisikletler ise yalnız istasyonlarda.",
            },
            {
              kind: "mcq",
              id: "en-a1-05-l2-7",
              no: 7,
              text: "You want somebody to print your train ticket on paper.",
              options: ["Station Office", "City Bike", "Night Taxi"],
              answer: 0,
              explain:
                "Yalnız istasyon ofisi bunu yazıyor: «We print your ticket on paper». Bisiklet ve taksi duyurularında bilet basmaktan hiç söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-05-l2-8",
              no: 8,
              text: "You want to go three streets quickly and pay nothing.",
              options: ["Station Office", "City Bike", "Night Taxi"],
              answer: 1,
              explain:
                "Bisiklet duyurusu «The first twenty minutes are free» diyor: kısa yol ücretsiz. Taksi her durumda paralı, istasyon ofisi ise bir ulaşım aracı değil.",
            },
            {
              kind: "mcq",
              id: "en-a1-05-l2-9",
              no: 9,
              text: "You are four people and you want one price for all of you.",
              options: ["Station Office", "City Bike", "Night Taxi"],
              answer: 2,
              explain:
                "Taksi duyurusu tam bunu söylüyor: «Four people, one price». Bisiklet tek kişiliktir ve kart ister; ofis bilet satar, yolculuk yaptırmaz.",
            },
            {
              kind: "mcq",
              id: "en-a1-05-l2-10",
              no: 10,
              text: "You want to buy a bus ticket on Saturday morning.",
              options: ["Station Office", "City Bike", "Night Taxi"],
              answer: 0,
              explain:
                "Ofis cumartesi «from 8 to 14» açık ve «Tickets for trains and buses» satıyor. Cumartesi sabahı bu aralığa giriyor; öteki iki duyuruda bilet satışı yok.",
            },
          ],
        },
        {
          id: "en-a1-05-l3",
          no: 3,
          format: "truefalse",
          goal: "instruction",
          prompt: "Read the four signs and questions 11 to 14. Are the sentences true or false?",
          promptTr: "Dört levhayı ve 11–14. maddeleri oku. Cümleler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "s1",
              genre: "Sign on the platform",
              genreTr: "Perondaki levha",
              title: "PLATFORM 3",
              body: `Trains to the city: every 20 minutes.

Do not walk on the yellow line.

Bikes: only in the first car.`,
            },
            {
              kind: "text",
              id: "s2",
              genre: "Sign in the bus",
              genreTr: "Otobüsteki levha",
              title: "BUS 9",
              body: `Get in at the front.

Show your ticket to the driver.

Push the red button before your stop.`,
            },
            {
              kind: "text",
              id: "s3",
              genre: "Sign on the machine",
              genreTr: "Makinedeki levha",
              title: "TICKET MACHINE",
              body: `The machine takes cards and coins.

No paper money.

If the machine does not work, buy your ticket in the shop.`,
            },
            {
              kind: "text",
              id: "s4",
              genre: "Sign at the lift",
              genreTr: "Asansördeki levha",
              title: "LIFT",
              body: `Out of order until 12 May.

Please use the stairs at the end of the platform.

Help: 0800 22 11.`,
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-05-l3-11",
              no: 11,
              ref: "s1",
              text: "You can take your bike in the last car.",
              answer: false,
              explain:
                "Levha yeri kesin söylüyor: «Bikes: only in the first car». `only` bir sınır koyuyor; son vagon bu sınırın dışında.",
            },
            {
              kind: "bool",
              id: "en-a1-05-l3-12",
              no: 12,
              ref: "s2",
              text: "You must show your ticket to the driver on bus 9.",
              answer: true,
              explain:
                "Levhadaki üç talimattan biri bu: «Show your ticket to the driver». Emir kipi bir zorunluluk bildiriyor.",
            },
            {
              kind: "bool",
              id: "en-a1-05-l3-13",
              no: 13,
              ref: "s3",
              text: "The ticket machine does not take paper money.",
              answer: true,
              explain:
                "Levha kabul edileni ve edilmeyeni ayrı satırlarda veriyor: «The machine takes cards and coins» ve «No paper money». Kâğıt para dışarıda kalıyor.",
            },
            {
              kind: "bool",
              id: "en-a1-05-l3-14",
              no: 14,
              ref: "s4",
              text: "You can call a number if you need help at the lift.",
              answer: true,
              explain:
                "Levhanın son satırı bir numara veriyor: «Help: 0800 22 11». Asansör çalışmıyor ve merdiven kullanamayan biri için yardım hattı yazılı.",
            },
          ],
        },
        {
          id: "en-a1-05-l4",
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
              title: "To Noa",
              body: `Hello Noa,

Thank you for the map! I come {{15}} Saturday, not on Friday.

My train {{16}} at ten in the morning. Can you meet me at the station?

I have a small bag, {{17}} it is very heavy. Sorry!

Last month I {{18}} you a book. Did it come?

Timo`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-05-l4-15",
              no: 15,
              text: "Gap 15",
              options: ["in", "on", "at"],
              answer: 1,
              explain:
                "Gün adlarıyla `on` kullanılır: on Saturday. Cümlenin devamı da bunu gösteriyor: «not on Friday». `in` ay ve yıl için, `at` saat için gelir.",
            },
            {
              kind: "mcq",
              id: "en-a1-05-l4-16",
              no: 16,
              text: "Gap 16",
              options: ["arrive", "arrived", "arrives"],
              answer: 2,
              explain:
                "Özne `my train` tekil üçüncü kişi, zaman ise gelecek bir plan: geniş zaman `-s` alır. `arrive` çoğul öznelerle, `arrived` ise geçmişle kullanılır ve cümledeki plan geleceğe ait.",
            },
            {
              kind: "mcq",
              id: "en-a1-05-l4-17",
              no: 17,
              text: "Gap 17",
              options: ["but", "so", "because"],
              answer: 0,
              explain:
                "İki bilgi karşıt: çanta küçük, ama çok ağır. Karşıtlığı `but` kurar. `so` sonuç, `because` sebep bildirir ve ikisi de bu beklenmedikliği veremez.",
            },
            {
              kind: "mcq",
              id: "en-a1-05-l4-18",
              no: 18,
              text: "Gap 18",
              options: ["send", "sent", "sends"],
              answer: 1,
              explain:
                "Cümle «Last month» ile başlıyor ve devamı «Did it come?» diye soruyor: zaman geçmiş. `send` fiilinin geçmiş biçimi düzensizdir: `sent`. Öteki iki şık geniş zamandır.",
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
          id: "en-a1-05-h1",
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
              situation: "İstasyonda anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "Attention please. The train to the city at ten fifteen leaves from platform four today, not from platform two. The train at ten forty-five is not running." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Phone message",
              genreTr: "Telefon iletisi",
              situation: "Bilet gişesi ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello, this is the ticket office. Your ticket for Monday is here. We are open until eight in the evening. Please bring your card." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "At the bus stop",
              genreTr: "Otobüs durağında",
              situation: "Bir yolcu durakta soru soruyor.",
              plays: 2,
              segments: [
                { text: "Is this the bus to the hospital?" },
                { text: "No, this is number nine. You need number twelve." },
                { text: "When does it come?" },
                { text: "In ten minutes, from the other side of the street." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Voice message",
              genreTr: "Sesli ileti",
              situation: "Bir arkadaş ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hi, it is Zara. My bus is late. I come at half past six, not at six. Do not wait outside, it is cold." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Announcement",
              genreTr: "Anons",
              situation: "Otobüste anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "Next stop: Green Park. Please push the button before your stop. The bus does not go to the station today. Get out at Green Park and take bus three." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "At the machine",
              genreTr: "Makinenin başında",
              situation: "İki kişi bilet makinesinin başında konuşuyor.",
              plays: 2,
              segments: [
                { text: "The machine does not take my card." },
                { text: "Try the other machine, next to the door." },
                { text: "And if it does not work?" },
                { text: "Then go to the shop. They sell tickets too." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-05-h1-1",
              no: 1,
              ref: "a1",
              text: "Which platform is the ten fifteen train?",
              options: ["Platform two", "Platform twelve", "Platform four"],
              answer: 2,
              explain:
                "Anons değişikliği veriyor: «leaves from platform four today, not from platform two». İki peron numarası da kayıtta geçiyor; doğru olan yeni olan. On iki hiç geçmiyor, `two` ile karıştırılabilecek bir sayı.",
            },
            {
              kind: "mcq",
              id: "en-a1-05-h1-2",
              no: 2,
              ref: "a2",
              text: "What must the person bring?",
              options: ["A card", "Money", "A photo"],
              answer: 0,
              explain:
                "İleti tek bir şey istiyor: «Please bring your card». Para ve fotoğraf kayıtta hiç geçmiyor; sekiz ise kapanış saati.",
            },
            {
              kind: "mcq",
              id: "en-a1-05-h1-3",
              no: 3,
              ref: "a3",
              text: "Which bus goes to the hospital?",
              options: ["The number nine bus", "Number twelve", "Number ten"],
              answer: 1,
              explain:
                "Cevap açık: «this is number nine. You need number twelve». On sayısı ise dakika, otobüs numarası değil.",
            },
            {
              kind: "mcq",
              id: "en-a1-05-h1-4",
              no: 4,
              ref: "a4",
              text: "When does Zara come?",
              options: ["At six", "At six in the morning", "At half past six"],
              answer: 2,
              explain:
                "Zara düzeltmeyi kendisi yapıyor: «I come at half past six, not at six». Altı, iptal edilen eski saat.",
            },
            {
              kind: "mcq",
              id: "en-a1-05-h1-5",
              no: 5,
              ref: "a5",
              text: "What must people do to go to the station?",
              options: ["Stay in the bus until the station", "Take another bus at Green Park", "Walk from the park"],
              answer: 1,
              explain:
                "Anons iki adım veriyor: «Get out at Green Park and take bus three». Otobüs bugün istasyona gitmiyor, yani içeride kalmak işe yaramaz.",
            },
            {
              kind: "mcq",
              id: "en-a1-05-h1-6",
              no: 6,
              ref: "a6",
              text: "What does the second person say first?",
              options: ["Use the other machine", "Go to the shop and ask", "Call for help"],
              answer: 0,
              explain:
                "İlk öneri makineyle ilgili: «Try the other machine, next to the door». Dükkân ikinci seçenek olarak, ancak o da işe yaramazsa söyleniyor.",
            },
          ],
        },
        {
          id: "en-a1-05-h2",
          no: 2,
          format: "truefalse",
          goal: "instruction",
          prompt: "You hear an announcement at a station. Are sentences 7 to 10 true or false? You hear the announcement twice.",
          promptTr: "Bir istasyon anonsu dinleyeceksin. 7–10. cümleler doğru mu yanlış mı? Anonsu iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Announcement",
              genreTr: "Anons",
              situation: "Hafta sonu çalışması duyuruluyor.",
              plays: 2,
              segments: [
                { text: "Good morning. This weekend there are no trains between the city and the airport. Buses go from the front of the station every twenty minutes. The buses are free with a train ticket. The first bus is at five in the morning and the last bus is at midnight." },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-05-h2-7",
              no: 7,
              ref: "b1",
              text: "There are no trains to the airport this weekend.",
              answer: true,
              explain:
                "Anonsun ilk cümlesi bunu söylüyor: «This weekend there are no trains between the city and the airport». Yerine otobüs konuyor.",
            },
            {
              kind: "bool",
              id: "en-a1-05-h2-8",
              no: 8,
              ref: "b1",
              text: "The buses go from behind the station.",
              answer: false,
              explain:
                "Anons yeri veriyor: «Buses go from the front of the station». Ön taraf ile arka taraf ayrı yerler; kaydı dinlerken yön sözcüğüne dikkat gerekiyor.",
            },
            {
              kind: "bool",
              id: "en-a1-05-h2-9",
              no: 9,
              ref: "b1",
              text: "You pay for the bus if you have a train ticket.",
              answer: false,
              explain:
                "Anons tam tersini söylüyor: «The buses are free with a train ticket». Tren bileti olan kişi otobüse ayrıca ödemiyor.",
            },
            {
              kind: "bool",
              id: "en-a1-05-h2-10",
              no: 10,
              ref: "b1",
              text: "The first bus goes at five in the morning.",
              answer: true,
              explain:
                "Anons iki saati birlikte veriyor: «The first bus is at five in the morning and the last bus is at midnight». Beş, ilk otobüsün saati.",
            },
          ],
        },
        {
          id: "en-a1-05-h3",
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
              situation: "Bir otel misafirine ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello Mr Idris, your room is ready from two in the afternoon. You can leave your bags with us before that. Breakfast is from seven to ten." },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "At the ticket office",
              genreTr: "Bilet gişesinde",
              situation: "Bir yolcu bilet alıyor.",
              plays: 2,
              segments: [
                { text: "Two tickets to Derby, please." },
                { text: "Today or tomorrow?" },
                { text: "Today, at four." },
                { text: "That is sixteen euros." },
                { text: "Here is twenty." },
                { text: "And four back. Thank you." },
              ],
            },
            {
              kind: "audio",
              id: "c3",
              genre: "Announcement",
              genreTr: "Anons",
              situation: "Havaalanında anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "Passengers for the eleven o'clock flight: your gate is now gate twelve, not gate eight. The flight leaves on time." },
              ],
            },
            {
              kind: "audio",
              id: "c4",
              genre: "Voice message",
              genreTr: "Sesli ileti",
              situation: "Bir kişi istasyondan ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hi Alma, I am at the station. The train from the city is thirty minutes late. I wait here and I read. Do not come early." },
              ],
            },
            {
              kind: "audio",
              id: "c5",
              genre: "In a taxi",
              genreTr: "Takside",
              situation: "Bir yolcu taksiye biniyor.",
              plays: 2,
              segments: [
                { text: "To the airport, please." },
                { text: "Which one?" },
                { text: "The small one, in the north." },
                { text: "Twenty-five minutes at this time." },
                { text: "Good. My plane is at nine." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-05-h3-11",
              no: 11,
              ref: "c1",
              text: "When can Mr Idris go to his room?",
              options: ["At seven", "At two", "At ten"],
              answer: 1,
              explain:
                "İleti «your room is ready from two in the afternoon» diyor. Yedi ve on kahvaltı saatleri; üç sayı da geçiyor ve hangisinin oda saati olduğunu ayırmak gerekiyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-05-h3-12",
              no: 12,
              ref: "c2",
              text: "How much are the two tickets?",
              options: ["Four euros", "Twenty euros", "Sixteen euros"],
              answer: 2,
              explain:
                "Görevli fiyatı söylüyor: «That is sixteen euros». Yirmi, yolcunun verdiği para; dört ise geri alınan üstü.",
            },
            {
              kind: "mcq",
              id: "en-a1-05-h3-13",
              no: 13,
              ref: "c3",
              text: "What has changed?",
              options: ["The gate", "The time", "The day"],
              answer: 0,
              explain:
                "Anons kapıyı değiştiriyor: «your gate is now gate twelve, not gate eight». Saat için ise «The flight leaves on time» deniyor, yani değişen o değil.",
            },
            {
              kind: "mcq",
              id: "en-a1-05-h3-14",
              no: 14,
              ref: "c4",
              text: "Why does the person wait?",
              options: ["The station is closed", "The train is late", "The bus does not come"],
              answer: 1,
              explain:
                "İleti gerekçeyi veriyor: «The train from the city is thirty minutes late». İstasyon açık, çünkü konuşan kişi içeride okuyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-05-h3-15",
              no: 15,
              ref: "c5",
              text: "How long is the drive to the airport?",
              options: ["Nine minutes", "Twenty minutes", "Twenty-five minutes"],
              answer: 2,
              explain:
                "Şoför süreyi veriyor: «Twenty-five minutes at this time». Dokuz, uçağın saati; iki sayıyı karıştıran öğrenci uçuş saatini süre sanır.",
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
          id: "en-a1-05-w1",
          no: 1,
          format: "gap",
          goal: "detail",
          prompt:
            "Your friend Mila Rossi books a bus ticket. She travels on Sunday from York to Bristol. She has two bags. Her phone number is 07700 900 118. Five things are missing on the form. Write them in the gaps.",
          promptTr:
            "Arkadaşın Mila Rossi otobüs bileti alıyor. Pazar günü York'tan Bristol'e gidiyor. İki çantası var. Telefonu 07700 900 118. Formda beş bilgi eksik; boşluklara yaz.",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Form",
              genreTr: "Form",
              title: "BUS TICKET — BOOKING",
              body: `Family name:      Rossi
First name:       {{1}}
Day of travel:    {{2}}
From:             {{3}}
To:               Bristol
Number of bags:   {{4}}
Phone:            {{5}}`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a1-05-w1-1",
              no: 1,
              text: "First name",
              accept: ["Mila"],
              explain:
                "Yönergede tam ad «Mila Rossi» olarak geçiyor. Soyadı formda zaten basılı, bu yüzden boşluğa yalnız ilk ad yazılır.",
            },
            {
              kind: "gap",
              id: "en-a1-05-w1-2",
              no: 2,
              text: "Day of travel",
              accept: ["Sunday", "on Sunday"],
              explain:
                "Yönerge «She travels on Sunday» diyor. Gün adları büyük harfle yazılır, ama karşılaştırma büyük-küçük harfe bakmıyor.",
            },
            {
              kind: "gap",
              id: "en-a1-05-w1-3",
              no: 3,
              text: "From",
              accept: ["York"],
              explain:
                "Yolculuk «from York to Bristol». Varış yeri formda zaten basılı, bu yüzden boşluğa kalkış şehri yazılır; iki alanı karıştıran öğrenci Bristol'ü tekrarlar.",
            },
            {
              kind: "gap",
              id: "en-a1-05-w1-4",
              no: 4,
              text: "Number of bags",
              accept: ["2", "two", "two bags"],
              explain:
                "Yönerge «She has two bags» diyor. Rakam da yazı da kabul edilir, çünkü ölçülen şey imla değil bilgiyi doğru alana taşımak.",
            },
            {
              kind: "gap",
              id: "en-a1-05-w1-5",
              no: 5,
              text: "Phone",
              accept: ["07700 900 118", "07700900118"],
              explain:
                "Telefon numarası yönergede «07700 900 118» olarak veriliyor. Boşluklu ve boşluksuz yazım kabul edilir; baştaki sıfır düşürülmemeli.",
            },
          ],
        },
        {
          id: "en-a1-05-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "Your train is late and you come two hours later. Write a short message to your friend. Write one or two sentences about each point (about 25 words). Do not forget the greeting at the start and at the end.",
          promptTr:
            "Trenin gecikti ve iki saat sonra varacaksın. Arkadaşına kısa bir ileti yaz. Her maddeye bir-iki cümle yaz (yaklaşık 25 kelime). Baştaki hitabı ve sondaki veda cümlesini unutma.",
          items: [],
          rubric: {
            minWords: 25,
            points: [
              { de: "Say why you are late.", tr: "Neden geciktiğini söyle." },
              { de: "Say when you arrive.", tr: "Ne zaman varacağını söyle." },
              { de: "Say what your friend should do.", tr: "Arkadaşının ne yapmasını istediğini söyle." },
            ],
            sample: `Hi Timo,

My train is two hours late. I am very sorry!

I come at nine in the evening, not at seven. Please do not wait at the station. I take a taxi to your house.

See you later!
Alma`,
            criteria: [
              "Üç içerik noktasının üçü de var mı? Biri eksikse metin tam sayılmaz.",
              "Saat açıkça verildi mi?",
              "Arkadaştan istenen şey açık mı? (do not wait / come at nine)",
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
      instruction: "This part has three tasks: you talk about your journeys, you ask and answer questions about travel, and you act at a ticket office.",
      instructionTr: "Bu bölümde üç görev var: yolculuklarını anlatma, yolculuk üzerine soru sorup cevaplama ve bilet gişesinde rol yapma.",
      tasks: [
        {
          id: "en-a1-05-s1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt: "Talk about how you travel. Speak about these words: to work or school — bus or car — the price — a long journey — a city you like — something you do not like.",
          promptTr: "Nasıl yolculuk ettiğini anlat. Şu sözcüklere göre konuş: işe ya da okula — otobüs ya da araba — fiyat — uzun bir yolculuk — sevdiğin bir şehir — sevmediğin bir şey.",
          prepSeconds: 30,
          speakSeconds: 90,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "how you go to work or school", tr: "İşe ya da okula nasıl gidiyorsun" },
              { de: "bus, car or train, and the price", tr: "Otobüs, araba ya da tren ve fiyat" },
              { de: "a long journey and a city you like", tr: "Uzun bir yolculuk ve sevdiğin bir şehir" },
              { de: "one thing you do not like", tr: "Sevmediğin bir şey" },
            ],
            sample:
              "I go to work by bus. The bus comes at half past seven and it takes twenty minutes. A ticket is two euros. Last summer I go to Rome by train. It is a long journey, ten hours, but the train is very good. I like Rome. I do not like the bus in the rain.",
            criteria: [
              "Altı sözcüğün her birine değinildi mi?",
              "Saat, süre ve fiyat söylenebiliyor mu?",
              "Ulaşım edatları doğru mu? (by bus, on foot)",
              "Anlaşılır bir tempoda mı konuşuldu?",
            ],
          },
        },
        {
          id: "en-a1-05-s2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Topic: travel and free time. Make a question for each word and answer my questions: train — holiday — car — city — money.",
          promptTr:
            "Konu: yolculuk ve boş zaman. Her sözcük için bir soru kur ve benim sorularımı cevapla: tren — tatil — araba — şehir — para.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "Now we talk about travel. Your first word is: train. Please ask me a question.", tr: "Şimdi yolculuğu konuşuyoruz. İlk sözcüğün: tren. Bana bir soru sor." },
            { who: "you", hint: "«train» sözcüğüyle bir soru kur.", expect: "train sözcüğüyle dilbilgisel olarak doğru bir soru kurmak", seconds: 25 },
            { who: "partner", de: "I take the train to work every day. Your next word is: holiday.", tr: "Her gün işe trenle gidiyorum. Sıradaki sözcüğün: tatil." },
            { who: "you", hint: "«holiday» için bir soru kur.", expect: "holiday sözcüğüyle bir soru kurmak", seconds: 25 },
            { who: "partner", de: "In August I go to the sea. Now a question for you: how do you go to the city centre?", tr: "Ağustosta denize gidiyorum. Şimdi sana bir soru: Şehir merkezine nasıl gidersin?" },
            { who: "you", hint: "Ulaşım biçimini söyleyerek cevapla.", expect: "ulaşım biçimini tam bir cümleyle söylemek", seconds: 25 },
            { who: "partner", de: "Thank you. Last question: how much is a bus ticket where you live?", tr: "Teşekkürler. Son soru: Yaşadığın yerde otobüs bileti kaç para?" },
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
              "Do you like the train? — Yes, I read there. Where do you go on holiday? — To the sea. Have you got a car? — No, I have a bike. How do you go to the centre? — By bus, it takes fifteen minutes. How much is a ticket? — Two euros fifty.",
            criteria: [
              "Beş sözcüğün her biri için bir soru kuruldu mu?",
              "Sorular doğru kuruldu mu? (Do you … / Where … / How much …)",
              "Cevaplar soruya uygun mu?",
              "Fiyat ve süre söylenebiliyor mu?",
            ],
          },
        },
        {
          id: "en-a1-05-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "You are at a ticket office. Situations: you buy a ticket. — You ask about the time. — You ask for help with a bag.",
          promptTr:
            "Bilet gişesindesin. Durumlar: Bilet al. — Saati sor. — Çanta için yardım iste.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good morning. How can I help you?", tr: "Günaydın. Nasıl yardımcı olabilirim?" },
            { who: "you", hint: "Bir bilet iste; nereye ve ne zaman olduğunu söyle.", expect: "bir bilet istemek, yer ve zaman bildirmek", seconds: 25 },
            { who: "partner", de: "That is fourteen euros. The train leaves from platform two.", tr: "On dört euro. Tren iki numaralı perondan kalkıyor." },
            { who: "you", hint: "Trenin saatini sor.", expect: "kalkış saatini sormak", seconds: 25 },
            { who: "partner", de: "At ten past eleven. Anything else?", tr: "On biri on geçe. Başka bir şey var mı?" },
            { who: "you", hint: "Ağır çantan için kibarca yardım iste.", expect: "kibarca yardım istemek", seconds: 25 },
          ],
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "buy a ticket", tr: "Bilet almak" },
              { de: "ask about the time", tr: "Saati sormak" },
              { de: "ask for help politely", tr: "Kibarca yardım istemek" },
            ],
            sample:
              "A ticket to Bristol, please. Today, at eleven. — When does the train leave? — Can you help me with my bag, please? It is very heavy.",
            criteria: [
              "Bilet isteği açık mı? (yer ve gün/saat verildi mi)",
              "Saat sorusu doğru kuruldu mu? (When does … leave?)",
              "Yardım isteği kibar bir kalıpla mı kuruldu? (Can you … please)",
              "Sayılar (fiyat, peron, saat) anlaşıldı mı?",
            ],
          },
        },
      ],
    },
  ],
};
