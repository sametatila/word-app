/* Kalorifer bozuldu, ev sahibini arıyorsun (3 cümle). */
const episode = {
  template: "diyalog-gece",
  status: "hazır",
  created: "2026-10-08",
  slot: "2026-10-14 18:30",
  content: ({ line }) => ({
    lines: [
      { who: "me", key: "die Heizung" },
      { who: "me", key: "zuständig" },
      { who: "them", key: "die Nebenkosten" },
    ].map(line),
    copy: {
      title: "Kalorifer bozuldu, 3 cümle",
      hook: ["Kalorifer bozuldu.", "Ev sahibini arıyorsun."],
      caption: "Kalorifer bozuldu, ev sahibini arıyorsun. Bu 3 cümle yetiyor. Senin ev sahibin ne dedi?\n\n#almanca #almanyadayaşam #deutschlernen #almancaöğreniyorum #vermieter #kiracı",
      outro: { series: "Her hafta yeni bir durum", ask: "Senin ev sahibin ne dedi? Yorumlara yaz" },
      callee: "Ev sahibi",
      calleeTag: "EV SAHİBİ",
      avatar: "home",
      endTitle: "3 cümlede hallettin.",
    },
  }),
};

export default episode;
