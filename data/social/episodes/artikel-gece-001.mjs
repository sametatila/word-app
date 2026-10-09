/* Kaşık, çatal, bıçak: üç farklı artikel; tuzak das Mädchen (-chen → das). */
const episode = {
  template: "artikel-gece",
  status: "hazır",
  created: "2026-10-08",
  slot: "2026-10-12 07:30",
  content: ({ quiz }) => ({
    items: quiz(["der Löffel", "die Gabel", "das Messer", "das Mädchen"], { Löffel: { icon: "spoon" }, Gabel: { icon: "fork" }, Messer: { icon: "knife" } }),
    copy: {
      title: "Kaşık, çatal, bıçak",
      hook: ["Kaşık, çatal, bıçak…", "Üçünün artikeli de farklı."],
      pill: "3 saniyen var",
      rule: "<b>-chen</b> ile biten her kelime <b>das</b> alır.<br>das Mädchen, das Brötchen…",
      endTitle: "İşte cevaplar",
      outro: { series: "Yarın yeni tur var", ask: "Kaç tane bildin? Yorumlara yaz" },
      caption: "Kaşık, çatal ve bıçağın artikeli farklı. Son soru biraz tuzaklı, kaç tane bildin?\n\n#almanca #almancaöğreniyorum #deutschlernen #artikel #derdiedas #almanyadayaşam",
    },
  }),
};

export default episode;
