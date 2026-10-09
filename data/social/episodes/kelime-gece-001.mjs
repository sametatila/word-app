/* İş hayatı 3 kelimede: iş görüşmesinden zamma. */
const episode = {
  template: "kelime-gece",
  status: "hazır",
  created: "2026-10-08",
  slot: "2026-10-16 12:30",
  content: ({ deck }) => ({
    items: deck(["das Vorstellungsgespräch", "die Probezeit", "die Gehaltserhöhung"]),
    copy: {
      title: "İş hayatı, 3 kelimede",
      hook: ["Almanya'da iş hayatı,", "3 kelimede."],
      caption: "Almanya'da iş hayatı 3 kelimede: iş görüşmesi, deneme süresi, zam. Hangisini ilk kez duydun?\n\n#almanca #almanyadaçalışmak #deutschlernen #almancakelimeler #almancaöğreniyorum #işhayatı",
      outro: { series: "Yarın iş yerinden 3 kelime daha", ask: "Hangisini ilk kez duydun? Yorumlara yaz" },
      summary: "İş görüşmesinden zamma",
    },
  }),
};

export default episode;
