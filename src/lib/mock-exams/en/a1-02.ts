import type { MockPaper } from "../types";

/**
 * A1 · Deneme 2 — "Home, Work and Free Time".
 *
 * Deneme 1 ile AYNI PLAN (bölüm süreleri, görev sayısı, madde sayısı); iki
 * denemenin puanı ancak böyle aynı şeyi söyler. Değişen tek şey içerik ve
 * bağlam: birincisi bir şehre varmayı, bu ikincisi orada yerleşmeyi konu
 * alıyor — ev, iş ve boş zaman.
 *
 * A1 SINIRI: present simple ve `be`, `can`, `there is/are`, temel edatlar,
 * en sık düzensiz fiillerin geçmiş biçimi. Present perfect, edilgen, ilgi
 * cümlesi ve koşul cümlesi yok.
 */
export const EN_A1_02: MockPaper = {
  id: "en-a1-02",
  course: "en",
  level: "A1",
  no: 2,
  theme: "Home, Work and Free Time",
  themeTr: "Ev, iş ve boş zaman",
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
          id: "en-a1-02-l1",
          no: 1,
          format: "truefalse",
          goal: "detail",
          prompt: "Read the two texts and questions 1 to 5. Are the sentences true or false?",
          promptTr: "İki metni ve 1–5. maddeleri oku. Cümleler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Email",
              genreTr: "E-posta",
              title: "From: kemal@post.net",
              body: `Hi Sofia,

Good news! I find a flat in Green Street. It is on the third floor and it is very quiet.

The rent is 480 pounds a month. Water is in the price, but not electricity.

There is no lift, so I carry everything up the stairs. My back is not happy!

I move on 3 August. Can you help me on that day?

Kemal`,
              gloss: [
                { de: "the rent", tr: "kira", en: "rent" },
                { de: "the lift", tr: "asansör", en: "lift" },
                { de: "electricity", tr: "elektrik", en: "electricity" },
              ],
            },
            {
              kind: "text",
              id: "t2",
              genre: "Note at work",
              genreTr: "İş yerindeki not",
              title: "For the morning team",
              body: `Hello everybody,

The printer in room 2 is broken. The man comes on Thursday.

Until then, please use the small printer in the kitchen. It is slow but it works.

Do not put paper in the old machine. It is not safe.

Anna (office)`,
              gloss: [
                { de: "the printer", tr: "yazıcı", en: "printer" },
                { de: "slow", tr: "yavaş", en: "slow" },
                { de: "safe", tr: "güvenli", en: "safe" },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-02-l1-1",
              no: 1,
              ref: "t1",
              text: "Kemal pays for the water every month.",
              answer: false,
              explain:
                "E-postada «Water is in the price» yazıyor: su kiraya dahil, ayrıca ödenmiyor. Ayrı ödenen şey elektrik. Cümlenin iki yarısı iki farklı gider için, madde ikisini ayırmayı ölçüyor.",
            },
            {
              kind: "bool",
              id: "en-a1-02-l1-2",
              no: 2,
              ref: "t1",
              text: "The flat is on the ground floor.",
              answer: false,
              explain:
                "Daire üçüncü katta: «It is on the third floor». Asansör olmadığı için eşyaları merdivenden taşıyor; zemin kat olsaydı bu cümle anlamsız olurdu.",
            },
            {
              kind: "bool",
              id: "en-a1-02-l1-3",
              no: 3,
              ref: "t1",
              text: "Kemal asks Sofia for help on 3 August.",
              answer: true,
              explain:
                "Son iki cümle birlikte okunur: taşınma günü 3 Ağustos ve «Can you help me on that day?». `that day` bir önceki cümledeki tarihi gösteriyor; gönderme öğesini izlemek A1'de ölçülen becerilerden.",
            },
            {
              kind: "bool",
              id: "en-a1-02-l1-4",
              no: 4,
              ref: "t2",
              text: "The printer in room 2 works again on Wednesday.",
              answer: false,
              explain:
                "Notta tamirci için «The man comes on Thursday» deniyor, yani perşembe. Çarşamba metinde hiç geçmiyor; gün adını dikkatli okumayan öğrenci yanılır.",
            },
            {
              kind: "bool",
              id: "en-a1-02-l1-5",
              no: 5,
              ref: "t2",
              text: "People can use the printer in the kitchen.",
              answer: true,
              explain:
                "Not tam bunu istiyor: «please use the small printer in the kitchen». Yavaş olduğu söyleniyor ama çalışıyor; «It is slow but it works» cümlesindeki `but` yasağı değil sınırlamayı bildiriyor.",
            },
          ],
        },
        {
          id: "en-a1-02-l2",
          no: 2,
          format: "mcq",
          goal: "orientation",
          prompt: "Read situations 6 to 10 and the three notices. Which notice helps you?",
          promptTr: "6–10. durumları ve üç duyuruyu oku. Hangi duyuru sana uygun?",
          texts: [
            {
              kind: "text",
              id: "p1",
              genre: "Notice",
              genreTr: "Duyuru",
              title: "Room to Rent",
              body: `A big room in a flat with two students. 320 pounds a month.

Free from 1 September. Bus 14 stops in front of the house.

No animals, please. We share the kitchen and the bathroom.

Call Marek: 07700 900 118.`,
            },
            {
              kind: "text",
              id: "p2",
              genre: "Notice",
              genreTr: "Duyuru",
              title: "Help at Home",
              body: `We clean flats and small offices. Monday to Saturday.

15 pounds an hour. Two hours minimum.

We also wash windows and water your plants in the holidays.

Write to us: hello@helpathome.co`,
            },
            {
              kind: "text",
              id: "p3",
              genre: "Notice",
              genreTr: "Duyuru",
              title: "Evening Courses",
              body: `Cooking, guitar and photography. Every evening from 6 to 8.

One course: 40 pounds for ten weeks. The first evening is free.

Small groups: eight people only.

Ask at the desk in the town hall.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-02-l2-6",
              no: 6,
              text: "You want to learn to play an instrument in the evening.",
              options: ["Room to Rent", "Help at Home", "Evening Courses"],
              answer: 2,
              explain:
                "Üçüncü duyuruda üç kurs sayılıyor ve biri gitar: «Cooking, guitar and photography». Öteki iki duyuruda ders ya da öğretmen hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-02-l2-7",
              no: 7,
              text: "You look for a cheap place to live from September.",
              options: ["Room to Rent", "Help at Home", "Evening Courses"],
              answer: 0,
              explain:
                "İlan hem tarihi hem fiyatı veriyor: «Free from 1 September», ayda 320 pound. Öteki iki duyuru oturmakla ilgili değil; ikincisi ev temizliği, üçüncüsü kurs.",
            },
            {
              kind: "mcq",
              id: "en-a1-02-l2-8",
              no: 8,
              text: "You go on holiday and somebody must water your plants.",
              options: ["Room to Rent", "Help at Home", "Evening Courses"],
              answer: 1,
              explain:
                "İkinci duyuru bunu açıkça sayıyor: «we also wash windows and water your plants in the holidays». Kelime eşleşmesi değil, ölçüt eşleşmesi: tatilde bitki sulama hizmeti.",
            },
            {
              kind: "mcq",
              id: "en-a1-02-l2-9",
              no: 9,
              text: "You want to try something new for one evening, for free.",
              options: ["Room to Rent", "Help at Home", "Evening Courses"],
              answer: 2,
              explain:
                "Kurs duyurusunda «The first evening is free» yazıyor: ilk akşam ücretsiz. On haftalık ücret 40 pound ama madde yalnız ilk akşamı soruyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-02-l2-10",
              no: 10,
              text: "You have a cat and you look for a room.",
              options: ["Room to Rent", "Help at Home", "Evening Courses"],
              answer: 0,
              explain:
                "Oda ilanı yine de doğru duyuru: yalnız orada oda kiralanıyor. İlandaki «No animals, please» kuralı öğrencinin kendi kararı için önemli bir bilgi ama başka bir duyuru oda vermiyor; madde \"hangi ilan bu konuyla ilgili\" sorusunu ölçüyor.",
            },
          ],
        },
        {
          id: "en-a1-02-l3",
          no: 3,
          format: "truefalse",
          goal: "instruction",
          prompt: "Read the four signs and questions 11 to 14. Are the sentences true or false?",
          promptTr: "Dört levhayı ve 11–14. maddeleri oku. Cümleler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "s1",
              genre: "Sign in the building",
              genreTr: "Binadaki levha",
              title: "RUBBISH",
              body: `Paper in the blue bin. Glass in the green bin.

Big things: only on the first Saturday of the month.

Please do not leave bags next to the bins.`,
            },
            {
              kind: "text",
              id: "s2",
              genre: "Sign at the office door",
              genreTr: "Ofis kapısındaki levha",
              title: "POST ROOM",
              body: `Open 8.00 - 11.30 and 13.00 - 15.00.

Big boxes go to the back door, not to this desk.

Last post of the day: 15.00.`,
            },
            {
              kind: "text",
              id: "s3",
              genre: "Sign in the gym",
              genreTr: "Spor salonundaki levha",
              title: "GYM RULES",
              body: `Please bring your own towel. Shoes for inside only.

Water is free. Other drinks are not allowed here.

Members can bring one guest on Sundays.`,
            },
            {
              kind: "text",
              id: "s4",
              genre: "Sign at the bus stop",
              genreTr: "Otobüs durağındaki levha",
              title: "BUS 14",
              body: `Every ten minutes, 6.00 - 20.00.

After 20.00: every half hour.

Sunday: from 9.00. No night bus.`,
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-02-l3-11",
              no: 11,
              ref: "s1",
              text: "You can put a big old chair next to the bins every day.",
              answer: false,
              explain:
                "Levha büyük eşyalar için tek bir gün veriyor: «only on the first Saturday of the month». Ayrıca torbaları kutuların yanına bırakmak da yasak. `only` ile kurulan sınırı atlayan öğrenci yanılır.",
            },
            {
              kind: "bool",
              id: "en-a1-02-l3-12",
              no: 12,
              ref: "s2",
              text: "You can post a letter at 14.00.",
              answer: true,
              explain:
                "İkinci çalışma aralığı «13.00 - 15.00»; saat 14.00 bu aralığın içinde. Levhada iki ayrı aralık var ve madde ikisini birden okumayı ölçüyor.",
            },
            {
              kind: "bool",
              id: "en-a1-02-l3-13",
              no: 13,
              ref: "s3",
              text: "You can drink coffee in the gym.",
              answer: false,
              explain:
                "Levha suyu serbest bırakıp ötekileri kapatıyor: «Other drinks are not allowed here». Yalnız ilk cümleyi okuyup «Water is free» diyene bakan öğrenci yanılır.",
            },
            {
              kind: "bool",
              id: "en-a1-02-l3-14",
              no: 14,
              ref: "s4",
              text: "On Sunday the first bus goes at 9.00.",
              answer: true,
              explain:
                "Son satır pazar için ayrı bir başlangıç veriyor: «Sunday: from 9.00». Haftanın öteki günleri 6.00'da başlıyor; madde istisna satırını bulmayı ölçüyor.",
            },
          ],
        },
        {
          id: "en-a1-02-l4",
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
              title: "To my new team",
              body: `Hello everybody,

My name is Rita and I start work here {{15}} Monday.

I come from Lisbon, but now I live near the park. There {{16}} two buses from my street.

Last year I {{17}} in a small hotel. This job is new for me.

I am a little nervous, {{18}} I am also very happy.

See you soon!
Rita`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-02-l4-15",
              no: 15,
              text: "Gap 15",
              options: ["in", "at", "on"],
              answer: 2,
              explain:
                "Gün adlarıyla `on` kullanılır: on Monday. `in` aylar ve yıllar için (in May), `at` saatler için (at nine). A1'de bu üç edatın ayrımı temel bir ölçüt.",
            },
            {
              kind: "mcq",
              id: "en-a1-02-l4-16",
              no: 16,
              text: "Gap 16",
              options: ["are", "is", "have"],
              answer: 0,
              explain:
                "Kalıp `there is / there are` ve devamındaki özne çoğul: «two buses». Çoğul özne `are` ister. `have` bu kalıpta hiç kullanılmaz.",
            },
            {
              kind: "mcq",
              id: "en-a1-02-l4-17",
              no: 17,
              text: "Gap 17",
              options: ["work", "worked", "working"],
              answer: 1,
              explain:
                "Cümle «Last year» ile başlıyor: zaman geçmiş. Düzenli fiilin geçmiş biçimi `-ed` alır. `work` şimdiki zaman, `working` ise tek başına çekimli fiil olamaz.",
            },
            {
              kind: "mcq",
              id: "en-a1-02-l4-18",
              no: 18,
              text: "Gap 18",
              options: ["so", "but", "because"],
              answer: 1,
              explain:
                "İki duygu karşıt: biraz gergin, ama aynı zamanda çok mutlu. Karşıtlığı `but` kurar. `so` sonuç, `because` sebep bildirir; ikisi de burada anlamı bozar.",
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
          id: "en-a1-02-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Which answer is right? You hear every recording twice.",
          promptTr: "Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "At the door",
              genreTr: "Kapıda",
              situation: "Bir komşu paket için kapıyı çalıyor.",
              plays: 2,
              segments: [
                { speaker: "Neighbour", text: "Hello, a box for you came this morning. It is in my flat." },
                { speaker: "Yusuf", text: "Oh, thank you. Can I come at six?" },
                { speaker: "Neighbour", text: "I work until seven today. Come after that, please." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "In the office",
              genreTr: "Ofiste",
              situation: "İki meslektaş öğle yemeğini konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Pia", text: "Do we eat in the canteen today?" },
                { speaker: "Sam", text: "The canteen is closed. There is a market in the square with hot food." },
                { speaker: "Pia", text: "Good. I take a soup there." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "On the phone",
              genreTr: "Telefonda",
              situation: "Bir kişi spor salonuna üyelik soruyor.",
              plays: 2,
              segments: [
                { speaker: "Caller", text: "Hello, how much is one month at your gym?" },
                { speaker: "Staff", text: "Twenty-five pounds a month, or eight pounds for one week." },
                { speaker: "Caller", text: "I am here for ten days only. So one week, and then I ask again." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "In the street",
              genreTr: "Sokakta",
              situation: "Bir kişi otobüs durağını soruyor.",
              plays: 2,
              segments: [
                { speaker: "Man", text: "Excuse me, is this the stop for bus 14?" },
                { speaker: "Woman", text: "Bus 14 stops on the other side of the road, next to the bank." },
                { speaker: "Man", text: "Thank you very much." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "At home",
              genreTr: "Evde",
              situation: "İki ev arkadaşı hafta sonu planını konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Ida", text: "Do you come to the lake on Saturday?" },
                { speaker: "Tom", text: "I work on Saturday morning. I can come in the afternoon." },
                { speaker: "Ida", text: "Perfect. We take the train at two." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "At the doctor",
              genreTr: "Doktorda",
              situation: "Bir hasta randevu için geliyor.",
              plays: 2,
              segments: [
                { speaker: "Receptionist", text: "Good morning. Your appointment is at half past ten." },
                { speaker: "Patient", text: "I am early, I know. It is only ten o'clock." },
                { speaker: "Receptionist", text: "No problem. Please sit down. The doctor is quick today." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-02-h1-1",
              no: 1,
              ref: "a1",
              text: "When can Yusuf get his box?",
              options: ["After seven", "At six", "Tomorrow morning"],
              answer: 0,
              explain:
                "Komşu «I work until seven today. Come after that» diyor: yediden sonra. Yusuf altıyı öneriyor ama kabul edilmiyor; ilk söylenen saati doğru sanan öğrenci yanılır.",
            },
            {
              kind: "mcq",
              id: "en-a1-02-h1-2",
              no: 2,
              ref: "a2",
              text: "Where do they eat today?",
              options: ["In the canteen", "At the market in the square", "At home"],
              answer: 1,
              explain:
                "Yemekhane kapalı («The canteen is closed») ve Sam meydandaki pazarı öneriyor; Pia oradan çorba alacağını söylüyor. Kayıtta yemekhane geçiyor ama olumsuzlanmış hâlde.",
            },
            {
              kind: "mcq",
              id: "en-a1-02-h1-3",
              no: 3,
              ref: "a3",
              text: "What does the caller take?",
              options: ["One month", "Nothing today", "One week"],
              answer: 2,
              explain:
                "Arayan on gün kalacağını söyleyip «So one week» diyor. Aylık ücret (25 pound) kayıtta geçiyor ama seçilmiyor; sayıyı duyup karar cümlesini duymayan öğrenci ilk şıkkı seçer.",
            },
            {
              kind: "mcq",
              id: "en-a1-02-h1-4",
              no: 4,
              ref: "a4",
              text: "Where does bus 14 stop?",
              options: ["Here, at this stop", "Across the road, by the bank", "In front of the school"],
              answer: 1,
              explain:
                "Kadın «Bus 14 stops on the other side of the road» diyor: karşı tarafta, bankanın yanında. Adamın sorusu \"burası mı\" olduğu için ilk şık tuzak; cevap soruyu düzeltiyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-02-h1-5",
              no: 5,
              ref: "a5",
              text: "When does Tom come to the lake?",
              options: ["On Saturday afternoon", "On Saturday morning, before work", "On Sunday"],
              answer: 0,
              explain:
                "Tom cumartesi sabahı çalışıyor ve «I can come in the afternoon» diyor. Sabah kayıtta geçiyor ama çalışma zamanı olarak; madde iki zaman dilimini ayırmayı ölçüyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-02-h1-6",
              no: 6,
              ref: "a6",
              text: "What time is the appointment?",
              options: ["At ten o'clock", "At eleven", "At half past ten"],
              answer: 2,
              explain:
                "Görevli randevuyu «at half past ten» diye veriyor; hasta ise saatin şu an on olduğunu, yani erken geldiğini söylüyor. Kayıttaki iki saatten biri randevu, öteki şimdiki zaman.",
            },
          ],
        },
        {
          id: "en-a1-02-h2",
          no: 2,
          format: "truefalse",
          goal: "instruction",
          prompt: "Are the sentences true or false? You hear every announcement twice.",
          promptTr: "Cümleler doğru mu yanlış mı? Her anonsu iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Announcement in the building",
              genreTr: "Bina anonsu",
              situation: "Apartmanda su kesintisi anonsu.",
              plays: 2,
              segments: [
                { text: "Good morning. There is no water in the building tomorrow, from nine to twelve. Please take water for the morning. The lift works normally." },
              ],
            },
            {
              kind: "audio",
              id: "b2",
              genre: "Announcement at the station",
              genreTr: "İstasyon anonsu",
              situation: "İstasyonda peron değişikliği anonsu.",
              plays: 2,
              segments: [
                { text: "Attention please. The train to Oxford leaves from platform 8 today, not from platform 3. It leaves in six minutes." },
              ],
            },
            {
              kind: "audio",
              id: "b3",
              genre: "Announcement in the library",
              genreTr: "Kütüphane anonsu",
              situation: "Kütüphanede kapanış anonsu.",
              plays: 2,
              segments: [
                { text: "Dear readers, the library closes in twenty minutes. You can take books home until quarter to six. The computer room is closed now." },
              ],
            },
            {
              kind: "audio",
              id: "b4",
              genre: "Message on a phone",
              genreTr: "Telefon anonsu",
              situation: "Bir kursun telesekreter mesajı.",
              plays: 2,
              segments: [
                { text: "Hello, this is the cooking school. The class on Tuesday starts at seven, not at six. The room is the same. Please bring an apron." },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-02-h2-7",
              no: 7,
              ref: "b1",
              text: "There is no water in the afternoon.",
              answer: false,
              explain:
                "Anons kesinti saatlerini veriyor: «from nine to twelve», yani sabah. Öğleden sonra su var. Kesinti fikrini duyup saatleri kaçıran öğrenci yanılır.",
            },
            {
              kind: "bool",
              id: "en-a1-02-h2-8",
              no: 8,
              ref: "b2",
              text: "The train to Oxford leaves from platform 8.",
              answer: true,
              explain:
                "Anons peronu düzeltiyor: «from platform 8 today, not from platform 3». Kayıtta iki peron numarası var ve doğru olan birincisi; ikincisi açıkça eleniyor.",
            },
            {
              kind: "bool",
              id: "en-a1-02-h2-9",
              no: 9,
              ref: "b3",
              text: "You can use the computers now.",
              answer: false,
              explain:
                "Anons «The computer room is closed now» diyor. Kütüphane yirmi dakika daha açık ama bilgisayar odası değil; madde \"bina açık\" ile \"her oda açık\" farkını ölçüyor.",
            },
            {
              kind: "bool",
              id: "en-a1-02-h2-10",
              no: 10,
              ref: "b4",
              text: "The cooking class starts one hour later than usual.",
              answer: true,
              explain:
                "Mesaj «starts at seven, not at six» diyor: bir saat sonra. İki saat arasındaki farkı hesaplamak gerekiyor; A1'de saatleri karşılaştırmak ölçülen becerilerden biri.",
            },
          ],
        },
        {
          id: "en-a1-02-h3",
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
              situation: "Bir usta telesekretere ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello, this is Ali from the shop. Your bike is ready. We are open until six, and on Saturday until one." },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "At the ticket office",
              genreTr: "Bilet gişesinde",
              situation: "Bir yolcu müze bileti alıyor.",
              plays: 2,
              segments: [
                { speaker: "Visitor", text: "Two tickets, please. One adult and one child." },
                { speaker: "Clerk", text: "Children under seven are free. How old is your son?" },
                { speaker: "Visitor", text: "He is five." },
                { speaker: "Clerk", text: "Then one ticket: nine pounds." },
              ],
            },
            {
              kind: "audio",
              id: "c3",
              genre: "At work",
              genreTr: "İş yerinde",
              situation: "Bir yönetici yeni çalışana ilk günü anlatıyor.",
              plays: 2,
              segments: [
                { speaker: "Manager", text: "Your first day is Monday. Please come at nine, not at eight." },
                { speaker: "New worker", text: "Do I need my passport?" },
                { speaker: "Manager", text: "No, only your bank card and a photo." },
              ],
            },
            {
              kind: "audio",
              id: "c4",
              genre: "On the phone",
              genreTr: "Telefonda",
              situation: "Bir kişi arkadaşını akşam yemeğine çağırıyor.",
              plays: 2,
              segments: [
                { speaker: "Nina", text: "Come for dinner on Friday. I cook fish." },
                { speaker: "Omar", text: "I do not eat fish, sorry." },
                { speaker: "Nina", text: "No problem, then I make pasta." },
              ],
            },
            {
              kind: "audio",
              id: "c5",
              genre: "In the shop",
              genreTr: "Mağazada",
              situation: "Bir müşteri bir tişörtü değiştirmek istiyor.",
              plays: 2,
              segments: [
                { speaker: "Customer", text: "This shirt is too small. Do you have a bigger one?" },
                { speaker: "Assistant", text: "In blue, yes. In red we only have this size." },
                { speaker: "Customer", text: "Then I take the blue one." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-02-h3-11",
              no: 11,
              ref: "c1",
              text: "Until when is the shop open on Saturday?",
              options: ["Until six", "It is closed on Saturday", "Until one"],
              answer: 2,
              explain:
                "İleti iki saat veriyor: normal günler altıya kadar, «on Saturday until one». Madde cumartesiyi soruyor; ilk duyulan saati işaretleyen öğrenci yanılır.",
            },
            {
              kind: "mcq",
              id: "en-a1-02-h3-12",
              no: 12,
              ref: "c2",
              text: "How many tickets does the visitor pay for?",
              options: ["One ticket", "Two tickets", "No tickets, both are free"],
              answer: 0,
              explain:
                "Çocuk beş yaşında ve «Children under seven are free»; bu yüzden görevli tek bilet kesiyor: dokuz pound. Ziyaretçi iki bilet istiyor, ama ödenen bir tane.",
            },
            {
              kind: "mcq",
              id: "en-a1-02-h3-13",
              no: 13,
              ref: "c3",
              text: "What must the new worker bring?",
              options: ["A passport", "A photo and a bank card", "Nothing"],
              answer: 1,
              explain:
                "Yönetici pasaportu eliyor ve iki şey istiyor: «only your bank card and a photo». Soru pasaportla sorulduğu için ilk şık tuzak; cevabın olumsuz başlaması dikkat gerektiriyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-02-h3-14",
              no: 14,
              ref: "c4",
              text: "What does Nina cook on Friday?",
              options: ["Pasta", "Fish", "Nothing, they eat out"],
              answer: 0,
              explain:
                "İlk plan balık ama Omar balık yemiyor, bu yüzden Nina «then I make pasta» diyor. Kayıttaki ilk yemek adı iptal edilmiş plandır.",
            },
            {
              kind: "mcq",
              id: "en-a1-02-h3-15",
              no: 15,
              ref: "c5",
              text: "Which shirt does the customer take?",
              options: ["The red one", "The small one", "The blue one"],
              answer: 2,
              explain:
                "Büyük beden yalnız mavide var; müşteri «Then I take the blue one» diyor. Kırmızı kayıtta geçiyor ama yalnız mevcut olmayan beden için.",
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
          id: "en-a1-02-w1",
          no: 1,
          format: "gap",
          goal: "detail",
          prompt:
            "Your friend Omar Haddad wants a place in the evening cooking course. He was born on 14 March 1998. He lives at 7 Mill Lane, Leeds. His phone number is 07700 900 245. He wants the Tuesday group. Five things are missing on the form. Write them in the gaps.",
          promptTr:
            "Arkadaşın Omar Haddad akşam yemek kursuna kaydolmak istiyor. 14 Mart 1998 doğumlu. 7 Mill Lane, Leeds adresinde oturuyor. Telefonu 07700 900 245. Salı grubunu istiyor. Formda beş bilgi eksik; boşluklara yaz.",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Form",
              genreTr: "Form",
              title: "EVENING COURSE — REGISTRATION",
              body: `Family name:        Haddad
First name:         {{1}}
Date of birth:      {{2}}
Street and number:  {{3}}
Town:               {{4}}
Phone:              {{5}}
Group:              Tuesday`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a1-02-w1-1",
              no: 1,
              text: "First name",
              accept: ["Omar"],
              explain:
                "Yönergede tam ad «Omar Haddad» olarak geçiyor. Soyadı formda zaten basılı (Haddad), bu yüzden boşluğa yalnız ilk ad yazılır. İki alanı karıştıran öğrenci soyadı yazar.",
            },
            {
              kind: "gap",
              id: "en-a1-02-w1-2",
              no: 2,
              text: "Date of birth",
              accept: ["14 March 1998", "14.03.1998", "14/03/1998", "14 03 1998"],
              explain:
                "Yönergede «He was born on 14 March 1998» geçiyor. Ay adıyla ya da rakamla yazım kabul edilir; ölçülen şey biçim değil doğru tarihi taşımak.",
            },
            {
              kind: "gap",
              id: "en-a1-02-w1-3",
              no: 3,
              text: "Street and number",
              accept: ["7 Mill Lane", "Mill Lane 7"],
              explain:
                "Adres yönergede «7 Mill Lane, Leeds» olarak veriliyor; bu satır yalnız sokağı ve numarayı istiyor. Şehir bir sonraki satırda ayrı soruluyor, buraya yazılmaz.",
            },
            {
              kind: "gap",
              id: "en-a1-02-w1-4",
              no: 4,
              text: "Town",
              accept: ["Leeds"],
              explain:
                "Adresin şehir kısmı «Leeds». Formda sokak ile şehir ayrı satırlarda; bilgiyi doğru satıra yerleştirmek A1 form doldurmanın ölçütlerinden biri.",
            },
            {
              kind: "gap",
              id: "en-a1-02-w1-5",
              no: 5,
              text: "Phone",
              accept: ["07700 900 245", "07700900245"],
              explain:
                "Telefon numarası yönergede «07700 900 245» olarak veriliyor. Boşluklu ve boşluksuz yazım kabul edilir; baştaki sıfır düşürülmemeli.",
            },
          ],
        },
        {
          id: "en-a1-02-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "Your neighbour has your key while you are away. Write a short message to your neighbour. Write one or two sentences about each point (about 25 words). Do not forget the greeting at the start and at the end.",
          promptTr:
            "Sen yokken komşunda senin anahtarın var. Komşuna kısa bir ileti yaz. Her maddeye bir-iki cümle yaz (yaklaşık 25 kelime). Baştaki hitabı ve sondaki veda cümlesini unutma.",
          items: [],
          rubric: {
            minWords: 25,
            points: [
              { de: "Say when you are away.", tr: "Ne zaman şehir dışında olacağını söyle." },
              { de: "Ask your neighbour to water the plants.", tr: "Komşundan bitkileri sulamasını iste." },
              { de: "Say thank you and offer something back.", tr: "Teşekkür et ve karşılığında bir şey öner." },
            ],
            sample: `Dear Marta,

I am away from Monday to Friday next week. Can you water my plants two times, please? Thank you very much! I can help you in July.

Best wishes,
Omar`,
            criteria: [
              "Üç içerik noktasının üçü de var mı? Biri eksikse metin tam sayılmaz.",
              "Hitap ve veda var mı? (Dear … / Best wishes …)",
              "Yaklaşık 25 kelime yazıldı mı?",
              "Rica kibar bir kalıpla mı kuruldu? (Can you … please)",
              "Cümleler anlaşılıyor mu? A1'de birkaç hata anlamı bozmuyorsa sorun değil.",
            ],
          },
        },
      ],
    },

    /* ── SPEAKING ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "This part has three tasks: you introduce yourself, you ask and answer questions about a topic, and you react in everyday situations.",
      instructionTr: "Bu bölümde üç görev var: kendini tanıtma, bir konu üzerine soru sorup cevaplama ve günlük durumlarda karşılık verme.",
      tasks: [
        {
          id: "en-a1-02-s1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt: "Talk about your home. Speak about these words: town — flat or house — rooms — the way to work or school — one good thing — one bad thing.",
          promptTr: "Evinden söz et. Şu sözcüklere göre konuş: şehir — daire mi ev mi — odalar — işe/okula gidiş — bir iyi yan — bir kötü yan.",
          prepSeconds: 30,
          speakSeconds: 90,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "town and type of home", tr: "Şehir ve ev türü" },
              { de: "the rooms", tr: "Odalar" },
              { de: "the way to work or school", tr: "İşe ya da okula gidiş" },
              { de: "one good and one bad thing", tr: "Bir iyi ve bir kötü yan" },
            ],
            sample:
              "I live in Leeds. I have a small flat on the second floor. There are two rooms, a kitchen and a bathroom. I go to work by bus. It takes twenty minutes. The good thing is the park next to my house. The bad thing is the noise from the street.",
            criteria: [
              "Altı sözcüğün her birine değinildi mi?",
              "`There is / There are` kalıbı odaları anlatmak için kullanıldı mı?",
              "İyi ve kötü yan ayrı ayrı söylendi mi?",
              "Anlaşılır bir tempoda mı konuşuldu?",
            ],
          },
        },
        {
          id: "en-a1-02-s2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Topic: free time. Make a question for each word and answer my questions: weekend — sport — music — friends — money.",
          promptTr:
            "Konu: boş zaman. Her sözcük için bir soru kur ve benim sorularımı cevapla: hafta sonu — spor — müzik — arkadaşlar — para.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "Now we talk about free time. Your first word is: weekend. Please ask me a question.", tr: "Şimdi boş zaman konusunu konuşuyoruz. İlk sözcüğün: hafta sonu. Bana bir soru sor." },
            { who: "you", hint: "«weekend» sözcüğüyle bir soru kur.", expect: "weekend sözcüğüyle dilbilgisel olarak doğru bir soru kurmak", seconds: 25 },
            { who: "partner", de: "At the weekend I usually walk in the park with my dog. Your next word is: sport.", tr: "Hafta sonları genelde köpeğimle parkta yürüyorum. Sıradaki sözcüğün: spor." },
            { who: "you", hint: "«sport» için bir soru kur.", expect: "sport sözcüğüyle bir soru kurmak", seconds: 25 },
            { who: "partner", de: "I play volleyball on Wednesdays. Now a question for you: what music do you like?", tr: "Çarşambaları voleybol oynuyorum. Şimdi sana bir soru: Nasıl müzik seversin?" },
            { who: "you", hint: "Soruyu cevapla — nasıl müzik seversin?", expect: "beğeni bildiren tam bir cümleyle cevap vermek", seconds: 25 },
            { who: "partner", de: "Thank you. Last question: how much money do you need for a free time activity?", tr: "Teşekkürler. Son soru: Bir boş zaman etkinliği için ne kadar paraya ihtiyacın var?" },
            { who: "you", hint: "Bir miktar söyle ve neye harcandığını ekle.", expect: "bir para miktarını söylemek ve neye harcandığını eklemek", seconds: 25 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "a question for each word", tr: "Her sözcük için bir soru" },
              { de: "answers to my questions", tr: "Sorulara cevap vermek" },
            ],
            sample:
              "What do you do at the weekend? — I visit my sister. Do you like sport? — Yes, I play football. What music do you listen to? — I like old rock music. Do you meet your friends in the week? — Yes, on Thursday. How much is a cinema ticket? — About nine pounds.",
            criteria: [
              "Beş sözcüğün her biri için bir soru kuruldu mu?",
              "Sorular doğru kuruldu mu? (Do you … / What … / How much …)",
              "Cevaplar soruya uygun mu?",
              "Sayılar ve fiyatlar söylenebiliyor mu?",
            ],
          },
        },
        {
          id: "en-a1-02-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "React in everyday situations. Situations: you are late for work. — You want a day off. — A colleague asks you for help.",
          promptTr:
            "Günlük durumlarda karşılık ver. Durumlar: İşe geç kaldın. — Bir gün izin istiyorsun. — Bir iş arkadaşın senden yardım istiyor.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "First situation: you come to work twenty minutes late. Say something to me.", tr: "İlk durum: İşe yirmi dakika geç geldin. Bana bir şey söyle." },
            { who: "you", hint: "Özür dile ve kısa bir sebep söyle.", expect: "özür dilemek ve kısa bir sebep vermek", seconds: 20 },
            { who: "partner", de: "That is fine, thank you for telling me. Second situation: you need one day off next week. Ask me.", tr: "Sorun değil, söylediğin için sağ ol. İkinci durum: Gelecek hafta bir gün izne ihtiyacın var. Bana sor." },
            { who: "you", hint: "İzin iste ve hangi günü istediğini söyle.", expect: "kibarca izin istemek ve günü belirtmek", seconds: 25 },
            { who: "partner", de: "Let me look. Yes, that day is possible. Now I ask you: can you help me with the boxes tomorrow?", tr: "Bir bakayım. Evet, o gün olur. Şimdi ben soruyorum: Yarın kutularda bana yardım edebilir misin?" },
            { who: "you", hint: "Ricaya karşılık ver: kabul et ya da kısa bir gerekçeyle reddet.", expect: "bir ricaya kabul ya da gerekçeli ret ile karşılık vermek", seconds: 25 },
          ],
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "apologise and give a reason", tr: "Özür dilemek ve sebep söylemek" },
              { de: "ask for something politely", tr: "Kibarca bir şey istemek" },
              { de: "answer a request", tr: "Gelen ricaya karşılık vermek" },
            ],
            sample:
              "I am sorry, I am late. The bus did not come. — Can I have Friday off, please? I go to the doctor. — Yes, of course I can help you. What time?",
            criteria: [
              "Özür kalıbı kullanıldı mı? (I am sorry …)",
              "Sebep kısa ve anlaşılır mı?",
              "İzin isteği kibar bir kalıpla mı kuruldu? (Can I … please)",
              "Gelen ricaya net bir cevap verildi mi?",
            ],
          },
        },
      ],
    },
  ],
};
