import type { MockPaper } from "../types";

/**
 * A2 · Deneme 5 — "Food, Cooking and Eating Out".
 *
 * A2'nin öteki denemeleriyle AYNI PLAN; konu ayrı. Yemek A2 için verimli
 * bir alan çünkü fiyat, miktar, saat ve karşılaştırma aynı metinde doğal
 * olarak bulunuyor; uydurulmuş bir bağlama gerek kalmadan seviyenin
 * ölçmesi gereken her şey bir menüde ya da bir rezervasyonda geçiyor.
 *
 * A2 SINIRI: past simple, present continuous, `going to` / `will`,
 * karşılaştırma dereceleri, `because / when / if / but / so`. Üçüncü tip
 * koşul, ortaç öbeği ve devrik yapı yok.
 */
export const EN_A2_05: MockPaper = {
  id: "en-a2-05",
  course: "en",
  level: "A2",
  no: 5,
  theme: "Food, Cooking and Eating Out",
  themeTr: "Yemek, mutfak ve dışarıda yeme",
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
          id: "en-a2-05-l1",
          no: 1,
          format: "mcq",
          goal: "gist",
          prompt: "Read the five short texts and questions 1 to 5. What is the main message? Choose a, b or c.",
          promptTr: "Beş kısa metni ve 1–5. maddeleri oku. Ana mesaj nedir? a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "m1",
              genre: "Email from a restaurant",
              genreTr: "Lokantadan e-posta",
              title: "Your table on Friday",
              body: `Dear Ms Baran, we have your table for four on Friday at eight. If you are more than fifteen minutes late we cannot keep it. Please tell us today if somebody in your group does not eat meat.`,
            },
            {
              kind: "text",
              id: "m2",
              genre: "Notice in a canteen",
              genreTr: "Yemekhane duyurusu",
              title: "From Monday",
              body: `The hot food finishes at two, not at half past two. Sandwiches and salads are on the counter until four. Coffee is free after three for people with a staff card.`,
            },
            {
              kind: "text",
              id: "m3",
              genre: "Email",
              genreTr: "E-posta",
              title: "Your cooking course",
              body: `Dear Fabio, thank you for your booking. Bring an apron and a sharp knife. We give you everything else. The course is in the school kitchen, not in room 12. Please arrive ten minutes early.`,
            },
            {
              kind: "text",
              id: "m4",
              genre: "Note for a flatmate",
              genreTr: "Ev arkadaşına not",
              title: "Soup",
              body: `Toni, I made soup and it is in the big pot. There is enough for two. Please put the pot in the fridge tonight, not on the balcony. The bread on the table is three days old; do not eat it.`,
            },
            {
              kind: "text",
              id: "m5",
              genre: "Message to a group",
              genreTr: "Gruba ileti",
              title: "Saturday",
              body: `I booked the small room at the Italian place for Saturday. It is twenty euros for each person and that is everything: food, water and coffee. Drinks with alcohol are not in the price. Send me the money before Thursday.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-05-l1-1",
              no: 1,
              ref: "m1",
              text: "What does the restaurant want to know today?",
              options: ["How many people are coming", "What time the group arrives", "If a guest eats no meat"],
              answer: 2,
              explain:
                "E-posta tek bir bilgi istiyor: «Please tell us today if somebody in your group does not eat meat». Kişi sayısı (dört) ve saat (sekiz) zaten yazılı, yani sorulan onlar değil.",
            },
            {
              kind: "mcq",
              id: "en-a2-05-l1-2",
              no: 2,
              ref: "m2",
              text: "What changes on Monday?",
              options: ["The price of the hot food", "The end time for hot food", "The coffee is no longer free"],
              answer: 1,
              explain:
                "Duyuru saati düzeltiyor: «The hot food finishes at two, not at half past two». Kahve üçten sonra hâlâ ücretsiz; fiyattan hiç söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-05-l1-3",
              no: 3,
              ref: "m3",
              text: "What must Fabio bring?",
              options: ["A knife and something to wear", "The food for the whole of the lesson", "The room number"],
              answer: 0,
              explain:
                "E-posta iki şey sayıyor: «Bring an apron and a sharp knife» ve hemen ekliyor: «We give you everything else». Oda bilgisi bir düzeltme, getirilecek bir şey değil.",
            },
            {
              kind: "mcq",
              id: "en-a2-05-l1-4",
              no: 4,
              ref: "m4",
              text: "What does the note ask Toni to do?",
              options: ["Cook something for two people", "Buy fresh bread today", "Put the soup in the fridge"],
              answer: 2,
              explain:
                "Not tek bir rica taşıyor: «Please put the pot in the fridge tonight, not on the balcony». Çorba zaten pişmiş; ekmek için istenen şey almak değil, yememek.",
            },
            {
              kind: "mcq",
              id: "en-a2-05-l1-5",
              no: 5,
              ref: "m5",
              text: "What is not in the twenty euros?",
              options: ["Anything with alcohol in it", "The coffee at the end of the meal", "Water"],
              answer: 0,
              explain:
                "İleti önce dahil olanları sayıyor («food, water and coffee»), sonra istisnayı veriyor: «Drinks with alcohol are not in the price». Su ve kahve fiyatın içinde.",
            },
          ],
        },
        {
          id: "en-a2-05-l2",
          no: 2,
          format: "match",
          goal: "orientation",
          prompt:
            "Read about five people, 6 to 10. Then read the eight adverts a to h. Which advert is right for each person? You use each advert once only.",
          promptTr:
            "6–10. maddelerdeki beş kişiyi oku. Sonra a'dan h'ye sekiz ilanı oku. Her kişiye hangi ilan uyar? Her ilan en fazla bir kez kullanılır.",
          options: [
            { key: "a", label: "Sunday Kitchen", body: "Every Sunday from eleven to two. One big table, one dish, whatever the cook makes that week. Ten euros. Children eat free." },
            { key: "b", label: "Bread Course", body: "Four Tuesday evenings. You make one loaf each week and take it home. All the flour is included. Sixty euros for the four evenings." },
            { key: "c", label: "Box for Two", body: "A box with everything for three meals, delivered on Thursday. Meat, fish or vegetables only. Thirty-two euros a week. You can stop any week." },
            { key: "d", label: "Late Kitchen", body: "Hot food until one in the morning, seven days a week. Small menu, no bookings. Near the station, downstairs." },
            { key: "e", label: "Garden Café", body: "Open from nine to five. Cakes, coffee and a light lunch. Quiet, with a garden. No music at any time." },
            { key: "f", label: "Knife Sharpening", body: "Bring your knives on the first Saturday of the month to the market. Two euros each, while you wait, in about ten minutes." },
            { key: "g", label: "Free Fridge", body: "Take what you need, leave what you do not. Behind the library, open all day. Please do not leave cooked food." },
            { key: "h", label: "School Cook Wanted", body: "Two mornings a week, term time only. You cook for sixty children. Experience with a big kitchen is necessary." },
          ],
          items: [
            {
              kind: "match",
              id: "en-a2-05-l2-6",
              no: 6,
              text: "Esme finishes work at midnight and often has nothing to eat at home.",
              answer: "d",
              explain:
                "İlan saati veriyor: «Hot food until one in the morning, seven days a week». Gece yarısı bu aralığın içinde; pazar mutfağı (a) yalnız pazar öğlen, bahçe kafesi (e) beşte kapanıyor.",
            },
            {
              kind: "match",
              id: "en-a2-05-l2-7",
              no: 7,
              text: "Fabio wants to learn one thing well and take the result home.",
              answer: "b",
              explain:
                "İlan tam bunu veriyor: «You make one loaf each week and take it home». Tek bir konuya odaklı dört akşam; kutu (c) hazır malzeme yollar, ders vermez.",
            },
            {
              kind: "match",
              id: "en-a2-05-l2-8",
              no: 8,
              text: "Toni cooks for two people and never knows what to buy.",
              answer: "c",
              explain:
                "İlan hem kişi sayısını hem sorunu karşılıyor: «A box with everything for three meals» ve haftalık teslim. Alışveriş kararını kutu veriyor; istediği hafta bırakabiliyor.",
            },
            {
              kind: "match",
              id: "en-a2-05-l2-9",
              no: 9,
              text: "Gita wants a quiet place for a coffee with her mother, without music.",
              answer: "e",
              explain:
                "İlan üç ölçütü de karşılıyor: «Cakes, coffee and a light lunch», «Quiet, with a garden» ve «No music at any time». Öteki ilanlarda müzik ya da sessizlik hiç geçmiyor.",
            },
            {
              kind: "match",
              id: "en-a2-05-l2-10",
              no: 10,
              text: "Remi has old kitchen knives and does not want to buy new ones.",
              answer: "f",
              explain:
                "İlan nesneyi adıyla sayıyor: «Bring your knives … Two euros each, while you wait». Yeni almak değil, olanı bilemek isteniyor.",
            },
          ],
        },
        {
          id: "en-a2-05-l3",
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
              title: "I cooked the same meal every Monday",
              body: `Last winter I cooked the same meal every Monday for four weeks. My friends said it was a strange idea. They were wrong about the reason, and here is what happened.

The meal was rice with vegetables and one egg. The first Monday it took me fifty minutes. The fourth Monday it took eighteen, because I did not think any more. My hands knew the order.

The second thing was money. Four times the same shopping list is cheaper than four different ones, because nothing stays in the fridge and goes bad. I saved about nine euros in the month.

The problem was not the food. The problem was other people. When somebody came for dinner on a Monday, I made something else, and then the whole system stopped for a week.

Now I do it with two meals, not one. It is less boring and it still works. My friends are not convinced, but they eat the rice when they come.`,
              gloss: [
                { de: "a shopping list", tr: "alışveriş listesi", en: "shopping list" },
                { de: "to go bad", tr: "bozulmak", en: "go bad" },
                { de: "boring", tr: "sıkıcı", en: "boring" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-05-l3-11",
              no: 11,
              text: "Why was the fourth Monday faster?",
              options: ["She bought better vegetables that week", "She did not have to think about it", "She cooked less food"],
              answer: 1,
              explain:
                "Metin sebebi veriyor: «because I did not think any more. My hands knew the order». Miktar değişmiyor ve sebzelerin kalitesinden hiç söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-05-l3-12",
              no: 12,
              text: "Why did she save money?",
              options: ["Nothing went bad in the fridge", "The rice was cheaper than meat", "She ate in a restaurant less often"],
              answer: 0,
              explain:
                "Gerekçe cümlenin içinde: «because nothing stays in the fridge and goes bad». Pirinç ile et karşılaştırılmıyor; lokanta hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-05-l3-13",
              no: 13,
              text: "What stopped the system?",
              options: ["The food was boring", "The shopping list changed", "Visitors on a Monday"],
              answer: 2,
              explain:
                "Metin sorunu adlandırıyor: «The problem was other people», çünkü pazartesi misafir gelince başka bir şey pişiriliyor ve düzen bir hafta duruyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-05-l3-14",
              no: 14,
              text: "What does she do now?",
              options: ["She cooks the same meal every day of the week", "She uses two meals instead of one", "She has stopped the experiment"],
              answer: 1,
              explain:
                "Son paragraf: «Now I do it with two meals, not one». Düzen sürüyor, yani bırakılmış değil; her gün değil, yine haftada bir gün.",
            },
          ],
        },
        {
          id: "en-a2-05-l4",
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
              title: "Four things I learned in a small kitchen",
              body: `I cooked in a very small kitchen for six years, and here is what I {{15}}.

Wash while you cook. A kitchen with clean pans is {{16}} than a kitchen with a mountain in the sink.

Buy one good knife. A cheap knife is not dangerous because it cuts; it is dangerous {{17}} it does not cut.

Next month I {{18}} move into a flat with a bigger kitchen, and I am a little sad about it.

And the last rule: {{19}} you finish the milk, write it on the list on the door.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-05-l4-15",
              no: 15,
              text: "Gap 15",
              options: ["learned", "learn", "learning"],
              answer: 0,
              explain:
                "Cümlenin ilk yarısı geçmişte kapanmış bir dönemi anlatıyor: «I cooked … for six years». Bu yüzden öğrenme de geçmişe ait: `learned`. `learn` geniş zaman, `learning` ise yardımcı fiil olmadan yüklem olamaz.",
            },
            {
              kind: "mcq",
              id: "en-a2-05-l4-16",
              no: 16,
              text: "Gap 16",
              options: ["good", "the best", "better"],
              answer: 2,
              explain:
                "Boşluktan sonra `than` var; `than` karşılaştırma derecesi ister ve `good` sıfatının karşılaştırması `better`dır. `the best` en üstünlük derecesidir ve `than` ile kullanılmaz.",
            },
            {
              kind: "mcq",
              id: "en-a2-05-l4-17",
              no: 17,
              text: "Gap 17",
              options: ["so", "because", "but"],
              answer: 1,
              explain:
                "Cümle bir sebep veriyor: bıçak kesmediği için tehlikeli. `because` bunu kurar. `so` sonuç bildirir ve cümlenin yönünü ters çevirir; `but` ise karşıtlık ister, oysa burada açıklama var.",
            },
            {
              kind: "mcq",
              id: "en-a2-05-l4-18",
              no: 18,
              text: "Gap 18",
              options: ["went to", "am going to", "goes to"],
              answer: 1,
              explain:
                "Zaman belirteci `Next month`, yani gelecek; planlanmış bir gelecek için `am going to + fiil` kullanılır. `went to` geçmiş, `goes to` ise hem alışkanlık bildirir hem de birinci tekil kişiyle uyuşmaz.",
            },
            {
              kind: "mcq",
              id: "en-a2-05-l4-19",
              no: 19,
              text: "Gap 19",
              options: ["so", "because", "when"],
              answer: 2,
              explain:
                "Cümle bir durumu kurala bağlıyor: sütü bitiren kişi kapıdaki listeye yazar. `when` bu koşullu zamanı verir. `so` sonuç, `because` sebep bildirir ve ikisi de baştaki yan cümleyi kuramaz.",
            },
          ],
        },
        {
          id: "en-a2-05-l5",
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
              title: "Two people, Saturday evening",
              body: `We booked a table {{20}} Saturday evening and we waited only five minutes.

The soup was the {{21}} thing on the menu: hot, simple and not expensive.

There were no free tables inside, {{22}} the waiter found a place for us in the corner.

The bill came {{23}} twenty-eight euros for two people, with water.

I would go again, but next time I will call {{24}} the morning.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a2-05-l5-20",
              no: 20,
              text: "Gap 20",
              accept: ["for", "on"],
              explain:
                "`book a table for Saturday evening` rezervasyonun hangi zaman için yapıldığını bildirir; `on Saturday evening` ise eylemin ne zaman olduğunu söyler. İkisi de doğal İngilizcedir ve ikisi de kabul edilir; `in` gün adlarıyla kullanılmaz.",
            },
            {
              kind: "gap",
              id: "en-a2-05-l5-21",
              no: 21,
              text: "Gap 21",
              accept: ["best"],
              explain:
                "Boşluktan önce `the`, sonra `on the menu` var: bu ikisi birlikte en üstünlük derecesi ister ve `good` sıfatının en üstünlüğü `best`tir. `better` karşılaştırmadır ve `the … on` yapısıyla gelmez.",
            },
            {
              kind: "gap",
              id: "en-a2-05-l5-22",
              no: 22,
              text: "Gap 22",
              accept: ["but"],
              explain:
                "İki yarı karşıt: içeride boş masa yok, ama garson bir yer buluyor. Karşıtlığı `but` verir. `so` sonuç bildirir ve beklenmedikliği kaybeder; `because` ise ilişkiyi tersine çevirir.",
            },
            {
              kind: "gap",
              id: "en-a2-05-l5-23",
              no: 23,
              text: "Gap 23",
              accept: ["to"],
              explain:
                "`the bill comes to …` hesabın toplamını bildiren sabit bir kalıptır. `comes at` bir saat, `comes in` bir yer bildirir; ikisi de tutarla kullanılmaz.",
            },
            {
              kind: "gap",
              id: "en-a2-05-l5-24",
              no: 24,
              text: "Gap 24",
              accept: ["in"],
              explain:
                "Günün bölümleri `in` ile kullanılır: `in the morning`. `at` yalnız `at night` ve saatlerde, `on` ise belirli bir günün sabahı söylendiğinde gelir (on Monday morning).",
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
          id: "en-a2-05-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "You hear five short conversations, questions 1 to 5. Choose a, b or c. You hear every recording twice.",
          promptTr: "Beş kısa konuşma dinleyeceksin, 1–5. maddeler. a, b ya da c'yi seç. Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "In a restaurant",
              genreTr: "Lokantada",
              situation: "Bir müşteri garsonla konuşuyor.",
              plays: 2,
              segments: [
                { text: "Is the fish fresh today?" },
                { text: "Yes, it came this morning. But we only have four left." },
                { text: "Then two, please." },
                { text: "And to drink?" },
                { text: "Water for both of us." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Phone call",
              genreTr: "Telefon görüşmesi",
              situation: "Bir kişi yemek kursunu arıyor.",
              plays: 2,
              segments: [
                { text: "Hello, I would like to join the bread course." },
                { text: "The Tuesday one is full until March. I can put you on the list." },
                { text: "And the Saturday course?" },
                { text: "That starts in two weeks and there are places. It is ten euros more." },
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
                { text: "Did you make this cake?" },
                { text: "My son made it. He is nine." },
                { text: "It is very good." },
                { text: "He put too much sugar in, but nobody says that to a boy of nine." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "At the market",
              genreTr: "Pazarda",
              situation: "Bir müşteri domates alıyor.",
              plays: 2,
              segments: [
                { text: "How much are the tomatoes?" },
                { text: "Three euros a kilo, or five for two kilos." },
                { text: "I only need one kilo." },
                { text: "Then three. The small ones at the back are two euros and they are good for soup." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Phone message",
              genreTr: "Telefon iletisi",
              situation: "Bir kafe rezervasyon için ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello, this is the Garden Café about your booking for twelve people on Sunday. We can do it, but not at one. The only free time is half past three. Please call back today." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-05-h1-1",
              no: 1,
              ref: "a1",
              text: "What does the customer order?",
              options: ["Four fish", "Two fish and water", "Only water for both of them"],
              answer: 1,
              explain:
                "Müşteri «Then two, please» diyor ve içecek olarak «Water for both of us» ekliyor. Dört, mutfakta kalan balık sayısı; sipariş değil.",
            },
            {
              kind: "mcq",
              id: "en-a2-05-h1-2",
              no: 2,
              ref: "a2",
              text: "What can the caller do now?",
              options: ["Join the Tuesday course this week", "Wait until March", "Take the Saturday course"],
              answer: 2,
              explain:
                "Cumartesi kursu «starts in two weeks and there are places» diyor. Salı kursu marta kadar dolu; beklemek bir seçenek ama görevli iki hafta sonra başlayan yeri öneriyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-05-h1-3",
              no: 3,
              ref: "a3",
              text: "Who made the cake?",
              options: ["The speaker's son", "The speaker herself, last night", "A friend"],
              answer: 0,
              explain:
                "Cevap doğrudan veriliyor: «My son made it. He is nine». Şeker fazlalığı da onun hakkında söyleniyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-05-h1-4",
              no: 4,
              ref: "a4",
              text: "What does the customer pay?",
              options: ["Two euros for the small ones", "Three euros", "Five euros"],
              answer: 1,
              explain:
                "Müşteri bir kilo istiyor ve satıcı «Then three» diyor. Beş, iki kilonun fiyatı; iki euro ise arkadaki küçük domateslerin fiyatı, alınan onlar değil.",
            },
            {
              kind: "mcq",
              id: "en-a2-05-h1-5",
              no: 5,
              ref: "a5",
              text: "What is the problem?",
              options: ["The group is too big", "Sunday is not possible", "The time must change"],
              answer: 2,
              explain:
                "Kafe grubu kabul ediyor ama saati değiştiriyor: «We can do it, but not at one. The only free time is half past three». Gün ve kişi sayısı sorun değil.",
            },
          ],
        },
        {
          id: "en-a2-05-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear information about a cookery course. Complete the notes, questions 6 to 10. Write ONE or TWO words or a number in each gap. You hear the information twice.",
          promptTr:
            "Bir yemek kursu hakkında bilgi dinleyeceksin. 6–10. maddelerdeki notları tamamla. Her boşluğa BİR ya da İKİ sözcük veya bir sayı yaz. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Information",
              genreTr: "Bilgilendirme",
              situation: "Bir görevli yeni katılanlara kursu anlatıyor.",
              plays: 2,
              segments: [
                {
                  text: "Good evening and welcome. Here is what you need to know. The course is on four Tuesdays and it starts on the ninth of October. We meet at half past six in the school kitchen, downstairs. The price is sixty euros for the four evenings, and that includes all the flour. Bring an apron; the knives are here. Each evening you take home one loaf of bread. And one thing people always ask: yes, you can bring one guest, but only on the last evening.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notes",
              genreTr: "Not kâğıdı",
              title: "Cookery course — notes",
              body: `Course starts on:      {{6}} October
Number of evenings:    {{7}}
We meet at:            {{8}}
Price for the course:  {{9}} euros
You must bring:        an {{10}}`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a2-05-h2-6",
              no: 6,
              ref: "b1",
              text: "Gap 6",
              accept: ["9", "ninth", "9th"],
              explain:
                "Kayıt «it starts on the ninth of October» diyor. Not kâğıdında `October` basılı olduğu için boşluğa yalnız gün yazılır; rakam da yazı da kabul edilir.",
            },
            {
              kind: "gap",
              id: "en-a2-05-h2-7",
              no: 7,
              ref: "b1",
              text: "Gap 7",
              accept: ["4", "four"],
              explain:
                "«The course is on four Tuesdays» — dört akşam. Altmış sayısı ücret, dokuz ise tarih; üç sayıyı ayırmak gerekiyor.",
            },
            {
              kind: "gap",
              id: "en-a2-05-h2-8",
              no: 8,
              ref: "b1",
              text: "Gap 8",
              accept: ["half past six", "6.30", "18.30"],
              explain:
                "«We meet at half past six in the school kitchen» — buluşma saati. Yazıyla da rakamla da yazılabilir; yirmi dört saatlik biçim de kabul edilir.",
            },
            {
              kind: "gap",
              id: "en-a2-05-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["60", "sixty"],
              explain:
                "«The price is sixty euros for the four evenings» — kursun tamamının ücreti. Not kâğıdında `euros` basılı olduğu için boşluğa yalnız sayı yazılır.",
            },
            {
              kind: "gap",
              id: "en-a2-05-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["apron"],
              explain:
                "Kayıt getirilecek tek şeyi söylüyor: «Bring an apron; the knives are here». Bıçaklar kursta var, yani getirilmiyor; not kâğıdında `an` basılı.",
            },
          ],
        },
        {
          id: "en-a2-05-h3",
          no: 3,
          format: "mcq",
          goal: "gist",
          prompt: "You hear five short speakers, questions 11 to 15. What is each person doing? You hear every recording twice.",
          promptTr: "Beş kısa konuşmacı dinleyeceksin, 11–15. maddeler. Her kişi ne yapıyor? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "In a restaurant",
              genreTr: "Lokantada",
              situation: "Bir müşteri geç saatte içeri giriyor.",
              plays: 2,
              segments: [
                { text: "I know the kitchen closes at ten. But my train arrived at five past and I have not eaten since the morning. Is there anything at all, even bread and soup?" },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "Announcement",
              genreTr: "Duyuru",
              situation: "Binada bir anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "The blue bins are for glass and the brown ones are for food. Please do not put oil in either of them. Old cooking oil goes in the bottle by the back door." },
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
                { text: "I lived above that restaurant for eleven years and I never went in. Then they put a table outside and gave me a coffee. Now I eat there twice a week." },
              ],
            },
            {
              kind: "audio",
              id: "c4",
              genre: "In a restaurant",
              genreTr: "Lokantada",
              situation: "Bir müşteri garsona sesleniyor.",
              plays: 2,
              segments: [
                { text: "Yes, hello, this is table nine. We ordered forty minutes ago and the people who came after us already have their food. Could somebody look at it?" },
              ],
            },
            {
              kind: "audio",
              id: "c5",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Radyoda bir uzman konuşuyor.",
              plays: 2,
              segments: [
                { text: "A lot of people think that cooking at home is always cheaper. It usually is, but not if you buy eight different things for one meal and use each of them once." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-05-h3-11",
              no: 11,
              ref: "c1",
              text: "What is the speaker doing?",
              options: ["Asking for an exception", "Complaining about the train", "Booking a table"],
              answer: 0,
              explain:
                "Konuşmacı kuralı biliyor ve bir istisna istiyor: «Is there anything at all, even bread and soup?». Tren yalnız gerekçe; rezervasyon yapmıyor, zaten içeride.",
            },
            {
              kind: "mcq",
              id: "en-a2-05-h3-12",
              no: 12,
              ref: "c2",
              text: "What is the announcement about?",
              options: ["New opening hours", "How to separate waste", "The price of the new bins for each flat"],
              answer: 1,
              explain:
                "Anons üç kabı ayırıyor: cam mavi, yemek kahverengi, yağ ise «the bottle by the back door». Saat ve fiyat kayıtta hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-05-h3-13",
              no: 13,
              ref: "c3",
              text: "What is the speaker doing?",
              options: ["Complaining about the noise from the restaurant", "Advertising a restaurant", "Explaining how something changed"],
              answer: 2,
              explain:
                "Anlatı bir değişimi veriyor: on bir yıl hiç girmemiş, bir kahveden sonra «Now I eat there twice a week». Şikâyet ya da reklam yok.",
            },
            {
              kind: "mcq",
              id: "en-a2-05-h3-14",
              no: 14,
              ref: "c4",
              text: "Why is the person speaking?",
              options: ["The food is late", "The food is cold", "The bill is wrong"],
              answer: 0,
              explain:
                "Şikâyet süreyle kuruluyor: «We ordered forty minutes ago and the people who came after us already have their food». Yemek daha gelmedi, yani soğukluk ya da hesap söz konusu değil.",
            },
            {
              kind: "mcq",
              id: "en-a2-05-h3-15",
              no: 15,
              ref: "c5",
              text: "What is the speaker doing?",
              options: ["Giving a recipe for a cheap meal", "Correcting a common idea", "Asking for advice"],
              answer: 1,
              explain:
                "Konuşmacı yaygın inancı anıp sınırlıyor: «A lot of people think that cooking at home is always cheaper. It usually is, but not if …». Tarif ya da soru yok.",
            },
          ],
        },
        {
          id: "en-a2-05-h4",
          no: 4,
          format: "match",
          goal: "detail",
          prompt:
            "You hear five people, questions 16 to 20. Why did each person stop going to a restaurant? Choose from a to h. You use each answer once only. You hear the recordings twice.",
          promptTr:
            "Beş kişi dinleyeceksin, 16–20. maddeler. Her kişi bir lokantaya gitmeyi neden bıraktı? a'dan h'ye seç. Her seçenek en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "The prices went up." },
            { key: "b", label: "The journey became too long." },
            { key: "c", label: "It was always too loud." },
            { key: "d", label: "The best cook left." },
            { key: "e", label: "The portions got smaller." },
            { key: "f", label: "The service got slower." },
            { key: "g", label: "A friend stopped coming with them." },
            { key: "h", label: "It closed for six months." },
          ],
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Speaker 1",
              genreTr: "Birinci konuşmacı",
              situation: "Birinci konuşmacı tabaktaki değişimden söz ediyor.",
              plays: 2,
              segments: [
                { text: "The food is the same and the plates are the same. But two years ago you left full and now you do not. Nobody says anything, and everybody notices." },
              ],
            },
            {
              kind: "audio",
              id: "d2",
              genre: "Speaker 2",
              genreTr: "İkinci konuşmacı",
              situation: "İkinci konuşmacı taşındıktan sonrasını anlatıyor.",
              plays: 2,
              segments: [
                { text: "I loved that place and I loved the walk to it. But since I moved it is two buses each way, and after work I simply do not do it." },
              ],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü konuşmacı mutfaktaki değişiklikten söz ediyor.",
              plays: 2,
              segments: [
                { text: "For six years it was the same woman in the kitchen. She went to open her own place in the spring, and the third time I went after that I understood it was over." },
              ],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Speaker 4",
              genreTr: "Dördüncü konuşmacı",
              situation: "Dördüncü konuşmacı ocak ayındaki menüden söz ediyor.",
              plays: 2,
              segments: [
                { text: "We had the same bill there for years. Then in January everything on the menu was three or four euros more. For that money we found somewhere with a garden." },
              ],
            },
            {
              kind: "audio",
              id: "d5",
              genre: "Speaker 5",
              genreTr: "Beşinci konuşmacı",
              situation: "Beşinci konuşmacı salondaki sesten söz ediyor.",
              plays: 2,
              segments: [
                { text: "You could not hear the person opposite you. I said something about it once, politely, and the answer was that people like it that way." },
              ],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-a2-05-h4-16",
              no: 16,
              ref: "d1",
              text: "Speaker 1",
              answer: "e",
              explain:
                "Yemek ve tabak aynı, değişen doyma: «two years ago you left full and now you do not». Fiyat ya da aşçı hiç anılmıyor; azalan şey porsiyon.",
            },
            {
              kind: "match",
              id: "en-a2-05-h4-17",
              no: 17,
              ref: "d2",
              text: "Speaker 2",
              answer: "b",
              explain:
                "Konuşmacı yeri sevdiğini söylüyor; tek sorun yol: «since I moved it is two buses each way». Lokantada hiçbir şey değişmemiş.",
            },
            {
              kind: "match",
              id: "en-a2-05-h4-18",
              no: 18,
              ref: "d3",
              text: "Speaker 3",
              answer: "d",
              explain:
                "Altı yıl aynı kişi mutfaktaymış: «She went to open her own place in the spring». Üçüncü ziyaretten sonra karar veriliyor; sebep aşçının ayrılması.",
            },
            {
              kind: "match",
              id: "en-a2-05-h4-19",
              no: 19,
              ref: "d4",
              text: "Speaker 4",
              answer: "a",
              explain:
                "Yıllarca aynı hesaptan sonra ocakta zam geliyor: «everything on the menu was three or four euros more». Bahçeli yeni yer, zammın sonucu.",
            },
            {
              kind: "match",
              id: "en-a2-05-h4-20",
              no: 20,
              ref: "d5",
              text: "Speaker 5",
              answer: "c",
              explain:
                "Sorun ses düzeyi: «You could not hear the person opposite you», ve şikâyete verilen cevap bunun bilerek yapıldığı. Servis hızı ya da fiyat geçmiyor.",
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
          id: "en-a2-05-w1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "You want to invite your English friend Aden to dinner at your home. Write an email to Aden. Write about 50 words. Answer all three points.",
          promptTr:
            "İngiliz arkadaşın Aden'i evinde yemeğe davet etmek istiyorsun. Aden'e bir e-posta yaz. Yaklaşık 50 kelime. Üç maddenin hepsine cevap ver.",
          items: [],
          rubric: {
            minWords: 50,
            points: [
              { de: "Say when he should come and why that day.", tr: "Ne zaman gelmesi gerektiğini ve neden o günü seçtiğini söyle." },
              { de: "Say what you will cook.", tr: "Ne pişireceğini söyle." },
              { de: "Ask if there is something he does not eat.", tr: "Yemediği bir şey olup olmadığını sor." },
            ],
            sample: `Hi Aden,

Come on Saturday, because I do not work that day and I have time to cook.

I am going to make a fish soup and a big salad. My mother's recipe, so it is very good!

Is there something you do not eat? Tell me before Friday.

See you on Saturday!
Esme`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi? Biri eksikse metin tam sayılmaz.",
              "Gün seçimi bir gerekçeyle mi verildi? (because …)",
              "Yemek somut mu söylendi, yoksa yalnız «food» mu denildi?",
              "Soru soru biçiminde mi kuruldu? (Is there …)",
              "Yaklaşık 50 kelime yazıldı mı? Hitap ve veda var mı?",
            ],
          },
        },
        {
          id: "en-a2-05-w2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Write a short text about a meal that did not go as you planned. Say what you cooked or ordered, what went wrong and what you did. Write about 60 words.",
          promptTr:
            "Planladığın gibi gitmeyen bir yemeği anlat. Ne pişirdiğini ya da ısmarladığını, neyin ters gittiğini ve ne yaptığını yaz. Yaklaşık 60 kelime.",
          items: [],
          rubric: {
            minWords: 60,
            points: [
              { de: "Say what you cooked or ordered.", tr: "Ne pişirdiğini ya da ısmarladığını söyle." },
              { de: "Say what went wrong.", tr: "Neyin ters gittiğini söyle." },
              { de: "Say what you did in the end.", tr: "Sonunda ne yaptığını söyle." },
            ],
            sample: `Last month I cooked a chicken for my sister and her husband. I put it in the oven at four and I went to the shop for bread. The queue was very long. When I came home, the kitchen was full of smoke and the chicken was black. We ate bread, cheese and a big salad, and my sister said it was the best evening of the month.`,
            criteria: [
              "Üç içerik noktasının üçü de var mı?",
              "Geçmiş zaman doğru kullanıldı mı? Düzensiz fiiller (went, came, said) doğru mu?",
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
          id: "en-a2-05-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about food and cooking. Answer in full sentences.",
          promptTr: "Sana yemek ve mutfak hakkında sorular soracağım. Tam cümlelerle cevap ver.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good afternoon. What do you usually eat in the evening?", tr: "İyi günler. Akşamları genelde ne yersin?" },
            { who: "you", hint: "Ne yediğini ve ne zaman yediğini söyle.", expect: "günlük bir alışkanlığı tam bir cümleyle anlatmak", seconds: 30 },
            { who: "partner", de: "Thank you. Do you prefer cooking at home or eating in a restaurant? Why?", tr: "Teşekkürler. Evde pişirmeyi mi lokantada yemeyi mi seversin? Neden?" },
            { who: "you", hint: "Tercihini söyle ve bir gerekçe ver.", expect: "bir tercihi gerekçesiyle bildirmek", seconds: 30 },
            { who: "partner", de: "Interesting. Tell me about a good meal you had last year.", tr: "İlginç. Geçen yıl yediğin güzel bir yemeği anlat." },
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
              "In the evening I usually eat soup and bread, at about seven. I prefer cooking at home because it is cheaper and I know what is in the food. Last year I ate fish at the sea with my brother. It was very simple, only fish and lemon, but I still remember it.",
            criteria: [
              "Cevaplar tek sözcük değil, tam cümle mi?",
              "Tercih bir gerekçeyle mi verildi? (because …)",
              "Son soruda geçmiş zaman doğru kuruldu mu?",
              "Saat, miktar ve fiyat gibi bilgiler söylenebiliyor mu?",
            ],
          },
        },
        {
          id: "en-a2-05-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Describe this situation for about one minute: a small kitchen on a Sunday morning. A man is making bread and there is flour on the table. Two children are washing fruit at the sink. Say what you see, what the people are doing, and whether you like cooking with other people.",
          promptTr:
            "Şu durumu bir dakika kadar anlat: pazar sabahı küçük bir mutfak. Bir adam ekmek yapıyor ve masada un var. İki çocuk lavaboda meyve yıkıyor. Ne gördüğünü, insanların ne yaptığını ve başkalarıyla yemek yapmayı sevip sevmediğini söyle.",
          prepSeconds: 45,
          speakSeconds: 75,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "say what you see", tr: "Ne gördüğünü söyle" },
              { de: "say what the people are doing", tr: "İnsanların ne yaptığını söyle" },
              { de: "say if you like cooking with other people", tr: "Başkalarıyla yemek yapmayı sevip sevmediğini söyle" },
            ],
            sample:
              "This is a small kitchen on a Sunday morning. In the middle a man is making bread and there is a lot of flour on the table. Next to the window two children are washing fruit at the sink. The older one is laughing. I like cooking with other people because it is faster and the kitchen is not quiet.",
            criteria: [
              "Şimdiki zaman (present continuous) kullanıldı mı? Bu görevin ana yapısı bu.",
              "Üç içerik noktasının üçü de işlendi mi?",
              "Yer bildiren ifadeler var mı? (in the middle, next to, at the sink)",
              "Görüş bir gerekçeyle mi verildi?",
            ],
          },
        },
        {
          id: "en-a2-05-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Ten people from your course want to eat together. Talk with me about the ideas and choose one together.",
          promptTr:
            "Kursundaki on kişi birlikte yemek yemek istiyor. Fikirleri benimle konuş ve birlikte birini seç.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "Here are three ideas: a restaurant in the centre, a picnic in the park, or everybody cooks one dish and we eat at my flat. What do you think about the restaurant?", tr: "Üç fikir var: merkezde bir lokanta, parkta piknik ya da herkes bir yemek yapsın ve evimde yiyelim. Lokanta hakkında ne düşünüyorsun?" },
            { who: "you", hint: "Lokanta fikri hakkında görüşünü söyle ve bir gerekçe ver.", expect: "bir fikir hakkında görüş bildirmek ve gerekçelendirmek", seconds: 35 },
            { who: "partner", de: "I see your point. But a restaurant for ten people is expensive, and two people in the group do not eat meat. Is the picnic a better idea?", tr: "Anlıyorum. Ama on kişi için lokanta pahalı ve grupta iki kişi et yemiyor. Piknik daha mı iyi bir fikir?" },
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
              "I think a restaurant is easy because nobody works in the kitchen. You are right about the price, that is a problem for students. If everybody cooks one dish, the people who do not eat meat can also choose. So let us cook together at your flat and each person brings one thing.",
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
