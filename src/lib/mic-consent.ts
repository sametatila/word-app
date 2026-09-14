"use client";

import { decideAiConsent } from "@/lib/ai-consent-client";

/**
 * Yürüyüş modu mikrofon onayı — mobil `M/src/lib/micConsent.ts`in karşılığı.
 *
 * Mobilde bu ekran Play'in "belirgin açıklama ve rıza" kuralı yüzünden var:
 * ses ekran kapalıyken de kaydedilip sunucuya ve konuşma tanıma
 * sağlayıcılarına gittiği için sistem izin diyaloğundan AYRI, uygulama içi
 * bir açıklama ve olumlu onay gerekiyor. Web'de böyle bir mağaza kuralı yok
 * ama TOPLANAN VERİ AYNI: web de sesi `/api/stt`e gönderiyor. Kullanıcıya
 * telefonda söylenen şeyin tarayıcıda söylenmemesi için sebep yok.
 *
 * Onay cihazda tutuluyor (hesaba yazılmıyor, mobilde de öyle) ve Ayarlar'dan
 * geri alınabiliyor — geri alınca ekran yeniden geliyor. Anahtardaki sürüm,
 * açıklama metni anlamlı değişirse artırılır ve onay yeniden sorulur.
 */
/*
  v2 (2026-09-14): açıklama artık sesin gidebileceği sağlayıcıları ADIYLA
  sayıyor ve onay sunucuya da "ai_voice" rızası olarak yazılıyor (uç izin
  yoksa sesi sağlayıcıya iletmiyor). v1 onayları "Microsoft Azure ve benzeri"
  diyen metne verilmişti; App Store 5.1.2(i) alıcıların adıyla söylenmesini
  istediği için o onaylar yeniden soruluyor. Mobil `micConsent` aynı sürüme
  birlikte geçti.
*/
const KEY = "lernomi:mic-consent:v2";

export function hasMicConsent(): boolean {
  try {
    return localStorage.getItem(KEY) !== null;
  } catch {
    // Depolama kapalıysa onay saklanamaz. "Verilmemiş" saymak doğrusu:
    // ekran her seferinde gelir, hiç sorulmadan mikrofon açılmaz.
    return false;
  }
}

/**
 * Onayı GERİ ALIR: tarayıcıdaki bayrak ve sunucudaki ses rızası birlikte.
 * Ağ yoksa sunucu tarafı yazılamaz; yürüyüş modu yine başlamaz (bayrak kapalı)
 * ve açıklama yeniden sorar.
 */
export async function revokeMicConsent(): Promise<void> {
  setMicConsent(false);
  try {
    await decideAiConsent("ai_voice", false);
  } catch {
    /* yut */
  }
}

export function setMicConsent(on: boolean): void {
  try {
    if (on) localStorage.setItem(KEY, new Date().toISOString());
    else localStorage.removeItem(KEY);
  } catch {
    /* yut */
  }
}
