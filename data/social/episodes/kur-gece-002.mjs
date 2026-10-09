/* Komşuyla 2 cümle. */
const episode = {
  template: "kur-gece",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-24 12:30",
  content: ({ sentence }) => ({
    copy: {
      title: "Komşuyla 2 cümle, sen diz",
      scene: "Komşuyla",
      hook: ["Komşunla lazım olan 2 cümle.", "Sırayı sen bul."],
      caption: "Komşunla konuşurken lazım olan 2 cümle. Kelimeleri doğru sıraya dizebildin mi? Yorumlara yaz.\n\n#almanca #almancaöğreniyorum #deutschlernen #almancacümle #komşu #almanyadayaşam",
      outro: { series: "Yeni cümleler yakında", ask: "İkisini de doğru dizdin mi? Yorumlara yaz." },
    },
    lines: [
      sentence("herzlich", [2, 5], "haben ikinci sırada, begrüßt en sonda"),
      sentence("hilfsbereit", [2, 3], "Nachbarn çoğul, fiil de çoğul: sind"),
    ],
  }),
};

export default episode;
