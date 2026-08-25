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

export const CANDO_SKILL_LABELS: Record<CandoSkill, string> = {
  RD: "Okuma",
  LS: "Dinleme",
  WR: "Yazma",
  SPK: "Konuşma",
  GR: "Dilbilgisi",
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
];

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
