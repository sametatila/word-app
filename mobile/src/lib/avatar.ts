import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Kullanıcı avatarı — Erdi maskotu tabanına aksesuar katmanları (şapka + renk,
 * gözlük, bıyık). ALTYAPI: seçim yerelde saklanır ve reaktif bir store ile
 * header/profil/düzenleme ekranında canlı güncellenir. Gerçek sanat (aksesuar
 * çizimleri) sonradan Replicate ile yenilenecek; bileşen/katman yapısı hazır.
 */
export type AvatarConfig = {
  hat: string | null;      // bkz. avatarParts HATS
  hatColor: string;        // hex
  glasses: string | null;  // bkz. GLASSES
  mustache: string | null; // bkz. MUSTACHES
};

export const DEFAULT_AVATAR: AvatarConfig = { hat: null, hatColor: "#c0392b", glasses: null, mustache: null };

const KEY = "nomi-avatar";

let cache: AvatarConfig = DEFAULT_AVATAR;
let loaded = false;
const subs = new Set<() => void>();
function emit() { subs.forEach((f) => f()); }

async function ensureLoaded(): Promise<void> {
  if (loaded) return;
  loaded = true;
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (raw) cache = { ...DEFAULT_AVATAR, ...JSON.parse(raw) };
  } catch { /* yut */ }
  emit();
}

/** Kayıtlı avatarı okur (düzenleme ekranı başlangıcı). */
export async function getAvatar(): Promise<AvatarConfig> {
  await ensureLoaded();
  return cache;
}

/** Avatarı kaydeder + tüm dinleyicileri (header/profil) günceller. */
export async function saveAvatar(cfg: AvatarConfig): Promise<void> {
  cache = cfg;
  loaded = true;
  emit();
  try { await AsyncStorage.setItem(KEY, JSON.stringify(cfg)); } catch { /* yut */ }
}

/** Reaktif avatar — kaydedilince otomatik yeniden çizer. */
export function useAvatar(): AvatarConfig {
  const [, bump] = useState(0);
  useEffect(() => {
    const f = () => bump((x) => x + 1);
    subs.add(f);
    void ensureLoaded();
    return () => { subs.delete(f); };
  }, []);
  return cache;
}
