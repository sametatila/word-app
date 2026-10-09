/* İş yerinde 3 cümle. */
const episode = {
  template: "kur-kagit",
  status: "hazır",
  created: "2026-10-08",
  slot: "2026-10-17 12:30",
  content: ({ sentence }) => ({
    copy: {
      title: "İş yerinde 3 cümle, sen kur",
      scene: "İş yerinde",
      hook: ["İş yerinde her gün", "kurduğun 3 cümle.", "Sırayı sen bul."],
      caption: "İş yerinde her gün kurduğun 3 cümle. Türkçesini gördün, Almancasını sen dizebildin mi?\n\n#almanca #almancaöğreniyorum #deutschlernen #almanyadaçalışmak #işyeri #almancacümle",
      outro: { series: "Yarın 3 cümle daha", ask: "Hangisinde takıldın? Yorumlara yaz." },
    },
    lines: [
      sentence("die Chefin", [1, 5], "muss ikinci sırada, asıl fiil en sonda"),
      sentence("genehmigen", [2, 5], "hat ikinci sırada, genehmigt en sonda"),
      sentence("leiten", [0, 1], "Soru kelimesi başta, fiil hemen arkasında"),
    ],
  }),
};

export default episode;
