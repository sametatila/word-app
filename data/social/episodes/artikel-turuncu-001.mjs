/* Gün, ay, mevsim adları der; tuzak das Wochenende (das Ende). */
const episode = {
  template: "artikel-turuncu",
  status: "hazır",
  created: "2026-10-08",
  slot: "2026-10-14 07:30",
  content: ({ quiz }) => ({
    items: quiz(["der Montag", "der Januar", "der Sommer", "das Wochenende"]),
    copy: {
      title: "Günler, aylar, mevsimler",
      hook: ["Pazartesi, ocak, yaz…", "Üçü de aynı artikeli alıyor."],
      stamps: ["GÜN", "AY", "MEVSİM", "HAFTA SONU?"],
      rule: 'Gün, ay ve mevsim adları <i class="der">der</i> alır.<br>Wochenende ise <b class="das">das</b>, çünkü son kelimesi <b class="das">das</b> Ende.',
      endTitle: "Kaçını bildin?",
      outro: { series: "Yarın yeni bir kural geliyor", ask: "Wochenende'yi bilen var mı? Yorumlara yaz" },
      caption: "Pazartesi, ocak ve yaz aynı artikeli alıyor. Peki hafta sonu? Kaç tane bildin?\n\n#almanca #artikel #derdiedas #deutschlernen #almancaöğreniyorum #günleraylar",
    },
  }),
};

export default episode;
