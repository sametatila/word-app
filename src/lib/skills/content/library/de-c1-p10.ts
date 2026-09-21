import type { SkillExercise } from "../../types";

/**
 * DE · C1 — Beceriler kütüphanesi, parti 10.
 *
 * Almanca kursun son kütüphane partisi: bununla beş beceri × beş seviye
 * hücresinin hepsi ONA tamamlanıyor. Kurallar ve emsal: `de-c1.ts` (parti 1)
 * ve `data/content/SPEC.md`.
 *
 * Parti 10 uzmanlık ve güven hattı: bir anlatı, bir bilgilendirme yayını,
 * bir kılavuz metni. Dil bilgisi sözcük yapımı — C1'de kelime dağarcığı
 * ezberle değil kuralla büyüyor.
 */
export const deC1P10: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-c1-lib-r10",
    course: "de",
    level: "C1",
    skill: "reading",
    title: "Der Fehler, den niemand melden wollte",
    genre: "story",
    intro: "Kısa bir anlatı: bir laboratuvarda bulunan bir hata ve onu bildirmenin bedeli.",
    gloss: [
      { de: "die Abweichung", tr: "sapma", en: "deviation" },
      { de: "die Messreihe", tr: "ölçüm serisi", en: "series of measurements" },
      { de: "melden", tr: "bildirmek", en: "to report" },
      { de: "die Förderung", tr: "destek fonu", en: "funding" },
      { de: "der Aufschub", tr: "erteleme", en: "postponement" },
      { de: "die Korrektur", tr: "düzeltme", en: "correction" },
    ],
    minutes: 10,
    text:
      "Im dritten Jahr fiel Nuray eine Abweichung auf, die es nicht geben durfte. " +
      "Drei Messreihen aus dem Frühjahr lagen konstant um vier Prozent über allem, " +
      "was danach gemessen worden war. Vier Prozent sind nichts, außer wenn sie konstant sind.\n\n" +
      "Sie prüfte zuerst sich selbst, wie man es ihr beigebracht hatte: Geräte, Kalibrierung, " +
      "die eigene Eingabe. Nach zwei Wochen war klar, dass der Fehler älter war als sie. " +
      "Er stammte aus einer Umstellung, die vor sechs Jahren vorgenommen und nie " +
      "dokumentiert worden war.\n\n" +
      "Das Unangenehme war nicht der Fehler. Das Unangenehme war, dass drei Veröffentlichungen " +
      "der Abteilung auf diesen Messreihen beruhten, darunter die, mit der ihr Institutsleiter " +
      "die aktuelle Förderung eingeworben hatte.\n\n" +
      "Sie meldete es trotzdem, und zwar schriftlich, mit einer Tabelle, die keinen Zweifel ließ. " +
      "Die Reaktion war nicht Ärger, sondern etwas Schlimmeres: Freundlichkeit und Aufschub. " +
      "Man werde das gründlich prüfen, hieß es; solche Dinge brauchten Zeit; " +
      "sie solle sich in der Zwischenzeit auf ihre eigene Arbeit konzentrieren.\n\n" +
      "Nach vier Monaten passierte nichts. Nach sieben schrieb sie erneut, diesmal " +
      "an die Kommission. Die Korrektur erschien im darauffolgenden Frühjahr, " +
      "in einer Fußnote, ohne ihren Namen.\n\n" +
      "Heute, sagt Nuray, würde sie es wieder tun, aber anders: " +
      "Sie würde die Tabelle gleich beim ersten Mal an zwei Adressen schicken. " +
      "Nicht aus Misstrauen — sondern weil ein Vorgang, den nur eine Stelle kennt, " +
      "keine Frist hat.",
    questions: [
      {
        text: "Warum war die Abweichung auffällig?",
        options: [
          "Sie war sehr groß.",
          "Sie war klein, aber konstant.",
          "Sie trat nur einmal auf.",
        ],
        answer: 1,
        explain: "„Vier Prozent sind nichts, außer wenn sie konstant sind.“",
      },
      {
        text: "Woher stammte der Fehler?",
        options: [
          "aus einer nie dokumentierten Umstellung",
          "aus einem defekten Gerät",
          "aus Nurays eigener Eingabe",
        ],
        answer: 0,
        explain: "Altı yıl önce yapılmış ve hiç belgelenmemiş bir değişiklikten.",
      },
      {
        kind: "truefalse",
        text: "Die Abteilung reagierte mit offenem Ärger.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„nicht Ärger, sondern etwas Schlimmeres: Freundlichkeit und Aufschub“.",
      },
      {
        kind: "gapfill",
        text: "Nach ___ Monaten schrieb sie an die Kommission.",
        options: [],
        answer: 0,
        accept: ["sieben", "7"],
        explain: "„Nach sieben schrieb sie erneut, diesmal an die Kommission.“",
      },
      {
        kind: "short_answer",
        text: "Wie erschien die Korrektur am Ende?",
        options: [],
        answer: 0,
        accept: ["in einer Fußnote", "als Fußnote", "in einer Fußnote ohne Namen"],
        explain: "„in einer Fußnote, ohne ihren Namen“.",
      },
      {
        text: "Was würde Nuray heute anders machen und warum?",
        options: [
          "Sie würde es gar nicht melden.",
          "Sie würde sofort an zwei Stellen schreiben, damit es eine Frist gibt.",
          "Sie würde erst mit dem Institutsleiter sprechen.",
        ],
        answer: 1,
        explain: "Yalnız bir merciin bildiği bir işlemin süresi olmuyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-c1-lib-l10",
    course: "de",
    level: "C1",
    skill: "listening",
    title: "Wie ein Hinweis zur Meldung wird",
    genre: "info",
    intro: "Bir bilgilendirme yayını: bir uyarının resmî bir bildirime dönüşmesi için gereken şeyler.",
    gloss: [
      { de: "die Beweislast", tr: "ispat yükü", en: "burden of proof" },
      { de: "die Meldestelle", tr: "bildirim birimi", en: "reporting office" },
      { de: "die Vertraulichkeit", tr: "gizlilik", en: "confidentiality" },
      { de: "die Frist", tr: "süre", en: "deadline" },
      { de: "die Rückmeldung", tr: "geri bildirim", en: "acknowledgement" },
      { de: "nachweislich", tr: "kanıtlanabilir biçimde", en: "demonstrably" },
    ],
    minutes: 10,
    segments: [
      { text: "Seit der Gesetzesänderung muss jede größere Organisation eine interne Meldestelle unterhalten. Was das praktisch heißt, ist weniger bekannt." },
      { text: "Entscheidend sind drei Punkte, und keiner davon betrifft den Inhalt der Meldung." },
      { speaker: "Frau Dr. Jelinek", text: "Der erste ist die Eingangsbestätigung. Sie muss innerhalb von sieben Tagen erfolgen, und zwar nachweislich." },
      { text: "Der zweite ist die Frist für die Rückmeldung zum Stand des Verfahrens: drei Monate, gerechnet ab der Bestätigung, nicht ab der Meldung." },
      { speaker: "Frau Dr. Jelinek", text: "Diese Unterscheidung klingt spitzfindig, entscheidet aber in der Praxis alles. Wer keine Bestätigung bekommt, dessen Frist beginnt nie zu laufen." },
      { text: "Der dritte Punkt ist die Vertraulichkeit der Identität. Sie gilt auch gegenüber der eigenen Leitung, und das ist der Punkt, an dem die meisten Verfahren in der Praxis scheitern." },
      { speaker: "Frau Dr. Jelinek", text: "In kleinen Abteilungen ist die Identität faktisch ohnehin bekannt. Deshalb raten wir dazu, zusätzlich eine externe Stelle zu wählen, wo es sie gibt." },
      { text: "Wichtig ist außerdem die Form: Eine mündliche Meldung ist zulässig, aber der Meldende sollte auf einem Protokoll bestehen und eine Kopie verlangen." },
      { speaker: "Frau Dr. Jelinek", text: "Alles, was nur mündlich existiert, existiert im Zweifel nicht. Das ist kein Misstrauen, sondern eine Frage der Beweislast." },
    ],
    questions: [
      {
        text: "Was ist der erste entscheidende Punkt?",
        options: [
          "der Inhalt der Meldung",
          "die Eingangsbestätigung innerhalb von sieben Tagen",
          "die Zustimmung der Leitung",
        ],
        answer: 1,
        explain: "Ve bu kanıtlanabilir biçimde yapılmalı.",
      },
      {
        text: "Ab wann läuft die Dreimonatsfrist?",
        options: ["ab der Meldung", "ab der Bestätigung", "ab dem Abschluss"],
        answer: 1,
        explain: "„gerechnet ab der Bestätigung, nicht ab der Meldung“.",
      },
      {
        kind: "truefalse",
        text: "Die Vertraulichkeit gilt nicht gegenüber der eigenen Leitung.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Tam tersi: kendi yönetimine karşı da geçerli ve çoğu süreç burada tökezliyor.",
      },
      {
        kind: "gapfill",
        text: "Die Eingangsbestätigung muss innerhalb von ___ Tagen erfolgen.",
        options: [],
        answer: 0,
        accept: ["sieben", "7"],
        explain: "„innerhalb von sieben Tagen … und zwar nachweislich“.",
      },
      {
        kind: "short_answer",
        text: "Was soll der Meldende bei einer mündlichen Meldung verlangen?",
        options: [],
        answer: 0,
        accept: ["ein Protokoll", "eine Kopie", "ein Protokoll und eine Kopie"],
        explain: "Tutanakta ısrar etmeli ve bir kopya istemeli.",
      },
      {
        text: "Warum wird eine externe Stelle empfohlen?",
        options: [
          "weil sie schneller arbeitet",
          "weil in kleinen Abteilungen die Identität ohnehin bekannt ist",
          "weil sie gesetzlich vorgeschrieben ist",
        ],
        answer: 1,
        explain: "Küçük birimlerde gizlilik fiilen kalmıyor.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-c1-lib-w10",
    course: "de",
    level: "C1",
    skill: "writing",
    title: "Leitfaden für einen unangenehmen Fall",
    genre: "guide",
    intro: "Bir kılavuz yazıyorsun: önce iki cümle kur, sonra adım adım, gerekçeli ve dürüst bir metin yaz.",
    gloss: [
      { de: "der Leitfaden", tr: "kılavuz", en: "guide" },
      { de: "die Beweislast", tr: "ispat yükü", en: "burden of proof" },
      { de: "der Zeitstempel", tr: "zaman damgası", en: "timestamp" },
      { de: "abwägen", tr: "tartmak", en: "to weigh up" },
      { de: "die Eskalation", tr: "üst makama taşıma", en: "escalation" },
    ],
    minutes: 16,
    tasks: [
      {
        kind: "build",
        tr: "Yalnız sözlü olarak var olan şey, şüphe hâlinde yoktur.",
        answer: "Was nur mündlich existiert, existiert im Zweifel nicht.",
        alternatives: ["Alles, was nur mündlich existiert, existiert im Zweifel nicht."],
        hint: "„was“ ilgi cümlesi özne görevi görebilir ve cümlenin başında durabilir.",
      },
      {
        kind: "build",
        tr: "Belgeleme güvensizlik değil, ispat yükü meselesidir.",
        answer: "Dokumentation ist kein Misstrauen, sondern eine Frage der Beweislast.",
        alternatives: ["Dokumentation ist keine Frage des Misstrauens, sondern der Beweislast."],
        hint: "„nicht … sondern“ düzeltme bildirir; „kein“ ismi olumsuzlar.",
      },
      {
        kind: "free",
        prompt:
          "Bir kılavuz yaz: hangi durumu kapsadığını söyle, üç adımı sırayla ve gerekçesiyle ver, hangi adımın atlanabileceğini belirt, kılavuzun neyi vaat etmediğini dürüstçe yaz ve bir kapanış cümlesiyle bitir.",
        checklist: [
          "Kılavuzun kapsadığı durumu tanımla",
          "Üç adımı sırayla ve gerekçesiyle ver",
          "Hangi adımın atlanabileceğini söyle",
          "Neyi vaat etmediğini yaz ve kapat",
        ],
        minWords: 150,
        phrases: [
          { de: "Dieser Leitfaden gilt für den Fall, dass …", tr: "Bu kılavuz … durumunda geçerlidir", en: "This guide applies in the case that …" },
          { de: "Schritt eins, und zwar vor allem anderen: …", tr: "Birinci adım, her şeyden önce: …", en: "Step one, before anything else: …" },
          { de: "Der Grund dafür ist weniger …, sondern …", tr: "Bunun sebebi … değil, …", en: "The reason for this is less … than …" },
          { de: "Verzichten können Sie auf …, sofern …", tr: "… şartıyla …'den vazgeçebilirsiniz", en: "You can do without …, provided that …" },
          { de: "Was dieser Leitfaden nicht leistet: …", tr: "Bu kılavuzun yapmadığı şey: …", en: "What this guide does not do: …" },
        ],
        sample:
          "Dieser Leitfaden gilt für den Fall, dass Sie in Ihrer Organisation einen Fehler " +
          "bemerken, der nicht Ihrer ist und dessen Offenlegung jemandem schaden wird. " +
          "Er ersetzt keine Rechtsberatung. " +
          "Schritt eins, und zwar vor allem anderen: Sichern Sie den Befund mit Datum, " +
          "bevor Sie mit irgendjemandem sprechen. Der Grund dafür ist weniger Misstrauen " +
          "als der Umstand, dass sich Daten ändern lassen und Erinnerungen ohnehin. " +
          "Was nur mündlich existiert, existiert im Zweifel nicht. " +
          "Schritt zwei: Melden Sie schriftlich und verlangen Sie eine Eingangsbestätigung. " +
          "Ohne Bestätigung beginnt in vielen Verfahren gar keine Frist zu laufen, " +
          "und ein Vorgang ohne Frist ist ein Vorgang ohne Ende. " +
          "Schritt drei: Legen Sie sich vorher fest, nach welcher Zeit Sie eskalieren, " +
          "und halten Sie sich daran. Diese Entscheidung im Voraus zu treffen ist deshalb " +
          "wichtig, weil sie später, unter Druck und mit Rücksicht auf Kolleginnen, " +
          "kaum noch getroffen wird. " +
          "Verzichten können Sie auf Schritt drei, sofern Sie bereits eine externe Stelle " +
          "einbezogen haben; dort läuft die Frist unabhängig von Ihnen. " +
          "Was dieser Leitfaden nicht leistet: Er schützt Sie nicht vor Nachteilen. " +
          "Er sorgt lediglich dafür, dass diese Nachteile nicht auch noch mit dem Verlust " +
          "Ihrer Belege zusammenfallen.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-c1-lib-s10",
    course: "de",
    level: "C1",
    skill: "speaking",
    title: "Wann ist Schweigen unentschuldbar?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: bir sınır çiz ve onu kendi aleyhine de uygula.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Bir hatayı bildirmemek ne zaman savunulabilir, ne zaman değil? Bir sınır öner, iki durumu bu sınırla değerlendir, sınırının kendi aleyhine işlediği bir durumu kabul et ve kapat.",
      bulletsTr: [
        "Bir sınır öner ve tanımla",
        "İki durumu bu sınırla değerlendir",
        "Sınırın kendi aleyhine işlediği durumu kabul et",
        "Kısa bir kapanış cümlesi kur",
      ],
      targets: [
        { de: "Die Grenze verläuft für mich dort, wo …", tr: "Bana göre sınır … olduğu yerden geçiyor" },
        { de: "Im ersten Fall halte ich Schweigen für vertretbar, weil …", tr: "İlk durumda susmayı savunulabilir buluyorum çünkü …" },
        { de: "Gegen mich selbst gewendet heißt das, …", tr: "Kendime karşı çevrildiğinde bu … demek" },
        { de: "Damit muss ich leben, sonst ist die Grenze keine.", tr: "Buna katlanmalıyım, yoksa o bir sınır değil." },
      ],
      minSeconds: 60,
      maxSeconds: 100,
      sampleDe:
        "Die Grenze verläuft für mich dort, wo mein Schweigen die Entscheidung eines anderen " +
        "beeinflusst, ohne dass er davon weiß. Solange ein Fehler nur mich betrifft, " +
        "kann ich ihn für mich behalten; sobald jemand auf einer falschen Grundlage plant, " +
        "wird aus meinem Schweigen eine Aussage. " +
        "Im ersten Fall — ein Rechenfehler in einer Auswertung, die niemand mehr verwendet — " +
        "halte ich Schweigen für vertretbar, weil die Korrektur nur Aufwand erzeugt " +
        "und keine Entscheidung mehr berührt. " +
        "Im zweiten Fall, wenn dieselbe Auswertung Grundlage einer laufenden Förderung ist, " +
        "ist Schweigen nicht mehr Zurückhaltung, sondern Beteiligung. " +
        "Gegen mich selbst gewendet heißt das, dass ich auch dann melden muss, " +
        "wenn der Fehler meiner ist und ich als Einzige davon weiß — " +
        "und ehrlich gesagt ist genau das der Fall, in dem ich am längsten gezögert habe. " +
        "Ich habe drei Wochen gebraucht, um eine eigene falsche Zahl zu korrigieren, " +
        "die niemand bemerkt hätte. " +
        "Damit muss ich leben, sonst ist die Grenze keine, sondern nur ein Maßstab für andere.",
      rubricHint:
        "Bir sınır, iki uygulama ve kendine karşı çevrilmiş bir örnek beklenir; „dort, wo“, „nicht mehr … sondern“ ve „gegen mich selbst gewendet“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-c1-lib-g10",
    course: "de",
    level: "C1",
    skill: "grammar",
    title: "un-, -bar, ver-, -ung",
    genre: "grammar",
    intro: "C1'de kelime dağarcığı listeyle değil kuralla büyür; ekleri tanıyan bilmediği kelimeyi de çözer.",
    focus: "Sözcük yapımı: ön ekler, son ekler ve anlam kaymaları",
    gloss: [
      { de: "die Angabe", tr: "veri", en: "detail" },
      { de: "die Frist", tr: "süre", en: "deadline" },
      { de: "erkennbar", tr: "fark edilebilir", en: "recognisable" },
      { de: "die Prüfung", tr: "denetim", en: "check" },
      { de: "verlernen", tr: "unutmak", en: "to unlearn" },
    ],
    minutes: 12,
    explanation: [
      {
        heading: "Son ekler sözcük türünü söyler",
        tr: "„-ung“ fiilden iş adı yapar ve her zaman dişildir: prüfen → die Prüfung. „-heit/-keit“ sıfattan nitelik adı yapar, o da dişildir. „-bar“ ise fiilden „yapılabilir“ anlamında sıfat üretir: erkennen → erkennbar. Bu üç ek metnin yarısını açar, çünkü tür ve artikel doğrudan ekten okunur.",
        examples: [
          { de: "die Prüfung der Unterlagen", tr: "belgelerin denetimi", note: "-ung her zaman dişil" },
          { de: "die Genauigkeit der Angabe", tr: "verinin kesinliği", note: "-keit: sıfattan isim" },
          { de: "Der Fehler war kaum erkennbar.", tr: "Hata güçlükle fark edilebilirdi.", note: "-bar: edilgen olabilirlik" },
        ],
      },
      {
        heading: "Ön ekler anlamı çevirir",
        tr: "„un-“ karşıtlık kurar (klar → unklar) ama her sıfatta işlemez. „ver-“ çoğu zaman yanlışlık, kayıp ya da tamamlanma katar: laufen → verlaufen, lernen → verlernen, kaufen → verkaufen. „ent-“ ayırma ve geri alma bildirir: laden → entladen, schuldigen → entschuldigen. Bu ekler kalıp değil eğilimdir: yön verir, garanti etmez.",
        examples: [
          { de: "Die Angaben blieben unklar.", tr: "Veriler belirsiz kaldı.", note: "un-: karşıtlık" },
          { de: "Ich habe das Kopfrechnen verlernt.", tr: "Zihinden hesabı unuttum.", note: "ver-: kayıp" },
          { de: "Die Regel wurde entschärft.", tr: "Kural yumuşatıldı.", note: "ent-: geri alma" },
        ],
      },
      {
        heading: "Aynı kök, ayrılan anlamlar",
        tr: "Aynı kökten türeyen sözcükler bazen beklenmedik biçimde ayrışır ve bunu sezgiyle değil sözlükle öğrenmek gerekir: „achten“ (saymak) ile „beachten“ (uymak) ile „ächten“ (dışlamak). Aynı şekilde „die Sicht“ (görüş), „die Absicht“ (niyet), „die Rücksicht“ (gözetme) tek bir kökten gelir ama biri ötekinden çıkarılamaz.",
        examples: [
          { de: "Bitte beachten Sie die Frist.", tr: "Lütfen süreye uyun.", note: "beachten: uymak" },
          { de: "Das war nicht meine Absicht.", tr: "Niyetim bu değildi.", note: "Sicht kökünden" },
          { de: "Aus Rücksicht hat sie geschwiegen.", tr: "Gözetme yüzünden sustu.", note: "aynı kök, ayrı anlam" },
        ],
      },
    ],
    questions: [
      {
        text: "Welches Wort ist ein Nomen aus einem Verb?",
        options: ["die Prüfung", "prüfbar", "geprüft"],
        answer: 0,
        explain: "„-ung“ eki fiilden iş adı yapar ve dişildir.",
      },
      {
        text: "Was bedeutet „erkennbar“?",
        options: [
          "dass man es erkennen kann",
          "dass es erkannt wurde",
          "dass es erkennen muss",
        ],
        answer: 0,
        explain: "„-bar“ eki edilgen bir olabilirlik bildirir.",
      },
      {
        text: "„verlernen“ bedeutet:",
        options: ["falsch lernen", "eine Fähigkeit wieder verlieren", "zu Ende lernen"],
        answer: 1,
        explain: "Burada „ver-“ kayıp bildiriyor.",
      },
      {
        kind: "gapfill",
        text: "die ___ der Unterlagen (prüfen)",
        options: [],
        answer: 0,
        accept: ["Prüfung"],
        explain: "Fiil -ung ile isimleşir ve dişil olur.",
      },
      {
        kind: "gapfill",
        text: "Der Fehler war kaum ___. (erkennen, -bar)",
        options: [],
        answer: 0,
        accept: ["erkennbar"],
        explain: "Kök + -bar: fark edilebilir.",
      },
      {
        kind: "gapfill",
        text: "Die Angaben blieben ___. (klar, olumsuz)",
        options: [],
        answer: 0,
        accept: ["unklar"],
        explain: "„un-“ ön eki karşıtlık kurar.",
      },
      {
        kind: "gapfill",
        text: "Bitte ___ Sie die Frist. (achten + be-)",
        options: [],
        answer: 0,
        accept: ["beachten"],
        explain: "„beachten“ uymak demektir; „achten“ saymak anlamına gelir.",
      },
      {
        kind: "order",
        text: "Öbeği doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["die", "Genauigkeit", "der", "Angabe"],
        explain: "„-keit“ dişil bir isim yapar; arkasından Genitiv gelir.",
      },
      {
        kind: "truefalse",
        text: "Jedes Wort mit „-ung“ ist feminin.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„-ung“ eki istisnasız dişil isim üretir.",
      },
      {
        kind: "truefalse",
        text: "„achten“ und „beachten“ bedeuten dasselbe.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Aynı kökten gelirler ama anlamları ayrışmıştır.",
      },
    ],
  },
];
