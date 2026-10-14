/* Çocuğun okula başlayınca lazım olan 3 kelime. */
const episode = {
  template: "kelime-turuncu",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-22 12:30",
  ytTitle: "Almanya'da okul hayatı: 3 Almanca kelimeyi biliyor musun? #almanca #shorts",
  content: ({ deck }) => ({
    items: deck(["die Grundschule", "der Klassenlehrer", "der Elternabend"]),
    copy: {
      title: "Okul için 3 kelime",
      hook: ["Çocuğun Almanya'da", "okula başlıyorsa", "bu 3 kelimeyle karşılaşabilirsin."],
      caption: "Almanya'da okul hayatıyla ilgili üç kelime: Grundschule ilkokul, Klassenlehrer sınıf öğretmeni, Elternabend veli toplantısı. Almanya'da okula başlayacak bir aileye gönder.\n\n#almanca #almancakonuşma #deutschlernen #almancakelimeler #okul #veli",
      outro: { series: "Günlük hayatta Almanca", ask: "Almanya'da okula başlayacak bir aileye gönder" },
      summary: "Kaçını biliyordun?",
    },
  }),
};

export default episode;
