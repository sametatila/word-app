/**
 * Öğrenme kurallarının ekranda SÖYLENEN sayıları — sunucudaki değerlerin
 * kopyası.
 *
 * Bu sayıların hiçbiri mobilde hesaplanmıyor; kararı sunucu veriyor ve mobil
 * sonucu alıyor. Buradaki kopya yalnız cümleler için: "21+ gün aralık",
 * "son 30 gün", "toplam %70 ve her bölüm %50", "30'a ulaşınca", "60 sn".
 * Sayılar sözlüğün İÇİNDE düz metin durduğu sürece kural değiştiğinde cümle
 * eski sayıyı söylemeye devam ederdi ve iki platform da AYNI yanlışı
 * söyleyeceği için karşılaştırmalı bir kapı bunu göremezdi.
 *
 * Adlar web'deki kaynaklarla birebir aynı; "ortak sayısal sabitler" kapısı
 * ayrışmayı ada bakarak yakalıyor.
 *
 * Kaynaklar: src/lib/srs.ts, src/lib/proficiency.ts, src/lib/exam-types.ts,
 * src/lib/weekly-const.ts, src/lib/lessons/boss-const.ts,
 * src/lib/score-bands.ts.
 */

/** Pekişmiş sayılmak için gereken en az tekrar aralığı (gün). */
export const MASTERED_DAYS = 21;

/** Yeterlilik ölçümünün penceresi (gün) — bu kadar gün sonra kanıt sönüyor. */
export const DECAY_DAYS = 30;

/** Seviye sınavında geçme: toplam yüzde. */
export const PASS_TOTAL = 70;

/** Seviye sınavında geçme: her bölümün en az yüzdesi. */
export const PASS_SECTION = 50;

/** Haftalık sınavın pekişmiş banttan kurulması için gereken kelime sayısı. */
export const MIN_MASTERED = 30;

/** Hız turunun başlangıç süresi (saniye). */
export const BOSS_SECONDS = 60;

/**
 * Beceri egzersizi "bitti" eşiği (yüzde) — web `lib/score-bands.ts`
 * `SKILL_DONE_PCT`.
 *
 * Bu tek sayı mobilde HİÇ yoktu ve eksikliği görünürdü: egzersiz biter bitmez
 * yerel küme onu "bitti" işaretliyordu, `syncItemProgress` de sunucudan gelen
 * her satırı puanına bakmadan kümeye katıyordu. Yani %10 alan bir egzersiz
 * Beceriler listesinde yeşil onaylı, "3/5 tamamlandı" sayacının içinde ve
 * Patika'nın beceri yuvasında bitmiş görünüyordu; web ve sunucu ise aynı
 * egzersizi hâlâ "sıradaki" sayıyordu (`immersion/progress.ts` kapıyı da
 * bununla açıyor). Ölçütün sahibi sunucu; istemci onu göstermek zorunda.
 */
export const SKILL_DONE_PCT = 70;

/**
 * Orta bandın tabanı (yüzde) — web `lib/score-bands.ts` `SCORE_MID_PCT`.
 *
 * "70 üstü iyi, 40 üstü orta, altı zayıf" ayrımı uygulamanın her yerinde
 * aynı ve iki platformda da elle yazılıydı: mobil egzersiz sonucunda maskotun
 * ruh hâli (`ItemScreen`), web'de yazma kartının ve değerlendirme kartının
 * puan tonu.
 */
export const SCORE_MID_PCT = 40;

/** Son puan bitmiş sayılıyor mu? Puan yoksa (hiç denenmemiş) hayır. */
export function isSkillDone(lastScore: number | null | undefined): boolean {
  return (lastScore ?? 0) >= SKILL_DONE_PCT;
}

/**
 * Puanı 0–100 aralığına kilitler — web `lib/skills/record.ts` `scoreOf` ile
 * aynı formül ve aynı ad.
 *
 * Rubrik puanı varsa (serbest yazma, monolog) o geçerli; yoksa doğru/toplam
 * oranı. Mobilde bu hesap iki yerde ayrı ayrı elle yazılıydı ve biri
 * rubrik puanını hiç görmüyordu.
 */
export function scoreOf(correct: number, total: number, score?: number | null): number {
  if (typeof score === "number" && Number.isFinite(score)) {
    return Math.max(0, Math.min(100, Math.round(score)));
  }
  return total > 0 ? Math.round((100 * Math.min(correct, total)) / total) : 0;
}

/** Puanın bandı — maskotun ruh hâli ve renk tonu bundan seçiliyor. */
export function scoreBand(pct: number): "good" | "mid" | "weak" {
  if (pct >= SKILL_DONE_PCT) return "good";
  return pct >= SCORE_MID_PCT ? "mid" : "weak";
}
