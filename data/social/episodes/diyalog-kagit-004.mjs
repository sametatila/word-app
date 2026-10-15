/* Ev bakmaya gidiyorsun: telefonda ve evi gezerken (3 cümle). */
const episode = {
  template: "diyalog-kagit",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-24 18:30",
  ytTitle: "Almanya'da ev ararken kullanabileceğin 3 Almanca cümle #almanca #shorts",
  content: ({ line }) => ({
    lines: [
      { scene: "phone", who: "me", key: "die Empfehlung" },
      { scene: "flat", who: "them", key: "die Fläche" },
      { scene: "flat", who: "me", key: "genügen" },
    ].map((l) => (l.key === "die Fläche" ? { ...line(l), tr: "Daire 80 metrekare." } : line(l))),
    copy: {
      title: "Ev ararken 3 cümle",
      hook: ["Bu aralar", "ev mi arıyorsun?", "Ev ararken geçen 3 cümle."],
      caption: "Almanya'da ev ararken geçen üç Almanca cümle: telefonda kendini tanıtmak, dairenin büyüklüğünü anlamak ve nasıl bir ev istediğini söylemek. Ev arayan arkadaşına gönder.\n\n#almanca #almancakonuşma #evarıyorum #deutschlernen #wohnung #almancaöğreniyorum",
      outro: { series: "Her hafta yeni bir durum", ask: "Ev arayan arkadaşına gönder" },
      scenes: {
        phone: { label: "Telefonda", icon: "phone" },
        flat: { label: "Evi gezerken", icon: "home" },
      },
      them: "Ev sahibi",
      endTitle: "Ev ararken 3 cümle",
      options: ["Telefonda", "Evi gezerken"],
    },
  }),
};

export default episode;
