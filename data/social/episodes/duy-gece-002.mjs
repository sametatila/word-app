/* A mı, e mi: dann/denn, wann/wenn, fallen/fällen (ä, e gibi okunur). */
const episode = {
  template: "duy-gece",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-21 18:30",
  ytTitle: "Dann mı, denn mi? Almancada benzer sesleri ayırt et #almanca #shorts",
  content: ({ pair }) => ({
    rounds: [pair("dann", "denn", 0), pair("wann", "wenn", 1), pair("fallen", "fällen", 1)],
    copy: {
      title: "A mı, e mi?",
      hook: ["A mı, e mi?", "Dinle, hangisi olduğunu bul."],
      recap: "Kaç tanesini bildin?",
      caption: "Almanca dinleme testi: dann/denn, wann/wenn, fallen/fällen. Benzer ünlüleri dinle, duyduğun kelimeyi seç. Dann mı, denn mi? Hangisinde zorlandın?\n\n#almanca #almancaöğreniyorum #deutschlernen #telaffuz #almancakelimeler #dinleme",
      outro: { series: "Almanca dinleme alıştırmaları", ask: "Dann mı, denn mi? Hangisinde zorlandın?" },
    },
  }),
};

export default episode;
