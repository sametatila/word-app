import type { SkillExercise } from "../types";

/**
 * B2 · Ünite 3 — "Uzaktan çalışma, konferans, pazarlık, resmî şikâyet".
 *
 * Dört ders: Hybrid arbeiten · Auf der Fachkonferenz · Der Preis ist
 * verhandelbar · Die formelle Beschwerde.
 *
 *   Ünite 3: die Absprache, die Betriebsvereinbarung, die Richtlinie,
 *            die Vorgabe, die Gleitzeit, der Arbeitsablauf, koordinieren,
 *            freistellen · der Austausch, vernetzen, der Redner, referieren,
 *            die Podiumsdiskussion, die Fachsprache, die Kompetenz,
 *            das Selbstvertrauen · verhandeln, der Preisnachlass,
 *            die Geschäftsbedingungen, der Vertragspartner, der Tarif,
 *            zusichern, unterbieten, überteuert · die Beschwerde,
 *            die Stellungnahme, der Schriftverkehr, die Unterlage,
 *            der Nachweis, der Ansprechpartner, mahnen, unzumutbar
 *   Kalıplar: Nach Absprache mit … · Beim Arbeiten von zu Hause … ·
 *            aufgrund / trotz / während + Genitiv · Wir könnten uns …
 *            vorstellen. · Kämen Sie uns bei … entgegen? · Bezug nehmend
 *            auf … · Ich sehe mich gezwungen, … zu …
 *
 * Ölçtüğü dilbilgisi: isimleştirme, tamlayan hâli isteyen edatlar, dilek
 * kipiyle teklif ve resmî yazının mesafeli dili. Dördü de aynı şeyi yapıyor:
 * konuşanı cümleden çıkarıp olguyu öne almak.
 */
export const b2U03: SkillExercise[] = [
  {
    id: "b2-u03-r1",
    level: "B2",
    skill: "reading",
    unit: 3,
    title: "Zwei Tage im Büro, drei zu Hause",
    genre: "İşyeri yönergesi",
    intro: "Bir şirketin uzaktan çalışma yönergesi. Neyi kim karara bağlıyor?",
    gloss: [
      { de: "die Absprache", tr: "mutabakat", en: "arrangement" },
      { de: "die Betriebsvereinbarung", tr: "işyeri anlaşması", en: "company agreement" },
      { de: "die Richtlinie", tr: "yönerge", en: "guideline" },
      { de: "die Vorgabe", tr: "belirlenen kural", en: "requirement" },
      { de: "die Gleitzeit", tr: "esnek mesai", en: "flexitime" },
      { de: "der Arbeitsablauf", tr: "iş akışı", en: "workflow" },
      { de: "koordinieren", tr: "koordine etmek", en: "to coordinate" },
      { de: "freistellen", tr: "izinli saymak", en: "to release from duty" },
    ],
    minutes: 6,
    text:
      "RICHTLINIE ZUM HYBRIDEN ARBEITEN\n\n" +
      "Diese Richtlinie gilt ab dem ersten Oktober und ersetzt die bisherige Regelung. Sie beruht auf der Betriebsvereinbarung vom Mai und wird jährlich überprüft.\n\n" +
      "1. Umfang. Nach Absprache mit der Teamleitung sind bis zu drei Tage pro Woche von zu Hause möglich. Zwei Tage Anwesenheit im Büro bleiben die Vorgabe, weil sich manche Arbeitsabläufe nur gemeinsam koordinieren lassen.\n\n" +
      "2. Zeiten. Beim Arbeiten von zu Hause gilt dieselbe Gleitzeit wie im Büro. Kernzeit ist von zehn bis fünfzehn Uhr; außerhalb dieser Zeit besteht keine Pflicht zu antworten. Wir bitten ausdrücklich darum, diese Grenze auch bei anderen zu respektieren.\n\n" +
      "3. Ausnahmen. Wer Angehörige pflegt oder eine längere Anfahrt hat, kann auf Antrag von der Anwesenheitspflicht freigestellt werden. Der Antrag geht an die Personalabteilung, nicht an die direkte Führungskraft.\n\n" +
      "4. Technik. Die Ausstattung stellt das Unternehmen. Private Geräte sind aus Gründen der Datensicherheit nicht zugelassen.\n\n" +
      "5. Was diese Richtlinie nicht regelt. Sie sagt nichts darüber, wie oft ein Team sich sieht. Das bleibt Sache der Teams. Eine Vorgabe von oben würde hier mehr zerstören als ordnen.\n\n" +
      "Fragen beantwortet die Personalabteilung; für Beschwerden gibt es den bekannten Weg über den Betriebsrat.",
    questions: [
      {
        text: "Wie viele Tage pro Woche darf man höchstens zu Hause arbeiten?",
        options: ["zwei", "drei", "fünf"],
        answer: 1,
        explain: "„…sind bis zu drei Tage pro Woche von zu Hause möglich.“ İki gün ofiste bulunma kuralı kalıyor.",
      },
      {
        kind: "gapfill",
        text: "Nach ___ mit der Teamleitung sind bis zu drei Tage pro Woche möglich.",
        options: [],
        answer: 0,
        accept: ["Absprache"],
        explain: "İsim öbeğiyle koşul: yan cümle yerine tek bir tamlama. Kurum dilinin en sık hamlesi.",
      },
      {
        kind: "short_answer",
        text: "An wen geht der Antrag auf Freistellung?",
        options: [],
        answer: 0,
        accept: ["an die Personalabteilung", "die Personalabteilung", "Personalabteilung"],
        explain: "„Der Antrag geht an die Personalabteilung, nicht an die direkte Führungskraft.“",
      },
      {
        text: "Warum bleiben zwei Bürotage Vorgabe?",
        options: [
          "Weil die Technik zu Hause fehlt.",
          "Weil sich manche Arbeitsabläufe nur gemeinsam koordinieren lassen.",
          "Weil der Betriebsrat es verlangt.",
        ],
        answer: 1,
        explain: "Metin gerekçeyi doğrudan veriyor: bazı iş akışları ancak birlikte koordine edilebiliyor.",
      },
      {
        text: "Die Richtlinie schreibt vor, wie oft sich ein Team trifft.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Sie sagt nichts darüber, wie oft ein Team sich sieht. Das bleibt Sache der Teams.“",
      },
    ],
  },

  {
    id: "b2-u03-r2",
    level: "B2",
    skill: "reading",
    unit: 3,
    title: "Sehr geehrte Damen und Herren",
    genre: "Resmî şikâyet mektubu",
    intro: "Bir müşteri üçüncü kez yazıyor. Öfke tonla mı, dilbilgisiyle mi taşınıyor?",
    gloss: [
      { de: "die Beschwerde", tr: "şikâyet", en: "complaint" },
      { de: "die Stellungnahme", tr: "görüş bildirme", en: "statement" },
      { de: "der Schriftverkehr", tr: "yazışma", en: "correspondence" },
      { de: "die Unterlage", tr: "evrak", en: "document" },
      { de: "der Nachweis", tr: "kanıt", en: "proof" },
      { de: "der Ansprechpartner", tr: "muhatap", en: "contact person" },
      { de: "mahnen", tr: "ihtar etmek", en: "to send a reminder" },
      { de: "unzumutbar", tr: "kabul edilemez", en: "unreasonable" },
    ],
    minutes: 6,
    text:
      "Sehr geehrte Damen und Herren,\n\n" +
      "Bezug nehmend auf meine Beschwerde vom vierten Februar und den gesamten Schriftverkehr seit November teile ich Ihnen Folgendes mit.\n\n" +
      "Die von mir eingereichten Unterlagen liegen Ihnen seit vier Monaten vor. Den Nachweis über die Zahlung habe ich zweimal übersandt, zuletzt am siebzehnten Januar per Einschreiben. Eine Stellungnahme Ihres Hauses steht bis heute aus.\n\n" +
      "In dieser Zeit hat sich mein Ansprechpartner dreimal geändert. Jedes Mal wurde ich gebeten, den Vorgang neu zu schildern. Ich habe das dreimal getan. Die Verzögerung der Bearbeitung ist inzwischen unzumutbar, zumal es sich um einen Betrag handelt, der seit Oktober fällig ist.\n\n" +
      "Ich habe Sie am zwanzigsten Januar und am dritten Februar gemahnt. Beide Schreiben blieben unbeantwortet.\n\n" +
      "Ich bitte Sie daher um eine schriftliche Stellungnahme innerhalb von vierzehn Tagen. Sollte diese Frist erneut verstreichen, sehe ich mich gezwungen, den Vorgang an die Verbraucherzentrale weiterzugeben.\n\n" +
      "Für Rückfragen erreichen Sie mich unter der bekannten Nummer. Ich bitte allerdings darum, mir vorher mitzuteilen, wer künftig zuständig ist.\n\n" +
      "Mit freundlichen Grüßen",
    questions: [
      {
        kind: "short_answer",
        text: "Wie oft hat sich der Ansprechpartner geändert?",
        options: [],
        answer: 0,
        accept: ["dreimal", "drei Mal", "dreimal geändert"],
        explain: "„In dieser Zeit hat sich mein Ansprechpartner dreimal geändert.“",
      },
      {
        text: "Welche Frist setzt der Absender?",
        options: ["sieben Tage", "vierzehn Tage", "einen Monat"],
        answer: 1,
        explain: "„Ich bitte Sie daher um eine schriftliche Stellungnahme innerhalb von vierzehn Tagen.“",
      },
      {
        kind: "gapfill",
        text: "Sollte diese Frist erneut verstreichen, sehe ich mich ___, den Vorgang weiterzugeben.",
        options: [],
        answer: 0,
        accept: ["gezwungen"],
        explain: "Resmî mektupta tehdit değil kayıt kurulur: 'kendimi mecbur görüyorum'. Özne cümleden çekilir.",
      },
      {
        text: "Was ist laut Brief unzumutbar?",
        options: [
          "die Höhe des Betrags",
          "die Verzögerung der Bearbeitung",
          "der Ton der Antwortschreiben",
        ],
        answer: 1,
        explain: "„Die Verzögerung der Bearbeitung ist inzwischen unzumutbar.“ Cevap yazısı zaten hiç gelmemiş.",
      },
      {
        text: "Der Absender schreibt zum ersten Mal.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: Şubattaki şikâyete ve kasımdan beri süren yazışmaya atıf yapıyor, ayrıca iki kez ihtar göndermiş.",
      },
    ],
  },

  {
    id: "b2-u03-l1",
    level: "B2",
    skill: "listening",
    unit: 3,
    title: "In der Kaffeepause",
    genre: "Diyalog",
    intro: "Konferans arasında iki kişi tanışıyor. Tamlayan hâli isteyen edatlara dikkat et.",
    gloss: [
      { de: "der Austausch", tr: "fikir alışverişi", en: "exchange" },
      { de: "vernetzen", tr: "ağa bağlamak", en: "to network" },
      { de: "der Redner", tr: "konuşmacı", en: "speaker" },
      { de: "referieren", tr: "sunum yapmak", en: "to give a talk" },
      { de: "die Podiumsdiskussion", tr: "panel", en: "panel discussion" },
      { de: "die Fachsprache", tr: "uzmanlık dili", en: "technical language" },
      { de: "die Kompetenz", tr: "yetkinlik", en: "competence" },
      { de: "das Selbstvertrauen", tr: "özgüven", en: "self-confidence" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Nour", text: "Sie waren doch eben im Saal zwei? Trotz des vollen Programms habe ich es gerade noch geschafft." },
      { speaker: "Frank", text: "Ja, ich habe dort referiert. Aufgrund der kurzen Zeit musste ich die Hälfte weglassen." },
      { speaker: "Nour", text: "Das hat man nicht gemerkt. Sie waren der einzige Redner, der ohne Fachsprache ausgekommen ist." },
      { speaker: "Frank", text: "Das ist Absicht. Während der Vorbereitung streiche ich jedes Wort, das ich meiner Mutter nicht erklären könnte." },
      { speaker: "Nour", text: "Ich arbeite an derselben Frage, nur aus der Praxis. Ein Austausch wäre für mich sehr nützlich." },
      { speaker: "Frank", text: "Gern. Sind Sie nachher bei der Podiumsdiskussion?" },
      { speaker: "Nour", text: "Ich wollte hin, ja. Ehrlich gesagt fehlt mir vor solchen Runden immer das Selbstvertrauen." },
      { speaker: "Frank", text: "Das geht fast allen so. Fachliche Kompetenz und Lust auf ein Mikrofon sind zwei verschiedene Dinge." },
      { speaker: "Nour", text: "Der Satz hilft mir. Wollen wir uns danach kurz vernetzen?" },
      { speaker: "Frank", text: "Sehr gern. Ich habe leider keine Karte dabei, aber ich schreibe Ihnen heute Abend." },
      { speaker: "Nour", text: "Perfekt. Dann bis nachher im großen Saal." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Frank'ın konuşmasını neden kısalttığını söylediği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Aufgrund der kurzen Zeit musste ich die Hälfte weglassen."],
        explain: "aufgrund tamlayan hâli ister: der kurzen Zeit. Resmî gerekçe bildirmenin standart yolu.",
      },
      {
        text: "Was fiel Nour an Franks Vortrag auf?",
        options: [
          "Er hat ohne Fachsprache gesprochen.",
          "Er hat zu lange gesprochen.",
          "Er hat viele Folien gezeigt.",
        ],
        answer: 0,
        explain: "„Sie waren der einzige Redner, der ohne Fachsprache ausgekommen ist.“",
      },
      {
        kind: "short_answer",
        text: "Was streicht Frank bei der Vorbereitung?",
        options: [],
        answer: 0,
        accept: ["jedes Wort", "schwierige Wörter", "jedes unklare Wort"],
        explain: "„…streiche ich jedes Wort, das ich meiner Mutter nicht erklären könnte.“",
      },
      {
        text: "Was unterscheidet Frank von Selbstvertrauen?",
        options: ["die Fachsprache", "die fachliche Kompetenz", "die Vorbereitung"],
        answer: 1,
        explain: "„Fachliche Kompetenz und Lust auf ein Mikrofon sind zwei verschiedene Dinge.“",
      },
      {
        text: "Frank gibt Nour sofort eine Visitenkarte.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Ich habe leider keine Karte dabei, aber ich schreibe Ihnen heute Abend.“",
      },
    ],
  },

  {
    id: "b2-u03-l2",
    level: "B2",
    skill: "listening",
    unit: 3,
    title: "Zehn Prozent sind zu viel",
    genre: "Müzakere",
    intro: "Yıllık sözleşme pazarlığı. Teklif ne zaman karar, ne zaman öneri olur?",
    gloss: [
      { de: "verhandeln", tr: "pazarlık etmek", en: "to negotiate" },
      { de: "der Preisnachlass", tr: "fiyat indirimi", en: "discount" },
      { de: "die Geschäftsbedingungen", tr: "sözleşme koşulları", en: "terms and conditions" },
      { de: "der Vertragspartner", tr: "sözleşme tarafı", en: "contracting party" },
      { de: "der Tarif", tr: "tarife", en: "rate" },
      { de: "zusichern", tr: "taahhüt etmek", en: "to guarantee" },
      { de: "unterbieten", tr: "altına inmek", en: "to undercut" },
      { de: "überteuert", tr: "fahiş fiyatlı", en: "overpriced" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Sander", text: "Unser Tarif liegt bei achtundvierzig Euro pro Einheit. Was schwebt Ihnen vor?" },
      { speaker: "Petra", text: "Wir könnten uns einen Preisnachlass von zehn Prozent vorstellen, bei gleicher Menge." },
      { speaker: "Sander", text: "Zehn Prozent sind zu viel. Damit würde ich unter meinen eigenen Einkaufspreis gehen." },
      { speaker: "Petra", text: "Ein Wettbewerber hat uns gestern deutlich unterboten. Das sage ich offen, nicht als Druck." },
      { speaker: "Sander", text: "Danke für die Offenheit. Kämen Sie uns bei der Laufzeit entgegen? Zwei Jahre statt eines." },
      { speaker: "Petra", text: "Darüber könnte ich reden. Zwei Jahre wären für uns kein Problem." },
      { speaker: "Sander", text: "Dann sichere ich Ihnen sechs Prozent zu, bei zwei Jahren und unveränderten Geschäftsbedingungen." },
      { speaker: "Petra", text: "Sechs klingt fair. Überteuert war Ihr Angebot ohnehin nie, das war nie mein Punkt." },
      { speaker: "Sander", text: "Gut. Als langjähriger Vertragspartner bekommen Sie außerdem den früheren Liefertermin." },
      { speaker: "Petra", text: "Dann halten wir sechs Prozent und zwei Jahre fest. Schicken Sie mir das schriftlich?" },
      { speaker: "Sander", text: "Heute noch. Und danke, dass wir sachlich verhandeln konnten." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Petra'nın ilk teklifini kurduğu cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Wir könnten uns einen Preisnachlass von zehn Prozent vorstellen, bei gleicher Menge."],
        explain: "Dilek kipi teklifi bir karara değil bir öneriye çeviriyor; karşı tarafın alanı açık kalıyor.",
      },
      {
        text: "Worauf einigen sich beide?",
        options: [
          "zehn Prozent bei einem Jahr",
          "sechs Prozent bei zwei Jahren",
          "acht Prozent bei drei Jahren",
        ],
        answer: 1,
        explain: "„Dann sichere ich Ihnen sechs Prozent zu, bei zwei Jahren und unveränderten Geschäftsbedingungen.“",
      },
      {
        kind: "short_answer",
        text: "Was bekommt Petra zusätzlich?",
        options: [],
        answer: 0,
        accept: ["den früheren Liefertermin", "einen früheren Liefertermin", "früherer Liefertermin"],
        explain: "„Als langjähriger Vertragspartner bekommen Sie außerdem den früheren Liefertermin.“",
      },
      {
        text: "Warum lehnt Sander zehn Prozent ab?",
        options: [
          "Weil der Wettbewerber teurer ist.",
          "Weil er dann unter seinem eigenen Einkaufspreis wäre.",
          "Weil die Laufzeit zu kurz ist.",
        ],
        answer: 1,
        explain: "„Damit würde ich unter meinen eigenen Einkaufspreis gehen.“",
      },
      {
        text: "Petra hält das ursprüngliche Angebot für überteuert.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Überteuert war Ihr Angebot ohnehin nie, das war nie mein Punkt.“",
      },
    ],
  },

  {
    id: "b2-u03-w1",
    level: "B2",
    skill: "writing",
    unit: 3,
    title: "Vier Sätze ohne Ich",
    genre: "Cümle kurma",
    intro: "İsimleştirme, tamlayan hâli edatları, dilek kipiyle teklif ve resmî mesafe.",
    gloss: [
      { de: "die Absprache", tr: "mutabakat", en: "arrangement" },
      { de: "der Preisnachlass", tr: "fiyat indirimi", en: "discount" },
      { de: "die Stellungnahme", tr: "görüş bildirme", en: "statement" },
      { de: "der Austausch", tr: "fikir alışverişi", en: "exchange" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Ekip yönetimiyle mutabakattan sonra evden çalışmak mümkün.",
        answer: "Nach Absprache mit der Teamleitung ist Homeoffice möglich",
        hint: "Koşul yan cümleyle değil isim öbeğiyle kuruluyor; fiil ikinci sırada.",
      },
      {
        kind: "build",
        tr: "Kısa süre nedeniyle yarısını atlamak zorunda kaldım.",
        answer: "Aufgrund der kurzen Zeit musste ich die Hälfte weglassen",
        hint: "aufgrund tamlayan hâli ister: der kurzen Zeit.",
      },
      {
        kind: "build",
        tr: "Yüzde altılık bir fiyat indirimi düşünebiliriz.",
        answer: "Wir könnten uns einen Preisnachlass von sechs Prozent vorstellen",
        hint: "Dilek kipi teklifi öneri hâline getirir; dönüşlü zamir fiilden hemen sonra.",
      },
      {
        kind: "build",
        tr: "Sizden on dört gün içinde görüş bildirmenizi rica ediyorum.",
        answer: "Ich bitte Sie um eine Stellungnahme innerhalb von vierzehn Tagen",
        hint: "bitten fiili um edatıyla ve belirtme hâliyle çalışır; süre en sonda.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: tamlayan hâli isteyen edattan sonra yanlış hâl kullanılmış.",
        source: "Trotz dem vollen Programm hatten wir Zeit für einen Austausch.",
        answer: "Trotz des vollen Programms hatten wir Zeit für einen Austausch.",
        alternatives: ["Trotz des vollen Programms hatten wir Zeit für einen Austausch"],
        why: "trotz resmî dilde tamlayan hâli ister: des vollen Programms. Günlük konuşmada yönelme hâli duyulur ve yanlış sayılmaz, ama yazıda ve sunumda seviyeyi hemen belli eder.",
      },
    ],
  },

  {
    id: "b2-u03-w2",
    level: "B2",
    skill: "writing",
    unit: 3,
    title: "Die dritte Mahnung",
    genre: "Resmî mektup",
    intro: "Cevapsız kalan bir talep için resmî bir şikâyet mektubu yaz.",
    gloss: [
      { de: "die Beschwerde", tr: "şikâyet", en: "complaint" },
      { de: "der Nachweis", tr: "kanıt", en: "proof" },
      { de: "unzumutbar", tr: "kabul edilemez", en: "unreasonable" },
      { de: "der Ansprechpartner", tr: "muhatap", en: "contact person" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "free",
        prompt:
          "Bir kuruma resmî bir şikâyet mektubu yaz: neye atıf yapıyorsun, şimdiye kadar ne gönderdin, ne kadar bekledin, ne talep ediyorsun ve süre dolarsa ne yapacaksın. Öfkeni tonla değil dilbilgisiyle taşı: en az bir isimleştirme (die Verzögerung der …) ve bir kez de mesafeli mecburiyet kalıbı (Ich sehe mich gezwungen, … zu …) kullan. Ünlem işareti kullanma.",
        checklist: [
          "Neye atıf yapıldığı ilk cümlede yazıyor mu?",
          "Şimdiye kadar ne gönderildiği ve ne kadar beklendiği yazılı mı?",
          "En az bir isimleştirilmiş yapı var mı?",
          "Somut bir talep ve bir süre bildirildi mi?",
        ],
        minWords: 80,
        phrases: [
          { de: "Bezug nehmend auf …", tr: "…-e atıfla", en: "with reference to …" },
          { de: "Die Verzögerung der Bearbeitung ist unzumutbar.", tr: "işlemin gecikmesi kabul edilemez", en: "the delay in processing is unreasonable" },
          { de: "Ich sehe mich gezwungen, … zu …", tr: "…-mek zorunda kalıyorum", en: "I find myself forced to …" },
        ],
        sample:
          "Sehr geehrte Damen und Herren,\n\n" +
          "Bezug nehmend auf meine Beschwerde vom zwölften März und den bisherigen Schriftverkehr teile ich Ihnen Folgendes mit.\n\n" +
          "Die angeforderten Unterlagen habe ich am zwanzigsten März übersandt, den Nachweis über die Zahlung am zweiten April per Einschreiben. Beide Sendungen wurden Ihnen zugestellt. Eine Antwort ist bis heute nicht erfolgt.\n\n" +
          "Innerhalb dieser Zeit hat sich mein Ansprechpartner zweimal geändert, und jedes Mal wurde ich gebeten, den Vorgang erneut zu schildern. Die Verzögerung der Bearbeitung ist inzwischen unzumutbar.\n\n" +
          "Ich bitte Sie daher um eine schriftliche Stellungnahme innerhalb von zehn Tagen sowie um die Mitteilung, wer künftig zuständig ist. Sollte diese Frist ohne Antwort verstreichen, sehe ich mich gezwungen, den Vorgang an die zuständige Stelle weiterzugeben.\n\n" +
          "Mit freundlichen Grüßen",
      },
    ],
  },
];
