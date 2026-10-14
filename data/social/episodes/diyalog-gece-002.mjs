/* Oturma izni bitiyor, yabancılar dairesini arıyorsun (3 cümle). */
const episode = {
  template: "diyalog-gece",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-25 18:30",
  ytTitle: "Almanca izin ve vize uzatma konuşmalarında geçen 3 cümle #almanca #shorts",
  content: ({ line }) => ({
    lines: [
      { who: "me", key: "ablaufen" },
      { who: "them", key: "die Verlängerung" },
      { who: "me", key: "vorteilhaft" },
    ].map((l) => (l.key === "vorteilhaft" ? { ...line(l), tr: "Bizim için daha erken bir randevu daha uygun olurdu." } : line(l))),
    copy: {
      title: "Oturma izni bitiyor, 3 cümle",
      hook: ["İznin veya vizen bitiyor.", "Yabancılar dairesini arıyorsun."],
      caption: "Almanca izin ve vize uzatma konuşmalarında geçen üç örnek cümle: sürenin dolması, gereken belgeler ve daha erken bir randevu. Randevunu kaç hafta önceden aldın?\n\n#almanca #almanyadayaşam #deutschlernen #ausländerbehörde #aufenthaltstitel #almancaöğreniyorum",
      outro: { series: "Her hafta yeni bir durum", ask: "Randevunu kaç hafta önceden aldın?" },
      callee: "Yabancılar dairesi",
      calleeTag: "YABANCILAR DAİRESİ",
      avatar: "work",
      endTitle: "İzin ve vize uzatma için 3 cümle.",
    },
  }),
};

export default episode;
