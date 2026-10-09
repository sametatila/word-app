/* Blume/Bluse, Münze/Mütze, fühlen/füllen, danken/denken. */
const episode = {
  template: "duy-turuncu",
  status: "hazır",
  created: "2026-10-08",
  slot: "2026-10-16 18:30",
  content: ({ pair }) => ({
    rounds: [pair("die Blume", "die Bluse", 1), pair("die Münze", "die Mütze", 0), pair("fühlen", "füllen", 1), pair("danken", "denken", 0)],
    copy: {
      title: "Bunlar aynı değil",
      hook: ["Bunlar aynı değil.", "Dinle, sonra seç."],
      recap: "Kaç tanesini bildin?",
      caption: "Bunlar aynı değil! Dinle, sonra seç: dört çift, her birinde tek harf fark. Kaç tanesini bildin?\n\n#almanca #almancaöğreniyorum #deutschlernen #telaffuz #almancakelimeler #almanyadayaşam",
      outro: { series: "Yarın yeni çiftler geliyor", ask: "En çok hangisi zorladı? Yorumlara yaz." },
    },
  }),
};

export default episode;
