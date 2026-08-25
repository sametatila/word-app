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
  // Mikrofon gerçekte hangi kısıtlarla açıldı (value = yankı bastırma açık mı).
  // İstemek ile almak aynı şey değil: cihaz kısıtı sessizce yok sayabiliyor ve
  // yankı bastırma açık kalırsa Android ses ÇIKIŞINI konuşma yoluna alıyor,
  // yani turun tamamı bozuk duyuluyor. Ses kalitesi şikâyetinde bakılacak yer.
  "walk_capture",
  /*
    Yürüyüş NASIL bitti (value = sebep).

      1 kullanıcı "hayır" dedi        4 mikrofona ulaşılamadı
      2 tur kalmadı                   5 ekran kapandı, kayıt yolu yok
      3 duyulmama sınırı aşıldı       6 elle duraklatıldı / çıkıldı

    Sebebi olmayan bir bitiş, dışarıdan "takıldı"dan ayırt edilemiyor.
    Kullanıcı cepteki telefondan yalnızca sesi duyuyor ve bir daha hiçbir şey
    olmadığında bunun hangisi olduğunu söyleyemiyor — biz de tahmin ediyorduk.
  */
  "walk_end",
  "boss_play", // modül sınavına girildi (value = modül sırası)
  "boss_clear", // modül sınavı geçildi (value = kalan saniye)
  "quest_claim", // görev ödülü alındı
  "achievement_unlock", // rozet açıldı (value = rozet sayısı)
  "nav", // sekme açıldı (value = sekme sırası)
  "push_open", // bildirimden gelindi
  "sound_toggle", // ses açıldı/kapandı (value = 1 açık, 0 kapalı)
  "invite_open", // davet bağlantısıyla gelindi
  "share", // sonuç paylaşıldı

  /*
    Öğrenme ölçümü (plan WP-00).

    Buraya kadarki olaylar ÜRÜNÜ ölçüyordu: kim nereye tıkladı, tur bitti mi.
    "Daha iyi öğreniyorlar mı" sorusu bunlarla cevaplanamıyordu; XP ve doğruluk
    öğrenme sonucunu değil çabayı ölçer. Aşağıdakiler sonuç olayları. Hepsinde
    `kind` kapalı sözlükten kısa bir etiket, `value` bir sayı; serbest metin
    (öğrencinin yazdığı cümle, konuşma dökümü) hiçbir zaman buraya yazılmaz —
    o içerik kendi tablosunda durur (`assessments`), burada yalnız puanı var.
  */
  "session_round", // bir oyun turu cevaplandı (kind = oyun, value = 1 doğru / 0 yanlış)
  "production_attempt", // üretim görevi puanlandı (kind = translate|transform|free_sentence|writing_free|speaking_drill|roleplay, value = 0–100)
  "exam_start", // sınava girildi (kind = sınav türü:seviye, örn. "level:B1")
  "exam_finish", // sınav bitti (kind = sınav türü:seviye, value = puan 0–100)
  "placement_finish", // yerleştirme testi bitti (kind = bulunan seviye, value = puan 0–100)
  "error_recorded", // yanlış cevabın hata tipi (kind = ErrorType, bkz. lib/errors.ts)
  "feedback_why_opened", // "neden?" açıklaması açıldı (kind = ErrorType)
  "skill_finish", // beceri egzersizi bitti (kind = beceri:seviye, örn. "reading:A2", value = puan 0–100)
  "plan_start", // bugünkü plan kartından bir öğe açıldı (kind = öğe: review|lesson|skill|weak, value = sıra)
  "drill", // dilbilgisi drill cevabı (kind = ErrorType, value = 1 doğru / 0 yanlış) — WP-11
  "srs_weight", // tekrar aralığına hata tipi ağırlığı uygulandı (kind = ErrorType, value = ağırlık×100) — WP-51 ölçümü
] as const;

export type EventName = (typeof EVENT_NAMES)[number];

const VALID = new Set<string>(EVENT_NAMES);

export function isEventName(name: string): name is EventName {
  return VALID.has(name);
}

/**
 * `kind` etiketi: küçük harf, rakam, alt çizgi, iki nokta, tire; en çok 32
 * karakter. Bu bir serbest metin alanı DEĞİL — oyun adı, hata tipi, "level:B1"
 * gibi kapalı sözlük etiketleri için var. Uymayan değer sessizce düşer; olay
 * yine yazılır çünkü etiket bilgi katmanı, olayın kendisi değil.
 */
const KIND_RE = /^[a-z0-9_:-]{1,32}$/i;

export function cleanKind(kind: unknown): string | null {
  if (typeof kind !== "string") return null;
  const k = kind.trim();
  return KIND_RE.test(k) ? k : null;
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
  kind?: string | null,
): Promise<void> {
  try {
    await db
      .insert(events)
      .values({ userId, name, day, value: Math.round(value), kind: cleanKind(kind) });
  } catch (err) {
    console.error("[events] yazılamadı", name, err);
  }
}
