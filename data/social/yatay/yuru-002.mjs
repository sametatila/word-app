/* Yürürken Almanca 2: evde ve kirada lazım olan 50 kelime (beş konu × 10). Kelime, Türkçe ve örnek cümle words.json'dan;
   sesler hazır (Defne Türkçe, Aras Almanca). Yeni seslendirme yalnız Türkçe anlatım satırları (Defne). */
const episode = {
  template: "yuru",
  status: "taslak",
  created: "2026-10-14",
  slot: "2026-10-30 19:00",
  ytTitle: "Ev ararken ve kirada lazım olan 50 Almanca kelime: dinle, söyle, tekrar et",
  content: ({ L, walk }) => ({
    series: "Yürürken Almanca",
    ep: "Ev ve kira",
    hook: {
      lab: "Kulaklığını tak, yürürken dinle",
      lines: ["Evde ve kirada", "Almanca"],
      sub: "50 kelime, her biri örnek cümleyle.",
      pills: ["Dinle", "Söyle", "Tekrar et"],
      stops: ["die Wohnung", "der Umzug", "die Heizung"],
      say: L("defne", "tr", "Almanya'da ev ararken, taşınırken ve evde lazım olan elli Almanca kelime. Ben Türkçesini söyleyeceğim, sen Almancasını yüksek sesle söyle."),
    },
    how: {
      steps: [
        ["Türkçesini duy", "Defne kelimeyi Türkçe söyler."],
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
        say: L("defne", "tr", "Son konu komşular ve ev düzeni. Apartmanda en çok konuşulan konular bunlar."),
        words: ["der Nachbar", "die Nachbarin", "ruhig", "die Ruhe", "der Müll", "die Mülltonne", "das Treppenhaus", "der Briefkasten", "die Klingel", "lüften"].map((w) => walk(w)),
      },
    ],
    review: {
      say: L("defne", "tr", "Hızlı tekrar. Bu sefer es yok: Türkçesini duyunca Almancasını hemen söyle."),
    },
    app: {
      lab: "Lernomi'de",
      title: "Aynı tur, ekran kapalıyken.",
      body: "Telefon cebinde, kulaklık takılı. Kelimeyi sen söylersin, Lernomi dinler; doğruysa sıradakine geçer.",
      where: "Yürüyüş modu · 4/12",
      link: "Bağlantı açıklamada",
      panel: { tr: "Türkçesi: kira", de: "die Miete", ok: "Doğru söyledin" },
      say: L("defne", "tr", "Bu turun aynısı Lernomi'de yürüyüş modunda var. Ekran kapalıyken de çalışır ve söylediğini dinler. Bağlantı açıklamada."),
    },
    end: {
      lab: "Sıradaki",
      line: "Kaç tanesini ilk seferde söyledin?",
      ask: "Yorumlara yaz; bir sonraki konuyu da sen seç.",
      sub: "Her salı ve cuma yeni video",
      slot: "Sıradaki video",
      say: L("defne", "tr", "Kaç tanesini ilk seferde söyledin? Yorumlara yaz; bir sonraki konuyu da sen seç."),
    },
    cover: { lab: "Dinle · söyle · tekrar et", lines: ["Ev ve kira", "Almanca"], pill: "50 kelime · örnek cümleyle", words: ["die Miete", "der Vermieter"] },
    yt: {
      desc: "Almanya'da ev ararken, kiralarken ve evde lazım olan 50 Almanca kelime, Türkçesi ve örnek cümlesiyle: ilan, sözleşme, taşınma, odalar, arıza ve komşular. Defne Türkçesini söylüyor, sen Almancasını söylüyorsun, sonra doğrusunu ve örnek cümleyi dinliyorsun. Ekrana bakmadan, yürürken de çalışır.",
      tags: "#almanca #almancaöğren #almancakelimeler #almanyadaev",
    },
    ui: {},
  }),
};
export default episode;
