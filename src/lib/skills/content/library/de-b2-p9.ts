import type { SkillExercise } from "../../types";

/**
 * DE · B2 — Beceriler kütüphanesi, parti 9.
 *
 * Kurallar ve emsal: `de-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 9 gıda hattı: israfı azaltmak için bir kılavuz, bir bilgi yayını,
 * bir hizmet değerlendirmesi. Dil bilgisi genişletilmiş ilgi cümleleri —
 * dessen, deren, was ve wo.
 */
export const deB2P9: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b2-lib-r9",
    course: "de",
    level: "B2",
    skill: "reading",
    title: "Reste retten: eine nüchterne Anleitung",
    genre: "guide",
    intro: "Bir rehber metin: gıda israfını azaltmak için hangi adım gerçekten işe yarıyor, hangisi süs.",
    gloss: [
      { de: "der Einkaufszettel", tr: "alışveriş listesi", en: "shopping list" },
      { de: "der Vorrat", tr: "stok", en: "supply" },
      { de: "das Mindesthaltbarkeitsdatum", tr: "tavsiye edilen tüketim tarihi", en: "best-before date" },
      { de: "verderben", tr: "bozulmak", en: "to spoil" },
      { de: "einfrieren", tr: "dondurmak", en: "to freeze" },
      { de: "die Gewohnheit", tr: "alışkanlık", en: "habit" },
    ],
    minutes: 8,
    text:
      "Reste retten: eine nüchterne Anleitung\n\n" +
      "Über die Hälfte der Lebensmittel, die in Deutschland weggeworfen werden, landet in " +
      "privaten Haushalten im Müll. Die Ratschläge dagegen sind meist gut gemeint und " +
      "trotzdem wirkungslos, weil sie eine Planung voraussetzen, deren Aufwand niemand " +
      "auf Dauer durchhält.\n\n" +
      "Was zuverlässig wirkt, sind drei Gewohnheiten.\n\n" +
      "Erstens: einmal pro Woche in den Kühlschrank schauen, bevor man den Einkaufszettel " +
      "schreibt. Klingt banal, spart aber mehr als jede Liste, deren Punkte man ohnehin " +
      "vergisst. Wer weiß, was da ist, kauft es nicht doppelt.\n\n" +
      "Zweitens: das Mindesthaltbarkeitsdatum richtig lesen. Es sagt, bis wann der Hersteller " +
      "Geschmack und Farbe garantiert — nicht, wann etwas verdirbt. Joghurt, dessen Datum " +
      "zwei Wochen zurückliegt, ist in aller Regel einwandfrei. Bei Fleisch und Fisch gilt " +
      "das nicht, dort steht ein Verbrauchsdatum, und das ist eine Grenze.\n\n" +
      "Drittens: einfrieren, und zwar sofort, nicht am letzten Tag. " +
      "Brot, das man am Kauftag einfriert, schmeckt nach dem Auftauen wie frisch; " +
      "Brot, das drei Tage alt war, schmeckt nach drei Tage altem Brot.\n\n" +
      "Was dagegen wenig bringt, sind Apps, die Vorräte verwalten. " +
      "Nicht weil die Idee schlecht wäre, sondern weil das Eintragen dieselbe Disziplin " +
      "verlangt, an der die Planung schon gescheitert ist.",
    questions: [
      {
        text: "Warum wirken die üblichen Ratschläge laut Text nicht?",
        options: [
          "Sie sind zu teuer.",
          "Sie verlangen eine Planung, die niemand durchhält.",
          "Sie widersprechen sich gegenseitig.",
        ],
        answer: 1,
        explain: "„eine Planung voraussetzen, deren Aufwand niemand auf Dauer durchhält“.",
      },
      {
        text: "Was sagt das Mindesthaltbarkeitsdatum aus?",
        options: [
          "bis wann Geschmack und Farbe garantiert sind",
          "wann das Produkt verdirbt",
          "wann es verkauft werden muss",
        ],
        answer: 0,
        explain: "Bozulma tarihi değil; et ve balıkta ayrı bir „Verbrauchsdatum“ var.",
      },
      {
        kind: "truefalse",
        text: "Der Text empfiehlt Apps zur Vorratsverwaltung.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Kayıt tutmak, planlamanın zaten tökezlediği disiplini istiyor.",
      },
      {
        kind: "gapfill",
        text: "Brot sollte man am ___ einfrieren.",
        options: [],
        answer: 0,
        accept: ["Kauftag", "Tag des Kaufs"],
        explain: "„Brot, das man am Kauftag einfriert, schmeckt nach dem Auftauen wie frisch.“",
      },
      {
        kind: "short_answer",
        text: "Was soll man vor dem Einkaufszettel machen?",
        options: [],
        answer: 0,
        accept: ["in den Kühlschrank schauen", "den Kühlschrank ansehen", "in den Kühlschrank sehen"],
        explain: "Haftada bir kez, liste yazmadan önce buzdolabına bakmak.",
      },
      {
        text: "Wo gilt die Regel zum Datum NICHT?",
        options: ["bei Joghurt", "bei Brot", "bei Fleisch und Fisch"],
        answer: 2,
        explain: "Orada „Verbrauchsdatum“ var ve o bir sınırdır.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b2-lib-l9",
    course: "de",
    level: "B2",
    skill: "listening",
    title: "Was aus den Containern wird",
    genre: "info",
    intro: "Bir bilgilendirme yayını: markette satılmayan gıdanın yolu nereye çıkıyor, hangi engeller var.",
    gloss: [
      { de: "die Tafel", tr: "gıda bankası", en: "food bank" },
      { de: "die Spende", tr: "bağış", en: "donation" },
      { de: "die Schulung", tr: "eğitim", en: "training session" },
      { de: "die Kühlkette", tr: "soğuk zincir", en: "cold chain" },
      { de: "die Tonne", tr: "çöp kutusu", en: "trash can" },
      { de: "aussortieren", tr: "ayıklamak", en: "to sort out" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Moderatorin", text: "Was passiert eigentlich mit Lebensmitteln, die ein Supermarkt nicht mehr verkaufen darf?" },
      { speaker: "Moderatorin", text: "Ein großer Teil geht an die Tafeln. Allein im letzten Jahr waren das bundesweit über zweihunderttausend Tonnen." },
      { speaker: "Moderatorin", text: "Der Weg dorthin ist allerdings aufwendiger, als viele denken: Die Ware muss aussortiert, gekühlt und meistens am selben Tag abgeholt werden." },
      { speaker: "Herr Dr. Sander", text: "Das Problem ist selten der gute Wille. Es scheitert an der Logistik und an der Frage, wer haftet, wenn jemand krank wird." },
      { speaker: "Moderatorin", text: "Rechtlich ist die Lage klarer, als der Ruf vermuten lässt: Wer Lebensmittel spendet, haftet nur bei grober Fahrlässigkeit." },
      { speaker: "Moderatorin", text: "Trotzdem entscheiden sich viele Filialleiterinnen im Zweifel für die Tonne, weil sie die Regel nicht genau kennen." },
      { speaker: "Frau Kowalski", text: "Bei uns hat erst eine Schulung etwas verändert. Vorher haben wir zwei Kisten gespendet, heute sind es zwölf." },
      { speaker: "Moderatorin", text: "Was bleibt, ist die Kühlkette. Fleisch, Fisch und fertige Salate lassen sich kaum weitergeben, wenn der Transport nicht durchgehend kühl ist." },
    ],
    questions: [
      {
        text: "Woran scheitert die Weitergabe laut Dr. Sander meistens?",
        options: [
          "am fehlenden guten Willen",
          "an Logistik und Haftungsfragen",
          "an den Kosten für die Tafeln",
        ],
        answer: 1,
        explain: "„Es scheitert an der Logistik und an der Frage, wer haftet.“",
      },
      {
        text: "Wie ist die Rechtslage wirklich?",
        options: [
          "Spender haften für jeden Schaden.",
          "Spender haften nur bei grober Fahrlässigkeit.",
          "Spenden sind rechtlich verboten.",
        ],
        answer: 1,
        explain: "„Wer Lebensmittel spendet, haftet nur bei grober Fahrlässigkeit.“",
      },
      {
        kind: "truefalse",
        text: "Eine Schulung hat bei Frau Kowalski nichts verändert.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "İki kutudan on iki kutuya çıkmışlar.",
      },
      {
        kind: "gapfill",
        text: "Im letzten Jahr waren es über ___ Tonnen.",
        options: [],
        answer: 0,
        accept: ["zweihunderttausend", "200000", "200.000"],
        explain: "„bundesweit über zweihunderttausend Tonnen“.",
      },
      {
        kind: "short_answer",
        text: "Welches Problem bleibt auch nach einer Schulung?",
        options: [],
        answer: 0,
        accept: ["die Kühlkette", "Kühlkette", "der Transport"],
        explain: "Soğuk zincir kesilirse et, balık ve hazır salata verilemiyor.",
      },
      {
        text: "Warum landet Ware trotzdem oft in der Tonne?",
        options: [
          "weil Filialleitungen die Regel nicht genau kennen",
          "weil die Tafeln nichts annehmen",
          "weil es verboten ist",
        ],
        answer: 0,
        explain: "Kuralı tam bilmedikleri için şüpheye düşünce çöpü seçiyorlar.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b2-lib-w9",
    course: "de",
    level: "B2",
    skill: "writing",
    title: "Bewertung: Die Rettertüte",
    genre: "review",
    intro: "Bir hizmeti ayrıntılı değerlendiriyorsun: önce iki cümle kur, sonra ölçütlü bir yorum yaz.",
    gloss: [
      { de: "die Überraschung", tr: "sürpriz", en: "surprise" },
      { de: "der Anbieter", tr: "hizmet sağlayıcı", en: "provider" },
      { de: "die Abholung", tr: "teslim alma", en: "collection" },
      { de: "die Erwartung", tr: "beklenti", en: "expectation" },
      { de: "nachvollziehbar", tr: "anlaşılır", en: "understandable" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "İçeriği önceden bilinmeyen bir poşet alıyorsunuz.",
        answer: "Man bekommt eine Tüte, deren Inhalt man vorher nicht kennt.",
        alternatives: ["Man erhält eine Tüte, deren Inhalt vorher nicht bekannt ist."],
        hint: "İlgi cümlesinde Genitiv: dişil isim „die Tüte“ → deren.",
      },
      {
        kind: "build",
        tr: "Beni en çok rahatsız eden şey teslim alma saatiydi.",
        answer: "Was mich am meisten gestört hat, war die Abholzeit.",
        alternatives: ["Am meisten gestört hat mich die Abholzeit."],
        hint: "Tüm bir cümleye gönderme yapan ilgi zamiri „was“tır.",
      },
      {
        kind: "free",
        prompt:
          "Bir hizmeti değerlendir: ne olduğunu ve nasıl çalıştığını kısaca anlat, beklentini ve gerçekleşeni karşılaştır, iki ölçütte somut ol, kime uygun olduğunu söyle ve puanını gerekçelendir.",
        checklist: [
          "Hizmeti ve nasıl çalıştığını kısaca anlat",
          "Beklenti ile gerçekleşeni karşılaştır",
          "En az iki ölçütte somut ol",
          "Kime uygun olduğunu söyle ve puanını gerekçelendir",
        ],
        minWords: 120,
        phrases: [
          { de: "Das Prinzip ist einfach: …", tr: "İlke basit: …", en: "The principle is simple: …" },
          { de: "Erwartet hatte ich …, bekommen habe ich …", tr: "… bekliyordum, … aldım", en: "I had expected …, what I got was …" },
          { de: "Positiv hervorzuheben ist …", tr: "Özellikle olumlu olan …", en: "Worth highlighting positively is …" },
          { de: "Was mich gestört hat, war …", tr: "Beni rahatsız eden şey … oldu", en: "What bothered me was …" },
          { de: "Empfehlenswert ist das für alle, die …", tr: "Bu, … olanlara tavsiye edilir", en: "This is recommended for anyone who …" },
        ],
        sample:
          "Seit zwei Monaten hole ich einmal pro Woche eine sogenannte Rettertüte bei einer Bäckerei " +
          "in der Nähe ab. Das Prinzip ist einfach: Man bekommt für drei Euro eine Tüte, deren Inhalt " +
          "man vorher nicht kennt, und zwar das, was am Abend übrig geblieben ist. " +
          "Erwartet hatte ich vor allem altes Brot, bekommen habe ich überwiegend Kuchen und Brötchen, " +
          "die am nächsten Morgen noch gut waren. " +
          "Positiv hervorzuheben ist das Verhältnis von Preis und Menge; in sechs von acht Fällen " +
          "hat der Inhalt für zwei Tage gereicht. " +
          "Was mich gestört hat, war die Abholzeit: zwischen achtzehn und achtzehn Uhr dreißig, " +
          "was für alle mit festen Arbeitszeiten schwer zu schaffen ist. " +
          "Zweimal war die Tüte schon weg, obwohl ich pünktlich war, was ich nicht ganz nachvollziehbar finde. " +
          "Empfehlenswert ist das für alle, die flexibel sind und mit Überraschungen umgehen können; " +
          "wer bestimmte Sachen braucht, wird enttäuscht. Von mir vier von fünf Punkten.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b2-lib-s9",
    course: "de",
    level: "B2",
    skill: "speaking",
    title: "Wer trägt die Verantwortung für weggeworfenes Essen?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: sorumluluğu paylaştır ve kolay cevaba direnç göster.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Atılan gıdanın sorumluluğu kimde: tüketicide mi, marketlerde mi, yasada mı? Bir dağılım öner, gerekçelendir, en kolay cevabın neden yetersiz olduğunu söyle ve tek bir somut değişiklik öner.",
      bulletsTr: [
        "Sorumluluğu nasıl dağıttığını söyle",
        "Bir gerekçe ver",
        "En kolay cevabın neden yetersiz olduğunu anlat",
        "Tek bir somut değişiklik öner",
      ],
      targets: [
        { de: "Die Verantwortung verteilt sich meiner Ansicht nach auf …", tr: "Bana göre sorumluluk … arasında dağılıyor" },
        { de: "Die bequeme Antwort wäre, …", tr: "Kolay cevap … olurdu" },
        { de: "Sie greift aber zu kurz, weil …", tr: "Ama yetersiz kalıyor, çünkü …" },
        { de: "Konkret ändern würde ich …", tr: "Somut olarak … değiştirirdim" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "Die Verantwortung verteilt sich meiner Ansicht nach auf drei Ebenen, aber nicht zu gleichen " +
        "Teilen. Die größte Menge entsteht in Haushalten, das heißt bei uns allen, und insofern " +
        "kommt niemand aus der Sache heraus. " +
        "Die bequeme Antwort wäre, damit sei die Frage beantwortet: Die Leute sollen eben besser " +
        "planen. Sie greift aber zu kurz, weil die Bedingungen, unter denen eingekauft wird, " +
        "nicht von den Leuten gemacht werden. Wer Dreierpackungen billiger anbietet als " +
        "Einzelstücke, verkauft absichtlich mehr, als gebraucht wird, und nimmt den Rest in Kauf. " +
        "Und wer ein Datum aufdruckt, das nach Verderb klingt, obwohl es Geschmack meint, " +
        "produziert Unsicherheit, die vorhersehbar in der Tonne endet. " +
        "Konkret ändern würde ich genau dieses Datum: eine Kennzeichnung, die in zwei Zeilen sagt, " +
        "was garantiert ist und was nicht. Das kostet niemanden etwas, wirkt in jedem Haushalt " +
        "und nimmt den Leuten eine Entscheidung ab, die sie fachlich gar nicht treffen können.",
      rubricHint:
        "Bir dağılım, kolay cevaba itiraz ve tek somut öneri beklenir; „verteilt sich auf“, „zu kurz greifen“ ve ilgi cümleleri kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b2-lib-g9",
    course: "de",
    level: "B2",
    skill: "grammar",
    title: "dessen, deren, was, wo",
    genre: "grammar",
    intro: "İlgi cümlesi B1'de öğrenildi; B2'de dört yeni biçim geliyor ve üçü Türkçede karşılıksız.",
    focus: "Genişletilmiş ilgi cümleleri: Genitiv, was ve yer ilgi zamirleri",
    gloss: [
      { de: "der Inhalt", tr: "içerik", en: "content" },
      { de: "die Kollegin", tr: "iş arkadaşı", en: "colleague" },
      { de: "der Vorstand", tr: "yönetim kurulu", en: "board" },
      { de: "der Ort", tr: "yer", en: "place" },
      { de: "der Bewohner", tr: "sakin", en: "resident" },
    ],
    minutes: 10,
    explanation: [
      {
        heading: "dessen ve deren: sahiplik",
        tr: "İlgi cümlesinde „onun …“ demek için Genitiv ilgi zamiri kullanılır: eril ve nötr isimlerde „dessen“, dişil ve çoğulda „deren“. Arkasından gelen isim ARTİKELSİZ kalır ve hâlini ilgi cümlesi içindeki göreviyle alır.",
        examples: [
          { de: "Eine Tüte, deren Inhalt man nicht kennt.", tr: "İçeriği bilinmeyen bir poşet.", note: "die Tüte → deren" },
          { de: "Ein Verein, dessen Vorstand fehlt.", tr: "Yönetimi olmayan bir dernek.", note: "der Verein → dessen" },
          { de: "Bewohner, deren Wohnungen saniert werden.", tr: "Daireleri yenilenen sakinler.", note: "çoğul → deren" },
        ],
      },
      {
        heading: "was: bütün bir cümleye gönderme",
        tr: "İlgi zamiri tek bir isme değil ÖNCEKİ CÜMLENİN TAMAMINA gönderme yapıyorsa „was“ kullanılır. Ayrıca „alles“, „nichts“, „etwas“, „das“ ve üstünlük sıfatlarından sonra da „was“ gelir — „der/die/das“ değil.",
        examples: [
          { de: "Die Tüte war schon weg, was mich geärgert hat.", tr: "Poşet çoktan gitmişti, bu da canımı sıktı.", note: "cümlenin tamamına" },
          { de: "Das ist alles, was ich weiß.", tr: "Bildiğim her şey bu.", note: "alles → was" },
          { de: "Das Beste, was du tun kannst, ist warten.", tr: "Yapabileceğin en iyi şey beklemek.", note: "üstünlük → was" },
        ],
      },
      {
        heading: "wo ve edatlı biçimler",
        tr: "Yer bildiren isimlerden sonra „in dem / an dem“ yerine „wo“ kullanılabilir ve daha doğaldır. Öncül „etwas“, „alles“, „das“ ya da bütün bir cümleyse edat „wo(r)-“ ile birleşir: „worüber“, „womit“. Somut bir isimde ve kişilerde edat + ilgi zamiri gelir: „das Buch, über das …“, „die Kollegin, mit der …“.",
        examples: [
          { de: "Den Ort, wo wir uns getroffen haben, gibt es nicht mehr.", tr: "Buluştuğumuz yer artık yok.", note: "= an dem" },
          { de: "Das ist etwas, worüber wir reden müssen.", tr: "Bu, konuşmamız gereken bir şey.", note: "etwas → worüber" },
          { de: "Die Kollegin, mit der ich gesprochen habe, ist im Urlaub.", tr: "Konuştuğum iş arkadaşı tatilde.", note: "kişi → mit der" },
        ],
      },
    ],
    questions: [
      {
        text: "Eine Tüte, ___ Inhalt man nicht kennt.",
        options: ["dessen", "deren", "die"],
        answer: 1,
        explain: "„die Tüte“ dişildir; Genitiv ilgi zamiri deren'dir.",
      },
      {
        text: "Ein Verein, ___ Vorstand fehlt.",
        options: ["deren", "dessen", "den"],
        answer: 1,
        explain: "„der Verein“ erildir; Genitiv ilgi zamiri dessen'dir.",
      },
      {
        text: "Die Tüte war weg, ___ mich geärgert hat.",
        options: ["was", "die", "das"],
        answer: 0,
        explain: "Gönderme tek bir isme değil, önceki cümlenin tamamına.",
      },
      {
        kind: "gapfill",
        text: "Das ist alles, ___ ich weiß.",
        options: [],
        answer: 0,
        accept: ["was"],
        explain: "„alles“ sözcüğünden sonra ilgi zamiri was olur.",
      },
      {
        kind: "gapfill",
        text: "Bewohner, ___ Wohnungen saniert werden, ziehen vorübergehend aus.",
        options: [],
        answer: 0,
        accept: ["deren"],
        explain: "Çoğulda Genitiv ilgi zamiri deren'dir.",
      },
      {
        kind: "gapfill",
        text: "Den Ort, ___ wir uns getroffen haben, gibt es nicht mehr.",
        options: [],
        answer: 0,
        accept: ["wo", "an dem"],
        explain: "Yer bildiren isimden sonra „wo“ ya da „an dem“ gelebilir.",
      },
      {
        kind: "gapfill",
        text: "Das ist etwas, ___ wir reden müssen. (über)",
        options: [],
        answer: 0,
        accept: ["worüber"],
        explain: "„etwas“tan sonra edat „wo(r)-“ ile birleşir: wo + r + über.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Die Kollegin", "mit der", "ich", "gesprochen habe", "ist im Urlaub"],
        explain: "Kişide edat + ilgi zamiri gelir ve ilgi cümlesi araya girer.",
      },
      {
        kind: "truefalse",
        text: "„Das Beste, das du tun kannst, ist warten.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Üstünlük sıfatından sonra „was“ gelir: „Das Beste, was du tun kannst“.",
      },
      {
        kind: "truefalse",
        text: "„Eine Tüte, deren Inhalt man nicht kennt.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Dişil Genitiv ilgi zamiri deren'dir ve arkasındaki isim artikelsiz kalır.",
      },
    ],
  },
];
