import type { MockPaper } from "../types";

/**
 * B1 · Deneme 1 — "Work, Study and the City".
 *
 * ÖLÇÜM PLANI (B1 tanımı: tanıdık konularda açık ve standart metinlerin ana
 * noktalarını anlamak; bir görüşün gerekçesini izlemek; bağlantılı metin
 * yazmak):
 *
 *   Reading  55 dk · 30 madde
 *     Teil 1  5  üç şıklı seçme   günlük duyuru ve ileti (detail)
 *     Teil 2  5  eşleştirme       beş kişi ↔ sekiz ilan (orientation)
 *     Teil 3  5  dört şıklı seçme uzun metin — tutum ve çıkarım (opinion)
 *     Teil 4  5  cümle yerleştirme  metnin bağdaşıklığı (structure)
 *     Teil 5  5  şıklı boşluk     sözcük seçimi (structure)
 *     Teil 6  5  açık boşluk      boşluk başına tek sözcük (structure)
 *   Listening 35 dk · 25 madde (her kayıt iki kez)
 *     Teil 1  7  üç şıklı seçme   kısa parçalar (detail)
 *     Teil 2  6  üç şıklı seçme   kısa konuşmalar — ana fikir (gist)
 *     Teil 3  6  not tamamlama    tek sesli kayıt (detail)
 *     Teil 4  6  üç şıklı seçme   söyleşi — tutum (opinion)
 *   Writing  50 dk  e-posta (~100 kelime) + yazı ya da anlatı (~100 kelime)
 *   Speaking 15 dk  söyleşi · fotoğraf · birlikte karar · genel sohbet
 *
 * DÖRT ŞIKLI MADDELER BURADA BAŞLIYOR. Üç şık, ana fikir ve ayrıntı için
 * yeterli; tutum ve çıkarım sorularında ise dördüncü şık gerekiyor, çünkü
 * yakın ama yanlış okumaları ayırt etmek istiyoruz. Doğrulayıcı üç ve dört
 * şıklı maddeleri ayrı torbalarda sayıyor.
 *
 * B1 SINIRI: present perfect ile past simple ayrımı, birinci ve ikinci tip
 * koşul, ilgi cümlesi, `used to`, temel edilgen, sık öbek fiiller.
 */
export const EN_B1_01: MockPaper = {
  id: "en-b1-01",
  course: "en",
  level: "B1",
  no: 1,
  theme: "Work, Study and the City",
  themeTr: "İş, öğrenim ve şehir",
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
          id: "en-b1-01-l1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Read the five texts and questions 1 to 5. Choose a, b or c.",
          promptTr: "Beş metni ve 1–5. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "m1",
              genre: "Notice at a college",
              genreTr: "Yüksekokul duyurusu",
              title: "Library cards",
              body: `Students who have finished their first year do not need a new card. Everybody else must bring a photo to the office before 30 September. If you come later, you will pay a fee of five pounds.`,
            },
            {
              kind: "text",
              id: "m2",
              genre: "Email to staff",
              genreTr: "Personele e-posta",
              title: "Building work",
              body: `The lift will be out of order from Monday to Wednesday. Colleagues who work on the fourth floor can use the meeting room on the ground floor instead of their office. Please move your things on Friday afternoon.`,
            },
            {
              kind: "text",
              id: "m3",
              genre: "Message",
              genreTr: "İleti",
              title: "From Petra",
              body: `I have booked the room for the presentation, but only for an hour. If we need more time, we will have to move to the café after that. Bring your laptop: the cable in the room does not work with new machines.`,
            },
            {
              kind: "text",
              id: "m4",
              genre: "Advert",
              genreTr: "İlan",
              title: "Weekend job",
              body: `We need somebody for our garden centre on Saturdays. Experience is welcome but not necessary; we will train you. You must be free from March until October, because we do not open in winter.`,
            },
            {
              kind: "text",
              id: "m5",
              genre: "Notice in a flat building",
              genreTr: "Apartman duyurusu",
              title: "Bicycles",
              body: `The cellar is now full, so we have marked ten new places in the back yard. These places are for people who use their bicycle every day. If your bicycle stands unused for a month, we will move it.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-01-l1-1",
              no: 1,
              ref: "m1",
              text: "Who has to bring a photo?",
              options: ["All students, without exception", "Students in their first year and new students", "Only students who arrive after 30 September"],
              answer: 1,
              explain:
                "Duyuru bir grubu muaf tutuyor: «Students who have finished their first year do not need a new card». Geriye birinci sınıftakiler ve yeni gelenler kalıyor. 30 Eylül tarihi kimin fotoğraf getireceğini değil, ne zaman getireceğini belirliyor; geciken ücret ödüyor ama fotoğraftan kurtulmuyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-01-l1-2",
              no: 2,
              ref: "m2",
              text: "What should staff on the fourth floor do?",
              options: ["Work from home for three days", "Take the stairs up to their own office on the fourth floor", "Use another room on the ground floor"],
              answer: 2,
              explain:
                "E-posta bir alternatif veriyor: «can use the meeting room on the ground floor instead of their office». Evden çalışmaktan hiç söz edilmiyor; merdiven de bir seçenek olarak sunulmuyor, tersine kat değiştirmeleri isteniyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-01-l1-3",
              no: 3,
              ref: "m3",
              text: "Why does Petra mention the laptop?",
              options: ["Because the room's cable is too old", "Because she has forgotten hers at home", "Because the café has no power sockets"],
              answer: 0,
              explain:
                "Gerekçe cümlenin ikinci yarısında: «the cable in the room does not work with new machines». Kafe geçiyor ama yalnız süre uzarsa gidilecek yer olarak; Petra'nın kendi bilgisayarından hiç söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-01-l1-4",
              no: 4,
              ref: "m4",
              text: "What does the garden centre ask for?",
              options: ["Somebody who has worked in a garden before", "Somebody who is free for eight months of the year", "Somebody who can work every day of the week"],
              answer: 1,
              explain:
                "İlan deneyimi açıkça isteğe bağlı bırakıyor («Experience is welcome but not necessary») ama bir zorunluluk koyuyor: mart-ekim arası uygun olmak. Bu sekiz aylık bir dönem. Çalışma günü yalnız cumartesi, her gün değil.",
            },
            {
              kind: "mcq",
              id: "en-b1-01-l1-5",
              no: 5,
              ref: "m5",
              text: "What happens to a bicycle that nobody uses?",
              options: ["It gets a place in the cellar", "It is taken away by the city", "It is put somewhere else"],
              answer: 2,
              explain:
                "Duyuru son cümlede sonucu söylüyor: «If your bicycle stands unused for a month, we will move it». Bodrum zaten dolu, oraya yer verilmiyor; belediye metinde hiç geçmiyor, taşımayı bina yönetimi yapıyor.",
            },
          ],
        },
        {
          id: "en-b1-01-l2",
          no: 2,
          format: "match",
          goal: "orientation",
          prompt:
            "Read about five people, 6 to 10. Then read the eight adverts a to h. Which advert is right for each person? You use each advert once only.",
          promptTr:
            "6–10. maddelerdeki beş kişiyi oku. Sonra a'dan h'ye sekiz ilanı oku. Her kişiye hangi ilan uyar? Her ilan en fazla bir kez kullanılır.",
          options: [
            { key: "a", label: "Night Shift Support", body: "Evening and night work in a small hotel, three nights a week. No experience needed. We pay for a taxi home after two in the morning. You must be over eighteen." },
            { key: "b", label: "Bookkeeping — Online", body: "A twelve-week course in the evening, entirely online. You need a computer and about four hours a week. The certificate is accepted by most small companies." },
            { key: "c", label: "Volunteer Reading Club", body: "Read with children for one hour on Thursday afternoons in the city library. No qualification necessary, but you must come every week for a term." },
            { key: "d", label: "Kitchen Assistant", body: "Lunchtimes only, Monday to Friday, in a busy canteen. Hot food is free for staff. Standing work; the shift is four hours with one short break." },
            { key: "e", label: "Language Exchange", body: "Meet once a week in a café and speak half the time in English, half in another language. Free. Groups of two or three, all levels." },
            { key: "f", label: "Weekend Warehouse", body: "Saturday and Sunday, seven in the morning until three. Heavy lifting. Good money for students, but you need your own transport: there is no bus before eight." },
            { key: "g", label: "Photography Workshop", body: "Six Saturdays in spring, in the old town. Bring any camera, even a phone. The teacher has worked for magazines for twenty years. 90 pounds for the whole course." },
            { key: "h", label: "Office Junior", body: "Full time, Monday to Friday, nine to five. We are looking for somebody at the start of a career. Training is included and you can study one day a month." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b1-01-l2-6",
              no: 6,
              text: "Nadia studies during the day and needs to earn money, but she has no car and no bicycle.",
              answer: "d",
              explain:
                "Nadia'nın iki ölçütü çakışıyor: gündüz ders var ama ulaşımı yok. Mutfak yardımcılığı yalnız öğle saatlerinde ve ulaşım koşulu taşımıyor. Depo işi hafta sonu ve iyi para veriyor ama «you need your own transport: there is no bus before eight» ölçütünde düşüyor.",
            },
            {
              kind: "match",
              id: "en-b1-01-l2-7",
              no: 7,
              text: "Tomasz wants to improve his spoken English without paying anything.",
              answer: "e",
              explain:
                "İlan iki ölçütü birden karşılıyor: konuşma pratiği ve ücretsizlik («Free. Groups of two or three, all levels»). Muhasebe kursu da çevrimiçi ve akşam ama konuşma değil, meslek eğitimi ve bir sertifikaya bağlı.",
            },
            {
              kind: "match",
              id: "en-b1-01-l2-8",
              no: 8,
              text: "Grace has just left school and is looking for her first full-time job with training.",
              answer: "h",
              explain:
                "İlan doğrudan bu profili tarif ediyor: «somebody at the start of a career», tam zamanlı ve «Training is included». Otel işi de deneyim istemiyor ama gece vardiyası ve haftada üç gece, tam zamanlı bir başlangıç işi değil.",
            },
            {
              kind: "match",
              id: "en-b1-01-l2-9",
              no: 9,
              text: "Mehmet works in an office all week and wants to learn a creative skill at the weekend.",
              answer: "g",
              explain:
                "Atölye baharda altı cumartesi sürüyor, yani hafta içi işiyle çakışmıyor, ve öğrenilen şey yaratıcı bir beceri. Okuma kulübü de gönüllü bir uğraş ama perşembe öğleden sonra, hafta içi çalışan biri için uygun değil.",
            },
            {
              kind: "match",
              id: "en-b1-01-l2-10",
              no: 10,
              text: "Ivana wants to do something useful for her neighbourhood and can give one afternoon a week.",
              answer: "c",
              explain:
                "İlan hem gönüllülüğü hem süreyi karşılıyor: haftada bir saat, perşembe öğleden sonra, şehir kütüphanesinde. Ivana haftada bir öğleden sonra verebiliyor. Dil değişimi de ücretsiz ama kendi yararına, mahalleye bir hizmet değil.",
            },
          ],
        },
        {
          id: "en-b1-01-l3",
          no: 3,
          format: "mcq",
          goal: "opinion",
          prompt: "Read the article and questions 11 to 15. Choose a, b, c or d.",
          promptTr: "Yazıyı ve 11–15. maddeleri oku. a, b, c ya da d'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t3",
              genre: "Newspaper article",
              genreTr: "Gazete yazısı",
              title: "The four-day week: one town, two years",
              body: `Two years ago the town council of Alsdale moved all its offices to a four-day week. The staff kept their salary and lost one working day. Since then, other towns have asked the same question, and Alsdale has become a place that people visit to look for answers.

The first year was difficult. Meetings that used to take an hour still took an hour, but there were four days for them instead of five. Some departments simply moved the work into the remaining days, and people went home later than before. The council admits this openly.

What changed things was not a new rule but a new habit. Departments began to write down which meetings actually produced a decision. After six months, a third of the regular meetings had disappeared. Nobody missed them, and this surprised even the people who had defended them.

The numbers are less dramatic than the headlines. Sick days fell by eleven per cent, which is real but small. Applications for jobs at the council, however, doubled. If a town wants good staff and cannot pay more, this may be the strongest argument.

There is one group for which the model has not worked well. In services that must be open every day, such as care homes, a shorter week means more staff, not the same staff working differently. Alsdale has not solved this, and the council no longer promises that it will.

My own view after two years of reporting on this town is simple. The four-day week is not a gift and not a trick. It is a hard question about what a working day is actually for, and most places have never asked it.`,
              gloss: [
                { de: "a council", tr: "belediye meclisi", en: "council" },
                { de: "a department", tr: "birim, bölüm", en: "department" },
                { de: "an application", tr: "başvuru", en: "application" },
                { de: "a care home", tr: "bakımevi", en: "care home" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-01-l3-11",
              no: 11,
              text: "What went wrong in the first year?",
              options: [
                "The same amount of work was pushed into fewer days",
                "The staff lost part of their salary",
                "The council cancelled the plan for six months",
                "Other towns stopped visiting Alsdale",
              ],
              answer: 0,
              explain:
                "Metin ilk yılı açıkça anlatıyor: «Some departments simply moved the work into the remaining days, and people went home later than before». Maaş korunmuş («The staff kept their salary»), plan iptal edilmemiş, öteki şehirler ise tersine gelmeye başlamış.",
            },
            {
              kind: "mcq",
              id: "en-b1-01-l3-12",
              no: 12,
              text: "According to the writer, what really made the difference?",
              options: [
                "A new rule from the council",
                "More money for the departments",
                "A change in how meetings were judged",
                "Help from other towns",
              ],
              answer: 2,
              explain:
                "Yazar dönüm noktasını adlandırıyor: «What changed things was not a new rule but a new habit» — birimler hangi toplantının karar ürettiğini yazmaya başlamış ve altı ayda toplantıların üçte biri kaybolmuş. Kural ve para açıkça eleniyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-01-l3-13",
              no: 13,
              text: "What is the writer's attitude to the figure of eleven per cent?",
              options: [
                "It proves that the model works",
                "It is genuine but not very important",
                "It is probably a mistake in the counting",
                "It matters more than the job applications",
              ],
              answer: 1,
              explain:
                "Yazar sayıyı hem doğruluyor hem küçültüyor: «which is real but small». Aynı paragrafta başvuruların ikiye katlanmasını «the strongest argument» diye niteliyor, yani hastalık izni sayısını daha az önemli buluyor. Sayım hatasından hiç söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-01-l3-14",
              no: 14,
              text: "What does the writer say about care homes?",
              options: [
                "They were the first to try the four-day week",
                "They need fewer staff under the new model",
                "They have found their own solution",
                "The problem there is still open",
              ],
              answer: 3,
              explain:
                "Metin sorunun çözülmediğini iki cümleyle söylüyor: «Alsdale has not solved this, and the council no longer promises that it will». Her gün açık olması gereken hizmetlerde kısa hafta daha AZ değil daha ÇOK personel demek; kendi çözümlerini bulduklarına dair bir cümle yok.",
            },
            {
              kind: "mcq",
              id: "en-b1-01-l3-15",
              no: 15,
              text: "How would you describe the writer's overall position?",
              options: [
                "Enthusiastic: every town should follow Alsdale",
                "Hostile: the experiment has failed",
                "Careful: the real value is in the question it forces",
                "Undecided: there is not enough information yet",
              ],
              answer: 2,
              explain:
                "Son paragraf tam bunu söylüyor: model «not a gift and not a trick», asıl değeri «a hard question about what a working day is actually for». Yazar ne coşkulu ne düşman; kararsız da değil, çünkü net bir sonuca varıyor.",
            },
          ],
        },
        {
          id: "en-b1-01-l4",
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
              title: "Why cities are planting trees on bus routes",
              body: `Ten years ago a tree on a busy road was mostly a decoration. Today it is part of the transport plan. {{16}}

The reason is temperature. On a hot afternoon the surface of a road without shade can be fifteen degrees warmer than the same road under trees. Passengers waiting at a stop feel this immediately. {{17}}

There is also a slower effect that planners like even more. When a walk to the stop is pleasant, people accept a longer walk. A stop that used to serve one street can then serve three. {{18}}

Not every street is suitable, however. Trees need water and space for their roots, and old pipes lie exactly where the roots want to go. {{19}}

Cities that have worked on this for several years give the same advice. Plant fewer trees but plant them properly, and choose the route before you choose the species. {{20}}`,
              gloss: [
                { de: "shade", tr: "gölge", en: "shade" },
                { de: "a root", tr: "kök", en: "root" },
                { de: "a species", tr: "tür", en: "species" },
              ],
            },
          ],
          options: [
            { key: "a", label: "a", body: "In some places the answer has been to plant on one side of the street only, where the ground is free." },
            { key: "b", label: "b", body: "A hundred healthy trees are worth more than three hundred that nobody waters after the first summer." },
            { key: "c", label: "c", body: "Several cities now count their trees in the same document as their bus stops." },
            { key: "d", label: "d", body: "Surveys show that a wait of eight minutes in the sun feels longer than a wait of twelve minutes in the shade." },
            { key: "e", label: "e", body: "That means the same number of buses can reach more people, without a single new vehicle." },
            { key: "f", label: "f", body: "Most new buses are quieter than the models they replace, especially at low speed." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b1-01-l4-16",
              no: 16,
              text: "Gap 16",
              answer: "c",
              explain:
                "Boşluktan önce «Today it is part of the transport plan» deniyor; (c) bunu somutlaştırıyor: şehirler ağaçlarını otobüs duraklarıyla aynı belgede sayıyor. Genel iddiadan somut örneğe geçiş.",
            },
            {
              kind: "match",
              id: "en-b1-01-l4-17",
              no: 17,
              text: "Gap 17",
              answer: "d",
              explain:
                "Önceki cümle «Passengers waiting at a stop feel this immediately» diyor; (d) bunu bir ölçümle destekliyor: güneşte sekiz dakika, gölgede on iki dakikadan uzun geliyor. Aynı paragrafın konusu sıcaklık ve bekleme.",
            },
            {
              kind: "match",
              id: "en-b1-01-l4-18",
              no: 18,
              text: "Gap 18",
              answer: "e",
              explain:
                "Önceki cümle bir durağın üç sokağa hizmet edebileceğini söylüyor; (e) bunun sonucunu çıkarıyor: aynı sayıda otobüs daha çok insana ulaşır. `That means` gönderme öğesi doğrudan önceki cümleye bağlanıyor.",
            },
            {
              kind: "match",
              id: "en-b1-01-l4-19",
              no: 19,
              text: "Gap 19",
              answer: "a",
              explain:
                "Paragraf boruların köklerle çakışmasını sorun olarak koyuyor; (a) bir çözüm veriyor: yalnız zeminin boş olduğu tarafa dikmek. Sorun-çözüm bağı `the answer has been` ile kuruluyor.",
            },
            {
              kind: "match",
              id: "en-b1-01-l4-20",
              no: 20,
              text: "Gap 20",
              answer: "b",
              explain:
                "Son paragraf «Plant fewer trees but plant them properly» tavsiyesini veriyor; (b) aynı düşünceyi sayıyla tekrar ediyor: sulanmayan üç yüz ağaç yerine yüz sağlıklı ağaç. (f) otobüslerin sesinden söz ediyor ve metnin hiçbir yerinde gürültü konusu yok — hiçbir boşluğa uymayan cümle odur.",
            },
          ],
        },
        {
          id: "en-b1-01-l5",
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
              genreTr: "Tavsiye metni",
              title: "Your first week in a new job",
              body: `Nobody expects you to be useful in your first week. What people do {{21}} is that you ask questions while asking is still easy.

Write down the names of the people you meet. It sounds childish, but after three days you will have met thirty people and you will {{22}} at least twenty of the names.

Do not try to fix anything yet. A process that looks strange to you often has a reason {{23}} it, and the reason may be a person you have not met.

Take notes in every meeting, even when you understand nothing. In four weeks those notes will {{24}} sense, and by then nobody will explain the basics again.

And finally, go home on time. A person who stays until eight in the first week sets an expectation that is hard to {{25}} later.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-01-l5-21",
              no: 21,
              text: "Gap 21",
              options: ["hope", "wait", "consider", "expect"],
              answer: 3,
              explain:
                "Cümle bir önceki cümledeki `expects` fiilini karşıtlıkla sürdürüyor: kimse yararlı olmanı beklemiyor, ama insanların beklediği şey soru sormandır. `expect` bu yapıda nesnesini doğrudan alır; `hope` ve `wait` `for` ister, `consider` ise «göz önünde bulundurmak» demektir ve bir beklenti bildirmez.",
            },
            {
              kind: "mcq",
              id: "en-b1-01-l5-22",
              no: 22,
              text: "Gap 22",
              options: ["have forgotten", "forget", "will be forgetting", "forgot"],
              answer: 0,
              explain:
                "Zaman belirteci `after three days` bir noktaya kadar tamamlanmış bir sonucu anlatıyor ve cümlenin ilk yarısı da `will have met` biçiminde. Aynı yapı ikinci yarıda da sürüyor. `forgot` geçmiş zamandır ve gelecekteki bir noktaya bağlanamaz; `will be forgetting` ise o anda süren bir eylem anlatır, tamamlanmış bir sonucu değil.",
            },
            {
              kind: "mcq",
              id: "en-b1-01-l5-23",
              no: 23,
              text: "Gap 23",
              options: ["for", "behind", "underneath", "about"],
              answer: 1,
              explain:
                "`a reason behind something` bir eşdizim: görünürdeki şeyin arkasındaki gerekçe. `a reason for` de doğrudur ama devamındaki «the reason may be a person you have not met» arka planı işaret ediyor; `underneath` fiziksel altta olmayı bildirir ve `about` bu adla kullanılmaz.",
            },
            {
              kind: "mcq",
              id: "en-b1-01-l5-24",
              no: 24,
              text: "Gap 24",
              options: ["do", "give", "make", "produce"],
              answer: 2,
              explain:
                "`make sense` sabit bir eşdizim: anlam kazanmak. `do sense`, `give sense` ve `produce sense` İngilizcede yoktur. B1'de bu tür fiil-ad eşdizimleri ölçülen konulardan biri.",
            },
            {
              kind: "mcq",
              id: "en-b1-01-l5-25",
              no: 25,
              text: "Gap 25",
              options: ["change", "turn", "move", "reverse"],
              answer: 0,
              explain:
                "Nesne `an expectation` ve anlam bir beklentiyi sonradan değiştirmenin zorluğu. `change an expectation` doğal bir eşdizimdir; `turn`, `move` ve `reverse` bu adla bu anlamı vermez.",
            },
          ],
        },
        {
          id: "en-b1-01-l6",
          no: 6,
          format: "gap",
          goal: "structure",
          prompt: "Read the text and complete gaps 26 to 30. Write ONE word in each gap.",
          promptTr: "Metni oku ve 26–30. boşlukları tamamla. Her boşluğa TEK bir sözcük yaz.",
          texts: [
            {
              kind: "text",
              id: "t6",
              genre: "Letter",
              genreTr: "Mektup",
              title: "To the editor",
              body: `I read your article about the new bus lane with interest, {{26}} I do not agree with the conclusion.

You write that the lane has made the journey slower for drivers. This is true, but it is only half of the story. Since the lane opened, the number of people {{27}} take the bus in the morning has risen by a fifth.

If the council {{28}} removed the lane last year, those passengers would be in cars today, and the road would be worse for everybody.

I have lived in this street for eleven years and I have never seen the pavement so busy. People are walking again, {{29}} they used to drive two hundred metres to the shop.

The lane is not perfect. But it should be judged {{30}} the number of people it moves, not by the speed of a single car.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b1-01-l6-26",
              no: 26,
              text: "Gap 26",
              accept: ["but", "although", "though"],
              explain:
                "İki yarı karşıt: yazıyı ilgiyle okumuş ama sonucuna katılmıyor. Karşıtlığı `but` kurar; `although` ve `though` da aynı ilişkiyi verir ve virgülden sonra gelebilir. `because` ya da `so` anlamı bozar.",
            },
            {
              kind: "gap",
              id: "en-b1-01-l6-27",
              no: 27,
              text: "Gap 27",
              accept: ["who", "that"],
              explain:
                "«the number of people ___ take the bus» yapısında boşluk bir ilgi zamiri istiyor ve öncül insan: `who` ya da `that`. `which` insanlar için kullanılmaz; ilgi zamiri özne konumunda olduğu için düşürülemez.",
            },
            {
              kind: "gap",
              id: "en-b1-01-l6-28",
              no: 28,
              text: "Gap 28",
              accept: ["had"],
              explain:
                "Cümle geçmişe dair bir varsayım kuruyor ve ana cümlede `would be` var: üçüncü tipe yakın karma bir koşul. `If the council had removed …` yapısı `had` ister. `has` ya da `would` bu yapıda gelmez.",
            },
            {
              kind: "gap",
              id: "en-b1-01-l6-29",
              no: 29,
              text: "Gap 29",
              accept: ["where"],
              explain:
                "İki durum yer üzerinden karşılaştırılıyor: insanlar artık yürüyor, oysa eskiden markete iki yüz metre araba kullanıyorlardı. `where` bu yer ilişkisini kurar ve `used to` ile geçmiş alışkanlığı bağlar; `when` zaman ilişkisi kurardı ve cümledeki mesafe bilgisiyle uyuşmaz.",
            },
            {
              kind: "gap",
              id: "en-b1-01-l6-30",
              no: 30,
              text: "Gap 30",
              accept: ["by"],
              explain:
                "`be judged by something` edilgen bir eşdizim: bir ölçüte göre değerlendirilmek. Cümlenin ikinci yarısı da aynı edatı tekrarlıyor: «not by the speed of a single car». Bu tekrar doğru edatı doğruluyor.",
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
          id: "en-b1-01-h1",
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
              situation: "Bir tren istasyonunda anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "The nine forty to Norwich will leave from platform 2 today. Passengers with tickets for the earlier train, which was cancelled, can use this service without paying extra." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "At work",
              genreTr: "İş yerinde",
              situation: "İki meslektaş bir rapordan söz ediyor.",
              plays: 2,
              segments: [
                { speaker: "Ken", text: "Have you finished the report?" },
                { speaker: "Rosa", text: "Almost. I have written everything except the last section, and I need the March figures for that." },
                { speaker: "Ken", text: "Ana has them. She sent them to me by mistake." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Voicemail",
              genreTr: "Telesekreter iletisi",
              situation: "Bir öğrenci danışmanına ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello, it's Karim. I cannot come on Tuesday because my shift changed. Could we meet on Wednesday instead? Any time in the afternoon works for me." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "In a shop",
              genreTr: "Mağazada",
              situation: "Bir müşteri satış görevlisiyle konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Customer", text: "I bought this printer here last month and it has stopped twice." },
                { speaker: "Assistant", text: "We can repair it or give you a new one. A repair takes ten days, a new one takes two." },
                { speaker: "Customer", text: "I need it for work, so I cannot wait ten days." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Radyoda hava durumu veriliyor.",
              plays: 2,
              segments: [
                { text: "Rain in the morning, but it will stop before lunch. The afternoon will be dry and windy, and temperatures will reach sixteen degrees, which is warm for October." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "At the college office",
              genreTr: "Okul ofisinde",
              situation: "Bir öğrenci sınav kaydı hakkında soruyor.",
              plays: 2,
              segments: [
                { speaker: "Student", text: "Is the deadline for the exam form the fifteenth?" },
                { speaker: "Clerk", text: "It was, but we moved it to the twenty-second because the system was down." },
                { speaker: "Student", text: "That helps. I have not finished the form yet." },
              ],
            },
            {
              kind: "audio",
              id: "a7",
              genre: "On the phone",
              genreTr: "Telefonda",
              situation: "Bir kişi bir daireyi soruyor.",
              plays: 2,
              segments: [
                { speaker: "Caller", text: "I saw your advert for the flat. Is it still free?" },
                { speaker: "Owner", text: "Yes, but I should say that the heating is old. The rent is low for that reason." },
                { speaker: "Caller", text: "That is honest, thank you. Can I see it on Saturday?" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-01-h1-1",
              no: 1,
              ref: "a1",
              text: "What do passengers of the cancelled train have to do?",
              options: ["Nothing, their ticket is valid", "Buy a new ticket at the ticket office", "Wait for a later service"],
              answer: 0,
              explain:
                "Anons «can use this service without paying extra» diyor: eski bilet geçerli, ek ödeme yok. Yeni bilet almak ya da beklemek kayıtta hiç geçmiyor; tersine bu tren onlara açılıyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-01-h1-2",
              no: 2,
              ref: "a2",
              text: "What is Rosa waiting for?",
              options: ["A decision from Ken", "Some numbers from a colleague", "The last section from Ana"],
              answer: 1,
              explain:
                "Rosa «I need the March figures for that» diyor, Ken de rakamların Ana'da olduğunu ekliyor. Son bölümü Rosa'nın kendisi yazacak, Ana değil; üçüncü şık rolleri değiştiriyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-01-h1-3",
              no: 3,
              ref: "a3",
              text: "Why does Karim call?",
              options: ["To cancel the meeting completely", "To complain about his shift", "To move the meeting to another day"],
              answer: 2,
              explain:
                "Karim salı gelemeyeceğini söyleyip «Could we meet on Wednesday instead?» diyor: iptal değil erteleme. Vardiya değişikliği yalnız gerekçe olarak anılıyor, şikâyet konusu değil.",
            },
            {
              kind: "mcq",
              id: "en-b1-01-h1-4",
              no: 4,
              ref: "a4",
              text: "What will the customer probably choose?",
              options: ["A replacement, because it is faster", "A repair, because it is cheaper", "A refund, because the printer is new"],
              answer: 0,
              explain:
                "Müşteri son cümlede kararını gerekçelendiriyor: «I need it for work, so I cannot wait ten days». Tamir on gün, yenisi iki gün. Fiyattan hiç söz edilmiyor ve para iadesi seçenekler arasında yok.",
            },
            {
              kind: "mcq",
              id: "en-b1-01-h1-5",
              no: 5,
              ref: "a5",
              text: "What will the weather be like in the afternoon?",
              options: ["Wet and cold for the season", "Dry but colder than usual", "Dry and unusually mild"],
              answer: 2,
              explain:
                "Kayıt öğleden sonrayı «dry and windy» diye veriyor ve on altı dereceyi «warm for October» diye niteliyor. Yağmur öğleden önce bitiyor; sıcaklık mevsim normalinin üstünde, altında değil.",
            },
            {
              kind: "mcq",
              id: "en-b1-01-h1-6",
              no: 6,
              ref: "a6",
              text: "When is the deadline now?",
              options: ["On the fifteenth", "On the twenty-second", "There is no deadline"],
              answer: 1,
              explain:
                "Görevli değişikliği bildiriyor: «It was, but we moved it to the twenty-second». On beş eski tarih; `It was, but …` yapısının ikinci yarısını duymak gerekiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-01-h1-7",
              no: 7,
              ref: "a7",
              text: "What does the owner tell the caller?",
              options: ["There is a problem with the flat", "The flat is already taken", "The rent will go up soon"],
              answer: 0,
              explain:
                "Ev sahibi kendiliğinden bir kusuru söylüyor: «the heating is old. The rent is low for that reason». Daire boş ve kira düşük kalıyor; arayan da bu dürüstlüğü övüyor.",
            },
          ],
        },
        {
          id: "en-b1-01-h2",
          no: 2,
          format: "mcq",
          goal: "gist",
          prompt: "You hear six short conversations. What is the main point? Choose a, b or c. You hear every conversation twice.",
          promptTr: "Altı kısa konuşma dinleyeceksin. Ana nokta nedir? a, b ya da c'yi seç. Her konuşmayı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "At home",
              genreTr: "Evde",
              situation: "İki ev arkadaşı bir kural üzerine konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Jo", text: "The washing machine is free every evening now, so we do not need the list any more." },
                { speaker: "Sam", text: "I would keep it. In winter everybody washes at the same time and then we argue again." },
              ],
            },
            {
              kind: "audio",
              id: "b2",
              genre: "At work",
              genreTr: "İş yerinde",
              situation: "İki meslektaş yeni bir programdan söz ediyor.",
              plays: 2,
              segments: [
                { speaker: "Ilhan", text: "The new system is slower than the old one." },
                { speaker: "Mia", text: "It is, but it does the invoices automatically. I used to spend Friday afternoon on them." },
              ],
            },
            {
              kind: "audio",
              id: "b3",
              genre: "In the street",
              genreTr: "Sokakta",
              situation: "İki komşu yeni bisiklet yolundan söz ediyor.",
              plays: 2,
              segments: [
                { speaker: "Ruth", text: "The new cycle path took a whole year to build." },
                { speaker: "Dan", text: "It did, and I complained about it every week. Now I use it every day and I have stopped complaining." },
              ],
            },
            {
              kind: "audio",
              id: "b4",
              genre: "At the college",
              genreTr: "Okulda",
              situation: "İki öğrenci bir dersten söz ediyor.",
              plays: 2,
              segments: [
                { speaker: "Ada", text: "The lectures are online now. I can watch them at any time." },
                { speaker: "Leo", text: "True, but I have watched none of them. When it was at ten on Monday, I went." },
              ],
            },
            {
              kind: "audio",
              id: "b5",
              genre: "On the phone",
              genreTr: "Telefonda",
              situation: "İki arkadaş bir tatilden söz ediyor.",
              plays: 2,
              segments: [
                { speaker: "Vera", text: "Shall we book the same house as last year?" },
                { speaker: "Tim", text: "It was lovely, but it is forty minutes from everything. This time I would like to walk to the shops." },
              ],
            },
            {
              kind: "audio",
              id: "b6",
              genre: "At the doctor's",
              genreTr: "Doktorda",
              situation: "Bir hasta ve bir doktor konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Doctor", text: "Your results are fine. The tiredness is probably your sleep, not an illness." },
                { speaker: "Patient", text: "That is a relief. I was sure something was wrong." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-01-h2-8",
              no: 8,
              ref: "b1",
              text: "What do they disagree about?",
              options: ["Who washes too often", "Whether the list is still needed", "When the machine is free"],
              answer: 1,
              explain:
                "Jo listeye artık gerek olmadığını, Sam ise tutulmasını («I would keep it») savunuyor. Makinenin ne zaman boş olduğu konusunda anlaşmazlık yok; kimin çok yıkadığı hiç konuşulmuyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-01-h2-9",
              no: 9,
              ref: "b2",
              text: "What is Mia's point about the new system?",
              options: ["It is faster than people say", "It should be replaced again", "It saves her a lot of time overall"],
              answer: 2,
              explain:
                "Mia yavaşlığı kabul ediyor («It is, but …») ve karşılığında kazandığı zamanı söylüyor: eskiden cuma öğleden sonrasını faturalara harcıyormuş. Hızlı olduğunu savunmuyor, dengeyi savunuyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-01-h2-10",
              no: 10,
              ref: "b3",
              text: "How has Dan's opinion changed?",
              options: ["He was against it and now uses it daily", "He was for it from the beginning and is now disappointed", "He has never had a strong opinion"],
              answer: 0,
              explain:
                "Dan «I complained about it every week» diyor, sonra da her gün kullanıp şikâyeti bıraktığını ekliyor. Görüş yönü olumsuzdan olumluya; ikinci şık yönü ters çeviriyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-01-h2-11",
              no: 11,
              ref: "b4",
              text: "What does Leo say about the online lectures?",
              options: ["They are better than the old ones", "He prefers to watch them late at night", "The freedom has stopped him watching"],
              answer: 2,
              explain:
                "Leo «I have watched none of them» diyor ve sebebi ekliyor: sabit saatte olduğunda gidiyormuş. İstediği zaman izleyebilmek onu izlemekten alıkoymuş. Gece izleme tercihi kayıtta hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-01-h2-12",
              no: 12,
              ref: "b5",
              text: "Why does Tim want a different house?",
              options: ["The old one was too expensive", "He wants to be nearer to the shops", "The house was too small last year"],
              answer: 1,
              explain:
                "Tim evi beğendiğini söylüyor ama tek sorunu mesafe: «it is forty minutes from everything» ve bu kez dükkânlara yürümek istiyor. Fiyat ve büyüklük kayıtta hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-01-h2-13",
              no: 13,
              ref: "b6",
              text: "How does the patient feel?",
              options: ["Relieved by the news", "Worried about the results", "Angry with the doctor"],
              answer: 0,
              explain:
                "Hasta «That is a relief» diyor: rahatlamış. Bir hastalık olduğundan emin olması geçmişteki endişesi; sonuçlar iyi çıktığı için o endişe kalkıyor.",
            },
          ],
        },
        {
          id: "en-b1-01-h3",
          no: 3,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear a talk about a city volunteering scheme. Complete the notes, questions 14 to 19. Write ONE or TWO words or a number in each gap. You hear the talk twice.",
          promptTr:
            "Bir şehir gönüllülük programı hakkında sunum dinleyeceksin. 14–19. maddelerdeki notları tamamla. Her boşluğa BİR ya da İKİ sözcük veya bir sayı yaz. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Talk",
              genreTr: "Sunum",
              situation: "Bir görevli şehir gönüllülük programını tanıtıyor.",
              plays: 2,
              segments: [
                {
                  text: "Thank you all for coming. Our scheme is called Neighbours First and it started in 2021 with only eleven people. Today we have four hundred volunteers. The idea is simple: you give two hours a week, always on the same day, and you work in your own district. Most people help with shopping or with reading, but the fastest growing area is help with forms — letters from offices, applications, that kind of thing. Before you start you come to one training evening. It lasts three hours and it is the only training we ask for. After that, your coordinator calls you once a month. We do not pay volunteers, but we pay your travel, and there is a free hot meal at the monthly meeting. One last point, and it is important: if you cannot come one week, you tell your coordinator, not the family. That rule protects everybody.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notes",
              genreTr: "Not kâğıdı",
              title: "Neighbours First — notes",
              body: `Started in:              {{14}}
Number of volunteers:    {{15}}
Time given each week:    {{16}} hours
Fastest growing area:    help with {{17}}
Training evening lasts:  {{18}} hours
If you cannot come:      tell your {{19}}`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b1-01-h3-14",
              no: 14,
              ref: "c1",
              text: "Gap 14",
              accept: ["2021"],
              explain:
                "Konuşmacı «it started in 2021 with only eleven people» diyor. Kayıttaki on bir sayısı kuruluş yılındaki kişi sayısı, dört yüz ise bugünkü sayı; hangi sayının yıl olduğunu ayırmak gerekiyor.",
            },
            {
              kind: "gap",
              id: "en-b1-01-h3-15",
              no: 15,
              ref: "c1",
              text: "Gap 15",
              accept: ["400", "four hundred"],
              explain:
                "«Today we have four hundred volunteers» — bugünkü gönüllü sayısı dört yüz. On bir kuruluş anındaki sayı; not kâğıdı bugünü soruyor.",
            },
            {
              kind: "gap",
              id: "en-b1-01-h3-16",
              no: 16,
              ref: "c1",
              text: "Gap 16",
              accept: ["2", "two"],
              explain:
                "«you give two hours a week, always on the same day» — haftalık katkı iki saat. Kayıttaki üç saat eğitim akşamının süresi; not kâğıdında iki ayrı satır var ve ikisi karıştırılmamalı.",
            },
            {
              kind: "gap",
              id: "en-b1-01-h3-17",
              no: 17,
              ref: "c1",
              text: "Gap 17",
              accept: ["forms", "official forms"],
              explain:
                "Konuşmacı en hızlı büyüyen alanı ayrıca işaretliyor: «the fastest growing area is help with forms». Alışveriş ve okuma en yaygın alanlar ama en hızlı büyüyen değil; `most people` ile `fastest growing` ayrımını duymak gerekiyor.",
            },
            {
              kind: "gap",
              id: "en-b1-01-h3-18",
              no: 18,
              ref: "c1",
              text: "Gap 18",
              accept: ["3", "three"],
              explain:
                "Eğitim akşamı için «It lasts three hours and it is the only training we ask for» deniyor. İki saat haftalık gönüllülük süresi; iki sayı arka arkaya geçtiği için karıştırılması kolay.",
            },
            {
              kind: "gap",
              id: "en-b1-01-h3-19",
              no: 19,
              ref: "c1",
              text: "Gap 19",
              accept: ["coordinator"],
              explain:
                "Son kural açık: «you tell your coordinator, not the family». Aileye haber vermek tam olarak yasaklanan davranış; kuralın ikinci yarısını duymadan aileyi yazan öğrenci yanılır.",
            },
          ],
        },
        {
          id: "en-b1-01-h4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt: "You hear an interview with a woman who moved out of the city. Choose a, b or c for questions 20 to 25. You hear the interview twice.",
          promptTr: "Şehirden taşınan bir kadınla söyleşi dinleyeceksin. 20–25. maddeler için a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Interview",
              genreTr: "Söyleşi",
              situation: "Bir radyo programında şehirden köye taşınan bir kadınla söyleşi yapılıyor.",
              plays: 2,
              segments: [
                { speaker: "Host", text: "Petra, you left the city three years ago. Was it a plan or a decision from one day to the next?" },
                { speaker: "Petra", text: "Neither, really. My rent went up twice in one year, and at some point I stopped looking for a flat and started looking at maps. It was not brave. It was arithmetic." },
                { speaker: "Host", text: "And the village you chose — was it the cheapest one you found?" },
                { speaker: "Petra", text: "No, and that was the one thing I got right. I chose a village with a shop, a bus and a school. Cheaper places had none of the three. A house you cannot leave is not a saving." },
                { speaker: "Host", text: "What surprised you most in the first year?" },
                { speaker: "Petra", text: "How much time I got back. In the city I travelled ninety minutes a day. Here it is twenty. But I have to say, the first winter was harder than I expected. It gets dark and nothing happens." },
                { speaker: "Host", text: "Do you miss the city?" },
                { speaker: "Petra", text: "I miss two things: concerts and the possibility of changing my mind at eight in the evening. I do not miss the noise, and I really do not miss paying two thirds of my salary for a room." },
                { speaker: "Host", text: "Would you tell other people to do the same?" },
                { speaker: "Petra", text: "I would tell them to visit in February, not in June. Everybody falls in love with a village in summer. If it still looks good in the rain, then talk to me again." },
              ],
              gloss: [
                { de: "arithmetic", tr: "hesap, aritmetik", en: "arithmetic" },
                { de: "a saving", tr: "tasarruf", en: "saving" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-01-h4-20",
              no: 20,
              ref: "d1",
              text: "How does Petra describe her decision to leave?",
              options: ["As a long plan she had for years", "As the result of rising costs", "As a sudden idea one morning"],
              answer: 1,
              explain:
                "Petra «My rent went up twice in one year» diyor ve kararını «It was not brave. It was arithmetic» diye nitelendiriyor: sebep para. Sunucunun sorduğu iki seçeneği (uzun plan / ani karar) «Neither, really» ile eliyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-01-h4-21",
              no: 21,
              ref: "d1",
              text: "Why did she not choose the cheapest village?",
              options: ["Because the houses there were too small", "Because she wanted to live near her family", "Because a village without services is not really cheap"],
              answer: 2,
              explain:
                "Petra ölçütlerini sayıyor (dükkân, otobüs, okul) ve gerekçeyi tek cümleyle veriyor: «A house you cannot leave is not a saving». Ev büyüklüğü ve aile söyleşide hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-01-h4-22",
              no: 22,
              ref: "d1",
              text: "What surprised her most?",
              options: ["The amount of time she gained", "The cost of heating the house", "How friendly the neighbours were"],
              answer: 0,
              explain:
                "Soru doğrudan soruluyor ve cevap «How much time I got back» — günde doksan dakikadan yirmiye. Isıtma ve komşular kayıtta hiç geçmiyor; kış zorluğu ayrı bir ekleme, sürpriz olarak adlandırılmıyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-01-h4-23",
              no: 23,
              ref: "d1",
              text: "What does she say about her first winter?",
              options: ["It was easier than in the city", "It was more difficult than she thought", "It was the reason she nearly moved back"],
              answer: 1,
              explain:
                "Petra «the first winter was harder than I expected» diyor. Geri dönmeyi düşündüğünü hiç söylemiyor; şehirle karşılaştırma da yapmıyor, kendi beklentisiyle karşılaştırıyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-01-h4-24",
              no: 24,
              ref: "d1",
              text: "What does she miss about the city?",
              options: ["The noise and the crowds", "Concerts and spontaneous evenings", "Her old flat and its size"],
              answer: 1,
              explain:
                "İki şeyi sayıyor: konserler ve «the possibility of changing my mind at eight in the evening», yani planı anında değiştirebilmek. Gürültüyü ve yüksek kirayı özlemediğini ayrıca vurguluyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-01-h4-25",
              no: 25,
              ref: "d1",
              text: "What advice does she give?",
              options: ["Visit in the worst season before you decide", "Rent for one year before you buy", "Move only if you have a car"],
              answer: 0,
              explain:
                "Tavsiyesi tek cümle: «I would tell them to visit in February, not in June», çünkü herkes yazın bir köye âşık olur. Kiralamak ya da araba koşulu söyleşide hiç geçmiyor.",
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
          id: "en-b1-01-w1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "You are going to start a course in another city and you have written to a student residence. Read the reply below and write an email back. Write about 100 words and answer all the points.\n\nReply from the residence: \"Thank you for your interest. We have single rooms and shared flats. Please tell us which you prefer and why. Rooms are available from 1 September or from 1 October — which date do you need? Finally, do you have any questions about the building?\"",
          promptTr:
            "Başka bir şehirde bir kursa başlayacaksın ve bir öğrenci yurduna yazdın. Aşağıdaki cevabı oku ve yanıt e-postası yaz. Yaklaşık 100 kelime, bütün maddelere cevap ver.\n\nYurdun cevabı: tek kişilik oda ve paylaşımlı daire var; hangisini neden tercih ettiğini yaz, 1 Eylül mü 1 Ekim mi istediğini söyle, bina hakkında sorun varsa sor.",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Say which type of room you prefer and give a reason.", tr: "Hangi oda türünü tercih ettiğini söyle ve gerekçe ver." },
              { de: "Say which date you need and why.", tr: "Hangi tarihi istediğini ve nedenini söyle." },
              { de: "Ask at least one clear question about the building.", tr: "Bina hakkında en az bir açık soru sor." },
            ],
            sample: `Dear Sir or Madam,

Thank you for your quick reply.

I would prefer a shared flat. I have lived alone for two years and I found it quiet, so this time I would like to cook and talk with other students. I do not mind sharing a kitchen.

I need the room from 1 September, because my course begins on the fourth and I would like a few days to find my way around the city.

Could you tell me whether there is a laundry room in the building, and whether I can leave a bicycle somewhere safe?

Thank you in advance.

Best regards,
Selin Aydin`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi? Biri eksikse metin tam sayılmaz.",
              "Tercih bir gerekçeyle mi verildi, yoksa yalnız seçim mi bildirildi?",
              "Soru gerçekten soru biçiminde mi kuruldu? (Could you tell me whether …)",
              "Kayıt tutarlı mı? Resmî bir yazışmada `Hi` ve `Cheers` uygun değil.",
              "Yaklaşık 100 kelime yazıldı mı?",
              "Cümleler bağlaçlarla bağlanmış mı, yoksa kısa cümleler yan yana mı duruyor?",
            ],
          },
        },
        {
          id: "en-b1-01-w2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Write an article for your college magazine with this title: \"The best thing about the place where I live\". Say what it is, why it matters to you, and what a visitor should do first. Write about 100 words.",
          promptTr:
            "Okul dergin için şu başlıkla bir yazı yaz: \"Yaşadığım yerin en iyi yanı\". Ne olduğunu, senin için neden önemli olduğunu ve bir ziyaretçinin ilk ne yapması gerektiğini yaz. Yaklaşık 100 kelime.",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Say what the best thing is.", tr: "En iyi yanın ne olduğunu söyle." },
              { de: "Explain why it matters to you personally.", tr: "Senin için neden önemli olduğunu açıkla." },
              { de: "Give a visitor one concrete piece of advice.", tr: "Bir ziyaretçiye somut bir tavsiye ver." },
            ],
            sample: `The best thing about my town is the river path. It runs for eleven kilometres, from the old bridge to the forest, and it costs nothing.

For me it is not really about sport. I walk there when I have a problem I cannot solve at my desk. Something about moving in a straight line for an hour makes decisions easier. I have solved more work problems on that path than in any meeting.

If you visit, do not start at the bridge like everybody else. Start at the forest end early in the morning, when the water is still and there is nobody there.`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "Kişisel gerekçe somut mu, yoksa genel bir övgü mü? (\"güzeldir\" bir gerekçe değildir)",
              "Tavsiye uygulanabilir mi? (yer, saat ya da yön içeriyor mu)",
              "Metin bir yazı gibi mi kurulmuş — giriş, gelişme, kapanış?",
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
          id: "en-b1-01-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about your work or studies and about your town.",
          promptTr: "Sana işin ya da öğrenimin ve yaşadığın şehir hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good morning. Could you tell me a little about what you do — work or study?", tr: "Günaydın. Ne yaptığından biraz söz eder misin — iş mi öğrenim mi?" },
            { who: "you", hint: "Ne yaptığını, ne zamandır yaptığını ve neyi sevdiğini anlat.", expect: "kendi işini ya da öğrenimini süre ve bir değerlendirme ile anlatmak", seconds: 40 },
            { who: "partner", de: "Thank you. And has your town changed much in the last few years?", tr: "Teşekkürler. Şehrin son birkaç yılda çok değişti mi?" },
            { who: "you", hint: "Bir değişikliği anlat ve iyi mi kötü mü olduğunu söyle.", expect: "bir değişikliği tarif etmek ve değerlendirmek", seconds: 40 },
            { who: "partner", de: "Interesting. What would you change about it if you could?", tr: "İlginç. Elinde olsa neyi değiştirirdin?" },
            { who: "you", hint: "Koşul kipiyle bir değişiklik öner ve gerekçelendir.", expect: "ikinci tip koşul cümlesiyle bir öneri kurmak ve gerekçelendirmek", seconds: 40 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "give extended answers, not one sentence", tr: "Tek cümlelik değil, geliştirilmiş cevaplar vermek" },
              { de: "use a second conditional in the last answer", tr: "Son cevapta ikinci tip koşulu kullanmak" },
            ],
            sample:
              "I have worked as a nurse for four years, mostly with older patients. What I like is that no two days are the same. My town has changed a lot: they closed the old market and built a shopping centre, which I think was a mistake. If I could change one thing, I would make the buses run later, because at the moment the last bus leaves at half past ten.",
            criteria: [
              "Cevaplar geliştirildi mi, yoksa tek cümlede mi kaldı?",
              "Present perfect (`I have worked …`) doğru kullanıldı mı?",
              "Son cevapta ikinci tip koşul kuruldu mu? (If I could …, I would …)",
              "Değerlendirmeler gerekçelendirildi mi?",
            ],
          },
        },
        {
          id: "en-b1-01-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about one minute. Compare these two situations and say which you would prefer: working in an open office with twenty people, or working alone at home. Say why.",
          promptTr:
            "Yaklaşık bir dakika tek başına konuş. Şu iki durumu karşılaştır ve hangisini tercih edeceğini söyle: yirmi kişilik açık bir ofiste çalışmak mı, evde tek başına çalışmak mı? Nedenini söyle.",
          prepSeconds: 60,
          speakSeconds: 75,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "compare the two situations", tr: "İki durumu karşılaştır" },
              { de: "say which you prefer and why", tr: "Hangisini tercih ettiğini ve nedenini söyle" },
              { de: "mention one disadvantage of your choice", tr: "Seçtiğin şeyin bir olumsuz yanını da söyle" },
            ],
            sample:
              "In an open office you are never alone, so you learn quickly and you hear what other teams are doing. At home it is much quieter and you decide your own hours. I would prefer to work at home, mainly because I lose concentration when people talk near me. But I know the disadvantage: at home you can work until nine in the evening without noticing, and nobody stops you. In an office people go home and you go with them.",
            criteria: [
              "İki durum gerçekten karşılaştırıldı mı, yoksa yalnız biri mi anlatıldı?",
              "Karşılaştırma yapıları kullanıldı mı? (quieter, more, than, whereas)",
              "Tercih gerekçelendirildi mi?",
              "Seçilen tarafın olumsuz yanı da söylendi mi? Bu, tek yanlı anlatımı önlüyor.",
              "Bir dakika kesintisiz konuşuldu mu?",
            ],
          },
        },
        {
          id: "en-b1-01-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Our college has money for one new thing for students. Talk with me about the options and decide together.",
          promptTr:
            "Okulumuzun öğrenciler için tek bir yeni şeye ayıracak parası var. Seçenekleri benimle konuş ve birlikte karar ver.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "The options are: a quiet study room, a cheap canteen, better wifi, or a bicycle shelter. Which one do you think is most useful, and why?", tr: "Seçenekler: sessiz bir çalışma odası, ucuz bir yemekhane, daha iyi kablosuz ağ ya da bir bisiklet barınağı. Sence hangisi en yararlı, neden?" },
            { who: "you", hint: "Bir seçenek seç ve gerekçelendir.", expect: "bir seçeneği seçmek ve gerekçelendirmek", seconds: 40 },
            { who: "partner", de: "I see. My worry is that a study room is only useful before exams, and empty for the rest of the year. What do you say to that?", tr: "Anlıyorum. Benim endişem, çalışma odasının yalnız sınavlardan önce işe yaraması, yılın geri kalanında boş kalması. Buna ne dersin?" },
            { who: "you", hint: "İtiraza doğrudan karşılık ver: kabul et ya da çürüt.", expect: "bir itiraza doğrudan karşılık vermek", seconds: 40 },
            { who: "partner", de: "That is a fair point. So which one do we recommend to the college?", tr: "Haklı bir nokta. Peki okula hangisini öneriyoruz?" },
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
              "I would choose the cheap canteen, because everybody eats and not everybody studies here. That is true about the study room, but I think an empty room is still better than no room. All right, let us recommend the canteen, and suggest the study room for next year.",
            criteria: [
              "Görüş gerekçelendirildi mi?",
              "İtiraza doğrudan mı karşılık verildi, yoksa konu mu değiştirildi?",
              "Karşı tarafın sözlerine gönderme yapıldı mı? (That is true … / I see your point …)",
              "Sonunda ortak bir karar çıktı mı?",
            ],
          },
        },
        {
          id: "en-b1-01-s4",
          no: 4,
          format: "speaking",
          goal: "interaction",
          prompt: "We talk a little more about the same topic: student life and money.",
          promptTr: "Aynı konu üzerine biraz daha konuşuyoruz: öğrenci hayatı ve para.",
          prepSeconds: 15,
          exchange: [
            { who: "partner", de: "Do you think students should work while they study?", tr: "Sence öğrenciler okurken çalışmalı mı?" },
            { who: "you", hint: "Görüşünü söyle ve bir gerekçe ver.", expect: "genel bir soruya gerekçeli bir görüşle cevap vermek", seconds: 40 },
            { who: "partner", de: "Some people say a part-time job teaches more than a course. Would you agree?", tr: "Bazıları yarı zamanlı bir işin bir dersten daha çok şey öğrettiğini söylüyor. Katılır mısın?" },
            { who: "you", hint: "Kısmen katıl ya da karşı çık; iki yanı da anmaya çalış.", expect: "bir iddiaya kısmen katılmak ya da karşı çıkmak, iki yanı da anmak", seconds: 45 },
          ],
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "give an opinion on a general question", tr: "Genel bir soruya görüş bildirmek" },
              { de: "agree or disagree in a nuanced way", tr: "Katılırken ya da karşı çıkarken ince ayrım yapmak" },
            ],
            sample:
              "I think a few hours a week are good, but not more. A job gives you a reason to organise your time. However, I have seen people work thirty hours and fail their exams, so it depends on the number of hours. I would partly agree with that idea: a job teaches you about people, but it does not teach you the subject.",
            criteria: [
              "Görüş açıkça bildirildi mi?",
              "Kısmi katılım ifadeleri kullanıldı mı? (I partly agree, it depends on …)",
              "Bir karşı örnek ya da sınır getirildi mi?",
              "Cevaplar geliştirildi mi, tek cümlede mi kaldı?",
            ],
          },
        },
      ],
    },
  ],
};
