/* İş hayatı 5 kelimede: iş görüşmesinden zamma. */
const episode = {
  template: "kelime-gece",
  status: "hazır",
  created: "2026-10-08",
  content: ({ deck }) => ({
    items: deck(["das Vorstellungsgespräch", "die Probezeit", "die Überstunde", "der Urlaubstag", "die Gehaltserhöhung"]),
    copy: {
      title: "İş hayatı, 5 kelimede",
      hook: ["Almanya'da iş hayatı,", "5 kelimede."],
      caption: "Almanya'da iş hayatı 5 kelimede, iş görüşmesinden zamma. Hangisini ilk kez duydun?\n\n#almanca #almanyadaçalışmak #deutschlernen #almancakelimeler #almancaöğreniyorum #işhayatı",
      outro: { series: "Yarın iş yerinden 5 kelime daha", ask: "Hangisini ilk kez duydun? Yorumlara yaz" },
      summary: "İş görüşmesinden zamma",
    },
  }),
};

export default episode;
