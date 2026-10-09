/* Ev bakmaya gidiyorsun: telefonda ve evi gezerken (3 cümle). */
const episode = {
  template: "diyalog-kagit",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-24 18:30",
  content: ({ line }) => ({
    lines: [
      { scene: "phone", who: "me", key: "die Empfehlung" },
      { scene: "flat", who: "them", key: "die Fläche" },
      { scene: "flat", who: "me", key: "genügen" },
    ].map(line),
    copy: {
      title: "Ev bakmaya gittin, 3 cümle",
      hook: ["Almanya'da", "ev mi bakıyorsun?", "Bu 3 cümle yeter."],
      caption: "Almanya'da ev bakıyorsun: telefonda ve evi gezerken bu 3 cümle yeter. Kaydet, ev ararken lazım olacak.\n\n#almanca #almanyadayaşam #evarıyorum #deutschlernen #wohnung #almancaöğreniyorum",
      outro: { series: "Her hafta yeni bir durum", ask: "Ev ararken en zor ne oldu? Yorumlara yaz" },
      scenes: {
        phone: { label: "Telefonda", icon: "phone" },
        flat: { label: "Evi gezerken", icon: "home" },
      },
      them: "Ev sahibi",
      endTitle: "Kaydet, ev ararken lazım.",
      options: ["Banka", "Kuaför"],
    },
  }),
};

export default episode;
