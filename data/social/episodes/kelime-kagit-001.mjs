/* Resmî daireye gitmeden önce 3 kelime. */
const episode = {
  template: "kelime-kagit",
  status: "hazır",
  created: "2026-10-08",
  slot: "2026-10-12 12:30",
  content: ({ deck }) => ({
    items: deck(["das Anmeldeformular", "die Unterlagen", "die Frist"]),
    copy: {
      title: "Resmî daire, 3 kelime",
      hook: ["Resmî daireye gitmeden önce", "bu 3 kelimeyi", "öğren."],
      caption: "Resmî daireye gitmeden önce bu 3 kelimeyi öğren: kayıt formu, belgeler, son tarih. Kaydet, dairede lazım olacak.\n\n#almanca #almanyadayaşam #bürokrasi #deutschlernen #almancakelimeler #bürgeramt",
      outro: { series: "Her hafta yeni bir resmî iş", ask: "Sen en çok hangisiyle uğraştın?" },
      runningHead: "RESMÎ İŞLER",
      summaryKicker: "Kaydet, dairede lazım olacak",
      summaryTitle: "3 kelimelik mini sözlük",
    },
  }),
};

export default episode;
