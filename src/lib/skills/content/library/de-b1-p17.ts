import type { SkillExercise } from "../../types";

/**
 * DE · B1 — Beceriler kütüphanesi, parti 17.
 *
 * B1 hücresini YİRMİYE tamamlayan partilerden biri. Kurallar ve emsal:
 * `de-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 17 "kendin yap mı, yaptır mı" hattı: çarşıdaki bir terzi dükkânının
 * portresi, boya ustasıyla telefonda randevu, bahçe bakımı için fiyat teklifi
 * isteyen e-posta. Dil bilgisi ettirgen lassen — etwas machen lassen,
 * jemanden etwas machen lassen ve Perfekt'te iki mastar.
 */
export const deB1P17: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b1-lib-r17",
    course: "de",
    level: "B1",
    skill: "reading",
    title: "Kürzer, enger, wie neu",
    genre: "article",
    intro: "Bir terzi dükkânını anlatan yerel yazı: müşteriler bugün ne getiriyor, fiyatlar nasıl, dükkân sahibini ne düşündürüyor.",
    gloss: [
      { de: "kürzen", tr: "kısaltmak", en: "to take up" },
      { de: "der Reißverschluss", tr: "fermuar", en: "zip" },
      { de: "flicken", tr: "yamamak", en: "to patch" },
      { de: "umnähen", tr: "yeniden dikmek", en: "to alter" },
      { de: "die Nachfrage", tr: "talep", en: "demand" },
      { de: "übernehmen", tr: "devralmak", en: "to take over" },
    ],
    minutes: 6,
    text:
      "Kürzer, enger, wie neu\n\n" +
      "Die kleine Schneiderei von Ahmet Demir liegt zwischen einer Apotheke und einem Handyladen. Auf dem " +
      "Schild steht nur „Änderungen aller Art“, aber drinnen ist fast immer etwas los.\n\n" +
      "Seit dreißig Jahren lassen die Leute hier ihre Hosen kürzen, Kleider enger machen und " +
      "Reißverschlüsse erneuern. In den letzten zwei Jahren hat sich die Arbeit aber verändert. " +
      "„Früher kamen die Leute mit neuen Sachen, die nicht gepasst haben“, sagt Demir. „Heute bringen sie " +
      "alte Lieblingsstücke, die sie nicht wegwerfen wollen.“ Eine Kundin hat vor Kurzem den Mantel ihrer " +
      "Mutter umnähen lassen, eine andere lässt jedes Jahr dieselbe Jeans flicken.\n\n" +
      "Die Preise sind gestiegen, aber nicht so stark wie die Nachfrage. Eine Hose zu kürzen kostet zwölf " +
      "Euro, ein neuer Reißverschluss zwanzig. Wer es eilig hat, muss Geduld mitbringen: Zurzeit dauert " +
      "ein Auftrag zehn Tage.\n\n" +
      "Sorgen macht Demir etwas anderes. Er ist einundsechzig und findet niemanden, der den Laden " +
      "übernehmen will. Seine Tochter hat Informatik studiert. „Ich lasse sie manchmal hier an der Kasse " +
      "sitzen“, sagt er und lacht, „aber das Nähen will sie einfach nicht lernen.“",
    questions: [
      {
        text: "Was hat sich bei der Arbeit in der Schneiderei verändert?",
        options: [
          "Die Leute bringen heute alte Lieblingsstücke.",
          "Die Leute bringen nur noch neue Kleidung.",
          "Der Laden repariert jetzt auch Handys.",
        ],
        answer: 0,
        explain: "„Heute bringen sie alte Lieblingsstücke, die sie nicht wegwerfen wollen.“",
      },
      {
        text: "Wie lange dauert ein Auftrag zurzeit?",
        options: ["zwei Tage", "zehn Tage", "drei Wochen"],
        answer: 1,
        explain: "„Zurzeit dauert ein Auftrag zehn Tage.“",
      },
      {
        kind: "truefalse",
        text: "Eine Kundin lässt jedes Jahr dieselbe Jeans reparieren.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„… eine andere lässt jedes Jahr dieselbe Jeans flicken.“",
      },
      {
        kind: "gapfill",
        text: "Eine Hose zu kürzen kostet ___ Euro.",
        options: [],
        answer: 0,
        accept: ["zwölf", "12"],
        explain: "„Eine Hose zu kürzen kostet zwölf Euro, ein neuer Reißverschluss zwanzig.“",
      },
      {
        kind: "short_answer",
        text: "Was hat die Tochter von Herrn Demir studiert?",
        options: [],
        answer: 0,
        accept: ["Informatik"],
        explain: "„Seine Tochter hat Informatik studiert“ — dikiş öğrenmek istemiyor.",
      },
      {
        text: "Was macht Herrn Demir Sorgen?",
        options: [
          "die hohe Miete für den Laden",
          "die vielen Handyläden in der Straße",
          "dass niemand den Laden übernehmen will",
        ],
        answer: 2,
        explain: "„… und findet niemanden, der den Laden übernehmen will.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b1-lib-l17",
    course: "de",
    level: "B1",
    skill: "listening",
    title: "Anruf beim Malerbetrieb",
    genre: "phone",
    intro: "Bir müşteri iki odayı boyatmak için boya firmasını arıyor: tarih, eşyalar, renk ve fiyat konuşuluyor.",
    gloss: [
      { de: "streichen", tr: "boyamak", en: "to paint" },
      { de: "die Decke", tr: "tavan", en: "ceiling" },
      { de: "das Angebot", tr: "fiyat teklifi", en: "quote" },
      { de: "ausräumen", tr: "boşaltmak", en: "to clear out" },
      { de: "abdecken", tr: "örtmek", en: "to cover" },
      { de: "die Schicht", tr: "kat", en: "coat" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Herr Kunze", text: "Malerbetrieb Kunze, guten Morgen." },
      { speaker: "Frau Alt", text: "Guten Morgen, hier ist Alt. Wir möchten zwei Zimmer streichen lassen, das Wohnzimmer und ein kleines Kinderzimmer. Haben Sie im Mai noch einen Termin?" },
      { speaker: "Herr Kunze", text: "Im Mai wird es knapp, frühestens ab dem zwanzigsten Juni. Wie groß sind die Zimmer denn ungefähr?" },
      { speaker: "Frau Alt", text: "Das Wohnzimmer hat etwa fünfundzwanzig Quadratmeter, das Kinderzimmer zwölf. Die Decke ist bei uns ziemlich hoch." },
      { speaker: "Herr Kunze", text: "Dann komme ich lieber vorher vorbei und schaue es mir an. Ein Angebot am Telefon wird bei hohen Decken oft falsch." },
      { speaker: "Frau Alt", text: "Gern. Können wir die Möbel stehen lassen, oder müssen wir alles ausräumen?" },
      { speaker: "Herr Kunze", text: "Große Schränke können Sie stehen lassen, die schieben wir in die Mitte und decken sie ab. Bilder und Lampen sollten aber weg sein." },
      { speaker: "Frau Alt", text: "Und die Farbe? Mein Sohn möchte sein Zimmer unbedingt dunkelblau haben." },
      { speaker: "Herr Kunze", text: "Kein Problem, aber bei Dunkelblau brauchen wir zwei Schichten. Das kostet ungefähr ein Drittel mehr." },
      { speaker: "Herr Kunze", text: "Passt Ihnen Donnerstag um acht für die Besichtigung? Dann schicke ich Ihnen das Angebot bis Montag." },
    ],
    questions: [
      {
        text: "Was möchte Frau Alt?",
        options: [
          "zwei Zimmer streichen lassen",
          "neue Möbel für das Kinderzimmer kaufen",
          "die Decke im Wohnzimmer erneuern lassen",
        ],
        answer: 0,
        explain: "„Wir möchten zwei Zimmer streichen lassen, das Wohnzimmer und ein kleines Kinderzimmer.“",
      },
      {
        text: "Warum will Herr Kunze vorher vorbeikommen?",
        options: [
          "weil er die Farbe zeigen möchte",
          "weil ein Angebot am Telefon bei hohen Decken oft falsch wird",
          "weil Frau Alt am Telefon keine Zeit hat",
        ],
        answer: 1,
        explain: "„Ein Angebot am Telefon wird bei hohen Decken oft falsch.“",
      },
      {
        kind: "truefalse",
        text: "Große Schränke dürfen im Zimmer bleiben.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Ortaya itilip örtülecekler; yalnız tablolar ve lambalar kaldırılmalı.",
      },
      {
        kind: "gapfill",
        text: "Frühestens ab dem ___ Juni ist ein Termin frei.",
        options: [],
        answer: 0,
        accept: ["zwanzigsten", "20."],
        explain: "„Im Mai wird es knapp, frühestens ab dem zwanzigsten Juni.“",
      },
      {
        kind: "short_answer",
        text: "Wann soll die Besichtigung stattfinden?",
        options: [],
        answer: 0,
        accept: ["Donnerstag um acht", "am Donnerstag um acht", "am Donnerstag", "Donnerstag"],
        explain: "„Passt Ihnen Donnerstag um acht für die Besichtigung?“",
      },
      {
        text: "Warum wird das Kinderzimmer teurer?",
        options: [
          "weil es größer als das Wohnzimmer ist",
          "weil die Decke dort höher ist",
          "weil Dunkelblau zwei Schichten braucht",
        ],
        answer: 2,
        explain: "„… bei Dunkelblau brauchen wir zwei Schichten. Das kostet ungefähr ein Drittel mehr.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b1-lib-w17",
    course: "de",
    level: "B1",
    skill: "writing",
    title: "Anfrage: Gartenpflege im Sommer",
    genre: "email",
    intro: "Bir süre bahçene bakamayacaksın: önce iki cümle kur, sonra bir bahçe hizmetinden fiyat teklifi isteyen bir e-posta yaz.",
    gloss: [
      { de: "der Rasen", tr: "çim", en: "lawn" },
      { de: "mähen", tr: "biçmek", en: "to mow" },
      { de: "die Hecke", tr: "çit", en: "hedge" },
      { de: "gießen", tr: "sulamak", en: "to water" },
      { de: "das Angebot", tr: "fiyat teklifi", en: "quote" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Çimleri iki haftada bir biçtirmek istiyoruz.",
        answer: "Wir möchten den Rasen alle zwei Wochen mähen lassen.",
        alternatives: ["Wir möchten alle zwei Wochen den Rasen mähen lassen."],
        hint: "İşi başkası yapıyor: „lassen“ + mastar. Modal fiille iki mastar sonda durur: mähen lassen.",
      },
      {
        kind: "build",
        tr: "Çiti geçen yıl bir firmaya kestirdik.",
        answer: "Die Hecke haben wir letztes Jahr von einer Firma schneiden lassen.",
        alternatives: ["Wir haben die Hecke letztes Jahr von einer Firma schneiden lassen."],
        hint: "Perfekt'te „lassen“ Partizip'e dönüşmez, mastar kalır: haben … schneiden lassen.",
      },
      {
        kind: "free",
        prompt:
          "Bir bahçe hizmetine e-posta yaz: bahçeni ve büyüklüğünü kısaca tarif et, hangi işleri ne sıklıkla yaptırmak istediğini yaz, hangi dönem için olduğunu söyle, özel bir isteğini belirt ve fiyat teklifi iste.",
        checklist: [
          "Bahçeyi ve büyüklüğünü tarif et",
          "Yaptırmak istediğin işleri ve sıklığını yaz",
          "Dönemi ve özel isteğini belirt",
          "Fiyat teklifi ve bir cevap iste",
        ],
        minWords: 90,
        phrases: [
          { de: "Wir suchen für die Zeit von … bis … jemanden, der …", tr: "… ile … arasındaki dönem için … yapacak birini arıyoruz.", en: "We are looking for someone for the period from … to … who …" },
          { de: "Der Garten ist etwa … Quadratmeter groß.", tr: "Bahçe yaklaşık … metrekare.", en: "The garden is about … square metres." },
          { de: "Wir möchten … lassen.", tr: "…'i yaptırmak istiyoruz.", en: "We would like to have … done." },
          { de: "Wichtig wäre uns außerdem, dass …", tr: "Ayrıca … bizim için önemli olur.", en: "It would also be important to us that …" },
          { de: "Könnten Sie uns ein Angebot schicken?", tr: "Bize bir fiyat teklifi gönderebilir misiniz?", en: "Could you send us a quote?" },
        ],
        sample:
          "Sehr geehrte Damen und Herren,\n\n" +
          "wir suchen für die Zeit von Juni bis August jemanden, der sich um unseren Garten kümmert, weil " +
          "ich nach einer Operation nicht schwer arbeiten darf. Der Garten ist etwa dreihundert Quadratmeter " +
          "groß, mit Rasen, einer langen Hecke und einigen Beeten mit Gemüse. Wir möchten den Rasen alle " +
          "zwei Wochen mähen lassen. Die Hecke haben wir letztes Jahr von einer Firma schneiden lassen; das " +
          "wäre auch dieses Jahr im Juli nötig. Das Gemüse gießen die Nachbarskinder, dafür brauchen wir also " +
          "keine Hilfe. Wichtig wäre uns außerdem, dass keine chemischen Mittel verwendet werden, denn unser " +
          "Hund spielt viel im Garten. Könnten Sie uns ein Angebot schicken? Gern können Sie sich den Garten " +
          "vorher ansehen.\n\n" +
          "Mit freundlichen Grüßen\nCanan und Peter Wolf",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b1-lib-s17",
    course: "de",
    level: "B1",
    skill: "speaking",
    title: "Selbst machen oder machen lassen?",
    genre: "monologue",
    intro: "Bir dakikaya yakın tek başına konuşacaksın: evdeki işlerde kendin yapmakla yaptırmak arasındaki çizgini anlat.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Evde bir iş çıktığında — boya, montaj, küçük onarımlar — kendin mi yaparsın, yoksa bir ustaya mı yaptırırsın? Kuralını söyle, bir örnek ver, yanıldığın bir durumu anlat ve bir öneriyle bitir.",
      bulletsTr: [
        "Genel tercihini tek cümleyle söyle",
        "Bir örnek anlat",
        "Yanıldığın bir durumu anlat",
        "Başkalarına bir öneride bulun",
      ],
      targets: [
        { de: "Kleine Sachen mache ich selbst, aber … lasse ich machen.", tr: "Küçük işleri kendim yaparım ama …'i yaptırırım." },
        { de: "Letztes Jahr habe ich … machen lassen.", tr: "Geçen yıl …'i yaptırdım." },
        { de: "Da habe ich mich getäuscht: …", tr: "Orada yanıldım: …" },
        { de: "Mein Rat ist: …", tr: "Tavsiyem şu: …" },
      ],
      minSeconds: 40,
      maxSeconds: 80,
      sampleDe:
        "Kleine Sachen mache ich selbst, aber alles mit Strom und Wasser lasse ich machen. Eine Lampe " +
        "aufhängen oder ein Regal an die Wand bringen, das schaffe ich in einer Stunde, und es macht mir " +
        "sogar Spaß. Letztes Jahr habe ich unser Bad neu fliesen lassen, weil ich wusste, dass ich das nicht " +
        "gerade hinbekomme. Das war teuer, aber es sieht heute noch gut aus. Einmal habe ich mich allerdings " +
        "getäuscht: Ich wollte beim Umzug Geld sparen und habe die Küche selbst aufgebaut. Nach drei " +
        "Wochenenden hing ein Schrank schief, und am Ende kam trotzdem ein Handwerker. Mein Rat ist: " +
        "Rechnen Sie nicht nur das Geld, sondern auch Ihre Zeit und Ihre Nerven. Wer beides ehrlich zählt, " +
        "lässt öfter machen, als er denkt.",
      rubricHint:
        "Bir kural, bir örnek ve bir yanılgı beklenir; „lassen“ + mastar ve Perfekt'te „habe … machen lassen“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b1-lib-g17",
    course: "de",
    level: "B1",
    skill: "grammar",
    title: "Ich lasse mein Fahrrad reparieren",
    genre: "grammar",
    intro: "„lassen“ bir mastarla birlikte işi başkasına yaptırmayı ya da birine izin vermeyi anlatır; Türkçedeki ettirgen ekin karşılığıdır.",
    focus: "Ettirgen lassen: etwas machen lassen ve jemanden etwas machen lassen",
    gloss: [
      { de: "reparieren", tr: "tamir etmek", en: "to repair" },
      { de: "das Fahrrad", tr: "bisiklet", en: "bicycle" },
      { de: "schneiden", tr: "kesmek", en: "to cut" },
      { de: "die Werkstatt", tr: "tamirhane", en: "repair shop" },
      { de: "streichen", tr: "boyamak", en: "to paint" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "Yaptırmak: lassen + mastar",
        tr: "İşi kendin değil başkası yapıyorsa „lassen“ çekimlenir, asıl fiil mastar olarak sona gider. Türkçede bunu fiile eklenen ettirgen ekle söyleriz: „tamir ettiriyorum“. İşi kimin yaptığı önemliyse „von + Dativ“ eklenir.",
        examples: [
          { de: "Ich lasse mein Fahrrad reparieren.", tr: "Bisikletimi tamir ettiriyorum.", note: "lasse … reparieren" },
          { de: "Sie lässt sich die Haare schneiden.", tr: "Saçlarını kestiriyor.", note: "kendine: sich" },
          { de: "Wir lassen das Auto in der Werkstatt prüfen.", tr: "Arabayı tamirhanede kontrol ettiriyoruz.", note: "yer: in der Werkstatt" },
        ],
      },
      {
        heading: "İzin vermek: jemanden etwas machen lassen",
        tr: "Aynı yapı bir kişiyle kurulunca „izin vermek“ anlamı çıkar: „Ich lasse die Kinder im Garten spielen.“ Kişi Akkusativ'dedir. Anlamı bağlam belirler: eşya varsa çoğu zaman yaptırmak, kişi varsa çoğu zaman izin.",
        examples: [
          { de: "Ich lasse die Kinder im Garten spielen.", tr: "Çocukların bahçede oynamasına izin veriyorum.", note: "kişi → izin" },
          { de: "Lass mich bitte ausreden!", tr: "Lütfen sözümü bitirmeme izin ver!", note: "emir kipi: lass" },
          { de: "Die Lehrerin lässt uns heute früher gehen.", tr: "Öğretmen bugün erken çıkmamıza izin veriyor.", note: "uns = Akkusativ" },
        ],
      },
      {
        heading: "Perfekt'te iki mastar",
        tr: "Perfekt'te „lassen“ Partizip II'ye dönüşmez, mastar olarak kalır: „Ich habe mein Fahrrad reparieren lassen“, „gelassen“ değil. Böylece cümlenin sonunda iki mastar yan yana durur; modal fiillerde de aynı kural geçerlidir.",
        examples: [
          { de: "Ich habe mein Fahrrad reparieren lassen.", tr: "Bisikletimi tamir ettirdim.", note: "gelassen değil" },
          { de: "Wir haben die Küche streichen lassen.", tr: "Mutfağı boyattık.", note: "iki mastar sonda" },
          { de: "Hast du dir die Haare schneiden lassen?", tr: "Saçlarını mı kestirdin?", note: "soru: hast başta" },
        ],
      },
    ],
    questions: [
      {
        text: "Ich ___ mein Fahrrad reparieren.",
        options: ["lasse", "lässt", "lassen"],
        answer: 0,
        explain: "Özne „ich“: lassen fiili lasse olarak çekimlenir, asıl fiil mastar kalır.",
      },
      {
        text: "Ich habe mein Fahrrad reparieren ___.",
        options: ["gelassen", "lassen", "gelasst"],
        answer: 1,
        explain: "Perfekt'te başka bir mastarla birlikte „lassen“ mastar olarak kalır.",
      },
      {
        text: "Welcher Satz bedeutet „Saçlarını kestiriyor.“?",
        options: [
          "Sie schneidet ihre Haare.",
          "Sie hat ihre Haare geschnitten.",
          "Sie lässt sich die Haare schneiden.",
        ],
        answer: 2,
        explain: "İşi başkası yapıyor: lassen + mastar; ilk iki cümlede kendisi kesiyor.",
      },
      {
        kind: "gapfill",
        text: "Wir ___ das Auto in der Werkstatt prüfen. (lassen)",
        options: [],
        answer: 0,
        accept: ["lassen"],
        explain: "Özne „wir“: lassen; kontrolü tamirhane yapıyor.",
      },
      {
        kind: "gapfill",
        text: "Die Lehrerin ___ uns heute früher gehen. (lassen)",
        options: [],
        answer: 0,
        accept: ["lässt"],
        explain: "Üçüncü tekil kişide kök ünlüsü değişir: lässt. Burada anlam izin vermek.",
      },
      {
        kind: "gapfill",
        text: "Wir haben die Küche streichen ___.",
        options: [],
        answer: 0,
        accept: ["lassen"],
        explain: "Perfekt'te iki mastar: streichen lassen.",
      },
      {
        kind: "gapfill",
        text: "___ mich bitte ausreden! (lassen, du)",
        options: [],
        answer: 0,
        accept: ["Lass", "lass"],
        explain: "„du“ için emir kipi: Lass!",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Ich", "lasse", "die Kinder", "im Garten", "spielen"],
        explain: "„lassen“ ikinci sırada, izin verilen kişi Akkusativ'de, mastar en sonda.",
      },
      {
        kind: "truefalse",
        text: "„Ich habe die Hose kürzen gelassen.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Mastarla birlikte „gelassen“ kullanılmaz; doğrusu „kürzen lassen“.",
      },
      {
        kind: "truefalse",
        text: "„Er lässt sich jeden Monat die Haare schneiden.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: saçı başkası kesiyor, „sich“ işin kişinin kendisi için yapıldığını gösteriyor.",
      },
    ],
  },
];
