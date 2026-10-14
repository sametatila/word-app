/* Eczanede: derdini anlatıyorsun, eczacı reçetesiz ilacı ve nasıl alınacağını söylüyor (3 cümle). */
const episode = {
  template: "diyalog-turuncu",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-23 18:30",
  ytTitle: "Eczanede Almanca: ilaç alırken geçen 3 örnek cümle #almanca #shorts",
  content: ({ line }) => ({
    lines: [
      { who: "me", key: "die Kopfschmerzen" },
      { who: "them", key: "rezeptfrei" },
      { who: "them", key: "einnehmen" },
    ].map(line),
    copy: {
      title: "Eczanede, 3 cümle",
      hook: ["Eczanedesin.", "İlaç alırken geçen 3 cümle."],
      caption: "Eczanede geçen üç Almanca örnek cümle: baş ağrısını anlatmak, ilacın reçetesiz olduğunu ve kullanım sıklığını anlamak. Kaydet, eczaneye gitmeden önce tekrar et.\n\n#almanca #almancakonuşma #deutschlernen #almancaöğreniyorum #apotheke #eczane",
      outro: { series: "Her hafta yeni bir durum", ask: "Kaydet, eczaneye gitmeden önce tekrar et" },
      them: "ECZACI",
      receiptNo: "APOTHEKE",
      receiptTitle: "Eczanede",
      saveLine: "Kaydet, eczanede işine yarar.",
      endTitle: "3 kelimelik özet",
    },
  }),
};

export default episode;
