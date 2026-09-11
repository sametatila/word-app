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
 * src/lib/weekly-const.ts, src/lib/lessons/boss-const.ts.
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
