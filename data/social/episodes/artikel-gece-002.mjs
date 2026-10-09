/* Fiil olduğu gibi isim olunca das (das Essen, das Leben, das Wissen); tuzak der Garten (-en ama fiil değil). */
const episode = {
  template: "artikel-gece",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-23 07:30",
  content: ({ quiz }) => ({
    items: quiz(["das Essen", "das Leben", "das Wissen", "der Garten"]),
    copy: {
      title: "Fiil isim olunca",
      hook: ["essen, leben, wissen…", "İsim olunca artikeli ne?"],
      rule: "Fiil isim olunca hep <b>das</b> alır:<br>essen → das Essen.<br>Garten fiil değil: der Garten.",
      endTitle: "İşte cevaplar",
      outro: { series: "Yarın yeni tur var", ask: "Garten'da yanılan var mı? Yorumlara yaz" },
      caption: "Fiil isim olunca artikeli ne olur? Üçü kolay, sonuncusu tuzak. Kaç tane bildin?\n\n#almanca #almancaöğreniyorum #deutschlernen #artikel #derdiedas #almancagramer",
    },
  }),
};

export default episode;
