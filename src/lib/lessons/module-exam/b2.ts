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
];
