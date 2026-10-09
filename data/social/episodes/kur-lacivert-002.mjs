/* Arkadaşa mesaj: buluşma, 2 cümle. */
const episode = {
  template: "kur-lacivert",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-22 07:30",
  content: ({ sentence }) => ({
    copy: {
      title: "Buluşma mesajı, 2 cümle",
      scene: "Arkadaşa mesaj",
      summary: "Buluşma mesajı: 2 cümle",
      hook: ["Buluşma saatini", "Almanca yaz.", "Kelimeleri doğru sıraya koy."],
      caption: "Arkadaşınla buluşmayı Almanca ayarlayabilir misin? Kelimeleri doğru sıraya koyabildin mi? Yorumlara yaz.\n\n#almanca #almancaöğreniyorum #deutschlernen #almancacümle #almancamesaj #almanyadayaşam",
      outro: { series: "Yeni mesajlar yakında", ask: "Hangisini ilk denemede bildin? Yorumlara yaz." },
    },
    lines: [
      sentence("losgehen", [1, 5], "losgehen ayrılır, los en sona gider"),
      sentence("jedenfalls", [4], "zum, „zu dem“in kısası"),
    ],
  }),
};

export default episode;
