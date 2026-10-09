/* İki kural: -schaft → die, -ig → der. */
const episode = {
  template: "artikel-lacivert",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-21 07:30",
  content: ({ quiz }) => ({
    items: quiz(["die Mannschaft", "der Honig", "die Freundschaft", "der König"], {
      Mannschaft: { stem: "Mann", sfx: "schaft" },
      Honig: { stem: "Hon", sfx: "ig" },
      Freundschaft: { stem: "Freund", sfx: "schaft" },
      König: { stem: "Kön", sfx: "ig" },
    }),
    copy: {
      title: "-schaft ve -ig",
      hook: ["Kelimenin sonuna bak,", "artikeli oradan oku."],
      pill: "Kartı doğru kutuya at",
      rules: [
        { label: "-schaft", sfx: ["schaft"], artikel: "die" },
        { label: "-ig", sfx: ["ig"], artikel: "der" },
      ],
      endKicker: "Aklında kalsın",
      outro: { series: "Yarın yeni bir kural geliyor", ask: "Başka -schaft kelimesi biliyor musun?" },
      caption: "Kelimenin sonuna bak, artikeli oradan oku: -schaft ile bitenler hep die, -ig ile bitenler de neredeyse hep der. Başka örnek biliyor musun?\n\n#almanca #artikel #derdiedas #deutschlernen #almancaöğreniyorum #almancagramer",
    },
  }),
};

export default episode;
