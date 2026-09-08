import type { MockPaper } from "../types";

/**
 * A1 · Deneme 9 — "The Library, Courses and Learning".
 *
 * A1'in öteki denemeleriyle AYNI PLAN; konu ayrı. Kütüphane A1 için
 * elverişli bir zemin: açılış saati, ücret, gün, kat ve süre aynı metinde
 * doğal olarak bir arada duruyor ve hepsi bu seviyenin ölçtüğü bilgi.
 * Önceki sekiz denemenin hiçbiri kurs kaydı ve ödünç alma diliyle
 * ilgilenmiyordu.
 *
 * A1 SINIRI: geniş zaman, `there is / there are`, basit geçmiş yalnız
 * düzensiz birkaç fiilde, `and / but / because`, cümleler kısa.
 */
export const EN_A1_09: MockPaper = {
  id: "en-a1-09",
  course: "en",
  level: "A1",
  no: 9,
  theme: "The Library, Courses and Learning",
  themeTr: "Kütüphane, kurslar ve öğrenmek",
  minutes: 85,
  parts: [
    /* ── READING ───────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 30,
      instruction: "This part has four tasks. You read messages, notices, signs and a short text with gaps.",
      instructionTr: "Bu bölümde dört görev var. İletiler, duyurular, levhalar ve boşluklu kısa bir metin okuyacaksın.",
      tasks: [
        {
          id: "en-a1-09-l1",
          no: 1,
          format: "truefalse",
          goal: "detail",
          prompt: "Read the two texts and questions 1 to 5. Are the sentences true or false?",
          promptTr: "İki metni ve 1–5. maddeleri oku. Cümleler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Message from the teacher",
              genreTr: "Öğretmenden ileti",
              title: "The English course",
              body: `Hi Yasin,

The English course starts on Monday, not on Tuesday. It is at seven in the evening.

The book costs twelve euros. You can buy it in the library.

Please bring a pen. We have no pens here.

Ines`,
              gloss: [
                { de: "a course", tr: "kurs", en: "course" },
                { de: "a pen", tr: "kalem", en: "pen" },
              ],
            },
            {
              kind: "text",
              id: "t2",
              genre: "Notice in the library",
              genreTr: "Kütüphane duyurusu",
              title: "CITY LIBRARY",
              body: `Open from 10 to 19. On Saturday from 10 to 14.

A card is free. Please bring your passport.

You can take four books for three weeks.

Coffee and food are not allowed here.`,
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-09-l1-1",
              no: 1,
              ref: "t1",
              text: "The course starts on Monday.",
              answer: true,
              explain:
                "İleti iki günü karşılaştırıyor: «The English course starts on Monday, not on Tuesday». Salı bilerek elenen gün.",
            },
            {
              kind: "bool",
              id: "en-a1-09-l1-2",
              no: 2,
              ref: "t1",
              text: "The book is free.",
              answer: false,
              explain:
                "İleti fiyat veriyor: «The book costs twelve euros». Ücretsiz olan kütüphane kartıdır, kitap değil.",
            },
            {
              kind: "bool",
              id: "en-a1-09-l1-3",
              no: 3,
              ref: "t1",
              text: "Yasin must bring a pen.",
              answer: true,
              explain:
                "İleti bunu gerekçesiyle istiyor: «Please bring a pen. We have no pens here».",
            },
            {
              kind: "bool",
              id: "en-a1-09-l1-4",
              no: 4,
              ref: "t2",
              text: "You pay for a library card.",
              answer: false,
              explain:
                "Duyuru açıkça söylüyor: «A card is free». İstenen şey para değil, pasaport.",
            },
            {
              kind: "bool",
              id: "en-a1-09-l1-5",
              no: 5,
              ref: "t2",
              text: "You can take four books.",
              answer: true,
              explain:
                "Duyuru sayıyı ve süreyi birlikte veriyor: «You can take four books for three weeks».",
            },
          ],
        },
        {
          id: "en-a1-09-l2",
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
              title: "City Library",
              body: `Open from 10 to 19. Saturday from 10 to 14.

Card free with your passport.

Four books for three weeks.

Newspapers in five languages.`,
            },
            {
              kind: "text",
              id: "p2",
              genre: "Notice",
              genreTr: "Duyuru",
              title: "Computer Room",
              body: `First floor. Open from 12 to 20 every day.

One hour free, then two euros an hour.

Help with forms on Tuesday morning.

Printing: ten cents a page.`,
            },
            {
              kind: "text",
              id: "p3",
              genre: "Notice",
              genreTr: "Duyuru",
              title: "Evening Courses",
              body: `English, Spanish and computers.

Monday to Thursday at 19.

Twelve euros a month. First evening free.

Write your name at the desk.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-09-l2-6",
              no: 6,
              text: "You want to print two pages.",
              options: ["City Library", "Computer Room", "Evening Courses"],
              answer: 1,
              explain:
                "Duyuru fiyatı veriyor: «Printing: ten cents a page». Öteki iki yerde yazıcıdan hiç söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-09-l2-7",
              no: 7,
              text: "You want to read a newspaper in your language.",
              options: ["City Library", "Computer Room", "Evening Courses"],
              answer: 0,
              explain:
                "Duyuru bunu son satırda söylüyor: «Newspapers in five languages».",
            },
            {
              kind: "mcq",
              id: "en-a1-09-l2-8",
              no: 8,
              text: "You want to learn Spanish in the evening.",
              options: ["City Library", "Computer Room", "Evening Courses"],
              answer: 2,
              explain:
                "Duyuru hem dersi hem saati veriyor: «English, Spanish and computers» ve «Monday to Thursday at 19».",
            },
            {
              kind: "mcq",
              id: "en-a1-09-l2-9",
              no: 9,
              text: "You need help with a form on Tuesday morning.",
              options: ["City Library", "Computer Room", "Evening Courses"],
              answer: 1,
              explain:
                "Duyuru günü ve yardımı birlikte veriyor: «Help with forms on Tuesday morning». Kurslar akşam, kütüphanede ise böyle bir hizmet yok.",
            },
            {
              kind: "mcq",
              id: "en-a1-09-l2-10",
              no: 10,
              text: "You want to take books home for three weeks.",
              options: ["City Library", "Computer Room", "Evening Courses"],
              answer: 0,
              explain:
                "Duyuru süreyi veriyor: «Four books for three weeks». Bilgisayar odası ve kurslar kitap ödünç vermiyor.",
            },
          ],
        },
        {
          id: "en-a1-09-l3",
          no: 3,
          format: "truefalse",
          goal: "instruction",
          prompt: "Read the four signs and questions 11 to 14. Are the sentences true or false?",
          promptTr: "Dört levhayı ve 11–14. maddeleri oku. Cümleler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "s1",
              genre: "Sign",
              genreTr: "Levha",
              title: "QUIET ROOM",
              body: `No telephones. No talking.

Open until 22.`,
            },
            {
              kind: "text",
              id: "s2",
              genre: "Sign",
              genreTr: "Levha",
              title: "COMPUTER 3",
              body: `Out of order today.

Please use computer 4 or 5.`,
            },
            {
              kind: "text",
              id: "s3",
              genre: "Sign",
              genreTr: "Levha",
              title: "CHILDREN'S BOOKS",
              body: `First floor.

Story hour: Wednesday at 16.`,
            },
            {
              kind: "text",
              id: "s4",
              genre: "Sign",
              genreTr: "Levha",
              title: "RETURN BOOKS HERE",
              body: `Late books: 20 cents a day.

Ask at the desk for more time.`,
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-09-l3-11",
              no: 11,
              ref: "s1",
              text: "You can talk in the quiet room.",
              answer: false,
              explain:
                "Levha iki şeyi birden yasaklıyor: «No telephones. No talking». Odanın adı da bunu söylüyor.",
            },
            {
              kind: "bool",
              id: "en-a1-09-l3-12",
              no: 12,
              ref: "s2",
              text: "Computer 3 works today.",
              answer: false,
              explain:
                "Levha «Out of order today» diyor ve başka makineler gösteriyor: «Please use computer 4 or 5».",
            },
            {
              kind: "bool",
              id: "en-a1-09-l3-13",
              no: 13,
              ref: "s3",
              text: "The story hour is on Wednesday.",
              answer: true,
              explain:
                "Levha günü ve saati birlikte veriyor: «Story hour: Wednesday at 16». Levhanın üst satırı ise yeri söylüyor: çocuk kitapları birinci katta. Cümlede sorulan gün, bu iki bilgiden ilkidir.",
            },
            {
              kind: "bool",
              id: "en-a1-09-l3-14",
              no: 14,
              ref: "s4",
              text: "You pay if a book comes back late.",
              answer: true,
              explain:
                "Levha ücreti günlük veriyor: «Late books: 20 cents a day». Daha uzun süre için bankoya sorulabiliyor.",
            },
          ],
        },
        {
          id: "en-a1-09-l4",
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
              title: "To Vesna",
              body: `Hello Vesna,

I am in the library {{15}} Monday to Friday. Come and find me!

There {{16}} two computer rooms now. The new one is on the second floor.

I want to learn Spanish, {{17}} the course is full. I am sad.

Last week I {{18}} four books home. They are very good.

Lenn`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-09-l4-15",
              no: 15,
              text: "Gap 15",
              options: ["at", "in", "from"],
              answer: 2,
              explain:
                "İki gün arası `from … to` ile verilir: «from Monday to Friday». `at` saat için, `in` ay ve yıl için gelir.",
            },
            {
              kind: "mcq",
              id: "en-a1-09-l4-16",
              no: 16,
              text: "Gap 16",
              options: ["is", "are", "have"],
              answer: 1,
              explain:
                "Kalıp `there is / there are` ve özne çoğul: «two computer rooms». Çoğul özne `are` ister; `have` bu kalıpta kullanılmaz.",
            },
            {
              kind: "mcq",
              id: "en-a1-09-l4-17",
              no: 17,
              text: "Gap 17",
              options: ["but", "so", "because"],
              answer: 0,
              explain:
                "İki bilgi karşıt: öğrenmek istiyor ama kurs dolu. Karşıtlığı `but` kurar ve devamındaki «I am sad» bunu doğruluyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-09-l4-18",
              no: 18,
              text: "Gap 18",
              options: ["take", "takes", "took"],
              answer: 2,
              explain:
                "Cümle «Last week» ile başlıyor, yani zaman geçmiş. `take` fiilinin geçmiş biçimi düzensizdir: `took`.",
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
          id: "en-a1-09-h1",
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
              situation: "Kütüphane bir üyeye ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello, this is the city library about your books. Two books are late. It is twenty cents a day. Please bring them before Saturday." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "At the desk",
              genreTr: "Bankoda",
              situation: "Bir kişi kütüphane kartı istiyor.",
              plays: 2,
              segments: [
                { text: "I would like a card, please." },
                { text: "Do you have your passport?" },
                { text: "I have a photo of it on my phone." },
                { text: "I am sorry. We need the passport itself." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki arkadaş İspanyolca kursunu konuşuyor.",
              plays: 2,
              segments: [
                { text: "Is the Spanish course on Monday?" },
                { text: "It was on Monday. Now it is on Wednesday, same time." },
                { text: "Seven o'clock?" },
                { text: "Yes, seven." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "In the computer room",
              genreTr: "Bilgisayar odasında",
              situation: "Bir kişi fiyat soruyor.",
              plays: 2,
              segments: [
                { text: "How much is one hour?" },
                { text: "The first hour is free. After that it is two euros." },
                { text: "And printing?" },
                { text: "Ten cents a page." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Announcement",
              genreTr: "Anons",
              situation: "Kütüphanede kapanış anonsu yapılıyor.",
              plays: 2,
              segments: [
                { text: "The library closes in ten minutes. Please bring your books to the desk now. The computer room closes at eight." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Phone message",
              genreTr: "Telefon iletisi",
              situation: "Bir baba arkadaşına ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hi Sora, it is Halvard. The story hour on Wednesday is at four, not at three. My daughter is very happy. See you there." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-09-h1-1",
              no: 1,
              ref: "a1",
              text: "Why does the library call?",
              options: ["Two books are late", "The library closes early", "A new card is ready"],
              answer: 0,
              explain:
                "İleti sebebi ilk cümlelerde veriyor: «Two books are late. It is twenty cents a day».",
            },
            {
              kind: "mcq",
              id: "en-a1-09-h1-2",
              no: 2,
              ref: "a2",
              text: "What does the woman need?",
              options: ["A photo of her passport", "Money for the card", "Her passport"],
              answer: 2,
              explain:
                "Görevli fotoğrafı kabul etmiyor: «We need the passport itself». Kart ücretsiz olduğu için para gerekmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-09-h1-3",
              no: 3,
              ref: "a3",
              text: "What has changed?",
              options: ["The time of the course", "The day of the course", "The room of the course"],
              answer: 1,
              explain:
                "Konuşma günü değiştiriyor: «Now it is on Wednesday, same time». Saat yedi olarak kalıyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-09-h1-4",
              no: 4,
              ref: "a4",
              text: "How much is the first hour?",
              options: ["Nothing", "Two euros", "Ten cents"],
              answer: 0,
              explain:
                "Görevli iki fiyatı ayırıyor: «The first hour is free. After that it is two euros». On sent bir sayfa baskının ücreti.",
            },
            {
              kind: "mcq",
              id: "en-a1-09-h1-5",
              no: 5,
              ref: "a5",
              text: "What must people do now?",
              options: ["Go to the computer room", "Pay for their books", "Take their books to the desk"],
              answer: 2,
              explain:
                "Anons tek bir şey istiyor: «Please bring your books to the desk now».",
            },
            {
              kind: "mcq",
              id: "en-a1-09-h1-6",
              no: 6,
              ref: "a6",
              text: "What time is the story hour?",
              options: ["At three", "At four", "At five"],
              answer: 1,
              explain:
                "İleti saati düzeltiyor: «is at four, not at three». Üç eski saat.",
            },
          ],
        },
        {
          id: "en-a1-09-h2",
          no: 2,
          format: "truefalse",
          goal: "instruction",
          prompt: "You hear an announcement in a library. Are sentences 7 to 10 true or false? You hear the announcement twice.",
          promptTr: "Bir kütüphanede yapılan anonsu dinleyeceksin. 7–10. cümleler doğru mu yanlış mı? Anonsu iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Announcement",
              genreTr: "Anons",
              situation: "Kütüphane sorumlusu iki değişiklik duyuruyor.",
              plays: 2,
              segments: [
                { text: "Good evening. Two things. From Monday the library opens at nine, not at ten. The computer room does not change: it is open from twelve. And the Spanish course is full. There is a new course in March." },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-09-h2-7",
              no: 7,
              ref: "b1",
              text: "From Monday the library opens earlier.",
              answer: true,
              explain:
                "Anons iki saati karşılaştırıyor: «the library opens at nine, not at ten». Dokuz ondan daha erken.",
            },
            {
              kind: "bool",
              id: "en-a1-09-h2-8",
              no: 8,
              ref: "b1",
              text: "The computer room opens at nine now.",
              answer: false,
              explain:
                "Anons odayı bilerek dışarıda bırakıyor: «The computer room does not change: it is open from twelve».",
            },
            {
              kind: "bool",
              id: "en-a1-09-h2-9",
              no: 9,
              ref: "b1",
              text: "There is a place in the Spanish course.",
              answer: false,
              explain:
                "Anons «the Spanish course is full» diyor. Yer yok; yeni kurs mart ayında.",
            },
            {
              kind: "bool",
              id: "en-a1-09-h2-10",
              no: 10,
              ref: "b1",
              text: "A new Spanish course starts in March.",
              answer: true,
              explain:
                "Anonsun son cümlesi bunu söylüyor: «There is a new course in March».",
            },
          ],
        },
        {
          id: "en-a1-09-h3",
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
              situation: "Kurs sorumlusu ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello, this is about the English course. The first evening is free. It starts on Monday at seven, in room 12 and not in room 10." },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "At the desk",
              genreTr: "Bankoda",
              situation: "Bir kişi kartını kaybettiğini söylüyor.",
              plays: 2,
              segments: [
                { text: "I lost my library card." },
                { text: "A new one is three euros." },
                { text: "Three? The first one was free." },
                { text: "The first one is free. The second one is not." },
              ],
            },
            {
              kind: "audio",
              id: "c3",
              genre: "At the desk",
              genreTr: "Bankoda",
              situation: "Bir baba kaç kitap alabileceğini soruyor.",
              plays: 2,
              segments: [
                { text: "Can I take six books?" },
                { text: "Four books, please." },
                { text: "My son also has a card." },
                { text: "Then he can take four too." },
              ],
            },
            {
              kind: "audio",
              id: "c4",
              genre: "Announcement",
              genreTr: "Anons",
              situation: "Bilgisayar odası için anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "The computer room is closed today. There is water on the floor. It opens again tomorrow at twelve." },
              ],
            },
            {
              kind: "audio",
              id: "c5",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki arkadaş akşamki kursu konuşuyor.",
              plays: 2,
              segments: [
                { text: "Do you go to the course tonight?" },
                { text: "No. I work until eight." },
                { text: "The course is at seven." },
                { text: "I know. I go on Thursday now." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-09-h3-11",
              no: 11,
              ref: "c1",
              text: "Which room is the course in?",
              options: ["Room 7", "Room 10", "Room 12"],
              answer: 2,
              explain:
                "İleti odayı düzeltiyor: «in room 12 and not in room 10». Yedi kursun saati, oda numarası değil.",
            },
            {
              kind: "mcq",
              id: "en-a1-09-h3-12",
              no: 12,
              ref: "c2",
              text: "How much is a new card?",
              options: ["Three euros", "Nothing", "Twenty cents"],
              answer: 0,
              explain:
                "Görevli fiyatı veriyor: «A new one is three euros» ve kuralı açıklıyor: «The first one is free. The second one is not».",
            },
            {
              kind: "mcq",
              id: "en-a1-09-h3-13",
              no: 13,
              ref: "c3",
              text: "What does the woman say?",
              options: ["Six books are fine", "Each card is four books", "Children have no cards"],
              answer: 1,
              explain:
                "Görevli sınırı koyup oğul için de aynısını söylüyor: «Four books, please» ve «Then he can take four too».",
            },
            {
              kind: "mcq",
              id: "en-a1-09-h3-14",
              no: 14,
              ref: "c4",
              text: "Why is the room closed?",
              options: ["It is a public holiday", "The room is closed every Monday", "The floor is wet"],
              answer: 2,
              explain:
                "Anons sebebi doğrudan veriyor: «There is water on the floor». Kapanış yalnız bugüne ait; oda yarın on ikide yeniden açılıyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-09-h3-15",
              no: 15,
              ref: "c5",
              text: "Why does she not go tonight?",
              options: ["She works", "She is ill", "The course is full"],
              answer: 0,
              explain:
                "Konuşmacı sebebi söylüyor: «I work until eight», oysa kurs yedide. Artık perşembe günü gidiyor.",
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
          id: "en-a1-09-w1",
          no: 1,
          format: "gap",
          goal: "detail",
          prompt:
            "Your friend Ines Roth wants a library card. She is 27 years old. She lives at 12 Green Road. Her phone number is 07700 900 342. She wants the English course. Five things are missing on the form. Write them in the gaps.",
          promptTr:
            "Arkadaşın Ines Roth kütüphane kartı istiyor. 27 yaşında. 12 Green Road adresinde oturuyor. Telefonu 07700 900 342. İngilizce kursunu istiyor. Formda beş bilgi eksik; boşluklara yaz.",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Form",
              genreTr: "Form",
              title: "CITY LIBRARY — NEW CARD",
              body: `Family name:       Roth
First name:        {{1}}
Age:               {{2}}
Street and number: {{3}}
Phone:             {{4}}
Course:            {{5}}`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a1-09-w1-1",
              no: 1,
              text: "First name",
              accept: ["Ines"],
              explain:
                "Yönergede tam ad «Ines Roth» olarak geçiyor. Soyadı formda basılı olduğu için boşluğa yalnız ilk ad yazılır.",
            },
            {
              kind: "gap",
              id: "en-a1-09-w1-2",
              no: 2,
              text: "Age",
              accept: ["27", "27 years", "twenty-seven", "twenty-seven years old"],
              explain:
                "Yönergede «She is 27 years old» geçiyor. Rakam da yazı da kabul edilir; ölçülen şey imla değil, bilgiyi doğru alana taşımak.",
            },
            {
              kind: "gap",
              id: "en-a1-09-w1-3",
              no: 3,
              text: "Street and number",
              accept: ["12 Green Road", "Green Road 12"],
              explain:
                "Adres yönergede «12 Green Road» olarak veriliyor. İngilizcede kapı numarası sokak adından ÖNCE gelir; Türkçe sıraya alışkın öğrenci ters yazabilir, ikisi de kabul ediliyor.",
            },
            {
              kind: "gap",
              id: "en-a1-09-w1-4",
              no: 4,
              text: "Phone",
              accept: ["07700 900 342", "07700900342"],
              explain:
                "Telefon numarası yönergede «07700 900 342» olarak veriliyor. Boşluklu ve boşluksuz yazım kabul edilir; baştaki sıfır düşürülmemeli.",
            },
            {
              kind: "gap",
              id: "en-a1-09-w1-5",
              no: 5,
              text: "Course",
              accept: ["English"],
              explain:
                "Yönerge kursu adlandırıyor: «She wants the English course». Dil adları büyük harfle yazılır ama karşılaştırma büyük-küçük harfe bakmıyor.",
            },
          ],
        },
        {
          id: "en-a1-09-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "You start an evening course next week. Write a short message to your friend and invite her. Write one or two sentences about each point (about 25 words). Do not forget the greeting at the start and at the end.",
          promptTr:
            "Gelecek hafta bir akşam kursuna başlıyorsun. Arkadaşına kısa bir ileti yaz ve onu da davet et. Her maddeye bir-iki cümle yaz (yaklaşık 25 kelime). Baştaki hitabı ve sondaki veda cümlesini unutma.",
          items: [],
          rubric: {
            minWords: 25,
            points: [
              { de: "Say what the course is and when it is.", tr: "Kursun ne olduğunu ve ne zaman olduğunu söyle." },
              { de: "Say how much it costs.", tr: "Ne kadar tuttuğunu söyle." },
              { de: "Ask your friend to come with you.", tr: "Arkadaşından seninle gelmesini iste." },
            ],
            sample: `Hi Vesna,

I start the Spanish course on Monday. It is at seven in the library.

It is twelve euros a month and the first evening is free.

Please come with me!

See you soon,
Lenn`,
            criteria: [
              "Üç içerik noktasının üçü de var mı? Biri eksikse metin tam sayılmaz.",
              "Gün ve saat açıkça söylendi mi?",
              "Fiyat verildi mi ve para birimi yazıldı mı?",
              "Davet kibar bir kalıpla mı kuruldu? (Please come …)",
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
      instruction: "This part has three tasks: you talk about learning, you ask and answer questions, and you act in a library.",
      instructionTr: "Bu bölümde üç görev var: öğrenmeyi anlatma, soru sorup cevaplama ve kütüphanede rol yapma.",
      tasks: [
        {
          id: "en-a1-09-s1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt: "Talk about books and learning. Speak about these words: a language — a book — a day in the week — a teacher — money — something difficult.",
          promptTr: "Kitapları ve öğrenmeyi anlat. Şu sözcüklere göre konuş: bir dil — bir kitap — haftanın bir günü — bir öğretmen — para — zor bir şey.",
          prepSeconds: 30,
          speakSeconds: 90,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "a language and the day you learn it", tr: "Bir dil ve onu öğrendiğin gün" },
              { de: "a book and a teacher", tr: "Bir kitap ve bir öğretmen" },
              { de: "how much it costs", tr: "Ne kadara mal olduğu" },
              { de: "one difficult thing", tr: "Zor olan bir şey" },
            ],
            sample:
              "I learn English on Monday and Thursday. The course is at seven in the evening. My teacher is Ines and she is very good. I read a small book about a family in London. The course is twelve euros a month. The numbers are difficult for me.",
            criteria: [
              "Altı sözcüğün her birine değinildi mi?",
              "Gün, saat ve fiyat söylenebiliyor mu?",
              "Sıklık ifadeleri kullanıldı mı? (on Monday, every week)",
              "Anlaşılır bir tempoda mı konuşuldu?",
            ],
          },
        },
        {
          id: "en-a1-09-s2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Topic: books and courses. Make a question for each word and answer my questions: library — book — evening — teacher — money.",
          promptTr:
            "Konu: kitaplar ve kurslar. Her sözcük için bir soru kur ve benim sorularımı cevapla: kütüphane — kitap — akşam — öğretmen — para.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "Now we talk about books. Your first word is: library. Please ask me a question.", tr: "Şimdi kitapları konuşuyoruz. İlk sözcüğün: kütüphane. Bana bir soru sor." },
            { who: "you", hint: "«library» sözcüğüyle bir soru kur.", expect: "library sözcüğüyle dilbilgisel olarak doğru bir soru kurmak", seconds: 25 },
            { who: "partner", de: "The library near me opens at ten. Your next word is: book.", tr: "Yakınımdaki kütüphane onda açılıyor. Sıradaki sözcüğün: kitap." },
            { who: "you", hint: "«book» için bir soru kur.", expect: "book sözcüğüyle bir soru kurmak", seconds: 25 },
            { who: "partner", de: "I read a book about a small town in Italy. Now a question for you: what do you do in the evening?", tr: "İtalya'da küçük bir kasabayla ilgili bir kitap okuyorum. Şimdi sana bir soru: Akşamları ne yaparsın?" },
            { who: "you", hint: "Bir etkinlik ve saat söyleyerek cevapla.", expect: "bir etkinliği ve saatini tam bir cümleyle söylemek", seconds: 25 },
            { who: "partner", de: "Thank you. Last question: how much is a language course where you live?", tr: "Teşekkürler. Son soru: Yaşadığın yerde bir dil kursu ne kadar?" },
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
              "Where is your library? — Near my house. What book do you read? — A book about Italy. What do you do in the evening? — I read at nine. Who is your teacher? — Her name is Ines. How much is a course? — Twelve euros a month.",
            criteria: [
              "Beş sözcüğün her biri için bir soru kuruldu mu?",
              "Sorular doğru kuruldu mu? (Where is … / What … / How much …)",
              "Cevaplar soruya uygun mu?",
              "Sayı ve saat söylenebiliyor mu?",
            ],
          },
        },
        {
          id: "en-a1-09-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "You are in a library. Situations: you say what you want. — You ask about the days. — You ask about the price.",
          promptTr:
            "Bir kütüphanedesin. Durumlar: Ne istediğini söyle. — Günleri sor. — Fiyatı sor.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good morning. How can I help you?", tr: "Günaydın. Nasıl yardımcı olabilirim?" },
            { who: "you", hint: "Ne istediğini söyle (kart, kitap ya da kurs).", expect: "istediği şeyi tam bir cümleyle söylemek", seconds: 25 },
            { who: "partner", de: "Of course. We have a course for that.", tr: "Tabii. Bunun için bir kursumuz var." },
            { who: "you", hint: "Hangi günler olduğunu sor.", expect: "gün sormak", seconds: 25 },
            { who: "partner", de: "Monday and Wednesday at seven. Anything else?", tr: "Pazartesi ve çarşamba saat yedide. Başka bir şey var mı?" },
            { who: "you", hint: "Fiyatı kibarca sor.", expect: "kibarca fiyat sormak", seconds: 25 },
          ],
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "say what you want", tr: "Ne istediğini söylemek" },
              { de: "ask about the days", tr: "Günleri sormak" },
              { de: "ask about the price politely", tr: "Kibarca fiyat sormak" },
            ],
            sample:
              "I would like an English course, please. — Which days is the course? — How much is it a month, please?",
            criteria: [
              "İstek açıkça söylendi mi?",
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
