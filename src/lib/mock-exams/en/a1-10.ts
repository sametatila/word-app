import type { MockPaper } from "../types";

/**
 * A1 · Deneme 10 — "Post, Parcels and Paying Bills".
 *
 * A1'in öteki denemeleriyle AYNI PLAN; konu ayrı. Postane A1 için verimli
 * bir zemin: gişe numarası, ağırlık, kuruş cinsinden fiyat, son gün ve
 * ödeme biçimi aynı metinde doğal olarak bulunuyor. Dokuzuncu denemedeki
 * kütüphane malzemesiyle tek bir sözcük kümesini paylaşmıyor.
 *
 * A1 SINIRI: geniş zaman, `there is / there are`, basit geçmiş yalnız
 * düzensiz birkaç fiilde, `and / but / because`, cümleler kısa.
 */
export const EN_A1_10: MockPaper = {
  id: "en-a1-10",
  course: "en",
  level: "A1",
  no: 10,
  theme: "Post, Parcels and Paying Bills",
  themeTr: "Posta, koliler ve fatura ödemek",
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
          id: "en-a1-10-l1",
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
              title: "Your parcel",
              body: `Hi Nadia,

Your parcel is at the post office. It came on Tuesday.

You must take your passport. They keep it for ten days.

The post office closes at five, but on Saturday at one.

Piet`,
              gloss: [
                { de: "a parcel", tr: "koli", en: "parcel" },
                { de: "to keep", tr: "saklamak", en: "keep" },
              ],
            },
            {
              kind: "text",
              id: "t2",
              genre: "Notice at the post office",
              genreTr: "Postane duyurusu",
              title: "POST OFFICE",
              body: `Open from 9 to 17. Saturday from 9 to 13.

A letter in this country: 90 cents. To another country: 2 euros.

A parcel to 2 kilos: 5 euros.

You can pay bills here. Cash only.`,
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-10-l1-1",
              no: 1,
              ref: "t1",
              text: "The parcel is at Nadia's house.",
              answer: false,
              explain:
                "İletinin ilk cümlesi yeri veriyor: «Your parcel is at the post office». Koli evde değil, bu yüzden gidip alınması gerekiyor.",
            },
            {
              kind: "bool",
              id: "en-a1-10-l1-2",
              no: 2,
              ref: "t1",
              text: "Nadia must take her passport.",
              answer: true,
              explain:
                "İleti bunu açıkça istiyor: «You must take your passport». Koli on gün saklanıyor.",
            },
            {
              kind: "bool",
              id: "en-a1-10-l1-3",
              no: 3,
              ref: "t1",
              text: "On Saturday the post office is open until five.",
              answer: false,
              explain:
                "İleti iki saati karşılaştırıyor: «closes at five, but on Saturday at one». Cumartesi kapanış saati daha erken.",
            },
            {
              kind: "bool",
              id: "en-a1-10-l1-4",
              no: 4,
              ref: "t2",
              text: "You can pay a bill with a card here.",
              answer: false,
              explain:
                "Duyuru ödeme biçimini sınırlıyor: «You can pay bills here. Cash only». Fatura ödenebiliyor ama yalnız nakitle.",
            },
            {
              kind: "bool",
              id: "en-a1-10-l1-5",
              no: 5,
              ref: "t2",
              text: "A letter to another country costs two euros.",
              answer: true,
              explain:
                "Duyuru iki fiyatı ayırıyor: ülke içi 90 sent, «To another country: 2 euros».",
            },
          ],
        },
        {
          id: "en-a1-10-l2",
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
              title: "Post Office",
              body: `Open 9 to 17. Saturday 9 to 13.

Letters and parcels.

Pay bills here. Cash only.

Passport for parcels.`,
            },
            {
              kind: "text",
              id: "p2",
              genre: "Notice",
              genreTr: "Duyuru",
              title: "Parcel Shop",
              body: `In the supermarket. Open every day from 7 to 22.

Take a parcel or send one.

Boxes: one euro.

No letters here.`,
            },
            {
              kind: "text",
              id: "p3",
              genre: "Notice",
              genreTr: "Duyuru",
              title: "Bank",
              body: `Open 9 to 16. Closed on Saturday.

Money and bills.

Card and cash.

Help with forms on Thursday.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-10-l2-6",
              no: 6,
              text: "You want to pay a bill with your card.",
              options: ["Post Office", "Parcel Shop", "Bank"],
              answer: 2,
              explain:
                "Banka iki ödeme biçimini de alıyor: «Card and cash». Postane fatura alıyor ama «Cash only» diyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-10-l2-7",
              no: 7,
              text: "You want to send a parcel at nine in the evening.",
              options: ["Post Office", "Parcel Shop", "Bank"],
              answer: 1,
              explain:
                "Duyuru saatleri veriyor: «Open every day from 7 to 22». Postane on yedide, banka on altıda kapanıyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-10-l2-8",
              no: 8,
              text: "You want to send a letter to another country.",
              options: ["Post Office", "Parcel Shop", "Bank"],
              answer: 0,
              explain:
                "Postane duyurusu «Letters and parcels» diyor. Koli dükkânı ise mektup almıyor: «No letters here».",
            },
            {
              kind: "mcq",
              id: "en-a1-10-l2-9",
              no: 9,
              text: "You need help with a form on Thursday.",
              options: ["Post Office", "Parcel Shop", "Bank"],
              answer: 2,
              explain:
                "Banka günü ve hizmeti birlikte veriyor: «Help with forms on Thursday». Öteki iki duyuruda form yardımı yok.",
            },
            {
              kind: "mcq",
              id: "en-a1-10-l2-10",
              no: 10,
              text: "You need a box for your parcel.",
              options: ["Post Office", "Parcel Shop", "Bank"],
              answer: 1,
              explain:
                "Duyuru kutuyu fiyatıyla veriyor: «Boxes: one euro». Postane ve banka kutu satmıyor.",
            },
          ],
        },
        {
          id: "en-a1-10-l3",
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
              title: "PARCELS",
              body: `Window 4. Take a number.

Passport, please.`,
            },
            {
              kind: "text",
              id: "s2",
              genre: "Sign",
              genreTr: "Levha",
              title: "OUT OF ORDER",
              body: `This machine does not work.

Please pay at window 2.`,
            },
            {
              kind: "text",
              id: "s3",
              genre: "Sign",
              genreTr: "Levha",
              title: "OPEN",
              body: `Monday to Friday 9–17.

Saturday 9–13. Closed on Sunday.`,
            },
            {
              kind: "text",
              id: "s4",
              genre: "Sign",
              genreTr: "Levha",
              title: "LETTER BOX",
              body: `Last collection: 17.00.

On Saturday: 12.00.`,
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-10-l3-11",
              no: 11,
              ref: "s1",
              text: "You need a passport for a parcel.",
              answer: true,
              explain:
                "Levha bunu son satırda istiyor: «Passport, please». Ayrıca koliler dördüncü gişede veriliyor ve sıra numarası alınıyor.",
            },
            {
              kind: "bool",
              id: "en-a1-10-l3-12",
              no: 12,
              ref: "s2",
              text: "You can pay at this machine.",
              answer: false,
              explain:
                "Levha makinenin çalışmadığını söyleyip yer gösteriyor: «This machine does not work. Please pay at window 2».",
            },
            {
              kind: "bool",
              id: "en-a1-10-l3-13",
              no: 13,
              ref: "s3",
              text: "The post office is open on Sunday.",
              answer: false,
              explain:
                "Levha günleri sayıyor ve pazarı dışarıda bırakıyor: «Closed on Sunday». Cumartesi ise 9–13 arası açık.",
            },
            {
              kind: "bool",
              id: "en-a1-10-l3-14",
              no: 14,
              ref: "s4",
              text: "On Saturday the last collection is at twelve.",
              answer: true,
              explain:
                "Levha iki saat veriyor: normal günlerde 17.00, «On Saturday: 12.00». Cumartesi saati daha erken.",
            },
          ],
        },
        {
          id: "en-a1-10-l4",
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
              title: "To Hale",
              body: `Hello Hale,

I am at the post office {{15}} Tuesday. The parcel is very big!

There {{16}} a new machine now. You can pay bills with a card.

I want to send a letter, {{17}} I have no stamps. I buy them tomorrow.

Yesterday I {{18}} two boxes for the parcel. They were one euro.

Kiro`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-10-l4-15",
              no: 15,
              text: "Gap 15",
              options: ["on", "in", "at"],
              answer: 0,
              explain:
                "Gün adlarıyla `on` kullanılır: `on Tuesday`. `in` ay ve yıl için, `at` ise saat için gelir.",
            },
            {
              kind: "mcq",
              id: "en-a1-10-l4-16",
              no: 16,
              text: "Gap 16",
              options: ["are", "have", "is"],
              answer: 2,
              explain:
                "Kalıp `there is / there are` ve özne tekil: «a new machine». Tekil özne `is` ister; `have` bu kalıpta kullanılmaz.",
            },
            {
              kind: "mcq",
              id: "en-a1-10-l4-17",
              no: 17,
              text: "Gap 17",
              options: ["so", "but", "because"],
              answer: 1,
              explain:
                "İki bilgi karşıt: mektup göndermek istiyor ama pulu yok. Karşıtlığı `but` kurar; `so` sonuç, `because` sebep bildirir.",
            },
            {
              kind: "mcq",
              id: "en-a1-10-l4-18",
              no: 18,
              text: "Gap 18",
              options: ["bought", "buy", "buys"],
              answer: 0,
              explain:
                "Cümle «Yesterday» ile başlıyor, yani zaman geçmiş. `buy` fiilinin geçmiş biçimi düzensizdir: `bought`.",
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
          id: "en-a1-10-h1",
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
              situation: "Postane bir müşteriye ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello, this is the post office. Your parcel is here since Tuesday. We keep it for ten days. Please bring your passport." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "At the window",
              genreTr: "Gişede",
              situation: "Bir müşteri yurt dışına mektup gönderiyor.",
              plays: 2,
              segments: [
                { text: "I want to send this to Poland." },
                { text: "Is it a letter or a parcel?" },
                { text: "A letter." },
                { text: "Two euros, please." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki arkadaş postanenin saatlerini konuşuyor.",
              plays: 2,
              segments: [
                { text: "Is the post office open on Saturday?" },
                { text: "Yes, but only until one." },
                { text: "Not until five?" },
                { text: "Five is Monday to Friday." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "At the window",
              genreTr: "Gişede",
              situation: "Bir müşteri fatura ödemek istiyor.",
              plays: 2,
              segments: [
                { text: "Can I pay this bill with my card?" },
                { text: "Not here. We take cash only." },
                { text: "And in the bank?" },
                { text: "Yes, the bank takes cards." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Announcement",
              genreTr: "Anons",
              situation: "Postanede bir gişe için anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "The machine at window 2 does not work today. Please go to window 4. We are very sorry." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Phone message",
              genreTr: "Telefon iletisi",
              situation: "Bir kişi arkadaşına teşekkür ediyor.",
              plays: 2,
              segments: [
                { text: "Hi Tarek, it is Anouk. My parcel came today, not on Friday. Thank you very much for your help!" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-10-h1-1",
              no: 1,
              ref: "a1",
              text: "What must the person bring?",
              options: ["Money", "A passport", "A box"],
              answer: 1,
              explain:
                "İletinin son cümlesi bunu istiyor: «Please bring your passport». Para ya da kutu hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-10-h1-2",
              no: 2,
              ref: "a2",
              text: "How much is the letter?",
              options: ["Two euros", "Ninety cents", "Five euros"],
              answer: 0,
              explain:
                "Görevli fiyatı mektup olduğu anlaşılınca veriyor: «Two euros, please». Doksan sent ülke içi mektubun ücreti.",
            },
            {
              kind: "mcq",
              id: "en-a1-10-h1-3",
              no: 3,
              ref: "a3",
              text: "When does the post office close on Saturday?",
              options: ["At five", "At three", "At one"],
              answer: 2,
              explain:
                "Arkadaş iki günü ayırıyor: «only until one» cumartesi için, «Five is Monday to Friday» hafta içi için.",
            },
            {
              kind: "mcq",
              id: "en-a1-10-h1-4",
              no: 4,
              ref: "a4",
              text: "Where can the man pay with a card?",
              options: ["At the post office", "At the bank", "In the supermarket"],
              answer: 1,
              explain:
                "Görevli iki yeri ayırıyor: «We take cash only» ve «the bank takes cards».",
            },
            {
              kind: "mcq",
              id: "en-a1-10-h1-5",
              no: 5,
              ref: "a5",
              text: "Where must people go?",
              options: ["To window 4", "To window 2", "To another shop"],
              answer: 0,
              explain:
                "Anons yönlendiriyor: ikinci gişedeki makine bozuk, «Please go to window 4».",
            },
            {
              kind: "mcq",
              id: "en-a1-10-h1-6",
              no: 6,
              ref: "a6",
              text: "When did the parcel come?",
              options: ["On Friday", "Next week", "Today"],
              answer: 2,
              explain:
                "İleti günü düzeltiyor: «My parcel came today, not on Friday».",
            },
          ],
        },
        {
          id: "en-a1-10-h2",
          no: 2,
          format: "truefalse",
          goal: "instruction",
          prompt: "You hear an announcement at a post office. Are sentences 7 to 10 true or false? You hear the announcement twice.",
          promptTr: "Bir postanede yapılan anonsu dinleyeceksin. 7–10. cümleler doğru mu yanlış mı? Anonsu iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Announcement",
              genreTr: "Anons",
              situation: "Postane sorumlusu iki değişiklik duyuruyor.",
              plays: 2,
              segments: [
                { text: "Good morning. Two things. From Monday the post office opens at eight, not at nine. Saturday does not change: nine to one. And window 3 is closed this week. Please use window 1 or 4." },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-10-h2-7",
              no: 7,
              ref: "b1",
              text: "From Monday the post office opens earlier.",
              answer: true,
              explain:
                "Anons iki saati karşılaştırıyor: «opens at eight, not at nine». Sekiz dokuzdan daha erken.",
            },
            {
              kind: "bool",
              id: "en-a1-10-h2-8",
              no: 8,
              ref: "b1",
              text: "The Saturday hours change too.",
              answer: false,
              explain:
                "Anons cumartesiyi dışarıda bırakıyor: «Saturday does not change: nine to one».",
            },
            {
              kind: "bool",
              id: "en-a1-10-h2-9",
              no: 9,
              ref: "b1",
              text: "Window 3 is open this week.",
              answer: false,
              explain:
                "Anons «window 3 is closed this week» diyor ve başka gişeler gösteriyor: «Please use window 1 or 4».",
            },
            {
              kind: "bool",
              id: "en-a1-10-h2-10",
              no: 10,
              ref: "b1",
              text: "People can use window 1.",
              answer: true,
              explain:
                "Anonsun son cümlesi iki gişe veriyor: «Please use window 1 or 4».",
            },
          ],
        },
        {
          id: "en-a1-10-h3",
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
              situation: "Postane koli için ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello, this is about your parcel. It is too big for the letter box. You can take it from window 4 until Friday." },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "At the window",
              genreTr: "Gişede",
              situation: "Bir müşteri pul alıyor.",
              plays: 2,
              segments: [
                { text: "I would like ten stamps, please." },
                { text: "For this country?" },
                { text: "Yes." },
                { text: "Nine euros, please." },
              ],
            },
            {
              kind: "audio",
              id: "c3",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki arkadaş gönderilen bir koliyi konuşuyor.",
              plays: 2,
              segments: [
                { text: "I sent the parcel on Monday." },
                { text: "And?" },
                { text: "It is not there yet. Three days for two hundred kilometres." },
                { text: "Call them tomorrow." },
              ],
            },
            {
              kind: "audio",
              id: "c4",
              genre: "Announcement",
              genreTr: "Anons",
              situation: "Postane erken kapanışı duyuruyor.",
              plays: 2,
              segments: [
                { text: "The post office closes today at two, not at five. There is a meeting. We open again tomorrow at nine." },
              ],
            },
            {
              kind: "audio",
              id: "c5",
              genre: "At the window",
              genreTr: "Gişede",
              situation: "Bir müşteri kolisini tartıyor.",
              plays: 2,
              segments: [
                { text: "Is this parcel under two kilos?" },
                { text: "It is two kilos and one hundred grams." },
                { text: "Then it is not five euros?" },
                { text: "No. Seven." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-10-h3-11",
              no: 11,
              ref: "c1",
              text: "Where is the parcel?",
              options: ["At the post office", "In the letter box", "At the neighbour's house"],
              answer: 0,
              explain:
                "İleti yeri gişeyle veriyor: «You can take it from window 4 until Friday». Posta kutusuna sığmadığı da söyleniyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-10-h3-12",
              no: 12,
              ref: "c2",
              text: "How much are the stamps?",
              options: ["Ten euros", "Nine euros", "Two euros"],
              answer: 1,
              explain:
                "Görevli tutarı veriyor: «Nine euros, please». On, pulların sayısıdır, fiyatı değil.",
            },
            {
              kind: "mcq",
              id: "en-a1-10-h3-13",
              no: 13,
              ref: "c3",
              text: "What is the problem?",
              options: ["The parcel is too big", "The parcel costs a lot", "The parcel is slow"],
              answer: 2,
              explain:
                "Konuşmacı süreyi ve mesafeyi yan yana koyuyor: «Three days for two hundred kilometres». Boyut ve fiyat hiç anılmıyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-10-h3-14",
              no: 14,
              ref: "c4",
              text: "Why does the post office close early?",
              options: ["There is a meeting", "It is a holiday", "The machine does not work"],
              answer: 0,
              explain:
                "Anons sebebi tek cümlede veriyor: «There is a meeting». Yarın dokuzda yeniden açılıyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-10-h3-15",
              no: 15,
              ref: "c5",
              text: "How much is the parcel?",
              options: ["Five euros", "Seven euros", "Two euros"],
              answer: 1,
              explain:
                "Koli iki kiloyu yüz gram geçiyor, bu yüzden ucuz fiyat düşüyor: «No. Seven». İki, kilo sayısıdır.",
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
          id: "en-a1-10-w1",
          no: 1,
          format: "gap",
          goal: "detail",
          prompt:
            "Your friend Anouk Vidal wants to send a parcel. The parcel goes to Piet Lang. It weighs 3 kilos. She sends it on Thursday. Her phone number is 07700 900 617. Five things are missing on the form. Write them in the gaps.",
          promptTr:
            "Arkadaşın Anouk Vidal bir koli göndermek istiyor. Koli Piet Lang'e gidiyor. Ağırlığı 3 kilo. Perşembe günü gönderiyor. Telefonu 07700 900 617. Formda beş bilgi eksik; boşluklara yaz.",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Form",
              genreTr: "Form",
              title: "POST OFFICE — PARCEL",
              body: `From (family name): Vidal
From (first name):  {{1}}
To (name):          {{2}}
Weight:             {{3}}
Day:                {{4}}
Phone:              {{5}}`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a1-10-w1-1",
              no: 1,
              text: "From (first name)",
              accept: ["Anouk"],
              explain:
                "Yönergede tam ad «Anouk Vidal» olarak geçiyor. Soyadı formda basılı olduğu için boşluğa yalnız ilk ad yazılır.",
            },
            {
              kind: "gap",
              id: "en-a1-10-w1-2",
              no: 2,
              text: "To (name)",
              accept: ["Piet Lang", "Piet"],
              explain:
                "Yönerge alıcıyı veriyor: «The parcel goes to Piet Lang». Bu satırda soyadı basılı olmadığı için tam ad yazılabilir.",
            },
            {
              kind: "gap",
              id: "en-a1-10-w1-3",
              no: 3,
              text: "Weight",
              accept: ["3 kilos", "3", "3 kg", "three kilos"],
              explain:
                "Yönergede «It weighs 3 kilos» geçiyor. Rakam, yazı ve kısaltma kabul edilir; ölçülen şey birim yazımı değil, bilgiyi doğru alana taşımak.",
            },
            {
              kind: "gap",
              id: "en-a1-10-w1-4",
              no: 4,
              text: "Day",
              accept: ["Thursday", "on Thursday"],
              explain:
                "Yönerge günü veriyor: «She sends it on Thursday». Gün adları büyük harfle yazılır ama karşılaştırma büyük-küçük harfe bakmıyor.",
            },
            {
              kind: "gap",
              id: "en-a1-10-w1-5",
              no: 5,
              text: "Phone",
              accept: ["07700 900 617", "07700900617"],
              explain:
                "Telefon numarası yönergede «07700 900 617» olarak veriliyor. Boşluklu ve boşluksuz yazım kabul edilir; baştaki sıfır düşürülmemeli.",
            },
          ],
        },
        {
          id: "en-a1-10-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "A parcel for your friend came to your house. Write a short message to your friend. Write one or two sentences about each point (about 25 words). Do not forget the greeting at the start and at the end.",
          promptTr:
            "Arkadaşına ait bir koli senin evine geldi. Arkadaşına kısa bir ileti yaz. Her maddeye bir-iki cümle yaz (yaklaşık 25 kelime). Baştaki hitabı ve sondaki veda cümlesini unutma.",
          items: [],
          rubric: {
            minWords: 25,
            points: [
              { de: "Say that the parcel is at your house.", tr: "Kolinin senin evinde olduğunu söyle." },
              { de: "Say when your friend can come.", tr: "Arkadaşının ne zaman gelebileceğini söyle." },
              { de: "Ask one question about the parcel.", tr: "Koliyle ilgili bir soru sor." },
            ],
            sample: `Hi Hale,

Your parcel came to my house today. It is very big!

I am at home in the evening from six. Come on Tuesday or Wednesday.

Is it the new chair?

See you soon,
Kiro`,
            criteria: [
              "Üç içerik noktasının üçü de var mı? Biri eksikse metin tam sayılmaz.",
              "Gün ya da saat açıkça söylendi mi?",
              "Gerçek bir soru soruldu mu ve soru işareti var mı?",
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
      instruction: "This part has three tasks: you talk about post and money, you ask and answer questions, and you act at a post office.",
      instructionTr: "Bu bölümde üç görev var: posta ve parayı anlatma, soru sorup cevaplama ve postanede rol yapma.",
      tasks: [
        {
          id: "en-a1-10-s1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt: "Talk about post and money. Speak about these words: a letter — a parcel — a day in the week — a shop — money — something you do not like.",
          promptTr: "Posta ve parayı anlat. Şu sözcüklere göre konuş: bir mektup — bir koli — haftanın bir günü — bir dükkân — para — sevmediğin bir şey.",
          prepSeconds: 30,
          speakSeconds: 90,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "a letter or a parcel and the day you send it", tr: "Bir mektup ya da koli ve gönderdiğin gün" },
              { de: "a shop near you", tr: "Yakınındaki bir dükkân" },
              { de: "how much it costs", tr: "Ne kadara mal olduğu" },
              { de: "one thing you do not like", tr: "Sevmediğin bir şey" },
            ],
            sample:
              "I send a parcel to my mother every month. I go on Friday after work. The parcel shop is in the supermarket near my house. It is open until ten. A parcel of three kilos is seven euros. I do not like the queue at the post office; it is very long.",
            criteria: [
              "Altı sözcüğün her birine değinildi mi?",
              "Gün, saat ve fiyat söylenebiliyor mu?",
              "Sıklık ifadeleri kullanıldı mı? (every month, on Friday)",
              "Anlaşılır bir tempoda mı konuşuldu?",
            ],
          },
        },
        {
          id: "en-a1-10-s2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Topic: post and money. Make a question for each word and answer my questions: post office — parcel — card — shop — money.",
          promptTr:
            "Konu: posta ve para. Her sözcük için bir soru kur ve benim sorularımı cevapla: postane — koli — kart — dükkân — para.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "Now we talk about post and money. Your first word is: post office. Please ask me a question.", tr: "Şimdi posta ve parayı konuşuyoruz. İlk sözcüğün: postane. Bana bir soru sor." },
            { who: "you", hint: "«post office» ile bir soru kur.", expect: "post office ile dilbilgisel olarak doğru bir soru kurmak", seconds: 25 },
            { who: "partner", de: "The post office near me opens at nine. Your next word is: parcel.", tr: "Yakınımdaki postane dokuzda açılıyor. Sıradaki sözcüğün: koli." },
            { who: "you", hint: "«parcel» için bir soru kur.", expect: "parcel sözcüğüyle bir soru kurmak", seconds: 25 },
            { who: "partner", de: "I send a parcel to my brother every month. Now a question for you: where do you buy your food?", tr: "Her ay kardeşime bir koli gönderiyorum. Şimdi sana bir soru: Yiyeceğini nereden alıyorsun?" },
            { who: "you", hint: "Bir dükkân adı ve yer söyleyerek cevapla.", expect: "bir yeri tam bir cümleyle söylemek", seconds: 25 },
            { who: "partner", de: "Thank you. Last question: how much is a letter in your country?", tr: "Teşekkürler. Son soru: Ülkende bir mektup ne kadar?" },
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
              "When does the post office open? — At nine. Do you send a parcel every month? — Yes, to my brother. Can I pay with a card? — Not here. Where do you buy your food? — In the supermarket near my house. How much is a letter? — Ninety cents.",
            criteria: [
              "Beş sözcüğün her biri için bir soru kuruldu mu?",
              "Sorular doğru kuruldu mu? (When … / Do you … / How much …)",
              "Cevaplar soruya uygun mu?",
              "Sayı ve fiyat söylenebiliyor mu?",
            ],
          },
        },
        {
          id: "en-a1-10-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "You are at a post office. Situations: you say what you want to send. — You say where it goes. — You ask when it arrives.",
          promptTr:
            "Bir postanedesin. Durumlar: Ne göndermek istediğini söyle. — Nereye gittiğini söyle. — Ne zaman varacağını sor.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good morning. How can I help you?", tr: "Günaydın. Nasıl yardımcı olabilirim?" },
            { who: "you", hint: "Ne göndermek istediğini söyle (mektup ya da koli).", expect: "göndermek istediği şeyi tam bir cümleyle söylemek", seconds: 25 },
            { who: "partner", de: "Of course. Where does it go?", tr: "Tabii. Nereye gidiyor?" },
            { who: "you", hint: "Bir şehir ya da ülke söyle.", expect: "bir yer adını söylemek", seconds: 25 },
            { who: "partner", de: "That is five euros, please. Anything else?", tr: "Beş euro lütfen. Başka bir şey var mı?" },
            { who: "you", hint: "Ne zaman varacağını sor.", expect: "varış zamanını sormak", seconds: 25 },
          ],
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "say what you want to send", tr: "Ne göndermek istediğini söylemek" },
              { de: "say where it goes", tr: "Nereye gittiğini söylemek" },
              { de: "ask when it arrives", tr: "Ne zaman varacağını sormak" },
            ],
            sample:
              "I would like to send this parcel, please. — It goes to Warsaw, to my sister. — When does it arrive, please?",
            criteria: [
              "İstek açıkça söylendi mi? (mektup mu koli mi)",
              "Yer adı doğru söylendi mi?",
              "Zaman sorusu doğru kuruldu mu? (When does it arrive …)",
              "Sayılar (fiyat, gün) anlaşıldı mı?",
            ],
          },
        },
      ],
    },
  ],
};
