/**
 * Yürüyüş kabul kararı (Azure telaffuz değerlendirmesi) ve klip biçimi — `npm run test:stt-pa`.
 *
 * Veritabanı ve ağ gerektirmez. Kelime listeleri Azure'un GERÇEK cevaplarından
 * (2026-10-02; Azure'un kendi sesiyle üretilen 3 sn'lik 16 kHz klipler, 0,8 sn
 * baş sessizlik, bir kısmına yapay gürültü):
 *
 *   söylenen → beklenen       düz tanıma        telaffuz değerlendirmesi
 *   die Luft → die Luft        "die luft"        die None 100, Luft None 85      → kabul
 *   die Luft (gürültü) → aynı  "kino" (uydurma)  die None 94, Luft None 63       → kabul
 *   Luft → die Luft            "luft"            die Omission, Luft None 76      → kabul (artikelsiz)
 *   weiter → sonst             "weiter"          sonst Omission                  → ret
 *   Lust → die Luft            "lust"            die Omission, Luft Mispron. 25  → ret
 *   mich → mir                 "mich"            mir Mispronunciation 0          → ret
 *   das Fenster → die Luft     "das fenster"     die Mispron., Luft Omission     → ret
 *
 * NEDEN: düz tanıma kısa, gürültülü kayıtta ilgisiz kelime uyduruyordu (canlıda
 * "sonst"/"die Führung" → "weiter", yani yanlışlıkla "atla"). Bu kural bozulursa
 * ya doğru cevap reddedilir ya da yanlış cevap kabul edilir; ikisi de yalnız
 * kullanıcının kulağında görünür.
 */
import { paAccepted, wavInfo, type PaWord } from "../src/lib/stt";

let failures = 0;
let total = 0;
function check(name: string, cond: boolean) {
  total++;
  if (cond) console.log(`  ✓ ${name}`);
  else {
    failures++;
    console.log(`  ✗ ${name}`);
  }
}
const w = (Word: string, ErrorType: string, AccuracyScore = 0): PaWord => ({ Word, ErrorType, AccuracyScore });

console.log("\nYürüyüş kabul kararı");
check("doğru kelime kabul", paAccepted([w("die", "None", 100), w("Luft", "None", 85)], "de"));
check("gürültüde doğru kelime kabul", paAccepted([w("die", "None", 94), w("Luft", "None", 63)], "de"));
check("artikelsiz söyleyiş kabul", paAccepted([w("die", "Omission"), w("Luft", "None", 76)], "de"));
check("tek kelime (mir) kabul", paAccepted([w("mir", "None", 100)], "de"));
check("fazladan söz (äh) kararı bozmaz", paAccepted([w("äh", "Insertion"), w("die", "None", 90), w("Luft", "None", 80)], "de"));
check("başka kelime (weiter→sonst) ret", !paAccepted([w("sonst", "Omission")], "de"));
check("benzer kelime (Lust→Luft) ret", !paAccepted([w("die", "Omission"), w("Luft", "Mispronunciation", 25)], "de"));
check("mich→mir ret", !paAccepted([w("mir", "Mispronunciation", 0)], "de"));
check("das Fenster→die Luft ret", !paAccepted([w("die", "Mispronunciation"), w("Luft", "Omission")], "de"));
check("yalnız artikel doğru, isim yok → ret", !paAccepted([w("die", "None", 100), w("Luft", "Omission")], "de"));
check("boş liste ret", !paAccepted([], "de") && !paAccepted(undefined, "de"));
check("İngilizce: 'the' artikel sayılır", paAccepted([w("the", "Omission"), w("window", "None", 90)], "en"));
check("İngilizce: 'to' (mastar) sayılır", paAccepted([w("to", "Omission"), w("go", "None", 88)], "en"));
check("çok kelimeli ifadede bir kelime eksikse ret", !paAccepted([w("sich", "None", 90), w("freuen", "Omission")], "de"));

/*
  KLİP BİÇİMİ VE SÜRESİ (`wavInfo`, güvenlik denetimi 2026-10-03 Y3). `/api/stt`
  yalnız 16 kHz mono 16 bit PCM WAV kabul ediyor ve süreyi başlıktan hesaplıyor.
  Android 44 baytlık düz başlık yazıyor; iOS `AVAudioRecorder` `fmt` ile `data`
  arasına dolgu parçası (`FLLR`) koyuyor — ikisi de kabul edilmeli.
*/
function wav(opts: { seconds: number; rate?: number; channels?: number; bits?: number; format?: number; filler?: number; declared?: number }): ArrayBuffer {
  const rate = opts.rate ?? 16000, ch = opts.channels ?? 1, bits = opts.bits ?? 16, format = opts.format ?? 1;
  const byteRate = (rate * ch * bits) / 8;
  const data = Math.round(opts.seconds * byteRate);
  const filler = opts.filler ?? 0;
  const fillerChunk = filler ? 8 + filler + (filler % 2) : 0;
  const buf = new ArrayBuffer(12 + 24 + fillerChunk + 8 + data);
  const v = new DataView(buf);
  const ascii = (at: number, t: string) => { for (let i = 0; i < 4; i++) v.setUint8(at + i, t.charCodeAt(i)); };
  ascii(0, "RIFF"); v.setUint32(4, buf.byteLength - 8, true); ascii(8, "WAVE");
  ascii(12, "fmt "); v.setUint32(16, 16, true); v.setUint16(20, format, true); v.setUint16(22, ch, true);
  v.setUint32(24, rate, true); v.setUint32(28, byteRate, true); v.setUint16(32, (ch * bits) / 8, true); v.setUint16(34, bits, true);
  let at = 36;
  if (filler) { ascii(at, "FLLR"); v.setUint32(at + 4, filler, true); at += fillerChunk; }
  ascii(at, "data"); v.setUint32(at + 4, opts.declared ?? data, true);
  return buf;
}
const secs = (b: ArrayBuffer) => wavInfo(b)?.seconds ?? null;

console.log("\nKlip biçimi ve süresi");
check("Android: düz 44 bayt başlık, 3 sn", secs(wav({ seconds: 3 })) === 3);
check("iOS AVAudioRecorder: FLLR dolgusu, 4 sn", secs(wav({ seconds: 4, filler: 4044 })) === 4);
check("tek sayılı parça çift bayta hizalanır", secs(wav({ seconds: 1, filler: 3 })) === 1);
check("başlık abartırsa dosyadaki gerçek veri sayılır", secs(wav({ seconds: 2, declared: 0xffffff00 })) === 2);
check("48 kHz ret", wavInfo(wav({ seconds: 1, rate: 48000 })) === null);
check("stereo ret", wavInfo(wav({ seconds: 1, channels: 2 })) === null);
check("8 bit ret", wavInfo(wav({ seconds: 1, bits: 8 })) === null);
check("PCM olmayan biçim (float) ret", wavInfo(wav({ seconds: 1, format: 3 })) === null);
check("WAV olmayan gövde (webm) ret", wavInfo(new Uint8Array([0x1a, 0x45, 0xdf, 0xa3, ...new Array(60).fill(0)]).buffer) === null);
check("boş gövde ret", wavInfo(new ArrayBuffer(0)) === null);

console.log(`\n${total - failures}/${total} geçti`);
if (failures) process.exit(1);

export {};
