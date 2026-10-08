/* Ev ilanında göreceğin 5 kelime. */
const episode = {
  template: "kelime-lacivert",
  status: "hazır",
  created: "2026-10-08",
  content: ({ deck }) => ({
    items: deck(["die WG", "möbliert", "die Nebenkosten", "die Kaution", "das Haustier"]),
    copy: {
      title: "Ev ilanında 5 kelime",
      hook: ["Almanya'da ev ararken", "ilanda bu 5 kelimeyi", "mutlaka göreceksin."],
      caption: "Almanya'da ev ararken ilanda bu 5 kelimeyi mutlaka göreceksin. Kaydet, ev bakarken lazım olacak.\n\n#almanca #almanyadayaşam #evarıyorum #deutschlernen #wohnung #almancakelimeler",
      outro: { series: "Yarın 5 kelime daha", ask: "En çok hangisi işine yarayacak? Yorumlara yaz." },
      cardLabel: "ANZEIGE",
      summaryKicker: "Kaydet, ev bakarken lazım olacak",
      summaryTitle: "İlandaki 5 kelime",
    },
  }),
};

export default episode;
