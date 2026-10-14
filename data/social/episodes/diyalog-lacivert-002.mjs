/* Havalimanında kapıda: biniş anonsu, bagaj ücreti ve senin cümlen. */
const episode = {
  template: "diyalog-lacivert",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-19 18:30",
  ytTitle: "Havalimanında Almanca: biniş kapısı ve bagajla ilgili 3 cümle #almanca #shorts",
  content: ({ line }) => ({
    lines: [
      { who: "them", key: "der Passagier", board: "BOARDING" },
      { who: "them", key: "zusätzlich", board: "GEPÄCK", alert: true },
      { who: "me", key: "das Handgepäck", board: "GEPÄCK", alert: true },
    ].map(line),
    copy: {
      title: "Havalimanında, 3 cümle",
      hook: ["Uçağa biniyorsun.", "Kapıdaki anonsu anlayacak mısın?"],
      caption: "Havalimanında geçen üç Almanca cümle: biniş kapısına gitmek, ek bagaj ücreti ve yalnız el bagajıyla seyahat ettiğini söylemek. Türkiye'ye uçacak arkadaşına gönder.\n\n#almanca #almanyadayaşam #deutschlernen #flughafen #almancaöğreniyorum #havalimanı",
      outro: { series: "Her hafta yeni bir durum", ask: "Türkiye'ye uçacak arkadaşına gönder" },
      board: { time: "07:45", dest: "ISTANBUL", track: "B12" },
      boardLabels: ["ZEIT", "ZIEL", "GATE", "HINWEIS"],
      them: "GÖREVLİ",
      recapTitle: "Kapıda duyacağın kelimeler",
      endTitle: "Kapıda geçen 3 cümle.",
    },
  }),
};

export default episode;
