import { FLOOR_PCT, MIN_ASKED, classifyItem } from "@/lib/content/analytics";

/**
 * BOZUK MADDE KURALI — "zor" ile "bozuk" ayrılıyor mu.
 *
 * NEDEN TEST: bu kuralın kayması SESSİZ ve iki yöne de pahalı.
 *
 *   Yanlış tarafa kayarsa (zor maddeyi bozuk sayar) müfredatın en öğretici
 *   soruları panelde "şüpheli" diye görünür ve kapatılır. Kimse fark etmez;
 *   sınav kolaylaşır.
 *
 *   Öteki tarafa kayarsa (bozuk maddeyi sağlıklı sayar) yanlış anahtarlı bir
 *   madde yerinde kalır ve her öğrenciye haksız bir yanlış yazar.
 *
 * Bu yüzden kural veritabanı sorgusunun içinde değil, saf bir işlevde
 * (`classifyItem`) ve kapısı burada. Fikstürler kuralın iki ucunu birden
 * yokluyor.
 *
 *   npx tsx --tsconfig scripts/tsconfig.ops.json scripts/test-content-analytics.ts
 */

let fails = 0;
const check = (name: string, ok: boolean, detail = "") => {
  console.log(`  ${ok ? "✓" : "✗"} ${name}${ok || !detail ? "" : ` — ${detail}`}`);
  if (!ok) fails++;
};

/** n kişilik puan dizisi — ortalaması `avg`. */
const scores = (n: number, avg: number) => Array.from({ length: n }, () => avg);

/* ── 1. ZOR AMA SAĞLIKLI ──────────────────────────────────────────────────
   Doğruluk %25: çoğu öğrenci yapamıyor. Ama yapanlar sınavın geri kalanında
   da iyi (ortalama 82) ve yapamayanlar zayıf (48). Madde AYIRIYOR; işini
   görüyor ve kapatılmamalı. */
{
  const v = classifyItem({ asked: 40, correct: 10, rightScores: scores(10, 82), wrongScores: scores(30, 48), reports: 0 });
  check("zor ama ayıran madde şüpheli DEĞİL", !v.suspect, `ayırt ${v.discrimination}, %${v.pct}`);
  check("ayırt etme gücü pozitif", v.discrimination > 0, String(v.discrimination));
}

/* ── 2. YANLIŞ ANAHTAR ────────────────────────────────────────────────────
   Doğruluk %60 — bakan biri "iyi madde" der. Ama maddeyi YANLIŞ yapanların
   genel ortalaması (88) doğru yapanlardan (55) YÜKSEK: sınavın geri kalanında
   iyi olanlar burada yanılıyor. Klasik yanlış anahtar imzası. */
{
  const v = classifyItem({ asked: 50, correct: 30, rightScores: scores(30, 55), wrongScores: scores(20, 88), reports: 0 });
  check("iyi öğrencinin yanıldığı madde ŞÜPHELİ", v.suspect, v.why);
  check("ayırt etme gücü negatif", v.discrimination < 0, String(v.discrimination));
  check("sebep yanlış anahtarı işaret ediyor", v.why.includes("iyi olanlar"), v.why);
}

/* ── 3. MUTLAK DİP ────────────────────────────────────────────────────────
   Doğruluk %4. Ayırt etme gücü pozitif olsa bile bu kadar dibe inen bir madde
   zor değil, cevaplanamaz. */
{
  const v = classifyItem({ asked: 50, correct: 2, rightScores: scores(2, 90), wrongScores: scores(48, 60), reports: 0 });
  check("dipteki madde şüpheli", v.suspect, v.why);
  check("sebep cevaplanamazlığı söylüyor", v.why.includes("cevaplanamaz"), v.why);
  check("eşik değeri kuralla tutuyor", v.pct <= FLOOR_PCT, `%${v.pct} / eşik %${FLOOR_PCT}`);
}

/* ── 4. EŞİK ALTI ÖLÇÜLMÜYOR ──────────────────────────────────────────────
   Beş cevapta ayırt etme gücü de negatif, doğruluk da düşük — ama bu veri
   gürültü. Birkaç kişinin yanıldığı maddeyi kapatmak istatistik değil kura. */
{
  const v = classifyItem({ asked: 5, correct: 1, rightScores: scores(1, 40), wrongScores: scores(4, 90), reports: 0 });
  check("eşik altı veri şüphe üretmiyor", !v.suspect, `${5} cevap, eşik ${MIN_ASKED}`);
  check("eşik altında sebep de yazılmıyor", v.why === "", v.why);
}

/* ── 5. KULLANICI RAPORU KENDİ BAŞINA YETİYOR ─────────────────────────────
   İstatistik sağlıklı ama kullanıcılar maddeyi rapor etmiş. İnsan gözü
   ölçümün görmediğini görebilir (bozuk ses, eksik görsel, çift doğru şık). */
{
  const v = classifyItem({ asked: 60, correct: 45, rightScores: scores(45, 80), wrongScores: scores(15, 50), reports: 3 });
  check("rapor tek başına şüphe üretiyor", v.suspect, v.why);
  check("sebep raporu sayıyor", v.why.includes("3 kullanıcı raporu"), v.why);
}

/* ── 6. HERKES DOĞRU / HERKES YANLIŞ ──────────────────────────────────────
   Bir taraf boşsa ayırt etme gücü TANIMSIZ ve 0 sayılıyor. Herkesin doğru
   yaptığı madde şüpheli olmamalı (kolay, bozuk değil); herkesin yanıldığı
   madde mutlak dip kuralıyla yakalanmalı. */
{
  const hepsi = classifyItem({ asked: 40, correct: 40, rightScores: scores(40, 70), wrongScores: [], reports: 0 });
  check("herkesin doğru yaptığı madde şüpheli değil", !hepsi.suspect, hepsi.why);
  const hicbiri = classifyItem({ asked: 40, correct: 0, rightScores: [], wrongScores: scores(40, 70), reports: 0 });
  check("kimsenin yapamadığı madde şüpheli", hicbiri.suspect, hicbiri.why);
}

console.log(fails === 0 ? "\nİçerik analitiği: kural iki ucu da tutuyor." : `\n${fails} kontrol kırık.`);
process.exit(fails === 0 ? 0 : 1);
