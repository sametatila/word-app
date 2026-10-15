/* Restoranda: arkadaşının önerisi (du), ana yemek, garsonun tatlı önerisi ve nakit ödeme (4 örnek). */
const episode = {
  template: "diyalog-kagit",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-18 18:30",
  ytTitle: "Restoranda Almanca: sipariş ve ödeme için 4 örnek cümle #almanca #shorts",
  content: ({ line }) => ({
    lines: [
      { scene: "friend", who: "them", key: "die Spezialität" },
      { scene: "order", who: "me", key: "der Hauptgang" },
      { scene: "order", who: "them", key: "der Nachtisch" },
      { scene: "pay", who: "me", key: "das Bargeld" },
    ].map(line),
    copy: {
      title: "Restoranda, 4 cümle",
      hook: ["Bu akşam", "restoranda mısın?", "Masada geçen 4 cümle."],
      caption: "Restoranda geçen dört Almanca cümle: arkadaşının önerisi, ana yemek siparişi, garsonun tatlı önerisi ve yanında nakit olmadığını söylemek. Kaydet, restorana gitmeden önce tekrar et.\n\n#almanca #almancakonuşma #deutschlernen #almancaöğreniyorum #restoran #essengehen",
      outro: { series: "Her hafta yeni bir durum", ask: "Kaydet, restorana gitmeden önce tekrar et" },
      scenes: {
        friend: { label: "Arkadaşınla", icon: "shop", them: "Arkadaşın" },
        order: { label: "Sipariş", icon: "shop" },
        pay: { label: "Hesap", icon: "shop" },
      },
      them: "Garson",
      endTitle: "Restoranda 4 cümle",
      options: ["Sipariş", "Tatlı", "Ödeme"],
    },
  }),
};

export default episode;
