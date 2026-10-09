/* Telefonda 3 cümle. */
const episode = {
  template: "kur-lacivert",
  status: "hazır",
  created: "2026-10-08",
  slot: "2026-10-18 07:30",
  content: ({ sentence }) => ({
    copy: {
      title: "Telefonda 3 cümle, sen yaz",
      scene: "Telefonda",
      hook: ["Telefonda bunu", "nasıl dersin?", "Kelimeleri doğru sıraya koy."],
      caption: "Telefonda bunu nasıl dersin? Kelimeleri doğru sıraya koyabildin mi? Kaçını bildin, yorumlara yaz.\n\n#almanca #almancaöğreniyorum #deutschlernen #almancacümle #telefonda #almanyadayaşam",
      outro: { series: "Yarın 3 cümle daha", ask: "Hangisini ilk denemede bildin? Yorumlara yaz." },
    },
    lines: [
      sentence("zurückrufen", [0, 5], "Evet/hayır sorusu fiille başlar, zurückrufen en sonda"),
      sentence("die Nachricht", [2, 4, 5], "Önce kime (dir), sonra ne (eine Nachricht)"),
      sentence("wissen", [4], "Burada nicht en sona gidiyor"),
    ],
  }),
};

export default episode;
