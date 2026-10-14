/* Arkadaşa mesaj: buluşma, 2 cümle. */
const episode = {
  template: "kur-lacivert",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-22 07:30",
  ytTitle: "Arkadaşına Almanca buluşma mesajı yaz: 2 cümle alıştırması #almanca #shorts",
  content: ({ sentence }) => ({
    copy: {
      title: "Buluşma mesajı, 2 cümle",
      scene: "Arkadaşa mesaj",
      summary: "Buluşma için 2 cümle",
      hook: ["Buluşma mesajını", "Almanca yaz.", "Kelimeleri doğru sıraya koy."],
      caption: "Arkadaşına yazabileceğin iki Almanca buluşma mesajı: yola çıkış saatini söylemek ve zamanında geleceğini belirtmek. Buluşmaya giderken bu cümleleri sesli söyle.\n\n#almanca #almancaöğreniyorum #deutschlernen #almancacümle #almancamesaj #almanyadayaşam",
      outro: { series: "Yeni mesajlar yakında", ask: "Buluşmaya giderken bu cümleleri sesli söyle" },
    },
    lines: [
      sentence("losgehen", [1, 5], "losgehen ayrılır, los en sona gider"),
      { ...sentence("jedenfalls", [4], "zum, „zu dem“in kısası"), tr: "Ben her hâlükârda buluşmaya zamanında geleceğim." },
    ],
  }),
};

export default episode;
