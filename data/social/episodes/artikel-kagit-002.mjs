/* -tion ile biten 4 kelime, hepsi die (kural sonda açılır). */
const episode = {
  template: "artikel-kagit",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-20 07:30",
  content: ({ quiz }) => ({
    items: quiz(["die Information", "die Situation", "die Portion", "die Rezeption"]),
    copy: {
      title: "-tion ile biten 4 kelime",
      hook: ["Otelde, lokantada, sokakta…", "Bu 4 kelimenin artikeli ne?"],
      pill: "Dördünün ortak bir sırrı var.",
      suffix: "tion",
      rule: { kicker: "Yakaladın mı?", text: "<i>-tion</i> ile biten kelimeler<br>hep <i>die</i> alır.", examples: "die Information, die Situation, die Portion…" },
      endKicker: "Kural",
      outro: { series: "Yarın yeni bir kural geliyor", ask: "Aklına gelen -tion kelimelerini yaz" },
      caption: "Otelde, lokantada, sokakta karşına çıkan 4 kelime. Hepsinin ortak bir sırrı var, yakaladın mı? Aklına gelen başka -tion kelimelerini yorumlara yaz.\n\n#almanca #artikel #derdiedas #deutschlernen #almancaöğreniyorum #almancagramer",
    },
  }),
};

export default episode;
