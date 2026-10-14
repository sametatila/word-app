/* Mond/Mund, Miete/Mitte, lesen/lösen, Boot/Brot. */
const episode = {
  template: "duy-kagit",
  status: "hazır",
  created: "2026-10-08",
  slot: "2026-10-15 07:30",
  ytTitle: "Mond mu, Mund mu? 4 çiftle Almanca dinleme testi #almanca #shorts",
  content: ({ pair }) => ({
    rounds: [pair("der Mond", "der Mund", 1), pair("die Miete", "die Mitte", 0), pair("lesen", "lösen", 1), pair("das Boot", "das Brot", 1)],
    copy: {
      title: "Kulağına güveniyor musun?",
      hook: ["Kulağına", "güveniyor musun?"],
      pill: "Benzer kelimeler, farklı sesler.",
      recap: "Dört çift, dört fark",
      caption: "Almanca dinleme testi: Mond/Mund, Miete/Mitte, lesen/lösen, Boot/Brot. Benzer kelimelerdeki ses farkına kulak ver. Mond mu, Mund mu? İlk seferde bildin mi?\n\n#almanca #almancaöğreniyorum #deutschlernen #telaffuz #almancakelimeler #dinleme",
      outro: { series: "Almanca dinleme alıştırmaları", ask: "Mond mu, Mund mu? İlk seferde bildin mi?" },
    },
  }),
};

export default episode;
