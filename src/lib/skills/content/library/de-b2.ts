import type { SkillExercise } from "../../types";

/**
 * DE · B2 — Beceriler kütüphanesi, ilk parti (2026-09-08).
 *
 * B2'nin farkı kelime listesi değil dilin İŞİ: burada bir kurum kendi
 * kararını savunuyor, bir uzman kendi alanını eleştiriyor ve öğrenciden
 * gerekçeli bir konum bekleniyor. Metinler bu yüzden nominal, edilgen ve
 * çekinceli — B2'nin gerçek yüzeyi bu.
 *
 * Dil bilgisi odağı Passiv: eylemi yapan gizlendiğinde cümlenin nasıl
 * kurulduğu, kurumsal dilin belkemiği.
 */
export const deB2: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b2-lib-r1",
    course: "de",
    level: "B2",
    skill: "reading",
    title: "Mehrweg statt Einweg: eine Zwischenbilanz",
    genre: "report",
    intro: "Bir belediyenin dokuz aylık ara raporu: sayılar iyi görünüyor, ama iki ayrı yerden itiraz geliyor.",
    gloss: [
      { de: "der Mehrwegbecher", tr: "yeniden kullanılabilir bardak", en: "reusable cup" },
      { de: "das Pfand", tr: "depozito", en: "deposit" },
      { de: "die Rückgabe", tr: "iade", en: "return" },
      { de: "der Betriebsrat", tr: "işçi temsilciliği", en: "works council" },
      { de: "die Stellungnahme", tr: "görüş yazısı", en: "statement" },
      { de: "die Maßnahme", tr: "önlem", en: "measure" },
      { de: "die Herstellung", tr: "üretim", en: "production" },
    ],
    minutes: 9,
    text:
      "MEHRWEG STATT EINWEG: EINE ZWISCHENBILANZ\n\n" +
      "Seit dem 1. Januar wird in den Kantinen der Stadtverwaltung Kaffee nur noch in Mehrwegbechern ausgegeben. " +
      "Wer keinen eigenen Becher mitbringt, zahlt einen Euro Pfand und erhält ihn bei der Rückgabe zurück. " +
      "Nach neun Monaten liegt nun der erste Bericht vor.\n\n" +
      "Die Zahlen wirken zunächst eindeutig. Die Abfallmenge in den Kantinen ist um 68 Prozent gesunken, " +
      "und im Vergleich zum Vorjahr wurden rund 340.000 Einwegbecher eingespart.\n\n" +
      "Kritik kommt dennoch, und zwar aus zwei Richtungen. Der Betriebsrat weist darauf hin, dass die Becher " +
      "gespült werden müssen und dass diese Arbeit bisher niemandem zusätzlich vergütet wurde. " +
      "„Eine Maßnahme, die auf dem Rücken der Küchenteams umgesetzt wird, ist keine gute Maßnahme“, " +
      "heißt es in der Stellungnahme.\n\n" +
      "Der zweite Einwand ist grundsätzlicher. Eine Untersuchung der Hochschule zeigt, dass ein Mehrwegbecher " +
      "erst nach etwa zwanzig Nutzungen besser für die Umwelt ist als ein Einwegbecher, weil die Herstellung " +
      "deutlich aufwendiger ist. In der Stadtverwaltung wird dieser Wert erreicht. In Betrieben, in denen viele " +
      "Becher verschwinden, sähe die Rechnung anders aus.\n\n" +
      "Auf beide Punkte hat die Verwaltung reagiert. Ab Januar sollen in den Küchen zwei zusätzliche Stellen " +
      "geschaffen werden. Außerdem wird das Pfand von einem auf zwei Euro erhöht, nachdem im Sommer besonders " +
      "viele Becher nicht zurückgebracht worden waren.\n\n" +
      "Ob sich das Modell auf private Cafés übertragen lässt, lässt der Bericht offen. Dort sind die Wege kürzer, " +
      "die Kundschaft wechselt schneller, und am Ausgang kontrolliert niemand.",
    questions: [
      {
        text: "Worum geht es in dem Bericht?",
        options: [
          "Um eine Zwischenbilanz nach neun Monaten mit Zahlen und Einwänden.",
          "Um die Ankündigung, dass Mehrwegbecher eingeführt werden sollen.",
          "Um den Vergleich mehrerer Städte bei der Abfalltrennung.",
        ],
        answer: 0,
        explain: "Sistem ocakta başladı ve rapor dokuz ay sonrasının bilançosu: önce sayılar, sonra iki itiraz, sonra tepki.",
      },
      {
        text: "Was kritisiert der Betriebsrat?",
        options: [
          "Dass die zusätzliche Arbeit bisher nicht bezahlt wurde.",
          "Dass zu wenige Becher zurückgegeben werden.",
          "Dass die Becher zu schnell kaputtgehen.",
        ],
        answer: 0,
        explain: "„… dass diese Arbeit bisher niemandem zusätzlich vergütet wurde.“ Kayıp bardaklar ayrı bir konu ve idarenin kendi gerekçesi.",
      },
      {
        kind: "truefalse",
        text: "Ein Mehrwegbecher ist von der ersten Nutzung an umweltfreundlicher.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Araştırma tersini söylüyor: üstünlük ancak yaklaşık yirmi kullanımdan sonra başlıyor, çünkü üretimi daha maliyetli.",
      },
      {
        kind: "gapfill",
        text: "Die Abfallmenge in den Kantinen ist um ___ Prozent gesunken.",
        options: [],
        answer: 0,
        accept: ["68", "achtundsechzig"],
        explain: "„Die Abfallmenge in den Kantinen ist um 68 Prozent gesunken.“ 340.000 ise tasarruf edilen bardak sayısı.",
      },
      {
        kind: "short_answer",
        text: "Warum wird das Pfand erhöht?",
        options: [],
        answer: 0,
        accept: [
          "weil viele Becher nicht zurückkamen",
          "viele Becher wurden nicht zurückgebracht",
          "weil Becher fehlten",
        ],
        explain: "„… nachdem im Sommer besonders viele Becher nicht zurückgebracht worden waren.“ Zam bunun sonucu.",
      },
      {
        text: "Wie beurteilt der Bericht die Übertragung auf private Cafés?",
        options: [
          "Er hält sie für offen und nennt Gründe, die dagegen sprechen.",
          "Er empfiehlt sie allen Cafés in der Stadt.",
          "Er hält sie für unmöglich, weil das Gesetz es verbietet.",
        ],
        answer: 0,
        explain: "„… lässt der Bericht offen“ ve ardından üç zorluk sayılıyor: kısa yollar, hızlı değişen müşteri, çıkışta denetim yok.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b2-lib-l1",
    course: "de",
    level: "B2",
    skill: "listening",
    title: "Wer sich beschwert, hat Kraft",
    genre: "interview",
    intro: "Bir kliniğin şikâyet biriminden sorumlu kişiyle röportaj: şikâyetler neyi gösterir, neyi gizler.",
    gloss: [
      { de: "die Beschwerde", tr: "şikâyet", en: "complaint" },
      { de: "beunruhigen", tr: "endişelendirmek", en: "to worry" },
      { de: "verschieben", tr: "ertelemek", en: "to postpone" },
      { de: "unberechtigt", tr: "haksız", en: "unjustified" },
      { de: "ernst nehmen", tr: "ciddiye almak", en: "to take seriously" },
      { de: "die Aufnahme", tr: "kabul birimi", en: "admissions" },
    ],
    minutes: 9,
    segments: [
      { speaker: "Moderatorin", text: "Frau Petrova, Sie leiten das Beschwerdemanagement einer großen Klinik. Wie viele Beschwerden erreichen Sie im Jahr?" },
      { speaker: "Frau Petrova", text: "Etwa 1.200. Das klingt nach viel, ist aber bei 40.000 Patientinnen und Patienten wenig. Mich beunruhigt eher das, was nicht geschrieben wird." },
      { speaker: "Moderatorin", text: "Wie meinen Sie das?" },
      { speaker: "Frau Petrova", text: "Wer sich beschwert, hat Kraft und Sprache. Genau die Menschen, denen es am schlechtesten geht, melden sich fast nie bei uns." },
      { speaker: "Moderatorin", text: "Worum geht es in den Briefen meistens?" },
      { speaker: "Frau Petrova", text: "Nur etwa ein Fünftel betrifft die Medizin. Der Rest ist Kommunikation: Niemand hat erklärt, warum eine Operation verschoben wurde." },
      { speaker: "Moderatorin", text: "Was passiert mit so einem Brief?" },
      { speaker: "Frau Petrova", text: "Er wird innerhalb von drei Tagen beantwortet. Nicht mit einer Entschuldigung aus dem Baukasten, sondern mit einem Namen und einer Telefonnummer." },
      { speaker: "Moderatorin", text: "Ändert sich dadurch tatsächlich etwas im Haus?" },
      { speaker: "Frau Petrova", text: "Manchmal. Nach zwölf ähnlichen Beschwerden wurde bei uns die Aufnahme umgebaut. Das hätte keine Studie so schnell erreicht." },
      { speaker: "Moderatorin", text: "Wie reagieren die Kolleginnen und Kollegen, wenn eine Beschwerde sie persönlich betrifft?" },
      { speaker: "Frau Petrova", text: "Sehr unterschiedlich. Die meisten wollen genau wissen, was passiert ist. Schwierig wird es, wenn jemand die Beschwerde als Angriff liest, denn dann geht es plötzlich um Schuld statt um den Ablauf." },
      { speaker: "Moderatorin", text: "Und wenn eine Beschwerde unberechtigt ist?" },
      { speaker: "Frau Petrova", text: "Dann sage ich das auch. Eine Stelle, die immer Recht gibt, wird nicht ernst genommen, weder von den Patienten noch von den Kolleginnen." },
    ],
    questions: [
      {
        text: "Was beunruhigt Frau Petrova am meisten?",
        options: [
          "Die Beschwerden, die nie geschrieben werden.",
          "Die hohe Zahl von 1.200 Beschwerden im Jahr.",
          "Dass die Antworten zu lange dauern.",
        ],
        answer: 0,
        explain: "„Mich beunruhigt eher das, was nicht geschrieben wird“ — sonra bunu açıklıyor: en kötü durumdakiler yazmıyor.",
      },
      {
        text: "Worum geht es in den meisten Beschwerden?",
        options: [
          "Um Kommunikation, nicht um die Behandlung selbst.",
          "Um zu hohe Rechnungen und unklare Zusatzkosten.",
          "Um das Essen und die Zimmer auf der Station.",
        ],
        answer: 0,
        explain: "„Nur etwa ein Fünftel betrifft die Medizin. Der Rest ist Kommunikation“ — beşte dördü iletişim.",
      },
      {
        kind: "truefalse",
        text: "Frau Petrova gibt jeder Beschwerde Recht, um Streit zu vermeiden.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Tam tersini savunuyor: „Eine Stelle, die immer Recht gibt, wird nicht ernst genommen.“",
      },
      {
        kind: "short_answer",
        text: "In welcher Zeit wird ein Brief beantwortet?",
        options: [],
        answer: 0,
        accept: ["innerhalb von drei Tagen", "in drei Tagen", "drei Tage", "in 3 Tagen"],
        explain: "„Er wird innerhalb von drei Tagen beantwortet.“ — üç gün içinde, isim ve telefon numarasıyla.",
      },
      {
        kind: "dictation",
        text: "Frau Petrova'nın şikâyet edenler hakkındaki ilk cümlesini duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Wer sich beschwert, hat Kraft und Sprache.", "Wer sich beschwert hat Kraft und Sprache"],
        explain: "„Wer sich beschwert, hat Kraft und Sprache.“ — „wer“ ile kurulan cümlede fiil sona gider.",
      },
      {
        text: "Was zeigt das Beispiel mit der Aufnahme?",
        options: [
          "Dass viele ähnliche Beschwerden eine echte Veränderung auslösen können.",
          "Dass Umbauten in Kliniken meistens zu teuer sind.",
          "Dass Studien schneller wirken als Beschwerden.",
        ],
        answer: 0,
        explain: "On iki benzer şikâyetten sonra kabul birimi yeniden düzenlenmiş; „Das hätte keine Studie so schnell erreicht.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b2-lib-w1",
    course: "de",
    level: "B2",
    skill: "writing",
    title: "Stellungnahme an die Verwaltung",
    genre: "formal",
    intro: "Önce iki cümle kur, sonra bir kurum kararına gerekçeli ve nazik bir itiraz yaz.",
    gloss: [
      { de: "die Öffnungszeit", tr: "açılış saati", en: "opening hours" },
      { de: "die Einschränkung", tr: "kısıtlama", en: "restriction" },
      { de: "nachvollziehen", tr: "anlamak", en: "to comprehend" },
      { de: "der Vorschlag", tr: "öneri", en: "proposal" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Bardaklar her akşam mutfakta yıkanıyor.",
        answer: "Die Becher werden jeden Abend in der Küche gespült.",
        alternatives: ["Jeden Abend werden die Becher in der Küche gespült."],
        hint: "Vorgangspassiv: werden + Partizip II. Eylemi yapan söylenmiyor, çünkü önemli olan işin kendisi.",
      },
      {
        kind: "build",
        tr: "Sorun daha erken bildirilseydi masraf çıkmazdı.",
        answer: "Wenn das Problem früher gemeldet worden wäre, wären keine Kosten entstanden.",
        alternatives: ["Wären das Problem früher gemeldet worden, wären keine Kosten entstanden."],
        hint: "Geçmişe dönük gerçek dışı koşul: Konjunktiv II + edilgen → „gemeldet worden wäre“. Ana cümlede „wären … entstanden“.",
      },
      {
        kind: "free",
        prompt:
          "Aşağıdaki duyuruya kurumun kendisine yazılmış bir görüş yazısıyla cevap ver. Kararı anladığını göster, itirazını gerekçelendir ve somut bir öneri sun.",
        stimulus:
          "Mitteilung der Stadtbibliothek\n\n" +
          "Aus personellen Gründen werden die Öffnungszeiten ab dem 1. November eingeschränkt. " +
          "Die Bibliothek schließt montags bis freitags künftig um 17 Uhr statt um 20 Uhr; " +
          "der Samstag entfällt vollständig.\n\n" +
          "Rückmeldungen richten Sie bitte an: leitung@stadtbibliothek.de",
        checklist: [
          "Konuyu ve kime yazdığını açıkça belirt",
          "Kararın gerekçesini anladığını göster",
          "Kendi itirazını en az iki nedenle destekle",
          "Somut bir öneri sun ve nazik bir kapanış yaz",
        ],
        minWords: 90,
        phrases: [
          { de: "mit Interesse habe ich gelesen, dass …", tr: "… okuduğumu ilgiyle belirtmek isterim" },
          { de: "Ihre Gründe kann ich nachvollziehen, allerdings …", tr: "Gerekçenizi anlıyorum, ancak …" },
          { de: "Besonders betroffen sind …", tr: "Bundan en çok … etkileniyor" },
          { de: "Ich möchte deshalb vorschlagen, …", tr: "Bu yüzden … önermek istiyorum" },
          { de: "Über eine kurze Rückmeldung wäre ich dankbar.", tr: "Kısa bir geri dönüş için minnettar olurum." },
        ],
        sample:
          "Sehr geehrte Damen und Herren,\n\n" +
          "mit Interesse habe ich gelesen, dass die Öffnungszeiten ab November eingeschränkt werden. " +
          "Ihre Gründe kann ich nachvollziehen, denn auch andere Einrichtungen finden derzeit kaum Personal. " +
          "Allerdings trifft die Änderung genau die Gruppen, für die die Bibliothek gebaut wurde. " +
          "Besonders betroffen sind Berufstätige, die erst nach 17 Uhr kommen können, und Schülerinnen und Schüler, " +
          "die samstags in Ruhe lernen möchten. Zu Hause haben viele von ihnen keinen eigenen Schreibtisch.\n\n" +
          "Ich möchte deshalb vorschlagen, statt einer Schließung an fünf Abenden zwei lange Abende zu erhalten " +
          "und den Samstagvormittag anzubieten. Denkbar wäre außerdem, den Lesesaal ohne Ausleihe geöffnet zu lassen; " +
          "dafür würde weniger Personal benötigt.\n\n" +
          "Über eine kurze Rückmeldung wäre ich dankbar.\n" +
          "Mit freundlichen Grüßen\nNuri Özkan",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b2-lib-s1",
    course: "de",
    level: "B2",
    skill: "speaking",
    title: "Vier Tage arbeiten?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar konuşacaksın: iki tarafı da tart, sonra kendi konumunu söyle.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Bazı şirketler haftada dört gün çalışmayı deniyor: aynı maaş, aynı iş, bir gün az. Bu modeli tart: kimin için işler, kimin için işlemez, sen ne düşünüyorsun?",
      bulletsTr: [
        "Modeli bir cümleyle tarif et",
        "İşe yaradığı bir durumu gerekçesiyle anlat",
        "İşlemediği bir durumu anlat (vardiya, bakım, hizmet)",
        "Kendi konumunu bir koşulla birlikte söyle",
      ],
      targets: [
        { de: "Auf den ersten Blick …", tr: "İlk bakışta …" },
        { de: "Entscheidend ist dabei, ob …", tr: "Belirleyici olan … olup olmadığı" },
        { de: "Das gilt allerdings nicht für …", tr: "Bu şunun için geçerli değil: …" },
        { de: "Unter der Voraussetzung, dass …", tr: "… koşuluyla" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "Auf den ersten Blick klingt die Vier-Tage-Woche nach einem Geschenk, aber sie ist vor allem eine Frage der " +
        "Organisation. In Büroberufen funktioniert sie oft erstaunlich gut: Wenn Besprechungen kürzer werden und " +
        "niemand mehr Zeit mit Aufgaben verbringt, die niemand liest, geht dieselbe Arbeit auch in vier Tagen. " +
        "Entscheidend ist dabei, ob die Leitung wirklich Aufgaben streicht oder nur den Druck erhöht. " +
        "Das gilt allerdings nicht für Bereiche, in denen Menschen betreut werden. In einer Klinik oder in einer " +
        "Kita kann man nicht effizienter werden, indem man schneller pflegt; dort bedeutet ein freier Tag " +
        "schlicht, dass jemand anderes einspringen muss. " +
        "Unter der Voraussetzung, dass zusätzliche Stellen finanziert werden, halte ich das Modell für richtig. " +
        "Ohne diese Bedingung wird aus einer guten Idee eine Belastung für die Kolleginnen und Kollegen.",
      rubricHint:
        "Her iki taraf da gerekçesiyle geçmeli ve sonuç bir koşula bağlanmalı; nominal ve edilgen yapılar B2 için beklenir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b2-lib-g1",
    course: "de",
    level: "B2",
    skill: "grammar",
    title: "Wenn der Täter verschwindet",
    genre: "grammar",
    intro: "Kurumsal dilin belkemiği: eylemi yapan söylenmediğinde cümle nasıl kurulur, hangi zamanda ne değişir.",
    focus: "Passiv: Vorgangs- und Zustandspassiv, Präsens und Präteritum",
    gloss: [
      { de: "renovieren", tr: "yenilemek", en: "to renovate" },
      { de: "beantworten", tr: "cevaplamak", en: "to answer" },
      { de: "der Antrag", tr: "başvuru", en: "application" },
      { de: "prüfen", tr: "incelemek", en: "to check" },
      { de: "schließen", tr: "kapatmak", en: "to close" },
    ],
    minutes: 8,
    explanation: [
      {
        heading: "İki edilgen, iki ayrı soru",
        tr: "Türkçede tek bir edilgen eki vardır: „kapatıldı“ hem işi hem sonucu anlatabilir. Almanca ikiye ayırır. „werden + Partizip II“ İŞİ anlatır (Vorgangspassiv), „sein + Partizip II“ SONUCU (Zustandspassiv).",
        examples: [
          { de: "Das Fenster wird geschlossen.", tr: "Pencere kapatılıyor.", note: "iş sürüyor" },
          { de: "Das Fenster ist geschlossen.", tr: "Pencere kapalı.", note: "durum, sonuç" },
          { de: "Die Halle wird gerade renoviert.", tr: "Salon şu anda yenileniyor." },
        ],
      },
      {
        heading: "Zaman werden'de görünür",
        tr: "Ortaç değişmez; zamanı taşıyan yardımcı fiildir. Präsens'te „wird“, Präteritum'da „wurde“, Perfekt'te „ist … worden“ olur — „geworden“ değil.",
        examples: [
          { de: "Der Antrag wird heute geprüft.", tr: "Başvuru bugün inceleniyor." },
          { de: "Der Antrag wurde gestern geprüft.", tr: "Başvuru dün incelendi." },
          { de: "Der Antrag ist bereits geprüft worden.", tr: "Başvuru çoktan incelendi.", note: "worden, geworden değil" },
        ],
      },
      {
        heading: "von mı durch mu, modal nereye",
        tr: "Eylemi yapan gerçekten söylenecekse kişi ve kurum „von“ ile, aracı ve sebep „durch“ ile gelir. Modal fiilli edilgende sıra sabittir: Partizip II + werden + çekimli modal.",
        examples: [
          { de: "Der Brief wurde von der Leiterin beantwortet.", tr: "Mektup müdür tarafından cevaplandı.", note: "kişi → von" },
          { de: "Die Halle wurde durch ein Feuer zerstört.", tr: "Salon bir yangınla yıkıldı.", note: "sebep → durch" },
          { de: "Die Becher müssen gespült werden.", tr: "Bardakların yıkanması gerekiyor.", note: "gespült werden müssen" },
        ],
      },
    ],
    questions: [
      {
        text: "Die Ergebnisse ___ morgen veröffentlicht.",
        options: ["werden", "sind", "haben"],
        answer: 0,
        explain: "Yarın yapılacak bir İŞ söz konusu: Vorgangspassiv, werden + Partizip II.",
      },
      {
        text: "Hangisi Zustandspassiv (sonuç) anlatır?",
        options: [
          "Der Laden ist seit gestern geschlossen.",
          "Der Laden wird um 18 Uhr geschlossen.",
          "Der Laden schließt um 18 Uhr.",
        ],
        answer: 0,
        explain: "„ist geschlossen“ dükkânın DURUMUNU söyler; „wird geschlossen“ kapatma işini, üçüncüsü etken cümledir.",
      },
      {
        text: "Der Antrag ___ letzte Woche geprüft.",
        options: ["wurde", "wird", "worden"],
        answer: 0,
        explain: "Geçmişteki iş için Präteritum Passiv: wurde geprüft.",
      },
      {
        kind: "gapfill",
        text: "Der Brief ist gestern beantwortet ___.",
        options: [],
        answer: 0,
        accept: ["worden"],
        explain: "Perfekt Passiv'de „geworden“ değil „worden“ kullanılır: ist beantwortet worden.",
      },
      {
        kind: "gapfill",
        text: "Die Halle wurde ___ ein Feuer zerstört. (von / durch)",
        options: [],
        answer: 0,
        accept: ["durch"],
        explain: "Yangın bir aracı ya da sebeptir, kişi değil: durch ein Feuer.",
      },
      {
        kind: "gapfill",
        text: "Die Formulare müssen bis Freitag ___ ___. (abgeben)",
        options: [],
        answer: 0,
        accept: ["abgegeben werden"],
        explain: "Modal fiilli edilgen: Partizip II + werden, modal çekimli ve sonda: abgegeben werden müssen.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Die Akten", "wurden", "von der Kollegin", "geprüft"],
        explain: "Edilgen özne, wurden, von + kişi, ortaç sonda: Die Akten wurden von der Kollegin geprüft.",
      },
      {
        kind: "truefalse",
        text: "„Das Projekt ist letzte Woche gestartet geworden.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Perfekt Passiv „worden“ ister: „ist gestartet worden“ ya da daha doğal olarak „wurde gestartet“.",
      },
      {
        kind: "truefalse",
        text: "„In der Kantine wird nur noch Mehrweg ausgegeben.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Öznesiz edilgen: „es“ olmadan da kurulabilir, çünkü yer tümleci birinci öğe. Vorgangspassiv doğru kurulmuş.",
      },
      {
        text: "Kurumsal metinlerde edilgen neden bu kadar sık kullanılır?",
        options: [
          "Çünkü işi kimin yaptığı ya belli değildir ya da önemli değildir.",
          "Çünkü edilgen cümleler daha kısadır.",
          "Çünkü etken cümle resmî yazıda dilbilgisel olarak yanlıştır.",
        ],
        answer: 0,
        explain: "Edilgen özneyi arkaya atar; kurum kendini değil işlemi anlatır. Uzunluk ya da yasak söz konusu değil.",
      },
    ],
  },
];
