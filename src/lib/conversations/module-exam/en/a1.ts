import type { ModuleExamPlan } from "../types";

/**
 * İNGİLİZCE kursun A1 modül sınavları (10 modül).
 *
 * ALAN ADLARI HEDEF DİLİ TAŞIYOR, ALMANCAYI DEĞİL. `titleDe`, `focus[].de`,
 * `canDo[].de`, `ExamTurn.de`, `ExamQuestion.de`, `speaking[].de` ve
 * `Gloss.de` bu dosyada İNGİLİZCE yazılı. Ad tarihsel: tip iki kurs varken
 * yazıldı ve o gün tek kurs Almancaydı. Kolonu yeniden adlandırmak 58 Almanca
 * sınavı ve `resolveExam`, `check-exam-vocab`, `data/conversations/exam` hatlarını
 * birlikte kırardı — bedeli, adı yanlış ama anlamı sabit bir alandan büyük.
 * Okunacak kural şu: `de` = ÖLÇÜLEN dil, `tr` = öğrencinin dili.
 *
 * `canDo[].en` ile `Gloss.en` bu kursta `de` ile AYNI dizeyi taşıyor ve bu bir
 * kopya-yapıştır hatası değil. O alanlar "aynı anlamın İngilizcesi" demek;
 * hedef dil İngilizce olunca karşılığı kendisi oluyor. Boş bırakılamıyor,
 * çünkü `resolveExam` anadili İngilizce olan kullanıcı için onları okuyor ve
 * kapı boşluğu hata sayıyor (`check-exams.ts`). Anadili İngilizce olan biri bu
 * kursu almıyor (`PAIR_READY.en` yalnız `de`), yani alan pratikte hiç
 * okunmuyor — ama tipin ve kapının sözü veride duruyor.
 *
 * Anadili ALMANCA olan kullanıcı bu sınavların Türkçe yarısını Almanca
 * görüyor; çeviri sınavda değil sözlükte (`data/conversations/exam-de/`,
 * `localiseExam`in Almanca dalı). Aynı şeyin iki doğruluk kaynağı olmasın.
 *
 * PEDAGOJİK KISIT — Almanca kardeşiyle birebir aynı: her bölüm modülün KENDİ
 * sahnesinde geçiyor ve metin modülün o noktaya kadar öğretmediği bir yapıyı
 * TAŞIMIYOR. A1.1 kâğıdı `am/is/are`, soru kelimeleri, evet-hayır sorusu,
 * sayılar ve harflemeyle sınırlı: "Where does Elif live?" gibi yardımcı
 * fiilli bir soru A1.4'te geliyor, bu yüzden aynı bilgi "Which city is Elif
 * in now?" diye soruluyor. A1.2'de `can` yok (A1.6'da geliyor), A1.3'e kadar
 * emir kipi yok, geçmiş zaman yalnız A1.10'da.
 *
 * Konuşmacı etiketleri seslendirme kadrosunun TANIDIĞI kümeden seçili
 * (`lib/tts/speakers`): ilk ad sözlüğü, İngilizce rol adları ve cinsiyetsiz
 * kurum etiketleri. Tanınmayan bir etiket sesi bozmuyor ama cinsiyeti
 * uydurulmuş bir role düşürüyor; `check:tts` onları sayıyor.
 */
export const EN_A1_EXAMS: ModuleExamPlan[] = [
  {
    level: "A1",
    index: 0,
    code: "A1.1",
    titleDe: "Nice to meet you",
    titleTr: "Tanışma ve ben",
    focus: [
      { de: "am / is / are", tr: "kendini tanıtma fiili" },
      { de: "WH-questions", tr: "soru kelimesiyle soru sorma" },
      { de: "Yes-no questions", tr: "fiille başlayan soru" },
      { de: "Numbers 1–100", tr: "sayı, yaş ve numara" },
    ],
    canDo: [
      { de: "I can say my name, where I am from and where I live.", tr: "Adımı, nereli olduğumu ve nerede oturduğumu söyleyebiliyorum.", en: "I can say my name, where I am from and where I live." },
      { de: "I can ask someone their name and where they are from.", tr: "Birine adını ve nereli olduğunu sorabiliyorum.", en: "I can ask someone their name and where they are from." },
      { de: "I can ask a yes-no question with am, is and are.", tr: "am, is, are ile evet-hayır sorusu sorabiliyorum.", en: "I can ask a yes-no question with am, is and are." },
      { de: "I can give my phone number and my age.", tr: "Telefon numaramı ve yaşımı söyleyebiliyorum.", en: "I can give my phone number and my age." },
      { de: "I can spell my name and fill out a form.", tr: "Adımı harf harf söyleyip bir formu doldurabiliyorum.", en: "I can spell my name and fill out a form." },
    ],
    listening: {
      title: "The first day of class",
      titleTr: "Kursun ilk günü",
      situation: "Dil kursunun ilk günü. İki kursiyer tanışıyor.",
      turns: [
        { speaker: "Marco", de: "Hello! I'm Marco. What's your name?", tr: "Merhaba! Ben Marco. Adın ne?" },
        { speaker: "Elif", de: "My name is Elif. I'm very happy to meet you!", tr: "Benim adım Elif. Tanıştığımıza çok sevindim!" },
        { speaker: "Marco", de: "Where are you from, Elif?", tr: "Nerelisin Elif?" },
        { speaker: "Elif", de: "I'm from Türkiye. Now I live in Boston.", tr: "Türkiyeliyim. Şimdi Boston'da oturuyorum." },
        { speaker: "Marco", de: "Do you speak English?", tr: "İngilizce konuşuyor musun?" },
        { speaker: "Elif", de: "I speak a little English. I'm a teacher and I work in a school.", tr: "Biraz İngilizce konuşuyorum. Öğretmenim ve bir okulda çalışıyorum." },
        { speaker: "Marco", de: "How do you spell your name?", tr: "Adın nasıl yazılıyor?" },
        { speaker: "Elif", de: "E-L-I-F. And I'm twenty-eight years old.", tr: "E-L-I-F. Bir de yirmi sekiz yaşındayım." },
      ],
      questions: [
        { de: "Where is Elif from?", tr: "Elif nereli?", options: ["From Italy", "From Türkiye", "From America", "From Boston"], answer: 1 },
        { de: "Which city is Elif in now?", tr: "Elif şimdi hangi şehirde?", options: ["In Izmir", "In London", "In Boston", "In Türkiye"], answer: 2 },
        { de: "How old is Elif?", tr: "Elif kaç yaşında?", options: ["Eighteen", "Twenty", "Twenty-five", "Twenty-eight"], answer: 3 },
      ],
    },
    reading: {
      title: "Language school – new student",
      titleTr: "Kayıt formu",
      genre: "Form",
      text: "Language school – new student\n\nFirst name: Elif\nLast name: Yilmaz\nAge: 28\nCountry: Türkiye\nCity: Boston\nAddress: 12 Green Street\nZIP code: 02108\nPhone number: 617 555 0143\nEmail address: elif.y@mail.com\nWork: teacher\nBirthday: in May",
      questions: [
        { de: "What is the last name?", tr: "Soyadı ne?", options: ["Elif", "Yilmaz", "Boston", "Teacher"], answer: 1 },
        { de: "What is the zip code?", tr: "Posta kodu ne?", options: ["02108", "617 555 0143", "12 Green Street", "28"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Kursta kendini tanıtıyorsun.", de: "My name is Ali and I'm from Ankara.", tr: "Adım Ali ve Ankaralıyım." },
      { situation: "Tanımadığın birine kibar biçimde soruyorsun.", de: "Excuse me, what's your name and where do you live?", tr: "Affedersiniz, adınız ne ve nerede oturuyorsunuz?" },
    ],
    writing: {
      prompt: "Bir dil kursuna kaydoluyorsun. Kendini tanıtan kısa bir metin yaz.",
      checklist: [
        "Adını ve soyadını yaz",
        "Nereli olduğunu ve nerede oturduğunu yaz",
        "Yaşını ve mesleğini yaz",
        "Sonunda bir soru sor",
      ],
      minWords: 30,
      phrases: [
        { de: "My name is …", tr: "Adım …", en: "My name is …" },
        { de: "I'm from …", tr: "…'danım", en: "I'm from …" },
        { de: "I live in …", tr: "…'da oturuyorum", en: "I live in …" },
        { de: "I'm … years old.", tr: "… yaşındayım.", en: "I'm … years old." },
        { de: "I'm a … .", tr: "Mesleğim …", en: "I'm a … ." },
      ],
      sample:
        "Hello! My name is Elif Yilmaz. I'm from Türkiye, from Izmir. Now I live in Boston. I'm twenty-eight years old. I'm a teacher and I work in a school. I speak a little English. My birthday is in May. How old are you?",
    },
  },

  {
    level: "A1",
    index: 1,
    code: "A1.2",
    titleDe: "Family and people",
    titleTr: "Aile ve insanlar",
    focus: [
      { de: "have got / have", tr: "„bir …'im var“ demek" },
      { de: "my / your / his / her", tr: "iyelik sıfatları" },
      { de: "don't / doesn't", tr: "olumsuz cümle kurmak" },
      { de: "Plurals", tr: "çoğul biçimler" },
    ],
    canDo: [
      { de: "I can introduce my family.", tr: "Ailemi tanıtabiliyorum.", en: "I can introduce my family." },
      { de: "I can say which family members I have and which I don't have.", tr: "Hangi aile üyelerimin olduğunu ve olmadığını söyleyebiliyorum.", en: "I can say which family members I have and which I don't have." },
      { de: "I can describe the people in a photo.", tr: "Fotoğraftaki kişileri tarif edebiliyorum.", en: "I can describe the people in a photo." },
      { de: "I can say what someone looks like.", tr: "Birinin nasıl göründüğünü anlatabiliyorum.", en: "I can say what someone looks like." },
      { de: "I can use my, your, his and her correctly.", tr: "my, your, his ve her sözcüklerini doğru kullanabiliyorum.", en: "I can use my, your, his and her correctly." },
    ],
    listening: {
      title: "The family photo",
      titleTr: "Aile fotoğrafı",
      situation: "İki arkadaş bir fotoğrafa bakıyor.",
      turns: [
        { speaker: "Lena", de: "Is this your family in the photo?", tr: "Fotoğraftaki senin ailen mi?" },
        { speaker: "Ahmet", de: "Yes, this is my family. These are my parents.", tr: "Evet, bu benim ailem. Bunlar da annemle babam." },
        { speaker: "Lena", de: "And who is the girl here?", tr: "Peki buradaki kız kim?" },
        { speaker: "Ahmet", de: "That's my sister Ayse. She is twenty years old.", tr: "O benim kız kardeşim Ayşe. Yirmi yaşında." },
        { speaker: "Lena", de: "What does she look like?", tr: "Görünüşü nasıl?" },
        { speaker: "Ahmet", de: "She is tall and she has long hair.", tr: "Uzun boylu ve uzun saçlı." },
        { speaker: "Lena", de: "Do you have a brother too?", tr: "Erkek kardeşin de var mı?" },
        { speaker: "Ahmet", de: "No, I don't have a brother. But we have a dog!", tr: "Hayır, erkek kardeşim yok. Ama bir köpeğimiz var!" },
      ],
      questions: [
        { de: "Who is in the photo?", tr: "Fotoğrafta kim var?", options: ["Ahmet's family", "Lena's parents", "Ahmet's friends", "Ahmet's club"], answer: 0 },
        { de: "How old is Ayse?", tr: "Ayşe kaç yaşında?", options: ["Ten", "Twelve", "Twenty", "Thirty"], answer: 2 },
        { de: "Does Ahmet have a brother?", tr: "Ahmet'in erkek kardeşi var mı?", options: ["Yes, one", "Yes, two", "No, he doesn't", "No, but two sisters"], answer: 2 },
      ],
    },
    reading: {
      title: "A message from Nuray",
      titleTr: "Bir davet mesajı",
      genre: "Mesaj",
      text: "Hi Maria,\n\nOn Saturday my family is together. My grandma is eighty — it is her birthday! My aunt has a cake for her and my brother is here too. We are a big family — twenty people! Are you free on Saturday? My cousin is here too. She is very kind and she has two children.\n\nSee you\nNuray",
      questions: [
        { de: "How old is the grandma?", tr: "Büyükanne kaç yaşında?", options: ["Eighteen", "Twenty", "Eighty", "Two"], answer: 2 },
        { de: "Who has the cake?", tr: "Pasta kimde?", options: ["The mother", "The brother", "The aunt", "Maria"], answer: 2 },
      ],
    },
    speaking: [
      { situation: "Arkadaşına kardeşlerinden bahsediyorsun.", de: "I have a brother, but I don't have a sister.", tr: "Bir erkek kardeşim var ama kız kardeşim yok." },
      { situation: "Fotoğraftaki kişiyi tarif ediyorsun.", de: "This is my aunt. She is tall and she has gray hair.", tr: "Bu benim teyzem. Uzun boylu ve saçları gri." },
    ],
    writing: {
      prompt: "Ailenden bahseden kısa bir metin yaz.",
      checklist: [
        "En az üç aile üyesini yaz",
        "„my / his / her“ ile iyelik kullan",
        "Bir olumsuz cümle kur („I don't have …“)",
        "Bir kişiyi kısaca tarif et",
      ],
      minWords: 35,
      phrases: [
        { de: "This is my …", tr: "Bu benim …", en: "This is my …" },
        { de: "I have a …", tr: "Bir …'im var", en: "I have a …" },
        { de: "I don't have a …", tr: "…'im yok", en: "I don't have a …" },
        { de: "He / She is … years old.", tr: "O … yaşında.", en: "He / She is … years old." },
        { de: "She works at …", tr: "… şirketinde/yerinde çalışıyor", en: "She works at …" },
      ],
      sample:
        "There are four people in my family. These are my parents: my father's name is Kemal and my mother's name is Sevgi. My father is a teacher and my mother works in a club. I have a sister. Her name is Ayse and she is twenty years old. She is tall and she has long hair. She is very kind. I don't have a brother. But we have a dog too.",
    },
  },

  {
    level: "A1",
    index: 2,
    code: "A1.3",
    titleDe: "Food and drink",
    titleTr: "Yeme-içme",
    focus: [
      { de: "I'd like / Can I have …?", tr: "kibarca istemek" },
      { de: "How much is …?", tr: "fiyat sormak" },
      { de: "some / any", tr: "belirsiz miktar: olumluda some, soru ve olumsuzda any" },
      { de: "Imperatives", tr: "tarif ve yönerge verme" },
    ],
    canDo: [
      { de: "I can order in a café and in a restaurant.", tr: "Kafede ve restoranda sipariş verebiliyorum.", en: "I can order in a café and in a restaurant." },
      { de: "I can say what I like to eat and drink.", tr: "Ne yiyip içmeyi sevdiğimi söyleyebiliyorum.", en: "I can say what I like to eat and drink." },
      { de: "I can ask the price and pay the check.", tr: "Fiyatı sorup hesabı ödeyebiliyorum.", en: "I can ask the price and pay the check." },
      { de: "I can ask for a kilo, a bottle or a piece of something.", tr: "Bir kilo, bir şişe, bir dilim isteyebiliyorum.", en: "I can ask for a kilo, a bottle or a piece of something." },
      { de: "I can say what I don't eat.", tr: "Neyi yemediğimi söyleyebiliyorum.", en: "I can say what I don't eat." },
    ],
    listening: {
      title: "At the restaurant",
      titleTr: "Restoranda",
      situation: "Bir konuk akşam yemeği sipariş ediyor.",
      turns: [
        { speaker: "Waiter", de: "Good evening. A table for two?", tr: "İyi akşamlar. İki kişilik masa mı?" },
        { speaker: "Customer", de: "Yes, please. Can I have the menu?", tr: "Evet lütfen. Menüyü alabilir miyim?" },
        { speaker: "Waiter", de: "Here you are. What would you like?", tr: "Buyurun. Ne istersiniz?" },
        { speaker: "Customer", de: "I'd like the soup, please. And then the rice with vegetables — but no onions.", tr: "Çorba istiyorum lütfen. Sonra da sebzeli pilav ama soğansız." },
        { speaker: "Waiter", de: "Would you like some water or juice?", tr: "Su ya da meyve suyu ister misiniz?" },
        { speaker: "Customer", de: "A bottle of water, please. How much is it?", tr: "Bir şişe su lütfen. Ne kadar?" },
        { speaker: "Waiter", de: "The soup is four, the rice is eight and the water is two.", tr: "Çorba dört, pilav sekiz, su iki." },
        { speaker: "Customer", de: "Good. Can I have the check, please? Can I pay by card?", tr: "Güzel. Hesabı alabilir miyim? Kartla ödeyebilir miyim?" },
      ],
      questions: [
        { de: "What does the person eat first?", tr: "Kişi önce ne yiyor?", options: ["The rice", "The soup", "Bread", "Cheese"], answer: 1 },
        { de: "What does the person not want?", tr: "Kişi ne istemiyor?", options: ["Salt", "Onions", "Butter", "Milk"], answer: 1 },
        { de: "How does the person want to pay?", tr: "Kişi nasıl ödemek istiyor?", options: ["By card", "In cash", "By check", "Together"], answer: 0 },
      ],
    },
    reading: {
      title: "Café Green — menu",
      titleTr: "Kafenin menüsü",
      genre: "Menü",
      text: "Café Green — menu\n\nBread with butter and cheese — 4.50\nSoup with bread — 3.90\nRice with vegetables — 8.20\nPizza with tomato — 7.50\n\nCoffee 2.80 · Tea 2.50 · Orange juice 3.20\nWater, one bottle — 1.80\n\nYou can pay by card or in cash.",
      questions: [
        { de: "How much is the rice with vegetables?", tr: "Sebzeli pilav kaç para?", options: ["3.90", "7.50", "8.20", "2.80"], answer: 2 },
        { de: "How can you pay?", tr: "Nasıl ödeyebilirsin?", options: ["Only in cash", "By card or in cash", "Only by card", "By check"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "Kafede sipariş veriyorsun.", de: "I'd like a coffee and a sandwich, please.", tr: "Bir kahve ve bir sandviç istiyorum lütfen." },
      { situation: "Garsona et yemediğini söylüyorsun.", de: "I don't eat meat. Is there any soup with vegetables?", tr: "Et yemiyorum. Sebzeli çorba var mı?" },
    ],
    writing: {
      prompt: "Bir arkadaşını yemeğe davet eden kısa bir mesaj yaz.",
      checklist: [
        "Davet cümlesi kur („Would you like …?“)",
        "Ne pişireceğini yaz",
        "Saati yaz",
        "Arkadaşına ne yiyip içtiğini sor",
      ],
      minWords: 30,
      phrases: [
        { de: "Would you like …?", tr: "… ister misin?", en: "Would you like …?" },
        { de: "I'm cooking …", tr: "… pişiriyorum", en: "I'm cooking …" },
        { de: "I like …", tr: "…'i severim", en: "I like …" },
        { de: "Do you eat …?", tr: "… yer misin?", en: "Do you eat …?" },
        { de: "We eat at … o'clock.", tr: "Saat …'de yiyoruz.", en: "We eat at … o'clock." },
      ],
      sample:
        "Hi Jonas, would you like to come for dinner on Saturday? We eat at seven o'clock. I'm cooking soup and rice with vegetables. I like cooking very much. We have bread with cheese and butter too, and I have apples and bananas from the market. Do you eat meat? And do you like tea or coffee? Please say yes!",
    },
  },

  {
    level: "A1",
    index: 3,
    code: "A1.4",
    titleDe: "My day",
    titleTr: "Günlük düzen",
    focus: [
      { de: "Present simple", tr: "her gün yapılan işler" },
      { de: "What time …?", tr: "saat söylemek ve sormak" },
      { de: "always / usually / never", tr: "sıklık zarfları ve yerleri" },
      { de: "get up, wake up, go out", tr: "ikili fiiller" },
    ],
    canDo: [
      { de: "I can describe my day.", tr: "Günlük düzenimi anlatabiliyorum.", en: "I can describe my day." },
      { de: "I can tell the time and ask for it.", tr: "Saati söyleyebiliyor ve sorabiliyorum.", en: "I can tell the time and ask for it." },
      { de: "I can say how often I do something.", tr: "Bir şeyi ne sıklıkta yaptığımı söyleyebiliyorum.", en: "I can say how often I do something." },
      { de: "I can arrange a time to meet.", tr: "Buluşma saati ayarlayabiliyorum.", en: "I can arrange a time to meet." },
      { de: "I can put my day in order with first, then and after that.", tr: "Günümü „first, then, after that“ ile sıralayabiliyorum.", en: "I can put my day in order with first, then and after that." },
    ],
    listening: {
      title: "Plans for the weekend",
      titleTr: "Hafta sonu buluşması",
      situation: "Sara, Tom'u arıyor ve buluşmak istiyor.",
      turns: [
        { speaker: "Sara", de: "Hi Tom, are you free on the weekend?", tr: "Merhaba Tom, hafta sonu boş musun?" },
        { speaker: "Tom", de: "On Saturday I usually get up at ten, but after lunch I'm free.", tr: "Cumartesi genelde onda kalkıyorum ama öğle yemeğinden sonra boşum." },
        { speaker: "Sara", de: "Good. What time is good for you?", tr: "Güzel. Saat kaç sana uyar?" },
        { speaker: "Tom", de: "At half past three. First I'm going to visit the library.", tr: "Üç buçukta. Önce kütüphaneye gideceğim." },
        { speaker: "Sara", de: "Fine, then we meet at half past three.", tr: "Tamam, o zaman üç buçukta buluşuyoruz." },
        { speaker: "Tom", de: "Perfect. Where do we meet?", tr: "Harika. Nerede buluşuyoruz?" },
        { speaker: "Sara", de: "At the library. It is open until six.", tr: "Kütüphanede. Altıya kadar açık." },
      ],
      questions: [
        { de: "When do Sara and Tom meet?", tr: "Sara ve Tom ne zaman buluşuyor?", options: ["On Monday", "On Saturday", "On Friday", "In the morning"], answer: 1 },
        { de: "What time do they meet?", tr: "Saat kaçta buluşuyorlar?", options: ["At three o'clock", "At half past three", "At four o'clock", "At half past ten"], answer: 1 },
        { de: "Where do they meet?", tr: "Nerede buluşuyorlar?", options: ["At the office", "At the library", "At the meeting", "In the building"], answer: 1 },
      ],
    },
    reading: {
      title: "A note for Anna",
      titleTr: "Buzdolabına bırakılan not",
      genre: "Not",
      text: "Anna,\n\nTomorrow I get up at six in the morning and I start work early. Work starts at seven and finishes at four. After that I always visit the library. In the evening I watch television or I read. I am free after five — and on the weekend too!\n\nSee you tomorrow\nMarkus",
      questions: [
        { de: "What time does work start?", tr: "İş saat kaçta başlıyor?", options: ["At six", "At seven", "At four", "At five"], answer: 1 },
        { de: "What does Markus always do after work?", tr: "Markus işten sonra her zaman ne yapıyor?", options: ["He sleeps", "He visits the library", "He starts work", "He has lunch"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "Günlük düzenini anlatıyorsun.", de: "I get up at seven and I start work at eight.", tr: "Yedide kalkıyorum ve sekizde işe başlıyorum." },
      { situation: "Arkadaşına ne zaman müsait olduğunu soruyorsun.", de: "Are you free on Friday? What time is good for you?", tr: "Cuma boş musun? Saat kaç sana uyar?" },
    ],
    writing: {
      prompt: "Sıradan bir gününü anlatan kısa bir metin yaz.",
      checklist: [
        "Kalkma saatini yaz",
        "En az bir sıklık zarfı kullan (always, usually, never)",
        "First / Then / After that ile sırala",
        "Akşamını da yaz",
      ],
      minWords: 35,
      phrases: [
        { de: "My day begins at …", tr: "Günüm …'de başlıyor", en: "My day begins at …" },
        { de: "I get up at …", tr: "Saat …'de kalkıyorum", en: "I get up at …" },
        { de: "First … Then … After that …", tr: "Önce … Sonra … Ardından …", en: "First … Then … After that …" },
        { de: "Work starts at …", tr: "İş …'de başlıyor", en: "Work starts at …" },
        { de: "In the evening …", tr: "Akşamları …", en: "In the evening …" },
      ],
      sample:
        "My day begins at six in the morning. First I get up and I have a shower. Then I have breakfast and I have a tea. At half past seven I walk to the office. Work starts at eight and finishes at five. After that I sometimes visit the library. In the evening I watch television or I read. At midnight I go to bed.",
    },
  },

  {
    level: "A1",
    index: 4,
    code: "A1.5",
    titleDe: "Shopping",
    titleTr: "Alışveriş",
    focus: [
      { de: "How much is it?", tr: "fiyat ve miktar sorma" },
      { de: "Adjectives", tr: "renk, beden, „too big“" },
      { de: "I like it / I don't like it", tr: "beğenmek ve beğenmemek" },
      { de: "Can I …?", tr: "izin istemek ve ricada bulunmak" },
    ],
    canDo: [
      { de: "I can ask about size, color and price.", tr: "Beden, renk ve fiyat sorabiliyorum.", en: "I can ask about size, color and price." },
      { de: "I can say what I like and what I don't like.", tr: "Neyin hoşuma gidip gitmediğini söyleyebiliyorum.", en: "I can say what I like and what I don't like." },
      { de: "I can try something on and change it.", tr: "Bir şeyi deneyip değiştirebiliyorum.", en: "I can try something on and change it." },
      { de: "I can understand prices and pay.", tr: "Fiyatları anlayıp ödeme yapabiliyorum.", en: "I can understand prices and pay." },
      { de: "I can choose a present.", tr: "Hediye seçebiliyorum.", en: "I can choose a present." },
    ],
    listening: {
      title: "At the store",
      titleTr: "Mağazada",
      situation: "Bir müşteri mağazada giysilere bakıyor.",
      turns: [
        { speaker: "Clerk", de: "Good afternoon, can I help you?", tr: "İyi günler, yardımcı olabilir miyim?" },
        { speaker: "Customer", de: "Yes, I'm looking for a blue jacket.", tr: "Evet, mavi bir ceket arıyorum." },
        { speaker: "Clerk", de: "What size are you?", tr: "Bedeniniz kaç?" },
        { speaker: "Customer", de: "Size twelve. Can I try it on?", tr: "On iki beden. Deneyebilir miyim?" },
        { speaker: "Clerk", de: "Yes, the fitting room is there.", tr: "Tabii, kabin şurada." },
        { speaker: "Customer", de: "I like the jacket, but it is too small. Do you have it in size fourteen?", tr: "Ceket hoşuma gitti ama küçük geldi. On dört beden var mı?" },
        { speaker: "Clerk", de: "Yes, and this jacket is cheap — only twenty.", tr: "Var, ayrıca bu ceket ucuz — yalnızca yirmi." },
      ],
      questions: [
        { de: "What is the person looking for?", tr: "Kişi ne arıyor?", options: ["A shirt", "A jacket", "A sweater", "Shoes"], answer: 1 },
        { de: "What color does the person want?", tr: "Kişi hangi rengi istiyor?", options: ["Red", "Black", "Blue", "White"], answer: 2 },
        { de: "What is the problem with the jacket?", tr: "Cekette sorun ne?", options: ["It is too expensive", "It is too small", "It is dirty", "The color is wrong"], answer: 1 },
      ],
    },
    reading: {
      title: "Green Street store — low prices",
      titleTr: "İndirim ilanı",
      genre: "İlan",
      text: "Green Street store — low prices!\n\nAll jackets and sweaters: cheap!\nShirts from 9.90\nShoes: buy two, pay for one\n\nYou can change the clothes with the receipt.\nOrder on the computer — it arrives on Monday.\n\nWe are here every day. Come and choose!",
      questions: [
        { de: "What do you need to change the clothes?", tr: "Değişim için ne gerekiyor?", options: ["More money", "The receipt", "A list", "Nothing"], answer: 1 },
        { de: "When does the order arrive?", tr: "Sipariş ne zaman geliyor?", options: ["On Monday", "Today", "In an hour", "It does not arrive"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Mağazada beden soruyorsun.", de: "Excuse me, do you have this shirt in a large size?", tr: "Affedersiniz, bu gömleğin büyük bedeni var mı?" },
      { situation: "Bir ürünü beğendiğini ama pahalı bulduğunu söylüyorsun.", de: "I like this sweater, but it is too expensive for me.", tr: "Bu kazak hoşuma gitti ama bana fazla pahalı." },
    ],
    writing: {
      prompt: "Bir mağazanın internet sitesine kısa bir mesaj yaz ve aradığın ürünü sor.",
      checklist: [
        "Aradığın ürünü yaz",
        "Beden ve renk sor",
        "Fiyatı sor",
        "Teslimatı ya da değişimi sor",
      ],
      minWords: 35,
      phrases: [
        { de: "I'm looking for a …", tr: "Bir … arıyorum", en: "I'm looking for a …" },
        { de: "Do you have it in …?", tr: "Bunun … rengi/bedeni var mı?", en: "Do you have it in …?" },
        { de: "How much is …?", tr: "… kaç para?", en: "How much is …?" },
        { de: "When does it arrive?", tr: "Ne zaman geliyor?", en: "When does it arrive?" },
        { de: "Can I change it?", tr: "Değiştirebilir miyim?", en: "Can I change it?" },
      ],
      sample:
        "Good morning,\n\nI'm looking for a blue jacket. Do you have the jacket in size twelve? How much is it? Is it cheap now? I want to order the jacket on the computer. My address is 12 Green Road. When does it arrive? And can I change it in the store?\n\nThank you very much\nElif Yilmaz",
    },
  },

  {
    level: "A1",
    index: 5,
    code: "A1.6",
    titleDe: "In town",
    titleTr: "Şehirde",
    focus: [
      { de: "Imperatives", tr: "yol tarifi verme: Go straight ahead" },
      { de: "by bus / on foot", tr: "hangi araçla" },
      { de: "Prepositions of place", tr: "next to, opposite, behind" },
      { de: "Could you …?", tr: "kibar rica" },
    ],
    canDo: [
      { de: "I can ask for the way and understand directions.", tr: "Yol sorabiliyor ve tarifi anlayabiliyorum.", en: "I can ask for the way and understand directions." },
      { de: "I can buy a ticket and ask about the platform.", tr: "Bilet alabiliyor ve peronu sorabiliyorum.", en: "I can buy a ticket and ask about the platform." },
      { de: "I can say how I travel.", tr: "Hangi araçla gittiğimi söyleyebiliyorum.", en: "I can say how I travel." },
      { de: "I can ask for help when I am lost.", tr: "Yolu bulamayınca yardım isteyebiliyorum.", en: "I can ask for help when I am lost." },
      { de: "I can ask what there is to see in a town.", tr: "Bir şehirde nelerin gezilebileceğini sorabiliyorum.", en: "I can ask what there is to see in a town." },
    ],
    listening: {
      title: "At the information desk",
      titleTr: "Danışma gişesinde",
      situation: "Bir yolcu tren bilgisi soruyor.",
      turns: [
        { speaker: "Passenger", de: "Excuse me, when does the train to New York leave?", tr: "Affedersiniz, New York treni ne zaman kalkıyor?" },
        { speaker: "Clerk", de: "At ten, from platform three.", tr: "Onda, üç numaralı perondan." },
        { speaker: "Passenger", de: "Is the train late today?", tr: "Tren bugün rötarlı mı?" },
        { speaker: "Clerk", de: "No, the train is not late. It is on time.", tr: "Hayır, tren rötarlı değil. Zamanında." },
        { speaker: "Passenger", de: "Good. How much is a ticket to New York?", tr: "Güzel. New York'a bilet kaç para?" },
        { speaker: "Clerk", de: "One-way or round-trip?", tr: "Tek yön mü gidiş dönüş mü?" },
        { speaker: "Passenger", de: "A round-trip ticket, please. And where is the platform?", tr: "Gidiş dönüş lütfen. Peron nerede?" },
        { speaker: "Clerk", de: "90. Go straight ahead, then turn left.", tr: "90. Dümdüz gidin, sonra sola dönün." },
      ],
      questions: [
        { de: "Which platform does the train leave from?", tr: "Tren hangi perondan kalkıyor?", options: ["Platform one", "Platform two", "Platform three", "Platform ten"], answer: 2 },
        { de: "Is the train late?", tr: "Tren rötarlı mı?", options: ["Yes, an hour", "Yes, a little", "No, it is not late", "The clerk does not say"], answer: 2 },
        { de: "How much is a round-trip ticket?", tr: "Gidiş dönüş bilet kaç para?", options: ["90", "48", "20", "10"], answer: 0 },
      ],
    },
    reading: {
      title: "The way to my place",
      titleTr: "Yol tarifi mesajı",
      genre: "Mesaj",
      text: "Hi Deniz,\n\nHere is the way to my place: take the bus to Park Square. Then go straight ahead to the church. At the church turn left. My place is next to the gym. It is near — you can walk from the train station too. Ask someone on the way!\n\nSee you\nJan",
      questions: [
        { de: "How does Deniz get to Jan?", tr: "Deniz, Jan'a nasıl gidiyor?", options: ["By bus", "By car", "By taxi", "By bike"], answer: 0 },
        { de: "Where is Jan's place?", tr: "Jan'ın evi nerede?", options: ["At the station", "Next to the gym", "In front of the church", "Between the museum and the park"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "Yoldan geçen birine yol soruyorsun.", de: "Excuse me, where is the train station? Is it far from here?", tr: "Affedersiniz, gar nerede? Buradan uzak mı?" },
      { situation: "Gişede bilet alıyorsun.", de: "I'd like a ticket to New York, please. A round-trip ticket.", tr: "New York'a bir bilet istiyorum lütfen. Gidiş dönüş." },
    ],
    writing: {
      prompt: "Seni ziyaret edecek bir arkadaşına evine nasıl geleceğini yazan bir mesaj yaz.",
      checklist: [
        "Arkadaşının hangi araçla geleceğini yaz",
        "Durağın adını yaz",
        "En az iki yön ver (straight ahead, left, right)",
        "Ne kadar sürdüğünü yaz",
      ],
      minWords: 35,
      phrases: [
        { de: "Take the bus to …", tr: "…'e kadar otobüsle git", en: "Take the bus to …" },
        { de: "Where do I get off?", tr: "Nerede inmem gerekiyor?", en: "Where do I get off?" },
        { de: "Go straight ahead.", tr: "Dümdüz git", en: "Go straight ahead." },
        { de: "My place is next to …", tr: "Evim …'in yanında", en: "My place is next to …" },
        { de: "You can go on foot.", tr: "Yürüyerek gidebilirsin", en: "You can go on foot." },
      ],
      sample:
        "Hi Mert, see you on Saturday! Take the bus to Park Square — it takes ten minutes. Then go straight ahead to the church. At the church turn right. My place is next to the gym, number 15. From the train station it is not far and you can go on foot. Can you find the way? Ask someone at the station!",
    },
  },

  {
    level: "A1",
    index: 6,
    code: "A1.7",
    titleDe: "Home and living",
    titleTr: "Ev ve yaşam",
    focus: [
      { de: "There is / There are", tr: "„… var“ demek" },
      { de: "Prepositions of place", tr: "on the table, in the corner" },
      { de: "must / must not", tr: "kural ve zorunluluk" },
      { de: "Rent and bills", tr: "kira dili" },
    ],
    canDo: [
      { de: "I can describe my apartment.", tr: "Evimi tarif edebiliyorum.", en: "I can describe my apartment." },
      { de: "I can say where something is.", tr: "Bir eşyanın nerede olduğunu söyleyebiliyorum.", en: "I can say where something is." },
      { de: "I can introduce myself to the neighbors.", tr: "Komşulara kendimi tanıtabiliyorum.", en: "I can introduce myself to the neighbors." },
      { de: "I can report a problem in the apartment.", tr: "Evdeki bir arızayı bildirebiliyorum.", en: "I can report a problem in the apartment." },
      { de: "I can talk about the rent and the bills.", tr: "Kira ve faturalar hakkında konuşabiliyorum.", en: "I can talk about the rent and the bills." },
    ],
    listening: {
      title: "Can I see the apartment?",
      titleTr: "Daire gezme",
      situation: "Bir aile kiralık daireyi geziyor.",
      turns: [
        { speaker: "Mrs. Demir", de: "Good afternoon. Can I see the apartment?", tr: "İyi günler. Daireyi görebilir miyim?" },
        { speaker: "Owner", de: "Yes, come in. There are two rooms, a kitchen and a bathroom.", tr: "Evet, buyurun. İki oda, bir mutfak ve bir banyo var." },
        { speaker: "Mrs. Demir", de: "It is very quiet here. Is there a yard?", tr: "Burası çok sessiz. Bahçe var mı?" },
        { speaker: "Owner", de: "There is a yard with two trees.", tr: "İki ağaçlı bir bahçe var." },
        { speaker: "Mrs. Demir", de: "How much is the rent?", tr: "Kira ne kadar?" },
        { speaker: "Owner", de: "620 every month. Water and electricity are 140.", tr: "Ayda 620. Su ve elektrik 140." },
        { speaker: "Mrs. Demir", de: "The lamp in the kitchen is broken. It doesn't work.", tr: "Mutfaktaki lamba bozuk. Çalışmıyor." },
        { speaker: "Owner", de: "Yes, but I can fix it tomorrow.", tr: "Evet, ama yarın onarabilirim." },
      ],
      questions: [
        { de: "How many rooms are there in the apartment?", tr: "Dairede kaç oda var?", options: ["One room", "Two rooms", "Three rooms", "Four rooms"], answer: 1 },
        { de: "What is there in the yard?", tr: "Bahçede ne var?", options: ["Two trees", "A table and chairs", "A dog", "Flowers"], answer: 0 },
        { de: "What is broken?", tr: "Ne bozuk?", options: ["The window", "The lamp in the kitchen", "The faucet", "The elevator"], answer: 1 },
      ],
    },
    reading: {
      title: "Apartment for rent",
      titleTr: "Kiralık daire ilanı",
      genre: "İlan",
      text: "Apartment for rent\n\n2 rooms, kitchen, bathroom\nFirst floor, with a yard, very quiet\nRent: 620 every month\nWater and electricity: 140\nFree from May 1\n\nThe neighbors are friendly.\nNo animals, please.\nPhone number: 0176 22 33 44",
      questions: [
        { de: "How much is the rent every month?", tr: "Kira ayda ne kadar?", options: ["140", "620", "760", "May 1"], answer: 1 },
        { de: "What is not allowed in the apartment?", tr: "Dairede neye izin yok?", options: ["Children", "Animals", "Friends", "Music"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "Yeni komşuna kendini tanıtıyorsun.", de: "Good afternoon, we are new here. We live on the third floor.", tr: "İyi günler, buraya yeni taşındık. Üçüncü katta oturuyoruz." },
      { situation: "Ev sahibine arıza bildiriyorsun.", de: "The faucet in the bathroom is broken. Can you fix it?", tr: "Banyodaki musluk bozuk. Onarabilir misiniz?" },
    ],
    writing: {
      prompt: "Yeni evini bir arkadaşına anlatan kısa bir mesaj yaz.",
      checklist: [
        "Kaç odası olduğunu yaz",
        "„There is / There are“ ile bir cümle kur",
        "Bir eşyanın yerini yaz (on the table, in the corner …)",
        "Kirayı yaz",
      ],
      minWords: 35,
      phrases: [
        { de: "There are two rooms.", tr: "İki oda var", en: "There are two rooms." },
        { de: "There is also a …", tr: "Ayrıca bir … var", en: "There is also a …" },
        { de: "The … is on the table.", tr: "… masanın üstünde", en: "The … is on the table." },
        { de: "It's next to the chair.", tr: "Sandalyenin yanında", en: "It's next to the chair." },
        { de: "How much is the rent?", tr: "Kira ne kadar?", en: "How much is the rent?" },
      ],
      sample:
        "Hi Selin, I have a new apartment! There are two rooms, a kitchen and a bathroom. The apartment is quiet and the neighbors are friendly. There is also a yard with a tree. My sofa is in the living room and the lamp is on the table. The rent is 620 every month, and water and electricity are 140. Can you come on Saturday?",
    },
  },

  {
    level: "A1",
    index: 7,
    code: "A1.8",
    titleDe: "Free time",
    titleTr: "Boş zaman",
    focus: [
      { de: "like / love + -ing", tr: "hobi anlatmak: I like swimming" },
      { de: "can / can't", tr: "yapabilmek ve yapamamak" },
      { de: "Do you want to …? / Would you like to …?", tr: "davet etmek" },
      { de: "Present continuous", tr: "şu an olan: it's raining" },
    ],
    canDo: [
      { de: "I can talk about my hobbies.", tr: "Hobilerimden bahsedebiliyorum.", en: "I can talk about my hobbies." },
      { de: "I can say what I can do well and what I can't.", tr: "Neyi iyi yapabildiğimi ve neyi yapamadığımı söyleyebiliyorum.", en: "I can say what I can do well and what I can't." },
      { de: "I can invite someone.", tr: "Birini davet edebiliyorum.", en: "I can invite someone." },
      { de: "I can say no to an invitation politely.", tr: "Bir daveti nazikçe reddedebiliyorum.", en: "I can say no to an invitation politely." },
      { de: "I can talk about the weather.", tr: "Hava durumundan konuşabiliyorum.", en: "I can talk about the weather." },
    ],
    listening: {
      title: "Do you want to go to the movies?",
      titleTr: "Sinemaya gidelim mi?",
      situation: "İki arkadaş hafta sonu için plan yapıyor.",
      turns: [
        { speaker: "Lea", de: "Hi Ben! Would you like to go to the movies on Friday?", tr: "Merhaba Ben! Cuma sinemaya gitmek ister misin?" },
        { speaker: "Ben", de: "I'm afraid I can't on Friday. I play soccer with my team.", tr: "Cuma maalesef olmaz. Takımımla futbol oynuyorum." },
        { speaker: "Lea", de: "Maybe next time? What about Saturday?", tr: "Belki başka zaman? Cumartesi nasıl?" },
        { speaker: "Ben", de: "On Saturday I'm free. What movie is it?", tr: "Cumartesi boşum. Hangi film?" },
        { speaker: "Lea", de: "A movie with a great story. It starts at eight.", tr: "Güzel hikâyesi olan bir film. Sekizde başlıyor." },
        { speaker: "Ben", de: "Good idea! Let's meet at seven.", tr: "İyi fikir! Yedide buluşalım." },
        { speaker: "Lea", de: "Perfect. I'm going to buy the tickets.", tr: "Harika. Biletleri ben alacağım." },
      ],
      questions: [
        { de: "Why can't Ben come on Friday?", tr: "Ben cuma neden gelemiyor?", options: ["He is busy at work", "He plays soccer", "He is sick", "He doesn't like movies"], answer: 1 },
        { de: "What time does the movie start?", tr: "Film saat kaçta başlıyor?", options: ["At seven", "At eight", "At nine", "At ten"], answer: 1 },
        { de: "What is Lea going to do?", tr: "Lea ne yapacak?", options: ["Buy the tickets", "Play soccer", "Watch television", "Meet the team"], answer: 0 },
      ],
    },
    reading: {
      title: "Park day",
      titleTr: "Park günü programı",
      genre: "Duyuru",
      text: "Park day on Sunday\n\n11 o'clock: music with a band on the grass\n1 o'clock: sport and games for the children\n3 o'clock: swim in the lake\n5 o'clock: a movie in the park\n\nThe tickets are free.\nWhen it rains, there is no park day.",
      questions: [
        { de: "How much are the tickets?", tr: "Biletler kaç para?", options: ["Five", "Ten", "They are free", "Only the children pay"], answer: 2 },
        { de: "Is there a park day when it rains?", tr: "Yağmur yağarsa park günü oluyor mu?", options: ["Yes, at the movies", "Yes, but later", "No, there is no park day", "Yes, at the pool"], answer: 2 },
      ],
    },
    speaking: [
      { situation: "Hobinden bahsediyorsun.", de: "In my free time I like playing the guitar, but I can't sing.", tr: "Boş zamanımda gitar çalmayı severim ama şarkı söyleyemem." },
      { situation: "Bir daveti nazikçe reddediyorsun.", de: "I'm afraid I can't come tonight. Maybe next time?", tr: "Maalesef bu akşam gelemem. Belki başka zaman?" },
    ],
    writing: {
      prompt: "Bir arkadaşını hafta sonu bir etkinliğe davet eden kısa bir mesaj yaz.",
      checklist: [
        "Davet cümlesi kur",
        "Yer ve saat yaz",
        "„can“ ile bir cümle kur",
        "Cevap iste („Are you free?“)",
      ],
      minWords: 35,
      phrases: [
        { de: "Would you like to go to …?", tr: "…'e gitmek ister misin?", en: "Would you like to go to …?" },
        { de: "It starts at … o'clock.", tr: "Saat …'de başlıyor", en: "It starts at … o'clock." },
        { de: "We can …", tr: "… yapabiliriz", en: "We can …" },
        { de: "Are you free on …?", tr: "… günü boş musun?", en: "Are you free on …?" },
        { de: "Let's meet at …", tr: "…'de buluşalım", en: "Let's meet at …" },
      ],
      sample:
        "Hi Nora, there is a park day on Sunday. Would you like to go together? It starts at eleven o'clock. There is music with a band on the grass and games for the children. We can swim in the lake too. I'm going to get the tickets — they are free! Are you free on Sunday? Let's meet at the park at ten.",
    },
  },

  {
    level: "A1",
    index: 8,
    code: "A1.9",
    titleDe: "Health and the body",
    titleTr: "Sağlık ve vücut",
    focus: [
      { de: "I have a headache / My back hurts", tr: "şikâyet anlatma" },
      { de: "must / have to", tr: "zorunluluk" },
      { de: "should / shouldn't", tr: "öğüt verme" },
      { de: "Making an appointment", tr: "randevu dili" },
    ],
    canDo: [
      { de: "I can say what hurts.", tr: "Neremin ağrıdığını söyleyebiliyorum.", en: "I can say what hurts." },
      { de: "I can make an appointment at the doctor's.", tr: "Doktordan randevu alabiliyorum.", en: "I can make an appointment at the doctor's." },
      { de: "I can ask for a medicine at the pharmacy.", tr: "Eczanede ilaç sorabiliyorum.", en: "I can ask for a medicine at the pharmacy." },
      { de: "I can phone work and say that I am sick.", tr: "İşe telefon edip hasta olduğumu bildirebiliyorum.", en: "I can phone work and say that I am sick." },
      { de: "I can give someone advice.", tr: "Birine öğüt verebiliyorum.", en: "I can give someone advice." },
    ],
    listening: {
      title: "An appointment at the doctor's",
      titleTr: "Doktordan randevu",
      situation: "Bir hasta muayenehaneyi arıyor.",
      turns: [
        { speaker: "Receptionist", de: "Dr. Weber's office, good morning.", tr: "Doktor Weber'in muayenehanesi, günaydın." },
        { speaker: "Patient", de: "Good morning. I need an appointment. I have a headache and my ear hurts.", tr: "Günaydın. Randevuya ihtiyacım var. Başım ağrıyor ve kulağım acıyor." },
        { speaker: "Receptionist", de: "I'm sorry. Is tomorrow at ten o'clock good for you?", tr: "Geçmiş olsun. Yarın saat on uygun mu?" },
        { speaker: "Patient", de: "Tomorrow I must work. Do I have to wait a long time?", tr: "Yarın çalışmam gerekiyor. Uzun beklemem gerekir mi?" },
        { speaker: "Receptionist", de: "No. Today at four o'clock the doctor is free.", tr: "Hayır. Bugün saat dörtte doktor boş." },
        { speaker: "Patient", de: "Good. Do I have to pay?", tr: "Güzel. Ödeme yapmam gerekiyor mu?" },
        { speaker: "Receptionist", de: "No, but please be there at four.", tr: "Hayır, ama lütfen dörtte orada olun." },
      ],
      questions: [
        { de: "What is the problem?", tr: "Kişinin şikâyeti ne?", options: ["A toothache", "A headache", "A bad hand", "A cold"], answer: 1 },
        { de: "When is the appointment?", tr: "Randevu ne zaman?", options: ["Tomorrow at ten", "Tomorrow at four", "Today at four", "Next week"], answer: 2 },
        { de: "Does the patient have to pay?", tr: "Hastanın ödeme yapması gerekiyor mu?", options: ["Yes, a lot", "Yes, a little", "No", "Only tomorrow"], answer: 2 },
      ],
    },
    reading: {
      title: "Medicine for a headache",
      titleTr: "İlaç kullanma bilgisi",
      genre: "Bilgi metni",
      text: "Medicine for a headache\n\nAdults: one tablet, three times a day, after food.\nChildren: do not take this medicine.\nDo not take more than five tablets a day.\nWith 39 degrees: call the doctor.\n\nTake the tablet with a glass of water.\nKeep the medicine in a dark and cold place.",
      questions: [
        { de: "How many times a day does an adult take a tablet?", tr: "Bir yetişkin günde kaç kez alıyor?", options: ["One time", "Two times", "Three times", "Every hour"], answer: 2 },
        { de: "What must you do with 39 degrees?", tr: "39 derecede ne yapmalı?", options: ["Take more tablets", "Call the doctor", "Only drink water", "Wait a week"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "Doktora şikâyetini anlatıyorsun.", de: "I have a headache and my arm hurts.", tr: "Başım ağrıyor ve kolum acıyor." },
      { situation: "Hasta arkadaşına öğüt veriyorsun.", de: "You should sleep and drink a lot of water.", tr: "Uyumalı ve bol su içmelisin." },
    ],
    writing: {
      prompt: "Hastasın ve işe gidemiyorsun. Şefine kısa bir e-posta yaz.",
      checklist: [
        "Hasta olduğunu yaz",
        "Şikâyetini yaz",
        "Kaç gün gelemeyeceğini yaz",
        "Ne yapacağını yaz (doktora gitmek, haber vermek)",
      ],
      minWords: 30,
      phrases: [
        { de: "I'm sick.", tr: "Hastayım.", en: "I'm sick." },
        { de: "I can't come to work today.", tr: "Bugün işe gelemiyorum.", en: "I can't come to work today." },
        { de: "I have a headache.", tr: "Başım ağrıyor.", en: "I have a headache." },
        { de: "I must go to the doctor.", tr: "Doktora gitmem gerekiyor.", en: "I must go to the doctor." },
        { de: "I'll be better tomorrow.", tr: "Yarın daha iyi olacağım.", en: "I'll be better tomorrow." },
      ],
      sample:
        "Dear Mrs. Clark,\n\nI am sick and I can't come to work today. I have a headache and my tooth hurts. I must go to the doctor at four o'clock — I have an appointment. Then I am going to sleep. I think I'll be better tomorrow. I'm going to call you in the evening.\n\nThank you very much\nAli Kaya",
    },
  },

  {
    level: "A1",
    index: 9,
    code: "A1.10",
    titleDe: "Keeping in touch",
    titleTr: "İletişim ve geçmişe ilk adım",
    focus: [
      { de: "was / were", tr: "„… idim“ demek" },
      { de: "Past simple: -ed", tr: "düzenli geçmiş zaman" },
      { de: "Irregular past", tr: "went, had, saw" },
      { de: "Did you …?", tr: "geçmişte soru sormak" },
    ],
    canDo: [
      { de: "I can make a phone call and leave a message.", tr: "Telefonla arayıp mesaj bırakabiliyorum.", en: "I can make a phone call and leave a message." },
      { de: "I can write a short message and invite someone.", tr: "Kısa mesaj yazıp birini davet edebiliyorum.", en: "I can write a short message and invite someone." },
      { de: "I can say what I did yesterday.", tr: "Dün ne yaptığımı anlatabiliyorum.", en: "I can say what I did yesterday." },
      { de: "I can give a date.", tr: "Bir tarihi söyleyebiliyorum.", en: "I can give a date." },
      { de: "I can talk about my weekend.", tr: "Hafta sonumu anlatabiliyorum.", en: "I can talk about my weekend." },
    ],
    listening: {
      title: "On the phone",
      titleTr: "Telefonda",
      situation: "Bir kadın işyerini arıyor ama aradığı kişi yok.",
      turns: [
        { speaker: "Mrs. Aydin", de: "Good afternoon, this is Nuray Aydin. Can I speak to Mr. Berg?", tr: "İyi günler, ben Nuray Aydın. Bay Berg ile görüşebilir miyim?" },
        { speaker: "Colleague", de: "Sorry, Mr. Berg is not here now. He comes back at two o'clock.", tr: "Kusura bakmayın, Bay Berg şu an burada değil. Saat ikide dönüyor." },
        { speaker: "Mrs. Aydin", de: "Can you send him a message? I have a question about the class.", tr: "Ona bir mesaj gönderebilir misiniz? Ders hakkında bir sorum var." },
        { speaker: "Colleague", de: "Yes, of course. What is your number?", tr: "Evet, tabii. Numaranız nedir?" },
        { speaker: "Mrs. Aydin", de: "0157 88 44 21. He can call me until six o'clock.", tr: "0157 88 44 21. Beni altıya kadar arayabilir." },
        { speaker: "Colleague", de: "Fine, I'll tell him.", tr: "Tamam, ona söyleyeceğim." },
      ],
      questions: [
        { de: "Why does Mrs. Aydin call?", tr: "Bayan Aydın neden arıyor?", options: ["She is sick", "She has a question about the class", "She wants a ticket", "She is at home"], answer: 1 },
        { de: "When does Mr. Berg come back?", tr: "Bay Berg ne zaman dönüyor?", options: ["At one o'clock", "At two o'clock", "At six o'clock", "Tomorrow"], answer: 1 },
        { de: "Until when can Mr. Berg call?", tr: "Bay Berg ne zamana kadar arayabilir?", options: ["Until two o'clock", "Until four o'clock", "Until six o'clock", "Until eight o'clock"], answer: 2 },
      ],
    },
    reading: {
      title: "Hello from London",
      titleTr: "Kartpostal",
      genre: "Kartpostal",
      text: "Dear Grandma,\n\nHello from London! We arrived on Friday. On Saturday we visited the museum and in the evening we went to a restaurant. Yesterday the weather was not good, but we walked in the park. On May 1st we travel home.\n\nSee you soon!\nLove,\nEmre",
      questions: [
        { de: "What did Emre do on Saturday?", tr: "Emre cumartesi ne yaptı?", options: ["He arrived in London", "He visited the museum", "He traveled home", "He stayed at the hotel"], answer: 1 },
        { de: "When does Emre travel home?", tr: "Emre ne zaman dönüyor?", options: ["On Friday", "On Saturday", "On May 1st", "Yesterday"], answer: 2 },
      ],
    },
    speaking: [
      { situation: "Telefonda kendini tanıtıyorsun.", de: "Good afternoon, this is Ali Kaya. Can I speak to Mrs. Berg?", tr: "İyi günler, ben Ali Kaya. Bayan Berg ile görüşebilir miyim?" },
      { situation: "Hafta sonunu anlatıyorsun.", de: "On Saturday I went to the movies and on Sunday I slept a long time.", tr: "Cumartesi sinemaya gittim, pazar da uzun uyudum." },
    ],
    writing: {
      prompt: "Bir arkadaşına hafta sonunu anlatan kısa bir mesaj yaz.",
      checklist: [
        "En az üç geçmiş zaman cümlesi kur",
        "Bir düzenli (-ed) ve bir düzensiz fiil kullan",
        "First / Then / In the evening ile sırala",
        "Nasıl geçtiğini yaz („It was …“)",
      ],
      minWords: 40,
      phrases: [
        { de: "I visited …", tr: "…'i ziyaret ettim", en: "I visited …" },
        { de: "I went to …", tr: "…'e gittim", en: "I went to …" },
        { de: "First … Then …", tr: "Önce … Sonra …", en: "First … Then …" },
        { de: "In the evening …", tr: "Akşam …", en: "In the evening …" },
        { de: "It was very nice.", tr: "Çok güzeldi.", en: "It was very nice." },
      ],
      sample:
        "Hi Jana, my weekend was great! On Saturday I got up early and I traveled to Brighton by train. First I met a friend. Then we ate fish in a small restaurant. In the evening we saw a movie. On Sunday I slept a long time and I visited my mother. It was very nice. And what did you do last weekend?",
    },
  },
];
