import type { MockPaper } from "../types";

/**
 * A1 · Deneme 1 — "Arriving in a New City".
 *
 * ÖLÇÜM PLANI (A1 tanımı: bilinen günlük durumlarda kısa, basit metinleri
 * anlamak; tek tek bilgileri bulmak):
 *
 *   Reading  30 dk · 18 madde
 *     Teil 1  5  True/False       kişisel ileti — tek bilgiyi bulma (detail)
 *     Teil 2  5  üç şıklı seçme   duyuru — hangisi bana uyar (orientation)
 *     Teil 3  4  True/False       levha — kural okuma (instruction)
 *     Teil 4  4  şıklı boşluk     kısa metin — dil sistemi (structure)
 *   Listening 20 dk · 15 madde (her kayıt iki kez)
 *     Teil 1  6  üç şıklı seçme   kısa konuşma (detail)
 *     Teil 2  4  True/False       anons (instruction)
 *     Teil 3  5  üç şıklı seçme   telefon iletisi (detail)
 *   Writing  20 dk  form doldurma (5 bilgi) + kısa ileti (~25 kelime)
 *   Speaking 15 dk  tanışma · bilgi isteme · rica etme
 *
 * NEDEN DÖRDÜNCÜ OKUMA GÖREVİ VAR. Almanca A1 kâğıdında üç okuma görevi var
 * ve hiçbiri dil sistemini doğrudan ölçmüyor. İngilizce sınav geleneği bunu
 * A2'den itibaren açıkça ölçüyor (şıklı boşluk, açık boşluk); A1'de tohumu
 * atılıyor. Dördüncü görev o tohum: dört boşluk, üç şık, yalnız en temel
 * seçimler (is/are, but/so, edat, geçmiş zaman).
 *
 * A1 SINIRI: present simple ve `be`, `can`, `there is/are`, temel edatlar,
 * `a/an/the`. Present perfect, edilgen, ilgi cümlesi ve koşul cümlesi YOK —
 * doğrulayıcı bunları eliyor. Sayı, saat ve fiyat okumak A1'in kendi ölçütü
 * olduğu için maddelerin bir kısmı bilerek bunlara dayanıyor.
 */
export const EN_A1_01: MockPaper = {
  id: "en-a1-01",
  course: "en",
  level: "A1",
  no: 1,
  theme: "Arriving in a New City",
  themeTr: "Yeni bir şehre varış",
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
          id: "en-a1-01-l1",
          no: 1,
          format: "truefalse",
          goal: "detail",
          prompt: "Read the two texts and questions 1 to 5. Are the sentences true or false?",
          promptTr: "İki metni ve 1–5. maddeleri oku. Cümleler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Text message",
              genreTr: "Kısa mesaj",
              title: "From: Dani",
              body: `Hi Marta,

My train gets to the station at 4.15 tomorrow, not at 4.50. Trains are early on Fridays.

I wait in the small green coffee shop next to platform 2.

My phone is broken, so I cannot call you. Please come to the coffee shop.

In the evening I want pizza. Do you cook, or do we eat out?

See you tomorrow!
Dani`,
              gloss: [
                { de: "platform", tr: "peron", en: "platform" },
                { de: "broken", tr: "bozuk", en: "broken" },
                { de: "eat out", tr: "dışarıda yemek", en: "eat out" },
              ],
            },
            {
              kind: "text",
              id: "t2",
              genre: "Note in the hall",
              genreTr: "Girişteki not",
              title: "To all neighbours",
              body: `Dear neighbours,

We make a small party in the garden on Saturday, 12 May. It starts at 3 p.m.

Coffee and cake are free. For the food in the evening, every person pays 5 euros.

Please bring your children. We have games and music.

Bad weather? Then we go to the big room in the cellar.

The Aydin family, flat 3B`,
              gloss: [
                { de: "free", tr: "ücretsiz", en: "free of charge" },
                { de: "the cellar", tr: "bodrum", en: "cellar" },
                { de: "the flat", tr: "daire", en: "flat" },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-01-l1-1",
              no: 1,
              ref: "t1",
              text: "Dani's train comes before 4.30.",
              answer: true,
              explain:
                "Metinde saat «4.15» olarak veriliyor ve 4.15, 4.30'dan öncedir. Metindeki ikinci sayı (4.50) tuzak: Dani onu \"not at 4.50\" diye açıkça eliyor. A1'de saat okumak ölçülen becerilerden biri, bu yüzden madde doğrudan saate dayanıyor.",
            },
            {
              kind: "bool",
              id: "en-a1-01-l1-2",
              no: 2,
              ref: "t1",
              text: "Dani waits on platform 2.",
              answer: false,
              explain:
                "Metin \"I wait in the small green coffee shop next to platform 2\" diyor: beklediği yer kafe, peron değil. Peron yalnız kafenin yerini tarif ediyor — «next to platform 2». Yer bildiren edatı atlayan öğrenci burada yanılır.",
            },
            {
              kind: "bool",
              id: "en-a1-01-l1-3",
              no: 3,
              ref: "t1",
              text: "Marta can call Dani on the phone.",
              answer: false,
              explain:
                "Metin iki cümleyle bunu kapatıyor: telefonu bozuk (\"My phone is broken\") ve bu yüzden arayamaz (\"I cannot call you\"). Bu yüzden Dani kafeye gelinmesini istiyor.",
            },
            {
              kind: "bool",
              id: "en-a1-01-l1-4",
              no: 4,
              ref: "t2",
              text: "The party begins in the morning.",
              answer: false,
              explain:
                "Duyuruda başlama saati «3 p.m.», yani öğleden sonra üç. A1'de `a.m.` ve `p.m.` ayrımı ölçülen bilgilerden biri; sayıyı görüp `p.m.` işaretini atlayan öğrenci sabah sanır.",
            },
            {
              kind: "bool",
              id: "en-a1-01-l1-5",
              no: 5,
              ref: "t2",
              text: "People pay nothing for the cake.",
              answer: true,
              explain:
                "Duyuru \"Coffee and cake are free\" diyor; ücretli olan yalnız akşam yemeği (\"every person pays 5 euros\"). İki bilgi arka arkaya duruyor ve madde ikisini ayırt etmeyi istiyor.",
            },
          ],
        },
        {
          id: "en-a1-01-l2",
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
              body: `Open every day from 9 a.m. to 7 p.m.

Books in twelve languages. A free card for young people under 18.

Quiet rooms for study on the first floor. No food and no drinks there.

Free wifi for all readers.`,
            },
            {
              kind: "text",
              id: "p2",
              genre: "Notice",
              genreTr: "Duyuru",
              title: "Sports Centre",
              body: `The pool is open from 7 a.m. to 10 p.m. A ticket costs 4 euros.

Football and basketball on Tuesday and Thursday evenings.

New: a morning class for parents with small children, at 10 a.m.

The café next to the pool is open all day.`,
            },
            {
              kind: "text",
              id: "p3",
              genre: "Notice",
              genreTr: "Duyuru",
              title: "Language Café",
              body: `Every Wednesday at 6 p.m. in the old town hall.

Come and speak English, Turkish, Arabic or Polish with new people.

No teacher, no lesson, no money. Only tea and talk.

Bring a friend!`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-01-l2-6",
              no: 6,
              text: "You want to read a book in your own language.",
              options: ["City Library", "Sports Centre", "Language Café"],
              answer: 0,
              explain:
                "Kütüphane duyurusu \"Books in twelve languages\" diyor — on iki dilde kitap var. Dil Kafe'de konuşulur ama kitap yoktur (\"No teacher, no lesson\"), spor merkezinde ise kitaptan hiç söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-01-l2-7",
              no: 7,
              text: "You want to swim at 7.30 in the morning, before work.",
              options: ["City Library", "Sports Centre", "Language Café"],
              answer: 1,
              explain:
                "Havuz «7 a.m.»de açılıyor, yani 7.30'da açık. Kütüphane 9'da, Dil Kafe ise akşam 6'da başlıyor; ikisi de sabah 7.30'a uymaz. Madde saat karşılaştırmasını ölçüyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-01-l2-8",
              no: 8,
              text: "You want to meet new people and pay nothing.",
              options: ["City Library", "Sports Centre", "Language Café"],
              answer: 2,
              explain:
                "Dil Kafe hem yeni insanlar (\"with new people\") hem ücretsizlik (\"no money\") ölçütünü karşılıyor. Spor merkezinde bilet 4 euro; kütüphane ücretsiz olabilir ama orada insanlarla tanışmaktan söz edilmiyor, tersine \"Quiet rooms\" deniyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-01-l2-9",
              no: 9,
              text: "You look for a quiet place to study.",
              options: ["City Library", "Sports Centre", "Language Café"],
              answer: 0,
              explain:
                "Kütüphanede \"Quiet rooms for study on the first floor\" var. Dil Kafe'nin işi konuşmak, spor merkezinin yanında bir kafe var; ikisi de sessiz çalışma yeri değil.",
            },
            {
              kind: "mcq",
              id: "en-a1-01-l2-10",
              no: 10,
              text: "You want a morning class for you and your small child.",
              options: ["City Library", "Sports Centre", "Language Café"],
              answer: 1,
              explain:
                "Spor merkezi tam bunu duyuruyor: \"a morning class for parents with small children, at 10 a.m.\". Öteki iki duyuruda küçük çocuklar için bir program yok; kütüphanedeki ücretsiz kart 18 yaş altı için ve bir ders değil.",
            },
          ],
        },
        {
          id: "en-a1-01-l3",
          no: 3,
          format: "truefalse",
          goal: "instruction",
          prompt: "Read the four signs and questions 11 to 14. Are the sentences true or false?",
          promptTr: "Dört levhayı ve 11–14. maddeleri oku. Cümleler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "s1",
              genre: "Sign at the door",
              genreTr: "Kapıdaki levha",
              title: "LIBRARY",
              body: `Monday to Friday: 9 - 19
Saturday: 10 - 14
Sunday: closed

Put your books in the blue box next to the door.`,
            },
            {
              kind: "text",
              id: "s2",
              genre: "Sign in the shop",
              genreTr: "Mağazadaki levha",
              title: "CASH DESK 4",
              body: `Only for people with ten things or less.

Cards only. No cash at this desk.`,
            },
            {
              kind: "text",
              id: "s3",
              genre: "Sign in the park",
              genreTr: "Parktaki levha",
              title: "CITY PARK",
              body: `Dogs on the path only, not on the grass.

Music: please use your own earphones.

The park closes at 22.00.`,
            },
            {
              kind: "text",
              id: "s4",
              genre: "Note in the flat",
              genreTr: "Dairedeki not",
              title: "DEAR GUEST",
              body: `The key for the bikes is in the kitchen, in the little box.

Please put the bikes back in the cellar in the evening.

Wifi: NEST-3B. The code is on the fridge.`,
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-01-l3-11",
              no: 11,
              ref: "s1",
              text: "You can go to the library on Sunday.",
              answer: false,
              explain:
                "Levhada \"Sunday: closed\" yazıyor. Üç satır arka arkaya gün ve saat veriyor; madde son satırı okumayı ölçüyor, çünkü ilk iki satır \"açık\" izlenimi bırakıyor.",
            },
            {
              kind: "bool",
              id: "en-a1-01-l3-12",
              no: 12,
              ref: "s2",
              text: "You cannot pay with cash at desk 4.",
              answer: true,
              explain:
                "Levha iki kez söylüyor: \"Cards only\" ve \"No cash at this desk\". A1'de `only` ve `no` ile kurulan sınırlama okumanın ölçütlerinden biri.",
            },
            {
              kind: "bool",
              id: "en-a1-01-l3-13",
              no: 13,
              ref: "s3",
              text: "You can walk with your dog in the park.",
              answer: true,
              explain:
                "Levha köpeği yasaklamıyor, YERİNİ sınırlıyor: \"Dogs on the path only, not on the grass\". Yasak ile sınır arasındaki farkı görmek gerekiyor; `only` sözcüğünü \"yasak\" diye okuyan öğrenci yanılır.",
            },
            {
              kind: "bool",
              id: "en-a1-01-l3-14",
              no: 14,
              ref: "s4",
              text: "The bikes stay outside in the night.",
              answer: false,
              explain:
                "Not tersini istiyor: \"put the bikes back in the cellar in the evening\". Bisikletler akşam bodruma konur, dışarıda kalmaz.",
            },
          ],
        },
        {
          id: "en-a1-01-l4",
          no: 4,
          format: "gapMcq",
          goal: "structure",
          prompt: "Read the postcard and complete gaps 15 to 18. Which word fits: a, b or c?",
          promptTr: "Kartpostalı oku ve 15–18. boşlukları tamamla. Hangi sözcük uyar: a, b ya da c?",
          texts: [
            {
              kind: "text",
              id: "t4",
              genre: "Postcard",
              genreTr: "Kartpostal",
              title: "Hello from Porto",
              body: `Dear Grandma,

I am in Porto now. The city is very old and the people {{15}} really friendly.

Every morning I go to the beach. The water is cold, {{16}} I swim for ten minutes.

Yesterday I {{17}} on a boat trip on the river. It was my best day here.

I come home {{18}} Sunday evening. I bring you a small present!

Love,
Nuray`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-01-l4-15",
              no: 15,
              text: "Gap 15",
              options: ["is", "are", "be"],
              answer: 1,
              explain:
                "Özne `the people` çoğuldur ve çoğul özne `are` ister. `is` tekil özneyle, `be` ise yalın biçimdir ve çekimli fiil olarak tek başına kullanılmaz.",
            },
            {
              kind: "mcq",
              id: "en-a1-01-l4-16",
              no: 16,
              text: "Gap 16",
              options: ["but", "because", "so"],
              answer: 0,
              explain:
                "İki bilgi karşıt: su soğuk, ama yine de yüzüyor. Karşıtlığı `but` kurar. `because` sebep bildirir (\"soğuk olduğu için yüzüyorum\" anlamsız), `so` sonuç bildirir ve yine ters bir anlam verirdi.",
            },
            {
              kind: "mcq",
              id: "en-a1-01-l4-17",
              no: 17,
              text: "Gap 17",
              options: ["go", "went", "goes"],
              answer: 1,
              explain:
                "Cümle `Yesterday` ile başlıyor ve devamında \"It was my best day\" diyor: zaman geçmiş. `go` ve `goes` şimdiki zamandır. A1'de en sık düzensiz fiillerin geçmiş biçimi beklenir.",
            },
            {
              kind: "mcq",
              id: "en-a1-01-l4-18",
              no: 18,
              text: "Gap 18",
              options: ["in", "at", "on"],
              answer: 2,
              explain:
                "Gün adlarıyla `on` kullanılır: on Sunday, on Monday. `in` aylar ve yıllarla (in May), `at` saatlerle (at six) gider. Burada \"Sunday evening\" bir gün ifadesi olduğu için `on` doğru.",
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
          id: "en-a1-01-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Which answer is right? You hear every recording twice.",
          promptTr: "Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "In a shop",
              genreTr: "Mağazada",
              situation: "Bir müşteri kasada bir ceket soruyor.",
              plays: 2,
              segments: [
                { speaker: "Customer", text: "Excuse me, how much is this blue jacket?" },
                { speaker: "Shop assistant", text: "The blue one is thirty-five euros. The green one is cheaper, only twenty-eight." },
                { speaker: "Customer", text: "Then I take the green one, please." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "On the phone",
              genreTr: "Telefonda",
              situation: "Bir kadın arkadaşını arıyor ve buluşma saatini soruyor.",
              plays: 2,
              segments: [
                { speaker: "Ilya", text: "Hi Sam, are we still on for the film at seven?" },
                { speaker: "Sam", text: "Sorry, I finish work at seven. Can we say half past eight?" },
                { speaker: "Ilya", text: "Fine. I wait in front of the cinema." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "In a café",
              genreTr: "Kafede",
              situation: "Bir müşteri sipariş veriyor.",
              plays: 2,
              segments: [
                { speaker: "Waiter", text: "Good morning. What can I get you?" },
                { speaker: "Customer", text: "A tea, please. And do you have any cake?" },
                { speaker: "Waiter", text: "The apple cake is finished. We have chocolate cake and a small cheese sandwich." },
                { speaker: "Customer", text: "The sandwich, then. Thank you." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "At school",
              genreTr: "Okulda",
              situation: "Bir öğrenci öğretmenine ders gününü soruyor.",
              plays: 2,
              segments: [
                { speaker: "Student", text: "Is the English class on Tuesday this week?" },
                { speaker: "Teacher", text: "Not this week. The room is not free, so we meet on Thursday." },
                { speaker: "Student", text: "Same time, at four?" },
                { speaker: "Teacher", text: "Yes, at four." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "At home",
              genreTr: "Evde",
              situation: "İki ev arkadaşı akşam yemeğini konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Rosa", text: "We have no bread and no milk. Can you go to the shop?" },
                { speaker: "Ben", text: "I can go, but I have no money with me." },
                { speaker: "Rosa", text: "Take my card. It is on the table in the kitchen." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "At the station",
              genreTr: "İstasyonda",
              situation: "Bir yolcu gişede bilet alıyor.",
              plays: 2,
              segments: [
                { speaker: "Passenger", text: "One ticket to Leeds, please. For today." },
                { speaker: "Clerk", text: "Single or return?" },
                { speaker: "Passenger", text: "Return, please. I come back in the evening." },
                { speaker: "Clerk", text: "That is nineteen pounds. Platform 6, in twelve minutes." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-01-h1-1",
              no: 1,
              ref: "a1",
              text: "What does the customer buy?",
              options: ["The green jacket", "The blue jacket", "Both of the jackets"],
              answer: 0,
              explain:
                "Müşteri son cümlede kararını söylüyor: «I take the green one». Mavi ceket 35 euro, yeşil 28 euro; ilk sorulan mavi olduğu için dinlemeden şık işaretleyen öğrenci onu seçer. Üçüncü şık da tek bir ceket alındığı için elenir (\"the green ONE\").",
            },
            {
              kind: "mcq",
              id: "en-a1-01-h1-2",
              no: 2,
              ref: "a2",
              text: "When do they meet?",
              options: ["At seven", "At half past eight", "At eight"],
              answer: 1,
              explain:
                "İlk söylenen saat (yedi) Sam'in işten çıkış saati, buluşma saati değil. Sam yeni saati öneriyor: «Can we say half past eight?». Kayıtta üç sayı geçiyor ve madde hangisinin buluşma saati olduğunu ayırt etmeyi ölçüyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-01-h1-3",
              no: 3,
              ref: "a3",
              text: "What does the customer order to eat?",
              options: ["Apple cake", "Chocolate cake", "A sandwich"],
              answer: 2,
              explain:
                "Garson elmalı keki eliyor («The apple cake is finished») ve iki seçenek sayıyor; müşteri sandviçi seçiyor. Kayıtta üç yiyecek adı geçiyor: biri yok, biri sunulup alınmamış, biri alınmış.",
            },
            {
              kind: "mcq",
              id: "en-a1-01-h1-4",
              no: 4,
              ref: "a4",
              text: "When is the English class this week?",
              options: ["On Tuesday, as every week", "On Thursday", "On Friday"],
              answer: 1,
              explain:
                "Öğretmen bu haftaki dersi perşembeye alıyor, çünkü sınıf boş değil: «Not this week». Salı normal gün ama bu hafta geçerli değil; öğrencinin sorusunda salı geçtiği için ilk şık tuzak.",
            },
            {
              kind: "mcq",
              id: "en-a1-01-h1-5",
              no: 5,
              ref: "a5",
              text: "What is the problem for Ben?",
              options: ["He has no money with him", "He does not want to go", "The shop is closed"],
              answer: 0,
              explain:
                "Ben gitmeyi kabul ediyor («I can go»), tek engel parasının yanında olmaması. Rosa da bu yüzden kartını veriyor. Gitmek istememek ya da kapalı market kayıtta hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-01-h1-6",
              no: 6,
              ref: "a6",
              text: "How much does the ticket cost?",
              options: ["Six pounds", "Twelve pounds fifty", "Nineteen pounds"],
              answer: 2,
              explain:
                "Fiyat on dokuz pound. Kayıttaki öteki iki sayı fiyat değil: 6 peron numarası, 12 ise kalkışa kaç dakika kaldığı. A1'de sayıyı duymak yetmiyor, sayının neyin sayısı olduğunu da ayırt etmek gerekiyor.",
            },
          ],
        },
        {
          id: "en-a1-01-h2",
          no: 2,
          format: "truefalse",
          goal: "instruction",
          prompt: "Are the sentences true or false? You hear every announcement twice.",
          promptTr: "Cümleler doğru mu yanlış mı? Her anonsu iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Announcement in a shop",
              genreTr: "Mağaza anonsu",
              situation: "Bir mağazada kapanış anonsu yapılıyor.",
              plays: 2,
              segments: [
                { text: "Dear customers, the shop closes in fifteen minutes. Please go to the cash desks now. The bakery is closed already. Thank you." },
              ],
            },
            {
              kind: "audio",
              id: "b2",
              genre: "Announcement on a train",
              genreTr: "Tren anonsu",
              situation: "Trende bir anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "Good afternoon. This train goes to Manchester. The next stop is Derby, in about ten minutes. The café is in coach 5." },
              ],
            },
            {
              kind: "audio",
              id: "b3",
              genre: "Announcement at the pool",
              genreTr: "Havuz anonsu",
              situation: "Yüzme havuzunda bir anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "Attention please. The big pool is free again. The small pool is only for children under six today. Please take a shower before you swim." },
              ],
            },
            {
              kind: "audio",
              id: "b4",
              genre: "Message on a phone",
              genreTr: "Telefon anonsu",
              situation: "Bir doktor muayenehanesinin telesekreter mesajı.",
              plays: 2,
              segments: [
                { text: "Hello, this is Doctor Weber's office. We are open from Monday to Friday, 8 to 12. On Wednesday afternoon we are open too, from 3 to 6." },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-01-h2-7",
              no: 7,
              ref: "b1",
              text: "You can still buy bread in the shop.",
              answer: false,
              explain:
                "Anons «The bakery is closed already» diyor: fırın reyonu çoktan kapanmış. Mağazanın kendisi on beş dakika daha açık, ama ekmek reyonu değil. Madde «mağaza açık» ile «her reyon açık» arasındaki farkı ölçüyor.",
            },
            {
              kind: "bool",
              id: "en-a1-01-h2-8",
              no: 8,
              ref: "b2",
              text: "The train stops in Derby before Manchester.",
              answer: true,
              explain:
                "Anons trenin Manchester'a gittiğini, bir sonraki durağın Derby olduğunu söylüyor; yani Derby önce geliyor. İki şehir adı arka arkaya geçiyor ve sıra bilgisi «next stop» ifadesinden çıkıyor.",
            },
            {
              kind: "bool",
              id: "en-a1-01-h2-9",
              no: 9,
              ref: "b3",
              text: "Today all children can swim in the small pool.",
              answer: false,
              explain:
                "Küçük havuz bugün yalnız altı yaşın altındaki çocuklar için («only for children under six today»). `only` ile kurulan sınırı atlayan öğrenci «çocuklar» sözcüğünü duyup doğru sanır.",
            },
            {
              kind: "bool",
              id: "en-a1-01-h2-10",
              no: 10,
              ref: "b4",
              text: "The office is open on Wednesday afternoon.",
              answer: true,
              explain:
                "Mesaj normal saatleri (8-12) söyledikten sonra bir istisna ekliyor: çarşamba öğleden sonra 3-6 arası da açık. A1'de istisna cümlesini duymak ölçülen becerilerden biri.",
            },
          ],
        },
        {
          id: "en-a1-01-h3",
          no: 3,
          format: "mcq",
          goal: "detail",
          prompt: "Which answer is right? You hear every recording twice.",
          promptTr: "Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Voicemail",
              genreTr: "Telesekreter iletisi",
              situation: "Bir arkadaş telesekretere ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hi, it's Nora. I am at the airport, but my bag is not here. I come to you tomorrow, not today. Sorry!" },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "On the phone",
              genreTr: "Telefonda",
              situation: "Bir kişi randevu alıyor.",
              plays: 2,
              segments: [
                { speaker: "Receptionist", text: "Good morning, hair studio Ella." },
                { speaker: "Caller", text: "Hello, I want an appointment for Friday morning." },
                { speaker: "Receptionist", text: "Friday morning is full. I have Friday at four, or Saturday at ten." },
                { speaker: "Caller", text: "Saturday, please." },
              ],
            },
            {
              kind: "audio",
              id: "c3",
              genre: "In the street",
              genreTr: "Sokakta",
              situation: "Bir turist yol soruyor.",
              plays: 2,
              segments: [
                { speaker: "Tourist", text: "Excuse me, where is the post office?" },
                { speaker: "Woman", text: "Go straight on, then take the second street on the left. It is next to the bank." },
                { speaker: "Tourist", text: "Is it far?" },
                { speaker: "Woman", text: "No, five minutes on foot." },
              ],
            },
            {
              kind: "audio",
              id: "c4",
              genre: "At work",
              genreTr: "İş yerinde",
              situation: "İki meslektaş toplantıyı konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Tom", text: "Is the meeting in room 12?" },
                { speaker: "Aisha", text: "It was room 12, but now it is in the big room on the ground floor." },
                { speaker: "Tom", text: "Good, that room is bigger." },
              ],
            },
            {
              kind: "audio",
              id: "c5",
              genre: "At home",
              genreTr: "Evde",
              situation: "Bir baba kızına hafta sonu planını anlatıyor.",
              plays: 2,
              segments: [
                { speaker: "Dad", text: "On Saturday we visit Grandma. On Sunday we go to the zoo." },
                { speaker: "Lea", text: "Can Mia come to the zoo too?" },
                { speaker: "Dad", text: "Yes, but ask her mother first." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-01-h3-11",
              no: 11,
              ref: "c1",
              text: "When does Nora come?",
              options: ["Today", "Tomorrow", "On Sunday"],
              answer: 1,
              explain:
                "İleti «I come to you tomorrow, not today» diyor: yarın. `not today` eki, bugünü bekleyen dinleyicinin düzeltmesi; onu duymayan öğrenci ilk şıkkı seçer.",
            },
            {
              kind: "mcq",
              id: "en-a1-01-h3-12",
              no: 12,
              ref: "c2",
              text: "When is the appointment?",
              options: ["Saturday at ten", "Friday morning", "Friday at four"],
              answer: 0,
              explain:
                "Arayan kişi cuma sabahını istiyor ama görevli «Friday morning is full» diyor ve iki seçenek sunuyor; cumartesi seçiliyor. Kayıtta üç zaman geçiyor, yalnız sonuncusu kabul edilen randevu.",
            },
            {
              kind: "mcq",
              id: "en-a1-01-h3-13",
              no: 13,
              ref: "c3",
              text: "Where is the post office?",
              options: ["Behind the station", "In the first street on the right", "Next to the bank"],
              answer: 2,
              explain:
                "Kadın yeri iki bilgiyle veriyor: soldaki ikinci sokak ve «next to the bank». İkinci şık hem yönü hem sırayı ters çeviriyor (sağdaki birinci sokak); tarif dinlerken en sık yapılan hata bu.",
            },
            {
              kind: "mcq",
              id: "en-a1-01-h3-14",
              no: 14,
              ref: "c4",
              text: "Where is the meeting now?",
              options: ["In room 12", "In the big room downstairs", "In Tom's office"],
              answer: 1,
              explain:
                "Aisha oda değişikliğini söylüyor: eskiden 12 numaraydı, şimdi zemin kattaki büyük oda. `It was … but now it is …` yapısı değişikliği taşıyor; ilk yarısını duyup duran öğrenci 12 numarayı seçer.",
            },
            {
              kind: "mcq",
              id: "en-a1-01-h3-15",
              no: 15,
              ref: "c5",
              text: "What does the family do on Sunday?",
              options: ["They visit Grandma", "They stay at home", "They go to the zoo"],
              answer: 2,
              explain:
                "Baba iki günü ayrı ayrı söylüyor; ikinci cümle «On Sunday we go to the zoo». İki günü karıştıran öğrenci ilk şıkkı (büyükanne ziyareti) seçer; madde gün ile etkinliği eşleştirmeyi ölçüyor.",
            },
          ],
        },
      ],
    },

    /* ── WRITING ───────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 20,
      instruction: "This part has two tasks: you complete a form and you write a short email.",
      instructionTr: "Bu bölümde iki görev var: bir formu tamamlayacak ve kısa bir e-posta yazacaksın.",
      tasks: [
        {
          id: "en-a1-01-w1",
          no: 1,
          format: "gap",
          goal: "detail",
          prompt:
            "Your friend Aylin Kaya wants a library card for her daughter. The daughter is nine years old. The family lives at 24 Park Road, Bristol, post code BS1 5TR. Aylin wants to come on Saturday. She pays by card, not with cash. Five things are missing on the form. Write them in the gaps.",
          promptTr:
            "Arkadaşın Aylin Kaya kızı için kütüphane kartı istiyor. Kızı dokuz yaşında. Aile 24 Park Road, Bristol, posta kodu BS1 5TR adresinde oturuyor. Aylin cumartesi gelmek istiyor. Nakit değil kartla ödüyor. Formda beş bilgi eksik; boşluklara yaz.",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Form",
              genreTr: "Form",
              title: "LIBRARY CARD — APPLICATION",
              body: `Family name, first name:   Kaya, Aylin
Age of the child:          {{1}}
Street and number:         {{2}}
Post code:                 {{3}} Bristol
First visit:               {{4}}
Payment:                   {{5}}
Signature:                 A. Kaya`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a1-01-w1-1",
              no: 1,
              text: "Age of the child",
              accept: ["9", "9 years", "nine", "nine years", "nine years old"],
              explain:
                "Yönergede «The daughter is nine years old» geçiyor; formdaki satır yaşı soruyor. Rakam da (9) yazı da (nine) kabul edilir, çünkü ölçülen şey imla değil bilgiyi doğru yere taşımak.",
            },
            {
              kind: "gap",
              id: "en-a1-01-w1-2",
              no: 2,
              text: "Street and number",
              accept: ["24 Park Road", "Park Road 24", "24 Park Rd"],
              explain:
                "Adres yönergede tam veriliyor: «24 Park Road». İngilizcede kapı numarası sokak adından ÖNCE gelir; Türkçe sıraya alışkın öğrenci ters yazma eğilimindedir, ikisi de kabul ediliyor ama kanonik biçim numarayla başlar.",
            },
            {
              kind: "gap",
              id: "en-a1-01-w1-3",
              no: 3,
              text: "Post code",
              accept: ["BS1 5TR", "BS15TR"],
              explain:
                "Posta kodu «BS1 5TR». Şehir adı (Bristol) formda zaten basılı olduğu için boşluğa yalnız kod yazılır. Boşluklu ve boşluksuz yazım kabul edilir.",
            },
            {
              kind: "gap",
              id: "en-a1-01-w1-4",
              no: 4,
              text: "First visit",
              accept: ["Saturday", "on Saturday"],
              explain:
                "Yönerge «Aylin wants to come on Saturday» diyor; ilk geliş günü cumartesi. Gün adı büyük harfle yazılır ama katlama büyük-küçük harfe bakmadığı için küçük yazım da doğru sayılır.",
            },
            {
              kind: "gap",
              id: "en-a1-01-w1-5",
              no: 5,
              text: "Payment",
              accept: ["card", "by card", "credit card", "debit card"],
              explain:
                "Yönergede «She pays by card, not with cash» geçiyor: ödeme kartla. «cash» yazmak yönergeye aykırı olurdu; cümlenin ikinci yarısı tam bunu elemek için var.",
            },
          ],
        },
        {
          id: "en-a1-01-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "You want to visit the city museum in June. Write an email to the museum. Write one or two sentences about each point (about 25 words). Do not forget the greeting at the start and at the end.",
          promptTr:
            "Haziranda şehir müzesini gezmek istiyorsun. Müzeye bir e-posta yaz. Her maddeye bir-iki cümle yaz (yaklaşık 25 kelime). Baştaki hitabı ve sondaki veda cümlesini unutma.",
          items: [],
          rubric: {
            minWords: 25,
            points: [
              { de: "Why do you write?", tr: "Neden yazıyorsun?" },
              { de: "Ask about the opening times.", tr: "Açılış saatlerini sor." },
              { de: "Ask about the price for students.", tr: "Öğrenci fiyatını sor." },
            ],
            sample: `Dear Sir or Madam,

I come to your city in June and I want to visit the museum. When is the museum open? How much is a ticket for students?

Thank you very much.

Best wishes,
Deniz Arslan`,
            criteria: [
              "Üç içerik noktasının üçü de var mı? Biri eksikse metin tam sayılmaz.",
              "Hitap ve veda var mı? (Dear Sir or Madam … / Best wishes …)",
              "Yaklaşık 25 kelime yazıldı mı? Çok kısa metin ölçülemez.",
              "Cümleler anlaşılıyor mu? A1'de birkaç hata anlamı bozmuyorsa sorun değil.",
              "Sorular soru biçiminde mi kuruldu? (When is … / How much is …)",
            ],
          },
        },
      ],
    },

    /* ── SPEAKING ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "This part has three tasks: you introduce yourself, you ask for information, and you make and answer requests.",
      instructionTr: "Bu bölümde üç görev var: kendini tanıtma, bilgi isteme, rica etme ve gelen ricaya karşılık verme.",
      tasks: [
        {
          id: "en-a1-01-s1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt: "Introduce yourself. Speak about these words: name — age — country — home town — languages — job — free time.",
          promptTr: "Kendini tanıt. Şu sözcüklere göre konuş: ad — yaş — ülke — yaşadığın yer — diller — meslek — boş zaman.",
          prepSeconds: 30,
          speakSeconds: 90,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "name and age", tr: "Ad ve yaş" },
              { de: "country and home town", tr: "Ülke ve yaşanılan yer" },
              { de: "languages and job", tr: "Diller ve meslek" },
              { de: "one free time activity", tr: "Bir boş zaman etkinliği" },
            ],
            sample:
              "My name is Elif Demir. I am twenty-three years old and I come from Turkey. Now I live in Bristol. I speak Turkish, a little English and some German. I am a nurse. In my free time I like swimming.",
            criteria: [
              "Yedi sözcüğün her birine değinildi mi?",
              "Cümleler kısa ve tam mı? A1'de «My name is …», «I come from …» kalıpları yeterli.",
              "Yaş sayısı doğru söylendi mi?",
              "Anlaşılır bir tempoda mı konuşuldu?",
            ],
          },
        },
        {
          id: "en-a1-01-s2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Topic: shopping. Make a question for each word and answer my questions: supermarket — bread — price — Saturday — bag.",
          promptTr:
            "Konu: alışveriş. Her sözcük için bir soru kur ve benim sorularımı cevapla: market — ekmek — fiyat — cumartesi — çanta.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "Now we talk about shopping. Your first word is: supermarket. Please ask me a question.", tr: "Şimdi alışveriş konusunu konuşuyoruz. İlk sözcüğün: market. Bana bir soru sor." },
            { who: "you", hint: "«supermarket» sözcüğüyle bir soru kur.", expect: "supermarket sözcüğüyle dilbilgisel olarak doğru bir soru kurmak", seconds: 25 },
            { who: "partner", de: "The supermarket in my street is open until eight. Your next word is: bread.", tr: "Sokağımdaki market akşam sekize kadar açık. Sıradaki sözcüğün: ekmek." },
            { who: "you", hint: "«bread» için bir soru kur.", expect: "bread sözcüğüyle bir soru kurmak", seconds: 25 },
            { who: "partner", de: "I buy fresh bread almost every day. Now a question for you: how often do you go shopping?", tr: "Neredeyse her gün taze ekmek alıyorum. Şimdi sana bir soru: Ne sıklıkla alışverişe gidiyorsun?" },
            { who: "you", hint: "Soruyu cevapla — ne sıklıkla alışverişe gidiyorsun?", expect: "sıklık bildiren tam bir cümleyle cevap vermek", seconds: 25 },
            { who: "partner", de: "Thank you. Last question: how much is a kilo of apples where you live?", tr: "Teşekkürler. Son soru: Yaşadığın yerde bir kilo elma kaç para?" },
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
              "Where is the supermarket? — It is in Park Road. Do you buy bread every day? — Yes, I buy bread every morning. How much is the bread? — It is one pound twenty. Do you go shopping on Saturday? — Yes, on Saturday at ten. Do you have a bag? — No, I need a bag.",
            criteria: [
              "Beş sözcüğün her biri için bir soru kuruldu mu?",
              "Sorular doğru kuruldu mu? (Do you … / Where is … / How much is …)",
              "Cevaplar soruya uygun mu?",
              "Fiyat ve saat gibi sayılar söylenebiliyor mu?",
            ],
          },
        },
        {
          id: "en-a1-01-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Ask for something and answer a request. Situations: you need a pen. — You want to open the window. — Somebody asks you for your dictionary.",
          promptTr:
            "Bir şey rica et ve gelen ricaya karşılık ver. Durumlar: Kaleme ihtiyacın var. — Pencereyi açmak istiyorsun. — Biri senden sözlüğünü istiyor.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Now we practise requests. First situation: you need a pen. Please ask me.", tr: "Şimdi rica etmeyi çalışıyoruz. İlk durum: Kaleme ihtiyacın var. Benden iste." },
            { who: "you", hint: "Kalem iste, kibarca.", expect: "kibar bir rica kalıbı kurmak (Can you … please / Could you …)", seconds: 20 },
            { who: "partner", de: "Yes, of course, here you are. Second situation: you want to open the window. Ask me.", tr: "Tabii, buyur. İkinci durum: Pencereyi açmak istiyorsun. Bana sor." },
            { who: "you", hint: "Pencereyi açmak için izin iste.", expect: "izin sormak (Can I … / May I …)", seconds: 20 },
            { who: "partner", de: "Of course, please open it. Now I ask you for something: can you give me your dictionary, please?", tr: "Elbette, aç. Şimdi ben senden bir şey rica ediyorum: Sözlüğünü bana verebilir misin?" },
            { who: "you", hint: "Ricaya karşılık ver: kabul et ya da kısa bir gerekçeyle reddet.", expect: "bir ricaya kabul ya da gerekçeli ret ile karşılık vermek", seconds: 25 },
          ],
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "ask politely", tr: "Kibarca rica etmek" },
              { de: "answer a request", tr: "Gelen ricaya karşılık vermek" },
            ],
            sample:
              "Can you give me a pen, please? — Yes, of course, here you are. Can I open the window? — Yes, please do. Can you give me your dictionary? — Sorry, I need it now. In ten minutes I can give it to you.",
            criteria: [
              "Rica `please` ile ve kibar bir kalıpla kuruldu mu? (Can you … / Could you … / May I …)",
              "Gelen ricaya hem olumlu hem olumsuz karşılık verilebiliyor mu?",
              "Olumsuz cevap kısa bir gerekçeyle yumuşatıldı mı?",
            ],
          },
        },
      ],
    },
  ],
};
