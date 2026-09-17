"use client";

/**
 * Arka planda çalışan saat.
 *
 * Yürürken modunun tamamı bir `await` zinciri: oku, dinle, değerlendir, sıradaki.
 * Zincirdeki her adımın bir üst sınırı olmak zorunda — yoksa takılan tek bir
 * adım turu sessizce donduruyor. Kullanıcının gördüğü tam olarak buydu: kelime
 * okunmuyor, "duyamadım" bile denmiyor, sıradakine geçilmiyor. Yanlış cevap
 * değil, HİÇBİR şey.
 *
 * Üst sınırın kendisi `setTimeout` ile kurulamıyor, çünkü asıl sorun orada:
 * sayfa gizlendiğinde tarayıcı zamanlayıcıları kısıyor (arka plan sekmesinde
 * dakikada bire kadar). Altı saniyelik bir zaman aşımı bir dakika sonra
 * çalışırsa kurtarıcı olmuyor, donmanın parçası oluyor.
 *
 * Kısılan şey ZAMANIN KENDİSİ değil, zamanlayıcıların uyandırılması.
 * `Date.now()` arka planda da doğru. O yüzden burada zaman aşımları bir tarihe
 * yazılıyor ve eline geçen HER olayda vadesi gelenler işletiliyor. Olay kaynağı
 * ne kadar çeşitli olursa saat o kadar sağlam:
 *
 *   - **Aralık (`setInterval`).** Sayfa görünürken en keskini; gizliyken
 *     kısılıyor ama yok olmuyor.
 *   - **Kaydedicinin parçaları.** Kayıt yolunda mikrofon açıkken 200 ms'de
 *     bir (bkz. pocket-mic).
 *
 * İkisi de aynı listeyi yokluyor. Biri kısılsa diğeri yetişiyor.
 *
 * (Eskiden çalan sessiz döngünün `timeupdate`i de bir nabızdı; ekran kapalı
 * cep yoluyla birlikte kaldırıldı, 2026-09-17.)
 */

type Pending = { at: number; fire: () => void };

const pending: Pending[] = [];
let ticker: ReturnType<typeof setInterval> | null = null;

/**
 * Aralık nabzını kurar.
 *
 * `afterMs` de çağırıyor: kurulmamış bir saatte zaman aşımı hiç ateşlemez ve
 * "koruma var" sanılan yerde koruma olmaz. Bir zaman aşımının sessizce yok
 * olması, hiç konmamasından kötü.
 */
function ensureTicker() {
  if (ticker || typeof window === "undefined") return;
  ticker = setInterval(tickClock, 250);
}

/** Vadesi gelenleri işletir. Her nabız kaynağı burayı çağırıyor. */
export function tickClock() {
  if (!pending.length) {
    // Bekleyen iş kalmadıysa aralık kendini kapatıyor.
    if (ticker) {
      clearInterval(ticker);
      ticker = null;
    }
    return;
  }
  const now = Date.now();
  // Kopya üzerinden yürünüyor: `fire` yeni zaman aşımı kurabilir ve listeyi
  // gezerken değiştirmek atlamaya yol açardı.
  for (const p of pending.slice()) {
    if (p.at > now) continue;
    const i = pending.indexOf(p);
    if (i >= 0) pending.splice(i, 1);
    try {
      p.fire();
    } catch {
      /* bir zaman aşımının hatası diğerlerini düşürmesin */
    }
  }
}

/** `ms` sonra çalışacak bir iş kurar; dönen işlev iptal eder. */
export function afterMs(ms: number, fire: () => void): () => void {
  const p: Pending = { at: Date.now() + ms, fire };
  pending.push(p);
  ensureTicker();
  return () => {
    const i = pending.indexOf(p);
    if (i >= 0) pending.splice(i, 1);
  };
}

/**
 * Bir sözü süreye bağlar: zamanında gelirse kendi değeri, gelmezse `fallback`.
 *
 * Söz İPTAL EDİLMİYOR, yalnızca beklenmiyor. İptal edilebilir olsaydı çağıran
 * tarafın her adımı ayrıca temizlemesi gerekirdi; burada amaç zinciri
 * yürütmek, arkada kalanı toplamak değil. Geç gelen cevap kimseyi
 * tetiklemiyor çünkü onu bekleyen kalmıyor.
 */
export function withDeadline<T>(work: Promise<T>, ms: number, fallback: T): Promise<T> {
  return new Promise<T>((resolve) => {
    let done = false;
    const finish = (v: T) => {
      if (done) return;
      done = true;
      cancel();
      resolve(v);
    };
    const cancel = afterMs(ms, () => finish(fallback));
    work.then(finish, () => finish(fallback));
  });
}
