/* E mi, i mi: schlecht/schlicht, Stelle/Stille, Wert/Wirt. */
const episode = {
  template: "duy-turuncu",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-20 18:30",
  ytTitle: "Stelle mi, Stille mi? Almanca e ve i dinleme testi #almanca #shorts",
  content: ({ pair }) => ({
    rounds: [pair("schlecht", "schlicht", 1), pair("die Stelle", "die Stille", 0), pair("der Wert", "der Wirt", 1)],
    copy: {
      title: "E mi, i mi?",
      hook: ["E mi, i mi?", "Stelle mi, Stille mi?"],
      recap: "Kaç tanesini bildin?",
      caption: "Almanca dinleme testi: schlecht/schlicht, Stelle/Stille, Wert/Wirt. Stelle pozisyon, Stille sessizlik. Stelle ile Stille'yi ayırt edebildin mi?\n\n#almanca #almancaöğreniyorum #deutschlernen #telaffuz #almancakelimeler #almancadinleme",
      outro: { series: "Almanca dinleme alıştırmaları", ask: "Stelle ile Stille'yi ayırt edebildin mi?" },
    },
  }),
};

export default episode;
