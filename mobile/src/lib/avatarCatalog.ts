import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchServerConfig } from "./serverConfig";
import type { AvatarCatalog } from "./avatarLayers";

/**
 * Nomi 3B avatar kataloğu (mobil) — TEK ÇİZİM 3B (2026-09-29; web
 * `lib/avatar-catalog-client`).
 *
 * Eski 2B maskot silindi: katalog gelene kadar avatar yerinde boş daire.
 * O boşluğu kısaltmak için son katalog CİHAZDA saklanıyor: açılışta önce
 * cihazdaki kopya (milisaniyeler), sonra sunucudaki (`/api/config` kökü +
 * `katalog.json`, envanter `avatarActive`) gelip hem ekranı hem kopyayı
 * tazeliyor. Katalog adresleri sürümlü (`/avatar/v<n>`), yani eski kopya
 * yanlış çizmez; en kötü ihtimalle bir sonraki tazelemeye dek eski sürümü
 * çizer.
 */
/** `active`: envanterde gösterilen parçalar (web ile aynı; null = kısıt yok). */
type State = { base: string; cat: AvatarCatalog; active: ReadonlySet<string> | null } | null;
type Stored = { base: string; cat: AvatarCatalog; active: string[] | null };
const KEY = "nomi.avatarCatalog";
let state: State = null;
let started = false;
const subs = new Set<() => void>();
const emit = () => subs.forEach((f) => f());

async function load() {
  if (started) return;
  started = true;
  try {
    const raw = await AsyncStorage.getItem(KEY);
    const saved = raw ? (JSON.parse(raw) as Stored) : null;
    if (!state && saved?.base && Array.isArray(saved.cat?.parcalar)) {
      state = { base: saved.base, cat: saved.cat, active: saved.active ? new Set(saved.active) : null };
      emit();
    }
  } catch {
    /* kopya bozuksa ağdan */
  }
  try {
    const cfg = await fetchServerConfig();
    if (!cfg.avatar3d) return;
    const res = await fetch(`${cfg.avatar3d}/katalog.json`, { signal: AbortSignal.timeout(10_000) });
    if (!res.ok) return;
    const cat = (await res.json()) as AvatarCatalog;
    if (!Array.isArray(cat?.parcalar)) return;
    state = { base: cfg.avatar3d, cat, active: cfg.avatarActive ? new Set(cfg.avatarActive) : null };
    emit();
    void AsyncStorage.setItem(KEY, JSON.stringify({ base: cfg.avatar3d, cat, active: cfg.avatarActive } satisfies Stored)).catch(() => {});
  } catch {
    /* ağ yoksa cihazdaki kopya */
  }
}

export function useAvatarCatalog(): State {
  const [, bump] = useState(0);
  useEffect(() => {
    const f = () => bump((x) => x + 1);
    subs.add(f);
    void load();
    return () => { subs.delete(f); };
  }, []);
  return state;
}
