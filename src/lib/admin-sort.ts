/**
 * PANEL TABLOLARININ SIRALAMA DURUMU — sunucuda sayfalanan tablolar için ortak dil.
 *
 * Bütün panel tabloları başlığa tıklayarak sıralanıyor (`_ui/table` DataTable):
 * veri tarayıcıdaysa tablo kendisi diziyor, sunucuda sayfalanıyorsa (kullanıcılar,
 * içerik bildirimleri) başlık bir bağlantı oluyor ve sıralamayı sorgu yapıyor —
 * yalnız görünen sayfayı dizmek yanıltırdı. İki yolda görünüm ve tıklama kuralı
 * aynı; hazır "Sırala" düğmeleri yok (2026-10-03).
 *
 * Adres biçimi `sira=<anahtar>` artan, `sira=-<anahtar>` azalan. Saf modül:
 * istemci ve sunucu ortak, `test:admin`.
 */

export type SortDir = "asc" | "desc";
export type SortState = { key: string; dir: SortDir };

/** Adres değeri → durum; tanınmayan anahtar varsayılana düşer (elle yazılmış adres 400 vermesin). */
export function parseSort(raw: string | string[] | undefined, allowed: readonly string[], fallback: SortState): SortState {
  const v = (Array.isArray(raw) ? raw[0] : raw)?.trim() ?? "";
  const desc = v.startsWith("-");
  const key = desc ? v.slice(1) : v;
  return allowed.includes(key) ? { key, dir: desc ? "desc" : "asc" } : fallback;
}

/** Durum → adres değeri. */
export function sortParam(s: SortState): string {
  return s.dir === "desc" ? `-${s.key}` : s.key;
}

/**
 * Başlığa tıklanınca yeni durum — istemci ve sunucu tablosunda aynı kural:
 * aynı sütun yön değiştirir; yeni sütun sayıda (sağa hizalı) büyükten, metinde
 * baştan başlar.
 */
export function nextSort(current: SortState | null, key: string, numeric: boolean): SortState {
  if (current?.key === key) return { key, dir: current.dir === "asc" ? "desc" : "asc" };
  return { key, dir: numeric ? "desc" : "asc" };
}

/** Sıralama değiştiğinde sayfa başa döner: `base` sayfa ve sıra içermeyen adres. */
export function sortHref(base: string, s: SortState, param = "sira"): string {
  const [path, query = ""] = base.split("?");
  const p = new URLSearchParams(query);
  p.delete(param);
  p.delete("sayfa");
  p.set(param, sortParam(s));
  return `${path}?${p.toString()}`;
}
