import type { SkillExercise } from "../types";

/**
 * C1 · Ünite 10 — "Para, müzik, yalancı eşdeğer, günlük kullanım".
 *
 * Dört ders: Geld zum Fenster hinaus · Den Ton angeben · Wörtlich wird's
 * falsch · Ein Tag voller Bilder.
 *
 *   Kelime: Geld zum Fenster hinauswerfen, tief in die Tasche greifen, auf
 *           Heller und Pfennig, ein Vermögen kosten, knapp bei Kasse sein, das
 *           Geld auf den Kopf hauen, jeden Cent umdrehen, die Kosten im Griff
 *           haben · den Ton angeben, nach jemandes Pfeife tanzen, Musik in
 *           meinen Ohren, die erste Geige spielen, der Ohrwurm, den richtigen
 *           Ton treffen, jemandem den Marsch blasen, jemandem einen Sturm
 *           entfachen · die Falle, sinngemäß, die Entsprechung, verwechseln,
 *           missverständlich, der falsche Freund, wörtlich nehmen, seinen Senf
 *           dazugeben · der Alltag, einstreuen, dosiert, unauffällig, der
 *           Zusammenhang, ins Wasser fallen, auf Anhieb, im Gegenzug
 *
 * Deyim bloğunun kapanışı ve bilerek KENDİ ÜSTÜNE dönüyor: son ders deyim
 * kullanmayı değil, DOZUNU öğretiyor. Bir metinde üç deyim renk katar, sekiz
 * deyim yapmacık yapar — ve yabancı konuşan tam bu eşiği kaçırır, çünkü her
 * yeni öğrendiğini kullanmak ister.
 *
 * Yalancı eşdeğer dersi ise Türkçe konuşana özgü: birebir çeviri bazen
 * çalışır, bazen anlamı tersine çevirir, ve hangisinin hangisi olduğu
 * ezberlenmez — sınanır.
 */
export const c1U10: SkillExercise[] = [
  {
    id: "c1-u10-r1",
    level: "C1",
    skill: "reading",
    unit: 10,
    title: "Wer im Rathaus den Ton angibt",
    genre: "opinion",
    intro: "Yerel gazetede bir yorum: yeni kent salonunun maliyeti artıyor. Yazar kimi, neden eleştiriyor?",
    gloss: [
      { de: "den Ton angeben", tr: "havayı belirlemek", en: "to call the tune" },
      { de: "nach jemandes Pfeife tanzen", tr: "birinin dediğini yapmak", en: "to dance to someone's tune" },
      { de: "die erste Geige spielen", tr: "başı çekmek / belirleyici olmak", en: "to play first fiddle" },
      { de: "Musik in meinen Ohren", tr: "kulağa hoş gelen", en: "music to my ears" },
      { de: "die Kosten im Griff haben", tr: "maliyeti kontrol altında tutmak", en: "to have costs under control" },
      { de: "ein Vermögen kosten", tr: "servet değerinde olmak", en: "to cost a fortune" },
      { de: "jeden Cent umdrehen", tr: "kuruşun hesabını yapmak", en: "to count every penny" },
      { de: "Geld zum Fenster hinauswerfen", tr: "parayı sokağa atmak", en: "to throw money down the drain" },
      { de: "tief in die Tasche greifen", tr: "cebinden epey para çıkarmak", en: "to dig deep into one's pocket" },
      { de: "durchwinken", tr: "sorgusuz onaylamak", en: "to wave through" },
      { de: "die Kämmerin", tr: "belediye mali işler müdürü", en: "city treasurer" },
      { de: "die Gewerbesteuer", tr: "işletme vergisi", en: "trade tax" },
      { de: "die Tiefgarage", tr: "yeraltı otoparkı", en: "underground parking garage" },
      { de: "nachreichen", tr: "sonradan eklemek", en: "to submit later" },
      { de: "der Prüfbericht", tr: "denetim raporu", en: "audit report" },
      { de: "hinausgehen", tr: "ötesine geçmek", en: "to go beyond" },
      { de: "die Debatte", tr: "tartışma", en: "debate" },
      { de: "die Halle", tr: "salon", en: "hall" },
      { de: "sinken", tr: "düşmek", en: "to fall" },
    ],
    minutes: 7,
    text:
      "KOMMENTAR: WER GIBT IM RATHAUS DEN TON AN?\n\n" +
      "Die neue Stadthalle wird teurer. Statt 18 Millionen Euro soll sie nun 26 Millionen kosten, und der Stadtrat hat die Erhöhung am Donnerstag ohne lange Debatte durchgewinkt. Damit stellt sich eine Frage, die über die Halle hinausgeht: Wer gibt in diesem Rathaus eigentlich den Ton an?\n\n" +
      "Formal ist die Antwort klar. Der Rat beschließt, die Verwaltung führt aus. Am Donnerstag sah es anders aus. Bürgermeister Hoffmann legte die neuen Zahlen vor, erklärte sie zehn Minuten lang, und die Mehrheit tanzte nach seiner Pfeife. Nur zwei Ratsmitglieder stellten überhaupt Fragen.\n\n" +
      "Dabei hätte es Fragen genug gegeben. Die Verwaltung erklärt die Mehrkosten mit gestiegenen Baupreisen. Das ist ein Teil der Wahrheit. Ein anderer Teil ist, dass während der Planung drei Mal Wünsche nachgereicht wurden: eine größere Bühne, eine Tiefgarage, ein Restaurant. Wer so plant, darf sich nicht wundern, wenn das Projekt ein Vermögen kostet.\n\n" +
      "Kämmerin Petra Lindner, die in Finanzfragen seit Jahren die erste Geige spielt, schwieg am Donnerstag auffällig. Noch im Frühjahr hatte sie gewarnt, die Stadt müsse jeden Cent umdrehen, weil die Einnahmen aus der Gewerbesteuer sinken. Dass sie nun nichts sagte, ist bemerkenswert.\n\n" +
      "Niemand behauptet, die Stadt werfe das Geld zum Fenster hinaus. Eine Halle für Konzerte und Vereine ist sinnvoll. Aber wer so tief in die Tasche greift, muss zeigen, dass er die Kosten im Griff hat. Ein Kostenplan, der sich in zwei Jahren um acht Millionen verändert, zeigt eher das Gegenteil.\n\n" +
      "Für die nächste Sitzung hat die Opposition einen unabhängigen Prüfbericht beantragt. Stimmt der Rat zu, wäre das Musik in unseren Ohren und ein Zeichen, dass er seine Rolle wieder selbst spielt.",
    questions: [
      {
        text: "Wie viel soll die Stadthalle jetzt kosten?",
        options: [
          "26 Millionen Euro",
          "18 Millionen Euro",
          "8 Millionen Euro",
        ],
        answer: 0,
        explain: "„Statt 18 Millionen Euro soll sie nun 26 Millionen kosten.“",
      },
      {
        kind: "gapfill",
        text: "Bürgermeister Hoffmann legte die neuen Zahlen vor, erklärte sie zehn Minuten lang, und die Mehrheit tanzte nach seiner ___.",
        options: [],
        answer: 0,
        accept: ["Pfeife"],
        explain: "Meclis çoğunluğu belediye başkanının dediğini sorgulamadan yaptı.",
      },
      {
        text: "Welchen Grund für die Mehrkosten nennt der Kommentar neben den Baupreisen?",
        options: [
          "Einen Rechenfehler der Kämmerin",
          "Höhere Zinsen",
          "Wünsche, die während der Planung nachgereicht wurden",
        ],
        answer: 2,
        explain: "Planlama sırasında büyük sahne, yeraltı otoparkı ve restoran sonradan eklendi.",
      },
      {
        kind: "short_answer",
        text: "Wovor hatte die Kämmerin im Frühjahr gewarnt?",
        options: [],
        answer: 0,
        accept: [
          "vor sinkenden Einnahmen",
          "die Stadt müsse jeden Cent umdrehen",
          "vor sinkender Gewerbesteuer",
          "man müsse sparen",
        ],
        explain: "„Noch im Frühjahr hatte sie gewarnt, die Stadt müsse jeden Cent umdrehen, weil die Einnahmen aus der Gewerbesteuer sinken.“",
      },
      {
        text: "Der Kommentar hält eine Stadthalle grundsätzlich für sinnvoll.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Eine Halle für Konzerte und Vereine ist sinnvoll.“",
      },
    ],
  },
  {
    id: "c1-u10-r2",
    level: "C1",
    skill: "reading",
    unit: 10,
    title: "Verwechslungsgefahr in der Apotheke",
    genre: "article",
    intro: "Eczanelerde ilaç karışıklığı üzerine bir haber. Hatalar nereden kaynaklanıyor, nasıl önleniyor?",
    gloss: [
      { de: "die Entsprechung", tr: "karşılık", en: "equivalent" },
      { de: "sinngemäß", tr: "anlamca", en: "in substance" },
      { de: "verwechseln", tr: "karıştırmak", en: "to confuse" },
      { de: "missverständlich", tr: "yanlış anlaşılmaya açık", en: "ambiguous" },
      { de: "wörtlich nehmen", tr: "kelimesi kelimesine almak", en: "to take literally" },
      { de: "die Falle", tr: "tuzak", en: "trap" },
      { de: "seinen Senf dazugeben", tr: "lafa karışmak", en: "to put one's two cents in" },
      { de: "die Notaufnahme", tr: "acil servis", en: "emergency room" },
      { de: "das Rezept", tr: "reçete", en: "prescription" },
      { de: "die Krankenkasse", tr: "sağlık sigortası", en: "health insurance fund" },
      { de: "der Wirkstoff", tr: "etken madde", en: "active ingredient" },
      { de: "der Beipackzettel", tr: "prospektüs", en: "package insert" },
      { de: "die Einnahme", tr: "ilacı alma", en: "intake" },
      { de: "eigenmächtig", tr: "kendi başına", en: "on one's own authority" },
      { de: "die Dosis", tr: "doz", en: "dose" },
      { de: "die Kennzeichnung", tr: "işaretleme", en: "labeling" },
      { de: "die Verwechslungsgefahr", tr: "karıştırılma tehlikesi", en: "risk of confusion" },
      { de: "ähneln", tr: "benzemek", en: "to resemble" },
      { de: "lesen", tr: "okumak", en: "to read" },
      { de: "mündlich", tr: "sözlü olarak", en: "orally" },
      { de: "senken", tr: "düşürmek", en: "to lower" },
      { de: "solche", tr: "böyle", en: "such" },
      { de: "der Text", tr: "metin", en: "text" },
      { de: "die Zahl", tr: "sayı", en: "number" },
    ],
    minutes: 7,
    text:
      "VERWECHSLUNGSGEFAHR AM APOTHEKENTRESEN\n\n" +
      "Jedes Jahr werden in deutschen Apotheken und Krankenhäusern Tausende Medikamente verwechselt. Die meisten Fälle bleiben ohne Folgen, weil jemand den Fehler rechtzeitig bemerkt. Einige aber enden in der Notaufnahme.\n\n" +
      "Die häufigste Falle sind Namen, die sich ähneln. Ein Blutdruckmittel und ein Mittel gegen Pilzinfektionen unterscheiden sich im Namen manchmal nur durch zwei Buchstaben. Wer ein Rezept in Eile liest, sieht, was er erwartet.\n\n" +
      "Dazu kommen die Rabattverträge der Krankenkassen. Statt des gewohnten Präparats bekommen Patienten oft eine günstigere Entsprechung mit demselben Wirkstoff, aber mit anderem Namen und anderer Verpackung. „Viele ältere Menschen haben dann zwei Schachteln zu Hause und nehmen beide“, sagt die Apothekerin Sabine Roth aus Bielefeld.\n\n" +
      "Auch der Beipackzettel ist oft missverständlich. „Dreimal täglich“ heißt nicht „nach jeder Mahlzeit“, wenn jemand nur zweimal am Tag isst. Manche Patienten nehmen solche Angaben sehr wörtlich, andere gar nicht. Roth erklärt deshalb jede neue Einnahme mündlich und fragt am Ende: „Wie nehmen Sie das jetzt?“ Wiederholt der Patient es sinngemäß richtig, ist die Erklärung angekommen.\n\n" +
      "Ein weiteres Risiko sitzt am Küchentisch. Wenn Verwandte, Nachbarn oder Internetforen ihren Senf dazugeben, setzen Patienten Medikamente eigenmächtig ab oder verdoppeln die Dosis. „Fragen Sie lieber einmal zu viel in der Apotheke als einmal zu wenig“, rät Roth.\n\n" +
      "Einige Kliniken schreiben den Teil, in dem sich zwei ähnliche Namen unterscheiden, inzwischen in Großbuchstaben, damit der Unterschied ins Auge fällt. Studien zeigen, dass solche Kennzeichnungen die Zahl der Verwechslungen deutlich senken. In Deutschland ist das bisher freiwillig.",
    questions: [
      {
        text: "Was ist laut Text die häufigste Falle?",
        options: [
          "Namen, die sich ähneln",
          "Unleserliche Rezepte",
          "Zu kleine Verpackungen",
        ],
        answer: 0,
        explain: "„Die häufigste Falle sind Namen, die sich ähneln.“",
      },
      {
        kind: "gapfill",
        text: "Auch der Beipackzettel ist oft ___.",
        options: [],
        answer: 0,
        accept: ["missverständlich"],
        explain: "„Dreimal täglich“ gibi bir bilgi herkes tarafından aynı biçimde anlaşılmıyor.",
      },
      {
        text: "Warum haben manche ältere Menschen zwei Schachteln desselben Mittels?",
        options: [
          "Weil der Arzt zu viel verschreibt",
          "Weil sie eine günstigere Entsprechung mit anderem Namen bekommen",
          "Weil sie die Apotheke gewechselt haben",
        ],
        answer: 1,
        explain: "İndirim sözleşmeleri yüzünden aynı etken maddeyi başka adla ve başka kutuda alıyorlar.",
      },
      {
        kind: "short_answer",
        text: "Wie prüft Frau Roth, ob ihre Erklärung angekommen ist?",
        options: [],
        answer: 0,
        accept: [
          "sie fragt nach",
          "sie lässt es wiederholen",
          "Wie nehmen Sie das jetzt?",
          "sie fragt am Ende nach",
        ],
        explain: "Hastaya ilacı nasıl alacağını soruyor ve anlatılanı kendi sözleriyle tekrarlatıyor.",
      },
      {
        kind: "short_answer",
        text: "Was rät Frau Roth Patienten, die viele Ratschläge von anderen bekommen?",
        options: [],
        answer: 0,
        accept: [
          "in der Apotheke fragen",
          "lieber einmal zu viel fragen",
          "in der Apotheke nachfragen",
        ],
        explain: "„Fragen Sie lieber einmal zu viel in der Apotheke als einmal zu wenig“",
      },
    ],
  },
  {
    id: "c1-u10-l1",
    level: "C1",
    skill: "listening",
    unit: 10,
    title: "Knapp bei Kasse",
    genre: "dialogue",
    intro: "Bütçe konuşması. Para deyimleri hangi yargıyı taşıyor?",
    gloss: [
      { de: "knapp bei Kasse sein", tr: "parası kıt olmak", en: "to be short of money" },
      { de: "Geld zum Fenster hinauswerfen", tr: "parayı çöpe atmak", en: "to throw money down the drain" },
      { de: "tief in die Tasche greifen", tr: "cebinden çok para çıkarmak", en: "to dig deep" },
      { de: "ein Vermögen kosten", tr: "servete mal olmak", en: "to cost a fortune" },
      { de: "jeden Cent umdrehen", tr: "her kuruşu hesaplamak", en: "to count every penny" },
      { de: "auf Heller und Pfennig", tr: "kuruşuna kadar", en: "down to the last penny" },
      { de: "die Kosten im Griff haben", tr: "maliyeti kontrol altında tutmak", en: "to have costs under control" },
      { de: "der Vorstand", tr: "yönetim kurulu", en: "board" },
      { de: "rechnen", tr: "hesaplamak", en: "to calculate" },
      { de: "genau", tr: "tam olarak", en: "exactly" },
      { de: "die Formulierung", tr: "ifade biçimi", en: "wording" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Frau Bode", text: "Die neue Software kostet ein Vermögen. Vierzigtausend im ersten Jahr." },
      { speaker: "Herr Lorenz", text: "Und die alte kostet uns jeden Monat drei Tage Handarbeit." },
      { speaker: "Frau Bode", text: "Trotzdem: Wir sind knapp bei Kasse. Der Vorstand dreht gerade jeden Cent um." },
      { speaker: "Herr Lorenz", text: "Dann müssen wir es so rechnen, dass er es nachvollziehen kann. Drei Tage im Monat sind sechsunddreißig im Jahr." },
      { speaker: "Frau Bode", text: "Das ist ein Argument. Aber ich möchte es auf Heller und Pfennig belegen, nicht schätzen." },
      { speaker: "Herr Lorenz", text: "Einverstanden. Ich ziehe die Stundenzettel." },
      { speaker: "Frau Bode", text: "Und noch etwas: Sagen Sie im Vorstand bitte nicht, die alte Lösung sei Geld zum Fenster hinausgeworfen." },
      { speaker: "Herr Lorenz", text: "Warum nicht? Es stimmt doch." },
      { speaker: "Frau Bode", text: "Weil zwei der Anwesenden sie damals beschlossen haben. Sagen Sie lieber: Wir haben die Kosten damit nicht im Griff." },
      { speaker: "Herr Lorenz", text: "Verstanden. Gleiche Aussage, kein Vorwurf." },
      { speaker: "Frau Bode", text: "Genau. Wir müssen einmal tief in die Tasche greifen — nicht jemanden bloßstellen." },
    ],
    questions: [
      {
        text: "Warum soll Herr Lorenz „Geld zum Fenster hinausgeworfen“ nicht sagen?",
        options: [
          "Weil es unhöflich klingt",
          "Weil zwei Anwesende die alte Lösung beschlossen haben",
          "Weil es zu umgangssprachlich ist",
        ],
        answer: 1,
        explain: "Deyim yargı taşıyor ve yargı odadaki kişilere düşüyor.",
      },
      {
        kind: "gapfill",
        text: "Wir sind ___ bei Kasse.",
        options: [],
        answer: 0,
        accept: ["knapp"],
        explain: "knapp bei Kasse sein: para sıkıntısı — nötr ve toplantıda kullanılabilir.",
      },
      {
        text: "Welche Formulierung schlägt Frau Bode stattdessen vor?",
        options: [
          "Die alte Lösung war ein Fehler.",
          "Wir haben die Kosten damit nicht im Griff.",
          "Das hat ein Vermögen gekostet.",
        ],
        answer: 1,
        explain: "„Gleiche Aussage, kein Vorwurf.“ Aynı bilgiyi veriyor ama kimseyi suçlamıyor.",
      },
      {
        kind: "dictation",
        text: "Frau Bode'nin kanıt konusundaki isteğini söylediği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "Aber ich möchte es auf Heller und Pfennig belegen, nicht schätzen.",
          "Ich möchte es auf Heller und Pfennig belegen, nicht schätzen.",
        ],
        explain: "auf Heller und Pfennig: kuruşuna kadar — tahmine karşı kesinlik.",
      },
    ],
  },
  {
    id: "c1-u10-l2",
    level: "C1",
    skill: "listening",
    unit: 10,
    title: "Brauerei statt Schiff",
    genre: "dialogue",
    intro: "Şirket gezisindeki tekne turu iptal olmuş. Johanna yerine ne buldu, müdür neye dikkat çekiyor?",
    gloss: [
      { de: "dosiert", tr: "dozunda", en: "in measured amounts" },
      { de: "unauffällig", tr: "göze batmayan", en: "unobtrusive" },
      { de: "der Zusammenhang", tr: "bağlam", en: "context" },
      { de: "ins Wasser fallen", tr: "suya düşmek", en: "to fall through" },
      { de: "auf Anhieb", tr: "ilk seferde", en: "right away" },
      { de: "im Gegenzug", tr: "buna karşılık", en: "in return" },
      { de: "der Betriebsausflug", tr: "şirket gezisi", en: "company outing" },
      { de: "die Reederei", tr: "gemi işletmesi", en: "shipping company" },
      { de: "die Werft", tr: "tersane", en: "shipyard" },
      { de: "ausgerechnet", tr: "tam da", en: "of all things" },
      { de: "die Brauerei", tr: "bira fabrikası", en: "brewery" },
      { de: "der Biergarten", tr: "bira bahçesi", en: "beer garden" },
      { de: "abfragen", tr: "sormak", en: "to ask about" },
      { de: "sozusagen", tr: "tabiri caizse", en: "so to speak" },
      { de: "extra", tr: "ayrıca", en: "separately" },
      { de: "höchstens", tr: "en fazla", en: "at most" },
      { de: "der Standort", tr: "yer", en: "location" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Herr Vogt", text: "Frau Thiel, wie steht es um den Betriebsausflug? Die Einladung sollte doch heute rausgehen." },
      { speaker: "Johanna", text: "Leider ist die Schifffahrt ins Wasser gefallen. Die Reederei hat gestern abgesagt, das Schiff muss in die Werft." },
      { speaker: "Herr Vogt", text: "Ausgerechnet. Und jetzt?" },
      { speaker: "Johanna", text: "Ich habe auf Anhieb etwas Neues gefunden: eine Führung durch die Brauerei am Hafen, danach Essen im Biergarten." },
      { speaker: "Herr Vogt", text: "Eine Brauerei? Wir haben Kollegen, die keinen Alkohol trinken." },
      { speaker: "Johanna", text: "Daran habe ich gedacht. Es gibt alkoholfreies Bier und Limonaden aus eigener Herstellung, und bei der Führung geht es vor allem um die Geschichte des Hauses." },
      { speaker: "Herr Vogt", text: "Gut. Und die Kosten? Das Schiff hätte zweitausend Euro gekostet." },
      { speaker: "Johanna", text: "Die Brauerei nimmt achtzehnhundert. Im Gegenzug möchte sie ein Foto der Gruppe für ihre Internetseite." },
      { speaker: "Herr Vogt", text: "Damit muss jeder einverstanden sein. Fragen Sie das vorher ab, nicht erst vor Ort." },
      { speaker: "Johanna", text: "Mache ich. Ich frage auch unauffällig nach, wer vegetarisch isst, damit sich niemand extra melden muss." },
      { speaker: "Herr Vogt", text: "Sehr gut. Und das Programm? Letztes Jahr gab es fünf Reden." },
      { speaker: "Johanna", text: "Diesmal nur eine, von Ihnen, höchstens fünf Minuten. Dosiert, sozusagen." },
      { speaker: "Herr Vogt", text: "Sie sind streng. Was soll ich denn sagen?" },
      { speaker: "Johanna", text: "Ein Dank an das Team und ein Satz zum neuen Standort. Den Zusammenhang kennt ja jeder, den müssen Sie nicht erklären." },
      { speaker: "Herr Vogt", text: "Und wenn es regnet?" },
      { speaker: "Johanna", text: "Dann sitzen wir in der Brauerei statt im Garten. Diesmal fällt nichts ins Wasser." },
      { speaker: "Herr Vogt", text: "Dann schicken Sie die Einladung heute noch raus." },
    ],
    questions: [
      {
        text: "Warum findet die Schifffahrt nicht statt?",
        options: [
          "Das Schiff muss in die Werft",
          "Das Wetter ist zu schlecht",
          "Sie war zu teuer",
        ],
        answer: 0,
        explain: "„Die Reederei hat gestern abgesagt, das Schiff muss in die Werft.“",
      },
      {
        kind: "gapfill",
        text: "Ich frage auch ___ nach, wer vegetarisch isst, damit sich niemand extra melden muss.",
        options: [],
        answer: 0,
        accept: ["unauffällig"],
        explain: "Johanna bunu dikkat çekmeden soracak; kimse ayrıca bildirimde bulunmak zorunda kalmayacak.",
      },
      {
        text: "Was möchte die Brauerei im Gegenzug?",
        options: [
          "Eine Rede von Herrn Vogt",
          "Ein Foto der Gruppe für ihre Internetseite",
          "Einen Auftrag für das nächste Jahr",
        ],
        answer: 1,
        explain: "„Im Gegenzug möchte sie ein Foto der Gruppe für ihre Internetseite.“",
      },
      {
        kind: "short_answer",
        text: "Wie lange darf Herrn Vogts Rede höchstens dauern?",
        options: [],
        answer: 0,
        accept: ["fünf Minuten", "höchstens fünf Minuten", "5 Minuten"],
        explain: "„Diesmal nur eine, von Ihnen, höchstens fünf Minuten.“",
      },
    ],
  },
  {
    id: "c1-u10-w1",
    level: "C1",
    skill: "writing",
    unit: 10,
    title: "Notizen zum Budget",
    genre: "grammar",
    intro: "Aynı olguyu iki deyimle söyle: biri suçlar, öteki tarif eder.",
    gloss: [
      { de: "die Kosten im Griff haben", tr: "maliyeti kontrol altında tutmak", en: "to have costs under control" },
      { de: "Geld zum Fenster hinauswerfen", tr: "parayı çöpe atmak", en: "to throw money away" },
      { de: "sinngemäß", tr: "anlamca", en: "in substance" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Maliyeti bununla kontrol altında tutamadık.",
        answer: "Wir haben die Kosten damit nicht im Griff gehabt",
        hint: "im Griff haben: yargısız, olguyu tarif eden biçim.",
      },
      {
        kind: "build",
        tr: "Bir kez cebimizden çok para çıkarmamız gerekiyor.",
        answer: "Wir müssen einmal tief in die Tasche greifen",
        hint: "tief in die Tasche greifen: harcamayı kabul, suçlama yok.",
      },
      {
        kind: "build",
        tr: "Toplantı suya düştü.",
        answer: "Der Termin ist ins Wasser gefallen",
        hint: "sein ile çekiliyor; olgu bildiriyor, kimseyi işaret etmiyor.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi yargısız hâle getir: aynı olgu kalsın, suçlama gitsin.",
        source: "Die alte Lösung war Geld zum Fenster hinausgeworfen.",
        answer: "Mit der alten Lösung hatten wir die Kosten nicht im Griff.",
        alternatives: [
          "Mit der alten Lösung hatten wir die Kosten nicht im Griff",
          "Die alte Lösung hat die Kosten nicht im Griff gehalten.",
        ],
        why: "İki cümle aynı olguyu bildiriyor ama birincisi kararı verenleri de yargılıyor. Toplantıda o kişiler oturuyorsa deyim tartışmayı olgudan kişiye kaydırır — C1'de deyim seçimi bir nezaket değil, strateji meselesidir.",
      },
    ],
  },
  {
    id: "c1-u10-w2",
    level: "C1",
    skill: "writing",
    unit: 10,
    title: "Zwei Bilder, nicht acht",
    genre: "text",
    intro: "Deyimle dolu bir metni seyrelt: altısını at, ikisini bırak, iki somut cümle yaz.",
    gloss: [
      { de: "dosiert", tr: "dozunda", en: "in measured amounts" },
      { de: "unauffällig", tr: "göze batmayan", en: "unobtrusive" },
      { de: "der Zusammenhang", tr: "bağlam", en: "context" },
      { de: "einstreuen", tr: "serpiştirmek", en: "to sprinkle in" },
      { de: "veranschlagen", tr: "öngörmek", en: "to estimate" },
      { de: "finanziell", tr: "mali", en: "financial" },
      { de: "der Vertrieb", tr: "satış bölümü", en: "sales department" },
      { de: "der Start", tr: "başlangıç", en: "start" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "reply",
        prompt:
          "Aşağıdaki metin deyimle dolu. Yeniden yaz: en fazla İKİ deyim bırak (taşıyan ve göze batmayan olanları seç), kalanları at ve yerine en az iki SOMUT cümle koy — rakam, tarih ya da ayrıntı. Bilgi kaybolmasın.",
        stimulus:
          "DÜZELTİLECEK METİN (proje raporu girişi):\n\n" +
          "Das Projekt ist im letzten Quartal ins Wasser gefallen. Wir haben Geld zum Fenster hinausgeworfen, mussten tief in die Tasche greifen und standen am Ende doch mit leeren Händen da. Der Kollege aus dem Vertrieb hat von Anfang an den Ton angegeben, während wir nach seiner Pfeife getanzt haben. Auf Anhieb schien alles das Gelbe vom Ei zu sein, aber im Gegenzug hat niemand die Kosten im Griff gehabt. Unterm Strich haben wir aus einer Mücke einen Elefanten gemacht.",
        checklist: [
          "En fazla iki deyim kaldı mı?",
          "Kalan deyimler taşıyor ve göze batmıyor mu?",
          "En az iki somut cümle (rakam, tarih, ayrıntı) eklendi mi?",
          "Suçlayıcı deyimler yargısız ifadeyle mi değiştirildi?",
        ],
        minWords: 80,
        phrases: [
          { de: "Das Projekt ist im letzten Quartal ins Wasser gefallen.", tr: "proje geçen çeyrekte suya düştü", en: "the project fell through last quarter" },
          { de: "Die Zuständigkeit war zu keinem Zeitpunkt schriftlich geregelt.", tr: "yetki hiçbir aşamada yazılı olarak belirlenmemişti", en: "responsibility was never set down in writing" },
          { de: "Wir haben die Kosten nicht im Griff gehabt.", tr: "maliyeti kontrol altında tutamadık", en: "we did not have the costs under control" },
        ],
        sample:
          "Das Projekt ist im letzten Quartal ins Wasser gefallen.\n\n" +
          "Die Kosten haben wir dabei nicht im Griff gehabt: Von veranschlagten 90.000 Euro sind 138.000 abgeflossen, der größte Teil davon in zwei Nachbestellungen im August und im Oktober.\n\n" +
          "Die zweite Ursache ist nicht finanzieller Art. Die Zuständigkeit war zu keinem Zeitpunkt schriftlich geregelt. Freigaben kamen aus dem Vertrieb, die Verantwortung lag formal bei uns — eine Konstellation, in der Entscheidungen schnell fallen und niemand sie später vertreten muss.\n\n" +
          "Rückblickend war der Fehler nicht die einzelne Ausgabe, sondern dass wir das Missverhältnis erst im vierten Monat angesprochen haben. Für das Folgeprojekt schlagen wir vor, Freigabegrenzen und Zuständigkeiten vor dem Start auf einer Seite festzuhalten.",
      },
    ],
  },
];
