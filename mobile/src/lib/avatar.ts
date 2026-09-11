import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateProfile } from "./updateProfile";

/**
 * Kullanıcı avatarı — Erdi maskotu tabanına aksesuar katmanları (şapka + renk,
 * gözlük, bıyık).
 *
 * Web `src/lib/avatar.ts` ile aynı model, aynı JSON biçimi. Cihazdaki kopya
 * ÖNBELLEK: asıl kayıt sunucuda (`profiles.avatar`), her `/api/me` ile
 * `syncAvatarWithServer` üzerinden eşitleniyor. Yerel kopya yalnız ilk
 * boyamanın ağı beklememesi ve kaydedince başlığın anında değişmesi için var.
 *
 * `null` = KULLANICI HİÇ AVATAR SEÇMEDİ. Varsayılan yapılandırmadan ayrı bir
 * durum olması şart: seçmemiş olan kimlikten türeyen armasıyla görünüyor
 * (`ui/PersonAvatar`), seçmiş olan maskotuyla.
 */
export type AvatarConfig = {
  hat: string | null;      // bkz. avatarParts HATS
  hatColor: string;        // hex
  glasses: string | null;  // bkz. GLASSES
  mustache: string | null; // bkz. MUSTACHES
};

export const DEFAULT_AVATAR: AvatarConfig = { hat: null, hatColor: "#c0392b", glasses: null, mustache: null };

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

/** Avatarı kaydeder + tüm dinleyicileri (header/profil) günceller. */
export async function saveAvatar(cfg: AvatarConfig): Promise<void> {
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
  void updateProfile({ avatar: cfg });
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
  return { hat: part(r.hat), hatColor, glasses: part(r.glasses), mustache: part(r.mustache) };
}

/**
 * Reaktif avatar — kaydedilince otomatik yeniden çizer. `null` dönerse
 * kullanıcı hiç seçmemiş demektir (çağıran armaya düşer).
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
