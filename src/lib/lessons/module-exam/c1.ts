import type { ModuleExamPlan } from "./types";

/**
 * C1 modül sınavlarının elle yazılan içeriği.
 *
 * C1'de sınavın sorduğu soru değişiyor. A1–B1'de "ne yazıyor", B2'de "ne
 * demeye getiriyor" soruluyordu; C1'de "bunu neden BÖYLE söyledi" soruluyor.
 * Metinler artık yalnızca bilgi ya da duruş değil ÜSLUP taşıyor: bir basın
 * açıklamasının failsizliği, bir okur yorumunun ölçülülüğü, bir parçacığın
 * kattığı sitem. Okuma sorularının en az biri her kâğıtta doğrudan bunu
 * hedefliyor.
 *
 * Yazma görevleri 110 kelimeden başlıyor: C1'de bir metnin iş görmesi için
 * yalnızca bilgi değil kuruluş da gerekiyor — giriş, gerekçe, çekince,
 * öneri, kapanış.
 */
export const C1_EXAMS: ModuleExamPlan[] = [
  {
    level: "C1",
    index: 0,
    code: "C1.1",
    titleDe: "Berufliche Eleganz",
    titleTr: "Zarif iş iletişimi",
    focus: [
      { de: "Funktionsverbgefüge", tr: "eine Entscheidung treffen / in Frage kommen" },
      { de: "Konjunktiv II in der Diplomatie", tr: "Ich hätte da einen Einwand" },
      { de: "Nominalstil", tr: "Maßnahmen wurden eingeleitet" },
      { de: "indirekte Rede", tr: "Er sagt, er habe …" },
      { de: "rhetorischer Aufbau", tr: "Stellen Sie sich vor … / Der Clou daran ist …" },
    ],
    canDo: [
      { de: "Ich kann Funktionsverbgefüge korrekt und sicher verwenden.", tr: "İşlev fiili öbeklerini doğru ve rahat kullanabiliyorum.", en: "I can use light-verb constructions correctly and confidently." },
      { de: "Ich kann widersprechen, ohne die Beziehung zu belasten.", tr: "İlişkiyi zedelemeden karşı çıkabiliyorum.", en: "I can disagree without damaging the relationship." },
      { de: "Ich kann eine schlechte Nachricht institutionell formulieren.", tr: "Kötü bir haberi kurumsal dille verebiliyorum.", en: "I can deliver bad news in institutional language." },
      { de: "Ich kann in einem Konflikt neutral zwischen zwei Seiten vermitteln.", tr: "Bir çatışmada iki taraf arasında tarafsız arabuluculuk yapabiliyorum.", en: "I can mediate neutrally between two sides in a conflict." },
      { de: "Ich kann eine Idee in wenigen Minuten überzeugend vorstellen.", tr: "Bir fikri birkaç dakikada ikna edici biçimde sunabiliyorum.", en: "I can pitch an idea convincingly in a few minutes." },
    ],
    listening: {
      title: "Die Vorstandssitzung",
      titleTr: "Yönetim toplantısı",
      situation: "Bir yönetim toplantısında zor bir karar görüşülüyor.",
      turns: [
        { speaker: "Vorsitzende", de: "Wir müssen heute eine Entscheidung treffen. Welche Optionen kommen aus Ihrer Sicht noch in Frage?", tr: "Bugün bir karar vermek zorundayız. Sizce hangi seçenekler hâlâ söz konusu?" },
        { speaker: "Herr Wolf", de: "Aus meiner Sicht nur zwei. Die dritte würde ich streichen — die Tragweite ist schlicht zu groß.", tr: "Bence sadece iki tane. Üçüncüsünü çıkarırdım — kapsamı basitçe fazla büyük." },
        { speaker: "Frau Neuhaus", de: "Bei allem Respekt, dem kann ich nicht zustimmen. Ich hätte da einen Einwand: Wir haben die Zahlen von März zugrunde gelegt, nicht die aktuellen.", tr: "Tüm saygımla, buna katılamıyorum. Bir itirazım var: Mart rakamlarını esas aldık, güncel olanları değil." },
        { speaker: "Herr Wolf", de: "Das ist ein berechtigter Punkt. Dann würde ich anregen, die Entscheidung um eine Woche zu vertagen.", tr: "Bu haklı bir nokta. O hâlde kararı bir hafta ertelemeyi önerirdim." },
        { speaker: "Vorsitzende", de: "Vertagen kommt nicht in Frage. Der Vertrag tritt am Ersten in Kraft — dieses Risiko nehmen wir nicht in Kauf.", tr: "Erteleme söz konusu değil. Sözleşme ayın birinde yürürlüğe giriyor — bu riski göze almıyoruz." },
        { speaker: "Frau Neuhaus", de: "Dann schlage ich vor: Wir entscheiden heute, aber unter Vorbehalt der neuen Zahlen.", tr: "O hâlde şunu öneriyorum: Bugün karar veriyoruz ama yeni rakamlar kaydıyla." },
        { speaker: "Vorsitzende", de: "Damit kann ich leben. Halten wir das so fest.", tr: "Bununla yaşayabilirim. Bunu böyle kayda geçirelim." },
      ],
      questions: [
        { de: "Worauf stützt sich Frau Neuhaus' Einwand?", tr: "Bayan Neuhaus'un itirazı neye dayanıyor?", options: ["Auf die Kosten", "Auf veraltete Zahlen", "Auf einen Vertragsfehler", "Auf die Personalsituation"], answer: 1 },
        { de: "Warum lehnt die Vorsitzende eine Vertagung ab?", tr: "Başkan ertelemeyi neden reddediyor?", options: ["Weil der Vertrag am Ersten in Kraft tritt", "Weil Herr Wolf dagegen ist", "Weil die Sitzung zu lang wird", "Weil die Zahlen fehlen"], answer: 0 },
        { de: "Worauf einigt sich die Runde?", tr: "Kurul ne üzerinde anlaşıyor?", options: ["Auf eine Vertagung", "Auf eine Entscheidung unter Vorbehalt", "Auf die dritte Option", "Auf gar nichts"], answer: 1 },
      ],
    },
    reading: {
      title: "Stellungnahme des Unternehmens",
      titleTr: "Şirket açıklaması",
      genre: "Basın açıklaması",
      text: "Stellungnahme zur Störung vom 14. März\n\nWir bedauern die Unterbrechung unseres Dienstes zutiefst. Nach derzeitigem Kenntnisstand handelt es sich um ein technisches Versäumnis in einem Teilsystem; personenbezogene Daten waren nach bisheriger Prüfung nicht betroffen.\n\nUnmittelbar nach Bekanntwerden wurden die erforderlichen Maßnahmen eingeleitet. Der betroffene Dienst steht seit dem Abend wieder zur Verfügung. Die Aufarbeitung des Vorfalls läuft; ein externes Prüfhaus wurde beauftragt.\n\nUnser Sprecher erklärte, man werde die Ergebnisse vollständig veröffentlichen. Kundinnen und Kunden, denen ein Schaden entstanden sei, könnten sich an die eingerichtete Hotline wenden.\n\nWir nehmen den Vorfall zum Anlass, unsere Prozesse zu überprüfen, und werden bis Monatsende erneut informieren.",
      questions: [
        { de: "Was sagt der Text über personenbezogene Daten?", tr: "Metin kişisel veriler hakkında ne diyor?", options: ["Sie wurden gestohlen", "Sie waren nach bisheriger Prüfung nicht betroffen", "Sie wurden gelöscht", "Dazu steht nichts"], answer: 1 },
        { de: "Warum steht im Text „Maßnahmen wurden eingeleitet“ statt „wir haben gehandelt“?", tr: "Metinde neden „wir haben gehandelt“ yerine „Maßnahmen wurden eingeleitet“ yazıyor?", options: ["Weil niemand gehandelt hat", "Weil die Handlung wichtiger ist als der Handelnde", "Weil es kürzer ist", "Weil es ein Fehler ist"], answer: 1 },
        { de: "Was zeigt die Form „man werde veröffentlichen“?", tr: "„man werde veröffentlichen“ biçimi neyi gösteriyor?", options: ["Eine Bedingung", "Eine wiedergegebene Aussage des Sprechers", "Einen Befehl", "Eine Vermutung des Lesers"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "Toplantıda bir seçeneği eliyorsun.", de: "Diese Option kommt für uns nicht in Frage — die Tragweite ist zu groß.", tr: "Bu seçenek bizim için söz konusu değil — kapsamı fazla büyük." },
      { situation: "İncelikle karşı çıkıyorsun.", de: "Bei allem Respekt, dem kann ich nicht zustimmen; ich hätte da einen Einwand.", tr: "Tüm saygımla, buna katılamıyorum; bir itirazım olacak." },
    ],
    writing: {
      prompt: "Bir öneriyi nazikçe reddeden resmî bir e-posta yaz.",
      stimulus: "Betreff: Ihr Vorschlag zur Umstellung des Ablaufs",
      checklist: [
        "Öneriye teşekkür et ve neyi doğru bulduğunu söyle",
        "İtirazını dilek kipiyle koy (Ich hätte da einen Einwand / Man könnte argumentieren …)",
        "En az iki işlev fiili öbeği kullan (in Frage kommen, in Betracht ziehen, zur Verfügung stehen …)",
        "Bir alternatif ya da koşul sun",
        "Kapıyı açık bırakan bir kapanış yaz",
      ],
      minWords: 110,
      phrases: [
        { de: "Ich hätte da einen Einwand.", tr: "Bir itirazım olacak.", en: "I would have one objection." },
        { de: "… kommt für uns derzeit nicht in Frage.", tr: "… şu an bizim için söz konusu değil", en: "… is currently out of the question for us." },
        { de: "Wir ziehen das durchaus in Betracht.", tr: "Bunu kesinlikle göz önüne alıyoruz.", en: "We are indeed considering it." },
        { de: "Bei allem Respekt, …", tr: "Tüm saygımla, …", en: "With all due respect, …" },
        { de: "Für Rückfragen stehe ich Ihnen gern zur Verfügung.", tr: "Sorularınız için memnuniyetle hizmetinizdeyim.", en: "I remain at your disposal for any questions." },
      ],
      sample:
        "Betreff: Ihr Vorschlag zur Umstellung des Ablaufs\n\nSehr geehrter Herr Wolf,\n\nvielen Dank für Ihren ausführlichen Vorschlag. Die Analyse der Engpässe halte ich für treffend, und den Grundgedanken, die Freigaben zu bündeln, ziehen wir durchaus in Betracht.\n\nBei allem Respekt hätte ich dennoch einen Einwand. Die vorgeschlagene Umstellung zum Ersten kommt für uns derzeit nicht in Frage, da die neuen Zahlen erst Mitte des Monats vorliegen. Man könnte argumentieren, dass ein früherer Start Zeit spart; aus meiner Sicht überwiegt jedoch die Tragweite eines Fehlstarts.\n\nIch würde daher anregen, die Umstellung um vier Wochen zu verschieben und in dieser Zeit einen Testlauf in einer Abteilung durchzuführen. Sofern die Ergebnisse überzeugen, setzen wir sie flächendeckend um.\n\nFür Rückfragen stehe ich Ihnen gern zur Verfügung.\n\nMit freundlichen Grüßen\nB. Şimşek",
    },
  },

  {
    level: "C1",
    index: 1,
    code: "C1.2",
    titleDe: "Modalpartikeln und Ton",
    titleTr: "Kip parçacıkları ve ton",
    focus: [
      { de: "doch, ja, mal", tr: "davet, şaşkınlık, yumuşatma" },
      { de: "eben, halt, schon", tr: "kabullenme ve teselli" },
      { de: "wohl", tr: "temkinli tahmin" },
      { de: "Untertreibung", tr: "Nicht schlecht! — ölçülü övgü" },
      { de: "Konjunktiv II am Telefon", tr: "Dürfte ich …? / Wären Sie so freundlich …?" },
    ],
    canDo: [
      { de: "Ich kann den Ton eines Satzes mit Partikeln steuern.", tr: "Bir cümlenin tonunu parçacıklarla ayarlayabiliyorum.", en: "I can steer the tone of a sentence with particles." },
      { de: "Ich kann auf eine negative Frage richtig antworten.", tr: "Olumsuz bir soruya doğru cevap verebiliyorum.", en: "I can answer a negative question correctly." },
      { de: "Ich kann Untertreibung erkennen und selbst einsetzen.", tr: "Ölçülü ifadeyi anlayabiliyor ve kendim kullanabiliyorum.", en: "I can recognise and use understatement." },
      { de: "Ich kann jemanden trösten, ohne Floskeln zu benutzen.", tr: "Klişeye kaçmadan birini teselli edebiliyorum.", en: "I can comfort someone without empty phrases." },
      { de: "Ich kann am Telefon besonders höflich formulieren.", tr: "Telefonda özellikle kibar cümleler kurabiliyorum.", en: "I can be especially polite on the phone." },
    ],
    listening: {
      title: "Der abgesagte Abend",
      titleTr: "İptal olan akşam",
      situation: "İki arkadaş iptal olan bir planı konuşuyor.",
      turns: [
        { speaker: "Deniz", de: "Sag mal, hast du es schon gehört? Der Abend fällt aus.", tr: "Söylesene, duydun mu? Akşamki iptal olmuş." },
        { speaker: "Mira", de: "Das ist ja ein Ding. Und ich hatte mir extra freigenommen.", tr: "Vay canına. Ben de özellikle izin almıştım." },
        { speaker: "Deniz", de: "Ärgerlich, ja. Aber die Halle ist gesperrt — da ist eben nichts zu machen.", tr: "Can sıkıcı, evet. Ama salon kapatılmış — yapılacak bir şey yok işte." },
        { speaker: "Mira", de: "Das hättest du mir doch früher sagen können. Ich stehe seit einer Stunde vor der Tür.", tr: "Bunu bana daha önce söyleyebilirdin. Bir saattir kapının önünde duruyorum." },
        { speaker: "Deniz", de: "Tut mir leid, ich habe es selbst wohl erst vor zwanzig Minuten erfahren.", tr: "Üzgünüm, ben de herhâlde ancak yirmi dakika önce öğrendim." },
        { speaker: "Mira", de: "Schon gut. Und jetzt? Willst du nicht wenigstens einen Kaffee trinken?", tr: "Tamam, boş ver. Peki şimdi? Hiç değilse bir kahve içmek istemez misin?" },
        { speaker: "Deniz", de: "Doch, sehr gern. Komm, das wird schon — der Abend ist ja noch nicht vorbei.", tr: "İsterim tabii. Hadi, olacak o kadar — akşam daha bitmedi ki." },
      ],
      questions: [
        { de: "Warum fällt der Abend aus?", tr: "Akşamki neden iptal oldu?", options: ["Wegen Krankheit", "Weil die Halle gesperrt ist", "Wegen zu weniger Gäste", "Wegen des Wetters"], answer: 1 },
        { de: "Was drückt Miras Satz „Das hättest du mir doch früher sagen können“ aus?", tr: "Mira'nın „Das hättest du mir doch früher sagen können“ cümlesi ne bildiriyor?", options: ["Eine Bitte", "Einen Vorwurf", "Ein Lob", "Eine Vermutung"], answer: 1 },
        { de: "Warum antwortet Deniz mit „Doch, sehr gern“?", tr: "Deniz neden „Doch, sehr gern“ diye cevap veriyor?", options: ["Weil die Frage verneint war", "Weil er ablehnt", "Weil er unsicher ist", "Weil er die Frage nicht verstanden hat"], answer: 0 },
      ],
    },
    reading: {
      title: "Nicht schlecht — ein Missverständnis",
      titleTr: "Fena değil — bir yanlış anlama",
      genre: "Deneme yazısı",
      text: "Nicht schlecht\n\nWer aus einem Land kommt, in dem Lob großzügig verteilt wird, erlebt in Deutschland eine kleine Enttäuschung: Man arbeitet wochenlang an etwas, legt es vor — und hört „Nicht schlecht“. Das klingt nach einer Drei minus. Gemeint ist aber, je nach Betonung, etwas zwischen „gut“ und „ausgezeichnet“.\n\nUmgekehrt gilt dasselbe. „Da ist noch Luft nach oben“ ist kein freundlicher Hinweis, sondern ein deutliches Urteil: So reicht es nicht. Und „Kann man machen“ liegt irgendwo dazwischen, meist näher an der Zustimmung.\n\nDie Regel dahinter ist einfach, wenn man sie einmal kennt: Kritik wird direkt geäußert, Lob sparsam. Wer das als Kälte liest, versteht es falsch — es ist eher eine Frage der Dosierung. Wer dagegen selbst zu dick aufträgt, wirkt schnell unglaubwürdig.\n\nEin Rat zum Schluss: Hört auf die Betonung, nicht nur auf die Wörter. Sie trägt in dieser Sprache mehr Bedeutung, als das Wörterbuch verrät.",
      questions: [
        { de: "Was bedeutet „Nicht schlecht“ laut Text?", tr: "Metne göre „Nicht schlecht“ ne anlama geliyor?", options: ["Mittelmäßig", "Etwas zwischen gut und ausgezeichnet", "Unbrauchbar", "Noch nicht bewertet"], answer: 1 },
        { de: "Wie ist „Da ist noch Luft nach oben“ zu verstehen?", tr: "„Da ist noch Luft nach oben“ nasıl anlaşılmalı?", options: ["Als freundlicher Hinweis", "Als deutliches Urteil: so reicht es nicht", "Als Lob", "Als Scherz"], answer: 1 },
        { de: "Was rät der Text am Ende?", tr: "Metin sonunda ne öneriyor?", options: ["Mehr zu loben", "Auf die Betonung zu hören", "Das Wörterbuch zu benutzen", "Kritik zu vermeiden"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "Olumsuz bir soruya olumlu cevap veriyorsun.", de: "Doch, ich komme sehr gern mit.", tr: "Aksine, memnuniyetle gelirim." },
      { situation: "Telefonda en kibar biçimde rica ediyorsun.", de: "Wären Sie so freundlich, mich mit Frau Berg durchzustellen?", tr: "Beni Bayan Berg'e bağlar mısınız lütfen?" },
    ],
    writing: {
      prompt: "Planı bozulan bir arkadaşına, tonu özenle ayarlanmış kişisel bir mesaj yaz.",
      checklist: [
        "Ne olduğunu kısaca yaz ve haberi geç verdiysen kabul et",
        "En az iki kip parçacığı kullan (doch, ja, mal, eben, wohl, schon)",
        "Sitemi ya da özrü abartmadan söyle",
        "Kabullenme tonunu bir cümlede ver",
        "Somut bir alternatif teklif et",
      ],
      minWords: 110,
      phrases: [
        { de: "Sag mal, hast du es schon gehört?", tr: "Söylesene, duydun mu?", en: "Say, have you heard already?" },
        { de: "Das hättest du mir doch früher sagen können.", tr: "Bunu bana daha önce söyleyebilirdin.", en: "You could have told me earlier." },
        { de: "Da ist eben nichts zu machen.", tr: "Yapılacak bir şey yok işte.", en: "There is simply nothing to be done." },
        { de: "Das wird schon.", tr: "Olacak o kadar, düzelir.", en: "It will be all right." },
        { de: "Komm doch einfach mal vorbei.", tr: "Bir uğrasana.", en: "Why don't you just drop by?" },
      ],
      sample:
        "Hallo Mira,\n\nsag mal, hast du es schon gehört? Der Abend fällt aus — die Halle ist kurzfristig gesperrt worden. Ich habe es selbst wohl erst vor zwanzig Minuten erfahren, sonst hätte ich mich früher gemeldet. Das hättest du von mir tatsächlich eher hören sollen, und das tut mir leid.\n\nÄrgerlich ist es allemal, vor allem, weil du dir extra freigenommen hast. Aber da ist eben nichts zu machen; gegen eine gesperrte Halle kommt keiner von uns an.\n\nJetzt der Vorschlag: Komm doch einfach mal zu mir, ich koche etwas, und wir schauen uns die Aufzeichnung vom letzten Mal an. Das wird schon — der Abend ist ja noch nicht vorbei.\n\nSag kurz Bescheid, ob es dir passt.\n\nLiebe Grüße\nDeniz",
    },
  },
];
