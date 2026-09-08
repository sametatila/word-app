"use client";

import { useSyncExternalStore } from "react";

/**
 * Kullanıcının KENDİ avatarı — Erdi maskotu tabanına aksesuar katmanları
 * (şapka + renk, gözlük, bıyık).
 *
 * Mobil `M/src/lib/avatar.ts` ile aynı model ve AYNI DEPOLAMA ANAHTARI
 * (`lernomi-avatar`), aynı JSON biçimi. Aynı olması bir tercih değil zorunluluk
 * değil de değil: seçim cihazda kalıyor (sunucuya gitmiyor), yani telefonda
 * seçtiğin şapka tarayıcıda görünmüyor. Ama biçimi ayrıştırmak, ileride
 * sunucuya taşınırken iki ayrı göç yazmak demekti.
 *
 * BAŞKALARININ arması bu değil: onlar kimlikten türeyen renkli baş harflerle
 * görünüyor (`components/avatar.tsx`, mobilde `PersonAvatar`) ve iki
 * platformda aynı hash + aynı palet kullanılıyor, yani aynı kişi her yerde
 * aynı renkte. Maskot yalnız "ben" için.
 */
export type AvatarConfig = {
  hat: string | null;
  hatColor: string;
  glasses: string | null;
  mustache: string | null;
};

export const DEFAULT_AVATAR: AvatarConfig = {
  hat: null,
  hatColor: "#c0392b",
  glasses: null,
  mustache: null,
};

const KEY = "lernomi-avatar";

let cache: AvatarConfig = DEFAULT_AVATAR;
let snapshot: AvatarConfig = DEFAULT_AVATAR;
let loaded = false;
const subs = new Set<() => void>();

function read(): AvatarConfig {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...DEFAULT_AVATAR, ...(JSON.parse(raw) as Partial<AvatarConfig>) };
  } catch {
    /* depolama kapalıysa varsayılan */
  }
  return DEFAULT_AVATAR;
}

function ensureLoaded() {
  if (loaded) return;
  loaded = true;
  cache = read();
  snapshot = cache;
}

/** Kayıtlı avatarı okur (düzenleme ekranının başlangıcı). */
export function getAvatar(): AvatarConfig {
  ensureLoaded();
  return cache;
}

/** Avatarı kaydeder + tüm dinleyicileri (başlık/profil) günceller. */
export function saveAvatar(cfg: AvatarConfig): void {
  cache = cfg;
  snapshot = cfg;
  loaded = true;
  try {
    localStorage.setItem(KEY, JSON.stringify(cfg));
  } catch {
    /* yut */
  }
  subs.forEach((f) => f());
}

function subscribe(fn: () => void): () => void {
  ensureLoaded();
  subs.add(fn);
  return () => {
    subs.delete(fn);
  };
}

/**
 * Reaktif avatar — kaydedilince başlıktaki ve profildeki kopyalar da değişir.
 *
 * `useSyncExternalStore` ile: sunucu anlık görüntüsü VARSAYILAN, istemcininki
 * depolamadan geliyor. Depolamayı doğrudan render sırasında okumak hydration
 * uyuşmazlığı üretirdi — sunucu şapkasız, istemci şapkalı çizerdi.
 */
export function useAvatar(): AvatarConfig {
  return useSyncExternalStore(
    subscribe,
    () => {
      ensureLoaded();
      return snapshot;
    },
    () => DEFAULT_AVATAR,
  );
}
