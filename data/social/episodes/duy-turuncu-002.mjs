/* E mi, i mi: schlecht/schlicht, Stelle/Stille, Wert/Wirt. */
const episode = {
  template: "duy-turuncu",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-20 18:30",
  content: ({ pair }) => ({
    rounds: [pair("schlecht", "schlicht", 1), pair("die Stelle", "die Stille", 0), pair("der Wert", "der Wirt", 1)],
    copy: {
      title: "E mi, i mi?",
      hook: ["E mi, i mi?", "Dinle, sonra seç."],
      recap: "Kaç tanesini bildin?",
      caption: "E mi, i mi? Stelle pozisyon, Stille sessizlik: tek ünlü, bambaşka anlam. Üç çiftin kaçını bildin?\n\n#almanca #almancaöğreniyorum #deutschlernen #telaffuz #almancakelimeler #almanyadayaşam",
      outro: { series: "Yarın yeni çiftler geliyor", ask: "En çok hangisi zorladı? Yorumlara yaz." },
    },
  }),
};

export default episode;
