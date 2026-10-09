/* -ung ile biten 4 kelime, hepsi die (kural sonda açılır). */
const episode = {
  template: "artikel-kagit",
  status: "hazır",
  created: "2026-10-08",
  slot: "2026-10-16 07:30",
  content: ({ quiz }) => ({
    items: quiz(["die Wohnung", "die Zeitung", "die Rechnung", "die Meinung"]),
    copy: {
      title: "-ung ile biten 4 kelime",
      hook: ["Bu 4 kelimenin", "artikelini tahmin et."],
      pill: "Sonunda bir şey fark edeceksin.",
      suffix: "ung",
      rule: { kicker: "Fark ettin mi?", text: "<i>-ung</i> ile biten kelimeler<br>hep <i>die</i> alır.", examples: "die Wohnung, die Zeitung, die Rechnung…" },
      endKicker: "Kural",
      outro: { series: "Yarın yeni bir kural geliyor", ask: "Aklına gelen -ung kelimelerini yaz" },
      caption: "Bu 4 kelimenin ortak bir sırrı var. Fark ettin mi? Aklına gelen başka -ung kelimelerini yorumlara yaz.\n\n#almanca #artikel #derdiedas #deutschlernen #almancaöğreniyorum #almancagramer",
    },
  }),
};

export default episode;
