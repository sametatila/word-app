/* Alışverişte cebini koruyan 5 kelime. */
const episode = {
  template: "kelime-turuncu",
  status: "hazır",
  created: "2026-10-08",
  content: ({ deck }) => ({
    items: deck(["das Pfand", "das Sonderangebot", "der Umtausch", "die Rückgabe", "der Kassenbon"]),
    copy: {
      title: "Alışverişte 5 kelime",
      hook: ["Almanya'da alışverişte", "bu 5 kelime", "cebini korur."],
      caption: "Almanya'da alışverişte bu 5 kelime cebini korur: Pfand, indirim, değişim, iade ve fiş. Kaçını biliyordun?\n\n#almanca #almanyadayaşam #deutschlernen #almancakelimeler #alışveriş #pfand",
      outro: { series: "Yarın 5 kelime daha", ask: "Pfand makinesini hiç kullandın mı?" },
      summary: "Kaçını biliyordun?",
    },
  }),
};

export default episode;
