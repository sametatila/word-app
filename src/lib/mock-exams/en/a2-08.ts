import type { MockPaper } from "../types";

/**
 * A2 · Deneme 8 — "Free Time, Music and Going Out".
 *
 * A2'nin öteki denemeleriyle AYNI PLAN; konu ayrı. Boş zaman konusu A2 için
 * elverişli çünkü sıklık, saat, fiyat ve tercih dili aynı metinde doğal
 * duruyor; ayrıca yedinci denemedeki aile-kutlama malzemesiyle hiç
 * örtüşmüyor, öğrenci ikinci denemede aynı sözcük kümesini görmüyor.
 *
 * A2 SINIRI: past simple, present continuous, `going to` / `will`,
 * karşılaştırma dereceleri, `because / when / if / but / so`.
 */
export const EN_A2_08: MockPaper = {
  id: "en-a2-08",
  course: "en",
  level: "A2",
  no: 8,
  theme: "Free Time, Music and Going Out",
  themeTr: "Boş zaman, müzik ve dışarı çıkmak",
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
          id: "en-a2-08-l1",
          no: 1,
          format: "mcq",
          goal: "gist",
          prompt: "Read the five short texts and questions 1 to 5. What is the main message? Choose a, b or c.",
          promptTr: "Beş kısa metni ve 1–5. maddeleri oku. Ana mesaj nedir? a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "m1",
              genre: "Message",
              genreTr: "İleti",
              title: "Tonight",
              body: `Hi Cato, I have two tickets for tonight and my brother is ill. The doors open at eight and the band starts at nine. It is a twenty-minute walk from your flat. Tell me before six, because after that I give the ticket to somebody at work.`,
            },
            {
              kind: "text",
              id: "m2",
              genre: "Notice in a music school",
              genreTr: "Müzik okulu duyurusu",
              title: "Practice rooms",
              body: `Students can use the small rooms free of charge. Book online, one hour at a time, and never more than two hours in a week. Room 4 has a piano. Please do not eat in the rooms.`,
            },
            {
              kind: "text",
              id: "m3",
              genre: "Email",
              genreTr: "E-posta",
              title: "Saturday",
              body: `Dear Juno, the film starts at seven, so let us meet at half past six in front of the cinema. I have the tickets already; you can pay me later. If you are late, go in without me and I will find you.`,
            },
            {
              kind: "text",
              id: "m4",
              genre: "Note on a door",
              genreTr: "Kapıdaki not",
              title: "Guitar lessons",
              body: `The lesson on Thursday is now on Wednesday, same time, same room. This is only for this week. Bring your own guitar; there is one in the room but it is not good.`,
            },
            {
              kind: "text",
              id: "m5",
              genre: "Message to a group",
              genreTr: "Gruba ileti",
              title: "The bus on Sunday",
              body: `The bus to the festival leaves at nine, not at ten. It is fifteen euros and I need the money before Friday. There is no food on the bus, so eat something first or bring it with you.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-08-l1-1",
              no: 1,
              ref: "m1",
              text: "What does the writer want?",
              options: ["Somebody to walk with her to the flat", "A ticket for her brother, who is ill", "An answer before six o'clock"],
              answer: 2,
              explain:
                "İletinin son cümlesi bir süre koyuyor: «Tell me before six, because after that I give the ticket to somebody at work». Kardeşi hasta olduğu için bilet zaten boşta.",
            },
            {
              kind: "mcq",
              id: "en-a2-08-l1-2",
              no: 2,
              ref: "m2",
              text: "What is the rule about time?",
              options: ["The rooms close at eight in the evening", "Each student has two hours a week", "One hour every day is free"],
              answer: 1,
              explain:
                "Duyuru üst sınırı veriyor: «never more than two hours in a week». Bir saat tek seferin uzunluğu, günlük hak değil.",
            },
            {
              kind: "mcq",
              id: "en-a2-08-l1-3",
              no: 3,
              ref: "m3",
              text: "What does the writer say about the tickets?",
              options: ["She has bought them", "Juno should buy them online", "They are cheaper before seven"],
              answer: 0,
              explain:
                "E-posta bunu açıkça söylüyor: «I have the tickets already; you can pay me later». Fiyat ya da satın alma yeri hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-08-l1-4",
              no: 4,
              ref: "m4",
              text: "What has changed?",
              options: ["The room of the lesson", "The teacher of the group", "The day of the lesson"],
              answer: 2,
              explain:
                "Not tek bir değişiklik bildiriyor: «now on Wednesday, same time, same room». Oda ve saat aynı kaldığı için ikisi de yanlış.",
            },
            {
              kind: "mcq",
              id: "en-a2-08-l1-5",
              no: 5,
              ref: "m5",
              text: "What must people do before Friday?",
              options: ["Pay for the journey", "Choose a seat on the bus", "Say if they eat on the bus"],
              answer: 0,
              explain:
                "İleti tarihi paraya bağlıyor: «It is fifteen euros and I need the money before Friday». Yemek konusu ayrı bir uyarı, cuma ile ilgisi yok.",
            },
          ],
        },
        {
          id: "en-a2-08-l2",
          no: 2,
          format: "match",
          goal: "orientation",
          prompt:
            "Read about five people, 6 to 10. Then read the eight adverts a to h. Which advert is right for each person? You use each advert once only.",
          promptTr:
            "6–10. maddelerdeki beş kişiyi oku. Sonra a'dan h'ye sekiz ilanı oku. Her kişiye hangi ilan uyar? Her ilan en fazla bir kez kullanılır.",
          options: [
            { key: "a", label: "Guitar for Beginners", body: "Six people in a group, Tuesday evenings. Twelve euros a lesson. You use our guitars in the first month." },
            { key: "b", label: "Choir — Come and Sing", body: "No lessons, no reading of music. Thursday at seven, in the old school. Free for the first three evenings." },
            { key: "c", label: "Records and Old Music", body: "We buy and sell. Bring what you have and we look at it while you wait. Open Saturday only." },
            { key: "d", label: "Cinema Club", body: "One film every Monday, always in the original language with words on the screen. Four euros, students two." },
            { key: "e", label: "Dancing on Friday", body: "Two hours, no partner needed. The first hour is slow and the second is faster. Eight euros." },
            { key: "f", label: "Repairs While You Wait", body: "Guitars, radios and small machines. We tell you the price first. Closed on Mondays." },
            { key: "g", label: "Quiet Room for Study", body: "Open until midnight, seven days a week. No talking, no telephones. Free with a library card." },
            { key: "h", label: "Football on Sunday Morning", body: "Nine o'clock in the park. Everybody plays, nobody counts the goals. Bring water." },
          ],
          items: [
            {
              kind: "match",
              id: "en-a2-08-l2-6",
              no: 6,
              text: "Vida wants to sing but she cannot read music.",
              answer: "b",
              explain:
                "İlan koşulu kaldırıyor: «No lessons, no reading of music», üstelik ilk üç akşam ücretsiz. Gitar kursu (a) ise ders temelli.",
            },
            {
              kind: "match",
              id: "en-a2-08-l2-7",
              no: 7,
              text: "Tomo has an old guitar that does not work and wants to know the price of a repair first.",
              answer: "f",
              explain:
                "İlan iki şeyi birden veriyor: «Guitars, radios and small machines» ve «We tell you the price first». Plakçı (c) alıp satıyor, tamir etmiyor.",
            },
            {
              kind: "match",
              id: "en-a2-08-l2-8",
              no: 8,
              text: "Lior wants to see films in English and pays a student price.",
              answer: "d",
              explain:
                "İlan hem dili hem fiyatı veriyor: «always in the original language» ve «Four euros, students two». Öğrenci indirimi başka hiçbir ilanda yok.",
            },
            {
              kind: "match",
              id: "en-a2-08-l2-9",
              no: 9,
              text: "Yasin wants to move to music but he has nobody to go with.",
              answer: "e",
              explain:
                "İlan tam bu engeli kaldırıyor: «Two hours, no partner needed». Koro (b) da yalnız gidilebilir ama dans etmek istiyor.",
            },
            {
              kind: "match",
              id: "en-a2-08-l2-10",
              no: 10,
              text: "Fikret wants to do sport on Sunday and is not interested in winning.",
              answer: "h",
              explain:
                "İlan hem günü hem havayı veriyor: «Nine o'clock in the park. Everybody plays, nobody counts the goals».",
            },
          ],
        },
        {
          id: "en-a2-08-l3",
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
              title: "Eleven people in the room",
              body: `Our band played for eleven people in March. I counted them twice. Four of them were our families.

We started three years ago in my brother's garage. Nobody could play well. We chose songs that were easy and we played them badly, and it was the best evening of my week.

Then we got a little better and something strange happened. We began to think about the number of people in the room. After a concert we did not talk about the music. We talked about the eleven.

In June we stopped for two months. I thought that was the end.

We started again in September with one new rule: no counting. Now I do not know how many people were there last week, and I sleep well.`,
              gloss: [
                { de: "a garage", tr: "garaj", en: "garage" },
                { de: "to count", tr: "saymak", en: "count" },
                { de: "a rule", tr: "kural", en: "rule" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-08-l3-11",
              no: 11,
              text: "Where did the band start?",
              options: ["In a music school with six rooms", "At her brother's house", "In a small club in the town"],
              answer: 1,
              explain:
                "İkinci paragraf yeri veriyor: «We started three years ago in my brother's garage». Okul ve kulüp yazıda hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-08-l3-12",
              no: 12,
              text: "What does the writer say about the first year?",
              options: ["They played badly and were happy", "They played well from the beginning", "They played only for their families"],
              answer: 0,
              explain:
                "Metin ikisini yan yana koyuyor: «we played them badly, and it was the best evening of my week». Aileler mart ayındaki seyircinin bir bölümü, ilk yılın tamamı değil.",
            },
            {
              kind: "mcq",
              id: "en-a2-08-l3-13",
              no: 13,
              text: "What changed when the band got better?",
              options: ["They played much longer concerts", "They chose more difficult songs", "The size of the audience became important"],
              answer: 2,
              explain:
                "Üçüncü paragraf değişimi adlandırıyor: «We began to think about the number of people in the room». Şarkı seçimi yalnız başlangıç için anlatılıyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-08-l3-14",
              no: 14,
              text: "What is the new rule?",
              options: ["Everybody must come to every concert", "Nobody counts the audience", "They play only in September"],
              answer: 1,
              explain:
                "Son paragraf kuralı tek sözcükle veriyor: «with one new rule: no counting». Eylül grubun yeniden başladığı ay, tek çalma ayı değil.",
            },
          ],
        },
        {
          id: "en-a2-08-l4",
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
              title: "I started at thirty-four",
              body: `I {{15}} my first lesson two years ago, at the age of thirty-four.

A private teacher is {{16}} expensive than a group, but in a group nobody hears you.

I practise twenty minutes a day. That is not much, {{17}} it is every day.

Next winter I {{18}} play in front of my friends for the first time.

I am not good {{19}} for a concert, and that is not the point.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-08-l4-15",
              no: 15,
              text: "Gap 15",
              options: ["had", "have", "am having"],
              answer: 0,
              explain:
                "Zaman belirteci `two years ago` bitmiş bir zamanı gösterir ve geçmiş zaman ister: `had`. `have` geniş zaman, `am having` ise şu anı anlatır.",
            },
            {
              kind: "mcq",
              id: "en-a2-08-l4-16",
              no: 16,
              text: "Gap 16",
              options: ["the most", "as", "more"],
              answer: 2,
              explain:
                "Boşluktan sonra `than` var; iki şeyi karşılaştıran bu yapı uzun sıfatlarda `more … than` ister. `as` eşitlik kurar, `the most` ise en üstünlük derecesidir.",
            },
            {
              kind: "mcq",
              id: "en-a2-08-l4-17",
              no: 17,
              text: "Gap 17",
              options: ["so", "but", "because"],
              answer: 1,
              explain:
                "İki bilgi karşıt: yirmi dakika az, ama her gün. Karşıtlığı `but` kurar; `so` sonuç, `because` sebep bildirir.",
            },
            {
              kind: "mcq",
              id: "en-a2-08-l4-18",
              no: 18,
              text: "Gap 18",
              options: ["will", "was", "am"],
              answer: 0,
              explain:
                "`Next winter` geleceği gösterir ve `will + yalın fiil` bu geleceği kurar. `was` geçmiş; `am` ise `play` ile doğrudan birleşmez.",
            },
            {
              kind: "mcq",
              id: "en-a2-08-l4-19",
              no: 19,
              text: "Gap 19",
              options: ["too", "very", "enough"],
              answer: 2,
              explain:
                "`enough` sıfattan sonra gelir ve yeterliliği bildirir: `good enough for a concert`. `too` ve `very` sıfattan önce gelir, bu sırayla kullanılamaz.",
            },
          ],
        },
        {
          id: "en-a2-08-l5",
          no: 5,
          format: "gap",
          goal: "structure",
          prompt: "Read the text and complete gaps 20 to 24. Write ONE word in each gap.",
          promptTr: "Metni oku ve 20–24. boşlukları tamamla. Her boşluğa TEK bir sözcük yaz.",
          texts: [
            {
              kind: "text",
              id: "t5",
              genre: "Blog comment",
              genreTr: "Blog yorumu",
              title: "Thursday evenings",
              body: `I sing in a choir {{20}} Thursday evenings.

I have been a member {{21}} four years now.

At the beginning I could not sing at all and I did not want {{22}} stand in the front.

Now my voice is stronger {{23}} it was, and I stand where they put me.

Last year I {{24}} not miss a single evening.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a2-08-l5-20",
              no: 20,
              text: "Gap 20",
              accept: ["on"],
              explain:
                "Gün adlarıyla `on` kullanılır: `on Thursday evenings`. `in` ay ve yıl için, `at` ise saat için gelir.",
            },
            {
              kind: "gap",
              id: "en-a2-08-l5-21",
              no: 21,
              text: "Gap 21",
              accept: ["for"],
              explain:
                "Süre uzunluğu `for` ile verilir: `for four years`. `since` bir başlangıç noktası ister (`since 2020`), süre değil.",
            },
            {
              kind: "gap",
              id: "en-a2-08-l5-22",
              no: 22,
              text: "Gap 22",
              accept: ["to"],
              explain:
                "`want` fiilinden sonra ikinci fiil `to` ile gelir: `did not want to stand`. Yalın fiil ya da `-ing` bu kalıba uymaz.",
            },
            {
              kind: "gap",
              id: "en-a2-08-l5-23",
              no: 23,
              text: "Gap 23",
              accept: ["than"],
              explain:
                "`stronger` bir karşılaştırma biçimidir ve karşılaştırılan şey `than` ile bağlanır: `stronger than it was`.",
            },
            {
              kind: "gap",
              id: "en-a2-08-l5-24",
              no: 24,
              text: "Gap 24",
              accept: ["did"],
              explain:
                "`Last year` geçmiş zaman ister ve olumsuzu `did not + yalın fiil` ile kurulur: «I did not miss a single evening».",
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
        "This part has four tasks. You hear conversations, some information and five short speakers. You hear every recording twice.",
      instructionTr:
        "Bu bölümde dört görev var. Konuşmalar, bir bilgilendirme ve beş kısa konuşmacı dinleyeceksin. Her kaydı iki kez dinleyebilirsin.",
      tasks: [
        {
          id: "en-a2-08-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "You hear five short conversations, questions 1 to 5. Choose a, b or c. You hear every recording twice.",
          promptTr: "Beş kısa konuşma dinleyeceksin, 1–5. maddeler. a, b ya da c'yi seç. Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki arkadaş cumartesi akşamını konuşuyor.",
              plays: 2,
              segments: [
                { text: "Are we going out on Saturday?" },
                { text: "I want to, but I am working until nine." },
                { text: "The film starts at eight." },
                { text: "Then not the film. We can eat something after nine." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Phone call",
              genreTr: "Telefon görüşmesi",
              situation: "Bir kişi dans kursunu arıyor.",
              plays: 2,
              segments: [
                { text: "Hello, is there a place in the Friday class?" },
                { text: "In the slow hour, yes. The second hour is full." },
                { text: "The first hour is fine. Do I need a partner?" },
                { text: "No, nobody comes with a partner." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "In a shop",
              genreTr: "Dükkânda",
              situation: "Bir müşteri kulaklık soruyor.",
              plays: 2,
              segments: [
                { text: "How much are these?" },
                { text: "Forty euros, and the black ones are twenty-five." },
                { text: "Are the black ones worse?" },
                { text: "They are the same, but the cable is shorter." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "At home",
              genreTr: "Evde",
              situation: "İki arkadaş bir konseri konuşuyor.",
              plays: 2,
              segments: [
                { text: "How was the concert?" },
                { text: "The band was good. I was too far from the front." },
                { text: "Was it full?" },
                { text: "Not really. Next time I go early and stand at the front." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Phone message",
              genreTr: "Telefon iletisi",
              situation: "Müzik okulu ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello, this is the music school about your lesson on Thursday. Your teacher is ill this week, so the lesson is on Wednesday at the same time. The room is the same. Please do not come on Thursday." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-08-h1-1",
              no: 1,
              ref: "a1",
              text: "What do they decide?",
              options: ["To see the film at eight", "To stay at home on Saturday", "To meet later and eat"],
              answer: 2,
              explain:
                "Karar son cümlede: «Then not the film. We can eat something after nine». Sinema saat sekizde, o kişi ise dokuza kadar çalışıyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-08-h1-2",
              no: 2,
              ref: "a2",
              text: "Which hour has a place?",
              options: ["The slow one", "The fast one", "Both of them"],
              answer: 0,
              explain:
                "Görevli ayrımı yapıyor: «In the slow hour, yes. The second hour is full». İkinci saat hızlı olan ve dolu.",
            },
            {
              kind: "mcq",
              id: "en-a2-08-h1-3",
              no: 3,
              ref: "a3",
              text: "What is the difference between them?",
              options: ["The sound is not as good", "The length of the cable", "The colour only"],
              answer: 1,
              explain:
                "Görevli tek farkı adlandırıyor: «They are the same, but the cable is shorter». Ses aynı olduğu için ilk şık yanlış; renk fiyat farkının sebebi değil.",
            },
            {
              kind: "mcq",
              id: "en-a2-08-h1-4",
              no: 4,
              ref: "a4",
              text: "What was the problem?",
              options: ["The band played badly", "There were too many people", "Where she was standing"],
              answer: 2,
              explain:
                "Konuşmacı yerini şikâyet ediyor: «I was too far from the front». Grup iyiydi ve salon dolu değildi: «Not really».",
            },
            {
              kind: "mcq",
              id: "en-a2-08-h1-5",
              no: 5,
              ref: "a5",
              text: "What has changed?",
              options: ["The teacher of the lesson", "The day of the lesson", "The time of the lesson"],
              answer: 1,
              explain:
                "İleti tek değişikliği veriyor: «the lesson is on Wednesday at the same time». Saat ve oda aynı; öğretmen hasta ama değişmiyor.",
            },
          ],
        },
        {
          id: "en-a2-08-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear information about a music evening. Complete the notes, questions 6 to 10. Write ONE or TWO words or a number in each gap. You hear the information twice.",
          promptTr:
            "Bir müzik akşamı hakkında bilgi dinleyeceksin. 6–10. maddelerdeki notları tamamla. Her boşluğa BİR ya da İKİ sözcük veya bir sayı yaz. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Information",
              genreTr: "Bilgilendirme",
              situation: "Bir görevli müzik akşamını anlatıyor.",
              plays: 2,
              segments: [
                {
                  text: "Good evening. Our music evening is on Friday the twelfth. The doors open at seven and the first group plays at half past seven. Tickets are eight euros, and five for students. There are four groups and the evening ends at eleven. There is no parking in front of the building; please use the station.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notes",
              genreTr: "Not kâğıdı",
              title: "Music evening — notes",
              body: `Day:                  Friday the {{6}}
Doors open at:        {{7}}
Ticket for students:  {{8}} euros
Number of groups:     {{9}}
Leave the car at the {{10}}`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a2-08-h2-6",
              no: 6,
              ref: "b1",
              text: "Gap 6",
              accept: ["12", "twelfth", "12th"],
              explain:
                "Kayıt «on Friday the twelfth» diyor. Not kâğıdında `Friday the` basılı olduğu için boşluğa yalnız gün yazılır; rakam da yazı da kabul edilir.",
            },
            {
              kind: "gap",
              id: "en-a2-08-h2-7",
              no: 7,
              ref: "b1",
              text: "Gap 7",
              accept: ["7", "seven"],
              explain:
                "«The doors open at seven» — kapı saati. Yedi buçuk ilk grubun sahne saati, kapı saati değil.",
            },
            {
              kind: "gap",
              id: "en-a2-08-h2-8",
              no: 8,
              ref: "b1",
              text: "Gap 8",
              accept: ["5", "five"],
              explain:
                "«Tickets are eight euros, and five for students» — öğrenci fiyatı. Sekiz tam bilet; not kâğıdı öğrenciyi soruyor.",
            },
            {
              kind: "gap",
              id: "en-a2-08-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["4", "four"],
              explain:
                "«There are four groups» — grup sayısı. On bir bitiş saati, on iki ise ayın günü; üç sayıyı ayırmak gerekiyor.",
            },
            {
              kind: "gap",
              id: "en-a2-08-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["station"],
              explain:
                "Kayıt yeri gösteriyor: «There is no parking in front of the building; please use the station».",
            },
          ],
        },
        {
          id: "en-a2-08-h3",
          no: 3,
          format: "mcq",
          goal: "gist",
          prompt: "You hear five short speakers, questions 11 to 15. What is each person doing? You hear every recording twice.",
          promptTr: "Beş kısa konuşmacı dinleyeceksin, 11–15. maddeler. Her kişi ne yapıyor? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "At a desk",
              genreTr: "Danışmada",
              situation: "Bir kişi bilet gişesinde konuşuyor.",
              plays: 2,
              segments: [
                { text: "I bought two tickets for the eighth and I can only come on the ninth. I do not want my money back. Can you put my name on the other evening?" },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "Announcement",
              genreTr: "Duyuru",
              situation: "Bir salonda anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "The second group starts in ten minutes. There is water at the back of the room, and please keep the door on the left free; the musicians come in that way." },
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
                { text: "For eight years I played every weekend and I never listened to anybody else. Then I broke my hand. I sat in concerts for six months, and I came back a better player." },
              ],
            },
            {
              kind: "audio",
              id: "c4",
              genre: "Phone call",
              genreTr: "Telefon görüşmesi",
              situation: "Bir müşteri kursu arıyor.",
              plays: 2,
              segments: [
                { text: "Hello, my daughter is nine and she wants to learn the piano. Is she too young for the group on Tuesdays, or do you have something for children?" },
              ],
            },
            {
              kind: "audio",
              id: "c5",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Radyoda bir konuşmacı görüş bildiriyor.",
              plays: 2,
              segments: [
                { text: "People say you must start young or you will never play well. It is easier at seven, that is true. But most of my students are over forty and half of them play better than I did at twenty." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-08-h3-11",
              no: 11,
              ref: "c1",
              text: "What is the speaker doing?",
              options: ["Asking to change a date", "Asking for her money back", "Buying two more tickets"],
              answer: 0,
              explain:
                "Konuşmacı isteğini açıkça söylüyor: «Can you put my name on the other evening?» ve parayı istemiyor: «I do not want my money back».",
            },
            {
              kind: "mcq",
              id: "en-a2-08-h3-12",
              no: 12,
              ref: "c2",
              text: "What does the announcement ask people to do?",
              options: ["To take their water outside", "To leave one door free", "To sit at the back of the room"],
              answer: 1,
              explain:
                "Anonsun tek ricası bu: «please keep the door on the left free; the musicians come in that way». Su arkada duruyor ama dışarı çıkarılması istenmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-08-h3-13",
              no: 13,
              ref: "c3",
              text: "What is the speaker doing?",
              options: ["Complaining about other musicians", "Inviting people to a concert", "Explaining how an accident helped him"],
              answer: 2,
              explain:
                "Anlatı elin kırılmasını bir kazanca bağlıyor: altı ay dinleyici olmuş ve «I came back a better player». Şikâyet ya da davet yok.",
            },
            {
              kind: "mcq",
              id: "en-a2-08-h3-14",
              no: 14,
              ref: "c4",
              text: "Why is the person calling?",
              options: ["To ask about the age of the group", "To say her daughter cannot come", "To ask about the price of the lessons"],
              answer: 0,
              explain:
                "Soru yaşla ilgili: «Is she too young for the group on Tuesdays, or do you have something for children?». Fiyat hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-08-h3-15",
              no: 15,
              ref: "c5",
              text: "What is the speaker doing?",
              options: ["Saying that young players are always better", "Answering a common idea about age", "Asking people to start earlier"],
              answer: 1,
              explain:
                "Konuşmacı yaygın inancı anıp sınırlıyor: «People say you must start young», sonra öğrencilerinin çoğunun kırk yaşın üstünde olduğunu söylüyor.",
            },
          ],
        },
        {
          id: "en-a2-08-h4",
          no: 4,
          format: "match",
          goal: "detail",
          prompt:
            "You hear five people talking about their free time, questions 16 to 20. What does each person say? Choose from a to h. You use each answer once only. You hear the recordings twice.",
          promptTr:
            "Boş zamanlarından söz eden beş kişi dinleyeceksin, 16–20. maddeler. Her kişi ne söylüyor? a'dan h'ye seç. Her seçenek en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "They started something new this year." },
            { key: "b", label: "They stopped because it cost too much." },
            { key: "c", label: "They do it alone and they like that." },
            { key: "d", label: "They go only when a friend goes too." },
            { key: "e", label: "They changed the day because of work." },
            { key: "f", label: "They prefer listening to playing." },
            { key: "g", label: "They do it because of their child." },
            { key: "h", label: "They travel a long way for it." },
          ],
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Speaker 1",
              genreTr: "Birinci konuşmacı",
              situation: "Birinci konuşmacı yolculuktan söz ediyor.",
              plays: 2,
              segments: [
                { text: "The nearest choir is in the next town. It is fifty minutes on the train, there and back on a Thursday evening. Everybody asks me why. I have no good answer and I still go." },
              ],
            },
            {
              kind: "audio",
              id: "d2",
              genre: "Speaker 2",
              genreTr: "İkinci konuşmacı",
              situation: "İkinci konuşmacı vardiyalarından söz ediyor.",
              plays: 2,
              segments: [
                { text: "I played football on Tuesdays for six years. Then my shifts moved and Tuesday was impossible. The same people now meet on Sunday morning, and I am there." },
              ],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü konuşmacı kızından söz ediyor.",
              plays: 2,
              segments: [
                { text: "I did not want to learn an instrument. My daughter started the guitar and she practised alone in her room, so I asked for lessons too. Now we play together on Sundays." },
              ],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Speaker 4",
              genreTr: "Dördüncü konuşmacı",
              situation: "Dördüncü konuşmacı yalnız gitmeyi anlatıyor.",
              plays: 2,
              segments: [
                { text: "I go to the cinema on my own every Monday. My friends think that is sad. I do not have to talk about the film in the car afterwards, and that is the whole point." },
              ],
            },
            {
              kind: "audio",
              id: "d5",
              genre: "Speaker 5",
              genreTr: "Beşinci konuşmacı",
              situation: "Beşinci konuşmacı bıraktığı bir şeyden söz ediyor.",
              plays: 2,
              segments: [
                { text: "The lessons were thirty euros an hour and I had two a week. After a year I looked at the number and I stopped. I still have the guitar under the bed." },
              ],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-a2-08-h4-16",
              no: 16,
              ref: "d1",
              text: "Speaker 1",
              answer: "h",
              explain:
                "Konuşmacı yolu anlatıyor: «It is fifty minutes on the train, there and back on a Thursday evening». Yine de gidiyor, yani bırakmış değil.",
            },
            {
              kind: "match",
              id: "en-a2-08-h4-17",
              no: 17,
              ref: "d2",
              text: "Speaker 2",
              answer: "e",
              explain:
                "Değişikliğin sebebi iş: «Then my shifts moved and Tuesday was impossible». Aynı insanlarla şimdi pazar sabahı buluşuyor, yani bırakmamış.",
            },
            {
              kind: "match",
              id: "en-a2-08-h4-18",
              no: 18,
              ref: "d3",
              text: "Speaker 3",
              answer: "g",
              explain:
                "Başlangıç çocuğa bağlı: «My daughter started the guitar … so I asked for lessons too». Kendisi başta istemiyormuş.",
            },
            {
              kind: "match",
              id: "en-a2-08-h4-19",
              no: 19,
              ref: "d4",
              text: "Speaker 4",
              answer: "c",
              explain:
                "Konuşmacı yalnızlığı seçiyor ve gerekçesini veriyor: «I do not have to talk about the film in the car afterwards, and that is the whole point».",
            },
            {
              kind: "match",
              id: "en-a2-08-h4-20",
              no: 20,
              ref: "d5",
              text: "Speaker 5",
              answer: "b",
              explain:
                "Bırakma sebebi para: saati otuz euro, haftada iki ders, «I looked at the number and I stopped». Gitar hâlâ yatağın altında.",
            },
          ],
        },
      ],
    },

    /* ── WRITING ───────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 30,
      instruction: "This part has two tasks: you write a message and a short text about an experience.",
      instructionTr: "Bu bölümde iki görev var: bir ileti ve bir deneyim üzerine kısa bir metin yazacaksın.",
      tasks: [
        {
          id: "en-a2-08-w1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "Your English friend Lior wants to do something on Saturday evening. Write a message to Lior. Write about 50 words. Answer all three points.",
          promptTr:
            "İngiliz arkadaşın Lior cumartesi akşamı bir şey yapmak istiyor. Lior'a bir ileti yaz. Yaklaşık 50 kelime. Üç maddenin hepsine cevap ver.",
          items: [],
          rubric: {
            minWords: 50,
            points: [
              { de: "Suggest what you can do together.", tr: "Birlikte ne yapabileceğinizi öner." },
              { de: "Say when and where you can meet.", tr: "Ne zaman ve nerede buluşabileceğinizi söyle." },
              { de: "Ask Lior one question about it.", tr: "Lior'a bununla ilgili bir soru sor." },
            ],
            sample: `Hi Lior,

There is a concert in the old school on Saturday. Four groups play and the tickets are only eight euros.

We can meet at seven in front of the door, because the first group starts at half past seven.

Do you want to eat something first?

See you!
Vida`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi? Biri eksikse metin tam sayılmaz.",
              "Öneri somut mu, yoksa yalnız 'let us do something' mi denmiş?",
              "Saat ve yer açıkça verildi mi?",
              "Gerçek bir soru soruldu mu ve soru işareti var mı?",
              "Yaklaşık 50 kelime yazıldı mı? Hitap ve veda var mı?",
            ],
          },
        },
        {
          id: "en-a2-08-w2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Write a short text about something you do in your free time. Say what it is, when you started and why you continue. Write about 60 words.",
          promptTr:
            "Boş zamanında yaptığın bir şeyi anlat. Ne olduğunu, ne zaman başladığını ve neden devam ettiğini yaz. Yaklaşık 60 kelime.",
          items: [],
          rubric: {
            minWords: 60,
            points: [
              { de: "Say what you do.", tr: "Ne yaptığını söyle." },
              { de: "Say when and how you started.", tr: "Ne zaman ve nasıl başladığını söyle." },
              { de: "Say why you continue.", tr: "Neden devam ettiğini söyle." },
            ],
            sample: `I swim three mornings a week before work. I started four years ago because my back hurt and the doctor said swimming was better than tablets. At the beginning I could only do ten minutes and I hated the cold water. Now I do forty minutes and I am awake for the whole day. That is why I continue, not the back.`,
            criteria: [
              "Üç içerik noktasının üçü de var mı?",
              "Başlangıç için geçmiş zaman, şimdiki alışkanlık için geniş zaman doğru mu kullanılmış?",
              "Sıklık ifadeleri var mı? (three mornings a week, every day)",
              "Devam etme gerekçesi açıkça verildi mi?",
              "Yaklaşık 60 kelime yazıldı mı?",
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
          id: "en-a2-08-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about your free time. Answer in full sentences.",
          promptTr: "Sana boş zamanın hakkında sorular soracağım. Tam cümlelerle cevap ver.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good morning. What do you usually do after work or after school?", tr: "Günaydın. İşten ya da okuldan sonra genelde ne yaparsın?" },
            { who: "you", hint: "Alışkanlığını anlat ve ne sıklıkta yaptığını söyle.", expect: "geniş zamanda bir alışkanlığı sıklık bildirerek anlatmak", seconds: 30 },
            { who: "partner", de: "Thank you. Do you prefer music or films? Why?", tr: "Teşekkürler. Müziği mi filmleri mi tercih edersin? Neden?" },
            { who: "you", hint: "Tercihini söyle ve bir gerekçe ver.", expect: "bir tercihi gerekçesiyle bildirmek", seconds: 30 },
            { who: "partner", de: "I see. Tell me about the last time you went out in the evening.", tr: "Anlıyorum. En son ne zaman akşam dışarı çıktığını anlat." },
            { who: "you", hint: "Geçmiş zamanla kısa bir anı anlat.", expect: "geçmiş zamanda kısa bir anlatı vermek", seconds: 35 },
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
              "After work I walk for half an hour and then I cook. Twice a week I go to a football group in the park. I prefer music, because I can listen while I do other things. Last month I went to a concert with my brother. We stood at the back and we came home at midnight.",
            criteria: [
              "Cevaplar tek sözcük değil, tam cümle mi?",
              "Sıklık ifadeleri kullanıldı mı? (twice a week, every evening)",
              "Tercih bir gerekçeyle mi verildi? (because …)",
              "Son soruda geçmiş zaman doğru kuruldu mu?",
            ],
          },
        },
        {
          id: "en-a2-08-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Describe this situation for about one minute: a small concert in a hall. Three musicians are playing on a low stage and about thirty people are sitting on chairs. A man at the back is standing with a child on his shoulders. Say what you see, what the people are doing, and whether you like small concerts.",
          promptTr:
            "Şu durumu bir dakika kadar anlat: bir salonda küçük bir konser. Alçak bir sahnede üç müzisyen çalıyor ve otuz kadar kişi sandalyelerde oturuyor. Arkada bir adam omzunda bir çocukla ayakta duruyor. Ne gördüğünü, insanların ne yaptığını ve küçük konserleri sevip sevmediğini söyle.",
          prepSeconds: 45,
          speakSeconds: 75,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "say what you see", tr: "Ne gördüğünü söyle" },
              { de: "say what the people are doing", tr: "İnsanların ne yaptığını söyle" },
              { de: "say if you like small concerts", tr: "Küçük konserleri sevip sevmediğini söyle" },
            ],
            sample:
              "This is a small concert in a hall. On the stage there are three musicians and the stage is very low. In front of them about thirty people are sitting on chairs and they are listening. At the back a man is standing with a child on his shoulders, and the child is looking at the guitar. I like small concerts because you can see the faces of the players.",
            criteria: [
              "Şimdiki zaman (present continuous) kullanıldı mı? Bu görevin ana yapısı bu.",
              "Üç içerik noktasının üçü de işlendi mi?",
              "Yer bildiren ifadeler var mı? (on the stage, in front of, at the back)",
              "Görüş bir gerekçeyle mi verildi?",
            ],
          },
        },
        {
          id: "en-a2-08-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "You and a friend have one free evening in the week. Talk with me about the ideas and choose one together.",
          promptTr:
            "Sen ve bir arkadaşın haftada bir boş akşamınız var. Fikirleri benimle konuş ve birlikte birini seç.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "Here are three ideas: a dance class, a cinema club, or football in the park. What do you think about the dance class?", tr: "Üç fikir var: dans kursu, sinema kulübü ya da parkta futbol. Dans kursu hakkında ne düşünüyorsun?" },
            { who: "you", hint: "Dans kursu hakkında görüşünü söyle ve bir gerekçe ver.", expect: "bir fikir hakkında görüş bildirmek ve gerekçelendirmek", seconds: 35 },
            { who: "partner", de: "All right. But the class is eight euros every week, and the cinema club is only two for students. Is that not better?", tr: "Peki. Ama kurs her hafta sekiz euro, sinema kulübü ise öğrencilere yalnız iki euro. Bu daha iyi değil mi?" },
            { who: "you", hint: "Karşı tarafın söylediğine gönderme yap ve katıl ya da karşı çık.", expect: "karşı tarafın söylediğine açıkça gönderme yaparak katılmak ya da karşı çıkmak", seconds: 35 },
            { who: "partner", de: "So which one do we take?", tr: "Peki hangisini seçiyoruz?" },
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
              "I like the dance class because we sit all day and it is the only idea where we move. You are right about the money, eight euros every week is a lot for me too. But the cinema club is on Monday and I work late on Mondays. So let us take the football in the park; it is free and it is on Sunday.",
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
