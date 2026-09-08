import type { MockPaper } from "../types";

/**
 * A1 · Deneme 12 — "The First Day at Work".
 *
 * A1'in öteki denemeleriyle AYNI PLAN; konu ayrı. İkinci denemede iş,
 * ev ve boş zamanla birlikte geçiyor ve yalnız "ne iş yaparsın" düzeyinde
 * kalıyordu. Burası ilk günün kendi dilini veriyor: kat, kart, mola,
 * kantin, kurs saati. Onuncu ve on birinci denemede olduğu gibi metinler
 * kurumun kişiyle konuştuğu türden.
 *
 * A1 SINIRI: geniş zaman, `there is / there are`, basit geçmiş yalnız
 * düzensiz birkaç fiilde, `and / but / because`, cümleler kısa.
 */
export const EN_A1_12: MockPaper = {
  id: "en-a1-12",
  course: "en",
  level: "A1",
  no: 12,
  theme: "The First Day at Work",
  themeTr: "İşte ilk gün",
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
          id: "en-a1-12-l1",
          no: 1,
          format: "truefalse",
          goal: "detail",
          prompt: "Read the two texts and questions 1 to 5. Are the sentences true or false?",
          promptTr: "İki metni ve 1–5. maddeleri oku. Cümleler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Email from the office",
              genreTr: "Ofisten e-posta",
              title: "Welcome",
              body: `Dear Eyup,

Welcome! Your first day is Monday.

Please come at nine, not at eight. The office is on the second floor.

Ask for Mira at the desk. Bring your passport.

Mira`,
              gloss: [
                { de: "an office", tr: "ofis, büro", en: "office" },
                { de: "a floor", tr: "kat", en: "floor" },
              ],
            },
            {
              kind: "text",
              id: "t2",
              genre: "Notice in a canteen",
              genreTr: "Kantin duyurusu",
              title: "CANTEEN",
              body: `Open 12 to 14.

Soup and bread are free for staff.

Hot food: 4 euros. Please bring your card.

You cannot pay with money here.`,
              gloss: [
                { de: "a canteen", tr: "yemekhane", en: "canteen" },
                { de: "staff", tr: "çalışanlar", en: "staff" },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-12-l1-1",
              no: 1,
              ref: "t1",
              text: "Eyup starts on Monday.",
              answer: true,
              explain:
                "E-posta günü doğrudan veriyor: «Your first day is Monday». Aynı e-postada saat de düzeltiliyor (dokuz, sekiz değil), ama sorulan bilgi gün; iki sayıyı ayırmak gerekiyor.",
            },
            {
              kind: "bool",
              id: "en-a1-12-l1-2",
              no: 2,
              ref: "t1",
              text: "Eyup must come at eight.",
              answer: false,
              explain:
                "E-posta iki saati karşılaştırıyor: «come at nine, not at eight». Sekiz bilerek elenen saat.",
            },
            {
              kind: "bool",
              id: "en-a1-12-l1-3",
              no: 3,
              ref: "t1",
              text: "Eyup must bring money.",
              answer: false,
              explain:
                "E-posta tek bir şey istiyor: «Bring your passport». Paradan hiç söz edilmiyor.",
            },
            {
              kind: "bool",
              id: "en-a1-12-l1-4",
              no: 4,
              ref: "t2",
              text: "The soup costs four euros.",
              answer: false,
              explain:
                "Duyuru ikisini ayırıyor: «Soup and bread are free for staff» ama «Hot food: 4 euros».",
            },
            {
              kind: "bool",
              id: "en-a1-12-l1-5",
              no: 5,
              ref: "t2",
              text: "You cannot pay with cash here.",
              answer: true,
              explain:
                "Duyurunun son satırı bunu söylüyor: «You cannot pay with money here». Kart gerekiyor.",
            },
          ],
        },
        {
          id: "en-a1-12-l2",
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
              title: "Office",
              body: `Second floor. Open 8 to 18.

Ask for Mira at the desk.

New staff: please come at nine on the first day.`,
            },
            {
              kind: "text",
              id: "p2",
              genre: "Notice",
              genreTr: "Duyuru",
              title: "Canteen",
              body: `Open 12 to 14.

Soup and bread free for staff. Hot food 4 euros.

Card only, no cash.`,
            },
            {
              kind: "text",
              id: "p3",
              genre: "Notice",
              genreTr: "Duyuru",
              title: "Training Room",
              body: `First floor, room 5.

Computer course for new staff: Tuesday and Thursday at 10.

Please bring a pen.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-12-l2-6",
              no: 6,
              text: "It is your first day and you do not know where to go.",
              options: ["Office", "Canteen", "Training Room"],
              answer: 0,
              explain:
                "Duyuru yeni gelenlere yönerge veriyor: «New staff: please come at nine on the first day», ve bankoda kime sorulacağını söylüyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-12-l2-7",
              no: 7,
              text: "You want something to eat at half past twelve.",
              options: ["Office", "Canteen", "Training Room"],
              answer: 1,
              explain:
                "Duyuru saatleri veriyor: «Open 12 to 14». On iki buçuk bu aralığın içinde.",
            },
            {
              kind: "mcq",
              id: "en-a1-12-l2-8",
              no: 8,
              text: "You want to learn the computer programme.",
              options: ["Office", "Canteen", "Training Room"],
              answer: 2,
              explain:
                "Duyuru kursu adlandırıyor: «Computer course for new staff: Tuesday and Thursday at 10».",
            },
            {
              kind: "mcq",
              id: "en-a1-12-l2-9",
              no: 9,
              text: "You want to speak to Mira.",
              options: ["Office", "Canteen", "Training Room"],
              answer: 0,
              explain:
                "Duyuru kişiyi ve yeri birlikte veriyor: «Ask for Mira at the desk», ofis ikinci katta.",
            },
            {
              kind: "mcq",
              id: "en-a1-12-l2-10",
              no: 10,
              text: "You need a pen on Tuesday morning.",
              options: ["Office", "Canteen", "Training Room"],
              answer: 2,
              explain:
                "Duyuru hem günü hem kalemi veriyor: «Tuesday and Thursday at 10» ve «Please bring a pen».",
            },
          ],
        },
        {
          id: "en-a1-12-l3",
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
              title: "STAFF ONLY",
              body: `Please use your card.

The door closes at 19.`,
            },
            {
              kind: "text",
              id: "s2",
              genre: "Sign",
              genreTr: "Levha",
              title: "BREAK ROOM",
              body: `Coffee and tea free.

Please wash your cup.`,
            },
            {
              kind: "text",
              id: "s3",
              genre: "Sign",
              genreTr: "Levha",
              title: "LIFT",
              body: `Out of order.

Please use the stairs. Room 5 is on the first floor.`,
            },
            {
              kind: "text",
              id: "s4",
              genre: "Sign",
              genreTr: "Levha",
              title: "MEETING",
              body: `Room 2, Wednesday 14.00.

Everybody, please. Ten minutes only.`,
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-12-l3-11",
              no: 11,
              ref: "s1",
              text: "You can come in without a card.",
              answer: false,
              explain:
                "Levha kartı zorunlu kılıyor: «Please use your card». Kapı ayrıca on dokuzda kapanıyor.",
            },
            {
              kind: "bool",
              id: "en-a1-12-l3-12",
              no: 12,
              ref: "s2",
              text: "The coffee is free.",
              answer: true,
              explain:
                "Levha bunu söylüyor: «Coffee and tea free». Karşılığında bardağın yıkanması isteniyor.",
            },
            {
              kind: "bool",
              id: "en-a1-12-l3-13",
              no: 13,
              ref: "s3",
              text: "The lift works today.",
              answer: false,
              explain:
                "Levha «Out of order» diyor ve merdiveni gösteriyor: «Please use the stairs».",
            },
            {
              kind: "bool",
              id: "en-a1-12-l3-14",
              no: 14,
              ref: "s4",
              text: "The meeting is short.",
              answer: true,
              explain:
                "Levha süreyi veriyor: «Ten minutes only». Toplantı çarşamba on dörtte, iki numaralı odada.",
            },
          ],
        },
        {
          id: "en-a1-12-l4",
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
              title: "To Zsofia",
              body: `Hello Zsofia,

I start my new job {{15}} Monday. I am a little nervous!

There {{16}} a canteen in the building. The soup is free.

The office is very near, {{17}} I go by bicycle. Ten minutes only.

Last week I {{18}} my new colleagues at a small party.

Eyup`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-12-l4-15",
              no: 15,
              text: "Gap 15",
              options: ["at", "in", "on"],
              answer: 2,
              explain:
                "Gün adlarıyla `on` kullanılır: `on Monday`. `at` saat için, `in` ay ve yıl için gelir.",
            },
            {
              kind: "mcq",
              id: "en-a1-12-l4-16",
              no: 16,
              text: "Gap 16",
              options: ["is", "are", "have"],
              answer: 0,
              explain:
                "Kalıp `there is / there are` ve özne tekil: «a canteen». Tekil özne `is` ister; `have` bu kalıpta kullanılmaz.",
            },
            {
              kind: "mcq",
              id: "en-a1-12-l4-17",
              no: 17,
              text: "Gap 17",
              options: ["but", "so", "because"],
              answer: 1,
              explain:
                "İkinci yarı birincinin sonucu: ofis çok yakın olduğu için bisikletle gidiliyor. Sonucu `so` verir; `but` karşıtlık ister ve burada karşıtlık yok.",
            },
            {
              kind: "mcq",
              id: "en-a1-12-l4-18",
              no: 18,
              text: "Gap 18",
              options: ["meet", "meets", "met"],
              answer: 2,
              explain:
                "Cümle «Last week» ile başlıyor, yani zaman geçmiş. `meet` fiilinin geçmiş biçimi düzensizdir: `met`.",
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
          id: "en-a1-12-h1",
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
              situation: "Ofisten yeni çalışana ileti bırakılıyor.",
              plays: 2,
              segments: [
                { text: "Hello Eyup, this is Mira from the office. Your first day is Monday at nine. Come to the second floor and ask for me. Bring your passport." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Between colleagues",
              genreTr: "İş arkadaşları arasında",
              situation: "İki kişi kantini konuşuyor.",
              plays: 2,
              segments: [
                { text: "Where is the canteen?" },
                { text: "Ground floor, next to the door." },
                { text: "Is it open now?" },
                { text: "From twelve. It is half past eleven." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "At the desk",
              genreTr: "Danışmada",
              situation: "Yeni gelen biri oda soruyor.",
              plays: 2,
              segments: [
                { text: "I am new here. Where is room 5?" },
                { text: "First floor. The lift is out of order, so please take the stairs." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Announcement",
              genreTr: "Anons",
              situation: "Ofiste toplantı anonsu yapılıyor.",
              plays: 2,
              segments: [
                { text: "A short meeting today in room 2 at two o'clock, not at three. It is ten minutes only. Everybody, please." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Between colleagues",
              genreTr: "İş arkadaşları arasında",
              situation: "İki kişi kantin fiyatlarını konuşuyor.",
              plays: 2,
              segments: [
                { text: "Do you eat in the canteen?" },
                { text: "Every day. The soup is free." },
                { text: "And the hot food?" },
                { text: "Four euros, but you need your card." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Phone message",
              genreTr: "Telefon iletisi",
              situation: "Biri arkadaşına ilk gününü anlatıyor.",
              plays: 2,
              segments: [
                { text: "Hi Fikret, it is Eyup. My first day was good. The people are friendly and the office is near my house. Coffee on Saturday?" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-12-h1-1",
              no: 1,
              ref: "a1",
              text: "What must Eyup bring?",
              options: ["A pen", "Money", "His passport"],
              answer: 2,
              explain:
                "İletinin son cümlesi bunu istiyor: «Bring your passport». Kalem ve para hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-12-h1-2",
              no: 2,
              ref: "a2",
              text: "When does the canteen open?",
              options: ["Now", "In half an hour", "At two"],
              answer: 1,
              explain:
                "Konuşma iki saati veriyor: kantin «From twelve», şu an ise «half past eleven». Yani yarım saat sonra.",
            },
            {
              kind: "mcq",
              id: "en-a1-12-h1-3",
              no: 3,
              ref: "a3",
              text: "How does the man go to room 5?",
              options: ["He takes the stairs", "He takes the lift", "He waits at the desk"],
              answer: 0,
              explain:
                "Görevli sebebiyle birlikte yönlendiriyor: «The lift is out of order, so please take the stairs».",
            },
            {
              kind: "mcq",
              id: "en-a1-12-h1-4",
              no: 4,
              ref: "a4",
              text: "What time is the meeting?",
              options: ["At three", "At ten", "At two"],
              answer: 2,
              explain:
                "Anons saati düzeltiyor: «at two o'clock, not at three». On, toplantının dakika süresi.",
            },
            {
              kind: "mcq",
              id: "en-a1-12-h1-5",
              no: 5,
              ref: "a5",
              text: "What is free?",
              options: ["The soup", "The hot food", "Everything"],
              answer: 0,
              explain:
                "Konuşma ikisini ayırıyor: «The soup is free» ama sıcak yemek «Four euros».",
            },
            {
              kind: "mcq",
              id: "en-a1-12-h1-6",
              no: 6,
              ref: "a6",
              text: "How was the first day?",
              options: ["Too long", "Good", "Difficult"],
              answer: 1,
              explain:
                "İleti bunu ilk cümlede söylüyor: «My first day was good», ve gerekçesini ekliyor.",
            },
          ],
        },
        {
          id: "en-a1-12-h2",
          no: 2,
          format: "truefalse",
          goal: "instruction",
          prompt: "You hear an announcement for new staff. Are sentences 7 to 10 true or false? You hear the announcement twice.",
          promptTr: "Yeni çalışanlar için yapılan bir anonsu dinleyeceksin. 7–10. cümleler doğru mu yanlış mı? Anonsu iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Announcement",
              genreTr: "Anons",
              situation: "Sorumlu yeni çalışanlara iki şey duyuruyor.",
              plays: 2,
              segments: [
                { text: "Good morning and welcome. Two things. The computer course is on Tuesday and Thursday at ten, in room 5. It is not on Monday. And the canteen is closed this week. There is a shop on the corner." },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-12-h2-7",
              no: 7,
              ref: "b1",
              text: "The course is on Tuesday.",
              answer: true,
              explain:
                "Anons iki günü veriyor: «on Tuesday and Thursday at ten». Pazartesi bilerek eleniyor.",
            },
            {
              kind: "bool",
              id: "en-a1-12-h2-8",
              no: 8,
              ref: "b1",
              text: "The course is in room 2.",
              answer: false,
              explain:
                "Anons odayı veriyor: «in room 5». İki numaralı oda anonsta hiç geçmiyor.",
            },
            {
              kind: "bool",
              id: "en-a1-12-h2-9",
              no: 9,
              ref: "b1",
              text: "The canteen is open this week.",
              answer: false,
              explain:
                "Anons «the canteen is closed this week» diyor ve yerine köşedeki dükkânı gösteriyor.",
            },
            {
              kind: "bool",
              id: "en-a1-12-h2-10",
              no: 10,
              ref: "b1",
              text: "There is a shop near the building.",
              answer: true,
              explain:
                "Anonsun son cümlesi bunu söylüyor: «There is a shop on the corner».",
            },
          ],
        },
        {
          id: "en-a1-12-h3",
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
              situation: "Ofis, kart için ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello, this is about your card for the door. It is ready at the desk. Please come before six. Without the card the door does not open." },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "At the desk",
              genreTr: "Danışmada",
              situation: "Yeni bir çalışan kahve soruyor.",
              plays: 2,
              segments: [
                { text: "Can I have a coffee?" },
                { text: "The break room is on the second floor. It is free." },
                { text: "And the cup?" },
                { text: "Please wash it after." },
              ],
            },
            {
              kind: "audio",
              id: "c3",
              genre: "Between colleagues",
              genreTr: "İş arkadaşları arasında",
              situation: "İki kişi bilgisayar kursunu konuşuyor.",
              plays: 2,
              segments: [
                { text: "How was the computer course?" },
                { text: "Two hours, and I understood the first ten minutes." },
                { text: "Really?" },
                { text: "I go again on Thursday. It is better the second time." },
              ],
            },
            {
              kind: "audio",
              id: "c4",
              genre: "Announcement",
              genreTr: "Anons",
              situation: "Binada asansör için anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "The lift is out of order today. Room 5 is on the first floor. If you cannot take the stairs, please tell Mira at the desk." },
              ],
            },
            {
              kind: "audio",
              id: "c5",
              genre: "At the canteen",
              genreTr: "Kantinde",
              situation: "Yeni bir çalışan çorbayı soruyor.",
              plays: 2,
              segments: [
                { text: "Is the soup free?" },
                { text: "Yes, for staff." },
                { text: "I start on Monday." },
                { text: "Then it is free for you too. Welcome!" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-12-h3-11",
              no: 11,
              ref: "c1",
              text: "What is ready?",
              options: ["The computer", "The card for the door", "The office"],
              answer: 1,
              explain:
                "İleti konusunu ilk cümlede veriyor: «this is about your card for the door. It is ready at the desk».",
            },
            {
              kind: "mcq",
              id: "en-a1-12-h3-12",
              no: 12,
              ref: "c2",
              text: "What must the woman do with the cup?",
              options: ["Bring her own", "Pay for it", "Wash it"],
              answer: 2,
              explain:
                "Görevli tek bir şey istiyor: «Please wash it after». Kahve ücretsiz.",
            },
            {
              kind: "mcq",
              id: "en-a1-12-h3-13",
              no: 13,
              ref: "c3",
              text: "What does the man do now?",
              options: ["He goes to the course again", "He asks for a new course", "He stops the course"],
              answer: 0,
              explain:
                "Konuşmacı kararını söylüyor: «I go again on Thursday. It is better the second time».",
            },
            {
              kind: "mcq",
              id: "en-a1-12-h3-14",
              no: 14,
              ref: "c4",
              text: "Who must people speak to?",
              options: ["The teacher", "Mira", "Nobody"],
              answer: 1,
              explain:
                "Anons kişiyi ve yeri veriyor: «please tell Mira at the desk».",
            },
            {
              kind: "mcq",
              id: "en-a1-12-h3-15",
              no: 15,
              ref: "c5",
              text: "Is the soup free for the man?",
              options: ["Yes", "No", "Only on Monday"],
              answer: 0,
              explain:
                "Görevli pazartesi başlayacağını duyunca onaylıyor: «Then it is free for you too».",
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
          id: "en-a1-12-w1",
          no: 1,
          format: "gap",
          goal: "detail",
          prompt:
            "Your friend Zsofia Kral starts a new job. She is 29 years old. She lives at 6 Hill Road. Her phone number is 07700 900 508. Her first day is Monday. Five things are missing on the form. Write them in the gaps.",
          promptTr:
            "Arkadaşın Zsofia Kral yeni bir işe başlıyor. 29 yaşında. 6 Hill Road adresinde oturuyor. Telefonu 07700 900 508. İlk günü pazartesi. Formda beş bilgi eksik; boşluklara yaz.",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Form",
              genreTr: "Form",
              title: "NEW STAFF",
              body: `Family name:       Kral
First name:        {{1}}
Age:               {{2}}
Street and number: {{3}}
Phone:             {{4}}
First day:         {{5}}`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a1-12-w1-1",
              no: 1,
              text: "First name",
              accept: ["Zsofia"],
              explain:
                "Yönergede tam ad «Zsofia Kral» olarak geçiyor. Soyadı formda basılı olduğu için boşluğa yalnız ilk ad yazılır.",
            },
            {
              kind: "gap",
              id: "en-a1-12-w1-2",
              no: 2,
              text: "Age",
              accept: ["29", "29 years", "twenty-nine", "twenty-nine years old"],
              explain:
                "Yönergede «She is 29 years old» geçiyor. Rakam da yazı da kabul edilir; ölçülen şey imla değil, bilgiyi doğru alana taşımak.",
            },
            {
              kind: "gap",
              id: "en-a1-12-w1-3",
              no: 3,
              text: "Street and number",
              accept: ["6 Hill Road", "Hill Road 6"],
              explain:
                "Adres yönergede «6 Hill Road» olarak veriliyor. İngilizcede kapı numarası sokak adından ÖNCE gelir; Türkçe sıraya alışkın öğrenci ters yazabilir, ikisi de kabul ediliyor.",
            },
            {
              kind: "gap",
              id: "en-a1-12-w1-4",
              no: 4,
              text: "Phone",
              accept: ["07700 900 508", "07700900508"],
              explain:
                "Telefon numarası yönergede «07700 900 508» olarak veriliyor. Boşluklu ve boşluksuz yazım kabul edilir; baştaki sıfır düşürülmemeli.",
            },
            {
              kind: "gap",
              id: "en-a1-12-w1-5",
              no: 5,
              text: "First day",
              accept: ["Monday", "on Monday"],
              explain:
                "Yönerge günü veriyor: «Her first day is Monday». Gün adları büyük harfle yazılır ama karşılaştırma büyük-küçük harfe bakmıyor.",
            },
          ],
        },
        {
          id: "en-a1-12-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "A new colleague asks you about the canteen. Write a short message to your colleague. Write one or two sentences about each point (about 25 words). Do not forget the greeting at the start and at the end.",
          promptTr:
            "Yeni bir iş arkadaşın sana kantini soruyor. İş arkadaşına kısa bir ileti yaz. Her maddeye bir-iki cümle yaz (yaklaşık 25 kelime). Baştaki hitabı ve sondaki veda cümlesini unutma.",
          items: [],
          rubric: {
            minWords: 25,
            points: [
              { de: "Say when the canteen is open.", tr: "Kantinin ne zaman açık olduğunu söyle." },
              { de: "Say what is free and what costs money.", tr: "Neyin ücretsiz, neyin paralı olduğunu söyle." },
              { de: "Say what your colleague must bring.", tr: "İş arkadaşının ne getirmesi gerektiğini söyle." },
            ],
            sample: `Hi Dragan,

The canteen is open from twelve to two.

The soup and the bread are free for us. Hot food is four euros.

Bring your card! You cannot pay with money.

See you at twelve,
Eyup`,
            criteria: [
              "Üç içerik noktasının üçü de var mı? Biri eksikse metin tam sayılmaz.",
              "Saatler açıkça verildi mi?",
              "Ücretsiz olan ile paralı olan ayrıldı mı?",
              "Getirilecek şey söylendi mi?",
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
      instruction: "This part has three tasks: you talk about work, you ask and answer questions, and you act at an office desk.",
      instructionTr: "Bu bölümde üç görev var: işi anlatma, soru sorup cevaplama ve ofis danışmasında rol yapma.",
      tasks: [
        {
          id: "en-a1-12-s1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt: "Talk about work. Speak about these words: a job — a day in the week — a colleague — the way to work — money — something you do not like.",
          promptTr: "İşi anlat. Şu sözcüklere göre konuş: bir iş — haftanın bir günü — bir iş arkadaşı — işe gidiş yolu — para — sevmediğin bir şey.",
          prepSeconds: 30,
          speakSeconds: 90,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "a job and the days you work", tr: "Bir iş ve çalıştığın günler" },
              { de: "a colleague and how you go to work", tr: "Bir iş arkadaşı ve işe nasıl gittiğin" },
              { de: "how much something costs", tr: "Bir şeyin ne kadar tuttuğu" },
              { de: "one thing you do not like", tr: "Sevmediğin bir şey" },
            ],
            sample:
              "I work in an office from Monday to Friday. I start at nine and I finish at five. My colleague Mira sits next to me and she is very friendly. I go by bicycle; it is ten minutes. Lunch in the canteen is four euros. I do not like the meetings on Wednesday; they are always long.",
            criteria: [
              "Altı sözcüğün her birine değinildi mi?",
              "Gün, saat ve fiyat söylenebiliyor mu?",
              "Sıklık ifadeleri kullanıldı mı? (from Monday to Friday, every day)",
              "Anlaşılır bir tempoda mı konuşuldu?",
            ],
          },
        },
        {
          id: "en-a1-12-s2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Topic: work and the office. Make a question for each word and answer my questions: office — colleague — break — computer — money.",
          promptTr:
            "Konu: iş ve ofis. Her sözcük için bir soru kur ve benim sorularımı cevapla: ofis — iş arkadaşı — mola — bilgisayar — para.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "Now we talk about work. Your first word is: office. Please ask me a question.", tr: "Şimdi işi konuşuyoruz. İlk sözcüğün: ofis. Bana bir soru sor." },
            { who: "you", hint: "«office» sözcüğüyle bir soru kur.", expect: "office sözcüğüyle dilbilgisel olarak doğru bir soru kurmak", seconds: 25 },
            { who: "partner", de: "My office is on the second floor. Your next word is: colleague.", tr: "Ofisim ikinci katta. Sıradaki sözcüğün: iş arkadaşı." },
            { who: "you", hint: "«colleague» için bir soru kur.", expect: "colleague sözcüğüyle bir soru kurmak", seconds: 25 },
            { who: "partner", de: "I work with four colleagues. Now a question for you: when do you have a break?", tr: "Dört iş arkadaşımla çalışıyorum. Şimdi sana bir soru: Molanı ne zaman veriyorsun?" },
            { who: "you", hint: "Bir saat söyleyerek cevapla.", expect: "bir saati tam bir cümleyle söylemek", seconds: 25 },
            { who: "partner", de: "Thank you. Last question: how much is lunch where you work?", tr: "Teşekkürler. Son soru: Çalıştığın yerde öğle yemeği ne kadar?" },
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
              "Where is your office? — On the second floor. How many colleagues have you got? — Four. When do you have a break? — At twelve, for half an hour. Do you work on a computer? — Yes, all day. How much is lunch? — Four euros in the canteen.",
            criteria: [
              "Beş sözcüğün her biri için bir soru kuruldu mu?",
              "Sorular doğru kuruldu mu? (Where is … / How many … / How much …)",
              "Cevaplar soruya uygun mu?",
              "Sayı ve saat söylenebiliyor mu?",
            ],
          },
        },
        {
          id: "en-a1-12-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "It is your first day and you are at the office desk. Situations: you say who you are. — You ask where a room is. — You ask about the break.",
          promptTr:
            "İlk günün ve ofis danışmasındasın. Durumlar: Kim olduğunu söyle. — Bir odanın nerede olduğunu sor. — Molayı sor.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good morning. Can I help you?", tr: "Günaydın. Yardımcı olabilir miyim?" },
            { who: "you", hint: "Adını söyle ve bugünün ilk günün olduğunu belirt.", expect: "kendini tanıtmak ve durumu tam bir cümleyle söylemek", seconds: 25 },
            { who: "partner", de: "Welcome! Mira is waiting for you.", tr: "Hoş geldin! Mira seni bekliyor." },
            { who: "you", hint: "Bir odanın nerede olduğunu sor.", expect: "yer sormak", seconds: 25 },
            { who: "partner", de: "Room 5 is on the first floor. Anything else?", tr: "Beş numaralı oda birinci katta. Başka bir şey var mı?" },
            { who: "you", hint: "Molanın saatini kibarca sor.", expect: "kibarca saat sormak", seconds: 25 },
          ],
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "say who you are", tr: "Kim olduğunu söylemek" },
              { de: "ask where a room is", tr: "Bir odanın yerini sormak" },
              { de: "ask about the break politely", tr: "Kibarca molayı sormak" },
            ],
            sample:
              "Good morning. My name is Eyup Kral and today is my first day. — Where is room 5, please? — When is the break, please?",
            criteria: [
              "Ad ve durum açıkça söylendi mi?",
              "Yer sorusu doğru kuruldu mu? (Where is … please)",
              "Mola sorusu kibar bir kalıpla mı kuruldu?",
              "Sayılar (kat, oda, saat) anlaşıldı mı?",
            ],
          },
        },
      ],
    },
  ],
};
