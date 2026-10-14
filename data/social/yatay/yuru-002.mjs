/* Yürürken Almanca 2: evde ve kirada lazım olan 50 kelime (beş konu × 10). Kelime, Türkçe ve örnek cümle words.json'dan;
   sesler hazır (Defne Türkçe, Aras Almanca). Yeni seslendirme yalnız Türkçe anlatım satırları (Defne). */
const episode = {
  template: "yuru",
  status: "taslak",
  created: "2026-10-14",
  slot: "2026-10-28 19:00",
  ytTitle: "Ev ve kira için 50 Almanca kelime: dinle ve söyle | Yürürken Almanca 2",
  content: ({ L, walk }) => ({
    // Samet: uzun videolarda ses/video üretimi beklesin (2026-10-14).
    narrationPaused: true,
    series: "Yürürken Almanca",
    ep: "Ev ve kira",
    hook: {
      lab: "Kulaklığını tak, yürürken dinle",
      lines: ["Ev ve kira için", "Almanca"],
      sub: "50 kelime, her biri örnek cümleyle.",
      pills: ["Dinle", "Söyle", "Tekrar et"],
      stops: ["die Wohnung", "der Umzug", "die Heizung"],
      say: L("defne", "tr", "Almanya'da ev ararken, taşınırken ve evde lazım olan elli Almanca kelime. Ben Türkçesini söyleyeceğim, sen Almancasını yüksek sesle söyle."),
    },
    how: {
      steps: [
        ["Türkçesini duy", "Kelimenin Türkçesini duyacaksın."],
        ["Almancasını söyle", "Üç saniyen var, yüksek sesle söyle."],
        ["Doğrusunu dinle", "Kelimenin kendisi ve örnek bir cümle."],
      ],
      say: L("defne", "tr", "Önce Türkçesini duyacaksın. Üç saniye içinde Almancasını sen söyle. Sonra doğrusunu ve bir örnek cümleyi dinle. Yürürken, yolda ya da mutfakta da olur."),
    },
    sections: [
      {
        title: "Ev ararken",
        sub: "İlanlar ve ev sahibiyle ilk konuşma",
        say: L("defne", "tr", "İlk konu ev aramak. İlanlarda ve ev sahibiyle ilk konuşmada duyacağın on kelime."),
        words: ["die Wohnungssuche", "die Anzeige", "die Wohnung", "das Apartment", "die WG", "möbliert", "der Quadratmeter", "die Miete", "mieten", "der Vermieter"].map((w) => walk(w)),
      },
      {
        title: "Sözleşme ve taşınma",
        sub: "İmza, anahtar, adres kaydı",
        say: L("defne", "tr", "İkinci konu sözleşme ve taşınma. İmzadan anahtara kadar lazım olanlar."),
        words: ["der Mieter", "der Vertrag", "unterschreiben", "die Unterschrift", "der Umzug", "umziehen", "einziehen", "ausziehen", "die Meldebescheinigung", "der Schlüssel"].map((w) => walk(w)),
      },
      {
        title: "Odalar ve bina",
        sub: "Evin içi ve apartman",
        say: L("defne", "tr", "Üçüncü konu odalar ve bina. Evi tarif ederken bu kelimeleri kullanacaksın."),
        words: ["das Wohnzimmer", "das Schlafzimmer", "die Küche", "das Bad", "der Flur", "der Balkon", "der Keller", "das Erdgeschoss", "der Stock", "der Aufzug"].map((w) => walk(w)),
      },
      {
        title: "Bir şey bozulunca",
        sub: "Kalorifer, musluk, usta",
        say: L("defne", "tr", "Dördüncü konu: evde bir şey bozulunca. Ev sahibine ya da kapıcıya derdini anlatmak için."),
        words: ["die Heizung", "der Heizkörper", "der Wasserhahn", "das Waschbecken", "reparieren", "die Reparatur", "der Handwerker", "der Klempner", "der Elektriker", "der Hausmeister"].map((w) => walk(w)),
      },
      {
        title: "Komşular ve ev düzeni",
        sub: "Sessizlik, çöp, merdiven boşluğu",
        say: L("defne", "tr", "Son konu komşular ve ev düzeni. Sessizlik, çöp ve apartmandaki günlük işler."),
        words: ["der Nachbar", "die Nachbarin", "ruhig", "die Ruhe", "der Müll", "die Mülltonne", "das Treppenhaus", "der Briefkasten", "die Klingel", "lüften"].map((w) => walk(w)),
      },
    ],
    review: {
      say: L("defne", "tr", "Hızlı tekrar. Bu sefer beklemeden devam ediyoruz: Türkçesini duyunca Almancasını hemen söyle."),
    },
    app: {
      lab: "Lernomi'de",
      title: "Ekran kapalıyken de çalış.",
      body: "Telefon cebinde, kulaklık takılı. Kelimeyi sen söylersin, Lernomi dinler; doğruysa sıradakine geçer.",
      where: "Yürüyüş modu · 4/12",
      link: "Bağlantı açıklamada",
      panel: { tr: "Türkçesi: kira", de: "die Miete", ok: "Doğru söyledin" },
      say: L("defne", "tr", "Lernomi'nin yürüyüş modunda da Türkçesini duyup Almancasını söyleyebilirsin. Ekran kapalıyken de çalışır ve söylediğini dinler. Bağlantı açıklamada."),
    },
    end: {
      lab: "Sıradaki",
      line: "Ev ararken hangi kelime işine yaradı?",
      ask: "Yorumlara yaz; çalışmak istediğin konuyu da yaz.",
      sub: "Her çarşamba ve cumartesi yeni video",
      slot: "Sıradaki video",
      say: L("defne", "tr", "Ev ararken hangi kelime işine yaradı? Yorumlara yaz; çalışmak istediğin konuyu da yaz."),
    },
    cover: { lab: "Dinle · söyle · tekrar et", lines: ["Ev ve kira", "Almanca"], pill: "50 kelime · örnek cümleyle", words: ["die Miete", "der Vermieter"] },
    yt: {
      desc: "Ev ararken, taşınırken ve evde kullanabileceğin 50 Almanca kelimeyi Türkçesi ve örnek cümlesiyle çalış. Türkçesini duyunca Almancasını söyle; üç saniye sonra doğru kelimeyi ve örnek cümleyi dinle. İlanlar, sözleşme, taşınma, odalar, arızalar ve komşularla ilgili kelimeler var. Ekrana bakmadan da tekrar edebilirsin. Ev ararken hangi kelime işine yaradı?",
      tags: "#almanca #almancaöğren #almancakelimeler #almanyadaev",
    },
    ui: { cardNote: "Almanca alıştırması" },
  }),
};
export default episode;
