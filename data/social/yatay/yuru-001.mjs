/* Yürürken Almanca 1: doktorda lazım olan 50 kelime (beş konu × 10). Kelime, Türkçe ve örnek cümle words.json'dan.
   Sesler: Türkçe anlatım ve kelimelerin Türkçesi Ahu (ElevenLabs anlatıcı, öğretmen tonu; 2026-10-14 Samet), Almanca
   kelime ve örnek cümleler Aras (uygulamanın sesi). Ahu'nun satırları işçide kendiliğinden üretilir. */
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
      say: L("ahu", "tr", "Merhaba! Bugün doktorda en çok lazım olan elli Almanca kelimeyi çalışıyoruz. Ben sana Türkçesini söyleyeceğim, sen de Almancasını yüksek sesle söyleyeceksin."),
    },
    how: {
      steps: [
        ["Türkçesini duy", "Kelimenin Türkçesini söylerim."],
        ["Almancasını söyle", "Üç saniyen var, yüksek sesle söyle."],
        ["Doğrusunu dinle", "Kelimenin kendisi ve örnek bir cümle."],
      ],
      say: L("ahu", "tr", "Nasıl çalışacağımızı anlatayım. Önce kelimenin Türkçesini duyacaksın. Üç saniyen var; Almancasını sen söyle. Sonra doğrusunu ve bir örnek cümleyi dinle. Bunu yürürken, yolda, hatta mutfakta bile yapabilirsin."),
    },
    sections: [
      {
        title: "Randevu ve muayenehane",
        sub: "Doktora gitmeden önce lazım olanlar",
        say: L("ahu", "tr", "İlk konumuz randevu ve muayenehane. Doktora gitmeden önce lazım olan on kelimeyle başlıyoruz."),
        words: ["der Termin", "die Sprechstunde", "die Praxis", "die Versichertenkarte", "die Krankenkasse", "ausfüllen", "der Arzt", "die Ärztin", "der Zahnarzt", "der Augenarzt"].map((w) => walk(w, { tr: "ahu" })),
      },
      {
        title: "Şikâyetler: ağrılar, belirtiler",
        sub: "Doktora derdini anlatmak için",
        say: L("ahu", "tr", "Güzel. İkinci konumuz şikâyetler. Doktor ilk olarak nerenin ağrıdığını sorar; bu kelimeler tam bunun için."),
        words: ["wehtun", "der Schmerz", "die Kopfschmerzen", "die Halsschmerzen", "die Rückenschmerzen", "die Zahnschmerzen", "das Fieber", "der Husten", "der Schnupfen", "schwindlig"].map((w) => walk(w, { tr: "ahu" })),
      },
      {
        title: "Muayene ve tedavi",
        sub: "Muayene odasında duyacakların",
        say: L("ahu", "tr", "Üçüncü konumuz muayene ve tedavi. Bunları muayene odasında doktordan duyacaksın."),
        words: ["die Untersuchung", "das Blut", "die Blutprobe", "röntgen", "die Behandlung", "impfen", "die Spritze", "die Operation", "die Wunde", "das Pflaster"].map((w) => walk(w, { tr: "ahu" })),
      },
      {
        title: "Reçete ve eczane",
        sub: "İlacını alırken",
        say: L("ahu", "tr", "Dördüncü konumuz reçete ve eczane. Doktordan çıktın, şimdi ilacını almaya gidiyorsun."),
        words: ["verschreiben", "die Apotheke", "der Apotheker", "das Medikament", "die Tablette", "das Schmerzmittel", "einnehmen", "die Dosis", "rezeptfrei", "die Salbe"].map((w) => walk(w, { tr: "ahu" })),
      },
      {
        title: "Hastalık bildirimi ve acil durum",
        sub: "İşe gidemediğinde, acilde",
        say: L("ahu", "tr", "Ve son konumuz: hastalık bildirimi ve acil durum. İşe gidemediğin gün ya da acil serviste bunlar lazım olacak."),
        words: ["krank", "erkältet sein", "die Krankmeldung", "allergisch", "der Notfall", "der Notruf", "der Krankenwagen", "die Notaufnahme", "das Krankenhaus", "sich erholen"].map((w) => walk(w, { tr: "ahu" })),
      },
    ],
    review: {
      say: L("ahu", "tr", "Şimdi hızlı bir tekrar yapalım. Bu sefer bekleme yok; Türkçesini duyar duymaz Almancasını söyle."),
    },
    app: {
      lab: "Lernomi'de",
      title: "Aynı tur, ekran kapalıyken.",
      body: "Telefon cebinde, kulaklık takılı. Kelimeyi sen söylersin, Lernomi dinler; doğruysa sıradakine geçer.",
      where: "Yürüyüş modu · 4/12",
      link: "Bağlantı açıklamada",
      panel: { tr: "Türkçesi: diş hekimi", de: "der Zahnarzt", ok: "Doğru söyledin" },
      say: L("ahu", "tr", "Bu turun aynısı Lernomi'nin yürüyüş modunda var. Ekran kapalıyken de çalışıyor ve söylediğini dinliyor. Bağlantıyı açıklamaya koydum."),
    },
    end: {
      lab: "Sıradaki",
      line: "Kaç tanesini ilk seferde söyledin?",
      ask: "Yorumlara yaz; bir sonraki konuyu da sen seç.",
      sub: "Her salı ve cuma yeni video",
      slot: "Sıradaki video",
      say: L("ahu", "tr", "Peki, kaç tanesini ilk seferde söyleyebildin? Yorumlara yaz; bir sonraki konuyu da sen seç. Görüşmek üzere!"),
    },
    cover: { lab: "Dinle · söyle · tekrar et", lines: ["Doktorda", "Almanca"], pill: "50 kelime · örnek cümleyle", words: ["der Termin", "verschreiben"] },
    yt: {
      desc: "Doktorda lazım olan 50 Almanca kelime, Türkçesi ve örnek cümlesiyle: randevu, şikâyetler, muayene, reçete ve acil durum. Türkçesini duyuyorsun, Almancasını sen söylüyorsun, sonra doğrusunu ve örnek cümleyi dinliyorsun. Ekrana bakmadan, yürürken de çalışır.",
      tags: "#almanca #almancaöğren #almancakelimeler #doktorda",
    },
    ui: {},
  }),
};
export default episode;
