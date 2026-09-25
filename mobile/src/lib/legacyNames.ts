import AsyncStorage from "@react-native-async-storage/async-storage";
import { dropPackIndex } from "../content/store";

/**
 * ESKİ ADLARIN CİHAZDAKİ TAŞIMASI — tek yer (web karşılığı `src/lib/legacy-names`).
 *
 * 2026-09-25'te "ders" ve "rol yapma" adları ürünün dilinden kalktı: Patika'nın
 * Konuşma adımı kodda `conversation`, adımın yapay zekâ sohbeti `chat`.
 * Build 6 ve öncesinin yazdığı yerel kayıtlar yeni anahtarlara BİR KEZ
 * taşınıyor ki kullanıcı yarım bıraktığı adımı ve gönderilmeyi bekleyen
 * sonucunu kaybetmesin:
 *
 *   lernomi-lessons-pending        → lernomi-conversations-pending
 *                                    (alanlar lessonId/roleplayDone → conversationId/chatDone)
 *   lernomi-lesson-resume:<id>     → lernomi-conversation-resume:<id>
 *                                    (faz `roleplay` → `chat`)
 *   content:pack:lessons/<kurs-sv> → silinir (içerik artık `conversations/`
 *                                    paketinde; eski paketin gövdeleri de gider)
 *   Patika öğe kimlikleri          <ünite>-checkpoint1 → <ünite>-unitQuiz1
 *                                    (Kontrol → Ünite quizi; bitenler, bekleyenler, puanlar)
 *
 * Taşıma idempotent ve sessiz; bir kez çalışması yeterli ama her açılışta
 * çalışması zararsız. BUILD 7 HERKESE ULAŞINCA BU DOSYA SİLİNECEK.
 */
const OLD_PENDING = "lernomi-lessons-pending";
const NEW_PENDING = "lernomi-conversations-pending";
const OLD_RESUME = "lernomi-lesson-resume:";
const NEW_RESUME = "lernomi-conversation-resume:";
const OLD_PACK_KEY = "content:pack:lessons/";

/** Öğe kimliği taşıyan kayıtlar; kimlik JSON içinde dize olarak duruyor. */
const ITEM_KEYS = ["lernomi-items-done", "lernomi-path-items-pending", "lernomi-item-scores"];
const OLD_ITEM_ID = /-checkpoint(\d+)"/g;

type Row = Record<string, unknown>;

/** Taşımanın kendisi (testler doğrudan çağırıyor); uygulama `ensureLegacyMigrated`i kullanır. */
export async function migrateLegacyStorage(): Promise<void> {
  try {
    const all = await AsyncStorage.getAllKeys();

    if (all.includes(OLD_PENDING)) {
      const old = JSON.parse((await AsyncStorage.getItem(OLD_PENDING)) ?? "[]") as Row[];
      const now = JSON.parse((await AsyncStorage.getItem(NEW_PENDING)) ?? "[]") as Row[];
      const moved = old.map((r) => {
        const { lessonId, roleplayDone, ...rest } = r;
        return { ...rest, conversationId: rest.conversationId ?? lessonId, chatDone: rest.chatDone ?? roleplayDone };
      });
      await AsyncStorage.setItem(NEW_PENDING, JSON.stringify([...moved, ...now].slice(-20)));
      await AsyncStorage.removeItem(OLD_PENDING);
    }

    const resumes = all.filter((k) => k.startsWith(OLD_RESUME));
    if (resumes.length) {
      const values = await AsyncStorage.getMany(resumes);
      const writes: Record<string, string> = {};
      for (const k of resumes) {
        const raw = values[k];
        if (!raw) continue;
        try {
          const v = JSON.parse(raw) as { phase?: string };
          if (v?.phase === "roleplay") v.phase = "chat";
          writes[NEW_RESUME + k.slice(OLD_RESUME.length)] = JSON.stringify(v);
        } catch {
          /* bozuk kayıt taşınmıyor */
        }
      }
      if (Object.keys(writes).length) await AsyncStorage.setMany(writes);
      await AsyncStorage.removeMany(resumes);
    }

    const itemKeys = ITEM_KEYS.filter((k) => all.includes(k));
    if (itemKeys.length) {
      const values = await AsyncStorage.getMany(itemKeys);
      const writes: Record<string, string> = {};
      for (const k of itemKeys) {
        const raw = values[k];
        if (raw?.includes("-checkpoint")) writes[k] = raw.replace(OLD_ITEM_ID, "-unitQuiz$1\"");
      }
      if (Object.keys(writes).length) await AsyncStorage.setMany(writes);
    }

    for (const k of all.filter((key) => key.startsWith(OLD_PACK_KEY))) {
      await dropPackIndex(k.slice("content:pack:".length));
    }
  } catch {
    /* sessiz: en kötü ihtimalle yarım adım baştan başlar */
  }
}

let done: Promise<void> | null = null;

/** Taşımayı bir kez çalıştırır; eşzamanlı çağıranlar aynı sözü bekler. */
export function ensureLegacyMigrated(): Promise<void> {
  return (done ??= migrateLegacyStorage());
}
