/* Resmî daireye gitmeden önce 5 kelime. */
const episode = {
  template: "kelime-kagit",
  status: "hazır",
  created: "2026-10-08",
  content: ({ deck }) => ({
    items: deck(["das Amt", "das Anmeldeformular", "die Unterlagen", "das Original", "die Frist"]),
    copy: {
      title: "Resmî daire, 5 kelime",
      hook: ["Resmî daireye gitmeden önce", "bu 5 kelimeyi", "öğren."],
      caption: "Resmî daireye gitmeden önce bu 5 kelimeyi öğren: daire, form, belgeler, asıl nüsha, son tarih. Kaydet, dairede lazım olacak.\n\n#almanca #almanyadayaşam #bürokrasi #deutschlernen #almancakelimeler #bürgeramt",
      outro: { series: "Her hafta yeni bir resmî iş", ask: "Sen en çok hangisiyle uğraştın?" },
      runningHead: "RESMÎ İŞLER",
      summaryKicker: "Kaydet, dairede lazım olacak",
      summaryTitle: "5 kelimelik mini sözlük",
    },
  }),
};

export default episode;
