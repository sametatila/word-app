/* -e ile biten meyveler die; tuzak der Apfel (-e ile bitmiyor). */
const episode = {
  template: "artikel-turuncu",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-25 07:30",
  content: ({ quiz }) => ({
    items: quiz(["die Banane", "die Birne", "die Zitrone", "der Apfel"]),
    copy: {
      title: "Muz, armut, limon",
      hook: ["Muz, armut, limon…", "Üçünün artikeli aynı."],
      stamps: ["MEYVE", "MEYVE", "MEYVE", "YİNE MEYVE?"],
      rule: '-e ile biten meyve adları <i class="die">die</i> alır.<br>Apfel -e ile bitmiyor: <b class="der">der</b> Apfel.',
      endTitle: "Kaçını bildin?",
      outro: { series: "Yarın yeni bir kural geliyor", ask: "Elmada yanılan var mı? Yorumlara yaz" },
      caption: "Muz, armut ve limonun artikeli aynı. Peki elma? Kaç tane bildin?\n\n#almanca #artikel #derdiedas #deutschlernen #almancaöğreniyorum #meyveler",
    },
  }),
};

export default episode;
