/* İstasyonda tren gecikiyor: üç anons ve senin cümlen. */
const episode = {
  template: "diyalog-lacivert",
  status: "hazır",
  created: "2026-10-08",
  slot: "2026-10-15 18:30",
  content: ({ line }) => ({
    lines: [
      { who: "them", key: "sich verspäten", board: "+20 MIN" },
      { who: "them", key: "die Störung", board: "FÄLLT AUS" },
      { who: "them", key: "das Verständnis", board: "FÄLLT AUS" },
      { who: "me", key: "stundenlang", board: "FÄLLT AUS" },
    ].map(line),
    copy: {
      title: "Tren gecikti, 4 cümle",
      hook: ["Trenin gecikti.", "Anonsu anlayacak mısın?"],
      caption: "Trenin gecikti, anonsu anlayacak mısın? İstasyonda duyacağın 4 cümle. Senin trenin en çok kaç dakika gecikti?\n\n#almanca #almanyadayaşam #deutschlernen #deutschebahn #almancaöğreniyorum #tren",
      outro: { series: "Her hafta yeni bir durum", ask: "Senin trenin en çok kaç dakika gecikti?" },
      board: { time: "14:32", dest: "KÖLN", track: " 3" },
      them: "ANONS",
      recapTitle: "Anonslarda duyacağın kelimeler",
      endTitle: "Tren gecikti ama sen anladın.",
    },
  }),
};

export default episode;
