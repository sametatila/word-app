/* Doktor randevusu: telefonda, muayenehanede, iş yerine haber verirken (4 cümle). */
const episode = {
  template: "diyalog-kagit",
  status: "hazır",
  created: "2026-10-08",
  slot: "2026-10-13 18:30",
  content: ({ line }) => ({
    lines: [
      { scene: "phone", who: "me", key: "ändern" },
      { scene: "phone", who: "them", key: "frühestens" },
      { scene: "clinic", who: "them", key: "die Versichertenkarte" },
      { scene: "work", who: "me", key: "die Krankmeldung" },
    ].map(line),
    copy: {
      title: "Doktor randevusu, 4 cümle",
      hook: ["Almanya'da", "doktor randevusu mu?", "Bu 4 cümle yetiyor."],
      caption: "Almanya'da doktor randevusu almak için bu 4 cümle yetiyor: telefonda, muayenehanede ve iş yerine haber verirken. Kaydet, lazım olacak.\n\n#almanca #almanyadayaşam #deutschlernen #almancaöğreniyorum #arzt #termin",
      outro: { series: "Her hafta yeni bir durum", ask: "Sırada hangisi olsun? Yorumlara yaz" },
      scenes: {
        phone: { label: "Telefonda", icon: "phone" },
        clinic: { label: "Muayenehanede", icon: "clinic" },
        work: { label: "İş yerine", icon: "work", me: "Sen, iş yerine" },
      },
      them: "Sekreter",
      endTitle: "Kaydet, lazım olacak.",
      options: ["Ausländerbehörde", "Ev sahibi"],
    },
  }),
};

export default episode;
