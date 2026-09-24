/**
 * Seslendirilecek metnin hazırlanması — web `src/lib/tts/text.ts` ile AYNI.
 *
 * İki kopya var çünkü mobil paketi web kaynağını içe aktaramıyor; ayrışmamaları
 * `npm run check:tts` (3. bölüm) ile kapıda tutuluyor. Değiştiren, İKİSİNİ
 * birden değiştirir.
 */

/**
 * Tek bir sentez isteğinin metin tavanı.
 *
 * Uç bu sınırın üstünü 400 `bad_text` ile REDDEDİYOR — kırpmıyor. Yani
 * sınırı aşan her metin sessizlik demek, ve bu ölçüldüğünde canlıydı:
 * deneme sınavındaki 171 dinleme diyaloğu (en uzunu 3680 karakter) ve okuma
 * alıştırmalarının 120'sinden 85'i (en uzunu 2245 karakter) hiç
 * seslendirilemiyordu. Üstelik deneme sınavında kullanıcının 1-2 dinleme
 * hakkından biri, hiçbir şey duymadan yanıyordu.
 *
 * Çözüm sınırı büyütmek değil — `splitForSpeech` hiçbir isteğin bu tavanı
 * aşmamasını garanti ediyor.
 */
export const MAX_TEXT = 600;

/**
 * Bir parçanın HEDEF uzunluğu (tavan değil).
 *
 * Tavana kadar doldurmak yanlış olurdu: parça ne kadar uzunsa ilk sesin
 * gelmesi o kadar gecikiyor (sentez süresi metinle artıyor) ve cümlenin
 * ortasında bölünme riski büyüyor. Bu sayı "birkaç tam cümle" büyüklüğünde
 * seçildi; bölme her zaman cümle sınırında yapıldığı için gerçek parçalar
 * bunun biraz altında ya da üstünde olabiliyor.
 */
const SOFT_TARGET = 320;

/**
 * İLK parçanın hedefi ayrı ve daha küçük.
 *
 * Sebep gecikme: kullanıcı "sesli oku"ya bastığında beklediği şey sesin
 * BAŞLAMASI, metnin tamamının hazır olması değil. İlk parça kısa olunca ilk
 * ses belirgin biçimde erken geliyor, kalan parçalar o çalarken iniyor.
 * Sonraki parçalar için aynı şeyi yapmak gereksiz — onların indirilmesi
 * zaten çalma süresinin altında kalıyor.
 */
const FIRST_TARGET = 160;

/**
 * Okunacak metnin sadeleştirilmesi.
 *
 * Parantezli açıklamalar (Hochdeutsch karşılıkları) ve eğik çizgiyle ayrılmış
 * seçenekler ekranda anlamlı ama sesli okunduğunda cümleyi bozuyor. Bu kural
 * tarayıcı sentezinden devralındı; ses kaynağı değişse de gerekçesi aynı.
 */
export function cleanForSpeech(text: string): string {
  const out = (
    text
      /* İSTEĞE BAĞLI ÖN EK BİRLEŞİYOR, ATILMIYOR. "(Back-)Ofen" başlığında
         parantez bir açıklama değil, kelimenin parçası: genel parantez silme
         onu "Ofen" diye okuyordu ve "(herunter-)fahren" "fahren" oluyordu —
         başka bir kelime. Ön ek önce kelimeye yapıştırılıyor ("Backofen", baş
         harf küçülür); "(sich)", "(e)", "(D, CH)" gibi notlar aşağıda düşüyor. */
      .replace(/\((\p{L}+)-\)\s*(\p{L}?)/gu, (_, pre: string, head: string) => pre + head.toLowerCase())
      .replace(/\(.*?\)/g, "")
      /* BOŞLUK DOLDURMA ÇİZGİSİ OKUNMUYOR. Cümledeki boşluk ekranda "_____"
         ile duruyor ve motor onu "alt tire alt tire alt tire" diye okuyordu —
         cümlenin kendisi kaybolacak kadar. Yerine boşluk konuyor: öğrenci
         cümleyi eksik kelimesiyle, akıcı biçimde duyuyor. */
      /* ÜÇ NOKTA ATILIYOR. İçerikte kalıbın devamını gösteriyor ("Ich möchte
         …") ama nöral ses onu uzun bir duraklama olarak okuyor: ekranda
         anlamlı, kulakta delik. Kural WEB İSTEMCİSİNDE, `mergeForSpeech`in
         içindeydi — yani yalnız parça yolundan geçen metne uygulanıyordu:
         mobil hiç uygulamıyor, web'in `speakGerman`i de uygulamıyordu. Aynı
         cümle üç ayrı yazımla üç ayrı önbellek girdisi oluyordu. Buraya
         taşındı, çünkü adres üreten herkesin aynı metni görmesi şart. */
      .replace(/…|\.{3}/g, " ")
      .replace(/_{2,}/g, " ")
      /* ARA TİRE DURAKLAMADIR. " — " iki cümle parçasını ayırıyor ("…nicht aus — mit Taschenmodus…"); iz
         bırakmadan silinince iki parça duraklamasız birleşiyordu (2026-09-24, kulak kontrolü). Boşluklu tire
         virgül oluyor; boşluksuz olan (aralık, "-e/-a") eskisi gibi boşluk. */
      .replace(/\s+[–—]\s+/g, ", ")
      .replace(/[/–—]/g, " ")
      .replace(/\s+/g, " ")
      /* Silinen notun ardından noktalama boşlukta kalıyordu: "o (dişil), onlar" → "o , onlar" (motor
         boşluklu virgülü duraklama sanmıyor, kayıt reddedildi). */
      .replace(/\s+([,;.!?])/g, "$1")
      .replace(/\s*,(\s*,)+/g, ",")
      .trim()
      .replace(/^,\s*|\s*,$/g, "")
  );
  /* HARFSİZ PARÇA OKUNMUYOR. Yürüyüş modunun ipucu cümlesi hedef sözcüğün çevresinde bölünüyor ("…sag" +
     "weiter" + "."); son parça yalnız bir nokta kalıyordu ve seslendirmeye gidiyordu — motor boş bir ses ya da
     "dot" üretiyordu (2026-09-23, kulak kontrolü). Harf ya da rakam yoksa okunacak bir şey yok. */
  return /[\p{L}\p{N}]/u.test(out) ? out : "";
}

/** Cümle sonu sayılan noktalama — bölme öncelikle burada yapılıyor. */
const SENTENCE_END = /(?<=[.!?…])\s+/;
/** Cümle tek başına tavanı aşarsa ikinci tercih: cümle içi duraklar. */
const CLAUSE_END = /(?<=[,;:])\s+/;

/** Parçaları hedefe göre paketler; tek tek hiçbiri `hard`ı aşmaz. */
function pack(pieces: string[], hard: number): string[] {
  const out: string[] = [];
  let buf = "";
  for (const piece of pieces) {
    if (!piece) continue;
    const target = out.length === 0 ? FIRST_TARGET : SOFT_TARGET;
    const candidate = buf ? `${buf} ${piece}` : piece;
    // Hedefi aşmıyorsa büyümeye devam. Hedefi aşıyor ama tampon henüz boşsa
    // yine de alınıyor: tek bir cümle hedeften uzunsa onu bölmenin anlamı yok.
    if (candidate.length <= target || !buf) {
      // Tavanı aşamaz — aşıyorsa tamponu boşaltıp yeniden dene.
      if (candidate.length <= hard) {
        buf = candidate;
        continue;
      }
    }
    if (buf) out.push(buf);
    buf = piece;
  }
  if (buf) out.push(buf);
  return out;
}

/** Hiçbir sınıra uymayan tek bir uzun dizgeyi son çare olarak kelimeden böler. */
function hardSplit(text: string, hard: number): string[] {
  const words = text.split(" ");
  const out: string[] = [];
  let buf = "";
  for (const w of words) {
    const candidate = buf ? `${buf} ${w}` : w;
    if (candidate.length <= hard) {
      buf = candidate;
      continue;
    }
    if (buf) out.push(buf);
    /* Tek bir "kelime" tavandan uzunsa (gerçekte olmuyor ama bir bağlantı
       adresi yapıştırılırsa olur) harften kesiliyor — susmaktan iyi. Kesim
       DENGELİ: düz `i += hard` 601 karakteri [600, 1] diye bölüyordu, yani
       ikinci istek tek bir harfi seslendirmek için ağa çıkıyordu. Önce kaç
       parça gerektiği bulunup uzunluk eşit dağıtılıyor: [301, 300]. */
    if (w.length > hard) {
      const n = Math.ceil(w.length / hard);
      const size = Math.ceil(w.length / n);
      for (let i = 0; i < w.length; i += size) out.push(w.slice(i, i + size));
      buf = "";
    } else {
      buf = w;
    }
  }
  if (buf) out.push(buf);
  return out;
}

/**
 * Metni seslendirilebilir parçalara böler.
 *
 * SIRA ÖNEMLİ ve hep aynı gerekçeyle: bölünme duyuluyor, o yüzden en az
 * duyulacak yerden bölünüyor.
 *   1. Cümle sınırı (`. ! ? …`) — konuşmada zaten duraklama var.
 *   2. Cümle hâlâ uzunsa cümle içi durak (`, ; :`).
 *   3. O da yetmezse kelime arası — yalnızca hiç uymayan tek bir dev
 *      dizgede oluyor.
 *
 * Girdi zaten tavanın altındaysa TEK PARÇA dönüyor: kısa metinler (kelime
 * turu, tek cümle) bugünkü davranışını birebir koruyor, yani var olan
 * önbellek girdilerinin hiçbiri geçersizleşmiyor.
 */
export function splitForSpeech(text: string, hard: number = MAX_TEXT): string[] {
  const clean = cleanForSpeech(text);
  if (!clean) return [];
  if (clean.length <= hard) return [clean];

  const sentences = clean.split(SENTENCE_END);
  const pieces: string[] = [];
  for (const s of sentences) {
    if (s.length <= hard) {
      pieces.push(s);
      continue;
    }
    for (const c of s.split(CLAUSE_END)) {
      if (c.length <= hard) pieces.push(c);
      else pieces.push(...hardSplit(c, hard));
    }
  }
  return pack(pieces, hard);
}

/**
 * CÜMLE DİZME KUTUSUNUN okunacak hâli — sözcüğün kendisi, kenar noktalaması olmadan.
 *
 * Kutu cümledeki biçimi taşıyor ("Berlin,", "„Hallo"): virgüllü tek sözcük "devamı var" ezgisiyle
 * (yükselen) okunuyor ve her noktalama çeşidi ayrı bir ses kaydı demek. Kutunun sesi 2026-09-23'ten beri
 * Defne/Aras'ın ayrı üretilmiş kaydı (kelime katmanı); kayıt da istek de bu biçimden geçiyor. Büyük harf
 * korunuyor: Almancada ad ile fiil ayrımı ("Essen"/"essen") büyük harfte. Web ve mobilde AYNI kopya
 * (`check:tts` 4. bölüm).
 */
export function tileSpeech(token: string): string {
  return token.replace(TILE_EDGE_START, "").replace(TILE_EDGE_END, "");
}
const TILE_EDGE_START = /^[\s"„“”»«‹›([‘’‚'-]+/u;
const TILE_EDGE_END = /[\s"„“”»«‹›)\]‘’‚',;:.!?…-]+$/u;
