/**
 * UYARI BÜTÇESİ — "sıfır olamayan" kapıları yine de kapı yapan desen.
 *
 * Bir denetleyicinin bulgusu sıfıra inemiyorsa (sözlükçe raporlarında 1.443
 * Almanca, 109 İngilizce bulgu var ve çoğu gerçek içerik kararı bekliyor)
 * iki seçenek kalıyor gibi görünüyor: ya kapıyı hiç kurma, ya da her zaman
 * kırmızı yanan bir kapı kur. İkisi de aynı sonucu veriyor — kimse bakmıyor.
 * Üçüncü yol `check-content.ts`de zaten yazılıydı ve işe yarıyor: BUGÜNKÜ
 * sayıyı dondur, BÜYÜMEYİ reddet.
 *
 * ETİKET BAŞINA, toplam değil. Tek bir toplam sayı, bir yerdeki borcu
 * azaltırken başka yerde borç almaya izin verirdi: A2'nin "seviye üstü"
 * bulgusunu üçe indirip C1'e üç "havuzda yok" eklemek bütçeyi tutardı ama
 * içerik bozulurdu. Etiket başına tavan bunu kapatıyor; yeni bir etiket de
 * açılamıyor (tavanı sıfır sayılır).
 *
 * BİLİNÇLİ KABUL `--baseline` ile. Sayı gerçekten artacaksa (yeni bir seviye,
 * kasıtlı bir içerik kararı) yazar tabanı yeniden yazıp commit'e koyuyor —
 * yani artış bir dosya değişikliği olarak İNCELEMEYE giriyor, sessizce
 * sızmıyor.
 *
 * NOT: `check-content.ts` aynı mantığın kendi kopyasını taşıyor (bu modülden
 * önce yazılmıştı). Üçüncü bir çağıran çıkarsa oradaki de buraya alınmalı;
 * iki kopya bugün aynı davranıyor, bunu bozmayın.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";

export type Butce = { asildi: string[]; yazildi: boolean };

/**
 * `sayim` bugünkü etiket→sayı haritası. `yaz` true ise taban dosyasına
 * yazılır; değilse tabana göre AŞANLAR döner (boşsa kapı yeşil).
 *
 * `zeminMi` verilirse o etiketler TERS yönde ölçülür: sayı DÜŞEMEZ.
 * Bazı ölçüler iyi yönde büyüyor — patika kapsamı (%84) bir borç değil bir
 * kazanç, ve onu tavanla korumak saçma olurdu ("kapsamı artırma" diyen bir
 * kapı). Aynı dosyada iki yön tutmak, ölçüyü ikiye bölüp iki taban dosyası
 * açmaktan iyi: bir seviyenin borcu ile kazancı yan yana okunuyor.
 *
 * Yeni etiketin tavanı sıfır (yani hiç görünmemeli), zemini ise yok sayılır —
 * bugün ölçülmeyen bir kapsamı "düşmüş" saymak yanlış olurdu.
 */
export function butceUygula(
  dosya: string,
  sayim: Map<string, number>,
  yaz: boolean,
  zeminMi?: (etiket: string) => boolean,
): Butce {
  if (yaz) {
    const obj = Object.fromEntries([...sayim].sort(([a], [b]) => a.localeCompare(b)));
    writeFileSync(dosya, JSON.stringify(obj, null, 2) + "\n");
    return { asildi: [], yazildi: true };
  }
  if (!existsSync(dosya)) return { asildi: [], yazildi: false };
  const taban = JSON.parse(readFileSync(dosya, "utf8")) as Record<string, number>;
  const asildi: string[] = [];
  for (const [etiket, n] of sayim) {
    if (zeminMi?.(etiket)) {
      const zemin = taban[etiket];
      if (zemin !== undefined && n < zemin) asildi.push(`${etiket}: ${n} < ${zemin} (DÜŞTÜ)`);
      continue;
    }
    const tavan = taban[etiket] ?? 0;
    if (n > tavan) asildi.push(`${etiket}: ${n} > ${tavan}`);
  }
  return { asildi, yazildi: false };
}

/** Kapının son sözü: aşanları bas, çıkış kodunu döndür. */
export function butceBitir(b: Butce, komut: string): number {
  if (b.yazildi) {
    console.log("\ntaban yazıldı.");
    return 0;
  }
  if (!b.asildi.length) {
    console.log("\nBÜTÇE İÇİNDE.");
    return 0;
  }
  console.log("\n✗ Bütçe aşıldı (yeni içerik borcu). Düzelt ya da bilinçli kabul için:");
  console.log(`    ${komut} -- --baseline`);
  for (const a of b.asildi) console.log(`  · ${a}`);
  return 1;
}
