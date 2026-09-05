import type { WritingTask } from "../types";

/**
 * Yazma egzersizlerine yeni tür görevler (WP-31 adım 4 / WP-72): her
 * egzersize bir `form`, `rewrite`, `reply` ya da `summary` görevi. Elle
 * yazıldı; egzersizin temasına bağlı. `bundled.ts` yükleme sırasında
 * egzersizin görev listesinin SONUNA ekler — serbest yazmadan sonra kısa,
 * kontrollü bir kapanış: A1–A2'de form/yeniden yazma, B1'de cevap,
 * B2–C1'de özet ve resmî cevap.
 */
export const WRITING_EXTRA: Record<string, WritingTask[]> = {
  // ── A1 ──
  "a1-w2": [
    {
      kind: "rewrite",
      prompt: "Aynı mesajı resmî hitapla (Sie) yaz.",
      source: "Kannst du morgen kommen?",
      answer: "Können Sie morgen kommen?",
      why: "Resmî hitapta Sie + fiilin mastar biçimi: Können Sie …?",
    },
  ],
  "a1-w3": [
    {
      kind: "form",
      prompt: "Market siparişi formunu Mehmet için doldur.",
      facts: "Mehmet Demir, iki kilo elma, bir ekmek, bir litre süt istiyor; teslimat cuma; adres: Gartenstraße 5, Bonn.",
      fields: [
        { label: "Name", answer: "Mehmet Demir" },
        { label: "Äpfel (kg)", answer: "2", accept: ["zwei", "2 kg"] },
        { label: "Brot", answer: "1", accept: ["ein Brot", "eins"] },
        { label: "Milch (Liter)", answer: "1", accept: ["ein Liter", "eins"] },
        { label: "Liefertag", answer: "Freitag", accept: ["am Freitag"] },
        { label: "Adresse", answer: "Gartenstraße 5, Bonn", accept: ["Gartenstraße 5", "Gartenstrasse 5, Bonn"] },
      ],
    },
  ],
  "a1-w4": [
    {
      kind: "rewrite",
      prompt: "Cümleyi „Am Wochenende“ ile başlat.",
      source: "Ich schlafe am Wochenende lange.",
      answer: "Am Wochenende schlafe ich lange.",
      why: "Zaman öne çekilince fiil ikinci sırada kalır, özne fiilden sonra gelir.",
    },
  ],
  "a1-w5": [
    {
      kind: "form",
      prompt: "Okul için mazeret formunu doldur: oğlun Emre iki gün hasta.",
      facts: "Öğrenci: Emre Kaya, sınıf 3b; hastalık nedeniyle 12–13 Mart tarihlerinde devamsız; veli: Ayşe Kaya.",
      fields: [
        { label: "Name des Kindes", answer: "Emre Kaya" },
        { label: "Klasse", answer: "3b" },
        { label: "Grund", answer: "Krankheit", accept: ["krank", "Er ist krank"] },
        { label: "Von", answer: "12. März", accept: ["12.3.", "12.03."] },
        { label: "Bis", answer: "13. März", accept: ["13.3.", "13.03."] },
        { label: "Name der Eltern", answer: "Ayşe Kaya", accept: ["Ayse Kaya"] },
      ],
    },
  ],
  "a1-w6": [
    {
      kind: "rewrite",
      prompt: "Olumsuz yap.",
      source: "Ich habe am Montag Zeit.",
      answer: "Ich habe am Montag keine Zeit.",
      why: "Artikelsiz isim (Zeit) kein ile olumsuzlanır: keine Zeit.",
    },
  ],
  "a1-w7": [
    {
      kind: "rewrite",
      prompt: "Kartpostal cümlesini Perfekt'e çevir (dün yaptın).",
      source: "Ich besuche das Museum.",
      answer: "Ich habe das Museum besucht.",
      why: "be- önekli fiilde ge- yok: besucht; yardımcı haben.",
    },
  ],
  "a1-w8": [
    {
      kind: "reply",
      prompt: "Frau Wagner'in mesajına cevap yaz: teşekkür et, cumartesi saat 15'te gelebileceğini söyle, ne getirmen gerektiğini sor.",
      stimulus: "Hallo! Am Samstag machen wir ein kleines Fest im Garten. Kommen Sie auch? Ab 15 Uhr. Viele Grüße, Petra Wagner",
      checklist: ["Teşekkür ettin mi?", "Gün ve saati onayladın mı?", "Bir soru sordun mu?", "Veda yazdın mı?"],
      minWords: 20,
      phrases: [
        { de: "Vielen Dank für die Einladung.", tr: "Davet için teşekkürler." },
        { de: "Ich komme gern.", tr: "Seve seve gelirim." },
        { de: "Soll ich etwas mitbringen?", tr: "Bir şey getireyim mi?" },
      ],
      sample: "Liebe Frau Wagner, vielen Dank für die Einladung! Ich komme gern am Samstag um 15 Uhr. Soll ich etwas mitbringen, zum Beispiel einen Kuchen? Bis Samstag! Viele Grüße, Deniz",
    },
  ],

  // ── A2 ──
  "a2-w1": [
    {
      kind: "rewrite",
      prompt: "Cümleyi weil ile bağla: Ich kann nicht kommen. Ich arbeite am Samstag.",
      source: "Ich kann nicht kommen. Ich arbeite am Samstag.",
      answer: "Ich kann nicht kommen, weil ich am Samstag arbeite.",
      why: "weil yan cümlesinde çekimli fiil sona gider: … am Samstag arbeite.",
    },
  ],
  "a2-w2": [
    {
      kind: "rewrite",
      prompt: "Ev sahibine yazdığın cümleyi kibar rica yap (könnten).",
      source: "Reparieren Sie die Heizung!",
      answer: "Könnten Sie bitte die Heizung reparieren?",
      why: "Emir yerine Konjunktiv II: Könnten Sie … reparieren?",
      alternatives: ["Könnten Sie die Heizung bitte reparieren?"],
    },
  ],
  "a2-w3": [
    {
      kind: "form",
      prompt: "Hastalık bildirimi formunu doldur.",
      facts: "Çalışan: Selin Arslan, personel no 4471; hastalık başlangıcı 4 Nisan, tahmini dönüş 7 Nisan; doktor raporu var (evet).",
      fields: [
        { label: "Name", answer: "Selin Arslan" },
        { label: "Personalnummer", answer: "4471" },
        { label: "Krank seit", answer: "4. April", accept: ["4.4.", "04.04."] },
        { label: "Voraussichtlich zurück am", answer: "7. April", accept: ["7.4.", "07.04."] },
        { label: "Ärztliches Attest liegt vor", answer: "ja", accept: ["Ja"] },
      ],
    },
  ],
  "a2-w4": [
    {
      kind: "rewrite",
      prompt: "Tatil cümlesini Perfekt'e çevir.",
      source: "Wir fahren jeden Tag ans Meer.",
      answer: "Wir sind jeden Tag ans Meer gefahren.",
      why: "fahren nesnesiz → sein: sind gefahren.",
    },
  ],
  "a2-w5": [
    {
      kind: "reply",
      prompt: "Sigorta şirketinin mesajına cevap yaz: eksik belgeyi bu hafta göndereceğini söyle, hangi adrese göndermen gerektiğini sor, teşekkür et.",
      stimulus: "Sehr geehrte Frau Arslan, für die Bearbeitung Ihres Antrags fehlt uns noch eine Kopie Ihres Ausweises. Bitte senden Sie uns das Dokument bis zum 30. April. Mit freundlichen Grüßen, Ihre Krankenkasse",
      checklist: ["Resmî selamlama ve veda", "Belgeyi ne zaman göndereceğin", "Bir soru", "En az 30 kelime"],
      minWords: 30,
      phrases: [
        { de: "Sehr geehrte Damen und Herren,", tr: "Sayın yetkili," },
        { de: "Ich schicke Ihnen … bis …", tr: "… tarihine kadar gönderiyorum" },
        { de: "Könnten Sie mir bitte sagen, …", tr: "Bana söyleyebilir misiniz, …" },
        { de: "Mit freundlichen Grüßen", tr: "Saygılarımla" },
      ],
      sample: "Sehr geehrte Damen und Herren, vielen Dank für Ihre Nachricht. Ich schicke Ihnen die Kopie meines Ausweises noch diese Woche. Könnten Sie mir bitte sagen, an welche Adresse ich das Dokument senden soll? Mit freundlichen Grüßen, Selin Arslan",
    },
  ],
  "a2-w6": [
    {
      kind: "rewrite",
      prompt: "Daveti reddeden cümleyi „leider“ ve „weil“ ile yaz.",
      source: "Ich komme nicht. Ich bin krank.",
      answer: "Ich kann leider nicht kommen, weil ich krank bin.",
      why: "leider kibarlaştırır; weil sebep, fiil sonda: krank bin.",
    },
  ],
  "a2-w7": [
    {
      kind: "rewrite",
      prompt: "Bayram anlatısını Präteritum ile yaz (hikâye dili).",
      source: "Wir feiern drei Tage und die Kinder bekommen Geschenke.",
      answer: "Wir feierten drei Tage und die Kinder bekamen Geschenke.",
      why: "feiern düzenli: feierten; bekommen düzensiz: bekamen.",
    },
  ],
  "a2-w8": [
    {
      kind: "rewrite",
      prompt: "Pelin'in cümlesini „Nachdem“ ile başlayan tek cümle yap.",
      source: "Ich habe den Chef getroffen. Danach war ich ruhiger.",
      answer: "Nachdem ich den Chef getroffen hatte, war ich ruhiger.",
      why: "nachdem yan cümlesi Plusquamperfekt (getroffen hatte), ana cümle fiili virgülden sonra.",
      alternatives: ["Nachdem ich den Chef getroffen habe, war ich ruhiger."],
    },
  ],

  // ── B1 ──
  "b1-w1": [
    {
      kind: "reply",
      prompt: "Komşunun mesajına cevap yaz: yardım edebileceğini söyle, ne getireceğini belirt, bir öneri ekle (müzik, oyun), saat sor.",
      stimulus: "Hallo zusammen, am 14. Juni feiern wir unser Nachbarschaftsfest im Hof. Wer kann beim Aufbau helfen oder etwas zu essen mitbringen? Bitte kurz zurückmelden! Viele Grüße, Jonas (Nr. 12)",
      checklist: ["Yardım teklifi", "Getireceğin şey", "Bir öneri", "Bir soru", "En az 40 kelime"],
      minWords: 40,
      phrases: [
        { de: "Ich kann gern beim Aufbau helfen.", tr: "Kurulumda seve seve yardım ederim." },
        { de: "Ich bringe … mit.", tr: "… getiririm." },
        { de: "Wie wäre es mit …?", tr: "… nasıl olur?" },
      ],
      sample: "Hallo Jonas, tolle Idee! Ich kann gern beim Aufbau helfen und bringe einen Salat und Getränke mit. Wie wäre es mit einer kleinen Playlist für den Abend? Ich könnte eine Box mitbringen. Um wie viel Uhr fangen wir mit dem Aufbau an? Viele Grüße, Deniz (Nr. 7)",
    },
  ],
  "b1-w2": [
    {
      kind: "rewrite",
      prompt: "Görüşünü „Meiner Meinung nach“ ile yeniden yaz (özne-fiil sırasına dikkat).",
      source: "Ich finde, dass soziale Netzwerke Zeit kosten.",
      answer: "Meiner Meinung nach kosten soziale Netzwerke Zeit.",
      why: "Meiner Meinung nach birinci sırayı kaplar; fiil hemen arkasına, özne sonraya.",
    },
  ],
  "b1-w3": [
    {
      kind: "rewrite",
      prompt: "Reddi nezaket kipiyle yumuşat (würde … gern, leider).",
      source: "Ich komme nicht zum Kurs.",
      answer: "Ich würde gern kommen, kann aber leider nicht.",
      why: "würde gern + mastar niyet, aber leider ret; kısa ve kibar.",
      alternatives: ["Ich würde gern zum Kurs kommen, kann aber leider nicht."],
    },
  ],
  "b1-w4": [
    {
      kind: "rewrite",
      prompt: "İki cümleyi „obwohl“ ile bağla.",
      source: "Ich bin für die autofreie Innenstadt. Ich fahre selbst Auto.",
      answer: "Ich bin für die autofreie Innenstadt, obwohl ich selbst Auto fahre.",
      why: "obwohl yan cümlesinde fiil sona: … Auto fahre.",
    },
  ],
  "b1-w5": [
    {
      kind: "reply",
      prompt: "Ev sahibinin cevabına yanıt yaz: teklifi kabul et ama tarih iste, ikinci sorunu (küf) tekrar hatırlat, süre ver (14 gün).",
      stimulus: "Sehr geehrte Frau Kaya, wir haben Ihre Beschwerde erhalten. Ein Handwerker wird sich wegen der Heizung bei Ihnen melden. Mit freundlichen Grüßen, Hausverwaltung Müller",
      checklist: ["Resmî ton", "Tarih talebi", "Küf sorunu", "Süre (14 gün)", "En az 50 kelime"],
      minWords: 50,
      phrases: [
        { de: "Vielen Dank für Ihre schnelle Antwort.", tr: "Hızlı cevabınız için teşekkürler." },
        { de: "Ich bitte Sie, mir einen konkreten Termin zu nennen.", tr: "Somut bir tarih vermenizi rica ediyorum." },
        { de: "Darüber hinaus …", tr: "Bunun ötesinde …" },
        { de: "innerhalb von 14 Tagen", tr: "14 gün içinde" },
      ],
      sample: "Sehr geehrte Damen und Herren, vielen Dank für Ihre schnelle Antwort. Ich bitte Sie, mir einen konkreten Termin für den Handwerker zu nennen, da ich tagsüber arbeite. Darüber hinaus möchte ich Sie an den Schimmel im Badezimmer erinnern, den ich bereits im März gemeldet habe. Ich erwarte eine Lösung innerhalb von 14 Tagen. Mit freundlichen Grüßen, Ayşe Kaya",
    },
  ],
  "b1-w6": [
    {
      kind: "rewrite",
      prompt: "Görüşü „Einerseits … andererseits …“ ile tek cümleye çevir.",
      source: "Online-Kurse sind flexibel. Man lernt allein.",
      answer: "Einerseits sind Online-Kurse flexibel, andererseits lernt man allein.",
      why: "İki zarf da birinci sırayı kaplar: sind Online-Kurse / lernt man.",
    },
  ],
  "b1-w7": [
    {
      kind: "rewrite",
      prompt: "Deneyimini „Als“ ile başlayan cümleyle yaz (geçmişte bir kez).",
      source: "Ich kam nach Deutschland. Alle haben mich gesiezt.",
      answer: "Als ich nach Deutschland kam, haben mich alle gesiezt.",
      why: "als (geçmişte bir kez) yan cümle; ana cümlenin fiili virgülden sonra: haben mich alle.",
    },
  ],
  "b1-w8": [
    {
      kind: "form",
      prompt: "Açılış davetiyesi için etkinlik kayıt formunu doldur.",
      facts: "Etkinlik: Cafe Sonne açılışı; tarih 20 Eylül, saat 18:00; yer: Hauptstraße 3; katılımcı sayısı 40; iletişim: info@cafe-sonne.de.",
      fields: [
        { label: "Veranstaltung", answer: "Eröffnung Café Sonne", accept: ["Eröffnung", "Café Sonne Eröffnung", "Cafe Sonne"] },
        { label: "Datum", answer: "20. September", accept: ["20.9.", "20.09."] },
        { label: "Uhrzeit", answer: "18:00 Uhr", accept: ["18 Uhr", "18:00"] },
        { label: "Ort", answer: "Hauptstraße 3", accept: ["Hauptstrasse 3"] },
        { label: "Teilnehmerzahl", answer: "40", accept: ["vierzig"] },
        { label: "Kontakt", answer: "info@cafe-sonne.de" },
      ],
    },
  ],

  // ── B2 ──
  "b2-w1": [
    {
      kind: "summary",
      prompt: "Forum yazısındaki karşı görüşü en çok iki cümleyle özetle.",
      source: "Ein Handyverbot an Schulen klingt nach einer einfachen Lösung, greift aber zu kurz. Schüler lernen den verantwortungsvollen Umgang mit digitalen Geräten nicht durch Verbote, sondern durch Begleitung. Wer das Handy aus dem Unterricht verbannt, verlagert das Problem nur auf den Nachmittag. Sinnvoller wären klare Regeln: Nutzung nur nach Absprache, Recherchephasen mit dem Gerät, handyfreie Pausen.",
      maxSentences: 2,
      sample: "Der Autor hält ein Handyverbot für zu kurz gedacht, weil Verbote keinen verantwortungsvollen Umgang lehren. Statt eines Verbots schlägt er klare Regeln für die Nutzung im Unterricht vor.",
    },
  ],
  "b2-w2": [
    {
      kind: "rewrite",
      prompt: "Şikâyet cümlesini Passiv ile yaz (kim yaptığı önemli değil).",
      source: "Der Lieferant hat den Schrank beschädigt.",
      answer: "Der Schrank wurde beschädigt.",
      why: "Vorgangspassiv Präteritum: wurde + Partizip II; fail düşer.",
      alternatives: ["Der Schrank ist beschädigt worden."],
    },
  ],
  "b2-w3": [
    {
      kind: "rewrite",
      prompt: "Okur mektubu cümlesini isimleştirerek (Nominalisierung) yaz: „…, dass die Innenstadt gesperrt wird“ → „die Sperrung …“.",
      source: "Ich befürworte, dass die Innenstadt für Autos gesperrt wird.",
      answer: "Ich befürworte die Sperrung der Innenstadt für Autos.",
      why: "dass-cümlesi → isim (die Sperrung) + Genitiv: der Innenstadt.",
    },
  ],
  "b2-w4": [
    {
      kind: "summary",
      prompt: "Metnin ana tezini ve bir gerekçesini en çok iki cümleyle özetle.",
      source: "Homeoffice wird gern als Freiheit verkauft, doch für viele Beschäftigte bedeutet es vor allem Entgrenzung. Wenn der Schreibtisch im Schlafzimmer steht, endet der Arbeitstag nicht mehr mit dem Verlassen des Büros. Studien zeigen, dass Beschäftigte im Homeoffice im Schnitt länger arbeiten und Pausen häufiger ausfallen. Der Gewinn an Flexibilität wird so mit einem Verlust an Erholung bezahlt.",
      maxSentences: 2,
      sample: "Die Autorin sieht im Homeoffice weniger Freiheit als Entgrenzung, weil Arbeit und Privatleben ineinanderfließen. Als Beleg führt sie Studien an, nach denen im Homeoffice länger gearbeitet wird und Pausen ausfallen.",
    },
  ],
  "b2-w5": [
    {
      kind: "reply",
      prompt: "Dairenin ret yazısına itiraz cevabı yaz: kararı kabul etmediğini bildir, iki gerekçe ver, belge eklediğini söyl, yeniden değerlendirme iste.",
      stimulus: "Sehr geehrte Frau Demir, Ihren Antrag auf Wohngeld vom 3. Mai müssen wir leider ablehnen, da die eingereichten Einkommensnachweise unvollständig sind. Gegen diesen Bescheid können Sie innerhalb eines Monats Widerspruch einlegen. Mit freundlichen Grüßen, Wohngeldstelle",
      checklist: ["Resmî yapı (Betreff, hitap, veda)", "İtirazı açıkça belirtme", "İki gerekçe", "Ek belge", "En az 80 kelime"],
      minWords: 80,
      phrases: [
        { de: "Hiermit lege ich Widerspruch gegen … ein.", tr: "İşbu yazıyla … itiraz ediyorum." },
        { de: "Zur Begründung führe ich an, dass …", tr: "Gerekçe olarak …" },
        { de: "Als Anlage finden Sie …", tr: "Ekte … bulacaksınız." },
        { de: "Ich bitte um erneute Prüfung.", tr: "Yeniden değerlendirme rica ediyorum." },
      ],
      sample: "Sehr geehrte Damen und Herren, hiermit lege ich Widerspruch gegen Ihren Bescheid vom 20. Mai ein. Zur Begründung führe ich an, dass ich die Einkommensnachweise für April bereits am 3. Mai eingereicht habe; die Gehaltsabrechnung für März lag meinem Antrag ebenfalls bei. Sollte ein Dokument fehlen, bitte ich um einen konkreten Hinweis. Als Anlage finden Sie erneut alle Nachweise der letzten drei Monate. Ich bitte um erneute Prüfung meines Antrags und um eine schriftliche Mitteilung des Ergebnisses. Für Rückfragen erreichen Sie mich werktags zwischen 9 und 16 Uhr unter der oben genannten Nummer. Mit freundlichen Grüßen, Elif Demir",
    },
  ],
  "b2-w6": [
    {
      kind: "rewrite",
      prompt: "Tartışma cümlesini „Je … desto“ yapısıyla yaz.",
      source: "Wenn mehr Menschen Rad fahren, ist die Luft sauberer.",
      answer: "Je mehr Menschen Rad fahren, desto sauberer ist die Luft.",
      why: "je + Komparativ yan cümle (fiil sonda), desto + Komparativ ana cümle (fiil ikinci).",
    },
  ],
  "b2-w7": [
    {
      kind: "summary",
      prompt: "Yorumun ana fikrini iki cümleyle özetle.",
      source: "Erinnerungskultur ist kein Museum, in das man einmal im Jahr geht. Sie lebt davon, dass jede Generation die Vergangenheit neu befragt und dabei auch unbequeme Antworten aushält. Ein Gedenktag, der zum Ritual erstarrt, erinnert an nichts mehr; er beruhigt nur. Deshalb braucht Erinnerung Orte des Streits, nicht nur Orte der Andacht.",
      maxSentences: 2,
      sample: "Der Kommentar versteht Erinnerungskultur als lebendige Auseinandersetzung, die jede Generation neu führen muss. Rituale allein beruhigen nur; nötig seien Orte, an denen über die Vergangenheit gestritten wird.",
    },
  ],
  "b2-w8": [
    {
      kind: "rewrite",
      prompt: "Haber cümlesini dolaylı anlatıma (Konjunktiv I) çevir: Die Ministerin sagt, …",
      source: "Die Ministerin sagt: „Die Reform kommt im Herbst.“",
      answer: "Die Ministerin sagt, die Reform komme im Herbst.",
      why: "Dolaylı anlatım Konjunktiv I: kommt → komme.",
      alternatives: ["Die Ministerin sagt, dass die Reform im Herbst komme."],
    },
  ],

  // ── C1 ──
  "c1-w1": [
    {
      kind: "summary",
      prompt: "Grafik yorumundaki eğilimi ve yorumu iki cümleyle özetle.",
      source: "Der Anteil der Beschäftigten, die mindestens einen Tag pro Woche im Homeoffice arbeiten, stieg von 12 Prozent im Jahr 2019 auf 38 Prozent im Jahr 2021 und pendelte sich bis 2025 bei rund 30 Prozent ein. Der Rückgang nach 2021 ist weniger als Rückkehr zur alten Normalität zu lesen denn als Suche nach einem tragfähigen Mischmodell.",
      maxSentences: 2,
      sample: "Der Homeoffice-Anteil hat sich seit 2019 mehr als verdoppelt und liegt nach einem Höchststand 2021 heute bei rund 30 Prozent. Der leichte Rückgang wird nicht als Rückkehr ins Büro, sondern als Einpendeln auf ein hybrides Modell gedeutet.",
    },
  ],
  "c1-w2": [
    {
      kind: "rewrite",
      prompt: "İtiraz cümlesini resmî-kısa biçime çevir (Partizipialattribut ile): „…, der von Ihnen erlassen wurde“ → „der von Ihnen erlassene …“.",
      source: "Ich widerspreche dem Bescheid, der von Ihnen am 3. Mai erlassen wurde.",
      answer: "Ich widerspreche dem von Ihnen am 3. Mai erlassenen Bescheid.",
      why: "İlgi cümlesi sıfat-ortaç öbeğine dönüşür: dem … erlassenen Bescheid (Dativ -en).",
    },
  ],
  "c1-w3": [
    {
      kind: "summary",
      prompt: "Tartışma yazısındaki iki karşıt konumu tek cümleyle, yazarın sonucunu ikinci cümleyle özetle.",
      source: "Die einen sehen in generativer KI das Ende des eigenständigen Denkens im Studium, die anderen ein Werkzeug, das Routinearbeit abnimmt und Zeit für Vertiefung schafft. Beide übersehen, dass das eigentliche Problem nicht das Werkzeug ist, sondern Prüfungsformate, die Reproduktion belohnen. Wer Verständnis prüfen will, muss Fragen stellen, die sich nicht durch Zusammenfassen beantworten lassen.",
      maxSentences: 2,
      sample: "Während Kritiker in KI das Ende eigenständigen Denkens sehen, betrachten Befürworter sie als Werkzeug, das Zeit für Vertiefung freisetzt. Der Autor verlagert das Problem auf die Prüfungsformate: Solange Reproduktion belohnt werde, sei nicht das Werkzeug, sondern die Prüfung das Problem.",
    },
  ],
  "c1-w4": [
    {
      kind: "rewrite",
      prompt: "Başvuru cümlesini daha zarif kur: isimleştirme ve Genitiv ile.",
      source: "Ich bewerbe mich, weil ich mein Wissen vertiefen will.",
      answer: "Ich bewerbe mich mit dem Ziel der Vertiefung meines Wissens.",
      why: "weil-cümlesi → mit dem Ziel + Genitiv zinciri (der Vertiefung meines Wissens).",
      alternatives: ["Ich bewerbe mich mit dem Ziel, mein Wissen zu vertiefen."],
    },
  ],
  "c1-w5": [
    {
      kind: "reply",
      prompt: "Müşterinin teklif talebine cevap yaz: teklifi ekle, geçerlilik süresi ver, iki koşul belirt (ödeme, teslimat), görüşme öner.",
      stimulus: "Sehr geehrte Damen und Herren, wir bitten um ein Angebot für die Lieferung und Montage von 20 höhenverstellbaren Schreibtischen bis Ende Oktober. Bitte nennen Sie uns Preise, Lieferzeit und Zahlungsbedingungen. Mit freundlichen Grüßen, Lena Hartmann, Einkauf, Nordlicht GmbH",
      checklist: ["Resmî iş yazışması yapısı", "Teklif ve geçerlilik", "Ödeme ve teslimat koşulları", "Görüşme önerisi", "En az 100 kelime"],
      minWords: 100,
      phrases: [
        { de: "Bezug nehmend auf Ihre Anfrage vom …", tr: "… tarihli talebinize istinaden" },
        { de: "Unser Angebot ist bis zum … gültig.", tr: "Teklifimiz … tarihine kadar geçerlidir." },
        { de: "Die Lieferung erfolgt innerhalb von …", tr: "Teslimat … içinde yapılır." },
        { de: "Gern erläutern wir Ihnen die Details in einem persönlichen Gespräch.", tr: "Ayrıntıları memnuniyetle yüz yüze anlatırız." },
      ],
      sample: "Sehr geehrte Frau Hartmann, Bezug nehmend auf Ihre Anfrage vom 12. September unterbreiten wir Ihnen gern das beigefügte Angebot über 20 höhenverstellbare Schreibtische einschließlich Lieferung und Montage. Unser Angebot ist bis zum 15. Oktober gültig. Die Lieferung erfolgt innerhalb von vier Wochen nach Auftragseingang, sodass der Termin Ende Oktober eingehalten werden kann. Die Zahlung ist innerhalb von 30 Tagen nach Rechnungsstellung ohne Abzug fällig; bei Vorkasse gewähren wir zwei Prozent Skonto. Die Montage übernimmt unser eigenes Team; ein Termin lässt sich nach Auftragseingang kurzfristig abstimmen. Gern erläutern wir Ihnen die Details in einem persönlichen Gespräch — für kommende Woche könnten wir Ihnen Dienstag- oder Donnerstagvormittag anbieten. Über eine Rückmeldung bis zum 15. Oktober würden wir uns freuen. Mit freundlichen Grüßen, Deniz Yilmaz, Vertrieb, Büro & Raum GmbH",
    },
  ],
  "c1-w6": [
    {
      kind: "summary",
      prompt: "Görüş yazısındaki veriyi ve çıkarımı iki cümleyle özetle.",
      source: "Laut Statistischem Bundesamt pendelten 2025 rund 60 Prozent der Beschäftigten mit dem Auto zur Arbeit, obwohl die Hälfte von ihnen weniger als zehn Kilometer entfernt wohnt. Die Zahl zeigt weniger einen Mangel an Alternativen als einen Mangel an Anreizen: Wo der Parkplatz kostenlos und der Radweg lückenhaft ist, entscheidet nicht die Vernunft, sondern die Bequemlichkeit.",
      maxSentences: 2,
      sample: "2025 fuhren rund 60 Prozent der Beschäftigten mit dem Auto zur Arbeit, obwohl die Hälfte von ihnen weniger als zehn Kilometer entfernt wohnt. Die Autorin deutet dies nicht als fehlende Alternativen, sondern als fehlende Anreize, da kostenlose Parkplätze und lückenhafte Radwege die Bequemlichkeit belohnen.",
    },
  ],
  "c1-w7": [
    {
      kind: "rewrite",
      prompt: "Eleştiri cümlesini nüanslı yaz: mutlak hükmü kip parçacıkları ve Konjunktiv ile yumuşat.",
      source: "Der Roman ist langweilig.",
      answer: "Der Roman dürfte manchen Lesern etwas langatmig erscheinen.",
      why: "dürfte (varsayım) + etwas + erscheinen: hüküm görüşe dönüşür.",
      alternatives: ["Der Roman mag manchen Lesern etwas langatmig erscheinen."],
    },
  ],
  "c1-w8": [
    {
      kind: "summary",
      prompt: "Teşekkür konuşmasının çekirdek mesajını iki cümleyle özetle.",
      source: "Wenn ich heute hier stehe, dann nicht, weil ich alles richtig gemacht hätte, sondern weil Menschen mir Fehler zugestanden haben. Dieser Preis gehört deshalb weniger mir als jenen, die Geduld hatten, als Geduld nicht selbstverständlich war. Ich nehme ihn an als Auftrag, dieselbe Geduld weiterzugeben.",
      maxSentences: 2,
      sample: "Der Redner führt seinen Erfolg nicht auf eigene Fehlerlosigkeit, sondern auf die Geduld anderer zurück. Den Preis versteht er daher als Verpflichtung, diese Geduld selbst weiterzugeben.",
    },
  ],
};
