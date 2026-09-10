import type { SkillExercise } from "../../types";

/**
 * DE · A2 — Beceriler kütüphanesi, parti 3.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 3. seti taşır (kimlik sonu 3).
 * Kurallar ve emsal: `de-a2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Türler: deneyim yazısı, sokak röportajı ve forum cevabı. Söyleyiş odağı
 * söylenen ve söylenmeyen „h“; dil bilgisi karşılaştırma ve üstünlük.
 */
export const deA2P3: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a2-lib-r3",
    course: "de",
    level: "A2",
    skill: "reading",
    title: "Seit einem Monat werfe ich nichts mehr weg",
    genre: "blog",
    intro: "Birinin gıda israfını azaltma denemesini anlattığı blog yazısını okuyacaksın: önce nasıldı, ne değişti, sonuç ne oldu.",
    gloss: [
      { de: "der Beutel", tr: "poşet", en: "bag" },
      { de: "das Lebensmittel", tr: "gıda", en: "food item" },
      { de: "ärgern", tr: "sinirlendirmek", en: "to annoy" },
      { de: "einfrieren", tr: "dondurmak", en: "to freeze" },
      { de: "sparen", tr: "biriktirmek", en: "to save" },
      { de: "das Ergebnis", tr: "sonuç", en: "result" },
    ],
    minutes: 5,
    text:
      "SEIT EINEM MONAT WERFE ICH NICHTS MEHR WEG\n\n" +
      "Früher habe ich jede Woche einen halben Beutel Lebensmittel in den Müll geworfen: Joghurt, Salat, altes Brot. " +
      "Das hat mich geärgert, aber ich habe nichts geändert.\n\n" +
      "Im März habe ich dann vier Wochen lang alles aufgeschrieben. Danach war die Liste lang und sehr peinlich.\n\n" +
      "Jetzt mache ich drei Dinge anders. Erstens gehe ich nie mehr hungrig einkaufen. " +
      "Zweitens koche ich am Sonntag und friere die Hälfte ein. " +
      "Und drittens steht im Kühlschrank eine kleine Kiste. Dort liegen die Sachen mit dem kürzesten Datum, " +
      "und die esse ich zuerst.\n\n" +
      "Das Ergebnis nach vier Wochen: Ich habe fast dreißig Euro gespart und nur eine Zitrone weggeworfen. " +
      "Perfekt bin ich nicht, aber mein Müll ist deutlich leichter geworden.",
    questions: [
      {
        text: "Worum geht es in dem Text?",
        options: [
          "Der Autor wirft weniger Lebensmittel weg.",
          "Der Autor kocht jetzt für seine Nachbarn.",
          "Der Autor kauft nur noch billige Lebensmittel.",
        ],
        answer: 0,
        explain: "Başlık ve sonuç aynı şeyi söylüyor: çöpe atılan yiyecek azaldı. Komşular ve ucuzluk hiç geçmiyor.",
      },
      {
        text: "Was hat der Autor im März gemacht?",
        options: [
          "Er hat vier Wochen alles aufgeschrieben.",
          "Er hat einen Kochkurs besucht.",
          "Er hat einen neuen Kühlschrank gekauft.",
        ],
        answer: 0,
        explain: "„Im März habe ich dann vier Wochen lang alles aufgeschrieben.“",
      },
      {
        kind: "truefalse",
        text: "Der Autor wirft heute gar nichts mehr weg.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„… und nur eine Zitrone weggeworfen“ ve „Perfekt bin ich nicht“ — hiç değil, çok daha az.",
      },
      {
        kind: "gapfill",
        text: "Der Autor geht nie mehr ___ einkaufen.",
        options: [],
        answer: 0,
        accept: ["hungrig"],
        explain: "„Erstens gehe ich nie mehr hungrig einkaufen.“",
      },
      {
        kind: "short_answer",
        text: "Wie viel Geld hat der Autor gespart?",
        options: [],
        answer: 0,
        accept: ["fast dreißig Euro", "dreißig Euro", "30 Euro", "fast 30 Euro"],
        explain: "„Ich habe fast dreißig Euro gespart …“",
      },
      {
        text: "Wie beurteilt der Autor sein Ergebnis?",
        options: ["zufrieden, aber nicht perfekt", "enttäuscht und ohne Hoffnung", "stolz und ganz fehlerfrei"],
        answer: 0,
        explain: "„Perfekt bin ich nicht, aber mein Müll ist deutlich leichter geworden.“ — memnun ama kusursuz değil.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a2-lib-l3",
    course: "de",
    level: "A2",
    skill: "listening",
    title: "Die Marktstraße ohne Autos",
    genre: "interview",
    intro: "Bir muhabir sokakta iki kişiye yeni yaya bölgesini soruyor: kim ne buluyor, sorun ne.",
    gloss: [
      { de: "der Fußgänger", tr: "yaya", en: "pedestrian" },
      { de: "der Kinderwagen", tr: "bebek arabası", en: "pram" },
      { de: "der Umsatz", tr: "ciro", en: "turnover" },
      { de: "der Lieferwagen", tr: "dağıtım aracı", en: "delivery van" },
      { de: "der Lärm", tr: "gürültü", en: "noise" },
      { de: "bestimmen", tr: "belirlemek", en: "to set" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Reporterin", text: "Seit Mai ist die Marktstraße nur noch für Fußgänger offen. Was sagen Sie dazu?" },
      { speaker: "Frau Özdemir", text: "Für mich ist es viel besser. Ich komme mit dem Kinderwagen durch und muss nicht mehr auf jedes Auto achten." },
      { speaker: "Reporterin", text: "Und Sie, arbeiten Sie hier?" },
      { speaker: "Herr Bleul", text: "Ja, ich habe den Blumenladen in der Nummer zwölf. Am Anfang hatte ich Angst um meine Kunden." },
      { speaker: "Herr Bleul", text: "Aber jetzt bleiben die Leute stehen und schauen. Im Sommer war mein Umsatz sogar höher als im letzten Jahr." },
      { speaker: "Frau Özdemir", text: "Ein Problem gibt es trotzdem: Die Lieferwagen kommen morgens sehr früh und machen viel Lärm." },
      { speaker: "Herr Bleul", text: "Da hat sie recht. Die Stadt kann dafür eine feste Zeit bestimmen." },
      { speaker: "Reporterin", text: "Vielen Dank Ihnen beiden für das Gespräch." },
    ],
    questions: [
      {
        text: "Worum geht es im Gespräch?",
        options: ["um eine Straße ohne Autos", "um einen neuen Blumenladen", "um die Öffnungszeiten der Läden"],
        answer: 0,
        explain: "İlk cümle: „Seit Mai ist die Marktstraße nur noch für Fußgänger offen.“",
      },
      {
        text: "Warum gefällt Frau Özdemir die Änderung?",
        options: [
          "Sie kommt mit dem Kinderwagen besser durch.",
          "Sie kauft dort jetzt viel billiger ein.",
          "Sie hat einen kürzeren Weg zur Arbeit.",
        ],
        answer: 0,
        explain: "„Ich komme mit dem Kinderwagen durch und muss nicht mehr auf jedes Auto achten.“",
      },
      {
        kind: "truefalse",
        text: "Herr Bleul denkt heute anders über die Änderung als am Anfang.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Am Anfang hatte ich Angst um meine Kunden“ — sonra: „Im Sommer war mein Umsatz sogar höher.“",
      },
      {
        kind: "short_answer",
        text: "Was stört Frau Özdemir?",
        options: [],
        answer: 0,
        accept: ["der Lärm der Lieferwagen", "der Lärm", "die Lieferwagen", "der Lärm am Morgen"],
        explain: "„Die Lieferwagen kommen morgens sehr früh und machen viel Lärm.“",
      },
      {
        kind: "dictation",
        text: "Çiçekçinin başlangıçtaki endişesini duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Am Anfang hatte ich Angst um meine Kunden.", "Am Anfang hatte ich Angst um meine Kunden"],
        explain: "„Am Anfang hatte ich Angst um meine Kunden.“ — „haben“ Präteritum'da hatte olur.",
      },
      {
        text: "Was schlägt Herr Bleul vor?",
        options: [
          "eine feste Zeit für die Lieferungen",
          "mehr Parkplätze hinter der Straße",
          "einen zweiten Eingang für den Laden",
        ],
        answer: 0,
        explain: "„Die Stadt kann dafür eine feste Zeit bestimmen.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a2-lib-w3",
    course: "de",
    level: "A2",
    skill: "writing",
    title: "Neu in der Stadt",
    genre: "forum",
    intro: "Bir forumda yeni şehirde arkadaş edinmeyi soruyorlar; önce iki cümle kur, sonra kendi deneyiminle cevap yaz.",
    gloss: [
      { de: "der Verein", tr: "dernek", en: "club" },
      { de: "regelmäßig", tr: "düzenli", en: "regularly" },
      { de: "klingeln", tr: "zile basmak", en: "to ring the bell" },
      { de: "peinlich", tr: "utandırıcı", en: "embarrassing" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Bir yıl önce bu şehre taşındım.",
        answer: "Vor einem Jahr bin ich in diese Stadt gezogen.",
        alternatives: ["Ich bin vor einem Jahr in diese Stadt gezogen."],
        hint: "Yer değiştirme anlatan „ziehen“ Perfekt'te sein ile kurulur: bin … gezogen.",
      },
      {
        kind: "build",
        tr: "Bence bir dernek en kolay yol.",
        answer: "Ich glaube, dass ein Verein der einfachste Weg ist.",
        alternatives: ["Ich glaube, dass der einfachste Weg ein Verein ist."],
        hint: "„dass“ yan cümlesinde çekimli fiil (ist) en sona gider.",
      },
      {
        kind: "free",
        prompt:
          "Forumda biri yeni bir şehirde nasıl arkadaş bulacağını soruyor. Kendi deneyiminle cevap yaz: ne zamandır oradasın, neyi denedin, ne işe yaradı, ne yaramadı ve somut bir tavsiye ver.",
        stimulus:
          "Hallo zusammen, ich bin im August wegen der Arbeit nach Leipzig gezogen. Die Kollegen sind nett, " +
          "aber nach Feierabend bin ich immer allein. Wie habt ihr in einer neuen Stadt Leute kennengelernt?",
        checklist: [
          "Ne zamandır o şehirde olduğunu yaz",
          "Denediğin iki şeyi anlat",
          "Neyin işe yaradığını, neyin yaramadığını söyle",
          "Somut bir tavsiyeyle bitir",
        ],
        minWords: 40,
        phrases: [
          { de: "Ich kenne das Gefühl.", tr: "Bu duyguyu bilirim.", en: "I know that feeling." },
          { de: "Bei mir hat … geholfen.", tr: "Bende … işe yaradı.", en: "… helped me." },
          { de: "Am Anfang war es schwer.", tr: "Başta zordu.", en: "It was hard at the start." },
          { de: "Mein Tipp ist: …", tr: "Benim tavsiyem: …", en: "My tip is: …" },
          { de: "Viel Glück!", tr: "Bol şans!", en: "Good luck!" },
        ],
        sample:
          "Hallo, ich kenne das Gefühl sehr gut. Vor einem Jahr bin ich in diese Stadt gezogen und am Anfang " +
          "habe ich nur gearbeitet und ferngesehen. Zwei Dinge haben bei mir geholfen. " +
          "Erstens gehe ich jeden Dienstag zum Volleyball. Man muss nicht gut spielen, aber man sieht regelmäßig " +
          "dieselben Gesichter. Zweitens habe ich im Haus an drei Türen geklingelt und mich vorgestellt. " +
          "Das war mir peinlich, aber heute trinke ich mit zwei Nachbarn oft Kaffee. " +
          "Ich glaube, dass ein Verein der einfachste Weg ist. Viel Glück!",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a2-lib-s3",
    course: "de",
    level: "A2",
    skill: "speaking",
    title: "Gesprochenes und stummes h",
    genre: "pronounce",
    intro: "Kelime ya da hece başındaki „h“ üflenerek söylenir; ünlüden sonraki „h“ ise hiç duyulmaz, yalnız ünlüyü uzatır.",
    gloss: [
      { de: "der Hunger", tr: "açlık", en: "hunger" },
      { de: "höflich", tr: "kibar", en: "polite" },
      { de: "wohin", tr: "nereye", en: "where to" },
      { de: "halb", tr: "buçuk", en: "half" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "Hast du heute Hunger?",
        tr: "Bugün acıktın mı?",
        hint: "Üç kelimede de h kelime başında: hafifçe üfle, bir mumu söndürür gibi.",
        confusions: [
          { heard: ["Ast du eute Unger", "Chast du"], fix: "Baştaki h'yi yutma; ama Türkçedeki „h“ gibi sert de değil, yalnız bir nefes.", expected: "Hunger" },
        ],
      },
      {
        de: "Ich gehe um zehn nach Hause.",
        tr: "Saat onda eve gidiyorum.",
        hint: "„gehe“ ve „zehn“ içindeki h duyulmaz, ünlüyü uzatır. „Hause“ başındaki h ise söylenir.",
        confusions: [
          { heard: ["Ich ge-he", "zeh-hen", "nach Ause"], fix: "Ünlüden sonraki h sessizdir: gee-e, tseen. Yalnız „Hause“ başında nefes var.", expected: "zehn" },
        ],
      },
      {
        de: "Der Hund hat hier gewartet.",
        tr: "Köpek burada bekledi.",
        hint: "Üç kez kelime başında h: HUNT, HAT, HİİA. Üçünde de küçük bir nefes.",
        confusions: [
          { heard: ["Der Und at ier", "Der Hund hat ier"], fix: "Üçünü de üfleyerek söyle; birini atlarsan cümle Almanca durmaz.", expected: "hier" },
        ],
      },
      {
        de: "Wohin fährst du im Urlaub?",
        tr: "Tatilde nereye gidiyorsun?",
        hint: "„wohin“ iki hecelidir ve h ikinci hecenin başında: vo-HİN, üflenir.",
        confusions: [
          { heard: ["Woin fährst du", "Wo-in"], fix: "Burada h ünlüden sonra değil, yeni hecenin başında; o yüzden duyulur: vohin.", expected: "Wohin" },
        ],
      },
      {
        de: "Ihr Sohn ist sehr höflich.",
        tr: "Oğlunuz çok kibar.",
        hint: "„Ihr“, „Sohn“ ve „sehr“ içindeki h sessiz; yalnız „höflich“ başındaki h söylenir.",
        confusions: [
          { heard: ["Ihrr Sohnn", "sehr höflich mit h", "Zohn"], fix: "Üç kelimede h yalnız uzatıyor: iia, zoon, zea. Dördüncüde nefes var: HÖÖF-lih.", expected: "höflich" },
        ],
      },
      {
        de: "Nehmen Sie bitte Platz.",
        tr: "Lütfen oturun.",
        hint: "„nehmen“ içindeki h duyulmaz: NEE-men, uzun e ile.",
        confusions: [
          { heard: ["Neh-men", "Nechmen"], fix: "Ortadaki h ne nefes ne de ch sesi; yalnız e'yi uzatır: neemen.", expected: "Nehmen" },
        ],
      },
      {
        de: "Herr Huber hat halb acht gesagt.",
        tr: "Bay Huber sekiz buçuk dedi.",
        hint: "Dört kez kelime başında h — bu cümle bir nefes egzersizi gibi.",
        confusions: [
          { heard: ["Err Uber at alb acht", "Herr Huber hatt"], fix: "Dört h'nin dördü de üflenir; hiçbiri sessiz değil çünkü hepsi kelime başında.", expected: "halb" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a2-lib-g3",
    course: "de",
    level: "A2",
    skill: "grammar",
    title: "größer, am größten",
    genre: "grammar",
    intro: "Karşılaştırma Almancada ayrı bir kelimeyle değil, sıfatın kendisine gelen eklerle kurulur.",
    focus: "Komparativ ve Superlativ",
    gloss: [
      { de: "kurz", tr: "kısa", en: "short" },
      { de: "der Fluss", tr: "nehir", en: "river" },
      { de: "schnell", tr: "hızlı", en: "fast" },
      { de: "gern", tr: "severek", en: "gladly" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "Ek mi, ayrı kelime mi?",
        tr: "Türkçede „daha büyük“ ve „en büyük“ iki kelimedir. Almancada ek gelir: groß → größer → am größten. Kısa sıfatların çoğunda ünlü de nokta alır: alt → älter, jung → jünger, lang → länger.",
        examples: [
          { de: "Mein Zimmer ist klein.", tr: "Odam küçük." },
          { de: "Dein Zimmer ist kleiner.", tr: "Senin odan daha küçük.", note: "-er eki" },
          { de: "Sein Zimmer ist am kleinsten.", tr: "Onun odası en küçük.", note: "am …-sten" },
        ],
      },
      {
        heading: "als mi, wie mi?",
        tr: "Fark varsa „als“ kullanılır, eşitlik varsa „so … wie“. Türkçe konuşanların en sık hatası „größer wie“ demektir; doğrusu „größer als“.",
        examples: [
          { de: "Berlin ist größer als Hamburg.", tr: "Berlin Hamburg'dan büyük.", note: "fark → als" },
          { de: "Ich bin so alt wie du.", tr: "Seninle aynı yaştayım.", note: "eşitlik → so … wie" },
          { de: "Heute ist es nicht so kalt wie gestern.", tr: "Bugün dün kadar soğuk değil." },
        ],
      },
      {
        heading: "Ezberlenecek beş tanesi",
        tr: "Beş sıfat kuralın dışında kalır ve çok sık geçer: gut → besser → am besten, viel → mehr → am meisten, gern → lieber → am liebsten, hoch → höher → am höchsten, nah → näher → am nächsten.",
        examples: [
          { de: "Sie spricht besser Deutsch als ich.", tr: "Benden daha iyi Almanca konuşuyor." },
          { de: "Ich trinke lieber Tee als Kaffee.", tr: "Kahvedense çayı tercih ederim." },
          { de: "Die nächste Haltestelle ist am Markt.", tr: "Bir sonraki durak pazarın yanında." },
        ],
      },
    ],
    questions: [
      {
        text: "Mein Bruder ist ___ als ich.",
        options: ["älter", "alt", "am ältesten"],
        answer: 0,
        explain: "„als“ bir karşılaştırma bağlacıdır, yani -er eki gerekir: älter als.",
      },
      {
        text: "Das ist der ___ Weg zum Bahnhof.",
        options: ["kürzeste", "kürzer", "kurz"],
        answer: 0,
        explain: "Bir tanesini öne çıkarıyoruz: üstünlük derecesi, isimden önce -ste eki alır.",
      },
      {
        text: "Ich trinke ___ Tee als Kaffee.",
        options: ["lieber", "gern", "am liebsten"],
        answer: 0,
        explain: "„gern“ düzensizdir: gern → lieber → am liebsten. „als“ olduğu için orta basamak gerekir.",
      },
      {
        kind: "gapfill",
        text: "Heute ist es ___ (warm) als gestern.",
        options: [],
        answer: 0,
        accept: ["wärmer"],
        explain: "Kısa sıfat -er alır ve ünlü nokta alır: wärmer.",
      },
      {
        kind: "gapfill",
        text: "Anna spricht ___ (gut) Deutsch als ich.",
        options: [],
        answer: 0,
        accept: ["besser"],
        explain: "„gut“ düzensizdir: gut → besser → am besten.",
      },
      {
        kind: "gapfill",
        text: "Der Rhein ist ___ (lang) Fluss in Deutschland.",
        options: [],
        answer: 0,
        accept: ["der längste"],
        explain: "İsimden önce gelen üstünlük derecesi artikelle kurulur: der längste Fluss.",
      },
      {
        kind: "gapfill",
        text: "Ich mag Pizza, aber am ___ (gern) esse ich Fisch.",
        options: [],
        answer: 0,
        accept: ["liebsten"],
        explain: "„gern“ üstünlük derecesinde am liebsten olur.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Berlin", "ist", "größer", "als", "Hamburg"],
        explain: "Karşılaştırılan şey „als“ ile sona gelir: Berlin ist größer als Hamburg.",
      },
      {
        kind: "truefalse",
        text: "„Mein Auto ist schneller wie deins.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Fark varsa „als“ gelir; doğrusu „schneller als deins“.",
      },
      {
        kind: "truefalse",
        text: "„Das ist das beste Restaurant in der Stadt.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "İsimden önce gelen üstünlük derecesi artikel alır ve „gut“ düzensizdir: das beste.",
      },
    ],
  },
];
