import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 31 — "Yolda olmak" (dersler 121–124).
 *
 * Dersler: Bahn fahren · Am Flughafen · Mit dem Auto unterwegs ·
 * Verkehrsregeln.
 *
 * İki aktarım hatası bu ünitenin diline düşüyor ve ikisi de Türkçenin
 * TEK EKLE hallettiği bir şeyin Almancada üç ayrı sözcüğe bölünmesinden:
 *   mit + dem     Türkçe araç bildirmeyi ekle yapar ('trenle', 'arabayla')
 *                 ve artikel diye bir sorun yoktur, o yüzden Almancada
 *                 "mit Zug" çıkıyor. Almanca mit + DATİV ister ve artikel
 *                 düşmez: mit dem Zug, mit der Bahn, mit dem Tram.
 *                 Tek istisna zu Fuß.
 *   nach ↔ in ↔ zu Türkçe '-e/-a' üç yönü de karşılar ('Berlin'e',
 *                 'İsviçre'ye', 'doktora'). Almanca üçe ayırır: artikelsiz
 *                 şehir ve ülkeye nach, artikelli ülkeye in + Akkusativ,
 *                 kişiye ve kuruma zu + Dativ.
 *
 * Yeni 32 kelime: der Hauptbahnhof, der Perron, die Linie, das Billett,
 * die Eisenbahn, die Rückfahrt, der Aufenthalt, das Tram, der Passagier,
 * die Passagierin, der Steward, die Stewardess, die Kabine, die Landung,
 * landen, der Notausgang, das Fahrzeug, das Kraftfahrzeug, das Motorrad,
 * die Bremse, die Kurve, das Benzin, das Kennzeichen, der Gang,
 * die Vorfahrt, die Fahrbahn, der Gehsteig, die Einbahnstraße,
 * die Umleitung, überqueren, der Führerausweis, losfahren.
 */
export const b1U31: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u31-r1",
    level: "B1",
    skill: "reading",
    unit: 31,
    title: "Mit der Bahn quer durchs Land",
    genre: "Yolculuk bilgisi",
    intro: "Trenle yolculuk. Hangi araçla nereye, ne kadar mola?",
    minutes: 5,
    gloss: [
      { de: "der Hauptbahnhof", tr: "ana gar", en: "main station" },
      { de: "das Billett", tr: "bilet", en: "ticket" },
      { de: "der Perron", tr: "peron", en: "platform" },
      { de: "der Aufenthalt", tr: "mola / bekleme", en: "stopover" },
      { de: "die Rückfahrt", tr: "dönüş", en: "return journey" },
    ],
    text:
      "Wer mit der Bahn fährt, kauft das Billett am besten vorher. " +
      "Am Schalter im Hauptbahnhof ist es teurer als online, und die " +
      "Schlange dort ist morgens lang.\n\n" +
      "Achten Sie auf den Perron. Bei uns wechselt er oft kurzfristig, " +
      "und die Meldung kommt nur einmal. Wenn Sie mit dem Tram zum Bahnhof " +
      "kommen, rechnen Sie zehn Minuten mehr ein.\n\n" +
      "Bei langen Strecken lohnt sich ein Aufenthalt in der Mitte. " +
      "Man darf mit dem gleichen Billett unterwegs aussteigen, wenn man am " +
      "selben Tag weiterfährt. Für die Rückfahrt gilt das nicht.\n\n" +
      "Und ein letzter Hinweis: Die Eisenbahn ist bei Verspätung großzügig, " +
      "aber nur schriftlich. Sammeln Sie den Beleg — nach einer Stunde " +
      "bekommen Sie einen Teil zurück.",
    questions: [
      {
        text: "Wo ist das Billett teurer?",
        options: ["Online", "Am Schalter im Hauptbahnhof", "Im Zug"],
        answer: 1,
        explain: "„Am Schalter im Hauptbahnhof ist es teurer als online …“",
      },
      {
        text: "Worauf soll man achten?",
        options: ["Auf den Perron", "Auf das Wetter", "Auf die Linie"],
        answer: 0,
        explain: "„Achten Sie auf den Perron. Bei uns wechselt er oft kurzfristig …“",
      },
      {
        text: "Wann darf man unterwegs aussteigen?",
        options: ["Immer", "Wenn man am selben Tag weiterfährt", "Nur bei der Rückfahrt"],
        answer: 1,
        explain: "„Man darf mit dem gleichen Billett unterwegs aussteigen, wenn man am selben Tag weiterfährt.“",
      },
      {
        kind: "gapfill",
        text: "Wenn Sie ___ ___ Tram zum Bahnhof kommen, rechnen Sie zehn Minuten mehr ein.",
        options: [],
        answer: 0,
        accept: ["mit dem"],
        explain: "Araç bildirimi: mit + Dativ, artikel düşmez.",
      },
      {
        kind: "short_answer",
        text: "Ab wann bekommt man bei Verspätung Geld zurück?",
        options: [],
        answer: 0,
        accept: ["nach einer Stunde", "eine Stunde", "ab einer Stunde"],
        explain: "„… nach einer Stunde bekommen Sie einen Teil zurück.“",
      },
    ],
  },
  {
    id: "b1-u31-r2",
    level: "B1",
    skill: "reading",
    unit: 31,
    title: "Was auf der Straße gilt",
    genre: "Trafik bilgisi",
    intro: "Trafik kuralları. Kim geçer, nerede yürünür?",
    minutes: 5,
    gloss: [
      { de: "die Vorfahrt", tr: "geçiş üstünlüğü", en: "right of way" },
      { de: "die Fahrbahn", tr: "yol / şerit", en: "carriageway" },
      { de: "der Gehsteig", tr: "kaldırım", en: "pavement" },
      { de: "die Einbahnstraße", tr: "tek yön", en: "one-way street" },
      { de: "überqueren", tr: "karşıdan karşıya geçmek", en: "to cross" },
    ],
    text:
      "Die wichtigste Regel steht auf keinem Schild: wer unsicher ist, " +
      "fährt langsam. Alles andere kann man lernen.\n\n" +
      "Ohne Schild gilt rechts vor links. Das heißt: das Fahrzeug von " +
      "rechts hat Vorfahrt, auch wenn die andere Straße breiter aussieht. " +
      "In einer Einbahnstraße fährt trotzdem manchmal ein Radfahrer " +
      "in die andere Richtung — das ist oft erlaubt und steht klein am Schild.\n\n" +
      "Zu Fuß überquert man die Fahrbahn am Streifen oder an der Ampel. " +
      "Der Gehsteig gehört den Fußgängern; ein Motorrad darf dort weder " +
      "fahren noch stehen.\n\n" +
      "Bei einer Umleitung folgen Sie den Schildern, nicht dem Gerät im " +
      "Auto. Das Gerät kennt die Umleitung meistens noch nicht und schickt " +
      "Sie in die gesperrte Straße zurück.",
    questions: [
      {
        text: "Was ist die wichtigste Regel?",
        options: ["Rechts vor links", "Wer unsicher ist, fährt langsam", "Immer bremsen"],
        answer: 1,
        explain: "„Die wichtigste Regel steht auf keinem Schild: wer unsicher ist, fährt langsam.“",
      },
      {
        text: "Wer hat ohne Schild Vorfahrt?",
        options: ["Das Fahrzeug von rechts", "Das schnellere Fahrzeug", "Wer auf der breiteren Straße ist"],
        answer: 0,
        explain: "„… das Fahrzeug von rechts hat Vorfahrt …“",
      },
      {
        text: "Wem soll man bei einer Umleitung folgen?",
        options: ["Dem Gerät im Auto", "Den Schildern", "Den anderen Autos"],
        answer: 1,
        explain: "„Bei einer Umleitung folgen Sie den Schildern, nicht dem Gerät im Auto.“",
      },
      {
        kind: "gapfill",
        text: "___ ___ überquert man die Fahrbahn am Streifen oder an der Ampel.",
        options: [],
        answer: 0,
        accept: ["Zu Fuß"],
        explain: "Tek istisna: „zu Fuß“ artikelsizdir, ötekiler mit + dem/der alır.",
      },
      {
        kind: "short_answer",
        text: "Wem gehört der Gehsteig?",
        options: [],
        answer: 0,
        accept: ["den Fußgängern", "Fußgängern", "den Fußgängern, nicht den Motorrädern"],
        explain: "„Der Gehsteig gehört den Fußgängern …“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u31-l1",
    level: "B1",
    skill: "listening",
    unit: 31,
    title: "Vor der Landung",
    genre: "Uçakta anons ve sohbet",
    intro: "Uçuşun sonu. Ne söyleniyor, yolcu ne soruyor?",
    minutes: 4,
    gloss: [
      { de: "die Landung", tr: "iniş", en: "landing" },
      { de: "der Passagier", tr: "yolcu", en: "passenger" },
      { de: "die Kabine", tr: "kabin", en: "cabin" },
      { de: "der Notausgang", tr: "acil çıkış", en: "emergency exit" },
    ],
    segments: [
      { text: "Meine Damen und Herren, wir beginnen mit der Landung." },
      { text: "Entschuldigung, wie lange dauert es noch?" },
      { text: "Etwa zwanzig Minuten. Bitte bleiben Sie sitzen." },
      { text: "Ich habe einen Anschluss. Fahre ich besser mit dem Zug weiter?" },
      { text: "Mit dem Zug sind Sie in einer Stunde in der Stadt." },
      { text: "Und mit dem Bus?" },
      { text: "Länger, aber billiger. Der Steward am Notausgang kennt die Zeiten." },
      { text: "Danke. Dann frage ich ihn, sobald die Kabine offen ist." },
    ],
    questions: [
      {
        text: "Wie lange dauert es noch bis zur Landung?",
        options: ["Zwanzig Minuten", "Eine Stunde", "Fünf Minuten"],
        answer: 0,
        explain: "„Etwa zwanzig Minuten. Bitte bleiben Sie sitzen.“",
      },
      {
        text: "Wie lange dauert die Fahrt mit dem Zug in die Stadt?",
        options: ["Eine Stunde", "Zwanzig Minuten", "Zwei Stunden"],
        answer: 0,
        explain: "„Mit dem Zug sind Sie in einer Stunde in der Stadt.“",
      },
      {
        text: "Was ist der Vorteil des Busses?",
        options: ["Er ist schneller", "Er ist billiger", "Er fährt öfter"],
        answer: 1,
        explain: "„Länger, aber billiger.“",
      },
      {
        kind: "gapfill",
        text: "Fahre ich besser ___ ___ Zug weiter?",
        options: [],
        answer: 0,
        accept: ["mit dem"],
        explain: "mit + Dativ, artikel korunur.",
      },
      {
        kind: "short_answer",
        text: "Wer kennt die Zeiten?",
        options: [],
        answer: 0,
        accept: ["der Steward", "der Steward am Notausgang", "Steward"],
        explain: "„Der Steward am Notausgang kennt die Zeiten.“",
      },
    ],
  },
  {
    id: "b1-u31-l2",
    level: "B1",
    skill: "listening",
    unit: 31,
    title: "Unterwegs mit dem Auto",
    genre: "Yolda konuşma",
    intro: "Araba yolda sorun çıkarıyor. Ne oluyor, nereye gidiliyor?",
    minutes: 4,
    gloss: [
      { de: "die Bremse", tr: "fren", en: "brake" },
      { de: "das Benzin", tr: "benzin", en: "petrol" },
      { de: "der Gang", tr: "vites", en: "gear" },
      { de: "losfahren", tr: "yola çıkmak", en: "to set off" },
    ],
    segments: [
      { text: "Hörst du das? Die Bremse macht seit der Kurve ein Geräusch." },
      { text: "Ja. Wir fahren zur nächsten Werkstatt, nicht nach Hause." },
      { text: "Und das Benzin? Wir haben noch knapp ein Viertel." },
      { text: "Das reicht. Die Tankstelle ist auf dem Weg." },
      { text: "Sollen wir bei der Umleitung trotzdem in die Stadt fahren?" },
      { text: "Nein. Erst in die Werkstatt, dann sehen wir weiter." },
      { text: "Gut. Fahr im zweiten Gang los, das ist ruhiger." },
      { text: "Mache ich. Und wenn es schlimmer wird, halten wir sofort." },
    ],
    questions: [
      {
        text: "Was macht ein Geräusch?",
        options: ["Die Bremse", "Der Motor", "Das Rad"],
        answer: 0,
        explain: "„Die Bremse macht seit der Kurve ein Geräusch.“",
      },
      {
        text: "Wohin fahren sie zuerst?",
        options: ["Nach Hause", "In die Werkstatt", "In die Stadt"],
        answer: 1,
        explain: "„Erst in die Werkstatt, dann sehen wir weiter.“",
      },
      {
        text: "Wie viel Benzin ist noch da?",
        options: ["Knapp ein Viertel", "Die Hälfte", "Fast nichts"],
        answer: 0,
        explain: "„Und das Benzin? Wir haben noch knapp ein Viertel.“",
      },
      {
        kind: "gapfill",
        text: "Wir fahren zur nächsten Werkstatt, nicht ___ Hause.",
        options: [],
        answer: 0,
        accept: ["nach"],
        explain: "„nach Hause“ kalıptır; kuruma gidiş ise „zur Werkstatt“.",
      },
      {
        kind: "short_answer",
        text: "In welchem Gang soll sie losfahren?",
        options: [],
        answer: 0,
        accept: ["im zweiten Gang", "zweiter Gang", "im zweiten"],
        explain: "„Fahr im zweiten Gang los, das ist ruhiger.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u31-w1",
    level: "B1",
    skill: "writing",
    unit: 31,
    title: "Der Reiseplan",
    genre: "Yolculuk planı",
    intro: "Bir yolculuk planla. Araç bildirirken artikel düşmez.",
    minutes: 8,
    gloss: [
      { de: "die Eisenbahn", tr: "demiryolu", en: "railway" },
      { de: "die Linie", tr: "hat", en: "line" },
      { de: "das Tram", tr: "tramvay", en: "tram" },
      { de: "der Aufenthalt", tr: "mola", en: "stopover" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Ana gara tramvayla gidiyorum.",
        answer: "Ich fahre mit dem Tram zum Hauptbahnhof.",
        hint: "mit + Dativ, artikel korunur.",
      },
      {
        kind: "build",
        tr: "Oradan trenle devam ediyorum.",
        answer: "Von dort fahre ich mit dem Zug weiter.",
        hint: "Yine mit + dem.",
      },
      {
        kind: "build",
        tr: "Son bölümü yürüyerek gidiyorum.",
        answer: "Das letzte Stück gehe ich zu Fuß.",
        hint: "Tek istisna: zu Fuß, artikelsiz.",
      },
      {
        kind: "form",
        prompt: "Yolculuk kartını doldur.",
        facts: "Yolcu: Nuri Öz; ilk araç: tramvay; ikinci araç: tren; mola: ortada 40 dakika; son bölüm: yürüyerek.",
        fields: [
          { label: "Name", answer: "Nuri Öz", accept: ["Nuri", "Öz"] },
          { label: "Zuerst", answer: "mit dem Tram", accept: ["Tram", "mit dem Tram zum Bahnhof"] },
          { label: "Dann", answer: "mit dem Zug", accept: ["Zug", "mit dem Zug"] },
          { label: "Letztes Stück", answer: "zu Fuß", accept: ["zu Fuss", "zu Fuß gehen"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Araç bildiriminde eksik artikeli ekle.",
        source: "Ich fahre mit Zug bis Bern und dann mit Tram weiter.",
        answer: "Ich fahre mit dem Zug bis Bern und dann mit dem Tram weiter.",
        why: "Türkçe araç bildirmeyi TEK EKLE yapar ('trenle', 'tramvayla') ve artikel diye bir sorun hiç doğmaz, o yüzden Almancada da çıplak isim yazılıyor. Almanca mit + DATİV ister ve artikel düşmez: mit dem Zug, mit der Bahn, mit dem Auto. Tek istisna 'zu Fuß'.",
      },
    ],
  },
  {
    id: "b1-u31-w2",
    level: "B1",
    skill: "writing",
    unit: 31,
    title: "Reisebericht",
    genre: "Yolculuk anlatısı",
    intro: "Bir yolculuğu anlat. Türkçe '-e' Almancada üç ayrı sözcüktür.",
    minutes: 12,
    gloss: [
      { de: "die Rückfahrt", tr: "dönüş", en: "return journey" },
      { de: "landen", tr: "inmek", en: "to land" },
      { de: "die Umleitung", tr: "yol değişikliği", en: "diversion" },
      { de: "das Fahrzeug", tr: "araç", en: "vehicle" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Önce Berlin'e, sonra İsviçre'ye gittim.",
        answer: "Zuerst bin ich nach Berlin gefahren, dann in die Schweiz.",
        hint: "Artikelsiz şehir → nach; artikelli ülke → in + Akkusativ.",
      },
      {
        kind: "build",
        tr: "Oradan doğrudan kız kardeşime gittim.",
        answer: "Von dort bin ich direkt zu meiner Schwester gefahren.",
        hint: "Kişiye gidiş → zu + Dativ.",
      },
      {
        kind: "free",
        prompt: "Bir yolculuğu anlat: nereye gittin, hangi araçlarla, yolda ne oldu, ne kadar sürdü, ve dönüş nasıldı. En az üç farklı yön edatı kullan (nach / in / zu) ve en az iki 'mit dem/der' araç bildirimi.",
        checklist: [
          "Varış yerleri net mi?",
          "En az iki araç 'mit dem/der' ile bildirilmiş mi?",
          "nach, in ve zu üçü de geçiyor mu?",
          "Yolda bir olay anlatılmış mı?",
          "Dönüş hakkında bir cümle var mı?",
        ],
        minWords: 70,
        sample:
          "Im September bin ich zuerst nach Berlin gefahren und von dort in " +
          "die Schweiz. Die ganze Strecke habe ich mit dem Zug gemacht, " +
          "ohne ein Fahrzeug zu mieten.\n\n" +
          "In Berlin hatte ich einen Aufenthalt von vier Stunden. Ich bin " +
          "mit dem Tram in die Stadt gefahren und dann zu einem alten " +
          "Kollegen, der dort wohnt. Das letzte Stück bin ich zu Fuß " +
          "gegangen, weil eine Umleitung war.\n\n" +
          "Unterwegs gab es eine Verspätung von einer Stunde. Das war " +
          "ärgerlich, aber die Eisenbahn hat später einen Teil " +
          "zurückgezahlt — schriftlich, mit dem Beleg.\n\n" +
          "Die Rückfahrt lief besser. Ich bin am Abend losgefahren und " +
          "morgens angekommen, ausgeruht und ohne Umsteigen.",
        phrases: [
          { de: "Ich bin nach … gefahren.", tr: "… şehrine gittim.", en: "I travelled to …" },
          { de: "… in die Schweiz / in die Türkei", tr: "… İsviçre'ye / Türkiye'ye", en: "… to Switzerland / to Turkey" },
          { de: "… zu einem Kollegen", tr: "… bir meslektaşa", en: "… to a colleague" },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Yön edatlarını düzelt.",
        source: "Ich fahre nach die Schweiz und dann nach meiner Schwester.",
        answer: "Ich fahre in die Schweiz und dann zu meiner Schwester.",
        why: "Türkçe '-e/-a' üç yönü de karşılar ('Berlin'e', 'İsviçre'ye', 'kardeşime'), o yüzden Almancada tek edat seçiliyor. Almanca üçe ayırır: ARTİKELSİZ şehir ve ülkeye nach (nach Berlin, nach Deutschland), ARTİKELLİ ülkeye in + Akkusativ (in die Schweiz, in die Türkei), KİŞİYE ve kuruma zu + Dativ (zu meiner Schwester, zum Arzt).",
      },
    ],
  },
];
