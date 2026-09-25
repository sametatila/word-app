import type { ModuleExamPlan } from "../types";

/**
 * İNGİLİZCE kursun B1 modül sınavları (10 modül).
 *
 * Alan adları ve `en` alanının gerekçesi kardeş dosyada: `./a1.ts` başlığı.
 *
 * B1'de metin bir DURUŞ taşıyor. A2'de "ne oldu" soruluyordu; burada metnin
 * kendisi bir talep, bir gerekçe ya da bir görüş oluyor ve soru "ne yazıyor"
 * değil "ne demeye getiriyor" diye soruyor: bir okur mektubunun hangi cümlesi
 * sav, hangisi çekince; bir resmî yazının hangi satırı zorunluluk, hangisi
 * bilgi. Kâğıtların dili de bu yüzden ilgi cümlesi, edilgen yapı, dolaylı
 * aktarım ve bağlaç taşıyor — B1'in kendi dilbilgisi.
 *
 * Yazma görevleri 70 kelimeden başlıyor: bir talebin gövdesi (durum, gerekçe,
 * istek, süre) daha azına sığmıyor. B1.5'te bir UYARAN var (gelen resmî yazı),
 * çünkü itiraz dilekçesi ancak neye itiraz edildiği görünürken ölçülebilir.
 */
export const EN_B1_EXAMS: ModuleExamPlan[] = [
  {
    level: "B1",
    index: 0,
    code: "B1.1",
    titleDe: "My career so far",
    titleTr: "İş dünyası",
    focus: [
      { de: "Present perfect vs past simple", tr: "süregelen deneyim ile bitmiş iş" },
      { de: "Past perfect", tr: "daha önce olan: had finished" },
      { de: "Reported speech", tr: "söyleneni aktarmak" },
      { de: "Relative clauses", tr: "kişiyi ve işi tanımlamak" },
      { de: "although / however / despite", tr: "çekince bildirmek" },
    ],
    canDo: [
      { de: "I can describe my career and my experience.", tr: "Kariyerimi ve deneyimimi anlatabiliyorum.", en: "I can describe my career and my experience." },
      { de: "I can write a cover letter and mention my strengths.", tr: "Niyet mektubu yazıp güçlü yanlarımı söyleyebiliyorum.", en: "I can write a cover letter and mention my strengths." },
      { de: "I can answer the usual questions in an interview.", tr: "Mülakatta sıradan soruları cevaplayabiliyorum.", en: "I can answer the usual questions in an interview." },
      { de: "I can report what my manager said in an appraisal.", tr: "Değerlendirmede şefimin söylediklerini aktarabiliyorum.", en: "I can report what my manager said in an appraisal." },
      { de: "I can resign politely and hand over my work.", tr: "Nazikçe istifa edip işimi devredebiliyorum.", en: "I can resign politely and hand over my work." },
    ],
    listening: {
      title: "The appraisal",
      titleTr: "Değerlendirme görüşmesi",
      situation: "Bir çalışan ile şefi yıllık değerlendirme görüşmesi yapıyor.",
      turns: [
        { speaker: "Manager", de: "Let's review the year. How long have you been in this department?", tr: "Yılı gözden geçirelim. Bu birimde ne zamandan beri çalışıyorsunuz?" },
        { speaker: "Selin", de: "For three years. I had finished my training before I joined the team.", tr: "Üç yıldır. Ekibe katılmadan önce eğitimimi bitirmiştim." },
        { speaker: "Manager", de: "Your progress is good. The client who called last week praised your report.", tr: "İlerlemeniz iyi. Geçen hafta arayan müşteri raporunuzu övdü." },
        { speaker: "Selin", de: "Thank you. Although the deadline was short, the team was supportive.", tr: "Teşekkürler. Teslim tarihi kısaydı ama ekip destekleyiciydi." },
        { speaker: "Manager", de: "I have one piece of criticism. Two reports were submitted late in March.", tr: "Bir eleştirim var. Mart ayında iki rapor geç teslim edildi." },
        { speaker: "Selin", de: "That is fair, and I accept it. I have already changed how I plan my week.", tr: "Bu haklı bir eleştiri, kabul ediyorum. Haftamı planlama şeklimi şimdiden değiştirdim." },
        { speaker: "Manager", de: "Good. The director asked if you were interested in the new target.", tr: "Güzel. Müdür, yeni hedefle ilgilenip ilgilenmediğinizi sordu." },
        { speaker: "Selin", de: "I am. Could we discuss the bonus as well?", tr: "İlgileniyorum. İkramiyeyi de konuşabilir miyiz?" },
      ],
      questions: [
        { de: "How long has Selin worked in this department?", tr: "Selin bu birimde ne zamandan beri çalışıyor?", options: ["For one year", "For three years", "Since March", "Since the training"], answer: 1 },
        { de: "What did Selin do before she joined the team?", tr: "Selin ekibe katılmadan önce ne yapmıştı?", options: ["She had finished her training", "She had worked for the client", "She had written two reports", "She had left another company"], answer: 0 },
        { de: "What is the manager's criticism?", tr: "Şefin eleştirisi ne?", options: ["Two reports were late", "The client was not called", "The target was too low", "The team was not supportive"], answer: 0 },
      ],
    },
    reading: {
      title: "About your application",
      titleTr: "İnsan kaynaklarından gelen yazı",
      genre: "Resmî e-posta",
      text: "Your documents — next steps\n\nDear Ms. Kaya,\n\nThank you for applying for the position of project assistant. Your documents were received on 3 March and your references have already been checked.\n\nWe would like to invite you to an interview on Tuesday, 18 March, at ten o'clock. The interview is held in our office on the third floor and takes about an hour. Please bring the original of your degree; a copy is not enough.\n\nAlthough the position starts in May, the contract must be signed before the end of April.\n\nBest regards,\nR. Vogt, Human Resources",
      questions: [
        { de: "What must Ms. Kaya bring to the interview?", tr: "Bayan Kaya mülakata ne getirmeli?", options: ["A copy of her degree", "The original of her degree", "Two references", "A new application"], answer: 1 },
        { de: "When must the contract be signed?", tr: "Sözleşme ne zamana kadar imzalanmalı?", options: ["Before the end of April", "On 18 March", "In May", "On 3 March"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Mülakatta deneyimini anlatıyorsun.", de: "I have worked in this industry for six years, although I started in a small team.", tr: "Altı yıldır bu sektörde çalışıyorum, ama küçük bir ekipte başladım." },
      { situation: "Şefinle ikramiyeyi konuşuyorsun.", de: "Could we discuss the bonus, although the target was raised?", tr: "Hedef yükseltilmiş olsa da ikramiyeyi konuşabilir miyiz?" },
    ],
    writing: {
      prompt: "Bir iş ilanı için niyet mektubu yaz.",
      checklist: [
        "Hangi iş için yazdığını ve nereden gördüğünü yaz",
        "Deneyimini „have worked“ ile, bitmiş bir işi geçmiş zamanla yaz",
        "Güçlü bir yanını ve bir çekinceyi „although“ ile bağla",
        "Ne zaman başlayabileceğini ve ekini yaz",
      ],
      minWords: 70,
      phrases: [
        { de: "I am writing to apply for …", tr: "… için başvurmak üzere yazıyorum", en: "I am writing to apply for …" },
        { de: "I have worked in this industry for … years.", tr: "… yıldır bu sektörde çalışıyorum", en: "I have worked in this industry for … years." },
        { de: "My previous employer gave me a reference.", tr: "Önceki işverenim bana referans verdi", en: "My previous employer gave me a reference." },
        { de: "Although …, I am confident that …", tr: "… olsa da, …-den eminim", en: "Although …, I am confident that …" },
        { de: "I enclose my documents and look forward to your reply.", tr: "Belgelerimi ekliyorum, cevabınızı bekliyorum", en: "I enclose my documents and look forward to your reply." },
      ],
      sample:
        "Dear Ms. Vogt,\n\nI am writing to apply for the position of project assistant, which I saw on your website last week.\n\nI have worked in this industry for six years. Before I came to my present job, I had finished a training course in project work, and my previous employer gave me a strong reference. My greatest strength is teamwork: the report that my team submitted in March was praised by the client.\n\nAlthough I have never worked abroad, I am confident that I can learn quickly. I have to give one month's notice, so I could start in May.\n\nI enclose my documents and look forward to your reply.\n\nBest regards,\nS. Kaya",
    },
  },

  {
    level: "B1",
    index: 1,
    code: "B1.2",
    titleDe: "Renting and moving",
    titleTr: "Ev ve kira dünyası",
    focus: [
      { de: "Passive voice", tr: "„depozito ödenir“ — faili söylemeden" },
      { de: "Relative clauses", tr: "hangi daire, hangi kişi" },
      { de: "Reported speech", tr: "ev sahibi ne dedi" },
      { de: "Second conditional", tr: "„daha az kullansak, fatura düşerdi“" },
      { de: "Past perfect", tr: "teslimden önce ne yapılmıştı" },
    ],
    canDo: [
      { de: "I can ask about a flat, the rent and the deposit.", tr: "Daireyi, kirayı ve depozitoyu sorabiliyorum.", en: "I can ask about a flat, the rent and the deposit." },
      { de: "I can understand the main clauses of a lease.", tr: "Kira sözleşmesinin ana maddelerini anlayabiliyorum.", en: "I can understand the main clauses of a lease." },
      { de: "I can report a leak and ask for a plumber.", tr: "Su sızıntısını bildirip tamirci isteyebiliyorum.", en: "I can report a leak and ask for a plumber." },
      { de: "I can agree on the chores with my flatmates.", tr: "Ev arkadaşlarımla ev işlerini paylaşabiliyorum.", en: "I can agree on the chores with my flatmates." },
      { de: "I can ask for my deposit back after the inspection.", tr: "Çıkış kontrolünden sonra depozitomu isteyebiliyorum.", en: "I can ask for my deposit back after the inspection." },
    ],
    listening: {
      title: "The viewing",
      titleTr: "Daire gezmek",
      situation: "Bir kiracı adayı emlak görevlisiyle daireyi geziyor.",
      turns: [
        { speaker: "Agent", de: "This is the flat that I mentioned on the phone. It has been empty since April.", tr: "Telefonda söylediğim daire bu. Nisandan beri boş." },
        { speaker: "Resident", de: "It is brighter than the last one I saw. Is the kitchen furnished?", tr: "Gördüğüm son daireden daha aydınlık. Mutfak eşyalı mı?" },
        { speaker: "Agent", de: "Yes, and the storage in the basement is included in the rent.", tr: "Evet, bodrumdaki depo da kiraya dâhil." },
        { speaker: "Resident", de: "How much is the deposit, and when is it paid?", tr: "Depozito ne kadar ve ne zaman ödeniyor?" },
        { speaker: "Agent", de: "Two months' rent. The deposit is paid before you move in, and the lease is signed here.", tr: "İki aylık kira. Depozito taşınmadan önce ödeniyor, sözleşme de burada imzalanıyor." },
        { speaker: "Resident", de: "The landlord said that the boiler would be checked. Has that been done?", tr: "Ev sahibi kombinin kontrol edileceğini söylemişti. Yapıldı mı?" },
        { speaker: "Agent", de: "The plumber had repaired it before the last tenant left.", tr: "Tamirci, önceki kiracı çıkmadan önce onarmıştı." },
        { speaker: "Resident", de: "If the heating were newer, the bills would be lower. Could we discuss the rent again?", tr: "Kalorifer daha yeni olsaydı faturalar daha düşük olurdu. Kirayı yeniden konuşabilir miyiz?" },
      ],
      questions: [
        { de: "How long has the flat been empty?", tr: "Daire ne zamandan beri boş?", options: ["Since April", "For two months", "Since the plumber came", "For a year"], answer: 0 },
        { de: "When is the deposit paid?", tr: "Depozito ne zaman ödeniyor?", options: ["Before the tenant moves in", "After the inspection", "With the first bill", "When the lease is renewed"], answer: 0 },
        { de: "What had the plumber done before the last tenant left?", tr: "Tamirci önceki kiracı çıkmadan önce ne yapmıştı?", options: ["He had repaired the boiler", "He had painted the corridor", "He had changed the heating", "He had signed the lease"], answer: 0 },
      ],
    },
    reading: {
      title: "Your lease — the main clauses",
      titleTr: "Kira sözleşmesinden maddeler",
      genre: "Resmî mektup",
      text: "YOUR LEASE — THE MAIN CLAUSES\n\nDear tenant,\n\nPlease read these clauses before the lease is signed.\n\n1. The deposit (two months' rent) is paid before you move in. It is returned in full after the inspection, unless there is damage.\n2. The rent must be paid by the third day of the month.\n3. Small repairs are organized by the tenant. A plumber for a leak or the boiler is arranged by the landlord.\n4. The lease is renewed every year. If you want to move out, you have to write to us two months in advance.\n\nAlthough the storage in the basement is included, a parking space is not. Please keep the noise low after ten.\n\nYours sincerely,\nThe agency",
      questions: [
        { de: "Who arranges a plumber for the boiler?", tr: "Kombi için tamirciyi kim ayarlıyor?", options: ["The tenant", "The landlord", "The agency", "Nobody"], answer: 1 },
        { de: "What does the tenant have to do before moving out?", tr: "Kiracı çıkmadan önce ne yapmalı?", options: ["Write two months in advance", "Pay a third month's rent", "Repair the boiler", "Renew the lease"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Daire gezerken soru soruyorsun.", de: "Is the flat still available, and when is the deposit paid?", tr: "Daire hâlâ müsait mi ve depozito ne zaman ödeniyor?" },
      { situation: "Ev sahibine arıza bildiriyorsun.", de: "There is a leak in the bathroom, so could you send a plumber this week?", tr: "Banyoda su sızıntısı var, bu hafta bir tamirci gönderebilir misiniz?" },
    ],
    writing: {
      prompt: "Ev sahibine bir arızayı bildiren ve süre tanıyan resmî bir mektup yaz.",
      checklist: [
        "Hangi daire ve hangi arıza olduğunu yaz",
        "Ne zamandan beri sürdüğünü ve daha önce ne yapıldığını yaz",
        "Edilgen yapıyla bir cümle kur („the boiler was repaired …“)",
        "Bir süre tanı ve nazikçe kapat",
      ],
      minWords: 70,
      phrases: [
        { de: "I am writing about the flat on the second floor.", tr: "İkinci kattaki daire hakkında yazıyorum", en: "I am writing about the flat on the second floor." },
        { de: "The boiler has not worked since …", tr: "Kombi …-den beri çalışmıyor", en: "The boiler has not worked since …" },
        { de: "The leak was repaired last year.", tr: "Sızıntı geçen yıl onarıldı", en: "The leak was repaired last year." },
        { de: "Could you arrange a plumber before …?", tr: "…-den önce tamirci ayarlayabilir misiniz?", en: "Could you arrange a plumber before …?" },
        { de: "I look forward to your reply.", tr: "Cevabınızı bekliyorum", en: "I look forward to your reply." },
      ],
      sample:
        "Dear Mr. Vogt,\n\nI am writing about the flat on the second floor, which I have rented since last May.\n\nThe boiler has not worked since Monday and there is damp in the corridor again. The same leak was repaired last year, but the plumber who came then said that the pipe would have to be changed. By the time I called your office on Tuesday, the water had already damaged the wall.\n\nCould you arrange a plumber before Friday, please? If the damage grew, the repair would cost much more. Although I understand that you are busy, the situation is urgent.\n\nI look forward to your reply.\n\nBest regards,\nA. Demir",
    },
  },

  {
    level: "B1",
    index: 2,
    code: "B1.3",
    titleDe: "Linking ideas",
    titleTr: "Cümleleri bağlamak",
    focus: [
      { de: "because / so / since / therefore", tr: "sebep ve sonuç" },
      { de: "in order to / so that", tr: "amaç bildirmek" },
      { de: "unless / as long as / in case", tr: "koşul incelikleri" },
      { de: "Past perfect", tr: "önce olanı sonra anlatmak" },
      { de: "Passive voice in reports", tr: "haber dili: was announced" },
    ],
    canDo: [
      { de: "I can explain a reason and its result.", tr: "Bir sebebi ve sonucunu açıklayabiliyorum.", en: "I can explain a reason and its result." },
      { de: "I can say why I signed up for something.", tr: "Bir şeye neden kaydolduğumu söyleyebiliyorum.", en: "I can say why I signed up for something." },
      { de: "I can set a condition with unless and as long as.", tr: "„unless“ ve „as long as“ ile koşul koyabiliyorum.", en: "I can set a condition with unless and as long as." },
      { de: "I can tell the parts of a story in the right order.", tr: "Bir olayın parçalarını doğru sırada anlatabiliyorum.", en: "I can tell the parts of a story in the right order." },
      { de: "I can understand a short news report.", tr: "Kısa bir haber metnini anlayabiliyorum.", en: "I can understand a short news report." },
    ],
    listening: {
      title: "Why the delivery was late",
      titleTr: "Teslim neden gecikti",
      situation: "İki meslektaş bir gecikmenin sebebini ve sonucunu konuşuyor.",
      turns: [
        { speaker: "Colleague", de: "The client called again. Why was the delivery late?", tr: "Müşteri yine aradı. Teslim neden gecikti?" },
        { speaker: "Deniz", de: "The train stopped for two hours, so the driver could not keep to the timetable.", tr: "Tren iki saat durdu, bu yüzden sürücü tarifeye uyamadı." },
        { speaker: "Colleague", de: "Had you told the client before they phoned us?", tr: "Onlar bizi aramadan önce müşteriye haber vermiş miydin?" },
        { speaker: "Deniz", de: "By the time I called, they had already noticed the problem. I explained the reason.", tr: "Ben aradığımda sorunu çoktan görmüşlerdi. Sebebini anlattım." },
        { speaker: "Colleague", de: "Since this is the second delay, a new rule was announced by the manager.", tr: "Bu ikinci gecikme olduğu için şef yeni bir kural duyurdu." },
        { speaker: "Deniz", de: "I read the summary. We take a copy of the timetable in case the train stops.", tr: "Özeti okudum. Tren durur diye tarifenin bir kopyasını alıyoruz." },
        { speaker: "Colleague", de: "And we will not promise a morning delivery unless the journey is short.", tr: "Ayrıca yolculuk kısa olmadıkça sabah teslimi sözü vermeyeceğiz." },
        { speaker: "Deniz", de: "That is fair. I will write to the client in order to explain the new rule.", tr: "Bu adil. Yeni kuralı anlatmak için müşteriye yazacağım." },
      ],
      questions: [
        { de: "Why was the delivery late?", tr: "Teslim neden gecikti?", options: ["The train stopped for two hours", "The driver was ill", "The client changed the day", "The order was wrong"], answer: 0 },
        { de: "What had the client done by the time Deniz called?", tr: "Deniz aradığında müşteri ne yapmıştı?", options: ["They had noticed the problem", "They had canceled the order", "They had paid the bill", "They had written a letter"], answer: 0 },
        { de: "When will they promise a morning delivery?", tr: "Sabah teslimi sözünü hangi durumda verecekler?", options: ["Only if the journey is short", "Only if the client pays more", "If the train stops again", "As long as the driver agrees"], answer: 0 },
      ],
    },
    reading: {
      title: "Why I signed up — and what I would change",
      titleTr: "Forum yazısı",
      genre: "Forum yazısı",
      text: "Why I signed up — and what I would change\n\nI enrolled in the evening course in order to practice my English, because my aim was a certificate for work. Since the course is near my office, I can walk there in ten minutes.\n\nThe first months were hard. I had never written a formal letter before, so the first task was difficult. By the time I understood the point, the course had almost finished. Luckily, I was given a summary of every meeting.\n\nThe result? I passed, and my manager mentioned it in my appraisal. I would sign up again as long as the evening group stays small. Unless the group is small, nobody practices enough.",
      questions: [
        { de: "Why did the writer enroll in the course?", tr: "Yazar kursa neden kaydoldu?", options: ["In order to practice English for work", "Because the course was free", "Because a friend asked", "In order to change jobs"], answer: 0 },
        { de: "What would make the writer sign up again?", tr: "Yazarı yeniden kaydolmaya ne ikna eder?", options: ["A small evening group", "A cheaper price", "A different tutor", "A shorter term"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Bir gecikmenin sebebini ve sonucunu anlatıyorsun.", de: "The train stopped, so I arrived late, and therefore we postponed the meeting.", tr: "Tren durdu, bu yüzden geç kaldım ve toplantıyı erteledik." },
      { situation: "Bir koşul koyuyorsun.", de: "I will accept the date as long as the agenda is sent earlier.", tr: "Gündem daha önce gönderilirse tarihi kabul ederim." },
    ],
    writing: {
      prompt: "Bir foruma cevap yaz: yaşadığın bir aksiliği sebebiyle ve sonucuyla anlat.",
      checklist: [
        "Ne olduğunu ve neden olduğunu yaz („because“, „since“)",
        "Sonucunu yaz („so“, „therefore“)",
        "Daha önce ne olmuştu — bir „past perfect“ cümlesi kur",
        "Bir koşulla kapat („unless“, „as long as“)",
      ],
      minWords: 70,
      phrases: [
        { de: "It happened because …", tr: "… olduğu için oldu", en: "It happened because …" },
        { de: "Since …, I decided to …", tr: "… olduğundan … yapmaya karar verdim", en: "Since …, I decided to …" },
        { de: "By the time I arrived, … had …", tr: "Ben vardığımda … olmuştu", en: "By the time I arrived, … had …" },
        { de: "Therefore, …", tr: "Bu yüzden …", en: "Therefore, …" },
        { de: "I will try again as long as …", tr: "… olduğu sürece yine denerim", en: "I will try again as long as …" },
      ],
      sample:
        "I read your post and the same thing happened to me last month.\n\nMy course started at seven, but I arrived at half past seven because the bus had stopped. Since nobody had told us, the whole group waited in the rain. By the time I got to the room, the teacher had already explained the task, so I understood nothing in the first hour.\n\nI wrote to the office in order to explain the problem. Therefore they now send a message when a course is moved. I will keep going to the evening group as long as the messages arrive on time — unless they stop, of course.",
    },
  },

  {
    level: "B1",
    index: 3,
    code: "B1.4",
    titleDe: "Describing and deciding",
    titleTr: "Tarif etmek ve karar vermek",
    focus: [
      { de: "who / which / that / whose", tr: "kişiyi ve şeyi tanımlamak" },
      { de: "the place where …", tr: "yeri tanımlamak" },
      { de: "whereas / although", tr: "karşılaştırma ve karşıtlık" },
      { de: "Passive voice", tr: "„nasıl çalışıyor“ dili" },
      { de: "Reported speech", tr: "ne söylendiğini aktarmak" },
    ],
    canDo: [
      { de: "I can describe a person so that others recognize them.", tr: "Birini başkası tanıyacak kadar tarif edebiliyorum.", en: "I can describe a person so that others recognize them." },
      { de: "I can describe the place where I grew up.", tr: "Büyüdüğüm yeri tarif edebiliyorum.", en: "I can describe the place where I grew up." },
      { de: "I can recommend a film or a book and say why.", tr: "Bir filmi ya da kitabı gerekçesiyle önerebiliyorum.", en: "I can recommend a film or a book and say why." },
      { de: "I can compare two options and choose one.", tr: "İki seçeneği karşılaştırıp birini seçebiliyorum.", en: "I can compare two options and choose one." },
      { de: "I can complain about a faulty order and ask for a replacement.", tr: "Bozuk bir siparişi şikâyet edip değişim isteyebiliyorum.", en: "I can complain about a faulty order and ask for a replacement." },
    ],
    listening: {
      title: "The wrong box",
      titleTr: "Yanlış kutu",
      situation: "Bir müşteri yanlış gelen siparişi telefonla bildiriyor.",
      turns: [
        { speaker: "Customer", de: "I am calling about the order which arrived on Tuesday. They had sent the wrong box, not mine.", tr: "Salı gelen sipariş için arıyorum. Benimkini değil, yanlış kutuyu göndermişler." },
        { speaker: "Assistant", de: "Could you describe the device that you received?", tr: "Aldığınız cihazı tarif edebilir misiniz?" },
        { speaker: "Customer", de: "It is the small one with two buttons, whereas I ordered the one with a screen.", tr: "İki düğmeli küçük olan, oysa ben ekranlı olanı sipariş ettim." },
        { speaker: "Assistant", de: "I see the mistake. The labels were swapped by the night team.", tr: "Hatayı görüyorum. Etiketler gece ekibi tarafından karıştırılmış." },
        { speaker: "Customer", de: "Your colleague said that a replacement would be sent, but nothing came.", tr: "Meslektaşınız değişim gönderileceğini söyledi ama gelmedi." },
        { speaker: "Assistant", de: "By the time she told you, the delivery had already left. Do you have the receipt?", tr: "Size söylediğinde teslim aracı çoktan çıkmıştı. Fişiniz var mı?" },
        { speaker: "Customer", de: "Although the price is the same, the small device is no use to me.", tr: "Fiyat aynı olsa da küçük cihaz bana yaramaz." },
        { speaker: "Assistant", de: "The correct one is sent today and the faulty box is collected on Friday.", tr: "Doğrusu bugün gönderiliyor, hatalı kutu cuma alınıyor." },
      ],
      questions: [
        { de: "Which device did the customer order?", tr: "Müşteri hangi cihazı sipariş etti?", options: ["The one with a screen", "The small one with two buttons", "The one with a plug", "Two devices"], answer: 0 },
        { de: "Why was the wrong box sent?", tr: "Yanlış kutu neden gönderildi?", options: ["The labels were swapped", "The customer wrote the wrong number", "The price had changed", "The delivery was late"], answer: 0 },
        { de: "What happens on Friday?", tr: "Cuma ne oluyor?", options: ["The faulty box is collected", "The new device arrives", "The receipt is checked", "The shop calls again"], answer: 0 },
      ],
    },
    reading: {
      title: "For sale: the desk that everyone asks about",
      titleTr: "İkinci el satış ilanı",
      genre: "İlan",
      text: "FOR SALE — the desk that everyone asks about\n\nI am selling the desk which I bought two years ago. It is the one with three drawers, whereas the newer desks have only two.\n\nCondition: very good. The top was repaired last year, so there is one light spot on the left. Everything else works: the drawers open well and the lamp that you see in the photo is included.\n\nThe flat where I live is on the third floor and there is no lift, so please bring someone who can carry it.\n\nPrice: $80. Although I prefer cash, a transfer is also possible.",
      questions: [
        { de: "What is different about the newer version?", tr: "Yeni modelin farkı ne?", options: ["It has only two drawers", "It has a bigger top", "It has a lamp", "It was repaired"], answer: 0 },
        { de: "Why should the buyer bring someone?", tr: "Alıcı neden birini getirmeli?", options: ["There is no lift", "The desk is faulty", "The seller is away", "The drawers are heavy to open"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Birini tarif ediyorsun.", de: "He is the man who wears glasses and whose desk is next to the window.", tr: "Gözlüklü olan, masası pencerenin yanında duran adam." },
      { situation: "İki seçeneği karşılaştırıyorsun.", de: "This one is cheaper, whereas that one has better quality.", tr: "Bu daha ucuz, oysa şunun kalitesi daha iyi." },
    ],
    writing: {
      prompt: "Tavsiye ettiğin bir yeri ya da bir şeyi tarif eden bir metin yaz.",
      checklist: [
        "İlgi cümlesiyle tanımla („the place where …“, „the one which …“)",
        "İki seçeneği karşılaştır („whereas“)",
        "Bir edilgen cümle kur („it was built …“)",
        "Neden tavsiye ettiğini yaz",
      ],
      minWords: 70,
      phrases: [
        { de: "This is the place where …", tr: "Burası …-dığım yer", en: "This is the place where …" },
        { de: "It is the one which …", tr: "… olan o", en: "It is the one which …" },
        { de: "…, whereas the other one …", tr: "…, oysa öteki …", en: "…, whereas the other one …" },
        { de: "It was built in …", tr: "…-de inşa edildi", en: "It was built in …" },
        { de: "It is worth visiting, because …", tr: "… olduğu için gezmeye değer", en: "It is worth visiting, because …" },
      ],
      sample:
        "I recommend the small museum which stands next to the river in my town.\n\nThis is the place where I went every Saturday as a child. The building was built in 1890 and it was repaired two years ago, so the rooms are bright again. The woman who works at the desk knows every picture in the house and she told me that the old photographs had been found in the basement.\n\nThe big museum in the city is more exciting, whereas this one is quiet and free. It is worth visiting on a cold afternoon, because you can see everything in an hour and nobody asks you to hurry.",
    },
  },

  {
    level: "B1",
    index: 4,
    code: "B1.5",
    titleDe: "Offices and applications",
    titleTr: "Bürokrasi",
    focus: [
      { de: "Passive voice", tr: "„başvuru işleme alınır“" },
      { de: "must / don't have to", tr: "zorunlu olan ve olmayan" },
      { de: "Reported speech", tr: "memur ne dedi" },
      { de: "First and second conditional", tr: "koşul ve varsayım" },
      { de: "Formal letter phrases", tr: "resmî yazışma kalıpları" },
    ],
    canDo: [
      { de: "I can register and follow an application.", tr: "Kayıt yapıp başvurumu takip edebiliyorum.", en: "I can register and follow an application." },
      { de: "I can fill in a form and understand every section.", tr: "Formu doldurup her bölümü anlayabiliyorum.", en: "I can fill in a form and understand every section." },
      { de: "I can understand what a policy covers.", tr: "Bir sigortanın neyi kapsadığını anlayabiliyorum.", en: "I can understand what a policy covers." },
      { de: "I can write a formal letter with a request.", tr: "Talep içeren resmî bir mektup yazabiliyorum.", en: "I can write a formal letter with a request." },
      { de: "I can appeal against a decision and give evidence.", tr: "Bir karara kanıtla itiraz edebiliyorum.", en: "I can appeal against a decision and give evidence." },
    ],
    listening: {
      title: "At the counter",
      titleTr: "Gişede",
      situation: "Bir başvuru sahibi eksik belge yüzünden gişede bilgi alıyor.",
      turns: [
        { speaker: "Visitor", de: "Good morning. I received a letter which says a document is missing.", tr: "Günaydın. Bir belgenin eksik olduğunu yazan bir yazı aldım." },
        { speaker: "Officer", de: "Let me check. Your application was processed on 14 April, but the proof of address is missing.", tr: "Bakayım. Başvurunuz 14 Nisan'da işleme alındı ama adres belgesi eksik." },
        { speaker: "Visitor", de: "I had sent a copy before the deadline. Isn't a copy enough?", tr: "Süre bitmeden bir kopya göndermiştim. Kopya yeterli değil mi?" },
        { speaker: "Officer", de: "No. The original must be shown here; a copy is not accepted.", tr: "Değil. Aslı burada gösterilmeli; kopya kabul edilmiyor." },
        { speaker: "Visitor", de: "Your colleague told me that the form would be enough, so I waited.", tr: "Meslektaşınız formun yeterli olacağını söylemişti, ben de bekledim." },
        { speaker: "Officer", de: "I am sorry. If you bring the original tomorrow, the card will be issued next week.", tr: "Üzgünüm. Aslını yarın getirirseniz kart haftaya çıkar." },
        { speaker: "Visitor", de: "And if the application were rejected, could I appeal?", tr: "Peki başvuru reddedilirse itiraz edebilir miyim?" },
        { speaker: "Officer", de: "You have the right to appeal within four weeks, and no fee is charged.", tr: "Dört hafta içinde itiraz hakkınız var ve ücret alınmıyor." },
      ],
      questions: [
        { de: "Which document is missing?", tr: "Hangi belge eksik?", options: ["The proof of address", "The passport", "The signature", "The application form"], answer: 0 },
        { de: "What must the applicant bring tomorrow?", tr: "Başvuru sahibi yarın ne getirmeli?", options: ["The original document", "Another copy", "A new form", "A fee"], answer: 0 },
        { de: "How long can the applicant appeal?", tr: "Başvuru sahibi ne kadar süre içinde itiraz edebilir?", options: ["Within four weeks", "Within one week", "Until the card is issued", "Only on the fourteenth"], answer: 0 },
      ],
    },
    reading: {
      title: "Decision about your application",
      titleTr: "Resmî bildirim",
      genre: "Resmî yazı",
      text: "DECISION ABOUT YOUR APPLICATION\n\nReference 2026/4471\n\nDear Mr. Demir,\n\nYour application for a resident's card was received on 14 April and has been processed by this office.\n\nUnfortunately, the application is rejected, because the proof of address was not submitted in the original. A copy is not accepted for this section.\n\nIf the original is submitted within four weeks, the decision is reviewed and no fee is charged. You don't have to fill in a new form; the documents that were sent in April are kept in your folder.\n\nYou also have the right to appeal. An appeal must be written and signed.\n\nYours sincerely,\nThe council office",
      questions: [
        { de: "Why was the application rejected?", tr: "Başvuru neden reddedildi?", options: ["The proof of address was only a copy", "The form was not signed", "The fee was not paid", "The letter arrived late"], answer: 0 },
        { de: "What does the letter say about the form?", tr: "Yazı form hakkında ne diyor?", options: ["A new form is not necessary", "A new form must be filled in", "The form was not received", "The form must be signed again"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Gişede eksik belgeyi soruyorsun.", de: "Could you tell me which document is still missing from my folder?", tr: "Dosyamda hangi belgenin eksik olduğunu söyler misiniz?" },
      { situation: "Bir karara itiraz ediyorsun.", de: "I would like to appeal against the decision, because I have the evidence here.", tr: "Karara itiraz etmek istiyorum, çünkü kanıt elimde." },
    ],
    writing: {
      prompt: "Reddedilen başvurun için bir itiraz dilekçesi yaz.",
      stimulus: "Unfortunately, the application is rejected, because the proof of address was not submitted in the original.",
      checklist: [
        "Hangi başvuru ve hangi karar olduğunu, dosya numarasıyla yaz",
        "Ne gönderdiğini ve ne zaman gönderdiğini yaz",
        "Bir edilgen cümleyle olguyu bildir („the copy was sent on …“)",
        "Talebini ve süreni yaz, resmî bir kapanış kullan",
      ],
      minWords: 80,
      phrases: [
        { de: "I am writing with reference to your letter of …", tr: "… tarihli yazınıza atıfla yazıyorum", en: "I am writing with reference to your letter of …" },
        { de: "The document was submitted on …", tr: "Belge …-de sunuldu", en: "The document was submitted on …" },
        { de: "I was told that a copy would be enough.", tr: "Bana kopyanın yeterli olacağı söylendi", en: "I was told that a copy would be enough." },
        { de: "I would therefore like to appeal against the decision.", tr: "Bu yüzden karara itiraz etmek istiyorum", en: "I would therefore like to appeal against the decision." },
        { de: "I look forward to your response. Yours sincerely,", tr: "Cevabınızı bekliyorum. Saygılarımla,", en: "I look forward to your response. Yours sincerely," },
      ],
      sample:
        "Dear Sir or Madam,\n\nI am writing with reference to your letter of 2 May about application 2026/4471.\n\nThe proof of address was submitted on 14 April together with the form, and a stamped copy was accepted at the counter on that day. When I asked about the original, I was told that a copy would be enough for this section. That is why the original was not sent.\n\nI would therefore like to appeal against the decision. The original is enclosed with this letter, and the evidence from April is kept in my folder. If the document is now accepted, the card could be issued this month.\n\nI look forward to your response.\n\nYours sincerely,\nA. Demir",
    },
  },

  {
    level: "B1",
    index: 5,
    code: "B1.6",
    titleDe: "Learning and progress",
    titleTr: "Eğitim ve gelişim",
    focus: [
      { de: "Future forms", tr: "plan, niyet ve karar" },
      { de: "Gerund or infinitive", tr: "enjoy -ing / decide to" },
      { de: "Present perfect vs past simple", tr: "ne kadar yol aldım" },
      { de: "Reported speech", tr: "öğretmen ne dedi" },
      { de: "although / however / despite", tr: "ilerlemeye çekince koymak" },
    ],
    canDo: [
      { de: "I can make a study plan and keep to it.", tr: "Çalışma planı yapıp uygulayabiliyorum.", en: "I can make a study plan and keep to it." },
      { de: "I can say how I learn best.", tr: "En iyi nasıl öğrendiğimi anlatabiliyorum.", en: "I can say how I learn best." },
      { de: "I can describe my progress and the gaps that are left.", tr: "İlerlememi ve kalan boşlukları anlatabiliyorum.", en: "I can describe my progress and the gaps that are left." },
      { de: "I can report the feedback that my tutor gave me.", tr: "Öğretmenimin geri bildirimini aktarabiliyorum.", en: "I can report the feedback that my tutor gave me." },
      { de: "I can organize a task with a partner in a group.", tr: "Grup çalışmasında bir görevi paylaşabiliyorum.", en: "I can organize a task with a partner in a group." },
    ],
    listening: {
      title: "What the tutor said",
      titleTr: "Öğretmen ne dedi",
      situation: "Bir kursiyer öğretmeniyle geri bildirim görüşmesi yapıyor.",
      turns: [
        { speaker: "Tutor", de: "How long have you studied English here?", tr: "Burada ne zamandan beri İngilizce çalışıyorsun?" },
        { speaker: "Student", de: "For eight months. I started at a lower level and my vocabulary has grown a lot.", tr: "Sekiz aydır. Daha alt bir düzeyde başladım ve kelime dağarcığım çok gelişti." },
        { speaker: "Tutor", de: "However, the same grammar mistake is repeated in every task.", tr: "Ancak her görevde aynı dilbilgisi hatası tekrarlanıyor." },
        { speaker: "Student", de: "I had learned that pattern wrong at the start, so it is a careless habit now.", tr: "O kalıbı başta yanlış öğrenmiştim, artık dikkatsiz bir alışkanlık." },
        { speaker: "Tutor", de: "Then I advise checking the last paragraph twice before you submit it.", tr: "O hâlde teslim etmeden önce son paragrafı iki kez kontrol etmeni öneririm." },
        { speaker: "Student", de: "I enjoy listening to podcasts, but I forget to write the new words down.", tr: "Podcast dinlemeyi seviyorum ama yeni kelimeleri yazmayı unutuyorum." },
        { speaker: "Tutor", de: "Your speaking teacher told me that your pronunciation had improved. Despite the mistakes, the level is good.", tr: "Konuşma öğretmenin telaffuzunun düzeldiğini söyledi. Hatalara rağmen düzeyin iyi." },
        { speaker: "Student", de: "Then I am going to revise every evening and take the exam in June.", tr: "O hâlde her akşam tekrar yapıp haziranda sınava gireceğim." },
      ],
      questions: [
        { de: "How long has the student studied English there?", tr: "Kursiyer orada ne zamandan beri İngilizce çalışıyor?", options: ["For eight months", "For a year", "Since June", "For two years"], answer: 0 },
        { de: "What does the tutor advise?", tr: "Öğretmen ne öneriyor?", options: ["Checking the last paragraph twice", "Listening to more podcasts", "Taking the exam later", "Changing the level"], answer: 0 },
        { de: "What is the student going to do?", tr: "Kursiyer ne yapacak?", options: ["Revise every evening", "Repeat the module", "Write a new plan with the tutor", "Stop the course"], answer: 0 },
      ],
    },
    reading: {
      title: "Evening course B1 — what to expect",
      titleTr: "Kurs tanıtımı",
      genre: "Kurs tanıtımı",
      text: "EVENING COURSE B1 — WHAT TO EXPECT\n\nThe course has ten modules and every lesson is uploaded on Monday, so you can revise at home. One module takes three weeks.\n\nWho is it for? For students who have finished A2 and who want a confident level. A short test is taken in the first week in order to check the gap.\n\nYou must bring a notebook to every session, but you don't have to buy the book: the chapters are given as a file. Although the group is small, we will divide the tasks, so every partner presents once.\n\nDespite the weekly homework, most students enjoy the course. If you miss a session, the video can be downloaded for two weeks.",
      questions: [
        { de: "Why is a short test taken in the first week?", tr: "İlk hafta neden kısa bir test yapılıyor?", options: ["To check the gap between the levels", "To decide the price", "To choose the tutor", "To divide the group"], answer: 0 },
        { de: "What does a learner not have to do?", tr: "Kursiyerin yapması gerekmeyen şey ne?", options: ["Buy the book", "Bring a notebook", "Present a task", "Take the first test"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "İlerlemeni anlatıyorsun.", de: "My vocabulary has grown a lot, although I still make the same mistake.", tr: "Kelime dağarcığım çok gelişti ama hâlâ aynı hatayı yapıyorum." },
      { situation: "Çalışma planını söylüyorsun.", de: "I am going to revise one chapter every evening before the exam.", tr: "Sınavdan önce her akşam bir bölüm tekrar edeceğim." },
    ],
    writing: {
      prompt: "Bir kursa başvuran ve düzeyini anlatan bir e-posta yaz.",
      checklist: [
        "Hangi kursa yazdığını ve neden istediğini yaz",
        "„have studied“ ile süregelen, geçmiş zamanla bitmiş bir şeyi yaz",
        "Öğretmeninin ne söylediğini aktar",
        "Planını gelecek biçimlerinden biriyle yaz",
      ],
      minWords: 70,
      phrases: [
        { de: "I am writing about the evening course in …", tr: "…-deki akşam kursu hakkında yazıyorum", en: "I am writing about the evening course in …" },
        { de: "I have studied English for … months.", tr: "… aydır İngilizce çalışıyorum", en: "I have studied English for … months." },
        { de: "My tutor said that my … had improved.", tr: "Öğretmenim …-min düzeldiğini söyledi", en: "My tutor said that my … had improved." },
        { de: "I enjoy …-ing, but I find … difficult.", tr: "… yapmayı seviyorum ama …-i zor buluyorum", en: "I enjoy …-ing, but I find … difficult." },
        { de: "I am going to … before the exam.", tr: "Sınavdan önce … yapacağım", en: "I am going to … before the exam." },
      ],
      sample:
        "Dear Sir or Madam,\n\nI am writing about the evening course in English at your school, because I would like a confident level before the summer.\n\nI have studied English for eight months in a small group and I finished the A2 module in March. My tutor said that my pronunciation had improved, although she advised me to check my grammar twice before I submit a task. I enjoy listening to podcasts, but I find formal writing difficult.\n\nI am going to revise every evening, so the weekly homework is not a problem. Could you tell me when the first test is taken and whether the video can be downloaded?\n\nYours sincerely,\nM. Aydin",
    },
  },

  {
    level: "B1",
    index: 6,
    code: "B1.7",
    titleDe: "Opinion and debate",
    titleTr: "Fikir ve tartışma",
    focus: [
      { de: "In my view / I believe", tr: "görüş bildirmek" },
      { de: "must / can't / might for deduction", tr: "tahmin yürütmek" },
      { de: "Reported speech", tr: "karşı görüşü aktarmak" },
      { de: "Passive voice in the media", tr: "„yayımlandı, paylaşılıyor“" },
      { de: "although / however / on the other hand", tr: "iki tarafı birden tutmak" },
    ],
    canDo: [
      { de: "I can give my opinion and support it with a reason.", tr: "Görüşümü gerekçeyle söyleyebiliyorum.", en: "I can give my opinion and support it with a reason." },
      { de: "I can agree partly and disagree politely.", tr: "Kısmen katılıp nazikçe karşı çıkabiliyorum.", en: "I can agree partly and disagree politely." },
      { de: "I can say what I think about a news story.", tr: "Bir haber hakkında ne düşündüğümü söyleyebiliyorum.", en: "I can say what I think about a news story." },
      { de: "I can say how sure I am with must, might and can't.", tr: "„must, might, can't“ ile ne kadar emin olduğumu söyleyebiliyorum.", en: "I can say how sure I am with must, might and can't." },
      { de: "I can ask where someone read something.", tr: "Birinin bir şeyi nereden okuduğunu sorabiliyorum.", en: "I can ask where someone read something." },
    ],
    listening: {
      title: "Screens at school",
      titleTr: "Okulda ekranlar",
      situation: "Bir tartışma programında iki konuk okulda ekran kullanımını konuşuyor.",
      turns: [
        { speaker: "Presenter", de: "Our question: should tablets replace notebooks at school?", tr: "Sorumuz: okulda tabletler defterlerin yerini almalı mı?" },
        { speaker: "Author", de: "They should, because every student gets the same material.", tr: "Almalı, çünkü her öğrenci aynı malzemeye ulaşıyor." },
        { speaker: "Researcher", de: "I agree partly. However, the survey that was published today shows a different figure.", tr: "Kısmen katılıyorum. Ancak bugün yayımlanan araştırma başka bir sayı gösteriyor." },
        { speaker: "Author", de: "Where did you read that? The magazine article must be about the old research.", tr: "Onu nerede okudunuz? Dergideki yazı eski araştırmayla ilgili olmalı." },
        { speaker: "Researcher", de: "It can't be the old one: the figures were collected in March. The survey's author told me so.", tr: "Eski olamaz: rakamlar martta toplandı. Araştırmanın yazarı bana böyle söyledi." },
        { speaker: "Presenter", de: "So the effect might depend on the age of the students?", tr: "Yani etki öğrencilerin yaşına bağlı olabilir mi?" },
        { speaker: "Researcher", de: "Older students concentrate well, but the youngest group scrolls too much.", tr: "Büyük öğrenciler iyi odaklanıyor ama en küçük grup fazla kaydırıyor." },
        { speaker: "Author", de: "A fair point. On the other hand, nobody would deny that paper is expensive.", tr: "Haklı bir nokta. Öte yandan kâğıdın pahalı olduğunu kimse inkâr etmez." },
      ],
      questions: [
        { de: "What does the expert say about the survey?", tr: "Uzman araştırma hakkında ne diyor?", options: ["The figures were collected in March", "It was never published", "It is the old research", "The author wrote it alone"], answer: 0 },
        { de: "Which group scrolls too much?", tr: "Hangi grup fazla kaydırıyor?", options: ["The youngest students", "The older students", "The teachers", "Every group"], answer: 0 },
        { de: "According to the author, what would nobody deny?", tr: "Yazara göre kimse neyi inkâr etmez?", options: ["Paper is expensive", "Tablets are the only answer", "The survey is wrong", "Students read less at home"], answer: 0 },
      ],
    },
    reading: {
      title: "Not every screen is a problem",
      titleTr: "Okur mektubu",
      genre: "Okur mektubu",
      text: "Not every screen is a problem\n\nI read your article about tablets at school carefully, but I believe the headline was too strong.\n\nIt is true that the youngest students lose their focus quickly; the figures which were published last month show that. However, the same survey says that older students write longer texts.\n\nMy daughter's class was given tablets in September. Although she used to forget her notebook, she has not lost a single file since then. The teacher told the parents that the homework had improved.\n\nIn my view the device is not the question. The question is what the teacher asks the class to do.\n\nR. Demir, by email",
      questions: [
        { de: "What does the writer think about the article?", tr: "Yazar, yazı hakkında ne düşünüyor?", options: ["The headline was too strong", "The figures were wrong", "The report was too long", "The survey was not published"], answer: 0 },
        { de: "What has changed for the writer's daughter?", tr: "Yazarın kızı için ne değişti?", options: ["She has not lost a file since September", "She writes on paper again", "She reads less at home", "She forgets her tablet"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Görüşünü gerekçeyle söylüyorsun.", de: "In my view the rule is fair, because everybody gets the same chance.", tr: "Bence kural adil, çünkü herkes aynı şansı alıyor." },
      { situation: "Kısmen katılıp karşı çıkıyorsun.", de: "I agree partly; however, the figures might depend on the age group.", tr: "Kısmen katılıyorum; ancak rakamlar yaş grubuna bağlı olabilir." },
    ],
    writing: {
      prompt: "Bir gazete yazısına okur mektubu yaz: görüşünü söyle ve karşı görüşe de yer ver.",
      checklist: [
        "Hangi yazıya cevap verdiğini yaz",
        "Görüşünü ve gerekçesini yaz („In my view …, because …“)",
        "Karşı görüşe yer ver („However …“, „On the other hand …“)",
        "Bir tahmin cümlesi kur („might“, „must“, „can't“)",
      ],
      minWords: 80,
      phrases: [
        { de: "I read your article about … carefully.", tr: "… hakkındaki yazınızı dikkatle okudum", en: "I read your article about … carefully." },
        { de: "In my view …, because …", tr: "Bence …, çünkü …", en: "In my view …, because …" },
        { de: "It is true that …; however, …", tr: "… doğru; ancak …", en: "It is true that …; however, …" },
        { de: "The figures were published last month.", tr: "Rakamlar geçen ay yayımlandı", en: "The figures were published last month." },
        { de: "The reason might be …", tr: "Sebebi … olabilir", en: "The reason might be …" },
      ],
      sample:
        "Dear Editor,\n\nI read your article about the new reading hour at school carefully, but in my view the headline was too strong, because the plan has not been tested yet.\n\nIt is true that the first week was difficult; the figures which were published on Monday show that half of the class read nothing. However, the same report says that the older students wrote longer texts, and nobody mentioned this in your piece.\n\nThe reason might be the time: the hour starts at eight, when the youngest group is still tired. It can't be the idea alone, because the same plan worked in another school.\n\nI would therefore ask for a second report in June.\n\nYours sincerely,\nK. Yilmaz",
    },
  },

  {
    level: "B1",
    index: 7,
    code: "B1.8",
    titleDe: "The health system",
    titleTr: "Sağlık sistemi",
    focus: [
      { de: "have to / must not", tr: "kurum kuralları" },
      { de: "Present perfect with since / for", tr: "şikâyetin süresi" },
      { de: "Past perfect", tr: "gelmeden önce ne olmuştu" },
      { de: "Passive voice", tr: "„ilaç yazıldı, tahlil yapıldı“" },
      { de: "moreover / otherwise / besides", tr: "ekleme ve uyarı" },
    ],
    canDo: [
      { de: "I can register at a practice and ask about the papers.", tr: "Aile hekimine kaydolup belgeleri sorabiliyorum.", en: "I can register at a practice and ask about the papers." },
      { de: "I can describe symptoms and say how long I have had them.", tr: "Belirtileri ve ne zamandan beri olduğunu anlatabiliyorum.", en: "I can describe symptoms and say how long I have had them." },
      { de: "I can understand a warning on a medicine pack.", tr: "İlaç kutusundaki uyarıyı anlayabiliyorum.", en: "I can understand a warning on a medicine pack." },
      { de: "I can ask to be referred to a specialist.", tr: "Uzmana sevk isteyebiliyorum.", en: "I can ask to be referred to a specialist." },
      { de: "I can ask for a sick note and explain my absence.", tr: "Rapor isteyip devamsızlığımı açıklayabiliyorum.", en: "I can ask for a sick note and explain my absence." },
    ],
    listening: {
      title: "The results are in",
      titleTr: "Sonuçlar geldi",
      situation: "Bir hasta tahlil sonuçları için doktorla konuşuyor.",
      turns: [
        { speaker: "Doctor", de: "Your blood test was checked. How long have you had the knee pain?", tr: "Kan tahliliniz incelendi. Diz ağrınız ne zamandan beri var?" },
        { speaker: "Patient", de: "Since March. It got worse after the holiday, so I came on Monday.", tr: "Marttan beri. Tatilden sonra kötüleşti, bu yüzden pazartesi geldim." },
        { speaker: "Doctor", de: "The sample shows no infection. However, the x-ray that was taken in April shows a problem in the joint.", tr: "Örnekte enfeksiyon yok. Ancak nisanda çekilen röntgen eklemde bir sorun gösteriyor." },
        { speaker: "Patient", de: "The nurse told me not to worry. Had she seen the result already?", tr: "Hemşire endişelenmememi söyledi. Sonucu görmüş müydü?" },
        { speaker: "Doctor", de: "By then the file had arrived. I will refer you to a specialist.", tr: "O sırada dosya gelmişti. Sizi bir uzmana sevk edeceğim." },
        { speaker: "Patient", de: "Do I have to bring anything to the clinic?", tr: "Kliniğe bir şey getirmem gerekiyor mu?" },
        { speaker: "Doctor", de: "Your ID and this letter. Moreover, take the painkiller twice a day, otherwise the night is hard.", tr: "Kimliğiniz ve bu yazı. Ayrıca ağrı kesiciyi günde iki kez alın, yoksa gece zor geçer." },
        { speaker: "Patient", de: "Besides the letter, could I have a sick note for this week?", tr: "Yazının yanında bu hafta için rapor alabilir miyim?" },
      ],
      questions: [
        { de: "How long has the patient had the pain?", tr: "Hastanın ağrısı ne zamandan beri var?", options: ["Since March", "Since Monday", "For a week", "Since April"], answer: 0 },
        { de: "What does the blood test show?", tr: "Kan tahlili ne gösteriyor?", options: ["No infection", "An allergy", "A virus", "A broken bone"], answer: 0 },
        { de: "What must the patient bring to the clinic?", tr: "Hasta kliniğe ne getirmeli?", options: ["An ID and the letter", "The x-ray and a sample", "A sick note", "Only the painkiller"], answer: 0 },
      ],
    },
    reading: {
      title: "Before your scan — please read",
      titleTr: "Hasta bilgilendirme notu",
      genre: "Bilgi notu",
      text: "BEFORE YOUR SCAN — PLEASE READ\n\nYour appointment was arranged for Thursday at nine o'clock in ward 3.\n\nYou must not eat for six hours before the scan; water is allowed. If you take tablets every morning, the dose is taken as usual — the medicine was prescribed for you and must not be stopped.\n\nPlease arrive twenty minutes earlier, because a short form is filled in at reception. You have to bring your ID and the letter from your doctor; otherwise the scan is postponed.\n\nThe result is sent to the doctor who referred you. Moreover, a copy is kept in your file.\n\nIf you feel dizzy or weak on the day, please call the ward before eight.",
      questions: [
        { de: "What must the patient not do before the scan?", tr: "Hasta çekimden önce ne yapmamalı?", options: ["Eat for six hours", "Drink water", "Take the usual tablets", "Fill in the form"], answer: 0 },
        { de: "What happens if the patient forgets the letter?", tr: "Hasta yazıyı unutursa ne olur?", options: ["The scan is postponed", "The result is sent later", "A fee is charged", "The ward calls the doctor"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Doktora şikâyetini anlatıyorsun.", de: "I have had the pain in my chest since Monday and it is worse at night.", tr: "Pazartesiden beri göğsümde ağrı var ve geceleri daha kötü." },
      { situation: "Uzmana sevk istiyorsun.", de: "Could you refer me to a specialist, because the treatment has not helped?", tr: "Beni bir uzmana sevk edebilir misiniz, çünkü tedavi işe yaramadı?" },
    ],
    writing: {
      prompt: "Muayenehaneye rapor ve sevk isteyen bir e-posta yaz.",
      checklist: [
        "Şikâyetini ve ne zamandan beri sürdüğünü yaz",
        "Şimdiye kadar ne yapıldığını edilgen yapıyla yaz",
        "Ne istediğini yaz (rapor, sevk, randevu)",
        "„moreover“ ya da „besides“ ile bir ekleme yap",
      ],
      minWords: 70,
      phrases: [
        { de: "I have had … since …", tr: "…-den beri … var", en: "I have had … since …" },
        { de: "The test was taken on …", tr: "Tahlil …-de yapıldı", en: "The test was taken on …" },
        { de: "The medicine was prescribed by …", tr: "İlaç … tarafından yazıldı", en: "The medicine was prescribed by …" },
        { de: "Could you refer me to a specialist?", tr: "Beni uzmana sevk edebilir misiniz?", en: "Could you refer me to a specialist?" },
        { de: "Moreover, I would need a sick note.", tr: "Ayrıca bir rapora ihtiyacım olacak", en: "Moreover, I would need a sick note." },
      ],
      sample:
        "Dear Doctor Weber,\n\nI have had a pain in my knee since March and it has become worse in the last two weeks.\n\nThe blood test was taken on 3 May and the x-ray was checked at the clinic in April; no infection was found. The painkiller was prescribed by your colleague, but the pain returns every night. By the time I came to reception on Monday, I had already tried two weeks of rest.\n\nCould you refer me to a specialist, please? Moreover, I would need a sick note for this week, because I cannot stand for long at work.\n\nThank you very much.\n\nYours sincerely,\nS. Kaya",
    },
  },

  {
    level: "B1",
    index: 8,
    code: "B1.9",
    titleDe: "The city and the environment",
    titleTr: "Çevre ve şehir yaşamı",
    focus: [
      { de: "Passive voice", tr: "„cam salı toplanıyor“" },
      { de: "First and second conditional", tr: "„musluğu kapatırsan …“" },
      { de: "Relative clauses", tr: "hangi park, hangi yol" },
      { de: "Past perfect", tr: "yol yapılmadan önce" },
      { de: "on the other hand / in contrast", tr: "iki tarafı karşılaştırmak" },
    ],
    canDo: [
      { de: "I can understand how the rubbish is collected.", tr: "Çöpün nasıl toplandığını anlayabiliyorum.", en: "I can understand how the rubbish is collected." },
      { de: "I can give advice about saving energy and water.", tr: "Enerji ve su tasarrufu için öğüt verebiliyorum.", en: "I can give advice about saving energy and water." },
      { de: "I can describe how my town has changed.", tr: "Şehrimin nasıl değiştiğini anlatabiliyorum.", en: "I can describe how my town has changed." },
      { de: "I can take part in a local project and sign a petition.", tr: "Mahalle projesine katılıp dilekçe imzalayabiliyorum.", en: "I can take part in a local project and sign a petition." },
      { de: "I can compare city life and life in the country.", tr: "Şehir ile kır yaşamını karşılaştırabiliyorum.", en: "I can compare city life and life in the country." },
    ],
    listening: {
      title: "The green space committee",
      titleTr: "Yeşil alan komitesi",
      situation: "Bir mahalle toplantısında park projesi konuşuluyor.",
      turns: [
        { speaker: "Chair", de: "The petition which we started in April was signed by four hundred residents.", tr: "Nisanda başlattığımız dilekçeyi dört yüz kişi imzaladı." },
        { speaker: "Resident", de: "Before they built the car park, this was a field where children played.", tr: "Otoparkı yapmadan önce burası çocukların oynadığı bir tarlaydı." },
        { speaker: "Chair", de: "The mayor said that the space was still free for a small park.", tr: "Başkan alanın küçük bir park için hâlâ boş olduğunu söyledi." },
        { speaker: "Planner", de: "The trees would be planted in October, if the committee agreed today.", tr: "Komite bugün kabul etse ağaçlar ekimde dikilirdi." },
        { speaker: "Resident", de: "What about the traffic? The street is noisy; the bus stop, on the other hand, is useful.", tr: "Trafik ne olacak? Sokak gürültülü; otobüs durağı ise işe yarıyor." },
        { speaker: "Planner", de: "One lane is removed, so the route is quieter. The cycle lane is wider.", tr: "Bir şerit kaldırılıyor, yol daha sessiz oluyor. Bisiklet yolu genişliyor." },
        { speaker: "Chair", de: "Unless the council votes against it, the poster will be printed.", tr: "Belediye aleyhte oy vermedikçe afiş basılacak." },
        { speaker: "Resident", de: "If we planted flowers as well, the playground would look better.", tr: "Çiçek de diksek oyun alanı daha iyi görünürdü." },
      ],
      questions: [
        { de: "What was on this space before the car park?", tr: "Otoparktan önce bu alanda ne vardı?", options: ["A field where children played", "A small park", "A bus stop", "A cycle lane"], answer: 0 },
        { de: "When would the trees be planted?", tr: "Ağaçlar ne zaman dikilirdi?", options: ["In October", "In April", "Next week", "After the next vote"], answer: 0 },
        { de: "What happens to the street when one lane is removed?", tr: "Bir şerit kaldırılınca sokakta ne oluyor?", options: ["The route becomes quieter", "The bus stop is closed", "The traffic grows", "The cycle lane is removed"], answer: 0 },
      ],
    },
    reading: {
      title: "New rubbish plan from June",
      titleTr: "Belediye duyurusu",
      genre: "Duyuru",
      text: "NEW RUBBISH PLAN FROM JUNE\n\nDear residents,\n\nFrom 1 June the rubbish is collected on new days: glass and metal on Tuesdays, paper on Thursdays. Plastic bottles must be separated from the rest; only garden waste is thrown into the green bin.\n\nThe bins which stand in the street are emptied before eight, so please bring them out the evening before. If a bin is not emptied, call the office.\n\nThe landfill outside the town was closed last year, and since then the waste has been recycled in the new plant. As a result, the cost has fallen.\n\nOn the other hand, a dirty bin is not emptied. In contrast to last year, the driver does not sort it.",
      questions: [
        { de: "What is collected on Thursdays?", tr: "Perşembe ne toplanıyor?", options: ["Paper", "Glass and metal", "Garden waste", "Plastic bottles"], answer: 0 },
        { de: "What has happened since the landfill was closed?", tr: "Çöp sahası kapandığından beri ne oldu?", options: ["The waste has been recycled in a new plant", "The cost has grown", "The bins are emptied later", "The paper day was moved"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Tasarruf için öğüt veriyorsun.", de: "If you closed the tap while washing, you would save a lot of water.", tr: "Yıkarken musluğu kapatsan çok su tasarruf edersin." },
      { situation: "Şehrin nasıl değiştiğini anlatıyorsun.", de: "The town has changed a lot since they built the bridge in 2015.", tr: "2015'te köprüyü yaptıklarından beri şehir çok değişti." },
    ],
    writing: {
      prompt: "Belediyeye mahallen için bir öneri yazısı yaz.",
      checklist: [
        "Neyi önerdiğini ve nerede olduğunu yaz",
        "Bugünkü durumu edilgen yapıyla anlat („the bins are emptied …“)",
        "Bir koşul cümlesi kur („if …, would …“)",
        "Karşı tarafın görüşüne yer ver („on the other hand“)",
      ],
      minWords: 80,
      phrases: [
        { de: "I am writing on behalf of the residents of …", tr: "… sakinleri adına yazıyorum", en: "I am writing on behalf of the residents of …" },
        { de: "At the moment the rubbish is collected …", tr: "Şu anda çöp … toplanıyor", en: "At the moment the rubbish is collected …" },
        { de: "If the council planted trees, …", tr: "Belediye ağaç dikse, …", en: "If the council planted trees, …" },
        { de: "On the other hand, …", tr: "Öte yandan, …", en: "On the other hand, …" },
        { de: "We would be grateful for a reply.", tr: "Cevap verirseniz minnettar oluruz", en: "We would be grateful for a reply." },
      ],
      sample:
        "Dear Sir or Madam,\n\nI am writing on behalf of the residents of Green Street about the empty space next to the playground.\n\nAt the moment the rubbish is collected there twice a week, but the corner which stands behind the bins is never cleaned. Before they built the car park, this was a field where the children played. Since then the only green space has been the small path by the river.\n\nIf the council planted ten trees and put two seats there, the area would be used every day. On the other hand, we understand that the budget is small; therefore we would help with the planting.\n\nWe would be grateful for a reply before the summer.\n\nYours sincerely,\nThe residents' committee",
    },
  },

  {
    level: "B1",
    index: 9,
    code: "B1.10",
    titleDe: "Feelings and dreams",
    titleTr: "Duygular ve hayaller",
    focus: [
      { de: "Present perfect vs past simple", tr: "süregelen duygu ile biten olay" },
      { de: "Past perfect", tr: "anlamadan önce olan" },
      { de: "Second conditional", tr: "„olsaydım, söylerdim“" },
      { de: "Relative clauses", tr: "beni etkileyen şeyi tanımlamak" },
      { de: "even though / as a result", tr: "çekince ve sonuç" },
    ],
    canDo: [
      { de: "I can name a feeling and say when it started.", tr: "Bir duyguyu adlandırıp ne zaman başladığını söyleyebiliyorum.", en: "I can name a feeling and say when it started." },
      { de: "I can talk about a regret and what I had done before.", tr: "Bir pişmanlığı ve öncesinde ne yaptığımı anlatabiliyorum.", en: "I can talk about a regret and what I had done before." },
      { de: "I can describe a dream and a realistic next step.", tr: "Bir hayali ve gerçekçi bir adımı anlatabiliyorum.", en: "I can describe a dream and a realistic next step." },
      { de: "I can cheer someone up without giving advice too early.", tr: "Erken öğüt vermeden birini teselli edebiliyorum.", en: "I can cheer someone up without giving advice too early." },
      { de: "I can thank someone and say why I appreciate them.", tr: "Birine teşekkür edip neden değer verdiğimi söyleyebiliyorum.", en: "I can thank someone and say why I appreciate them." },
    ],
    listening: {
      title: "I should have said it earlier",
      titleTr: "Daha önce söylemeliydim",
      situation: "İki yakın arkadaş bir kırgınlığı konuşuyor.",
      turns: [
        { speaker: "Ela", de: "You have been quiet since Monday. Has something happened?", tr: "Pazartesiden beri sessizsin. Bir şey mi oldu?" },
        { speaker: "Bora", de: "My mood has been low for two weeks. I didn't get the job which I had wanted.", tr: "İki haftadır moralim bozuk. İstediğim işi alamadım." },
        { speaker: "Ela", de: "Why didn't you tell me? I would have come earlier.", tr: "Neden söylemedin? Daha önce gelirdim." },
        { speaker: "Bora", de: "By the time I understood the letter, everyone had already asked me about it. I felt guilty.", tr: "Yazıyı anladığımda herkes bana çoktan sormuştu. Suçlu hissettim." },
        { speaker: "Ela", de: "Even though the answer was no, the interview was good practice.", tr: "Cevap hayır olsa da mülakat iyi bir alıştırmaydı." },
        { speaker: "Bora", de: "If I were braver, I would apply again. But I am afraid of the same answer.", tr: "Daha cesur olsam yine başvururdum. Ama aynı cevaptan korkuyorum." },
        { speaker: "Ela", de: "The woman who interviewed you told my cousin that your report was excellent.", tr: "Seninle mülakat yapan kadın, raporunun çok iyi olduğunu kuzenime söylemiş." },
        { speaker: "Bora", de: "Really? That is a relief. As a result, I might write to her next month.", tr: "Gerçekten mi? Bu bir rahatlama. O hâlde belki önümüzdeki ay ona yazarım." },
      ],
      questions: [
        { de: "Why has Bora's mood been low?", tr: "Bora'nın morali neden bozuk?", options: ["He didn't get a job he had wanted", "He lost a friend", "He is ill", "He moved to another city"], answer: 0 },
        { de: "What had happened by the time Bora understood the letter?", tr: "Bora yazıyı anladığında ne olmuştu?", options: ["Everyone had already asked him about it", "The job had been given to a colleague", "He had written to the team", "Ela had called him"], answer: 0 },
        { de: "What did the interviewer tell Ela's cousin?", tr: "Mülakatı yapan kişi Ela'nın kuzenine ne söyledi?", options: ["Bora's report was excellent", "Bora had been late", "The team wanted a second interview", "The letter was a mistake"], answer: 0 },
    ],
    },
    reading: {
      title: "The thing that moved me",
      titleTr: "Dergi yazısı",
      genre: "Kişisel yazı",
      text: "The thing that moved me\n\nI have kept the same photograph on my desk for eleven years. It shows the kitchen where my grandmother cooked every Sunday.\n\nWhen she left us, I felt nothing for weeks. I had said goodbye at the hospital, and I believed that I had understood it. Then I found her notebook with the recipes which she had written down by hand. By the time I got to the last page, I was crying.\n\nEven though the memory was old, the feeling was completely new. As a result, I started cooking one of her dishes every month.\n\nIf I could ask her one question, it would not be about the food. I would ask her where she had found her patience.",
      questions: [
        { de: "What did the writer find?", tr: "Yazar ne buldu?", options: ["Her grandmother's notebook", "An old photograph", "A letter from the hospital", "A dish in a book"], answer: 0 },
        { de: "What does the writer do every month now?", tr: "Yazar şimdi her ay ne yapıyor?", options: ["She cooks one of the dishes", "She visits the kitchen", "She writes in the notebook", "She asks her family a question"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Bir arkadaşını teselli ediyorsun.", de: "You don't have to face it alone, even though the answer was no.", tr: "Cevap hayır olsa da bununla tek başına yüzleşmek zorunda değilsin." },
      { situation: "Bir hayalini anlatıyorsun.", de: "If I were braver, I would follow that dream next year.", tr: "Daha cesur olsam gelecek yıl o hayalin peşinden giderdim." },
    ],
    writing: {
      prompt: "Zor bir dönem geçiren bir arkadaşına cesaret veren bir mektup yaz.",
      checklist: [
        "Neyi fark ettiğini yaz („You have been … since …“)",
        "Kendi benzer deneyimini geçmiş zamanla yaz",
        "Bir „if … would“ cümlesi kur",
        "Erken öğüt vermeden bir öneri yaz",
      ],
      minWords: 80,
      phrases: [
        { de: "You have been … since …", tr: "…-den beri …sin", en: "You have been … since …" },
        { de: "I felt the same when …", tr: "… olduğunda ben de aynısını hissettim", en: "I felt the same when …" },
        { de: "By the time I understood, … had …", tr: "Ben anladığımda … olmuştu", en: "By the time I understood, … had …" },
        { de: "If I were you, I would …", tr: "Yerinde olsam … yapardım", en: "If I were you, I would …" },
        { de: "Even though …, I am grateful for …", tr: "… olsa da, … için minnettarım", en: "Even though …, I am grateful for …" },
      ],
      sample:
        "Dear Bora,\n\nYou have been very quiet since the letter arrived, and I wanted to write instead of calling.\n\nI felt the same when my application was rejected two years ago. I had prepared for months, so the answer hurt more than I expected. By the time I understood that it was not about me, the whole team had already moved on. What helped me was not advice; it was a friend who just sat with me.\n\nIf I were you, I would wait a month and then write to the woman who interviewed you. Even though the answer was no, your report was excellent, and that is worth something.\n\nEven though this month is hard, I am grateful for your friendship. Let's meet on Sunday.\n\nEla",
    },
  },
];
