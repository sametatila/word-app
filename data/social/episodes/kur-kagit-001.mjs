/* İş yerinde 3 cümle. */
const episode = {
  template: "kur-kagit",
  status: "hazır",
  created: "2026-10-08",
  slot: "2026-10-17 12:30",
  ytTitle: "İş yerinde kullanabileceğin 3 Almanca cümleyi sen kur #almanca #shorts",
  content: ({ sentence }) => ({
    copy: {
      title: "İş yerinde 3 cümle, sen kur",
      scene: "İş yerinde",
      hook: ["İş yerinde", "kullanabileceğin 3 cümle.", "Sırayı sen bul."],
      caption: "İş yerinde kullanabileceğin üç Almanca cümle: patronuna sormak, izin onayı ve projeyi kimin yönettiği. İzin onayı cümlesini kurabildin mi?\n\n#almanca #almancaöğreniyorum #deutschlernen #almanyadaçalışmak #işyeri #almancacümle",
      outro: { series: "Almanca cümle alıştırmaları", ask: "İzin onayı cümlesini kurabildin mi?" },
    },
    lines: [
      sentence("die Chefin", [1, 5], "muss ikinci sırada, asıl fiil en sonda"),
      sentence("genehmigen", [2, 5], "hat ikinci sırada, genehmigt en sonda"),
      sentence("leiten", [0, 1], "Soru kelimesi başta, fiil hemen arkasında"),
    ],
  }),
};

export default episode;
