import type { CefrLevel } from "@/lib/skills/types";

/**
 * CEFR "yapabilirim" haritası (plan WP-43).
 *
 * Dersler, egzersizler, drill'ler ve sınav bölümleri bir yapabilirlik
 * ifadesine bağlanır; profil "Yapabildiklerim" bu ifadeleri kanıtla
 * gösterir. Kaynak: CEFR Companion Volume (2020) ölçekleri ve Profile
 * Deutsch'un seviye kalıpları — Türkçeye sade, günlük dille aktarıldı;
 * öğrenci "A2 dinleme ölçeği" değil "telefonda randevu alabilirim" okur.
 *
 * Kimlik `<seviye>.<beceri>.<n>` (A1.SPK.1). Kimlikler kalıcıdır: içerik
 * etiketleri ve kullanıcı kanıtları buna bağlanır; ifade metni düzeltilebilir,
 * kimlik değişmez, silinmez (gerekirse `retired: true`).
 *
 * Beceri kodları: RD okuma, LS dinleme, WR yazma, SPK konuşma, GR dilbilgisi.
 */

export type CandoSkill = "RD" | "LS" | "WR" | "SPK" | "GR";

export type Cando = {
  id: string;
  level: CefrLevel;
  skill: CandoSkill;
  /** Türkçe, birinci tekil: "…yapabilirim". */
  tr: string;
  /** Almanca kısa başlık (isteğe bağlı; sınav/sertifika görünümü). */
  de?: string;
  source: "CEFR-CV" | "Profile Deutsch";
  retired?: boolean;
};

/**
 * Beceri adları — ANAHTAR, metin değil. Değerler Türkçe yazılıydı, yani
 * Yapabildiklerim ekranı Almanca arayüzde de "Okuma"/"Dinleme" diyordu.
 * Anahtarlar Beceriler sekmesindekilerle aynı (`skills/meta` SKILL_LABEL_KEYS):
 * iki ekranda aynı beş beceri, tek çeviri.
 */
export const CANDO_SKILL_LABEL_KEYS: Record<CandoSkill, string> = {
  RD: "skills.reading",
  LS: "skills.listening",
  WR: "skills.writing",
  SPK: "skills.speaking",
  GR: "skills.grammar",
};

const c = (level: CefrLevel, skill: CandoSkill, n: number, tr: string, source: Cando["source"] = "CEFR-CV", de?: string): Cando => ({
  id: `${level}.${skill}.${n}`,
  level,
  skill,
  tr,
  de,
  source,
});

export const CANDO: Cando[] = [
  // ── A1 ─────────────────────────────────────────────────────────────
  c("A1", "SPK", 1, "Kendimi tanıtabilirim: adım, nereli olduğum, nerede oturduğum.", "Profile Deutsch", "Sich vorstellen"),
  c("A1", "SPK", 2, "Selamlaşıp hâl hatır sorabilir, vedalaşabilirim."),
  c("A1", "SPK", 3, "Kafede, fırında ya da markette basit sipariş verip fiyat sorabilirim.", "Profile Deutsch"),
  c("A1", "SPK", 4, "Sayıları, saati, tarihi ve telefon numaramı söyleyebilirim."),
  c("A1", "SPK", 5, "Mesleğimi, ailemi ve hobilerimi birkaç cümleyle anlatabilirim."),
  c("A1", "SPK", 6, "Yavaş ve net konuşulursa basit soruları cevaplayabilir, anlamadığımda tekrar isteyebilirim."),
  c("A1", "LS", 1, "Yavaş ve net söylenen selamlama, tanışma ve basit yönergeleri anlayabilirim."),
  c("A1", "LS", 2, "Sayıları, fiyatları ve saatleri duyduğumda anlayabilirim."),
  c("A1", "LS", 3, "Kısa bir telesekreter mesajının konusunu (kim, ne zaman) yakalayabilirim."),
  c("A1", "LS", 4, "Bir markette ya da kafede bana söylenen basit cümleleri anlayabilirim."),
  c("A1", "LS", 5, "Kendini tanıtan birinin adını, nereli olduğunu ve mesleğini anlayabilirim."),
  c("A1", "RD", 1, "Tabelaları, menüleri ve basit ilanları okuyup anlayabilirim."),
  c("A1", "RD", 2, "Kısa bir mesajı ya da kartpostalı (selam, davet, teşekkür) anlayabilirim."),
  c("A1", "RD", 3, "Basit bir formu (ad, adres, doğum tarihi) okuyup ne istendiğini anlayabilirim."),
  c("A1", "RD", 4, "Kısa ve basit bir tanıtım metninde (kişi, ürün) temel bilgileri bulabilirim."),
  c("A1", "RD", 5, "Bir programda ya da tarifede saat ve yer bilgisini bulabilirim."),
  c("A1", "WR", 1, "Bir formu kişisel bilgilerimle doldurabilirim."),
  c("A1", "WR", 2, "Kısa bir selam, teşekkür ya da davet mesajı yazabilirim."),
  c("A1", "WR", 3, "Kendimi tanıtan 3–5 cümle yazabilirim."),
  c("A1", "WR", 4, "Basit ana cümleler kurup birbirine 'und' ve 'aber' ile bağlayabilirim."),
  c("A1", "WR", 5, "Günlük rutinimi basit cümlelerle yazabilirim."),
  c("A1", "GR", 1, "Isimlerin artikelini (der/die/das) ve çoğulunu doğru kullanabilirim."),
  c("A1", "GR", 2, "Fiilleri Präsens'te özneye göre çekebilirim (ich/du/er…)."),
  c("A1", "GR", 3, "Ana cümlede fiili ikinci sıraya koyabilir, soru cümlesi kurabilirim."),
  c("A1", "GR", 4, "sein, haben ve temel modal fiilleri (können, möchten) kullanabilirim."),
  c("A1", "GR", 5, "Kişi ve iyelik zamirlerini (ich/mein, du/dein…) doğru seçebilirim."),
  c("A1", "GR", 6, "Ayrılabilir fiilleri (aufstehen, anrufen) ana cümlede doğru yerleştirebilirim."),

  // ── A2 ─────────────────────────────────────────────────────────────
  c("A2", "SPK", 1, "Telefonda randevu alabilir, saat ve gün kararlaştırabilirim.", "Profile Deutsch"),
  c("A2", "SPK", 2, "Yol tarif edebilir ve tarif alabilirim."),
  c("A2", "SPK", 3, "Geçmişte yaptığım bir şeyi (dün, hafta sonu, tatil) Perfekt ile anlatabilirim."),
  c("A2", "SPK", 4, "Doktora şikâyetimi söyleyebilir, eczanede ilaç isteyebilirim.", "Profile Deutsch"),
  c("A2", "SPK", 5, "Alışverişte beden, renk ve fiyat hakkında konuşabilir, iade isteyebilirim."),
  c("A2", "SPK", 6, "Bir davete cevap verebilir, teklif yapıp kabul ya da ret edebilirim."),
  c("A2", "SPK", 7, "Basit bir sorunumu (bozuk cihaz, gürültü) kibarca anlatabilirim."),
  c("A2", "LS", 1, "Tren/otobüs anonslarında peron, saat ve gecikme bilgisini anlayabilirim."),
  c("A2", "LS", 2, "Telefonda bir randevu ya da sipariş konuşmasının ana noktalarını anlayabilirim."),
  c("A2", "LS", 3, "Yavaş bir sohbette konuyu ve kişilerin ne istediğini takip edebilirim."),
  c("A2", "LS", 4, "Kısa bir radyo/podcast bölümünden hava, trafik ya da etkinlik bilgisini alabilirim."),
  c("A2", "LS", 5, "Doktor, memur ya da satıcının bana verdiği basit talimatları anlayabilirim."),
  c("A2", "RD", 1, "Kısa bir e-posta ya da mesajdaki isteği, tarihi ve yeri anlayabilirim."),
  c("A2", "RD", 2, "İlanlardan (ev, iş, ikinci el) bana uyanı seçebilirim."),
  c("A2", "RD", 3, "Basit bir duyuruyu ya da bilgi yazısını (kurallar, çalışma saatleri) anlayabilirim."),
  c("A2", "RD", 4, "Kısa bir gazete haberinin ne hakkında olduğunu anlayabilirim."),
  c("A2", "RD", 5, "Bir yemek tarifi ya da kullanım talimatındaki adımları takip edebilirim."),
  c("A2", "WR", 1, "Arkadaşıma buluşma teklif eden, yer ve saat veren bir mesaj yazabilirim."),
  c("A2", "WR", 2, "Bir daveti kabul ya da ret eden kısa e-posta yazabilirim."),
  c("A2", "WR", 3, "Tatilimi ya da hafta sonumu Perfekt ile 5–8 cümlede anlatabilirim."),
  c("A2", "WR", 4, "Kısa bir şikâyet ya da özür notu yazabilirim."),
  c("A2", "WR", 5, "weil, dass ve wenn ile sebep ve koşul cümleleri yazabilirim."),
  c("A2", "GR", 1, "Perfekt'i (haben/sein + Partizip II) düzenli ve sık düzensiz fiillerle kurabilirim."),
  c("A2", "GR", 2, "Akkusativ ve Dativ artikelleri ve edatlarını (mit, für, zu…) doğru seçebilirim."),
  c("A2", "GR", 3, "weil/dass/wenn yan cümlelerinde fiili sona koyabilirim."),
  c("A2", "GR", 4, "Modal fiilleri (müssen, dürfen, sollen, wollen) Präsens ve Präteritum'da kullanabilirim."),
  c("A2", "GR", 5, "Emir kipini (du/ihr/Sie) kurabilirim."),
  c("A2", "GR", 6, "Karşılaştırma yapabilirim (größer als, am besten)."),

  // ── B1 ─────────────────────────────────────────────────────────────
  c("B1", "SPK", 1, "Bir konuda görüşümü söyleyip iki-üç gerekçe verebilirim."),
  c("B1", "SPK", 2, "Bir film, kitap ya da olayı ana hatlarıyla anlatabilirim."),
  c("B1", "SPK", 3, "Resmî bir kurumda (belediye, banka) derdimi anlatıp gerekli bilgiyi alabilirim.", "Profile Deutsch"),
  c("B1", "SPK", 4, "Bir şikâyeti kibar ama net biçimde iletebilir, çözüm önerebilirim."),
  c("B1", "SPK", 5, "Planlarımı ve hayallerimi (würde, möchte, wenn) anlatabilirim."),
  c("B1", "SPK", 6, "Bir konuşmada söz alıp karşımdakine katılıp katılmadığımı belirtebilirim."),
  c("B1", "SPK", 7, "İki dakikalık kısa bir sunum yapabilirim (kendim, şehrim, işim)."),
  c("B1", "LS", 1, "Günlük konuşma hızındaki bir sohbette ana fikri ve ayrıntıların çoğunu anlayabilirim."),
  c("B1", "LS", 2, "Haber bülteninin ana başlıklarını anlayabilirim."),
  c("B1", "LS", 3, "Bir röportajda kişinin görüşünü ve gerekçesini takip edebilirim."),
  c("B1", "LS", 4, "İş yerinde bir toplantıdaki talimat ve kararları anlayabilirim."),
  c("B1", "LS", 5, "Bir sesli mesajdan ne istendiğini ve ne zaman yapılacağını çıkarabilirim."),
  c("B1", "RD", 1, "Köşe yazısı ya da forum yorumunda yazarın görüşünü anlayabilirim."),
  c("B1", "RD", 2, "Resmî bir mektup ya da e-postadaki isteği ve son tarihi anlayabilirim."),
  c("B1", "RD", 3, "Bir bilgi yazısından (sağlık, sigorta, kira) benim için önemli noktaları seçebilirim."),
  c("B1", "RD", 4, "Kısa bir hikâyeyi ya da kişisel anlatıyı okuyup olay örgüsünü takip edebilirim."),
  c("B1", "RD", 5, "İş ilanındaki şartları ve başvuru adımlarını anlayabilirim."),
  c("B1", "WR", 1, "Görüşümü gerekçeleriyle anlatan 80–120 kelimelik bir metin yazabilirim."),
  c("B1", "WR", 2, "Resmî bir e-posta (başvuru, bilgi isteme, şikâyet) yazabilirim."),
  c("B1", "WR", 3, "Bir olayı ya da deneyimi zaman sırasıyla ve bağlaçlarla anlatabilirim."),
  c("B1", "WR", 4, "Bir foruma yorum yazıp başkasının görüşüne cevap verebilirim."),
  c("B1", "WR", 5, "Gayriresmî ile resmî kayıt arasında (du/Sie, selamlama, kapanış) seçim yapabilirim."),
  c("B1", "GR", 1, "obwohl, damit, während gibi bağlaçlarla yan cümle kurabilirim."),
  c("B1", "GR", 2, "Konjunktiv II ile kibar istek ve varsayım cümleleri kurabilirim (würde, hätte, könnte)."),
  c("B1", "GR", 3, "Passiv Präsens ve Präteritum kurabilirim."),
  c("B1", "GR", 4, "Relativsatz (der/die/das … ist) kurabilirim."),
  c("B1", "GR", 5, "Präteritum'u anlatı fiilleriyle (war, hatte, ging, kam) kullanabilirim."),
  c("B1", "GR", 6, "Genitiv'i temel kullanımlarında (wegen, trotz, des Vaters) doğru yapabilirim."),

  // ── B2 ─────────────────────────────────────────────────────────────
  c("B2", "SPK", 1, "Bir tartışmada görüşümü savunup karşı görüşe cevap verebilirim."),
  c("B2", "SPK", 2, "Soyut bir konuyu (çevre, teknoloji, eğitim) artı ve eksileriyle tartışabilirim."),
  c("B2", "SPK", 3, "İş görüşmesinde deneyimimi ve güçlü yanlarımı ayrıntılı anlatabilirim."),
  c("B2", "SPK", 4, "Bir sorunu betimleyip nedenlerini ve olası çözümlerini sıralayabilirim."),
  c("B2", "SPK", 5, "Beş dakikalık yapılandırılmış bir sunum yapıp sorulara cevap verebilirim."),
  c("B2", "SPK", 6, "Resmî ve gayriresmî kayıt arasında doğal geçiş yapabilirim."),
  c("B2", "LS", 1, "Uzun bir konuşma ya da konferansın ana hatlarını ve argümanlarını takip edebilirim."),
  c("B2", "LS", 2, "Radyo tartışmasında konuşmacıların tutumlarını ayırt edebilirim."),
  c("B2", "LS", 3, "Doğal hızda konuşulan bir diyalogda ima ve ton farklarını yakalayabilirim."),
  c("B2", "LS", 4, "Belgesel ya da podcast bölümünden ayrıntılı bilgi alabilirim."),
  c("B2", "LS", 5, "Bir toplantı tutanağını dinleyip kararları ve sorumluları not edebilirim."),
  c("B2", "RD", 1, "Uzun bir köşe yazısı ya da röportajda yazarın tutumunu ve örtük anlamı anlayabilirim."),
  c("B2", "RD", 2, "Sözleşme, kira ya da iş yazışmalarındaki koşulları anlayabilirim."),
  c("B2", "RD", 3, "Uzmanlık dışı bir makaleyi (bilim, ekonomi) ana fikir ve kanıtlarıyla anlayabilirim."),
  c("B2", "RD", 4, "Bir denemenin yapısını (tez, gerekçe, sonuç) çözümleyebilirim."),
  c("B2", "RD", 5, "Farklı kaynaklardan bilgi toplayıp karşılaştırabilirim."),
  c("B2", "WR", 1, "Bir konuda artı-eksi tartışması yapan 150–200 kelimelik metin yazabilirim."),
  c("B2", "WR", 2, "Resmî şikâyet ya da başvuru mektubu yazıp gerekçelendirebilirim."),
  c("B2", "WR", 3, "Bir metni özetleyip kendi görüşümü ekleyebilirim."),
  c("B2", "WR", 4, "Okur mektubu ya da forum yazısında bir görüşe yapılandırılmış cevap verebilirim."),
  c("B2", "WR", 5, "Bağlaç ve geçiş ifadeleriyle (zwar…aber, einerseits…andererseits) akıcı paragraflar kurabilirim."),
  c("B2", "GR", 1, "Passiv'in bütün zamanlarını ve 'werden/sein + Partizip' ayrımını kullanabilirim."),
  c("B2", "GR", 2, "Konjunktiv I ile dolaylı anlatım yapabilirim."),
  c("B2", "GR", 3, "Partizip I/II ile sıfat öbekleri kurabilirim."),
  c("B2", "GR", 4, "Nominalisierung ve Verbalisierung arasında geçiş yapabilirim."),
  c("B2", "GR", 5, "İki parçalı bağlaçları (nicht nur…sondern auch, je…desto) doğru kullanabilirim."),
  c("B2", "GR", 6, "Plusquamperfekt ve Futur II'yi zaman ilişkisi için kullanabilirim."),

  // ── C1 ─────────────────────────────────────────────────────────────
  c("C1", "SPK", 1, "Karmaşık bir konuyu akıcı ve yapılandırılmış biçimde sunup tartışabilirim."),
  c("C1", "SPK", 2, "İnce anlam ve üslup farklarını (ironi, kibarlık dereceleri) kullanabilirim."),
  c("C1", "SPK", 3, "Bir müzakerede taviz ve şart ifadeleriyle uzlaşma arayabilirim."),
  c("C1", "SPK", 4, "Deyim ve kalıp ifadeleri doğal biçimde konuşmaya katabilirim."),
  c("C1", "SPK", 5, "Uzun bir konuşmada kendimi düzeltip yeniden formüle edebilirim."),
  c("C1", "LS", 1, "Hızlı, lehçeli ya da gürültülü ortamda uzun konuşmaları anlayabilirim."),
  c("C1", "LS", 2, "Panel ve tartışmalarda örtük tutum, ironi ve imaları yakalayabilirim."),
  c("C1", "LS", 3, "Akademik bir konferansın argüman yapısını takip edebilirim."),
  c("C1", "LS", 4, "Film ve dizilerde konuşma dilini ve kültürel göndermeleri anlayabilirim."),
  c("C1", "RD", 1, "Uzun ve karmaşık metinleri (deneme, makale, edebiyat) örtük anlamlarıyla anlayabilirim."),
  c("C1", "RD", 2, "Uzmanlık metinlerinden (hukuk, tıp, teknik) gerekli bilgiyi çıkarabilirim."),
  c("C1", "RD", 3, "Yazarın üslubunu ve retorik araçlarını çözümleyebilirim."),
  c("C1", "RD", 4, "Farklı görüşleri karşılaştırıp eleştirel değerlendirebilirim."),
  c("C1", "WR", 1, "Açık yapılı, uzun bir deneme ya da rapor (300+ kelime) yazabilirim."),
  c("C1", "WR", 2, "Okuyucuya ve amaca göre üslubu (resmî, akademik, gazetecilik) uyarlayabilirim."),
  c("C1", "WR", 3, "Karmaşık bir konuyu özetleyip eleştirel yorum ekleyebilirim."),
  c("C1", "WR", 4, "Bağlaç ve göndergelerle uzun metinde tutarlılık sağlayabilirim."),
  c("C1", "GR", 1, "Karmaşık sözdizimi (iç içe yan cümleler, Partizipialkonstruktionen) kurabilirim."),
  c("C1", "GR", 2, "Modal Partikeln (doch, ja, mal, eben) ve kayıt işaretlerini doğal kullanabilirim."),
  c("C1", "GR", 3, "Konjunktiv II'nin geçmiş ve ince kullanımlarını (hätte…sollen) kurabilirim."),
  c("C1", "GR", 4, "Kalıplaşmış fiil-isim birleşimlerini (Funktionsverbgefüge) kullanabilirim."),

  /* ── İNGİLİZCE KURSUN DİLBİLGİSİ İFADELERİ ──────────────────────────
     Yukarıdaki GR ifadeleri ALMANCA kursun müfredatına göre yazılmış
     (der/die/das, Perfekt, Konjunktiv). İki kurs varken bu görünmez bir
     varsayımdı; İngilizce kurs eklenince görünür oldu: `candoForLesson`
     17 İngilizce dersi "Isimlerin artikelini (der/die/das)" gibi bir
     ifadeye bağlıyordu — İngilizce öğrenen için yanlış, üstelik Türkçe
     okuyan da öyle görüyordu.

     Kimlik bloğu 11'den başlıyor: kimlikler kalıcı ve kurs boyutu
     taşımıyor, o yüzden ayrışma numarayla yapılıyor (bkz. `EN_GR_IDS`).
     Eşleme `cando-map.ts` içindeki `FOCUS_GR_EN` tablosunda.
     Bugün yalnız A1 ve A2 var: İngilizce kursun dersleri o iki seviyede. */
  c("A1", "GR", 11, "am, is ve are biçimlerini olumlu, olumsuz ve soru cümlelerinde kullanabilirim."),
  c("A1", "GR", 12, "a ile an arasında doğru seçim yapabilir, the'yi bilinen bir şeyden söz ederken kullanabilirim."),
  c("A1", "GR", 13, "İsimleri çoğul yapabilirim: -s, -es ve men, women, children gibi düzensiz biçimler."),
  c("A1", "GR", 14, "İyelik anlatabilirim: my, your, his, her ve isme eklenen 's."),
  c("A1", "GR", 15, "Geniş zamanı kurabilirim: üçüncü tekilde -s, do ve does ile soru ve olumsuz."),
  c("A1", "GR", 16, "Zaman ve yer edatlarını doğru seçebilirim: in, on, at."),
  c("A1", "GR", 17, "Emir kipiyle yönerge verebilirim: Turn left, Don't worry."),
  c("A1", "GR", 18, "Soru kurabilirim: önce soru kelimesi, sonra yardımcı fiil, sonra özne."),
  c("A2", "GR", 11, "Geçmiş zamanı kurabilirim: düzenli -ed, düzensiz fiiller, did ile soru ve olumsuz."),
  c("A2", "GR", 12, "Sürmekte olan geçmişi anlatabilirim: was/were + -ing, when ve while ile."),
  c("A2", "GR", 13, "Present perfect kullanabilirim: ever, never, since, for, already, yet ve just."),
  c("A2", "GR", 14, "Karşılaştırma yapabilirim: -er ve -est, more ve most, as … as."),
  c("A2", "GR", 15, "Geleceği anlatabilirim: going to ile plan, will ile o an verilen karar."),
  c("A2", "GR", 16, "can, should, must ve have to ile yetenek, tavsiye ve zorunluluk anlatabilirim."),
  /* B1 bloğu WP-74 ile açıldı: İngilizce kursun B1 dersleri yazılmadan ÖNCE,
     çünkü ders `focusId`'siyle buraya bağlanıyor ve karşılığı olmayan odak
     sessizce düşüyor — ders yazılıp sonra etiket aranırsa 100 dersin hiçbiri
     dilbilgisi ifadesine bağlanmamış olurdu. On ifade, seviyenin on modülüne
     karşılık geliyor (bkz. `docs/plan/en-ders-kapsami.md`). */
  c("B1", "GR", 11, "Present perfect ile past simple arasında seçim yapabilirim: zamanı belli bitmiş olayda past simple, etkisi süren deneyimde present perfect."),
  c("B1", "GR", 12, "İki geçmiş olayı sıralayabilirim: önce olanı past perfect ile (had + fiilin üçüncü hâli) geriye alırım."),
  c("B1", "GR", 13, "Geleceği üç biçimle anlatabilirim: kararlaşmış program için present continuous, niyet için going to, tahmin ve o anki karar için will."),
  c("B1", "GR", 14, "Birinci ve ikinci koşul cümlelerini kurabilirim: if + geniş zaman → will, if + past → would."),
  c("B1", "GR", 15, "İlgi cümlesi kurabilirim: who, which ve that; nesne durumunda ilgi zamirini düşürebilirim."),
  c("B1", "GR", 16, "Başkasının sözünü aktarabilirim: zaman bir basamak geriye gider, zamirler ve zaman zarfları kayar."),
  c("B1", "GR", 17, "Edilgen çatıyı şimdiki ve geçmiş zamanda kurabilirim: is/was + fiilin üçüncü hâli, gerekirse by ile yapan."),
  c("B1", "GR", 18, "must, might ve can't ile çıkarım yapabilirim; have to, don't have to ve should ile zorunluluk ve öğüt anlatabilirim."),
  c("B1", "GR", 19, "Fiilden sonra -ing mi to mu geldiğini seçebilirim: enjoy doing, decide to do ve stop doing ile stop to do farkı."),
  c("B1", "GR", 20, "Uzun cümleyi bağlaçlarla toparlayabilirim: although, however, so that, in order to ve despite."),

  /* İngilizce B2: B1 gibi on ifade, seviyenin on modülüne birer tane. Numara
     11'den başlıyor çünkü 1-6 Almanca kursun B2 dilbilgisi (Konjunktiv I,
     Partizip, Nominalisierung) ve iki kurs aynı numarayı paylaşamaz. */
  c("B2", "GR", 11, "Geçmişe dair çıkarım ve pişmanlık kurabilirim: must have been, can't have done, should have said."),
  c("B2", "GR", 12, "Üçüncü ve karma koşul cümlesi kurabilirim: if + past perfect → would have, gerçekleşmemiş geçmiş ve bugüne uzanan sonucu."),
  c("B2", "GR", 13, "Kaynağı belirsiz bilgiyi edilgen aktarım kalıbıyla verebilirim: it is said that ve he is thought to."),
  c("B2", "GR", 14, "Vurguyu yarık cümleyle öne alabilirim: what I need is ve it was … who."),
  c("B2", "GR", 15, "Olumsuz zarf başa gelince devrik kurabilirim: rarely have I, not only did he."),
  c("B2", "GR", 16, "Ortaç öbeğiyle iki cümleyi birleştirebilirim: having finished ve being asked."),
  c("B2", "GR", 17, "Açıklayıcı ilgi cümlesi ve edatlı ilgi zamiri kullanabilirim: …, which is why ve the person to whom."),
  c("B2", "GR", 18, "Gelecekteki bir ana göre konuşabilirim: future perfect ile bitmiş olanı, future continuous ile o an sürecek olanı."),
  c("B2", "GR", 19, "Fiili isme çevirip resmî kayda geçebilirim: they introduced the rule yerine the introduction of the rule."),
  c("B2", "GR", 20, "İddiayı yumuşatabilir ve metni yönlendirebilirim: arguably, admittedly, to some extent, that said."),

  /* İngilizce C1: yine on ifade, seviyenin on modülüne birer tane. Numara
     11'den başlıyor çünkü 1-4 Almanca kursun C1 dilbilgisi (Partizipial-
     konstruktionen, Modalpartikeln, Konjunktiv II, Funktionsverbgefüge).
     C1'de öğretilen şey yeni bir KURAL değil bir SEÇİM: aynı içeriği kaç
     ayrı biçimde söyleyebildiğin ve hangisini neden seçtiğin. Bu yüzden
     ifadeler "kurabilirim" değil çoğu yerde "seçebilirim" diyor. */
  c("C1", "GR", 11, "Söylenmesi gerekmeyeni düşürebilirim: I would if I could, so do I, the former ve the latter."),
  c("C1", "GR", 12, "Cümlenin ağırlığını sona atıp başa vurguyu taşıyabilirim: Into the hall came ve What he did next was."),
  c("C1", "GR", 13, "Resmî dilekte kalıplaşmış biçimleri seçebilirim: I insist that he be, were it not for ve lest."),
  c("C1", "GR", 14, "İmtiyaz ve karşıtlığın tonunu ayarlayabilirim: granted, albeit, whereas ve much as I."),
  c("C1", "GR", 15, "Yerleşik eşdizimleri ve işlev fiillerini kullanabilirim: take issue with, bear the brunt, draw a distinction."),
  c("C1", "GR", 16, "Aynı içeriği üç ayrı kayıtta söyleyebilirim: hukuk dili, nötr dil ve konuşma dili."),
  c("C1", "GR", 17, "Aktarırken hükmü aktarma fiiline yükleyebilirim: he claimed, he conceded, he alleged."),
  c("C1", "GR", 18, "Kip nüansıyla mesafe ayarlayabilirim: may well, might have been expected to, would tend to."),
  c("C1", "GR", 19, "Eksiltili övgü ve ironiyi kurabilir ve duyabilirim: not exactly cheap, I wouldn't say no."),
  c("C1", "GR", 20, "Metnin bütününü bağlayabilirim: this, such, the latter ve paragraf düzeyinde yön işaretleri."),
];

/**
 * İngilizce kursa ait dilbilgisi ifadeleri.
 *
 * Kurs boyutu `Cando` tipinde YOK ve olmamalı: kimlik kalıcı, ifade metni
 * düzeltilebilir ama kimlik kurs değiştirmez. Ayrım kimlik bloğunda
 * (GR ≥ 11) ve burada adı var — çıkarıcılar (`data/lessons/cando*`) `c(...)`
 * çağrılarını düz metin olarak okuduğu için tipte yeni bir alan onları
 * kırardı.
 */
export const EN_GR_IDS: ReadonlySet<string> = new Set([
  ...["A1", "A2"].flatMap((lvl) => [11, 12, 13, 14, 15, 16, 17, 18].map((n) => `${lvl}.GR.${n}`)),
  // B1, B2 ve C1 onar ifade taşıyor (A1/A2 sekiz): seviyenin on modülü, her modüle bir kural.
  ...["B1", "B2", "C1"].flatMap((lvl) =>
    [11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((n) => `${lvl}.GR.${n}`),
  ),
]);

const byId = new Map(CANDO.map((x) => [x.id, x]));

export function candoById(id: string): Cando | undefined {
  return byId.get(id);
}

export function isCandoId(id: string): boolean {
  return byId.has(id);
}

export function candoFor(level: CefrLevel, skill?: CandoSkill): Cando[] {
  return CANDO.filter((x) => x.level === level && (!skill || x.skill === skill) && !x.retired);
}

export const CANDO_LEVELS: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1"];
