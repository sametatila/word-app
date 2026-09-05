import type { SkillExercise } from "../types";

/**
 * A2 · Ünite 15 — "Tarife, banka, postane, bitpazarı".
 *
 * Dört ders: Der Handyvertrag · Ein Konto eröffnen · Auf der Post ·
 * Auf dem Flohmarkt. İçerik ünite 1-15'in kelimeleriyle sınırlı.
 *
 *   Ünite 15: wöchentlich, das Smartphone, der Klingelton, das WLAN,
 *             der Router, das Ladekabel, der Benutzername, die Stromrechnung ·
 *             die Sparkasse, die Kontonummer, der Kredit, sparen, das Sparbuch,
 *             der Geldschein, das Kleingeld, ausgeben · der Umschlag,
 *             das Postamt, das Porto, abschicken, das Briefpapier, die Waage,
 *             das Blatt, das Gramm · der Flohmarkt, gebraucht, rostig,
 *             ausmisten, die Menge, das Brettspiel, der Hocker, einzeln
 *   Kalıplar: Dieser Tarif ist teurer als der andere. · Ist das WLAN kostenlos? ·
 *             Ich möchte ein Konto eröffnen. · Wie hoch sind die Gebühren? ·
 *             Was ist am schnellsten? · Wie viel wiegt das Paket? ·
 *             Geht es auch etwas billiger? · Verkaufen Sie die auch einzeln?
 *
 * Ünitenin çekirdeği karşılaştırma: üç ders Komparativ ve Superlativ öğretiyor,
 * dördüncüsü de soru sözcükleriyle fiyat soruyor. Fiyat karşılaştırması bunu
 * ölçmenin en dürüst yolu — öğrenci "teurer als" ile "am teuersten" arasındaki
 * farkı ancak iki gerçek sayı yan yana dururken hissediyor, o yüzden okuma da
 * dinleme de yazma da rakamlı.
 */
export const a2U15: SkillExercise[] = [
  {
    id: "a2-u15-r1",
    level: "A2",
    skill: "reading",
    unit: 15,
    title: "Drei Tarife im Vergleich",
    genre: "Bilgilendirme",
    intro: "Üç telefon tarifesi. Hangisi ucuz, hangisi hızlı, hangisi en uygun?",
    gloss: [
      { de: "der Tarif", tr: "tarife", en: "tariff" },
      { de: "das WLAN", tr: "kablosuz internet", en: "wifi" },
      { de: "der Router", tr: "modem", en: "router" },
      { de: "das Ladekabel", tr: "şarj kablosu", en: "charging cable" },
    ],
    minutes: 4,
    text:
      "WELCHER TARIF PASST ZU MIR?\n\n" +
      "Basis kostet 9 Euro im Monat. Damit können Sie telefonieren und schreiben, aber das Internet ist langsam. Für Videos reicht es nicht.\n\n" +
      "Komfort kostet 19 Euro. Dieser Tarif ist teurer als Basis, aber das Internet ist viel schneller. Ein Router für zu Hause ist dabei; das WLAN kostet also nichts extra.\n\n" +
      "Premium kostet 39 Euro im Monat und ist damit am teuersten. Sie bekommen ein neues Smartphone dazu, aber Sie zahlen zwei Jahre lang.\n\n" +
      "Unser Tipp: Wer wenig Videos schaut, ist mit Basis am günstigsten unterwegs. Wer zu Hause auch Internet braucht, nimmt Komfort — der Router allein kostet sonst 80 Euro.",
    questions: [
      {
        text: "Welcher Tarif ist am teuersten?",
        options: ["Basis", "Komfort", "Premium"],
        answer: 2,
        explain: "„Premium kostet 39 Euro im Monat und ist damit am teuersten.“",
      },
      {
        kind: "gapfill",
        text: "Dieser Tarif ist ___ als Basis, aber das Internet ist viel schneller.",
        options: [],
        answer: 0,
        accept: ["teurer"],
        explain: "İki şey karşılaştırılırken sıfat -er alır ve ardından als gelir.",
      },
      {
        text: "Was ist bei Komfort dabei?",
        options: ["Ein neues Smartphone", "Ein Router", "Ein Ladekabel"],
        answer: 1,
        explain: "„Ein Router für zu Hause ist dabei; das WLAN kostet also nichts extra.“",
      },
      {
        kind: "short_answer",
        text: "Wie viel kostet der Router allein?",
        options: [],
        answer: 0,
        accept: ["80 Euro", "achtzig Euro", "80"],
        explain: "„der Router allein kostet sonst 80 Euro“ — metnin son cümlesi.",
      },
      {
        text: "Wer wenig Videos schaut, soll Premium nehmen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Wer wenig Videos schaut, ist mit Basis am günstigsten unterwegs.“",
      },
    ],
  },
  {
    id: "a2-u15-r2",
    level: "A2",
    skill: "reading",
    unit: 15,
    title: "Sonntag auf dem Flohmarkt",
    genre: "Blog yazısı",
    intro: "Bitpazarı günlüğü: ne satıldı, ne satılmadı, pazarlık nasıl gitti?",
    gloss: [
      { de: "der Flohmarkt", tr: "bitpazarı", en: "flea market" },
      { de: "gebraucht", tr: "ikinci el", en: "second-hand" },
      { de: "ausmisten", tr: "ayıklamak, elden çıkarmak", en: "to clear out" },
      { de: "rostig", tr: "paslı", en: "rusty" },
      { de: "das Brettspiel", tr: "kutu oyunu", en: "board game" },
      { de: "der Hocker", tr: "tabure", en: "stool" },
      { de: "einzeln", tr: "tek tek, ayrı", en: "individually" },
      { de: "die Menge", tr: "miktar, yığın", en: "amount" },
    ],
    minutes: 4,
    text:
      "Am Samstag haben wir den Keller ausgemistet. Eine unglaubliche Menge: alte Brettspiele, vier Hocker, Geschirr, sogar ein rostiges Fahrrad.\n\n" +
      "Am Sonntag um sechs standen wir dann auf dem Flohmarkt. Kalt war es, aber die ersten Leute kamen schon um halb sieben.\n\n" +
      "Am besten liefen die Brettspiele. Eine Familie hat gleich drei genommen und gefragt: „Verkaufen Sie die auch einzeln?“ Ja, klar — aber zusammen war es billiger.\n\n" +
      "Die Hocker waren schwieriger. Ein Mann wollte nur einen und fragte immer wieder: „Geht es auch etwas billiger?“ Am Ende hat er zwei für zwölf Euro genommen.\n\n" +
      "Das rostige Fahrrad steht leider immer noch im Keller. Gebraucht ist gut, rostig ist zu viel.",
    questions: [
      {
        text: "Was hat sich am besten verkauft?",
        options: ["Die Hocker", "Die Brettspiele", "Das Fahrrad"],
        answer: 1,
        explain: "„Am besten liefen die Brettspiele.“ — bir aile üç tane birden almış.",
      },
      {
        kind: "gapfill",
        text: "Verkaufen Sie die auch ___?",
        options: [],
        answer: 0,
        accept: ["einzeln"],
        explain: "Ailenin sorusu: tek tek de satılıyor mu? Bu ünitenin pazarlık kalıbı.",
      },
      {
        text: "Wie viel hat der Mann für zwei Hocker bezahlt?",
        options: ["Sechs Euro", "Zwölf Euro", "Zwanzig Euro"],
        answer: 1,
        explain: "„Am Ende hat er zwei für zwölf Euro genommen.“",
      },
      {
        kind: "short_answer",
        text: "Warum hat sich das Fahrrad nicht verkauft?",
        options: [],
        answer: 0,
        accept: ["es ist rostig", "weil es rostig ist", "rostig"],
        explain: "„Gebraucht ist gut, rostig ist zu viel.“ — ikinci el sorun değil, pas sorun.",
      },
      {
        text: "Die ersten Leute kamen erst am Mittag.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „die ersten Leute kamen schon um halb sieben“.",
      },
    ],
  },
  {
    id: "a2-u15-l1",
    level: "A2",
    skill: "listening",
    unit: 15,
    title: "Ein Konto eröffnen",
    genre: "Diyalog",
    intro: "Bankada hesap açılıyor. Hangi belgeler gerekiyor, ücret ne kadar?",
    gloss: [
      { de: "die Sparkasse", tr: "tasarruf bankası", en: "savings bank" },
      { de: "die Kontonummer", tr: "hesap numarası", en: "account number" },
      { de: "die Gebühr", tr: "ücret", en: "fee" },
      { de: "sparen", tr: "biriktirmek", en: "to save" },
      { de: "das Sparbuch", tr: "tasarruf hesabı cüzdanı", en: "savings book" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Frau Kaya", text: "Guten Tag. Ich möchte ein Konto eröffnen." },
      { speaker: "Berater", text: "Gern. Haben Sie Ihren Ausweis und eine Meldebescheinigung dabei?" },
      { speaker: "Frau Kaya", text: "Den Ausweis ja. Die Meldebescheinigung habe ich vergessen." },
      { speaker: "Berater", text: "Kein Problem, die können Sie nachreichen. Wie hoch sind die Gebühren, fragen Sie sich sicher?" },
      { speaker: "Frau Kaya", text: "Genau, das wollte ich gerade fragen." },
      { speaker: "Berater", text: "Das normale Konto kostet vier Euro im Monat. Für Studenten ist es kostenlos." },
      { speaker: "Frau Kaya", text: "Ich arbeite, also vier Euro. Und kann ich auch ein Sparbuch dazu haben?" },
      { speaker: "Berater", text: "Ja, das kostet nichts extra. Wenn Sie jeden Monat etwas sparen, ist das eine gute Idee." },
      { speaker: "Frau Kaya", text: "Gut. Wann bekomme ich meine Kontonummer?" },
      { speaker: "Berater", text: "Heute noch, per Post kommt sie in drei Tagen." },
    ],
    questions: [
      {
        text: "Welches Dokument fehlt Frau Kaya?",
        options: ["Der Ausweis", "Die Meldebescheinigung", "Die Stromrechnung"],
        answer: 1,
        explain: "„Den Ausweis ja. Die Meldebescheinigung habe ich vergessen.“",
      },
      {
        kind: "gapfill",
        text: "Wie ___ sind die Gebühren?",
        options: [],
        answer: 0,
        accept: ["hoch"],
        explain: "Almancada ücret „yüksek“ sorulur, „çok“ değil — sabit bir soru kalıbı.",
      },
      {
        text: "Was kostet das Konto für Frau Kaya?",
        options: ["Nichts", "Vier Euro im Monat", "Vier Euro im Jahr"],
        answer: 1,
        explain: "Ücretsizlik yalnız öğrenciler için; o çalışıyor, yani ayda dört euro.",
      },
      {
        kind: "dictation",
        text: "Frau Kaya'nın ilk cümlesini yaz.",
        options: [],
        answer: 0,
        accept: ["Guten Tag. Ich möchte ein Konto eröffnen.", "Ich möchte ein Konto eröffnen."],
        explain: "Bankada işi tek cümlede söylemenin standart yolu.",
      },
    ],
  },
  {
    id: "a2-u15-l2",
    level: "A2",
    skill: "listening",
    unit: 15,
    title: "Auf der Post",
    genre: "Diyalog",
    intro: "Postanede bir paket. Kaç gram, hangi yol en hızlı?",
    gloss: [
      { de: "das Porto", tr: "posta ücreti", en: "postage" },
      { de: "der Umschlag", tr: "zarf", en: "envelope" },
      { de: "die Waage", tr: "terazi", en: "scales" },
      { de: "das Gramm", tr: "gram", en: "gram" },
      { de: "abschicken", tr: "göndermek", en: "to send off" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Herr Bilir", text: "Guten Tag, ich möchte dieses Paket nach Izmir abschicken." },
      { speaker: "Mitarbeiterin", text: "Legen Sie es bitte auf die Waage." },
      { speaker: "Herr Bilir", text: "So. Wie viel wiegt das Paket?" },
      { speaker: "Mitarbeiterin", text: "Achthundertfünfzig Gramm. Also unter einem Kilo, das ist gut." },
      { speaker: "Herr Bilir", text: "Und was kostet das Porto?" },
      { speaker: "Mitarbeiterin", text: "Normal sechzehn Euro, in acht Tagen. Express kostet neunundzwanzig und ist in drei Tagen da." },
      { speaker: "Herr Bilir", text: "Was ist am schnellsten?" },
      { speaker: "Mitarbeiterin", text: "Express. Schneller geht es leider nicht." },
      { speaker: "Herr Bilir", text: "Dann normal, es hat keine Eile. Brauche ich noch einen Umschlag für den Brief hier?" },
      { speaker: "Mitarbeiterin", text: "Ja, den bekommen Sie vorne rechts. Fünfzig Cent." },
    ],
    questions: [
      {
        text: "Wie schwer ist das Paket?",
        options: ["850 Gramm", "1 Kilo", "1850 Gramm"],
        answer: 0,
        explain: "„Achthundertfünfzig Gramm. Also unter einem Kilo.“",
      },
      {
        kind: "gapfill",
        text: "Was ist am ___?",
        options: [],
        answer: 0,
        accept: ["schnellsten"],
        explain: "En üstün derece: am + sıfat + -sten. Postanede en sık sorulan soru.",
      },
      {
        text: "Wofür entscheidet sich Herr Bilir?",
        options: ["Express", "Normal", "Er schickt nichts"],
        answer: 1,
        explain: "„Dann normal, es hat keine Eile.“ — hızlısı 29 euro, acelesi yok.",
      },
      {
        kind: "short_answer",
        text: "Was kostet der Umschlag?",
        options: [],
        answer: 0,
        accept: ["50 Cent", "fünfzig Cent", "0,50 Euro"],
        explain: "„Ja, den bekommen Sie vorne rechts. Fünfzig Cent.“",
      },
    ],
  },
  {
    id: "a2-u15-w1",
    level: "A2",
    skill: "writing",
    unit: 15,
    title: "Teurer als, am teuersten",
    genre: "Dil bilgisi",
    intro: "İki şeyi karşılaştır ya da en üstününü söyle — iki ayrı biçim.",
    gloss: [
      { de: "der Tarif", tr: "tarife", en: "tariff" },
      { de: "das Porto", tr: "posta ücreti", en: "postage" },
      { de: "gebraucht", tr: "ikinci el", en: "second-hand" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Bu tarife öbüründen daha pahalı.",
        answer: "Dieser Tarif ist teurer als der andere",
        hint: "İki şey karşılaştırılırken: sıfat + -er, sonra als.",
      },
      {
        kind: "build",
        tr: "En hızlısı hangisi?",
        answer: "Was ist am schnellsten",
        hint: "En üstün derece cümlenin sonundaysa am ... -sten kalıbı gelir.",
      },
      {
        kind: "build",
        tr: "İkinci el bisiklet yenisinden daha ucuz.",
        answer: "Das gebrauchte Fahrrad ist billiger als das neue",
        hint: "Yine -er + als; sıfat ismin önünde olduğu için ayrıca çekim eki de alır.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: burada iki şey karşılaştırılıyor, en üstünü aranmıyor.",
        source: "Premium ist am teuersten als Basis.",
        answer: "Premium ist teurer als Basis.",
        alternatives: ["Premium ist teurer als Basis"],
        why: "als yalnız karşılaştırma biçimiyle gider; am ...-sten tek başına durur, yanına als almaz.",
      },
    ],
  },
  {
    id: "a2-u15-w2",
    level: "A2",
    skill: "writing",
    unit: 15,
    title: "Antwort auf eine Kleinanzeige",
    genre: "İlan yanıtı",
    intro: "Bitpazarı ilanına yaz: neyi istiyorsun, ne kadar veriyorsun, ne zaman geliyorsun?",
    gloss: [
      { de: "gebraucht", tr: "ikinci el", en: "second-hand" },
      { de: "einzeln", tr: "tek tek, ayrı", en: "individually" },
      { de: "der Hocker", tr: "tabure", en: "stool" },
      { de: "das Brettspiel", tr: "kutu oyunu", en: "board game" },
      { de: "abholen", tr: "gelip almak", en: "to pick up" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "reply",
        prompt: "İlana bir mesaj yaz. Neyle ilgilendiğini söyle, durumu hakkında bir soru sor, bir fiyat öner ve ne zaman alabileceğini yaz.",
        stimulus:
          "KELLER AUSGEMISTET — ALLES MUSS WEG\n\n" +
          "4 Hocker aus Holz, gebraucht, 15 Euro pro Stück.\n" +
          "6 Brettspiele, zusammen 20 Euro.\n" +
          "1 Fahrrad, leider etwas rostig, 25 Euro.\n\n" +
          "Abholung am Wochenende in Neustadt. Nachricht an M. Vogel.",
        checklist: [
          "Hangi eşyayla ilgilendiğini yazdın mı?",
          "Durumu ya da ayrıntısı hakkında bir soru sordun mu?",
          "Bir fiyat önerdin mi (karşılaştırma biçimiyle: billiger, günstiger)?",
          "Ne zaman gelip alabileceğini söyledin mi?",
        ],
        minWords: 40,
        phrases: [
          { de: "Ich interessiere mich für die Hocker.", tr: "taburelerle ilgileniyorum", en: "I'm interested in the stools" },
          { de: "Verkaufen Sie die auch einzeln?", tr: "tek tek de satıyor musunuz", en: "do you also sell them individually" },
          { de: "Geht es auch etwas billiger?", tr: "biraz daha ucuza olur mu", en: "could it be a bit cheaper" },
        ],
        sample:
          "Guten Tag, Frau Vogel,\n\n" +
          "ich habe Ihre Anzeige gelesen und interessiere mich für die Hocker. Verkaufen Sie die auch einzeln, oder nur alle vier zusammen?\n\n" +
          "Ich brauche eigentlich nur zwei. Sind sie stabil, oder wackelt einer? Fünfzehn Euro pro Stück finde ich etwas viel — geht es auch etwas billiger? Für zwei Hocker würde ich fünfundzwanzig Euro geben.\n\n" +
          "Abholen kann ich am Samstag zwischen zehn und vierzehn Uhr. Sonntag geht bei mir leider nicht.\n\n" +
          "Viele Grüße\nTuna Erdem",
      },
    ],
  },
];
