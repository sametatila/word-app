/**
 * Şık etiketi sözleşmesi.
 *
 * Oyun ekranı doğru cevabı `withArtikel` ile kurup seçilen şıkkın METNİYLE
 * karşılaştırıyor. Şık üreticisi başka bir biçim üretirse doğru şık hiçbir
 * zaman seçilemez — kullanıcı doğruyu işaretleyip "yanlış" cevabı alır.
 *
 * Tam da bu olmuştu: `lib/session.ts` artikeli koyuyordu, `lib/daily.ts`
 * koymuyordu; Günlük oyunda tr→de yönündeki HER şık turu çözümsüzdü.
 */
import { readFileSync } from "node:fs";
import { optionLabel, withArtikel } from "../src/lib/option-label";

type Row = { id: number; de: string; tr: string; en: string | null; artikel: string | null; typ: string | null };
const pool: Row[] = JSON.parse(readFileSync("data/app/words.json", "utf8"));

let hata = 0;
const bildir = (m: string) => { hata++; console.log("  HATA " + m); };

// 1) tr→de yönünde şık metni ekranın doğru cevabıyla BİREBİR aynı olmalı
for (const w of pool) {
  const şık = optionLabel(w, "tr-de").text;
  const cevap = withArtikel(w);
  if (şık !== cevap) bildir(`${w.de}: şık ${JSON.stringify(şık)} ≠ cevap ${JSON.stringify(cevap)}`);
}
console.log(`tr→de şık = doğru cevap: ${pool.length} kelime, ${hata} hata`);

// 2) İsimlerde artikel görünmeli (kullanıcının bildirdiği kusur)
const isimler = pool.filter((w) => w.artikel);
const artikelsiz = isimler.filter((w) => !/^(der|die|das)\s/.test(optionLabel(w, "tr-de").text));
if (artikelsiz.length) bildir(`artikelsiz gösterilen isim: ${artikelsiz.length} (ör. ${artikelsiz.slice(0, 3).map((w) => w.de).join(", ")})`);
console.log(`isim şıkkında artikel: ${isimler.length} isim, ${artikelsiz.length} eksik`);

// 3) de→tr yönünde Türkçe + İngilizce ayırt edici
const ornek = pool.find((w) => w.en)!;
const de_tr = optionLabel(ornek, "de-tr");
if (de_tr.text !== ornek.tr || de_tr.sub !== ornek.en) bildir("de→tr etiketi anlam + ayırt edici olmalı");

// 4) Sapma nöbeti: iki tur üreticisi de ortak kaynaktan geçmeli. Biri kendi
//    etiketini yazarsa bu test görmeden yeniden ayrışırlar.
for (const [dosya, fn] of [["src/lib/session.ts", "optionsFor"], ["src/lib/daily.ts", "seededOptions"]] as const) {
  const src = readFileSync(dosya, "utf8");
  const bas = src.indexOf(`function ${fn}(`);
  if (bas < 0) { bildir(`${dosya}: ${fn} bulunamadı (yeniden adlandırıldıysa bu testi de güncelle)`); continue; }
  const govde = src.slice(bas, src.indexOf("\n}", bas));
  if (!govde.includes("optionLabel")) bildir(`${dosya}: ${fn} artık optionLabel kullanmıyor — etiket kuralı yeniden ayrıştı`);
}

console.log(hata ? `\nBAŞARISIZ — ${hata} hata` : "\nTAMAM — şık etiketi sözleşmesi korunuyor");
process.exit(hata ? 1 : 0);
