/* Tek harf, bambaşka anlam: schon/schön, drucken/drücken, zahlen/zählen, sagen/sägen. */
const episode = {
  template: "duy-gece",
  status: "hazır",
  created: "2026-10-08",
  slot: "2026-10-17 18:30",
  ytTitle: "Schon mu, schön mü? Almanca umlaut dinleme testi #almanca #shorts",
  content: ({ pair }) => ({
    rounds: [pair("schon", "schön", 1), pair("drucken", "drücken", 0), pair("zahlen", "zählen", 1), pair("sagen", "sägen", 1)],
    copy: {
      title: "Schon mu, schön mü?",
      hook: ["Schon mu, schön mü?", "İki nokta, farklı anlam."],
      recap: "Kaç tanesini bildin?",
      caption: "Almanca umlaut dinleme testi: schon/schön, drucken/drücken, zahlen/zählen, sagen/sägen. Schon ile schön'ü ayırt edebildin mi?\n\n#almanca #almancaöğreniyorum #deutschlernen #telaffuz #almancakelimeler #dinleme",
      outro: { series: "Almanca dinleme alıştırmaları", ask: "Schon ile schön'ü ayırt edebildin mi?" },
    },
  }),
};

export default episode;
