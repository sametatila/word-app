/* -ung ile biten 4 kelime, hepsi die (kural sonda açılır). */
const episode = {
  template: "artikel-kagit",
  status: "hazır",
  created: "2026-10-08",
  slot: "2026-10-16 07:30",
  ytTitle: "Almancada -ung eki: 4 kelimenin artikelini tahmin et #almanca #shorts",
  content: ({ quiz }) => ({
    items: quiz(["die Wohnung", "die Zeitung", "die Rechnung", "die Meinung"]),
    copy: {
      title: "-ung ile biten 4 kelime",
      hook: ["Bu 4 kelimenin", "artikelini tahmin et."],
      pill: "Sonları aynı. Artikelleri de mi?",
      suffix: "ung",
      rule: { kicker: "Fark ettin mi?", text: "<i>-ung</i> ekiyle oluşan isimler<br>hep <i>die</i> alır.", examples: "die Wohnung, die Zeitung, die Rechnung…" },
      endKicker: "Kural",
      outro: { series: "Almanca artikel alıştırmaları", ask: "Bildiğin bir -ung kelimesini yorumlara yaz" },
      caption: "Almanca artikel alıştırması: Wohnung, Zeitung, Rechnung, Meinung. -ung ekiyle oluşan bu dört isim die alıyor. Bildiğin bir -ung kelimesini yorumlara yaz.\n\n#almanca #artikel #derdiedas #deutschlernen #almancaöğreniyorum #almancagramer",
    },
  }),
};

export default episode;
