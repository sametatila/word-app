import type { MockPaper } from "../types";

/**
 * B1 · Deneme 3 — "Health, Sleep and Sport".
 *
 * Deneme 1 ve 2 ile AYNI PLAN; konu ayrı. İlk ikisi iş/öğrenim/şehir ve
 * gündelik seçimler/çevre alanlarını aldı. Sağlık ve uyku B1'de ayrı bir
 * alan çünkü tavsiye, gerekçe ve kişisel deneyim anlatımını bir arada
 * istiyor — okuma görevi 3'ün görüş ölçen kısmına da doğal malzeme veriyor.
 *
 * B1 İMZALARI: present perfect, ilgi cümlesi, koşul cümlesi ve
 * `used to / although / however` gibi ileri bağlaçlar metinlerde geçiyor.
 */
export const EN_B1_03: MockPaper = {
  id: "en-b1-03",
  course: "en",
  level: "B1",
  no: 3,
  theme: "Health, Sleep and Sport",
  themeTr: "Sağlık, uyku ve spor",
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
          id: "en-b1-03-l1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Read the five texts and questions 1 to 5. Choose a, b or c.",
          promptTr: "Beş metni ve 1–5. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "m1",
              genre: "Notice at a swimming pool",
              genreTr: "Havuz duyurusu",
              title: "New opening hours",
              body: `From 1 April the pool opens at six on weekdays for lane swimming only. Families and lessons start at nine. The last entry is forty-five minutes before closing, and the sauna closes half an hour earlier than the pool.`,
            },
            {
              kind: "text",
              id: "m2",
              genre: "Email from a practice",
              genreTr: "Muayenehaneden e-posta",
              title: "How to reach us",
              body: `Dear patient, from May we no longer take appointments by email. Please phone between eight and ten, or use the online form, which is checked twice a day. If you need a repeat prescription, allow three working days.`,
            },
            {
              kind: "text",
              id: "m3",
              genre: "Advert",
              genreTr: "İlan",
              title: "Tuesday and Thursday running group",
              body: `We run at half past six, whatever the weather. Beginners run with a leader who stays at the back, so nobody is left alone. There is no fee, but you register once online so that we know how many we are.`,
            },
            {
              kind: "text",
              id: "m4",
              genre: "Message",
              genreTr: "İleti",
              title: "From the physiotherapist",
              body: `Bora, I have looked at your knee again. Keep doing the first two exercises, but stop the third one for now: it is the one that hurts the next morning. Come back in three weeks, earlier if the swelling returns.`,
            },
            {
              kind: "text",
              id: "m5",
              genre: "Notice in a gym",
              genreTr: "Spor salonu duyurusu",
              title: "Work on the first floor",
              body: `The machines on the first floor are being replaced this week. The free weights room stays open. Members whose card expires during the work can extend it by one week at the desk, but only if they ask before Friday.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-03-l1-1",
              no: 1,
              ref: "m1",
              text: "Who can use the pool at seven on a Tuesday?",
              options: ["Families with small children", "People swimming lengths", "Anybody with a lesson booking"],
              answer: 1,
              explain:
                "Duyuru saat altıdan itibaren havuzu «for lane swimming only» diye ayırıyor; kulvarda boy yüzenler girebilir. Aileler ve dersler «start at nine», yani yedide daha başlamamış.",
            },
            {
              kind: "mcq",
              id: "en-b1-03-l1-2",
              no: 2,
              ref: "m2",
              text: "What has changed?",
              options: ["The practice no longer gives prescriptions", "The online form is checked less often", "Appointments cannot be made by email"],
              answer: 2,
              explain:
                "Değişiklik ilk cümlede: «from May we no longer take appointments by email». Reçete hâlâ veriliyor, yalnız üç iş günü isteniyor; form ise günde iki kez okunuyor, azaltıldığı söylenmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-03-l1-3",
              no: 3,
              ref: "m3",
              text: "What does the group promise beginners?",
              options: ["Somebody runs at their pace", "The first month costs nothing", "A place indoors when it rains"],
              answer: 0,
              explain:
                "İlan «a leader who stays at the back, so nobody is left alone» diyor: en yavaş koşucuyla kalan biri var. Ücret zaten hiç yok, yalnız ilk ay değil; kötü havada da içeri geçilmiyor, «whatever the weather» koşuluyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-03-l1-4",
              no: 4,
              ref: "m4",
              text: "What must Bora do?",
              options: ["Do all three exercises more slowly", "Come back in three weeks in any case", "Leave out one of the exercises"],
              answer: 2,
              explain:
                "İleti üçüncü egzersizi durduruyor: «stop the third one for now». Üç hafta bir üst sınır değil, alt sınır: şişlik dönerse «earlier» gelinmesi isteniyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-03-l1-5",
              no: 5,
              ref: "m5",
              text: "What can members do this week?",
              options: ["Keep using the weights room", "Get a week extra on any card", "Train on the new machines"],
              answer: 0,
              explain:
                "Duyuru serbest kalan yeri söylüyor: «The free weights room stays open». Ek hafta yalnız kartı bu hafta içinde biten üyeler için ve yalnız cumadan önce istenirse; makineler de bu hafta değiştiriliyor, kullanılamıyor.",
            },
          ],
        },
        {
          id: "en-b1-03-l2",
          no: 2,
          format: "match",
          goal: "orientation",
          prompt:
            "Read about five people, 6 to 10. Then read the eight adverts a to h. Which advert is right for each person? You use each advert once only.",
          promptTr:
            "6–10. maddelerdeki beş kişiyi oku. Sonra a'dan h'ye sekiz ilanı oku. Her kişiye hangi ilan uyar? Her ilan en fazla bir kez kullanılır.",
          options: [
            { key: "a", label: "Morning Yoga in the Park", body: "Every day at seven, April to September. Bring your own mat. Pay what you can, cash in the box. No booking needed, but the group is small when it rains." },
            { key: "b", label: "Sleep Clinic", body: "A first meeting of ninety minutes, then four short follow-ups by video. For people who wake at night and cannot go back to sleep. A doctor's letter is needed." },
            { key: "c", label: "Swim for Nervous Adults", body: "Twelve lessons in a warm, shallow pool with no more than five people. For adults who never learned as children. Wednesday evenings." },
            { key: "d", label: "Walking Football", body: "Football with no running and no contact, for the over-fifties. Thursday afternoons in the sports hall. The first session is free." },
            { key: "e", label: "Physio Advice Line", body: "Fifteen minutes on the phone with a physiotherapist. For small injuries: is this something to rest, or something to see somebody about? Ten pounds." },
            { key: "f", label: "Climbing Wall Course", body: "Six evenings, from nothing to climbing with a partner. Equipment included. Minimum age sixteen. Saturdays are for practice, not for teaching." },
            { key: "g", label: "Cooking for One", body: "Four Monday evenings. Simple meals for one person that do not turn into four days of the same food. Ingredients included." },
            { key: "h", label: "Night Shift Group", body: "Once a month, Sunday morning, for people who work nights. We talk about sleep, food and family. Free tea and a quiet room." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b1-03-l2-6",
              no: 6,
              text: "Ingrid is sixty-four and would like to play a team sport again, but her doctor has told her not to run.",
              answer: "d",
              explain:
                "İlan iki koşulu birden karşılıyor: «Football with no running and no contact» ve «for the over-fifties». Takım oyunu isteği yalnız bu ilanda karşılanıyor; tırmanma kursu (f) takım sporu değil.",
            },
            {
              kind: "match",
              id: "en-b1-03-l2-7",
              no: 7,
              text: "Matteo hurt his shoulder at the weekend and cannot decide whether he should see a doctor.",
              answer: "e",
              explain:
                "İlan tam bu kararı satıyor: «is this something to rest, or something to see somebody about?». On beş dakikalık telefon görüşmesi bir teşhis değil, bir yönlendirme; uyku kliniği (b) zaten doktor mektubu istiyor.",
            },
            {
              kind: "match",
              id: "en-b1-03-l2-8",
              no: 8,
              text: "Amira works nights at a hospital and finds that nobody in her family understands her day.",
              answer: "h",
              explain:
                "İlan hem kitleyi hem konuyu veriyor: «for people who work nights» ve «We talk about sleep, food and family». Uyku kliniği gece uyanıp uyuyamayanlar için; Amira'nın sorunu uykusuzluk değil, anlaşılmamak.",
            },
            {
              kind: "match",
              id: "en-b1-03-l2-9",
              no: 9,
              text: "Colin is thirty-five and has been afraid of deep water since he was a child.",
              answer: "c",
              explain:
                "İlan yetişkine ve korkuya göre kurulmuş: «a warm, shallow pool with no more than five people» ve «For adults who never learned as children». Sığ havuz derin su korkusunu doğrudan karşılıyor.",
            },
            {
              kind: "match",
              id: "en-b1-03-l2-10",
              no: 10,
              text: "Refik lives alone and throws away a lot of food because he cooks too much.",
              answer: "g",
              explain:
                "İlan sorunu adıyla anıyor: «Simple meals for one person that do not turn into four days of the same food». Tek kişilik pişirme dersinin dışında hiçbir ilan yemekle ilgili değil.",
            },
          ],
        },
        {
          id: "en-b1-03-l3",
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
              title: "I gave up my morning run for a month",
              body: `For six years I ran four mornings a week, and I told anybody who asked that it was the reason I felt well. Last winter my knee disagreed, and a physiotherapist told me to stop for four weeks. I want to describe what actually happened, because it was not what I expected.

The first surprise was that I slept worse, not better. I had always believed that the running tired me out. It turned out that what the run really gave me was daylight at seven o'clock, and in January I was now getting none. In the second week I started walking the same route without running it, and my sleep came back within days.

The second surprise was social. I used to see the same four or five people at the canal, and although we had never exchanged names, we nodded every morning. I missed that far more than I missed the exercise. If somebody had told me that in November, I would have laughed.

The third thing is the one I am least comfortable with. My mood got worse in week two, and I noticed that I was explaining it to myself as an injury problem. It was not. I had simply lost the one hour of the day that nobody else could book.

I am running again now, three mornings instead of four. The physiotherapist, who has seen this many times, says the fourth morning was never the useful one. She may be right. However, I have kept the walk on the fourth day, because I now know which part of it I was actually there for.`,
              gloss: [
                { de: "a physiotherapist", tr: "fizyoterapist", en: "physiotherapist" },
                { de: "a canal", tr: "kanal", en: "canal" },
                { de: "mood", tr: "ruh hâli", en: "mood" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-03-l3-11",
              no: 11,
              text: "Why did the writer sleep badly without running?",
              options: ["Because her knee hurt at night", "Because she walked the same route instead", "Because she no longer got early daylight", "Because she went to bed later than before"],
              answer: 2,
              explain:
                "Yazı sebebi düzeltiyor: «what the run really gave me was daylight at seven o'clock, and in January I was now getting none». Yürüyüş tam tersine uykuyu geri getiriyor; diz ağrısının geceyle ilgisi metinde kurulmuyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-03-l3-12",
              no: 12,
              text: "What does the writer say about the people at the canal?",
              options: ["She missed them more than the exercise", "She had run with them for six years", "She met them again on her walks", "She learned their names after her injury"],
              answer: 0,
              explain:
                "Cümle karşılaştırmayı kendisi yapıyor: «I missed that far more than I missed the exercise». Adlarını hiç öğrenmediklerini de açıkça söylüyor («we had never exchanged names»); birlikte koştukları da yazmıyor, yalnız selamlaşıyorlar.",
            },
            {
              kind: "mcq",
              id: "en-b1-03-l3-13",
              no: 13,
              text: "What is the writer least comfortable admitting?",
              options: ["That the physiotherapist was right about the fourth morning", "That she had told other people the running kept her well", "That she laughed at people who stopped running", "That her low mood was about lost private time"],
              answer: 3,
              explain:
                "Yazı kendi açıklamasını çürütüyor: kötüleşen ruh hâlini sakatlığa bağlamış, oysa «I had simply lost the one hour of the day that nobody else could book». Gülme sahnesi kendi hakkında ve varsayımsal; fizyoterapistin haklılığı ise rahatsız edici değil, kabul edilen bir şey.",
            },
            {
              kind: "mcq",
              id: "en-b1-03-l3-14",
              no: 14,
              text: "What does the writer now do on the fourth morning?",
              options: ["She runs a shorter route", "She walks instead of running", "She sleeps an extra hour", "She meets the same people at the canal"],
              answer: 1,
              explain:
                "Son paragraf: «I have kept the walk on the fourth day». Koşu haftada dörtten üçe indi, dördüncü gün yürüyüşe ayrıldı; fazladan uyku ya da buluşma sözü verilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-03-l3-15",
              no: 15,
              text: "What is the writer's main point in the article?",
              options: ["Running four mornings is better than three", "Injuries teach you nothing useful", "She was going for reasons she had not noticed", "Physiotherapists understand runners better than runners do"],
              answer: 2,
              explain:
                "Yazının üç sürprizi de aynı yere çıkıyor: ışık, insanlar ve kendine ait saat. Son cümle bunu söylüyor: «I now know which part of it I was actually there for». Yazı dört sabahı savunmuyor, tersine üçe indiriyor.",
            },
          ],
        },
        {
          id: "en-b1-03-l4",
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
              title: "The eight-hour night is younger than you think",
              body: `Most of us believe that a single block of eight hours is the natural human night. {{16}}

Historians who have read diaries and court records from before 1800 keep finding the same thing. People wrote about a first sleep and a second sleep, with an hour or two awake between them. {{17}}

The hour in between was not treated as a problem. People prayed, talked to the person next to them, went to check the animals, or simply lay still in the dark. {{18}}

What changed was light. Once a room could be bright at ten at night, the evening grew longer and the night was pushed into one shorter block. {{19}}

None of this means that a broken night is good for you. {{20}}`,
              gloss: [
                { de: "a diary", tr: "günlük", en: "diary" },
                { de: "a court record", tr: "mahkeme kaydı", en: "court record" },
                { de: "a generation", tr: "kuşak", en: "generation" },
              ],
            },
          ],
          options: [
            { key: "a", label: "a", body: "If you lie awake at three and cannot work the next day, that is worth taking to a doctor." },
            { key: "b", label: "b", body: "Within two generations the older pattern had almost disappeared from written life." },
            { key: "c", label: "c", body: "It is a comfortable belief, and it is also a surprisingly young one." },
            { key: "d", label: "d", body: "The phrase appears so often that it clearly needed no explanation for the reader." },
            { key: "e", label: "e", body: "Nobody in those pages seems to have worried that something was wrong with them." },
            { key: "f", label: "f", body: "Researchers now agree that the best temperature for a bedroom is about eighteen degrees." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b1-03-l4-16",
              no: 16,
              text: "Gap 16",
              answer: "c",
              explain:
                "İlk cümle yaygın bir inancı kuruyor; (c) o inancı «a comfortable belief» diye adlandırıp yaşını sorguluyor ve yazının başlığındaki savı açıyor. Boşluktan sonra gelen paragraf da tam bu yaşı kanıtlıyor.",
            },
            {
              kind: "match",
              id: "en-b1-03-l4-17",
              no: 17,
              text: "Gap 17",
              answer: "d",
              explain:
                "Önceki cümle kaynaklarda geçen «a first sleep and a second sleep» ifadesinden söz ediyor; (d) «The phrase» ile o ifadeye geri gönderme yapıyor ve sıklığından bir sonuç çıkarıyor.",
            },
            {
              kind: "match",
              id: "en-b1-03-l4-18",
              no: 18,
              text: "Gap 18",
              answer: "e",
              explain:
                "Paragraf aradaki saatin sorun sayılmadığını söylüyor ve yapılan şeyleri sayıyor; (e) aynı kaynaklara («those pages») dönüp kimsenin kendini hasta saymadığını ekliyor. Tutum betimlemesi sürüyor.",
            },
            {
              kind: "match",
              id: "en-b1-03-l4-19",
              no: 19,
              text: "Gap 19",
              answer: "b",
              explain:
                "Önceki cümle ışığın gece düzenini nasıl sıkıştırdığını anlatıyor; (b) bu değişimin hızını veriyor: «Within two generations the older pattern had almost disappeared». Sebepten sonuca geçiş.",
            },
            {
              kind: "match",
              id: "en-b1-03-l4-20",
              no: 20,
              text: "Gap 20",
              answer: "a",
              explain:
                "Son paragraf bir çekince koyuyor: «None of this means that a broken night is good for you». (a) çekinceyi somutlaştırıyor ve okuru doktora yönlendiriyor. (f) yatak odası sıcaklığından söz ediyor ve metnin hiçbir yerinde sıcaklık tartışılmıyor — hiçbir boşluğa uymayan cümle odur.",
            },
          ],
        },
        {
          id: "en-b1-03-l5",
          no: 5,
          format: "gapMcq",
          goal: "structure",
          prompt: "Read the text and complete gaps 21 to 25. Which word fits: a, b, c or d?",
          promptTr: "Metni oku ve 21–25. boşlukları tamamla. Hangi sözcük uyar: a, b, c ya da d?",
          texts: [
            {
              kind: "text",
              id: "t5",
              genre: "Health advice",
              genreTr: "Sağlık tavsiyesi",
              title: "Coming back after an injury",
              body: `Coming back from an injury is mostly a question of patience, but a few rules {{21}} the difference.

First, do not measure yourself against the person you were in September. That person had six months of training in their legs, and you {{22}} not.

Second, increase one thing at a time. If you make the run longer and faster in the same week, you will never know which change your knee {{23}} to.

Third, take the day after seriously. Pain during the run tells you less than pain the next morning, and that is the signal you must {{24}} attention to.

And finally, be honest with the person treating you. A physiotherapist can only work with what you {{25}} them.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-03-l5-21",
              no: 21,
              text: "Gap 21",
              options: ["do", "make", "give", "take"],
              answer: 1,
              explain:
                "`make the difference` sabit bir eşdizim: fark yaratmak. İngilizcede `do` ve `make` bu noktada ayrılır; `give the difference` ve `take the difference` kalıp değildir.",
            },
            {
              kind: "mcq",
              id: "en-b1-03-l5-22",
              no: 22,
              text: "Gap 22",
              options: ["are", "have", "did", "do"],
              answer: 3,
              explain:
                "Önceki yüklem `had` geniş bir geçmiş durum bildiriyor ama boşluk şimdiki durumu karşılaştırıyor: «and you do not» — yani şimdi o birikime sahip değilsin. `did not` cümleyi tümüyle geçmişe taşır ve karşılaştırmayı bozar; `are` ve `have` bu yüklemin yerini tutamaz.",
            },
            {
              kind: "mcq",
              id: "en-b1-03-l5-23",
              no: 23,
              text: "Gap 23",
              options: ["reacted", "answered", "replied", "returned"],
              answer: 0,
              explain:
                "`react to something` bir tepkiyi anlatır ve edatı `to`dur: «which change your knee reacted to». `answer` ve `reply` konuşmaya ait fiillerdir, `return to` ise geri dönmek demektir.",
            },
            {
              kind: "mcq",
              id: "en-b1-03-l5-24",
              no: 24,
              text: "Gap 24",
              options: ["give", "make", "pay", "put"],
              answer: 2,
              explain:
                "`pay attention to` sabit bir eşdizim. `give attention` seyrek ve daha zayıf bir kullanımdır, `make attention` ve `put attention` ise İngilizcede yoktur.",
            },
            {
              kind: "mcq",
              id: "en-b1-03-l5-25",
              no: 25,
              text: "Gap 25",
              options: ["say", "speak", "talk", "tell"],
              answer: 3,
              explain:
                "`tell` doğrudan nesne alır: «what you tell them». `say` nesneyi `to` ile bağlar (say something to somebody), `speak` ve `talk` ise bu yapıda kullanılamaz.",
            },
          ],
        },
        {
          id: "en-b1-03-l6",
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
              title: "On six hours a night",
              body: `I used {{26}} sleep six hours and tell everybody that I was fine.

Then I bought a cheap watch {{27}} counts how long you actually sleep, and the number was five hours and ten minutes.

If I {{28}} seen that number three years ago, I would have changed something much earlier.

I have now moved my alarm forward by twenty minutes a week, {{29}} of an hour at once, because the slow way is the only one that has ever worked for me.

The difference is bigger {{30}} I expected: I am not a different person, but I am a much less irritable one.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b1-03-l6-26",
              no: 26,
              text: "Gap 26",
              accept: ["to"],
              explain:
                "`used to + yalın fiil` geçmişte süren, artık sürmeyen bir alışkanlığı anlatır: «I used to sleep six hours». `used sleeping` ya da `used for sleeping` bu anlamı vermez.",
            },
            {
              kind: "gap",
              id: "en-b1-03-l6-27",
              no: 27,
              text: "Gap 27",
              accept: ["that", "which"],
              explain:
                "Boşluk saatin niteleyen yan cümlesini başlatıyor ve öncül bir NESNE («a cheap watch»), bu yüzden `that` ya da `which` gelir. `who` yalnız kişiler için kullanılır.",
            },
            {
              kind: "gap",
              id: "en-b1-03-l6-28",
              no: 28,
              text: "Gap 28",
              accept: ["had"],
              explain:
                "Ana cümle `would have changed` taşıyor, yani gerçekleşmemiş bir geçmiş kurgulanıyor. Bu yapının koşul yarısı `had + üçüncü hâl` ister: «If I had seen». `have seen` ya da `saw` bu eşleşmeyi bozar.",
            },
            {
              kind: "gap",
              id: "en-b1-03-l6-29",
              no: 29,
              text: "Gap 29",
              accept: ["instead"],
              explain:
                "İki seçenek karşı karşıya konuyor: haftada yirmi dakika ya da bir kerede bir saat. `instead of` seçilmeyeni gösterir. `rather` de anlamca yakındır ama `rather of` diye bir kalıp yoktur, `rather than` olurdu.",
            },
            {
              kind: "gap",
              id: "en-b1-03-l6-30",
              no: 30,
              text: "Gap 30",
              accept: ["than"],
              explain:
                "Cümlede `bigger` var; karşılaştırmanın ikinci öğesi `than` ile bağlanır. `as` yalnız `as … as` yapısında gelir ve orada karşılaştırma eki kullanılmaz.",
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
          id: "en-b1-03-h1",
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
              situation: "Spor merkezinde akşam dersleri için anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "Attention please. The eight o'clock spinning class moves to studio two tonight, because studio one has a problem with the floor. If you have a bike booked, your booking is still valid; just go upstairs." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Voicemail",
              genreTr: "Telesekreter iletisi",
              situation: "Bir sağlık kuruluşu hastaya ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello, this is the clinic about your blood test. Everything is normal except your iron, which is a little low. There is nothing to worry about, but I would like to see you in about a month. Please ring the desk." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki arkadaş havuza gitmeyi konuşuyor.",
              plays: 2,
              segments: [
                { text: "Are you coming to the pool on Saturday?" },
                { text: "I would like to, but I am on the late shift until nine." },
                { text: "Then come on Sunday morning, it is quieter anyway." },
                { text: "That works. I will bring Amira." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Radyoda bir uzman soruları yanıtlıyor.",
              plays: 2,
              segments: [
                { text: "People often ask me how long they should hold a stretch. The honest answer is that thirty seconds is enough for almost everybody, and that the time of day matters more than the number of seconds." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Announcement",
              genreTr: "Anons",
              situation: "Bir koşu yarışının başında anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "Runners, a quick change. Because of the ice at the bridge, the route turns left at the church and comes back along the river. The distance is exactly the same. Water is still at kilometre five." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Voice message",
              genreTr: "Sesli ileti",
              situation: "Bir oyuncu takım arkadaşlarına ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hi, this is about the football on Thursday. We only have nine people, so I have asked the other team whether we can play seven a side. If they say no, we play with nine against eleven, which nobody enjoys." },
              ],
            },
            {
              kind: "audio",
              id: "a7",
              genre: "Talk",
              genreTr: "Sunum",
              situation: "Bir uzman yeni hastalarına verdiği öğüdü anlatıyor.",
              plays: 2,
              segments: [
                { text: "The most useful thing I tell new patients is boring: write down what you ate and when you went to bed, for two weeks. Almost nobody wants to do it, and almost everybody who does it finds the answer themselves." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-03-h1-1",
              no: 1,
              ref: "a1",
              text: "What must people with a booking do?",
              options: ["Go to a different room", "Book a bike again", "Wait for the floor to dry"],
              answer: 0,
              explain:
                "Anons dersi taşıyor: «moves to studio two tonight» ve «just go upstairs». Rezervasyonun geçerli olduğu açıkça söyleniyor, yani yeniden ayırtmaya gerek yok; zeminin kurumasını beklemek de istenmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-03-h1-2",
              no: 2,
              ref: "a2",
              text: "What is the reason for the call?",
              options: ["To cancel an appointment", "To report a result that is dangerous", "To ask the patient to come in"],
              answer: 2,
              explain:
                "İleti bir davet: «I would like to see you in about a month. Please ring the desk». Sonuç düşük demir, ama «There is nothing to worry about» deniyor; randevu iptali hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-03-h1-3",
              no: 3,
              ref: "a3",
              text: "When will they go to the pool?",
              options: ["On Saturday evening", "On Sunday morning", "After the late shift"],
              answer: 1,
              explain:
                "Öneri kabul ediliyor: «Then come on Sunday morning» — «That works». Cumartesi vardiya dokuza kadar sürdüğü için eleniyor; vardiya sonrası bir seçenek olarak hiç önerilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-03-h1-4",
              no: 4,
              ref: "a4",
              text: "What does the speaker say is more important?",
              options: ["When you stretch", "How long you hold it", "How often you stretch"],
              answer: 0,
              explain:
                "Karşılaştırma kaydın sonunda: «the time of day matters more than the number of seconds». Otuz saniye yeterli sayılıyor, yani süre asıl değişken değil; sıklıktan hiç söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-03-h1-5",
              no: 5,
              ref: "a5",
              text: "What has changed?",
              options: ["The distance of the race", "The place of the water station", "The way the runners go"],
              answer: 2,
              explain:
                "Değişen şey güzergâh: «the route turns left at the church and comes back along the river». Mesafe için «exactly the same», su için «still at kilometre five» deniyor; ikisi de açıkça çürütülüyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-03-h1-6",
              no: 6,
              ref: "a6",
              text: "What is the speaker trying to do?",
              options: ["Cancel the match", "Change the number of players", "Find two more people"],
              answer: 1,
              explain:
                "Konuşmacı karşı takımdan «whether we can play seven a side» diye izin istiyor: takım boyu değişecek. Maç iptal edilmiyor ve eksik iki oyuncuyu aramaktan söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-03-h1-7",
              no: 7,
              ref: "a7",
              text: "What does the speaker recommend?",
              options: ["Changing your diet immediately", "Asking a specialist early", "Keeping a written record"],
              answer: 2,
              explain:
                "Öğüt tek bir iş: «write down what you ate and when you went to bed, for two weeks». Konuşmacı cevabı kendisi vermiyor, tersine kaydı tutanların «finds the answer themselves» dediğini söylüyor.",
            },
          ],
        },
        {
          id: "en-b1-03-h2",
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
              situation: "İki meslektaş masa değişikliğinden söz ediyor.",
              plays: 2,
              segments: [
                { speaker: "Nella", text: "I have moved my desk to the window." },
                { speaker: "Kerem", text: "Because of the light?" },
                { speaker: "Nella", text: "Because of the noise, actually. I could not hear myself think next to the kitchen." },
              ],
            },
            {
              kind: "audio",
              id: "b2",
              genre: "At the doctor",
              genreTr: "Doktorda",
              situation: "Bir hasta ilacın işe yaramadığını söylüyor.",
              plays: 2,
              segments: [
                { speaker: "Patient", text: "I have taken the tablets for five days and the pain is the same." },
                { speaker: "Doctor", text: "Then stop them. They should work in three days or not at all. Come back on Friday and we try something different." },
              ],
            },
            {
              kind: "audio",
              id: "b3",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki arkadaş spor salonu üyeliğini konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Ozan", text: "Did you cancel the gym?" },
                { speaker: "Rana", text: "Not yet. I go once a month and pay every month, so the maths is embarrassing. But I know that the day I cancel, I will never go again." },
              ],
            },
            {
              kind: "audio",
              id: "b4",
              genre: "At work",
              genreTr: "İş yerinde",
              situation: "İki meslektaş bir uyku kliniğini konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Kerem", text: "How was the sleep clinic?" },
                { speaker: "Sinem", text: "Useful, but not how I thought. They did not give me anything. They changed what time I get up, including at the weekend." },
                { speaker: "Kerem", text: "And?" },
                { speaker: "Sinem", text: "Three weeks in, it works." },
              ],
            },
            {
              kind: "audio",
              id: "b5",
              genre: "In a shop",
              genreTr: "Mağazada",
              situation: "Bir müşteri koşu ayakkabısı deniyor.",
              plays: 2,
              segments: [
                { speaker: "Customer", text: "Do you have the same shoe in a wider fit?" },
                { speaker: "Assistant", text: "Not in this colour, but the black one is wider and it is otherwise the same shoe." },
                { speaker: "Customer", text: "I will take the black then. My last pair cost me two toenails." },
              ],
            },
            {
              kind: "audio",
              id: "b6",
              genre: "Between runners",
              genreTr: "Koşucular arasında",
              situation: "İki koşucu bir yarıştan söz ediyor.",
              plays: 2,
              segments: [
                { speaker: "Bora", text: "You did the half marathon, didn't you? How was it?" },
                { speaker: "Ingrid", text: "I finished, which was the plan. But I went too fast for the first five kilometres and I paid for it after ten." },
                { speaker: "Bora", text: "Everybody does that once." },
                { speaker: "Ingrid", text: "I have done it three times." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-03-h2-8",
              no: 8,
              ref: "b1",
              text: "Why did Nella move her desk?",
              options: ["To get more daylight", "To get away from noise", "To sit near a colleague"],
              answer: 1,
              explain:
                "Nella ilk tahmini düzeltiyor: «Because of the noise, actually» ve mutfağın yanında düşünemediğini ekliyor. Işık soruyu soran kişinin varsayımı, gerekçe değil.",
            },
            {
              kind: "mcq",
              id: "en-b1-03-h2-9",
              no: 9,
              ref: "b2",
              text: "What does the doctor tell the patient?",
              options: ["To stop taking the tablets", "To take them for two more days", "To take a higher dose"],
              answer: 0,
              explain:
                "Doktor «Then stop them» diyor ve gerekçesini veriyor: «They should work in three days or not at all». Beş gün zaten geçmiş, yani beklemek anlamsız; dozdan hiç söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-03-h2-10",
              no: 10,
              ref: "b3",
              text: "What is Rana's problem?",
              options: ["The gym has raised its price again this year", "She cannot get to the gym", "She pays for something she rarely uses"],
              answer: 2,
              explain:
                "Rana kendi durumunu özetliyor: «I go once a month and pay every month, so the maths is embarrassing». Fiyat artışı ya da ulaşım hiç geçmiyor; üyeliği bırakmamasının sebebi ayrı bir korku.",
            },
            {
              kind: "mcq",
              id: "en-b1-03-h2-11",
              no: 11,
              ref: "b4",
              text: "What surprised Sinem at the clinic?",
              options: ["The clinic was free", "The treatment was not medicine", "The results came slowly"],
              answer: 1,
              explain:
                "Sinem beklentisinin bozulduğunu söylüyor: «They did not give me anything. They changed what time I get up». Sonuç üç haftada gelmiş, yani yavaş değil; ücretten hiç söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-03-h2-12",
              no: 12,
              ref: "b5",
              text: "What does the customer decide?",
              options: ["To buy a different colour", "To order the same shoe online later", "To try a bigger size"],
              answer: 0,
              explain:
                "Müşteri «I will take the black then» diyor: geniş kalıp yalnız siyahta var. Bir beden büyüğü değil, daha GENİŞ bir kalıp aranıyor; internet siparişi hiç konuşulmuyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-03-h2-13",
              no: 13,
              ref: "b6",
              text: "What does Ingrid admit?",
              options: ["She did not finish the race", "She trained much too little for the distance", "She has made the same mistake before"],
              answer: 2,
              explain:
                "Son cümle itiraf: «I have done it three times». Yarışı bitirdiğini açıkça söylüyor («I finished, which was the plan»); antrenman eksikliğinden değil, ilk beş kilometredeki hızdan söz ediyor.",
            },
          ],
        },
        {
          id: "en-b1-03-h3",
          no: 3,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear a talk for new members of a running club. Complete the notes, questions 14 to 19. Write ONE or TWO words or a number in each gap. You hear the talk twice.",
          promptTr:
            "Bir koşu kulübünün yeni üyelerine yapılan konuşmayı dinleyeceksin. 14–19. maddelerdeki notları tamamla. Her boşluğa BİR ya da İKİ sözcük veya bir sayı yaz. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Talk",
              genreTr: "Sunum",
              situation: "Kulüp sorumlusu yeni üyelere kulübü anlatıyor.",
              plays: 2,
              segments: [
                {
                  text: "Welcome, and thank you all for coming. We started in 2014 with eleven members and we now have four hundred. The club fee is thirty pounds a year, and that includes the winter track hire, which is the expensive part. We meet on Tuesdays at half past six and on Sunday mornings at nine. The Tuesday session is on the track; the Sunday one is always on grass, because we think the legs need a soft surface once a week. New members run in the yellow group for the first six weeks, whatever their speed, so that a coach sees you before you choose a group yourself. And the thing people ask about most: yes, we have a bag store, but bring your own lock.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notes",
              genreTr: "Not kâğıdı",
              title: "Running club — notes",
              body: `Club started in:         {{14}}
Members now:             {{15}}
Fee per year:            {{16}} pounds
Tuesday session is on:   the {{17}}
Sunday session is on:    {{18}}
New members run in the:  {{19}} group`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b1-03-h3-14",
              no: 14,
              ref: "c1",
              text: "Gap 14",
              accept: ["2014"],
              explain:
                "«We started in 2014 with eleven members» — kuruluş yılı. Kayıttaki on bir kurucu üye sayısı, dört yüz ise bugünkü sayı; hangi sayının yıl olduğunu ayırmak gerekiyor.",
            },
            {
              kind: "gap",
              id: "en-b1-03-h3-15",
              no: 15,
              ref: "c1",
              text: "Gap 15",
              accept: ["400", "four hundred"],
              explain:
                "«we now have four hundred» — bugünkü üye sayısı. On bir sayısı kuruluş yılına ait; not kâğıdı `Members now` diyerek hangisini istediğini belirtiyor.",
            },
            {
              kind: "gap",
              id: "en-b1-03-h3-16",
              no: 16,
              ref: "c1",
              text: "Gap 16",
              accept: ["30", "thirty"],
              explain:
                "«The club fee is thirty pounds a year» — yıllık aidat. Not kâğıdında `pounds` basılı olduğu için boşluğa yalnız sayı yazılır.",
            },
            {
              kind: "gap",
              id: "en-b1-03-h3-17",
              no: 17,
              ref: "c1",
              text: "Gap 17",
              accept: ["track"],
              explain:
                "«The Tuesday session is on the track» — salı pistte. Kayıtta çim de geçiyor ama o pazar günü; iki günü karıştıran öğrenci ikisini yer değiştirir.",
            },
            {
              kind: "gap",
              id: "en-b1-03-h3-18",
              no: 18,
              ref: "c1",
              text: "Gap 18",
              accept: ["grass", "on grass"],
              explain:
                "«the Sunday one is always on grass» ve gerekçesi de veriliyor: bacaklar haftada bir yumuşak zemin istiyor. Not kâğıdında `on` basılı değil, bu yüzden hem `grass` hem `on grass` kabul ediliyor.",
            },
            {
              kind: "gap",
              id: "en-b1-03-h3-19",
              no: 19,
              ref: "c1",
              text: "Gap 19",
              accept: ["yellow"],
              explain:
                "«New members run in the yellow group for the first six weeks» — ilk altı hafta sarı grup. Altı hafta süredir, grubun adı değil; not kâğıdı `group` sözcüğünü zaten basıyor.",
            },
          ],
        },
        {
          id: "en-b1-03-h4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt: "You hear an interview with a woman who stopped swimming competitively. Choose a, b or c for questions 20 to 25. You hear the interview twice.",
          promptTr: "Yarışma yüzücülüğünü bırakan bir kadınla söyleşi dinleyeceksin. 20–25. maddeler için a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Interview",
              genreTr: "Söyleşi",
              situation: "Bir radyo programında eski bir yüzücüyle söyleşi yapılıyor.",
              plays: 2,
              segments: [
                { speaker: "Host", text: "Ingrid, you swam competitively until you were twenty-two. Why did you stop?" },
                { speaker: "Ingrid", text: "Everybody expects an injury story, and there is not one. I stopped because I realised I had never chosen it. I was in the water at five in the morning at the age of nine because my sister was, and nobody ever asked me again after that." },
                { speaker: "Host", text: "Was there a particular moment?" },
                { speaker: "Ingrid", text: "There was a very ordinary one. A training camp in the south, good weather, everything fine, and I found myself hoping that it would rain. That is not a thought you can un-think." },
                { speaker: "Host", text: "You now teach adults who cannot swim. Is that a smaller job?" },
                { speaker: "Ingrid", text: "It is a harder one. A child who is afraid learns in eight weeks. An adult has thirty years of stories about water, and half of them belong to somebody else: a parent who was frightened, a brother who pushed them in. You are not teaching a stroke, you are arguing with a memory." },
                { speaker: "Host", text: "What do people get wrong about learning as an adult?" },
                { speaker: "Ingrid", text: "They think the problem is technique, so they book more lessons. Often what they need is fewer lessons and a pool where nobody can see them. I have taught in an empty pool at nine at night more often than I would admit to my old coach." },
                { speaker: "Host", text: "Do you miss competing?" },
                { speaker: "Ingrid", text: "I miss the certainty. When you race, you know at the end exactly what you are worth, to the hundredth of a second. Nothing since has been that clear, and I am not sure that is a loss." },
                { speaker: "Host", text: "What would you say to a parent with a nine-year-old in the water at five in the morning?" },
                { speaker: "Ingrid", text: "Ask them once a year whether they still want it, and mean the question. If the answer is yes, that is a wonderful life. My complaint is not the swimming; it is that nobody asked." },
              ],
              gloss: [
                { de: "competitively", tr: "yarışma düzeyinde", en: "competitively" },
                { de: "a stroke", tr: "yüzme stili", en: "swimming stroke" },
                { de: "certainty", tr: "kesinlik", en: "certainty" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-03-h4-20",
              no: 20,
              ref: "d1",
              text: "Why did Ingrid stop swimming?",
              options: ["An injury ended her career", "She was no longer fast enough for the team", "She had never chosen the sport herself"],
              answer: 2,
              explain:
                "Ingrid yaygın beklentiyi reddediyor: «Everybody expects an injury story, and there is not one», sonra gerekçeyi veriyor: «I stopped because I realised I had never chosen it». Hızından hiç söz etmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-03-h4-21",
              no: 21,
              ref: "d1",
              text: "What does she say about the training camp?",
              options: ["The weather ruined the whole week", "Nothing was wrong, which was the point", "She was injured there for the first time"],
              answer: 1,
              explain:
                "Anlatının gücü sıradanlığında: «good weather, everything fine, and I found myself hoping that it would rain». Hava iyiydi, yani bozulan bir şey yok; sakatlık zaten hiç yaşanmamış.",
            },
            {
              kind: "mcq",
              id: "en-b1-03-h4-22",
              no: 22,
              ref: "d1",
              text: "Why is teaching adults harder?",
              options: ["They bring old fears with them", "They have less time to practise", "They learn a stroke more slowly"],
              answer: 0,
              explain:
                "Ingrid işi şöyle tarif ediyor: «You are not teaching a stroke, you are arguing with a memory». Otuz yıllık su hikâyeleri, üstelik yarısı başkasına ait. Zaman ya da öğrenme hızı gerekçe olarak verilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-03-h4-23",
              no: 23,
              ref: "d1",
              text: "What do adult learners usually get wrong?",
              options: ["They practise without a teacher", "They start in water that is much too deep", "They think more lessons are the answer"],
              answer: 2,
              explain:
                "Ingrid yanlış teşhisi adlandırıyor: «They think the problem is technique, so they book more lessons», oysa gereken «fewer lessons and a pool where nobody can see them». Derinlik ve öğretmensizlik kayıtta geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-03-h4-24",
              no: 24,
              ref: "d1",
              text: "What does she miss about competing?",
              options: ["The travelling and the training camps", "Knowing exactly where she stood", "The other swimmers in her team"],
              answer: 1,
              explain:
                "«I miss the certainty» ve hemen açıklıyor: «you know at the end exactly what you are worth, to the hundredth of a second». Kamp anısı olumsuz, takım arkadaşlarından ise hiç söz etmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-03-h4-25",
              no: 25,
              ref: "d1",
              text: "What is her advice to parents?",
              options: ["To ask the child seriously every year", "To keep young children out of early training", "To let a coach decide when to stop"],
              answer: 0,
              explain:
                "Öğüt tek cümlede: «Ask them once a year whether they still want it, and mean the question». Erken antrenmana karşı değil, tersine «If the answer is yes, that is a wonderful life» diyor; şikâyeti sorulmamış olması.",
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
          id: "en-b1-03-w1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "You joined a sports club three months ago and you have not been able to use it because of an injury. Write an email to the club. Write about 100 words and cover all the points.",
          promptTr:
            "Üç ay önce bir spor kulübüne üye oldun ve bir sakatlık yüzünden hiç kullanamadın. Kulübe bir e-posta yaz. Yaklaşık 100 kelime, bütün maddeleri işle.",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Say when you joined and what happened.", tr: "Ne zaman üye olduğunu ve ne olduğunu söyle." },
              { de: "Say what you have already tried.", tr: "Şimdiye kadar ne denediğini söyle." },
              { de: "Say what you would like the club to do.", tr: "Kulüpten ne yapmasını istediğini söyle." },
            ],
            sample: `Dear Sir or Madam,

I joined the club on 2 February and I have paid for three months. Two weeks after I joined I hurt my knee, and my physiotherapist has told me not to train until May.

I have already spoken to the desk twice. I was told to write to you, so I am doing that now.

I would like to pause my membership for two months rather than cancel it, because I do want to come back. I can send a letter from the physiotherapist if you need one, and I am happy to bring it to the desk in person.

Could you let me know before the end of this month?

Yours faithfully,
Bora Aksoy`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "Tarih ve süre somut mu verildi?",
              "Present perfect doğru kullanıldı mı? (`I have paid`, `I have already spoken`)",
              "Talep açık mı ve makul bir seçenek mi öneriliyor?",
              "Kayıt resmî mi? Yaklaşık 100 kelime yazıldı mı?",
            ],
          },
        },
        {
          id: "en-b1-03-w2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Write an article for a website with this title: \"Something I do for my health that costs nothing\". Say what it is, how you started and whether you would recommend it. Write about 100 words.",
          promptTr:
            "Bir internet sitesi için şu başlıkla bir yazı yaz: \"Sağlığım için yaptığım ve hiç para tutmayan bir şey\". Ne olduğunu, nasıl başladığını ve tavsiye edip etmeyeceğini yaz. Yaklaşık 100 kelime.",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Say what you do.", tr: "Ne yaptığını söyle." },
              { de: "Say how you started.", tr: "Nasıl başladığını söyle." },
              { de: "Say whether you would recommend it, and to whom.", tr: "Tavsiye edip etmeyeceğini ve kime edeceğini söyle." },
            ],
            sample: `I get off the bus one stop early. That is the whole thing, and it has cost me nothing since I started two years ago.

It began badly. I tried to walk the entire way home, which took fifty minutes, and I stopped after four days. One stop was small enough to survive a bad week.

I would recommend it, although not to everybody. If you already walk a lot, it will change nothing. If, like me, you sit for nine hours and then sit on a bus, those twelve minutes are the difference between moving and not moving at all.`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "Başlangıç somut bir hikâyeyle mi anlatıldı?",
              "Tavsiye koşullandırıldı mı, yoksa herkese mi veriliyor?",
              "Bağlaçlar çeşitli mi? (although, if, because)",
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
          id: "en-b1-03-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about sport and about your day.",
          promptTr: "Sana spor ve günün hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good afternoon. Could you tell me how you usually move during a normal week?", tr: "İyi günler. Normal bir haftada nasıl hareket ettiğini anlatır mısın?" },
            { who: "you", hint: "Haftanı sırayla anlat; sıklık ifadeleri kullan.", expect: "sıklık ifadeleriyle bir haftayı anlatmak", seconds: 40 },
            { who: "partner", de: "Thank you. Has your sleep changed in the last few years?", tr: "Teşekkürler. Son birkaç yılda uykun değişti mi?" },
            { who: "you", hint: "Present perfect ya da `used to` ile bir değişimi anlat.", expect: "zaman içindeki bir değişimi anlatmak", seconds: 40 },
            { who: "partner", de: "And if a doctor told you to give up one habit tomorrow, which would be hardest?", tr: "Bir doktor yarın bir alışkanlığı bırakmanı istese hangisi en zor olurdu?" },
            { who: "you", hint: "Koşul kipiyle cevapla ve gerekçelendir.", expect: "ikinci tip koşul cümlesiyle bir varsayım kurmak", seconds: 40 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "describe a week with frequency words", tr: "Haftayı sıklık ifadeleriyle anlatmak" },
              { de: "describe a change over time", tr: "Zaman içindeki bir değişikliği anlatmak" },
              { de: "use a second conditional", tr: "İkinci tip koşulu kullanmak" },
            ],
            sample:
              "I walk to work most days and I swim once a week, usually on Sunday. I used to sleep five or six hours, but since I moved my alarm I have slept nearly seven. If a doctor told me to give up coffee tomorrow, that would be the hardest one, because it is the only thing that gets me out of the house before eight.",
            criteria: [
              "Sıklık ifadeleri kullanıldı mı? (most days, once a week, usually)",
              "`used to` ya da present perfect ile değişim anlatıldı mı?",
              "Son cevapta ikinci tip koşul kuruldu mu?",
              "Cevaplar geliştirildi mi, tek cümlede mi kaldı?",
            ],
          },
        },
        {
          id: "en-b1-03-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about one minute. Compare these two ways of staying healthy: joining a club with fixed times, and exercising alone whenever you can. Say which you would prefer and why.",
          promptTr:
            "Yaklaşık bir dakika tek başına konuş. Sağlıklı kalmanın şu iki yolunu karşılaştır: sabit saatleri olan bir kulübe girmek ve ne zaman vakit bulursan tek başına spor yapmak. Hangisini tercih edeceğini ve nedenini söyle.",
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
              "A club gives you a time that is already decided, and other people who notice when you are not there. On the other hand, it only works if that hour fits your week, and mine changes every month. Exercising alone is flexible, but flexible often means never. I would choose the club, mainly because I need somebody to expect me. The disadvantage is honest: when I miss two weeks, I feel embarrassed and then I miss a third.",
            criteria: [
              "İki yol da gerçekten karşılaştırıldı mı?",
              "Karşılaştırma yapıları kullanıldı mı? (on the other hand, whereas, only works if)",
              "Tercih gerekçelendirildi mi?",
              "Seçilen yolun olumsuz yanı da söylendi mi?",
              "Bir dakika kesintisiz konuşuldu mu?",
            ],
          },
        },
        {
          id: "en-b1-03-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Our workplace has money for one health project this year. Talk with me about the options and decide together.",
          promptTr:
            "İş yerimizin bu yıl tek bir sağlık projesi için parası var. Seçenekleri benimle konuş ve birlikte karar ver.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "The options are: free fruit in the kitchen, a paid hour of sport in work time, better chairs, or a bicycle store with showers. Which do you think we should choose?", tr: "Seçenekler: mutfakta ücretsiz meyve, mesai içinde ücretli bir saat spor, daha iyi sandalyeler ya da duşlu bir bisiklet deposu. Sence hangisini seçmeliyiz?" },
            { who: "you", hint: "Bir seçenek seç ve gerekçelendir.", expect: "bir seçeneği seçmek ve gerekçelendirmek", seconds: 40 },
            { who: "partner", de: "I understand. But the fruit reaches everybody every day, and only a few people would use the sport hour. Does that change your mind?", tr: "Anlıyorum. Ama meyve her gün herkese ulaşıyor, spor saatini ise yalnız birkaç kişi kullanır. Bu fikrini değiştirir mi?" },
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
              "I would start with the sport hour, because it is the only option that gives people time rather than things. You are right that fewer people would use it, but the people who need it most are exactly the ones who never find an hour. All right: let us put the chairs forward, since everybody sits, and ask for the sport hour again next year.",
            criteria: [
              "Görüş gerekçelendirildi mi?",
              "İtiraza doğrudan mı karşılık verildi?",
              "Karşı tarafın sözlerine gönderme yapıldı mı?",
              "Sonunda ortak bir karar çıktı mı?",
            ],
          },
        },
        {
          id: "en-b1-03-s4",
          no: 4,
          format: "speaking",
          goal: "interaction",
          prompt: "We talk a little more about the same topic: how much a workplace should do for people's health.",
          promptTr: "Aynı konu üzerine biraz daha konuşuyoruz: bir iş yeri çalışanların sağlığı için ne kadarını üstlenmeli.",
          prepSeconds: 15,
          exchange: [
            { who: "partner", de: "Do you think health is mostly a personal decision, or does it depend on the place where you work?", tr: "Sence sağlık çoğunlukla kişisel bir karar mı, yoksa çalıştığın yere mi bağlı?" },
            { who: "you", hint: "Görüşünü söyle ve bir örnek ver.", expect: "genel bir soruya görüş bildirmek ve örneklendirmek", seconds: 40 },
            { who: "partner", de: "Some people say a company should not get involved in how its staff live. Would you agree?", tr: "Bazıları bir şirketin çalışanının nasıl yaşadığına karışmaması gerektiğini söylüyor. Katılır mısın?" },
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
              "I think it is personal, but the place decides how expensive the personal decision is. In my last job the nearest food was a petrol station, so everybody ate badly. I partly agree about companies: they should not tell people how to live, although I would say that changing the chairs or the hours is not telling anybody anything.",
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
