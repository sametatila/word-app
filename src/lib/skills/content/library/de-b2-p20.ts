import type { SkillExercise } from "../../types";

/**
 * DE · B2 — Beceriler kütüphanesi, parti 20.
 *
 * B2 hücresini YİRMİYE tamamlayan son parti. Kurallar ve emsal: `de-b2.ts`
 * (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 20 bahşiş ve lokanta emeği hattı: kart terminalinin önerdiği bahşiş
 * oranları üzerine bir gazete yazısı, bahşişi kaldıran bir lokanta sahibiyle
 * radyo söyleşisi, kartla gelen bahşişin paylaşımını soran bir e-posta.
 * Dil bilgisi zu-mastarının geçmiş ve edilgen biçimleri — B1'deki
 * „zu + mastar“ın bir adım ötesi: gelesen zu haben, eingeladen zu werden,
 * scheinen zu.
 */
export const deB2P20: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b2-lib-r20",
    course: "de",
    level: "B2",
    skill: "reading",
    title: "Zehn, fünfzehn oder zwanzig Prozent?",
    genre: "article",
    intro: "Bir gazete yazısı: kart terminalleri artık bahşiş oranı öneriyor; misafirler ne hissediyor, para kime gidiyor, bir hukukçu ne diyor.",
    gloss: [
      { de: "das Trinkgeld", tr: "bahşiş", en: "tip" },
      { de: "der Mindestlohn", tr: "asgari ücret", en: "minimum wage" },
      { de: "die Verbraucherzentrale", tr: "tüketici danışma merkezi", en: "consumer advice center" },
      { de: "der Betrieb", tr: "işletme", en: "business" },
      { de: "verrechnen", tr: "mahsup etmek", en: "to offset" },
      { de: "die Gelassenheit", tr: "soğukkanlılık", en: "composure" },
    ],
    minutes: 8,
    text:
      "Zehn, fünfzehn oder zwanzig Prozent?\n\n" +
      "Wer im Café mit Karte zahlt, muss immer öfter eine Frage beantworten, bevor die Zahlung durchgeht: " +
      "Auf dem Display erscheinen drei Felder mit Prozentzahlen, darunter klein „Kein Trinkgeld“. Früher " +
      "rundete man einfach auf oder nannte einen Betrag. Heute schaut die Bedienung zu, während man tippt.\n\n" +
      "Viele Gäste finden das unangenehm. In einer Umfrage der Verbraucherzentrale gab jeder Dritte an, " +
      "schon einmal mehr gegeben zu haben, als er eigentlich wollte. „Man hat das Gefühl, beobachtet zu " +
      "werden“, sagt eine Studentin aus Leipzig. „Und beim Bäcker, wo ich nur ein Brötchen hole, sind zehn " +
      "Prozent ohnehin seltsam.“\n\n" +
      "Für die Beschäftigten sieht die Rechnung anders aus. Seit es die Felder gibt, ist das Trinkgeld in " +
      "vielen Betrieben deutlich gestiegen, bei einer Kette nach eigenen Angaben um fast ein Drittel. Eine " +
      "Kellnerin in Köln sagt, ohne Trinkgeld käme sie mit dem Mindestlohn kaum über den Monat.\n\n" +
      "Offen ist allerdings oft, wer das Geld am Ende bekommt. Bargeld landet meist direkt in der Tasche " +
      "der Bedienung; Trinkgeld per Karte läuft dagegen über das Konto des Betriebs. Rechtlich gehört es " +
      "den Beschäftigten, erklärt die Arbeitsrechtlerin Sabine Horn. „Der Arbeitgeber darf es weder behalten " +
      "noch mit dem Lohn verrechnen.“ Wer unsicher sei, solle nachfragen, wie das Geld verteilt werde.\n\n" +
      "Den Gästen rät Horn zu mehr Gelassenheit: Trinkgeld bleibe freiwillig, auch wenn der Bildschirm " +
      "etwas anderes nahelege.",
    questions: [
      {
        text: "Was hat sich beim Bezahlen mit Karte verändert?",
        options: [
          "Das Gerät schlägt feste Prozente vor.",
          "Trinkgeld geht nur noch in bar.",
          "Die Bedienung nennt den Betrag.",
        ],
        answer: 0,
        explain: "Ekranda yüzde yazan üç alan çıkıyor, altında küçük harflerle „Kein Trinkgeld“.",
      },
      {
        text: "Was gab in der Umfrage jeder Dritte an?",
        options: [
          "grundsätzlich kein Trinkgeld zu geben",
          "lieber mit Bargeld zu bezahlen",
          "schon einmal zu viel gegeben zu haben",
        ],
        answer: 2,
        explain: "Her üç kişiden biri istediğinden fazlasını vermiş olduğunu söylemiş.",
      },
      {
        kind: "truefalse",
        text: "Seit es die Felder gibt, bekommen viele Beschäftigte weniger Trinkgeld.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Tersine, pek çok işletmede bahşiş belirgin biçimde artmış, bir zincirde neredeyse üçte bir.",
      },
      {
        kind: "gapfill",
        text: "Trinkgeld per Karte läuft über das ___ des Betriebs.",
        options: [],
        answer: 0,
        accept: ["Konto"],
        explain: "„Trinkgeld per Karte läuft dagegen über das Konto des Betriebs.“",
      },
      {
        kind: "short_answer",
        text: "Wem gehört das Trinkgeld laut Sabine Horn rechtlich?",
        options: [],
        answer: 0,
        accept: ["den Beschäftigten", "Beschäftigten", "dem Personal"],
        explain: "„Rechtlich gehört es den Beschäftigten“ — işveren onu tutamaz ve maaştan düşemez.",
      },
      {
        text: "Was rät Horn den Gästen?",
        options: [
          "immer zehn Prozent zu geben",
          "ruhig zu bleiben, es ist freiwillig",
          "nur noch bar zu bezahlen",
        ],
        answer: 1,
        explain: "Ekran başka bir şey ima etse de bahşiş gönüllü kalıyor; bu yüzden soğukkanlılık öneriyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b2-lib-l20",
    course: "de",
    level: "B2",
    skill: "listening",
    title: "Service inklusive",
    genre: "interview",
    intro: "Radyo söyleşisi: iki yıl önce bahşişi kaldırıp fiyatları artıran bir lokanta sahibi neden bunu yaptığını ve kimin kazanıp kimin kaybettiğini anlatıyor.",
    gloss: [
      { de: "großzügig", tr: "cömert", en: "generous" },
      { de: "enthalten", tr: "dahil", en: "included" },
      { de: "die Weiterbildung", tr: "mesleki eğitim", en: "further training" },
      { de: "einverstanden", tr: "razı", en: "in agreement" },
      { de: "das Personal", tr: "personel", en: "staff" },
      { de: "der Wirt", tr: "lokanta sahibi", en: "restaurant owner" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Moderatorin", text: "Frau Lorenz, in Ihrem Restaurant gibt es seit zwei Jahren kein Trinkgeld mehr. Wie kam es dazu?" },
      { speaker: "Frau Lorenz", text: "Mich hat gestört, dass die Küche leer ausging. Die Köche arbeiten genauso hart, aber das Geld landete fast nur beim Service. Und mancher Abend hing davon ab, wie großzügig ein einzelner Tisch war." },
      { speaker: "Moderatorin", text: "Was haben Sie stattdessen gemacht?" },
      { speaker: "Frau Lorenz", text: "Wir haben alle Preise um fünfzehn Prozent erhöht und zahlen jetzt allen deutlich mehr als den Mindestlohn. Auf der Karte steht: Der Service ist im Preis enthalten." },
      { speaker: "Moderatorin", text: "Wie haben die Gäste reagiert?" },
      { speaker: "Frau Lorenz", text: "Die meisten fanden es gut, aber einige wollten trotzdem etwas geben. Dieses Geld kommt heute in eine Kasse für Weiterbildungen, über die das ganze Team gemeinsam entscheidet." },
      { speaker: "Moderatorin", text: "Und Ihre Mitarbeiter? Waren alle einverstanden?" },
      { speaker: "Frau Lorenz", text: "Nein. Zwei Kellnerinnen haben gekündigt, weil sie am Wochenende mit Trinkgeld mehr verdient hatten. Das verstehe ich. Wer gut ist und viel arbeitet, verliert bei unserem Modell etwas." },
      { speaker: "Frau Lorenz", text: "Dafür bleiben die anderen länger. Früher haben wir jedes Jahr fast die Hälfte des Personals neu gesucht, im letzten Jahr nur zwei Leute." },
      { speaker: "Moderatorin", text: "Würden Sie das anderen Wirten empfehlen?" },
      { speaker: "Frau Lorenz", text: "Nur wenn sie offen darüber reden. Man darf nicht einfach die Preise erhöhen, ohne den Gästen den Grund zu erklären. Sonst glauben sie, das Geld bleibe beim Chef." },
    ],
    questions: [
      {
        text: "Was hat Frau Lorenz am alten System gestört?",
        options: [
          "dass die Gäste zu wenig gaben",
          "dass die Küche fast nichts bekam",
          "dass der Service zu langsam war",
        ],
        answer: 1,
        explain: "Aşçılar da aynı derecede çalışıyor ama bahşiş neredeyse yalnız servise gidiyormuş.",
      },
      {
        kind: "gapfill",
        text: "Frau Lorenz hat alle Preise um ___ Prozent erhöht.",
        options: [],
        answer: 0,
        accept: ["fünfzehn", "15"],
        explain: "„Wir haben alle Preise um fünfzehn Prozent erhöht“.",
      },
      {
        text: "Was passiert heute mit dem Geld, das Gäste trotzdem geben?",
        options: [
          "Die Kellnerinnen teilen es.",
          "Es geht an einen Verein.",
          "Es bezahlt Weiterbildungen.",
        ],
        answer: 2,
        explain: "Para, ekibin birlikte karar verdiği bir mesleki eğitim kasasına gidiyor.",
      },
      {
        kind: "truefalse",
        text: "Früher musste Frau Lorenz jedes Jahr viel neues Personal suchen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Eskiden her yıl personelin neredeyse yarısını yeniden arıyorlarmış.",
      },
      {
        kind: "short_answer",
        text: "Wie viele Kellnerinnen haben gekündigt?",
        options: [],
        answer: 0,
        accept: ["zwei", "2", "zwei Kellnerinnen"],
        explain: "„Zwei Kellnerinnen haben gekündigt“ — hafta sonları bahşişle daha çok kazanıyorlarmış.",
      },
      {
        text: "Was rät Frau Lorenz anderen Wirten?",
        options: [
          "den Gästen den Grund offen zu sagen",
          "die Preise nur leicht zu erhöhen",
          "das Trinkgeld der Küche zu geben",
        ],
        answer: 0,
        explain: "Nedeni açıklamadan fiyat artırılmamalı; yoksa misafirler paranın patronda kaldığını sanır.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b2-lib-w20",
    course: "de",
    level: "B2",
    skill: "writing",
    title: "Wohin geht das Kartentrinkgeld?",
    genre: "email",
    intro: "Bir kafede serviste çalışıyorsun ve kartla gelen bahşişin nasıl dağıtıldığını bilmiyorsunuz: önce iki cümle kur, sonra işletme sahibine somut öneri içeren bir e-posta yaz.",
    gloss: [
      { de: "die Abrechnung", tr: "hesap dökümü", en: "statement" },
      { de: "das Misstrauen", tr: "güvensizlik", en: "mistrust" },
      { de: "anteilig", tr: "payına düşen oranda", en: "proportionally" },
      { de: "die Schicht", tr: "vardiya", en: "shift" },
      { de: "nachvollziehbar", tr: "anlaşılır", en: "comprehensible" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Birçok meslektaşım şimdiye kadar hiçbir liste görmemiş olduğunu söylüyor.",
        answer: "Mehrere Kollegen sagen, bisher keine Liste gesehen zu haben.",
        alternatives: ["Mehrere Kolleginnen sagen, bisher keine Liste gesehen zu haben."],
        hint: "Geçmiş zu-mastarı: Partizip II + „zu haben“ — görmemek, söylemekten önceki bir durum.",
      },
      {
        kind: "build",
        tr: "Ortak bir görüşmeye davet edilirsek seviniriz.",
        answer: "Wir würden uns freuen, zu einem gemeinsamen Gespräch eingeladen zu werden.",
        alternatives: ["Es würde uns freuen, zu einem gemeinsamen Gespräch eingeladen zu werden."],
        hint: "Edilgen zu-mastarı: Partizip II + „zu werden“ — davet eden değil, davet edilen taraf.",
      },
      {
        kind: "free",
        prompt:
          "Bir kafede serviste çalışıyorsun. Kartla ödenen bahşiş ay sonunda toplu ve dökümsüz ödeniyor. İşletme sahibi Frau Brenner'e ekip adına yaz: durumu ve neden yazdığını anlat, ekibin sorularını açıkça sor, mutfağı da içeren somut bir paylaşım kuralı öner ve bir görüşme iste.",
        checklist: [
          "Durumu ve neden yazdığını anlat",
          "Ekibin sorularını açıkça sor",
          "Somut bir paylaşım kuralı öner",
          "Bir görüşme iste ve nazikçe bitir",
        ],
        minWords: 130,
        phrases: [
          { de: "Ich schreibe Ihnen im Namen des …, weil …", tr: "… adına yazıyorum, çünkü …", en: "I am writing to you on behalf of the … because …" },
          { de: "Seit …, landet ein großer Teil des …", tr: "…'den beri …'in büyük kısmı … gidiyor.", en: "Since …, a large part of the … ends up …" },
          { de: "Deshalb hätten wir einige Fragen: …", tr: "Bu yüzden birkaç sorumuz olacak: …", en: "That is why we would have a few questions: …" },
          { de: "Unser Vorschlag wäre, …", tr: "Önerimiz … olurdu.", en: "Our suggestion would be …" },
          { de: "Wir würden uns freuen, …", tr: "… seviniriz.", en: "We would be glad …" },
        ],
        sample:
          "Sehr geehrte Frau Brenner, ich schreibe Ihnen im Namen des Serviceteams, weil uns eine Frage seit " +
          "einigen Wochen beschäftigt. Seit die meisten Gäste mit Karte zahlen, landet ein großer Teil des " +
          "Trinkgelds auf dem Konto des Cafés. Am Monatsende bekommen wir einen Betrag ausgezahlt, aber ohne " +
          "Abrechnung. Mehrere Kollegen sagen, bisher keine Liste gesehen zu haben, und so entsteht leicht " +
          "Misstrauen, obwohl sicher niemand etwas falsch machen will. " +
          "Deshalb hätten wir einige Fragen: Wie hoch war das Kartentrinkgeld in den letzten Monaten? Nach " +
          "welcher Regel wird es verteilt? Und bekommt die Küche etwas davon? " +
          "Unser Vorschlag wäre, das Trinkgeld jeden Monat anteilig nach den geleisteten Schichten zu " +
          "verteilen, und zwar an Service und Küche. Eine kurze Liste im Pausenraum würde alles " +
          "nachvollziehbar machen. " +
          "Wir würden uns freuen, zu einem gemeinsamen Gespräch eingeladen zu werden, gern schon nächste Woche " +
          "nach der Frühschicht. " +
          "Mit freundlichen Grüßen, Deniz Aksoy",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b2-lib-s20",
    course: "de",
    level: "B2",
    skill: "speaking",
    title: "Trinkgeld: Dank oder Lohnersatz?",
    genre: "monologue",
    intro: "Bir dakikadan uzun tek başına konuşacaksın: bahşişin kime ne kazandırdığını ve kimi misafirin keyfine bağlı bıraktığını tart.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Bahşiş kaldırılıp yerine daha yüksek ücret mi gelmeli? Bahşişin iyi bir yanını kabul et, kimin için sorun olduğunu anlat, kaldırılırsa neyin değişeceğini düşün ve kendi hükmünü ver.",
      bulletsTr: [
        "Bahşişin iyi bir yanını kabul et",
        "Kimin için sorun olduğunu anlat",
        "Kaldırılırsa neyin değişeceğini düşün",
        "Kendi hükmünü ver",
      ],
      targets: [
        { de: "Das gebe ich zu: …", tr: "Bunu kabul ediyorum: …" },
        { de: "Problematisch wird es, wenn …", tr: "… olduğunda iş sorunlu hâle geliyor" },
        { de: "Würde man …, müssten …", tr: "… yapılsa … gerekirdi" },
        { de: "Meiner Meinung nach sollte …", tr: "Bence … olmalı" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "Trinkgeld hat eine gute Seite, das gebe ich zu: Es ist eine direkte Art, Danke zu sagen, und wer " +
        "freundlich und aufmerksam arbeitet, wird dafür belohnt. " +
        "Problematisch wird es, wenn das Trinkgeld einen Teil des Lohns ersetzt. Dann hängt das Einkommen " +
        "einer Kellnerin von der Laune der Gäste ab, vom Wetter oder davon, ob gerade Ferien sind. Und die " +
        "Köche, ohne die es kein Essen gäbe, gehen oft leer aus. " +
        "Würde man das Trinkgeld abschaffen, müssten die Preise steigen, und manche Gäste würden sich " +
        "beschweren. Dafür wüsste jeder im Betrieb, was er am Monatsende verdient. " +
        "Meiner Meinung nach sollte Trinkgeld nicht verboten werden, aber überflüssig: Der Lohn muss auch " +
        "ohne Trinkgeld zum Leben reichen. Wer dann trotzdem etwas geben möchte, tut es wirklich freiwillig, " +
        "und genau so war das Trinkgeld ja einmal gemeint.",
      rubricHint:
        "Bahşişin değeri ile ücrete bağımlılığın tartılması ve net bir hüküm beklenir; Konjunktiv II („würde man …, müssten …“) ve „ohne die …“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b2-lib-g20",
    course: "de",
    level: "B2",
    skill: "grammar",
    title: "froh, es gelesen zu haben",
    genre: "grammar",
    intro: "zu-mastarı yalnız şimdiyi anlatmaz: daha önce olmuş bir eylemi ve edilgen bir durumu da taşır; „scheinen“ ikisiyle de birleşir.",
    focus: "Geçmiş ve edilgen zu-mastarı: gelesen zu haben, eingeladen zu werden, scheinen zu",
    gloss: [
      { de: "der Brief", tr: "mektup", en: "letter" },
      { de: "behaupten", tr: "iddia etmek", en: "to claim" },
      { de: "entlassen", tr: "işten çıkarmak", en: "to fire" },
      { de: "scheinen", tr: "gibi görünmek", en: "to seem" },
      { de: "der Karton", tr: "karton kutu", en: "cardboard box" },
    ],
    minutes: 10,
    explanation: [
      {
        heading: "Geçmiş zu-mastarı: Partizip + zu haben / zu sein",
        tr: "B1'deki zu-mastarı ana cümleyle AYNI zamanı anlatır: „Ich freue mich, dich zu sehen.“ Mastarın eylemi ana cümleden ÖNCE olmuşsa geçmiş biçim gelir: Partizip II + „zu haben“ ya da „zu sein“. Yardımcı fiil Perfekt'teki gibi seçilir.",
        examples: [
          { de: "Ich bin froh, die Briefe endlich gelesen zu haben.", tr: "Mektupları sonunda okuduğum için memnunum.", note: "lesen → haben" },
          { de: "Er erinnert sich, damals sehr jung gewesen zu sein.", tr: "O zamanlar çok genç olduğunu hatırlıyor.", note: "sein → sein" },
          { de: "Sie behauptet, nie in dieser Fabrik gearbeitet zu haben.", tr: "O fabrikada hiç çalışmadığını iddia ediyor.", note: "önceki eylem" },
        ],
      },
      {
        heading: "Edilgen zu-mastarı: Partizip + zu werden",
        tr: "Ana cümlenin öznesi eylemi YAPAN değil, eylemden ETKİLENEN ise edilgen zu-mastarı kullanılır: Partizip II + „zu werden“. Türkçedeki „-ılmak / -ilmek“ karşılığıdır: davet edilmek, unutulmak, işten çıkarılmak.",
        examples: [
          { de: "Viele wünschen sich, nicht vergessen zu werden.", tr: "Pek çoğu unutulmamayı diliyor.", note: "vergessen werden" },
          { de: "Es ist schön, eingeladen zu werden.", tr: "Davet edilmek güzel.", note: "einladen → eingeladen" },
          { de: "Die Arbeiter hatten Angst, entlassen zu werden.", tr: "İşçiler işten çıkarılmaktan korkuyordu.", note: "Angst haben + zu" },
        ],
      },
      {
        heading: "scheinen zu: bir izlenim",
        tr: "„scheinen“ + zu-mastarı bir izlenimi bildirir (… gibi görünmek). Geçmişe dair izlenimde geçmiş zu-mastarı gelir; edilgenle de birleşebilir: „geöffnet worden zu sein“. Burada „scheinen“ parlamak değil, görünmek anlamındadır.",
        examples: [
          { de: "Das Foto scheint sehr alt zu sein.", tr: "Fotoğraf çok eski görünüyor.", note: "şimdi" },
          { de: "Er scheint den Brief nie bekommen zu haben.", tr: "Mektubu hiç almamış gibi görünüyor.", note: "geçmiş" },
          { de: "Die Kartons scheinen nie geöffnet worden zu sein.", tr: "Kutular hiç açılmamış gibi görünüyor.", note: "geçmiş edilgen" },
        ],
      },
    ],
    questions: [
      {
        text: "Ich bin froh, die Briefe endlich ___.",
        options: ["gelesen zu haben", "zu lesen haben", "gelesen zu sein"],
        answer: 0,
        explain: "Okuma daha önce oldu ve „lesen“ Perfekt'te haben alır: gelesen zu haben.",
      },
      {
        text: "Die Arbeiter hatten Angst, ___.",
        options: ["zu entlassen", "entlassen zu werden", "entlassen zu haben"],
        answer: 1,
        explain: "İşçiler çıkaran değil çıkarılan taraf: edilgen zu-mastarı, entlassen zu werden.",
      },
      {
        text: "„Er scheint den Brief nie bekommen zu haben.“ — Was bedeutet das?",
        options: [
          "Er bekommt ihn bestimmt bald.",
          "Er will ihn gar nicht haben.",
          "Offenbar hat er ihn nie bekommen.",
        ],
        answer: 2,
        explain: "„scheinen“ + geçmiş zu-mastarı geçmişe dair bir izlenimdir.",
      },
      {
        kind: "gapfill",
        text: "Er erinnert sich, damals sehr jung gewesen zu ___.",
        options: [],
        answer: 0,
        accept: ["sein"],
        explain: "„sein“ fiili Perfekt'te sein alır: gewesen zu sein.",
      },
      {
        kind: "gapfill",
        text: "Sie behauptet, nie in dieser Fabrik gearbeitet zu ___.",
        options: [],
        answer: 0,
        accept: ["haben"],
        explain: "„arbeiten“ Perfekt'te haben alır: gearbeitet zu haben.",
      },
      {
        kind: "gapfill",
        text: "Viele wünschen sich, nicht vergessen zu ___.",
        options: [],
        answer: 0,
        accept: ["werden"],
        explain: "Unutan değil unutulan taraf: edilgen zu-mastarı, vergessen zu werden.",
      },
      {
        kind: "gapfill",
        text: "Das Foto ___ sehr alt zu sein. (scheinen)",
        options: [],
        answer: 0,
        accept: ["scheint"],
        explain: "Bir izlenim: scheint … zu sein.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Die Kartons", "scheinen", "nie", "geöffnet worden", "zu sein"],
        explain: "„scheinen“ ikinci sırada; geçmiş edilgen zu-mastarı en sonda: geöffnet worden zu sein.",
      },
      {
        kind: "truefalse",
        text: "„Ich bin froh, die Briefe gelesen zu sein.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„lesen“ Perfekt'te haben alır: „gelesen zu haben“.",
      },
      {
        kind: "truefalse",
        text: "„Es ist schön, eingeladen zu werden.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Davet edilen taraf: edilgen zu-mastarı Partizip II + „zu werden“.",
      },
    ],
  },
];
