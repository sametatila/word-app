import type { ModuleExamPlan } from "./types";

/**
 * A2 modül sınavlarının elle yazılan içeriği (10 modül).
 *
 * A1'e göre iki fark var. Metinler daha uzun ve bir ANLATI taşıyor: A2'nin
 * sınavı artık "anladın mı" değil "takip edebiliyor musun" diye soruyor.
 * İkincisi, dinleme diyaloglarında konu her zaman tek soruda bitmiyor —
 * cevabın iki repliğin birleşiminden çıktığı en az bir soru var.
 */
export const A2_EXAMS: ModuleExamPlan[] = [
  {
    level: "A2",
    index: 0,
    code: "A2.1",
    titleDe: "Von früher erzählen",
    titleTr: "Geçmişi anlatmak",
    focus: [
      { de: "Perfekt mit haben und sein", tr: "iki yardımcı fiille geçmiş" },
      { de: "unregelmäßige Partizipien", tr: "gegessen, getrunken, gelesen" },
      { de: "trennbare Verben im Perfekt", tr: "eingekauft, aufgestanden" },
      { de: "war und hatte", tr: "Präteritum'un iki temel fiili" },
    ],
    canDo: [
      { de: "Ich kann von meinem letzten Urlaub erzählen.", tr: "Son tatilimi anlatabiliyorum.", en: "I can talk about my last holiday." },
      { de: "Ich kann unregelmäßige Partizipien richtig benutzen.", tr: "Kural dışı ortaçları doğru kullanabiliyorum.", en: "I can use irregular participles correctly." },
      { de: "Ich kann erzählen, was an einem Tag schiefgegangen ist.", tr: "Bir günde neyin ters gittiğini anlatabiliyorum.", en: "I can tell what went wrong during a day." },
      { de: "Ich kann mit „war“ und „hatte“ über früher sprechen.", tr: "„war“ ve „hatte“ ile eskiyi anlatabiliyorum.", en: "I can talk about the past with „war“ and „hatte“." },
      { de: "Ich kann eine Neuigkeit erzählen.", tr: "Bir haberi aktarabiliyorum.", en: "I can share a piece of news." },
    ],
    listening: {
      title: "Chaos am Montag",
      titleTr: "Pazartesi kaosu",
      situation: "İki iş arkadaşı pazartesi gününü konuşuyor.",
      turns: [
        { speaker: "Nina", de: "Und, wie war dein Montag?", tr: "Ee, pazartesin nasıldı?" },
        { speaker: "Tarik", de: "Furchtbar! Ich habe verschlafen. Der Wecker hat nicht geklingelt.", tr: "Berbat! Uyuyakaldım. Çalar saat çalmadı." },
        { speaker: "Nina", de: "Oh nein. Und dann?", tr: "Olamaz. Sonra?" },
        { speaker: "Tarik", de: "Ich bin ohne Frühstück losgefahren, aber der Bus ist weggefahren. Ich habe eine halbe Stunde gewartet.", tr: "Kahvaltı etmeden çıktım ama otobüs gitmişti. Yarım saat bekledim." },
        { speaker: "Nina", de: "Und im Büro?", tr: "Peki ofiste?" },
        { speaker: "Tarik", de: "Im Büro habe ich meinen Schlüssel vergessen. Zum Glück war die Chefin nett.", tr: "Ofiste anahtarımı unuttum. İyi ki müdür anlayışlıydı." },
      ],
      questions: [
        { de: "Warum hat Tarik verschlafen?", tr: "Tarik neden uyuyakaldı?", options: ["Er war krank", "Der Wecker hat nicht geklingelt", "Er hat lange gearbeitet", "Er hatte keinen Wecker"], answer: 1 },
        { de: "Was ist an der Haltestelle passiert?", tr: "Durakta ne oldu?", options: ["Der Bus ist weggefahren", "Der Bus hatte Verspätung", "Er hat den Schlüssel verloren", "Er hat gefrühstückt"], answer: 0 },
        { de: "Wie war die Chefin?", tr: "Müdür nasıldı?", options: ["Wütend", "Nett", "Krank", "Nicht da"], answer: 1 },
      ],
    },
    reading: {
      title: "Früher war alles anders",
      titleTr: "Eskiden her şey başkaydı",
      genre: "Kişisel yazı",
      text: "Früher war alles anders\n\nAuf dem Foto bin ich sechs Jahre alt. Wir haben damals in einem kleinen Dorf gewohnt. Es gab keinen Supermarkt und kein Internet. Am Wochenende sind wir immer zum See gefahren. Meine Großmutter hat jeden Sonntag Kuchen gebacken. Heute wohne ich in der Stadt und alles ist schneller. Aber manchmal vermisse ich das Dorf.",
      questions: [
        { de: "Wo hat die Person als Kind gewohnt?", tr: "Kişi çocukken nerede oturuyordu?", options: ["In der Stadt", "In einem Dorf", "Am Meer", "Im Ausland"], answer: 1 },
        { de: "Was hat die Großmutter jeden Sonntag gemacht?", tr: "Büyükanne her pazar ne yapıyordu?", options: ["Sie ist zum See gefahren", "Sie hat Kuchen gebacken", "Sie hat eingekauft", "Sie hat ferngesehen"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "Tatilini anlatıyorsun.", de: "Letztes Jahr bin ich ans Meer gefahren und ich habe jeden Tag geschwommen.", tr: "Geçen yıl denize gittim ve her gün yüzdüm." },
      { situation: "Aksi giden bir günü anlatıyorsun.", de: "Ich habe verschlafen und deshalb bin ich zu spät gekommen.", tr: "Uyuyakaldım ve bu yüzden geç kaldım." },
    ],
    writing: {
      prompt: "Son tatilini ya da geçen hafta sonunu anlatan bir metin yaz.",
      checklist: [
        "En az beş Perfekt cümlesi kur",
        "„sein“ ile en az bir Perfekt cümlesi olsun",
        "war ya da hatte kullan",
        "Sonunda nasıl geçtiğini yaz",
      ],
      minWords: 50,
      phrases: [
        { de: "Letzten Sommer bin ich … gefahren.", tr: "Geçen yaz …'e gittim.", en: "Last summer I travelled to …" },
        { de: "Zuerst … Danach …", tr: "Önce … Ardından …", en: "First … After that …" },
        { de: "Es hat … gedauert.", tr: "… sürdü.", en: "It took …" },
        { de: "Das Wetter war …", tr: "Hava …'ydı.", en: "The weather was …" },
        { de: "Trotzdem war es schön.", tr: "Yine de güzeldi.", en: "Even so it was nice." },
      ],
      sample:
        "Letzten Sommer bin ich mit meiner Familie nach Antalya gefahren. Wir sind mit dem Auto gefahren und die Fahrt hat acht Stunden gedauert. Das Hotel war klein, aber sehr gemütlich. Jeden Morgen habe ich im Meer geschwommen. Am zweiten Tag haben wir eine alte Stadt besucht. Abends haben wir Fisch gegessen. Leider hat es am letzten Tag geregnet. Trotzdem war der Urlaub super — wir hatten viel Zeit zusammen.",
    },
  },

  {
    level: "A2",
    index: 1,
    code: "A2.2",
    titleDe: "Meine Geschichte",
    titleTr: "Benim hikâyem",
    focus: [
      { de: "Präteritum der Modalverben", tr: "wollte, konnte, musste, durfte" },
      { de: "Reflexivverben", tr: "sich gewöhnen, sich fühlen" },
      { de: "seit und vor + Dativ", tr: "süre ve zaman noktası" },
      { de: "Perfekt", tr: "yaşananları anlatmak" },
    ],
    canDo: [
      { de: "Ich kann erzählen, wie ich hierhergekommen bin.", tr: "Buraya nasıl geldiğimi anlatabiliyorum.", en: "I can tell how I came here." },
      { de: "Ich kann sagen, was ich als Kind wollte, konnte oder musste.", tr: "Çocukken ne istediğimi, neyi yapabildiğimi ya da zorunda olduğumu söyleyebiliyorum.", en: "I can say what I wanted, could or had to do as a child." },
      { de: "Ich kann über Zeiträume sprechen: seit, vor, nach.", tr: "Süre ve zaman noktalarından bahsedebiliyorum.", en: "I can talk about periods of time." },
      { de: "Ich kann Reflexivverben benutzen.", tr: "Dönüşlü fiilleri kullanabiliyorum.", en: "I can use reflexive verbs." },
      { de: "Ich kann sagen, was sich verändert hat.", tr: "Neyin değiştiğini anlatabiliyorum.", en: "I can say what has changed." },
    ],
    listening: {
      title: "Wie habt ihr euch kennengelernt?",
      titleTr: "Nasıl tanıştınız?",
      situation: "Üç arkadaş tanışma hikâyesini konuşuyor.",
      turns: [
        { speaker: "Ayla", de: "Wie habt ihr euch eigentlich kennengelernt?", tr: "Aslında siz nasıl tanıştınız?" },
        { speaker: "Jonas", de: "Ganz zufällig. Vor sechs Jahren habe ich einen Deutschkurs gemacht. Marie war die Lehrerin.", tr: "Tamamen tesadüfen. Altı yıl önce Almanca kursuna gitmiştim. Marie öğretmendi." },
        { speaker: "Ayla", de: "Im Ernst? Und dann?", tr: "Cidden mi? Sonra?" },
        { speaker: "Jonas", de: "Am Anfang durfte ich sie natürlich nicht einladen. Aber nach dem Kurs haben wir uns im Café getroffen.", tr: "Başta onu davet edemezdim tabii. Ama kurs bitince kafede buluştuk." },
        { speaker: "Ayla", de: "Und seit wann seid ihr zusammen?", tr: "Ne zamandır berabersiniz?" },
        { speaker: "Jonas", de: "Seit fünf Jahren. Wir haben uns schnell verliebt.", tr: "Beş yıldır. Çabuk âşık olduk." },
      ],
      questions: [
        { de: "Wo haben sich Jonas und Marie kennengelernt?", tr: "Jonas ile Marie nerede tanıştı?", options: ["Im Café", "Im Deutschkurs", "Bei der Arbeit", "Auf einer Party"], answer: 1 },
        { de: "Was war Marie von Beruf?", tr: "Marie'nin mesleği neydi?", options: ["Ärztin", "Lehrerin", "Studentin", "Kellnerin"], answer: 1 },
        { de: "Seit wann sind sie zusammen?", tr: "Ne zamandır beraberler?", options: ["Seit sechs Jahren", "Seit fünf Jahren", "Seit einem Jahr", "Seit zehn Jahren"], answer: 1 },
      ],
    },
    reading: {
      title: "Mein Weg nach Deutschland",
      titleTr: "Almanya'ya gelişim",
      genre: "Kişisel yazı",
      text: "Mein Weg nach Deutschland\n\nIch bin vor acht Jahren nach Deutschland gekommen. Damals war ich zweiundzwanzig und ich konnte kein Wort Deutsch. Am Anfang war alles fremd: das Wetter, das Essen, die Ämter. Ich musste viele Formulare ausfüllen und ich durfte zuerst nicht arbeiten. Nach einem Jahr habe ich einen Kurs gemacht und mich langsam an das Leben hier gewöhnt. Heute arbeite ich in einem Krankenhaus und fühle mich zu Hause.",
      questions: [
        { de: "Wie alt war die Person bei der Ankunft?", tr: "Kişi gelirken kaç yaşındaydı?", options: ["Achtzehn", "Zweiundzwanzig", "Achtundzwanzig", "Dreißig"], answer: 1 },
        { de: "Was durfte die Person am Anfang nicht?", tr: "Kişi başta neyi yapamıyordu?", options: ["Deutsch lernen", "Arbeiten", "Reisen", "Wohnen"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "Çocukluk hayalini anlatıyorsun.", de: "Als Kind wollte ich Pilot werden, aber ich konnte nicht gut rechnen.", tr: "Çocukken pilot olmak istiyordum ama matematiğim iyi değildi." },
      { situation: "Ne zamandır burada olduğunu söylüyorsun.", de: "Ich wohne seit drei Jahren in Deutschland und ich habe mich daran gewöhnt.", tr: "Üç yıldır Almanya'da yaşıyorum ve buna alıştım." },
    ],
    writing: {
      prompt: "Kendi hikâyeni anlat: nereden geldin, ne zaman, başta ne zordu, şimdi nasıl.",
      checklist: [
        "seit ya da vor ile bir zaman bilgisi yaz",
        "wollte / konnte / musste / durfte kullan",
        "Bir dönüşlü fiil kullan",
        "Başlangıcı bugünle karşılaştır",
      ],
      minWords: 50,
      phrases: [
        { de: "Ich wohne seit … Jahren in …", tr: "… yıldır …'da yaşıyorum", en: "I have been living in … for … years." },
        { de: "Vor … Jahren bin ich … gezogen.", tr: "… yıl önce …'e taşındım.", en: "… years ago I moved to …" },
        { de: "Am Anfang war es schwer.", tr: "Başta zordu.", en: "At the beginning it was hard." },
        { de: "Ich habe mich an … gewöhnt.", tr: "…'e alıştım.", en: "I got used to …" },
        { de: "Heute fühle ich mich …", tr: "Bugün … hissediyorum.", en: "Today I feel …" },
      ],
      sample:
        "Ich komme aus Izmir und ich wohne seit vier Jahren in Deutschland. Vor vier Jahren bin ich nach Hamburg gezogen, denn ich wollte hier studieren. Am Anfang war es sehr schwer: Ich konnte fast kein Deutsch und ich durfte nicht arbeiten. Ich musste viele Formulare ausfüllen. Nach einem Jahr habe ich einen Sprachkurs gemacht und viele Leute kennengelernt. Langsam habe ich mich an das Wetter gewöhnt. Heute fühle ich mich hier zu Hause.",
    },
  },

  {
    level: "A2",
    index: 2,
    code: "A2.3",
    titleDe: "Gesundheit und Beratung",
    titleTr: "Sağlık",
    focus: [
      { de: "sollen", tr: "öğüt ve talimat" },
      { de: "dürfen", tr: "izin ve yasak" },
      { de: "Reflexivverben", tr: "sich fühlen, sich verletzen" },
      { de: "Symptome beschreiben", tr: "belirtileri ayrıntılı anlatmak" },
    ],
    canDo: [
      { de: "Ich kann Symptome genau beschreiben.", tr: "Belirtilerimi ayrıntılı anlatabiliyorum.", en: "I can describe symptoms precisely." },
      { de: "Ich kann Ratschläge geben und verstehen.", tr: "Öğüt verebiliyor ve anlayabiliyorum.", en: "I can give and understand advice." },
      { de: "Ich kann sagen, was erlaubt und was verboten ist.", tr: "Neyin serbest neyin yasak olduğunu söyleyebiliyorum.", en: "I can say what is allowed and forbidden." },
      { de: "Ich kann mich in der Apotheke beraten lassen.", tr: "Eczanede danışabiliyorum.", en: "I can get advice at the pharmacy." },
      { de: "Ich kann über eine Verletzung sprechen.", tr: "Bir sakatlığı anlatabiliyorum.", en: "I can talk about an injury." },
    ],
    listening: {
      title: "Beratung in der Apotheke",
      titleTr: "Eczanede danışma",
      situation: "Bir müşteri eczacıdan tavsiye istiyor.",
      turns: [
        { speaker: "Kundin", de: "Guten Tag, ich habe mich erkältet. Was können Sie mir empfehlen?", tr: "İyi günler, üşütmüşüm. Ne önerirsiniz?" },
        { speaker: "Apotheker", de: "Haben Sie auch Fieber?", tr: "Ateşiniz de var mı?" },
        { speaker: "Kundin", de: "Nein, aber ich fühle mich sehr schlapp und ich huste.", tr: "Hayır ama çok halsiz hissediyorum ve öksürüyorum." },
        { speaker: "Apotheker", de: "Dann nehmen Sie diesen Saft. Dreimal täglich einen Löffel.", tr: "O zaman bu şurubu alın. Günde üç kez bir kaşık." },
        { speaker: "Kundin", de: "Gibt es Nebenwirkungen? Ich darf keinen Alkohol nehmen.", tr: "Yan etkisi var mı? Alkol alamıyorum." },
        { speaker: "Apotheker", de: "Kein Problem, der Saft ist ohne Alkohol. Sie sollen aber viel trinken und sich ausruhen.", tr: "Sorun değil, şurup alkolsüz. Ama bol sıvı alıp dinlenmelisiniz." },
      ],
      questions: [
        { de: "Was ist das Problem der Kundin?", tr: "Müşterinin sorunu ne?", options: ["Sie hat Fieber", "Sie hat sich erkältet", "Sie hat sich verletzt", "Sie hat Bauchschmerzen"], answer: 1 },
        { de: "Wie oft soll sie den Saft nehmen?", tr: "Şurubu ne sıklıkta almalı?", options: ["Einmal täglich", "Zweimal täglich", "Dreimal täglich", "Jede Stunde"], answer: 2 },
        { de: "Was soll die Kundin außerdem machen?", tr: "Müşteri ayrıca ne yapmalı?", options: ["Sport machen", "Viel trinken und sich ausruhen", "Sofort zum Arzt gehen", "Nichts essen"], answer: 1 },
      ],
    },
    reading: {
      title: "Vorsorge – warum eigentlich?",
      titleTr: "Koruyucu muayene",
      genre: "Bilgi metni",
      text: "Vorsorge – warum eigentlich?\n\nViele Menschen gehen erst zum Arzt, wenn es wehtut. Fachleute sagen: Man soll einmal im Jahr zur Untersuchung gehen, auch wenn man gesund ist. Bei einer Vorsorge misst der Arzt den Blutdruck und nimmt Blut ab. Das Ergebnis bekommen Sie nach ein paar Tagen. Die Kosten übernimmt die Krankenkasse.\n\nWichtig: Vor der Blutabnahme dürfen Sie nichts essen — Sie sollen nüchtern kommen.",
      questions: [
        { de: "Wie oft soll man zur Vorsorge gehen?", tr: "Koruyucu muayeneye ne sıklıkta gitmeli?", options: ["Jeden Monat", "Einmal im Jahr", "Nur bei Schmerzen", "Alle fünf Jahre"], answer: 1 },
        { de: "Was darf man vor der Blutabnahme nicht?", tr: "Kan alınmadan önce ne yapılamaz?", options: ["Trinken", "Essen", "Schlafen", "Sport machen"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "Doktorda kendini nasıl hissettiğini anlatıyorsun.", de: "Ich fühle mich seit drei Tagen schlapp und mir ist oft schwindlig.", tr: "Üç gündür halsiz hissediyorum ve sık sık başım dönüyor." },
      { situation: "Arkadaşına tavsiye veriyorsun.", de: "Du solltest zum Arzt gehen und dich ein paar Tage ausruhen.", tr: "Doktora gitmeli ve birkaç gün dinlenmelisin." },
    ],
    writing: {
      prompt: "Hasta olan bir arkadaşına ne yapması gerektiğini yazan bir mesaj yaz.",
      checklist: [
        "sollen ya da solltest ile en az iki öğüt yaz",
        "Neyi yapmaması gerektiğini yaz",
        "Bir dönüşlü fiil kullan",
        "Geçmiş olsun dile",
      ],
      minWords: 40,
      phrases: [
        { de: "Du solltest …", tr: "…meli/malısın", en: "You should …" },
        { de: "Du sollst nicht …", tr: "…memelisin", en: "You are not supposed to …" },
        { de: "Das hilft wirklich.", tr: "Bu gerçekten iyi geliyor.", en: "That really helps." },
        { de: "Ruh dich aus!", tr: "Dinlen!", en: "Get some rest!" },
        { de: "Gute Besserung!", tr: "Geçmiş olsun!", en: "Get well soon!" },
      ],
      sample:
        "Hallo Deniz, ich habe gehört, du bist krank. Das tut mir leid! Du solltest heute unbedingt zu Hause bleiben und dich ausruhen. Trink viel Tee mit Honig, das hilft wirklich. Du sollst nicht arbeiten, auch nicht von zu Hause. Wenn du Fieber über 39 Grad hast, sollst du sofort zum Arzt gehen. Sport darfst du diese Woche auch nicht machen. Soll ich dir etwas aus der Apotheke mitbringen? Gute Besserung!",
    },
  },

  {
    level: "A2",
    index: 3,
    code: "A2.4",
    titleDe: "Wohnen und Nachbarschaft",
    titleTr: "Ev ve mahalle",
    focus: [
      { de: "Dativ: mir, dir, ihm", tr: "kime verildiğini söylemek" },
      { de: "Wechselpräpositionen", tr: "Wo? Dativ — Wohin? Akkusativ" },
      { de: "stellen, legen, hängen", tr: "koyma fiilleri" },
      { de: "Nebensatz mit wenn", tr: "koşul yan cümlesi" },
    ],
    canDo: [
      { de: "Ich kann sagen, wem ich etwas gebe oder zeige.", tr: "Bir şeyi kime verdiğimi söyleyebiliyorum.", en: "I can say who I give or show something to." },
      { de: "Ich kann sagen, wo etwas ist und wohin es kommt.", tr: "Bir şeyin nerede olduğunu ve nereye konacağını söyleyebiliyorum.", en: "I can say where something is and where it goes." },
      { de: "Ich kann meine Nachbarschaft beschreiben.", tr: "Mahallemi tarif edebiliyorum.", en: "I can describe my neighbourhood." },
      { de: "Ich kann um Hilfe bitten und Hilfe anbieten.", tr: "Yardım isteyebiliyor ve teklif edebiliyorum.", en: "I can ask for and offer help." },
      { de: "Ich kann mich höflich über Lärm beschweren.", tr: "Gürültüden kibarca şikâyet edebiliyorum.", en: "I can complain politely about noise." },
    ],
    listening: {
      title: "Der Lärm von oben",
      titleTr: "Üst kattaki gürültü",
      situation: "Bir komşu üst kata çıkıp gürültüyü konuşuyor.",
      turns: [
        { speaker: "Frau Klein", de: "Guten Abend, Herr Yildiz. Haben Sie kurz Zeit?", tr: "İyi akşamlar Bay Yıldız. Kısa bir dakikanız var mı?" },
        { speaker: "Herr Yildiz", de: "Natürlich, kommen Sie rein.", tr: "Tabii, buyurun." },
        { speaker: "Frau Klein", de: "Es geht um den Lärm. Wenn Ihre Kinder abends spielen, kann ich nicht schlafen.", tr: "Gürültü hakkında. Akşamları çocuklarınız oynayınca uyuyamıyorum." },
        { speaker: "Herr Yildiz", de: "Das tut mir wirklich leid. Ab wann stört es Sie?", tr: "Gerçekten özür dilerim. Saat kaçtan sonra rahatsız oluyorsunuz?" },
        { speaker: "Frau Klein", de: "Ab zehn Uhr. Vorher ist es kein Problem.", tr: "Ondan sonra. Öncesinde sorun değil." },
        { speaker: "Herr Yildiz", de: "Verstanden. Ich sage ihnen, dass sie ab neun leise sein sollen.", tr: "Anladım. Onlara dokuzdan sonra sessiz olmalarını söylerim." },
      ],
      questions: [
        { de: "Worüber spricht Frau Klein?", tr: "Bayan Klein ne hakkında konuşuyor?", options: ["Über die Miete", "Über den Lärm", "Über ein Paket", "Über die Heizung"], answer: 1 },
        { de: "Ab wann stört der Lärm?", tr: "Gürültü saat kaçtan sonra rahatsız ediyor?", options: ["Ab acht Uhr", "Ab neun Uhr", "Ab zehn Uhr", "Ab elf Uhr"], answer: 2 },
        { de: "Was macht Herr Yildiz?", tr: "Bay Yıldız ne yapıyor?", options: ["Er sagt den Kindern Bescheid", "Er zieht aus", "Er ruft den Hausmeister", "Er sagt nichts"], answer: 0 },
      ],
    },
    reading: {
      title: "Aushang im Treppenhaus",
      titleTr: "Merdiven boşluğundaki not",
      genre: "Duyuru",
      text: "Liebe Nachbarn,\n\nam Samstag ziehe ich aus der Wohnung im zweiten Stock aus. Der Transporter steht von neun bis vierzehn Uhr vor dem Haus. Bitte parken Sie an diesem Tag nicht direkt vor der Tür.\n\nWenn jemand Kartons braucht: Ich stelle sie in den Keller, neben die Waschmaschine. Nehmen Sie gern etwas mit!\n\nViele Grüße\nFamilie Weber (2. Stock)",
      questions: [
        { de: "Was sollen die Nachbarn am Samstag nicht machen?", tr: "Komşular cumartesi ne yapmamalı?", options: ["Laut sein", "Vor der Tür parken", "In den Keller gehen", "Kartons nehmen"], answer: 1 },
        { de: "Wo stehen die Kartons?", tr: "Kolileri nereye koyuyor?", options: ["Vor dem Haus", "Im Keller", "Im zweiten Stock", "Im Transporter"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "Komşundan yardım istiyorsun.", de: "Kannst du mir bitte helfen? Ich brauche die Leiter nur für zehn Minuten.", tr: "Bana yardım edebilir misin? Merdivene sadece on dakika ihtiyacım var." },
      { situation: "Eşyanın nereye konacağını söylüyorsun.", de: "Stell das Regal bitte an die Wand, neben das Fenster.", tr: "Rafı lütfen duvara, pencerenin yanına koy." },
    ],
    writing: {
      prompt: "Yeni mahalleni bir arkadaşına anlatan bir mesaj yaz.",
      checklist: [
        "En az iki konum edatı kullan (neben, gegenüber, bei …)",
        "Bir „wenn“ cümlesi kur",
        "Komşulardan bahset",
        "Neyi sevdiğini yaz",
      ],
      minWords: 45,
      phrases: [
        { de: "Gegenüber von meinem Haus ist …", tr: "Evimin karşısında … var", en: "Opposite my house there is …" },
        { de: "Neben der Schule gibt es …", tr: "Okulun yanında … var", en: "Next to the school there is …" },
        { de: "Wenn ich … brauche, …", tr: "…'e ihtiyacım olunca …", en: "When I need …, …" },
        { de: "Meine Nachbarn sind sehr …", tr: "Komşularım çok …", en: "My neighbours are very …" },
        { de: "Das stört mich nicht.", tr: "Bu beni rahatsız etmiyor.", en: "That doesn't bother me." },
      ],
      sample:
        "Hallo Lena, ich wohne jetzt in der Gartenstraße. Die Wohnung liegt im dritten Stock und mein Fenster geht auf den Spielplatz. Gegenüber von meinem Haus ist eine Bäckerei, und neben der Schule gibt es einen kleinen Markt. Wenn ich morgens Brot brauche, gehe ich einfach über die Straße. Meine Nachbarn sind sehr freundlich: Frau Weber hat mir Kaffee gebracht und Herr Yildiz hat mir seine Bohrmaschine geliehen. Abends ist es manchmal laut, aber das stört mich nicht.",
    },
  },

  {
    level: "A2",
    index: 4,
    code: "A2.5",
    titleDe: "Arbeitswelt",
    titleTr: "İş hayatı",
    focus: [
      { de: "Nebensatz mit weil", tr: "sebep — fiil sona gider" },
      { de: "Hauptsatz mit denn", tr: "sebep — dizilim değişmez" },
      { de: "dass-Satz", tr: "„…olduğunu düşünüyorum“" },
      { de: "wollen", tr: "niyet bildirmek" },
    ],
    canDo: [
      { de: "Ich kann mich am Arbeitsplatz vorstellen.", tr: "İş yerinde kendimi tanıtabiliyorum.", en: "I can introduce myself at work." },
      { de: "Ich kann einen Grund nennen.", tr: "Bir sebep söyleyebiliyorum.", en: "I can give a reason." },
      { de: "Ich kann in einem Meeting einen Vorschlag machen.", tr: "Toplantıda öneri sunabiliyorum.", en: "I can make a suggestion in a meeting." },
      { de: "Ich kann Urlaub beantragen.", tr: "İzin talebinde bulunabiliyorum.", en: "I can request holiday." },
      { de: "Ich kann sagen, was ich will und was ich denke.", tr: "Ne istediğimi ve ne düşündüğümü söyleyebiliyorum.", en: "I can say what I want and what I think." },
    ],
    listening: {
      title: "Urlaub beantragen",
      titleTr: "İzin talebi",
      situation: "Bir çalışan şefinden izin istiyor.",
      turns: [
        { speaker: "Herr Sahin", de: "Frau Wagner, haben Sie kurz Zeit? Ich will Urlaub nehmen.", tr: "Bayan Wagner, kısa bir dakikanız var mı? İzin almak istiyorum." },
        { speaker: "Frau Wagner", de: "Gern. Von wann bis wann denn?", tr: "Tabii. Ne zamandan ne zamana kadar?" },
        { speaker: "Herr Sahin", de: "Vom zwölften bis zum dreiundzwanzigsten August. Meine Schwester heiratet.", tr: "12'sinden 23 Ağustos'a kadar. Kız kardeşim evleniyor." },
        { speaker: "Frau Wagner", de: "Das ist mitten in der Ferienzeit. Wer macht die Vertretung?", tr: "Tam tatil sezonuna denk geliyor. Yerinize kim bakacak?" },
        { speaker: "Herr Sahin", de: "Ich denke, dass Herr Kaya das übernehmen kann. Ich habe schon mit ihm gesprochen.", tr: "Bay Kaya'nın devralabileceğini düşünüyorum. Onunla konuştum bile." },
        { speaker: "Frau Wagner", de: "Gut, dann genehmige ich den Antrag. Bitte schreiben Sie es noch ins System.", tr: "Tamam, o zaman talebi onaylıyorum. Lütfen bir de sisteme girin." },
      ],
      questions: [
        { de: "Warum will Herr Sahin Urlaub?", tr: "Bay Şahin neden izin istiyor?", options: ["Er ist krank", "Seine Schwester heiratet", "Er zieht um", "Er macht einen Kurs"], answer: 1 },
        { de: "Wer macht die Vertretung?", tr: "Yerine kim bakacak?", options: ["Frau Wagner", "Herr Kaya", "Niemand", "Die Chefin"], answer: 1 },
        { de: "Was soll Herr Sahin noch machen?", tr: "Bay Şahin ayrıca ne yapmalı?", options: ["Mit Herrn Kaya sprechen", "Den Antrag ins System schreiben", "Ein Attest schicken", "Die Kollegen fragen"], answer: 1 },
      ],
    },
    reading: {
      title: "Wir suchen Verstärkung!",
      titleTr: "İş ilanı",
      genre: "İlan",
      text: "Wir suchen Verstärkung!\n\nDas Café Morgenrot sucht ab September eine Mitarbeiterin oder einen Mitarbeiter für den Service.\n\nArbeitszeit: 25 Stunden pro Woche, auch am Wochenende.\nWir bieten: einen festen Vertrag, faire Bezahlung und ein nettes Team.\nWir wünschen uns: Erfahrung im Service und gute Deutschkenntnisse.\n\nBewerbung bitte per E-Mail an job@cafe-morgenrot.de",
      questions: [
        { de: "Wie viele Stunden pro Woche sind es?", tr: "Haftada kaç saat?", options: ["20 Stunden", "25 Stunden", "30 Stunden", "40 Stunden"], answer: 1 },
        { de: "Wie soll man sich bewerben?", tr: "Nasıl başvurulmalı?", options: ["Per Telefon", "Per E-Mail", "Persönlich im Café", "Per Post"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "İş arkadaşlarına kendini tanıtıyorsun.", de: "Ich bin neu im Team und ich bin für den Kundenservice zuständig.", tr: "Ekipte yeniyim ve müşteri hizmetlerinden sorumluyum." },
      { situation: "Geç kalacağını haber veriyorsun.", de: "Ich komme später, denn ich stehe im Stau.", tr: "Geç geleceğim, çünkü trafikte kaldım." },
    ],
    writing: {
      prompt: "Şefine izin talebi için bir e-posta yaz.",
      checklist: [
        "Ne zaman izin istediğini yaz",
        "Sebebini „weil“ ya da „denn“ ile yaz",
        "Yerine kimin bakacağını yaz",
        "Kibar bir kapanış yaz",
      ],
      minWords: 45,
      phrases: [
        { de: "Ich möchte gern Urlaub beantragen.", tr: "İzin talebinde bulunmak istiyorum.", en: "I would like to request holiday." },
        { de: "vom … bis zum …", tr: "…'den …'e kadar", en: "from … to …" },
        { de: "…, weil …", tr: "…, çünkü …", en: "…, because …" },
        { de: "Ich denke, dass …", tr: "… olduğunu düşünüyorum", en: "I think that …" },
        { de: "Vielen Dank im Voraus.", tr: "Şimdiden teşekkürler.", en: "Thank you in advance." },
      ],
      sample:
        "Sehr geehrte Frau Wagner,\n\nich möchte gern Urlaub beantragen, und zwar vom zwölften bis zum dreiundzwanzigsten August. Ich brauche die Tage, weil meine Schwester in Izmir heiratet und meine Familie schon alles geplant hat. Ich denke, dass Herr Kaya meine Aufgaben in dieser Zeit übernehmen kann. Ich habe schon mit ihm gesprochen und er ist einverstanden. Die offenen Projekte gebe ich vorher ab. Können Sie mir bitte Bescheid sagen?\n\nVielen Dank im Voraus und freundliche Grüße\nMurat Sahin",
    },
  },

  {
    level: "A2",
    index: 5,
    code: "A2.6",
    titleDe: "Vergleichen und Dienstleistungen",
    titleTr: "Alışveriş ve hizmetler",
    focus: [
      { de: "Komparativ", tr: "billiger als — karşılaştırma" },
      { de: "Superlativ", tr: "am billigsten — en üstünlük" },
      { de: "Adjektiv vor dem Nomen", tr: "ein roter Mantel" },
      { de: "Reklamation", tr: "şikâyet ve iade dili" },
    ],
    canDo: [
      { de: "Ich kann zwei Produkte vergleichen.", tr: "İki ürünü karşılaştırabiliyorum.", en: "I can compare two products." },
      { de: "Ich kann sagen, was am besten ist.", tr: "En iyisinin hangisi olduğunu söyleyebiliyorum.", en: "I can say what is best." },
      { de: "Ich kann Adjektive vor dem Nomen benutzen.", tr: "Sıfatı ismin önünde çekebiliyorum.", en: "I can use adjectives before the noun." },
      { de: "Ich kann eine Reklamation machen.", tr: "Şikâyette bulunabiliyorum.", en: "I can make a complaint." },
      { de: "Ich kann bei Bank, Post oder Friseur mein Anliegen erklären.", tr: "Bankada, postanede ya da kuaförde derdimi anlatabiliyorum.", en: "I can explain my request at the bank, post office or hairdresser." },
    ],
    listening: {
      title: "Die Reklamation",
      titleTr: "Ürün şikâyeti",
      situation: "Bir müşteri bozuk bir cihazı geri getiriyor.",
      turns: [
        { speaker: "Kunde", de: "Guten Tag. Ich habe vor zwei Wochen diesen Wasserkocher bei Ihnen gekauft. Er funktioniert nicht mehr.", tr: "İyi günler. İki hafta önce bu su ısıtıcısını sizden almıştım. Artık çalışmıyor." },
        { speaker: "Verkäuferin", de: "Haben Sie den Beleg dabei?", tr: "Fişiniz yanınızda mı?" },
        { speaker: "Kunde", de: "Ja, hier. Und die Garantie gilt zwei Jahre, oder?", tr: "Evet, buyurun. Garanti iki yıl, değil mi?" },
        { speaker: "Verkäuferin", de: "Richtig. Möchten Sie ein neues Gerät oder Ihr Geld zurück?", tr: "Doğru. Yeni bir cihaz mı yoksa paranızı geri mi istersiniz?" },
        { speaker: "Kunde", de: "Am liebsten das Geld zurück. Das gleiche Modell ist mir zu teuer.", tr: "En iyisi para iadesi. Aynı model bana pahalı geliyor." },
        { speaker: "Verkäuferin", de: "Kein Problem. Ich brauche nur kurz Ihre Kontonummer.", tr: "Sorun değil. Sadece hesap numaranıza ihtiyacım var." },
      ],
      questions: [
        { de: "Was ist das Problem?", tr: "Sorun ne?", options: ["Der Wasserkocher ist zu teuer", "Der Wasserkocher funktioniert nicht", "Der Beleg fehlt", "Die Garantie ist zu Ende"], answer: 1 },
        { de: "Was möchte der Kunde?", tr: "Müşteri ne istiyor?", options: ["Ein neues Gerät", "Sein Geld zurück", "Eine Reparatur", "Einen Gutschein"], answer: 1 },
        { de: "Was braucht die Verkäuferin?", tr: "Satıcı neye ihtiyaç duyuyor?", options: ["Den Ausweis", "Die Kontonummer", "Die Telefonnummer", "Nichts"], answer: 1 },
      ],
    },
    reading: {
      title: "Handytarife im Vergleich",
      titleTr: "Tarife karşılaştırması",
      genre: "Karşılaştırma tablosu",
      text: "Handytarife im Vergleich\n\nTarif S: 5 GB Internet, 100 Minuten — 9,99 € im Monat\nTarif M: 15 GB Internet, unbegrenzt telefonieren — 19,99 € im Monat\nTarif L: unbegrenztes Internet, unbegrenzt telefonieren — 34,99 € im Monat\n\nAlle Tarife sind monatlich kündbar und ohne Anschlussgebühr.\nTarif M ist im Moment am beliebtesten.",
      questions: [
        { de: "Welcher Tarif ist am billigsten?", tr: "Hangi tarife en ucuz?", options: ["Tarif S", "Tarif M", "Tarif L", "Alle kosten gleich"], answer: 0 },
        { de: "Was ist bei allen Tarifen gleich?", tr: "Bütün tarifelerde ortak olan ne?", options: ["Das Internet", "Die Minuten", "Der Preis", "Man kann monatlich kündigen"], answer: 3 },
      ],
    },
    speaking: [
      { situation: "İki ürünü karşılaştırıyorsun.", de: "Die blaue Jacke ist teurer als die schwarze, aber sie gefällt mir besser.", tr: "Mavi ceket siyahtan pahalı ama daha çok hoşuma gidiyor." },
      { situation: "Kuaförde ne istediğini söylüyorsun.", de: "Waschen und schneiden, bitte. Aber nicht zu kurz.", tr: "Yıkama ve kesim lütfen. Ama çok kısa olmasın." },
    ],
    writing: {
      prompt: "İnternetten aldığın bir ürün bozuk çıktı. Mağazaya şikâyet e-postası yaz.",
      checklist: [
        "Ne aldığını ve ne zaman aldığını yaz",
        "Sorunu açıkla",
        "Ne istediğini yaz (yeni ürün ya da para iadesi)",
        "Bir karşılaştırma cümlesi kur",
      ],
      minWords: 45,
      phrases: [
        { de: "Ich habe bei Ihnen … bestellt.", tr: "Sizden … sipariş etmiştim.", en: "I ordered … from you." },
        { de: "Leider funktioniert … nicht.", tr: "Maalesef … çalışmıyor.", en: "Unfortunately … doesn't work." },
        { de: "Ich möchte lieber … als …", tr: "…'i …'e tercih ederim", en: "I would rather have … than …" },
        { de: "Die Garantie gilt …", tr: "Garanti … geçerli", en: "The warranty is valid …" },
        { de: "Mit freundlichen Grüßen", tr: "Saygılarımla", en: "Kind regards" },
      ],
      sample:
        "Sehr geehrte Damen und Herren,\n\nam 3. März habe ich bei Ihnen einen Wasserkocher bestellt (Bestellnummer 48219). Leider funktioniert das Gerät seit gestern nicht mehr: Es wird heiß, aber es schaltet nicht ab. Ich habe den Beleg noch und die Garantie gilt zwei Jahre. Ich möchte lieber mein Geld zurück als ein neues Gerät, denn das gleiche Modell ist mir zu teuer. Können Sie mir bitte sagen, wie ich den Wasserkocher zurückschicken soll?\n\nMit freundlichen Grüßen\nElif Yilmaz",
    },
  },

  {
    level: "A2",
    index: 6,
    code: "A2.7",
    titleDe: "Reisen",
    titleTr: "Seyahat",
    focus: [
      { de: "Wohin? ans Meer, in die Berge", tr: "yön edatları" },
      { de: "Futur mit werden", tr: "gelecek zaman" },
      { de: "müssen", tr: "gereklilik" },
      { de: "Nebensatz mit wenn", tr: "koşul" },
    ],
    canDo: [
      { de: "Ich kann eine Reise planen und sagen, wohin ich fahre.", tr: "Bir seyahat planlayıp nereye gittiğimi söyleyebiliyorum.", en: "I can plan a trip and say where I'm going." },
      { de: "Ich kann im Hotel einchecken und Fragen stellen.", tr: "Otele giriş yapıp soru sorabiliyorum.", en: "I can check in at a hotel and ask questions." },
      { de: "Ich kann einen Wetterbericht verstehen.", tr: "Hava durumu bültenini anlayabiliyorum.", en: "I can understand a weather forecast." },
      { de: "Ich kann sagen, was ich einpacken muss.", tr: "Ne toplamam gerektiğini söyleyebiliyorum.", en: "I can say what I have to pack." },
      { de: "Ich kann ein Reiseproblem melden.", tr: "Bir seyahat aksaklığını bildirebiliyorum.", en: "I can report a travel problem." },
    ],
    listening: {
      title: "An der Rezeption",
      titleTr: "Otel resepsiyonunda",
      situation: "Bir konuk otele giriş yapıyor.",
      turns: [
        { speaker: "Gast", de: "Guten Abend, ich habe ein Doppelzimmer reserviert, auf den Namen Öztürk.", tr: "İyi akşamlar, Öztürk adına çift kişilik oda ayırtmıştım." },
        { speaker: "Rezeption", de: "Willkommen! Drei Nächte, richtig? Zimmer 214, im zweiten Stock.", tr: "Hoş geldiniz! Üç gece, değil mi? 214 numara, ikinci katta." },
        { speaker: "Gast", de: "Danke. Wann gibt es Frühstück?", tr: "Teşekkürler. Kahvaltı ne zaman?" },
        { speaker: "Rezeption", de: "Von halb sieben bis zehn Uhr, im Restaurant im Erdgeschoss.", tr: "Altı buçuktan ona kadar, zemin kattaki restoranda." },
        { speaker: "Gast", de: "Und wenn wir früher losfahren müssen?", tr: "Peki daha erken çıkmamız gerekirse?" },
        { speaker: "Rezeption", de: "Dann machen wir Ihnen ein Frühstückspaket. Sagen Sie am Abend vorher Bescheid.", tr: "O zaman size kahvaltı paketi hazırlarız. Bir gece önceden haber verin." },
      ],
      questions: [
        { de: "Wie lange bleibt der Gast?", tr: "Konuk ne kadar kalıyor?", options: ["Eine Nacht", "Zwei Nächte", "Drei Nächte", "Eine Woche"], answer: 2 },
        { de: "Wann gibt es Frühstück?", tr: "Kahvaltı ne zaman?", options: ["Von sechs bis neun", "Von halb sieben bis zehn", "Von sieben bis elf", "Nur am Wochenende"], answer: 1 },
        { de: "Was bekommt der Gast, wenn er früh losfährt?", tr: "Erken çıkarsa konuk ne alıyor?", options: ["Nichts", "Ein Frühstückspaket", "Geld zurück", "Ein anderes Zimmer"], answer: 1 },
      ],
    },
    reading: {
      title: "Der Wetterbericht",
      titleTr: "Hava durumu",
      genre: "Hava raporu",
      text: "Der Wetterbericht für das Wochenende\n\nAm Samstag wird es sonnig und warm, bis zu 28 Grad. Am Nachmittag weht ein leichter Wind.\n\nAm Sonntag wird es leider anders: Ab Mittag wird es bewölkt und am Abend gibt es Gewitter. Die Temperaturen fallen auf 17 Grad.\n\nWenn Sie eine Wanderung planen, nehmen Sie besser den Samstag.",
      questions: [
        { de: "Wie wird das Wetter am Samstag?", tr: "Cumartesi hava nasıl olacak?", options: ["Bewölkt", "Sonnig und warm", "Regnerisch", "Kalt"], answer: 1 },
        { de: "Was empfiehlt der Bericht für eine Wanderung?", tr: "Rapor yürüyüş için ne öneriyor?", options: ["Den Sonntag", "Den Samstag", "Den Freitag", "Gar nicht wandern"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "Otelde rezervasyonunu söylüyorsun.", de: "Guten Abend, ich habe ein Doppelzimmer für drei Nächte reserviert.", tr: "İyi akşamlar, üç gece için çift kişilik oda ayırtmıştım." },
      { situation: "Uçuşunun iptal edildiğini bildiriyorsun.", de: "Unser Flug ist gestrichen. Können Sie uns bitte umbuchen?", tr: "Uçuşumuz iptal edildi. Bizi başka uçuşa alabilir misiniz?" },
    ],
    writing: {
      prompt: "Bir arkadaşınla tatil planlıyorsun. Ona planı anlatan bir mesaj yaz.",
      checklist: [
        "Nereye ve ne zaman gideceğinizi yaz",
        "„werden“ ile gelecek zaman kullan",
        "Bir „wenn“ cümlesi kur",
        "Ne getirmesi gerektiğini yaz",
      ],
      minWords: 45,
      phrases: [
        { de: "Wir fahren am … in die Berge / ans Meer.", tr: "…'de dağlara/denize gidiyoruz.", en: "On … we're going to the mountains / the sea." },
        { de: "Wir werden …", tr: "… yapacağız", en: "We will …" },
        { de: "Wenn das Wetter gut ist, …", tr: "Hava iyi olursa …", en: "If the weather is good, …" },
        { de: "Wir müssen früh aufstehen.", tr: "Erken kalkmamız gerekiyor.", en: "We have to get up early." },
        { de: "Bring bitte … mit.", tr: "Lütfen … getir.", en: "Please bring …" },
      ],
      sample:
        "Hallo Tim, ich habe alles gebucht! Wir fahren am 14. Juli in die Berge, nach Garmisch. Der Zug fährt um 7:40 Uhr ab, also müssen wir früh aufstehen. Die Pension liegt direkt am Wanderweg. Am ersten Tag werden wir nur spazieren gehen, denn die Fahrt dauert lange. Am zweiten Tag machen wir eine große Wanderung — wenn das Wetter gut ist. Wenn es regnet, fahren wir in die Stadt. Bring bitte gute Schuhe und eine Jacke mit!",
    },
  },

  {
    level: "A2",
    index: 7,
    code: "A2.8",
    titleDe: "Feiern und Beziehungen",
    titleTr: "Kutlamalar ve ilişkiler",
    focus: [
      { de: "Ordinalzahlen und Datum", tr: "am dritten Mai" },
      { de: "dass-Satz", tr: "„…olduğunu umuyorum“" },
      { de: "Dativ: ihm, ihr, uns", tr: "kime hediye edildiği" },
      { de: "Absage mit weil", tr: "sebep bildirerek reddetmek" },
    ],
    canDo: [
      { de: "Ich kann gratulieren und ein Datum nennen.", tr: "Tebrik edebiliyor ve tarih söyleyebiliyorum.", en: "I can congratulate and give a date." },
      { de: "Ich kann eine Feier planen und Aufgaben verteilen.", tr: "Bir kutlama planlayıp görev paylaşabiliyorum.", en: "I can plan a celebration and divide tasks." },
      { de: "Ich kann sagen, was ich jemandem schenke.", tr: "Kime ne hediye ettiğimi söyleyebiliyorum.", en: "I can say what I give someone as a present." },
      { de: "Ich kann eine Einladung absagen und einen Grund nennen.", tr: "Bir daveti sebep göstererek reddedebiliyorum.", en: "I can decline an invitation and give a reason." },
      { de: "Ich kann mich entschuldigen und Komplimente machen.", tr: "Özür dileyebiliyor ve iltifat edebiliyorum.", en: "I can apologise and pay compliments." },
    ],
    listening: {
      title: "Wir planen eine Party",
      titleTr: "Parti planı",
      situation: "İki arkadaş sürpriz doğum günü planlıyor.",
      turns: [
        { speaker: "Sena", de: "Marc wird am dritten Mai dreißig. Wir sollten etwas organisieren.", tr: "Marc 3 Mayıs'ta otuz oluyor. Bir şeyler organize etmeliyiz." },
        { speaker: "Tobias", de: "Gute Idee! Ich finde, dass wir im Garten feiern sollten.", tr: "İyi fikir! Bence bahçede kutlamalıyız." },
        { speaker: "Sena", de: "Perfekt. Ich besorge den Kuchen und die Kerzen.", tr: "Mükemmel. Pastayı ve mumları ben alırım." },
        { speaker: "Tobias", de: "Und ich kümmere mich um die Getränke. Was schenken wir ihm?", tr: "Ben de içecekleri hallederim. Ona ne hediye edelim?" },
        { speaker: "Sena", de: "Ich schenke ihm ein Buch. Vielleicht kaufen wir zusammen einen Gutschein?", tr: "Ben ona kitap alacağım. Belki birlikte bir hediye çeki alırız?" },
        { speaker: "Tobias", de: "Machen wir. Ich hoffe, dass alle kommen können.", tr: "Öyle yapalım. Umarım herkes gelebilir." },
      ],
      questions: [
        { de: "Wann hat Marc Geburtstag?", tr: "Marc'ın doğum günü ne zaman?", options: ["Am ersten Mai", "Am dritten Mai", "Am dreißigsten Mai", "Am dritten März"], answer: 1 },
        { de: "Was besorgt Sena?", tr: "Sena ne alıyor?", options: ["Die Getränke", "Den Kuchen und die Kerzen", "Den Gutschein", "Die Musik"], answer: 1 },
        { de: "Wo soll die Feier sein?", tr: "Kutlama nerede olacak?", options: ["In einem Restaurant", "Im Garten", "In der Wohnung", "Im Park"], answer: 1 },
      ],
    },
    reading: {
      title: "Wir heiraten!",
      titleTr: "Düğün davetiyesi",
      genre: "Davetiye",
      text: "Liebe Familie, liebe Freunde,\n\nwir heiraten! Am Samstag, dem 17. August, geben wir uns im Standesamt Bonn das Ja-Wort. Danach feiern wir ab 15 Uhr im Landhaus Sonnenhof.\n\nBitte sagt uns bis zum 20. Juli Bescheid, ob ihr kommen könnt. Wir wünschen uns keine Geschenke — wer möchte, kann etwas für die Hochzeitsreise dazugeben.\n\nWir freuen uns auf euch!\nLea und Deniz",
      questions: [
        { de: "Wann ist die Hochzeit?", tr: "Düğün ne zaman?", options: ["Am 20. Juli", "Am 15. August", "Am 17. August", "Am 17. Juli"], answer: 2 },
        { de: "Was wünscht sich das Paar?", tr: "Çift ne istiyor?", options: ["Blumen", "Keine Geschenke", "Bücher", "Geld für ein Haus"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "Doğum gününü kutluyorsun.", de: "Herzlichen Glückwunsch zum Geburtstag! Ich hoffe, dass du einen schönen Tag hast.", tr: "Doğum günün kutlu olsun! Umarım güzel bir gün geçirirsin." },
      { situation: "Bir daveti iptal ediyorsun.", de: "Es tut mir leid, ich kann nicht kommen, weil ich arbeiten muss.", tr: "Üzgünüm, gelemiyorum çünkü çalışmam gerekiyor." },
    ],
    writing: {
      prompt: "Bir davete katılamıyorsun. Kısa bir iptal mesajı yaz ve telafi öner.",
      checklist: [
        "Davet için teşekkür et",
        "Sebebini „weil“ ile yaz",
        "Bir „dass“ cümlesi kur",
        "Telafi öner",
      ],
      minWords: 40,
      phrases: [
        { de: "Vielen Dank für die Einladung!", tr: "Davet için çok teşekkürler!", en: "Thank you for the invitation!" },
        { de: "Leider kann ich nicht kommen, weil …", tr: "Maalesef gelemiyorum çünkü …", en: "Unfortunately I can't come because …" },
        { de: "Ich hoffe, dass …", tr: "Umarım …", en: "I hope that …" },
        { de: "Wir holen es nach.", tr: "Bunu telafi ederiz.", en: "We'll make up for it." },
        { de: "Liebe Grüße", tr: "Sevgiler", en: "Best wishes" },
      ],
      sample:
        "Liebe Sena, vielen Dank für die Einladung zu Marcs Geburtstag! Leider kann ich am dritten Mai nicht kommen, weil ich an diesem Wochenende arbeiten muss. Das tut mir wirklich leid. Ich hoffe, dass ihr trotzdem einen schönen Abend habt. Sag Marc bitte, dass ich an ihn denke. Mein Geschenk bringe ich nächste Woche vorbei. Und wenn du Zeit hast, holen wir das bei einem Kaffee nach. Liebe Grüße, Elif",
    },
  },

  {
    level: "A2",
    index: 8,
    code: "A2.9",
    titleDe: "Medien und Technik",
    titleTr: "Medya ve teknoloji",
    focus: [
      { de: "Nebensatz mit wenn", tr: "koşul ve tekrar" },
      { de: "Verben mit Präposition", tr: "warten auf, sich interessieren für" },
      { de: "Imperativ (du)", tr: "kısa yönerge vermek" },
      { de: "Superlativ", tr: "am besten, am schönsten" },
    ],
    canDo: [
      { de: "Ich kann über Serien, Podcasts und Nachrichten sprechen.", tr: "Dizi, podcast ve haberler hakkında konuşabiliyorum.", en: "I can talk about series, podcasts and the news." },
      { de: "Ich kann Bedingungen mit „wenn“ formulieren.", tr: "„wenn“ ile koşul kurabiliyorum.", en: "I can express conditions with „wenn“." },
      { de: "Ich kann Verben mit fester Präposition benutzen.", tr: "Edatı sabit fiilleri kullanabiliyorum.", en: "I can use verbs with fixed prepositions." },
      { de: "Ich kann ein technisches Problem beschreiben.", tr: "Teknik bir sorunu anlatabiliyorum.", en: "I can describe a technical problem." },
      { de: "Ich kann jemandem eine kurze Anweisung geben.", tr: "Birine kısa bir yönerge verebiliyorum.", en: "I can give someone a short instruction." },
    ],
    listening: {
      title: "Der Computer spinnt",
      titleTr: "Bilgisayar çıldırdı",
      situation: "Ali bilgisayar sorununu Mona'ya anlatıyor.",
      turns: [
        { speaker: "Ali", de: "Kannst du mir helfen? Mein Computer stürzt immer ab.", tr: "Bana yardım edebilir misin? Bilgisayarım sürekli çöküyor." },
        { speaker: "Mona", de: "Wann passiert das genau?", tr: "Tam olarak ne zaman oluyor?" },
        { speaker: "Ali", de: "Immer wenn ich das Videoprogramm öffne. Danach geht nichts mehr.", tr: "Ne zaman video programını açsam. Sonrasında hiçbir şey çalışmıyor." },
        { speaker: "Mona", de: "Hast du vorher gespeichert?", tr: "Öncesinde kaydetmiş miydin?" },
        { speaker: "Ali", de: "Zum Glück ja. Aber ich warte schon seit einer Woche auf eine Antwort vom Support.", tr: "İyi ki evet. Ama bir haftadır destekten cevap bekliyorum." },
        { speaker: "Mona", de: "Starte den Computer neu und mach ein Update. Das hilft meistens.", tr: "Bilgisayarı yeniden başlat ve güncelleme yap. Genelde işe yarar." },
      ],
      questions: [
        { de: "Wann stürzt der Computer ab?", tr: "Bilgisayar ne zaman çöküyor?", options: ["Beim Start", "Wenn Ali das Videoprogramm öffnet", "Nach einer Stunde", "Wenn der Akku leer ist"], answer: 1 },
        { de: "Worauf wartet Ali?", tr: "Ali neyi bekliyor?", options: ["Auf ein Update", "Auf eine Antwort vom Support", "Auf einen neuen Computer", "Auf Mona"], answer: 1 },
        { de: "Was empfiehlt Mona?", tr: "Mona ne öneriyor?", options: ["Einen neuen Computer kaufen", "Neu starten und ein Update machen", "Zum Support gehen", "Nichts machen"], answer: 1 },
      ],
    },
    reading: {
      title: "Podcast-Tipp",
      titleTr: "Podcast önerisi",
      genre: "Tanıtım yazısı",
      text: "Podcast-Tipp: „Stadt, Land, Zukunft“\n\nJeden Donnerstag erscheint eine neue Folge, ungefähr 25 Minuten lang. Es geht um das Leben in kleinen Städten: Wer bleibt, wer geht — und warum?\n\nDie Moderatorin spricht langsam und deutlich, deshalb ist der Podcast auch für Lernende gut. Wenn du dich für Gesellschaft und Sprache interessierst, hör mal rein.\n\nKostenlos überall, wo es Podcasts gibt.",
      questions: [
        { de: "Wie lang ist eine Folge?", tr: "Bir bölüm ne kadar sürüyor?", options: ["Zehn Minuten", "Etwa 25 Minuten", "Eine Stunde", "Zwei Stunden"], answer: 1 },
        { de: "Warum ist der Podcast gut für Lernende?", tr: "Podcast öğrenenler için neden iyi?", options: ["Er ist sehr kurz", "Die Moderatorin spricht langsam und deutlich", "Er ist auf Englisch", "Es gibt Untertitel"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "Sevdiğin bir diziyi anlatıyorsun.", de: "Wenn ich Zeit habe, schaue ich Serien. Die zweite Staffel ist am besten.", tr: "Vaktim olduğunda dizi izlerim. En iyisi ikinci sezon." },
      { situation: "Görüntülü görüşmede bir sorunu bildiriyorsun.", de: "Die Verbindung ist schlecht und man hört Sie nicht. Können Sie das Mikrofon prüfen?", tr: "Bağlantı kötü ve sesiniz gelmiyor. Mikrofonu kontrol edebilir misiniz?" },
    ],
    writing: {
      prompt: "Bir arkadaşına sevdiğin bir dizi, film ya da podcast'i öner.",
      checklist: [
        "Ne olduğunu ve neyle ilgili olduğunu yaz",
        "Bir „wenn“ cümlesi kur",
        "„es geht um“ ya da „sich interessieren für“ kullan",
        "En üstünlük derecesi kullan (am besten …)",
      ],
      minWords: 45,
      phrases: [
        { de: "Ich empfehle dir …", tr: "Sana …'i öneririm", en: "I recommend … to you." },
        { de: "Es geht um …", tr: "… hakkında", en: "It's about …" },
        { de: "Wenn du dich für … interessierst, …", tr: "…'e ilgi duyuyorsan …", en: "If you're interested in …, …" },
        { de: "Die zweite Staffel ist am besten.", tr: "En iyisi ikinci sezon.", en: "The second season is the best." },
        { de: "Sag mir Bescheid!", tr: "Bana haber ver!", en: "Let me know!" },
      ],
      sample:
        "Hallo Kaan, du hast doch nach einer Serie gefragt. Ich empfehle dir „Kleine Stadt, große Pläne“. Es geht um eine junge Ärztin, die aus Berlin in ein Dorf zieht. Die erste Staffel ist gut, aber die zweite ist am besten. Die Folgen sind nur dreißig Minuten lang, also perfekt für den Abend. Wenn du dich für ruhige Geschichten interessierst, wird sie dir gefallen. Schau mal rein und sag mir Bescheid!",
    },
  },

  {
    level: "A2",
    index: 9,
    code: "A2.10",
    titleDe: "Ämter und Zukunft",
    titleTr: "Şehir ve resmî işler",
    focus: [
      { de: "Imperativ (Sie-Form)", tr: "resmî yönerge" },
      { de: "Futur mit werden", tr: "planlar ve gelecek" },
      { de: "dürfen", tr: "izin ve hak" },
      { de: "Nebensatz mit weil", tr: "gerekçelendirme" },
    ],
    canDo: [
      { de: "Ich kann mich auf dem Amt anmelden.", tr: "Nüfus dairesinde kayıt yaptırabiliyorum.", en: "I can register at the citizens' office." },
      { de: "Ich kann ein Formular verstehen und ausfüllen.", tr: "Bir formu anlayıp doldurabiliyorum.", en: "I can understand and fill in a form." },
      { de: "Ich kann nach Unterlagen und Fristen fragen.", tr: "Belge ve süre sorabiliyorum.", en: "I can ask about documents and deadlines." },
      { de: "Ich kann über meine Pläne sprechen.", tr: "Planlarımdan bahsedebiliyorum.", en: "I can talk about my plans." },
      { de: "Ich kann sagen, was ich hier gelernt habe.", tr: "Burada ne öğrendiğimi söyleyebiliyorum.", en: "I can say what I have learned here." },
    ],
    listening: {
      title: "Auf dem Bürgeramt",
      titleTr: "Nüfus dairesinde",
      situation: "Bir vatandaş adres kaydı yaptırmak istiyor.",
      turns: [
        { speaker: "Beamter", de: "Guten Tag. Ziehen Sie bitte eine Nummer und nehmen Sie Platz.", tr: "İyi günler. Lütfen sıra numarası alın ve oturun." },
        { speaker: "Bürgerin", de: "Ich habe schon eine, Nummer 214. Ich möchte mich anmelden.", tr: "Aldım, 214 numara. Adres kaydı yaptırmak istiyorum." },
        { speaker: "Beamter", de: "Gut. Haben Sie den Mietvertrag und Ihren Ausweis dabei?", tr: "Peki. Kira sözleşmeniz ve kimliğiniz yanınızda mı?" },
        { speaker: "Bürgerin", de: "Den Ausweis ja, aber den Mietvertrag habe ich zu Hause vergessen.", tr: "Kimlik var ama kira sözleşmesini evde unuttum." },
        { speaker: "Beamter", de: "Ohne Mietvertrag geht es leider nicht. Sie brauchen die Bestätigung vom Vermieter.", tr: "Kira sözleşmesi olmadan maalesef olmuyor. Ev sahibinden onay belgesi gerekiyor." },
        { speaker: "Bürgerin", de: "Verstanden. Bekomme ich einen neuen Termin?", tr: "Anladım. Yeni bir randevu alabilir miyim?" },
        { speaker: "Beamter", de: "Ja, kommen Sie am Donnerstag um neun Uhr, dann müssen Sie nicht warten.", tr: "Evet, perşembe saat dokuzda gelin, o zaman beklemezsiniz." },
      ],
      questions: [
        { de: "Was möchte die Bürgerin machen?", tr: "Vatandaş ne yapmak istiyor?", options: ["Einen Pass beantragen", "Sich anmelden", "Sich abmelden", "Ein Auto anmelden"], answer: 1 },
        { de: "Was fehlt ihr?", tr: "Neyi eksik?", options: ["Der Ausweis", "Der Mietvertrag", "Die Wartenummer", "Das Geld"], answer: 1 },
        { de: "Wann soll sie wiederkommen?", tr: "Ne zaman tekrar gelmeli?", options: ["Am Mittwoch um neun", "Am Donnerstag um neun", "Am Donnerstag um zehn", "Nächste Woche"], answer: 1 },
      ],
    },
    reading: {
      title: "Deutschkurse ab September",
      titleTr: "Kurs duyurusu",
      genre: "Duyuru",
      text: "Volkshochschule Bonn – Deutschkurse ab September\n\nB1-Kurs: montags und mittwochs, 18–20 Uhr, 12 Wochen, 180 Euro.\nDie Anmeldung ist online oder persönlich im Büro möglich.\n\nWichtig: Melden Sie sich bis zum 25. August an. Der Kurs beginnt nur, wenn mindestens acht Personen teilnehmen.\n\nSie haben schon einen A2-Abschluss? Dann dürfen Sie direkt in den B1-Kurs.",
      questions: [
        { de: "Wann findet der Kurs statt?", tr: "Kurs ne zaman?", options: ["Jeden Tag", "Montags und mittwochs", "Nur am Wochenende", "Dienstags"], answer: 1 },
        { de: "Bis wann muss man sich anmelden?", tr: "Ne zamana kadar kayıt olmalı?", options: ["Bis zum 8. August", "Bis zum 25. August", "Bis September", "Bis zum ersten Kurstag"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "Dairede işini anlatıyorsun.", de: "Guten Tag, ich möchte mich anmelden. Welche Unterlagen brauche ich?", tr: "İyi günler, kayıt yaptırmak istiyorum. Hangi belgeler gerekiyor?" },
      { situation: "Geleceğe dair planını söylüyorsun.", de: "Nächstes Jahr werde ich einen B1-Kurs machen, weil ich hier arbeiten will.", tr: "Gelecek yıl B1 kursu yapacağım çünkü burada çalışmak istiyorum." },
    ],
    writing: {
      prompt: "Bir kursa kaydolmak için kurs merkezine e-posta yaz.",
      checklist: [
        "Hangi kursu istediğini yaz",
        "Şu anki seviyeni yaz",
        "Sebebini „weil“ ile yaz",
        "En az iki soru sor (belge, ücret, tarih)",
      ],
      minWords: 45,
      phrases: [
        { de: "Ich interessiere mich für den … Kurs.", tr: "… kursuyla ilgileniyorum.", en: "I'm interested in the … course." },
        { de: "Ich habe die … Prüfung bestanden.", tr: "… sınavını geçtim.", en: "I passed the … exam." },
        { de: "…, weil ich … will.", tr: "…, çünkü … istiyorum", en: "…, because I want to …" },
        { de: "Welche Unterlagen brauche ich?", tr: "Hangi belgeler gerekiyor?", en: "Which documents do I need?" },
        { de: "Gibt es noch freie Plätze?", tr: "Boş yer var mı?", en: "Are there still places available?" },
      ],
      sample:
        "Sehr geehrte Damen und Herren,\n\nich interessiere mich für den B1-Kurs ab September. Ich habe im Juni die A2-Prüfung bestanden und ich möchte weitermachen, weil ich hier eine Ausbildung anfangen will. Können Sie mir bitte sagen, welche Unterlagen ich für die Anmeldung brauche? Ich möchte auch wissen, ob es noch freie Plätze gibt und ob man den Kurs in zwei Raten bezahlen kann. Nächste Woche komme ich auch persönlich vorbei.\n\nVielen Dank und freundliche Grüße\nElif Yilmaz",
    },
  },
];
