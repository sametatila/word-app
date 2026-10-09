/* A mı, e mi: dann/denn, wann/wenn, fallen/fällen (ä, e gibi okunur). */
const episode = {
  template: "duy-gece",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-21 18:30",
  content: ({ pair }) => ({
    rounds: [pair("dann", "denn", 0), pair("wann", "wenn", 1), pair("fallen", "fällen", 1)],
    copy: {
      title: "A mı, e mi?",
      hook: ["A mı, e mi?", "En çok karışan üç çift."],
      recap: "Kaç tanesini bildin?",
      caption: "A mı, e mi? dann ile denn, wann ile wenn: Almancaya yeni başlayanların en çok karıştırdığı çiftler. Kulağınla ayırt edebildin mi?\n\n#almanca #almancaöğreniyorum #deutschlernen #telaffuz #almancakelimeler #dinleme",
      outro: { series: "Yarın yeni çiftler geliyor", ask: "Hangisini karıştırıyordun? Yorumlara yaz." },
    },
  }),
};

export default episode;
