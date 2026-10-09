/* Alışverişte cebini koruyan 3 kelime. */
const episode = {
  template: "kelime-turuncu",
  status: "hazır",
  created: "2026-10-08",
  slot: "2026-10-18 12:30",
  content: ({ deck }) => ({
    items: deck(["das Pfand", "die Rückgabe", "das Sonderangebot"]),
    copy: {
      title: "Alışverişte 3 kelime",
      hook: ["Almanya'da alışverişte", "bu 3 kelime", "cebini korur."],
      caption: "Almanya'da alışverişte bu 3 kelime cebini korur: Pfand, iade ve kampanya. Kaçını biliyordun?\n\n#almanca #almanyadayaşam #deutschlernen #almancakelimeler #alışveriş #pfand",
      outro: { series: "Yarın 3 kelime daha", ask: "Pfand makinesini hiç kullandın mı?" },
      summary: "Kaçını biliyordun?",
    },
  }),
};

export default episode;
