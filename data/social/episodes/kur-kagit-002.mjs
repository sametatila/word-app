/* Almanca kursunda 2 cümle. */
const episode = {
  template: "kur-kagit",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-21 12:30",
  content: ({ sentence }) => ({
    copy: {
      title: "Kursta 2 cümle, sen kur",
      scene: "Kursta",
      hook: ["Almanca kursunun ilk haftası.", "Bu 2 cümleyi", "sen kur."],
      caption: "Almanca kursunun ilk haftasında lazım olan 2 cümle. Türkçesini gördün, Almancasını sen dizebildin mi?\n\n#almanca #almancaöğreniyorum #deutschlernen #almancakursu #almancacümle #almanyadayaşam",
      outro: { series: "Yeni cümleler yakında", ask: "Hangisinde takıldın? Yorumlara yaz." },
    },
    lines: [
      sentence("sich anmelden", [1, 6], "melde … an: an en sona gider"),
      sentence("viel", [2], "Çoğul isimle viel, viele olur"),
    ],
  }),
};

export default episode;
