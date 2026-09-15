/**
 * UYARI TABANI — içerik denetleyicilerinin "uyarı"ları için mandal.
 *
 * NEDEN. Hata değil uyarı basan denetleyiciler her koşuda aynı yüzlerce satırı
 * basıyordu: İngilizce A1'in havuz yüzünden kapatılamayan kelime yinelemeleri,
 * tek tek incelenip doğru bulunmuş çeviriler. Yeni bir uyarı o kalabalığın
 * içinde görünmüyordu ve CI logu her koşuda "uyarı" doluydu.
 *
 * NASIL. Bilinen her uyarının kararlı bir ANAHTARI tabanda, gerekçesiyle
 * duruyor. Koşuda:
 *   - tabanda olmayan uyarı satır satır basılır ve denetim DÜŞER (sessizce
 *     birikemez);
 *   - tabanda olup artık çıkmayan uyarı "borç azaldı" demektir; taban
 *     güncellenmeden denetim yine DÜŞER. check:title'daki mandalla aynı: kapanan
 *     borç sessizce geri açılamasın;
 *   - geri kalanı tek satırlık özet.
 *
 * Anahtar içeriğe bağlı yazılmalı. Örneğin çeviri kabulünde cümlenin kendisi
 * anahtarda: çeviri değişirse kabul düşer ve madde yeniden incelenir.
 *
 *   <komut> -- --taban      tabanı bugünkü uyarılarla yeniden yazar (gerekçeler korunur)
 *   <komut> -- --uyarilar   tabandakiler dahil bütün uyarıları gerekçeleriyle basar
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";

/** Komut satırı bayrakları; konumsal argümanlarla karışmasın diye ayrı okunuyor. */
export const TABAN_BAYRAKLARI = new Set(["--taban", "--uyarilar"]);

/** Bayraklar dışındaki argümanlar (ör. paket adı). */
export function konumsalArgumanlar(argv = process.argv.slice(2)) {
  return argv.filter((a) => !TABAN_BAYRAKLARI.has(a));
}

/**
 * @param {{
 *   ad: string,
 *   dosya: string,
 *   komut: string,
 *   uyarilar: { anahtar: string, metin: string }[],
 *   gerekceZorunlu?: boolean,
 * }} o
 * @returns {{ dustu: boolean, ozet: string }}
 */
export function uyariTabani({ ad, dosya, komut, uyarilar, gerekceZorunlu = false }) {
  const argv = process.argv.slice(2);
  const taban = existsSync(dosya) ? JSON.parse(readFileSync(dosya, "utf8")) : { aciklama: "", uyarilar: {} };
  const kayitli = taban.uyarilar ?? {};
  const simdi = new Map();
  for (const u of uyarilar) {
    if (simdi.has(u.anahtar)) throw new Error(`${ad}: aynı anahtarla iki uyarı: ${u.anahtar}`);
    simdi.set(u.anahtar, u.metin);
  }

  if (argv.includes("--taban")) {
    const yeni = {};
    for (const k of [...simdi.keys()].sort()) yeni[k] = kayitli[k] ?? "";
    writeFileSync(dosya, `${JSON.stringify({ ...taban, uyarilar: yeni }, null, 2)}\n`);
    const bos = Object.entries(yeni).filter(([, g]) => !g).map(([k]) => k);
    console.log(`\n${ad}: taban yazıldı, ${simdi.size} kayıt → ${dosya}`);
    if (gerekceZorunlu && bos.length) {
      console.log(`GEREKÇESİ BOŞ ${bos.length} kayıt var; incelenip dosyaya yazılmalı:`);
      for (const k of bos) console.log(`  ${k}`);
      return { dustu: true, ozet: "taban yazıldı, gerekçe eksik" };
    }
    return { dustu: false, ozet: "taban yazıldı" };
  }

  const yeni = [...simdi.keys()].filter((k) => !(k in kayitli));
  const kalkan = Object.keys(kayitli).filter((k) => !simdi.has(k));
  const gerekcesiz = gerekceZorunlu ? Object.entries(kayitli).filter(([k, g]) => simdi.has(k) && !g).map(([k]) => k) : [];

  if (argv.includes("--uyarilar")) {
    console.log(`\n${ad}: bütün uyarılar (${simdi.size})`);
    for (const [k, metin] of simdi) console.log(`${metin}${kayitli[k] ? `\n      gerekçe: ${kayitli[k]}` : ""}`);
  }
  if (yeni.length) {
    console.log(`\n${ad}: TABANDA OLMAYAN YENİ UYARI (${yeni.length}):`);
    for (const k of yeni) console.log(simdi.get(k));
    console.log(`Gerçek bir hataysa içeriği düzelt. Bilerek kalıyorsa gerekçesiyle tabana yaz: ${komut} -- --taban`);
  }
  if (kalkan.length) {
    console.log(`\n${ad}: borç AZALDI, tabanı güncelle (${komut} -- --taban):`);
    for (const k of kalkan) console.log(`  ${k}`);
  }
  if (gerekcesiz.length) {
    console.log(`\n${ad}: tabanda GEREKÇESİZ kayıt (${gerekcesiz.length}), ${dosya} içinde yazılmalı:`);
    for (const k of gerekcesiz) console.log(`  ${k}`);
  }
  const dustu = yeni.length > 0 || kalkan.length > 0 || gerekcesiz.length > 0;
  const tabanda = simdi.size - yeni.length;
  const ozet = dustu
    ? `${yeni.length} yeni uyarı · ${kalkan.length} kapanmış kayıt · ${gerekcesiz.length} gerekçesiz kayıt`
    : `yeni uyarı yok · ${tabanda} kayıtlı borç tabanda`;
  return { dustu, ozet };
}
