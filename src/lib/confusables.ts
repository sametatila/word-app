/**
 * Karıştırma çiftleri (WP-73 adım 4) — elle seçilmiş, Türkçe ayrım cümleli.
 *
 * Aday listesi `data/content/confusables.json`'dan (npm run content:confusables);
 * buradakiler Türkçe konuşanın GERÇEKTEN karıştırdığı çiftler: umlaut farkı
 * (schon/schön), tek harf (Kirche/Kirsche), yalancı eş (bekommen ≠ become),
 * anlamca komşu (kennen/wissen). `hint` iki kelimeyi tek cümlede ayırır;
 * `why.ts` anlam hatasında seçilen karşılık bu çiftlerden birine denk
 * gelirse genel "yan yana oku" yerine bu cümleyi verir.
 */
export type Confusable = {
  a: string;
  b: string;
  aTr: string;
  bTr: string;
  /** Türkçe ayrım cümlesi. */
  hint: string;
  /** Almanca mini örnek (her iki kelimeyle). */
  example: string;
};

const c = (a: string, aTr: string, b: string, bTr: string, hint: string, example: string): Confusable => ({ a, aTr, b, bTr, hint, example });

export const CONFUSABLES: Confusable[] = [
  // ── umlaut ──
  c("schon", "zaten", "schön", "güzel", "schon zaman (zaten, çoktan), schön nitelik (güzel); umlaut anlamı değiştirir.", "Es ist schon spät. / Das ist schön."),
  c("Mutter", "anne", "Mütter", "anneler", "Umlaut çoğulu gösterir: eine Mutter, zwei Mütter.", "Meine Mutter kommt. / Alle Mütter kommen."),
  c("Apfel", "elma", "Äpfel", "elmalar", "Umlautlu biçim çoğul: der Apfel, die Äpfel.", "Ich esse einen Apfel. / Ich kaufe Äpfel."),
  c("zahlen", "ödemek", "zählen", "saymak", "zahlen para öder, zählen sayar; ä = e sesi.", "Ich zahle die Rechnung. / Ich zähle die Gäste."),
  c("Stadt", "şehir", "Staat", "devlet", "Stadt kısa a (şehir), Staat uzun a (devlet).", "Die Stadt ist groß. / Der Staat zahlt."),
  c("Küche", "mutfak", "Kuchen", "kek", "Küche mutfak (ü, -e), Kuchen kek (u, -en).", "Die Küche ist klein. / Der Kuchen ist süß."),
  c("fühlen", "hissetmek", "füllen", "doldurmak", "fühlen uzun ü (h uzatır) hissetmek; füllen kısa ü doldurmak.", "Ich fühle mich gut. / Ich fülle das Glas."),
  c("Ofen", "fırın", "offen", "açık", "Ofen isim (fırın), offen sıfat (açık); çift f ünlüyü kısaltır.", "Der Ofen ist heiß. / Das Fenster ist offen."),
  c("Hölle", "cehennem", "Höhle", "mağara", "Höhle uzun ö (mağara), Hölle kısa ö (cehennem).", "Wir sahen eine Höhle. / Das war die Hölle."),
  c("Vater", "baba", "Väter", "babalar", "Umlaut çoğul: der Vater, die Väter.", "Mein Vater arbeitet. / Die Väter warten."),
  c("Bruder", "erkek kardeş", "Brüder", "erkek kardeşler", "Umlautlu çoğul: ein Bruder, zwei Brüder.", "Mein Bruder ist 20. / Meine Brüder sind älter."),
  c("Buch", "kitap", "Bücher", "kitaplar", "Çoğulda umlaut + -er: das Buch, die Bücher.", "Ich lese ein Buch. / Ich habe viele Bücher."),
  c("Wurde", "oldu", "würde", "olurdu", "wurde geçmiş (Präteritum), würde Konjunktiv (nezaket/varsayım).", "Er wurde Arzt. / Ich würde gern kommen."),
  c("konnte", "-ebildi", "könnte", "-ebilirdi", "konnte geçmiş, könnte Konjunktiv II (kibar rica/olasılık).", "Ich konnte nicht kommen. / Könnten Sie helfen?"),
  c("musste", "zorunda kaldı", "müsste", "-meli (varsayım)", "musste geçmiş zorunluluk, müsste 'herhalde/-meli' tahmini.", "Ich musste arbeiten. / Das müsste stimmen."),
  c("Tur", "tur", "Tür", "kapı", "Tür (ü) kapı, Tour/Tur gezi; ü yuvarlaklığı düşerse kapı kaybolur.", "Die Tür ist zu. / Eine Tour durch die Stadt."),

  // ── tek harf / yazım ──
  c("Kirche", "kilise", "Kirsche", "kiraz", "Kirche ch (kilise), Kirsche sch (kiraz).", "Die Kirche ist alt. / Die Kirsche ist rot."),
  c("Bett", "yatak", "Beet", "tarh", "Bett kısa e (yatak), Beet uzun e (çiçek tarhı).", "Ich liege im Bett. / Im Beet wachsen Rosen."),
  c("Miete", "kira", "Mitte", "orta", "Miete uzun i (kira), Mitte kısa i (orta).", "Die Miete ist hoch. / In der Mitte der Stadt."),
  c("bieten", "sunmak", "bitten", "rica etmek", "bieten uzun i (sunmak), bitten kısa i (rica etmek).", "Wir bieten Hilfe an. / Ich bitte um Hilfe."),
  c("Wahl", "seçim", "Wal", "balina", "Wahl (h uzatır) seçim; Wal balina.", "Die Wahl ist am Sonntag. / Der Wal schwimmt."),
  c("Seite", "sayfa", "Saite", "tel", "Seite sayfa/taraf; Saite müzik teli.", "Seite zehn bitte. / Die Saite ist gerissen."),
  c("Lied", "şarkı", "Lid", "göz kapağı", "Lied uzun i (şarkı), Lid kısa i (göz kapağı).", "Ein schönes Lied. / Das Lid ist geschwollen."),
  c("Rad", "tekerlek", "Rat", "tavsiye", "Yazımı farklı, sesi aynı (sonda t): Rad tekerlek/bisiklet, Rat tavsiye.", "Ich fahre Rad. / Ein guter Rat."),
  c("Meer", "deniz", "mehr", "daha çok", "Meer isim (deniz, das), mehr zarf (daha çok).", "Wir fahren ans Meer. / Ich möchte mehr."),
  c("Wand", "duvar", "Wand", "duvar", "Wand (duvar) ile 'Wende' (dönüş) ve 'Wanne' (küvet) karıştırılır; -nd sonda -nt okunur.", "Das Bild hängt an der Wand."),
  c("Weg", "yol", "weg", "uzakta, gitmiş", "Büyük harf Weg isim (yol, uzun e), küçük harf weg zarf (gitti, kısa e).", "Der Weg ist lang. / Er ist weg."),
  c("Ende", "son", "Ente", "ördek", "Ende son (d), Ente ördek (t).", "Am Ende des Films. / Die Ente schwimmt."),
  c("Gericht", "mahkeme; yemek", "Gerücht", "söylenti", "Gericht mahkeme ya da yemek, Gerücht dedikodu.", "Das Gericht entscheidet. / Ein Gerücht geht um."),
  c("Land", "ülke", "Laden", "dükkân", "Land ülke/kırsal, Laden dükkân.", "Auf dem Land ist es ruhig. / Der Laden ist zu."),
  c("Wolke", "bulut", "Wolle", "yün", "Wolke bulut (k), Wolle yün (ll).", "Eine dunkle Wolke. / Ein Pullover aus Wolle."),
  c("Sonne", "güneş", "Sohn", "oğul", "Sonne kısa o, çift n (güneş); Sohn uzun o (oğul).", "Die Sonne scheint. / Mein Sohn lacht."),
  c("Straße", "cadde", "Strauß", "buket; devekuşu", "Straße cadde, Strauß buket/devekuşu.", "Die Straße ist breit. / Ein Strauß Blumen."),
  c("Post", "posta", "Posten", "görev, mevki", "Post posta/postane, Posten görev.", "Die Post ist da. / Ein guter Posten."),
  c("Haar", "saç", "Herr", "bey", "Haar uzun a saç; Herr bey; Heer ordu.", "Mein Haar ist kurz. / Herr Müller kommt."),

  // ── anlamca komşu ──
  c("kennen", "tanımak", "wissen", "bilmek", "kennen kişiyi/yeri tanımak (nesne alır); wissen bilgiyi bilmek (dass-cümlesi).", "Ich kenne ihn. / Ich weiß, dass er kommt."),
  c("können", "-ebilmek", "kennen", "tanımak", "können yetenek/imkân (ö), kennen tanımak (e).", "Ich kann schwimmen. / Ich kenne Berlin."),
  c("lernen", "öğrenmek", "lehren", "öğretmek", "lernen öğrenci yapar, lehren öğretmen; studieren üniversitede okumak.", "Ich lerne Deutsch. / Sie lehrt Mathematik."),
  c("mieten", "kiralamak (tutmak)", "vermieten", "kiraya vermek", "mieten kiracı, vermieten ev sahibi.", "Ich miete eine Wohnung. / Sie vermietet ein Zimmer."),
  c("leihen", "ödünç vermek/almak", "borgen", "ödünç almak", "sich etwas leihen ödünç almak, jemandem etwas leihen ödünç vermek.", "Ich leihe mir ein Buch. / Er leiht mir Geld."),
  c("wohnen", "oturmak (ikamet)", "leben", "yaşamak", "wohnen adres (nerede oturuyorsun), leben yaşam/ülke.", "Ich wohne in Köln. / Ich lebe gern in Deutschland."),
  c("sitzen", "oturmak", "setzen", "oturtmak", "sitzen durum (Dativ), sich setzen hareket (Akkusativ).", "Ich sitze auf dem Stuhl. / Ich setze mich auf den Stuhl."),
  c("liegen", "yatmak, durmak", "legen", "koymak (yatık)", "liegen durum (wo? Dativ), legen hareket (wohin? Akkusativ).", "Das Buch liegt auf dem Tisch. / Ich lege es auf den Tisch."),
  c("stehen", "durmak (dik)", "stellen", "koymak (dik)", "stehen durum, stellen hareket.", "Die Flasche steht da. / Ich stelle sie auf den Tisch."),
  c("hängen", "asılı olmak", "hängen", "asmak", "Aynı fiil iki anlam: durum (Dativ, düzensiz: hing) / hareket (Akkusativ, düzenli: hängte).", "Das Bild hängt an der Wand. / Ich hänge es an die Wand."),
  c("fahren", "gitmek (araçla)", "gehen", "gitmek (yürüyerek)", "fahren araçla, gehen yürüyerek; fliegen uçakla.", "Ich fahre mit dem Bus. / Ich gehe zu Fuß."),
  c("bringen", "getirmek", "holen", "gidip almak", "bringen bir şeyi birine götürmek/getirmek; holen gidip alıp gelmek.", "Ich bringe dir Kaffee. / Ich hole Brot."),
  c("nehmen", "almak", "bekommen", "elde etmek, almak", "nehmen aktif alma, bekommen birinden almak/edinmek; bekommen ≠ become!", "Ich nehme den Bus. / Ich bekomme einen Brief."),
  c("bekommen", "almak", "werden", "olmak", "Yalancı eş: bekommen 'become' değil, 'almak'; olmak = werden.", "Ich bekomme Post. / Ich werde Arzt."),
  c("also", "yani, öyleyse", "auch", "de/da", "also 'yani' (İngilizce also değil!), auch 'de/da'.", "Also, wir gehen. / Ich komme auch."),
  c("Gift", "zehir", "Geschenk", "hediye", "Gift zehirdir, hediye Geschenk — İngilizceden en tehlikeli yalancı eş.", "Das ist Gift! / Ein Geschenk für dich."),
  c("bald", "yakında", "kahl", "kel", "bald yakında (İngilizce bald değil).", "Bis bald! / Er ist kahl."),
  c("Chef", "patron", "Koch", "aşçı", "Chef şef değil patron; aşçı Koch.", "Mein Chef ist nett. / Der Koch kocht."),
  c("Rente", "emekli maaşı", "Miete", "kira", "Rente emeklilik, Miete kira.", "Er lebt von der Rente. / Die Miete steigt."),
  c("Termin", "randevu", "Verabredung", "buluşma", "Termin resmî randevu (doktor, daire); Verabredung arkadaşla buluşma.", "Ich habe einen Termin beim Arzt. / Eine Verabredung mit Anna."),
  c("Rezept", "reçete; tarif", "Quittung", "fiş", "Rezept doktordan ya da yemek tarifi; Quittung/Kassenbon ödeme fişi.", "Ein Rezept vom Arzt. / Die Quittung bitte."),
  c("Uhr", "saat (alet, saat başı)", "Stunde", "saat (süre)", "Uhr alet ve 'saat kaç' (um 8 Uhr); Stunde 60 dakikalık süre.", "Es ist 8 Uhr. / Der Kurs dauert eine Stunde."),
  c("Zeit", "zaman", "Mal", "kez", "Zeit süre/zaman, Mal kez (zum ersten Mal).", "Ich habe keine Zeit. / Zum ersten Mal hier."),
  c("Tag", "gün", "Tage", "günler", "Tag tekil, Tage çoğul; 'guten Tag' selam.", "Ein schöner Tag. / Drei Tage Urlaub."),
  c("Ort", "yer (mekân)", "Platz", "yer (alan, meydan)", "Ort belirli mekân/köy; Platz meydan ya da boş yer (Ist hier noch Platz?).", "Ein schöner Ort. / Ist der Platz frei?"),
  c("Stelle", "pozisyon; nokta", "Stellung", "duruş; mevki", "Stelle iş ilanı/yer; Stellung duruş, konum.", "Eine freie Stelle. / Seine Stellung im Betrieb."),
  c("Firma", "şirket", "Betrieb", "işletme", "Firma şirket (isim), Betrieb işletme/tesis.", "Die Firma wächst. / Im Betrieb arbeiten 50 Leute."),
  c("Arbeit", "iş (çalışma)", "Job", "iş (geçici)", "Arbeit genel çalışma, Job konuşma dilinde iş/part-time.", "Ich gehe zur Arbeit. / Ein Nebenjob."),
  c("Schüler", "öğrenci (okul)", "Student", "öğrenci (üniversite)", "Schüler okul öğrencisi, Student üniversite öğrencisi.", "Die Schüler lernen. / Ein Student der Medizin."),
  c("Lehrer", "öğretmen", "Dozent", "öğretim görevlisi", "Lehrer okulda, Dozent/Professor üniversitede.", "Der Lehrer erklärt. / Die Dozentin hält eine Vorlesung."),
  c("Hochschule", "yükseköğretim kurumu", "Gymnasium", "lise", "Hochschule üniversite düzeyi; Gymnasium lise (spor salonu değil!).", "Sie studiert an einer Hochschule. / Er geht aufs Gymnasium."),
  c("Krankenhaus", "hastane", "Praxis", "muayenehane", "Krankenhaus hastane, Praxis doktor muayenehanesi.", "Er liegt im Krankenhaus. / Die Praxis ist zu."),
  c("Ampel", "trafik ışığı", "Lampe", "lamba", "Ampel trafik ışığı, Lampe lamba.", "Die Ampel ist rot. / Die Lampe ist an."),
  c("Boden", "zemin", "Erde", "toprak, dünya", "Boden yer/zemin, Erde toprak ve gezegen.", "Das Glas liegt auf dem Boden. / Die Erde ist rund."),
  c("Decke", "tavan; battaniye", "Dach", "çatı", "Decke içerideki tavan (ve battaniye), Dach çatı.", "Die Decke ist hoch. / Das Dach ist rot."),
  c("Wand", "duvar (iç)", "Mauer", "duvar (dış, taş)", "Wand evin içindeki duvar, Mauer taş/dış duvar.", "Ein Bild an der Wand. / Die Berliner Mauer."),
  c("Fenster", "pencere", "Schaufenster", "vitrin", "Fenster pencere, Schaufenster vitrin.", "Mach das Fenster auf. / Im Schaufenster steht ein Kleid."),
  c("Geld", "para", "Gehalt", "maaş", "Geld para, Gehalt aylık maaş (Lohn saatlik ücret).", "Ich habe kein Geld. / Mein Gehalt ist gut."),
  c("kaufen", "satın almak", "verkaufen", "satmak", "kaufen alan, verkaufen satan; ver- yönü çevirir.", "Ich kaufe Brot. / Er verkauft Autos."),
  c("kosten", "-e mal olmak", "bezahlen", "ödemek", "kosten şeyin fiyatı (Das kostet 5 Euro), bezahlen kişinin ödemesi.", "Das kostet 10 Euro. / Ich bezahle bar."),
  c("Schmerz", "ağrı", "Schmerzen", "ağrılar", "Şikâyette hep çoğul: Kopfschmerzen, Bauchschmerzen.", "Ich habe Kopfschmerzen."),
  c("Arzt", "doktor", "Doktor", "doktor (unvan)", "Meslek Arzt/Ärztin; Doktor akademik unvan (Herr Doktor).", "Ich gehe zum Arzt. / Frau Doktor Weber."),
  c("erklären", "açıklamak", "erzählen", "anlatmak", "erklären kuralı/nedeni açıklar, erzählen olay/hikâye anlatır.", "Erklär mir die Regel. / Erzähl mir von der Reise."),
  c("sagen", "söylemek", "sprechen", "konuşmak", "sagen söylenen şey (dass…), sprechen dil/konuşma eylemi.", "Er sagt, er kommt. / Ich spreche Deutsch."),
  c("reden", "konuşmak (sohbet)", "sprechen", "konuşmak", "reden sohbet/uzun konuşma, sprechen dil ve tek cümle; über etwas reden.", "Wir reden über Politik. / Sprechen Sie langsam."),
  c("fragen", "sormak", "bitten", "rica etmek", "fragen soru sorar, bitten bir şey ister (um + Akk).", "Ich frage nach dem Weg. / Ich bitte um Hilfe."),
  c("antworten", "cevap vermek (kişiye)", "beantworten", "cevaplamak (soruyu)", "antworten + Dativ kişi; beantworten + Akkusativ soru.", "Antworte mir! / Beantworte die Frage!"),
  c("hören", "duymak", "zuhören", "dinlemek", "hören duymak, zuhören (Dativ) dikkatle dinlemek.", "Ich höre Musik. / Hör mir zu!"),
  c("sehen", "görmek", "schauen", "bakmak", "sehen görme eylemi, schauen/gucken bakmak.", "Ich sehe dich. / Schau mal!"),
  c("treffen", "buluşmak", "kennenlernen", "tanışmak", "sich treffen buluşmak, kennenlernen ilk kez tanışmak.", "Wir treffen uns um acht. / Ich habe sie gestern kennengelernt."),
  c("besuchen", "ziyaret etmek", "suchen", "aramak", "be- eki anlamı değiştirir: suchen aramak, besuchen ziyaret etmek.", "Ich suche den Schlüssel. / Ich besuche meine Oma."),
  c("bestellen", "sipariş etmek", "stellen", "koymak", "bestellen sipariş, stellen dik koymak.", "Ich bestelle Pizza. / Ich stelle die Vase hin."),
  c("anfangen", "başlamak", "beginnen", "başlamak", "Eşanlamlı; anfangen ayrılabilen (fängt … an), beginnen ayrılmaz.", "Der Kurs fängt an. / Der Kurs beginnt."),
  c("aufhören", "bırakmak, durmak", "hören", "duymak", "aufhören bırakmak (mit + Dativ), hören duymak.", "Hör auf zu rauchen! / Ich höre nichts."),
  c("einladen", "davet etmek", "laden", "yüklemek", "einladen davet, laden yüklemek/şarj etmek.", "Ich lade dich ein. / Ich lade das Handy."),
  c("ändern", "değiştirmek", "wechseln", "değiştirmek (yerine)", "ändern niteliği değiştirir (plan, fikir), wechseln yerine başkasını koyar (para, iş).", "Ich ändere den Plan. / Ich wechsle die Stelle."),
  c("Sie", "siz (resmî)", "sie", "o (dişil) / onlar", "Büyük harfli Sie resmî siz; küçük sie o (dişil) ya da onlar — fiil söyler: sie kommt / sie kommen.", "Kommen Sie? / Sie kommt. / Sie kommen."),
  c("ihr", "siz; onun (dişil)", "Ihr", "sizin (resmî)", "ihr zamir (siz) ya da iyelik (onun); Ihr büyük harf resmî sizin.", "Kommt ihr? / Ihr Auto ist neu."),
  c("wann", "ne zaman", "wenn", "eğer, -dığında", "wann soru kelimesi; wenn bağlaç (koşul/tekrarlanan zaman); als geçmişte bir kez.", "Wann kommst du? / Wenn es regnet, bleibe ich."),
  c("wenn", "-dığında (tekrar/gelecek)", "als", "-dığında (geçmişte bir kez)", "als tek seferlik geçmiş olay, wenn tekrarlanan ya da gelecekteki.", "Als ich Kind war… / Wenn ich Zeit habe…"),
  c("wo", "nerede", "wohin", "nereye", "wo durağan konum, wohin hareket hedefi (woher nereden).", "Wo wohnst du? / Wohin gehst du?"),
  c("nach", "-e (şehir/ülke), sonra", "zu", "-e (kişi/kurum)", "nach şehir/ülke/yön; zu kişi ve kurum (zum Arzt).", "Ich fahre nach Berlin. / Ich gehe zum Arzt."),
  c("seit", "-den beri", "vor", "önce", "seit hâlâ süren (seit 2020), vor geçmişte bir nokta (vor zwei Jahren).", "Ich wohne seit 2020 hier. / Vor zwei Jahren kam ich."),
  c("nicht", "değil", "kein", "hiç (isim)", "kein ein'li/artikelsiz ismi olumsuzlar, nicht geri kalanı.", "Ich habe kein Auto. / Ich komme nicht."),
  c("nur", "sadece", "erst", "ancak, henüz", "nur miktar sınırı (sadece 5 Euro), erst zaman sınırı (henüz saat 8, ancak yarın).", "Nur zwei Euro. / Es ist erst acht Uhr."),
  c("gern", "severek", "gerne", "severek", "İkisi aynı; gern daha yaygın. lieber daha çok severek, am liebsten en çok.", "Ich trinke gern Tee. / Ich trinke lieber Kaffee."),
  c("viel", "çok (sayılamayan)", "viele", "çok (sayılabilen)", "viel + tekil/kütle (viel Zeit), viele + çoğul (viele Leute).", "Ich habe viel Zeit. / Viele Leute kommen."),
  c("ein bisschen", "biraz", "ein paar", "birkaç", "ein bisschen miktar (biraz su), ein paar sayı (birkaç elma).", "Ein bisschen Wasser. / Ein paar Äpfel."),
  c("etwas", "bir şey; biraz", "etwa", "yaklaşık; acaba", "etwas bir şey/biraz, etwa yaklaşık.", "Ich möchte etwas essen. / Es kostet etwa 10 Euro."),
  c("doch", "ama; tabii ki (olumsuz soruya)", "ja", "evet", "Olumsuz soruya olumlu cevap doch, ja değil: Hast du keine Zeit? — Doch!", "Kommst du nicht? — Doch! / Kommst du? — Ja."),
  c("das", "bu; o (nötr artikel)", "dass", "-diği (bağlaç)", "das artikel/zamir (tek s), dass yan cümle bağlacı (çift s, fiil sona).", "Das Haus ist alt. / Ich weiß, dass es alt ist."),
  c("wer", "kim", "wir", "biz", "wer soru (kim), wir zamir (biz); e açık, i kapalı.", "Wer ist das? / Wir sind da."),
  c("Sie", "siz (resmî)", "sie", "o (dişil) / onlar", "Büyük harfli Sie resmî siz; küçük sie o (dişil) ya da onlar.", "Können Sie helfen? / Sie kommt."),
  c("Mann", "adam", "man", "insan (genel özne)", "Mann isim (adam), man genel özne (insan, biri) — küçük, tek n.", "Der Mann lacht. / Man sagt, es regnet."),
  c("mehr", "daha çok", "mehrere", "birkaç", "mehr karşılaştırma (daha çok), mehrere birkaç.", "Ich will mehr. / Mehrere Leute warten."),
  c("lang", "uzun", "lange", "uzun süre", "lang sıfat (uzun), lange zarf (uzun süre).", "Der Weg ist lang. / Ich warte lange."),
  c("spät", "geç", "später", "sonra", "spät geç (saat), später daha sonra.", "Es ist spät. / Bis später!"),
  c("gestern", "dün", "morgen", "yarın", "morgen yarın (küçük harf), der Morgen sabah (büyük); gestern dün.", "Gestern war Montag. / Morgen ist Mittwoch. / Am Morgen…"),
  c("morgen", "yarın", "Morgen", "sabah", "Küçük harf morgen zarf (yarın), büyük harf Morgen isim (sabah).", "Morgen komme ich. / Guten Morgen!"),
  c("Abend", "akşam", "Abendessen", "akşam yemeği", "Abend zaman dilimi, Abendessen yemek.", "Am Abend lese ich. / Das Abendessen ist fertig."),
  c("Essen", "yemek (isim)", "essen", "yemek (fiil)", "Büyük harf isim, küçük harf fiil.", "Das Essen ist gut. / Wir essen jetzt."),
  c("Frühstück", "kahvaltı", "Mittagessen", "öğle yemeği", "Frühstück kahvaltı, Mittagessen öğle, Abendessen akşam.", "Zum Frühstück Brot. / Zum Mittagessen Suppe."),
  c("lecker", "lezzetli", "leer", "boş", "lecker lezzetli (ck), leer boş (ee).", "Das ist lecker. / Der Kühlschrank ist leer."),
  c("Glas", "bardak; cam", "Gläser", "bardaklar", "Umlaut çoğul: ein Glas, zwei Gläser.", "Ein Glas Wasser. / Zwei Gläser Wein."),
  c("Flasche", "şişe", "Fläche", "yüzey", "Flasche şişe, Fläche yüzey/alan.", "Eine Flasche Wasser. / Die Fläche ist groß."),
  c("Tasche", "çanta", "Tasse", "fincan", "Tasche çanta (sch), Tasse fincan (ss).", "Meine Tasche ist schwer. / Eine Tasse Kaffee."),
  c("Schrank", "dolap", "Schranke", "bariyer", "Schrank dolap, Schranke bariyer (sonda -e).", "Der Schrank ist voll. / Die Schranke ist unten."),
  c("Stuhl", "sandalye", "Stall", "ahır", "Stuhl sandalye (uzun u), Stall ahır (a).", "Setz dich auf den Stuhl. / Die Kühe sind im Stall."),
  c("Tisch", "masa", "Fisch", "balık", "Tisch masa (t), Fisch balık (f).", "Der Tisch ist rund. / Der Fisch schmeckt."),
  c("Kind", "çocuk", "Kinn", "çene", "Kind çocuk (-nd → nt), Kinn çene (nn).", "Das Kind spielt. / Er hat ein breites Kinn."),
  c("Hand", "el", "Hund", "köpek", "Hand el (a), Hund köpek (u).", "Gib mir die Hand. / Der Hund bellt."),
  c("Mund", "ağız", "Mond", "ay (gök)", "Mund ağız (u), Mond ay (o).", "Mach den Mund auf. / Der Mond scheint."),
  c("Bein", "bacak", "Bahn", "tren/ray", "Bein bacak (ay), Bahn tren (aa).", "Mein Bein tut weh. / Ich fahre mit der Bahn."),
  c("Auge", "göz", "Augen", "gözler", "Auge tekil, Augen çoğul (-n).", "Mein Auge tut weh. / Ihre Augen sind blau."),
  c("Ohr", "kulak", "Uhr", "saat", "Ohr kulak (o), Uhr saat (u).", "Mein Ohr tut weh. / Es ist neun Uhr."),
  c("Wetter", "hava (durumu)", "Winter", "kış", "Wetter hava durumu, Winter kış.", "Das Wetter ist schön. / Im Winter schneit es."),
  c("Luft", "hava (gaz)", "Wetter", "hava (durum)", "Luft solunan hava, Wetter hava durumu — Türkçede ikisi 'hava'.", "Die Luft ist frisch. / Das Wetter ist gut."),
  c("Ferien", "tatil (okul)", "Urlaub", "tatil (izin)", "Ferien okul tatili, Urlaub çalışanın izni.", "In den Ferien fahre ich weg. / Ich habe Urlaub."),
  c("Reise", "yolculuk", "Fahrt", "sürüş, sefer", "Reise uzun yolculuk, Fahrt bir araçla yapılan sefer.", "Gute Reise! / Die Fahrt dauert zwei Stunden."),
  c("Karte", "kart; harita; bilet", "Ticket", "bilet", "Karte çok anlamlı (kart, harita, menü, bilet); Ticket yalnız bilet.", "Zahlen Sie mit Karte? / Ein Ticket nach Bonn."),
  c("Zug", "tren", "Flug", "uçuş", "Zug tren, Flug uçuş.", "Der Zug fährt ab. / Der Flug ist pünktlich."),
  c("Gleis", "peron (ray)", "Bahnsteig", "peron (platform)", "Gleis ray numarası (Gleis 3), Bahnsteig durulan platform.", "Der Zug fährt von Gleis 3. / Wir warten auf dem Bahnsteig."),
  c("Haltestelle", "durak", "Bahnhof", "istasyon", "Haltestelle otobüs/tramvay durağı, Bahnhof tren istasyonu.", "Die Haltestelle ist da vorne. / Der Bahnhof ist groß."),
  c("Straße", "cadde", "Weg", "yol, patika", "Straße asfalt cadde, Weg yol/patika ve mecazi yol.", "Die Straße ist laut. / Ein Weg durch den Wald."),
  c("Ecke", "köşe", "Rand", "kenar", "Ecke köşe (iki kenarın buluştuğu), Rand kenar.", "An der Ecke ist ein Café. / Am Rand der Stadt."),
  c("Schloss", "kale; kilit", "Schluss", "son", "Schloss şato ya da kilit (o), Schluss son (u).", "Das Schloss ist alt. / Schluss für heute!"),
  c("Burg", "kale (savunma)", "Berg", "dağ", "Burg kale (u), Berg dağ (e).", "Die Burg steht auf dem Berg."),
  c("See", "göl (der) / deniz (die)", "Meer", "deniz", "der See göl, die See deniz; Meer deniz.", "Der See ist ruhig. / Das Meer ist blau."),
  c("Wald", "orman", "Welt", "dünya", "Wald orman (a), Welt dünya (e).", "Im Wald ist es dunkel. / Die Welt ist groß."),
  c("Blume", "çiçek", "Blüte", "çiçek (tomurcuk)", "Blume çiçek bitkisi, Blüte çiçeğin açan kısmı.", "Eine rote Blume. / Die Blüte ist offen."),
  c("Baum", "ağaç", "Raum", "oda, mekân", "Baum ağaç (b), Raum oda/alan (r).", "Ein hoher Baum. / Der Raum ist groß."),
  c("Ober", "garson (eski)", "über", "üzerinde", "Herr Ober garson çağırma (eski); über edat.", "Herr Ober, bitte zahlen! / Über dem Tisch."),
  c("Kellner", "garson", "Keller", "bodrum", "Kellner garson (-ner), Keller bodrum.", "Der Kellner bringt Wein. / Der Wein liegt im Keller."),
];

const INDEX = new Map<string, Confusable[]>();
for (const x of CONFUSABLES) {
  for (const k of [x.a, x.b]) INDEX.set(k.toLowerCase(), [...(INDEX.get(k.toLowerCase()) ?? []), x]);
}

/** Kelimenin karıştırıldığı çiftler. */
export function confusablesFor(de: string): Confusable[] {
  return INDEX.get(de.toLowerCase().replace(/^(der|die|das)\s+/, "")) ?? [];
}

/**
 * Anlam hatasında ayrım cümlesi: hedef kelime `de`, öğrencinin seçtiği
 * karşılık ya da yazdığı kelime `detail`. Çiftin öbür yarısının Türkçesi ya
 * da Almancası seçilenle örtüşüyorsa o çiftin cümlesi döner.
 */
export function confusableHint(de: string, detail?: string | null): Confusable | null {
  const list = confusablesFor(de);
  if (!list.length) return null;
  if (!detail) return list[0];
  const d = detail.toLowerCase().trim();
  const hit = list.find((x) => {
    const other = x.a.toLowerCase() === de.toLowerCase().replace(/^(der|die|das)\s+/, "") ? x : { ...x, a: x.b, b: x.a, aTr: x.bTr, bTr: x.aTr };
    return other.b.toLowerCase() === d || other.bTr.toLowerCase().split(/[,;]/).some((t) => t.trim() === d) || d.includes(other.b.toLowerCase());
  });
  return hit ?? null;
}
