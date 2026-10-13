/* Yavaş Almanca Hikâyeler 1: iki A2 metni. "Der Koffer, der weiterfuhr" (okuma kütüphanesi de-a2-lib-r9,
   src/lib/skills/content/library/de-a2-p9.ts) ve "Bei meinen Großeltern" (a2-u05-r2, src/lib/skills/content/a2-u05.ts).
   Paragraflar, sorular ve cevaplar kaynaktan birebir; sesler okuma katmanının kayıtları (Defne: yavaş "listenSlow",
   normal hız eksiz). Paragrafların Türkçesi ve Türkçe anlatım elle yazıldı (editör düzeltir); anlatımda Almanca yok. */
const P = (L, text, tr) => ({ slow: L("defne", "de", text, "listenSlow"), normal: L("defne", "de", text), tr });

const episode = {
  template: "hikaye",
  status: "taslak",
  created: "2026-10-14",
  slot: "2026-11-10 19:00",
  ytTitle: "Yavaş Almanca hikâyeler (A2): kaybolan valiz ve büyükannemlerde · Türkçe çevirili",
  content: ({ L, walk }) => ({
    series: "Yavaş Almanca Hikâyeler",
    ep: "A2 · iki hikâye",
    hook: {
      chap: "Nasıl dinlenir",
      lab: "A2 · yavaş okuma · Türkçe çevirili",
      lines: ["Yavaş Almanca", "hikâyeler"],
      sub: "Önce kelimeler, sonra yavaş okuma, sorular ve normal hız.",
      pills: ["Kelimeler", "Yavaş okuma", "Sorular"],
      say: L("defne", "tr", "Yavaş okunan Almanca hikâyeler. Önce kelimeler, sonra hikâye paragraf paragraf ve yavaş, ardından sorular. En sonda hikâyeyi normal hızda dinleyeceksin. Bugün iki hikâye var."),
    },
    wordsSay: L("defne", "tr", "Önce bu hikâyenin kelimeleri."),
    quizSay: L("defne", "tr", "Şimdi sorular. Her soruda beş saniyen var."),
    fullSay: L("defne", "tr", "Şimdi hikâyenin tamamını normal hızda dinle."),
    stories: [
      {
        title: "Der Koffer, der weiterfuhr",
        titleTr: "Yola devam eden valiz",
        lv: "A2",
        say: L("defne", "tr", "Birinci hikâye: yola devam eden valiz. Bir yolculukta valiz kayboluyor, sonra beklenmedik bir yerden çıkıyor."),
        words: ["der Koffer", "umsteigen", "die Hochzeit", "der Schaffner", "das Fundbüro", "abgeben", "der Anzug", "peinlich"].map((w) => walk(w)),
        paras: [
          P(L, "Im Mai bin ich mit dem Zug zu einer Hochzeit nach Dresden gefahren. In Leipzig musste ich umsteigen. Der Anschlusszug stand schon da und ich hatte nur vier Minuten.", "Mayısta trenle Dresden'e bir düğüne gittim. Leipzig'de aktarma yapmam gerekiyordu. Aktarma treni çoktan oradaydı ve yalnız dört dakikam vardı."),
          P(L, "Ich bin gerannt, bin eingestiegen und habe mich gefreut. Dann habe ich gemerkt: Mein Koffer stand noch im anderen Zug.", "Koştum, bindim ve sevindim. Sonra fark ettim: Valizim hâlâ öteki trendeydi."),
          P(L, "Der Schaffner war sehr ruhig. „Das passiert oft“, hat er gesagt und telefoniert. Eine halbe Stunde später wusste er, dass ein Mitarbeiter den Koffer in Dresden abgegeben hatte.", "Kondüktör çok sakindi. “Bu sık olur” dedi ve telefon etti. Yarım saat sonra bir görevlinin valizi Dresden'de teslim ettiğini öğrendi."),
          P(L, "Am Abend bin ich zum Fundbüro gegangen. Der Koffer war da, aber er war offen. Eine Frau hatte ihn geöffnet, weil sie meinen Namen suchen wollte. Sie hat mir eine Nachricht hineingelegt: „Schöne Hochzeit! Ihr Anzug hängt jetzt ordentlich.“", "Akşam kayıp eşya bürosuna gittim. Valiz oradaydı ama açıktı. Bir kadın adımı bulmak için açmıştı. İçine bir not bırakmıştı: “İyi düğünler! Takım elbiseniz artık düzgünce asılı.”"),
          P(L, "Das war mir ein bisschen peinlich. Aber der Anzug war wirklich nicht mehr geknittert.", "Bu beni biraz utandırdı. Ama takım elbise gerçekten artık buruşuk değildi."),
        ],
        questions: [
          { q: "Warum ist der Koffer nicht mitgefahren?", opts: ["Die Erzählerin hat ihn im ersten Zug vergessen.", "Jemand hat ihn gestohlen.", "Der Schaffner hat ihn ausgeladen."], ans: 0, say: L("defne", "tr", "Doğru cevap a. Aktarmada yalnız dört dakikası vardı; koşup bindi ve valiz öteki trende kaldı.") },
          { q: "Wie hat der Schaffner reagiert?", opts: ["Er war ärgerlich.", "Er war ruhig und hat geholfen.", "Er hat nichts gesagt."], ans: 1, say: L("defne", "tr", "Doğru cevap b. Kondüktör çok sakindi; telefon etti ve valizi buldu.") },
          { q: "Der Koffer war am Abend noch im Zug.", opts: ["Richtig", "Falsch"], ans: 1, say: L("defne", "tr", "Yanlış. Bir görevli valizi Dresden'de teslim etmişti; akşam kayıp eşya bürosundaydı.") },
          { q: "Wie endet die Geschichte?", opts: ["Der Anzug war kaputt.", "Der Koffer ist verschwunden.", "Der Anzug war ordentlich aufgehängt."], ans: 2, say: L("defne", "tr", "Doğru cevap c. Notta takım elbisenin düzgünce asıldığı yazıyor; gerçekten de artık buruşuk değil.") },
        ],
      },
      {
        title: "Bei meinen Großeltern",
        titleTr: "Büyükannemlerde",
        lv: "A2",
        say: L("defne", "tr", "İkinci hikâye: büyükannemlerde. Bir çocukluk anısı; o evde neler vardı, kim nasıl biriydi?"),
        words: ["die Großeltern", "das Enkelkind", "der Kamin", "der Topf", "backen", "der Teig", "die Schüssel", "erben"].map((w) => walk(w)),
        paras: [
          P(L, "In den Sommerferien war ich immer bei meinen Großeltern auf dem Land. Sie hatten sieben Enkelkinder, aber ich war das einzige, das jedes Jahr blieb.", "Yaz tatillerinde hep köydeki büyükannemle büyükbabamın yanındaydım. Yedi torunları vardı ama her yıl kalan tek torun bendim."),
          P(L, "Bei ihnen gab es einen alten Kamin im Wohnzimmer. Im Juli hat ihn natürlich niemand angemacht, aber er hat immer nach Holz gerochen. In der Küche stand ein sehr großer Topf, und am Freitag hat meine Großmutter darin Suppe gekocht.", "Oturma odalarında eski bir şömine vardı. Temmuzda elbette kimse yakmazdı ama hep odun kokardı. Mutfakta çok büyük bir tencere dururdu; cuma günleri büyükannem onda çorba pişirirdi."),
          P(L, "Am liebsten habe ich beim Backen geholfen. Ich durfte den Teig rühren, und danach durfte ich die Schüssel auslecken.", "En çok hamur işlerinde yardım etmeyi severdim. Hamuru karıştırmama izin verilirdi, sonra da kâseyi yalayabilirdim."),
          P(L, "Reich waren sie nicht. Sie haben fünf Kinder allein großgezogen. Aber sie waren die liebevollsten Menschen, die ich gekannt habe. Später habe ich von ihnen das kleine Haus geerbt.", "Zengin değillerdi. Beş çocuğu tek başlarına büyüttüler. Ama tanıdığım en sevgi dolu insanlardı. Sonra küçük evi onlardan miras aldım."),
        ],
        questions: [
          { q: "Wie viele Enkelkinder hatten die Großeltern?", opts: ["Fünf", "Sieben", "Eins"], ans: 1, say: L("defne", "tr", "Doğru cevap b, yedi. Beş, kendi çocuklarının sayısı.") },
          { q: "Was hat der Autor beim Backen gemacht?", opts: ["Den Teig gerührt", "Die Suppe gekocht", "Den Kamin angemacht"], ans: 0, say: L("defne", "tr", "Doğru cevap a: hamuru karıştırdı. Çorbayı büyükanne pişiriyordu; şömineyi de yazın kimse yakmıyordu.") },
          { q: "Die Großeltern waren nicht reich.", opts: ["Richtig", "Falsch"], ans: 0, say: L("defne", "tr", "Doğru. Zengin değillerdi; beş çocuğu tek başlarına büyüttüler.") },
        ],
      },
    ],
    app: {
      lab: "Lernomi'de",
      title: "Okuma kütüphanesi seviyene göre.",
      body: "Her metin yavaş ve normal hızda dinlenir; sonunda anlama soruları var.",
      where: "Okuma · A2",
      link: "Bağlantı açıklamada",
      panel: { title: "Okuma kütüphanesi", lv: "A2", rows: [["Der Koffer, der weiterfuhr", "5 dk"], ["Bei meinen Großeltern", "4 dk"], ["Seit einem Monat …", "5 dk"]], slow: "Yavaş", normal: "Normal" },
      say: L("defne", "tr", "Bu hikâyeler ve daha fazlası Lernomi'nin okuma kütüphanesinde; her metni yavaş ve normal hızda dinleyebilirsin. Bağlantı açıklamada."),
    },
    end: {
      lab: "Sıradaki",
      line: "Hangisini daha kolay anladın?",
      ask: "Yorumlara yaz; sıradaki hikâyeyi de sen seç.",
      sub: "Her salı ve cuma yeni video",
      slot: "Sıradaki video",
      say: L("defne", "tr", "Hangi hikâyeyi daha kolay anladın? Yorumlara yaz; bir sonraki hikâyeyi de sen seç."),
    },
    cover: { lab: "A2 · yavaş okuma · Türkçe çevirili", lines: ["Yavaş", "Almanca"], pill: "2 hikâye · sorularıyla" },
    yt: {
      desc: "Yavaş okunan iki A2 Almanca hikâye: kaybolan valiz (Der Koffer, der weiterfuhr) ve büyükannemlerde (Bei meinen Großeltern). Önce kelimeler, sonra paragraf paragraf yavaş okuma ve Türkçe çevirisi, anlama soruları ve en sonda normal hızda baştan sona.",
      tags: "#almanca #almancahikaye #almancadinleme #a2almanca",
    },
    ui: {},
  }),
};
export default episode;
