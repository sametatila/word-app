/* Telefonda 3 cümle. */
const episode = {
  template: "kur-lacivert",
  status: "hazır",
  created: "2026-10-08",
  slot: "2026-10-18 07:30",
  ytTitle: "Telefonda kullanabileceğin 3 Almanca cümleyi sen kur #almanca #shorts",
  content: ({ sentence }) => ({
    copy: {
      title: "Telefonda 3 cümle, sen kur",
      scene: "Telefonda",
      hook: ["Telefonda bunu", "nasıl dersin?", "Kelimeleri doğru sıraya koy."],
      caption: "Telefonda kullanabileceğin üç Almanca cümle: geri aramasını istemek, mesaj göndermek ve telefon numarasını bilmediğini söylemek. Geri aramasını isteyen cümleyi kurabildin mi?\n\n#almanca #almancaöğreniyorum #deutschlernen #almancacümle #telefonda #almancakonuşma",
      outro: { series: "Almanca cümle alıştırmaları", ask: "Geri aramasını isteyen cümleyi kurabildin mi?" },
    },
    lines: [
      sentence("zurückrufen", [0, 5], "Evet/hayır sorusu fiille başlar, zurückrufen en sonda"),
      sentence("die Nachricht", [2, 4, 5], "Önce kime (dir), sonra ne (eine Nachricht)"),
      sentence("wissen", [4], "Burada nicht en sona gidiyor"),
    ],
  }),
};

export default episode;
