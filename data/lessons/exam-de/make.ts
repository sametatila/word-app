/**
 * İNGİLİZCE kursun modül sınavı kâğıtlarını ALMANCA için paketler:
 *   `npx tsx --tsconfig scripts/tsconfig.e2e.json data/lessons/exam-de/make.ts`
 *
 * KARDEŞİ `data/lessons/exam/` İLE AYNI İSKELET, TERS YÖN. Orası Almanca
 * kursun Türkçesini İngilizceye bağlıyor (anadili İngilizce olan kullanıcı
 * için); burası İngilizce kursun Türkçesini Almancaya (anadili Almanca olan
 * kullanıcı için). Çıkarıcının GÖVDESİ ortak — `extractExamFor(course)` —
 * çünkü iki kopya ayrı ayrı eskiyor ve biri ötekinin yakaladığını kaçırmaya
 * başlıyor; sözlükçe hattında tam bu olmuştu.
 *
 * NEDEN BU HAT GEREKTİ. İngilizce kâğıtlar yazılana kadar (2026-09-21) modül
 * sınavı yalnız Almanca kursta vardı, yani anadili Almanca olan bir
 * kullanıcının önüne hiç kâğıt gelmiyordu; `localiseExam` bunu yorumunda
 * gerekçesiyle yazıyordu. Elli kâğıtla o gerekçe düştü: kâğıdın Türkçe yarısı
 * (yönerge, durum, soru kökünün altındaki karşılık) Almanca gelmezse
 * kullanıcı İngilizce bir sınavın ortasında Türkçe okuyor.
 *
 * `canDo` ve `writing.phrases` BURADA DA YOK, kardeşiyle aynı sebeple değil
 * ama aynı sonuçla: onların `en` alanı bu kursta `de` ile aynı dizeyi
 * taşıyor (hedef dil İngilizce), yani çevrilecek bir şey yok — Almanca
 * karşılıkları `resolveExamDe` içinde `exam` tablosundan geliyor.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { extractExamFor, type ExamRow } from "../exam/make";

const DIR = new URL(".", import.meta.url).pathname;

/**
 * Bu hattın yönü: İngilizce kursun kâğıtları → Almanca sözlük.
 *
 * `canDo` ve `writing.phrases` BU YÖNDE SÖZLÜĞE GİRİYOR (`withGlosses`):
 * kardeş hatta onların `en` alanı zaten doluydu, burada ise `en` alanı hedef
 * dilin kendisi — Almanca okur için bir karşılık yok. Gerekçe
 * `extractExamFor` içinde yazılı.
 */
export function extractExamDe(): ExamRow[] {
  return extractExamFor("en", true);
}

/* Yol SONUNA KADAR karşılaştırılıyor: kardeş hat bu modülü içe alıyor ve
   yalnız "make.ts" ile biten bir kontrol iki çıkarıcıyı birden çalıştırıp
   ötekinin paketlerini de yeniden yazıyordu. */
if (process.argv[1]?.endsWith("exam-de/make.ts")) {
  const rows = extractExamDe();
  mkdirSync(`${DIR}in`, { recursive: true });
  mkdirSync(`${DIR}out`, { recursive: true });
  const SIZE = 150;
  let n = 0;
  for (let i = 0; i < rows.length; i += SIZE) {
    n++;
    const name = `e-${String(n).padStart(3, "0")}`;
    writeFileSync(
      `${DIR}in/${name}.json`,
      `${JSON.stringify({ packet: name, words: rows.slice(i, i + SIZE) }, null, 1)}\n`,
    );
  }
  const kinds = rows.reduce<Record<string, number>>((a, r) => ((a[r.kind] = (a[r.kind] ?? 0) + 1), a), {});
  console.log(
    `${rows.length} benzersiz dize · ${n} paket\n` +
      Object.entries(kinds)
        .sort((a, b) => b[1] - a[1])
        .map(([k, v]) => `${k} ${v}`)
        .join(" · "),
  );
}
