/* Havalimanında kapıda: biniş anonsu, bagaj ücreti ve senin cümlen. */
const episode = {
  template: "diyalog-lacivert",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-19 18:30",
  content: ({ line }) => ({
    lines: [
      { who: "them", key: "der Passagier", board: "BOARDING" },
      { who: "them", key: "zusätzlich", board: "GEPÄCK", alert: true },
      { who: "me", key: "das Handgepäck", board: "GEPÄCK", alert: true },
    ].map(line),
    copy: {
      title: "Havalimanında, 3 cümle",
      hook: ["Uçağa biniyorsun.", "Kapıdaki anonsu anlayacak mısın?"],
      caption: "Uçağa biniyorsun, kapıdaki anonsu anlayacak mısın? Havalimanında duyacağın 3 cümle. Türkiye'ye en son ne zaman uçtun?\n\n#almanca #almanyadayaşam #deutschlernen #flughafen #almancaöğreniyorum #havalimanı",
      outro: { series: "Her hafta yeni bir durum", ask: "Türkiye'ye uçacak arkadaşına gönder" },
      board: { time: "07:45", dest: "ISTANBUL", track: "B12" },
      boardLabels: ["ZEIT", "ZIEL", "GATE", "HINWEIS"],
      them: "GÖREVLİ",
      recapTitle: "Kapıda duyacağın kelimeler",
      endTitle: "Uçağa yetiştin.",
    },
  }),
};

export default episode;
