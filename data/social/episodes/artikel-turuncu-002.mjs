/* -e ile biten meyveler die; tuzak der Apfel (-e ile bitmiyor). */
const episode = {
  template: "artikel-turuncu",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-25 07:30",
  ytTitle: "Almanca meyve adları: muz, armut, limon ve elmanın artikeli #almanca #shorts",
  content: ({ quiz }) => ({
    items: quiz(["die Banane", "die Birne", "die Zitrone", "der Apfel"]),
    copy: {
      title: "Muz, armut, limon",
      hook: ["Muz, armut, limon…", "Üçünün artikeli aynı."],
      stamps: ["MEYVE", "MEYVE", "MEYVE", "PEKİ ELMA?"],
      rule: '-e ile biten meyve adları <i class="die">die</i> alır.<br>Apfel -e ile bitmiyor: <b class="der">der</b> Apfel.',
      endTitle: "Kaçını bildin?",
      outro: { series: "Almanca artikel alıştırmaları", ask: "Apfel'in artikelini biliyor muydun?" },
      caption: "Meyvelerle Almanca artikel testi: Banane, Birne, Zitrone ve Apfel. İlk üçü die alıyor. Apfel'in artikelini biliyor muydun?\n\n#almanca #artikel #derdiedas #deutschlernen #almancaöğreniyorum #meyveler",
    },
  }),
};

export default episode;
