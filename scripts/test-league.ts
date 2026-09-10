/**
 * Lig kapanış kurallarının birim testi — `npm run test:league`.
 *
 * Veritabanı gerektirmez: sınanan iki şey de saf. Neden ayrı bir test olduğu
 * ise zamanlamada: kapanış YALNIZ pazartesi, yalnız veritabanıyla ve yalnız
 * bir haftalık veri birikmişken çalışıyor. Yani "kim yükseldi, kim düştü"
 * kararı elle denenerek doğrulanamaz — yanlışsa bir hafta sonra, gerçek
 * kullanıcıların tablosunda görülür ve geri alınamaz.
 *
 * Üç sınıf:
 *  1. KUŞAK BOYUTU (`moveCounts`) — kaç kişi yükselir, kaç kişi düşer.
 *  2. KİŞİNİN AKIBETİ (`outcomeFor`) — sıraya ve XP'ye göre karar.
 *  3. İKİSİNİN TUTARLILIĞI — her grup boyu ve her lig için kuşaklar çakışmıyor
 *     ve sayılar kararla birebir tutuyor. Asıl kıymetli olan bu: iki işlev tek
 *     tek doğru olup birlikte yanlış olabilir.
 */
import { moveCounts, outcomeFor } from "../src/lib/social/leagues";
import { LEAGUE_TIERS } from "../src/lib/social/types";

let failures = 0;
let total = 0;
function check(name: string, cond: boolean, detail = "") {
  total++;
  if (cond) console.log(`  ✓ ${name}`);
  else {
    failures++;
    console.log(`  ✗ ${name} ${detail}`);
  }
}

const TOP = LEAGUE_TIERS.length - 1;

console.log("\n1) Kuşak boyutu");
{
  for (const size of [0, 1, 2, 3, 4]) {
    const m = moveCounts(size, 2);
    check(`${size} kişilik grupta hareket yok`, m.promote === 0 && m.demote === 0, JSON.stringify(m));
  }
  const five = moveCounts(5, 2);
  check("5 kişide bir yükselen bir düşen", five.promote === 1 && five.demote === 1, JSON.stringify(five));

  const thirty = moveCounts(30, 2);
  check("30 kişide altı yükselir", thirty.promote === 6, JSON.stringify(thirty));
  check("30 kişide düşen tavana takılır (5)", thirty.demote === 5, JSON.stringify(thirty));

  const huge = moveCounts(100, 2);
  check("büyük grupta yükselen tavanı 7", huge.promote === 7, JSON.stringify(huge));
  check("büyük grupta düşen tavanı 5", huge.demote === 5, JSON.stringify(huge));

  // En alttan düşülmez, en üstten yükselinmez: merdivenin iki ucu.
  const bottom = moveCounts(30, 0);
  check("en alt ligden kimse düşmez", bottom.demote === 0 && bottom.promote === 6, JSON.stringify(bottom));
  const top = moveCounts(30, TOP);
  check("en üst ligden kimse yükselmez", top.promote === 0 && top.demote === 5, JSON.stringify(top));
}

console.log("\n2) Kişinin akıbeti");
{
  const z = { size: 30, tier: 2, promote: 6, demote: 5 };
  check("1. sıra yükselir", outcomeFor({ ...z, xp: 500, rank: 1 }) === "promoted");
  check("6. sıra (sınırda) yükselir", outcomeFor({ ...z, xp: 500, rank: 6 }) === "promoted");
  check("7. sıra kalır", outcomeFor({ ...z, xp: 500, rank: 7 }) === "stayed");
  check("25. sıra (sınırda) kalır", outcomeFor({ ...z, xp: 500, rank: 25 }) === "stayed");
  check("26. sıra düşer", outcomeFor({ ...z, xp: 500, rank: 26 }) === "demoted");
  check("30. sıra düşer", outcomeFor({ ...z, xp: 500, rank: 30 }) === "demoted");

  // XP kuralı SIRAYI EZER: sıfır puanla birinci olmak (herkes sıfırsa mümkün)
  // yükselme sebebi değil. Bu kural olmasa ölü bir grubun tepesindeki kişi
  // hiç çalışmadan lig atlardı.
  check("sıfır XP ilk sırada bile yükseltmez", outcomeFor({ ...z, xp: 0, rank: 1 }) === "demoted");
  check("sıfır XP en alt ligde düşürmez", outcomeFor({ ...z, tier: 0, xp: 0, rank: 1 }) === "stayed");

  check("yükselme kuşağı yokken 1. sıra kalır", outcomeFor({ size: 30, tier: TOP, promote: 0, demote: 5, xp: 9, rank: 1 }) === "stayed");
  check("düşme kuşağı yokken son sıra kalır", outcomeFor({ size: 30, tier: 0, promote: 6, demote: 0, xp: 9, rank: 30 }) === "stayed");
}

console.log("\n3) İkisinin tutarlılığı (her boy × her lig)");
{
  let overlap = 0;
  let mismatch = 0;
  let bottomFell = 0;
  let topRose = 0;
  for (let size = 1; size <= 60; size++) {
    for (let tier = 0; tier <= TOP; tier++) {
      const { promote, demote } = moveCounts(size, tier);
      // Kuşaklar çakışamaz; çakışsaydı biri hem yükselip hem düşerdi.
      if (promote + demote >= size && (promote || demote)) overlap++;
      // Herkes puanlıysa çıkan karar sayıları kuşaklarla birebir olmalı.
      const out = Array.from({ length: size }, (_, i) =>
        outcomeFor({ xp: 100, rank: i + 1, size, tier, promote, demote }),
      );
      if (out.filter((o) => o === "promoted").length !== promote) mismatch++;
      if (out.filter((o) => o === "demoted").length !== demote) mismatch++;
      if (tier === 0 && demote > 0) bottomFell++;
      if (tier === TOP && promote > 0) topRose++;
    }
  }
  check("hiçbir boyda kuşaklar çakışmıyor", overlap === 0, `${overlap} durum`);
  check("karar sayıları kuşaklarla birebir", mismatch === 0, `${mismatch} sapma`);
  check("en alt ligde hiç düşme kuşağı yok", bottomFell === 0, `${bottomFell} durum`);
  check("en üst ligde hiç yükselme kuşağı yok", topRose === 0, `${topRose} durum`);
}

console.log(failures === 0 ? `\ntamam: ${total}/${total}` : `\nKALDI: ${failures}/${total} test`);
process.exit(failures === 0 ? 0 : 1);
