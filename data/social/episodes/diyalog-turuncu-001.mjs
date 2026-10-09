/* Markette kasada: kart ya da nakit, makbuz, fiş (4 cümle). */
const episode = {
  template: "diyalog-turuncu",
  status: "hazır",
  created: "2026-10-08",
  slot: "2026-10-12 18:30",
  content: ({ line }) => ({
    lines: [
      { who: "me", key: "die EC-Karte" },
      { who: "me", key: "bar", alt: true },
      { who: "them", key: "die Quittung" },
      { who: "them", key: "der Kassenbon" },
    ].map(line),
    copy: {
      title: "Markette kasada, 4 cümle",
      hook: ["Markette kasada", "bu 4 cümle yeter."],
      caption: "Markette kasada bu 4 cümle yeter. Kartla mı nakit mi, makbuz, fiş… Kaydet, alışverişte işine yarar.\n\n#almanca #almanyadayaşam #deutschlernen #almancaöğreniyorum #einkaufen #market",
      outro: { series: "Her hafta yeni bir durum", ask: "Sırada hangi durum olsun? Yorumlara yaz" },
      them: "KASİYER",
      receiptNo: "KASSE 3",
      receiptTitle: "Markette kasada",
      saveLine: "Kaydet, kasada işine yarar.",
      endTitle: "Bugünün 4 kelimesi",
    },
  }),
};

export default episode;
