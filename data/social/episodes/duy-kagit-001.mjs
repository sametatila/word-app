/* Mond/Mund, Miete/Mitte, lesen/lösen, Boot/Brot. */
const episode = {
  template: "duy-kagit",
  status: "hazır",
  created: "2026-10-08",
  slot: "2026-10-15 07:30",
  content: ({ pair }) => ({
    rounds: [pair("der Mond", "der Mund", 1), pair("die Miete", "die Mitte", 0), pair("lesen", "lösen", 1), pair("das Boot", "das Brot", 1)],
    copy: {
      title: "Kulağına güveniyor musun?",
      hook: ["Kulağına", "güveniyor musun?"],
      pill: "Fark sadece tek harf.",
      recap: "Dört çift, dört fark",
      caption: "Kulağına güveniyor musun? Dört çift, fark sadece tek harf. Hangisini ilk duyuşta bildin?\n\n#almanca #almancaöğreniyorum #deutschlernen #telaffuz #almancakelimeler #dinleme",
      outro: { series: "Yarın yeni çiftler geliyor", ask: "Hangisini ilk duyuşta bildin?" },
    },
  }),
};

export default episode;
