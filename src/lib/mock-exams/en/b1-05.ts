import type { MockPaper } from "../types";

/**
 * B1 · Deneme 5 — "Travel, Tourism and Living Places".
 *
 * B1'in öteki denemeleriyle AYNI PLAN; konu ayrı. Turizm B1 için verimli
 * bir alan çünkü aynı metinde hem somut bilgi (saat, fiyat, kat) hem de
 * bir çıkar çatışması bulunuyor; okuma 3 ile dinleme 4'ün ölçtüğü görüş
 * becerisi bu ikinci katmandan besleniyor.
 *
 * B1 İMZALARI: present perfect, ilgi cümlesi, koşul cümlesi ve
 * `used to / however` gibi ileri bağlaçlar metinlerde geçiyor.
 */
export const EN_B1_05: MockPaper = {
  id: "en-b1-05",
  course: "en",
  level: "B1",
  no: 5,
  theme: "Travel, Tourism and Living Places",
  themeTr: "Yolculuk, turizm ve yaşanan yerler",
  minutes: 155,
  parts: [
    /* ── READING ───────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 55,
      instruction:
        "This part has six tasks. You read notices, adverts, an article and two texts with gaps. Choose the correct answer for each question.",
      instructionTr:
        "Bu bölümde altı görev var. Duyurular, ilanlar, bir yazı ve boşluklu iki metin okuyacaksın. Her soruda doğru cevabı işaretle.",
      tasks: [
        {
          id: "en-b1-05-l1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Read the five texts and questions 1 to 5. Choose a, b or c.",
          promptTr: "Beş metni ve 1–5. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "m1",
              genre: "Notice at a station",
              genreTr: "İstasyon duyurusu",
              title: "Left luggage",
              body: `From 1 October the lockers close at nine, not at midnight. Bags left overnight are moved to the office and cost an extra ten euros. The office opens at seven in the morning.`,
            },
            {
              kind: "text",
              id: "m2",
              genre: "Email to a guest",
              genreTr: "Misafire e-posta",
              title: "Your flat next week",
              body: `Dear Mr Bakker, the flat is on the third floor and there is no lift. The key is in a box by the door; we send the code the day before. If you arrive after eleven at night, please tell us today so that a neighbour is awake.`,
            },
            {
              kind: "text",
              id: "m3",
              genre: "Advert",
              genreTr: "İlan",
              title: "Old town on foot",
              body: `Two hours on foot, small groups of eight. We do not go inside any building, so you pay nothing extra. The guide is a local person, not a student with a script. If it rains we still walk; if there is ice we do not.`,
            },
            {
              kind: "text",
              id: "m4",
              genre: "Message",
              genreTr: "İleti",
              title: "Flat 6 again",
              body: `Dalia, the people in flat 6 rent it out by the week again. Four different groups in a month, and the front door is open half the night. I am writing to the office on Friday. Do you want your name on the letter?`,
            },
            {
              kind: "text",
              id: "m5",
              genre: "Notice in a hostel",
              genreTr: "Hostel duyurusu",
              title: "House rules",
              body: `Breakfast is from seven to ten and it is included. The kitchen is free until eleven at night; please wash what you use. We keep bags after check-out at no charge, but not overnight.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-05-l1-1",
              no: 1,
              ref: "m1",
              text: "What happens to a bag left in a locker after nine?",
              options: ["It is moved to the lost property room", "It goes to the office and costs more", "It stays in the locker until seven in the morning"],
              answer: 1,
              explain:
                "Duyuru sonucu veriyor: «Bags left overnight are moved to the office and cost an extra ten euros». Taşınan yer kayıp eşya değil ofis; dolapta da kalmıyor, yedi yalnız ofisin açılış saati.",
            },
            {
              kind: "mcq",
              id: "en-b1-05-l1-2",
              no: 2,
              ref: "m2",
              text: "What should Mr Bakker do if he arrives very late?",
              options: ["Ask for the code again", "Take the lift to the third floor", "Tell the owner in advance"],
              answer: 2,
              explain:
                "Koşul e-postada yazılı: «If you arrive after eleven at night, please tell us today». Kod zaten bir gün önce gönderiliyor; asansör ise hiç yok.",
            },
            {
              kind: "mcq",
              id: "en-b1-05-l1-3",
              no: 3,
              ref: "m3",
              text: "What does the advert promise?",
              options: ["No extra costs during the tour", "A tour that goes inside three buildings", "A tour with a student guide"],
              answer: 0,
              explain:
                "İlan gerekçeyi kendisi veriyor: «We do not go inside any building, so you pay nothing extra». Rehber de öğrenci değil, «a local person» olarak tanımlanıyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-05-l1-4",
              no: 4,
              ref: "m4",
              text: "What does the writer want from Dalia?",
              options: ["Money for the letter", "Help with the front door", "Her name on a complaint"],
              answer: 2,
              explain:
                "Son cümle tek isteği taşıyor: «Do you want your name on the letter?». Kapı sorunun bir parçası, çözüm görevi değil; paradan hiç söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-05-l1-5",
              no: 5,
              ref: "m5",
              text: "What is free at this hostel?",
              options: ["Keeping a bag after check-out", "Breakfast after ten o'clock", "The kitchen after eleven at night"],
              answer: 0,
              explain:
                "Duyuru bunu açıkça söylüyor: «We keep bags after check-out at no charge». Kahvaltı onda bitiyor, mutfak ise on birde kapanıyor; ikisi de o saatlerden sonra kullanılamıyor.",
            },
          ],
        },
        {
          id: "en-b1-05-l2",
          no: 2,
          format: "match",
          goal: "orientation",
          prompt:
            "Read about five people, 6 to 10. Then read the eight adverts a to h. Which advert is right for each person? You use each advert once only.",
          promptTr:
            "6–10. maddelerdeki beş kişiyi oku. Sonra a'dan h'ye sekiz ilanı oku. Her kişiye hangi ilan uyar? Her ilan en fazla bir kez kullanılır.",
          options: [
            { key: "a", label: "Night Train", body: "Leaves at ten in the evening and arrives at six. A bed in a shared compartment is thirty-nine euros; a seat is nineteen. No food on board." },
            { key: "b", label: "Flat Swap", body: "You stay in somebody's flat and they stay in yours, for the same week. No money changes hands. You register with two references." },
            { key: "c", label: "Left Luggage", body: "Open six to twenty-two, next to the tourist office. Four euros a bag a day. Bikes and skis are eight." },
            { key: "d", label: "Walking Tour", body: "Two hours, small groups, every morning at ten. Free, but the guide is paid by what you give at the end." },
            { key: "e", label: "Room in a Family", body: "A room in a family home, breakfast included, minimum three nights. Quiet after ten. Good for people who want to practise the language." },
            { key: "f", label: "Bike Hire", body: "From four hours to two weeks. Helmet and lock included. We deliver to your hotel for five euros." },
            { key: "g", label: "City Card", body: "Three days of buses and trams plus twelve museums. Sixty-five euros, or forty for students. Does not include the airport bus." },
            { key: "h", label: "Storage Rooms", body: "From one square metre, by the month. Day and night entry. Not for furniture or for anything that smells." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b1-05-l2-6",
              no: 6,
              text: "Anouk arrives at six in the morning and cannot get into her flat until three in the afternoon.",
              answer: "c",
              explain:
                "İlan hem saati hem hizmeti veriyor: «Open six to twenty-two» ve «Four euros a bag a day». Dokuz saatlik boşlukta çantayı bırakacak tek yer orası; depo odaları (h) aylık ve eşya için.",
            },
            {
              kind: "match",
              id: "en-b1-05-l2-7",
              no: 7,
              text: "Rasmus wants to travel overnight and not pay for a hotel.",
              answer: "a",
              explain:
                "İlan iki tasarrufu birden veriyor: «Leaves at ten in the evening and arrives at six» ve paylaşımlı kompartımanda yatak otuz dokuz euro. Yolculuk ve konaklama tek bilette birleşiyor.",
            },
            {
              kind: "match",
              id: "en-b1-05-l2-8",
              no: 8,
              text: "Iker has two weeks in the city and wants to speak the language every day.",
              answer: "e",
              explain:
                "İlan bunu amaç olarak yazıyor: «Good for people who want to practise the language», üstelik bir ailenin evinde ve kahvaltı dahil. Hostel ya da daire takası böyle bir günlük temas vaat etmiyor.",
            },
            {
              kind: "match",
              id: "en-b1-05-l2-9",
              no: 9,
              text: "Freja will visit six museums in three days and does not have a car.",
              answer: "g",
              explain:
                "İlan iki ihtiyacı birden karşılıyor: «Three days of buses and trams plus twelve museums». Altı müze on ikinin içinde ve toplu taşıma da dahil; havaalanı otobüsü ayrı ama Freja şehirde.",
            },
            {
              kind: "match",
              id: "en-b1-05-l2-10",
              no: 10,
              text: "Joris has a flat in another city and no money for a hotel.",
              answer: "b",
              explain:
                "İlan tam bu takası tarif ediyor: «You stay in somebody's flat and they stay in yours» ve «No money changes hands». Elinde bir daire olması koşulu Joris için sağlanıyor.",
            },
          ],
        },
        {
          id: "en-b1-05-l3",
          no: 3,
          format: "mcq",
          goal: "opinion",
          prompt: "Read the article and questions 11 to 15. Choose a, b, c or d.",
          promptTr: "Yazıyı ve 11–15. maddeleri oku. a, b, c ya da d'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t3",
              genre: "Newspaper column",
              genreTr: "Gazete köşe yazısı",
              title: "I went back to the town I wrote about",
              body: `Six years ago I wrote a short piece about a small town on the coast, and about forty people read it. Then a travel site copied three sentences from it, and last summer the town had four times as many visitors as it did the year I was there. I went back in September to look at what I had helped to do.

The obvious story is the one everybody writes: too many people, higher rents, a bakery replaced by a shop selling the same postcards as everywhere else. All of that is true, and I saw all of it. But it was not the part that stayed with me.

What stayed with me was a conversation with a woman who runs the ferry office, which is one room with two chairs in it. She said that the season used to end in August, and that her contract used to end with it. It now runs to the middle of October, and for the first time in eleven years she has not had to look for winter work.

I am not going to pretend the two things balance. Twenty families cannot afford to live where they grew up, and one woman has a longer contract. That is not a balance, and anybody who presents it as one is selling something.

What I have changed is smaller. I no longer name the town in anything I write. If I wrote that piece again, I would leave the name out. However, I have stopped believing that the choice is between writing and not writing. The choice is about what you name, and I was slow to see it.`,
              gloss: [
                { de: "a ferry", tr: "vapur, feribot", en: "ferry" },
                { de: "rent", tr: "kira", en: "rent" },
                { de: "a contract", tr: "sözleşme", en: "contract" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-05-l3-11",
              no: 11,
              text: "Why did the writer go back to the town?",
              options: ["To write a second article about it", "Because the ferry office had asked her to come", "To meet the people she had interviewed", "To see the effect of what she had written"],
              answer: 3,
              explain:
                "İlk paragrafın son cümlesi gerekçeyi veriyor: «I went back in September to look at what I had helped to do». Feribot ofisiyle konuşma orada yaşanan bir şey, gitme sebebi değil.",
            },
            {
              kind: "mcq",
              id: "en-b1-05-l3-12",
              no: 12,
              text: "What does the writer say about the usual story?",
              options: ["It is exaggerated by most other journalists", "It is true but not what affected her most", "It applies to every coastal town", "She could not find any evidence for it"],
              answer: 1,
              explain:
                "Yazı iki şeyi birlikte söylüyor: «All of that is true, and I saw all of it. But it was not the part that stayed with me». Abartı ya da kanıtsızlık savı metinde yok.",
            },
            {
              kind: "mcq",
              id: "en-b1-05-l3-13",
              no: 13,
              text: "What did the writer not expect in the ferry office?",
              options: ["The office was about to close", "The woman had never worked there in the winter", "The longer season had helped one person", "Visitor numbers had fallen again"],
              answer: 2,
              explain:
                "Kadın sezonun uzamasının kendisine ne getirdiğini anlatıyor: «for the first time in eleven years she has not had to look for winter work». Yani kışın çalışmıyor değil, kışın İŞ ARAMAK zorunda kalmıyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-05-l3-14",
              no: 14,
              text: "What does the writer refuse to do?",
              options: ["Present the two effects as a balance", "Name the woman she spoke to", "Write about any small town again in future", "Return to the town a second time"],
              answer: 0,
              explain:
                "Dördüncü paragraf açık: «That is not a balance, and anybody who presents it as one is selling something». Küçük kasabalar hakkında yazmayı bırakmıyor; bıraktığı şey adı vermek.",
            },
            {
              kind: "mcq",
              id: "en-b1-05-l3-15",
              no: 15,
              text: "What has the writer changed?",
              options: ["She has stopped writing about travel", "She writes only about large cities", "She checks her facts with local people", "She leaves the place name out"],
              answer: 3,
              explain:
                "Son paragraf: «I no longer name the town in anything I write» ve bunun bir jest olduğunu da kabul ediyor. Yazmayı bırakmadığını da açıkça söylüyor.",
            },
          ],
        },
        {
          id: "en-b1-05-l4",
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
              title: "The town that counted its visitors",
              body: `For years the council knew how many people slept in the hotels and had no idea how many came for the day. Since 2021 it has counted both. {{16}}

The method is not clever, and that is the point. Two people stand at the three entrances to the old town for one week in June and one week in October. {{17}}

The first result was uncomfortable. Day visitors were three times the number anybody had guessed, and they spend, on average, four euros each. {{18}}

That figure changed the argument. A debate about whether tourism is good became a narrower debate about which kind of visitor the town wants. {{19}}

The council now publishes the count every year, in a table that fits on one page. {{20}}`,
              gloss: [
                { de: "a council", tr: "belediye meclisi", en: "council" },
                { de: "an entrance", tr: "giriş", en: "entrance" },
                { de: "on average", tr: "ortalama olarak", en: "on average" },
              ],
            },
          ],
          options: [
            { key: "a", label: "a", body: "The number is small enough to fit on a poster, and that is exactly why people remember it." },
            { key: "b", label: "b", body: "Nobody claims that a week in June represents the whole year, and the report says so on its first page." },
            { key: "c", label: "c", body: "It is the cheapest piece of research the council has ever paid for." },
            { key: "d", label: "d", body: "Neither side liked that, which is usually a sign that a number is doing its work." },
            { key: "e", label: "e", body: "Two other towns have copied the method, and one of them has already stopped." },
            { key: "f", label: "f", body: "The old town has been a protected area since the nineteen-seventies." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b1-05-l4-16",
              no: 16,
              text: "Gap 16",
              answer: "c",
              explain:
                "Boşluktan önce sayımın 2021'de başladığı söyleniyor; (c) o sayımı değerlendiriyor: belediyenin ödediği en ucuz araştırma. Sonraki paragraf da yöntemin basitliğini açıyor, yani ucuzluk savını sürdürüyor.",
            },
            {
              kind: "match",
              id: "en-b1-05-l4-17",
              no: 17,
              text: "Gap 17",
              answer: "b",
              explain:
                "Paragraf yöntemi anlatıyor: «Two people stand at the three entrances … for one week in June and one week in October». (b) bu yöntemin sınırını kabul ediyor: bir hafta yılı temsil etmiyor ve rapor bunu kendisi yazıyor.",
            },
            {
              kind: "match",
              id: "en-b1-05-l4-18",
              no: 18,
              text: "Gap 18",
              answer: "a",
              explain:
                "Önceki cümle kişi başına dört euroluk harcamayı veriyor; (a) «The number» ile o rakama gönderme yapıp neden akılda kaldığını söylüyor: bir afişe sığacak kadar küçük.",
            },
            {
              kind: "match",
              id: "en-b1-05-l4-19",
              no: 19,
              text: "Gap 19",
              answer: "d",
              explain:
                "Önceki cümle tartışmanın daraldığını anlatıyor; (d) «Neither side liked that» ile iki tarafa da gönderme yapıyor ve bunu bir başarı sayıyor.",
            },
            {
              kind: "match",
              id: "en-b1-05-l4-20",
              no: 20,
              text: "Gap 20",
              answer: "e",
              explain:
                "Son cümle sayımın sürdüğünü söylüyor: «publishes the count every year, in a table that fits on one page». (e) yöntemin yayılmasını ve bir örnekte durmasını ekleyerek yazıyı kapatıyor. (f) eski şehrin koruma statüsünden söz ediyor ve metnin hiçbir yerinde koruma tartışılmıyor — hiçbir boşluğa uymayan cümle odur.",
            },
          ],
        },
        {
          id: "en-b1-05-l5",
          no: 5,
          format: "gapMcq",
          goal: "structure",
          prompt: "Read the text and complete gaps 21 to 25. Which word fits: a, b, c or d?",
          promptTr: "Metni oku ve 21–25. boşlukları tamamla. Hangi sözcük uyar: a, b, c ya da d?",
          texts: [
            {
              kind: "text",
              id: "t5",
              genre: "Consumer advice",
              genreTr: "Tüketici tavsiyesi",
              title: "Before you book a holiday flat",
              body: `A holiday flat can be much better value than a hotel, but only if you {{21}} attention to three things.

First, ask what happens if you arrive late. Many owners {{22}} you a code the day before, and a code that does not work at midnight is a long night.

Second, check the floor. A photograph rarely {{23}} that the flat is on the fourth floor of a building with no lift.

Third, agree in advance what counts as damage. A private owner does not have to {{24}} your deposit back quickly, and many guests discover this too late.

None of this takes long. Ten minutes of questions can {{25}} you from a week of small problems.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-05-l5-21",
              no: 21,
              text: "Gap 21",
              options: ["pay", "give", "make", "put"],
              answer: 0,
              explain:
                "`pay attention to` sabit bir eşdizimdir. `give attention` seyrek ve zayıf bir kullanımdır; `make attention` ve `put attention` İngilizcede yoktur.",
            },
            {
              kind: "mcq",
              id: "en-b1-05-l5-22",
              no: 22,
              text: "Gap 22",
              options: ["tell", "say", "send", "speak"],
              answer: 2,
              explain:
                "Kod bir nesne gibi iletiliyor: «send you a code». `tell` bir bilgiyi sözle aktarır ve burada da olabilirdi ama `a code the day before` fiziksel bir gönderim anlatıyor; `say` iki nesne almaz, `speak` ise doğrudan nesne almaz.",
            },
            {
              kind: "mcq",
              id: "en-b1-05-l5-23",
              no: 23,
              text: "Gap 23",
              options: ["looks", "shows", "seems", "appears"],
              answer: 1,
              explain:
                "`show that …` bir olguyu görünür kılar ve `that` yan cümlesi alır. `look`, `seem` ve `appear` özneyi niteler, `that` yan cümlesiyle bu yapıda kullanılmaz.",
            },
            {
              kind: "mcq",
              id: "en-b1-05-l5-24",
              no: 24,
              text: "Gap 24",
              options: ["bring", "take", "put", "give"],
              answer: 3,
              explain:
                "`give something back` iade etmenin kalıbıdır. `bring back` getirmeyi, `take back` geri almayı, `put back` yerine koymayı anlatır; depozitoyu iade eden taraf mal sahibi olduğu için `give` gerekiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-05-l5-25",
              no: 25,
              text: "Gap 25",
              options: ["save", "keep", "hold", "stop"],
              answer: 0,
              explain:
                "`save somebody from something` birini bir dertten kurtarmak demektir. `keep from` engellemeyi, `stop from` durdurmayı bildirir ve ikisi de ardından ulaç ister; `hold from` kalıp değildir.",
            },
          ],
        },
        {
          id: "en-b1-05-l6",
          no: 6,
          format: "gap",
          goal: "structure",
          prompt: "Read the text and complete gaps 26 to 30. Write ONE word in each gap.",
          promptTr: "Metni oku ve 26–30. boşlukları tamamla. Her boşluğa TEK bir sözcük yaz.",
          texts: [
            {
              kind: "text",
              id: "t6",
              genre: "Blog comment",
              genreTr: "Blog yorumu",
              title: "On the visitor question",
              body: `The town has changed more in five years {{26}} it did in the previous twenty.

Everybody agrees {{27}} that, and nobody agrees about what to do next.

Some people want fewer visitors; {{28}} want the same number but a different kind.

The council has promised a decision by June, {{29}} it has promised that before.

It is the second time this year {{30}} the date has moved.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b1-05-l6-26",
              no: 26,
              text: "Gap 26",
              accept: ["than"],
              explain:
                "Cümlede `more` var, yani karşılaştırma başlamış; ikinci öğe `than` ile bağlanır. `as` yalnız `as … as` yapısında gelir ve orada `more` kullanılmaz.",
            },
            {
              kind: "gap",
              id: "en-b1-05-l6-27",
              no: 27,
              text: "Gap 27",
              accept: ["on", "about", "with"],
              explain:
                "`agree on something` bir konuda uzlaşmayı, `agree about` bir konu hakkında aynı görüşte olmayı, `agree with` bir savı doğrulamayı bildirir. Üçü de bu cümlede doğal; `agree to` ise bir öneriyi kabul etmektir ve burada ortada bir öneri yok.",
            },
            {
              kind: "gap",
              id: "en-b1-05-l6-28",
              no: 28,
              text: "Gap 28",
              accept: ["others"],
              explain:
                "`Some people …; others …` iki grubu karşı karşıya koyan bir kalıptır. `other` tek başına ad olamaz, ardından bir ad ister; `another` ise tekildir ve ikinci grubu karşılamaz.",
            },
            {
              kind: "gap",
              id: "en-b1-05-l6-29",
              no: 29,
              text: "Gap 29",
              accept: ["but", "although", "though"],
              explain:
                "İki yarı karşıtlık kuruyor: söz verildi, ama daha önce de verilmişti. `but`, `although` ve `though` bu ödünü kurar; `so` sonuç bildirir ve alaycı tonu tersine çevirir.",
            },
            {
              kind: "gap",
              id: "en-b1-05-l6-30",
              no: 30,
              text: "Gap 30",
              accept: ["that"],
              explain:
                "`It is the second time … that …` kalıbında yan cümleyi `that` bağlar. `when` bir zaman bildirir ve bu sayma kalıbında kullanılmaz.",
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
        "This part has four tasks. You hear short extracts, conversations, a talk and an interview. You hear every recording twice.",
      instructionTr:
        "Bu bölümde dört görev var. Kısa parçalar, konuşmalar, bir sunum ve bir söyleşi dinleyeceksin. Her kaydı iki kez dinleyebilirsin.",
      tasks: [
        {
          id: "en-b1-05-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "You hear seven short extracts. Choose a, b or c. You hear every extract twice.",
          promptTr: "Yedi kısa parça dinleyeceksin. a, b ya da c'yi seç. Her parçayı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Announcement",
              genreTr: "Anons",
              situation: "İstasyonda iptal edilen bir sefer duyuruluyor.",
              plays: 2,
              segments: [
                { text: "The nine forty service to the coast is cancelled because of a fault at the depot. The next service is at ten fifty-five and it stops at every station. Tickets for the nine forty are valid on any train today." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Voicemail",
              genreTr: "Telesekreter iletisi",
              situation: "Bir daire sahibi misafire ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello, this is about your booking for next week. The code for the key box is four four one nine. It changes every Monday, so do not use an old one. And the third floor is the top floor; there is no lift, as it says in the advert." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "At work",
              genreTr: "İş yerinde",
              situation: "İki meslektaş gece trenini konuşuyor.",
              plays: 2,
              segments: [
                { text: "Did you book the night train?" },
                { text: "A seat, not a bed." },
                { text: "Twelve hours in a seat?" },
                { text: "It is nine hours and it is twenty euros. I sleep badly in a bed on a train anyway." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Radyoda bir uzman dinleyici sorusunu yanıtlıyor.",
              plays: 2,
              segments: [
                { text: "People ask me whether a city card is worth it. The arithmetic is simple: count the museums you will really enter, not the ones on the list, and add the buses. If the number is under four museums, it almost never pays." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Announcement",
              genreTr: "Duyuru",
              situation: "Hostelde misafirlere duyuru yapılıyor.",
              plays: 2,
              segments: [
                { text: "A short note for everybody. The kitchen closes at eleven tonight, not at midnight, because the floor is being repaired. Breakfast is normal. If you need hot water after eleven, the machine in the hall is on all night." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Voice message",
              genreTr: "Sesli ileti",
              situation: "Bir rehber cumartesi turu için ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hi, about Saturday. I can do the tour with the group, but I have to be back by two for my daughter. If we start at nine we will finish the old town easily, and Dalia said she can take the harbour part." },
              ],
            },
            {
              kind: "audio",
              id: "a7",
              genre: "Talk",
              genreTr: "Sunum",
              situation: "Bir danışman kısa süreli kiralama yapanlara sesleniyor.",
              plays: 2,
              segments: [
                { text: "The most common mistake I see in a first year of renting to visitors is answering every message within a minute. It sounds like good service and it is not sustainable. Answer twice a day, say so in the advert, and nobody complains." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-05-h1-1",
              no: 1,
              ref: "a1",
              text: "What can passengers with a nine forty ticket do?",
              options: ["Get all of their money back at the office", "Travel only on the ten fifty-five", "Use the ticket on any train today"],
              answer: 2,
              explain:
                "Anonsun son cümlesi izni veriyor: «Tickets for the nine forty are valid on any train today». On elli beş bir sonraki sefer, tek seçenek değil; para iadesi hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-05-h1-2",
              no: 2,
              ref: "a2",
              text: "What is the owner warning about?",
              options: ["An old code will not work", "The flat is on the second floor", "The lift is out of order"],
              answer: 0,
              explain:
                "Uyarı kodun haftalık değişmesiyle ilgili: «It changes every Monday, so do not use an old one». Daire üçüncü katta ve binada asansör hiç yok, bozuk değil.",
            },
            {
              kind: "mcq",
              id: "en-b1-05-h1-3",
              no: 3,
              ref: "a3",
              text: "What did the speaker book?",
              options: ["A bed for twelve hours", "The cheaper option", "Nothing yet"],
              answer: 1,
              explain:
                "Konuşmacı «A seat, not a bed» diyor ve fiyatı veriyor: yirmi euro. On iki saat sorulan kişinin varsayımı; gerçek süre dokuz saat.",
            },
            {
              kind: "mcq",
              id: "en-b1-05-h1-4",
              no: 4,
              ref: "a4",
              text: "What does the speaker advise?",
              options: ["Always buy the card", "Count all the museums that are on the list", "Count only the museums you will enter"],
              answer: 2,
              explain:
                "Öğüt ayrımı kendisi kuruyor: «count the museums you will really enter, not the ones on the list». Dördün altında kart neredeyse hiç kazandırmıyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-05-h1-5",
              no: 5,
              ref: "a5",
              text: "What is different tonight?",
              options: ["The kitchen closes earlier", "Breakfast starts an hour later", "There is no hot water"],
              answer: 0,
              explain:
                "Değişen tek şey mutfağın saati: «closes at eleven tonight, not at midnight». Kahvaltı normal ve sıcak su holdeki makinede bütün gece açık.",
            },
            {
              kind: "mcq",
              id: "en-b1-05-h1-6",
              no: 6,
              ref: "a6",
              text: "What is the speaker doing?",
              options: ["Cancelling the tour for the whole group", "Agreeing to help within a time limit", "Asking somebody to replace her"],
              answer: 1,
              explain:
                "Konuşmacı geliyor ama sınır koyuyor: «I can do the tour with the group, but I have to be back by two». Dalia yalnız liman bölümünü alıyor, tur iptal edilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-05-h1-7",
              no: 7,
              ref: "a7",
              text: "What does the speaker recommend?",
              options: ["Answering messages immediately", "Employing somebody else to answer the messages", "Setting an answering time and saying so"],
              answer: 2,
              explain:
                "Öneri iki adımlı: «Answer twice a day, say so in the advert». Anında cevap vermek tam olarak eleştirilen davranış; personel almaktan hiç söz edilmiyor.",
            },
          ],
        },
        {
          id: "en-b1-05-h2",
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
              situation: "İki arkadaş kısa süreli kiralamayı konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Freja", text: "Are you renting the flat out this summer?" },
                { speaker: "Anouk", text: "Not any more." },
                { speaker: "Freja", text: "Really? It paid for your holiday." },
                { speaker: "Anouk", text: "It paid for my holiday and it cost me my neighbours. That is not a good exchange." },
              ],
            },
            {
              kind: "audio",
              id: "b2",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki arkadaş bir şehir turunu konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Iker", text: "How was the walking tour?" },
                { speaker: "Rasmus", text: "Better than I expected. I thought it would be dates and kings. Half of it was about why the streets are that width." },
              ],
            },
            {
              kind: "audio",
              id: "b3",
              genre: "On the phone",
              genreTr: "Telefonda",
              situation: "İki arkadaş depozito meselesini konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Dalia", text: "Did you get the deposit back?" },
                { speaker: "Joris", text: "Three weeks later, and only after I wrote twice." },
                { speaker: "Dalia", text: "Was there damage?" },
                { speaker: "Joris", text: "A mark on a table that was there when I arrived. I took a photo on the first day, which is the only reason I have the money." },
              ],
            },
            {
              kind: "audio",
              id: "b4",
              genre: "At the tourist office",
              genreTr: "Turizm ofisinde",
              situation: "Bir ziyaretçi kart alıp almamayı soruyor.",
              plays: 2,
              segments: [
                { speaker: "Visitor", text: "The city card or single tickets?" },
                { speaker: "Clerk", text: "How many museums?" },
                { speaker: "Visitor", text: "Two, maybe three." },
                { speaker: "Clerk", text: "Then singles. The card is worth it from four, and only if you use the buses as well." },
              ],
            },
            {
              kind: "audio",
              id: "b5",
              genre: "At work",
              genreTr: "İş yerinde",
              situation: "İki meslektaş tatil ayını konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Iker", text: "Do you still go to the coast in August?" },
                { speaker: "Freja", text: "We go in June now. The town is the same, the sea is colder and there are four thousand fewer people." },
                { speaker: "Iker", text: "And the children?" },
                { speaker: "Freja", text: "School finishes on the tenth. It works." },
              ],
            },
            {
              kind: "audio",
              id: "b6",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki arkadaş uzun bir turdan söz ediyor.",
              plays: 2,
              segments: [
                { speaker: "Rasmus", text: "You did the ten-day trip, didn't you? How was it?" },
                { speaker: "Anouk", text: "I saw eleven towns and I can tell you almost nothing about any of them." },
                { speaker: "Rasmus", text: "Everybody does that once." },
                { speaker: "Anouk", text: "I have done it four times." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-05-h2-8",
              no: 8,
              ref: "b1",
              text: "Why did Anouk stop renting the flat out?",
              options: ["It was not profitable enough for her", "It damaged relationships nearby", "The rules changed"],
              answer: 1,
              explain:
                "Anouk kazancı kabul edip bedeli veriyor: «It paid for my holiday and it cost me my neighbours». Kazanç var, yani kârsızlık değil; kural değişikliği hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-05-h2-9",
              no: 9,
              ref: "b2",
              text: "What surprised Rasmus?",
              options: ["The length of the tour in the rain", "The number of people", "The subject of the tour"],
              answer: 2,
              explain:
                "Beklenti ile gerçek yan yana: «I thought it would be dates and kings. Half of it was about why the streets are that width». Süre ve kalabalık hiç anılmıyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-05-h2-10",
              no: 10,
              ref: "b3",
              text: "What does Joris say helped him?",
              options: ["A photograph taken on arrival", "A phone call to the owner", "The wording of the agreement in the contract"],
              answer: 0,
              explain:
                "Joris nedeni kendisi söylüyor: «I took a photo on the first day, which is the only reason I have the money». Sözleşme ya da telefon geçmiyor; yazışma iki mektupla olmuş.",
            },
            {
              kind: "mcq",
              id: "en-b1-05-h2-11",
              no: 11,
              ref: "b4",
              text: "What does the clerk recommend?",
              options: ["The city card for three days", "Single tickets", "Four museums"],
              answer: 1,
              explain:
                "Görevli iki üç müze için «Then singles» diyor. Kart dörtten itibaren ve ancak otobüs de kullanılırsa değiyor; dört bir eşik, bir öneri değil.",
            },
            {
              kind: "mcq",
              id: "en-b1-05-h2-12",
              no: 12,
              ref: "b5",
              text: "Why does Freja's family go in June?",
              options: ["The sea is warmer then", "The school year is shorter", "There are fewer people"],
              answer: 2,
              explain:
                "Freja üç şeyi sayıyor ve tek olumlu fark kalabalık: «four thousand fewer people». Deniz DAHA SOĞUK; okul da onunda bitiyor, bu bir kolaylık ama gerekçe değil.",
            },
            {
              kind: "mcq",
              id: "en-b1-05-h2-13",
              no: 13,
              ref: "b6",
              text: "What does Anouk admit?",
              options: ["She has repeated the same mistake", "She did not enjoy any part of the trip", "She saw fewer towns than planned"],
              answer: 0,
              explain:
                "Son cümle itiraf: «I have done it four times». On bir kasabayı görüp hiçbirini anlatamamak bir kez olsa sıradan; dört kez olunca tekrarlanan bir hata.",
            },
          ],
        },
        {
          id: "en-b1-05-h3",
          no: 3,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear a talk for new volunteer guides. Complete the notes, questions 14 to 19. Write ONE or TWO words or a number in each gap. You hear the talk twice.",
          promptTr:
            "Yeni gönüllü rehberlere yapılan konuşmayı dinleyeceksin. 14–19. maddelerdeki notları tamamla. Her boşluğa BİR ya da İKİ sözcük veya bir sayı yaz. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Talk",
              genreTr: "Sunum",
              situation: "Sorumlu, yeni gönüllü rehberlere bilgi veriyor.",
              plays: 2,
              segments: [
                {
                  text: "Welcome, and thank you for coming. We started in 2016 with four guides and we now have twenty-six. Last year we took eleven thousand people around the old town. The tour is free, and the guides are paid from what visitors give at the end; the average is about six euros a person. We run every morning at ten and, from May, also at five in the afternoon. New guides walk with an experienced guide for the first eight tours, whatever their background. And the question everybody asks: yes, we cancel for ice, but never for rain.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notes",
              genreTr: "Not kâğıdı",
              title: "Volunteer guides — notes",
              body: `Started in:                {{14}}
Number of guides now:      {{15}}
People last year:          {{16}}
Average given per person:  {{17}} euros
Second tour from May at:   {{18}}
New guides walk with an experienced guide for: {{19}} tours`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b1-05-h3-14",
              no: 14,
              ref: "c1",
              text: "Gap 14",
              accept: ["2016"],
              explain:
                "«We started in 2016 with four guides» — kuruluş yılı. Dört, o andaki rehber sayısı; iki sayı aynı cümlede geçtiği için ayırmak gerekiyor.",
            },
            {
              kind: "gap",
              id: "en-b1-05-h3-15",
              no: 15,
              ref: "c1",
              text: "Gap 15",
              accept: ["26", "twenty-six"],
              explain:
                "«we now have twenty-six» — bugünkü rehber sayısı. Dört kuruluş anına ait; not kâğıdı `now` diyerek hangisini istediğini belirtiyor.",
            },
            {
              kind: "gap",
              id: "en-b1-05-h3-16",
              no: 16,
              ref: "c1",
              text: "Gap 16",
              accept: ["11000", "eleven thousand"],
              explain:
                "«Last year we took eleven thousand people around the old town» — geçen yılki katılımcı sayısı. Rakam da yazı da kabul edilir.",
            },
            {
              kind: "gap",
              id: "en-b1-05-h3-17",
              no: 17,
              ref: "c1",
              text: "Gap 17",
              accept: ["6", "six"],
              explain:
                "«the average is about six euros a person» — kişi başına bırakılan ortalama. Tur ücretsiz, yani altı bir fiyat değil, bir bağış ortalaması.",
            },
            {
              kind: "gap",
              id: "en-b1-05-h3-18",
              no: 18,
              ref: "c1",
              text: "Gap 18",
              accept: ["5", "five", "five in the afternoon"],
              explain:
                "«from May, also at five in the afternoon» — ikinci turun saati. On, her sabahki turun saati; iki saati karıştıran öğrenci sabahkini yazar.",
            },
            {
              kind: "gap",
              id: "en-b1-05-h3-19",
              no: 19,
              ref: "c1",
              text: "Gap 19",
              accept: ["8", "eight"],
              explain:
                "«New guides walk with an experienced guide for the first eight tours» — deneyimli rehberle geçirilen tur sayısı. Geçmiş deneyim fark etmiyor, sayı herkes için aynı.",
            },
          ],
        },
        {
          id: "en-b1-05-h4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt: "You hear an interview with a man who reduced the size of his guest house. Choose a, b or c for questions 20 to 25. You hear the interview twice.",
          promptTr: "Pansiyonunu küçülten bir adamla söyleşi dinleyeceksin. 20–25. maddeler için a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Interview",
              genreTr: "Söyleşi",
              situation: "Bir radyo programında pansiyon sahibiyle söyleşi yapılıyor.",
              plays: 2,
              segments: [
                { speaker: "Host", text: "Iker, you had fourteen rooms and you now have seven. People assume the business was failing." },
                { speaker: "Iker", text: "They do, and it makes a better story than the truth. We were full every summer. What we were not was a place I would have chosen to stay in myself, and after eleven years that started to matter." },
                { speaker: "Host", text: "Was the money the hardest part?" },
                { speaker: "Iker", text: "No. The hardest part was the staff. Halving the rooms meant three people had no job, and two of them had been with us since the start. I found work for one of them. I did not find work for the others, and I think about it." },
                { speaker: "Host", text: "How long did the decision take?" },
                { speaker: "Iker", text: "Four years, which is embarrassing to say out loud. I made a spreadsheet, which is what people like me do instead of deciding. It said the smaller version worked, twice, and I ignored it twice." },
                { speaker: "Host", text: "What finally moved you?" },
                { speaker: "Iker", text: "A review. Not a bad one; a fair one. It said the breakfast was excellent and the corridors smelled of the night before. Both were true, and I had known both for years without putting them in the same sentence." },
                { speaker: "Host", text: "And the smaller guest house in practice?" },
                { speaker: "Iker", text: "We earn slightly less and we work considerably less, which is not the answer people want. The real change is that I now know why every guest is in town, and I did not expect that to matter as much as it does." },
                { speaker: "Host", text: "Would you recommend it?" },
                { speaker: "Iker", text: "Not as a general rule. If you have a loan on the building, or a family living from it, this is advice from a comfortable position and it is worth saying so. What I would recommend is reading your own reviews as though somebody else had written them." },
              ],
              gloss: [
                { de: "a guest house", tr: "pansiyon", en: "guest house" },
                { de: "a corridor", tr: "koridor", en: "corridor" },
                { de: "a loan", tr: "kredi", en: "loan" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-05-h4-20",
              no: 20,
              ref: "d1",
              text: "Why did Iker reduce the number of rooms?",
              options: ["He did not want to stay there himself", "The guest house was losing money every year", "The building needed repairs"],
              answer: 0,
              explain:
                "Iker iflas savını reddediyor: «We were full every summer», sonra gerçek gerekçeyi veriyor: «What we were not was a place I would have chosen to stay in myself».",
            },
            {
              kind: "mcq",
              id: "en-b1-05-h4-21",
              no: 21,
              ref: "d1",
              text: "What was the hardest part?",
              options: ["The loss of income during the first two years", "Telling three people they had no job", "Finding new guests"],
              answer: 1,
              explain:
                "Parayı açıkça dışarıda bırakıyor: «No. The hardest part was the staff». Üç kişi işsiz kalmış ve ikisi başından beri oradaymış.",
            },
            {
              kind: "mcq",
              id: "en-b1-05-h4-22",
              no: 22,
              ref: "d1",
              text: "What does he say about the spreadsheet?",
              options: ["It gave him the wrong answer twice", "His accountant made it", "He used it to avoid deciding"],
              answer: 2,
              explain:
                "Kendi sözü: «a spreadsheet, which is what people like me do instead of deciding». Tablo doğru cevabı iki kez vermiş, o iki kez yok saymış.",
            },
            {
              kind: "mcq",
              id: "en-b1-05-h4-23",
              no: 23,
              ref: "d1",
              text: "What finally moved him?",
              options: ["A review that was fair", "A very bad review from a regular guest", "Advice from his staff"],
              answer: 0,
              explain:
                "Iker değerlendirmeyi tanımlıyor: «Not a bad one; a fair one», ve iki doğru cümleyi ilk kez yan yana görmesi karar anını yaratıyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-05-h4-24",
              no: 24,
              ref: "d1",
              text: "What surprised him about the smaller guest house?",
              options: ["How much less he earns", "How much the contact with guests matters", "How much harder the daily work turned out to be"],
              answer: 1,
              explain:
                "Kazanç ve iş yükü için «slightly less» ve «considerably less» diyor, yani sürpriz değil. Sürpriz olan: «I did not expect that to matter as much as it does».",
            },
            {
              kind: "mcq",
              id: "en-b1-05-h4-25",
              no: 25,
              ref: "d1",
              text: "What does he recommend?",
              options: ["Halving the size of any small family business", "Employing fewer people", "Reading your reviews as a stranger would"],
              answer: 2,
              explain:
                "Öğüt son cümlede: «reading your own reviews as though somebody else had written them». Genel bir kural olarak küçülmeyi önermiyor, tersine kredisi olanlar için çekince koyuyor.",
            },
          ],
        },
      ],
    },

    /* ── WRITING ───────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 50,
      instruction: "This part has two tasks: an email and a longer text. Both are compulsory.",
      instructionTr: "Bu bölümde iki görev var: bir e-posta ve daha uzun bir metin. İkisi de zorunlu.",
      tasks: [
        {
          id: "en-b1-05-w1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "You booked a holiday flat for a week. When you arrived, two things were not as described in the advert. Write an email to the owner. Write about 100 words and cover all the points.",
          promptTr:
            "Bir hafta için tatil dairesi kiraladın. Vardığında iki şey ilandaki tarifle uyuşmuyordu. Ev sahibine bir e-posta yaz. Yaklaşık 100 kelime, bütün maddeleri işle.",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Say when you arrived and what you booked.", tr: "Ne zaman vardığını ve neyi kiraladığını söyle." },
              { de: "Describe the two differences clearly.", tr: "İki farkı açıkça anlat." },
              { de: "Say what you would like the owner to do.", tr: "Ev sahibinden ne yapmasını istediğini söyle." },
            ],
            sample: `Dear Mr Roth,

I booked your flat in Harbour Street for the week of 3 June and I arrived on Monday evening.

Two things are different from the advert. The advert says the flat is on the second floor; it is on the fourth, and there is no lift. It also promises a washing machine, and there is none in the flat or in the building.

I do not want to cancel, because the flat itself is clean and quiet. I would like a reduction for the week, or the use of a machine somewhere nearby.

Could you let me know by Wednesday?

Yours sincerely,
Anouk Dekker`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "Farklar somut mu anlatıldı? (\"ilandaki gibi değildi\" bir tarif değildir)",
              "Talep açık mı ve makul mü?",
              "Kayıt resmî mi ve ton çözüm odaklı mı?",
              "Yaklaşık 100 kelime yazıldı mı?",
            ],
          },
        },
        {
          id: "en-b1-05-w2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Write an article for a website with this title: \"A place I would not tell a tourist about\". Describe the place, say why you like it and explain whether you would really keep it secret. Write about 100 words.",
          promptTr:
            "Bir internet sitesi için şu başlıkla bir yazı yaz: \"Bir turiste söylemeyeceğim bir yer\". Yeri anlat, neden sevdiğini söyle ve gerçekten sır olarak tutup tutmayacağını açıkla. Yaklaşık 100 kelime.",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Describe the place.", tr: "Yeri anlat." },
              { de: "Say why you like it.", tr: "Neden sevdiğini söyle." },
              { de: "Say whether you would really keep it secret, and why.", tr: "Gerçekten sır tutar mıydın, neden, söyle." },
            ],
            sample: `There is a small beach twenty minutes north of the town, behind a car park that looks closed. There is no café and no sign, and in eight years I have never seen more than nine people there.

I like it because nothing happens. You can hear the water, and the only decision is whether to swim before or after you eat.

Would I keep it secret? Honestly, no. The people who live near it sell almost nothing to visitors, and a quiet beach is a luxury for me and an empty summer for them. I would tell a tourist. I would just not write the name.`,
            criteria: [
              "Yer somut mu anlatıldı? (nerede, neye benziyor)",
              "Beğeni gerekçelendirildi mi?",
              "Sır tutma sorusu gerçekten yanıtlandı mı, yoksa geçiştirildi mi?",
              "Karşı görüşe pay bırakıldı mı?",
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
          id: "en-b1-05-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about travel and about the place where you live.",
          promptTr: "Sana yolculuk ve yaşadığın yer hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good afternoon. Could you describe the place where you live to somebody who has never been there?", tr: "İyi günler. Yaşadığın yeri hiç gitmemiş birine anlatır mısın?" },
            { who: "you", hint: "Yeri sırayla anlat: büyüklük, insanlar, bir ayrıntı.", expect: "bir yeri düzenli biçimde betimlemek", seconds: 40 },
            { who: "partner", de: "Thank you. Has the number of visitors to your area changed in the last few years?", tr: "Teşekkürler. Bölgene gelen ziyaretçi sayısı son birkaç yılda değişti mi?" },
            { who: "you", hint: "Present perfect ya da `used to` ile bir değişimi anlat.", expect: "zaman içindeki bir değişimi anlatmak", seconds: 40 },
            { who: "partner", de: "And if you could change one thing about how visitors use your town, what would it be?", tr: "Ziyaretçilerin şehrini kullanma biçiminde bir şeyi değiştirebilsen bu ne olurdu?" },
            { who: "you", hint: "Koşul kipiyle cevapla ve gerekçelendir.", expect: "ikinci tip koşul cümlesiyle bir varsayım kurmak", seconds: 40 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "describe a place in an ordered way", tr: "Bir yeri düzenli anlatmak" },
              { de: "describe a change over time", tr: "Zaman içindeki bir değişikliği anlatmak" },
              { de: "use a second conditional", tr: "İkinci tip koşulu kullanmak" },
            ],
            sample:
              "I live in a town of about thirty thousand people, twenty minutes from the sea. There is one long street with everything on it and the rest is houses. It used to be quiet in summer, but since a film was made here we have had coaches every weekend. If I could change one thing, I would move the coach park outside the old town, because the buses stand where the market used to be.",
            criteria: [
              "Yer düzenli mi anlatıldı? (büyüklük, konum, ayrıntı)",
              "`used to` ya da present perfect ile değişim anlatıldı mı?",
              "Son cevapta ikinci tip koşul kuruldu mu?",
              "Cevaplar geliştirildi mi, tek cümlede mi kaldı?",
            ],
          },
        },
        {
          id: "en-b1-05-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about one minute. Compare these two ways of visiting a city: three days with a plan and a list, or three days with no plan at all. Say which you would prefer and why.",
          promptTr:
            "Yaklaşık bir dakika tek başına konuş. Bir şehri gezmenin şu iki yolunu karşılaştır: planlı ve listeli üç gün mü, hiç plansız üç gün mü? Hangisini tercih edeceğini ve nedenini söyle.",
          prepSeconds: 60,
          speakSeconds: 75,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "compare the two ways", tr: "İki yolu karşılaştır" },
              { de: "say which you prefer and why", tr: "Hangisini tercih ettiğini ve nedenini söyle" },
              { de: "mention one disadvantage of your choice", tr: "Seçtiğin yolun bir olumsuz yanını da söyle" },
            ],
            sample:
              "With a plan you see the things you came for, and you do not stand in the street at four o'clock deciding. On the other hand, a list turns three days into work, and the best hour of any trip is usually not on it. I would choose no plan, mainly because I remember the accidents and not the museums. The disadvantage is honest: twice I have gone home without seeing the one thing everybody asks about, and I did feel stupid.",
            criteria: [
              "İki yol da gerçekten karşılaştırıldı mı?",
              "Karşılaştırma yapıları kullanıldı mı? (on the other hand, whereas, turns … into)",
              "Tercih gerekçelendirildi mi?",
              "Seçilen yolun olumsuz yanı da söylendi mi?",
              "Bir dakika kesintisiz konuşuldu mu?",
            ],
          },
        },
        {
          id: "en-b1-05-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Our town has money for one thing to make life easier for people who live here. Talk with me about the options and decide together.",
          promptTr:
            "Şehrimizin, burada yaşayanların hayatını kolaylaştıracak tek bir iş için parası var. Seçenekleri benimle konuş ve birlikte karar ver.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "The options are: a limit on short-term renting, more buses in the evening, a car park outside the old town, or lower rents for local shops. Which do you think we should choose?", tr: "Seçenekler: kısa süreli kiralamaya sınır, akşam daha çok otobüs, eski şehrin dışında bir otopark ya da yerel dükkânlara düşük kira. Sence hangisini seçmeliyiz?" },
            { who: "you", hint: "Bir seçenek seç ve gerekçelendir.", expect: "bir seçeneği seçmek ve gerekçelendirmek", seconds: 40 },
            { who: "partner", de: "I understand. But a limit on renting takes money away from families who need it, and it is very hard to check. Does that change your mind?", tr: "Anlıyorum. Ama kiralama sınırı ihtiyacı olan ailelerin gelirini kesiyor ve denetlemesi çok zor. Bu fikrini değiştirir mi?" },
            { who: "you", hint: "İtiraza doğrudan karşılık ver: kabul et ya da çürüt.", expect: "bir itiraza doğrudan karşılık vermek", seconds: 40 },
            { who: "partner", de: "Fair enough. So what do we put forward at the meeting?", tr: "Peki. Toplantıda neyi öneriyoruz?" },
            { who: "you", hint: "Ortak bir karar ver ve kısaca özetle.", expect: "ortak bir karara varmak ve gerekçesini özetlemek", seconds: 35 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "give an opinion with a reason", tr: "Görüşü gerekçesiyle vermek" },
              { de: "answer an objection directly", tr: "Bir itiraza doğrudan karşılık vermek" },
              { de: "reach a decision together", tr: "Birlikte bir karara varmak" },
            ],
            sample:
              "I would start with the limit on short-term renting, because it is the only option that changes who can live here. You are right that it takes income from families, and that is a real cost; I would set the limit high enough to allow one flat and not four. All right: let us put the evening buses forward, since everybody uses them, and bring the renting question back with proper numbers next year.",
            criteria: [
              "Görüş gerekçelendirildi mi?",
              "İtiraza doğrudan mı karşılık verildi?",
              "Karşı tarafın sözlerine gönderme yapıldı mı?",
              "Sonunda ortak bir karar çıktı mı?",
            ],
          },
        },
        {
          id: "en-b1-05-s4",
          no: 4,
          format: "speaking",
          goal: "interaction",
          prompt: "We talk a little more about the same topic: who a town belongs to.",
          promptTr: "Aynı konu üzerine biraz daha konuşuyoruz: bir şehir kime aittir.",
          prepSeconds: 15,
          exchange: [
            { who: "partner", de: "Do you think tourism does more good or more harm to a small town?", tr: "Sence turizm küçük bir şehre daha çok yarar mı yoksa zarar mı veriyor?" },
            { who: "you", hint: "Görüşünü söyle ve bir örnek ver.", expect: "genel bir soruya görüş bildirmek ve örneklendirmek", seconds: 40 },
            { who: "partner", de: "Some people say that a town without visitors simply dies. Would you agree?", tr: "Bazıları ziyaretçisiz bir şehrin öleceğini söylüyor. Katılır mısın?" },
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
              "I think it does both, and the difference is who decides. In my grandmother's village the visitors pay for the bus that she also uses, which nobody would have run for forty people. I partly agree that a town without visitors dies, although I would say that a town with only visitors dies too, just more slowly and with better paint.",
            criteria: [
              "Görüş açıkça bildirildi mi?",
              "Somut bir örnek verildi mi?",
              "Kısmi katılım ifadeleri kullanıldı mı? (I partly agree, it depends on …)",
              "Cevaplar geliştirildi mi?",
            ],
          },
        },
      ],
    },
  ],
};
