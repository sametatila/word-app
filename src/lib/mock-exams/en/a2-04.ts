import type { MockPaper } from "../types";

/**
 * A2 · Deneme 4 — "Study, Work and the Internet".
 *
 * A2'nin öteki üç denemesiyle AYNI PLAN; konu ayrı. Sağlık, yolculuk ve ev
 * işlendikten sonra kalan büyük A2 alanı iş ve öğrenim: kurs kaydı, iş yeri
 * yazışması, çevrim içi araçlar. Bu alan sayı ve tarih taşıdığı için dinleme
 * not görevine de doğal malzeme veriyor.
 *
 * A2 SINIRI: past simple, present continuous, `going to` / `will`,
 * karşılaştırma dereceleri, `because / when / if / but / so`. Üçüncü tip
 * koşul, ortaç öbeği ve devrik yapı yok.
 */
export const EN_A2_04: MockPaper = {
  id: "en-a2-04",
  course: "en",
  level: "A2",
  no: 4,
  theme: "Study, Work and the Internet",
  themeTr: "Öğrenim, iş ve internet",
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
          id: "en-a2-04-l1",
          no: 1,
          format: "mcq",
          goal: "gist",
          prompt: "Read the five short texts and questions 1 to 5. What is the main message? Choose a, b or c.",
          promptTr: "Beş kısa metni ve 1–5. maddeleri oku. Ana mesaj nedir? a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "m1",
              genre: "Message to a team",
              genreTr: "Ekibe ileti",
              title: "Thursday",
              body: `Hi team, the training on Thursday moves from the big room to the room next to the kitchen. Bring your own laptop; there are only four in the office. Coffee at nine, we start at half past.`,
            },
            {
              kind: "text",
              id: "m2",
              genre: "Notice in a college",
              genreTr: "Okul duyurusu",
              title: "Library",
              body: `The computer room on the first floor is closed this week. The machines are getting a new system. You can use the twelve computers in the reading room, but printing is not possible there.`,
            },
            {
              kind: "text",
              id: "m3",
              genre: "Email",
              genreTr: "E-posta",
              title: "Your online course",
              body: `Dear Teodor, thank you for your interest. The course begins on 3 October and runs for eight weeks. The videos stay online for a year, so you can watch a lesson again later. Please pay before the first lesson.`,
            },
            {
              kind: "text",
              id: "m4",
              genre: "Note for a colleague",
              genreTr: "İş arkadaşına not",
              title: "The printer",
              body: `Halide, the printer in our room does not work with the new laptops. Use the one in the corridor until Friday. The password is the same. Please do not call the office again: they know.`,
            },
            {
              kind: "text",
              id: "m5",
              genre: "Message to a study group",
              genreTr: "Çalışma grubuna ileti",
              title: "Group work",
              body: `I finished the group work last night. I put the file in our shared folder, not in the chat, because the chat deletes big files after a week. Please read it before Monday and write your notes in the same file.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-04-l1-1",
              no: 1,
              ref: "m1",
              text: "What must the team members bring?",
              options: ["Coffee for the morning", "Four laptops from the office", "Their own computer"],
              answer: 2,
              explain:
                "İleti tek bir şey istiyor: «Bring your own laptop». Ofisteki dört bilgisayar getirilecek değil, zaten orada olan ve yetmeyen şey; kahve saat dokuzda veriliyor, getirilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-04-l1-2",
              no: 2,
              ref: "m2",
              text: "What can students do this week?",
              options: ["Print in the reading room", "Use twelve computers in the reading room", "Work in the computer room on the first floor"],
              answer: 1,
              explain:
                "Duyuru açık: «You can use the twelve computers in the reading room». Aynı cümle yazdırmayı dışarıda bırakıyor («printing is not possible there»); birinci kattaki bilgisayar odası ise bu hafta kapalı.",
            },
            {
              kind: "mcq",
              id: "en-a2-04-l1-3",
              no: 3,
              ref: "m3",
              text: "What does the email say about the videos?",
              options: ["They are available for a long time", "They are only online for eight weeks", "They must be paid for separately"],
              answer: 0,
              explain:
                "E-posta «The videos stay online for a year» diyor: bir yıl açık kalıyor. Sekiz hafta kursun süresi, videoların değil; ödeme de kursun tamamı için isteniyor, videolar için ayrıca değil.",
            },
            {
              kind: "mcq",
              id: "en-a2-04-l1-4",
              no: 4,
              ref: "m4",
              text: "What does the note ask Halide to do?",
              options: ["Change the password of the printer", "Call the office about the problem", "Use a different printer this week"],
              answer: 2,
              explain:
                "Not tek bir iş veriyor: «Use the one in the corridor until Friday». Şifre değişmiyor («The password is the same») ve ofisi aramak açıkça yasaklanıyor («do not call the office again»).",
            },
            {
              kind: "mcq",
              id: "en-a2-04-l1-5",
              no: 5,
              ref: "m5",
              text: "Why did the writer not use the chat?",
              options: ["Because the group reads it on Monday", "Because big files disappear there", "Because the file was not finished"],
              answer: 1,
              explain:
                "Sebep cümlenin içinde: «because the chat deletes big files after a week». Pazartesi okuma günü, sohbetle ilgisi yok; dosya da bitmiş durumda («I finished the group work last night»).",
            },
          ],
        },
        {
          id: "en-a2-04-l2",
          no: 2,
          format: "match",
          goal: "orientation",
          prompt:
            "Read about five people, 6 to 10. Then read the eight adverts a to h. Which advert is right for each person? You use each advert once only.",
          promptTr:
            "6–10. maddelerdeki beş kişiyi oku. Sonra a'dan h'ye sekiz ilanı oku. Her kişiye hangi ilan uyar? Her ilan en fazla bir kez kullanılır.",
          options: [
            { key: "a", label: "Evening Language Class", body: "Tuesdays and Thursdays, half past six to eight. Small groups of six. You need a level test before the first lesson. 90 pounds for ten weeks." },
            { key: "b", label: "Free Coding Hour", body: "Every Saturday from ten to twelve in the city library. Bring a laptop or use one of ours. No teacher, but three helpers walk around the room." },
            { key: "c", label: "Job Letters", body: "We read your letter and tell you what to change. Send it by email and you get an answer in two working days. 15 pounds." },
            { key: "d", label: "Weekend Photo Walk", body: "Three hours in the old town with a photographer. Any camera, also a phone. Saturday and Sunday, 25 pounds." },
            { key: "e", label: "Quick Typing", body: "Learn to type without looking. Six short videos, do them when you want. You keep them for one year. 12 pounds." },
            { key: "f", label: "Study Room Booking", body: "Book a small room for two to four people. Free for students, one hour a day. Book on the website, not at the desk." },
            { key: "g", label: "Repair Your Phone", body: "Screens and batteries in one hour. Bring the phone before four in the afternoon. Prices from 35 pounds." },
            { key: "h", label: "Business English on the Phone", body: "Twenty minutes with a teacher, three times a week, always at the same time. For people who travel a lot." },
          ],
          items: [
            {
              kind: "match",
              id: "en-a2-04-l2-6",
              no: 6,
              text: "Lukas works in three different cities every week and can only study in short blocks.",
              answer: "h",
              explain:
                "İlan hem kısa hem gezginler için kurulmuş: «Twenty minutes with a teacher, three times a week» ve «For people who travel a lot». Akşam kursu (a) tek bir yerde ve haftada iki sabit gün istiyor.",
            },
            {
              kind: "match",
              id: "en-a2-04-l2-7",
              no: 7,
              text: "Milos wants a stranger to look at his application before he sends it.",
              answer: "c",
              explain:
                "İlan tam bu hizmeti veriyor: «We read your letter and tell you what to change», iki iş günü içinde. Öteki ilanlarda başvuru metnine bakan kimse yok.",
            },
            {
              kind: "match",
              id: "en-a2-04-l2-8",
              no: 8,
              text: "Teodor is a student and needs a quiet place for group work with two friends.",
              answer: "f",
              explain:
                "İlan grup büyüklüğünü ve fiyatı veriyor: «a small room for two to four people», öğrencilere ücretsiz. Üç kişi bu aralığa giriyor; kütüphanedeki kodlama saati (b) sessiz bir oda değil, ortak bir salon.",
            },
            {
              kind: "match",
              id: "en-a2-04-l2-9",
              no: 9,
              text: "Ferda has a full week at work and wants to learn something new without a fixed time.",
              answer: "e",
              explain:
                "İlan zamanı kullanıcıya bırakıyor: «Six short videos, do them when you want». Kodlama saati de ücretsiz ama cumartesi ona ikiye sabit; Ferda'nın istediği tam olarak sabit saatin olmaması.",
            },
            {
              kind: "match",
              id: "en-a2-04-l2-10",
              no: 10,
              text: "Halide would like to meet other people at the weekend and learn something with a computer.",
              answer: "b",
              explain:
                "İlan üç ölçütü birden karşılıyor: hafta sonu («Every Saturday»), bilgisayar («Bring a laptop») ve insan («three helpers walk around the room»). Fotoğraf yürüyüşü (d) de hafta sonu ve toplu ama bilgisayarla değil.",
            },
          ],
        },
        {
          id: "en-a2-04-l3",
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
              title: "Back to school at forty",
              body: `Last September I started an evening course after twenty years without a classroom. I was the oldest person in the room and I was sure that everybody would see it.

The first weeks were hard, but not for the reason I expected. The grammar was fine. The problem was the speed: the young students wrote everything on a laptop, and I still write on paper.

Then our teacher gave us a task in pairs. My partner was nineteen and she typed three times faster than me. But she asked me about the words she did not know, and I asked her about the machine. After that hour we worked together every week.

Now the course is finished. My English is better, but I learned something else too: in a class of twenty, nobody has time to look at your age.`,
              gloss: [
                { de: "a classroom", tr: "derslik", en: "classroom" },
                { de: "to type", tr: "klavyeyle yazmak", en: "type" },
                { de: "a pair", tr: "ikili", en: "pair" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-04-l3-11",
              no: 11,
              text: "What did the writer think before the course?",
              options: ["That everybody would notice her age", "That the grammar would be too difficult", "That the young students would help her"],
              answer: 0,
              explain:
                "İlk paragraf bunu söylüyor: «I was the oldest person in the room and I was sure that everybody would see it». Dilbilgisi tam tersine sorun çıkarmıyor («The grammar was fine»); genç öğrencilerin yardımı ise ancak ikili çalışmada, sonradan ortaya çıkıyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-04-l3-12",
              no: 12,
              text: "What was difficult at the beginning?",
              options: ["The grammar in the first lessons", "The questions from the teacher", "Working as fast as the others"],
              answer: 2,
              explain:
                "Metin zorluğu adlandırıyor: «The problem was the speed». Gençler dizüstünde yazıyor, yazan hâlâ kâğıtla. Dilbilgisi açıkça sorun değil; öğretmenin soruları yazıda hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-04-l3-13",
              no: 13,
              text: "What happened in the pair work?",
              options: ["The writer taught the whole class", "The two students helped each other", "The partner finished the task alone"],
              answer: 1,
              explain:
                "Alışveriş karşılıklı: «she asked me about the words she did not know, and I asked her about the machine». Sınıfın tamamına ders verilmiyor; eş de görevi tek başına bitirmiyor, birlikte çalışıyorlar.",
            },
            {
              kind: "mcq",
              id: "en-a2-04-l3-14",
              no: 14,
              text: "What did the writer learn about age?",
              options: ["Nobody in the class thinks about it", "It is easier to learn young", "Older students write better English than the others"],
              answer: 0,
              explain:
                "Son cümle: «in a class of twenty, nobody has time to look at your age». Yazı gençken öğrenmenin daha kolay olduğunu hiç söylemiyor; yaşlı öğrencilerin daha iyi yazdığı da metinde yok.",
            },
          ],
        },
        {
          id: "en-a2-04-l4",
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
              title: "Your first week in a new job",
              body: `A new job is a lot of information in five days, so here are four ideas.

Write down every name. In the first week you {{15}} twenty people and you forget nineteen of them.

Ask your questions early. A question on Monday is much {{16}} than the same question in the third month.

If you do not understand a word in a meeting, write it in your book and ask {{17}} the meeting.

Next Monday I start in a new office myself, and I {{18}} follow my own advice.

And do not eat alone. Lunch {{19}} the others is the fastest way into a team.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-04-l4-15",
              no: 15,
              text: "Gap 15",
              options: ["met", "meet", "meeting"],
              answer: 1,
              explain:
                "Cümlenin ikinci yarısı geniş zamanda («you forget nineteen of them»), bu yüzden ilk fiil de geniş zaman olmalı: `meet`. `met` geçmiş zamandır ve iki yarıyı çelişkiye sokar; `meeting` yalın yüklem olamaz.",
            },
            {
              kind: "mcq",
              id: "en-a2-04-l4-16",
              no: 16,
              text: "Gap 16",
              options: ["easier", "easy", "the easiest"],
              answer: 0,
              explain:
                "Boşluktan önce `much`, sonra `than` var: ikisi de karşılaştırma derecesi ister. `easy` yalın biçimdir ve `than` almaz; `the easiest` en üstünlük derecesidir.",
            },
            {
              kind: "mcq",
              id: "en-a2-04-l4-17",
              no: 17,
              text: "Gap 17",
              options: ["during", "before", "after"],
              answer: 2,
              explain:
                "Öğüt sırayı kuruyor: toplantıda anlaşılmayan sözcük deftere yazılır, soru sonra sorulur. `after` bunu verir. `during` yazma önerisini gereksiz kılar, `before` ise toplantıda henüz duyulmamış bir sözcüğü sormayı ister.",
            },
            {
              kind: "mcq",
              id: "en-a2-04-l4-18",
              no: 18,
              text: "Gap 18",
              options: ["was", "would", "will"],
              answer: 2,
              explain:
                "Cümlenin zamanı `Next Monday`, yani gelecek: `will follow`. `was` geçmiş zamandır, `would` ise gerçekleşmemiş bir durumu anlatır ve yazarın kesin planıyla çelişir.",
            },
            {
              kind: "mcq",
              id: "en-a2-04-l4-19",
              no: 19,
              text: "Gap 19",
              options: ["with", "for", "from"],
              answer: 0,
              explain:
                "Birlikte yemek yemenin edatı `with`: «Lunch with the others». `for` yemeğin kimin için olduğunu, `from` ise nereden geldiğini bildirir; cümle ise ötekilerle birlikte olmayı öğütlüyor.",
            },
          ],
        },
        {
          id: "en-a2-04-l5",
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
              title: "Evening course — winter group",
              body: `I did this evening course last winter and I am very happy {{20}} it.

The teacher explained everything twice, and she answered all {{21}} questions.

The room is on the fourth floor and there is no lift, {{22}} the stairs are not a problem for me.

The course was cheaper {{23}} the one in the city centre, and the group was smaller.

I will do the second part {{24}} the spring.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a2-04-l5-20",
              no: 20,
              text: "Gap 20",
              accept: ["with"],
              explain:
                "`happy with something` bir şeyden memnun olmayı anlatan sabit eşdizim. `happy for` başkası adına sevinmektir, `happy about` ise olaylar için kullanılır; burada değerlendirilen şey kursun kendisi.",
            },
            {
              kind: "gap",
              id: "en-a2-04-l5-21",
              no: 21,
              text: "Gap 21",
              accept: ["our", "my"],
              explain:
                "Boşluk adın önünde: «she answered all ___ questions». Oraya iyelik sıfatı gelir. Yazan kişi tek başına da («my») grubun adına da («our») konuşabildiği için ikisi de kabul edilir; `us` ve `me` nesne biçimidir ve adın önüne gelemez.",
            },
            {
              kind: "gap",
              id: "en-a2-04-l5-22",
              no: 22,
              text: "Gap 22",
              accept: ["but"],
              explain:
                "İki yarı çelişiyor: asansör yok, ama merdiven sorun değil. Karşıtlığı `but` verir. `so` sonuç bildirir ve burada sonuç yok; `because` ise sebep kurar ve cümleyi tersine çevirir.",
            },
            {
              kind: "gap",
              id: "en-a2-04-l5-23",
              no: 23,
              text: "Gap 23",
              accept: ["than"],
              explain:
                "Cümlede `cheaper` var, yani karşılaştırma başlamış; ikinci öğe `than` ile bağlanır. `as` yalnız `as … as` yapısında gelir ve orada `cheaper` kullanılmaz.",
            },
            {
              kind: "gap",
              id: "en-a2-04-l5-24",
              no: 24,
              text: "Gap 24",
              accept: ["in"],
              explain:
                "Mevsim adları `in` ile kullanılır: `in the spring`. `at` saat ve belirli anlar için, `on` ise gün ve tarihler için gelir.",
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
          id: "en-a2-04-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "You hear five short conversations, questions 1 to 5. Choose a, b or c. You hear every recording twice.",
          promptTr: "Beş kısa konuşma dinleyeceksin, 1–5. maddeler. a, b ya da c'yi seç. Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "At work",
              genreTr: "İş yerinde",
              situation: "İki iş arkadaşı öğleden sonraki toplantıyı konuşuyor.",
              plays: 2,
              segments: [
                { text: "Is the meeting at two still on?" },
                { text: "Yes, but not in the office. Ferda booked the small room in the library because our room has no screen today." },
                { text: "Then I take the bus at half past one." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Phone call",
              genreTr: "Telefon görüşmesi",
              situation: "Bir öğrenci okul ofisini arıyor.",
              plays: 2,
              segments: [
                { text: "Hello, I would like to change from the morning group to the evening group." },
                { text: "That is possible, but the evening group is full until January. I can put you on the list." },
                { text: "All right. And do I pay again?" },
                { text: "No, you pay nothing more; you keep the same place." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Between students",
              genreTr: "Öğrenciler arasında",
              situation: "İki öğrenci gönderilen bir dosyadan söz ediyor.",
              plays: 2,
              segments: [
                { text: "Did you get my file?" },
                { text: "No, nothing came." },
                { text: "Strange. I sent it to your old address, the one from last year." },
                { text: "Ah, that one is closed. Send it again to the new one and I read it tonight." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "At work",
              genreTr: "İş yerinde",
              situation: "İki çalışan çevrim içi eğitimi konuşuyor.",
              plays: 2,
              segments: [
                { text: "The online training must be finished before the end of the month." },
                { text: "I know, but it is six hours." },
                { text: "Do it in parts. The system remembers where you stopped, so you can do half an hour a day." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Announcement",
              genreTr: "Anons",
              situation: "Okulda öğrencilere anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "Good morning. The exam results are not on the website today. The office had a problem with the system and the results come tomorrow at twelve. Please do not phone the office: nobody there has the results yet." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-04-h1-1",
              no: 1,
              ref: "a1",
              text: "Why is the meeting in another place?",
              options: ["Because Ferda works in the library every day", "Because the office room has no screen", "Because the bus is late at two"],
              answer: 1,
              explain:
                "Sebep kaydın içinde: «our room has no screen today». Ferda odayı ayırtan kişi, kütüphanede çalışan kişi değil; otobüs de yalnız ikinci konuşmacının kendi yol planı.",
            },
            {
              kind: "mcq",
              id: "en-a2-04-h1-2",
              no: 2,
              ref: "a2",
              text: "What does the caller learn?",
              options: ["She must pay again for the new group", "The morning group is full", "She must wait for a free place"],
              answer: 2,
              explain:
                "Akşam grubu «full until January» ve ofis «I can put you on the list» diyor: sıra beklenecek. Ödeme açıkça çürütülüyor («you pay nothing more»); dolu olan sabah grubu değil, akşam grubu.",
            },
            {
              kind: "mcq",
              id: "en-a2-04-h1-3",
              no: 3,
              ref: "a3",
              text: "What was the problem?",
              options: ["The file went to the wrong address", "The file was too big for the email", "The student did not read it"],
              answer: 0,
              explain:
                "Gönderen «I sent it to your old address» diyor ve öteki «that one is closed» diye ekliyor. Dosyanın büyüklüğü hiç geçmiyor; okumama sorunun sonucu değil, dosya hiç ulaşmadı.",
            },
            {
              kind: "mcq",
              id: "en-a2-04-h1-4",
              no: 4,
              ref: "a4",
              text: "What does the second speaker suggest?",
              options: ["Finishing the training in one day", "Doing a little every day", "Asking for more time"],
              answer: 1,
              explain:
                "Öneri kaydın sonunda: «you can do half an hour a day», çünkü sistem kalınan yeri hatırlıyor. Altı saati tek günde bitirmek tam olarak kaçınılan şey; ek süre istemek hiç konuşulmuyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-04-h1-5",
              no: 5,
              ref: "a5",
              text: "What should students do?",
              options: ["Look at the website today", "Phone the office at twelve", "Wait until tomorrow"],
              answer: 2,
              explain:
                "Anons iki şeyi çürütüyor: sonuçlar bugün sitede yok ve «do not phone the office». Geriye tek seçenek kalıyor: «the results come tomorrow at twelve».",
            },
          ],
        },
        {
          id: "en-a2-04-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear information about a summer course. Complete the notes, questions 6 to 10. Write ONE or TWO words or a number in each gap. You hear the information twice.",
          promptTr:
            "Bir yaz kursu hakkında bilgi dinleyeceksin. 6–10. maddelerdeki notları tamamla. Her boşluğa BİR ya da İKİ sözcük veya bir sayı yaz. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Information",
              genreTr: "Bilgilendirme",
              situation: "Bir görevli yaz kursunu tanıtıyor.",
              plays: 2,
              segments: [
                {
                  text: "Hello and welcome to the information hour. The summer course starts on the fifth of July and it runs for three weeks. Lessons are every morning from nine to twelve, and on Wednesday afternoon there is a free trip. The price is four hundred pounds, and books are not included: you buy them in the first week, about thirty pounds. You need a level test before you begin, and you can do it online at home. And please write to the office if you cannot come on the first day.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notes",
              genreTr: "Not kâğıdı",
              title: "Summer course — notes",
              body: `Course starts on:        {{6}} July
Course runs for:         {{7}} weeks
Lessons every morning:   nine to {{8}}
Price without books:     {{9}} pounds
Do the level test:       {{10}}`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a2-04-h2-6",
              no: 6,
              ref: "b1",
              text: "Gap 6",
              accept: ["5", "fifth", "5th"],
              explain:
                "Kayıt «starts on the fifth of July» diyor. Not kâğıdında `July` basılı olduğu için boşluğa yalnız gün yazılır; rakam da yazı da kabul edilir.",
            },
            {
              kind: "gap",
              id: "en-a2-04-h2-7",
              no: 7,
              ref: "b1",
              text: "Gap 7",
              accept: ["3", "three"],
              explain:
                "«it runs for three weeks» — kurs üç hafta. Kayıttaki öteki sayılar tarih, saat ve fiyat; süreyi veren yalnız bu cümle.",
            },
            {
              kind: "gap",
              id: "en-a2-04-h2-8",
              no: 8,
              ref: "b1",
              text: "Gap 8",
              accept: ["12", "twelve"],
              explain:
                "Dersler «every morning from nine to twelve». Not kâğıdında `nine to` basılı, bu yüzden boşluğa yalnız bitiş saati yazılır.",
            },
            {
              kind: "gap",
              id: "en-a2-04-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["400", "four hundred"],
              explain:
                "Kurs ücreti «four hundred pounds» ve kitaplar dahil değil. Otuz pound kitapların ayrı bedeli; not kâğıdı kitapsız fiyatı istiyor.",
            },
            {
              kind: "gap",
              id: "en-a2-04-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["online", "at home"],
              explain:
                "Seviye sınavı için «you can do it online at home» deniyor. Bir ya da iki sözcük istendiği için `online` da `at home` da kabul edilir.",
            },
          ],
        },
        {
          id: "en-a2-04-h3",
          no: 3,
          format: "mcq",
          goal: "gist",
          prompt: "You hear five short speakers, questions 11 to 15. What is each person doing? You hear every recording twice.",
          promptTr: "Beş kısa konuşmacı dinleyeceksin, 11–15. maddeler. Her kişi ne yapıyor? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Voicemail",
              genreTr: "Telesekreter iletisi",
              situation: "Bir kişi iş başvurusu için ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "I sent the application three weeks ago and I heard nothing. I am not angry, but I would like to know: is my letter still on somebody's desk, or is it in the bin?" },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "In a room",
              genreTr: "Bir salonda",
              situation: "Bir görevli salondaki gruba sesleniyor.",
              plays: 2,
              segments: [
                { text: "Right, everybody: phones in the box at the front, water on the table, nothing else. You have ninety minutes. If you finish early, stay in your seat and read." },
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
                { text: "I always thought that working at home was a dream. Then I did it for a year. I saved two hours a day, but I spoke to nobody, and by March I took a desk in a shared office." },
              ],
            },
            {
              kind: "audio",
              id: "c4",
              genre: "Phone call",
              genreTr: "Telefon görüşmesi",
              situation: "Bir kişi kurs sağlayıcısını arıyor.",
              plays: 2,
              segments: [
                { text: "Hello, this is about the online course. I paid on Monday but the videos do not open. It says my password is wrong and the new password does not arrive by email. Can you look at my account?" },
              ],
            },
            {
              kind: "audio",
              id: "c5",
              genre: "At work",
              genreTr: "İş yerinde",
              situation: "Bir stajyer son gününde konuşuyor.",
              plays: 2,
              segments: [
                { text: "Thank you for the two weeks in your team. I learned more about real work in fourteen days than in two years of reading. I hope you take another student next summer." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-04-h3-11",
              no: 11,
              ref: "c1",
              text: "What is the speaker doing?",
              options: ["Asking about her application", "Complaining about a lost letter", "Sending a new application"],
              answer: 0,
              explain:
                "İleti bir soru soruyor: «is my letter still on somebody's desk, or is it in the bin?». Konuşmacı kızgın olmadığını açıkça söylüyor, yani şikâyet değil; yeni bir başvuru da göndermiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-04-h3-12",
              no: 12,
              ref: "c2",
              text: "What is the speaker doing?",
              options: ["Starting a lesson", "Explaining the rules of an exam", "Asking for quiet in the reading room"],
              answer: 1,
              explain:
                "Konuşma kural sayıyor: telefonlar kutuya, masada yalnız su, «You have ninety minutes» ve erken bitirenler yerinde kalıyor. Bunlar bir dersin değil, bir sınavın kuralları.",
            },
            {
              kind: "mcq",
              id: "en-a2-04-h3-13",
              no: 13,
              ref: "c3",
              text: "What is the speaker doing?",
              options: ["Advertising a shared office in the city", "Asking for a job at home", "Explaining why she changed her mind"],
              answer: 2,
              explain:
                "Konuşmacı önce inancını, sonra deneyimini veriyor: «I always thought that working at home was a dream», ama bir yıl sonra ortak ofiste masa tutuyor. Reklam ya da iş isteği yok.",
            },
            {
              kind: "mcq",
              id: "en-a2-04-h3-14",
              no: 14,
              ref: "c4",
              text: "Why is the person calling?",
              options: ["To pay for the course", "To report a technical problem", "To ask for her money back after the problem"],
              answer: 1,
              explain:
                "Arayan bir arıza bildiriyor: «the videos do not open» ve yeni şifre e-postayla gelmiyor. Ödeme pazartesi yapılmış, yani sebep o değil; para iadesi hiç istenmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-04-h3-15",
              no: 15,
              ref: "c5",
              text: "What is the speaker doing?",
              options: ["Thanking a workplace", "Asking for a job", "Explaining a mistake in the report"],
              answer: 0,
              explain:
                "İlk cümle teşekkür: «Thank you for the two weeks in your team». Son cümle gelecek yıl için başka bir öğrenci diliyor, kendine iş istemiyor; hata konusu hiç geçmiyor.",
            },
          ],
        },
        {
          id: "en-a2-04-h4",
          no: 4,
          format: "match",
          goal: "detail",
          prompt:
            "You hear five people, questions 16 to 20. What helped each person most? Choose from a to h. You use each answer once only. You hear the recordings twice.",
          promptTr:
            "Beş kişi dinleyeceksin, 16–20. maddeler. Her kişiye en çok ne yardım etti? a'dan h'ye seç. Her seçenek en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "A person who explained things again." },
            { key: "b", label: "A book that was easy to read." },
            { key: "c", label: "A change in the daily plan." },
            { key: "d", label: "A short test at the beginning." },
            { key: "e", label: "A group that worked together." },
            { key: "f", label: "A quiet place to work." },
            { key: "g", label: "A machine that made the work faster." },
            { key: "h", label: "A job that paid for the course." },
          ],
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Speaker 1",
              genreTr: "Birinci konuşmacı",
              situation: "Birinci konuşmacı iş yerindeki bir günü anlatıyor.",
              plays: 2,
              segments: [
                { text: "I read the same page four times and understood nothing. Then a woman in my office sat down with me for twenty minutes and said the same thing in other words. After that it was easy." },
              ],
            },
            {
              kind: "audio",
              id: "d2",
              genre: "Speaker 2",
              genreTr: "İkinci konuşmacı",
              situation: "İkinci konuşmacı çalışma saatinden söz ediyor.",
              plays: 2,
              segments: [
                { text: "I moved my study hour from the evening to six in the morning. The same forty minutes, but before work my head is empty and everything stays." },
              ],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü konuşmacı haftalık buluşmalardan söz ediyor.",
              plays: 2,
              segments: [
                { text: "We were five people and we met every Tuesday. Nobody wanted to come without homework, so everybody did it. Alone I think I would stop in November." },
              ],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Speaker 4",
              genreTr: "Dördüncü konuşmacı",
              situation: "Dördüncü konuşmacı kursun ilk haftasını anlatıyor.",
              plays: 2,
              segments: [
                { text: "The school gave us a test in the first week. I was in the wrong group for two days, then they moved me one level up and everything made sense." },
              ],
            },
            {
              kind: "audio",
              id: "d5",
              genre: "Speaker 5",
              genreTr: "Beşinci konuşmacı",
              situation: "Beşinci konuşmacı kursun parasından söz ediyor.",
              plays: 2,
              segments: [
                { text: "I worked in a shop at the weekend and the money went straight to the course. It was two hard years, but nobody paid it for me." },
              ],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-a2-04-h4-16",
              no: 16,
              ref: "d1",
              text: "Speaker 1",
              answer: "a",
              explain:
                "Sayfayı dört kez okumak işe yaramıyor; işe yarayan şey bir kişi: «said the same thing in other words». Kitap ya da makine değil, açıklayan biri.",
            },
            {
              kind: "match",
              id: "en-a2-04-h4-17",
              no: 17,
              ref: "d2",
              text: "Speaker 2",
              answer: "c",
              explain:
                "Süre değişmiyor, saat değişiyor: «the same forty minutes», ama akşamdan sabah altıya taşınmış. Yardım eden şey günlük planın kendisi.",
            },
            {
              kind: "match",
              id: "en-a2-04-h4-18",
              no: 18,
              ref: "d3",
              text: "Speaker 3",
              answer: "e",
              explain:
                "Beş kişi her salı buluşuyor ve «Nobody wanted to come without homework, so everybody did it». Tek başına kasımda bırakacağını söylüyor; devam ettiren şey grup.",
            },
            {
              kind: "match",
              id: "en-a2-04-h4-19",
              no: 19,
              ref: "d4",
              text: "Speaker 4",
              answer: "d",
              explain:
                "İlk haftada yapılan sınav yanlış grubu iki günde ortaya çıkarıyor: «they moved me one level up and everything made sense». Grup burada sonuç, yardım eden şey sınavın kendisi.",
            },
            {
              kind: "match",
              id: "en-a2-04-h4-20",
              no: 20,
              ref: "d5",
              text: "Speaker 5",
              answer: "h",
              explain:
                "Hafta sonu işi doğrudan kursu ödüyor: «the money went straight to the course» ve «nobody paid it for me». Çalışma yöntemi ya da yer hiç anılmıyor.",
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
          id: "en-a2-04-w1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "You saw an advert for an evening course and you want to know more. Write an email to the school. Write about 50 words. Answer all three points.",
          promptTr:
            "Bir akşam kursu ilanı gördün ve daha fazlasını öğrenmek istiyorsun. Okula bir e-posta yaz. Yaklaşık 50 kelime. Üç maddenin hepsine cevap ver.",
          items: [],
          rubric: {
            minWords: 50,
            points: [
              { de: "Say why you want the course.", tr: "Kursu neden istediğini söyle." },
              { de: "Ask about the days and the times.", tr: "Gün ve saatleri sor." },
              { de: "Ask what you must bring to the first lesson.", tr: "İlk derse ne getirmen gerektiğini sor." },
            ],
            sample: `Dear Sir or Madam,

I saw your advert for the evening course. I work with visitors from other countries, so I need better English for my job.

Could you tell me which days the lessons are, and at what time they start?

And what must I bring to the first lesson?

Thank you very much.
Milos`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi? Biri eksikse metin tam sayılmaz.",
              "Gerekçe somut mu? (iş, yolculuk, sınav)",
              "Sorular soru biçiminde mi kuruldu? (Could you tell me … / What must I …)",
              "Yaklaşık 50 kelime yazıldı mı?",
              "Resmî hitap ve kapanış var mı? Bilinmeyen bir kuruma yazılıyor.",
            ],
          },
        },
        {
          id: "en-a2-04-w2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Write a short text about something you learned outside school. Say what it was, who or what helped you and why it was useful. Write about 60 words.",
          promptTr:
            "Okul dışında öğrendiğin bir şeyi anlat. Ne olduğunu, sana kimin ya da neyin yardım ettiğini ve neden işe yaradığını yaz. Yaklaşık 60 kelime.",
          items: [],
          rubric: {
            minWords: 60,
            points: [
              { de: "Say what you learned.", tr: "Ne öğrendiğini söyle." },
              { de: "Say who or what helped you.", tr: "Sana kimin ya da neyin yardım ettiğini söyle." },
              { de: "Say why it was useful.", tr: "Neden işe yaradığını söyle." },
            ],
            sample: `Two years ago I learned to repair bikes. My uncle had an old shop in our street and I went there every Saturday. First I only watched him, then he gave me the small jobs. Now I repair my own bike and the bikes of my friends. I save money, and I am never late for work because of a flat tyre.`,
            criteria: [
              "Üç içerik noktasının üçü de var mı?",
              "Geçmiş zaman doğru kullanıldı mı? Düzensiz fiiller (had, went, gave) doğru mu?",
              "Şimdiki durum ile geçmiş ayrıldı mı? (Now … / Two years ago …)",
              "Yaklaşık 60 kelime yazıldı mı?",
              "Yarar somut bir örnekle mi verildi, yoksa yalnız «it was useful» mu denildi?",
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
          id: "en-a2-04-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about work and learning. Answer in full sentences.",
          promptTr: "Sana iş ve öğrenme hakkında sorular soracağım. Tam cümlelerle cevap ver.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good afternoon. What do you do: do you work or do you study?", tr: "İyi günler. Ne yapıyorsun: çalışıyor musun okuyor musun?" },
            { who: "you", hint: "İşini ya da bölümünü ve bir gününü kısaca anlat.", expect: "işini ya da öğrenimini tam bir cümleyle anlatmak", seconds: 30 },
            { who: "partner", de: "Thank you. Do you learn better in the morning or in the evening? Why?", tr: "Teşekkürler. Sabah mı akşam mı daha iyi öğrenirsin? Neden?" },
            { who: "you", hint: "Tercihini söyle ve bir gerekçe ver.", expect: "bir tercihi gerekçesiyle bildirmek", seconds: 30 },
            { who: "partner", de: "Interesting. Tell me about a course or a training you did.", tr: "İlginç. Katıldığın bir kursu ya da eğitimi anlat." },
            { who: "you", hint: "Geçmiş zamanla kısa bir kurs deneyimi anlat.", expect: "geçmiş zamanda kısa bir anlatı vermek", seconds: 35 },
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
              "I work in a small office and I start at eight. I learn better in the morning because in the evening I am tired after work. Last year I did a computer course for six weeks. It was on Wednesday evenings and the teacher was very patient.",
            criteria: [
              "Cevaplar tek sözcük değil, tam cümle mi?",
              "Tercih bir gerekçeyle mi verildi? (because …)",
              "Son soruda geçmiş zaman doğru kuruldu mu?",
              "Süre ve gün gibi bilgiler söylenebiliyor mu?",
            ],
          },
        },
        {
          id: "en-a2-04-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Describe this situation for about one minute: a small office on a Monday morning. Three people are working at their desks and one of them is on the phone. A young woman is standing at the door with a box of papers. Say what you see, what the people are doing, and whether you would like to work there.",
          promptTr:
            "Şu durumu bir dakika kadar anlat: pazartesi sabahı küçük bir ofis. Üç kişi masalarında çalışıyor ve biri telefonda. Genç bir kadın kapıda elinde kâğıt dolu bir kutuyla duruyor. Ne gördüğünü, insanların ne yaptığını ve orada çalışmak isteyip istemeyeceğini söyle.",
          prepSeconds: 45,
          speakSeconds: 75,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "say what you see", tr: "Ne gördüğünü söyle" },
              { de: "say what the people are doing", tr: "İnsanların ne yaptığını söyle" },
              { de: "say if you would like to work there", tr: "Orada çalışmak isteyip istemeyeceğini söyle" },
            ],
            sample:
              "This is a small office on a Monday morning. Three people are sitting at their desks and they are looking at their computers. The man on the left is speaking on the phone and he is writing at the same time. At the door a young woman is standing with a big box of papers. I would like to work there because the room is quiet and the people look friendly.",
            criteria: [
              "Şimdiki zaman (present continuous) kullanıldı mı? Bu görevin ana yapısı bu.",
              "Üç içerik noktasının üçü de işlendi mi?",
              "Yer bildiren ifadeler var mı? (at the door, on the left, next to)",
              "Görüş bir gerekçeyle mi verildi?",
            ],
          },
        },
        {
          id: "en-a2-04-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Your team can do one training day this year. Talk with me about the ideas and choose one together.",
          promptTr:
            "Ekibin bu yıl bir eğitim günü yapabilir. Fikirleri benimle konuş ve birlikte birini seç.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "Here are three ideas: a day about the new computer system, a day about speaking with customers, or a first aid day. What do you think about the computer system?", tr: "Üç fikir var: yeni bilgisayar sistemi günü, müşterilerle konuşma günü ya da ilk yardım günü. Bilgisayar sistemi hakkında ne düşünüyorsun?" },
            { who: "you", hint: "Bilgisayar sistemi hakkında görüşünü söyle ve bir gerekçe ver.", expect: "bir fikir hakkında görüş bildirmek ve gerekçelendirmek", seconds: 35 },
            { who: "partner", de: "I see your point. But everybody already uses the system every day, and half of the team speaks to customers on the phone. Is that a better idea?", tr: "Anlıyorum. Ama sistemi herkes zaten her gün kullanıyor ve ekibin yarısı telefonda müşteriyle konuşuyor. Bu daha mı iyi bir fikir?" },
            { who: "you", hint: "Karşı tarafın söylediğine gönderme yap ve katıl ya da karşı çık.", expect: "karşı tarafın söylediğine açıkça gönderme yaparak katılmak ya da karşı çıkmak", seconds: 35 },
            { who: "partner", de: "All right. So which day do we choose?", tr: "Peki. Hangi günü seçiyoruz?" },
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
              "I think the computer day is useful because we lose a lot of time with the new system. You are right, we use it every day, but nobody showed us the fast way. On the other hand, the phone calls are our first contact with customers. So let us choose the customer day this year and the system day next year.",
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
