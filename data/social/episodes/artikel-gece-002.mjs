/* Fiil olduğu gibi isim olunca das (das Essen, das Leben, das Wissen); tuzak der Garten (-en ama fiil değil). */
const episode = {
  template: "artikel-gece",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-23 07:30",
  ytTitle: "Almancada fiil isim olunca neden das alır? #almanca #shorts",
  content: ({ quiz }) => ({
    items: quiz(["das Essen", "das Leben", "das Wissen", "der Garten"]),
    copy: {
      title: "Fiil isim olunca",
      hook: ["essen, leben, wissen…", "İsim olunca artikeli ne?"],
      rule: "Fiil isim olunca hep <b>das</b> alır:<br>essen → das Essen.<br>Garten fiil değil: der Garten.",
      endTitle: "İşte cevaplar",
      outro: { series: "Almanca artikel alıştırmaları", ask: "Garten neden der? Farkı yorumlara yaz" },
      caption: "Almancada fiilin mastar hâli isim olarak kullanıldığında das alır: Essen, Leben, Wissen. Peki Garten neden der? İpucu: fiilden gelmiyor. Farkı yorumlara yaz.\n\n#almanca #almancaöğreniyorum #deutschlernen #artikel #derdiedas #almancagramer",
    },
  }),
};

export default episode;
