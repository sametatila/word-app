import type { ModuleExamPlan } from "./types";

/**
 * A1 modül sınavlarının elle yazılan içeriği (10 modül).
 *
 * Her kâğıdın dinleme diyaloğu ve okuma metni modülün KENDİ sahnesinde
 * geçiyor: kafede sipariş modülünün sınavında restoran diyaloğu, ev
 * modülünde kiralık daire ilanı. Dil modülün öğrettiğinin bir tık üstünde
 * ama içinde: sınav bir sonraki adımı değil, bu modülü ölçüyor.
 *
 * Metinlerde bilinçli bir kısıt var: modül henüz görmediği bir yapıyı
 * TAŞIMIYOR. A1.5 metninde Perfekt yok (Perfekt A1.10'da geliyor), A1.6
 * metninde du-emri yok (A1.9'da geliyor). Sınavda anlaşılmayan bir yapı,
 * ölçülen beceriyi değil sabrı sınar.
 */
export const A1_EXAMS: ModuleExamPlan[] = [
  {
    level: "A1",
    index: 0,
    code: "A1.1",
    titleDe: "Ich stelle mich vor",
    titleTr: "Tanışma ve ben",
    focus: [
      { de: "sein & heißen", tr: "kendini tanıtma fiilleri" },
      { de: "W-Fragen", tr: "soru kelimesiyle soru sorma" },
      { de: "du oder Sie", tr: "senli ve kibar hitap" },
      { de: "Zahlen 1–100", tr: "sayı, yaş ve numara" },
    ],
    canDo: [
      { de: "Ich kann meinen Namen, mein Land und meinen Wohnort nennen.", tr: "Adımı, nereli olduğumu ve nerede oturduğumu söyleyebiliyorum.", en: "I can say my name, my country and where I live." },
      { de: "Ich kann fragen, wie jemand heißt und woher er kommt.", tr: "Birine adını ve nereli olduğunu sorabiliyorum.", en: "I can ask someone their name and where they are from." },
      { de: "Ich kann zwischen „du“ und „Sie“ wählen.", tr: "Senli mi kibar mı konuşacağıma karar verebiliyorum.", en: "I can choose between informal and formal address." },
      { de: "Ich kann meine Telefonnummer und mein Alter sagen.", tr: "Telefon numaramı ve yaşımı söyleyebiliyorum.", en: "I can give my phone number and my age." },
      { de: "Ich kann meinen Namen buchstabieren und ein Formular ausfüllen.", tr: "Adımı harf harf söyleyip bir formu doldurabiliyorum.", en: "I can spell my name and fill in a form." },
    ],
    listening: {
      title: "Der erste Kurstag",
      titleTr: "Kursun ilk günü",
      situation: "Dil kursunun ilk günü. İki kursiyer tanışıyor.",
      turns: [
        { speaker: "Marco", de: "Hallo! Ich heiße Marco. Und du?", tr: "Merhaba! Benim adım Marco. Ya sen?" },
        { speaker: "Elif", de: "Ich heiße Elif. Freut mich!", tr: "Benim adım Elif. Memnun oldum!" },
        { speaker: "Marco", de: "Woher kommst du, Elif?", tr: "Nerelisin Elif?" },
        { speaker: "Elif", de: "Ich komme aus der Türkei. Jetzt wohne ich in Köln.", tr: "Türkiyeliyim. Şimdi Köln'de oturuyorum." },
        { speaker: "Marco", de: "Und was bist du von Beruf?", tr: "Peki mesleğin ne?" },
        { speaker: "Elif", de: "Ich bin Ärztin. Ich arbeite in einer Praxis.", tr: "Doktorum. Bir muayenehanede çalışıyorum." },
        { speaker: "Marco", de: "Super. Wie schreibt man deinen Namen?", tr: "Harika. Adın nasıl yazılıyor?" },
        { speaker: "Elif", de: "E-L-I-F. Ganz einfach.", tr: "E-L-I-F. Çok kolay." },
      ],
      questions: [
        { de: "Woher kommt Elif?", tr: "Elif nereli?", options: ["Aus Italien", "Aus der Türkei", "Aus Österreich", "Aus Köln"], answer: 1 },
        { de: "Wo wohnt Elif jetzt?", tr: "Elif şimdi nerede oturuyor?", options: ["In Izmir", "In Wien", "In Köln", "In Berlin"], answer: 2 },
        { de: "Was ist Elif von Beruf?", tr: "Elif'in mesleği ne?", options: ["Lehrerin", "Ärztin", "Studentin", "Verkäuferin"], answer: 1 },
      ],
    },
    reading: {
      title: "Anmeldung – Sprachschule Köln",
      titleTr: "Kayıt formu",
      genre: "Form",
      text: "Anmeldung – Sprachschule Köln\n\nVorname: Elif\nNachname: Yilmaz\nGeburtsjahr: 1996\nLand: Türkei\nWohnort: Köln\nStraße: Bahnhofstraße 12\nPostleitzahl: 50667\nTelefon: 0221 45 67 89\nBeruf: Ärztin",
      questions: [
        { de: "Wie ist der Nachname?", tr: "Soyadı ne?", options: ["Elif", "Yilmaz", "Köln", "Ärztin"], answer: 1 },
        { de: "Wie ist die Postleitzahl?", tr: "Posta kodu kaç?", options: ["1996", "50667", "0221", "12"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "Kursta kendini tanıtıyorsun.", de: "Ich heiße Ali und ich komme aus Ankara.", tr: "Adım Ali ve Ankaralıyım." },
      { situation: "Tanımadığın birine kibar biçimde soruyorsun.", de: "Entschuldigung, wie heißen Sie und wo wohnen Sie?", tr: "Affedersiniz, adınız ne ve nerede oturuyorsunuz?" },
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
        { de: "Ich heiße …", tr: "Adım …", en: "My name is …" },
        { de: "Ich komme aus …", tr: "… ülkesindenim", en: "I come from …" },
        { de: "Ich wohne in …", tr: "…'da oturuyorum", en: "I live in …" },
        { de: "Ich bin … Jahre alt.", tr: "… yaşındayım.", en: "I am … years old." },
        { de: "Ich bin … von Beruf.", tr: "Mesleğim …", en: "I am a … by profession." },
      ],
      sample:
        "Hallo! Ich heiße Elif Yilmaz. Ich komme aus der Türkei, aus Izmir. Jetzt wohne ich in Köln. Ich bin achtundzwanzig Jahre alt. Ich bin Ärztin von Beruf und ich arbeite in einer Praxis. Ich lerne Deutsch. Wann beginnt der Kurs?",
    },
  },

  {
    level: "A1",
    index: 1,
    code: "A1.2",
    titleDe: "Familie und Menschen",
    titleTr: "Aile ve insanlar",
    focus: [
      { de: "haben + Akkusativ", tr: "„bir …'im var“ demek" },
      { de: "Possessivartikel", tr: "mein / meine / dein" },
      { de: "kein und nicht", tr: "iki olumsuzlama biçimi" },
      { de: "Plural", tr: "çoğul biçimler" },
    ],
    canDo: [
      { de: "Ich kann meine Familie vorstellen.", tr: "Ailemi tanıtabiliyorum.", en: "I can introduce my family." },
      { de: "Ich kann sagen, wen ich habe und wen ich nicht habe.", tr: "Kimlerin olduğunu ve olmadığını söyleyebiliyorum.", en: "I can say who I have and who I don't have." },
      { de: "Ich kann Personen auf einem Foto beschreiben.", tr: "Fotoğraftaki kişileri tarif edebiliyorum.", en: "I can describe people in a photo." },
      { de: "Ich kann sagen, wie jemand aussieht.", tr: "Birinin nasıl göründüğünü anlatabiliyorum.", en: "I can say what someone looks like." },
      { de: "Ich kann mit „nicht“ und „kein“ verneinen.", tr: "„nicht“ ve „kein“ ile olumsuz cümle kurabiliyorum.", en: "I can negate with „nicht“ and „kein“." },
    ],
    listening: {
      title: "Das Familienfoto",
      titleTr: "Aile fotoğrafı",
      situation: "İki arkadaş bir fotoğrafa bakıyor.",
      turns: [
        { speaker: "Lena", de: "Ist das deine Familie auf dem Foto?", tr: "Fotoğraftaki senin ailen mi?" },
        { speaker: "Ahmet", de: "Ja, das ist meine Familie. Das sind meine Eltern.", tr: "Evet, bu benim ailem. Bunlar da annemle babam." },
        { speaker: "Lena", de: "Und wer ist das Mädchen links?", tr: "Peki soldaki kız kim?" },
        { speaker: "Ahmet", de: "Das ist meine Schwester Ayse. Sie ist zwanzig Jahre alt.", tr: "O benim kız kardeşim Ayşe. Yirmi yaşında." },
        { speaker: "Lena", de: "Hast du auch einen Bruder?", tr: "Erkek kardeşin de var mı?" },
        { speaker: "Ahmet", de: "Nein, ich habe keinen Bruder. Aber wir haben einen Hund!", tr: "Hayır, erkek kardeşim yok. Ama bir köpeğimiz var!" },
      ],
      questions: [
        { de: "Wer ist auf dem Foto?", tr: "Fotoğrafta kim var?", options: ["Ahmets Familie", "Lenas Eltern", "Ahmets Kollegen", "Ahmets Nachbarn"], answer: 0 },
        { de: "Wie alt ist Ayse?", tr: "Ayşe kaç yaşında?", options: ["Zehn", "Zwölf", "Zwanzig", "Dreißig"], answer: 2 },
        { de: "Hat Ahmet einen Bruder?", tr: "Ahmet'in erkek kardeşi var mı?", options: ["Ja, einen", "Ja, zwei", "Nein, keinen", "Nein, aber zwei Schwestern"], answer: 2 },
      ],
    },
    reading: {
      title: "Eine Einladung",
      titleTr: "Bir davet mesajı",
      genre: "Mesaj",
      text: "Hallo Maria,\n\nam Samstag feiern wir ein Familienfest. Meine Oma wird achtzig! Meine Tante bringt einen Kuchen mit und mein Onkel macht Musik. Wir sind ungefähr zwanzig Personen. Kommst du auch? Bring bitte deine Schwester mit!\n\nLiebe Grüße\nNuray",
      questions: [
        { de: "Was feiert die Familie?", tr: "Aile ne kutluyor?", options: ["Den Geburtstag der Oma", "Eine Hochzeit", "Weihnachten", "Marias Geburtstag"], answer: 0 },
        { de: "Wer bringt den Kuchen mit?", tr: "Pastayı kim getiriyor?", options: ["Die Oma", "Der Onkel", "Die Tante", "Maria"], answer: 2 },
      ],
    },
    speaking: [
      { situation: "Arkadaşına kardeşlerinden bahsediyorsun.", de: "Ich habe einen Bruder, aber ich habe keine Schwester.", tr: "Bir erkek kardeşim var ama kız kardeşim yok." },
      { situation: "Fotoğraftaki kişiyi tarif ediyorsun.", de: "Das ist meine Tante. Sie ist groß und sie trägt eine Brille.", tr: "Bu benim teyzem. Uzun boylu ve gözlük takıyor." },
    ],
    writing: {
      prompt: "Ailenden bahseden kısa bir metin yaz.",
      checklist: [
        "En az üç aile üyesini yaz",
        "„mein / meine“ ile iyelik kullan",
        "Bir olumsuz cümle kur („Ich habe kein …“)",
        "Bir kişiyi kısaca tarif et",
      ],
      minWords: 35,
      phrases: [
        { de: "Das ist mein …", tr: "Bu benim …", en: "This is my …" },
        { de: "Ich habe einen / eine …", tr: "Bir …'im var", en: "I have a …" },
        { de: "Ich habe kein / keine …", tr: "…'im yok", en: "I don't have a …" },
        { de: "Er / Sie ist … Jahre alt.", tr: "O … yaşında.", en: "He / She is … years old." },
        { de: "Sie arbeitet bei …", tr: "… şirketinde çalışıyor", en: "She works at …" },
      ],
      sample:
        "Meine Familie ist nicht groß. Das sind meine Eltern: mein Vater heißt Kemal und meine Mutter heißt Sevgi. Mein Vater ist Lehrer und meine Mutter arbeitet bei einer Firma. Ich habe eine Schwester. Sie heißt Ayse und sie ist zwanzig Jahre alt. Sie ist klein und sie hat braune Haare. Ich habe keinen Bruder. Wir haben aber einen Hund.",
    },
  },

  {
    level: "A1",
    index: 2,
    code: "A1.3",
    titleDe: "Essen und Trinken",
    titleTr: "Yeme-içme",
    focus: [
      { de: "möchten / hätte gern", tr: "kibarca istemek" },
      { de: "Akkusativ", tr: "einen / eine / ein ile nesne" },
      { de: "gern – lieber", tr: "tercih söylemek" },
      { de: "Mengen und Preise", tr: "miktar ve fiyat" },
    ],
    canDo: [
      { de: "Ich kann im Café und im Restaurant bestellen.", tr: "Kafede ve restoranda sipariş verebiliyorum.", en: "I can order in a café and a restaurant." },
      { de: "Ich kann sagen, was ich gern esse und trinke.", tr: "Neyi sevdiğimi, ne yiyip içtiğimi söyleyebiliyorum.", en: "I can say what I like to eat and drink." },
      { de: "Ich kann nach dem Preis fragen und bezahlen.", tr: "Fiyatı sorup hesabı ödeyebiliyorum.", en: "I can ask the price and pay." },
      { de: "Ich kann Mengen angeben: ein Kilo, eine Flasche, ein Stück.", tr: "Miktar söyleyebiliyorum: bir kilo, bir şişe, bir tane.", en: "I can state quantities: a kilo, a bottle, a piece." },
      { de: "Ich kann sagen, was ich nicht essen darf.", tr: "Neyi yiyemediğimi söyleyebiliyorum.", en: "I can say what I must not eat." },
    ],
    listening: {
      title: "Im Restaurant",
      titleTr: "Restoranda",
      situation: "Bir konuk akşam yemeği sipariş ediyor.",
      turns: [
        { speaker: "Kellner", de: "Guten Abend! Was möchten Sie trinken?", tr: "İyi akşamlar! Ne içmek istersiniz?" },
        { speaker: "Gast", de: "Ich hätte gern ein Wasser, bitte.", tr: "Bir su istiyorum lütfen." },
        { speaker: "Kellner", de: "Gern. Und was möchten Sie essen?", tr: "Tabii. Peki ne yemek istersiniz?" },
        { speaker: "Gast", de: "Als Vorspeise nehme ich eine Suppe. Dann möchte ich den Fisch — aber ohne Zwiebeln, bitte. Ich bin allergisch.", tr: "Başlangıç olarak çorba alayım. Sonra balık istiyorum ama soğansız lütfen. Alerjim var." },
        { speaker: "Kellner", de: "Kein Problem. Möchten Sie auch einen Nachtisch?", tr: "Sorun değil. Tatlı da ister misiniz?" },
        { speaker: "Gast", de: "Nein, danke. Aber die Rechnung, bitte.", tr: "Hayır, teşekkürler. Ama hesabı alabilir miyim?" },
      ],
      questions: [
        { de: "Was trinkt der Gast?", tr: "Konuk ne içiyor?", options: ["Einen Kaffee", "Ein Wasser", "Einen Tee", "Einen Wein"], answer: 1 },
        { de: "Was isst der Gast als Vorspeise?", tr: "Konuk başlangıç olarak ne yiyor?", options: ["Einen Salat", "Eine Suppe", "Ein Brot", "Käse"], answer: 1 },
        { de: "Warum möchte der Gast keine Zwiebeln?", tr: "Konuk neden soğan istemiyor?", options: ["Sie schmecken nicht", "Er ist allergisch", "Sie sind zu teuer", "Es gibt keine mehr"], answer: 1 },
      ],
    },
    reading: {
      title: "Café Sonne – Frühstück",
      titleTr: "Kahvaltı menüsü",
      genre: "Menü",
      text: "Café Sonne – Frühstück\n\nKleines Frühstück: Brot, Butter, Marmelade — 4,50 €\nGroßes Frühstück: Brot, Käse, Wurst, ein Ei — 7,90 €\n\nKaffee 2,80 € · Tee 2,50 € · Orangensaft 3,20 €\n\nFrühstück gibt es von 8 bis 11 Uhr.",
      questions: [
        { de: "Was kostet das große Frühstück?", tr: "Büyük kahvaltı kaç para?", options: ["4,50 €", "7,90 €", "2,80 €", "3,20 €"], answer: 1 },
        { de: "Wann gibt es Frühstück?", tr: "Kahvaltı ne zaman var?", options: ["Von 8 bis 11 Uhr", "Von 11 bis 14 Uhr", "Den ganzen Tag", "Nur am Wochenende"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Kafede sipariş veriyorsun.", de: "Ich hätte gern einen Kaffee und ein Stück Kuchen, bitte.", tr: "Bir kahve ve bir dilim pasta istiyorum lütfen." },
      { situation: "Garsona bir şey yemediğini söylüyorsun.", de: "Ich esse kein Fleisch. Gibt es etwas ohne Fleisch?", tr: "Et yemiyorum. Etsiz bir şey var mı?" },
    ],
    writing: {
      prompt: "Bir arkadaşını yemeğe davet eden kısa bir mesaj yaz.",
      checklist: [
        "Davet cümlesi kur („Möchtest du …?“)",
        "Ne pişireceğini yaz",
        "Saati yaz",
        "Ne yiyip içtiğini soran bir soru sor",
      ],
      minWords: 30,
      phrases: [
        { de: "Möchtest du …?", tr: "… ister misin?", en: "Would you like …?" },
        { de: "Ich koche …", tr: "… pişiriyorum", en: "I am cooking …" },
        { de: "Ich esse gern …", tr: "…'i severek yerim", en: "I like eating …" },
        { de: "Isst du …?", tr: "… yer misin?", en: "Do you eat …?" },
        { de: "Wir essen um … Uhr.", tr: "Saat …'de yiyoruz.", en: "We eat at … o'clock." },
      ],
      sample:
        "Hallo Jonas, möchtest du am Samstag zu mir zum Essen kommen? Ich koche eine Suppe und Fisch mit Gemüse. Ich esse sehr gern Fisch. Wir essen um sieben Uhr. Bring bitte nur ein Getränk mit. Isst du Fleisch? Und trinkst du lieber Tee oder Wasser? Bis Samstag! Elif",
    },
  },

  {
    level: "A1",
    index: 3,
    code: "A1.4",
    titleDe: "Mein Tag",
    titleTr: "Günlük düzen",
    focus: [
      { de: "trennbare Verben", tr: "aufstehen, einkaufen, anrufen" },
      { de: "Uhrzeit", tr: "saat söylemek ve sormak" },
      { de: "V2-Regel", tr: "zaman başta, fiil yine ikinci sırada" },
      { de: "am / um / von … bis", tr: "gün ve saat edatları" },
    ],
    canDo: [
      { de: "Ich kann meinen Tagesablauf beschreiben.", tr: "Günlük düzenimi anlatabiliyorum.", en: "I can describe my daily routine." },
      { de: "Ich kann die Uhrzeit sagen und danach fragen.", tr: "Saati söyleyebiliyor ve sorabiliyorum.", en: "I can tell and ask the time." },
      { de: "Ich kann trennbare Verben richtig benutzen.", tr: "Ayrılabilen fiilleri doğru kullanabiliyorum.", en: "I can use separable verbs correctly." },
      { de: "Ich kann einen Termin ausmachen.", tr: "Birine vakti olup olmadığını sorup randevu ayarlayabiliyorum.", en: "I can arrange a meeting time." },
      { de: "Ich kann Sätze mit einer Zeitangabe am Anfang bilden.", tr: "Cümleye zaman ifadesiyle başlayabiliyorum.", en: "I can start a sentence with a time expression." },
    ],
    listening: {
      title: "Ein Termin am Wochenende",
      titleTr: "Hafta sonu için sözleşme",
      situation: "Sara, Tom'u arıyor ve buluşmak istiyor.",
      turns: [
        { speaker: "Sara", de: "Hallo Tom, hast du am Samstag Zeit?", tr: "Merhaba Tom, cumartesi vaktin var mı?" },
        { speaker: "Tom", de: "Am Samstag? Ich stehe spät auf, aber am Nachmittag habe ich frei.", tr: "Cumartesi mi? Geç kalkıyorum ama öğleden sonra boşum." },
        { speaker: "Sara", de: "Super. Um wie viel Uhr passt es dir?", tr: "Harika. Saat kaç sana uyar?" },
        { speaker: "Tom", de: "Um halb vier. Vorher kaufe ich noch ein.", tr: "Üç buçukta. Ondan önce alışveriş yapacağım." },
        { speaker: "Sara", de: "Gut, dann treffen wir uns um halb vier am Bahnhof.", tr: "Tamam, o zaman üç buçukta garda buluşuyoruz." },
        { speaker: "Tom", de: "Perfekt. Ich rufe dich vorher an.", tr: "Mükemmel. Öncesinde seni ararım." },
      ],
      questions: [
        { de: "Wann treffen sich Sara und Tom?", tr: "Sara ve Tom ne zaman buluşuyor?", options: ["Am Samstagvormittag", "Am Samstagnachmittag", "Am Sonntag", "Am Montag"], answer: 1 },
        { de: "Um wie viel Uhr treffen sie sich?", tr: "Saat kaçta buluşuyorlar?", options: ["Um drei Uhr", "Um halb vier", "Um vier Uhr", "Um halb fünf"], answer: 1 },
        { de: "Was macht Tom vorher?", tr: "Tom öncesinde ne yapıyor?", options: ["Er schläft", "Er kauft ein", "Er arbeitet", "Er geht ins Kino"], answer: 1 },
      ],
    },
    reading: {
      title: "Eine Notiz",
      titleTr: "Buzdolabına bırakılan not",
      genre: "Not",
      text: "Liebe Anna,\n\nich stehe morgen um sechs Uhr auf und fahre früh zur Arbeit. Die Arbeit fängt um sieben an und hört um vier Uhr auf. Danach kaufe ich ein. Am Abend habe ich Zeit. Rufst du mich um acht an?\n\nBis morgen!\nMarkus",
      questions: [
        { de: "Wann fängt die Arbeit an?", tr: "İş ne zaman başlıyor?", options: ["Um sechs Uhr", "Um sieben Uhr", "Um vier Uhr", "Um acht Uhr"], answer: 1 },
        { de: "Was macht Markus nach der Arbeit?", tr: "Markus işten sonra ne yapıyor?", options: ["Er schläft", "Er kauft ein", "Er geht ins Kino", "Er arbeitet weiter"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "Günlük düzenini anlatıyorsun.", de: "Ich stehe um sieben Uhr auf und ich gehe um acht Uhr zur Arbeit.", tr: "Yedide kalkıyorum ve sekizde işe gidiyorum." },
      { situation: "Arkadaşına vaktini soruyorsun.", de: "Hast du am Freitag Zeit? Um wie viel Uhr passt es dir?", tr: "Cuma vaktin var mı? Saat kaç sana uyar?" },
    ],
    writing: {
      prompt: "Sıradan bir gününü anlatan kısa bir metin yaz.",
      checklist: [
        "Kalkma saatini yaz",
        "En az iki ayrılabilen fiil kullan",
        "Zuerst / Dann / Danach ile sırala",
        "Akşamını da yaz",
      ],
      minWords: 35,
      phrases: [
        { de: "Mein Tag beginnt um …", tr: "Günüm …'de başlıyor", en: "My day starts at …" },
        { de: "Ich stehe um … auf.", tr: "Saat …'de kalkıyorum.", en: "I get up at …" },
        { de: "Zuerst … Dann … Danach …", tr: "Önce … Sonra … Ardından …", en: "First … Then … After that …" },
        { de: "Die Arbeit fängt um … an.", tr: "İş …'de başlıyor.", en: "Work starts at …" },
        { de: "Am Abend …", tr: "Akşamları …", en: "In the evening …" },
      ],
      sample:
        "Mein Tag beginnt um sechs Uhr. Zuerst stehe ich auf und dusche. Dann trinke ich Kaffee. Um halb acht fahre ich mit dem Bus zur Arbeit. Die Arbeit fängt um acht an und hört um fünf auf. Danach kaufe ich ein. Am Abend rufe ich meine Mutter an und sehe fern. Um elf Uhr gehe ich schlafen.",
    },
  },

  {
    level: "A1",
    index: 4,
    code: "A1.5",
    titleDe: "Einkaufen",
    titleTr: "Alışveriş",
    focus: [
      { de: "Akkusativ", tr: "einen / eine / ein ile nesne" },
      { de: "gefallen + Dativ", tr: "„hoşuma gidiyor“ demek" },
      { de: "Preise und Größen", tr: "fiyat ve beden" },
      { de: "möchten", tr: "istek bildirmek" },
    ],
    canDo: [
      { de: "Ich kann nach Größe, Farbe und Preis fragen.", tr: "Beden, renk ve fiyat sorabiliyorum.", en: "I can ask about size, colour and price." },
      { de: "Ich kann sagen, was mir gefällt und was nicht.", tr: "Neyin hoşuma gidip gitmediğini söyleyebiliyorum.", en: "I can say what I like and don't like." },
      { de: "Ich kann etwas anprobieren und umtauschen.", tr: "Bir şeyi deneyip değiştirebiliyorum.", en: "I can try something on and exchange it." },
      { de: "Ich kann Preise verstehen und bezahlen.", tr: "Fiyatları anlayıp ödeme yapabiliyorum.", en: "I can understand prices and pay." },
      { de: "Ich kann ein Geschenk aussuchen.", tr: "Hediye seçebiliyorum.", en: "I can choose a present." },
    ],
    listening: {
      title: "Im Kaufhaus",
      titleTr: "Mağazada",
      situation: "Bir müşteri ceket bakıyor.",
      turns: [
        { speaker: "Verkäuferin", de: "Guten Tag, kann ich Ihnen helfen?", tr: "İyi günler, yardımcı olabilir miyim?" },
        { speaker: "Kunde", de: "Ja, ich suche eine Jacke in Blau.", tr: "Evet, mavi bir ceket arıyorum." },
        { speaker: "Verkäuferin", de: "Welche Größe haben Sie?", tr: "Bedeniniz kaç?" },
        { speaker: "Kunde", de: "Größe achtunddreißig. Kann ich sie anprobieren?", tr: "Otuz sekiz beden. Deneyebilir miyim?" },
        { speaker: "Verkäuferin", de: "Natürlich, die Umkleide ist dort rechts.", tr: "Tabii, kabin şurada sağda." },
        { speaker: "Kunde", de: "Die Jacke gefällt mir, aber sie ist zu eng. Haben Sie auch Größe vierzig?", tr: "Ceket hoşuma gitti ama dar geldi. Kırk beden de var mı?" },
      ],
      questions: [
        { de: "Was sucht der Kunde?", tr: "Müşteri ne arıyor?", options: ["Eine Hose", "Eine Jacke", "Ein Hemd", "Einen Pullover"], answer: 1 },
        { de: "Welche Farbe möchte der Kunde?", tr: "Müşteri hangi rengi istiyor?", options: ["Rot", "Schwarz", "Blau", "Grün"], answer: 2 },
        { de: "Warum nimmt der Kunde die Jacke nicht?", tr: "Müşteri ceketi neden almıyor?", options: ["Sie ist zu teuer", "Sie ist zu eng", "Sie gefällt ihm nicht", "Die Farbe ist falsch"], answer: 1 },
      ],
    },
    reading: {
      title: "Sommer-Angebot",
      titleTr: "İndirim ilanı",
      genre: "İlan",
      text: "SOMMER-ANGEBOT bei Mode Klein!\n\nAlle Jacken: 30 % günstiger.\nT-Shirts ab 9,90 €.\nSchuhe: zwei Paar kaufen, ein Paar bezahlen.\n\nDas Angebot gilt von Montag bis Samstag.\nUmtausch nur mit Kassenbon.",
      questions: [
        { de: "Wie lange gilt das Angebot?", tr: "Kampanya ne kadar sürüyor?", options: ["Nur am Montag", "Von Montag bis Samstag", "Den ganzen Sommer", "Nur am Samstag"], answer: 1 },
        { de: "Was braucht man für einen Umtausch?", tr: "Değişim için ne gerekiyor?", options: ["Eine Karte", "Den Kassenbon", "Einen Ausweis", "Nichts"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "Mağazada beden soruyorsun.", de: "Entschuldigung, haben Sie das Hemd auch in Größe vierzig?", tr: "Affedersiniz, bu gömlek kırk bedende de var mı?" },
      { situation: "Bir ürünü beğendiğini ama pahalı bulduğunu söylüyorsun.", de: "Der Pullover gefällt mir, aber er ist zu teuer.", tr: "Kazak hoşuma gitti ama çok pahalı." },
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
        { de: "Ich suche einen / eine …", tr: "Bir … arıyorum", en: "I am looking for a …" },
        { de: "Haben Sie das auch in …?", tr: "Bunun … rengi/bedeni var mı?", en: "Do you have this in …?" },
        { de: "Was kostet …?", tr: "… kaç para?", en: "How much is …?" },
        { de: "Wie lange dauert die Lieferung?", tr: "Teslimat ne kadar sürüyor?", en: "How long does delivery take?" },
        { de: "Kann ich … umtauschen?", tr: "…'i değiştirebilir miyim?", en: "Can I exchange …?" },
      ],
      sample:
        "Guten Tag,\n\nich suche eine Jacke in Blau. Haben Sie die Jacke in Größe achtunddreißig? Was kostet sie? Ist sie im Angebot? Ich möchte die Jacke online bestellen. Wie lange dauert die Lieferung? Und kann ich sie umtauschen?\n\nVielen Dank und freundliche Grüße\nElif Yilmaz",
    },
  },

  {
    level: "A1",
    index: 5,
    code: "A1.6",
    titleDe: "In der Stadt",
    titleTr: "Şehirde",
    focus: [
      { de: "Imperativ (Sie-Form)", tr: "kibar yönlendirme: Gehen Sie …" },
      { de: "mit + Dativ", tr: "mit dem Bus, mit der Bahn" },
      { de: "man kann …", tr: "genel olarak ne yapılabildiğini söylemek" },
      { de: "W-Fragen", tr: "wo, wann, wie lange" },
    ],
    canDo: [
      { de: "Ich kann nach dem Weg fragen und eine Wegbeschreibung verstehen.", tr: "Yol sorabiliyor ve tarifi anlayabiliyorum.", en: "I can ask for and understand directions." },
      { de: "Ich kann eine Fahrkarte kaufen und nach dem Gleis fragen.", tr: "Bilet alabiliyor ve peronu sorabiliyorum.", en: "I can buy a ticket and ask about the platform." },
      { de: "Ich kann sagen, womit ich fahre.", tr: "Hangi araçla gittiğimi söyleyebiliyorum.", en: "I can say what transport I take." },
      { de: "Ich kann um Hilfe bitten, wenn ich den Weg nicht finde.", tr: "Yolu bulamayınca yardım isteyebiliyorum.", en: "I can ask for help when I am lost." },
      { de: "Ich kann fragen, was man in einer Stadt sehen kann.", tr: "Bir şehirde nelerin gezilebileceğini sorabiliyorum.", en: "I can ask what there is to see in a city." },
    ],
    listening: {
      title: "Am Informationsschalter",
      titleTr: "Danışma gişesinde",
      situation: "Bir yolcu tren bilgisi soruyor.",
      turns: [
        { speaker: "Reisender", de: "Entschuldigung, wann fährt der nächste Zug nach Hamburg?", tr: "Affedersiniz, Hamburg'a bir sonraki tren ne zaman kalkıyor?" },
        { speaker: "Mitarbeiter", de: "Um zehn Uhr zwanzig, von Gleis drei.", tr: "Onu yirmi geçe, üç numaralı perondan." },
        { speaker: "Reisender", de: "Muss ich umsteigen?", tr: "Aktarma yapmam gerekiyor mu?" },
        { speaker: "Mitarbeiter", de: "Nein, der Zug fährt direkt.", tr: "Hayır, tren direkt gidiyor." },
        { speaker: "Reisender", de: "Und was kostet eine Fahrkarte, einfach?", tr: "Peki tek yön bilet kaç para?" },
        { speaker: "Mitarbeiter", de: "Achtundvierzig Euro. Hin und zurück kostet neunzig Euro.", tr: "Kırk sekiz euro. Gidiş dönüş doksan euro." },
      ],
      questions: [
        { de: "Von welchem Gleis fährt der Zug?", tr: "Tren hangi perondan kalkıyor?", options: ["Von Gleis eins", "Von Gleis zwei", "Von Gleis drei", "Von Gleis zehn"], answer: 2 },
        { de: "Muss der Reisende umsteigen?", tr: "Yolcunun aktarma yapması gerekiyor mu?", options: ["Ja, einmal", "Ja, zweimal", "Nein, der Zug fährt direkt", "Das weiß der Mitarbeiter nicht"], answer: 2 },
        { de: "Was kostet die Fahrkarte hin und zurück?", tr: "Gidiş dönüş bilet kaç para?", options: ["48 Euro", "90 Euro", "20 Euro", "10 Euro"], answer: 1 },
      ],
    },
    reading: {
      title: "Der Weg zu mir",
      titleTr: "Yol tarifi mesajı",
      genre: "Mesaj",
      text: "Hallo Deniz,\n\nhier ist der Weg zu meiner Wohnung: Du nimmst die U-Bahn, Linie 4, bis zur Haltestelle Marktplatz. Dann gehst du geradeaus bis zur Ampel. An der Ampel gehst du links. Mein Haus ist gegenüber von der Bäckerei — nur fünf Minuten zu Fuß.\n\nBis später!\nJan",
      questions: [
        { de: "Wie fährt Deniz zu Jan?", tr: "Deniz, Jan'a nasıl gidiyor?", options: ["Mit dem Bus", "Mit der U-Bahn", "Mit dem Taxi", "Mit dem Fahrrad"], answer: 1 },
        { de: "Wo ist Jans Haus?", tr: "Jan'ın evi nerede?", options: ["Neben dem Bahnhof", "Gegenüber von der Bäckerei", "An der Haltestelle", "Hinter der Ampel"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "Yoldan geçen birine yol soruyorsun.", de: "Entschuldigung, wo ist der Bahnhof? Ist das weit?", tr: "Affedersiniz, gar nerede? Uzak mı?" },
      { situation: "Gişede bilet alıyorsun.", de: "Einmal nach Berlin, bitte. Hin und zurück.", tr: "Berlin'e bir bilet lütfen. Gidiş dönüş." },
    ],
    writing: {
      prompt: "Seni ziyaret edecek bir arkadaşına evine nasıl geleceğini yazan bir mesaj yaz.",
      checklist: [
        "Hangi araçla geleceğini yaz",
        "Durağın adını yaz",
        "En az iki yön ver (geradeaus, links, rechts)",
        "Ne kadar sürdüğünü yaz",
      ],
      minWords: 35,
      phrases: [
        { de: "Du fährst mit …", tr: "… ile geliyorsun", en: "You travel by …" },
        { de: "bis zur Haltestelle …", tr: "… durağına kadar", en: "as far as the … stop" },
        { de: "Dann gehst du geradeaus.", tr: "Sonra dümdüz gidiyorsun.", en: "Then you go straight on." },
        { de: "Mein Haus ist gegenüber von …", tr: "Evim …'in karşısında", en: "My house is opposite …" },
        { de: "Es sind … Minuten zu Fuß.", tr: "Yürüyerek … dakika.", en: "It is … minutes on foot." },
      ],
      sample:
        "Hallo Mert, du kommst am Samstag, super! Du fährst mit der U-Bahn, Linie 2, bis zur Haltestelle Stadtpark. Dann gehst du geradeaus bis zur Ampel. An der Ampel gehst du rechts. Mein Haus ist gegenüber von der Apotheke, Nummer 15. Vom Bahnhof sind es ungefähr zwanzig Minuten. Ruf mich an!",
    },
  },

  {
    level: "A1",
    index: 6,
    code: "A1.7",
    titleDe: "Wohnen",
    titleTr: "Ev ve yaşam",
    focus: [
      { de: "es gibt + Akkusativ", tr: "„… var“ demek" },
      { de: "Wo? in / an / auf + Dativ", tr: "eşyanın yeri" },
      { de: "stehen, liegen, hängen", tr: "duruş fiilleri" },
      { de: "Miete und Nebenkosten", tr: "kira dili" },
    ],
    canDo: [
      { de: "Ich kann meine Wohnung beschreiben.", tr: "Evimi tarif edebiliyorum.", en: "I can describe my flat." },
      { de: "Ich kann sagen, wo etwas steht, liegt oder hängt.", tr: "Bir eşyanın nerede durduğunu söyleyebiliyorum.", en: "I can say where something stands, lies or hangs." },
      { de: "Ich kann mich bei den Nachbarn vorstellen.", tr: "Komşulara kendimi tanıtabiliyorum.", en: "I can introduce myself to the neighbours." },
      { de: "Ich kann einen Schaden melden.", tr: "Bir arızayı bildirebiliyorum.", en: "I can report a fault." },
      { de: "Ich kann über Miete und Nebenkosten sprechen.", tr: "Kira ve aidat hakkında konuşabiliyorum.", en: "I can talk about rent and extra costs." },
    ],
    listening: {
      title: "Die Lampe ist kaputt",
      titleTr: "Lamba bozuldu",
      situation: "Bir kiracı apartman görevlisini arıyor.",
      turns: [
        { speaker: "Mieterin", de: "Guten Tag, hier ist Familie Demir aus Wohnung zwölf.", tr: "İyi günler, ben on iki numaradan Demir ailesi." },
        { speaker: "Hausmeister", de: "Guten Tag, was kann ich für Sie tun?", tr: "İyi günler, nasıl yardımcı olabilirim?" },
        { speaker: "Mieterin", de: "Die Lampe im Flur ist kaputt. Sie funktioniert nicht mehr.", tr: "Koridordaki lamba bozuldu. Artık çalışmıyor." },
        { speaker: "Hausmeister", de: "Seit wann denn?", tr: "Ne zamandan beri?" },
        { speaker: "Mieterin", de: "Seit gestern. Können Sie heute kommen?", tr: "Dünden beri. Bugün gelebilir misiniz?" },
        { speaker: "Hausmeister", de: "Heute leider nicht. Aber morgen um zehn Uhr bin ich da.", tr: "Bugün maalesef olmaz. Ama yarın saat onda oradayım." },
      ],
      questions: [
        { de: "Was ist kaputt?", tr: "Ne bozuk?", options: ["Die Heizung", "Die Lampe im Flur", "Der Wasserhahn", "Das Licht im Bad"], answer: 1 },
        { de: "In welcher Wohnung wohnt Familie Demir?", tr: "Demir ailesi hangi dairede oturuyor?", options: ["In Wohnung zwei", "In Wohnung zehn", "In Wohnung zwölf", "Im Keller"], answer: 2 },
        { de: "Wann kommt der Hausmeister?", tr: "Görevli ne zaman geliyor?", options: ["Heute um zehn", "Morgen um zehn", "Heute Abend", "Am Wochenende"], answer: 1 },
      ],
    },
    reading: {
      title: "Wohnung zu vermieten",
      titleTr: "Kiralık daire ilanı",
      genre: "İlan",
      text: "Wohnung zu vermieten\n\n2 Zimmer, Küche, Bad — 58 m²\n3. Stock, mit Balkon, sehr hell und ruhig\nMiete: 620 Euro kalt + 140 Euro Nebenkosten\nFrei ab 1. Juni\n\nHaustiere sind leider nicht erlaubt.\nTelefon: 0176 22 33 44",
      questions: [
        { de: "Wie viele Zimmer hat die Wohnung?", tr: "Daire kaç odalı?", options: ["Ein Zimmer", "Zwei Zimmer", "Drei Zimmer", "Vier Zimmer"], answer: 1 },
        { de: "Was ist in der Wohnung nicht erlaubt?", tr: "Dairede neye izin yok?", options: ["Musik", "Haustiere", "Kinder", "Besuch"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "Yeni komşuna kendini tanıtıyorsun.", de: "Guten Tag, wir sind neu hier. Wir wohnen jetzt im dritten Stock.", tr: "İyi günler, buraya yeni taşındık. Artık üçüncü katta oturuyoruz." },
      { situation: "Ev sahibine arıza bildiriyorsun.", de: "Die Heizung funktioniert nicht. Können Sie bitte kommen?", tr: "Kalorifer çalışmıyor. Lütfen gelebilir misiniz?" },
    ],
    writing: {
      prompt: "Yeni evini bir arkadaşına anlatan kısa bir mesaj yaz.",
      checklist: [
        "Kaç odası olduğunu yaz",
        "„Es gibt …“ ile bir cümle kur",
        "Bir eşyanın yerini yaz (auf dem Tisch, an der Wand …)",
        "Kirayı yaz",
      ],
      minWords: 35,
      phrases: [
        { de: "Die Wohnung hat …", tr: "Dairenin …'i var", en: "The flat has …" },
        { de: "Es gibt auch …", tr: "Ayrıca … var", en: "There is also …" },
        { de: "… steht in der Ecke.", tr: "… köşede duruyor.", en: "… stands in the corner." },
        { de: "… hängt an der Wand.", tr: "… duvarda asılı.", en: "… hangs on the wall." },
        { de: "Die Miete kostet …", tr: "Kira … tutuyor", en: "The rent costs …" },
      ],
      sample:
        "Hallo Selin, ich habe eine neue Wohnung! Sie hat zwei Zimmer, eine Küche und ein Bad. Die Wohnung ist hell und ruhig. Es gibt auch einen Balkon. Mein Sofa steht im Wohnzimmer und ein großes Bild hängt an der Wand. Die Miete kostet 620 Euro plus Nebenkosten. Die Nachbarn sind sehr nett. Kommst du am Samstag?",
    },
  },

  {
    level: "A1",
    index: 7,
    code: "A1.8",
    titleDe: "Freizeit",
    titleTr: "Boş zaman",
    focus: [
      { de: "können", tr: "yapabilmek" },
      { de: "gern – lieber – am liebsten", tr: "tercih sıralaması" },
      { de: "Ja-Nein-Fragen", tr: "fiille başlayan soru" },
      { de: "Einladung", tr: "davet etme ve reddetme" },
    ],
    canDo: [
      { de: "Ich kann über meine Hobbys sprechen.", tr: "Hobilerimden bahsedebiliyorum.", en: "I can talk about my hobbies." },
      { de: "Ich kann sagen, was ich gut kann und was nicht.", tr: "Neyi iyi yapabildiğimi söyleyebiliyorum.", en: "I can say what I can and cannot do well." },
      { de: "Ich kann jemanden einladen.", tr: "Birini davet edebiliyorum.", en: "I can invite someone." },
      { de: "Ich kann eine Einladung höflich ablehnen.", tr: "Bir daveti nazikçe reddedebiliyorum.", en: "I can decline an invitation politely." },
      { de: "Ich kann über das Wetter sprechen.", tr: "Hava durumundan konuşabiliyorum.", en: "I can talk about the weather." },
    ],
    listening: {
      title: "Gehen wir ins Kino?",
      titleTr: "Sinemaya gidelim mi?",
      situation: "İki arkadaş hafta sonu için plan yapıyor.",
      turns: [
        { speaker: "Lea", de: "Hallo Ben! Gehen wir am Freitag ins Kino?", tr: "Merhaba Ben! Cuma sinemaya gidelim mi?" },
        { speaker: "Ben", de: "Am Freitag kann ich leider nicht. Ich spiele Fußball.", tr: "Cuma maalesef olmaz. Futbol oynuyorum." },
        { speaker: "Lea", de: "Schade. Und am Samstag?", tr: "Yazık. Peki cumartesi?" },
        { speaker: "Ben", de: "Am Samstag habe ich Zeit. Was läuft denn?", tr: "Cumartesi vaktim var. Ne oynuyor peki?" },
        { speaker: "Lea", de: "Ein Film aus Frankreich. Er beginnt um acht.", tr: "Fransız bir film. Sekizde başlıyor." },
        { speaker: "Ben", de: "Gute Idee! Ich hole dich um halb acht ab.", tr: "İyi fikir! Seni yedi buçukta alırım." },
      ],
      questions: [
        { de: "Warum kann Ben am Freitag nicht?", tr: "Ben cuma neden gelemiyor?", options: ["Er arbeitet", "Er spielt Fußball", "Er ist krank", "Er mag keine Filme"], answer: 1 },
        { de: "Wann beginnt der Film?", tr: "Film ne zaman başlıyor?", options: ["Um halb acht", "Um acht", "Um neun", "Um halb neun"], answer: 1 },
        { de: "Was macht Ben um halb acht?", tr: "Ben yedi buçukta ne yapıyor?", options: ["Er geht ins Kino", "Er holt Lea ab", "Er spielt Fußball", "Er ruft an"], answer: 1 },
      ],
    },
    reading: {
      title: "Stadtpark-Fest",
      titleTr: "Park şenliği programı",
      genre: "Duyuru",
      text: "Stadtpark-Fest am Sonntag\n\n11 Uhr: Musik und Konzert auf der Wiese\n13 Uhr: Picknick — bringen Sie bitte Essen mit\n15 Uhr: Sport für Kinder\n17 Uhr: Film im Park\n\nDer Eintritt ist frei. Bei Regen fällt das Fest aus.",
      questions: [
        { de: "Was kostet der Eintritt?", tr: "Giriş kaç para?", options: ["Fünf Euro", "Zehn Euro", "Nichts", "Nur Kinder zahlen"], answer: 2 },
        { de: "Was passiert bei Regen?", tr: "Yağmur yağarsa ne oluyor?", options: ["Das Fest beginnt später", "Das Fest fällt aus", "Das Fest ist im Kino", "Das Fest dauert länger"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "Hobinden bahsediyorsun.", de: "In meiner Freizeit spiele ich gern Gitarre, aber ich kann nicht gut singen.", tr: "Boş zamanımda gitar çalmayı severim ama iyi şarkı söyleyemem." },
      { situation: "Bir daveti nazikçe reddediyorsun.", de: "Leider kann ich nicht. Vielleicht nächste Woche?", tr: "Maalesef gelemem. Belki haftaya?" },
    ],
    writing: {
      prompt: "Bir arkadaşını hafta sonu bir etkinliğe davet eden kısa bir mesaj yaz.",
      checklist: [
        "Davet cümlesi kur",
        "Yer ve saat yaz",
        "„können“ ile bir cümle kur",
        "Cevap iste („Hast du Zeit?“)",
      ],
      minWords: 35,
      phrases: [
        { de: "Gehen wir …?", tr: "… gidelim mi?", en: "Shall we go …?" },
        { de: "Es beginnt um … Uhr.", tr: "Saat …'de başlıyor.", en: "It starts at … o'clock." },
        { de: "Wir können …", tr: "… yapabiliriz", en: "We can …" },
        { de: "Hast du am … Zeit?", tr: "… günü vaktin var mı?", en: "Do you have time on …?" },
        { de: "Der Eintritt ist frei.", tr: "Giriş ücretsiz.", en: "Admission is free." },
      ],
      sample:
        "Hallo Nora, am Sonntag ist ein Fest im Stadtpark. Gehen wir zusammen hin? Es beginnt um elf Uhr. Es gibt Musik und ein Picknick auf der Wiese. Wir können auch schwimmen, denn das Schwimmbad ist in der Nähe. Ich bringe Obst und Wasser mit. Hast du am Sonntag Zeit? Der Eintritt ist frei!",
    },
  },

  {
    level: "A1",
    index: 8,
    code: "A1.9",
    titleDe: "Gesundheit",
    titleTr: "Sağlık ve vücut",
    focus: [
      { de: "müssen", tr: "zorunluluk" },
      { de: "Imperativ (du und Sie)", tr: "öğüt ve yönlendirme" },
      { de: "wehtun + Dativ", tr: "„… ağrıyor“ demek" },
      { de: "Termine: am / um", tr: "randevu dili" },
    ],
    canDo: [
      { de: "Ich kann sagen, was mir wehtut.", tr: "Neremin ağrıdığını söyleyebiliyorum.", en: "I can say what hurts." },
      { de: "Ich kann einen Termin beim Arzt machen.", tr: "Doktordan randevu alabiliyorum.", en: "I can make a doctor's appointment." },
      { de: "Ich kann in der Apotheke nach einem Medikament fragen.", tr: "Eczanede ilaç sorabiliyorum.", en: "I can ask for a medicine at the pharmacy." },
      { de: "Ich kann mich krankmelden.", tr: "İşe hasta olduğumu bildirebiliyorum.", en: "I can call in sick." },
      { de: "Ich kann jemandem einen Rat geben.", tr: "Birine öğüt verebiliyorum.", en: "I can give someone advice." },
    ],
    listening: {
      title: "Ein Termin beim Arzt",
      titleTr: "Doktordan randevu",
      situation: "Bir hasta muayenehaneyi arıyor.",
      turns: [
        { speaker: "Praxis", de: "Praxis Dr. Weber, guten Morgen.", tr: "Dr. Weber muayenehanesi, günaydın." },
        { speaker: "Patient", de: "Guten Morgen. Ich brauche einen Termin. Ich habe seit drei Tagen Halsschmerzen und Fieber.", tr: "Günaydın. Randevuya ihtiyacım var. Üç gündür boğazım ağrıyor ve ateşim var." },
        { speaker: "Praxis", de: "Das tut mir leid. Geht es am Mittwoch um zehn Uhr?", tr: "Geçmiş olsun. Çarşamba saat on uygun mu?" },
        { speaker: "Patient", de: "Am Mittwoch muss ich arbeiten. Geht es auch am Nachmittag?", tr: "Çarşamba çalışmam gerekiyor. Öğleden sonra olur mu?" },
        { speaker: "Praxis", de: "Ja, um sechzehn Uhr ist noch frei.", tr: "Evet, saat on altı boş." },
        { speaker: "Patient", de: "Sehr gut. Muss ich die Versichertenkarte mitbringen?", tr: "Çok iyi. Sigorta kartımı getirmem gerekiyor mu?" },
        { speaker: "Praxis", de: "Ja, bitte bringen Sie die Karte mit.", tr: "Evet, lütfen kartı getirin." },
      ],
      questions: [
        { de: "Was hat der Patient?", tr: "Hastanın şikâyeti ne?", options: ["Kopfschmerzen", "Halsschmerzen und Fieber", "Bauchschmerzen", "Nur Husten"], answer: 1 },
        { de: "Wann kommt der Patient?", tr: "Hasta ne zaman gelecek?", options: ["Am Mittwoch um zehn", "Am Mittwoch um sechzehn Uhr", "Am Donnerstag", "Am Freitag um zehn"], answer: 1 },
        { de: "Was muss der Patient mitbringen?", tr: "Hasta ne getirmeli?", options: ["Ein Rezept", "Die Versichertenkarte", "Tabletten", "Nichts"], answer: 1 },
      ],
    },
    reading: {
      title: "Halstabletten HALSFREI",
      titleTr: "İlaç kullanma bilgisi",
      genre: "Bilgi metni",
      text: "Halstabletten HALSFREI\n\nErwachsene: dreimal täglich eine Tablette, nach dem Essen.\nKinder unter zwölf Jahren: nicht geben.\nNicht länger als fünf Tage nehmen.\nBei Fieber über 39 Grad: zum Arzt gehen.\n\nRezeptfrei in Ihrer Apotheke.",
      questions: [
        { de: "Wie oft nimmt ein Erwachsener eine Tablette?", tr: "Bir yetişkin günde kaç kez alıyor?", options: ["Einmal am Tag", "Zweimal am Tag", "Dreimal am Tag", "Jede Stunde"], answer: 2 },
        { de: "Was muss man bei hohem Fieber machen?", tr: "Ateş yüksekse ne yapmalı?", options: ["Mehr Tabletten nehmen", "Zum Arzt gehen", "Nur Wasser trinken", "Nichts machen"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "Doktora şikâyetini anlatıyorsun.", de: "Mein Kopf tut weh und ich habe seit gestern Fieber.", tr: "Başım ağrıyor ve dünden beri ateşim var." },
      { situation: "Hasta arkadaşına öğüt veriyorsun.", de: "Trink viel Wasser und bleib heute im Bett!", tr: "Bol su iç ve bugün yatakta kal!" },
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
        { de: "Ich bin krank.", tr: "Hastayım.", en: "I am ill." },
        { de: "Ich kann heute leider nicht kommen.", tr: "Bugün maalesef gelemiyorum.", en: "Unfortunately I can't come today." },
        { de: "Ich habe Fieber.", tr: "Ateşim var.", en: "I have a fever." },
        { de: "Ich muss zum Arzt gehen.", tr: "Doktora gitmem gerekiyor.", en: "I have to go to the doctor." },
        { de: "Ich rufe Sie danach an.", tr: "Sonra sizi ararım.", en: "I will call you afterwards." },
      ],
      sample:
        "Sehr geehrte Frau Klein,\n\nich bin krank und kann heute leider nicht kommen. Ich habe Fieber und Halsschmerzen. Ich muss zum Arzt gehen und im Bett bleiben. Ich denke, ich bin zwei oder drei Tage nicht im Büro. Ich rufe Sie heute Nachmittag an.\n\nVielen Dank und freundliche Grüße\nAli Kaya",
    },
  },

  {
    level: "A1",
    index: 9,
    code: "A1.10",
    titleDe: "Kontakt und Rückblick",
    titleTr: "İletişim ve geçmişe ilk adım",
    focus: [
      { de: "Perfekt mit haben", tr: "„… yaptım“ demek" },
      { de: "Perfekt mit sein", tr: "hareket fiillerinde geçmiş" },
      { de: "Datum: am ersten Mai", tr: "tarih söylemek" },
      { de: "Telefon und Nachricht", tr: "telefonda ve yazıda iletişim" },
    ],
    canDo: [
      { de: "Ich kann telefonieren und eine Nachricht hinterlassen.", tr: "Telefonda konuşup not bırakabiliyorum.", en: "I can make a call and leave a message." },
      { de: "Ich kann eine kurze Nachricht schreiben und jemanden einladen.", tr: "Kısa mesaj yazıp birini davet edebiliyorum.", en: "I can write a short message and invite someone." },
      { de: "Ich kann sagen, was ich gestern gemacht habe.", tr: "Dün ne yaptığımı anlatabiliyorum.", en: "I can say what I did yesterday." },
      { de: "Ich kann ein Datum nennen.", tr: "Bir tarihi söyleyebiliyorum.", en: "I can give a date." },
      { de: "Ich kann über mein Wochenende erzählen.", tr: "Hafta sonumu anlatabiliyorum.", en: "I can talk about my weekend." },
    ],
    listening: {
      title: "Am Telefon",
      titleTr: "Telefonda",
      situation: "Bir kadın işyerini arıyor ama aradığı kişi yok.",
      turns: [
        { speaker: "Frau Aydin", de: "Guten Tag, hier ist Nuray Aydin. Kann ich mit Herrn Berg sprechen?", tr: "İyi günler, ben Nuray Aydın. Bay Berg ile görüşebilir miyim?" },
        { speaker: "Kollege", de: "Herr Berg ist gerade nicht da. Er kommt um zwei Uhr zurück.", tr: "Bay Berg şu an yok. Saat ikide dönüyor." },
        { speaker: "Frau Aydin", de: "Können Sie ihm etwas ausrichten? Ich habe die Einladung geschickt.", tr: "Ona bir şey iletebilir misiniz? Daveti gönderdim." },
        { speaker: "Kollege", de: "Natürlich. Wie ist Ihre Nummer?", tr: "Tabii. Numaranız nedir?" },
        { speaker: "Frau Aydin", de: "0157 88 44 21. Er kann mich bis sechs Uhr anrufen.", tr: "0157 88 44 21. Beni altıya kadar arayabilir." },
        { speaker: "Kollege", de: "Alles klar, ich sage ihm Bescheid.", tr: "Anlaşıldı, ona haber veririm." },
      ],
      questions: [
        { de: "Warum ruft Frau Aydin an?", tr: "Bayan Aydın neden arıyor?", options: ["Sie sucht eine Wohnung", "Sie hat die Einladung geschickt", "Sie ist krank", "Sie möchte einen Termin absagen"], answer: 1 },
        { de: "Wann kommt Herr Berg zurück?", tr: "Bay Berg ne zaman dönüyor?", options: ["Um eins", "Um zwei", "Um sechs", "Morgen"], answer: 1 },
        { de: "Bis wann kann Herr Berg anrufen?", tr: "Bay Berg ne zamana kadar arayabilir?", options: ["Bis zwei Uhr", "Bis vier Uhr", "Bis sechs Uhr", "Bis acht Uhr"], answer: 2 },
      ],
    },
    reading: {
      title: "Grüße aus Berlin",
      titleTr: "Kartpostal",
      genre: "Kartpostal",
      text: "Liebe Oma,\n\nviele Grüße aus Berlin! Wir sind am Freitag angekommen. Am Samstag haben wir das Museum besucht und am Abend sind wir in ein Restaurant gegangen. Gestern hat es leider geregnet, aber wir sind trotzdem spazieren gegangen. Am ersten Mai fahren wir zurück.\n\nBis bald!\nDein Emre",
      questions: [
        { de: "Was hat Emre am Samstag gemacht?", tr: "Emre cumartesi ne yaptı?", options: ["Er ist angekommen", "Er hat das Museum besucht", "Er ist zurückgefahren", "Er ist zu Hause geblieben"], answer: 1 },
        { de: "Wann fährt Emre zurück?", tr: "Emre ne zaman dönüyor?", options: ["Am Freitag", "Am Samstag", "Am ersten Mai", "Gestern"], answer: 2 },
      ],
    },
    speaking: [
      { situation: "Telefonda kendini tanıtıyorsun.", de: "Guten Tag, hier ist Ali Kaya. Kann ich mit Frau Berg sprechen?", tr: "İyi günler, ben Ali Kaya. Bayan Berg ile görüşebilir miyim?" },
      { situation: "Hafta sonunu anlatıyorsun.", de: "Am Samstag bin ich ins Kino gegangen und am Sonntag habe ich lange geschlafen.", tr: "Cumartesi sinemaya gittim, pazar da uzun uyudum." },
    ],
    writing: {
      prompt: "Bir arkadaşına hafta sonunu anlatan kısa bir mesaj yaz.",
      checklist: [
        "En az üç Perfekt cümlesi kur",
        "„haben“ ve „sein“ ile birer Perfekt cümlesi olsun",
        "Zuerst / Dann / Am Abend ile sırala",
        "Nasıl geçtiğini yaz („Es war …“)",
      ],
      minWords: 40,
      phrases: [
        { de: "Ich habe … gemacht.", tr: "… yaptım.", en: "I did …" },
        { de: "Ich bin … gefahren.", tr: "… gittim (araçla).", en: "I travelled …" },
        { de: "Zuerst … Dann …", tr: "Önce … Sonra …", en: "First … Then …" },
        { de: "Am Abend …", tr: "Akşam …", en: "In the evening …" },
        { de: "Es war schön.", tr: "Güzeldi.", en: "It was nice." },
      ],
      sample:
        "Hallo Jana, mein Wochenende war toll! Am Samstag bin ich früh aufgestanden und ich bin mit dem Zug nach Hamburg gefahren. Zuerst habe ich einen Freund getroffen. Dann haben wir Fisch gegessen. Am Abend sind wir ins Konzert gegangen. Am Sonntag habe ich lange geschlafen und meine Mutter angerufen. Und was hast du gemacht?",
    },
  },
];
