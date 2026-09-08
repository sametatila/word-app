import type { MockPaper } from "../types";

/**
 * B1 · Deneme 8 — "Phones, Attention and Learning".
 *
 * B1'in öteki denemeleriyle AYNI PLAN; konu ayrı. Dikkat ve öğrenme B1'de
 * verimli çünkü kişisel deneyim, ölçüm ve çekince aynı metinde yan yana
 * durabiliyor; yedinci denemedeki gönüllülük malzemesiyle tek bir sözcük
 * kümesini paylaşmıyor.
 *
 * Metinlerin mimarisi bilerek yedinciden ayrı: üçüncü görev kendi üstünde
 * yapılmış küçük bir deney (sonuç + çekince), dördüncü görev veri değil
 * tartışma yürütüyor, dinlemedeki söyleşi ise uzman değil özne konuşuyor.
 * Bir seviyede sekiz kâğıt biriktiğinde asıl risk konu değil, her metnin
 * aynı retorik iskeletle kurulması.
 */
export const EN_B1_08: MockPaper = {
  id: "en-b1-08",
  course: "en",
  level: "B1",
  no: 8,
  theme: "Phones, Attention and Learning",
  themeTr: "Telefon, dikkat ve öğrenme",
  minutes: 155,
  parts: [
    /* ── READING ───────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 55,
      instruction:
        "This part has six tasks. You read short texts, adverts, an article and three texts with gaps. Choose the correct answer for each question.",
      instructionTr:
        "Bu bölümde altı görev var. Kısa metinler, ilanlar, bir yazı ve boşluklu üç metin okuyacaksın. Her soruda doğru cevabı işaretle.",
      tasks: [
        {
          id: "en-b1-08-l1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Read the five texts and questions 1 to 5. Choose a, b or c.",
          promptTr: "Beş metni ve 1–5. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "m1",
              genre: "Notice",
              genreTr: "Duyuru",
              title: "The quiet room",
              body: `The quiet room is open from eight until midnight, every day. Phones must be on silent, and not face down on the table. If you need to take a call, the corridor is three metres away. We do not ask anybody to leave for a first phone call; we do ask for the second.`,
            },
            {
              kind: "text",
              id: "m2",
              genre: "Email",
              genreTr: "E-posta",
              title: "From September",
              body: `Dear parents, from September phones go into a box at the door of every classroom and come out at the end of the lesson. This is not a punishment and it is not about trust. We tried asking the students to leave them in their bags, and that worked for about nine days.`,
            },
            {
              kind: "text",
              id: "m3",
              genre: "Message",
              genreTr: "İleti",
              title: "Seven to nine",
              body: `Mira, from now on I am turning my phone off between seven and nine every evening. If something is urgent, ring the flat phone; the number is on the fridge. Please do not read anything into this. It is not about you and I am not annoyed with anybody.`,
            },
            {
              kind: "text",
              id: "m4",
              genre: "Course notice",
              genreTr: "Kurs duyurusu",
              title: "What to bring",
              body: `Bring a notebook and a pen. We know that typing is faster; that is the problem. On this course you write by hand, badly and slowly, and we spend the last ten minutes of every session comparing what different people wrote down.`,
            },
            {
              kind: "text",
              id: "m5",
              genre: "Email",
              genreTr: "E-posta",
              title: "Messages in the evening",
              body: `From Monday, nobody is expected to answer a message after six or before eight. If you like working in the evening, that is your business, but put the message in the box that sends it in the morning. Nobody should learn at ten at night that the rest of us are still working.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-08-l1-1",
              no: 1,
              ref: "m1",
              text: "What happens after a second phone call in the room?",
              options: ["The person pays a small charge", "The room is closed for the day", "The person is asked to go"],
              answer: 2,
              explain:
                "Duyurunun son cümlesi ilkini bağışlayıp ikincisini bağışlamıyor: «We do not ask anybody to leave for a first phone call; we do ask for the second».",
            },
            {
              kind: "mcq",
              id: "en-b1-08-l1-2",
              no: 2,
              ref: "m2",
              text: "Why has the school changed the rule?",
              options: ["The students asked for a box", "The earlier rule stopped working", "Parents complained about the phones"],
              answer: 1,
              explain:
                "E-posta önceki denemeyi ve ömrünü veriyor: «We tried asking the students to leave them in their bags, and that worked for about nine days».",
            },
            {
              kind: "mcq",
              id: "en-b1-08-l1-3",
              no: 3,
              ref: "m3",
              text: "What does the writer ask Mira to do?",
              options: ["Use another number in an emergency", "Stop sending messages after seven", "Ring later than nine o'clock"],
              answer: 0,
              explain:
                "İleti tek bir yönerge taşıyor: «If something is urgent, ring the flat phone; the number is on the fridge». İleti göndermek yasaklanmıyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-08-l1-4",
              no: 4,
              ref: "m4",
              text: "Why does the course ask for a pen?",
              options: ["There is no electricity in the room for typing", "A notebook is cheaper than a laptop", "Writing slowly is part of the method"],
              answer: 2,
              explain:
                "Duyuru hızı bir kusur olarak anıyor: «We know that typing is faster; that is the problem». Elektrik ya da fiyat gerekçe olarak hiç geçmiyor; defter zaten pahalılığı için değil, elle yazmak için isteniyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-08-l1-5",
              no: 5,
              ref: "m5",
              text: "What does the writer allow?",
              options: ["Answering a message the same evening", "Evening work, if the message waits", "Putting the work off until the next morning"],
              answer: 1,
              explain:
                "E-posta izni koşula bağlıyor: «If you like working in the evening, that is your business, but put the message in the box that sends it in the morning». Yani akşam çalışmak serbest, akşam cevap göndermek değil.",
            },
          ],
        },
        {
          id: "en-b1-08-l2",
          no: 2,
          format: "match",
          goal: "orientation",
          prompt:
            "Read about five people, 6 to 10. Then read the eight adverts a to h. Which one is right for each person? You use each advert once only.",
          promptTr:
            "6–10. maddelerdeki beş kişiyi oku. Sonra a'dan h'ye sekiz ilanı oku. Her kişiye hangisi uyar? Her ilan en fazla bir kez kullanılır.",
          options: [
            { key: "a", label: "Quiet Room", body: "Open eight until midnight, every day. Free with a library card. Phones on silent, no talking, no food." },
            { key: "b", label: "Study Skills: One Hour, One Person", body: "You bring two weeks of your own notes and somebody goes through them with you. Free, Thursday afternoons." },
            { key: "c", label: "Typing Course", body: "Six weeks, Tuesday evenings. Ten fingers and no looking at the keys. Twenty euros for the whole course." },
            { key: "d", label: "Spoken Books", body: "Thousands of titles read aloud. Listen in the car or in the kitchen. Free with a library card." },
            { key: "e", label: "Parents' Evening Group", body: "First Monday of the month. For parents of children aged ten to fourteen. No experts, only parents." },
            { key: "f", label: "Homework Club", body: "Monday to Thursday, four to seven, for children in years five to nine. Adults sit with them but do not do the work." },
            { key: "g", label: "Reading Aloud at the Primary School", body: "Volunteers needed for one hour a week. You read, the children listen and then they read to you." },
            { key: "h", label: "Repair Evening", body: "First Thursday of the month. Phones, radios and small machines. We tell you the price before we start." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b1-08-l2-6",
              no: 6,
              text: "Nadia wants to study in the evening but her flat is noisy and she has no money for a café.",
              answer: "a",
              explain:
                "İlan üç koşulu birden karşılıyor: «Open eight until midnight», «Free with a library card» ve «no talking». Ücretsizlik burada belirleyici.",
            },
            {
              kind: "match",
              id: "en-b1-08-l2-7",
              no: 7,
              text: "Ondrej reads slowly and would like to get through more books while he drives to work.",
              answer: "d",
              explain:
                "İlan tam bu durumu anıyor: «Listen in the car or in the kitchen». Okumak yerine dinlemek sürüş sırasında tek seçenek.",
            },
            {
              kind: "match",
              id: "en-b1-08-l2-8",
              no: 8,
              text: "Bexi wants her twelve-year-old to use a phone less and would like to talk to other parents.",
              answer: "e",
              explain:
                "İlan hem yaş aralığını hem kimin geldiğini veriyor: «For parents of children aged ten to fourteen. No experts, only parents». On iki bu aralığın içinde.",
            },
            {
              kind: "match",
              id: "en-b1-08-l2-9",
              no: 9,
              text: "Cato wants to learn to type properly because he is slow at work.",
              answer: "c",
              explain:
                "İlan yöntemi adlandırıyor: «Ten fingers and no looking at the keys», altı hafta. Tamir akşamı (h) telefonları onarıyor, yazmayı öğretmiyor.",
            },
            {
              kind: "match",
              id: "en-b1-08-l2-10",
              no: 10,
              text: "Lior wants somebody to look at the way he studies and tell him what he does wrong.",
              answer: "b",
              explain:
                "İlan işi tarif ediyor: «You bring two weeks of your own notes and somebody goes through them with you». Sessiz oda (a) yalnız yer veriyor, geri bildirim vermiyor.",
            },
          ],
        },
        {
          id: "en-b1-08-l3",
          no: 3,
          format: "mcq",
          goal: "opinion",
          prompt: "Read the article and questions 11 to 15. Choose a, b, c or d.",
          promptTr: "Yazıyı ve 11–15. maddeleri oku. a, b, c ya da d'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t3",
              genre: "Magazine article",
              genreTr: "Dergi yazısı",
              title: "Six weeks with a pen",
              body: `I did not read a study. I ran a small one on myself, badly, and the result still changed what I do.

For six weeks I typed my notes in lectures, and for six weeks I wrote them by hand. Same course, same room, same three lectures a week. At the end of each block I took the same kind of short test, set by a friend who did not know which block was which.

Typing was better in every way I could measure at the time. I got down almost every word. My notes were tidy, easy to search and about four times longer.

The test told a different story. I scored higher after the handwritten block, and not by a little. What I think happened is this: by hand I could only get about half of it, so I had to decide what mattered while the speaker was still talking. That deciding is the work.

I want to be careful here. Twelve weeks is nothing, I am one person, and I knew what I was hoping for. If somebody typed the same notes and then spent ten minutes cutting them in half, they would probably get the same result without the sore hand.

So I have not stopped typing. I type in meetings, where I need the record, and I write by hand in anything I want to remember in a year.`,
              gloss: [
                { de: "a lecture", tr: "ders, konferans", en: "lecture" },
                { de: "to measure", tr: "ölçmek", en: "measure" },
                { de: "sore", tr: "ağrılı", en: "sore" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-08-l3-11",
              no: 11,
              text: "What did the writer do?",
              options: [
                "She read several studies on the subject",
                "She compared two ways over twelve weeks",
                "She asked a friend to take notes for her",
                "She took the same test every single week",
              ],
              answer: 1,
              explain:
                "Yöntem ikinci paragrafta: «For six weeks I typed my notes in lectures, and for six weeks I wrote them by hand». Arkadaşın işi not tutmak değil, sınavı hazırlamak.",
            },
            {
              kind: "mcq",
              id: "en-b1-08-l3-12",
              no: 12,
              text: "What was better about the typed notes?",
              options: [
                "They took much less time to write",
                "They were much easier to remember",
                "They were shorter and a great deal clearer",
                "They were fuller and easier to search",
              ],
              answer: 3,
              explain:
                "Metin üstünlüğü sayıyor: «My notes were tidy, easy to search and about four times longer». Yani daha kısa değil, daha uzunlar.",
            },
            {
              kind: "mcq",
              id: "en-b1-08-l3-13",
              no: 13,
              text: "Why does the writer think handwriting worked better?",
              options: [
                "She had to choose what to write down",
                "Her hand hurt, so she paid more attention",
                "The lectures were slower in that block",
                "She read the notes more often afterwards",
              ],
              answer: 0,
              explain:
                "Yazar gerekçesini kendi adlandırıyor: «I had to decide what mattered while the speaker was still talking. That deciding is the work».",
            },
            {
              kind: "mcq",
              id: "en-b1-08-l3-14",
              no: 14,
              text: "What does the writer say about her own experiment?",
              options: [
                "It proves that typing is always a mistake",
                "The friend who set the test made an error",
                "It is too small to prove anything",
                "She would not be willing to run it again",
              ],
              answer: 2,
              explain:
                "Beşinci paragraf çekinceleri sıralıyor: «Twelve weeks is nothing, I am one person, and I knew what I was hoping for».",
            },
            {
              kind: "mcq",
              id: "en-b1-08-l3-15",
              no: 15,
              text: "What does she do now?",
              options: [
                "She writes absolutely everything by hand",
                "She has stopped taking notes altogether",
                "She types and then reads the notes twice",
                "She chooses the method to fit the situation",
              ],
              answer: 3,
              explain:
                "Son cümle ikisini de yerinde tutuyor: «I type in meetings, where I need the record, and I write by hand in anything I want to remember in a year».",
            },
          ],
        },
        {
          id: "en-b1-08-l4",
          no: 4,
          format: "match",
          goal: "structure",
          prompt:
            "Read the text. One sentence is missing from each of the gaps 16 to 20. Which sentence a to f fits which gap? One sentence fits nowhere.",
          promptTr:
            "Metni oku. 16–20. boşluklarda birer cümle eksik. a–f cümlelerinden hangisi hangi boşluğa uyar? Bir cümle hiçbir yere uymuyor.",
          texts: [
            {
              kind: "text",
              id: "t4",
              genre: "Magazine text",
              genreTr: "Dergi metni",
              title: "Does listening to a book count as reading?",
              body: `Somebody asks this question in our reading group about twice a year, and the answer they want is yes. {{16}}

The case for yes is strong. You take in the same sentences in the same order, and the person reading them aloud has usually thought harder about them than you would. {{17}}

The case for no is not about effort, and it is not about being serious. It is about control. When you read, you stop without noticing that you have stopped, go back four lines and start again. {{18}}

There is also the matter of what else you are doing. Almost nobody listens to a book and does nothing else at the same time. {{19}}

My own answer has changed. I used to say that the two were the same activity in different clothes, and I no longer think that. They are two activities that leave you with a similar feeling of having been somewhere. {{20}}`,
              gloss: [
                { de: "aloud", tr: "sesli olarak", en: "aloud" },
                { de: "control", tr: "denetim", en: "control" },
                { de: "an activity", tr: "etkinlik", en: "activity" },
              ],
            },
          ],
          options: [
            { key: "a", label: "a", body: "None of that is possible at walking speed with a voice in your ear." },
            { key: "b", label: "b", body: "Whether that counts as the same thing depends on what you wanted from the book, which is a better question than the one we started with." },
            { key: "c", label: "c", body: "The question is not a silly one, and the people who ask it are usually the ones doing most of the listening." },
            { key: "d", label: "d", body: "That is the honest difference: half of your attention is on the road, the washing-up or the dog." },
            { key: "e", label: "e", body: "For a difficult book that is not a small advantage, because a good reader hands you the shape of a sentence for nothing." },
            { key: "f", label: "f", body: "The reading group meets in the back room of a café that closes at nine, which is why we never finish." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b1-08-l4-16",
              no: 16,
              text: "Gap 16",
              answer: "c",
              explain:
                "Açılış cümlesi soruyu ve sorulma sıklığını veriyor: «about twice a year, and the answer they want is yes». (c) soruyu ciddiye alıp soranların kim olduğunu söylüyor, yani paragrafı kapatıyor.",
            },
            {
              kind: "match",
              id: "en-b1-08-l4-17",
              no: 17,
              text: "Gap 17",
              answer: "e",
              explain:
                "Paragraf sesli okuyanın metni daha çok düşündüğünü söylüyor; (e) «that is not a small advantage» ile tam o üstünlüğe gönderme yapıp gerekçelendiriyor.",
            },
            {
              kind: "match",
              id: "en-b1-08-l4-18",
              no: 18,
              text: "Gap 18",
              answer: "a",
              explain:
                "Önceki cümle okurken yapılanları sayıyor: durmak, «go back four lines and start again». (a) «None of that» ile o listeye gönderme yapıp dinlerken olanaksız olduğunu söylüyor.",
            },
            {
              kind: "match",
              id: "en-b1-08-l4-19",
              no: 19,
              text: "Gap 19",
              answer: "d",
              explain:
                "Paragraf aynı anda başka iş yapıldığını söylüyor; (d) o başka işleri adlandırıyor: «the road, the washing-up or the dog». (a) da bir olanaksızlık bildiriyor ama okuma denetimiyle ilgili, dikkat bölünmesiyle değil.",
            },
            {
              kind: "match",
              id: "en-b1-08-l4-20",
              no: 20,
              text: "Gap 20",
              answer: "b",
              explain:
                "Son cümle ikisinin ortak yanını veriyor: «a similar feeling of having been somewhere». (b) «Whether that counts as the same thing» ile oraya bağlanıp soruyu yeniden çerçeveliyor. (f) kafenin kapanış saatinden söz ediyor ve metinde okuma grubunun yeri hiç tartışılmıyor — hiçbir boşluğa uymayan cümle odur.",
            },
          ],
        },
        {
          id: "en-b1-08-l5",
          no: 5,
          format: "gapMcq",
          goal: "structure",
          prompt: "Read the text and complete gaps 21 to 25. Which word fits: a, b, c or d?",
          promptTr: "Metni oku ve 21–25. boşlukları tamamla. Hangi sözcük uyar: a, b, c ya da d?",
          texts: [
            {
              kind: "text",
              id: "t5",
              genre: "Advice text",
              genreTr: "Öğüt metni",
              title: "What I tell students about their phones",
              body: `Every year I am asked how to stop {{21}} at a phone while studying, and every year I give the same answer.

Do not try to use willpower. Willpower is what you have {{22}} the phone is in your pocket, and it runs out at about four in the afternoon.

Put the phone in another room. Students laugh at this {{23}} they try it, and then they tell me it was the only thing that worked.

If the phone has to stay with you because of a child or a job, say {{24}} loud which twenty minutes you will not look at it.

And do not measure the hours you spend. Measure {{25}} you finished, because that is what you actually wanted.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-08-l5-21",
              no: 21,
              text: "Gap 21",
              options: ["looking", "to look", "look", "looked"],
              answer: 0,
              explain:
                "`stop` fiilinden sonra bırakılan eylem `-ing` ile gelir: `stop looking`. `stop to look` «bakmak için durmak» demektir ve anlamı tam tersine çevirir.",
            },
            {
              kind: "mcq",
              id: "en-b1-08-l5-22",
              no: 22,
              text: "Gap 22",
              options: ["until", "since", "while", "unless"],
              answer: 2,
              explain:
                "Boşluk iki eşzamanlı durumu bağlıyor: telefon cepteyken sahip olduğun şey. `while` eşzamanlılığı verir; `until` bir sona, `since` bir başlangıca gönderir, `unless` ise koşulu olumsuzlar.",
            },
            {
              kind: "mcq",
              id: "en-b1-08-l5-23",
              no: 23,
              text: "Gap 23",
              options: ["so", "although", "unless", "until"],
              answer: 3,
              explain:
                "İki olay sırayla geliyor: önce gülüyorlar, deneyene kadar. `until` bu sınırı çizer; `so` sonuç, `although` karşıtlık bildirir ve `unless` koşulu olumsuzlar.",
            },
            {
              kind: "mcq",
              id: "en-b1-08-l5-24",
              no: 24,
              text: "Gap 24",
              options: ["up", "out", "on", "over"],
              answer: 1,
              explain:
                "`out loud` sesli söylemeyi anlatan yerleşik bir öbektir. `up`, `on` ve `over` bu öbeği kurmaz ve `loud` ile birleşmez.",
            },
            {
              kind: "mcq",
              id: "en-b1-08-l5-25",
              no: 25,
              text: "Gap 25",
              options: ["what", "that", "which", "who"],
              answer: 0,
              explain:
                "Boşluk `measure` fiilinin nesnesi olan bir ad cümleciği başlatıyor ve öncülü yok; bunu yalnız `what` yapar. `that` ve `which` bir öncüle bağlanır, `who` ise kişi ister.",
            },
          ],
        },
        {
          id: "en-b1-08-l6",
          no: 6,
          format: "gap",
          goal: "structure",
          prompt: "Read the text and complete gaps 26 to 30. Write ONE word in each gap.",
          promptTr: "Metni oku ve 26–30. boşlukları tamamla. Her boşluğa TEK bir sözcük yaz.",
          texts: [
            {
              kind: "text",
              id: "t6",
              genre: "Message to a group",
              genreTr: "Gruba ileti",
              title: "What I have kept",
              body: `I have been trying different ways of studying {{26}} January, and here is what I have kept.

I put the phone in another room, {{27}} sounds extreme until you try it.

I stopped counting hours. Hours are easy {{28}} count and they tell you nothing at all.

I write by hand in anything I want to remember {{29}} more than a week.

And I tell one person what I am going to do, {{30}} that I have to say it out loud.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b1-08-l6-26",
              no: 26,
              text: "Gap 26",
              accept: ["since"],
              explain:
                "Başlangıç noktası `since` ile verilir: `since January`. `for` bir süre uzunluğu ister (`for six months`), ay adı değil.",
            },
            {
              kind: "gap",
              id: "en-b1-08-l6-27",
              no: 27,
              text: "Gap 27",
              accept: ["which"],
              explain:
                "Virgülden sonra bütün bir cümleye gönderme yapan ilgi adılı gerekiyor; bunu `which` yapar. `that` virgüllü ilgi cümlesinde kullanılmaz, `who` ise kişi ister.",
            },
            {
              kind: "gap",
              id: "en-b1-08-l6-28",
              no: 28,
              text: "Gap 28",
              accept: ["to"],
              explain:
                "`easy` sıfatından sonra eylem mastarla gelir: `easy to count`. `for counting` de mümkün olurdu ama boşluk tek sözcük ve `for` tek başına bu kalıbı kurmaz.",
            },
            {
              kind: "gap",
              id: "en-b1-08-l6-29",
              no: 29,
              text: "Gap 29",
              accept: ["for"],
              explain:
                "Süre uzunluğu `for` ile verilir: `for more than a week`. Metnin başındaki `since January` bir başlangıç noktasıydı; ikisi karıştırılmamalı.",
            },
            {
              kind: "gap",
              id: "en-b1-08-l6-30",
              no: 30,
              text: "Gap 30",
              accept: ["so"],
              explain:
                "Amaç `so that` ile bildirilir ve boşluğa gelen sözcük `that` ile birleşir: «so that I have to say it out loud». `because` sebep bildirir, amaç değil.",
            },
          ],
        },
      ],
    },

    /* ── LISTENING ─────────────────────────────────────────────────────── */
    {
      skill: "listening",
      minutes: 35,
      instruction:
        "This part has four tasks. You hear short extracts, conversations, some information and an interview. You hear every recording twice.",
      instructionTr:
        "Bu bölümde dört görev var. Kısa parçalar, konuşmalar, bir bilgilendirme ve bir söyleşi dinleyeceksin. Her kaydı iki kez dinleyebilirsin.",
      tasks: [
        {
          id: "en-b1-08-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "You hear seven short extracts. Choose a, b or c. You hear every extract twice.",
          promptTr: "Yedi kısa parça dinleyeceksin. a, b ya da c'yi seç. Her parçayı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Phone message",
              genreTr: "Telefon iletisi",
              situation: "Okul velilere ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello, this is about the phone boxes. From Monday the boxes are at the classroom door and not at the school gate, so students keep their phones until the lesson starts. Nothing else changes. Ask your daughter to show you where the box is." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Between students",
              genreTr: "Öğrenciler arasında",
              situation: "İki öğrenci ders çalışma süresini konuşuyor.",
              plays: 2,
              segments: [
                { text: "How long did you study yesterday?" },
                { text: "Six hours." },
                { text: "Six?" },
                { text: "Well, I was at the desk for six hours. If you ask me what I finished, the answer is one page and a very clean desk." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Announcement",
              genreTr: "Duyuru",
              situation: "Kütüphanede sessiz oda için anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "A reminder about the quiet room: phones on silent, and not face down on the table. If you need to take a call, the corridor is three metres away and nobody minds. The room is open until midnight, as always." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Between colleagues",
              genreTr: "İş arkadaşları arasında",
              situation: "İki iş arkadaşı gece gelen bir iletiyi konuşuyor.",
              plays: 2,
              segments: [
                { text: "Did you see my message at eleven last night?" },
                { text: "I did, and I answered it at seven this morning." },
                { text: "You did not have to wait." },
                { text: "I know. But if I answer at midnight, you will answer at midnight, and then everybody does." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Short talk",
              genreTr: "Kısa konuşma",
              situation: "Bir konuşmacı dikkat üstüne konuşuyor.",
              plays: 2,
              segments: [
                { text: "People tell me they cannot concentrate any more and they blame the phone. I ask them one question: where is it now? Nine times out of ten it is on the table, face down, which they think is the same as away. It is in the room. That is what matters." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Phone call",
              genreTr: "Telefon görüşmesi",
              situation: "Biri yazma kursu için arıyor.",
              plays: 2,
              segments: [
                { text: "Is there a place on the typing course?" },
                { text: "The Tuesday one is full. There is a new group on Thursdays from the fourth." },
                { text: "Same teacher?" },
                { text: "Same teacher, same six weeks, and it is the same twenty euros." },
              ],
            },
            {
              kind: "audio",
              id: "a7",
              genre: "Phone message",
              genreTr: "Telefon iletisi",
              situation: "Biri randevusu için ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hi, it is about Thursday. I cannot come to the study-skills hour after all, because my shift has changed. Do not give the place away for good, though. Can I have the one in two weeks instead?" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-08-h1-1",
              no: 1,
              ref: "a1",
              text: "What has changed?",
              options: ["Where the phones are left", "Whether phones are allowed at all", "The lesson that the rule covers"],
              answer: 0,
              explain:
                "İleti tek değişikliği veriyor: «the boxes are at the classroom door and not at the school gate». Kural sürüyor: «Nothing else changes».",
            },
            {
              kind: "mcq",
              id: "en-b1-08-h1-2",
              no: 2,
              ref: "a2",
              text: "What is the second speaker admitting?",
              options: ["He did not go to the library", "He studied for less than an hour", "The hours do not show what he did"],
              answer: 2,
              explain:
                "Konuşmacı iki ölçüyü ayırıyor: «I was at the desk for six hours» ama bitirdiği «one page and a very clean desk».",
            },
            {
              kind: "mcq",
              id: "en-b1-08-h1-3",
              no: 3,
              ref: "a3",
              text: "What does the announcement ask people to do?",
              options: ["Leave their phones at the desk", "Take calls outside the room", "Leave the room before midnight"],
              answer: 1,
              explain:
                "Anons yeri gösteriyor: «If you need to take a call, the corridor is three metres away». Oda gece yarısına kadar açık.",
            },
            {
              kind: "mcq",
              id: "en-b1-08-h1-4",
              no: 4,
              ref: "a4",
              text: "Why did the second speaker wait until the morning?",
              options: ["To avoid setting an example", "Because the phone was switched off", "Because the message was not urgent"],
              answer: 0,
              explain:
                "Gerekçe zincirleme veriliyor: «if I answer at midnight, you will answer at midnight, and then everybody does». Telefonun kapalı olduğu söylenmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-08-h1-5",
              no: 5,
              ref: "a5",
              text: "What is the speaker's point?",
              options: ["People should get rid of their phones", "Concentration cannot really be learned", "A phone on the table is still present"],
              answer: 2,
              explain:
                "Konuşmacı yanılgıyı adlandırıyor: yüzü kapalı telefonu uzakta sanıyorlar, oysa «It is in the room. That is what matters».",
            },
            {
              kind: "mcq",
              id: "en-b1-08-h1-6",
              no: 6,
              ref: "a6",
              text: "What is different about the Thursday group?",
              options: ["The teacher", "The day", "The price"],
              answer: 1,
              explain:
                "Görevli aynı kalanları sayıyor: «Same teacher, same six weeks, and it is the same twenty euros». Geriye yalnız gün farkı kalıyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-08-h1-7",
              no: 7,
              ref: "a7",
              text: "What does the speaker want?",
              options: ["A later appointment", "To cancel completely", "To change the time on Thursday"],
              answer: 0,
              explain:
                "İleti yerini bırakmıyor, erteliyor: «Do not give the place away for good, though. Can I have the one in two weeks instead?»",
            },
          ],
        },
        {
          id: "en-b1-08-h2",
          no: 2,
          format: "mcq",
          goal: "gist",
          prompt: "You hear six short conversations. What is the main point? Choose a, b or c. You hear every conversation twice.",
          promptTr: "Altı kısa konuşma dinleyeceksin. Ana nokta nedir? a, b ya da c'yi seç. Her konuşmayı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki arkadaş okumaktan söz ediyor.",
              plays: 2,
              segments: [
                { text: "I read forty pages last night." },
                { text: "That is a lot for you." },
                { text: "It is. The only thing I changed was leaving the phone in the kitchen. I have been telling myself for a year that I am too tired to read." },
              ],
            },
            {
              kind: "audio",
              id: "b2",
              genre: "Between parents",
              genreTr: "Veliler arasında",
              situation: "İki veli okulun yeni kuralını konuşuyor.",
              plays: 2,
              segments: [
                { text: "The school takes the phones in now." },
                { text: "And?" },
                { text: "My son says the first week was terrible and the fourth week was normal." },
                { text: "So it worked." },
                { text: "He also says nobody talks about it any more, which is the part I did not expect." },
              ],
            },
            {
              kind: "audio",
              id: "b3",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Radyoda bir dinleyici görüş bildiriyor.",
              plays: 2,
              segments: [
                { text: "I am not against listening to books. I listened to nine last year and I could tell you what happens in all of them. What I cannot do is stop and read a sentence twice, and for some books that is the whole point." },
              ],
            },
            {
              kind: "audio",
              id: "b4",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Sunucu bir yılını telefonsuz geçiren kişiyle konuşuyor.",
              plays: 2,
              segments: [
                { text: "You went a whole year without a smartphone." },
                { text: "I did." },
                { text: "Everybody says it changed their life." },
                { text: "Mine came back almost exactly as it was, except that I now know how to get to places without being told." },
              ],
            },
            {
              kind: "audio",
              id: "b5",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki arkadaş yazma kursunu tartışıyor.",
              plays: 2,
              segments: [
                { text: "Six weeks of typing lessons at my age." },
                { text: "Why not?" },
                { text: "Because I have typed with two fingers for thirty years and it works." },
                { text: "It works at half the speed. You told me last month that the forms take you all Friday." },
              ],
            },
            {
              kind: "audio",
              id: "b6",
              genre: "Between students",
              genreTr: "Öğrenciler arasında",
              situation: "İki öğrenci bir yöntemi konuşuyor.",
              plays: 2,
              segments: [
                { text: "I put my phone in the other room and I still did nothing for two hours." },
                { text: "So it does not work." },
                { text: "It works for me. But if the thing you are avoiding is the essay, the phone was never the problem." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-08-h2-8",
              no: 8,
              ref: "b1",
              text: "What is the first speaker doing?",
              options: ["Complaining about being tired", "Recommending a particular book", "Correcting something she believed"],
              answer: 2,
              explain:
                "Konuşmacı kendi açıklamasını çürütüyor: «I have been telling myself for a year that I am too tired to read», oysa değişen tek şey telefonun yeri.",
            },
            {
              kind: "mcq",
              id: "en-b1-08-h2-9",
              no: 9,
              ref: "b2",
              text: "What is the main point?",
              options: ["The rule stopped being an issue", "The son is against the rule", "The school will change the rule again"],
              answer: 0,
              explain:
                "Baba iki ölçüt veriyor: «the fourth week was normal» ve «nobody talks about it any more». Oğlunun karşı çıktığı söylenmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-08-h2-10",
              no: 10,
              ref: "b3",
              text: "What is the speaker doing?",
              options: ["Rejecting a way of reading", "Naming one limit of it", "Recommending it to everybody"],
              answer: 1,
              explain:
                "Konuşmacı önce reddi eliyor: «I am not against listening to books», sonra sınırı adlandırıyor: «What I cannot do is stop and read a sentence twice».",
            },
            {
              kind: "mcq",
              id: "en-b1-08-h2-11",
              no: 11,
              ref: "b4",
              text: "What is the second speaker doing?",
              options: ["Recommending a year without a phone", "Explaining why she gave up early", "Playing down a common claim"],
              answer: 2,
              explain:
                "Sunucu büyük iddiayı aktarıyor: «Everybody says it changed their life». Konuşmacı onu küçültüyor: «Mine came back almost exactly as it was».",
            },
            {
              kind: "mcq",
              id: "en-b1-08-h2-12",
              no: 12,
              ref: "b5",
              text: "What is the second speaker doing?",
              options: ["Agreeing that the course is a bad idea", "Using the other person's own words against him", "Offering to fill in the forms for him"],
              answer: 1,
              explain:
                "Konuşmacı karşı tarafın daha önce söylediğini hatırlatıyor: «You told me last month that the forms take you all Friday».",
            },
            {
              kind: "mcq",
              id: "en-b1-08-h2-13",
              no: 13,
              ref: "b6",
              text: "What does the second speaker suggest?",
              options: ["The phone is not the real difficulty here", "The first speaker should try a longer time", "The method works for everybody"],
              answer: 0,
              explain:
                "Konuşmacı yöntemi savunup teşhisi ayırıyor: «if the thing you are avoiding is the essay, the phone was never the problem».",
            },
          ],
        },
        {
          id: "en-b1-08-h3",
          no: 3,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear information about a study-skills service. Complete the notes, questions 14 to 19. Write ONE or TWO words or a number in each gap. You hear the information twice.",
          promptTr:
            "Bir çalışma becerileri hizmeti hakkında bilgi dinleyeceksin. 14–19. maddelerdeki notları tamamla. Her boşluğa BİR ya da İKİ sözcük veya bir sayı yaz. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Information",
              genreTr: "Bilgilendirme",
              situation: "Bir görevli çalışma becerileri saatini anlatıyor.",
              plays: 2,
              segments: [
                {
                  text: "Good afternoon. The study-skills hour runs on a Thursday, between two and five. It is free and you book it online, but you must bring two weeks of your own notes; we do not work from memory. There are four advisers and each hour is with one person. Book at least five days before, and if you cannot come, cancel by the Monday. The room is on the second floor, next to the lift.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notes",
              genreTr: "Not kâğıdı",
              title: "Study-skills hour — notes",
              body: `Day:                         {{14}}
Bring two weeks of your own: {{15}}
Number of advisers:          {{16}}
Book at least {{17}} days before
Cancel by:                   {{18}}
The room is on the {{19}} floor`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b1-08-h3-14",
              no: 14,
              ref: "c1",
              text: "Gap 14",
              accept: ["thursday"],
              explain:
                "Kayıt günü veriyor: «The study-skills hour runs on a Thursday». Pazartesi iptal günü, gün değil.",
            },
            {
              kind: "gap",
              id: "en-b1-08-h3-15",
              no: 15,
              ref: "c1",
              text: "Gap 15",
              accept: ["notes"],
              explain:
                "Kayıt koşulu gerekçesiyle veriyor: «you must bring two weeks of your own notes; we do not work from memory».",
            },
            {
              kind: "gap",
              id: "en-b1-08-h3-16",
              no: 16,
              ref: "c1",
              text: "Gap 16",
              accept: ["4", "four"],
              explain:
                "«There are four advisers and each hour is with one person» — danışman sayısı dört, görüşmedeki kişi sayısı bir.",
            },
            {
              kind: "gap",
              id: "en-b1-08-h3-17",
              no: 17,
              ref: "c1",
              text: "Gap 17",
              accept: ["5", "five"],
              explain:
                "«Book at least five days before» — en az beş gün. İki ile beş arası saat aralığı, gün sayısı değil.",
            },
            {
              kind: "gap",
              id: "en-b1-08-h3-18",
              no: 18,
              ref: "c1",
              text: "Gap 18",
              accept: ["monday"],
              explain:
                "«if you cannot come, cancel by the Monday» — iptal için son gün. Perşembe hizmetin kendi günü.",
            },
            {
              kind: "gap",
              id: "en-b1-08-h3-19",
              no: 19,
              ref: "c1",
              text: "Gap 19",
              accept: ["second", "2nd"],
              explain:
                "«The room is on the second floor, next to the lift» — kat numarası. Asansör yer tarifi, kat değil.",
            },
          ],
        },
        {
          id: "en-b1-08-h4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt:
            "You hear an interview with a man who spent a year without a smartphone. Choose a, b or c for questions 20 to 25. You hear the interview twice.",
          promptTr:
            "Bir yılını akıllı telefonsuz geçiren bir adamla söyleşi dinleyeceksin. 20–25. maddeler için a, b ya da c'yi seç. Söyleşiyi iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Radio interview",
              genreTr: "Radyo söyleşisi",
              situation: "Bir sunucu, bir yıl akıllı telefon kullanmayan Ondrej ile konuşuyor.",
              plays: 2,
              segments: [
                { text: "A year without a smartphone. Whose idea was it?" },
                { text: "My own, and I want to be honest: it was partly showing off. I told about forty people before I started, which is the only reason I lasted past March." },
                { text: "What was the first month like?" },
                { text: "Boring, and not in the good way that people describe. I stood at bus stops with nothing to do and I did not have a single deep thought. I looked at the timetable." },
                { text: "When did it get easier?" },
                { text: "Around week seven, and the reason is dull. I had worked out the four or five things the phone had actually been doing for me: maps, tickets, the bank, messages from my mother. Then I had found a way to do each of them." },
                { text: "What did you gain?" },
                { text: "Less than the books promise. I read three more books than the year before, which is not nothing, but it is not a new person either. The real change is that I can find my way around this city now." },
                { text: "And what did you lose?" },
                { text: "Time, mostly. Everything took longer and some of that was pure waste. I also missed two invitations, and one of them mattered." },
                { text: "Do you have a smartphone now?" },
                { text: "I do, since last August. People find that disappointing, as if the year had been a failure." },
                { text: "Was it?" },
                { text: "No. I use it about a third as much as I used to, and I do not think that would have happened any other way. The year was not the point; week seven was the point." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-08-h4-20",
              no: 20,
              ref: "d1",
              text: "Why did Ondrej tell so many people about his plan?",
              options: ["He wanted others to do it with him", "Telling them made it hard to stop", "A friend had asked him to write about it"],
              answer: 1,
              explain:
                "Ondrej etkisini kendisi söylüyor: «I told about forty people before I started, which is the only reason I lasted past March».",
            },
            {
              kind: "mcq",
              id: "en-b1-08-h4-21",
              no: 21,
              ref: "d1",
              text: "What does he say about the first month?",
              options: ["It was dull in an ordinary way", "It gave him time to think deeply", "It was easier than he had expected"],
              answer: 0,
              explain:
                "Ondrej beklenen anlatıyı reddediyor: «Boring, and not in the good way that people describe … I did not have a single deep thought».",
            },
            {
              kind: "mcq",
              id: "en-b1-08-h4-22",
              no: 22,
              ref: "d1",
              text: "Why did week seven change things?",
              options: ["He had got used to being bored", "He had bought a simple phone", "He had replaced each thing the phone did"],
              answer: 2,
              explain:
                "Ondrej dönüşü açıklıyor: «I had worked out the four or five things the phone had actually been doing for me» — harita, bilet, banka, annesinden gelen iletiler — «Then I had found a way to do each of them».",
            },
            {
              kind: "mcq",
              id: "en-b1-08-h4-23",
              no: 23,
              ref: "d1",
              text: "What does he say about reading?",
              options: ["He read far more than in any other year", "Three extra books is real but small", "He stopped reading almost completely"],
              answer: 1,
              explain:
                "Ondrej sayıyı verip büyüklüğünü ölçüyor: «I read three more books than the year before, which is not nothing, but it is not a new person either».",
            },
            {
              kind: "mcq",
              id: "en-b1-08-h4-24",
              no: 24,
              ref: "d1",
              text: "What did he lose?",
              options: ["Time, and two invitations", "Contact with his mother", "His way around the city"],
              answer: 0,
              explain:
                "Ondrej kaybı sayıyor: «Time, mostly … I also missed two invitations». Şehirde yolunu bulmak kayıp değil kazanç: «I can find my way around this city now».",
            },
            {
              kind: "mcq",
              id: "en-b1-08-h4-25",
              no: 25,
              ref: "d1",
              text: "How does he judge the year now?",
              options: ["As a failure, since he has a phone again", "As something he would repeat every year", "As worth it for what it taught him"],
              answer: 2,
              explain:
                "Ondrej başarısızlık okumasını reddediyor ve ölçütünü veriyor: «I use it about a third as much as I used to» ve «week seven was the point».",
            },
          ],
        },
      ],
    },

    /* ── WRITING ───────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 50,
      instruction: "This part has two tasks: an email and an article.",
      instructionTr: "Bu bölümde iki görev var: bir e-posta ve bir yazı.",
      tasks: [
        {
          id: "en-b1-08-w1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "You are on an evening course that promised no phones in the room, and about half the group uses them all through the lesson. Write an email to the teacher. Write about 100 words and cover all the points.",
          promptTr:
            "Odada telefon kullanılmayacağı sözü verilen bir akşam kursundasın ve grubun yaklaşık yarısı ders boyunca telefon kullanıyor. Öğretmene bir e-posta yaz. Yaklaşık 100 kelime, bütün maddeleri işle.",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Say which course you are on and what was promised.", tr: "Hangi kursta olduğunu ve ne söz verildiğini söyle." },
              { de: "Describe what actually happens, with one example.", tr: "Gerçekte ne olduğunu bir örnekle anlat." },
              { de: "Ask for one clear change, not a general complaint.", tr: "Genel bir şikâyet değil, tek ve açık bir değişiklik iste." },
            ],
            sample: `Dear Ms Vale,

I am in the Tuesday photography group that started on 6 January. The information sheet said that phones would stay in bags during the lesson.

In practice about half the group has a phone on the table for the whole two hours. Last week the person next to me answered three calls in the room, and I lost most of the second exercise.

I am not asking you to take anybody's phone away. Could you say the rule out loud at the start of each lesson, as you did in week one?

Thank you for a course I am otherwise enjoying.

Best wishes,
Nadia Roth`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "Somut bir örnek verildi mi, yoksa yalnız genel yakınma mı var?",
              "İstenen değişiklik tek ve uygulanabilir mi?",
              "Kayıt kibar mı? Suçlayıcı bir dile kaymış mı?",
              "Yaklaşık 100 kelime yazıldı mı?",
            ],
          },
        },
        {
          id: "en-b1-08-w2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Write an article for a website with this title: \"A rule I made for myself and broke\". Say what the rule was, why you made it and what happened. Write about 100 words.",
          promptTr:
            "Bir internet sitesi için şu başlıkla bir yazı yaz: \"Kendime koyup çiğnediğim bir kural\". Kuralın ne olduğunu, neden koyduğunu ve ne olduğunu yaz. Yaklaşık 100 kelime.",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Say what the rule was.", tr: "Kuralın ne olduğunu söyle." },
              { de: "Say why you made it.", tr: "Neden koyduğunu söyle." },
              { de: "Say what happened in the end.", tr: "Sonunda ne olduğunu söyle." },
            ],
            sample: `My rule was simple: no phone in the bedroom. I bought a clock for four euros so that I had no excuse.

I made the rule because I was reading the news at one in the morning and then telling my colleagues I had slept badly, as if it were the weather.

It worked for five weeks. Then my sister was in hospital and the phone came back to the bedside table, which was the right decision. It never left again.

What I have kept is smaller and it still helps: the phone is in the room, but it is in a drawer.`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "Kural somut mu, yoksa genel bir niyet mi?",
              "Kuralın çiğnenme anı anlatıldı mı, yoksa yalnız sonuç mu var?",
              "Geçmiş zaman ve present perfect doğru ayrıldı mı?",
              "Yaklaşık 100 kelime yazıldı mı?",
            ],
          },
        },
      ],
    },

    /* ── SPEAKING ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "This part has four tasks: an interview, a long turn, a task we do together, and a general conversation.",
      instructionTr: "Bu bölümde dört görev var: söyleşi, tek başına konuşma, birlikte yapılan bir görev ve genel sohbet.",
      tasks: [
        {
          id: "en-b1-08-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about how you study or work and about your phone.",
          promptTr: "Sana nasıl çalıştığın ve telefonun hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good afternoon. Where and when do you work or study best?", tr: "İyi günler. En iyi nerede ve ne zaman çalışıyorsun?" },
            { who: "you", hint: "Yeri ve saati anlat, bir gerekçe ver.", expect: "bir alışkanlığı yer ve zaman bilgisiyle anlatmak", seconds: 40 },
            { who: "partner", de: "Thank you. Have you ever tried to change the way you study?", tr: "Teşekkürler. Çalışma biçimini değiştirmeyi hiç denedin mi?" },
            { who: "you", hint: "Present perfect ya da `used to` ile bir denemeyi anlat.", expect: "geçmişteki bir denemeyi ve sonucunu anlatmak", seconds: 40 },
            { who: "partner", de: "And if you had to work without a phone for a month, what would be hardest?", tr: "Bir ay telefonsuz çalışmak zorunda kalsan en zoru ne olurdu?" },
            { who: "you", hint: "Koşul kipiyle cevapla ve gerekçelendir.", expect: "ikinci tip koşul cümlesiyle bir varsayım kurmak", seconds: 40 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "describe a habit with place and time", tr: "Bir alışkanlığı yer ve zamanla anlatmak" },
              { de: "describe an attempt to change something", tr: "Bir şeyi değiştirme denemesini anlatmak" },
              { de: "use a second conditional", tr: "İkinci tip koşulu kullanmak" },
            ],
            sample:
              "I work best at the kitchen table between six and eight in the morning, mostly because nobody in the flat is awake. I have tried studying in the evening and it never lasts more than a week. Last year I put my phone in a drawer while I worked, and for about a month it made a real difference. If I had to work without a phone for a month, the hardest part would be train tickets, because everything I need is in that one app.",
            criteria: [
              "İlk cevapta yer ve zaman verildi mi?",
              "Deneme somut mu anlatıldı, sonucu söylendi mi?",
              "Son cevapta ikinci tip koşul kuruldu mu?",
              "Cevaplar geliştirildi mi, tek cümlede mi kaldı?",
            ],
          },
        },
        {
          id: "en-b1-08-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about one minute. Compare these two ways of working: in a silent room on your own, or in a busy place with other people around you. Say which suits you and why.",
          promptTr:
            "Yaklaşık bir dakika tek başına konuş. Çalışmanın şu iki yolunu karşılaştır: tek başına sessiz bir odada mı, yoksa çevrende insanlar olan kalabalık bir yerde mi? Hangisinin sana uyduğunu ve nedenini söyle.",
          prepSeconds: 60,
          speakSeconds: 75,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "compare the two ways", tr: "İki yolu karşılaştır" },
              { de: "say which suits you and why", tr: "Hangisinin sana uyduğunu ve nedenini söyle" },
              { de: "mention one disadvantage of your choice", tr: "Seçtiğin yolun bir olumsuz yanını da söyle" },
            ],
            sample:
              "A silent room gives you everything except a reason to stay in it. Nobody sees you leave after twenty minutes. A busy place is noisier, and the noise is the price you pay for being watched by strangers who do not care about you at all. That second thing works on me: I get more done in a café than at home, although the coffee costs about thirty euros a month. The disadvantage is that I cannot read anything difficult there. Anything that needs a second look has to be done at the kitchen table.",
            criteria: [
              "İki yol da gerçekten karşılaştırıldı mı?",
              "Karşılaştırma yapıları kullanıldı mı? (except, although, the price you pay)",
              "Seçim gerekçelendirildi mi?",
              "Seçilen yolun olumsuz yanı da söylendi mi?",
              "Bir dakika kesintisiz konuşuldu mu?",
            ],
          },
        },
        {
          id: "en-b1-08-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Our six-week evening course has to agree on one rule about phones in the room. Talk with me and agree on the wording.",
          promptTr:
            "Altı haftalık akşam kursumuzun odadaki telefonlar için tek bir kural üzerinde anlaşması gerekiyor. Benimle konuş ve kuralın nasıl yazılacağında anlaş.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "The simplest rule is: no phones in the room at all. Would you sign that?", tr: "En basit kural şu: odada hiç telefon olmasın. Buna imza atar mısın?" },
            { who: "you", hint: "Öneriye gerekçeli karşılık ver: kabul et ya da değiştir.", expect: "bir öneriye gerekçeli karşılık vermek", seconds: 40 },
            { who: "partner", de: "But two people in the group have small children at home and they need to be reachable. Does the rule still work?", tr: "Ama gruptaki iki kişinin evde küçük çocuğu var ve ulaşılabilir olmaları gerekiyor. Kural yine de işler mi?" },
            { who: "you", hint: "Bu duruma somut bir istisna öner ve nasıl işleyeceğini söyle.", expect: "bir kısıtı karşılayan somut bir istisna önermek", seconds: 40 },
            { who: "partner", de: "Good. Say the rule as we would write it on the sheet.", tr: "Güzel. Kuralı kâğıda yazacağımız gibi söyle." },
            { who: "you", hint: "Kuralı tek tek ve uygulanabilir biçimde söyle.", expect: "varılan kuralı açık ve uygulanabilir biçimde ifade etmek", seconds: 35 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "respond to a proposal with a reason", tr: "Bir öneriye gerekçeyle karşılık vermek" },
              { de: "make an exception that fits a real need", tr: "Gerçek bir gereksinimi karşılayan bir istisna kurmak" },
              { de: "state the agreed rule clearly", tr: "Anlaşılan kuralı açıkça ifade etmek" },
            ],
            sample:
              "I would not sign that, because a rule nobody can keep is worse than no rule. You are right that two people have to be reachable, so let us say this: phones stay in bags on silent, and anybody who is waiting for a call sits by the door and takes it outside. On the sheet: phones in bags, on silent; calls taken in the corridor; if you are expecting one, tell us at the start of the lesson.",
            criteria: [
              "İlk öneriye gerekçeli bir karşılık verildi mi?",
              "İstisna gerçek gereksinimi karşılıyor mu?",
              "Sonunda kural açık ve uygulanabilir biçimde söylendi mi?",
              "Karşı tarafın söylediğine gönderme yapıldı mı?",
            ],
          },
        },
        {
          id: "en-b1-08-s4",
          no: 4,
          format: "speaking",
          goal: "interaction",
          prompt: "We talk a little more about the same topic: whether schools should collect phones at the door.",
          promptTr: "Aynı konu üzerine biraz daha konuşuyoruz: okullar telefonları kapıda toplamalı mı.",
          prepSeconds: 15,
          exchange: [
            { who: "partner", de: "Some schools now put every phone in a box for the whole day. Is that going too far?", tr: "Bazı okullar artık bütün gün boyunca her telefonu bir kutuya koyuyor. Bu fazla mı?" },
            { who: "you", hint: "Görüşünü söyle ve bir örnek ver.", expect: "genel bir soruya görüş bildirmek ve örneklendirmek", seconds: 40 },
            { who: "partner", de: "Others say that a rule taken away from you teaches you nothing about deciding for yourself. Would you agree?", tr: "Kimileri de senden alınmış bir kuralın kendi kararını vermeyi öğretmediğini söylüyor. Katılır mısın?" },
            { who: "you", hint: "Kısmen katıl ya da karşı çık; iki yanı da anmaya çalış.", expect: "bir iddiaya kısmen katılmak ya da karşı çıkmak, iki yanı da anmak", seconds: 45 },
          ],
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "give an opinion with an example", tr: "Görüşü bir örnekle vermek" },
              { de: "agree or disagree in a nuanced way", tr: "Katılırken ya da karşı çıkarken ince ayrım yapmak" },
            ],
            sample:
              "I do not think it goes too far for the youngest classes. My nephew is eleven and he could not put a phone down in a room with thirty other people doing the same thing. I partly agree with the second argument, because at seventeen you are two years away from an office where nobody takes anything off you. But that is an argument for taking the box away at sixteen, not for never having one.",
            criteria: [
              "Görüş açıkça bildirildi mi?",
              "Somut bir örnek verildi mi?",
              "Kısmi katılım ifadeleri kullanıldı mı? (I partly agree, although)",
              "İki yan da anıldı mı, yoksa tek yanlı mı kalındı?",
            ],
          },
        },
      ],
    },
  ],
};
