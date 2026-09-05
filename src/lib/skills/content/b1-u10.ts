import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 10 — "Nesneyi ve yeri tarif etmek" (dersler 37–40).
 *
 * Dersler: Einen Gegenstand beschreiben · Mein Lieblingsort ·
 * Im Fundbüro · Ein Rezept empfehlen.
 *
 * Ünitenin ortak işi TARİF: bir nesneyi, bir yeri, bir yemeği karşıdaki
 * göremeden anlatmak. Dilbilgisi yükü sıfat çekiminde toplanıyor ve bu
 * Türkçe konuşan için görünmez bir kural: Türkçede sıfat HİÇ çekilmez
 * ("küçük kutu" · "kutu küçük" — aynı biçim). Almanca yalnız isimden
 * ÖNCE çeker, yüklemde çekmez. İki hata da buradan doğuyor:
 *   "eine klein Schachtel"  (çekim unutuluyor)
 *   "Die Schachtel ist kleine."  (çekim fazladan konuyor)
 * İkinci nokta ayrılabilen fiilde zu-arası: zubereiten → zuzubereiten.
 *
 * Yeni 32 kelime: die Fernbedienung, aufladen, erfinden, ersetzen,
 * der Knopf, das Kabel, das Werkzeug, die Schachtel, das Ufer, genießen,
 * die Aussicht, die Umwelt, entlang, sich verlaufen, die Ruhe, bewegen,
 * das Fundbüro, die Marke, der Inhalt, die Brieftasche, der Verlust,
 * die Beschreibung, auffällig, erkennen, zubereiten, der Geschmack,
 * lecker, statt, ausgezeichnet, das Gericht, mischen, die Pfanne.
 */
export const b1U10: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u10-r1",
    level: "B1",
    skill: "reading",
    unit: 10,
    title: "Im Fundbüro",
    genre: "Bilgi metni ve kayıp bildirimi",
    intro: "Kayıp eşya bürosunun kuralları ve bir bildirim. Tarifin ne kadar ayrıntılı olduğuna dikkat et.",
    minutes: 5,
    gloss: [
      { de: "das Fundbüro", tr: "kayıp eşya bürosu", en: "lost and found" },
      { de: "die Beschreibung", tr: "tarif", en: "description" },
      { de: "der Inhalt", tr: "içerik", en: "contents" },
      { de: "auffällig", tr: "dikkat çekici", en: "conspicuous" },
      { de: "erkennen", tr: "tanımak", en: "to recognise" },
    ],
    text:
      "Wer etwas verliert, meldet den Verlust am besten sofort. Im Fundbüro liegen " +
      "Hunderte Sachen, und ohne eine genaue Beschreibung findet niemand die richtige.\n\n" +
      "Wichtig sind drei Dinge: die Farbe, die Marke und der Inhalt. Eine schwarze " +
      "Brieftasche allein sagt fast nichts. Eine schwarze Brieftasche mit einem roten " +
      "Knopf und zwei Karten darin ist dagegen leicht zu erkennen.\n\n" +
      "Bringen Sie einen Ausweis mit. Sie bekommen die Sache nur zurück, wenn Sie " +
      "den Inhalt nennen können, bevor die Schachtel geöffnet wird.\n\n" +
      "Meldung von Frau Kaya: Ich habe gestern im Bus meine Brieftasche verloren. " +
      "Sie ist braun, ziemlich alt und nicht besonders auffällig. Darin sind mein " +
      "Ausweis, eine Karte und ein kleines Foto. Die Marke steht nicht darauf, " +
      "aber der Verschluss ist kaputt — daran erkenne ich sie sofort.",
    questions: [
      {
        text: "Was soll man bei einem Verlust sofort tun?",
        options: ["Warten", "Den Verlust melden", "Eine neue kaufen"],
        answer: 1,
        explain: "„Wer etwas verliert, meldet den Verlust am besten sofort.“",
      },
      {
        text: "Welche drei Dinge sind wichtig?",
        options: ["Farbe, Marke, Inhalt", "Preis, Alter, Ort", "Größe, Gewicht, Farbe"],
        answer: 0,
        explain: "„Wichtig sind drei Dinge: die Farbe, die Marke und der Inhalt.“",
      },
      {
        text: "Wann bekommt man die Sache zurück?",
        options: ["Immer", "Wenn man den Inhalt vorher nennen kann", "Nach einer Woche"],
        answer: 1,
        explain: "„… wenn Sie den Inhalt nennen können, bevor die Schachtel geöffnet wird.“",
      },
      {
        kind: "gapfill",
        text: "Eine ___ Brieftasche mit einem ___ Knopf ist leicht zu erkennen.",
        options: [],
        answer: 0,
        accept: ["schwarze roten", "schwarze / roten"],
        explain: "İsimden önceki sıfat çekilir: eine schwarzE Brieftasche · mit einem rotEN Knopf.",
      },
      {
        kind: "short_answer",
        text: "Was ist an Frau Kayas Brieftasche kaputt?",
        options: [],
        answer: 0,
        accept: ["der Verschluss", "Verschluss"],
        explain: "„… aber der Verschluss ist kaputt — daran erkenne ich sie sofort.“",
      },
    ],
  },
  {
    id: "b1-u10-r2",
    level: "B1",
    skill: "reading",
    unit: 10,
    title: "Mein Lieblingsort",
    genre: "Kişisel yazı",
    intro: "Biri en sevdiği yeri anlatıyor. Yer nasıl, orada ne yapıyor?",
    minutes: 5,
    gloss: [
      { de: "das Ufer", tr: "kıyı", en: "bank / shore" },
      { de: "die Aussicht", tr: "manzara", en: "view" },
      { de: "genießen", tr: "tadını çıkarmak", en: "to enjoy" },
      { de: "entlang", tr: "boyunca", en: "along" },
      { de: "sich verlaufen", tr: "yolunu kaybetmek", en: "to get lost" },
    ],
    text:
      "Mein Lieblingsort liegt zwanzig Minuten von meiner Wohnung. Man geht die " +
      "Straße entlang, dann links, und plötzlich ist man am Ufer.\n\n" +
      "Dort steht eine alte Bank unter einem großen Baum. Die Aussicht ist nicht " +
      "besonders, aber sie reicht: Wasser, ein paar Boote, auf der anderen Seite " +
      "die Häuser. Ich genieße vor allem die Ruhe. Man hört fast nur den Wind.\n\n" +
      "Als ich neu in der Stadt war, habe ich mich hier einmal verlaufen. Nachdem " +
      "ich eine Stunde gesucht hatte, kam ich genau an diesen Platz. Seitdem gehöre " +
      "ich irgendwie dazu.\n\n" +
      "Ich komme her, wenn ich mich nicht bewegen will und trotzdem raus muss. " +
      "Für die Umwelt ist es auch gut: ich fahre nie mit dem Auto, sondern gehe " +
      "immer zu Fuß.",
    questions: [
      {
        text: "Wie weit ist der Ort von der Wohnung?",
        options: ["Zwanzig Minuten", "Eine Stunde", "Fünf Minuten"],
        answer: 0,
        explain: "„Mein Lieblingsort liegt zwanzig Minuten von meiner Wohnung.“",
      },
      {
        text: "Was genießt die Person dort am meisten?",
        options: ["Die Boote", "Die Ruhe", "Die Häuser"],
        answer: 1,
        explain: "„Ich genieße vor allem die Ruhe.“",
      },
      {
        text: "Wie hat sie den Ort gefunden?",
        options: ["Ein Freund zeigte ihn", "Sie hat sich verlaufen", "Sie hat ihn gesucht"],
        answer: 1,
        explain: "„Als ich neu in der Stadt war, habe ich mich hier einmal verlaufen.“",
      },
      {
        kind: "gapfill",
        text: "Dort steht eine ___ Bank unter einem ___ Baum.",
        options: [],
        answer: 0,
        accept: ["alte großen", "alte / großen"],
        explain: "eine altE Bank (dişil, Nominativ) · unter einem großEN Baum (Dativ).",
      },
      {
        kind: "short_answer",
        text: "Wie kommt sie zu dem Ort?",
        options: [],
        answer: 0,
        accept: ["zu Fuß", "sie geht zu Fuß", "immer zu Fuß"],
        explain: "„… ich fahre nie mit dem Auto, sondern gehe immer zu Fuß.“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u10-l1",
    level: "B1",
    skill: "listening",
    unit: 10,
    title: "Die Fernbedienung geht nicht",
    genre: "Teknik yardım konuşması",
    intro: "Bir alet çalışmıyor. Sorun ne, ne deneniyor?",
    minutes: 4,
    gloss: [
      { de: "die Fernbedienung", tr: "kumanda", en: "remote control" },
      { de: "der Knopf", tr: "düğme", en: "button" },
      { de: "das Kabel", tr: "kablo", en: "cable" },
      { de: "ersetzen", tr: "yerine koymak", en: "to replace" },
    ],
    segments: [
      { text: "Die Fernbedienung geht nicht mehr. Ich habe alles probiert." },
      { text: "Welcher Knopf funktioniert denn nicht?" },
      { text: "Gar keiner. Das kleine rote Licht kommt auch nicht." },
      { text: "Dann sind wohl die Batterien leer. Hast du neue?" },
      { text: "Nein. Kann man das Ding nicht einfach aufladen?" },
      { text: "Diese hier nicht. Bei der neuen Marke geht das mit einem Kabel." },
      { text: "Ausgezeichnet. Dann ersetzen wir sie irgendwann." },
      { text: "Ich hole heute Batterien. Das reicht erst mal." },
    ],
    questions: [
      {
        text: "Welche Knöpfe funktionieren?",
        options: ["Nur der rote", "Gar keiner", "Alle bis auf einen"],
        answer: 1,
        explain: "„Gar keiner. Das kleine rote Licht kommt auch nicht.“",
      },
      {
        text: "Was ist wahrscheinlich das Problem?",
        options: ["Die Batterien sind leer", "Das Kabel fehlt", "Das Gerät ist alt"],
        answer: 0,
        explain: "„Dann sind wohl die Batterien leer.“",
      },
      {
        text: "Was macht die zweite Person heute?",
        options: ["Sie kauft eine neue Fernbedienung", "Sie holt Batterien", "Sie repariert das Kabel"],
        answer: 1,
        explain: "„Ich hole heute Batterien. Das reicht erst mal.“",
      },
      {
        kind: "gapfill",
        text: "Das ___ ___ Licht kommt auch nicht.",
        options: [],
        answer: 0,
        accept: ["kleine rote"],
        explain: "Belirli artikelden sonra iki sıfat da -e alır: das kleinE rotE Licht.",
      },
      {
        kind: "short_answer",
        text: "Womit lädt man die neue Marke auf?",
        options: [],
        answer: 0,
        accept: ["mit einem Kabel", "mit Kabel", "Kabel"],
        explain: "„Bei der neuen Marke geht das mit einem Kabel.“",
      },
    ],
  },
  {
    id: "b1-u10-l2",
    level: "B1",
    skill: "listening",
    unit: 10,
    title: "Ein einfaches Rezept",
    genre: "Tarif anlatımı",
    intro: "Biri kolay bir yemek tarif ediyor. Sırayı ve malzemeyi not et.",
    minutes: 4,
    gloss: [
      { de: "zubereiten", tr: "hazırlamak", en: "to prepare" },
      { de: "mischen", tr: "karıştırmak", en: "to mix" },
      { de: "die Pfanne", tr: "tava", en: "pan" },
      { de: "der Geschmack", tr: "tat", en: "taste" },
    ],
    segments: [
      { text: "Du hast doch dieses Gericht gemacht. Wie geht das?" },
      { text: "Ganz einfach. Es ist leicht zuzubereiten, sogar am Abend." },
      { text: "Was brauche ich?" },
      { text: "Kartoffeln, Gemüse und Wasser. Mehr nicht." },
      { text: "Und die Pfanne?" },
      { text: "Das Gemüse mische ich zuerst in der Pfanne. Statt Butter nehme ich Öl." },
      { text: "Wie ist der Geschmack?" },
      { text: "Ausgezeichnet, wenn du zum Schluss etwas Salz nimmst. Wirklich lecker." },
    ],
    questions: [
      {
        text: "Was braucht man für das Gericht?",
        options: ["Kartoffeln, Gemüse und Wasser", "Nur Fleisch", "Brot und Käse"],
        answer: 0,
        explain: "„Kartoffeln, Gemüse und Wasser. Mehr nicht.“",
      },
      {
        text: "Was nimmt die Person statt Butter?",
        options: ["Wasser", "Öl", "Milch"],
        answer: 1,
        explain: "„Statt Butter nehme ich Öl.“",
      },
      {
        text: "Was kommt zum Schluss dazu?",
        options: ["Etwas Salz", "Zucker", "Käse"],
        answer: 0,
        explain: "„Ausgezeichnet, wenn du zum Schluss etwas Salz nimmst.“",
      },
      {
        kind: "gapfill",
        text: "Es ist leicht ___, sogar am Abend.",
        options: [],
        answer: 0,
        accept: ["zuzubereiten"],
        explain: "Ayrılabilen fiilde „zu“ önek ile gövde ARASINA girer: zu-zu-bereiten.",
      },
      {
        kind: "short_answer",
        text: "Worin mischt man das Gemüse zuerst?",
        options: [],
        answer: 0,
        accept: ["in der Pfanne", "in einer Pfanne", "Pfanne"],
        explain: "„Das Gemüse mische ich zuerst in der Pfanne.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u10-w1",
    level: "B1",
    skill: "writing",
    unit: 10,
    title: "Verlustmeldung",
    genre: "Kayıp bildirimi",
    intro: "Kaybettiğin bir eşyayı tarif et. Sıfatlar isimden önce gelirse çekilir.",
    minutes: 8,
    gloss: [
      { de: "der Verlust", tr: "kayıp", en: "loss" },
      { de: "die Brieftasche", tr: "cüzdan", en: "wallet" },
      { de: "die Marke", tr: "marka", en: "brand" },
      { de: "der Inhalt", tr: "içerik", en: "contents" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Dün otobüste kahverengi bir cüzdan kaybettim.",
        answer: "Ich habe gestern im Bus eine braune Brieftasche verloren.",
        hint: "İsimden önceki sıfat çekilir: eine braunE Brieftasche.",
      },
      {
        kind: "build",
        tr: "İçeriği kimliğim ve küçük bir fotoğraf.",
        answer: "Der Inhalt ist mein Ausweis und ein kleines Foto.",
        hint: "Nötr isim, belirsiz artikel: ein kleinES Foto.",
      },
      {
        kind: "build",
        tr: "Cüzdan eski, markası üzerinde yazmıyor.",
        answer: "Die Brieftasche ist alt, die Marke steht nicht darauf.",
        hint: "Yüklemdeki sıfat ÇEKİLMEZ: ist alt, nicht „ist alte“.",
      },
      {
        kind: "form",
        prompt: "Kayıp bildirim formunu doldur.",
        facts: "Bildiren: Leyla Kaya; kayıp: cüzdan; renk: kahverengi; yer: otobüs; içerik: kimlik, kart, fotoğraf; işaret: kilit bozuk.",
        fields: [
          { label: "Name", answer: "Leyla Kaya", accept: ["Leyla", "Kaya"] },
          { label: "Gegenstand", answer: "Brieftasche", accept: ["eine Brieftasche", "die Brieftasche"] },
          { label: "Farbe", answer: "braun", accept: ["Braun", "braune"] },
          { label: "Ort", answer: "im Bus", accept: ["Bus", "der Bus"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Sıfat çekimlerini düzelt.",
        source: "Ich suche eine klein Schachtel, und die Schachtel ist alte.",
        answer: "Ich suche eine kleine Schachtel, und die Schachtel ist alt.",
        why: "Türkçede sıfat HİÇ çekilmez ve yerine göre değişmez ('küçük kutu' · 'kutu küçük'), o yüzden iki hata birden çıkıyor: isimden ÖNCE gelen sıfata çekim konmuyor (klein → kleine), yüklemdeki sıfata ise fazladan çekim konuyor (alte → alt). Almanca yalnız isimden önce çeker.",
      },
    ],
  },
  {
    id: "b1-u10-w2",
    level: "B1",
    skill: "writing",
    unit: 10,
    title: "Ein Rezept empfehlen",
    genre: "Tarif ve öneri",
    intro: "Sevdiğin bir yemeği tarif et. Sırayı ve mastar yapılarını doğru kur.",
    minutes: 12,
    gloss: [
      { de: "zubereiten", tr: "hazırlamak", en: "to prepare" },
      { de: "das Gericht", tr: "yemek", en: "dish" },
      { de: "lecker", tr: "lezzetli", en: "tasty" },
      { de: "statt", tr: "yerine", en: "instead of" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Bu yemeği hazırlamak çok kolay.",
        answer: "Dieses Gericht ist sehr leicht zuzubereiten.",
        alternatives: ["Es ist sehr leicht, dieses Gericht zuzubereiten."],
        hint: "Ayrılabilen fiilde zu araya girer.",
      },
      {
        kind: "build",
        tr: "Tereyağı yerine yağ alıyorum.",
        answer: "Statt Butter nehme ich Öl.",
        hint: "„statt“ birinci öğe ise fiil hemen arkasından gelir.",
      },
      {
        kind: "free",
        prompt: "Sevdiğin bir yemeği tarif et ve öner: yemeğin adı ve nereden geldiği, gereken malzemeler, hazırlama sırası (zuerst / danach / zum Schluss), ve neden önerdiğin. En az bir 'zu' mastarı kullan.",
        checklist: [
          "Yemeğin adı ve kökeni söylenmiş mi?",
          "Malzemeler sayılmış mı?",
          "Sıra belirteçleriyle anlatılmış mı (zuerst, danach, zum Schluss)?",
          "En az bir 'zu' mastarı var mı?",
          "Neden önerildiği söylenmiş mi?",
        ],
        minWords: 70,
        sample:
          "Ich empfehle ein einfaches Gericht aus der Türkei: eine warme Gemüsesuppe.\n\n" +
          "Du brauchst Kartoffeln, Gemüse, Öl und Salz. Mehr nicht. Es ist wirklich " +
          "leicht zuzubereiten, auch nach der Arbeit.\n\n" +
          "Zuerst schneidest du das Gemüse klein und mischst es mit dem Öl in der " +
          "Pfanne. Danach kommen die Kartoffeln dazu, mit Wasser, in einem großen " +
          "Topf. Statt Butter nehme ich immer Öl, das ist leichter. Zum Schluss " +
          "wartest du dreißig Minuten.\n\n" +
          "Der Geschmack ist einfach, aber ausgezeichnet, und die Suppe ist warm und " +
          "lecker. Ich empfehle sie, weil man sie am Abend zubereiten und am nächsten " +
          "Tag mitnehmen kann.",
        phrases: [
          { de: "Es ist leicht zuzubereiten.", tr: "Hazırlaması kolay.", en: "It is easy to prepare." },
          { de: "zuerst … danach … zum Schluss", tr: "önce … sonra … en son", en: "first … then … finally" },
          { de: "Ich empfehle es, weil …", tr: "Öneriyorum çünkü …", en: "I recommend it because …" },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Mastar yapısını düzelt.",
        source: "Es ist einfach, dieses Gericht zubereiten.",
        answer: "Es ist einfach, dieses Gericht zuzubereiten.",
        why: "Türkçe mastar tek parçadır ('hazırlamak'), o yüzden 'zu' ya hiç konmuyor ya fiilin önüne atılıyor. Almancada AYRILABİLEN fiilde zu önekle gövdenin ARASINA girer: zu-bereiten → zu-zu-bereiten. Ayrılmayan fiilde ise normal durur: zu verstehen.",
      },
    ],
  },
];
