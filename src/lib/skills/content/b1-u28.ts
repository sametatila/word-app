import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 28 — "Sofra, fiyat, iade" (dersler 109–112).
 *
 * Dersler: Kuchen backen · Abschied am Tisch · Preise vergleichen ·
 * Der Umtausch.
 *
 * İki aktarım hatası bu ünitenin diline düşüyor:
 *   alles, WAS      Türkçede ilgi cümlesi tek sıfat-fiildir ('aldığım her
 *                   şey') ve zamir yoktur. Almanca ilgi zamirini seçtirir
 *                   ve BELİRSİZ bir öncülden sonra das değil was ister:
 *                   alles was, etwas was, nichts was, das was.
 *   als + artikelsiz Türkçede 'satıcı olarak' rol bildirir ve artikel
 *                   sorusu yoktur. Almanca meslek ve rol için als'tan
 *                   sonra artikeli DÜŞÜRÜR: als Verkäuferin arbeiten,
 *                   als Ersatz dienen. "als eine Verkäuferin" olmaz.
 *
 * Yeni 32 kelime: die Margarine, das Dessert, die Gratulation, der Saal,
 * spülen, abwaschen, der Empfang, empfangen, der Abschied,
 * die Verabredung, der Treffpunkt, das Kaffeehaus, das Picknick,
 * der Rand, das Tuch, die Vase, der Rabatt, der Katalog,
 * das Schaufenster, der Händler, der Anbieter, wertvoll, wertlos,
 * der Durchschnitt, der Umtausch, umtauschen, der Beleg, die Garantie,
 * der Ersatz, die Verkäuferin, der Käufer, der Kauf.
 */
export const b1U28: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u28-r1",
    level: "B1",
    skill: "reading",
    unit: 28,
    title: "Der Kuchen für den Empfang",
    genre: "Hazırlık notu",
    intro: "Bir kutlama için pasta yapılıyor. Kim ne yapıyor, ne kalıyor?",
    minutes: 5,
    gloss: [
      { de: "die Margarine", tr: "margarin", en: "margarine" },
      { de: "der Empfang", tr: "kabul / resepsiyon", en: "reception" },
      { de: "der Saal", tr: "salon", en: "hall" },
      { de: "abwaschen", tr: "bulaşık yıkamak", en: "to wash up" },
      { de: "die Gratulation", tr: "tebrik", en: "congratulations" },
    ],
    text:
      "Am Samstag ist der Empfang im großen Saal. Alles, was wir dafür " +
      "brauchen, hängt im Flur — bitte streicht durch, was " +
      "ihr schon mitgebracht habt.\n\n" +
      "Der Kuchen wird bei uns gebacken, nicht gekauft. Mit Margarine statt " +
      "Butter geht es genauso gut und ist billiger. Für achtzig Leute " +
      "brauchen wir vier Bleche.\n\n" +
      "Was danach übrig bleibt, kommt als Dessert auf den Nachmittag. " +
      "Bitte niemand vorher probieren — das ist alles, was ich verlange.\n\n" +
      "Zum Schluss noch etwas Wichtiges: abwaschen und spülen macht nicht " +
      "die Küche allein. Wer eine Gratulation hält, darf danach ruhig zehn " +
      "Minuten am Becken stehen. Das gehört dazu.",
    questions: [
      {
        text: "Wo findet der Empfang statt?",
        options: ["Im großen Saal", "Im Kaffeehaus", "Draußen"],
        answer: 0,
        explain: "„Am Samstag ist der Empfang im großen Saal.“",
      },
      {
        text: "Womit wird der Kuchen gebacken?",
        options: ["Mit Butter", "Mit Margarine", "Ohne Fett"],
        answer: 1,
        explain: "„Mit Margarine statt Butter geht es genauso gut und ist billiger.“",
      },
      {
        text: "Was passiert mit dem Rest?",
        options: ["Er wird weggeworfen", "Er kommt als Dessert auf den Nachmittag", "Er wird verkauft"],
        answer: 1,
        explain: "„Was danach übrig bleibt, kommt als Dessert auf den Nachmittag.“",
      },
      {
        kind: "gapfill",
        text: "Alles, ___ wir dafür brauchen, hängt im Flur.",
        options: [],
        answer: 0,
        accept: ["was"],
        explain: "Öncül belirsiz („alles“) → ilgi zamiri „was“, „das“ değil.",
      },
      {
        kind: "short_answer",
        text: "Wie viele Bleche braucht man für achtzig Leute?",
        options: [],
        answer: 0,
        accept: ["vier", "vier Bleche", "4"],
        explain: "„Für achtzig Leute brauchen wir vier Bleche.“",
      },
    ],
  },
  {
    id: "b1-u28-r2",
    level: "B1",
    skill: "reading",
    unit: 28,
    title: "Preise vergleichen",
    genre: "Tüketici rehberi",
    intro: "Fiyat karşılaştırması nasıl yapılır? Neye bakmalı, neye bakmamalı?",
    minutes: 5,
    gloss: [
      { de: "der Rabatt", tr: "indirim", en: "discount" },
      { de: "der Anbieter", tr: "satıcı firma", en: "provider" },
      { de: "das Schaufenster", tr: "vitrin", en: "shop window" },
      { de: "der Durchschnitt", tr: "ortalama", en: "average" },
      { de: "wertlos", tr: "değersiz", en: "worthless" },
    ],
    text:
      "Ein Rabatt von vierzig Prozent klingt gut, sagt aber allein gar " +
      "nichts. Vierzig Prozent von einem zu teuren Preis sind wertlos.\n\n" +
      "Schauen Sie deshalb nicht auf das Schild im Schaufenster, sondern " +
      "auf den Endpreis. Vergleichen Sie drei Anbieter, nicht zwei: " +
      "bei zwei Händlern wissen Sie nur, welcher billiger ist, nicht " +
      "was im Durchschnitt normal ist.\n\n" +
      "Alles, was Sie im Katalog sehen, gibt es meistens auch in anderen Läden. " +
      "Die Ausnahme sind Modelle, die es nur bei einem Händler gibt — dort ist " +
      "ein Vergleich schwer, und genau deshalb gibt es sie.\n\n" +
      "Und noch etwas: Ein teures Gerät ist nicht automatisch wertvoll. " +
      "Fragen Sie sich vor dem Kauf, wie oft Sie es wirklich benutzen. " +
      "Das ist die Zahl, die wirklich zählt.",
    questions: [
      {
        text: "Warum sagt ein Rabatt allein nichts?",
        options: ["Weil er zu klein ist", "Weil der Preis vorher zu teuer sein kann", "Weil er oft falsch ist"],
        answer: 1,
        explain: "„Vierzig Prozent von einem zu teuren Preis sind wertlos.“",
      },
      {
        text: "Wie viele Anbieter soll man vergleichen?",
        options: ["Zwei", "Drei", "Fünf"],
        answer: 1,
        explain: "„Vergleichen Sie drei Anbieter, nicht zwei …“",
      },
      {
        text: "Wo ist ein Vergleich schwer?",
        options: ["Bei Modellen, die es nur bei einem Händler gibt", "Im Katalog", "Im Schaufenster"],
        answer: 0,
        explain: "„Die Ausnahme sind Modelle, die es nur bei einem Händler gibt …“",
      },
      {
        kind: "gapfill",
        text: "Alles, ___ Sie im Katalog sehen, gibt es auch in anderen Läden.",
        options: [],
        answer: 0,
        accept: ["was"],
        explain: "„alles“ belirsiz öncüldür → was.",
      },
      {
        kind: "short_answer",
        text: "Was soll man sich vor dem Kauf fragen?",
        options: [],
        answer: 0,
        accept: ["wie oft man es benutzt", "wie oft ich es benutze", "wie oft"],
        explain: "„Fragen Sie sich vor dem Kauf, wie oft Sie es wirklich benutzen.“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u28-l1",
    level: "B1",
    skill: "listening",
    unit: 28,
    title: "Der Abschied am Tisch",
    genre: "Veda konuşması",
    intro: "Bir veda yemeği sonu. Ne planlanıyor, kim ne getiriyor?",
    minutes: 4,
    gloss: [
      { de: "der Abschied", tr: "veda", en: "farewell" },
      { de: "die Verabredung", tr: "buluşma sözü", en: "arrangement" },
      { de: "der Treffpunkt", tr: "buluşma yeri", en: "meeting point" },
      { de: "das Picknick", tr: "piknik", en: "picnic" },
    ],
    segments: [
      { text: "So, das war ein schöner Abend. Aber es ist kein richtiger Abschied." },
      { text: "Genau. Machen wir gleich eine Verabredung für den Sommer." },
      { text: "Ein Picknick? Am Fluss ist es im Juli am schönsten." },
      { text: "Gute Idee. Als Treffpunkt nehmen wir die Brücke." },
      { text: "Ich bringe Tücher und eine Vase mit, für den Tisch." },
      { text: "Eine Vase beim Picknick? Das ist typisch du." },
      { text: "Alles, was schön aussieht, gehört dazu. Auch draußen." },
      { text: "Einverstanden. Dann bis Juli — und diesmal wirklich." },
    ],
    questions: [
      {
        text: "Was planen sie für den Sommer?",
        options: ["Ein Picknick", "Eine Reise", "Ein Essen im Saal"],
        answer: 0,
        explain: "„Ein Picknick? Am Fluss ist es im Juli am schönsten.“",
      },
      {
        text: "Was ist der Treffpunkt?",
        options: ["Die Brücke", "Das Kaffeehaus", "Der Fluss"],
        answer: 0,
        explain: "„Als Treffpunkt nehmen wir die Brücke.“",
      },
      {
        text: "Was bringt die zweite Person mit?",
        options: ["Tücher und eine Vase", "Kuchen", "Nichts"],
        answer: 0,
        explain: "„Ich bringe Tücher und eine Vase mit, für den Tisch.“",
      },
      {
        kind: "gapfill",
        text: "Alles, ___ schön aussieht, gehört dazu.",
        options: [],
        answer: 0,
        accept: ["was"],
        explain: "„alles“ sonrası ilgi zamiri „was“.",
      },
      {
        kind: "short_answer",
        text: "In welchem Monat treffen sie sich?",
        options: [],
        answer: 0,
        accept: ["im Juli", "Juli"],
        explain: "„Dann bis Juli — und diesmal wirklich.“",
      },
    ],
  },
  {
    id: "b1-u28-l2",
    level: "B1",
    skill: "listening",
    unit: 28,
    title: "Ich möchte das umtauschen",
    genre: "Mağazada değişim",
    intro: "Bir ürün iade ediliyor. Ne gerekiyor, ne oluyor?",
    minutes: 4,
    gloss: [
      { de: "umtauschen", tr: "değiştirmek", en: "to exchange" },
      { de: "der Beleg", tr: "fiş", en: "receipt" },
      { de: "die Garantie", tr: "garanti", en: "guarantee" },
      { de: "der Ersatz", tr: "yedek / ikame", en: "replacement" },
    ],
    segments: [
      { text: "Guten Tag, ich möchte das hier umtauschen." },
      { text: "Gern. Haben Sie den Beleg dabei?" },
      { text: "Ja, hier. Der Kauf war vor zehn Tagen." },
      { text: "Das passt. Was ist denn das Problem?" },
      { text: "Es funktioniert nur, wenn man das Kabel festhält." },
      { text: "Dann ist das ein Fall für die Garantie, nicht für den Umtausch." },
      { text: "Was heißt das für mich?" },
      { text: "Sie bekommen als Ersatz ein neues Gerät. Das dauert zwei Wochen." },
    ],
    questions: [
      {
        text: "Was braucht die Kundin für den Umtausch?",
        options: ["Den Beleg", "Die Karte", "Nichts"],
        answer: 0,
        explain: "„Gern. Haben Sie den Beleg dabei?“",
      },
      {
        text: "Wann war der Kauf?",
        options: ["Vor zehn Tagen", "Vor zwei Wochen", "Gestern"],
        answer: 0,
        explain: "„Ja, hier. Der Kauf war vor zehn Tagen.“",
      },
      {
        text: "Was ist es laut Verkäuferin?",
        options: ["Ein Fall für den Umtausch", "Ein Fall für die Garantie", "Kein Fall"],
        answer: 1,
        explain: "„Dann ist das ein Fall für die Garantie, nicht für den Umtausch.“",
      },
      {
        kind: "gapfill",
        text: "Sie bekommen ___ Ersatz ein neues Gerät.",
        options: [],
        answer: 0,
        accept: ["als"],
        explain: "Rol bildiren „als“ artikelsiz gelir: als Ersatz.",
      },
      {
        kind: "short_answer",
        text: "Wie lange dauert es?",
        options: [],
        answer: 0,
        accept: ["zwei Wochen", "2 Wochen"],
        explain: "„Sie bekommen als Ersatz ein neues Gerät. Das dauert zwei Wochen.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u28-w1",
    level: "B1",
    skill: "writing",
    unit: 28,
    title: "Preise vergleichen",
    genre: "Karşılaştırma raporu",
    intro: "Bir alışverişi karşılaştır. Belirsiz öncülden sonra 'was' gelir.",
    minutes: 8,
    gloss: [
      { de: "der Katalog", tr: "katalog", en: "catalogue" },
      { de: "der Händler", tr: "satıcı", en: "dealer" },
      { de: "wertvoll", tr: "değerli", en: "valuable" },
      { de: "der Durchschnitt", tr: "ortalama", en: "average" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Katalogda gördüğün her şey başka dükkânlarda da var.",
        answer: "Alles, was du im Katalog siehst, gibt es auch in anderen Läden.",
        hint: "„alles“ belirsiz → was.",
      },
      {
        kind: "build",
        tr: "Bu, gerçekten önemli olan şey.",
        answer: "Das ist das, was wirklich zählt.",
        hint: "İsimleşmiş sıfat sonrası da „was“.",
      },
      {
        kind: "build",
        tr: "Pahalı bir alet otomatik olarak değerli değildir.",
        answer: "Ein teures Gerät ist nicht automatisch wertvoll.",
        hint: "Yüklemdeki sıfat çekilmez.",
      },
      {
        kind: "form",
        prompt: "Fiyat karşılaştırma kartını doldur.",
        facts: "Ürün: küçük bir alet; satıcı sayısı: 3; en düşük: 89 avro; ortalama: 104 avro; indirim iddiası: %40.",
        fields: [
          { label: "Anbieter", answer: "3", accept: ["drei", "drei Anbieter"] },
          { label: "Niedrigster Preis", answer: "89 Euro", accept: ["neunundachtzig", "89"] },
          { label: "Durchschnitt", answer: "104 Euro", accept: ["104", "hundertvier"] },
          { label: "Rabatt laut Schild", answer: "40 Prozent", accept: ["vierzig Prozent", "40%"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "İlgi zamirini düzelt.",
        source: "Alles, das ich gekauft habe, war genau das, das ich brauchte.",
        answer: "Alles, was ich gekauft habe, war genau das, was ich brauchte.",
        why: "Türkçede ilgi cümlesi tek sıfat-fiildir ('aldığım her şey') ve zamir yoktur, o yüzden Almancada varsayılan olarak 'das' seçiliyor. Almanca öncüle bakar: BELİRSİZ bir öncülden sonra (alles, etwas, nichts, viel, das) ilgi zamiri WAS olur. Belirli bir isimden sonra der/die/das gelir.",
      },
    ],
  },
  {
    id: "b1-u28-w2",
    level: "B1",
    skill: "writing",
    unit: 28,
    title: "Umtausch beantragen",
    genre: "İade yazısı",
    intro: "Bir ürünü iade et. Rol bildiren 'als' artikel almaz.",
    minutes: 12,
    gloss: [
      { de: "der Umtausch", tr: "değişim", en: "exchange" },
      { de: "der Beleg", tr: "fiş", en: "receipt" },
      { de: "der Käufer", tr: "alıcı", en: "buyer" },
      { de: "die Verkäuferin", tr: "satıcı (kadın)", en: "sales assistant" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Yedek olarak yeni bir alet rica ediyorum.",
        answer: "Ich bitte als Ersatz um ein neues Gerät.",
        hint: "„als Ersatz“ — artikel yok.",
      },
      {
        kind: "build",
        tr: "Alıcı olarak iki yıl garantim var.",
        answer: "Als Käufer habe ich zwei Jahre Garantie.",
        hint: "Rol → artikelsiz als; cümle başında olduğu için fiil ikinci sırada.",
      },
      {
        kind: "free",
        prompt: "Bir ürünü iade etmek ya da değiştirmek için yaz: ne aldın ve ne zaman, sorun ne, fişin var mı, ne istiyorsun (değişim mi para iadesi mi), ve ne zamana kadar yanıt beklediğin. Resmî hitap ve kapanış kullan.",
        checklist: [
          "Ürün ve satın alma tarihi verilmiş mi?",
          "Sorun somut anlatılmış mı?",
          "Fiş/garanti durumu belirtilmiş mi?",
          "İstenen şey net mi?",
          "Resmî hitap ve kapanış var mı?",
        ],
        minWords: 70,
        sample:
          "Sehr geehrte Damen und Herren,\n\n" +
          "am 12. März habe ich in Ihrem Geschäft ein kleines Gerät gekauft. " +
          "Den Beleg lege ich als Kopie bei.\n\n" +
          "Das Gerät funktioniert nur, wenn man das Kabel festhält. Das ist " +
          "kein Fehler, den ich verursacht habe — es war von Anfang an so, " +
          "und ich habe es nach zehn Tagen bemerkt.\n\n" +
          "Als Käufer habe ich zwei Jahre Garantie. Ich bitte deshalb als " +
          "Ersatz um ein neues Gerät, nicht um eine Reparatur. Alles, was " +
          "ich brauche, ist ein Gerät, das ohne Trick funktioniert.\n\n" +
          "Bitte antworten Sie mir bis zum 30. März. Danach würde ich mich " +
          "an die Verbraucherberatung wenden.\n\n" +
          "Mit freundlichen Grüßen\nSedef Aydın",
        phrases: [
          { de: "Den Beleg lege ich bei.", tr: "Fişi ekliyorum.", en: "I enclose the receipt." },
          { de: "Als Käufer habe ich …", tr: "Alıcı olarak … hakkım var.", en: "As a buyer I have …" },
          { de: "Ich bitte um Ersatz.", tr: "Değişim rica ediyorum.", en: "I request a replacement." },
        ],
      },
      {
        kind: "rewrite",
        prompt: "„als“ sonrasındaki fazla artikeli kaldır.",
        source: "Als eine Verkäuferin arbeite ich hier und bekomme als einen Ersatz nichts.",
        answer: "Als Verkäuferin arbeite ich hier und bekomme als Ersatz nichts.",
        why: "Türkçede 'satıcı olarak' rol bildirir ve artikel sorusu hiç doğmaz, o yüzden Almancada 'bir' karşılığı olarak ein/eine ekleniyor. Almanca meslek ve rol bildiren als'tan sonra artikeli DÜŞÜRÜR: als Verkäuferin arbeiten, als Ersatz dienen, als Treffpunkt nehmen. Aynı kural artikelsiz meslek cümlelerinde de geçerlidir: „Ich bin Verkäuferin.“",
      },
    ],
  },
];
