import type { MockPaper } from "../types";

/**
 * A2 · Deneme 12 — "School Letters, Dates and Parents".
 *
 * A2'nin öteki denemeleriyle AYNI PLAN; konu ayrı. Dördüncü denemede okul
 * öğrencinin kendi okulu olarak geçiyordu; burada öğrenci veli rolünde ve
 * kurumla yazışıyor: son ödeme günü, izin yazısı, randevu listesi, ücret
 * muafiyeti. Onuncu ve on birinci denemede olduğu gibi tarih ile tutarı
 * ayırmak asıl ölçülen beceri.
 *
 * Üçüncü görev bilerek okul bülteninden bir yazı: dokuzuncuda öğüt yazısı,
 * onuncuda söyleşi, on birincide okur mektubu vardı. Kurumun kendi
 * uygulamasını açıkladığı bu ses A2'de ilk kez geçiyor.
 *
 * A2 SINIRI: past simple, present continuous, `going to` / `will`,
 * karşılaştırma dereceleri, `because / when / if / but / so`.
 */
export const EN_A2_12: MockPaper = {
  id: "en-a2-12",
  course: "en",
  level: "A2",
  no: 12,
  theme: "School Letters, Dates and Parents",
  themeTr: "Okul yazıları, tarihler ve veliler",
  minutes: 110,
  parts: [
    /* ── READING ───────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 35,
      instruction:
        "This part has five tasks. You read short texts, adverts and a school newsletter, and you complete two short texts. Choose the correct answer for each question.",
      instructionTr:
        "Bu bölümde beş görev var. Kısa metinler, ilanlar ve bir okul bülteni okuyacak, sonra iki kısa metni tamamlayacaksın. Her soruda doğru cevabı işaretle.",
      tasks: [
        {
          id: "en-a2-12-l1",
          no: 1,
          format: "mcq",
          goal: "gist",
          prompt: "Read the five short texts and questions 1 to 5. What is the main message? Choose a, b or c.",
          promptTr: "Beş kısa metni ve 1–5. maddeleri oku. Ana mesaj nedir? a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "m1",
              genre: "Letter from the school",
              genreTr: "Okuldan mektup",
              title: "The school trip",
              body: `Dear parents, the school trip is on 12 May and it costs eighteen euros. Please pay before 5 May. If this is difficult, write to us; nobody stays at school because of money.`,
            },
            {
              kind: "text",
              id: "m2",
              genre: "Notice at the school door",
              genreTr: "Okul kapısındaki duyuru",
              title: "PARENTS' EVENING",
              body: `Tuesday, 18.00 to 20.00.

Ten minutes with each teacher.

Please write your name on the list in the hall. Only two teachers a family, please.`,
            },
            {
              kind: "text",
              id: "m3",
              genre: "Message",
              genreTr: "İleti",
              title: "On the fridge",
              body: `Hedda, the letter about the photographs came today and the last day is Friday. I put it on the fridge. Please do not put anything else on top of it.`,
            },
            {
              kind: "text",
              id: "m4",
              genre: "Notice",
              genreTr: "Duyuru",
              title: "SWIMMING",
              body: `Every Thursday from 14 September.

Children need a towel and a swimming hat. The hat can be bought at school for four euros.

Children who cannot swim are in the second group.`,
            },
            {
              kind: "text",
              id: "m5",
              genre: "Email from the school",
              genreTr: "Okuldan e-posta",
              title: "Monday and Tuesday",
              body: `Dear Mrs Roth, Veli was not at school on Monday and Tuesday. We have no letter from you. Please write one line and give it to his teacher tomorrow. Thank you.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-12-l1-1",
              no: 1,
              ref: "m1",
              text: "What does the school say about the money?",
              options: ["The trip is free this year", "Everybody must pay before the trip", "Families with a problem should write"],
              answer: 2,
              explain:
                "Mektup ödeme gününü verip bir kapı açıyor: «If this is difficult, write to us; nobody stays at school because of money».",
            },
            {
              kind: "mcq",
              id: "en-a2-12-l1-2",
              no: 2,
              ref: "m2",
              text: "What must parents do first?",
              options: ["Come at six with the children", "Put their name on a list", "Choose four teachers"],
              answer: 1,
              explain:
                "Duyuru ilk adımı veriyor: «Please write your name on the list in the hall». Aile başına en fazla iki öğretmen görülebiliyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-12-l1-3",
              no: 3,
              ref: "m3",
              text: "Why does the writer write?",
              options: ["Because a date is close", "Because the photographs are bad", "Because the fridge is full"],
              answer: 0,
              explain:
                "İleti son günü veriyor ve kâğıdın görünür kalmasını istiyor: «the last day is Friday … do not put anything else on top of it».",
            },
            {
              kind: "mcq",
              id: "en-a2-12-l1-4",
              no: 4,
              ref: "m4",
              text: "What can be bought at school?",
              options: ["A towel", "A swimming lesson", "A hat"],
              answer: 2,
              explain:
                "Duyuru tek bir ürünü satışa koyuyor: «The hat can be bought at school for four euros». Havluyu aile getiriyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-12-l1-5",
              no: 5,
              ref: "m5",
              text: "What does the school want?",
              options: ["A short letter about the two days", "A telephone call this evening", "A meeting with the teacher"],
              answer: 0,
              explain:
                "E-posta isteği tam olarak veriyor: «Please write one line and give it to his teacher tomorrow».",
            },
          ],
        },
        {
          id: "en-a2-12-l2",
          no: 2,
          format: "match",
          goal: "orientation",
          prompt:
            "Read about five people, 6 to 10. Then read the eight adverts a to h. Which advert is right for each person? You use each advert once only.",
          promptTr:
            "6–10. maddelerdeki beş kişiyi oku. Sonra a'dan h'ye sekiz ilanı oku. Her kişiye hangi ilan uyar? Her ilan en fazla bir kez kullanılır.",
          options: [
            { key: "a", label: "Homework Club", body: "Monday to Thursday, 15.00 to 17.00, in the library. Free, and there is no booking." },
            { key: "b", label: "Extra Lessons", body: "Mathematics and English in small groups, two afternoons a week. Twelve euros an hour." },
            { key: "c", label: "School Office", body: "Open 8 to 15. For an appointment with a teacher outside the parents' evening, ring 6640." },
            { key: "d", label: "School Meals", body: "Three euros twenty a day, or free with the card from the town office. Tell us by Friday for the next week." },
            { key: "e", label: "Help Fund", body: "For families with a problem paying for a trip or a book. Write to the office; nobody sees your letter except the head." },
            { key: "f", label: "School Bus", body: "Two euros a week. The bus leaves at 7.40 from the market and comes back at 16.10." },
            { key: "g", label: "Lost Property", body: "Room 12, Wednesday afternoons. Everything is thrown away after one month." },
            { key: "h", label: "Second-hand Books", body: "In the hall on the first Monday of the month. Bring the old ones and take new ones." },
          ],
          items: [
            {
              kind: "match",
              id: "en-a2-12-l2-6",
              no: 6,
              text: "Mirek's daughter needs help with mathematics twice a week.",
              answer: "b",
              explain:
                "İlan hem dersi hem sıklığı veriyor: «Mathematics and English in small groups, two afternoons a week».",
            },
            {
              kind: "match",
              id: "en-a2-12-l2-7",
              no: 7,
              text: "Petra cannot come to the parents' evening and wants another time.",
              answer: "c",
              explain:
                "İlan tam bu durumu karşılıyor: «For an appointment with a teacher outside the parents' evening, ring 6640».",
            },
            {
              kind: "match",
              id: "en-a2-12-l2-8",
              no: 8,
              text: "Rina wants her son to eat at school and does not know what it costs.",
              answer: "d",
              explain:
                "İlan fiyatı ve ücretsiz seçeneği veriyor: «Three euros twenty a day, or free with the card from the town office».",
            },
            {
              kind: "match",
              id: "en-a2-12-l2-9",
              no: 9,
              text: "Veli's family cannot pay for the school trip.",
              answer: "e",
              explain:
                "İlan bu durum için kurulmuş: «For families with a problem paying for a trip or a book», üstelik mektubu yalnız müdür görüyor.",
            },
            {
              kind: "match",
              id: "en-a2-12-l2-10",
              no: 10,
              text: "Hedda wants her daughter to do something after school until five.",
              answer: "a",
              explain:
                "İlan saatleri veriyor: «Monday to Thursday, 15.00 to 17.00», üstelik ücretsiz ve kayıt gerekmiyor.",
            },
          ],
        },
        {
          id: "en-a2-12-l3",
          no: 3,
          format: "mcq",
          goal: "detail",
          prompt: "Read the school newsletter and questions 11 to 14. Choose a, b or c.",
          promptTr: "Okul bültenini ve 11–14. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t3",
              genre: "School newsletter",
              genreTr: "Okul bülteni",
              title: "Why we send so many letters",
              body: `Parents tell us every year that we send too many letters, and we agree with them.

Here is why it happens. A letter goes out when the law says we must ask you, when we need money, or when a date changes. Last year that was forty-one letters.

We have tried two things. In 2022 we put everything on the website and stopped sending paper. Fewer than half of you looked at it, and the trip in June had eleven children instead of sixty.

Now we do something different. There is one paper letter a week, always on Friday, always the same colour. Everything for that week is on it. If nothing is happening, we still send it and it says so.

The number of letters has not gone down. What has changed is that there is one place to look, and the June trip last year had fifty-eight children.

We know that Friday is not a good day for everybody. Tell us at the parents' evening and we will change it.`,
              gloss: [
                { de: "a newsletter", tr: "bülten", en: "newsletter" },
                { de: "a trip", tr: "gezi", en: "trip" },
                { de: "the same colour", tr: "aynı renk", en: "same colour" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-12-l3-11",
              no: 11,
              text: "Why does the school send letters?",
              options: ["Because parents keep asking for them", "Because the law or a date requires it", "Because the website does not work properly"],
              answer: 1,
              explain:
                "Bülten üç sebebi sayıyor: «when the law says we must ask you, when we need money, or when a date changes».",
            },
            {
              kind: "mcq",
              id: "en-a2-12-l3-12",
              no: 12,
              text: "What happened in 2022?",
              options: ["Almost nobody read the information", "The trip cost more than usual", "The school sent even more letters"],
              answer: 0,
              explain:
                "Bülten sonucu sayıyla veriyor: «Fewer than half of you looked at it, and the trip in June had eleven children instead of sixty».",
            },
            {
              kind: "mcq",
              id: "en-a2-12-l3-13",
              no: 13,
              text: "What is different now?",
              options: ["There are fewer letters", "The letters come by email", "Everything is in one place"],
              answer: 2,
              explain:
                "Bülten yeni düzeni tarif ediyor: «one paper letter a week, always on Friday … Everything for that week is on it», ve kazancı adlandırıyor: «there is one place to look». Mektup sayısı azalmamış.",
            },
            {
              kind: "mcq",
              id: "en-a2-12-l3-14",
              no: 14,
              text: "What does the school ask parents to do?",
              options: ["Look at the website every Friday", "Say if Friday is bad", "Pay for the trip much earlier"],
              answer: 1,
              explain:
                "Son satır bir rica taşıyor: «Tell us at the parents' evening and we will change it».",
            },
          ],
        },
        {
          id: "en-a2-12-l4",
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
              title: "Forty-one letters",
              body: `Our son started school in 2021, and here is what I {{15}}.

The first year was {{16}} than I expected. Not the school itself — the paper.

I read every letter twice, {{17}} I still missed the day for the photographs.

Next month I {{18}} put a big calendar in the kitchen, and everything goes on it.

And one more thing: {{19}} a letter comes, write the date on it at once. In June nobody remembers May.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-12-l4-15",
              no: 15,
              text: "Gap 15",
              options: ["learned", "learn", "learning"],
              answer: 0,
              explain:
                "Cümlenin ilk yarısı kapanmış bir olayı anlatıyor: «Our son started school in 2021». Öğrenme de geçmişe ait: `learned`.",
            },
            {
              kind: "mcq",
              id: "en-a2-12-l4-16",
              no: 16,
              text: "Gap 16",
              options: ["hard", "the hardest", "harder"],
              answer: 2,
              explain:
                "Boşluktan sonra `than` var ve `than` karşılaştırma derecesi ister: `harder`. `the hardest` en üstünlük derecesidir ve `than` almaz.",
            },
            {
              kind: "mcq",
              id: "en-a2-12-l4-17",
              no: 17,
              text: "Gap 17",
              options: ["so", "but", "because"],
              answer: 1,
              explain:
                "İki bilgi karşıt: her mektubu iki kez okumuş ama yine de bir günü kaçırmış. Karşıtlığı `but` kurar.",
            },
            {
              kind: "mcq",
              id: "en-a2-12-l4-18",
              no: 18,
              text: "Gap 18",
              options: ["am going to", "went to", "goes to"],
              answer: 0,
              explain:
                "Zaman belirteci `Next month`, yani gelecek; planlanmış bir gelecek `am going to + fiil` ile kurulur.",
            },
            {
              kind: "mcq",
              id: "en-a2-12-l4-19",
              no: 19,
              text: "Gap 19",
              options: ["so", "because", "when"],
              answer: 2,
              explain:
                "Cümle bir durumu öğüde bağlıyor: mektup geldiği zaman tarihi üstüne yaz. `when` bu zamanı verir.",
            },
          ],
        },
        {
          id: "en-a2-12-l5",
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
              title: "Three children, one school",
              body: `Our school was built {{20}} 1968 and the hall is still the same.

We have lived in this street {{21}} nine years.

The new letters are shorter {{22}} the old ones.

The parents' evening is always {{23}} a Tuesday.

I have three children at the school and I still {{24}} not know all the teachers.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a2-12-l5-20",
              no: 20,
              text: "Gap 20",
              accept: ["in"],
              explain:
                "Yıllarla `in` kullanılır: `in 1968`. `on` belirli bir gün için, `at` ise saat için gelir.",
            },
            {
              kind: "gap",
              id: "en-a2-12-l5-21",
              no: 21,
              text: "Gap 21",
              accept: ["for"],
              explain:
                "Süre uzunluğu `for` ile verilir: `for nine years`. `since` bir başlangıç noktası ister, süre değil.",
            },
            {
              kind: "gap",
              id: "en-a2-12-l5-22",
              no: 22,
              text: "Gap 22",
              accept: ["than"],
              explain:
                "`shorter` bir karşılaştırma biçimidir ve karşılaştırılan şey `than` ile bağlanır.",
            },
            {
              kind: "gap",
              id: "en-a2-12-l5-23",
              no: 23,
              text: "Gap 23",
              accept: ["on"],
              explain:
                "Gün adlarıyla `on` kullanılır: `on a Tuesday`. `in` ay ve yıl için, `at` ise saat için gelir.",
            },
            {
              kind: "gap",
              id: "en-a2-12-l5-24",
              no: 24,
              text: "Gap 24",
              accept: ["do"],
              explain:
                "Geniş zamanın olumsuzu `do not + yalın fiil` ile kurulur ve özne birinci tekil kişi: «I still do not know».",
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
          id: "en-a2-12-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "You hear five short conversations, questions 1 to 5. Choose a, b or c. You hear every recording twice.",
          promptTr: "Beş kısa konuşma dinleyeceksin, 1–5. maddeler. a, b ya da c'yi seç. Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Phone message",
              genreTr: "Telefon iletisi",
              situation: "Okul bir veliye ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello Mrs Roth, this is the school office. The parents' evening is now on Wednesday, not on Tuesday. The time is the same: six to eight." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Between parents",
              genreTr: "Veliler arasında",
              situation: "İki veli gezinin ödemesini konuşuyor.",
              plays: 2,
              segments: [
                { text: "Did you pay for the trip?" },
                { text: "Not yet. When is the last day?" },
                { text: "The fifth." },
                { text: "Then I have three days." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "At the school office",
              genreTr: "Okul idaresinde",
              situation: "Bir anne devamsızlığı bildiriyor.",
              plays: 2,
              segments: [
                { text: "My son was ill on Monday and Tuesday." },
                { text: "We need one line from you, with the dates." },
                { text: "Can I write it now?" },
                { text: "Please do." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Announcement",
              genreTr: "Duyuru",
              situation: "Okulda yüzme için anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "A short message about swimming. It starts on the fourteenth of September, every Thursday. Children need a towel and a hat. Hats are four euros at the office." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Phone message",
              genreTr: "Telefon iletisi",
              situation: "Bir veli başka bir veliden yardım istiyor.",
              plays: 2,
              segments: [
                { text: "Hi Petra, it is Mirek. I cannot come to the parents' evening on Wednesday. Can you ask the mathematics teacher about the extra lessons for me?" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-12-h1-1",
              no: 1,
              ref: "a1",
              text: "What has changed?",
              options: ["The time", "The day", "The room"],
              answer: 1,
              explain:
                "İleti günü değiştiriyor: «now on Wednesday, not on Tuesday». Saat aynı kalıyor: «six to eight».",
            },
            {
              kind: "mcq",
              id: "en-a2-12-h1-2",
              no: 2,
              ref: "a2",
              text: "What does the second parent learn?",
              options: ["The last day is the fifth", "The trip is cancelled", "The price has gone up"],
              answer: 0,
              explain:
                "Konuşma son günü veriyor: «The fifth», ve veli «Then I have three days» diyerek hesabını yapıyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-12-h1-3",
              no: 3,
              ref: "a3",
              text: "What must the mother do?",
              options: ["Telephone again tomorrow", "Bring a paper from the doctor", "Write a short letter now"],
              answer: 2,
              explain:
                "Görevli isteği veriyor: «We need one line from you, with the dates», ve anne hemen yazabiliyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-12-h1-4",
              no: 4,
              ref: "a4",
              text: "What do children need?",
              options: ["Only a towel from home", "A hat too", "Four euros for every lesson"],
              answer: 1,
              explain:
                "Anons iki şey sayıyor: «Children need a towel and a hat». Dört euro yalnız bonenin fiyatı.",
            },
            {
              kind: "mcq",
              id: "en-a2-12-h1-5",
              no: 5,
              ref: "a5",
              text: "What does Mirek want?",
              options: ["To change the day", "To pay for the lessons", "Petra to ask a question"],
              answer: 2,
              explain:
                "İleti ricayı açıkça veriyor: «Can you ask the mathematics teacher about the extra lessons for me?»",
            },
          ],
        },
        {
          id: "en-a2-12-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear information about a parents' evening. Complete the notes, questions 6 to 10. Write ONE or TWO words or a number in each gap. You hear the information twice.",
          promptTr:
            "Bir veli toplantısı hakkında bilgi dinleyeceksin. 6–10. maddelerdeki notları tamamla. Her boşluğa BİR ya da İKİ sözcük veya bir sayı yaz. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Information",
              genreTr: "Bilgilendirme",
              situation: "Okul görevlisi veli toplantısını anlatıyor.",
              plays: 2,
              segments: [
                {
                  text: "Good evening. The parents' evening is on Wednesday the twenty-second, from six to eight. You have ten minutes with each teacher and you can see two teachers. Please write your name on the list in the hall by Monday. If you cannot come, ring the office on 6640 and we will find another time.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notes",
              genreTr: "Not kâğıdı",
              title: "Parents' evening — notes",
              body: `Date:                    Wednesday the {{6}}
It starts at:            {{7}}
Minutes with each teacher: {{8}}
Write your name by:      {{9}}
If you cannot come, ring: {{10}}`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a2-12-h2-6",
              no: 6,
              ref: "b1",
              text: "Gap 6",
              accept: ["22", "twenty-second", "22nd"],
              explain:
                "Kayıt «on Wednesday the twenty-second» diyor. Not kâğıdında `Wednesday the` basılı olduğu için boşluğa yalnız gün yazılır.",
            },
            {
              kind: "gap",
              id: "en-a2-12-h2-7",
              no: 7,
              ref: "b1",
              text: "Gap 7",
              accept: ["6", "six"],
              explain:
                "«from six to eight» — başlama saati. Sekiz bitiş saati; not kâğıdı başlangıcı soruyor.",
            },
            {
              kind: "gap",
              id: "en-a2-12-h2-8",
              no: 8,
              ref: "b1",
              text: "Gap 8",
              accept: ["10", "ten"],
              explain:
                "«You have ten minutes with each teacher» — öğretmen başına süre. İki ise görülebilecek öğretmen sayısı.",
            },
            {
              kind: "gap",
              id: "en-a2-12-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["monday"],
              explain:
                "«write your name on the list in the hall by Monday» — son gün. Çarşamba toplantının kendi günü.",
            },
            {
              kind: "gap",
              id: "en-a2-12-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["6640"],
              explain:
                "«ring the office on 6640» — gelemeyenler için verilen numara.",
            },
          ],
        },
        {
          id: "en-a2-12-h3",
          no: 3,
          format: "mcq",
          goal: "gist",
          prompt: "You hear five short speakers, questions 11 to 15. What is each person doing? You hear every recording twice.",
          promptTr: "Beş kısa konuşmacı dinleyeceksin, 11–15. maddeler. Her kişi ne yapıyor? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Bir veli kaçırdığı bir mektubu anlatıyor.",
              plays: 2,
              segments: [
                { text: "Forty-one letters last year and I read all of them. Then I missed the photographs, which was the one letter my daughter cared about. She is nine and she still mentions it." },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "Announcement",
              genreTr: "Duyuru",
              situation: "Okulda yüzme dersi anonsu yapılıyor.",
              plays: 2,
              segments: [
                { text: "The swimming starts on Thursday. Children who cannot swim are in the second group with two teachers. Nobody has to swim in the deep water on the first day." },
              ],
            },
            {
              kind: "audio",
              id: "c3",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Bir veli yaygın bir yargıyı ele alıyor.",
              plays: 2,
              segments: [
                { text: "People say that parents do not read letters. We read them. What we cannot do is read forty-one of them and remember which one had the date for the trip. That is a different problem." },
              ],
            },
            {
              kind: "audio",
              id: "c4",
              genre: "Phone call",
              genreTr: "Telefon görüşmesi",
              situation: "Bir veli toplantı saatini soruyor.",
              plays: 2,
              segments: [
                { text: "Yes, hello, this is about Wednesday. I work until seven and the parents' evening ends at eight. Is there a teacher who can see me at half past seven?" },
              ],
            },
            {
              kind: "audio",
              id: "c5",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Bir veli bulduğu çözümü anlatıyor.",
              plays: 2,
              segments: [
                { text: "I put every letter on the fridge for two years, and the fridge was full and nothing was found. Now there is one page and I write the dates on it. It took me two years to think of a page." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-12-h3-11",
              no: 11,
              ref: "c1",
              text: "What is the speaker doing?",
              options: ["Admitting a mistake", "Complaining about the school", "Explaining a new system"],
              answer: 0,
              explain:
                "Konuşmacı kendi kusurunu anlatıyor: kırk bir mektubu okumuş ama «I missed the photographs», ve kızı hâlâ bundan söz ediyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-12-h3-12",
              no: 12,
              ref: "c2",
              text: "What does the announcement do?",
              options: ["Ask parents to pay", "Tell parents what happens", "Change the day of the lesson"],
              answer: 1,
              explain:
                "Anons yalnız bilgi veriyor: «The swimming starts on Thursday», grup düzeni ve «Nobody has to swim in the deep water on the first day». Para istenmiyor, gün de değişmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-12-h3-13",
              no: 13,
              ref: "c3",
              text: "What is the speaker doing?",
              options: ["Agreeing with the school", "Asking for fewer trips", "Correcting a common idea"],
              answer: 2,
              explain:
                "Konuşmacı yaygın yargıyı anıp çürütüyor: «People say that parents do not read letters. We read them», sorun sayıyı hatırlamak.",
            },
            {
              kind: "mcq",
              id: "en-a2-12-h3-14",
              no: 14,
              ref: "c4",
              text: "Why is the woman calling?",
              options: ["To ask for a late time", "To cancel her place", "To ask about the price"],
              answer: 0,
              explain:
                "Arayan saatini gerekçesiyle veriyor: yediye kadar çalışıyor ve «Is there a teacher who can see me at half past seven?» diye soruyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-12-h3-15",
              no: 15,
              ref: "c5",
              text: "What is the speaker doing?",
              options: ["Recommending the fridge", "Describing a simple solution", "Complaining about the letters"],
              answer: 1,
              explain:
                "Konuşmacı iki yılın sonunda bulduğu düzeni anlatıyor: «Now there is one page and I write the dates on it».",
            },
          ],
        },
        {
          id: "en-a2-12-h4",
          no: 4,
          format: "match",
          goal: "detail",
          prompt:
            "You hear five parents, questions 16 to 20. What does each parent want? Choose from a to h. You use each answer once only. You hear the recordings twice.",
          promptTr:
            "Beş veli dinleyeceksin, 16–20. maddeler. Her veli ne istiyor? a'dan h'ye seç. Her seçenek en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "A different day for the meeting." },
            { key: "b", label: "Help with paying." },
            { key: "c", label: "Extra lessons for the child." },
            { key: "d", label: "A place on the school bus." },
            { key: "e", label: "Somebody to ask a question for them." },
            { key: "f", label: "A later time on the same evening." },
            { key: "g", label: "Fewer letters from the school." },
            { key: "h", label: "Food at school for the child." },
          ],
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Speaker 1",
              genreTr: "Birinci konuşmacı",
              situation: "Birinci veli çalışma saatini anlatıyor.",
              plays: 2,
              segments: [
                { text: "I finish at seven and the evening ends at eight. I am not asking for another day; I am asking whether one teacher can stay twenty minutes." },
              ],
            },
            {
              kind: "audio",
              id: "d2",
              genre: "Speaker 2",
              genreTr: "İkinci konuşmacı",
              situation: "İkinci veli gezinin ücretini anlatıyor.",
              plays: 2,
              segments: [
                { text: "The trip is eighteen euros and there are three of them in the school. I read that we should write to the office, and I have started the letter four times." },
              ],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü veli kızının bir dersini anlatıyor.",
              plays: 2,
              segments: [
                { text: "She is fine in everything except mathematics, and she has decided that she is bad at it. Two afternoons a week with four other children would cost us twelve an hour." },
              ],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Speaker 4",
              genreTr: "Dördüncü konuşmacı",
              situation: "Dördüncü veli oğlunun öğleden sonrasını anlatıyor.",
              plays: 2,
              segments: [
                { text: "He comes home at half past three and eats bread standing at the fridge. Three euros twenty a day is less than I spend on the bread, and it is warm." },
              ],
            },
            {
              kind: "audio",
              id: "d5",
              genre: "Speaker 5",
              genreTr: "Beşinci konuşmacı",
              situation: "Beşinci veli o hafta şehir dışında olacağını anlatıyor.",
              plays: 2,
              segments: [
                { text: "I am in Poland that week. My husband does not speak enough English to ask about the extra lessons, so I have written the question on a card for him." },
              ],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-a2-12-h4-16",
              no: 16,
              ref: "d1",
              text: "Speaker 1",
              answer: "f",
              explain:
                "Veli isteğini karşıtıyla veriyor: «I am not asking for another day; I am asking whether one teacher can stay twenty minutes».",
            },
            {
              kind: "match",
              id: "en-a2-12-h4-17",
              no: 17,
              ref: "d2",
              text: "Speaker 2",
              answer: "b",
              explain:
                "Veli tutarı ve çocuk sayısını veriyor: «The trip is eighteen euros and there are three of them in the school», ve çözümü biliyor: «we should write to the office».",
            },
            {
              kind: "match",
              id: "en-a2-12-h4-18",
              no: 18,
              ref: "d3",
              text: "Speaker 3",
              answer: "c",
              explain:
                "Veli dersi ve ücreti veriyor: «Two afternoons a week with four other children would cost us twelve an hour».",
            },
            {
              kind: "match",
              id: "en-a2-12-h4-19",
              no: 19,
              ref: "d4",
              text: "Speaker 4",
              answer: "h",
              explain:
                "Veli fiyatı ekmekle karşılaştırıyor: «Three euros twenty a day is less than I spend on the bread, and it is warm».",
            },
            {
              kind: "match",
              id: "en-a2-12-h4-20",
              no: 20,
              ref: "d5",
              text: "Speaker 5",
              answer: "e",
              explain:
                "Veli kendisi gelemiyor ve eşi soramıyor: «I have written the question on a card for him».",
            },
          ],
        },
      ],
    },

    /* ── WRITING ───────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 30,
      instruction: "This part has two tasks: you write a short letter and a text about something you forgot.",
      instructionTr: "Bu bölümde iki görev var: kısa bir mektup ve unuttuğun bir şey üzerine bir metin yazacaksın.",
      tasks: [
        {
          id: "en-a2-12-w1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "Your child was not at school for two days. Write a short letter to the school. Write about 50 words. Answer all three points.",
          promptTr:
            "Çocuğun iki gün okula gitmedi. Okula kısa bir mektup yaz. Yaklaşık 50 kelime. Üç maddenin hepsine cevap ver.",
          items: [],
          rubric: {
            minWords: 50,
            points: [
              { de: "Say which days the child was away.", tr: "Çocuğun hangi günler gelmediğini söyle." },
              { de: "Say why.", tr: "Nedenini söyle." },
              { de: "Say what you will do about the homework.", tr: "Ödevle ilgili ne yapacağını söyle." },
            ],
            sample: `Dear Mrs Kral,

Veli was not at school on Monday 4 and Tuesday 5 March.

He had a temperature on Sunday evening and the doctor said he must stay at home for two days.

He is better now. I will ask Rina's mother for the homework this evening, and he will bring it on Thursday.

Yours,
Petra Roth`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi? Biri eksikse metin tam sayılmaz.",
              "Günler tarihiyle mi verildi?",
              "Neden somut mu?",
              "Ödev için somut bir plan verildi mi?",
              "Yaklaşık 50 kelime yazıldı mı? Hitap ve veda var mı?",
            ],
          },
        },
        {
          id: "en-a2-12-w2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Write a short text about a letter or a message that you forgot. Say what it was, what happened and what you do now. Write about 60 words.",
          promptTr:
            "Unuttuğun bir mektubu ya da iletiyi anlat. Ne olduğunu, ne olduğunu ve şimdi ne yaptığını yaz. Yaklaşık 60 kelime.",
          items: [],
          rubric: {
            minWords: 60,
            points: [
              { de: "Say what the letter or message was.", tr: "Mektubun ya da iletinin ne olduğunu söyle." },
              { de: "Say what happened.", tr: "Ne olduğunu söyle." },
              { de: "Say what you do now.", tr: "Şimdi ne yaptığını söyle." },
            ],
            sample: `Two years ago the school sent a letter about the photographs. I put it in my bag and I found it in July. My daughter was the only child in her class without a photograph, and she was eight and she cried in the car. Now every letter goes on one page on the kitchen door, and I write the date on it in red.`,
            criteria: [
              "Üç içerik noktasının üçü de var mı?",
              "Geçmiş zaman doğru kullanıldı mı? Düzensiz fiiller (sent, put, found) doğru mu?",
              "Sonuç somut mu anlatıldı?",
              "Şimdiki uygulama geçmişle karşıtlık kuruyor mu?",
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
          id: "en-a2-12-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about school, letters and dates. Answer in full sentences.",
          promptTr: "Sana okul, mektuplar ve tarihler hakkında sorular soracağım. Tam cümlelerle cevap ver.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good afternoon. How do you remember important dates?", tr: "İyi günler. Önemli tarihleri nasıl hatırlıyorsun?" },
            { who: "you", hint: "Yöntemini anlat ve bir örnek ver.", expect: "bir alışkanlığı örnekle anlatmak", seconds: 30 },
            { who: "partner", de: "Thank you. Is paper or a telephone better for this? Why?", tr: "Teşekkürler. Bunun için kâğıt mı telefon mu daha iyi? Neden?" },
            { who: "you", hint: "Tercihini söyle ve bir gerekçe ver.", expect: "bir tercihi gerekçesiyle bildirmek", seconds: 30 },
            { who: "partner", de: "Interesting. Tell me about a time you forgot something important.", tr: "İlginç. Önemli bir şeyi unuttuğun bir zamanı anlat." },
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
              "I write everything on a calendar in the kitchen, and I look at it when I make coffee. I think paper is better, because the telephone shows me the date and then I close it and it is gone. Last year I forgot my sister's birthday. I remembered it on the bus at seven in the evening and I bought flowers at the station.",
            criteria: [
              "Cevaplar tek sözcük değil, tam cümle mi?",
              "Tercih bir gerekçeyle mi verildi? (because …)",
              "Son soruda geçmiş zaman doğru kuruldu mu?",
              "Zaman ifadeleri kullanıldı mı?",
            ],
          },
        },
        {
          id: "en-a2-12-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Describe this situation for about one minute: a school hall on a parents' evening. Six adults are waiting on chairs along the wall and a teacher is sitting at a small table with a parent. On the wall there is a list with names on it. Say what you see, what the people are doing, and whether you like meetings like this.",
          promptTr:
            "Şu durumu bir dakika kadar anlat: veli toplantısında bir okul salonu. Duvar boyunca sandalyelerde altı yetişkin bekliyor; bir öğretmen küçük bir masada bir veliyle oturuyor. Duvarda adların yazılı olduğu bir liste var. Ne gördüğünü, insanların ne yaptığını ve böyle toplantıları sevip sevmediğini söyle.",
          prepSeconds: 45,
          speakSeconds: 75,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "say what you see", tr: "Ne gördüğünü söyle" },
              { de: "say what the people are doing", tr: "İnsanların ne yaptığını söyle" },
              { de: "say if you like meetings like this", tr: "Böyle toplantıları sevip sevmediğini söyle" },
            ],
            sample:
              "This is a school hall on a parents' evening. Along the wall six adults are sitting on chairs and waiting. In the middle a teacher is sitting at a small table and she is talking to a mother. On the wall on the left there is a list with names on it, and a man is standing in front of it and looking for his name. I do not really like meetings like this, because ten minutes is very short and everybody is listening.",
            criteria: [
              "Şimdiki zaman (present continuous) kullanıldı mı? Bu görevin ana yapısı bu.",
              "Üç içerik noktasının üçü de işlendi mi?",
              "Yer bildiren ifadeler var mı? (along the wall, in the middle, in front of)",
              "Görüş bir gerekçeyle mi verildi?",
            ],
          },
        },
        {
          id: "en-a2-12-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "The school can change one thing for parents next year. Talk with me about the ideas and choose one together.",
          promptTr:
            "Okul gelecek yıl veliler için tek bir şeyi değiştirebiliyor. Fikirleri benimle konuş ve birlikte birini seç.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "Here are three ideas: one letter a week instead of many, a parents' evening on two days instead of one, or a person in the office who telephones families who do not answer. What do you think about the weekly letter?", tr: "Üç fikir var: çok sayıda mektup yerine haftada bir mektup, bir gün yerine iki güne yayılmış veli toplantısı ya da cevap vermeyen aileleri arayan bir görevli. Haftalık mektup hakkında ne düşünüyorsun?" },
            { who: "you", hint: "Haftalık mektup fikri hakkında görüşünü söyle ve bir gerekçe ver.", expect: "bir fikir hakkında görüş bildirmek ve gerekçelendirmek", seconds: 35 },
            { who: "partner", de: "I see. But some families do not read anything on paper, and one letter a week does not help them. Does that change anything?", tr: "Anlıyorum. Ama bazı aileler kâğıt üzerinde hiçbir şey okumuyor ve haftada bir mektup onlara yardımcı olmuyor. Bu bir şey değiştirir mi?" },
            { who: "you", hint: "Karşı tarafın söylediğine gönderme yap ve katıl ya da karşı çık.", expect: "karşı tarafın söylediğine açıkça gönderme yaparak katılmak ya da karşı çıkmak", seconds: 35 },
            { who: "partner", de: "All right. So what do we choose?", tr: "Peki. Hangisini seçiyoruz?" },
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
              "The weekly letter is good for me, because there is one place to look and I do not lose the dates. You are right that it does not help a family who never opens paper; my neighbour is exactly that family. So let us choose the person who telephones, because that reaches everybody, and the school can send the weekly letter as well; it costs nothing extra.",
            criteria: [
              "Görüş bir gerekçeyle mi verildi? (because …)",
              "Karşı tarafın söylediğine gönderme yapıldı mı? (You are right … / That is true …)",
              "Sonunda ortak bir karara varıldı mı?",
              "Sayı ve sıklık ifadeleri doğru kullanıldı mı?",
            ],
          },
        },
      ],
    },
  ],
};
