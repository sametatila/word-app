/* Komşuyla 2 cümle. */
const episode = {
  template: "kur-gece",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-24 12:30",
  ytTitle: "Komşularını anlatan 2 Almanca cümleyi sen kur #almanca #shorts",
  content: ({ sentence }) => ({
    copy: {
      title: "Komşularını anlat",
      scene: "Komşular",
      hook: ["Komşularını Almanca anlat.", "Sırayı sen bul."],
      caption: "Komşularını anlatan iki Almanca cümleyi kur: bizi içtenlikle karşıladılar ve çok yardımseverler. Komşuların için hangisini söylersin?\n\n#almanca #almancaöğreniyorum #deutschlernen #almancacümle #komşu #almanyadayaşam",
      outro: { series: "Yeni cümleler yakında", ask: "Komşuların için hangisini söylersin?" },
    },
    lines: [
      sentence("herzlich", [2, 5], "haben ikinci sırada, begrüßt en sonda"),
      sentence("hilfsbereit", [2, 3], "Nachbarn çoğul, fiil de çoğul: sind"),
    ],
  }),
};

export default episode;
