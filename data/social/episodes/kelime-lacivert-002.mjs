/* Posta kutusundan fatura çıkınca bakılacak 3 kelime. */
const episode = {
  template: "kelime-lacivert",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-25 12:30",
  ytTitle: "Almanca elektrik faturası ve ödeme yazışmalarında geçen 3 kelime #almanca #shorts",
  content: ({ deck }) => ({
    items: deck(["die Stromrechnung", "die Aufforderung", "die Kontonummer"]),
    copy: {
      title: "Faturada 3 kelime",
      hook: ["Almanca elektrik faturasında", "karşına çıkabilecek", "3 kelime."],
      caption: "Almanca elektrik faturası ve ödeme yazışmalarında geçen üç kelime: Stromrechnung elektrik faturası, Aufforderung çağrı/talep, Kontonummer hesap numarası. Ödeme talebi örnekte Aufforderung zur Zahlung olarak geçiyor. Kaydet, fatura geldiğinde tekrar bak.\n\n#almanca #almancakonuşma #deutschlernen #almancakelimeler #fatura #bürokrasi",
      outro: { series: "Günlük hayatta Almanca", ask: "Kaydet, fatura geldiğinde tekrar bak" },
      cardLabel: "RECHNUNG",
      summaryKicker: "Fatura gelince lazım olacak",
      summaryTitle: "Mektuptaki 3 kelime",
    },
  }),
};

export default episode;
