/**
 * ÇEVRİMDIŞI TUR CEVAPLARI — tarayıcıdaki kuyruk.
 *
 * Tur cevapları ağ yoksa yalnız BELLEKTE tutuluyordu (`session-player`
 * `pending.current`) ve bir sonraki gönderim denemesinde tekrar deneniyordu.
 * Sekme kapanırsa o cevaplar yok oluyordu: SRS aralıkları ilerlemiyor, XP
 * verilmiyor, kullanıcı aynı kelimeleri yeniden görüyordu — hem de bunu
 * bilmeden, çünkü ekran "kaydı bekliyor" diyordu ve kayıt hiç olmayacaktı.
 *
 * Android bu boşluğu baştan kapatmış (`M/src/game/session.ts`
 * `queueAnswers`/`flushPendingAnswers`); buradaki kuyruk aynı üç kuralı
 * tutuyor ve `lesson-queue` ile aynı kalıpta yazıldı:
 *
 *  - kayıt kendi `day`ini taşıyor (seri kullanıcının O gününe ait),
 *  - kuyruk en son yirmi turla sınırlı (eski tur SRS için değerini yitiriyor,
 *    sınırsız kuyruk da depolamayı şişirir),
 *  - biri düşerse kalanı kuyrukta kalıyor ve sıradakiler denenmiyor (ağ
 *    yoksa hepsi düşer, boşuna istek atılmaz).
 *
 * `progress` ve `wager` kuyrukta TAŞINMIYOR: ikisi de o turun kendi hâli.
 * Yarım kalan turu ertesi gün yeniden açmak ya da geçmiş bir bahsi o gün
 * çözmek yanlış olurdu; Android kuyruğu da yalnız cevapları taşıyor.
 */
export type QueuedAnswers = {
  answers: unknown[];
  day: string;
  seconds: number;
};

const KEY = "lernomi-answer-queue";

function read(): QueuedAnswers[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as QueuedAnswers[]) : [];
  } catch {
    return [];
  }
}

/**
 * Sunucunun ASLA kabul etmeyeceği hata mı — kuyruğa koymak boşuna mı.
 *
 * Eşleme Android `isPermanentError` ile birebir: 401/403 kalıcı DEĞİL, çünkü
 * oturum düşmüşken atılan bir tur kullanıcı yeniden girince gönderilebilir;
 * onu "sunucu reddetti" sayıp silmek tam da korumaya çalıştığımız veriyi
 * atardı. 408 ve 429 da geçici.
 */
export function isPermanentStatus(status: number): boolean {
  if (status === 401 || status === 403 || status === 408 || status === 429) return false;
  return status >= 400 && status < 500;
}

export function queueAnswers(item: QueuedAnswers): void {
  try {
    const list = read();
    list.push(item);
    localStorage.setItem(KEY, JSON.stringify(list.slice(-20)));
  } catch {
    /* depolama kapalıysa yapacak bir şey yok */
  }
}

/** Bekleyen cevapları gönderir; biri düşerse kalanı kuyrukta bırakır. */
export async function flushPendingAnswers(): Promise<void> {
  const list = read();
  if (!list.length) return;
  const remaining: QueuedAnswers[] = [];
  for (const [i, item] of list.entries()) {
    try {
      const res = await fetch("/api/answers", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(item),
      });
      /* Kalıcı hata düşürülüyor; ötekiler kuyrukta kalıyor. */
      if (!res.ok && !isPermanentStatus(res.status)) throw new Error(String(res.status));
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
