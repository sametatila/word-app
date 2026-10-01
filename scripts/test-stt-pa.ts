/**
 * Yürüyüş kabul kararı (Azure telaffuz değerlendirmesi) — `npm run test:stt-pa`.
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
import { paAccepted, type PaWord } from "../src/lib/stt";

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

console.log(`\n${total - failures}/${total} geçti`);
if (failures) process.exit(1);

export {};
