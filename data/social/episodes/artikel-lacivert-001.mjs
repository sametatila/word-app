/* İki kural: -heit/-keit → die, -ling → der. */
const episode = {
  template: "artikel-lacivert",
  status: "hazır",
  created: "2026-10-08",
  slot: "2026-10-17 07:30",
  ytTitle: "Almanca artikel için 2 ipucu: -heit, -keit ve -ling #almanca #shorts",
  content: ({ quiz }) => ({
    items: quiz(["die Freiheit", "der Frühling", "die Pünktlichkeit", "der Zwilling"], {
      Freiheit: { stem: "Frei", sfx: "heit" },
      Frühling: { stem: "Früh", sfx: "ling" },
      Pünktlichkeit: { stem: "Pünktlich", sfx: "keit" },
      Zwilling: { stem: "Zwil", sfx: "ling" },
    }),
    copy: {
      title: "İki kural, dört kelime",
      hook: ["-heit, -keit, -ling…", "Artikeli tahmin edebilir misin?"],
      pill: "Kartı doğru kutuya at",
      rules: [
        { label: "-heit · -keit", sfx: ["heit", "keit"], artikel: "die" },
        { label: "-ling", sfx: ["ling"], artikel: "der" },
      ],
      endKicker: "Aklında kalsın",
      outro: { series: "Almanca artikel alıştırmaları", ask: "Bildiğin bir -heit kelimesini yorumlara yaz" },
      caption: "Almanca artikel için iki ipucu: -heit ve -keit ekiyle oluşan isimler die, -ling ile biten bu örnekler der alıyor. Bildiğin bir -heit kelimesini yorumlara yaz.\n\n#almanca #artikel #derdiedas #deutschlernen #almancaöğreniyorum #almancagramer",
    },
  }),
};

export default episode;
