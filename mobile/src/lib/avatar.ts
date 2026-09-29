import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateProfile } from "./updateProfile";

/**
 * Kullanıcı avatarı — Nomi maskotu tabanına aksesuar katmanları (şapka + renk,
 * gözlük, bıyık).
 *
 * Web `src/lib/avatar.ts` ile aynı model, aynı JSON biçimi. Cihazdaki kopya
 * ÖNBELLEK: asıl kayıt sunucuda (`profiles.avatar`), her `/api/me` ile
 * `syncAvatarWithServer` üzerinden eşitleniyor. Yerel kopya yalnız ilk
 * boyamanın ağı beklememesi ve kaydedince başlığın anında değişmesi için var.
 *
 * `null` = KULLANICI HİÇ AVATAR SEÇMEDİ. Varsayılan yapılandırmadan ayrı bir
 * durum olması şart: seçmemiş olan kimliğinden türeyen maskotla görünüyor
 * (`ui/Avatar` › `derivedAvatar`), seçmiş olan kendi seçimiyle.
 */
export type AvatarConfig = {
  hat: string | null;      // 3B katalog parça kimliği
  hatColor: string;        // hex
  glasses: string | null;
  mustache: string | null;
  /** v2 (Nomi 3B): arka plan kimliği (`bg_orange` …); null = varsayılan. */
  bg: string | null;
  /** v2: yeni yuvalar (boyun, yüz, küpe, sırt) — parça kimliği ve isteğe bağlı renk. */
  extra: Partial<Record<ExtraSlot, { id: string; color: string | null }>>;
  /** v2: tüy rengi ve yüz ifadesi — 3B hat hazır olunca dolacak; şimdilik null. */
  fur: string | null;
  expression: string | null;
};

/** v2'de eklenen yuvalar. Şapka, gözlük ve bıyık eski alanlarında kalıyor (eski kayıtlar bozulmasın). */
export const EXTRA_SLOTS = ["neck", "face", "ear", "back"] as const;
export type ExtraSlot = (typeof EXTRA_SLOTS)[number];

export const DEFAULT_AVATAR: AvatarConfig = { hat: null, hatColor: "#c0392b", glasses: null, mustache: null, bg: null, extra: {}, fur: null, expression: null };

const KEY = "lernomi-avatar";

let cache: AvatarConfig | null = null;
let loaded = false;
const subs = new Set<() => void>();
function emit() { subs.forEach((f) => f()); }

async function ensureLoaded(): Promise<void> {
  if (loaded) return;
  loaded = true;
  try {
    cache = parseAvatar(await AsyncStorage.getItem(KEY));
  } catch { /* yut */ }
  emit();
}

/**
 * Düzenleme ekranının başlangıç değeri — seçim yoksa varsayılan.
 *
 * Ekran bir yapılandırma ÜZERİNDE çalışıyor, "seçmedim" hâli üzerinde değil;
 * o ayrımı gösteren kanca `useAvatar`.
 */
export async function getAvatar(): Promise<AvatarConfig> {
  await ensureLoaded();
  return cache ?? DEFAULT_AVATAR;
}

/*
  KAYIT SÜRERKEN ESKİ SUNUCU DEĞERİ YERELİ EZMESİN (2026-09-29). Kayıt önce
  yerele yazılıyor, sunucuya giden istek arkadan geliyor. Arada gelen sayfa
  verisi (`/api/me`; web'de düzenin avatarı) KAYITTAN ÖNCEKİ değeri
  taşıyabiliyor ve "sunucu kazanır" eşitlemesi onu yerelin üstüne yazıyordu:
  kaydedilen avatar yerine eskisi görünüyor, sayfa yenilenince düzeliyordu.
  Kayıt bekliyorken sunucudan gelen FARKLI değer yok sayılır; sunucu aynı
  değeri döndürünce ya da onaydan 5 sn sonra (sunucu kaydı düzelttiyse,
  ör. kilitli parçayı eledi) kural biter ve sunucu yine kazanır.
*/
let pending: { json: string; until: number } | null = null;
const norm = (c: unknown): string => JSON.stringify(parseAvatar(c));
/** Sunucudan gelen değer bekleyen kaydın ÖNCESİNE mi ait (yok sayılmalı mı). */
function staleVsPending(parsed: AvatarConfig): boolean {
  if (!pending) return false;
  if (norm(parsed) === pending.json || Date.now() > pending.until) {
    pending = null;
    return false;
  }
  return true;
}

/** Avatarı kaydeder + tüm dinleyicileri (header/profil) günceller. */
export async function saveAvatar(cfg: AvatarConfig): Promise<void> {
  pending = { json: norm(cfg), until: Date.now() + 20000 };
  cache = cfg;
  loaded = true;
  emit();
  try { await AsyncStorage.setItem(KEY, JSON.stringify(cfg)); } catch { /* yut */ }
  /*
    SUNUCUYA DA YAZILIYOR. Avatar eskiden yalnız cihazdaydı: telefonda seçilen
    şapka tarayıcıda görünmüyordu ve listelerde başkaları onu hiç göremiyordu.
    Yerel kayıt önce yapılıyor ki arayüz beklemeden değişsin; ağ hatası sessiz,
    bir sonraki kayıt ya da açılış eşitlemesi yakalıyor.
  */
  void updateProfile({ avatar: cfg }).finally(() => {
    if (pending) pending.until = Math.min(pending.until, Date.now() + 5000);
  });
}

/**
 * Açılışta cihaz ile sunucuyu eşitler.
 *
 * SUNUCU KAZANIR: avatar hesabın, cihazın değil — başka bir cihazda
 * değiştirildiyse burada da o görünmeli. Tek istisna ilk göç: sunucuda hiç
 * avatar yokken cihazdaki seçim kaybolmasın diye yukarı taşınıyor.
 */
export async function syncAvatarWithServer(remote: unknown): Promise<void> {
  const parsed = parseAvatar(remote);
  if (parsed && staleVsPending(parsed)) return;
  if (parsed) {
    cache = parsed;
    loaded = true;
    emit();
    try { await AsyncStorage.setItem(KEY, JSON.stringify(parsed)); } catch { /* yut */ }
    return;
  }
  await ensureLoaded();
  // Sunucuda yok, cihazda var: göç.
  if (cache) await saveAvatar(cache);
}

/**
 * Ham değeri güvenli bir yapılandırmaya çevirir — webdeki `parseAvatar`ın eşi
 * (src/lib/avatar-config.ts). `null` = hiç seçilmemiş.
 *
 * Bilinmeyen parça kimliği atılıyor, kayıt reddedilmiyor: parça listesi
 * sürümle değişiyor ve eski bir cihazdan gelen kayıt yüzünden avatarın
 * tamamının kaybolması, o parçanın çizilmemesinden kötü.
 */
const ID = /^[a-z0-9_-]{1,24}$/i;
const HEX = /^#[0-9a-f]{6}$/i;
const part = (v: unknown): string | null => (typeof v === "string" && ID.test(v) ? v : null);

export function parseAvatar(raw: unknown): AvatarConfig | null {
  let o: unknown = raw;
  if (typeof raw === "string") {
    if (!raw.trim()) return null;
    try { o = JSON.parse(raw); } catch { return null; }
  }
  if (!o || typeof o !== "object") return null;
  const r = o as Record<string, unknown>;
  const hatColor = typeof r.hatColor === "string" && HEX.test(r.hatColor) ? r.hatColor : DEFAULT_AVATAR.hatColor;
  const extra: AvatarConfig["extra"] = {};
  const ex = r.extra && typeof r.extra === "object" ? (r.extra as Record<string, { id?: unknown; color?: unknown } | undefined>) : {};
  for (const slot of EXTRA_SLOTS) {
    const id = part(ex[slot]?.id);
    const color = ex[slot]?.color;
    if (id) extra[slot] = { id, color: typeof color === "string" && HEX.test(color) ? color : null };
  }
  return { hat: part(r.hat), hatColor, glasses: part(r.glasses), mustache: part(r.mustache), bg: part(r.bg), extra, fur: part(r.fur), expression: part(r.expression) };
}

/**
 * Renklenen parçaların paleti (3B kataloğun `palet`i ile aynı sıra; web
 * `lib/avatar-config` `HAT_COLORS`): şapka rengi ve türetilmiş avatarın rengi.
 */
export const HAT_COLORS = ["#c0392b", "#2d6cdf", "#27ae60", "#8e44ad", "#e67e22", "#2c3e50"];

/** Nadirlik renkleri — parça kartının kenarı (sıradan, nadir, epik, efsanevi). Kimlik rengi, tema değil. */
export const AVATAR_RARITY: Record<string, string> = { common: "#a8a29a", rare: "#2d6cdf", epic: "#8e44ad", legendary: "#d9a514" };

/**
 * Reaktif avatar — kaydedilince otomatik yeniden çizer. `null` dönerse
 * kullanıcı hiç seçmemiş demektir (çağıran türetilmiş maskota düşer).
 */
export function useAvatar(): AvatarConfig | null {
  const [, bump] = useState(0);
  useEffect(() => {
    const f = () => bump((x) => x + 1);
    subs.add(f);
    void ensureLoaded();
    return () => { subs.delete(f); };
  }, []);
  return cache;
}
