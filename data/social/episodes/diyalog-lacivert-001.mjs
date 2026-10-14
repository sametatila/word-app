/* İstasyonda tren gecikiyor: üç anons ve senin cümlen. */
const episode = {
  template: "diyalog-lacivert",
  status: "hazır",
  created: "2026-10-08",
  slot: "2026-10-15 18:30",
  ytTitle: "Almanca tren anonsları: gecikme ve iptali anlayabiliyor musun? #almanca #shorts",
  content: ({ line }) => ({
    lines: [
      { who: "them", key: "sich verspäten", board: "+20 MIN" },
      { who: "them", key: "die Störung", board: "FÄLLT AUS" },
      { who: "them", key: "das Verständnis", board: "FÄLLT AUS" },
      { who: "me", key: "stundenlang", board: "FÄLLT AUS" },
    ].map(line),
    copy: {
      title: "Trenle ilgili 4 cümle",
      hook: ["Trenin gecikti ya da iptal oldu.", "Anonsu anlayacak mısın?"],
      caption: "Almanca tren anonsları: gecikme, iptal ve anlayış istemek için üç ayrı örnek. Son cümlede ise ne kadar beklediğini sen söylüyorsun. Trenin en fazla ne kadar gecikti?\n\n#almanca #almanyadayaşam #deutschlernen #deutschebahn #almancaöğreniyorum #tren",
      outro: { series: "Her hafta yeni bir durum", ask: "Trenin en fazla ne kadar gecikti?" },
      board: { time: "14:32", dest: "KÖLN", track: " 3" },
      them: "ANONS",
      recapTitle: "Anonslarda duyacağın kelimeler",
      endTitle: "Gecikme ve iptal için 4 cümle.",
    },
  }),
};

export default episode;
