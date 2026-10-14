/* Almanca kursunda 2 cümle. */
const episode = {
  template: "kur-kagit",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-21 12:30",
  ytTitle: "Almanca kursuna başlarken kullanabileceğin 2 cümleyi sen kur #almanca #shorts",
  content: ({ sentence }) => ({
    copy: {
      title: "Kursta 2 cümle, sen kur",
      scene: "Kursta",
      hook: ["Almanca kursuna başlıyorsun.", "Bu 2 cümleyi", "sen kur."],
      caption: "Almanca kursuna başlarken kullanabileceğin iki cümle: kursa kaydolmak ve soruların olduğunu söylemek. Kursa kayıt cümlesini kurabildin mi?\n\n#almanca #almancaöğreniyorum #deutschlernen #almancakursu #almancacümle #almanyadayaşam",
      outro: { series: "Yeni cümleler yakında", ask: "Kursa kayıt cümlesini kurabildin mi?" },
    },
    lines: [
      sentence("sich anmelden", [1, 6], "melde … an: an en sona gider"),
      sentence("viel", [2], "Burada Fragen çoğul; önünde viele kullanılır"),
    ],
  }),
};

export default episode;
