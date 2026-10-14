/* Restoranda 2 cümle. */
const episode = {
  template: "kur-turuncu",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-19 07:30",
  ytTitle: "Restoranda geçen 2 Almanca cümleyi sen kur #almanca #shorts",
  content: ({ sentence }) => ({
    copy: {
      title: "Restoranda 2 cümle, sen kur",
      scene: "Restoranda",
      hook: ["Restoranda 2 cümle.", "Kelimeleri sıraya", "koyabilir misin?"],
      caption: "Restoranda geçen iki Almanca cümleyi kur: garnitür seçenekleri ve eksik tabak. Masada tabak eksikse hangi cümleyi söylersin?\n\n#almanca #almancaöğreniyorum #deutschlernen #almanyadayaşam #restoranda #almancacümle",
      outro: { series: "Yeni cümleler yolda", ask: "Masada tabak eksikse hangi cümleyi söylersin?" },
    },
    lines: [
      sentence("die Beilage", [0, 1, 2], "„Als Beilage“ başta, gibt yine ikinci sırada"),
      sentence("fehlen", [0, 1, 2, 3], "„Auf dem Tisch“ tek parça, fehlt yine ikinci sırada"),
    ],
  }),
};

export default episode;
