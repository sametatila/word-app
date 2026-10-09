/* Almanya'da paket gönderirken 3 adım: paketten postacıya. */
const episode = {
  template: "kelime-gece",
  status: "hazır",
  created: "2026-10-09",
  slot: "2026-10-20 12:30",
  content: ({ deck }) => ({
    items: deck(["das Päckchen", "das Porto", "der Postbote"]),
    copy: {
      title: "Paket gönderirken, 3 adımda",
      hook: ["Almanya'da paket gönderirken,", "3 adım."],
      caption: "Almanya'da paket gönderirken 3 adım: küçük paket, posta ücreti, postacı. Hangisini ilk kez duydun?\n\n#almanca #almanyadayaşam #deutschlernen #almancakelimeler #post #almancaöğreniyorum",
      outro: { series: "Yarın 3 kelime daha", ask: "Paketin hiç komşuya bırakıldı mı?" },
      summary: "Paketten postacıya",
    },
  }),
};

export default episode;
