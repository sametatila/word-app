import type { MockPaper } from "../types";

/**
 * A2 · Deneme 1 — "Health and Free Time".
 *
 * ÖLÇÜM PLANI (A2 tanımı: sık karşılaşılan konularda basit metinlerin ana
 * fikrini ve tek tek bilgilerini anlamak; kendi çevresi hakkında yazmak):
 *
 *   Reading  35 dk · 24 madde
 *     Teil 1  5  üç şıklı seçme  kısa metin — ana mesaj (gist)
 *     Teil 2  5  eşleştirme      beş kişi ↔ sekiz ilan (orientation)
 *     Teil 3  4  üç şıklı seçme  uzun metin — ayrıntı (detail)
 *     Teil 4  5  şıklı boşluk    sözcük seçimi (structure)
 *     Teil 5  5  açık boşluk     boşluk başına tek sözcük (structure)
 *   Listening 30 dk · 20 madde (her kayıt iki kez)
 *     Teil 1  5  üç şıklı seçme  kısa konuşma (detail)
 *     Teil 2  5  not tamamlama   tek sesli kayıt (detail)
 *     Teil 3  5  üç şıklı seçme  kısa tek sesli metin — ana fikir (gist)
 *     Teil 4  5  eşleştirme      beş konuşmacı ↔ sekiz seçenek (detail)
 *   Writing  30 dk  e-posta (~50 kelime) + kısa anlatı (~60 kelime)
 *   Speaking 15 dk  söyleşi · fotoğraf anlatma · birlikte karar verme
 *
 * DİL SİSTEMİ BURADA BAŞLIYOR. Almanca A2 kâğıdında boşluk doldurma görevi
 * yok; İngilizce sınav geleneğinde A2 bunu iki ayrı görevle ölçüyor —
 * sözcük seçimi (şıklı) ve dilbilgisi (açık boşluk, boşluk başına tek
 * sözcük). İkisi ayrı görev çünkü ayrı şey ölçüyorlar: birincisi eşdizim ve
 * anlam, ikincisi yapı.
 *
 * A2 SINIRI: past simple, present continuous, `going to` / `will`,
 * karşılaştırma dereceleri, `because / when / if / but / so` ile yan cümle.
 * Üçüncü tip koşul, ortaç öbeği ve devrik yapı yok.
 */
export const EN_A2_01: MockPaper = {
  id: "en-a2-01",
  course: "en",
  level: "A2",
  no: 1,
  theme: "Health and Free Time",
  themeTr: "Sağlık ve boş zaman",
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
          id: "en-a2-01-l1",
          no: 1,
          format: "mcq",
          goal: "gist",
          prompt: "Read the five short texts and questions 1 to 5. What is the main message? Choose a, b or c.",
          promptTr: "Beş kısa metni ve 1–5. maddeleri oku. Ana mesaj nedir? a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "m1",
              genre: "Note at home",
              genreTr: "Evdeki not",
              title: "For Sara",
              body: `Sara, I put your medicine in the top drawer in the kitchen. Take one tablet after breakfast, not before it. The doctor said food first. Mum`,
            },
            {
              kind: "text",
              id: "m2",
              genre: "Notice",
              genreTr: "Duyuru",
              title: "Sports Centre",
              body: `From Monday the pool is closed for two weeks. The showers and the gym stay open as usual. We are sorry: the old pipes need new parts.`,
            },
            {
              kind: "text",
              id: "m3",
              genre: "Message",
              genreTr: "İleti",
              title: "From Ana",
              body: `Hi Deniz, I cannot come to the yoga class tonight. My sister is ill and I stay with her children. Can you tell the teacher? Thanks!`,
            },
            {
              kind: "text",
              id: "m4",
              genre: "Email to members",
              genreTr: "Üyelere e-posta",
              title: "Sunday walk",
              body: `Dear members, our walk on Sunday starts at the station, not at the lake. The bus to the lake is much slower this month. Bring water and good shoes.`,
            },
            {
              kind: "text",
              id: "m5",
              genre: "Note at work",
              genreTr: "İş yerindeki not",
              title: "From Ken",
              body: `Team, I go to the dentist tomorrow morning and I come at eleven. Please start the meeting without me. My notes are on the shared drive.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-01-l1-1",
              no: 1,
              ref: "m1",
              text: "What does Sara have to do?",
              options: ["Take the tablet before she eats", "Eat first and then take the tablet", "Ask the doctor about the medicine"],
              answer: 1,
              explain:
                "Not sırayı iki kez veriyor: «after breakfast, not before it» ve «The doctor said food first». Yani önce yemek, sonra ilaç. Birinci şık sırayı ters çeviriyor; üçüncüsü doktora yeniden sormayı öneriyor ama not zaten doktorun dediğini aktarıyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-01-l1-2",
              no: 2,
              ref: "m2",
              text: "What is the notice about?",
              options: ["The showers are closed too", "The pool opens two weeks earlier", "A part of the sports centre is closed"],
              answer: 2,
              explain:
                "Duyuru yalnız havuzu kapatıyor; duşlar ve spor salonu açık kalıyor («stay open as usual»). Birinci şık tam bunu tersine çeviriyor. İkincisi de yanlış yönde: havuz iki hafta erken açılmıyor, iki hafta kapalı.",
            },
            {
              kind: "mcq",
              id: "en-a2-01-l1-3",
              no: 3,
              ref: "m3",
              text: "Why does Ana write?",
              options: ["She wants Deniz to give a message", "She wants to change the class", "She wants Deniz to visit her sister"],
              answer: 0,
              explain:
                "İletinin sonu isteği taşıyor: «Can you tell the teacher?» — Ana, Deniz'den öğretmene haber vermesini istiyor. Kız kardeş ve ders metinde geçiyor ama biri sebep, öteki gidilemeyen yer; ikisi de istek değil.",
            },
            {
              kind: "mcq",
              id: "en-a2-01-l1-4",
              no: 4,
              ref: "m4",
              text: "What is new about the walk?",
              options: ["The day of the walk", "The price of the bus ticket", "The starting place"],
              answer: 2,
              explain:
                "E-posta buluşma yerini düzeltiyor: «starts at the station, not at the lake». Gün değişmiyor (yine pazar), bilet fiyatından hiç söz edilmiyor; otobüsten söz edilmesinin sebebi yavaşlığı.",
            },
            {
              kind: "mcq",
              id: "en-a2-01-l1-5",
              no: 5,
              ref: "m5",
              text: "What does Ken want the team to do?",
              options: ["Wait for him before the meeting", "Have the meeting without waiting", "Send him the notes tomorrow"],
              answer: 1,
              explain:
                "Not açık bir talimat veriyor: «Please start the meeting without me». Ken saat on birde geliyor ama ekibin beklemesini istemiyor. Notlar zaten paylaşılan sürücüde, yani ona gönderilmesi gerekmiyor.",
            },
          ],
        },
        {
          id: "en-a2-01-l2",
          no: 2,
          format: "match",
          goal: "orientation",
          prompt:
            "Read about five people, 6 to 10. Then read the eight adverts a to h. Which advert is right for each person? You use each advert once only.",
          promptTr:
            "6–10. maddelerdeki beş kişiyi oku. Sonra a'dan h'ye sekiz ilanı oku. Her kişiye hangi ilan uyar? Her ilan en fazla bir kez kullanılır.",
          options: [
            { key: "a", label: "Morning Swim", body: "The pool opens at six for swimmers only. Quiet lanes until eight. A month costs 22 pounds. No children before nine." },
            { key: "b", label: "Walk and Talk", body: "A slow walk in the park every Tuesday at ten, with a coffee after it. Good for people who come back after an illness. Free." },
            { key: "c", label: "Climbing Wall", body: "For strong beginners from sixteen years. Shoes are included in the price. Saturdays only, from ten to four. 18 pounds a day." },
            { key: "d", label: "Family Cycling", body: "A short ride on flat roads on Sunday morning. Children from six years with a parent. Bikes for children are free." },
            { key: "e", label: "Evening Yoga", body: "Two classes a week, at seven and at half past eight. The late class is quieter and slower. First class free." },
            { key: "f", label: "Football for Girls", body: "Training on Wednesdays after school, from nine to fourteen years. Boots are necessary. Ten pounds a month." },
            { key: "g", label: "Back Class", body: "A doctor sends you or you come alone. Small groups of six, on Monday and Thursday at five. The class is for people with back pain." },
            { key: "h", label: "Table Tennis Club", body: "Every day from four to nine, all ages. You can play alone or with a partner. Bring your own bat or borrow one." },
          ],
          items: [
            {
              kind: "match",
              id: "en-a2-01-l2-6",
              no: 6,
              text: "Mira works from nine and wants to do sport before work. She does not like noise.",
              answer: "a",
              explain:
                "Mira'nın iki ölçütü var: dokuzdan önce ve sessiz. «The pool opens at six for swimmers only. Quiet lanes until eight» ikisini de karşılıyor. Akşam yogası saat yediden sonra, sabaha uymuyor.",
            },
            {
              kind: "match",
              id: "en-a2-01-l2-7",
              no: 7,
              text: "Bekir was in hospital last month. He wants to start again slowly, with other people.",
              answer: "b",
              explain:
                "İlan tam bu durumu adlandırıyor: «Good for people who come back after an illness». Yavaş yürüyüş ve grup birlikte veriliyor. Sırt dersi de yavaş ama o özellikle sırt ağrısı için, hastane sonrası genel dönüş için değil.",
            },
            {
              kind: "match",
              id: "en-a2-01-l2-8",
              no: 8,
              text: "Nour has back pain and her doctor says she needs a small group.",
              answer: "g",
              explain:
                "İlanda hem sorun hem grup büyüklüğü yazılı: «Small groups of six» ve «for people with back pain». Doktorun yönlendirmesi de aynı ilanda geçiyor («A doctor sends you»).",
            },
            {
              kind: "match",
              id: "en-a2-01-l2-9",
              no: 9,
              text: "The Kaya family want to do something together on Sunday with their seven-year-old son.",
              answer: "d",
              explain:
                "İlan üç ölçütü birden karşılıyor: pazar sabahı, ebeveynle birlikte ve «Children from six years». Yedi yaşındaki çocuk bu sınırın üstünde. Tırmanma duvarı on altı yaşından itibaren, uymuyor.",
            },
            {
              kind: "match",
              id: "en-a2-01-l2-10",
              no: 10,
              text: "Ayla is twelve. She wants to play a team sport after school in the week.",
              answer: "f",
              explain:
                "İlandaki yaş aralığı «from nine to fourteen years» ve zamanı «on Wednesdays after school». Ayla on iki yaşında, aralığın içinde. Masa tenisi de hafta içi ama tek başına ya da eşli oynanıyor, takım sporu değil; futbol ilanı üç ölçütü birden tutuyor.",
            },
          ],
        },
        {
          id: "en-a2-01-l3",
          no: 3,
          format: "mcq",
          goal: "detail",
          prompt: "Read the article and questions 11 to 14. Choose a, b or c.",
          promptTr: "Yazıyı ve 11–14. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t3",
              genre: "Blog post",
              genreTr: "Blog yazısı",
              title: "My first year of running",
              body: `Two years ago I could not run for five minutes. I bought good shoes in March and I started in April, on a cold Tuesday evening.

The first weeks were hard. I ran for one minute and then walked for two. My neighbour saw me and laughed, and I was angry. But after six weeks the minutes got easier.

In September I ran my first ten kilometres. It took me seventy-two minutes. My friends thought that this was slow, but for me it was the best day of the year.

Now I run three times a week, always in the morning. Morning is better for me because the streets are quiet and I do not think about work.

People often ask me for a secret. There is no secret. The only rule is this: do not run fast at the beginning. If you go too fast in the first month, you will stop in the second.`,
              gloss: [
                { de: "a kilometre", tr: "kilometre", en: "kilometre" },
                { de: "the beginning", tr: "başlangıç", en: "beginning" },
                { de: "a secret", tr: "sır", en: "secret" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-01-l3-11",
              no: 11,
              text: "When did the writer start to run?",
              options: ["In April", "In March", "In September"],
              answer: 0,
              explain:
                "Metinde iki ay arka arkaya geçiyor: ayakkabılar mart ayında alınıyor, koşu ise «I started in April» ile nisanda başlıyor. Eylül ise ilk on kilometrenin ayı. Üç ay da metinde var, madde hangisinin başlangıç olduğunu ölçüyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-01-l3-12",
              no: 12,
              text: "How did the writer feel about the first ten kilometres?",
              options: ["Disappointed, because the time was slow", "Angry with the neighbour", "Very happy, even with a slow time"],
              answer: 2,
              explain:
                "Yazar süreyi veriyor (yetmiş iki dakika) ama kendi duygusunu ayrı söylüyor: «for me it was the best day of the year». Arkadaşların yavaş bulması yazarın görüşü değil; komşuyla ilgili öfke ise ilk haftalara ait, o güne değil.",
            },
            {
              kind: "mcq",
              id: "en-a2-01-l3-13",
              no: 13,
              text: "Why does the writer run in the morning?",
              options: ["Because there is more time", "Because it is calm and he forgets work", "Because his friends run in the morning too"],
              answer: 1,
              explain:
                "Sebep metinde iki parça hâlinde veriliyor: «the streets are quiet and I do not think about work» — sessizlik ve işi düşünmemek. Arkadaşlar metinde geçiyor ama yalnız süre hakkında yorum yapıyorlar, birlikte koşmuyorlar; zamandan hiç söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-01-l3-14",
              no: 14,
              text: "What is the writer's advice?",
              options: ["Begin slowly, or you will stop soon", "Buy good shoes before you begin", "Run with other people in the first month"],
              answer: 0,
              explain:
                "Son paragraf tek bir kural veriyor: «do not run fast at the beginning», çünkü hızlı başlayan ikinci ay bırakır. İyi ayakkabı metinde geçiyor ama tavsiye olarak değil, yazarın kendi hikâyesinin parçası olarak.",
            },
          ],
        },
        {
          id: "en-a2-01-l4",
          no: 4,
          format: "gapMcq",
          goal: "structure",
          prompt: "Read the text and complete gaps 15 to 19. Which word fits: a, b or c?",
          promptTr: "Metni oku ve 15–19. boşlukları tamamla. Hangi sözcük uyar: a, b ya da c?",
          texts: [
            {
              kind: "text",
              id: "t4",
              genre: "Health leaflet",
              genreTr: "Sağlık broşürü",
              title: "Sleep better",
              body: `Many people {{15}} tired in the morning, even after eight hours in bed.

Doctors give three simple tips. First, go to bed at the same time every night. Your body {{16}} a clock and it learns fast.

Second, do not look at your phone in bed. The light from the screen is {{17}} than you think, and it keeps your brain awake.

Third, keep the room cool. A cold room is much {{18}} for sleep than a warm one.

These tips are free and easy. {{19}} you follow them for two weeks, you will see a difference.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-01-l4-15",
              no: 15,
              text: "Gap 15",
              options: ["are feeling", "feel", "feels"],
              answer: 1,
              explain:
                "Özne `many people` çoğul, cümle de genel bir gerçeği anlatıyor: present simple gerekiyor. `feels` tekil özne ister, `are feeling` ise şu anda süren bir durumu anlatır ve genel doğruya uymaz.",
            },
            {
              kind: "mcq",
              id: "en-a2-01-l4-16",
              no: 16,
              text: "Gap 16",
              options: ["has", "is", "does"],
              answer: 0,
              explain:
                "Cümle bir sahiplik kuruyor: vücudun bir saati var. `has` bunu verir. `is` bir eşitlik kurar («vücut bir saattir») ve devamındaki «it learns fast» ile uyuşmaz; `does` bu yapıda anlamsız kalır.",
            },
            {
              kind: "mcq",
              id: "en-a2-01-l4-17",
              no: 17,
              text: "Gap 17",
              options: ["bright", "brighter", "the brightest"],
              answer: 1,
              explain:
                "Boşluğun hemen ardında `than` var ve `than` karşılaştırma derecesi ister: `brighter`. Yalın biçim (`bright`) ile `than` kullanılmaz, en üstünlük derecesi (`the brightest`) ise karşılaştırma değil sıralama bildirir.",
            },
            {
              kind: "mcq",
              id: "en-a2-01-l4-18",
              no: 18,
              text: "Gap 18",
              options: ["good", "best", "better"],
              answer: 2,
              explain:
                "Yine `than` var, yine karşılaştırma gerekiyor; `good` sıfatının karşılaştırma biçimi düzensiz: `better`. `best` en üstünlük derecesidir ve `than` ile gitmez.",
            },
            {
              kind: "mcq",
              id: "en-a2-01-l4-19",
              no: 19,
              text: "Gap 19",
              options: ["If", "Because", "But"],
              answer: 0,
              explain:
                "İki cümle koşul ilişkisi kuruyor: iki hafta uygularsan farkı görürsün. `If` bunu verir. `Because` sebep bildirir ve sonuç cümlesindeki `will` ile uyuşmaz; `But` karşıtlık kurar, burada karşıtlık yok.",
            },
          ],
        },
        {
          id: "en-a2-01-l5",
          no: 5,
          format: "gap",
          goal: "structure",
          prompt: "Read the email and complete gaps 20 to 24. Write ONE word in each gap.",
          promptTr: "E-postayı oku ve 20–24. boşlukları tamamla. Her boşluğa TEK bir sözcük yaz.",
          texts: [
            {
              kind: "text",
              id: "t5",
              genre: "Email",
              genreTr: "E-posta",
              title: "From: leyla@post.net",
              body: `Hi Tom,

Thank you for the invitation. I would like to come {{20}} the picnic on Saturday.

I am not very good {{21}} cooking, so I will bring fruit and drinks. Is that all right?

My brother asked me {{22}} he can come too. He is quiet and he loves the lake.

We do not have a car, so we {{23}} take the train. It arrives at ten past eleven.

Please tell me {{24}} you need anything else.

See you soon,
Leyla`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a2-01-l5-20",
              no: 20,
              text: "Gap 20",
              accept: ["to"],
              explain:
                "`come to + yer/etkinlik` kalıbı: «come to the picnic». Başka bir edat (at, for) bu fiille yön bildirmez; A2'de fiil-edat eşdizimi ölçülen konulardan biri.",
            },
            {
              kind: "gap",
              id: "en-a2-01-l5-21",
              no: 21,
              text: "Gap 21",
              accept: ["at"],
              explain:
                "`good at + iş` sabit bir eşdizim: «good at cooking». `good in` ya da `good for` başka anlamlar taşır; buradaki anlam bir beceride iyi olmak.",
            },
            {
              kind: "gap",
              id: "en-a2-01-l5-22",
              no: 22,
              text: "Gap 22",
              accept: ["if", "whether"],
              explain:
                "Dolaylı evet/hayır sorusu kuruluyor: kardeşi gelip gelemeyeceğini soruyor. `if` (ya da `whether`) bu yapının bağlacıdır. `that` burada olmaz, çünkü aktarılan şey bir bildirim değil bir soru.",
            },
            {
              kind: "gap",
              id: "en-a2-01-l5-23",
              no: 23,
              text: "Gap 23",
              accept: ["must", "will"],
              explain:
                "Arabaları olmadığı için tren zorunlu: «so we ___ take the train». Zorunluluk `must`, plan ise `will` ile kurulur; ikisi de tek sözcük olarak boşluğa girer. `have` kabul edilmiyor, çünkü bu anlamı ancak `have to` iki sözcüğüyle verir ve yönerge boşluk başına TEK sözcük istiyor.",
            },
            {
              kind: "gap",
              id: "en-a2-01-l5-24",
              no: 24,
              text: "Gap 24",
              accept: ["if", "whether"],
              explain:
                "«Please tell me ___ you need anything else» yine dolaylı bir evet/hayır sorusu: `if` gerekiyor. Bir önceki boşlukla aynı yapı, ama farklı bir fiilden sonra; A2'de bu kalıbın iki ayrı yerde tanınması bekleniyor.",
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
          id: "en-a2-01-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "You hear five short conversations. Which answer is right? You hear every recording twice.",
          promptTr: "Beş kısa konuşma dinleyeceksin. Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "At the chemist",
              genreTr: "Eczanede",
              situation: "Bir müşteri öksürük için ilaç istiyor.",
              plays: 2,
              segments: [
                { speaker: "Customer", text: "I have a bad cough. Do you have something for it?" },
                { speaker: "Chemist", text: "This syrup helps, but it makes you tired. These tablets are better if you drive." },
                { speaker: "Customer", text: "I drive to work every day, so I take the tablets." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "At the doctor's",
              genreTr: "Doktorda",
              situation: "Bir hasta muayeneden sonra bilgi alıyor.",
              plays: 2,
              segments: [
                { speaker: "Doctor", text: "Your knee is better than last month, but do not run yet." },
                { speaker: "Patient", text: "Can I swim?" },
                { speaker: "Doctor", text: "Swimming is fine. Cycling too, but only on flat roads." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "At the sports centre",
              genreTr: "Spor merkezinde",
              situation: "Bir kişi kurs saatlerini soruyor.",
              plays: 2,
              segments: [
                { speaker: "Visitor", text: "When is the beginners' class?" },
                { speaker: "Staff", text: "It was on Monday, but from this week it is on Wednesday at seven." },
                { speaker: "Visitor", text: "Wednesday is perfect for me." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "On the phone",
              genreTr: "Telefonda",
              situation: "İki arkadaş yürüyüş planını konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Ines", text: "The weather will be bad on Saturday. Shall we walk on Sunday?" },
                { speaker: "Karl", text: "I work on Sunday morning. But Sunday afternoon is free." },
                { speaker: "Ines", text: "Then Sunday at two. I will bring the map." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "In the kitchen",
              genreTr: "Mutfakta",
              situation: "İki ev arkadaşı yemek planını konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Bo", text: "I bought rice, eggs and tomatoes. What do we make?" },
                { speaker: "Ling", text: "I had rice yesterday. Let us make an omelette." },
                { speaker: "Bo", text: "Good idea. Then I keep the rice for tomorrow." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-01-h1-1",
              no: 1,
              ref: "a1",
              text: "What does the customer buy?",
              options: ["The tablets", "The syrup", "Nothing today"],
              answer: 0,
              explain:
                "Eczacı iki seçeneği ayırıyor: şurup uyku getiriyor, tabletler araba kullananlar için daha uygun. Müşteri her gün araba kullandığını söyleyip «I take the tablets» diyor. Şurup kayıtta önce geçiyor, bu yüzden ilk duyulanı seçen öğrenci yanılır.",
            },
            {
              kind: "mcq",
              id: "en-a2-01-h1-2",
              no: 2,
              ref: "a2",
              text: "What can the patient do now?",
              options: ["Run short distances", "Swim and cycle on flat roads", "Nothing for one month"],
              answer: 1,
              explain:
                "Doktor koşmayı erteliyor («do not run yet») ama iki etkinliğe izin veriyor: yüzmek ve düz yollarda bisiklet. Bir ay bekleme kayıtta hiç geçmiyor; geçen «last month» dizin karşılaştırma için.",
            },
            {
              kind: "mcq",
              id: "en-a2-01-h1-3",
              no: 3,
              ref: "a3",
              text: "When is the beginners' class now?",
              options: ["On Monday, as before", "On Tuesday", "On Wednesday"],
              answer: 2,
              explain:
                "Görevli değişikliği söylüyor: «It was on Monday, but from this week it is on Wednesday at seven». Pazartesi eski gün; `was … but … is` yapısındaki ikinci yarıyı duymak gerekiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-01-h1-4",
              no: 4,
              ref: "a4",
              text: "When do they walk?",
              options: ["On Saturday", "On Sunday afternoon", "On Sunday morning"],
              answer: 1,
              explain:
                "Cumartesi hava kötü olacak, pazar sabahı Karl çalışıyor; geriye pazar öğleden sonrası kalıyor ve Ines «Then Sunday at two» diyor. Üç zaman da kayıtta geçiyor, ikisi eleniyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-01-h1-5",
              no: 5,
              ref: "a5",
              text: "What do they cook today?",
              options: ["Rice with the tomatoes", "Tomato soup", "An omelette"],
              answer: 2,
              explain:
                "Ling dün pilav yediğini söyleyip «Let us make an omelette» diyor; Bo kabul ediyor ve pirinci yarına saklıyor. Kayıtta üç malzeme sayılıyor ama pişirilen yemek yalnız biri.",
            },
          ],
        },
        {
          id: "en-a2-01-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear a talk about a walking group. Complete the notes, questions 6 to 10. Write ONE or TWO words or a number in each gap. You hear the talk twice.",
          promptTr:
            "Bir yürüyüş grubu hakkında bir sunum dinleyeceksin. 6–10. maddelerdeki notları tamamla. Her boşluğa BİR ya da İKİ sözcük veya bir sayı yaz. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Talk",
              genreTr: "Sunum",
              situation: "Bir yürüyüş grubunun sorumlusu yeni üyelere bilgi veriyor.",
              plays: 2,
              segments: [
                {
                  text: "Good evening and welcome. Our group is called City Walkers and we started in 2019. We meet every Saturday at the old bridge, always at nine o'clock. In winter we meet at ten, because it is dark early. A normal walk is about twelve kilometres and it takes four hours with a long break. You do not need special clothes, but you need good boots. That is the only thing we ask for. The walk is free for members; for guests it costs three pounds. And please remember: we always stop at a café in the middle, so bring a little money for that.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notes",
              genreTr: "Not kâğıdı",
              title: "City Walkers — notes",
              body: `Meeting place:        the {{6}}
Time in summer:       {{7}} o'clock
Length of a walk:     {{8}} kilometres
Necessary equipment:  good {{9}}
Price for guests:     {{10}} pounds`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a2-01-h2-6",
              no: 6,
              ref: "b1",
              text: "Gap 6",
              accept: ["old bridge", "bridge"],
              explain:
                "Konuşmacı buluşma yerini bir kez veriyor: «We meet every Saturday at the old bridge». Not kâğıdında `the` zaten basılı olduğu için boşluğa yalnız yer adı yazılır.",
            },
            {
              kind: "gap",
              id: "en-a2-01-h2-7",
              no: 7,
              ref: "b1",
              text: "Gap 7",
              accept: ["9", "nine"],
              explain:
                "Kayıtta iki saat geçiyor: normalde dokuz, kışın on. Not kâğıdı yaz saatini soruyor, yani dokuz. Kışı yaz sanan öğrenci onu yazar; ayrımı `In winter` sözcüğü kuruyor.",
            },
            {
              kind: "gap",
              id: "en-a2-01-h2-8",
              no: 8,
              ref: "b1",
              text: "Gap 8",
              accept: ["12", "twelve", "about 12", "about twelve"],
              explain:
                "«A normal walk is about twelve kilometres» — uzunluk on iki kilometre. Kayıttaki dört sayısı süreyi (dört saat) bildiriyor; hangi sayının neyin sayısı olduğunu ayırmak gerekiyor.",
            },
            {
              kind: "gap",
              id: "en-a2-01-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["boots", "walking boots"],
              explain:
                "Konuşmacı özel kıyafeti eliyor ve tek zorunluluğu söylüyor: «you need good boots. That is the only thing we ask for». Not kâğıdında `good` basılı olduğu için boşluğa yalnız nesne yazılır.",
            },
            {
              kind: "gap",
              id: "en-a2-01-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["3", "three"],
              explain:
                "Üyeler için ücretsiz, «for guests it costs three pounds». Not kâğıdı misafir fiyatını soruyor. Ücretsizliği duyup boşluğa sıfır yazan öğrenci iki grubu karıştırmış olur.",
            },
          ],
        },
        {
          id: "en-a2-01-h3",
          no: 3,
          format: "mcq",
          goal: "gist",
          prompt: "You hear five short speakers. Why is each person speaking? You hear every recording twice.",
          promptTr: "Beş kısa konuşmacı dinleyeceksin. Her kişi neden konuşuyor? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Voicemail",
              genreTr: "Telesekreter iletisi",
              situation: "Bir kişi spor salonuna ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello, this is Marta Reis. I paid for three months in May, but the card only works until July. Can somebody look at it, please?" },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Radyoda kısa bir duyuru yapılıyor.",
              plays: 2,
              segments: [
                { text: "And now some news for cyclists. The bridge in Water Street is closed from Friday for four weeks. Please use the small bridge in the park." },
              ],
            },
            {
              kind: "audio",
              id: "c3",
              genre: "At work",
              genreTr: "İş yerinde",
              situation: "Bir kişi meslektaşına bir şey anlatıyor.",
              plays: 2,
              segments: [
                { text: "You look tired every afternoon. I had the same problem last year. I stopped drinking coffee after two o'clock and now I sleep much better." },
              ],
            },
            {
              kind: "audio",
              id: "c4",
              genre: "Message",
              genreTr: "Sesli ileti",
              situation: "Bir kişi arkadaşına sesli ileti gönderiyor.",
              plays: 2,
              segments: [
                { text: "Hi! I know you are busy on Saturday, so do not worry about the party. We can meet on another day. Really, it is fine." },
              ],
            },
            {
              kind: "audio",
              id: "c5",
              genre: "In a shop",
              genreTr: "Mağazada",
              situation: "Bir müşteri satış görevlisiyle konuşuyor.",
              plays: 2,
              segments: [
                { text: "I bought these boots here on Monday. After two days the left one opened at the front. I would like my money back, please." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-01-h3-11",
              no: 11,
              ref: "c1",
              text: "Why is the woman calling?",
              options: ["To book a class", "To cancel her membership", "To report a mistake"],
              answer: 2,
              explain:
                "Kadın üç ay ödediğini ama kartın temmuzda bittiğini söylüyor: «Can somebody look at it, please?». Bu bir hata bildirimi. Üyeliği bitirmek istemiyor, tersine hakkını arıyor; ders ayırtmaktan hiç söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-01-h3-12",
              no: 12,
              ref: "c2",
              text: "What is the purpose of the announcement?",
              options: ["To warn about a closed road", "To open a new park in Water Street", "To ask for money"],
              answer: 0,
              explain:
                "Duyuru bir kapanışı bildiriyor: «The bridge in Water Street is closed from Friday for four weeks» ve alternatif yol veriyor. Park geçiyor ama yeni açılan bir yer olarak değil, alternatif köprünün yeri olarak.",
            },
            {
              kind: "mcq",
              id: "en-a2-01-h3-13",
              no: 13,
              ref: "c3",
              text: "What is the speaker doing?",
              options: ["Complaining about the work", "Giving advice from experience", "Asking for a free afternoon"],
              answer: 1,
              explain:
                "Konuşmacı kendi geçmişini anlatıp bir çözüm öneriyor: «I stopped drinking coffee after two o'clock and now I sleep much better». Şikâyet ya da izin isteme kayıtta hiç yok; yorgunluk başkasının durumu olarak anılıyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-01-h3-14",
              no: 14,
              ref: "c4",
              text: "What does the speaker want to say?",
              options: ["That the party is cancelled", "That the friend does not need to worry", "That she is angry with the friend"],
              answer: 1,
              explain:
                "İleti arkadaşı rahatlatmak için: «do not worry about the party» ve «Really, it is fine». Parti iptal edilmiyor, yalnız arkadaşın gelememesi sorun edilmiyor; öfke ise tam tersi bir ton olurdu.",
            },
            {
              kind: "mcq",
              id: "en-a2-01-h3-15",
              no: 15,
              ref: "c5",
              text: "What does the customer want?",
              options: ["A bigger size in the same colour", "A repair", "Her money back"],
              answer: 2,
              explain:
                "Müşteri son cümlede ne istediğini söylüyor: «I would like my money back, please». Tamir ya da beden değişimi hiç geçmiyor; bot ve kusur yalnız gerekçe olarak anlatılıyor.",
            },
          ],
        },
        {
          id: "en-a2-01-h4",
          no: 4,
          format: "match",
          goal: "detail",
          prompt:
            "You hear five people. They talk about a sport they stopped. Why did each person stop? Choose from a to h. You use each answer once only. You hear the recordings twice.",
          promptTr:
            "Beş kişi dinleyeceksin. Bıraktıkları bir spordan söz ediyorlar. Her kişi neden bıraktı? a'dan h'ye seç. Her seçenek en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "It was too expensive." },
            { key: "b", label: "The time did not fit with work." },
            { key: "c", label: "The place was too far away." },
            { key: "d", label: "A friend stopped too." },
            { key: "e", label: "There was an injury." },
            { key: "f", label: "The group was not friendly." },
            { key: "g", label: "The family needed the time." },
            { key: "h", label: "It was too easy and boring." },
          ],
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Speaker 1",
              genreTr: "Birinci konuşmacı",
              situation: "Birinci konuşmacı basketbolu neden bıraktığını anlatıyor.",
              plays: 2,
              segments: [
                { text: "I played basketball for six years. Then my daughter was born and the training was every evening. Now the evenings belong to her, and I do not miss the games as much as I thought." },
              ],
            },
            {
              kind: "audio",
              id: "d2",
              genre: "Speaker 2",
              genreTr: "İkinci konuşmacı",
              situation: "İkinci konuşmacı yüzmeyi neden bıraktığını anlatıyor.",
              plays: 2,
              segments: [
                { text: "I loved swimming, and the people at the pool were nice. But the pool closed and the next one is forty minutes by bus. After work that is simply too long." },
              ],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü konuşmacı tenisi neden bıraktığını anlatıyor.",
              plays: 2,
              segments: [
                { text: "Tennis was good for me. Then I fell in the third month and my shoulder was bad for half a year. The doctor said stop, and I never started again." },
              ],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Speaker 4",
              genreTr: "Dördüncü konuşmacı",
              situation: "Dördüncü konuşmacı dansı neden bıraktığını anlatıyor.",
              plays: 2,
              segments: [
                { text: "I went dancing on Tuesdays for two years. Then my shifts changed and Tuesday became a work day. I asked for another group, but there was only Tuesday." },
              ],
            },
            {
              kind: "audio",
              id: "d5",
              genre: "Speaker 5",
              genreTr: "Beşinci konuşmacı",
              situation: "Beşinci konuşmacı tırmanmayı neden bıraktığını anlatıyor.",
              plays: 2,
              segments: [
                { text: "Climbing was fantastic, but every month I paid for the wall, the shoes and the course. In the end it was more than my food for a week. So I stopped." },
              ],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-a2-01-h4-16",
              no: 16,
              ref: "d1",
              text: "Speaker 1",
              answer: "g",
              explain:
                "Konuşmacı kızının doğduğunu ve akşamların artık ona ait olduğunu söylüyor: «Now the evenings belong to her». Sebep ailenin zamana ihtiyacı. Akşam antrenmanı geçiyor ama iş yüzünden değil.",
            },
            {
              kind: "match",
              id: "en-a2-01-h4-17",
              no: 17,
              ref: "d2",
              text: "Speaker 2",
              answer: "c",
              explain:
                "Havuz kapanmış ve yenisi «forty minutes by bus». Konuşmacı insanları sevdiğini ayrıca söylüyor, yani grup sorunu değil; tek sorun mesafe.",
            },
            {
              kind: "match",
              id: "en-a2-01-h4-18",
              no: 18,
              ref: "d3",
              text: "Speaker 3",
              answer: "e",
              explain:
                "Üçüncü ayda düşüyor: «my shoulder was bad for half a year» ve doktor bırakmasını söylüyor. Altı aylık iyileşme süresi sakatlığı açıkça adlandırıyor; para, mesafe ya da grup hiç geçmiyor.",
            },
            {
              kind: "match",
              id: "en-a2-01-h4-19",
              no: 19,
              ref: "d4",
              text: "Speaker 4",
              answer: "b",
              explain:
                "Vardiyaları değişiyor ve salı iş günü oluyor: «Tuesday became a work day». Başka grup aramış ama yalnız salı varmış. Sebep işle çakışan saat.",
            },
            {
              kind: "match",
              id: "en-a2-01-h4-20",
              no: 20,
              ref: "d5",
              text: "Speaker 5",
              answer: "a",
              explain:
                "Her ay duvar, ayakkabı ve kurs için ödeme yapıyor ve bunun bir haftalık yemeğinden fazla olduğunu söylüyor. Sebep açıkça para; sporu «fantastic» bulduğunu da söylüyor, yani sıkıcılık değil.",
            },
          ],
        },
      ],
    },

    /* ── WRITING ───────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 30,
      instruction: "This part has two tasks: you write an email and a short text about a picture or an experience.",
      instructionTr: "Bu bölümde iki görev var: bir e-posta ve bir deneyim üzerine kısa bir metin yazacaksın.",
      tasks: [
        {
          id: "en-a2-01-w1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "Your English friend Chris asks you about sport in your town. Write an email to Chris. Write about 50 words. Answer all three points.",
          promptTr:
            "İngiliz arkadaşın Chris sana şehrindeki spordan soruyor. Chris'e bir e-posta yaz. Yaklaşık 50 kelime. Üç maddenin hepsine cevap ver.",
          items: [],
          rubric: {
            minWords: 50,
            points: [
              { de: "Say what sport people do in your town.", tr: "Şehrinde insanlar hangi sporu yapıyor, söyle." },
              { de: "Say what sport you do and how often.", tr: "Sen hangi sporu ne sıklıkla yapıyorsun, söyle." },
              { de: "Invite Chris to try it with you.", tr: "Chris'i seninle denemeye çağır." },
            ],
            sample: `Hi Chris,

Thanks for your email! In my town a lot of people play football, and in summer everybody swims in the river. I go running three times a week, always in the morning before work. It is quiet then.

When you come in July, come running with me. It is easy, I promise!

See you soon,
Deniz`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi? Biri eksikse metin tam sayılmaz.",
              "Yaklaşık 50 kelime yazıldı mı?",
              "Sıklık ifadesi kullanıldı mı? (three times a week, every day, usually)",
              "Çağrı açık bir cümleyle yapıldı mı? (Come and try it / Would you like to …)",
              "Hitap ve veda arkadaşça bir kayıtta mı? (Hi … / See you soon)",
            ],
          },
        },
        {
          id: "en-a2-01-w2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Write a short story about a day when you felt very tired but happy. Say what you did, where you were and how you felt. Write about 60 words.",
          promptTr:
            "Çok yorgun ama mutlu olduğun bir günü anlat. Ne yaptığını, nerede olduğunu ve nasıl hissettiğini yaz. Yaklaşık 60 kelime.",
          items: [],
          rubric: {
            minWords: 60,
            points: [
              { de: "Say what you did and where.", tr: "Ne yaptığını ve nerede olduğunu söyle." },
              { de: "Use the past simple.", tr: "Geçmiş zamanı kullan." },
              { de: "Say how you felt at the end of the day.", tr: "Günün sonunda nasıl hissettiğini söyle." },
            ],
            sample: `Last September I walked in the mountains with two friends. We started at seven in the morning and the first two hours were easy. Then the path went up and up. My legs hurt and I wanted to stop. At six o'clock we arrived at the top and we saw the whole valley. I was very tired, but I was also very happy. It was a perfect day.`,
            criteria: [
              "Üç içerik noktasının üçü de var mı?",
              "Geçmiş zaman doğru kullanıldı mı? Düzensiz fiiller (went, saw, was) doğru mu?",
              "Olaylar bir sıra içinde mi anlatılıyor? (first, then, at the end)",
              "Yaklaşık 60 kelime yazıldı mı?",
              "Duygu açıkça söylendi mi, yoksa yalnız olaylar mı sıralandı?",
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
          id: "en-a2-01-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about you and your free time. Answer in full sentences.",
          promptTr: "Sana kendin ve boş zamanın hakkında sorular soracağım. Tam cümlelerle cevap ver.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good morning. First, where do you live, and how long have you lived there?", tr: "Günaydın. Önce: Nerede oturuyorsun ve ne zamandır oradasın?" },
            { who: "you", hint: "Nerede oturduğunu ve ne zamandır orada olduğunu söyle.", expect: "yaşadığı yeri ve süreyi tam bir cümleyle söylemek", seconds: 30 },
            { who: "partner", de: "Thank you. And what do you usually do after work or after school?", tr: "Teşekkürler. İşten ya da okuldan sonra genelde ne yaparsın?" },
            { who: "you", hint: "Günlük alışkanlığını anlat; sıklık sözcüğü kullan.", expect: "günlük bir alışkanlığı sıklık ifadesiyle anlatmak", seconds: 30 },
            { who: "partner", de: "Interesting. Did you do a sport when you were a child?", tr: "İlginç. Çocukken bir spor yapar mıydın?" },
            { who: "you", hint: "Geçmiş zamanla cevapla.", expect: "geçmiş zamanda kısa bir anlatı vermek", seconds: 30 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "answer with full sentences", tr: "Tam cümlelerle cevap vermek" },
              { de: "use the past simple in the last answer", tr: "Son cevapta geçmiş zamanı kullanmak" },
            ],
            sample:
              "I live in Izmir. I have lived here for six years. After work I usually cook and then I walk for half an hour. When I was a child I played volleyball at school, twice a week.",
            criteria: [
              "Cevaplar tek sözcük değil, tam cümle mi?",
              "Sıklık ifadesi kullanıldı mı? (usually, twice a week)",
              "Son soruda geçmiş zaman doğru kuruldu mu?",
              "Sorular anlaşıldı mı, konu dışına çıkıldı mı?",
            ],
          },
        },
        {
          id: "en-a2-01-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Describe this situation for about one minute: a family is having a picnic in a park on a sunny day. Some people are playing football. Say what you see, what the people are doing, and whether you like this kind of day.",
          promptTr:
            "Şu durumu bir dakika kadar anlat: güneşli bir günde bir aile parkta piknik yapıyor. Bazı insanlar futbol oynuyor. Ne gördüğünü, insanların ne yaptığını ve böyle bir günü sevip sevmediğini söyle.",
          prepSeconds: 45,
          speakSeconds: 75,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "say what you see", tr: "Ne gördüğünü söyle" },
              { de: "say what the people are doing", tr: "İnsanların ne yaptığını söyle" },
              { de: "say if you like this kind of day", tr: "Böyle bir günü sevip sevmediğini söyle" },
            ],
            sample:
              "In this park I can see a family on the grass. They are having a picnic. The mother is cutting bread and two children are drinking juice. Behind them some young people are playing football. The sun is shining and everybody looks happy. I like days like this because they are simple and free. In summer I often go to the park with my friends.",
            criteria: [
              "Şimdiki zaman (present continuous) kullanıldı mı? Bu görevin ana yapısı bu.",
              "Üç içerik noktasının üçü de işlendi mi?",
              "Yer bildiren ifadeler var mı? (on the grass, behind them, next to)",
              "Bir dakika kadar kesintisiz konuşuldu mu?",
            ],
          },
        },
        {
          id: "en-a2-01-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "We plan a healthy day for a group of new students. Talk with me about the ideas and choose one together.",
          promptTr:
            "Yeni öğrenciler için sağlıklı bir gün planlıyoruz. Fikirleri benimle konuş ve birlikte birini seç.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "Here are three ideas: a long walk by the river, a cooking class with fruit and vegetables, or a morning of team games. What do you think about the walk?", tr: "Üç fikir var: nehir boyunca uzun bir yürüyüş, meyve ve sebzeyle bir yemek kursu, ya da bir sabahlık takım oyunları. Yürüyüş hakkında ne düşünüyorsun?" },
            { who: "you", hint: "Yürüyüş fikri hakkında görüşünü söyle ve bir gerekçe ver.", expect: "bir fikir hakkında görüş bildirmek ve gerekçelendirmek", seconds: 35 },
            { who: "partner", de: "I see. My problem with the walk is the weather. The cooking class is inside. Do you think that is better?", tr: "Anlıyorum. Yürüyüşle ilgili sorunum hava. Yemek kursu kapalı alanda. Sence daha mı iyi?" },
            { who: "you", hint: "Karşı tarafın söylediğine gönderme yap ve katıl ya da karşı çık.", expect: "karşı tarafın söylediğine açıkça gönderme yaparak katılmak ya da karşı çıkmak", seconds: 35 },
            { who: "partner", de: "All right. So which one do we choose for the students?", tr: "Peki. Öğrenciler için hangisini seçiyoruz?" },
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
              "I think the walk is a good idea because it is free and everybody can do it. That is true, the weather is a problem. But we can choose a day in June. I agree with you about the cooking class, it is safer. So let us choose the cooking class, and the walk in summer.",
            criteria: [
              "Görüş bir gerekçeyle mi verildi? (because …)",
              "Karşı tarafın söylediğine gönderme yapıldı mı? (That is true … / I agree with you …)",
              "Sonunda ortak bir karara varıldı mı?",
              "Yalnız kendi fikirleri sıralanmadı, karşılıklı bir konuşma oldu mu?",
            ],
          },
        },
      ],
    },
  ],
};
