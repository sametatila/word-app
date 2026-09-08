import type { MockPaper } from "../types";

/**
 * A2 · Deneme 2 — "Travel and Shopping".
 *
 * Deneme 1 ile AYNI PLAN; konu ayrı. Birincisi sağlık ve boş zamanı, bu
 * ikincisi yolculuk ve alışverişi konu alıyor — A2'nin iki klasik alanı,
 * çünkü ikisi de sayı, saat, fiyat ve karşılaştırma taşıyor.
 *
 * A2 SINIRI: past simple, present continuous, `going to` / `will`,
 * karşılaştırma dereceleri, `because / when / if / but / so`. Üçüncü tip
 * koşul, ortaç öbeği ve devrik yapı yok.
 */
export const EN_A2_02: MockPaper = {
  id: "en-a2-02",
  course: "en",
  level: "A2",
  no: 2,
  theme: "Travel and Shopping",
  themeTr: "Yolculuk ve alışveriş",
  minutes: 110,
  parts: [
    /* ── READING ───────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 35,
      instruction:
        "This part has five tasks. You read short texts, adverts and a longer article, and you complete two short texts. Choose the correct answer for each question.",
      instructionTr:
        "Bu bölümde beş görev var. Kısa metinler, ilanlar ve daha uzun bir yazı okuyacak, sonra iki kısa metni tamamlayacaksın. Her soruda doğru cevabı işaretle.",
      tasks: [
        {
          id: "en-a2-02-l1",
          no: 1,
          format: "mcq",
          goal: "gist",
          prompt: "Read the five short texts and questions 1 to 5. What is the main message? Choose a, b or c.",
          promptTr: "Beş kısa metni ve 1–5. maddeleri oku. Ana mesaj nedir? a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "m1",
              genre: "Message",
              genreTr: "İleti",
              title: "From Julia",
              body: `Hi, our flight is fine but the airport bus does not run tonight. We will take a taxi and pay it ourselves. Please do not wait outside in the cold.`,
            },
            {
              kind: "text",
              id: "m2",
              genre: "Notice in a shop",
              genreTr: "Mağaza duyurusu",
              title: "Winter sale",
              body: `Coats and boots are thirty per cent cheaper this week. Sale items cannot go back to the shop, but you can change the size once.`,
            },
            {
              kind: "text",
              id: "m3",
              genre: "Email",
              genreTr: "E-posta",
              title: "Your order",
              body: `Dear customer, your lamp left our warehouse today. It will arrive between Tuesday and Thursday. Somebody must be at home, because the box is big.`,
            },
            {
              kind: "text",
              id: "m4",
              genre: "Note for a guest",
              genreTr: "Misafir için not",
              title: "Welcome!",
              body: `The keys are with the neighbour in flat 12. She works until six, so come after that. Do not ring my bell: I am away until Sunday.`,
            },
            {
              kind: "text",
              id: "m5",
              genre: "Message to a group",
              genreTr: "Gruba ileti",
              title: "Train tickets",
              body: `I looked at the prices again. If we book before Friday, the tickets are much cheaper. After Friday the price goes up. Send me your names today.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-02-l1-1",
              no: 1,
              ref: "m1",
              text: "What does Julia want the reader to do?",
              options: ["Book a taxi for them", "Come to the airport by bus", "Stay inside and not wait"],
              answer: 2,
              explain:
                "İletinin son cümlesi tek isteği taşıyor: «Please do not wait outside in the cold». Taksiyi kendileri tutup kendileri ödüyorlar, yani okuyucudan taksi istenmiyor; otobüs de bu akşam çalışmıyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-02-l1-2",
              no: 2,
              ref: "m2",
              text: "What can you do with a sale item?",
              options: ["Get a different size once", "Bring it back for your money", "Buy two and pay for one"],
              answer: 0,
              explain:
                "Duyuru iki kuralı yan yana koyuyor: «Sale items cannot go back to the shop», ama «you can change the size once». İkinci şık tam yasaklanan şeyi öneriyor; üçüncüsü metinde hiç geçmeyen bir kampanya.",
            },
            {
              kind: "mcq",
              id: "en-a2-02-l1-3",
              no: 3,
              ref: "m3",
              text: "Why must somebody be at home?",
              options: ["Because the shop needs a signature", "Because the package is large", "Because the driver comes very early"],
              answer: 1,
              explain:
                "Sebep cümlenin içinde veriliyor: «because the box is big». İmza ya da erken saat e-postada hiç geçmiyor; teslim aralığı salı ile perşembe arası olarak veriliyor ama saat söylenmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-02-l1-4",
              no: 4,
              ref: "m4",
              text: "When can the guest get the keys?",
              options: ["After six in the evening", "Before six in the evening", "On Sunday only"],
              answer: 0,
              explain:
                "Komşu altıya kadar çalışıyor ve not «so come after that» diyor: altıdan sonra. Pazar günü not yazanın döndüğü gün, anahtar günü değil.",
            },
            {
              kind: "mcq",
              id: "en-a2-02-l1-5",
              no: 5,
              ref: "m5",
              text: "Why does the writer want the names today?",
              options: ["Because the train is full on Friday", "Because the group is too big", "Because the tickets get more expensive later"],
              answer: 2,
              explain:
                "İleti koşulu kuruyor: cumadan önce alınırsa daha ucuz, sonra «the price goes up». Aciliyetin sebebi fiyat. Trenin dolması ya da grubun büyüklüğü metinde hiç geçmiyor.",
            },
          ],
        },
        {
          id: "en-a2-02-l2",
          no: 2,
          format: "match",
          goal: "orientation",
          prompt:
            "Read about five people, 6 to 10. Then read the eight adverts a to h. Which advert is right for each person? You use each advert once only.",
          promptTr:
            "6–10. maddelerdeki beş kişiyi oku. Sonra a'dan h'ye sekiz ilanı oku. Her kişiye hangi ilan uyar? Her ilan en fazla bir kez kullanılır.",
          options: [
            { key: "a", label: "Night Coach", body: "Leaves at eleven in the evening and arrives at six in the morning. You sleep on the way and you save one hotel night. 24 pounds." },
            { key: "b", label: "City Bikes", body: "Take a bike at any station and leave it at another one. The first thirty minutes are free. You need a card and an app." },
            { key: "c", label: "Green Market", body: "Every Saturday from seven to one, in the old square. Vegetables from farms near the town. Bring your own bag: we have no plastic ones." },
            { key: "d", label: "Second Hand Books", body: "Thousands of used books, all under three pounds. Open Tuesday to Saturday. We also buy your old books, but only in good condition." },
            { key: "e", label: "Airport Shuttle", body: "Every twenty minutes, day and night. Thirty-five minutes to the terminal. Big cases are free. Buy your ticket from the driver." },
            { key: "f", label: "Repair Café", body: "Bring a broken lamp, radio or bag on the first Sunday of the month. Our helpers repair it with you. Free, but please give what you can." },
            { key: "g", label: "Museum Card", body: "One card, twelve museums, one year. 45 pounds for adults, free for children. The card also gives you ten per cent in the museum shops." },
            { key: "h", label: "Late Supermarket", body: "Open until midnight every day, also on Sunday. Fresh bread arrives at eight in the evening. Small shop, low prices, no car park." },
          ],
          items: [
            {
              kind: "match",
              id: "en-a2-02-l2-6",
              no: 6,
              text: "Ravi finishes work at half past ten and often has nothing to eat at home.",
              answer: "h",
              explain:
                "İlan «Open until midnight every day» diyor; Ravi'nin işi 22.30'da bitiyor, yani yetişiyor. Pazar günleri de açık. Green Market yalnız cumartesi sabahı, ona uymaz.",
            },
            {
              kind: "match",
              id: "en-a2-02-l2-7",
              no: 7,
              text: "Ela travels alone and wants to spend as little money as possible on the journey and the hotel.",
              answer: "a",
              explain:
                "İlan iki tasarrufu birden veriyor: 24 pound yol ve «you save one hotel night». Ela hem yol hem konaklama harcamasını düşürmek istiyor; havaalanı servisi yalnız yol, otel gecesini kurtarmıyor.",
            },
            {
              kind: "match",
              id: "en-a2-02-l2-8",
              no: 8,
              text: "Ben's radio does not work and he does not want to buy a new one.",
              answer: "f",
              explain:
                "İlan tam bu nesneyi sayıyor: «Bring a broken lamp, radio or bag». Yeni almak istemiyor, tamir ettirmek istiyor; ikinci el kitapçı kitap alıp satıyor, elektronik tamir etmiyor.",
            },
            {
              kind: "match",
              id: "en-a2-02-l2-9",
              no: 9,
              text: "The Nowak family visit a lot of exhibitions and they have two small children.",
              answer: "g",
              explain:
                "Kart on iki müzeyi kapsıyor ve «free for children» diyor; iki küçük çocuk için ücret yok. Aile çok sergi gezdiği için yıllık kart mantıklı; öteki ilanların hiçbiri müzeyle ilgili değil.",
            },
            {
              kind: "match",
              id: "en-a2-02-l2-10",
              no: 10,
              text: "Sofia has short journeys in the city centre and does not want to pay for parking.",
              answer: "b",
              explain:
                "İlan kısa yolculuk için kurulmuş: «The first thirty minutes are free» ve bisiklet başka istasyona bırakılabiliyor. Park sorunu bisikletle ortadan kalkıyor; geç açık market ilanında da park yok ama o bir ulaşım seçeneği değil.",
            },
          ],
        },
        {
          id: "en-a2-02-l3",
          no: 3,
          format: "mcq",
          goal: "detail",
          prompt: "Read the article and questions 11 to 14. Choose a, b or c.",
          promptTr: "Yazıyı ve 11–14. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t3",
              genre: "Magazine article",
              genreTr: "Dergi yazısı",
              title: "One suitcase for three weeks",
              body: `Last spring I travelled for three weeks with one small suitcase. My friends said it was impossible. They were wrong, and here is what I learned.

First, I took four shirts and two trousers. That sounds too little, but every hostel had a washing machine. I washed my clothes on Sunday evening and everything was dry on Monday morning.

Second, I left my big camera at home. My phone took better pictures than my old camera, and it was much lighter in my bag.

The only mistake was shoes. I took three pairs, and I wore one pair for nineteen days. Two pairs travelled for three weeks and never left the suitcase.

Now I have a rule for every journey. I put everything on the bed, and then I take half of it away again. It is hard the first time, but after that it becomes normal.`,
              gloss: [
                { de: "a suitcase", tr: "bavul", en: "suitcase" },
                { de: "a hostel", tr: "hostel", en: "hostel" },
                { de: "a pair", tr: "çift", en: "pair" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-02-l3-11",
              no: 11,
              text: "Why were four shirts enough?",
              options: ["Because the weather was warm", "Because she could wash them on the way", "Because she bought new clothes on the journey"],
              answer: 1,
              explain:
                "Metin sebebi hemen veriyor: «every hostel had a washing machine» ve pazar akşamı yıkananlar pazartesi sabahı kuru oluyor. Hava ya da yeni kıyafet almak yazıda hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-02-l3-12",
              no: 12,
              text: "What does the writer say about her phone?",
              options: ["It was heavier than the camera", "It was cheaper than the camera", "It made better photographs than the camera"],
              answer: 2,
              explain:
                "Karşılaştırma metinde açık: «My phone took better pictures than my old camera» ve ayrıca daha hafifti. Birinci şık ağırlık karşılaştırmasını ters çeviriyor; fiyattan hiç söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-02-l3-13",
              no: 13,
              text: "What went wrong on the journey?",
              options: ["She packed too many shoes", "She lost one of her bags", "She had no washing machine"],
              answer: 0,
              explain:
                "Metin tek hatayı adlandırıyor: «The only mistake was shoes». Üç çift alınmış, biri on dokuz gün giyilmiş, iki çift hiç çıkmamış. Kayıp çanta ya da makine yokluğu yazıda geçmiyor; tersine her hostelde makine varmış.",
            },
            {
              kind: "mcq",
              id: "en-a2-02-l3-14",
              no: 14,
              text: "What is the writer's rule now?",
              options: ["To buy a smaller suitcase every year", "To leave half of the things at home", "To pack the evening before the journey"],
              answer: 1,
              explain:
                "Son paragraf kuralı veriyor: «I put everything on the bed, and then I take half of it away again». Küçük bavul almak ya da bir akşam önce toplanmak metinde hiç geçmiyor; bavul zaten küçük.",
            },
          ],
        },
        {
          id: "en-a2-02-l4",
          no: 4,
          format: "gapMcq",
          goal: "structure",
          prompt: "Read the text and complete gaps 15 to 19. Which word fits: a, b or c?",
          promptTr: "Metni oku ve 15–19. boşlukları tamamla. Hangi sözcük uyar: a, b ya da c?",
          texts: [
            {
              kind: "text",
              id: "t4",
              genre: "Travel leaflet",
              genreTr: "Seyahat broşürü",
              title: "Before you fly",
              body: `Airports are busy places, so it is a good idea to {{15}} early.

Check your bag at home. Liquids must be in small bottles, and the total {{16}} not be more than one litre.

Put your passport in the same pocket every time. People {{17}} lose it in the queue, not at home.

Trains to the airport are often {{18}} than taxis, and they are cheaper too. Look at the timetable the night before.

And finally: {{19}} you have a long wait, take a book. Your phone battery is shorter than the day.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-02-l4-15",
              no: 15,
              text: "Gap 15",
              options: ["arrive", "arriving", "arrived"],
              answer: 0,
              explain:
                "Kalıp `it is a good idea to + yalın fiil`. `to` mastar ekidir ve arkasından yalın biçim gelir. `arriving` ile `arrived` bu yapıda kullanılmaz.",
            },
            {
              kind: "mcq",
              id: "en-a2-02-l4-16",
              no: 16,
              text: "Gap 16",
              options: ["can", "should", "must"],
              answer: 2,
              explain:
                "Cümle bir kuralı bildiriyor ve olumsuzu zorunluluğun yasaklanması: bir litreyi geçemez. `must not` bu kesin yasağı verir. `can not` yalnız imkânsızlığı, `should not` ise tavsiyeyi bildirir; havaalanı kuralı tavsiye değildir.",
            },
            {
              kind: "mcq",
              id: "en-a2-02-l4-17",
              no: 17,
              text: "Gap 17",
              options: ["are usually", "usually", "usual"],
              answer: 1,
              explain:
                "Sıklık zarfı geniş zamanda ana fiilden ÖNCE gelir: «People usually lose it». `are usually` bir yardımcı fiil ekler ve `lose` ile birlikte kullanılamaz; `usual` sıfattır, fiili niteleyemez.",
            },
            {
              kind: "mcq",
              id: "en-a2-02-l4-18",
              no: 18,
              text: "Gap 18",
              options: ["fast", "the fastest", "faster"],
              answer: 2,
              explain:
                "Boşluğun ardında `than` var; `than` karşılaştırma derecesi ister: `faster`. Yalın biçim `fast` ile `than` kullanılmaz, `the fastest` ise en üstünlük derecesidir.",
            },
            {
              kind: "mcq",
              id: "en-a2-02-l4-19",
              no: 19,
              text: "Gap 19",
              options: ["if", "so", "because"],
              answer: 0,
              explain:
                "Cümle bir koşul kuruyor: uzun bir bekleme olursa kitap al. `if` bunu verir. `so` sonuç, `because` sebep bildirir ve ikisi de tavsiyeyi koşula bağlamaz.",
            },
          ],
        },
        {
          id: "en-a2-02-l5",
          no: 5,
          format: "gap",
          goal: "structure",
          prompt: "Read the review and complete gaps 20 to 24. Write ONE word in each gap.",
          promptTr: "Değerlendirmeyi oku ve 20–24. boşlukları tamamla. Her boşluğa TEK bir sözcük yaz.",
          texts: [
            {
              kind: "text",
              id: "t5",
              genre: "Online review",
              genreTr: "İnternet değerlendirmesi",
              title: "Hotel Marina — three nights",
              body: `We stayed {{20}} this hotel for three nights in June.

The room was small but very clean, and the bed was more comfortable {{21}} the bed at home.

Breakfast is included {{22}} the price. There is fruit, bread and eggs, but no hot food.

The hotel is only ten minutes {{23}} foot from the station, so we did not need a taxi.

We will come back next year {{24}} the weather is good.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a2-02-l5-20",
              no: 20,
              text: "Gap 20",
              accept: ["at", "in"],
              explain:
                "`stay at a hotel` ya da `stay in a hotel` — ikisi de doğal ve yaygın. `on` bu adla kullanılmaz. A2'de konaklama fiilinin edatı ölçülen eşdizimlerden biri.",
            },
            {
              kind: "gap",
              id: "en-a2-02-l5-21",
              no: 21,
              text: "Gap 21",
              accept: ["than"],
              explain:
                "Cümlede `more comfortable` var, yani karşılaştırma başlamış; karşılaştırmanın ikinci öğesi `than` ile bağlanır. `as` yalnız `as … as` yapısında gelir ve orada `more` kullanılmaz.",
            },
            {
              kind: "gap",
              id: "en-a2-02-l5-22",
              no: 22,
              text: "Gap 22",
              accept: ["in"],
              explain:
                "`included in the price` sabit bir eşdizim. `included with` ya da `included at` doğal değildir; kahvaltının fiyata dahil olduğunu söylemenin kalıbı budur.",
            },
            {
              kind: "gap",
              id: "en-a2-02-l5-23",
              no: 23,
              text: "Gap 23",
              accept: ["on"],
              explain:
                "`on foot` sabit bir kalıp: yürüyerek. Cümlede mesafe süreyle veriliyor («ten minutes ___ foot»). `by foot` yaygın bir hatadır; İngilizcede `by` taşıtla kullanılır (by bus, by train).",
            },
            {
              kind: "gap",
              id: "en-a2-02-l5-24",
              no: 24,
              text: "Gap 24",
              accept: ["if"],
              explain:
                "Son cümle geri dönüşü bir koşula bağlıyor: hava iyi olursa. `if` bunu verir. `because` sebep bildirir ve gelecekteki bir koşulu kuramaz, `when` ise havanın iyi olacağını kesin sayar.",
            },
          ],
        },
      ],
    },

    /* ── LISTENING ─────────────────────────────────────────────────────── */
    {
      skill: "listening",
      minutes: 30,
      instruction:
        "This part has four tasks. You hear conversations, a talk and five short speakers. You hear every recording twice.",
      instructionTr:
        "Bu bölümde dört görev var. Konuşmalar, bir sunum ve beş kısa konuşmacı dinleyeceksin. Her kaydı iki kez dinleyebilirsin.",
      tasks: [
        {
          id: "en-a2-02-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "You hear five short conversations. Which answer is right? You hear every recording twice.",
          promptTr: "Beş kısa konuşma dinleyeceksin. Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "At the ticket machine",
              genreTr: "Bilet makinesinde",
              situation: "İki yolcu bilet makinesinin önünde konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Ana", text: "The machine only takes cards. Do you have one?" },
                { speaker: "Ben", text: "My card is in the hotel. But there is a ticket office over there." },
                { speaker: "Ana", text: "Good, then we go there and pay with cash." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "In a clothes shop",
              genreTr: "Giyim mağazasında",
              situation: "Bir müşteri ceket deniyor.",
              plays: 2,
              segments: [
                { speaker: "Customer", text: "This jacket is nice, but it is a little short." },
                { speaker: "Assistant", text: "We have a longer one in grey, but not in black." },
                { speaker: "Customer", text: "Colour is not important. I will try the grey one." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "At the hotel desk",
              genreTr: "Otel resepsiyonunda",
              situation: "Bir misafir kahvaltı hakkında soru soruyor.",
              plays: 2,
              segments: [
                { speaker: "Guest", text: "What time is breakfast?" },
                { speaker: "Receptionist", text: "From seven to ten, but on Sunday it starts at eight." },
                { speaker: "Guest", text: "We leave on Sunday at nine, so that still works." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "On the phone",
              genreTr: "Telefonda",
              situation: "Bir müşteri internetten verdiği siparişi soruyor.",
              plays: 2,
              segments: [
                { speaker: "Customer", text: "I ordered a table two weeks ago and it is still not here." },
                { speaker: "Staff", text: "I am very sorry. The lorry had a problem. It will come on Thursday." },
                { speaker: "Customer", text: "Thursday is fine, but please send me a message first." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "At the airport",
              genreTr: "Havaalanında",
              situation: "İki arkadaş uçuş bilgisine bakıyor.",
              plays: 2,
              segments: [
                { speaker: "Rui", text: "Our flight is at half past four, gate 22." },
                { speaker: "Mia", text: "Look at the screen. The gate changed: now it is gate 9." },
                { speaker: "Rui", text: "Good that you looked. The time is still the same." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-02-h1-1",
              no: 1,
              ref: "a1",
              text: "How will they buy the tickets?",
              options: ["With a card at the machine over there", "With cash at the ticket office", "They will not buy tickets today"],
              answer: 1,
              explain:
                "Makine yalnız kart alıyor, Ben'in kartı otelde; Ana da «then we go there and pay with cash» diyor. Kart ve makine kayıtta geçiyor ama ikisi de eleniyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-02-h1-2",
              no: 2,
              ref: "a2",
              text: "Which jacket does the customer try?",
              options: ["The grey one", "The black one", "A shorter one in another shop"],
              answer: 0,
              explain:
                "Uzun beden yalnız gride var ve müşteri «Colour is not important. I will try the grey one» diyor. Siyah kayıtta geçiyor ama mevcut olmayan seçenek olarak.",
            },
            {
              kind: "mcq",
              id: "en-a2-02-h1-3",
              no: 3,
              ref: "a3",
              text: "Can the guests have breakfast on Sunday?",
              options: ["No, breakfast is not served on Sunday", "No, they leave too early for breakfast", "Yes, breakfast starts one hour before they leave"],
              answer: 2,
              explain:
                "Pazar kahvaltısı sekizde başlıyor, misafirler dokuzda çıkıyor: bir saat var ve misafir «that still works» diyor. Saatleri karşılaştırmak gerekiyor; yalnız «starts at eight» duyup çıkış saatini kaçıran öğrenci yanılır.",
            },
            {
              kind: "mcq",
              id: "en-a2-02-h1-4",
              no: 4,
              ref: "a4",
              text: "What does the customer ask for?",
              options: ["A message before the delivery", "A different colour for the table", "The money back for the table"],
              answer: 0,
              explain:
                "Müşteri perşembeyi kabul edip tek bir şey istiyor: «please send me a message first». Para iadesi ya da renk değişikliği kayıtta hiç geçmiyor; şikâyet var ama talep teslimat haberi.",
            },
            {
              kind: "mcq",
              id: "en-a2-02-h1-5",
              no: 5,
              ref: "a5",
              text: "What changed?",
              options: ["The time of the flight", "The gate number", "Both the time and the gate"],
              answer: 1,
              explain:
                "Mia ekrandaki değişikliği söylüyor: «The gate changed: now it is gate 9». Rui de saatin aynı kaldığını doğruluyor. Kayıtta iki kapı numarası ve bir saat var; değişen yalnız kapı.",
            },
          ],
        },
        {
          id: "en-a2-02-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear information about a city tour. Complete the notes, questions 6 to 10. Write ONE or TWO words or a number in each gap. You hear the information twice.",
          promptTr:
            "Bir şehir turu hakkında bilgi dinleyeceksin. 6–10. maddelerdeki notları tamamla. Her boşluğa BİR ya da İKİ sözcük veya bir sayı yaz. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Information",
              genreTr: "Bilgilendirme",
              situation: "Bir tur rehberi ertesi günün programını anlatıyor.",
              plays: 2,
              segments: [
                {
                  text: "Hello everyone, here is the plan for tomorrow. The bus leaves from the hotel at nine, so please have breakfast before that. Our first stop is the castle. The tour inside takes ninety minutes and the guide speaks English. After that we drive to the harbour and you have free time until three. Lunch is not included, but the fish restaurant near the water is very good and it is not expensive. Then we come back through the old town. We arrive at the hotel at about half past five. One more thing: tomorrow will be cold and windy, so bring a warm jacket.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notes",
              genreTr: "Not kâğıdı",
              title: "City tour — notes",
              body: `Bus leaves at:          {{6}} o'clock
First stop:             the {{7}}
Tour inside takes:      {{8}} minutes
Free time until:        {{9}} o'clock
Bring:                  a warm {{10}}`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a2-02-h2-6",
              no: 6,
              ref: "b1",
              text: "Gap 6",
              accept: ["9", "nine"],
              explain:
                "Rehber «The bus leaves from the hotel at nine» diyor. Kayıtta başka saatler de var (üç, beş buçuk) ama onlar serbest zamanın bitişi ve dönüş saati; hangi sayının kalkış olduğunu ayırmak gerekiyor.",
            },
            {
              kind: "gap",
              id: "en-a2-02-h2-7",
              no: 7,
              ref: "b1",
              text: "Gap 7",
              accept: ["castle"],
              explain:
                "«Our first stop is the castle» — ilk durak kale. Kayıtta liman ve eski şehir de geçiyor ama ikisi de sonraki duraklar; not kâğıdı ilkini soruyor.",
            },
            {
              kind: "gap",
              id: "en-a2-02-h2-8",
              no: 8,
              ref: "b1",
              text: "Gap 8",
              accept: ["90", "ninety"],
              explain:
                "İçerideki tur «takes ninety minutes» sürüyor. Not kâğıdında `minutes` basılı olduğu için boşluğa yalnız sayı yazılır; rakam da yazı da kabul edilir.",
            },
            {
              kind: "gap",
              id: "en-a2-02-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["3", "three"],
              explain:
                "Limanda «you have free time until three» — serbest zaman üçe kadar. Beş buçuk otele dönüş saati; iki saati karıştıran öğrenci dönüşü yazar.",
            },
            {
              kind: "gap",
              id: "en-a2-02-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["jacket", "coat"],
              explain:
                "Son cümle uyarıyı taşıyor: hava soğuk ve rüzgârlı olacak, «bring a warm jacket». Not kâğıdında `a warm` basılı olduğu için boşluğa yalnız nesne yazılır.",
            },
          ],
        },
        {
          id: "en-a2-02-h3",
          no: 3,
          format: "mcq",
          goal: "gist",
          prompt: "You hear five short speakers. What is each person doing? You hear every recording twice.",
          promptTr: "Beş kısa konuşmacı dinleyeceksin. Her kişi ne yapıyor? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "In a shop",
              genreTr: "Mağazada",
              situation: "Bir müşteri satış görevlisiyle konuşuyor.",
              plays: 2,
              segments: [
                { text: "I know the sale finished yesterday, but I was ill and I could not come. Is there any chance of the sale price today?" },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "Announcement",
              genreTr: "Anons",
              situation: "Bir mağazada anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "A small brown dog is waiting at the information desk. If the dog is yours, please come to the ground floor now." },
              ],
            },
            {
              kind: "audio",
              id: "c3",
              genre: "Voicemail",
              genreTr: "Telesekreter iletisi",
              situation: "Bir kişi bir kuruma ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello, I booked a room for two people from the tenth, but we are now three. Can you change it to a bigger room, please?" },
              ],
            },
            {
              kind: "audio",
              id: "c4",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Radyoda bir kişi konuşuyor.",
              plays: 2,
              segments: [
                { text: "Many people believe that a cheap flight is always the cheapest way. But when you add the bags and the bus to the airport, the train is often better." },
              ],
            },
            {
              kind: "audio",
              id: "c5",
              genre: "At home",
              genreTr: "Evde",
              situation: "Bir kişi telefonda konuşuyor.",
              plays: 2,
              segments: [
                { text: "Thank you so much for the map and the bus card. We used them every day and we never got lost. You made our week much easier." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-02-h3-11",
              no: 11,
              ref: "c1",
              text: "What is the customer doing?",
              options: ["Asking for something special", "Complaining about a shop assistant", "Giving back something she bought"],
              answer: 0,
              explain:
                "İndirim bitmiş ama müşteri bir istisna istiyor: «Is there any chance of the sale price today?». Kimseden şikâyet etmiyor ve iade istemiyor; hastalık yalnız gerekçe.",
            },
            {
              kind: "mcq",
              id: "en-a2-02-h3-12",
              no: 12,
              ref: "c2",
              text: "Why is the announcement made?",
              options: ["To sell something in the shop", "To close the ground floor", "To find the owner of an animal"],
              answer: 2,
              explain:
                "Anons köpeği tarif edip «If the dog is yours, please come to the ground floor» diyor: sahibini arıyor. Zemin kat buluşma yeri, kapatılan bir bölüm değil.",
            },
            {
              kind: "mcq",
              id: "en-a2-02-h3-13",
              no: 13,
              ref: "c3",
              text: "What does the caller want?",
              options: ["To cancel the booking", "To change the booking", "To pay for the booking"],
              answer: 1,
              explain:
                "Kişi sayısı ikiden üçe çıkmış ve arayan «Can you change it to a bigger room, please?» diyor. İptal ya da ödeme kayıtta hiç geçmiyor; rezervasyon duruyor, yalnız oda büyüyecek.",
            },
            {
              kind: "mcq",
              id: "en-a2-02-h3-14",
              no: 14,
              ref: "c4",
              text: "What is the speaker doing?",
              options: ["Advertising a cheap flight", "Correcting a common idea", "Asking listeners for their opinion"],
              answer: 1,
              explain:
                "Konuşmacı yaygın bir inancı anıp düzeltiyor: «Many people believe … But when you add the bags and the bus …, the train is often better». Reklam ya da dinleyiciye soru yok.",
            },
            {
              kind: "mcq",
              id: "en-a2-02-h3-15",
              no: 15,
              ref: "c5",
              text: "Why is the speaker calling?",
              options: ["To say thank you", "To ask for the map again", "To say that something is missing"],
              answer: 0,
              explain:
                "İleti «Thank you so much» ile başlıyor ve «You made our week much easier» ile bitiyor: teşekkür. Harita ve otobüs kartı geçiyor ama istek olarak değil, kullanılan şeyler olarak.",
            },
          ],
        },
        {
          id: "en-a2-02-h4",
          no: 4,
          format: "match",
          goal: "detail",
          prompt:
            "You hear five people. They talk about a purchase they regret. What was the problem? Choose from a to h. You use each answer once only. You hear the recordings twice.",
          promptTr:
            "Beş kişi dinleyeceksin. Pişman oldukları bir alışverişten söz ediyorlar. Sorun neydi? a'dan h'ye seç. Her seçenek en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "It arrived very late." },
            { key: "b", label: "It was the wrong size." },
            { key: "c", label: "It broke after a short time." },
            { key: "d", label: "It was much more expensive than in another shop." },
            { key: "e", label: "It was too heavy to carry." },
            { key: "f", label: "The colour was different from the picture." },
            { key: "g", label: "It was never used." },
            { key: "h", label: "There was a part missing in the box." },
          ],
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Speaker 1",
              genreTr: "Birinci konuşmacı",
              situation: "Birinci konuşmacı bir mutfak aletinden söz ediyor.",
              plays: 2,
              segments: [
                { text: "I bought a big machine for bread. It works well and it looks good on the shelf. But I used it twice in two years. It just stands there." },
              ],
            },
            {
              kind: "audio",
              id: "d2",
              genre: "Speaker 2",
              genreTr: "İkinci konuşmacı",
              situation: "İkinci konuşmacı internetten aldığı bir halıdan söz ediyor.",
              plays: 2,
              segments: [
                { text: "On the website the carpet was warm orange. When I opened the box it was almost brown. The size was right, but I did not like it at all." },
              ],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü konuşmacı bir kulaklıktan söz ediyor.",
              plays: 2,
              segments: [
                { text: "The headphones were good for six weeks. Then the left side stopped and no shop could repair it. Six weeks for that money is a joke." },
              ],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Speaker 4",
              genreTr: "Dördüncü konuşmacı",
              situation: "Dördüncü konuşmacı bir masadan söz ediyor.",
              plays: 2,
              segments: [
                { text: "The table itself is fine. But when I opened the box, four screws were not there. I waited three weeks for them and I could not use the table." },
              ],
            },
            {
              kind: "audio",
              id: "d5",
              genre: "Speaker 5",
              genreTr: "Beşinci konuşmacı",
              situation: "Beşinci konuşmacı bir telefondan söz ediyor.",
              plays: 2,
              segments: [
                { text: "I paid four hundred pounds at the airport. Two days later I saw the same phone in a normal shop for three hundred. That still makes me angry." },
              ],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-a2-02-h4-16",
              no: 16,
              ref: "d1",
              text: "Speaker 1",
              answer: "g",
              explain:
                "Makine çalışıyor ve güzel görünüyor, tek sorun kullanılmaması: «I used it twice in two years. It just stands there». Bozulma ya da fiyat şikâyeti yok.",
            },
            {
              kind: "match",
              id: "en-a2-02-h4-17",
              no: 17,
              ref: "d2",
              text: "Speaker 2",
              answer: "f",
              explain:
                "İnternette turuncu görünen halı kutudan neredeyse kahverengi çıkıyor. Konuşmacı bedenin doğru olduğunu ayrıca söylüyor («The size was right»), yani sorun beden değil renk.",
            },
            {
              kind: "match",
              id: "en-a2-02-h4-18",
              no: 18,
              ref: "d3",
              text: "Speaker 3",
              answer: "c",
              explain:
                "Kulaklık altı hafta dayanıyor: «Then the left side stopped and no shop could repair it». Süre kısa, sorun dayanıksızlık; fiyat yalnız kızgınlığı büyüten bir ayrıntı olarak anılıyor.",
            },
            {
              kind: "match",
              id: "en-a2-02-h4-19",
              no: 19,
              ref: "d4",
              text: "Speaker 4",
              answer: "h",
              explain:
                "Masa iyi ama kutudan dört vida eksik çıkıyor: «four screws were not there». Üç hafta beklemek gecikmenin kendisi değil, eksik parçanın sonucu.",
            },
            {
              kind: "match",
              id: "en-a2-02-h4-20",
              no: 20,
              ref: "d5",
              text: "Speaker 5",
              answer: "d",
              explain:
                "Havaalanında dört yüz pound ödediği telefonu iki gün sonra normal bir mağazada üç yüze görüyor. Aradaki yüz poundluk fark tek şikâyet; telefonda bir kusur yok.",
            },
          ],
        },
      ],
    },

    /* ── WRITING ───────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 30,
      instruction: "This part has two tasks: you write an email and a short text about an experience.",
      instructionTr: "Bu bölümde iki görev var: bir e-posta ve bir deneyim üzerine kısa bir metin yazacaksın.",
      tasks: [
        {
          id: "en-a2-02-w1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "Your English friend Sam wants to visit your town for a weekend. Write an email to Sam. Write about 50 words. Answer all three points.",
          promptTr:
            "İngiliz arkadaşın Sam bir hafta sonu şehrine gelmek istiyor. Sam'e bir e-posta yaz. Yaklaşık 50 kelime. Üç maddenin hepsine cevap ver.",
          items: [],
          rubric: {
            minWords: 50,
            points: [
              { de: "Say which month is best and why.", tr: "Hangi ay iyi olur, neden, söyle." },
              { de: "Say how Sam can travel from the airport.", tr: "Sam havaalanından nasıl gelebilir, söyle." },
              { de: "Suggest one thing to do together.", tr: "Birlikte yapacağınız bir şey öner." },
            ],
            sample: `Hi Sam,

Great news! Come in May, because the weather is warm then and the town is not full of tourists yet.

From the airport you can take the train. It is cheaper than a taxi and it takes forty minutes.

On Saturday we can walk by the river and eat fish in the old town.

See you in May!
Elif`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi? Biri eksikse metin tam sayılmaz.",
              "Ay seçimi bir gerekçeyle mi verildi? (because …)",
              "Ulaşım için somut bir bilgi var mı? (süre, fiyat ya da karşılaştırma)",
              "Yaklaşık 50 kelime yazıldı mı?",
              "Öneri açık bir cümleyle yapıldı mı? (We can … / Let us …)",
            ],
          },
        },
        {
          id: "en-a2-02-w2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Write a short story about a journey that did not go as you planned. Say where you went, what went wrong and what you did. Write about 60 words.",
          promptTr:
            "Planladığın gibi gitmeyen bir yolculuğu anlat. Nereye gittiğini, neyin ters gittiğini ve ne yaptığını yaz. Yaklaşık 60 kelime.",
          items: [],
          rubric: {
            minWords: 60,
            points: [
              { de: "Say where you went and with whom.", tr: "Nereye ve kiminle gittiğini söyle." },
              { de: "Say what went wrong.", tr: "Neyin ters gittiğini söyle." },
              { de: "Say what you did in the end.", tr: "Sonunda ne yaptığını söyle." },
            ],
            sample: `Last August I travelled to the coast with my brother. We booked a small hotel near the beach. When we arrived at midnight, the hotel was closed and nobody answered the phone. We sat outside for an hour. Then a woman from the next house opened her door and gave us a room. In the morning the hotel said sorry, but we stayed with the woman.`,
            criteria: [
              "Üç içerik noktasının üçü de var mı?",
              "Geçmiş zaman doğru kullanıldı mı? Düzensiz fiiller (went, was, gave) doğru mu?",
              "Olaylar sıra bildiren sözcüklerle mi bağlandı? (when, then, in the end)",
              "Yaklaşık 60 kelime yazıldı mı?",
              "Sonuç açıkça söylendi mi, yoksa hikâye ortada mı kaldı?",
            ],
          },
        },
      ],
    },

    /* ── SPEAKING ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "This part has three tasks: an interview, a photograph, and a decision you make together.",
      instructionTr: "Bu bölümde üç görev var: söyleşi, fotoğraf anlatma ve birlikte karar verme.",
      tasks: [
        {
          id: "en-a2-02-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about travelling and shopping. Answer in full sentences.",
          promptTr: "Sana yolculuk ve alışveriş hakkında sorular soracağım. Tam cümlelerle cevap ver.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good afternoon. How do you usually travel to work or to school?", tr: "İyi günler. İşe ya da okula genelde nasıl gidersin?" },
            { who: "you", hint: "Ulaşım biçimini ve süresini söyle.", expect: "günlük ulaşımı ve süresini tam bir cümleyle anlatmak", seconds: 30 },
            { who: "partner", de: "Thank you. Do you prefer shopping in a shop or on the internet? Why?", tr: "Teşekkürler. Mağazadan mı internetten mi alışveriş yapmayı seversin? Neden?" },
            { who: "you", hint: "Tercihini söyle ve bir gerekçe ver.", expect: "bir tercihi gerekçesiyle bildirmek", seconds: 30 },
            { who: "partner", de: "Interesting. Tell me about a journey you made last year.", tr: "İlginç. Geçen yıl yaptığın bir yolculuğu anlat." },
            { who: "you", hint: "Geçmiş zamanla kısa bir yolculuk anlat.", expect: "geçmiş zamanda kısa bir anlatı vermek", seconds: 35 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "answer with full sentences", tr: "Tam cümlelerle cevap vermek" },
              { de: "give a reason for the preference", tr: "Tercih için bir gerekçe vermek" },
              { de: "use the past simple in the last answer", tr: "Son cevapta geçmiş zamanı kullanmak" },
            ],
            sample:
              "I usually go to work by bus. It takes about twenty-five minutes. I prefer shopping in a shop because I want to see the size and the colour first. Last year I went to Greece with my sister. We stayed for ten days and we swam every morning.",
            criteria: [
              "Cevaplar tek sözcük değil, tam cümle mi?",
              "Tercih bir gerekçeyle mi verildi? (because …)",
              "Son soruda geçmiş zaman doğru kuruldu mu?",
              "Süre ve sayı gibi bilgiler söylenebiliyor mu?",
            ],
          },
        },
        {
          id: "en-a2-02-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Describe this situation for about one minute: a busy market street on a Saturday morning. People are buying fruit and vegetables. A woman is carrying two heavy bags. Say what you see, what the people are doing, and whether you like markets.",
          promptTr:
            "Şu durumu bir dakika kadar anlat: cumartesi sabahı kalabalık bir pazar sokağı. İnsanlar meyve ve sebze alıyor. Bir kadın iki ağır çanta taşıyor. Ne gördüğünü, insanların ne yaptığını ve pazarları sevip sevmediğini söyle.",
          prepSeconds: 45,
          speakSeconds: 75,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "say what you see", tr: "Ne gördüğünü söyle" },
              { de: "say what the people are doing", tr: "İnsanların ne yaptığını söyle" },
              { de: "say if you like markets", tr: "Pazarları sevip sevmediğini söyle" },
            ],
            sample:
              "This is a market street on a Saturday morning. There are a lot of people and it is very busy. In front of me a man is selling apples and oranges. A woman is carrying two heavy bags and she looks tired. Behind her two children are eating something. I like markets because the food is fresh and it is cheaper than in a supermarket.",
            criteria: [
              "Şimdiki zaman (present continuous) kullanıldı mı? Bu görevin ana yapısı bu.",
              "Üç içerik noktasının üçü de işlendi mi?",
              "Yer bildiren ifadeler var mı? (in front of, behind, next to)",
              "Görüş bir gerekçeyle mi verildi?",
            ],
          },
        },
        {
          id: "en-a2-02-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "A friend from abroad has one free day in your town. Talk with me about the ideas and choose one together.",
          promptTr:
            "Yurt dışından bir arkadaşının şehrinde bir boş günü var. Fikirleri benimle konuş ve birlikte birini seç.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "Here are three ideas: a boat trip on the river, a day in the old town with a guide, or a visit to the big market and a cooking evening. What do you think about the boat trip?", tr: "Üç fikir var: nehirde tekne turu, rehberli bir eski şehir günü, ya da büyük pazara gidip akşam yemek yapmak. Tekne turu hakkında ne düşünüyorsun?" },
            { who: "you", hint: "Tekne turu hakkında görüşünü söyle ve bir gerekçe ver.", expect: "bir fikir hakkında görüş bildirmek ve gerekçelendirmek", seconds: 35 },
            { who: "partner", de: "I see your point. But the boat is expensive and it only runs in the afternoon. Is the market a better idea?", tr: "Anlıyorum. Ama tekne pahalı ve yalnız öğleden sonra çalışıyor. Pazar daha mı iyi bir fikir?" },
            { who: "you", hint: "Karşı tarafın söylediğine gönderme yap ve katıl ya da karşı çık.", expect: "karşı tarafın söylediğine açıkça gönderme yaparak katılmak ya da karşı çıkmak", seconds: 35 },
            { who: "partner", de: "All right. So what do we choose for your friend?", tr: "Peki. Arkadaşın için hangisini seçiyoruz?" },
            { who: "you", hint: "Bir seçim yap ve kısa bir gerekçe ver.", expect: "ortak bir karara varmak ve gerekçelendirmek", seconds: 30 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "give your opinion with a reason", tr: "Görüşünü gerekçesiyle söylemek" },
              { de: "react to the other person", tr: "Karşı tarafa karşılık vermek" },
              { de: "make a decision together", tr: "Birlikte bir karara varmak" },
            ],
            sample:
              "I think the boat trip is nice because you see the whole city from the water. You are right about the price, that is a problem. The market is cheaper and my friend likes cooking. So let us choose the market and the cooking evening.",
            criteria: [
              "Görüş bir gerekçeyle mi verildi? (because …)",
              "Karşı tarafın söylediğine gönderme yapıldı mı? (You are right … / That is true …)",
              "Sonunda ortak bir karara varıldı mı?",
              "Yalnız kendi fikirleri sıralanmadı, karşılıklı bir konuşma oldu mu?",
            ],
          },
        },
      ],
    },
  ],
};
