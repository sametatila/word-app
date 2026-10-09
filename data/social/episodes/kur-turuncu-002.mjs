/* Restoranda 2 cümle. */
const episode = {
  template: "kur-turuncu",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-19 07:30",
  content: ({ sentence }) => ({
    copy: {
      title: "Restoranda 2 cümle, treni kur",
      scene: "Restoranda",
      hook: ["Restoranda 2 cümle.", "Treni sen", "kurabilir misin?"],
      caption: "Restoranda lazım olan 2 cümle. Vagonları doğru sıraya dizebildin mi? Hangisinde takıldın, yaz.\n\n#almanca #almancaöğreniyorum #deutschlernen #almanyadayaşam #restoranda #almancacümle",
      outro: { series: "Yeni cümleler yolda", ask: "İkisini de doğru dizdin mi? Yorumlara yaz." },
    },
    lines: [
      sentence("die Beilage", [0, 1, 2], "„Als Beilage“ başta, gibt yine ikinci sırada"),
      sentence("fehlen", [0, 1, 2, 3], "„Auf dem Tisch“ tek parça, fehlt yine ikinci sırada"),
    ],
  }),
};

export default episode;
