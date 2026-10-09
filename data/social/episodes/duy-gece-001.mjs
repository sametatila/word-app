/* Tek harf, bambaşka anlam: schon/schön, drucken/drücken, zahlen/zählen, sagen/sägen. */
const episode = {
  template: "duy-gece",
  status: "hazır",
  created: "2026-10-08",
  slot: "2026-10-17 18:30",
  content: ({ pair }) => ({
    rounds: [pair("schon", "schön", 1), pair("drucken", "drücken", 0), pair("zahlen", "zählen", 1), pair("sagen", "sägen", 1)],
    copy: {
      title: "Kulaklığını tak: tek harf",
      hook: ["Kulaklığını tak.", "Tek harf, bambaşka anlam."],
      recap: "Kaç tanesini bildin?",
      caption: "Kulaklığını tak: tek harf fark, bambaşka anlam. Dördünü de kulağınla ayırt edebildin mi?\n\n#almanca #almancaöğreniyorum #deutschlernen #telaffuz #almancakelimeler #dinleme",
      outro: { series: "Yarın yeni çiftler geliyor", ask: "Hangisinde yanıldın? Yorumlara yaz." },
    },
  }),
};

export default episode;
