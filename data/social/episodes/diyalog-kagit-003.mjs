/* Kıyafet olmadı: mağazada değiştirmek, online siparişi geri göndermek (3 cümle). */
const episode = {
  template: "diyalog-kagit",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-22 18:30",
  content: ({ line }) => ({
    lines: [
      { scene: "shop", who: "me", key: "umtauschen" },
      { scene: "shop", who: "them", key: "der Umtausch" },
      { scene: "online", who: "me", key: "zurückschicken" },
    ].map(line),
    copy: {
      title: "Kıyafet olmadı, 3 cümle",
      hook: ["Aldığın kıyafet", "olmadı mı?", "Bu 3 cümle yeter."],
      caption: "Aldığın kıyafet olmadı mı? Mağazada değiştirirken ve online siparişi geri gönderirken bu 3 cümle yeter. Fişi saklamayı unutma.\n\n#almanca #almanyadayaşam #deutschlernen #almancaöğreniyorum #alışveriş #umtausch",
      outro: { series: "Her hafta yeni bir durum", ask: "Sırada hangisi olsun? Yorumlara yaz" },
      scenes: {
        shop: { label: "Mağazada", icon: "shop" },
        online: { label: "Online siparişte", icon: "phone" },
      },
      them: "Satıcı",
      endTitle: "Fişi saklamayı unutma.",
      options: ["Eczane", "Kuaför"],
    },
  }),
};

export default episode;
