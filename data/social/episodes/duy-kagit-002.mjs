/* Yuvarlak mı, düz mü: Kiste/Küste, spielen/spülen, fordern/fördern. */
const episode = {
  template: "duy-kagit",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-19 12:30",
  content: ({ pair }) => ({
    rounds: [pair("die Kiste", "die Küste", 1), pair("spielen", "spülen", 1), pair("fordern", "fördern", 0)],
    copy: {
      title: "Yuvarlak mı, düz mü?",
      hook: ["Yuvarlak mı, düz mü?", "Dudaklara dikkat."],
      pill: "Dudak yuvarlanınca anlam değişir.",
      recap: "Kaçını doğru duydun?",
      caption: "Yuvarlak mı, düz mü? Almancada dudakları yuvarlamak anlamı değiştiriyor: Kiste sandık, Küste sahil. Üçünü de duyabildin mi?\n\n#almanca #almancaöğreniyorum #deutschlernen #telaffuz #almancakelimeler #dinleme",
      outro: { series: "Yarın yeni çiftler geliyor", ask: "Hangisinde zorlandın? Yorumlara yaz." },
    },
  }),
};

export default episode;
