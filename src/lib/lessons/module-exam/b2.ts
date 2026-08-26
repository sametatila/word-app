import type { ModuleExamPlan } from "./types";

/**
 * B2 modül sınavlarının elle yazılan içeriği.
 *
 * B2'de metinlerin işi bir kez daha değişiyor. A1–A2'de metin bilgi
 * taşıyordu, B1'de bir duruş taşıyordu; B2'de bir KAYIT taşıyor — tutanak,
 * resmî yazışma, müzakere notu. Soru artık "ne demeye getiriyor" değil,
 * "bunu kim, hangi sıfatla, hangi bağlayıcılıkla söylüyor" diye soruyor:
 * bir tutanakta 'sei' ile yazılan cümle ile 'ist' ile yazılan cümle aynı şey
 * değildir ve B2'yi geçen birinin bu farkı görmesi gerekir.
 *
 * Yazma görevleri bu yüzden 90 kelimeden başlıyor: resmî bir yazının
 * gövdesi (atıf, olgu, talep, süre, kapanış) daha azına sığmıyor.
 */
export const B2_EXAMS: ModuleExamPlan[] = [
  {
    level: "B2",
    index: 0,
    code: "B2.1",
    titleDe: "Berufliche Kommunikation",
    titleTr: "Profesyonel iletişim",
    focus: [
      { de: "Nominalisierung", tr: "fiili isme çevirmek: nach der Prüfung" },
      { de: "Passiv Perfekt", tr: "ist … worden" },
      { de: "Konjunktiv II", tr: "öneri ve rica: Ich würde vorschlagen …" },
      { de: "indirekte Rede", tr: "tutanak dili: Er merkte an, … sei …" },
      { de: "Passiversatz und Genitivpräpositionen", tr: "lässt sich … / trotz des …" },
    ],
    canDo: [
      { de: "Ich kann eine Präsentation strukturiert eröffnen.", tr: "Bir sunumu planlı biçimde açabiliyorum.", en: "I can open a presentation in a structured way." },
      { de: "Ich kann Zahlen und Grafiken im Passiv beschreiben.", tr: "Sayıları ve grafikleri edilgen yapıyla anlatabiliyorum.", en: "I can describe figures and charts using the passive." },
      { de: "Ich kann eine Besprechung moderieren und Ergebnisse festhalten.", tr: "Bir toplantıyı yönetip kararları kayda geçirebiliyorum.", en: "I can moderate a meeting and record its results." },
      { de: "Ich kann Gesagtes in indirekter Rede protokollieren.", tr: "Söylenenleri dolaylı aktarımla tutanağa geçirebiliyorum.", en: "I can record what was said in reported speech." },
      { de: "Ich kann auf kritische Rückfragen souverän reagieren.", tr: "Zorlayıcı sorulara sakin ve düzenli cevap verebiliyorum.", en: "I can respond confidently to critical questions." },
    ],
    listening: {
      title: "Die Teambesprechung",
      titleTr: "Ekip toplantısı",
      situation: "Bir proje ekibi haftalık toplantıda gecikmeyi konuşuyor.",
      turns: [
        { speaker: "Moderatorin", de: "Ich würde vorschlagen, dass wir mit dem Zeitplan anfangen. Herr Adler, wie ist der Stand?", tr: "Zaman planıyla başlamayı öneririm. Bay Adler, durum nedir?" },
        { speaker: "Herr Adler", de: "Die Testphase ist letzte Woche abgeschlossen worden. Auffällig ist allerdings, dass die Rückmeldungen erst ab Mai gekommen sind.", tr: "Test aşaması geçen hafta tamamlandı. Ancak dikkat çeken şey, geri bildirimlerin ancak mayıstan itibaren gelmiş olması." },
        { speaker: "Frau Renner", de: "Darf ich kurz einhaken? Wenn ich Sie richtig verstehe, liegt die Verzögerung nicht bei der Technik, sondern bei den Rückmeldungen.", tr: "Kısaca araya girebilir miyim? Doğru anladıysam gecikme teknikte değil, geri bildirimlerde." },
        { speaker: "Herr Adler", de: "Genau. Aufgrund der späten Rückmeldungen mussten wir zwei Wochen nachjustieren.", tr: "Aynen. Geç gelen geri bildirimler yüzünden iki hafta düzeltme yapmak zorunda kaldık." },
        { speaker: "Moderatorin", de: "Könnten wir festhalten, dass der Abgabetermin um zwei Wochen verschoben wird — sofern nichts dazwischenkommt?", tr: "Teslim tarihinin iki hafta ertelendiğini kayda geçirebilir miyiz — bir aksilik çıkmazsa?" },
        { speaker: "Frau Renner", de: "Einverstanden. Ich merke aber an, dass der Kunde bis Freitag informiert werden muss.", tr: "Kabul. Ama müşterinin cumaya kadar bilgilendirilmesi gerektiğini belirtiyorum." },
        { speaker: "Moderatorin", de: "Gut. Fassen wir zusammen: neuer Termin, Kunde wird bis Freitag informiert. Damit sind wir durch.", tr: "Güzel. Toparlayalım: yeni tarih, müşteri cumaya kadar bilgilendirilecek. Böylece bitirdik." },
      ],
      questions: [
        { de: "Was ist letzte Woche abgeschlossen worden?", tr: "Geçen hafta ne tamamlandı?", options: ["Die Testphase", "Der Vertrag", "Die Schulung", "Die Abrechnung"], answer: 0 },
        { de: "Worin liegt laut Frau Renner die Ursache der Verzögerung?", tr: "Bayan Renner'a göre gecikmenin sebebi nerede?", options: ["In der Technik", "Im Budget", "In den späten Rückmeldungen", "Im Personalmangel"], answer: 2 },
        { de: "Was wird im Protokoll festgehalten?", tr: "Tutanağa ne geçiriliyor?", options: ["Der Kunde übernimmt die Tests", "Der Termin wird um zwei Wochen verschoben", "Das Projekt wird gestoppt", "Die Besprechung wird vertagt"], answer: 1 },
      ],
    },
    reading: {
      title: "Protokoll der Projektsitzung",
      titleTr: "Proje toplantısı tutanağı",
      genre: "Tutanak",
      text: "Protokoll der Projektsitzung vom 14. Mai, Beginn 9:30 Uhr\n\nTOP 1 — Stand der Testphase\nHerr Adler berichtete, die Testphase sei in der Vorwoche abgeschlossen worden. Auffällig sei der späte Eingang der Rückmeldungen; infolge dieser Verzögerung habe das Team zwei Wochen nachjustieren müssen.\n\nTOP 2 — Terminplanung\nEs wurde beschlossen, dass der Abgabetermin um zwei Wochen verschoben wird. Frau Renner merkte an, der Kunde sei bis Freitag zu informieren. Die Information erfolgt schriftlich durch die Projektleitung.\n\nTOP 3 — Offene Punkte\nDie Frage der Zuständigkeit für die Dokumentation ist zu klären. Sofern bis zur nächsten Sitzung keine Rückmeldung vorliegt, übernimmt die Projektleitung.\n\nNächste Sitzung: 28. Mai, 9:30 Uhr. Protokoll: L. Sander",
      questions: [
        { de: "Warum musste das Team nachjustieren?", tr: "Ekip neden düzeltme yapmak zorunda kaldı?", options: ["Weil der Kunde abgesagt hat", "Wegen der späten Rückmeldungen", "Weil die Technik ausgefallen ist", "Wegen eines Personalwechsels"], answer: 1 },
        { de: "Was passiert, wenn bis zur nächsten Sitzung niemand antwortet?", tr: "Bir sonraki toplantıya kadar kimse cevap vermezse ne olur?", options: ["Der Punkt entfällt", "Die Projektleitung übernimmt", "Die Sitzung wird verschoben", "Der Kunde entscheidet"], answer: 1 },
        { de: "Was zeigt die Form „sei“ im Protokoll an?", tr: "Tutanaktaki „sei“ biçimi neyi gösteriyor?", options: ["Eine Bedingung", "Einen Wunsch", "Eine wiedergegebene Aussage", "Eine Vermutung des Protokollanten"], answer: 2 },
      ],
    },
    speaking: [
      { situation: "Sunumunu açıyorsun ve amacını söylüyorsun.", de: "Ziel meines Vortrags ist es, Ihnen die Ergebnisse der Testphase vorzustellen.", tr: "Sunumumun amacı, test aşamasının sonuçlarını size tanıtmak." },
      { situation: "Toplantıda kararı kayda geçiriyorsun.", de: "Könnten wir festhalten, dass der Termin um zwei Wochen verschoben wird?", tr: "Tarihin iki hafta ertelendiğini kayda geçirebilir miyiz?" },
    ],
    writing: {
      prompt: "Bir proje toplantısının kısa tutanağını yaz.",
      checklist: [
        "Tarih ve gündem maddesini başa yaz",
        "En az bir kararı kişisiz edilgenle bildir (Es wurde beschlossen, dass …)",
        "En az bir kişinin söylediğini dolaylı aktarımla yaz (… merkte an, … sei …)",
        "Açık kalan bir noktayı ve sorumlusunu yaz",
        "Bir sonraki toplantının tarihini ekle",
      ],
      minWords: 90,
      phrases: [
        { de: "Es wurde beschlossen, dass …", tr: "…-mesine karar verildi", en: "It was decided that …" },
        { de: "Frau X merkte an, … sei …", tr: "Bayan X, …-in … olduğunu belirtti", en: "Ms X remarked that … was …" },
        { de: "Die Frage … ist noch zu klären.", tr: "… sorusunun netleşmesi gerekiyor", en: "The question of … still needs to be clarified." },
        { de: "infolge der Verzögerung", tr: "gecikme sonucunda", en: "as a result of the delay" },
        { de: "Nächste Sitzung: …", tr: "Bir sonraki toplantı: …", en: "Next meeting: …" },
      ],
      sample:
        "Protokoll der Teamsitzung vom 3. Juni, Beginn 10:00 Uhr\n\nTOP 1 — Stand der Arbeiten\nFrau Yilmaz berichtete, der erste Teil sei fristgerecht abgeschlossen worden. Infolge der späten Lieferung habe sich der zweite Teil jedoch um eine Woche verschoben.\n\nTOP 2 — Entscheidungen\nEs wurde beschlossen, dass der neue Abgabetermin der 20. Juni ist. Herr Brandt merkte an, die Kundschaft sei noch in dieser Woche zu informieren.\n\nTOP 3 — Offene Punkte\nDie Zuständigkeit für die Dokumentation ist noch zu klären. Sofern bis Freitag keine Rückmeldung vorliegt, übernimmt die Projektleitung.\n\nNächste Sitzung: 17. Juni, 10:00 Uhr.",
    },
  },

  {
    level: "B2",
    index: 1,
    code: "B2.2",
    titleDe: "Verhandeln und reklamieren",
    titleTr: "Müzakere ve şikâyet",
    focus: [
      { de: "Konjunktiv II", tr: "teklif ve rica: Wir könnten uns … vorstellen" },
      { de: "Nominalisierung", tr: "resmî yazı dili: Bezug nehmend auf …" },
      { de: "Passiversatz", tr: "lässt sich … / ist zu klären" },
      { de: "zweiteilige Konnektoren", tr: "zwar …, aber … / sowohl … als auch …" },
      { de: "Genitivpräpositionen", tr: "wegen des Schadens / infolge der Verspätung" },
    ],
    canDo: [
      { de: "Ich kann über Preise und Konditionen verhandeln.", tr: "Fiyat ve koşullar üzerine pazarlık edebiliyorum.", en: "I can negotiate prices and conditions." },
      { de: "Ich kann eine formelle Beschwerde schriftlich formulieren.", tr: "Resmî bir şikâyeti yazılı olarak kurabiliyorum.", en: "I can write a formal complaint." },
      { de: "Ich kann einen Anspruch begründen und beziffern.", tr: "Bir hak talebini gerekçelendirip rakamla belirtebiliyorum.", en: "I can justify and quantify a claim." },
      { de: "Ich kann in einem Konflikt deeskalierend sprechen.", tr: "Bir çatışmada gerilimi düşüren biçimde konuşabiliyorum.", en: "I can speak in a de-escalating way during a conflict." },
      { de: "Ich kann Kritik wertschätzend und konkret äußern.", tr: "Eleştiriyi takdir edici ve somut biçimde dile getirebiliyorum.", en: "I can give criticism appreciatively and concretely." },
    ],
    listening: {
      title: "Das Preisgespräch",
      titleTr: "Fiyat görüşmesi",
      situation: "Bir alıcı ile satış müdürü yıllık sözleşmeyi konuşuyor.",
      turns: [
        { speaker: "Vertrieb", de: "Unser Angebot liegt bei achtundvierzig Euro pro Einheit. Bei größeren Mengen ließe sich darüber reden.", tr: "Teklifimiz birim başına kırk sekiz euro. Büyük miktarlarda bunun üzerine konuşulabilir." },
        { speaker: "Einkauf", de: "Wir könnten uns vierzig vorstellen. Kämen Sie uns bei der Menge entgegen, wären wir bei zweitausend Stück.", tr: "Kırkı düşünebiliriz. Miktarda bize yaklaşırsanız iki bin adette oluruz." },
        { speaker: "Vertrieb", de: "Vierzig ist zwar unter unserer Grenze, aber bei zweitausend Stück wird es interessant. Sagen wir vierundvierzig?", tr: "Kırk bizim sınırımızın altında, ama iki bin adette iş ilginçleşiyor. Kırk dört diyelim mi?" },
        { speaker: "Einkauf", de: "Beim Preis gebe ich nicht ganz nach, aber beim Termin bin ich flexibel. Zweiundvierzig, dafür Lieferung erst im Oktober.", tr: "Fiyatta tam geri adım atmıyorum ama tarihte esneğim. Kırk iki, karşılığında teslimat ekimde." },
        { speaker: "Vertrieb", de: "Das ließe sich machen. Sowohl Ihre als auch unsere Seite hätte damit etwas gewonnen.", tr: "Bu yapılabilir. Hem sizin hem bizim taraf böylece bir şey kazanmış olur." },
        { speaker: "Einkauf", de: "Dann einigen wir uns auf zweiundvierzig. Ich bitte um eine schriftliche Bestätigung bis Freitag.", tr: "O hâlde kırk ikide anlaşalım. Cumaya kadar yazılı onay rica ediyorum." },
        { speaker: "Vertrieb", de: "Geht raus. Und infolge der späteren Lieferung passen wir auch die Zahlungsfrist an.", tr: "Gönderilecek. Ayrıca geç teslimat sebebiyle ödeme süresini de uyarlıyoruz." },
      ],
      questions: [
        { de: "Welchen Preis nennt der Einkauf zuerst?", tr: "Satın alma önce hangi fiyatı söylüyor?", options: ["Vierundvierzig Euro", "Achtundvierzig Euro", "Vierzig Euro", "Zweiundvierzig Euro"], answer: 2 },
        { de: "Was gibt der Einkauf im Gegenzug nach?", tr: "Satın alma karşılığında neden vazgeçiyor?", options: ["Bei der Menge", "Beim Liefertermin", "Bei der Qualität", "Bei der Zahlungsart"], answer: 1 },
        { de: "Worauf einigen sich beide Seiten?", tr: "İki taraf ne üzerinde anlaşıyor?", options: ["Auf vierzig Euro", "Auf achtundvierzig Euro", "Auf zweiundvierzig Euro", "Auf keinen Preis"], answer: 2 },
      ],
    },
    reading: {
      title: "Beschwerde und Fristsetzung",
      titleTr: "Şikâyet ve süre tanıma",
      genre: "Resmî mektup",
      text: "Sehr geehrte Damen und Herren,\n\nBezug nehmend auf meine Reklamation vom 8. März sowie auf Ihr Schreiben vom 21. März wende ich mich erneut an Sie.\n\nDas gelieferte Gerät ist inzwischen zum dritten Mal repariert worden. Die letzte Nachbesserung ist am 2. April versucht worden; bereits nach vier Tagen trat derselbe Defekt erneut auf. Das Gerät ist damit für den vorgesehenen Zweck unbrauchbar.\n\nInfolge der wiederholten Ausfälle sind mir zusätzliche Kosten in Höhe von 180 Euro entstanden. Ich sehe mich daher gezwungen, von einer weiteren Nachbesserung abzusehen, und bestehe auf einem Austausch des Geräts. Zugleich mache ich einen Anspruch auf Erstattung der genannten Kosten geltend.\n\nIch bitte Sie um eine Stellungnahme bis zum 30. April. Sofern bis dahin keine Rückmeldung vorliegt, werde ich den Rechtsweg prüfen lassen.\n\nMit freundlichen Grüßen\nD. Kırmızı",
      questions: [
        { de: "Wie oft ist das Gerät bereits repariert worden?", tr: "Cihaz şimdiye kadar kaç kez tamir edildi?", options: ["Einmal", "Zweimal", "Dreimal", "Viermal"], answer: 2 },
        { de: "Was fordert der Absender?", tr: "Yazıyı gönderen ne talep ediyor?", options: ["Eine weitere Reparatur", "Einen Austausch und die Erstattung der Kosten", "Eine Preisminderung von zehn Prozent", "Eine Entschuldigung"], answer: 1 },
        { de: "Was kündigt der Absender für den Fall an, dass keine Antwort kommt?", tr: "Cevap gelmezse gönderen ne yapacağını bildiriyor?", options: ["Er wird den Vertrag verlängern", "Er wird den Rechtsweg prüfen lassen", "Er wird das Gerät behalten", "Er wird erneut anrufen"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "Pazarlıkta karşı taraftan jest istiyorsun.", de: "Kämen Sie uns beim Preis entgegen, könnten wir die Menge erhöhen.", tr: "Fiyatta bize yaklaşırsanız miktarı artırabiliriz." },
      { situation: "Öfkeli bir müşteriyi yatıştırıyorsun.", de: "Ich kann Ihren Ärger gut nachvollziehen — wäre es hilfreich, wenn wir Ihnen ein Ersatzgerät stellen?", tr: "Öfkenizi çok iyi anlıyorum — size yedek bir cihaz versek yardımcı olur mu?" },
    ],
    writing: {
      prompt: "Üçüncü kez bozulan bir cihaz için resmî bir şikâyet mektubu yaz.",
      stimulus: "Sehr geehrte Damen und Herren, wir bedauern die Unannehmlichkeiten und bieten Ihnen eine weitere Reparatur an.",
      checklist: [
        "Önceki yazışmaya atıfla başla (Bezug nehmend auf …)",
        "Şimdiye kadar ne yapıldığını edilgen geçmişle say",
        "Zararı ya da masrafı rakamla belirt",
        "Somut talebini yaz (değişim, iade, tazminat)",
        "Bir süre tanı ve süre dolarsa ne yapacağını bildir",
      ],
      minWords: 90,
      phrases: [
        { de: "Bezug nehmend auf Ihr Schreiben vom …", tr: "… tarihli yazınıza atıfla", en: "With reference to your letter of …" },
        { de: "Das Gerät ist bereits … repariert worden.", tr: "Cihaz şimdiden … kez tamir edildi", en: "The device has already been repaired … times." },
        { de: "Ich sehe mich gezwungen, … zu …", tr: "…-mek zorunda kalıyorum", en: "I find myself compelled to …" },
        { de: "Ich bestehe auf …", tr: "… konusunda ısrar ediyorum", en: "I insist on …" },
        { de: "Ich bitte um eine Stellungnahme bis zum …", tr: "…-e kadar görüş bildirmenizi rica ediyorum", en: "I request a response by …" },
      ],
      sample:
        "Sehr geehrte Damen und Herren,\n\nBezug nehmend auf Ihr Schreiben vom 21. März wende ich mich erneut an Sie. Das Gerät ist inzwischen dreimal repariert worden, zuletzt am 2. April. Bereits nach wenigen Tagen trat derselbe Defekt erneut auf; das Gerät ist damit unbrauchbar.\n\nInfolge der wiederholten Ausfälle sind mir zusätzliche Kosten in Höhe von 180 Euro entstanden. Ich sehe mich daher gezwungen, eine weitere Nachbesserung abzulehnen, und bestehe auf einem Austausch des Geräts sowie auf der Erstattung dieser Kosten.\n\nIch bitte um eine Stellungnahme bis zum 30. April. Sofern bis dahin keine Rückmeldung vorliegt, werde ich rechtliche Schritte prüfen lassen.\n\nMit freundlichen Grüßen\nD. Kırmızı",
    },
  },
  {
    level: "B2",
    index: 2,
    code: "B2.3",
    titleDe: "Passiv in allen Formen",
    titleTr: "Edilgenin bütün hâlleri",
    focus: [
      { de: "Passiv Perfekt", tr: "ist … worden" },
      { de: "Passiv mit Modalverb", tr: "muss … geprüft werden" },
      { de: "Zustandspassiv", tr: "ist geöffnet — süreç mi, durum mu" },
      { de: "Passiversatz", tr: "lässt sich … / ist zu … / -bar" },
      { de: "Passiv Präteritum", tr: "rapor dili: wurde gerufen" },
    ],
    canDo: [
      { de: "Ich kann erledigte Arbeiten im Passiv Perfekt melden.", tr: "Biten işleri edilgen geçmişle bildirebiliyorum.", en: "I can report completed work in the passive perfect." },
      { de: "Ich kann Vorschriften und Pflichten unpersönlich ausdrücken.", tr: "Kural ve zorunlulukları kişisiz ifade edebiliyorum.", en: "I can express rules and obligations impersonally." },
      { de: "Ich kann Vorgang und Zustand voneinander unterscheiden.", tr: "Süreç ile durumu birbirinden ayırabiliyorum.", en: "I can distinguish a process from a state." },
      { de: "Ich kann einen Herstellungsprozess Schritt für Schritt beschreiben.", tr: "Bir üretim sürecini adım adım anlatabiliyorum.", en: "I can describe a production process step by step." },
      { de: "Ich kann einen Vorfall sachlich und chronologisch schildern.", tr: "Bir olayı nesnel ve sırayla anlatabiliyorum.", en: "I can report an incident objectively and chronologically." },
    ],
    listening: {
      title: "In der Werkstatt",
      titleTr: "Serviste",
      situation: "Bir müşteri servis ustasıyla aracın bakımını konuşuyor.",
      turns: [
        { speaker: "Meister", de: "Ich war unter dem Wagen. Die Bremsen sind zu erneuern, das lässt sich nicht mehr aufschieben.", tr: "Aracın altına baktım. Frenlerin yenilenmesi gerekiyor, bu artık ertelenemez." },
        { speaker: "Kundin", de: "Und der Rest? Lässt sich das Fahrzeug noch fahren, bis ich Urlaub habe?", tr: "Peki gerisi? İzne çıkana kadar araç hâlâ sürülebilir mi?" },
        { speaker: "Meister", de: "Fahren ja, aber der Verschleiß ist deutlich sichtbar. Die Inspektion ist ohnehin fällig.", tr: "Sürülür, ama aşınma açıkça görünüyor. Zaten bakımın vadesi gelmiş." },
        { speaker: "Kundin", de: "Ist der Ölwechsel eigentlich schon gemacht worden?", tr: "Yağ değişimi yapıldı mı acaba?" },
        { speaker: "Meister", de: "Ja, der ist im Frühjahr gemacht worden. Das Öl muss also nicht gewechselt werden.", tr: "Evet, ilkbaharda yapıldı. Yani yağın değiştirilmesi gerekmiyor." },
        { speaker: "Kundin", de: "Gut. Dann bitte nur die Bremsen. Wann kann der Termin vereinbart werden?", tr: "Güzel. O hâlde sadece frenler lütfen. Randevu ne zaman ayarlanabilir?" },
        { speaker: "Meister", de: "Donnerstag. Der Wagen wird morgens gebracht und ist abends fertig.", tr: "Perşembe. Araç sabah getirilir, akşam hazır olur." },
      ],
      questions: [
        { de: "Was ist laut Meister dringend?", tr: "Ustaya göre acil olan ne?", options: ["Der Ölwechsel", "Die Bremsen", "Die Reifen", "Die Beleuchtung"], answer: 1 },
        { de: "Warum muss das Öl nicht gewechselt werden?", tr: "Yağ neden değiştirilmek zorunda değil?", options: ["Weil es zu teuer ist", "Weil es im Frühjahr gemacht worden ist", "Weil der Wagen neu ist", "Weil die Kundin es selbst macht"], answer: 1 },
        { de: "Was wird für Donnerstag vereinbart?", tr: "Perşembe için ne kararlaştırılıyor?", options: ["Nur eine Besichtigung", "Die Inspektion und der Ölwechsel", "Die Erneuerung der Bremsen", "Ein neues Fahrzeug"], answer: 2 },
      ],
    },
    reading: {
      title: "Information zur Baustelle",
      titleTr: "Şantiye duyurusu",
      genre: "Duyuru",
      text: "Information für Anwohnerinnen und Anwohner\n\nIn der Gartenstraße wird ab dem 6. Mai die Fahrbahn erneuert. Die Arbeiten werden in drei Abschnitten durchgeführt; der erste Abschnitt ist bereits im April vorbereitet worden.\n\nWährend der Bauzeit ist die Straße für den Durchgangsverkehr gesperrt. Die Zufahrt zu den Grundstücken bleibt geöffnet. Anlieferungen sind vorher im Baubüro anzumelden.\n\nDie Container dürfen nicht auf den Gehweg gestellt werden. Abfälle können am Sammelpunkt an der Ecke abgegeben werden; dieser ist täglich von 7 bis 18 Uhr geöffnet.\n\nDie Arbeiten sollen bis Ende Juli abgeschlossen werden. Sofern das Wetter mitspielt, lässt sich der Zeitplan halten. Rückfragen sind an das Baubüro zu richten.",
      questions: [
        { de: "Was ist bereits im April geschehen?", tr: "Nisanda ne yapıldı?", options: ["Die Fahrbahn ist erneuert worden", "Der erste Abschnitt ist vorbereitet worden", "Die Straße ist gesperrt worden", "Der Sammelpunkt ist eröffnet worden"], answer: 1 },
        { de: "Was muss vorher angemeldet werden?", tr: "Önceden neyin bildirilmesi gerekiyor?", options: ["Anlieferungen", "Besuche", "Reparaturen am Haus", "Der Umzug"], answer: 0 },
        { de: "Was sagt der Satz „Die Zufahrt bleibt geöffnet“ aus?", tr: "„Die Zufahrt bleibt geöffnet“ cümlesi ne bildiriyor?", options: ["Einen Vorgang: die Zufahrt wird geöffnet", "Einen Zustand: die Zufahrt ist offen", "Ein Verbot", "Eine Bitte an die Anwohner"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "Serviste yapılması gerekeni bildiriyorsun.", de: "Die Bremsen sind zu erneuern, der Rest lässt sich noch fahren.", tr: "Frenlerin yenilenmesi gerekiyor, gerisi hâlâ sürülebilir." },
      { situation: "Bir işin tamamlandığını bildiriyorsun.", de: "Der Auftrag ist gestern bearbeitet worden, alles Weitere ist erledigt.", tr: "İş emri dün işleme alındı, gerisi halledildi." },
    ],
    writing: {
      prompt: "Bir sürecin nasıl işlediğini anlatan kısa bir bilgi metni yaz (üretim, bakım ya da organizasyon).",
      checklist: [
        "Süreci adım adım, sıra belirteçleriyle anlat (zuerst, anschließend, zum Schluss)",
        "Adımları edilgenle kur (wird … / werden …)",
        "En az bir zorunluluğu kipli edilgenle yaz (muss … werden)",
        "En az bir yerde edilgen yerine geçen bir yapı kullan (lässt sich … / ist zu …)",
        "Sürecin ne zaman bittiğini ya da sonucun ne olduğunu yaz",
      ],
      minWords: 90,
      phrases: [
        { de: "Zuerst wird … / Anschließend werden …", tr: "Önce … / Ardından …", en: "First … is / Then … are" },
        { de: "Das muss … werden.", tr: "Bunun …-mesi gerekiyor", en: "That has to be …" },
        { de: "Das lässt sich in … Schritten erledigen.", tr: "Bu … adımda halledilebilir", en: "That can be done in … steps." },
        { de: "… ist bereits … worden.", tr: "… şimdiden … edildi", en: "… has already been …" },
        { de: "Zum Schluss wird …", tr: "En son …", en: "Finally, … is …" },
      ],
      sample:
        "So entsteht unser Brot\n\nZuerst wird das Getreide geliefert und im Lager geprüft. Anschließend wird es gemahlen; das Mehl muss dabei mehrfach gesiebt werden. Danach wird der Teig angesetzt und mindestens zwölf Stunden ruhen gelassen.\n\nDie Temperatur ist genau einzuhalten, sonst geht der Teig nicht richtig auf. Kleinere Abweichungen lassen sich später kaum ausgleichen. Am Morgen werden die Laibe geformt und in den Ofen geschoben.\n\nZum Schluss wird das Brot abgekühlt und verpackt. Die Kisten sind dabei sorgfältig zu beschriften, damit in der Auslieferung nichts vertauscht wird. Die erste Lieferung ist bis sechs Uhr fertig; alles Weitere wird im Laufe des Vormittags ausgeliefert.",
    },
  },

  {
    level: "B2",
    index: 3,
    code: "B2.4",
    titleDe: "Medien und indirekte Rede",
    titleTr: "Medya ve aktarılan söz",
    focus: [
      { de: "indirekte Rede", tr: "Er sagte, er komme später" },
      { de: "subjektive Modalverben", tr: "soll / will / dürfte — kaynak ve tahmin" },
      { de: "Nominalisierung", tr: "manşet dili: Anstieg der Preise" },
      { de: "Partizipialattribute", tr: "die im Film gezeigten Bilder" },
      { de: "zweiteilige Konnektoren", tr: "zwar …, jedoch … / einerseits … andererseits" },
    ],
    canDo: [
      { de: "Ich kann wiedergeben, was jemand gesagt hat, ohne es zu bewerten.", tr: "Birinin söylediğini değerlendirmeden aktarabiliyorum.", en: "I can report what someone said without judging it." },
      { de: "Ich kann Gehörtes, Gewusstes und Vermutetes sprachlich trennen.", tr: "Duyduğumu, bildiğimi ve tahmin ettiğimi dilde ayırabiliyorum.", en: "I can linguistically separate hearsay, knowledge and assumption." },
      { de: "Ich kann eine Schlagzeile entschlüsseln und einordnen.", tr: "Bir manşeti çözebiliyor ve yerine oturtabiliyorum.", en: "I can decode a headline and put it in context." },
      { de: "Ich kann auf einen Zeitungsbeitrag argumentierend antworten.", tr: "Bir gazete yazısına gerekçeli karşılık verebiliyorum.", en: "I can respond to a newspaper article with arguments." },
      { de: "Ich kann eine Behauptung hinterfragen und widerlegen.", tr: "Bir iddiayı sorgulayıp çürütebiliyorum.", en: "I can question and refute a claim." },
    ],
    listening: {
      title: "Die Nachricht am Morgen",
      titleTr: "Sabah haberi",
      situation: "İki meslektaş sabah kahvesinde bir haberi konuşuyor.",
      turns: [
        { speaker: "Tarek", de: "Hast du es gehört? Die Halle soll geschlossen werden. Steht überall.", tr: "Duydun mu? Salon kapatılacakmış. Her yerde yazıyor." },
        { speaker: "Nina", de: "Moment — soll oder wird? Das ist ein Unterschied. Wer behauptet das?", tr: "Dur bakalım — 'kapatılacakmış' mı, 'kapatılacak' mı? Bu fark eder. Bunu kim iddia ediyor?" },
        { speaker: "Tarek", de: "Laut Lokalzeitung. Der Sprecher sagte, die Entscheidung sei noch nicht gefallen.", tr: "Yerel gazeteye göre. Sözcü kararın henüz verilmediğini söyledi." },
        { speaker: "Nina", de: "Also ist noch nichts entschieden. Und der Anstieg der Kosten, von dem alle reden?", tr: "Yani henüz bir şey kararlaşmamış. Peki herkesin konuştuğu maliyet artışı?" },
        { speaker: "Tarek", de: "Angeblich dreißig Prozent. Ein Mitarbeiter will Zahlen gesehen haben, bestätigt ist das aber nicht.", tr: "İddiaya göre yüzde otuz. Bir çalışan rakamları gördüğünü iddia ediyor, ama bu doğrulanmış değil." },
        { speaker: "Nina", de: "Dann warten wir. Es dürfte klar sein, dass die Stadt vorher informiert.", tr: "O hâlde bekleriz. Belediyenin önceden bilgilendireceği açık olsa gerek." },
        { speaker: "Tarek", de: "Einverstanden. Zwar klingt es dramatisch, jedoch ist die Quelle dünn.", tr: "Kabul. Gerçi kulağa dramatik geliyor, ancak kaynak zayıf." },
      ],
      questions: [
        { de: "Was sagte der Sprecher laut Zeitung?", tr: "Gazeteye göre sözcü ne söyledi?", options: ["Die Halle wird geschlossen", "Die Entscheidung sei noch nicht gefallen", "Die Kosten seien gesunken", "Es gebe keine Halle mehr"], answer: 1 },
        { de: "Wie ist die Zahl „dreißig Prozent“ belegt?", tr: "„Yüzde otuz“ rakamı ne kadar sağlam?", options: ["Sie ist amtlich bestätigt", "Sie ist unbestätigt", "Sie stammt von der Stadt", "Sie steht im Vertrag"], answer: 1 },
        { de: "Wozu entschließen sich die beiden?", tr: "İkisi ne yapmaya karar veriyor?", options: ["Sie schreiben einen Leserbrief", "Sie warten auf gesicherte Informationen", "Sie rufen die Zeitung an", "Sie kündigen"], answer: 1 },
      ],
    },
    reading: {
      title: "Leserbrief und Richtigstellung",
      titleTr: "Okur mektubu ve düzeltme",
      genre: "Okur mektubu",
      text: "Zu Ihrem Beitrag „Anstieg der Mieten um dreißig Prozent“ vom 4. Juni\n\nSehr geehrte Redaktion,\n\nich habe Ihren Beitrag mit Interesse gelesen. Zwar teile ich Ihre Sorge, jedoch halte ich die Zahl für irreführend.\n\nIn dem Artikel wurde behauptet, die Mieten seien im gesamten Stadtgebiet um dreißig Prozent gestiegen. Tatsächlich aber betrifft dieser Wert nur Neuvermietungen in zwei Vierteln; im Bestand liegt der Anstieg bei knapp fünf Prozent. Die von Ihnen zitierte Studie sagt das auch so — die im Text genannte Zahl ist der Höchstwert, nicht der Durchschnitt.\n\nEinerseits ist es wichtig, auf die Lage hinzuweisen, andererseits schadet eine zugespitzte Schlagzeile der Debatte: Wer die Zahl nachprüft, verliert das Vertrauen in den Rest.\n\nAbschließend möchte ich vorschlagen, künftig Durchschnitt und Höchstwert getrennt auszuweisen.\n\nMit freundlichen Grüßen\nM. Erdem",
      questions: [
        { de: "Was kritisiert der Leserbrief?", tr: "Okur mektubu neyi eleştiriyor?", options: ["Dass das Thema unwichtig sei", "Dass ein Höchstwert als Durchschnitt dargestellt wurde", "Dass die Studie erfunden sei", "Dass die Redaktion zu spät berichtet habe"], answer: 1 },
        { de: "Wie hoch ist der Anstieg im Bestand?", tr: "Mevcut kiralarda artış ne kadar?", options: ["Dreißig Prozent", "Zwanzig Prozent", "Knapp fünf Prozent", "Gar nicht gestiegen"], answer: 2 },
        { de: "Was schlägt der Absender vor?", tr: "Gönderen ne öneriyor?", options: ["Keine Zahlen mehr zu nennen", "Durchschnitt und Höchstwert getrennt auszuweisen", "Die Studie zurückzuziehen", "Nur noch Neuvermietungen zu betrachten"], answer: 1 },
      ],
    },
    speaking: [
      { situation: "Duyduğun bir haberi aktarıyorsun.", de: "Der Sprecher sagte, die Entscheidung sei noch nicht gefallen.", tr: "Sözcü kararın henüz verilmediğini söyledi." },
      { situation: "Bir iddiayı gerçeğiyle karşılaştırıyorsun.", de: "Es wurde behauptet, die Zahl sei doppelt so hoch — tatsächlich aber gilt das Gegenteil.", tr: "Rakamın iki katı olduğu iddia edildi — ama gerçekte tam tersi geçerli." },
    ],
    writing: {
      prompt: "Bir gazete yazısına okur mektubu yaz.",
      stimulus: "Anstieg der Mieten um dreißig Prozent — die Stadt schaut zu",
      checklist: [
        "Hangi yazıya karşılık verdiğini baştan yaz",
        "Katıldığın noktayı önce söyle (Zwar …)",
        "İtirazını gerekçelendir (…, jedoch …)",
        "Bir iddiayı aktarım kipiyle ver (Es wurde behauptet, … sei …)",
        "Son olarak somut bir öneri bırak",
      ],
      minWords: 90,
      phrases: [
        { de: "Ich habe Ihren Beitrag mit Interesse gelesen.", tr: "Yazınızı ilgiyle okudum.", en: "I read your article with interest." },
        { de: "Zwar …, jedoch …", tr: "Gerçi …, ancak …", en: "Admittedly …, however …" },
        { de: "Es wurde behauptet, … sei …", tr: "…-in … olduğu iddia edildi", en: "It was claimed that … was …" },
        { de: "Tatsächlich aber …", tr: "Ama gerçekte …", en: "In fact, however, …" },
        { de: "Abschließend möchte ich vorschlagen, … zu …", tr: "Son olarak …-mesini önermek isterim", en: "In closing I would like to suggest …" },
      ],
      sample:
        "Zu Ihrem Beitrag „Anstieg der Mieten um dreißig Prozent“\n\nSehr geehrte Redaktion,\n\nich habe Ihren Beitrag mit Interesse gelesen. Zwar teile ich die Sorge um bezahlbaren Wohnraum, jedoch halte ich die genannte Zahl für irreführend.\n\nIn dem Artikel wurde behauptet, die Mieten seien überall um dreißig Prozent gestiegen. Tatsächlich aber gilt dieser Wert nur für Neuvermietungen in wenigen Vierteln. Wer die Zahl nachprüft, findet im Bestand einen deutlich niedrigeren Anstieg.\n\nEinerseits ist die Aufmerksamkeit wichtig, andererseits schadet eine zugespitzte Schlagzeile der Debatte. Abschließend möchte ich vorschlagen, künftig Durchschnitt und Höchstwert getrennt auszuweisen.\n\nMit freundlichen Grüßen\nM. Erdem",
    },
  },
  {
    level: "B2",
    index: 4,
    code: "B2.5",
    titleDe: "Wissenschaft und Technik",
    titleTr: "Bilim ve teknoloji",
    focus: [
      { de: "Partizip I als Attribut", tr: "die steigenden Preise" },
      { de: "Partizip II als Attribut", tr: "das entwickelte Verfahren" },
      { de: "Nebensatz mit indem", tr: "yöntem: …, indem man …" },
      { de: "Passiv mit Modalverb", tr: "dürfen nicht … werden" },
      { de: "subjektive Modalverben", tr: "dürfte / soll — tahmin ve duyum" },
    ],
    canDo: [
      { de: "Ich kann Vorgänge mit Partizipien knapp beschreiben.", tr: "Süreçleri ortaç sıfatlarıyla kısaca tarif edebiliyorum.", en: "I can describe processes concisely using participles." },
      { de: "Ich kann erklären, wie etwas gemacht wird.", tr: "Bir şeyin nasıl yapıldığını açıklayabiliyorum.", en: "I can explain how something is done." },
      { de: "Ich kann die Ergebnisse einer Studie wiedergeben.", tr: "Bir araştırmanın sonuçlarını aktarabiliyorum.", en: "I can report the results of a study." },
      { de: "Ich kann meine Rechte beim Datenschutz einfordern.", tr: "Veri koruma haklarımı talep edebiliyorum.", en: "I can assert my data protection rights." },
      { de: "Ich kann Vermutungen über die Zukunft abgestuft äußern.", tr: "Gelecek hakkındaki tahminlerimi derecelendirerek söyleyebiliyorum.", en: "I can express predictions about the future with nuance." },
    ],
    listening: {
      title: "Das neue Verfahren",
      titleTr: "Yeni yöntem",
      situation: "Bir gazeteci bir araştırmacıyla yeni geliştirilen bir yöntemi konuşuyor.",
      turns: [
        { speaker: "Journalistin", de: "Frau Dr. Weiß, das neu entwickelte Verfahren soll bahnbrechend sein. Was ist daran anders?", tr: "Dr. Weiß, yeni geliştirilen yöntem çığır açıcıymış. Farkı ne?" },
        { speaker: "Dr. Weiß", de: "Man spart Energie, indem man den Stoff bei niedriger Temperatur verarbeitet. Das klingt einfach, ist aber lange nicht gelungen.", tr: "Maddeyi düşük sıcaklıkta işleyerek enerji tasarrufu sağlanıyor. Kulağa basit geliyor ama uzun süre başarılamadı." },
        { speaker: "Journalistin", de: "Und ist das schon erprobt worden?", tr: "Peki bu denendi mi?" },
        { speaker: "Dr. Weiß", de: "Im Labor ja, über zwei Jahre. Die getestete Methode funktioniert dort zuverlässig. Im großen Maßstab ist sie noch nicht erprobt worden.", tr: "Laboratuvarda evet, iki yıl boyunca. Test edilen yöntem orada güvenilir çalışıyor. Büyük ölçekte henüz denenmedi." },
        { speaker: "Journalistin", de: "Wann dürfte die Serienreife erreicht werden?", tr: "Seri üretime hazırlık ne zaman sağlanır?" },
        { speaker: "Dr. Weiß", de: "Das bleibt abzuwarten. Ich wäre da eher vorsichtig — drei bis fünf Jahre dürften realistisch sein.", tr: "Bu görülecek. Ben burada daha temkinli olurdum — üç ila beş yıl gerçekçi olsa gerek." },
        { speaker: "Journalistin", de: "Die steigenden Energiekosten sprechen ja für Sie.", tr: "Artan enerji maliyetleri sizin lehinize." },
        { speaker: "Dr. Weiß", de: "Genau. Und die laufenden Kosten sinken deutlich, sobald die Anlage einmal steht.", tr: "Aynen. Tesis bir kez kurulduğunda süregelen maliyetler de belirgin biçimde düşüyor." },
      ],
      questions: [
        { de: "Wodurch wird Energie gespart?", tr: "Enerji nasıl tasarruf ediliyor?", options: ["Durch kürzere Arbeitszeiten", "Durch die Verarbeitung bei niedriger Temperatur", "Durch weniger Personal", "Durch neue Maschinen"], answer: 1 },
        { de: "Wo ist die Methode noch nicht erprobt worden?", tr: "Yöntem nerede henüz denenmedi?", options: ["Im Labor", "In der Theorie", "Im großen Maßstab", "In der Universität"], answer: 2 },
        { de: "Wie sicher ist Dr. Weiß bei der Serienreife?", tr: "Dr. Weiß seri üretim konusunda ne kadar emin?", options: ["Ganz sicher: nächstes Jahr", "Eher vorsichtig: drei bis fünf Jahre", "Sie schließt es aus", "Sie nennt keinen Zeitraum"], answer: 1 },
      ],
    },
    reading: {
      title: "Zusammenfassung einer Studie",
      titleTr: "Araştırma özeti",
      genre: "Bilgi metni",
      text: "Schlaf und Konzentration — Ergebnisse einer Untersuchung\n\nDie im vergangenen Jahr durchgeführte Untersuchung ging der Frage nach, wie sich Schlafdauer auf die Konzentration auswirkt. Befragt wurden 480 Personen zwischen 20 und 60 Jahren; ausgewertet wurden die Angaben von 412 Teilnehmenden.\n\nIm Durchschnitt schliefen die Befragten sechs Stunden und zwanzig Minuten. Die Auswertung zeigt einen deutlichen Zusammenhang: Je länger die Teilnehmenden schliefen, desto besser fielen die Tests am Vormittag aus. Auffällig ist, dass der Effekt bei Personen über fünfzig geringer ausfiel.\n\nDie Autorinnen weisen jedoch auf eine Einschränkung hin: Die Schlafdauer wurde nicht gemessen, sondern von den Teilnehmenden selbst angegeben. Die Ergebnisse sind daher mit Vorsicht zu lesen. Eine Wiederholung mit gemessenen Daten ist geplant; sie dürfte im nächsten Jahr beginnen.",
      questions: [
        { de: "Wie viele Angaben wurden ausgewertet?", tr: "Kaç kişinin verisi değerlendirildi?", options: ["480", "412", "60", "20"], answer: 1 },
        { de: "Was ist die genannte Einschränkung der Studie?", tr: "Araştırmanın belirtilen sınırlılığı ne?", options: ["Zu wenige Teilnehmende", "Die Schlafdauer wurde nur selbst angegeben", "Die Tests waren zu leicht", "Die Studie dauerte zu kurz"], answer: 1 },
        { de: "Was sagt der Satz „Je länger …, desto besser …“ aus?", tr: "„Je länger …, desto besser …“ cümlesi ne söylüyor?", options: ["Zwei Dinge ändern sich gemeinsam", "Eine Sache ist verboten", "Etwas wird bezweifelt", "Etwas ist unmöglich"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Bir yöntemin nasıl işlediğini açıklıyorsun.", de: "Man spart Energie, indem man den Stoff bei niedriger Temperatur verarbeitet.", tr: "Maddeyi düşük sıcaklıkta işleyerek enerji tasarrufu sağlanıyor." },
      { situation: "Veri hakkını savunuyorsun.", de: "Personenbezogene Daten dürfen ohne meine Einwilligung nicht weitergegeben werden.", tr: "Kişisel veriler benim rızam olmadan üçüncü taraflara verilemez." },
    ],
    writing: {
      prompt: "Okuduğun bir araştırmayı ya da bildiğin bir yöntemi kısaca anlatan bir bilgi metni yaz.",
      checklist: [
        "Konuyu ve neyin incelendiğini baştan yaz",
        "En az bir ortaç sıfatı kullan (die getestete Methode / die steigenden Kosten)",
        "Nasıl yapıldığını yöntem bağlacıyla anlat (…, indem man …)",
        "Bir bulguyu ya da orantıyı yaz (Je …, desto …)",
        "Bir sınırlılık ya da temkinli tahmin ekle (dürfte / bleibt abzuwarten)",
      ],
      minWords: 90,
      phrases: [
        { de: "Die Untersuchung zeigt, dass …", tr: "Araştırma …-i gösteriyor", en: "The study shows that …" },
        { de: "Man erreicht das, indem man …", tr: "Buna … yaparak ulaşılıyor", en: "This is achieved by …" },
        { de: "das neu entwickelte Verfahren", tr: "yeni geliştirilen yöntem", en: "the newly developed method" },
        { de: "Je …, desto …", tr: "Ne kadar …, o kadar …", en: "The more …, the more …" },
        { de: "Es bleibt abzuwarten, ob …", tr: "…-ıp olmayacağı görülecek", en: "It remains to be seen whether …" },
      ],
      sample:
        "Wärme aus dem Abwasser\n\nDie im letzten Jahr veröffentlichte Untersuchung beschäftigt sich mit der Frage, wie Gebäude günstiger geheizt werden können. Geprüft wurde ein Verfahren, das Wärme aus dem Abwasser zurückgewinnt.\n\nMan gewinnt die Wärme, indem man das abfließende Wasser durch einen Tauscher leitet. Die getestete Anlage lief zwei Jahre ohne Störung. Die Auswertung zeigt einen klaren Zusammenhang: Je größer das Gebäude ist, desto mehr lohnt sich die Anlage.\n\nEine Einschränkung nennen die Autoren selbst: Bei kleinen Häusern sind die laufenden Kosten zu hoch. Ob sich das Verfahren durchsetzt, bleibt abzuwarten; günstiger dürfte es mit steigenden Energiepreisen aber allemal werden.",
    },
  },

  {
    level: "B2",
    index: 5,
    code: "B2.6",
    titleDe: "Gesellschaft und Wirtschaft",
    titleTr: "Toplum ve ekonomi",
    focus: [
      { de: "Genitivpräpositionen", tr: "wegen / trotz / aufgrund / infolge" },
      { de: "Je …, desto …", tr: "orantı kurmak" },
      { de: "Nominalisierung", tr: "der Anstieg der Preise" },
      { de: "Passiv Präsens", tr: "wird aus … finanziert" },
      { de: "zweiteilige Konnektoren", tr: "sowohl … als auch / weder … noch" },
    ],
    canDo: [
      { de: "Ich kann Ursache und Folge in einem Satz verbinden.", tr: "Sebep ve sonucu tek cümlede bağlayabiliyorum.", en: "I can link cause and effect in one sentence." },
      { de: "Ich kann wirtschaftliche Entwicklungen beschreiben.", tr: "Ekonomik gelişmeleri anlatabiliyorum.", en: "I can describe economic developments." },
      { de: "Ich kann ein gesellschaftliches Thema differenziert diskutieren.", tr: "Toplumsal bir konuyu incelikli biçimde tartışabiliyorum.", en: "I can discuss a social topic in a differentiated way." },
      { de: "Ich kann beide Seiten eines Konflikts benennen.", tr: "Bir tartışmanın iki tarafını da adlandırabiliyorum.", en: "I can name both sides of a conflict." },
      { de: "Ich kann meine Meinung begründet vertreten.", tr: "Görüşümü gerekçelendirerek savunabiliyorum.", en: "I can defend my opinion with reasons." },
    ],
    listening: {
      title: "Stadt oder Land",
      titleTr: "Şehir mi kırsal mı",
      situation: "İki tanıdık taşınma kararını ve konut piyasasını konuşuyor.",
      turns: [
        { speaker: "Jonas", de: "Ich suche seit vier Monaten in der Stadt und finde nichts Bezahlbares. Die Nachfrage übersteigt einfach das Angebot.", tr: "Dört aydır şehirde arıyorum ve ödenebilir bir şey bulamıyorum. Talep arzı aşıyor resmen." },
        { speaker: "Beyza", de: "Je zentraler die Wohnung ist, desto teurer ist die Miete — das war schon immer so. Aufgrund der Zuzüge ist es nur schlimmer geworden.", tr: "Daire ne kadar merkezîyse kira o kadar pahalı — bu hep böyleydi. Gelen göç yüzünden sadece daha da kötüleşti." },
        { speaker: "Jonas", de: "Auf dem Land gibt es Leerstand, aber dort fehlt die Infrastruktur. Ohne Auto geht gar nichts.", tr: "Kırsalda boş konut var ama orada altyapı yok. Arabasız hiçbir şey olmuyor." },
        { speaker: "Beyza", de: "Genau da liegt der Punkt: Je besser die Infrastruktur ist, desto weniger Menschen wandern ab.", tr: "İşte mesele tam orada: Altyapı ne kadar iyiyse o kadar az insan göç eder." },
        { speaker: "Jonas", de: "Trotz des Leerstands zieht also kaum jemand hin. Und neu gebaut wird zu wenig.", tr: "Yani boş konuta rağmen neredeyse kimse taşınmıyor. Ve çok az yeni yapı yapılıyor." },
        { speaker: "Beyza", de: "Sowohl die Städte als auch die Dörfer müssten etwas tun. Weder Warten noch Klagen hilft.", tr: "Hem şehirler hem köyler bir şey yapmalı. Ne beklemek ne yakınmak fayda eder." },
        { speaker: "Jonas", de: "Dann schaue ich mir am Wochenende doch mal den Ort mit der neuen Bahnanbindung an.", tr: "O hâlde hafta sonu yeni tren bağlantısı olan yere bir bakayım." },
      ],
      questions: [
        { de: "Warum findet Jonas nichts in der Stadt?", tr: "Jonas neden şehirde bir şey bulamıyor?", options: ["Er sucht erst seit einer Woche", "Die Nachfrage übersteigt das Angebot", "Er will nur Neubauten", "Er hat kein Einkommen"], answer: 1 },
        { de: "Was fehlt laut Jonas auf dem Land?", tr: "Jonas'a göre kırsalda ne eksik?", options: ["Wohnungen", "Die Infrastruktur", "Arbeit", "Leerstand"], answer: 1 },
        { de: "Wozu entschließt sich Jonas am Ende?", tr: "Jonas sonunda ne yapmaya karar veriyor?", options: ["In der Stadt zu bleiben", "Einen Ort mit neuer Bahnanbindung anzusehen", "Ein Auto zu kaufen", "Die Suche aufzugeben"], answer: 1 },
      ],
    },
    reading: {
      title: "Kommentar: Der enge Markt",
      titleTr: "Yorum: Daralan piyasa",
      genre: "Gazete yorumu",
      text: "Kommentar\n\nDer Anstieg der Mieten wird inzwischen in fast jeder Stadt spürbar. Aufgrund der hohen Nachfrage und des geringen Neubaus haben sich die Preise in zehn Jahren vielerorts verdoppelt. Trotz zahlreicher Programme ist wenig geschehen.\n\nDabei ist der Zusammenhang bekannt: Je weniger gebaut wird, desto stärker steigen die Preise. Wohnraum wird zum großen Teil privat finanziert; öffentliche Mittel fließen nur in einen kleinen Teil der Neubauten. Davon profitieren vor allem jene, die bereits eine Wohnung haben.\n\nInfolge dieser Entwicklung wandern junge Familien in das Umland ab. Dort allerdings fehlt oft die Infrastruktur — und ohne Bahnanbindung nützt die günstige Miete wenig.\n\nWeder Verbote noch bloße Appelle werden reichen. Sowohl die Kommunen als auch der Bund müssten dort ansetzen, wo es wirklich klemmt: beim Bauen selbst.",
      questions: [
        { de: "Worauf führt der Kommentar die Preise zurück?", tr: "Yorum fiyatları neye bağlıyor?", options: ["Auf hohe Nachfrage und geringen Neubau", "Auf die Zinsen", "Auf zu viele Programme", "Auf das Wetter"], answer: 0 },
        { de: "Wer profitiert laut Text vor allem?", tr: "Metne göre en çok kim yararlanıyor?", options: ["Junge Familien", "Wer schon eine Wohnung hat", "Die Kommunen", "Die Bauarbeiter"], answer: 1 },
        { de: "Was fordert der Kommentar am Ende?", tr: "Yorum sonunda ne talep ediyor?", options: ["Mehr Verbote", "Mehr Appelle", "Dass Kommunen und Bund beim Bauen ansetzen", "Dass alle in die Stadt ziehen"], answer: 2 },
      ],
    },
    speaking: [
      { situation: "Bir gelişmenin sebebini resmî dille bildiriyorsun.", de: "Aufgrund der hohen Nachfrage sind die Mieten deutlich gestiegen.", tr: "Yüksek talep sebebiyle kiralar belirgin biçimde arttı." },
      { situation: "İki tarafı birlikte anıyorsun.", de: "Sowohl die Städte als auch die Dörfer müssten etwas ändern.", tr: "Hem şehirler hem köyler bir şeyi değiştirmeli." },
    ],
    writing: {
      prompt: "Toplumsal bir soruya kısa bir görüş yazısı yaz (konut, ulaşım, kuşaklar ya da kamu harcamaları).",
      stimulus: "Wohnen wird zum Luxus — was muss sich ändern?",
      checklist: [
        "Konuyu ve neden önemli olduğunu baştan yaz",
        "En az bir sebebi Genitiv edatıyla bildir (aufgrund / infolge / wegen)",
        "Bir bağlantıyı orantıyla kur (Je …, desto …)",
        "İki tarafı birlikte an (sowohl … als auch / weder … noch)",
        "Somut bir öneriyle bitir",
      ],
      minWords: 90,
      phrases: [
        { de: "Aufgrund der … ist … gestiegen.", tr: "… sebebiyle … arttı", en: "Owing to …, … has risen." },
        { de: "Je …, desto …", tr: "Ne kadar …, o kadar …", en: "The more …, the more …" },
        { de: "Davon profitieren vor allem …", tr: "Bundan özellikle … yararlanıyor", en: "Those who benefit most are …" },
        { de: "Weder … noch … reicht aus.", tr: "Ne … ne … yeterli", en: "Neither … nor … is enough." },
        { de: "Mein Vorschlag wäre, … zu …", tr: "Önerim … olurdu", en: "My suggestion would be to …" },
      ],
      sample:
        "Wohnen darf kein Luxus sein\n\nAufgrund der hohen Nachfrage und des geringen Neubaus sind die Mieten in den letzten Jahren stark gestiegen. Der Anstieg der Preise ist inzwischen in fast jeder mittelgroßen Stadt spürbar.\n\nDer Zusammenhang ist einfach: Je weniger gebaut wird, desto teurer wird das Wohnen. Davon profitieren vor allem jene, die bereits eine Wohnung besitzen. Infolge dieser Entwicklung ziehen junge Familien ins Umland, wo allerdings oft die Infrastruktur fehlt.\n\nWeder Verbote noch Appelle reichen aus. Sowohl die Kommunen als auch der Bund müssten handeln. Mein Vorschlag wäre, öffentliche Mittel gezielt in den Bau kleiner Wohnungen zu lenken und gleichzeitig die Bahnanbindung im Umland zu verbessern.",
    },
  },
];
