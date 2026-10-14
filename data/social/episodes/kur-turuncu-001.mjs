/* Yolda 3 cümle. */
const episode = {
  template: "kur-turuncu",
  status: "hazır",
  created: "2026-10-08",
  slot: "2026-10-15 12:30",
  ytTitle: "Otobüs ve metro için 3 Almanca cümleyi sen kur #almanca #shorts",
  content: ({ sentence }) => ({
    copy: {
      title: "Yolda 3 cümle, sen kur",
      scene: "Yolda",
      hook: ["Otobüste, trende 3 cümle.", "Doğru sıraya", "dizebilir misin?"],
      caption: "Toplu taşımada kullanılan üç Almanca cümle: bilet fiyatı, otobüse binmek ve metroyla merkeze gitmek. Bilet fiyatını soran cümleyi kurabildin mi?\n\n#almanca #almancaöğreniyorum #deutschlernen #almancakonuşma #toplutaşıma #almancacümle",
      outro: { series: "Almanca cümle alıştırmaları", ask: "Bilet fiyatını soran cümleyi kurabildin mi?" },
    },
    lines: [
      sentence("wie viel", [0, 1, 2], "„Wie viel“ başta, fiil hemen arkasında"),
      sentence("einsteigen", [1, 5], "einsteigen ikiye ayrılır, ein en sona gider"),
      sentence("die U-Bahn", [2, 3, 4], "Bu cümlede mit, Dativ ister: die U-Bahn → der U-Bahn"),
    ],
  }),
};

export default episode;
