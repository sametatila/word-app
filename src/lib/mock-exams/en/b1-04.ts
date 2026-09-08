import type { MockPaper } from "../types";

/**
 * B1 · Deneme 4 — "Money, Work and Time Off".
 *
 * B1'in öteki üç denemesiyle AYNI PLAN; konu ayrı. Para ve çalışma koşulları
 * B1'de ayrı bir alan çünkü sözleşme, izin ve ücret konuları hem sayı hem de
 * kibar itiraz dili istiyor; okuma görevi 3 ile dinleme görevi 4 bu yüzden
 * doğrudan görüş ölçüyor.
 *
 * B1 İMZALARI: present perfect, ilgi cümlesi, koşul cümlesi ve
 * `although / however / used to` gibi ileri bağlaçlar metinlerde geçiyor.
 */
export const EN_B1_04: MockPaper = {
  id: "en-b1-04",
  course: "en",
  level: "B1",
  no: 4,
  theme: "Money, Work and Time Off",
  themeTr: "Para, iş ve izin",
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
          id: "en-b1-04-l1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Read the five texts and questions 1 to 5. Choose a, b or c.",
          promptTr: "Beş metni ve 1–5. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "m1",
              genre: "Notice at a post office",
              genreTr: "Postane duyurusu",
              title: "Counter hours",
              body: `From 3 June this counter closes at four instead of five. Cash payments are still possible at the machine in the hall until midnight. Letters that need a signature must be collected before four.`,
            },
            {
              kind: "text",
              id: "m2",
              genre: "Email from an employer",
              genreTr: "İşverenden e-posta",
              title: "Summer closing",
              body: `Dear colleagues, the summer closing this year is the last two weeks of August, not the first two. Anybody who has already booked flights should write to me by Friday and we will find a solution. Holiday that is not taken by December is lost.`,
            },
            {
              kind: "text",
              id: "m3",
              genre: "Advert",
              genreTr: "İlan",
              title: "Where does it actually go?",
              body: `Our free workshop shows you where your money actually goes. Bring three months of bank statements, or a rough list if you do not have them. We do not sell anything, and we do not look at your statements: you do.`,
            },
            {
              kind: "text",
              id: "m4",
              genre: "Message",
              genreTr: "İleti",
              title: "Shifts again",
              body: `Farah, I have swapped Thursday with Pavel, so you and I are on the same shift again. The list on the wall is still the old one; the version by email is correct. Please do not print the wall one for the team.`,
            },
            {
              kind: "text",
              id: "m5",
              genre: "Notice at a community centre",
              genreTr: "Toplum merkezi duyurusu",
              title: "Evening course places",
              body: `Places on the evening course are held for ten days after you apply. If the fee has not arrived by then, the place goes to the next person on the list. People who pay for the whole year get the tenth month free.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-04-l1-1",
              no: 1,
              ref: "m1",
              text: "What can you still do after four o'clock?",
              options: ["Collect a letter that needs a signature", "Speak to somebody at the counter", "Put money in through the machine"],
              answer: 2,
              explain:
                "Duyuru gişeyi kapatıyor ama makineyi açık bırakıyor: nakit ödemeler «until midnight» sürüyor. İmza isteyen mektuplar tam tersine «must be collected before four».",
            },
            {
              kind: "mcq",
              id: "en-b1-04-l1-2",
              no: 2,
              ref: "m2",
              text: "What should staff do if they have booked flights for early August?",
              options: ["Contact the writer this week", "Change the flights themselves", "Take the days in December"],
              answer: 0,
              explain:
                "E-posta tek bir adım istiyor: «should write to me by Friday and we will find a solution». Bileti kendi başına değiştirmek istenmiyor; aralık ise izin kullanmanın SON tarihi, bir çözüm değil.",
            },
            {
              kind: "mcq",
              id: "en-b1-04-l1-3",
              no: 3,
              ref: "m3",
              text: "What does the workshop promise?",
              options: ["A written plan made by an adviser for you", "That nobody else sees your figures", "A cheaper bank account"],
              answer: 1,
              explain:
                "İlan bunu açıkça söylüyor: «we do not look at your statements: you do». Hazır bir plan da satılmıyor, çünkü «We do not sell anything»; banka hesabı hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-04-l1-4",
              no: 4,
              ref: "m4",
              text: "Which list should be used?",
              options: ["The one on the wall", "The printed one for the team", "The one sent by email"],
              answer: 2,
              explain:
                "İleti hangisinin geçerli olduğunu söylüyor: «the version by email is correct». Duvardaki liste eski ve çıktısının alınması açıkça yasaklanıyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-04-l1-5",
              no: 5,
              ref: "m5",
              text: "What happens if you do not pay within ten days?",
              options: ["You pay more for the same place", "Somebody else gets your place", "You wait for the next year"],
              answer: 1,
              explain:
                "Kural açık: «the place goes to the next person on the list». Ek ücret diye bir şey yok; onuncu ayın bedava olması ise yıllık ödeyenler için ayrı bir avantaj.",
            },
          ],
        },
        {
          id: "en-b1-04-l2",
          no: 2,
          format: "match",
          goal: "orientation",
          prompt:
            "Read about five people, 6 to 10. Then read the eight adverts a to h. Which advert is right for each person? You use each advert once only.",
          promptTr:
            "6–10. maddelerdeki beş kişiyi oku. Sonra a'dan h'ye sekiz ilanı oku. Her kişiye hangi ilan uyar? Her ilan en fazla bir kez kullanılır.",
          options: [
            { key: "a", label: "Weekend Market Stall", body: "Half a table for one Saturday, from twelve pounds. Good for testing whether people will pay for what you make. No electricity." },
            { key: "b", label: "Tax Help Evening", body: "Volunteers answer questions about your first year of working for yourself. Third Tuesday of the month, six to eight. Bring your own numbers." },
            { key: "c", label: "Second Language Pay", body: "A list of companies that pay extra for a second language, updated every month and sorted by city. Free to read, you register with an email address." },
            { key: "d", label: "Cover for the Holidays", body: "Short jobs of one to three weeks while other people are away. Mostly offices and small shops. You are paid weekly." },
            { key: "e", label: "Time Bank", body: "You give an hour of what you can do and take an hour of what you cannot. No money changes hands. Meetings once a month." },
            { key: "f", label: "Bike Courier Shifts", body: "Four-hour shifts, and you choose the days a week in advance. Your own bike, our bag. Paid at the end of every month." },
            { key: "g", label: "Return to Work Group", body: "For people who have been at home for two years or more. Six mornings: application letters, interviews, and what to say about the gap." },
            { key: "h", label: "Night Warehouse Work", body: "Ten till six, four nights a week. Boots provided. The bus does not run at that hour, so you need your own transport." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b1-04-l2-6",
              no: 6,
              text: "Astrid makes jam at home and wants to find out whether strangers would buy it.",
              answer: "a",
              explain:
                "İlan tam bu soruyu satıyor: «Good for testing whether people will pay for what you make», üstelik tek bir cumartesi ve on iki pounddan başlayan bir masrafla. Zaman bankasında (e) para hiç el değiştirmiyor, yani satış denemesi olmaz.",
            },
            {
              kind: "match",
              id: "en-b1-04-l2-7",
              no: 7,
              text: "Pavel started working for himself in March and does not understand what he must declare.",
              answer: "b",
              explain:
                "İlan hem kitleyi hem konuyu veriyor: «questions about your first year of working for yourself». Gönüllüler soru yanıtlıyor, iş bulmuyor; iş ilanları (d, f, h) beyanname sorusuna cevap değil.",
            },
            {
              kind: "match",
              id: "en-b1-04-l2-8",
              no: 8,
              text: "Yara looked after her father for three years and now wants a job again.",
              answer: "g",
              explain:
                "İlan süreyi ve asıl güçlüğü adlandırıyor: «For people who have been at home for two years or more» ve «what to say about the gap». Üç yıl bu eşiği aşıyor.",
            },
            {
              kind: "match",
              id: "en-b1-04-l2-9",
              no: 9,
              text: "Diego is free only between the middle of July and the middle of September and wants to work in an office.",
              answer: "d",
              explain:
                "İlan hem süreyi hem yeri veriyor: «Short jobs of one to three weeks while other people are away» ve «Mostly offices and small shops». Bisiklet kuryeliği (f) esnek ama ofis işi değil.",
            },
            {
              kind: "match",
              id: "en-b1-04-l2-10",
              no: 10,
              text: "Mert can fix almost anything but has no money to pay somebody to teach his daughter maths.",
              answer: "e",
              explain:
                "İlan takası tarif ediyor: «You give an hour of what you can do and take an hour of what you cannot», üstelik «No money changes hands». Mert'in verecek becerisi var, parası yok; kurulan denklem tam bu.",
            },
          ],
        },
        {
          id: "en-b1-04-l3",
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
              title: "I asked eleven colleagues what they earn",
              body: `Last spring I did something my mother would call very rude. Over four months I asked eleven colleagues what they earn, and I told each of them my own number first.

I should say at once that nobody was angry. Two people said no, politely, and one of those came back three weeks later and told me anyway. What surprised me was not the refusals but the relief. Several people said they had wanted to ask somebody for years.

The numbers themselves were less dramatic than I expected. Nine of the eleven were within a few hundred pounds of each other. However, the two who were clearly below had one thing in common. Both had joined during a year when the company was not hiring much, and neither had ever asked for a rise since.

That is the finding I keep thinking about. The gap was not created by a manager who decided that somebody was worth less. It was created by the month somebody happened to be hired, and then nobody looked at it again.

If somebody had asked me two years ago, I would have said that pay is a private matter. I am still not going to tell you that every company should publish a list. I do not know whether that would help, and I can see how it could go wrong. But the private version cost me nothing, and one colleague, who had never asked for anything, has since asked for eight per cent and received six.`,
              gloss: [
                { de: "a rise", tr: "zam", en: "pay rise" },
                { de: "relief", tr: "rahatlama", en: "relief" },
                { de: "to publish", tr: "yayımlamak", en: "publish" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-04-l3-11",
              no: 11,
              text: "What surprised the writer most?",
              options: ["That two colleagues refused to answer", "That people were glad to talk about it", "That the eleven numbers were nearly the same", "That one colleague changed her mind"],
              answer: 1,
              explain:
                "Yazı karşılaştırmayı kendisi yapıyor: «What surprised me was not the refusals but the relief», ve arkasından yıllardır sormak isteyenlerden söz ediyor. Ret ve fikir değiştirme metinde var ama şaşırtıcı olan onlar değil.",
            },
            {
              kind: "mcq",
              id: "en-b1-04-l3-12",
              no: 12,
              text: "What did the two lowest-paid colleagues have in common?",
              options: ["They worked in the same department", "They had been at the company longest", "A manager had decided that they were worth less than the others", "They joined in a bad year and never asked for more"],
              answer: 3,
              explain:
                "Metin ortak noktayı sayıyor: «Both had joined during a year when the company was not hiring much, and neither had ever asked for a rise since». Yönetici kararı ise bir sonraki paragrafta açıkça çürütülüyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-04-l3-13",
              no: 13,
              text: "What does the writer say created the gap?",
              options: ["Timing that nobody reviewed later", "A rule about starting salaries", "The refusal of two colleagues to talk", "The size of the company"],
              answer: 0,
              explain:
                "Cümle açık: «It was created by the month somebody happened to be hired, and then nobody looked at it again». Yazıda başlangıç ücretiyle ilgili bir kural ya da şirket büyüklüğü tartışılmıyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-04-l3-14",
              no: 14,
              text: "What is the writer's view on publishing salaries?",
              options: ["Every company should do it", "It is rude to ask about money", "She is not sure that it would help", "It works only in small companies where everybody knows everybody"],
              answer: 2,
              explain:
                "Yazı çekimser: «I do not know whether that would help, and I can see how it could go wrong». Kabalık görüşü annesine ait ve yazının kendi tutumu değil; şirket büyüklüğü hiç tartışılmıyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-04-l3-15",
              no: 15,
              text: "What was one result of the writer's conversations?",
              options: ["The company published a list of all the salaries", "Two colleagues left the company", "The writer received a rise herself", "A colleague asked for more money and got some"],
              answer: 3,
              explain:
                "Son cümle sonucu veriyor: bir meslektaş «has since asked for eight per cent and received six». Yazının kendi zammından söz edilmiyor ve şirket bir liste yayımlamıyor; tersine yazı bunu önermekten kaçınıyor.",
            },
          ],
        },
        {
          id: "en-b1-04-l4",
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
              title: "The office that stopped counting hours",
              body: `Five years ago a small design company in the north stopped recording how long anybody worked. {{16}}

The rule that replaced the timesheet was short: finish the work you agreed to, and tell somebody early if you cannot. {{17}}

The first year was uncomfortable. Two people worked far too much, because nobody was now telling them to go home. {{18}}

The change that mattered most was invisible from outside. Meetings got shorter, because a meeting no longer counted as work done. {{19}}

The company has kept the system, but the founder is careful about recommending it. {{20}}`,
              gloss: [
                { de: "a timesheet", tr: "mesai çizelgesi", en: "timesheet" },
                { de: "a founder", tr: "kurucu", en: "founder" },
                { de: "to record", tr: "kaydetmek", en: "record" },
              ],
            },
          ],
          options: [
            { key: "a", label: "a", body: "She points out that her staff are twelve people who all know each other's work." },
            { key: "b", label: "b", body: "One of them left after eight months, and the company treats that as its own mistake." },
            { key: "c", label: "c", body: "Nobody outside the building believed that this was a serious decision." },
            { key: "d", label: "d", body: "That sentence has not changed since, although almost everything else has." },
            { key: "e", label: "e", body: "An hour that produces nothing is easier to defend when somebody is counting hours." },
            { key: "f", label: "f", body: "Design work has become cheaper to buy from other countries in the last decade." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b1-04-l4-16",
              no: 16,
              text: "Gap 16",
              answer: "c",
              explain:
                "İlk cümle alışılmadık bir kararı duyuruyor: «stopped recording how long anybody worked». (c) dışarıdakilerin tepkisini veriyor ve kararın ne kadar sıra dışı olduğunu ölçüyor.",
            },
            {
              kind: "match",
              id: "en-b1-04-l4-17",
              no: 17,
              text: "Gap 17",
              answer: "d",
              explain:
                "Önceki cümle kuralı tek bir cümle olarak veriyor; (d) «That sentence» ile ona geri gönderme yapıyor ve beş yıl boyunca değişmediğini söylüyor. Gönderme öğesi bağı doğrudan kuruyor.",
            },
            {
              kind: "match",
              id: "en-b1-04-l4-18",
              no: 18,
              text: "Gap 18",
              answer: "b",
              explain:
                "Paragraf iki kişinin fazla çalıştığını söylüyor; (b) «One of them» ile o iki kişiye gönderme yapıp sonucunu veriyor. Şirketin bunu kendi hatası sayması, paragrafın «uncomfortable» değerlendirmesini tamamlıyor.",
            },
            {
              kind: "match",
              id: "en-b1-04-l4-19",
              no: 19,
              text: "Gap 19",
              answer: "e",
              explain:
                "Önceki cümle gerekçesini kendi veriyor: «a meeting no longer counted as work done». (e) aynı düşünceyi ters yönden söylüyor: saat sayıldığında hiçbir şey üretmeyen bir saati savunmak kolaydır.",
            },
            {
              kind: "match",
              id: "en-b1-04-l4-20",
              no: 20,
              text: "Gap 20",
              answer: "a",
              explain:
                "Son cümle çekinceyi bildiriyor: «the founder is careful about recommending it». (a) çekincenin gerekçesini veriyor: on iki kişilik, birbirinin işini bilen bir ekip. (f) tasarım işinin ucuzlamasından söz ediyor ve metnin hiçbir yerinde fiyat ya da rekabet tartışılmıyor — hiçbir boşluğa uymayan cümle odur.",
            },
          ],
        },
        {
          id: "en-b1-04-l5",
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
              title: "Three lines in your first contract",
              body: `Before you sign a contract for your first job, {{21}} sure that you understand three lines of it.

The first is the notice period. If you want to leave, how much warning must you {{22}}? Two months can be reasonable; six is not, for a first job.

The second is overtime. Some contracts say that extra hours are already {{23}} in the salary. That sentence can mean almost anything, so ask what a normal week looked like last year.

The third is holiday. Find out whether the days you have not used at the end of the year are {{24}} over, or simply lost.

None of these questions makes a bad impression. An employer who cannot answer them {{25}} you something useful.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-04-l5-21",
              no: 21,
              text: "Gap 21",
              options: ["do", "become", "get", "make"],
              answer: 3,
              explain:
                "`make sure` sabit bir eşdizim: emin olmak. `become sure` dilbilgisel görünür ama bir durumun kendiliğinden oluşmasını anlatır, oysa cümle okura bir iş buyuruyor; `do sure` ve `get sure` İngilizcede yoktur.",
            },
            {
              kind: "mcq",
              id: "en-b1-04-l5-22",
              no: 22,
              text: "Gap 22",
              options: ["give", "offer", "provide", "take"],
              answer: 0,
              explain:
                "`give notice` ve `give warning` kalıptır: bildirimi veren taraf çalışandır. `take notice` tam tersi anlama gelir (dikkate almak); `offer` gönüllü bir teklif, `provide` ise resmî bir tedarik bildirir ve ikisi de sözleşmedeki ihbar süresini anlatmaz.",
            },
            {
              kind: "mcq",
              id: "en-b1-04-l5-23",
              no: 23,
              text: "Gap 23",
              options: ["calculated", "added", "included", "kept"],
              answer: 2,
              explain:
                "`included in the salary` kalıbı bir şeyin ücrete dahil olduğunu söyler. `added` edat olarak `to` ister (`added to the salary`); `calculated` hesaplama işini, `kept` ise saklamayı anlatır ve ikisi de dahil olmayı bildirmez.",
            },
            {
              kind: "mcq",
              id: "en-b1-04-l5-24",
              no: 24,
              text: "Gap 24",
              options: ["taken", "carried", "transferred", "moved"],
              answer: 1,
              explain:
                "`carry over` kullanılmayan izin günlerinin ertesi yıla devretmesini anlatan öbek fiildir. `take over` devralmak, `move over` kenara çekilmek demektir; `transferred` ise `over` ile değil `to` ile kullanılır.",
            },
            {
              kind: "mcq",
              id: "en-b1-04-l5-25",
              no: 25,
              text: "Gap 25",
              options: ["tells", "says", "speaks", "talks"],
              answer: 0,
              explain:
                "`tell` iki nesne alabilir: «tells you something». `say` nesneyi `to` ile bağlar, `speak` ve `talk` ise doğrudan nesne almaz.",
            },
          ],
        },
        {
          id: "en-b1-04-l6",
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
              title: "On talking about pay",
              body: `Money is the one subject we are taught {{26}} to talk about at work.

I have worked in four companies, and in three of them nobody {{27}} mentioned a number out loud.

The fourth was different. Salaries were on an internal page, and {{28}} first I found that uncomfortable.

The page did not make me richer, {{29}} it did make me calmer.

If the page had existed in my first job, I {{30}} have saved two years of guessing.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b1-04-l6-26",
              no: 26,
              text: "Gap 26",
              accept: ["not"],
              explain:
                "Mastarın olumsuzu `not to + fiil` biçiminde kurulur: «we are taught not to talk about». Olumsuzluk `to` mastarından ÖNCE gelir; `do not talk` burada edilgen yapıya eklenemez.",
            },
            {
              kind: "gap",
              id: "en-b1-04-l6-27",
              no: 27,
              text: "Gap 27",
              accept: ["ever"],
              explain:
                "`nobody ever` olumsuz öznenin kapsamını tüm zamana yayar: hiç kimse hiçbir zaman. `never` burada gelemez, çünkü `nobody` zaten olumsuz ve İngilizcede çift olumsuz kullanılmaz.",
            },
            {
              kind: "gap",
              id: "en-b1-04-l6-28",
              no: 28,
              text: "Gap 28",
              accept: ["at"],
              explain:
                "`at first` başlangıçta demektir ve sonradan gelen bir değişikliği hazırlar; sonraki cümleler de tam bunu yapıyor. `in first` ya da `on first` kalıp değildir.",
            },
            {
              kind: "gap",
              id: "en-b1-04-l6-29",
              no: 29,
              text: "Gap 29",
              accept: ["but"],
              explain:
                "İki yarı karşıtlık kuruyor: zenginleştirmedi, ama sakinleştirdi. `but` bunu verir. `so` sonuç, `because` sebep bildirir ve ikisi de bu karşıtlığı taşıyamaz.",
            },
            {
              kind: "gap",
              id: "en-b1-04-l6-30",
              no: 30,
              text: "Gap 30",
              accept: ["would", "could"],
              explain:
                "Koşul yarısı `had existed`, yani gerçekleşmemiş bir geçmiş. Ana cümle bu durumda `would have` ya da `could have` ister. `will have` gelecek zamandır ve koşulun geçmişiyle çelişir.",
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
          id: "en-b1-04-h1",
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
              situation: "İstasyonda bilet makineleri hakkında anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "Ticket machines four and five are out of order this morning. Machines one to three are working, and the office is open from six. If you cannot buy a ticket before you travel, buy one on the train; there is no extra charge today." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Voicemail",
              genreTr: "Telesekreter iletisi",
              situation: "Bir işveren adaya ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello, this is about your interview on Wednesday. It is still at two, but it will now be in the building across the road, number 14. Ask at the desk there. Everything else is the same, and you do not need to bring anything." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "At work",
              genreTr: "İş yerinde",
              situation: "İki meslektaş fazladan bir vardiyayı konuşuyor.",
              plays: 2,
              segments: [
                { text: "Did you get the extra shift?" },
                { text: "I turned it down." },
                { text: "Really? It was double pay." },
                { text: "It was double pay on the night before my exam. That is not extra money, that is borrowed money." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Radyoda bir uzman dinleyici sorularını yanıtlıyor.",
              plays: 2,
              segments: [
                { text: "Listeners keep asking me the same question: should I pay off a small debt or start saving? The arithmetic almost always says pay the debt first, because it costs more than any account pays you. But arithmetic is not the only thing in a life." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Announcement",
              genreTr: "Duyuru",
              situation: "İş yerinde yeni izin sistemi anlatılıyor.",
              plays: 2,
              segments: [
                { text: "A short note about the new holiday system. You still ask your manager first; the system is only where you record it afterwards. Anything you booked before April is already in there, so please do not enter it a second time." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Voice message",
              genreTr: "Sesli ileti",
              situation: "Bir kişi cumartesi tezgâhı için ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hi, it is about Saturday. I can do the market stall with you, but I have to leave at two for my sister's thing. If we start at seven we will have the good hours anyway, and Tobias said he can stay until four." },
              ],
            },
            {
              kind: "audio",
              id: "a7",
              genre: "Talk",
              genreTr: "Sunum",
              situation: "Bir danışman kendi işini kuranlara sesleniyor.",
              plays: 2,
              segments: [
                { text: "The most common mistake I see in a first year of working for yourself is not putting money away for tax. People spend what is in the account, because it is in the account. Open a second one on the first day and move a third of everything into it." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-04-h1-1",
              no: 1,
              ref: "a1",
              text: "What can passengers do this morning?",
              options: ["Travel without paying anything at all today", "Buy a ticket on board without paying more", "Get their money back at the office"],
              answer: 1,
              explain:
                "Anons istisnayı tanımlıyor: «buy one on the train; there is no extra charge today». Bilet yine alınacak, yalnız ek ücret yok; para iadesi hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-04-h1-2",
              no: 2,
              ref: "a2",
              text: "What has changed about the interview?",
              options: ["The place", "The time", "The documents needed"],
              answer: 0,
              explain:
                "Değişen tek şey adres: «it will now be in the building across the road, number 14». Saat için «It is still at two», belgeler için «you do not need to bring anything» deniyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-04-h1-3",
              no: 3,
              ref: "a3",
              text: "Why did the speaker refuse the shift?",
              options: ["The pay was too low", "She was already working that night", "It was the night before an exam"],
              answer: 2,
              explain:
                "Gerekçe zamanlama: «It was double pay on the night before my exam». Ücret tam tersine iki katıydı; o gece başka bir vardiyası olduğu da söylenmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-04-h1-4",
              no: 4,
              ref: "a4",
              text: "What does the speaker advise?",
              options: ["Save and pay at the same time", "Clear the debt first", "Change to a better account"],
              answer: 1,
              explain:
                "Kayıt hesabı yapıyor: «The arithmetic almost always says pay the debt first, because it costs more than any account pays you». Son cümle bunu yumuşatıyor ama başka bir öneri getirmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-04-h1-5",
              no: 5,
              ref: "a5",
              text: "What must staff not do?",
              options: ["Ask a manager before booking", "Use the system after April", "Enter old bookings again"],
              answer: 2,
              explain:
                "Tek yasak son cümlede: «please do not enter it a second time». Yöneticiye sormak tersine hâlâ zorunlu; sistem de nisandan sonra kullanılmaya devam ediyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-04-h1-6",
              no: 6,
              ref: "a6",
              text: "What is the speaker doing?",
              options: ["Agreeing to help with a condition", "Asking somebody to work instead of her", "Cancelling the arrangement"],
              answer: 0,
              explain:
                "Konuşmacı geleceğini söylüyor ama bir sınır koyuyor: «I can do the market stall with you, but I have to leave at two». Tobias yerine geçmiyor, dörde kadar KALIYOR; iptal de yok.",
            },
            {
              kind: "mcq",
              id: "en-b1-04-h1-7",
              no: 7,
              ref: "a7",
              text: "What does the speaker recommend?",
              options: ["Charging more in the first year", "Asking an accountant a question every month", "Keeping tax money in another account"],
              answer: 2,
              explain:
                "Öneri somut: «Open a second one on the first day and move a third of everything into it». Fiyat ya da muhasebeci kayıtta hiç geçmiyor.",
            },
          ],
        },
        {
          id: "en-b1-04-h2",
          no: 2,
          format: "mcq",
          goal: "gist",
          prompt: "You hear six short conversations. What is the main point? Choose a, b or c. You hear every conversation twice.",
          promptTr: "Altı kısa konuşma dinleyeceksin. Ana nokta nedir? a, b ya da c'yi seç. Her konuşmayı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "At work",
              genreTr: "İş yerinde",
              situation: "İki meslektaş yaz iznini konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Astrid", text: "Are you taking the whole two weeks in August?" },
                { speaker: "Diego", text: "One week. I would rather keep days for December, when my brother is here and the flights are cheaper." },
                { speaker: "Astrid", text: "Cheaper in December?" },
                { speaker: "Diego", text: "In the first half, yes. Not at Christmas." },
              ],
            },
            {
              kind: "audio",
              id: "b2",
              genre: "At work",
              genreTr: "İş yerinde",
              situation: "İki meslektaş fatura sistemini konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Farah", text: "The new invoice system rejected mine twice." },
                { speaker: "Mert", text: "Did you put the project number in?" },
                { speaker: "Farah", text: "There is no field for it." },
                { speaker: "Mert", text: "There is, but it only appears after you choose the client. Everybody loses an hour to that." },
              ],
            },
            {
              kind: "audio",
              id: "b3",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki arkadaş bir kursu konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Mert", text: "How was the return-to-work course?" },
                { speaker: "Yara", text: "Better than I expected. I thought it would be about writing letters. Half of it was about how to talk about three years at home without apologising for them." },
              ],
            },
            {
              kind: "audio",
              id: "b4",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki arkadaş iş değiştirmeyi konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Diego", text: "Have you told them you are leaving?" },
                { speaker: "Astrid", text: "Not yet. My contract says two months." },
                { speaker: "Diego", text: "Two?" },
                { speaker: "Astrid", text: "I signed it at twenty-three and I did not read that line. It is the most expensive sentence I have never read." },
              ],
            },
            {
              kind: "audio",
              id: "b5",
              genre: "On the phone",
              genreTr: "Telefonda",
              situation: "İki arkadaş pazar tezgâhını paylaşmayı konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Tobias", text: "Do you want to split the stall on Saturday?" },
                { speaker: "Astrid", text: "How much is half?" },
                { speaker: "Tobias", text: "Twelve pounds, and we would each have about a metre." },
                { speaker: "Astrid", text: "I only have twenty jars. A metre is more than enough." },
              ],
            },
            {
              kind: "audio",
              id: "b6",
              genre: "At work",
              genreTr: "İş yerinde",
              situation: "İki meslektaş zam sonucunu konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Farah", text: "Did the pay rise come through?" },
                { speaker: "Pavel", text: "Six per cent, not the eight I asked for." },
                { speaker: "Farah", text: "Are you disappointed?" },
                { speaker: "Pavel", text: "I asked for eight because somebody told me to ask for more than I wanted. It worked exactly as she said it would." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-04-h2-8",
              no: 8,
              ref: "b1",
              text: "Why does Diego keep days for December?",
              options: ["He prefers to travel by train in winter", "His brother visits him in August", "The flights are cheaper then"],
              answer: 2,
              explain:
                "Diego iki gerekçe veriyor ve fiyatı da sınırlıyor: «the flights are cheaper», ama «In the first half, yes. Not at Christmas». Kardeşi aralıkta geliyor, ağustosta değil.",
            },
            {
              kind: "mcq",
              id: "en-b1-04-h2-9",
              no: 9,
              ref: "b2",
              text: "What is the problem?",
              options: ["The system is offline", "A field is hidden until a choice is made", "The invoice was sent to the wrong client last week"],
              answer: 1,
              explain:
                "Mert alanın var olduğunu ama koşullu göründüğünü söylüyor: «it only appears after you choose the client». Sistem çalışıyor, yalnız fatura reddediliyor; yanlış müşteriye gönderim hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-04-h2-10",
              no: 10,
              ref: "b3",
              text: "What surprised Yara?",
              options: ["The subject of most of the course", "The number of people on it", "How short the course was"],
              answer: 0,
              explain:
                "Yara beklentisini ve gerçeği yan yana koyuyor: «I thought it would be about writing letters. Half of it was about how to talk about three years at home». Katılımcı sayısı ve süre hiç anılmıyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-04-h2-11",
              no: 11,
              ref: "b4",
              text: "What is Astrid's problem?",
              options: ["She cannot decide whether to leave", "Her employer has refused to let her go early", "She must give a long period of notice"],
              answer: 2,
              explain:
                "Sözleşme iki ay ihbar istiyor ve Astrid o satırı okumamış: «It is the most expensive sentence I have never read». Ayrılma kararı verilmiş; işveren henüz haberdar bile değil.",
            },
            {
              kind: "mcq",
              id: "en-b1-04-h2-12",
              no: 12,
              ref: "b5",
              text: "What do they decide?",
              options: ["To share the cost of a stall", "To sell only twenty jars", "To take a bigger table"],
              answer: 0,
              explain:
                "Teklif paylaşmak: «Do you want to split the stall» ve yarısı on iki pound. Yirmi kavanoz Astrid'in elindeki miktar, alınan bir karar değil; masa da büyütülmüyor, tersine bir metre yetiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-04-h2-13",
              no: 13,
              ref: "b6",
              text: "How does Pavel feel about the result?",
              options: ["Disappointed with six per cent", "Satisfied, because the tactic worked", "Angry that he did not get the eight per cent"],
              answer: 1,
              explain:
                "Pavel sekizi bilerek istemiş: «somebody told me to ask for more than I wanted. It worked exactly as she said it would». Yani altı, baştan hedeflenen sonuç.",
            },
          ],
        },
        {
          id: "en-b1-04-h3",
          no: 3,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear a talk for new volunteers at a money advice centre. Complete the notes, questions 14 to 19. Write ONE or TWO words or a number in each gap. You hear the talk twice.",
          promptTr:
            "Bir para danışma merkezinin yeni gönüllülerine yapılan konuşmayı dinleyeceksin. 14–19. maddelerdeki notları tamamla. Her boşluğa BİR ya da İKİ sözcük veya bir sayı yaz. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Talk",
              genreTr: "Sunum",
              situation: "Merkezin sorumlusu yeni gönüllülere bilgi veriyor.",
              plays: 2,
              segments: [
                {
                  text: "Thank you for coming. A few numbers first. We opened in 2009 and last year we saw two thousand people. The average appointment lasts fifty minutes, which is longer than most services give, and that is deliberate. We are open Monday to Thursday; Friday is for training. The most common question is not about debt at all, it is about benefits, and that surprises almost every new volunteer. You will always sit with an experienced adviser for your first ten appointments. And one rule that we never bend: we do not phone anybody on a client's behalf. We sit next to them while they phone.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notes",
              genreTr: "Not kâğıdı",
              title: "Advice centre — notes",
              body: `Centre opened in:         {{14}}
People seen last year:    {{15}}
Average appointment:      {{16}} minutes
Friday is for:            {{17}}
Most common question:     {{18}}
Sit with an adviser for:  {{19}} appointments`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b1-04-h3-14",
              no: 14,
              ref: "c1",
              text: "Gap 14",
              accept: ["2009"],
              explain:
                "«We opened in 2009» — açılış yılı. Kayıttaki iki bin geçen yılki danışan sayısı, elli ise görüşme süresi; hangi sayının yıl olduğunu ayırmak gerekiyor.",
            },
            {
              kind: "gap",
              id: "en-b1-04-h3-15",
              no: 15,
              ref: "c1",
              text: "Gap 15",
              accept: ["2000", "two thousand"],
              explain:
                "«last year we saw two thousand people» — geçen yılki danışan sayısı. Not kâğıdı `last year` diyerek hangi sayıyı istediğini belirtiyor; rakam da yazı da kabul edilir.",
            },
            {
              kind: "gap",
              id: "en-b1-04-h3-16",
              no: 16,
              ref: "c1",
              text: "Gap 16",
              accept: ["50", "fifty"],
              explain:
                "«The average appointment lasts fifty minutes» ve bunun bilerek uzun tutulduğu ekleniyor. Not kâğıdında `minutes` basılı olduğu için boşluğa yalnız sayı yazılır.",
            },
            {
              kind: "gap",
              id: "en-b1-04-h3-17",
              no: 17,
              ref: "c1",
              text: "Gap 17",
              accept: ["training"],
              explain:
                "«We are open Monday to Thursday; Friday is for training». Cuma danışan görülen bir gün değil; merkezi pazartesi-perşembe açık sanıp cumayı boş bırakan öğrenci bu cümleyi kaçırmış olur.",
            },
            {
              kind: "gap",
              id: "en-b1-04-h3-18",
              no: 18,
              ref: "c1",
              text: "Gap 18",
              accept: ["benefits"],
              explain:
                "Kayıt beklentiyi bozuyor: «The most common question is not about debt at all, it is about benefits». Borç yazan öğrenci tam olarak çürütülen şıkkı almış olur.",
            },
            {
              kind: "gap",
              id: "en-b1-04-h3-19",
              no: 19,
              ref: "c1",
              text: "Gap 19",
              accept: ["10", "ten"],
              explain:
                "«You will always sit with an experienced adviser for your first ten appointments» — ilk on görüşme. Elli sayısı görüşme süresi, on ise görüşme sayısı.",
            },
          ],
        },
        {
          id: "en-b1-04-h4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt: "You hear an interview with a man who left a well-paid job. Choose a, b or c for questions 20 to 25. You hear the interview twice.",
          promptTr: "İyi ücretli bir işten ayrılan bir adamla söyleşi dinleyeceksin. 20–25. maddeler için a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Interview",
              genreTr: "Söyleşi",
              situation: "Bir radyo programında iş değiştiren biriyle söyleşi yapılıyor.",
              plays: 2,
              segments: [
                { speaker: "Host", text: "Pavel, you left a job that paid nearly twice what you earn now. People must ask you why." },
                { speaker: "Pavel", text: "They do, and they usually want a dramatic answer. There is not one. Nobody shouted at me and nothing terrible happened. I simply could not remember the last week I had been curious about anything." },
                { speaker: "Host", text: "Did the money make it hard to leave?" },
                { speaker: "Pavel", text: "The money was not the hard part. The hard part was the job title. I had spent eleven years collecting it, and it was on everything, including the way my parents described me to their neighbours." },
                { speaker: "Host", text: "How long did the decision take?" },
                { speaker: "Pavel", text: "Fourteen months, which is embarrassing to say out loud. I made a spreadsheet, which is what people like me do instead of deciding. The spreadsheet said go, twice, and I ignored it both times." },
                { speaker: "Host", text: "What actually changed your mind?" },
                { speaker: "Pavel", text: "A very small thing. A colleague I liked was moved into my old role in the next department, and I watched him become tired in about nine weeks. It was like watching a recording of myself." },
                { speaker: "Host", text: "And the lower salary in practice?" },
                { speaker: "Pavel", text: "We moved to a smaller flat, and that was harder for my partner than for me, which I want to say clearly because it was not only my decision. But we spend less, because I am not tired enough to buy my way out of things." },
                { speaker: "Host", text: "Would you recommend it?" },
                { speaker: "Pavel", text: "Not as a general rule. If you have debt or people depending on you, this is advice from a comfortable position, and it is worth saying so. What I would recommend is the spreadsheet, and then reading your own answer honestly the first time." },
              ],
              gloss: [
                { de: "a job title", tr: "unvan", en: "job title" },
                { de: "a spreadsheet", tr: "hesap tablosu", en: "spreadsheet" },
                { de: "curious", tr: "meraklı", en: "curious" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-04-h4-20",
              no: 20,
              ref: "d1",
              text: "Why did Pavel leave his job?",
              options: ["He had stopped being interested in the work", "He had a serious disagreement with a manager", "He was offered a better position elsewhere"],
              answer: 0,
              explain:
                "Pavel dramatik gerekçeleri baştan eliyor: «Nobody shouted at me and nothing terrible happened», sonra asıl sebebi veriyor: «I simply could not remember the last week I had been curious about anything».",
            },
            {
              kind: "mcq",
              id: "en-b1-04-h4-21",
              no: 21,
              ref: "d1",
              text: "What was the hardest part of leaving?",
              options: ["The loss of income", "Explaining the decision to his partner", "Giving up what he was called"],
              answer: 2,
              explain:
                "Pavel parayı açıkça dışarıda bırakıyor: «The money was not the hard part. The hard part was the job title». Unvanı on bir yılda toplamış ve ailesi bile onunla tarif ediyormuş.",
            },
            {
              kind: "mcq",
              id: "en-b1-04-h4-22",
              no: 22,
              ref: "d1",
              text: "What does he say about the spreadsheet?",
              options: ["It gave him the wrong answer", "He used it to avoid deciding", "His colleague made it for him"],
              answer: 1,
              explain:
                "Kendi sözü: «a spreadsheet, which is what people like me do instead of deciding». Tablo doğru cevabı iki kez vermiş, o yok saymış; yani sorun tabloda değil.",
            },
            {
              kind: "mcq",
              id: "en-b1-04-h4-23",
              no: 23,
              ref: "d1",
              text: "What finally changed his mind?",
              options: ["Seeing what the job did to somebody else", "A change to the pay in his department last year", "Advice from his parents"],
              answer: 0,
              explain:
                "Dönüm noktası bir gözlem: eski işine geçen meslektaşının dokuz haftada yorulması, «It was like watching a recording of myself». Ücret değişikliği ya da aile öğüdü kayıtta geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-04-h4-24",
              no: 24,
              ref: "d1",
              text: "What does he say about the smaller flat?",
              options: ["It was his partner's idea", "It saved much less money than they had expected", "It was harder for his partner than for him"],
              answer: 2,
              explain:
                "Pavel bunu açıkça söylüyor: «that was harder for my partner than for me, which I want to say clearly because it was not only my decision». Tasarruf da gerçekleşiyor, beklentinin altında kaldığı söylenmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-04-h4-25",
              no: 25,
              ref: "d1",
              text: "What does he recommend?",
              options: ["Leaving a well-paid job while you are still young", "Trusting what your own figures tell you", "Talking to a colleague in another department"],
              answer: 1,
              explain:
                "Öğüt son cümlede: tabloyu yap ve «reading your own answer honestly the first time» — yani kendi hesabının söylediğine ilk seferinde uy. Pavel bunu iki kez yok saydığını da anlatıyor. Genel bir kural olarak ayrılmayı önermiyor, tersine borcu olanlar için çekince koyuyor.",
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
          id: "en-b1-04-w1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "You booked a course and paid for it, but your employer has now changed your shifts and you cannot attend. Write an email to the course office. Write about 100 words and cover all the points.",
          promptTr:
            "Bir kursa kaydolup ücretini ödedin, ama işveren vardiyalarını değiştirdi ve derslere gelemiyorsun. Kurs ofisine bir e-posta yaz. Yaklaşık 100 kelime, bütün maddeleri işle.",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Say which course you booked and when you paid.", tr: "Hangi kursa yazıldığını ve ne zaman ödediğini söyle." },
              { de: "Explain why you cannot attend.", tr: "Neden gelemediğini açıkla." },
              { de: "Ask for one clear solution.", tr: "Açık tek bir çözüm iste." },
            ],
            sample: `Dear Sir or Madam,

I booked the Tuesday evening bookkeeping course on 6 September and paid the full fee of 180 pounds the same week.

Since the middle of October my employer has moved me onto late shifts, and I now work until nine on Tuesdays. I have asked twice whether I can change back, and the answer is no before February.

I would like to move my place to the spring group rather than ask for my money back, because I still want to do the course. If that is not possible, please tell me what my options are.

Yours faithfully,
Farah Demir`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "Tarih, tutar ve gün gibi somut bilgiler verildi mi?",
              "Present perfect doğru kullanıldı mı? (`has moved`, `I have asked`)",
              "Tek ve açık bir çözüm mü isteniyor, yoksa şikâyetle mi yetiniliyor?",
              "Kayıt resmî mi? Yaklaşık 100 kelime yazıldı mı?",
            ],
          },
        },
        {
          id: "en-b1-04-w2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Write an article for a website with this title: \"A decision about money that I do not regret\". Say what you decided, what it cost you and why you would do it again. Write about 100 words.",
          promptTr:
            "Bir internet sitesi için şu başlıkla bir yazı yaz: \"Pişman olmadığım bir para kararı\". Neye karar verdiğini, sana neye mal olduğunu ve neden yine yapacağını yaz. Yaklaşık 100 kelime.",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Say what you decided.", tr: "Neye karar verdiğini söyle." },
              { de: "Say what it cost you.", tr: "Sana neye mal olduğunu söyle." },
              { de: "Say why you would do it again.", tr: "Neden yine yapacağını söyle." },
            ],
            sample: `Three years ago I turned down a job that paid four hundred pounds a month more than mine.

It cost me more than the money. For about a year I watched a former colleague move ahead of me, and I had to explain my decision at every family dinner. My parents still think I was wrong.

I would do it again, although not for the reason people expect. The new job was in a city where I knew nobody, and I had just spent two years building a life here. If I had gone, I would have earned more and started again from nothing.`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "Bedel yalnız parayla mı, yoksa somut sonuçlarla mı anlatıldı?",
              "Gerekçe kişisel ve inandırıcı mı?",
              "İleri bağlaçlar kullanıldı mı? (although, if, because)",
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
          id: "en-b1-04-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about work and about time off.",
          promptTr: "Sana iş ve izin hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good afternoon. Could you describe what a working week looks like for you?", tr: "İyi günler. Senin için bir iş haftası nasıl geçiyor, anlatır mısın?" },
            { who: "you", hint: "Haftanı sırayla anlat; saat ve gün ver.", expect: "sıralı zaman ifadeleriyle bir iş haftasını anlatmak", seconds: 40 },
            { who: "partner", de: "Thank you. Has the way you spend your free time changed in the last few years?", tr: "Teşekkürler. Boş zamanını geçirme biçimin son birkaç yılda değişti mi?" },
            { who: "you", hint: "Present perfect ya da `used to` ile bir değişimi anlat.", expect: "zaman içindeki bir değişimi anlatmak", seconds: 40 },
            { who: "partner", de: "And if you were given one extra free day every week, what would you do with it?", tr: "Sana her hafta fazladan bir boş gün verilse onu nasıl geçirirdin?" },
            { who: "you", hint: "Koşul kipiyle cevapla ve gerekçelendir.", expect: "ikinci tip koşul cümlesiyle bir varsayım kurmak", seconds: 40 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "describe a week in order", tr: "Bir haftayı sırayla anlatmak" },
              { de: "describe a change over time", tr: "Zaman içindeki bir değişikliği anlatmak" },
              { de: "use a second conditional", tr: "İkinci tip koşulu kullanmak" },
            ],
            sample:
              "I work from eight to four, Monday to Friday, and one Saturday a month. I used to spend my evenings with a laptop, but since I moved I have walked in the park instead. If I were given one extra free day a week, I would use it for a long trip out of the city, because a weekend is never enough for that.",
            criteria: [
              "Hafta sırayla mı anlatıldı? (first, then, after that)",
              "`used to` ya da present perfect ile değişim anlatıldı mı?",
              "Son cevapta ikinci tip koşul kuruldu mu?",
              "Cevaplar geliştirildi mi, tek cümlede mi kaldı?",
            ],
          },
        },
        {
          id: "en-b1-04-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about one minute. Compare these two ways of being paid: a fixed monthly salary, and being paid for each job you finish. Say which you would prefer and why.",
          promptTr:
            "Yaklaşık bir dakika tek başına konuş. Şu iki ödeme biçimini karşılaştır: sabit aylık maaş ve bitirdiğin her iş için ödeme almak. Hangisini tercih edeceğini ve nedenini söyle.",
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
              "A monthly salary is the same every month, so you can plan a rent and a holiday. On the other hand, working faster brings you nothing, and after a while that shows. Being paid for each job is fairer in that sense, but a quiet November is frightening. I would prefer the salary, mainly because I sleep badly when I do not know what is coming. The disadvantage is that I have stayed in one job longer than I should have, exactly because it was safe.",
            criteria: [
              "İki yol da gerçekten karşılaştırıldı mı?",
              "Karşılaştırma yapıları kullanıldı mı? (on the other hand, whereas, fairer than)",
              "Tercih gerekçelendirildi mi?",
              "Seçilen yolun olumsuz yanı da söylendi mi?",
              "Bir dakika kesintisiz konuşuldu mu?",
            ],
          },
        },
        {
          id: "en-b1-04-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Our team has been given one change to working conditions this year. Talk with me about the options and decide together.",
          promptTr:
            "Ekibimize bu yıl çalışma koşullarında tek bir değişiklik hakkı verildi. Seçenekleri benimle konuş ve birlikte karar ver.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "The options are: two days a week at home, finishing at two on Fridays, five extra holiday days, or a later start every morning. Which do you think we should choose?", tr: "Seçenekler: haftada iki gün evden çalışma, cuma günleri ikide paydos, beş gün fazladan izin ya da her sabah daha geç başlama. Sence hangisini seçmeliyiz?" },
            { who: "you", hint: "Bir seçenek seç ve gerekçelendir.", expect: "bir seçeneği seçmek ve gerekçelendirmek", seconds: 40 },
            { who: "partner", de: "I understand. But half the team cannot work at home, and they would get nothing from that. Does that change your mind?", tr: "Anlıyorum. Ama ekibin yarısı evden çalışamaz ve onlara hiçbir şey kalmaz. Bu fikrini değiştirir mi?" },
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
              "I would choose two days at home, because the journey costs me nearly two hours a day. That is a fair point, and it changes things: a benefit that only half the team can use will make the other half angry. All right: let us put the early Friday finish forward, since everybody gets it, and raise working at home separately next year.",
            criteria: [
              "Görüş gerekçelendirildi mi?",
              "İtiraza doğrudan mı karşılık verildi?",
              "Karşı tarafın sözlerine gönderme yapıldı mı?",
              "Sonunda ortak bir karar çıktı mı?",
            ],
          },
        },
        {
          id: "en-b1-04-s4",
          no: 4,
          format: "speaking",
          goal: "interaction",
          prompt: "We talk a little more about the same topic: how open people should be about pay.",
          promptTr: "Aynı konu üzerine biraz daha konuşuyoruz: insanlar ücret konusunda ne kadar açık olmalı.",
          prepSeconds: 15,
          exchange: [
            { who: "partner", de: "Do you think colleagues should tell each other what they earn?", tr: "Sence meslektaşlar birbirine ne kazandığını söylemeli mi?" },
            { who: "you", hint: "Görüşünü söyle ve bir örnek ver.", expect: "genel bir soruya görüş bildirmek ve örneklendirmek", seconds: 40 },
            { who: "partner", de: "Some people say that talking about money only makes everybody unhappy. Would you agree?", tr: "Bazıları para konuşmanın yalnız herkesi mutsuz ettiğini söylüyor. Katılır mısın?" },
            { who: "you", hint: "Kısmen katıl ya da karşı çık; sınırı nereye koyduğunu söyle.", expect: "bir iddiaya kısmen katılmak ve sınır çizmek", seconds: 45 },
          ],
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "give an opinion with an example", tr: "Görüşü bir örnekle vermek" },
              { de: "agree or disagree in a nuanced way", tr: "Katılırken ya da karşı çıkarken ince ayrım yapmak" },
            ],
            sample:
              "I think they should, at least with people doing the same work. In my last job two of us did exactly the same thing and one earned three hundred more, and neither of us knew for two years. I partly agree that it makes people unhappy, although I would say the unhappiness was already there; the number only gave it a name.",
            criteria: [
              "Görüş açıkça bildirildi mi?",
              "Somut bir örnek verildi mi?",
              "Kısmi katılım ifadeleri kullanıldı mı? (I partly agree, it depends on …)",
              "Sınır nereye konduğu söylendi mi?",
            ],
          },
        },
      ],
    },
  ],
};
