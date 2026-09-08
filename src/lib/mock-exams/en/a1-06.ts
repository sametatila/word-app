import type { MockPaper } from "../types";

/**
 * A1 · Deneme 6 — "Pets, the Park and the Neighbourhood".
 *
 * A1'in öteki denemeleriyle AYNI PLAN; konu ayrı. Hayvanlar ve mahalle
 * A1'de verimli bir alan çünkü tamamı somut: kim, ne zaman, nerede, kaç
 * tane. Kural bildiren levha ve duyuru dili de burada doğal olarak
 * bulunuyor, uydurulmuş bir bağlam gerekmiyor.
 *
 * A1 SINIRI: geniş zaman, `can`, `there is / there are`, basit geçmiş
 * biçimler. Present perfect, edilgen, ilgi cümlesi ve koşul kipleri yok.
 */
export const EN_A1_06: MockPaper = {
  id: "en-a1-06",
  course: "en",
  level: "A1",
  no: 6,
  theme: "Pets, the Park and the Neighbourhood",
  themeTr: "Hayvanlar, park ve mahalle",
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
          id: "en-a1-06-l1",
          no: 1,
          format: "truefalse",
          goal: "detail",
          prompt: "Read the two texts and questions 1 to 5. Are the sentences true or false?",
          promptTr: "İki metni ve 1–5. maddeleri oku. Cümleler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Note for a neighbour",
              genreTr: "Komşuya not",
              title: "For Enzo",
              body: `Hi Enzo,

I am at my brother's until Sunday. Can you give the cat food in the morning?

The food is in the box under the window. One small cup, not two.

Please do not open the balcony door. The cat is fast!

The key is with Mrs Orla in flat 4.

Thank you! Suki`,
              gloss: [
                { de: "a cup", tr: "fincan, kap", en: "cup" },
                { de: "fast", tr: "hızlı", en: "fast" },
              ],
            },
            {
              kind: "text",
              id: "t2",
              genre: "Notice in the park",
              genreTr: "Park duyurusu",
              title: "CITY PARK",
              body: `Open from 7 in the morning to 21 in the evening.

Dogs: only on the small path, not on the grass.

The water for dogs is next to the café.

On Monday the park is closed. We cut the grass.`,
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-06-l1-1",
              no: 1,
              ref: "t1",
              text: "Enzo must give the cat food two times a day.",
              answer: false,
              explain:
                "Not tek bir zaman veriyor: «Can you give the cat food in the morning?». «One small cup, not two» ise miktarla ilgili, günde kaç kez olduğuyla değil.",
            },
            {
              kind: "bool",
              id: "en-a1-06-l1-2",
              no: 2,
              ref: "t1",
              text: "The key is with a neighbour in flat 4.",
              answer: true,
              explain:
                "Notun son satırı yeri veriyor: «The key is with Mrs Orla in flat 4». Daire numarası da adı da yazılı.",
            },
            {
              kind: "bool",
              id: "en-a1-06-l1-3",
              no: 3,
              ref: "t1",
              text: "Enzo can open the balcony door.",
              answer: false,
              explain:
                "Not bunu açıkça yasaklıyor: «Please do not open the balcony door», gerekçesi de veriliyor: kedi hızlı. Olumsuz emir kipini okumak A1'de ölçülen becerilerden biri.",
            },
            {
              kind: "bool",
              id: "en-a1-06-l1-4",
              no: 4,
              ref: "t2",
              text: "You can walk with a dog on the grass.",
              answer: false,
              explain:
                "Duyuru sınırı koyuyor: «Dogs: only on the small path, not on the grass». `only` ile `not` aynı satırda; çimen köpeklere kapalı.",
            },
            {
              kind: "bool",
              id: "en-a1-06-l1-5",
              no: 5,
              ref: "t2",
              text: "The park is not open on Monday.",
              answer: true,
              explain:
                "Duyurunun son satırı bunu söylüyor: «On Monday the park is closed». Gerekçe de veriliyor: çim biçiliyor.",
            },
          ],
        },
        {
          id: "en-a1-06-l2",
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
              title: "Animal Doctor",
              body: `Monday to Friday from 9 to 18. Saturday only in the morning.

Small animals: cats, dogs, birds.

Call before you come: 0800 61 61.

At night: call the same number.`,
            },
            {
              kind: "text",
              id: "p2",
              genre: "Notice",
              genreTr: "Duyuru",
              title: "Pet Shop Nova",
              body: `Open every day from 8 to 20.

Food for cats, dogs and fish. Boxes, beds and balls.

We do not sell animals.

Free water for your dog at the door.`,
            },
            {
              kind: "text",
              id: "p3",
              genre: "Notice",
              genreTr: "Duyuru",
              title: "Park Walking Group",
              body: `Every Sunday at 10 in the City Park.

We walk one hour with our dogs.

Children come with a parent.

No money. Only a warm coat!`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-06-l2-6",
              no: 6,
              text: "Your cat is ill at eleven at night.",
              options: ["Animal Doctor", "Pet Shop Nova", "Park Walking Group"],
              answer: 0,
              explain:
                "Doktor duyurusu geceyi ayrıca yazıyor: «At night: call the same number». Dükkân yirmide kapanıyor ve hayvan bakmıyor; yürüyüş grubu bir sağlık hizmeti değil.",
            },
            {
              kind: "mcq",
              id: "en-a1-06-l2-7",
              no: 7,
              text: "You want to buy a bed for your dog on Sunday.",
              options: ["Animal Doctor", "Pet Shop Nova", "Park Walking Group"],
              answer: 1,
              explain:
                "Dükkân «Open every day from 8 to 20» ve «Boxes, beds and balls» satıyor. Doktor pazar günü kapalı; yürüyüş grubunda satış yok.",
            },
            {
              kind: "mcq",
              id: "en-a1-06-l2-8",
              no: 8,
              text: "You want to meet other people with a dog.",
              options: ["Animal Doctor", "Pet Shop Nova", "Park Walking Group"],
              answer: 2,
              explain:
                "Grup duyurusu birlikte yürümekten söz ediyor: «We walk one hour with our dogs», her pazar saat onda. Öteki iki yer alışveriş ve muayene için.",
            },
            {
              kind: "mcq",
              id: "en-a1-06-l2-9",
              no: 9,
              text: "You want a small bird for your home.",
              options: ["Animal Doctor", "Pet Shop Nova", "Park Walking Group"],
              answer: 0,
              explain:
                "Dükkân bunu açıkça dışlıyor: «We do not sell animals». Doktor duyurusunda kuşlar sayılıyor, yani kuş konusunda yardım edecek tek yer orası; yürüyüş grubu ise yalnız köpeklerle ilgili.",
            },
            {
              kind: "mcq",
              id: "en-a1-06-l2-10",
              no: 10,
              text: "You want to do something free on Sunday morning with your son.",
              options: ["Animal Doctor", "Pet Shop Nova", "Park Walking Group"],
              answer: 2,
              explain:
                "Grup «Every Sunday at 10» toplanıyor, «Children come with a parent» diyor ve «No money» yazıyor. Dükkân pazar açık ama orada bir etkinlik yok.",
            },
          ],
        },
        {
          id: "en-a1-06-l3",
          no: 3,
          format: "truefalse",
          goal: "instruction",
          prompt: "Read the four signs and questions 11 to 14. Are the sentences true or false?",
          promptTr: "Dört levhayı ve 11–14. maddeleri oku. Cümleler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "s1",
              genre: "Sign in the park",
              genreTr: "Parktaki levha",
              title: "PLAYGROUND",
              body: `For children under twelve.

No dogs, please.

Open until it is dark.`,
            },
            {
              kind: "text",
              id: "s2",
              genre: "Sign at the door",
              genreTr: "Kapıdaki levha",
              title: "PET SHOP",
              body: `Please leave your dog at the door.

Water is here.

Do not give food to the animals in the shop.`,
            },
            {
              kind: "text",
              id: "s3",
              genre: "Sign in the building",
              genreTr: "Binadaki levha",
              title: "FOR ALL FLATS",
              body: `Bins: Tuesday and Friday.

Please put the yellow bag out after 19.

Do not put boxes next to the door.`,
            },
            {
              kind: "text",
              id: "s4",
              genre: "Sign at the lake",
              genreTr: "Göldeki levha",
              title: "THE LAKE",
              body: `Do not give bread to the birds. Bread is bad for them.

You can buy bird food in the café.

Children: only with an adult.`,
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-06-l3-11",
              no: 11,
              ref: "s1",
              text: "A child of fourteen can play here.",
              answer: false,
              explain:
                "Levha yaş sınırı koyuyor: «For children under twelve». On dört bu sınırın üstünde; `under` ile kurulan yaş sınırını okumak ölçülen becerilerden biri.",
            },
            {
              kind: "bool",
              id: "en-a1-06-l3-12",
              no: 12,
              ref: "s2",
              text: "Your dog waits outside the shop.",
              answer: true,
              explain:
                "Levha ilk satırında bunu istiyor: «Please leave your dog at the door». Kapının yanında su da var, yani köpek dışarıda bekliyor.",
            },
            {
              kind: "bool",
              id: "en-a1-06-l3-13",
              no: 13,
              ref: "s3",
              text: "You put the yellow bag out in the morning.",
              answer: false,
              explain:
                "Levha saati veriyor: «Please put the yellow bag out after 19». On dokuz akşamdır; sabah bu saatten önce.",
            },
            {
              kind: "bool",
              id: "en-a1-06-l3-14",
              no: 14,
              ref: "s4",
              text: "You can buy food for the birds in the café.",
              answer: true,
              explain:
                "Levha ekmeği yasaklıyor ama bir seçenek veriyor: «You can buy bird food in the café». İki satırı birlikte okumak gerekiyor.",
            },
          ],
        },
        {
          id: "en-a1-06-l4",
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
              title: "To the neighbours",
              body: `Hello everybody,

My name is Rune and I live {{15}} the fourth floor with a small dog.

He is very quiet in the day, {{16}} he is loud when the bell rings. Sorry!

There {{17}} a good park behind our street. I walk there at seven every morning.

Last week I {{18}} your cat in our garden. She is very friendly.

Rune`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-06-l4-15",
              no: 15,
              text: "Gap 15",
              options: ["at", "on", "in"],
              answer: 1,
              explain:
                "Kat bildirirken `on` kullanılır: on the fourth floor. `in` bir binanın ya da odanın içini, `at` bir noktayı bildirir; ikisi de katla kullanılmaz.",
            },
            {
              kind: "mcq",
              id: "en-a1-06-l4-16",
              no: 16,
              text: "Gap 16",
              options: ["so", "because", "but"],
              answer: 2,
              explain:
                "İki bilgi karşıt: köpek gündüz sessiz, ama zil çalınca gürültülü. Karşıtlığı `but` kurar. `so` sonuç, `because` sebep bildirir ve ikisi de bu karşıtlığı veremez.",
            },
            {
              kind: "mcq",
              id: "en-a1-06-l4-17",
              no: 17,
              text: "Gap 17",
              options: ["is", "are", "has"],
              answer: 0,
              explain:
                "Kalıp `there is / there are` ve devamındaki özne tekil: «a good park». Tekil özne `is` ister; `has` bu kalıpta hiç kullanılmaz.",
            },
            {
              kind: "mcq",
              id: "en-a1-06-l4-18",
              no: 18,
              text: "Gap 18",
              options: ["see", "sees", "saw"],
              answer: 2,
              explain:
                "Cümle «Last week» ile başlıyor: zaman geçmiş. `see` fiilinin geçmiş biçimi düzensizdir: `saw`. Öteki iki şık geniş zamandır ve zaman belirteciyle çelişir.",
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
          id: "en-a1-06-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "You hear six short recordings, questions 1 to 6. Choose a, b or c. You hear every recording twice.",
          promptTr: "Altı kısa kayıt dinleyeceksin, 1–6. maddeler. a, b ya da c'yi seç. Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Phone message",
              genreTr: "Telefon iletisi",
              situation: "Veteriner muayenehanesi ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello, this is the animal doctor. Your dog is fine. You can come at four in the afternoon, not at two. Please bring the small green card." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "In the park",
              genreTr: "Parkta",
              situation: "İki komşu parkta konuşuyor.",
              plays: 2,
              segments: [
                { text: "Is this your cat?" },
                { text: "No, my cat is black. This one is grey." },
                { text: "She sits here every day." },
                { text: "I think she is from the house on the corner." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Announcement",
              genreTr: "Anons",
              situation: "Parkta anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "Attention please. The park closes at eight today, not at nine. There is work at the lake tomorrow. The café is open until seven." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Voice message",
              genreTr: "Sesli ileti",
              situation: "Bir komşu ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hi Vito, it is Mila from flat 2. Your bird is very loud in the morning. Can you put the window down before seven? Thank you." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "In the shop",
              genreTr: "Dükkânda",
              situation: "Bir müşteri hayvan dükkânında soruyor.",
              plays: 2,
              segments: [
                { text: "Do you have food for a small dog?" },
                { text: "Yes, the small boxes are on the left, under the beds." },
                { text: "How much is one box?" },
                { text: "Six euros. Two boxes are ten." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Announcement",
              genreTr: "Anons",
              situation: "Binada duyuru yapılıyor.",
              plays: 2,
              segments: [
                { text: "A note for all flats. The men come for the bins on Thursday this week, not on Friday. Please put your bags out on Wednesday evening." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-06-h1-1",
              no: 1,
              ref: "a1",
              text: "When can the person come?",
              options: ["At two", "At four", "At seven"],
              answer: 1,
              explain:
                "İleti düzeltmeyi kendisi yapıyor: «You can come at four in the afternoon, not at two». İki, iptal edilen eski saat.",
            },
            {
              kind: "mcq",
              id: "en-a1-06-h1-2",
              no: 2,
              ref: "a2",
              text: "What colour is the cat in the park?",
              options: ["Black", "White", "Grey"],
              answer: 2,
              explain:
                "Konuşmacı iki rengi ayırıyor: «my cat is black. This one is grey». Parktaki kedi gri; siyah olan kendi kedisi.",
            },
            {
              kind: "mcq",
              id: "en-a1-06-h1-3",
              no: 3,
              ref: "a3",
              text: "When does the park close today?",
              options: ["At eight", "At nine", "At seven"],
              answer: 0,
              explain:
                "Anons «The park closes at eight today, not at nine» diyor. Yedi kafenin kapanış saati; üç sayı da geçtiği için hangisinin park olduğunu ayırmak gerekiyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-06-h1-4",
              no: 4,
              ref: "a4",
              text: "What does Mila ask Vito to do?",
              options: ["To give the bird more food", "To close the window early", "To call her in the morning"],
              answer: 1,
              explain:
                "Ricanın kendisi kayıtta: «Can you put the window down before seven?». Yem ya da telefon hiç geçmiyor; sorun kuşun sabah gürültüsü.",
            },
            {
              kind: "mcq",
              id: "en-a1-06-h1-5",
              no: 5,
              ref: "a5",
              text: "How much are two boxes?",
              options: ["Six euros", "Twelve euros", "Ten euros"],
              answer: 2,
              explain:
                "Görevli iki fiyat veriyor: bir kutu altı euro, «Two boxes are ten». On iki, iki kutunun tek tek toplamı olurdu ama indirimli fiyat söyleniyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-06-h1-6",
              no: 6,
              ref: "a6",
              text: "When must people put the bags out?",
              options: ["On Wednesday evening", "On Thursday morning", "On Friday"],
              answer: 0,
              explain:
                "Duyuru iki günü ayırıyor: çöp perşembe alınıyor, ama torbalar «out on Wednesday evening» konacak. Cuma bu hafta geçerli olmayan eski gün.",
            },
          ],
        },
        {
          id: "en-a1-06-h2",
          no: 2,
          format: "truefalse",
          goal: "instruction",
          prompt: "You hear an announcement in a park. Are sentences 7 to 10 true or false? You hear the announcement twice.",
          promptTr: "Bir parkta yapılan anonsu dinleyeceksin. 7–10. cümleler doğru mu yanlış mı? Anonsu iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Announcement",
              genreTr: "Anons",
              situation: "Park görevlisi kuralları anlatıyor.",
              plays: 2,
              segments: [
                { text: "Good afternoon. A short note about the new garden. Dogs cannot go in the new garden, but they can go everywhere else in the park. The gate is open from nine to six. Children under ten come with an adult. And please do not take flowers home." },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-06-h2-7",
              no: 7,
              ref: "b1",
              text: "Dogs cannot go in the new garden.",
              answer: true,
              explain:
                "Anons bunu doğrudan söylüyor: «Dogs cannot go in the new garden». Parkın geri kalanı köpeklere açık, ama yeni bahçe değil.",
            },
            {
              kind: "bool",
              id: "en-a1-06-h2-8",
              no: 8,
              ref: "b1",
              text: "The gate is open until nine in the evening.",
              answer: false,
              explain:
                "Anons saatleri veriyor: «The gate is open from nine to six». Dokuz açılış saati, kapanış ise altı; iki sayının yerini değiştiren öğrenci yanılır.",
            },
            {
              kind: "bool",
              id: "en-a1-06-h2-9",
              no: 9,
              ref: "b1",
              text: "A child of eight comes with an adult.",
              answer: true,
              explain:
                "Anons sınırı koyuyor: «Children under ten come with an adult». Sekiz bu sınırın altında, yani bir yetişkinle geliyor.",
            },
            {
              kind: "bool",
              id: "en-a1-06-h2-10",
              no: 10,
              ref: "b1",
              text: "You can take flowers home.",
              answer: false,
              explain:
                "Anonsun son cümlesi bunu yasaklıyor: «please do not take flowers home». Olumsuz rica bir kural bildiriyor.",
            },
          ],
        },
        {
          id: "en-a1-06-h3",
          no: 3,
          format: "mcq",
          goal: "detail",
          prompt: "You hear five short recordings, questions 11 to 15. Choose a, b or c. You hear every recording twice.",
          promptTr: "Beş kısa kayıt dinleyeceksin, 11–15. maddeler. a, b ya da c'yi seç. Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Voice message",
              genreTr: "Sesli ileti",
              situation: "Bir arkadaş kedi bakımı için ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hi Orla, thank you for the cat! One more thing: she does not eat the fish food. Please give her the chicken food in the red box." },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "At the animal doctor",
              genreTr: "Veterinerde",
              situation: "Bir hasta sahibi görevliyle konuşuyor.",
              plays: 2,
              segments: [
                { text: "Good morning. My dog has a bad leg." },
                { text: "Since when?" },
                { text: "Since Saturday." },
                { text: "The doctor is free at half past eleven. Can you wait?" },
              ],
            },
            {
              kind: "audio",
              id: "c3",
              genre: "In the street",
              genreTr: "Sokakta",
              situation: "İki komşu sokakta konuşuyor.",
              plays: 2,
              segments: [
                { text: "Is the walking group at ten on Sunday?" },
                { text: "Yes, at the big gate, not at the café." },
                { text: "Good. I come with my sister." },
                { text: "Bring a warm coat. It is cold at the lake." },
              ],
            },
            {
              kind: "audio",
              id: "c4",
              genre: "Phone message",
              genreTr: "Telefon iletisi",
              situation: "Hayvan dükkânı müşteriye ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello, this is Pet Shop Nova. The blue dog bed is here now. It is thirty euros. We keep it for you until Friday." },
              ],
            },
            {
              kind: "audio",
              id: "c5",
              genre: "In the building",
              genreTr: "Binada",
              situation: "İki komşu merdivende konuşuyor.",
              plays: 2,
              segments: [
                { text: "Is that your bird in the window?" },
                { text: "No, it is my mother's. She is at my house for three weeks." },
                { text: "It sings very well." },
                { text: "Yes, but only in the morning." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-06-h3-11",
              no: 11,
              ref: "c1",
              text: "Which food must Orla give the cat?",
              options: ["The chicken food", "The fish food", "Both kinds of food together"],
              answer: 0,
              explain:
                "İleti seçimi açıkça yapıyor: kedi balıklı mamayı yemiyor, «Please give her the chicken food in the red box». Kırmızı kutu da ipucu olarak veriliyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-06-h3-12",
              no: 12,
              ref: "c2",
              text: "When is the doctor free?",
              options: ["At eleven o'clock in the morning", "At half past eleven", "On Saturday"],
              answer: 1,
              explain:
                "Görevli saati veriyor: «The doctor is free at half past eleven». Cumartesi köpeğin ne zamandan beri rahatsız olduğunu bildiriyor, randevu saatini değil.",
            },
            {
              kind: "mcq",
              id: "en-a1-06-h3-13",
              no: 13,
              ref: "c3",
              text: "Where does the group meet?",
              options: ["At the café near the gate", "At the lake", "At the big gate"],
              answer: 2,
              explain:
                "Buluşma yeri düzeltiliyor: «at the big gate, not at the café». Göl ise yürüyüşün soğuk olduğu yer, buluşma noktası değil.",
            },
            {
              kind: "mcq",
              id: "en-a1-06-h3-14",
              no: 14,
              ref: "c4",
              text: "How long does the shop keep the bed?",
              options: ["Until Friday", "Until Thursday", "For thirty days"],
              answer: 0,
              explain:
                "İleti süreyi veriyor: «We keep it for you until Friday». Otuz, yatağın fiyatı; sayıyı gün sanan öğrenci yanılır.",
            },
            {
              kind: "mcq",
              id: "en-a1-06-h3-15",
              no: 15,
              ref: "c5",
              text: "Whose bird is it?",
              options: ["The neighbour's", "The speaker's", "His mother's"],
              answer: 2,
              explain:
                "Cevap doğrudan veriliyor: «No, it is my mother's». Kuş üç haftalığına konuşmacının evinde; sahibi annesi.",
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
          id: "en-a1-06-w1",
          no: 1,
          format: "gap",
          goal: "detail",
          prompt:
            "Your neighbour Vito Ferrero makes a card for his cat at the animal doctor. The cat is called Nika and she is three years old. She is grey. They live at 8 Park Lane. His phone number is 07700 900 245. Five things are missing on the form. Write them in the gaps.",
          promptTr:
            "Komşun Vito Ferrero, veterinerde kedisi için bir kart çıkartıyor. Kedinin adı Nika, üç yaşında ve gri. 8 Park Lane adresinde oturuyorlar. Telefonu 07700 900 245. Formda beş bilgi eksik; boşluklara yaz.",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Form",
              genreTr: "Form",
              title: "ANIMAL DOCTOR — NEW CARD",
              body: `Family name:        Ferrero
Name of the animal: {{1}}
Cat or dog?         cat
Age:                {{2}}
Colour:             {{3}}
Street and number:  {{4}}
Phone:              {{5}}`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a1-06-w1-1",
              no: 1,
              text: "Name of the animal",
              accept: ["Nika"],
              explain:
                "Yönergede «The cat is called Nika» geçiyor. Form hayvanın adını soruyor, sahibinin değil; Vito yazan öğrenci iki alanı karıştırmış olur.",
            },
            {
              kind: "gap",
              id: "en-a1-06-w1-2",
              no: 2,
              text: "Age",
              accept: ["3", "3 years", "three", "three years", "three years old"],
              explain:
                "Yönergede «she is three years old» geçiyor. Rakam da yazı da kabul edilir, çünkü ölçülen şey imla değil bilgiyi doğru alana taşımak.",
            },
            {
              kind: "gap",
              id: "en-a1-06-w1-3",
              no: 3,
              text: "Colour",
              accept: ["grey", "gray"],
              explain:
                "Yönerge rengi veriyor: «She is grey». Britanya yazımı `grey`, Amerika yazımı `gray`; ikisi de kabul edilir.",
            },
            {
              kind: "gap",
              id: "en-a1-06-w1-4",
              no: 4,
              text: "Street and number",
              accept: ["8 Park Lane", "Park Lane 8"],
              explain:
                "Adres yönergede «8 Park Lane» olarak veriliyor. İngilizcede kapı numarası sokak adından ÖNCE gelir; Türkçe sıraya alışkın öğrenci ters yazabilir, ikisi de kabul ediliyor.",
            },
            {
              kind: "gap",
              id: "en-a1-06-w1-5",
              no: 5,
              text: "Phone",
              accept: ["07700 900 245", "07700900245"],
              explain:
                "Telefon numarası yönergede «07700 900 245» olarak veriliyor. Boşluklu ve boşluksuz yazım kabul edilir; baştaki sıfır düşürülmemeli.",
            },
          ],
        },
        {
          id: "en-a1-06-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "You go away for one week and your neighbour looks after your cat. Write a short message to your neighbour. Write one or two sentences about each point (about 25 words). Do not forget the greeting at the start and at the end.",
          promptTr:
            "Bir haftalığına şehir dışına çıkıyorsun ve komşun kedine bakacak. Komşuna kısa bir ileti yaz. Her maddeye bir-iki cümle yaz (yaklaşık 25 kelime). Baştaki hitabı ve sondaki veda cümlesini unutma.",
          items: [],
          rubric: {
            minWords: 25,
            points: [
              { de: "Say where the key is.", tr: "Anahtarın nerede olduğunu söyle." },
              { de: "Say what the cat eats and when.", tr: "Kedinin ne ve ne zaman yediğini söyle." },
              { de: "Say what your neighbour must not do.", tr: "Komşunun neyi yapmaması gerektiğini söyle." },
            ],
            sample: `Dear Orla,

Thank you very much! The key is with Mrs Alma in flat 4.

Please give Nika one small cup of food in the morning. Do not open the balcony door!

See you on Sunday!
Vito`,
            criteria: [
              "Üç içerik noktasının üçü de var mı? Biri eksikse metin tam sayılmaz.",
              "Anahtarın yeri somut mu verildi?",
              "Yiyecek ve saat birlikte mi söylendi?",
              "Yasak açık bir olumsuz emirle mi kuruldu? (Do not …)",
              "Yaklaşık 25 kelime yazıldı mı? Hitap ve veda var mı?",
            ],
          },
        },
      ],
    },

    /* ── SPEAKING ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "This part has three tasks: you talk about animals and your street, you ask and answer questions, and you act at the pet shop.",
      instructionTr: "Bu bölümde üç görev var: hayvanları ve sokağını anlatma, soru sorup cevaplama ve hayvan dükkânında rol yapma.",
      tasks: [
        {
          id: "en-a1-06-s1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt: "Talk about animals and your street. Speak about these words: an animal at home — a park near you — children in the street — a shop — the weekend — something you do not like.",
          promptTr: "Hayvanları ve sokağını anlat. Şu sözcüklere göre konuş: evdeki bir hayvan — yakındaki bir park — sokaktaki çocuklar — bir dükkân — hafta sonu — sevmediğin bir şey.",
          prepSeconds: 30,
          speakSeconds: 90,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "an animal at home or in your street", tr: "Evdeki ya da sokaktaki bir hayvan" },
              { de: "a park and a shop near you", tr: "Yakındaki bir park ve bir dükkân" },
              { de: "your street at the weekend", tr: "Hafta sonu sokağın" },
              { de: "one thing you do not like", tr: "Sevmediğin bir şey" },
            ],
            sample:
              "We have a small dog. His name is Bruno and he is four. There is a park behind our house. I walk there every morning at seven. In our street there are many children. The small shop on the corner is open every day. At the weekend the street is very quiet. I do not like the bins on Monday.",
            criteria: [
              "Altı sözcüğün her birine değinildi mi?",
              "`there is / there are` kullanıldı mı?",
              "Yer bildiren ifadeler var mı? (behind, on the corner, in our street)",
              "Anlaşılır bir tempoda mı konuşuldu?",
            ],
          },
        },
        {
          id: "en-a1-06-s2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Topic: animals and free time. Make a question for each word and answer my questions: dog — park — food — morning — money.",
          promptTr:
            "Konu: hayvanlar ve boş zaman. Her sözcük için bir soru kur ve benim sorularımı cevapla: köpek — park — yemek — sabah — para.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "Now we talk about animals. Your first word is: dog. Please ask me a question.", tr: "Şimdi hayvanları konuşuyoruz. İlk sözcüğün: köpek. Bana bir soru sor." },
            { who: "you", hint: "«dog» sözcüğüyle bir soru kur.", expect: "dog sözcüğüyle dilbilgisel olarak doğru bir soru kurmak", seconds: 25 },
            { who: "partner", de: "I have got two dogs. Your next word is: park.", tr: "İki köpeğim var. Sıradaki sözcüğün: park." },
            { who: "you", hint: "«park» için bir soru kur.", expect: "park sözcüğüyle bir soru kurmak", seconds: 25 },
            { who: "partner", de: "The park near my house is very quiet. Now a question for you: when do you walk in the morning?", tr: "Evimin yanındaki park çok sakin. Şimdi sana bir soru: Sabah ne zaman yürüyüşe çıkarsın?" },
            { who: "you", hint: "Saat vererek cevapla.", expect: "saat bildiren tam bir cümleyle cevap vermek", seconds: 25 },
            { who: "partner", de: "Thank you. Last question: how much is food for a small dog where you live?", tr: "Teşekkürler. Son soru: Yaşadığın yerde küçük bir köpeğin maması kaç para?" },
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
              "Have you got a dog? — Yes, two. Is there a park near your house? — Yes, five minutes on foot. What food does your dog eat? — Chicken. When do you walk in the morning? — At half past six. How much is one box? — Six euros.",
            criteria: [
              "Beş sözcüğün her biri için bir soru kuruldu mu?",
              "Sorular doğru kuruldu mu? (Have you got … / Is there … / When … / How much …)",
              "Cevaplar soruya uygun mu?",
              "Fiyat ve saat söylenebiliyor mu?",
            ],
          },
        },
        {
          id: "en-a1-06-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "You are at the pet shop. Situations: you say what you need. — You ask about the price. — You ask when the shop is open.",
          promptTr:
            "Hayvan dükkânındasın. Durumlar: Neye ihtiyacın olduğunu söyle. — Fiyatı sor. — Dükkânın ne zaman açık olduğunu sor.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good morning. How can I help you?", tr: "Günaydın. Nasıl yardımcı olabilirim?" },
            { who: "you", hint: "Ne aradığını söyle (hangi hayvan için, ne).", expect: "bir ihtiyacı hangi hayvan için olduğuyla birlikte söylemek", seconds: 25 },
            { who: "partner", de: "Of course. The boxes are here, on the left.", tr: "Tabii. Kutular burada, solda." },
            { who: "you", hint: "Fiyatı sor.", expect: "fiyat sormak", seconds: 25 },
            { who: "partner", de: "Six euros for one box. Anything else?", tr: "Bir kutu altı euro. Başka bir şey var mı?" },
            { who: "you", hint: "Dükkânın açılış saatini kibarca sor.", expect: "kibarca açılış saatini sormak", seconds: 25 },
          ],
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "say what you need", tr: "Neye ihtiyacın olduğunu söylemek" },
              { de: "ask about the price", tr: "Fiyatı sormak" },
              { de: "ask about the opening times politely", tr: "Kibarca açılış saatini sormak" },
            ],
            sample:
              "I need food for a small cat, please. — How much is it? — When are you open on Saturday, please?",
            criteria: [
              "İhtiyaç açıkça söylendi mi? (hangi hayvan, ne)",
              "Fiyat sorusu doğru kuruldu mu? (How much is …)",
              "Saat sorusu kibar bir kalıpla mı kuruldu?",
              "Sayılar (fiyat, saat) anlaşıldı mı?",
            ],
          },
        },
      ],
    },
  ],
};
