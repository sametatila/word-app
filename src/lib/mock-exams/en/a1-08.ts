import type { MockPaper } from "../types";

/**
 * A1 · Deneme 8 — "Sport, Games and the Club".
 *
 * A1'in öteki denemeleriyle AYNI PLAN; konu ayrı. Kulüp hayatı A1'de
 * verimli çünkü tamamı somut sayı ve kural taşıyor: saat, gün, yaş sınırı,
 * aidat. Kural bildiren levha dili de burada uydurulmadan bulunuyor.
 *
 * A1 SINIRI: geniş zaman, `can`, `there is / there are`, basit geçmiş
 * biçimler. Present perfect, edilgen, ilgi cümlesi ve koşul kipleri yok.
 */
export const EN_A1_08: MockPaper = {
  id: "en-a1-08",
  course: "en",
  level: "A1",
  no: 8,
  theme: "Sport, Games and the Club",
  themeTr: "Spor, oyunlar ve kulüp",
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
          id: "en-a1-08-l1",
          no: 1,
          format: "truefalse",
          goal: "detail",
          prompt: "Read the two texts and questions 1 to 5. Are the sentences true or false?",
          promptTr: "İki metni ve 1–5. maddeleri oku. Cümleler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Message from the coach",
              genreTr: "Antrenörden ileti",
              title: "Saturday",
              body: `Hi Zeki,

The game on Saturday starts at ten, not at eleven. Please come at half past nine.

Bring your blue shirt. We have new white shirts, but they come next week.

After the game we eat together in the café. It is free for the team.

Mirek`,
              gloss: [
                { de: "a coach", tr: "antrenör", en: "coach" },
                { de: "a team", tr: "takım", en: "team" },
              ],
            },
            {
              kind: "text",
              id: "t2",
              genre: "Notice at a sports hall",
              genreTr: "Spor salonu duyurusu",
              title: "SPORTS HALL",
              body: `Open every day from 7 to 22.

Children under fourteen only with an adult.

You need clean shoes for the hall. No shoes from the street.

Water is free. Other drinks are not allowed inside.`,
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-08-l1-1",
              no: 1,
              ref: "t1",
              text: "Zeki must be there at half past nine.",
              answer: true,
              explain:
                "İleti iki saati ayırıyor: maç onda başlıyor, ama «Please come at half past nine». Gelme saati maç saatinden yarım saat önce.",
            },
            {
              kind: "bool",
              id: "en-a1-08-l1-2",
              no: 2,
              ref: "t1",
              text: "The team has new white shirts now.",
              answer: false,
              explain:
                "İleti «We have new white shirts, but they come next week» diyor: formalar henüz gelmedi. Bu yüzden mavi forma isteniyor.",
            },
            {
              kind: "bool",
              id: "en-a1-08-l1-3",
              no: 3,
              ref: "t1",
              text: "The food after the game is free for the team.",
              answer: true,
              explain:
                "İletinin son satırı bunu söylüyor: «It is free for the team». Yemek maçtan sonra kafede birlikte yeniyor.",
            },
            {
              kind: "bool",
              id: "en-a1-08-l1-4",
              no: 4,
              ref: "t2",
              text: "A child of twelve can come alone.",
              answer: false,
              explain:
                "Duyuru yaş sınırı koyuyor: «Children under fourteen only with an adult». On iki bu sınırın altında, yani yanında bir yetişkin gerekiyor.",
            },
            {
              kind: "bool",
              id: "en-a1-08-l1-5",
              no: 5,
              ref: "t2",
              text: "You can drink water in the hall.",
              answer: true,
              explain:
                "Duyuru iki içeceği ayırıyor: «Water is free. Other drinks are not allowed inside». Yani salonda yalnız su içilebiliyor.",
            },
          ],
        },
        {
          id: "en-a1-08-l2",
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
              title: "Swimming Pool",
              body: `Open from 6 to 21.

Monday morning only for older people.

Children's hour: 16 to 17 every day.

Three euros, or twenty for ten times.`,
            },
            {
              kind: "text",
              id: "p2",
              genre: "Notice",
              genreTr: "Duyuru",
              title: "Football Club",
              body: `Training on Tuesday and Thursday at 18.

New players always welcome, all ages from eight.

First month free.

Bring water and shoes for grass.`,
            },
            {
              kind: "text",
              id: "p3",
              genre: "Notice",
              genreTr: "Duyuru",
              title: "Game Evening",
              body: `Every Friday at 19 in the library.

Cards and other games.

Free tea. Children come with a parent.

No booking.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-08-l2-6",
              no: 6,
              text: "You want to play cards with other people on a Friday.",
              options: ["Swimming Pool", "Football Club", "Game Evening"],
              answer: 2,
              explain:
                "Duyuru günü ve oyunu birlikte veriyor: «Every Friday at 19 in the library» ve «Cards and other games». Öteki iki yerde kâğıt oyunu yok.",
            },
            {
              kind: "mcq",
              id: "en-a1-08-l2-7",
              no: 7,
              text: "Your son is nine and wants to play football.",
              options: ["Swimming Pool", "Football Club", "Game Evening"],
              answer: 1,
              explain:
                "Kulüp yaş sınırını veriyor: «all ages from eight». Dokuz yaş bu sınırın üstünde ve ilk ay ücretsiz.",
            },
            {
              kind: "mcq",
              id: "en-a1-08-l2-8",
              no: 8,
              text: "You want to swim ten times and pay less.",
              options: ["Swimming Pool", "Football Club", "Game Evening"],
              answer: 0,
              explain:
                "Havuz duyurusu iki fiyat veriyor: tek seferlik üç euro, «or twenty for ten times». On kez giden kişi on euro kazanıyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-08-l2-9",
              no: 9,
              text: "You want to do something free with your daughter in the evening.",
              options: ["Swimming Pool", "Football Club", "Game Evening"],
              answer: 2,
              explain:
                "Oyun akşamı üç ölçütü de karşılıyor: akşam yedide, çayı ücretsiz ve «Children come with a parent». Havuz paralı, futbolda ise yalnız ilk ay ücretsiz.",
            },
            {
              kind: "mcq",
              id: "en-a1-08-l2-10",
              no: 10,
              text: "You want to swim at seven in the morning.",
              options: ["Swimming Pool", "Football Club", "Game Evening"],
              answer: 0,
              explain:
                "Havuz «Open from 6 to 21» diyor, yani yedide açık. Futbol antrenmanı akşam altıda, oyun akşamı ise cuma on dokuzda.",
            },
          ],
        },
        {
          id: "en-a1-08-l3",
          no: 3,
          format: "truefalse",
          goal: "instruction",
          prompt: "Read the four signs and questions 11 to 14. Are the sentences true or false?",
          promptTr: "Dört levhayı ve 11–14. maddeleri oku. Cümleler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "s1",
              genre: "Sign at the pool",
              genreTr: "Havuzdaki levha",
              title: "POOL",
              body: `Please shower before you go in the water.

Do not run.

Small children: an adult in the water with them.`,
            },
            {
              kind: "text",
              id: "s2",
              genre: "Sign at the lockers",
              genreTr: "Dolaplardaki levha",
              title: "LOCKERS",
              body: `One euro.

You get the euro back.

Do not leave money or a phone here at night.`,
            },
            {
              kind: "text",
              id: "s3",
              genre: "Sign in the café",
              genreTr: "Kafedeki levha",
              title: "SPORTS CAFÉ",
              body: `Open from 9 to 20.

Hot food from 12 to 14 only.

Please take your cup to the desk.`,
            },
            {
              kind: "text",
              id: "s4",
              genre: "Sign at the field",
              genreTr: "Sahadaki levha",
              title: "GRASS",
              body: `Football on the big field.

The small field is for children under ten.

No bicycles on the grass.`,
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-08-l3-11",
              no: 11,
              ref: "s1",
              text: "You must shower before you swim.",
              answer: true,
              explain:
                "Levhanın ilk satırı bunu istiyor: «Please shower before you go in the water». Rica kipiyle yazılmış bir kural.",
            },
            {
              kind: "bool",
              id: "en-a1-08-l3-12",
              no: 12,
              ref: "s2",
              text: "You keep the euro for the locker.",
              answer: false,
              explain:
                "Levha tam tersini söylüyor: «You get the euro back». Bir euro yalnız kapıyı açıp kapatmak için veriliyor.",
            },
            {
              kind: "bool",
              id: "en-a1-08-l3-13",
              no: 13,
              ref: "s3",
              text: "You can eat hot food at three in the afternoon.",
              answer: false,
              explain:
                "Levha saat aralığını veriyor: «Hot food from 12 to 14 only». Saat üç bu aralığın dışında; kafe açık ama sıcak yemek yok.",
            },
            {
              kind: "bool",
              id: "en-a1-08-l3-14",
              no: 14,
              ref: "s4",
              text: "Bicycles are not allowed on the grass.",
              answer: true,
              explain:
                "Levhanın son satırı bunu yasaklıyor: «No bicycles on the grass». Küçük saha ise on yaş altı çocuklar için ayrılmış.",
            },
          ],
        },
        {
          id: "en-a1-08-l4",
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
              title: "To Lior",
              body: `Hello Lior,

Thank you for the ball! I come to the club {{15}} Thursday, not on Tuesday.

There {{16}} a new coach this year. She is very good with children.

The training is at six, {{17}} I finish work at half past five. It is difficult.

Last week I {{18}} my old shoes to the club. Are they still there?

Juno`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-08-l4-15",
              no: 15,
              text: "Gap 15",
              options: ["in", "on", "at"],
              answer: 1,
              explain:
                "Gün adlarıyla `on` kullanılır: on Thursday. Cümlenin devamı da bunu gösteriyor: «not on Tuesday». `in` ay ve yıl için, `at` saat için gelir.",
            },
            {
              kind: "mcq",
              id: "en-a1-08-l4-16",
              no: 16,
              text: "Gap 16",
              options: ["are", "have", "is"],
              answer: 2,
              explain:
                "Kalıp `there is / there are` ve devamındaki özne tekil: «a new coach». Tekil özne `is` ister; `have` bu kalıpta hiç kullanılmaz.",
            },
            {
              kind: "mcq",
              id: "en-a1-08-l4-17",
              no: 17,
              text: "Gap 17",
              options: ["but", "so", "because"],
              answer: 0,
              explain:
                "İki bilgi çelişiyor: antrenman altıda, iş beş buçukta bitiyor. Karşıtlığı `but` kurar ve devamındaki «It is difficult» bunu doğruluyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-08-l4-18",
              no: 18,
              text: "Gap 18",
              options: ["take", "took", "takes"],
              answer: 1,
              explain:
                "Cümle «Last week» ile başlıyor: zaman geçmiş. `take` fiilinin geçmiş biçimi düzensizdir: `took`. Öteki iki şık geniş zamandır.",
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
          id: "en-a1-08-h1",
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
              situation: "Spor merkezinde anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "Attention please. The swimming pool is closed this afternoon; there is a problem with the water. The sports hall and the café are open as normal. The pool opens again tomorrow at seven." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Phone message",
              genreTr: "Telefon iletisi",
              situation: "Kulüp oyuncuya ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello, this is the football club. The game on Sunday is at the small field, not at the big one. Please come at nine. Bring your white shirt." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki arkadaş antrenman günlerini konuşuyor.",
              plays: 2,
              segments: [
                { text: "Do you play on Tuesday?" },
                { text: "No, I work. I play on Thursday." },
                { text: "And your brother?" },
                { text: "He plays every day. He is nineteen." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Announcement",
              genreTr: "Anons",
              situation: "Havuzda çocuk saati duyuruluyor.",
              plays: 2,
              segments: [
                { text: "A note for the children's hour. From Monday it is from five to six, not from four to five. Parents wait in the café, please, not next to the water." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "In the café",
              genreTr: "Kafede",
              situation: "Bir müşteri kafede sipariş veriyor.",
              plays: 2,
              segments: [
                { text: "One tea and one water, please." },
                { text: "Two euros fifty." },
                { text: "Can I eat something hot?" },
                { text: "Not now. Hot food is from twelve to two." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Phone message",
              genreTr: "Telefon iletisi",
              situation: "Bir oyuncu antrenman için ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hi Tuva, it is Juno. I cannot come to the training today; my leg hurts. I go to the doctor at four. I come again on Thursday." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-08-h1-1",
              no: 1,
              ref: "a1",
              text: "What is closed today?",
              options: ["The café", "The pool", "The sports hall"],
              answer: 1,
              explain:
                "Anons yalnız havuzu kapatıyor: «The swimming pool is closed this afternoon». Salon ve kafe için «open as normal» deniyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-08-h1-2",
              no: 2,
              ref: "a2",
              text: "What must the player bring?",
              options: ["A white shirt", "Water for the whole team", "A ball"],
              answer: 0,
              explain:
                "İletinin son cümlesi tek bir şey istiyor: «Bring your white shirt». Su ve top kayıtta hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-08-h1-3",
              no: 3,
              ref: "a3",
              text: "When does the speaker play?",
              options: ["On Tuesday after work", "Every day", "On Thursday"],
              answer: 2,
              explain:
                "Konuşmacı «No, I work. I play on Thursday» diyor. Her gün oynayan kardeşi; salı ise çalıştığı gün.",
            },
            {
              kind: "mcq",
              id: "en-a1-08-h1-4",
              no: 4,
              ref: "a4",
              text: "When is the children's hour from Monday?",
              options: ["From four to five", "From five to six", "From six to seven"],
              answer: 1,
              explain:
                "Anons düzeltmeyi kendisi yapıyor: «from five to six, not from four to five». Dörtten beşe eski saat.",
            },
            {
              kind: "mcq",
              id: "en-a1-08-h1-5",
              no: 5,
              ref: "a5",
              text: "What can the customer not do now?",
              options: ["Eat hot food", "Drink tea", "Pay with money"],
              answer: 0,
              explain:
                "Görevli saati veriyor: «Not now. Hot food is from twelve to two». Çay zaten sipariş edilip ödeniyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-08-h1-6",
              no: 6,
              ref: "a6",
              text: "Why does Juno not come?",
              options: ["She works today", "She is on holiday", "Her leg hurts"],
              answer: 2,
              explain:
                "İleti gerekçeyi veriyor: «my leg hurts» ve dörtte doktora gidiyor. İş ve tatil kayıtta hiç geçmiyor.",
            },
          ],
        },
        {
          id: "en-a1-08-h2",
          no: 2,
          format: "truefalse",
          goal: "instruction",
          prompt: "You hear an announcement at a sports club. Are sentences 7 to 10 true or false? You hear the announcement twice.",
          promptTr: "Bir spor kulübünde yapılan anonsu dinleyeceksin. 7–10. cümleler doğru mu yanlış mı? Anonsu iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Announcement",
              genreTr: "Anons",
              situation: "Kulüp sorumlusu üç değişiklik duyuruyor.",
              plays: 2,
              segments: [
                { text: "Good evening. Three short things. From next month the training moves from Tuesday to Wednesday, same time, six o'clock. The cost stays at twelve euros a month. And the new shirts are here: come to the office before Friday and take yours. There is one for every player." },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-08-h2-7",
              no: 7,
              ref: "b1",
              text: "The training moves to Wednesday.",
              answer: true,
              explain:
                "Anons günü değiştiriyor: «the training moves from Tuesday to Wednesday». Salı eski gün, çarşamba yeni gün.",
            },
            {
              kind: "bool",
              id: "en-a1-08-h2-8",
              no: 8,
              ref: "b1",
              text: "The training time changes.",
              answer: false,
              explain:
                "Anons saatin aynı kaldığını söylüyor: «same time, six o'clock». Değişen yalnız gün.",
            },
            {
              kind: "bool",
              id: "en-a1-08-h2-9",
              no: 9,
              ref: "b1",
              text: "The cost is more than twelve euros now.",
              answer: false,
              explain:
                "Anons ücreti sabitliyor: «The cost stays at twelve euros a month». `stays` değişiklik olmadığını bildiriyor.",
            },
            {
              kind: "bool",
              id: "en-a1-08-h2-10",
              no: 10,
              ref: "b1",
              text: "Every player gets a new shirt.",
              answer: true,
              explain:
                "Anonsun son cümlesi bunu söylüyor: «There is one for every player». Formalar cumadan önce ofisten alınacak.",
            },
          ],
        },
        {
          id: "en-a1-08-h3",
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
              situation: "Havuz üyeye ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello Mirek, this is the pool. Your ten-times card is finished. You can buy a new one at the desk. It is twenty euros, the same as last year." },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "At the club",
              genreTr: "Kulüpte",
              situation: "Yeni bir üye aidatı soruyor.",
              plays: 2,
              segments: [
                { text: "How much is the first month?" },
                { text: "Free for new players." },
                { text: "And after that?" },
                { text: "Twelve euros a month, or a hundred for the year." },
              ],
            },
            {
              kind: "audio",
              id: "c3",
              genre: "Between players",
              genreTr: "Oyuncular arasında",
              situation: "İki oyuncu maç yerini konuşuyor.",
              plays: 2,
              segments: [
                { text: "Where is the game on Saturday?" },
                { text: "At the school, not at the club." },
                { text: "Why?" },
                { text: "The grass at the club is wet. It rains all week." },
              ],
            },
            {
              kind: "audio",
              id: "c4",
              genre: "Announcement",
              genreTr: "Anons",
              situation: "Maçtan önce seyircilere anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "The game starts in ten minutes. Please take your seat. Bags go under the seat, not in the way. Photos are fine, but no big cameras." },
              ],
            },
            {
              kind: "audio",
              id: "c5",
              genre: "After the game",
              genreTr: "Maçtan sonra",
              situation: "İki arkadaş maç sonucunu konuşuyor.",
              plays: 2,
              segments: [
                { text: "Did you win?" },
                { text: "Two to one." },
                { text: "Very good!" },
                { text: "Not really. We play badly and they play worse. That is not the same as good." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-08-h3-11",
              no: 11,
              ref: "c1",
              text: "What must Mirek do?",
              options: ["Buy a new card", "Pay more than last year", "Come at a different time"],
              answer: 0,
              explain:
                "İleti tek bir iş veriyor: «You can buy a new one at the desk». Fiyat aynı kalıyor («the same as last year») ve saatten hiç söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-08-h3-12",
              no: 12,
              ref: "c2",
              text: "How much is one year?",
              options: ["Free for the first year", "Twelve euros", "A hundred euros"],
              answer: 2,
              explain:
                "Görevli iki fiyat veriyor: «Twelve euros a month, or a hundred for the year». Ücretsiz olan yalnız ilk ay.",
            },
            {
              kind: "mcq",
              id: "en-a1-08-h3-13",
              no: 13,
              ref: "c3",
              text: "Where is the game?",
              options: ["At the club as always", "At the school", "In the hall"],
              answer: 1,
              explain:
                "Cevap doğrudan veriliyor: «At the school, not at the club», çünkü kulüpteki çim ıslak. Salon hiç anılmıyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-08-h3-14",
              no: 14,
              ref: "c4",
              text: "What is not allowed?",
              options: ["Big cameras", "Photos with a phone", "Bags under the seat"],
              answer: 0,
              explain:
                "Anons ayrımı kendisi yapıyor: «Photos are fine, but no big cameras». Çantalar da yasak değil, koltuğun altına konuyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-08-h3-15",
              no: 15,
              ref: "c5",
              text: "What does the speaker say about the game?",
              options: ["They lost", "They played very well together", "They won but played badly"],
              answer: 2,
              explain:
                "Skor «Two to one», yani kazanmışlar; ama konuşmacı «We play badly and they play worse» diyor. Kazanmak ile iyi oynamak ayrı şeyler.",
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
          id: "en-a1-08-w1",
          no: 1,
          format: "gap",
          goal: "detail",
          prompt:
            "Your friend Vida Kern wants to join the swimming club. She is 34 years old and she swims on Wednesday. She lives at 4 Mill Street. Her phone number is 07700 900 815. Five things are missing on the form. Write them in the gaps.",
          promptTr:
            "Arkadaşın Vida Kern yüzme kulübüne yazılmak istiyor. 34 yaşında ve çarşamba günleri yüzüyor. 4 Mill Street adresinde oturuyor. Telefonu 07700 900 815. Formda beş bilgi eksik; boşluklara yaz.",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Form",
              genreTr: "Form",
              title: "SWIMMING CLUB — NEW MEMBER",
              body: `Family name:       Kern
First name:        {{1}}
Age:               {{2}}
Day:               {{3}}
Street and number: {{4}}
Phone:             {{5}}`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a1-08-w1-1",
              no: 1,
              text: "First name",
              accept: ["Vida"],
              explain:
                "Yönergede tam ad «Vida Kern» olarak geçiyor. Soyadı formda zaten basılı, bu yüzden boşluğa yalnız ilk ad yazılır.",
            },
            {
              kind: "gap",
              id: "en-a1-08-w1-2",
              no: 2,
              text: "Age",
              accept: ["34", "34 years", "thirty-four", "thirty-four years old"],
              explain:
                "Yönergede «She is 34 years old» geçiyor. Rakam da yazı da kabul edilir, çünkü ölçülen şey imla değil bilgiyi doğru alana taşımak.",
            },
            {
              kind: "gap",
              id: "en-a1-08-w1-3",
              no: 3,
              text: "Day",
              accept: ["Wednesday", "on Wednesday"],
              explain:
                "Yönerge günü veriyor: «she swims on Wednesday». Gün adları büyük harfle yazılır ama karşılaştırma büyük-küçük harfe bakmıyor.",
            },
            {
              kind: "gap",
              id: "en-a1-08-w1-4",
              no: 4,
              text: "Street and number",
              accept: ["4 Mill Street", "Mill Street 4"],
              explain:
                "Adres yönergede «4 Mill Street» olarak veriliyor. İngilizcede kapı numarası sokak adından ÖNCE gelir; Türkçe sıraya alışkın öğrenci ters yazabilir, ikisi de kabul ediliyor.",
            },
            {
              kind: "gap",
              id: "en-a1-08-w1-5",
              no: 5,
              text: "Phone",
              accept: ["07700 900 815", "07700900815"],
              explain:
                "Telefon numarası yönergede «07700 900 815» olarak veriliyor. Boşluklu ve boşluksuz yazım kabul edilir; baştaki sıfır düşürülmemeli.",
            },
          ],
        },
        {
          id: "en-a1-08-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "You cannot come to the game on Saturday. Write a short message to your coach. Write one or two sentences about each point (about 25 words). Do not forget the greeting at the start and at the end.",
          promptTr:
            "Cumartesi maçına gelemiyorsun. Antrenörüne kısa bir ileti yaz. Her maddeye bir-iki cümle yaz (yaklaşık 25 kelime). Baştaki hitabı ve sondaki veda cümlesini unutma.",
          items: [],
          rubric: {
            minWords: 25,
            points: [
              { de: "Say why you cannot come.", tr: "Neden gelemediğini söyle." },
              { de: "Say when you come again.", tr: "Ne zaman geleceğini söyle." },
              { de: "Say what the coach should do with your shirt.", tr: "Antrenörün formanla ne yapması gerektiğini söyle." },
            ],
            sample: `Hi Mirek,

I am very sorry. My sister comes from Berlin on Saturday and I go to the station at ten.

I come to the training on Thursday. Please give my shirt to Zeki.

See you on Thursday!
Juno`,
            criteria: [
              "Üç içerik noktasının üçü de var mı? Biri eksikse metin tam sayılmaz.",
              "Gerekçe somut mu verildi?",
              "Gün ya da saat açıkça söylendi mi?",
              "Rica kibar bir kalıpla mı kuruldu? (Please …)",
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
      instruction: "This part has three tasks: you talk about sport, you ask and answer questions, and you act at a club.",
      instructionTr: "Bu bölümde üç görev var: sporu anlatma, soru sorup cevaplama ve kulüpte rol yapma.",
      tasks: [
        {
          id: "en-a1-08-s1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt: "Talk about sport and free time. Speak about these words: a sport you do — a day in the week — a friend — a game on television — money — something you do not like.",
          promptTr: "Spor ve boş zamanı anlat. Şu sözcüklere göre konuş: yaptığın bir spor — haftanın bir günü — bir arkadaş — televizyondaki bir maç — para — sevmediğin bir şey.",
          prepSeconds: 30,
          speakSeconds: 90,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "a sport and the day you do it", tr: "Bir spor ve yaptığın gün" },
              { de: "a friend and a game on television", tr: "Bir arkadaş ve televizyondaki bir maç" },
              { de: "how much it costs", tr: "Ne kadara mal olduğu" },
              { de: "one thing you do not like", tr: "Sevmediğin bir şey" },
            ],
            sample:
              "I swim two times a week, on Monday and Thursday. I go at seven in the morning. My friend Lena comes with me. On Sunday we watch a football game on television. The pool is three euros, or twenty for ten times. I do not like the water in the winter; it is very cold.",
            criteria: [
              "Altı sözcüğün her birine değinildi mi?",
              "Gün, saat ve fiyat söylenebiliyor mu?",
              "Sıklık ifadeleri kullanıldı mı? (two times a week, on Monday)",
              "Anlaşılır bir tempoda mı konuşuldu?",
            ],
          },
        },
        {
          id: "en-a1-08-s2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Topic: sport and clubs. Make a question for each word and answer my questions: club — team — evening — shoes — money.",
          promptTr:
            "Konu: spor ve kulüpler. Her sözcük için bir soru kur ve benim sorularımı cevapla: kulüp — takım — akşam — ayakkabı — para.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "Now we talk about sport. Your first word is: club. Please ask me a question.", tr: "Şimdi sporu konuşuyoruz. İlk sözcüğün: kulüp. Bana bir soru sor." },
            { who: "you", hint: "«club» sözcüğüyle bir soru kur.", expect: "club sözcüğüyle dilbilgisel olarak doğru bir soru kurmak", seconds: 25 },
            { who: "partner", de: "I am in a small tennis club near the park. Your next word is: team.", tr: "Parkın yanındaki küçük bir tenis kulübündeyim. Sıradaki sözcüğün: takım." },
            { who: "you", hint: "«team» için bir soru kur.", expect: "team sözcüğüyle bir soru kurmak", seconds: 25 },
            { who: "partner", de: "There are eleven people in our team. Now a question for you: what do you do in the evening?", tr: "Takımımızda on bir kişi var. Şimdi sana bir soru: Akşamları ne yaparsın?" },
            { who: "you", hint: "Bir etkinlik ve saat söyleyerek cevapla.", expect: "bir etkinliği ve saatini tam bir cümleyle söylemek", seconds: 25 },
            { who: "partner", de: "Thank you. Last question: how much is a month at a sports club where you live?", tr: "Teşekkürler. Son soru: Yaşadığın yerde bir spor kulübünün aylığı ne kadar?" },
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
              "Are you in a club? — Yes, a tennis club. How many people are in your team? — Eleven. What do you do in the evening? — I run in the park at seven. Have you got shoes for the grass? — Yes, old ones. How much is a month? — Twelve euros.",
            criteria: [
              "Beş sözcüğün her biri için bir soru kuruldu mu?",
              "Sorular doğru kuruldu mu? (Are you … / How many … / How much …)",
              "Cevaplar soruya uygun mu?",
              "Sayı ve saat söylenebiliyor mu?",
            ],
          },
        },
        {
          id: "en-a1-08-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "You are at a sports club. Situations: you say what you want to do. — You ask about the days. — You ask about the price.",
          promptTr:
            "Bir spor kulübündesin. Durumlar: Ne yapmak istediğini söyle. — Günleri sor. — Fiyatı sor.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good afternoon. How can I help you?", tr: "İyi günler. Nasıl yardımcı olabilirim?" },
            { who: "you", hint: "Hangi sporu yapmak istediğini söyle.", expect: "yapmak istediği sporu tam bir cümleyle söylemek", seconds: 25 },
            { who: "partner", de: "Of course. We have a group for that.", tr: "Tabii. Bunun için bir grubumuz var." },
            { who: "you", hint: "Hangi günler olduğunu sor.", expect: "gün sormak", seconds: 25 },
            { who: "partner", de: "Tuesday and Friday at seven. Anything else?", tr: "Salı ve cuma saat yedide. Başka bir şey var mı?" },
            { who: "you", hint: "Fiyatı kibarca sor.", expect: "kibarca fiyat sormak", seconds: 25 },
          ],
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "say what you want to do", tr: "Ne yapmak istediğini söylemek" },
              { de: "ask about the days", tr: "Günleri sormak" },
              { de: "ask about the price politely", tr: "Kibarca fiyat sormak" },
            ],
            sample:
              "I would like to play football, please. — Which days is the training? — How much is it a month, please?",
            criteria: [
              "İstek açıkça söylendi mi? (hangi spor)",
              "Gün sorusu doğru kuruldu mu? (Which days … / When …)",
              "Fiyat sorusu kibar bir kalıpla mı kuruldu? (How much is … please)",
              "Sayılar (gün, saat, fiyat) anlaşıldı mı?",
            ],
          },
        },
      ],
    },
  ],
};
