/* Doktora gitmeden önce 3 kelime. */
const episode = {
  template: "kelime-kagit",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-23 12:30",
  ytTitle: "Doktorda kullanılan 3 Almanca kelime: göz doktoru, hasta, ağrı kesici #almanca #shorts",
  content: ({ deck }) => ({
    items: deck(["der Augenarzt", "der Patient", "das Schmerzmittel"]),
    copy: {
      title: "Doktorda 3 kelime",
      hook: ["Doktora gitmeden önce", "bu 3 kelimeyi", "öğren."],
      caption: "Doktorda kullanılan üç Almanca kelime: Augenarzt göz doktoru, Patient hasta, Schmerzmittel ağrı kesici. Kaydet, doktor randevusundan önce tekrar et.\n\n#almanca #almancakonuşma #doktor #deutschlernen #almancakelimeler #arzt",
      outro: { series: "Doktorda Almanca", ask: "Kaydet, doktor randevusundan önce tekrar et" },
      runningHead: "DOKTORDA",
      summaryKicker: "Kaydet, randevuda lazım olacak",
      summaryTitle: "3 kelimelik mini sözlük",
    },
  }),
};

export default episode;
