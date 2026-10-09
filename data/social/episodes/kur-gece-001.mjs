/* Kafede 3 cümle. */
const episode = {
  template: "kur-gece",
  status: "hazır",
  created: "2026-10-08",
  slot: "2026-10-13 12:30",
  content: ({ sentence }) => ({
    copy: {
      title: "Kafede 3 cümle, sen diz",
      scene: "Kafede",
      hook: ["Kafede lazım olan 3 cümle.", "Kelimeleri sen diz."],
      caption: "Kafede lazım olan 3 cümle. Kelimeleri doğru sıraya dizebildin mi? Kaç tanesini bildin, yorumlara yaz.\n\n#almanca #almancaöğreniyorum #deutschlernen #almancacümle #kafede #almanyadayaşam",
      outro: { series: "Yarın 3 cümle daha", ask: "Kaçını doğru dizdin? Yorumlara yaz." },
    },
    lines: [
      sentence("mögen", [1], "Fiil hep ikinci sırada"),
      sentence("süß", [0, 1, 2], "„Der Kaffee“ tek parça sayılır, fiil yine ikinci"),
      sentence("prüfen", [1, 2], "Kibar ricada fiil başa geçer"),
    ],
  }),
};

export default episode;
