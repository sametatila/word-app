/* Posta kutusundan fatura çıkınca bakılacak 3 kelime. */
const episode = {
  template: "kelime-lacivert",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-25 12:30",
  content: ({ deck }) => ({
    items: deck(["die Stromrechnung", "die Aufforderung", "die Kontonummer"]),
    copy: {
      title: "Faturada 3 kelime",
      hook: ["Posta kutundan bu mektup", "çıkarsa önce", "bu 3 kelimeye bak."],
      caption: "Posta kutundan bu mektup çıkarsa önce bu 3 kelimeye bak: elektrik faturası, ödeme çağrısı, hesap numarası. Kaydet, fatura gelince lazım olacak.\n\n#almanca #almanyadayaşam #deutschlernen #almancakelimeler #fatura #bürokrasi",
      outro: { series: "Yarın 3 kelime daha", ask: "Senin elektrik faturan bu yıl arttı mı?" },
      cardLabel: "RECHNUNG",
      summaryKicker: "Fatura gelince lazım olacak",
      summaryTitle: "Mektuptaki 3 kelime",
    },
  }),
};

export default episode;
