/* Restoranda: garsonun önerisi, ana yemek, tatlı, hesap (4 cümle). */
const episode = {
  template: "diyalog-kagit",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-18 18:30",
  content: ({ line }) => ({
    lines: [
      { scene: "order", who: "them", key: "die Spezialität" },
      { scene: "order", who: "me", key: "der Hauptgang" },
      { scene: "order", who: "them", key: "der Nachtisch" },
      { scene: "pay", who: "me", key: "das Bargeld" },
    ].map(line),
    copy: {
      title: "Restoranda, 4 cümle",
      hook: ["Almanya'da", "restoranda mısın?", "Bu 4 cümle yeter."],
      caption: "Restoranda bu 4 cümle yeter: garsonun önerisi, ana yemek, tatlı ve hesap. Kaydet, dışarıda yerken lazım olur.\n\n#almanca #almanyadayaşam #deutschlernen #almancaöğreniyorum #restoran #essengehen",
      outro: { series: "Her hafta yeni bir durum", ask: "Almanya'da en sevdiğin yemek ne? Yorumlara yaz" },
      scenes: {
        order: { label: "Sipariş", icon: "shop" },
        pay: { label: "Hesap", icon: "shop" },
      },
      them: "Garson",
      endTitle: "Kaydet, restoranda lazım.",
      options: ["Eczane", "Kuaför"],
    },
  }),
};

export default episode;
