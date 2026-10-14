/* Almancada postayla ilgili üç kelime: paketten postacıya. */
const episode = {
  template: "kelime-gece",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-20 12:30",
  ytTitle: "Postayla ilgili 3 Almanca kelime: paket, posta ücreti, postacı #almanca #shorts",
  content: ({ deck }) => ({
    items: deck(["das Päckchen", "das Porto", "der Postbote"]),
    copy: {
      title: "Postayla ilgili 3 kelime",
      hook: ["Päckchen, Porto, Postbote…", "Hangisi posta ücreti?"],
      caption: "Postayla ilgili üç Almanca kelime: Päckchen küçük paket, Porto posta ücreti, Postbote postacı. Posta ücreti hangisiydi? Yorumlara yaz.\n\n#almanca #almanyadayaşam #deutschlernen #almancakelimeler #post #almancaöğreniyorum",
      outro: { series: "Günlük hayatta Almanca", ask: "Posta ücreti hangisiydi? Yorumlara yaz" },
      summary: "Paketten postacıya",
    },
  }),
};

export default episode;
