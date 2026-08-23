import "server-only";
import { db } from "@/lib/db";
import { events } from "@/lib/db/schema";

/**
 * Ürün olayları.
 *
 * Bugüne kadarki kararlar ölçümle alındı ama ölçülebilen yalnızca ARDINDA iz
 * bırakan şeylerdi: cevaplar, dersler, XP. Görülemeyen sorular tam da en çok
 * merak edilenlerdi — kaç kişi başlangıç kartını görüp hiç başlamadan çıktı,
 * hangi sekmeye hiç dokunulmadı, bildirime tıklayıp gelen kaç kişi tur bitirdi.
 *
 * Liste bilerek SABİT. Serbest olay adı kabul edilseydi tablo altı ayda
 * kimsenin ne anlama geldiğini bilmediği yüzlerce adla dolardı; kapalı liste
 * hem şemayı hem de sorguları okunur tutuyor.
 */
export const EVENT_NAMES = [
  "start_card", // başlangıç kartı görüldü
  "session_start", // tur başlatıldı
  "session_resume", // yarım tura devam edildi
  "stage_done", // beşli etap bitti (value = kaçıncı etap)
  "session_done", // tur tamamlandı (value = doğru sayısı)
  "session_stop", // etap sonunda "şimdilik yeter"
  "daily_play", // günün turu oynandı
  "challenge_play", // hayatta kalma turu oynandı
  "walk_start", // yürürken (ekransız) modu başlatıldı (value = kaçıncı turdan)
  "stt_call", // bir ses klibi yazıya çevrildi (value = klip uzunluğu, saniye)
  "boss_play", // modül sınavına girildi (value = modül sırası)
  "boss_clear", // modül sınavı geçildi (value = kalan saniye)
  "quest_claim", // görev ödülü alındı
  "achievement_unlock", // rozet açıldı (value = rozet sayısı)
  "nav", // sekme açıldı (value = sekme sırası)
  "push_open", // bildirimden gelindi
  "sound_toggle", // ses açıldı/kapandı (value = 1 açık, 0 kapalı)
  "invite_open", // davet bağlantısıyla gelindi
  "share", // sonuç paylaşıldı
] as const;

export type EventName = (typeof EVENT_NAMES)[number];

const VALID = new Set<string>(EVENT_NAMES);

export function isEventName(name: string): name is EventName {
  return VALID.has(name);
}

/**
 * Bir olayı yazar.
 *
 * Hiçbir zaman hata fırlatmıyor: ölçüm, ölçtüğü şeyi bozmamalı. Olay
 * yazılamadığında kaybedilen tek şey bir satırlık istatistiktir; kullanıcının
 * turu bundan etkilenmemeli.
 */
export async function track(
  userId: string,
  name: EventName,
  day: string,
  value = 0,
): Promise<void> {
  try {
    await db.insert(events).values({ userId, name, day, value: Math.round(value) });
  } catch (err) {
    console.error("[events] yazılamadı", name, err);
  }
}
