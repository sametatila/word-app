/* Eczanede: derdini anlatıyorsun, eczacı reçetesiz ilacı ve nasıl alınacağını söylüyor (3 cümle). */
const episode = {
  template: "diyalog-turuncu",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-23 18:30",
  content: ({ line }) => ({
    lines: [
      { who: "me", key: "die Kopfschmerzen" },
      { who: "them", key: "rezeptfrei" },
      { who: "them", key: "einnehmen" },
    ].map(line),
    copy: {
      title: "Eczanede, 3 cümle",
      hook: ["Eczanedesin.", "Bu 3 cümleyi anlayacaksın."],
      caption: "Başın ağrıyor, eczanedesin. Eczacıdan duyacağın cümleler: reçetesiz ve günde üç kez. Kaydet, lazım olur.\n\n#almanca #almanyadayaşam #deutschlernen #almancaöğreniyorum #apotheke #eczane",
      outro: { series: "Her hafta yeni bir durum", ask: "Almanya'daki arkadaşına gönder, lazım olur" },
      them: "ECZACI",
      receiptNo: "APOTHEKE",
      receiptTitle: "Eczanede",
      saveLine: "Kaydet, eczanede işine yarar.",
      endTitle: "Bugünün 3 kelimesi",
    },
  }),
};

export default episode;
