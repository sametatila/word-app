import type { MockPaper } from "../types";

/**
 * A2 · Deneme 10 — "Second-hand Things, Selling and Buying".
 *
 * A2'nin öteki denemeleriyle AYNI PLAN; konu ayrı. İkinci el alım satım
 * A2 için verimli: fiyat pazarlığı, buluşma saati, durum betimlemesi ve
 * kısa bir pişmanlık anlatısı aynı malzemenin içinde duruyor.
 *
 * Üçüncü görev bilerek söyleşi biçiminde: A2'nin ilk dokuz denemesinde
 * uzun metin ya duyuru ya blog ya da öğüt yazısıydı; soru-cevap düzeni
 * öğrenciyi ilk kez bu biçimle karşılaştırıyor. Dokuzuncu denemedeki
 * tamir malzemesiyle de tek bir sözcük kümesi paylaşmıyor.
 *
 * A2 SINIRI: past simple, present continuous, `going to` / `will`,
 * karşılaştırma dereceleri, `because / when / if / but / so`.
 */
export const EN_A2_10: MockPaper = {
  id: "en-a2-10",
  course: "en",
  level: "A2",
  no: 10,
  theme: "Second-hand Things, Selling and Buying",
  themeTr: "İkinci el eşya, satmak ve almak",
  minutes: 110,
  parts: [
    /* ── READING ───────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 35,
      instruction:
        "This part has five tasks. You read short texts, adverts and an interview, and you complete two short texts. Choose the correct answer for each question.",
      instructionTr:
        "Bu bölümde beş görev var. Kısa metinler, ilanlar ve bir söyleşi okuyacak, sonra iki kısa metni tamamlayacaksın. Her soruda doğru cevabı işaretle.",
      tasks: [
        {
          id: "en-a2-10-l1",
          no: 1,
          format: "mcq",
          goal: "gist",
          prompt: "Read the five short texts and questions 1 to 5. What is the main message? Choose a, b or c.",
          promptTr: "Beş kısa metni ve 1–5. maddeleri oku. Ana mesaj nedir? a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "m1",
              genre: "Online message",
              genreTr: "İnternet iletisi",
              title: "The blue bicycle",
              body: `Hello, I am interested in the blue bicycle. Is it still there? I can come on Saturday morning with cash. Can you keep it until then? I live in the next street.`,
            },
            {
              kind: "text",
              id: "m2",
              genre: "Notice",
              genreTr: "Duyuru",
              title: "SCHOOL MARKET",
              body: `Sunday, 10 to 14, in the hall.

Bring your own table: three euros.

Children's clothes, toys and books only. No electrical things.`,
            },
            {
              kind: "text",
              id: "m3",
              genre: "Email",
              genreTr: "E-posta",
              title: "Thank you for the table",
              body: `Dear Bexi, thank you for the table. It is in the kitchen now and it is perfect. I put twenty euros in your letter box, because you were not at home. Please tell me if you did not get it.`,
            },
            {
              kind: "text",
              id: "m4",
              genre: "Notice at a shop",
              genreTr: "Dükkân duyurusu",
              title: "WE BUY",
              body: `Books, records and small furniture. Bring three things at most.

We look at them while you wait and we say yes or no the same day.

We do not buy clothes.`,
            },
            {
              kind: "text",
              id: "m5",
              genre: "Message",
              genreTr: "İleti",
              title: "The cupboard",
              body: `Hi Tarek, eleven people wrote about the cupboard in one hour. I think my price was too low. I told the first person yes, so it is done. Next time I will ask more and I will wait a week.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-10-l1-1",
              no: 1,
              ref: "m1",
              text: "What does the writer want?",
              options: ["A lower price for the bicycle", "A photograph of the bicycle", "The seller to wait until Saturday"],
              answer: 2,
              explain:
                "İleti tek bir rica taşıyor: «Can you keep it until then?» ve cumartesi sabahı nakitle geleceğini söylüyor. Fiyat ve fotoğraf hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-10-l1-2",
              no: 2,
              ref: "m2",
              text: "What can people not sell here?",
              options: ["Radios and lamps", "Children's books", "Old toys"],
              answer: 0,
              explain:
                "Duyuru sınırı çiziyor: «Children's clothes, toys and books only. No electrical things». Radyo ve lamba elektrikli eşya.",
            },
            {
              kind: "mcq",
              id: "en-a2-10-l1-3",
              no: 3,
              ref: "m3",
              text: "Why does the writer write?",
              options: ["The table is much too big", "She left the money in a letter box", "Bexi wants the table back"],
              answer: 1,
              explain:
                "E-posta ödemenin nasıl yapıldığını bildiriyor: «I put twenty euros in your letter box, because you were not at home. Please tell me if you did not get it». Masadan memnun.",
            },
            {
              kind: "mcq",
              id: "en-a2-10-l1-4",
              no: 4,
              ref: "m4",
              text: "What does the shop say about time?",
              options: ["You wait two weeks for an answer", "You must come before twelve", "You get an answer the same day"],
              answer: 2,
              explain:
                "Duyuru süreyi veriyor: «We look at them while you wait and we say yes or no the same day».",
            },
            {
              kind: "mcq",
              id: "en-a2-10-l1-5",
              no: 5,
              ref: "m5",
              text: "What did the writer learn?",
              options: ["Nobody wants old furniture", "She asked too little money", "It is better to sell to the first person"],
              answer: 1,
              explain:
                "İleti sonucu kendisi çıkarıyor: bir saatte on bir kişi yazmış ve «I think my price was too low». Gelecek sefer daha fazla isteyip bir hafta bekleyecek.",
            },
          ],
        },
        {
          id: "en-a2-10-l2",
          no: 2,
          format: "match",
          goal: "orientation",
          prompt:
            "Read about five people, 6 to 10. Then read the eight adverts a to h. Which advert is right for each person? You use each advert once only.",
          promptTr:
            "6–10. maddelerdeki beş kişiyi oku. Sonra a'dan h'ye sekiz ilanı oku. Her kişiye hangi ilan uyar? Her ilan en fazla bir kez kullanılır.",
          options: [
            { key: "a", label: "We Collect", body: "We take large furniture and machines from your flat. We pay you less, but we carry it down. Send a photo first, please." },
            { key: "b", label: "School Market", body: "Sunday, 10 to 14. Bring your own table, three euros. Children's clothes, toys and books only." },
            { key: "c", label: "Second-hand Furniture", body: "Beds, desks and chairs. Delivery in the city for eight euros. Open Tuesday to Saturday." },
            { key: "d", label: "What Is It Worth?", body: "Free, Thursday afternoons. Bring one object. We look at it and we tell you. We do not buy anything." },
            { key: "e", label: "Book Shelf in the Hallway", body: "Leave a book, take a book. Free for everybody. Please, no wet books." },
            { key: "f", label: "Clothes Shop", body: "We buy good clothes and we pay the same day. Bring ten pieces at most." },
            { key: "g", label: "Tool Library", body: "Borrow a drill or a saw for two euros a day. You need a card and an address in the city." },
            { key: "h", label: "Small Ads", body: "Put your advert online free. Photograph, price and your street. You meet the buyer yourself." },
          ],
          items: [
            {
              kind: "match",
              id: "en-a2-10-l2-6",
              no: 6,
              text: "Ondrej wants to sell a fridge and cannot carry it down the stairs.",
              answer: "a",
              explain:
                "İlan tam bu engeli çözüyor: «We take large furniture and machines from your flat … we carry it down». Daha az ödemesi de açıkça söyleniyor.",
            },
            {
              kind: "match",
              id: "en-a2-10-l2-7",
              no: 7,
              text: "Nadia has three boxes of children's clothes and wants to sell them on a Sunday.",
              answer: "b",
              explain:
                "İlan hem günü hem ürünü veriyor: «Sunday, 10 to 14» ve «Children's clothes, toys and books only». Giysi dükkânı (f) ise en fazla on parça alıyor.",
            },
            {
              kind: "match",
              id: "en-a2-10-l2-8",
              no: 8,
              text: "Anouk wants a cheap desk for her son's room and has no car.",
              answer: "c",
              explain:
                "İlan hem eşyayı hem ulaşımı veriyor: «Beds, desks and chairs» ve «Delivery in the city for eight euros». Arabası olmayan biri için taşıma belirleyici.",
            },
            {
              kind: "match",
              id: "en-a2-10-l2-9",
              no: 9,
              text: "Eren wants to know what his grandfather's old watch is worth.",
              answer: "d",
              explain:
                "İlan tam bu soruyu yanıtlıyor: «Bring one object. We look at it and we tell you. We do not buy anything». Yani değer öğrenilir, satış yapılmaz.",
            },
            {
              kind: "match",
              id: "en-a2-10-l2-10",
              no: 10,
              text: "Lenn has old books and does not want money for them.",
              answer: "e",
              explain:
                "İlan parasız bir düzen kuruyor: «Leave a book, take a book. Free for everybody». Dükkân (m4 türü) ise satın alır, yani para öder.",
            },
          ],
        },
        {
          id: "en-a2-10-l3",
          no: 3,
          format: "mcq",
          goal: "detail",
          prompt: "Read the interview and questions 11 to 14. Choose a, b or c.",
          promptTr: "Söyleşiyi ve 11–14. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t3",
              genre: "Interview",
              genreTr: "Söyleşi",
              title: "Twenty years in a second-hand shop",
              body: `We asked Piet, who has had a second-hand shop for twenty years.

What do people bring you most?
Chairs. Every day, chairs. I say no to almost all of them, because everybody already has enough chairs.

What sells fastest?
Small things that people did not know they wanted. Lamps go in two days. Big cupboards are harder than anything else, and one can stand here for a year.

Do people know what their things are worth?
No, and it goes both ways. Somebody brings a box from the attic and it is worth nothing. Then the same person gives me a chair from 1955 for free.

What is your best advice for a seller?
Clean it. That is all. A clean thing sells for twice the money, and cleaning is free.`,
              gloss: [
                { de: "an attic", tr: "tavan arası", en: "attic" },
                { de: "worth", tr: "değerinde", en: "worth" },
                { de: "a seller", tr: "satıcı", en: "seller" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-10-l3-11",
              no: 11,
              text: "What do people bring most often?",
              options: ["Chairs", "Lamps", "Cupboards"],
              answer: 0,
              explain:
                "Piet cevabı iki kez veriyor: «Chairs. Every day, chairs», üstelik çoğunu geri çeviriyor. Lambalar ve dolaplar ise satış hızıyla ilgili soruda geçiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-10-l3-12",
              no: 12,
              text: "What sells quickly?",
              options: ["Big furniture", "Small useful things", "Old boxes from the attic"],
              answer: 1,
              explain:
                "Piet önce türü sonra örneği veriyor: «Small things that people did not know they wanted. Lamps go in two days». Büyük dolaplar ise bir yıl durabiliyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-10-l3-13",
              no: 13,
              text: "What does Piet say about prices?",
              options: ["People always ask too much", "People always ask too little", "People make mistakes in both directions"],
              answer: 2,
              explain:
                "Piet bunu açıkça söylüyor: «No, and it goes both ways» — biri değersiz kutu getiriyor, aynı kişi 1955'ten bir sandalyeyi bedava veriyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-10-l3-14",
              no: 14,
              text: "What is his advice to a seller?",
              options: ["Clean the thing first", "Sell it in the summer", "Ask for more money at the start"],
              answer: 0,
              explain:
                "Piet öğüdü tek sözcükle verip gerekçelendiriyor: «Clean it … A clean thing sells for twice the money, and cleaning is free».",
            },
          ],
        },
        {
          id: "en-a2-10-l4",
          no: 4,
          format: "gapMcq",
          goal: "structure",
          prompt: "Read the text and complete gaps 15 to 19. Which word fits: a, b or c?",
          promptTr: "Metni oku ve 15–19. boşlukları tamamla. Hangi sözcük uyar: a, b ya da c?",
          texts: [
            {
              kind: "text",
              id: "t4",
              genre: "Blog post",
              genreTr: "Blog yazısı",
              title: "Forty euros and eleven answers",
              body: `I sold my old bicycle online last month, and here is what I {{15}}.

I put the price at forty euros. That was {{16}} than the price in the shops, and eleven people answered in one hour.

The first man came the same evening. He was very friendly, {{17}} he did not ask a single question. That was the moment I understood my mistake.

Next month I {{18}} sell my desk, and this time I start high.

And one more thing: {{19}} you write an advert, take the photograph in the morning. The light is better.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-10-l4-15",
              no: 15,
              text: "Gap 15",
              options: ["learn", "learning", "learned"],
              answer: 2,
              explain:
                "Cümlenin ilk yarısı kapanmış bir olayı anlatıyor: «I sold my old bicycle online last month». Öğrenme de geçmişe ait: `learned`.",
            },
            {
              kind: "mcq",
              id: "en-a2-10-l4-16",
              no: 16,
              text: "Gap 16",
              options: ["low", "lower", "the lowest"],
              answer: 1,
              explain:
                "Boşluktan sonra `than` var ve `than` karşılaştırma derecesi ister: `lower`. `the lowest` en üstünlük derecesidir ve `than` almaz.",
            },
            {
              kind: "mcq",
              id: "en-a2-10-l4-17",
              no: 17,
              text: "Gap 17",
              options: ["but", "so", "because"],
              answer: 0,
              explain:
                "İki bilgi karşıt: adam çok cana yakın ama hiç soru sormuyor. Karşıtlığı `but` kurar ve devamındaki «my mistake» bunu doğruluyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-10-l4-18",
              no: 18,
              text: "Gap 18",
              options: ["went to", "goes to", "am going to"],
              answer: 2,
              explain:
                "Zaman belirteci `Next month`, yani gelecek; planlanmış bir gelecek `am going to + fiil` ile kurulur. `went to` geçmiş, `goes to` birinci tekil kişiyle uyuşmaz.",
            },
            {
              kind: "mcq",
              id: "en-a2-10-l4-19",
              no: 19,
              text: "Gap 19",
              options: ["so", "when", "because"],
              answer: 1,
              explain:
                "Cümle bir durumu öğüde bağlıyor: ilan yazdığın zaman fotoğrafı sabah çek. `when` bu zamanı verir; `so` sonuç, `because` sebep bildirir.",
            },
          ],
        },
        {
          id: "en-a2-10-l5",
          no: 5,
          format: "gap",
          goal: "structure",
          prompt: "Read the text and complete gaps 20 to 24. Write ONE word in each gap.",
          promptTr: "Metni oku ve 20–24. boşlukları tamamla. Her boşluğa TEK bir sözcük yaz.",
          texts: [
            {
              kind: "text",
              id: "t5",
              genre: "Blog comment",
              genreTr: "Blog yorumu",
              title: "My grandmother's table",
              body: `My grandmother bought her table {{20}} 1968 and it is still in our kitchen.

She paid a little every week {{21}} four months.

It is heavier {{22}} anything else in the flat.

We moved three times and we took it {{23}} us every time.

I have two chairs from a shop and I {{24}} not know where they are now.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a2-10-l5-20",
              no: 20,
              text: "Gap 20",
              accept: ["in"],
              explain:
                "Yıllarla `in` kullanılır: `in 1968`. `on` belirli bir gün için, `at` ise saat için gelir.",
            },
            {
              kind: "gap",
              id: "en-a2-10-l5-21",
              no: 21,
              text: "Gap 21",
              accept: ["for"],
              explain:
                "Süre uzunluğu `for` ile verilir: `for four months`. `since` bir başlangıç noktası ister, süre değil.",
            },
            {
              kind: "gap",
              id: "en-a2-10-l5-22",
              no: 22,
              text: "Gap 22",
              accept: ["than"],
              explain:
                "`heavier` bir karşılaştırma biçimidir ve karşılaştırılan şey `than` ile bağlanır: «heavier than anything else».",
            },
            {
              kind: "gap",
              id: "en-a2-10-l5-23",
              no: 23,
              text: "Gap 23",
              accept: ["with"],
              explain:
                "Beraberlik `with` ile bildirilir: `took it with us`. Başka bir edat bu kalıbı kurmaz.",
            },
            {
              kind: "gap",
              id: "en-a2-10-l5-24",
              no: 24,
              text: "Gap 24",
              accept: ["do"],
              explain:
                "Geniş zamanın olumsuzu `do not + yalın fiil` ile kurulur ve özne birinci tekil kişi: «I do not know».",
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
        "This part has four tasks. You hear conversations, some information and five short speakers. You hear every recording twice.",
      instructionTr:
        "Bu bölümde dört görev var. Konuşmalar, bir bilgilendirme ve beş kısa konuşmacı dinleyeceksin. Her kaydı iki kez dinleyebilirsin.",
      tasks: [
        {
          id: "en-a2-10-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "You hear five short conversations, questions 1 to 5. Choose a, b or c. You hear every recording twice.",
          promptTr: "Beş kısa konuşma dinleyeceksin, 1–5. maddeler. a, b ya da c'yi seç. Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Phone call",
              genreTr: "Telefon görüşmesi",
              situation: "Bir alıcı ilan sahibini arıyor.",
              plays: 2,
              segments: [
                { text: "I am calling about the cupboard." },
                { text: "Yes?" },
                { text: "Is it still there?" },
                { text: "I am sorry, a woman took it this morning. I have a small table if you want." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "At a market",
              genreTr: "Pazarda",
              situation: "Bir müşteri iki eşyanın fiyatını soruyor.",
              plays: 2,
              segments: [
                { text: "How much is the lamp?" },
                { text: "Twelve euros." },
                { text: "And the two together?" },
                { text: "Twenty for the lamp and the clock." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki arkadaş satılamayan bir masayı konuşuyor.",
              plays: 2,
              segments: [
                { text: "Did you sell the desk?" },
                { text: "No. Four people wrote and nobody came." },
                { text: "Why?" },
                { text: "I think the photograph is bad. You cannot see the size." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "In a shop",
              genreTr: "Dükkânda",
              situation: "Bir müşteri dükkânın ne aldığını soruyor.",
              plays: 2,
              segments: [
                { text: "Do you buy clothes?" },
                { text: "No, only books, records and small furniture." },
                { text: "And this old radio?" },
                { text: "No electrical things, I am sorry." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Phone message",
              genreTr: "Telefon iletisi",
              situation: "Bir alıcı buluşma için ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello, this is about your table. I can come on Saturday, not on Friday. I bring a friend and a car. Is eleven o'clock all right?" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-10-h1-1",
              no: 1,
              ref: "a1",
              text: "What does the seller say?",
              options: ["The cupboard is gone", "The price is higher now", "The cupboard is broken"],
              answer: 0,
              explain:
                "Satıcı durumu bildiriyor: «a woman took it this morning» ve yerine küçük bir masa öneriyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-10-h1-2",
              no: 2,
              ref: "a2",
              text: "How much are the two things together?",
              options: ["Twelve euros", "Twenty-four euros", "Twenty euros"],
              answer: 2,
              explain:
                "Satıcı ikili fiyatı veriyor: «Twenty for the lamp and the clock». On iki yalnız lambanın fiyatı.",
            },
            {
              kind: "mcq",
              id: "en-a2-10-h1-3",
              no: 3,
              ref: "a3",
              text: "What is the problem?",
              options: ["The price is too high", "The photograph is not good", "Nobody answered the advert"],
              answer: 1,
              explain:
                "Konuşmacı kendi teşhisini veriyor: «I think the photograph is bad. You cannot see the size». Dört kişi yazmış, yani ilan cevapsız değil.",
            },
            {
              kind: "mcq",
              id: "en-a2-10-h1-4",
              no: 4,
              ref: "a4",
              text: "What does the shop buy?",
              options: ["Books and records", "Clothes", "Radios"],
              answer: 0,
              explain:
                "Görevli listeyi veriyor: «only books, records and small furniture», giysi ve elektrikli eşya alınmıyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-10-h1-5",
              no: 5,
              ref: "a5",
              text: "What has changed?",
              options: ["The price", "The day", "The address"],
              answer: 1,
              explain:
                "İleti günü değiştiriyor: «I can come on Saturday, not on Friday». Saat öneriliyor ama değişiklik gün.",
            },
          ],
        },
        {
          id: "en-a2-10-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear information about a school market. Complete the notes, questions 6 to 10. Write ONE or TWO words or a number in each gap. You hear the information twice.",
          promptTr:
            "Bir okul pazarı hakkında bilgi dinleyeceksin. 6–10. maddelerdeki notları tamamla. Her boşluğa BİR ya da İKİ sözcük veya bir sayı yaz. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Information",
              genreTr: "Bilgilendirme",
              situation: "Bir görevli okul pazarını anlatıyor.",
              plays: 2,
              segments: [
                {
                  text: "Good evening. The market is on Sunday the fifth, from ten to two, in the school hall. A table costs three euros and you bring your own. You can sell children's clothes, toys and books, but no electrical things. Please take everything home again at the end; we have no room here. Tell Bexi by Wednesday if you want a place.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notes",
              genreTr: "Not kâğıdı",
              title: "School market — notes",
              body: `Date:               Sunday the {{6}}
The market ends at: {{7}}
A table costs:      {{8}} euros
You cannot sell:    {{9}} things
Tell Bexi by:       {{10}}`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a2-10-h2-6",
              no: 6,
              ref: "b1",
              text: "Gap 6",
              accept: ["5", "fifth", "5th"],
              explain:
                "Kayıt «on Sunday the fifth» diyor. Not kâğıdında `Sunday the` basılı olduğu için boşluğa yalnız gün yazılır.",
            },
            {
              kind: "gap",
              id: "en-a2-10-h2-7",
              no: 7,
              ref: "b1",
              text: "Gap 7",
              accept: ["2", "two"],
              explain:
                "«from ten to two» — bitiş saati. On başlangıç saati; not kâğıdı bitişi soruyor.",
            },
            {
              kind: "gap",
              id: "en-a2-10-h2-8",
              no: 8,
              ref: "b1",
              text: "Gap 8",
              accept: ["3", "three"],
              explain:
                "«A table costs three euros and you bring your own» — masa ücreti. Beş ayın günü, iki ise bitiş saati.",
            },
            {
              kind: "gap",
              id: "en-a2-10-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["electrical"],
              explain:
                "Kayıt yasağı adlandırıyor: «but no electrical things». Not kâğıdında `things` basılı, boşluğa niteleyen sözcük geliyor.",
            },
            {
              kind: "gap",
              id: "en-a2-10-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["wednesday"],
              explain:
                "Kayıt son günü veriyor: «Tell Bexi by Wednesday if you want a place». Pazar pazarın kendi günü.",
            },
          ],
        },
        {
          id: "en-a2-10-h3",
          no: 3,
          format: "mcq",
          goal: "gist",
          prompt: "You hear five short speakers, questions 11 to 15. What is each person doing? You hear every recording twice.",
          promptTr: "Beş kısa konuşmacı dinleyeceksin, 11–15. maddeler. Her kişi ne yapıyor? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Bir dinleyici bir satışı anlatıyor.",
              plays: 2,
              segments: [
                { text: "I wrote good condition and I meant it. The man came, looked at the leg for four seconds and said nothing. He gave me the money and carried it out. I still do not know if he was happy." },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "Announcement",
              genreTr: "Duyuru",
              situation: "Pazarın sonunda anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "The market ends at two. Please take everything home with you. Last year we had six boxes in the hall on Monday morning and nobody came for them." },
              ],
            },
            {
              kind: "audio",
              id: "c3",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Bir dinleyici ikinci el mobilyayı anlatıyor.",
              plays: 2,
              segments: [
                { text: "I never buy furniture new any more, and it is not about money. A chair from 1960 is still a chair. A chair from last year has a leg that breaks in April." },
              ],
            },
            {
              kind: "audio",
              id: "c4",
              genre: "Phone call",
              genreTr: "Telefon görüşmesi",
              situation: "Bir alıcı satıcıyı arıyor.",
              plays: 2,
              segments: [
                { text: "Yes, hello, I bought the small table from you on Saturday. One of the legs is loose. I am not angry; the price was twelve euros. But I would like to know if you knew." },
              ],
            },
            {
              kind: "audio",
              id: "c5",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Bir konuşmacı internetten satmayı anlatıyor.",
              plays: 2,
              segments: [
                { text: "People say that selling online is easy. It is easy to write the advert. Then you wait at home on a Saturday for somebody who does not come, and you do that three times." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-10-h3-11",
              no: 11,
              ref: "c1",
              text: "What is the speaker doing?",
              options: ["Complaining about a buyer", "Explaining why she lowered the price", "Describing a sale she did not understand"],
              answer: 2,
              explain:
                "Konuşmacı olayı anlatıp sonucu açık bırakıyor: «I still do not know if he was happy». Şikâyet ya da fiyat indirimi yok.",
            },
            {
              kind: "mcq",
              id: "en-a2-10-h3-12",
              no: 12,
              ref: "c2",
              text: "What does the announcement ask people to do?",
              options: ["To take unsold things away", "To arrive before two", "To bring fewer boxes"],
              answer: 0,
              explain:
                "Anonsun tek ricası bu: «Please take everything home with you», gerekçesi de geçen yıl kalan altı kutu.",
            },
            {
              kind: "mcq",
              id: "en-a2-10-h3-13",
              no: 13,
              ref: "c3",
              text: "Why does the speaker buy second-hand?",
              options: ["Because it is cheaper", "Because it lasts longer", "Because the shops are far away"],
              answer: 1,
              explain:
                "Konuşmacı parayı açıkça eliyor: «it is not about money», sonra dayanıklılığı örnekliyor: 1960'tan bir sandalye hâlâ sandalye.",
            },
            {
              kind: "mcq",
              id: "en-a2-10-h3-14",
              no: 14,
              ref: "c4",
              text: "What does the caller want?",
              options: ["Her money back", "A different table", "An honest answer"],
              answer: 2,
              explain:
                "Arayan isteğini sonda söylüyor: «I would like to know if you knew», üstelik kızgın olmadığını da belirtiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-10-h3-15",
              no: 15,
              ref: "c5",
              text: "What is the speaker doing?",
              options: ["Correcting a common idea", "Recommending a website", "Asking for advice"],
              answer: 0,
              explain:
                "Konuşmacı yaygın inancı anıp sınırlıyor: «It is easy to write the advert», asıl yük evde beklemek.",
            },
          ],
        },
        {
          id: "en-a2-10-h4",
          no: 4,
          format: "match",
          goal: "detail",
          prompt:
            "You hear five people, questions 16 to 20. What went wrong for each person? Choose from a to h. You use each answer once only. You hear the recordings twice.",
          promptTr:
            "Beş kişi dinleyeceksin, 16–20. maddeler. Her kişide ne ters gitti? a'dan h'ye seç. Her seçenek en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "The price was too low." },
            { key: "b", label: "The buyer did not come." },
            { key: "c", label: "The thing was broken and nobody said so." },
            { key: "d", label: "It was too big to carry down." },
            { key: "e", label: "Nobody answered the advert." },
            { key: "f", label: "They sold it and then wanted it back." },
            { key: "g", label: "The photograph was bad." },
            { key: "h", label: "They paid too much for it." },
          ],
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Speaker 1",
              genreTr: "Birinci konuşmacı",
              situation: "Birinci konuşmacı dolabını anlatıyor.",
              plays: 2,
              segments: [
                { text: "Eleven answers in one hour. Eleven. I know what that means now: the number was wrong, not the cupboard. The first person had it in his car before I finished my coffee." },
              ],
            },
            {
              kind: "audio",
              id: "d2",
              genre: "Speaker 2",
              genreTr: "İkinci konuşmacı",
              situation: "İkinci konuşmacı cumartesisini anlatıyor.",
              plays: 2,
              segments: [
                { text: "I stayed at home on Saturday from ten until four. He wrote at half past four: sorry, my car. The next week the same person asked again, and this time I said no." },
              ],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü konuşmacı büyükannesinin sandalyesinden söz ediyor.",
              plays: 2,
              segments: [
                { text: "It was my grandmother's chair and I said yes too fast, because the flat was full of boxes. Two weeks later I asked the woman if she would sell it back. She was very kind, and she said no." },
              ],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Speaker 4",
              genreTr: "Dördüncü konuşmacı",
              situation: "Dördüncü konuşmacı buzdolabını satmaya çalışmış.",
              plays: 2,
              segments: [
                { text: "The fridge was in the kitchen and the kitchen is on the fourth floor. Everybody wanted it until they read the word fourth. In the end a company took it and paid me thirty euros less." },
              ],
            },
            {
              kind: "audio",
              id: "d5",
              genre: "Speaker 5",
              genreTr: "Beşinci konuşmacı",
              situation: "Beşinci konuşmacı ilanını yenilemiş.",
              plays: 2,
              segments: [
                { text: "The desk was on the site for six weeks and nobody wrote a word. Then I took a new picture in the morning light and put it up again. Three people wrote the same day." },
              ],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-a2-10-h4-16",
              no: 16,
              ref: "d1",
              text: "Speaker 1",
              answer: "a",
              explain:
                "Konuşmacı sonucu kendisi adlandırıyor: «the number was wrong, not the cupboard». Bir saatte on bir cevap ve kahve bitmeden giden eşya bunu gösteriyor.",
            },
            {
              kind: "match",
              id: "en-a2-10-h4-17",
              no: 17,
              ref: "d2",
              text: "Speaker 2",
              answer: "b",
              explain:
                "Konuşmacı altı saat beklemiş ve alıcı gelmemiş: «He wrote at half past four: sorry, my car».",
            },
            {
              kind: "match",
              id: "en-a2-10-h4-18",
              no: 18,
              ref: "d3",
              text: "Speaker 3",
              answer: "f",
              explain:
                "Konuşmacı satıştan sonra pişman olmuş: «I asked the woman if she would sell it back. She was very kind, and she said no».",
            },
            {
              kind: "match",
              id: "en-a2-10-h4-19",
              no: 19,
              ref: "d4",
              text: "Speaker 4",
              answer: "d",
              explain:
                "Sorun kat: «Everybody wanted it until they read the word fourth». Sonunda taşıyan şirket otuz euro daha az ödemiş.",
            },
            {
              kind: "match",
              id: "en-a2-10-h4-20",
              no: 20,
              ref: "d5",
              text: "Speaker 5",
              answer: "g",
              explain:
                "Konuşmacı tek değişkeni değiştirmiş: «I took a new picture in the morning light» ve aynı gün üç kişi yazmış. Yani eksik olan şey fotoğraftı.",
            },
          ],
        },
      ],
    },

    /* ── WRITING ───────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 30,
      instruction: "This part has two tasks: you write a message and a short text about something you keep.",
      instructionTr: "Bu bölümde iki görev var: bir ileti ve sakladığın bir şey üzerine kısa bir metin yazacaksın.",
      tasks: [
        {
          id: "en-a2-10-w1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "You are selling a table online. Somebody writes and asks about it. Write a reply. Write about 50 words. Answer all three points.",
          promptTr:
            "İnternette bir masa satıyorsun. Biri yazıp masayı soruyor. Cevap yaz. Yaklaşık 50 kelime. Üç maddenin hepsine cevap ver.",
          items: [],
          rubric: {
            minWords: 50,
            points: [
              { de: "Describe the table (size, colour or age).", tr: "Masayı betimle (boyut, renk ya da yaş)." },
              { de: "Say the price and whether it can change.", tr: "Fiyatı ve değişip değişmeyeceğini söyle." },
              { de: "Say when and where the buyer can come.", tr: "Alıcının ne zaman ve nereye gelebileceğini söyle." },
            ],
            sample: `Hello,

Thank you for your message. The table is brown and it is 120 by 80 centimetres. It is about ten years old and there is one small mark on the left.

The price is forty euros and I cannot go lower.

You can come on Saturday morning to 8 Mill Street. Please bring a car; it is heavy.

Best wishes,
Eren`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi? Biri eksikse metin tam sayılmaz.",
              "Betimleme somut mu (ölçü, renk ya da yaş)?",
              "Fiyat verildi mi ve pazarlık konusuna değinildi mi?",
              "Gün, saat ve yer açıkça söylendi mi?",
              "Yaklaşık 50 kelime yazıldı mı? Hitap ve veda var mı?",
            ],
          },
        },
        {
          id: "en-a2-10-w2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Write a short text about something old that you keep and will not sell. Say what it is, where it comes from and why you keep it. Write about 60 words.",
          promptTr:
            "Sakladığın ve satmayacağın eski bir şeyi anlat. Ne olduğunu, nereden geldiğini ve neden sakladığını yaz. Yaklaşık 60 kelime.",
          items: [],
          rubric: {
            minWords: 60,
            points: [
              { de: "Say what it is.", tr: "Ne olduğunu söyle." },
              { de: "Say where it comes from.", tr: "Nereden geldiğini söyle." },
              { de: "Say why you keep it.", tr: "Neden sakladığını söyle." },
            ],
            sample: `I have a small wooden box on my desk. My grandfather made it in his kitchen when he was seventy, and he gave it to me before I moved to the city. It is not beautiful and one corner is not straight. I keep my keys and two old photographs in it. A friend asked me to sell it last year and I said no in one second.`,
            criteria: [
              "Üç içerik noktasının üçü de var mı?",
              "Nesne somut betimlendi mi (malzeme, boyut ya da durum)?",
              "Geçmiş zaman doğru kullanıldı mı? Düzensiz fiiller (made, gave, said) doğru mu?",
              "Saklama gerekçesi açıkça verildi mi?",
              "Yaklaşık 60 kelime yazıldı mı?",
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
          id: "en-a2-10-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about buying and selling old things. Answer in full sentences.",
          promptTr: "Sana eski eşya alıp satmak hakkında sorular soracağım. Tam cümlelerle cevap ver.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good afternoon. Do you buy second-hand things? What kind?", tr: "İyi günler. İkinci el eşya alır mısın? Ne tür?" },
            { who: "you", hint: "Alıp almadığını söyle ve bir örnek ver.", expect: "bir alışkanlığı örnekle anlatmak", seconds: 30 },
            { who: "partner", de: "Thank you. Is it better to sell online or at a market? Why?", tr: "Teşekkürler. İnternetten satmak mı pazarda satmak mı daha iyi? Neden?" },
            { who: "you", hint: "Tercihini söyle ve bir gerekçe ver.", expect: "bir tercihi gerekçesiyle bildirmek", seconds: 30 },
            { who: "partner", de: "Interesting. Tell me about something you sold or gave away.", tr: "İlginç. Sattığın ya da verdiğin bir şeyi anlat." },
            { who: "you", hint: "Geçmiş zamanla kısa bir anı anlat.", expect: "geçmiş zamanda kısa bir anlatı vermek", seconds: 35 },
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
              "Yes, I buy books and furniture second-hand, but never shoes. I think a market is better, because you see the thing and you can talk about the price. Last spring I sold my old desk online. Four people wrote and only one came, and he took it the same evening.",
            criteria: [
              "Cevaplar tek sözcük değil, tam cümle mi?",
              "Tercih bir gerekçeyle mi verildi? (because …)",
              "Son soruda geçmiş zaman doğru kuruldu mu?",
              "Sayı ve zaman ifadeleri kullanıldı mı?",
            ],
          },
        },
        {
          id: "en-a2-10-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Describe this situation for about one minute: a street market on a Sunday morning. Three tables stand along a wall with books, lamps and clothes on them. A man is holding an old radio and looking at the price. Behind him a child is sitting on a box. Say what you see, what the people are doing, and whether you like markets like this.",
          promptTr:
            "Şu durumu bir dakika kadar anlat: pazar sabahı bir sokak pazarı. Bir duvar boyunca üç masa var; üstlerinde kitaplar, lambalar ve giysiler. Bir adam eski bir radyoyu tutup fiyatına bakıyor. Arkasında bir çocuk bir kutunun üstünde oturuyor. Ne gördüğünü, insanların ne yaptığını ve böyle pazarları sevip sevmediğini söyle.",
          prepSeconds: 45,
          speakSeconds: 75,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "say what you see", tr: "Ne gördüğünü söyle" },
              { de: "say what the people are doing", tr: "İnsanların ne yaptığını söyle" },
              { de: "say if you like markets like this", tr: "Böyle pazarları sevip sevmediğini söyle" },
            ],
            sample:
              "This is a street market on a Sunday morning. Along the wall there are three tables with books, lamps and clothes on them. In front of the middle table a man is holding an old radio and he is looking at the price on it. Behind him a small child is sitting on a box and eating something. I like markets like this, because you find things that you cannot buy in a shop.",
            criteria: [
              "Şimdiki zaman (present continuous) kullanıldı mı? Bu görevin ana yapısı bu.",
              "Üç içerik noktasının üçü de işlendi mi?",
              "Yer bildiren ifadeler var mı? (along the wall, in front of, behind)",
              "Görüş bir gerekçeyle mi verildi?",
            ],
          },
        },
        {
          id: "en-a2-10-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "You have one free Saturday and a lot of things you do not need. Talk with me about what to do and choose one thing together.",
          promptTr:
            "Bir boş cumartesin ve ihtiyacın olmayan bir sürü eşyan var. Ne yapacağını benimle konuş ve birlikte birini seç.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "Here are three ideas: put everything online, take a table at the school market for three euros, or give it all to a charity shop. What do you think about selling online?", tr: "Üç fikir var: her şeyi internete koymak, okul pazarında üç euroya bir masa tutmak ya da hepsini bir yardım dükkânına vermek. İnternetten satmak hakkında ne düşünüyorsun?" },
            { who: "you", hint: "İnternetten satma fikri hakkında görüşünü söyle ve bir gerekçe ver.", expect: "bir fikir hakkında görüş bildirmek ve gerekçelendirmek", seconds: 35 },
            { who: "partner", de: "I see your point. But you have about forty things, and online you write forty adverts and wait at home for forty people. Is the market not easier?", tr: "Anlıyorum. Ama kırk kadar eşyan var; internette kırk ilan yazıp kırk kişiyi evde beklersin. Pazar daha kolay değil mi?" },
            { who: "you", hint: "Karşı tarafın söylediğine gönderme yap ve katıl ya da karşı çık.", expect: "karşı tarafın söylediğine açıkça gönderme yaparak katılmak ya da karşı çıkmak", seconds: 35 },
            { who: "partner", de: "All right. So what do we choose?", tr: "Peki. Hangisini seçiyoruz?" },
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
              "Online is good for two or three big things, because you get more money for them. You are right about the forty adverts; that is three evenings of work and I do not have them. So let us take a table at the market for the small things, and put the desk online, because the desk is worth eighty euros.",
            criteria: [
              "Görüş bir gerekçeyle mi verildi? (because …)",
              "Karşı tarafın söylediğine gönderme yapıldı mı? (You are right … / That is true …)",
              "Sonunda ortak bir karara varıldı mı?",
              "Sayılar (fiyat, adet) doğru kullanıldı mı?",
            ],
          },
        },
      ],
    },
  ],
};
