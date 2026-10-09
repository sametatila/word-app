/* Oturma izni bitiyor, yabancılar dairesini arıyorsun (3 cümle). */
const episode = {
  template: "diyalog-gece",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-25 18:30",
  content: ({ line }) => ({
    lines: [
      { who: "me", key: "ablaufen" },
      { who: "them", key: "die Verlängerung" },
      { who: "me", key: "vorteilhaft" },
    ].map(line),
    copy: {
      title: "Oturma izni bitiyor, 3 cümle",
      hook: ["Oturma iznin bitiyor.", "Yabancılar dairesini arıyorsun."],
      caption: "Oturma iznin bitiyor, yabancılar dairesini arıyorsun. Bu 3 cümle işini görür. Sen randevuyu kaç hafta önceden aldın?\n\n#almanca #almanyadayaşam #deutschlernen #ausländerbehörde #aufenthaltstitel #almancaöğreniyorum",
      outro: { series: "Her hafta yeni bir durum", ask: "Sen randevuyu kaç hafta önce aldın? Yorumlara yaz" },
      callee: "Yabancılar dairesi",
      calleeTag: "YABANCILAR DAİRESİ",
      avatar: "work",
      endTitle: "Randevunu istedin.",
    },
  }),
};

export default episode;
