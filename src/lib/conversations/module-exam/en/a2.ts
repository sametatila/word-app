import type { ModuleExamPlan } from "../types";

/**
 * İNGİLİZCE kursun A2 modül sınavları (10 modül).
 *
 * Alan adları ve `en` alanının gerekçesi kardeş dosyada: `./a1.ts` başlığı.
 *
 * A2'de kâğıdın işi değişiyor. A1'de metin bilgi taşıyordu ("kira 620, ilan
 * salı bitiyor"); A2'de bir OLAY taşıyor — ne oldu, ne zamandır sürüyor, ne
 * yapıldı, ne yapılacak. Sorular bu yüzden tek bir satırdan değil metnin
 * SIRASINDAN cevaplanıyor: "ne olmuş" ile "o sırada ne yapıyordu" ayrı iki
 * soru ve ikisi de A2'nin kendi dilbilgisi (past continuous, present perfect).
 *
 * Yazma görevleri 40 kelimeden başlıyor: bir olayın gövdesi (zaman, olay,
 * sıra, sonuç) daha azına sığmıyor.
 */
export const EN_A2_EXAMS: ModuleExamPlan[] = [
  {
    level: "A2",
    index: 0,
    code: "A2.1",
    titleDe: "What happened?",
    titleTr: "Geçmişi anlatmak",
    focus: [
      { de: "Past simple: irregular verbs", tr: "düzensiz geçmiş zaman" },
      { de: "Past continuous", tr: "o sırada süren iş" },
      { de: "when / while", tr: "iki geçmiş işi bağlamak" },
      { de: "used to", tr: "eskiden olan alışkanlık" },
    ],
    canDo: [
      { de: "I can tell a story in the past.", tr: "Geçmişte olan bir olayı anlatabiliyorum.", en: "I can tell a story in the past." },
      { de: "I can say what I was doing when something happened.", tr: "Bir şey olduğunda ne yaptığımı söyleyebiliyorum.", en: "I can say what I was doing when something happened." },
      { de: "I can use when and while in one sentence.", tr: "„when“ ve „while“ ile iki işi bağlayabiliyorum.", en: "I can use when and while in one sentence." },
      { de: "I can talk about my childhood with used to.", tr: "„used to“ ile çocukluğumu anlatabiliyorum.", en: "I can talk about my childhood with used to." },
      { de: "I can ask about the past: where, who with, how long.", tr: "Geçmişi sorabiliyorum: nerede, kiminle, ne kadar.", en: "I can ask about the past: where, who with, how long." },
    ],
    listening: {
      title: "A bad day",
      titleTr: "Kötü bir gün",
      situation: "İki arkadaş dün olan bir aksiliği konuşuyor.",
      turns: [
        { speaker: "Ela", de: "You look tired. What happened yesterday?", tr: "Yorgun görünüyorsun. Dün ne oldu?" },
        { speaker: "Onur", de: "I was waiting for the bus when it started to rain.", tr: "Otobüsü beklerken yağmur başladı." },
        { speaker: "Ela", de: "Did you wait a long time?", tr: "Uzun mu bekledin?" },
        { speaker: "Onur", de: "Twenty minutes. Then I fell down on the street and I hurt my arm.", tr: "Yirmi dakika. Sonra sokakta düştüm ve kolumu incittim." },
        { speaker: "Ela", de: "Oh no! Was it serious? How long did you stay at the doctor?", tr: "Aman! Ciddi miydi? Doktorda ne kadar kaldın?" },
        { speaker: "Onur", de: "Luckily, it wasn't serious. I stayed there for one hour, and a neighbor helped me at home.", tr: "Şükür, ciddi değildi. Bir saat kaldım, evde de bir komşu yardım etti." },
        { speaker: "Ela", de: "I'm happy your arm is better today.", tr: "Kolunun bugün daha iyi olmasına sevindim." },
      ],
      questions: [
        { de: "What was Onur doing when it started to rain?", tr: "Yağmur başladığında Onur ne yapıyordu?", options: ["He was cooking", "He was waiting for the bus", "He was sleeping", "He was playing football"], answer: 1 },
        { de: "How did Onur hurt his arm?", tr: "Onur kolunu nasıl incitti?", options: ["He fell down on the street", "He fell down at home", "He was playing football", "He was carrying a box"], answer: 0 },
        { de: "How long did Onur stay at the doctor?", tr: "Onur doktorda ne kadar kaldı?", options: ["Twenty minutes", "One hour", "One day", "One week"], answer: 1 },
      ],
    },
    reading: {
      title: "A day I remember",
      titleTr: "Hatırladığım bir gün",
      genre: "Kişisel yazı",
      text: "A day I remember\n\nLast summer I traveled to a small island with my sister. We stayed at a hostel for five days. The weather was hot and the beach was beautiful.\n\nOne morning, while we were swimming, my sister lost her bag in the water. We looked for it for two hours! Luckily, a boy from the hostel found it in the evening.\n\nAt first I was angry, but now I remember that day and I laugh.",
      questions: [
        { de: "Where did they stay?", tr: "Nerede kaldılar?", options: ["At a hotel", "At a hostel", "With friends", "At home"], answer: 1 },
        { de: "What happened while they were swimming?", tr: "Yüzerken ne oldu?", options: ["Her sister lost her bag", "It started to rain", "They missed the bus", "Her sister hurt her arm"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Arkadaşına başından geçen bir aksiliği anlatıyorsun.", de: "First I lost my bag, then I fell down on the stairs.", tr: "Önce çantamı kaybettim, sonra merdivende düştüm." },
      { situation: "Birinin geçmişini soruyorsun.", de: "Where did you go last summer and how long did you stay?", tr: "Geçen yaz nereye gittin ve ne kadar kaldın?" },
    ],
    writing: {
      prompt: "Başından geçen bir olayı anlatan kısa bir metin yaz.",
      checklist: [
        "Ne zaman olduğunu yaz (last week, two days ago)",
        "Bir „when“ ya da „while“ cümlesi kur",
        "First / Then / After that ile sırala",
        "Sonunda nasıl bittiğini yaz",
      ],
      minWords: 45,
      phrases: [
        { de: "Two days ago …", tr: "İki gün önce …", en: "Two days ago …" },
        { de: "I was …-ing when …", tr: "… yapıyordum ki …", en: "I was …-ing when …" },
        { de: "While I was …", tr: "… yaparken", en: "While I was …" },
        { de: "First … Then … After that …", tr: "Önce … Sonra … Ardından …", en: "First … Then … After that …" },
        { de: "Luckily, it wasn't serious.", tr: "Şükür, ciddi değildi.", en: "Luckily, it wasn't serious." },
      ],
      sample:
        "Two days ago I had a bad day. In the morning I was looking for my bag when my sister called. While we were talking, I didn't look at the clock. Then I walked to the bus stop, but I missed the bus. I waited twenty minutes for the next one and I was late for school. After that my teacher asked me why I was late. I explained everything. Luckily, it wasn't serious.",
    },
  },

  {
    level: "A2",
    index: 1,
    code: "A2.2",
    titleDe: "My story, then and now",
    titleTr: "Benim hikâyem",
    focus: [
      { de: "Present perfect: Have you ever …?", tr: "hayat deneyimi sormak" },
      { de: "since / for", tr: "ne zamandan beri, ne kadar süre" },
      { de: "already / yet / just", tr: "bitti mi, henüz mi" },
      { de: "Comparatives and superlatives", tr: "daha iyi, en iyi" },
    ],
    canDo: [
      { de: "I can say what I have done in my life.", tr: "Hayatımda neler yaptığımı anlatabiliyorum.", en: "I can say what I have done in my life." },
      { de: "I can say how long I have lived or worked somewhere.", tr: "Bir yerde ne zamandan beri oturduğumu ya da çalıştığımı söyleyebiliyorum.", en: "I can say how long I have lived or worked somewhere." },
      { de: "I can say what I have already finished and what I haven't done yet.", tr: "Neyi bitirdiğimi, neyi henüz bitirmediğimi söyleyebiliyorum.", en: "I can say what I have already finished and what I haven't done yet." },
      { de: "I can compare my life before and now.", tr: "Eski hâlimle bugünü karşılaştırabiliyorum.", en: "I can compare my life before and now." },
      { de: "I can talk about my hopes and plans.", tr: "Umutlarımdan ve planlarımdan bahsedebiliyorum.", en: "I can talk about my hopes and plans." },
    ],
    listening: {
      title: "Have you ever been there?",
      titleTr: "Hiç gittin mi?",
      situation: "Kursta iki kişi tanışıyor ve hayat hikâyelerini konuşuyor.",
      turns: [
        { speaker: "Merve", de: "How long have you lived in this city?", tr: "Bu şehirde ne zamandan beri oturuyorsun?" },
        { speaker: "Kerem", de: "I have lived here for three years. I moved here after university.", tr: "Üç yıldır buradayım. Üniversiteden sonra taşındım." },
        { speaker: "Merve", de: "Have you ever worked abroad?", tr: "Hiç yurt dışında çalıştın mı?" },
        { speaker: "Kerem", de: "Yes, I have. I was in Italy twice, but it was only for a few months.", tr: "Evet. İki kez İtalya'daydım ama yalnızca birkaç ay." },
        { speaker: "Merve", de: "Have you finished your English course yet?", tr: "İngilizce kursunu bitirdin mi?" },
        { speaker: "Kerem", de: "I have already finished the first year, but I haven't started the second one yet.", tr: "Birinci yılı bitirdim ama ikinciye henüz başlamadım." },
        { speaker: "Merve", de: "My life has changed a lot since then, too. This year is better than the last one.", tr: "Benim hayatım da o zamandan beri çok değişti. Bu yıl geçen yıldan daha iyi." },
      ],
      questions: [
        { de: "How long has Kerem lived in the city?", tr: "Kerem şehirde ne zamandan beri oturuyor?", options: ["For three months", "For three years", "For one year", "For two years"], answer: 1 },
        { de: "Where has Kerem worked abroad?", tr: "Kerem yurt dışında nerede çalıştı?", options: ["In Italy", "In France", "He has never worked abroad", "In two countries"], answer: 0 },
        { de: "What has Kerem already finished?", tr: "Kerem neyi bitirdi?", options: ["The course", "The first year", "The second year", "Nothing"], answer: 1 },
      ],
    },
    reading: {
      title: "My life story",
      titleTr: "Hayat hikâyesi",
      genre: "Kişisel yazı",
      text: "My life story\n\nI was born in a small village in 1995. When I was ten, my family moved to the city and I started a new school.\n\nAfter high school I went to university. I have worked as a teacher since 2019 — that is more than five years now. I have already taught in three schools.\n\nMy life has changed a lot. I used to be very quiet, but now I am not quiet anymore. My dream is to work abroad. I hope to start next year.",
      questions: [
        { de: "When did the family move to the city?", tr: "Aile şehre ne zaman taşındı?", options: ["In 1995", "When the writer was ten", "After high school", "In 2019"], answer: 1 },
        { de: "How long has the writer worked as a teacher?", tr: "Yazar ne zamandan beri öğretmenlik yapıyor?", options: ["For three years", "Since 2019", "Since high school", "For ten years"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "Yeni tanıştığın birine kendini anlatıyorsun.", de: "I have lived in this city for two years and I have already found a job.", tr: "İki yıldır bu şehirde oturuyorum ve iş de buldum." },
      { situation: "Hayatındaki değişimi anlatıyorsun.", de: "I used to be very quiet, but I am not quiet anymore.", tr: "Eskiden çok sessizdim ama artık sessiz değilim." },
    ],
    writing: {
      prompt: "Hayatını kısaca anlatan bir metin yaz: eskiden ve şimdi.",
      checklist: [
        "Nerede doğduğunu ve nerede büyüdüğünü yaz",
        "„since“ ya da „for“ ile bir cümle kur",
        "„used to“ ile eski bir alışkanlık yaz",
        "Bir karşılaştırma yap (better than, more important than)",
      ],
      minWords: 45,
      phrases: [
        { de: "I was born in …", tr: "…'de doğdum", en: "I was born in …" },
        { de: "Then I moved to …", tr: "Sonra …'e taşındım", en: "Then I moved to …" },
        { de: "I have lived here for …", tr: "… süredir burada oturuyorum", en: "I have lived here for …" },
        { de: "I used to …", tr: "Eskiden … yapardım", en: "I used to …" },
        { de: "My dream is to …", tr: "Hayalim … yapmak", en: "My dream is to …" },
      ],
      sample:
        "I was born in a small village and I lived there for twelve years. Then I moved to the city with my family. I have lived here for ten years now and I have already worked in two companies. I used to play football every day, but I don't play anymore. I think my life is better than before, because I have more opportunities here. My dream is to visit my sister abroad. I hope to travel next summer.",
    },
  },

  {
    level: "A2",
    index: 2,
    code: "A2.3",
    titleDe: "At the doctor's",
    titleTr: "Sağlık",
    focus: [
      { de: "How long have you had …?", tr: "şikâyetin süresini sormak" },
      { de: "should / shouldn't", tr: "öğüt ve tavsiye" },
      { de: "Present perfect with for and since", tr: "kaç gündür sürüyor" },
      { de: "Polite requests: Could you …?", tr: "randevu ve bilgi isteme" },
    ],
    canDo: [
      { de: "I can describe my symptoms.", tr: "Şikâyetlerimi anlatabiliyorum.", en: "I can describe my symptoms." },
      { de: "I can say how long I have had a problem.", tr: "Şikâyetimin ne zamandan beri olduğunu söyleyebiliyorum.", en: "I can say how long I have had a problem." },
      { de: "I can change or cancel an appointment.", tr: "Randevumu değiştirebiliyor ya da iptal edebiliyorum.", en: "I can change or cancel an appointment." },
      { de: "I can read the label on a medicine.", tr: "İlacın kullanma bilgisini okuyabiliyorum.", en: "I can read the label on a medicine." },
      { de: "I can give and understand health advice.", tr: "Sağlık öğüdü verip anlayabiliyorum.", en: "I can give and understand health advice." },
    ],
    listening: {
      title: "Changing an appointment",
      titleTr: "Randevu değiştirmek",
      situation: "Bir hasta muayenehaneyi arayıp randevusunu değiştiriyor.",
      turns: [
        { speaker: "Assistant", de: "Doctor Weber's office, good morning.", tr: "Doktor Weber'in muayenehanesi, günaydın." },
        { speaker: "Patient", de: "Good morning. I'd like to change my appointment on Friday.", tr: "Günaydın. Cumadaki randevumu değiştirmek istiyorum." },
        { speaker: "Assistant", de: "Of course. Do you want something earlier or later?", tr: "Tabii. Daha erken mi yoksa daha sonra mı istiyorsunuz?" },
        { speaker: "Patient", de: "Earlier, please. I have had a cough for five days and it is getting worse.", tr: "Daha erken lütfen. Beş gündür öksürüyorum ve kötüleşiyor." },
        { speaker: "Assistant", de: "Then come tomorrow at nine. Is that early enough?", tr: "O hâlde yarın dokuzda gelin. Bu yeterince erken mi?" },
        { speaker: "Patient", de: "Yes, thank you. Should I bring my insurance card?", tr: "Evet, teşekkürler. Sigorta kartımı getirmeli miyim?" },
        { speaker: "Assistant", de: "Yes, and please fill out this form before you come in.", tr: "Evet, bir de gelmeden önce bu formu doldurun." },
      ],
      questions: [
        { de: "Why does the patient call?", tr: "Hasta neden arıyor?", options: ["To cancel the appointment", "To change the appointment", "To ask for a medicine", "To ask about the bill"], answer: 1 },
        { de: "How long has the patient had a cough?", tr: "Hastanın öksürüğü ne zamandan beri var?", options: ["For two days", "For five days", "Since Friday", "For a week"], answer: 1 },
        { de: "What should the patient bring?", tr: "Hasta ne getirmeli?", options: ["A thermometer", "The insurance card", "The tablets", "Nothing"], answer: 1 },
      ],
    },
    reading: {
      title: "Reading the label",
      titleTr: "Prospektüs",
      genre: "Bilgi metni",
      text: "COUGH SYRUP — please read before use\n\nDose for adults: one spoon twice a day, after meals.\nChildren over six: one spoon a day.\n\nDo not take the syrup for more than seven days. If you feel dizzy, stop and call your doctor.\n\nSide effects: some people feel tired after the first dose.\n\nYou should keep the bottle in a cool, dark place. Do not use it if the bottle has been open for more than four weeks.",
      questions: [
        { de: "How often should an adult take the syrup?", tr: "Bir yetişkin şurubu ne sıklıkta almalı?", options: ["Once a day", "Twice a day", "Three times a day", "After every meal"], answer: 1 },
        { de: "What should you do if you feel dizzy?", tr: "Baş dönmesi olursa ne yapmalı?", options: ["Take a bigger dose", "Stop and call the doctor", "Wait seven days", "Drink more water"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "Doktora şikâyetini anlatıyorsun.", de: "I have had a fever since Monday and my stomach hurts.", tr: "Pazartesiden beri ateşim var ve midem ağrıyor." },
      { situation: "Randevunu telefonda değiştiriyorsun.", de: "Could you give me an earlier appointment, please?", tr: "Bana daha erken bir randevu verebilir misiniz lütfen?" },
    ],
    writing: {
      prompt: "Muayenehaneye randevunu değiştirmek için kısa bir e-posta yaz.",
      checklist: [
        "Hangi randevuyu değiştirmek istediğini yaz",
        "Şikâyetini ve ne zamandan beri olduğunu yaz",
        "Hangi gün ve saatin sana uyduğunu yaz",
        "Ne getireceğini sor",
      ],
      minWords: 45,
      phrases: [
        { de: "I'd like to change my appointment on …", tr: "…-deki randevumu değiştirmek istiyorum", en: "I'd like to change my appointment on …" },
        { de: "I have had … for three days.", tr: "Üç gündür …", en: "I have had … for three days." },
        { de: "Do you have anything earlier?", tr: "Daha erken bir şey var mı?", en: "Do you have anything earlier?" },
        { de: "Could you call me back, please?", tr: "Beni geri arayabilir misiniz lütfen?", en: "Could you call me back, please?" },
        { de: "What should I bring with me?", tr: "Yanımda ne getirmeliyim?", en: "What should I bring with me?" },
      ],
      sample:
        "Good morning,\n\nI'd like to change my appointment on Friday at four o'clock. I have had a sore throat and a fever for four days and it is getting worse, so the appointment is urgent for me.\n\nDo you have anything earlier? Monday or Tuesday morning is good for me. I am available before ten.\n\nWhat should I bring with me? Could you call me back today, please?\n\nThank you very much\nElif Yilmaz",
    },
  },

  {
    level: "A2",
    index: 3,
    code: "A2.4",
    titleDe: "Home and neighborhood",
    titleTr: "Ev ve mahalle",
    focus: [
      { de: "Present perfect for a problem", tr: "„pazartesiden beri çalışmıyor“" },
      { de: "have to / can't", tr: "kural ve yasak" },
      { de: "Could you …, please?", tr: "nazik şikâyet ve rica" },
      { de: "Comparatives", tr: "daha sessiz, daha aydınlık" },
    ],
    canDo: [
      { de: "I can ask about a flat and its rent.", tr: "Bir daireyi ve kirasını sorabiliyorum.", en: "I can ask about a flat and its rent." },
      { de: "I can describe my home and my furniture.", tr: "Evimi ve eşyalarımı tarif edebiliyorum.", en: "I can describe my home and my furniture." },
      { de: "I can report a problem to the landlord politely.", tr: "Ev sahibine bir arızayı nazikçe bildirebiliyorum.", en: "I can report a problem to the landlord politely." },
      { de: "I can complain about noise without being rude.", tr: "Gürültüyü kabalaşmadan şikâyet edebiliyorum.", en: "I can complain about noise without being rude." },
      { de: "I can understand the rules of the building.", tr: "Binanın kurallarını anlayabiliyorum.", en: "I can understand the rules of the building." },
    ],
    listening: {
      title: "There's a leak in the bathroom",
      titleTr: "Banyoda su sızıyor",
      situation: "Bir kiracı apartman görevlisini arıyor.",
      turns: [
        { speaker: "Resident", de: "Sorry to bother you, but there's a leak in the bathroom.", tr: "Rahatsız ettim ama banyoda su sızıyor." },
        { speaker: "Manager", de: "How long has there been a leak?", tr: "Ne zamandan beri sızıyor?" },
        { speaker: "Resident", de: "Since Monday. And the heating hasn't worked for three days.", tr: "Pazartesiden beri. Bir de kalorifer üç gündür çalışmıyor." },
        { speaker: "Manager", de: "That's not good. Could you send me a photo of the pipe?", tr: "Bu hiç iyi değil. Bana borunun fotoğrafını gönderebilir misiniz?" },
        { speaker: "Resident", de: "Of course. Could you send someone today? The damage is getting worse.", tr: "Tabii. Bugün birini gönderebilir misiniz? Hasar büyüyor." },
        { speaker: "Manager", de: "The repairman can come tomorrow morning at eight. Is that OK for you?", tr: "Tamirci yarın sabah sekizde gelebilir. Size uygun mu?" },
        { speaker: "Resident", de: "Yes, I am at home until ten. Thank you very much.", tr: "Evet, ona kadar evdeyim. Çok teşekkürler." },
      ],
      questions: [
        { de: "What is the problem in the bathroom?", tr: "Banyodaki sorun ne?", options: ["There is a leak", "The heating is broken", "The window is broken", "The light doesn't work"], answer: 0 },
        { de: "How long has the heating been broken?", tr: "Kalorifer ne zamandan beri çalışmıyor?", options: ["Since Monday", "For three days", "For a week", "Since the morning"], answer: 1 },
        { de: "When does the repairman come?", tr: "Tamirci ne zaman geliyor?", options: ["Today at eight", "Tomorrow morning", "Tomorrow at ten", "Next week"], answer: 1 },
      ],
    },
    reading: {
      title: "Rules for the building",
      titleTr: "Bina kuralları",
      genre: "Duyuru",
      text: "RULES FOR THE BUILDING\n\nDear residents,\n\nPlease read these rules carefully.\n\n1. After ten o'clock you must not make noise.\n2. You have to put the paper in the blue garbage can.\n3. Bikes are forbidden in the hallway. There is a place for them in the basement.\n4. You don't have to clean the stairs — the caretaker does it every Friday.\n\nIf something is broken, please call the caretaker immediately.",
      questions: [
        { de: "What can't the residents do after ten o'clock?", tr: "Kiracılar saat ondan sonra ne yapmamalı?", options: ["Make noise", "Use the lift", "Clean the stairs", "Park a bike"], answer: 0 },
        { de: "Who cleans the stairs?", tr: "Merdivenleri kim temizliyor?", options: ["The residents", "The caretaker", "Nobody", "A mechanic"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "Ev sahibine arıza bildiriyorsun.", de: "The heating hasn't worked since Monday. Could you send someone today?", tr: "Kalorifer pazartesiden beri çalışmıyor. Bugün birini gönderebilir misiniz?" },
      { situation: "Gürültücü komşuyla nazikçe konuşuyorsun.", de: "Sorry to bother you, but the music is very loud after ten.", tr: "Rahatsız ettim ama saat ondan sonra müzik çok yüksek oluyor." },
    ],
    writing: {
      prompt: "Ev sahibine bir arızayı bildiren nazik bir mesaj yaz.",
      checklist: [
        "Sorunun ne olduğunu yaz",
        "Ne zamandan beri sürdüğünü yaz („since“ ya da „for“)",
        "Nazik bir rica kur („Could you …, please?“)",
        "Ne zaman evde olduğunu yaz",
      ],
      minWords: 45,
      phrases: [
        { de: "There's a leak in the …", tr: "…-de su sızıyor", en: "There's a leak in the …" },
        { de: "The heating hasn't worked since …", tr: "Kalorifer …-den beri çalışmıyor", en: "The heating hasn't worked since …" },
        { de: "Sorry to bother you, but …", tr: "Rahatsız ettim ama …", en: "Sorry to bother you, but …" },
        { de: "Could you send someone today?", tr: "Bugün birini gönderebilir misiniz?", en: "Could you send someone today?" },
        { de: "I am at home until …", tr: "…-e kadar evdeyim", en: "I am at home until …" },
      ],
      sample:
        "Dear Mr. Vogt,\n\nSorry to bother you, but there's a leak in the kitchen. The water comes from the pipe under the cupboard and the damage is getting worse. The heating hasn't worked since Monday, either.\n\nCould you send someone today or tomorrow, please? I am at home until two o'clock, and after five I am at home again.\n\nThank you very much\nA. Demir, second floor",
    },
  },

  {
    level: "A2",
    index: 4,
    code: "A2.5",
    titleDe: "Working life",
    titleTr: "İş hayatı",
    focus: [
      { de: "Present perfect + past simple", tr: "deneyim anlatmak" },
      { de: "Could I …? / Would it be possible …?", tr: "izin ve rica" },
      { de: "I agree / I think we should …", tr: "toplantıda görüş bildirmek" },
      { de: "Formal email phrases", tr: "iş yazışması kalıpları" },
    ],
    canDo: [
      { de: "I can understand a job ad.", tr: "Bir iş ilanını anlayabiliyorum.", en: "I can understand a job ad." },
      { de: "I can talk about my experience in an interview.", tr: "Mülakatta deneyimimi anlatabiliyorum.", en: "I can talk about my experience in an interview." },
      { de: "I can ask for a day off and give a reason.", tr: "İzin isteyip gerekçesini söyleyebiliyorum.", en: "I can ask for a day off and give a reason." },
      { de: "I can say my opinion in a short meeting.", tr: "Kısa bir toplantıda görüşümü söyleyebiliyorum.", en: "I can say my opinion in a short meeting." },
      { de: "I can write a short work email.", tr: "Kısa bir iş e-postası yazabiliyorum.", en: "I can write a short work email." },
    ],
    listening: {
      title: "At the interview",
      titleTr: "Mülakatta",
      situation: "Bir aday iş görüşmesinde deneyimini anlatıyor.",
      turns: [
        { speaker: "Manager", de: "Good morning. Please introduce yourself.", tr: "Günaydın. Lütfen kendinizi tanıtın." },
        { speaker: "Selin", de: "My name is Selin Kaya. I have worked in a big company for four years.", tr: "Adım Selin Kaya. Dört yıldır büyük bir şirkette çalışıyorum." },
        { speaker: "Manager", de: "What was your position there?", tr: "Oradaki göreviniz neydi?" },
        { speaker: "Selin", de: "I organized projects and I worked with a team of ten people.", tr: "Projeleri organize ettim ve on kişilik bir ekiple çalıştım." },
        { speaker: "Manager", de: "And what is your greatest strength?", tr: "En güçlü yanınız ne?" },
        { speaker: "Selin", de: "My greatest strength is working with customers. I am also interested in learning new skills.", tr: "En güçlü yanım müşterilerle çalışmak. Yeni beceriler öğrenmek de ilgimi çekiyor." },
        { speaker: "Manager", de: "Good. When can you start?", tr: "Güzel. Ne zaman başlayabilirsiniz?" },
        { speaker: "Selin", de: "I can start on the first of April.", tr: "Nisanın birinde başlayabilirim." },
      ],
      questions: [
        { de: "How long has Selin worked in a big company?", tr: "Selin büyük bir şirkette ne zamandan beri çalışıyor?", options: ["For two years", "For four years", "Since April", "For ten years"], answer: 1 },
        { de: "What did Selin do in her job?", tr: "Selin işinde ne yaptı?", options: ["She organized projects", "She answered the phone", "She was a teacher", "She worked alone"], answer: 0 },
        { de: "When can Selin start?", tr: "Selin ne zaman başlayabilir?", options: ["Tomorrow", "On the first of April", "Next year", "After four years"], answer: 1 },
      ],
    },
    reading: {
      title: "We are looking for a colleague",
      titleTr: "İş ilanı",
      genre: "İlan",
      text: "WE ARE LOOKING FOR A COLLEAGUE\n\nPosition: office worker, full-time\nStart: 1 April\n\nYour tasks:\n· answer emails and check reports\n· organize meetings for the team\n· help our customers on the phone\n\nRequired: two years of experience in an office. English is important, and you should be able to work in a team.\n\nWe offer a good salary and a coffee break with nice colleagues.\n\nPlease apply before 15 March.",
      questions: [
        { de: "What experience is required?", tr: "Hangi deneyim isteniyor?", options: ["Two years in an office", "Four years in a team", "No experience", "Experience abroad"], answer: 0 },
        { de: "When does the job start?", tr: "İş ne zaman başlıyor?", options: ["On 15 March", "On 1 April", "Next year", "Immediately"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "Mülakatta deneyimini anlatıyorsun.", de: "I have worked in a team for three years and I organized projects.", tr: "Üç yıldır bir ekiple çalışıyorum ve projeleri organize ettim." },
      { situation: "Şefinden izin istiyorsun.", de: "Could I take a day off on Friday? I have an appointment.", tr: "Cuma günü izin alabilir miyim? Randevum var." },
    ],
    writing: {
      prompt: "Bir iş ilanına kısa bir başvuru e-postası yaz.",
      checklist: [
        "Hangi iş için yazdığını yaz",
        "Deneyimini yaz („I have worked …“)",
        "Ne zaman başlayabileceğini yaz",
        "Resmî bir kapanış kullan („Best regards“)",
      ],
      minWords: 50,
      phrases: [
        { de: "I want to apply for this job.", tr: "Bu iş için başvurmak istiyorum.", en: "I want to apply for this job." },
        { de: "I have worked at … for … years.", tr: "… yıldır …-de çalışıyorum", en: "I have worked at … for … years." },
        { de: "My greatest strength is …", tr: "En güçlü yanım …", en: "My greatest strength is …" },
        { de: "I can start on …", tr: "…-de başlayabilirim", en: "I can start on …" },
        { de: "Best regards,", tr: "Saygılarımla,", en: "Best regards," },
      ],
      sample:
        "Dear Mrs. Renner,\n\nI want to apply for the position of office worker. I read your ad yesterday and the tasks are very interesting for me.\n\nI have worked at a big company for four years. I organized meetings, I checked reports and I helped customers on the phone every day. My greatest strength is working in a team.\n\nI can start on the first of April. I have attached my documents. Could you tell me when the interview is?\n\nBest regards,\nSelin Kaya",
    },
  },

  {
    level: "A2",
    index: 5,
    code: "A2.6",
    titleDe: "Shopping and services",
    titleTr: "Alışveriş ve hizmetler",
    focus: [
      { de: "I'd like to return / exchange …", tr: "iade ve değişim" },
      { de: "Present perfect: Has it arrived yet?", tr: "sipariş takibi" },
      { de: "Comparatives: cheaper than", tr: "teklifleri karşılaştırmak" },
      { de: "It's still under warranty", tr: "garanti dili" },
    ],
    canDo: [
      { de: "I can return a product and ask for a refund.", tr: "Bir ürünü iade edip para iadesi isteyebiliyorum.", en: "I can return a product and ask for a refund." },
      { de: "I can complain about a damaged item politely.", tr: "Hasarlı bir ürünü nazikçe şikâyet edebiliyorum.", en: "I can complain about a damaged item politely." },
      { de: "I can track an order and ask about the delivery.", tr: "Siparişimi takip edip teslimatı sorabiliyorum.", en: "I can track an order and ask about the delivery." },
      { de: "I can compare two offers and choose one.", tr: "İki teklifi karşılaştırıp birini seçebiliyorum.", en: "I can compare two offers and choose one." },
      { de: "I can ask if something is still under warranty.", tr: "Bir şeyin garantisi var mı diye sorabiliyorum.", en: "I can ask if something is still under warranty." },
    ],
    listening: {
      title: "There's a problem with this phone",
      titleTr: "Telefonda bir sorun var",
      situation: "Bir müşteri bozuk bir telefonu mağazaya getiriyor.",
      turns: [
        { speaker: "Customer", de: "Good afternoon. There's a problem with this smartphone.", tr: "İyi günler. Bu telefonda bir sorun var." },
        { speaker: "Clerk", de: "What is the problem with it?", tr: "Nesi var?" },
        { speaker: "Customer", de: "The screen is damaged and it doesn't charge. I bought it three weeks ago.", tr: "Ekran hasarlı ve şarj olmuyor. Üç hafta önce almıştım." },
        { speaker: "Clerk", de: "Do you have the receipt with you?", tr: "Fişiniz var mı?" },
        { speaker: "Customer", de: "Yes, here it is. Could you replace it, please? It's still under warranty.", tr: "Evet, buyurun. Değiştirebilir misiniz? Hâlâ garantisi var." },
        { speaker: "Clerk", de: "We can repair it in five days, or you can choose a refund.", tr: "Beş günde onarabiliriz ya da para iadesi seçebilirsiniz." },
        { speaker: "Customer", de: "I'd like a refund, please. Then I can buy a cheaper one.", tr: "Para iadesi istiyorum lütfen. Sonra daha ucuzunu alabilirim." },
      ],
      questions: [
        { de: "What is the problem with the phone?", tr: "Telefonda sorun ne?", options: ["The screen is damaged", "It is too expensive", "The size is wrong", "It arrived late"], answer: 0 },
        { de: "When did the customer buy the phone?", tr: "Müşteri telefonu ne zaman aldı?", options: ["Yesterday", "Three weeks ago", "Five days ago", "Last year"], answer: 1 },
        { de: "What does the customer choose?", tr: "Müşteri neyi seçiyor?", options: ["A repair", "A refund", "A bigger phone", "A new charger"], answer: 1 },
      ],
    },
    reading: {
      title: "Two offers for your phone",
      titleTr: "İki telefon teklifi",
      genre: "Karşılaştırma tablosu",
      text: "TWO OFFERS — WHICH ONE IS BETTER FOR YOU?\n\nOFFER A\nMonthly payment: 15\nData: 5 GB\nContract: 24 months\nYou can cancel after 24 months.\n\nOFFER B\nMonthly payment: 22\nData: 20 GB\nContract: 12 months\nYou can cancel every month.\n\nOffer A is cheaper than Offer B, but you get more data with Offer B.\n\nIs there a discount? Yes: students pay only ten every month with both offers.",
      questions: [
        { de: "Which offer is cheaper?", tr: "Hangi teklif daha ucuz?", options: ["Offer A", "Offer B", "Both are the same", "The text doesn't say"], answer: 0 },
        { de: "What is the advantage of Offer B?", tr: "B teklifinin avantajı ne?", options: ["More data", "A longer contract", "A free phone", "No payment"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Mağazada bir ürünü iade ediyorsun.", de: "I'd like to return this item. Can I get a refund, please?", tr: "Bu ürünü iade etmek istiyorum. Para iadesi alabilir miyim?" },
      { situation: "Siparişini takip ediyorsun.", de: "I ordered a book last week. Has it arrived yet?", tr: "Geçen hafta bir kitap sipariş ettim. Geldi mi?" },
    ],
    writing: {
      prompt: "Hasarlı gelen bir sipariş için müşteri hizmetlerine kısa bir e-posta yaz.",
      checklist: [
        "Ne sipariş ettiğini ve ne zaman aldığını yaz",
        "Sorunun ne olduğunu yaz",
        "Ne istediğini yaz (değişim, iade, para iadesi)",
        "Ne zamana kadar cevap beklediğini yaz",
      ],
      minWords: 50,
      phrases: [
        { de: "I ordered … two weeks ago.", tr: "İki hafta önce … sipariş ettim", en: "I ordered … two weeks ago." },
        { de: "There's a problem with …", tr: "…-de bir sorun var", en: "There's a problem with …" },
        { de: "Could you replace it, please?", tr: "Değiştirebilir misiniz lütfen?", en: "Could you replace it, please?" },
        { de: "I'd like a refund, please.", tr: "Para iadesi istiyorum lütfen.", en: "I'd like a refund, please." },
        { de: "It's still under warranty.", tr: "Hâlâ garantisi var.", en: "It's still under warranty." },
      ],
      sample:
        "Dear Sir or Madam,\n\nI ordered a coffee machine on your website two weeks ago and the package arrived on Monday. There's a problem with it: the box was damaged and the machine doesn't work.\n\nI have the receipt and the product is still under warranty. Could you replace it, please? A refund is also fine for me, but I don't want a repair, because I have already waited for two weeks.\n\nCould you answer this week, please?\n\nBest regards,\nD. Kaya",
    },
  },

  {
    level: "A2",
    index: 6,
    code: "A2.7",
    titleDe: "Traveling",
    titleTr: "Seyahat",
    focus: [
      { de: "I'd like to book …", tr: "rezervasyon dili" },
      { de: "Could I have …, please?", tr: "resmî nazik rica" },
      { de: "Does the price include …?", tr: "neyin dâhil olduğunu sormak" },
      { de: "How about …-ing?", tr: "öneri sunmak" },
    ],
    canDo: [
      { de: "I can book a room and confirm a reservation.", tr: "Oda ayırtıp rezervasyonu teyit edebiliyorum.", en: "I can book a room and confirm a reservation." },
      { de: "I can check in at a hotel.", tr: "Otele giriş yapabiliyorum.", en: "I can check in at a hotel." },
      { de: "I can ask the way in a foreign city.", tr: "Yabancı bir şehirde yol sorabiliyorum.", en: "I can ask the way in a foreign city." },
      { de: "I can report a travel problem: a delay or lost luggage.", tr: "Yolculuk aksiliğini bildirebiliyorum: rötar, kayıp bagaj.", en: "I can report a travel problem: a delay or lost luggage." },
      { de: "I can suggest what to visit.", tr: "Nereyi gezeceğimizi önerebiliyorum.", en: "I can suggest what to visit." },
    ],
    listening: {
      title: "Hotel check-in",
      titleTr: "Otele giriş",
      situation: "Bir konuk otelde giriş yapıyor ve odayı soruyor.",
      turns: [
        { speaker: "Guest", de: "Good evening. I have a reservation under the name Aydin.", tr: "İyi akşamlar. Aydın adına rezervasyonum var." },
        { speaker: "Receptionist", de: "Good evening. A double room for three nights, is that right?", tr: "İyi akşamlar. Üç gece iki kişilik oda, doğru mu?" },
        { speaker: "Guest", de: "Yes. Does the price include breakfast?", tr: "Evet. Fiyata kahvaltı dâhil mi?" },
        { speaker: "Receptionist", de: "Yes, breakfast is from seven to ten. Here is your room key — room 204.", tr: "Evet, kahvaltı yediden ona kadar. Oda anahtarınız — 204." },
        { speaker: "Guest", de: "Thank you. There aren't any towels in the bathroom.", tr: "Teşekkürler. Banyoda havlu yok." },
        { speaker: "Receptionist", de: "I'm sorry. I'll send some towels immediately.", tr: "Özür dilerim. Hemen havlu göndereceğim." },
        { speaker: "Guest", de: "And how about a bus tour? Is the castle worth visiting?", tr: "Bir de otobüs turu nasıl olur? Kale gezmeye değer mi?" },
      ],
      questions: [
        { de: "How many nights is the reservation for?", tr: "Rezervasyon kaç gece için?", options: ["Two nights", "Three nights", "Seven nights", "One night"], answer: 1 },
        { de: "What problem does the guest report?", tr: "Konuk hangi sorunu bildiriyor?", options: ["There aren't any towels", "The key doesn't work", "Breakfast isn't included", "The room is too small"], answer: 0 },
        { de: "Is breakfast included in the price?", tr: "Kahvaltı fiyata dâhil mi?", options: ["Yes, it is", "No, it isn't", "Only for two people", "Only after ten"], answer: 0 },
      ],
    },
    reading: {
      title: "Your reservation",
      titleTr: "Rezervasyon onayı",
      genre: "Rezervasyon onayı",
      text: "YOUR RESERVATION — PLEASE KEEP THIS EMAIL\n\nName: N. Aydin\nRoom: double room, room 204\nArrive: Friday, 12 May, after two o'clock\nLeave: Monday, 15 May, before eleven\nNights: 3\nPrice: 240 — breakfast is included\n\nWe are five minutes from the train station. Go straight and turn left at the corner; the hotel is opposite the museum.\n\nIf you want to cancel, please write to us two days before you arrive.",
      questions: [
        { de: "When do they leave the hotel?", tr: "Konuk otelden ne zaman çıkıyor?", options: ["On Friday", "On Monday before eleven", "After three nights at two o'clock", "On 12 May"], answer: 1 },
        { de: "Where is the hotel?", tr: "Otel nerede?", options: ["At the train station", "Opposite the museum", "In the castle", "Next to the airport"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "Otelde oda ayırtıyorsun.", de: "I'd like to book a double room for two nights, please.", tr: "İki gece için iki kişilik bir oda ayırtmak istiyorum." },
      { situation: "Havaalanında bir aksiliği bildiriyorsun.", de: "My flight is delayed and I have missed my connection.", tr: "Uçuşum rötarlı ve aktarmamı kaçırdım." },
    ],
    writing: {
      prompt: "Bir otele oda ayırtmak için kısa bir e-posta yaz.",
      checklist: [
        "Hangi oda ve kaç gece olduğunu yaz",
        "Hangi tarihte geleceğini yaz",
        "Fiyata neyin dâhil olduğunu sor",
        "Otelin nerede olduğunu sor",
      ],
      minWords: 45,
      phrases: [
        { de: "I'd like to book a room for … nights.", tr: "… gece için oda ayırtmak istiyorum", en: "I'd like to book a room for … nights." },
        { de: "Could I have a room with …, please?", tr: "…-li bir oda alabilir miyim?", en: "Could I have a room with …, please?" },
        { de: "Does the price include breakfast?", tr: "Fiyata kahvaltı dâhil mi?", en: "Does the price include breakfast?" },
        { de: "How do I get to the hotel?", tr: "Otele nasıl gelirim?", en: "How do I get to the hotel?" },
        { de: "Could you confirm the reservation?", tr: "Rezervasyonu teyit edebilir misiniz?", en: "Could you confirm the reservation?" },
      ],
      sample:
        "Dear Sir or Madam,\n\nI'd like to book a double room for three nights, from Friday 12 May to Monday 15 May. Could I have a room with a view, please? We arrive in the evening, at about eight o'clock.\n\nDoes the price include breakfast? And how do I get to the hotel from the airport — is there a bus?\n\nCould you confirm the reservation by email, please?\n\nBest regards,\nN. Aydin",
    },
  },

  {
    level: "A2",
    index: 7,
    code: "A2.8",
    titleDe: "Celebrations and people",
    titleTr: "Kutlamalar ve ilişkiler",
    focus: [
      { de: "Would you like to come?", tr: "davet etmek" },
      { de: "I'd love to, but I can't", tr: "nazikçe reddetmek" },
      { de: "Present perfect: We have been friends for …", tr: "süregelen ilişki" },
      { de: "Congratulations / Good luck", tr: "kutlama ve dilek kalıpları" },
    ],
    canDo: [
      { de: "I can invite someone to a celebration.", tr: "Birini bir kutlamaya davet edebiliyorum.", en: "I can invite someone to a celebration." },
      { de: "I can say no to an invitation politely.", tr: "Bir daveti nazikçe reddedebiliyorum.", en: "I can say no to an invitation politely." },
      { de: "I can congratulate someone and wish them luck.", tr: "Birini tebrik edip şans dileyebiliyorum.", en: "I can congratulate someone and wish them luck." },
      { de: "I can say sorry when I am late or forget something.", tr: "Geç kaldığımda ya da bir şeyi unuttuğumda özür dileyebiliyorum.", en: "I can say sorry when I am late or forget something." },
      { de: "I can talk about my family and my friends.", tr: "Ailemden ve arkadaşlarımdan bahsedebiliyorum.", en: "I can talk about my family and my friends." },
    ],
    listening: {
      title: "Would you like to come?",
      titleTr: "Gelmek ister misin?",
      situation: "Nuray arkadaşını bir kutlamaya davet ediyor.",
      turns: [
        { speaker: "Nuray", de: "My sister is getting married on Saturday. Would you like to come?", tr: "Kız kardeşim cumartesi evleniyor. Gelmek ister misin?" },
        { speaker: "Jonas", de: "Congratulations! I'd love to, but I can't — I am away this week.", tr: "Tebrikler! Çok isterdim ama gelemem, bu hafta şehir dışındayım." },
        { speaker: "Nuray", de: "What a pity! The wedding is in a garden and there is music and dancing.", tr: "Ne yazık! Düğün bahçede, müzik ve dans da var." },
        { speaker: "Jonas", de: "I am sorry about that. Have you bought a present yet?", tr: "Üzüldüm. Hediye aldın mı?" },
        { speaker: "Nuray", de: "I haven't bought a present yet. I have no idea what to buy!", tr: "Henüz almadım. Ne alacağımı hiç bilmiyorum!" },
        { speaker: "Jonas", de: "How about a photograph of the family? My cousin got one for her wedding and she loved it.", tr: "Ailenin bir fotoğrafı nasıl olur? Kuzenime düğününde bir tane verdiler, çok sevdi." },
        { speaker: "Nuray", de: "That's a lovely idea. Thank you for your help!", tr: "Çok güzel bir fikir. Yardımın için teşekkürler!" },
      ],
      questions: [
        { de: "Why can't Jonas come?", tr: "Jonas neden gelemiyor?", options: ["He is ill", "He is away this week", "He doesn't like weddings", "He has no present"], answer: 1 },
        { de: "Where is the wedding?", tr: "Düğün nerede?", options: ["In a garden", "In a hotel", "At home", "In a restaurant"], answer: 0 },
        { de: "What does Jonas suggest as a present?", tr: "Jonas hediye olarak ne öneriyor?", options: ["A photograph of the family", "Sweets", "A dress", "Roses"], answer: 0 },
      ],
    },
    reading: {
      title: "You are invited",
      titleTr: "Davetiye",
      genre: "Davetiye",
      text: "YOU ARE INVITED\n\nWe are getting married!\n\nAyse and Mert\nSaturday, 18 June, at four o'clock\nIn the garden of the old school, Green Road 24\n\nAfter the wedding there is food, music and dancing until midnight.\n\nPlease don't bring a present — bring a photograph of us. We are making a book with them.\n\nPlease tell us before 1 June if you can come. Write to ayse.mert@mail.com or call us.",
      questions: [
        { de: "What do Ayse and Mert want from the guests?", tr: "Ayşe ve Mert konuklardan ne istiyor?", options: ["A present", "A photograph", "Food", "Money"], answer: 1 },
        { de: "Until when should the guests answer?", tr: "Konuklar ne zamana kadar cevap vermeli?", options: ["Until 1 June", "Until 18 June", "Until Saturday", "Until midnight"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Bir arkadaşını kutlamaya davet ediyorsun.", de: "We are celebrating my birthday on Saturday. Would you like to come?", tr: "Cumartesi doğum günümü kutluyoruz. Gelmek ister misin?" },
      { situation: "Bir daveti nazikçe reddediyorsun.", de: "I'd love to, but I can't come — I am away this weekend.", tr: "Çok isterdim ama gelemem, bu hafta sonu şehir dışındayım." },
    ],
    writing: {
      prompt: "Bir kutlamadan sonra ev sahibine teşekkür eden kısa bir mesaj yaz.",
      checklist: [
        "Neye katıldığını yaz",
        "Neyi beğendiğini yaz",
        "Bir teşekkür cümlesi kur",
        "Bir sonraki buluşmayı öner",
      ],
      minWords: 45,
      phrases: [
        { de: "Thank you for the invitation.", tr: "Davet için teşekkürler.", en: "Thank you for the invitation." },
        { de: "I had a lot of fun.", tr: "Çok eğlendim.", en: "I had a lot of fun." },
        { de: "Congratulations on …", tr: "… için tebrikler", en: "Congratulations on …" },
        { de: "Thanks for helping me.", tr: "Yardım ettiğin için teşekkürler.", en: "Thanks for helping me." },
        { de: "Let's meet again soon.", tr: "Yakında yine buluşalım.", en: "Let's meet again soon." },
      ],
      sample:
        "Hi Ayse,\n\nThank you for the invitation! The wedding was wonderful and I had a lot of fun. The garden was beautiful and the music was excellent. Congratulations on your marriage — I am so proud of you both.\n\nI am sorry I was late. The bus left without me and I waited twenty minutes for the next one.\n\nThanks for helping me with the photographs. Let's meet again soon — are you free next Saturday?\n\nSee you\nNuray",
    },
  },

  {
    level: "A2",
    index: 8,
    code: "A2.9",
    titleDe: "Media and technology",
    titleTr: "Medya ve teknoloji",
    focus: [
      { de: "First …, then …, after that …", tr: "adım adım yönerge" },
      { de: "Have you seen / heard …?", tr: "haber ve öneri sormak" },
      { de: "I think / I agree / It depends", tr: "görüş bildirmek" },
      { de: "should / shouldn't for safety", tr: "güvenlik öğüdü" },
    ],
    canDo: [
      { de: "I can explain how to use an app step by step.", tr: "Bir uygulamanın nasıl kullanıldığını adım adım anlatabiliyorum.", en: "I can explain how to use an app step by step." },
      { de: "I can describe a problem with my computer or phone.", tr: "Bilgisayar ya da telefon sorunumu anlatabiliyorum.", en: "I can describe a problem with my computer or phone." },
      { de: "I can recommend a series or a film.", tr: "Bir dizi ya da film önerebiliyorum.", en: "I can recommend a series or a film." },
      { de: "I can say what I think about technology.", tr: "Teknoloji hakkında ne düşündüğümü söyleyebiliyorum.", en: "I can say what I think about technology." },
      { de: "I can give advice about passwords and safety.", tr: "Şifre ve güvenlik konusunda öğüt verebiliyorum.", en: "I can give advice about passwords and safety." },
    ],
    listening: {
      title: "My computer is very slow",
      titleTr: "Bilgisayarım çok yavaş",
      situation: "İki arkadaş görüntülü görüşmede bir bilgisayar sorununu çözüyor.",
      turns: [
        { speaker: "Sara", de: "Can you hear me? My camera doesn't work today.", tr: "Beni duyuyor musun? Kameram bugün çalışmıyor." },
        { speaker: "Deniz", de: "I can hear you, but I can't see you. What is the problem?", tr: "Seni duyuyorum ama göremiyorum. Sorun ne?" },
        { speaker: "Sara", de: "My computer is very slow and the camera is off. I have already restarted it.", tr: "Bilgisayarım çok yavaş ve kamera kapalı. Yeniden başlattım bile." },
        { speaker: "Deniz", de: "First open Settings, then choose the camera. Is it on?", tr: "Önce Ayarlar'ı aç, sonra kamerayı seç. Açık mı?" },
        { speaker: "Sara", de: "No, it isn't. I have pressed the button twice and nothing happens.", tr: "Hayır, değil. Düğmeye iki kez bastım, hiçbir şey olmuyor." },
        { speaker: "Deniz", de: "Then you should update the program. It takes ten minutes.", tr: "O zaman programı güncellemelisin. On dakika sürüyor." },
        { speaker: "Sara", de: "I'll try it now. Sorry, could you say that again?", tr: "Şimdi deneyeceğim. Kusura bakma, tekrar söyler misin?" },
      ],
      questions: [
        { de: "What is the problem?", tr: "Sorun ne?", options: ["The camera doesn't work", "The battery is low", "The headphones are broken", "There is no connection"], answer: 0 },
        { de: "What has Sara already done?", tr: "Sara daha önce neyi denemiş?", options: ["She has updated the program", "She has restarted the computer", "She has called the shop", "She has bought a new camera"], answer: 1 },
        { de: "What should Sara do now?", tr: "Sara şimdi ne yapmalı?", options: ["Update the program", "Press the button again", "Use the phone", "Wait for one hour"], answer: 0 },
      ],
    },
    reading: {
      title: "A useful app for the bus",
      titleTr: "Uygulama tanıtımı",
      genre: "Tanıtım yazısı",
      text: "CITY BUS — a free app for your phone\n\nWhat is it for? You can see when your bus arrives and you can buy a ticket on your phone.\n\nHow does it work? First download the app, then create an account with your email address. After that choose your city.\n\nMany people say the app is very useful, but some people think the map is too slow.\n\nSafety: you should use a long password. You shouldn't share it with other people.",
      questions: [
        { de: "What can you do with the app?", tr: "Uygulamayla ne yapabilirsin?", options: ["Buy a ticket on your phone", "Call the bus driver", "Watch a series", "Download a map of the city"], answer: 0 },
        { de: "What do some people think?", tr: "Bazı kullanıcılar ne düşünüyor?", options: ["The app is not free", "The map is too slow", "The account is not safe", "The app is boring"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "Bir arkadaşına uygulamayı nasıl kullanacağını anlatıyorsun.", de: "First download the app, then create an account with your email.", tr: "Önce uygulamayı indir, sonra e-postanla bir hesap oluştur." },
      { situation: "Teknoloji hakkındaki görüşünü söylüyorsun.", de: "I think phones are useful, but it depends on the app.", tr: "Bence telefonlar faydalı ama uygulamaya bağlı." },
    ],
    writing: {
      prompt: "Bir arkadaşına bir uygulamanın nasıl kullanıldığını adım adım anlatan bir mesaj yaz.",
      checklist: [
        "Uygulamanın ne işe yaradığını yaz",
        "Adımları sırala (First …, then …, after that …)",
        "Bir güvenlik öğüdü yaz („You should …“)",
        "Kendi görüşünü yaz",
      ],
      minWords: 45,
      phrases: [
        { de: "I use this app to …", tr: "Bu uygulamayı … için kullanıyorum", en: "I use this app to …" },
        { de: "First open …, then choose …", tr: "Önce …'i aç, sonra …'i seç", en: "First open …, then choose …" },
        { de: "After that, press the button.", tr: "Ardından düğmeye bas.", en: "After that, press the button." },
        { de: "You should change your password.", tr: "Şifreni değiştirmelisin.", en: "You should change your password." },
        { de: "I think it is very useful.", tr: "Bence çok faydalı.", en: "I think it is very useful." },
      ],
      sample:
        "Hi Mert,\n\nI use this app to buy bus tickets, and it is free. It is very easy: first download it, then create an account with your email address. After that choose our city and press the green button.\n\nYou should use a long password and you shouldn't share it with other people. Be careful with public wifi, too.\n\nI think the app is very useful, but the map is sometimes slow. It depends on your connection. Have you tried it yet?\n\nSee you\nSara",
    },
  },

  {
    level: "A2",
    index: 9,
    code: "A2.10",
    titleDe: "Offices and official business",
    titleTr: "Şehir ve resmî işler",
    focus: [
      { de: "I'd like to register, please", tr: "resmî işlem dili" },
      { de: "Could you tell me where … is?", tr: "dolaylı soru" },
      { de: "I have already filled in the form", tr: "yapılanı bildirmek" },
      { de: "I expect an answer within a week", tr: "süre tanımak" },
    ],
    canDo: [
      { de: "I can register at an office and take a number.", tr: "Bir kurumda kayıt yaptırıp sıra numarası alabiliyorum.", en: "I can register at an office and take a number." },
      { de: "I can fill in a form and spell my name.", tr: "Bir formu doldurup adımı harf harf söyleyebiliyorum.", en: "I can fill in a form and spell my name." },
      { de: "I can report a lost wallet to the police.", tr: "Polise kayıp cüzdan bildirebiliyorum.", en: "I can report a lost wallet to the police." },
      { de: "I can book an official appointment.", tr: "Resmî bir randevu alabiliyorum.", en: "I can book an official appointment." },
      { de: "I can make a complaint and ask for an answer.", tr: "Şikâyet edip cevap isteyebiliyorum.", en: "I can make a complaint and ask for an answer." },
    ],
    listening: {
      title: "At the city hall",
      titleTr: "Belediyede",
      situation: "Bir kişi belediyede oturma izni için başvuruyor.",
      turns: [
        { speaker: "Visitor", de: "Good morning. I want to apply for a residence permit.", tr: "Günaydın. Oturma izni için başvurmak istiyorum." },
        { speaker: "Officer", de: "Have you taken a number?", tr: "Sıra numarası aldınız mı?" },
        { speaker: "Visitor", de: "Yes, I have already taken a number. And I have already filled in the form.", tr: "Evet, numara aldım. Formu da doldurdum." },
        { speaker: "Officer", de: "Good. Could you spell your surname, please?", tr: "Güzel. Soyadınızı harf harf söyler misiniz?" },
        { speaker: "Visitor", de: "Y-I-L-M-A-Z. My passport is valid until 2030.", tr: "Y-I-L-M-A-Z. Pasaportum 2030'a kadar geçerli." },
        { speaker: "Officer", de: "We also need an official copy of your contract. Do you have it with you?", tr: "Sözleşmenizin resmî bir kopyası da gerekiyor. Yanınızda mı?" },
        { speaker: "Visitor", de: "No. Could you tell me where I can make a copy?", tr: "Hayır. Nerede fotokopi çekebileceğimi söyler misiniz?" },
        { speaker: "Officer", de: "On the ground floor, next to the entrance. Then come back to counter four.", tr: "Zemin katta, girişin yanında. Sonra dört numaralı gişeye dönün." },
      ],
      questions: [
        { de: "What does the visitor want?", tr: "Kişi ne istiyor?", options: ["A residence permit", "A transport card", "A library card", "A new passport"], answer: 0 },
        { de: "What has the visitor already done?", tr: "Kişi neyi önceden halletmiş?", options: ["Made a copy", "Filled in the form", "Paid the fine", "Called the office"], answer: 1 },
        { de: "Where can the visitor make a copy?", tr: "Kişi nerede fotokopi çekebilir?", options: ["At counter four", "On the ground floor", "In the library", "At the police station"], answer: 1 },
      ],
    },
    reading: {
      title: "Residence permit — what you need",
      titleTr: "Resmî bilgi yazısı",
      genre: "Resmî yazı",
      text: "RESIDENCE PERMIT — WHAT YOU NEED\n\nPlease bring these documents to counter four:\n\n1. a valid ID card or passport\n2. the form, filled in and signed\n3. an official copy of your contract\n4. proof of your address\n\nYou have to book an appointment in advance. Appointments are available from Monday to Thursday, from eight to twelve.\n\nYou can renew your permit three months before the date on the card.",
      questions: [
        { de: "How many documents do you have to bring?", tr: "Kaç belge getirmek gerekiyor?", options: ["Two", "Three", "Four", "Five"], answer: 2 },
        { de: "When are appointments available?", tr: "Randevular ne zaman var?", options: ["From Monday to Thursday", "Every day", "Only on Friday", "In the afternoon"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Kurumda ne istediğini söylüyorsun.", de: "I'd like to register, please. I have already taken a number.", tr: "Kayıt yaptırmak istiyorum. Sıra numarası aldım." },
      { situation: "Kayıp bildiriyorsun.", de: "I have lost my wallet. I think it happened at about six o'clock.", tr: "Cüzdanımı kaybettim. Sanırım saat altı civarında oldu." },
    ],
    writing: {
      prompt: "Bir kuruma resmî bir şikâyet e-postası yaz.",
      checklist: [
        "Neyi şikâyet ettiğini yaz",
        "Ne zamandır beklediğini yaz",
        "Hangi belgeleri gönderdiğini yaz",
        "Ne zamana kadar cevap beklediğini yaz",
      ],
      minWords: 50,
      phrases: [
        { de: "I would like to make a complaint about …", tr: "… hakkında şikâyet etmek istiyorum", en: "I would like to make a complaint about …" },
        { de: "I have waited for three weeks.", tr: "Üç haftadır bekliyorum.", en: "I have waited for three weeks." },
        { de: "I have already sent the documents.", tr: "Belgeleri zaten gönderdim.", en: "I have already sent the documents." },
        { de: "Could you tell me what I should do?", tr: "Ne yapmam gerektiğini söyler misiniz?", en: "Could you tell me what I should do?" },
        { de: "I expect an answer within a week.", tr: "Bir hafta içinde cevap bekliyorum.", en: "I expect an answer within a week." },
      ],
      sample:
        "Dear Sir or Madam,\n\nI would like to make a complaint about my application for a residence permit. I was at counter four on 3 April and I have already sent all the documents: the form, an official copy of my contract and proof of my address.\n\nI have waited for three weeks and I haven't received an answer yet. My old permit is only valid until 30 May, so the situation is urgent for me.\n\nCould you tell me what I should do? I expect an answer within a week.\n\nBest regards,\nE. Yilmaz",
    },
  },
];
