import { readFileSync } from "node:fs";

/**
 * vercel.json'daki cron ifadelerini Hobby planının sınırına karşı doğrular.
 *
 * Neden ayrı bir kontrol: bu kuralın ihlali SESSİZ. Günde birden çok çalışan
 * bir ifade dağıtımı reddettiriyor ama Vercel ortada bir dağıtım KAYDI
 * bırakmıyor — panelde yeni bir satır çıkmıyor, yalnızca GitHub'da kırmızı bir
 * işaret kalıyor. Bir kez yaşandı: altı saatte bir çalışan bir ifade eklendi ve
 * ardından gelen 43 commit'in hiçbiri yayına çıkmadı; sebebi günler sonra
 * anlaşıldı.
 *
 * Kural: bir ifade günde en çok bir kez çalışmalı. Bunun için dakika ve saat
 * alanlarının TEK bir sayı olması yeterli ve gerekli — biri yıldız, bölü,
 * virgül ya da tire içeriyorsa gün içinde birden çok tetiklenir. Ay, gün ve
 * hafta alanları sıklığı yalnızca AZALTIR, o yüzden serbest.
 */
const SINGLE = /^\d+$/;

const cfg = JSON.parse(readFileSync(new URL("../vercel.json", import.meta.url), "utf8"));
const crons = cfg.crons ?? [];
let bad = 0;

for (const { path, schedule } of crons) {
  const [minute, hour] = String(schedule).trim().split(/\s+/);
  const ok = SINGLE.test(minute ?? "") && SINGLE.test(hour ?? "");
  console.log(`  ${ok ? "gecerli" : "HATALI "}  ${schedule.padEnd(14)} ${path}`);
  if (!ok) {
    bad++;
    console.log(
      `           → günde birden çok çalışır; Hobby planı reddediyor.` +
        ` Dakika ve saat tek sayı olmalı (örn. "15 4 * * *").`,
    );
  }
}

console.log(`\n${crons.length} cron, ${bad} hatalı.`);
process.exit(bad ? 1 : 0);
