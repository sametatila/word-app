import type { SkillExercise } from "../types";

/**
 * C1 · Ünite 9 — "Hayvan, hava, renk ve spor deyimleri".
 *
 * Dört ders: Schwein gehabt! · Ein Gewitter zieht auf · Blau machen ·
 * Am Ball bleiben.
 *
 *   Kelime: Schwein gehabt, die Katze im Sack kaufen, mit jemandem Pferde stehlen können,
 *           auf den Hund kommen, einen Bären aufbinden, den Stier bei den
 *           Hörnern packen, in den Wind reden, schwarzmalen · dicke Luft, der
 *           Lichtblick, im Trüben fischen, der Sturm im Wasserglas, eiskalt,
 *           auf Wolke sieben schweben, bei Wind und Wetter, das Eis brechen ·
 *           blaumachen, schwarzfahren, das Gelbe vom Ei, grünes Licht geben,
 *           rotsehen, eine weiße Weste haben, blauäugig, das Salz in der Suppe ·
 *           am Ball bleiben, die Latte hoch legen, ein Eigentor schießen, das
 *           Handtuch werfen, in Führung gehen, die Spielregeln kennen, aus dem
 *           Rennen sein, aus dem gleichen Holz geschnitzt
 *
 * Otuz iki deyim tek ünitede: ezberlemek imkânsız, o yüzden egzersizler
 * ezber değil ÇÖZÜMLEME öğretiyor. Her deyim ailesinin kendi mantığı var —
 * hayvanlar şansı ve aldatmayı, hava ruh hâlini ve ilişki iklimini, renkler
 * kural ihlalini, spor rekabeti ve pes etmeyi taşıyor. Aile bilinince tek tek
 * deyim tahmin edilebilir hâle geliyor.
 *
 * İkinci hat: Türkçe karşılığı olan deyim yanıltıcıdır. "Boğayı boynuzundan
 * tutmak" birebir aynı, "auf den Hund kommen" ise Türkçede hiçbir hayvan
 * taşımaz. Birebir örtüşme beklentisi C1'de en sık yapılan hatadır.
 */
export const c1U09: SkillExercise[] = [
  {
    id: "c1-u09-r1",
    level: "C1",
    skill: "reading",
    unit: 9,
    title: "Der Wohnwagen aus der Kleinanzeige",
    genre: "letter",
    intro: "Bir gazetenin okur köşesine gelen mektup: görmeden alınan bir karavan ve bozulan bir tatil planı.",
    gloss: [
      { de: "Schwein gehabt", tr: "şansı yaver gitmiş", en: "got lucky" },
      { de: "die Katze im Sack kaufen", tr: "görmeden almak", en: "to buy a pig in a poke" },
      { de: "einen Bären aufbinden", tr: "birini işletmek", en: "to pull someone's leg" },
      { de: "auf den Hund kommen", tr: "batmak", en: "to go to the dogs" },
      { de: "den Stier bei den Hörnern packen", tr: "boğayı boynuzundan tutmak", en: "to take the bull by the horns" },
      { de: "mit jemandem Pferde stehlen können", tr: "birine sonuna kadar güvenebilmek", en: "to be able to count on someone for anything" },
      { de: "in den Wind reden", tr: "boşa konuşmak", en: "to talk to a brick wall" },
      { de: "schwarzmalen", tr: "karamsarlık yaymak", en: "to paint a bleak picture" },
      { de: "der Wohnwagen", tr: "karavan", en: "camper" },
      { de: "die Kleinanzeige", tr: "küçük ilan", en: "classified ad" },
      { de: "undicht", tr: "su sızdıran", en: "leaky" },
      { de: "die Achse", tr: "aks", en: "axle" },
      { de: "die Rückbank", tr: "arka koltuk", en: "back seat" },
      { de: "der Kfz-Mechaniker", tr: "oto tamircisi", en: "car mechanic" },
      { de: "der Anhänger", tr: "römork", en: "trailer" },
      { de: "die Rubrik", tr: "köşe", en: "column" },
      { de: "also", tr: "yani", en: "so" },
      { de: "das Glück", tr: "şans", en: "luck" },
    ],
    minutes: 7,
    text:
      "DER WOHNWAGEN, DER NIE IN SPANIEN ANKAM\n\n" +
      "Zuschriften für unsere Rubrik „Pech und Glück“ bekommen wir jede Woche. Diese hier hat uns besonders gefallen.\n\n" +
      "„Im Frühjahr habe ich über eine Kleinanzeige einen gebrauchten Wohnwagen gekauft, ohne ihn vorher gesehen zu haben. Der Verkäufer wohnte angeblich in Hamburg, war am Telefon sehr freundlich und schickte mir zwanzig Fotos. Ich habe also die Katze im Sack gekauft, und das für 6.000 Euro.\n\n" +
      "Meine Frau hat mich gewarnt. Sie hat es dreimal gesagt, aber ich habe sie in den Wind reden lassen. Heute weiß ich: Der Verkäufer hat mir einen Bären aufgebunden. Der Wagen stand nicht in Hamburg, sondern auf einem Feld bei Kassel, und das Dach war undicht.\n\n" +
      "Trotzdem wollten wir im Juni nach Spanien. Nach vierzig Kilometern brach die Achse. Da standen wir, zwei Kinder auf der Rückbank, und ich konnte nur noch schwarzmalen: kein Urlaub, kein Geld, kein Wohnwagen.\n\n" +
      "Dann haben wir den Stier bei den Hörnern gepackt. Ich habe meinen alten Schulfreund Ralf angerufen, mit dem man Pferde stehlen kann. Er ist Kfz-Mechaniker, kam mit seinem Anhänger und hat die Achse in zwei Tagen für 400 Euro repariert.\n\n" +
      "Nach Spanien sind wir nicht gekommen, aber an die Ostsee. Die Kinder sagen, es war der beste Urlaub bisher. Der Wohnwagen steht jetzt bei Ralf, und im Winter renovieren wir ihn zusammen.\n\n" +
      "Schwein gehabt, würde ich sagen. Auf den Hund gekommen sind wir jedenfalls nicht.“\n\n" +
      "Lothar Kramer, Göttingen",
    questions: [
      {
        text: "Warum sagt Herr Kramer, er habe die Katze im Sack gekauft?",
        options: [
          "Er hat den Wohnwagen gekauft, ohne ihn gesehen zu haben",
          "Er hat viel zu viel bezahlt",
          "Der Wohnwagen war gestohlen",
        ],
        answer: 0,
        explain: "Karavanı hiç görmeden, yalnız fotoğraflara bakarak satın almış.",
      },
      {
        kind: "gapfill",
        text: "Sie hat es dreimal gesagt, aber ich habe sie in den ___ reden lassen.",
        options: [],
        answer: 0,
        accept: ["Wind"],
        explain: "Karısının uyarılarını dinlememiş; söyledikleri boşa gitmiş.",
      },
      {
        text: "Wer hat der Familie aus der Lage geholfen?",
        options: [
          "Der Verkäufer",
          "Ein Pannendienst aus Kassel",
          "Ein Schulfreund, der Kfz-Mechaniker ist",
        ],
        answer: 2,
        explain: "„Ich habe meinen alten Schulfreund Ralf angerufen, mit dem man Pferde stehlen kann.“",
      },
      {
        kind: "short_answer",
        text: "Wo hat die Familie am Ende Urlaub gemacht?",
        options: [],
        answer: 0,
        accept: ["an der Ostsee", "Ostsee", "an die Ostsee"],
        explain: "„Nach Spanien sind wir nicht gekommen, aber an die Ostsee.“",
      },
      {
        kind: "short_answer",
        text: "Was hat die Reparatur gekostet?",
        options: [],
        answer: 0,
        accept: ["400 Euro", "vierhundert Euro", "400"],
        explain: "„Er ist Kfz-Mechaniker, kam mit seinem Anhänger und hat die Achse in zwei Tagen für 400 Euro repariert.“",
      },
    ],
  },
  {
    id: "c1-u09-r2",
    level: "C1",
    skill: "reading",
    unit: 9,
    title: "Ein Jahr im Lager Ost",
    genre: "article",
    intro: "Şirket gazetesinde bir depo müdürünün yıl değerlendirmesi. Gerginlik neden çıktı, nasıl yatıştı?",
    gloss: [
      { de: "dicke Luft", tr: "gergin hava", en: "a tense atmosphere" },
      { de: "der Sturm im Wasserglas", tr: "bardakta fırtına", en: "a tempest in a teapot" },
      { de: "das Eis brechen", tr: "buzları eritmek", en: "to break the ice" },
      { de: "grünes Licht geben", tr: "yeşil ışık yakmak", en: "to give the green light" },
      { de: "blaumachen", tr: "işi asmak", en: "to skip work" },
      { de: "das Gelbe vom Ei", tr: "işin en iyisi", en: "the best of the bunch" },
      { de: "bei Wind und Wetter", tr: "her havada", en: "in all weathers" },
      { de: "rotsehen", tr: "tepesi atmak", en: "to see red" },
      { de: "der Lichtblick", tr: "umut ışığı", en: "ray of hope" },
      { de: "eiskalt", tr: "buz gibi / acımasız", en: "ice-cold" },
      { de: "blauäugig", tr: "saf", en: "naive" },
      { de: "die Krankmeldung", tr: "hastalık bildirimi", en: "sick note" },
      { de: "die Grippewelle", tr: "grip salgını", en: "flu wave" },
      { de: "erwischen", tr: "yakalamak", en: "to catch" },
      { de: "die Rampe", tr: "yükleme rampası", en: "loading dock" },
      { de: "die Betriebsversammlung", tr: "personel toplantısı", en: "staff meeting" },
      { de: "die Personaldecke", tr: "personel sayısı", en: "staffing level" },
      { de: "der Standortleiter", tr: "tesis müdürü", en: "site manager" },
      { de: "schimpfen", tr: "söylenmek", en: "to grumble" },
      { de: "die Halle", tr: "depo binası", en: "warehouse" },
      { de: "offen", tr: "açıkça", en: "openly" },
      { de: "im Voraus", tr: "önceden", en: "in advance" },
    ],
    minutes: 7,
    text:
      "RÜCKBLICK: EIN SCHWIERIGES JAHR IM LAGER OST\n\n" +
      "Wer im Januar durch unsere Halle ging, spürte es sofort: Es herrschte dicke Luft. Der neue Schichtplan war ohne Absprache eingeführt worden, zwei erfahrene Kolleginnen hatten gekündigt, und im Pausenraum wurde mehr geschimpft als gegessen.\n\n" +
      "Der Streit um die Parkplätze, über den damals alle sprachen, war dagegen ein Sturm im Wasserglas. Nach einer Woche hatte die Stadt zwanzig neue Plätze freigegeben, und niemand redete mehr davon.\n\n" +
      "Ernster war die Sache mit den Krankmeldungen. Im Februar fehlten an manchen Tagen zwölf Leute. Einige in der Verwaltung vermuteten sofort, hier werde blaugemacht. Das war ungerecht und, wie sich zeigte, falsch: Eine Grippewelle hatte das halbe Viertel erwischt. Wer bei Wind und Wetter an der Rampe steht, wird eben öfter krank als jemand im Büro.\n\n" +
      "Das Eis brach erst im März, bei der Betriebsversammlung. Frau Demir aus der Frühschicht sagte offen, dass sie jedes Mal rotsehe, wenn der Plan am Freitagabend für die nächste Woche geändert werde. Der Saal applaudierte, und die Geschäftsleitung gab danach grünes Licht für einen Plan, der vier Wochen im Voraus feststeht.\n\n" +
      "Seitdem gibt es Lichtblicke. Die Kündigungen haben aufgehört, und zwei neue Kollegen sind geblieben, obwohl man sie anfangs eiskalt empfangen hatte. Das Gelbe vom Ei ist der neue Plan nicht, aber er ist verlässlich.\n\n" +
      "Blauäugig wäre es allerdings, jetzt zu glauben, alle Probleme seien gelöst. Die Personaldecke ist dünn, und im Herbst kommen die großen Bestellungen. Wir bleiben dran, mit offenen Karten.\n\n" +
      "Jens Albrecht, Standortleiter",
    questions: [
      {
        text: "Warum herrschte im Januar dicke Luft?",
        options: [
          "Wegen fehlender Parkplätze",
          "Wegen eines Schichtplans ohne Absprache und zweier Kündigungen",
          "Wegen einer Grippewelle",
        ],
        answer: 1,
        explain: "Yeni vardiya planı danışılmadan getirilmiş, iki deneyimli çalışan da istifa etmişti.",
      },
      {
        kind: "gapfill",
        text: "Wer im Januar durch unsere Halle ging, spürte es sofort: Es herrschte ___ Luft.",
        options: [],
        answer: 0,
        accept: ["dicke"],
        explain: "Depoda gergin bir hava vardı; yazar bunu tek bir deyimle anlatıyor.",
      },
      {
        text: "Was steckte wirklich hinter den vielen Krankmeldungen im Februar?",
        options: [
          "Der neue Schichtplan",
          "Eine Grippewelle",
          "Blaumachen",
        ],
        answer: 1,
        explain: "„Eine Grippewelle hatte das halbe Viertel erwischt.“",
      },
      {
        kind: "short_answer",
        text: "Wofür gab die Geschäftsleitung nach der Betriebsversammlung grünes Licht?",
        options: [],
        answer: 0,
        accept: [
          "für einen verlässlichen Plan",
          "für einen Plan vier Wochen im Voraus",
          "einen Schichtplan, der vier Wochen im Voraus feststeht",
          "vier Wochen im Voraus",
        ],
        explain: "Yönetim, vardiya planının dört hafta önceden belli olmasını onayladı.",
      },
      {
        kind: "short_answer",
        text: "Warum wäre es laut Autor blauäugig, sich jetzt zurückzulehnen?",
        options: [],
        answer: 0,
        accept: [
          "die Personaldecke ist dünn",
          "im Herbst kommen große Bestellungen",
          "dünne Personaldecke und große Bestellungen",
          "wegen der Bestellungen im Herbst",
        ],
        explain: "„Die Personaldecke ist dünn, und im Herbst kommen die großen Bestellungen.“",
      },
    ],
  },
  {
    id: "c1-u09-l1",
    level: "C1",
    skill: "listening",
    unit: 9,
    title: "Am Ball bleiben",
    genre: "dialogue",
    intro: "Spor deyimleri bir proje konuşmasında. Hangisi neyi söylüyor?",
    gloss: [
      { de: "am Ball bleiben", tr: "peşini bırakmamak", en: "to stay on the ball" },
      { de: "das Handtuch werfen", tr: "havlu atmak", en: "to throw in the towel" },
      { de: "ein Eigentor schießen", tr: "kendi kalesine gol atmak", en: "to score an own goal" },
      { de: "die Latte hoch legen", tr: "çıtayı yükseltmek", en: "to set the bar high" },
      { de: "in Führung gehen", tr: "öne geçmek", en: "to take the lead" },
      { de: "die Spielregeln kennen", tr: "oyunun kurallarını bilmek", en: "to know the rules" },
      { de: "aus dem Rennen sein", tr: "yarış dışı kalmak", en: "to be out of the running" },
      { de: "lehrreich", tr: "öğretici", en: "instructive" },
      { de: "niedrig", tr: "düşük", en: "low" },
      { de: "hingehören", tr: "ait olmak", en: "to belong" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Nora", text: "Vier Absagen in zwei Wochen. Ich überlege, das Handtuch zu werfen." },
      { speaker: "Ilhan", text: "Bevor du das tust: Wie viele Angebote hast du überhaupt abgegeben?" },
      { speaker: "Nora", text: "Sechs." },
      { speaker: "Ilhan", text: "Dann bist du nicht aus dem Rennen, du hast erst angefangen." },
      { speaker: "Nora", text: "Beim letzten hätte es fast geklappt. Bis ich in der Mail den Preis genannt habe, bevor sie gefragt haben." },
      { speaker: "Ilhan", text: "Das war ein Eigentor, ja. Aber ein lehrreiches." },
      { speaker: "Nora", text: "Ich weiß. Ich kannte die Spielregeln nicht." },
      { speaker: "Ilhan", text: "Die kennt am Anfang niemand. Wichtig ist, dass du am Ball bleibst — sechs Angebote sind keine Statistik." },
      { speaker: "Nora", text: "Und wenn ich die Latte etwas niedriger lege? Kleinere Aufträge zuerst?" },
      { speaker: "Ilhan", text: "Das ist keine Aufgabe, das ist Strategie. Mit drei kleinen Referenzen gehst du beim vierten Angebot in Führung." },
      { speaker: "Nora", text: "Ich habe mit dem Preis wohl wirklich ein Eigentor geschossen." },
      { speaker: "Ilhan", text: "Einmal. Und beim nächsten Mal legst du die Latte da hoch, wo sie hingehört — nach der Frage, nicht davor." },
      { speaker: "Nora", text: "Gut. Dann schreibe ich heute Abend zwei neue." },
    ],
    questions: [
      {
        text: "Was war Noras „Eigentor“?",
        options: [
          "Sie hat zu spät geantwortet.",
          "Sie hat den Preis genannt, bevor danach gefragt wurde.",
          "Sie hat zu wenige Angebote geschickt.",
        ],
        answer: 1,
        explain: "Kendi kalesine gol: kendi elleriyle pozisyonunu bozmak.",
      },
      {
        kind: "gapfill",
        text: "Wichtig ist, dass du am ___ bleibst.",
        options: [],
        answer: 0,
        accept: ["Ball"],
        explain: "am Ball bleiben: peşini bırakmamak. Edat ve artikel sabit.",
      },
      {
        text: "Wie bewertet Ilhan den Vorschlag, kleinere Aufträge zu nehmen?",
        options: [
          "Als Aufgeben",
          "Als Strategie",
          "Als Zeitverlust",
        ],
        answer: 1,
        explain: "„Das ist keine Aufgabe, das ist Strategie.“ Çıtayı indirmek pes etmek değil.",
      },
      {
        kind: "dictation",
        text: "Ilhan'ın altı teklifin istatistik olmadığını söylediği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "sechs Angebote sind keine Statistik",
          "Sechs Angebote sind keine Statistik.",
        ],
        explain: "Sayı azken sonuç çıkarmamak — deyimin taşıdığı asıl öğüt.",
      },
    ],
  },
  {
    id: "c1-u09-l2",
    level: "C1",
    skill: "listening",
    unit: 9,
    title: "Verlobt nach acht Monaten",
    genre: "dialogue",
    intro: "Meral nişanlanmış ve hemen ev almak istiyor. Bernd'in çekincesi ne, Meral sonunda neye karar veriyor?",
    gloss: [
      { de: "auf Wolke sieben schweben", tr: "bulutların üstünde olmak", en: "to be on cloud nine" },
      { de: "blauäugig", tr: "saf", en: "naive" },
      { de: "der Lichtblick", tr: "umut ışığı", en: "ray of hope" },
      { de: "schwarzmalen", tr: "karamsarlık yaymak", en: "to paint a bleak picture" },
      { de: "rotsehen", tr: "tepesi atmak", en: "to see red" },
      { de: "strahlen", tr: "ışıl ışıl olmak", en: "to beam" },
      { de: "der Kredit", tr: "kredi", en: "loan" },
      { de: "die Trennung", tr: "ayrılık", en: "separation" },
      { de: "der Notar", tr: "noter", en: "notary" },
      { de: "der Anteil", tr: "pay", en: "share" },
      { de: "erleichtert", tr: "rahatlamış", en: "relieved" },
      { de: "die Zinsen", tr: "faiz", en: "interest" },
      { de: "überstürzen", tr: "aceleye getirmek", en: "to rush" },
      { de: "also", tr: "yani", en: "so" },
      { de: "der Streit", tr: "tartışma", en: "argument" },
      { de: "heiraten", tr: "evlenmek", en: "to marry" },
      { de: "sinken", tr: "düşmek", en: "to fall" },
      { de: "verrückt", tr: "çılgın", en: "crazy" },
      { de: "zahlen", tr: "ödemek", en: "to pay" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Bernd", text: "Du strahlst ja heute. Gibt es etwas zu feiern?" },
      { speaker: "Meral", text: "Ich schwebe auf Wolke sieben. Am Wochenende hat mich Deniz gefragt, ob ich ihn heirate." },
      { speaker: "Bernd", text: "Herzlichen Glückwunsch! Wie lange kennt ihr euch jetzt?" },
      { speaker: "Meral", text: "Seit Februar. Ich weiß, das ist nicht lange. Aber wir wollen schon im Herbst zusammen eine Wohnung kaufen." },
      { speaker: "Bernd", text: "Kaufen? Nicht erst mieten?" },
      { speaker: "Meral", text: "Die Mieten in Köln sind verrückt. Für drei Zimmer zahlt man inzwischen fast zweitausend Euro im Monat." },
      { speaker: "Bernd", text: "Das stimmt. Trotzdem: Wer nach acht Monaten gemeinsam einen Kredit über dreißig Jahre aufnimmt, ist ein bisschen blauäugig, findest du nicht?" },
      { speaker: "Meral", text: "Jetzt übertreib mal nicht. Wir sind beide keine Kinder mehr." },
      { speaker: "Bernd", text: "Ich will nicht schwarzmalen. Ich habe das selbst erlebt. Meine erste Wohnung habe ich mit meiner damaligen Freundin gekauft, und nach der Trennung gab es zwei Jahre Streit über den Verkauf." },
      { speaker: "Meral", text: "Das tut mir leid. Was hat euch damals gefehlt?" },
      { speaker: "Bernd", text: "Ein Vertrag. Beim Notar hätten wir festlegen können, wem welcher Anteil gehört. Wir dachten, so etwas braucht man nur, wenn man sich nicht vertraut." },
      { speaker: "Meral", text: "Ich glaube, Deniz würde rotsehen, wenn ich ihm einen Vertrag vorlege." },
      { speaker: "Bernd", text: "Vielleicht. Oder er ist erleichtert. Ein Lichtblick ist ja, dass die Zinsen gerade sinken. Ihr müsst also nichts überstürzen." },
      { speaker: "Meral", text: "Du meinst, wir sollten erst ein Jahr zusammen mieten?" },
      { speaker: "Bernd", text: "Das wäre mein Rat. Wenn ihr dann noch kaufen wollt, kauft ihr mit mehr Wissen und weniger Eile." },
      { speaker: "Meral", text: "Ich glaube, das sage ich ihm heute Abend. Die Hochzeit bleibt, die Wohnung wartet." },
    ],
    questions: [
      {
        text: "Warum ist Meral so glücklich?",
        options: [
          "Sie hat eine Wohnung gefunden",
          "Sie hat sich verlobt",
          "Sie hat eine neue Stelle",
        ],
        answer: 1,
        explain: "Deniz ona evlenme teklif etmiş; Meral bu yüzden bulutların üstünde.",
      },
      {
        kind: "gapfill",
        text: "Wer nach acht Monaten gemeinsam einen Kredit über dreißig Jahre aufnimmt, ist ein bisschen ___.",
        options: [],
        answer: 0,
        accept: ["blauäugig"],
        explain: "Bernd'e göre bu kadar erken ortak kredi çekmek saflık: riskler görülmüyor.",
      },
      {
        text: "Was hat Bernd bei seinem ersten Wohnungskauf gefehlt?",
        options: [
          "Genug Eigenkapital",
          "Ein Vertrag beim Notar",
          "Ein guter Makler",
        ],
        answer: 1,
        explain: "„Ein Vertrag. Beim Notar hätten wir festlegen können, wem welcher Anteil gehört.“",
      },
      {
        kind: "short_answer",
        text: "Zu welchem Schluss kommt Meral am Ende?",
        options: [],
        answer: 0,
        accept: [
          "erst mieten, später kaufen",
          "die Wohnung wartet",
          "erst ein Jahr mieten",
          "mit dem Kauf warten",
        ],
        explain: "„Die Hochzeit bleibt, die Wohnung wartet.“",
      },
    ],
  },
  {
    id: "c1-u09-w1",
    level: "C1",
    skill: "writing",
    unit: 9,
    title: "Rückblick auf ein Projekt",
    genre: "grammar",
    intro: "Deyimde artikel, edat ve sıfat çekimi donmuştur — tek harf değişince bozulur.",
    gloss: [
      { de: "den Stier bei den Hörnern packen", tr: "boğayı boynuzundan tutmak", en: "to take the bull by the horns" },
      { de: "grünes Licht geben", tr: "yeşil ışık yakmak", en: "to give the green light" },
      { de: "das Handtuch werfen", tr: "havlu atmak", en: "to throw in the towel" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Boğayı boynuzundan tuttuk.",
        answer: "Wir haben den Stier bei den Hörnern gepackt",
        hint: "bei den Hörnern: edat ve çoğul artikel sabit.",
      },
      {
        kind: "build",
        tr: "Yönetim projeye yeşil ışık yaktı.",
        answer: "Die Leitung hat dem Projekt grünes Licht gegeben",
        hint: "Yeşil ışık verilen taraf yönelme hâlinde; sıfat artikelsiz çekiliyor.",
      },
      {
        kind: "build",
        tr: "Üçüncü denemeden sonra havlu attı.",
        answer: "Nach dem dritten Versuch hat sie das Handtuch geworfen",
        hint: "das Handtuch: artikel deyimin parçası, çıkarılamaz.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: deyimin sabit parçası değiştirilmiş.",
        source: "Wir haben den Stier bei seinen Hörnern gepackt.",
        answer: "Wir haben den Stier bei den Hörnern gepackt.",
        alternatives: ["Wir haben den Stier bei den Hörnern gepackt"],
        why: "Deyimdeki artikel dilbilgisel bir seçim değil, kalıbın parçasıdır. „seinen“ mantıklı görünür ama deyimi bozar ve cümle anadili konuşana yabancı gelir — C1'de ölçülen tam bu duyarlılıktır.",
      },
    ],
  },
  {
    id: "c1-u09-w2",
    level: "C1",
    skill: "writing",
    unit: 9,
    title: "Ein Bericht ohne schiefe Bilder",
    genre: "formal",
    intro: "Deyim kullan ama yerinde: durumu tarif et, kişiyi suçlama.",
    gloss: [
      { de: "dicke Luft", tr: "gergin hava", en: "tense atmosphere" },
      { de: "der Sturm im Wasserglas", tr: "bardakta fırtına", en: "a tempest in a teapot" },
      { de: "das Eis brechen", tr: "buzları eritmek", en: "to break the ice" },
      { de: "im Trüben fischen", tr: "bulanık suda balık avlamak", en: "to fish in troubled waters" },
      { de: "der Lichtblick", tr: "umut ışığı", en: "ray of hope" },
      { de: "strittig", tr: "ihtilaflı", en: "disputed" },
      { de: "kassieren", tr: "geri çevirmek / iptal etmek", en: "to overturn" },
      { de: "also", tr: "yani", en: "so" },
      { de: "genau", tr: "tam olarak", en: "exactly" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "reply",
        prompt:
          "Aşağıdaki durumu bir ekip raporunda anlat. En az üç deyim kullan — ama kuralı tut: durumu tarif eden deyimler serbest, kişi hakkında olanlar yasak. Suçlama yapma, olguyu ve önerini yaz.",
        stimulus:
          "DURUM — İki ekip arasında altı haftadır süren gerginlik\n\n" +
          "— Ortak proje: veri aktarımı, teslim iki kez ertelendi\n" +
          "— Toplantılarda karşılıklı iğneleme, ortak toplantı sayısı 6'dan 2'ye düştü\n" +
          "— Asıl anlaşmazlık teknik değil: kimin hangi karara yetkili olduğu belirsiz\n" +
          "— Geçen hafta iki geliştirici kendiliğinden birlikte öğle yemeği yedi, sonrasında iki gün sorunsuz geçti\n" +
          "— Öneri: yetki tablosu ve haftada bir kısa ortak durum toplantısı",
        checklist: [
          "En az üç deyim var mı?",
          "Deyimler durumu mu tarif ediyor (kişiyi değil)?",
          "Asıl anlaşmazlık doğru adlandırıldı mı?",
          "Somut bir öneri var mı?",
        ],
        minWords: 90,
        phrases: [
          { de: "Zwischen den Teams herrscht seit Wochen dicke Luft.", tr: "ekipler arasında haftalardır gergin bir hava var", en: "there has been a tense atmosphere between the teams for weeks" },
          { de: "Das ist kein Sturm im Wasserglas.", tr: "bu bardakta fırtına değil", en: "this is not a tempest in a teapot" },
          { de: "Solange die Zuständigkeit unklar ist, fischen alle im Trüben.", tr: "yetki belirsiz kaldıkça herkes bulanık suda balık avlıyor", en: "as long as responsibility is unclear, everyone is fishing in troubled waters" },
        ],
        sample:
          "Zwischen den beiden Teams herrscht seit gut sechs Wochen dicke Luft. Die gemeinsamen Termine sind von sechs auf zwei gesunken, die Übergabe wurde zweimal verschoben.\n\n" +
          "Das ist kein Sturm im Wasserglas. Es wäre aber falsch, die Ursache im Technischen zu suchen: Die Schnittstelle funktioniert. Strittig ist, wer welche Entscheidung treffen darf. Solange das unklar bleibt, fischen beide Seiten im Trüben — jede Freigabe kann von der anderen kassiert werden, und das erklärt den Ton in den Sitzungen besser als jede Charakterfrage.\n\n" +
          "Ein Lichtblick: Vergangene Woche haben zwei Entwickler von sich aus zusammen Mittag gegessen. Die beiden Tage danach liefen ohne Eskalation. Das Eis lässt sich also brechen, es braucht nur einen Anlass.\n\n" +
          "Vorschlag: eine Zuständigkeitstabelle auf einer Seite, abgestimmt bis Freitag, und ein wöchentlicher Kurztermin von fünfzehn Minuten. Beides kostet wenig und nimmt der Lage genau das, was sie am Leben hält.",
      },
    ],
  },
];
