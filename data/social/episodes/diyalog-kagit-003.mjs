/* Kıyafet olmadı: mağazada değiştirmek, internetten verdiğin siparişi geri göndermek (3 cümle). */
const episode = {
  template: "diyalog-kagit",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-22 18:30",
  ytTitle: "Almanca kıyafet değişimi ve iade için 3 örnek cümle #almanca #shorts",
  content: ({ line }) => ({
    lines: [
      { scene: "shop", who: "me", key: "umtauschen" },
      { scene: "shop", who: "them", key: "der Umtausch" },
      { scene: "online", who: "me", key: "zurückschicken" },
    ].map(line),
    copy: {
      title: "Kıyafet olmadı, 3 cümle",
      hook: ["Aldığın kıyafet", "olmadı mı?", "Değişim ve iade için 3 cümle."],
      caption: "Almanca kıyafet değişimi ve iade: daha büyük beden istemek, fişle değişim ve internetten verilen siparişi geri göndermek. Değişim yaparken fişini istediler mi?\n\n#almanca #almancakonuşma #deutschlernen #almancaöğreniyorum #alışveriş #umtausch",
      outro: { series: "Her hafta yeni bir durum", ask: "Değişim yaparken fişini istediler mi?" },
      scenes: {
        shop: { label: "Mağazada", icon: "shop" },
        online: { label: "İnternetten alışverişte", icon: "phone" },
      },
      them: "Satıcı",
      endTitle: "Fişi saklamayı unutma.",
      options: ["Değişim", "İade"],
    },
  }),
};

export default episode;
