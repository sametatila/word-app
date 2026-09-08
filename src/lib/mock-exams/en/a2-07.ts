import type { MockPaper } from "../types";

/**
 * A2 · Deneme 7 — "Family, Friends and Celebrations".
 *
 * A2'nin öteki denemeleriyle AYNI PLAN; konu ayrı. Kutlamalar A2 için
 * verimli çünkü davet, ret ve rica dili burada uydurulmadan bulunuyor;
 * tarih, saat, kişi sayısı ve fiyat da aynı metinde doğal olarak geçiyor.
 *
 * A2 SINIRI: past simple, present continuous, `going to` / `will`,
 * karşılaştırma dereceleri, `because / when / if / but / so`.
 */
export const EN_A2_07: MockPaper = {
  id: "en-a2-07",
  course: "en",
  level: "A2",
  no: 7,
  theme: "Family, Friends and Celebrations",
  themeTr: "Aile, arkadaşlar ve kutlamalar",
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
          id: "en-a2-07-l1",
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
              title: "Saturday",
              body: `Hi Wren, the party for my mother is on Saturday at seven, not on Friday. Please do not bring a present — she has everything. If you can, bring a salad; there are twenty of us.`,
            },
            {
              kind: "text",
              id: "m2",
              genre: "Notice at a community hall",
              genreTr: "Toplum salonu duyurusu",
              title: "Hire the hall",
              body: `You can book the hall for a family party. Sixty euros for four hours, one hundred for the whole day. Music must stop at eleven. We do not have plates or glasses; bring your own.`,
            },
            {
              kind: "text",
              id: "m3",
              genre: "Email",
              genreTr: "E-posta",
              title: "The wedding in June",
              body: `Dear Uma, the wedding is on 14 June in my parents' garden. It starts at four and it is not formal — please do not buy a new dress. There is no hotel in the village, but you can stay with us.`,
            },
            {
              kind: "text",
              id: "m4",
              genre: "Note for a neighbour",
              genreTr: "Komşuya not",
              title: "Friday evening",
              body: `Hello Celik, we have a small party on Friday evening for my son. About fifteen people, music until ten. If it is too loud, please knock on the door — do not call the office.`,
            },
            {
              kind: "text",
              id: "m5",
              genre: "Message to a group",
              genreTr: "Gruba ileti",
              title: "The twentieth",
              body: `I booked the restaurant for eight people on the twentieth. It is thirty euros each, and that is the food only. Drinks are extra. If somebody cannot come, tell me before Monday; after that I pay for the empty seat.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-07-l1-1",
              no: 1,
              ref: "m1",
              text: "What does the writer ask for?",
              options: ["A present for her mother", "Something to eat", "Twenty chairs"],
              answer: 1,
              explain:
                "İleti tek bir rica taşıyor: «If you can, bring a salad». Hediye açıkça istenmiyor («please do not bring a present»); yirmi kişi sayısıdır, sandalye değil.",
            },
            {
              kind: "mcq",
              id: "en-a2-07-l1-2",
              no: 2,
              ref: "m2",
              text: "What is not in the price?",
              options: ["Plates and glasses", "The first four hours", "The music"],
              answer: 0,
              explain:
                "Duyurunun son cümlesi bunu söylüyor: «We do not have plates or glasses; bring your own». Dört saat altmış euroya dahil; müzik ise saatle sınırlı ama ücretle ilgili değil.",
            },
            {
              kind: "mcq",
              id: "en-a2-07-l1-3",
              no: 3,
              ref: "m3",
              text: "What does the email say about clothes?",
              options: ["Everybody wears black", "A new dress is necessary for the day", "Nothing special is needed"],
              answer: 2,
              explain:
                "E-posta düğünü tanımlıyor: «it is not formal — please do not buy a new dress». Renk hakkında hiçbir şey söylenmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-07-l1-4",
              no: 4,
              ref: "m4",
              text: "What does the neighbour ask?",
              options: ["To come to the party on Friday evening", "To speak to him if there is a problem", "To call the office"],
              answer: 1,
              explain:
                "Not tek bir rica taşıyor: «If it is too loud, please knock on the door». Ofisi aramak açıkça istenmiyor; davet de edilmiyor, yalnız haber veriliyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-07-l1-5",
              no: 5,
              ref: "m5",
              text: "What happens if somebody cancels after Monday?",
              options: ["The whole dinner is cancelled", "The price for everybody falls", "The writer pays for it"],
              answer: 2,
              explain:
                "Son cümle sonucu veriyor: «after that I pay for the empty seat». Yemek iptal edilmiyor ve fiyat kişi başı otuz euro olarak kalıyor.",
            },
          ],
        },
        {
          id: "en-a2-07-l2",
          no: 2,
          format: "match",
          goal: "orientation",
          prompt:
            "Read about five people, 6 to 10. Then read the eight adverts a to h. Which advert is right for each person? You use each advert once only.",
          promptTr:
            "6–10. maddelerdeki beş kişiyi oku. Sonra a'dan h'ye sekiz ilanı oku. Her kişiye hangi ilan uyar? Her ilan en fazla bir kez kullanılır.",
          options: [
            { key: "a", label: "Hall for Hire", body: "Sixty euros for four hours. Room for eighty people. Kitchen with a big fridge. Music until eleven. No plates or glasses." },
            { key: "b", label: "Cakes to Order", body: "Two days' notice. Any size, from twelve euros. We write a name on it for free. We do not deliver." },
            { key: "c", label: "Photographer for One Hour", body: "Sixty photographs, sent the same evening. Weddings, birthdays and family days. Ninety euros." },
            { key: "d", label: "Children's Games", body: "Two hours with a person who plays with the children while the adults eat. Twelve to twenty children. Fifty euros." },
            { key: "e", label: "Family Room in the Restaurant", body: "A separate room for up to sixteen people, with no extra charge. Book two weeks before. The menu is chosen in advance." },
            { key: "f", label: "Chairs and Tables", body: "We bring them in the morning and take them back on Monday. Ten chairs and two tables: thirty euros." },
            { key: "g", label: "Language Café", body: "Every Wednesday evening. Talk in three languages with people who live here. Free, and no booking." },
            { key: "h", label: "Help with Forms", body: "Thursday mornings. Somebody sits with you and reads the letter with you. Free. Bring everything you have." },
          ],
          items: [
            {
              kind: "match",
              id: "en-a2-07-l2-6",
              no: 6,
              text: "Dragan is eighty and cannot read the letters he gets from the office.",
              answer: "h",
              explain:
                "İlan tam bu hizmeti veriyor: «Somebody sits with you and reads the letter with you», üstelik ücretsiz. Dil kafesi (g) sohbet için, mektup okumak için değil.",
            },
            {
              kind: "match",
              id: "en-a2-07-l2-7",
              no: 7,
              text: "Zsofia needs somewhere for fifty people on a Saturday afternoon.",
              answer: "a",
              explain:
                "İlan kapasiteyi veriyor: «Room for eighty people», dört saati altmış euro. Elli kişi bu sınırın içinde; lokantadaki oda (e) en fazla on altı kişilik.",
            },
            {
              kind: "match",
              id: "en-a2-07-l2-8",
              no: 8,
              text: "Eyup wants a cake with his daughter's name on it for Sunday.",
              answer: "b",
              explain:
                "İlan iki koşulu birden karşılıyor: «Any size, from twelve euros» ve «We write a name on it for free». İki gün önceden sipariş yeterli; teslim yok, yani gidip alınacak.",
            },
            {
              kind: "match",
              id: "en-a2-07-l2-9",
              no: 9,
              text: "Uma is booking a restaurant for fourteen people and wants a quiet room.",
              answer: "e",
              explain:
                "İlan hem oda hem sayı veriyor: «A separate room for up to sixteen people, with no extra charge». On dört bu sınırın içinde; salon kiralamak (a) ise mutfak işi de getirir.",
            },
            {
              kind: "match",
              id: "en-a2-07-l2-10",
              no: 10,
              text: "Wren wants photographs of her parents' fortieth wedding day.",
              answer: "c",
              explain:
                "İlan konuyu sayıyor: «Weddings, birthdays and family days», altmış fotoğraf aynı akşam gönderiliyor. Başka hiçbir ilanda fotoğraf hizmeti yok.",
            },
          ],
        },
        {
          id: "en-a2-07-l3",
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
              title: "The birthday I did not want",
              body: `Last year I did not want a party for my fortieth birthday. My sister organised one anyway, and I was angry with her for two weeks before it.

The first problem was the guest list. She invited thirty people and I know about eight of them well. The others were friends of friends, and I spent the first hour saying my own name.

The second thing surprised me. At about nine o'clock my old teacher arrived. I had not seen her for twenty years and I did not know that my sister had her address. We talked until midnight and I forgot the other twenty-nine people.

The money was the difficult part. My sister paid for everything and she has less money than I do. I asked her about it twice and she changed the subject twice.

This year I organise something myself: eight people, one long table, no music. My sister says it is boring. She is coming.`,
              gloss: [
                { de: "a guest list", tr: "davetli listesi", en: "guest list" },
                { de: "to organise", tr: "düzenlemek", en: "organise" },
                { de: "boring", tr: "sıkıcı", en: "boring" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-07-l3-11",
              no: 11,
              text: "Why was the writer angry before the party?",
              options: ["A party was not what she wanted", "Her sister invited only eight people", "Her old teacher could not come"],
              answer: 0,
              explain:
                "İlk paragraf bunu söylüyor: «I did not want a party … My sister organised one anyway». Davetli sayısı sekiz değil otuz, öğretmen de saat dokuzda gelmiş.",
            },
            {
              kind: "mcq",
              id: "en-a2-07-l3-12",
              no: 12,
              text: "What was the problem with the guest list?",
              options: ["There were only eight people on it", "Her sister forgot two people from work", "Most names were new to her"],
              answer: 2,
              explain:
                "Metin sayıyı veriyor: otuz davetliden «about eight of them» iyi tanınıyor, geri kalanı arkadaş arkadaşı. Sekiz listenin uzunluğu değil, tanıdıkların sayısı.",
            },
            {
              kind: "mcq",
              id: "en-a2-07-l3-13",
              no: 13,
              text: "What surprised the writer?",
              options: ["The music was very good", "Her old teacher came", "Nobody arrived before nine"],
              answer: 1,
              explain:
                "Üçüncü paragraf sürprizi adlandırıyor: «At about nine o'clock my old teacher arrived», yirmi yıldır görülmemiş biri. Dokuz onun geliş saati, ötekilerin değil.",
            },
            {
              kind: "mcq",
              id: "en-a2-07-l3-14",
              no: 14,
              text: "What does she do this year?",
              options: ["A small dinner with eight people", "A much bigger party than last year", "Nothing at all"],
              answer: 0,
              explain:
                "Son paragraf planı veriyor: «eight people, one long table, no music». Bir şey yapılıyor, yani hiçbir şey yapmamak yanlış.",
            },
          ],
        },
        {
          id: "en-a2-07-l4",
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
              title: "Nine years next to my grandmother",
              body: `I lived in the same street as my grandmother for nine years, and here is what I {{15}}.

Visit at a bad time. A short visit on a normal Tuesday is {{16}} than a long one at Christmas.

Do not ask what she wants for her birthday. She will say nothing, {{17}} she will keep the small thing you choose for years.

Next month I {{18}} move to another city, and I am already thinking about the train.

And the last thing: {{19}} you take a photograph, print it. Nobody looks at a telephone twice.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-07-l4-15",
              no: 15,
              text: "Gap 15",
              options: ["learn", "learning", "learned"],
              answer: 2,
              explain:
                "Cümlenin ilk yarısı kapanmış bir dönemi anlatıyor: «I lived … for nine years». Bu yüzden öğrenme de geçmişe ait: `learned`. `learn` geniş zaman, `learning` ise yardımcı fiil olmadan yüklem olamaz.",
            },
            {
              kind: "mcq",
              id: "en-a2-07-l4-16",
              no: 16,
              text: "Gap 16",
              options: ["good", "better", "the best"],
              answer: 1,
              explain:
                "Boşluktan sonra `than` var; `than` karşılaştırma derecesi ister ve `good` sıfatının karşılaştırması `better`dır. `the best` en üstünlük derecesidir.",
            },
            {
              kind: "mcq",
              id: "en-a2-07-l4-17",
              no: 17,
              text: "Gap 17",
              options: ["but", "so", "because"],
              answer: 0,
              explain:
                "İki bilgi karşıt: hiçbir şey istemeyecek, ama seçtiğin küçük şeyi yıllarca saklayacak. Karşıtlığı `but` kurar; `so` sonuç, `because` sebep bildirir.",
            },
            {
              kind: "mcq",
              id: "en-a2-07-l4-18",
              no: 18,
              text: "Gap 18",
              options: ["went to", "goes to", "am going to"],
              answer: 2,
              explain:
                "Zaman belirteci `Next month`, yani gelecek; planlanmış bir gelecek için `am going to + fiil` kullanılır. `went to` geçmiş, `goes to` ise birinci tekil kişiyle uyuşmaz.",
            },
            {
              kind: "mcq",
              id: "en-a2-07-l4-19",
              no: 19,
              text: "Gap 19",
              options: ["so", "when", "because"],
              answer: 1,
              explain:
                "Cümle bir durumu öğüde bağlıyor: fotoğraf çektiğin zaman bas. `when` bu koşullu zamanı verir; `so` sonuç, `because` sebep bildirir ve ikisi de baştaki yan cümleyi kuramaz.",
            },
          ],
        },
        {
          id: "en-a2-07-l5",
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
              title: "A photograph on my wall",
              body: `My grandmother was born {{20}} a small village in the north.

She married {{21}} nineteen and she had four children before she was thirty.

She never learned to drive, {{22}} she walked everywhere until she was eighty-four.

The photograph on my wall was taken {{23}} her sixtieth birthday.

I look at it every morning, and I still {{24}} not know who is standing next to her.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a2-07-l5-20",
              no: 20,
              text: "Gap 20",
              accept: ["in"],
              explain:
                "Yerleşim yeri adlarıyla `in` kullanılır: `in a small village`. `at` bir noktayı, `on` ise bir yüzeyi ya da caddeyi bildirir.",
            },
            {
              kind: "gap",
              id: "en-a2-07-l5-21",
              no: 21,
              text: "Gap 21",
              accept: ["at"],
              explain:
                "Yaş bildirirken `at` kullanılır: `married at nineteen`. `in nineteen` bir yılı çağrıştırır, `on nineteen` ise kalıp değildir.",
            },
            {
              kind: "gap",
              id: "en-a2-07-l5-22",
              no: 22,
              text: "Gap 22",
              accept: ["so"],
              explain:
                "İkinci yarı birincinin sonucu: araba kullanmayı öğrenmediği için her yere yürümüş. `so` sonucu verir; `but` karşıtlık ister ve burada karşıtlık yok.",
            },
            {
              kind: "gap",
              id: "en-a2-07-l5-23",
              no: 23,
              text: "Gap 23",
              accept: ["on"],
              explain:
                "Belirli bir gün için `on` kullanılır ve doğum günü bir gündür: `on her sixtieth birthday`. `in` ay ve yıl için, `at` ise saat için gelir.",
            },
            {
              kind: "gap",
              id: "en-a2-07-l5-24",
              no: 24,
              text: "Gap 24",
              accept: ["do"],
              explain:
                "Geniş zamanın olumsuzu `do not + yalın fiil` ile kurulur ve özne birinci tekil kişi: «I still do not know». `am not` bir fiille değil, sıfat ya da adla gelir.",
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
          id: "en-a2-07-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "You hear five short conversations, questions 1 to 5. Choose a, b or c. You hear every recording twice.",
          promptTr: "Beş kısa konuşma dinleyeceksin, 1–5. maddeler. a, b ya da c'yi seç. Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki arkadaş bir düğün davetini konuşuyor.",
              plays: 2,
              segments: [
                { text: "Are you coming to the wedding?" },
                { text: "I have the invitation but I have not answered." },
                { text: "Why not?" },
                { text: "It is four hundred kilometres and I have two days off. I want to go and I do not know how." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Phone call",
              genreTr: "Telefon görüşmesi",
              situation: "Bir kişi salon kiralamak için arıyor.",
              plays: 2,
              segments: [
                { text: "Hello, is the hall free on the fourteenth?" },
                { text: "In the afternoon, yes. In the evening there is already a party." },
                { text: "Then the afternoon. How much?" },
                { text: "Sixty euros for four hours." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "At home",
              genreTr: "Evde",
              situation: "İki arkadaş bir pastadan söz ediyor.",
              plays: 2,
              segments: [
                { text: "Did you like the cake?" },
                { text: "My son made it. He is eleven." },
                { text: "Really?" },
                { text: "He put too much sugar in, but nobody says that to a boy of eleven." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "In a shop",
              genreTr: "Dükkânda",
              situation: "Bir müşteri fotoğraf bastırıyor.",
              plays: 2,
              segments: [
                { text: "How much are twenty photographs?" },
                { text: "Twelve euros, or twenty for fifty photographs." },
                { text: "I need twenty-five." },
                { text: "Then the second price is better." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Phone message",
              genreTr: "Telefon iletisi",
              situation: "Lokanta rezervasyon için ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello, this is the restaurant about your table for eight on the twentieth. We can do it, but only at six or at nine, not at eight. Please call back today." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-07-h1-1",
              no: 1,
              ref: "a1",
              text: "What is the problem?",
              options: ["The distance and the time", "She has no invitation", "She does not want to go at all"],
              answer: 0,
              explain:
                "Konuşmacı iki engeli birlikte veriyor: «It is four hundred kilometres and I have two days off». Davetiye elinde ve gitmek istiyor: «I want to go».",
            },
            {
              kind: "mcq",
              id: "en-a2-07-h1-2",
              no: 2,
              ref: "a2",
              text: "When can the caller have the hall?",
              options: ["All day", "In the evening until eleven", "In the afternoon"],
              answer: 2,
              explain:
                "Görevli ayrımı yapıyor: «In the afternoon, yes. In the evening there is already a party». Bütün gün mümkün değil.",
            },
            {
              kind: "mcq",
              id: "en-a2-07-h1-3",
              no: 3,
              ref: "a3",
              text: "Who made the cake?",
              options: ["A shop in the town centre", "The speaker's son", "The speaker"],
              answer: 1,
              explain:
                "Cevap doğrudan veriliyor: «My son made it. He is eleven». Şeker fazlalığı da onun hakkında söyleniyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-07-h1-4",
              no: 4,
              ref: "a4",
              text: "What does the assistant suggest?",
              options: ["The bigger set", "Twelve euros", "Coming back later"],
              answer: 0,
              explain:
                "Müşteri yirmi beş fotoğraf istiyor ve görevli «Then the second price is better» diyor: elli fotoğraf için yirmi euro. On iki euro yalnız yirmi fotoğrafın fiyatı.",
            },
            {
              kind: "mcq",
              id: "en-a2-07-h1-5",
              no: 5,
              ref: "a5",
              text: "What is the problem?",
              options: ["The number of people", "The date", "The time"],
              answer: 2,
              explain:
                "Lokanta günü ve kişi sayısını kabul ediyor, saati değiştiriyor: «only at six or at nine, not at eight».",
            },
          ],
        },
        {
          id: "en-a2-07-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear information about a family day. Complete the notes, questions 6 to 10. Write ONE or TWO words or a number in each gap. You hear the information twice.",
          promptTr:
            "Bir aile günü hakkında bilgi dinleyeceksin. 6–10. maddelerdeki notları tamamla. Her boşluğa BİR ya da İKİ sözcük veya bir sayı yaz. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Information",
              genreTr: "Bilgilendirme",
              situation: "Bir görevli aile gününü anlatıyor.",
              plays: 2,
              segments: [
                {
                  text: "Hello and thank you for coming. The family day is on the ninth of May and it starts at eleven. It is free for children and three euros for adults. There is food from twelve to two: soup, bread and cake. Please bring a plate and a cup; we have none. And the room is on the first floor, not in the garden, because of the weather.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notes",
              genreTr: "Not kâğıdı",
              title: "Family day — notes",
              body: `Date:                {{6}} May
Starts at:           {{7}}
Price for adults:    {{8}} euros
Food is served from: {{9}} to two
Please bring a plate and a {{10}}`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a2-07-h2-6",
              no: 6,
              ref: "b1",
              text: "Gap 6",
              accept: ["9", "ninth", "9th"],
              explain:
                "Kayıt «on the ninth of May» diyor. Not kâğıdında `May` basılı olduğu için boşluğa yalnız gün yazılır; rakam da yazı da kabul edilir.",
            },
            {
              kind: "gap",
              id: "en-a2-07-h2-7",
              no: 7,
              ref: "b1",
              text: "Gap 7",
              accept: ["11", "eleven"],
              explain:
                "«it starts at eleven» — başlama saati. On iki ve iki yemek saatleri; üç sayıyı ayırmak gerekiyor.",
            },
            {
              kind: "gap",
              id: "en-a2-07-h2-8",
              no: 8,
              ref: "b1",
              text: "Gap 8",
              accept: ["3", "three"],
              explain:
                "«It is free for children and three euros for adults» — yetişkin ücreti. Çocuklar ücretsiz; not kâğıdı yetişkin fiyatını istiyor.",
            },
            {
              kind: "gap",
              id: "en-a2-07-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["12", "twelve"],
              explain:
                "«There is food from twelve to two» — yemek başlangıcı. Not kâğıdında `to two` basılı olduğu için boşluğa yalnız başlangıç saati yazılır.",
            },
            {
              kind: "gap",
              id: "en-a2-07-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["cup"],
              explain:
                "Kayıt iki şey istiyor: «Please bring a plate and a cup». Not kâğıdında tabak zaten yazılı, boşluğa ikincisi geliyor.",
            },
          ],
        },
        {
          id: "en-a2-07-h3",
          no: 3,
          format: "mcq",
          goal: "gist",
          prompt: "You hear five short speakers, questions 11 to 15. What is each person doing? You hear every recording twice.",
          promptTr: "Beş kısa konuşmacı dinleyeceksin, 11–15. maddeler. Her kişi ne yapıyor? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "At a meeting",
              genreTr: "Toplantıda",
              situation: "Bir kişi salon kurallarından söz ediyor.",
              plays: 2,
              segments: [
                { text: "I know the hall closes at eleven. But the music was off at half past ten and we were only carrying chairs. Could the caretaker not have waited ten minutes?" },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "Announcement",
              genreTr: "Duyuru",
              situation: "Bir etkinlikte anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "The green forms are for members and the white ones for guests. Please do not put a phone number on the white form; we do not keep them." },
              ],
            },
            {
              kind: "audio",
              id: "c3",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Radyoda bir dinleyici konuşuyor.",
              plays: 2,
              segments: [
                { text: "I lived next to that family for fourteen years and I never went in. Then their daughter got married and they invited the whole street. Now we eat together every month." },
              ],
            },
            {
              kind: "audio",
              id: "c4",
              genre: "Phone call",
              genreTr: "Telefon görüşmesi",
              situation: "Bir müşteri pastacıyı arıyor.",
              plays: 2,
              segments: [
                { text: "Yes, hello, this is about the cake for Saturday. I ordered it for twelve people and the shop says it is ready, but the name on it is wrong. Can somebody look at it?" },
              ],
            },
            {
              kind: "audio",
              id: "c5",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Radyoda bir konuşmacı görüş bildiriyor.",
              plays: 2,
              segments: [
                { text: "A lot of people think a party has to be big. It usually is, but nobody remembers a room with sixty people in it. They remember the four people they talked to." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-07-h3-11",
              no: 11,
              ref: "c1",
              text: "What is the speaker doing?",
              options: ["Asking for a booking next month", "Complaining about a decision", "Saying sorry for the noise"],
              answer: 1,
              explain:
                "Konuşmacı kuralı biliyor ama uygulamayı sorguluyor: «Could the caretaker not have waited ten minutes?». Özür dilemiyor, müzik zaten kapatılmış.",
            },
            {
              kind: "mcq",
              id: "en-a2-07-h3-12",
              no: 12,
              ref: "c2",
              text: "What is the announcement about?",
              options: ["Which form to use", "The price of the room", "The time of the party"],
              answer: 0,
              explain:
                "Anons iki formu ayırıyor: «The green forms are for members and the white ones for guests». Fiyat ve saat kayıtta hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-07-h3-13",
              no: 13,
              ref: "c3",
              text: "What is the speaker doing?",
              options: ["Complaining about the noisy neighbours", "Inviting people", "Explaining how something changed"],
              answer: 2,
              explain:
                "Anlatı bir değişimi veriyor: on dört yıl hiç girilmemiş, bir düğün davetinden sonra «Now we eat together every month». Şikâyet ya da davet yok.",
            },
            {
              kind: "mcq",
              id: "en-a2-07-h3-14",
              no: 14,
              ref: "c4",
              text: "Why is the person calling?",
              options: ["The cake is much too small", "Somebody wrote the wrong name", "The cake is late again"],
              answer: 1,
              explain:
                "Arayan sorunu adlandırıyor: pasta hazır ama «the name on it is wrong». Boyut on iki kişilik olarak sipariş edilmiş ve gecikme yok.",
            },
            {
              kind: "mcq",
              id: "en-a2-07-h3-15",
              no: 15,
              ref: "c5",
              text: "What is the speaker doing?",
              options: ["Correcting a common idea", "Inviting people to a party", "Asking for help"],
              answer: 0,
              explain:
                "Konuşmacı yaygın inancı anıp sınırlıyor: «A lot of people think a party has to be big … nobody remembers a room with sixty people in it».",
            },
          ],
        },
        {
          id: "en-a2-07-h4",
          no: 4,
          format: "match",
          goal: "detail",
          prompt:
            "You hear five people, questions 16 to 20. Why did each person not go to the party? Choose from a to h. You use each answer once only. You hear the recordings twice.",
          promptTr:
            "Beş kişi dinleyeceksin, 16–20. maddeler. Her kişi partiye neden gitmedi? a'dan h'ye seç. Her seçenek en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "The journey was too long." },
            { key: "b", label: "Somebody in the family was ill." },
            { key: "c", label: "They had to work." },
            { key: "d", label: "They were not invited early enough." },
            { key: "e", label: "They do not like large groups." },
            { key: "f", label: "The date changed." },
            { key: "g", label: "They had no present." },
            { key: "h", label: "The place was hard to reach without a car." },
          ],
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Speaker 1",
              genreTr: "Birinci konuşmacı",
              situation: "Birinci konuşmacı davetiyenin geliş zamanından söz ediyor.",
              plays: 2,
              segments: [
                { text: "The invitation came on the Wednesday for the Saturday. By then I had two other things in the diary and I could not move either of them." },
              ],
            },
            {
              kind: "audio",
              id: "d2",
              genre: "Speaker 2",
              genreTr: "İkinci konuşmacı",
              situation: "İkinci konuşmacı ulaşımdan söz ediyor.",
              plays: 2,
              segments: [
                { text: "It was in a village with one bus a day, and the bus back was at seven. A taxi was ninety euros. I sent a card instead." },
              ],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü konuşmacı o geceyi anlatıyor.",
              plays: 2,
              segments: [
                { text: "My daughter had a temperature on the Friday night. Nothing serious, but you do not take a child of two to a room with fifty people." },
              ],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Speaker 4",
              genreTr: "Dördüncü konuşmacı",
              situation: "Dördüncü konuşmacı o akşamki vardiyasından söz ediyor.",
              plays: 2,
              segments: [
                { text: "I was in the shop until eight and the party started at seven. My colleague was ill and somebody had to be there." },
              ],
            },
            {
              kind: "audio",
              id: "d5",
              genre: "Speaker 5",
              genreTr: "Beşinci konuşmacı",
              situation: "Beşinci konuşmacı kapıya kadar gittiğini anlatıyor.",
              plays: 2,
              segments: [
                { text: "I said yes, and then I stood outside for ten minutes and went home. Sixty people in one room is not a thing I can do." },
              ],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-a2-07-h4-16",
              no: 16,
              ref: "d1",
              text: "Speaker 1",
              answer: "d",
              explain:
                "Davetiye çarşamba geliyor, parti cumartesi: «By then I had two other things in the diary». Sorun mesafe ya da istek değil, haberin geç gelmesi.",
            },
            {
              kind: "match",
              id: "en-a2-07-h4-17",
              no: 17,
              ref: "d2",
              text: "Speaker 2",
              answer: "h",
              explain:
                "Konuşmacı ulaşımı anlatıyor: «a village with one bus a day», dönüş yedide ve «A taxi was ninety euros». Araba olmadan ulaşmak mümkün değil; sorun mesafenin uzunluğu değil.",
            },
            {
              kind: "match",
              id: "en-a2-07-h4-18",
              no: 18,
              ref: "d3",
              text: "Speaker 3",
              answer: "b",
              explain:
                "Kızının ateşi çıkmış: «My daughter had a temperature on the Friday night». Ciddi değil ama iki yaşındaki çocuk elli kişilik odaya götürülmüyor.",
            },
            {
              kind: "match",
              id: "en-a2-07-h4-19",
              no: 19,
              ref: "d4",
              text: "Speaker 4",
              answer: "c",
              explain:
                "Konuşmacı sekize kadar dükkândaymış ve parti yedide başlamış: «My colleague was ill and somebody had to be there». Hasta olan kendisi değil, meslektaşı.",
            },
            {
              kind: "match",
              id: "en-a2-07-h4-20",
              no: 20,
              ref: "d5",
              text: "Speaker 5",
              answer: "e",
              explain:
                "Konuşmacı kapıya kadar gitmiş ama girememiş: «Sixty people in one room is not a thing I can do». Ulaşım ya da zaman sorunu yok.",
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
          id: "en-a2-07-w1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "You are having a small celebration at home and you want to invite your English friend Wren. Write an email to Wren. Write about 50 words. Answer all three points.",
          promptTr:
            "Evinde küçük bir kutlama yapıyorsun ve İngiliz arkadaşın Wren'i davet etmek istiyorsun. Wren'e bir e-posta yaz. Yaklaşık 50 kelime. Üç maddenin hepsine cevap ver.",
          items: [],
          rubric: {
            minWords: 50,
            points: [
              { de: "Say what you are celebrating and when.", tr: "Neyi ne zaman kutladığını söyle." },
              { de: "Say who else is coming.", tr: "Başka kimlerin geleceğini söyle." },
              { de: "Say what Wren should bring, or that she should bring nothing.", tr: "Wren'in ne getirmesi gerektiğini, ya da hiçbir şey getirmemesini söyle." },
            ],
            sample: `Hi Wren,

My sister finished her studies, so we have a small party on Saturday at seven at my flat.

There are about ten of us: my family and two friends from work. Everybody speaks English.

Please do not bring a present. If you want, bring some music!

See you on Saturday!
Zsofia`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi? Biri eksikse metin tam sayılmaz.",
              "Gün ve saat açıkça verildi mi?",
              "Kimlerin geleceği somut mu söylendi?",
              "Rica kibar bir kalıpla mı kuruldu? (Please … / If you want …)",
              "Yaklaşık 50 kelime yazıldı mı? Hitap ve veda var mı?",
            ],
          },
        },
        {
          id: "en-a2-07-w2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Write a short text about a celebration that did not go as you planned. Say what the celebration was, what went wrong and what you did. Write about 60 words.",
          promptTr:
            "Planladığın gibi gitmeyen bir kutlamayı anlat. Kutlamanın ne olduğunu, neyin ters gittiğini ve ne yaptığını yaz. Yaklaşık 60 kelime.",
          items: [],
          rubric: {
            minWords: 60,
            points: [
              { de: "Say what the celebration was.", tr: "Kutlamanın ne olduğunu söyle." },
              { de: "Say what went wrong.", tr: "Neyin ters gittiğini söyle." },
              { de: "Say what you did in the end.", tr: "Sonunda ne yaptığını söyle." },
            ],
            sample: `Two years ago we made a party in the garden for my father's sixtieth birthday. We put twenty chairs outside and my brother cooked all morning. At four o'clock the sky went black and it rained for two hours. Everybody came into the flat and we sat on the floor with the food on our knees. My father says it was his best birthday.`,
            criteria: [
              "Üç içerik noktasının üçü de var mı?",
              "Geçmiş zaman doğru kullanıldı mı? Düzensiz fiiller (put, went, sat) doğru mu?",
              "Olaylar sıra bildiren sözcüklerle mi bağlandı? (at four o'clock, then, in the end)",
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
          id: "en-a2-07-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about your family and about celebrations. Answer in full sentences.",
          promptTr: "Sana ailen ve kutlamalar hakkında sorular soracağım. Tam cümlelerle cevap ver.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good afternoon. Tell me about your family. Who do you see most often?", tr: "İyi günler. Aileni anlat. En sık kimi görüyorsun?" },
            { who: "you", hint: "Aileni kısaca anlat ve ne sıklıkta görüştüğünü söyle.", expect: "aileyi tam bir cümleyle betimlemek ve sıklık bildirmek", seconds: 30 },
            { who: "partner", de: "Thank you. Do you prefer a big party or a small dinner? Why?", tr: "Teşekkürler. Büyük bir parti mi küçük bir yemek mi tercih edersin? Neden?" },
            { who: "you", hint: "Tercihini söyle ve bir gerekçe ver.", expect: "bir tercihi gerekçesiyle bildirmek", seconds: 30 },
            { who: "partner", de: "Interesting. Tell me about a celebration you went to last year.", tr: "İlginç. Geçen yıl gittiğin bir kutlamayı anlat." },
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
              "I have one sister and two nephews. I see my sister every week because she lives in the next street. I prefer a small dinner, because at a big party I talk to nobody for more than two minutes. Last year I went to my cousin's wedding in a village. It rained all day and we danced inside.",
            criteria: [
              "Cevaplar tek sözcük değil, tam cümle mi?",
              "Tercih bir gerekçeyle mi verildi? (because …)",
              "Son soruda geçmiş zaman doğru kuruldu mu?",
              "Sıklık ve zaman ifadeleri kullanıldı mı?",
            ],
          },
        },
        {
          id: "en-a2-07-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Describe this situation for about one minute: a birthday party in a small flat. Six people are standing around a table with a cake on it. A woman is taking a photograph and a child is looking at the presents. Say what you see, what the people are doing, and whether you like birthday parties.",
          promptTr:
            "Şu durumu bir dakika kadar anlat: küçük bir dairede doğum günü partisi. Altı kişi üstünde pasta olan bir masanın çevresinde duruyor. Bir kadın fotoğraf çekiyor ve bir çocuk hediyelere bakıyor. Ne gördüğünü, insanların ne yaptığını ve doğum günü partilerini sevip sevmediğini söyle.",
          prepSeconds: 45,
          speakSeconds: 75,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "say what you see", tr: "Ne gördüğünü söyle" },
              { de: "say what the people are doing", tr: "İnsanların ne yaptığını söyle" },
              { de: "say if you like birthday parties", tr: "Doğum günü partilerini sevip sevmediğini söyle" },
            ],
            sample:
              "This is a birthday party in a small flat. In the middle there is a table with a big cake and eight candles. Six people are standing around it and they are singing. On the left a woman is taking a photograph with her phone. Behind her a child is looking at the presents and he is not interested in the cake. I like birthday parties because everybody talks to everybody.",
            criteria: [
              "Şimdiki zaman (present continuous) kullanıldı mı? Bu görevin ana yapısı bu.",
              "Üç içerik noktasının üçü de işlendi mi?",
              "Yer bildiren ifadeler var mı? (in the middle, on the left, behind)",
              "Görüş bir gerekçeyle mi verildi?",
            ],
          },
        },
        {
          id: "en-a2-07-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Your family wants to do something for your grandmother's eightieth birthday. Talk with me about the ideas and choose one together.",
          promptTr:
            "Ailen büyükannenin sekseninci yaş günü için bir şey yapmak istiyor. Fikirleri benimle konuş ve birlikte birini seç.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "Here are three ideas: a big party in a hall, a small dinner at home, or a day out with the whole family. What do you think about the big party?", tr: "Üç fikir var: salonda büyük bir parti, evde küçük bir yemek ya da bütün aileyle bir gezi. Büyük parti hakkında ne düşünüyorsun?" },
            { who: "you", hint: "Büyük parti fikri hakkında görüşünü söyle ve bir gerekçe ver.", expect: "bir fikir hakkında görüş bildirmek ve gerekçelendirmek", seconds: 35 },
            { who: "partner", de: "I see your point. But a hall is expensive and your grandmother gets tired after two hours. Is the dinner at home a better idea?", tr: "Anlıyorum. Ama salon pahalı ve büyükannen iki saat sonra yoruluyor. Evde yemek daha mı iyi bir fikir?" },
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
              "I think a big party is nice because she has a very large family and she sees them once a year. You are right about the time, that is a real problem for her. If we do it at home, she can go to her room when she is tired. So let us make a dinner at home and invite twelve people, not forty.",
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
