/* Yuvarlak mı, düz mü: Kiste/Küste, spielen/spülen, fordern/fördern. */
const episode = {
  template: "duy-kagit",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-19 12:30",
  ytTitle: "Kiste mi, Küste mi? Almanca ü ve ö sesi dinleme testi #almanca #shorts",
  content: ({ pair }) => ({
    rounds: [pair("die Kiste", "die Küste", 1), pair("spielen", "spülen", 1), pair("fordern", "fördern", 0)],
    copy: {
      title: "Kiste mi, Küste mi?",
      hook: ["Kiste mi, Küste mi?", "Dinle, farkı bul."],
      pill: "Ü ve ö için dudaklarını yuvarla.",
      recap: "Kaçını doğru duydun?",
      caption: "Almanca dinleme testi: Kiste/Küste, spielen/spülen, fordern/fördern. Kiste sandık, Küste sahil; benzer sesler anlamı değiştiriyor. Kiste mi, Küste mi? Hangisinde zorlandın?\n\n#almanca #almancaöğreniyorum #deutschlernen #telaffuz #almancakelimeler #dinleme",
      outro: { series: "Almanca dinleme alıştırmaları", ask: "Kiste mi, Küste mi? Hangisinde zorlandın?" },
    },
  }),
};

export default episode;
