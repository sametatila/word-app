/* Almanya'da Günlük Hayat 1: Ausländerbehörde, oturma izni uzatma. Kaynak Patika konuşması de-b1-auslaenderbehoerde
   (src/lib/conversations/content/de-b1-b05.ts): kalıplar, "sıra sende" cümleleri (Defne'nin kayıtlı sesi: başvuranın
   satırları), doğru/yanlış ve memurun açılış cümlesi. Memurun öteki cümleleri ve Türkçe anlatım elle yazıldı (editör
   düzeltir); memur Aras. Kelimeler words.json'dan. */
const episode = {
  template: "gunluk",
  status: "taslak",
  created: "2026-10-14",
  slot: "2026-10-27 19:00",
  ytTitle: "Ausländerbehörde'de Almanca: oturma izni uzatma konuşması ve memurun 3 kalıbı",
  content: ({ L, walk }) => ({
    series: "Almanya'da Günlük Hayat",
    ep: "Ausländerbehörde",
    hook: {
      chap: "Memurun dili",
      lab: "B1 · Resmî işler · oturma izni",
      lines: ["Ausländerbehörde'de", "her cümle", "aynı kalıptan."],
      sub: "Kalıbı bil, memuru anla.",
      ticket: { office: "AUSLÄNDERBEHÖRDE", label: "Ihre Nummer", num: "A 127", rows: [["Raum", "2.14"], ["Termin", "09:30"], ["Anliegen", "Verlängerung"]] },
      say: L("defne", "tr", "Yabancılar dairesinde duyacağın hemen her cümle edilgen ve birkaç kalıptan çıkıyor. Bu videoda memurun dilini çözüyoruz; sonunda konuşmayı sen yapacaksın."),
    },
    vocab: [
      {
        title: "Önce kelimeler",
        sub: "12 kelime · örnek cümleyle",
        say: L("defne", "tr", "Önce kelimeler. Her birini duyunca sen de yüksek sesle söyle."),
        words: ["die Ausländerbehörde", "die Aufenthaltserlaubnis", "ablaufen", "verlängern", "der Antrag", "beantragen", "die Unterlagen", "benötigen", "vorlegen", "bearbeiten", "die Gebühr", "die Frist"].map((w) => walk(w)),
      },
      {
        title: "Belgeler ve formlar",
        sub: "10 kelime · masada istenenler",
        say: L("defne", "tr", "Şimdi belgeler. Memurun masasında en çok istenen on kelime."),
        words: ["der Reisepass", "die Meldebescheinigung", "die Krankenkasse", "das Einkommen", "das Formular", "ausfüllen", "die Kopie", "das Original", "mitbringen", "abgeben"].map((w) => walk(w)),
      },
    ],
    patterns: [
      {
        lab: "resmî dilde “gerekiyor”",
        title: "Kalıp 1: Es werden … benötigt",
        tiles: [["Es", "sahte özne", "yer tutar"], ["werden", "yardımcı fiil", "çoğul: özneye uyar"], ["Unterlagen", "asıl özne", "belgeler"], ["benötigt.", "ortaç", "en sonda"]],
        say: L("defne", "tr", "Birinci kalıp. Cümlenin başındaki kelime sahte bir öznedir, yalnız yer tutar. Asıl özne belgeler; bu yüzden yardımcı fiil çoğul çekilir. Ortaç en sona gider."),
        ex: L("defne", "de", "Es werden Unterlagen benötigt."),
        exTr: "Belgeler gerekiyor.",
        more: [
          { line: L("defne", "de", "Welche Unterlagen werden benötigt?"), tr: "Hangi belgeler gerekiyor?" },
          { line: L("defne", "de", "Es werden zwei Fotos benötigt."), tr: "İki fotoğraf gerekiyor." },
        ],
      },
      {
        lab: "işi kimin yaptığı söylenmez",
        title: "Kalıp 2: wird + ortaç",
        tiles: [["Ihr Antrag", "özne", "başvurunuz"], ["wird", "yardımcı fiil", "tekil özne"], ["noch", "zarf", "hâlâ"], ["bearbeitet.", "ortaç", "en sonda"]],
        say: L("defne", "tr", "İkinci kalıp: edilgen. Memur işi kimin yaptığını söylemez; önemli olan işin kendisi. Özne tekilse yardımcı fiil de tekil, ortaç yine en sonda."),
        ex: L("defne", "de", "Ihr Antrag wird noch bearbeitet."),
        exTr: "Başvurunuz hâlâ işleme alınıyor.",
        more: [
          { line: L("defne", "de", "Die Unterlagen werden geprüft."), tr: "Belgeler kontrol ediliyor." },
          { line: L("defne", "de", "Der Antrag wird innerhalb von vier Wochen bearbeitet."), tr: "Başvuru dört hafta içinde işleme alınır." },
        ],
      },
      {
        lab: "zorunluluk + edilgen",
        title: "Kalıp 3: muss … werden",
        tiles: [["Der Pass", "özne", "pasaport"], ["muss", "modal fiil", "ikinci sırada"], ["vorgelegt", "ortaç", "ibraz edilmiş"], ["werden.", "yardımcı fiil", "mastar, en sonda"]],
        say: L("defne", "tr", "Üçüncü kalıp: zorunluluk ve edilgen birlikte. Modal fiil ikinci sırada çekimlenir; ortaç ve yardımcı fiil mastar hâliyle en sona gider."),
        ex: L("defne", "de", "Der Pass muss vorgelegt werden."),
        exTr: "Pasaport ibraz edilmeli.",
        more: [
          { line: L("defne", "de", "Das Formular muss unterschrieben werden."), tr: "Formun imzalanması gerekiyor." },
          { line: L("defne", "de", "Der Antrag muss persönlich abgegeben werden."), tr: "Başvuru şahsen teslim edilmeli." },
        ],
      },
    ],
    dialog: {
      sub: "Ausländerbehörde · Verlängerung",
      say: L("defne", "tr", "Şimdi konuşmanın tamamını dinle. Altyazıda Türkçesi de var."),
      again: L("defne", "tr", "Bir kez daha dinle; bu sefer altyazı yok, yalnız kulağına güven."),
      lines: [
        { who: "memur", line: L("aras", "de", "Guten Tag. Sie haben einen Termin zur Verlängerung. Worum geht es genau?"), tr: "İyi günler. Uzatma için randevunuz var. Tam olarak konu nedir?" },
        { who: "sen", line: L("defne", "de", "Meine Aufenthaltserlaubnis läuft im Mai ab."), tr: "Oturma iznim mayısta doluyor." },
        { who: "memur", line: L("aras", "de", "Gut. Für die Verlängerung werden einige Unterlagen benötigt."), tr: "Peki. Uzatma için bazı belgeler gerekiyor." },
        { who: "sen", line: L("defne", "de", "Welche Unterlagen werden benötigt?"), tr: "Hangi belgeler gerekiyor?" },
        { who: "memur", line: L("aras", "de", "Der Pass muss vorgelegt werden. Außerdem brauchen wir ein aktuelles Foto."), tr: "Pasaportun ibraz edilmesi gerekiyor. Ayrıca güncel bir fotoğraf lazım." },
        { who: "sen", line: L("defne", "de", "Wie lange dauert die Bearbeitung?"), tr: "İşlem ne kadar sürüyor?" },
        { who: "memur", line: L("aras", "de", "Der Antrag wird innerhalb von vier Wochen bearbeitet."), tr: "Başvuru dört hafta içinde işleme alınır." },
        { who: "sen", line: L("defne", "de", "Muss ich eine Gebühr bezahlen?"), tr: "Bir ücret ödemem gerekiyor mu?" },
        { who: "memur", line: L("aras", "de", "Ja, die Gebühr wird heute hier bezahlt."), tr: "Evet, ücret bugün burada ödeniyor." },
        { who: "sen", line: L("defne", "de", "Vielen Dank für die Informationen."), tr: "Bilgiler için çok teşekkürler." },
        { who: "memur", line: L("aras", "de", "Gern. Sie werden informiert, wenn die Karte fertig ist."), tr: "Rica ederim. Kart hazır olunca size haber verilecek." },
      ],
    },
    explain: {
      say: L("defne", "tr", "Şimdi memurun cümlelerini tek tek açalım."),
      items: [
        { at: 2, mark: "werden einige Unterlagen benötigt", tag: "Kalıp 1", note: "Başta sahte özne yok ama kalıp aynı: çoğul özne, ortaç sonda.", say: L("defne", "tr", "Burada başta sahte özne yok, ama kalıp aynı: belgeler çoğul, ortaç en sonda.") },
        { at: 4, mark: "muss vorgelegt werden", tag: "Kalıp 3", note: "Zorunluluk ve edilgen birlikte: pasaport getirilmeli.", say: L("defne", "tr", "Zorunluluk ve edilgen birlikte: pasaportun getirilmesi gerekiyor.") },
        { at: 6, mark: "wird innerhalb von vier Wochen bearbeitet", tag: "Kalıp 2", note: "Süre cümlenin ortasında, ortaç en sonda.", say: L("defne", "tr", "Süre bilgisi cümlenin ortasında, ortaç yine en sonda. Dört hafta, yaklaşık bir ay.") },
        { at: 8, mark: "wird heute hier bezahlt", tag: "Kalıp 2", note: "Kimin ödediği söylenmiyor ama belli: sen ödüyorsun.", say: L("defne", "tr", "Kimin ödediği söylenmiyor, ama belli: ücreti sen ödüyorsun.") },
        { at: 10, mark: "Sie werden informiert", tag: "Kalıp 2", note: "Size haber verilecek: resmî mektuplarda da çok sık.", say: L("defne", "tr", "Size haber verilecek. Bu kalıbı resmî mektuplarda da çok göreceksin.") },
      ],
    },
    roleplay: {
      sub: "Senin satırların sessiz",
      say: L("defne", "tr", "Şimdi sıra sende. Senin satırların sessiz: Türkçesini oku, dört saniye içinde Almancasını söyle, sonra doğrusunu dinle."),
    },
    quiz: {
      say: L("defne", "tr", "Son olarak üç cümle. Doğru mu, yanlış mı?"),
      items: [
        { text: "Die Unterlagen wird geprüft.", ok: false, fix: "Die Unterlagen werden geprüft.", say: L("defne", "tr", "Yanlış. Özne çoğul, yardımcı fiil de çoğul olmalı.") },
        { text: "Der Antrag wird bearbeitet.", ok: true, fix: "", say: L("defne", "tr", "Doğru. Tekil özne, tekil yardımcı fiil; ortaç en sonda.") },
        { text: "Der Pass muss vorlegen werden.", ok: false, fix: "Der Pass muss vorgelegt werden.", say: L("defne", "tr", "Yanlış. Edilgende mastar değil, ortaç kullanılır.") },
      ],
    },
    pocket: {
      title: "Cep kartı",
      sub: "Yabancılar dairesine gitmeden önce bir kez oku.",
      say: L("defne", "tr", "Cep kartı burada: ekran görüntüsü al, randevudan önce bir kez oku."),
      rows: [
        ["Es werden Unterlagen benötigt.", "Belgeler gerekiyor."],
        ["Welche Unterlagen werden benötigt?", "Hangi belgeler gerekiyor?"],
        ["Der Pass muss vorgelegt werden.", "Pasaport ibraz edilmeli."],
        ["Wie lange dauert die Bearbeitung?", "İşlem ne kadar sürüyor?"],
        ["Der Antrag wird bearbeitet.", "Başvuru işleme alınıyor."],
        ["Sie werden informiert.", "Size haber verilecek."],
      ],
    },
    app: {
      lab: "Lernomi'de",
      title: "Bu konuşmayı memurla kendin yap.",
      body: "Yapay zekâ memur rolünde cevap verir; yanlışını konuşmanın içinde düzeltir.",
      where: "Patika · Bürokrasi",
      link: "Bağlantı açıklamada",
      panel: { them: "Guten Tag. Sie haben einen Termin zur Verlängerung. Worum geht es genau?", me: "Welche Unterlagen wird benötigt?", fix: "Düzeltme: wird → werden" },
      say: L("defne", "tr", "Uygulamada bu konuşmayı bir memurla kendin yapabilirsin; yapay zekâ yanlışını konuşmanın içinde düzeltir. Bağlantı açıklamada."),
    },
    end: {
      lab: "Sıradaki",
      line: "Sırada hangi daire olsun?",
      ask: "Yorumlara yaz, sıradaki bölüm o olsun.",
      sub: "Her salı ve cuma yeni video",
      slot: "Sıradaki video",
      say: L("defne", "tr", "Sırada hangi daire olsun? Bürgeramt mı, iş ajansı mı? Yorumlara yaz, sıradaki bölüm o olsun."),
    },
    cover: { lab: "Oturma izni uzatma · B1", lines: ["Ausländerbehörde", "memurun dili: üç kalıp"], pill: "Konuşma · cep kartı · Sen ol" },
    yt: {
      desc: "Yabancılar dairesinde (Ausländerbehörde) oturma izni uzatma: 22 kelime ve belge adı, memurun kullandığı üç edilgen kalıp, konuşmanın tamamı Türkçe altyazıyla ve \"Sen ol\" provası. Sonunda ekran görüntüsü alınacak bir cep kartı var.",
      tags: "#almanca #almanya #ausländerbehörde #oturmaizni",
    },
    ui: {},
  }),
};
export default episode;
