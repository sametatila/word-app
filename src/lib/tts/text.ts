/**
 * Seslendirilecek metnin hazırlanması: temizleme ve BÖLME.
 *
 * TEK KOPYA OLMASI ŞART. Bu kuralların üç ayrı kopyası vardı — sunucuda
 * (`tts/edge`), web istemcisinde (`components/speak-button`) ve mobilde
 * (`M/src/lib/tts`) — ve ayrışmaları sessizdi: metin URL'ye giriyor, URL de
 * önbellek anahtarının kendisi. Aynı cümlenin iki farklı yazımı iki ayrı
 * sentez, iki ayrı önbellek girdisi demek. Mobil kopyada temizleme bir
 * girişte hiç uygulanmıyordu ve cihaz sesine düşüldüğünde "_____" yeniden
 * "alt tire alt tire alt tire" diye okunuyordu.
 *
 * `server-only` DEĞİL, bilerek: sunucu da istemci de aynı işlevi çağırmalı.
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
  return (
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
      .replace(/_{2,}/g, " ")
      .replace(/[/–—]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
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
    // Tek bir "kelime" tavandan uzunsa (gerçekte olmuyor ama bir bağlantı
    // adresi yapıştırılırsa olur) harften kesiliyor — susmaktan iyi.
    if (w.length > hard) {
      for (let i = 0; i < w.length; i += hard) out.push(w.slice(i, i + hard));
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
