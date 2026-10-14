/* İş hayatı 3 kelimede: iş görüşmesinden zamma. */
const episode = {
  template: "kelime-gece",
  status: "hazır",
  created: "2026-10-08",
  slot: "2026-10-16 12:30",
  ytTitle: "Almanca iş hayatı: iş görüşmesi, deneme süresi ve maaş zammı #almanca #shorts",
  content: ({ deck }) => ({
    items: deck(["das Vorstellungsgespräch", "die Probezeit", "die Gehaltserhöhung"]),
    copy: {
      title: "İş hayatında 3 kelime",
      hook: ["İş görüşmesi, deneme süresi, zam…", "Almancasını biliyor musun?"],
      caption: "İş hayatında kullanılan üç Almanca kelime: Vorstellungsgespräch iş görüşmesi, Probezeit deneme süresi, Gehaltserhöhung maaş zammı. Deneme süresinin Almancası hangisiydi?\n\n#almanca #almanyadaçalışmak #deutschlernen #almancakelimeler #almancaöğreniyorum #işhayatı",
      outro: { series: "İş hayatında Almanca", ask: "Deneme süresinin Almancası hangisiydi?" },
      summary: "İş görüşmesinden zamma",
    },
  }),
};

export default episode;
