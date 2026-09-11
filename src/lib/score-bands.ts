/**
 * PUAN BANTLARI — 0-100 arası bir sonucun ne anlama geldiği, tek kaynak.
 *
 * Aynı 70 üç yerde ayrı ayrı yazılıydı (`immersion/progress.ts`,
 * `skills/page.tsx`, `immersion/skill/[id]/page.tsx`) ve mobilde HİÇ
 * yazılmamıştı: Android egzersizi bitiren herkesi "bitti" sayıyordu, puanı
 * kaç olursa olsun. Yani %10 alan bir egzersiz Android'de yeşil onaylı ve
 * "3/5 tamamlandı" sayacında, web'de ise hâlâ "sıradaki" görünüyordu —
 * Patika'nın beceri yuvası da öyle.
 *
 * Eşik bir ÜRÜN kararı: bir okuma alıştırmasını açıp yarısını yanlış
 * yapmak onu çalışmış olmak değil. Kararı sunucu veriyor
 * (`immersion/progress.ts` kapıyı bununla açıyor), istemciler yalnız aynı
 * ölçütü göstermek zorunda.
 *
 * İkinci bant (40) da uygulamanın her yerinde aynı: yazma kartının puan
 * tonu, değerlendirme kartının tonu ve egzersiz sonucundaki maskotun ruh
 * hâli hep "70 üstü iyi, 40 üstü orta, altı zayıf" diyor — üç yerde ayrı
 * ayrı elle yazılıydı.
 *
 * Mobil karşılığı `mobile/src/lib/learningRules.ts` (`SKILL_DONE_PCT`,
 * `SCORE_MID_PCT`) — aynı adlar, aynı değerler; "ortak sayisal sabitler"
 * kapısı ayrışmayı ada bakarak yakalıyor.
 */
export const SKILL_DONE_PCT = 70;

/**
 * Rubrikle puanlanan SERBEST görevin geçme notu.
 *
 * Serbest yazma ve monolog "doğru/yanlış" değil rubrikle ölçülüyor ve o tur
 * 60'ta geçilmiş sayılıyor — beceri egzersizinin bütününü "bitti" sayan
 * `SKILL_DONE_PCT`ten (70) ayrı bir karar, çünkü tek görevin geçmesi ile
 * egzersizin tamamının çalışılmış sayılması aynı şey değil.
 *
 * Bu sayı altı yerde elle yazılıydı (web'de iki oynatıcı, mobilde dört yer) ve
 * ikisi ayrışsaydı aynı metin bir platformda geçmiş öbüründe kalmış sayılırdı.
 */
export const RUBRIC_PASS_PCT = 60;

/** Orta bandın tabanı: altı "zayıf", üstü "orta". */
export const SCORE_MID_PCT = 40;

/** Son puan bitmiş sayılıyor mu? Puan yoksa (hiç denenmemiş) hayır. */
export function isSkillDone(lastScore: number | null | undefined): boolean {
  return (lastScore ?? 0) >= SKILL_DONE_PCT;
}

/** Puanın bandı — renk tonu ve maskotun ruh hâli bundan seçiliyor. */
export function scoreBand(pct: number): "good" | "mid" | "weak" {
  if (pct >= SKILL_DONE_PCT) return "good";
  return pct >= SCORE_MID_PCT ? "mid" : "weak";
}

/**
 * Puanı 0–100 aralığına kilitler.
 *
 * Rubrik puanı varsa (serbest yazma, monolog) o geçerli; yoksa doğru/toplam
 * oranı. `lib/skills/record` bu işlevi buradan yeniden dışa veriyor: orada
 * `server-only` var ve istemci oynatıcısı aynı formülü kullanmak zorunda.
 * Mobil karşılığı `learningRules.ts` `scoreOf`.
 */
export function scoreOf(correct: number, total: number, score?: number | null): number {
  if (typeof score === "number" && Number.isFinite(score)) {
    return Math.max(0, Math.min(100, Math.round(score)));
  }
  return total > 0 ? Math.round((100 * Math.min(correct, total)) / total) : 0;
}
