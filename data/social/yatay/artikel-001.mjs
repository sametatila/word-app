/* Artikel Kuralları 1: kelimenin sonundan artikel, 14 kural. Sayılar Lernomi sözlüğünden (data/app/words.json, H.stats;
   anlatımdaki sayı sözlükle tutmazsa yükleme durur). Örnekler ve sesler Defne'nin kelime kayıtları. Anlatımda Almanca
   sonek okunmuyor ("bu sonla biten"); sonek ekranda. Yüzde 90'ın altındaki sonlar (-um, -nis, -ent) bilerek yok. */
const episode = {
  template: "artikel",
  status: "taslak",
  created: "2026-10-14",
  slot: "2026-11-03 19:00",
  ytTitle: "Almanca artikel: der, die, das için 14 ipucu, örnekler ve istisnalar",
  content: ({ L, stats, art }) => ({
    // Samet: uzun videolarda ses/video üretimi beklesin (2026-10-14).
    narrationPaused: true,
    series: "Artikel Kuralları",
    ep: "Sonlar · 14 kural",
    hook: {
      lab: "Artikel kuralları · sayılarla",
      lines: ["Artikeli tahmin et,", "sonuna bak."],
      sub: "Her kural Lernomi sözlüğünden sayılarla.",
      card: { suf: "ung", word: "die Wohnung", tr: "daire · A1", art: "die", hit: 732, all: 734 },
      say: L("defne", "tr", "Artikeli tahmin ederken kelimenin sonundan yardım alabilirsin. On dört ipucunu örnekler ve istisnalarla çalışacağız. Sayılar bizim sözlüğümüzden; bütün Almanca kelimeleri temsil etmiyor."),
    },
    groups: [
      {
        title: "die: güçlü ipuçları",
        sub: "Neredeyse hiç şaşmayanlar",
        say: L("defne", "tr", "Önce güçlü ipuçları. Örnekleri dinle ve ekrandaki kelime sonuna bak. İstisnaları da birlikte göreceğiz."),
        rules: [
          { suf: "-ung", stats: stats(["ung"], { hit: 732, all: 734 }), examples: ["die Wohnung", "die Einladung", "die Prüfung", "die Meinung", "die Kleidung", "die Entschuldigung"].map(art), say: L("defne", "tr", "Ekrandaki sonla biten isimler sözlüğümüzde büyük ölçüde die alıyor. Örnekleri dinle; iki istisna da ekranda.") },
          { suf: "-heit / -keit", stats: stats(["heit", "keit"], { hit: 187, all: 187 }), examples: ["die Gesundheit", "die Krankheit", "die Wahrheit", "die Pünktlichkeit", "die Sehenswürdigkeit", "die Schwierigkeit"].map(art), say: L("defne", "tr", "Ekrandaki iki son da die için güçlü bir ipucu. Sözlüğümüzdeki örneklerin tamamı die alıyor.") },
          { suf: "-schaft", stats: stats(["schaft"], { hit: 54, all: 54 }), examples: ["die Mannschaft", "die Landschaft", "die Gesellschaft", "die Wissenschaft", "die Wirtschaft", "die Nachbarschaft"].map(art), say: L("defne", "tr", "Sözlüğümüzde bu sonla biten isimlerin hepsi die alıyor. Örnekleri birlikte dinleyelim.") },
          { suf: "-ion", stats: stats(["ion"], { hit: 143, all: 144 }), examples: ["die Information", "die Situation", "die Rezeption", "die Portion", "die Operation", "die Generation"].map(art), say: L("defne", "tr", "Bu sonla biten isimler sözlüğümüzde büyük ölçüde die alıyor. İstisna kelimeyi artikeliyle birlikte ekranda görebilirsin.") },
          { suf: "-tät", stats: stats(["tät"], { hit: 56, all: 56 }), examples: ["die Universität", "die Qualität", "die Aktivität", "die Mobilität", "die Spezialität", "die Solidarität"].map(art), say: L("defne", "tr", "Sözlüğümüzde bu sonla biten isimlerin hepsi die. Anlamları Türkçeden tanıdık olabilir: üniversite, kalite, aktivite.") },
        ],
      },
      {
        title: "die: güçlü eğilimler",
        sub: "Çoğu zaman doğru, birkaç istisnayla",
        say: L("defne", "tr", "Şimdi güçlü eğilimler. Çoğu zaman doğru, ama birkaç istisnası var."),
        rules: [
          { suf: "-ik", stats: stats(["ik"], { hit: 46, all: 50 }), examples: ["die Musik", "die Mathematik", "die Grammatik", "die Fabrik", "die Physik", "die Klinik"].map(art), say: L("defne", "tr", "Bu son da die için güçlü bir ipucu, ama kesin değil. İstisna kelimeleri ekranda artikelleriyle karşılaştır.") },
          { suf: "-ie", stats: stats(["ie"], { hit: 75, all: 77 }), examples: ["die Familie", "die Chemie", "die Serie", "die Batterie", "die Fantasie", "die Kopie"].map(art), say: L("defne", "tr", "Bu sonla biten isimlerin çoğu die alıyor. İstisnaları yalnız anlamıyla değil, Almanca kelimesi ve artikeliyle birlikte öğren.") },
          { suf: "-enz", stats: stats(["enz"], { hit: 30, all: 30 }), examples: ["die Konkurrenz", "die Intelligenz", "die Konferenz", "die Tendenz", "die Kompetenz", "die Referenz"].map(art), say: L("defne", "tr", "Sözlüğümüzde bu sonla biten isimlerin hepsi die alıyor.") },
        ],
      },
      {
        title: "das alanlar",
        sub: "Küçültme eki ve yabancı kökenliler",
        say: L("defne", "tr", "Şimdi das alanlar."),
        rules: [
          { suf: "-chen", stats: stats(["chen"], { hit: 15, all: 18 }), examples: ["das Mädchen", "das Hähnchen", "das Brötchen", "das Päckchen"].map(art), say: L("defne", "tr", "Bu son küçültme eki olarak kullanıldığında isim das alır. Ama bazı kelimelerde yalnız benzer bir harf dizisi var; birazdan farkı göreceğiz.") },
          { suf: "-ment", stats: stats(["ment"], { hit: 14, all: 15 }), examples: ["das Medikament", "das Kompliment", "das Instrument", "das Apartment", "das Abonnement", "das Parlament"].map(art), say: L("defne", "tr", "Bu sonla biten isimlerin çoğu sözlüğümüzde das alıyor. İstisnayı ekranda artikeliyle birlikte görebilirsin.") },
          { suf: "-ma", stats: stats(["ma"], { hit: 11, all: 12 }), examples: ["das Thema", "das Komma", "das Klima", "das Trauma"].map(art), say: L("defne", "tr", "Bu sonla biten isimlerin çoğu das alıyor. Şirket anlamındaki istisna kelimeyi ekranda artikeliyle birlikte görüyorsun.") },
        ],
      },
      {
        title: "der alanlar",
        sub: "Kişiler ve akımlar",
        say: L("defne", "tr", "Son olarak der alanlar."),
        rules: [
          { suf: "-ling", stats: stats(["ling"], { hit: 7, all: 7 }), examples: ["der Zwilling", "der Frühling", "der Lehrling", "der Flüchtling"].map(art), say: L("defne", "tr", "Sözlüğümüzde bu sonla biten isimlerin hepsi der alıyor.") },
          { suf: "-ismus", stats: stats(["ismus"], { hit: 29, all: 29 }), examples: ["der Tourismus", "der Organismus"].map(art), say: L("defne", "tr", "Sözlüğümüzde bu sonla biten isimlerin hepsi der alıyor. Turizm ve benzer kavramlarda bu sonla karşılaşabilirsin.") },
          { suf: "-or", stats: stats(["or"], { hit: 20, all: 21 }), examples: ["der Doktor", "der Motor", "der Direktor", "der Autor", "der Humor", "der Monitor"].map(art), say: L("defne", "tr", "Bu sonla biten isimlerin çoğu der alıyor. Örneklerdeki meslek adlarına ve nesnelere bak.") },
        ],
      },
    ],
    trap: {
      after: "-chen",
      lab: "Tuzak · 18 kelimenin 3'ü",
      title: "Tuzak: -chen ama das değil",
      words: ["der Kuchen", "der Knochen", "die Fundsachen"].map(art),
      rule: "Burada **-chen** ek değil, kelimenin parçası. Küçültme eki **-chen** → hep das.",
      say: L("defne", "tr", "Bu üç kelimede son, küçültme eki değil; kelimenin kendisi. Küçültme ekiyse her zaman das."),
    },
    compound: {
      title: "Bileşik isimler",
      lab: "Bonus · bileşik isimler",
      sub: "Son kelime belirler",
      say: L("defne", "tr", "Bir başka yararlı ipucu: bileşik isimlerde artikeli neredeyse her zaman son kelime belirler. Ev das, kapı die; ev kapısı da die olur."),
      items: [
        { last: art("das Haus"), whole: art("das Krankenhaus") },
        { first: art("das Haus"), last: art("die Tür"), whole: art("die Haustür") },
        { last: art("der Tag"), whole: art("der Geburtstag") },
        { last: art("die Karte"), whole: art("die Fahrkarte") },
        { last: art("der Arzt"), whole: art("der Zahnarzt") },
        { first: art("die Tasche"), last: art("das Geld"), whole: art("das Taschengeld") },
        { first: art("die Hand"), last: art("der Schuh"), whole: art("der Handschuh") },
        { last: art("die Stadt"), whole: art("die Hauptstadt") },
      ],
    },
    speed: {
      sub: "Sonuna bak, artikeli söyle",
      say: L("defne", "tr", "Hız turu. Kelimenin sonuna bak ve artikeli iki saniye içinde yüksek sesle söyle."),
      words: ["die Zeitung", "die Freiheit", "die Möglichkeit", "die Freundschaft", "die Tradition", "die Realität", "die Politik", "die Energie", "die Lösung", "die Theorie", "das Dokument", "der Professor", "der Lehrling", "die Achtung", "das Argument", "die Gewohnheit", "die Führung", "die Sicherheit", "die Gemeinschaft", "die Station", "die Statistik", "die Studie", "der Korridor", "der Faktor"].map(art),
    },
    app: {
      lab: "Lernomi'de",
      title: "Her kelimenin artikeli renkli.",
      body: "der mavi, die kırmızı, das yeşil. Kelime turunda renk aklında kalır; yanlış yaptığın kelime tekrar karşına gelir.",
      where: "Kelime turu",
      link: "Bağlantı açıklamada",
      panel: { rows: [["der", "Frühling", "ilkbahar"], ["die", "Wohnung", "daire"], ["das", "Brötchen", "küçük ekmek"]], next: "Sıradaki kelime", note: "Yanlışlar tekrar gelir" },
      say: L("defne", "tr", "Bu kelimelerin hepsi Lernomi'de, artikelleri renkli. Yanlış yaptığın kelime tekrar karşına gelir. Bağlantı açıklamada."),
    },
    end: {
      lab: "Sıradaki",
      line: "Hangi kuralı bilmiyordun?",
      ask: "Önerini yorumlara yaz.",
      sub: "Her salı ve cuma yeni video",
      slot: "Sıradaki video",
      say: L("defne", "tr", "Hangi kuralı bilmiyordun? Çalışmak istediğin konuyu yorumlara yaz."),
    },
    cover: { line: "sonundan artikel: 14 kural" },
    yt: {
      desc: "Almanca isimlerin sonundan artikel tahmini yapmaya yardımcı 14 ipucunu çalış. Örnekleri ve istisnaları artikelleriyle karşılaştır; ekrandaki oranlar Lernomi sözlüğündeki kelimelere ait, bütün Almancayı temsil etmiyor. Bileşik isimlerin artikelini de inceleyip 24 kelimelik hız turuyla tekrar et. Bu ders ekrana bakarak çalışmak için hazırlandı. Hangi ipucu senin için yeniydi?",
      tags: "#almanca #almancaartikel #derdiedas #almancaöğren",
    },
    ui: { cardNote: "Almanca alıştırması" },
  }),
};
export default episode;
