/* Ev ilanında göreceğin 3 kelime. */
const episode = {
  template: "kelime-lacivert",
  status: "hazır",
  created: "2026-10-08",
  slot: "2026-10-14 12:30",
  content: ({ deck }) => ({
    items: deck(["möbliert", "die WG", "die Kaution"]),
    copy: {
      title: "Ev ilanında 3 kelime",
      hook: ["Almanya'da ev ararken", "ilanda bu 3 kelimeyi", "mutlaka göreceksin."],
      caption: "Almanya'da ev ararken ilanda bu 3 kelimeyi mutlaka göreceksin: eşyalı, paylaşımlı ev, depozito. Kaydet, ev bakarken lazım olacak.\n\n#almanca #almanyadayaşam #evarıyorum #deutschlernen #wohnung #almancakelimeler",
      outro: { series: "Yarın 3 kelime daha", ask: "En çok hangisi işine yarayacak? Yorumlara yaz." },
      cardLabel: "ANZEIGE",
      summaryKicker: "Kaydet, ev bakarken lazım olacak",
      summaryTitle: "İlandaki 3 kelime",
    },
  }),
};

export default episode;
