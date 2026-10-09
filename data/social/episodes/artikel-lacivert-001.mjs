/* İki kural: -heit/-keit → die, -ling → der. */
const episode = {
  template: "artikel-lacivert",
  status: "hazır",
  created: "2026-10-08",
  slot: "2026-10-17 07:30",
  content: ({ quiz }) => ({
    items: quiz(["die Freiheit", "der Frühling", "die Pünktlichkeit", "der Zwilling"], {
      Freiheit: { stem: "Frei", sfx: "heit" },
      Frühling: { stem: "Früh", sfx: "ling" },
      Pünktlichkeit: { stem: "Pünktlich", sfx: "keit" },
      Zwilling: { stem: "Zwil", sfx: "ling" },
    }),
    copy: {
      title: "İki kural, dört kelime",
      hook: ["Bu iki kuralı bilen", "artikelde yanılmaz."],
      pill: "Kartı doğru kutuya at",
      rules: [
        { label: "-heit · -keit", sfx: ["heit", "keit"], artikel: "die" },
        { label: "-ling", sfx: ["ling"], artikel: "der" },
      ],
      endKicker: "Aklında kalsın",
      outro: { series: "Yarın yeni bir kural geliyor", ask: "Başka örnek biliyor musun? Yorumlara yaz." },
      caption: "Bu iki kuralı bilen artikelde yanılmaz: -heit ve -keit hep die, -ling hep der. Başka örnek biliyor musun?\n\n#almanca #artikel #derdiedas #deutschlernen #almancaöğreniyorum #almancagramer",
    },
  }),
};

export default episode;
