/* Tasse/Taste, Knopf/Kopf, froh/früh, Bank/Band. */
const episode = {
  template: "duy-lacivert",
  status: "hazır",
  created: "2026-10-08",
  slot: "2026-10-13 07:30",
  content: ({ pair }) => ({
    rounds: [pair("die Tasse", "die Taste", 1), pair("der Knopf", "der Kopf", 0), pair("froh", "früh", 1), pair("die Bank", "die Band", 0)],
    copy: {
      title: "Frekansı yakala",
      hook: ["Frekansı yakala.", "Hangisini duydun?"],
      recap: "Kaç tanesini yakaladın?",
      caption: "Frekansı yakala: tek harfle değişen dört kelime çifti. Hepsini ilk seferde duyabildin mi?\n\n#almanca #almancaöğreniyorum #deutschlernen #telaffuz #almancakelimeler #dinleme",
      outro: { series: "Yarın yeni çiftler geliyor", ask: "Hangisini kaçırdın? Yorumlara yaz." },
    },
  }),
};

export default episode;
