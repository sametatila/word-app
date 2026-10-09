/* Doktora gitmeden önce 3 kelime. */
const episode = {
  template: "kelime-kagit",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-23 12:30",
  content: ({ deck }) => ({
    items: deck(["der Augenarzt", "der Patient", "das Schmerzmittel"]),
    copy: {
      title: "Doktorda 3 kelime",
      hook: ["Doktora gitmeden önce", "bu 3 kelimeyi", "öğren."],
      caption: "Almanya'da doktora gitmeden önce bu 3 kelimeyi öğren: göz doktoru, hasta, ağrı kesici. Kaydet, randevuda lazım olacak.\n\n#almanca #almanyadayaşam #doktor #deutschlernen #almancakelimeler #arzt",
      outro: { series: "Her hafta yeni bir resmî iş", ask: "Randevu için en uzun kaç hafta bekledin?" },
      runningHead: "DOKTORDA",
      summaryKicker: "Kaydet, randevuda lazım olacak",
      summaryTitle: "3 kelimelik mini sözlük",
    },
  }),
};

export default episode;
