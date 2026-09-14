/**
 * Günlük XP tavanı testi — güvenlik denetimi #2 (/api/answers XP uydurma)
 * düzeltmesinin regresyon koruması. Saf fonksiyon; DB gerekmez.
 *
 * Çalıştır: npx tsx --tsconfig scripts/tsconfig.e2e.json scripts/test-answers-xp-cap.ts
 * (package.json'a script eklenmedi; öneri: "test:xp-cap")
 */
import { cappedDailyXp, ANSWERS_DAILY_XP_CAP as CAP } from "@/lib/xp";

let fail = 0;
const check = (label: string, cond: boolean): void => {
  console.log(`${cond ? "ok  " : "FAIL"} ${label}`);
  if (!cond) fail++;
};

// Tavanın altında: tam kredi
check("tavanın çok altında tam kredi", cappedDailyXp(0, 1200) === 1200);
check("bugün 1000 +500 → 500", cappedDailyXp(1000, 500) === 500);

// Tavana yakın: kalan bütçeye kırpılır
check("tavana 100 kala +500 → 100", cappedDailyXp(CAP - 100, 500) === 100);
check("tavan dolu → 0", cappedDailyXp(CAP, 1200) === 0);
check("tavan aşılmış (yarış) → 0, negatif yok", cappedDailyXp(CAP + 5000, 1200) === 0);

// Uç/güvenlik
check("negatif used güvenli", cappedDailyXp(-100, 300) === 300);
check("xpGained 0 → 0", cappedDailyXp(500, 0) === 0);

// Asıl senaryo: uydurma döngüsü tavanda durur (200 batch × 1200 XP)
{
  let used = 0, credited = 0;
  for (let i = 0; i < 200; i++) { const c = cappedDailyXp(used, 1200); credited += c; used += c; }
  check(`200 batch uydurma → toplam ${credited} = tavan ${CAP}`, credited === CAP);
}

// Gerçek kullanıcıyı kırpmadığının kanıtı: çok yoğun bir gün (~40k) tam geçer
check("gerçekçi yoğun gün (40k) kırpılmaz", cappedDailyXp(39_000, 1000) === 1000);

console.log(fail ? `\n${fail} BAŞARISIZ` : "\nTüm XP-tavanı testleri geçti.");
process.exit(fail ? 1 : 0);
