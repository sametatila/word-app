/* Blume/Bluse, Münze/Mütze, fühlen/füllen, danken/denken. */
const episode = {
  template: "duy-turuncu",
  status: "hazır",
  created: "2026-10-08",
  slot: "2026-10-16 18:30",
  ytTitle: "Blume mi, Bluse mi? 4 çiftle Almanca dinleme testi #almanca #shorts",
  content: ({ pair }) => ({
    rounds: [pair("die Blume", "die Bluse", 1), pair("die Münze", "die Mütze", 0), pair("fühlen", "füllen", 1), pair("danken", "denken", 0)],
    copy: {
      title: "Blume mi, Bluse mi?",
      hook: ["Blume mi, Bluse mi?", "Duyduğun kelimeyi seç."],
      recap: "Kaç tanesini bildin?",
      caption: "Almanca dinleme testi: Blume/Bluse, Münze/Mütze, fühlen/füllen, danken/denken. Duyduğun kelimeyi seç. Blume mi, Bluse mi? Hangisini duydun?\n\n#almanca #almancaöğreniyorum #deutschlernen #telaffuz #almancakelimeler #almancakonuşma",
      outro: { series: "Almanca dinleme alıştırmaları", ask: "Blume mi, Bluse mi? Hangisini duydun?" },
    },
  }),
};

export default episode;
