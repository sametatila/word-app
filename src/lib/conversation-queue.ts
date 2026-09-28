/**
 * ÇEVRİMDIŞI BİTİRİLEN KONUŞMA — tarayıcıdaki kuyruk.
 *
 * Konuşma bitince sonuç `/api/conversation`a yazılıyor; ağ yoksa istek düşüyor ve bir
 * daha DENENMİYORDU (`conversation-player` catch bloğu yalnız özeti çiziyordu).
 * Sunucu konuşmayı hiç öğrenmiyor: XP verilmiyor, aralıklı tekrar merdiveni
 * kurulmuyor, kullanıcı başka bir cihaza geçince konuşma geri geliyor.
 * Android'de aynı boşluk `pathProgress` kuyruğuyla kapandı; iki taraf da
 * aynı üç kuralı tutuyor:
 *
 *  - kayıt kendi `day`ini taşıyor (seri kullanıcının O gününe ait; ertesi gün
 *    gönderileni bugüne yazmak seriyi yanlış hesaplardı),
 *  - aynı konuşma yeniden bitirilirse son kayıt kalıyor (uç en iyi denemeyi
 *    zaten tutuyor),
 *  - biri düşerse kalanı kuyrukta kalıyor ve sıradakiler denenmiyor,
 *  - kayıt bitirişin kimliğini (`finishId`) taşıyor: oynatıcının anlık yeniden
 *    denemesi ve kuyruktan gönderim aynı kimlikle gidiyor, sunucu ilk isteği
 *    işlemişse ikinciyi yazmıyor (`recordConversation`).
 */
import { apiFetch } from "@/lib/api-fetch";

export type PendingConversation = {
  conversationId: string;
  correct: number;
  chatDone: boolean;
  day: string;
  seconds: number;
  /** Bitirişin kimliği; bu değişiklikten önce kuyruğa girmiş kayıtta yok. */
  finishId?: string;
};

/**
 * Bir bitirişin kimliği (idempotency anahtarı): bitirişte BİR KEZ üretiliyor,
 * yeniden deneme ve kuyruk aynısını gönderiyor. Mobil `pathProgress` aynı
 * gövdeyle; sunucu biçimi `isFinishId` (8-64, harf/rakam/-/_).
 */
export function newFinishId(): string {
  const c = (globalThis as { crypto?: { randomUUID?: () => string } }).crypto;
  if (typeof c?.randomUUID === "function") return c.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`;
}

const KEY = "lernomi-conversations-pending"; // storage-hygiene CONVERSATIONS_PENDING_KEY ile aynı

function read(): PendingConversation[] {
  try {
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

let inFlight: Promise<number> | null = null;

/**
 * Bekleyen konuşma sonuçlarını gönderir; biri düşerse kalanı kuyrukta bırakır.
 * Gönderilen kayıt sayısını döndürür — çağıran (`app-shell`) bir şey gittiyse
 * sunucu bileşenlerini (Patika) tazeliyor.
 *
 * Aynı anda iki boşaltma (kabuk + oynatıcı) aynı kaydı iki kez göndermesin
 * diye tek uçuş. Mobil `pathProgress` aynı kurallarla.
 */
export function flushPendingConversations(): Promise<number> {
  if (!inFlight) inFlight = flush().finally(() => { inFlight = null; });
  return inFlight;
}

async function flush(): Promise<number> {
  const list = read();
  if (!list.length) return 0;
  const remaining: PendingConversation[] = [];
  let sent = 0;
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
      if (res.ok) sent++;
    } catch {
      remaining.push(...list.slice(i));
      break;
    }
  }
  try {
    /* Boşaltma sürerken kuyruğa yeni bir sonuç girmiş olabilir: yazmadan önce
       güncel liste okunuyor, işlenen kayıtlar ondan düşülüyor. */
    const done = new Set(list.filter((x) => !remaining.includes(x)).map((x) => JSON.stringify(x)));
    const next = read().filter((x) => !done.has(JSON.stringify(x)));
    if (next.length) localStorage.setItem(KEY, JSON.stringify(next));
    else localStorage.removeItem(KEY);
  } catch {
    /* yut */
  }
  return sent;
}
