/* Yolda 3 cümle. */
const episode = {
  template: "kur-turuncu",
  status: "hazır",
  created: "2026-10-08",
  slot: "2026-10-15 12:30",
  content: ({ sentence }) => ({
    copy: {
      title: "Yolda 3 cümle, treni kur",
      scene: "Yolda",
      hook: ["Otobüste, trende 3 cümle.", "Doğru sıraya", "dizebilir misin?"],
      caption: "Otobüste, trende lazım olan 3 cümle. Vagonları doğru sıraya dizebildin mi? Kaçını bildin, yaz.\n\n#almanca #almancaöğreniyorum #deutschlernen #almanyadayaşam #toplutaşıma #almancacümle",
      outro: { series: "Yarın 3 cümle daha", ask: "Hangi vagonda takıldın? Yorumlara yaz." },
    },
    lines: [
      sentence("wie viel", [0, 1, 2], "„Wie viel“ başta, fiil hemen arkasında"),
      sentence("einsteigen", [1, 5], "einsteigen ikiye ayrılır, ein en sona gider"),
      sentence("die U-Bahn", [2, 3, 4], "mit'ten sonra die, der olur"),
    ],
  }),
};

export default episode;
