/**
 * ÇEVRİMDIŞI BİTİRİLEN DERS — tarayıcıdaki kuyruk.
 *
 * Ders bitince sonuç `/api/conversation`a yazılıyor; ağ yoksa istek düşüyor ve bir
 * daha DENENMİYORDU (`conversation-player` catch bloğu yalnız özeti çiziyordu).
 * Sunucu dersi hiç öğrenmiyor: XP verilmiyor, aralıklı tekrar merdiveni
 * kurulmuyor, kullanıcı başka bir cihaza geçince ders geri geliyor.
 * Android'de aynı boşluk `pathProgress` kuyruğuyla kapandı; iki taraf da
 * aynı üç kuralı tutuyor:
 *
 *  - kayıt kendi `day`ini taşıyor (seri kullanıcının O gününe ait; ertesi gün
 *    gönderileni bugüne yazmak seriyi yanlış hesaplardı),
 *  - aynı ders yeniden bitirilirse son kayıt kalıyor (uç en iyi denemeyi
 *    zaten tutuyor),
 *  - biri düşerse kalanı kuyrukta kalıyor ve sıradakiler denenmiyor.
 */
import { apiFetch } from "@/lib/api-fetch";
import { migrateLegacyWebStorage } from "@/lib/legacy-names";
import { CONVERSATION_RESUME_KEY, CONVERSATIONS_PENDING_KEY } from "@/lib/storage-hygiene";

export type PendingConversation = {
  conversationId: string;
  correct: number;
  chatDone: boolean;
  day: string;
  seconds: number;
};

const KEY = CONVERSATIONS_PENDING_KEY;

function read(): PendingConversation[] {
  try {
    migrateLegacyWebStorage(localStorage, KEY, CONVERSATION_RESUME_KEY); // eski anahtar (geçici)
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as PendingConversation[]) : [];
  } catch {
    return [];
  }
}

export function queueConversationResult(item: PendingConversation): void {
  try {
    const rest = read().filter((x) => x.conversationId !== item.conversationId);
    rest.push(item);
    localStorage.setItem(KEY, JSON.stringify(rest.slice(-20)));
  } catch {
    /* depolama kapalıysa yapacak bir şey yok */
  }
}

/** Bekleyen ders sonuçlarını gönderir; biri düşerse kalanı kuyrukta bırakır. */
export async function flushPendingConversations(): Promise<void> {
  const list = read();
  if (!list.length) return;
  const remaining: PendingConversation[] = [];
  for (const [i, item] of list.entries()) {
    try {
      const res = await apiFetch("/api/conversation", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(item),
      });
      /* 4xx bir daha kabul edilmeyecek demek: kuyrukta tutmak her seferinde
         aynı isteği tekrarlardı. 5xx ve ağ hatası bekletiliyor. */
      if (!res.ok && res.status >= 500) throw new Error(String(res.status));
    } catch {
      remaining.push(...list.slice(i));
      break;
    }
  }
  try {
    if (remaining.length) localStorage.setItem(KEY, JSON.stringify(remaining));
    else localStorage.removeItem(KEY);
  } catch {
    /* yut */
  }
}
