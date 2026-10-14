/* -tion ile biten 4 kelime, hepsi die (kural sonda açılır). */
const episode = {
  template: "artikel-kagit",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-20 07:30",
  ytTitle: "Almancada -tion ile biten 4 ismin artikeli ne? #almanca #shorts",
  content: ({ quiz }) => ({
    items: quiz(["die Information", "die Situation", "die Portion", "die Rezeption"]),
    copy: {
      title: "-tion ile biten 4 kelime",
      hook: ["Otelde, lokantada, sokakta…", "Bu 4 kelimenin artikeli ne?"],
      pill: "-tion sonuna dikkat.",
      suffix: "tion",
      rule: { kicker: "Yakaladın mı?", text: "<i>-tion</i> ile biten kelimeler<br>hep <i>die</i> alır.", examples: "die Information, die Situation, die Portion…" },
      endKicker: "Kural",
      outro: { series: "Almanca artikel alıştırmaları", ask: "Bildiğin bir -tion kelimesini yorumlara yaz" },
      caption: "Almanca artikel alıştırması: Information, Situation, Portion, Rezeption. -tion ile biten bu dört ismin artikeli aynı. Bildiğin bir -tion kelimesini yorumlara yaz.\n\n#almanca #artikel #derdiedas #deutschlernen #almancaöğreniyorum #almancagramer",
    },
  }),
};

export default episode;
