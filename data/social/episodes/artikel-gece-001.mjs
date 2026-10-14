/* Kaşık, çatal, bıçak: üç farklı artikel; tuzak das Mädchen (-chen → das). */
const episode = {
  template: "artikel-gece",
  status: "hazır",
  created: "2026-10-08",
  slot: "2026-10-27 07:30",
  ytTitle: "Almanca artikel testi: kaşık, çatal, bıçak ve Mädchen #almanca #shorts",
  content: ({ quiz }) => ({
    items: quiz(["der Löffel", "die Gabel", "das Messer", "das Mädchen"], { Löffel: { icon: "spoon" }, Gabel: { icon: "fork" }, Messer: { icon: "knife" } }),
    copy: {
      title: "4 kelime, 3 artikel",
      hook: ["Kaşık, çatal, bıçak…", "Peki Mädchen hangi artikeli alır?"],
      pill: "3 saniyen var",
      rule: "Küçültme eki <b>-chen</b> alan isimler <b>das</b> alır.<br>das Mädchen, das Brötchen…",
      endTitle: "İşte cevaplar",
      outro: { series: "Almanca artikel alıştırmaları", ask: "Mädchen neden das? Farkı yorumlara yaz" },
      caption: "Almanca artikel testi: kaşık, çatal, bıçak ve Mädchen. Mutfaktaki üç kelimenin artikeli farklı; son soruda ise -chen eki ipucu veriyor. Mädchen neden das? Farkı yorumlara yaz.\n\n#almanca #almancaöğreniyorum #deutschlernen #artikel #derdiedas #almancagramer",
    },
  }),
};

export default episode;
