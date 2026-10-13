/* Yürürken Almanca 1: doktorda lazım olan 50 kelime (beş konu × 10). Kelime, Türkçe ve örnek cümle words.json'dan;
   sesler hazır (Defne Türkçe, Aras Almanca). Yeni seslendirme yalnız Türkçe anlatım satırları (Defne). */
const episode = {
  template: "yuru",
  status: "taslak",
  created: "2026-10-13",
  slot: "2026-10-16 19:00",
  ytTitle: "Doktorda lazım olan 50 Almanca kelime: dinle, söyle, tekrar et",
  content: ({ L, walk }) => ({
    series: "Yürürken Almanca",
    ep: "Doktorda",
    hook: {
      lab: "Kulaklığını tak, yürürken dinle",
      lines: ["Doktorda", "Almanca"],
      sub: "50 kelime, her biri örnek cümleyle.",
      pills: ["Dinle", "Söyle", "Tekrar et"],
      stops: ["der Termin", "die Kopfschmerzen", "die Apotheke"],
      say: L("defne", "tr", "Doktorda en çok lazım olan elli Almanca kelime. Ben Türkçesini söyleyeceğim, sen Almancasını yüksek sesle söyle."),
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
        title: "Randevu ve muayenehane",
        sub: "Doktora gitmeden önce lazım olanlar",
        say: L("defne", "tr", "İlk konu randevu ve muayenehane. Doktora gitmeden önce lazım olan on kelime."),
        words: ["der Termin", "die Sprechstunde", "die Praxis", "die Versichertenkarte", "die Krankenkasse", "ausfüllen", "der Arzt", "die Ärztin", "der Zahnarzt", "der Augenarzt"].map((w) => walk(w)),
      },
      {
        title: "Şikâyetler: ağrılar, belirtiler",
        sub: "Doktora derdini anlatmak için",
        say: L("defne", "tr", "İkinci konu şikâyetler. Doktor ilk önce nerenin ağrıdığını sorar."),
        words: ["wehtun", "der Schmerz", "die Kopfschmerzen", "die Halsschmerzen", "die Rückenschmerzen", "die Zahnschmerzen", "das Fieber", "der Husten", "der Schnupfen", "schwindlig"].map((w) => walk(w)),
      },
      {
        title: "Muayene ve tedavi",
        sub: "Muayene odasında duyacakların",
        say: L("defne", "tr", "Üçüncü konu muayene ve tedavi. Bunları muayene odasında duyacaksın."),
        words: ["die Untersuchung", "das Blut", "die Blutprobe", "röntgen", "die Behandlung", "impfen", "die Spritze", "die Operation", "die Wunde", "das Pflaster"].map((w) => walk(w)),
      },
      {
        title: "Reçete ve eczane",
        sub: "İlacını alırken",
        say: L("defne", "tr", "Dördüncü konu reçete ve eczane. Doktordan çıktın, şimdi ilacını alıyorsun."),
        words: ["verschreiben", "die Apotheke", "der Apotheker", "das Medikament", "die Tablette", "das Schmerzmittel", "einnehmen", "die Dosis", "rezeptfrei", "die Salbe"].map((w) => walk(w)),
      },
      {
        title: "Hastalık bildirimi ve acil durum",
        sub: "İşe gidemediğinde, acilde",
        say: L("defne", "tr", "Son konu hastalık bildirimi ve acil durum. İşe gidemediğin gün ve acil serviste lazım olanlar."),
        words: ["krank", "erkältet sein", "die Krankmeldung", "allergisch", "der Notfall", "der Notruf", "der Krankenwagen", "die Notaufnahme", "das Krankenhaus", "sich erholen"].map((w) => walk(w)),
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
      panel: { tr: "Türkçesi: diş hekimi", de: "der Zahnarzt", ok: "Doğru söyledin" },
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
    cover: { lab: "Dinle · söyle · tekrar et", lines: ["Doktorda", "Almanca"], pill: "50 kelime · örnek cümleyle", words: ["der Termin", "verschreiben"] },
    yt: {
      desc: "Doktorda lazım olan 50 Almanca kelime, Türkçesi ve örnek cümlesiyle: randevu, şikâyetler, muayene, reçete ve acil durum. Defne Türkçesini söylüyor, sen Almancasını söylüyorsun, sonra doğrusunu ve örnek cümleyi dinliyorsun. Ekrana bakmadan, yürürken de çalışır.",
      tags: "#almanca #almancaöğren #almancakelimeler #doktorda",
    },
    ui: {},
  }),
};
export default episode;
