/**
 * Cihaz deposunun temizliği: artık hiçbir kodun okumadığı anahtarlar ve
 * süresi geçmiş yarım konuşma kayıtları.
 *
 * Mobil karşılığı `mobile/src/lib/storageMigration` `sweepDeviceStorage`.
 */
/** Yarım konuşmanın saklandığı anahtarın öneki: `<önek>:<konuşmaId>`. */
export const CONVERSATION_RESUME_KEY = "lernomi-conversation-progress";
/** Yarım konuşma bu kadar gün sonra devam ettirilmiyor ve siliniyor. */
export const CONVERSATION_RESUME_DAYS = 3;
/** Gönderilmeyi bekleyen Konuşma adımı sonuçları (`lib/conversation-queue`). */
export const CONVERSATIONS_PENDING_KEY = "lernomi-conversations-pending";

/*
  SAHİPSİZ ANAHTARLAR. Kodu silinmiş ama cihazlarda duran değerler: okuyan
  yok, hiçbir zaman silinmeyecekler. Marka göçü (`app/layout` satır içi
  betiği) eski `wortspiel*`/`nomi*` adlarını bunlara çeviriyor; o yüzden
  liste yalnız `lernomi` adlarını sayıyor ve temizlik göçten SONRA çalışıyor.

  Hangisinin neden gittiği git geçmişinde:
    challenge-best/record  meydan okuma rekoru (2026-08-05, sunucuda)
    chat-autoplay/handsfree serbest sohbet (2026-08-05, kaldırıldı)
    game-mode              tek oyun modu seçimi (2026-09-09, kaldırıldı)
    :session               yarım tur (2026-08-05, sunucuya taşındı)
    skills-level/skill/tab beceri merkezi süzgeçleri (2026-08-28, sayfa kalktı)
    mic-consent:v1         onay metni değişti, v2 yeniden soruyor (2026-09-14)
    lessons-pending,       Konuşma adımının eski adlı anahtarları (2026-09-25,
    lesson-progress:*      yeni adlara geçti; eski kayıt taşınmıyor, siliniyor)

  Yeni bir anahtar kaldırıldığında buraya eklenmeli: silinen kodun değeri
  kendiliğinden gitmiyor.
*/
const DEAD_KEYS = [
  "lernomi:challenge-best",
  "lernomi:challenge-record",
  "lernomi-chat-autoplay",
  "lernomi-chat-handsfree",
  "lernomi-game-mode",
  "lernomi:session",
  "lernomi-skills-level",
  "lernomi-skills-skill",
  "lernomi-skills-tab",
  "lernomi:mic-consent:v1",
  "lernomi-lessons-pending",
];
/** Önekle silinen sahipsiz anahtarlar (yukarıdaki listeyle aynı kural). */
const DEAD_PREFIXES = ["lernomi-lesson-progress:"];

/**
 * Temizliği yapar. Uygulama açılışında bir kez çağrılıyor; olmayan anahtarı
 * silmek iş sayılmadığı için her açılışta çalışması zararsız.
 *
 * SÜRESİ GEÇMİŞ YARIM KONUŞMA. Konuşma oynatıcısı üç günden eski kaydı yok sayıyor
 * ama silmiyordu: kullanıcının dönmediği her konuşma cihazda süresiz kalıyordu.
 * Kayıt sohbet turlarını, yani kullanıcının yazdığı konuşmanın metnini de
 * taşıyor; sunucu aynı konuşmayı 30 günde siliyor (gizlilik politikası §9),
 * cihazdaki kopyası hiç silinmiyordu.
 */
export function sweepDeviceStorage(): void {
  let store: Storage;
  try {
    store = window.localStorage;
  } catch {
    return;
  }
  try {
    for (const key of DEAD_KEYS) store.removeItem(key);
    const cutoff = Date.now() - CONVERSATION_RESUME_DAYS * 86400000;
    const stale: string[] = [];
    for (let i = 0; i < store.length; i++) {
      const key = store.key(i);
      if (key && DEAD_PREFIXES.some((p) => key.startsWith(p))) {
        stale.push(key);
        continue;
      }
      if (!key || !key.startsWith(`${CONVERSATION_RESUME_KEY}:`)) continue;
      let at = 0;
      try {
        at = Number((JSON.parse(store.getItem(key) ?? "null") as { at?: unknown } | null)?.at) || 0;
      } catch {
        /* bozuk kayıt: okunamıyor, silinir */
      }
      if (at < cutoff) stale.push(key);
    }
    for (const key of stale) store.removeItem(key);
  } catch {
    /* depolama kapalı */
  }
}
