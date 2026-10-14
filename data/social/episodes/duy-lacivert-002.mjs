/* Yumuşak mı, sert mi: Gebäck/Gepäck, singen/sinken, streichen/streiken. */
const episode = {
  template: "duy-lacivert",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-24 07:30",
  ytTitle: "Gebäck mi, Gepäck mi? Almanca ünsüzleri ayırt et #almanca #shorts",
  content: ({ pair }) => ({
    rounds: [pair("das Gebäck", "das Gepäck", 1), pair("singen", "sinken", 1), pair("streichen", "streiken", 0)],
    copy: {
      title: "Gebäck mi, Gepäck mi?",
      hook: ["Gebäck mi, Gepäck mi?", "B mi P mi, G mi K mi?"],
      recap: "Kaçını yakaladın?",
      caption: "Almanca dinleme testi: Gebäck/Gepäck, singen/sinken, streichen/streiken. Gebäck hamur işi, Gepäck bagaj. Gebäck ile Gepäck'i ayırt edebildin mi?\n\n#almanca #almancaöğreniyorum #deutschlernen #telaffuz #almancakelimeler #dinleme",
      outro: { series: "Almanca dinleme alıştırmaları", ask: "Gebäck ile Gepäck'i ayırt edebildin mi?" },
    },
  }),
};

export default episode;
