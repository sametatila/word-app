"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Önce önbellek, sonra tazeleme.
 *
 * Başlangıç ekranının üç bölümü — sıradaki, günün görevleri, haftanın
 * sıralaması — her açılışta sıfırdan isteniyordu ve her açılışta geç
 * geliyordu: ekran kuruluyor, bir saniye sonra araya üç kart giriyor ve
 * altındaki her şey aşağı kayıyor. Doğru veriyi göstermek uğruna HER SEFERİNDE
 * beklemek aslında yanlış bir denge; bu veriler gün içinde nadiren değişiyor ve
 * değiştiklerinde bunu haber veren bir olay zaten var.
 *
 * Denge şu: son bilinen değer ANINDA çiziliyor, istek arka planda gidiyor,
 * cevap farklıysa ekran sessizce güncelleniyor. Kullanıcı bir bekleme
 * görmüyor; gördüğü şey ya güncel ya da saniyeler içinde güncellenecek.
 *
 * Doğruluk dört yerden korunuyor:
 *
 *   1. **Anahtar güne bağlı.** Plan ve görevler günlük; gün değişince anahtar
 *      da değişiyor ve dünün kopyası hiç okunmuyor. Eski günlerin anahtarları
 *      okuma sırasında temizleniyor, yoksa depolama aylar içinde şişerdi.
 *   2. **Alan hesaba bağlı.** Önek, oturum bekçisinin hesap değişiminde
 *      sildiği listede (bkz. session-keeper `ACCOUNT_SCOPED_PREFIXES`). Ortak
 *      bir cihazda bir kullanıcı diğerinin görevlerini bir an bile görmemeli.
 *   3. **Her açılışta tazeleme.** Önbellek gösterilen şeyi hızlandırıyor,
 *      isteğin yerine geçmiyor.
 *   4. **Değişim olayı.** Tur bitince kabuk `wortspiel:stats` yayınlıyor;
 *      dinleyen her kanca o anda yeniden istiyor. Yani "bir tur oynadım ama
 *      görevler eski kaldı" durumu oluşmuyor.
 *
 * Depolama `localStorage` — `sessionStorage` değil. İkincisi sekme başına
 * yaşıyor ve uygulamanın SOĞUK açılışında boş oluyor; oysa şikâyet edilen an
 * tam da orası, kullanıcının uygulamayı her açışı.
 */
const PREFIX = "wortspiel:cache:";

function store(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    // Gizli sekme, kapalı çerezler, dolu kota: önbellek bir hızlandırma,
    // zorunluluk değil. Yokluğunda kanca eski davranışa düşüyor.
    return null;
  }
}

function read<T>(key: string): T | undefined {
  const s = store();
  if (!s) return undefined;
  try {
    const raw = s.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : undefined;
  } catch {
    return undefined;
  }
}

function write<T>(key: string, value: T) {
  const s = store();
  if (!s) return;
  try {
    s.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* kota doldu: sessizce vazgeç */
  }
}

/** Bugüne ait olmayan günlük anahtarları at. */
function prune(today: string) {
  const s = store();
  if (!s) return;
  try {
    for (const k of Object.keys(s)) {
      if (!k.startsWith(PREFIX)) continue;
      const day = k.slice(k.lastIndexOf(":") + 1);
      if (/^\d{4}-\d{2}-\d{2}$/.test(day) && day !== today) s.removeItem(k);
    }
  } catch {
    /* yoksay */
  }
}

/**
 * Kancasız erişim — kendi yükleme akışı olan yerler için.
 *
 * Başlangıç turu bir kanca ile alınamıyor: veri gelince ekrana yazılmıyor,
 * bir tur kuruluyor. Ama aynı alanı (gün ve hesap temizliği dahil) paylaşması
 * gerekiyor, o yüzden okuma/yazma buradan.
 */
export function readCache<T>(key: string): T | undefined {
  prune(localDayKey());
  return read<T>(key);
}

export function writeCache<T>(key: string, value: T) {
  write(key, value);
}

export type Cached<T> = {
  /** Son bilinen değer; henüz hiçbir şey yoksa `undefined`, veri yoksa `null`. */
  data: T | null | undefined;
  /** Elle tazeleme. */
  refresh: () => void;
  /** Sunucudan dönen değeri doğrudan yerleştir (POST cevabı gibi). */
  put: (value: T) => void;
};

export function useCachedJson<T>(
  key: string,
  url: string,
  /** Gövdeyi doğrula: biçim tutmuyorsa `null` dönmeli. Kör dönüşüm ekran indiriyor. */
  parse: (body: unknown) => T | null,
): Cached<T> {
  const [data, setData] = useState<T | null | undefined>(undefined);

  // Önbellek SUNUCUDA okunamaz; ilk çizime karıştırmak hidratlama uyuşmazlığı
  // olurdu. Bu yüzden bağlandıktan hemen sonra yerleştiriliyor — kullanıcı
  // açısından yine ilk karede geliyor.
  useEffect(() => {
    prune(localDayKey());
    const cached = read<T>(key);
    if (cached !== undefined) setData(cached);
  }, [key]);

  const load = useCallback(async () => {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) {
        // Elde bir kopya varsa KORU: geçici bir hata yüzünden ekrandan bilgi
        // silmek, biraz eski bilgiyi göstermekten kötü.
        setData((prev) => (prev === undefined ? null : prev));
        return;
      }
      const parsed = parse(await res.json());
      setData(parsed);
      if (parsed !== null) write(key, parsed);
    } catch {
      setData((prev) => (prev === undefined ? null : prev));
    }
    // parse her çizimde yeniden kuruluyor; bağımlılığa girerse sonsuz istek olur.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, url]);

  useEffect(() => {
    void load();
  }, [load]);

  // Tur bitti, ödül alındı, XP değişti: veri artık eski.
  useEffect(() => {
    const onChange = () => void load();
    window.addEventListener("wortspiel:stats", onChange);
    return () => window.removeEventListener("wortspiel:stats", onChange);
  }, [load]);

  const put = useCallback(
    (value: T) => {
      setData(value);
      write(key, value);
    },
    [key],
  );

  return { data, refresh: load, put };
}

/** Günlük veriler için anahtar eki — cihazın günü, sunucununki değil. */
export function localDayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}
