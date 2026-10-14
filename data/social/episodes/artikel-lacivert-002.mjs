/* İki kural: -schaft → die, -ig → der. */
const episode = {
  template: "artikel-lacivert",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-21 07:30",
  ytTitle: "Almanca artikel testi: -schaft ve -ig sonlarına bak #almanca #shorts",
  content: ({ quiz }) => ({
    items: quiz(["die Mannschaft", "der Honig", "die Freundschaft", "der König"], {
      Mannschaft: { stem: "Mann", sfx: "schaft" },
      Honig: { stem: "Hon", sfx: "ig" },
      Freundschaft: { stem: "Freund", sfx: "schaft" },
      König: { stem: "Kön", sfx: "ig" },
    }),
    copy: {
      title: "-schaft ve -ig",
      hook: ["-schaft mı, -ig mi?", "Hangisi die, hangisi der?"],
      pill: "Kartı doğru kutuya at",
      rules: [
        { label: "-schaft", sfx: ["schaft"], artikel: "die" },
        { label: "-ig çoğunlukla", sfx: ["ig"], artikel: "der" },
      ],
      endKicker: "Sonlar ipucu verir",
      outro: { series: "Almanca artikel alıştırmaları", ask: "Bir -schaft kelimesi de sen yaz" },
      caption: "Almanca isimlerde kelimenin sonu artikel için ipucu verebilir. Bu turda -schaft ile -ig sonlarını karşılaştırıyoruz; -ig bir eğilim, kesin kural değil. Bir -schaft kelimesi de sen yaz.\n\n#almanca #artikel #derdiedas #deutschlernen #almancaöğreniyorum #almancagramer",
    },
  }),
};

export default episode;
