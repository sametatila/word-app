"use client";

import { useSyncExternalStore } from "react";
import { DEFAULT_AVATAR, parseAvatar, type AvatarConfig } from "@/lib/avatar-config";

/**
 * Kullanıcının KENDİ avatarı — Erdi maskotu tabanına aksesuar katmanları
 * (şapka + renk, gözlük, bıyık).
 *
 * Mobil `M/src/lib/avatar.ts` ile aynı model, aynı JSON biçimi ve aynı
 * depolama anahtarı (`lernomi-avatar`). Buradaki kopya artık ÖNBELLEK: asıl
 * kayıt sunucuda (`profiles.avatar`), açılışta `syncAvatarWithServer` ile
 * eşitleniyor. Yerel kopya yalnız ilk boyamanın beklememesi ve düzenleme
 * ekranından çıkınca başlığın anında değişmesi için var.
 *
 * `null` = KULLANICI HİÇ AVATAR SEÇMEDİ. Varsayılan yapılandırmadan ayrı bir
 * durum olması şart: seçmemiş olan kimlikten türeyen armasıyla görünüyor
 * (`components/avatar.tsx`), seçmiş olan maskotuyla. İkisi tek değere
 * indirgenirse ya herkes çıplak maskot olur (listede kimse ayırt edilemez) ya
 * da seçimini sıfırlayan kişi armaya düşer.
 */
export type { AvatarConfig } from "@/lib/avatar-config";
export { DEFAULT_AVATAR } from "@/lib/avatar-config";

const KEY = "lernomi-avatar";

let cache: AvatarConfig | null = null;
let snapshot: AvatarConfig | null = null;
let loaded = false;
const subs = new Set<() => void>();

function read(): AvatarConfig | null {
  try {
    return parseAvatar(localStorage.getItem(KEY));
  } catch {
    /* depolama kapalı: seçim yok sayılır */
    return null;
  }
}

function ensureLoaded() {
  if (loaded) return;
  loaded = true;
  cache = read();
  snapshot = cache;
}

/**
 * Düzenleme ekranının başlangıç değeri — seçim yoksa varsayılan.
 *
 * Ekran bir yapılandırma ÜZERİNDE çalışıyor, "seçmedim" hâli üzerinde değil;
 * o ayrımı gösteren kanca `useAvatar`.
 */
export function getAvatar(): AvatarConfig {
  ensureLoaded();
  return cache ?? DEFAULT_AVATAR;
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
  /*
    SUNUCUYA DA YAZILIYOR. Avatar eskiden yalnız cihazdaydı: telefonda seçilen
    şapka tarayıcıda görünmüyordu ve listelerde başkaları onu hiç göremiyordu.
    Yerel kayıt önce yapılıyor ki arayüz beklemeden değişsin; ağ hatası sessiz,
    bir sonraki kayıt ya da açılış eşitlemesi yakalıyor.
  */
  void fetch("/api/profile", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ avatar: cfg }),
  }).catch(() => {});
}

/**
 * Açılışta cihaz ile sunucuyu eşitler. Mobil `syncAvatarWithServer` ile aynı
 * imza: sunucu değeri ÇAĞIRANDAN geliyor.
 *
 * Buradan `/api/me` çağrılıyordu ve bu iki bedel ödetiyordu: her sayfa
 * açılışında fazladan bir gidiş, ve dönene kadar başlıkta armanın çizilip
 * sonra maskota atlaması. Değer zaten düzenin okuduğu profilde var.
 *
 * SUNUCU KAZANIR: avatar hesabın, cihazın değil — başka bir cihazda
 * değiştirildiyse burada da o görünmeli. Tek istisna ilk göç: sunucuda hiç
 * avatar yokken cihazdaki seçim kaybolmasın diye yukarı taşınıyor.
 */
export function syncAvatarWithServer(remote: unknown): void {
  const parsed = parseAvatar(remote);
  if (parsed) {
    cache = parsed;
    snapshot = parsed;
    loaded = true;
    try { localStorage.setItem(KEY, JSON.stringify(parsed)); } catch { /* yut */ }
    subs.forEach((f) => f());
    return;
  }
  ensureLoaded();
  // Sunucuda yok, cihazda var: göç.
  if (cache) saveAvatar(cache);
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
 * `null` dönerse kullanıcı hiç seçmemiş demektir (çağıran armaya düşer).
 *
 * `useSyncExternalStore` ile: sunucu anlık görüntüsü SEÇİMSİZ, istemcininki
 * depolamadan geliyor. Depolamayı doğrudan render sırasında okumak hydration
 * uyuşmazlığı üretirdi — sunucu şapkasız, istemci şapkalı çizerdi.
 */
export function useAvatar(): AvatarConfig | null {
  return useSyncExternalStore(
    subscribe,
    () => {
      ensureLoaded();
      return snapshot;
    },
    () => null,
  );
}
