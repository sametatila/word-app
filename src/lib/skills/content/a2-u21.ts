import type { SkillExercise } from "../types";

/**
 * A2 · Ünite 21 — "Alışkanlıklar, diziler, haberler, ekran süresi" (yalnız yazma).
 *
 * Dört ders: Wenn ich Zeit habe · Welche Serie schaust du? · Hast du das
 * gehört? · Zu viel am Handy. İçerik ünite 1-21'in kelimeleriyle sınırlı.
 *
 *   Ünite 21: wenn, meistens, sonst, einige, gelegentlich, irgendwie,
 *             tagsüber, manche · der Krimi, die Fernsehsendung, total,
 *             der Star, der Titel, umschalten, anschauen, der Fan ·
 *             der Zeitungsartikel, die Zeitschrift, der Radiosender, die Lüge,
 *             wahrscheinlich, misstrauisch, mitbekommen, herausfinden ·
 *             die App, posten, liken, das Profil, echt, der Chat, das Selfie,
 *             online
 *   Kalıplar: Wenn ich Zeit habe, lese ich. · Meistens bin ich tagsüber nicht
 *             zu Hause. · Ich schaue Krimis, wenn ich müde bin. · Wie heißt
 *             der Titel? · Ich habe gehört, dass die Preise steigen. ·
 *             Stimmt das wirklich? · Wenn ich Langeweile habe, schaue ich aufs
 *             Handy. · Ich bin heute Abend wieder online.
 *
 * Ölçtüğü nokta wenn
 * yan cümlesinin cümle başında durması: yan cümle önce gelince ana cümle
 * fiille başlar (Wenn ich Zeit habe, LESE ich). Öğrenci yan cümleyi kurmayı
 * öğrenip bu ters dönmeyi atlıyor ve "Wenn ich Zeit habe, ich lese" diyor —
 * A2'nin son büyük söz dizimi tuzağı.
 */
export const a2U21: SkillExercise[] = [
  {
    id: "a2-u21-r1",
    level: "A2",
    skill: "reading",
    unit: 21,
    title: "Warum wir Krimis schauen",
    genre: "Dergi yazısı",
    intro: "Diziler üstüne bir yazı. Neden hep aynı türü seçiyoruz?",
    gloss: [
      { de: "der Krimi", tr: "polisiye", en: "crime drama" },
      { de: "die Fernsehsendung", tr: "televizyon programı", en: "TV programme" },
      { de: "der Titel", tr: "başlık, ad", en: "title" },
      { de: "umschalten", tr: "kanal değiştirmek", en: "to switch channels" },
      { de: "anschauen", tr: "izlemek", en: "to watch" },
      { de: "der Star", tr: "yıldız oyuncu", en: "star" },
      { de: "der Fan", tr: "hayran", en: "fan" },
      { de: "total", tr: "tamamen", en: "totally" },
    ],
    minutes: 4,
    text:
      "WARUM WIR KRIMIS SCHAUEN\n\n" +
      "Sonntagabend, zwanzig Uhr fünfzehn: Millionen Menschen schauen dieselbe Fernsehsendung an. Einen Krimi. Seit über fünfzig Jahren.\n\n" +
      "Warum funktioniert das so gut? Eine Erklärung ist einfach: Man muss nichts wissen. Jede Folge fängt neu an, und am Ende ist der Fall gelöst. Wer müde ist, schaltet nicht um.\n\n" +
      "Eine zweite Erklärung ist der Ort. Die Folgen spielen in echten Städten, und die Leute erkennen ihre eigene Straße wieder. „Das ist doch bei uns um die Ecke!“\n\n" +
      "Und die Stars? Die kommen und gehen. Manche Zuschauer sind total treu und bleiben zwanzig Jahre lang Fan derselben Figur. Andere wissen nicht einmal den Titel der Folge und schauen trotzdem jede Woche.\n\n" +
      "Eine Kollegin hat es gut gesagt: „Ich schaue Krimis, wenn ich müde bin. Denken muss ich schon den ganzen Tag.“",
    questions: [
      {
        text: "Warum ist ein Krimi laut Text leicht zu schauen?",
        options: [
          "Weil die Folgen kurz sind.",
          "Weil jede Folge neu anfängt und der Fall am Ende gelöst ist.",
          "Weil die Stars immer dieselben sind.",
        ],
        answer: 1,
        explain: "„Jede Folge fängt neu an, und am Ende ist der Fall gelöst.“",
      },
      {
        kind: "gapfill",
        text: "Ich schaue Krimis, ___ ich müde bin.",
        options: [],
        answer: 0,
        accept: ["wenn"],
        explain: "Koşul ya da tekrarlanan durum wenn ile verilir; fiil sona gider.",
      },
      {
        text: "Was ist die zweite Erklärung im Text?",
        options: ["Der Ort — echte Städte", "Der Preis", "Die Länge der Folge"],
        answer: 0,
        explain: "„Die Folgen spielen in echten Städten, und die Leute erkennen ihre eigene Straße wieder.“",
      },
      {
        kind: "short_answer",
        text: "Wann läuft die Sendung?",
        options: [],
        answer: 0,
        accept: [
          "sonntags um 20:15",
          "Sonntagabend um zwanzig Uhr fünfzehn",
          "sonntagabends",
        ],
        explain: "„Sonntagabend, zwanzig Uhr fünfzehn.“",
      },
      {
        text: "Alle Zuschauer kennen den Titel der Folge.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Andere wissen nicht einmal den Titel der Folge und schauen trotzdem jede Woche.“",
      },
    ],
  },
  {
    id: "a2-u21-r2",
    level: "A2",
    skill: "reading",
    unit: 21,
    title: "Stimmt das wirklich?",
    genre: "Bilgilendirme",
    intro: "Haber kontrol rehberi. Bir habere inanmadan önce ne yapmalı?",
    gloss: [
      { de: "der Zeitungsartikel", tr: "gazete yazısı", en: "newspaper article" },
      { de: "die Zeitschrift", tr: "dergi", en: "magazine" },
      { de: "der Radiosender", tr: "radyo kanalı", en: "radio station" },
      { de: "die Lüge", tr: "yalan", en: "lie" },
      { de: "misstrauisch", tr: "şüpheci", en: "suspicious" },
      { de: "wahrscheinlich", tr: "muhtemelen", en: "probably" },
      { de: "mitbekommen", tr: "duymak, farkına varmak", en: "to catch wind of" },
      { de: "herausfinden", tr: "öğrenmek, ortaya çıkarmak", en: "to find out" },
    ],
    minutes: 4,
    text:
      "STIMMT DAS WIRKLICH? — DREI FRAGEN VOR DEM TEILEN\n\n" +
      "Jeden Tag bekommen wir Nachrichten mit, die uns wütend machen. Manche stimmen. Manche sind eine Lüge. Drei Fragen helfen.\n\n" +
      "ERSTENS: Wer sagt das? Ein Zeitungsartikel mit Namen und Datum ist etwas anderes als ein Bild ohne Quelle. Wenn nirgends steht, wer es geschrieben hat, seien Sie misstrauisch.\n\n" +
      "ZWEITENS: Steht es woanders auch? Suchen Sie zwei Minuten. Wenn ein großer Radiosender und eine Zeitschrift dasselbe berichten, ist es wahrscheinlich richtig. Wenn Sie es nur an einer Stelle finden, warten Sie.\n\n" +
      "DRITTENS: Wie alt ist es? Sehr viele Bilder sind echt, aber zehn Jahre alt. Das Datum herauszufinden dauert selten länger als eine Minute.\n\n" +
      "Und wenn Sie unsicher bleiben: nicht teilen. Ich habe gehört, dass die Hälfte aller falschen Nachrichten von Leuten weitergegeben wird, die es gut meinen.",
    questions: [
      {
        text: "Wann soll man misstrauisch sein?",
        options: [
          "Wenn der Artikel ein Datum hat.",
          "Wenn nirgends steht, wer es geschrieben hat.",
          "Wenn es in der Zeitschrift steht.",
        ],
        answer: 1,
        explain: "„Wenn nirgends steht, wer es geschrieben hat, seien Sie misstrauisch.“",
      },
      {
        kind: "gapfill",
        text: "Ich habe gehört, ___ die Hälfte aller falschen Nachrichten von Leuten weitergegeben wird, die es gut meinen.",
        options: [],
        answer: 0,
        accept: ["dass"],
        explain: "Duyulan bilgi dass ile aktarılır; yan cümlenin fiili sona gider.",
      },
      {
        text: "Was ist die zweite Frage?",
        options: ["Wie alt ist es?", "Steht es woanders auch?", "Wer teilt es?"],
        answer: 1,
        explain: "„ZWEITENS: Steht es woanders auch? Suchen Sie zwei Minuten.“",
      },
      {
        kind: "short_answer",
        text: "Was soll man machen, wenn man unsicher bleibt?",
        options: [],
        answer: 0,
        accept: ["nicht teilen", "es nicht teilen", "nichts teilen"],
        explain: "„Und wenn Sie unsicher bleiben: nicht teilen.“",
      },
      {
        text: "Alte Bilder sind immer falsch.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Sehr viele Bilder sind echt, aber zehn Jahre alt.“ Sahte değil, eski.",
      },
    ],
  },
  {
    id: "a2-u21-l1",
    level: "A2",
    skill: "listening",
    unit: 21,
    title: "Wann hast du eigentlich Zeit?",
    genre: "Diyalog",
    intro: "Haftalık düzen konuşması. Kim ne zaman müsait?",
    gloss: [
      { de: "meistens", tr: "çoğunlukla", en: "mostly" },
      { de: "tagsüber", tr: "gündüzleri", en: "during the day" },
      { de: "gelegentlich", tr: "ara sıra", en: "occasionally" },
      { de: "sonst", tr: "yoksa, başka türlü", en: "otherwise" },
      { de: "einige", tr: "birkaç", en: "some" },
      { de: "manche", tr: "bazıları", en: "some people" },
      { de: "irgendwie", tr: "bir şekilde", en: "somehow" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Elif", text: "Wir wollten doch mal zusammen laufen gehen. Wann hast du eigentlich Zeit?" },
      { speaker: "Paul", text: "Schwierig. Meistens bin ich tagsüber nicht zu Hause." },
      { speaker: "Elif", text: "Abends dann?" },
      { speaker: "Paul", text: "Dienstag und Donnerstag habe ich Kurs. An den anderen Abenden geht es." },
      { speaker: "Elif", text: "Bei mir ist es umgekehrt. Wenn ich Zeit habe, ist es meistens vormittags." },
      { speaker: "Paul", text: "Hm. Dann bleibt eigentlich nur das Wochenende." },
      { speaker: "Elif", text: "Samstagmorgen? Einige aus dem Büro laufen um neun im Park." },
      { speaker: "Paul", text: "Neun ist früh. Aber gut, sonst finden wir nie einen Termin." },
      { speaker: "Elif", text: "Manche stehen am Samstag um sechs auf. Neun ist also verhandelbar." },
      { speaker: "Paul", text: "Nein, neun passt. Gelegentlich schaffe ich das sogar freiwillig." },
      { speaker: "Elif", text: "Dann Samstag. Irgendwie muss es ja anfangen." },
    ],
    questions: [
      {
        text: "Warum geht es bei Paul tagsüber nicht?",
        options: [
          "Er ist meistens nicht zu Hause.",
          "Er hat jeden Tag Kurs.",
          "Er schläft tagsüber.",
        ],
        answer: 0,
        explain: "„Meistens bin ich tagsüber nicht zu Hause.“",
      },
      {
        kind: "gapfill",
        text: "___ ich Zeit habe, ist es meistens vormittags.",
        options: [],
        answer: 0,
        accept: ["Wenn"],
        explain: "Yan cümle başta olduğu için ana cümle fiille devam ediyor: ist es.",
      },
      {
        text: "An welchen Abenden hat Paul Kurs?",
        options: ["Montag und Mittwoch", "Dienstag und Donnerstag", "Freitag"],
        answer: 1,
        explain: "„Dienstag und Donnerstag habe ich Kurs.“",
      },
      {
        kind: "short_answer",
        text: "Worauf einigen sie sich?",
        options: [],
        answer: 0,
        accept: [
          "Samstagmorgen um neun",
          "Samstag um neun",
          "am Samstag um 9",
        ],
        explain: "„Nein, neun passt.“ — cumartesi sabah dokuz, parkta.",
      },
    ],
  },
  {
    id: "a2-u21-l2",
    level: "A2",
    skill: "listening",
    unit: 21,
    title: "Zu viel am Handy",
    genre: "Diyalog",
    intro: "Ekran süresi konuşması. Kim ne kadar, kim ne değiştirdi?",
    gloss: [
      { de: "die App", tr: "uygulama", en: "app" },
      { de: "posten", tr: "paylaşmak", en: "to post" },
      { de: "liken", tr: "beğenmek", en: "to like" },
      { de: "das Profil", tr: "profil", en: "profile" },
      { de: "das Selfie", tr: "özçekim", en: "selfie" },
      { de: "der Chat", tr: "sohbet", en: "chat" },
      { de: "echt", tr: "gerçek, gerçekten", en: "real, really" },
      { de: "online", tr: "çevrimiçi", en: "online" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Nihal", text: "Mein Handy sagt mir jeden Sonntag, wie lange ich draufgeschaut habe. Diese Woche: dreißig Stunden." },
      { speaker: "Ben", text: "Dreißig? Das ist fast eine Arbeitswoche." },
      { speaker: "Nihal", text: "Ich weiß. Und ich poste nicht mal etwas. Ich schaue nur." },
      { speaker: "Ben", text: "Das ist bei mir dasselbe. Ich like Fotos von Leuten, die ich seit zehn Jahren nicht gesehen habe." },
      { speaker: "Nihal", text: "Hast du mal dein Profil gelöscht?" },
      { speaker: "Ben", text: "Einmal, für zwei Monate. Am Anfang war es komisch, dann echt angenehm." },
      { speaker: "Nihal", text: "Und warum bist du zurückgekommen?" },
      { speaker: "Ben", text: "Wegen der Chats. Die halbe Familie schreibt nur dort. Aber die Apps mit den Selfies habe ich gelöscht." },
      { speaker: "Nihal", text: "Das klingt machbar. Also nicht alles, nur das Schlimmste." },
      { speaker: "Ben", text: "Genau. Abends ab zehn bin ich nicht mehr online, das hilft am meisten." },
    ],
    questions: [
      {
        text: "Wie lange war Nihal diese Woche am Handy?",
        options: ["Dreizehn Stunden", "Dreißig Stunden", "Drei Stunden"],
        answer: 1,
        explain: "„Diese Woche: dreißig Stunden.“ Ben buna „fast eine Arbeitswoche“ diyor.",
      },
      {
        kind: "gapfill",
        text: "Ich ___ nicht mal etwas. Ich schaue nur.",
        options: [],
        answer: 0,
        accept: ["poste"],
        explain: "Nihal bir şey paylaşmıyor, sadece bakıyor — süre yine de yüksek.",
      },
      {
        text: "Warum ist Ben zurückgekommen?",
        options: ["Wegen der Fotos", "Wegen der Chats mit der Familie", "Wegen der Arbeit"],
        answer: 1,
        explain: "„Wegen der Chats. Die halbe Familie schreibt nur dort.“",
      },
      {
        kind: "dictation",
        text: "Ben'in en çok işe yaradığını söylediği kuralı yaz.",
        options: [],
        answer: 0,
        accept: [
          "Abends ab zehn bin ich nicht mehr online, das hilft am meisten.",
          "Abends ab zehn bin ich nicht mehr online",
        ],
        explain: "Her şeyi bırakmak yerine bir saat sınırı — konuşmanın vardığı sonuç.",
      },
    ],
  },
  {
    id: "a2-u21-w1",
    level: "A2",
    skill: "writing",
    unit: 21,
    title: "Yan cümle başta olunca",
    genre: "Dil bilgisi",
    intro: "wenn ile başlayan cümlede ana cümle özneyle değil fiille devam eder.",
    gloss: [
      { de: "meistens", tr: "çoğunlukla", en: "mostly" },
      { de: "tagsüber", tr: "gündüzleri", en: "during the day" },
      { de: "der Krimi", tr: "polisiye", en: "crime drama" },
      { de: "die Langeweile", tr: "can sıkıntısı", en: "boredom" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Vaktim olunca kitap okurum.",
        answer: "Wenn ich Zeit habe, lese ich",
        hint: "Yan cümle başta: virgülden sonra önce fiil, sonra özne gelir.",
      },
      {
        kind: "build",
        tr: "Yorgun olduğumda polisiye izlerim.",
        answer: "Ich schaue Krimis, wenn ich müde bin",
        hint: "Yan cümle sonda durursa ana cümle normal sırasını korur.",
      },
      {
        kind: "build",
        tr: "Çoğunlukla gündüzleri evde olmam.",
        answer: "Meistens bin ich tagsüber nicht zu Hause",
        hint: "Cümle zarfla başlarsa da fiil ikinci sırada kalır, özne arkaya geçer.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: yan cümle başta olduğu için ana cümlenin sırası değişmeli.",
        source: "Wenn ich Langeweile habe, ich schaue aufs Handy.",
        answer: "Wenn ich Langeweile habe, schaue ich aufs Handy.",
        alternatives: ["Wenn ich Langeweile habe, schaue ich aufs Handy"],
        why: "Yan cümle cümlenin ilk ögesi sayılır, o yüzden çekimli fiil hemen virgülden sonra gelir ve özne fiilin arkasına geçer.",
      },
    ],
  },
  {
    id: "a2-u21-w2",
    level: "A2",
    skill: "writing",
    unit: 21,
    title: "Zu viel am Handy?",
    genre: "Forum yazısı",
    intro: "Foruma yaz: telefonu ne zaman eline alıyorsun, ne değiştirmek istiyorsun?",
    gloss: [
      { de: "die App", tr: "uygulama", en: "app" },
      { de: "posten", tr: "paylaşmak", en: "to post" },
      { de: "online", tr: "çevrimiçi", en: "online" },
      { de: "gelegentlich", tr: "ara sıra", en: "occasionally" },
      { de: "verringern", tr: "azaltmak", en: "to reduce" },
      { de: "machbar", tr: "yapılabilir", en: "doable" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "reply",
        prompt: "Forumdaki soruya cevap yaz. Telefonu ne zaman eline aldığını wenn ile anlat, günde ne kadar sürdüğünü tahmin et, neyi değiştirmek istediğini söyle ve bunun senin için yapılabilir olup olmadığını yaz.",
        stimulus:
          "FORUM: LEBEN OHNE HANDY — GEHT DAS?\n\n" +
          "Ich schaue jeden Tag ungefähr vier Stunden aufs Handy. Vier! Das sind 28 Stunden pro Woche, also mehr als ein Arbeitstag.\n\n" +
          "Ich habe zwei Apps gelöscht und poste nichts mehr. Es ist besser geworden, aber abends bin ich trotzdem wieder online.\n\n" +
          "Wie ist das bei euch? Wann nehmt ihr das Handy in die Hand — und was habt ihr geändert?",
        checklist: [
          "Telefonu ne zaman eline aldığını wenn ile anlattın mı?",
          "Günde ne kadar sürdüğüne dair bir tahmin verdin mi?",
          "Neyi değiştirmek istediğini yazdın mı?",
          "Bunun senin için yapılabilir olup olmadığını söyledin mi?",
        ],
        minWords: 45,
        phrases: [
          { de: "Wenn ich Langeweile habe, schaue ich aufs Handy.", tr: "canım sıkılınca telefona bakıyorum", en: "when I'm bored I look at my phone" },
          { de: "Ich möchte das verringern.", tr: "bunu azaltmak istiyorum", en: "I'd like to cut that down" },
          { de: "Das ist schwer, aber machbar.", tr: "zor ama yapılabilir", en: "that's hard but doable" },
        ],
        sample:
          "Bei mir ist es ähnlich, aber nicht ganz so schlimm.\n\n" +
          "Wenn ich Langeweile habe, schaue ich sofort aufs Handy — im Bus, in der Warteschlange, manchmal sogar beim Kochen. Wenn ich arbeite, liegt es zum Glück in der Tasche.\n\n" +
          "Ich schätze zwei bis drei Stunden pro Tag. Gelegentlich mehr, wenn ich abends eine Serie anschaue.\n\n" +
          "Ändern möchte ich vor allem den Abend. Ab zehn Uhr lasse ich das Handy jetzt in der Küche, und ich habe wieder einen Wecker gekauft. Die ersten drei Nächte waren komisch, aber ich schlafe besser.\n\n" +
          "Ganz ohne Handy geht es bei mir nicht, weil meine Familie weit weg wohnt. Aber weniger — das ist schwer, aber machbar.",
      },
    ],
  },
];
