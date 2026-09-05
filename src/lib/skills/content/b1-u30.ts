import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 30 — "Sayılar ve resmî yazı" (dersler 117–120).
 *
 * Dersler: Über Wirtschaft reden · Gewinn und Verlust · Eine Anzeige lesen
 * · Der Reklamationsbrief.
 *
 * İki aktarım hatası bu ünitenin diline düşüyor:
 *   um ↔ auf        Türkçe '%10 arttı' der ve DEĞİŞİM MİKTARI ile
 *                   VARILAN NOKTA arasında ayrım yapmaz. Almanca edatla
 *                   ayırır: um zehn Prozent (o kadar arttı) ≠ auf zehn
 *                   Millionen (o noktaya çıktı). Sayı aynı kalsa bile
 *                   iki cümle bambaşka şey söyler.
 *   eril/nötr       Ünite 5 dişil Genitiv'i çalışmıştı (die Höhe der
 *   Genitiv         Kosten). Eril ve nötr isimde bir adım daha var:
 *                   ARTİKEL des olur ve İSİM de -s/-es alır — des
 *                   Herstellers, des Unternehmens. Türkçede iyelik tek
 *                   ektir, o yüzden ismin kendisinin de değişmesi
 *                   atlanıyor.
 *
 * Yeni 32 kelime: die Wirtschaft, die Industrie, die Fabrik, der Import,
 * der Export, die Produktion, der Hersteller, die Konkurrenz, der Gewinn,
 * der Unternehmer, die Statistik, die Tabelle, das System, der Faktor,
 * knapp, die Meldung, die Annonce, das Inserat, die Broschüre,
 * die Überschrift, der Abschnitt, das Detail, die Einzelheit, der Hinweis,
 * die Verwaltung, die Vertretung, der Stempel, der Ordner, die Mappe,
 * besorgen, erhalten, die Einführung.
 */
export const b1U30: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u30-r1",
    level: "B1",
    skill: "reading",
    unit: 30,
    title: "Die Fabrik im Ort",
    genre: "Yerel haber",
    intro: "Bir fabrikanın durumu. Ne arttı, ne azaldı, kaça çıktı?",
    minutes: 5,
    gloss: [
      { de: "die Fabrik", tr: "fabrika", en: "factory" },
      { de: "die Produktion", tr: "üretim", en: "production" },
      { de: "der Hersteller", tr: "üretici", en: "manufacturer" },
      { de: "die Konkurrenz", tr: "rekabet", en: "competition" },
      { de: "der Export", tr: "ihracat", en: "export" },
    ],
    text:
      "Die Fabrik am Rand des Ortes gehört seit zwei Jahren einem anderen " +
      "Hersteller. Seitdem ist die Produktion um dreißig Prozent gestiegen, " +
      "die Zahl der Stellen aber nur um zwölf.\n\n" +
      "Der Grund ist die Konkurrenz aus dem Ausland. Wer heute in dieser " +
      "Industrie bleiben will, muss billiger werden oder besser. " +
      "Das System des Betriebs wurde deshalb ganz geändert.\n\n" +
      "Der Export ist inzwischen wichtiger als der Verkauf im Land. " +
      "Er ist im letzten Jahr auf sechzig Prozent gestiegen — vor fünf " +
      "Jahren waren es knapp dreißig.\n\n" +
      "Für den Ort ist das gut und schlecht zugleich. Die Wirtschaft hier " +
      "hängt jetzt an nur einem Betrieb. Solange er läuft, läuft alles; " +
      "wenn nicht, fehlt sofort alles.",
    questions: [
      {
        text: "Wie stark ist die Produktion gestiegen?",
        options: ["Um dreißig Prozent", "Auf dreißig Prozent", "Um zwölf Prozent"],
        answer: 0,
        explain: "„… ist die Produktion um dreißig Prozent gestiegen …“",
      },
      {
        text: "Was ist der Grund für die Umstellung?",
        options: ["Die Konkurrenz aus dem Ausland", "Neue Gesetze", "Zu wenig Personal"],
        answer: 0,
        explain: "„Der Grund ist die Konkurrenz aus dem Ausland.“",
      },
      {
        text: "Was ist das Risiko für den Ort?",
        options: ["Zu viele Betriebe", "Alles hängt an einem Betrieb", "Zu wenig Export"],
        answer: 1,
        explain: "„Die Wirtschaft hier hängt jetzt an nur einem Betrieb.“",
      },
      {
        kind: "gapfill",
        text: "Der Export ist im letzten Jahr ___ sechzig Prozent gestiegen.",
        options: [],
        answer: 0,
        accept: ["auf"],
        explain: "Varılan NOKTA → auf. Artış miktarı olsaydı „um“ gelirdi.",
      },
      {
        kind: "short_answer",
        text: "Wie hoch war der Export vor fünf Jahren?",
        options: [],
        answer: 0,
        accept: ["knapp dreißig Prozent", "dreißig Prozent", "knapp dreißig"],
        explain: "„… vor fünf Jahren waren es knapp dreißig.“",
      },
    ],
  },
  {
    id: "b1-u30-r2",
    level: "B1",
    skill: "reading",
    unit: 30,
    title: "Zahlen richtig lesen",
    genre: "Rehber metin",
    intro: "Bir tablo nasıl okunur? İki edat, iki farklı anlam.",
    minutes: 5,
    gloss: [
      { de: "die Statistik", tr: "istatistik", en: "statistics" },
      { de: "die Tabelle", tr: "tablo", en: "table" },
      { de: "der Gewinn", tr: "kâr", en: "profit" },
      { de: "der Faktor", tr: "etken", en: "factor" },
      { de: "knapp", tr: "az kalsın / kıt", en: "barely" },
    ],
    text:
      "In jeder Statistik stehen zwei Arten von Zahlen, und sie werden oft " +
      "durcheinandergebracht. „Der Gewinn ist um zehn Prozent gestiegen“ sagt, wie " +
      "groß die Änderung war. „Der Gewinn ist auf zehn Millionen gestiegen“ " +
      "sagt, wo er jetzt steht.\n\n" +
      "Wer eine Tabelle liest, sucht deshalb zuerst die Überschrift. " +
      "Dort steht, worum es überhaupt geht. Der zweite Blick gehört den " +
      "Jahren: eine Zahl allein sagt nichts, zwei Zahlen sagen etwas.\n\n" +
      "Ein wichtiger Faktor ist außerdem, was NICHT in der Tabelle steht. " +
      "Wenn die Produktion des Herstellers steigt und die Zahl der Stellen " +
      "fällt, erklärt die Tabelle das nicht — sie zeigt es nur.\n\n" +
      "Und ein letzter Hinweis: knapp dreißig Prozent sind weniger als " +
      "dreißig, gut dreißig sind mehr. Diese zwei kleinen Wörter ändern " +
      "die Richtung.",
    questions: [
      {
        text: "Was sagt „um zehn Prozent gestiegen“?",
        options: ["Wo der Wert jetzt steht", "Wie groß die Änderung war", "Wie alt die Zahl ist"],
        answer: 1,
        explain: "„„Der Gewinn ist um zehn Prozent gestiegen“ sagt, wie groß die Änderung war.“",
      },
      {
        text: "Was sucht man zuerst in einer Tabelle?",
        options: ["Die Überschrift", "Die größte Zahl", "Das Jahr"],
        answer: 0,
        explain: "„Wer eine Tabelle liest, sucht deshalb zuerst die Überschrift.“",
      },
      {
        text: "Was bedeutet „knapp dreißig“?",
        options: ["Mehr als dreißig", "Weniger als dreißig", "Genau dreißig"],
        answer: 1,
        explain: "„… knapp dreißig Prozent sind weniger als dreißig …“",
      },
      {
        kind: "gapfill",
        text: "Wenn die Produktion ___ ___ steigt, erklärt die Tabelle das nicht.",
        options: [],
        answer: 0,
        accept: ["des Herstellers"],
        explain: "Eril Genitiv: artikel des, isim de -s alır → des Herstellers.",
      },
      {
        kind: "short_answer",
        text: "Wie viele Zahlen sagen etwas?",
        options: [],
        answer: 0,
        accept: ["zwei", "zwei Zahlen"],
        explain: "„… eine Zahl allein sagt nichts, zwei Zahlen sagen etwas.“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u30-l1",
    level: "B1",
    skill: "listening",
    unit: 30,
    title: "Die Annonce",
    genre: "İlan üzerine konuşma",
    intro: "Bir ilan okunuyor. Hangi ayrıntı önemli?",
    minutes: 4,
    gloss: [
      { de: "die Annonce", tr: "ilan", en: "advertisement" },
      { de: "die Überschrift", tr: "başlık", en: "headline" },
      { de: "die Einzelheit", tr: "ayrıntı", en: "detail" },
      { de: "die Broschüre", tr: "broşür", en: "brochure" },
    ],
    segments: [
      { text: "Schau mal diese Annonce. Klingt gut, oder?" },
      { text: "Die Überschrift schon. Aber lies den zweiten Abschnitt." },
      { text: "„Preis auf Anfrage“. Das heißt teuer." },
      { text: "Genau. Und da steht gar keine Einzelheit zum Zustand." },
      { text: "Ja. In der Broschüre wäre das genauer." },
      { text: "Ruf einfach an und frag nach den Details." },
      { text: "Mache ich. Wenn sie ausweichen, weiß ich Bescheid." },
      { text: "Genau so. Ein Hinweis fehlt nie zufällig." },
    ],
    questions: [
      {
        text: "Was ist an der Annonce gut?",
        options: ["Die Überschrift", "Der Preis", "Die Einzelheiten"],
        answer: 0,
        explain: "„Die Überschrift schon. Aber lies den zweiten Abschnitt.“",
      },
      {
        text: "Was bedeutet „Preis auf Anfrage“ laut Gespräch?",
        options: ["Günstig", "Teuer", "Verhandelbar"],
        answer: 1,
        explain: "„„Preis auf Anfrage“. Das heißt teuer.“",
      },
      {
        text: "Was fehlt in der Annonce?",
        options: ["Einzelheiten zum Zustand", "Die Adresse", "Das Foto"],
        answer: 0,
        explain: "„Und da steht gar keine Einzelheit zum Zustand.“",
      },
      {
        kind: "gapfill",
        text: "Ein ___ fehlt nie zufällig.",
        options: [],
        answer: 0,
        accept: ["Hinweis"],
        explain: "„der Hinweis“ — eksik bir bilgi de bir bilgidir.",
      },
      {
        kind: "short_answer",
        text: "Was soll die erste Person tun?",
        options: [],
        answer: 0,
        accept: ["nach den Details fragen", "anrufen", "anrufen und fragen"],
        explain: "„Ruf einfach an und frag nach den Details.“",
      },
    ],
  },
  {
    id: "b1-u30-l2",
    level: "B1",
    skill: "listening",
    unit: 30,
    title: "In der Verwaltung",
    genre: "Ofis konuşması",
    intro: "Bir evrak aranıyor. Nerede, hangi klasörde?",
    minutes: 4,
    gloss: [
      { de: "die Verwaltung", tr: "idare", en: "administration" },
      { de: "der Ordner", tr: "klasör", en: "folder" },
      { de: "die Mappe", tr: "dosya", en: "file" },
      { de: "der Stempel", tr: "kaşe", en: "stamp" },
    ],
    segments: [
      { text: "Ich suche die Mappe des Kollegen aus dem Export." },
      { text: "Die liegt in der Verwaltung, im blauen Ordner." },
      { text: "Da habe ich schon geschaut. Der Ordner ist leer." },
      { text: "Dann hat sie jemand besorgt und nicht zurückgebracht." },
      { text: "Ärgerlich. Ich brauche nur eine Seite mit Stempel." },
      { text: "Frag bei der Vertretung nach, die haben oft eine Kopie." },
      { text: "Gute Idee. Und wenn nicht, drucke ich es neu und lasse stempeln." },
      { text: "Genau. Das dauert zehn Minuten, nicht zwei Tage." },
    ],
    questions: [
      {
        text: "Was sucht die erste Person?",
        options: ["Einen Ordner", "Die Mappe des Kollegen", "Einen Stempel"],
        answer: 1,
        explain: "„Ich suche die Mappe des Kollegen aus dem Export.“",
      },
      {
        text: "Was ist das Problem?",
        options: ["Der Ordner ist leer", "Die Verwaltung ist zu", "Es gibt keinen Stempel"],
        answer: 0,
        explain: "„Da habe ich schon geschaut. Der Ordner ist leer.“",
      },
      {
        text: "Wo soll sie nachfragen?",
        options: ["Bei der Vertretung", "Beim Chef", "Im Export"],
        answer: 0,
        explain: "„Frag bei der Vertretung nach, die haben oft eine Kopie.“",
      },
      {
        kind: "gapfill",
        text: "Ich suche die Mappe ___ ___ aus dem Export.",
        options: [],
        answer: 0,
        accept: ["des Kollegen"],
        explain: "Eril Genitiv: des + isim eki.",
      },
      {
        kind: "short_answer",
        text: "Wie lange dauert die Lösung?",
        options: [],
        answer: 0,
        accept: ["zehn Minuten", "10 Minuten"],
        explain: "„Das dauert zehn Minuten, nicht zwei Tage.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u30-w1",
    level: "B1",
    skill: "writing",
    unit: 30,
    title: "Zahlen berichten",
    genre: "Sayı raporu",
    intro: "Rakamlarla bir gelişme anlat. Ne kadar arttı mı, kaça çıktı mı?",
    minutes: 8,
    gloss: [
      { de: "die Produktion", tr: "üretim", en: "production" },
      { de: "der Gewinn", tr: "kâr", en: "profit" },
      { de: "die Statistik", tr: "istatistik", en: "statistics" },
      { de: "der Import", tr: "ithalat", en: "import" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Üretim yüzde otuz arttı.",
        answer: "Die Produktion ist um dreißig Prozent gestiegen.",
        hint: "Değişim miktarı → um.",
      },
      {
        kind: "build",
        tr: "İhracat yüzde altmışa çıktı.",
        answer: "Der Export ist auf sechzig Prozent gestiegen.",
        hint: "Varılan nokta → auf.",
      },
      {
        kind: "build",
        tr: "Üreticinin kârı geçen yıl düştü.",
        answer: "Der Gewinn des Herstellers ist im letzten Jahr gefallen.",
        hint: "Eril Genitiv: des Herstellers.",
      },
      {
        kind: "form",
        prompt: "Rakam kartını doldur.",
        facts: "İşletme: yerel fabrika; üretim: +%30; istihdam: +%12; ihracat: %60'a çıktı; beş yıl önce: yaklaşık %30.",
        fields: [
          { label: "Produktion", answer: "um 30 Prozent gestiegen", accept: ["um dreißig Prozent", "+30%"] },
          { label: "Stellen", answer: "um 12 Prozent gestiegen", accept: ["um zwölf Prozent", "+12%"] },
          { label: "Export jetzt", answer: "auf 60 Prozent", accept: ["sechzig Prozent", "60%"] },
          { label: "Export früher", answer: "knapp 30 Prozent", accept: ["knapp dreißig", "30%"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Değişim edatlarını düzelt.",
        source: "Die Produktion ist auf dreißig Prozent gestiegen und der Export um sechzig Prozent.",
        answer: "Die Produktion ist um dreißig Prozent gestiegen und der Export auf sechzig Prozent.",
        why: "Türkçe '%30 arttı' der ve DEĞİŞİM MİKTARI ile VARILAN NOKTA arasında ayrım yapmaz, o yüzden iki edat karışıyor. Almanca ayırır: um zehn Prozent = o kadar arttı; auf zehn Prozent = o seviyeye çıktı. Sayı aynı kalsa bile iki cümle bambaşka şey söyler — bu yüzden yanlış edat sayıyı da yanlış anlatır.",
      },
    ],
  },
  {
    id: "b1-u30-w2",
    level: "B1",
    skill: "writing",
    unit: 30,
    title: "Reklamationsbrief",
    genre: "Resmî şikâyet",
    intro: "Bir kuruma resmî şikâyet yaz. Eril ve nötr iyelikte isim de değişir.",
    minutes: 12,
    gloss: [
      { de: "erhalten", tr: "almak", en: "to receive" },
      { de: "besorgen", tr: "temin etmek", en: "to obtain" },
      { de: "die Vertretung", tr: "temsilcilik", en: "agency" },
      { de: "das Detail", tr: "ayrıntı", en: "detail" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Üreticinin adresini aldım.",
        answer: "Ich habe die Adresse des Herstellers erhalten.",
        hint: "Eril Genitiv: des Herstellers.",
      },
      {
        kind: "build",
        tr: "Sistemin ayrıntılarını hiç kimse açıklayamadı.",
        answer: "Die Details des Systems konnte mir niemand erklären.",
        hint: "Nötr Genitiv: des Systems.",
      },
      {
        kind: "free",
        prompt: "Bir kuruma ya da firmaya resmî bir şikâyet mektubu yaz: neyi ne zaman aldın, sorun ne, kiminle konuştun ve ne oldu, ne istiyorsun, ve ne zamana kadar. En az iki Genitiv kullan (des/der).",
        checklist: [
          "Resmî hitap ve kapanış var mı?",
          "Olay tarihli ve somut mu?",
          "Daha önceki temas anlatılmış mı?",
          "İstek net ve tarihli mi?",
          "En az iki Genitiv var mı?",
        ],
        minWords: 70,
        sample:
          "Sehr geehrte Damen und Herren,\n\n" +
          "am 5. Mai habe ich von Ihnen die Broschüre und den Vertrag " +
          "erhalten. Die Angaben des Vertrags stimmen jedoch nicht mit der " +
          "Annonce überein.\n\n" +
          "In der Annonce stand ein fester Preis. Im zweiten Abschnitt des " +
          "Vertrags steht dagegen „Preis auf Anfrage“. Ich habe am 8. Mai " +
          "bei Ihrer Vertretung angerufen. Die Kollegin konnte mir die " +
          "Einzelheiten nicht erklären und wollte zurückrufen; das ist " +
          "bisher nicht passiert.\n\n" +
          "Ich bitte Sie um eine schriftliche Antwort mit dem Stempel des " +
          "Hauses bis zum 25. Mai. Wenn der Preis nicht gilt, möchte ich " +
          "vom Vertrag zurücktreten.\n\n" +
          "Mit freundlichen Grüßen\nSedef Aydın",
        phrases: [
          { de: "Am … habe ich … erhalten.", tr: "… tarihinde … aldım.", en: "On … I received …" },
          { de: "Die Angaben des Vertrags stimmen nicht.", tr: "Sözleşmenin bilgileri doğru değil.", en: "The contract's details are not correct." },
          { de: "Ich bitte Sie um eine Antwort bis …", tr: "… tarihine kadar yanıt rica ederim.", en: "I ask you for a reply by …" },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Eril ve nötr iyelik biçimini düzelt.",
        source: "Die Angaben des Vertrag und der Stempel des Haus fehlen.",
        answer: "Die Angaben des Vertrags und der Stempel des Hauses fehlen.",
        why: "Türkçede iyelik TEK ektir ve yalnız ikinci isme gelir ('sözleşmenin bilgileri'), o yüzden Almancada artikel değiştirilip isim olduğu gibi bırakılıyor. Almancada eril ve nötr Genitiv İKİ yerde işaretlenir: artikel des olur VE ismin kendisi -s ya da -es alır — des Vertrags, des Hauses, des Systems. Dişil ve çoğulda isim değişmez (der Firma, der Kosten).",
      },
    ],
  },
];
