import type { MockPaper } from "../types";

/**
 * A1 · Deneme 4 — "School, Health and the Weekend".
 *
 * A1'in dört kâğıdı aynı planda; konular birbirini tekrar etmiyor. Bu
 * dördüncüsü okul, sağlık ve hafta sonunu birleştiriyor — gün, saat ve
 * randevu bilgisinin en yoğun olduğu alan, dolayısıyla A1'in kendi ölçütleri
 * doğal olarak sınanıyor.
 *
 * A1 SINIRI: present simple ve `be`, `can`, `there is/are`, temel edatlar,
 * en sık düzensiz fiillerin geçmiş biçimi. Present perfect, edilgen, ilgi
 * cümlesi ve koşul cümlesi yok.
 */
export const EN_A1_04: MockPaper = {
  id: "en-a1-04",
  course: "en",
  level: "A1",
  no: 4,
  theme: "School, Health and the Weekend",
  themeTr: "Okul, sağlık ve hafta sonu",
  minutes: 85,
  parts: [
    /* ── READING ───────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 30,
      instruction:
        "This part has four tasks. You read short messages, notices and signs, and you complete a short text. Choose the correct answer for each question.",
      instructionTr:
        "Bu bölümde dört görev var. Kısa iletiler, duyurular ve levhalar okuyacak, sonra kısa bir metni tamamlayacaksın. Her soruda doğru cevabı işaretle.",
      tasks: [
        {
          id: "en-a1-04-l1",
          no: 1,
          format: "truefalse",
          goal: "detail",
          prompt: "Read the two texts and questions 1 to 5. Are the sentences true or false?",
          promptTr: "İki metni ve 1–5. maddeleri oku. Cümleler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Message from school",
              genreTr: "Okuldan ileti",
              title: "To all parents",
              body: `Dear parents,

On Friday the children go to the museum. The bus leaves the school at 8.30.

Please give your child water and food for the day. We eat in the park.

The trip is free. The museum ticket costs 3 euros.

We come back at 4 in the afternoon.

Mrs Talia Roth`,
              gloss: [
                { de: "the trip", tr: "gezi", en: "trip" },
                { de: "to leave", tr: "hareket etmek", en: "to leave" },
                { de: "parents", tr: "anne baba", en: "parents" },
              ],
            },
            {
              kind: "text",
              id: "t2",
              genre: "Note at the doctor's",
              genreTr: "Doktordaki not",
              title: "For our patients",
              body: `Doctor Otto is not here from 12 to 15 July.

Doctor Pelin works in this house on those days. Her room is number 4.

For a new appointment please call us. Do not write an email; we are slow with email.

In the night and at the weekend, call 112.`,
              gloss: [
                { de: "an appointment", tr: "randevu", en: "appointment" },
                { de: "slow", tr: "yavaş", en: "slow" },
                { de: "a patient", tr: "hasta", en: "patient" },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-04-l1-1",
              no: 1,
              ref: "t1",
              text: "The children eat in the museum.",
              answer: false,
              explain:
                "İleti yeri açıkça söylüyor: «We eat in the park». Müze gezinin gittiği yer ama yemek parkta yeniyor; iki yeri karıştıran öğrenci yanılır.",
            },
            {
              kind: "bool",
              id: "en-a1-04-l1-2",
              no: 2,
              ref: "t1",
              text: "Parents pay three euros for the museum.",
              answer: true,
              explain:
                "İletide iki fiyat bilgisi var: gezi ücretsiz ama «The museum ticket costs 3 euros». Ücretsiz olan otobüs yolculuğu, müze bileti değil; madde ikisini ayırmayı ölçüyor.",
            },
            {
              kind: "bool",
              id: "en-a1-04-l1-3",
              no: 3,
              ref: "t1",
              text: "The bus goes back at half past eight.",
              answer: false,
              explain:
                "8.30 gidiş saati: «The bus leaves the school at 8.30». Dönüş öğleden sonra dörtte. A1'de saat okumak ölçülüyor ama saatin hangi yöne ait olduğunu da görmek gerekiyor.",
            },
            {
              kind: "bool",
              id: "en-a1-04-l1-4",
              no: 4,
              ref: "t2",
              text: "You can see a doctor on 13 July.",
              answer: true,
              explain:
                "13 Temmuz, Doktor Otto'nun olmadığı aralıkta (12–15) ama not devamı veriyor: «Doctor Pelin works in this house on those days». Yani o günlerde başka bir doktor var.",
            },
            {
              kind: "bool",
              id: "en-a1-04-l1-5",
              no: 5,
              ref: "t2",
              text: "You get an appointment with an email.",
              answer: false,
              explain:
                "Not tam tersini istiyor: «Do not write an email; we are slow with email». Randevu için telefon isteniyor. E-posta metinde geçiyor ama yasaklanan yol olarak.",
            },
          ],
        },
        {
          id: "en-a1-04-l2",
          no: 2,
          format: "mcq",
          goal: "orientation",
          prompt: "Read situations 6 to 10 and the three notices. Which place helps you?",
          promptTr: "6–10. durumları ve üç duyuruyu oku. Hangi yer sana uygun?",
          texts: [
            {
              kind: "text",
              id: "p1",
              genre: "Notice",
              genreTr: "Duyuru",
              title: "School Library",
              body: `Open Monday to Friday from 8 to 16.

Books, music and computers. You can work here or read here.

Please be quiet. No food and no drinks.

Children under ten come with a parent.`,
            },
            {
              kind: "text",
              id: "p2",
              genre: "Notice",
              genreTr: "Duyuru",
              title: "Saturday Sport Club",
              body: `Every Saturday from 10 to 12 in the school garden.

Football, basketball and games for all ages.

Two euros for one day. Water is free.

When it rains, we play in the big room.`,
            },
            {
              kind: "text",
              id: "p3",
              genre: "Notice",
              genreTr: "Duyuru",
              title: "Doctor Yannis — Family Practice",
              body: `Monday, Wednesday and Friday: 8 to 12 and 14 to 18.

Tuesday and Thursday: only in the morning.

Come without an appointment from 8 to 9.

For children we have a small room with toys.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-04-l2-6",
              no: 6,
              text: "You are ill on Tuesday afternoon and you want to see a doctor.",
              options: ["School Library", "Saturday Sport Club", "Doctor Yannis — Family Practice"],
              answer: 2,
              explain:
                "Yalnız üçüncü duyuru bir doktora ait. Salı için «only in the morning» yazıyor, yani öğleden sonra kapalı — ama soru hangi YERİN doktor olduğunu soruyor ve öteki iki duyuru sağlıkla hiç ilgili değil.",
            },
            {
              kind: "mcq",
              id: "en-a1-04-l2-7",
              no: 7,
              text: "You want to play football with other children.",
              options: ["School Library", "Saturday Sport Club", "Doctor Yannis — Family Practice"],
              answer: 1,
              explain:
                "Spor kulübü duyurusu «Football, basketball and games for all ages» diyor. Kütüphanede kitap ve bilgisayar var, oyun yok; muayenehanedeki oyuncak odası bekleyen çocuklar için.",
            },
            {
              kind: "mcq",
              id: "en-a1-04-l2-8",
              no: 8,
              text: "You want a quiet place to do your homework on Wednesday.",
              options: ["School Library", "Saturday Sport Club", "Doctor Yannis — Family Practice"],
              answer: 0,
              explain:
                "Kütüphane hafta içi 8–16 arası açık ve «Please be quiet» diyor; çalışmak için de «You can work here» yazıyor. Spor kulübü yalnız cumartesi.",
            },
            {
              kind: "mcq",
              id: "en-a1-04-l2-9",
              no: 9,
              text: "It rains on Saturday morning and your son wants to move.",
              options: ["School Library", "Saturday Sport Club", "Doctor Yannis — Family Practice"],
              answer: 1,
              explain:
                "Duyuru yağmur için ayrı bir satır taşıyor: «When it rains, we play in the big room». Yani cumartesi programı yağmurda da sürüyor; kütüphane cumartesi kapalı.",
            },
            {
              kind: "mcq",
              id: "en-a1-04-l2-10",
              no: 10,
              text: "You have no appointment and you can come early in the morning.",
              options: ["School Library", "Saturday Sport Club", "Doctor Yannis — Family Practice"],
              answer: 2,
              explain:
                "Muayenehane duyurusunda tam bu satır var: «Come without an appointment from 8 to 9». Öteki iki duyuruda randevu diye bir şey yok, dolayısıyla randevusuzluk bir ölçüt olmuyor.",
            },
          ],
        },
        {
          id: "en-a1-04-l3",
          no: 3,
          format: "truefalse",
          goal: "instruction",
          prompt: "Read the four signs and questions 11 to 14. Are the sentences true or false?",
          promptTr: "Dört levhayı ve 11–14. maddeleri oku. Cümleler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "s1",
              genre: "Sign at the swimming pool",
              genreTr: "Yüzme havuzundaki levha",
              title: "SWIMMING POOL",
              body: `Children under eight only with an adult.

Please take a shower before you swim.

Last swimmers in the water: 21.30. We close at 22.`,
            },
            {
              kind: "text",
              id: "s2",
              genre: "Sign in the school",
              genreTr: "Okuldaki levha",
              title: "COMPUTER ROOM",
              body: `Open in the big break and after 15.

Ask the teacher for the key.

Do not eat or drink at the computers.`,
            },
            {
              kind: "text",
              id: "s3",
              genre: "Sign at the doctor's door",
              genreTr: "Doktor kapısındaki levha",
              title: "WAITING ROOM",
              body: `Please give your card at the desk first.

Children can play with the toys. Take them back after.

Please do not use your phone here.`,
            },
            {
              kind: "text",
              id: "s4",
              genre: "Sign in the park",
              genreTr: "Parktaki levha",
              title: "CITY PARK — SPORT",
              body: `Football on the grass, not on the path.

The tables for table tennis are free. Bring your own ball and bat.

The park is open from 6 to 22.`,
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-04-l3-11",
              no: 11,
              ref: "s1",
              text: "A child of six can swim with his mother.",
              answer: true,
              explain:
                "Levha «Children under eight only with an adult» diyor: sekiz yaşın altındaki çocuk bir yetişkinle girebilir. Altı yaş bu sınırın altında ve anne bir yetişkin.",
            },
            {
              kind: "bool",
              id: "en-a1-04-l3-12",
              no: 12,
              ref: "s2",
              text: "You can use the computers at 16 o'clock.",
              answer: true,
              explain:
                "Levha «Open in the big break and after 15» diyor: on beşten sonra açık, dolayısıyla on altı da açık. İki ayrı zaman aralığı var ve madde ikincisini ölçüyor.",
            },
            {
              kind: "bool",
              id: "en-a1-04-l3-13",
              no: 13,
              ref: "s3",
              text: "You can call a friend in the waiting room.",
              answer: false,
              explain:
                "Levhanın son satırı bunu kapatıyor: «Please do not use your phone here». Kart verme ve oyuncaklar serbest ama telefon değil.",
            },
            {
              kind: "bool",
              id: "en-a1-04-l3-14",
              no: 14,
              ref: "s4",
              text: "The park gives you a ball for table tennis.",
              answer: false,
              explain:
                "Levha tam tersini söylüyor: «Bring your own ball and bat». Ücretsiz olan masa, top değil; `free` sözcüğünü görüp neye ait olduğunu okumayan öğrenci yanılır.",
            },
          ],
        },
        {
          id: "en-a1-04-l4",
          no: 4,
          format: "gapMcq",
          goal: "structure",
          prompt: "Read the message and complete gaps 15 to 18. Which word fits: a, b or c?",
          promptTr: "İletiyi oku ve 15–18. boşlukları tamamla. Hangi sözcük uyar: a, b ya da c?",
          texts: [
            {
              kind: "text",
              id: "t4",
              genre: "Message",
              genreTr: "İleti",
              title: "To my teacher",
              body: `Dear Mrs Roth,

My son Rudi is at home today. He {{15}} a bad cold and his head hurts.

He is very sad, {{16}} the trip to the museum is tomorrow.

Yesterday we {{17}} to the doctor. She says: two days at home, then school again.

Please send me the homework {{18}} email.

Clara Weiss`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-04-l4-15",
              no: 15,
              text: "Gap 15",
              options: ["has", "have", "is"],
              answer: 0,
              explain:
                "Özne `he` üçüncü tekil ve nesne `a bad cold`: geniş zamanda `has` gerekiyor. `have` çoğul ve birinci-ikinci tekil özneyle, `is` ise bir nesneyle bu kalıbı kurmaz.",
            },
            {
              kind: "mcq",
              id: "en-a1-04-l4-16",
              no: 16,
              text: "Gap 16",
              options: ["so", "but", "because"],
              answer: 2,
              explain:
                "İkinci yarı üzüntünün sebebini veriyor: gezi yarın ve o gidemiyor. Sebebi `because` kurar. `so` sonuç bildirir ve sırayı ters çevirir, `but` ise karşıtlık kurar.",
            },
            {
              kind: "mcq",
              id: "en-a1-04-l4-17",
              no: 17,
              text: "Gap 17",
              options: ["go", "goes", "went"],
              answer: 2,
              explain:
                "Cümle «Yesterday» ile başlıyor: zaman geçmiş. `go` fiilinin geçmiş biçimi düzensizdir ve `went` olur. Öteki iki şık şimdiki zamandır.",
            },
            {
              kind: "mcq",
              id: "en-a1-04-l4-18",
              no: 18,
              text: "Gap 18",
              options: ["with", "by", "in"],
              answer: 1,
              explain:
                "Bir iletişim yolunu bildirirken `by` kullanılır: by email, by phone, by post. `with` bir araç ya da eşlik bildirir, `in` ise bir yer ya da dil bildirir (in English).",
            },
          ],
        },
      ],
    },

    /* ── LISTENING ─────────────────────────────────────────────────────── */
    {
      skill: "listening",
      minutes: 20,
      instruction:
        "This part has three tasks. You hear short conversations, announcements and phone messages. You hear every recording twice.",
      instructionTr:
        "Bu bölümde üç görev var. Kısa konuşmalar, anonslar ve telefon iletileri dinleyeceksin. Her kaydı iki kez dinleyebilirsin.",
      tasks: [
        {
          id: "en-a1-04-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Which answer is right? You hear every recording twice.",
          promptTr: "Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "At the doctor's",
              genreTr: "Doktorda",
              situation: "Bir hasta randevu alıyor.",
              plays: 2,
              segments: [
                { speaker: "Patient", text: "Can I come on Monday morning?" },
                { speaker: "Receptionist", text: "Monday morning is full. Monday at four or Tuesday at nine." },
                { speaker: "Patient", text: "Tuesday, please. Nine is good." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "At school",
              genreTr: "Okulda",
              situation: "İki öğrenci ödevi konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Janne", text: "Is the homework for tomorrow?" },
                { speaker: "Meral", text: "No, for Thursday. But the book must go back tomorrow." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "On the phone",
              genreTr: "Telefonda",
              situation: "Bir anne okulu arıyor.",
              plays: 2,
              segments: [
                { speaker: "Mother", text: "My daughter is at home today. She has a bad cold." },
                { speaker: "School", text: "Thank you. Is she coming tomorrow?" },
                { speaker: "Mother", text: "No, on Wednesday. The doctor says two days." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "At the swimming pool",
              genreTr: "Yüzme havuzunda",
              situation: "Bir müşteri bilet alıyor.",
              plays: 2,
              segments: [
                { speaker: "Visitor", text: "Two adults and one child, please." },
                { speaker: "Staff", text: "Children under six are free. How old is he?" },
                { speaker: "Visitor", text: "He is seven." },
                { speaker: "Staff", text: "Then three tickets: eleven euros." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "In the park",
              genreTr: "Parkta",
              situation: "İki arkadaş hafta sonu planı yapıyor.",
              plays: 2,
              segments: [
                { speaker: "Rudi", text: "Do you come to the sport club on Saturday?" },
                { speaker: "Clara", text: "I work on Saturday morning. Is there something on Sunday?" },
                { speaker: "Rudi", text: "Yes, we play in the park at eleven." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "At home",
              genreTr: "Evde",
              situation: "Bir baba oğluna ilacı anlatıyor.",
              plays: 2,
              segments: [
                { speaker: "Father", text: "One tablet in the morning and one in the evening." },
                { speaker: "Son", text: "And at lunchtime?" },
                { speaker: "Father", text: "No, only two a day. With water, not with milk." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-04-h1-1",
              no: 1,
              ref: "a1",
              text: "When is the appointment?",
              options: ["On Monday at four in the afternoon", "On Monday morning", "On Tuesday at nine"],
              answer: 2,
              explain:
                "Görevli iki seçenek sunuyor ve hasta ikincisini alıyor: «Tuesday, please. Nine is good». Pazartesi sabahı dolu; pazartesi dört ise reddedilen seçenek.",
            },
            {
              kind: "mcq",
              id: "en-a1-04-h1-2",
              no: 2,
              ref: "a2",
              text: "What must the students do tomorrow?",
              options: ["Bring the book back", "Finish the homework", "Nothing at all"],
              answer: 0,
              explain:
                "Meral ödevi perşembeye erteliyor ama «the book must go back tomorrow» diyor. Yarın için tek iş kitabı geri vermek; ödev sorusu tuzak.",
            },
            {
              kind: "mcq",
              id: "en-a1-04-h1-3",
              no: 3,
              ref: "a3",
              text: "When does the daughter come to school?",
              options: ["Today", "Tomorrow", "On Wednesday"],
              answer: 2,
              explain:
                "Anne «No, on Wednesday» diyerek yarını eliyor ve doktorun iki gün dediğini ekliyor. Okulun sorusu yarınla ilgili olduğu için ikinci şık tuzak.",
            },
            {
              kind: "mcq",
              id: "en-a1-04-h1-4",
              no: 4,
              ref: "a4",
              text: "How many tickets does the visitor buy?",
              options: ["Two, because the child is free", "Three tickets for eleven euros", "One ticket only"],
              answer: 1,
              explain:
                "Çocuk yedi yaşında ve ücretsizlik «under six» için; bu yüzden görevli «Then three tickets: eleven euros» diyor. Ücretsizlik kuralı kayıtta geçiyor ama bu çocuğa uymuyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-04-h1-5",
              no: 5,
              ref: "a5",
              text: "When do they meet?",
              options: ["On Saturday morning", "On Sunday at eleven", "They do not meet"],
              answer: 1,
              explain:
                "Clara cumartesi sabahı çalışıyor, Rudi de «we play in the park at eleven» diyerek pazarı öneriyor. Cumartesi kayıtta geçiyor ama çalışma günü olarak.",
            },
            {
              kind: "mcq",
              id: "en-a1-04-h1-6",
              no: 6,
              ref: "a6",
              text: "How often does the son take the tablet?",
              options: ["Two times a day", "Three times a day", "Only in the evening"],
              answer: 0,
              explain:
                "Baba «only two a day» diyor: sabah bir, akşam bir. Oğlu öğle vaktini soruyor ve cevap onu açıkça reddediyor.",
            },
          ],
        },
        {
          id: "en-a1-04-h2",
          no: 2,
          format: "truefalse",
          goal: "instruction",
          prompt: "Are the sentences true or false? You hear every announcement twice.",
          promptTr: "Cümleler doğru mu yanlış mı? Her anonsu iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Announcement at school",
              genreTr: "Okul anonsu",
              situation: "Okulda bir anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "Good morning. The sport hall is closed this week. Sport is in the park. Please bring warm clothes." },
              ],
            },
            {
              kind: "audio",
              id: "b2",
              genre: "Announcement at the pool",
              genreTr: "Havuz anonsu",
              situation: "Yüzme havuzunda anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "Attention please. The big pool closes at nine. The small pool is open until half past nine. Thank you." },
              ],
            },
            {
              kind: "audio",
              id: "b3",
              genre: "Message on a phone",
              genreTr: "Telefon anonsu",
              situation: "Bir muayenehanenin telesekreter mesajı.",
              plays: 2,
              segments: [
                { text: "This is Doctor Otto's office. We are open Monday to Friday from eight. On Wednesday we close at twelve." },
              ],
            },
            {
              kind: "audio",
              id: "b4",
              genre: "Announcement in the library",
              genreTr: "Kütüphane anonsu",
              situation: "Kütüphanede anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "Dear readers, the computers do not work today. You can read and borrow books as usual. Sorry for that." },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "en-a1-04-h2-7",
              no: 7,
              ref: "b1",
              text: "There is no sport this week.",
              answer: false,
              explain:
                "Anons yeri değiştiriyor, dersi iptal etmiyor: «The sport hall is closed this week. Sport is in the park». Kapalı olan salon; ders sürüyor.",
            },
            {
              kind: "bool",
              id: "en-a1-04-h2-8",
              no: 8,
              ref: "b2",
              text: "You can swim in the small pool at ten past nine.",
              answer: true,
              explain:
                "Küçük havuz «until half past nine» açık; 21.10 bu saatten önce. Büyük havuz dokuzda kapanıyor, madde küçük olanı soruyor.",
            },
            {
              kind: "bool",
              id: "en-a1-04-h2-9",
              no: 9,
              ref: "b3",
              text: "The office is open on Wednesday afternoon.",
              answer: false,
              explain:
                "Mesaj çarşamba için bir istisna veriyor: «On Wednesday we close at twelve». Normal günler sekizde başlıyor ama çarşamba öğleden sonra kapalı.",
            },
            {
              kind: "bool",
              id: "en-a1-04-h2-10",
              no: 10,
              ref: "b4",
              text: "You can take a book home today.",
              answer: true,
              explain:
                "Anons yalnız bilgisayarları kapatıyor: «You can read and borrow books as usual». Ödünç alma bugün de sürüyor.",
            },
          ],
        },
        {
          id: "en-a1-04-h3",
          no: 3,
          format: "mcq",
          goal: "detail",
          prompt: "Which answer is right? You hear every recording twice.",
          promptTr: "Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Voicemail",
              genreTr: "Telesekreter iletisi",
              situation: "Bir öğretmen veliye ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello, this is Mrs Roth from the school. The trip on Friday is now on Monday. The bus leaves at the same time." },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "In the street",
              genreTr: "Sokakta",
              situation: "Bir kişi eczane soruyor.",
              plays: 2,
              segments: [
                { speaker: "Man", text: "Excuse me, where is the chemist?" },
                { speaker: "Woman", text: "Go left at the school. It is next to the bank." },
                { speaker: "Man", text: "Is it open now?" },
                { speaker: "Woman", text: "Until six, I think." },
              ],
            },
            {
              kind: "audio",
              id: "c3",
              genre: "At the sport club",
              genreTr: "Spor kulübünde",
              situation: "Bir kişi kulübe yazılıyor.",
              plays: 2,
              segments: [
                { speaker: "Visitor", text: "How much is one month?" },
                { speaker: "Staff", text: "Fifteen euros for children, twenty-five for adults." },
                { speaker: "Visitor", text: "My daughter is twelve. One month, please." },
              ],
            },
            {
              kind: "audio",
              id: "c4",
              genre: "At home",
              genreTr: "Evde",
              situation: "İki kardeş hafta sonunu konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Talia", text: "On Saturday we go to Grandma. And on Sunday?" },
                { speaker: "Yannis", text: "I play football at ten. After that I am free." },
              ],
            },
            {
              kind: "audio",
              id: "c5",
              genre: "At the doctor's",
              genreTr: "Doktorda",
              situation: "Bir doktor hastasına tavsiye veriyor.",
              plays: 2,
              segments: [
                { speaker: "Doctor", text: "Your arm is better. You can swim again." },
                { speaker: "Patient", text: "And football?" },
                { speaker: "Doctor", text: "Not this month. Ask me again in four weeks." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a1-04-h3-11",
              no: 11,
              ref: "c1",
              text: "What is new about the trip?",
              options: ["The time of the bus", "The day of the trip", "The place they visit"],
              answer: 1,
              explain:
                "İleti günü değiştiriyor: «The trip on Friday is now on Monday» ve saatin aynı kaldığını ekliyor. Gidilen yerden hiç söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-04-h3-12",
              no: 12,
              ref: "c2",
              text: "Where is the chemist?",
              options: ["Next to the bank", "In front of the school, on the right", "Behind the bus stop"],
              answer: 0,
              explain:
                "Kadın «It is next to the bank» diyor. Okul yalnız dönüş noktası («Go left at the school»), eczanenin yeri değil; ikinci şık okulu yer olarak gösteriyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-04-h3-13",
              no: 13,
              ref: "c3",
              text: "How much does the visitor pay?",
              options: ["Twenty-five euros", "Forty euros", "Fifteen euros"],
              answer: 2,
              explain:
                "Kız on iki yaşında, yani çocuk fiyatı geçerli: «Fifteen euros for children». Yirmi beş yetişkin fiyatı; kayıttaki iki sayıdan hangisinin geçerli olduğunu yaş belirliyor.",
            },
            {
              kind: "mcq",
              id: "en-a1-04-h3-14",
              no: 14,
              ref: "c4",
              text: "What does Yannis do on Sunday morning?",
              options: ["He visits his grandmother", "He plays football", "He stays at home"],
              answer: 1,
              explain:
                "Yannis «I play football at ten» diyor ve bu pazar gününe ait. Büyükanne ziyareti cumartesi; iki günü karıştıran öğrenci ilk şıkkı seçer.",
            },
            {
              kind: "mcq",
              id: "en-a1-04-h3-15",
              no: 15,
              ref: "c5",
              text: "What can the patient do now?",
              options: ["Play football again", "Swim again", "Nothing for four weeks"],
              answer: 1,
              explain:
                "Doktor «You can swim again» diyor ama futbolu erteliyor: «Not this month». Yani hiçbir şey yapamaz demiyor; iki spor için iki ayrı karar veriyor.",
            },
          ],
        },
      ],
    },

    /* ── WRITING ───────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 20,
      instruction: "This part has two tasks: you complete a form and you write a short message.",
      instructionTr: "Bu bölümde iki görev var: bir formu tamamlayacak ve kısa bir ileti yazacaksın.",
      tasks: [
        {
          id: "en-a1-04-w1",
          no: 1,
          format: "gap",
          goal: "detail",
          prompt:
            "Your neighbour Janne Berg puts her son in the Saturday sport club. Her son is ten years old and his name is Rudi. They live at 12 Hill Road. Her phone number is 07700 900 631. The child cannot come in August. Five things are missing on the form. Write them in the gaps.",
          promptTr:
            "Komşun Janne Berg oğlunu cumartesi spor kulübüne yazdırıyor. Oğlu on yaşında ve adı Rudi. 12 Hill Road adresinde oturuyorlar. Telefonu 07700 900 631. Çocuk ağustosta gelemiyor. Formda beş bilgi eksik; boşluklara yaz.",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Form",
              genreTr: "Form",
              title: "SATURDAY SPORT CLUB — NEW MEMBER",
              body: `Family name:         Berg
Name of the child:   {{1}}
Age of the child:    {{2}}
Street and number:   {{3}}
Phone:               {{4}}
No sport in:         {{5}}`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a1-04-w1-1",
              no: 1,
              text: "Name of the child",
              accept: ["Rudi"],
              explain:
                "Yönergede «his name is Rudi» geçiyor. Form çocuğun adını soruyor, annenin değil; Janne yazan öğrenci iki kişiyi karıştırmış olur.",
            },
            {
              kind: "gap",
              id: "en-a1-04-w1-2",
              no: 2,
              text: "Age of the child",
              accept: ["10", "10 years", "ten", "ten years", "ten years old"],
              explain:
                "Yönergede «Her son is ten years old» geçiyor. Rakam da yazı da kabul edilir, çünkü ölçülen şey imla değil bilgiyi doğru alana taşımak.",
            },
            {
              kind: "gap",
              id: "en-a1-04-w1-3",
              no: 3,
              text: "Street and number",
              accept: ["12 Hill Road", "Hill Road 12"],
              explain:
                "Adres yönergede «12 Hill Road» olarak veriliyor. İngilizcede kapı numarası sokak adından ÖNCE gelir; Türkçe sıraya alışkın öğrenci ters yazabilir, ikisi de kabul ediliyor.",
            },
            {
              kind: "gap",
              id: "en-a1-04-w1-4",
              no: 4,
              text: "Phone",
              accept: ["07700 900 631", "07700900631"],
              explain:
                "Telefon numarası yönergede «07700 900 631» olarak veriliyor. Boşluklu ve boşluksuz yazım kabul edilir; baştaki sıfır düşürülmemeli.",
            },
            {
              kind: "gap",
              id: "en-a1-04-w1-5",
              no: 5,
              text: "No sport in",
              accept: ["August", "in August"],
              explain:
                "Yönerge «The child cannot come in August» diyor ve form gelinemeyen ayı soruyor. Ay adı büyük harfle yazılır ama karşılaştırma büyük-küçük harfe bakmıyor.",
            },
          ],
        },
        {
          id: "en-a1-04-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "You are ill and you cannot go to your English class. Write a short message to your teacher. Write one or two sentences about each point (about 25 words). Do not forget the greeting at the start and at the end.",
          promptTr:
            "Hastasın ve İngilizce dersine gidemiyorsun. Öğretmenine kısa bir ileti yaz. Her maddeye bir-iki cümle yaz (yaklaşık 25 kelime). Baştaki hitabı ve sondaki veda cümlesini unutma.",
          items: [],
          rubric: {
            minWords: 25,
            points: [
              { de: "Say why you cannot come.", tr: "Neden gelemediğini söyle." },
              { de: "Say when you come again.", tr: "Ne zaman geleceğini söyle." },
              { de: "Ask for the homework.", tr: "Ödevi iste." },
            ],
            sample: `Dear Mrs Roth,

I am at home today. I have a bad cold and I cannot come to the class. I come again on Thursday. Can you send me the homework, please?

Thank you!
Meral`,
            criteria: [
              "Üç içerik noktasının üçü de var mı? Biri eksikse metin tam sayılmaz.",
              "Hitap ve veda var mı? (Dear … / Thank you …)",
              "Yaklaşık 25 kelime yazıldı mı?",
              "Rica kibar bir kalıpla mı kuruldu? (Can you … please)",
              "Cümleler anlaşılıyor mu? A1'de birkaç hata anlamı bozmuyorsa sorun değil.",
            ],
          },
        },
      ],
    },

    /* ── SPEAKING ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "This part has three tasks: you talk about your week, you ask and answer questions about free time, and you act at the doctor's.",
      instructionTr: "Bu bölümde üç görev var: haftanı anlatma, boş zaman üzerine soru sorup cevaplama ve doktorda rol yapma.",
      tasks: [
        {
          id: "en-a1-04-s1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt: "Talk about your week. Speak about these words: Monday morning — work or school — sport — a free evening — the weekend — one thing you do not like.",
          promptTr: "Haftanı anlat. Şu sözcüklere göre konuş: pazartesi sabahı — iş ya da okul — spor — boş bir akşam — hafta sonu — sevmediğin bir şey.",
          prepSeconds: 30,
          speakSeconds: 90,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "Monday and your work or school", tr: "Pazartesi ve iş ya da okul" },
              { de: "sport in your week", tr: "Haftanda spor" },
              { de: "a free evening and the weekend", tr: "Boş bir akşam ve hafta sonu" },
              { de: "one thing you do not like", tr: "Sevmediğin bir şey" },
            ],
            sample:
              "On Monday morning I get up at six. I work in a shop from eight to four. On Wednesday I swim for one hour. On Friday evening I am free and I watch a good film. At the weekend I walk in the park with my sister. I do not like the bus in the morning.",
            criteria: [
              "Altı sözcüğün her birine değinildi mi?",
              "Gün ve saat adları doğru söylendi mi?",
              "Sıklık ya da zaman ifadeleri kullanıldı mı? (on Monday, at the weekend)",
              "Anlaşılır bir tempoda mı konuşuldu?",
            ],
          },
        },
        {
          id: "en-a1-04-s2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Topic: free time and sport. Make a question for each word and answer my questions: sport — park — friends — evening — money.",
          promptTr:
            "Konu: boş zaman ve spor. Her sözcük için bir soru kur ve benim sorularımı cevapla: spor — park — arkadaşlar — akşam — para.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "Now we talk about free time. Your first word is: sport. Please ask me a question.", tr: "Şimdi boş zamanı konuşuyoruz. İlk sözcüğün: spor. Bana bir soru sor." },
            { who: "you", hint: "«sport» sözcüğüyle bir soru kur.", expect: "sport sözcüğüyle dilbilgisel olarak doğru bir soru kurmak", seconds: 25 },
            { who: "partner", de: "I play basketball on Tuesday. Your next word is: park.", tr: "Salı günleri basketbol oynuyorum. Sıradaki sözcüğün: park." },
            { who: "you", hint: "«park» için bir soru kur.", expect: "park sözcüğüyle bir soru kurmak", seconds: 25 },
            { who: "partner", de: "The park near my house is very big. Now a question for you: when do you meet your friends?", tr: "Evimin yanındaki park çok büyük. Şimdi sana bir soru: Arkadaşlarınla ne zaman buluşursun?" },
            { who: "you", hint: "Zaman bildirerek cevapla.", expect: "zaman bildiren tam bir cümleyle cevap vermek", seconds: 25 },
            { who: "partner", de: "Thank you. Last question: how much is a ticket for the swimming pool where you live?", tr: "Teşekkürler. Son soru: Yaşadığın yerde havuz bileti kaç para?" },
            { who: "you", hint: "Bir fiyat söyle.", expect: "bir fiyatı İngilizce söylemek (para birimiyle)", seconds: 25 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "a question for each word", tr: "Her sözcük için bir soru" },
              { de: "answers to my questions", tr: "Sorulara cevap vermek" },
            ],
            sample:
              "Do you like sport? — Yes, I swim. Is there a park near your house? — Yes, five minutes on foot. When do you meet your friends? — On Friday evening. What do you do in the evening? — I read or I watch television. How much is a ticket? — Four euros.",
            criteria: [
              "Beş sözcüğün her biri için bir soru kuruldu mu?",
              "Sorular doğru kuruldu mu? (Do you … / Is there … / When … / How much …)",
              "Cevaplar soruya uygun mu?",
              "Fiyat ve zaman söylenebiliyor mu?",
            ],
          },
        },
        {
          id: "en-a1-04-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "You are at the doctor's. Situations: you say what is wrong. — You ask about the medicine. — You ask for a paper for your work.",
          promptTr:
            "Doktordasın. Durumlar: Neyin olduğunu söyle. — İlacı sor. — İşin için bir belge iste.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good morning. Please sit down. What is the problem?", tr: "Günaydın. Buyurun oturun. Şikâyetiniz nedir?" },
            { who: "you", hint: "Neyin olduğunu ve ne zamandır sürdüğünü söyle.", expect: "bir rahatsızlığı ve süresini söylemek", seconds: 25 },
            { who: "partner", de: "I see. Take this medicine, two times a day.", tr: "Anlıyorum. Bu ilacı alın, günde iki kez." },
            { who: "you", hint: "İlaç hakkında bir soru sor (kaç gün, yemekten önce mi sonra mı).", expect: "ilaç hakkında somut bir soru sormak", seconds: 25 },
            { who: "partner", de: "For five days, after food. Anything else?", tr: "Beş gün, yemekten sonra. Başka bir şey var mı?" },
            { who: "you", hint: "İş yerin için bir belge iste, kibarca.", expect: "kibarca bir belge istemek", seconds: 25 },
          ],
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "say what is wrong", tr: "Neyin olduğunu söylemek" },
              { de: "ask about the medicine", tr: "İlacı sormak" },
              { de: "ask for something politely", tr: "Kibarca bir şey istemek" },
            ],
            sample:
              "My head hurts and I am very tired. It is three days now. — How many days do I take it? Before or after food? — Can I have a paper for my work, please?",
            criteria: [
              "Rahatsızlık anlaşılır söylendi mi? (My head hurts / I have a cold)",
              "Süre bildirildi mi? (three days, since Monday)",
              "İlaç hakkındaki soru somut mu?",
              "Belge isteği kibar bir kalıpla mı kuruldu? (Can I have … please)",
            ],
          },
        },
      ],
    },
  ],
};
