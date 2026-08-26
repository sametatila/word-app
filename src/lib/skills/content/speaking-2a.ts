import type { SpeakingDrillExercise, SpeakingTask } from "../types";

/**
 * Telaffuz drilleri, ikinci küme — A1/A2 (WP-72 / WP-21 adım 2).
 *
 * Her drill Türkçe konuşanın BİR sapmasını hedefler ve sapmanın tanıyıcıda
 * hangi yanlış kelimeye düştüğünü söyler (`confusions`): "Tür" yerine
 * "Tier" duyulursa ü dudak yuvarlaklığı düşmüş demektir. Sapma başka bir
 * Almanca kelimeye denk gelmiyorsa tanıyıcı yine de hedefi tutturamaz;
 * o durumda `hint` tek başına yol gösterir. Kimlikler `-p` (pronunciation)
 * — `speaking.ts`'teki `-s` kimlikleriyle çakışmaz.
 */
const t = (de: string, tr: string, hint: string, heard?: string[], fix?: string, expected?: string): SpeakingTask => ({
  de,
  tr,
  hint,
  ...(heard && fix ? { confusions: [{ heard, fix, expected }] } : {}),
});

const drill = (
  id: string,
  level: SpeakingDrillExercise["level"],
  title: string,
  intro: string,
  gloss: { de: string; tr: string }[],
  tasks: SpeakingTask[],
): SpeakingDrillExercise => ({ id, level, skill: "speaking", title, genre: "Ses çalışması", intro, gloss, minutes: 5, tasks });

export const speaking2a: SpeakingDrillExercise[] = [
  // ── A1 ──
  drill("a1-p1", "A1", "Das runde „ü“", "Türkçede ü var, ama Almancada dudaklar daha yuvarlak ve ses ya kısa ya uzun. Yuvarlaklık düşerse „ü“ „i“ye kayar: Tür → Tier.",
    [{ de: "die Tür / das Tier", tr: "kapı / hayvan" }, { de: "für / vier", tr: "için / dört" }, { de: "müde", tr: "yorgun" }],
    [
      t("Die Tür ist offen.", "Kapı açık.", "„Tür“de ü UZUN ve dudaklar büzük: TÜÜR.", ["Tier", "Tiere"], "„Tür“ (kapı) yerine „Tier“ (hayvan) duyuldu: dudakları yuvarla, ses i'ye kaymasın.", "Tür"),
      t("Das ist für dich.", "Bu senin için.", "„für“de ü kısa ama yuvarlak; „vier“ (dört) ile karışmasın.", ["vier", "wir"], "„für“ yerine „vier“ duyuldu — dudakları büz, ü sesini net ver.", "für"),
      t("Ich bin sehr müde.", "Çok yorgunum.", "„müde“: MÜÜ-de, uzun ü, sonda hafif e.", ["Miete", "mied"], "„müde“ yerine „Miete“ (kira) duyuldu: ü'yü yuvarla ve uzat.", "müde"),
      t("Wir üben jeden Tag.", "Her gün alıştırma yapıyoruz.", "„üben“: ÜÜ-ben, ilk hece uzun.", ["eben", "oben"], "„üben“ yerine „eben“/„oben“ duyuldu: baştaki ü'yü tam ver.", "üben"),
      t("Fünf Minuten, bitte.", "Beş dakika, lütfen.", "„fünf“te ü KISA: FÜNF, uzatma.", ["fünfte", "Fund"], "„fünf“ tam çıkmadı; kısa, yuvarlak ü ve sondaki f.", "fünf"),
    ]),
  drill("a1-p2", "A1", "Das runde „ö“", "„ö“ Türkçedekine yakın, ama uzun „ö“ (schön) Türkçede yok. Kısa tutulursa „schon“ (zaten) duyulur — anlam değişir.",
    [{ de: "schön / schon", tr: "güzel / zaten" }, { de: "hören", tr: "duymak" }, { de: "können", tr: "-ebilmek" }],
    [
      t("Das ist sehr schön.", "Bu çok güzel.", "„schön“: ŞÖÖN, ö uzun ve yuvarlak.", ["schon", "Schon"], "„schön“ (güzel) yerine „schon“ (zaten) duyuldu: ö'yü uzat ve dudakları büz.", "schön"),
      t("Ich höre Musik.", "Müzik dinliyorum.", "„höre“: HÖÖ-re, uzun ö.", ["Herr", "her"], "„höre“ yerine „Herr“ duyuldu: ö yuvarlaklığı düştü.", "höre"),
      t("Wir können kommen.", "Gelebiliriz.", "„können“: KÖN-nen, ö KISA; çift n ünlüyü kısaltır.", ["kennen", "Kennen"], "„können“ (-ebilmek) yerine „kennen“ (tanımak) duyuldu — ö'yü ver, e'ye kaydırma.", "können"),
      t("Möchten Sie Tee?", "Çay ister misiniz?", "„möchten“: MÖŞ-ten, ö kısa, ch yumuşak.", ["machten", "Mächten"], "„möchten“ yerine „machten“ duyuldu: ö sesi a'ya kaydı.", "möchten"),
      t("Die Söhne sind groß.", "Oğullar büyük.", "„Söhne“: ZÖÖ-ne, uzun ö (h uzatıyor).", ["Sonne", "Söhnen"], "„Söhne“ (oğullar) yerine „Sonne“ (güneş) duyuldu: ö uzun ve yuvarlak.", "Söhne"),
    ]),
  drill("a1-p3", "A1", "Das deutsche „r“", "Almanca „r“ gırtlaktan (küçük dilden) çıkar; Türkçedeki dil ucu r'si anlaşılır ama yabancı duyulur. Sondaki „-er“ ise hiç r değildir, „a“ya yakındır.",
    [{ de: "rot", tr: "kırmızı" }, { de: "das Brot", tr: "ekmek" }, { de: "die Reise", tr: "yolculuk" }],
    [
      t("Das Auto ist rot.", "Araba kırmızı.", "„rot“: gırtlaktan hafif bir hırıltıyla R, sonra uzun o.", ["Rat", "Rad"], "„rot“ yerine „Rat“/„Rad“ duyuldu: o'yu uzun ve yuvarlak ver.", "rot"),
      t("Ich kaufe Brot.", "Ekmek alıyorum.", "„Brot“: b'den hemen sonra gırtlak r'si, o uzun.", ["Boot", "Brad"], "„Brot“ yerine „Boot“ duyuldu: r düştü; b ile o arasında r'yi hissettir.", "Brot"),
      t("Die Reise war lang.", "Yolculuk uzundu.", "„Reise“: R + AY-ze; r'yi dil ucuyla titretme.", ["Eise", "Leise"], "„Reise“ yerine „leise“ duyuldu: baştaki r çıkmadı.", "Reise"),
      t("Mein Bruder ist hier.", "Erkek kardeşim burada.", "„Bruder“: BRUU-da — sondaki -er „a“ gibi.", ["Brüder", "Brudern"], "„Bruder“ (tekil) yerine „Brüder“ (çoğul) duyuldu: u'yu yuvarlama, düz u.", "Bruder"),
      t("Wir fahren nach Rom.", "Roma'ya gidiyoruz.", "„Rom“: gırtlak R + uzun o; „fahren“de r ünlü gibi yumuşar.", ["Raum", "Ruhm"], "„Rom“ yerine „Raum“ duyuldu: o'yu tek ünlü olarak tut, au yapma.", "Rom"),
    ]),
  drill("a1-p4", "A1", "Das „h“ am Anfang", "Kelime başındaki h Almancada NEFESLİ ve duyulur; düşerse „Haus“ „aus“ olur. Türkçede h var, sorun düşürme alışkanlığı.",
    [{ de: "das Haus / aus", tr: "ev / -den" }, { de: "hier", tr: "burada" }, { de: "haben", tr: "sahip olmak" }],
    [
      t("Das Haus ist alt.", "Ev eski.", "„Haus“: nefesli H, sonra AU.", ["aus", "Aus"], "„Haus“ (ev) yerine „aus“ (-den) duyuldu: baştaki h'yi nefesle çıkar.", "Haus"),
      t("Ich bin hier.", "Buradayım.", "„hier“: H-İİR, h duyulmalı.", ["ihr", "Ihr"], "„hier“ (burada) yerine „ihr“ (siz) duyuldu: h düştü.", "hier"),
      t("Wir haben Zeit.", "Vaktimiz var.", "„haben“: HAA-ben, h nefesli.", ["Abend", "oben"], "„haben“ yerine „Abend“ duyuldu: h başta çıkmadı.", "haben"),
      t("Der Hund ist klein.", "Köpek küçük.", "„Hund“: H + kısa u + nt (sondaki d t okunur).", ["und", "Und"], "„Hund“ (köpek) yerine „und“ (ve) duyuldu: h'yi ver.", "Hund"),
      t("Heute ist es heiß.", "Bugün hava sıcak.", "İki kelimede de h başta: HOY-te, HAYS.", ["Eute", "Eis"], "„heiß“ yerine „Eis“ duyuldu: h nefesi eksik.", "heiß"),
    ]),
  drill("a1-p5", "A1", "„sch“ und „s“", "„sch“ Türkçe ş; ama Almanca „s“ ünlü önünde z gibi ötümlüdür (Sonne = ZON-ne). Türkçe konuşan s'yi sert okur, anlaşılır ama „Sie/sie“ ile „zie“ karışmaz — karışan „Schule/Sule“ tarafı.",
    [{ de: "die Schule", tr: "okul" }, { de: "die Sonne", tr: "güneş" }, { de: "schnell", tr: "hızlı" }],
    [
      t("Die Schule beginnt um acht.", "Okul sekizde başlıyor.", "„Schule“: ŞUU-le, ş net, u uzun.", ["Sule", "Schulen"], "„Schule“ ş ile: ŞUU-le; s ile söylenince anlaşılmıyor.", "Schule"),
      t("Die Sonne scheint.", "Güneş parlıyor.", "„Sonne“: ZON-ne (s ötümlü), „scheint“: ŞAYNT.", ["Sohne", "Söhne"], "„Sonne“ (güneş) yerine „Söhne“ duyuldu: o düz ve KISA.", "Sonne"),
      t("Das geht schnell.", "Bu hızlı gidiyor.", "„schnell“: ŞNEL, ş ile n arasına ünlü koyma.", ["Snell", "Schnee"], "„schnell“de ş-n bitişik; araya ı girerse tanınmıyor.", "schnell"),
      t("Ich spreche Deutsch.", "Almanca konuşuyorum.", "„spreche“: ŞPRE-şe — sp başta „şp“ okunur!", ["spreche", "Sprache"], "„spreche“ yerine „Sprache“ duyuldu: e'yi kısa tut, a yapma.", "spreche"),
      t("Sie ist Studentin.", "O öğrenci.", "„Studentin“: ŞTU-DEN-tin — st başta „şt“.", ["Student", "Studenten"], "„Studentin“ (kadın) yerine „Student“ duyuldu: sondaki -in'i söyle.", "Studentin"),
    ]),
  drill("a1-p6", "A1", "„ei“ = „ay“", "„ei“ Türkçe „ay“ gibi okunur, „ey“ değil: nein = NAYN. „ie“ ise uzun i'dir. İkisi karışınca „mein“ „min“, „drei“ „dri“ olur.",
    [{ de: "nein", tr: "hayır" }, { de: "drei", tr: "üç" }, { de: "mein", tr: "benim" }],
    [
      t("Nein, danke.", "Hayır, teşekkürler.", "„nein“: NAYN.", ["nein", "neun"], "„nein“ yerine „neun“ (dokuz) duyuldu: ay de, oy değil.", "nein"),
      t("Ich habe drei Kinder.", "Üç çocuğum var.", "„drei“: DRAY.", ["die", "drin"], "„drei“ yerine „die“ duyuldu: ei = ay.", "drei"),
      t("Das ist mein Bruder.", "Bu benim erkek kardeşim.", "„mein“: MAYN.", ["meine", "min"], "„mein“ ay ile: MAYN.", "mein"),
      t("Es ist zwei Uhr.", "Saat iki.", "„zwei“: TSVAY — z=ts, w=v, ei=ay.", ["zwölf", "Zeh"], "„zwei“ yerine „zwölf“ duyuldu: ay sesini net ver, ö yapma.", "zwei"),
      t("Wir bleiben hier.", "Burada kalıyoruz.", "„bleiben“: BLAY-ben.", ["blieben", "Leben"], "„bleiben“ yerine „blieben“ duyuldu: ei = ay, ie = ii — ikisi ayrı.", "bleiben"),
    ]),
  drill("a1-p7", "A1", "Zahlen sprechen", "Sayılar en çok söylenen ve en çok yanlış duyulan kelimeler: zwei/drei, sechs/sieben, zwölf/zwanzig. Vurgu ve ünlü uzunluğu ayırıyor.",
    [{ de: "sechs", tr: "altı" }, { de: "sieben", tr: "yedi" }, { de: "zwölf", tr: "on iki" }],
    [
      t("Ich habe sechs Bücher.", "Altı kitabım var.", "„sechs“: ZEKS — chs = ks!", ["sich", "Sex"], "„sechs“te „chs“ ks okunur: ZEKS.", "sechs"),
      t("Es ist sieben Uhr.", "Saat yedi.", "„sieben“: Zİİ-ben, uzun i.", ["Sieben", "siebten"], "„sieben“de ilk hece uzun ii, s ötümlü.", "sieben"),
      t("Wir sind zwölf Personen.", "On iki kişiyiz.", "„zwölf“: TSVÖLF, ö kısa.", ["zwei", "zwanzig"], "„zwölf“ yerine „zwei“ duyuldu: -lf'i sonuna kadar söyle.", "zwölf"),
      t("Das kostet zwanzig Euro.", "Bu yirmi euro.", "„zwanzig“: TSVAN-tsih — sondaki -ig „ih“.", ["zwölf", "zwanzigste"], "„zwanzig“de sondaki g yumuşak ch gibi: -tsih.", "zwanzig"),
      t("Ich bin dreißig Jahre alt.", "Otuz yaşındayım.", "„dreißig“: DRAY-sih.", ["dreizehn", "drei"], "„dreißig“ (30) yerine „dreizehn“ (13) duyuldu: -ßig'i söyle.", "dreißig"),
    ]),
  drill("a1-p8", "A1", "Frage oder Aussage?", "Almancada soru cümlesi sona doğru YÜKSELİR, düz cümle DÜŞER. Türkçede soru eki var, ton düz kalabiliyor; Almancada tonu düz tutunca soru soru gibi duyulmuyor.",
    [{ de: "Kommst du?", tr: "Geliyor musun?" }, { de: "Du kommst.", tr: "Geliyorsun." }],
    [
      t("Kommst du mit?", "Benimle geliyor musun?", "Soru: „mit“te ses YUKARI çıkar.", ["kommst du mit", "kommst du"], "Soru tonu: sonda yukarı. Düz söylenince tanıyıcı cümle sanıyor.", "Kommst du mit?"),
      t("Ich komme mit.", "Geliyorum.", "Düz cümle: „mit“te ses AŞAĞI iner.", ["Ich komme mit?", "Komme mit"], "Düz cümlede ton sonda düşer.", "Ich komme mit."),
      t("Wohnst du in Berlin?", "Berlin'de mi oturuyorsun?", "Evet/hayır sorusu: sona doğru yükselen ton.", ["Wohnst du in Berlin", "Wohnst du"], "Evet/hayır sorusunda sonda yükselt.", "Wohnst du in Berlin?"),
      t("Wo wohnst du?", "Nerede oturuyorsun?", "W-sorusu: ton sonda DÜŞER, vurgu „wo“da.", ["Wo wohnst du", "wohnst du"], "W-sorusunda ton düşer, vurgu soru kelimesinde.", "Wo wohnst du?"),
      t("Das ist richtig.", "Bu doğru.", "Onay: sakin, düşen ton; „richtig“: RİH-tih.", ["richtig", "Das ist richtig?"], "Düz cümle; sonda yükseltirsen soruya döner.", "Das ist richtig."),
    ]),

  // ── A2 ──
  drill("a2-p1", "A2", "„eu“ und „äu“ = „oy“", "„eu“ ve „äu“ Türkçe „oy“ gibi okunur: heute = HOY-te, Häuser = HOY-zer. „ö“ ya da „ey“ diyen Türkçe konuşan kelimeyi başka kelimeye çevirir.",
    [{ de: "heute", tr: "bugün" }, { de: "die Häuser", tr: "evler" }, { de: "neu", tr: "yeni" }],
    [
      t("Heute ist Montag.", "Bugün pazartesi.", "„heute“: HOY-te.", ["Hütte", "höte"], "„heute“ yerine „Hütte“ duyuldu: eu = oy.", "heute"),
      t("Die Häuser sind neu.", "Evler yeni.", "„Häuser“: HOY-zer; „neu“: NOY.", ["Hause", "Hauser"], "„Häuser“ (çoğul) yerine „Hause“ duyuldu: äu = oy.", "Häuser"),
      t("Meine Freunde kommen.", "Arkadaşlarım geliyor.", "„Freunde“: FROYN-de.", ["Freude", "Fremde"], "„Freunde“ (arkadaşlar) yerine „Freude“ (sevinç) duyuldu: n'yi söyle.", "Freunde"),
      t("Das Feuer ist aus.", "Ateş söndü.", "„Feuer“: FOY-a — sondaki -er a gibi.", ["Feier", "Fehler"], "„Feuer“ (ateş) yerine „Feier“ (kutlama) duyuldu: oy, ay değil.", "Feuer"),
      t("Neun Euro, bitte.", "Dokuz euro, lütfen.", "„neun“: NOYN; „Euro“: OY-ro.", ["nein", "neu"], "„neun“ (9) yerine „nein“ duyuldu: oy sesi.", "neun"),
    ]),
  drill("a2-p2", "A2", "„ng“ ohne „g“", "„ng“ tek sestir (İngilizce sing gibi); sonunda ayrı bir g ya da k okunmaz: lange = LAN-e (burundan), „lang-ge“ değil.",
    [{ de: "lange", tr: "uzun süre" }, { de: "singen", tr: "şarkı söylemek" }, { de: "die Wohnung", tr: "daire" }],
    [
      t("Ich warte schon lange.", "Uzun zamandır bekliyorum.", "„lange“: LAN(g)-e, g'yi ayrı patlatma.", ["Lage", "lang"], "„lange“de ng burundan tek ses; sondaki -e kısa.", "lange"),
      t("Wir singen zusammen.", "Birlikte şarkı söylüyoruz.", "„singen“: ZİN(g)-en.", ["sinken", "Singen"], "„singen“ (şarkı söylemek) yerine „sinken“ (batmak) duyuldu: ng'de k yok.", "singen"),
      t("Die Wohnung ist hell.", "Daire aydınlık.", "„Wohnung“: VOO-nun(g).", ["Wohnen", "Wonne"], "„Wohnung“ sonundaki -ung burundan, g patlamaz.", "Wohnung"),
      t("Der Junge ist jung.", "Oğlan genç.", "„Junge“: YUN(g)-e; „jung“: YUN(g).", ["Junk", "Jung"], "„jung“ sonunda k duyulmamalı.", "jung"),
      t("Die Übung ist fertig.", "Alıştırma bitti.", "„Übung“: ÜÜ-bun(g).", ["Ubung", "Übungen"], "„Übung“: ü yuvarlak, sondaki ng burundan.", "Übung"),
    ]),
  drill("a2-p3", "A2", "„pf“ und „qu“", "„pf“ iki ses birden: p'nin hemen ardından f (Apfel = AP-fel). „qu“ ise „kv“ okunur: Quark = KVARK. İkisi de Türkçede yok.",
    [{ de: "der Apfel", tr: "elma" }, { de: "das Pferd", tr: "at" }, { de: "die Quittung", tr: "fiş" }],
    [
      t("Ich esse einen Apfel.", "Bir elma yiyorum.", "„Apfel“: AP-fel, p ve f bitişik.", ["Affel", "Abfall"], "„Apfel“de p düşünce anlaşılmıyor: p + f birlikte.", "Apfel"),
      t("Das Pferd ist schnell.", "At hızlı.", "„Pferd“: PFEART — başta pf!", ["fährt", "Fehrt"], "„Pferd“ (at) yerine „fährt“ (gidiyor) duyuldu: baştaki p'yi ekle.", "Pferd"),
      t("Die Quittung, bitte.", "Fişi lütfen.", "„Quittung“: KVİT-tun(g).", ["Kittung", "Quitte"], "„Quittung“ qu = kv: KVİT.", "Quittung"),
      t("Ich trinke Wasser mit Quark.", "Kuvark yiyorum.", "„Quark“: KVARK.", ["Kark", "Park"], "„Quark“ kv ile başlar; k tek başına yetmiyor.", "Quark"),
      t("Der Kopf tut weh.", "Başım ağrıyor.", "„Kopf“: KOPF, sonda pf.", ["Kopp", "Koffer"], "„Kopf“ sonundaki pf: p'den sonra f'yi bırak.", "Kopf"),
    ]),
  drill("a2-p4", "A2", "Wortakzent: trennbar oder nicht", "Ayrılabilen fiilde vurgu ÖNEKte (ANrufen), ayrılmayanda KÖKte (verSTEHen). Vurgu yanlış heceye düşünce anlaşılırlık düşer; bazı çiftlerde anlam değişir (ÜBersetzen / überSETzen).",
    [{ de: "anrufen", tr: "telefon etmek" }, { de: "verstehen", tr: "anlamak" }, { de: "übersetzen", tr: "çevirmek" }],
    [
      t("Ich rufe dich morgen an.", "Seni yarın ararım.", "Vurgu sondaki „AN“da.", ["Ich rufe dich morgen", "Ich rufe dich morgen ab"], "Sondaki öneki vurgula: … morgen AN.", "an"),
      t("Ich verstehe das nicht.", "Bunu anlamıyorum.", "„verSTEHe“: vurgu ikinci hecede, ver- vurgusuz.", ["Ich verstehe das", "fer stehe"], "„verstehe“de vurgu ste hecesinde; ver- kısa ve vurgusuz.", "verstehe"),
      t("Wir stehen um sieben auf.", "Yedide kalkıyoruz.", "„AUF“ sonda vurgulu.", ["Wir stehen um sieben", "sieben auf"], "Sondaki „auf“ vurgulu ve net.", "auf"),
      t("Sie übersetzt den Text.", "Metni çeviriyor.", "„überSETZT“: vurgu setz'te (çevirmek).", ["über setzt", "übersetzt"], "Çevirmek anlamında vurgu SETZT'te; ÜBER vurgulanırsa 'karşıya geçirmek' olur.", "übersetzt"),
      t("Der Zug kommt um acht an.", "Tren sekizde varıyor.", "„AN“ sonda vurgulu; „kommt“ vurgusuz.", ["Der Zug kommt um acht", "um acht"], "Sondaki „an“ söylenmezse „ankommen“ değil „kommen“ olur.", "an"),
    ]),
  drill("a2-p5", "A2", "Das schwache „-e“ am Ende", "Sondaki -e Almancada zayıf, kısa bir „ı/e“ arasıdır (Schwa) ve HİÇ düşmez: bitte = Bİ-tı. Türkçe konuşan ya tam e der ya düşürür; düşünce „bitte“ „bit“ olur.",
    [{ de: "bitte", tr: "lütfen" }, { de: "die Tasche", tr: "çanta" }, { de: "ich habe", tr: "sahibim" }],
    [
      t("Bitte, danke!", "Lütfen, teşekkürler!", "„bitte“: Bİ-tı, sondaki e zayıf ama VAR.", ["bit", "Bild"], "„bitte“ sonundaki -e düştü; zayıf da olsa söyle.", "bitte"),
      t("Die Tasche ist schwer.", "Çanta ağır.", "„Tasche“: TA-şı.", ["Tasch", "Tisch"], "„Tasche“ sonundaki -e'yi bırakma.", "Tasche"),
      t("Ich habe Hunger.", "Açım.", "„habe“: HAA-bı.", ["hab", "Hab"], "„habe“ sonundaki -e zayıf ama var; „hab“ konuşma dili.", "habe"),
      t("Ich möchte eine Karte.", "Bir kart istiyorum.", "„möchte“, „eine“, „Karte“: üçünde de sondaki -e zayıf.", ["Kart", "Karten"], "„Karte“ (tekil) sonundaki -e düşünce „Kart“ oluyor.", "Karte"),
      t("Das ist eine gute Frage.", "Bu iyi bir soru.", "„gute“, „Frage“: GUU-tı, FRAA-gı.", ["Frag", "Frau"], "„Frage“ sonundaki -e'yi söyle; aksi hâlde „Frau“ duyuluyor.", "Frage"),
    ]),
  drill("a2-p6", "A2", "„ch“ nach hellen Vokalen", "i, e, ü, ö ve ünsüzden sonra „ch“ yumuşak (ich = İH, hışırtılı h); a, o, u'dan sonra sert (ach). Türkçe konuşan ikisini de „k“ ya da „ş“ yapıyor: ich → ik / iş.",
    [{ de: "ich", tr: "ben" }, { de: "die Milch", tr: "süt" }, { de: "die Kirche", tr: "kilise" }],
    [
      t("Ich bin nicht müde.", "Yorgun değilim.", "„ich“ ve „nicht“: yumuşak ch — dilin ortasından hışırtı, k değil.", ["ik", "isch"], "„ich“te ch k ya da ş değil; damağa yakın yumuşak h.", "ich"),
      t("Ich trinke Milch.", "Süt içiyorum.", "„Milch“: MİLH, l'den sonra yumuşak ch.", ["Milk", "Milsch"], "„Milch“ sonundaki ch yumuşak: k değil.", "Milch"),
      t("Die Kirche ist alt.", "Kilise eski.", "„Kirche“: KİR-hı, r'den sonra yumuşak ch.", ["Kirsche", "Kirke"], "„Kirche“ (kilise) yerine „Kirsche“ (kiraz) duyuldu: ch ş değil.", "Kirche"),
      t("Das Mädchen lacht.", "Kız gülüyor.", "„Mädchen“: MEET-hen (yumuşak); „lacht“: LAHT (sert).", ["Mätchen", "Mädschen"], "„Mädchen“de ch yumuşak h; ş yapma.", "Mädchen"),
      t("Ich möchte auch.", "Ben de istiyorum.", "„möchte“ yumuşak ch, „auch“ sert ch (gırtlak).", ["auk", "auch"], "„auch“ta ch gırtlaktan sert h; k değil.", "auch"),
    ]),
  drill("a2-p7", "A2", "Lange Vokale mit „h“ und Doppelvokal", "„h“ ünlüden sonra okunmaz, uzatır (Zahl = TSAAL); çift ünlü de uzatır (Boot, Tee). Kısa söylenince kelime değişir: Zahl → Zal (yok), Boot → bot.",
    [{ de: "die Zahl", tr: "sayı" }, { de: "das Boot", tr: "tekne" }, { de: "der Tee", tr: "çay" }],
    [
      t("Die Zahl ist groß.", "Sayı büyük.", "„Zahl“: TSAAL, h okunmaz, a uzun.", ["Zal", "Saal"], "„Zahl“: z = ts, a uzun; h sessiz.", "Zahl"),
      t("Das Boot ist neu.", "Tekne yeni.", "„Boot“: BOOT, uzun o.", ["Bot", "Brot"], "„Boot“ta o uzun; kısa söylenince anlaşılmıyor.", "Boot"),
      t("Ich trinke gern Tee.", "Çay içmeyi severim.", "„Tee“: TEE, uzun e.", ["Te", "Tea"], "„Tee“de e uzun.", "Tee"),
      t("Wir nehmen den Zug.", "Treni alıyoruz.", "„nehmen“: NEE-men, h uzatır.", ["nemen", "Namen"], "„nehmen“ yerine „Namen“ duyuldu: e uzun, a değil.", "nehmen"),
      t("Ihr Sohn wohnt hier.", "Oğlunuz burada oturuyor.", "„Sohn“: ZOON; „wohnt“: VOONT.", ["Son", "Sonne"], "„Sohn“ (oğul) yerine „Sonne“ duyuldu: o uzun, h sessiz.", "Sohn"),
    ]),
];
