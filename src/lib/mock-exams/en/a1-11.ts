import type { MockPaper } from "../types";

/**
 * A1 · Deneme 11 — "The Doctor, Medicine and Feeling Better".
 *
 * A1'in öteki denemeleriyle AYNI PLAN; konu ayrı. Dördüncü denemede sağlık
 * okul ve hafta sonuyla birlikte geçiyordu ve yüzeyde kalıyordu; burası
 * randevu, muayene saatleri, reçete ve ilaç dilini bir arada veriyor.
 * Bu seviyede en çok işe yarayan metin türü kurumun hastayla konuştuğu
 * metindir ve o tür dokuzuncu denemeden beri bilerek besleniyor.
 *
 * A1 SINIRI: geniş zaman, `there is / there are`, basit geçmiş yalnız
 * düzensiz birkaç fiilde, `and / but / because`, cümleler kısa.
 */
export const EN_A1_11: MockPaper = {
  id: "en-a1-11",
  course: "en",
  level: "A1",
  no: 11,
  theme: "The Doctor, Medicine and Feeling Better",
  themeTr: "Doktor, ilaç ve iyileşmek",
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
          id: "en-a1-11-l1",
          no: 1,
          format: "truefalse",
          goal: "detail",
          prompt: "Read the two texts and questions 1 to 5. Are the sentences true or false?",
          promptTr: "İki metni ve 1–5. maddeleri oku. Cümleler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Message from the surgery",
              genreTr: "Muayenehaneden ileti",
              title: "Your appointment",
              body: `Hello Noor,

Your appointment is on Wednesday at 9.20, not on Tuesday.

Please come ten minutes before.

Bring your card and the box of your old tablets.

Dr Ilic`,
              gloss: [
                { de: "an appointment", tr: "randevu", en: "appointment" },
                { de: "a tablet", tr: "hap", en: "tablet" },
              ],
            },
            {
              kind: "text",
              id: "t2",
              genre: "Notice at a chemist",
              genreTr: "Eczane duyurusu",
              title: "CHEMIST",
              body: `Open 8 to 18. Saturday 9 to 13. Closed on Sunday.

On Sunday the shop in Green Street is open.

Tablets for a headache: 3 euros.

Some medicine only with a paper from the doctor.`,
              gloss: [
                { de: "a chemist", tr: "eczane", en: "chemist" },
                { de: "medicine", tr: "ilaç", en: "medicine" },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-11-l1-1",
              no: 1,
              ref: "t1",
              text: "The appointment is on Wednesday.",
              answer: true,
              explain:
                "İleti iki günü karşılaştırıyor: «on Wednesday at 9.20, not on Tuesday». Salı bilerek elenen gün.",
            },
            {
              kind: "bool",
              id: "en-a1-11-l1-2",
              no: 2,
              ref: "t1",
              text: "Noor must be there at 9.20.",
              answer: false,
              explain:
                "İleti iki saati ayırıyor: randevu 9.20'de ama «Please come ten minutes before», yani 9.10'da orada olmak gerekiyor.",
            },
            {
              kind: "bool",
              id: "en-a1-11-l1-3",
              no: 3,
              ref: "t1",
              text: "Noor must bring her old tablets.",
              answer: true,
              explain:
                "İleti iki şey istiyor: «Bring your card and the box of your old tablets».",
            },
            {
              kind: "bool",
              id: "en-a1-11-l1-4",
              no: 4,
              ref: "t2",
              text: "This chemist is open on Sunday.",
              answer: false,
              explain:
                "Duyuru «Closed on Sunday» diyor. Pazar günü açık olan Green Street'teki başka bir dükkân.",
            },
            {
              kind: "bool",
              id: "en-a1-11-l1-5",
              no: 5,
              ref: "t2",
              text: "You need a paper from the doctor for some medicine.",
              answer: true,
              explain:
                "Duyurunun son satırı bunu söylüyor: «Some medicine only with a paper from the doctor». Baş ağrısı hapı ise üç euro ve kâğıt istemiyor.",
            },
          ],
        },
        {
          id: "en-a1-11-l2",
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
              title: "Doctor's Surgery",
              body: `Monday to Friday, 8 to 12 and 15 to 18.

You need an appointment. Ring 4412.

Children before ten in the morning.`,
            },
            {
              kind: "text",
              id: "p2",
              genre: "Notice",
              genreTr: "Duyuru",
              title: "Chemist",
              body: `Open 8 to 18. Saturday 9 to 13.

Tablets, plasters and tea.

We can tell you what to take for a small problem. No appointment.`,
            },
            {
              kind: "text",
              id: "p3",
              genre: "Notice",
              genreTr: "Duyuru",
              title: "Hospital",
              body: `Emergency: day and night. Not for a cold.

Bus 7 to the door.

Free parking for one hour.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-11-l2-6",
              no: 6,
              text: "You cut your hand badly at eleven at night.",
              options: ["Doctor's Surgery", "Chemist", "Hospital"],
              answer: 2,
              explain:
                "Duyuru saati veriyor: «Emergency: day and night». Muayenehane ve eczane akşam altıda kapanıyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-11-l2-7",
              no: 7,
              text: "You want to see a doctor with your small child in the morning.",
              options: ["Doctor's Surgery", "Chemist", "Hospital"],
              answer: 0,
              explain:
                "Duyuru çocuklar için bir saat veriyor: «Children before ten in the morning». Hastane ise soğuk algınlığı için değil.",
            },
            {
              kind: "mcq",
              id: "en-a1-11-l2-8",
              no: 8,
              text: "You want something for a small cough and you have no appointment.",
              options: ["Doctor's Surgery", "Chemist", "Hospital"],
              answer: 1,
              explain:
                "Duyuru iki şeyi birden veriyor: «We can tell you what to take for a small problem. No appointment». Doktor için randevu gerekiyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-11-l2-9",
              no: 9,
              text: "You go by bus and you do not know where to get off.",
              options: ["Doctor's Surgery", "Chemist", "Hospital"],
              answer: 2,
              explain:
                "Duyuru otobüsü ve durağı veriyor: «Bus 7 to the door». Öteki iki duyuruda otobüs yok.",
            },
            {
              kind: "mcq",
              id: "en-a1-11-l2-10",
              no: 10,
              text: "You want plasters on a Saturday morning.",
              options: ["Doctor's Surgery", "Chemist", "Hospital"],
              answer: 1,
              explain:
                "Duyuru hem ürünü hem günü veriyor: «Tablets, plasters and tea» ve «Saturday 9 to 13». Muayenehane cumartesi kapalı.",
            },
          ],
        },
        {
          id: "en-a1-11-l3",
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
              title: "WAITING ROOM",
              body: `Please take a number.

No telephones. Water is free.`,
            },
            {
              kind: "text",
              id: "s2",
              genre: "Sign",
              genreTr: "Levha",
              title: "ROOM 3",
              body: `Dr Ilic.

Please knock and wait.`,
            },
            {
              kind: "text",
              id: "s3",
              genre: "Sign",
              genreTr: "Levha",
              title: "CLOSED 12 TO 15",
              body: `For an emergency ring 4412.

We open again at three.`,
            },
            {
              kind: "text",
              id: "s4",
              genre: "Sign",
              genreTr: "Levha",
              title: "PLEASE PAY HERE",
              body: `Card or cash.

We give you a paper for your insurance.`,
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-11-l3-11",
              no: 11,
              ref: "s1",
              text: "You can telephone in the waiting room.",
              answer: false,
              explain:
                "Levha bunu yasaklıyor: «No telephones». Ücretsiz olan tek şey su.",
            },
            {
              kind: "bool",
              id: "en-a1-11-l3-12",
              no: 12,
              ref: "s2",
              text: "You go into room 3 without knocking.",
              answer: false,
              explain:
                "Levha iki adım istiyor: «Please knock and wait». Yani önce vurulacak, sonra beklenecek.",
            },
            {
              kind: "bool",
              id: "en-a1-11-l3-13",
              no: 13,
              ref: "s3",
              text: "You can ring 4412 between twelve and three.",
              answer: true,
              explain:
                "Levha kapalı saatler için numara veriyor: «CLOSED 12 TO 15 — For an emergency ring 4412».",
            },
            {
              kind: "bool",
              id: "en-a1-11-l3-14",
              no: 14,
              ref: "s4",
              text: "You can pay with a card.",
              answer: true,
              explain:
                "Levha iki ödeme biçimi veriyor: «Card or cash». Ayrıca sigorta için bir belge de veriliyor.",
            },
          ],
        },
        {
          id: "en-a1-11-l4",
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
              title: "To Aras",
              body: `Hello Aras,

I am at the doctor {{15}} Wednesday morning. Come after twelve!

There {{16}} two new doctors in the surgery. They are very friendly.

I feel better, {{17}} I am still tired. I sleep in the afternoon.

Last week I {{18}} the tablets from the chemist. They were three euros.

Runa`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-11-l4-15",
              no: 15,
              text: "Gap 15",
              options: ["at", "on", "in"],
              answer: 1,
              explain:
                "Gün adlarıyla `on` kullanılır: `on Wednesday morning`. `at` saat için, `in` ay ve yıl için gelir.",
            },
            {
              kind: "mcq",
              id: "en-a1-11-l4-16",
              no: 16,
              text: "Gap 16",
              options: ["is", "have", "are"],
              answer: 2,
              explain:
                "Kalıp `there is / there are` ve özne çoğul: «two new doctors». Çoğul özne `are` ister; `have` bu kalıpta kullanılmaz.",
            },
            {
              kind: "mcq",
              id: "en-a1-11-l4-17",
              no: 17,
              text: "Gap 17",
              options: ["but", "so", "because"],
              answer: 0,
              explain:
                "İki bilgi karşıt: daha iyi ama hâlâ yorgun. Karşıtlığı `but` kurar; `so` sonuç, `because` sebep bildirir.",
            },
            {
              kind: "mcq",
              id: "en-a1-11-l4-18",
              no: 18,
              text: "Gap 18",
              options: ["get", "got", "gets"],
              answer: 1,
              explain:
                "Cümle «Last week» ile başlıyor, yani zaman geçmiş. `get` fiilinin geçmiş biçimi düzensizdir: `got`.",
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
          id: "en-a1-11-h1",
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
              situation: "Muayenehane bir hastaya ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello, this is the surgery. Your appointment on Tuesday is now on Wednesday at 9.20. The doctor is ill. We are very sorry." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "At the chemist",
              genreTr: "Eczanede",
              situation: "Bir müşteri ilaç soruyor.",
              plays: 2,
              segments: [
                { text: "Something for a headache, please." },
                { text: "These are three euros." },
                { text: "And for a cough?" },
                { text: "For a cough you need a paper from the doctor." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki arkadaş hapları konuşuyor.",
              plays: 2,
              segments: [
                { text: "Are you better?" },
                { text: "A little. I sleep in the afternoon." },
                { text: "And the tablets?" },
                { text: "I take one in the morning and one at night." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Announcement",
              genreTr: "Anons",
              situation: "Muayenehanede anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "The surgery closes at twelve today, not at six. Doctor Ilic is at the hospital. For an emergency please ring 4412." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "At the desk",
              genreTr: "Danışmada",
              situation: "Bir hasta danışmada konuşuyor.",
              plays: 2,
              segments: [
                { text: "I have an appointment at ten." },
                { text: "Your name, please?" },
                { text: "Selma Vance." },
                { text: "Yes. Please take a number and sit down. It is about twenty minutes." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Phone message",
              genreTr: "Telefon iletisi",
              situation: "Bir kişi arkadaşına ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hi Runa, it is Noor. I cannot come on Thursday, because I am at the doctor. Can we meet on Friday at six?" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-11-h1-1",
              no: 1,
              ref: "a1",
              text: "Why is the appointment different?",
              options: ["The patient is ill", "The doctor is ill", "The surgery is closed"],
              answer: 1,
              explain:
                "İleti sebebi tek cümlede veriyor: «The doctor is ill». Randevu salıdan çarşambaya alınıyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-11-h1-2",
              no: 2,
              ref: "a2",
              text: "What can the woman buy today?",
              options: ["Something for a headache", "Something for a cough", "Nothing at all"],
              answer: 0,
              explain:
                "Görevli iki isteği ayırıyor: baş ağrısı hapı «three euros», öksürük için ise «you need a paper from the doctor».",
            },
            {
              kind: "mcq",
              id: "en-a1-11-h1-3",
              no: 3,
              ref: "a3",
              text: "How many tablets does she take in a day?",
              options: ["One", "Three", "Two"],
              answer: 2,
              explain:
                "Konuşmacı iki zaman veriyor: «one in the morning and one at night», yani günde iki tane.",
            },
            {
              kind: "mcq",
              id: "en-a1-11-h1-4",
              no: 4,
              ref: "a4",
              text: "What is different today?",
              options: ["The telephone number", "The closing time", "The doctor's room"],
              answer: 1,
              explain:
                "Anons iki saati karşılaştırıyor: «closes at twelve today, not at six». Numara değişmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-11-h1-5",
              no: 5,
              ref: "a5",
              text: "What must Selma do now?",
              options: ["Come back at ten", "Ring the surgery", "Take a number and wait"],
              answer: 2,
              explain:
                "Görevli iki adım veriyor: «Please take a number and sit down. It is about twenty minutes».",
            },
            {
              kind: "mcq",
              id: "en-a1-11-h1-6",
              no: 6,
              ref: "a6",
              text: "What does Noor want?",
              options: ["To meet on Friday", "To go to the doctor with Runa", "To meet at four"],
              answer: 0,
              explain:
                "İleti soruyla bitiyor: «Can we meet on Friday at six?». Perşembe doktor günü.",
            },
          ],
        },
        {
          id: "en-a1-11-h2",
          no: 2,
          format: "truefalse",
          goal: "instruction",
          prompt: "You hear an announcement in a surgery. Are sentences 7 to 10 true or false? You hear the announcement twice.",
          promptTr: "Bir muayenehanede yapılan anonsu dinleyeceksin. 7–10. cümleler doğru mu yanlış mı? Anonsu iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Announcement",
              genreTr: "Anons",
              situation: "Muayenehane iki değişiklik duyuruyor.",
              plays: 2,
              segments: [
                { text: "Good morning. Two things. From Monday the surgery opens at seven, not at eight. The afternoon does not change: three to six. And Doctor Ilic is on holiday in August. Doctor Bexi is here in that month." },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-11-h2-7",
              no: 7,
              ref: "b1",
              text: "From Monday the surgery opens earlier.",
              answer: true,
              explain:
                "Anons iki saati karşılaştırıyor: «opens at seven, not at eight». Yedi sekizden daha erken.",
            },
            {
              kind: "bool",
              id: "en-a1-11-h2-8",
              no: 8,
              ref: "b1",
              text: "The afternoon time changes too.",
              answer: false,
              explain:
                "Anons öğleden sonrayı dışarıda bırakıyor: «The afternoon does not change: three to six».",
            },
            {
              kind: "bool",
              id: "en-a1-11-h2-9",
              no: 9,
              ref: "b1",
              text: "Doctor Ilic works in August.",
              answer: false,
              explain:
                "Anons «Doctor Ilic is on holiday in August» diyor. O ay başka bir doktor bakıyor.",
            },
            {
              kind: "bool",
              id: "en-a1-11-h2-10",
              no: 10,
              ref: "b1",
              text: "Another doctor is here in August.",
              answer: true,
              explain:
                "Anonsun son cümlesi bunu söylüyor: «Doctor Bexi is here in that month».",
            },
          ],
        },
        {
          id: "en-a1-11-h3",
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
              situation: "Eczane bir müşteriye ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello, this is about your tablets. They are ready here at the chemist. Please bring the paper from the doctor. We close at six." },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "At the desk",
              genreTr: "Danışmada",
              situation: "Bir hasta randevu istiyor.",
              plays: 2,
              segments: [
                { text: "Can I see the doctor today?" },
                { text: "Not today. Tomorrow at eight or on Thursday at four." },
                { text: "Tomorrow, please." },
              ],
            },
            {
              kind: "audio",
              id: "c3",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki arkadaş hastane ziyaretini konuşuyor.",
              plays: 2,
              segments: [
                { text: "How was the hospital?" },
                { text: "Four hours." },
                { text: "Four?" },
                { text: "I went at seven in the evening with a cold. That was my mistake." },
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
                { text: "The lift is out of order. The doctors' rooms are on the first floor. If you cannot use the stairs, please tell us and the doctor comes down." },
              ],
            },
            {
              kind: "audio",
              id: "c5",
              genre: "At the chemist",
              genreTr: "Eczanede",
              situation: "Bir anne çocuğu için ilaç soruyor.",
              plays: 2,
              segments: [
                { text: "Is this medicine for children?" },
                { text: "From twelve years." },
                { text: "My son is nine." },
                { text: "Then this one. It is a little sweeter." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-11-h3-11",
              no: 11,
              ref: "c1",
              text: "What must the person bring?",
              options: ["The doctor's note", "The old box", "Money only"],
              answer: 0,
              explain:
                "İleti tek bir şey istiyor: «Please bring the paper from the doctor». Haplar hazır bekliyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-11-h3-12",
              no: 12,
              ref: "c2",
              text: "When does the man come?",
              options: ["Today", "On Thursday", "Tomorrow"],
              answer: 2,
              explain:
                "Görevli iki seçenek veriyor ve hasta birincisini seçiyor: «Tomorrow, please». Bugün mümkün değil.",
            },
            {
              kind: "mcq",
              id: "en-a1-11-h3-13",
              no: 13,
              ref: "c3",
              text: "What does the woman say?",
              options: ["The hospital was fast", "She waited four hours", "The doctor was not there"],
              answer: 1,
              explain:
                "Konuşmacı süreyi iki kez söylüyor: «Four hours» ve «Four?» sorusuna karşılık akşam yediye gitmesini hata sayıyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-11-h3-14",
              no: 14,
              ref: "c4",
              text: "What can people do?",
              options: ["Ask the doctor to come down", "Use the other lift", "Come back tomorrow"],
              answer: 0,
              explain:
                "Anons koşullu bir çözüm veriyor: «If you cannot use the stairs, please tell us and the doctor comes down».",
            },
            {
              kind: "mcq",
              id: "en-a1-11-h3-15",
              no: 15,
              ref: "c5",
              text: "Which medicine is for the boy?",
              options: ["The first one", "Both of them", "The second one"],
              answer: 2,
              explain:
                "Görevli yaşı duyunca öneriyi değiştiriyor: birincisi «From twelve years», oğlan dokuz yaşında, «Then this one».",
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
          id: "en-a1-11-w1",
          no: 1,
          format: "gap",
          goal: "detail",
          prompt:
            "Your friend Selma Vance wants a new doctor. She is 41 years old. She lives at 9 Park Lane. Her phone number is 07700 900 233. Her appointment is on Monday. Five things are missing on the form. Write them in the gaps.",
          promptTr:
            "Arkadaşın Selma Vance yeni bir doktor istiyor. 41 yaşında. 9 Park Lane adresinde oturuyor. Telefonu 07700 900 233. Randevusu pazartesi. Formda beş bilgi eksik; boşluklara yaz.",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Form",
              genreTr: "Form",
              title: "SURGERY — NEW PATIENT",
              body: `Family name:        Vance
First name:         {{1}}
Age:                {{2}}
Street and number:  {{3}}
Phone:              {{4}}
Day of appointment: {{5}}`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a1-11-w1-1",
              no: 1,
              text: "First name",
              accept: ["Selma"],
              explain:
                "Yönergede tam ad «Selma Vance» olarak geçiyor. Soyadı formda basılı olduğu için boşluğa yalnız ilk ad yazılır.",
            },
            {
              kind: "gap",
              id: "en-a1-11-w1-2",
              no: 2,
              text: "Age",
              accept: ["41", "41 years", "forty-one", "forty-one years old"],
              explain:
                "Yönergede «She is 41 years old» geçiyor. Rakam da yazı da kabul edilir; ölçülen şey imla değil, bilgiyi doğru alana taşımak.",
            },
            {
              kind: "gap",
              id: "en-a1-11-w1-3",
              no: 3,
              text: "Street and number",
              accept: ["9 Park Lane", "Park Lane 9"],
              explain:
                "Adres yönergede «9 Park Lane» olarak veriliyor. İngilizcede kapı numarası sokak adından ÖNCE gelir; Türkçe sıraya alışkın öğrenci ters yazabilir, ikisi de kabul ediliyor.",
            },
            {
              kind: "gap",
              id: "en-a1-11-w1-4",
              no: 4,
              text: "Phone",
              accept: ["07700 900 233", "07700900233"],
              explain:
                "Telefon numarası yönergede «07700 900 233» olarak veriliyor. Boşluklu ve boşluksuz yazım kabul edilir; baştaki sıfır düşürülmemeli.",
            },
            {
              kind: "gap",
              id: "en-a1-11-w1-5",
              no: 5,
              text: "Day of appointment",
              accept: ["Monday", "on Monday"],
              explain:
                "Yönerge günü veriyor: «Her appointment is on Monday». Gün adları büyük harfle yazılır ama karşılaştırma büyük-küçük harfe bakmıyor.",
            },
          ],
        },
        {
          id: "en-a1-11-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "Your friend is ill and is at home. Write a short message to your friend. Write one or two sentences about each point (about 25 words). Do not forget the greeting at the start and at the end.",
          promptTr:
            "Arkadaşın hasta ve evde. Arkadaşına kısa bir ileti yaz. Her maddeye bir-iki cümle yaz (yaklaşık 25 kelime). Baştaki hitabı ve sondaki veda cümlesini unutma.",
          items: [],
          rubric: {
            minWords: 25,
            points: [
              { de: "Say that you know she is ill.", tr: "Hasta olduğunu bildiğini söyle." },
              { de: "Offer to bring something.", tr: "Bir şey getirmeyi teklif et." },
              { de: "Ask when you can come.", tr: "Ne zaman gelebileceğini sor." },
            ],
            sample: `Hi Runa,

Noor says you are ill. I am sorry!

I can bring soup and the tablets from the chemist. It is no problem.

When can I come? I am free after five.

Get well soon!
Aras`,
            criteria: [
              "Üç içerik noktasının üçü de var mı? Biri eksikse metin tam sayılmaz.",
              "Teklif somut mu (ne getireceği söylendi mi)?",
              "Gerçek bir soru soruldu mu ve soru işareti var mı?",
              "Saat ya da gün gibi bir bilgi verildi mi?",
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
      instruction: "This part has three tasks: you talk about health, you ask and answer questions, and you act at a surgery.",
      instructionTr: "Bu bölümde üç görev var: sağlığı anlatma, soru sorup cevaplama ve muayenehanede rol yapma.",
      tasks: [
        {
          id: "en-a1-11-s1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt: "Talk about health and the doctor. Speak about these words: a doctor — a day in the week — a medicine — a friend — money — something you do not like.",
          promptTr: "Sağlığı ve doktoru anlat. Şu sözcüklere göre konuş: bir doktor — haftanın bir günü — bir ilaç — bir arkadaş — para — sevmediğin bir şey.",
          prepSeconds: 30,
          speakSeconds: 90,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "a doctor and the day you go", tr: "Bir doktor ve gittiğin gün" },
              { de: "a medicine and a friend", tr: "Bir ilaç ve bir arkadaş" },
              { de: "how much it costs", tr: "Ne kadara mal olduğu" },
              { de: "one thing you do not like", tr: "Sevmediğin bir şey" },
            ],
            sample:
              "My doctor is Doctor Ilic and her surgery is near my house. I go on Wednesday morning, because I work in the afternoon. I take two tablets a day for my back. My friend Aras comes with me and we drink a coffee after. The tablets are eight euros a month. I do not like the waiting room; it is always very warm.",
            criteria: [
              "Altı sözcüğün her birine değinildi mi?",
              "Gün, saat ve fiyat söylenebiliyor mu?",
              "Sıklık ifadeleri kullanıldı mı? (two tablets a day, on Wednesday)",
              "Anlaşılır bir tempoda mı konuşuldu?",
            ],
          },
        },
        {
          id: "en-a1-11-s2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Topic: health and the doctor. Make a question for each word and answer my questions: doctor — appointment — tablets — hospital — money.",
          promptTr:
            "Konu: sağlık ve doktor. Her sözcük için bir soru kur ve benim sorularımı cevapla: doktor — randevu — haplar — hastane — para.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "Now we talk about health. Your first word is: doctor. Please ask me a question.", tr: "Şimdi sağlığı konuşuyoruz. İlk sözcüğün: doktor. Bana bir soru sor." },
            { who: "you", hint: "«doctor» sözcüğüyle bir soru kur.", expect: "doctor sözcüğüyle dilbilgisel olarak doğru bir soru kurmak", seconds: 25 },
            { who: "partner", de: "My doctor is in the next street. Your next word is: appointment.", tr: "Doktorum yan sokakta. Sıradaki sözcüğün: randevu." },
            { who: "you", hint: "«appointment» için bir soru kur.", expect: "appointment sözcüğüyle bir soru kurmak", seconds: 25 },
            { who: "partner", de: "I have an appointment on Friday at four. Now a question for you: what do you take when you have a headache?", tr: "Cuma saat dörtte randevum var. Şimdi sana bir soru: Başın ağrıyınca ne alırsın?" },
            { who: "you", hint: "Bir ilaç ya da başka bir çözüm söyleyerek cevapla.", expect: "bir çözümü tam bir cümleyle söylemek", seconds: 25 },
            { who: "partner", de: "Thank you. Last question: how much is a doctor's visit where you live?", tr: "Teşekkürler. Son soru: Yaşadığın yerde doktora gitmek ne kadar?" },
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
              "Where is your doctor? — In the next street. When is your appointment? — On Friday at four. Do you take tablets every day? — No, only for my back. Is the hospital near your house? — Twenty minutes by bus. How much is a visit? — It is free with my card.",
            criteria: [
              "Beş sözcüğün her biri için bir soru kuruldu mu?",
              "Sorular doğru kuruldu mu? (Where is … / When is … / How much …)",
              "Cevaplar soruya uygun mu?",
              "Sayı, gün ve saat söylenebiliyor mu?",
            ],
          },
        },
        {
          id: "en-a1-11-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "You are at a doctor's surgery. Situations: you say what is wrong. — You ask for a day. — You ask about the price.",
          promptTr:
            "Bir muayenehanedesin. Durumlar: Neyin olduğunu söyle. — Bir gün iste. — Fiyatı sor.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good morning. How can I help you?", tr: "Günaydın. Nasıl yardımcı olabilirim?" },
            { who: "you", hint: "Neyin olduğunu söyle (baş, sırt, öksürük).", expect: "bir rahatsızlığı tam bir cümleyle söylemek", seconds: 25 },
            { who: "partner", de: "I am sorry to hear that. The doctor can see you this week.", tr: "Geçmiş olsun. Doktor bu hafta sizi görebilir." },
            { who: "you", hint: "Bir gün iste.", expect: "belirli bir gün istemek", seconds: 25 },
            { who: "partner", de: "Thursday at eleven is free. Anything else?", tr: "Perşembe saat on birde boş. Başka bir şey var mı?" },
            { who: "you", hint: "Fiyatı kibarca sor.", expect: "kibarca fiyat sormak", seconds: 25 },
          ],
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "say what is wrong", tr: "Neyin olduğunu söylemek" },
              { de: "ask for a day", tr: "Bir gün istemek" },
              { de: "ask about the price politely", tr: "Kibarca fiyat sormak" },
            ],
            sample:
              "I have a headache every day, and I am very tired. — Can I come on Thursday, please? — How much is it, please?",
            criteria: [
              "Rahatsızlık açıkça söylendi mi?",
              "Gün isteği doğru kuruldu mu? (Can I come on … please)",
              "Fiyat sorusu kibar bir kalıpla mı kuruldu?",
              "Sayılar (gün, saat, fiyat) anlaşıldı mı?",
            ],
          },
        },
      ],
    },
  ],
};
