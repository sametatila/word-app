/* Çocuğun okula başlayınca lazım olan 3 kelime. */
const episode = {
  template: "kelime-turuncu",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-22 12:30",
  content: ({ deck }) => ({
    items: deck(["die Grundschule", "der Klassenlehrer", "der Elternabend"]),
    copy: {
      title: "Okul için 3 kelime",
      hook: ["Çocuğun Almanya'da", "okula başlıyorsa", "bu 3 kelime şart."],
      caption: "Çocuğun Almanya'da okula başlıyorsa bu 3 kelime şart: ilkokul, sınıf öğretmeni, veli toplantısı. Kaçını biliyordun?\n\n#almanca #almanyadayaşam #deutschlernen #almancakelimeler #okul #veli",
      outro: { series: "Yarın 3 kelime daha", ask: "Veli toplantısına hiç gittin mi?" },
      summary: "Kaçını biliyordun?",
    },
  }),
};

export default episode;
