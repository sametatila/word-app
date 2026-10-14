/* Alışverişte cebini koruyan 3 kelime. */
const episode = {
  template: "kelime-turuncu",
  status: "hazır",
  created: "2026-10-08",
  slot: "2026-10-18 12:30",
  ytTitle: "Almanca alışveriş kelimeleri: Pfand, Rückgabe, Sonderangebot #almanca #shorts",
  content: ({ deck }) => ({
    items: deck(["das Pfand", "die Rückgabe", "das Sonderangebot"]),
    copy: {
      title: "Alışverişte 3 kelime",
      hook: ["Almanya'da alışverişte", "bu 3 kelime", "ne anlama geliyor?"],
      caption: "Alışverişte kullanılan üç Almanca kelime: Pfand şişe depozitosu, Rückgabe iade, Sonderangebot kampanya. Pfand makinesini hiç kullandın mı?\n\n#almanca #almanyadayaşam #deutschlernen #almancakelimeler #alışveriş #pfand",
      outro: { series: "Günlük hayatta Almanca", ask: "Pfand makinesini hiç kullandın mı?" },
      summary: "Kaçını biliyordun?",
    },
  }),
};

export default episode;
