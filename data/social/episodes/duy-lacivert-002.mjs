/* Yumuşak mı, sert mi: Gebäck/Gepäck, singen/sinken, streichen/streiken. */
const episode = {
  template: "duy-lacivert",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-24 07:30",
  content: ({ pair }) => ({
    rounds: [pair("das Gebäck", "das Gepäck", 1), pair("singen", "sinken", 1), pair("streichen", "streiken", 0)],
    copy: {
      title: "Yumuşak mı, sert mi?",
      hook: ["Yumuşak mı, sert mi?", "B mi P mi, G mi K mi?"],
      recap: "Kaçını yakaladın?",
      caption: "Yumuşak mı, sert mi? Gebäck hamur işi, Gepäck bagaj: tek ses, bambaşka anlam. Üçünü de yakaladın mı?\n\n#almanca #almancaöğreniyorum #deutschlernen #telaffuz #almancakelimeler #dinleme",
      outro: { series: "Yarın yeni çiftler geliyor", ask: "Hangisini kaçırdın? Yorumlara yaz." },
    },
  }),
};

export default episode;
